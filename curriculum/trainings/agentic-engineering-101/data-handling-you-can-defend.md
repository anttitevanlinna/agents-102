# Data handling you can defend

## Big Idea
An agent's data boundary is every copy, inference, tool call, trace, reviewer view, backup, and deletion path, not only the model request.

## Prework
Start a new session in the Module 5 worktree at `../<repo-name>-m5`. This module revises the `docs/agent-platform/` files you committed in Module 7, so it needs Module 7 done first. If you missed Module 7, run a short pass of [Build and test an unattended agent boundary](exercises/build-and-prove-agent-platform.md) in that worktree now, enough to commit its `architecture.md` and `proof.md`. You will trail the room; finish this module as homework.

## What You'll Learn
After this module, you will be able to:
- **Map** personal data through an unattended agent system, including hidden copies and inferences
- **Separate** engineering facts and controls from decisions owned by privacy, legal, product, or operations
- **Compare** a ticket handler with an in-product recommender without forcing one policy onto both
- **Revise** platform permissions, traces, retention, deletion, rights, and human review from evidence

## Start here

The boundary model exposed what it catches and the design exposed what it still only claims. Now follow the data each component would copy. The first case receives messy support tickets; the second learns what to rank from behavior.

[The model call is not the data flow](lectures/the-model-call-is-not-the-data-flow.md)

[Legality needs an evidence package](lectures/legality-needs-an-evidence-package.md)

[Exercise: Decide the agent data boundary](exercises/decide-agent-data-boundary.md)

[The transition carries its data](lectures/the-transition-carries-its-data.md)

## Key Concepts

- A data map follows every copy and inference from collection through deletion and backup.
- Trace usefulness does not justify storing raw sensitive content.
- Drafting, sending, ranking, and learning are different purposes and authority levels.
- Engineering prepares facts, controls, and unresolved questions; named owners make context-specific legal and product decisions.
- A launch state is provisional and bounded. It is not a declaration of legality or compliance.
- The controlled-transition model now includes the data used, purpose, decision owner, and retention or deletion rule.

## Next

The architecture is no longer an abstract agent platform. It now carries explicit data limits, owner decisions, and stop conditions that a team can test before a real launch.

<!-- maintainer -->

**Review status:** static review only (2026-10-13 PR review), real audit pending. No judge run has scored this module or its set.

**Meta (trainer):**
- **Primary Bloom's level:** Analyze + Evaluate + Create
- **Pacing:** Runtime is computed with `node scripts/calculate-time.js data-handling-you-can-defend`. Do not let legal debate consume the mapping phases; unresolved calls are valid outputs when they have an owner and the missing facts are named.
- **Transitions:** opening 5 @start · debrief 10 @after:decide-agent-data-boundary · bridge 5 @end
- **Mood target:** defensible judgement. The room can narrow a system responsibly without pretending engineers can self-issue a legal verdict.
- **Delivery:** Optional two-hour production extension. No customer data, cloud account, or legal advice is required. Both cases are fixed simulations against the student's tested Module 7 design. Each case is mapped as a possible second responsibility on the M7 platform, whose first responsibility is CI triage; for the recommender, only offline offer and profile refresh would run on the platform, and serving-time ranking stays outside it.
- **Prerequisite (maintainer 2026-10-13):** M8 requires M7's committed `docs/agent-platform/`. No example evidence set ships (`check_pedagogy.md` §65). Rescue per §65(b): a student who missed M7 runs M7's exercise compressed in their own M5 worktree, trails the room, and finishes M8 as homework.
- **Trainer prep:** The map prompts fix the owner roles as Privacy/Legal, Product, Operations, Security, and Engineering. Use the same five in the debrief.

**Leap test:**
- The engineer can point to a copy of personal data that was absent from the original architecture and add a control or remove the copy.
- The engineer can explain why the ticket and recommendation cases need different boundaries even on one platform.
- The engineer can hand a named owner a decision packet containing the relevant purpose, data, controls, risk, and missing evidence without claiming the answer.

**Artefact contracts:**

| Artefact | Stable identifier | Produced by | Consumed by |
|---|---|---|---|
| Ticket data map | `docs/agent-platform/data-cases/ticket-handler.md` | Ticket mapping prompt | Cross-case decision |
| Recommendation data map | `docs/agent-platform/data-cases/recommendation-bot.md` | Recommendation mapping prompt | Cross-case decision |
| Data-handling decision | `docs/agent-platform/data-handling-decision.md` | Cross-case comparison | Architecture revision and named owners |
| Revised platform boundary | `docs/agent-platform/architecture.md` | Revision prompt after human choices | Future implementation and evaluation |

**Failure modes + escape hatches:**
- **Ticket map:** the room maps the email but not tool payloads, traces, review queues, or backups. Require one row per copy, not one row per source field.
- **Recommendation map:** inferred preferences disappear because they were not collected directly. Treat each inference as data with its own purpose, access, lifetime, and rights path.
- **Comparison:** the agent declares a legal basis or compliance result. Replace it with the facts still needed and a named owner who decides.
- **Revision:** every risk becomes a platform-wide ban. Separate common controls from case-specific boundaries and ask which workload the control protects.
