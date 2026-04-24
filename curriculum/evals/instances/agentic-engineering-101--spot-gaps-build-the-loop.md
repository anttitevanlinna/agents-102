# Eval instance — Agentic Engineering 101 · M6 Spot gaps, build the loop

Target artifacts:
- `curriculum/trainings/agentic-engineering-101/spot-gaps-build-the-loop.md` (module spine)
- `curriculum/lectures/story-of-module-6.md` (opener, drafted last main-thread)
- `curriculum/lectures/the-loop-has-a-name.md` (closer)
- `curriculum/exercises/spot-gaps-build-the-loop.md` (main exercise)
- `curriculum/exercises/arc-retrospective.md` (forward-looking beat)
- `curriculum/reference/scheduled-agents.md` (reference for closer's scheduled-agents callout)

**Eval runs:**
- 2026-04-24 LLM-as-judge pass — see `curriculum/module-design/ae101-m6-eval-findings.md`. Four files scored; all approve-with-todos. Essentials pass across all four.
- 2026-04-24 three-persona sim — Maria (mid-competent) 8.7 avg, all beats 8+. Greg (opinionated senior) 7.0 avg pre-fix, stated delta to 8+ after fixes. Jin (fast operator) 8.3 avg, Monday-portability high. Greg 7s localised to closer's closing tricolon, Phase 2 three-prompt staging, arc-retro solo viability — first two fixed this cycle, third left as register tension with a maintainer flag.
- 2026-04-24 source verification — Ramp 350-skill count restored via Geoff Charles; Charles's *"the models were good enough. The harness wasn't."* lifted from paraphrase to direct quote; Intercom 19.2% / 14.6 vs 75.8 / 86% / 500-R&D all HOLD; freshness clean.
- 2026-04-24 Claude Code capability check (via `claude-code-guide`) — `/schedule` corrected from "local" to Routines (remote); Desktop local tasks distinguished as separate GUI-only primitive with catch-up on wake; `/loop` self-paced mode confirmed supported; skill auto-discovery confirmed current.
- Pending pre-first-cohort: Antti's rewrite pass on Story lecture in final voice; three-persona sim re-run post-fix (confirm Greg 7 → 8 climb); capability + freshness re-checks within two weeks of cohort delivery.

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

## Contributory judges (populated 2026-04-24)

Scores averaged across the four M6 files (exercises: spot-gaps-build-the-loop, arc-retrospective; lectures: story-of-module-6, the-loop-has-a-name). Per-file detail in `curriculum/module-design/ae101-m6-eval-findings.md`.

- **J1 — Mood match:** 4/5. Practitioner fluency lands; closer carries vendor-plug risk that the maintainer watch-for addresses.
- **J2 — LO match:** 5/5. Every LO covered; no orphans.
- **J3 — Banned-word clean:** clean across all four files.
- **J4 — Student-POV clean:** clean across all four.
- **J5 — Placeholder-in-fence clean:** clean.
- **J6 — Skill-invocation clean:** clean (skills invoked by name; `~/.claude/skills/<name>/SKILL.md` appears only as ship-destination, never as invocation target).
- **J7 — AE101 delivery architecture:** clean (real repo, no training-dir state, no `module-N/` paths).
- **J8 — Earn tech terms:** 4/5. Eval / judge / verifier / gate earned load-bearing at the closer; upstream terms primed in prior AE101 modules.
- **J9 — Prompt action lead-in:** 5/5. Every fenced prompt preceded by verb-led lead-in under 20 words.
- **J10 — Em-dash discipline:** 3/5 on the closer (sweep recommended pre-cohort); 4+/5 elsewhere.
- **J11 — Link format:** 5/5. Titles used, no backtick code-span paths.
- **J12 — LLM-vs-agent-vs-Claude discipline:** 4/5. Minor first-person-memo blurring in story-of-module-6 (acceptable in voice).
- **J13 — Action-header discipline:** 5/5.

## Three-persona sim (run 2026-04-24)

- **Maria — mid-competent practitioner.** Mood average 8.7. Every beat 8 or above. No blockers. Flagged: `<project-folder>` placeholder literal-paste snag in Phase 1 (fixed); skill-shape trichotomy felt rigid for hybrid gaps (addressed via maintainer watch-for + flex language); both-runs-balance drift on first-pass diff (addressed via quote-rule push-back already in exercise body).
- **Greg — opinionated senior.** Mood average 7.0 pre-fix. Reads *"would recommend to a colleague, with a cut"*. Biggest catch: closer's closing tricolon *"You know how to test. You know how to learn. You know how to encode."* read as credibility-performance and contradicted the Story opener's explicit rejection of that framing. CUT this cycle. Secondary: Phase 2 three-prompt staging reads as group-room choreography for senior solo mode (senior-compression note added at Phase 2 intro). Tertiary: arc-retrospective solo viability thin (kill-if-thin instruction added; register-smell *"the note's your mirror"* cut). Greg's stated delta after fixes: 7 → 8. Re-run sim post-fix to confirm.
- **Jin — fast operator.** Mood average 8.3. Monday-portability HIGH (specific skill he'd wire to a Desktop local scheduled task on real work next week). Arc-retrospective earned its keep barely at 6 min vs 15 budget; Debrief in self-study thin at 3 min. Neither blocking; noted for next-cycle consideration.

Target met on mood-at-close for Maria and Jin. Greg at 7.0 pre-fix cleared the *facilitator-premium-signature* threshold in the predicted-post-fix direction — re-run warranted before first cohort to confirm the climb.

## Source-verification gate (run 2026-04-24)

- **Ramp Dojo — 350-skill marketplace.** **HOLDS with specific number.** `observations/ramp.md` confirms "350+ skills shared" from Geoff Charles, x.com/geoffintech/status/2042002590758572377, 2026-04-09. [practitioner direct]. **Action:** update closer from "hundreds" to "350" with Charles attributed.
- **Ramp "harness was the bottleneck" framing.** **REVISE — close paraphrase, not verbatim.** Charles's exact line in the observation file: *"The models were good enough. The harness wasn't."* [practitioner direct]. **Action:** lift the verbatim quote into the closer instead of the paraphrase.
- **Intercom Tier 1/2/3.** **HOLDS — all numbers.** `observations/intercom.md` + Curran *"2x — nine months later,"* ideas.fin.ai/p/2x-nine-months-later, 2026-04-16. [practitioner direct]. 19.2% auto-approved ✓ / 14.6 min vs 75.8 min org median ✓ / 86% ≤20 lines ✓ / 500-person R&D ✓.
- **Freshness:** Curran post is 8 days old as of run; well inside 6-month window. Ramp post 15 days old; same.

Proposed edit text and per-file judge detail: `curriculum/module-design/ae101-m6-eval-findings.md`.

---

## Verdict

**approve-with-todos** (2026-04-24 LLM-as-judge run + three-persona sim + source-verify + capability check). All essential judges pass on all four files. Earlier blockers resolved this cycle:
- Closer source-verify edit: *"hundreds"* → *"350"*, paraphrase → verbatim Charles quote — **applied**.
- Em-dash sweep on closer (four split-sentence em-dashes converted; parenthetical framings kept) — **applied**.
- Greg-persona closing-tricolon cut (*"You know how to test..."* → *"Close the laptop. Monday's task is waiting."*) — **applied**.
- Scheduled-agents reference page three-primitive split — **applied**.
- Phase 2 senior-compression note at exercise intro — **applied**.
- Arc-retrospective kill-if-thin instruction + register-smell cut — **applied**.
- Story lecture `RLHF` unearned-term fix — **applied**.
- Main exercise Phase 1 `<project-folder>` placeholder snag — **applied**.

**Remaining TODOs before first cohort:**
- Antti's rewrite pass on the Story of Module 6 lecture in final voice (maintainer TODO — writing pass, not structural).
- Three-persona sim re-run after fixes land to confirm Greg mood-at-close climbs from 7 → 8.
- Capability freshness re-check within two weeks of cohort delivery (`/schedule`, `/loop`, skill auto-discovery).
- Intercom post freshness re-check at cohort date (currently 2026-04-16, within the six-month window by a wide margin).
- Next-cycle consideration (non-blocking): Debrief round self-study variant for fast operators — Jin finished in 3 min; consider an optional skip path when the shipped skill is already the practitioner-fluency marker.

## Next

1. Antti rewrites the Story of Module 6 opener in his final voice.
2. Re-run three-persona sim post-fix; confirm mood climbs.
3. Source + capability freshness re-checks pre-cohort.
