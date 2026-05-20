---
key: diagnose-and-resend-1
dest: Claude Code
runtime: any
origin: exercises/diagnose-and-resend
requires:
  - id: m5-worktree
    source: prompt:ae101-m5-worktree-setup
  - id: m4-session-transcript
    source: prompt:ae101-m4-take-task-end-to-end
produces:
  - id: m4-transcript-path
    location: scrollback (absolute path Claude found)
    consumed-by:
      - prompt:diagnose-and-resend-2
---
Find the path to the previous session's transcript .jsonl. Claude Code stores every session's scrollback at `~/.claude/projects/<encoded-folder>/<uuid>.jsonl`. The `<encoded-folder>` name is the absolute path of the original repo (where the un-packaged run happened) with `/` replaced by `-` — e.g., `/Users/me/Projects/lemmings` → `-Users-me-Projects-lemmings`. Since you're in a worktree, find the original repo path via `git rev-parse --git-common-dir` (its parent is the original repo). List the .jsonl files in that folder by mtime; pick the one in which the agent created the "M4 starting point" commit on the `m4/` branch. Tell me the absolute path.
