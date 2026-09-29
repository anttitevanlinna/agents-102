'use strict'
// overlay-workspace.sh: evals need a real tree (judges read files, the queue
// diffs git pins, the stamper writes Quality lines), so a customer overlay is
// judged in a paired public+core worktree on overlay/<customer>. `sync` makes or
// updates that pair (merges our main, applies the overlay and its saved eval
// results, commits); `harvest` copies the customer's files, instances and
// traces back into the overlay, under evals/, which the build ignores.
const { test } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const { execFileSync } = require('node:child_process')
const { loadOverlay } = require('./customer-overlay.js')

const REPO = path.resolve(__dirname, '..')
const CORE = process.env.AGENTS_CORE_DIR || path.join(REPO, '..', 'agents-102-core')
const SCRIPT = path.join(REPO, 'scripts/overlay-workspace.sh')
const git = (cwd, ...a) => execFileSync('git', a, { cwd, stdio: ['ignore', 'pipe', 'pipe'] }).toString().trim()
const write = (f, body) => { fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, body) }
const INST = 'curriculum/evals/instances/agents-101--lecture--ws-house-rules.writing.json'
const TRACE = 'evals/sim-cache/agents-101--lecture--ws-house-rules.persona.json'
const LECTURE = 'lectures/ws-house-rules.md'
const MOD = 'trainings/agents-101/security.md'

function fixture() {
  const T = fs.mkdtempSync(path.join(os.tmpdir(), 'ows-'))
  const vendor = path.join(T, 'v/agents-102')
  git(T, 'clone', '-q', '--local', REPO, vendor)
  git(T, 'clone', '-q', '--local', CORE, path.join(T, 'v/agents-102-core'))
  for (const r of [vendor, path.join(T, 'v/agents-102-core')]) { git(r, 'config', 'user.name', 't'); git(r, 'config', 'user.email', 't@example.invalid') }
  const overlay = path.join(T, 'overlay')
  const anchor = '[Exercise: Audit your agent](exercises/audit-your-agent.md)'
  write(path.join(overlay, MOD), fs.readFileSync(path.join(vendor, 'curriculum', MOD), 'utf8').replace(anchor, anchor + '\n\n[Lecture: WS house rules](lectures/ws-house-rules.md)'))
  write(path.join(overlay, LECTURE), '# Lecture: WS house rules\n\nBody.\n')
  write(path.join(overlay, 'trainings/agents-101/training.json'), '{"label":"A101: WS"}\n')
  return { T, vendor, overlay }
}
const run = (cwd, ...a) => execFileSync('bash', [SCRIPT, ...a], { cwd, stdio: ['ignore', 'pipe', 'pipe'], env: { ...process.env, AGENTS_CORE_DIR: '' } }).toString()

test('sync → eval → harvest → sync into a fresh pair restores the results', () => {
  const { T, vendor, overlay } = fixture()
  try {
    const mainBefore = git(vendor, 'rev-parse', 'main')
    const pair = path.join(T, 'pair')
    run(vendor, 'sync', overlay, pair, 'ws')
    const ws = path.join(pair, 'agents-102'), wsCore = path.join(pair, 'agents-102-core')
    assert.equal(git(ws, 'rev-parse', '--abbrev-ref', 'HEAD'), 'overlay/ws')
    assert.equal(fs.readFileSync(path.join(ws, 'curriculum', LECTURE), 'utf8'), fs.readFileSync(path.join(overlay, LECTURE), 'utf8'))
    assert.equal(fs.readFileSync(path.join(ws, 'curriculum', MOD), 'utf8'), fs.readFileSync(path.join(overlay, MOD), 'utf8'))
    assert.equal(git(ws, 'status', '--porcelain'), '', 'overlay committed on the branch')
    assert.equal(git(vendor, 'rev-parse', 'main'), mainBefore, 'our main untouched')

    // What an eval run leaves behind: a stamped file, an instance, a trace.
    fs.appendFileSync(path.join(ws, 'curriculum', LECTURE), '\n<!-- maintainer -->\n\n**Quality:** compendium-audited 2026-09-29 (writing@abc1234)\n')
    write(path.join(ws, INST), '{"verdict":"PASS"}\n')
    git(ws, 'add', '-A'); git(ws, 'commit', '-qm', 'eval')
    write(path.join(wsCore, TRACE), '{"trace":1}\n')
    git(wsCore, 'add', '-A'); git(wsCore, 'commit', '-qm', 'trace')

    run(vendor, 'harvest', overlay, pair)
    assert.match(fs.readFileSync(path.join(overlay, LECTURE), 'utf8'), /\*\*Quality:\*\* compendium-audited/)
    assert.ok(fs.existsSync(path.join(overlay, 'evals/instances', path.basename(INST))), 'instance harvested')
    assert.ok(fs.existsSync(path.join(overlay, 'evals/sim-cache', path.basename(TRACE))), 'trace harvested')
    assert.equal(fs.readdirSync(path.join(overlay, 'evals/instances')).length, 1, 'only what the branch changed')
    loadOverlay(overlay, { root: vendor, trainings: require(path.join(REPO, 'site/layouts/curriculum.js')).TRAININGS })

    const pair2 = path.join(T, 'pair2')
    run(vendor, 'sync', overlay, pair2, 'ws2')
    assert.ok(fs.existsSync(path.join(pair2, 'agents-102', INST)), 'instance restored')
    assert.ok(fs.existsSync(path.join(pair2, 'agents-102-core', TRACE)), 'trace restored')
  } finally {
    fs.rmSync(T, { recursive: true, force: true })
  }
})

test('sync on an existing pair merges our newer main; the overlay still wins on its own paths', () => {
  const { T, vendor, overlay } = fixture()
  try {
    const pair = path.join(T, 'pair')
    run(vendor, 'sync', overlay, pair, 'ws')
    write(path.join(vendor, 'curriculum/lectures/ws-vendor-new.md'), '# New vendor lecture\n')
    fs.appendFileSync(path.join(vendor, 'curriculum', MOD), '\nVENDOR-FIX\n')
    git(vendor, 'add', '-A'); git(vendor, 'commit', '-qm', 'vendor moves on')
    run(vendor, 'sync', overlay, pair, 'ws')
    const ws = path.join(pair, 'agents-102')
    assert.ok(fs.existsSync(path.join(ws, 'curriculum/lectures/ws-vendor-new.md')), 'vendor change merged')
    assert.equal(fs.readFileSync(path.join(ws, 'curriculum', MOD), 'utf8'), fs.readFileSync(path.join(overlay, MOD), 'utf8'), 'shadow wins')
    assert.equal(git(ws, 'status', '--porcelain'), '')
  } finally {
    fs.rmSync(T, { recursive: true, force: true })
  }
})
