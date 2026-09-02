#!/usr/bin/env node
// Tests for stamp-from-reeval.js — the join between a judge fleet's output and
// the Quality line. What is tested here is the shape adapter and the state
// ladder, not the git plumbing: the plumbing fails loudly, the ladder fails as
// a wrong word in a maintainer block that nobody re-reads.
'use strict'
const assert = require('node:assert')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const { readResults, adaptSweepRow, stateFor, makeSlugOf, flagName, groupByFile } = require('./stamp-from-reeval.js')

let n = 0
function test(name, fn) { fn(); n++; console.log(`ok ${n} - ${name}`) }

// The bug this guards: eval-sweep.js is the ONE dispatch door a queue-clearing
// session is told to use, and its output could not be stamped at all — it
// returns `.result.summary`, the reader asked for `.result.results`, and the
// run died on "no .result.results in output file". The two halves of the
// documented pipeline did not join. Hand-stamping around the gap is the real
// cost: the join is where WIP-skip, drift-skip and the verify-refuted rung
// live, so working around it silently drops the guards.
test('readResults accepts the eval-sweep summary shape, not only the fleet shape', () => {
  const sweep = {
    result: {
      summary: [{
        file: 'curriculum/lectures/a.md', class: 'slides', verdict: 'REVISE',
        todos: [{ rule: 'x' }], confirmed: [{ rule: 'check_slides.md §1' }], refuted: [], unadjudicated: [],
      }],
    },
  }
  const rows = readResults(sweep, () => 'cb--lecture--a')
  assert.strictEqual(rows.length, 1)
  assert.strictEqual(rows[0].cls, 'slides', 'the sweep says `class`, the stamper says `cls`')
  assert.strictEqual(rows[0].blocking, 1)
  assert.strictEqual(rows[0].todos, 1, 'todos arrive as a list and must be counted, never truthy-tested')

  const fleet = { result: { results: [{ file: 'a.md', cls: 'writing', verdict: 'PASS' }] } }
  assert.strictEqual(readResults(fleet, () => null)[0].cls, 'writing', 'the older shape still passes through untouched')
  assert.strictEqual(readResults({ result: {} }, () => null), null, 'neither shape is null, never an empty stamp run')
})

// The one direction a verification failure must not resolve.
test('adaptSweepRow: a finding the refuters never reached stays blocking', () => {
  const dead = adaptSweepRow({
    file: 'a.md', class: 'slides', verdict: 'REVISE',
    confirmed: [], refuted: [], unadjudicated: [{ rule: 'r', votes: 0 }], todos: [],
  })
  assert.strictEqual(dead.blocking, 1, 'unadjudicated is not refuted — a dead refuter must never read as a pass')
  assert.strictEqual(dead.verify, null)
  assert.match(stateFor(dead), /^REVISE:1\/0/)

  const refuted = adaptSweepRow({
    file: 'a.md', class: 'slides', verdict: 'REVISE',
    confirmed: [], refuted: [{ rule: 'r' }], unadjudicated: [], todos: [],
  })
  assert.deepStrictEqual(refuted.verify, { verdict: 'REFUTED', confirmed: 0 })

  const partial = adaptSweepRow({
    file: 'a.md', class: 'slides', verdict: 'REVISE',
    confirmed: [{ rule: 'r1' }], refuted: [{ rule: 'r2' }], unadjudicated: [], todos: [],
  })
  assert.deepStrictEqual(partial.verify, { verdict: 'PARTIAL', confirmed: 1 })
})

// The bug this guards: PASS_WITH_TODOS had no rung. It is not PASS (the note
// would be lost) and it is not REVISE (the file is not red), so it fell through
// to the REVISE branch and stamped a clean file as flagged. The sweep's own
// header records the same failure from the other end: a judge holding one
// non-blocking todo had to report REVISE, and the orchestrator read it as a gate.
test('stateFor: PASS_WITH_TODOS pins as a PASS that still carries its count', () => {
  const s = stateFor({ cls: 'slides', verdict: 'PASS_WITH_TODOS', todos: 3, blocking: 0, instanceSlug: 'cb--lecture--a' })
  assert.strictEqual(s, 'PASS:3 todos see instances/cb--lecture--a.slides.json')
  assert.ok(s.startsWith('PASS'), 'a non-blocking note must not stamp the class red')
  assert.strictEqual(
    stateFor({ cls: 'slides', verdict: 'PASS_WITH_TODOS', todos: 0, blocking: 0, instanceSlug: 'x' }), 'PASS',
    'no todos means no note to carry')
  assert.strictEqual(
    stateFor({ cls: 'slides', verdict: 'PASS_WITH_TODOS', todos: 1, blocking: 0, instanceSlug: 'x' }),
    'PASS:1 todo see instances/x.slides.json', 'one todo is not "1 todos"')
})

// The bug this guards: judges file todos under BOTH pass verdicts, and a bare
// `PASS` dropped every one of them off the row. In one M1-M5 sweep that hid four
// notes across three classes behind rows reading clean, with no pointer to the
// instance holding them. The verdict word stays the judge's; the pointer is the
// difference between a filed note and a lost one.
test('stateFor: a plain PASS still carries the todos filed under it', () => {
  assert.strictEqual(
    stateFor({ cls: 'technical', verdict: 'PASS', todos: 2, blocking: 0, instanceSlug: 'ae101--module--x' }),
    'PASS:2 todos see instances/ae101--module--x.technical.json')
  assert.strictEqual(
    stateFor({ cls: 'technical', verdict: 'PASS', todos: 0, blocking: 0, instanceSlug: 'ae101--module--x' }), 'PASS',
    'a clean PASS stays a bare PASS — no note invented to look thorough')
})

test('stateFor: a refuted finding passes, and does not swallow the todos beside it', () => {
  assert.strictEqual(
    stateFor({ cls: 'slides', verdict: 'REVISE', todos: 0, blocking: 0, instanceSlug: 'x', verify: { verdict: 'REFUTED', confirmed: 0 } }),
    'PASS:verify-refuted')
  assert.strictEqual(
    stateFor({ cls: 'slides', verdict: 'REVISE', todos: 3, blocking: 0, instanceSlug: 'x', verify: { verdict: 'REFUTED', confirmed: 0 } }),
    'PASS:verify-refuted, 3 todos see instances/x.slides.json',
    'the finding died, the three notes beside it did not')
  assert.strictEqual(stateFor({ cls: 'slides', verdict: 'AGENT-LOST' }), null, 'a lost agent stamps nothing at all')
})

// The bug this guards, three defects in one flag. A cross_module verdict came
// back and the stamper emitted `--cross_module PASS:2 todos` against ONE file:
// (1) update-quality.sh's flag is `--cross-module`, so the run would have died
// on an unrecognised argument; (2) the note carried no `set=[…]`, and the
// queue's own dispatch prompt says a row stamped on no member is invisible to
// it — a PASS nobody can see is a re-fire next sweep; (3) a set verdict speaks
// for every member, and stamping only the file the summary happened to name
// leaves the other three still owing the row they already earned.
test('cross_module: one verdict, one flag name, every member', () => {
  const rows = readResults({
    result: {
      summary: [{
        file: 'curriculum/trainings/t/prework.md', class: 'cross_module', verdict: 'PASS',
        set_name: 'prework-m3',
        module_set: ['curriculum/trainings/t/prework.md', 'curriculum/trainings/t/m1.md'],
        confirmed: [], refuted: [], unadjudicated: [], todos: [{ rule: 'x' }, { rule: 'y' }],
      }],
    },
  }, () => 'ae101--module-set--prework-m3')
  assert.strictEqual(rows.length, 1)
  assert.deepStrictEqual(rows[0].targets, ['curriculum/trainings/t/prework.md', 'curriculum/trainings/t/m1.md'],
    'the row lands on every member, not only the file the summary named')
  assert.strictEqual(flagName(rows[0].cls), '--cross-module', 'update-quality.sh spells it kebab; the class is snake')
  const s = stateFor(rows[0], { pairs: 3, blocking: 0 })
  assert.match(s, /^PASS:set=\[prework,m1\]/, 'the queue matches the row to its set on this substring')
  assert.match(s, /3 pairs, 0 blocking/)
  assert.match(s, /; see instances\/ae101--module-set--prework-m3\.cross_module\.json$/)
})

test('cross_module with no member list stamps nothing rather than guessing one', () => {
  const rows = readResults({
    result: {
      summary: [{
        file: 'curriculum/trainings/t/prework.md', class: 'cross_module', verdict: 'PASS',
        set_name: null, module_set: null, confirmed: [], refuted: [], unadjudicated: [], todos: [],
      }],
    },
  }, () => null)
  assert.deepStrictEqual(rows[0].targets, [], 'a set whose members are unknown is not a set — fail closed, do not stamp the one file named')
})

// The bug this guards: judges write `file` absolute (760 of 803 instances do —
// it is the corpus convention, not a slip), and the grouping key went straight
// into `path.join(repo, file)`, which for an absolute second argument appends
// rather than replaces: /repo/Users/…/repo/curriculum/… ENOENT. The whole run
// died on row one, so a returning fleet of 28 clean verdicts stamped nothing.
// Normalise at the grouping step — one dialect downstream, for git and fs alike.
test('groupByFile keys on the repo-relative path whichever dialect the judge wrote', () => {
  const repo = '/Users/x/Projects/agents-102'
  const rel = 'curriculum/exercises/a.md'
  const { byFile, noTarget } = groupByFile([
    { file: `${repo}/${rel}`, cls: 'writing', verdict: 'PASS' },
    { file: rel, cls: 'slides', verdict: 'PASS' },
  ], repo)
  assert.deepStrictEqual([...byFile.keys()], [rel], 'both dialects name one file, so they group as one')
  assert.strictEqual(byFile.get(rel).length, 2)
  assert.deepStrictEqual(noTarget, [])

  // A set row's members get the same treatment, and every member is a key.
  const { byFile: sets } = groupByFile([{
    file: `${repo}/curriculum/m1.md`, cls: 'cross_module', verdict: 'PASS',
    targets: [`${repo}/curriculum/m1.md`, 'curriculum/m2.md'],
  }], repo)
  assert.deepStrictEqual([...sets.keys()], ['curriculum/m1.md', 'curriculum/m2.md'])

  // Outside the repo it stays verbatim: git fails loudly on a stray path, which
  // beats silently rewriting it into a file that happens to exist here.
  const { byFile: away } = groupByFile([{ file: '/etc/passwd', cls: 'writing', verdict: 'PASS' }], repo)
  assert.deepStrictEqual([...away.keys()], ['/etc/passwd'])

  const { byFile: none, noTarget: skipped } = groupByFile(
    [{ file: `${repo}/${rel}`, cls: 'cross_module', verdict: 'PASS', targets: [] }], repo)
  assert.strictEqual(none.size, 0)
  assert.deepStrictEqual(skipped, [{ cls: 'cross_module', file: `${repo}/${rel}` }],
    'a set with no members is reported, not guessed at')
})

test('makeSlugOf resolves the slug from the instance the judge just wrote', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'stamp-'))
  const dir = path.join(root, 'curriculum/evals/instances')
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path.join(dir, 'cb--lecture--a.slides.json'), JSON.stringify({ file: 'curriculum/lectures/a.md', class: 'slides' }))
  fs.writeFileSync(path.join(dir, 'cb--lecture--b.slides.json'), JSON.stringify({ file: 'curriculum/lectures/b.md', class: 'slides' }))
  fs.writeFileSync(path.join(dir, 'broken.slides.json'), '{ not json')
  // The bug this guards: judges write `file` by hand, and nine of fourteen in
  // one sweep wrote an absolute /Users path. String equality found none of them,
  // so the pointer to the evidence dropped off precisely the REVISE rows that
  // exist to be read. Match on the repo-relative suffix.
  fs.writeFileSync(path.join(dir, 'cb--lecture--c.slides.json'),
    JSON.stringify({ file: '/Users/someone/Projects/agents-102/curriculum/lectures/c.md', class: 'slides' }))
  const slugOf = makeSlugOf(root)
  assert.strictEqual(slugOf('curriculum/lectures/c.md', 'slides'), 'cb--lecture--c')
  assert.strictEqual(slugOf('curriculum/lectures/a.md', 'slides'), 'cb--lecture--a')
  assert.strictEqual(slugOf('curriculum/lectures/b.md', 'slides'), 'cb--lecture--b', 'an unreadable sibling must not abort the scan')
  assert.strictEqual(slugOf('curriculum/lectures/never.md', 'slides'), null)

  // A set instance names no `file`, and one member can sit in two sets, so the
  // whole membership is the key. Matching on "contains this file" would have
  // picked whichever set sorted first and stamped the wrong row.
  fs.writeFileSync(path.join(dir, 'ae101--module-set--prework-m3.cross_module.json'),
    JSON.stringify({ module_set: ['curriculum/trainings/t/prework.md', 'curriculum/trainings/t/m1.md'] }))
  fs.writeFileSync(path.join(dir, 'ae101--module-set--m1-m2.cross_module.json'),
    JSON.stringify({ module_set: ['curriculum/trainings/t/m1.md', 'curriculum/trainings/t/m2.md'] }))
  assert.strictEqual(
    slugOf('curriculum/trainings/t/m1.md', 'cross_module', ['curriculum/trainings/t/m1.md', 'curriculum/trainings/t/m2.md']),
    'ae101--module-set--m1-m2', 'm1 is in both sets; only the membership tells them apart')
  assert.strictEqual(slugOf('curriculum/trainings/t/m1.md', 'cross_module', null), null,
    'no membership, no match — never a first-hit guess')
  // A slug it could not resolve drops the pointer rather than writing a path
  // that resolves nowhere — a note pointing at a missing file reads as evidence.
  assert.strictEqual(
    stateFor({ cls: 'slides', verdict: 'PASS_WITH_TODOS', todos: 2, blocking: 0, instanceSlug: null }), 'PASS:2 todos')
})

console.log(`1..${n}`)
