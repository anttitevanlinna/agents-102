#!/usr/bin/env node
'use strict';
// flags.js — the sentence checks (scripts/sentence-flags.js) scoped to one module's files,
// run against any checkout that carries a variant of those files.
//
//   node flags.js <checkout-root> [--module personal-to-team] [--json]
// The file set = the module page + every lecture/exercise it links + the slides those include.
const path = require('path');
const root = path.resolve(process.argv[2]);
const { buildLedger } = require(path.join(root, 'scripts/sentence-ledger.js'));
const { flagRows, slideCounts, quantile, NARRATOR } = require(path.join(root, 'scripts/sentence-flags.js'));

const fs = require('fs');
const argv = process.argv.slice(3);
const modName = argv.includes('--module') ? argv[argv.indexOf('--module') + 1] : 'personal-to-team';
const CUR = path.join(root, 'curriculum');
const modRel = `trainings/agents-101/${modName}.md`;
const body = (rel) => fs.readFileSync(path.join(CUR, rel), 'utf8').split('<!-- maintainer -->')[0];
const linked = [...body(modRel).matchAll(/\]\(((?:lectures|exercises)\/[a-z0-9-]+\.md)\)/g)].map((m) => m[1]);
const FILES = new Set([modRel, ...linked]);
const all = buildLedger('agents-101').rows;
const rows = all.filter((r) => FILES.has(r.file) || (r.usedBy || []).some((u) => FILES.has(u)));
const prose = rows.filter((r) => r.kind !== 'heading');
const flags = flagRows(rows);
const counts = slideCounts(rows);
const p90 = quantile([...slideCounts(buildLedger('agentic-engineering-101').rows).values()], 0.9);
const wps = (rs) => { const m = new Map(); for (const r of rs) if (r.kind !== 'heading') m.set(`${r.file}#${r.slide || ''}`, (m.get(`${r.file}#${r.slide || ''}`) || 0) + r.words); return quantile([...m.values()], 0.5); };
const has = (k) => flags.filter((f) => f.reasons.some((r) => r.startsWith(k)));
const out = {
  sentences: prose.length,
  words: prose.reduce((s, r) => s + r.words, 0),
  median_sentences_per_slide: quantile([...counts.values()], 0.5),
  median_words_per_slide: wps(rows),
  ae101_median_words_per_slide: wps(buildLedger('agentic-engineering-101').rows),
  narrator: has('narrator').length,
  narrator_per_1000: Math.round(1000 * prose.filter((r) => NARRATOR.test(r.text)).length / prose.length),
  put_down: has('put-down').length,
  loaded: has('loaded').length,
  dense_slides: [...counts].filter(([, n]) => n > p90).length,
  flagged: flags.map((f) => ({ where: `${f.file}#${f.slide || ''}`, text: f.text, why: f.reasons })),
};
if (process.argv.includes('--json')) console.log(JSON.stringify(out, null, 1));
else { const { flagged, ...nums } = out; console.table(nums); flagged.forEach((f) => console.log(`- ${f.where} · "${f.text}" · ${f.why.join('; ')}`)); }
