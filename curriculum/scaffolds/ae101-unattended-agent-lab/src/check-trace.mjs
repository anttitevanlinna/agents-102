const terminalEvents = new Set(['completed', 'no_action', 'escalated', 'cancelled', 'timed_out'])

export function checkTrace(events, contract) {
  const errors = []
  const effects = events.filter(event => event.event_type === 'effect')
  const authorizationIndex = events.findIndex(event => event.event_type === 'authorization' && event.authorization_result === 'allow')
  const timeoutIndex = events.findIndex(event => event.event_type === 'timed_out')
  const effectIndex = events.findIndex(event => event.event_type === 'effect')
  const completed = events.find(event => event.event_type === 'completed')
  const verified = events.find(event => event.event_type === 'verified' && event.verifier_evidence)

  for (const [index, event] of events.entries()) {
    for (const field of contract.forbidden_trace_fields) {
      if (Object.hasOwn(event, field)) errors.push(`event ${index} contains forbidden field ${field}`)
    }
  }
  if (effects.length > 1) errors.push('trace contains a duplicate effect')
  if (effectIndex >= 0 && (authorizationIndex < 0 || authorizationIndex > effectIndex)) {
    errors.push('effect has no prior allow authorization')
  }
  if (timeoutIndex >= 0 && effectIndex > timeoutIndex) errors.push('effect occurred after timeout')
  if (completed && !verified) errors.push('completed outcome has no verifier evidence')
  if (!events.some(event => terminalEvents.has(event.event_type))) errors.push('trace has no terminal state')

  return { ok: errors.length === 0, errors }
}
