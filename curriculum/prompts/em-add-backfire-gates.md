---
key: em-add-backfire-gates
dest: Claude Code
runtime: cli
origin: engineering-management/see-your-team
note: EM M1. Student-run lecture prompt (check_lectures §6 carve-out, the answer must be theirs). Writes the three backfire checks (competence before platform, pull not mandate, hybrid from day one) into the Quality Gate under the calibration question, each as a testable check run before any move is logged. Lecture include lectures/three-moves-that-backfire.
requires:
  - id: em-leadership-memory
    source: prompt:em-install-leadership-memory
produces:
  - id: em-leadership-memory
    location: team-leadership.md
    note: Quality Gate gains three backfire checks
    consumed-by:
      - prompt:em-shortlist-and-first-move
      - prompt:em-deliberate-intent
---
Add three checks to the Quality Gate in `team-leadership.md`, under the progress question. Every move I log from now on gets run against them before it goes in the Decision Journal.

1. Competence before platform: does this move build my people's ability to use agents, or does it pick a tool or platform before they can use one well?
2. Pull, not mandate: does this move make someone want to try, or does it require usage, set a usage target, or tie AI to performance reviews?
3. Hybrid from day one: does this move keep a person checking the agent's work at the points that matter, or does it aim for the agent to run alone?

Write each check as a question I can answer yes or no about a specific move, and add one line under each on what a failing move looks like on my team, using what Team Knowledge already says about my people.

Don't ask me questions while you work. Then tell me which of the three my team is closest to failing today, and why.
