---
key: em-schedule-weekly-diagnostic
dest: Claude Code
runtime: cli
origin: engineering-management/see-your-team
note: EM M1. Writes the weekly diagnostic agent file (reads observations/, responses/ when present, and Team Knowledge; proposes tier promotions/demotions with cited evidence, writes diagnostics/<date>.md, never edits team-leadership.md) and creates the observations/ and diagnostics/ folders. Exercise include exercises/schedule-the-weekly-diagnostic.
requires:
  - id: em-leadership-memory
    source: prompt:em-install-leadership-memory
opportunistic-copy:
  - id: em-responses
    if-present-at: responses/
    rationale: M2 answers land here from the second week; the diagnostic reads them when present (cross-module decision 5)
produces:
  - id: em-weekly-diagnostic
    location: agents/weekly-diagnostic.md
    consumed-by:
      - prompt:em-run-weekly-diagnostic
      - prompt:em-draft-starter-questions
  - id: em-observations
    location: observations/
    note: created empty; the manager drops one file per conversation (Bring to Module 2; M3 coalition conversation; M4 creation hand-off)
    consumed-by:
      - prompt:em-run-weekly-diagnostic
      - prompt:em-coalition-checkin-task
      - prompt:em-build-creation-v1
      - prompt:em-close-declare-your-intent
      - module:ask-before-you-move
      - module:find-the-two-crux
      - module:declare-your-intent
  - id: em-diagnostics-folder
    location: diagnostics/
    note: created empty; filled by em-run-weekly-diagnostic
---
Write an agent file at `agents/weekly-diagnostic.md` that keeps Team Knowledge in `team-leadership.md` current. Create the folders `observations/` and `diagnostics/` if they don't exist.

Each run, the agent reads Team Knowledge, every file in `observations/`, and every file in `responses/` if that folder exists. It compares what it reads with each person's current entry.

It proposes changes, it does not make them. It proposes promoting an observation to a hypothesis when a new file backs it up, a hypothesis to a rule when evidence has held across several weeks, and demoting anything a new file contradicts. Every proposal quotes the file and line it rests on. It also lists who has no new evidence since the last run.

It writes its proposals to `diagnostics/` as a file named with the run's date, and never edits `team-leadership.md` itself. If there is nothing new to read, it says so in one line instead of restating Team Knowledge.

Don't ask me questions while you work. Then tell me what you wrote, and what the agent will do on a week when I have added nothing to `observations/`.
