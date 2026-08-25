#!/usr/bin/env node
// prefill-instance.js — resolve the rule rows a model does not need to think about.
//
// The regression this exists to undo, measured off the instances themselves
// (average `rules_evaluated` rows per instance, by the month the judge ran):
//
//              writing  pedagogy  technical  story  slides
//   2026-05        24       31         14      15      -
//   2026-08        68       74        100      16     15
//
// Nobody made the judges slower. The rulebook grew 3–7×, and the completeness
// contract ("one verdict per rule, no omission") converts every added rule into
// a mandatory paragraph of generated prose — whether or not the rule can fire on
// this surface. Two thirds of those paragraphs say N/A. `story` is the control
// group: it never adopted the contract and it never regressed.
//
// The contract is right — a coverage ledger with holes is how a skim passed for
// a sweep on 2026-08-15. What is wrong is WHO fills it in. N/A-ness is a
// property of the file's SHAPE (does it contain prompts, URLs, a group beat, a
// sales surface), not of its prose. Shape changes on a restructure, not on a
// reworded sentence. So a row marked N/A against an unchanged shape is still
// N/A, and regenerating it with a language model is paying an LLM to retype a
// constant.
//
// This carries those rows forward from the prior instance, gated on a shape
// hash, and pre-resolves the purely mechanical rules from proven greps. The
// judge is then handed only the rows that need judgement. The ledger the
// auditor reads is complete either way.
//
// Fails closed at every fork: no prior instance, an unreadable one, a changed
// shape, or a grep whose planted-string proof failed → the row goes back to the
// judge. A carried row is never a finding — only PASS or N/A carries forward,
// never REVISE, because a REVISE is a claim about prose and prose is exactly
// what changed.
//
// Usage:
//   node curriculum/evals/scripts/prefill-instance.js <file.md> <class>
//   node curriculum/evals/scripts/prefill-instance.js <file.md> <class> --json
'use strict'
const crypto = require('node:crypto')
const fs = require('node:fs')
const path = require('node:path')
const { derive, COMPENDIA } = require('./derive-body-view.js')

const REPO = path.resolve(__dirname, '..', '..', '..')
const INSTANCES = path.join(REPO, 'curriculum', 'evals', 'instances')

// The shape hash. Deliberately excludes anything prose-valued: two bodies with
// the same structural inventory have the same set of inapplicable rules, however
// differently they read.
const SHAPE_KEYS = [
  'has_prompt_blocks', 'has_figures', 'has_backing_block', 'has_maintainer_block',
  'has_urls', 'has_source_stamps', 'has_code_fences', 'group_beat_markers',
]
function shapeHash(signals) {
  const shape = {}
  for (const k of SHAPE_KEYS) shape[k] = signals[k]
  // Slide count is structural, but a single added `##` should not invalidate
  // every N/A on the file, so it is bucketed rather than exact.
  shape.slide_bucket = Math.floor((signals.slide_count || 0) / 5)
  return crypto.createHash('sha256').update(JSON.stringify(shape)).digest('hex').slice(0, 16)
}

// Mechanical rules: fully decided by a grep whose pattern carries a planted
// proof. A grep that did not prove itself decides nothing — `status: UNPROVEN`
// sends the row back to the judge rather than reporting a clean zero.
const MECHANICAL = {
  'check_writing.md': {
    1: { grep: 'banned_words', lead: 'Banned words — grep zero-tolerance.' },
    2: { grep: 'ritual_ceremony', lead: 'Ritual / ceremony — hard ban in any curriculum/training surface.' },
  },
}

function prefill(fileArg, cls) {
  const view = derive(fileArg, { write: true })
  const shape = shapeHash(view.signals)
  const instPath = path.join(INSTANCES, `${view.slug}.${cls}.json`)

  const out = {
    file: view.file, slug: view.slug, class: cls,
    source_sha: view.source_sha, shape_hash: shape,
    carried: [], mechanical: [], owed_to_judge: null,
    reason: null,
  }

  let prior = null
  try { prior = JSON.parse(fs.readFileSync(instPath, 'utf8')) } catch { /* fail closed below */ }

  if (!prior || !Array.isArray(prior.rules_evaluated)) {
    out.reason = prior ? 'prior instance has no rules_evaluated array' : 'no prior instance'
    return { view, out }
  }
  if (prior.shape_hash && prior.shape_hash !== shape) {
    out.reason = `shape changed (${prior.shape_hash} → ${shape}) — every N/A re-owed`
    return { view, out }
  }
  if (!prior.shape_hash) {
    // A pre-migration instance never recorded the shape it was judged against,
    // so there is nothing to compare and no basis for trusting its N/As.
    out.reason = 'prior instance predates shape_hash — cannot verify N/A validity'
    return { view, out }
  }

  for (const row of prior.rules_evaluated) {
    if (!row || typeof row !== 'object') continue
    if (row.verdict !== 'N/A') continue          // PASS is a claim about prose; only N/A is about shape
    if (row.rule_index === null || row.rule_index === undefined) continue
    out.carried.push({
      compendium: row.compendium, rule_index: row.rule_index, rule_lead: row.rule_lead,
      verdict: 'N/A', evidence: row.evidence, fix_hint: '', blocking: false,
      carried_from: prior.body_sha || null, carried_shape: shape,
    })
  }

  for (const [comp, rules] of Object.entries(MECHANICAL)) {
    for (const [idx, spec] of Object.entries(rules)) {
      const g = view.greps[spec.grep]
      if (!g || g.status !== 'CLEAN') continue   // UNPROVEN or HITS → the judge decides
      out.mechanical.push({
        compendium: comp, rule_index: Number(idx), rule_lead: spec.lead,
        verdict: 'PASS',
        evidence: `mechanical: /${g.pattern}/ over body projection ${view.projections.body_numbered} → ${g.body_hits} hits; pattern proven against planted violation.`,
        fix_hint: '', blocking: false, prefilled: true,
      })
    }
  }

  // Owed = rules in THIS CLASS's compendiums that nothing resolved. Counting the
  // whole inventory instead would report a judge owing rules its template
  // forbids it from touching — the "stay in your lane" clause exists precisely
  // because a verdict outside the class outranks nothing and can contradict
  // something.
  const seen = new Set([...out.carried, ...out.mechanical].map(r => `${r.compendium}|${r.rule_index}`))
  const inScope = (COMPENDIA[cls] || []).map(c => `${c}.md`)
  let owed = 0
  for (const comp of inScope) {
    const meta = view.rule_inventory[comp]
    if (!meta || !meta.indices) continue
    for (const i of meta.indices) if (!seen.has(`${comp}|${i}`)) owed++
  }
  out.owed_to_judge = owed
  out.reason = 'ok'
  return { view, out }
}

module.exports = { prefill, shapeHash, SHAPE_KEYS }

// One-time backfill. Every instance on disk predates `shape_hash`, so a cold
// first sweep would carry nothing and the whole saving would arrive one sweep
// late. An instance whose recorded `body_sha` still matches the file was judged
// against THIS byte sequence — its shape is not merely probably unchanged, it is
// provably identical, so stamping the hash asserts nothing new. An instance
// whose sha has moved is left cold: the shape may have changed and proving it
// did not costs more than re-judging.
function backfill({ apply = false, quietMinutes = 10 } = {}) {
  const crypto2 = require('node:crypto')
  const sha256 = t => crypto2.createHash('sha256').update(t, 'utf8').digest('hex')
  const rows = { stamped: 0, sha_moved: 0, no_sha: 0, unreadable: 0, no_rules: 0, live: 0 }
  const cutoff = Date.now() - quietMinutes * 60_000
  for (const f of fs.readdirSync(INSTANCES)) {
    if (!f.endsWith('.json')) continue
    const p = path.join(INSTANCES, f)
    // A shared tree with live peers: an instance touched in the last few minutes
    // may have a judge mid-write behind it. Stamping it would win a race whose
    // prize is someone else's verdict. Skipping costs one cold class.
    try { if (fs.statSync(p).mtimeMs > cutoff) { rows.live++; continue } } catch { rows.unreadable++; continue }
    let d
    try { d = JSON.parse(fs.readFileSync(p, 'utf8')) } catch { rows.unreadable++; continue }
    if (!Array.isArray(d.rules_evaluated) || !d.rules_evaluated.length) { rows.no_rules++; continue }
    if (!d.body_sha || !d.file) { rows.no_sha++; continue }
    let raw
    try { raw = fs.readFileSync(path.isAbsolute(d.file) ? d.file : path.join(REPO, d.file), 'utf8') }
    catch { rows.unreadable++; continue }
    if (sha256(raw) !== d.body_sha) { rows.sha_moved++; continue }
    const { derive: d2 } = require('./derive-body-view.js')
    const v = d2(d.file, { write: false })
    if (apply) {
      d.shape_hash = shapeHash(v.signals)
      fs.writeFileSync(p, JSON.stringify(d, null, 1) + '\n')
    }
    rows.stamped++
  }
  return rows
}

module.exports.backfill = backfill

if (require.main === module) {
  if (process.argv.includes('--backfill')) {
    const apply = process.argv.includes('--apply')
    const r = backfill({ apply })
    console.log(`${apply ? "stamped" : "would stamp"}: ${r.stamped} · skipped live: ${r.live} · sha moved (left cold): ${r.sha_moved} · no body_sha: ${r.no_sha} · no rules: ${r.no_rules} · unreadable: ${r.unreadable}`)
    process.exit(0)
  }
  const [file, cls, ...rest] = process.argv.slice(2)
  if (!file || !cls) {
    console.error('usage: prefill-instance.js <file.md> <class> [--json]')
    process.exit(1)
  }
  const { out } = prefill(file, cls)
  if (rest.includes('--json')) { console.log(JSON.stringify(out, null, 1)); process.exit(0) }
  console.log(`${out.slug}.${cls}: ${out.carried.length} N/A carried · ${out.mechanical.length} mechanical PASS · ${out.owed_to_judge ?? '?'} owed to judge  [${out.reason}]`)
}
