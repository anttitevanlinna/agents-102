# A trace is an argument

## Success is more than tool completion
<!--tier:1-->

`Tool returned 200` proves an API call completed. It does not prove the task was authorized, the input was current, the side effect was intended, or the result met the goal.

A useful trace joins the decision chain: trigger, identity, policy, context references, tool proposal, authorization, side effect, verifier evidence, and outcome.

## Every event must move the state
<!--tier:1-->

Agent-observability systems represent work as traces containing observations or spans. Use that structure to preserve causality, not merely timing.

An event should answer: what changed, who caused it, under which policy, from which prior state, and what evidence justified the next state. An event with no state consequence is telemetry, not proof.

## Make the check reject a lie
<!--tier:1-->

A passing trace proves little until the same check rejects a known violation. Remove the authorization decision, duplicate the side effect, or claim success without verifier evidence.

If the corrupted trace still passes, the check is the defect.

## Record references, not everything
<!--tier:1-->

Prompts, tool arguments, model outputs, and reviewer notes can all contain secrets or personal data. A trace becomes another data store with its own access, masking, retention, and deletion obligations.

Prefer stable references, classifications, hashes, and bounded evidence where raw content is not needed for reconstruction.

## Reconstruct both outcomes
<!--tier:2-->

The same trace contract must explain a useful action and correct restraint.

If the system did nothing, the trace should distinguish denied authority, insufficient evidence, duplicate work, cancellation, timeout, and deliberate escalation. “No output” is not an incident model.

<!-- maintainer -->

**Time:** 7 minutes.

**Role:** M7 closer. Names what the action, restraint, and mutation traces proved, then hands their stored fields to M8.

**Mood:** earned skepticism.

<!-- backing -->

Claims
- `tool-success-not-task-success` · vision · "`Tool returned 200` proves an API call completed. It does not prove the task was authorized" ← none-owed
- `trace-observations` · detail · "Agent-observability systems represent work as traces containing observations or spans." ← langfuse-data-model, aws-observability
- `mutation-calibrates-check` · vision · "A passing trace proves little until the same check rejects a known violation." ← none-owed
- `trace-is-data-store` · detail · "A trace becomes another data store with its own access, masking, retention, and deletion obligations." ← langfuse-masking
- `no-output-not-incident-model` · vision · "“No output” is not an incident model." ← none-owed

Sources
- langfuse-data-model `[checked:2026-09-27 result:OK due:cohort]` https://langfuse.com/docs/observability/data-model — [vendor primary documentation] Trace and observation data model. fallback: use generic trace and span terms.
- langfuse-masking `[checked:2026-09-27 result:OK due:cohort]` https://langfuse.com/docs/observability/features/masking — [vendor primary documentation] Sensitive-data masking in observability payloads. fallback: teach masking and field exclusion without product detail.
- aws-observability `[checked:2026-09-27 result:OK due:cohort]` https://docs.aws.amazon.com/prescriptive-guidance/latest/agentic-ai-serverless/observability-and-monitoring.html — [vendor primary guidance] Agent workflow observability across execution and tools. fallback: retain the event-chain model without AWS detail.

Frameworks
- Trace as argument · [borrow:none] · law:none · ← none
- Trace / span · [borrow:distributed systems] · law:none · ← langfuse-data-model

Stance `[stance:2026-09-27 level:L2]`
- holds: production agent traces need semantic events and policy context, not only latency and token telemetry.
- contested: how much raw payload is necessary for debugging versus avoidable data exposure.
- would-move-it: evidence that reference-only traces cannot reconstruct common agent incidents, or that raw capture can be bounded safely enough to outperform them.

OODA
- question: what minimum event fields reconstruct authorization, side effects, verification, and no-action outcomes without raw payload capture?
- roster: Langfuse documentation, AWS observability guidance, OpenTelemetry maintainers
- last-run: 2026-09-27

<!-- /backing -->
