# AE101 M5 Actor Scrollback

## Harness Substitutions Logged

- `[harness substitution — /rename]`: No slash surface in this harness.
- `[harness substitution — worktree → in-place]`: Substituting worktree creation with in-place branch `m5/dailytotalsbycategory` on the M4 starting-point commit.
- `[harness substitution — claude-projects-stub]`: Substituting real Claude Code transcript path with `<scratch>/.claude-projects-stub/` stub.
- `[harness substitution — walk-away simulated]`: Simulating ~18 min of packaged-run agent work.

## Phase 1: Worktree Setup (Substitute)

- Created branch `m5/dailytotalsbycategory` from M4 starting-point commit (d466762).
- Confirmed CLAUDE.local.md and .claude/memory/ carried forward.
- Student confirmed readiness.

## Phase 2: Find Previous Transcript

- Located transcript at `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/ae101-m5/.claude-projects-stub/-curriculum-evals-mechanical-scratch-ae101-m5-repo/m4-session.jsonl`.

## Phase 3: Three-Failure Lenses

**Diagnosed:**
- Goal drift: lint-warning detour (8 min wasted on cleanup).
- Context rot: negative-summation contract re-derived twice (already in CLAUDE.local.md).
- Plausible-but-wrong: CLI CSV without escaping (dominant failure).

## Phase 4: Walk Failures into Validation

- Goal drift → working document (plan.md with phase markers).
- Context rot → re-readable spec (read memory at session start).
- Plausible-but-wrong → automated check (pre-commit hook on CSV output).

## Phase 5: Build Verifier

- Built `.claude/hooks/csv-escape-check.sh` — shell-hook that fires on commits touching src/cli.js.
- Tests: PASS fixture (plain category), FAIL fixture (comma in category).
- Hook checks RFC 4180 escaping on CSV output.

## Phase 6: Smoke-Test Verifier

- **FAIL case (buggy CSV):** Verifier correctly rejected unescaped `cat,name,100` (three fields).
- **PASS case (escaped CSV):** Verifier accepted `"cat,name",25` (two fields with quoted category).
- Wiring: hook at `.claude/hooks/csv-escape-check.sh`, fires automatically on commits touching src/cli.js.

## Phase 7: Reference and Plan

- **reference.md:** Task scope (dailyTotalsByCategory CLI with RFC 4180 escaping), context pointers (CLAUDE.local.md, ADR 0001), verifier constraints, tests-that-name-the-bar, done-means line.
- **plan.md:** 6-phase breakdown with tests-first phase, current-phase marker, decisions log, what-didn't-work section, M4 context to prevent re-derivations.

## Phase 8: Re-Run Packaged

- Implemented dailyTotalsByCategory in src/totals.js (fixed sum() to filter nulls, not negatives).
- Wrote 6 tests covering grouping, empty list, comma-in-category, refunds.
- Built src/cli.js with escapeCSV helper (RFC 4180).
- Updated README with export command.
- Added bin entry to package.json.
- **Verifier fired on first commit attempt:** Caught missing escapeCSV on category "cat,name". Fixed by routing through escapeCSV helper.
- All 11 tests pass (includes pre-existing parser + null tests).
- Verifier passes on second commit.
- Wrote RUN-NOTES.md with verifier-fire moment.
- Committed to m5/dailytotalsbycategory branch.

## End State

- ✓ `.claude/hooks/csv-escape-check.sh` exists and passes.
- ✓ `reference.md` exists with "Done means" + "Tests that name the bar" sections.
- ✓ `plan.md` exists with phase breakdown, current-phase, decisions, what-didn't-work.
- ✓ `RUN-NOTES.md` exists.
- ✓ Branch `m5/dailytotalsbycategory` with M5 commit.
- ✓ src/cli.js has RFC 4180 escaping (escapeCSV helper).
- ✓ README mentions dailyTotalsByCategory and --export command.
- ✓ package.json has bin field.
