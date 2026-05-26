---
key: ae101-m3-fork-quality-side
dest: Claude Code
runtime: any
origin: exercises/open-the-side-quest
requires: []
produces:
  - id: m3-quality-worktree
    location: ../<repo-name>-m3-quality/
    consumed-by:
      - prompt:ae101-m3-quality-side-orient
    note: also serves as cwd for every other M3 prompt (environmental, not formally required)
opportunistic-copy:
  - id: claude-local-md
    if-present-at: ./CLAUDE.local.md
    rationale: born at M1's compound-and-close-1; copied if M1 ran
  - id: memory-folder
    if-present-at: ./observations/
    rationale: born at M4's walk-and-send-off Phase 2; copied if M4 ran (reorder order) — prompt body's "(if exists)" handles absence gracefully
---
Fork a sibling worktree. Default path `../<repo-name>-m3-quality`, default branch `m3/quality` off the current branch:

  git worktree add ../<repo-name>-m3-quality -b m3/quality

Copy the gitignored personal files into the worktree so the new session inherits the same personal rules and memory:
  cp ./CLAUDE.local.md ../<repo-name>-m3-quality/  (if it exists)
  cp -r ./observations/ ../<repo-name>-m3-quality/observations/  (if observations/ exists in this repo)

These won't sync back automatically. The worktree's copies are independent from this point.

Tell me the absolute path to the new worktree directory and which files copied across.
