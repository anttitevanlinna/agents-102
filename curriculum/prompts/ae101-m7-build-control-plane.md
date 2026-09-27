---
key: ae101-m7-build-control-plane
dest: Claude Code
context: M7 boundary-to-runtime design
runtime: any
origin: exercises/build-and-prove-agent-platform
requires:
  - id: m7-researched-architecture
    source: prompt:ae101-m7-research-boundary-decision
  - id: m7-control-evidence-matrix
    source: prompt:ae101-m7-frame-unattended-responsibility
  - id: m7-failure-tour
    source: prompt:ae101-m7-run-failure-tour
produces:
  - id: m7-worker-adapter-contract
    location: docs/agent-platform/architecture.md
  - id: m7-system-design
    location: docs/agent-platform/architecture.md
---
Turn the tested local boundary model into an honest system design for the responsibility in `docs/agent-platform/`. Do not implement or deploy the system.

Read `architecture.md`, `failure-tour.md`, and the lab source plus README. Run the lab tests once to confirm the model still matches the record. Do not edit the lab.

Read the locally installed Claude Code command help. Record only capabilities the local help actually exposes. Add `Worker adapter contract` to `architecture.md` with the task input, repository and context input, structured proposal output, allowed and denied tools, filesystem boundary, process lifetime, cancellation signal, budget, exit states, and evidence returned to the platform. Mark any capability the help does not establish `UNVERIFIED`. Treat Codex as a replaceable future adapter, not as a second classroom runtime to implement.

Now attack the local model's limits. It demonstrates a local atomic file claim under two concurrent calls, but it does not prove distributed queue leasing or recovery after a crash between claim and effect. It decides timeout from fixture metadata and does not implement process cancellation, workspace isolation, credential brokering, or recovery. For each limitation, update `Control evidence` in `architecture.md` with the production mechanism, failure the mechanism prevents, evidence needed to trust it, and current evidence level. Do not promote a design claim to demonstrated evidence.

Patch `architecture.md` into one concrete AWS design. Follow one task through trigger, admission, durable queue, claim or lease, isolated workspace, context assembly, headless worker, tool proposal, authorization, short-lived credential, side effect, verification, trace, terminal state, and operator recovery. Make concurrent delivery, retry, timeout, cancellation, and a worker that continues after cancellation explicit state transitions. Name the store or conditional write that makes the side effect idempotent. Name the component that can kill the worker and the component that alone can obtain the effect credential.

Map AWS services only after the invariants are explicit. State one rejected alternative for every consequential service choice and what evidence would reverse it. Do not provision resources. In chat, return only the architecture path, the four weakest evidence rows, the AWS components selected, and the production-like tests still owed.
