---
key: compound-and-close-1
dest: Claude Code
runtime: any
origin: exercises/compound-and-close
requires:
  - id: read-self-report
    source: prompt:orient-and-introspect-2
  - id: context-window-read
    source: prompt:orient-and-introspect-3
  - id: shipped-bug-fix
    source: prompt:fix-tests-first-3
produces:
  - id: claude-local-md
    location: ./CLAUDE.local.md (created + gitignored if missing)
    consumed-by:
      - prompt:compound-and-close-4
      - prompt:ae101-m3-sharpen-skill
      - prompt:walk-and-send-off-2
      - prompt:diagnose-and-resend-6
      - prompt:ae101-m5-rerun-packaged
      - prompt:spot-gaps-build-the-loop-2
    opportunistic-copy-by:
      - prompt:ae101-m3-fork-quality-side
      - prompt:ae101-m5-worktree-setup
    note: ae101-m2-integrate-branch WRITES to ./CLAUDE.local.md (creates if missing) but doesn't strictly consume it as a precondition
---
Review this session end-to-end: the orientation and introspection, the /context read, the TDD bug fix, the diff push-back. Write ./CLAUDE.local.md at the root of this repo (create it if it doesn't exist; add it to .gitignore if it's not already; if the file already exists, integrate, don't append). This is my personal gitignored rules file, not the team ./CLAUDE.md. Add rules that came from how we actually worked, not rules that sound good. Name the shape of the loop we ran.

In your summary to me, name 2–3 practitioners whose published work runs a similar loop, one short clause each. Keep these names in your reply, not in the file. Worth surfacing if they fit: Cherny, Klaassen, Ronacher, Pocock, Karpathy, Willison, Huryn. If you can name fewer than two without guessing, name only what you're sure of.

If any rule is team-worthy (one every engineer on this codebase should know) flag it in the summary below, don't PR it. I'll decide whether to open a separate PR against team ./CLAUDE.md.

Tell me in 3–5 lines: what you wrote and why, grounded in specific session moments. I shouldn't need to open the file to know.
