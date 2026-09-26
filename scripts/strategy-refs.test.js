#!/usr/bin/env node
// Every `bosser-strategy:<file>` the repos cite resolves in agents-102-core/strategy/,
// so a Git-only machine (no Drive) has the strategy the writers and judges read.
// Business files that stay on Drive on purpose are listed in DRIVE_ONLY.
'use strict'
const assert = require('node:assert')
const fs = require('node:fs')
const path = require('node:path')
const { execFileSync } = require('node:child_process')

const REPO = path.resolve(__dirname, '..')
const CORE = process.env.AGENTS_CORE_DIR || path.join(REPO, '..', 'agents-102-core')
const DRIVE_ONLY = new Set(['marketing-plan.md'])

const refs = new Set()
for (const root of [REPO, CORE]) {
  const out = execFileSync('git', ['-C', root, 'grep', '-ohE', 'bosser-strategy:[A-Za-z0-9._-]+\\.md'], { encoding: 'utf8' })
  out.split('\n').filter(Boolean).forEach(r => refs.add(r.slice('bosser-strategy:'.length)))
}
assert.ok(refs.size > 3, `found ${refs.size} strategy refs; wrong layout?`)
const missing = [...refs].filter(f => !DRIVE_ONLY.has(f) && !fs.existsSync(path.join(CORE, 'strategy', f)))
assert.deepStrictEqual(missing, [], `cited but not in ${path.join(CORE, 'strategy')}:\n  ${missing.join('\n  ')}`)
console.log(`strategy-refs: ${refs.size - DRIVE_ONLY.size} files resolve in core`)
