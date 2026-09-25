#!/usr/bin/env node
// check-owner-paths.js — no tooling may name the maintainer's home directory.
// Rules, hooks, scripts, workflows and skills must find the project and the
// agents-102-core rules layer the way a customer's fresh clone does:
// $CLAUDE_PROJECT_DIR / script location, $AGENTS_CORE_DIR, or the sibling clone.
// Stored eval instances are records, not code, and are out of scope.
'use strict'
const fs = require('node:fs')
const path = require('node:path')
const { execFileSync } = require('node:child_process')

const OWNER = /\/Users\/[a-z]+\/|-Users-[a-z]+-Projects/
const SCOPE = [
  /^scripts\/[^/]+\.(js|sh)$/,
  /^curriculum\/evals\/scripts\/[^/]+\.(js|sh|py)$/,
  /^\.claude\/workflows\/[^/]+\.js$/,
  /^\.claude\/skills\/.+\.md$/,
  /^\.claude\/rules\/.+\.md$/,
  /^\.claude\/settings\.json$/,
]

// Owner-only by design: the maintainer's personal backup to their own Drive.
const EXEMPT = new Set(['scripts/check-owner-paths.js', 'scripts/backup-claude-state.sh'])

function offenders(repo, files) {
  const out = []
  for (const f of files) {
    if (!SCOPE.some(re => re.test(f)) || /\.test\.(js|sh|py)$/.test(f) || EXEMPT.has(f)) continue
    let text
    try { text = fs.readFileSync(path.join(repo, f), 'utf8') } catch { continue }
    text.split('\n').forEach((line, i) => { if (OWNER.test(line)) out.push(`${f}:${i + 1}`) })
  }
  return out
}

module.exports = { offenders, OWNER }

if (require.main === module) {
  const repo = path.resolve(__dirname, '..')
  const files = execFileSync('git', ['-C', repo, 'ls-files'], { encoding: 'utf8' }).split('\n').filter(Boolean)
  const bad = offenders(repo, files)
  if (bad.length) { console.error('check-owner-paths: FAIL — owner paths in tooling:\n  ' + bad.join('\n  ')); process.exit(1) }
  console.log('check-owner-paths: no owner paths in tooling')
}
