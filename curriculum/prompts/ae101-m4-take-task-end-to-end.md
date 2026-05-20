---
key: ae101-m4-take-task-end-to-end
dest: Claude Code
context: final move of the module
runtime: any
origin: agentic-engineering-101/run-the-first-experiment
requires:
  - id: scoped-task
    source: prompt:walk-and-send-off-1
  - id: m4-starting-point-sha
    source: prompt:ae101-m4-commit-starting-point
  - id: claude-local-md
    source: prompt:compound-and-close-1
    conditional: m1-completed
  - id: memory-folder
    source: module:run-the-first-experiment
  - id: stride-adr
    source: prompt:threat-model-with-stride-3
    conditional: m3-completed
  - id: test-strategy-skill
    source: prompt:author-test-strategy-skill-1
    conditional: m3-completed
produces:
  - id: un-packaged-run-artefact
    location: m4/<task-slug> branch (commits + changed files)
    consumed-by:
      - prompt:diagnose-and-resend-2
      - prompt:spot-gaps-build-the-loop-1
      - prompt:arc-retrospective-1
  - id: m4-session-transcript
    location: ~/.claude/projects/<encoded-original-cwd>/<uuid>.jsonl
    consumed-by:
      - prompt:diagnose-and-resend-1
      - prompt:diagnose-and-resend-2
      - prompt:spot-gaps-build-the-loop-1
      - prompt:arc-retrospective-1
---
I want you to take the task we scoped earlier in this session end to end. Work from the rules I've set up (`CLAUDE.md` team and `CLAUDE.local.md` personal both load automatically), plus the memory at `.claude/memory/`, the ADRs, and the skills available by name in this session. That's everything you have. Go.

I'm leaving the laptop awake and walking away. Work through it. If you get stuck, write what you tried and why it didn't work rather than inventing a way forward. If you finish, tell me what you shipped and what you didn't.
