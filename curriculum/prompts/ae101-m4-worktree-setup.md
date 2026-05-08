---
key: ae101-m4-worktree-setup
dest: Claude Code
runtime: any
origin: agentic-engineering-101/learn-from-the-test
---
Find the branch starting with `m4/` (run `git branch -a | grep '/m4/'` — there'll be one) and the commit messaged "M4 starting point" on it. Spin up a git worktree at that commit. Put the worktree at `../<repo-name>-m5` on a new branch named `m5/` followed by the same task slug as the m4 branch.

Then copy the gitignored personal files into the worktree so M5/M6 compounding has the M1/M3 evidence to build on:
  cp ../<repo-name>/CLAUDE.local.md ../<repo-name>-m5/  (if it exists)
  cp -r ../<repo-name>/.claude/memory/ ../<repo-name>-m5/.claude/memory/  (if it exists)

These won't sync back automatically — the worktree's copies are independent from this point. Tell me the worktree path and confirm which files copied across.
