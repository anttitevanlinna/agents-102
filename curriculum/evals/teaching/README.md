# Does the module teach? One number per module

**Target stated** = the share of students who, asked cold, state the module's one target idea in their own words. It is the outcome; every other instrument (story judge, taste judge, sentence flags, other learnings, mood) is a guard rail around it.

- **Target** per module = its Big Idea, phrased as the take-home a student would say: `targets.json`.
- **Cold question**, same for every module and every student, never names the idea: *"A colleague missed this module. In one or two sentences, what is the one idea from it they should not miss?"*
- **Scorer** `score.js`: the judge never learns which module the student took. It restates the answer in its own words, then picks which of all eight targets that restatement carries, or none. Two shuffled orders; a hit needs both to pick this module's target. A wrong module, a generic line or a different idea from the same module all score zero.
- Only words count. No 1-7 ratings anywhere.

## Pieces

| File | Does |
|---|---|
| `targets.json` | The eight targets and the cold question |
| `probe.js --logs <experience logs> --out answers.jsonl` | A simulated student answers the cold question from their persona card and the notes they wrote during the module (no page text) |
| `score.js --in answers.jsonl` | Target stated per module and group; with `expect` fields it runs the scorer self-check; with trainer `label` fields it reports agreement |
| `damage-target.js` | Sanity copy: a judge lists every beat that states or practises the target (cached in `carriers`), those beats become generic padding, headings included |
| `classifier-check.jsonl` | 40 hand-written answers: per module a plain right answer, a messy right answer, a different idea from the same module, a generic line, a word salad of the target's terms |
| `golden/` | Real-learner protocol and the trainer's capture page |

Simulated students come from `mechanical/persona-student/experience.js` via `loops/run-students.sh` (ingrid, cfo-sceptic, cto-builder, 2 repeats).

```
bash curriculum/evals/mechanical/persona-student/page.sh security /tmp/m4.md
bash curriculum/evals/loops/run-students.sh $PWD /tmp/m4.md v0 /tmp/m4 security
node curriculum/evals/teaching/probe.js --logs $(ls /tmp/m4/v0-*.json | paste -sd,) --group v0 --out /tmp/m4/answers.jsonl
node curriculum/evals/teaching/score.js --in /tmp/m4/answers.jsonl
```

## Results, 2026-11-01 (main at 2e73715, `results/2026-11-01/`)

**Scorer self-check: 35 of 40.** All 16 right answers (plain and messy) hit; all 8 generic lines and 7 of 8 same-module other ideas score zero. Word salads are the hole: 3 of 8 pass, because the judge rebuilds a claim from the target's own terms. A student who repeats the slogan without understanding it would pass too.

**Damaged copies: the number falls when the target's beats go, and holds when other beats go.**

| Module | v0 | Target beats replaced by padding | Other beats removed, padding added (M7 loop's old damaged copy) |
|---|---|---|---|
| M7 From personal to team | 67% (4 of 6) | 0% | 50% vs 33% for that run's v0 |
| M1 Getting going | 17% (1 of 6) | 0% | |
| M4 Security | 100% (6 of 6) | 50% | |

M4 holds at 50% because the idea is spread through the module: "write down what is left and sign for it" survives in What you'll learn, the open-door slide and the escalation step. The judge listed 9 carrier beats and missed those.

**Baseline, all eight modules (shipped text, 6 simulated students each):**

| Module | Target stated | What students take home instead |
|---|---|---|
| M1 Getting going | 17% | Don't trust the agent's self-review; you or a cold reader are the check |
| M2 Building agent systems | 33% | Memory folder plus citations; fix the files, not the prompt (close; misses "keeps getting better") |
| M3 Multi-agent systems | 0% | Start with one agent; split only for access, dialect or stance; handoffs lose things |
| M4 Security | 100% | |
| M5 Output quality | 67% | |
| M6 Evaluations | 67% | |
| M7 From personal to team | 67% | |
| M8 Agents building agents | 0% | Access is not uptake; make agents cite their files |

M3 and M8 teach coherent ideas, just not their Big Idea: M3 lands its own counter-message (when not to split) and M8 lands M7's law and the citation check. M1 lands its third learning. For each of these the call is either to change the module so the Big Idea lands or to change the Big Idea to what the module teaches.

## Noise and limits

- 6 runs per cell. Near-identical M7 variants (old v0 to v3) read 33% to 67%, so one cell moves by a student or two. Call a variant better only on a gap of 3 students in 6, or run 12.
- Simulated students are not calibrated against real ones. `golden/protocol.md` is the check: 5 real learners on M1.
- The scorer passes keyword salads (above). Real answers are rarely salad, but the trainer's marks in the golden set will show it if they are.
- The cold probe reads the student's own notes, written with the page in view. It measures what the student wrote down as they went, not recall after a week.
