'use strict'
// site/prompts.json and site/figures.json are tracked, generated from
// curriculum/prompts/ and curriculum/figures/. A commit that edits a registry
// source without the rebuilt JSON leaves the tracked file stale, and the next
// build anywhere (a customer's fresh clone included) dirties the vendor tree.
// Found on the Engineering Manager proving run, 2026-09-30: a frontmatter-only
// prompt edit shipped with a stale prompts.json and no gate noticed.
//
// A working-tree check cannot see this (every build rewrites the working copy),
// so scripts/check-generated-registries.js --staged compiles the STAGED sources
// and compares them with the STAGED JSON; .githooks/pre-commit runs it.
const { test } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const { execFileSync, spawnSync } = require('node:child_process')

const REPO = path.resolve(__dirname, '..')
const git = (cwd, ...a) => execFileSync('git', a, { cwd, stdio: ['ignore', 'pipe', 'pipe'] }).toString()

function repo() {
  const r = fs.mkdtempSync(path.join(os.tmpdir(), 'genreg-'))
  git(r, 'init', '-q'); git(r, 'config', 'user.email', 't@t'); git(r, 'config', 'user.name', 't')
  for (const d of ['scripts', 'curriculum/prompts', 'curriculum/figures', 'site']) fs.mkdirSync(path.join(r, d), { recursive: true })
  for (const f of ['compile-prompts.js', 'compile-figures.js', 'write-if-changed.js', 'check-generated-registries.js']) fs.copyFileSync(path.join(REPO, 'scripts', f), path.join(r, 'scripts', f))
  fs.symlinkSync(path.join(REPO, 'node_modules'), path.join(r, 'node_modules'))
  fs.writeFileSync(path.join(r, 'curriculum/prompts/p.md'), '---\nkey: p\nnote: one\n---\nPaste this.\n')
  fs.writeFileSync(path.join(r, 'curriculum/figures/f.md'), '<figure class="diagram">F</figure>\n')
  const { loadRegistry, writeRegistry } = require(path.join(r, 'scripts/compile-prompts.js'))
  writeRegistry(loadRegistry(path.join(r, 'curriculum/prompts')), path.join(r, 'site/prompts.json'))
  const { loadFigures, writeFigures } = require(path.join(r, 'scripts/compile-figures.js'))
  writeFigures(loadFigures(path.join(r, 'curriculum/figures')), path.join(r, 'site/figures.json'))
  git(r, 'add', '-A', '.', ':!node_modules'); git(r, 'commit', '-qm', 'init')
  return r
}
const check = r => spawnSync('node', ['scripts/check-generated-registries.js', '--staged'], { cwd: r, encoding: 'utf8' })

test('a staged prompt edit without the rebuilt prompts.json fails, naming the fix', () => {
  const r = repo()
  fs.writeFileSync(path.join(r, 'curriculum/prompts/p.md'), '---\nkey: p\nnote: two\n---\nPaste this.\n')
  git(r, 'add', 'curriculum/prompts/p.md')
  const res = check(r)
  assert.notEqual(res.status, 0)
  assert.match(res.stderr, /site\/prompts\.json.*stale/)
  assert.match(res.stderr, /compile-prompts\.js/)
})

test('the same edit staged with its rebuilt prompts.json passes', () => {
  const r = repo()
  fs.writeFileSync(path.join(r, 'curriculum/prompts/p.md'), '---\nkey: p\nnote: two\n---\nPaste this.\n')
  execFileSync('node', ['-e', "const c=require('./scripts/compile-prompts.js');c.writeRegistry(c.loadRegistry())"], { cwd: r })
  git(r, 'add', 'curriculum/prompts/p.md', 'site/prompts.json')
  assert.equal(check(r).status, 0, check(r).stderr)
})

test('the staged state decides, not the working tree', () => {
  const r = repo()
  fs.writeFileSync(path.join(r, 'curriculum/prompts/p.md'), '---\nkey: p\nnote: two\n---\nPaste this.\n')
  git(r, 'add', 'curriculum/prompts/p.md')
  execFileSync('node', ['-e', "const c=require('./scripts/compile-prompts.js');c.writeRegistry(c.loadRegistry())"], { cwd: r })  // rebuilt, not staged
  assert.notEqual(check(r).status, 0)
})

test('a staged figure edit without the rebuilt figures.json fails', () => {
  const r = repo()
  fs.writeFileSync(path.join(r, 'curriculum/figures/f.md'), '<figure class="diagram">G</figure>\n')
  git(r, 'add', 'curriculum/figures/f.md')
  const res = check(r)
  assert.notEqual(res.status, 0)
  assert.match(res.stderr, /site\/figures\.json.*stale/)
})

test('this repository\'s HEAD is consistent', () => {
  const res = spawnSync('node', ['scripts/check-generated-registries.js', '--ref', 'HEAD'], { cwd: REPO, encoding: 'utf8' })
  assert.equal(res.status, 0, res.stderr)
})
