const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const { isPlaceholder, stripFences, resolves } = require('./check-doc-paths.js');
const { namesIt } = require('./find-session-docs.js');

test('isPlaceholder: illustrative shapes are not pointers', () => {
  for (const ref of ['curriculum/<slug>.md', 'docs/adr/NNNN-slug.md', 'memory/project_xyz.md',
                     'curriculum/old-path.md', 'a/X.md', 'exercises/slug.md']) {
    assert.equal(isPlaceholder(ref), true, ref);
  }
});

test('isPlaceholder: CLAUDE.local.md is absent by design, never rot', () => {
  assert.equal(isPlaceholder('./CLAUDE.local.md'), true);
  assert.equal(isPlaceholder('some/dir/CLAUDE.local.md'), true);
});

test('isPlaceholder: a real path is not a placeholder', () => {
  assert.equal(isPlaceholder('curriculum/vocabulary.md'), false);
});

test('stripFences: fenced blocks are commands, not pointers', () => {
  const text = 'live `curriculum/vocabulary.md`\n```\ncat not/a/pointer.md\n```\ntail';
  const out = stripFences(text);
  assert.ok(out.includes('curriculum/vocabulary.md'));
  assert.ok(!out.includes('not/a/pointer.md'));
});

test('resolves: repo-root and memory-store paths both resolve', () => {
  assert.equal(resolves('curriculum/vocabulary.md', '.'), true);
  assert.equal(resolves('curriculum/nope-does-not-exist.md', '.'), false);
});

test('the allowlist is well-formed and every entry carries a reason', () => {
  const allow = JSON.parse(fs.readFileSync(path.join(__dirname, 'check-doc-paths.allow.json'), 'utf8'));
  for (const [key, reason] of Object.entries(allow)) {
    assert.match(key, / -> /, `allow key must be "<file> -> <ref>": ${key}`);
    assert.ok(reason.trim().length > 20, `allow entry needs a real reason: ${key}`);
  }
});

// Regression: a reference to `the-loop-has-a-name.md` must not register as a hit
// on `loop-has-a-name.md`. Naive substring matching granted canon to a file that
// nothing actually named.
test('namesIt: basename matches whole path segments, not substrings', () => {
  const text = 'see `curriculum/lectures/the-loop-has-a-name.md` for the close';
  assert.equal(namesIt(text, 'curriculum/evals/scratch/loop-has-a-name.md'), false);
  assert.equal(namesIt(text, 'curriculum/lectures/the-loop-has-a-name.md'), true);
});

test('namesIt: a bare basename in prose still counts', () => {
  assert.equal(namesIt('as recorded in vocabulary.md today', 'curriculum/vocabulary.md'), true);
});
