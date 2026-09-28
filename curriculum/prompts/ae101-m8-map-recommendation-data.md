---
key: ae101-m8-map-recommendation-data
dest: Claude Code
context: M8 in-product recommendation case
runtime: any
origin: exercises/decide-agent-data-boundary
requires:
  - id: m7-proven-architecture
    source: prompt:ae101-m7-prove-control-plane
  - id: m7-data-boundary-inventory
    source: prompt:ae101-m7-prove-control-plane
produces:
  - id: m8-recommendation-data-map
    location: docs/agent-platform/data-cases/recommendation-bot.md
---
Read `docs/agent-platform/architecture.md` and `docs/agent-platform/proof.md`. The architecture contains the responsibility, tool and worker contracts, research decision, and control evidence. The proof contains the evidence ledger, initial data boundary, and production gates.

Analyze this case: an EU consumer marketplace wants an in-product recommendation agent. It ranks products and offers using account data, click and session history, purchases, coarse location, product availability, and preferences inferred from behavior. The ranking changes what appears first and what remains hard to discover. Product wants continuous learning from clicks and purchases. The proposed design has not decided whether users can disable personalization, how long histories or inferred preferences live, whether the same data supports marketing, or whether some recommendations could materially affect a user.

Write `docs/agent-platform/data-cases/recommendation-bot.md`. Map each data item and inference from collection through feature creation, context, tool calls, ranking output, feedback, traces, review, retention, deletion, and backup. For each copy name purpose, necessity, location, access, processor or recipient, retention assumption, deletion path, security control, and evidence still missing.

Screen profiling, transparency, objection or consent questions where applicable, automated-decision significance, purpose compatibility, vulnerable-user risks, processors and transfers, and whether a DPIA decision is needed. Do not answer legal questions from general knowledge. Assign each unresolved judgement to a named decision-owner role and state which engineering or product fact would let that owner decide.

In chat, return only the three decisions that make this case different from the ticket handler.
