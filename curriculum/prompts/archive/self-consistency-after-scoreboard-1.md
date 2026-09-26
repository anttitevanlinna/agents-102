---
key: self-consistency-after-scoreboard-1
dest: Claude Code
runtime: any
origin: lectures/self-consistency-after-scoreboard
---
Spawn one subagent to generate a second briefing from the same evidence surface.

The subagent reads:
- `./crux.md`
- `module-5/evidence-roster.md`
- the rostered evidence files named in `module-5/evidence-roster.md`

The subagent must NOT read:
- `module-5/briefing.md`
- `module-5/claim-pool.md`
- `module-5/adjudicated-claims.md`
- `module-5/scoreboard.md`
- anything in `module-5/detectors/`

Write a one-page briefing on the same challenge to `module-5/briefing-second-run.md`.

When the subagent finishes, do not summarize the briefing in chat. Only confirm that `module-5/briefing-second-run.md` exists.
