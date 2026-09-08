---
type: finding
domain: cross-domain
evidence_level: 2
platforms: [claude-code, codex, github, aws, agent-memory]
practitioners: [Aditya Aggarwal, Nahid Farhady Ghalaty, Kieran Klaassen, Dan Shipper, Hamel Husain, Shreya Shankar]
nordic: false
updated: 2026-09-08
answers:
  - "what should a learning agent do when rules conflict?"
  - "how should agent memory preserve disagreement?"
  - "how does human feedback become double-loop learning?"
  - "should the newest, majority, or most restrictive rule win?"
  - "how should multi-team learning agents resolve policy disagreement?"
---

# Conflict-Preserving Learning

**Evidence level:** Level 2 | **Last updated:** 2026-09-08

**Thesis:** A mature learning agent preserves disagreement long enough to learn whether the defect is in the rule, its scope, or the governance that promoted it.

## The distinction

Not every contradiction should survive. Aggarwal and Ghalaty report one factual conflict where a general disposal rule contradicted the framework-specific lifetime of a factory-created `HttpClient`; the team verified the fact and narrowed the general rule. That is ordinary rule refinement. ([field report](https://arxiv.org/html/2607.13091v1) — [academic/research], 2026-07-13)

Other disagreements have no single context-free answer. A convention can differ by repository, an operational choice by incident phase, and a policy by authority domain. TANGLE shows that memory extraction frequently preserves the topics while losing the context, time, or source relations that make those conflicts interpretable. Its fixed recency, majority, and source-priority policies are all structurally incomplete. ([TANGLE](https://arxiv.org/html/2608.13921v1) — [academic/research], 2026-08-14)

## The four conflict classes

| Class | What it means | Resolution path |
|---|---|---|
| Factual | At least one rule is wrong or too broad | Verify; refine or supersede |
| Contextual | Both rules are valid in different scopes | Namespace or conditionalize; ask when context is missing |
| Temporal | Validity changed or oscillates over time | Preserve sequence and validity interval; verify current state |
| Authority/policy | Legitimate owners disagree about desired behavior | Route the decision; do not let retrieval ranking choose |

## The durable representation

A conflict is a linked object, not two independent memories and not a compromise summary. Preserve:

- both claims and their provenance;
- source authority, scope, and valid time;
- supporting and counter-evidence;
- the missing decision variable;
- affected artifacts and action blast radius;
- the semantic owner and effect owner;
- safe interim action and conflict status;
- decision, rationale, expiry, and supersession lineage.

Every's current `ce-compound-refresh` provides a practical partial implementation. Contradictions outrank ordinary drift; ambiguous unattended cases are marked stale; and guidance with independent support is preserved as a possible product-regression signal when code diverges. It does not silently make the implementation the truth. ([Every](https://github.com/EveryInc/compound-engineering-plugin/blob/8df67793b9733d2220fa9a7fc37139931471af62/docs/guides/ce-compound-refresh.md) — [practitioner direct], checked 2026-09-08)

## The action policy

Use six actions rather than one universal conflict rule: **commit, conditionalize, clarify, verify, defer, or reversible trial.** Consequence determines caution. High-impact unresolved conflicts block promotion or execution; low-impact conflicts may support a reversible experiment.

For deterministic safety controls, restrictive composition is appropriate: GitHub aggregates protections and applies the most restrictive version of a duplicated rule, while AWS IAM explicit deny overrides allow. This rule must stay inside authorization and enforcement. Applying “most restrictive wins” to product truth or human intent can produce a confidently wrong system. ([GitHub rulesets](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/about-rulesets) and [AWS IAM evaluation](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_evaluation-logic.html) — [vendor documentation], checked 2026-09-08)

## Conflict is the double-loop trigger

Husain and Shankar's annotator process makes the outer loop explicit: label shared cases independently, measure agreement, isolate disputed examples, identify the missing rubric rule or example, revise the rubric, and relabel affected cases. If disagreement remains, a named domain expert decides and records why. The immediate label is single-loop correction; changing the rubric or ownership model is double-loop learning. ([Evals FAQ](https://hamel.dev/blog/posts/evals-faq/index.html) — [practitioner direct], modified 2026-09-01)

## Evidence boundary

This is an L2 synthesis. The field has one reported coding-rule conflict, one inspectable knowledge-maintenance mechanism, a maintained practitioner disagreement method, a synthetic memory benchmark, and mature control-composition primitives. No public large-company system joins them and measures the complete conflict-to-action loop.

Full evidence: [OODA cycle 186](../../platform-watch/coding-agents/runs/2026-09-08-1437-cycle186.md).
