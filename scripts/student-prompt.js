#!/usr/bin/env node
// The student's copy of one registry prompt: the body, under the frontmatter
// fields that say how to run it. A prompt file's other fields are the authoring
// record (origin, the requires/produces graph, notes to the next author) and
// stay in the registry.
//
//   node scripts/student-prompt.js curriculum/prompts/<key>.md > <out>
'use strict'
const fs = require('fs')

const STUDENT_FIELDS = ['key', 'dest', 'context', 'runtime', 'permission-mode']

function studentPrompt(src) {
  const m = /^---\n([\s\S]*?)\n---\n/.exec(src)
  if (!m) throw new Error('no frontmatter block')
  const kept = []
  let keeping = false
  for (const line of m[1].split('\n')) {
    const top = /^([a-z-]+):(.*)$/.exec(line)
    if (top) {
      keeping = STUDENT_FIELDS.includes(top[1])
      // A kept field is a one-line scalar; a block value would smuggle its
      // continuation lines past the allowlist reader on the other side.
      if (keeping && !top[2].trim()) throw new Error(`field "${top[1]}" is not a one-line value`)
      if (keeping) kept.push(line)
    } else if (keeping && line.trim()) {
      throw new Error(`continuation line under a kept field: ${line}`)
    }
  }
  if (!kept.some(l => l.startsWith('key:'))) throw new Error('no key field')
  return '---\n' + kept.join('\n') + '\n---\n' + src.slice(m[0].length)
}

module.exports = { studentPrompt, STUDENT_FIELDS }

if (require.main === module) {
  const file = process.argv[2]
  try { process.stdout.write(studentPrompt(fs.readFileSync(file, 'utf8'))) }
  catch (e) { console.error(`student-prompt: ${file}: ${e.message}`); process.exit(1) }
}
