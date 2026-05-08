---
key: spot-gaps-build-the-loop-1
dest: Claude Code
runtime: any
origin: exercises/spot-gaps-build-the-loop
---
I have two runs of the same long-running task on disk. Find them: the un-packaged run is on a branch starting with `m4/` (run `git branch -a | grep '/m4/'`); the packaged re-run is on a branch starting with `m5/`. The un-packaged run had no reference artefact, no plan.md, no verifier. The packaged re-run had all three pieces in play, verifier fired during the run.

Read both. Start with repo state: commits on the `m4/` branch after the "M4 starting point" commit, commits on the `m5/` branch after the worktree fork, what each run touched. Then read both session transcripts. Claude Code stores every session's scrollback under `~/.claude/projects/<encoded-folder>/<uuid>.jsonl` — the encoded-folder is the absolute path of the original repo (not this worktree) with `/` replaced by `-`. Use `git rev-parse --git-common-dir` to find the original repo path, then walk the un-packaged session's transcript and the packaged session's transcript. File changes tell you what each agent did; the transcripts tell you how it got there, including drift and re-reads.

Walk the diff across four dimensions:

- **What packaging caught.** Specific moments in the packaged run where the reference, the plan.md, or the verifier prevented a drift the un-packaged run actually experienced. Quote the un-packaged moment and the packaged moment both.
- **What packaging missed.** Places the packaged run drifted even with packaging in play. Where the reference was too thin, where the plan.md carried the wrong state, where the verifier's quality bar sat beside the real failure.
- **What packaging introduced.** New failure shapes that only exist because of the packaging itself — over-fitted verifier, plan.md staleness, reference-as-cage.
- **Where the fix belongs.** For each named gap: memory (observation, hypothesis, rule), a sharper verifier, a rule in CLAUDE.local.md, or a new skill. Don't prescribe the skill's shape yet.

For every claim, quote a specific moment from the artefacts. Don't generalise.

End with: which gap matters most? Rank by damage-to-a-future-run, not by how interesting it reads.
