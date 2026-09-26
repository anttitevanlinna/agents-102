#!/usr/bin/env node
// Eval instances name the judged file repo-relative, so they read the same in
// every checkout. Readers accept any older form: absolute in this checkout,
// absolute in someone else's, or relative.
'use strict'
const assert = require('node:assert')
const fs = require('node:fs')
const path = require('node:path')
const { repoRel } = require('./instance-file.js')

const REPO = path.resolve(__dirname, '../..', '..')
assert.strictEqual(repoRel(REPO, 'curriculum/exercises/x.md'), 'curriculum/exercises/x.md')
assert.strictEqual(repoRel(REPO, path.join(REPO, 'curriculum/exercises/x.md')), 'curriculum/exercises/x.md')
assert.strictEqual(repoRel(REPO, '/home/someone/work/agents-102/curriculum/lectures/y.md'), 'curriculum/lectures/y.md')
assert.strictEqual(repoRel(REPO, null), null)

const DIR = path.join(REPO, 'curriculum/evals/instances')
const abs = []
for (const f of fs.readdirSync(DIR).filter(f => f.endsWith('.json'))) {
  const t = fs.readFileSync(path.join(DIR, f), 'utf8')
  if (/"\/(?:Users|home)\/[^"]*?\/agents-102\/[^"]*"/.test(t)) abs.push(f)
}
assert.deepStrictEqual(abs.slice(0, 5), [], `${abs.length} instances carry absolute paths; run: node curriculum/evals/scripts/instance-file.js --normalize`)
console.log('instance-paths: repo-relative, readers accept every older form')
