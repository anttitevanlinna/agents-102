# Exercise Eval — Curriculum Content

> **Eval template — judges + thresholds.** Detailed banned-word / voice / structure rules live in compendiums (`memory/check_*.md`). When compendiums amend, this template inherits — no template edit needed for rule changes. Update template only for new judges or new pass-thresholds.

Reusable eval system for curriculum exercise files across all trainings. Exercises are evaluated on whether they reliably produce the intended teaching moment when facilitated.

**This eval, like the lecture eval, is a steering eval.** Same flywheel point.

## How to use

1. **Read the target module file** to pull: Big Idea, learning goals, previous/next exercise, the specific teaching moment this exercise must engineer.
2. **Fill in the eval** below — replace every `[BRACKET]`.
3. **Run the eval** — LLM-as-judge prompt at bottom of this file.
4. **Iterate** — fix anything flagged. Re-run.
5. **Antti approves.** Evals catch epistemic problems; Antti catches taste.

Filled instances live at `curriculum/evals/instances/`.

---

## The judges

### Primary — the leap test  *(Antti steers)*

After completing this exercise, the participant can:
- [SPECIFIC OUTCOME 1 — observable behavior grounded in the exercise's teaching moment]
- [SPECIFIC OUTCOME 2]
- [SPECIFIC OUTCOME 3 — ideally tying to their own work]

If a builder leader (not a dev) walks out able to do these three things, it's good enough.

### Framing fidelity *(universal)*

Leads with the module's Big Idea: **[BIG IDEA FROM MODULE FILE]**. Avoids:
- [ANTI-FRAMING 1 — wrong default mental model]
- [ANTI-FRAMING 2]

### Learning goal fit *(universal)*

Enables these Bloom-tagged learning goals from the module file:
- [LG 1 — verbatim]
- [LG 2]

### Module-to-module arc *(universal)*

Picks up from **[PREVIOUS — one-phrase hook]**. Hands off to **[NEXT — one-phrase hook]**.

### Mood lands *(universal — essential)*

Mood is the strategic contract. Mood-arc table + per-module deliberate mood: see `.claude/skills/content-creation/SKILL.md` § *The mood arc — load-bearing constraint* and `bosser-strategy:content-strategy.md` → "Mood arc".

Score 1–10 for each beat (end of each phase + close of exercise). **Pass threshold: 8+/10 at every beat.** 7 = facilitator-premium ceiling — frays for self-study. Below 8, something is stealing the mood (premature resolution, tonal jolt, beat reads as "more work," close that resolves what the next module needs).

Report: mood score per phase + close, plus a one-line *what's stealing the mood* note for any beat below 8.

### The teaching moment lands *(exercise-specific — essential)*

Designed to reliably produce: **[NAMED TEACHING MOMENT]**. If reasonable participant-skill variation can skip the moment, the exercise is fragile.

### Failure modes named *(exercise-specific)*

- [Common failure 1 → diagnostic → fix]
- [Common failure 2 → diagnostic → fix]

### Time-boxed *(exercise-specific)*

Bootstrap module slot: **55–70 min** (1h45 module — see `SKILL.md` → "Module session runtime"). Drop-in (warmups): **20–30 min**. Under 40 = exercise isn't carrying the module. Over 80 = competing for Debrief/Bridge.

### Facilitator briefing complete *(exercise-specific — essential)*

Watch-fors, decision points (extend/skip/push-harder), plug points, stall-past-N-minutes guidance.

### Riffs on a recognized framework *(exercise-specific — essential for business-skill exercises)*

Anchors the new LLM skill on a framework participants likely know (StoryBrand, strategy-as-assumptions, Toyota Kata, JTBD, principle of least privilege, etc.). Check: named, integrated (not decorative), best-in-class. Rare exception: pure technical drills.

### Scaffold / worked example provided *(exercise-specific — essential)*

If the participant produces an unfamiliar artifact type, the exercise must provide ONE of: inline template/scaffold, worked example from adjacent domain, or pointer to earlier exercise that built the same artifact.

### Prompt design *(exercise-specific — essential when the exercise contains copy-paste prompts)*

Load `memory/check_prompts.md` before scoring. Eval-template-specific concern: every artifact in this exercise either familiar from a prior module or scaffolded here.

### Plug points real *(exercise-specific — essential)*

Participant brings their own initiative's data, criterion, output. Never generic, never pre-built (unless explicit design — e.g., trainer-provided compliance skills in M4).

### Voice *(universal)*

Load `memory/check_writing.md` + compounded `2026-04-25-writing-ae101-voice-quartet.md` (extended to QUINTET for AE101: Boris × Martin × Godin × Rory × Risto). Eval-template-specific concern: main body writes TO the student about their journey — facilitator instructions belong in maintainer-only sections below `<!-- maintainer -->`.

### Business-audience language *(universal — essential)*

Load `memory/check_student_facing.md` for the unearned-tech-jargon ban. Read the body as an SVP marketing lead with zero technical background; any flinch = replace or earn.

### Length *(universal)*

**Target: 400–700 words.** Exercises are instructions + facilitator notes, not prose.

### Specificity *(universal)*

Named mechanics, named artifacts from earlier modules, realistic participant dimensions.

### Research-backed claims *(universal — essential)*

Load `.claude/rules/research-rules.md` + `memory/check_research_claims.md`. Vision-detail rule: Antti supplies vision (framing), research supplies detail (practitioners, numbers). Detail-layer claims need KB backing or get cut.

---

## Essential vs contributory

**Essential (must pass):** leap test, framing fidelity, learning goal fit, module-to-module arc, mood lands (8+), teaching moment lands, riffs on framework (when applicable), facilitator briefing, scaffold provided, prompt design (when applicable), plug points real, business-audience language, no auto-fail red flags.

**Contributory (can TODO):** failure modes fully named, time precision, voice polish, length, specificity depth.

## Auto-fail red flags

**Load `memory/check_student_facing.md`, `memory/check_writing.md`, `memory/check_prompts.md` (per surface) before scoring. Auto-fail if any rule in those compendiums fires.**

Eval-template-specific auto-fails:
- Framed as "test" or "validation check"
- Participant's criterion / artifact pre-built (unless explicit design)
- No time estimate
- Toy data instead of participant's own initiative
- Exercise could plausibly run without producing the teaching moment

---

## LLM-as-judge prompt

Copy-paste into a Claude agent. Replace the `[PASTE]` blocks.

````
You are evaluating a curriculum exercise for Agents 102. Score it against the filled-in eval below. Be strict.

Read `memory/check_student_facing.md`, `memory/check_writing.md`, and `memory/check_prompts.md` before scoring this artifact. The judges below check conformance to those compendiums plus eval-template-specific concerns. If a rule has been amended in the compendium since this template was written, the compendium wins.

THE FILLED-IN EVAL:
---
[PASTE: the filled-in `## The judges` section]
---

THE EXERCISE:
---
[PASTE: complete exercise markdown]
---

Return:

**Auto-fail red flags triggered:**
- [List with quote, or "None."]

**Per-judge scoring:**

| Judge | Pass / Fail | Evidence |
|---|---|---|
| Primary — leap test | | |
| Framing fidelity | | |
| Learning goal fit | | |
| Module-to-module arc | | |
| Mood lands (per-phase + close, 8+/10 required) | | |
| Teaching moment lands | | |
| Riffs on a recognized framework | | |
| Failure modes named | | |
| Time-boxed | | |
| Facilitator briefing complete | | |
| Scaffold / worked example provided | | |
| Prompt design (if applicable) | | |
| Plug points real | | |
| Business-audience language | | |
| Voice | | |
| Length | | |
| Specificity | | |

**Verdict:** [APPROVE | APPROVE WITH TODOs | REVISE]

**Top 3 items to fix / defer / sharpen:**
1.
2.
3.

**One-sentence overall read:**

Be specific. Quote where possible. Don't hedge. Report word count.
````
