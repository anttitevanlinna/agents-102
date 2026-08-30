#!/usr/bin/env node
/*
 * Tests for the tier-placement gate (scripts/check-slide-tiers.js).
 *
 * The gate itself runs over the live corpus, so a green run only proves the
 * corpus is clean — not that the check still bites. These cover the two pieces
 * of parsing that could silently stop biting, both of which have already gone
 * wrong once in this repo:
 *
 *   1. Tag counting. A bare `grep -r "<!--tier:"` over curriculum/ returns ~126
 *      hits against 38 real tags, because eval-instance JSON and maintainer
 *      blocks quote the marker as text. Anchoring to line start is the fix, and
 *      a fenced example is the case that gets it wrong again.
 *   2. The before/after split. Filtering module refs on a literal "[Exercise"
 *      prefix false-positived M1's closer, because that module's refs don't use
 *      the prefix. The split must match the `exercises/` PATH.
 *
 * Run: node --test scripts/check-slide-tiers.test.js
 */

const { test } = require('node:test');
const assert = require('node:assert/strict');
const { tagsInBody, splitAtFirstExercise } = require('./check-slide-tiers.js');

// ── tag counting ─────────────────────────────────────────────────────────────

test('a tag is attributed to the slide it sits on', () => {
  const tags = tagsInBody('## First\nbody\n\n## Second\n<!--tier:2-->\n\nbody\n');
  assert.equal(tags.length, 1);
  assert.equal(tags[0].tier, '2');
  assert.equal(tags[0].heading, 'Second');
});

test('all three tiers are recognised, in order', () => {
  const tags = tagsInBody('## A\n<!--tier:1-->\n## B\n<!--tier:2-->\n## C\n<!--tier:3-->\n');
  assert.deepEqual(tags.map(t => t.tier), ['1', '2', '3']);
  assert.deepEqual(tags.map(t => t.heading), ['A', 'B', 'C']);
});

// The regression that makes a loose grep return 126 hits for 38 tags.
test('a marker quoted inside a fence is documentation, not a tag', () => {
  const body = '## Real\n<!--tier:2-->\n\n## How to tag\n\n```\n<!--tier:3-->\n```\n\ntext\n';
  const tags = tagsInBody(body);
  assert.equal(tags.length, 1, 'the fenced example must not count');
  assert.equal(tags[0].heading, 'Real');
});

test('a marker mid-line is prose about the marker, not a tag', () => {
  assert.equal(tagsInBody('## A\nWrite <!--tier:2--> on its own line.\n').length, 0);
});

test('only 1|2|3 are tiers — a typo is not silently counted', () => {
  assert.equal(tagsInBody('## A\n<!--tier:4-->\n').length, 0);
});

// ── the before/after split ───────────────────────────────────────────────────

test('the split is at the first exercises/ ref, and it is a path match', () => {
  const s = splitAtFirstExercise([
    'lectures/the-far-half', 'lectures/the-agent-loop',
    'exercises/walk-and-send-off', 'lectures/ironies-of-automation'
  ]);
  assert.deepEqual(s.before, ['lectures/the-far-half', 'lectures/the-agent-loop']);
  assert.deepEqual(s.after, ['exercises/walk-and-send-off', 'lectures/ironies-of-automation']);
  assert.equal(s.reachesAnExercise, true);
});

// M3 opens on an exercise. Nothing is "before", so nothing can be a violation —
// and the module that is already correctly shaped must not be the one that fails.
test('a module that opens on its exercise has an empty front half', () => {
  const s = splitAtFirstExercise(['exercises/open-the-side-quest', 'lectures/skills-from-the-frontier']);
  assert.deepEqual(s.before, []);
  assert.equal(s.after.length, 2);
});

// The false positive that flagged M1's closer: a module whose refs carry no
// "[Exercise" link text still has exercises, and a lecture named for one is
// still a lecture.
test('a lecture is never mistaken for the exercise that shares its name', () => {
  const s = splitAtFirstExercise([
    'lectures/spot-gaps-build-the-loop', 'exercises/spot-gaps-build-the-loop'
  ]);
  assert.deepEqual(s.before, ['lectures/spot-gaps-build-the-loop'], 'the lecture is in the front half');
  assert.deepEqual(s.after, ['exercises/spot-gaps-build-the-loop']);
});

// A module with no exercise at all: every slide reads as "before", so a T2
// anywhere in it is a finding. Silence here would be the wrong answer.
test('a module with no exercise puts every ref in the front half', () => {
  const s = splitAtFirstExercise(['lectures/a', 'lectures/b']);
  assert.deepEqual(s.before, ['lectures/a', 'lectures/b']);
  assert.deepEqual(s.after, []);
  assert.equal(s.reachesAnExercise, false);
});

// ── marker layout ────────────────────────────────────────────────────────────
// The regression this gate exists for, caused 2026-08-30 while applying the tier
// audit: expandTiers turns the marker into a <div>, and marked reads up to the
// next blank line as part of that HTML block. A `## Key Concepts` whose bullets
// start on the very next line loses them in LONG-READ while the deck looks fine
// — 33 blocks across six module files, and no gate saw it.

const { markerLayoutProblems } = require('./check-slide-tiers.js');

test('a marker followed by a blank line is fine', () => {
  assert.deepEqual(markerLayoutProblems('## A\n<!--tier:2-->\n\n- one\n- two\n'), []);
});

test('a marker with a list on the very next line is the bug', () => {
  const p = markerLayoutProblems('## Key Concepts\n<!--tier:2-->\n- The loop is orient then fix\n');
  assert.equal(p.length, 1);
  assert.equal(p[0].heading, 'Key Concepts');
});

test('prose on the very next line is caught too — same HTML-block swallow', () => {
  assert.equal(markerLayoutProblems('## A\n<!--tier:3-->\nSome prose.\n').length, 1);
});

test('a marker at end of file has nothing to swallow', () => {
  assert.deepEqual(markerLayoutProblems('## A\n<!--tier:2-->'), []);
});
