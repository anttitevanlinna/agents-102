# Language at sentence level

Not student-facing. The tools that manage course language at the unit it is written in: the sentence. The markdown stays the source of truth; everything here is derived from it, plus one file of maintainer decisions.

## What is here

- `scripts/sentence-ledger.js` derives one row per student-facing sentence of a training, in the student's reading order: modules, the lectures and exercises they include, supplementaries, and the slide files those include. Each source file is indexed once. A shared slide file records which files include it (`usedBy`).
- Sentence id = `s-` + 10 hex of sha256 over the normalised text. Case, emphasis, curly quotes and spacing are folded, so the same words anywhere carry the same id.
- `locked-sentences.json` holds sentences the maintainer approved word for word. `scripts/check-locked-sentences.js` is a corpus gate (`npm run test:gates`). It fails when a locked sentence is changed or removed, and it names the closest sentence now on that slide. A deliberate change removes or updates the lock in the same commit.

## Commands

```
npm run language:summary                                   # counts for agents-101
npm run language:dupes                                     # exact + near-duplicate report
node scripts/sentence-ledger.js --json                     # every row
node scripts/sentence-ledger.js --find "<quote>" --slide <id>
node scripts/check-locked-sentences.js --add "<sentence>" --note "<why>"
node scripts/check-locked-sentences.js --list
```

Every command takes `--training <key>`. The default is `agents-101`.

## Contract with the simulated student

The simulated student is designed in the rubric work, not here. When it logs a moment of boredom, confusion or lift, it records the slide id and the quoted sentence, never a line number. `--find` maps that quote to a sentence id: an exact match first, then the closest sentence on that slide. Scores then attach to the sentence and survive edits elsewhere in the file. The runner also takes a variant copy of a slide, the same way it takes the damaged copy. That lets the loop compare the original and a variant blind.

## The loop this serves

1. Baseline: the simulated student reads each slide, names the sentences that turned it (trigger quotes), and writes its take-homes. The signal is in those words: which take-homes survive and which sentences it calls filler. Its 1–7 enjoyment mean barely moves even when a beat is damaged, so it is not the loop's signal.
2. Options: write variants of the flagged sentences only. A variant passes the writing rules, respects locks, and is no longer than the original.
3. Test: the simulated students compare the original and the variant blind, side by side.
4. Keep or drop: every winner goes to the maintainer as a before/after card (calibration phase). Locks record the maintainer's accepted wording.
5. Repeat until the score stops moving.

## Calibration calls

The maintainer's past calls are the first calibration set: blind slide pairs rebuilt from recorded rulings in git and `taste-notes.md` (`curriculum/evals/calibration/antti-pairs/`). `scripts/sentence-pair-review.js` runs the test-step reviewer over such a set. It judges each pair twice with the sides swapped, keeps a pick only when both orders agree, and writes picks that the set's `score.py` scores. Below the set's bar (about 80% overall, no kind under 65%), fix the reviewer before trusting the loop.

New calls are asked only for gaps the set does not cover. Candidate pairs go to the rubric work, which sends the maintainer one batched list. Every call is kept: accepted wording becomes a lock, and a refused variant is recorded so the loop never offers it again.
