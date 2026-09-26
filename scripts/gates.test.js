#!/usr/bin/env node
// Every checker CLI is wired: listed as a gate in gates.js, or named there as a
// report. A checker that exists and runs nowhere reads as protection it isn't.
'use strict'
const { test } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const { GATES, REPORTS } = require('./gates.js')

const REPO = path.resolve(__dirname, '..')
const wired = new Set([...GATES.map(g => g.split(' ')[0]), ...REPORTS])

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
