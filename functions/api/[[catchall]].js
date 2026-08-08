/**
 * 心动小馆 · Cloudflare Pages Functions API
 * 使用 D1 (SQLite) 数据库，国内可访问
 */

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

// PBKDF2 密码哈希（使用 Web Crypto API）
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

async function ensureTables(db) {
  await db.batch([
    { sql: `CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      phone TEXT UNIQUE NOT NULL,
      nickname TEXT NOT NULL,
      password TEXT NOT NULL,
      invite_code TEXT UNIQUE NOT NULL,
      partner_id INTEGER DEFAULT NULL,
      couple_key TEXT DEFAULT NULL,
      created_at TEXT DEFAULT (datetime('now'))
    )` },
    { sql: `CREATE TABLE IF NOT EXISTS couple_states (
      couple_key TEXT PRIMARY KEY,
      state_json TEXT NOT NULL,
      updated_at TEXT DEFAULT (datetime('now'))
    )` }
  ]);
}

// ========== API 路由处理 ==========

async function handleRegister(request, env) {
  const data = await request.json();
  const phone = (data.phone || '').trim();
  const nickname = (data.nickname || '').trim();
  const password = (data.password || '').trim();

  if (!phone || phone.length < 6) return json({ success: false, msg: '请输入正确的手机号' }, 400);
  if (!nickname) return json({ success: false, msg: '请输入昵称' }, 400);
  if (password.length < 6) return json({ success: false, msg: '密码至少6位' }, 400);

  const db = env.DB;
  await ensureTables(db);

  const existing = await db.prepare('SELECT id FROM users WHERE phone = ?').bind(phone).first();
  if (existing) return json({ success: false, msg: '该手机号已注册' }, 400);

  let inviteCode;
  for (let i = 0; i < 10; i++) {
    inviteCode = generateInviteCode();
    const codeExists = await db.prepare('SELECT id FROM users WHERE invite_code = ?').bind(inviteCode).first();
    if (!codeExists) break;
  }

  const pwdHash = await hashPassword(password);
  await db.prepare('INSERT INTO users (phone, nickname, password, invite_code) VALUES (?, ?, ?, ?)')
    .bind(phone, nickname, pwdHash, inviteCode).run();

  const user = await db.prepare('SELECT * FROM users WHERE phone = ?').bind(phone).first();

  return json({
    success: true,
    msg: '注册成功',
    user: {
      id: user.id, phone: user.phone, nickname: user.nickname,
      invite_code: user.invite_code, partner_id: null, is_bound: false
    }
  });
}

async function handleLogin(request, env) {
  const data = await request.json();
  const account = (data.account || '').trim();
  const password = (data.password || '').trim();

  if (!account || !password) return json({ success: false, msg: '请输入账号和密码' }, 400);

  const db = env.DB;
  await ensureTables(db);

  const user = await db.prepare('SELECT * FROM users WHERE phone = ? OR nickname = ?')
    .bind(account, account).first();

  if (!user) return json({ success: false, msg: '账号不存在，请先注册' }, 401);

  const valid = await verifyPassword(password, user.password);
  if (!valid) return json({ success: false, msg: '密码错误' }, 401);

  const isBound = user.partner_id !== null;
  let partner = null;
  let state = null;

  if (isBound) {
    const partnerRow = await db.prepare('SELECT nickname, invite_code FROM users WHERE id = ?')
      .bind(user.partner_id).first();
    partner = partnerRow ? { nickname: partnerRow.nickname, invite_code: partnerRow.invite_code } : null;
    if (user.couple_key) {
      const stateRow = await db.prepare('SELECT state_json FROM couple_states WHERE couple_key = ?')
        .bind(user.couple_key).first();
      if (stateRow) state = JSON.parse(stateRow.state_json);
    }
  }

  return json({
    success: true,
    msg: '登录成功',
    user: {
      id: user.id, phone: user.phone, nickname: user.nickname,
      invite_code: user.invite_code, partner_id: user.partner_id,
      is_bound: isBound, partner
    },
    state
  });
}

async function handleBind(request, env) {
  const data = await request.json();
  const userId = data.user_id;
  const partnerCode = (data.partner_code || '').trim().toUpperCase();

  if (!partnerCode || partnerCode.length < 5) return json({ success: false, msg: '请输入5位邀请码' }, 400);

  const db = env.DB;
  await ensureTables(db);

  const user = await db.prepare('SELECT * FROM users WHERE id = ?').bind(userId).first();
  if (!user) return json({ success: false, msg: '用户不存在' }, 404);
  if (user.partner_id) return json({ success: false, msg: '已经绑定过了' }, 400);

  const partner = await db.prepare('SELECT * FROM users WHERE invite_code = ?').bind(partnerCode).first();
  if (!partner) return json({ success: false, msg: '邀请码不存在，请确认' }, 404);
  if (partner.id === userId) return json({ success: false, msg: '不能绑定自己哦' }, 400);
  if (partner.partner_id) return json({ success: false, msg: '对方已经绑定了其他人' }, 400);

  const coupleKey = generateCoupleKey();
  const now = new Date().toISOString();
  const month = new Date().getMonth() + 1;
  const day = new Date().getDate();

  await db.prepare('UPDATE users SET partner_id = ?, couple_key = ? WHERE id = ?')
    .bind(partner.id, coupleKey, userId).run();
  await db.prepare('UPDATE users SET partner_id = ?, couple_key = ? WHERE id = ?')
    .bind(userId, coupleKey, partner.id).run();

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

  await db.prepare("INSERT OR REPLACE INTO couple_states (couple_key, state_json, updated_at) VALUES (?, ?, datetime('now'))")
    .bind(coupleKey, JSON.stringify(defaultState)).run();

  return json({
    success: true, msg: '绑定成功！开启你们的甜蜜空间~',
    state: defaultState,
    partner: { nickname: partner.nickname, invite_code: partner.invite_code }
  });
}

async function handleGetState(env, userId) {
  const db = env.DB;
  await ensureTables(db);

  const user = await db.prepare('SELECT couple_key FROM users WHERE id = ?').bind(userId).first();
  if (!user || !user.couple_key) return json({ success: false, msg: '未绑定' }, 404);

  const stateRow = await db.prepare('SELECT state_json, updated_at FROM couple_states WHERE couple_key = ?')
    .bind(user.couple_key).first();
  if (!stateRow) return json({ success: false, msg: '状态不存在' }, 404);

  return json({ success: true, state: JSON.parse(stateRow.state_json), updated_at: stateRow.updated_at });
}

async function handleSaveState(request, env, userId) {
  const data = await request.json();
  const newState = data.state;
  if (newState == null) return json({ success: false, msg: '状态数据为空' }, 400);

  const db = env.DB;
  await ensureTables(db);

  const user = await db.prepare('SELECT couple_key FROM users WHERE id = ?').bind(userId).first();
  if (!user || !user.couple_key) return json({ success: false, msg: '未绑定' }, 404);

  await db.prepare("UPDATE couple_states SET state_json = ?, updated_at = datetime('now') WHERE couple_key = ?")
    .bind(JSON.stringify(newState), user.couple_key).run();

  return json({ success: true, msg: '同步成功' });
}

async function handleUnbind(request, env) {
  const data = await request.json();
  const userId = data.user_id;

  const db = env.DB;
  await ensureTables(db);

  const user = await db.prepare('SELECT * FROM users WHERE id = ?').bind(userId).first();
  if (!user || !user.partner_id) return json({ success: false, msg: '未绑定' }, 400);

  if (user.couple_key) {
    await db.prepare('DELETE FROM couple_states WHERE couple_key = ?').bind(user.couple_key).run();
  }
  await db.prepare('UPDATE users SET partner_id = NULL, couple_key = NULL WHERE id = ?').bind(userId).run();
  await db.prepare('UPDATE users SET partner_id = NULL, couple_key = NULL WHERE id = ?').bind(user.partner_id).run();

  return json({ success: true, msg: '已解除绑定' });
}

// ========== 主路由 ==========

export async function onRequest(context) {
  const { request, env } = context;
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

  if (!env.DB) {
    return json({ success: false, msg: '数据库未配置，请在 Cloudflare 后台绑定 D1 数据库' }, 500);
  }

  try {
    if (path === '/api/register' && method === 'POST') return await handleRegister(request, env);
    if (path === '/api/login' && method === 'POST') return await handleLogin(request, env);
    if (path === '/api/bind' && method === 'POST') return await handleBind(request, env);
    if (path === '/api/unbind' && method === 'POST') return await handleUnbind(request, env);

    const stateMatch = path.match(/^\/api\/state\/(\d+)$/);
    if (stateMatch) {
      const userId = parseInt(stateMatch[1]);
      if (method === 'GET') return await handleGetState(env, userId);
      if (method === 'POST') return await handleSaveState(request, env, userId);
      return json({ success: false, msg: '不支持的请求方法' }, 405);
    }

    return json({ success: false, msg: 'API not found: ' + path }, 404);
  } catch (error) {
    return json({ success: false, msg: '服务器错误: ' + (error.message || error) }, 500);
  }
}
