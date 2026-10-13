// Each guard owns one invariant and has its own reason, so a fault that
// isolates one invariant is rejected by that guard and no other.
export const REASONS = Object.freeze({
  unauthorized: 'effect has no allow authorization',
  deadline: 'task deadline has passed',
  duplicate: 'effect already exists for idempotency key',
  terminal: terminal => `task is already terminal:${terminal}`,
  forbiddenField: field => `trace event contains forbidden field ${field}`
})

export function attemptEffect(state, attempt) {
  const before = { ...state }
  let reason = null
  if (!attempt.authorized) reason = REASONS.unauthorized
  else if (state.deadline_passed) reason = REASONS.deadline
  else if (state.effect_count > 0) reason = REASONS.duplicate
  else if (state.terminal) reason = REASONS.terminal(state.terminal)

  if (reason) {
    return { allowed: false, reason, before, after: { ...state } }
  }
  const after = { ...state, effect_count: state.effect_count + 1, terminal: 'completed' }
  return { allowed: true, reason: null, before, after }
}

// A key-name denylist on top-level fields, not content inspection: a raw
// payload under an allowed key name passes.
export function appendTraceEvent(trace, candidate, contract) {
  const forbidden = contract.forbidden_trace_fields.find(field => Object.hasOwn(candidate, field))
  if (forbidden) {
    return { allowed: false, reason: REASONS.forbiddenField(forbidden), before_count: trace.length, after_count: trace.length }
  }
  trace.push(candidate)
  return { allowed: true, reason: null, before_count: trace.length - 1, after_count: trace.length }
}
