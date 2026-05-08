---
key: diagnose-and-resend-2
dest: Claude Code
runtime: any
origin: exercises/diagnose-and-resend
---
I sent off a long-running task un-packaged — no plan.md, no verifier, no reference artefact. I want to read what came back through three failure-mode lenses.

Read what the un-packaged agent did. Find the previous-run branch (run `git branch -a | grep '/m4/'` — it'll be the only branch starting with `m4/`). Start with the repo state on that branch: commits since the "M4 starting point" commit, files modified, branch state. Then read the previous session's transcript at the path you just found. The file changes alone miss the drift and the dead-ends.

Then walk the work through three lenses:

- **Goal drift** — moments where the agent solved an adjacent problem instead of the asked one. Buried instruction, redirected scope.
- **Context rot** — moments where the agent rehashed an approach it had already considered and ruled out, or re-derived something already in the working window.
- **Plausible-but-wrong** — outputs that look reasonable in isolation but don't match the original task spec.

For EACH lens, quote one specific moment from the artefact (commit message, file change, scrollback line). Don't generalise; quote. If a lens has no instance, say so — that's data too.

End with: which of the three was the DOMINANT failure mode? You'll build the verifier against that one.
