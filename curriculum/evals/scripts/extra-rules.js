#!/usr/bin/env node
// extra-rules.js — rules injected from outside both repos.
//
// AGENTS_EXTRA_RULES = one or more folders (colon-separated) the user owns.
// Each holds `<surface>.md` (writing.md, student_facing.md, ...) whose text is
// ADDED to that surface's rules: read in full by writers (surface detector) and
// appended verbatim to judges' class briefs. No numbering, no index, no
// precedence. Nothing tracked in either repo names a folder; the env is set in
// the user's own settings.
//
// Usage:
//   node curriculum/evals/scripts/extra-rules.js --list      one line per file: <surface> <path>
//   node curriculum/evals/scripts/extra-rules.js <surface>   the paths for that surface
'use strict'
const fs = require('node:fs')
const path = require('node:path')

const extraDirs = (env = process.env.AGENTS_EXTRA_RULES || '') =>
  env.split(':').map(s => s.trim()).filter(Boolean)

const bare = s => s.replace(/^check_/, '').replace(/\.md$/, '')

function extraRules(surface, env) {
  const out = []
  for (const d of extraDirs(env)) {
    const p = path.join(d, `${bare(surface)}.md`)
    try { out.push({ path: p, text: fs.readFileSync(p, 'utf8') }) } catch {}
  }
  return out
}

function listAll(env) {
  const out = []
  for (const d of extraDirs(env)) {
    let files = []
    try { files = fs.readdirSync(d).filter(f => f.endsWith('.md')).sort() } catch {}
    for (const f of files) out.push({ surface: bare(f), path: path.join(d, f) })
  }
  return out
}

module.exports = { extraDirs, extraRules, listAll }

if (require.main === module) {
  const arg = process.argv[2]
  if (!arg) { console.error('usage: extra-rules.js --list | <surface>'); process.exit(1) }
  if (arg === '--list') for (const r of listAll()) console.log(`${r.surface} ${r.path}`)
  else for (const r of extraRules(arg)) console.log(r.path)
}
