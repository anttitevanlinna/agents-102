#!/usr/bin/env node
'use strict'
// content-sha.js — the sha a sim trace binds to: sha256 of a curriculum file
// with its slide files (`[T](slides/<id>.md)`) inlined, i.e. the text the
// persona actually walked. A file with no slide includes hashes exactly as its
// raw bytes did, so every trace bound before slide files existed stays bound.
// Shared by bind-trace.js (writes content_sha), sim-freshness.js (checks it)
// and update-quality.sh (rebinds it across a stamp).
//
// Usage: node curriculum/evals/scripts/content-sha.js <file>
const crypto = require('node:crypto')
const path = require('node:path')
const { readCurriculumMd } = require('../../../scripts/read-curriculum.js')

const sha256 = t => crypto.createHash('sha256').update(t, 'utf8').digest('hex')
const contentSha = abs => sha256(readCurriculumMd(path.resolve(abs)))

// The same view at a commit: `rel` as committed there, its slide files as
// committed there. commit null = the working tree. null when either is missing
// (a slide file absent at that commit means no version of this view existed).
function inlinedAt(repo, rel, commit) {
  const { execFileSync } = require('node:child_process')
  const fs = require('node:fs')
  const CR = require('../../../site/layouts/curriculum.js')
  const read = p => {
    if (commit === null) { try { return fs.readFileSync(path.join(repo, p), 'utf8') } catch { return null } }
    try { return execFileSync('git', ['show', `${commit}:${p}`], { cwd: repo, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024, stdio: ['ignore', 'pipe', 'ignore'] }) } catch { return null }
  }
  const raw = read(rel)
  if (raw === null) return null
  try { return CR.inlineSlideFiles(raw, id => read(`curriculum/slides/${id}.md`)) } catch { return null }
}

module.exports = { contentSha, inlinedAt, sha256 }

if (require.main === module) {
  const f = process.argv[2]
  if (!f) { console.error('Usage: content-sha.js <file>'); process.exit(2) }
  process.stdout.write(contentSha(f) + '\n')
}
