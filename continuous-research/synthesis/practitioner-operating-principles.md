---
type: synthesis
domain: coding-engineering
updated: 2026-08-05
answers:
  - "what operating principles do leading agentic-engineering practitioners emphasize?"
  - "what would Boris Cherny, Armin Ronacher, Simon Willison, Hamel Husain, Matt Pocock, and Kieran Klaassen add to agentic-engineering training?"
  - "which practitioner principles are established, and which remain single-practitioner positions?"
---

# Practitioner operating principles — coverage map

This file keeps ten practitioner-derived additions in the continuous-research system before any curriculum decision is made. It is a coverage map, not a claim that the ten form one framework or that the field has converged on all of them.

**Evidence status:** mixed. Cognitive debt is L3 in this research system; review/WIP backpressure is L2; the remaining items are L1–L2 practitioner positions or single-team practices. The bundle itself has no evidence level.

## 1. Repeated review comments should become deterministic checks

Orosz reports that Boris Cherny logged recurring review comments at Meta and wrote a lint rule once a pattern appeared three or four times. The useful mechanism is the promotion threshold: human judgment observes the pattern first; stable recurrence earns automation.

- **Source:** Gergely Orosz on Boris Cherny, [*Building Claude Code with Boris Cherny*](https://newsletter.pragmaticengineer.com/p/building-claude-code-with-boris-cherny) — `[domain trade publication]`, 4 Mar 2026.
- **Evidence:** L1 reported practitioner practice. The threshold is Cherny's reported practice, not a field standard.
- **Existing homes:** [Boris Cherny observation](../observations/boris-cherny.md) covers verification and compounding but previously omitted the recurrence-to-lint mechanism.
- **Next OODA question:** do teams beyond Cherny publish an explicit promotion threshold from repeated review finding to deterministic check?

## 2. Retrieval architecture is part of context engineering

Two adjacent practices point in the same direction. Cherny's team found model-driven glob/grep more useful than a vector index for code search; Klaassen treats the folder and its durable files as the agent's working environment. The candidate principle is operational: pass an addressable path and let the agent retrieve narrowly rather than pinning pasted context into every later turn.

- **Sources:** Orosz on Cherny, [*Building Claude Code with Boris Cherny*](https://newsletter.pragmaticengineer.com/p/building-claude-code-with-boris-cherny) — `[domain trade publication]`, 4 Mar 2026; Kieran Klaassen, [*The Folder Is the Agent*](https://every.to/source-code/the-folder-is-the-agent) — `[practitioner direct, vendor venue]`, 13 Apr 2026.
- **Evidence:** two related L1–L2 practices, not a counted convergence claim.
- **Existing homes:** [token-efficiency OODA](../platform-watch/coding-agents/runs/2026-06-03-1534-token-efficiency-sweep1-agent-factory.md) already preserves the exact-source caveat: *pass paths, not paragraphs* is curriculum synthesis, not Klaassen's verbatim slogan.
- **Next OODA question:** when does direct filesystem retrieval stop working, and what measured repository or corpus boundary makes indexing earn its cost?

## 3. Review capacity governs safe generation throughput

Ronacher describes a queue failure: when generated work arrives faster than accountable review can absorb it, WIP accumulates and input must be throttled or shed. The research system already holds this as the absorption-bottleneck pattern with Osmani as a second independent practitioner leg.

- **Source:** Armin Ronacher, [*The Final Bottleneck*](https://lucumr.pocoo.org/2026/2/13/the-final-bottleneck/) — `[practitioner direct]`, 13 Feb 2026.
- **Evidence:** L2 in the current KB, not L3. [Absorption bottleneck](../findings/by-pattern/absorption-bottleneck.md) owns the corrected evidence count.
- **Existing homes:** absorption-bottleneck finding, [WIP Explosion insight](../insights.md), Ronacher observation, AI-native-teams state.
- **Next OODA question:** which teams publish an explicit WIP limit, admission-control rule, or load-shedding mechanism for agent work?

## 4. Failed automation should be removed; failed experiments should remain legible

Ronacher's 2025 retrospective says he automates recurring work, treats unused automation as failed, and deletes it. Publishing the failed approaches also preserves negative knowledge, but that second step is an inference from the form of the retrospective rather than a method he explicitly prescribes.

- **Source:** Armin Ronacher, [*Agentic Coding Things That Didn't Work*](https://lucumr.pocoo.org/2025/7/30/things-that-didnt-work/) — `[practitioner direct]`, 30 Jul 2025.
- **Evidence:** L1 historical practitioner position. It is outside the six-month currency window and must not be presented as his verified current workflow without a fresh restatement.
- **Existing homes:** Ronacher observation captures disposable skills but not the broader deletion rule; M6 curriculum research separately carries *rules have a half-life*.
- **Next OODA question:** find a fresh practitioner or team account that measures automation use, deletes low-use helpers, and keeps a searchable record of rejected approaches.

## 5. Passing checks does not repay cognitive debt

Willison's *understand to participate* framing says implementation can outrun the human's conceptual model until the human can no longer steer creatively. This is one voice inside an already established research pattern, not the sole basis for it.

- **Source:** Simon Willison, [*Understand to participate*](https://simonwillison.net/2026/Jul/2/understand-to-participate/) — `[practitioner direct]`, 2 Jul 2026, amplifying Geoffrey Litt's talk with attribution intact.
- **Evidence:** the broader cognitive-debt problem is L3 across six sources; mitigations remain L1–L2. [AI-native teams state](../platform-watch/ai-native-teams/state.md) owns the source chain and counter-position.
- **Existing homes:** AI-native-teams state, cycles 158–159, coding-agents state.
- **Next OODA question:** which comprehension gate survives outside a controlled study and changes maintenance outcomes in a named production team?

## 6. Encode invariants, then delegate reversible judgment inside them

Willison reports a technique from Cat Wu and Thariq Shihipar: ask a capable model to decide when testing is warranted and which model tier suits a subtask, rather than prescribing every branch. This is not an argument for unbounded autonomy. The candidate principle separates hard invariants and evidence requirements from reversible execution choices.

- **Source:** Simon Willison, [*Fable's judgement*](https://simonwillison.net/2026/Jul/3/judgement/) — `[practitioner direct]`, 3 Jul 2026; the underlying tips are attributed to Wu, Shihipar, and Jesse Vincent.
- **Evidence:** L1 technique from one practitioner's reported use.
- **Existing homes:** [AI-native teams state](../platform-watch/ai-native-teams/state.md) records the technique; it was not previously joined to the rules-versus-judgment question.
- **Next OODA question:** what task properties let teams delegate workflow decisions safely, and where do they deliberately retain deterministic routing?

## 7. Error analysis should precede eval design

Husain and Shankar start the minimum viable eval setup with manual review of real outputs. Their method builds a failure taxonomy from observed traces before deciding which checks deserve automation. This is stronger than selecting a generic rubric first, but the method source is now historical under the research freshness rule.

- **Source:** Hamel Husain and Shreya Shankar, [*LLM Evals: Everything You Need to Know*](https://hamel.dev/blog/posts/evals-faq/evals-faq.pdf) — `[practitioner direct]`, 28 May 2025.
- **Evidence:** L1 historical method; eval/error-analysis teaching is convergent across curricula, but the *error analysis first* sequence has not been independently counted here.
- **Existing homes:** [curriculum convergence](curriculum-convergence.md) inventories their course; [practitioner convergent stance](practitioner-convergent-stance.md) carries Husain's judgment-owner position.
- **Next OODA question:** find a 2026 team account showing a trace-derived failure taxonomy changing its production eval suite.

## 8. Known checks need a continuing exploration lane

The same Evals FAQ warns that targeted classifiers preferentially find already-described failures and recommends retaining random traces in each review batch. A mature evaluator can therefore narrow discovery even while its pass rate improves.

- **Source:** Husain and Shankar, [*LLM Evals: Everything You Need to Know*](https://hamel.dev/blog/posts/evals-faq/evals-faq.pdf) — `[practitioner direct]`, 28 May 2025.
- **Evidence:** L1 historical method. The exploitation/exploration wording is this synthesis, not the source's named framework.
- **Existing homes:** no durable synthesis before this audit; isolated references to random sampling existed only in cycle material.
- **Next OODA question:** who publishes the ratio or cadence between known-failure screening and random/outlier review in a live agent system?

## 9. Shared understanding can be an explicit pre-build gate

Pocock's `grilling` primitive walks a decision tree one dependency at a time, lets the codebase answer what it can, gives a recommended answer for human questions, and waits for confirmation before enactment. It makes task alignment a produced state rather than an assumed precondition.

- **Source:** Matt Pocock, [`grilling` documentation](https://github.com/mattpocock/skills/blob/main/docs/productivity/grilling.md) — `[practitioner direct]`, current repository state retrieved 5 Aug 2026.
- **Evidence:** L1 practitioner method. Repository adoption shows interest, not proof of the method's outcome.
- **Existing homes:** workflow-composition findings and coding-engineering domain file mention the primitive, but previously treat it mainly as a pre-plan process.
- **Next OODA question:** do independent teams report fewer rework loops or scope reversals after adopting this interview gate?

## 10. Compounding is incomplete until retrieval and prevention are tested

Klaassen's current guide gives the compound step four jobs: capture the solution, make it findable, update the system, and verify whether the system would catch the issue automatically next time. The final question prevents *write a note* from standing in for a closed learning loop.

- **Source:** Kieran Klaassen, [*Compound Engineering*](https://every.to/guides/compound-engineering) — `[practitioner direct, vendor venue]`, published 2 Feb 2026 and updated 9 Jul 2026 on the page retrieved 5 Aug 2026.
- **Evidence:** L2 single-team method. The retrieval/prevention test is explicit; independent organizational outcome evidence remains absent.
- **Existing homes:** Klaassen observation covers writing learnings back and making them discoverable, but did not isolate the retrieval test as the completion criterion.
- **Next OODA question:** does any team measure whether compounded guidance was actually retrieved and prevented recurrence in a later session?

## Orientation for curriculum discussion

These ten do not want ten new lectures. The research clusters them into four candidate teaching jobs:

1. **Control throughput:** recurrence-to-check promotion; review-capacity/WIP limits.
2. **Keep the learning system healthy:** retrieval economics; delete dead automation; test that a lesson is findable and preventive.
3. **Preserve human agency:** comprehension as an acceptance condition; deterministic boundaries around delegated judgment; shared understanding before enactment.
4. **Keep evaluation empirical:** observed failures before evaluators; exploration after evaluators.

That clustering is a design hypothesis for discussion, not a curriculum recommendation. The research system now holds the evidence and its limits; placement, sequence, and exercise shape remain open.
