#!/usr/bin/env node
// Corpus gates: each line runs a checker over the live curriculum and eval
// records. `npm test` runs unit tests first, then this list. Every gate runs,
// then the failures print together, so one red gate never hides the next.
//
// gates.test.js fails when a check-*.js is neither listed here nor in REPORTS,
// so a new checker cannot sit unwired.
'use strict'
const { spawnSync } = require('node:child_process')
const path = require('node:path')

const REPO = path.resolve(__dirname, '..')
const EVALS = 'curriculum/evals/scripts'

const GATES = [
  'scripts/check-emphasis-balance.js',
  'scripts/check-cross-doc-anchors.js',
  'scripts/check-include-anchors.js',
  'scripts/check-slide-size.js',
  'scripts/check-slide-size.js --training agents-101',
  'scripts/check-slide-deixis.js',
  'scripts/check-slide-deixis.js --training agents-101',
  'scripts/check-slide-numbering.js',
  'scripts/check-slide-numbering.js --training agents-101',
  'scripts/check-slide-tiers.js',
  'scripts/check-easteregg-watched.js',
  'scripts/calculate-time.js --check',
  'scripts/calculate-time.js --check --training agents-101',
  'scripts/check-doc-paths.js',
  'scripts/check-workflow-scripts.js',
  'scripts/check-hook-paths.js',
  'scripts/check-owner-paths.js',
  'scripts/lint-prompts.js',
  `${EVALS}/check-instance-names.js`,
  `${EVALS}/check-trace-names.js --quiet`,
  `${EVALS}/check-instance-schema.js --training all --quiet`,
  `${EVALS}/check-verdict-agreement.js --quiet`,
  `${EVALS}/check-advisory-verdicts.js`,
  `${EVALS}/check-ui-labels.js`,
]

// Checkers that report judge debt rather than gate: they list work owed, and
// the board shows it.
const REPORTS = [
  `${EVALS}/check-instance-evidence.js`,
]

function run() {
  const failed = []
  for (const g of GATES) {
    const [script, ...args] = g.split(' ')
    const r = spawnSync('node', [script, ...args], { cwd: REPO, encoding: 'utf8' })
    const ok = r.status === 0
    console.log(`${ok ? '✓' : '✗'} ${g}`)
    if (!ok) failed.push({ g, out: `${r.stdout}${r.stderr}` })
  }
  for (const f of failed) console.log(`\n── ✗ ${f.g}\n${f.out.trimEnd()}`)
  console.log(`\n${GATES.length - failed.length}/${GATES.length} gates pass`)
  return failed.length ? 1 : 0
}

module.exports = { GATES, REPORTS }
if (require.main === module) process.exit(run())
