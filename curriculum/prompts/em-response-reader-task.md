---
key: em-response-reader-task
dest: Claude Code
context: scheduled task prompt
runtime: cli
origin: engineering-management/ask-before-you-move
note: EM M2, exercises/build-the-response-reader. The Prompt field of the desktop app's daily scheduled task; must also run headless (claude -p). Points at agents/response-reader.md and follows it (same split as em-run-weekly-diagnostic).
requires:
  - id: em-response-reader
    source: prompt:em-build-response-reader
  - id: em-responses
    source: student-input (responses/, one file per person)
    conditional: answers-arrived
produces:
  - id: em-shortlists
    location: shortlists.md
    note: rewritten every run
    consumed-by:
      - prompt:em-close-ask-before-you-move
      - prompt:em-shortlist-and-first-move
---
Read the reader's instructions in `agents/response-reader.md` and follow them. Rewrite `shortlists.md` from what is in `responses/` now, and end it with one line on what changed since the last run. Don't call AskUserQuestion; if something is unclear, note it at the top of `shortlists.md` and carry on.
