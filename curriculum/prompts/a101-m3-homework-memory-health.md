---
key: a101-m3-homework-memory-health
dest: Claude Code
runtime: any
origin: agents-101/multi-agent-systems
requires:
  - id: m3-agent-work
    source: artifact:m3-agent-work
  - id: m3-curated-memory
    source: prompt:three-retrievers-one-curator-5
produces:
  - id: memory-health-plan
    location: scrollback (shown before files change)
    note: restructures memory/ + sources/ after approval
---
Look at `memory/` and `sources/` against this module's fresh retrievals.

Check overall health:
- coverage gaps the retrievers exposed
- pages now stale
- whether the structure still serves the challenge

Name at least one drop candidate; an all-green health check means you didn't look hard enough.

If restructuring is needed, propose the renames, merges, splits, or drops. Show me the plan before changing any files.
