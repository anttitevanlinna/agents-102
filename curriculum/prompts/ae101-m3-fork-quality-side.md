---
key: ae101-m3-fork-quality-side
dest: Claude Code
runtime: any
origin: agentic-engineering-101/earn-the-trust
---
Confirm `./CLAUDE.local.md` is loaded if it exists.

Then fork a sibling worktree. Default path `../<repo-name>-m3-quality`, default branch `m3/quality` off the current branch:

  git worktree add ../<repo-name>-m3-quality -b m3/quality

Copy the gitignored personal files into the worktree so the new session inherits the same personal rules and memory:
  cp ./CLAUDE.local.md ../<repo-name>-m3-quality/  (if it exists)
  cp -r ./.claude/memory/ ../<repo-name>-m3-quality/.claude/memory/  (if it exists)

These won't sync back automatically. The worktree's copies are independent from this point.

Tell me the absolute path to the new worktree directory and which files copied across.
