#!/usr/bin/env node
'use strict';
// story-judge.js <page.md> <out.json> [n=3] — module-scoped storytelling judge, n independent opus calls.
const fs = require('fs'); const path = require('path'); const { spawn } = require('child_process');
const [page, out, n = 3] = process.argv.slice(2);
const prompt = fs.readFileSync(path.join(__dirname, 'story-judge.md'), 'utf8') + fs.readFileSync(page, 'utf8');
const call = () => new Promise((res, rej) => {
  const p = spawn('claude', ['-p', '--model', process.env.JUDGE_MODEL || 'opus', '--output-format', 'text']);
  let o = ''; p.stdout.on('data', (d) => (o += d)); p.on('close', (c) => (c ? rej(new Error('exit ' + c)) : res(o)));
  p.stdin.end(prompt);
});
const parse = (t) => { const b = [...t.matchAll(/```json\s*([\s\S]*?)```/g)]; return JSON.parse(b.length ? b[b.length - 1][1] : t.slice(t.indexOf('{'), t.lastIndexOf('}') + 1)); };
(async () => {
  const runs = await Promise.all(Array.from({ length: Number(n) }, () => call().then(parse).catch((e) => ({ error: String(e) }))));
  const ok = runs.filter((r) => !r.error);
  const med = (k) => { const xs = ok.map((r) => r[k]).sort((a, b) => a - b); return xs[Math.floor(xs.length / 2)]; };
  const median = Object.fromEntries(['frame', 'narrative', 'pov', 'stance', 'register'].map((k) => [k, med(k)]));
  median.mean4 = Math.round((median.frame + median.narrative + median.pov + median.stance) / 4);
  fs.writeFileSync(out, JSON.stringify({ page: path.basename(page), model: process.env.JUDGE_MODEL || 'opus', median, runs }, null, 2));
  console.log(path.basename(page), median);
})();
