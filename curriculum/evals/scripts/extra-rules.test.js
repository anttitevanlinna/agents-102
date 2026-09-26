#!/usr/bin/env node
'use strict'
const assert = require('node:assert')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const { execFileSync } = require('node:child_process')
const { extraRules, extraDirs } = require('./extra-rules.js')

const T = fs.mkdtempSync(path.join(os.tmpdir(), 'extra-rules-'))
const a = path.join(T, 'a'), b = path.join(T, 'b')
fs.mkdirSync(a); fs.mkdirSync(b)
fs.writeFileSync(path.join(a, 'writing.md'), 'Never say synergy.\n')
fs.writeFileSync(path.join(b, 'writing.md'), 'Say "Leverage", not "leverage".\n')
fs.writeFileSync(path.join(b, 'student_facing.md'), 'Examples use our warehouse domain.\n')

let n = 0
const t = (name, fn) => { fn(); n++; }

t('unset → no dirs, no rules', () => {
  assert.deepStrictEqual(extraDirs(''), [])
  assert.deepStrictEqual(extraRules('writing', ''), [])
})
t('one dir → its surface file', () => {
  const r = extraRules('writing', a)
  assert.strictEqual(r.length, 1)
  assert.match(r[0].text, /synergy/)
  assert.strictEqual(r[0].path, path.join(a, 'writing.md'))
})
t('colon list → every dir, in order', () => {
  const r = extraRules('writing', `${a}:${b}`)
  assert.deepStrictEqual(r.map(x => x.path), [path.join(a, 'writing.md'), path.join(b, 'writing.md')])
})
t('check_ prefix and .md accepted as surface', () => {
  assert.strictEqual(extraRules('check_student_facing.md', b).length, 1)
})
t('surface without a file → nothing', () => {
  assert.deepStrictEqual(extraRules('prompts', `${a}:${b}`), [])
})
t('missing dir → ignored, not thrown', () => {
  assert.deepStrictEqual(extraRules('writing', path.join(T, 'nope')), [])
})
t('CLI --list names surfaces per file', () => {
  const out = execFileSync('node', [path.join(__dirname, 'extra-rules.js'), '--list'],
    { env: { ...process.env, AGENTS_EXTRA_RULES: `${a}:${b}` }, encoding: 'utf8' })
  assert.match(out, /student_facing/)
  assert.strictEqual(out.trim().split('\n').length, 3)
})
t('class brief carries org rules verbatim for its compendia', () => {
  const out = execFileSync('node', [path.join(__dirname, 'derive-class-brief.js'),
    'curriculum/evals/bench/fixtures/writing-5plant.md', 'writing', '--stdout'],
    { cwd: path.resolve(__dirname, '../../..'), env: { ...process.env, AGENTS_EXTRA_RULES: b }, encoding: 'utf8' })
  assert.match(out, /Org rules/)
  assert.match(out, /Say "Leverage", not "leverage"\./)
})
t('class brief --stdout is not truncated on a pipe', () => {
  const out = execFileSync('node', [path.join(__dirname, 'derive-class-brief.js'),
    'curriculum/evals/bench/fixtures/writing-5plant.md', 'writing', '--stdout'],
    { cwd: path.resolve(__dirname, '../../..'), encoding: 'utf8', maxBuffer: 1 << 26 })
  const { build } = require('./derive-class-brief.js')
  const cwd = process.cwd(); process.chdir(path.resolve(__dirname, '../../..'))
  const want = build('curriculum/evals/bench/fixtures/writing-5plant.md', 'writing').text
  process.chdir(cwd)
  assert.strictEqual(out.length, want.length)
})
t('class brief without the env → no org section', () => {
  const env = { ...process.env }; delete env.AGENTS_EXTRA_RULES
  const out = execFileSync('node', [path.join(__dirname, 'derive-class-brief.js'),
    'curriculum/evals/bench/fixtures/writing-5plant.md', 'writing', '--stdout'],
    { cwd: path.resolve(__dirname, '../../..'), env, encoding: 'utf8' })
  assert.doesNotMatch(out, /Org rules/)
})
t('class brief keeps explicit judge-owned template criteria in scope', () => {
  const out = execFileSync('node', [path.join(__dirname, 'derive-class-brief.js'),
    'curriculum/evals/bench/fixtures/writing-5plant.md', 'writing', '--stdout'],
    { cwd: path.resolve(__dirname, '../../..'), encoding: 'utf8', maxBuffer: 1 << 26 })
  assert.match(out, /plus every explicit judge-owned criterion in your class template/)
})

fs.rmSync(T, { recursive: true, force: true })
console.log(`extra-rules: ${n} passed`)
