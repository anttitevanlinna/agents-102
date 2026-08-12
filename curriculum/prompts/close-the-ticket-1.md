---
key: close-the-ticket-1
dest: Claude Code
runtime: any
origin: exercises/close-the-ticket
requires:
  - id: shipped-bug-fix
    source: prompt:fix-tests-first-3
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
