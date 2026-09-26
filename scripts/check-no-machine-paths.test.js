#!/usr/bin/env node
// Instructions an agent follows (judge templates, skills, workflows, hooks, rule
// routing) name no one machine's home directory. A judge told to evaluate
// /Users/<someone>/Projects/agents-102/ on a customer's laptop judges nothing.
// Records (instances, bench runs) are history and may carry old paths.
'use strict'
const assert = require('node:assert')
const path = require('node:path')
const { execFileSync } = require('node:child_process')

const REPO = path.resolve(__dirname, '..')
const CORE = process.env.AGENTS_CORE_DIR || path.join(REPO, '..', 'agents-102-core')
const HOME_PATH = /\/(Users|home)\/[a-z][\w.-]*\//
const SCOPE = [
  [REPO, ['curriculum/evals/judges', '.claude/workflows', '.claude/rules', '.claude/settings.json', '.claude/skills/self-study']],
  [CORE, ['skills', 'project-claude/hooks', 'project-claude/agents']],
]
const hits = []
for (const [root, paths] of SCOPE) {
  const files = execFileSync('git', ['-C', root, 'ls-files', '--', ...paths], { encoding: 'utf8' }).split('\n').filter(Boolean)
  for (const f of files) {
    const txt = require('node:fs').readFileSync(path.join(root, f), 'utf8')
    txt.split('\n').forEach((l, i) => { if (HOME_PATH.test(l)) hits.push(`${path.basename(root)}/${f}:${i + 1}`) })
  }
}
assert.deepStrictEqual(hits, [], `machine-specific home paths in agent instructions:\n  ${hits.join('\n  ')}`)
console.log('check-no-machine-paths: agent instructions name no home directory')
