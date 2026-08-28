#!/usr/bin/env node
'use strict'
// check-instance-evidence.test.js — the guard's two blind spots, pinned.
//
// Both are check_platform_and_boundaries §45: a reader narrower than the corpus
// reports compliance as rot, and — worse — reports what it cannot read as clean.
const { test } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const { auditInstance } = require('./check-instance-evidence.js')

function tmp(obj) {
  const d = fs.mkdtempSync(path.join(os.tmpdir(), 'evidence-'))
  const p = path.join(d, 'x.writing.json')
  fs.writeFileSync(p, JSON.stringify(obj, null, 2))
  return p
}

test('a terse N/A with a reason is healthy and is not counted', () => {
  const a = auditInstance(tmp({ rules_evaluated: [
    { compendium: 'check_writing.md', rule_index: 4, verdict: 'N/A', evidence: null, na_reason: 'no prompt blocks' },
  ] }))
  assert.equal(a.ungrounded_count, 0)
  assert.equal(a.na_rows_null_evidence, 1)
})

test('a PASS with nothing behind it is the 2026-08-15 signature and is gated', () => {
  const a = auditInstance(tmp({ rules_evaluated: [
    { compendium: 'check_writing.md', rule_index: 1, verdict: 'PASS', evidence: null },
  ] }))
  assert.equal(a.ungrounded_count, 1)
  assert.equal(a.misfiled_count, 0)
})

test('reasoning parked in fix_hint is MISFILED, not ungrounded', () => {
  // 2,183 rows corpus-wide carried the judge's actual reasoning here — "No
  // cloud/remote feature discussed", "File uses only Claude Code, no Cowork
  // feature claimed". The wrong field for it, and nonsense on an N/A row, but
  // the verdict is grounded. Conflating a naming slip with a skim makes the
  // number mean nothing, which is how the last guard died.
  const a = auditInstance(tmp({ rules_evaluated: [
    { compendium: 'check_platform_and_boundaries.md', rule_index: 2, verdict: 'N/A', evidence: null, fix_hint: 'No cloud/remote feature discussed.' },
    { compendium: 'check_platform_and_boundaries.md', rule_index: 1, verdict: 'PASS', evidence: null, fix_hint: 'File uses only Claude Code.' },
  ] }))
  assert.equal(a.ungrounded_count, 0)
  assert.equal(a.misfiled_count, 2)
  assert.equal(a.misfiled[0].found_in, 'fix_hint')
})

test("the behavior class's prompt-keyed ledger is audited, not silently skipped", () => {
  // The old reader did `Array.isArray(re) ? ... : []` — eleven behavior
  // instances passed the guard while carrying a ledger it could not read. A
  // guard that fails OPEN on an unknown shape is worse than no guard: it
  // reports the silence as a pass.
  const a = auditInstance(tmp({ rules_evaluated: {
    prompt_1: [
      { pattern_id: 'reading-burden', status: 'not-applicable', evidence: 'Claude reports ticket fields.' },
      { pattern_id: 'file-preservation-gap', status: 'clean', reason: 'no ambiguous boundary' },
      { pattern_id: 'silent-truncation', status: 'clean' },
    ],
  } }))
  assert.match(a.shape, /behavior class/)
  assert.equal(a.rows, 3)
  assert.equal(a.ungrounded_count, 1)
  assert.match(a.ungrounded[0].at, /prompt_1 · silent-truncation/)
})

test('a ledger that is neither shape is reported, never treated as empty', () => {
  const a = auditInstance(tmp({ rules_evaluated: 'check_writing.md §1 PASS' }))
  assert.equal(a.ungrounded_count, 1)
  assert.match(a.ungrounded[0].why, /unreadable ledger/)
})

test('a row returned as a string credits no rule and is named', () => {
  const a = auditInstance(tmp({ rules_evaluated: ['check_writing.md § 1', { compendium: 'check_writing.md', rule_index: 1, verdict: 'PASS', evidence: 'grep -c → 0' }] }))
  assert.equal(a.ungrounded_count, 1)
  assert.match(a.ungrounded[0].why, /not objects/)
})

test('a finding without a quote or a harm is ungrounded whatever else it carries', () => {
  const a = auditInstance(tmp({ rules_evaluated: [], findings: [{ rule: 'check_writing.md §1', quote: 'x' }] }))
  assert.equal(a.ungrounded_count, 1)
  assert.match(a.ungrounded[0].why, /missing quote or harm/)
})
