---
key: em-coalition-checkin-task
dest: Claude Code
context: local routine instructions (desktop app Routines), weekly
runtime: cli
origin: engineering-management/find-the-two-crux
note: EM M3, exercise schedule-the-coalition-check-in. The prompt pasted as a local routine's instructions in the desktop app (and runnable headless in the CLI); follows agents/coalition-check-in.md.
requires:
  - id: em-coalition-checkin-agent
    source: prompt:em-schedule-coalition-checkin
  - id: em-coalition
    source: prompt:em-schedule-coalition-checkin
  - id: em-observations
    source: prompt:em-schedule-weekly-diagnostic
produces:
  - id: em-coalition-checkin-drafts
    location: diagnostics/coalition-<date>.md
    note: one draft question per coalition member; the manager sends, the agent never does
    consumed-by:
      - prompt:em-close-find-the-two-crux
---
Follow the instructions in `agents/coalition-check-in.md`. Write this week's drafts to `diagnostics/`, with today's date in the file name.

Nobody is here to answer questions, so don't use AskUserQuestion. If something the agent needs is missing, note it at the top of the drafts file and do what you can with the rest.
