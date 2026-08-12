#!/usr/bin/env node
// Tests for scan-stale-classes.js — diff-region → judge-class routing.
'use strict'
const assert = require('node:assert')
const { parseHunks, buildLineMeta, changeTags, extractPins, filterItems, typeOf, trainingOf } = require('./scan-stale-classes.js')

let n = 0
function test(name, fn) { fn(); n++; console.log(`ok ${n} - ${name}`) }

// --- parseHunks ---
test('parseHunks: full header', () => {
  assert.deepStrictEqual(parseHunks('@@ -10,3 +12,4 @@ ctx\n+a\n'), [{ oldStart: 10, oldLen: 3, start: 12, len: 4, added: [12], removedAt: [] }])
})
test('parseHunks: single-line shorthand', () => {
  assert.deepStrictEqual(parseHunks('@@ -5 +6 @@\n'), [{ oldStart: 5, oldLen: 1, start: 6, len: 1, added: [], removedAt: [] }])
})
test('parseHunks: pure deletion', () => {
  assert.deepStrictEqual(parseHunks('@@ -8,2 +7,0 @@\n-x\n-y\n'), [{ oldStart: 8, oldLen: 2, start: 7, len: 0, added: [], removedAt: [7, 7] }])
})

// --- fixture file ---
const DOC = [
  '# Title',                    // 1
  'intro prose line',           // 2  opener
  '',                           // 3
  '## Big Idea',                // 4
  'the idea sentence',          // 5  big-idea section
  '',                           // 6
  '## Phase 1 — build',         // 7
  '**Time:** 10 min',           // 8
  'phase prose step',           // 9  plain prose in phase
  '```bash',                    // 10 fence delimiter
  'echo hi',                    // 11 fence interior
  '```',                        // 12 fence delimiter
  'line with {{prompt:my-key}}',// 13
  'a cite https://example.com', // 14
  '',                           // 15
  '## Bridge',                  // 16
  'bridge prose',               // 17 close section
  '',                           // 18
  '<!-- maintainer -->',        // 19
  '**Quality:** compendium-audited 2026-07-01 (writing@aaa1111 story@aaa1111 technical@bbb2222 behavior@bbb2222 pedagogy@aaa1111 strategy@aaa1111 slides@aaa1111)',
  '- judges 2026-07-01 (writing PASS, story PASS)',
].join('\n')

test('buildLineMeta: regions and sections', () => {
  const m = buildLineMeta(DOC)
  assert.strictEqual(m[1].opener, true)              // line 2
  assert.strictEqual(m[4].section, 'big idea')       // line 5
  assert.strictEqual(m[10].region, 'fence')          // line 11
  assert.strictEqual(m[9].region, 'fence')           // delimiter counts as fence
  assert.strictEqual(m[16].close, true)              // line 17 in last ## section
  assert.strictEqual(m[18].region, 'maintainer')     // line 19
  assert.strictEqual(m[19].region, 'maintainer')
  assert.strictEqual(m[6].heading, true)             // line 7
})

function tagsFor(hunks) {
  const meta = buildLineMeta(DOC)
  return changeTags(meta, hunks).tags
}

test('changeTags: plain mid-file prose → writing+slides only', () => {
  const t = tagsFor([{ oldStart: 9, oldLen: 1, start: 9, len: 1 }])
  assert.deepStrictEqual([...t].sort(), ['slides', 'writing'])
})
test('changeTags: Big Idea line → strategy+story', () => {
  const t = tagsFor([{ oldStart: 5, oldLen: 1, start: 5, len: 1 }])
  assert(t.has('strategy') && t.has('story') && t.has('writing') && t.has('slides'))
  assert(!t.has('pedagogy'))
})
test('changeTags: Time line → pedagogy', () => {
  const t = tagsFor([{ oldStart: 8, oldLen: 1, start: 8, len: 1 }])
  assert(t.has('pedagogy'))
  assert(!t.has('strategy'))
})
test('changeTags: fence interior → technical only, no body count', () => {
  const r = changeTags(buildLineMeta(DOC), [{ oldStart: 11, oldLen: 1, start: 11, len: 1 }])
  assert.deepStrictEqual([...r.tags].sort(), ['technical'])
  assert.strictEqual(r.changedBody, 0)
})
test('changeTags: prompt include line → behavior+technical+pedagogy', () => {
  const t = tagsFor([{ oldStart: 13, oldLen: 1, start: 13, len: 1 }])
  assert(t.has('behavior') && t.has('technical') && t.has('pedagogy'))
})
test('changeTags: URL line → technical', () => {
  const t = tagsFor([{ oldStart: 14, oldLen: 1, start: 14, len: 1 }])
  assert(t.has('technical'))
})
test('changeTags: Bridge section → pedagogy+story', () => {
  const t = tagsFor([{ oldStart: 17, oldLen: 1, start: 17, len: 1 }])
  assert(t.has('pedagogy') && t.has('story'))
})
test('changeTags: heading line → story+pedagogy+slides', () => {
  const t = tagsFor([{ oldStart: 7, oldLen: 1, start: 7, len: 1 }])
  assert(t.has('story') && t.has('pedagogy') && t.has('slides'))
})
test('changeTags: maintainer-only edit → no tags', () => {
  const t = tagsFor([{ oldStart: 20, oldLen: 1, start: 20, len: 1 }])
  assert.strictEqual(t.size, 0)
})
test('changeTags: deletion hunk anchors on surrounding body, counts old lines', () => {
  const r = changeTags(buildLineMeta(DOC), [{ oldStart: 9, oldLen: 1, start: 8, len: 0 }])
  assert(r.tags.has('writing'))
  assert.strictEqual(r.changedBody, 1)
})
test('changeTags: bulk change (>15 body lines) → story+pedagogy', () => {
  const t = tagsFor([{ oldStart: 2, oldLen: 1, start: 2, len: 1 },
    ...Array.from({ length: 16 }, () => ({ oldStart: 9, oldLen: 1, start: 9, len: 1 }))])
  assert(t.has('story') && t.has('pedagogy'))
})
test('changeTags: opener edit → story', () => {
  const t = tagsFor([{ oldStart: 2, oldLen: 1, start: 2, len: 1 }])
  assert(t.has('story'))
})

// --- extractPins ---
test('extractPins: per-class shas from top Quality line', () => {
  const pins = extractPins(DOC)
  assert.strictEqual(pins.writing, 'aaa1111')
  assert.strictEqual(pins.technical, 'bbb2222')
  assert.strictEqual(pins.slides, 'aaa1111')
})

// --- filterItems ---
function io(diffByPath, valid = true) {
  return {
    readFile: () => DOC,
    gitDiff: (sha, p) => diffByPath[p] || '',
    validSha: () => valid,
  }
}
const ITEM = { file: 'curriculum/exercises/x.md', type: 'exercise', slug: 'x', instanceSlug: 'ae101--exercise--x', classes: ['writing', 'story', 'technical', 'behavior', 'pedagogy', 'strategy', 'slides'] }

test('filterItems: mid-file prose edit keeps writing+slides, prunes rest', () => {
  const { items, report } = filterItems([ITEM], io({ 'curriculum/exercises/x.md': '@@ -9,1 +9,1 @@\n-old\n+new\n' }))
  assert.deepStrictEqual(items[0].classes.sort(), ['slides', 'writing'])
  assert.strictEqual(report[0].pruned.length, 5)
})
test('filterItems: registry prompt change keeps behavior', () => {
  const { items } = filterItems([ITEM], io({
    'curriculum/exercises/x.md': '@@ -9,1 +9,1 @@\n-old\n+new\n',
    'curriculum/prompts/my-key.md': '@@ -1,1 +1,1 @@\n-a\n+b\n',
  }))
  assert(items[0].classes.includes('behavior'))
})
test('filterItems: unpinned class always kept', () => {
  const noPinDoc = DOC.replace(/behavior@bbb2222 /, '')
  const myIo = { readFile: () => noPinDoc, gitDiff: () => '', validSha: () => true }
  const { items } = filterItems([{ ...ITEM, classes: ['behavior'] }], myIo)
  assert.deepStrictEqual(items[0].classes, ['behavior'])
})
test('filterItems: bad sha kept as stale', () => {
  const { items } = filterItems([{ ...ITEM, classes: ['writing'] }], io({}, false))
  assert.deepStrictEqual(items[0].classes, ['writing'])
})
test('filterItems: no diff at all → all pinned classes pruned', () => {
  const { items } = filterItems([ITEM], io({}))
  assert.deepStrictEqual(items[0].classes, [])
})

/*
 * Context lines are not changes.
 *
 * git pads every hunk with up to 3 unchanged lines on each side. The first cut
 * walked the hunk's RANGE, so those context lines were tagged as edits — and
 * because `<!-- maintainer -->` sits immediately after the last body line, ANY
 * note added at the top of a maintainer block produced a hunk reaching back
 * into body and falsely staled writing + slides (+ story, when the context hit
 * the closer region). Caught on run-the-first-experiment.md, whose body was
 * byte-identical to its pinned SHA while the scanner demanded three re-fires.
 *
 * The cost is not a wasted run; it is that a staleness signal which fires on
 * maintainer bookkeeping is one nobody keeps believing.
 */
test('changeTags: maintainer note whose hunk context reaches body → no body tags', () => {
  const diff = [
    '@@ -17,3 +17,5 @@ ctx',
    ' body line 17',
    ' body line 18',
    ' <!-- maintainer -->',
    '+**A maintainer note.**',
    '+',
    '',
  ].join('\n')
  const t = tagsFor(parseHunks(diff))
  assert.deepStrictEqual([...t].sort(), [],
    `a maintainer-only edit must not stale body classes, got ${JSON.stringify([...t])}`)
})

/* The other half: a real body edit inside the same hunk shape must still fire. */
test('changeTags: a real body line in the hunk still tags', () => {
  const diff = [
    '@@ -8,3 +8,3 @@ ctx',
    ' ctx line 8',
    '-old prose',
    '+new prose',
    ' ctx line 10',
    '',
  ].join('\n')
  const t = tagsFor(parseHunks(diff))
  assert(t.has('writing') && t.has('slides'),
    `a genuine body edit must still stale writing+slides, got ${JSON.stringify([...t])}`)
})

// --- typeOf: surface derivation drives instanceSlug ---
// Regression 2026-08-07: typeOf had only exercise/lecture cases and fell through
// to 'module' for everything else, so reference/ and supplementary/ files got
// instanceSlug `ae101--module--<slug>` while their instances are written as
// `ae101--reference--<slug>` / `ae101--supplementary--<slug>`. The scanner then
// found no pins and reported every class `never` on files that had just been
// judged clean — a silent "re-run everything" that looks identical to real
// staleness. Directory-derived, matching curriculum-pre-ship-audit's convention.
test('typeOf: exercise', () => {
  assert.strictEqual(typeOf('curriculum/exercises/audit-your-agent.md'), 'exercise')
})
test('typeOf: lecture', () => {
  assert.strictEqual(typeOf('curriculum/lectures/the-whole-map.md'), 'lecture')
})
test('typeOf: module', () => {
  assert.strictEqual(typeOf('curriculum/trainings/agentic-engineering-101/earn-the-trust.md'), 'module')
})
test('typeOf: reference is NOT module', () => {
  assert.strictEqual(typeOf('curriculum/trainings/agentic-engineering-101/reference/mcp-and-connectors.md'), 'reference')
})
test('typeOf: supplementary is NOT module', () => {
  assert.strictEqual(typeOf('curriculum/trainings/agentic-engineering-101/supplementary/token-efficiency.md'), 'supplementary')
})
test('typeOf: supplementary wins over the training dir it sits under', () => {
  // both substrings are present in the path; the more specific one must win
  const p = 'curriculum/trainings/agents-101/supplementary/what-is-an-agent.md'
  assert.strictEqual(typeOf(p), 'supplementary')
})
test('instanceSlug for a reference file targets the reference instance', () => {
  const rel = 'curriculum/trainings/agentic-engineering-101/reference/claude-code-for-engineers.md'
  assert.strictEqual(`ae101--${typeOf(rel)}--claude-code-for-engineers`,
    'ae101--reference--claude-code-for-engineers')
})


// --- trainingOf: instance prefix must follow the file's OWNING training -----
//
// Pins a bug found 2026-08-12 (AE101 changed-files re-eval): the instanceSlug
// prefix was hardcoded `ae101--`, so every shared-library file got an AE101
// instance regardless of who owns it. `curriculum/exercises/name-your-challenge.md`
// is linked only from `agents-101/building-agent-systems.md`, and the run wrote
// `ae101--exercise--name-your-challenge.*`. The strategy judge independently
// resolved the file to Agents 101 M2 and disagreed with its own filename.
//
// Files under curriculum/trainings/<t>/ carry the training in the path. Shared
// files (curriculum/exercises/, curriculum/lectures/) do NOT — ownership is
// whichever training's module files link them, so it has to be looked up.
// Ambiguous or unlinked => null, and the caller must warn rather than guess.

test('trainingOf: path-carried training wins (ae101)', () => {
  assert.equal(trainingOf('curriculum/trainings/agentic-engineering-101/getting-going.md'), 'ae101')
})

test('trainingOf: path-carried training wins (agents-101)', () => {
  assert.equal(trainingOf('curriculum/trainings/agents-101/building-agent-systems.md'), 'agents-101')
})

test('trainingOf: path-carried training wins (claude-basics)', () => {
  assert.equal(trainingOf('curriculum/trainings/claude-basics/security.md'), 'claude-basics')
})

test('trainingOf: shared exercise resolves to its single linking training', () => {
  const finder = () => ['agents-101']
  assert.equal(trainingOf('curriculum/exercises/name-your-challenge.md', finder), 'agents-101')
})

test('trainingOf: shared exercise linked only from AE101 resolves to ae101', () => {
  const finder = () => ['agentic-engineering-101']
  assert.equal(trainingOf('curriculum/exercises/compound-and-close.md', finder), 'ae101')
})

test('trainingOf: shared file linked from two trainings is ambiguous → null', () => {
  const finder = () => ['agents-101', 'agentic-engineering-101']
  assert.equal(trainingOf('curriculum/exercises/shared.md', finder), null)
})

test('trainingOf: shared file linked from nowhere → null, never a silent default', () => {
  const finder = () => []
  assert.equal(trainingOf('curriculum/exercises/orphan.md', finder), null)
})

test('trainingOf: duplicate linkers from one training still resolve', () => {
  const finder = () => ['agentic-engineering-101', 'agentic-engineering-101']
  assert.equal(trainingOf('curriculum/exercises/push-back-on-the-plan.md', finder), 'ae101')
})

console.log(`\n${n} tests passed`)
