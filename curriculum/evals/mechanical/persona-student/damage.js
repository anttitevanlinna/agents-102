#!/usr/bin/env node
'use strict';
// damage.js — build the blind-check copy of a student-view module: the load-bearing beats
// removed and generic padding added. If the persona-student scores this copy the same as the
// original, the instrument cannot see quality and its numbers mean nothing.
//
//   node damage.js --module security --page student-view.md --out damaged.md
// Which beats are load-bearing lives in modules/<module>.json "damage".
const fs = require('fs');
const path = require('path');
const { beats } = require('./lib');

const a = Object.fromEntries(process.argv.slice(2).reduce((acc, v, i, arr) =>
  (v.startsWith('--') ? acc.concat([[v.slice(2), arr[i + 1]]]) : acc), []));
const mod = JSON.parse(fs.readFileSync(path.join(__dirname, 'modules', `${a.module}.json`), 'utf8'));
const { remove = [], pad_after = [] } = mod.damage || {};

const PAD = (mod.damage && mod.damage.pad) || [
  'AI security is a rapidly evolving field, and organisations of every size are working out how best to approach it. It is important to stay informed, to follow best practices, and to involve the right stakeholders early. Many frameworks exist, and each has its strengths. The key is to find the approach that works for your organisation and to keep iterating as the landscape changes.',
  'Industry analysts expect agent adoption to accelerate significantly over the coming years, which makes it all the more important to think about governance now. Leading companies are investing in responsible AI programmes, cross-functional working groups and training. By taking a proactive stance today, you position your organisation to capture the benefits of AI while managing its risks.',
  'Remember that security is everyone\'s responsibility. A strong security culture, clear policies and regular awareness training remain the foundation, and agents are simply one more area where those principles apply.',
];

const bs = beats(fs.readFileSync(a.page, 'utf8'));
const missing = remove.filter((id) => !bs.some((b) => b.id === id));
if (missing.length) throw new Error(`damage: beats not found: ${missing.join(', ')}`);
let p = 0;
const out = [];
for (const b of bs) {
  if (remove.includes(b.id)) continue;
  out.push(`${b.id.includes('/') ? '##' : '#'} ${b.heading}\n\n${b.body}`);
  if (pad_after.includes(b.id)) out.push(PAD[p++ % PAD.length]);
}
fs.writeFileSync(a.out, out.join('\n\n') + '\n');
console.log(`[damage] removed ${remove.length} beats, padded ${pad_after.length} → ${a.out}`);
