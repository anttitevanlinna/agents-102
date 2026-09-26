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

// Run once per registered training that owns content (a cut reuses its
// parent's). A training marked `status: 'draft'` in the registry is checked and
// reported, but its failures do not fail the suite.
const PER_TRAINING = [
  'scripts/check-slide-size.js',
  'scripts/check-slide-deixis.js',
  'scripts/check-slide-numbering.js',
  'scripts/check-slide-tiers.js',
  'scripts/calculate-time.js --check',
]

const GATES = [
  'scripts/check-emphasis-balance.js',
  'scripts/check-cross-doc-anchors.js',
  'scripts/check-include-anchors.js',
  'scripts/check-easteregg-watched.js',
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

function gateList(trainings) {
  const own = Object.entries(trainings).filter(([, t]) => !t.contentKey)
  return [
    ...GATES.map(cmd => ({ cmd, blocking: true })),
    ...own.flatMap(([k, t]) => PER_TRAINING.map(g => ({ cmd: `${g} --training ${k}`, blocking: t.status !== 'draft' }))),
  ]
}

function run() {
  const { TRAININGS } = require('../site/layouts/curriculum.js')
  const list = gateList(TRAININGS)
  const failed = []
  for (const g of list) {
    const [script, ...args] = g.cmd.split(' ')
    const r = spawnSync('node', [script, ...args], { cwd: REPO, encoding: 'utf8' })
    const ok = r.status === 0
    console.log(`${ok ? '✓' : g.blocking ? '✗' : '⚠'} ${g.cmd}${!ok && !g.blocking ? '  (draft: reported, not blocking)' : ''}`)
    if (!ok && g.blocking) failed.push({ g: g.cmd, out: `${r.stdout}${r.stderr}` })
  }
  for (const f of failed) console.log(`\n── ✗ ${f.g}\n${f.out.trimEnd()}`)
  const blocking = list.filter(g => g.blocking).length
  console.log(`\n${blocking - failed.length}/${blocking} blocking gates pass`)
  return failed.length ? 1 : 0
}

module.exports = { GATES, PER_TRAINING, REPORTS, gateList }
if (require.main === module) process.exit(run())
