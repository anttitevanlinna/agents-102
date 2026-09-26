// Write a generated file only when its content changed, via a temp file and an
// atomic rename. Builds share tracked outputs (site/prompts.json, figures.json)
// and tests build in parallel: an identical rewrite would dirty nothing but
// still race, and a plain write can be read half-done by a sibling.
'use strict'
const fs = require('node:fs')
const path = require('node:path')

function writeIfChanged(file, content) {
  try { if (fs.readFileSync(file, 'utf8') === content) return false } catch {}
  fs.mkdirSync(path.dirname(file), { recursive: true })
  const tmp = `${file}.${process.pid}.${Date.now()}.tmp`
  fs.writeFileSync(tmp, content)
  fs.renameSync(tmp, file)
  return true
}

module.exports = { writeIfChanged }
