---
key: em-close-ask-before-you-move
dest: Claude Code
context: final move of the module
runtime: cli
origin: engineering-management/ask-before-you-move
note: EM M2 close, the Did you make progress? beat. Calibration question against this module's evidence (questions sent, first answers, shortlists, who has not answered), one in-chat question on what surprised the manager, verdict into the Decision Journal.
requires:
  - id: em-leadership-memory
    source: prompt:em-log-first-three
  - id: em-starter-questions
    source: prompt:em-draft-starter-questions
  - id: em-outbox
    source: prompt:em-draft-first-three-messages
  - id: em-shortlists
    source: prompt:em-build-response-reader
  - id: em-responses
    source: student-input (responses/, one file per person)
    conditional: answers-arrived
produces:
  - id: em-leadership-memory
    location: team-leadership.md
    note: Decision Journal gains the M2 calibration entry
    consumed-by:
      - prompt:em-shortlist-and-first-move
---
Put the Quality Gate's top question to this module: did I make progress, and did I lay ground for progress later? Answer from what is in my folder, not from how the session felt: which questions went out and to whom (the Decision Journal and `outbox.md`), what has come back in `responses/`, what `shortlists.md` says so far, and who hasn't answered.

Then ask me one question about what surprised me, in the answers or in who stayed quiet. Write my answer and your verdict into the Decision Journal as this module's closing entry. If nothing has come back yet, say what that tells us and what a yes would look like before the next module.

Don't call AskUserQuestion. If I'm not here to answer, write the verdict and leave the surprise line open for me.
