#!/usr/bin/env node
// Tests for check-verdict-agreement.js.
//
// The property under test: an instance JSON and the Quality row that cites it
// are two instruments reading the same body, and when they disagree NEITHER
// records that a disagreement exists. A successor judge reads whichever it
// opens first and inherits it as fact. So the gate must fire on disagreement in
// BOTH directions, and must stay silent on the many legitimate reasons a class
// is simply absent from a row.
'use strict'
const assert = require('node:assert')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const { classVerdict, compare, scan } = require('./check-verdict-agreement.js')

let n = 0
function test(name, fn) { fn(); n++; console.log(`ok ${n} - ${name}`) }

// ---- classVerdict: read one class out of a judges row -----------------------

const ROW = '- judges @1abb84c6: writing PASS (drift-recheck), story PASS, technical PASS (verify-refuted), behavior PASS, pedagogy REVISE (1/0-see-instances/ae101--module--x.pedagogy.json), strategy PASS, slides PASS'

test('reads a bare PASS', () => {
  assert.deepStrictEqual(classVerdict(ROW, 'story'), { verdict: 'PASS', note: null })
})

test('reads a PASS carrying a parenthetical marker', () => {
  assert.deepStrictEqual(classVerdict(ROW, 'technical'), { verdict: 'PASS', note: 'verify-refuted' })
})

test('reads a REVISE carrying its instance pointer', () => {
  const r = classVerdict(ROW, 'pedagogy')
  assert.strictEqual(r.verdict, 'REVISE')
})

test('a class absent from the row is null, not a failure', () => {
  assert.strictEqual(classVerdict(ROW, 'cross_module'), null)
})

test('does not match a class name that is only a suffix of another', () => {
  const row = '- judges @abc: prompt_writing PASS, slides REVISE'
  assert.strictEqual(classVerdict(row, 'writing'), null)
})

test('grandfathered is neither PASS nor REVISE', () => {
  const row = '- judges @abc: writing grandfathered, slides PASS'
  assert.deepStrictEqual(classVerdict(row, 'writing'), { verdict: 'grandfathered', note: null })
})

// ---- compare: the adjudication ---------------------------------------------

test('agreement is silent', () => {
  assert.strictEqual(compare('PASS', { verdict: 'PASS', note: null }), null)
  assert.strictEqual(compare('REVISE', { verdict: 'REVISE', note: null }), null)
})

test('instance REVISE under a row PASS is a contradiction', () => {
  const c = compare('REVISE', { verdict: 'PASS', note: 'verify-refuted' })
  assert.strictEqual(c.kind, 'contradiction')
  assert.match(c.detail, /verify-refuted/)
})

test('instance PASS under a row REVISE is a contradiction too', () => {
  // Rarer and worse: the row sends a reader to an instance that clears the file.
  assert.strictEqual(compare('PASS', { verdict: 'REVISE', note: null }).kind, 'contradiction')
})

test('grandfathered rows are skipped, not adjudicated', () => {
  assert.strictEqual(compare('REVISE', { verdict: 'grandfathered', note: null }), null)
})

test('a missing row verdict is skipped — nothing to disagree with', () => {
  assert.strictEqual(compare('REVISE', null), null)
})

// ---- scan: end to end over a repo ------------------------------------------

function repo() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'verdict-agree-'))
  fs.mkdirSync(path.join(root, 'curriculum/evals/instances'), { recursive: true })
  fs.mkdirSync(path.join(root, 'curriculum/lectures'), { recursive: true })
  fs.mkdirSync(path.join(root, 'curriculum/trainings/ae/'), { recursive: true })
  return root
}

function lecture(root, slug, row) {
  fs.writeFileSync(path.join(root, `curriculum/lectures/${slug}.md`),
    `# ${slug}\n\n## A slide\n\nBody.\n\n<!-- maintainer -->\n\n**Quality:** compendium-audited 2026-08-24 (writing@abc)\n${row}\n- cohorts: none yet\n`)
}

function instance(root, name, obj) {
  fs.writeFileSync(path.join(root, 'curriculum/evals/instances', name), JSON.stringify(obj, null, 1))
}

test('scan finds the contradiction and stays quiet on the agreeing sibling', () => {
  const root = repo()
  lecture(root, 'good', '- judges @abc: writing PASS, slides PASS')
  lecture(root, 'bad', '- judges @abc: writing PASS (verify-refuted), slides PASS')
  instance(root, 'ae101--lecture--good.writing.json',
    { file: path.join(root, 'curriculum/lectures/good.md'), class: 'writing', verdict: 'PASS' })
  instance(root, 'ae101--lecture--bad.writing.json',
    { file: path.join(root, 'curriculum/lectures/bad.md'), class: 'writing', verdict: 'REVISE' })

  const { findings } = scan(root)
  assert.strictEqual(findings.length, 1)
  assert.strictEqual(findings[0].instance, 'ae101--lecture--bad.writing.json')
  assert.strictEqual(findings[0].kind, 'contradiction')
})

test('an unparseable instance is reported, never thrown', () => {
  const root = repo()
  fs.writeFileSync(path.join(root, 'curriculum/evals/instances/ae101--lecture--x.writing.json'), '{ not json')
  const { skipped } = scan(root)
  assert.strictEqual(skipped.length, 1)
  assert.match(skipped[0].reason, /unparseable/)
})

test('a cross_module instance no module cites is an orphan', () => {
  const root = repo()
  lecture(root, 'm1', '- judges @abc: writing PASS')
  instance(root, 'ae101--module-set--full-arc.cross_module.json', {
    class: 'cross_module',
    module_set: [path.join(root, 'curriculum/lectures/m1.md')],
    verdict: 'REVISE',
  })
  const { findings } = scan(root)
  assert.strictEqual(findings.length, 1)
  assert.strictEqual(findings[0].kind, 'orphan')
})

test('a cross_module instance whose members carry the row is adjudicated normally', () => {
  const root = repo()
  lecture(root, 'm1', '- judges @abc: writing PASS\n- cross_module @abc: PASS — set=[m1]; 0 pairs, 0 blocking')
  instance(root, 'ae101--module-set--solo.cross_module.json', {
    class: 'cross_module',
    module_set: [path.join(root, 'curriculum/lectures/m1.md')],
    verdict: 'REVISE',
  })
  const { findings } = scan(root)
  assert.strictEqual(findings.length, 1)
  assert.strictEqual(findings[0].kind, 'contradiction')
})

test('a row naming a DIFFERENT set does not satisfy this instance', () => {
  // A module belongs to several sets at once. Matching the first cross_module
  // row on any member lets a neighbouring set's PASS launder an unstamped
  // verdict into agreement — which is how the AE101 full-arc orphan first read
  // as a contradiction on prework.md rather than as never stamped at all.
  const root = repo()
  lecture(root, 'm1', '- judges @abc: writing PASS\n- cross_module @abc: PASS — set=[m1,m2]; 1 pairs, 0 blocking')
  instance(root, 'ae101--module-set--full-arc.cross_module.json', {
    class: 'cross_module',
    module_set: [path.join(root, 'curriculum/lectures/m1.md')],
    verdict: 'REVISE',
  })
  const { findings } = scan(root)
  assert.strictEqual(findings.length, 1)
  assert.strictEqual(findings[0].kind, 'orphan')
})

test('set membership is compared as a set, not as a string', () => {
  // Same members, different order and spacing: still the same set.
  const root = repo()
  lecture(root, 'm1', '- judges @abc: writing PASS\n- cross_module @abc: PASS — set=[m2, m1]; 1 pairs, 0 blocking')
  instance(root, 'ae101--module-set--pair.cross_module.json', {
    class: 'cross_module',
    module_set: [path.join(root, 'curriculum/lectures/m1.md'), path.join(root, 'curriculum/lectures/m2.md')],
    verdict: 'REVISE',
  })
  const { findings } = scan(root)
  assert.strictEqual(findings.length, 1)
  assert.strictEqual(findings[0].kind, 'contradiction')
})

// ---- resolution: the documented way out ------------------------------------

test('a recorded resolution settles the disagreement', () => {
  const root = repo()
  lecture(root, 'bad', '- judges @abc: writing PASS (verify-refuted), slides PASS')
  instance(root, 'ae101--lecture--bad.writing.json', {
    file: path.join(root, 'curriculum/lectures/bad.md'), class: 'writing', verdict: 'REVISE',
    resolution: { settled: 'refuted', at: 'a2f5e9c2', note: 'Two refuters killed it; git blame shows the lines are the maintainer’s own commit.' },
  })
  const { findings, settled } = scan(root)
  assert.strictEqual(findings.length, 0)
  assert.strictEqual(settled, 1)
})

test('a half-written resolution is worse than none and still fires', () => {
  const root = repo()
  lecture(root, 'bad', '- judges @abc: writing PASS, slides PASS')
  instance(root, 'ae101--lecture--bad.writing.json', {
    file: path.join(root, 'curriculum/lectures/bad.md'), class: 'writing', verdict: 'REVISE',
    resolution: { settled: 'refuted' },   // no note: nothing a successor can act on
  })
  const { findings } = scan(root)
  assert.strictEqual(findings.length, 1)
  assert.match(findings[0].detail, /note/)
})

test('an unknown settled value is not a licence to disagree', () => {
  const root = repo()
  lecture(root, 'bad', '- judges @abc: writing PASS, slides PASS')
  instance(root, 'ae101--lecture--bad.writing.json', {
    file: path.join(root, 'curriculum/lectures/bad.md'), class: 'writing', verdict: 'REVISE',
    resolution: { settled: 'whatever', note: 'trust me' },
  })
  const { findings } = scan(root)
  assert.strictEqual(findings.length, 1)
  assert.match(findings[0].detail, /settled/)
})

test('a resolution on an agreeing instance is harmless', () => {
  const root = repo()
  lecture(root, 'good', '- judges @abc: writing PASS')
  instance(root, 'ae101--lecture--good.writing.json', {
    file: path.join(root, 'curriculum/lectures/good.md'), class: 'writing', verdict: 'PASS',
    resolution: { settled: 'fixed', at: 'abc', note: 'left over from an earlier round' },
  })
  const { findings, settled } = scan(root)
  assert.strictEqual(findings.length, 0)
  assert.strictEqual(settled, 0)   // nothing to settle: the two sides already agree
})

console.log(`\n1..${n}`)
