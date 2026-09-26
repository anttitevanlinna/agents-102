#!/usr/bin/env node
// AGENTS_OUTPUT_DIR: the build writes <dir>/<customer>/… instead of this repo's
// site/clients/<customer>/…, so a customer Git repository can hold its own
// generated output next to its branding. Unset → site/clients/ as before.
'use strict'
const { test } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const { execFileSync } = require('node:child_process')

const REPO = path.resolve(__dirname, '..')
const SLUG = 'zz-output-root-test'
const VENDOR_OUT = path.join(REPO, 'site/clients', SLUG)
const status = () => execFileSync('git', ['status', '--porcelain', '--untracked-files=all'], { cwd: REPO, encoding: 'utf8' })
const build = (args, env) => execFileSync('node', ['scripts/build-workbook.js', ...args],
  { cwd: REPO, env: { ...process.env, ...env }, stdio: 'pipe', encoding: 'utf8' })

function customerRepo(t) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'customer-'))
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }))
  execFileSync('git', ['init', '-q'], { cwd: dir })
  return dir
}

test('output lands in the customer repository and leaves the vendor tree untouched', t => {
  assert.equal(fs.existsSync(VENDOR_OUT), false, `scratch dir already exists: ${VENDOR_OUT}`)
  const cust = customerRepo(t)
  const out = path.join(cust, 'delivery')
  const before = status()
  build([SLUG, 'claude-basics'], { AGENTS_OUTPUT_DIR: out })
  assert.ok(fs.existsSync(path.join(out, SLUG, 'index.html')), 'customer hub')
  assert.ok(fs.existsSync(path.join(out, SLUG, 'claude-basics/index.html')), 'workbook')
  assert.equal(fs.existsSync(VENDOR_OUT), false, 'nothing under vendor site/clients/')
  assert.equal(status(), before, 'vendor git status unchanged')
})

test('a personalised build into a customer repo follows that repo\'s ignore rules', t => {
  const cust = customerRepo(t)
  const out = path.join(cust, 'delivery')
  assert.throws(() => build(['vip-x', 'agentic-engineering-101', '--theory', '--for', 'A B'], { AGENTS_OUTPUT_DIR: out }),
    /git does NOT ignore/, 'tracked customer path refused')
  assert.equal(fs.existsSync(path.join(out, 'vip-x')), false, 'nothing written on refusal')
  fs.writeFileSync(path.join(cust, '.gitignore'), 'delivery/vip-*/\n')
  build(['vip-x', 'agentic-engineering-101', '--theory', '--for', 'A B'], { AGENTS_OUTPUT_DIR: out })
  assert.ok(fs.existsSync(path.join(out, 'vip-x/agentic-engineering-101/theory-handbook.html')))
})

test('outside any Git repository a personalised build has no commit path and is allowed', t => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'nogit-'))
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }))
  build(['vip-y', 'agentic-engineering-101', '--theory', '--for', 'A B'], { AGENTS_OUTPUT_DIR: dir })
  assert.ok(fs.existsSync(path.join(dir, 'vip-y/agentic-engineering-101/theory-handbook.html')))
})

test('the Agents 101 starter tarball builds its handbook in its own stage, not under any output root', t => {
  const out = fs.mkdtempSync(path.join(os.tmpdir(), 'tar-'))
  t.after(() => fs.rmSync(out, { recursive: true, force: true }))
  const before = status()
  execFileSync('scripts/build-agents-101-starter-tarball.sh', [path.join(out, 'a.tar.gz')],
    { cwd: REPO, env: { ...process.env, AGENTS_OUTPUT_DIR: path.join(out, 'elsewhere') }, stdio: 'pipe' })
  const list = execFileSync('tar', ['tzf', path.join(out, 'a.tar.gz')], { encoding: 'utf8' })
  assert.match(list, /agents-101-handbook\.html/)
  assert.equal(fs.existsSync(path.join(out, 'elsewhere')), false, 'caller output root untouched')
  assert.equal(status(), before, 'vendor git status unchanged')
})
