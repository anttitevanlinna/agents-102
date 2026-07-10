#!/usr/bin/env node
/*
 * Gate wrapper so `npm test` (node --test scripts/*.test.js) enforces the
 * content-side numbering contract: `## Phase N` / `## N.` headers consecutive
 * from 1, and student-facing "Phase K" / "Step K" references resolving within
 * the same file. Logic lives in scripts/check-slide-numbering.js (run it
 * directly with --report for the full inventory).
 */

const { test } = require('node:test');
const assert = require('node:assert/strict');
const { execSync } = require('node:child_process');
const path = require('node:path');

test('AE101 slide content: Phase/Step numbering is consecutive and references resolve', () => {
  try {
    execSync(`node ${path.join(__dirname, 'check-slide-numbering.js')}`, { encoding: 'utf8' });
  } catch (e) {
    assert.fail(`check-slide-numbering.js failed:\n${e.stdout || ''}${e.stderr || ''}`);
  }
});
