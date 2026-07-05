## Per-Module At-a-Glance

One module at a time. Pick a tab; the URL hash holds the selection so you can share or bookmark a specific module. Trainer-guide deep-dives for M3 (security stunt) and M6 (lecture density) still live in <a href="trainer-guide.html" target="_blank" rel="noopener">trainer-guide.html ↗</a>.

<nav class="module-tabs" aria-label="Per-module glance">
  <a href="#m1-glance">M1 · Getting going</a>
  <a href="#m2-glance">M2 · Plan mode</a>
  <a href="#m3-glance">M3 · Earn the trust</a>
  <a href="#m4-glance">M4 · First experiment</a>
  <a href="#m5-glance">M5 · Learn from the test</a>
  <a href="#m6-glance">M6 · Spot gaps</a>
</nav>

<section class="module-glance" id="m1-glance">

### M1 — Getting going + context (+ MCP)

**Slot.** Day 1, 08:30–10:30 (2h). Thinking effort `high` (prework default).

**Big idea.** The first compound loop closes on a trivial bug from the student's own backlog: orient, fix tests-first without plan mode, retro into a personal `./CLAUDE.local.md` born from the session, close the bug's ticket via one connector. The loop every module after this one rides on.

**Flow.**

1. Connections — "one trick you figured out with Claude Code that nobody taught you"
2. Lecture — Painting the picture with the LLM (the wizard is dead; context is what colors what comes after)
3. Lecture — The wizard move (two-window dinner demo; "context is what you tell it")
4. Exercise — [Orient and introspect](./#exercises-orient-and-introspect) (15–20 min)
5. Exercise — [Fix tests-first](./#exercises-fix-tests-first) (25 min)
6. Exercise — [Compound and close](./#exercises-compound-and-close) (30 min)
7. Lecture — [The machine you just met](./#lectures-the-machine-you-just-met) (recognition closer, ~5 min; names the two behaviors the exercises surfaced across Ex1–Ex3)
8. Lecture — [How this training was built](./#lectures-how-this-training-was-built) (arc closer; names compound engineering)

**Learning goals.** Student can:

- Run an orient → fix → compound → close loop end-to-end on a trivial bug in their own repo.
- Introspect the agent's read of the repo and dig until they find what it's misrepresenting.
- Fix the bug tests-first, root-cause-driven, no plan mode, ship the PR.
- Compound one rule from the session into `./CLAUDE.local.md` and close the bug's ticket via one connector — the first move outside the repo.

**Exercise goals.**

- *Orient and introspect* — Claude reads the repo deliberately; student interrogates the self-report against `/context`. Output: a fresh read of what loaded vs. what didn't.
- *Fix tests-first* — failing test lands before the fix; at least one diff-line push-back; root-cause interrogation between first and second TDD pass; a real PR shipped.
- *Compound and close* — `./CLAUDE.local.md` written from session evidence (not a template); one MCP connector (or `gh`, or manual paste) wires a close-out note into the bug's tracker.

**Trainer cues.** The Connections trick-share calibrates the room — a quiet first beat is a Nordic norm, not no-signal. Bug pick is the single variable that breaks M1: too small (Claude crunches in 30s, no read worth dragging through introspection) or too large (no close in 90 min). The diff-line push-back IS the pedagogy of Fix tests-first; if students skip it the loop's third beat reads as theatre. Connector install can yak-shake; the timebox note exists for a reason — one connector firing on one ticket is the proof, the rest is homework.

</section>

<section class="module-glance" id="m2-glance">

### M2 — Plan mode, done right

**Slot.** Day 1, 10:50–12:00 (Phases 1–4, 1h10) — lunch — 13:15–13:45 (Phase 5 + Debrief + Bridge, 30 min). Lunch at 12:00 sharp IS Phase 5's "stop."

**Big idea.** Reading a plan is finite. The student's own read catches some of it; a second agent walking the decision tree catches the rest. Paired they give a complete read; neither alone does.

**Flow.**

1. Connections — "when did you last approve a plan you didn't really read, and what made you approve?"
2. Lecture — [The whole map](./#lectures-the-whole-map) (opener, 4–6 min; first map reveal — the whole territory, and where the first three modules sit in it)
3. Lecture — [When a plan is good](./#lectures-when-a-plan-is-good)
4. Exercise — [Push back on the plan](./#exercises-push-back-on-the-plan) (60 min; Phases 1–4 before lunch, Phase 5 after)
5. Exercise — [Extract the task-shaping rule](./#exercises-extract-the-task-shaping-rule) (12 min)
6. Lecture — [Where the rule could live](./#lectures-where-the-rule-could-live) (names Slack triage / issue webhook / scheduled read)

**Learning goals.** Student can:

- Run plan mode on a real multi-file task and read the plan for its file list, verification steps, and named assumptions.
- Push back twice on the plan via "keep planning with feedback," surfacing what the agent didn't see.
- Walk down unresolved branches one question at a time, with a recommended answer per branch.
- Pair human read with agent walk-down: read → push-back → walk-down → approve. Spot approval inflation in past plans.
- Extract task-shaping rules from the session into a `.md` file, sharpening at least one before saving.
- Name three shapes for turning a rules file into automation.

**Exercise goals.**

- *Push back on the plan* — student takes a real multi-file task, runs plan mode, sends two push-backs, then second-pass walk-down with Claude asking one-at-a-time. Approve the plan. Don't execute. Compare what the read caught vs. what the walk-down caught — that gap is the skill the module builds.
- *Extract the task-shaping rule* — three to five rules surfaced from the scrollback, at least one rewritten or rejected, saved as a `.md` file at a student-chosen path. Optional: reverse-engineer a real ticket for field-use rules.

**Trainer cues.** Carry the push-backs in cohort delivery — the room won't always push hard the first time. The non-execution is the bet of the module ("Making the plan good IS the work"); if a student wants to run it, name the move and park it. Lunch lands at 12:00 inside the exercise by design — the pause IS Phase 5's "stop." Post-lunch returns to name the design pattern.

</section>

<section class="module-glance" id="m3-glance">

### M3 — Earn the trust

**Slot.** Day 1, 14:05–15:55 (1h50). Closes with the M4 task-pick homework — that homework is what makes M4 fit in 90 minutes on Day 2.

**Big idea.** Before the agent runs bigger work alone, earn your staff engineer's and CISO's trust on a small piece shipping this week. Two curated skills do the security work; one authored skill does the quality work. Team-kit accretion starts here, personal-first.

**Flow.**

1. Connections — "what's the feature, and what surface are you most nervous about a teammate missing in review?"
2. Exercise — [Open the side quest](./#exercises-open-the-side-quest) (~5 min; `git worktree add` for a parallel session — main quest is security in primary repo, side-quest is quality in sibling worktree)
3. Lecture — [Skills from the frontier, skills of your own](./#lectures-skills-from-the-frontier-skills-of-your-own)
4. Exercise — [Map the access surface](./#exercises-map-the-access-surface) (20 min; curated `access-control-analysis` skill as subagent)
5. Exercise — [Threat-model with STRIDE](./#exercises-threat-model-with-stride) (20 min; curated `stride` skill; one ADR ships)
6. Exercise — [Author your test-strategy skill](./#exercises-author-test-strategy-skill) (18–22 min; authored through conversation, self-critique, invoke on real feature)
7. Lecture — [The loop half, filled in](./#lectures-the-loop-half-filled) (consolidation closer, 8–10 min; names the near half of the map whole after three modules of loop work; fires after the skill-sharpen, before the session clear)

**Learning goals.** Student can:

- Invoke a curated access-control skill on a shipping feature (subagent, fresh context) and name what their first read missed.
- Apply curated STRIDE to the mapped surface, pick one threat worth hardening, write an ADR in the repo's convention.
- Split jobs subagent vs. main thread: breadth-first curated reads to subagent; one-question-at-a-time authoring stays main-thread.
- Author a test-strategy skill through conversation (one question at a time), tuned to the codebase's actual conventions.
- Test the skill by asking it to disclose its weakest part, push back on the critique, invoke on the security-tested feature.
- Ship one authored skill personal-first, and know when it's a team PR.

**Exercise goals.**

- *Open the side quest* — worktree opened; both Claude Code sessions running on the same git history with isolated scrollback.
- *Map the access surface* — short delta-note in the repo: surfaces the skill called out harder than the student would have, plus surfaces the student knew mattered that the skill missed. The delta IS the artifact, not the raw skill output.
- *Threat-model with STRIDE* — one ADR in repo convention, one threat chosen for hardening, rest of STRIDE output stays as evidence (not a hardening backlog).
- *Author your test-strategy skill* — one `SKILL.md` tuned to the codebase's actual testing conventions (framework, mocking policy, integration boundary, flakiness, regression scope) shipping to the student's personal skills folder. Strong team-PR candidate, but the PR starts with a human conversation.

**Trainer cues.** The `security-tools` easter egg fires the first time `threat-model-with-stride-1` runs; pause two beats after the ASCII face. **See [M3, the security-tools surprise](trainer-guide.html#m3-the-security-tools-surprise) in the trainer guide for framing and don't-spoil rules.** Authoring without invocation is theatre — catch students hand-crafting `SKILL.md` in a file tab and steer them back to conversation. M3 closes with the M4 task-pick homework instruction; don't drop it.

</section>

<section class="module-glance" id="m4-glance">

### M4 — Run the first experiment

**Slot.** Day 2, 08:30–10:00 (1h30, compressed from 1h45). Phase 1 is a 2-min confirm because the task came in as M3 homework.

**Big idea.** Walk what's been built across four modules against a real task; fill the worst gaps; send the task off un-packaged in the same session; learn from what the agent does with the system as it stands. The un-packaged send-off is intentional — it teaches M5 what packaging adds.

**Flow.**

1. Connections (compressed to 5 min — cohort is warmed up from Day 1)
2. Lecture — [The far half of the map](./#lectures-the-far-half) (opener, 3–5 min; the far-half map reveal — quick feedback goes quiet, the result arrives all at once)
3. Lecture — [The ironies of automation](./#lectures-ironies-of-automation) (framing opener, ~2–3 min; names the trap built into the far half — vigilance erodes exactly as you earn trust in the long run; promoted from supplementary 2026-07-03, sits after the far-half and before the agent loop. Framing only — arms the lens, doesn't teach the fixes; the lecture's own Time line caps it at 2–3, "past 3 it has started teaching the fixes")
4. Lecture — [The agent loop](./#lectures-the-agent-loop) (~5 min; names the machine that keeps stepping; three prompts run on the live session that carries the send-off)
5. Lecture — [Test and learn](./#lectures-test-and-learn)
6. Exercise — [Walk and send off](./#exercises-walk-and-send-off) (55 min; pick 10 / walk-and-fill 35 / see-the-frame 10)
7. Send-off (~5 min, single prompt paste — owned by the module file, not the exercise)
8. Lecture — [Will company memory emerge?](./#lectures-will-company-memory-emerge) (fires while the agent runs; reflective coda; leaves the run open for M5)

**Learning goals.** Student can:

- Scope a real send-off task in conversation with Claude — multi-file reasoning, sustained coherence, not step-by-step nudging.
- Walk what they've built (`CLAUDE.md` + `CLAUDE.local.md` + `observations/` + ADRs + authored skills + connectors) against the task as a subagent audit; push back on the audit.
- Fill the worst gaps in conversation: observations written, rules sharpened, business-rules pointer wired (or named explicitly as a gap).
- Name Huryn's three blocks in their own material: Block 1 (observation → hypothesis → rule), Block 2 (decisions + alternatives), Block 3 (quality criteria).
- Send the task off un-packaged in the same Claude Code session and let it run.

**Exercise goals.**

- *Walk and send off* — system walked against the task; gaps filled; Huryn's three blocks named in the student's own material (the frame names what's already there, not a template to fill); tree settled before Debrief. The un-packaged send-off fires at close and runs into the M4→M5 break.

**Trainer cues.** Drop Connections from 10 to 5; cut Bridge (the 20-min break absorbs the transition); compress Phase 2→3 banter to ~5 min if tight. Expect the "memory is overrated, we should have a company brain" objection during the closing lecture — that's where it lands. Run the company-layer question as open, not settled. **Memory-word allergy:** some engineers react against the auto-memory framing; acknowledge it's legitimate against Claude Code's `/memory`, then point at the disambiguation in `walk-and-send-off.md` Phase 2.

</section>

<section class="module-glance" id="m5-glance">

### M5 — Learn from the test, re-send packaged

**Slot.** Day 2, 10:20–12:20 (2h, 15-min cushion over budget). Packaged re-send fires at close (~12:20) and runs through lunch.

**Big idea.** Read the un-packaged M4 run through three failure-mode lenses; build the validation that would have caught each; assemble the reference and `plan.md`; re-send the same task packaged in the same session. The contrast IS the lesson.

**Flow.**

1. Lecture — [Reading the return](./#lectures-reading-the-return)
2. Lecture — [Learning through contrast](./#lectures-learning-through-contrast)
3. Exercise — [Diagnose and re-send](./#exercises-diagnose-and-resend) (65 min; Phases 1–4)
4. Debrief + re-send (15–20 min; owned by the module file; worktree setup demo here)
5. Lecture — [What packaging is](./#lectures-what-packaging-is) (closer; Ronacher's three-pattern earned from felt evidence — don't squeeze it)
6. Lecture — [The gate is a claim too](./#lectures-the-gate-is-a-claim) (final closer, 6–8 min; names the fallibility of the verifier the student just built — the gate is a claim, not proof. Promoted from supplementary 2026-07-03, lands after What packaging is. Two back-to-back closers: budget packaging ~12–15 + gate 6–8 against the 1h45 runtime)

**Learning goals.** Student can:

- Diagnose the un-packaged M4 send-off through three named lenses — goal drift, context rot, plausible-but-wrong — with quoted moments per lens.
- Pair each failure mode with the packaging that catches it: drift ↔ reference artefact, rot ↔ `plan.md`, plausible-but-wrong ↔ external verifier.
- Build a verifier shaped against the dominant failure (background-agent / shell-hook / Ralph re-feed).
- Assemble reference + `plan.md` in conversation, scoped to the same M4 task.
- Re-send the packaged version of the same task in the same session and let it run a second time.

**Exercise goals.**

- *Diagnose and re-send* — student ends with: a diagnosis (named failures + quoted moments from their own artefact), a working verifier targeting one specific failure mode, and reference + `plan.md` scoped to the same M4 task. Each piece earns its place against a real failure, not a slide.

**Trainer cues.** The 15-min cushion goes to worktree setup (real engineering, students fumble) and the two closing lectures (What packaging is → The gate is a claim too) — don't compress them; the pair IS the lesson. At close, the packaged re-send fires and runs through lunch. After lunch, the re-entry window is for nudging a stalled agent (the dark-humor "Continue" prompt still works) and settling in; then M6 opens fresh at the same worktree path.

</section>

<section class="module-glance" id="m6-glance">

### M6 — Spot gaps, build the loop

**Slot.** Day 2, 13:50–15:35 (1h45). Opens with M6 reading both runs from disk BEFORE writing anything. Lecture-dense by design — **see [M6, lecture-dense by design](trainer-guide.html#m6-lecture-dense-by-design) in the trainer guide for the full lecture stack and pacing notes.**

**Big idea.** Two runs of the same task (un-packaged M4, packaged M5) are enough evidence to name what the three-pattern didn't anticipate, route the gap to its home (memory / verifier / new skill), and author a session-shaper skill through conversation so future-you inherits the lesson.

**Flow.**

1. Re-entry (~15 min; nudge stalled M5 run, open M6 in fresh session at same worktree, read both runs before writing)
2. Lecture — [The 2 frontiers](./#lectures-the-2-frontiers) (opener)
3. Lecture — [Story of Module 6](./#lectures-story-of-module-6) (opener; permission-giving memo from this module's own generation)
4. Lecture — [Quality is grounding](./#lectures-quality-is-grounding) (opener-bridge, 4–6 min; names the quality arc M1→M6)
5. Exercise — [Spot gaps, build the loop](./#exercises-spot-gaps-build-the-loop) (40–50 min; diff two runs, route, author second skill)
6. Lecture — [Composing the workflow](./#lectures-composing-the-workflow) (closer-area teacher; 3–4 min; the passage chart re-labelled with the student's kit + the four composition mechanisms)
7. Lecture — [The loop has a name](./#lectures-the-loop-has-a-name) (closer; names *eval* from the just-built second skill)
8. Lecture — [The map, filled in](./#lectures-the-map-filled-in) (final theory closer, 8–10 min; the whole map drawn solid across M1–M6)
9. Lecture — [Agents that build agents](./#lectures-agents-that-build-agents) (forward closer; the training's closing beat, dead-last per the 2026-07-03 re-sequence)

**Learning goals.** Student can:

- Diagnose the gaps two runs of the same task surface.
- Route each gap to its home: memory (rules that would have prevented the mistake), sharper verifier, or new skill.
- Cut one rule from `./CLAUDE.local.md` the diagnosis killed.
- Author a session-shaper skill through conversation, ship to personal kit.
- Map evals across verifier (deterministic), judge (LLM-based), gate (in CI).
- Encode the lesson so the next loop inherits it.

**Exercise goals.**

- *Spot gaps, build the loop* — one-screen gap map across memory / verifier / rules / skill, plus one `SKILL.md` at `~/.claude/skills/session-shaper/SKILL.md` (auto-discovered in every future session). Team-kit candidates flagged for human conversation, not auto-PRed.

**Trainer cues.** Practitioner-fluency register, not lecture-hall — invite student reflection between lectures. Two beats of silence is fine; Nordic engineers think before speaking. The composition lecture has no separate drill; Phase 2 of *Spot gaps, build the loop* (the work-shape / primitive scan) is the lived entry to composing. If a student asks where the composition exercise is, point them at that Phase 2 first, then the [workflow-composition-lineages supplementary](./#supplementary-workflow-composition-lineages) for the field survey. Dino's [skill-stacking system](./#supplementary-skill-stacking) is the worked example. Pacing: if energy is high give the lineage conversation room; if low, name fewer lineages and move to the closer pair faster.

</section>

<!-- maintainer — 2026-07-03: theory-spine lecture beats reconciled against the 2026-07-02 module rework. Added the-machine-you-just-met (M1 closer), the-whole-map (M2 opener), the-loop-half-filled (M3 consolidation closer), the-far-half + the-agent-loop (M4 openers), the-map-filled-in (M6 final closer). Flow beats renumbered per module. Anchors follow the built #lectures-<slug> convention; they resolve once the integration build inlines the new lectures. -->
<!-- maintainer — 2026-07-03 (eyeball-queue #14): reconciled trainer-modules against the same-day 2026-07-03 close rework in the module .md files. (1) M4 open — added the-ironies-of-automation beat between the-far-half and the-agent-loop (newly promoted supplementary→lecture per run-the-first-experiment.md § Start here); ~2–3 min framing opener, matching the lecture's own Time-line cap (NOT the 5–7 the eyeball note guessed — the lecture author explicitly caps at 2–3, "past 3 it has started teaching the fixes"). M4 flow renumbered 2→8. (2) M5 close — added the-gate-is-a-claim-too as final closer after What-packaging-is (newly promoted supplementary→lecture per learn-from-the-test.md), 6–8 min matching its lecture Time line; M5 trainer cue updated to name two closers. (3) M6 close — swapped so the-map-filled-in is penultimate and agents-that-build-agents is dead-last, per the 2026-07-03 re-sequence recorded in spot-gaps-build-the-loop.md; dropped the stale "training's last beat" tag from map-filled-in. M1/M2/M3 beat lists cross-checked against their module files, already current. Anchors follow the built #lectures-<slug> convention (ironies → #lectures-ironies-of-automation, gate → #lectures-the-gate-is-a-claim). -->
