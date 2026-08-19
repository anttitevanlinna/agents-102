# Eval Instance — Agents 101 M7 / Share Your Work

**Training:** Agents 101
**Module:** M7 — From Personal to Team
**Exercise:** `curriculum/exercises/share-your-work.md`

**Eval runs:**
- 2026-04-19 — initial PDCA test+check pass (pre-JTBD frame).
- 2026-04-20 — **JTBD reframe.** Exercise rewritten against Jobs-to-be-Done opening frame. Starting question shifts from *"what should I share?"* to *"what job is my teammate trying to get done, and which sharing shape does it?"* Phase 1 is now the agentic interview (agent reads memory + uses ask-questions tool + writes `jtbd.md` with outcome statement). Phase 2 selection test shifts from *fits my infra* to *moves the outcome metric*. Phase 4 tests switch assumptions (firing the incumbent), not generic sharing. Phase 5 names failure stories for the firing-that-didn't-happen, not the rollout-that-broke. Closing is a Monday conversation, not a Monday deployment. Primary leap test, two new judges (JTBD frame lands; Outcome-vector discovery works) added below. **Verdict: APPROVE WITH TODOs** (essential judges pass; contributory TODOs noted at the bottom). See report for simulation outcomes.

---

## The judges (filled)

### Primary — the leap test *(JTBD-aware, 2026-04-20)*

After completing this exercise, the participant can:
- Leave with a **JTBD brief anchored in the teammate's language**, including an **outcome statement** ("minimize/increase [metric] when [doing the job]") — anchored to specific memory files and the 2-3 confirmations the ask-questions tool plugged.
- Select a **sharing candidate because it moves the outcome metric** — not because it matches the infrastructure they happen to have. Branch B is first-class; Branch A adds on top.
- Produce **both technical and people plans**, with UNASSIGNED lines named explicitly as Monday's questions.
- Test **switch assumptions and likely failure stories** (would the teammate fire their current hire?), not generic sharing.
- Walk out with **a Monday conversation** — not a deployment task — as the first move: one teammate, one question about their job, one assumption to test.
- Name the transferable skill: **interview for outcomes before designing a solution.** Applicable to any future adoption problem in their org.

If a builder leader (not a dev) walks out of this exercise able to do these things, it's good enough.

### JTBD frame lands *(exercise-specific — essential, new 2026-04-20)*

Does the exercise force **teammate-perspective FIRST**, before any builder-side assumption shapes the plan?

Checks:
- Phase 1 produces a job statement in the teammate's language, including functional + emotional/social components, before any candidate is considered.
- The current hire (Excel / colleague / gut / vendor tool / nothing) is named explicitly — not glossed.
- The outcome statement follows the "minimize/increase [metric] when [doing the job]" form and anchors downstream phases.
- Phase 2 selection test is *does this candidate move the outcome metric?* — not *does this fit my infrastructure?*

**Red flag:** student drafts the outcome from their own assumptions about what the teammate needs without the interview step producing any surprise. If nothing in the JTBD brief was new information to the student, the interview was shallow and the frame didn't land.

### Outcome-vector discovery works *(exercise-specific — essential, new 2026-04-20)*

Does Phase 1's agentic chat surface a **third axis beyond speed and quality** — a non-obvious outcome vector (dependency removed, anxiety reduced, scope expanded, workload shifted)?

Checks:
- Prompt explicitly asks for three candidate vectors, including one "other" inferred from context.
- Prompt nudge available if only speed+quality returned: *"if speed and quality stayed exactly where they are, what else would your teammate want different?"*
- The chosen outcome statement is allowed to be the non-obvious vector (it often is), not forced to be speed or quality.
- Facilitator/Teacher Claude watch-for explicitly flags shallow-interview pattern (only speed+quality).

**Red flag:** every simulation or cohort returns only speed+quality outcomes; the teaching moment of the third axis is lost. The "other" vector is where interviewing-for-outcomes earns its keep and is the skill that transfers to Monday's adoption problems.

### Ask-questions tool lands as a new primitive *(exercise-specific — essential, new 2026-04-20)*

Does the ask-questions tool (Claude Code's `AskUserQuestion` or runtime equivalent) land as a **distinct interaction primitive** — bounded multiple-choice form, options drawn from the memory — rather than as a chatbot gimmick (Claude dumps a numbered list in chat and waits for freeform typing)?

Checks:
- Phase 1 prompt explicitly invokes the ask-questions tool by name.
- Prompt specifies 5–8 questions, each with 3–4 options drawn from what the agent found in the memory.
- Prompt explicitly rules out freeform typing ("Don't ask me to type freeform answers").
- Maintainer section flags the capability check — confirm the tool fires as a structured form in the student's runtime, not a chat dump.
- Self-study simulation verifies the bounded-form interaction felt different from normal chat (named as "a new move" by the student).

**Red flag:** Claude degrades to freeform Q&A in-chat. The primitive becomes invisible; the transferable skill ("use the ask-questions tool when interviewing yourself or a stakeholder fast") is lost. If the tool isn't available in the student's runtime, the exercise body must specify the bridge version (numbered options, one question at a time) — but the pedagogical payoff is lower.

### Framing fidelity

The exercise leads with the module's Big Idea: **You can't really share an agent. You can share context, a skill, the output, or an interface — and the choice is a strategy decision, not a deployment decision.** Under the JTBD frame, the strategy decision is specifically: *which candidate moves the outcome the teammate wants moved?*

It avoids these anti-framings:
- "Package your agent for others" / "share the whole agent" — vendor pitch; violates strategy.
- Sharing as a governance chore — steals the generous-impulse mood.
- Branch B (personal Claudes only) framed as a consolation prize or a limitation.
- Technical plan treated as primary, people plan as afterthought.
- **Builder-centered starting question** ("what should I share?") — should be teammate-centered ("what job are they hiring for?").
- Pattern selection treated as shopping (fits my infra) rather than design (moves the outcome).

### Learning goal fit

Enables these Bloom-tagged learning goals from the module file (verbatim, post-2026-04-20 update):
- **Interview** for the job your teammate is trying to get done — using an agentic Jobs-to-be-Done pattern, and write the outcome statement that becomes the design contract
- **Select** a sharing strategy from the four that work against the outcome the teammate wants moved — not against the infrastructure you happen to have
- **Redesign** for shared use by producing both a technical plan and a people plan — ownership, governance, operating, accountability, propagation
- **Test** the switch the teammate would have to make — surfacing what would have to be true for them to fire their current hire and use your candidate
- **Pre-mortem** the firing — imagining the six-month failure where they kept using the incumbent, biased toward the social failure you're not seeing

### Module-to-module arc

Picks up from **M6's unleashed leverage (eval loop that runs itself) — the student now has something that works well enough to want to share it.**
Keeps the adoption methods practical and student-facing: absorption bottleneck, switch assumptions, failure stories. Framework lineage stays in facilitator notes.

### Mood lands

Module's deliberate mood: **generous impulse** — *"This is starting to work. I wonder if others could benefit?"* Generosity as natural consequence, not obligation. Axis shifts from personal-mastery to team-ownership.

**Pass threshold: 8+/10 at every beat.** Failure modes to watch: governance-chore tone, Branch B as pity path, resolving the people-plan gap (it should remain open as Monday's work), technical-plan relief overriding the social absorption bottleneck before it lands, JTBD reframe reading as academic theory-drop rather than practical interview move.

### Teaching moment lands

The exercise is designed to reliably produce this aha:
- **"The agent already had 80% of the teammate's job on disk. Seven questions plugged the holes. The outcome I picked wasn't speed or quality — it was the third vector the interview surfaced. I can run this pattern on any adoption problem Monday."**

Supporting teaching moments:
- *"The absorption bottleneck is usually social — what would have to be true for them to fire their current hire?"*
- *"My candidate selection changed when I picked against the outcome instead of against the infra."*
- *"The people plan has UNASSIGNED lines because the Access-Trust Gap is real in my own work."*

If reasonable variation in participant skill can skip the primary aha (e.g., student rubber-stamps a generic JTBD hypothesis, picks a pattern because it's easy, finishes with a tidy deployment plan), the exercise is fragile.

### Red-flag triggers (additional checks for this exercise)

- (a) Does Phase 1 produce a JTBD brief that **surprised** the student, or does it just restate their assumptions?
- (b) Is the outcome statement in the module's stated form and does it anchor Phase 2's candidate selection?
- (c) Does the third outcome vector **surface** (non-obvious axis) or does the exercise only return speed+quality?
- (d) Is the people plan treated as equal throughout, or does it drift into afterthought?
- (e) Are both branches first-class, or is Branch B a consolation prize in the writing?
- (f) Is pattern selection driven by **outcome movement**, or by infrastructure fit (shopping, not design)?
- (g) Are the switch assumptions aimed at firing the incumbent or at generic sharing?
- (h) Is the closing a Monday **conversation** or a Monday deployment?
- (i) Is hardness honored (student MAY not finish) or does the exercise try to guarantee completion?

### Failure modes named

- Agent's Phase 1 hypothesis is generic / fabricated from file names → prompt requires anchoring to specific file+line; push: *"quote the sentence in my memory that made you think this."*
- Student rubber-stamps Phase 1 output → Teacher Claude/facilitator: *"pick one thing that's probably wrong. Ask the agent to try again on that piece."*
- Third outcome vector not surfaced → explicit nudge in prompt; facilitator follow-up: *"if speed and quality stayed flat, what else would your teammate want?"*
- Student picks pattern because it fits infra rather than because it moves the outcome → *"why would your teammate fire their current hire and use this? One sentence."*
- People plan stalls on names; student treats stall as failure → reframe: "UNASSIGNED lines are findings, not failures."
- Student runs out of time in Phase 4/5 → designed; verbal reframe before Phase 4.
- Ask-questions tool unavailable in a build → fallback: Claude asks structured numbered-option questions one at a time. Capability check sits in maintainer notes.
- Closing written as deployment ("I'll ship the Slack bot Monday") → push: *"Before deploying anything — what conversation are you having first?"*

### Time-boxed

~65 minutes (Phase 1: 12, Phase 2: 13, Phase 3: 18, Phase 4: 10, Phase 5: 7, close: 5). Fits 55–70 window. Some phases will run long — by design.

### Facilitator briefing complete

Watch-fors, decision points, plug points, capability check (ask-questions tool), and framework attributions all present in maintainer section. Branch-selection timing flagged. Phase 3 stall on people-plan names flagged. Ask-questions tool fallback named.

### Riffs on a recognized framework

- **Clayton Christensen — Jobs-to-be-Done** (*Competing Against Luck*). Opening frame.
- **Bob Moesta — switch interview.** Practitioner-style JTBD for small-team adoption decisions.
- **Anthony Ulwick — Outcome-Driven Innovation.** Outcome statement form and three-vector structure.
- **Roger Martin — strategy as assumptions** (*Playing to Win*). Phase 4, aimed at the switch.
- **Gary Klein / Kahneman — pre-mortem.** Phase 5 lineage; student-facing framing is failure stories.
- **Richard Rumelt — crux** (*Good Strategy Bad Strategy*). Phase 2.5 lineage; student-facing framing is absorption bottleneck.
- Supporting research: Access-Trust Gap (Pattern 47), absorption bottleneck (L4), discoverability (F-Secure).

Five-plus top-tier business frameworks, pedagogically central (each owns a move), best-in-class. JTBD is the recognizable hook that carries the rest.

### Scaffold / worked example provided

- Five copy-paste prompts (one per phase).
- Pattern catalog (`bosser-strategy:personal-to-team-patterns.md`) as reference — WIP with `[TODO]` placeholders on many examples; framed explicitly as "prompt to invent for your situation" in the exercise body.
- Four sharing strategies listed inline in Phase 2 as memory aid.
- Outcome statement template given in plain form.
- Prior modules have built memory/skills/artifacts; no new artifact type is produced from thin air.
- Ask-questions tool: the prompt names the student-facing behavior explicitly (bounded multiple-choice, no freeform typing). Fallback named in maintainer notes.

### Prompt design

- Five prompts. No `[BRACKET]` placeholders mid-prompt. Phase 1 uses the ask-questions tool (bounded options the student picks). Phases 3/4/5 use conversation-after pattern ("ask me anything you need", "show me before saving").
- Each under one page. Paragraph structure clean.

### Plug points real

- Phase 1: student's real teammate, real memory content, real job.
- Phase 2: real buyer infrastructure (Branch A / B).
- Phase 3: named person from their org for ownership, governance, operating.
- Phase 5: the failure story anchored to their specific situation.

### Voice / Business-audience language

- Second person throughout. No facilitator instructions in body (all in maintainer).
- No banned jargon. "Runtime" and "connector" appear — earned via M4/M6. JTBD / outcome statement earned inline with plain explanation.
- Seth/Rory/Risto flavor present: *"A candidate picked because it fits the infrastructure is shopping. A candidate picked because it moves the outcome is design."* / *"The third story is the one to read twice."*
- No LLM-tell words (honest, delve, landscape, importantly, crucial) — checked.

### Length

~1500 words student-facing body. Above 400–700 target — the five-phase JTBD-grounded structure earns the extra length (contributory TODO, not essential fail). Worth a tightening pass if cadence suffers.

### Specificity

Named files (`module-7/jtbd.md`, `module-7/branch.md`, `module-7/absorption-bottleneck.md`, `module-7/technical-plan.md`, `module-7/people-plan.md`, `module-7/assumptions.md`, `module-7/failure-stories.md`, `module-7/monday.md`), named patterns, realistic examples of outcome statements, concrete third-vector categories. Strategy lineage is mostly maintainer-facing; student-facing body uses the methods without foregrounding the names.

---

## Notes for PDCA Act step

**TODOs (from 2026-04-20 eval pass, JTBD reframe):**
- (Contributory) Length sits above the 400–700 target. JTBD opening frame + five phases earn the space, but a tightening pass could compress Phase 2's sharing-shape reminder and the closing payoff paragraph.
- (Contributory) Consider an inline mini-example of a filled outcome statement (current example *"minimize the time it takes to draft a customer-facing briefing that I'd stake my reputation on"* is good — could add one more in the non-speed/quality bucket to prime the third vector explicitly).
- (Watch) Ask-questions tool availability varies by Claude Code build; maintainer fallback is named but the student-facing prompt assumes the tool exists. If cohorts land on builds without it, fold the fallback into the student-facing text.

See simulation report for top 3 fixes and ambiguities surfaced.
