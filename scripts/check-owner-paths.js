#!/usr/bin/env node
// check-owner-paths.js — nothing a clone runs or follows may name the
// maintainer's machine or their Google Drive.
// Rules, hooks, scripts, workflows, skills, judge templates, eval procedures,
// prompts, tmux scenarios and CLAUDE.md tiers must find the project and the
// agents-102-core rules layer the way a customer's fresh clone does:
// $CLAUDE_PROJECT_DIR / script location, $AGENTS_CORE_DIR, or the sibling clone.
// Records (eval instances, run logs, compounded entries, research) say what
// happened on some machine; they are out of scope.
// The private core is checked too, with its own scope, whenever this runs.
'use strict'
const fs = require('node:fs')
const path = require('node:path')
const { execFileSync } = require('node:child_process')

// Teaching text shows the shape with a placeholder user; that names nobody's machine.
const PLACEHOLDER_USER = '(?!(?:me|you|yourname|username|user|name)\\b)'
const OWNER = new RegExp(`/Users/${PLACEHOLDER_USER}[a-z]+/|-Users-${PLACEHOLDER_USER}[a-z]+-Projects|(?:~|\\$HOME)/Projects/agents-102(?![\\w-])|CloudStorage/GoogleDrive|GoogleDrive-[^/\\s]+@`)
const SCOPE = [
  /^scripts\/[^/]+\.(js|sh)$/,
  /^curriculum\/evals\/scripts\/[^/]+\.(js|sh|py)$/,
  /^\.claude\/workflows\/[^/]+\.js$/,
  /^\.claude\/skills\/.+\.md$/,
  /^\.claude\/rules\/.+\.md$/,
  /^\.claude\/settings\.json$/,
  /(^|\/)(CLAUDE|AGENTS)\.md$/,
  /^curriculum\/.+\.md$/,
  /^curriculum\/evals\/mechanical\/.+\.(sh|js|txt)$/,
]
const CORE_SCOPE = [
  /^skills\/.+\.md$/,
  /^project-claude\/(hooks|agents)\/.+/,
  /^project-claude\/agent-memory\/.+\.md$/,
  /^strategy\/.+\.md$/,
  /^memory\/(check_[^/]+|self-review-protocol)\.md$/,
  /^memory\/_index\/.+\.md$/,
  /^README\.md$/,
]

// Records inside an otherwise in-scope tree: they log incidents on the machine
// where they happened, and nothing follows them as an instruction.
const RECORDS = new Set([
  'curriculum/evals/mechanical/tmux-runner/IMPROVEMENTS.md',
])
const SELF = new Set(['scripts/check-owner-paths.js'])

function offenders(repo, files, scope = SCOPE) {
  const out = []
  for (const f of files) {
    if (!scope.some(re => re.test(f)) || /\.test\.(js|sh|py)$/.test(f)) continue
    if (SELF.has(f) || RECORDS.has(f)) continue
    let text
    try { text = fs.readFileSync(path.join(repo, f), 'utf8') } catch { continue }
    text.split('\n').forEach((line, i) => { if (OWNER.test(line)) out.push(`${f}:${i + 1}`) })
  }
  return out
}

const coreDir = repo => process.env.AGENTS_CORE_DIR || path.resolve(repo, '..', 'agents-102-core')

module.exports = { offenders, OWNER, SCOPE, CORE_SCOPE, coreDir }

if (require.main === module) {
  const repo = path.resolve(__dirname, '..')
  const ls = dir => execFileSync('git', ['-C', dir, 'ls-files'], { encoding: 'utf8' }).split('\n').filter(Boolean)
  const bad = offenders(repo, ls(repo))
  const core = coreDir(repo)
  if (!fs.existsSync(path.join(core, '.git'))) {
    console.error(`check-owner-paths: FAIL — core checkout not found at ${core} (set AGENTS_CORE_DIR)`)
    process.exit(1)
  }
  bad.push(...offenders(core, ls(core), CORE_SCOPE).map(f => `core:${f}`))
  if (bad.length) { console.error('check-owner-paths: FAIL — owner paths in tooling or instructions:\n  ' + bad.join('\n  ')); process.exit(1) }
  console.log('check-owner-paths: no owner paths in tooling or instructions (public + core)')
}
