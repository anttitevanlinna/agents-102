# Eval instance — Agentic Engineering 101 · M6 Spot gaps, build the loop

Target artifacts:
- `curriculum/trainings/agentic-engineering-101/spot-gaps-build-the-loop.md` (module spine)
- `curriculum/lectures/story-of-module-6.md` (opener, drafted last main-thread)
- `curriculum/lectures/the-loop-has-a-name.md` (closer)
- `curriculum/exercises/spot-gaps-build-the-loop.md` (main exercise)
- `curriculum/exercises/arc-retrospective.md` (forward-looking beat)
- `curriculum/reference/scheduled-agents.md` (reference for closer's scheduled-agents callout)

**Eval runs:**
- (stubbed; to be populated before first cohort)

---

## Big Idea

Two runs of the same task (un-packaged M4, packaged M5) are enough evidence to name what the three-pattern didn't anticipate, pick where the gap belongs (memory, verifier, new skill), and author the second skill through conversation so future you inherits the lesson.

## Learning objectives (verbatim from module file)

- **Diagnose** (Analyze) the packaged M5 run alongside the un-packaged M4 baseline; name gaps the three-pattern didn't anticipate, quoted from your own artefacts.
- **Name** (Evaluate) which gap belongs in memory, which in a sharper verifier, which in a new skill — using two runs' evidence, not prescription.
- **Author** (Create) the second skill through conversation, shape follows what the two runs demanded (sharpened-verifier / judge / gap-finder); self-critique; invoke on the packaged run; ship to personal `~/.claude/skills/`.
- **Name** (Understand) evals with full weight — verifier = judge = gate = eval — anchored by Ramp Dojo and Intercom Tier 1/2/3 from your just-built artefact.
- **Articulate** (Evaluate) one key learning and one personal thought on the future in the Debrief round. Not a performance; a marker of where your practice stands after six modules.

## Module arc

- **Previous module:** M5 — *Learn from the test, re-send packaged* (`learn-from-the-test.md`). Students arrive holding the packaged M5 re-run of the M4 un-packaged task. Both runs live in the same repo.
- **Next module:**
  - **M7/M8 cohorts:** *When agents meet agents* — the student's stack (codebase memory, two authored skills, verifier, team-kit contributions) arrives at M7 as a first-class participant on a shared runtime.
  - **Core-only cohorts:** *Monday-morning real work.* No next module; the bridge is to a real task on the student's team.

## Exercises to set up

- **Main exercise:** `exercises/spot-gaps-build-the-loop.md` (40–50 min). Three moves: diff across two runs, name-gaps-name-home, author the second skill through conversation. Ships skill to personal `~/.claude/skills/`; team-PR candidates flagged via human conversation.
- **Forward-looking beat:** `exercises/arc-retrospective.md` (15–20 min). Bounded activity. Agent reads the M1–M6 artefacts in the student's repo and writes a one-page note on the arc. Lands the *"everything is scaling of learning"* throughline. For core-only cohorts, this carries the visible-compounding moment M7 would otherwise hold.

## Primary leap test — the mood-driven judge *(Antti steers)*

After completing this exercise, the student can:

1. **Articulate the encode move in their own words** — *"what I learned from these two runs, packaged so future me inherits it."* Not quoting the training's phrasing back; paraphrasing from felt experience. The marker of practitioner fluency, not of comprehension.
2. **Show a skill that fires on the gap shape they diagnosed.** The second authored skill invokes on the packaged M5 run (or the M4 un-packaged run) and surfaces the specific gap the student named in Phase 1. If the skill doesn't fire on the failure shape, it's documentation, not a skill.
3. **Name where each of three gaps belongs** — memory, sharper verifier, or new skill — for their own two runs, using evidence quoted from the runs, not prescription.

If a working software engineer walks out of this module able to do these three things, the mood landed.

## Anti-framings refused

- Compliance-feeling (*"build the eval, pass the gate"*).
- Paperwork-feeling (*"fill out the retrospective template"*).
- Credibility-performance (*"we live what we teach; look how well we encoded"*).
- Trainer-monologue retrospective (Claude writes the arc; student reads; no artefact).

## Contributory judges (stubbed)

To be populated before first cohort. Names from the `ae101-m6-verifier.md` judge set:

- **J1 — Mood match** (practitioner fluency; 1–5; 3 or below ⇒ revise).
- **J2 — LO match** (no orphaned LO; no activity without an LO; 1–5).
- **J3 — Banned-word clean** (ritual / ceremony / substrate / honest / delve / importantly / crucial / landscape-as-verb; binary).
- **J4 — Student-POV clean** (zero *the student* in body; binary).
- **J5 — Placeholder-in-fence clean** (zero `[BRACKETS]` inside fenced prompt blocks; binary).
- **J6 — Skill-invocation clean** (installed skills invoked by name, never by path; binary).
- **J7 — AE101 delivery architecture** (no training-dir state, no `module-N/` paths, real repo; binary).
- **J8 — Earn tech terms** (every technical term primed on first use in AE101; 1–5).
- **J9 — Prompt action lead-in** (every fenced prompt preceded by a one-sentence verb-led lead-in under 20 words; 1–5).
- **J10 — Em-dash discipline** (count body em-dashes; more than three that split short sentences ⇒ approve-with-todos).
- **J11 — Link format** (inline links use target H1 title, not filename; zero backtick code-span paths in body; 1–5).
- **J12 — LLM-vs-agent-vs-Claude discipline** (LLM for thinking, agent for acting, Claude for product/version/disambiguation; 1–5).
- **J13 — Action-header discipline** (action sections use command verbs; lecture sections may stay declarative; 1–5).

## Three-persona sim (stubbed)

Three personas to run before first cohort:

- **Mid-competent practitioner** — has shipped with agents once or twice, mid-diagnosis stamina. Watch for: Phase 1 over-diagnosis, skill-shape mismatch at Phase 2.
- **Opinionated senior** — register smell detector. Watch for: any beat that reads as permission-asking or credibility-performance, especially in the Story opener and the closing-lecture attributions.
- **Fast operator** — finishes the main exercise in 30 min. Watch for: Phase 2 ships a thin skill that doesn't fire on the diagnosed gap; arc-retrospective runs short because the student didn't engage both runs.

Target: 8+/10 on mood-at-close for all three personas. Any senior-premium 7/10 on the closer warrants a register sweep.

## Source-verification gate (pre-first-cohort)

Before the closer ships, every URL + number + fallback named in the closing lecture's maintainer block must be live-verified:

- **Ramp Dojo — 350-skill marketplace.** Verify against `continuous-research/observations/ramp.md` or the original Ramp post. Source-type label required.
- **Intercom Tier 1/2/3** — 19.2% auto-approved / 14.6 min vs 75.8 min org median / 86% ≤20 lines / 500-person R&D. Verify against `https://ideas.fin.ai/p/2x-nine-months-later` and `continuous-research/observations/intercom.md`. Source-type label required.

Freshness: 6-month window. If any number drifts, update the lecture before the cohort.

---

## Verdict

**(stubbed — populate after first LLM-as-judge run and three-persona sim.)**

## Next

1. Run LLM-as-judge per `curriculum/evals/exercise.md` template against the main exercise and arc-retrospective.
2. Run three-persona sim against the module spine + both exercises + the closer.
3. Source-verify both lecture numbers.
4. Populate convergent findings + essential/contributory judges from run output.
