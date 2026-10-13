#!/usr/bin/env node
// check-hook-paths.js — every hook command in .claude/settings.json must resolve
// to an executable that a fresh clone has: tracked in this repo, or inside the
// sibling agents-102-core clone. A gitignored path or ~/.claude path works on
// the maintainer's laptop and silently vanishes everywhere else.
'use strict'
const fs = require('node:fs')
const path = require('node:path')
const { execFileSync } = require('node:child_process')

function hookCommands(settings) {
  return Object.values(settings.hooks || {}).flatMap(groups =>
    groups.flatMap(g => (g.hooks || []).map(h => h.command)))
}

// Expand the only forms settings.json uses. AGENTS_CORE_DIR and
// CLAUDE_PROJECT_DIR are treated as unset: those defaults are what a fresh
// non-Claude runtime gets. A hook may be launched through an interpreter.
function resolve(cmd, repo) {
  let s = cmd.trim().replace(/^(?:python3|node|bash|sh)\s+/, '')
  s = s.split(/\s+/)[0].replace(/^"|"$/g, '')
  s = s.replace(/\$\{CLAUDE_PROJECT_DIR:-\$PWD\}/g, repo)
  s = s.replace(/"?\$\{AGENTS_CORE_DIR:-([^}]*)\}"?/, '$1').replace(/"/g, '')
  s = s.replace(/\$CLAUDE_PROJECT_DIR/g, repo)
  s = s.replace(/\$PWD/g, repo)
  return s
}

function check(repo, core) {
  const settings = JSON.parse(fs.readFileSync(path.join(repo, '.claude/settings.json'), 'utf8'))
  const tracked = new Set(execFileSync('git', ['-C', repo, 'ls-files'], { encoding: 'utf8' }).split('\n'))
  const problems = []
  for (const cmd of hookCommands(settings)) {
    const p = resolve(cmd, repo)
    if (p.startsWith('~')) { problems.push(`${cmd} → machine-local path`); continue }
    const abs = path.resolve(p)
    if (abs.includes('/.claude/hooks/')) { problems.push(`${cmd} → machine-local path`); continue }
    const inCore = abs.startsWith(path.resolve(core) + path.sep)
    const inRepo = tracked.has(path.relative(repo, abs))
    if (!inCore && !inRepo) problems.push(`${cmd} → not tracked here and not in core`)
    else {
      try { fs.accessSync(abs, fs.constants.X_OK) } catch { problems.push(`${cmd} → missing or not executable`) }
    }
  }
  return problems
}

module.exports = { hookCommands, resolve, check }

if (require.main === module) {
  const repo = path.resolve(__dirname, '..')
  const core = path.resolve(repo, '..', 'agents-102-core')
  const problems = check(repo, core)
  if (problems.length) { console.error('check-hook-paths: FAIL\n  ' + problems.join('\n  ')); process.exit(1) }
  console.log('check-hook-paths: all hook commands resolve for a fresh clone')
}
