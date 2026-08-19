#!/usr/bin/env node
// rule.js — T2 fetch: print one rule's body out of a compendium.
// The index (T1) carries leads; when a lead is marked ⚠ or reads ambiguous,
// this is the cheap way to get the carve-out without loading the whole file.
//
//   node curriculum/evals/scripts/rule.js student_facing 9
//   node curriculum/evals/scripts/rule.js writing 3 14 20
'use strict'
const fs = require('node:fs')
const path = require('node:path')
const { MEM } = require('./compendium-drift.js')
const { ruleBody } = require('./build-rule-index.js')

const [surface, ...ids] = process.argv.slice(2)
if (!surface || !ids.length) {
  console.error('usage: rule.js <surface> <N...>   e.g. rule.js student_facing 9')
  process.exit(2)
}
const file = path.join(MEM, `check_${surface}.md`)
if (!fs.existsSync(file)) {
  console.error(`no compendium for surface "${surface}". available: ` +
    fs.readdirSync(MEM).filter(f => /^check_/.test(f)).map(f => f.replace(/^check_|\.md$/g, '')).join(', '))
  process.exit(2)
}
const md = fs.readFileSync(file, 'utf8')
let missing = 0
for (const id of ids) {
  const body = ruleBody(md, String(id))
  if (!body) { console.error(`!! check_${surface}.md has no §${id}`); missing++; continue }
  console.log(body.trimEnd() + '\n')
}
process.exit(missing ? 1 : 0)
