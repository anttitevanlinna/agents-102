---
key: em-shortlist-and-first-move
dest: Claude Code
runtime: cli
origin: engineering-management/find-the-two-crux
note: EM M3, exercise pick-your-first-move. Rerun the response reader on the full week, manager picks one move, Quality Gate check, Decision Journal entry with alternatives.
requires:
  - id: em-leadership-memory
    source: prompt:em-install-leadership-memory
  - id: em-response-reader
    source: prompt:em-build-response-reader
  - id: em-responses
    source: student-input (the week's answers, one file per person in responses/)
  - id: em-shortlists
    source: prompt:em-build-response-reader
produces:
  - id: em-shortlists
    location: shortlists.md
    note: refreshed over the full week of responses/
    consumed-by:
      - prompt:em-cross-read-peer-memory
      - prompt:em-find-two-crux
      - prompt:em-schedule-coalition-checkin
  - id: em-first-move
    location: team-leadership.md
    note: Decision Journal entry, context + alternatives + why this won + trade-offs
    consumed-by:
      - prompt:em-find-two-crux
      - prompt:em-close-find-the-two-crux
---
Run the response reader in `agents/response-reader.md` over everything in `responses/`, not only the answers that came in first. Let it rewrite `shortlists.md`.

Then walk me through the move shortlist. For each move, quote the answers behind it and say what it would cost the team. Don't pick for me. Ask me in chat which move I'm starting, and wait.

Before you log my pick, check it against the Quality Gate in `team-leadership.md`. If it trips a check, name the check and let me decide whether the move stands.

Log the pick in the Decision Journal: the context, what else was on the table, why this one won, and the trade-offs I'm accepting. If fewer than three people have answered, say so in the entry and tag the move as a hypothesis.

Tell me what you wrote. Don't use AskUserQuestion.
