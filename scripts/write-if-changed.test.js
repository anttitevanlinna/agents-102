#!/usr/bin/env node
// Shared generated files (site/prompts.json, figures.json) are rewritten by every
// build, and tests build in parallel. An identical rewrite must not touch the
// file, and a real one must land whole or not at all.
'use strict'
const { test } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const crypto = require('node:crypto')
const { execFileSync } = require('node:child_process')
const { writeIfChanged } = require('./write-if-changed.js')

test('identical content leaves the file untouched', () => {
  const d = fs.mkdtempSync(path.join(os.tmpdir(), 'wic-'))
  const f = path.join(d, 'a.json')
  assert.equal(writeIfChanged(f, 'x\n'), true)
  const before = fs.statSync(f).mtimeMs
  fs.utimesSync(f, new Date(0), new Date(0))
  assert.equal(writeIfChanged(f, 'x\n'), false)
  assert.equal(fs.statSync(f).mtimeMs, 0, 'not rewritten')
  assert.ok(before > 0)
})

test('changed content replaces the file and leaves no temp file behind', () => {
  const d = fs.mkdtempSync(path.join(os.tmpdir(), 'wic-'))
  const f = path.join(d, 'a.json')
  writeIfChanged(f, 'x\n')
  assert.equal(writeIfChanged(f, 'y\n'), true)
  assert.equal(fs.readFileSync(f, 'utf8'), 'y\n')
  assert.deepEqual(fs.readdirSync(d), ['a.json'])
})

test('a tarball script writes where it is told, not to the shared repo-root file', () => {
  const repo = path.resolve(__dirname, '..')
  const shared = path.join(repo, 'agents-101-starter.tar.gz')
  const before = fs.existsSync(shared) ? fs.statSync(shared).mtimeMs : null
  const out = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'tar-')), 'starter.tar.gz')
  execFileSync('scripts/build-agents-101-starter-tarball.sh', [out], { cwd: repo, stdio: 'pipe' })
  assert.ok(fs.statSync(out).size > 0)
  assert.equal(fs.existsSync(shared) ? fs.statSync(shared).mtimeMs : null, before, 'repo-root tarball untouched')
})

test('the Agents 101 starter tarball is reproducible from unchanged inputs', t => {
  const repo = path.resolve(__dirname, '..')
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'tar-repro-'))
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }))
  const first = path.join(dir, 'first.tar.gz')
  const second = path.join(dir, 'second.tar.gz')
  const digest = file => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex')

  execFileSync('scripts/build-agents-101-starter-tarball.sh', [first], { cwd: repo, stdio: 'pipe' })
  execFileSync('scripts/build-agents-101-starter-tarball.sh', [second], { cwd: repo, stdio: 'pipe' })

  assert.equal(digest(second), digest(first))
})
