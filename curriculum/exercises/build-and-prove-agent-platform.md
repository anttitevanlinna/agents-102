# Build and test an unattended agent boundary

**Time:** 75 minutes.

**Session** *(new, in your current repository)*

Start a new session in the existing Module 5 worktree at `../<repo-name>-m5`, where Module 6 finished. The shared CI-triage case stays local. It must not receive production credentials or perform a real external side effect.

**What you do:** break a supplied unattended-agent lab, explain which boundary should catch each failure, then design and incident-test one shared CI-triage responsibility.

**What you build:** three files: a failure-tour record, one AWS architecture containing the responsibility and contracts, and an evidence ledger that separates local demonstration from production claims.

**The point:** unattended work becomes engineering when action and restraint are both designed outcomes.

---

## Phase 1: Break the platform first

*20 minutes*

Start from a working local control plane, not a blank file. The supplied lab has a worker, broker, idempotency store, timeout path, trace checker, and simulated effect. Its fault tour violates those boundaries one at a time.

{{prompt:ae101-m7-run-failure-tour}}

Do not move on until you can explain why each failure belongs to the platform around the worker. Seeing a checker reject a fault matters less than knowing which invariant made the rejection necessary.

## Phase 2: Design the shared responsibility

*15 minutes*

Use the same [CI-triage challenge](trainings/agentic-engineering-101/reference/agent-platform-challenge.md) as the rest of the room. First read the [worked execution](trainings/agentic-engineering-101/reference/unattended-agent-worked-execution.md). Reuse its state-machine grammar, then make three decisions the example deliberately leaves open.

{{prompt:ae101-m7-frame-unattended-responsibility}}

## Phase 3: Design the runtime around it

*20 minutes*

The lab is useful because its limits are visible: it does not prove distributed concurrency, cancellation, isolation, credentials, or recovery, and it never runs a real worker against untrusted repository content. Turn the tested local model into a system design that keeps every one of those limits visible.

{{prompt:ae101-m7-build-control-plane}}

## Phase 4: Put the design through incidents

*20 minutes*

Two failures the local model cannot prove go through the design in the room: concurrent duplicate delivery, and a failing commit that brings its own Claude Code configuration and tries to send the workspace out. Run the incident review and predict each terminal state before the architecture is tested.

{{prompt:ae101-m7-prove-control-plane}}

Use the evidence ledger to decide which architecture claims survive. Patch only the controls the incidents exercised. Leave implementation and production-like tests explicit.

The third incident, a worker that keeps running after cancellation, waits in `proof.md` as an open row. Walk it after the session with the same move: predict the terminal state first, then let the agent walk the architecture.

<!-- maintainer -->

**Review status:** static review only, real audit pending. No judge run has scored this file, so it carries no Quality line.

**View summary:** You break a local control plane, identify the invariant behind each rejection, then carry one bounded CI-triage responsibility through an AWS design and two incidents. The evidence ledger separates what the lab demonstrated from the production tests and approvals still owed.

**Primary Bloom's level:** Analyze + Evaluate + Create.

**Mood target:** architectural ownership through evidence that holds up.

**Timebox:** the four phases sum to 75 minutes; the module computes to 109 of 120. The budgets are estimates until a sim run measures them. Bounded research is the module's optional challenge, not a phase. The cancellation incident is a take-home row in `proof.md`.

**Leap test:**
- Explains which platform invariant owns authorization, duplicate delivery, timeout, and trace-data failures before designing the runtime.
- Separates what the local executable model demonstrates from what concurrency, cancellation, isolation, credentials, and recovery still require.
- Walks two incidents through one concrete AWS design, including a commit that carries its own worker configuration, and records both the architecture consequence and the production gate.

**Failure modes + escape hatches per phase:**

| Phase | Dominant failure | Escape hatch |
|---|---|---|
| Tour | The student reports only that each fault failed | Ask which component owned the invariant and what unsafe outcome the rejection prevented |
| Frame | The student redesigns the whole CI system | Return to one failed job, one pull-request draft proposal, no action, or escalation |
| Design | AWS names replace state transitions | Remove the service names, write the invariant and owner, then map the service back |
| Incident | The review stays hypothetical | Require the exact prior state, attempted transition, terminal state, and operator evidence |

**Prompt chain:** `ae101-m7-run-failure-tour` → `ae101-m7-frame-unattended-responsibility` → `ae101-m7-build-control-plane` → `ae101-m7-prove-control-plane`. The module's optional challenge runs `ae101-m7-research-boundary-decision` against the same `architecture.md`.
