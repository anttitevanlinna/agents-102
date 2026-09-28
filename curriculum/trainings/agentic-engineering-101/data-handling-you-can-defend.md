# Data handling you can defend

## Big Idea
An agent's data boundary is every copy, inference, tool call, trace, reviewer view, backup, and deletion path, not only the model request.

## Prework
Start a new session in the Module 5 worktree at `../<repo-name>-m5`, which now contains Module 7's `docs/agent-platform/architecture.md` and `proof.md`. If you did not run Module 7, open the checkout path the trainer provides with the example evidence set.

## What You'll Learn
After this module, you will be able to:
- **Map** personal data through an unattended agent system, including hidden copies and inferences
- **Separate** engineering facts and controls from decisions owned by privacy, legal, product, or operations
- **Compare** a ticket handler with an in-product recommender without forcing one policy onto both
- **Revise** platform permissions, traces, retention, deletion, rights, and human review from evidence

## Start here

The boundary model exposed what it catches and the design exposed what it still only claims. Now follow the data each component would copy. The first case receives messy support tickets; the second learns what to rank from behavior.

[The model call is not the data flow](lectures/the-model-call-is-not-the-data-flow.md)

[Exercise: Decide the agent data boundary](exercises/decide-agent-data-boundary.md)

[Legality needs an evidence package](lectures/legality-needs-an-evidence-package.md)

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

**Quality:** compendium-audited 2026-09-27
- judges: not yet judge-audited
- cross_module @fcc4dfe6: PASS — set=[build-your-agent-platform,data-handling-you-can-defend]

**Meta (trainer):**
- **Primary Bloom's level:** Analyze + Evaluate + Create
- **Pacing:** Runtime is computed with `node scripts/calculate-time.js data-handling-you-can-defend`. Do not let legal debate consume the mapping phases; unresolved calls are valid outputs when they have an owner and the missing facts are named.
- **Transitions:** opening 5 @start · debrief 10 @after:decide-agent-data-boundary · bridge 5 @end
- **Mood target:** sober agency. The room can narrow a system responsibly without pretending engineers can self-issue a legal verdict.
- **Delivery:** Optional two-hour production extension. No customer data, cloud account, or legal advice is required. Both cases are fixed simulations against the student's tested Module 7 design.
- **Trainer prep:** Have one complete Module 7 example evidence set available. Name the roles participants should use for privacy/legal, product, operations, security, and engineering decisions in the mock organization.

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
