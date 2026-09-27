import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { claimOnce } from './claim-store.mjs'
import { appendTraceEvent, attemptEffect } from './boundary-model.mjs'

function event(base, eventType, fields = {}) {
  return {
    trace_id: base.traceId,
    event_type: eventType,
    actor: fields.actor || 'local-platform',
    policy_version: base.contract.policy_version,
    prior_state_ref: fields.prior_state_ref || base.state,
    decision: fields.decision || null,
    tool_name: fields.tool_name || null,
    authorization_result: fields.authorization_result || null,
    side_effect_ref: fields.side_effect_ref || null,
    verifier_evidence: fields.verifier_evidence || null,
    next_state: fields.next_state || eventType,
    excluded_fields: base.contract.forbidden_trace_fields,
    ...fields.extra
  }
}

async function writeTrace(outDir, traceId, events) {
  await mkdir(path.join(outDir, 'traces'), { recursive: true })
  const body = events.map(item => JSON.stringify(item)).join('\n') + '\n'
  const tracePath = path.join(outDir, 'traces', `${traceId}.jsonl`)
  await writeFile(tracePath, body)
  return tracePath
}

export async function runScenario({ scenario, contract, proposer, outDir }) {
  const traceId = `${scenario.task_id}-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`
  const base = { traceId, contract, state: 'received' }
  const boundaryState = { terminal: null, effect_count: 0 }
  const events = []
  const record = (eventType, fields = {}) => {
    const next = event(base, eventType, fields)
    const appended = appendTraceEvent(events, next, contract)
    if (!appended.allowed) throw new Error(appended.reason)
    base.state = next.next_state
    if (['completed', 'no_action', 'escalated', 'cancelled', 'timed_out'].includes(eventType)) {
      boundaryState.terminal = eventType
    }
    return next
  }
  record('triggered', { next_state: 'admitted' })

  if (scenario.cancelled) {
    record('cancelled', { decision: 'deny', next_state: 'cancelled' })
    return finish('cancelled')
  }
  if (scenario.worker_elapsed_ms > scenario.timeout_ms) {
    record('timed_out', { decision: 'deny', next_state: 'timed_out' })
    return finish('timed_out')
  }

  const proposal = await proposer(scenario, contract)
  record('proposal', { actor: 'headless-worker', tool_name: proposal.tool, next_state: 'proposed' })

  const missing = contract.required_arguments.filter(key => !Object.hasOwn(proposal.arguments || {}, key))
  const action = proposal.arguments?.action
  const allowed = proposal.tool === contract.tool && missing.length === 0 && contract.allowed_actions.includes(action)
  const effectCandidate = allowed && scenario.eligible && action === contract.effect_action
  const claim = effectCandidate ? await claimOnce(outDir, scenario.idempotency_key) : { claimed: false }
  const duplicate = effectCandidate && !claim.claimed
  const mayAct = effectCandidate && claim.claimed

  record('authorization', {
    actor: 'local-broker',
    decision: mayAct ? 'allow' : 'deny',
    tool_name: proposal.tool,
    authorization_result: mayAct ? 'allow' : 'deny',
    next_state: mayAct ? 'authorized' : 'restrained'
  })

  if (!mayAct) {
    const reason = duplicate ? 'duplicate' : allowed ? 'policy-denied' : `invalid-proposal:${missing.join(',')}`
    record(action === 'escalate' ? 'escalated' : 'no_action', {
      actor: 'local-broker', decision: reason, next_state: action === 'escalate' ? 'escalated' : 'no_action'
    })
    return finish(action === 'escalate' ? 'escalated' : 'no_action')
  }

  const effectTransition = attemptEffect(boundaryState, { authorized: true })
  if (!effectTransition.allowed) throw new Error(effectTransition.reason)
  Object.assign(boundaryState, effectTransition.after)
  await mkdir(path.join(outDir, contract.effect_root), { recursive: true })
  const effectPath = path.join(outDir, contract.effect_root, `${scenario.task_id}.json`)
  await writeFile(effectPath, JSON.stringify({ task_id: scenario.task_id, action, summary: proposal.arguments.summary }, null, 2) + '\n')
  record('effect', { actor: 'local-broker', tool_name: proposal.tool, side_effect_ref: path.relative(outDir, effectPath), next_state: 'effect-recorded' })
  record('verified', { actor: 'local-verifier', verifier_evidence: `exists:${path.relative(outDir, effectPath)}`, next_state: 'verified' })
  record('completed', { decision: 'success', side_effect_ref: path.relative(outDir, effectPath), verifier_evidence: `exists:${path.relative(outDir, effectPath)}`, next_state: 'completed' })
  return finish('completed')

  async function finish(outcome) {
    const tracePath = await writeTrace(outDir, traceId, events)
    return { outcome, events, tracePath }
  }
}
