#!/usr/bin/env node
'use strict';
// pairs.js — the persona-student (or a plain judge) picks a side on the frozen Antti-pairs
// calibration set (curriculum/evals/calibration/antti-pairs/). The picks go to that set's
// score.py; agreement with Antti, by tier and kind, is the instrument's calibration number.
//
//   node pairs.js --blind pairs.blind.jsonl --out picks.jsonl \
//        [--persona-dir DIR --persona ID]   (omit for the plain-judge reader)
//        [--rules taste.md]                 (maintainer's stated taste, prepended)
//        [--examples taste-examples.md[,more.md]] (maintainer's past calls with reasons + reference frames; comma-separated)
const fs = require('fs');
const { loadPersona, askJson } = require('./lib');

const a = Object.fromEntries(process.argv.slice(2).reduce((acc, v, i, arr) =>
  (v.startsWith('--') ? acc.concat([[v.slice(2), arr[i + 1]]]) : acc), []));
const pairs = fs.readFileSync(a.blind, 'utf8').trim().split('\n').map(JSON.parse);
const persona = a.persona ? loadPersona(a['persona-dir'], a.persona) : null;
const examples = a.examples ? a.examples.split(',').map((f) => `\n\n${fs.readFileSync(f, 'utf8')}`).join('') : '';
const rules = a.rules ? `\n\nThe course author's taste, in their own words. Apply it:\n${fs.readFileSync(a.rules, 'utf8')}` : '';
const BATCH = Number(process.env.PAIRS_BATCH || 12);
// PAIRS_TIE=1: the judge may answer "same". Forced a/b made it name a winner between equal versions:
// on neutral rewrites it kept the original in both orders 10 of 28 times (judge-bias/README.md, 2026-11-14),
// and a loop read that as "the edit lost". Calibration sets that expect a/b (check-judge.sh) leave it off.
const TIE = process.env.PAIRS_TIE === '1';
const tieAsk = TIE ? '\nIf neither version is clearly better for the room, answer "same". Clearly better means you can name the rule or past call above that it follows and the other breaks; wording you merely find more familiar, smoother or closer to the rest of the slide is "same". The two versions are in random order; neither is the original.' : '';

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
  const out = askJson(`${who}${rules}${examples}\n\n${ask}\nThe two versions differ only in part of the text; find the difference first.${tieAsk}\n\n${body}\n\nAnswer with one json block: {"picks":[{"id","pick":"a"|"b"${TIE ? '|"same"' : ''},"why":"one short line${TIE ? ' naming the rule or past call' : ''}"}...one per pair]}`);
  for (const p of out.picks || []) if (chunk.some((c) => c.id === p.id)) picks.push(p);
  process.stderr.write(`[pairs] ${Math.min(i + BATCH, pairs.length)}/${pairs.length}\n`);
}
fs.writeFileSync(a.out, picks.map((p) => JSON.stringify({ reader: (persona ? `${persona.id}@${persona.hash}` : 'plain-judge') + (a.rules ? '+rules' : '') + (a.examples ? '+examples' : ''), ...p })).join('\n') + '\n');
console.log(`[pairs] ${picks.length}/${pairs.length} picks → ${a.out}`);
