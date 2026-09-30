---
key: em-log-first-three
dest: Claude Code
runtime: cli
origin: engineering-management/ask-before-you-move
note: EM M2, exercises/draft-your-starter-questions. Logs the manager's pick of the first three questions in the Decision Journal (context, alternatives, why, trade-off) and adds one Quality Gate check readable against responses/. Headless, it takes Claude's own recommendation and marks it as Claude's.
requires:
  - id: em-starter-questions
    source: prompt:em-draft-starter-questions
  - id: em-leadership-memory
    source: prompt:em-add-backfire-gates
  - id: em-first-three-pick
    source: scrollback (the manager's reply naming the three questions and why; absent when run headless)
produces:
  - id: em-leadership-memory
    location: team-leadership.md
    note: Decision Journal entry (first three + alternatives + trade-off) and one Quality Gate check
    consumed-by:
      - prompt:em-draft-first-three-messages
      - prompt:em-build-response-reader
      - prompt:em-close-ask-before-you-move
      - prompt:em-shortlist-and-first-move
---
Log my pick in the Decision Journal in `team-leadership.md`: the three questions from `questions.md` I'm sending first and who each goes to, the questions that were on the table and not chosen, why these three won, and what I give up by holding the others back. If my pick differs from your recommendation, record both and my reason. If I haven't told you my pick, log your recommendation and mark it as yours, not mine.

Then add one check to the Quality Gate that I can read against `responses/` in a week to tell whether these questions surfaced who wants to move. Say what a yes and a no would look like in the answers.

Tell me what you added. Don't call AskUserQuestion; if something is unclear, say so and make a reasonable call.
