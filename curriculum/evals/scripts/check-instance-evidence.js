#!/usr/bin/env node
// check-instance-evidence.js — the ungrounded-verdict guard, computed correctly.
//
// The guard exists because of 2026-08-15: one writing sweep returned 13 files
// PASS, 702 rule verdicts, `evidence: null` on all 702, in 7 tool calls, and the
// summary table was indistinguishable from a real clean sweep. The counter-
// measure was to have each judge run `grep -c '"evidence": *null'` on the
// instance it wrote and report the integer.
//
// That command stopped meaning what it was written to mean. Under the lean
// evidence mode an N/A row carries `evidence: null` BY DESIGN — the judge is
// told to spend its prose on findings and judgement PASSes, not on restating
// why a sales-copy rule does not apply to an exercise. So the raw grep now
// counts dozens of rows that are correct, one judge reported 67, and a number
// that used to mean "this judge skimmed" now means nothing at all. A guard that
// cries wolf on healthy output is a guard nobody reads.
//
// What was ever actually ungrounded is narrower and is what this computes:
//   - a FINDING with no evidence            — a blocking claim with nothing behind it
//   - a REVISE row with no evidence         — same, at rule scope
//   - a judgement PASS with no evidence     — the 2026-08-15 failure exactly
//   - an N/A row with no reason at all      — allowed to be terse, not empty
//
// An N/A row with a one-clause `na_reason` and null `evidence` is healthy and
// is not counted. Exit 1 if anything ungrounded is found, so this can sit in a
// gate rather than in a judge's self-report — the lesson of
// compounded/2026-08-08 being that a check the checked party runs on itself is
// not a check.
//
// Usage:
//   node curriculum/evals/scripts/check-instance-evidence.js <instance.json>...
//   node curriculum/evals/scripts/check-instance-evidence.js --all [--quiet]
'use strict'
const fs = require('node:fs')
const path = require('node:path')

const REPO = path.resolve(__dirname, '..', '..', '..')
const INSTANCES = path.join(REPO, 'curriculum', 'evals', 'instances')

const has = v => typeof v === 'string' && v.trim().length > 0

function auditInstance(p) {
  let d
  try { d = JSON.parse(fs.readFileSync(p, 'utf8')) } catch (e) { return { file: p, unparseable: e.message } }
  const rows = Array.isArray(d.rules_evaluated) ? d.rules_evaluated.filter(r => r && typeof r === 'object') : []

  const ungrounded = []
  for (const r of rows) {
    const at = `${r.compendium || '?'} §${r.rule_index ?? '?'}`
    if (r.verdict === 'REVISE' && !has(r.evidence)) ungrounded.push({ at, why: 'REVISE with no evidence' })
    else if (r.verdict === 'PASS' && !has(r.evidence)) ungrounded.push({ at, why: 'PASS with no evidence' })
    else if (r.verdict === 'N/A' && !has(r.evidence) && !has(r.na_reason)) ungrounded.push({ at, why: 'N/A with no reason' })
  }
  for (const f of (d.findings || [])) {
    if (!has(f.harm) || !has(f.quote)) ungrounded.push({ at: `finding ${f.rule || '?'}`, why: 'finding missing quote or harm' })
  }

  // Reported for context, never gated: this is the healthy population the old
  // grep was conflating with the sick one.
  const naNullEvidence = rows.filter(r => r.verdict === 'N/A' && !has(r.evidence)).length

  return {
    file: path.relative(REPO, p),
    rows: rows.length,
    na_rows_null_evidence: naNullEvidence,
    ungrounded_count: ungrounded.length,
    ungrounded,
  }
}

module.exports = { auditInstance }

if (require.main === module) {
  const argv = process.argv.slice(2)
  const quiet = argv.includes('--quiet')
  let files = argv.filter(a => !a.startsWith('--'))
  if (argv.includes('--all')) {
    files = fs.readdirSync(INSTANCES).filter(f => f.endsWith('.json')).map(f => path.join(INSTANCES, f))
  }
  if (!files.length) {
    console.error('usage: check-instance-evidence.js <instance.json>... | --all [--quiet]')
    process.exit(1)
  }

  let bad = 0, unparseable = 0
  for (const f of files) {
    const a = auditInstance(path.isAbsolute(f) ? f : path.join(REPO, f))
    if (a.unparseable) { unparseable++; console.error(`UNPARSEABLE ${a.file}: ${a.unparseable}`); continue }
    if (a.ungrounded_count) {
      bad++
      console.error(`${a.file}: ${a.ungrounded_count} ungrounded of ${a.rows} rows`)
      for (const u of a.ungrounded.slice(0, 6)) console.error(`    ${u.at} — ${u.why}`)
      if (a.ungrounded.length > 6) console.error(`    … and ${a.ungrounded.length - 6} more`)
    } else if (!quiet) {
      console.log(`${a.file}: clean (${a.rows} rows, ${a.na_rows_null_evidence} terse N/A — healthy)`)
    }
  }
  if (bad || unparseable) {
    console.error(`\n${bad} instance(s) carry an ungrounded verdict; ${unparseable} unparseable`)
    process.exit(1)
  }
  if (!quiet) console.log(`\n${files.length} instance(s) checked, none ungrounded`)
}
