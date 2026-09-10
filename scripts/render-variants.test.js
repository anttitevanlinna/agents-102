#!/usr/bin/env node
'use strict'
// render-variants exists to prove a section move preserves EVERY shipped cut.
// It did that by retyping the cut list into a const, which was true on the day
// it was written (2026-08-13, the `## Next`-goes-last move) and has been wrong
// since the second variant shipped.
//
// Measured 2026-09-10: the script modelled 2 cuts while `site/clients/acme/`
// held builds of 4. Its PREVIEW list omitted `earn-the-trust` — which the real
// preview ships — and carried a `prework` slug the real table does not list, so
// the tool rendered one cut that ships and one that does not exist. The
// northwind team track (`flags: { payload: false }`) was modelled nowhere, and
// the script passed `{}` for flags on every call, so no payload-stripped cut
// could be rendered at all.
//
// A tool whose whole job is coverage, silently covering the wrong set, reads
// exactly like a tool that passes. So the list is derived now, and this pins
// that it stays derived.
const assert = require('node:assert')
const path = require('node:path')
const CR = require(path.resolve(__dirname, '..', 'site/layouts/curriculum.js'))
const { variantsFor, renderVariant } = require('./render-variants.js')

let n = 0
function test(name, fn) { fn(); n++; console.log(`ok ${n} - ${name}`) }

test('every shipped AE101 variant is modelled, none invented', () => {
  const got = variantsFor('curriculum/trainings/agentic-engineering-101/prework.md').map(v => v.name).sort()
  const want = Object.keys(CR.TRAININGS)
    .filter(k => (CR.TRAININGS[k].contentKey || k) === 'agentic-engineering-101')
    .sort()
  assert.deepStrictEqual(got, want,
    'the cut list is derived from TRAININGS, so a new variant is covered the day it ships')
  assert.ok(got.length >= 4, `expected the four shipped AE101 cuts, got ${got.length}`)
})

test('each variant carries the slugs and flags the build actually uses', () => {
  const byName = Object.fromEntries(variantsFor('curriculum/trainings/agentic-engineering-101/prework.md').map(v => [v.name, v]))

  const preview = byName['agentic-engineering-101-preview']
  assert.ok(preview.slugs.includes('earn-the-trust'),
    'the shipped preview is getting-going / plan-mode-done-right / earn-the-trust — the old hardcoded list dropped the third')
  assert.ok(!preview.slugs.includes('prework'),
    'prework is not a module slug in any variant table; the old list invented it')

  const northwind = byName['agentic-engineering-101-northwind']
  assert.strictEqual(northwind.flags.payload, false,
    'northwind strips payload blocks; passing {} for flags made that cut unrenderable')
})

test('a payload-stripped cut really drops the payload block', () => {
  const body = 'Come to Module 1 with the repo picked,<!--flag:payload--> the curated skills installed,<!--/flag:payload--> and one trivial bug.\n'
  const withPayload = renderVariant(body, { flags: {}, slugs: ['getting-going'] })
  const without = renderVariant(body, { flags: { payload: false }, slugs: ['getting-going'] })
  assert.ok(withPayload.includes('curated skills installed'))
  assert.ok(!without.includes('curated skills installed'),
    'flags are threaded through, not dropped on the floor')
  assert.ok(without.length < withPayload.length)
})

test('a module-flagged block follows its variant', () => {
  const body = 'A task,<!--flag:module:earn-the-trust--> then the feature,<!--/flag:module:earn-the-trust--> then done.\n'
  const inPreview = renderVariant(body, { flags: {}, slugs: ['getting-going', 'plan-mode-done-right', 'earn-the-trust'] })
  const inNorthwind = renderVariant(body, { flags: {}, slugs: ['getting-going', 'plan-mode-done-right', 'run-the-first-experiment'] })
  assert.ok(inPreview.includes('then the feature'), 'the cut that ships earn-the-trust keeps its block')
  assert.ok(!inNorthwind.includes('then the feature'), 'the cut that does not, drops it')
})

test('a non-AE101 path resolves its own training, not AE101 by default', () => {
  const got = variantsFor('curriculum/trainings/agents-101/prework.md').map(v => v.name)
  assert.ok(got.length > 0, 'agents-101 has at least one variant')
  assert.ok(got.every(k => (CR.TRAININGS[k].contentKey || k) === 'agents-101'),
    'no AE101 cut leaks into an agents-101 render')
})

console.log(`1..${n}`)
