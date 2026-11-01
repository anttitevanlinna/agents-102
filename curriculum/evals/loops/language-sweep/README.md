# Language sweep: before and after, three modules

The sentence-level sweep rewrote slides across Agents 101. This folder reruns the loop on three swept modules with the text before the sweep (`BASE_REV=1059873`) against the text after it, 12 persona runs per side (`rev-apply.py`). Each subfolder holds that module's `report.md`.

Runs carrying each intended learning, before → after:

| Module | Learning | Before | After |
|---|---|---|---|
| evaluations | design the loop | 9 | 11 |
| evaluations | floor and ceiling | 8 | 6 |
| security | non-determinism | 5 | 3 |
| security | escalate and prototype | 8 | 6 |
| security | package the check | 10 | 8 |
| building-agent-systems | four learnings | 3, 8, 7, 6 | 6, 12, 8, 8 |

Story judge flat on all three. Taste judge prefers the pre-sweep text on build-your-challenge-memory § "Phase 5: Close, put it to work" and splits on the opening of new-human-role-in-the-loop. Security is the one module where the sweep cost carried learnings; a 2-run drop at 12 runs is near noise, so read the security slides that changed before reverting anything.
