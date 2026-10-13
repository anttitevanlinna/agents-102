import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { claimOnce } from './claim-store.mjs'
import { REASONS, appendTraceEvent, attemptEffect } from './boundary-model.mjs'

// task_id becomes part of file names; anything but this shape could leave outDir.
const TASK_ID = /^[a-z0-9][a-z0-9-]*$/

function insideOutDir(outDir, target) {
  const resolved = path.resolve(target)
  if (!resolved.startsWith(path.resolve(outDir) + path.sep)) {
    throw new Error(`refusing to write outside the output directory: ${target}`)
  }
  return resolved
}

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
  const tracePath = insideOutDir(outDir, path.join(outDir, 'traces', `${traceId}.jsonl`))
  await writeFile(tracePath, body)
  return tracePath
}

export async function runScenario({ scenario, contract, proposer, outDir }) {
  if (typeof scenario.task_id !== 'string' || !TASK_ID.test(scenario.task_id)) {
    throw new Error(`task_id must match ${TASK_ID}: ${JSON.stringify(scenario.task_id)}`)
  }
  const traceId = `${scenario.task_id}-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`
  const base = { traceId, contract, state: 'received' }
  const boundaryState = { terminal: null, effect_count: 0, deadline_passed: false }
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

  const proposal = await proposer(scenario, contract)
  // The deadline is simulated: worker_elapsed_ms stands in for a measured clock.
  boundaryState.deadline_passed = scenario.worker_elapsed_ms > scenario.timeout_ms
  record('proposal', { actor: 'headless-worker', tool_name: proposal.tool, next_state: 'proposed' })

  if (boundaryState.deadline_passed) {
    // A late result is discarded before any claim or effect. The effect guard
    // rejects it again if this check is ever skipped.
    record('authorization', {
      actor: 'local-broker', decision: 'deny', tool_name: proposal.tool, authorization_result: 'deny', next_state: 'restrained'
    })
    record('timed_out', { actor: 'local-broker', decision: REASONS.deadline, next_state: 'timed_out' })
    return finish('timed_out')
  }

  const missing = contract.required_arguments.filter(key => !Object.hasOwn(proposal.arguments || {}, key))
  const action = proposal.arguments?.action
  const problems = [
    ...(proposal.tool === contract.tool ? [] : [`unknown-tool:${proposal.tool}`]),
    ...missing.map(key => `missing:${key}`),
    ...(missing.includes('action') || contract.allowed_actions.includes(action) ? [] : [`disallowed-action:${action}`])
  ]
  const allowed = problems.length === 0
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
    const reason = duplicate ? 'duplicate' : allowed ? 'policy-denied' : `invalid-proposal:${problems.join(',')}`
    record(action === 'escalate' ? 'escalated' : 'no_action', {
      actor: 'local-broker', decision: reason, next_state: action === 'escalate' ? 'escalated' : 'no_action'
    })
    return finish(action === 'escalate' ? 'escalated' : 'no_action')
  }

  const effectTransition = attemptEffect(boundaryState, { authorized: true })
  if (!effectTransition.allowed) throw new Error(effectTransition.reason)
  Object.assign(boundaryState, effectTransition.after)
  await mkdir(path.join(outDir, contract.effect_root), { recursive: true })
  const effectPath = insideOutDir(outDir, path.join(outDir, contract.effect_root, `${scenario.task_id}.json`))
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
