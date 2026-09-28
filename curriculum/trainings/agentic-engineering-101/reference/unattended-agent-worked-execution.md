# Worked execution: one CI failure, one controlled outcome

This is the bridge between the local lab and your own design. It is a worked state machine, not a reference architecture.

The responsibility is narrow: when a CI job fails on an exact commit, gather approved evidence and either propose one pull-request draft, take no action, or escalate. The worker never merges, deploys, edits CI settings, contacts a customer, or receives the pull-request credential.

| Prior state | Event or attempt | Owner and invariant | Next state | Evidence |
|---|---|---|---|---|
| `received` | Pipeline event arrives | Admission checks repository, branch, event age, and policy version | `admitted` or `rejected` | Event reference + policy decision |
| `admitted` | Queue delivery is claimed | State store conditionally changes `admitted` to `claimed`; one lease per task version | `claimed` | Claim ID + lease expiry |
| `claimed` | Workspace starts | Runtime creates an isolated checkout of the exact commit with no effect credential | `running` | Workspace and commit references |
| `running` | Worker returns a structured proposal | Adapter validates schema; proposal is not authorization | `proposed` or `invalid` | Proposal hash + excluded fields |
| `proposed` | Broker evaluates policy and current state | Broker alone owns authorization and can request the short-lived pull-request credential | `authorized`, `restrained`, or `escalated` | Actor, policy version, decision, credential reference |
| `authorized` | Broker attempts the draft | Effect uses the task's idempotency key and expected prior state | `effect-recorded` or `effect-failed` | Pull-request draft reference or bounded error |
| `effect-recorded` | Independent verifier inspects the result | Tool completion is not success; required checks and forbidden changes decide | `completed` or `escalated` | Verifier evidence + terminal reason |

Now deliver the same event twice. Two consumers may start at the same time, but only one conditional claim may move the task from `admitted` to `claimed`. The loser records `duplicate` and performs no effect. That is a design claim until a concurrent integration test proves the store, queue, broker, and side-effect API share the same idempotency semantics.

Now let the worker outlive its deadline. Timeout moves the task to `timed_out`, revokes or expires its lease, and sends cancellation. A late proposal cannot move a terminal task back to `proposed`. The runtime must also stop the process and remove its workspace. A state-machine row can specify those controls; only a process-level test can demonstrate them.

The evidence levels are deliberately different:

- **Demonstrated locally:** one boundary-model transition or local atomic claim behaved as observed.
- **Simulated:** a fixture represented a late result or sensitive field.
- **Specified:** the architecture names the owner, invariant, and terminal state.
- **Production-like test owed:** the real queue, store, runtime, identity, effect API, and recovery path have not yet been exercised together.

Use the table's grammar on your responsibility. Do not copy its services or pretend its evidence transfers.

<!-- maintainer -->

**Role:** M7 worked bridge for students who understand coding agents but have not designed queue claims, leases, credential brokers, or terminal-state recovery.
