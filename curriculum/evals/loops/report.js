#!/usr/bin/env node
'use strict';
// report.js <out-dir> <module> — one table per instrument from a loop.sh run.
const fs = require('fs'); const path = require('path');
const [out, mod] = process.argv.slice(2);
const J = (f) => { try { return JSON.parse(fs.readFileSync(path.join(out, f), 'utf8')); } catch (_) { return null; } };
const pages = fs.readdirSync(path.join(out, 'pages')).map((f) => f.replace(/\.md$/, ''));
const order = ['damaged', 'v0', ...pages.filter((p) => p !== 'v0' && p !== 'damaged').sort()].filter((p) => pages.includes(p));
const hashOf = {};
for (const f of fs.readdirSync(path.join(out, 'students')).filter((x) => x.endsWith('.json'))) {
  const d = J(`students/${f}`); hashOf[f.split('-')[0]] = d.page_hash;
}
const L = [`# Loop report: ${mod}`, '', `Run dir: \`${out}\``, ''];

// Teaching measure first: share of students stating the module's Big Idea cold (blind scorer).
try {
  const rows = fs.readFileSync(path.join(out, 'teach/scored.jsonl'), 'utf8').trim().split('\n').map((l) => JSON.parse(l));
  L.push('## Big Idea stated cold (first-ranked)', '', '| page | stated (0-100) | strict (all judgements agree) | n |', '|---|---|---|---|');
  for (const p of order) { const r = rows.filter((x) => x.group === p); if (r.length) {
    const sc = r.map((x) => (typeof x.score === 'number' ? x.score : x.hit ? 1 : 0));
    L.push(`| ${p} | ${Math.round(100 * sc.reduce((t, v) => t + v, 0) / r.length)} | ${r.filter((x) => x.hit).length} | ${r.length} |`); } }
  L.push('', 'Rank on "stated" at n=24 per page; see teaching/README.md for the gap that counts. A page with n under 24 is incomplete: rerun.', '');
  if (fs.existsSync(path.join(out, 'students/INCOMPLETE'))) L.push('**INCOMPLETE RUN:** ' + fs.readFileSync(path.join(out, 'students/INCOMPLETE'), 'utf8').trim().split('\n').join(', ') + '. Do not rank on it.', '');
} catch (_) { /* no teaching run */ }

L.push('## Students: words (the signal) and numbers (context only)', '',
  '| page | complaints/run | filler | repetition | missing | specific praise/run | skipped beats/run | tells/run | law hits/run | enjoyment (1-7, not a signal) | learning hits (match) |', '|---|---|---|---|---|---|---|---|---|---|---|');
const w = J('words.json'), s = J('students-score.json');
for (const p of order) {
  const ws = w && w.summary[hashOf[p]] || {}, ss = s && s.summary[hashOf[p]] || {};
  L.push(`| ${p} | ${ws.complaints ?? ''} | ${ws.c_filler || 0} | ${ws.c_repetition || 0} | ${ws.c_missing || 0} | ${ws.specific_praise ?? ''} | ${ws.skipped ?? ''} | ${ws.tells ?? ''} | ${ws.law_hits ?? ''} | ${ss.enjoyment ?? ''} | ${ss.learn_hits ?? ''} |`);
}
const modCfg = JSON.parse(fs.readFileSync(path.join(__dirname, '../mechanical/persona-student/modules', `${mod}.json`), 'utf8'));
const pads = ((modCfg.damage || {}).pad || []).map((t) => t.split('. ')[0].slice(0, 40));
const dlogs = fs.readdirSync(path.join(out, 'students')).filter((f) => f.startsWith('damaged-') && f.endsWith('.json')).map((f) => J(`students/${f}`));
const caught = dlogs.filter((d) => (d.beats || []).some((b) => pads.some((p) => (b.trigger || '').includes(p.slice(0, 25)))) || /filler|boilerplate|padding|generic/i.test(d.one_line || '')).length;
L.push('', `Damaged-copy check: the damaged row must be clearly worse than v0 on the word columns. Added padding caught (a padding sentence quoted as the cause of a reaction, or the verdict calls it filler): ${caught} of ${dlogs.length} damaged runs.`, '');
const intended = JSON.parse(fs.readFileSync(path.join(__dirname, '../mechanical/persona-student/modules', `${mod}.json`), 'utf8')).intended_learnings.map((x) => x.id);
L.push('### Which learnings land (runs carrying each, from the word signal)', '', `| page | ${intended.join(' | ')} |`, `|---|${intended.map(() => '---').join('|')}|`);
for (const p of order) { const laws = (w && w.summary[hashOf[p]] || {}).laws || {}; L.push(`| ${p} | ${intended.map((id) => laws[id] || 0).join(' | ')} |`); }

L.push('', '## Story judge (module-scoped; medians)', '', '| page | frame | narrative | POV | stance | mean4 | register |', '|---|---|---|---|---|---|---|');
for (const p of order) { const d = J(`story/${p}.json`); if (d) { const m = d.median; L.push(`| ${p} | ${m.frame} | ${m.narrative} | ${m.pov} | ${m.stance} | ${m.mean4} | ${m.register} |`); } }

const key = fs.existsSync(path.join(out, 'taste/pairs.key.jsonl')) ? fs.readFileSync(path.join(out, 'taste/pairs.key.jsonl'), 'utf8').trim().split('\n').map(JSON.parse) : [];
const pk = (f) => Object.fromEntries((fs.existsSync(path.join(out, f)) ? fs.readFileSync(path.join(out, f), 'utf8').trim().split('\n').filter(Boolean).map(JSON.parse) : []).map((r) => [r.id, r.pick]));
const b = pk('taste/picks-blind.jsonl'), sw = pk('taste/picks-swapped.jsonl');
if (key.length) {
  L.push('', '## Taste judge vs v0 (both orders)', '', '| slide | verdict |', '|---|---|');
  const tally = {};
  for (const k of key) {
    const vb = b[k.id] === k.variant_is, vs = sw[k.id] && sw[k.id] !== k.variant_is;
    const r = !(k.id in b) || !(k.id in sw) ? 'missing' : vb && vs ? 'variant' : !vb && !vs ? 'original' : 'split';
    (tally[k.variant] ||= {})[r] = ((tally[k.variant] || {})[r] || 0) + 1;
    L.push(`| ${k.id} | ${r} |`);
  }
  L.push('', Object.entries(tally).map(([v, t]) => `${v}: ${JSON.stringify(t)}`).join(' · '));
}

L.push('', '## Sentence flags', '', '| page | sentences | words | sentences/slide | narrator per 1000 | put-down | loaded | dense slides |', '|---|---|---|---|---|---|---|---|');
for (const p of order.filter((x) => x !== 'damaged')) { const f = J(`flags/${p}.json`); if (f) L.push(`| ${p} | ${f.sentences} | ${f.words} | ${f.median_sentences_per_slide} | ${f.narrator_per_1000} | ${f.put_down} | ${f.loaded} | ${f.dense_slides} |`); }

// Ranking. Language weighs at least as much as story (maintainer 2026-11-01: language was the
// biggest problem in calibration; 15:40 slides must be glanceable, AE101 was compacted again and
// again). language = mean(register, taste win share, narrator score, density score), where
// density = 100 x AE101 median words per slide / this page's (capped at 100);
// overall = mean(language, story mean4). Words and sentences/slide are shown, not scored.
const win = {};
for (const k of key) { const vb = b[k.id] === k.variant_is, vs = sw[k.id] && sw[k.id] !== k.variant_is; (win[k.variant] ||= []).push(vb && vs ? 1 : !vb && !vs ? 0 : 0.5); }
const rows = [];
for (const p of order.filter((x) => x !== 'damaged')) {
  const st = J(`story/${p}.json`), f = J(`flags/${p}.json`); if (!st || !f) continue;
  const taste = p === 'v0' ? 50 : win[p] ? Math.round(100 * win[p].reduce((s, x) => s + x, 0) / win[p].length) : 50;
  const narr = Math.max(0, 100 - 3 * f.narrator_per_1000);
  const dens = f.median_words_per_slide ? Math.min(100, Math.round(100 * f.ae101_median_words_per_slide / f.median_words_per_slide)) : 50;
  const lang = Math.round((st.median.register + taste + narr + dens) / 4);
  rows.push({ p, lang, dens, wps: f.median_words_per_slide, story: st.median.mean4, overall: Math.round((lang + st.median.mean4) / 2), taste, narr, reg: st.median.register });
}
rows.sort((x, y) => y.overall - x.overall);
L.push('', '## Ranking (language weighed equal to story)', '', '| rank | page | overall | language | story mean4 | register | taste win % vs v0 | narrator score | words/slide | density |', '|---|---|---|---|---|---|---|---|---|---|');
rows.forEach((r, i) => L.push(`| ${i + 1} | ${r.p} | ${r.overall} | ${r.lang} | ${r.story} | ${r.reg} | ${r.taste} | ${r.narr} | ${r.wps} | ${r.dens} |`));
console.log(L.join('\n'));
