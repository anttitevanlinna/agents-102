'use strict'
const { test } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const D = require('./compendium-drift.js')

const FM = (classes) => `---\nname: x\nmetadata:\n  eval_classes:\n${classes.map(c => `    - ${c}\n`).join('')}---\n`

test('parseRuleChunks: one chunk per integer rule, lead captured', () => {
  const md = '1. **Alpha.** body a\n\n2. **Beta.** body b\n'
  const r = D.parseRuleChunks(md)
  assert.deepEqual(r.map(x => x.id), ['1', '2'])
  assert.equal(r[0].lead, 'Alpha.')
})

test('parseRuleChunks: a sub-lettered rule folds into its parent chunk', () => {
  const base = '1. **Alpha.** body a\n\n1b. **Alpha extra.** sub body\n\n2. **Beta.** body b\n'
  const r = D.parseRuleChunks(base)
  assert.deepEqual(r.map(x => x.id), ['1', '2'], '1b must not open a chunk of its own')
  // editing the SUB-rule must move the PARENT hash — a judge citing 1 read 1b too
  const edited = base.replace('sub body', 'sub body rewritten')
  const r2 = D.parseRuleChunks(edited)
  assert.notEqual(r2[0].h, r[0].h)
  assert.equal(r2[1].h, r[1].h, 'rule 2 is untouched')
})

test('parseRuleChunks: whitespace-only reflow is not a change', () => {
  const a = D.parseRuleChunks('1. **Alpha.** body a with   words\n')
  const b = D.parseRuleChunks('1. **Alpha.** body a\nwith words\n')
  assert.equal(a[0].h, b[0].h)
})

test('parseEvalClasses: storytelling normalises to the class the scanner pins', () => {
  assert.deepEqual(D.parseEvalClasses(FM(['pedagogy', 'storytelling'])), ['pedagogy', 'story'])
})

test('parseEvalClasses: no frontmatter list means no routing, not a crash', () => {
  assert.deepEqual(D.parseEvalClasses('# just prose\n'), [])
})

test('diffLedger: an unpinned compendium reports as baseline, not as drift-by-rule', () => {
  const cur = { check_x: { classes: ['writing'], rules: [{ id: '1', lead: 'A', h: 'aaa' }] } }
  const r = D.diffLedger({ compendia: {} }, cur)
  assert.equal(r.check_x.unpinned, true)
})

test('diffLedger: added / changed / removed are all reported', () => {
  const ledger = { compendia: { check_x: { classes: ['writing'], rules: { 1: { h: 'aaa', changed_at: null }, 9: { h: 'zzz', changed_at: null } } } } }
  const cur = { check_x: { classes: ['writing'], rules: [{ id: '1', h: 'bbb' }, { id: '2', h: 'ccc' }] } }
  const r = D.diffLedger(ledger, cur)
  assert.deepEqual(r.check_x, { added: ['2'], changed: ['1'], removed: ['9'] })
})

test('diffLedger: an unchanged compendium produces no entry at all', () => {
  const ledger = { compendia: { check_x: { classes: ['writing'], rules: { 1: { h: 'aaa', changed_at: null } } } } }
  const cur = { check_x: { classes: ['writing'], rules: [{ id: '1', h: 'aaa' }] } }
  assert.deepEqual(D.diffLedger(ledger, cur), {})
})

test('repin: the FIRST pin stales nothing — baseline rules carry changed_at null', () => {
  const cur = { check_x: { classes: ['writing'], rules: [{ id: '1', h: 'aaa' }] } }
  const next = D.repin({ compendia: {} }, cur, '2026-08-19')
  assert.equal(next.compendia.check_x.rules['1'].changed_at, null)
  assert.equal(D.driftedClasses(next, '2020-01-01').size, 0)
})

test('repin: a rule that moved gets dated; its neighbours keep their old date', () => {
  const ledger = { compendia: { check_x: { classes: ['writing'], rules: { 1: { h: 'aaa', changed_at: null }, 2: { h: 'bbb', changed_at: '2026-01-01' } } } } }
  const cur = { check_x: { classes: ['writing'], rules: [{ id: '1', h: 'NEW' }, { id: '2', h: 'bbb' }] } }
  const next = D.repin(ledger, cur, '2026-08-19')
  assert.equal(next.compendia.check_x.rules['1'].changed_at, '2026-08-19')
  assert.equal(next.compendia.check_x.rules['2'].changed_at, '2026-01-01')
})

test('repin: a removed rule leaves the ledger', () => {
  const ledger = { compendia: { check_x: { classes: ['writing'], rules: { 1: { h: 'aaa', changed_at: null }, 9: { h: 'zzz', changed_at: null } } } } }
  const cur = { check_x: { classes: ['writing'], rules: [{ id: '1', h: 'aaa' }] } }
  assert.deepEqual(Object.keys(D.repin(ledger, cur, '2026-08-19').compendia.check_x.rules), ['1'])
})

test('driftedClasses: a pin older than the rule edit owes every class that compendium routes to', () => {
  const ledger = { compendia: { check_p: { classes: ['pedagogy', 'story'], rules: { 1: { h: 'a', changed_at: '2026-08-19' } } } } }
  assert.deepEqual([...D.driftedClasses(ledger, '2026-08-01')].sort(), ['pedagogy', 'story'])
})

test('driftedClasses: a pin newer than the rule edit owes nothing', () => {
  const ledger = { compendia: { check_p: { classes: ['pedagogy'], rules: { 1: { h: 'a', changed_at: '2026-08-19' } } } } }
  assert.equal(D.driftedClasses(ledger, '2026-08-20').size, 0)
})

test('driftedClasses: same-day is a tie, and a tie does not stale', () => {
  const ledger = { compendia: { check_p: { classes: ['pedagogy'], rules: { 1: { h: 'a', changed_at: '2026-08-19' } } } } }
  assert.equal(D.driftedClasses(ledger, '2026-08-19').size, 0)
})

test('driftedClasses: no pin date means no claim — an unpinned class is the scanner s job', () => {
  const ledger = { compendia: { check_p: { classes: ['pedagogy'], rules: { 1: { h: 'a', changed_at: '2026-08-19' } } } } }
  assert.equal(D.driftedClasses(ledger, null).size, 0)
})

test('readCompendia: reads check_*.md only, and round-trips through repin/diff', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'comp-'))
  fs.writeFileSync(path.join(dir, 'check_x.md'), FM(['writing']) + '1. **Alpha.** body\n')
  fs.writeFileSync(path.join(dir, 'notes.md'), '1. **Not a compendium.** body\n')
  const cur = D.readCompendia(dir)
  assert.deepEqual(Object.keys(cur), ['check_x'])
  assert.deepEqual(cur.check_x.classes, ['writing'])
  const pinned = D.repin({ compendia: {} }, cur, '2026-08-19')
  assert.deepEqual(D.diffLedger(pinned, D.readCompendia(dir)), {}, 'a freshly pinned ledger must report zero drift')
  fs.writeFileSync(path.join(dir, 'check_x.md'), FM(['writing']) + '1. **Alpha.** body rewritten\n')
  assert.deepEqual(D.diffLedger(pinned, D.readCompendia(dir)).check_x.changed, ['1'])
  fs.rmSync(dir, { recursive: true, force: true })
})

test('the live compendium dir parses: every check_*.md yields rules and routes to a class', () => {
  const cur = D.readCompendia(D.MEM)
  const names = Object.keys(cur)
  assert.ok(names.length >= 10, `expected the full compendium set, got ${names.length}`)
  for (const [n, c] of Object.entries(cur)) {
    assert.ok(c.rules.length > 0, `${n} parsed zero rules — the reader is narrower than the corpus`)
    assert.ok(c.classes.length > 0, `${n} declares no eval_classes — nothing routes a re-judge to it`)
  }
})

test('ledger encoding: a never-moved rule is a bare hash, a moved one carries its date', () => {
  const l = { compendia: { check_x: { classes: ['writing'], rules: { 1: { h: 'aaa', changed_at: null }, 2: { h: 'bbb', changed_at: '2026-08-19' } } } } }
  const enc = D.encodeLedger(l)
  assert.deepEqual(enc.compendia.check_x.rules, { 1: 'aaa', 2: 'bbb@2026-08-19' })
  assert.deepEqual(D.decodeLedger(enc), l, 'round-trip must be lossless')
})

test('ledger encoding: the live ledger on disk decodes and matches the compendiums', () => {
  const ledger = D.loadLedger(D.LEDGER)
  assert.ok(Object.keys(ledger.compendia).length >= 10, 'ledger is missing compendia')
  assert.deepEqual(D.diffLedger(ledger, D.readCompendia(D.MEM)), {},
    'compendium drift is unpinned — run: node curriculum/evals/scripts/compendium-drift.js --repin')
})
