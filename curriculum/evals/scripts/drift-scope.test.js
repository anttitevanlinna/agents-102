#!/usr/bin/env node
'use strict'
// drift-scope.test.js — the carry guard and the merge behind drift-scoped re-fires.
//
// A drift-scoped judge re-reads only the rules that moved; every other row is
// carried from the prior instance. The carry is only as safe as its guard, so
// each way the guard must refuse has a case here, and each refusal must route
// the class back to a full judge rather than to a quieter drift judge.
const { test } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const ds = require('./drift-scope.js')
const { derive } = require('./derive-body-view.js')

// A real curriculum file, read only — instances and sidecars live in a sandbox.
const FILE = 'curriculum/exercises/close-the-ticket.md'
const slug = derive(FILE, { write: false }).slug
const sourceSha = derive(FILE, { write: false }).source_sha

function sandbox() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'drift-scope-test-'))
  const dirs = { viewsDir: path.join(root, 'views'), instancesDir: path.join(root, 'instances') }
  fs.mkdirSync(dirs.viewsDir, { recursive: true })
  fs.mkdirSync(dirs.instancesDir, { recursive: true })
  return dirs
}

const QUOTED = "L31 'Push back on the five. The ones you reject sharpen the read as much as the ones you keep.' reads as reframe, not instruction."
const row = (comp, idx, extra = {}) => ({ compendium: comp, rule_index: idx, rule_lead: 'lead', verdict: 'PASS', evidence: QUOTED, fix_hint: null, blocking: true, ...extra })
const MOVED = ['check_writing:3']

function writeInstance(dirs, cls, rows, extra = {}) {
  const p = path.join(dirs.instancesDir, `${slug}.${cls}.json`)
  fs.writeFileSync(p, JSON.stringify({
    class: cls, training: 'ae101', file: FILE, verdict: 'PASS', body_sha: 'old', shape_hash: 'shape0',
    rules_evaluated: rows, blocking_findings_count: 0, nonblocking_findings_count: 0, ...extra,
  }, null, 2) + '\n')
  return p
}

test('rule ids parse from every spelling the queue and the sweep use', () => {
  const want = { compendium: 'check_pedagogy.md', rule: '66' }
  for (const s of ['check_pedagogy:66', 'pedagogy:66', 'check_pedagogy.md:66', 'pedagogy §66', 'check_pedagogy §66']) {
    assert.deepEqual(ds.parseRuleIds([s]), [want], s)
  }
  assert.deepEqual(ds.parseRuleIds([{ compendium: 'check_pedagogy', rule: '66', changed_at: 'x' }]), [want])
  assert.throws(() => ds.parseRuleIds(['nonsense']), /cannot parse rule id/)
})

test('quotes come from line-anchored spans and an explicit quote field, not from greps', () => {
  const q = ds.quotesOf({ evidence: "L24 'No ticket of your own to read?' and grep -inE '\\b(ritual)\\b' → 0", quote: 'Push back on the five.' })
  assert.deepEqual(q.sort(), ['No ticket of your own to read?', 'Push back on the five.'].sort())
})

test('carry is kept when every carried quote is still in the body', () => {
  const dirs = sandbox()
  writeInstance(dirs, 'writing', [row('check_writing.md', 1), row('check_writing.md', 3), row('check_writing.md', 4)])
  const r = ds.planClass({ file: FILE, cls: 'writing', rules: MOVED, ...dirs })
  assert.equal(r.route, 'drift', r.reason)
  assert.equal(r.carried, 2)
})

test('one carried quote missing from the body sends the class to a full judge', () => {
  const dirs = sandbox()
  writeInstance(dirs, 'writing', [row('check_writing.md', 1),
    row('check_writing.md', 4, { evidence: "L31 'A sentence this file has never contained.'" })])
  const r = ds.planClass({ file: FILE, cls: 'writing', rules: MOVED, ...dirs })
  assert.equal(r.route, 'full')
  assert.match(r.reason, /quote no longer in the body/)
})

test('a quote on the row being replaced does not block the carry — that row is re-judged', () => {
  const dirs = sandbox()
  writeInstance(dirs, 'writing', [row('check_writing.md', 1),
    row('check_writing.md', 3, { evidence: "L31 'A sentence this file has never contained.'" })])
  assert.equal(ds.planClass({ file: FILE, cls: 'writing', rules: MOVED, ...dirs }).route, 'drift')
})

test('no prior instance → full judge', () => {
  const r = ds.planClass({ file: FILE, cls: 'writing', rules: MOVED, ...sandbox() })
  assert.equal(r.route, 'full')
  assert.match(r.reason, /no prior instance/)
})

test('a prior instance with no rule rows → full judge', () => {
  const dirs = sandbox()
  writeInstance(dirs, 'writing', [])
  assert.equal(ds.planClass({ file: FILE, cls: 'writing', rules: MOVED, ...dirs }).route, 'full')
})

test('behavior is never drift-scoped: its ledger is prompts_findings', () => {
  const dirs = sandbox()
  writeInstance(dirs, 'behavior', [row('check_prompts.md', 1)])
  const r = ds.planClass({ file: FILE, cls: 'behavior', rules: ['check_prompts:1'], ...dirs })
  assert.equal(r.route, 'full')
  assert.match(r.reason, /behavior/)
})

test('a carried blocking REVISE → full judge: a class owing a fix is not re-read by halves', () => {
  const dirs = sandbox()
  writeInstance(dirs, 'writing', [row('check_writing.md', 1, { verdict: 'REVISE', blocking: true })])
  assert.equal(ds.planClass({ file: FILE, cls: 'writing', rules: MOVED, ...dirs }).route, 'full')
})

test('a moved rule that no longer resolves, or sits outside the class lane → full judge', () => {
  const dirs = sandbox()
  writeInstance(dirs, 'writing', [row('check_writing.md', 1)])
  assert.equal(ds.planClass({ file: FILE, cls: 'writing', rules: ['check_writing:9999'], ...dirs }).route, 'full')
  assert.equal(ds.planClass({ file: FILE, cls: 'writing', rules: ['check_slides:1'], ...dirs }).route, 'full')
  assert.equal(ds.planClass({ file: FILE, cls: 'writing', rules: [], ...dirs }).route, 'full')
})

test('annotate splits a mixed item: drift classes get a plan, other classes get none', () => {
  const dirs = sandbox()
  writeInstance(dirs, 'writing', [row('check_writing.md', 1)])
  const items = [{
    file: FILE, instanceSlug: 'ae101--exercise--close-the-ticket', classes: ['writing', 'slides', 'pedagogy'],
    detail: { writing: 'rule-drift', slides: 'diff-region', pedagogy: 'rule-drift' },
    driftRules: { writing: [{ compendium: 'check_writing', rule: '3', changed_at: '2026-09-25' }], pedagogy: [{ compendium: 'check_pedagogy', rule: '1', changed_at: '2026-09-25' }] },
  }]
  const [it] = ds.annotate(items, dirs)
  assert.equal(it.driftScope.writing.route, 'drift')
  assert.deepEqual(it.driftScope.writing.rules, ['check_writing:3'])
  assert.equal(it.driftScope.pedagogy.route, 'full', 'no pedagogy instance in the sandbox')
  assert.equal(it.driftScope.slides, undefined, 'a diff-region class is not a drift candidate')
})

test('merge replaces only the moved rows, keeps the rest, recounts and marks scope', () => {
  const dirs = sandbox()
  const inst = writeInstance(dirs, 'writing', [row('check_writing.md', 1), row('check_writing.md', 3), row('check_writing.md', 4)])
  ds.writeRows(FILE, 'writing', { rules_evaluated: [row('check_writing.md', 3, { verdict: 'REVISE', blocking: false, fix_hint: 'state it now' })] }, dirs)
  const r = ds.mergeDrift({ file: FILE, cls: 'writing', rules: MOVED, ...dirs })
  assert.equal(r.status, 'merged', r.reason)
  const after = JSON.parse(fs.readFileSync(inst, 'utf8'))
  assert.equal(after.rules_evaluated.length, 3)
  assert.equal(after.rules_evaluated.find(x => x.rule_index === 3).verdict, 'REVISE')
  assert.equal(after.nonblocking_findings_count, 1)
  assert.equal(after.blocking_findings_count, 0)
  assert.equal(after.verdict, 'PASS')
  assert.equal(after.scope, 'drift')
  assert.deepEqual(after.drift_rules, ['check_writing.md §3'])
  assert.equal(after.body_sha, sourceSha)
  assert.equal(after.shape_hash, 'shape0', 'the shape hash is not re-vouched by a drift read')
})

test('a blocking replacement row makes the merged verdict REVISE', () => {
  const dirs = sandbox()
  const inst = writeInstance(dirs, 'writing', [row('check_writing.md', 1), row('check_writing.md', 3)])
  ds.writeRows(FILE, 'writing', { rules_evaluated: [row('check_writing.md', 3, { verdict: 'REVISE', blocking: true, fix_hint: 'x' })] }, dirs)
  assert.equal(ds.mergeDrift({ file: FILE, cls: 'writing', rules: MOVED, ...dirs }).verdict, 'REVISE')
  assert.equal(JSON.parse(fs.readFileSync(inst, 'utf8')).blocking_findings_count, 1)
})

test('merge re-checks the guard: a quote that went missing since the plan refuses and leaves the instance alone', () => {
  const dirs = sandbox()
  const inst = writeInstance(dirs, 'writing', [row('check_writing.md', 1, { evidence: "L3 'Nowhere in this file.'" }), row('check_writing.md', 3)])
  const before = fs.readFileSync(inst, 'utf8')
  ds.writeRows(FILE, 'writing', { rules_evaluated: [row('check_writing.md', 3)] }, dirs)
  const r = ds.mergeDrift({ file: FILE, cls: 'writing', rules: MOVED, ...dirs })
  assert.equal(r.status, 'fallback')
  assert.equal(fs.readFileSync(inst, 'utf8'), before)
})

test('merge refuses rows that do not cover exactly the moved rules', () => {
  const dirs = sandbox()
  writeInstance(dirs, 'writing', [row('check_writing.md', 1), row('check_writing.md', 3)])
  ds.writeRows(FILE, 'writing', { rules_evaluated: [] }, dirs)
  assert.equal(ds.mergeDrift({ file: FILE, cls: 'writing', rules: MOVED, ...dirs }).status, 'fallback', 'a moved rule with no row')
  ds.writeRows(FILE, 'writing', { rules_evaluated: [row('check_writing.md', 3), row('check_writing.md', 1)] }, dirs)
  assert.equal(ds.mergeDrift({ file: FILE, cls: 'writing', rules: MOVED, ...dirs }).status, 'fallback', 'a row for a rule that did not move')
})

test('merge with no rows file refuses rather than stamping the old ledger as re-read', () => {
  const dirs = sandbox()
  writeInstance(dirs, 'writing', [row('check_writing.md', 1), row('check_writing.md', 3)])
  assert.equal(ds.mergeDrift({ file: FILE, cls: 'writing', rules: MOVED, ...dirs }).status, 'fallback')
})

// ---------------------------------------------------------------------------
// derive-class-brief.js --rules: the drift judge's rulebook.
// ---------------------------------------------------------------------------
const brief = require('./derive-class-brief.js')

test('a rules-scoped brief carries only the named rules, whole, plus the output contract', () => {
  const r = brief.build(FILE, 'writing', { rules: ['check_writing:3', 'student_facing:2'] })
  assert.match(r.text, /^3\. \*\*No stale markers/m)
  assert.match(r.text, /A removal is recorded where the beat WAS/, 'the rule body is verbatim, carve-outs included')
  assert.match(r.text, /^2\. \*\*/m)
  assert.doesNotMatch(r.text, /^1\. \*\*Banned words/m, 'a rule that did not move is not in the brief')
  assert.match(r.text, /## Output contract — writing/)
  assert.equal(r.kept, 2)
})

test('a rules-scoped brief fails closed on an unknown rule or an out-of-lane compendium', () => {
  assert.throws(() => brief.build(FILE, 'writing', { rules: ['check_writing:9999'] }), /no §9999/)
  assert.throws(() => brief.build(FILE, 'writing', { rules: ['check_slides:1'] }), /not in the writing class/)
  assert.throws(() => brief.build(FILE, 'writing', { rules: [] }), /no rules/)
})

// ---------------------------------------------------------------------------
// judge-bench.js drift fixture: the scorer must credit a merge that caught the
// moved plant, and refuse one that did not — run offline through the real merge.
// ---------------------------------------------------------------------------
const bench = require('./judge-bench.js')

test('the drift bench scores the real merge: moved plant caught → pass, missed → fail', () => {
  const truth = JSON.parse(fs.readFileSync(path.join(bench.BENCH, 'fixtures', `${bench.DRIFT.name}.truth.json`), 'utf8'))
  const seed = fs.readFileSync(path.join(__dirname, '..', '..', '..', truth.drift.seed), 'utf8')
  const plant = truth.planted.find(p => p.id === truth.drift.moved_plant)
  for (const [caught, pass] of [[true, true], [false, false]]) {
    const dirs = sandbox()
    const inst = path.join(dirs.instancesDir, `${truth.drift.slug}.${truth.drift.cls}.json`)
    fs.writeFileSync(inst, seed)
    const r3 = caught
      ? { compendium: 'check_writing.md', rule_index: 3, rule_lead: 'lead', verdict: 'REVISE', blocking: true, evidence: `L${plant.line} '${plant.text}'`, fix_hint: 'delete it' }
      : { compendium: 'check_writing.md', rule_index: 3, rule_lead: 'lead', verdict: 'PASS', evidence: 'nothing narrates an edit', fix_hint: null, blocking: true }
    ds.writeRows(truth.fixture, truth.drift.cls, { rules_evaluated: [r3] }, dirs)
    const m = ds.mergeDrift({ file: truth.fixture, cls: truth.drift.cls, rules: [truth.drift.moved], ...dirs })
    assert.equal(m.status, 'merged', m.reason)
    const s = bench.scoreDrift(inst, truth)
    assert.equal(s.pass, pass, JSON.stringify(s))
    assert.equal(s.carried_intact, true)
  }
})

// AE101 M1 sweep: getting-going story drift-scoped, but its persona trace had
// been made from an older body. A drift judge re-reads rules, not the trace, so
// the verdict could not stamp (trace unbound) and the class owed a full judge
// anyway. Story drifts only on a trace bound to the body as it is now.
test('story drifts only when its persona trace is bound to the current body', () => {
  const crypto = require('node:crypto')
  const dirs = sandbox()
  dirs.simDir = path.join(path.dirname(dirs.viewsDir), 'sim')
  fs.mkdirSync(dirs.simDir)
  writeInstance(dirs, 'story', [row('check_pedagogy.md', 1), row('check_pedagogy.md', 66)])
  const trace = path.join(dirs.simDir, `${slug}.persona.json`)
  const plan = () => ds.planClass({ file: FILE, cls: 'story', rules: ['check_pedagogy:66'], ...dirs })

  let r = plan()
  assert.equal(r.route, 'full')
  assert.match(r.reason, /persona trace/)

  fs.writeFileSync(trace, JSON.stringify({ content_sha: 'f'.repeat(64) }))
  r = plan()
  assert.equal(r.route, 'full')
  assert.match(r.reason, /persona trace/)

  const sha = crypto.createHash('sha256').update(fs.readFileSync(FILE)).digest('hex')
  fs.writeFileSync(trace, JSON.stringify({ content_sha: sha }))
  assert.equal(plan().route, 'drift', plan().reason)
})
