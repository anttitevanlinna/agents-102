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

A short plan from me, approved in 2 minutes of plan-mode-style review before generation starts. **Pre-flight precedes the plan.** Before drafting the plan block, confirm the `MEMORY.md` PRE-FLIGHT checklist ran — self-review-protocol Next-session-predictions read, relevant `feedback_*` memories grepped, delivery architecture pinned for the training. The plan block should name the pre-flight as done; if any item couldn't run, name it and pause. Running the plan without pre-flight is how prior-session corrections leak back in.

Required elements in the plan itself — if any is missing, the plan isn't ready:

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
- **Pre-flight executed** — MEMORY.md PRE-FLIGHT block run; self-review-protocol predictions read; delivery architecture pinned for this training (cite the architecture section of the strategy doc). One line of evidence per item.

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
6. **Cross-surface corrections → `/compound`.** Any correction from the reshape diff that applies BEYOND the long-running strategy itself — writing-surface leaks (banned words, register errors), sales_copy leaks, student_facing mood violations, research claim issues, strategy-doc divergence — gets promoted via the `/compound` skill. That writes a schema-validated entry in `memory/compounded/` and (for content/pedagogy/sales surfaces) proposes a one-line amendment to the matching `memory/check_*.md` compendium. *Rule of thumb:* if the correction would apply to a non-long-running session too, it belongs in `/compound`, not just in this file.

If this Compound step (especially #6) is skipped, the strategy stops learning AND cross-surface corrections don't propagate. This file becomes stale the moment the loop breaks.

## Context for a fresh session picking this up

- **Project root:** `/Users/anttitevanlinna/Projects/agents-102/`
- **Governing rule** (behind this file): `curriculum/content-strategy-agentic-engineering-101.md` § "The rule that governs everything"
- **M5/M6 pattern** this file ports from: same strategy doc, §§ "M5 in detail — long-running tasks, send-off" and "M6 in detail — long-running tasks, return"
- **Eval templates:** `curriculum/evals/lecture.md`, `curriculum/evals/exercise.md`
- Session rules — banned-word, hold-OODA-loose, never-downplay-students, sales-register — are already loaded via MEMORY.md PRE-FLIGHT; don't re-grep here

## Rules the file has learned

*(Rewritten at each session close. Integrate-don't-append.)*

- **Strategic beat is load-bearing.** If I can't state the specific teaching moment in one sentence, I'm not ready to generate. Ungenerable-without-it.
- **Pin the delivery architecture BEFORE generating any student-facing file.** Where do artifacts live? What ships as files vs. gets generated in conversation? Bootstrap's separate-training-dir assumption does NOT apply to AE101 (compounding in the student's real repo). Every prompt leaks the assumption — it cannot be retrofitted cleanly.
- **Plan-approved means plan-locked.** After Antti approves, no re-opening. Execute.
- **Simulation runs as a separate agent** with a student persona — not me reviewing my own work. Charitable self-review is a known failure mode. Run sim + LLM-judge in parallel on handoff.
- **Mood re-check** at 50% draft and at close. Context drift is real on long generations. And **don't smuggle another module's voice** — M1 is joyful-creation (*"it works, on my repo"*), not M5 long-running (*"close the laptop"*). When reaching for a pattern that lives in another module, ask whether it belongs *here*.
- **Don't pre-fabricate state the student could generate in conversation.** Sibling rule to *ask-the-agent-don't-type-in-a-terminal*. The first move of an agentic training cannot be file-ceremony.
- **Banned-word post-pass** before handoff: grep `honest`, `delve`, `landscape` (verb), `importantly`, `crucial`, plus hard-ban `ritual`, `practice` (noun), `ceremony`. Zero tolerance at ship time.
- **Voice: Seth × Rory × Risto** for student-facing prose. Concrete, direct, warm, counter-intuitive reframes, epistemic directness. Stylized phrase-pairs are internal-only.
- **"Prepare" ≠ "generate" ≠ "create new file."** Distinct scopes. When in doubt, ask before creating.
- **Research-backing is load-bearing even for familiar names.** Verify name + URL + freshness even for cited practitioners — especially when the source is prior memory (Huryn's first name was wrong in MEMORY.md; caught by the plan-time grep).
- **Include-link paths use bare `lectures/<slug>.md` / `exercises/<slug>.md`** — renderer resolves from curriculum root regardless of training dir. Don't improvise.
- **Q1/Q2/Q3 retro interview is forbidden — every module, every training.** Debriefs always self-compound: Claude reviews evidence → rewrites rules file in place → reports 3–5 lines → student pushes back on the summary. Shape is *review → rewrite → report*, not *ask three questions → propose paste*.

## Run history

*(One entry per long-running generation session. Append.)*

- **2026-04-21 — AE101 M1 dependencies (ship-with-agents + prework + exercise Pass 3 + wizard-move lecture + eval instance + site registration + strategy-doc updates).** First long-running-gen cycle. Single biggest lesson: **pin the delivery architecture before generating any student-facing file.** The initial draft assumed a Bootstrap-shape training-dir (`module-1/decision.md`, `prework/bug.md`); Antti's reshape replaced that with "compounding artifacts in the student's real repo, curriculum content unzipped next to it." Every prompt referencing a location had to be rewritten. Artifact-location assumptions leak into prose and cannot be retrofitted cleanly — they're architectural. Secondary lessons: don't pre-fabricate state the student could generate in conversation; don't smuggle one module's voice into another; verify practitioner names + URLs even when citing from prior memory; include-link paths are bare-slug only.
