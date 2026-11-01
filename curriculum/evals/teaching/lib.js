'use strict';
// Async claude -p + a small pool, so many short calls run in parallel (TEACH_JOBS, default 8).
const { spawn } = require('child_process');
const { lastJson } = require('../mechanical/persona-student/lib');

function askAsync(prompt, model, tries = 2) {
  return new Promise((res, rej) => {
    const c = spawn('claude', ['-p', '--model', model, '--output-format', 'text']);
    let out = '', err = '';
    c.stdout.on('data', (d) => (out += d)); c.stderr.on('data', (d) => (err += d));
    c.on('close', (code) => {
      try { if (code) throw new Error(err.slice(0, 300)); res(lastJson(out)); }
      catch (e) { tries > 1 ? askAsync(prompt, model, tries - 1).then(res, rej) : rej(e); }
    });
    c.stdin.end(prompt);
  });
}
async function pool(items, fn, n = Number(process.env.TEACH_JOBS || 8)) {
  const out = new Array(items.length); let i = 0;
  await Promise.all(Array.from({ length: n }, async () => { while (i < items.length) { const k = i++; out[k] = await fn(items[k]); } }));
  return out;
}
const args = () => Object.fromEntries(process.argv.slice(2).reduce((acc, v, i, arr) =>
  (v.startsWith('--') ? acc.concat([[v.slice(2), arr[i + 1] && !arr[i + 1].startsWith('--') ? arr[i + 1] : true]]) : acc), []));
module.exports = { askAsync, pool, args };
