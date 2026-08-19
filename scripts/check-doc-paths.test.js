const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const { isPlaceholder, stripFences, resolves, isCurriculumInclude } = require('./check-doc-paths.js');
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

// A module include is the renderer's contract: site/layouts/curriculum.js
// rewriteCrossDocLinks fetches exactly these shapes, so exactly these must
// resolve. They carry no repo-root prefix, so the student-surface roots filter
// used to skip every one of them — the checker read 447 docs and never looked
// at the pointers that decide whether a module renders its own exercises.
test('isCurriculumInclude: the shapes the renderer fetches', () => {
  for (const ref of [
    'exercises/push-back-on-the-plan.md',
    'lectures/the-whole-map.md',
    '../../trainings/agents-101/supplementary/what-is-an-agent.md',
    'trainings/agentic-engineering-101/reference/prompt-anatomy.md',
  ]) {
    assert.equal(isCurriculumInclude(ref), true, ref);
  }
});

test('isCurriculumInclude: the student working tree is not an include', () => {
  for (const ref of [
    'outputs/policy-report.md', 'module-1/site.html', './challenge.md',
    'agents/researcher.md', 'memory/health.md', 'judges/groundedness.md',
    'exercises/nested/deep.md',
  ]) {
    assert.equal(isCurriculumInclude(ref), false, ref);
  }
});

test('every module include in every training actually resolves', () => {
  const { execSync } = require('node:child_process');
  const root = path.join(__dirname, '..');
  const files = execSync('git ls-files "curriculum/trainings/*/*.md"', { cwd: root })
    .toString().trim().split('\n').filter(Boolean);
  let checked = 0;
  const dead = [];
  for (const f of files) {
    const text = stripFences(fs.readFileSync(path.join(root, f), 'utf8'));
    const re = /\]\(([A-Za-z0-9_.@/-]+\.md)(?:#[^)]*)?\)/g;
    let m;
    while ((m = re.exec(text)) !== null) {
      if (!isCurriculumInclude(m[1])) continue;
      checked++;
      if (!resolves(m[1], path.dirname(f), f)) dead.push(`${f} -> ${m[1]}`);
    }
  }
  // Guard the guard: a pattern that matches nothing passes vacuously.
  assert.ok(checked > 50, `expected to check many includes, checked ${checked}`);
  assert.deepEqual(dead, [], `dead module includes:\n${dead.join('\n')}`);
});

// Fail-closed: the pattern admitting a ref and the resolver rejecting it are
// the two halves that must compose, or widening the filter bought nothing.
test('a dead module include is admitted by the filter and rejected by the resolver', () => {
  const dead = 'exercises/no-such-exercise-exists.md';
  assert.equal(isCurriculumInclude(dead), true, 'must reach the resolver');
  assert.equal(resolves(dead, 'curriculum/trainings/agents-101', 'curriculum/trainings/agents-101/security.md'), false,
    'must not resolve');
});
