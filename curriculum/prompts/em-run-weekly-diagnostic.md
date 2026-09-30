---
key: em-run-weekly-diagnostic
dest: Claude Code
context: scheduled task prompt
runtime: cli
origin: engineering-management/see-your-team
note: EM M1. The Prompt field of the desktop app's weekly scheduled task; must also run headless (claude -p) with no AskUserQuestion. Reads agents/weekly-diagnostic.md and follows it. Exercise include exercises/schedule-the-weekly-diagnostic. Same split as personal-agent-homework-2/-3.
requires:
  - id: em-weekly-diagnostic
    source: prompt:em-schedule-weekly-diagnostic
  - id: em-leadership-memory
    source: prompt:em-install-leadership-memory
  - id: em-observations
    source: prompt:em-schedule-weekly-diagnostic
opportunistic-copy:
  - id: em-responses
    if-present-at: responses/
    rationale: M2 answers land here from the second week; the diagnostic reads them when present (cross-module decision 5)
produces:
  - id: em-diagnostic
    location: diagnostics/<date>.md
    consumed-by:
      - module:ask-before-you-move
      - prompt:em-close-see-your-team
---
Read `agents/weekly-diagnostic.md` and do what it says, using `team-leadership.md`, `observations/` and, if it exists, `responses/`.

Write this run's diagnostic to `diagnostics/`, named with today's date. Don't edit `team-leadership.md`.

This runs unattended, so don't ask questions. Where something is unclear, make a sensible call and note it in the diagnostic.
