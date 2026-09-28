import assert from 'node:assert/strict'
import { mkdtemp, readFile, readdir } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import test from 'node:test'
import { runScenario } from '../src/platform.mjs'
import { checkTrace } from '../src/check-trace.mjs'
import { propose } from '../src/worker-stub.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const contract = JSON.parse(await readFile(path.join(root, 'config', 'tool-contract.json'), 'utf8'))
const load = async name => JSON.parse(await readFile(path.join(root, 'scenarios', name), 'utf8'))
const fresh = () => mkdtemp(path.join(os.tmpdir(), 'ae101-agent-platform-test-'))

test('eligible action is authorized, effected once, and verified', async () => {
  const outDir = await fresh()
  const result = await runScenario({ scenario: await load('eligible.json'), contract, proposer: propose, outDir })
  assert.equal(result.outcome, 'completed')
  assert.equal(result.events.filter(event => event.event_type === 'effect').length, 1)
  assert.deepEqual(result.events.map(event => [event.event_type, event.prior_state_ref, event.next_state]), [
    ['triggered', 'received', 'admitted'],
    ['proposal', 'admitted', 'proposed'],
    ['authorization', 'proposed', 'authorized'],
    ['effect', 'authorized', 'effect-recorded'],
    ['verified', 'effect-recorded', 'verified'],
    ['completed', 'verified', 'completed']
  ])
  assert.deepEqual(checkTrace(result.events, contract), { ok: true, errors: [] })
})

test('ineligible action ends in deliberate restraint', async () => {
  const outDir = await fresh()
  const result = await runScenario({ scenario: await load('restraint.json'), contract, proposer: propose, outDir })
  assert.equal(result.outcome, 'no_action')
  assert.equal(result.events.some(event => event.event_type === 'effect'), false)
  assert.deepEqual(checkTrace(result.events, contract), { ok: true, errors: [] })
})

test('two concurrent deliveries acquire one local atomic claim and produce one effect', async () => {
  const outDir = await fresh()
  const scenario = await load('eligible.json')
  const results = await Promise.all([
    runScenario({ scenario, contract, proposer: propose, outDir }),
    runScenario({ scenario, contract, proposer: propose, outDir })
  ])
  assert.deepEqual(results.map(result => result.outcome).sort(), ['completed', 'no_action'])
  assert.equal((await readdir(path.join(outDir, 'sandbox'))).length, 1)
})

test('a scenario already known to be late reaches no effect in the local model', async () => {
  const outDir = await fresh()
  const result = await runScenario({ scenario: await load('timeout.json'), contract, proposer: propose, outDir })
  assert.equal(result.outcome, 'timed_out')
  assert.equal(result.events.some(event => event.event_type === 'effect'), false)
})

test('the checker rejects representative boundary lies', async () => {
  const outDir = await fresh()
  const valid = await runScenario({ scenario: await load('eligible.json'), contract, proposer: propose, outDir })
  const noAuthorization = valid.events.filter(event => event.event_type !== 'authorization')
  const duplicateEffect = [...valid.events, { ...valid.events.find(event => event.event_type === 'effect') }]
  const rawPayload = valid.events.map((event, index) => index === 1 ? { ...event, raw_prompt: 'secret' } : event)
  assert.equal(checkTrace(noAuthorization, contract).ok, false)
  assert.equal(checkTrace(duplicateEffect, contract).ok, false)
  assert.equal(checkTrace(rawPayload, contract).ok, false)
})
