#!/usr/bin/env node
'use strict';
// flags.js — the sentence checks (scripts/sentence-flags.js, PR #22) scoped to Module 7's files,
// run against any checkout that carries a variant of those files.
//
//   node flags.js <checkout-root> [--json]
const path = require('path');
const root = path.resolve(process.argv[2]);
const { buildLedger } = require(path.join(root, 'scripts/sentence-ledger.js'));
const { flagRows, slideCounts, quantile, NARRATOR } = require(path.join(root, 'scripts/sentence-flags.js'));

const M7 = new Set([
  'trainings/agents-101/personal-to-team.md', 'exercises/share-your-work.md',
  'exercises/design-the-sharing-plan.md', 'exercises/test-the-sharing-plan.md',
  'lectures/access-is-not-absorption.md', 'slides/three-parts-copy.md',
  'slides/access-is-easy.md', 'slides/what-would-have-to-be-true.md',
]);
const rows = buildLedger('agents-101').rows.filter((r) => M7.has(r.file));
const prose = rows.filter((r) => r.kind !== 'heading');
const flags = flagRows(rows);
const counts = slideCounts(rows);
const p90 = quantile([...slideCounts(buildLedger('agentic-engineering-101').rows).values()], 0.9);
const has = (k) => flags.filter((f) => f.reasons.some((r) => r.startsWith(k)));
const out = {
  sentences: prose.length,
  words: prose.reduce((s, r) => s + r.words, 0),
  median_sentences_per_slide: quantile([...counts.values()], 0.5),
  narrator: has('narrator').length,
  narrator_per_1000: Math.round(1000 * prose.filter((r) => NARRATOR.test(r.text)).length / prose.length),
  put_down: has('put-down').length,
  loaded: has('loaded').length,
  dense_slides: [...counts].filter(([, n]) => n > p90).length,
  flagged: flags.map((f) => ({ where: `${f.file}#${f.slide || ''}`, text: f.text, why: f.reasons })),
};
if (process.argv.includes('--json')) console.log(JSON.stringify(out, null, 1));
else { const { flagged, ...nums } = out; console.table(nums); flagged.forEach((f) => console.log(`- ${f.where} · "${f.text}" · ${f.why.join('; ')}`)); }
