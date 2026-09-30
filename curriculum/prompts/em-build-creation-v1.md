---
key: em-build-creation-v1
dest: Claude Code
runtime: cli
origin: engineering-management/declare-your-intent
note: EM M4 exercise build-your-first-creation, Phase 2. One working leadership mechanism in creation/ (one agent file + what it needs), grounded in cited Team Knowledge + observations, usable by someone other than the manager, proposes only. Runs once on real material; journal entry. Hands back a Schedule-sidebar prompt only if it needs a cadence.
requires:
  - id: em-frustrations
    source: prompt:em-list-frustrations
  - id: em-manager-pick
    source: scrollback (the frustration the manager picked, and why, typed in chat)
  - id: em-leadership-memory
    source: prompt:em-install-leadership-memory
  - id: em-two-crux
    source: prompt:em-find-two-crux
  - id: em-intent
    source: prompt:em-write-intent
  - id: em-observations
    source: prompt:em-schedule-weekly-diagnostic
  - id: em-coalition
    source: prompt:em-schedule-coalition-checkin
produces:
  - id: em-creation
    location: creation/
    consumed-by:
      - prompt:em-close-declare-your-intent
  - id: em-leadership-memory
    location: team-leadership.md
    note: Decision Journal entry naming the frustration, options passed over, which crux it moves, what v1 leaves out
---
Build a first version around the frustration I just picked. It lives in `creation/`: one agent file that says what it reads, what it does and what it writes, plus whatever it needs to run, such as an example or a shared file.

Design it from this team. Quote the Team Knowledge entries and the notes in `observations/` it was built from. If it would work for any team unchanged, it is not done.

Someone other than me should be able to use it, starting with one person from my coalition in Team Knowledge. It proposes and drafts; it never sends messages or changes anything outside `creation/`. One agent, one job.

Run it once now on my team's real material and save the output in `creation/`. If the run needs material that isn't there, say what, rather than making it up.

Log it in the Decision Journal in `team-leadership.md`: the frustration, the others on the list, why this one, which crux it moves, and what this version leaves out on purpose.

Tell me what you built and what the run produced. If it should run on a schedule, give me the prompt to paste into a scheduled task. Don't call AskUserQuestion; where a design choice is open, take the simpler one and say so.
