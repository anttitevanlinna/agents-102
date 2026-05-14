---
key: ae101-m5-worktree-setup
dest: Claude Code
runtime: any
origin: agentic-engineering-101/learn-from-the-test
---
Find the branch starting with `m4/` (run `git branch -a | grep 'm4/'`). There may be more than one — a push leaves both `m4/<slug>` and `remotes/origin/m4/<slug>`, and a replay can leave several `m4/`-prefixed branches. Pick the one whose log includes the "M4 starting point" commit. If that commit message has been rewritten, ask me for the SHA from the M4 session close. Spin up a git worktree at that commit. Put the worktree at `../<repo-name>-m5` on a new branch named `m5/` followed by the same task slug as the m4 branch.

Then copy the gitignored personal files into the worktree so M5/M6 compounding has the M1/M3 evidence to build on:
  cp ../<repo-name>/CLAUDE.local.md ../<repo-name>-m5/  (if it exists)
  mkdir -p ../<repo-name>-m5/.claude/
  cp -r ../<repo-name>/.claude/memory/ ../<repo-name>-m5/.claude/memory/  (if .claude/memory/ exists in the original repo)

These won't sync back automatically — the worktree's copies are independent from this point. Tell me the worktree path and confirm which files copied across.
