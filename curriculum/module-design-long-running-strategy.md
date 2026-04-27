# Module Design — Long-Running Generation Strategy

**This file = long-running-mode runbook (plan → walk-away → return).** Mode-specific. Use when Antti wants a full lecture or exercise generated end-to-end rather than iterated turn-by-turn.

- Generation-time rules fire from `memory/check_*.md`.
- Architecture lives in `curriculum/CLAUDE.md`.
- Per-turn PDCA lives in `.claude/skills/content-creation/SKILL.md`.
- Compounded atomic learnings live in `memory/compounded/`.
- *"Rules the file has learned"* below = ONLY long-running-mode rules. Cross-surface rules go to `/compound`, not here.

Eat our own dog food. The M4–M6 long-running pattern from the *Agentic Engineering 101* training — *send off a mid-long task, close the laptop, return, process, sharpen* — is also how Antti and I should work on generating full lectures and exercises.

## Why this exists

**Strategy-session cadence:** Antti types a design move, I capture it, we iterate in small turns. Can't produce a full lecture in one sitting without burning Antti's time.

**Long-running-session cadence:** Antti pins a plan, I generate end-to-end while he's elsewhere, he comes back to a 70%-there draft + a simulation report + my self-eval. He reshapes 30–40%. Same pattern the training teaches students about handing off multi-hour agent work — applied to the work of making the training itself.

*Rory: the training's meta-pattern becomes the work pattern. The filter for whether we understand the pattern is whether we can run it on ourselves.*

## 1. Reference artifact

Must be populated BEFORE the session starts. If thin, the session isn't long-running — it's a strategy session.

Required:
- The module's Pass 1 row in the relevant content-strategy doc (`curriculum/content-strategy-*.md`)
- The module's "in detail" section if written
- The peer Bootstrap lecture or exercise, if porting (`curriculum/lectures/` or `curriculum/exercises/`)
- The eval template that will be used as the verifier (`curriculum/evals/lecture.md` or `curriculum/evals/exercise.md`)
- **Frame to land** section — verbatim user-provided framings (3–7 word blunt sentences, named thesis, quoted lines from Antti's planning messages) captured as direct quotes. NOT paraphrased. Cite-and-compare source at ship time. Paraphrasing drifts.
- **Done-means criterion** — explicit list of what "done" includes. **MUST name the `curriculum-pre-ship-audit` skill invocation as a blocking gate**, not deferred as *"pre-first-cohort TODO."* Per-cohort freshness re-checks are legitimate pre-cohort TODOs. First-pass sim + eval + source-verify + capability-check are not.

## 2. Plan.md — Required elements

**The plan is a snapshot, not a forecast.** It captures the session's understanding at dispatch. The actual shape will differ — user nudges, reversals, discoveries reshape it. Don't let the plan's tidiness paper over the five-nudge, two-reversal reality.

A short plan, approved in 2 minutes of plan-mode-style review before generation starts. Required elements — if any is missing, the plan isn't ready:

- **Big idea** — one sentence
- **Strategic beat** — the specific teaching moment that must land. *If I can't state it in one sentence, I'm not ready to generate.*
- **Module mood** the content must honour (from the strategy doc's mood contract)
- **Arc** — phases / beats / subsections
- **Length band** (per Bootstrap 1h45 target, or relevant variant)
- **Practitioners to weave in** — specific named sources
- **Vision-detail split explicit.** Name which claims are vision-layer (Antti's framing, no KB backing needed) vs. detail-layer (practitioner claims, must have KB backing). See `memory/project_vision_times_detail.md`.
- **Research-backing check.** Every detail-layer claim points at a specific file in `continuous-research/` or a practitioner-direct URL. If unsourced: run an OODA, drop it, or move to vision-layer.
- **Banned-word scan committed** — grep before handoff
- **Self-eval committed** — run the relevant eval template on my own draft
- **Simulation committed** — dispatch the simulation protocol with a student persona as a SEPARATE agent
- **Pre-flight executed** — delivery architecture pinned for this training (cite the architecture section)

Antti approves, reshapes, or redirects. **Once approved, no re-opening.** I execute.

## 3. External verifier

**The `curriculum-pre-ship-audit` skill is the composite verifier.** Invoke by name at end of generation cycle against the file list. It dispatches four parallel checks:

1. **Three-persona sim** (mid-competent / opinionated senior / fast operator)
2. **LLM-as-judge eval** per `curriculum/evals/lecture.md` or `curriculum/evals/exercise.md` template
3. **Source verification** — every numeric claim, practitioner attribution, quote checked against `continuous-research/observations/` or primary source
4. **Claude Code capability check** via the `claude-code-guide` agent

Any REVISE blocks "done." Approve-with-todos acceptable when TODOs land in maintainer blocks.

**`/loop` stop-condition is augmented.** Two clean passes on grep + verifier is necessary but not sufficient. The `curriculum-pre-ship-audit` skill must also return GO before `/loop` declares done.

## The session shape

1. **Open** (2 turns, ~5 min): I produce the plan. Antti approves / redirects / reshapes. No third turn — the plan lands or we aren't ready.
2. **Work** (long-running, 15–45 min wall clock): Generate full lecture/exercise. Generate filled eval instance. Dispatch simulation agent in parallel. Antti is elsewhere.
3. **Return** (1 turn): Antti reads three things in order — the artifact, my self-eval verdict, the simulation breakage list.
4. **Reshape** (variable turns): Antti reshapes the 30–40% that missed. I apply without re-opening the strategic beat.
5. **Compound** (1 turn, before commit): rewrite the rules per the Compound section below.

## Failure modes to pre-empt

- **Plausible-but-wrong is the biggest risk.** I produce a clean lecture that checks every structural box but misses the strategic beat. Mitigation: strategic beat explicit BEFORE generation. Ungenerable-without-it.
- **Argue-loops.** I want to re-open plan questions mid-generation. Mitigation: plan-approved means plan-locked. Execute.
- **Context rot.** Long generation drifts from the module mood. Mitigation: mood contract explicit on the plan.
- **Rubber-stamp self-eval.** My self-eval runs charitably. Mitigation: simulation runs as a SEPARATE agent with a student persona.
- **Drift to file creation when asked to generate content.** If the target file doesn't exist yet, ask before creating. Don't chain create-then-generate without explicit go.

## How this file compounds

**Every long-running generation session closes with a Compound step.** After Antti's reshape pass, before commit:

1. Read the plan, the final artifact, the reshape diff (what Antti changed from my draft)
2. Identify: what in the plan was wrong? What in my draft missed? What in the eval template didn't catch what Antti caught?
3. **Rewrite** the "Rules the file has learned" section — integrate, don't append
4. **Rewrite** the "Failure modes to pre-empt" section if new modes surfaced
5. **Append** one entry to the run history — date + module + the single biggest lesson
6. **Cross-surface corrections → `/compound`.** Any correction that applies BEYOND long-running strategy itself — writing-surface leaks, sales_copy leaks, student_facing mood violations, research claim issues, strategy-doc divergence — gets promoted via the `/compound` skill, which writes a schema-validated entry in `memory/compounded/` and proposes a one-line amendment to the matching `memory/check_*.md` compendium. *Rule of thumb:* if it would apply to a non-long-running session too, it belongs in `/compound`, not here.

## Rules the file has learned

Long-running-mode-specific only. Cross-surface rules live in `memory/compounded/` and the `check_*.md` compendiums.

- **Pin the delivery architecture BEFORE generating any student-facing file.** Where do artifacts live? What ships as files vs. gets generated in conversation? Bootstrap's separate-training-dir assumption does NOT apply to AE101 (compounding in the student's real repo). Every prompt leaks the assumption — it cannot be retrofitted cleanly.
- **Plan-locked applies to execution, not strategic shape.** Antti may reshape the strategic frame post-approval without violating "plan-approved means plan-locked" — that rule is about not-re-opening during execution, not about not-redirecting strategy. Distinguish strategic items (Antti may redirect) from executional items (I carry through) in the plan template.
- **LLM-judge is procedural compliance; persona sim is the authoritative mood signal.** When verdicts disagree, trust the personas. LLM-judge catches rule violations; personas catch felt-experience smells. Both needed; neither substitutes.

## Run history

*(One entry per long-running generation session. Append.)*

- **2026-04-21 — AE101 M1 dependencies (ship-with-agents + prework + exercise Pass 3 + wizard-move lecture + eval instance + site registration + strategy-doc updates).** First long-running-gen cycle. Single biggest lesson: **pin the delivery architecture before generating any student-facing file.** Initial draft assumed Bootstrap-shape training-dir; Antti's reshape replaced that with "compounding artifacts in the student's real repo." Every prompt referencing a location had to be rewritten. Architectural; cannot be retrofitted cleanly.

- **2026-04-22 → 2026-04-23 — AE101 M2 dependencies (plan-mode-done-right module + push-back-on-the-plan exercise + when-a-plan-is-good lecture + eval instance + Pocock grill-me fork + AE101 site registration + content-strategy updates).** Second long-running-gen cycle; structurally re-shaped twice under Antti redirection. Single biggest lesson: **pattern-recognition LOs need n≥2 instances with contrast.** v1/v2 had the student push back on one plan and execute — n=1, reading-the-plan LO un-met by design. v3 paired a human read with an agent second-pass read (Pocock's `grill-me`) and dropped execution. Three compounded entries produced via `/compound`; three `check_*.md` amendments applied with Antti approval.

- **2026-04-23 late — AE101 M4 Pass 2 (run-the-first-experiment module spine + walk-and-send-off exercise + test-and-learn lecture + eval instance) + full M4–M6 strategic re-architecture (*test → learn → encode* two-run arc; *test-and-learn* spirit) + CLAUDE.md three-layer sweep across M1–M4 + strategy doc + `reference/claude-code-for-engineers.md` new reference.** Fourth long-running-gen cycle. Single biggest lesson: **production social dynamics are load-bearing pedagogy constraints.** Training kept saying `CLAUDE.md` unqualified; in multi-engineer repos the repo-root file is PR-gated, so session compounds at that layer either rubber-stamp or defer, killing the fast loop. Unlocked the three-layer model (team/personal/user). Four compounded entries produced via `/compound`; four compendium amendments applied. Four-agent auto-fire dispatched at handoff; seven convergent reshape items applied inline.
