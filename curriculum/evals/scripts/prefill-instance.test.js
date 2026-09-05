#!/usr/bin/env node
'use strict'
// prefill-instance.test.js — the splice, and the two ways it must refuse.
//
// Written because the bug it covers shipped in prose, not in code: the dispatch
// prompt and the class brief both told the judge its prefilled rows were
// "already in your instance", and nothing had ever written them there. The
// judge skipped the rules the brief had dropped, and the ledger lost them
// silently. A test that asserts the rows actually land is the forcing function
// the wording was standing in for.
const { test } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const { writeSidecar, mergeIntoInstance, sidecarPath } = require('./prefill-instance.js')
const { derive } = require('./derive-body-view.js')

const REPO = path.resolve(__dirname, '..', '..', '..')

function sandbox() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'prefill-test-'))
  const dirs = { viewsDir: path.join(root, 'views'), instancesDir: path.join(root, 'instances') }
  fs.mkdirSync(dirs.viewsDir, { recursive: true })
  fs.mkdirSync(dirs.instancesDir, { recursive: true })
  return { root, dirs }
}

// A real curriculum file, read only — the sidecar is written into the sandbox.
const FILE = 'curriculum/exercises/close-the-ticket.md'
const CLS = 'writing'
const slug = derive(FILE, { write: false }).slug
const sourceSha = derive(FILE, { write: false }).source_sha

function parkRows(dirs, rows, { sha = sourceSha } = {}) {
  fs.writeFileSync(sidecarPath(slug, CLS, dirs.viewsDir), JSON.stringify({
    file: FILE, slug, class: CLS, source_sha: sha, shape_hash: 'abc123', reason: 'ok', rows,
  }, null, 2))
}
const ROW = (comp, idx) => ({ compendium: comp, rule_index: idx, verdict: 'N/A', evidence: null, na_reason: 'no prompt blocks' })

test('parked rows land in the instance the judge wrote', () => {
  const { dirs } = sandbox()
  parkRows(dirs, [ROW('check_prompts.md', 4), ROW('check_prompts.md', 5)])
  const inst = path.join(dirs.instancesDir, `${slug}.${CLS}.json`)
  fs.writeFileSync(inst, JSON.stringify({ file: FILE, class: CLS, verdict: 'PASS', rules_evaluated: [ROW('check_writing.md', 1)] }, null, 2))

  const r = mergeIntoInstance(FILE, CLS, dirs)
  assert.equal(r.added, 2)
  assert.equal(r.rows_after, 3)
  const after = JSON.parse(fs.readFileSync(inst, 'utf8'))
  assert.deepEqual(after.rules_evaluated.map(x => `${x.compendium}|${x.rule_index}`).sort(),
    ['check_prompts.md|4', 'check_prompts.md|5', 'check_writing.md|1'])
})

test("a row the judge wrote itself wins — the judge read the body, the sidecar read a hash", () => {
  const { dirs } = sandbox()
  parkRows(dirs, [ROW('check_prompts.md', 4)])
  const inst = path.join(dirs.instancesDir, `${slug}.${CLS}.json`)
  const judged = { compendium: 'check_prompts.md', rule_index: 4, verdict: 'REVISE', evidence: 'line 12 …' }
  fs.writeFileSync(inst, JSON.stringify({ rules_evaluated: [judged] }, null, 2))

  const r = mergeIntoInstance(FILE, CLS, dirs)
  assert.equal(r.added, 0)
  assert.equal(r.already_present, 1)
  assert.equal(JSON.parse(fs.readFileSync(inst, 'utf8')).rules_evaluated[0].verdict, 'REVISE')
})

test('a sidecar built against a different body refuses to merge', () => {
  const { dirs } = sandbox()
  parkRows(dirs, [ROW('check_prompts.md', 4)], { sha: 'deadbeef' })
  fs.writeFileSync(path.join(dirs.instancesDir, `${slug}.${CLS}.json`), JSON.stringify({ rules_evaluated: [] }, null, 2))
  const r = mergeIntoInstance(FILE, CLS, dirs)
  assert.equal(r.added, 0)
  assert.match(r.status, /different body/)
})

test('merging before the judge writes says so instead of creating a stub verdict', () => {
  const { dirs } = sandbox()
  parkRows(dirs, [ROW('check_prompts.md', 4)])
  const r = mergeIntoInstance(FILE, CLS, dirs)
  assert.equal(r.added, 0)
  assert.match(r.status, /AFTER the judge writes/)
  assert.equal(fs.existsSync(path.join(dirs.instancesDir, `${slug}.${CLS}.json`)), false)
})

test('no sidecar is not an error — it means nothing was parked', () => {
  const { dirs } = sandbox()
  fs.writeFileSync(path.join(dirs.instancesDir, `${slug}.${CLS}.json`), JSON.stringify({ rules_evaluated: [] }, null, 2))
  const r = mergeIntoInstance(FILE, CLS, dirs)
  assert.equal(r.added, 0)
  assert.match(r.status, /no sidecar/)
})

test("the splice writes back the indent the instance already used, not its own", () => {
  const { dirs } = sandbox()
  parkRows(dirs, [ROW('check_prompts.md', 4)])
  const inst = path.join(dirs.instancesDir, `${slug}.${CLS}.json`)
  // Indent 2 is what the corpus uses. Re-serialising at another width turns a
  // one-row addition into a whole-file diff — 295 files, 134k insertions, and a
  // conflict on every future write in a tree with a live peer.
  fs.writeFileSync(inst, JSON.stringify({ rules_evaluated: [] }, null, 2))
  mergeIntoInstance(FILE, CLS, dirs)
  assert.match(fs.readFileSync(inst, 'utf8'), /^\{\n  "rules_evaluated"/)
})

test('writeSidecar parks rows outside the instance corpus, never in it', () => {
  const { dirs } = sandbox()
  const doc = writeSidecar(FILE, CLS, dirs)
  assert.equal(doc.slug, slug)
  assert.ok(fs.existsSync(sidecarPath(slug, CLS, dirs.viewsDir)))
  assert.equal(fs.readdirSync(dirs.instancesDir).length, 0)
  // Whatever the prefill decided, the sidecar is a claim about THIS body.
  assert.equal(doc.source_sha, sourceSha)
})

test('re-deriving the parked rows is reported, because nothing else shows it', () => {
  // The instance a judge leaves behind is byte-comparable whether it used the
  // parked rows or retyped them: same ledger, same verdict, same hash. On the
  // run that caught this, 75 of 77 parked rows were re-derived and every
  // downstream signal was clean — only the clock knew, at 416s against 99s.
  const { dirs } = sandbox()
  const parked = [ROW('check_prompts.md', 4), ROW('check_prompts.md', 5), ROW('check_prompts.md', 6)]
  parkRows(dirs, parked)
  const inst = path.join(dirs.instancesDir, `${slug}.${CLS}.json`)
  fs.writeFileSync(inst, JSON.stringify({ rules_evaluated: parked.slice(0, 2) }, null, 2))

  const r = mergeIntoInstance(FILE, CLS, dirs)
  assert.equal(r.added, 1)
  assert.equal(r.already_present, 2)
  assert.match(r.warning, /2 of 3 parked rows were re-derived/)
})

test('a healthy merge carries no warning', () => {
  const { dirs } = sandbox()
  parkRows(dirs, [ROW('check_prompts.md', 4), ROW('check_prompts.md', 5)])
  fs.writeFileSync(path.join(dirs.instancesDir, `${slug}.${CLS}.json`),
    JSON.stringify({ rules_evaluated: [ROW('check_writing.md', 1)] }, null, 2))
  const r = mergeIntoInstance(FILE, CLS, dirs)
  assert.equal(r.added, 2)
  assert.equal(r.warning, undefined)
})

test('the shape hash is stamped even when nothing was parked — otherwise a cold class stays cold', () => {
  // The loop: no shape_hash → prefill reports "predates shape_hash" → parks
  // nothing → if the write were gated on added rows, the hash is never
  // recorded → the next run falls through identically. Forever.
  const { dirs } = sandbox()
  parkRows(dirs, [])
  const inst = path.join(dirs.instancesDir, `${slug}.${CLS}.json`)
  fs.writeFileSync(inst, JSON.stringify({ rules_evaluated: [ROW('check_writing.md', 1)] }, null, 2))

  const r = mergeIntoInstance(FILE, CLS, dirs)
  assert.equal(r.added, 0)
  assert.equal(r.shape_hash_stamped, 'abc123')
  assert.equal(JSON.parse(fs.readFileSync(inst, 'utf8')).shape_hash, 'abc123')
})

// The two 2026-08-28 splice incidents: check_writing rows surfacing in a story
// sidecar and a slides sidecar. The carry loop took every N/A in the prior
// instance regardless of whose lane it was in, and the mechanical loop parked
// writing greps into every class. Out-of-lane rows outrank nothing and
// contradict the instance that owns them.
test('carried N/A rows keep na_reason and stay in class lanes', () => {
  const { dirs } = sandbox()
  const shape = writeSidecar(FILE, CLS, dirs).shape_hash // discover the current shape
  fs.writeFileSync(path.join(dirs.instancesDir, `${slug}.${CLS}.json`), JSON.stringify({
    file: FILE, class: CLS, body_sha: 'x', shape_hash: shape,
    rules_evaluated: [
      { compendium: 'check_prompts.md', rule_index: 4, verdict: 'N/A', evidence: null, na_reason: 'no prompt blocks' },
      { compendium: 'check_slides.md', rule_index: 2, verdict: 'N/A', evidence: null, na_reason: 'out of lane here' },
    ],
  }, null, 2))
  const doc = writeSidecar(FILE, CLS, dirs)
  const carried = doc.rows.filter(r => r.verdict === 'N/A')
  assert.equal(carried.length, 1)
  assert.equal(carried[0].compendium, 'check_prompts.md')
  // A deliberate N/A stripped of its reason reads later as an unjudged hole —
  // the exact 45-hole misreport the backfill hold documents.
  assert.equal(carried[0].na_reason, 'no prompt blocks')
})

test('mechanical writing greps do not park into a class that does not judge check_writing', () => {
  const { dirs } = sandbox()
  // A valid prior is what lets prefill reach the mechanical loop at all —
  // without one it returns early and this test would pass on any code.
  const shape = writeSidecar(FILE, 'slides', dirs).shape_hash
  fs.writeFileSync(path.join(dirs.instancesDir, `${slug}.slides.json`), JSON.stringify({
    file: FILE, class: 'slides', body_sha: 'x', shape_hash: shape,
    rules_evaluated: [{ compendium: 'check_slides.md', rule_index: 1, verdict: 'N/A', evidence: null, na_reason: 'n' }],
  }, null, 2))
  const doc = writeSidecar(FILE, 'slides', dirs)
  assert.ok(doc.rows.length >= 1)
  assert.equal(doc.rows.filter(r => r.compendium === 'check_writing.md').length, 0)
})

test('a shape hash that already matches is not rewritten', () => {
  const { dirs } = sandbox()
  parkRows(dirs, [])
  const inst = path.join(dirs.instancesDir, `${slug}.${CLS}.json`)
  fs.writeFileSync(inst, JSON.stringify({ shape_hash: 'abc123', rules_evaluated: [] }, null, 2))
  const before = fs.statSync(inst).mtimeMs
  const r = mergeIntoInstance(FILE, CLS, dirs)
  assert.equal(r.shape_hash_stamped, null)
  assert.equal(fs.statSync(inst).mtimeMs, before)
})

test('a prior N/A with neither evidence nor na_reason is refused, not carried — it falls through to the judge', () => {
  const { dirs } = sandbox()
  const shape = writeSidecar(FILE, CLS, dirs).shape_hash
  fs.writeFileSync(path.join(dirs.instancesDir, `${slug}.${CLS}.json`), JSON.stringify({
    file: FILE, class: CLS, body_sha: 'x', shape_hash: shape,
    rules_evaluated: [
      { compendium: 'check_prompts.md', rule_index: 4, verdict: 'N/A', evidence: null, na_reason: 'no prompt blocks' },
      { compendium: 'check_prompts.md', rule_index: 5, verdict: 'N/A', evidence: null, na_reason: null },
      { compendium: 'check_prompts.md', rule_index: 6, verdict: 'N/A', evidence: '   ', na_reason: '' },
    ],
  }, null, 2))
  const doc = writeSidecar(FILE, CLS, dirs)
  const carried = doc.rows.filter(r => r.verdict === 'N/A')
  // The contract above the prefill says an unproven row falls through; a row
  // with no reason recorded is unproven, and carrying it bills the judge for
  // an emptiness it was told not to re-derive.
  assert.deepEqual(carried.map(r => r.rule_index), [4])
  assert.equal(doc.ungrounded_refused, 2)
})
