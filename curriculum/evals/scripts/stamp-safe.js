#!/usr/bin/env node
// Does a body change since a recorded body_sha actually reach one class?
//
// `update-quality.sh`'s stale-verdict guard hashes the WHOLE file, while
// `scan-stale-classes.js` routes staleness per diff region. So a two-word repair
// re-owed every class, including the ones whose routing says they were never
// touched: one reworded sentence in `clean-code-is-steering` cost four judge
// runs, two of which had nothing to re-read. The scanner already computes exactly
// what the stamper needs.
//
// Contract, and it fails closed at every fork:
//   SAFE    the recorded body is a committed version of this file, and the diff
//           to the current body routes to no class / not to this one. Stamp.
//   STALE   the diff reaches this class. Re-fire, then stamp.
//   UNKNOWN the recorded sha names no committed version of this file, so there is
//           nothing to diff against. Caller must treat this exactly like STALE:
//           an unanchored hash is the case where a cache fabricates evidence
//           rather than merely going missing.
'use strict'
const { execFileSync } = require('node:child_process')
const crypto = require('node:crypto')
const fs = require('node:fs')
const path = require('node:path')
const { parseHunks, buildLineMeta, changeTags } = require('./scan-stale-classes.js')

const sha256 = t => crypto.createHash('sha256').update(t, 'utf8').digest('hex')

function git(repo, args) {
  try { return execFileSync('git', args, { cwd: repo, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 }) }
  catch { return '' }
}

// The commit whose blob for `rel` hashes to `recorded`, or null. `--follow` so a
// rename does not read as "never existed".
function commitFor(repo, rel, recorded) {
  const commits = git(repo, ['log', '--format=%H', '--follow', '--', rel]).trim().split('\n').filter(Boolean)
  for (const c of commits) {
    const blob = git(repo, ['show', `${c}:${rel}`])
    if (blob && sha256(blob) === recorded) return c
  }
  return null
}

function verdict(repo, rel, recorded, cls) {
  if (!/^[a-f0-9]{64}$/.test(recorded || '')) return 'UNKNOWN'
  let current
  try { current = fs.readFileSync(path.join(repo, rel), 'utf8') } catch { return 'UNKNOWN' }
  if (sha256(current) === recorded) return 'SAFE'          // nothing moved at all
  const commit = commitFor(repo, rel, recorded)
  if (!commit) return 'UNKNOWN'                            // unanchored: fail closed
  const { tags } = changeTags(buildLineMeta(current), parseHunks(git(repo, ['diff', commit, '--', rel])))
  return tags.has(cls) ? 'STALE' : 'SAFE'
}

module.exports = { verdict, commitFor }

if (require.main === module) {
  const [rel, recorded, cls] = process.argv.slice(2)
  if (!rel || !recorded || !cls) {
    console.error('usage: stamp-safe.js <repo-relative-file> <recorded-sha256> <class>')
    process.exit(2)
  }
  const repo = git(process.cwd(), ['rev-parse', '--show-toplevel']).trim() || process.cwd()
  process.stdout.write(verdict(repo, rel, recorded, cls) + '\n')
}
