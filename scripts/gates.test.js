#!/usr/bin/env node
// Every checker CLI is wired: listed as a gate in gates.js, or named there as a
// report. A checker that exists and runs nowhere reads as protection it isn't.
'use strict'
const { test } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const { GATES, PER_TRAINING, REPORTS } = require('./gates.js')

const REPO = path.resolve(__dirname, '..')
const wired = new Set([...GATES, ...PER_TRAINING].map(g => g.split(' ')[0]).concat(REPORTS))

test('every check-*.js is a gate or a named report', () => {
  const checkers = ['scripts', 'curriculum/evals/scripts'].flatMap(d =>
    fs.readdirSync(path.join(REPO, d))
      .filter(f => /^check-.*\.js$/.test(f) && !f.endsWith('.test.js'))
      .map(f => `${d}/${f}`))
  const unwired = checkers.filter(c => !wired.has(c))
  assert.deepEqual(unwired, [], `unwired checkers: ${unwired.join(', ')}`)
})

test('every listed gate exists', () => {
  for (const s of wired) assert.ok(fs.existsSync(path.join(REPO, s)), s)
})

// Registering a training is the whole act: every per-training gate then runs
// on it. A `status: 'draft'` training is checked and reported, not blocking.
test('per-training gates come from the registry; draft trainings do not block', () => {
  const { gateList, PER_TRAINING } = require('./gates.js')
  const list = gateList({ 'ship-t': {}, 'draft-t': { status: 'draft' }, 'cut-t': { contentKey: 'ship-t' } })
  for (const g of PER_TRAINING) {
    assert.ok(list.some(x => x.cmd === `${g} --training ship-t` && x.blocking), `${g} blocks ship-t`)
    assert.ok(list.some(x => x.cmd === `${g} --training draft-t` && !x.blocking), `${g} reports draft-t`)
    assert.ok(!list.some(x => x.cmd.includes('cut-t')), 'a cut reuses its parent\'s content')
  }
})

test('the live registry: every content-owning training is gated', () => {
  const { gateList } = require('./gates.js')
  const { TRAININGS } = require('../site/layouts/curriculum.js')
  const cmds = gateList(TRAININGS).map(x => x.cmd).join('\n')
  for (const [k, t] of Object.entries(TRAININGS)) if (!t.contentKey) assert.match(cmds, new RegExp(`--training ${k}$`, 'm'))
})
