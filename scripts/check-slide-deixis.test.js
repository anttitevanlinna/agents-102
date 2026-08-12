#!/usr/bin/env node
/*
 * Gate wrapper so `npm test` enforces check_slides.md §12: no page-geometry
 * pointer ("the laws below", "picked in Step 1 below") survives the `##` cut
 * the Slides layout makes. Logic lives in scripts/check-slide-deixis.js — run
 * it with --report for the full inventory including cleared matches.
 *
 * Origin (2026-08-12, Antti): prework's *"the repo itself (picked in Step 1
 * below)"* on the *What to bring* slide, three slides ahead of Step 1. The word
 * "below" describes a scroll; the deck has none.
 */

const { test } = require('node:test');
const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const CHECKER = path.join(__dirname, 'check-slide-deixis.js');

function run(args) {
  try {
    return { code: 0, out: execFileSync('node', [CHECKER, ...args], { encoding: 'utf8' }) };
  } catch (e) {
    return { code: e.status, out: (e.stdout || '') + (e.stderr || '') };
  }
}

for (const training of ['agentic-engineering-101', 'agents-101', 'claude-basics']) {
  test(`${training}: no page-geometry pointers across the slide cut`, () => {
    const { code, out } = run(['--training', training]);
    assert.equal(code, 0, `check-slide-deixis.js failed:\n${out}`);
  });
}

// The checker has to actually bite — a gate that can only pass is decoration.
test('the checker catches the canonical failure it was built for', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'deixis-'));
  const file = path.join(dir, 'fixture.md');
  fs.writeFileSync(file, [
    '# Prework', '',
    '## What to bring', '',
    'Plus the repo itself (picked in Step 1 below), and a tracker.', '',
    '## 1. Pick THE repo', '',
    'One decision.', '',
  ].join('\n'));
  const { code, out } = run(['--file', file]);
  assert.equal(code, 1, 'a cross-slide "Step 1 below" must fail the gate');
  assert.match(out, /Step 1 below/);
  fs.rmSync(dir, { recursive: true, force: true });
});

test('same-slide paste pointers and one-slide files clear without a maintainer note', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'deixis-'));
  const paste = path.join(dir, 'paste.md');
  fs.writeFileSync(paste, [
    '# Exercise', '',
    '## Send it off', '',
    'The re-send prompt below stands alone.', '',
    '{{prompt:ae101-m5-rerun-packaged}}', '',
  ].join('\n'));
  assert.equal(run(['--file', paste]).code, 0, 'prompt on the same slide is spatially true');

  const flat = path.join(dir, 'flat.md');
  fs.writeFileSync(flat, ['# Exercise', '', 'Use the shared folder for every instruction below.', ''].join('\n'));
  assert.equal(run(['--file', flat]).code, 0, 'a file with no `##` renders as one slide');
  fs.rmSync(dir, { recursive: true, force: true });
});

test('a maintainer accept-note clears the phrase it names, and only that phrase', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'deixis-'));
  const file = path.join(dir, 'accepted.md');
  fs.writeFileSync(file, [
    '# Reference', '',
    '## 9. Long-running shapes', '',
    'The recheck covers the Routines blocks below too.', '',
    '## 10. Transcripts', '',
    'Every law below is a move already made.', '',
    '<!-- maintainer -->', '',
    '**Slide deixis accepted:** "blocks below" — same chunk, ten lines down.', '',
  ].join('\n'));
  const { code, out } = run(['--file', file]);
  assert.equal(code, 1, 'the un-accepted phrase still fails');
  assert.match(out, /law below/);
  assert.doesNotMatch(out, /blocks below/, 'the accepted phrase is cleared');
  fs.rmSync(dir, { recursive: true, force: true });
});
