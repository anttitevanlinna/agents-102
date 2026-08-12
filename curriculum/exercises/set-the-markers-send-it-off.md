# Set the markers, *send it off*

**Time:** 12 minutes.

**Session** *(continue, m4-walk-send)*

The same session that ran the audit. It already holds the scoped task.

**What you do:** pin where this run starts and where its record lives, then send the task off and step away.

**What you build:** a branch, a starting commit, and a transcript path the next session can find.

**The point:** send it off plainly and you find out what you can't steer yet.

---

## Phase 1: Set the two return markers

*5 min*

- Your rules files, memory, ADRs and skills are what they are, and the agent runs against them as they stand. What needs sharpening shows up when you read what comes back.
- Claude Code writes every session's scrollback to disk, live. The next session reads this one from that file.

Ask Claude where the record of this session lives.

{{prompt:ae101-m4-locate-transcript}}

## Pin the starting point

- Whatever sits in your working tree lands in this commit. Unrelated WIP: scope it out first.
- The commit writes the branch name and the transcript path into `task.md`, so a later session recovers this experiment from disk instead of hunting for it.

Ask Claude to commit current state on a feature branch and report the short SHA.

{{prompt:ae101-m4-commit-starting-point}}

## Push it only if you want it off this laptop

- The commit is local, and that is the default. This is throwaway work you can reset away, and the next module forks from the local commit.

{{prompt:ae101-m4-push-starting-point}}

## Phase 2: Send it off

*7 min*

Ask Claude to run the scoped task end-to-end in this same session.

{{prompt:ae101-m4-take-task-end-to-end}}

## While it runs

- Keep the laptop awake and plugged in (power settings → prevent sleep on power).
- Nudge by hand: answer a question, correct a path, push back on visible drift. Past ten or so interventions, you have become the agent; call it and read what is there.
- If the run goes completely off the rails, stop it. The trace is the result either way.

If Claude stalls and you want to see whether it picks itself back up, this nudge is phrased as encouragement and lands as a taunt:

{{prompt:ae101-m4-nudge-continue}}

<!-- maintainer -->

**View summary:** You pin the two markers the next module returns to, the session transcript path and a starting-point commit on a throwaway branch, then paste the send-off prompt and step away while the agent works the task alone.

**Extracted from `run-the-first-experiment.md` § *Send the task off*, 2026-08-12, Antti-directed** (*"this passage actually should be a separate exercise. And split to few slides"*). The section ran as unbroken module prose carrying four prompts, which meant the Slides layout gave the whole send-off one enormous chunk and the beats had no headings to land on. Body wording is near-verbatim; the four `{{prompt:ae101-m4-*}}` refs are byte-intact. Two things changed beyond re-chunking: the transcript paragraph's mechanism (*"a full transcript of every session on disk, the complete scrollback, written live and automatically"*) compressed to one bullet, and *"You'll run more work async from here on"* was cut as a forward promise the module does not cash.

**Timing.** The 12 min this file owns is the budget the module's `send-off` transition used to carry; that transition was removed in the same edit, so the module total is unchanged at 105 min. Do not re-add a transition for this beat — the leaf owns its duration.

**"Past ten or so, you've become the agent" stays — maintainer call 2026-08-02.** `check_pedagogy.md §16` bans count-scripts but its own boundary clause exempts this shape: *"pacing calibrations survive as suggestions. A number that helps the student pace themselves (when to stop nudging) may stay in body in suggestion register (or so, around, a fair ceiling) — cut the prescription, keep the calibration."* The line carries `or so` and attaches a felt signal (*you've become the agent*), so it calibrates rather than prescribes; the banned shape is a bare imperative count like *"two rounds max"*. Cutting the number would strip the one piece of calibration a first-timer has no way to supply — they cannot know whether three nudges or thirty is normal. A pedagogy judge flagged it once, having read the ban and not the boundary.

**Placement:** the last beat of M4. The ironies lecture sits above the include in the module file (it frames the watcher's trap before the task leaves), and the two closing lectures sit below it (they run while the task is already going). This file owns only what the student does.

**Quality:** compendium-audited 2026-08-12 (writing@61e7fc9 story@61e7fc9 technical@61e7fc9 behavior@61e7fc9 slides@61e7fc9)
- judges @61e7fc9: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy REVISE (2blocking/0todo-see-instances/ae101--exercise--set-the-markers-send-it-off.pedagogy.json), strategy REVISE (1blocking/0todo-see-instances/ae101--exercise--set-the-markers-send-it-off.strategy.json), slides PASS
