---
key: em-draft-first-three-messages
dest: Claude Code
runtime: cli
origin: engineering-management/ask-before-you-move
note: EM M2, exercises/send-the-first-three. Drafts one short message per chosen recipient in the manager's voice into outbox.md. The agent never sends; the manager edits and sends by their own channel.
requires:
  - id: em-starter-questions
    source: prompt:em-draft-starter-questions
  - id: em-leadership-memory
    source: prompt:em-log-first-three
    note: the Decision Journal pick (which three, to whom) and Team Knowledge for tone
  - id: em-team-notes
    source: external
    note: team-notes.md from M1, read for the manager's own voice
produces:
  - id: em-outbox
    location: outbox.md
    consumed-by:
      - prompt:em-close-ask-before-you-move
---
Draft one short message for each of the three people I'm sending a question to first, from the pick logged in my Decision Journal in `team-leadership.md` and the questions in `questions.md`.

Write each one the way I would send it to that person: a line on why I'm asking, the question, and that any answer is welcome, including "not sure yet". Match the voice of my own notes in `team-notes.md`. Use what Team Knowledge says about each person to set the tone, but leave out the memory, ADKAR, and anything that reads like an assessment. Keep each message under 80 words.

Save all three in `outbox.md`, one section per person, with the channel they most likely answer me in. Don't send anything. Tell me which line in each message you're least sure sounds like me. Don't call AskUserQuestion; if something is unclear, say so and make a reasonable call.
