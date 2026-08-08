/**
 * 心动小馆 · Netlify Functions API
 * 使用 Netlify Blobs 作为数据库，国内可访问
 */
import { getStore } from '@netlify/blobs';

const CHARS_UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const CHARS_DIGITS = '0123456789';
const CHARS_LOWER = 'abcdefghijklmnopqrstuvwxyz';

// ========== 工具函数 ==========

function randomString(chars, length) {
  const randomValues = new Uint8Array(length);
  crypto.getRandomValues(randomValues);
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars[randomValues[i] % chars.length];
  }
  return result;
}

function generateInviteCode() {
  return randomString(CHARS_UPPER + CHARS_DIGITS, 5);
}

function generateCoupleKey() {
  return randomString(CHARS_LOWER + CHARS_DIGITS, 16);
}

async function hashPassword(password) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const encoder = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw', encoder.encode(password), 'PBKDF2', false, ['deriveBits']
  );
  const hash = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' },
    keyMaterial, 256
  );
  const saltHex = Array.from(salt).map(b => b.toString(16).padStart(2, '0')).join('');
  const hashHex = Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
  return `pbkdf2:100000:${saltHex}:${hashHex}`;
}

async function verifyPassword(password, stored) {
  try {
    const parts = stored.split(':');
    if (parts.length !== 4 || parts[0] !== 'pbkdf2') return false;
    const iterations = parseInt(parts[1]);
    const salt = new Uint8Array(parts[2].match(/.{2}/g).map(b => parseInt(b, 16)));
    const expectedHash = parts[3];
    const encoder = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
      'raw', encoder.encode(password), 'PBKDF2', false, ['deriveBits']
    );
    const hash = await crypto.subtle.deriveBits(
      { name: 'PBKDF2', salt, iterations, hash: 'SHA-256' },
      keyMaterial, 256
    );
    const hashHex = Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex === expectedHash;
  } catch {
    return false;
  }
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}

// ========== 数据库操作（Netlify Blobs）==========

function db() {
  return getStore('xindong');
}

async function getNextUserId() {
  const store = db();
  let counter = parseInt(await store.get('meta:nextUserId') || '0');
  counter++;
  await store.set('meta:nextUserId', String(counter));
  return counter;
}

async function getUserById(userId) {
  const store = db();
  const data = await store.get(`user:${userId}`);
  return data ? JSON.parse(data) : null;
}

async function getUserByPhone(phone) {
  const store = db();
  const userId = await store.get(`phone:${phone}`);
  return userId ? await getUserById(userId) : null;
}

async function getUserByNickname(nickname) {
  const store = db();
  const userId = await store.get(`nickname:${nickname}`);
  return userId ? await getUserById(userId) : null;
}

async function getUserByInviteCode(code) {
  const store = db();
  const userId = await store.get(`invite:${code}`);
  return userId ? await getUserById(userId) : null;
}

async function saveUser(user) {
  const store = db();
  await store.set(`user:${user.id}`, JSON.stringify(user));
  await store.set(`phone:${user.phone}`, String(user.id));
  await store.set(`nickname:${user.nickname}`, String(user.id));
  await store.set(`invite:${user.invite_code}`, String(user.id));
}

async function updateUser(user) {
  const store = db();
  await store.set(`user:${user.id}`, JSON.stringify(user));
}

async function getCoupleState(coupleKey) {
  const store = db();
  const data = await store.get(`couple:${coupleKey}`);
  return data ? JSON.parse(data) : null;
}

async function saveCoupleState(coupleKey, state) {
  const store = db();
  await store.set(`couple:${coupleKey}`, JSON.stringify(state));
}

async function deleteCoupleState(coupleKey) {
  const store = db();
  await store.delete(`couple:${coupleKey}`);
}

// ========== API 路由处理 ==========

async function handleRegister(request) {
  const data = await request.json();
  const phone = (data.phone || '').trim();
  const nickname = (data.nickname || '').trim();
  const password = (data.password || '').trim();

  if (!phone || phone.length < 6) return json({ success: false, msg: '请输入正确的手机号' }, 400);
  if (!nickname) return json({ success: false, msg: '请输入昵称' }, 400);
  if (password.length < 6) return json({ success: false, msg: '密码至少6位' }, 400);

  const existing = await getUserByPhone(phone);
  if (existing) return json({ success: false, msg: '该手机号已注册' }, 400);

  const existingNick = await getUserByNickname(nickname);
  if (existingNick) return json({ success: false, msg: '该昵称已被使用' }, 400);

  let inviteCode;
  for (let i = 0; i < 10; i++) {
    inviteCode = generateInviteCode();
    const codeExists = await getUserByInviteCode(inviteCode);
    if (!codeExists) break;
  }

  const userId = await getNextUserId();
  const pwdHash = await hashPassword(password);
  const user = {
    id: userId, phone, nickname, password: pwdHash,
    invite_code: inviteCode, partner_id: null, couple_key: null,
    created_at: new Date().toISOString()
  };
  await saveUser(user);

  return json({
    success: true, msg: '注册成功',
    user: {
      id: user.id, phone: user.phone, nickname: user.nickname,
      invite_code: user.invite_code, partner_id: null, is_bound: false
    }
  });
}

async function handleLogin(request) {
  const data = await request.json();
  const account = (data.account || '').trim();
  const password = (data.password || '').trim();

  if (!account || !password) return json({ success: false, msg: '请输入账号和密码' }, 400);

  let user = await getUserByPhone(account);
  if (!user) user = await getUserByNickname(account);
  if (!user) return json({ success: false, msg: '账号不存在，请先注册' }, 401);

  const valid = await verifyPassword(password, user.password);
  if (!valid) return json({ success: false, msg: '密码错误' }, 401);

  const isBound = user.partner_id !== null;
  let partner = null;
  let state = null;

  if (isBound) {
    const partnerUser = await getUserById(user.partner_id);
    partner = partnerUser ? { nickname: partnerUser.nickname, invite_code: partnerUser.invite_code } : null;
    if (user.couple_key) {
      state = await getCoupleState(user.couple_key);
    }
  }

  return json({
    success: true, msg: '登录成功',
    user: {
      id: user.id, phone: user.phone, nickname: user.nickname,
      invite_code: user.invite_code, partner_id: user.partner_id,
      is_bound: isBound, partner
    },
    state
  });
}

async function handleBind(request) {
  const data = await request.json();
  const userId = data.user_id;
  const partnerCode = (data.partner_code || '').trim().toUpperCase();

  if (!partnerCode || partnerCode.length < 5) return json({ success: false, msg: '请输入5位邀请码' }, 400);

  const user = await getUserById(userId);
  if (!user) return json({ success: false, msg: '用户不存在' }, 404);
  if (user.partner_id) return json({ success: false, msg: '已经绑定过了' }, 400);

  const partner = await getUserByInviteCode(partnerCode);
  if (!partner) return json({ success: false, msg: '邀请码不存在，请确认' }, 404);
  if (partner.id === userId) return json({ success: false, msg: '不能绑定自己哦' }, 400);
  if (partner.partner_id) return json({ success: false, msg: '对方已经绑定了其他人' }, 400);

  const coupleKey = generateCoupleKey();
  const now = new Date().toISOString();
  const month = new Date().getMonth() + 1;
  const day = new Date().getDate();

  user.partner_id = partner.id;
  user.couple_key = coupleKey;
  await updateUser(user);

  partner.partner_id = user.id;
  partner.couple_key = coupleKey;
  await updateUser(partner);

  const defaultState = {
    coins: 100, coinLog: [], totalSpent: 0, cart: [], orders: [],
    customItems: [], blacklist: [], wishlist: [],
    anniversaries: [
      { emoji: '💑', name: '在一起的纪念日', month, day },
      { emoji: '🎂', name: '我的生日', month: 6, day: 15 },
      { emoji: '🎂', name: 'Ta的生日', month: 9, day: 20 }
    ],
    couple: {
      name1: user.nickname, name2: partner.nickname,
      avatar1: '🌸', avatar2: '🌙', togetherDate: now
    },
    checkin: { lastDate: '', streak: 0, totalDays: 0, partnerCheckin: false },
    unlockedAchievements: [], anniversaryClaimed: []
  };
  await saveCoupleState(coupleKey, defaultState);

  return json({
    success: true, msg: '绑定成功！开启你们的甜蜜空间~',
    state: defaultState,
    partner: { nickname: partner.nickname, invite_code: partner.invite_code }
  });
}

async function handleGetState(userId) {
  const user = await getUserById(userId);
  if (!user || !user.couple_key) return json({ success: false, msg: '未绑定' }, 404);

  const state = await getCoupleState(user.couple_key);
  if (!state) return json({ success: false, msg: '状态不存在' }, 404);

  return json({ success: true, state, updated_at: new Date().toISOString() });
}

async function handleSaveState(request, userId) {
  const data = await request.json();
  const newState = data.state;
  if (newState == null) return json({ success: false, msg: '状态数据为空' }, 400);

  const user = await getUserById(userId);
  if (!user || !user.couple_key) return json({ success: false, msg: '未绑定' }, 404);

  await saveCoupleState(user.couple_key, newState);
  return json({ success: true, msg: '同步成功' });
}

async function handleUnbind(request) {
  const data = await request.json();
  const userId = data.user_id;

  const user = await getUserById(userId);
  if (!user || !user.partner_id) return json({ success: false, msg: '未绑定' }, 400);

  if (user.couple_key) {
    await deleteCoupleState(user.couple_key);
  }

  const partner = await getUserById(user.partner_id);
  if (partner) {
    partner.partner_id = null;
    partner.couple_key = null;
    await updateUser(partner);
  }

  user.partner_id = null;
  user.couple_key = null;
  await updateUser(user);

  return json({ success: true, msg: '已解除绑定' });
}

// ========== 主路由 ==========

export default async (request, context) => {
  const url = new URL(request.url);
  const path = url.pathname;
  const method = request.method;

  if (method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    });
  }

  try {
    if (path === '/api/register' && method === 'POST') return await handleRegister(request);
    if (path === '/api/login' && method === 'POST') return await handleLogin(request);
    if (path === '/api/bind' && method === 'POST') return await handleBind(request);
    if (path === '/api/unbind' && method === 'POST') return await handleUnbind(request);

    const stateMatch = path.match(/^\/api\/state\/(\d+)$/);
    if (stateMatch) {
      const userId = parseInt(stateMatch[1]);
      if (method === 'GET') return await handleGetState(userId);
      if (method === 'POST') return await handleSaveState(request, userId);
      return json({ success: false, msg: '不支持的请求方法' }, 405);
    }

    return json({ success: false, msg: 'API not found: ' + path }, 404);
  } catch (error) {
    return json({ success: false, msg: '服务器错误: ' + (error.message || error) }, 500);
  }
};
