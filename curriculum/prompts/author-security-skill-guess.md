---
key: author-security-skill-guess
dest: Claude Code
runtime: any
origin: exercises/author-security-skill
requires:
  - id: m3-agent-work
    source: artifact:m3-agent-work
produces:
  - id: m4-guess
    location: module-4/guess.md
    note: the student's verdict from output alone; the raw policy report sets it beside the rows
---
Do not audit anything yet. Show me the answer under `## Answer` in `./crux.md`, and list the files in `agents/` and `memory/` by name only.

Then ask me one question: judged only from what this system has produced, is it safe to run for real, and what, if anything, is wrong with it? Name the problems you see, or say you see none.

Write my answer word for word to `module-4/guess.md`. Do not comment on it.
