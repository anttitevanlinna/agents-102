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
