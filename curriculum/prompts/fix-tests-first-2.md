---
key: fix-tests-first-2
dest: Claude Code
runtime: any
origin: exercises/fix-tests-first
requires:
  - id: first-pass-tdd-diff
    source: prompt:fix-tests-first-1
produces:
  - id: deeper-issue-named
    location: scrollback (Claude identifies the root that's still surface)
    consumed-by:
      - prompt:fix-tests-first-3
---
Was the change you just made the root cause of the bug, or a layer above it? If a layer above, name what the deeper edit would touch. Don't change anything yet. Re-read your own diff and tell me what's still surface.
