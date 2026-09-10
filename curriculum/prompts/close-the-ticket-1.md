---
key: close-the-ticket-1
dest: Claude Code
runtime: any
origin: exercises/close-the-ticket
requires:
  - id: shipped-bug-fix
    source: external (shipped by body prose at exercises/fix-tests-first § Ship the PR, which runs on every path; both fenced TDD prompts above it are Optional)
  - id: ticket-tracker
    source: external (Linear / Jira / GitHub Issues; student pastes the ticket, or the agent reads it where it can already reach the tracker)
produces:
  - id: ticket-summary
    location: scrollback (ticket fields + comments read back)
    consumed-by:
      - prompt:close-the-ticket-2
      - prompt:close-the-ticket-3
---
Read the ticket for the bug we just fixed. Tell me what it says: reporter, description, any comments.

If you can't find it, search the tracker by keywords from the bug; if there still isn't one, say so and we'll create one. If you find it but can't open it, ask me to paste the fields rather than reading anything off the URL.

Ticket:
