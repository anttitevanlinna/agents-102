#!/usr/bin/env node
// stamp-from-reeval.js — stamp Quality verdicts from a re-eval workflow's task output.
//
// Reads the Workflow task output JSON (.result.results — per-pair {file, instanceSlug,
// cls, verdict, blocking, todos, note, verify}), routes each file's drift since
// --drift-base through scan-stale-classes routing, and stamps every non-drifted
// verdict via update-quality.sh (one invocation per file, all class flags).
//
// Stamp rules:
//   PASS                                → --<cls> PASS
//   REVISE + verify REFUTED            → --<cls> PASS:verify-refuted
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
const results = (out.result || out).results
if (!Array.isArray(results)) { process.stderr.write('no .result.results in output file\n'); process.exit(1) }

const byFile = new Map()
for (const r of results) {
  if (!byFile.has(r.file)) byFile.set(r.file, [])
  byFile.get(r.file).push(r)
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
    if (r.verdict === 'PASS') { flags.push(`--${r.cls}`, 'PASS'); stamped++; continue }
    const v = r.verify
    if (v && v.verdict === 'REFUTED') { flags.push(`--${r.cls}`, 'PASS:verify-refuted'); stamped++; continue }
    const nb = v && v.verdict === 'PARTIAL' ? v.confirmed : r.blocking
    flags.push(`--${r.cls}`, `REVISE:${nb}/${r.todos} see instances/${r.instanceSlug}.${r.cls}.json`)
    stamped++
  }
  if (skipped.length) process.stderr.write(`DRIFT-SKIP ${file}: ${skipped.join(' ')}\n`)
  if (!flags.length) continue
  if (dry) { process.stderr.write(`DRY ${file}: ${flags.join(' ')}\n`); continue }
  execFileSync('bash', ['curriculum/evals/scripts/update-quality.sh', file, ...flags], { cwd: repo, stdio: ['ignore', 'ignore', 'inherit'] })
}
process.stderr.write(`\nstamped ${stamped} verdicts across ${byFile.size} files; drift-skipped ${skippedDrift}; wip-skipped ${skippedWip}; agent-lost ${skippedLost}\n`)
