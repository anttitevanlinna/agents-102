#!/usr/bin/env node
// Tests for open-cards.js — the reader that owns the triage ledger.
//
// The defect this reader was written against was a counting one, so that is
// what is tested. Reading "every row with no card.outcome" as the backlog gives
// 131 where the answer is 26, because `card.outcome` is only ever written on a
// CARD row and its absence says nothing about a REFUTE or a STALE. An overstated
// backlog is worse than no backlog: it is a number a person will act on.
'use strict'
const assert = require('node:assert')
const { rows, isOpenCard, editState, summarise, render } = require('./open-cards.js')

let n = 0
function test(name, fn) { fn(); n++; console.log(`ok ${n} - ${name}`) }

const card = extra => Object.assign({ disposition: 'CARD', rule: 'writing 3' }, extra)

test('open cards are CARD rows nobody has ruled on', () => {
  assert.ok(isOpenCard(card()))
  assert.ok(!isOpenCard(card({ card: { outcome: 'applied' } })), 'a ruled card is closed')
  assert.ok(!isOpenCard(card({ disposition: 'card' })) === false, 'disposition is case-insensitive')

  // The count that was got wrong by hand. Only the CARD row is open; the other
  // three were settled by their disposition and never owed a ruling.
  const ledger = [
    card(),
    { disposition: 'REFUTE', rule: 'writing 3' },
    { disposition: 'STALE', rule: 'slides 6' },
    { disposition: 'MAINTAINER', rule: 'prompts 36' },
  ]
  assert.strictEqual(summarise(ledger).cards.length, 1,
    'REFUTE / STALE / MAINTAINER rows are not cards awaiting a ruling')
})

test('a prepped edit is classified by reading the file, not a flag', () => {
  const files = { '/r/a.md': 'the new text is here', '/r/b.md': 'the old text is here', '/r/c.md': 'neither one' }
  const read = p => (p in files ? files[p] : null)
  const row = f => ({ disposition: 'MAINTAINER', target_file: f, old_string: 'the old text', new_string: 'the new text' })

  assert.strictEqual(editState(row('a.md'), '/r', read), 'applied')
  assert.strictEqual(editState(row('b.md'), '/r', read), 'pending')
  assert.strictEqual(editState(row('c.md'), '/r', read), 'moved',
    'neither span present means the anchor moved — re-derive, never apply blind')
  assert.strictEqual(editState(row('gone.md'), '/r', read), 'unreadable')
  assert.strictEqual(editState({ disposition: 'MAINTAINER' }, '/r', read), null, 'a row with no edit is not a prepped edit')

  // The whole point of testing the file: an edit that landed without anyone
  // marking the ledger still reports as done, and never as work.
  const s = summarise([row('a.md'), row('b.md'), row('c.md')], { repo: '/r', readFile: read })
  assert.deepStrictEqual(
    [s.prepped.applied.length, s.prepped.pending.length, s.prepped.moved.length], [1, 1, 1])
})

test('a settled row contributes no work of either kind', () => {
  const s = summarise([
    card({ card: { outcome: 'dropped' } }),
    { disposition: 'MAINTAINER', card: { outcome: 'applied' }, target_file: 'x.md', old_string: 'a', new_string: 'b' },
  ], { repo: '/r', readFile: () => 'a' })
  assert.strictEqual(s.cards.length, 0)
  assert.strictEqual(s.prepped.pending.length, 0, 'a ruled row is not re-offered as pending')
  assert.strictEqual(s.dispositions['settled:dropped'], 1)
  assert.strictEqual(s.dispositions['settled:applied'], 1)
})

test('both ledger shapes read the same', () => {
  const asArray = [card(), card({ rule: 'slides 6' })]
  const asKeyedObject = { 0: asArray[0], 1: asArray[1] }
  assert.strictEqual(rows(asArray).length, 2)
  assert.strictEqual(rows(asKeyedObject).length, 2, 'the "0","1","2" object shape is the same ledger')
  assert.strictEqual(summarise(asKeyedObject).cards.length, 2)
  assert.deepStrictEqual(rows(null), [])
  assert.deepStrictEqual(rows({}), [])
})

test('cards group by rule and by value_rank', () => {
  const s = summarise([
    card({ rule: 'writing 3', gate_triage: { value_rank: 3 } }),
    card({ rule: 'writing 3', gate_triage: { value_rank: 1 } }),
    card({ rule: 'slides 6' }),
  ])
  assert.strictEqual(s.byRule['writing 3'], 2)
  assert.strictEqual(s.byRule['slides 6'], 1)
  assert.strictEqual(s.byRank['3'], 1)
  assert.strictEqual(s.byRank['(unranked)'], 1, 'an unranked card is shown, not dropped')
})

test('a file scope keeps only the rows that name that file', () => {
  const ledger = [
    card({ rule: 'prompts 2', target_file: 'curriculum/trainings/ae101/prework.md' }),
    card({ rule: 'writing 3', target_file: 'curriculum/lectures/what-packaging-is.md' }),
    // Filed on prework's instance, but the rule binds a different document. A
    // person asking what is open on prework wants this row too.
    card({ rule: 'strategy_tie_in 8', target_file: 'bosser-strategy/content.md', instance: 'ae101--module--prework.strategy.json' }),
  ]
  assert.strictEqual(summarise(ledger, { file: 'prework' }).cards.length, 2,
    'matched on target_file OR the judged instance')
  assert.strictEqual(summarise(ledger, { file: 'what-packaging-is' }).cards.length, 1)
  assert.strictEqual(summarise(ledger, { file: 'no-such-page' }).cards.length, 0,
    'an unmatched scope reports nothing open, never the whole corpus')
  assert.strictEqual(summarise(ledger, { file: 'PREWORK' }).cards.length, 2, 'scope is case-insensitive')
  assert.strictEqual(summarise(ledger).cards.length, 3, 'no scope is the whole training')
})

test('a file scope narrows the prepped edits and the ledger total with them', () => {
  const read = () => 'the old text is here'
  const row = f => ({ disposition: 'MAINTAINER', target_file: f, old_string: 'the old text', new_string: 'the new text' })
  const s = summarise([row('a/prework.md'), row('b/other.md')], { repo: '/r', readFile: read, file: 'prework' })
  assert.strictEqual(s.prepped.pending.length, 1)
  assert.strictEqual(s.total, 1, 'the denominator is the scope, not the corpus')
})

test('a scoped report names the scope and shows each card\'s claim', () => {
  const out = render(summarise([card({ rule: 'prompts 2', target_file: 'x/prework.md', claim: 'Prompt C has no lead-in.' })],
    { file: 'prework' }), 'ae101', 'prework')
  assert.ok(out.includes('prework'), 'the scope is stated, so a zero cannot be read as the corpus')
  assert.ok(out.includes('Prompt C has no lead-in.'),
    'scoped to one file there is room for the finding itself, not just a rule number')
})

console.log(`1..${n}`)
