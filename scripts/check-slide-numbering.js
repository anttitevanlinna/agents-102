#!/usr/bin/env node
'use strict';
// check-slide-numbering.js — lint the CONTENT-side numbering in slide-rendered files.
//
// The numbering system has two halves:
//   position — computed by the slide viewer (site/layouts/slides.js): section
//              codes M1…/P/S1…/R1… + within-section ordinals + data-ref. Never
//              hand-written. Guarded by scripts/slides.test.js.
//   content  — hand-written ordinals the prose refers to: `## Phase N: …`
//              phase headers in exercises and `## N. …` step headers in
//              prework/reference/supplementary files. These MUST stay in the
//              markdown (body + maintainer prose say "Phase 2", "Step 4"),
//              so this script proves they can be trusted:
//
//   1. `## Phase N` headers in a file are consecutive, starting at 1.
//   2. `## N.` headers in a file are consecutive, starting at 1.
//   3. STUDENT-FACING prose references "Phase K" / "Step K" (including
//      "Steps A–B" ranges) resolve: K within [1, max header N] — checked only
//      when the file declares headers of that family, and only above the
//      maintainer tail (maintainer prose cross-references other files' phases
//      by design; the body may not — check_slides.md §2).
//
// File set is derived from the training registry (same source of truth as
// build-workbook.js): module files + prework + supplementaries + references
// + every lecture/exercise the modules include.
//
// Usage:
//   node scripts/check-slide-numbering.js                 # AE101, gate mode (exit 1 on violation)
//   node scripts/check-slide-numbering.js --report        # list every numbered family found
//   node scripts/check-slide-numbering.js --training <key>
//   node scripts/check-slide-numbering.js --file curriculum/exercises/push-back-on-the-plan.md

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
const TRAINING = flag('training', 'agentic-engineering-101');
const ONE_FILE = flag('file', null);

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

// ── lint one file ─────────────────────────────────────────────────────────────
function lintFile(relPath) {
  const raw = fs.readFileSync(path.join(ROOT, relPath), 'utf8');
  const body = CR.stripMaintainerTail(raw);
  const problems = [];
  const families = [];

  // collect headers outside fences (student-facing body only — same for refs)
  const lines = body.split('\n');
  let inFence = false;
  const phaseHeaders = [], stepHeaders = [];
  lines.forEach((line, i) => {
    const t = line.trim();
    if (/^```/.test(t)) { inFence = !inFence; return; }
    if (inFence) return;
    let m;
    if ((m = /^##\s+Phase\s+(\d+)\s*[:.—–-]/i.exec(t))) phaseHeaders.push({ n: +m[1], line: i + 1, text: t });
    else if ((m = /^##\s+(\d+)[.):]\s/.exec(t))) stepHeaders.push({ n: +m[1], line: i + 1, text: t });
  });

  function checkSequence(headers, label) {
    if (!headers.length) return;
    families.push(`${label} 1–${headers[headers.length - 1].n} (${headers.length} headers)`);
    headers.forEach((h, i) => {
      if (h.n !== i + 1) {
        problems.push(`${relPath}:${h.line}: ${label} sequence broken — expected ${label} ${i + 1}, found "${h.text}"`);
      }
    });
  }
  checkSequence(phaseHeaders, 'Phase');
  checkSequence(stepHeaders, 'Step');

  // prose references must resolve against the declared headers (same file)
  function checkRefs(word, max) {
    if (!max) return;
    const re = new RegExp('\\b' + word + 's?\\s+(\\d+)(?:\\s*[\\u2013\\u2014-]\\s*(\\d+))?', 'g');
    lines.forEach((line, i) => {
      if (/^##\s/.test(line.trim())) return; // headers themselves
      let m;
      while ((m = re.exec(line)) !== null) {
        [m[1], m[2]].filter(Boolean).forEach(numStr => {
          const k = +numStr;
          if (k < 1 || k > max) {
            problems.push(`${relPath}:${i + 1}: dangling reference — "${m[0]}" but this file declares ${word}s 1–${max}`);
          }
        });
      }
    });
  }
  checkRefs('Phase', phaseHeaders.length ? phaseHeaders[phaseHeaders.length - 1].n : 0);
  checkRefs('Step', stepHeaders.length ? stepHeaders[stepHeaders.length - 1].n : 0);

  return { problems, families };
}

// ── run ───────────────────────────────────────────────────────────────────────
const files = ONE_FILE ? [ONE_FILE] : fileSet(TRAINING);
let allProblems = [];
for (const f of files) {
  const { problems, families } = lintFile(f);
  allProblems = allProblems.concat(problems);
  if (REPORT && families.length) console.log(`${f}: ${families.join('; ')}`);
}

if (allProblems.length) {
  console.error(`\n${allProblems.length} numbering problem(s):\n`);
  allProblems.forEach(p => console.error('  ' + p));
  process.exit(1);
} else if (!REPORT) {
  console.log(`OK — ${files.length} files, Phase/Step numbering consistent.`);
}
