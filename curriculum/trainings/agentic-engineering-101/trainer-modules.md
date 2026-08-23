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
- Teach the shipped prompt. Never improve a send-off prompt; its under-specification is the curriculum.
- A stuck student asks their own Claude first. One broken laptop: 30 seconds, then a buddy.
- Narrate agent waits; never apologize for them. A quiet first beat is a Nordic norm, not no-signal.

**After each sitting.** Note what slipped and what fired while it's fresh; send it to your delivery contact (ArcticRex).

</section>

<!--flag:module:getting-going-->
<section class="module-glance" id="m1-glance">

### M1 — Getting going + context

**Slot.** 2-day cohort: Day 1, 08:30–10:30 (2h). Four-sitting track: sitting 1, 2h. Thinking effort `high`.

**Runtime map.**

{{runtime-map:getting-going}}

**Prep.** Demo on a repo where tests run locally; tell students the same. If your delivery contact gave you the confidence instrument, it runs at open, before anything is taught.

**Generally:** a stuck student asks their own Claude first. You step in only for the three below.

- **Bug fix runs long** → move on when two-thirds of the room are through. Nothing downstream needs a green PR.
- **No repo or no bug from prework** → they do the prework now and join at Fix tests-first. Don't hold the room.
- **Your wizard demo** → three fresh Claude Code sessions, a new empty folder each, outside any repo. That does not clear `~/.claude/CLAUDE.md` or `~/.claude/rules/`; those load everywhere, so read your own user rules first and check nothing there steers food or tone. Dry-run it once. If session 2 still answers Finnish: *"it remembered — that's the point, one step early."*

</section>
<!--/flag:module:getting-going-->

<!--flag:module:plan-mode-done-right-->
<section class="module-glance" id="m2-glance">

### M2 — Plan mode, done right

**Slot.** 2-day cohort: Day 1, 10:50–12:50 (2h, straight through). Four-sitting track: sitting 2, 2h. **Runs 7 min past its slot.** Thinking effort `medium`.

**Runtime map.**

{{runtime-map:plan-mode-done-right}}

**Prep.** Your demo `CLAUDE.local.md` must hold one rule that obviously belongs in a skill (a multi-step procedure only some sessions need), or the closing `name-what-moves` demo returns "none" and the room sees nothing move.

- **Plan mode hasn't returned when Phase 3 should start** → the task is too big. Stop it, *"plan only the first slice"*, restart. 8–12 min is normal; past 20 nobody waits.
- **The integrate prompt wiped `CLAUDE.local.md`** (gitignored, no git undo) → the old rules are still in this session's scrollback; restore from there before the session closes. Check the diff after every student's integrate: add, not replace.

</section>
<!--/flag:module:plan-mode-done-right-->

<!--flag:module:earn-the-trust-->
<section class="module-glance" id="m3-glance">

### M3 — Earn the trust

**Slot.** Day 1, 14:05–16:05 (2h). Closes with the M4 task-pick homework.

**Runtime map.**

{{runtime-map:earn-the-trust}}

**Prep.** Know what `security-tools` does before the room does (below). Have a feature of your own with an external or user-facing surface.

- **`/skills` doesn't list `access-control-analysis` and `stride`** → the prework install didn't land. They re-run the prework install prompt, buddy if needed; the module is the skill invocation, so there's no running it without them.
- **No feature with an outside surface** → three-candidate chat. Anything that takes input from a user, a webhook, or another service.
- **Skill authoring past 12 minutes** → ship it with a one-line TODO at the top. The longest beat in M3 and where rooms stall; one author pass, one critique, one invocation.
- **The `security-tools` stunt.** Prework installed it as a generic pre-flight. The first STRIDE prompt invokes it; the script runs a few plausible checks, then prints a rick-rolled ASCII face and a note: tarball, SKILL.md, Bash authorization, all trusted unread. Don't spoil it (*"a pre-flight check; you'll see it run"*). When it lands, show your terminal verbatim and wait two beats. Then one minute: every link got trusted; that's this module's access-surface logic one level up; that's why curated beats random. Students who read `check.sh` first: *"you noticed — that's the lesson."* If it doesn't fire, press on; the SKILL.md body carries the text.

</section>
<!--/flag:module:earn-the-trust-->

<!--flag:module:run-the-first-experiment-->
<section class="module-glance" id="m4-glance">

### M4 — Run the first experiment

**Slot.** 2-day cohort: Day 2, 08:30–10:30 (2h). Four-sitting track: sitting 3, 2h. Phase 1 is a 2-minute confirm because the task came in as homework.

**Runtime map.**

{{runtime-map:run-the-first-experiment}}

**Prep.** Your demo repo needs M1–M2 artefacts and a task you scoped. The send-off you demo runs live; don't pre-run it.

- **Task is the wrong size despite the homework** → three-candidate chat, push both ways. A smaller task that runs the whole arc beats a bigger one that can't be scoped in 10 minutes.
- **Before anyone leaves** → ask each student to check they have the branch, the short SHA and the transcript path somewhere they'll find next sitting. The fork depends on exactly those.

</section>
<!--/flag:module:run-the-first-experiment-->

<!--flag:module:learn-from-the-test-->
<section class="module-glance" id="m5-glance">

### M5 — Learn from the test, re-send packaged

**Slot.** 2-day cohort: Day 2, 10:50–12:50 (2h; the re-send fires at close and runs through lunch). Four-sitting track: sitting 4, the finale. **Runs about 16 min past 2h by design; plan for it, don't cut for it.** Book 2h15 if you can; if not, end on the gate lecture's last landed slide and point at the rest. Start the fork the moment the room settles.

**Runtime map.**

{{runtime-map:learn-from-the-test}}

**Prep.** You need your own M4 run on disk: the `m4/<slug>` branch, `task.md` with its coordinates, the transcript. Regenerate by re-running M4's send-off for 15–30 min; that's enough.

- **No M4 artefact at all** → they run M4's send-off now on their own repo and let it cook, then watch along with the room. The exercise itself is theirs to do on their own time. Never hand them a stand-in run.
- **Exercise session opened in the original repo, not the worktree** → everything lands on the M4 branch and the contrast is dead. `pwd` before Phase 1, every student.
- **Verifier won't wire as a hook** → running it by prompt counts. Nobody burns the slot on hook registration.
- **Phase 4 past 25 minutes** → the reference is becoming a manifesto. Half a page each, *"lock it in"*, re-send before the sitting ends. The meticulous take 1–2 hours on a long-run plan; there is no time for that here, and the contrast doesn't need it.

</section>
<!--/flag:module:learn-from-the-test-->

<!--flag:module:spot-gaps-build-the-loop-->
<section class="module-glance" id="m6-glance">

### M6 — Spot gaps, build the loop

**Slot.** Day 2, 14:05–16:05 (2h). Lecture-dense by design.

**Runtime map.**

{{runtime-map:spot-gaps-build-the-loop}}

**Prep.** Your own M5 re-send, finished or stopped, in the M5 worktree. If your delivery contact gave you the confidence instrument, it runs at the close; same wording as at M1 open.

- **An M5 re-send still running at open** → if it's been an hour, stop it; the trace is the artefact. M6 reads both sessions from disk and a half-finished run reads fine.
- **No packaged session at all** → they fire the re-send now, let it cook, and run Phase 1 against whatever has landed by the time the room gets there. One session to read where the exercise needs two is thin but not empty.
- **Low energy in the closing lectures** → keep the composition lecture to the chart and its four mechanisms, point at the supplementary, move to the closer pair. Two beats of silence after a question is fine.

</section>
<!--/flag:module:spot-gaps-build-the-loop-->

<!-- maintainer — tab contract: every module tab and its nav link sit inside a matching `flag:module:<slug>` pair, so a cut's handbook carries a tab exactly when the cut runs that module. build-workbook.js resolves this file from the parent contentKey and applies the flags against the cut's own module list. A new tab needs its flag pair in BOTH the nav strip and the section. The Start here tab's two-day schedule is keyed on `module:spot-gaps-build-the-loop` (M6 = six-module sentinel); the `no-module:` branch carries the weekly-sittings contract and the between-sittings chain. The Four-sitting paragraphs on M2/M4/M5 are unflagged on purpose: flags do not nest, and the parser throws on the inner pair. Runtime maps are placeholders expanded from `scripts/calculate-time.js`; no tab states a total or verdict of its own. Scope rule (2026-08-23): Slot, runtime map, mood Check/Fix, verbatim push-backs, gotchas, cut order, demo state. No Flow, no exercise goals, no Big idea — the projected workbook page carries those. -->
