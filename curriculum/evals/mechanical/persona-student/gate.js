#!/usr/bin/env node
'use strict';
// gate.js — step one of the two-step taste judge. For each pair, decide only whether the LONGER
// version's extra text does one of three jobs the maintainer keeps longer text for. Output
// {id, gate:"keep_longer"|"fall_through", longer:"a"|"b", why}. Step two (pairs.js) decides the rest;
// combine with score-gate.py.
//   node gate.js --blind pairs.blind.jsonl --out gate.jsonl
const fs = require('fs');
const { askJson } = require('./lib');
const a = Object.fromEntries(process.argv.slice(2).reduce((acc, v, i, arr) =>
  (v.startsWith('--') ? acc.concat([[v.slice(2), arr[i + 1]]]) : acc), []));
const pairs = fs.readFileSync(a.blind, 'utf8').trim().split('\n').map(JSON.parse);
const BATCH = Number(process.env.PAIRS_BATCH || 12);
const words = (s) => s.split(/\s+/).filter(Boolean).length;
const out = [];
for (let i = 0; i < pairs.length; i += BATCH) {
  const chunk = pairs.slice(i, i + BATCH).map((p) => ({ ...p, longer: words(p.a) >= words(p.b) ? 'a' : 'b' }));
  const body = chunk.map((p) => `### PAIR ${p.id} (longer version: ${p.longer.toUpperCase()})\n--- A ---\n${p.a}\n--- B ---\n${p.b}`).join('\n\n');
  const res = askJson(`You are checking training slides for a course for busy professionals. Each slide exists in two versions; one is longer. Find the text that only the longer version has.

Answer ONE question per pair: does that extra text do one of these three jobs?
1. ORIENTATION: repeats where the student is or what lane they are in, at a moment they switch window, terminal, session or task.
2. MEMORY NUMERAL: a number that helps the student hold a list or structure in mind ("five things", "three questions").
3. UNSPOKEN OBJECTION: answers a doubt the room will have but not say (for example "you just used a bad model", "this only works for coders").

Only these three jobs count. Explanation, emphasis, a closer that restates, a forward hint, a nicer phrasing, or a witty line do NOT count. If the extra text is mostly something else with a trace of one job, answer no.

${body}

Answer with one json block: {"gates":[{"id","job":"orientation"|"memory-numeral"|"unspoken-objection"|"none","why":"one short line"}...one per pair]}`);
  for (const g of res.gates || []) {
    const p = chunk.find((c) => c.id === g.id); if (!p) continue;
    out.push({ id: g.id, gate: g.job && g.job !== 'none' ? 'keep_longer' : 'fall_through', job: g.job, longer: p.longer, why: g.why });
  }
  process.stderr.write(`[gate] ${Math.min(i + BATCH, pairs.length)}/${pairs.length}\n`);
}
fs.writeFileSync(a.out, out.map((x) => JSON.stringify(x)).join('\n') + '\n');
console.log(`[gate] ${out.filter((x) => x.gate === 'keep_longer').length}/${out.length} keep_longer → ${a.out}`);
