#!/usr/bin/env node
'use strict';
// score.js — the one scalar per module: can the student state the module's target idea cold?
//
//   node score.js --in answers.jsonl [--out scored.jsonl] [--model sonnet]
// Each input line: {"id", "module", "answer"} (answer = the student's own words to the cold question).
// The judge never sees the module. Step 1, with no targets in view, turns the answer into the claim a
// colleague could act on, or NO CLAIM. Step 2 matches that claim (not the answer) against all eight
// targets in a shuffled order, plus "none". Two shuffles; a HIT needs both to pick this module's target. Output adds {picks, hit, half}. Summary per module on stdout.
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { askAsync, pool, targets } = require('./lib');

const a = Object.fromEntries(process.argv.slice(2).reduce((acc, v, i, arr) =>
  (v.startsWith('--') ? acc.concat([[v.slice(2), arr[i + 1]]]) : acc), []));
const T = targets().modules;
const rows = fs.readFileSync(a.in, 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l));
const MODEL = a.model || process.env.TEACH_MODEL || 'sonnet';
const LETTERS = 'ABCDEFGH';

function order(seed) { // deterministic shuffle of the eight targets
  return T.map((t) => ({ t, k: crypto.createHash('sha256').update(seed + t.module).digest('hex') }))
    .sort((x, y) => (x.k < y.k ? -1 : 1)).map((x) => x.t);
}

// Step 1, blind to the targets: what would a colleague DO after hearing this answer? The eight
// targets are not in view, so their wording cannot prime a claim out of loose keywords.
async function restate(answer) {
  return askAsync(`Someone answered this question: "A colleague missed a training module. In one or two sentences, what is the one idea from it they should not miss?"

Their answer:
"""${answer}"""

You are the colleague. Write the one claim you now hold, as an instruction you could act on next week, in plain words of your own. Do not reuse the answer's distinctive terms; say what they mean.
If you cannot, write exactly "NO CLAIM". That is the right call when the answer is vague or generic, when it strings terms together without saying what to do or what is true, or when you would have to guess what it means.

Answer with one json block: {"claim": "..." or "NO CLAIM", "why": "one short line"}`, MODEL);
}

// Step 2: match the colleague's claim (never the answer's words) against the eight targets.
async function pick(claim, seed) {
  const o = order(seed);
  const r = await askAsync(`A colleague heard about a training module and now holds this claim:
"""${claim}"""

Which ONE of the eight ideas below does the claim carry in substance, so the colleague would act on that idea? A different idea from the same topic is NONE. Shared words are not enough.

${o.map((t, i) => `${LETTERS[i]}. ${t.target}`).join('\n')}
NONE. None of these.

Answer with one json block: {"pick": "A".."H" or "NONE", "why": "one short line"}`, MODEL);
  const i = LETTERS.indexOf(String(r.pick || '').trim().toUpperCase());
  return { module: i >= 0 && r.pick.trim().length === 1 ? o[i].module : 'none', why: r.why };
}

(async () => {
const out = await pool(rows, async (r) => {
  const c = await restate(r.answer);
  const claim = String(c.claim || '').trim();
  if (!claim || /^NO CLAIM/i.test(claim)) return { ...r, claim: 'NO CLAIM', picks: ['none', 'none'], why: [c.why], hit: false, half: false };
  const [p1, p2] = await Promise.all([pick(claim, `${r.id}#1`), pick(claim, `${r.id}#2`)]);
  const picks = [p1.module, p2.module];
  return { ...r, claim, picks, why: [p1.why, p2.why], hit: picks.every((m) => m === r.module), half: picks.some((m) => m === r.module) };
});
if (a.out) fs.writeFileSync(a.out, out.map((r) => JSON.stringify(r)).join('\n') + '\n');
const by = {};
for (const r of out) { const k = `${r.module}${r.group ? ' · ' + r.group : ''}`; (by[k] ||= []).push(r); }
console.table(Object.fromEntries(Object.entries(by).map(([k, rs]) => [k, {
  n: rs.length, target_stated: `${Math.round(100 * rs.filter((r) => r.hit).length / rs.length)}%`,
  one_of_two: rs.filter((r) => r.half).length,
}])));
const gold = out.filter((r) => r.label === 'yes' || r.label === 'no');
if (gold.length) { // real learners marked by the trainer: does the scorer agree with the gold?
  const agree = gold.filter((r) => r.hit === (r.label === 'yes')).length;
  console.log(`agreement with trainer marks: ${agree}/${gold.length}`);
  for (const r of gold.filter((r) => r.hit !== (r.label === 'yes'))) console.log(`  DISAGREE ${r.id}: trainer ${r.label}, scorer ${r.picks.join(' / ')} | ${r.answer}`);
}
if (rows.some((r) => 'expect' in r)) { // classifier self-check: expected pick vs both picks
  const bad = out.filter((r) => !r.picks.every((m) => m === r.expect));
  console.log(`classifier check: ${out.length - bad.length}/${out.length} as expected`);
  for (const r of bad) console.log(`  MISS ${r.id} (${r.kind}) expected ${r.expect}, got ${r.picks.join(' / ')}`);
}
})();
