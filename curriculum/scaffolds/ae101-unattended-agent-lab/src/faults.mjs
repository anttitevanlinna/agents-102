import { isDeepStrictEqual } from 'node:util'
import { REASONS, appendTraceEvent, attemptEffect } from './boundary-model.mjs'

// Each fixture breaks one invariant and leaves the others intact, so the
// rejection names the guard that owns that invariant.
const open = { terminal: null, effect_count: 0, deadline_passed: false }

function effectFault(name, invariant, state, attempt, expected) {
  return {
    name,
    invariant,
    expected,
    run() {
      const result = attemptEffect(state, attempt)
      return {
        fault: name,
        prevented: !result.allowed,
        reason: result.reason,
        unchanged: isDeepStrictEqual(result.before, result.after),
        before: result.before,
        after: result.after
      }
    }
  }
}

export function faults(contract) {
  return [
    effectFault('effect-without-authorization', 'only an allow authorization can lead to an effect',
      open, { authorized: false }, REASONS.unauthorized),
    effectFault('duplicate-effect', 'one effect per idempotency key',
      { ...open, effect_count: 1 }, { authorized: true }, REASONS.duplicate),
    effectFault('effect-after-timeout', 'no effect once the task deadline has passed',
      { ...open, deadline_passed: true }, { authorized: true }, REASONS.deadline),
    {
      name: 'raw-sensitive-payload',
      invariant: 'no forbidden raw field enters the trace',
      expected: REASONS.forbiddenField('raw_ticket'),
      run() {
        const trace = []
        const result = appendTraceEvent(trace, { event_type: 'proposal', raw_ticket: 'customer-secret' }, contract)
        return {
          fault: 'raw-sensitive-payload',
          prevented: !result.allowed,
          reason: result.reason,
          unchanged: result.before_count === result.after_count && trace.length === 0,
          before: { trace_count: result.before_count },
          after: { trace_count: result.after_count }
        }
      }
    }
  ]
}

// A fault counts as prevented only when the owning guard rejected it and
// nothing changed.
export function verdict(fault, result) {
  return result.prevented && result.reason === fault.expected && result.unchanged
}
