# Module compaction rollout (2026-11-01)

Per module: v0 = main before, c1 = one compaction pass, c2 = a second pass on c1 (`compact-module.py`). Loop instruments (`loop.sh`), plus the teaching measure (target stated cold, `teaching/probe.js` + `score.js`, n=6 per variant). Ranking: target stated first, then overall. A learning-column drop counts only when the text carrying it changed (same text, 6→3 = sampling noise).

| module | target stated v0 / c1 / c2 | overall v0 / c1 / c2 | to main |
|---|---|---|---|
| M2 building-agent-systems | 3 / 4 / 2 of 6 | 67 / 75 / 73 | c1 |
| M3 multi-agent-systems | 0 / 0 / 0 of 6 | 66 / 72 / 72 | c2 (compaction only; Big-Idea re-aim waits for a spar) |
| M6 evaluations | 6 / 6 / 6 of 6 | 70 / 77 / 76 | c1 |

## Teaching check at n=24 (measure thread protocol; targets = strategy-file Big Ideas at core after Antti's M1/M6 wording)

Baseline is the measure thread's n=24 on pages before the rollout. Some cells have fewer than 24 runs (rate limits). A gap under ~25 points is noise.

| module | baseline | rolled version | n | to main |
|---|---|---|---|---|
| M1 getting-going | 75 | c2: 67 (rewrite c4: 50, n=24) | 18 | c2; module-2-prework kept at M2's version |
| M2 building-agent-systems | 21 | c1: 30 | 23 | yes |
| M3 multi-agent-systems | 17 | c2: 22 | 18 | yes (compaction only) |
| M4 security | 83 | c1: 96 | 24 | yes; audit-your-agent kept at v0 (locked sentences) |
| M5 output-quality | 8 | c2: 12 | 24 | yes (compaction only; grounding re-aim waits for a spar) |
| M6 evaluations | 96 | c1: 95 | 19 | yes |
| M8 agents-building-agents | 4 | c1: 4 | 24 | yes (compaction only; re-aim waits for a spar) |

None drops. Compaction alone does not move M3, M5 or M8: their pages teach a different idea than the strategy line, which is the spar question.

M1 rewrite (c4, `regen-module.py` from the whole strategy file and Antti's paint Big Idea): best loop score (83 overall vs c2 80, v0 61) but Big Idea stated 50 of 100 at n=24 against 75 baseline; 5 of 24 students left with "the agent grades its own work too gently" (the cold-critic debrief). Not on main; c2 went instead.
