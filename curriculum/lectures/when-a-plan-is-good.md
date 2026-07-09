# When a plan is good

**Session** *(new, "Module 2 - Plan mode done right")*

Start a new Claude Code session at your repo root.

```
/rename m2-plan-mode
```

## Plan mode is a read-only permission state

- Plan mode is a permission state, not a feature. You press Shift+Tab until the status bar reads `plan`. The agent is now read-only: it reads files, runs shell commands to explore, and writes a plan file, but it can't edit or execute until you approve.
- The read-only part is load-bearing. Plan mode isn't "Claude thinks before doing." It's "Claude writes a thing you can read, edit, and push back on before anything changes." The plan is an artifact, not a mood.
- The plan file has an identity. A descriptive name (`migrate-auth-hash-calm-otter.md`, not random words) you can come back to. Small quality-of-life thing that matters more than it sounds: the plan is a thing on disk, not a moment in a chat.
- You will notice the wait. While Claude plans, other sessions could be making progress elsewhere. Not today, but soon.

## Optional: ask plan mode directly

A 30-second move first. Enter plan mode in your own session right now and ask Claude what shifted from its side.

Ask Claude to describe what changed in its behaviour when plan mode turned on.

{{cut:when-a-plan-is-good-1|meta-retrospective}}


Watch what comes back. Sometimes Claude names the read-only state directly, sometimes the specific instructions it is following. Skip if you trust the framing. The exercise will show you either way.

## Three things a good plan has

- **A specific file list.** Not "update the config." *Which* config, *which* keys. A plan that names three files has made three decisions. A plan that says "the relevant files" has made zero.
- **A verification step** that could actually fail. *"Run the tests"* is cosmetic; *"run `pytest tests/auth/ -k hash` and expect 14 passing, 0 failing"* is a gate. The test is whether, reading the step alone, you could tell Claude it failed and Claude would know what to fix.
- **Named assumptions.** Good plans flag what they're assuming (library versions, schema shapes, whether a teammate's migration ran last week). A plan without assumptions isn't assumption-free; it's just assumption-silent.

Three things. That's the read.

## Three pressures that make bad plans look good

- **Structure is persuasive.** A 7-item plan with section headers and bold text looks like a decision. It often isn't. It's a draft formatted like a decision. The formatting is the trap.
- **Reasonableness passes for rightness.** Each step sounds reasonable, so the plan sounds right. But three reasonable steps in the wrong order still ship a bug. Read the sequence, not the steps.
- **You already agree with it.** The plan matches what you'd have written, which feels like alignment. But Claude wrote it from a partial read of the codebase and your instinct isn't a substitute for the read. Agreement is cheap; the read is what matters.

## Two reads, paired

- Your read and the agent's walk-down catch different misses. You bring the voice of experience: the soft item, the step that contradicts how this codebase actually works. The agent brings breadth: it can walk every unresolved branch of the decision tree without getting bored or skipping the dull ones.
- Paired, they give a complete read; neither alone does. Order matters: your push-back first, so your read stays in the driver's seat, then the walk-down for the branches you can't see.
- Check the revision, not the acknowledgement. The agent agrees easily. A flagged step can come back softened rather than sharpened. A push-back is finished when the regenerated plan is sharper, not when Claude says it heard you.

After you've done it once, you'll feel when a plan needs the second read and when your own read was enough.

## Find is easier than judge

- Generating candidates is cheap for the agent; judging them is where you're needed. Stuck naming a soft item? Ask Claude which step it's least confident about. That answer is a candidate. Whether it matters on this codebase is a decision only you can make.
- The split runs through the whole discipline. The agent finds, you judge, and everything from here sharpens one side or the other.

## The cheapest gate you will ever run

- A plan is a check that runs before anything exists. Reading intent costs minutes. Reading the finished diff costs hours. Un-shipping the wrong system costs weeks. Same mistake, three prices; the plan is where catching it is cheapest.
- Aim the read at the unknown that teaches you the most. The branches worth walking are the ones that change what done means. The rest you'd settle in code review anyway.
- Making the plan good IS the work. You don't have to execute a plan to know it's good. Recognizing a good plan is the skill; the execution can wait for the day the task is real.

<!-- maintainer -->

**Emphasis pass (2026-07-09, Antti-directed "go very lightly on the bold"):** the two checklist slides keep bullets with per-item handles (**A specific file list** / **A verification step** (trimmed to sub-span) / **Named assumptions**; **Structure is persuasive** / **Reasonableness passes for rightness** / **You already agree with it**); all other slides de-bolded fully, bullets kept (status-bar `plan` flipped bold → code span), per `theory-plan.md § Slide format — emphasis budget` + `check_slides.md §9`. Session widget + both kickers untouched. Wording near-verbatim; no claims added or cut. Quality per-class SHAs predate this pass; re-audit before ship.

**Slide-page standardization (2026-07-02, Antti-directed):** `### Optional: ask plan mode directly` promoted to `##` — every slide page = line + `##` headline (the "Wrong is how steering gets in" pattern); no h3/hr page divisions in theory lectures. Layout-only; the section still dies or lives with the prompt-cull decision.

**Slides-only pass (2026-07-02, unaudited):** covered regions DELETED (Path A — prose was verbatim-redundant with the slides; git carries it). Per-passage verdicts: intro agenda line CUT (slide titles carry it) · "you will notice the wait" FOLDED into slide 1 as fourth bullet (plants M3's two-window move) · "What you do with this" section CUT (the exercise body carries the flow; "then you stop" is the exercise's own beat) · feel-line KEPT as slide-4 kicker (fluency forecast, future-tense informing) · "Three things. That's the read." KEPT as slide-2 kicker · *Optional: ask plan mode directly* section KEPT UNCHANGED — its prompt is a `{{cut:}}` candidate; the section dies or lives with the prompt-cull decision, not this pass. File is now Session widget + six slides + kickers + one cut-flagged optional move.

**Deck notes:** does NOT name "plan-mode approval inflation" — that label lands retroactively at exercise P5. *The cheapest gate you will ever run* delivers the name-the-uncertainty governor as a pre-action question (doctrine-legal). *Find is easier than judge* seeds the M5 verification-asymmetry naming.

**Quality:** compendium-audited 2026-07-08 (writing@1a9e10b story@1a9e10b technical@1a9e10b behavior@1a9e10b pedagogy@1a9e10b strategy@1a9e10b slides@47f3357) — predates the slide rework; re-audit before ship.
- judges @47f3357: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS
- maintainer-reviewed 2026-04-28 (Antti, full AE101 pass)
**Meta:**
- **Time:** 10–12 min (deck-only trimmed it back from the 12–15 of the deck+prose draft), inside M2's 1h45 slot (Connections 10 / Lecture 10–12 / Exercise 55–70 / Debrief 15 / Bridge 5). If tight, the three-pressures slide compresses to 60 seconds; the exercise teaches them.
- **Pedagogy:** primer-before-exercise. Names the three moves (merges / soft items / assumptions) that Phase 3 forces.
- **Mood target:** anticipation toward grounded competence. Student leaves the lecture with "I know what to look for" — the payoff of *actually feeling it* lands in the exercise.
- **Voice check:** no banned words (`honest`, `delve`, `landscape`-verb, `importantly`, `crucial`, `ritual`, `ceremony`, `practice` as noun). No em-dashes in body.
- **Frameworks riffed on:**
  - Plan mode (Anthropic Claude Code) — capability reference, current as of 2026-04-22. Source: https://code.claude.com/docs/en/permission-modes.md `[practitioner direct]`.
  - The three-things / three-pressures shape is exercise-scaffold, not a cited framework.
  - Gate-cost escalation (intent → diff → shipped) is plain cost logic in body, un-attributed by design; the Boehm lineage (defect cost grows with discovery distance) is noted in `theory-audit.md` § canon (plan-as-cheapest-gate), cite only if a number ever enters the body.
- **Philosophy callout budget:** zero. The lecture is short and operational. The philosophy beat (*memory is my edge, not my keystrokes*; *mastery is structural practice*) lands naturally in the M2 Debrief when `CLAUDE.md` grows.

**Pre-cohort open items:** `curriculum/trainings/agentic-engineering-101/pre-cohort-todos.md`.
