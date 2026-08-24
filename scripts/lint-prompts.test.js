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

/*
 * Approval markers. check_prompts.md §22(e): the card flow completes when
 * `.claude/prompt-approvals/<key>.confirmed` is written, NOT when the human
 * says prompt-ok. The rule's own text records the step being skipped on
 * 2026-05-24 and 2026-05-25; on 2026-08-23 it was skipped three more times
 * (ae101-m2-name-what-moves, ae101-m2-tidier, ae101-m5-done-done — all three
 * attest approval in frontmatter, none has a marker). Nothing checked, so
 * nothing noticed. The marker is also the pre-commit hook's only headless
 * clear-path, so a missing one dead-ends a future body edit at a no-tty abort.
 */
const { approvalGaps, claimsApproval } = require('./lint-prompts.js');

test('claimsApproval: the prompt-ok token in a note is an approval claim', () => {
  assert.equal(claimsApproval({ note: 'Four points are Antti\'s. Approved prompt-ok 2026-08-23.' }), true);
  assert.equal(claimsApproval({ note: 'Antti-worded 2026-08-23, approved prompt-ok same day.' }), true);
});

test('claimsApproval: case-insensitive, matching the rule token', () => {
  assert.equal(claimsApproval({ note: 'approved PROMPT-OK 2026-08-23' }), true);
});

test('claimsApproval: a note with no token claims nothing', () => {
  assert.equal(claimsApproval({ note: 'M5 opener, student-run in the send-off session.' }), false);
  assert.equal(claimsApproval({}), false);
  assert.equal(claimsApproval({ note: null }), false);
});

test('claimsApproval: the word approved alone is not the token', () => {
  assert.equal(claimsApproval({ note: 'Approved by Antti 2026-08-23.' }), false);
});

test('approvalGaps: a claim with no marker is a gap', () => {
  const gaps = approvalGaps({ 'a-key': { note: 'approved prompt-ok 2026-08-23' } }, new Set());
  assert.deepEqual(gaps, ['a-key']);
});

test('approvalGaps: a claim with its marker is clean', () => {
  const gaps = approvalGaps({ 'a-key': { note: 'approved prompt-ok 2026-08-23' } }, new Set(['a-key']));
  assert.deepEqual(gaps, []);
});

test('approvalGaps: a marker without a claim is not a gap — the marker is the record', () => {
  const gaps = approvalGaps({ 'a-key': { note: 'no token here' } }, new Set(['a-key']));
  assert.deepEqual(gaps, []);
});

test('approvalGaps: reports every gap, sorted, not just the first', () => {
  const reg = {
    'z-key': { note: 'approved prompt-ok' },
    'a-key': { note: 'approved prompt-ok' },
    'm-key': { note: 'approved prompt-ok' },
  };
  assert.deepEqual(approvalGaps(reg, new Set(['m-key'])), ['a-key', 'z-key']);
});
