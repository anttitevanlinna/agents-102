# Lecture Eval — Curriculum Content

> **Eval template — judges + thresholds.** Detailed banned-word / voice / structure rules live in compendiums (`memory/check_*.md`). When compendiums amend, this template inherits — no template edit needed for rule changes. Update template only for new judges or new pass-thresholds.

Reusable eval system for curriculum lecture / prework pieces across all trainings. Lectures are evaluated as steering artifacts: does the reader leap, do they arrive at the in-class exercises ready to build on top (not already answered), does the piece hold the module-to-module arc.

**This eval IS a steering eval.** The very concept taught in Module 6 of Bootstrap. Using the system to build the system is the flywheel.

## How to use

1. **Read the target module file** (`curriculum/trainings/<training>/<module-slug>.md`). Pull Big Idea, learning goals, exercises this lecture sets up, previous + next module, primary Bloom's level.
2. **Fill in the eval** — replace every `[BRACKET]`. The Primary leap test is the only judge Antti steers per lecture; the rest are universal.
3. **Run the eval** — LLM-as-judge prompt at bottom of this file.
4. **Iterate** — fix anything flagged. Re-run.
5. **Antti approves.** Evals catch epistemic problems; Antti catches the taste problems evals can't name. If Antti flags something the eval didn't catch, add the missing judge.

Filled instances live at `curriculum/evals/instances/`.

---

## The judges

### Primary — the leap test  *(Antti steers per lecture)*

After reading this lecture, the reader can:
- [VERB 1 — specific observable behavior grounded in the module's topic]
- [VERB 2]
- [VERB 3 — ideally tying to the reader's own context]

If a CTO/builder leader can do these three things after reading, it's good enough. If not, no amount of elegant prose saves it.

### Framing fidelity *(universal)*

Leads with the module's Big Idea: **[BIG IDEA FROM MODULE FILE]**. Avoids:
- [ANTI-FRAMING 1 — wrong default mental model that must be displaced]
- [ANTI-FRAMING 2]
- [ANTI-FRAMING 3 — optional]

### Learning goal fit *(universal)*

Equips the reader to achieve:
- [LG 1 — verbatim from module file]
- [LG 2]
- [LG 3]

The lecture **enables** the goals; it does not **achieve** them. Pre-empting the exercises = fail.

### Module-to-module arc *(universal)*

Picks up from **[PREVIOUS MODULE — one-phrase hook]**. Hands off to **[NEXT MODULE — one-phrase hook]**. Continuity without spoilers.

### Exercise setup *(universal)*

Primes these exercises without giving away the discoveries:
- [EXERCISE 1 — what the reader should NOT already know after reading]
- [EXERCISE 2]

If reading the lecture answers the exercise's question, the lecture over-teaches.

### Mood lands *(universal — essential)*

Mood-arc table + per-module deliberate mood: see `.claude/skills/content-creation/SKILL.md` § *The mood arc — load-bearing constraint* and `bosser-strategy:content-strategy.md` → "Mood arc".

Score 1–10 for mood landing at close of lecture. **Pass threshold: 8+/10.** Below 8, something is stealing the mood — over-reassurance on a stewing mood, tonal jolt, beat reads as "homework," close resolves what the next module needs to pick up, or opening telegraphs the teaching moment and collapses the exercise ahead.

Report: mood score + a one-line *what's stealing the mood* note if below 8.

### Voice *(universal)*

Load `memory/check_writing.md` + compounded `2026-04-25-writing-ae101-voice-quartet.md` (extended to QUINTET for AE101: Boris × Martin × Godin × Rory × Risto). Eval-template-specific concern: main body writes TO the student about their journey — facilitator instructions ("Pairs trade guesses", "To the room:") belong below `<!-- maintainer -->`, not in the student-facing body. Match `memory/copy-taste.md` and existing articles (`strategy/article-*.md`).

### Business-audience language *(universal — essential)*

Load `memory/check_student_facing.md` for the unearned-tech-jargon ban. An unearned tech word creates jargon anxiety — the reader takes the signal "three things I don't know," not the signal the lecture intended. Read every paragraph as an SVP marketing lead with zero technical background; any flinch = replace or earn.

### Length *(universal, tune per lecture)*

- **Prework-reading lectures:** 800–1200 words, 10–15 min read.
- **Demo-script lectures** (trainer performs live ~15 min): 350–600 words — screen carries content, script is beats + prompts + naming.

If unclear, default to prework-reading. Longer than the cap = probably over-teaching.

### Specificity *(universal)*

Named exercises, named artifacts participants have seen (their LLM memory, their Module N output, their CLAUDE.md), specific numbers. Avoid "organizations often…" / "many teams have found…" / "in practice, you might…".

### Research-backed claims *(universal — essential)*

Load `.claude/rules/research-rules.md` + `memory/check_research_claims.md`. Vision-detail rule: Antti supplies vision (framing), research supplies detail (practitioners, numbers, shipped practices). Detail-layer claims need KB backing or get cut. Chasm-crossing filter: cite from "just-hitting-beyond-early-adopters," not bleeding-edge or commodity.

---

## Essential vs contributory

**Essential (must pass):** leap test, framing fidelity, learning goal fit, module-to-module arc, exercise setup, mood lands (8+), business-audience language, no auto-fail red flags.

**Contributory (can TODO):** voice (if mostly right), length, specificity.

## Auto-fail red flags

**Load `memory/check_student_facing.md`, `memory/check_writing.md`, `memory/check_prompts.md` (per surface) before scoring. Auto-fail if any rule in those compendiums fires.**

Eval-template-specific auto-fails:
- Violates framing fidelity (uses an anti-framing as the main frame)
- Pre-empts an exercise (reader learns something they were supposed to discover in class)
- Arc break (no pickup from previous module, no hand-off to next)
- Over 1500 words

---

## LLM-as-judge prompt

Copy-paste this into a Claude agent. Replace the two `[PASTE]` blocks.

````
You are evaluating a curriculum lecture for Agents 102. Score it against the filled-in eval below. Be strict — this is a steering eval, not a participation trophy.

Read `memory/check_student_facing.md`, `memory/check_writing.md`, and `memory/check_prompts.md` before scoring this artifact. The judges below check conformance to those compendiums plus eval-template-specific concerns. If a rule has been amended in the compendium since this template was written, the compendium wins.

THE FILLED-IN EVAL:
---
[PASTE: the filled-in `## The judges` section of lecture.md]
---

THE LECTURE:
---
[PASTE: the complete lecture markdown]
---

Return:

**Auto-fail red flags triggered:**
- [List any red flag triggered, with a short quote as evidence. If none, say "None."]

**Per-judge scoring:**

| Judge | Pass / Fail | Evidence (one sentence) |
|---|---|---|
| Primary — leap test | | |
| Framing fidelity | | |
| Learning goal fit | | |
| Module-to-module arc | | |
| Exercise setup | | |
| Mood lands (8+/10 required) | | |
| Business-audience language | | |
| Voice | | |
| Length | | |
| Specificity | | |
| Research-backed claims | | |

**Verdict:** [APPROVE | APPROVE WITH TODOs | REVISE]
- **APPROVE** — all judges pass, no TODOs.
- **APPROVE WITH TODOs** — essential judges pass; contributory judges may fail. List deferred items.
- **REVISE** — essential judges fail or auto-fail red flag triggered.

**Top 3 items to fix / defer / sharpen:**
1.
2.
3.

Be specific. Quote the lecture where possible. Don't hedge.
````

---

## The eval is also an assumption

If a lecture passes every judge but still feels wrong, the eval is missing a judge. Don't force the lecture to fit the eval — name the missing judge, add it, re-run. This meta-loop IS the pedagogy of Module 6.
