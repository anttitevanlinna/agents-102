---
key: ae101-m5-clear-before-rerun
dest: Claude Code
runtime: any
origin: agentic-engineering-101/learn-from-the-test
requires: []
produces: []
note: in-session shortcut path before the M5 re-send — drops the exercise scrollback (verifier scaffolding, hook wiring, plan.md drafts) so the long-run doesn't pay Opus cache-read on the heavy prefix. ae101-m5-rerun-packaged is self-bootstrapping after this; packaging files at the worktree root + auto-loaded rules carry forward. Alternative path: open a new Claude Code session in the worktree (see Session widget in learn-from-the-test.md). New session is the default; this prompt is the in-session shortcut.
---
/clear
