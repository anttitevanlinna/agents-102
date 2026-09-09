#!/usr/bin/env node
// Tests for settle-card.js — the only write path onto a triage row's ruling.
//
// The hazards are all silent ones. A selector that matches two rows settles the
// wrong card and the queue looks one shorter. A second `card` object overwrites
// the first and deletes the only record of a ruling. A reserialise at the wrong
// indent turns a one-row change into a 750K diff. Each gets a test.
'use strict'
const assert = require('node:assert')
const { OUTCOMES, toRows, findRow, settle } = require('./settle-card.js')

let n = 0
function test(name, fn) { fn(); n++; console.log(`ok ${n} - ${name}`) }

const row = (rule, file, extra) => Object.assign({ rule, target_file: file, disposition: 'CARD' }, extra)
const card = { outcome: 'declined', at: '2026-09-09', note: 'suppressed on dose' }

test('a unique selector settles exactly that row', () => {
  const ledger = [row('prompts 43', 'a.md'), row('writing 3', 'b.md')]
  const res = settle(ledger, { rule: 'prompts 43' }, card)
  assert.strictEqual(res.index, 0)
  assert.deepStrictEqual(res.out[0].card, card)
  assert.strictEqual(res.out[1].card, undefined, 'the sibling row is untouched')
})

test('an ambiguous selector refuses rather than picking one', () => {
  // The rule fires on several files at once — this is the normal case, not an
  // edge one, and settling "the prompts 38 card" would be a coin flip.
  const ledger = [row('prompts 38', 'a.md'), row('prompts 38', 'b.md')]
  const res = settle(ledger, { rule: 'prompts 38' }, card)
  assert.ok(res.error && /2 rows match/.test(res.error), 'names the count')
  assert.ok(res.error.includes('a.md') && res.error.includes('b.md'), 'lists the candidates so the next call can disambiguate')
  assert.strictEqual(ledger[0].card, undefined, 'nothing is written on a refusal')

  const narrowed = settle(ledger, { rule: 'prompts 38', file: 'b.md' }, card)
  assert.strictEqual(narrowed.index, 1)
})

test('a selector that matches nothing is an error, never a no-op success', () => {
  const res = settle([row('prompts 43', 'a.md')], { rule: 'prompts 99' }, card)
  assert.ok(res.error && /no row matches/.test(res.error))
})

test('an already-settled row is never re-ruled', () => {
  const prior = { outcome: 'applied', at: '2026-09-08', note: 'landed' }
  const res = settle([row('prompts 43', 'a.md', { card: prior })], { rule: 'prompts 43' }, card)
  assert.ok(res.error && /already settled as "applied"/.test(res.error),
    'overwriting a card deletes the only record that a ruling was made')
})

test('the instance disambiguates when rule and file cannot', () => {
  const ledger = [
    row('student_facing 21', 'earn-the-trust.md', { instance: 'x.pedagogy.json' }),
    row('student_facing 21', 'earn-the-trust.md', { instance: 'x.writing.json' }),
  ]
  assert.ok(settle(ledger, { rule: 'student_facing 21', file: 'earn-the-trust.md' }, card).error)
  assert.strictEqual(settle(ledger, { instance: 'x.writing.json' }, card).index, 1)
})

test('both ledger shapes go back out in the shape they came in', () => {
  const arr = [row('prompts 43', 'a.md')]
  assert.ok(Array.isArray(settle(arr, { rule: 'prompts 43' }, card).out))

  const keyed = { 0: row('prompts 43', 'a.md'), 1: row('writing 3', 'b.md') }
  const res = settle(keyed, { rule: 'writing 3' }, card)
  assert.ok(!Array.isArray(res.out), 'a keyed ledger stays keyed')
  assert.deepStrictEqual(Object.keys(res.out), ['0', '1'])
  assert.deepStrictEqual(res.out['1'].card, card)
})

test('the outcome vocabulary is the four the ledger already uses', () => {
  assert.deepStrictEqual([...OUTCOMES].sort(), ['applied', 'declined', 'dropped', 'stale'])
})

test('reading the ledger does not depend on which shape it is in', () => {
  assert.strictEqual(toRows([row('a', 'x')]).rows.length, 1)
  assert.strictEqual(toRows({ 0: row('a', 'x'), 1: row('b', 'y') }).rows.length, 2)
  assert.deepStrictEqual(findRow([row('a', 'x'), row('a', 'y')], { rule: 'a' }), [0, 1])
})

console.log(`1..${n}`)
