#!/usr/bin/env node
'use strict';
// language-report.js — the worst slides per module, by the sentence checks.
//
// Each slide (a `##` chunk, or a slide file) gets a score from its sentences:
//   put-down 3 · narrator 2 · loaded one-liner 1 · duplicated in another file 1
//   · every sentence over the comparison training's p90 per slide 1
//   (only on `##` slides; a page with no `##` is read through, not projected).
// A slide belongs to the module that includes it (slide files through their
// includer). Report only: it ranks where to look, it does not decide edits.
//
// Usage: node scripts/language-report.js [--training agents-101] [--top 5] [--json]

const path = require('path');
const { buildLedger, trainingFiles, exactDupes } = require('./sentence-ledger.js');
const { flagRows, slideCounts, quantile } = require('./sentence-flags.js');
const CR = require(path.resolve(__dirname, '../site/layouts/curriculum.js'));

const W = { 'put-down': 3, narrator: 2, loaded: 1 };

function moduleOf(key) {
  // file → module slug, in reading order (first module that includes it wins)
  const tr = CR.TRAININGS[key];
  const src = (tr.contentKey && CR.TRAININGS[tr.contentKey]) || tr;
  const dirKey = tr.contentKey || key;
  const map = new Map();
  let current = null;
  for (const rel of trainingFiles(key)) {
    const m = rel.match(new RegExp(`^trainings/${dirKey}/([^/]+)\\.md$`));
    if (m) current = m[1];
    else if (/\/supplementary\//.test(rel)) current = 'supplementary';
    if (!map.has(rel)) map.set(rel, current);
  }
  return { map, order: [...(src.prework ? [src.prework.slug] : []), ...src.modules.map(x => x.slug), 'supplementary'] };
}

function report(key, cmp) {
  const L = buildLedger(key);
  const { map, order } = moduleOf(key);
  const p90 = quantile([...slideCounts(buildLedger(cmp).rows).values()], 0.9);
  const dupIds = new Set(exactDupes(L.rows).map(g => g[0].id));
  const flags = new Map(flagRows(L.rows).map(f => [f.id + '@' + f.file + ':' + f.pos, f]));
  const slides = new Map();
  for (const r of L.rows) {
    if (r.kind === 'heading') continue;
    const k = r.file + '#' + (r.slide || '');
    if (!slides.has(k)) {
      const mod = r.usedBy ? map.get(r.usedBy[0]) : map.get(r.file);
      slides.set(k, { key: k, file: r.file, slide: r.slide, module: mod || 'other', sentences: 0, score: 0, hits: [] });
    }
    const s = slides.get(k);
    s.sentences++;
    const f = flags.get(r.id + '@' + r.file + ':' + r.pos);
    if (f) for (const reason of f.reasons) {
      const kind = reason.split(':')[0];
      s.score += W[kind] || 0;
      s.hits.push({ kind, text: r.text, line: r.line });
    }
    if (dupIds.has(r.id) && r.words >= 6) { s.score += 1; s.hits.push({ kind: 'duplicate', text: r.text, line: r.line }); }
  }
  for (const s of slides.values()) {
    // density counts only on real slides (a `##` chunk or a slide file);
    // a file with no `##` is a read-through page, not a projected slide
    const over = s.slide ? Math.max(0, s.sentences - p90) : 0;
    s.over = over;
    s.score += over;
  }
  const byModule = new Map(order.map(m => [m, []]));
  for (const s of slides.values()) { if (!byModule.has(s.module)) byModule.set(s.module, []); byModule.get(s.module).push(s); }
  for (const list of byModule.values()) list.sort((a, b) => b.score - a.score || b.sentences - a.sentences);
  return { key, cmp, p90, byModule };
}

module.exports = { report };

if (require.main === module) {
  const argv = process.argv.slice(2);
  const val = (n, d) => { const i = argv.indexOf('--' + n); return i >= 0 ? argv[i + 1] : d; };
  const R = report(val('training', 'agents-101'), val('compare', 'agentic-engineering-101'));
  const top = Number(val('top', 5));
  if (argv.includes('--json')) { console.log(JSON.stringify({ ...R, byModule: Object.fromEntries(R.byModule) }, null, 1)); process.exit(0); }
  console.log(`# Language report: ${R.key}\n\nWorst slides per module by the sentence checks. Score: put-down 3, narrator 2, loaded one-liner 1, duplicated sentence 1, each sentence over ${R.cmp}'s p90 (${R.p90} per slide) 1 (slides with a heading only). Report only.\n`);
  for (const [mod, list] of R.byModule) {
    const scored = list.filter(s => s.score > 0);
    if (!list.length) continue;
    const total = list.reduce((a, s) => a + s.score, 0);
    console.log(`## ${mod} (score ${total} across ${list.length} slides)\n`);
    for (const s of scored.slice(0, top)) {
      console.log(`- **${s.score}** ${s.key} · ${s.sentences} sentences${s.over ? ` (${s.over} over)` : ''}`);
      for (const h of s.hits.slice(0, 4)) console.log(`  - ${h.kind}: "${h.text}"`);
    }
    console.log('');
  }
}
