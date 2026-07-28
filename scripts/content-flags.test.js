// Content flags — per-variant inclusion of passages inside a SHARED source file.
//
// The mechanism exists because the Northwind team track ships no content
// tarball, so AE101's prework steps that download and extract one describe
// equipment that variant does not issue. Both variants read the same
// prework.md, so the difference has to be expressible in the file rather than
// in a fork of it.
//
// What these tests actually guard is the renumbering. Dropping steps 3 and 4
// leaves a hole that a reader sees immediately (1, 2, 5) and a stranded
// "Step 5" reference that points at nothing. That is the failure worth a test:
// it is silent in the builder and loud in the room.

const { test } = require('node:test');
const assert = require('node:assert/strict');

const { applyContentFlags } = require('../site/layouts/curriculum.js');

const SRC = [
  'Intro naming Step 1<!--flag:payload--> and the kit from Step 4<!--/flag:payload-->.',
  '',
  '## 1. First',
  '',
  'Body.',
  '',
  '## 2. Second',
  '',
  'Body.',
  '',
  '<!--flag:payload-->',
  '## 3. Fetch the payload',
  '',
  'Body.',
  '',
  '## 4. Extract it',
  '',
  'Body.',
  '',
  '<!--/flag:payload-->',
  '## 5. Last',
  '',
  'Carries on from Step 2.',
  '',
].join('\n');

test('flag absent: passage stays, only the markers go, numbering untouched', () => {
  const out = applyContentFlags(SRC, undefined);
  assert.equal(out.includes('<!--flag:'), false);
  assert.equal(out.includes('<!--/flag:'), false);
  assert.match(out, /^## 3\. Fetch the payload$/m);
  assert.match(out, /^## 5\. Last$/m);
  assert.match(out, /the kit from Step 4/);
});

test('flag true reads the same as flag absent', () => {
  assert.equal(applyContentFlags(SRC, { payload: true }), applyContentFlags(SRC, undefined));
});

test('flag false: passage goes and the remaining steps renumber consecutively', () => {
  const out = applyContentFlags(SRC, { payload: false });
  assert.equal(out.includes('Fetch the payload'), false);
  assert.equal(out.includes('Extract it'), false);

  const headers = out.match(/^## (\d+)\. /gm).map(h => Number(h.match(/\d+/)[0]));
  assert.deepEqual(headers, [1, 2, 3], 'no hole where the flagged steps were');
  assert.match(out, /^## 3\. Last$/m, 'step 5 became step 3');
});

test('flag false: surviving references follow the same renumber', () => {
  const out = applyContentFlags(SRC, { payload: false });
  assert.match(out, /naming Step 1/, 'a reference to an unmoved step is unchanged');
  assert.match(out, /Carries on from Step 2/);
  assert.equal(out.includes('Step 4'), false, 'the flagged clause left with its step');
});

test('a reference stranded outside the flag throws rather than shipping', () => {
  // The clause naming Step 4 is deliberately OUTSIDE the flag here. Renumbering
  // it is impossible (the step is gone) and leaving it is a page pointing at a
  // step that does not exist, so the only honest outcome is a failed build.
  const stranded = SRC.replace(
    'Intro naming Step 1<!--flag:payload--> and the kit from Step 4<!--/flag:payload-->.',
    'Intro naming Step 1 and the kit from Step 4.'
  );
  assert.throws(
    () => applyContentFlags(stranded, { payload: false }),
    /removed step 4 but "Step 4" still refers to it/
  );
});

test('an unbalanced marker throws rather than rendering as a comment', () => {
  assert.throws(
    () => applyContentFlags('## 1. A\n\n<!--flag:payload-->\nBody.\n', { payload: false }),
    /Unbalanced content-flag marker/
  );
});

test('a file with no markers is returned untouched', () => {
  const plain = '## 1. A\n\nBody referencing Step 1.\n';
  assert.equal(applyContentFlags(plain, { payload: false }), plain);
});
