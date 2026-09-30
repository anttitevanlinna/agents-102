'use strict'
// Maintainer 2026-09-30: prompts written for a simulation training (a generated
// test run, never taught) skip the prompt-ok card and the pre-commit y/N. The
// maintainer reads them when the training is promoted, which is the edit that
// removes `simulation: true` from its registry entry. A prompt already
// committed under a taught training stays gated even if its origin is edited.
const { test } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const { execFileSync, spawnSync } = require('node:child_process')

const SCRIPT = path.join(__dirname, 'prompt-sim-exempt.js')
const git = (cwd, ...a) => execFileSync('git', a, { cwd, stdio: ['ignore', 'pipe', 'pipe'] }).toString()
const prompt = (origin, body = 'Paste this.') => `---\nkey: p\norigin: ${origin}\n---\n${body}\n`

function repo() {
  const r = fs.mkdtempSync(path.join(os.tmpdir(), 'simx-'))
  git(r, 'init', '-q'); git(r, 'config', 'user.email', 't@t'); git(r, 'config', 'user.name', 't')
  fs.mkdirSync(path.join(r, 'site/layouts'), { recursive: true })
  fs.mkdirSync(path.join(r, 'curriculum/prompts'), { recursive: true })
  fs.writeFileSync(path.join(r, 'site/layouts/curriculum.js'),
    "module.exports = { TRAININGS: { sim: { status: 'draft', simulation: true }, live: {}, draft: { status: 'draft' } } }\n")
  return r
}
const exempt = (r, args, input) => spawnSync('node', [SCRIPT, ...args], { cwd: r, input }).status === 0

test('a new prompt whose origin is a simulation training is exempt; taught and plain-draft trainings are not', () => {
  const r = repo()
  assert.equal(exempt(r, ['curriculum/prompts/p.md', '--stdin'], prompt('sim/m1')), true)
  assert.equal(exempt(r, ['curriculum/prompts/p.md', '--stdin'], prompt('live/m1')), false)
  assert.equal(exempt(r, ['curriculum/prompts/p.md', '--stdin'], prompt('draft/m1')), false, 'draft alone is not a simulation')
  assert.equal(exempt(r, ['curriculum/prompts/p.md', '--stdin'], 'no frontmatter\n'), false)
  assert.equal(exempt(r, ['curriculum/prompts/p.md', '--stdin'], prompt('nope/m1')), false)
})

test('a prompt committed under a taught training stays gated even after its origin is rewritten', () => {
  const r = repo()
  fs.writeFileSync(path.join(r, 'curriculum/prompts/p.md'), prompt('live/m1'))
  git(r, 'add', '-A'); git(r, 'commit', '-qm', 'init')
  fs.writeFileSync(path.join(r, 'curriculum/prompts/p.md'), prompt('sim/m1', 'Edited.'))
  assert.equal(exempt(r, ['curriculum/prompts/p.md']), false, 'on disk')
  git(r, 'add', '-A')
  assert.equal(exempt(r, ['curriculum/prompts/p.md', '--staged']), false, 'staged')
})

test('a committed simulation prompt stays exempt for later edits, read from disk or the index', () => {
  const r = repo()
  fs.writeFileSync(path.join(r, 'curriculum/prompts/p.md'), prompt('sim/m1'))
  git(r, 'add', '-A'); git(r, 'commit', '-qm', 'init')
  fs.writeFileSync(path.join(r, 'curriculum/prompts/p.md'), prompt('sim/m1', 'Edited.'))
  assert.equal(exempt(r, ['curriculum/prompts/p.md']), true)
  git(r, 'add', '-A')
  assert.equal(exempt(r, ['curriculum/prompts/p.md', '--staged']), true)
})

test('no registry in the tree means no exemption', () => {
  const r = repo()
  fs.rmSync(path.join(r, 'site'), { recursive: true })
  assert.equal(exempt(r, ['curriculum/prompts/p.md', '--stdin'], prompt('sim/m1')), false)
})
