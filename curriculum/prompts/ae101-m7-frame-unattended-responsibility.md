---
key: ae101-m7-frame-unattended-responsibility
dest: Claude Code
context: M7 responsibility and boundary framing
runtime: any
origin: exercises/build-and-prove-agent-platform
produces:
  - id: m7-responsibility-contract
    location: docs/agent-platform/architecture.md
  - id: m7-tool-contract
    location: docs/agent-platform/architecture.md
  - id: m7-draft-architecture
    location: docs/agent-platform/architecture.md
  - id: m7-control-evidence-matrix
    location: docs/agent-platform/architecture.md
---
Help me turn the shared CI-failure triage case into a safe unattended-agent contract.

Read `docs/agent-platform/failure-tour.md`, `~/Documents/ae101-content/reference/agent-platform-challenge.md`, and `~/Documents/ae101-content/reference/unattended-agent-worked-execution.md`. Use that one case for this module. Do not propose a different responsibility.

Ask me three design questions, one at a time: which evidence is enough to permit a pull-request draft; where transient failure becomes no action versus escalation; and what independent evidence verifies the draft without trusting the worker's own success claim. Wait for each answer. Preserve disagreement or uncertainty instead of choosing for me.

Write one file: `docs/agent-platform/architecture.md`.

Its `Responsibility` section records the shared trigger, useful bounded effect, correct no-action condition, escalation condition, forbidden effects, maximum duration, context included and excluded, my three decisions, and remaining uncertainty. Its `Tool contract` section defines one `create_pull_request_draft` proposal with its input and output schema, caller identity, authorization inputs, credential owner, side-effect class, idempotency rule, postcondition, verification method, timeout, and failure behavior. The worker may propose the call. A trusted broker must authorize and execute it.

Its `Controlled execution` section follows one task through trigger, admission, queue, isolated workspace, worker adapter, context assembly, tool proposal, authorization, credential broker, side effect, verification, trace, result, no action, or escalation. For duplicate delivery, timeout, cancellation, and retry, state the owner, invariant, and terminal state rather than merely naming the concern. Mark untested assumptions and unresolved design decisions explicitly.

Its `Data boundary seed` section lists the failed-job input, repository context, worker input, tool proposal, broker decision, verifier evidence, and trace fields. For each, state whether the system needs the raw value, a bounded summary, a stable reference, or exclusion. This is an engineering inventory, not a legal conclusion; Module 8 will deepen it.

Its `Control evidence` section gives each claimed control one of four evidence levels: demonstrated by the local model, simulated by fixture data, specified in the architecture, or requiring a production-like test. Start with authorization ordering, proposal validation, local atomic claim, recovery between claim and effect, timeout, process cancellation, workspace isolation, credential isolation, side-effect verification, trace minimization, and incident reconstruction. The local lab's own README is authoritative about what it does not prove.

Do not search the internet or provision resources yet. In chat, return only the architecture path, my three decisions, the weakest claimed control, and the unresolved architecture decision most likely to widen authority.
