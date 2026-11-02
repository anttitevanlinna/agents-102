'use strict';
// Async claude -p + a small pool, so many short calls run in parallel (TEACH_JOBS, default 8).
const { spawn } = require('child_process');
const { lastJson } = require('../mechanical/persona-student/lib');

function askAsync(prompt, model, tries = 3) {
  return new Promise((res, rej) => {
    const c = spawn('claude', ['-p', '--model', model, '--output-format', 'text']);
    let out = '', err = '';
    c.stdout.on('data', (d) => (out += d)); c.stderr.on('data', (d) => (err += d));
    c.on('close', (code) => {
      try { if (code) throw new Error(err.slice(0, 300)); res(lastJson(out)); }
      catch (e) { tries > 1 ? setTimeout(() => askAsync(prompt, model, tries - 1).then(res, rej), (4 - tries) * 15e3) : rej(e); } // back off: rate limits
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

// The eight targets: each module's "**Big idea:**" line from the strategy file in agents-102-core
// (sibling checkout, or $AGENTS_CORE_DIR). Throws if a section or its Big idea line is missing.
const fs = require('fs');
const path = require('path');
function targets() {
  const cfg = JSON.parse(fs.readFileSync(path.join(__dirname, 'targets.json'), 'utf8'));
  const core = process.env.AGENTS_CORE_DIR || path.join(__dirname, '..', '..', '..', '..', 'agents-102-core');
  const lines = fs.readFileSync(path.join(core, cfg.strategy_file), 'utf8').split('\n');
  const modules = cfg.modules.map((m) => {
    const i = lines.findIndex((l) => l.trim() === m.section);
    if (i < 0) throw new Error(`strategy file: no section "${m.section}"`);
    const end = lines.findIndex((l, k) => k > i && l.startsWith('## '));
    const line = lines.slice(i, end < 0 ? undefined : end).find((l) => /^\*\*Big idea:\*\*/.test(l));
    if (!line) throw new Error(`strategy file: no "**Big idea:**" line under "${m.section}"`);
    return { ...m, target: line.replace(/^\*\*Big idea:\*\*\s*/, '').trim() };
  });
  return { ...cfg, modules };
}
module.exports.targets = targets;
