# Eval-system improvements — open work on the judging machinery

Eval-system engineering: judge dispatch, staleness scanning, lints, judge-template hygiene, panel coverage. **Not curriculum decisions** — those live in `curriculum/trainings/<training>/pre-cohort-todos.md`, and a finding that is fixed in a judge template, a scanner, or a lint belongs here instead. Same split the harness already makes: runner mechanics go to `curriculum/evals/mechanical/tmux-runner/IMPROVEMENTS.md`.

Per-class verdicts are not tracked here either. They live in each file's own `**Quality:**` block, stamped by `update-quality.sh`.

Moved out of `pre-cohort-todos.md` on 2026-08-15, unchanged in substance: they were eval-system engineering sitting in a curriculum punchlist, which is the same category error the file's own header warns about.

## Open

- **Judge re-fire sweep.** ~50 stale (file,class) pairs from the 2026-08-09 voice-panel session's edits across 14 files; `scan-stale-classes.js --files <edited>` regenerates the exact bill. Deferred by maintainer call ("evals later"). Batch pattern: `eval-fire` per class, Sonnet, schema-forced ledgers; expect PASSes (edits were panel-driven and compendium-aligned) but expecting is not stamping. The same batch owes the soil-line wave (2026-08-15): 14 stale pairs across the four map lectures plus `learn-from-the-test`. Judge briefs need the mechanical fresh-read check (`grep -c "cross personal → team" <file>`) returned as a number, so a cached verdict cannot pass as a fresh one.

- **Eval-regularity builds.** Four, independent of each other:
  - (a) flinch-grep lint under `curriculum/evals/lints/` — audience-contract greps: `just a simple`, `trust the agent`, act-verbs near quoted prompts, `check_writing.md` §8 room-form.
  - (b) compendium-SHA staleness in `scan-stale-classes.js`. A compendium edit should stale its class corpus-wide; today it stales nothing, so a rule can change and every file keeps a green pin taken against the old rule.
  - (c) sub-letter and tail-rule numbering in `check_writing.md`, so the coverage ledger sees §4's sub-blocks and the two unnumbered tail rules instead of skipping them.
  - (d) writing-judge template hygiene: cite rules by name, not number (combative-verbs is cited as "rule 13" and is 17), and confirm `/eval-fire` dispatches Sonnet rather than the template's stated Haiku. The Haiku/Sonnet mismatch is a severity-high degradation entry from 2026-05-02 and is still unconfirmed.

- **Panel coverage beyond module files.** Seven files paneled to date: two M1 lectures, the M2 and M4 lectures, and the M3/M5/M6 module files. Unpaneled: the remaining lectures, every exercise, supplementaries, reference pages. Fire per the spec's own when-to-fire in `judges/voice-panel.md` — new or reshaped files after the writing-judge pass, and pre-cohort one panel per module's heaviest-prose file.

## Session artifacts worth not re-deriving

Voice-panel session 2026-08-09: spec at `curriculum/evals/judges/voice-panel.md` (six seats, five authors plus the cautious reader; maintainer-guard check; reader veto outranks). Rules that landed from it: `check_writing.md` §4 (AE101 audience contract, reader pass, house-echo, language-is-UX) and §3 (keep-notes bind to their passage); `check_student_facing.md` §30 (theory-spine echo) and §31 (artifact-not-act); `check_cross_module.md` §8 (scramble stakes from the clock, not the room); `check_pedagogy.md` §34 example de-minimized. Compounded: `2026-08-08-writing-write-to-the-caution-engineer-audience.md` (severity high, cohort-load evidence), `2026-08-09-writing-keep-notes-bind-to-their-passage.md`, `2026-08-09-student_facing-scramble-stakes-from-clock-not-room.md`. Body fixes shipped in three commits on 2026-08-09 (`4f5ce48`, `e4633f4`, `9870b74`) plus the M2/M1 batch.
