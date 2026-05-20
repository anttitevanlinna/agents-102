---
key: ae101-m3-quality-side-orient
dest: Claude Code
runtime: any
origin: exercises/open-the-side-quest
requires:
  - id: m3-quality-worktree
    source: prompt:ae101-m3-fork-quality-side
produces: []
---
Confirm worktree state:

- which directory you're in
- which branch is checked out
- whether `./CLAUDE.md` and `./CLAUDE.local.md` loaded
- whether the codebase is visible (`git ls-files | head` is fine)

Report the four lines back. Then wait.
