#!/usr/bin/env node
'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { violations } = require('./check-ui-labels.js');

// The line this checker exists for. Lived at plan-mode-done-right.md:211 from
// 60b1b6cd until 2026-08-24, naming a menu option that has never been on any
// student's screen. Both halves are violations: the forcing-function column and
// the quoted trainer push.
const HISTORICAL =
  '| P3 — *"push back twice via keep-planning-with-feedback"* | P3 rubber-stamp — student approves under 60s with no push-back | Trainer push: *"pick keep-planning-with-feedback — send one soft item before approving."* |';

const FIXED =
  '| P3 — *"push back twice via No, keep planning"* | P3 rubber-stamp — student approves under 60s with no push-back | Trainer push: *"pick No, keep planning — send one soft item before approving."* |';

const scan = (body, opts) => violations([{ file: 'f.md', body }], opts);

test('catches the historical line that a prose-shaped sweep missed', () => {
  const hits = scan(HISTORICAL);
  assert.equal(hits.length, 1);
  assert.equal(hits[0].verb, 'pick');
  assert.equal(hits[0].slug, 'keep-planning-with-feedback');
  assert.equal(hits[0].line, 1);
});

test('the corrected line is clean', () => {
  assert.deepEqual(scan(FIXED), []);
});

test('`via` is a mechanism word, not an on-screen affordance — report only', () => {
  const body = 'Run the full audit via curriculum-pre-ship-audit before ship.';
  assert.deepEqual(scan(body), []);
  const reported = scan(body, { report: true });
  assert.equal(reported.length, 1);
  assert.equal(reported[0].verb, 'via');
  assert.equal(reported[0].gating, false);
});

test('a backticked slug is an identifier, not a spoken label', () => {
  assert.deepEqual(scan('Verify via `claude-code-guide` that the task runs.'), []);
  assert.deepEqual(scan('Then pick `general-purpose-runner` from the list.'), []);
});

test('two-segment hyphenations are real English and real labels', () => {
  // "Yes, auto-accept edits" is a live Claude Code menu row.
  assert.deepEqual(scan('At the prompt, pick auto-accept edits.'), []);
});

test('fenced code is not prose', () => {
  const body = ['Intro.', '```bash', 'claude --pick some-long-flag-name', '```', 'Outro.'].join('\n');
  assert.deepEqual(scan(body), []);
});

test('an indented code block is not prose either', () => {
  const body = ['Intro.', '', '    select keep-planning-with-feedback', '', 'Outro.'].join('\n');
  assert.deepEqual(scan(body), []);
});

test('every gating verb fires, and the line number is reported', () => {
  const verbs = ['pick', 'choose', 'select', 'click', 'press', 'hit', 'tap', 'toggle'];
  const body = ['lede', ...verbs.map((v) => `Now ${v} keep-planning-with-feedback to continue.`)].join('\n');
  const hits = scan(body);
  assert.deepEqual(hits.map((h) => h.verb), verbs);
  assert.deepEqual(hits.map((h) => h.line), verbs.map((_, i) => i + 2));
});

test('emphasis around the slug does not hide it', () => {
  assert.equal(scan('Trainer: *"pick keep-planning-with-feedback now."*').length, 1);
  assert.equal(scan('Trainer: **choose keep-planning-with-feedback**.').length, 1);
});

test('a maintainer accept-note clears exactly one slug, not the file', () => {
  const body = [
    'Now pick keep-planning-with-feedback to continue.',
    'Also press some-other-slug-name here.',
    '',
    '**UI label accepted:** "keep-planning-with-feedback" — the id IS the label in this vendor UI.',
  ].join('\n');
  const hits = scan(body);
  assert.equal(hits.length, 1);
  assert.equal(hits[0].slug, 'some-other-slug-name');
});

test('the live corpus obeys the rule', () => {
  const { collect } = require('./check-ui-labels.js');
  assert.deepEqual(violations(collect()), []);
});
