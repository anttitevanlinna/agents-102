#!/usr/bin/env node
// stamp-from-reeval.js — stamp Quality verdicts from a re-eval workflow's task output.
//
// Reads the Workflow task output JSON, routes each file's drift since --drift-base
// through scan-stale-classes routing, and stamps every non-drifted verdict via
// update-quality.sh (one invocation per file, all class flags).
//
// TWO producer shapes, because there are two producers and they drifted apart:
//   .result.results  — the 2026-06 re-eval fleet: {file, instanceSlug, cls, verdict,
//                      blocking, todos, verify:{verdict, confirmed}}
//   .result.summary  — .claude/workflows/eval-sweep.js: {file, class, verdict,
//                      todos:[], confirmed:[], refuted:[], unadjudicated:[]}
// The sweep is the named workflow every queue-clearing session is told to dispatch,
// and for a while its output could not be stamped by the stamper at all — the reader
// asked for `.results`, got `.summary`, and exited on "no .result.results". A pipeline
// whose two halves cannot be joined is two scripts, and the join is where the guards
// live (WIP-skip, drift-skip, the verify-refuted rung), so hand-stamping around it
// drops exactly the protections that cost the most to learn.
//
// Stamp rules:
//   PASS                                → --<cls> PASS
//   PASS_WITH_TODOS                     → --<cls> PASS:<NT> todos see instances/<slug>.<cls>.json
//   REVISE + verify REFUTED            → --<cls> PASS:verify-refuted[, <NT> todos …]
//   REVISE + verify PARTIAL            → --<cls> REVISE:<confirmed>/<NT> see instances/<slug>.<cls>.json
//   REVISE + verify CONFIRMED/missing  → --<cls> REVISE:<NB>/<NT> see instances/<slug>.<cls>.json
//   AGENT-LOST                         → no stamp (class stays stale)
//   class ∈ drift(file, drift-base)    → no stamp (judge read bytes that later moved)
//
// usage: node stamp-from-reeval.js <task-output.json> --drift-base <sha> [--dry-run] [--repo <path>]
'use strict'
const { execFileSync } = require('node:child_process')
const fs = require('node:fs')
const path = require('node:path')
const { parseHunks, buildLineMeta, changeTags } = require('./scan-stale-classes.js')

const INSTANCES = 'curriculum/evals/instances'

// A verdict the refuters never reached is not a refuted one. The sweep reports
// three buckets and only `confirmed` survives adjudication outright; folding
// `unadjudicated` into the refuted pile would turn a dead refuter into a PASS,
// which is the one direction a verification failure must never resolve.
function adaptSweepRow(s, slugOf = () => null) {
  const confirmed = (s.confirmed || []).length
  const refuted = (s.refuted || []).length
  const unadjudicated = (s.unadjudicated || []).length
  const blocking = confirmed + unadjudicated
  // A set verdict speaks for every member. Stamping only the file the summary
  // happened to name leaves the rest still owing a row they already earned —
  // and a set whose members did not survive the summary is not a set, so it
  // stamps nothing rather than silently claiming the one file it can see.
  const isSet = s.class === 'cross_module'
  const targets = isSet ? (s.module_set || []) : [s.file]
  return {
    file: s.file,
    targets,
    cls: s.class,
    setName: s.set_name || null,
    moduleSet: s.module_set || null,
    instanceSlug: s.instanceSlug || slugOf(s.file, s.class, s.module_set),
    verdict: s.verdict,
    blocking,
    todos: (s.todos || []).length,
    verify: refuted && !blocking ? { verdict: 'REFUTED', confirmed: 0 }
      : blocking && refuted ? { verdict: 'PARTIAL', confirmed: blocking }
        : null,
  }
}

function readResults(out, slugOf) {
  const r = out.result || out
  if (Array.isArray(r.results)) return r.results
  if (Array.isArray(r.summary)) return r.summary.map(s => adaptSweepRow(s, slugOf))
  return null
}

// The sweep's summary drops the slug it dispatched with, and a REVISE note that
// points at no instance is a verdict nobody can read the evidence for. The judge
// has just written the instance, so ask the directory rather than rebuilding the
// naming convention here — a second copy of that convention is a second thing to
// keep in step.
// Matched on the repo-relative suffix, not on string equality: judges write the
// `file` field by hand and a majority of one sweep wrote absolute /Users paths.
// Equality would have found nothing and dropped the pointer from exactly the
// verdicts that need it.
const sameFile = (a, b) => a === b || (!!a && !!b && (a.endsWith(`/${b}`) || b.endsWith(`/${a}`)))

// A set instance names no single `file` — it names a `module_set`, and one
// member can belong to two sets (earn-the-trust sits in both prework-m3 and
// m3-m4). Matching on "contains this file" would pick whichever sorted first,
// so a set is identified by its whole membership or not at all.
const sameSet = (a, b) => Array.isArray(a) && Array.isArray(b) && a.length === b.length
  && a.every((x, i) => sameFile(x, b[i]))

function makeSlugOf(repo) {
  return (file, cls, moduleSet) => {
    let entries
    try { entries = fs.readdirSync(path.join(repo, INSTANCES)) } catch { return null }
    for (const e of entries) {
      if (!e.endsWith(`.${cls}.json`)) continue
      try {
        const j = JSON.parse(fs.readFileSync(path.join(repo, INSTANCES, e), 'utf8'))
        const hit = cls === 'cross_module' ? sameSet(j.module_set, moduleSet) : sameFile(j.file, file)
        if (hit) return e.slice(0, -`.${cls}.json`.length)
      } catch { /* an unreadable instance is not this file's slug */ }
    }
    return null
  }
}

const pointer = r => (r.instanceSlug ? ` see instances/${r.instanceSlug}.${r.cls}.json` : '')
const plural = n => `${n} todo${n === 1 ? '' : 's'}`

// The class is snake, update-quality.sh's flag is kebab. One character, and the
// whole run dies on an unrecognised argument.
const flagName = cls => `--${String(cls).replace(/_/g, '-')}`

// null = do not stamp this class.
// `meta` supplies the two numbers a cross_module row carries that no other class
// has — pairs walked and blocking count — read from the instance, which is the
// record. They are not invented when the instance cannot supply them.
function stateFor(r, meta = null) {
  if (r.verdict === 'AGENT-LOST') return null
  // The queue matches a set row to its set on the `set=[…]` substring. Without
  // it the row is invisible: the set reads as never-stamped and re-fires next
  // sweep, which is a PASS paid for twice and trusted neither time.
  if (r.cls === 'cross_module') {
    const names = (r.moduleSet || []).map(m => path.basename(m, '.md')).join(',')
    const counts = meta ? `; ${meta.pairs} pair${meta.pairs === 1 ? '' : 's'}, ${meta.blocking} blocking` : ''
    const word = r.blocking ? 'REVISE' : 'PASS'
    // Semicolon before the pointer, matching the rows already on the corpus —
    // a set row is read beside its siblings, and one row punctuated differently
    // is one row a reader stops on.
    const ptr = pointer(r) ? `;${pointer(r)}` : ''
    return `${word}:set=[${names}]${counts}${ptr}`
  }
  // A non-blocking todo is not a gate. Before the rung existed a judge holding
  // one had to report REVISE, and the orchestrator read that as red — which is
  // how a clean file with a note on it stopped a ship.
  //
  // PASS and PASS_WITH_TODOS share this branch on purpose. Judges use both while
  // filing todos, and the verdict word is theirs to choose — but a row reading a
  // bare `PASS` over an instance holding four notes points nobody at them, and a
  // note nobody can find is a note nobody wrote. The verdict is not rewritten;
  // only the pointer is added.
  if (r.verdict === 'PASS' || r.verdict === 'PASS_WITH_TODOS') {
    return r.todos ? `PASS:${plural(r.todos)}${pointer(r)}` : 'PASS'
  }
  const v = r.verify
  if (v && v.verdict === 'REFUTED') {
    return r.todos ? `PASS:verify-refuted, ${plural(r.todos)}${pointer(r)}` : 'PASS:verify-refuted'
  }
  const nb = v && v.verdict === 'PARTIAL' ? v.confirmed : r.blocking
  return `REVISE:${nb}/${r.todos}${pointer(r)}`
}

// Judges write `file` absolute — 760 of 803 instances do, and the instance
// checker converts on read rather than fighting it. Everything downstream here
// (git pathspecs, fs reads, update-quality.sh) wants one dialect, so convert
// once, at the door. A path outside the repo passes through untouched: git
// refusing it loudly beats rewriting it into some other file that exists.
const toRel = (repo, p) => {
  if (!path.isAbsolute(p)) return p
  const r = path.relative(repo, p)
  return r && !r.startsWith('..') ? r : p
}

function groupByFile(results, repo) {
  const byFile = new Map()
  const noTarget = []
  for (const r of results) {
    // Older fleet rows carry no `targets`; they are single-file by construction.
    const targets = r.targets || [r.file]
    if (!targets.length) { noTarget.push({ cls: r.cls, file: r.file }); continue }
    for (const t of targets) {
      const key = toRel(repo, t)
      if (!byFile.has(key)) byFile.set(key, [])
      byFile.get(key).push(r)
    }
  }
  return { byFile, noTarget }
}

function main() {
  const argv = process.argv.slice(2)
  const outPath = argv[0]
  const base = argv[argv.indexOf('--drift-base') + 1]
  const dry = argv.includes('--dry-run')
  const repo = argv.includes('--repo') ? argv[argv.indexOf('--repo') + 1] : process.cwd()
  if (!outPath || !base || base.startsWith('--')) {
    process.stderr.write('usage: stamp-from-reeval.js <task-output.json> --drift-base <sha> [--dry-run]\n')
    process.exit(2)
  }

  const out = JSON.parse(fs.readFileSync(outPath, 'utf8'))
  const results = readResults(out, makeSlugOf(repo))
  if (!Array.isArray(results)) {
    process.stderr.write('no .result.results and no .result.summary in output file — not a re-eval or eval-sweep output\n')
    process.exit(1)
  }

  const { byFile, noTarget } = groupByFile(results, repo)
  for (const n of noTarget) {
    process.stderr.write(`NO-TARGET ${n.cls} on ${n.file} — a set row with no member list stamps nothing\n`)
  }
  const setMeta = r => {
    if (r.cls !== 'cross_module' || !r.instanceSlug) return null
    try {
      const j = JSON.parse(fs.readFileSync(path.join(repo, INSTANCES, `${r.instanceSlug}.cross_module.json`), 'utf8'))
      // `module_pairs_evaluated` is the LIST of adjacent pairs walked, one entry
      // per seam, not a count — reading it as a number silently dropped the
      // "N pairs, M blocking" half of every set row.
      const p = j.module_pairs_evaluated
      const pairs = Array.isArray(p) ? p.length : (typeof p === 'number' ? p : null)
      if (pairs === null) return null
      return { pairs, blocking: j.blocking_findings_count || 0 }
    } catch { return null }
  }

  const gitDiff = f => execFileSync('git', ['diff', base, '--', f], { cwd: repo, encoding: 'utf8', maxBuffer: 33554432 })

  let stamped = 0, skippedDrift = 0, skippedLost = 0, skippedWip = 0
  for (const [file, pairs] of byFile) {
    // live multi-session repo: an uncommitted .md means another session's WIP — hands off
    const wip = execFileSync('git', ['status', '--porcelain', '--', file], { cwd: repo, encoding: 'utf8' }).trim()
    if (wip) { process.stderr.write(`WIP-SKIP ${file} (uncommitted co-edit)\n`); skippedWip += pairs.length; continue }
    const text = fs.readFileSync(path.join(repo, file), 'utf8')
    const drift = changeTags(buildLineMeta(text), parseHunks(gitDiff(file))).tags
    const flags = []
    const skipped = []
    for (const r of pairs) {
      if (r.verdict === 'AGENT-LOST') { skippedLost++; continue }
      if (drift.has(r.cls)) { skipped.push(r.cls); skippedDrift++; continue }
      const state = stateFor(r, setMeta(r))
      if (state === null) { skippedLost++; continue }
      flags.push(flagName(r.cls), state)
      stamped++
    }
    if (skipped.length) process.stderr.write(`DRIFT-SKIP ${file}: ${skipped.join(' ')}\n`)
    if (!flags.length) continue
    if (dry) { process.stderr.write(`DRY ${file}: ${flags.join(' ')}\n`); continue }
    execFileSync('bash', ['curriculum/evals/scripts/update-quality.sh', file, ...flags], { cwd: repo, stdio: ['ignore', 'ignore', 'inherit'] })
  }
  process.stderr.write(`\nstamped ${stamped} verdicts across ${byFile.size} files; drift-skipped ${skippedDrift}; wip-skipped ${skippedWip}; agent-lost ${skippedLost}\n`)
}

if (require.main === module) main()

module.exports = { readResults, adaptSweepRow, stateFor, makeSlugOf, flagName, groupByFile }
