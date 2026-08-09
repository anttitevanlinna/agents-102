## AE101 Trainer Handbook

The one trainer doc. **Start here** is the delivery contract — read it once before your first cohort. The module tabs are run sheets — open the module's tab before and during each session. The URL hash holds the selection so you can share or bookmark a tab.

**Format note.** The M1, M2, M4, and M5 tabs are full run sheets: runtime map, verbatim push-back lines, escape hatches, cut order, and demo-repo starting state, built for a peer trainer delivering without author context.<!--flag:module:spot-gaps-build-the-loop--> The M3 and M6 tabs are shorter glances.<!--/flag:module:spot-gaps-build-the-loop-->

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

### Start here — the delivery contract

**Who this training is for.** Software engineer ICs who already use or have seen Claude Code. Do not teach Claude Code from zero. The job is to turn uneven self-taught usage into an engineering loop that compounds: run the work, read what happened, encode the lesson into repo rules, skills, and verifiers. Delivery architecture (platform, content folder vs. the student's real repo, session boundaries) is settled maintainer-side; the operating facts you need in the room are all in this handbook — for anything deeper, ask your delivery contact.

**Operating contract.**

- You project the workbook page. There are no slides. You demo each prompt slowly on your own Claude Code while the room copy-pastes into theirs; honor the conversation pauses in the exercise body.
- Your screen is shared most of the session; there is no private trainer pane. Keep this handbook's module tab open in a second tab.
- The time budget is `max(trainer, student)`, not trainer time plus student time — everyone runs concurrently.
- You carry the push-backs. The run-sheet tabs list them verbatim.
- Weekly cadence: open every non-first session by naming last week's state and the artifact this module expects. Messy state is data, not a moral failing — the artifact is whatever exists.

**Prep per session.** The train-the-trainer run-through was the primary prep: you did the exercises on your own repo, and the artifacts it left (rules files, branches, session coordinates, transcripts) are your demo-repo starting states. Keep them. Then, per session:

- **Re-run what staled.** Bring your demo repo to the module tab's "Demo repo starting state"; re-run only the beats you fumbled at the TTT. Skipped the TTT? The full dry-run is on you — for M4→M5 that is a working day plus the send-off wait, and a 15–30-minute send-off session produces all the rehearsal material you need.
- **Rehearse, don't run.** Read the module page; walk the prompt progression against the tab (what each prompt depends on, what evidence it leaves). Lectures have a floor: reading the projected slide aloud is acceptable delivery — the bar is fielding one question, not performing from memory. Note two or three moments from your own sessions to narrate during agent waits.
- **Have ready.** This tab's module sheet; sponsor homes confirmed (ADRs, rules file, ticket tracker, team kit); the fallback-repo answer — a student whose repo doesn't fit builds their own in ~15 minutes via the build-a-project-from-zero supplementary, nothing to provision.

<!--flag:module:spot-gaps-build-the-loop-->**Two-day cohort schedule.** (Weekly sittings: one module per sitting at the tab's sitting column.) Default rhythm: 08:30 start, 1h15 lunch, 20-min breaks; adjust to your sponsor's cadence. Architectural commitments: M1–M3 on Day 1, M4–M6 on Day 2, lunch between M5 and M6 so both async sessions have time to produce something M6 can read.

| Day 1 | Block |
|---|---|
| 08:30 – 10:30 | M1 (2h) |
| 10:30 – 10:50 | Break |
| 10:50 – 12:00 | M2 part 1: Connections + Lecture + Exercise Phases 1–4 |
| 12:00 – 13:15 | Lunch — lands mid-M2 by design; the pause IS Phase 5's "stop" |
| 13:15 – 13:45 | M2 part 2: Phase 5 + close |
| 13:45 – 14:05 | Break |
| 14:05 – 15:55 | M3 (1h50) — closes with the M4 task-pick homework, which is what makes M4 fit 1h30 |
| 15:55 – 16:10 | Closing Day 1 |

| Day 2 | Block |
|---|---|
| 08:30 – 10:00 | M4 (1h30 compressed: Connections 5, Bridge cut, Phase 2→3 banter capped at 5 — cuts in the M4 tab; the break absorbs up to 5 min of send-off tail) |
| 10:00 – 10:20 | Break (≥15 min stays real if M4's tail eats into it) |
| 10:20 – 12:20 | M5 (2h; zero slack — the 15-min cushion is fully booked by the worktree fork (~10, start it the moment the room settles) and the closers' honest 19–24; if the fork fights back, cap Phase 4 at half-pages — M5 tab cut order #1) |
| 12:20 – 13:35 | Lunch — the packaged re-send runs through it |
| 13:35 – 13:50 | Re-entry: nudge a stalled M5 session, settle in |
| 13:50 – 15:35 | M6 (1h45) — opens in a FRESH session at the same worktree (the M5 session may still be running; read both sessions from disk before any write) |
| 15:35 – 15:50 | Closing Day 2 |

Don't split M4 across the days: its flow is one sequential beat and the send-off is the close; the M3→M4 task-pick homework is the designed spillover. An alternative shape exists (M1-M2-M4 / M5-M3-M6, for cohorts that want the overnight M4→M5 hinge) — that's a call to make with your delivery contact before the cohort, not solo.<!--/flag:module:spot-gaps-build-the-loop--><!--flag:no-module:spot-gaps-build-the-loop-->**Sittings.** One module per sitting, in tab order, at the budget on that tab's Slot line.<!--/flag:no-module:spot-gaps-build-the-loop-->

**Craft — the twelve moves.**

1. **Quote before summary.** The strongest AE101 trainer move. If Claude cannot quote the file line, diff line, commit, or transcript moment, the claim does not carry.
2. **Self-report is a hypothesis.** Useful, not authoritative — verify against `/context`, the diff, the file, the trace. After any save, edit, or generated file, ask "tell me what you wrote"; demand show-before-save only when the operation is hard to reverse.
3. **Author through conversation, then invoke.** Hand-crafting skill files in a file tab is theatre; catch the editor drift every time.
4. **Personal first, team later.** Team-worthy findings get flagged, never auto-PRed; the team figures out its own sharing path.
5. **Fresh context for breadth, main thread for steering.** And never clear scrollback mid-phase — chains depend on what just happened.
6. **Task size is pedagogy.** Oversized task selection is the most common AE101 failure; push early — "not a typo-fix, not an epic."
7. **Don't front-run the next move.** Right-in-real-life can still be wrong before the curriculum earns it; name it and park it.
8. **Absence is data.** No tests, no ADR convention, thin memory: name the gap, write the smallest durable note, keep moving.
9. **Teach the shipped prompt by default; show a better way when you have one.** Never on send-off prompts — their under-specification is the curriculum.
10. **Ask for critique, not defense.** "What is weakest?" produces evidence; "justify this" produces confident prose. And push back on question dumps — one-at-a-time means one at a time.
11. **Weak sessions are evidence.** Don't rescue too early; never rescue the M4 un-packaged session. A student output that differs from yours is comparison material, not error — compare the evidence, not the polish.
12. **Mood.** Each module names a target mood in its tab. "Below 7" means the target is visibly absent — you never poll the room; run the Check in the tab's decision points, then the Fix. Calibration: at 8 the content carries the mood itself; a 7 lands only because you are compensating; below 7 a neighbouring mood has taken over (technical warm-up where joy should be, compliance where curiosity should be).

**The room.** You are a practitioner, not an oracle. Protect the live exercise above all: if time slips, compress framing and move polish to homework — never "cover" the module at the cost of the exercise. Answer "what's the right way" in context and give your judgment. Steal better workflows from the room with pride. One broken laptop gets 30 seconds of triage, then a buddy — don't stop the room. With ten-plus concurrent sessions you cannot inspect them all: when the agent is hiding evidence or pushing students toward accidental approval, name the pattern to the whole room and hand the decision back; spot-assist only where it unblocks the protected exercise. And don't become the grader — students are adult professionals in their own repos; help them see what an artifact rests on (quoted evidence, trace, diff), then they decide if it's good enough for their team. A quiet Nordic first beat is not no-signal; make the opening concrete and easy. Narrate agent waits (tool use, files touched, what the prompt is shaping). Fast room: go deeper, don't pad. Slow room: cut asides, don't sprint.

**Never:**

- Lecture from slides.
- Fix every install issue from the front of the room.
- Pre-summarize a lecture before its slot lands.
- Apologize for agent waits.
- Auto-promote personal learnings to team PRs.
- Rescue a contrast exercise's first session early.

**After delivery.** Note per module what slipped and what fired, while it's fresh, and route it through your delivery contact (ArcticRex). Don't rely on memory.

</section>

<!--flag:module:getting-going-->
<section class="module-glance" id="m1-glance">

### M1 — Getting going + context

**Slot.** 2-day cohort: Day 1, 08:30–10:30 (2h slot; the module runs ~1h48 and the remaining ~12 min is your buffer, not padding). Four-sitting track: sitting 1 — **M1 does not quite fit 1h45; it runs ~3 min over.** Take the overrun or cut per the if-behind list below. M1 is the only core module outside the 1h45 band, by design. Thinking effort `high` (prework default).

**Big idea.** The first compound loop closes on a trivial bug from the student's own backlog: orient, fix tests-first without plan mode, close the bug's ticket in the register their own tracker just taught the agent, then retro into a personal `./CLAUDE.local.md` born from the session. All four moves happen in the room. The loop every module after this one rides on.

**Flow.**

1. Room agreement — How we work in this room
2. Connections — "one trick you figured out with Claude Code that nobody taught you"
3. Lecture — Painting the picture with the LLM (the wizard is dead; context is what colors what comes after)
4. Lecture — The wizard move (two-window dinner demo; "context is what you tell it")
5. Exercise — [Orient and introspect](./#exercises-orient-and-introspect)
6. Exercise — [Fix tests-first](./#exercises-fix-tests-first)
7. Exercise — [Close the ticket](./#exercises-close-the-ticket) (one real ticket; conventions read, then close-out in that register)
8. Exercise — [Compound and close](./#exercises-compound-and-close) (rules file, the tracker read included as evidence)
9. Lecture — [The machine you just met](./#lectures-the-machine-you-just-met) (recognition closer, ~5 min; connects the mirror, error chain, and output shape to how the session is steered)
10. Lecture — [How this training was built](./#lectures-how-this-training-was-built) (arc closer; names compound engineering)

**Learning goals.** Student can:

- Run an orient → fix → close → compound loop end-to-end on a trivial bug in their own repo.
- Introspect the agent's read of the repo and dig until they find what it made up.
- Fix the bug tests-first, root-cause-driven, no plan mode, ship the PR.
- Close the bug's ticket from what their own tracker's field conventions show, the first move outside the repo.
- Compound one rule from the session into `./CLAUDE.local.md`.

**Exercise goals.**

- *Orient and introspect* — Claude reads the repo deliberately; student interrogates the self-report against `/context`. Output: a map of what loaded, what got skipped, and how much window is left.
- *Fix tests-first* — failing test lands before the fix; at least one diff-line push-back; root-cause interrogation between first and second TDD pass; a real PR shipped.
- *Close the ticket* — one real ticket read twice: the agent reverse-engineers the team's field conventions off it, then writes the close-out in that register. Five proposed refinement rules, at least one rejected. The note lands via `gh`, an inherited connector, or a paste.
- *Compound and close* — `./CLAUDE.local.md` written from session evidence (not a template, and the tracker read counts), a push-back pass where the summary misreads, and a second sweep before close.

**Trainer cues.** Give the room agreement two minutes inside the opening ten; it sets permission and pace, so don't turn it into a policy lecture. The arc closer (How this training was built) is Antti's first-hand story — read it as a document, in narrator voice; you are not claiming the experience, and the opening line says so. The Connections trick-share calibrates the room; a quiet first beat is a Nordic norm, not no-signal. Bug pick is the single variable that breaks M1: too small (Claude crunches in 30s, no read worth dragging through introspection) or too large (no close inside the slot). The diff-line push-back IS the pedagogy of Fix tests-first; if students skip it the loop's third beat reads as theatre. Close the ticket is the module's only beat outside the repo, and its payoff is the register: the conventions read is what stops the close-out sounding like a language model. If a student skips straight to the close-out prompt, the beat still produces a note but loses the point. Nothing is handed off as homework; the loop finishes in the room.

**Runtime map.** Budgets from the module's own trainer meta (Opening 10 / Lectures 10 / Exercise 78 / Closers 5 / Bridge 5 = 108). Every exercise figure is that exercise file's own Time line — there is no padding left to spend.

| Beat | Budget | Sitting (elapsed) | Cohort clock (2h slot) |
|---|---|---|---|
| Opening: room agreement + trick-share | 10 | 0:00 | 08:30 |
| Lectures: Painting the picture + The wizard move | 10 | 0:10 | 08:40 |
| Ex 1: Orient and introspect | 18 | 0:20 | 08:50 |
| Ex 2: Fix tests-first | 25 | 0:38 | 09:08 |
| Ex 3: Close the ticket | 20 | 1:03 | 09:33 |
| Ex 4: Compound and close | 15 | 1:23 | 09:53 |
| Closers: The machine you just met (~5) + How this training was built | 5 | 1:38 | 10:08 |
| Bridge | 5 | 1:43 | 10:13 |
| Buffer | 12 | ends 1:48 | ends 10:18, slot to 10:30 |

No separate module-level Debrief; the compound exercise is the retro.

**Push-backs, verbatim.**

- Student pastes the bug and Claude jumps straight to a fix → *"Back up. What's the failing test that would prove this bug exists?"*
- Diff approved in under 30 seconds → *"Find me one line you'd have written differently. Not wrong, just different."*
- Repo summary read, introspection prompt skipped → *"Before we move on: what did Claude choose not to read, and does that match what you'd have expected?"*
- All five tracker-convention rules accepted without a rejection → *"Which of the five did the agent guess at? Make it separate what it read from what it inferred."*
- Close-out shipped on first draft → *"Read it against the comments already on that ticket. Does it sound like the same team wrote it?"*
- Rules file accepted without reading → *"Read it aloud. If someone on your team read this in six months, would they run the same loop?"*
- Compound summary name-drops session moments without quoting → *"Quote the specific session moment that made you add rule X. If you can't, take it out."*

**Escape hatches and gotchas.**

- **The bug's path has no test infrastructure** → the exercise ends without test verification. Have the student log "no verifier on this path" as a rule in `./CLAUDE.local.md`. A real finding, not an exercise failure; Module 4's audit picks it up.
- **`/context` read as prose, not typed** → *"Type /context in the chat. Look at the number."*
- **Student's bug has drifted from the prework choice** → run a fresh bug-surfacing conversation on the spot; the criteria are unchanged (trivial, real, from their own backlog).
- **Fix runs over 35 min** → the bug wasn't trivial. Let it complete, trim the compound exercise, and note this student benefits more than average from Module 2's plan-mode depth.
- **Fix finishes under 15 min** → the bug was too small. Offer a second bug, or use the saved time to revisit the introspection move.
- **No connector and no `gh`** → the agent writes the close-out and hands it over; the student pastes it. The exercise completes on that path, so don't stop the room to install anything.
- **A student adds a connector live and it doesn't appear** → check and authenticate with `/mcp`; if it still isn't there, exit and resume with `claude --resume <session-id>`. Don't let this spread past the one student.
- **The bug has no ticket** → the agent offers to create one. If the tracker is unreachable for writes, have the student write a markdown ticket into the repo and link the PR; the sponsor gets a signal.
- **The ticket has no comments** → nothing to read a register off. The field conventions still land, and the close-out takes its register from the description's own wording.
- **Repo change mid-training** → supported. The student replays M1 → current module on the new repo in an evening; fast-path the replay (the pedagogy already landed, only the artifacts regenerate).

**If behind, cut in this order.**

1. The two optional Fix tests-first prompts (deeper-layer interrogation and second TDD pass); the exercise marks them optional.
2. Close the ticket's second-ticket suggestion and the push-back-on-the-five paragraph; run its three prompts straight through, ~15 instead of 20.
3. Run Orient and introspect at its 15-minute floor instead of 18.
4. Compress the Connections trick-share and the lecture framing; run the prompts and let the closers carry the framing.

Never cut: the failing test before the fix, the diff-line push-back, and the conventions read before the close-out. The first two are the module; the third is what the close-out's register depends on, and without it Ex3 is a note-generator.

**Demo repo starting state.**

- A repo picked against the prework criteria (owned, active, dense enough to compound in), clean working tree.
- A trivial bug surfaced in the prework conversation, ready to paste.
- **Wizard-move demo pre-flight:** all demo windows in incognito (the ghost icon on a new chat, outside a project) — cross-chat search and memory are on by default on paid plans and can leak window 1 into window 2. Dry-run the dinner question before the cohort.
- **If window 2 answers Finnish-adjacent anyway:** *"It remembered — which is the lecture's point one step early: context is what you tell it, and now you've seen it telling itself."* Then run the third window clean.
- Regenerate: rerun the prework bug-surfacing conversation in a fresh session; criteria unchanged.

</section>
<!--/flag:module:getting-going-->

<!--flag:module:plan-mode-done-right-->
<section class="module-glance" id="m2-glance">

### M2 — Plan mode, done right

**Slot.** 2-day cohort: Day 1, 10:50–12:00 (Connections through Exercise Phase 4, 1h10), lunch, 13:15–13:45 (Phase 5 + close, 30 min). Lunch at 12:00 sharp IS Phase 5's "stop." Four-sitting track: sitting 2, 1h45 straight through; Phase 5 follows Phase 4 directly and the exercise body's own "Stop" carries the beat. Thinking effort `medium` (the module says high may feel sluggish on a tight slot).

**Big idea.** Reading a plan is finite. The student's own read catches some of it; a second agent walking the decision tree catches the rest. Paired they give a complete read; neither alone does.

**Flow.**

1. Connections — "when did you last approve a plan you didn't really read, and what made you approve?"
2. Lecture — [The whole map](./#lectures-the-whole-map) (opener, 4–6 min; first map reveal: the whole territory, and where the first modules sit in it)
3. Lecture — [When a plan is good](./#lectures-when-a-plan-is-good)
4. Exercise — [Push back on the plan](./#exercises-push-back-on-the-plan) (60 min)
5. Exercise — [Extract the task-shaping rule](./#exercises-extract-the-task-shaping-rule) (12 min)
6. Lecture — [Where the rule could live](./#lectures-where-the-rule-could-live) (names Slack triage / issue webhook / scheduled read)
7. Save the rule if it earned itself — two short prompts in the module body; opportunistic integrate into `./CLAUDE.local.md`, only if a branch changed how the student reads plans
8. Lecture — [How instructions grow](./#lectures-how-instructions-grow) (two-slide close: one common route from real work to rules and skills; Argyris's second loop returns durable learning to future context)

**Learning goals.** Student can:

- Run plan mode on a real multi-file task and judge the plan against five criteria, naming the one it fails.
- Push back twice on the plan via "No, keep planning," surfacing what the agent didn't see.
- Walk down unresolved branches with a second-pass read, a recommended answer per branch (the shipped prompt batches three questions at a time).
- Pair human read with agent walk-down: read → push-back → walk-down → approve. Spot approval inflation in past plans.
- Extract task-shaping rules from the session into a `.md` file, sharpening at least one before saving.
- Name three shapes for turning a rules file into automation.

**Exercise goals.**

- *Push back on the plan* — student takes a real multi-file task, runs plan mode, sends two push-backs, then a second-pass walk-down with Claude asking three questions at a time. Approve the plan. Don't execute. Compare what the read caught vs. what the walk-down caught; that gap is the skill the module builds.
- *Extract the task-shaping rule* — three to five rules surfaced from the scrollback, at least one rewritten or rejected, saved as a `.md` file at a student-chosen path. Automation shapes named, not built.

**Trainer cues.** Carry the push-backs in cohort delivery; the room won't always push hard the first time. The non-execution is the bet of the module ("Making the plan good IS the work"); if a student wants to run it, name the move and park it. In the 2-day format, lunch lands at 12:00 inside the exercise by design and the pause IS Phase 5's "stop"; post-lunch returns to name the design pattern.

**Runtime map.** Connections 10 / Lecture A 8 / Exercise A 50 / Exercise B 12 / Lecture B 3 / soft-compound 3 / Lecture C 4 / Debrief 7 / Bridge 5 = 102 against 105, with a 3-min buffer. Lecture B is `where-the-rule-could-live.md`; Lecture C is `how-instructions-grow.md`. Exercise A's own phase splits (5/15/15/15/10) sum to 60; the map books it at 50 because P2/P4 agent-wait overlaps reading.

| Beat | Budget | Sitting (1h45) | Cohort clock (2-day) |
|---|---|---|---|
| Connections: the approved-unread plan | 10 | 0:00 | 10:50 |
| Lectures: The whole map + When a plan is good | 8 | 0:10 | 11:00 |
| Exercise A P1–P4: task, plan, two push-backs, walk-down | 40 booked (nominal 5/15/15/15; the agent-wait overlaps reading) | 0:18 | 11:08 → lunch at 12:00 after P4 |
| Exercise A P5: stop, name the pattern | 10 | 0:58 | 13:15 |
| Exercise B: Extract the task-shaping rule | 12 | 1:08 | 13:25 |
| Lecture: Where the rule could live + save-the-rule prompts | 3 + 3 | 1:20 | 13:37 |
| Lecture: How instructions grow | 4 | 1:26 | 13:43 |
| Debrief + Bridge | 7 + 5 | 1:30 | runs to ~14:01 — see the 2-day note |
| Buffer | 3 | ends 1:42 + 3 | — |

**2-day format note.** The post-lunch block (13:15–13:45, 30 min) holds P5 10 + Exercise B 12 + Lecture B 3 + Lecture C 4 + Debrief 7. The soft-compound folds into the Debrief conversation because they are the same self-compounding beat. The Bridge rides the following 20-minute break; the close reaches roughly 14:01. In the four-sitting format, the module fits the 1h45 slot with three minutes of buffer.

The Debrief has no projected section on the student page, by design — it is a 7-minute conversation beat, not a taught section. Run it as the self-compounding conversation: Claude proposes a plan-reading rule from the session; the push line below ("name a pattern specific to THIS codebase") is the whole procedure.

**Push-backs, verbatim.**

- Student approves under 60 seconds with no push-back sent → *"Pick No, keep planning. Send one soft item before approving."*
- Push-back names no step, no specific words → *"Which step, which words? Say the thing you'd want a senior reviewer to catch."*
- Claude acknowledges the push-back but the revised plan is no sharper → *"Did Claude actually sharpen it, or did it acknowledge and re-soften? Push back again."*
- Student calls the walk-down done after two or three questions → *"Let the walk-down run until it's out of branches; you don't decide when it's finished."*
- Debrief: Claude writes a generic plan-reading rubric → *"Name a pattern specific to THIS codebase, from THIS session's evidence. What did the walk-down surface that a first read would miss on this repo?"* (De-jargoned from the module's "what branch did grill surface" phrasing.)

**Escape hatches and gotchas.**

- **The rule-integrate prompt can wipe the rules file.** The save-the-rule prompt is deliberately imprecise and Claude can read it as "replace the file with only this rule." `./CLAUDE.local.md` is gitignored, so there is no git undo. Watch the diff: integrating should add, not replace. If it overwrote, the old rules are still in this session's scrollback; ask Claude to restore them from there.
- **Student can't surface a fitting task** → run the three-candidate conversation. Criteria: multi-file, 30–60 minutes of agent work, touching the wrong file matters.
- **A walk-down turn crawls (10+ minutes on a real codebase)** → stop the turn, ask Claude what's making it slow, and relax the requirement that's making it crawl. The prompt is a starting recipe, not a contract.
- **The plan file is laptop-local.** Plan mode writes it under `~/.claude/plans/`, not in the repo, so teammates pulling the branch never see it. If the team wants the plan, copy it into the repo after approval.
- **A shell command runs while still in plan mode** → recent Claude Code versions run pre-approved commands during planning. Expected behavior, not a bug; the plan still can't edit source until approved.
- **Walk-down finishes under 15 minutes** → the task was too small for plan mode. Name the floor at Debrief: plan mode is overkill below roughly 30 minutes of agent work.

**If behind, cut in this order.**

1. Cut the lecture's three-pressures section to 60 seconds; the exercise teaches them.
2. Timebox the walk-down: take the most recent sharpened plan, approve it, move to Phase 5. The branches that didn't surface today get caught when the work actually ships.
3. Compress the Debrief to 10 minutes, keeping the pattern-naming step.

Never cut: Phase 5's stop. Approve, don't execute, and name the pattern; the non-execution is the module's bet.

**Demo repo starting state.**

- M1 artifacts in place: `./CLAUDE.local.md` born from the M1 compound; the M1 fix shipped or on its branch.
- A multi-file backlog task surfaced (M2 prework): non-trivial agent work, touching the wrong file matters, shippable today given the hour.
- Regenerate: rerun M1's compound prompt in any session for the rules file; surface a task via the three-candidate conversation.

</section>
<!--/flag:module:plan-mode-done-right-->

<!--flag:module:earn-the-trust-->
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

**Trainer cues.** Authoring without invocation is theatre — catch students hand-crafting `SKILL.md` in a file tab and steer them back to conversation. M3 closes with the M4 task-pick homework instruction; don't drop it.

**The security-tools surprise.** Prework installed a skill called `security-tools`, framed as a generic pre-flight. The first STRIDE prompt invokes it; the bundled script runs a few legitimate-looking checks (first line: *"owning you............ ok"*), then prints an ASCII rick-rolled face and a note: every link in the chain — tarball, SKILL.md, Bash authorization — was trusted without reading. The stunt IS the lesson: external skills are a supply-chain vector.

- **Don't spoil it.** If a student asks before M3 what the skill does: *"a pre-flight check; you'll see it run during M3."*
- **When it lands:** the trainer's terminal shows the output verbatim. Pause two beats after the ASCII face; let the room react before saying anything.
- **Framing after the reaction — two minutes, three beats:** (1) every link got trusted: the tarball, the SKILL.md nobody read, the Bash authorization Claude asked for; (2) this is the module's own access-surface and authorization logic, one level up — applied to AI tooling instead of features; (3) this is why curated beats random, why fork-read-vet-adapt beats install-from-a-Discord-link — `access-control-analysis` and `stride` were vetted before they reached you; `security-tools` is what skipping that looks like. Then back to the STRIDE pass.
- **Students who already read `check.sh`:** *"some of you read the script — that's the lesson, you noticed."* Make them feel sharp.
- **If the stunt doesn't fire** (install failed, or Claude paraphrases instead of printing verbatim): press on — the SKILL.md body carries the lesson text and the beat lands even paraphrased. Fix a broken install after the session, not from the front of the room.
- The skill stays installed past M3; if a sponsor pushes to remove it, leave the slot empty rather than substituting something serious-but-thin — the stunt earns its keep precisely because it isn't serious, and the rick-roll body is worth an engineer's re-read.

</section>
<!--/flag:module:earn-the-trust-->

<!--flag:module:run-the-first-experiment-->
<section class="module-glance" id="m4-glance">

### M4 — Run the first experiment

**Slot.** 2-day cohort: Day 2, 08:30–10:00 (1h30, compressed from 1h45; Connections 10→5, Bridge cut, banter compressed). Four-sitting track: sitting 3, full 1h45. Phase 1 is a 2-minute confirm because the task came in as homework (from M3's close in the six-module arc; from M2's close in the four-sitting cut).

**Big idea.** Walk what's been built so far against a real task; fill the worst gaps; send the task off un-packaged in the same session; learn from what the agent does with the system as it stands. The un-packaged send-off is intentional — it teaches Module 5 what packaging adds.

**Flow.**

1. Connections — one or two candidate tasks from the backlog; bigger than a typo-fix, smaller than an epic
2. Lecture — [The far half of the map](./#lectures-the-far-half) (opener, 3–5 min; quick feedback goes quiet, the result arrives all at once)
3. Lecture — [The agent loop](./#lectures-the-agent-loop) (~5 min; names the machine that keeps stepping; three prompts run on the live session that carries the send-off)
4. Lecture — [Test and learn](./#lectures-test-and-learn)
5. Exercise — [Walk and send off](./#exercises-walk-and-send-off) (55 min; pick 10 / walk-and-fill 40 / settle 5)
6. Send-off section (owned by the module file): [The ironies of automation](./#lectures-ironies-of-automation) (2–3 min framing; the lecture's own cap — past 3 it starts teaching the fixes), then the two return markers (transcript path, starting-point commit on `m4/<slug>`), the trifecta check (private data / untrusted content / channel out — cut one leg), and the single send-off prompt paste
7. Lecture — [What keeps a long-running session going?](./#lectures-what-keeps-a-long-running-session-going) (fires while the agent runs; three-condition observation; leaves the run untouched)
8. Close — point at [Reading the return](./#lectures-reading-the-return) as the pre-read; it plants the three failure modes M5 reads with

**Learning goals.** Student can:

- Scope a real send-off task in conversation with Claude — multi-file reasoning, sustained coherence, not step-by-step nudging.
- Walk what they've built (`CLAUDE.md` + `CLAUDE.local.md` + `observations/` + ADRs + any authored skills + connectors) against the task as a subagent audit; push back on the audit.
- Fill the worst gaps in conversation: observations written, rules sharpened, business-rules pointer wired (or the gap named explicitly).
- Send the task off un-packaged in the same Claude Code session and let it run.

**Exercise goals.**

- *Walk and send off* — system walked against the task; worst two or three gaps filled; `observations/` tree settled on disk. The exercise ends there; the module's send-off section takes over and the un-packaged run fires at close.

**Trainer cues.** M4 is deliberately incomplete. Start the closing lecture only after the un-packaged session is active. Keep it to three conditions: durable state keeps the place, feedback keeps the direction, and a boundary decides whether to continue. Ask the room to observe what is already present; do not repair or package the run while it is the specimen. Do not name Module 5's artifacts. No compound pass at the close: the send-off is the close of the work, and whatever needs sharpening surfaces on the return. **Memory-word allergy:** some engineers react against the word; acknowledge the criticism is legitimate against Claude Code's auto-memory, then point at the distinction — `observations/` is files the student wrote, gitignored, read when a prompt names the path.

**Runtime map.** Recounted 2026-08-01 from the lectures' own Time lines: Connections 10 / Lectures 18–22 / Exercise 55 / Send-off section ~15 / closing lecture ~4 riding the run / Close + Bridge 3 ≈ 103 against 105. (The meta's previous "Lecture 12" predated the promoted lectures; "Debrief 12 / Send-off 5" predated the no-compound close that folded both into the send-off section. The exercise file separately carries 60 and a 10/45 split; the module figures below win.)

| Beat | Budget | Sitting (1h45) | Cohort clock (1h30) |
|---|---|---|---|
| Connections: candidate tasks | 10 (cohort: 5) | 0:00 | 08:30 |
| Lectures: The far half (3–5) + The agent loop (~5) + Test and learn (10–12) | 18–22 honest; land the low end by keeping far-half at its 3-min floor | 0:10 | 08:35 |
| Exercise P1: pick (2-min confirm if homework landed) | 10 | 0:30 | 08:53 |
| Exercise P2: audit + fill the worst gaps | 40 | 0:40 | 09:03 |
| Exercise P3: settle the `observations/` tree | 5 | 1:20 | 09:43 |
| Send-off section: Ironies of automation (2–3), transcript + commit markers, trifecta check, prompt paste | ~15 | 1:25 | 09:48 |
| What keeps a long-running session going? (agent already running — this beat rides the wait) | ~4 | 1:40 | overlaps |
| Close: Reading the return pointer + Bridge | 3 (cohort: Bridge cut, break absorbs it) | ends ~1:43 | 10:03 |

**2-day format note.** Compressed 1h30 books ≈91–95: Connections at 5, Bridge cut, Phase 2→3 banter capped at 5 (cut order #3, default-on in this format). The 10:00 break absorbs up to 5 min of send-off tail; the send-off itself is never-cut.

**Push-backs, verbatim.**

- Gap deferred as "architectural, not contextual" (the highest-stakes push; a skipped contextual gap makes the run fail in a boring way M5 can't rescue) → *"If the audit calls it context — even if the fill is 'add a rule saying we use X, not Y' — it's still context. Module 5 needs an interesting failure to diagnose, not a boring one. Fill it."*
- Student wants to add a plan.md or a verifier before sending → *"Un-packaged is by design. Module 5 teaches you packaging by diagnosing what breaks here. Don't pre-empt the learning."*
- Student tries to close all five gaps → *"Three is the budget. Skip the other two — you'll see next module why."*
- Student hesitates at the final prompt → *"Stop it when you've seen enough. Traces are data. A result you can read is enough; you do not need a completed artifact."*
- Student reads the ranked gap list and moves on without picking → *"Which of these will hurt the agent most given the task? Fill those."*

**Long-session observation (closing lecture, while the agent runs).** Keep the active session visible. Name only the three conditions on the slides: durable state, feedback — including backpressure when downstream review cannot safely accept more — and a boundary that can stop or redirect the next step. Then ask one question:

*"What is the first thing in this session that can notice a wrong step without you?"*

Let students point at evidence in the live run. If an answer turns into a proposed fix, bring it back to observation: where does the session keep its place, what can push back, and what decides whether it continues? Do not introduce the later artifact recipe here; those names belong to the later diagnosis.

**Escape hatches and gotchas.**

- **No task, or a typo-fix, or a quarter-long epic at Connections** → run the three-candidate conversation. Criteria: sustained coherence, requirement-weaving, multi-file reasoning. Push against too-small AND too-large; downstream prompts cannot rescue the wrong task.
- **Audit returns 12–15 items** → re-run the audit prompt with the ranked top-five enforced; don't let the student hand-filter a long list.
- **The gap-fill question tool caps at four options.** If the audit surfaced five gaps, have Claude offer the four most material as options and print the left-off gap as a note after the pick.
- **Markers missed at send-off** → *"Read me back the branch name and the short SHA Claude confirmed. Have you noted both somewhere you'll find at Module 5 start?"* Module 5's worktree fork depends on exactly those two.
- **Laptop sleep freezes the session** and it won't resume on wake: awake and plugged in, lid open. Stopping early is fine, but wait for a tool call to finish; interrupting mid-tool-call can corrupt the on-disk transcript.
- **The agent stalls mid-run** → the module body carries the nudge prompt (phrased as encouragement, lands as a taunt). A handful of manual nudges is the right dose; past ten, the student has become the agent — call it and read what's there.
- **Do not improve the send-off prompt.** Its under-specification is the curriculum. The show-a-better-way license (Start here, craft move 9) does not apply here; an added plan or verifier destroys Module 5's payoff.
- **No business-rules layer exists** → the gap IS the finding. One line in `observations/` naming what's missing and where the real material lives.

**If behind, cut in this order.**

1. Connections from 10 to 5 (the room is warmed up).
2. The Bridge (a following break absorbs the transition).
3. The Phase 2→3 time-check banter, down to ~5 minutes (default-on in the 2-day format).

Never cut: the send-off itself, and never rescue the un-packaged run. A weak first run is the evidence Module 5 diagnoses; a rescued one collapses the whole contrast arc.

**Demo repo starting state.**

- The homework task picked and scoped: a real slice with a "done" nameable in one sentence.
- M1–M2 artifacts present: `./CLAUDE.local.md`, the task-shaping rules file.
- Unrelated work-in-progress committed or on its own branch; the closing commit snapshots the working tree and the M5 fork rides on it.
- Regenerate: pick a task via the three-candidate conversation; rebuild the rules files by rerunning M1's compound and M2's extract prompts.

**Northwind topology (four-sitting cut).** No M3 ran, so: the task-pick homework arrives from M2's close instead of M3's; there are no STRIDE ADRs and no authored test-strategy skill for the Phase 2 audit to read. The audit prompt's conditional phrasing ("any skills you've authored," "any ADRs") resolves cleanly — the quality read anchors on the repo's existing test conventions and whatever recorded decisions the repo already has. The trifecta check stands on its own here rather than as a callback to an M3 close. Mechanically validated 2026-07-28, full-chain test PASS: M4's audit turn carries no hard dependency on the M3 ADR or skill.

</section>
<!--/flag:module:run-the-first-experiment-->

<!--flag:module:learn-from-the-test-->
<section class="module-glance" id="m5-glance">

### M5 — Learn from the test, re-send packaged

**Slot.** 2-day cohort: Day 2, 10:20–12:20 (2h slot, 15-min cushion over the 1h45 budget; the packaged re-send fires at close and runs through lunch). Zero slack: the cushion is fully booked by the worktree fork and the closers — start the fork at 10:31 sharp. Four-sitting track: sitting 4 and the finale, 1h45 with no cushion; the worktree fork is the squeeze point (see the runtime map).

**Big idea.** Read the un-packaged M4 run through three failure-mode lenses; build the validation that would have caught each; assemble the reference and `plan.md`; re-send the same task packaged. The contrast IS the lesson.

**Flow.**

1. Lectures — [Reading the return](./#lectures-reading-the-return) (the M4-close pre-read, re-anchored briefly) + [Learning through contrast](./#lectures-learning-through-contrast)
2. The nag writes the verifier — short module-body beat: the mid-run worry from M4 is the verifier's spec
3. Set up the worktree — fork runs from the ORIGINAL repo (the worktree doesn't exist yet), before the exercise session; Claude reads the `Run coordinates` block in `task.md` and forks `../<repo>-m5` from the `m4/<slug>` starting-point commit, copying `CLAUDE.local.md` and `observations/` across
4. Exercise — [Diagnose and re-send](./#exercises-diagnose-and-resend) (Phases 1–4, in a new session in the worktree)
5. Re-send — new session in the worktree by default (fresh context; the exercise scrollback is heavy), or clear the exercise session in place; then the packaged re-send prompt, and the walk-away report gets read cold
6. Lecture — [What packaging is](./#lectures-what-packaging-is) (closer; the three-pattern earned from felt evidence — don't squeeze it)
7. Lecture — [The gate is a claim too](./#lectures-the-gate-is-a-claim) (final closer, 7–9 min; the verifier the student just built is a claim, not proof; closes on the delegation-frontier zoom-out)
8. Four-sitting close only: bring the worktree's `CLAUDE.local.md` and `observations/` home to the original repo, then the map's last read (the wall; what crosses to the team, and how)

**Learning goals.** Student can:

- Diagnose the un-packaged M4 send-off through three named lenses — goal drift, context rot, plausible-but-wrong — grounded in quoted moments from the run.
- Pair each failure mode with the packaging that catches it: drift ↔ reference artefact, rot ↔ `plan.md`, plausible-but-wrong ↔ external verifier.
- Build a verifier shaped against the dominant failure (background-agent / shell-hook / Ralph re-feed).
- Assemble reference + `plan.md` in conversation, scoped to the same M4 task.
- Re-send the packaged version of the same task and let it run a second time. (The module's learning-objective wording says "in the session your diagnosis ran in"; the module's re-send section opens a fresh session in the worktree by default, with clear-in-place as the alternative — teach the re-send section.)

**Exercise goals.**

- *Diagnose and re-send* — student ends with: a diagnosis (named failures + quoted moments from their own artefact), a working verifier targeting one specific failure mode, and reference + `plan.md` scoped to the same M4 task. Each piece earns its place against a real failure, not a slide.

**Trainer cues.** In the 2-day format the 15-min cushion goes to the worktree fork (real engineering, students fumble) and the two closing lectures; the closer pair IS the lesson, don't compress it. Don't name the three-pattern before the closing lecture; it earns the name from felt evidence, and if the term leaks in Phases 1–4 the closer has nothing to add. In the six-module arc, the re-send runs through lunch and M6 reads both runs after; in the four-sitting cut this sitting is the finale and closes on bringing the worktree's work home plus the map's last read.

**Runtime map.** Budgets from the module's trainer meta (Connections 5 / opener lecture 6 / Exercise 60 / Debrief 12 / Re-send 3 / Closing lecture 15 / Bridge 3). (Three wrinkles: the worktree fork has no line of its own in that budget — the 2h cohort slot's cushion covers it, and in a 1h45 sitting it comes out of the buffer, so start it the moment the room settles; the exercise file carries 65 min with Phases at 15/10/20/20 against the module's 60 at 15/10/18/17 — the module figures below win; and the two closers' own times, ~12–15 + 7–9, exceed the meta's 15-minute closing-lecture line — the cohort cushion absorbs that, a sitting trims the front of the module, not the closers.)

| Beat | Budget | Sitting (1h45) | Cohort clock (2h slot) |
|---|---|---|---|
| Connections + opener lectures (Reading the return re-anchor, Learning through contrast, the nag beat) | 5 + 6 | 0:00 | 10:20 |
| Worktree fork from the original repo (coordinates read, copy check) | not line-itemed; the cohort cushion's ~15 covers it | 0:11 | 10:31 |
| Exercise P1: read the failed run, quote moments per lens | 15 | 0:26 | 10:46 |
| Exercise P2: match each failure to the check that catches it | 10 | 0:41 | 11:01 |
| Exercise P3: build the verifier, prove it fires | 18 | 0:51 | 11:11 |
| Exercise P4: write the reference and plan.md, lock it in | 17 | 1:09 | 11:29 |
| Debrief + re-send (new session in the worktree, prompt paste, read the report cold) | 12 + 3 | 1:26 | 11:46 |
| Closers: What packaging is + The gate is a claim too | 15 nominal (their own times run 19–24; cushion absorbs in cohort) | 1:41 over budget without trimming upstream | 12:01 |
| Four-sitting close: bring the work home + the map's last read | inside the closing block | — | — |

**Push-backs, verbatim.**

- Student lists eight failures across all three modes → *"Pick the dominant. The verifier you build at Phase 3 fits one shape. Which failure cost the most?"*
- Student frames failures as their own fault → *"The un-packaged run was supposed to underdeliver. The diagnosis is data, not blame. Quote me one moment of goal drift."*
- Verifier shape doesn't match the failure (shell-hook for a qualitative miss, or the reverse) → *"Qualitative failure wants a judge. Deterministic wants a hook. Drift wants a re-feed. Which is yours?"*
- Student rewrites `CLAUDE.local.md` instead of authoring a task-scoped reference → *"The reference is task-local. It lives next to the plan.md. Your rules file is for the codebase; the reference is for this task."*
- Student hesitates at the second send-off → *"Same task, packaged. Same step-away move. The point is to read the contrast, not to nail it this run."* (In the six-module arc the contrast gets its full read at Module 6; in the four-sitting cut, at this sitting's close.)

**Escape hatches and gotchas.**

- **Wrong window.** The exercise session must be in the worktree, not the original repo or its branch. The exercise opens with this check; enforce it before Phase 1.
- **The fork prompt's shell sketch shows a literal `../<repo-name>-m5` placeholder.** Claude infers the real repo name from the working directory, but if it creates a directory literally named `<repo-name>-m5`, stop it and give the actual name.
- **Check the copy landed.** The fork output must name both `CLAUDE.local.md` and `observations/` at the worktree path; a rules file that quietly stayed behind changes two variables instead of one. If the student's rules live somewhere else, have Claude copy that file across too.
- **Coordinates missing or the commit message rewritten** → use the starting-point SHA Claude reported before the M4 send-off instead of guessing from branch names. If the student never captured that SHA either (it lived in closed scrollback), fork from the merge-base / first commit of the `m4/` branch — that terminal fallback always exists as long as the branch does. (Run-sheet guidance: this last step is not yet in the module body; it lands via the pre-cohort punchlist.)
- **No M4 artefact at all (missed the sitting, run never launched)** → the student runs M4 for real, now, on their own repo: fast-path the task pick, run the walk-and-send-off compressed, fire the un-packaged send-off, and let it cook while the module proceeds. 15–30 minutes of run is enough for the clues the diagnosis needs. The student trails the room through M5's phases and finishes M5 as homework. Sequence over sync: late in order beats on-time out of order. Don't hand them a stand-in artefact; diagnosing someone else's run on someone else's repo loses the compounding.
- **Thin M4 artefact (closed laptop, ran out of credit, unclear repo state)** → *"The artefact is whatever's there: repo commits since M4, files modified, the transcript under `~/.claude/projects/<project>/`. Open a fresh Claude Code session in the repo and ask it to read what the M4 run touched."*
- **The verifier won't fire.** A verifier run manually by prompt counts; hook wiring is optional. Don't burn the slot debugging hook registration — the verifier is the load-bearing artefact for the re-send, so if wiring fights back, prove it fires by invoking it directly and move on (take the time from Phase 4 if needed). (Run-sheet guidance: this floor is not yet in the exercise body; it lands via the pre-cohort punchlist.)
- **The re-send report reads polished.** RLHF frames partial failures as partial successes. Ask the agent to list the artifacts that didn't ship and quote the verifier output verbatim where it fired.
- **Word embargo (trainer-directed).** Don't say "Ronacher's three-pattern" (Armin Ronacher, the practitioner whose story the closing lecture is built on) before the closing lecture; the felt evidence earns the name there.

**If behind, cut in this order.**

1. Cap Phase 4 at a half-page reference + a half-page plan.md; a reference becoming a manifesto is the named overrun.
2. If the verifier fight needs time, take it from Phase 4; the verifier is the load-bearing artefact for the re-send.
3. Force Phase 1 to a single dominant failure early; past 20 minutes of diagnosis, rank and pick.

Never compress the two closing lectures. What packaging is → The gate is a claim too is the pair that lands the module; trim upstream instead.

**Demo repo starting state.**

- An un-packaged M4 run on disk: the `m4/<slug>` branch with its "M4 starting point" commit; `task.md` carrying the protected `Run coordinates` block (branch, SHA, transcript path); the run's own commits or trace.
- The M4 session transcript at `~/.claude/projects/<project>/<session-id>.jsonl`.
- `CLAUDE.local.md` and `observations/` in the original repo, ready to copy at fork time.
- Regenerate: rerun M4's send-off section (the transcript-locate and commit-starting-point prompts rewrite `task.md`'s coordinates), then let the send-off run 15–30 minutes; that is enough for the clues the M5 read needs.

**Northwind topology (four-sitting cut).** No M3 ran, so: the worktree-copy note about Module 3 artefacts riding forward drops out (only M1's rules and M4's observations cross); the re-send prompt's conditional requirements on the test-strategy skill and STRIDE ADRs resolve to absent, and the packaged run leans on the reference, plan.md, and verifier alone; post-run judging that looks for the authored skill correctly stands down ("nothing to judge") rather than erroring. This sitting is the finale: the close is bringing the worktree's work home plus the map's last read, and the six-module "Module 6 reads both runs" framing never fires. Mechanically validated 2026-07-28, full-chain test PASS.

</section>
<!--/flag:module:learn-from-the-test-->

<!--flag:module:spot-gaps-build-the-loop-->
<section class="module-glance" id="m6-glance">

### M6 — Spot gaps, build the loop

**Slot.** Day 2, 13:50–15:35 (1h45). Opens with M6 reading both runs from disk BEFORE writing anything. Lecture-dense by design — pacing and register notes below the cues.

**Big idea.** Two runs of the same task (un-packaged M4, packaged M5) are enough evidence to name what the three-pattern didn't anticipate and route each gap to its home (memory / verifier / new skill). Then the reading turns outward: map the work the student repeats across their stack; the close hands them the encode-move built from those shapes.

**Flow.**

1. Re-entry (~15 min; nudge stalled M5 run, open M6 in fresh session at same worktree, read both runs before writing)
2. Lecture — [The 2 frontiers](./#lectures-the-2-frontiers) (opener)
3. Lecture — [Story of Module 6](./#lectures-story-of-module-6) (opener; permission-giving memo from this module's own generation)
4. Lecture — [Quality is grounding](./#lectures-quality-is-grounding) (opener-bridge, 4–6 min; names the quality arc M1→M6)
5. Exercise — [Spot gaps, build the loop](./#exercises-spot-gaps-build-the-loop) (30–40 min; diff two runs, cut a stale rule, route the dominant gap, scan the stack for recurring work-shapes)
6. Lecture — [Composing the workflow](./#lectures-composing-the-workflow) (closer-area teacher; 3–4 min; the passage chart re-labelled with the student's kit; composition variety first — by hand, through files — then the four wirings of one documented kit)
7. Lecture — [The loop has a name](./#lectures-the-loop-has-a-name) (closer; names *eval* across verifier / judge / gate, anchored on the M5 verifier and the checking-primitives menu)
8. Lecture — [The map, filled in](./#lectures-the-map-filled-in) (final theory closer, 8–10 min; the whole map drawn solid across M1–M6)
9. Lecture — [Agents that build agents](./#lectures-agents-that-build-agents) (forward closer; the training's closing beat, dead-last per the 2026-07-03 re-sequence)

**Learning goals.** Student can:

- Diagnose the gaps two runs of the same task surface.
- Route each gap to its home: memory (rules that would have prevented the mistake), sharper verifier, or new skill.
- Cut one rule from `./CLAUDE.local.md` the diagnosis killed.
- Surface the kinds of work they repeat across the stack and draw the recurring shapes.
- Map evals across verifier (deterministic), judge (LLM-based), gate (in CI).
- Encode the lesson so the next loop inherits it (the handoff prompt from the close is the take-home).

**Exercise goals.**

- *Spot gaps, build the loop* — one-screen gap map across memory / verifier / skill with the dominant gap routed to a named home, one stale rule cut from `./CLAUDE.local.md`, and a diagrammed map of recurring work-shapes that feeds the closing handoff prompt.

**Trainer cues.** Practitioner-fluency register, not lecture-hall — by M6 the student is a practitioner, and the close runs lecture-after-lecture by design: a room of engineers reading the field together, with you as one voice among several. Invite reflection between lectures with open prompts, not Q&A: which lineage resembles their day? What did the quality arc feel like across the five moves? After Dino's worked example, the transfer question — is the skill they just shipped a route, a leaf, an orchestrator, or a hand-off? Two beats of silence is fine; Nordic engineers think before speaking. The composition lecture has no separate drill; Phase 2 of *Spot gaps, build the loop* (the work-shape / primitive scan) is the lived entry to composing — point students there first, then at the [workflow-composition-lineages supplementary](./#supplementary-workflow-composition-lineages) for the field survey. Dino's [skill-stacking system](./#supplementary-skill-stacking) is the worked example. Pacing: if energy is high, give the lineage conversation room; if low, keep the composition lecture to the chart and the four mechanisms, point at the supplementary, and move to the closer pair faster.

</section>
<!--/flag:module:spot-gaps-build-the-loop-->

<!-- maintainer — tab contract: every module tab and its nav link sit inside a matching `flag:module:<slug>` pair, so a cut's handbook carries a tab exactly when the cut runs that module. build-workbook.js resolves this file from the parent contentKey and applies the flags against the cut's own module list, so a variant needs no file of its own. A new tab needs its flag pair in BOTH the nav strip and the section, or the two drift and the strip points at a tab that is not there. The Start here tab's two-day schedule and the Format note are keyed on `module:spot-gaps-build-the-loop` — M6 is the six-module sentinel — with a `no-module:` Sittings line standing in for cuts. The Format note's "M1, M2, M4, and M5" list is deliberately unflagged: it holds for the six-module arc and the Northwind cut, the only two that build this page. -->
<!-- maintainer — 2026-07-03: theory-spine lecture beats reconciled against the 2026-07-02 module rework. Added the-machine-you-just-met (M1 closer), the-whole-map (M2 opener), the-loop-half-filled (M3 consolidation closer), the-far-half + the-agent-loop (M4 openers), the-map-filled-in (M6 final closer). Flow beats renumbered per module. Anchors follow the built #lectures-<slug> convention; they resolve once the integration build inlines the new lectures. -->
<!-- maintainer — 2026-07-03 (eyeball-queue #14): reconciled trainer-modules against the same-day 2026-07-03 close rework in the module .md files. (1) M4 open — added the-ironies-of-automation beat between the-far-half and the-agent-loop (newly promoted supplementary→lecture per run-the-first-experiment.md § Start here); ~2–3 min framing opener, matching the lecture's own Time-line cap (NOT the 5–7 the eyeball note guessed — the lecture author explicitly caps at 2–3, "past 3 it has started teaching the fixes"). M4 flow renumbered 2→8. (2) M5 close — added the-gate-is-a-claim-too as final closer after What-packaging-is (newly promoted supplementary→lecture per learn-from-the-test.md), 6–8 min matching its lecture Time line; M5 trainer cue updated to name two closers. (3) M6 close — swapped so the-map-filled-in is penultimate and agents-that-build-agents is dead-last, per the 2026-07-03 re-sequence recorded in spot-gaps-build-the-loop.md; dropped the stale "training's last beat" tag from map-filled-in. M1/M2/M3 beat lists cross-checked against their module files, already current. Anchors follow the built #lectures-<slug> convention (ironies → #lectures-ironies-of-automation, gate → #lectures-the-gate-is-a-claim). -->
<!-- maintainer — 2026-08-01 (run-sheet extraction): M1/M2/M4/M5 rebuilt into peer-trainer run sheets. Sources as of this date: each module body + its trainer Meta block (getting-going, plan-mode-done-right, run-the-first-experiment, learn-from-the-test) and the exercise maintainer blocks (orient-and-introspect, fix-tests-first, compound-and-close, close-the-ticket, push-back-on-the-plan, extract-the-task-shaping-rule, walk-and-send-off, diagnose-and-resend), plus trainer-guide.md schedule/compression paragraphs, training-architecture.md §Variant: Northwind Team Track, and the peer-trainer readiness tier in pre-cohort-todos.md. Known source contradictions are carried as one-parenthetical notes inside the runtime maps (M1 fix-tests-first 40 vs 25; M2 budget over-sum; M4 Debrief-12 vs no-compound close and 55/60 exercise figures; M5 60 vs 65 exercise split, closer pair vs 15-min line, M5 re-send LO same-session vs new-session body). Ironies-of-automation now sits inside M4's send-off section per the current module body, not between the openers. Alignment rule: any edit to a module body's flow or timing re-derives that module's run sheet in the same commit. M3/M6 remain glance-format; rebuild deferred, out of Northwind scope. -->
<!-- maintainer — 2026-08-01 (guide merge): trainer-guide.md deleted; this file is THE trainer doc (maintainer call: one doc per audience, DRY against student material, KISS for time-poor trainers). Its survivors landed as the Start here tab (operating contract, prep tiers, 2-day tables, twelve craft moves, room paragraph, never-list, feedback line), the M3 stunt block (M3 tab), and the M6 density guidance (M6 cues). Killed as duplication: the Delivery Architecture summary (training-architecture.md is the read-once home; observations/memory-allergy live in the M4 tab), per-module compression/cushion/re-entry paragraphs (in their tabs), the lead-in/open-hooks/back-reference/skill-name prompt rules (the projected student page shows these), the Quality-tag prep bullet (repo-internal), most Live Triage prose (compressed into The room). Relocated: the alternative 2-day reorder → training-architecture.md §Delivery-shape variants. Build: build-workbook.js skips the guide page when the .md is absent; trainerGuideHref retargeted to trainer-modules.html; default tab is start-glance. -->
