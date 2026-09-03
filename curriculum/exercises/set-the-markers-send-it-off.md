# Set the markers, *send it off*

**Time:** 12 minutes.

**Session** *(continue, m4-walk-send)*

The same session that ran the audit. It already holds the scoped task.

**What you do:** pin where this session starts and where its record lives, then send the task off and step away.

**What you build:** a branch, a starting commit, and a transcript path the next session can find.

**The point:** send it off plainly and you find out what you can't steer yet.

---

## Phase 1: Set the two return markers

*5 min*

- Claude Code writes every session's scrollback to disk, live. The next session reads this one from that file.

Ask Claude where the record of this session lives.

{{prompt:ae101-m4-locate-transcript}}

## Pin the starting point

- Whatever sits in your working tree lands in this commit. Unrelated WIP: scope it out first.
- The commit writes the branch name and the transcript path into `task.md`, so a later session recovers this experiment from disk instead of hunting for it.

Ask Claude to create a feature branch and commit current state, then report the short SHA.

{{prompt:ae101-m4-commit-starting-point}}

## Push it only if you want it off this laptop

- The commit is local, and that is the default. This is throwaway work you can reset away, and the next module forks from the local commit.

Ask Claude to push the branch to the remote.

{{prompt:ae101-m4-push-starting-point}}

## Phase 2: Send it off

*7 min*

Ask Claude to take the scoped task end-to-end in this same session.

{{prompt:ae101-m4-take-task-end-to-end}}

## Nudge sparingly while it runs

- Keep the laptop awake and plugged in (power settings → prevent sleep on power).
- Nudge by hand: answer a question, correct a path, push back on visible drift. Past ten or so interventions, you have become the agent; call it and read the transcript.
- If the session goes completely off the rails, stop it. The trace is the evidence either way.

If the agent stalls, ask it to keep going. The nudge reads as encouragement and lands as a taunt.

{{prompt:ae101-m4-nudge-continue}}

<!-- maintainer -->

**View summary:** You pin the two markers the next module returns to, the session transcript path and a starting-point commit on a throwaway branch, then paste the send-off prompt and step away while the agent works the task alone.

**Extracted from `run-the-first-experiment.md` § *Send the task off*, 2026-08-12, Antti-directed** (*"this passage actually should be a separate exercise. And split to few slides"*). The section ran as unbroken module prose carrying four prompts, which meant the Slides layout gave the whole send-off one enormous chunk and the beats had no headings to land on. Body wording is near-verbatim and the four `{{prompt:ae101-m4-*}}` refs are byte-intact. The transcript mechanism stays at one bullet — the fuller description belongs to the reference page, not here. No async-permission line in this file, and none belongs here: the send-off runs in the same session the student has been in all module, and `training-architecture.md:13` puts async cloud agents out of scope. **The strategy doc's row #11 is about a different promise** — permission to run two sessions at once, not permission to walk away from one — and M4 declines it, per the strategy doc's own row. Do not add a line on the row's authority.

**`ae101-m4-commit-starting-point` stays one paragraph — `check_prompts.md §36`'s sequential-build carve-out.** Its three move-groups (create the branch · append the protected block · stage, commit, report) cannot be reordered or read apart: the block reads the branch name back from git, so the branch must already exist, and the commit needs the block written first. A break after *"...without searching for it:"* would present a chain as a menu. The paragraph is over §36's word bar and stays there; do not split it, and do not re-raise.

**Timing.** The 12 min this file owns is the send-off's whole budget, and the module total is 105 min with it. Do not add a module-level transition for this beat — the leaf owns its duration, and a transition would bill it twice.

**"Past ten or so, you've become the agent" stays — maintainer call 2026-08-02.** `check_pedagogy.md §16` bans count-scripts but its own boundary clause exempts this shape: *"pacing calibrations survive as suggestions. A number that helps the student pace themselves (when to stop nudging) may stay in body in suggestion register (or so, around, a fair ceiling) — cut the prescription, keep the calibration."* The line carries `or so` and attaches a felt signal (*you've become the agent*), so it calibrates rather than prescribes; the banned shape is a bare imperative count like *"two rounds max"*. Cutting the number would strip the one piece of calibration a first-timer has no way to supply — they cannot know whether three nudges or thirty is normal. A pedagogy judge flagged it once, having read the ban and not the boundary.

**Leap test.** By the next working day the student: (a) owns a starting-point commit on a throwaway `m4/<slug>` branch, and can name the transcript path the next module reads; (b) hands a real task to an agent and walks away from it rather than nudging it line by line; (c) stops a run that has gone off the rails and keeps the trace, having treated the cancel as data.

**Failure modes + diagnostics.** This file owns the send-off, so it owns the send-off's failure modes; `walk-and-send-off.md` points here rather than restating them.
- **Package-pre-empt** — student tries to add a plan.md or build a verifier before sending off. Diagnostic: *"should I just quickly…"* Fix: trainer names the rule — *"un-packaged is by design. Don't pre-empt M5's learning."*
- **Send-off anxiety** — student hesitates at the final paste. Diagnostic: *"what if it runs forever / breaks things / gets nowhere?"* Fix: trainer names cancel-is-legit — *"stop it when you've seen enough. Traces are data."*
- **Coordinates never pinned** — student pastes the task prompt without committing a starting point. Diagnostic: no `m4/<slug>` branch at the close. Fix: catch it before the room breaks; M5's worktree fork reads exactly that commit, and its recovery ladder is a fallback, not a plan.

**Send-off mechanism:**
- Student passes the final prompt to the SAME Claude Code session they've been in for 90+ minutes. No new session. No `/schedule`, no `/loop`, no cloud runner.
- Student closes the laptop (power settings + plugged in) OR stops the run mid-flight when observation is sufficient.
- Trace preservation: Claude Code scrollback is the artifact M5 reads. Anything the student's configured for conversation logging continues.
- **Capability verified:** laptop-sleep freezes the session (not resumable on wake); Ctrl+C mid-tool-call can corrupt the `.jsonl`; no per-session token budget. Details in `reference/claude-code-for-engineers.md § 17`.

**Placement:** the last exercise of M4. The two closing lectures sit below it in the module file and run while the task is already going: `what-keeps-a-long-running-session-going` rides the live session, then `ironies-of-automation` closes the module. This file owns only what the student does.

**Vocabulary (2026-08-26):** body uses *session* for the agent's own sitting (the What-you-do line, the off-the-rails bullet), never noun-*run*, per `vocabulary.md § The work` (§21b). The leap test's *run* is trainer-side, outside §21b scope.

**Lean-intro trim (2026-08-25, Antti-approved):** Phase 1's stance bullet (*"Your rules files, memory, ADRs and skills are what they are… shows up when you read what comes back."*) cut — `test-and-learn` installed that stance a lecture earlier; this slide's job is the two markers. Do not restore.

**Quality:** compendium-audited 2026-08-29 (writing@43e6cae1 story@43e6cae1 technical@8cc00874 behavior@61e7fc9 pedagogy@1abb84c6 strategy@19249df slides@43e6cae1)
- judges @43e6cae1: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS (drift-recheck), strategy PASS, slides PASS
