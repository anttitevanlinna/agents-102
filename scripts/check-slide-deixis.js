#!/usr/bin/env node
'use strict';
// check-slide-deixis.js — flag page-geometry pointers that die when the file is
// cut into slides.
//
// The Slides layout cuts at `##` (site/layouts/slides.js). A projected slide has
// nothing above it and nothing below it, so a body pointer like "the laws below"
// or "picked in Step 1 below" aims at a wall. Reading ORDER survives the cut
// (next, coming up, that follow, earlier in this module); page GEOMETRY does not.
// check_slides.md §12 carries the rule; this proves the corpus obeys it.
//
// What counts as a violation: a geometry word (above / below / further down /
// a few paragraphs above / top of this page …) in student-facing body prose,
// outside fences, that does NOT resolve inside its own `##` chunk.
//
// Two ways a match clears:
//   1. Same-slide paste pointer — "the prompt below" with a `{{prompt:…}}` or a
//      fenced block on the pointed-at side of the SAME chunk. Spatially true on
//      the slide; nothing to fix. A file with no `##` at all clears wholesale:
//      buildSingleDoc splits on H2, so such a file IS one slide (several
//      agents-101 exercises) and every pointer inside it is honest.
//   2. Maintainer-attested, declared in the file's own maintainer block:
//
//        **Slide deixis accepted:** "<quoted phrase>" — <reason>
//
//      For the case where the referent genuinely sits on the same slide but no
//      paste block marks it (a long reference chunk pointing back four lines).
//      Scoped to the one phrase that was ruled on, so the check keeps biting
//      elsewhere in the same file — a file-level exemption would hide the rest.
//
// File set is derived from the training registry (same source of truth as
// build-workbook.js + check-slide-numbering.js): module files + prework +
// supplementaries + references + every lecture/exercise the modules include.
//
// Usage:
//   node scripts/check-slide-deixis.js                  # AE101, gate mode (exit 1 on violation)
//   node scripts/check-slide-deixis.js --report         # every match, cleared ones included
//   node scripts/check-slide-deixis.js --training agents-101
//   node scripts/check-slide-deixis.js --file curriculum/trainings/agentic-engineering-101/prework.md
//   node scripts/check-slide-deixis.js --links          # inventory in-body cross-doc links (§13 review aid, never gates)

const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const CR = require(path.join(ROOT, 'site/layouts/curriculum.js'));

const argv = process.argv.slice(2);
function flag(name, def) {
  const i = argv.indexOf('--' + name);
  if (i === -1) return def;
  const next = argv[i + 1];
  return (next && !next.startsWith('--')) ? next : true;
}
const REPORT = argv.includes('--report');
const LINKS = argv.includes('--links');
const TRAINING = flag('training', 'agentic-engineering-101');
const ONE_FILE = flag('file', null);

// ── the geometry vocabulary ───────────────────────────────────────────────────
// Deliberately narrow: "above"/"below" only where a document object or a
// pointing verb makes it a page reference. "fall below a coin flip", "a layer
// above it", "one level above the sources" are ordinary English and must not fire.
const OBJ = '(?:prompt|prompts|step|steps|phase|phases|section|sections|list|lists|instruction|instructions'
  + '|example|examples|law|laws|rule|rules|block|blocks|command|commands|quote|quotes|link|links|table|tables'
  + '|diagram|note|notes|bullet|bullets|paragraph|paragraphs|version|thread|pattern|patterns|item|items'
  + '|mechanism|mechanisms|dish|dishes|move|moves|failure modes?|line|lines|snippet|snippets|entry|entries'
  + '|answer|answers|question|questions|shape|shapes|name|names|criteria|checklist|report|reports|column|columns|row|rows)';
const NUMBERED = '(?:step|phase|section|module|part|table|figure|law|rule|item|slide|prompt|exercise)s?\\s+(?:\\d+[a-z]?|[IVX]+)';
const PATTERNS = [
  new RegExp('\\b' + OBJ + '\\s+(?:listed\\s+|shown\\s+|named\\s+|given\\s+|described\\s+)?(above|below)\\b', 'i'),
  new RegExp('\\b' + NUMBERED + '\\s+(above|below)\\b', 'i'),
  /\b(?:see|as|listed|shown|named|described|noted|quoted|spelled out|written|covered)\s+(above|below)\b/i,
  /\b(?:one|two|three|four|five|six|seven|eight|nine|ten|\d+)\s+(above|below)\b/i,
  /\b(?:a few|several|two|three|the)\s+(?:paragraphs?|lines?|slides?|sections?|bullets?)\s+(above|below|back|up|down)\b/i,
  /\bfurther (?:down|up)\b/i,
  /\b(?:top|bottom) of (?:this|the) (?:page|file|document|section)\b/i,
  /\b(?:earlier|later) on this (?:page|file|document)\b/i,
  /\b(?:previous|next|last) (?:slide|page)\b/i,
  /\bscroll (?:down|up|back)\b/i,
  /\bthe (above|below)\b/i,
  /\b(?:anything|everything|what's) (above|below)\b/i,
  /\b(above|below)[,.;:]/i,
  /\b(?:up top|down here|over the page|down below|right below|just below|just above|right above)\b/i,
];
// A pointer at a paste block can be same-slide true; these are the words that
// aim at one. Anything else gets no automatic pass.
const PASTE_POINTER = /\b(?:prompt|prompts|block|blocks|snippet|snippets|command|commands|example|examples|code)\b/i;
const INTERNAL_LINK = /\[([^\]]+)\]\((?!https?:|mailto:)([^)]+)\)/g;

// ── derive the training's slide-rendered file set ────────────────────────────
function fileSet(trainingKey) {
  const raw = CR.TRAININGS[trainingKey];
  if (!raw) {
    console.error(`Unknown training: ${trainingKey}. Known: ${Object.keys(CR.TRAININGS).join(', ')}`);
    process.exit(2);
  }
  const contentKey = raw.contentKey || trainingKey;
  const t = raw.contentKey ? Object.assign({}, CR.TRAININGS[contentKey], raw) : raw;
  const out = [];
  const seen = new Set();
  const add = p => { if (!seen.has(p) && fs.existsSync(path.join(ROOT, p))) { seen.add(p); out.push(p); } };

  const modLike = [];
  if (t.prework) modLike.push(t.prework);
  modLike.push(...t.modules);
  if (t.optionalModules) modLike.push(...t.optionalModules);
  for (const mod of modLike) {
    const modPath = path.join('curriculum/trainings', contentKey, mod.slug + '.md');
    add(modPath);
    const abs = path.join(ROOT, modPath);
    if (!fs.existsSync(abs)) continue;
    const body = CR.stripMaintainerTail(fs.readFileSync(abs, 'utf8'));
    const re = new RegExp(CR.INCLUDE_LINK_RE.source, 'gm');
    let m;
    while ((m = re.exec(body)) !== null) add(path.join('curriculum', m[2] + '.md'));
  }
  (t.supplementaries || []).forEach(s => add(path.join('curriculum/trainings', contentKey, 'supplementary', s.slug + '.md')));
  (t.references || []).forEach(r => add(path.join('curriculum/trainings', contentKey, 'reference', r.slug + '.md')));
  return out;
}

// ── student-facing body only ─────────────────────────────────────────────────
// Maintainer tail and the `<!-- backing -->` ledger are bookkeeping, not slides.
function studentBody(raw) {
  let body = CR.stripMaintainerTail(raw);
  const b = body.indexOf('<!-- backing -->');
  return b === -1 ? body : body.slice(0, b);
}

function acceptedPhrases(raw) {
  const out = new Set();
  const cut = raw.indexOf('<!-- maintainer -->');
  if (cut === -1) return out;
  const re = /^\*\*Slide deixis accepted:\*\*\s*["“]([^"”]+)["”]/gm;
  let m;
  while ((m = re.exec(raw.slice(cut))) !== null) out.add(m[1].trim().toLowerCase());
  return out;
}

// ── scan one file ────────────────────────────────────────────────────────────
function scanFile(relPath) {
  const raw = fs.readFileSync(path.isAbsolute(relPath) ? relPath : path.join(ROOT, relPath), 'utf8');
  const accepted = acceptedPhrases(raw);
  const lines = studentBody(raw).split('\n');
  const chunkStarts = [];
  lines.forEach((line, i) => { if (/^##\s/.test(line.trim())) chunkStarts.push(i); });
  const chunkOf = i => {
    let start = 0, header = '(title slide)';
    for (const s of chunkStarts) { if (s <= i) { start = s; header = lines[s].trim(); } else break; }
    let end = lines.length;
    for (const s of chunkStarts) { if (s > i) { end = s; break; } }
    return { start, end, header };
  };

  const hits = [], links = [];
  let inFence = false;
  lines.forEach((line, i) => {
    const t = line.trim();
    if (/^```/.test(t)) { inFence = !inFence; return; }
    if (inFence) return;
    if (/^##\s/.test(t)) return;
    if (/^<svg|aria-label=/.test(t)) return;             // diagram description, not page prose

    if (LINKS) {
      const re = new RegExp(INTERNAL_LINK.source, 'g');
      let lm;
      while ((lm = re.exec(line)) !== null) {
        if (/\.(svg|png|jpg|gif)$/i.test(lm[2])) continue;
        const standalone = new RegExp(CR.INCLUDE_LINK_RE.source).test(t);
        if (!standalone) links.push({ line: i + 1, text: lm[1], href: lm[2], ctx: t.slice(0, 150) });
      }
    }

    for (const p of PATTERNS) {
      const m = p.exec(line);
      if (!m) continue;
      const phrase = m[0].trim();
      const { start, end, header } = chunkOf(i);
      let cleared = null;
      if (!chunkStarts.length) cleared = 'file has no `##` — renders as one slide';
      else if (accepted.has(phrase.toLowerCase())) cleared = 'maintainer-attested';
      else if (PASTE_POINTER.test(phrase)) {
        const dir = /below|down/i.test(phrase) ? 'after' : 'before';
        const span = dir === 'after' ? lines.slice(i + 1, end) : lines.slice(start, i);
        if (/\{\{prompt:|^```/m.test(span.join('\n'))) cleared = 'same-slide paste block';
      }
      hits.push({ line: i + 1, phrase, header, cleared, text: t.slice(0, 160) });
      return;
    }
  });
  return { hits, links };
}

// ── run ──────────────────────────────────────────────────────────────────────
const files = ONE_FILE ? [ONE_FILE] : fileSet(TRAINING);
const violations = [];
for (const f of files) {
  const { hits, links } = scanFile(f);
  if (LINKS && links.length) {
    console.log(`\n${f}`);
    links.forEach(l => console.log(`  L${l.line}  "${l.text}" -> ${l.href}\n      ${l.ctx}`));
  }
  for (const h of hits) {
    if (h.cleared) {
      if (REPORT) console.log(`  ok   ${f}:${h.line}  [${h.phrase}] — ${h.cleared}`);
      continue;
    }
    violations.push(`${f}:${h.line}: page geometry "${h.phrase}" on slide "${h.header}"\n      ${h.text}`);
    if (REPORT) console.log(`  FLAG ${f}:${h.line}  [${h.phrase}] — slide "${h.header}"`);
  }
}

if (LINKS) {
  console.log('\nIn-body cross-doc links are a §13 review surface, not a gate — a link is dead ink on a projected slide.');
  process.exit(0);
}
if (violations.length) {
  console.error(`\n${violations.length} page-geometry pointer(s) — check_slides.md §12:\n`);
  violations.forEach(v => console.error('  ' + v));
  console.error('\nFix by naming the thing ("the walk-down prompt") or by reading order ("next", "that follow").');
  console.error('Same-slide and genuinely intended? Declare it in the maintainer block:');
  console.error('  **Slide deixis accepted:** "<phrase>" — <reason>');
  process.exit(1);
} else if (!REPORT) {
  console.log(`OK — ${files.length} files, no page-geometry pointers across the slide cut.`);
}
