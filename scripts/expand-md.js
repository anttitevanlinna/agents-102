#!/usr/bin/env node
// Print a curriculum .md file with borrowed slides inlined and `{{prompt:<key>}}` markers expanded into
// the canonical `**Prompt** *(<dest>[, <context>])*` + fenced shape. Lets
// shell-side tooling (mechanical tests, eval scripts, parsers) keep matching
// the inline-prompt pattern without becoming registry-aware themselves.
//
// Usage:
//   node scripts/expand-md.js <path.md>
//   cat <path.md> | node scripts/expand-md.js -    # read from stdin
//
// Order matches build-workbook.js:
//   readMd = stripMaintainerTail(file) → expandPrompts(stripped, registry)
// Eval / mechanical surfaces care about the same view the build produces.

const fs = require('fs');
const path = require('path');
const CR = require(path.join(__dirname, '..', 'site/layouts/curriculum.js'));
const { loadRegistry } = require('./compile-prompts.js');
const { loadFigures } = require('./compile-figures.js');

const arg = process.argv[2];
if (!arg) {
  console.error('Usage: expand-md.js <path.md> | -');
  process.exit(1);
}

// Borrowed slides (`[T](lectures/x.md#<id>[,…])` alone on a line) are part of
// THIS file's student surface, so the judge reads them here, fenced as borrowed:
// their wording and backing are judged at home, their FIT is judged here.
// Whole-file includes stay links — that file is judged in its own right.
const ROOT = path.join(__dirname, '..');
function inlineBorrowed(md) {
  return md.replace(CR.INCLUDE_LINK_RE, (full, title, kindSlug, ids) => {
    if (!ids) return full;
    const src = fs.readFileSync(path.join(ROOT, 'curriculum', kindSlug + '.md'), 'utf8');
    return `<!-- borrowed: ${kindSlug}.md#${ids} — wording and backing judged at home; judge fit here -->\n`
      + CR.sliceSlides(src, ids).trim() + '\n<!-- /borrowed -->';
  });
}

const raw = arg === '-' ? fs.readFileSync(0, 'utf8') : fs.readFileSync(arg, 'utf8');
process.stdout.write(CR.expandFigures(CR.expandPrompts(inlineBorrowed(raw), loadRegistry()), loadFigures()));
