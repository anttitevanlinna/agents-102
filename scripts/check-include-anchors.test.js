#!/usr/bin/env node
/*
 * Gate wrapper + detection proof for check-include-anchors.js.
 *
 * The gate test alone would be worthless the day the checker stopped finding
 * anything — a green that means "nothing was looked at" reads exactly like a
 * green that means "nothing is wrong" (memory/compounded/2026-08-08-platform-
 * verification-tooling-must-fail-closed.md). So the fixture tests run the real
 * detector over a scratch training and assert it FAILS on the shape it exists
 * to catch, before the corpus test asserts the corpus is clean.
 */

const { test } = require('node:test');
const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');

const SCRIPT = path.join(__dirname, 'check-include-anchors.js');
// The scratch training lives in a temp dir, NOT in curriculum/trainings/.
// `node --test scripts/*.test.js` runs test files in parallel, so a fixture
// inside the real corpus is visible to every sibling checker mid-run: this
// suite's fixture and check-cross-doc-anchors.js raced, the fixture was torn
// down between that checker's glob and its read, and the suite failed in the
// OTHER test with a twelve-frame ENOENT. A test that mutates the tree other
// tests read is a flaky suite by construction.
const TRAININGS = fs.mkdtempSync(path.join(os.tmpdir(), 'include-anchors-'));
const FIXTURE = 'zz-include-anchor-fixture';
const DIR = path.join(TRAININGS, FIXTURE);

function run(args, env = { TRAININGS_DIR: TRAININGS }) {
  try {
    return { code: 0, out: execFileSync('node', [SCRIPT, ...args], { encoding: 'utf8', env: { ...process.env, ...env } }) };
  } catch (e) {
    return { code: e.status, out: (e.stdout || '') + (e.stderr || '') };
  }
}

function withFixture(body, fn) {
  assert.equal(fs.existsSync(DIR), false, `scratch training already exists: ${DIR}`);
  fs.mkdirSync(DIR, { recursive: true });
  try {
    fs.writeFileSync(path.join(DIR, 'a-module.md'), body);
    fn();
  } finally {
    fs.rmSync(DIR, { recursive: true, force: true });
  }
}

test('an in-sentence link to a never-inlined file is reported', () => {
  withFixture(
    '# A module\n\n## Homework\n\nThen do [Before Module 3](exercises/module-3-prework.md): pick three pieces.\n',
    () => {
      const { code, out } = run(['--training', FIXTURE]);
      assert.equal(code, 1, 'the checker must exit non-zero');
      assert.match(out, /#exercises-module-3-prework/, 'and name the dead anchor');
    });
});

test('the same link ALONE on its line is an include, and resolves the sentence version too', () => {
  withFixture(
    '# A module\n\n## Homework\n\nThen do [Before Module 3](exercises/module-3-prework.md): pick three pieces.\n\n'
    + '[Before Module 3](exercises/module-3-prework.md)\n',
    () => {
      const { code } = run(['--training', FIXTURE]);
      assert.equal(code, 0, 'one standalone include covers every reference to that file');
    });
});

test('maintainer-tail references are exempt — they are read in source', () => {
  withFixture(
    '# A module\n\nBody with no links.\n\n<!-- maintainer -->\n\n'
    + 'See [Before Module 3](exercises/module-3-prework.md) for the reading list.\n',
    () => {
      const { code } = run(['--training', FIXTURE]);
      assert.equal(code, 0, 'below the fence the path resolves for whoever reads the repo');
    });
});

test('a scan that finds no training fails', () => {
  const { code, out } = run([]);
  assert.equal(code, 1, out);
  assert.match(out, /0 trainings/);
});

// No TRAININGS_DIR: the real curriculum/trainings/, and it must have looked at some.
test('every exercise/lecture link in the shipped trainings resolves', () => {
  const env = { ...process.env }; delete env.TRAININGS_DIR;
  const { code, out } = run([], env);
  assert.equal(code, 0, `check-include-anchors.js failed:\n${out}`);
  assert.match(out, /OK — [1-9]\d* trainings, [1-9]\d* files, every exercise\/lecture link resolves/);
});

// ── slide includes: `[Title](lectures/<slug>.md#<id>)` alone on its line ────
// The library dir is overridable for the same reason TRAININGS_DIR is.
const LIBRARY = fs.mkdtempSync(path.join(os.tmpdir(), 'include-anchors-lib-'));
fs.mkdirSync(path.join(LIBRARY, 'lectures'));
fs.writeFileSync(path.join(LIBRARY, 'lectures', 'shared.md'),
  '# Shared\n\n## A slide\n<!--slide:a-slide-->\n\nBody.\n');

test('a slide include whose id resolves passes', () => {
  withFixture('# M\n\n[A slide](lectures/shared.md#a-slide)\n', () => {
    const { code, out } = run(['--training', FIXTURE], { TRAININGS_DIR: TRAININGS, LIBRARY_DIR: LIBRARY });
    assert.equal(code, 0, out);
  });
});

test('a slide include whose id does not resolve fails and names it', () => {
  withFixture('# M\n\n[Gone](lectures/shared.md#gone)\n', () => {
    const { code, out } = run(['--training', FIXTURE], { TRAININGS_DIR: TRAININGS, LIBRARY_DIR: LIBRARY });
    assert.equal(code, 1);
    assert.match(out, /lectures\/shared\.md#gone/);
  });
});

// Slide files: a lecture's `[T](slides/<id>.md)` must reach a well-formed slide
// file, and a slide file nothing includes is a cut slide that fell out of every
// deck.
test('slide-file includes: missing, malformed and orphaned slide files fail; a good one passes', () => {
  const lib = fs.mkdtempSync(path.join(os.tmpdir(), 'include-anchors-lib-'));
  fs.mkdirSync(path.join(lib, 'lectures'));
  fs.mkdirSync(path.join(lib, 'slides'));
  const tr = fs.mkdtempSync(path.join(os.tmpdir(), 'include-anchors-tr-'));
  fs.mkdirSync(path.join(tr, 'zz'));
  fs.writeFileSync(path.join(tr, 'zz', 'm.md'), '# M\n\n[L](lectures/l.md)\n');
  fs.writeFileSync(path.join(lib, 'slides', 'good.md'), '## Good\n<!--slide:good-->\n\nok\n');
  const env = { TRAININGS_DIR: tr, LIBRARY_DIR: lib };

  fs.writeFileSync(path.join(lib, 'lectures', 'l.md'), '# L\n\n[Good](slides/good.md)\n');
  let r = run([], env);
  assert.equal(r.code, 0, r.out);

  fs.writeFileSync(path.join(lib, 'slides', 'bent.md'), '## Bent\n<!--slide:other-->\n\nx\n');
  fs.writeFileSync(path.join(lib, 'slides', 'stray.md'), '## Stray\n<!--slide:stray-->\n\nx\n');
  fs.writeFileSync(path.join(lib, 'lectures', 'l.md'), '# L\n\n[Good](slides/good.md)\n\n[Gone](slides/gone.md)\n\n[Bent](slides/bent.md)\n');
  r = run([], env);
  assert.equal(r.code, 1);
  assert.match(r.out, /lectures\/l\.md:5 -> slides\/gone\.md \(no such slide file\)/);
  assert.match(r.out, /lectures\/l\.md:7 -> slides\/bent\.md \(marker says other, filename says bent\)/);
  assert.match(r.out, /slides\/stray\.md: no file includes it/);
})
