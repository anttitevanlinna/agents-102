'use strict'
// AGENTS_OVERLAY_DIR: a customer-owned folder that mirrors curriculum/. At
// build time a file there wins over the vendor file at the same path; a file
// with no vendor twin is the customer's own. trainings/<key>/training.json
// overrides label and lede. overlay.lock.json records the vendor file each
// shadow was forked from, so the build can say when the vendor moved on.
const { test } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const { execFileSync } = require('node:child_process')
const { loadOverlay } = require('./customer-overlay.js')

const REPO = path.resolve(__dirname, '..')
const TRAININGS = { t1: { label: 'T1', lede: 'Vendor lede.' } }

function tree(files) {
  const d = fs.mkdtempSync(path.join(os.tmpdir(), 'overlay-'))
  for (const [rel, body] of Object.entries(files)) {
    fs.mkdirSync(path.dirname(path.join(d, rel)), { recursive: true })
    fs.writeFileSync(path.join(d, rel), body)
  }
  return d
}
const vendor = () => tree({ 'curriculum/trainings/t1/m1.md': '# M1 vendor\n', 'curriculum/lectures/why.md': '# Why\n' })
const load = (dir, root) => loadOverlay(dir, { root, trainings: TRAININGS })

test('unset resolves every path to the vendor tree', () => {
  const root = vendor()
  const o = loadOverlay(undefined, { root, trainings: TRAININGS })
  assert.equal(o.resolve('trainings/t1/m1.md'), path.join(root, 'curriculum/trainings/t1/m1.md'))
  assert.deepEqual(o.labels, {})
})

test('a customer file shadows its vendor twin; a new file is the customer\'s own', () => {
  const root = vendor()
  const d = tree({ 'trainings/t1/m1.md': '# M1 customer\n', 'lectures/house-rules.md': '# House rules\n' })
  const o = load(d, root)
  assert.equal(o.resolve('trainings/t1/m1.md'), path.join(d, 'trainings/t1/m1.md'))
  assert.equal(o.resolve('lectures/house-rules.md'), path.join(d, 'lectures/house-rules.md'))
  assert.equal(o.resolve('lectures/why.md'), path.join(root, 'curriculum/lectures/why.md'))
})

test('training.json sets label and lede, nothing else', () => {
  const root = vendor()
  const o = load(tree({ 'trainings/t1/training.json': JSON.stringify({ label: 'T1: Tundra', lede: 'Customer lede.' }) }), root)
  assert.deepEqual(o.labels.t1, { label: 'T1: Tundra', lede: 'Customer lede.' })
  assert.throws(() => load(tree({ 'trainings/t1/training.json': '{"modules":[]}' }), root), /training\.json: unknown key "modules"/)
})

test('prompts/ and figures/ shadow or extend the registries', () => {
  const root = vendor()
  const d = tree({ 'prompts/house-check.md': '---\nkey: house-check\n---\nCheck it.\n', 'figures/house-map.md': '<figure class="diagram"></figure>\n' })
  const o = load(d, root)
  assert.equal(o.resolve('prompts/house-check.md'), path.join(d, 'prompts/house-check.md'))
  assert.equal(o.promptsDir, path.join(d, 'prompts'))
  assert.equal(o.figuresDir, path.join(d, 'figures'))
  assert.equal(load(tree({}), root).promptsDir, null)
  assert.throws(() => load(tree({ 'prompts/sub/x.md': 'x' }), root), /not a curriculum path/)
})

test('refuses a path the build would never read', () => {
  const root = vendor()
  assert.throws(() => load(tree({ 'trainings/t2/m1.md': 'x' }), root), /unknown training "t2"/)
  assert.throws(() => load(tree({ 'lecture/typo.md': 'x' }), root), /lecture\/typo\.md is not a curriculum path/)
  assert.throws(() => load(tree({ 'lectures/notes.txt': 'x' }), root), /lectures\/notes\.txt is not a curriculum path/)
})

test('first build records each shadow\'s vendor base; a later vendor edit is reported as drift', () => {
  const root = vendor()
  const d = tree({ 'trainings/t1/m1.md': '# M1 customer\n', 'lectures/house-rules.md': '# House rules\n' })
  const first = load(d, root)
  assert.deepEqual(first.recorded, ['trainings/t1/m1.md'])
  assert.deepEqual(first.drift, [])
  const lock = JSON.parse(fs.readFileSync(path.join(d, 'overlay.lock.json'), 'utf8'))
  assert.deepEqual(Object.keys(lock), ['trainings/t1/m1.md'], 'only shadows are locked, not customer-only files')
  assert.deepEqual(load(d, root).recorded, [], 'second build records nothing new')
  fs.writeFileSync(path.join(root, 'curriculum/trainings/t1/m1.md'), '# M1 vendor, fixed\n')
  const later = load(d, root)
  assert.deepEqual(later.drift.map(x => x.rel), ['trainings/t1/m1.md'])
  assert.equal(later.resolve('trainings/t1/m1.md'), path.join(d, 'trainings/t1/m1.md'), 'drift warns, the shadow still wins')
})

test('build: a shadowed module slots a customer lecture; label from training.json; vendor tree clean', () => {
  const SLUG = 'vip-overlaytest'                     // vip-* is gitignored
  const OUT = path.join(REPO, 'site/clients', SLUG)
  const mod = 'trainings/claude-basics/homework-build-and-verify.md'
  const src = fs.readFileSync(path.join(REPO, 'curriculum', mod), 'utf8')
  const anchor = '[Exercise: Build your system](exercises/build-your-system.md)'
  assert.ok(src.includes(anchor), 'fixture anchor still in the vendor module')
  const d = tree({
    [mod]: src.replace(anchor, anchor + '\n\n[Lecture: Overlay house rules](lectures/overlay-house-rules.md)'),
    'lectures/overlay-house-rules.md': '# Lecture: Overlay house rules\n\nOVERLAY-BODY-MARKER\n\n{{prompt:overlay-house-check}}\n\n<!-- maintainer -->\n\nOVERLAY-MAINTAINER-MARKER\n',
    'prompts/overlay-house-check.md': '---\nkey: overlay-house-check\ndest: Claude Code\n---\nOVERLAY-PROMPT-MARKER check the house rules.\n',
    'trainings/claude-basics/training.json': JSON.stringify({ label: 'Claude Basics: Overlay Test', lede: 'Overlay lede marker.' }),
  })
  const before = execFileSync('git', ['status', '--porcelain'], { cwd: REPO }).toString()
  try {
    execFileSync('node', ['scripts/build-workbook.js', SLUG, 'claude-basics'], { cwd: REPO, env: { ...process.env, AGENTS_OVERLAY_DIR: d }, stdio: 'pipe' })
    const wb = fs.readFileSync(path.join(OUT, 'claude-basics/index.html'), 'utf8')
    const hub = fs.readFileSync(path.join(OUT, 'index.html'), 'utf8')
    assert.ok(wb.includes('Claude Basics: Overlay Test') && hub.includes('Overlay lede marker.'), 'label + lede')
    assert.ok(wb.includes('OVERLAY-BODY-MARKER') && !wb.includes('OVERLAY-MAINTAINER-MARKER'), 'lecture inlined, maintainer block stripped')
    assert.ok(wb.includes('OVERLAY-PROMPT-MARKER'), 'customer prompt expanded from the overlay registry')
    const at = id => wb.indexOf(`id="${id}"`)
    assert.ok(at('exercises-build-your-system') < at('lectures-overlay-house-rules') &&
      at('lectures-overlay-house-rules') < at('exercises-find-the-wrong-claims'), 'slotted where the shadow put it')
    assert.ok(fs.existsSync(path.join(d, 'overlay.lock.json')), 'lock written into the customer folder')
    assert.equal(execFileSync('git', ['status', '--porcelain'], { cwd: REPO }).toString(), before, 'vendor tree unchanged')
  } finally {
    fs.rmSync(OUT, { recursive: true, force: true })
    fs.rmSync(d, { recursive: true, force: true })
  }
})

test('starter tarball: a customer lecture slotted into an A101 module ships its customer prompt; overlay messages print once', () => {
  const SLUG = 'vip-overlaystarter'
  const OUT = path.join(REPO, 'site/clients', SLUG)
  const mod = 'trainings/agents-101/security.md'
  const src = fs.readFileSync(path.join(REPO, 'curriculum', mod), 'utf8')
  const anchor = '[Exercise: Audit your agent](exercises/audit-your-agent.md)'
  assert.ok(src.includes(anchor), 'fixture anchor still in the vendor module')
  const d = tree({
    [mod]: src.replace(anchor, anchor + '\n\n[Lecture: Starter house rules](lectures/starter-house-rules.md)'),
    'lectures/starter-house-rules.md': '# Lecture: Starter house rules\n\n{{prompt:starter-house-check}}\n',
    'prompts/starter-house-check.md': '---\nkey: starter-house-check\n---\nSTARTER-PROMPT-MARKER\n',
  })
  const before = execFileSync('git', ['status', '--porcelain'], { cwd: REPO }).toString()
  try {
    const log = execFileSync('node', ['scripts/build-workbook.js', SLUG, 'agents-101'], { cwd: REPO, env: { ...process.env, AGENTS_OVERLAY_DIR: d }, stdio: ['ignore', 'pipe', 'pipe'] }).toString()
    assert.equal(log.split('recorded the vendor base of trainings/agents-101/security.md').length - 1, 1, 'overlay message printed once')
    const list = execFileSync('tar', ['tzf', path.join(OUT, 'agents-101/agents-101-starter.tar.gz')]).toString()
    assert.match(list, /prompts\/starter-house-check\.md/)
    assert.equal(execFileSync('git', ['status', '--porcelain'], { cwd: REPO }).toString(), before, 'vendor tree unchanged')
  } finally {
    fs.rmSync(OUT, { recursive: true, force: true })
    fs.rmSync(d, { recursive: true, force: true })
  }
})
