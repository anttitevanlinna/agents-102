# Eval Instance — Bootstrap M7 / Share Your Work

**Training:** Bootstrap
**Module:** M7 — From Personal to Team
**Exercise:** `curriculum/exercises/share-your-work.md`
**Eval runs:** 2026-04-19 initial PDCA test+check pass.

---

## The judges (filled)

### Primary — the leap test

After completing this exercise, the participant can:
- Leave with BOTH a technical plan AND a people plan (not one without the other), with UNASSIGNED lines explicit and Monday's first move named.
- Apply the three portable strategy disciplines — crux (Rumelt), assumption-test (Martin), pre-mortem (Klein) — to the sharing problem, and recognise that the load-bearing crux is usually social, not technical.
- Select one to three sharing patterns from the catalog (share context / share a skill / share the output / share an interface) against their real infrastructure — cloud agent platform (Branch A) or personal-Claudes-only (Branch B) — and accept that unfinished passages are Monday's work, not failure.

If a builder leader (not a dev) walks out of this exercise able to do these three things, it's good enough.

### Framing fidelity

The exercise leads with the module's Big Idea: **You can't really share an agent. You can share context, a skill, the output, or an interface — and the choice is a strategy decision, not a deployment decision.**

It avoids these anti-framings:
- "Package your agent for others" / "share the whole agent" — vendor pitch; violates strategy.
- Sharing as a governance chore — steals the generous-impulse mood.
- Branch B (personal Claudes only) framed as a consolation prize or a limitation.
- Technical plan treated as primary, people plan as afterthought.

### Learning goal fit

Enables these Bloom-tagged learning goals from the module file (verbatim):
- **Diagnose** the load-bearing obstacle to sharing your work — applying the crux discipline to a sharing problem, separating social obstacles from technical ones
- **Select** a sharing strategy from the four that work (share context / share a skill / share the output / share an interface) against your real infrastructure
- **Redesign** for shared use by producing both a technical plan and a people plan — ownership, governance, operating, accountability, propagation
- **Test** the assumptions the plan rests on — surfacing what would have to be true, ranking by load-bearing weight
- **Pre-mortem** the rollout — imagining the six-month failure, biased toward the social failure you're not seeing

### Module-to-module arc

Picks up from **M6's unleashed leverage (eval loop that runs itself) — the student now has something that works well enough to want to share it.**
Subtly hands off to **M8's awe (agents building agents) — crux/assumption-test/pre-mortem are introduced here as native material and returned to in M8 as named skills.**

### Mood lands

Module's deliberate mood: **generous impulse** — *"This is starting to work. I wonder if others could benefit?"* Generosity as natural consequence, not obligation. Axis shifts from personal-mastery to team-ownership.

**Pass threshold: 8+/10 at every beat.** Failure modes to watch: governance-chore tone, Branch B as pity path, resolving the people-plan gap (it should remain open as Monday's work), technical-plan relief overriding the social-crux unease before it lands.

### Teaching moment lands

The exercise is designed to reliably produce this aha:
- **"The crux is usually social, not technical — and the people plan is equal weight to the technical plan. A perfect technical plan with no people plan is a PowerPoint."**

If reasonable variation in participant skill can skip the moment (e.g., student surfaces a technical crux, rubber-stamps it, and finishes with a tidy deployment plan and no people plan), the exercise is fragile.

### Red-flag triggers (additional checks for this exercise)

- (a) Is the people plan treated as equal throughout, or does it drift into afterthought (word-count, prompt-weight, closing beat)?
- (b) Are both branches first-class, or is Branch B a consolation prize in the writing?
- (c) Does the exercise land the "crux is usually social" teaching moment, or can a student finish with a technical crux and miss the point?
- (d) Does the pattern catalog get consulted live, or merely referenced?
- (e) Is hardness honored (student MAY not finish) or does the exercise try to guarantee completion?
- (f) Are crux / assumption-test / pre-mortem used as M7 native material, not imported ceremony from M8?

### Failure modes named

- Student names a technical crux ("no Slack bot platform") → facilitator/Teacher Claude push: "if that platform appeared tomorrow, would sharing happen?"
- Student rubber-stamps the first crux Claude returns → nudge: "argue with one line; which runner-up is closer?"
- People plan stalls on names; student treats stall as failure → reframe: "UNASSIGNED lines are findings, not failures."
- Student runs out of time in Phase 4/5 → designed; verbal reframe before Phase 4 ("half of you won't finish; that's Monday's work").
- Append-vs-integrate on Phase 4 assumption-test → watch output for section-growth rather than confidence-reshape.

### Time-boxed

~68 minutes (Phase 1: 10, Phase 2: 15, Phase 3: 20, Phase 4: 10, Phase 5: 8, close: 5). Fits 55–70 window. Some phases will run long — by design.

### Facilitator briefing complete

Watch-fors, decision points, plug points, stall-recovery all present in maintainer section. Branch-selection timing (8–10 min) flagged. Phase 3 stall on people-plan names flagged as "the teaching moment — protect it."

### Riffs on a recognized framework

- Rumelt's **crux** (*Good Strategy Bad Strategy*)
- Roger Martin's **strategy as assumptions** / *what would have to be true?* (*Playing to Win*)
- Gary Klein / Kahneman's **pre-mortem**
- Supporting research: Access-Trust Gap (Pattern 47), absorption bottleneck (L4), announcement-to-deployment gap.

Three top-tier business frameworks, pedagogically central (each owns a phase), best-in-class.

### Scaffold / worked example provided

- Four copy-paste prompts (one per Phase 1, 3, 4, 5).
- Pattern catalog (`strategy/personal-to-team-patterns.md`) as reference — WIP with `[TODO]` placeholders on many examples.
- Four sharing strategies listed inline in Phase 2 as memory aid.
- Prior modules have built brain/skills/artifacts; no new artifact type is produced from thin air.

### Prompt design

- Four prompts. No `[BRACKET]` placeholders mid-prompt. All use conversation-after pattern ("ask me anything you need", "show me before saving").
- Each under one page. Paragraph structure clean.

### Plug points real

- Branch selection (real buyer infrastructure).
- Ownership model (named person from their org).
- Crux (their real hesitation).

### Voice / Business-audience language

- Second person throughout. No facilitator instructions in body (all in maintainer).
- No banned jargon (checked: no embeddings, vector, RAG, orchestration, schema, architecture, subagent, frontmatter, prompt engineering). "Runtime" and "connector" appear — earned via M4/M6 and prework three-walls reading.
- Seth/Rory/Risto flavor present: *"The third story is the one to read twice."* / *"A perfect technical plan with no people plan is a PowerPoint. The industry is full of those."*

### Length

~1100 words student-facing body. Above 400–700 target — the multi-phase discipline structure earns extra length, but worth flagging.

### Specificity

Named files (`module-7/crux.md`, etc.), named disciplines with attribution, named patterns, realistic hesitations quoted.

---

## Notes for PDCA Act step

See report for top 3 fixes and ambiguities surfaced by the simulation pass. Iterate in the next cycle.
