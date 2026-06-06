# FIX-PLAN — Agents 101 runner findings, fix phase (driver)

Post-compaction driver for fixing the issues the M1–M6 runner battery surfaced.
Canonical detail lives elsewhere; this file is the **prioritized worklist** + the
**process gate**, so the fix phase doesn't re-derive either each time.

- **Content/curriculum detail (the actual BEFORE/AFTER scope):** `pre-cohort-todos.md §13`
  (`curriculum/trainings/agents-101/`) — entries C1–C11, P1, H2-content.
- **Runner detail + why each was found:** `a101-runner-findings.md` (same dir as this file).
- All findings were *proposed*, not applied (the "propose content / fix runner" rule).
  Antti is the maintainer and is now driving the fixes, so the propose-gate is lifted —
  but the QUALITY gate below still applies.

## Process gate per fix type

**Content = a prompt-registry edit (`curriculum/prompts/<key>.md`) or exercise body.**
1. READ `memory/check_prompts.md` FIRST (generation-time, not post-hoc) + the matching
   surface compendium: `check_student_facing.md` (all curriculum), plus
   `check_strategy_tie_in.md` / `check_pedagogy.md` where the change touches Big-Idea /
   design. (`.claude/rules/content-rules.md` routes these.)
2. Draft a BEFORE/AFTER card for the changed lines.
3. Apply. Registry edits trip the PreToolUse approval gate + git pre-commit gate (§22);
   the prompt-graph validator checks requires/produces at build.
4. End of cycle: `/curriculum-pre-ship-audit` over the touched student-facing files.

**Runner = a harness edit (`tmux-runner/**`).** Just fix it; write the test first
(repo rule). Re-run the affected module standalone to confirm.

## Worklist (suggested order — Antti reorders freely)

### Tier 1 — major content, high real-world stakes
- [x] **C2 · privacy/scope contract** — `build-your-challenge-memory-1` + `-2`. Scope
  contract added at plan-formation (bycm-1) AND file-creation (bycm-2): curate only named
  paths; list + ask before including unnamed sibling material, never pull it in. (H1 root
  cause as a *student-facing* risk.) DONE 2026-06-06.
- [x] **C1 · local-file contradiction** — decided: keep dual-mode (reference stub for
  local, read live at build). bycm-2/bycm-3 already agree; the defect was the body
  overclaiming "pulls the content into sources/" in two spots → softened to "pulls in (or
  points at) the content for sources/". Body-only, no prompt edit. DONE 2026-06-06.
- [x] **C4 · quota forces fabrication** — `build-your-challenge-memory-8`. 2-2-2 quota →
  "up to six, real only, empty category valid"; index-coverage check added; calibration
  beat reframed to least-sure-is-real; split by move. Body "six proposals" → "proposals".
  DONE 2026-06-06.
- [x] **H2-content · WON'T FIX** (Antti 2026-06-06) — too techy; real students unlikely to
  carry global `~/.claude` rules. The observed bleed was the operator's own machine, a test
  artifact. Coverage moves entirely to **H2-harness** (Tier 3): run under isolated `$HOME`
  so the test stops absorbing operator globals.

### Tier 2 — major, cross-module / structural (need a little design thought)
- [x] **C11 · naming seam** — decided (Antti): "tactic all the way." Migrated the exercise
  (`eval-loop-1/2/5/6` + `eval-loop.md` body + line-107 note rewrite) off
  `generation-prompt.md` onto `./generation-tactic.md`, matching the module/lecture/debrief
  that already used it. Synced `ae101--eval-loop` instance + runner (m6 assertions now verify
  loop+debrief converge on one file; seam WARN dropped, orphan-guard added). Tests 11/11
  green. DONE 2026-06-06.
- [x] **C9 · WON'T FIX** (Antti 2026-06-06) — the 2-accept-and-detail + 1-push-back split is
  a legitimate design, not pre-convergence: two stances take the outcome as given and elaborate,
  one pushes back. The debrief's "where did the stances collapse into a single voice" then reads
  as a normal audit-for-beige-synthesis question, not a trap. No edit.
- [x] **C10 · resolved via new mini-lecture** (Antti 2026-06-06) — neither prompt edit. The
  flatline-while-improving IS the lesson (the judge is a lens; you optimized past its frame), so
  it earned its own named recognition beat: `lectures/when-the-score-stops-moving.md`, sequenced
  exercise → this beat → `new-human-role-in-the-loop` closer. Promotes the "one thing the judge
  still cannot see" insight off a single `eval-notes.md` clause into a home of its own; mood-safe
  (empowering, not caution), placement-correct (recognition = closer per `check_lectures.md` §1).
  Wired into `evaluations.md`; closer maintainer note updated. NEW lecture owes a
  `/curriculum-pre-ship-audit` pass (no Quality stamp yet).
- [x] **C3 · resolved as a test artifact, not a prompt defect** (Antti 2026-06-06) — runner fix,
  no prompt edit. The three-list report (fetched / linked-by-path / not-reachable) only collapsed
  to one bucket because the *battery* fed all-local fixtures; the prompt was always correct. Fix
  is in the runner: stage a `local/board-paper-draft.md` bucket-2 fixture, and rewrite the m2
  scenario + `m2-curation-where.txt` so Beat 2 assigns each source its real provenance — wiki/ =
  Confluence connector, docs/ = OneDrive connector, local/ = genuine local (linked by path), an
  open-web source = **real live a16z crawl**, plus a named-but-unreachable O365 email (bucket 3).
  Test-first: `run-a101.sh` m2:4 now gates on provenance diversity (crawl URL + ≥12-line body,
  Confluence/OneDrive header, NOT REACHABLE stub) while keeping the held-back `survivorship`
  guard. Re-ran arrange→prework→m2 live: 12/12 PASS, crawl landed real content, synthesis seam
  still fires at m2:9. Last Tier-2 item.

### Tier 3 — infra / packaging
- [x] **P1 · tarball now ships only the A101 closure** (2026-06-06) — `scripts/build-agents-101-starter-tarball.sh`.
  Replaced the wholesale `cp prompts/*.md` (all 166) with a DERIVED closure: scan the 9 student
  A101 module files + their linked exercises/lectures + the tarball's own shipped files (scaffold +
  self-study skill) for `{{prompt:}}` markers, ship exactly that set (90), fail-closed if a
  referenced prompt is missing or nests deeper than depth-1. Self-maintaining (no hardcoded
  prefix list to rot); the finding's "a101-* + prework/M1–M2" undersold it — the real set is all
  8 modules' prompts incl. security/eval, which ARE A101. Drops 76 AE101/IC-only prompts. Build
  green (90/166, all expected paths present); arrange + prework re-run green (tarball extracts
  clean). Tarball is a gitignored build artifact — nothing to commit there.
- [x] **H2-harness · resolved by post-run cleanup, not isolation** (Antti 2026-06-06) — runner
  infra. Isolation via scratch `$HOME` was probed and FAILS on this macOS setup: a fresh HOME
  comes up "Not logged in" (keychain login isn't inherited HOME-independently, contra the docs),
  so isolating would require copying/symlinking credentials — credential handling the auto-mode
  classifier (rightly) gates. Maintainer's call: don't isolate, clean up. `chain-agents-101.sh`
  now snapshots whether `~/.claude/skills/security-audit` pre-existed, and an EXIT trap removes it
  post-run ONLY if this run created it (never an operator skill sharing the name; fires even on a
  failed module). m4a:4 WARN reworded to say so; standalone m4a runs still leak (advised). The
  m2:12 / m3:8 CLAUDE.md-bleed WARNs stay as non-gating advisories (isolation didn't happen, so
  their reason to exist remains). Cleanup logic unit-tested (4 cases: created→removed,
  pre-existing→kept ×2, failed-install→no-op); not exercised end-to-end live (reaching m4a needs
  the full prework→m3 chain — expensive; change is additive, touches no assertion/seam).

### Tier 4 — NITs (optional polish)
- [x] **C5** · WON'T-FIX, by design (Antti 2026-06-06). The "assume at least one is generic" line
  is a deliberate forcing function — it pushes the LLM off the lazy "all three are specific" path
  and makes it actually scrutinize; the all-specific fallback already catches the honest case.
  Not leading-the-witness; load-bearing. No edit.
- [x] **C6** · WON'T-FIX, keep simple (Antti 2026-06-06). Proposed differentiating `-9` with a
  recommendation-under-uncertainty / never-invent-a-number framing; rejected as an over-engineered
  question. The plain "answer this question, cite" close is better. The mild `-6`/`-9` overlap
  isn't worth importing complexity to erase. No edit.
- [x] **C7** · resolved via body affordance, not a prompt edit (Antti 2026-06-06). Premise was
  stale: the retro already applies (overwrites the rules file), and `getting-going.md` line 60
  already invited regenerating the site ("add one more sharp detail there and regenerate"). Made
  the regenerate move its own sentence with the artifact named — "add one more sharp detail there.
  Then ask Claude to regenerate the site." — clearer affordance, placed right after the cold-critic
  surfaces the generic line. No prompt-body change.
- [x] **C8** · resolved via body text (Antti 2026-06-06). `prework.md` line 29 now names the two
  folders that surfaced unexplained on `ls` — the prompt library and the personal-to-team
  patterns — so nothing the student sees on extract is a surprise (keeps prework's "no magic"
  promise). Body edit, not the prompt confirm-list. P1's slimmer tarball still ships `prompts/`
  (the A101 closure) + `patterns/`, so both still needed naming.

## Done (no action — reference)
- Runner bugs fixed test-first: **H1** (held-back source), **H3** (assert_or_warn arg-order),
  **H4** (m3 net-answer moved source), **H5** (m4b WARN false-positive), **H6** (m6 trajectory
  false-theater). Tests: `tests/test-a101-*.sh` (11/11 green).
- All six modules built + validated live + audited beyond green. Nothing committed.

## After the fixes
- Re-run the affected module(s) standalone to confirm the fix didn't break the seam; for
  cross-module fixes (C9/C10/C11) a full `./chain-agents-101.sh --to m6` is the real proof.
- When an item closes: delete its `§13` bullet (git carries history) and check it here.
