---
key: fix-tests-first-3
dest: Claude Code
runtime: any
origin: exercises/fix-tests-first
requires:
  - id: deeper-issue-named
    source: prompt:fix-tests-first-2
produces:
  - id: shipped-bug-fix
    location: git (commit on a feature branch; PR if student opens one)
    consumed-by:
      - prompt:compound-and-close-1
      - prompt:compound-and-close-2
      - prompt:compound-and-close-3
---
Now do it properly, TDD-style. Write the failing test that names the deeper issue you just identified, run it, watch it fail. Fix the root cause. Run again, watch it pass. Show me the diff before you commit.
