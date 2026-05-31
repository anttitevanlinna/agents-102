# AE101 eval-coverage audit — exercises, lectures, modules

Phase 2/3 of the rule-coverage work (Phase 1 = prompts, see `prompt-rule-coverage.ae101.md`). Built 2026-05-31. Proves every prose-rule fired against every AE101 student-facing surface, the same way Phase 1 proved it for prompts.

## The hole (different from Phase 1)

Phase 1 found *orphan rules* (no checker). Here the inverse: a standing judge system exists and re-reads each compendium, but judges emitted a **sparse ledger and omitted out-of-scope rules instead of marking them `N/A`**, so coverage was unprovable. Measured: `pedagogy` instances ran 10 to 67 of ~57 rules; `writing` averaged ~9 of 17 `check_writing` + ~5 of 26 `check_student_facing`. 3 lectures had zero evals; 5 lacked a writing instance.

## The durable fix

1. **Completeness contract** in all 5 rule-ledger judge templates (`curriculum/evals/judges/{writing,pedagogy,story,strategy,technical}.md`): one verdict per rule on the compendium each class *primarily owns* (first in `eval_classes`), explicit `N/A` instead of omission, a self-count check before emitting. Writing.md's false-positive "drop the flag" reconciled so it no longer fights completeness.
2. **`scripts/audit-eval-coverage.js`**: deterministic rule x file coverage matrix. `--gate` fails on structural bugs + missing mandatory instances. `npm run audit:eval-coverage[:gate]`. Sub-lettered rules (9b/21b/34b/52b) fold onto their integer parent to match the instance schema's integer `rule_index`.
3. Catches the `class:"story"` vs `"storytelling"` field drift canonically (fixed in 4 instances).

## Result (2026-05-31)

- **Coverage: 1707 uncovered rule x file pairs to 110.** writing + student_facing + pedagogy now 100% on every exercise and module.
- **Gate: 14 to 6.** Two forced-complete sweeps (validation slice of 10, then backlog of 49) regenerated 59 ledgers, all `emitted == expected` (43 writing, 57 pedagogy). Promoted to real instances (commits 869e384, 841d8d0).
- **Remaining 6 holes:** lecture `story` instances (painting-the-picture, the-wizard-move, how-this-training-was-built, will-company-memory-emerge, quality-is-grounding, composing-the-workflow). These need the sim-trace `/eval-fire story` path, not a static sweep. `cohort-onboarding-email` pedagogy/strategy are N/A (it is an email, not a module).

## Findings (hypotheses, verify before fixing per pre-cohort-todos discipline)

**Confirmed real:**
- **§45 leap test missing** — `arc-retrospective`, `spot-gaps-build-the-loop` exercises. No 3-observable-Monday-outcomes block (grep-confirmed). M6 arc-mood carve-out names the artifact owned, not the activity. Not gated (maintainer-block edit).
- **§16 forcing-function-in-body** — `fix-tests-first` (L34): the mandatory code-quality interrogation lives in body prose, not a fence; a prompt-only speed-runner misses it.
- **§53 pre-action framing previews payoff** — `orient-and-introspect` (L33): prose before the introspection prompt pre-announces that Claude can account for what it skipped, collapsing in-session discovery.

**Watch (verify against §50/§51/§62 carve-outs first):**
- **§62 pre-emptive callouts** — `fix-tests-first`, `push-back-on-the-plan`, `diagnose-and-resend`, `spot-gaps-build-the-loop`: callouts name one specific failure the prompt already prevents; prefer the generalising steer. Some may be accepted-by-design.
- **§27 / §44 / §64** — `fix-tests-first` (classroom/body-teaches), `push-back-on-the-plan` (plug-points UX), `arc-retrospective` + `spot-gaps` (maintainer-block restate-not-point).

**Writing nuances (mostly non-blocking):**
- **§9 over-hedge x5** — `arc-retrospective`, `author-test-strategy-skill`, `getting-going`, `map-the-access-surface`, `run-the-first-experiment`. A real cross-curriculum reassurance-prose pattern worth a batch pass.
- **§11 attribution-cap x2** — `getting-going`, `walk-and-send-off`. **§2** earn-term — `prework`. **§17** command-verb headers / **§22** time-of-day — `cohort-onboarding-email`. **§21** LLM/agent/Claude vocab — `orient-and-introspect`. **§23** reflection-beats-invisible x2 — `map-the-access-surface`, `what-packaging-is`. **§28** forward-callout subject — `getting-going`.

**Already fixed (parallel agent, 33b2e6f):** §2 "in practice" to "in real use" in `where-the-rule-could-live`.

## Known damage (flagged)

`ae101--agents-that-build-agents.writing.json` carried uncommitted parallel-agent WIP that a blind `cp` overwrote during promotion (unrecoverable; unstaged, not in the object DB). Left uncommitted (`M`, my complete-ledger version) for reconciliation rather than committed over. See `feedback_no_checkout_restore_dirty_paths.md`.

## Re-run

`node scripts/audit-eval-coverage.js --surface all` (or `--gate`). Forced sweep harness: the `eval-coverage-sweep-full` workflow (script under the session's `workflows/scripts/`); retarget by editing the surface arrays + DONE set. Per-class verdicts also live in each file's `**Quality:**` block via `update-quality.sh` (not re-stamped this cycle; owed).
