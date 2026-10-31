#!/usr/bin/env node
'use strict';
// pairs.js — the persona-student (or a plain judge) picks a side on the frozen Antti-pairs
// calibration set (curriculum/evals/calibration/antti-pairs/). The picks go to that set's
// score.py; agreement with Antti, by tier and kind, is the instrument's calibration number.
//
//   node pairs.js --blind pairs.blind.jsonl --out picks.jsonl \
//        [--persona-dir DIR --persona ID]   (omit for the plain-judge reader)
const fs = require('fs');
const { loadPersona, askJson } = require('./lib');

const a = Object.fromEntries(process.argv.slice(2).reduce((acc, v, i, arr) =>
  (v.startsWith('--') ? acc.concat([[v.slice(2), arr[i + 1]]]) : acc), []));
const pairs = fs.readFileSync(a.blind, 'utf8').trim().split('\n').map(JSON.parse);
const persona = a.persona ? loadPersona(a['persona-dir'], a.persona) : null;
const BATCH = Number(process.env.PAIRS_BATCH || 12);

const who = persona
  ? `${persona.text}\n\n---\nYou are this person, in the room. A trainer shows you one slide. There are two versions of it.`
  : 'You are judging training slides for a cohort of busy professionals. Each slide exists in two versions.';
const ask = persona
  ? 'For each pair: which version would YOU rather see on the screen in the room, the one you would enjoy more and actually learn from? Pick on your own reaction, not on what a reviewer would call better writing.'
  : 'For each pair: which version is the better slide for the room, the one participants would enjoy more and learn more from?';

const picks = [];
for (let i = 0; i < pairs.length; i += BATCH) {
  const chunk = pairs.slice(i, i + BATCH);
  const body = chunk.map((p) => `### PAIR ${p.id}\n--- A ---\n${p.a}\n--- B ---\n${p.b}`).join('\n\n');
  const out = askJson(`${who}\n\n${ask}\nThe two versions differ only in part of the text; find the difference first.\n\n${body}\n\nAnswer with one json block: {"picks":[{"id","pick":"a"|"b","why":"one short line"}...one per pair]}`);
  for (const p of out.picks || []) if (chunk.some((c) => c.id === p.id)) picks.push(p);
  process.stderr.write(`[pairs] ${Math.min(i + BATCH, pairs.length)}/${pairs.length}\n`);
}
fs.writeFileSync(a.out, picks.map((p) => JSON.stringify({ reader: persona ? `${persona.id}@${persona.hash}` : 'plain-judge', ...p })).join('\n') + '\n');
console.log(`[pairs] ${picks.length}/${pairs.length} picks → ${a.out}`);
