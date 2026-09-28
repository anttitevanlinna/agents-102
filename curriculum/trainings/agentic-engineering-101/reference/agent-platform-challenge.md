# Agent platform challenge

Use this shared case for Module 7. Start with the supplied local boundary lab, then design the private AWS platform that could run this responsibility against company repositories.

The first workload is CI failure triage. A failed pipeline may trigger one task. The worker may inspect the failed job, check out the exact commit in an isolated workspace, read repository instructions, use approved read-only observability tools, reproduce the failure, and propose a fix as a pull request. It must not merge, deploy, change CI settings, rotate credentials, contact customers, or write outside the task workspace.

The platform must place headless Claude Code behind a replaceable worker contract; Codex should be able to implement the same contract later without widening authority. A task can run for up to 45 minutes. Duplicate pipeline events are common. Some failures are transient, some contain secrets or customer data, and some do not justify a code change. Correct no-action and escalation outcomes matter as much as a patch.

The design must make these properties inspectable:

- who or what triggered the task, under which policy version
- what context the worker received and what was deliberately excluded
- every tool request, authorization decision, credential path, and side effect
- how retries, cancellation, timeouts, and duplicate events behave
- what evidence verifies the result
- which trace fields are stored, masked, retained, or omitted
- how an operator reconstructs an incident without replaying sensitive content

Use AWS services where they clarify the concrete design, but do not provision anything. The local model confines its simulated effects to a temporary output root. It demonstrates prevention of invalid transitions and one concurrent local atomic claim; it does not prove distributed queue leasing, crash recovery, process cancellation, isolation, credential brokering, or cloud recovery. Prefer a coherent controlled execution over a catalogue of services. State rejected alternatives, the evidence that could reverse each consequential decision, and the production-like test still owed.

The shared objective is: **maximize useful, verifiable CI triage while minimizing unauthorized action, irrecoverable side effects, sensitive-data exposure, and operator ambiguity.**

## Boundary to test

The headless worker proposes a structured action. A trusted broker decides whether the proposal matches the task, policy, tool contract, and current state. The broker alone may perform the effect. Use the local model to understand that separation, then incident-test the design against concurrent duplicate delivery, failed cancellation, and secret-bearing trace data.

<!-- maintainer -->

**Role:** Shared responsibility for AE101 optional Module 7. Personal transfer is named only after the common design and incident review.
