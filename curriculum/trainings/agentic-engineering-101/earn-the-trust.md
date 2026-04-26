# Earn the trust

## Big Idea
Before the agent runs bigger work alone, earn your staff engineer's and CISO's trust on a small piece you're shipping this week. Two curated skills from the frontier do the security work, one skill you author through conversation with Claude does the quality work. Team kit accretion starts here: the skill you author this hour ships personal first, with a clear path to team promotion through a human conversation later.

## Meta
- **Primary Bloom's level:** Apply + Evaluate + Create (invoke, decide, author)
- **Prework:** bring a small feature you're working on right now (see Connections for the size rule). No pre-written files; the feature lives in your repo.
- **Homework:** none. The authored skill ships at M3's close.
- **Materials (trainer):** content folder ships two curated skills (`access-control-analysis/SKILL.md`, `stride/SKILL.md`) under `content/skills/`. Prework installs them as personal skills at `~/.claude/skills/<name>/SKILL.md` via an agentic step (Claude does the copy). Students invoke by name, no path. Removable after training with one `rm -rf`.
## What You'll Learn
After this module, you will be able to:
- **Invoke** a curated access-control analysis skill on a feature you're shipping (as a subagent, fresh context). Read what it surfaces, name what a first-read missed
- **Apply** a curated STRIDE skill to the mapped surface (again as a subagent), pick one threat worth hardening against, write the decision as an ADR in your repo's convention
- **Discriminate** when a job belongs in a subagent (breadth-first curated skills, long structured output) versus the main thread (one-question-at-a-time authoring, interactive steering)
- **Author** a test-strategy skill through conversation with Claude (one question at a time) tuned to your codebase's actual testing conventions, not a generic pyramid
- **Evaluate** the authored skill by asking it to disclose its own weakest part, then pushing back on the critique
- **Invoke** the authored skill on the security-tested feature and ask Claude whether the test strategy is any good
- **Ship** one authored skill personal-first, and know when it's a team PR

## Connections

**Bring a small feature you're working on right now.** Not a typo-fix, not a quarter-long epic; something with an external or user-facing surface that you could ship in a few hours. Too small and the agent crunches it in thirty seconds with nothing interesting to surface. Too large and you're still waiting when the bell rings. You've watched the agent work for two modules. Pick the size that fits the rhythm you've seen.

The question, to you: what's the feature, and what's the surface you're most nervous about a teammate missing in review? Write one line. The room's features will differ wildly; that's the point.

[Lecture: Skills from the frontier, skills of your own](lectures/skills-from-the-frontier.md)

[Exercise: Map the access surface](exercises/map-the-access-surface.md)

[Exercise: Threat-model with STRIDE](exercises/threat-model-with-stride.md)

[Exercise: Author your test-strategy skill](exercises/author-test-strategy-skill.md)

## Key Concepts (Emergent)
- A curated skill is upstream practice packaged for you to invoke. You don't re-derive it
- The access surface is what STRIDE chews on. STRIDE before access-mapping is threat-modeling pub-quiz
- One hardening decision is enough; breadth is the team kit's job across many students, not yours in 20 minutes
- A test-strategy skill authored on your codebase is worth more than a perfect generic one. The skill carries your conventions, not a textbook's
- Ask the agent what's weakest about its own output; the mirror reflects what your own read would miss
- Invoke the skill on the thing you just built. Authoring without invocation is theatre
- One skill shipped beats three skills drafted; the team kit grows by accretion

**Self-aware / grain of salt (Theme 4):** Ex3's move is to ask the authored skill to disclose its own weakest part, then push back on the critique; the skill introspects, you verify against the session artifact.

**Mirror (Theme 3):** the access-control and STRIDE skills produce a structured read of your feature's access surface. Comparing your first read to theirs is the thing you name aloud.

**90% correct (Theme 1):** curated skills from the frontier are strong, not oracular; the hardening decision in Ex2 and the weak-spot push-back in Ex3 are where the last 10% earns your judgement rather than a rubber stamp.

## Sharpen the skill from evidence

M3's compound lives in the skill you authored, not in the rules-file. Skills are the surface that just got tested under push-back; that's where today's evidence wants to land. The rules-file move sits this one out.

Ask Claude to sharpen the one section of your authored test-strategy skill that session evidence underdelivered.

**Prompt** *(Claude Code)*

```
Read the test-strategy SKILL.md I authored earlier. Read this scrollback: the access-control output, the STRIDE decision and ADR, the moment I invoked the skill on the security-tested feature, the place I pushed back. Find the one section of the skill where session evidence shows it underdelivered (a convention I named in conversation that isn't encoded, a codebase-specific failure mode the skill missed, an assumption I had to correct mid-invocation). Rewrite that section in place. Do not append a critique addendum. Show me before and after, two or three lines each.
```

## Bridge

You earned the first two signatures. Your staff engineer sees a test-strategy skill tuned to this codebase, your CISO sees a STRIDE decision with an ADR. M4 turns the discipline inward: memory that reads your system, not just a feature. The quality criteria you named today become Block 3 of the three-block memory; the access-surface facts become Block 1 observations; the hardening decision is a Block 2 entry already.

## Pre-reads before M3

Optional. Skipping either piece does not break M3. The point is to land STRIDE and access-control inside the wider modern agentic-security picture rather than as a substitute for it.

**Read:** Simon Willison, [The lethal trifecta for AI agents](https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/) (~10–15 min). Names the modern threat class that combines private data, untrusted content, and external communication into a compromise surface. Why for M3: gives you the modern agentic-security frame before you run the STRIDE and access-control exercises, so classic AppSec sits inside a wider picture rather than standing alone.

**Optional deeper scan:** [OWASP Top 10 for LLM Applications](https://owasp.org/www-project-top-10-for-large-language-model-applications/) (~20 min). Broader checklist covering prompt injection, insecure output handling, data leakage, and the rest of the surface. Why for M3: the full menu beyond the trifecta, for engineers who want the wider picture before the exercise lands.

<!-- maintainer -->


**Quality:** approve-with-todos 2026-04-25 (check_writing — `practice`-as-noun line 36 to fix; check_student_facing #21; check_pedagogy progression-with-variations; check_prompts; check_strategy_tie_in; check_lectures)
**Meta (trainer):**
- **Primary Bloom's level:** Apply + Evaluate + Create
- **Session runtime:** 1h45 (Connections 10 / Lecture 12 / Exercises 20+20+28 / Debrief 12 / Bridge 3 + buffer). Trainer demos slowly, room copy-pastes concurrently — fits 1h45 in-class. Self-study follow-along runs comparably.
- **Mood target:** earned trust — *"the way I work with agents is something my staff engineer and my CISO can sign off on, before I even try anything big."* Watch for: mood drift toward compliance-feeling. Diagnostic: student at Ex2 frames STRIDE as checkbox. Fix: Nerd surfaces the ADR — *"you just made a real architectural call under named pressure; that's not compliance, that's design."*
- **Delivery architecture** (strategy doc §"Delivery architecture"): content folder holds the two curated skills; all compounding artifacts (ADR, authored skill, `CLAUDE.local.md` update) live in the student's real repo; team-worthy rules get flagged for separate PR against team `CLAUDE.md`; authored skill ships personal-first to `~/.claude/skills/test-strategy/SKILL.md`, with sponsor-stated team-kit home as the eventual destination via human conversation (not an auto-PR). No training-dir state. See `reference/claude-code-for-engineers.md § 1` for the four-layer hierarchy.
- **Quality:** sim-passed 2026-04-25 (check_writing v2026-04-25 voice-quartet, check_student_facing v2026-04-25 agent-vocab + #21 sharpened, check_pedagogy v2026-04-25 progression-with-variations, check_prompts; three-persona sim 2026-04-25 — Debrief redesign)

**Push-back moves** (trainer delivers by default; Nerd in self-study):
- **Connections blocker** — student can't pick a feature. Nerd runs three-candidate conversation with the feature-size rule; pushes against "too large" (the default failure mode — engineers over-estimate scope).
- **Ex1 passivity** — student reads access-control output and moves on without deciding. Nerd: *"which surface did it flag that you'd underweighted? which did it miss that you know matters? name one of each."*
- **Ex2 menu-shopping** — student picks a STRIDE threat because it's easiest, not because it's real. Nerd: *"name the worst thing this feature could do. The threat worth hardening is usually adjacent to that answer."*
- **Ex2 missing ADR** — student decides but doesn't write. Nerd: *"write the decision before you forget why. One paragraph, alternatives considered, the constraint you picked."*
- **Ex3 question-dump** — Claude dumps all five authoring questions at once. Nerd reminds student to push back: *"one at a time — answer this one, ask the next."*
- **Ex3 default-acceptance on first SKILL.md** — student ships Claude's first draft. Nerd runs the self-critique move: *"ask the skill to disclose its weakest part before you ship."*
- **Ex3 invocation skip** — student ships without invoking on the feature. Nerd: *"before team kit, run the skill on the feature you just security-tested. Ask Claude — is the test strategy any good?"*
- **Debrief generic rule** — Claude writes "always use curated skills" or similar boilerplate. Nerd: *"name a branch, not a rule — what specifically about THIS codebase did today's session surface?"*

**Watch-fors (cross-phase):**
- Feature sprawl — student brings the whole epic. Cap at Connections; redirect to a sliceable sub-part.
- Curated-skill reverence — student treats the STRIDE skill as oracle. Remind: the skill is good; the decision is yours.
- Team-kit home unresolved — if the sponsor answered "we don't have one" on the pre-engagement contract, the training-start default (shared Git repo) should already be live by M3. Verify before Ex3's ship step.
- Skill-authoring-by-typing — student opens an editor to hand-write SKILL.md. Redirect to conversation: the authoring move is prompting Claude, pushing back, not keyboard-crafting markdown.

**Decision points:**
- **Ex1 runs long (>25 min):** access-control skill is finding a lot — let it, compress Ex2's decision beat to 15 min by making the Nerd name the worst case more aggressively.
- **Ex2 runs long (>25 min):** STRIDE surfacing multiple real threats. Pick the hardening that will inform Ex3's test strategy (they wire together). Compress Ex3's conversation phase, not the invocation-and-self-critique.
- **Ex3 finishes under 20 min:** student accepted defaults. Run the self-critique move as a rescue — *"ask the skill what's weakest; push back; re-invoke."* Turn the default-acceptance into the teaching moment.
- **Whole room mood below 7:** earned-trust isn't landing. Check: did the hardening decision in Ex2 feel real (a call the student would defend) or theatrical (a menu pick)? Did the test-strategy skill's invocation surface codebase-specific things (real) or generic pyramid wisdom (theatrical)? If theatrical, the feature was probably too small.

**Plug points (trainer):**
- Student's own feature (surfaced in Connections)
- Sponsor-stated ADR home (Ex2)
- Sponsor-stated team-kit home (Ex3 ship step)
- Push-back moves at each rubber-stamp risk (trainer covers by default; Nerd covers when enabled)

**Frameworks riffed on (attributed in lecture):**
- **STRIDE** — Loren Kohnfelder & Praerit Garg (1999 Microsoft memo), sharpened by Adam Shostack (*Threat Modeling: Designing for Security*, 2014). Curated skill ships in `content/skills/stride/`.
- **Access control analysis** — composite move; anchor attribution Saltzer & Schroeder's 1975 least-privilege principle + Microsoft's threat-modeling adjacency. Curated skill ships in `content/skills/access-control-analysis/`.
- **Test strategy as discipline** — Kent Beck + James Bach's exploratory-testing lineage + Google Testing Blog's test-pyramid framing. Named at lecture; the student's authored skill is theirs, not a framework import.
- **Compound engineering** — Kieran Klaassen. M3's Compound step is *ship to team kit*; the fourth step of the loop is visible here, as in M1.
- **Skills as first-class Claude Code primitive** — the authoring move uses conversation, not manual markdown — matches M1's `CLAUDE.local.md` pattern (Claude writes from session evidence; student pushes back).

**Open questions for later passes:**
- ADR convention if the sponsor repo has none — training default `docs/adr/0001-slug.md` (context / decision / consequences)?
- Team-kit home spin-up if the sponsor answered "we don't have one" — Ops-side, before Day 1.

**Open items from pre-ship audit:**

- **First-cohort watch-for: relocated team-worthy flag stays codebase-grounded.** Live runtime check during first cohort; trainer watches that the team-worthy decision stays codebase-specific (not "yes, every team should know about STRIDE" generic).
- **Self-study Nerd nudge: team-worthy flagging anxiety at end-of-session** (Maija sim, mid-competent persona). Belongs in the self-study Nerd skill, out of cohort scope. Carried to the self-study workstream.

Audit artifacts at `analytics/ae101-readiness-audit/preship-m3-debrief/`.
