#!/usr/bin/env node
// Tests for migrate-todo-vocabulary.js
'use strict'
const assert = require('node:assert')
const { migrate, todoToNote, risksToSuggestions } = require('./migrate-todo-vocabulary.js')

let n = 0
function test(name, fn) { fn(); n++; console.log(`ok ${n} - ${name}`) }

test('todoToNote: a bare string keeps its text and gains provenance', () => {
  assert.deepStrictEqual(todoToNote('L12 reads oddly'), { from: 'todos[]', note: 'L12 reads oddly' })
})
test('todoToNote: an object keeps every field it had', () => {
  const t = { rule: 'check_pedagogy.md #65', note: 'x', line: 57 }
  assert.deepStrictEqual(todoToNote(t), { from: 'todos[]', rule: 'check_pedagogy.md #65', note: 'x', line: 57 })
})

test('migrate: todos[] moves to notes[] and the array is removed', () => {
  const { out, changes } = migrate({ todos: ['a', { note: 'b' }] })
  assert.strictEqual(out.todos, undefined)
  assert.strictEqual(out.notes.length, 2)
  assert(changes.some(c => c.includes('todos[]->notes[]')))
})
test('migrate: existing notes[] are preserved, not overwritten', () => {
  const { out } = migrate({ notes: ['keep me'], todos: ['new'] })
  assert.strictEqual(out.notes.length, 2)
  assert.strictEqual(out.notes[0], 'keep me')
})
// 191 instances carry `notes` as a bare STRING, not an array. Spreading one
// with an object-or-array helper yields [] and silently deletes it; that cost
// 9 notes on the first run before the diff caught it.
test('migrate: a string-valued notes survives the merge', () => {
  const { out } = migrate({ notes: 'a long prose note', todos: ['new'] })
  assert(out.notes.includes('a long prose note'), 'string note must survive')
  assert.strictEqual(out.notes.length, 2)
})
test('migrate: a string-valued notes survives even with no todos', () => {
  const { out } = migrate({ notes: 'prose', todos_count: 1 })
  assert.strictEqual(out.notes, 'prose')
})
test('migrate: an object-valued notes is not exploded into its values', () => {
  const { out } = migrate({ notes: { a: 'x', b: 'y' }, todos: ['new'] })
  assert.strictEqual(out.notes.length, 2)
  assert.deepStrictEqual(out.notes[0], { a: 'x', b: 'y' })
})
test('migrate: todos_count becomes nonblocking_findings_count, same value', () => {
  const { out } = migrate({ todos_count: 3 })
  assert.strictEqual(out.nonblocking_findings_count, 3)
  assert.strictEqual(out.todos_count, undefined)
})
test('migrate: a non-integer todos_count lands as 0 rather than propagating junk', () => {
  const { out } = migrate({ todos_count: null })
  assert.strictEqual(out.nonblocking_findings_count, 0)
})
test('migrate: an existing nonblocking_findings_count wins over the legacy field', () => {
  const { out } = migrate({ todos_count: 9, nonblocking_findings_count: 4 })
  assert.strictEqual(out.nonblocking_findings_count, 4)
})

const behavior = {
  prompts_findings: [
    { prompt_index: 0, verdict: 'TODO', risks_fired: [{ pattern_id: 'question-dump', fix_hint: 'ask one at a time', evidence: 'L4' }] },
    { prompt_index: 1, verdict: 'REVISE', risks_fired: [{ pattern_id: 'x', fix_hint: 'y' }] },
    { prompt_index: 2, verdict: 'TODO', risks_fired: [{ pattern_id: 'z', fix_hint: '   ' }] },
  ],
  todos_count: 2,
}

test('migrate: a prompt TODO becomes PASS', () => {
  const { out } = migrate(behavior)
  assert.strictEqual(out.prompts_findings[0].verdict, 'PASS')
  assert.strictEqual(out.prompts_findings[2].verdict, 'PASS')
})
test('migrate: REVISE prompts are untouched', () => {
  const { out } = migrate(behavior)
  assert.strictEqual(out.prompts_findings[1].verdict, 'REVISE')
})
test('migrate: each fired risk naming a fix becomes one suggestion', () => {
  const { out } = migrate(behavior)
  assert.strictEqual(out.suggestions.length, 1)
  assert.strictEqual(out.suggestions[0].rule, 'question-dump')
  assert.strictEqual(out.suggestions[0].note, 'ask one at a time')
  assert.strictEqual(out.suggestions_count, 1)
})
test('migrate: a whitespace-only fix_hint yields no suggestion', () => {
  const s = risksToSuggestions({ prompt_index: 0, risks_fired: [{ pattern_id: 'z', fix_hint: '  ' }] })
  assert.strictEqual(s.length, 0)
})
test('migrate: a behavior instance carries no non-blocking rule findings', () => {
  const { out } = migrate(behavior)
  assert.strictEqual(out.nonblocking_findings_count, 0)
})
test('migrate: PASS_WITH_TODOS collapses to PASS', () => {
  const { out, changes } = migrate({ verdict: 'PASS_WITH_TODOS' })
  assert.strictEqual(out.verdict, 'PASS')
  assert(changes.includes('PASS_WITH_TODOS->PASS'))
})
test('migrate: a REVISE verdict is never rewritten', () => {
  const { out } = migrate({ verdict: 'REVISE', todos_count: 1 })
  assert.strictEqual(out.verdict, 'REVISE')
})
test('migrate: an already-migrated instance reports no changes (idempotent)', () => {
  const { out } = migrate(behavior)
  const { changes } = migrate(out)
  assert.deepStrictEqual(changes, [])
})
// The legacy count was inflated by todos[] rows that are notes, not findings.
// Leaving it declared promotes a former debt row into a hard gate failure,
// because removing the rival ledger leaves one count to be right about.
test('migrate: the count is recomputed from surviving rule rows', () => {
  const rows = [
    { verdict: 'REVISE', blocking: false },
    { verdict: 'REVISE', blocking: true },
    { verdict: 'PASS', blocking: false },
  ]
  const { out } = migrate({ todos_count: 4, todos: ['a note'], rules_evaluated: rows })
  assert.strictEqual(out.nonblocking_findings_count, 1)
})
test('migrate: with no ledger at all the count is 0, not the stale number', () => {
  const { out } = migrate({ todos_count: 2, todos: ['only a note'] })
  assert.strictEqual(out.nonblocking_findings_count, 0)
})
test('migrate: an instance with no legacy todos keeps its declared count', () => {
  const { out } = migrate({ todos_count: 3, rules_evaluated: [{ verdict: 'REVISE', blocking: false }] })
  assert.strictEqual(out.nonblocking_findings_count, 3)
})

test('migrate: rules_evaluated is left entirely alone', () => {
  const rows = [{ compendium: 'check_writing.md', rule_index: 20, verdict: 'REVISE', blocking: false }]
  const { out } = migrate({ rules_evaluated: rows, todos_count: 1 })
  assert.deepStrictEqual(out.rules_evaluated, rows)
})

console.log(`\n${n} tests passed`)
