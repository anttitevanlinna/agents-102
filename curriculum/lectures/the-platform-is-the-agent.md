# The platform is the agent

## The worker is replaceable
<!--tier:1-->

Headless Codex or Claude Code can receive a task, work in a directory, and return machine-readable output. That is a worker contract, not an unattended responsibility.

The platform decides what task enters, what identity it runs as, what context it receives, which tools it may request, what credentials it can borrow, what proves success, and when work stops.

Swap the worker and those decisions should still hold.

## Start with one responsibility
<!--tier:1-->

An unattended responsibility has three valid endings: useful action, correct no-action, or escalation. Define all three before choosing cloud services.

The trigger and the outcome should fit in one sentence each. If the responsibility needs several side effects or several owners, split it before you automate it.

## One controlled execution
<!--tier:1-->

Follow one task all the way through:

trigger → admission → queue → isolated workspace → context → worker → tool policy → verification → result or escalation

Retries, cancellation, timeout, and duplicate events belong on the same line. They are part of the execution, not an operations appendix.

## A tool call is a proposal
<!--tier:1-->

The model can propose `read logs`, `open pull request`, or `send reply`. The platform decides whether that actor may perform that operation on that resource under the current policy.

Give the broker the shortest credential that can complete the allowed operation. Record the request, policy decision, credential path, side effect, and verifier evidence. Do not make a powerful long-lived token part of the worker's ambient environment.

## Map the boundary onto AWS
<!--tier:1-->

A queue, container task, object store, secret broker, policy engine, trace sink, and operator console can become AWS services. Naming services makes assumptions testable.

It does not make the architecture coherent. Use a local model to expose the control flow, label what the model cannot prove, then map each responsibility and trust boundary onto a service and a production-like test.

<!-- maintainer -->

**Time:** 7 minutes.

**Role:** M7 opener. Moves the unit of design from model process to one controlled responsibility before the failure tour.

**Mood:** sober capability, not cloud theatre.

<!-- backing -->

Claims
- `worker-not-platform` · vision · "That is a worker contract, not an unattended responsibility." ← none-owed
- `headless-workers-supported` · detail · "Headless Codex or Claude Code can receive a task, work in a directory, and return machine-readable output." ← openai-noninteractive, anthropic-cli
- `three-valid-endings` · vision · "An unattended responsibility has three valid endings" ← none-owed
- `controlled-execution-line` · vision · "Follow one task all the way through" ← none-owed
- `tool-call-proposal` · vision · "A tool call is a proposal" ← none-owed
- `short-credentials` · detail · "Give the broker the shortest credential that can complete the allowed operation." ← aws-agent-security

Sources
- openai-noninteractive `[checked:2026-09-27 result:OK due:cohort]` https://developers.openai.com/codex/non-interactive-mode — [platform capability, primary documentation] Codex non-interactive execution and structured output. fallback: describe a generic headless coding worker.
- anthropic-cli `[checked:2026-09-27 result:OK due:cohort]` https://code.claude.com/docs/en/cli-usage — [platform capability, primary documentation] Claude Code CLI invocation and non-interactive usage. fallback: describe a generic headless coding worker.
- aws-agent-security `[checked:2026-09-27 result:OK due:cohort]` https://docs.aws.amazon.com/prescriptive-guidance/latest/security-reference-architecture-generative-ai/gen-auto-agents.html — [vendor primary guidance] Identity, least privilege, credential and agent security boundaries in AWS. fallback: teach short-lived least-privilege credentials without AWS mapping.

Frameworks
- Controlled execution · [borrow:security engineering] · law:none · ← aws-agent-security
- Tool call as proposal · [borrow:none] · law:none · ← none

Stance `[stance:2026-09-27 level:L2]`
- holds: unattended coding workers need control planes around admission, isolation, tools, verification, and observability.
- contested: the service decomposition and best isolation primitive vary by workload and organization.
- would-move-it: a supported worker contract that safely owns admission, external authorization, credential brokering, verification, and incident reconstruction itself.

OODA
- question: which control-plane responsibilities are moving into worker runtimes, and which remain external?
- roster: OpenAI Codex documentation, Anthropic Claude Code documentation, AWS security guidance
- last-run: 2026-09-27

<!-- /backing -->
