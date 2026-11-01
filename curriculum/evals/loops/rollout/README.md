# Module compaction rollout (2026-11-01)

Per module: v0 = main before, c1 = one compaction pass, c2 = a second pass on c1 (`compact-module.py`). Loop instruments (`loop.sh`), plus the teaching measure (target stated cold, `teaching/probe.js` + `score.js`, n=6 per variant). Ranking: target stated first, then overall. A learning-column drop counts only when the text carrying it changed (same text, 6→3 = sampling noise).

| module | target stated v0 / c1 / c2 | overall v0 / c1 / c2 | to main |
|---|---|---|---|
| M2 building-agent-systems | 3 / 4 / 2 of 6 | 67 / 75 / 73 | c1 |
| M3 multi-agent-systems | 0 / 0 / 0 of 6 | 66 / 72 / 72 | c2 (compaction only; Big-Idea re-aim waits for a spar) |
| M6 evaluations | 6 / 6 / 6 of 6 | 70 / 77 / 76 | c1 |
