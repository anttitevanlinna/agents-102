# Agent platform challenge

Design a private AWS platform that can run unattended coding-agent tasks against company repositories.

The first workload is CI failure triage. A failed pipeline may trigger one task. The worker may inspect the failed job, check out the exact commit in an isolated workspace, read repository instructions, use approved read-only observability tools, reproduce the failure, and propose a fix as a pull request. It must not merge, deploy, change CI settings, rotate credentials, contact customers, or write outside the task workspace.

The platform must support headless Codex and Claude Code behind a replaceable worker contract. A task can run for up to 45 minutes. Duplicate pipeline events are common. Some failures are transient, some contain secrets or customer data, and some do not justify a code change. Correct no-action and escalation outcomes matter as much as a patch.

The design must make these properties inspectable:

- who or what triggered the task, under which policy version
- what context the worker received and what was deliberately excluded
- every tool request, authorization decision, credential path, and side effect
- how retries, cancellation, timeouts, and duplicate events behave
- what evidence verifies the result
- which trace fields are stored, masked, retained, or omitted
- how an operator reconstructs an incident without replaying sensitive content

Use AWS services where they clarify the concrete design, but do not provision anything. Prefer a coherent controlled execution over a catalogue of services. State rejected alternatives and the evidence that could reverse each consequential decision.

The shared objective is: **maximize useful, verifiable CI triage while minimizing unauthorized action, irrecoverable side effects, sensitive-data exposure, and operator ambiguity.**

## Exchange

The trainer names an approved Slack or Teams channel when one is available. Git is the source of truth. If no approved connection or channel exists, use the human publication fallback and continue the exercise from the committed packet.

<!-- maintainer -->

**Role:** Common input for AE101 optional Module 7. Shipped in `ae101-content.tar.gz`; the exercise copies it to `docs/agent-platform/challenge.md` in the cohort exchange repository before any independent research begins.
