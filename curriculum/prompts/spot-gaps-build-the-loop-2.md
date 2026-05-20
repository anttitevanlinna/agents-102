---
key: spot-gaps-build-the-loop-2
dest: Claude Code
context: only if a rule earned cutting
runtime: any
origin: exercises/spot-gaps-build-the-loop
requires:
  - id: two-run-gap-map
    source: prompt:spot-gaps-build-the-loop-1
  - id: claude-local-md
    source: prompt:compound-and-close-1
    conditional: m1-completed
produces:
  - id: stale-rule-cut
    location: ./CLAUDE.local.md (in-place; one rule removed)
    conditional: rule-earned-cutting
    consumed-by:
      - prompt:arc-retrospective-1
---
Read ./CLAUDE.local.md. Read this session's scrollback: the gap list I just ranked, the un-packaged-vs-packaged contrast moments, the dominant gap. Find the one rule the two-run diagnosis showed is wrong, stale, or never fires when it should. Cut it from ./CLAUDE.local.md in place. Show me the line you cut, in two sentences why diagnosis killed it. If every rule still holds under diagnosis, say so and stop.
