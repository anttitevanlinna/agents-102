'use strict';
const test = require('node:test');
const assert = require('node:assert');
const { scorePrompt } = require('./prompt-taste.js');

const hits = (text, tell) => (scorePrompt('k', text).hits[tell] || []).length;

test('capitals count whether they are emphasis or labels', () => {
  assert.strictEqual(hits('Touch ONLY that section.', 'caps'), 1);
  assert.strictEqual(hits('If no file supports it, flag it UNGROUNDED.', 'caps'), 1);
});

test('acronyms, code spans and the source-or-flag marker are not capitals tells', () => {
  assert.strictEqual(hits('Save the HTML and the SKILL.md. Run `git log --oneline HEAD`. Write [NOT FOUND].', 'caps'), 0);
});

test('telling the agent the obvious is a tell', () => {
  assert.strictEqual(hits('Start by reading the files. Then rewrite the rules.', 'obvious'), 1);
  assert.strictEqual(hits('Open the pages. Read them properly.', 'obvious'), 2);
});

test('scripted questions the agent asks back do not count as "you" meaning the student', () => {
  assert.strictEqual(hits('Ask me these in turn:\n1. Where are you currently stuck on this?', 'youFlip'), 0);
  assert.strictEqual(hits("A real call you'd stay late to make.", 'youFlip'), 1);
});

test('quotas and fragments are counted but never scored', () => {
  const r = scorePrompt('k', 'Assume the rules file is at least 30% wrong or thin. Push another round. Different angles. Append.');
  assert.ok(r.hits.quota);
  assert.strictEqual(r.score, 0);
});

test('a clean prompt scores zero', () => {
  assert.strictEqual(scorePrompt('k', 'Push another round. What did the first pass miss? Append; do not rewrite.').score, 0);
});
