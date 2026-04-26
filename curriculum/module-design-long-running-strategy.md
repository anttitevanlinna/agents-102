# Module Design — Long-Running Generation Strategy

Eat our own dog food. The M3/M4 long-running pattern from the *Agentic Engineering 101* training — *send off a mid-long task, close the laptop, return, process, sharpen* — is also how Antti and I should work on generating full lectures and exercises. This document is the strategy plus the compound loop that makes it sharper each session.

**This file compounds. Every long-running generation session closes with a Compound step that rewrites the rules below. If that step is skipped, the strategy stops learning.**

## Why this exists

**Strategy-session cadence** (the session that produced this file): Antti types a design move, I capture it, we iterate in small turns. That pattern can't produce a full lecture or exercise in one sitting without burning Antti's time across dozens of turns.

**Long-running-session cadence** (what we're moving toward): Antti pins a plan, I generate end-to-end while he's elsewhere, he comes back to review a 70%-there draft + a simulation report + my own self-eval. He reshapes 30–40% (the normal ratio for article drafts). Same pattern the training teaches students about handing off multi-hour agent work — we apply it to the work of making the training itself.

*Rory: the training's meta-pattern becomes the work pattern. The course material about long-running work is produced by long-running work. The filter for whether we understand the pattern is whether we can run it on ourselves.*

## The three-pattern (ported from M3/M4)

Same pattern that makes agent walk-aways work, applied to me generating curriculum.

### 1. Reference artifact

Must be populated BEFORE the session starts. If the reference artifact is thin, the session isn't long-running — it's a strategy session.

Required:
- The module's Pass 1 row in the relevant content-strategy doc (`curriculum/content-strategy-*.md`)
- The module's "in detail" section if written
- The peer Bootstrap lecture or exercise, if porting or riffing on one (`curriculum/lectures/` or `curriculum/exercises/`)
- The eval template that will be used as the verifier (`curriculum/evals/lecture.md` or `curriculum/evals/exercise.md`)
- **Frame to land** section — verbatim user-provided framings (3–7 word blunt sentences, named thesis, quoted lines from Antti's planning messages) captured as direct quotes. NOT paraphrased. This is the cite-and-compare source at ship time: the author re-reads these exact sentences and holds the draft against them. Paraphrasing drifts — the M6 generation's turn-7 frame (*"everyone struggles. Surprises happen. The LLM is not a deterministic machine."*) got wrapped in 150 words of philosophising and dropped one sentence entirely because it was captured only in session notes, not as a verbatim check in the reference.
- **Done-means criterion** — explicit list of what "done" includes. **MUST name the `curriculum-pre-ship-audit` skill invocation as a blocking gate**, not deferred as *"pre-first-cohort TODO."* Per-cohort freshness re-checks are legitimate pre-cohort TODOs. First-pass sim + eval + source-verify + capability-check are not.

### 2. Plan.md (the up-front plan)

**The plan is a snapshot, not a forecast.** It captures the session's current understanding at the moment of dispatch. The session's actual shape will differ — user nudges, reversals, and discoveries will reshape it. The plan tracks where we thought we were going; the session notes track where we actually went. Don't let the plan's tidiness (clean three-phase layout, neat dependencies) paper over the five-nudge, two-reversal reality a live session produces. A plan that reads as forecast rather than snapshot will mislead the author at mid-session when the session has drifted from it.

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

**The `curriculum-pre-ship-audit` skill is the composite verifier.** Invoke by name at end of generation cycle against the file list. It dispatches four parallel checks:

1. **Three-persona sim** (mid-competent / opinionated senior / fast operator) — walks the files, scores mood per beat, quotes landed/unlanded sentences.
2. **LLM-as-judge eval** per `curriculum/evals/lecture.md` or `curriculum/evals/exercise.md` template, filled as an instance at `curriculum/evals/instances/<training>--<module-slug>.md`.
3. **Source verification** — every numeric claim, practitioner attribution, verbatim quote checked against `continuous-research/observations/` or primary source.
4. **Claude Code capability check** via the `claude-code-guide` agent — every platform-fact claim current-as-of-date.

Any REVISE blocks "done." Approve-with-todos acceptable when TODOs land in maintainer blocks.

**`/loop` stop-condition is augmented.** Two clean passes on grep + verifier is necessary but not sufficient. The `curriculum-pre-ship-audit` skill must also return GO before `/loop` declares done. Grep-cheap dimensions alone don't sample the same errors a senior-persona sim does — a `/loop` stopping clean while a credibility-performance tricolon survives is the concrete failure mode.

All four results ship alongside the draft.

## The session shape

1. **Open** (2 turns, ~5 min): I produce the plan. Antti approves / redirects / reshapes. No third turn of back-and-forth — the plan lands or we aren't ready.
2. **Work** (long-running, 15–45 min wall clock): Generate the full lecture/exercise. Generate the filled eval instance. Dispatch the simulation agent in parallel. Antti is elsewhere.
3. **Return** (1 turn): Antti reads three things, in order — the artifact itself, my self-eval verdict, the simulation breakage list.
4. **Reshape** (variable turns): Antti reshapes the 30–40% that missed. I apply without re-opening the strategic beat.
5. **Compound** (1 turn, before commit): rewrite the rules in this file per the Compound section below.

## Failure modes to pre-empt

From the long-running OODA — applied to me, not to the student's agent.

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
- **Governing rule** (behind this file): `bosser-strategy:content-strategy-agentic-engineering-101.md` § "The rule that governs everything"
- **M5/M6 pattern** this file ports from: same strategy doc, §§ "M5 in detail — long-running tasks, send-off" and "M6 in detail — long-running tasks, return"
- **Eval templates:** `curriculum/evals/lecture.md`, `curriculum/evals/exercise.md`
- Session rules — banned-word, hold-OODA-loose, never-downplay-students, sales-register — are already loaded via MEMORY.md PRE-FLIGHT; don't re-grep here

## Rules the file has learned

*(Rewritten at each session close. Integrate-don't-append.)*

- **Strategic beat is load-bearing.** If I can't state the specific teaching moment in one sentence, I'm not ready to generate. Ungenerable-without-it.
- **Pin the delivery architecture BEFORE generating any student-facing file.** Where do artifacts live? What ships as files vs. gets generated in conversation? Bootstrap's separate-training-dir assumption does NOT apply to AE101 (compounding in the student's real repo). Every prompt leaks the assumption — it cannot be retrofitted cleanly.
- **Pattern-recognition LOs need n≥2 instances with contrast.** When an LO verb is *read / spot / judge / notice / recognize*, one instance teaches the vocabulary of the rubric; contrast teaches the skill. Check at Pass 2: does the student encounter the target pattern under at least two different conditions? If no, the LO is un-met by design regardless of phase polish. Canonical home: `memory/check_pedagogy.md` item 13.
- **Student moves stay in conversation with the agent.** Editor tools, terminal commands, and file-edit primitives (Ctrl+G plan editing, `git` moves, manual annotation) belong at Debrief as next-tier practitioner notes — not as exercise forcing functions. When Claude Code ships a native in-conversation alternative (like `keep planning with feedback`), use that path. The forcing function stays in chat because the meta-move the training teaches is *ask the agent, don't type at it*. Canonical home: `memory/check_student_facing.md` item 12.
- **Evals + three-persona simulation auto-fire after any significant rewrite.** Phase structure changed, LOs changed, mood contract changed, or a new practitioner artifact/skill integrated → dispatch LLM-as-judge + sim in parallel BEFORE handoff, no user ask. Sentence-level polish within unchanged phases does NOT trigger. When in doubt, dispatch; the cost is one parallel agent, the cost of shipping un-sim'd structure is a wasted review turn. Canonical home: `.claude/skills/content-creation/SKILL.md` PDCA step 6.
- **Curating a third-party practitioner skill: fork with LICENSE + commit pin, don't paraphrase.** When an open-source skill fits a module (Pocock's `grill-me` into M2), fork the verbatim content into `curriculum/skills/external/<author>-skills/<skill-name>/` with the upstream LICENSE preserved and a README naming the source commit SHA. Brevity of a practitioner skill IS the pedagogy — paraphrasing silently breaks the thing. Ship in the content folder; students shouldn't install from GitHub mid-training.
- **"Stop at approval" is a valid exercise ending when the skill is recognising quality.** An exercise that teaches plan-reading doesn't need to run the plan; the work of making the plan good IS the exercise. Executing the code is a different skill at a different scope (M3's concern in AE101). Naming this explicitly prevents the anticlimactic-theatre read — the retrospective carries the stop.
- **Plan-approved means plan-locked.** After Antti approves, no re-opening. Execute.
- **Simulation runs as a separate agent** with a student persona — not me reviewing my own work. Charitable self-review is a known failure mode. Run three personas (mid-competent / opinionated-senior / fast-operator) + LLM-judge in parallel on handoff.
- **Mood re-check** at 50% draft and at close. Context drift is real on long generations. And **don't smuggle another module's voice** — M1 is joyful-creation (*"it works, on my repo"*), not M5 long-running (*"close the laptop"*). When reaching for a pattern that lives in another module, ask whether it belongs *here*.
- **Don't pre-fabricate state the student could generate in conversation.** Sibling rule to *ask-the-agent-don't-type-in-a-terminal*. The first move of an agentic training cannot be file-ceremony.
- **Banned-word post-pass** before handoff: grep `honest`, `delve`, `landscape` (verb), `importantly`, `crucial`, plus hard-ban `ritual`, `practice` (noun), `ceremony`. Zero tolerance at ship time.
- **Voice: Seth × Rory × Risto** for student-facing prose. Concrete, direct, warm, counter-intuitive reframes, epistemic directness. Stylized phrase-pairs are internal-only.
- **"Prepare" ≠ "generate" ≠ "create new file."** Distinct scopes. When in doubt, ask before creating.
- **Research-backing is load-bearing even for familiar names.** Verify name + URL + freshness even for cited practitioners — especially when the source is prior memory (Huryn's first name was wrong in MEMORY.md; caught by the plan-time grep).
- **Include-link paths use bare `lectures/<slug>.md` / `exercises/<slug>.md`** — renderer resolves from curriculum root regardless of training dir. Don't improvise.
- **Q1/Q2/Q3 retro interview is forbidden — every module, every training.** Debriefs always self-compound: Claude reviews evidence → rewrites rules file in place → reports 3–5 lines → student pushes back on the summary. Shape is *review → rewrite → report*, not *ask three questions → propose paste*.
- **Softening-on-regeneration is a named Claude tell.** When a student pushes back and Claude acknowledges then re-softens the flagged step in the revised output, that's RLHF-niceness bleeding through. Worth surfacing in exercises that design push-back mechanics, and worth watch-for notes in sim design.
- **The plan must specify which file-layer each artifact targets.** *"Student compounds to `CLAUDE.md`"* in a plan reads fine but ships a social-dynamics bug: in multi-engineer repos, `./CLAUDE.md` is PR-gated. Every plan-level artifact gets a file-layer declared: team (`./CLAUDE.md`), personal (`./CLAUDE.local.md`), user (`~/.claude/CLAUDE.md`), or team-kit (sponsor-stated). Default compound target for session Debriefs: personal. Plan-time check: *"could a staff engineer on a 20-person team actually do this compound every session without the PR gate blocking them?"*
- **Platform-assertion verification happens before the assertion, not before drafting.** Rule scope is trigger-scoped (*"before asserting"*), not activity-scoped (*"before drafting"*) — a strategic-conversation-mode moment that proposes a capability counts as an assertion. Practical shape: every plan that makes a platform claim names the verification source (agent + URL) at plan time. Trust-but-verify the capability-check agent — WebFetch the URL yourself when the assertion is load-bearing.
- **Plan-locked applies to execution, not strategic shape.** Antti may reshape the strategic frame post-approval without violating the "plan-approved means plan-locked" rule — that rule is about not-re-opening during execution, not about not-redirecting strategy. This session's arc (M4-M6 reframe twice: accumulate→bake→spot, then test-and-learn two-run spirit) was legitimate strategic-redirect territory. Clarify in the plan template by distinguishing strategic items (Antti may redirect) from executional items (I carry through). Same plan shape; explicit labels reduce confusion when Antti reshapes mid-cycle.
- **LLM-judge is procedural compliance; persona sim is the authoritative mood signal.** This cycle: LLM-judge rated all mood beats 8+; three personas converged on register smells averaging 7.5-7.8 and found seven inline reshape items the judge missed (performative coda, consultant-speak, ceremony-where-senior-would-refuse, architectural-gap-skip). Rule: when verdicts disagree, trust the personas. LLM-judge catches rule violations; personas catch felt-experience smells. Both are needed; neither substitutes.
- **Auto-fire the four-agent handoff (3 personas + LLM-judge) after any significant rewrite.** This cycle's dispatch took ~45s wall clock and found the reshape items that made the Pass 2 artifact shippable. The cost of skipping is a wasted review turn; the cost of running is one parallel dispatch. When in doubt, dispatch.

## Run history

*(One entry per long-running generation session. Append.)*

- **2026-04-21 — AE101 M1 dependencies (ship-with-agents + prework + exercise Pass 3 + wizard-move lecture + eval instance + site registration + strategy-doc updates).** First long-running-gen cycle. Single biggest lesson: **pin the delivery architecture before generating any student-facing file.** The initial draft assumed a Bootstrap-shape training-dir (`module-1/decision.md`, `prework/bug.md`); Antti's reshape replaced that with "compounding artifacts in the student's real repo, curriculum content unzipped next to it." Every prompt referencing a location had to be rewritten. Artifact-location assumptions leak into prose and cannot be retrofitted cleanly — they're architectural. Secondary lessons: don't pre-fabricate state the student could generate in conversation; don't smuggle one module's voice into another; verify practitioner names + URLs even when citing from prior memory; include-link paths are bare-slug only.

- **2026-04-22 → 2026-04-23 — AE101 M2 dependencies (plan-mode-done-right module + push-back-on-the-plan exercise + when-a-plan-is-good lecture + eval instance + Pocock grill-me fork + AE101 site registration + content-strategy updates).** Second long-running-gen cycle; structurally re-shaped twice under Antti redirection. Single biggest lesson: **pattern-recognition LOs need n≥2 instances with contrast.** v1/v2 had the student push back on one plan and execute — n=1, reading-the-plan LO un-met by design. v3 paired a human read (two push-backs) with an agent second-pass read (Pocock's `grill-me`) and dropped execution entirely. Secondary lessons: (a) student moves stay in conversation with the agent — Ctrl+G plan-file editing was wrong as a forcing function even though it's a real practitioner primitive; (b) evals + sim should auto-fire after significant rewrite, not on request (Antti correction, now codified in content-creation SKILL.md step 6); (c) curating third-party skills means fork + LICENSE + commit pin, brevity IS the pedagogy; (d) "stop at approval" is a legitimate exercise ending when the skill is quality recognition, not execution; (e) softening-on-regeneration is a reliable Claude tell in plan mode, worth teaching. Three compounded entries produced via `/compound`; three `check_*.md` compendium amendments applied with Antti approval.

- **2026-04-23 late — AE101 M4 Pass 2 (run-the-first-experiment module spine + walk-and-send-off exercise + test-and-learn lecture + eval instance) + full M4–M6 strategic re-architecture (*test → learn → encode* two-run arc; *test-and-learn* spirit) + CLAUDE.md three-layer sweep across M1–M4 + strategy doc + `reference/claude-code-for-engineers.md` new reference.** Fourth long-running-gen cycle. Single biggest lesson: **production social dynamics are load-bearing pedagogy constraints.** Training kept saying `CLAUDE.md` unqualified; in multi-engineer repos the repo-root file is PR-gated, so session compounds at that layer either rubber-stamp or defer, killing the fast loop. Antti: *"repo claude.md is subject to group decision-making and PR policy pretty much always. Make sure that this is workable in real-life production repositories. Think socially too."* Unlocked the three-layer model (team/personal/user) which resolved the tension — session compounds default to `CLAUDE.local.md`; team rules flag for separate PR. Secondary lessons: (a) strategic-conversation mode needs the same platform-verification discipline as drafting (caught asserting `CLAUDE.local.md` without verification; existing rule scoped to "drafting" didn't fire — rewrote Rule 1 from activity-scoped to assertion-scoped); (b) Antti's strategic reshapes after plan-approval are legitimate (the *test-and-learn* spirit reframe + two-run arc both landed post-plan and improved the module materially); (c) LLM-judge lenience on mood vs. persona sim authority — trust personas when verdicts diverge; (d) trust-but-verify the capability-check agent itself (suspicious "docs updated today" detail warranted direct WebFetch); (e) *"substrate"* is lab-speak that flinches even engineer readers and leaks from strategy into student prose via paraphrase — banned at every prose surface; (f) pick-something moves should delegate SCREENING to Claude, never DISCOVERY (*"ask me about N candidates"* fails when candidates live in systems Claude can't read). Four compounded entries produced via `/compound` (substrate banned / delegation boundaries / CLAUDE.md layer specificity / platform-verify-at-assertion); four `check_*.md` + curriculum/CLAUDE.md compendium amendments applied with Antti approval. Four-agent auto-fire (3 personas + LLM-judge) dispatched at handoff; seven convergent reshape items applied inline.
