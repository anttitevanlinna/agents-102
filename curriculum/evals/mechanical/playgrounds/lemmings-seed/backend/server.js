import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from './db.js';

const app = express();
app.use(express.json({ limit: '1mb' }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

const JWT_SECRET = 'lemming-secret';
const PORT = process.env.PORT || 3000;

function sign(user) {
  return jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
}

function auth(req, res, next) {
  const h = req.headers.authorization || '';
  const token = h.startsWith('Bearer ') ? h.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'no token' });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ error: 'bad token' });
  }
}

app.post('/auth/register', (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: 'email and password required' });
  const hash = bcrypt.hashSync(password, 8);
  try {
    const info = db.prepare('INSERT INTO users (email, password_hash) VALUES (?, ?)').run(email, hash);
    const user = db.prepare('SELECT id, email, role FROM users WHERE id = ?').get(info.lastInsertRowid);
    res.json({ token: sign(user), user });
  } catch (e) {
    res.status(400).json({ error: 'email taken' });
  }
});

app.post('/auth/login', (req, res) => {
  const { email, password } = req.body || {};
  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  if (!user) return res.status(401).json({ error: 'no such user' });
  if (!bcrypt.compareSync(password, user.password_hash)) return res.status(401).json({ error: 'wrong password' });
  res.json({ token: sign(user), user: { id: user.id, email: user.email, role: user.role } });
});

app.post('/scores', auth, (req, res) => {
  const { user_id, level_id, score } = req.body || {};
  const info = db.prepare('INSERT INTO scores (user_id, level_id, score) VALUES (?, ?, ?)')
    .run(user_id, level_id ?? null, score);
  res.json({ id: info.lastInsertRowid });
});

app.get('/scores/top', (req, res) => {
  const rows = db.prepare(`
    SELECT s.score, s.created_at, u.email
    FROM scores s JOIN users u ON u.id = s.user_id
    ORDER BY s.score DESC LIMIT 20
  `).all();
  res.json(rows);
});

app.post('/levels', auth, (req, res) => {
  const { title, data, is_public } = req.body || {};
  const info = db.prepare('INSERT INTO levels (uploader_id, title, data, is_public) VALUES (?, ?, ?, ?)')
    .run(req.user.id, title, JSON.stringify(data), is_public ? 1 : 0);
  res.json({ id: info.lastInsertRowid });
});

app.get('/levels', (req, res) => {
  const rows = db.prepare(`
    SELECT l.id, l.title, l.is_public, l.created_at, u.email AS uploader_email
    FROM levels l JOIN users u ON u.id = l.uploader_id
    ORDER BY l.created_at DESC LIMIT 50
  `).all();
  res.json(rows);
});

app.get('/levels/:id', (req, res) => {
  const row = db.prepare('SELECT * FROM levels WHERE id = ?').get(req.params.id);
  if (!row) return res.status(404).json({ error: 'not found' });
  res.json({ ...row, data: JSON.parse(row.data) });
});

app.delete('/levels/:id', auth, (req, res) => {
  db.prepare('DELETE FROM levels WHERE id = ?').run(req.params.id);
  res.json({ ok: true });
});

app.listen(PORT, () => console.log(`lemmings backend on :${PORT}`));
