#!/usr/bin/env node
// Tests for check-advisory-verdicts.js
'use strict'
const assert = require('node:assert')
const { parseRules, advisoryRules, violationsIn, ADVISORY_MARKERS } = require('./check-advisory-verdicts.js')

let n = 0
function test(name, fn) { fn(); n++; console.log(`ok ${n} - ${name}`) }

const COMPENDIUM = [
  '# check_writing.md',
  '',
  '20. **Do not state a count the adjacent list already holds.** Body of twenty.',
  '',
  '27. **Say it once, at its most concrete. Style, not a gate.** Four classes follow.',
  'More of twenty-seven. Not a REVISE on its own — a deliberate second pass is legitimate.',
  '',
  '28. **Something else entirely.** Body of twenty-eight.',
].join('\n')

test('parseRules: splits on numbered bold rule heads', () => {
  const r = parseRules(COMPENDIUM)
  assert.deepStrictEqual([...r.keys()], ['20', '27', '28'])
  assert(r.get('27').includes('Not a REVISE on its own'))
  assert(!r.get('28').includes('Not a REVISE'))
})

test('parseRules: a sub-lettered clause folds into its parent number', () => {
  const r = parseRules('52. **Parent.** a\n\n52c. **Child.** style, not a gate\n\n53. **Next.** b')
  assert.deepStrictEqual([...r.keys()], ['52', '53'])
  assert(r.get('52').toLowerCase().includes('style, not a gate'))
})

const io = {
  readFile: () => COMPENDIUM,
  listDir: () => ['check_writing.md', 'MEMORY.md', 'notes.txt'],
}

test('advisoryRules: finds only rules whose body carries a marker', () => {
  const a = advisoryRules('/fake', io.readFile, io.listDir)
  assert.deepStrictEqual([...a.keys()], ['check_writing.md:27'])
})

test('advisoryRules: ignores files that are not check_*.md', () => {
  const a = advisoryRules('/fake', io.readFile, () => ['MEMORY.md', 'x.md'])
  assert.strictEqual(a.size, 0)
})

const advisory = new Map([['check_writing.md:27', 'style, not a gate']])

test('violationsIn: a REVISE on an advisory rule is a violation', () => {
  const v = violationsIn({ rules_evaluated: [{ compendium: 'check_writing.md', rule_index: 27, verdict: 'REVISE' }] }, advisory, 'i.json')
  assert.strictEqual(v.length, 1)
  assert.strictEqual(v[0].rule, 'check_writing.md:27')
})

test('violationsIn: PASS on the same rule is fine', () => {
  const v = violationsIn({ rules_evaluated: [{ compendium: 'check_writing.md', rule_index: 27, verdict: 'PASS' }] }, advisory, 'i.json')
  assert.strictEqual(v.length, 0)
})

test('violationsIn: a REVISE on a non-advisory rule is fine', () => {
  const v = violationsIn({ rules_evaluated: [{ compendium: 'check_writing.md', rule_index: 20, verdict: 'REVISE' }] }, advisory, 'i.json')
  assert.strictEqual(v.length, 0)
})

test('violationsIn: a sub-lettered rule_index resolves to its parent number', () => {
  const v = violationsIn({ rules_evaluated: [{ compendium: 'check_writing.md', rule_index: '27b', verdict: 'REVISE' }] }, advisory, 'i.json')
  assert.strictEqual(v.length, 1)
})

test('violationsIn: an adjudicated row is not a live claim', () => {
  const v = violationsIn({ rules_evaluated: [{ compendium: 'check_writing.md', rule_index: 27, verdict: 'REVISE', resolution: { settled: 'refuted' } }] }, advisory, 'i.json')
  assert.strictEqual(v.length, 0)
})

test('violationsIn: object-shaped rules_evaluated still walks', () => {
  const v = violationsIn({ rules_evaluated: { a: { compendium: 'check_writing.md', rule_index: 27, verdict: 'REVISE' } } }, advisory, 'i.json')
  assert.strictEqual(v.length, 1)
})

test('violationsIn: a row with no compendium is skipped, not crashed on', () => {
  const v = violationsIn({ rules_evaluated: [{ rule_index: 27, verdict: 'REVISE' }, null] }, advisory, 'i.json')
  assert.strictEqual(v.length, 0)
})

test('ADVISORY_MARKERS are lowercase, so the lowercased body match works', () => {
  for (const m of ADVISORY_MARKERS) assert.strictEqual(m, m.toLowerCase())
})

console.log(`\n${n} tests passed`)
