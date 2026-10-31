# persona-student: enjoyment and felt learnings, measured in the simulation

The tmux runner proves the prompt chain works. This layer asks what it was like: a persona from
`curriculum/evals/personas/agents-101/` works through a module and logs, beat by beat, how much
it enjoyed it, what it got, and where it checked out. Design and rationale: the rubric doc
"Agents 101 rubric: next level", §0b.

## Pieces

| File | Does |
|---|---|
| `page.sh <module> <out>` | Student view of one module (maintainer and backing stripped), cut before take-home pre-reads |
| `damage.js` | Blind-check copy: removes the load-bearing beats named in `modules/<m>.json` and adds generic padding |
| `author-answers.js` | The persona writes the student replies the scenario needs (`A101_ANSWERS_DIR` for `run-a101.sh`); facts stay the kit's |
| `experience.js` | Per-beat log: enjoyment 1–7, tag, attention, trigger sentence, what I got, tell a colleague; then take-homes, Monday move, misconception, recommend. With `--runs` the persona sees Claude's real replies from tmux captures |
| `score.js` | Mood fit, peak and end, dead air, checked out, recommend, Monday specificity; `--match` adds felt-learning hits against the intended set |
| `pairs.js` | The persona (or a plain judge) picks sides on the frozen Antti-pairs set; score with that set's `score.py` |
| `modules/<m>.json` | Mood contract, target tags, intended learnings (never shown to the persona), answer tokens, damage spec |

Every log records `persona_hash`, `page_hash` and `prompt_hash`. A score change with all three
unchanged is model or judge drift, not content.

## Order of a run

1. `page.sh` and `damage.js` → original and damaged pages.
2. Page-only blind check: `experience.js` on both pages, 3 personas, 2 repeats. If original and
   damaged score alike, stop: the instrument is blind.
3. `pairs.js` on the Antti-pairs set. The gold score is the persona's calibration against Antti.
4. Live: snapshot the training dir after the prior module, per persona `author-answers.js`, then
   `A101_ANSWERS_DIR=… run-a101.sh --module m4a` (and m4b) on a copy of the snapshot, then
   `experience.js --runs` on the run dirs.
5. `score.js --match` across all logs.

## Known limits

- Answers are written before the persona sees Claude's questions (same as the canned kit). A
  turn-by-turn live student needs the runner to call the persona at send time.
- The persona reads a whole module in one call, so it can anticipate. Beat-by-beat calls cost
  ~30× more; use them only when a result hinges on order.
- An LLM student is generous by default. Trust a number only after the damaged copy scores
  clearly lower and the impatient persona scores clearly below the motivated control.
