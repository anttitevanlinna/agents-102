#!/usr/bin/env node
// Tests for stamp-safe.js — per-class routing of a whole-file hash mismatch.
// The property under test is asymmetric: letting a genuinely stale verdict stamp
// is a fabricated PASS, while re-firing a judge that had nothing to re-read costs
// only tokens. So every uncertain fork must answer UNKNOWN, and the caller treats
// UNKNOWN as STALE.
'use strict'
const assert = require('node:assert')
const crypto = require('node:crypto')
const { execFileSync } = require('node:child_process')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const { verdict } = require('./stamp-safe.js')

let n = 0
function test(name, fn) { fn(); n++; console.log(`ok ${n} - ${name}`) }
const sha256 = t => crypto.createHash('sha256').update(t, 'utf8').digest('hex')

const BODY = `# A lecture

## A slide

- A student reads this line.
- And this one.

<!-- maintainer -->

**Notes:** for the maintainer only.
`

function repo() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'stamp-safe-'))
  const rel = 'curriculum/lectures/a-lecture.md'
  fs.mkdirSync(path.join(root, path.dirname(rel)), { recursive: true })
  fs.writeFileSync(path.join(root, rel), BODY)
  const g = args => execFileSync('git', args, { cwd: root, encoding: 'utf8' })
  g(['init', '-q'])
  g(['config', 'user.email', 't@t.t']); g(['config', 'user.name', 't'])
  g(['add', '-A']); g(['commit', '-qm', 'first'])
  return { root, rel, write: t => fs.writeFileSync(path.join(root, rel), t) }
}

test('unchanged file stamps SAFE for every class', () => {
  const { root, rel } = repo()
  assert.strictEqual(verdict(root, rel, sha256(BODY), 'writing'), 'SAFE')
  assert.strictEqual(verdict(root, rel, sha256(BODY), 'slides'), 'SAFE')
})

// The whole point: a maintainer-region edit routes to no class, so the recorded
// verdict still describes every body the judges read.
test('maintainer-only edit is SAFE despite a changed whole-file hash', () => {
  const { root, rel, write } = repo()
  write(BODY.replace('for the maintainer only.', 'for the maintainer only, revised.'))
  assert.strictEqual(verdict(root, rel, sha256(BODY), 'writing'), 'SAFE')
})

test('a body edit is STALE for the class it routes to', () => {
  const { root, rel, write } = repo()
  write(BODY.replace('A student reads this line.', 'A student reads this rewritten line.'))
  assert.strictEqual(verdict(root, rel, sha256(BODY), 'writing'), 'STALE')
})

// Fail-closed forks. An unanchored hash is the case that fabricates evidence.
test('a sha matching no committed version is UNKNOWN, never SAFE', () => {
  const { root, rel } = repo()
  assert.strictEqual(verdict(root, rel, 'a'.repeat(64), 'writing'), 'UNKNOWN')
})

test('a malformed sha is UNKNOWN, never SAFE', () => {
  const { root, rel } = repo()
  assert.strictEqual(verdict(root, rel, 'not-a-hash', 'writing'), 'UNKNOWN')
  assert.strictEqual(verdict(root, rel, '', 'writing'), 'UNKNOWN')
})

test('a missing file is UNKNOWN, never SAFE', () => {
  const { root } = repo()
  assert.strictEqual(verdict(root, 'curriculum/lectures/gone.md', sha256(BODY), 'writing'), 'UNKNOWN')
})

console.log(`1..${n}`)
