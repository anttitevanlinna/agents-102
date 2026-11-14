# Does the taste judge prefer the original? (2026-11-14)

The judge (`pairs.js` + `taste-rules.md` + both example files, run as `loop.sh` runs it: EVAL_LEAN=0, PAIRS_BATCH=2, both orders) was tested on pairs where the right answer is known.

- **Placebos** (`mkplacebo.js`), from 30 Agents 101 slides on main:
  - the same slide twice;
  - original vs a neutral one-sentence rewrite;
  - two neutral rewrites against each other;
  - two adjacent sentences swapped.
- **Antti's 74 calls** (`calibration/antti-pairs/`). In the 22 gold accepted-edit pairs he took the edit. In the 22 gold refused-edit pairs he kept the original.

A pair counts as a real preference only when both orders pick the same text.

## Results (`results/2026-11-14/`, `analyze.py`)

| Test | Forced a/b (before) | With "same" allowed (now) |
|---|---|---|
| Same slide twice | picked "a" 30 of 30 times (letter default, harmless: it splits across orders) | "same" 30 of 30 |
| Original vs neutral rewrite | **original in both orders 10 of 28**, rewrite 2, the rest split by letter | original 3 of 30, rewrite 0, "same" 25 |
| Rewrite vs rewrite | one side in both orders 13 of 30 | one side 5 of 30, "same" 22 |
| Two sentences swapped | original order 17 of 25, swapped 3 | original order 13, swapped 1, "same" 8 |
| Antti took the edit (22): judge kept the original in both orders (false revert) | 1 (5%) | 2 (9%) |
| Antti kept the original (22): judge took the edit in both orders (false accept) | 8 (36%) | 9 (41%) |

Plain reading:

- **No bias against good edits.** Where Antti took an edit, the judge sent it back to the original in 1 or 2 of 22 pairs. Stored loop runs agree: the edit won in both orders in 135 of 174 slide pairs (m7 rounds 2-3, language sweep).
- **Forced choice made it invent winners between equals.** With no allowed tie, it kept the original wording in both orders on 10 of 28 neutral rewrites, with confident reasons ("'Split' is the plainer everyday word than 'Divide'"). An edit that changes little therefore "lost the taste judge" about a third of the time. Allowed to say "same", it does so on synonym and word-order swaps ("Split vs Divide is a near-synonym swap; no rule or past call separates them"). Its calls on Antti's pairs move by one or two pairs, which is within run-to-run noise.
- **It does not protect what Antti chose to keep.** It took 8 or 9 of the 22 edits Antti refused, in both orders. As a gate it catches clear harm and does not block good edits. A pass is not evidence that Antti would take the edit.
- Sentence swaps still lean to the original order (13 of 25). Order often carries meaning (setup before payoff), so this is not counted as bias. It is the one placebo that is not cleanly neutral.

## Change applied

`PAIRS_TIE=1` (`pairs.js`): the judge may answer "same". "Clearly better" means it can name the rule or past call that one version follows and the other breaks. `loop.sh` and `taste-retry.py` run with it. `loops/report.js` reads "same" in either order as **same**, worth 0.5 in the win share and never a loss. `check-judge.sh` and the Antti-pairs score keep forced a/b, because their bars were set that way.

Rerun: build the placebos with `node mkplacebo.js --pages <student-view pages> --out DIR/placebo`. Split the Antti pairs into `DIR/antti/c0..c3.{blind,swapped}.jsonl`. Then `[PAIRS_TIE=1] bash run-judge.sh DIR TAG` and `python3 analyze.py DIR/placebo DIR/TAG`.
