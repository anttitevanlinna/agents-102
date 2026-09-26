#!/usr/bin/env node
// instance-file.js — the judged-file path an eval instance records, repo-relative.
//
// Instances are shared history: an absolute path names one person's checkout
// and points nowhere on anyone else's. `repoRel` reads every form ever written
// (relative; absolute in this checkout; absolute in another one) and returns
// the repo-relative path. `--normalize` rewrites whole-value absolute paths in
// the corpus to repo-relative, leaving judges' prose untouched.
//
//   node curriculum/evals/scripts/instance-file.js --normalize
'use strict'
const fs = require('node:fs')
const path = require('node:path')

const REPO = path.resolve(__dirname, '..', '..', '..')
const DIR = path.join(REPO, 'curriculum', 'evals', 'instances')
// A JSON string value that is an absolute path into some agents-102 checkout.
const ABS_VALUE = /"\/(?:Users|home)\/[^"]*?\/agents-102\/([^"]*)"/g

function repoRel(repo, f) {
  if (!f) return null
  const s = String(f)
  if (!path.isAbsolute(s)) return s.split(path.sep).join('/')
  const r = path.relative(repo, s)
  if (!r.startsWith('..')) return r.split(path.sep).join('/')
  const i = s.lastIndexOf('/agents-102/')
  return i >= 0 ? s.slice(i + '/agents-102/'.length) : s
}

function normalize(dir = DIR) {
  let files = 0, values = 0
  for (const f of fs.readdirSync(dir).filter(f => f.endsWith('.json'))) {
    const p = path.join(dir, f)
    const t = fs.readFileSync(p, 'utf8')
    let n = 0
    const out = t.replace(ABS_VALUE, (_, rel) => { n++; return `"${rel}"` })
    if (n) { fs.writeFileSync(p, out); files++; values += n }
  }
  return { files, values }
}

module.exports = { repoRel, normalize }

if (require.main === module) {
  if (!process.argv.includes('--normalize')) { console.error('usage: instance-file.js --normalize'); process.exit(1) }
  const r = normalize()
  console.log(`normalized ${r.values} paths in ${r.files} instances`)
}
