#!/usr/bin/env node
// A fresh clone of agents-102 beside agents-102-core loads every skill, agent and
// lint the creator side needs, from git alone. Nothing may depend on symlinks that
// exist only in one maintainer's ~/.claude or in gitignored paths.
//   - self-study is the one skill that lives here (the student starter ships it).
//   - every other skill, the agents and the lints are tracked relative symlinks
//     into ../agents-102-core, so the private repo stays the only home.
'use strict'
const assert = require('node:assert')
const fs = require('node:fs')
const path = require('node:path')
const { execFileSync } = require('node:child_process')

const REPO = path.resolve(__dirname, '..')
const CORE = fs.realpathSync(path.join(REPO, '..', 'agents-102-core'))
const LOCAL_SKILLS = new Set(['self-study'])
const tracked = new Set(execFileSync('git', ['-C', REPO, 'ls-files', '.claude'], { encoding: 'utf8' }).split('\n').filter(Boolean))
const bad = []

// Every core skill is linked; every linked skill resolves into core.
const skillsDir = path.join(REPO, '.claude', 'skills')
for (const s of fs.readdirSync(path.join(CORE, 'skills'))) {
  if (!fs.existsSync(path.join(CORE, 'skills', s, 'SKILL.md'))) continue
  if (!fs.existsSync(path.join(skillsDir, s, 'SKILL.md'))) bad.push(`core skill not linked: .claude/skills/${s}`)
}
for (const s of fs.readdirSync(skillsDir)) {
  const p = path.join(skillsDir, s)
  const rel = `.claude/skills/${s}`
  if (LOCAL_SKILLS.has(s)) { if (fs.lstatSync(p).isSymbolicLink()) bad.push(`${rel} should be a real dir`); continue }
  if (!fs.lstatSync(p).isSymbolicLink()) { bad.push(`${rel} is a real dir; move it to core/skills/`); continue }
  if (path.isAbsolute(fs.readlinkSync(p))) bad.push(`${rel} is an absolute link`)
  if (!tracked.has(rel)) bad.push(`${rel} not tracked`)
  if (!fs.existsSync(path.join(p, 'SKILL.md')) || !fs.realpathSync(p).startsWith(CORE + path.sep)) bad.push(`${rel} does not resolve into core`)
}

// Agents and lints: tracked relative links into core/project-claude/.
for (const d of ['agents', 'lints']) {
  const p = path.join(REPO, '.claude', d), rel = `.claude/${d}`
  if (!fs.existsSync(p)) { bad.push(`${rel} missing`); continue }
  if (!fs.lstatSync(p).isSymbolicLink() || path.isAbsolute(fs.readlinkSync(p))) bad.push(`${rel} must be a relative link`)
  if (!tracked.has(rel)) bad.push(`${rel} not tracked`)
  if (fs.realpathSync(p) !== path.join(CORE, 'project-claude', d)) bad.push(`${rel} does not resolve to core/project-claude/${d}`)
}

assert.deepStrictEqual(bad, [], `.claude layout:\n  ${bad.join('\n  ')}`)
console.log('check-claude-layout: skills, agents and lints resolve into core from git')
