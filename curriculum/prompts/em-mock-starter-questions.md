---
key: em-mock-starter-questions
dest: Claude Code
runtime: cli
origin: engineering-management-mock/ask-before-you-move
note: EM mock M2, a tmux-runner proving training. Starter questions from the memory, pick journaled with alternatives, one Quality Gate check. Approved prompt-ok 2026-09-27.
requires:
  - id: em-leadership-memory
    source: prompt:em-mock-diagnose-your-team
produces:
  - id: em-starter-questions
    location: starter-questions.md
  - id: em-leadership-memory
    location: team-leadership.md
    note: Decision Journal entry + first Quality Gate check added
---
Using what `team-leadership.md` already knows about my team, draft five to ten starter questions I can put to my team this week. Each question should let a person show where they stand and what they would try with more room, so I learn who wants to move, not only what they think. Ground each question in a specific Team Knowledge entry and name it.

Then pick the three I should ask first. Log that pick in the Decision Journal: what else was on the table, why these three won, and what I give up. Add one check to the Quality Gate that would tell me in a week whether the questions worked.

Save the questions as `starter-questions.md` and tell me what you changed in `team-leadership.md`.
