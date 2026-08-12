#!/usr/bin/env node
/*
 * Gate wrapper so `npm test` enforces that every cross-doc `.md#anchor` link
 * resolves to a real heading. Logic lives in scripts/check-cross-doc-anchors.js.
 *
 * Why it needed a wrapper (2026-08-12): the checker existed and reported five
 * broken anchors — `#6-subagents--agent-tool-fresh-context` and friends, all
 * double-dash where the slugger emits one — but nothing ran it, so the links
 * had been dead in the workbook for as long as they had existed. A checker
 * nobody runs is a checker that doesn't exist. Found while proving the deck's
 * in-page links navigate: the deck resolved every anchor that was real, which
 * left exactly the ones that never were.
 */

const { test } = require('node:test');
const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const path = require('node:path');

test('every cross-doc .md#anchor link resolves to a real heading', () => {
  try {
    execFileSync('node', [path.join(__dirname, 'check-cross-doc-anchors.js')], { encoding: 'utf8' });
  } catch (e) {
    assert.fail(`check-cross-doc-anchors.js failed:\n${(e.stdout || '') + (e.stderr || '')}`);
  }
});
