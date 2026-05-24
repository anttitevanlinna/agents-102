---
key: spot-gaps-build-the-loop-1
dest: Claude Code
runtime: any
origin: exercises/spot-gaps-build-the-loop
requires:
  - id: un-packaged-run-artefact
    source: prompt:ae101-m4-take-task-end-to-end
  - id: m4-session-transcript
    source: prompt:ae101-m4-take-task-end-to-end
  - id: m4-run-coordinates
    source: prompt:ae101-m4-commit-starting-point
  - id: packaged-run-artefact
    source: prompt:ae101-m5-rerun-packaged
  - id: m5-session-transcript
    source: prompt:ae101-m5-rerun-packaged
  - id: m5-run-coordinates
    source: prompt:ae101-m5-rerun-packaged
  - id: reference-artefact
    source: prompt:diagnose-and-resend-6
  - id: plan-md
    source: prompt:diagnose-and-resend-6
  - id: verifier
    source: prompt:diagnose-and-resend-4
  - id: run-notes
    source: prompt:ae101-m5-rerun-packaged
produces:
  - id: two-run-gap-map
    location: scrollback (ranked gap list with quoted moments + dominant gap)
    consumed-by:
      - prompt:spot-gaps-build-the-loop-2
      - prompt:spot-gaps-build-the-loop-3
---
I have two runs of the same long-running task on disk, and both recorded their coordinates. The un-packaged run's are in `task.md` (its `m4/` branch and session transcript path); the packaged re-run's are in `plan.md`, in the protected `Run coordinates` block at the top (its `m5/` branch and session transcript path). The un-packaged run had no reference artefact, no plan.md, no verifier. The packaged re-run had all three in play: a reference, a plan.md, and a verifier wired to run on a cadence.

Read both. Start with both session transcripts at the paths recorded in `task.md` and `plan.md`. Then check repo state: commits on the `m4/` branch after its starting point, commits on the `m5/` branch after the worktree fork, what each run touched. File changes tell you what each agent did; the transcripts tell you how it got there, including drift and re-reads.

Walk the diff across four dimensions:

- **What packaging caught.** Specific moments in the packaged run where the reference, the plan.md, or the verifier prevented a drift the un-packaged run actually experienced. Quote the un-packaged moment and the packaged moment both.
- **What packaging missed.** Places the packaged run drifted even with packaging in play. Where the reference was too thin, where the plan.md carried the wrong state, where the verifier's quality bar sat beside the real failure.
- **What packaging introduced.** New failure shapes that only exist because of the packaging itself — over-fitted verifier, plan.md staleness, reference-as-cage.
- **Where the fix belongs.** For each named gap: memory (observation, hypothesis, rule), a sharper verifier, a rule in CLAUDE.local.md, or a new skill. Don't prescribe the skill's shape yet.

For every claim, quote a specific moment from the artefacts. Don't generalise.

End with: which gap matters most? Rank by damage-to-a-future-run, not by how interesting it reads.
