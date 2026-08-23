#!/usr/bin/env node
// Tests for eval-queue.js — universe enumeration + non-surface exclusion.
// The routing itself is scan-stale-classes' contract, tested there; what is
// new here is WHICH files get scanned, and that is where a silent hole hides:
// a maintainer file quietly entering the queue is noise, a real surface
// quietly leaving it is a missed judge.
'use strict'
const assert = require('node:assert')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const { buildUniverse, isSurface, collect } = require('./eval-queue.js')

let n = 0
function test(name, fn) { fn(); n++; console.log(`ok ${n} - ${name}`) }

// One io helper, declaring every hook scanFile needs. Six copies of this object
// used to sit inline, each omitting ruleDrift, which is how the board lost the
// rule-drift axis without a single failing test: the omission was the default.
function testIo(root, drifted = []) {
  return {
    readFile: p => { try { return fs.readFileSync(path.join(root, p), 'utf8') } catch { return null } },
    gitDiff: () => '',
    validSha: () => true,
    // A Map, like gitIo returns: .has(cls) routes, .get(cls) names the rules.
    ruleDrift: () => new Map(drifted.map(c => [c, [{ compendium: 'check_x', rule: '1', changed_at: '2026-08-23' }]])),
  }
}

function fixture() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'eval-queue-'))
  const w = (rel, body) => {
    fs.mkdirSync(path.join(root, path.dirname(rel)), { recursive: true })
    fs.writeFileSync(path.join(root, rel), body)
  }
  const clean = '**Quality:** compendium-audited 2026-01-01 ()\n- judges @abc: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS\n'
  w('curriculum/trainings/t-one/getting-going.md', `# Getting going\n${clean}\n[Ex](exercises/do-a-thing.md)\n`)
  w('curriculum/trainings/t-one/shared.md', `# Shared in one\n${clean}\n[Shared](exercises/shared-thing.md)\n`)
  w('curriculum/trainings/t-two/shared.md', `# Shared in two\n${clean}\n[Shared](exercises/shared-thing.md)\n`)
  w('curriculum/trainings/t-one/timings.md', '# timings\n')
  w('curriculum/trainings/t-one/pre-cohort-todos.md', '# todos\n')
  w('curriculum/trainings/t-one/autumn-gaps.md', '# gaps\n\n<!-- maintainer -->\n\nNot student material.\n')
  w('curriculum/trainings/t-one/supplementary/deep-dive.md', `# Deep dive\n${clean}\n`)
  w('curriculum/trainings/t-one/reference/lookup.md', `# Lookup\n${clean}\n`)
  // A file with real per-class pins. Rule-drift only speaks about a PINNED
  // class — an unpinned one is already 'never' — so the drift axis needs a
  // surface whose Quality line actually names shas.
  const pinned = '**Quality:** compendium-audited 2026-01-01 (writing@abc1234 story@abc1234 technical@abc1234 behavior@abc1234 pedagogy@abc1234 strategy@abc1234 slides@abc1234)\n'
    + '- judges @abc1234: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS\n'
  w('curriculum/trainings/t-one/pinned-module.md', `# Pinned module\n\nStudent body.\n\n<!-- maintainer -->\n${pinned}`)
  w('curriculum/exercises/do-a-thing.md', '# Do a thing\n')
  w('curriculum/exercises/shared-thing.md', '# Shared thing\n')
  w('curriculum/lectures/orphan-lecture.md', '# Orphan\n')
  // A short lecture: real student body, then its maintainer fence high up the
  // file. The fence is where the maintainer block STARTS, not what the file IS.
  w('curriculum/lectures/short-lecture.md', `# Short lecture\n\n## One slide\n\n- A student reads this.\n\n<!-- maintainer -->\n\nNotes for the maintainer.\n`)
  // Same shape with no '##' at all — prose lecture, fence at line 7.
  w('curriculum/lectures/prose-lecture.md', `# Prose lecture\n\nA paragraph the student reads.\n\nA second one.\n\n<!-- maintainer -->\n\nNotes.\n`)
  return root
}

test('buildUniverse: collects modules, supplementary, reference, shared pool', () => {
  const root = fixture()
  const u = buildUniverse(root)
  assert.deepStrictEqual(u.sort(), [
    'curriculum/exercises/do-a-thing.md',
    'curriculum/exercises/shared-thing.md',
    'curriculum/lectures/orphan-lecture.md',
    'curriculum/lectures/prose-lecture.md',
    'curriculum/lectures/short-lecture.md',
    'curriculum/trainings/t-one/getting-going.md',
    'curriculum/trainings/t-one/pinned-module.md',
    'curriculum/trainings/t-one/reference/lookup.md',
    'curriculum/trainings/t-one/shared.md',
    'curriculum/trainings/t-one/supplementary/deep-dive.md',
    'curriculum/trainings/t-two/shared.md',
  ])
})

test('isSurface: named non-surfaces excluded', () => {
  const root = fixture()
  assert.strictEqual(isSurface(root, 'curriculum/trainings/t-one/timings.md'), false)
  assert.strictEqual(isSurface(root, 'curriculum/trainings/t-one/pre-cohort-todos.md'), false)
})

test('isSurface: <!-- maintainer --> marker excludes whatever the name is', () => {
  const root = fixture()
  assert.strictEqual(isSurface(root, 'curriculum/trainings/t-one/autumn-gaps.md'), false)
})

// The bug this guards: the marker test used to read a fixed 12-line head, so
// a SHORT student file whose maintainer fence landed inside that window was
// read as maintainer-facing and dropped out of the universe entirely — never
// queued, never judged, and its sim traces reported as orphaned, which reads
// as 'the file is gone' rather than 'the scanner cannot see it'. File length
// is not a property of audience.
test('isSurface: a maintainer fence below real student body does not exclude', () => {
  const root = fixture()
  assert.strictEqual(isSurface(root, 'curriculum/lectures/short-lecture.md'), true)
  assert.strictEqual(isSurface(root, 'curriculum/lectures/prose-lecture.md'), true)
})

test('isSurface: a real module stays in', () => {
  const root = fixture()
  assert.strictEqual(isSurface(root, 'curriculum/trainings/t-one/getting-going.md'), true)
})

// A shared file no module links has no resolvable training, so its instance
// prefix would be a guess. It must surface as UNOWNED, never be scanned under
// a defaulted training.
test('collect: unlinked shared file lands in unowned, not items', () => {
  const root = fixture()
  const io = testIo(root)
  const { items, unowned } = collect(root, io, 'all')
  assert.ok(unowned.includes('curriculum/lectures/orphan-lecture.md'))
  assert.ok(!items.some(i => i.slug === 'orphan-lecture'))
})

test('collect: linked exercise resolves its owning training and owes every class', () => {
  const root = fixture()
  const io = testIo(root)
  const { items } = collect(root, io, 'all')
  const ex = items.find(i => i.slug === 'do-a-thing')
  assert.strictEqual(ex.training, 't-one')
  assert.strictEqual(ex.type, 'exercise')
  assert.strictEqual(ex.instanceSlug, 't-one--exercise--do-a-thing')
  assert.strictEqual(ex.classes.length, 7)
  assert.strictEqual(ex.detail.writing, 'never')
})

// A file whose judges row says PASS on every class and whose pins show no diff
// owes nothing — it must not appear at all, or the queue cries wolf.
test('collect: fully-passed file is absent from the queue', () => {
  const root = fixture()
  const io = testIo(root)
  const { items } = collect(root, io, 'all')
  assert.ok(!items.some(i => i.slug === 'getting-going'))
})

test('collect: --training filter keeps only the wanted training', () => {
  const root = fixture()
  const io = testIo(root)
  const two = collect(root, io, 't-two').items
  const one = collect(root, io, 't-one').items
  assert.ok(two.length > 0)
  assert.ok(two.every(i => i.training === 't-two'))
  assert.ok(one.length > 0)
  assert.ok(one.every(i => i.training === 't-one'))
})

// An explicit --training removes the ambiguity for a shared-library surface
// linked from multiple trainings. Leaving it UNOWNED here silently drops real
// target-training work from a supposedly complete queue.
test('collect: explicit training owns a multiply-linked shared surface', () => {
  const root = fixture()
  const io = testIo(root)
  const all = collect(root, io, 'all')
  assert.ok(all.unowned.includes('curriculum/exercises/shared-thing.md'))

  const one = collect(root, io, 't-one').items.find(i => i.slug === 'shared-thing')
  const two = collect(root, io, 't-two').items.find(i => i.slug === 'shared-thing')
  assert.strictEqual(one.training, 't-one')
  assert.strictEqual(two.training, 't-two')
})

// --type is what turns the queue into a dispatchable batch: a sweep is scoped
// by surface kind far more often than by reason.
test('collect + type filter: keeps only the named surface kinds', () => {
  const root = fixture()
  const io = testIo(root)
  const { items } = collect(root, io, 'all')
  const kept = items.filter(i => ['module', 'exercise'].includes(i.type))
  assert.ok(kept.every(i => i.type !== 'supplementary' && i.type !== 'reference'))
  assert.ok(kept.some(i => i.type === 'exercise'))
})

// --- the board must carry every staleness axis the router knows -------------
//
// eval-queue mirrored scan-stale's gitIo and dropped ruleDrift, so a compendium
// rule could move and the board still read all-green. On 2026-08-23 six rules had
// moved (three that day) and `--training ae101` reported 0 rule-drift while the
// router reported five drifted classes on three files. The board is the surface
// people ask "are we green?" — an axis it cannot see does not exist.
test('collect: a fully-pinned, fully-passed file is absent while no rule has moved', () => {
  const root = fixture()
  const { items } = collect(root, testIo(root), 'all')
  assert.ok(!items.some(i => i.slug === 'pinned-module'))
})

test('collect: a class whose compendium rule moved shows on the board as rule-drift', () => {
  const root = fixture()
  const { items } = collect(root, testIo(root, ['pedagogy']), 'all')
  const ex = items.find(i => i.slug === 'pinned-module')
  assert.ok(ex, 'a fully-passed file must reappear once a rule under it moves')
  assert.deepStrictEqual(ex.classes, ['pedagogy'])
  assert.strictEqual(ex.detail.pedagogy, 'rule-drift')
})

test('makeIo: the board builds its io from the router, drift axis included', () => {
  const { makeIo } = require('./eval-queue.js')
  const io = makeIo(process.cwd())
  for (const k of ['readFile', 'gitDiff', 'validSha', 'ruleDrift']) {
    assert.equal(typeof io[k], 'function', `the board's io must supply ${k}`)
  }
})

test('makeIo is the router gitIo itself, not a copy that can drift from it', () => {
  const { makeIo } = require('./eval-queue.js')
  const { gitIo } = require('./scan-stale-classes.js')
  assert.strictEqual(makeIo, gitIo)
})

test('collect items carry the reason per class, so --json can tell a dispatcher WHY', () => {
  const root = fixture()
  const { items } = collect(root, testIo(root, ['pedagogy']), 'all')
  const ex = items.find(i => i.slug === 'pinned-module')
  assert.strictEqual(ex.detail.pedagogy, 'rule-drift')
  assert.deepStrictEqual(Object.keys(ex.driftRules), ['pedagogy'])
})

console.log(`\n1..${n}`)
