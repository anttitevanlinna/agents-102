// Anonymous learner feedback sink (Cloudflare Worker + D1).
//
// POST /signal   from the self-study pages. Stores one row, no IP, no user
//                agent, no cookie, time kept to the day. Text is scrubbed of
//                emails, phone numbers, URLs and long digit runs.
// GET  /summary  counts per module/step/signal plus recent comments.
//                Needs "Authorization: Bearer <READ_TOKEN>".

const SIGNALS = new Set(['worked', 'stuck', 'comment']);
const SITES = new Set(['home', 'handbook']);
const SLUG = /^[A-Za-z0-9][A-Za-z0-9._-]{0,79}$/;
const MAX_BODY = 4000;
const MAX_TEXT = 500;

export function scrub(text) {
  return String(text || '')
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, '[email]')
    .replace(/\bhttps?:\/\/\S+/gi, '[link]')
    .replace(/(?:\+?\d[\d ()-]{7,}\d)/g, '[number]')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, MAX_TEXT);
}

function slugOr(v, fallback) {
  const s = String(v == null ? '' : v).trim();
  return s === '' ? fallback : SLUG.test(s) ? s : null;
}

export function validate(body) {
  if (!body || typeof body !== 'object') return { error: 'body' };
  const signal = String(body.signal || '');
  if (!SIGNALS.has(signal)) return { error: 'signal' };
  const site = String(body.site || 'handbook');
  if (!SITES.has(site)) return { error: 'site' };
  const module = slugOr(body.module, null);
  if (!module) return { error: 'module' };
  const fields = { release: slugOr(body.release, ''), step: slugOr(body.step, ''), runtime: slugOr(body.runtime, ''), view: slugOr(body.view, '') };
  for (const [k, v] of Object.entries(fields)) if (v === null) return { error: k };
  const text = scrub(body.text);
  if (signal === 'comment' && !text) return { error: 'text' };
  return { row: { site, module, signal, text, ...fields } };
}

function cors(origin, env) {
  const allowed = String(env.ALLOWED_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean);
  const ok = origin && allowed.includes(origin);
  return {
    ok,
    headers: ok ? {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
      'Vary': 'Origin',
    } : { 'Vary': 'Origin' },
  };
}

const json = (data, status, headers) =>
  new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', ...headers } });

async function handleSignal(request, env, c) {
  if (!c.ok) return json({ error: 'origin' }, 403, c.headers);
  if (env.LIMITER) {
    // The key is used only for the in-memory counter and is never stored.
    const key = request.headers.get('CF-Connecting-IP') || 'anon';
    const { success } = await env.LIMITER.limit({ key });
    if (!success) return json({ error: 'slow down' }, 429, c.headers);
  }
  const raw = await request.text();
  if (raw.length > MAX_BODY) return json({ error: 'too large' }, 413, c.headers);
  let body;
  try { body = JSON.parse(raw); } catch { return json({ error: 'json' }, 400, c.headers); }
  const v = validate(body);
  if (v.error) return json({ error: v.error }, 400, c.headers);
  const r = v.row;
  const day = new Date().toISOString().slice(0, 10);
  await env.DB.prepare(
    'INSERT INTO signals (day, site, release, module, step, signal, runtime, view, text) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
  ).bind(day, r.site, r.release, r.module, r.step, r.signal, r.runtime, r.view, r.text).run();
  return json({ ok: true }, 200, c.headers);
}

async function handleSummary(request, env) {
  const auth = request.headers.get('Authorization') || '';
  if (!env.READ_TOKEN || auth !== `Bearer ${env.READ_TOKEN}`) return json({ error: 'auth' }, 401);
  const url = new URL(request.url);
  const since = /^\d{4}-\d{2}-\d{2}$/.test(url.searchParams.get('since') || '') ? url.searchParams.get('since') : '2000-01-01';
  const counts = await env.DB.prepare(
    'SELECT release, module, step, signal, COUNT(*) AS n FROM signals WHERE day >= ? GROUP BY release, module, step, signal ORDER BY module, step'
  ).bind(since).all();
  const comments = await env.DB.prepare(
    "SELECT day, release, module, step, signal, runtime, text FROM signals WHERE day >= ? AND text != '' ORDER BY id DESC LIMIT 200"
  ).bind(since).all();
  return json({ since, counts: counts.results, comments: comments.results }, 200);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const c = cors(request.headers.get('Origin'), env);
    if (request.method === 'OPTIONS') return new Response(null, { status: c.ok ? 204 : 403, headers: c.headers });
    if (url.pathname === '/signal' && request.method === 'POST') return handleSignal(request, env, c);
    if (url.pathname === '/summary' && request.method === 'GET') return handleSummary(request, env);
    return json({ error: 'not found' }, 404, c.headers);
  },
};
