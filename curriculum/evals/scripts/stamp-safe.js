#!/usr/bin/env node
// Does a body change since a recorded body_sha actually reach one class?
//
// `update-quality.sh`'s stale-verdict guard hashes the WHOLE file, while
// `scan-stale-classes.js` routes staleness per diff region. So a two-word repair
// re-owed every class, including the ones whose routing says they were never
// touched: one reworded sentence in a supplementary page cost four judge
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
const fs = require('node:fs')
const path = require('node:path')
const { parseHunks, buildLineMeta, changeTags, slideFileIds, expandedRouting, gitIo } = require('./scan-stale-classes.js')
const { inlinedAt, sha256 } = require('./content-sha.js')

function git(repo, args) {
  try { return execFileSync('git', args, { cwd: repo, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 }) }
  catch { return '' }
}

// The commit whose blob for `rel` hashes to `recorded`, or null. `--follow` so a
// rename does not read as "never existed". body_sha hashes the file with its
// slide files inlined (content-sha.js), so each version is inlined as committed;
// for a file with no slide includes that is its raw blob, as it always was.
function commitFor(repo, rel, recorded) {
  const commits = git(repo, ['log', '--format=%H', '--follow', '--', rel]).trim().split('\n').filter(Boolean)
  for (const c of commits) {
    const view = inlinedAt(repo, rel, c)
    if (view !== null && sha256(view) === recorded) return c
  }
  return null
}

function verdict(repo, rel, recorded, cls) {
  if (!/^[a-f0-9]{64}$/.test(recorded || '')) return 'UNKNOWN'
  const current = inlinedAt(repo, rel, null)
  if (current === null) return 'UNKNOWN'
  if (sha256(current) === recorded) return 'SAFE'          // nothing moved at all
  const commit = commitFor(repo, rel, recorded)
  if (!commit) return 'UNKNOWN'                            // unanchored: fail closed
  // A file with slide includes routes on its inlined diff, member slides included.
  const raw = fs.readFileSync(path.join(repo, rel), 'utf8')
  if (slideFileIds(raw).length) {
    const r = expandedRouting(rel, raw, commit, gitIo(repo))
    return r.own.has(cls) || r.member.has(cls) ? 'STALE' : 'SAFE'
  }
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
