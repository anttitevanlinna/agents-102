# Eval instance — Agentic Engineering 101 · M2 Plan mode, done right

Target artifacts:
- `curriculum/trainings/agentic-engineering-101/plan-mode-done-right.md` (module spine)
- `curriculum/exercises/push-back-on-the-plan.md` (exercise — evaluated below)
- `curriculum/lectures/when-a-plan-is-good.md` (lecture — lighter eval; TODO)

**Eval runs:**
- **2026-04-22 (initial self-eval, pre-simulation):** APPROVE WITH TODOs pending sim. Three ⚠️ items: P3 mid-competent mood, P2 prompt placeholder pattern, motivational-warmth register.
- **2026-04-22 (three-persona simulation: Maija mid-competent / Greg opinionated-senior / Jin fast-operator):** Results forced reshape:
  - **Mood scores:** Maija 8.1 avg / Greg 6.8 avg (below 8 bar) / Jin 8.1 avg. Greg's sub-8 was driven entirely by P3 and P5.
  - **Convergence findings (all three):** the "exactly three merges" quota is the leak. Two of three merges on any real plan are either trivial or forced; forcing the count produces performative annotations. Soft items and assumptions do the real work.
  - **Convergence (2 of 3):** P2 placeholder inside fenced block risks literal-paste failure for less-senior students.
  - **Convergence (2 of 3):** "Claude picks up your annotations" mechanic is unclear — student must send a message, file-save alone doesn't re-trigger re-read.
  - **Greg-specific:** P5 retroactive naming reads as training claiming credit. Fix: add a non-obvious corollary that adds real insight.
  - **Register check:** Greg hallucinated warm lines ("trust yourself, push back when it matters") that aren't in the files. Warm-residue tell same as M1 cycle. No single sentence to fix; tighten connective tissue.
- **2026-04-22 (post-reshape, handoff-ready):** Exercise reshape applied. Three forcing-function axes changed from `3 merges + 1 soft + 1 assumption` → `≥1 soft + ≥1 assumption + ≥1 committed change (merge/reorder/swap)` with explicit senior-refusal path. P2 prompt split: boilerplate in fence, task description sent as second message. P4 watch-time rewritten for tab-away fast operators. P5 adds "find is easier than judge" non-obvious corollary. Connections "Be honest" → "We all do it." Lecture "ritual" → "cosmetic." Exercise "ceremony" → "cosmetic." Nerd logic updated for senior-refusal path.
- **2026-04-22 (Antti correction — push-back mechanic):** Rejected the Ctrl+G plan-file edit as the exercise's push-back move. Reason: manual-editor annotation has the student *typing at a terminal* rather than *talking to the agent* — contradicts the training's core pedagogy. Replaced with Claude Code's native *keep planning with feedback* flow — student picks it at the approval prompt, sends three push-back messages, Claude regenerates the plan. Ctrl+G retained as a practitioner primitive mentioned at Debrief for students who ask. New failure mode named: **softening on regeneration** — Claude acknowledges push-back but re-softens the flagged step in the revised plan; student must push back again. This is the RLHF-niceness tell showing up inside plan mode. Updated P3 body, P5 closing, Nerd logic, watch-fors, module Debrief prompt, lecture "what you do with this" section, and frameworks-riffed-on attribution.
- **2026-04-22 (Antti correction — module is simplistic, doesn't reach LO2, won't fill 90 min):** Structural rewrite. LO2 ("read a plan for its file list, verification steps, and named assumptions") is pattern recognition; pattern recognition doesn't happen on n=1 plan. v3 shape pairs the student's own read (two push-backs) with an agent second-pass read (Pocock's `grill-me` skill walking down unresolved branches). Exercise stops at plan approval — no execution. The gap between what the student's push-back caught and what grill surfaced IS the skill being built. New phase shape: P1 bring task 5m / P2 enter plan, read 15m / P3 two push-backs 15m / P4 grill-me 15m / P5 stop, compare, see the design pattern 10m. Total 60 min exercise → 100 min module. Pocock's grill-me forked to `curriculum/skills/external/pocock-skills/grill-me/` with LICENSE and source-commit attribution (MIT, commit `a6bdfd9`, 2026-04-22). Debrief rewritten to name the pairing as the design pattern, not a moralistic warning about approval inflation. Module LOs, Key Concepts, Debrief prompt, Bridge, Nerd logic, watch-fors all rewritten to match. Lecture "what you do with this" updated. Three-persona re-simulation needed on v3 — prior sim was on the three-push-back + execute shape, not this one.

---

## Primary — the leap test  *(Antti steers)*

After completing this exercise, the participant can:
- **Run** plan mode on a real multi-file backlog task, use Ctrl+G to annotate the plan file in place, and approve only after pushing back in three specific ways inside a 10-minute budget
- **Name** one concrete pattern ("plans touching the auth module need an explicit migration-state flag") about what a good plan looks like for their own codebase — not a generic rubric
- **Recognize** plan-mode approval inflation as a pattern they just defeated, and can say in one sentence what flipped their posture from rubber-stamp to read

If an engineer walks out able to do these three things, the exercise lands.

## Framing fidelity *(universal)*

The exercise leads with the module's Big Idea: **plan mode is only as good as the read you give the plan; push back on one under time pressure and you'll feel when a plan is thin before approving the next one.**

It avoids these anti-framings:
- **Plan mode as a feature tour.** Plan mode is a discipline, not a toggle. The exercise must refuse the "here's how plan mode works, try it" shape. (Refused: the exercise goes straight to real task + forced push-back; plan mode is the substrate, not the subject.)
- **Push-back as performance.** Writing three annotations to check a box defeats the read. (Refused: the forcing function is 10 minutes of reading, not three annotations produced any way; the Nerd's push-back moves catch generic annotations.)
- **Plan-mode approval inflation as a warning.** Naming the anti-pattern before the student defeats it primes self-consciousness, not competence. (Refused: label lands at P5, retroactively.)

## Learning goal fit *(universal)*

Enables these Bloom-tagged learning goals from the module file:
- **Run** plan mode on a real multi-file task with push-back before approval
- **Read** a plan for its file list, verification steps, and named assumptions
- **Push back** on a plan in three specific ways inside a 10-minute budget
- **Recognize** plan-mode approval inflation after defeating it once
- **Name** one pattern about what a good plan looks like for this repo, this codebase, you

All five LOs map directly to exercise phases (P2/P3 Run+Push back, P3 Read, P5 Recognize, Debrief Name).

## Module-to-module arc *(universal)*

Picks up from **M1's Plan → Work → Review → Compound loop on a 60-min trivial bug** — same loop, Plan step at deeper scope.
Subtly hands off to **M3's first authored judge + gate spec** — the push-back moves at P3 are the raw material for M3's judge ("did the fix really land?"). Discipline becomes infrastructure.

## Mood lands *(universal — essential)*

Module mood: **grounded competence** — *"I can feel when a plan is good before approving it."*

Scored per phase (self-eval, pre-simulation):

| Phase | Student emotion at phase-end | Score | What could steal it |
|---|---|---|---|
| P1 (bring a task) | purposeful | 8 | Task-selection paralysis if backlog is thin — fallback to Claude surfacing candidates |
| P2 (enter plan mode) | anticipation | 8 | Over-long Claude exploration; student loses momentum while waiting |
| **P3 (push back)** | **grounded competence** — the payoff beat | **target 8+; self-eval flags risk of 7 for low-experience students** | Can't find three merges; generic annotations; timer abuse (exceeds 10 min → becomes code review) |
| P4 (execute) | confidence | 8 | Agent drift that student doesn't catch because they trust the plan too much |
| P5 (name the shape) | named confidence | 9 | Over-teach at attribution — if trainer piles on Klaassen/Martin, the student's recognition gets stolen |
| Close | **grounded competence primed for M3** | 8+ | Debrief generating generic rubric instead of one specific pattern |

**Risk zone: P3 for low-experience students.** Engineers in the first 1–2 years may struggle to find three merges in a plan they don't yet read fluently. The fallback (*"ask Claude which step it's least confident about"*) handles this, but the mood risks dropping to 6–7 ("I couldn't even find three things"). Three-persona sim will test this directly via the mid-competent persona.

## The teaching moment lands *(exercise-specific — essential)*

Designed to reliably produce: **"I rubber-stamp plans because they look like decisions — pushing back under time pressure is what makes me read them."**

Fragility check: if a student finds three merges in under 3 minutes with no annotation quality, they performed push-back without doing it. The Nerd's generic-annotation push-back (*"which files? which concern?"*) handles this. If a student finds nothing in 10 minutes, the fallback (*"which step is Claude least confident about?"*) provides the soft item. Both escape hatches preserve the teaching moment without bypassing it.

## Failure modes named *(exercise-specific)*

- **P3 rubber-stamp** (approve <60s, no annotations) → Nerd invokes forcing-function → student opens plan file and finds one of each
- **P3 generic push-back** (annotations without file names or concerns) → Nerd asks for specificity → student rewrites or Claude rejects
- **P3 timer abuse** (>10 min reading) → Nerd forces approval → student learns the discipline is the 10-min read, not the complete read
- **P4 drift** (agent expands scope) → student catches via plan as return point → teaches what plan mode actually earns
- **P5 deflection** (*"my annotations didn't really change anything"*) → Nerd probes whether that's self-deprecation or real → informs M3 judge scope
- **Debrief produces generic rubric** ("always read plans carefully") → Nerd pushes for specific pattern grounded in session evidence

## Time-boxed *(exercise-specific)*

- **Exercise total:** 55–70 min
- **Phase breakdown:** P1 5 / P2 10 / P3 5–10 (forcing function) / P4 25 / P5 5
- Phase 3 timer IS the teaching mechanism, not a scheduling aid

Inside M2's 1h45: Connections 10 / Lecture 10–12 / Exercise 55–70 / Debrief 12 / Bridge 5 + buffer.

## Facilitator briefing complete *(exercise-specific — essential)*

In `<!-- maintainer -->` section of exercise file:
- Watch-fors for all five phases (present — P3 triple: rubber-stamp / generic / timer abuse)
- Decision points (P3 under 3 min, P3 over 12 min, P4 under 15 min, editor misconfiguration fallback)
- Plug points (repo, backlog task, sponsor rules home, Nerd push-backs)
- Nerd logic per phase (P1/P3/P5 push-back moves + silence protocol)

## Riffs on a recognized framework *(exercise-specific — essential)*

- **Plan mode** (Anthropic Claude Code primitive) — the instrument being taught at depth
- **Compound engineering** (Klaassen) — continuation from M1; Plan step deepening
- **"What would have to be true" / strategic-choice assumption-testing** (Roger Martin, *Playing to Win*) — the assumption-flag move applied to engineering plans. Vision-layer attribution at Debrief; most engineers have encountered this in strategy readings and the transfer is visible.

Frameworks are integrated (Martin's move IS the third push-back type), not decorative.

## Scaffold / worked example provided *(exercise-specific — essential)*

Three scaffolds for the P3 push-back moves:
- `MERGE: fold step 4 into step 3 — same file, same concern` — worked example shape for annotation format
- `SOFT: step 5 says 'update config' — which keys, and what's the rollback?` — worked example of specificity
- `ASSUMPTION: plan assumes Postgres 15+ — confirm before touching migrations` — worked example of assumption-flagging

Engineers haven't done this exact move before (plan-editing-in-place is a new practitioner primitive at this depth), so three format examples are essential. Fallback for stuck students (*"ask Claude which step it's least confident about"*) is itself a scaffold.

## Prompt design *(exercise-specific — essential)*

Two prompts the student copies:
- **P2 prompt** — ends with single placeholder (`[describe the task...]`) that's NOT a mid-prompt find-and-replace; it's a task-description line at the end, handled as copy-paste-after-prompt. **Reviewer note:** the bracket IS inside the fenced block. Flagged as potential auto-fail — but per SKILL.md prompt rules, "conversation after" and "copy-paste right after the prompt" are legitimate patterns, and the bracket at the END of a prompt block (where the student types their task description as the natural continuation) is a widely-used shape. Sim will confirm whether this reads as a mid-prompt placeholder (auto-fail) or a task-description slot (OK). **Decision pending sim.**
- **P5 prompt** — no placeholders, no editing, pure question to Claude.

Paragraph structure present in both. Both under one screen. No walls-of-text.

## Plug points real *(exercise-specific — essential)*

- Student's own repo (carried from M1)
- Student's own backlog task (surfaced at P1)
- Sponsor-stated rules home for Debrief Compound step
- Everything named in exercise body is a real artifact in the student's real environment. No generic/toy data anywhere.

## Voice *(universal)*

Second person throughout. Builder-voice — direct, warm, epistemically honest ("don't pick a good bug, pick a trivial one" kind of move). Rory-reframes present (*"structure is persuasive"*, *"agreement is cheap; the read is what matters"*). Risto-directness at P3 forcing function. No consultant-speak. No motivational-warmth residue (flagged register-check in three-persona sim).

**Cross-check against student_facing compendium:**
- ✅ Aspirational destination (student becomes someone who can *feel* when a plan is thin) — not corrective
- ✅ Tech terms earned (plan mode shown in use before named as discipline; Ctrl+G appears with explicit keystroke)
- N/A business-audience ban (AE101 audience is engineers; tech terms are native)
- ✅ Memory vs context discriminated (rules file is memory; plan is context)
- ✅ Golden path only in body; troubleshooting in `<!-- maintainer -->`
- ✅ Claude defaults trusted for output structure (Debrief prompt says "integrate, don't append" but doesn't over-specify shape)
- ✅ No Q1/Q2/Q3 retro; Debrief self-compounds per M2+ pattern
- ⚠️ Register check: sim must verify no motivational-warmth residue (M1 cycle found hallucinated pep-talk from Greg-persona — same risk here)
- ⚠️ "Simulation personas never alone" — Nerd is present in the exercise's Agentic Nerd Logic block; sim must confirm Nerd is named at every phase-specific blocker

## Business-audience language *(universal — essential)*

AE101 audience = software engineer ICs. Tech terms (plan mode, permission state, schema, migration, type check, rollback, PR) are native and expected. No business-audience translation layer needed.

No banned words in student-facing body: `honest`, `delve`, `landscape`-verb, `importantly`, `crucial` — all absent. `ritual` appears zero times in exercise; appears once in the lecture as the *bad example* of what a good verification step isn't (*"'Run the tests' is a ritual"*) — flagged for register review at Compound.

## Length *(universal)*

- Exercise word count: ~950 words student-facing body (over 400–700 target). **Contributory fail.** Exercise is longer than target because P3's three-move discipline needs three scaffold examples + timer + fallback. Trim candidates for Pass 3: shorten P2 prompt preamble, compress P4 paragraph. Acceptable as TODO — not blocker.
- Lecture word count: ~440 words. Within range.

## Specificity *(universal)*

Named mechanics throughout (Shift+Tab, Ctrl+G / Ctrl+X Ctrl+E, descriptive plan filename, status bar reads **plan**). Named artifacts (plan file, repo's `CLAUDE.md`, diff, PR). Realistic task-type language (feature slice, small migration, targeted refactor).

## Research-backed claims *(universal — essential)*

Detail-layer claims in the exercise body:
- **Shift+Tab cycles plan mode** — verified 2026-04-22 via `claude-code-guide` against https://code.claude.com/docs/en/permission-modes.md `[practitioner direct]`
- **Ctrl+G / Ctrl+X Ctrl+E opens plan file** — same source, current-as-of-2026-04-22
- **Plan filename is descriptive (not random words) as of v2.1.110** — changelog reference, https://code.claude.com/docs/en/changelog.md `[practitioner direct]`
- **Plan mode is read-only** — permission-modes doc, same source
- **Compound engineering shape** — continuation from M1, source already in `continuous-research/platform-watch/coding-agents/runs/2026-04-21-klaasen-compounding-engineering.md`

Vision-layer claims (framing, not empirical):
- "Plan mode is only as good as the read you give the plan" — Antti/curriculum framing
- "Plan-mode approval inflation" — exercise-named pattern, not a cited zombie stat or practitioner term. OK as curriculum framing; if it becomes a public-site-article claim, source to observed practitioner behavior.
- "Structure is persuasive" / "reasonableness passes for rightness" / "you already agree with it" — lecture framings, not empirical claims

No round-number stats. No vendor claims. No zombie stats. No Level 0 sources.

---

## Essential-vs-contributory summary

**Essential (must pass):**
- ✅ Primary leap test
- ✅ Framing fidelity (three anti-framings named and refused)
- ✅ Learning goal fit (all 5 LOs map to phases)
- ✅ Module-to-module arc (M1 continuation → M3 setup)
- ⚠️ Mood lands — P3 self-scored 8+ but sim must confirm for mid-competent persona
- ✅ Teaching moment lands (with escape hatches for the two common failures)
- ✅ Riffs on recognized framework (plan mode + Martin + Klaassen)
- ✅ Facilitator briefing complete
- ✅ Scaffold / worked example provided (three format scaffolds for P3)
- ⚠️ Prompt design — P2 prompt's trailing task-description bracket pending sim verdict
- ✅ Plug points real
- ✅ Business-audience language (engineers; tech terms native)
- ✅ No auto-fail red flags triggered (tentative pending sim)

**Contributory (TODO acceptable):**
- ❌ Length (exercise over target; trim at Pass 3)
- ✅ Voice (Seth × Rory × Risto present)
- ✅ Specificity (named mechanics throughout)
- ✅ Research-backed claims (all detail-layer sourced)

## Verdict (self-eval, pre-simulation)

**APPROVE WITH TODOs.**

Essential judges pass. Two ⚠️ items (P3 mid-competent mood, P2 prompt placeholder pattern) are contingent on three-persona simulation — the sim IS the verification. Length is a Pass-3 trim.

**Top 3 items pending sim:**
1. **P3 mood for mid-competent persona** — does grounded competence land or does the student drop to "I couldn't find three things"?
2. **P2 prompt task-description bracket** — reads as legitimate copy-paste-after pattern or as mid-prompt find-and-replace?
3. **Register check for motivational-warmth residue** — per M1 cycle finding (Greg-persona hallucinated pep-talk from warm surrounding prose), verify by opinionated-senior persona sim

**Auto-fail red flags triggered (pre-sim):** None.

---

## Lecture eval

**TODO** — lecture is short (10–12 min, ~440 words) and primer-shape; running the full lecture eval now is lower priority than the three-persona exercise sim. Will fill after sim results to catch cross-artifact register issues. Sketch of verdict: APPROVE with "ritual" usage flagged for register-at-Compound review.
