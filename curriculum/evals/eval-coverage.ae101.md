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

## Phase 4 — eval-system fixes

Survey done 2026-05-31: a 6-agent read-only fan-out (one per subsystem — auditor, Quality stamper, judge templates, eval-fire skill, schema/instances, sim-cache), evidence-tagged with file:line. ~30 distinct defects, many cross-confirmed across agents.

### Fixed (this pass)

1. **`update-quality.sh` — stage/narrative/dimension-row preservation.** DONE. Test-first: `curriculum/evals/scripts/update-quality.test.sh` (22 assertions). The script hardcoded `compendium-audited` as the top-line stage word and rebuilt the whole line, so any stamp (a) silently promoted the 21 non-`compendium-audited` files — and worse, the mechanical auto-fire path `mechanical/bin/judge.sh:60` triggered it with no judge flags, promoting drafts automatically; (b) dropped narrative parentheticals; (c) deleted `sim-passed` / history / `mechanical-tested` dimension rows the awk never reconstructed; (d) fabricated today's date on non-audited stages. Fix: parse + preserve the prior stage word (new `--stage` flag is the only deliberate advance), preserve the prose tail (strip only the `<class>@` pin tuple), preserve unknown `- ` rows in place, stage-agnostic date recovery. Side-effect: the eval-fire Step 6.5 mandate to run this script for every verdict is **now safe** — it no longer demotes higher-tier files.

### Auditor coverage-model cluster (direct code; interdependent — do as one pass once decisions land)

- **Sub-letter encoding is chaos, three ways.** Instances encode sub-rules as `"9b"` (string), `9.1` (float), AND a fabricated `91` (integer) — all for the same logical rule. `parseRules` folds `9b→9` and counts none of them. ~19 sub-rules (pedagogy 5, platform_and_boundaries 13, research_claims 1) are uncounted; pedagogy reports 57/57=100% while 5 real rules are invisible. DECISION: one canonical encoding (recommend the compendium's own `"9b"` string), then `parseRules` letter-aware + normalize instances. *Instance normalization waits — many are dirty parallel-WIP.*
- **N/A-by-surface counted as uncovered.** The headline `79` is almost entirely `cohort-onboarding-email` (pedagogy/strategy N/A on an email) + meta-frame lectures (strategy_tie_in rules 4–7, no `.strategy` instance mandated). DECISION: bucket as `na_by_surface` using the existing per-file `mandatory` field; granularity recommend per-compendium-per-surface.
- **Orphaned compendia never measured.** `check_platform_and_boundaries`, `check_research_claims`, `check_prompts` are owned (have `eval_classes`) but in no `SURFACE_COMPENDIA` row → their rules score zero coverage silently, though `.technical.json` ledgers exist on disk. DECISION: in or out of the matrix (recommend in, via a technical bucket).
- **Gate blind to rule holes.** `--gate` fails only on structural bugs + missing instances, never on uncovered rules (it computes `total_holes` but never reads it). DECISION: once N/A is separable, fail on real holes (threshold).
- **Cheap robustness guards** (ship with the above): flag a missing `class` field; non-gating warnings on unresolvable `rule_index`, non-enum verdict (one live: `"PASS (this file) / UNVERIFIED (cross-file)"`), `rule_lead` mismatch (painting-the-picture `.story` stamps 5 different leads all as `check_strategy_tie_in::1`), and a `- judges` PASS claim with no backing instance.

### Approval-gated (judge templates / skill / compendium frontmatter — propose, don't apply)

- **behavior + cross_module judges lack the completeness contract.** Confirmed parallel hole: cross_module's live `m1-m2` ledger already silently drops §9; behavior emits `prompts_findings[]` not `rules_evaluated[]` so contributes zero coverage keys, and no compendium's `eval_classes` even maps to `behavior`. DECISION: is behavior prompt-indexed-and-exempt (document it) or owed a pattern-coverage ledger? cross_module needs a contract + an auditor pair-level reader (its ledger nests under `module_pairs_evaluated[]`, invisible to `verdictedKeys`).
- **eval-fire SKILL.md doc rot — one consolidated edit.** Trace path written three ways (`<slug>.persona.json` / `<slug>.json` / no `ae101--` prefix); dead "30-day megajudge window", "Step 4/7 of the eval refactor", "Real-world test" section (megajudge is archived); instance path bare-slug at :109. Same trace-path text also in `judges/story.md:147` + `prompt-behavior.md:170` (fix all sites in one pass).

### Cache hygiene (direct data; downstream of the cache-key decision)

- **Cross-training slug collision (most consequential new find).** `sim-cache/getting-going.persona.json` carries the **Agents-101 SVP-of-HR** persona, but `getting-going` is also an AE101 module; the bare-slug read path can feed an AE101 story-judge a wrong-training trace. Plus 4 dup persona caches + 7 dup behavior caches (bare vs `ae101--`). Root cause = bare-slug cache key. DECISION: canonical key (recommend `ae101--<slug>` to match instances + disambiguate), then delete orphan twins (gitignored, regenerate on next fire — safe after the decision).

### Quality-block ↔ instance drift (approval-gated maintainer-block edits)

- `will-company-memory-emerge` claims 6-class PASS, only writing+story instances exist (4 over-claims). `the-wizard-move` has 4 instances but no `- judges` row. `quality-is-grounding` + `composing-the-workflow` are `draft` yet have instances.

Method: skill + `check_*.md` edits are approval-gated proposals; script / auditor / judge-template fixes applied directly; instance-data normalization waits on parallel-WIP settling. Test-first per repo CLAUDE.md.
