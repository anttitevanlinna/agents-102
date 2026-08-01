#!/usr/bin/env node
/*
 * Tests for lint-prompts.js.
 *
 * Run: node --test scripts/lint-prompts.test.js
 *
 * Regression focus: a `{{prompt:key}}` marker inside an inline code span or a
 * fenced code block is a MENTION (maintainer narrative, eval reports), not an
 * include — the renderer only expands bare markers. First hit 2026-08-01: the
 * retired `walk-and-send-off-4` survives as a backticked mention in the
 * exercise's maintainer block and in an eval report, and the linter flagged it
 * as an unresolved reference. stripCodeMentions is the guard.
 */

const { test } = require('node:test');
const assert = require('node:assert/strict');

const { stripCodeMentions, REFERENCE_RE, walkMarkdown } = require('./lint-prompts.js');
const path = require('path');

function keysIn(text) {
  const keys = [];
  let m;
  REFERENCE_RE.lastIndex = 0;
  const stripped = stripCodeMentions(text);
  while ((m = REFERENCE_RE.exec(stripped)) !== null) keys.push(m[1]);
  return keys;
}

test('bare markers still count as references', () => {
  assert.deepEqual(keysIn('intro\n\n{{prompt:alpha-1}}\n\nmore'), ['alpha-1']);
});

test('inline code-span mentions are ignored', () => {
  const text = 'the pass re-fenced Phase 3 as `{{prompt:retired-4}}` without checking';
  assert.deepEqual(keysIn(text), []);
});

test('fenced code-block mentions are ignored', () => {
  const text = 'example:\n\n```\n{{prompt:retired-4}}\n```\n\ndone';
  assert.deepEqual(keysIn(text), []);
});

test('bare marker next to a code-span mention still resolves', () => {
  const text = '`{{prompt:retired-4}}` was cut; use this instead:\n\n{{prompt:alpha-1}}\n';
  assert.deepEqual(keysIn(text), ['alpha-1']);
});

test('cut-candidate markers count as references', () => {
  assert.deepEqual(keysIn('{{cut:beta-2|too-slow}}'), ['beta-2']);
});

test('walk skips the registry and evals dirs', () => {
  const files = walkMarkdown(path.resolve(__dirname, '..', 'curriculum'));
  assert.ok(files.length > 0);
  const sep = path.sep;
  assert.equal(files.filter(f => f.includes(sep + 'prompts' + sep)).length, 0);
  assert.equal(files.filter(f => f.includes(sep + 'evals' + sep)).length, 0);
});
