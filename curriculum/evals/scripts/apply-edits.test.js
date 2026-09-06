'use strict'
const { test } = require('node:test')
const assert = require('node:assert')
const { applyAll, countOccurrences } = require('./apply-edits.js')

function mem(files) {
  const store = new Map(Object.entries(files))
  return {
    store,
    readFile: p => (store.has(p) ? store.get(p) : null),
    writeFile: (p, t) => store.set(p, t),
  }
}

test('a unique span is replaced, and an empty new_string deletes it', () => {
  const io = mem({ 'a.md': 'keep\nold line\nkeep\n' })
  const r = applyAll([{ id: 'x', file: 'a.md', old_string: 'old line\n', new_string: 'new line\n' }], io)
  assert.deepStrictEqual(r.map(x => x.status), ['applied'])
  assert.strictEqual(io.store.get('a.md'), 'keep\nnew line\nkeep\n')
  applyAll([{ id: 'y', file: 'a.md', old_string: 'new line\n', new_string: '' }], io)
  assert.strictEqual(io.store.get('a.md'), 'keep\nkeep\n')
})

test('a span that occurs twice is skipped as ambiguous and nothing is written', () => {
  const io = mem({ 'a.md': 'dup\ndup\n' })
  const r = applyAll([{ id: 'x', file: 'a.md', old_string: 'dup', new_string: 'one' }], io)
  assert.strictEqual(r[0].status, 'skip:ambiguous')
  assert.strictEqual(r[0].count, 2)
  assert.strictEqual(io.store.get('a.md'), 'dup\ndup\n')
})

test('a span that is gone is skipped as not-found; a second run of the same ledger is therefore inert', () => {
  const io = mem({ 'a.md': 'alpha\n' })
  const ledger = [{ id: 'x', file: 'a.md', old_string: 'alpha', new_string: 'beta' }]
  assert.strictEqual(applyAll(ledger, io)[0].status, 'applied')
  assert.strictEqual(applyAll(ledger, io)[0].status, 'skip:not-found')
  assert.strictEqual(io.store.get('a.md'), 'beta\n')
})

test('two edits on one file both land when their spans do not overlap; an overlapping second one is skipped', () => {
  const io = mem({ 'a.md': 'one two three\n' })
  const r = applyAll([
    { id: 'a', file: 'a.md', old_string: 'one', new_string: '1' },
    { id: 'b', file: 'a.md', old_string: 'three', new_string: '3' },
    { id: 'c', file: 'a.md', old_string: 'one two', new_string: 'gone' },
  ], io)
  assert.deepStrictEqual(r.map(x => x.status), ['applied', 'applied', 'skip:not-found'])
  assert.strictEqual(io.store.get('a.md'), '1 two 3\n')
})

test('an unreadable file is skipped; dry-run applies nothing', () => {
  const io = mem({ 'a.md': 'alpha\n' })
  assert.strictEqual(applyAll([{ id: 'x', file: 'missing.md', old_string: 'a', new_string: 'b' }], io)[0].status, 'skip:unreadable')
  const r = applyAll([{ id: 'y', file: 'a.md', old_string: 'alpha', new_string: 'beta' }], { ...io, dryRun: true })
  assert.strictEqual(r[0].status, 'applied')
  assert.strictEqual(io.store.get('a.md'), 'alpha\n')
})

test('a new_string containing $& or $1 is inserted literally, never as a replacement pattern', () => {
  const io = mem({ 'a.md': 'x\n' })
  applyAll([{ id: 'p', file: 'a.md', old_string: 'x', new_string: 'cost $& and $1' }], io)
  assert.strictEqual(io.store.get('a.md'), 'cost $& and $1\n')
})

test('countOccurrences counts non-overlapping exact matches and treats an empty needle as zero', () => {
  assert.strictEqual(countOccurrences('aaa', 'aa'), 1)
  assert.strictEqual(countOccurrences('abab', 'ab'), 2)
  assert.strictEqual(countOccurrences('abc', ''), 0)
})
