'use strict'
const { test } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const { offenders } = require('./check-owner-paths.js')

test('flags a home path and an encoded auto-memory path, in scope only', () => {
  const d = fs.mkdtempSync(path.join(os.tmpdir(), 'owner-'))
  fs.mkdirSync(path.join(d, 'scripts'))
  fs.writeFileSync(path.join(d, 'scripts/a.js'), "const M = '/Users/someone/x'\nok\nconst P = '-Users-someone-Projects-y'\n")
  fs.writeFileSync(path.join(d, 'scripts/b.js'), 'const M = process.env.AGENTS_CORE_DIR\n')
  fs.mkdirSync(path.join(d, 'curriculum'))
  fs.writeFileSync(path.join(d, 'curriculum/c.md'), '/Users/someone/ in prose is out of scope\n')
  assert.deepEqual(offenders(d, ['scripts/a.js', 'scripts/b.js', 'curriculum/c.md']), ['scripts/a.js:1', 'scripts/a.js:3'])
})

test('the live repo has no owner paths in tooling', () => {
  const { execFileSync } = require('node:child_process')
  const repo = path.resolve(__dirname, '..')
  const files = execFileSync('git', ['-C', repo, 'ls-files'], { encoding: 'utf8' }).split('\n').filter(Boolean)
  assert.deepEqual(offenders(repo, files), [])
})
