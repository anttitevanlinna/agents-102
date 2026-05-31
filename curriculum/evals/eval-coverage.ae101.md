# AE101 eval-coverage audit — exercises, lectures, modules

Phase 2/3 of the rule-coverage work (Phase 1 = prompts, see `prompt-rule-coverage.ae101.md`). Built 2026-05-31. Proves every prose-rule fired against every AE101 student-facing surface, the same way Phase 1 proved it for prompts.

## The hole (different from Phase 1)

Phase 1 found *orphan rules* (no checker). Here the inverse: a standing judge system exists and re-reads each compendium, but judges emitted a **sparse ledger and omitted out-of-scope rules instead of marking them `N/A`**, so coverage was unprovable. Measured: `pedagogy` instances ran 10 to 67 of ~57 rules; `writing` averaged ~9 of 17 `check_writing` + ~5 of 26 `check_student_facing`. 3 lectures had zero evals; 5 lacked a writing instance.

## The durable fix

1. **Completeness contract** in all 5 rule-ledger judge templates (`curriculum/evals/judges/{writing,pedagogy,story,strategy,technical}.md`): one verdict per rule on the compendium each class *primarily owns* (first in `eval_classes`), explicit `N/A` instead of omission, a self-count check before emitting. Writing.md's false-positive "drop the flag" reconciled so it no longer fights completeness.
2. **`scripts/audit-eval-coverage.js`**: deterministic rule x file coverage matrix. `--gate` fails on structural bugs + missing mandatory instances. `npm run audit:eval-coverage[:gate]`. Sub-lettered rules (9b/21b/34b/52b) fold onto their integer parent to match the instance schema's integer `rule_index`.
3. Catches the `class:"story"` vs `"storytelling"` field drift canonically (fixed in 4 instances).

## Result (2026-05-31)

- **Coverage: 1707 uncovered rule x file pairs to 110 to 79.** writing + student_facing + pedagogy 100% on every exercise and module; the 6 lecture `story` holes now closed. The residual 79 are non-gating N/A-by-surface (email pedagogy/strategy + lecture strategy_tie_in rules no instance is mandated to cover) — the auditor counts them as "uncovered" rather than "N/A", a Phase-4 fix.
- **Gate: 14 to 6 to 0.** Two forced-complete sweeps (validation slice of 10, then backlog of 49) regenerated 59 ledgers, all `emitted == expected` (43 writing, 57 pedagogy). Promoted to real instances (commits 869e384, 841d8d0).
- **The 6 lecture `story` holes — CLOSED (Phase 3).** A 6-way Sonnet judge fan-out (Workflow `wf_4c973be0-190`) generated a persona sim-trace + completeness-contract ledger per lecture (painting-the-picture, the-wizard-move, how-this-training-was-built, will-company-memory-emerge, quality-is-grounding, composing-the-workflow). All 6 PASS, every ledger carrying both `check_lectures` rules; mood 8-9, none below 8. `will-company-memory-emerge` reconciles a prior stamp-without-instance (its Quality block already claimed `story PASS` — under-documented, not over-stated). One non-blocking TODO: `quality-is-grounding` `check_lectures#1` — the opening arc-summary reads closer-register while the lecture is placed as an early opener (maintainer call; its meta says the early placement is intentional). `cohort-onboarding-email` pedagogy/strategy stay N/A (email, not a module).

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

`node scripts/audit-eval-coverage.js --surface all` (or `--gate`). Static sweep harness: the `eval-coverage-sweep-full` workflow. Story-class harness (sim-trace, not static): the `ae101-story-instances-phase3` workflow — one Sonnet judge per lecture, retarget via the `LECTURES` array. Per-class verdicts are meant to land in each file's `**Quality:**` block via `update-quality.sh` — NOT stamped this cycle, and deliberately deferred to Phase 4: the script hardcodes `compendium-audited` as the stage word, so stamping the 2 `draft` lectures (composing-the-workflow, quality-is-grounding) would falsely promote them off draft, and it rebuilds the top line, deleting composing-the-workflow's fact-check provenance parenthetical. Fix the script first, then stamp all 6 in one pass.

## Phase 4 — eval-system fixes (queued)

With the full system in view, the next phase fixes its defects (scripts, judges, skills, schema). **Confirmed:**

1. **`update-quality.sh` hardcodes stage + clobbers narrative.** `NEW_TOP="**Quality:** compendium-audited ..."` ignores the file's real stage (promotes `draft` files) and rebuilds the top line, dropping any narrative parenthetical (e.g. composing-the-workflow's research-claims provenance). Fix: preserve the existing stage word + any narrative; only update SHA pins + the judges row. Test-first.
2. **Auditor conflates `uncovered` with `N/A-by-surface`.** The 79 residual pairs are legitimately N/A (email pedagogy/strategy, lecture strategy_tie_in not mandated). The matrix should mark surface-N/A distinctly so the headline number reflects real holes.

**Hypotheses (confirm before fixing — evidence-ladder discipline):**

- **Integer `rule_index` is lossy.** Sub-lettered rules (9b/21b/34b/52b) fold onto the integer parent, so their coverage is invisible. Either accept string indices or make the auditor sub-letter-aware.
- **Quality-block ↔ instance drift.** will-company-memory-emerge claimed `story PASS` with no instance behind it; cross-check every per-class Quality row against instance existence.
- **`eval-fire/SKILL.md` doc rot.** Stale "30-day megajudge window" / "Step 4 of the eval refactor"; trace path given as `<slug>.json` vs the real `<slug>.persona.json`.
- **Orphan sim-caches.** Both `<slug>.persona.json` and `ae101--<slug>.persona.json` exist for some slugs; only the bare-slug one is read.
- **Completeness-contract coverage.** Added to writing/pedagogy/story/strategy/technical; confirm prompt-behavior + cross-module judges aren't a parallel hole.

Method: survey fan-out (one agent per subsystem, evidence-tagged defects) → triage → fix. Skill + `check_*.md` edits are approval-gated proposals; script / auditor / judge-template / data-model fixes applied directly. Test-first per repo CLAUDE.md.
