#!/usr/bin/env node
'use strict';
// score.js — the one scalar per module: can the student state the module's target idea cold?
//
//   node score.js --in answers.jsonl [--out scored.jsonl] [--cache cache.jsonl] [--model sonnet]
// Two calls per answer (2026-11-13; was 12): one blind call writes TEACH_K restatements, one call
// matches each against the eight targets in a shuffled order. TEACH_SPLIT=1 = the old 12-call method.
// Rows are deduplicated by (group, id); --cache keeps each scored answer, so a rerun re-pays nothing.
// Each input line: {"id", "module", "answer"} (answer = the student's own words to the cold question).
// The judge never sees the module. Step 1, with no targets in view, turns the answer into the claim a
// colleague could act on, or NO CLAIM. Step 2 matches that claim (not the answer) against all eight
// targets in a shuffled order, plus "none". TEACH_K restatements (default 4) x 2 shuffles per answer.
// stated = mean share of those judgements landing on this module's Big Idea, 0-100. A borderline answer
// scores in between instead of flipping between 0 and 1, which is what made repeat runs swing. Output adds {claims, picks, score, hit (all agree), half (any)}. Summary per module on stdout.
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { askAsync, pool, targets } = require('./lib');

const a = Object.fromEntries(process.argv.slice(2).reduce((acc, v, i, arr) =>
  (v.startsWith('--') ? acc.concat([[v.slice(2), arr[i + 1]]]) : acc), []));
const T = targets().modules;
const MAIN = require.main === module;
const rows = MAIN ? [...new Map(fs.readFileSync(a.in, 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l))
  .map((r) => [`${r.group || ''}|${r.id}`, r])).values()] : [];
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

// Lean method, step 1 (blind, one call): K independent readings of the answer as claims.
async function restateK(answer, K) {
  const r = await askAsync(`Someone answered this question: "A colleague missed a training module. In one or two sentences, what is the one idea from it they should not miss?"

Their answer:
"""${answer}"""

Imagine ${K} different colleagues each hear this answer. For each, write the one claim they now hold, as an instruction they could act on next week, in plain words of their own. Do not reuse the answer's distinctive terms; say what they mean. Each colleague reads it on their own: where the answer is clear they will agree, and only real ambiguity makes them differ.
A colleague writes exactly "NO CLAIM" when the answer is vague or generic, strings terms together without saying what to do or what is true, or when they would have to guess what it means.

Answer with one json block: {"claims": ["..." or "NO CLAIM", ... exactly ${K} items], "why": "one short line"}`, MODEL);
  const c = Array.isArray(r.claims) ? r.claims.map((x) => String(x || '').trim()) : [];
  if (c.length !== K) throw new Error(`restate: got ${c.length} claims, want ${K}`);
  return { claims: c, why: r.why };
}

// Lean method, step 2 (one call): each claim against the eight targets, one shuffled order.
async function pickAll(claims, seed) {
  const o = order(seed);
  const r = await askAsync(`Colleagues heard about a training module. Each now holds one claim:
${claims.map((c, i) => `${i + 1}. ${c}`).join('\n')}

For EACH claim separately: which ONE of the eight ideas below does it carry in substance, so that colleague would act on that idea? A different idea from the same topic is NONE. Shared words are not enough.

${o.map((t, i) => `${LETTERS[i]}. ${t.target}`).join('\n')}
NONE. None of these.

Answer with one json block: {"picks": ["A".."H" or "NONE", one per claim in order], "why": "one short line"}`, MODEL);
  const ps = Array.isArray(r.picks) ? r.picks : [];
  if (ps.length !== claims.length) throw new Error(`pick: got ${ps.length} picks, want ${claims.length}`);
  return { picks: ps.map((p) => { const i = LETTERS.indexOf(String(p || '').trim().toUpperCase()); return i >= 0 && String(p).trim().length === 1 ? o[i].module : 'none'; }), why: r.why };
}

// fast.js scores each student the moment they finish, with the same two lean calls.
async function scoreOne(r, K = Number(process.env.TEACH_K || 4)) {
  const st = await restateK(r.answer, K);
  const live = st.claims.map((c, i) => [c, i]).filter(([c]) => c && !/^NO CLAIM/i.test(c));
  const pk = live.length ? await pickAll(live.map(([c]) => c), `${r.id}#lean`) : { picks: [], why: '' };
  const picks = st.claims.map(() => 'none'); live.forEach(([, i], j) => { picks[i] = pk.picks[j]; });
  return { claims: st.claims, picks, score: picks.filter((m) => m === r.module).length / picks.length };
}
module.exports = { scoreOne, targets: T };
if (MAIN) (async () => {
const K = Number(process.env.TEACH_K || 4); // claim restatements per answer
const SPLIT = process.env.TEACH_SPLIT === '1';
const TH = crypto.createHash('sha256').update(T.map((t) => t.module + t.target).join('|')).digest('hex').slice(0, 12);
const keyOf = (r) => crypto.createHash('sha256').update([SPLIT ? 'split' : 'lean', MODEL, K, TH, r.module, r.answer].join('\n')).digest('hex').slice(0, 20);
const cache = new Map(a.cache && fs.existsSync(a.cache) ? fs.readFileSync(a.cache, 'utf8').split('\n').filter(Boolean).map((l) => { const c = JSON.parse(l); return [c.key, c]; }) : []);
let fresh = 0;
const all = await pool(rows, async (r) => { try {
  const key = keyOf(r);
  if (cache.has(key)) { const c = cache.get(key); return { ...r, claims: c.claims, picks: c.picks, why: c.why, score: c.score, hit: c.score === 1, half: c.score > 0 }; }
  if (!SPLIT) {
    const st = await restateK(r.answer, K);
    const live = st.claims.map((c, i) => [c, i]).filter(([c]) => c && !/^NO CLAIM/i.test(c));
    const pk = live.length ? await pickAll(live.map(([c]) => c), `${r.id}#lean`) : { picks: [], why: '' };
    const picks = st.claims.map(() => 'none'); live.forEach(([, i], j) => { picks[i] = pk.picks[j]; });
    const score = picks.filter((m) => m === r.module).length / picks.length;
    if (a.cache) { fs.appendFileSync(a.cache, JSON.stringify({ key, claims: st.claims, picks, why: [st.why, pk.why], score }) + '\n'); fresh++; }
    return { ...r, claims: st.claims, picks, why: [st.why, pk.why], score, hit: score === 1, half: score > 0 };
  }
  const claims = [], picks = [], why = [];
  await Promise.all(Array.from({ length: K }, async (_, k) => {
    const c = await restate(r.answer);
    const claim = String(c.claim || '').trim();
    if (!claim || /^NO CLAIM/i.test(claim)) { claims.push('NO CLAIM'); picks.push('none', 'none'); why.push(c.why); return; }
    claims.push(claim);
    const ps = await Promise.all([pick(claim, `${r.id}#${k}a`), pick(claim, `${r.id}#${k}b`)]);
    for (const p of ps) { picks.push(p.module); why.push(p.why); }
  }));
  const score = picks.filter((m) => m === r.module).length / picks.length;
  if (a.cache) { fs.appendFileSync(a.cache, JSON.stringify({ key, claims, picks, why, score }) + '\n'); fresh++; }
  // score: share of the 2K judgements that land on this module's Big Idea (the number to rank on).
  // hit: every judgement agrees (strict, kept for the trainer-agreement check).
  return { ...r, claims, picks, why, score, hit: score === 1, half: score > 0 };
} catch (e) { return { ...r, failed: String(e.message || e).slice(0, 200) }; } });
const out = all.filter((r) => !r.failed);
console.error(`[score] ${rows.length} answers: ${fresh} scored now, ${rows.length - fresh - all.filter((x) => x.failed).length} from cache`);
for (const r of all.filter((x) => x.failed)) console.error(`[score] FAILED ${r.id}: ${r.failed}`);
process.exitCode = all.length === out.length ? 0 : 3; // a dropped answer must not pass silently
if (a.out) fs.writeFileSync(a.out, out.map((r) => JSON.stringify(r)).join('\n') + '\n');
const by = {};
for (const r of out) { const k = `${r.module}${r.group ? ' · ' + r.group : ''}`; (by[k] ||= []).push(r); }
console.table(Object.fromEntries(Object.entries(by).map(([k, rs]) => [k, {
  n: rs.length, stated: Math.round(100 * rs.reduce((t, r) => t + r.score, 0) / rs.length),
  strict: `${rs.filter((r) => r.hit).length}/${rs.length}`, any: rs.filter((r) => r.half).length,
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
