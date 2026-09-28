export function attemptEffect(state, attempt) {
  const before = { ...state }
  let reason = null
  if (state.terminal) reason = `task is already terminal:${state.terminal}`
  else if (!attempt.authorized) reason = 'effect has no allow authorization'
  else if (state.effect_count > 0) reason = 'effect already exists for idempotency key'

  if (reason) {
    return { allowed: false, reason, before, after: { ...state } }
  }
  const after = { ...state, effect_count: state.effect_count + 1, terminal: 'completed' }
  return { allowed: true, reason: null, before, after }
}

export function appendTraceEvent(trace, candidate, contract) {
  const forbidden = contract.forbidden_trace_fields.find(field => Object.hasOwn(candidate, field))
  if (forbidden) {
    return { allowed: false, reason: `trace event contains forbidden field ${forbidden}`, before_count: trace.length, after_count: trace.length }
  }
  trace.push(candidate)
  return { allowed: true, reason: null, before_count: trace.length - 1, after_count: trace.length }
}
