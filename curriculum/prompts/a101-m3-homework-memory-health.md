---
key: a101-m3-homework-memory-health
dest: Claude Code
runtime: any
origin: agents-101/multi-agent-systems
requires:
  - id: m3-agent-work
    source: module:multi-agent-systems
produces:
  - id: memory-health-plan
    location: scrollback (shown before files change)
    note: restructures memory/ + sources/ after approval
---
Look at memory/ and sources/ against this module's fresh retrievals. Check overall health: coverage gaps the retrievers exposed, pages now stale, structure still serving the challenge. Name at least one drop candidate; an all-green health check means you didn't look hard enough. Restructure if deemed needed (rename, merge, split, drop). Show me what you'd do before changing files.
