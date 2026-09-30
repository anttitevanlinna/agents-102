---
key: em-install-leadership-memory
dest: Claude Code
runtime: cli
origin: engineering-management/see-your-team
note: EM M1. Reads the manager's hand-written notes, installs team-leadership.md with Team Knowledge (ADKAR per person, adoption-curve tier for the team, observation/hypothesis/rule tags, quoted evidence, thin notes named), Decision Journal (why these placements + confidence baseline) and Quality Gate (calibration question as top gate). Exercise include exercises/install-your-leadership-memory.
requires:
  - id: em-team-notes
    source: external
    note: team-notes.md, written by hand in exercises/write-your-team-notes; line one = 1-10 confidence baseline
produces:
  - id: em-leadership-memory
    location: team-leadership.md
    consumed-by:
      - prompt:em-add-backfire-gates
      - prompt:em-schedule-weekly-diagnostic
      - prompt:em-run-weekly-diagnostic
      - prompt:em-close-see-your-team
      - prompt:em-draft-starter-questions
      - prompt:em-build-response-reader
      - prompt:em-close-ask-before-you-move
      - prompt:em-shortlist-and-first-move
      - prompt:em-find-two-crux
      - prompt:em-schedule-coalition-checkin
      - prompt:em-close-find-the-two-crux
      - prompt:em-deliberate-intent
      - prompt:em-rehearse-reactions
      - prompt:em-build-creation-v1
      - prompt:em-close-declare-your-intent
  - id: em-confidence-baseline
    location: team-leadership.md
    note: copied from team-notes.md line one into the Decision Journal's opening entry
    consumed-by:
      - prompt:em-close-declare-your-intent
---
Read my notes on my team in `team-notes.md` and set up `team-leadership.md` as my leadership memory. Give it three sections: Team Knowledge, Decision Journal and Quality Gate.

In Team Knowledge, place each person on ADKAR (Awareness, Desire, Knowledge, Ability, Reinforcement): the furthest stage they have clearly reached, and what they need next. Then place the whole team on the adoption curve: chatting, custom assistants, agentic workflows, compounding engineering.

Tag every entry as an observation, a hypothesis or a rule, and quote the line from my notes it rests on. Nothing starts as a rule unless my notes say I have seen it again and again. Where my notes are too thin to place someone, write that down instead of guessing.

In the Decision Journal, add one dated entry: the placements you made, what else you considered for the ones you are least sure of, and why you chose as you did. Put the confidence rating from the first line of my notes in that entry, marked as my starting baseline.

In the Quality Gate, put one gate at the top: "Did this make progress? Did it lay ground for progress later?"

Don't ask me questions while you work. Where something is unclear, make a sensible call and note it in the file. Then tell me what you wrote, which placement you are least sure of, and the one thing about my team you would most want me to find out this week.
