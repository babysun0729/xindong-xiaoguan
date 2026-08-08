"""
心动小馆 · 后端服务器
支持 SQLite（本地开发）和 PostgreSQL（云端部署）
"""
import os
import json
import random
import string
from datetime import datetime
from flask import Flask, request, jsonify, send_from_directory
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__, static_folder='.', static_url_path='')

# ========== 数据库适配层 ==========
DATABASE_URL = os.environ.get('DATABASE_URL', '')
USE_POSTGRES = bool(DATABASE_URL)

if USE_POSTGRES:
    import psycopg2
    from psycopg2.extras import RealDictCursor
    print(f'[云端模式] PostgreSQL')
else:
    import sqlite3
    DB_PATH = os.path.join(os.path.dirname(__file__), 'xindong.db')
    print(f'[本地模式] SQLite: {DB_PATH}')

PLACEHOLDER = '%s' if USE_POSTGRES else '?'

def get_db():
    """获取数据库连接"""
    if USE_POSTGRES:
        conn = psycopg2.connect(DATABASE_URL)
        conn.autocommit = False
        return conn
    else:
        conn = sqlite3.connect(DB_PATH)
        conn.row_factory = sqlite3.Row
        return conn

def db_execute(conn, sql, params=()):
    """执行查询，自动处理占位符差异"""
    if USE_POSTGRES:
        # PostgreSQL 用 %s，但 psycopg2 原生就支持
        cur = conn.cursor(cursor_factory=RealDictCursor)
        cur.execute(sql, params)
        return cur
    else:
        # SQLite 用 ?
        return conn.execute(sql, params)

def db_fetchone(conn, sql, params=()):
    """查询单条记录"""
    cur = db_execute(conn, sql, params)
    row = cur.fetchone()
    if USE_POSTGRES:
        cur.close()
    return row

def db_fetchall(conn, sql, params=()):
    """查询多条记录"""
    cur = db_execute(conn, sql, params)
    rows = cur.fetchall()
    if USE_POSTGRES:
        cur.close()
    return rows

def db_execute_write(conn, sql, params=()):
    """执行写入操作"""
    cur = db_execute(conn, sql, params)
    if USE_POSTGRES:
        cur.close()

def row_get(row, key):
    """从行中取值，兼容 sqlite3.Row 和 RealDictRow"""
    if row is None:
        return None
    if USE_POSTGRES:
        return row.get(key)
    else:
        return row[key] if key in row.keys() else None

def init_db():
    """初始化数据库表"""
    db = get_db()
    if USE_POSTGRES:
        db_execute_write(db, '''
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                phone TEXT UNIQUE NOT NULL,
                nickname TEXT NOT NULL,
                password TEXT NOT NULL,
                invite_code TEXT UNIQUE NOT NULL,
                partner_id INTEGER DEFAULT NULL,
                couple_key TEXT DEFAULT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        db_execute_write(db, '''
            CREATE TABLE IF NOT EXISTS couple_states (
                couple_key TEXT PRIMARY KEY,
                state_json TEXT NOT NULL,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
    else:
        db.executescript('''
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                phone TEXT UNIQUE NOT NULL,
                nickname TEXT NOT NULL,
                password TEXT NOT NULL,
                invite_code TEXT UNIQUE NOT NULL,
                partner_id INTEGER DEFAULT NULL,
                couple_key TEXT DEFAULT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
            CREATE TABLE IF NOT EXISTS couple_states (
                couple_key TEXT PRIMARY KEY,
                state_json TEXT NOT NULL,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        ''')
    db.commit()
    db.close()

def generate_invite_code():
    """生成5位邀请码"""
    chars = string.ascii_uppercase + string.digits
    while True:
        code = ''.join(random.choices(chars, k=5))
        db = get_db()
        existing = db_fetchone(db, f'SELECT id FROM users WHERE invite_code = {PLACEHOLDER}', (code,))
        db.close()
        if not existing:
            return code

def generate_couple_key():
    """生成情侣密钥"""
    return ''.join(random.choices(string.ascii_lowercase + string.digits, k=16))

# ========== API 路由 ==========

@app.route('/api/register', methods=['POST'])
def register():
    """注册"""
    data = request.get_json()
    phone = data.get('phone', '').strip()
    nickname = data.get('nickname', '').strip()
    password = data.get('password', '').strip()

    if not phone or len(phone) < 6:
        return jsonify({'success': False, 'msg': '请输入正确的手机号'}), 400
    if not nickname:
        return jsonify({'success': False, 'msg': '请输入昵称'}), 400
    if len(password) < 6:
        return jsonify({'success': False, 'msg': '密码至少6位'}), 400

    db = get_db()
    existing = db_fetchone(db, f'SELECT id FROM users WHERE phone = {PLACEHOLDER}', (phone,))
    if existing:
        db.close()
        return jsonify({'success': False, 'msg': '该手机号已注册'}), 400

    invite_code = generate_invite_code()
    pwd_hash = generate_password_hash(password)
    db_execute_write(db,
        f'INSERT INTO users (phone, nickname, password, invite_code) VALUES ({PLACEHOLDER}, {PLACEHOLDER}, {PLACEHOLDER}, {PLACEHOLDER})',
        (phone, nickname, pwd_hash, invite_code)
    )
    db.commit()
    user = db_fetchone(db, f'SELECT * FROM users WHERE phone = {PLACEHOLDER}', (phone,))
    db.close()

    return jsonify({
        'success': True,
        'msg': '注册成功',
        'user': {
            'id': row_get(user, 'id'),
            'phone': row_get(user, 'phone'),
            'nickname': row_get(user, 'nickname'),
            'invite_code': row_get(user, 'invite_code'),
            'partner_id': None,
            'is_bound': False
        }
    })

@app.route('/api/login', methods=['POST'])
def login():
    """登录"""
    data = request.get_json()
    account = data.get('account', '').strip()
    password = data.get('password', '').strip()

    if not account or not password:
        return jsonify({'success': False, 'msg': '请输入账号和密码'}), 400

    db = get_db()
    user = db_fetchone(db,
        f'SELECT * FROM users WHERE phone = {PLACEHOLDER} OR nickname = {PLACEHOLDER}',
        (account, account)
    )
    if not user:
        db.close()
        return jsonify({'success': False, 'msg': '账号不存在，请先注册'}), 401
    if not check_password_hash(row_get(user, 'password'), password):
        db.close()
        return jsonify({'success': False, 'msg': '密码错误'}), 401

    partner_id = row_get(user, 'partner_id')
    couple_key = row_get(user, 'couple_key')
    is_bound = partner_id is not None
    partner = None
    state = None

    if is_bound:
        partner_row = db_fetchone(db,
            f'SELECT nickname, invite_code FROM users WHERE id = {PLACEHOLDER}',
            (partner_id,)
        )
        partner = {
            'nickname': row_get(partner_row, 'nickname'),
            'invite_code': row_get(partner_row, 'invite_code')
        } if partner_row else None
        if couple_key:
            state_row = db_fetchone(db,
                f'SELECT state_json FROM couple_states WHERE couple_key = {PLACEHOLDER}',
                (couple_key,)
            )
            if state_row:
                state = json.loads(row_get(state_row, 'state_json'))

    db.close()

    return jsonify({
        'success': True,
        'msg': '登录成功',
        'user': {
            'id': row_get(user, 'id'),
            'phone': row_get(user, 'phone'),
            'nickname': row_get(user, 'nickname'),
            'invite_code': row_get(user, 'invite_code'),
            'partner_id': partner_id,
            'is_bound': is_bound,
            'partner': partner
        },
        'state': state
    })

@app.route('/api/bind', methods=['POST'])
def bind():
    """绑定情侣"""
    data = request.get_json()
    user_id = data.get('user_id')
    partner_code = data.get('partner_code', '').strip().upper()

    if not partner_code or len(partner_code) < 5:
        return jsonify({'success': False, 'msg': '请输入5位邀请码'}), 400

    db = get_db()
    user = db_fetchone(db, f'SELECT * FROM users WHERE id = {PLACEHOLDER}', (user_id,))
    if not user:
        db.close()
        return jsonify({'success': False, 'msg': '用户不存在'}), 404

    if row_get(user, 'partner_id'):
        db.close()
        return jsonify({'success': False, 'msg': '已经绑定过了'}), 400

    partner = db_fetchone(db, f'SELECT * FROM users WHERE invite_code = {PLACEHOLDER}', (partner_code,))
    if not partner:
        db.close()
        return jsonify({'success': False, 'msg': '邀请码不存在，请确认'}), 404

    if row_get(partner, 'id') == user_id:
        db.close()
        return jsonify({'success': False, 'msg': '不能绑定自己哦'}), 400

    if row_get(partner, 'partner_id'):
        db.close()
        return jsonify({'success': False, 'msg': '对方已经绑定了其他人'}), 400

    couple_key = generate_couple_key()
    partner_id = row_get(partner, 'id')
    user_nickname = row_get(user, 'nickname')
    partner_nickname = row_get(partner, 'nickname')

    db_execute_write(db,
        f'UPDATE users SET partner_id = {PLACEHOLDER}, couple_key = {PLACEHOLDER} WHERE id = {PLACEHOLDER}',
        (partner_id, couple_key, user_id)
    )
    db_execute_write(db,
        f'UPDATE users SET partner_id = {PLACEHOLDER}, couple_key = {PLACEHOLDER} WHERE id = {PLACEHOLDER}',
        (user_id, couple_key, partner_id)
    )

    default_state = {
        'coins': 100,
        'coinLog': [],
        'totalSpent': 0,
        'cart': [],
        'orders': [],
        'customItems': [],
        'blacklist': [],
        'wishlist': [],
        'anniversaries': [
            {'emoji': '💑', 'name': '在一起的纪念日', 'month': datetime.now().month, 'day': datetime.now().day},
            {'emoji': '🎂', 'name': '我的生日', 'month': 6, 'day': 15},
            {'emoji': '🎂', 'name': 'Ta的生日', 'month': 9, 'day': 20}
        ],
        'couple': {
            'name1': user_nickname,
            'name2': partner_nickname,
            'avatar1': '🌸',
            'avatar2': '🌙',
            'togetherDate': datetime.now().isoformat()
        },
        'checkin': {
            'lastDate': '',
            'streak': 0,
            'totalDays': 0,
            'partnerCheckin': False
        },
        'unlockedAchievements': [],
        'anniversaryClaimed': []
    }

    if USE_POSTGRES:
        db_execute_write(db,
            f'INSERT INTO couple_states (couple_key, state_json, updated_at) VALUES ({PLACEHOLDER}, {PLACEHOLDER}, {PLACEHOLDER}) '
            f'ON CONFLICT (couple_key) DO UPDATE SET state_json = {PLACEHOLDER}, updated_at = {PLACEHOLDER}',
            (couple_key, json.dumps(default_state, ensure_ascii=False), datetime.now(),
             json.dumps(default_state, ensure_ascii=False), datetime.now())
        )
    else:
        db_execute_write(db,
            f'INSERT OR REPLACE INTO couple_states (couple_key, state_json, updated_at) VALUES ({PLACEHOLDER}, {PLACEHOLDER}, {PLACEHOLDER})',
            (couple_key, json.dumps(default_state, ensure_ascii=False), datetime.now())
        )

    db.commit()
    db.close()

    return jsonify({
        'success': True,
        'msg': '绑定成功！开启你们的甜蜜空间~',
        'state': default_state,
        'partner': {
            'nickname': partner_nickname,
            'invite_code': row_get(partner, 'invite_code')
        }
    })

@app.route('/api/state/<int:user_id>', methods=['GET'])
def get_state(user_id):
    """获取共享状态"""
    db = get_db()
    user = db_fetchone(db, f'SELECT couple_key FROM users WHERE id = {PLACEHOLDER}', (user_id,))
    couple_key = row_get(user, 'couple_key') if user else None
    if not user or not couple_key:
        db.close()
        return jsonify({'success': False, 'msg': '未绑定'}), 404

    state_row = db_fetchone(db,
        f'SELECT state_json, updated_at FROM couple_states WHERE couple_key = {PLACEHOLDER}',
        (couple_key,)
    )
    db.close()
    if not state_row:
        return jsonify({'success': False, 'msg': '状态不存在'}), 404

    return jsonify({
        'success': True,
        'state': json.loads(row_get(state_row, 'state_json')),
        'updated_at': str(row_get(state_row, 'updated_at'))
    })

@app.route('/api/state/<int:user_id>', methods=['POST'])
def save_state(user_id):
    """保存共享状态"""
    data = request.get_json()
    new_state = data.get('state')

    if new_state is None:
        return jsonify({'success': False, 'msg': '状态数据为空'}), 400

    db = get_db()
    user = db_fetchone(db, f'SELECT couple_key FROM users WHERE id = {PLACEHOLDER}', (user_id,))
    couple_key = row_get(user, 'couple_key') if user else None
    if not user or not couple_key:
        db.close()
        return jsonify({'success': False, 'msg': '未绑定'}), 404

    db_execute_write(db,
        f'UPDATE couple_states SET state_json = {PLACEHOLDER}, updated_at = {PLACEHOLDER} WHERE couple_key = {PLACEHOLDER}',
        (json.dumps(new_state, ensure_ascii=False), datetime.now(), couple_key)
    )
    db.commit()
    db.close()

    return jsonify({'success': True, 'msg': '同步成功'})

@app.route('/api/unbind', methods=['POST'])
def unbind():
    """解除绑定"""
    data = request.get_json()
    user_id = data.get('user_id')

    db = get_db()
    user = db_fetchone(db, f'SELECT * FROM users WHERE id = {PLACEHOLDER}', (user_id,))
    partner_id = row_get(user, 'partner_id') if user else None
    couple_key = row_get(user, 'couple_key') if user else None

    if not user or not partner_id:
        db.close()
        return jsonify({'success': False, 'msg': '未绑定'}), 400

    if couple_key:
        db_execute_write(db, f'DELETE FROM couple_states WHERE couple_key = {PLACEHOLDER}', (couple_key,))
    db_execute_write(db, f'UPDATE users SET partner_id = NULL, couple_key = NULL WHERE id = {PLACEHOLDER}', (user_id,))
    db_execute_write(db, f'UPDATE users SET partner_id = NULL, couple_key = NULL WHERE id = {PLACEHOLDER}', (partner_id,))
    db.commit()
    db.close()

    return jsonify({'success': True, 'msg': '已解除绑定'})

# ========== 静态文件服务 ==========
@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/<path:path>')
def static_files(path):
    return send_from_directory('.', path)

# ========== 启动 ==========
# 初始化数据库（gunicorn 和本地运行都会执行）
init_db()

if __name__ == '__main__':
    print('心动小馆服务器启动中...')
    print('本地访问: http://localhost:9090')
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 9090)), debug=True)
