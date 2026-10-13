import assert from 'node:assert/strict'
import { execFile } from 'node:child_process'
import { mkdtemp, readFile, readdir } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import test from 'node:test'
import { runScenario } from '../src/platform.mjs'
import { checkTrace } from '../src/check-trace.mjs'
import { propose } from '../src/worker-stub.mjs'
import { REASONS, appendTraceEvent, attemptEffect } from '../src/boundary-model.mjs'
import { faults, verdict } from '../src/faults.mjs'
import { promisify } from 'node:util'

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

test('a late worker result is discarded before any claim or effect', async () => {
  const outDir = await fresh()
  let calls = 0
  const proposer = async (...args) => { calls += 1; return propose(...args) }
  const result = await runScenario({ scenario: await load('timeout.json'), contract, proposer, outDir })
  assert.equal(calls, 1)
  assert.equal(result.outcome, 'timed_out')
  assert.equal(result.events.some(event => event.event_type === 'effect'), false)
  assert.equal(result.events.at(-1).decision, REASONS.deadline)
  await assert.rejects(readdir(path.join(outDir, 'runtime')), { code: 'ENOENT' })
  assert.deepEqual(checkTrace(result.events, contract), { ok: true, errors: [] })
})

test('a task_id that would leave the output directory is refused before any write', async () => {
  const outDir = await fresh()
  const scenario = { ...(await load('eligible.json')), task_id: '../../escaped' }
  await assert.rejects(runScenario({ scenario, contract, proposer: propose, outDir }), /task_id must match/)
  assert.deepEqual(await readdir(outDir), [])
})

test('an invalid proposal names what was wrong with it', async () => {
  const outDir = await fresh()
  const scenario = await load('eligible.json')
  const proposer = async () => ({ tool: 'shell', arguments: { task_id: scenario.task_id, action: 'merge', summary: 'x' } })
  const result = await runScenario({ scenario, contract, proposer, outDir })
  assert.equal(result.outcome, 'no_action')
  assert.equal(result.events.at(-1).decision, 'invalid-proposal:unknown-tool:shell,disallowed-action:merge')
})

test('the checker rejects representative boundary lies', async () => {
  const outDir = await fresh()
  const valid = await runScenario({ scenario: await load('eligible.json'), contract, proposer: propose, outDir })
  const noAuthorization = valid.events.filter(event => event.event_type !== 'authorization')
  const duplicateEffect = [...valid.events, { ...valid.events.find(event => event.event_type === 'effect') }]
  const rawPayload = valid.events.map((event, index) => index === 1 ? { ...event, raw_prompt: 'secret' } : event)
  const terminalIndex = valid.events.findIndex(event => event.event_type === 'completed')
  const effectAfterTimeout = [
    ...valid.events.filter(event => event.event_type !== 'effect' && event.event_type !== 'completed'),
    { ...valid.events[0], event_type: 'timed_out' },
    valid.events.find(event => event.event_type === 'effect')
  ]
  const unverified = valid.events.filter(event => event.event_type !== 'verified')
  const noTerminal = valid.events.slice(0, terminalIndex)
  const errors = trace => checkTrace(trace, contract).errors
  assert.ok(errors(noAuthorization).includes('effect has no prior allow authorization'))
  assert.ok(errors(duplicateEffect).includes('trace contains a duplicate effect'))
  assert.ok(errors(rawPayload).includes('event 1 contains forbidden field raw_prompt'))
  assert.ok(errors(effectAfterTimeout).includes('effect occurred after timeout'))
  assert.ok(errors(unverified).includes('completed outcome has no verifier evidence'))
  assert.ok(errors(noTerminal).includes('trace has no terminal state'))
})

// Each guard owns one invariant. Removing or reordering any guard must fail here.
const open = { terminal: null, effect_count: 0, deadline_passed: false }
for (const [name, state, attempt, reason] of [
  ['authorization', open, { authorized: false }, REASONS.unauthorized],
  ['deadline', { ...open, deadline_passed: true }, { authorized: true }, REASONS.deadline],
  ['idempotency', { ...open, effect_count: 1 }, { authorized: true }, REASONS.duplicate],
  ['terminal state', { ...open, terminal: 'cancelled' }, { authorized: true }, REASONS.terminal('cancelled')]
]) {
  test(`the ${name} guard rejects its fault and changes no state`, () => {
    const result = attemptEffect(state, attempt)
    assert.equal(result.allowed, false)
    assert.equal(result.reason, reason)
    assert.deepEqual(result.after, state)
  })
}

test('an authorized effect on an open task is applied once', () => {
  const result = attemptEffect(open, { authorized: true })
  assert.equal(result.allowed, true)
  assert.deepEqual(result.after, { terminal: 'completed', effect_count: 1, deadline_passed: false })
})

test('the trace guard refuses a forbidden field and leaves the trace as it was', () => {
  const trace = [{ event_type: 'triggered' }]
  for (const field of contract.forbidden_trace_fields) {
    const result = appendTraceEvent(trace, { event_type: 'proposal', [field]: 'x' }, contract)
    assert.equal(result.reason, REASONS.forbiddenField(field))
    assert.equal(trace.length, 1)
  }
})

test('each tour fault is rejected by the guard that owns it', () => {
  const expected = {
    'effect-without-authorization': REASONS.unauthorized,
    'duplicate-effect': REASONS.duplicate,
    'effect-after-timeout': REASONS.deadline,
    'raw-sensitive-payload': REASONS.forbiddenField('raw_ticket')
  }
  const tour = faults(contract)
  assert.deepEqual(tour.map(fault => fault.name), Object.keys(expected))
  for (const fault of tour) {
    const result = fault.run()
    assert.equal(result.reason, expected[fault.name], fault.name)
    assert.equal(result.unchanged, true, fault.name)
    assert.ok(verdict(fault, result), fault.name)
  }
})

test('the run command prints usage when a flag is missing', async () => {
  const run = promisify(execFile)
  await assert.rejects(run(process.execPath, ['src/run.mjs', 'scenarios/restraint.json'], { cwd: root }), error => {
    assert.equal(error.code, 2)
    assert.match(error.stderr, /^usage:/)
    return true
  })
})
