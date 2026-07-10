---
key: compound-and-close-3
dest: Claude Code
runtime: any
origin: exercises/close-the-ticket
requires:
  - id: ticket-summary
    source: prompt:compound-and-close-2
  - id: shipped-bug-fix
    source: prompt:fix-tests-first-3
produces:
  - id: ticket-close-out
    location: external (ticket updated via MCP connector)
    consumed-by: []
    note: terminal artifact — the closed ticket lives in the team's tracker, not the training corpus
---
Update the ticket: short close-out note naming what the root cause was and how we fixed it, link to the PR if you opened one (otherwise link the branch). If we needed to create the ticket just now, create it first, then update. Tell me what you wrote.
