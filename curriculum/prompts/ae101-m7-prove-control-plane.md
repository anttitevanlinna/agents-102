---
key: ae101-m7-prove-control-plane
dest: Claude Code
context: M7 incident review and evidence boundary
runtime: any
origin: exercises/build-and-prove-agent-platform
requires:
  - id: m7-system-design
    source: prompt:ae101-m7-build-control-plane
  - id: m7-worker-adapter-contract
    source: prompt:ae101-m7-build-control-plane
produces:
  - id: m7-platform-proof
    location: docs/agent-platform/proof.md
  - id: m7-data-boundary-inventory
    location: docs/agent-platform/proof.md
  - id: m7-proven-architecture
    location: docs/agent-platform/architecture.md
  - id: m7-production-gates
    location: docs/agent-platform/proof.md
---
Run an incident review against the unattended-agent design. The goal is to find where the architecture changes state incorrectly, not to declare the platform production-ready.

Read `architecture.md`, `failure-tour.md`, and the local lab. Run the lab's fault tour once as the executable baseline. Keep its limitations visible.

Review the first two incidents one at a time. Before analyzing each incident, ask me to predict the terminal state, the control that owns it, and the trace evidence an operator should see. Wait for my answer. Then walk the current architecture event by event, show where my prediction holds or fails, and ask me to choose the architecture change before applying it.

1. Two queue consumers claim the same event concurrently. Both workers return an eligible proposal before either side effect is visible.
2. The failing commit adds a project `.claude/settings.json` whose `SessionStart` hook posts the workspace, including a token printed in the CI log, to an outside host. The worker starts in that checkout.
3. The task times out and cancellation is sent, but the worker continues and proposes the effect after a retry has already started.

Do not analyze the third incident in this session. It is my take-home.

Write one file: `docs/agent-platform/proof.md`.

Its `Evidence ledger` records the local-model checks, the two incident predictions, observed design outcome, patch selected, remaining failure, and evidence level after the patch. Separate demonstrated, simulated, specified, and still-owed claims. Add the third incident as an open take-home row with its text, the three prediction questions, and status `open`. `Control evidence` in `architecture.md` stays the one place that states each control's current evidence level: when an incident changes a level, update that row there and record the reason in the ledger.

Its `Data boundary` section starts from the `Data boundary seed` in `architecture.md` and inventories the actual lab fields plus the designed worker input, tool proposal, broker decision, credential request, trace fields, verifier evidence, operator view, and artifact stores. For each item record purpose, location, raw value or reference, access assumption, retention assumption, and whether it is stored, masked, summarized, or excluded. Then replace the seed in `architecture.md` with one line pointing to this section.

Its `Production gates` section names the service owner, change approver, credential owner, kill switch or disable path, rollback condition, evidence a reviewer must inspect, and the unresolved decision that blocks production use. Include the production-like tests required for concurrency, cancellation, isolation, repository-config isolation, network egress, credentials, recovery, and data deletion. A local green model is not production approval.

Its `Transfer` section names one recurring responsibility visible in this repository's Modules 4–6 artifacts that could use the same pattern. Record only its trigger, bounded effect, correct restraint, and the first invariant that would differ from CI triage. Do not redesign the platform for it in this session.

Patch only the architecture sections exercised by the incidents. Leave any `Research decision` section as it is. In chat, return only the two incident outcomes, changed architecture sections, controls still specified rather than demonstrated, and the production blocker.
