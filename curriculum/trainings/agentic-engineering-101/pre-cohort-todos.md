# Pre-cohort punchlist, AE101 M1–M6

Open decisions before the first paying cohort. Module files carry zero TODOs; this is the single tracking surface. Delete items when done, git is the history, this file is current state.

Sim sweeps and platform-capability checks are not tracked here. The `curriculum-pre-ship-audit` skill auto-fires on touched files; `check_platform_and_boundaries.md` fires on platform claims at content-time. **Per-class verdicts (PASS / REVISE / grandfathered) live in each module's own `**Quality:**` block**, `update-quality.sh` stamps both PASS and REVISE with the instance-JSON path so a successor can grep Quality blocks for state without consulting this file.

## Technical-class judge calibration, FP patterns to track (NOT prompt edits)

Three findings flagged by the 2026-05-03 technical-class judge against M4 + M5 prompt fences are **false positives** confirmed against the actual rule wording. See `memory/compounded/2026-05-03-platform-technical-judge-fp-square-vs-angle-and-scrollback-chain.md`.

- **`run-the-first-experiment.md` line 49 (`m4/<short-task-slug>`)** and **`learn-from-the-test.md` lines 31, 34, 35 (`<repo-name>` 5x)**, flagged as `check_prompts.md` rule 1 placeholder violations. **FP.** Rule 1's literal example list is `[BRACKETS]`, `[path from step 1]`, `[your task]`, `[feature area]`, every example is square brackets. Angle brackets `<...>` are NOT in the rule's scope; Claude reads them as derive-from-context instructions (live-tested).
- **`learn-from-the-test.md` line 68 ("the paths we wrote in this session")**, flagged as `check_prompts.md` rule 5 chain-by-deterministic-path violation. **FP.** Rule 5 explicitly states *"Prefer scrollback-review chains... transcript is always the authoritative memory."* This phrasing IS the preferred pattern.

Calibration fix candidates (judge-side, not curriculum-side): (a) tighten `curriculum/evals/judges/technical.md` to quote the rule's literal example list before flagging, square brackets in scope, angle brackets out. (b) extend `check_prompts.md` rule 1 wording to explicitly carve out angle brackets. (c) extend rule 5 to explicitly distinguish "scrollback-review chain (preferred)" from "invented alias without back-reference (banned)". Maintainer's call which (or which combination).

## Hook mechanics depth

Write `reference/hooks-and-loops.md` (1–2 page reference doc): stop-hook vs. command-loop tradeoff, two minimal examples, when to reach for which. Link from M3 + M5 maintainer blocks. Separate session.

## Per-file specific concerns (not caught by auto-fire)

- **`reading-the-return.md` + `learning-through-contrast.md`**, custom-persona sim: dual-mode reader (pre-read + in-room handout) at the M5 openers. Standard Maija/Greg/Jin trio doesn't simulate the dual-mode use.
- **`learning-through-contrast.md`**, cross-file framing alignment with its pre-read (no contradictions, no different vocabulary). Auto-fire is per-file; cross-file consistency needs explicit invocation.
- **`the-loop-has-a-name.md`**, custom-persona sim: CTO (vendor-plug risk on Ramp/Intercom anchoring), senior engineer (recognition vs remedial), engineer who never went past M1–M6 (does the scheduled-agents callout grow a need-to-try-now itch).
- **`the-loop-has-a-name.md`**, `/schedule` and `/loop` capability recheck via `claude-code-guide` within two weeks of any cohort date. Delivery-time exercise, not a content-time check.
- **`arc-retrospective.md`**, confirm Task-tool sub-task read of training-arc artefacts is reliable enough to ground the note. If flaky, route through main conversation with the same quote rule.
- **Worked-example skill triplet** (sharpened-verifier / LLM-judge / gap-finder) for Nerd's M6 reference library, by engineer archetype. First cohort outputs may seed these; track explicitly so it doesn't fall through.

## Cross-cutting maintainer-block additions (every AE101 module)

The 2026-05-03 compendium-amendment batch added rules 44–47 to `check_pedagogy.md`. Every AE101 module is currently missing the rows these rules require in maintainer blocks. Applies to `getting-going.md`, `earn-the-trust.md`, `plan-mode-done-right.md`, `run-the-first-experiment.md`, `spot-gaps-build-the-loop.md`, `learn-from-the-test.md`. One bulk pass closes all four:

- **Rule 44, Plug points + UX**: every `## Plug Points` entry names the *kind* of org context that fits (`sponsor-stated ticket tracker`, `team's CI gate`), not vague slot labels.
- **Rule 45, Per-exercise leap test**: maintainer block adds a section naming three observable Monday-morning outcomes the student exhibits on their own codebase by the next working day, in falsifiable verbs (`opens a worktree from the previous run's branch` beats `practices worktree workflow`).
- **Rule 46, Cross-module artefact contracts**: maintainer block adds a contract row for each artefact a phase produces that a later phase or module reads by stable path (`CLAUDE.local.md`, ADRs, authored skills, `plan.md`, worktree branches, eval reports, packaged subagents), naming the stable identifier, the producing prompt, and the consuming module.
- **Rule 47, Per-phase failure mode + escape hatch**: for each phase shipping a forcing function, the maintainer block names the dominant student failure mode and one escape hatch (trainer move, Nerd line, fallback prompt, maintainer-block diagnostic).

## Eval-coverage gaps (no JSON instances yet)

Surfaced 2026-05-03 by `curriculum/evals/scripts/status.sh --training ae101`. These files have never been audited by the three-class judge, auto-fire on next touch will close the gap, but explicit fire-now is the cleaner pre-cohort posture.

- **AE101 onboarding files (3):** `prework.md` (top-state degraded to draft 2026-05-03, re-audit needed), `sponsor-prework.md`, `cohort-onboarding-email.md` (top-state degraded to draft 2026-05-03, re-audit needed). Run `/eval-fire` writing + technical at minimum; story class likely n/a for non-narrative files.
- **Supplementary library (7):** `agent-ready-data`, `building-guardrails`, `clean-code-is-steering`, `cookbook-for-agent-system-design`, `how-the-best-do-ci-cd`, `learning-and-compounding-systems`, `personal-to-company-gap`. The two already covered (`agent-trigger-list`, `what-is-an-agent`) confirm the format works; just hasn't been run on the rest.
- **Reference docs (5):** `claude-code-for-engineers`, `claude-quick-reference`, `mcp-and-connectors`, `multi-session-git`, `scheduled-agents`. Per `curriculum/CLAUDE.md` reference files are exempt from the sim/story ladder; writing-class lint (banned words, register match) still applies and isn't running.

## Cross-cutting ops

- **Architecture integrity reference**, write `reference/architecture-under-agentic-velocity.md`: how teams preserve architectural intent while agents make local changes quickly. Survey practitioner patterns (Klaassen / Curran on review structure, Cherny on stop-hooks as architectural enforcement, Ramp's skill marketplace as crystallized convention). Candid about being a survey, not a settled answer. Source: Uncle Bob (Robert C. Martin) on architecture + agentic coding. Separate session.
- **Trainer post-cohort feedback capture mechanism**, design how trainer's classroom observations route into module-file edits. Today the trainer-guide line says TBD. Options to weigh: per-cohort `customer/<cohort>/notes.md` + scheduled maintainer review; GitHub issues with `[cohort-feedback]` label; informal trainer judgment + customer-surface notes. Pick before first cohort.

---

**Canonical home:** this file. Module files carry zero TODOs, all pre-cohort open items route here.

**When an item closes:** delete the bullet. Git log carries the history. Don't annotate "done", closed = gone.

**When a new item surfaces mid-session:** add it here, not in the module file.
