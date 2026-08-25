#!/usr/bin/env node
// Tests for derive-body-view.js + prefill-instance.js.
//
// The asymmetry that shapes every case: carrying a row forward that is no longer
// true fabricates coverage, while failing to carry one costs only tokens. So
// every uncertain fork must fall through to the judge, and the tests assert the
// fall-through, not just the happy path.
'use strict'
const { test } = require('node:test')
const assert = require('node:assert/strict')
const { geometry, greps, ruleInventory } = require('./derive-body-view.js')
const { shapeHash } = require('./prefill-instance.js')

const BODY = [
  '# A module',                    // 1
  '',                              // 2
  'A student reads this — line.',  // 3
  '',                              // 4
  '```bash',                       // 5
  'echo "crucially we delve"',     // 6
  '```',                           // 7
  '',                              // 8
  'More body prose.',              // 9
  '',                              // 10
  '<!-- maintainer -->',           // 11
  '',                              // 12
  '2026-08-01 accept: ritual is fine here.', // 13
].join('\n')

test('geometry locates cut, fences and body region against RAW line numbers', () => {
  const g = geometry(BODY)
  assert.equal(g.maintainerCut, 11)
  assert.deepEqual(g.fences, [[5, 7]])
  assert.deepEqual(g.bodyLines, [1, 2, 3, 4, 8, 9, 10])
  assert.deepEqual(g.regions, [[1, 4], [8, 10]])
})

test('an unclosed fence swallows the tail rather than leaking it as prose', () => {
  const g = geometry('# T\n\n```\nnever closed\n')
  // Treating an unterminated fence as prose would flag every line of a code
  // tail; the honest reading is that the rest of the file is code.
  assert.equal(g.fences.length, 1)
  assert.equal(g.fences[0][0], 3)
  assert.ok(!g.bodyLines.includes(4))
})

test('no maintainer cut means the whole file is body', () => {
  const g = geometry('# T\n\nJust prose.\n')
  assert.equal(g.maintainerCut, null)
  assert.ok(g.bodyLines.includes(3))
})

test('fence content is excluded from the greps the judge is told to trust', () => {
  const g = geometry(BODY)
  const bodyText = g.bodyLines.map(n => g.lines[n - 1]).join('\n')
  const out = greps(bodyText)
  // "crucially we delve" lives at line 6, inside the fence. A judge citing it
  // would be filing against code, which is exempt.
  assert.equal(out.banned_words.body_hits, 0)
  assert.equal(out.banned_words.status, 'CLEAN')
  // The em-dash on line 3 IS body and must be seen.
  assert.equal(out.em_dash.body_hits, 1)
  assert.equal(out.em_dash.status, 'HITS')
})

test('every grep proves itself against a planted violation', () => {
  // A pattern that matches nothing matches a clean file too. An unproven zero
  // is the silent PASS the whole evidence contract exists to prevent, so a
  // pattern that cannot prove itself must never report CLEAN.
  const out = greps('nothing here at all')
  for (const [name, g] of Object.entries(out)) {
    assert.equal(g.planted_proof, true, `${name} failed its planted-string proof`)
    assert.notEqual(g.status, 'UNPROVEN', `${name} is UNPROVEN`)
  }
})

test('maintainer-block accept-notes are extracted, body dates are not', () => {
  const { derive } = require('./derive-body-view.js')
  const fs = require('node:fs'), os = require('node:os'), path = require('node:path')
  const d = fs.mkdtempSync(path.join(os.tmpdir(), 'bv-'))
  const f = path.join(d, 'x.md')
  fs.writeFileSync(f, BODY)
  const v = derive(f, { write: false })
  assert.equal(v.accept_notes.length, 1)
  assert.match(v.accept_notes[0], /L13/)
})

test('shape hash ignores prose and tracks structure', () => {
  const base = {
    has_prompt_blocks: false, has_figures: false, has_backing_block: false,
    has_maintainer_block: true, has_urls: false, has_source_stamps: false,
    has_code_fences: true, group_beat_markers: false, slide_count: 7,
  }
  const reworded = { ...base }                      // same shape, different prose
  const restructured = { ...base, has_urls: true }  // a citations rule can now fire
  assert.equal(shapeHash(base), shapeHash(reworded))
  assert.notEqual(shapeHash(base), shapeHash(restructured))
  // Slide count is bucketed: one added `##` must not invalidate every N/A.
  assert.equal(shapeHash(base), shapeHash({ ...base, slide_count: 9 }))
  assert.notEqual(shapeHash(base), shapeHash({ ...base, slide_count: 40 }))
})

test('rule inventory counts numbered rules and excludes moved stubs', () => {
  // Guards the completeness count the judge is told to stop deriving by hand.
  const inv = ruleInventory(['check_writing'])
  const w = inv['check_writing.md']
  assert.ok(w.owed > 0, 'no rules parsed — the completeness count would be wrong')
  assert.ok(Array.isArray(w.moved_stubs))
  assert.equal(new Set(w.indices).size, w.indices.length, 'duplicate rule index')
})
