#!/usr/bin/env node
// Tests for rule-heat.js — the read that turns a todo pile into rule feedback.
//
// The arithmetic is simple; what is worth pinning is the grouping. Every one of
// these guards a way the counts could quietly describe the wrong thing, and a
// wrong count here sends the maintainer to amend a rule that was fine.
'use strict'
const assert = require('node:assert')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const { heat, rank, ruleKey } = require('./rule-heat.js')

let n = 0
function test(name, fn) { fn(); n++; console.log(`ok ${n} - ${name}`) }

function fixture(instances) {
  const repo = fs.mkdtempSync(path.join(os.tmpdir(), 'heat-'))
  const dir = path.join(repo, 'curriculum/evals/instances')
  fs.mkdirSync(dir, { recursive: true })
  for (const [name, inst] of Object.entries(instances)) {
    fs.writeFileSync(path.join(dir, name), JSON.stringify(inst))
  }
  return repo
}
const row = (compendium, rule_index, blocking, extra = {}) => Object.assign(
  { compendium, rule_index, verdict: 'REVISE', blocking, rule_lead: 'lead text', evidence: 'because' }, extra)
const inst = (file, cls, rules, training = 'ae101') =>
  ({ class: cls, training, file, verdict: 'REVISE', rules_evaluated: rules })

// `rule_index` arrives as both 20 and "20" across the corpus — the same rule
// written by two judges. Keyed apart, one hot rule reads as two lukewarm ones
// and never surfaces high enough to be looked at.
test('a rule is one rule whether its index was written as a number or a string', () => {
  assert.strictEqual(ruleKey({ compendium: 'check_writing.md', rule_index: 20 }), 'writing §20')
  assert.strictEqual(ruleKey({ compendium: 'check_writing.md', rule_index: '20' }), 'writing §20')

  const repo = fixture({
    'ae101--exercise--a.writing.json': inst('/r/a.md', 'writing', [row('check_writing.md', 20, false)]),
    'ae101--exercise--b.writing.json': inst('/r/b.md', 'writing', [row('check_writing.md', '20', false)]),
  })
  const { rules } = heat(repo, 'ae101')
  assert.strictEqual(rules.length, 1, 'both spellings land on one rule')
  assert.strictEqual(rules[0].todos.length, 2)
})

// The whole point of the instrument: a rule that fires and never gates is the
// one to tune. Counting todos and blocking findings together would hide it.
test('todos and blocking findings are counted apart', () => {
  const repo = fixture({
    'ae101--exercise--a.writing.json': inst('/r/a.md', 'writing', [
      row('check_writing.md', 3, false), row('check_writing.md', 3, true), row('check_writing.md', 9, true),
    ]),
  })
  const { rules } = heat(repo, 'ae101')
  const w3 = rules.find(r => r.key === 'writing §3')
  assert.strictEqual(w3.todos.length, 1)
  assert.strictEqual(w3.blocking.length, 1)
  const w9 = rules.find(r => r.key === 'writing §9')
  assert.strictEqual(w9.todos.length, 0, 'a rule that only ever blocked has no todos to tune')
  assert.strictEqual(w9.blocking.length, 1)

  // A PASS row is not a finding and must never inflate a rule's heat.
  const clean = fixture({
    'ae101--exercise--a.writing.json': inst('/r/a.md', 'writing',
      [{ compendium: 'check_writing.md', rule_index: 3, verdict: 'PASS', blocking: true }]),
  })
  assert.strictEqual(heat(clean, 'ae101').rules.length, 0)
})

// One rule firing once on ten files is a rule problem. One firing ten times on
// a single file is that file's problem. The ranking has to be able to tell them
// apart, so distinct files are tracked, not just raw hits.
test('ranking separates a broad rule from a locally noisy one', () => {
  const repo = fixture({
    'ae101--exercise--a.writing.json': inst('/r/a.md', 'writing', [row('check_writing.md', 1, false), row('check_writing.md', 1, false)]),
    'ae101--exercise--b.writing.json': inst('/r/b.md', 'writing', [row('check_prompts.md', 2, false)]),
    'ae101--exercise--c.writing.json': inst('/r/c.md', 'writing', [row('check_prompts.md', 2, false)]),
  })
  const { rules, fileCount } = heat(repo, 'ae101')
  assert.strictEqual(fileCount, 3)
  const w = rules.find(r => r.key === 'writing §1')
  const p = rules.find(r => r.key === 'prompts §2')
  assert.strictEqual(w.files.size, 1, 'two hits, one file')
  assert.strictEqual(p.files.size, 2, 'two hits, two files')
  // Equal todo counts, so the tie breaks on spread — the broader rule ranks first.
  assert.strictEqual(rank([w, p])[0].key, 'prompts §2')
})

// Rule calibration is per corpus. Averaging three trainings' habits together
// describes none of them, which is the whole reason --training has no default.
test('one training at a time, and the class travels with each hit', () => {
  const repo = fixture({
    'ae101--exercise--a.writing.json': inst('/r/a.md', 'writing', [row('check_writing.md', 3, false)]),
    'ae101--exercise--a.slides.json': inst('/r/a.md', 'slides', [row('check_writing.md', 3, false)]),
    'agents-101--exercise--z.writing.json': inst('/r/z.md', 'writing', [row('check_writing.md', 3, false)], 'agents-101'),
  })
  const ae = heat(repo, 'ae101')
  assert.strictEqual(ae.rules[0].todos.length, 2, 'the neighbouring training is not averaged in')
  assert.strictEqual(ae.fileCount, 1, 'two classes judged one file')
  assert.deepStrictEqual([...ae.rules[0].classes].sort(), ['slides', 'writing'],
    'which classes raise a rule is part of reading it')
  assert.strictEqual(heat(repo, 'agents-101').rules[0].todos.length, 1)
})

// The bug this guards: the corpus holds instances whose `rules_evaluated` is an
// OBJECT, not an array, and `for (const r of {})` throws. Every fixture here was
// written well-formed, so the tests passed and the first real run died on line
// one. A reader over a corpus with no schema has to survive the corpus it has,
// not the one its fixtures describe.
test('a malformed ledger costs its own instance, not the whole read', () => {
  const repo = fixture({
    'ae101--exercise--a.writing.json': inst('/r/a.md', 'writing', [row('check_writing.md', 3, false)]),
    'ae101--exercise--b.writing.json': inst('/r/b.md', 'writing', { '0': row('check_writing.md', 3, false) }),
    'ae101--exercise--c.writing.json': inst('/r/c.md', 'writing', 'not a ledger at all'),
    'ae101--exercise--d.writing.json': inst('/r/d.md', 'writing', [null, 'stray', row('check_writing.md', 3, false)]),
  })
  const { rules } = heat(repo, 'ae101')
  assert.strictEqual(rules.length, 1)
  assert.strictEqual(rules[0].todos.length, 2, 'the two well-formed ledgers are read; the other two are skipped')
})

test('an unreadable instance is skipped without taking the scan down with it', () => {
  const repo = fixture({ 'ae101--exercise--a.writing.json': inst('/r/a.md', 'writing', [row('check_writing.md', 3, false)]) })
  fs.writeFileSync(path.join(repo, 'curriculum/evals/instances/broken.writing.json'), '{ not json')
  assert.strictEqual(heat(repo, 'ae101').rules[0].todos.length, 1)
})

console.log(`1..${n}`)
