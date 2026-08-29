#!/usr/bin/env node
// Regression tests for check-emphasis-balance.js.
//
// Origin: 2026-08-13. A bulk edit moved bold from wrapping a whole reading-list
// entry to wrapping only its mode word. The entries ending `.**` were handled;
// one ending `)** (May 2026).` was not, leaving a stray delimiter that renders
// as literal asterisks to a student. Nothing in the repo could catch it — a
// slides judge found it by hand-grepping delimiter counts. This is that grep,
// wired in so the next bulk edit trips it instead.

const { test } = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { scanText } = require('./check-emphasis-balance.js');

test('balanced bold passes', () => {
  assert.deepEqual(scanText('**Read:** a thing, and **another** one.\n'), []);
});

test('the exact 2026-08-13 defect is caught', () => {
  const line = '**Read,** Lucas F. da Costa, [Backpressure Is All You Need](https://x.test/b)** (May 2026).\n';
  const hits = scanText(line);
  assert.equal(hits.length, 1);
  assert.equal(hits[0].line, 1);
});

test('body only — an unpaired delimiter after the maintainer cut is ignored', () => {
  const src = 'ok **fine** here\n<!-- maintainer -->\nstray ** in maintainer prose\n';
  assert.deepEqual(scanText(src), []);
});

test('fenced code is exempt — ** inside a fence is not emphasis', () => {
  const src = ['a **real** bold', '```', 'shell_glob=**', '```', 'more text'].join('\n');
  assert.deepEqual(scanText(src), []);
});

test('inline code spans are exempt — a glob is not emphasis', () => {
  // Real line from reference/claude-code-for-engineers.md. The first version of
  // this checker flagged it, which is the false-positive direction: a gate that
  // cries wolf on the reference page gets muted, and then catches nothing.
  const src = 'Glob patterns: `**/*.ts`, `src/**/*`, `*.md`. Brace expansion supported.\n';
  assert.deepEqual(scanText(src), []);
});

test('a glob and a real defect on the same line still reports', () => {
  assert.equal(scanText('use `**/*.ts` and **this never closes\n').length, 1);
});

test('reports the offending line number, not just a count', () => {
  const src = 'line one is **fine**\nline two is **broken\nline three **ok** too\n';
  const hits = scanText(src);
  assert.equal(hits.length, 1);
  assert.equal(hits[0].line, 2);
});

test('the real corpus is clean', () => {
  const root = path.join(__dirname, '..');
  const dirs = [
    'curriculum/trainings/agentic-engineering-101',
    'curriculum/lectures',
    'curriculum/exercises',
  ];
  const skip = new Set(['pre-cohort-todos.md']); // internal, not student-facing
  const bad = [];
  for (const d of dirs) {
    const abs = path.join(root, d);
    if (!fs.existsSync(abs)) continue;
    for (const f of fs.readdirSync(abs).filter(x => x.endsWith('.md'))) {
      if (skip.has(f)) continue;
      const hits = scanText(fs.readFileSync(path.join(abs, f), 'utf8'));
      if (hits.length) bad.push(`${d}/${f}:${hits[0].line}`);
    }
  }
  assert.deepEqual(bad, []);
});
