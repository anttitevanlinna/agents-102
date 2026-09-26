#!/usr/bin/env node
// Prompt-anatomy popups in a built workbook. The runtime looks each clicked
// .prompt-anchor up in window.__ANATOMY. The build inlines that data only when
// some prompt carries `anchors:`; then every anchored move must have an entry.
// With no anchors the workbook carries no anatomy payload at all.
'use strict'
const assert = require('node:assert')
const fs = require('node:fs')
const path = require('node:path')
const { execFileSync } = require('node:child_process')
const { loadRegistry } = require('./compile-prompts.js')
const { entries } = require('./compile-anatomy.js')

const REPO = path.resolve(__dirname, '..')
const SLUG = 'vip-anatomytest'                     // vip-* is gitignored
const OUT = path.join(REPO, 'site/clients', SLUG)
const moves = new Set(Object.values(loadRegistry()).flatMap(e => (e.anchors || []).map(a => a.move)))
const catalog = entries()
for (const mv of moves) assert.ok(catalog[mv], `anchored move ${mv} has an anatomy entry`)
try {
  execFileSync('node', ['scripts/build-workbook.js', SLUG, 'agentic-engineering-101'], { cwd: REPO, stdio: 'pipe' })
  const html = fs.readFileSync(path.join(OUT, 'agentic-engineering-101/index.html'), 'utf8')
  const inlined = /window\.__ANATOMY = \{/.test(html)
  assert.strictEqual(inlined, moves.size > 0, moves.size ? 'anchors exist → anatomy inlined' : 'no anchors → no anatomy payload')
  console.log(`anatomy: ${moves.size} anchored moves, inlined=${inlined}`)
} finally {
  fs.rmSync(OUT, { recursive: true, force: true })
}
