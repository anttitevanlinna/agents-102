'use strict'
// AGENTS_OVERLAY_DIR: a customer-owned folder with overlay.json and the
// customer's own lectures/<slug>.md. It overrides a training's label and lede
// and inserts customer lectures after a named include in a named module, so a
// customer's changes live in the customer's repository, not in this one.
// Anything the contract does not name fails the build.
const { test } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const { execFileSync } = require('node:child_process')
const { loadOverlay, applyOverlayIncludes } = require('./customer-overlay.js')

const REPO = path.resolve(__dirname, '..')
const TRAININGS = {
  't1': { label: 'T1', lede: 'Vendor lede.', modules: [{ slug: 'm1' }, { slug: 'm2' }] },
}
const MODULE = '# M1\n\n[Exercise: Do it](exercises/do-it.md)\n\n[Lecture: Why](lectures/why.md)\n\n## Next\n'
const readModule = (t, m) => (t === 't1' && m === 'm1' ? MODULE : '# M2\n')
const vendorLecture = slug => slug === 'why'

function dir(overlay, lectures = { 'house-rules': '# House rules\n\nBody.\n' }) {
  const d = fs.mkdtempSync(path.join(os.tmpdir(), 'overlay-'))
  if (overlay !== undefined) fs.writeFileSync(path.join(d, 'overlay.json'), JSON.stringify(overlay))
  fs.mkdirSync(path.join(d, 'lectures'))
  for (const [s, body] of Object.entries(lectures)) fs.writeFileSync(path.join(d, 'lectures', s + '.md'), body)
  return d
}
const load = d => loadOverlay(d, { trainings: TRAININGS, readModule, vendorLecture })
const ok = { t1: { label: 'T1: Tundra', lede: 'Customer lede.', lectures: [{ slug: 'house-rules', module: 'm1', after: 'exercises/do-it' }] } }

test('unset leaves the registry and modules untouched', () => {
  const o = loadOverlay(undefined, { trainings: TRAININGS, readModule, vendorLecture })
  assert.deepEqual(o.labels, {})
  assert.equal(applyOverlayIncludes(MODULE, 't1', 'm1', o), MODULE)
})

test('label and lede override the named training only', () => {
  const o = load(dir(ok))
  assert.deepEqual(o.labels.t1, { label: 'T1: Tundra', lede: 'Customer lede.' })
})

test('a customer lecture lands right after its anchor, with its own H1 as the link title', () => {
  const o = load(dir(ok))
  const md = applyOverlayIncludes(MODULE, 't1', 'm1', o)
  assert.match(md, /\[Exercise: Do it\]\(exercises\/do-it\.md\)\n\n\[Lecture: House rules\]\(lectures\/house-rules\.md\)\n\n\[Lecture: Why\]/)
  assert.equal(o.lecturePath('house-rules'), path.join(o.dir, 'lectures', 'house-rules.md'))
  assert.equal(o.lecturePath('why'), null, 'vendor lectures resolve from the vendor tree')
  assert.equal(applyOverlayIncludes('# M2\n', 't1', 'm2', o), '# M2\n', 'other modules untouched')
})

const refuses = (overlay, re, lectures) => assert.throws(() => load(dir(overlay, lectures)), re)

test('refuses what the contract does not name', () => {
  refuses({ t1: { title: 'x' } }, /unknown key "title"/)
  refuses({ zz: { label: 'x' } }, /unknown training "zz"/)
  refuses({ t1: { lectures: [{ slug: 'house-rules', module: 'm9', after: 'exercises/do-it' }] } }, /module "m9" is not in t1/)
  refuses({ t1: { lectures: [{ slug: 'house-rules', module: 'm1', after: 'exercises/nope' }] } }, /anchor "exercises\/nope" is not an include in t1\/m1/)
  refuses({ t1: { lectures: [{ slug: 'missing', module: 'm1', after: 'exercises/do-it' }] } }, /lectures\/missing\.md not found/)
  refuses({ t1: { lectures: [{ slug: 'why', module: 'm1', after: 'exercises/do-it' }] } }, /"why" collides with a vendor lecture/, { why: '# Why\n' })
  refuses({ t1: { lectures: [{ slug: 'house-rules', module: 'm1', after: 'exercises/do-it', extra: 1 }] } }, /unknown key "extra"/)
  refuses({ t1: { lectures: [{ slug: 'house-rules', module: 'm1', after: 'exercises/do-it' }] } }, /has no H1/, { 'house-rules': 'no heading\n' })
  assert.throws(() => load(dir(undefined)), /overlay\.json not found/)
})

test('build: overlay label and customer lecture reach the workbook; vendor tree stays clean', () => {
  const SLUG = 'vip-overlaytest'                     // vip-* is gitignored
  const OUT = path.join(REPO, 'site/clients', SLUG)
  const d = dir({ 'claude-basics': {
    label: 'Claude Basics: Overlay Test', lede: 'Overlay lede marker.',
    lectures: [{ slug: 'overlay-house-rules', module: 'homework-build-and-verify', after: 'exercises/build-your-system' }],
  } }, { 'overlay-house-rules': '# Overlay house rules\n\nOVERLAY-BODY-MARKER\n\n<!-- maintainer -->\n\nOVERLAY-MAINTAINER-MARKER\n' })
  const before = execFileSync('git', ['status', '--porcelain'], { cwd: REPO }).toString()
  try {
    const env = { ...process.env, AGENTS_OVERLAY_DIR: d }
    execFileSync('node', ['scripts/build-workbook.js', SLUG, 'claude-basics'], { cwd: REPO, env, stdio: 'pipe' })
    const wb = fs.readFileSync(path.join(OUT, 'claude-basics/index.html'), 'utf8')
    const hub = fs.readFileSync(path.join(OUT, 'index.html'), 'utf8')
    assert.ok(wb.includes('Claude Basics: Overlay Test') && hub.includes('Overlay lede marker.'), 'label + lede')
    assert.ok(wb.includes('OVERLAY-BODY-MARKER'), 'customer lecture inlined')
    assert.ok(!wb.includes('OVERLAY-MAINTAINER-MARKER'), 'its maintainer block stripped')
    assert.ok(wb.indexOf('id="exercises-build-your-system"') < wb.indexOf('id="lectures-overlay-house-rules"') &&
      wb.indexOf('id="lectures-overlay-house-rules"') < wb.indexOf('id="exercises-find-the-wrong-claims"'), 'slotted after its anchor')
    assert.equal(execFileSync('git', ['status', '--porcelain'], { cwd: REPO }).toString(), before, 'vendor tree unchanged')
  } finally {
    fs.rmSync(OUT, { recursive: true, force: true })
    fs.rmSync(d, { recursive: true, force: true })
  }
})
