'use strict'
// check-doc-paths imports namesIt from here; importing ran the whole corpus
// scan and printed the report (≈10s of test:unit).
const { test } = require('node:test')
const assert = require('node:assert/strict')
const path = require('node:path')
const { spawnSync } = require('node:child_process')

test('requiring the module runs no scan and prints nothing', () => {
  const r = spawnSync('node', ['-e', `const m = require(${JSON.stringify(path.join(__dirname, 'find-session-docs.js'))}); process.stdout.write(typeof m.namesIt)`], { encoding: 'utf8' })
  assert.equal(r.status, 0, r.stderr)
  assert.equal(r.stdout, 'function')
})

test('namesIt: whole path segment, not substring', () => {
  const { namesIt } = require('./find-session-docs.js')
  assert.ok(namesIt('see docs/a/loop-has-a-name.md', 'x/loop-has-a-name.md'))
  assert.ok(!namesIt('see the-loop-has-a-name.md', 'x/loop-has-a-name.md'))
})
