#!/usr/bin/env node
// core-pairing.js — does this public checkout own the private core it reads?
//
//   node scripts/core-pairing.js [public-checkout]    exit 1 on a problem
//
// The tracked links (skills, agents, lints, sim-cache) resolve
// ../agents-102-core, so a public worktree's core is whatever sits beside it.
// Two public worktrees in one folder share that core: a customer trace written
// from one is an orphan in the other (check-trace-names fails), or is read as
// the other's evidence. AGENTS_CORE_DIR moves hooks and scripts but not the
// links, so a value naming a different core splits one session across two.
// scripts/pair-worktree.sh makes a pair that owns its core.
'use strict'
const fs = require('node:fs')
const path = require('node:path')
const { execFileSync } = require('node:child_process')

const real = p => { try { return fs.realpathSync(p) } catch { return null } }
const siblingCore = checkout => real(path.join(path.dirname(checkout), 'agents-102-core'))

function worktrees(checkout) {
  const out = execFileSync('git', ['-C', checkout, 'worktree', 'list', '--porcelain'], { encoding: 'utf8' })
  return out.split('\n').filter(l => l.startsWith('worktree ')).map(l => l.slice(9))
}

function pairing(checkout, env = process.env) {
  const self = real(checkout)
  const core = siblingCore(self)
  const problems = []
  if (!core) return { core: null, problems: [`no agents-102-core beside ${self}`] }
  const sharing = worktrees(self).map(real).filter(w => w && w !== self && siblingCore(w) === core)
  for (const w of sharing) problems.push(`${w} also reads ${core}`)
  if (env.AGENTS_CORE_DIR && real(env.AGENTS_CORE_DIR) !== core) {
    problems.push(`AGENTS_CORE_DIR=${env.AGENTS_CORE_DIR} is not the core the links read (${core})`)
  }
  return { core, problems }
}

const FIX = 'give each workstream its own pair: scripts/pair-worktree.sh <pair-root> <branch> (or remove the other worktree)'

module.exports = { pairing, FIX }

if (require.main === module) {
  const checkout = process.argv[2] || execFileSync('git', ['rev-parse', '--show-toplevel'], { encoding: 'utf8' }).trim()
  const { core, problems } = pairing(checkout)
  if (problems.length) {
    console.error('core-pairing: FAIL\n  ' + problems.join('\n  ') + '\n  ' + FIX)
    process.exit(1)
  }
  console.log(`core-pairing: ${core} belongs to this checkout alone`)
}
