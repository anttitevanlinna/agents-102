import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { appendTraceEvent, attemptEffect } from './boundary-model.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const contract = JSON.parse(await readFile(path.join(root, 'config', 'tool-contract.json'), 'utf8'))

const faults = new Map([
  ['effect-without-authorization', () => {
    const result = attemptEffect({ terminal: null, effect_count: 0 }, { authorized: false })
    return { fault: 'effect-without-authorization', prevented: !result.allowed, reason: result.reason, state_before: result.before, state_after: result.after }
  }],
  ['duplicate-effect', () => {
    const result = attemptEffect({ terminal: 'completed', effect_count: 1 }, { authorized: true })
    return { fault: 'duplicate-effect', prevented: !result.allowed, reason: result.reason, state_before: result.before, state_after: result.after }
  }],
  ['effect-after-timeout', () => {
    const result = attemptEffect({ terminal: 'timed_out', effect_count: 0 }, { authorized: true })
    return { fault: 'effect-after-timeout', prevented: !result.allowed, reason: result.reason, state_before: result.before, state_after: result.after }
  }],
  ['raw-sensitive-payload', () => {
    const trace = []
    const result = appendTraceEvent(trace, { event_type: 'proposal', raw_ticket: 'customer-secret' }, contract)
    return { fault: 'raw-sensitive-payload', prevented: !result.allowed, reason: result.reason, trace_count_before: result.before_count, trace_count_after: result.after_count }
  }]
])

const selected = process.argv[2]
const names = selected ? [selected] : [...faults.keys()]
if (selected && !faults.has(selected)) {
  console.error(`unknown fault: ${selected}`)
  process.exit(2)
}

let failed = false
for (const name of names) {
  const result = faults.get(name)()
  console.log(JSON.stringify(result))
  if (!result.prevented) failed = true
}
if (failed) process.exitCode = 1
