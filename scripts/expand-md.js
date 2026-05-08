#!/usr/bin/env node
// Print a curriculum .md file with `{{prompt:<key>}}` markers expanded into
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

const arg = process.argv[2];
if (!arg) {
  console.error('Usage: expand-md.js <path.md> | -');
  process.exit(1);
}

const raw = arg === '-' ? fs.readFileSync(0, 'utf8') : fs.readFileSync(arg, 'utf8');
process.stdout.write(CR.expandPrompts(raw, loadRegistry()));
