import { test } from 'node:test';
import assert from 'node:assert/strict';
import worker, { scrub, validate } from './index.js';

function fakeDB() {
  const rows = [];
  return {
    rows,
    prepare(sql) {
      return {
        bind(...args) {
          return {
            async run() { rows.push({ sql, args }); return {}; },
            async all() { return { results: sql.includes('COUNT') ? [{ n: rows.length }] : rows.map(r => ({ text: r.args[8] })) }; },
          };
        },
      };
    },
  };
}
const ORIGIN = 'https://agents102.bosser.consulting';
const env = () => ({ DB: fakeDB(), ALLOWED_ORIGINS: ORIGIN, READ_TOKEN: 't0k' });
const post = (body, origin = ORIGIN) => new Request('https://w.example/signal', {
  method: 'POST', headers: { Origin: origin, 'Content-Type': 'application/json' }, body: JSON.stringify(body),
});

test('scrub removes contact details and links', () => {
  assert.equal(scrub('mail me at anna.k@firm.fi or +358 40 123 4567, see https://x.io/a?b=1'),
    'mail me at [email] or [number], see [link]');
  assert.equal(scrub('x'.repeat(900)).length, 500);
});

test('validate rejects unknown signals and odd slugs', () => {
  assert.equal(validate({ signal: 'love', module: 'M1' }).error, 'signal');
  assert.equal(validate({ signal: 'worked', module: '<script>' }).error, 'module');
  assert.equal(validate({ signal: 'comment', module: 'M1', text: '   ' }).error, 'text');
  assert.deepEqual(validate({ signal: 'stuck', module: 'M1', step: 'exercises-x', text: 'hi' }).row.step, 'exercises-x');
});

test('stores a row with no IP, user agent or time of day', async () => {
  const e = env();
  const res = await worker.fetch(post({ signal: 'stuck', module: 'M1', step: 'exercises-x', text: 'folder picker hid', runtime: 'cowork', view: 'read', release: '2026-11-25' }), e);
  assert.equal(res.status, 200);
  assert.equal(res.headers.get('Access-Control-Allow-Origin'), ORIGIN);
  const { args } = e.DB.rows[0];
  assert.match(args[0], /^\d{4}-\d{2}-\d{2}$/);
  assert.equal(args.length, 9);
  assert.deepEqual(args.slice(1), ['handbook', '2026-11-25', 'M1', 'exercises-x', 'stuck', 'cowork', 'read', 'folder picker hid']);
});

test('refuses other origins and oversize bodies', async () => {
  assert.equal((await worker.fetch(post({ signal: 'worked', module: 'M1' }, 'https://evil.example'), env())).status, 403);
  assert.equal((await worker.fetch(post({ signal: 'comment', module: 'M1', text: 'x'.repeat(5000) }), env())).status, 413);
});

test('summary needs the read token', async () => {
  const e = env();
  await worker.fetch(post({ signal: 'worked', module: 'M2' }), e);
  const no = await worker.fetch(new Request('https://w.example/summary'), e);
  assert.equal(no.status, 401);
  const yes = await worker.fetch(new Request('https://w.example/summary', { headers: { Authorization: 'Bearer t0k' } }), e);
  assert.equal(yes.status, 200);
  assert.equal((await yes.json()).counts[0].n, 1);
});
