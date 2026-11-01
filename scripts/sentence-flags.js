#!/usr/bin/env node
'use strict';
// sentence-flags.js — mechanical flags for the maintainer's register calls
// (curriculum/taste-notes.md, 2026-11-01). Report only: each flag is a
// candidate for a cut, never a verdict, because a constructed metaphor the
// training carries and a deliberate permission line both look like these.
//
//   loaded     a one-line remark that stands alone: a short sentence that is
//              its paragraph by itself, or a rhetorical question on a
//              statement slide. ("Certainty is a fantasy you inherited.")
//   put-down   wording that belittles the student or the current way, or
//              leaves the student waiting to be handed something.
//              ("toy", "a guess that happens to compile", "nobody can hand you")
//   dense      slides with more sentences than the comparison training's
//              90th percentile. The wordiness is sentence count, not length,
//              so the move is cutting whole sentences.
//
// Usage:
//   node scripts/sentence-flags.js [--training agents-101] [--compare agentic-engineering-101] [--json]

const { buildLedger } = require('./sentence-ledger.js');

const PUT_DOWN = [
  /\btoys?\b/i, /\bfantas(y|ies)\b/i, /\binherited\b/i, /\bguesswork\b/i, /\ba guess that\b/i,
  /\bnobody (can|will) (hand|give) you\b/i, /\bhand(s|ed)? you\b/i, /\ba gift\b/i,
  /\bhelpless\b/i, /\bthe only check\b/i, /\bnaive\b/i, /\bwrong way\b/i,
  /\byou (were|are) (just|only|the only)\b/i, /\b(old|outdated|legacy) (habits?|ways?|thinking)\b/i,
];

// Register lives on the told surfaces: lectures, slides, supplementaries.
// Exercises and module pages are full of short instructions and real
// questions to the student, which are not remarks.
const TOLD = /^(lectures|slides)\/|\/supplementary\//;
const IMPERATIVE = /^(start|ask|add|open|run|type|save|create|read|check|spot|revise|pick|do|don't|use|paste|look|write|try|keep|make|tell|name|push|go|let|give|take|copy|install|load|set|find|end|close|repeat|compare|move|share|wait)\b/i;

function flagRows(rows) {
  const out = [];
  const bySlide = new Map();
  for (const r of rows) {
    const k = r.file + '#' + (r.slide || '');
    if (!bySlide.has(k)) bySlide.set(k, []);
    bySlide.get(k).push(r);
  }
  for (const group of bySlide.values()) {
    const prose = group.filter(r => r.kind !== 'heading');
    const questionSlide = prose.length > 0 && prose.filter(r => r.text.trim().endsWith('?')).length * 2 >= prose.length;
    const lines = new Map();
    for (const r of prose) lines.set(r.line, (lines.get(r.line) || 0) + 1);
    for (const r of prose) {
      const reasons = [];
      const alone = r.kind === 'prose' && lines.get(r.line) === 1;
      const told = TOLD.test(r.file);
      if (told && alone && r.words <= 8 && !/[`:]/.test(r.text) && !IMPERATIVE.test(r.text.replace(/^[*_"]+/, '')) && !r.text.trim().endsWith('?')) reasons.push('loaded: one short sentence standing alone');
      const qsOnLine = prose.filter(x => x.line === r.line && x.text.trim().endsWith('?')).length;
      if (told && r.kind === 'prose' && r.text.trim().endsWith('?') && r.words <= 10 && !questionSlide && qsOnLine === 1) reasons.push('loaded: rhetorical question on a statement slide');
      for (const re of PUT_DOWN) if (re.test(r.text)) { reasons.push(`put-down: "${r.text.match(re)[0]}"`); break; }
      if (reasons.length) out.push({ ...r, reasons });
    }
  }
  return out;
}

function slideCounts(rows) {
  const m = new Map();
  for (const r of rows) {
    if (r.kind === 'heading' || !r.slide) continue;
    const k = r.file + '#' + r.slide;
    m.set(k, (m.get(k) || 0) + 1);
  }
  return m;
}

function quantile(xs, q) {
  const s = [...xs].sort((a, b) => a - b);
  return s.length ? s[Math.min(s.length - 1, Math.floor(q * s.length))] : 0;
}

module.exports = { flagRows, slideCounts, quantile, PUT_DOWN };

if (require.main === module) {
  const argv = process.argv.slice(2);
  const val = (n, d) => { const i = argv.indexOf('--' + n); return i >= 0 ? argv[i + 1] : d; };
  const key = val('training', 'agents-101');
  const cmp = val('compare', 'agentic-engineering-101');
  const L = buildLedger(key);
  const flags = flagRows(L.rows);
  const mine = slideCounts(L.rows);
  const theirs = slideCounts(buildLedger(cmp).rows);
  const p90 = quantile([...theirs.values()], 0.9);
  const dense = [...mine].filter(([, n]) => n > p90).sort((a, b) => b[1] - a[1]);
  if (argv.includes('--json')) { console.log(JSON.stringify({ flags, dense, p90 }, null, 1)); process.exit(0); }
  const loaded = flags.filter(f => f.reasons.some(r => r.startsWith('loaded')));
  const put = flags.filter(f => f.reasons.some(r => r.startsWith('put-down')));
  console.log(`# Register flags: ${key}\n\nReport only. Each flag is a candidate for a cut, not a verdict.\n`);
  console.log(`Sentences per slide: ${key} median ${quantile([...mine.values()], 0.5)}, ${cmp} median ${quantile([...theirs.values()], 0.5)} (p90 ${p90}).\n`);
  const show = f => `- ${f.file}${f.slide ? '#' + f.slide : ''}:${f.line} · "${f.text}" · ${f.reasons.join('; ')}`;
  console.log(`## Put-down or passive (${put.length})\n`); put.forEach(f => console.log(show(f)));
  console.log(`\n## Loaded one-liners (${loaded.length})\n`); loaded.forEach(f => console.log(show(f)));
  console.log(`\n## Dense slides, more sentences than ${cmp}'s p90 (${dense.length})\n`);
  dense.forEach(([k, n]) => console.log(`- ${k}: ${n} sentences`));
}
