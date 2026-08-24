#!/usr/bin/env node
// Tests for check-trace-names.js.
//
// The asymmetry that shapes every case: renaming a trace that should have been
// left alone DESTROYS data — two customer-variant personas collapse onto one
// name and one is gone — while leaving a duplicate in place costs only a
// double-count. So the gate renames a stem only when its tail IS the slug it
// resolves to, and everything else is reported rather than touched.
'use strict'
const assert = require('node:assert')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const { execFileSync } = require('node:child_process')
const { scan } = require('./check-trace-names.js')

let n = 0
function test(name, fn) { fn(); n++; console.log(`ok ${n} - ${name}`) }

const BODY = '# T\n\nStudent body a judge would read.\n\n<!-- maintainer -->\n**Quality:** writing PASS\n'

function repo() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'trace-names-'))
  const w = (rel, body) => {
    fs.mkdirSync(path.join(root, path.dirname(rel)), { recursive: true })
    fs.writeFileSync(path.join(root, rel), body)
  }
  w('curriculum/trainings/agentic-engineering-101/learn-from-the-test.md', BODY)
  w('curriculum/trainings/agentic-engineering-101/getting-going.md', `${BODY}\n[Ex](exercises/fork-the-worktree.md)\n`)
  w('curriculum/trainings/agents-101/getting-going.md', BODY)
  w('curriculum/exercises/fork-the-worktree.md', BODY)
  fs.mkdirSync(path.join(root, 'curriculum/evals/sim-cache'), { recursive: true })
  const g = a => execFileSync('git', a, { cwd: root, encoding: 'utf8' })
  g(['init', '-q']); g(['config', 'user.email', 't@t']); g(['config', 'user.name', 't'])
  g(['add', '-A']); g(['commit', '-qm', 'first'])
  return root
}

function trace(root, name, obj = { phases: [] }) {
  fs.writeFileSync(path.join(root, 'curriculum/evals/sim-cache', name), JSON.stringify(obj))
}

test('a canonical name is clean', () => {
  const root = repo()
  trace(root, 'ae101--module--learn-from-the-test.persona.json')
  const { drift } = scan(root)
  assert.strictEqual(drift.length, 0)
})

test('a bare slug is drift, and the wanted name carries training and surface type', () => {
  const root = repo()
  trace(root, 'learn-from-the-test.persona.json')
  const { drift } = scan(root)
  assert.strictEqual(drift.length, 1)
  assert.strictEqual(drift[0].want, 'ae101--module--learn-from-the-test.persona.json')
})

test('a half-migrated <training>--<slug> is drift too', () => {
  const root = repo()
  trace(root, 'ae101--learn-from-the-test.behavior.json')
  const { drift } = scan(root)
  assert.strictEqual(drift[0].want, 'ae101--module--learn-from-the-test.behavior.json')
})

test('surface type comes from the directory, so a shared exercise is not a module', () => {
  const root = repo()
  trace(root, 'fork-the-worktree.persona.json')
  const { drift } = scan(root)
  assert.strictEqual(drift[0].want, 'ae101--exercise--fork-the-worktree.persona.json')
})

test('a customer-variant trace is reported, never renamed', () => {
  // The whole point: `autumn-` and `northwind-` are two personas walking one
  // file. Renaming both to the canonical name deletes one of them.
  const root = repo()
  trace(root, 'ae101--autumn-learn-from-the-test.persona.json')
  trace(root, 'ae101--northwind-learn-from-the-test.persona.json')
  const { drift, variants } = scan(root)
  assert.strictEqual(drift.length, 0, 'a variant must never be queued for rename')
  assert.strictEqual(variants.length, 2)
  assert.ok(variants.every(v => v.of === 'learn-from-the-test'))
})

test('a same-slug trace resolves to the training it names, not the first on disk', () => {
  const root = repo()
  trace(root, 'agents-101--getting-going.persona.json')
  const { drift } = scan(root)
  assert.strictEqual(drift[0].want, 'agents-101--module--getting-going.persona.json',
    'must not be renamed into ae101, which owns the alphabetically-first getting-going')
})

test('an orphan is skipped, not renamed to a guess', () => {
  const root = repo()
  trace(root, 'ae101--module--nothing-of-the-kind.persona.json')
  const { drift, skipped } = scan(root)
  assert.strictEqual(drift.length, 0)
  assert.strictEqual(skipped.length, 1)
  assert.match(skipped[0].reason, /orphaned/)
})

test('a filename off the <stem>.<class>.json shape is skipped, never crashes', () => {
  const root = repo()
  trace(root, 'cookbook-for-agent-system-design.json')
  const { drift, skipped } = scan(root)
  assert.strictEqual(drift.length, 0)
  assert.match(skipped[0].reason, /behavior\|persona/)
})

test('--fix collapses duplicates newest-wins and leaves one canonical file', () => {
  const root = repo()
  const g = a => execFileSync('git', a, { cwd: root, encoding: 'utf8' })
  trace(root, 'learn-from-the-test.persona.json', { phases: [], marker: 'old' })
  g(['add', '-A']); g(['commit', '-qm', 'old trace'])
  trace(root, 'ae101--learn-from-the-test.persona.json', { phases: [], marker: 'new' })
  g(['add', '-A']); g(['commit', '-qm', 'newer trace'])

  const { applyFix } = require('./check-trace-names.js').__test || {}
  // Drive through main() so the real CLI path is what is tested.
  const out = execFileSync('node', ['curriculum/evals/scripts/check-trace-names.js', '--fix', '--repo', root],
    { cwd: path.join(__dirname, '..', '..', '..'), encoding: 'utf8' })
  assert.match(out, /1 renamed · 1 dropped/)

  const left = fs.readdirSync(path.join(root, 'curriculum/evals/sim-cache'))
  assert.deepStrictEqual(left, ['ae101--module--learn-from-the-test.persona.json'])
  const kept = JSON.parse(fs.readFileSync(path.join(root, 'curriculum/evals/sim-cache', left[0]), 'utf8'))
  assert.strictEqual(kept.marker, 'new', 'the newer commit must win')
  assert.ok(applyFix === undefined || typeof applyFix === 'function')
})

console.log(`\n1..${n}`)
