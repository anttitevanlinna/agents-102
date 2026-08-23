## AE101 Trainer Handbook

The one trainer doc. **Start here** once; the module tab open during each sitting. The URL hash holds the tab. The workbook page carries the content; this page carries only what the workbook doesn't say.

<nav class="module-tabs" aria-label="Trainer handbook tabs">
  <a href="#start-glance">Start here</a>
<!--flag:module:getting-going-->  <a href="#m1-glance">M1 · Getting going</a>
<!--/flag:module:getting-going--><!--flag:module:plan-mode-done-right-->  <a href="#m2-glance">M2 · Plan mode</a>
<!--/flag:module:plan-mode-done-right--><!--flag:module:earn-the-trust-->  <a href="#m3-glance">M3 · Earn the trust</a>
<!--/flag:module:earn-the-trust--><!--flag:module:run-the-first-experiment-->  <a href="#m4-glance">M4 · First experiment</a>
<!--/flag:module:run-the-first-experiment--><!--flag:module:learn-from-the-test-->  <a href="#m5-glance">M5 · Learn from the test</a>
<!--/flag:module:learn-from-the-test--><!--flag:module:spot-gaps-build-the-loop-->  <a href="#m6-glance">M6 · Spot gaps</a>
<!--/flag:module:spot-gaps-build-the-loop--></nav>

<section class="module-glance" id="start-glance">

### Start here

**The job.** Engineers who already use Claude Code; don't teach it from zero. You project the workbook page, demo each prompt slowly on your own repo, the room copy-pastes into theirs. Time budget is `max(trainer, student)`. There is no private trainer pane — keep this tab open in a second browser tab. Anything about delivery architecture: ask your delivery contact, don't improvise it.

**Prep.** The TTT was the prep. Keep its artefacts (rules file, branches, `task.md`, transcripts): they are your demo starting states, listed per tab. Before each sitting, re-run only the beats you fumbled, then walk the prompt chain against the tab. Lectures have a floor: reading the projected slide aloud is acceptable delivery — the bar is fielding one question.

<!--flag:module:spot-gaps-build-the-loop-->**Two-day cohort schedule.** Default rhythm: 08:30 start, 1h15 lunch, 20-min breaks. Commitments: M1–M3 Day 1, M4–M6 Day 2, lunch between M5 and M6 so both async sessions produce something M6 can read.

| Day 1 | Block |
|---|---|
| 08:30 – 10:30 | M1 (2h) |
| 10:30 – 10:50 | Break |
| 10:50 – 12:50 | M2 (2h, straight through) |
| 12:50 – 14:05 | Lunch |
| 14:05 – 16:05 | M3 (2h) — closes with the M4 task-pick homework |
| 16:05 – 16:20 | Closing Day 1 |

| Day 2 | Block |
|---|---|
| 08:30 – 10:30 | M4 (2h) |
| 10:30 – 10:50 | Break |
| 10:50 – 12:50 | M5 (2h) — the arc's biggest overrun; start the worktree fork the moment the room settles |
| 12:50 – 14:05 | Lunch — the packaged re-send runs through it |
| 14:05 – 16:05 | M6 (2h) — fresh session at the same worktree; read both runs from disk before any write |
| 16:05 – 16:20 | Closing Day 2 |

Don't split M4 across the days. The M1-M2-M4 / M5-M3-M6 reorder exists; it's a call with your delivery contact, not solo.<!--/flag:module:spot-gaps-build-the-loop--><!--flag:no-module:spot-gaps-build-the-loop-->**Sittings.** One module per weekly sitting, in tab order, at the budget on the tab's Slot line. Open every sitting after the first by naming last week's state and the artefact this module expects; messy state is data.

**Between sittings — the chain that breaks.** Each sitting consumes what the last one left on the student's laptop, and a week is long enough to lose it. Send one reminder mid-week, two lines, with the item below. A student who arrives without it is picking or regenerating while the room is already moving.

| Gap | Must exist at the next sitting |
|---|---|
| 1 → 2 | One multi-file backlog task. Not an epic. |
| 2 → 3 | The send-off task, sized: bigger than a typo-fix, smaller than an epic. Wrong size here is the failure nothing downstream can fix. |
| 3 → 4 | The `m4/<slug>` branch and `task.md` with its coordinates, untouched since the sitting. A stopped run counts; a run somebody "tidied up" during the week doesn't. |

**You are their colleague on Monday.** That is the reason to let a weak run stand, not the reason to rescue it. The M4 run is supposed to underdeliver; M5 has nothing to diagnose if you fixed it.<!--/flag:no-module:spot-gaps-build-the-loop-->

**Craft that isn't on the workbook page.**

- Quote before summary: if Claude can't quote the line, diff, commit or transcript moment, the claim doesn't carry.
- Task size is pedagogy and the most common failure. Push early, both directions.
- Teach the shipped prompt; show a better way only when you have one — never on a send-off prompt, its under-specification is the curriculum.
- Don't front-run the next module. A move that's right in real life can still be wrong before the curriculum earns it: name it, park it.
- Never clear scrollback mid-phase; chains depend on what just happened.
- Mood: each tab names a target, a Check and a Fix. Never poll the room. Run the Check; if the target's visibly absent, run the Fix.
- One broken laptop: 30 seconds, then a buddy. The room-agreement slide already said you're not the debugger — mean it.
- Narrate agent waits; never apologize for them.
- Quiet first beat is a Nordic norm, not no-signal. Make the opener concrete.
- Fast room: deeper, not padded. Slow room: cut asides, don't sprint.

**After each sitting.** Note what slipped and what fired while it's fresh; send it to your delivery contact (ArcticRex).

</section>

<!--flag:module:getting-going-->
<section class="module-glance" id="m1-glance">

### M1 — Getting going + context

**Slot.** 2-day cohort: Day 1, 08:30–10:30 (2h). Four-sitting track: sitting 1, 2h. Thinking effort `high`.

**Runtime map.**

{{runtime-map:getting-going}}

**Mood.** Joyful creation, *"it works, on my repo."* Check: the student narrates the fix as a TDD move they'd have done anyway. Fix: name what was agentic — orient → fix → close → compound on their repo, a close-out in their team's register, a rules file born from the session.

**Cues.** Two minutes on the room-agreement slides, inside the opening ten; not a policy lecture. *How this training was built* is Antti's first-hand story: read it in narrator voice, the opening line says so. Bug pick is the one variable that breaks M1: too small (30-second fix, nothing worth introspecting) or too large (no close in the slot). Nothing is homework; the loop finishes in the room.

**Push-backs.**

- Claude jumps to a fix → *"Back up. What's the failing test that would prove this bug exists?"*
- Diff approved under 30 s → *"Find me one line you'd have written differently. Not wrong, just different."*
- Introspection prompt skipped → *"What did Claude choose not to read, and does that match what you expected?"*
- All five tracker rules accepted → *"Which of the five did the agent guess at?"*
- Close-out shipped unread → *"Read it against the comments already on that ticket. Same team?"*
- Rules file accepted unread → *"Read it aloud. Would a teammate run the same loop from this in six months?"*
- Compound summary name-drops without quoting → *"Quote the session moment that earned rule X, or take it out."*

**Gotchas.**

- No test infrastructure on the bug's path → log "no verifier on this path" as a rule; a real finding, M4's audit picks it up.
- `/context` read as prose → *"Type it. Look at the number."*
- Fix over 35 min: the bug wasn't trivial. Let it finish, trim the compound exercise. Under 15 min: too small; offer a second bug.
- No connector and no `gh` → the agent writes the close-out, the student pastes it. Don't stop the room to install anything.
- Connector added live and not showing → `/mcp`; then `claude --resume <session-id>`. One student, not the room.
- No ticket → the agent offers to create one; tracker unreachable → markdown ticket in the repo, link the PR.
- Wizard-move demo: all windows incognito (ghost icon, outside a project). Cross-chat memory leaks window 1 into window 2. If window 2 answers Finnish-adjacent anyway: *"It remembered — the lecture's point one step early."* Run a third window clean.

**If behind, cut in order.** 1. The two optional Fix tests-first prompts. 2. Close the ticket's second-ticket suggestion and the push-back-on-five paragraph (~15 instead of 20). 3. Orient and introspect at its 15-min floor. 4. Connections and lecture framing. Never: the failing test before the fix, the diff-line push-back, the conventions read before the close-out.

**Demo repo.** Owned, active repo, clean tree; a trivial bug from prework ready to paste. Regenerate: rerun the prework bug-surfacing conversation.

</section>
<!--/flag:module:getting-going-->

<!--flag:module:plan-mode-done-right-->
<section class="module-glance" id="m2-glance">

### M2 — Plan mode, done right

**Slot.** 2-day cohort: Day 1, 10:50–12:50 (2h, straight through). Four-sitting track: sitting 2, 2h. Phase 5 follows Phase 4 directly; the exercise's own "Stop" carries the beat. **Runs 3 min past its slot**, so know the cut list. Thinking effort `medium`.

**Runtime map.**

{{runtime-map:plan-mode-done-right}}

**Mood.** Grounded competence, *"two reads, not one."* Check: at Phase 5 the student says the second read caught everything. Fix: point at the soft item their push-back caught that the second read re-softened.

**Cues.** The non-execution is the module's bet; a student who wants to run the plan: name it, park it. The Debrief has no projected section by design: Claude proposes a plan-reading rule, you push for one specific to this codebase. *How instructions grow* ends with `ae101-m2-name-what-moves` run live on your demo repo: your `./CLAUDE.local.md` must hold one rule that obviously belongs in a skill, or the demo returns "none" and the room sees nothing move.

**Four-sitting cut.** No M3, so this sitting closes on the M4 task-pick (the module's own `## Next`). Hold five minutes for it and say it out loud; it is the one piece of homework the track has, and sitting 3 is built on it arriving sized.

**Push-backs.**

- Approved under 60 s, nothing sent → *"Pick No, keep planning. Send one soft item first."*
- Push-back names no step, no words → *"Which step, which words? What would a senior reviewer catch?"*
- Revised plan no sharper → *"Did it sharpen, or acknowledge and re-soften? Again."*
- Stops after two questions → *"What would the next question still change in execution? Nothing material → lock it."*
- Debrief rubric is generic → *"A pattern specific to THIS codebase, from THIS session."*

**Gotchas.**

- **The integrate prompt can wipe the rules file.** `./CLAUDE.local.md` is gitignored, no git undo. Watch the diff: add, not replace. Overwritten → the old rules are in this session's scrollback; ask Claude to restore them before the session closes.
- No fitting task → three-candidate conversation: multi-file, 30–60 min of agent work, touching the wrong file matters.
- A walk-down turn crawls past 10 min → stop it, ask what's slow, relax that requirement.
- The plan file is laptop-local (`~/.claude/plans/`); teammates never see it unless copied into the repo.
- A shell command runs during plan mode → pre-approved commands do; expected.
- Walk-down done under 15 min → task too small; name the floor at Debrief (~30 min of agent work).

**If behind, cut in order.** 1. Lecture's three-pressures section to 60 s. 2. Timebox the walk-down: approve the latest sharpened plan, go to Phase 5. 3. Debrief to 10 min, keep the pattern-naming. Never: Phase 5's stop.

**Demo repo.** M1's `./CLAUDE.local.md` and the shipped fix; a multi-file backlog task surfaced. Regenerate: rerun M1's compound prompt; three-candidate conversation for the task.

</section>
<!--/flag:module:plan-mode-done-right-->

<!--flag:module:earn-the-trust-->
<section class="module-glance" id="m3-glance">

### M3 — Earn the trust

**Slot.** Day 1, 14:05–16:05 (2h). Closes with the M4 task-pick homework; don't drop it.

**Runtime map.**

{{runtime-map:earn-the-trust}}

**Mood.** Earned trust. Check: STRIDE framed as a checkbox. Fix: point at the ADR, a real call under named pressure.

**Cues.** Authoring without invocation is theatre: catch students hand-crafting `SKILL.md` in a file tab, steer back to conversation.

**The `security-tools` surprise.** Prework installed it as a generic pre-flight. The first STRIDE prompt invokes it; the script runs a few plausible checks (first line *"owning you............ ok"*), then prints a rick-rolled ASCII face and a note: tarball, SKILL.md, Bash authorization, all trusted unread. External skills are a supply-chain vector; that's the lesson.

- Don't spoil it. Asked early: *"a pre-flight check; you'll see it run in M3."*
- When it lands, show your terminal verbatim. Two beats of silence after the face.
- Then two minutes: every link got trusted; this is the module's own access-surface logic one level up; this is why curated beats random.
- Students who read `check.sh` first: *"you noticed — that's the lesson."*
- Doesn't fire (install failed, Claude paraphrases) → press on; the SKILL.md body carries the text. Fix installs after, not from the front.
- Sponsor wants it removed → leave the slot empty rather than substitute something serious-but-thin.

</section>
<!--/flag:module:earn-the-trust-->

<!--flag:module:run-the-first-experiment-->
<section class="module-glance" id="m4-glance">

### M4 — Run the first experiment

**Slot.** 2-day cohort: Day 2, 08:30–10:30 (2h). Four-sitting track: sitting 3, 2h. Phase 1 is a 2-minute confirm because the task came in as homework. Runs uncompressed at 2h.

**Runtime map.**

{{runtime-map:run-the-first-experiment}}

**Mood.** Curious readiness. Check: *"is this enough?"* on repeat through Phase 2. Fix: *"enough is a question for M5; the experiment is the point."*

**Cues.** M4 is deliberately incomplete. Start the closing lecture only once the un-packaged session is running; three conditions only (durable state, feedback, a boundary), one question: *"what in this session can notice a wrong step without you?"* Observation, not repair; don't name M5's artefacts. Memory-word allergy: some engineers bristle; grant the criticism of auto-memory, then point at the distinction — `observations/` is files they wrote, gitignored, read when a prompt names the path.

**Push-backs.**

- Gap deferred as "architectural, not contextual" (the highest-stakes one) → *"If the audit calls it context, it's context. M5 needs an interesting failure, not a boring one. Fill it."*
- Wants a plan.md or verifier before sending → *"Un-packaged is by design. Don't pre-empt M5."*
- Tries to close all five gaps → *"Three is the budget."*
- Hesitates at the final prompt → *"Stop it when you've seen enough. Traces are data."*

**Gotchas.**

- Typo-fix or quarter-long epic at Connections → three-candidate conversation. Downstream prompts cannot rescue the wrong task.
- Audit returns 12–15 items → re-run with the ranked top five enforced.
- The gap-fill question tool caps at four options; print the fifth as a note.
- Markers missed → *"Read me back the branch and the short SHA. Noted somewhere you'll find at M5?"* The fork depends on exactly those.
- Laptop sleep freezes the session: awake, plugged in, lid open. Stop only after a tool call finishes; mid-call interrupts can corrupt the transcript.
- Agent stalls → the module body has the nudge prompt. A handful is the dose; past ten the student has become the agent.
- **Do not improve the send-off prompt.** The show-a-better-way license doesn't apply here.
- No business-rules layer → the gap is the finding; one line in `observations/`.

**If behind, cut in order.** 1. Connections 10 → 5. 2. The Bridge. 3. Phase 2→3 banter to ~5 min. Never: the send-off, and never rescue the run.

**Demo repo.** Task picked and scoped, "done" nameable in one sentence; M1–M2 artefacts present; unrelated WIP committed or branched, the closing commit snapshots the tree. Regenerate: three-candidate conversation; rerun M1's compound and M2's extract prompts.

**Four-sitting cut.** No M3: the task-pick came from M2's close; the audit's conditional phrasing ("any skills you've authored", "any ADRs") resolves cleanly against the repo's existing conventions. Before the room leaves: branch, SHA and transcript path read back aloud; the run will finish days before sitting 4 and a stopped run counts; nobody touches the `m4/` branch during the week.

</section>
<!--/flag:module:run-the-first-experiment-->

<!--flag:module:learn-from-the-test-->
<section class="module-glance" id="m5-glance">

### M5 — Learn from the test, re-send packaged

**Slot.** 2-day cohort: Day 2, 10:50–12:50 (2h; the re-send fires at close and runs through lunch). Four-sitting track: sitting 4, the finale. **Runs about 13 min past 2h by design; plan for it, don't cut for it.** Book 2h15 if you can; if not, end on the gate lecture's last landed slide and point at the rest, the closing decks read headings-first. Start the fork the moment the room settles.

**Runtime map.**

{{runtime-map:learn-from-the-test}}

**Mood.** Learning through contrast. Check: at Phase 3 the student picks the safest verifier shape regardless of their failure. Fix: *"the verifier matches the failure, not the comfort. Which was yours?"*

**Cues.** Headroom goes to the worktree fork (students fumble it) and the two closing lectures; trim the front, never the closers. Land each closing slide's header and bolded handle, never read the bullets. Word embargo: don't say *three-pattern* or *Ronacher* before the closing lecture; the felt evidence earns the name there.

**Push-backs.**

- Eight failures listed → *"Pick the dominant. The verifier fits one shape."*
- Failures framed as own fault → *"The run was supposed to underdeliver. Quote me one moment of goal drift."*
- Verifier shape mismatches failure → *"Qualitative wants a judge. Deterministic wants a hook. Drift wants a re-feed."*
- Rewrites `CLAUDE.local.md` instead of a task-scoped reference → *"The reference lives next to plan.md. The rules file is for the codebase."*
- Hesitates at the second send-off → *"Same task, packaged. The point is the contrast, not nailing it."*

**Gotchas.**

- **Wrong window.** The exercise session must be in the worktree. Enforce before Phase 1.
- The fork sketch shows a literal `../<repo-name>-m5`; if Claude creates that directory name, stop it and give the real one.
- Check the copy landed: the fork output must name both `CLAUDE.local.md` and `observations/` at the worktree path, or you've changed two variables.
- Coordinates missing → the SHA Claude reported before the send-off; failing that, the merge-base of the `m4/` branch. The exercise body carries all three rungs.
- **No M4 artefact at all** → the student runs M4 now, compressed, on their own repo; 15–30 min of run is enough; they trail the room and finish M5 as homework. Never hand them a stand-in artefact.
- Thin artefact (closed laptop, out of credit) → *"the artefact is whatever's there: commits, modified files, the transcript under `~/.claude/projects/<project>/`."*
- Verifier won't wire as a hook → run it manually by prompt, that counts; don't burn the slot on hook registration.
- Re-send report reads polished → ask for the artefacts that didn't ship and the verifier output verbatim.

**If behind, cut in order.** 1. Phase 4 at a half-page reference + half-page plan.md. 2. Take verifier time from Phase 4. 3. Force a single dominant failure past 20 min of diagnosis. Never compress the two closing lectures.

**Demo repo.** The `m4/<slug>` branch with its starting-point commit; `task.md` with `Run coordinates`; the M4 transcript; `CLAUDE.local.md` and `observations/` ready to copy. Regenerate: rerun M4's send-off section, let it run 15–30 min.

**Four-sitting cut.** No M3: only M1's rules and M4's observations cross into the worktree; the re-send's conditional requirements on a test-strategy skill and STRIDE ADRs resolve to absent. This sitting is the finale: the bring-home closes the exercise; the module closes on *Inspect your results* and the map's last read. The packaged return lands after the sitting ends and nobody reads it with you — say so, and say the workbook carries the read.

</section>
<!--/flag:module:learn-from-the-test-->

<!--flag:module:spot-gaps-build-the-loop-->
<section class="module-glance" id="m6-glance">

### M6 — Spot gaps, build the loop

**Slot.** Day 2, 14:05–16:05 (2h). Opens by reading both runs from disk before writing anything; the re-entry beat covers nudging an M5 session still running from before lunch. Lecture-dense by design.

**Runtime map.**

{{runtime-map:spot-gaps-build-the-loop}}

**Mood.** Practitioner fluency, competence as posture. Check: a beat reads as compliance, paperwork, or trainer monologue. Fix: hand the read back to the room.

**Cues.** The close runs lecture after lecture by design; you are one voice among several. Invite reflection between lectures with open prompts, not Q&A; two beats of silence is fine. Composition has no drill: Phase 2 of the exercise is the lived entry, the lineages supplementary is the survey. On *You make agentic happen*, read the three orders off the slide, then say what the body leaves unsaid: Ralph is all three at full size. Low energy: chart, four mechanisms, point at the supplementary, move to the closer pair.

</section>
<!--/flag:module:spot-gaps-build-the-loop-->

<!-- maintainer — tab contract: every module tab and its nav link sit inside a matching `flag:module:<slug>` pair, so a cut's handbook carries a tab exactly when the cut runs that module. build-workbook.js resolves this file from the parent contentKey and applies the flags against the cut's own module list. A new tab needs its flag pair in BOTH the nav strip and the section. The Start here tab's two-day schedule is keyed on `module:spot-gaps-build-the-loop` (M6 = six-module sentinel); the `no-module:` branch carries the weekly-sittings contract and the between-sittings chain. The Four-sitting paragraphs on M2/M4/M5 are unflagged on purpose: flags do not nest, and the parser throws on the inner pair. Runtime maps are placeholders expanded from `scripts/calculate-time.js`; no tab states a total or verdict of its own. Scope rule (2026-08-23): Slot, runtime map, mood Check/Fix, verbatim push-backs, gotchas, cut order, demo state. No Flow, no exercise goals, no Big idea — the projected workbook page carries those. -->
