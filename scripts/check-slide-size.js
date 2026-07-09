#!/usr/bin/env node
'use strict';
// check-slide-size.js — flag any lecture/exercise slide (## section) too big to project.
//
// "Slide-sized" is the theory-layer contract: one `##` = one slide, 3–6 bullets
// or 2–4 short prose paragraphs, each claim + 1–3 sentences of mechanism, bold
// reserved for handles (theory-plan.md § Slide format — emphasis budget, 2026-07-09),
// glance-legible cold (check_lectures.md §4).
// This lints the SHAPE only — it measures how much a viewer must read on one slide,
// it does not judge the writing.
//
// Metric per slide (the `##` section body, maintainer tail stripped):
//   words   — readable text a viewer parses. EXCLUDES fenced code, inline SVG/HTML
//             diagrams, and `{{prompt/cut/demo/covered}}` include lines (a prompt is
//             a paste block + a diagram is one visual, neither is slide prose).
//   bullets — top-level list items (`- ` / `* ` / `1. `).
// A slide is OVERSIZED when words > --max-words OR bullets > --max-bullets.
//
// The file set is derived, not hand-listed: each AE101 module's `exercises/<slug>`
// and `lectures/<slug>` includes, in module order, deduped — the same source of
// truth build-workbook.js uses. Story lectures (narrative, read not projected) are
// exempt by default (--include-stories to measure them anyway).
//
// Usage:
//   node scripts/check-slide-size.js                 # AE101, gate mode (exit 1 if any oversized)
//   node scripts/check-slide-size.js --report        # print every slide's size, largest first
//   node scripts/check-slide-size.js --max-words 90 --max-bullets 6
//   node scripts/check-slide-size.js --training agentic-engineering-101
//   node scripts/check-slide-size.js --file curriculum/exercises/fix-tests-first.md

const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const CR = require(path.join(ROOT, 'site/layouts/curriculum.js'));

// ── args ────────────────────────────────────────────────────────────────────
const argv = process.argv.slice(2);
function flag(name, def) {
  const i = argv.indexOf('--' + name);
  if (i === -1) return def;
  const next = argv[i + 1];
  return (next && !next.startsWith('--')) ? next : true;
}
const REPORT = argv.includes('--report');
const INCLUDE_STORIES = argv.includes('--include-stories');
const TRAINING = flag('training', 'agentic-engineering-101');
// Default ceiling = the blessed exemplar's own fattest slide. `diagnose-and-resend`
// (the hand-chunked gold pattern) tops out at 209 readable words on one `##`; a good
// slide legitimately runs 120–200 (3–6 bullets, each a bolded claim + 1–3 sentences).
// So 210 passes the pattern Antti approved and flags only what is denser than it.
// Tune with --max-words; --report shows the full distribution to re-set the bar.
const MAX_WORDS = Number(flag('max-words', 210));
const MAX_BULLETS = Number(flag('max-bullets', 6));
const ONE_FILE = flag('file', null);

// Narrative lectures: read at home / told as a story, not squinted off a slide.
// Named exceptions per Antti (the two story lectures). Slug-keyed.
const STORY_EXEMPT = new Set(['how-this-training-was-built', 'story-of-module-6']);

// ── derive the AE101 lecture+exercise file set (module-include order, deduped) ─
function fileSetFromTraining(trainingKey) {
  const t = CR.TRAININGS[trainingKey];
  if (!t) {
    console.error(`Unknown training: ${trainingKey}. Known: ${Object.keys(CR.TRAININGS).join(', ')}`);
    process.exit(2);
  }
  const seen = new Set();
  const out = [];
  for (const mod of t.modules) {
    const modPath = path.join(ROOT, 'curriculum/trainings', trainingKey, mod.slug + '.md');
    if (!fs.existsSync(modPath)) continue;
    const body = CR.stripMaintainerTail(fs.readFileSync(modPath, 'utf8'));
    // INCLUDE_LINK_RE is anchored + /g; reset lastIndex per file.
    const re = new RegExp(CR.INCLUDE_LINK_RE.source, 'gm');
    let m;
    while ((m = re.exec(body)) !== null) {
      const kindSlug = m[2]; // e.g. "exercises/fix-tests-first"
      if (seen.has(kindSlug)) continue;
      seen.add(kindSlug);
      out.push({ module: mod.slug, kindSlug, file: path.join('curriculum', kindSlug + '.md') });
    }
  }
  return out;
}

// ── measure one file into slides ──────────────────────────────────────────────
function stripInline(s) {
  return s
    .replace(/`[^`]*`/g, ' ')                 // inline code
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')  // links → link text
    .replace(/[*_>#]/g, ' ')                  // md punctuation
    .replace(/\s+/g, ' ')
    .trim();
}
function wordCount(s) {
  const t = stripInline(s);
  return t ? t.split(' ').length : 0;
}

function measureFile(absPath) {
  const raw = fs.readFileSync(absPath, 'utf8');
  const body = CR.stripMaintainerTail(raw);
  const lines = body.split('\n');

  const slides = [];
  let cur = null;               // current ## section
  let preamble = { header: '(title/preamble)', words: 0, bullets: 0, line: 1 };
  let target = preamble;        // where lines accrue until first ##
  let inFence = false;
  let inSvg = false;

  const flush = () => { if (cur) slides.push(cur); };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    if (/^```/.test(trimmed)) { inFence = !inFence; continue; }
    if (inFence) continue;

    // inline SVG/HTML diagram region — one visual, not slide prose
    if (/<svg\b/i.test(trimmed)) inSvg = true;
    if (inSvg) { if (/<\/svg>/i.test(trimmed)) inSvg = false; continue; }
    if (/^<\/?(div|figure|span|g|path|rect|text|line|circle|polyline|polygon|defs|marker|tspan|img|br|hr)\b/i.test(trimmed)) continue;

    // include machinery — paste blocks / cut ribbons / covered regions, not read
    if (/^\{\{[^}]*\}\}$/.test(trimmed) || /^\{\{\/[^}]*\}\}$/.test(trimmed)) continue;

    if (/^# /.test(trimmed)) { continue; }    // H1 title (own card)

    if (/^## /.test(trimmed)) {
      flush();
      cur = { header: trimmed.replace(/^##\s+/, ''), words: 0, bullets: 0, line: i + 1 };
      target = cur;
      continue;
    }
    if (/^### /.test(trimmed)) {
      // subheads count toward the current slide's load
      if (target) target.words += wordCount(trimmed);
      continue;
    }

    if (!trimmed) continue;

    if (/^([-*]|\d+\.)\s/.test(trimmed)) { if (target) target.bullets += 1; }
    if (target) target.words += wordCount(trimmed);
  }
  flush();

  return { preamble, slides };
}

// ── run ───────────────────────────────────────────────────────────────────────
let files;
if (ONE_FILE) {
  files = [{ module: '(ad-hoc)', kindSlug: ONE_FILE.replace(/^curriculum\//, '').replace(/\.md$/, ''), file: ONE_FILE }];
} else {
  files = fileSetFromTraining(TRAINING);
}

const rows = [];      // every slide, for --report
const oversized = []; // flagged slides

for (const f of files) {
  const abs = path.join(ROOT, f.file);
  if (!fs.existsSync(abs)) { console.error(`missing: ${f.file}`); continue; }
  const slug = f.kindSlug.split('/').pop();
  const story = STORY_EXEMPT.has(slug);
  if (story && !INCLUDE_STORIES) continue;

  const { slides } = measureFile(abs);
  for (const s of slides) {
    const row = { file: f.file, module: f.module, header: s.header, words: s.words, bullets: s.bullets, line: s.line, story };
    rows.push(row);
    const over = (s.words > MAX_WORDS) || (s.bullets > MAX_BULLETS);
    if (over) oversized.push(row);
  }
}

const clamp = (s, n) => (s.length > n ? s.slice(0, n - 1) + '…' : s).padEnd(n);

if (REPORT) {
  rows.sort((a, b) => b.words - a.words);
  console.log(`\nAll slides — ${TRAINING} — largest first (limits: ${MAX_WORDS} words / ${MAX_BULLETS} bullets)\n`);
  console.log(`${'words'.padStart(5)}  ${'bul'.padStart(3)}  ${'slide header'.padEnd(50)}  file`);
  console.log('─'.repeat(110));
  for (const r of rows) {
    const mark = (r.words > MAX_WORDS || r.bullets > MAX_BULLETS) ? '⚠' : ' ';
    console.log(`${mark}${String(r.words).padStart(4)}  ${String(r.bullets).padStart(3)}  ${clamp(r.header, 50)}  ${r.file.replace('curriculum/', '')}`);
  }
  console.log('');
}

console.log(`\n${'='.repeat(70)}`);
console.log(`Slide-size check — ${TRAINING}`);
console.log(`  files: ${new Set(rows.map(r => r.file)).size}   slides: ${rows.length}   limits: ${MAX_WORDS} words / ${MAX_BULLETS} bullets`);
console.log(`  oversized: ${oversized.length}`);
console.log('='.repeat(70));

if (oversized.length) {
  oversized.sort((a, b) => (b.words - a.words) || (b.bullets - a.bullets));
  console.log('');
  for (const r of oversized) {
    const why = [];
    if (r.words > MAX_WORDS) why.push(`${r.words}w`);
    if (r.bullets > MAX_BULLETS) why.push(`${r.bullets} bullets`);
    console.log(`  ⚠ ${r.file.replace('curriculum/', '')}:${r.line}  [${why.join(', ')}]`);
    console.log(`      ## ${r.header}`);
  }
  console.log('');
  process.exit(1);
}
console.log('\n✓ every slide is within limits\n');
