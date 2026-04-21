# Module Design — Long-Running Generation Strategy

Eat our own dog food. The M3/M4 long-running pattern from the *Agentic Engineering 101* training — *send off a mid-long task, close the laptop, return, process, sharpen* — is also how Antti and I should work on generating full lectures and exercises. This document is the strategy plus the compound loop that makes it sharper each session.

**This file compounds. Every long-running generation session closes with a Compound step that rewrites the rules below. If that step is skipped, the strategy stops learning.**

## Why this exists

**Strategy-session cadence** (the session that produced this file): Antti types a design move, I capture it, we iterate in small turns. That pattern can't produce a full lecture or exercise in one sitting without burning Antti's time across dozens of turns.

**Long-running-session cadence** (what we're moving toward): Antti pins a plan, I generate end-to-end while he's elsewhere, he comes back to review a 70%-there draft + a simulation report + my own self-eval. He reshapes 30–40% (the normal ratio for article drafts). Same pattern the training teaches students about handing off multi-hour agent work — we apply it to the work of making the training itself.

*Rory: the training's meta-pattern becomes the work pattern. The course material about long-running work is produced by long-running work. The filter for whether we understand the pattern is whether we can run it on ourselves.*

## The three-pattern (ported from M3/M4)

Same substrate that makes agent walk-aways work, applied to me generating curriculum.

### 1. Reference artifact

Must be populated BEFORE the session starts. If the reference artifact is thin, the session isn't long-running — it's a strategy session.

Required:
- The module's Pass 1 row in the relevant content-strategy doc (`curriculum/content-strategy-*.md`)
- The module's "in detail" section if written
- The peer Bootstrap lecture or exercise, if porting or riffing on one (`curriculum/lectures/` or `curriculum/exercises/`)
- The eval template that will be used as the verifier (`curriculum/evals/lecture.md` or `curriculum/evals/exercise.md`)

### 2. Plan.md (the up-front plan)

A short plan from me, approved in 2 minutes of plan-mode-style review before generation starts. Required elements — if any is missing, the plan isn't ready:

- **Big idea** of the lecture/exercise — one sentence
- **Strategic beat** — the specific teaching moment that must land. *If I can't state it in one sentence, I'm not ready to generate. Delay the generate step.*
- **Module mood** the content must honour (from the strategy doc's mood contract)
- **Arc** — phases / beats / subsections
- **Length band** (per Bootstrap 1h45 target, or relevant variant)
- **Practitioners to weave in** — per the curation principle, specific named sources (Klaassen, Huryn, Ronacher, Willison, Cherny, etc.)
- **Vision-detail split explicit.** Name which claims in the piece are vision-layer (Antti's framing, don't need KB backing) vs. detail-layer (practitioner claims, must have KB backing). Every detail-layer claim comes with a source file or URL on the plan. See `memory/project_vision_times_detail.md`.
- **Research-backing check.** For every detail-layer claim in the plan, point at a specific file in `continuous-research/` or a practitioner-direct URL. If the claim is unsourced, either run an OODA before generating, drop the claim, or move it to vision-layer and label as framing.
- **Banned-word scan committed** — I will grep for `honest`, `delve`, `landscape` (verb), `importantly`, `crucial` before handoff
- **Self-eval committed** — I will run the relevant eval template on my own draft (including the "Research-backed claims" judge)
- **Simulation committed** — I will dispatch the simulation protocol with a student persona as a SEPARATE agent (not me reviewing my own work)

Antti approves, reshapes, or redirects the plan. **Once approved, no re-opening.** I execute.

### 3. External verifier

Two verifiers run on close, before handoff:

1. **Eval template** (`curriculum/evals/lecture.md` or `curriculum/evals/exercise.md`) filled in as an instance at `curriculum/evals/instances/<training>--<module-slug>.md`
2. **Simulation** — launch a separate general-purpose agent with a student persona, run through the artifact end-to-end, report breakage. Protocol lives in `.claude/skills/content-creation/SKILL.md` § "Simulation protocol."

Both results ship alongside the draft.

## The session shape

1. **Open** (2 turns, ~5 min): I produce the plan. Antti approves / redirects / reshapes. No third turn of back-and-forth — the plan lands or we aren't ready.
2. **Work** (long-running, 15–45 min wall clock): Generate the full lecture/exercise. Generate the filled eval instance. Dispatch the simulation agent in parallel. Antti is elsewhere.
3. **Return** (1 turn): Antti reads three things, in order — the artifact itself, my self-eval verdict, the simulation breakage list.
4. **Reshape** (variable turns): Antti reshapes the 30–40% that missed. I apply without re-opening the strategic beat.
5. **Compound** (1 turn, before commit): rewrite the rules in this file per the Compound section below.

## Failure modes to pre-empt

From the long-running OODA (2026-04-21) — applied to me, not to the student's agent.

- **Plausible-but-wrong is the biggest risk.** I produce a clean lecture that checks every structural box but misses the strategic beat. Mitigation: the plan's strategic beat must be explicit BEFORE generation. Ungenerable-without-it.
- **Argue-loops.** I want to re-open plan questions mid-generation or propose options when the plan is settled. Mitigation: plan-approved means plan-locked. Execute.
- **Context rot.** Long generation drifts from the module mood. Mitigation: the mood contract is explicit on the plan; re-check at 50% draft and at close.
- **Rubber-stamp by me on my own draft.** My self-eval tends to run charitably. Mitigation: the simulation runs as a SEPARATE agent with a student persona, not as a pass I do on my own work.
- **Drift to file creation when asked to generate content.** If the target file doesn't exist yet, ask before creating. Don't chain create-then-generate without explicit go.
- **Banned-word leakage at generation time.** (Recurring pattern per self-review-protocol.) Mitigation: pre-ship grep for the banned list. Zero banned words in shipped prose.
- **Over-stylized register for student-facing content.** Rory phrase-pairs belong internally; student-facing prose uses concrete direct language. Mitigation: voice check against `.claude/skills/content-creation/SKILL.md` § "Voice and style."

## How this file compounds

This file applies its own governing rule — **compounding is the side-product of smart process, not a separate goal.**

**Every long-running generation session closes with a Compound step.** After Antti's reshape pass, before commit, I:

1. Read the plan, the final artifact, the reshape diff (what Antti changed from my draft)
2. Identify: what in the plan was wrong? What in my draft missed? What in the eval template didn't catch what Antti caught?
3. **Rewrite** the "Rules the file has learned" section at the bottom — integrate, don't append, per the M2+ Debrief pattern
4. **Rewrite** the "Failure modes to pre-empt" section if new modes surfaced
5. **Append** one entry to the run history with what the session taught — one line per session, date + module + the single biggest lesson

If this Compound step is skipped, the strategy stops learning. This file becomes stale the moment the loop breaks.

## Context for a fresh session picking this up

This file is designed to be read by a future session agent (possibly me with no prior context). Key anchors:

- **Project root:** `/Users/anttitevanlinna/Projects/agents-102/`
- **Governing rule** (the rule behind this file): `curriculum/content-strategy-agentic-engineering-101.md` § "The rule that governs everything" — *"the learning and good process happen as side-product of making good stuff. Only that scales."*
- **M3/M4 pattern** this file ports from: same strategy doc, §§ "M3 in detail — the send-off" and "M4 in detail — the return"
- **Banned-word rule:** `memory/feedback_llm_tell_words.md`
- **Simulation protocol:** `.claude/skills/content-creation/SKILL.md` § "Simulation protocol"
- **Eval templates:** `curriculum/evals/lecture.md`, `curriculum/evals/exercise.md`
- **Hold-OODA-loose rule:** `memory/feedback_hold_ooda_loose.md` — short scans are not decisions
- **Never-downplay-students rule:** `memory/feedback_never_downplay_students.md`
- **Sales-register rule:** `memory/feedback_sales_register_not_rory.md`

## Rules the file has learned

*(Rewritten at each session close. Integrate-don't-append.)*

**Seed rules — carried in from the 2026-04-21 strategy conversation that produced this file:**

- The plan's **strategic beat** is load-bearing. If I can't state the specific teaching moment in one sentence, I'm not ready to generate. Ungenerable-without-it.
- The simulation runs as a **separate agent** with a student persona, not me reviewing my own work. Charitable self-review is a known failure mode.
- **Banned-word post-pass** before handoff: grep for `honest`, `delve`, `landscape` (verb), `importantly`, `crucial`. Zero tolerance at ship time.
- **Plan-approved means plan-locked.** After Antti approves the plan, no re-opening. Execute.
- **Mood re-check** at 50% draft and at close. Context drift is real on long generations.
- **"Prepare" ≠ "generate" ≠ "create new file."** Each verb has a distinct scope. When in doubt, ask before creating.
- **Voice: Seth × Rory × Risto** for student-facing prose. Concrete, direct, warm, with counter-intuitive reframes and epistemic directness. Stylized phrase-pairs are internal-only.

## Run history

*(One entry per long-running generation session. Append.)*

*(No entries yet — file created 2026-04-21 from strategy conversation. First long-running generation run TBD.)*
