---
key: em-draft-starter-questions
dest: Claude Code
runtime: cli
origin: engineering-management/ask-before-you-move
note: EM M2, exercises/draft-your-starter-questions. Five to ten open questions grounded in Team Knowledge, each run past the Quality Gate before saving; recommends three. The manager's pick is logged by em-log-first-three.
requires:
  - id: em-leadership-memory
    source: prompt:em-add-backfire-gates
    note: Team Knowledge grounds the questions; the Quality Gate's backfire checks screen them
  - id: em-diagnostic
    source: prompt:em-run-weekly-diagnostic
    conditional: diagnostic-ran
produces:
  - id: em-starter-questions
    location: questions.md
    consumed-by:
      - prompt:em-log-first-three
      - prompt:em-draft-first-three-messages
      - prompt:em-build-response-reader
      - prompt:em-close-ask-before-you-move
---
Draft five to ten starter questions I can put to my team this week, from what `team-leadership.md` knows about each person and from the latest report in `diagnostics/`, if there is one.

Each question should let a person show where they stand and what they would try with more room, so the answers tell me who wants to move, not only what they think. Keep each one open and answerable in a single message. Tie every question to the Team Knowledge entry it rests on and name that entry. Where an entry is thin, ask for the missing ground instead of guessing. Make at least one question ask who people go to when they want to try something new.

Before you save, run each question past the Quality Gate in `team-leadership.md`. If one reads as a mandate, a performance check or a push toward a tool, rewrite it and tell me which check it tripped.

Save the questions as `questions.md`, numbered. Then recommend the three I should send first, one line on why for each, and tell me what you wrote. Don't call AskUserQuestion; if something is unclear, say so in your reply and make a reasonable call.
