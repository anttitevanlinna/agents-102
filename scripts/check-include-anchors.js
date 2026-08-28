#!/usr/bin/env node
'use strict';
// check-include-anchors.js — prove every in-body link to an exercise or lecture
// lands somewhere the reader can actually reach.
//
// A curriculum file reaches a shared-library file two different ways, and the
// difference is invisible in source:
//
//   include   `[Title](exercises/close-the-ticket.md)` ALONE on its line.
//             INCLUDE_LINK_RE (site/layouts/curriculum.js) inlines the file and
//             emits a `<section id="exercises-close-the-ticket">` wrapper.
//   reference the same link mid-sentence. rewriteCrossDocLinksToAnchors
//             (scripts/build-workbook.js) turns it into `#exercises-close-the-ticket`
//             and stops there. The wrapper only exists if something ELSE
//             inlined the same file.
//
// So a link written inside a sentence points at an id that may never be
// created, and every surface stays quiet about it: the build succeeds, the page
// renders, the anchor is simply inert. Measured on 2026-08-12: ten such links in
// Agents 101, covering the whole between-module prework and homework track —
// five files named as required work and absent from the workbook.
//
// check-cross-doc-anchors.js cannot see this: it matches `.md#anchor` links
// (a fragment written in source) and its id universe is marked heading ids,
// never the section wrappers the include mechanism emits.
//
// Rule: for each training, every `(exercises|lectures)/<slug>.md` referenced in
// student-facing body must be inlined by SOME file in that training. Maintainer
// tails are exempt — they are read in source, where the path resolves.
//
// Usage:
//   node scripts/check-include-anchors.js              # all trainings, gate mode (exit 1)
//   node scripts/check-include-anchors.js --report     # list every reference, resolved or not
//   node scripts/check-include-anchors.js --training <key>

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
// Overridable so the tests can build their scratch training somewhere no other
// checker is looking. `node --test scripts/*.test.js` runs test FILES in
// parallel, and this suite's fixture used to be created inside
// curriculum/trainings/ — the tree every other checker globs. A sibling test
// spawning check-cross-doc-anchors.js would glob the fixture, the fixture would
// be torn down, and the read would ENOENT. A test that mutates the corpus other
// tests read is a flaky suite by construction, whichever one happens to fail.
const TRAININGS_DIR = process.env.TRAININGS_DIR
  ? path.resolve(process.env.TRAININGS_DIR)
  : path.join(ROOT, 'curriculum/trainings');

const argv = process.argv.slice(2);
const REPORT = argv.includes('--report');
const flag = (name) => {
  const i = argv.indexOf('--' + name);
  return i >= 0 ? argv[i + 1] : null;
};
const ONE_TRAINING = flag('training');

// Alone on its line — the same shape INCLUDE_LINK_RE requires, and the whole
// point of this check is that anything else is NOT an include.
const INCLUDE_RE = /^\[[^\]]+\]\(((?:exercises|lectures)\/[a-z0-9-]+)\.md\)[ \t]*$/;
// Any link to a shared-library file, wherever it sits.
const REFERENCE_RE = /\]\((?:\.\.\/)*((?:exercises|lectures)\/[a-z0-9-]+)\.md\)/g;

function bodyOf(src) {
  return src.split('<!-- maintainer -->')[0];
}

function scanTraining(key) {
  const dir = path.join(TRAININGS_DIR, key);
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));

  const inlined = new Set();
  const references = [];

  for (const name of files) {
    const body = bodyOf(fs.readFileSync(path.join(dir, name), 'utf8'));
    const lines = body.split('\n');

    lines.forEach((line, i) => {
      const inc = line.trim().match(INCLUDE_RE);
      if (inc) { inlined.add(inc[1]); return; }
      let m;
      REFERENCE_RE.lastIndex = 0;
      while ((m = REFERENCE_RE.exec(line)) !== null) {
        references.push({ file: name, line: i + 1, target: m[1], text: line.trim() });
      }
    });
  }

  const dead = references.filter(r => !inlined.has(r.target));
  return { files, inlined, references, dead };
}

const trainings = ONE_TRAINING
  ? [ONE_TRAINING]
  : fs.readdirSync(TRAININGS_DIR).filter(d =>
      fs.statSync(path.join(TRAININGS_DIR, d)).isDirectory()).sort();

let dead = [];
let fileCount = 0;

for (const key of trainings) {
  const res = scanTraining(key);
  fileCount += res.files.length;
  dead = dead.concat(res.dead.map(d => ({ ...d, training: key })));
  if (REPORT) {
    console.log(`\n${key}: ${res.inlined.size} inlined, ${res.references.length} in-sentence reference(s)`);
    for (const r of res.references) {
      const ok = res.inlined.has(r.target) ? 'ok  ' : 'DEAD';
      console.log(`  ${ok} ${r.file}:${r.line} -> #${r.target.replace('/', '-')}`);
    }
  }
}

if (dead.length) {
  console.error(`\n${dead.length} link(s) point at a section no file in the training inlines:\n`);
  for (const d of dead) {
    console.error(`  [${d.training}] ${d.file}:${d.line} -> #${d.target.replace('/', '-')}`);
    console.error(`      ${d.text.slice(0, 110)}`);
  }
  console.error(`\nFix: add a standalone include line — the link ALONE on its own line — in the`);
  console.error(`file that assigns the work, or drop the link and let the prose name it.\n`);
  process.exit(1);
} else if (!REPORT) {
  console.log(`OK — ${trainings.length} trainings, ${fileCount} files, every exercise/lecture link resolves.`);
}
