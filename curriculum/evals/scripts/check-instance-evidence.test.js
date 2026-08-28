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

test("the behavior class owes no rule ledger, and is audited on its own terms", () => {
  // Its template records only the risks that FIRED — a deliberate fires-only
  // ledger — plus a count. Demanding rules_evaluated of it is a false positive,
  // and the third time this script assumed one shape fits every class.
  const a = auditInstance(tmp({
    class: 'behavior',
    prompts_evaluated: 2,
    prompts_findings: [
      { prompt_index: 1, verdict: 'PASS', risks_fired: [] },
      { prompt_index: 2, verdict: 'REVISE', risks_fired: [{ pattern_id: 'niceness-tax', evidence: 'L65 asks for a self-grade' }] },
    ],
  }))
  assert.match(a.shape, /behavior class/)
  assert.equal(a.ungrounded_count, 0)
  assert.equal(a.rows, 1)
})

test('a fired risk with no evidence is ungrounded, same as any other verdict', () => {
  const a = auditInstance(tmp({
    prompts_evaluated: 1,
    prompts_findings: [{ prompt_index: 1, verdict: 'REVISE', risks_fired: [{ pattern_id: 'niceness-tax' }] }],
  }))
  assert.equal(a.ungrounded_count, 1)
  assert.match(a.ungrounded[0].why, /fired risk with no evidence/)
})

test('a behavior instance with no count means nobody said how many prompts were read', () => {
  const a = auditInstance(tmp({ prompts_findings: [] }))
  assert.equal(a.ungrounded_count, 1)
  assert.match(a.ungrounded[0].why, /no `prompts_evaluated` count/)
})

test("cross_module rows live one level down, under each adjacent pair", () => {
  const a = auditInstance(tmp({
    class: 'cross_module',
    module_pairs_evaluated: [
      { from: 'a.md', to: 'b.md', rules_evaluated: [{ compendium: 'check_cross_module.md', rule_index: 1, verdict: 'PASS', evidence: 'L12 names the gap' }] },
      { from: 'b.md', to: 'c.md' },
    ],
  }))
  assert.match(a.shape, /cross_module/)
  assert.equal(a.rows, 1)
  assert.equal(a.ungrounded_count, 1)
  assert.match(a.ungrounded[0].why, /carries no rules_evaluated array/)
})

test('a class that owes a ledger and wrote none never reads as clean', () => {
  // The false negative is the worse of the two: an instance with no rows used
  // to print "clean (0 rows)" and pass every gate.
  const a = auditInstance(tmp({ class: 'writing', verdict: 'PASS' }))
  assert.equal(a.ungrounded_count, 1)
  assert.equal(a.shape, 'NO LEDGER FOUND')
})
