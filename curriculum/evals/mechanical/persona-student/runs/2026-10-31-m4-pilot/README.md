# M4 pilot, 2026-10-31

- `pageonly/`: 3 personas × original (page hash 88b4d019) vs damaged (198de827) × 2 repeats, Sonnet. Scores: `pageonly-score.json`.
- `pairs/`: picks on the Antti-pairs set (branch claude/project-thread-ztwsxp, commit f84550ce), single order. `scores.txt` from its `score.py`.

Readout and interpretation: rubric doc "Agents 101 rubric: next level" §0c.
- `answers/<persona>/`: the M4 replies each persona wrote (`A101_ANSWERS_DIR`), plus the tmux run dirs they drove (runner `out/` is not committed).
- `live/`: experience logs with Claude's real M4a/M4b replies inline, 3 personas × original vs damaged × 2 repeats. Scores: `live-score.json`.

Live run starting state: Nordveil chain prework → M3 in this cloud sandbox. The live a16z crawl is blocked here, and the held-back counter-case leaked into sources/ in M2. Both checks were downgraded to warnings for this run only and restored afterwards, so M2/M3 fidelity is lower than a clean run. M4's three plants were all present and all caught.
