# Eval-system improvements — open work on the judging machinery

Eval-system engineering: judge dispatch, staleness scanning, lints, judge-template hygiene, panel coverage. **Not curriculum decisions** — those live in `curriculum/trainings/<training>/pre-cohort-todos.md`, and a finding that is fixed in a judge template, a scanner, or a lint belongs here instead. Same split the harness already makes: runner mechanics go to `curriculum/evals/mechanical/tmux-runner/IMPROVEMENTS.md`.

Per-class verdicts are not tracked here either. They live in each file's own `**Quality:**` block, stamped by `update-quality.sh`.

Moved out of `pre-cohort-todos.md` on 2026-08-15, unchanged in substance: they were eval-system engineering sitting in a curriculum punchlist, which is the same category error the file's own header warns about.

## Open

- **Judge re-fire sweep.** ~50 stale (file,class) pairs from the 2026-08-09 voice-panel session's edits across 14 files; `scan-stale-classes.js --files <edited>` regenerates the exact bill. Deferred by maintainer call ("evals later"). Batch pattern: `eval-fire` per class, Sonnet, schema-forced ledgers; expect PASSes (edits were panel-driven and compendium-aligned) but expecting is not stamping. The same batch owes the soil-line wave (2026-08-15): 14 stale pairs across the four map lectures plus `learn-from-the-test`. Judge briefs need the mechanical fresh-read check (`grep -c "cross personal → team" <file>`) returned as a number, so a cached verdict cannot pass as a fresh one.

- **Flinch-grep lint** under `curriculum/evals/lints/` — audience-contract greps: `just a simple`, `trust the agent`, act-verbs near quoted prompts, `check_writing.md` §8 room-form.

- **Judge the three rules nobody could cite.** `check_writing.md`'s last three rules shipped unnumbered — bolded leads with no `N.`, so `parseRules` never saw them, no judge could cite them, and the coverage ledger did not know they existed. Numbered 24/25/26 on 2026-08-19; the audit's hole count went 310 → 445, which is 3 rules × 45 files that have genuinely never been judged. Needs a writing-class pass over the AE101 surface set. Diagnostic for the next compendium: `grep -cE '^[0-9]+[a-z]?\. \*\*' <file>` against the eye's count of bolded leads — a gap means rules that are in force for a reader and invisible to the ledger.

- **66 crams need a judge, not a script.** Two distinct judgements stamped on one `(compendium, rule_index)`; the second row's `rule_lead` is paraphrased past mechanical recovery, so the rule it meant is unrecoverable and reads as a hole. Bidirectional lead matching resolves 3 of 66 and buys fuzziness for the rest — tested and rejected 2026-08-19. Resolution is per-row: re-read the evidence, decide which rule it judged, restamp. `node scripts/audit-eval-coverage.js --surface all --json --out /tmp/r.json` then filter `kind == "duplicate-rule-index"` for the current bill.

- **Three instances return `rules_evaluated` as an array of STRINGS.** `building-guardrails.writing`, `module-3-prework.writing`, `three-minds-one-synthesis.writing` — the Haiku schema degradation of `check_platform_and_boundaries.md §21`. Every field the coverage model reads is undefined, so each instance credits nothing, silently, because a string is truthy. Surfaced as `non-object-row` ×36 on 2026-08-19; deliberately NOT repaired, because inventing the objects is worse than the visible gap. Needs a Sonnet re-fire of the writing class on those three files.

- **12 verdicts against rules that no longer exist.** `check_student_facing` §15/16/19 were removed or rewritten without tombstones, and the leads on the citing rows match nothing in the current compendium, so the drift resolver cannot recover them. Either re-judge the six files or delete the rows; keeping them means six files carry writing verdicts that describe a rule set nobody can read.

- **`prompt-edit-gate.sh` adjacency scan denies genuine approvals.** The hook accepts a `prompt-ok` only when the user token turn *immediately* follows the assistant turn naming the key; an injected context turn (system reminder, compaction summary) between the two breaks adjacency and the valid approval reads as absent. Observed 2026-08-29 on `threat-model-with-stride-1`: token given, Edit denied; the marker-file path (`.claude/prompt-approvals/<key>.confirmed`) cleared the pre-commit gate correctly. Fix direction: scan back past non-assistant-text turns instead of requiring strict adjacency. The transcript scan is the flaky channel; the marker file is the reliable one.

- **`check-instance-names --fix` crashes on untracked strays.** `git rm` on a file git never tracked exits non-zero and aborts the fix pass. Hit 2026-08-29 on a misfiled overnight instance; manual `mv` was the workaround. Fix: fall back to plain `rm`/`mv` when `git ls-files` says untracked.

- **`board.sh` rejects unknown flags but exits 0.** `--fix` is not a recognized flag; the script prints usage and exits clean, so a caller believes the fix ran. Unknown flag should exit non-zero (fail-closed, same law as the stamp gates).

- **`eval-sweep.js` resume cache missed completed seats.** On a `resumeFromRunId` resume with byte-identical args (2026-08-29, wave 7), 3 seats that had completed in run 1 re-ran live instead of replaying from cache. Cost only tokens, not correctness — but the cache contract says identical (prompt, opts) replays.

- **`prefill --merge` drops `na_reason`.** Rows carrying `na_reason` lose it on merge. Hold `--backfill` runs until fixed — a backfill that strips the reason a rule was ruled N/A manufactures 45 false holes.

- **Confirm-lane judge wrote an instance to a non-canonical filename.** Wave-7 confirm seat wrote PASS to `push-back-on-the-plan.technical.json` (bare slug) while the canonical `ae101--exercise--push-back-on-the-plan.technical.json` kept the stale REVISE — two files, one truth, resolved newest-wins by hand 2026-08-29. Fix: the sweep's confirm-lane prompt should pin the full `instanceSlug`, not let the judge derive a filename.

- **Panel coverage beyond module files.** Seven files paneled to date: two M1 lectures, the M2 and M4 lectures, and the M3/M5/M6 module files. Unpaneled: the remaining lectures, every exercise, supplementaries, reference pages. Fire per the spec's own when-to-fire in `judges/voice-panel.md` — new or reshaped files after the writing-judge pass, and pre-cohort one panel per module's heaviest-prose file.

- **Keep the compendium ledger pinned.** `curriculum/evals/compendium-pins.json` dates each rule's last observed edit, and `scan-stale-classes.js` reads it as the `rule-drift` axis: a pin whose commit date predates a rule edit was taken against text that has since changed. The ledger only works if someone repins after amending a compendium — `node curriculum/evals/scripts/compendium-drift.js` reports drift and exits 1, `--repin` stamps it. Baseline pinned 2026-08-19, so the axis is silent until the first amendment lands. An unrepinned ledger does not raise false alarms; it goes quiet, which is the failure mode worth watching for.

## Session artifacts worth not re-deriving

Voice-panel session 2026-08-09: spec at `curriculum/evals/judges/voice-panel.md` (six seats, five authors plus the cautious reader; maintainer-guard check; reader veto outranks). Rules that landed from it: `check_writing.md` §4 (AE101 audience contract, reader pass, house-echo, language-is-UX) and §3 (keep-notes bind to their passage); `check_student_facing.md` §30 (theory-spine echo) and §31 (artifact-not-act); `check_cross_module.md` §8 (scramble stakes from the clock, not the room); `check_pedagogy.md` §34 example de-minimized. Compounded: `2026-08-08-writing-write-to-the-caution-engineer-audience.md` (severity high, cohort-load evidence), `2026-08-09-writing-keep-notes-bind-to-their-passage.md`, `2026-08-09-student_facing-scramble-stakes-from-clock-not-room.md`. Body fixes shipped in three commits on 2026-08-09 (`4f5ce48`, `e4633f4`, `9870b74`) plus the M2/M1 batch.
