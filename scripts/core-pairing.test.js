'use strict'
// Each public worktree must see its own private core. The tracked links
// (skills, agents, sim-cache) resolve ../agents-102-core, so two public
// worktrees in one folder share a core: a customer trace written from one
// fails check-trace-names in the other, or is read as the other's evidence.
const { test } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const { execFileSync, spawnSync } = require('node:child_process')

const HELPER = path.join(__dirname, 'pair-worktree.sh')
const BIND = path.join(__dirname, '..', 'curriculum', 'evals', 'scripts', 'bind-trace.js')
const { pairing } = require('./core-pairing.js')

const git = (dir, ...args) => execFileSync('git', ['-C', dir, ...args], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] })
const real = p => fs.realpathSync(p)

// A primary public + core clone side by side, shaped like the real pair.
function primaries() {
  const base = real(fs.mkdtempSync(path.join(os.tmpdir(), 'pairing-')))
  const pub = path.join(base, 'agents-102'), core = path.join(base, 'agents-102-core')
  for (const d of [pub, core]) {
    fs.mkdirSync(d)
    git(d, 'init', '-q', '-b', 'main')
    git(d, 'config', 'user.email', 't@example.com')
    git(d, 'config', 'user.name', 't')
  }
  fs.mkdirSync(path.join(core, 'evals', 'sim-cache'), { recursive: true })
  fs.writeFileSync(path.join(core, 'evals', 'sim-cache', '.keep'), '')
  git(core, 'add', '.'); git(core, 'commit', '-qm', 'core')
  fs.mkdirSync(path.join(pub, 'curriculum', 'evals'), { recursive: true })
  fs.symlinkSync('../../../agents-102-core/evals/sim-cache', path.join(pub, 'curriculum', 'evals', 'sim-cache'))
  fs.writeFileSync(path.join(pub, 'curriculum', 'page.md'), '# page\n')
  git(pub, 'add', '.'); git(pub, 'commit', '-qm', 'public')
  return { base, pub, core }
}

const pair = (pub, root, branch, env = {}) =>
  spawnSync('bash', [HELPER, root, branch], { cwd: pub, encoding: 'utf8', env: { ...process.env, AGENTS_CORE_DIR: '', ...env } })

test('two pairs made by the helper cannot see each other\'s traces', () => {
  const { base, pub } = primaries()
  const a = path.join(base, 'ws-a'), b = path.join(base, 'ws-b')
  for (const [root, br] of [[a, 'a'], [b, 'b']]) {
    const r = pair(pub, root, br)
    assert.equal(r.status, 0, r.stderr)
  }
  assert.equal(git(path.join(a, 'agents-102-core'), 'rev-parse', '--abbrev-ref', 'HEAD').trim(), 'a-core')
  fs.writeFileSync(path.join(a, 'agents-102', 'curriculum', 'evals', 'sim-cache', 'x.persona.json'), '{}')
  assert.ok(fs.existsSync(path.join(a, 'agents-102-core', 'evals', 'sim-cache', 'x.persona.json')))
  assert.ok(!fs.existsSync(path.join(b, 'agents-102', 'curriculum', 'evals', 'sim-cache', 'x.persona.json')))
  assert.ok(!fs.existsSync(path.join(base, 'agents-102-core', 'evals', 'sim-cache', 'x.persona.json')))
  for (const root of [a, b]) {
    const p = pairing(path.join(root, 'agents-102'), {})
    assert.equal(p.core, path.join(root, 'agents-102-core'))
    assert.deepEqual(p.problems, [])
  }
})

test('the helper refuses a pair root that already holds something', () => {
  const { base, pub } = primaries()
  const root = path.join(base, 'busy')
  fs.mkdirSync(root); fs.writeFileSync(path.join(root, 'x'), '')
  const r = pair(pub, root, 'busy')
  assert.notEqual(r.status, 0)
  assert.match(r.stderr, /not empty/)
})

test('a second public worktree beside a pair is reported as sharing its core', () => {
  const { base, pub } = primaries()
  const a = path.join(base, 'ws-a')
  assert.equal(pair(pub, a, 'a').status, 0)
  git(pub, 'worktree', 'add', '-q', path.join(a, 'agents-102-fixes'), '-b', 'fixes', 'main')
  const p = pairing(path.join(a, 'agents-102'), {})
  assert.equal(p.problems.length, 1)
  assert.match(p.problems[0], /agents-102-fixes/)
  assert.deepEqual(pairing(path.join(base, 'agents-102'), {}).problems, [])
})

test('AGENTS_CORE_DIR naming a different core than the links is reported', () => {
  const { base, pub } = primaries()
  const a = path.join(base, 'ws-a')
  assert.equal(pair(pub, a, 'a').status, 0)
  const p = pairing(path.join(a, 'agents-102'), { AGENTS_CORE_DIR: path.join(base, 'agents-102-core') })
  assert.equal(p.problems.length, 1)
  assert.match(p.problems[0], /AGENTS_CORE_DIR/)
})

test('bind-trace refuses to write evidence into a shared core, binds in a sole pair', () => {
  const { base, pub } = primaries()
  const a = path.join(base, 'ws-a')
  assert.equal(pair(pub, a, 'a').status, 0)
  const target = path.join(a, 'agents-102', 'curriculum', 'page.md')
  const trace = path.join(a, 'agents-102', 'curriculum', 'evals', 'sim-cache', 'page.persona.json')
  fs.writeFileSync(trace, '{"runs":[]}\n')
  const env = { ...process.env, AGENTS_CORE_DIR: '' }
  let r = spawnSync('node', [BIND, trace, target], { encoding: 'utf8', env })
  assert.equal(r.status, 0, r.stderr)

  git(pub, 'worktree', 'add', '-q', path.join(a, 'agents-102-fixes'), '-b', 'fixes', 'main')
  r = spawnSync('node', [BIND, trace, target], { encoding: 'utf8', env })
  assert.notEqual(r.status, 0)
  assert.match(r.stderr, /agents-102-fixes/)
  assert.match(r.stderr, /pair-worktree\.sh/)
})

test('the helper is what the core README tells people to run', () => {
  const core = path.resolve(__dirname, '..', '..', 'agents-102-core', 'README.md')
  const readme = fs.readFileSync(process.env.AGENTS_CORE_DIR ? path.join(process.env.AGENTS_CORE_DIR, 'README.md') : core, 'utf8')
  assert.match(readme, /scripts\/pair-worktree\.sh/)
})
