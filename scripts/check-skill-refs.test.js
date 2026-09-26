#!/usr/bin/env node
// Every `/name` a SKILL.md tells the agent to invoke must be a skill that exists.
// A retired skill left named in another skill's steps sends the agent to nothing.
'use strict'
const assert = require('node:assert')
const fs = require('node:fs')
const path = require('node:path')

const REPO = path.resolve(__dirname, '..')
const CORE = process.env.AGENTS_CORE_DIR || path.join(REPO, '..', 'agents-102-core')
const DIRS = [path.join(REPO, '.claude', 'skills'), path.join(CORE, 'skills')]
// Built-in commands, and skills that live in another repo on purpose.
const ELSEWHERE = new Set(['clear', 'compact', 'article'])
const ROOT_DIRS = new Set(['tmp', 'home', 'usr', 'etc'])

const known = new Set(ELSEWHERE)
const files = []
for (const d of DIRS) for (const s of fs.readdirSync(d)) {
  const f = path.join(d, s, 'SKILL.md')
  if (fs.existsSync(f) && !files.some(g => fs.realpathSync(g) === fs.realpathSync(f))) { known.add(s); files.push(f) }
}
assert.ok(files.length > 5, `found ${files.length} skills; wrong layout?`)

const dead = []
for (const f of files) {
  fs.readFileSync(f, 'utf8').split('\n').forEach((l, i) => {
    for (const m of l.matchAll(/(?<=^|[\s(])`\/([a-z][a-z0-9-]+)(?=[`\s])/g))
      if (!known.has(m[1]) && !ROOT_DIRS.has(m[1])) dead.push(`${path.relative(path.dirname(REPO), f)}:${i + 1} /${m[1]}`)
  })
}
assert.deepStrictEqual(dead, [], `SKILL.md names skills that do not exist:\n  ${dead.join('\n  ')}`)
console.log(`check-skill-refs: ${files.length} skills, no dead references`)
