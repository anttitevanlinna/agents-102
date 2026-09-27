---
key: em-mock-diagnose-your-team
dest: Claude Code
runtime: cli
origin: engineering-management-mock/see-your-team
note: EM mock M1 (tmux-runner proving training): install the three-block memory, first ADKAR diagnostic; thin notes flagged, not guessed. Approved prompt-ok 2026-09-27.
requires:
  - id: em-team-notes
    source: external
produces:
  - id: em-leadership-memory
    location: team-leadership.md
    consumed-by:
      - prompt:em-mock-starter-questions
---
Read my notes on my team in `team-notes.md` and set up `team-leadership.md` as my leadership memory. Give it three sections: Team Knowledge, Decision Journal and Quality Gate.

In Team Knowledge, place each person on ADKAR (Awareness, Desire, Knowledge, Ability, Reinforcement) and the whole team on the adoption curve, from chatting to compounding engineering. Tag every entry as an observation, a hypothesis or a rule, and quote the line from my notes it rests on. Where my notes are too thin to place someone, write that down instead of guessing.

Leave the Decision Journal and Quality Gate empty for now. Then tell me what you wrote, and the one thing about my team you would most want me to find out this week.
