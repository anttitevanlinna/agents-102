# Build and test an unattended agent boundary

**Time:** 85 minutes.

**Session** *(new, in your current repository)*

Start a new session in the existing Module 5 worktree at `../<repo-name>-m5`, where Module 6 finished. The shared CI-triage case stays local. It must not receive production credentials or perform a real external side effect.

**What you do:** break a supplied unattended-agent lab, explain which boundary should catch each failure, then design and incident-test one shared CI-triage responsibility.

**What you build:** three files: a failure-tour record, one AWS architecture containing the responsibility and contracts, and an evidence ledger that separates local demonstration from production claims.

**The point:** unattended work becomes engineering when action and restraint are both designed outcomes.

---

## Phase 1: Break the platform first

*15 minutes*

Start from a working local control plane, not a blank file. The supplied lab has a worker, broker, idempotency store, timeout path, trace checker, and simulated effect. Its fault tour violates those boundaries one at a time.

{{prompt:ae101-m7-run-failure-tour}}

Do not move on until you can explain why each failure belongs to the platform around the worker. Seeing a checker reject a fault matters less than knowing which invariant made the rejection necessary.

## Phase 2: Design the shared responsibility

*20 minutes*

Use the same [CI-triage challenge](trainings/agentic-engineering-101/reference/agent-platform-challenge.md) as the rest of the room. First read the [worked execution](trainings/agentic-engineering-101/reference/unattended-agent-worked-execution.md). Reuse its state-machine grammar, then make three decisions the example deliberately leaves open.

{{prompt:ae101-m7-frame-unattended-responsibility}}

Check the proposed custom tool before moving on. Its schema should be narrower than the worker's natural-language task, and its postcondition should be something the platform can verify without asking the worker whether it succeeded.

## Phase 3: Design the runtime around it

*25 minutes*

Pick the unresolved architecture decision most likely to widen authority or weaken reconstruction. Give the agent exactly three rules for this search. Each rule should reject, prefer, or force something specific.

{{prompt:ae101-m7-research-boundary-decision}}

The decision record should make one call. An unresolved question with strong evidence for why it remains unresolved is better than a broad survey that changes nothing.

Now turn the local model and the researched decision into a concrete runtime design. The lab is useful because its limits are visible: it does not prove concurrency, cancellation, isolation, credentials, or recovery.

{{prompt:ae101-m7-build-control-plane}}

## Phase 4: Put the design through incidents

*25 minutes*

Walk three failures the local model cannot prove: concurrent duplicate delivery, a worker that continues after cancellation, and secret-bearing tool data reaching the trace. Predict the terminal state before the architecture is tested.

{{prompt:ae101-m7-prove-control-plane}}

Use the evidence ledger to decide which architecture claims survive. Patch only the controls the incidents exercised. Leave implementation and production-like tests explicit.

Commit `docs/agent-platform/` in your current branch or worktree, then close this session. The final proof section names one responsibility from your Modules 4–6 work that could reuse the pattern and the first invariant that would change. Module 8 starts a new session in the same checkout and follows the data through the tool contract, evidence ledger, and architecture.

<!-- maintainer -->

**View summary:** You break a local control plane, identify the invariant behind each rejection, then carry one bounded CI-triage responsibility through an AWS design and three incidents. The evidence ledger separates what the lab demonstrated from the production tests and approvals still owed.

**Primary Bloom's level:** Analyze + Evaluate + Create.

**Mood target:** architectural ownership through honest evidence.

**Leap test:**
- Explains which platform invariant owns authorization, duplicate delivery, timeout, and trace-data failures before designing the runtime.
- Separates what the local executable model demonstrates from what concurrency, cancellation, isolation, credentials, and recovery still require.
- Walks three incidents through one concrete AWS design and records both the architecture consequence and the production gate.

**Failure modes + escape hatches per phase:**

| Phase | Dominant failure | Escape hatch |
|---|---|---|
| Tour | The student reports only that each fault failed | Ask which component owned the invariant and what unsafe outcome the rejection prevented |
| Frame | The student redesigns the whole CI system | Return to one failed job, one pull-request draft proposal, no action, or escalation |
| Research | The agent writes a cloud survey | Stop after one consequential decision has accepted evidence, a rejected alternative, and reversal evidence |
| Design | AWS names replace state transitions | Remove the service names, write the invariant and owner, then map the service back |
| Incident | The review stays hypothetical | Require the exact prior state, attempted transition, terminal state, and operator evidence |

**Prompt chain:** `ae101-m7-run-failure-tour` → `ae101-m7-frame-unattended-responsibility` → `ae101-m7-research-boundary-decision` → `ae101-m7-build-control-plane` → `ae101-m7-prove-control-plane`.
