# Fast loop: the student test as an editing partner

Goal: an editing session changes a module and, in about 3 minutes, learns what students now take home and gets three candidate edits that have already been measured. The full loop (`loops/loop.sh`) stays the gate before main.

| File | Does |
|---|---|
| `run.js` | Teaching measure, same construct as `teaching/`: walk (one note of 15 words or fewer per beat, plus attention) → the probe's cold question from notes only → `score.js` scoreOne. Each student runs that pipeline alone. Paired by persona × rep. v0 is re-read fresh every cycle. Optional extra reps for unclear versions. |
| `cycle.js` | One partner cycle. Evidence (reused when `--prev` measured this page) → brief (what students took home instead with quotes, where the Big Idea is on the page but unrecorded, attention drops, three edits: state / enact / demote as exact old → new) → all three measured with a fresh read → `brief.md` plus a ledger line per edit (`ledger/<module>.jsonl`, read by the next brief). Never edits course files. |
| `guard.js` | Slogan check: how many more sentences echo the Big Idea's own wording. Holdout personas for the gate. |
| `calib-set.js` | Edits with a known answer. Graded damage (⅓, ⅔ or all of the Big Idea carrier beats padded) and placebos (pad, swap or paraphrase a non-carrier beat). |
| `calibrate.js` | Bootstrap over a calibration run: placebo false-alarm rate and graded-damage detection, per panel size and band. |
| `evidence.js` | A module's evidence page from stored students: per step, how many did it, skipped it, and what each wrote there; take-homes stating the Big Idea; what students took home instead; attention drops. |
| `chain.js` | The cross-module question, "What happened to the briefing you made in Module 3?": walk Modules 3, 5, 6 with notes carried forward, judge three links (made, checked, improved). |
| `damage-chain.js` | Copies of Modules 3, 5, 6 with the briefing chain cut, for the chain instrument's damage test. |
| `course.js` | One run of the whole course: each student walks Modules 1 to 8 in order carrying take-homes (full notes for 3 and 5), cold question after each module, chain question at the end. |

```
node curriculum/evals/fastloop/cycle.js --module agents-building-agents --page /tmp/m8.md --out /tmp/c1 --band 25
node curriculum/evals/fastloop/cycle.js --module agents-building-agents --page /tmp/m8-after-edit.md --out /tmp/c2 --prev /tmp/c1 --band 25
```

Run inside `loops/bin` on PATH (`source curriculum/evals/loops/guard.sh`). All calls are Sonnet.

## Calibration, 2026-11-14 (`results/2026-11-14/`)

M1, M4 and M7. Seven pages each, 24 students per page (6 personas × 4), 504 students, 17 minutes in total.

| | M1 | M4 | M7 |
|---|---|---|---|
| v0 | 40 | 61 | 16 |
| ⅓ of Big Idea beats padded | 43 | 55 | 9 |
| ⅔ padded | 22 | 78 | 1 |
| all padded | 6 | 14 | 0 |
| placebo: pad another beat | 56 | 60 | 25 |
| placebo: swap two beats | 40 | 57 | 34 |
| placebo: paraphrase a beat | 42 | 72 | 28 |

The old measure (`loop.sh` walk + probe), run on the same pages and targets the same day: M1 40, M1 all padded 0, M7 15, M7 all padded 0. The levels agree.

**Noise is the finding.** At 24 students per page, the paired gap between two versions has an SD of about 11 points. At n=12 it is about 14. The band that keeps placebo false alarms near 10% is about 25 at n=12 (11% false alarms; full damage caught 62% of the time) and about 20 at n=24 (12%; 69%). A third or two thirds of the Big Idea padded is mostly missed at any band. Part of this is v0's own draw: placebos averaged 7 points above v0, so one v0 read sits in every gap. On M4, ⅔ padded read 78 against v0's 61, which shows that noise can reverse the order. The old measure uses the same students, probe and scorer, so it carries the same noise. Its "10 points counts at n=24" rule rested on 3 repeat runs of one low-scoring page (M3 ≈ 20, where answers vary least).

So the number steers only large moves (full damage, or a gain of 20 or more points). A single sentence edit sits inside the noise at any panel the loop can afford. Steer with the brief: what students took home instead, in their words, and where the page loses the idea. Use the number to catch large regressions and to confirm a direction across cycles. Do not use it to choose between two small edits.

**Speed.** One M8 cycle measured three candidate edits plus a fresh read of the page in 191 s: 48 s evidence, 36 s brief, 107 s test, at 24 students at a time. The old loop needed about 7 min for one variant at n=12 with all instruments, and 25-45 min for four variants at n=48.

## Limits

- The brief's slide-level attribution is a hypothesis from the notes. Six to twelve students cannot prove which slide moved a number.
- Not run in a cycle: taste judge, story judge, voice gates, holdout personas. They are owed before main, through `loop.sh` and the checks it already runs.
- Same model reads and proposes. The slogan check and the holdout personas are the guard. Ideas that compete with the Big Idea should be made to serve it, never deleted.

## Step 0 and the course run, 2026-11-14 (`results/2026-11-14/`)

- `baselines/`: pooled baselines, pages at c1b64188, 40 to 48 students per module (paused at 13:35). Cold: M1 64, M2 76, M3 77, M4 65, M5 82, M6 81, M7 24, M8 39.
- `chain/`: chain question on the same old pages, 24 students per set. Intact 37, chain cut 22, paired gap -15 (se 5): the "checked" link fell 44 to 6. Under the 20-point bar.
- `course/`: whole course on main b22b74d3 (all eight plan drafts), 12 students, 390 s. Cold per module: 46, 63, 85, 75, 77, 79, 73, 48. Chain 37 (made 42, checked 71, improved 0). The course run carries notes forward, so its cold numbers are near the baselines' scale, not identical to it.
