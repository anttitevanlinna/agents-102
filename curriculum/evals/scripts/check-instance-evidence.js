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
// Two corrections, 2026-08-28, both of them check_platform_and_boundaries §45 —
// the reader was narrower than the corpus, and reported compliance as rot:
//
//   MISFILED, not ungrounded. Of 3,748 rows this flagged across the corpus,
//   2,183 carried the judge's actual reasoning in `fix_hint` ("No cloud/remote
//   feature discussed", "File uses only Claude Code, no Cowork feature
//   claimed"). Semantically the wrong home — a fix hint on an N/A row is
//   nonsense — but the verdict IS grounded, and calling it ungrounded conflates
//   a field-naming slip with the 2026-08-15 skim. Different defects, different
//   remedies: one is a migration, the other is a re-judge. Reported separately,
//   and only the empty ones exit 1.
//
//   The `behavior` class does not have a rule ledger. Its instances key
//   `rules_evaluated` by prompt (`{prompt_1: [{pattern_id, status, evidence}]}`)
//   because it judges prompt behaviour patterns, not compendium rules. The old
//   `Array.isArray(...) ? ... : []` read that as zero rows and printed "clean" —
//   eleven instances passing the guard while carrying a ledger it could not
//   read. A guard that fails OPEN on a shape it does not know is worse than no
//   guard, because it reports the silence as a pass.
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

  const ungrounded = []
  const misfiled = []
  let rows = 0
  let naNullEvidence = 0
  let shape = 'rule-ledger'

  // Classes do not agree on where the ledger lives, and a guard that knows only
  // one name passes every instance written by the others. cross_module nests its
  // rows one per adjacent pair under `module_pairs_evaluated[].rules_evaluated`;
  // the current behavior shape records `prompts_evaluated` as a COUNT and keeps
  // its detail in `prompts_findings`, while older behavior instances key
  // `rules_evaluated` by prompt. Reading only the top-level array reported all
  // of them as clean with zero rows — which is the failure this guard exists to
  // catch, committed by the guard itself.
  let re = d.rules_evaluated

  // The behavior class owes no rule ledger AT ALL, and demanding one is the
  // third time this script has assumed a single shape. Its template records
  // `prompts_findings[].risks_fired[]` — only the patterns that FIRED, a
  // deliberate fires-only ledger — plus `prompts_evaluated` as a count. So audit
  // it on its own terms: every fired risk owes evidence. What must never happen
  // is the two failure modes meeting in the middle: demanding a ledger from a
  // class that has none (false positive), or passing a class that owes one and
  // wrote none (false negative, and the worse of the two).
  if (re === undefined && Array.isArray(d.prompts_findings)) {
    shape = 'fired-risk ledger (behavior class)'
    for (const pf of d.prompts_findings) {
      if (!pf || typeof pf !== 'object') { ungrounded.push({ at: 'prompts_findings', why: 'entry is not an object' }); continue }
      const where = `prompt ${pf.prompt_index ?? '?'}`
      if (!has(pf.verdict)) ungrounded.push({ at: where, why: 'prompt carries no verdict' })
      for (const r of (Array.isArray(pf.risks_fired) ? pf.risks_fired : [])) {
        rows++
        if (!has(r.evidence)) ungrounded.push({ at: `${where} · ${r.pattern_id || '?'}`, why: 'fired risk with no evidence' })
      }
    }
    // A count with no findings is the shape's legitimate clean result: no risk
    // fired anywhere. Only an absent count means nobody looked.
    if (!Number.isInteger(d.prompts_evaluated)) {
      ungrounded.push({ at: 'instance', why: 'no `prompts_evaluated` count — nothing says how many prompts were read' })
    }
    return report()
  }

  if (re === undefined && Array.isArray(d.module_pairs_evaluated)) {
    shape = 'per-pair ledger (cross_module class)'
    re = d.module_pairs_evaluated.flatMap(pair => {
      const inner = pair && pair.rules_evaluated
      if (Array.isArray(inner)) return inner
      ungrounded.push({ at: `${(pair && pair.from) || '?'} → ${(pair && pair.to) || '?'}`, why: 'pair carries no rules_evaluated array' })
      return []
    })
  }

  if (Array.isArray(re)) {
    const objs = re.filter(r => r && typeof r === 'object')
    rows = objs.length
    // A row returned as a string carries no field the coverage model can read.
    // It is not a verdict; say so rather than skipping it.
    const strays = re.length - objs.length
    if (strays) ungrounded.push({ at: 'rules_evaluated', why: `${strays} row(s) are not objects — they credit no rule and cannot be read` })
    for (const r of objs) {
      const at = `${r.compendium || '?'} §${r.rule_index ?? '?'}`
      if (r.verdict === 'N/A' && !has(r.evidence)) naNullEvidence++
      if (r.verdict === 'REVISE' && !has(r.evidence)) push(r, at, 'REVISE with no evidence')
      else if (r.verdict === 'PASS' && !has(r.evidence)) push(r, at, 'PASS with no evidence')
      else if (r.verdict === 'N/A' && !has(r.evidence) && !has(r.na_reason)) push(r, at, 'N/A with no reason')
    }
  } else if (re && typeof re === 'object') {
    // The behavior class: keyed by prompt, each value a list of pattern rows.
    shape = 'prompt-pattern ledger (behavior class)'
    for (const [key, list] of Object.entries(re)) {
      if (!Array.isArray(list)) { ungrounded.push({ at: key, why: `expected a list of pattern rows, got ${typeof list}` }); continue }
      for (const r of list) {
        if (!r || typeof r !== 'object') { ungrounded.push({ at: key, why: 'pattern row is not an object' }); continue }
        rows++
        const at = `${key} · ${r.pattern_id || '?'}`
        // `reason` is this shape's own word for the same thing; both count.
        if (!has(r.evidence) && !has(r.reason)) push(r, at, `${r.status || 'row'} with no evidence`)
      }
    }
  } else if (re !== undefined) {
    ungrounded.push({ at: 'rules_evaluated', why: `unreadable ledger: expected an array or a prompt-keyed object, got ${typeof re}` })
  } else {
    // No ledger under any name this guard knows. Never "clean": an instance
    // with no rows is either a judge that wrote none or a shape nobody taught
    // this script, and both need a person, not a pass.
    shape = 'NO LEDGER FOUND'
    const counts = ['prompts_evaluated', 'module_pairs_evaluated', 'rules_evaluated']
      .filter(k => d[k] !== undefined).map(k => `${k}=${JSON.stringify(d[k]).slice(0, 40)}`)
    ungrounded.push({
      at: 'instance',
      why: `no per-rule ledger found${counts.length ? ` (only ${counts.join(', ')} — a count is not a ledger)` : ''}`,
    })
  }

  function push(r, at, why) {
    // The reasoning exists, in a field that was never meant to hold it. Report
    // it as a naming defect, not as a judge that did not look.
    if (has(r.fix_hint)) misfiled.push({ at, why, found_in: 'fix_hint' })
    else ungrounded.push({ at, why })
  }

  for (const f of (d.findings || [])) {
    if (!has(f.harm) || !has(f.quote)) ungrounded.push({ at: `finding ${f.rule || '?'}`, why: 'finding missing quote or harm' })
  }

  return report()

  function report() {
    return {
      file: path.relative(REPO, p),
      shape,
      rows,
      na_rows_null_evidence: naNullEvidence,
      ungrounded_count: ungrounded.length,
      misfiled_count: misfiled.length,
      ungrounded,
      misfiled,
    }
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

  let bad = 0, unparseable = 0, misfiledFiles = 0
  for (const f of files) {
    const a = auditInstance(path.isAbsolute(f) ? f : path.join(REPO, f))
    if (a.unparseable) { unparseable++; console.error(`UNPARSEABLE ${a.file}: ${a.unparseable}`); continue }
    if (a.misfiled_count) misfiledFiles++
    if (a.ungrounded_count) {
      bad++
      console.error(`${a.file}: ${a.ungrounded_count} ungrounded of ${a.rows} rows`)
      for (const u of a.ungrounded.slice(0, 6)) console.error(`    ${u.at} — ${u.why}`)
      if (a.ungrounded.length > 6) console.error(`    … and ${a.ungrounded.length - 6} more`)
    } else if (!quiet) {
      const mis = a.misfiled_count ? `, ${a.misfiled_count} grounded in fix_hint instead of evidence` : ''
      console.log(`${a.file}: clean (${a.rows} rows, ${a.na_rows_null_evidence} terse N/A — healthy${mis})`)
    }
  }
  if (bad || unparseable) {
    console.error(`\n${bad} instance(s) carry an ungrounded verdict; ${unparseable} unparseable`)
    if (misfiledFiles) console.error(`${misfiledFiles} instance(s) also carry rows grounded in fix_hint — a naming defect, not a skim; not gated`)
    process.exit(1)
  }
  if (!quiet) console.log(`\n${files.length} instance(s) checked, none ungrounded${misfiledFiles ? ` (${misfiledFiles} carry rows grounded in fix_hint — a naming defect, not a skim)` : ''}`)
}
