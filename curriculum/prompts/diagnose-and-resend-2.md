---
key: diagnose-and-resend-2
dest: Claude Code
runtime: any
origin: exercises/diagnose-and-resend
requires:
  - id: m4-transcript-path
    source: prompt:diagnose-and-resend-1
  - id: m4-run-coordinates
    source: prompt:ae101-m4-commit-starting-point
  - id: un-packaged-run-artefact
    source: prompt:ae101-m4-take-task-end-to-end
  - id: m4-session-transcript
    source: prompt:ae101-m4-take-task-end-to-end
produces:
  - id: three-failure-lens-read
    location: scrollback (drift / context-rot / plausible-but-wrong + dominant failure named)
    consumed-by:
      - prompt:diagnose-and-resend-3
      - prompt:diagnose-and-resend-4
---
I sent off a long-running task un-packaged — no plan.md, no verifier, no reference artefact. I want to read what came back through three failure-mode lenses.

Read what the un-packaged agent did. The `m4/` branch is named in `./task.md`'s run coordinates. Start with the previous session's transcript at the path you just found — drift and dead-ends live there. Then check the repo state on that branch: commits since the "M4 starting point" commit, files modified, branch state.

Then walk the work through three lenses:

- **Goal drift** — moments where the agent solved an adjacent problem instead of the asked one. Buried instruction, redirected scope.
- **Context rot** — moments where the agent rehashed an approach it had already considered and ruled out, or re-derived something already in the working window.
- **Plausible-but-wrong** — outputs that look reasonable in isolation but don't match the original task spec.

For EACH lens, quote one specific moment from the artefact (commit message, file change, scrollback line). Don't generalise; quote. If a lens has no instance, say so — that's data too.

End with: which of the three was the DOMINANT failure mode? You'll build the verifier against that one.
