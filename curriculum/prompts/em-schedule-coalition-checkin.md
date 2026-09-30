---
key: em-schedule-coalition-checkin
dest: Claude Code
runtime: cli
origin: engineering-management/find-the-two-crux
note: EM M3, exercise schedule-the-coalition-check-in. Record the named coalition in Team Knowledge against the crux; write the weekly check-in agent (asks what they need, never what they did; proposes only, never sends).
requires:
  - id: em-two-crux
    source: prompt:em-find-two-crux
  - id: em-shortlists
    source: prompt:em-shortlist-and-first-move
  - id: em-responses
    source: student-input (responses/, one file per person)
  - id: em-observations
    source: prompt:em-schedule-weekly-diagnostic
  - id: em-coalition-names
    source: student-input (the people the manager names from the coalition shortlist)
produces:
  - id: em-coalition
    location: team-leadership.md
    note: Team Knowledge coalition tier, each member tied to a crux
    consumed-by:
      - prompt:em-coalition-checkin-task
      - prompt:em-close-find-the-two-crux
      - module:declare-your-intent
  - id: em-coalition-checkin-agent
    location: agents/coalition-check-in.md
    consumed-by:
      - prompt:em-coalition-checkin-task
---
Ask me in chat which people from the coalition list in `shortlists.md` are coming with me on the two crux, and wait for my answer.

Record them in Team Knowledge in `team-leadership.md` as my coalition. For each person, name the crux they're closest to and quote the answer from `responses/` that put them on the list.

Then write `agents/coalition-check-in.md`, an agent that runs weekly. Each run it reads the coalition and the two `crux` hypotheses in Team Knowledge, plus the newest files in `observations/`. It drafts one short question per coalition member about what they need next to move their crux: time, access, someone to learn from, permission. It never asks what they did or how far they got. The coalition are companions, not a reporting line.

The agent writes its drafts to a file in `diagnostics/` named `coalition-` followed by the run date, and stops there. It never sends anything and never edits `team-leadership.md`.

Tell me what you wrote. Don't use AskUserQuestion.
