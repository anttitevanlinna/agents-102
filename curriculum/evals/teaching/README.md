# Does the module teach? One number per module

**Target stated** = the share of students who, asked cold, state the module's one target idea in their own words. It is the outcome; every other instrument (story judge, taste judge, sentence flags, other learnings, mood) is a guard rail around it.

- **Target** per module = its Big Idea, read verbatim from the maintainer's strategy file (content-strategy.md under strategy in the sibling agents-102-core checkout, the `**Big idea:**` line under each module's section). That file is the single source of truth; `targets.json` only maps modules to sections. Wording changes come from the maintainer, never from this side.
- **Cold question**, same for every module and every student, never names the idea: *"A colleague missed this module. In one or two sentences, what is the one idea from it they should not miss?"*
- **Scorer** `score.js`, never told which module the student took. Step 1, with no targets in view, turns the answer into the claim a colleague could act on, or NO CLAIM. Step 2 matches that claim (not the answer's words) against all eight Big Ideas in a shuffled order, plus none. Four independent restatements, each matched in two shuffles: an answer's score is the share of those 8 judgements that land on this module's Big Idea, and **stated** (0-100) is the mean over students. A wrong module, a generic line, a string of keywords or a different idea from the same module score zero; a borderline answer scores in between instead of flipping. (Until 2026-11-02 an answer was a 0/1 hit; results below that date use that rule.)
- Only words count. No 1-7 ratings anywhere.

## Pieces

| File | Does |
|---|---|
| `targets.json` | Module → strategy-file section, and the cold question |
| `probe.js --logs <experience logs> --out answers.jsonl` | A simulated student answers the cold question from their persona card and the notes they wrote during the module (no page text) |
| `score.js --in answers.jsonl` | Target stated per module and group; with `expect` fields it runs the scorer self-check; with trainer `label` fields it reports agreement |
| `damage-target.js` | Sanity copy: a judge lists every beat that states or practises the target (cached in `carriers`), those beats become generic padding, headings included |
| `classifier-check.jsonl` | 40 hand-written answers: per module a plain right answer, a messy right answer, a different idea from the same module, a generic line, a word salad of the target's terms |
| `golden/` | Real-learner protocol and capture page (dropped 2026-11-13, kept for the record) |

Simulated students come from `mechanical/persona-student/experience.js` via `loops/run-students.sh`. **Panel: 12 per module and version** (maintainer, 2026-11-06) = six personas × 2 repeats, the default of `run-students.sh`. A second 12 (`REPEATS=4`, which reuses the first 12) only for a 10 to 15 point gap on a strategy-level call.

```
bash curriculum/evals/mechanical/persona-student/page.sh security /tmp/m4.md
bash curriculum/evals/loops/run-students.sh $PWD /tmp/m4.md v0 /tmp/m4 security
node curriculum/evals/teaching/probe.js --logs $(ls /tmp/m4/v0-*.json | paste -sd,) --group v0 --out /tmp/m4/answers.jsonl
node curriculum/evals/teaching/score.js --in /tmp/m4/answers.jsonl
```

## Results, 2026-11-01 (pages from main 2e73715, strategy at core 49e99a6, 24 students per cell, `results/2026-11-01/n24/`)

**Scorer self-check: 50 of 56.** All 24 right answers (plain, messy, terse) hit; all 8 generic lines score zero. Keyword strings: 3 of 16 pass (was 3 of 8 before the blind claim step). Same-module other ideas: 6 of 8 score zero; the two misses are near neighbours ("you are the check" read as M4).

**Damaged copies: the number falls when the Big Idea's beats are padded out.**

| Module | Shipped text | Big Idea beats replaced by padding |
|---|---|---|
| M1 Getting going | 75% | 4% |
| M7 From personal to team | 50% | 0% |
| M4 Security | 83% | 50% |

M4 holds at 50% because the idea is spread through the module: "write down what is left and sign for it" survives in What you'll learn, the open-door slide and the escalation step. An earlier n=6 run showed damage to other beats does not move the number (`n6-page-targets/`).

**Baseline, all eight modules (shipped text):**

| Module | Big Idea stated | What students take home instead |
|---|---|---|
| M1 Getting going | 75% | Don't trust the agent's self-review |
| M2 Building agent systems | 21% | Memory only works if the knowledge is written down; make it cite your files |
| M3 Multi-agent systems | 17% | Start with one agent; split only for access, dialect or stance; handoffs lose things |
| M4 Security | 83% | |
| M5 Grounded output | 8% | Errors compound across steps; pick a check by testing several on your own material (the module page's Big Idea, which differs from the strategy's grounding line) |
| M6 Evaluations | 96% | |
| M7 From personal to team | 50% | Licences activated and people using them are different numbers |
| M8 Agents building agents | 4% | Access is not uptake; make agents cite their source files |

Read with care: M1 rose from 17% when its Big Idea moved to the maintainer's wording (context paints the output), because that is what the module teaches. M6 rose to 96% on the industry definition of evals. M5's page and the strategy file state different Big Ideas.

## Cost guard and lean scorer (2026-11-13)

One week's quota went in two days (11-06 to 11-07): about 33,000 headless calls. Three causes, each now closed:

- **Every call carried the repo.** A `claude -p` started inside the checkout loaded CLAUDE.md, the rules, tool schemas and MCP: 55.7k input tokens for a two-line question. `loops/bin/claude` (on PATH in `loop.sh`; `source loops/guard.sh` by hand) runs each eval call from an empty directory with a one-line system prompt, no tools, MCP, settings, skills or saved session: 6.0k tokens. It adds `--model sonnet` unless the caller names a model (the story judge and the full rubric name opus on purpose).
- **Reruns repaid finished work.** `probe.js` appended every answer again on each rerun and `score.js` scored the duplicates (one M8 run: 216 scored rows for 48 answers). Now probe skips students already answered, score dedups by (group, id) and keeps a per-answer cache (`--cache`, keyed on method, model, K, the eight targets and the answer).
- **No ceiling.** `EVAL_BUDGET` caps the calls of one `loop.sh` invocation (default 60 per page teaching-only, 120 with all judges); a call past it exits 75 without reaching the API, nothing retries it, and the run ends INCOMPLETE with "budget". Outer retry loops around `loop.sh` are not used; a failed student is retried once.

**Lean scorer: 2 calls per answer, was 12.** One blind call writes the K=4 restatements together; one call matches all of them against the eight targets in a shuffled order. `TEACH_SPLIT=1` keeps the old method. Check on the 40 M8 answers of `m8g1` (old scores from the split method): v0 24 → 17, g2 38 → 34; per-answer correlation 0.74, mean absolute difference 0.15. The lean scorer reads about 5 points stricter and keeps the gap between pages. **Numbers from before 2026-11-13 are not comparable with lean-scorer numbers without rescoring**; a loop run always rescores its own v0, so within-run gaps stay valid. `TEACH_ONLY=1` runs students and this score only.

## Noise and limits

**Repeat-run noise, measured 2026-11-02** (`results/2026-11-02-noise/`). The same M3 page (main, hash e566cff6), 3 full runs of 24 students plus one re-probe of run 1, each scored twice:

| | run 1 | run 2 | run 3 | run 1 re-probed |
|---|---|---|---|---|
| stated, scoring A | 23 | 19 | 23 | 25 |
| stated, scoring B | 16 | 28 | 19 | 24 |
| both scorings pooled (= the default 4 restatements) | 19.5 | 23.5 | 21 | 24.5 |
| old 0/1 rule, two scorings | 2, 3 of 24 | 0, 3 | 2, 2 | 3, 0 |

- **The scorer was most of the noise, not the students.** The same answers rescored moved up to 9 points at 2 restatements. Pooled to 4 restatements, the spread across runs is 19.5 to 24.5 (SD about 2.5).
- **The old 0/1 rule could not read M3 at all.** Its answers ("start with one agent, split only when needed") sit on the edge of the Big Idea, so each one flipped between hit and miss. That gave 0 to 3 of 24 on a full panel.
- **Dropouts moved it further.** Students under parallel loops dropped out on rate limits (the rollout's cells have 18 or 19 of 24). Personas differ a lot on M3: cto-builder and ingrid score about 35, veteran-director and ops-director about 12. So losing 6 students from the low end alone moves the number by about 20 points. That explains 22 / 25 / 4 on unchanged text.
- **Protocol now:** students run at most 8 at a time (`STUDENT_JOBS`), one page at a time, and each failed run is retried twice. A page with fewer students than the panel, or a failed probe or score, fails the loop with `INCOMPLETE` (rerun the same command; finished runs are reused) and the report says "do not rank on it". The scorer uses 4 restatements by default (`TEACH_K`).
- **Gap that counts, n=12 per page (default since 2026-11-06).** Splitting the four M3 runs into sixteen 12-student halves (six personas × 2) gives 12.5 to 30.2 around a mean of 22, SD 5.1. Two pages then differ by chance with SD about 7, so **a gap over 15 points counts**. For 10 to 15 points on a strategy-level call, add a second 12 per page and pool (n=24: SD 2.4, a 10-point gap counts). Under 10 is noise. M3 is a mid-range, borderline module, so this is the worst case; pages scoring near 0 or 100 are tighter. A ±3.5 band at n=12 understates the noise: one page's number moves about ±5 (SD), ±10 over repeat runs.
- Numbers from the old 0/1 rule or from incomplete cells are not comparable to new ones: rescore them (`score.js` on the same answers) before comparing.
- Simulated students are not calibrated against real ones, and will not be: the real-learner protocol (`golden/`) was dropped on 2026-11-13. The guards are the damaged-copy check and the persona calibration (`../personas/calibrate.py`).
- Keyword strings still pass 3 of 16 times.
- The cold probe reads the student's own notes, written with the page in view. It measures what the student wrote down as they went, not recall after a week.
- The capture page keeps a copy of the Big Ideas for display; republish it after the strategy file changes.

## Red thread, cross-module (2026-11-13)

`thread.js` checks the strategy's § The red thread across all eight module pages: from M2 on, the page points early at the student's one piece of work in its current state (matching the section's first table), every module carries the fixed own-agent callout with its step (second table), the callout names the previous step, and every page uses the same name. One Sonnet call per module returns quotes; code drops any quote the page does not contain and scores the share of checks passed (0-100). The per-module Big Idea measure cannot see this; run both.

- By hand: `node curriculum/evals/teaching/thread.js [--out f.json]` (8 calls, budget 12 by default).
- In the loop: `THREAD=1 loop.sh …` appends one table per page to the report (8 calls per page).
- Calibration 2026-11-13: main before the rollout scored 0 of 29; a lab copy with the thread on M2 and M3 scored 8 of 8 on those two.
- Students (added the same day): `--students N` (default 2 per module) read one module page, answer from memory which parts of the job the agents now do and what context, compounding, control and agents building agents mean now; a blind scorer checks each against the module's row and grid cell. About 44 calls per run. Before the page pass: thread 17, students job 64 / context 56 / compounding 50 / control 81 / agents building agents 50. After: thread 100, students 86 / 81 / 88 / 88 / 100. Weak spot after: M8 job and control (0 of 2). Limits: the page check tests exactly what the pass wrote; students answer right after one page, so recall is easier than the Big Idea measure's notes-only probe.
