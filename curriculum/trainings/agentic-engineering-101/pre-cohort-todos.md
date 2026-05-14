# Pre-cohort punchlist, AE101 M1–M6

Open decisions before the first paying cohort. Module files carry zero TODOs; this is the single tracking surface. Delete items when done, git is the history, this file is current state.

Sim sweeps and platform-capability checks are not tracked here. The `curriculum-pre-ship-audit` skill auto-fires on touched files; `check_platform_and_boundaries.md` fires on platform claims at content-time. **Per-class verdicts (PASS / REVISE / grandfathered) live in each module's own `**Quality:**` block**, `update-quality.sh` stamps both PASS and REVISE with the instance-JSON path so a successor can grep Quality blocks for state without consulting this file.

## Class-judge calibration, FP patterns to track (NOT prompt edits)

Findings flagged by the 2026-05-03 technical-class AND behavior-class judges against M4 + M5 prompt fences are **false positives** confirmed against the actual rule wording. See `memory/compounded/2026-05-03-platform-technical-judge-fp-square-vs-angle-and-scrollback-chain.md`.

- **`run-the-first-experiment.md` line 49 (`m4/<short-task-slug>`)** and **`learn-from-the-test.md` lines 31, 34, 35 (`<repo-name>` 5x)**, flagged by technical class as `check_prompts.md` rule 1 placeholder violations. **FP.** Rule 1's literal example list is `[BRACKETS]`, `[path from step 1]`, `[your task]`, `[feature area]`, every example is square brackets. Angle brackets `<...>` are NOT in the rule's scope; Claude reads them as derive-from-context instructions (live-tested).
- **`learn-from-the-test.md` Prompt 1 (the `m4/` worktree prompt with `<repo-name>` placeholders)**, flagged 2026-05-03 by behavior class as `file-preservation-gap` HIGH citing the same rule 1 violation. **FP, same root cause.** Behavior class inherited the technical class's calibration miss. Until calibration ships, this prompt will keep flagging behavior REVISE. Treat as accepted.
- **`learn-from-the-test.md` line 68 ("the paths we wrote in this session")**, flagged as `check_prompts.md` rule 5 chain-by-deterministic-path violation. **FP.** Rule 5 explicitly states *"Prefer scrollback-review chains... transcript is always the authoritative memory."* This phrasing IS the preferred pattern.
- **`run-the-first-experiment.md` Prompt 2 (M4 send-off)**, flagged 2026-05-03 by behavior class as `preamble-before-action` HIGH + `plan-mode-preamble-bloat` HIGH (load-bearing). **Pedagogical-by-design, not FP.** M4 is the un-packaged baseline; the prompt is deliberately under-packaged so the student feels what an unguided run does. M5's packaged re-run lands as the contrast lesson. Behavior judge reasons file-by-file and can't see the M4↔M5 contrast. Treat as accepted-by-design. Same accepted-with-mitigation logic as the body-callout patterns, but here even the callout is wrong, naming the bias would defuse the felt-evidence the contrast depends on.

Calibration fix candidates (judge-side, not curriculum-side): (a) tighten `curriculum/evals/judges/technical.md` AND `curriculum/evals/judges/prompt-behavior.md` to quote the rule's literal example list before flagging, square brackets in scope, angle brackets out. (b) extend `check_prompts.md` rule 1 wording to explicitly carve out angle brackets. (c) extend rule 5 to explicitly distinguish "scrollback-review chain (preferred)" from "invented alias without back-reference (banned)". Maintainer's call which (or which combination).

## Wire `how-the-best-do-ci-cd.md` into AE101

`curriculum/trainings/agentic-engineering-101/supplementary/how-the-best-do-ci-cd.md` ships in the AE101 content tarball but isn't declared in the TRAININGS registry (`site/layouts/curriculum.js`) and no module body links to it. Pick the module(s) it serves (M3 earn-the-trust? M5 learn-from-the-test?), add a body link, register it under `agentic-engineering-101.supplementaries`. Until then the workbook surfaces nothing for it; the file rides along in the tarball as content the agent can find but the human can't.

## Hook mechanics depth

Write `reference/hooks-and-loops.md` (1–2 page reference doc): stop-hook vs. command-loop tradeoff, two minimal examples, when to reach for which. Link from M3 + M5 maintainer blocks. Separate session.

## Collapse § 9 vs scheduled-agents.md; rescue session-lifecycle; incorporate new `/goal` command

Bundled rework, separate session.

- **Collapse `claude-code-for-engineers.md` § 9 to a one-paragraph pointer at `scheduled-agents.md`.** Closes items 45 + 46 below (no `/loop` or `/schedule` reconciliation needed if § 9 stops describing them). `scheduled-agents.md` becomes the canonical scheduling page; reference page stops competing with it.
- **Rescue the session-lifecycle three gotchas** (laptop sleep freezes the session; Ctrl+C mid-tool can corrupt `.jsonl`; no per-session budget cap) out of § 9 into their own short section in `claude-code-for-engineers.md`. They apply to any long-running session, not just scheduled ones, and M4's un-packaged send-off depends on them whether or not a scheduler is involved.
- **Check across and incorporate the new `/goal` command.** Live-test scope, audit `claude-code-for-engineers.md` § 11 (slash-command coverage) + `scheduled-agents.md` + any module body that should reference it. Land it where it fits; update the related slash-command items below (44) at the same pass.
- **Update the "Related AE101 modules" footer in `claude-code-for-engineers.md`** while in the file, M2/M3/M6 now actually link the page (2026-05-11 pass), trim or rewrite the footer to match reality rather than overclaim cross-refs.

## AE101 reference + supplementary audit findings (2026-05-09)

Captured by `/research-review`-shaped audit subagents against the 4 AE101 references + 2 AE101 supplementaries that survived the per-training split. Original report: `/tmp/ae101-audit/{reference,supplementary}-findings.md` (lost on tmp wipe; load-bearing items copied here).

**HIGH (verify-before-cohort):**

- **`reference/claude-code-for-engineers.md` link integrity.** Several doc URLs are unverified and aging on a sub-monthly-release platform:
 - Line 5: `code.claude.com/docs/en/memory.md`, official rendered path may drop `.md`; pick one shape across the file.
 - Line 65: `"auto memory needs Claude Code v2.1.59+"`, specific version with no changelog link or audit date. Pin or downgrade to "recent versions; check `claude --version`."
 - Line 70: `CLAUDE_CODE_DISABLE_AUTO_MEMORY=1`, verify exact env var name; convention mixes `CLAUDE_CODE_*` / `ANTHROPIC_*` / `CLAUDE_*`.
 - Lines 62–65, 192: subagent auto memory `#enable-persistent-memory` anchor, verify it exists at the cited URL.
 - Line 175: plan-mode docs URL points at `/overview` (product overview), not the dedicated plan-mode page.
 - Line 247: GitHub-issue numbers cited as Ctrl+C corruption evidence, soften ("community-reported") or upgrade to changelog/docs note.

**MED (fix or live-test):**

- **`reference/multi-session-git.md` line 28 + lines 41–43, `git worktree` syntax bug.** `git worktree add <path> <branch>` requires the branch to already exist. New-branch shape is `git worktree add -b <branch> <path>`. M1 homework engineers paste verbatim and hit `fatal: invalid reference` in 30 seconds. Fix to the `-b` form (or note "branch must exist") in both spots.
- **`reference/claude-code-for-engineers.md` §13 hooks coverage is a one-paragraph stub.** M3 + M5 lean on hooks. Closes when `reference/hooks-and-loops.md` ships (see *Hook mechanics depth* above).
- **`/context` and `/clear` missing from claude-code-for-engineers §11.** M1 introspection beat (*"type /context, look at the unread-slice number"*) needs `/context` documented. M5/M6 may need to teach the Claude Code `/clear` (compacts) vs `/compact` distinction; engineer-ref §11 lists `/compact` only.
- **Cross-file: `/loop` described differently** in `scheduled-agents.md` (interval + self-paced) vs `claude-code-for-engineers.md` (interval only). Reconcile to scheduled-agents (the available `/loop` skill confirms both forms).
- **Cross-file: `/schedule` slash command** present in `scheduled-agents.md`, absent from `claude-code-for-engineers.md`. Live-test which is current; add or remove.
- **Cross-file: doc-host root inconsistency.** `code.claude.com` (engineer-ref, mcp) vs `docs.anthropic.com` (scheduled-agents). Pick one canonical root.
- **`reference/mcp-and-connectors.md` line 7, `Last verified: 2026-04-23`** is now ~3 weeks stale. Re-verify Atlassian endpoints (line 60: `/sse` deprecates 2026-06-30 per Atlassian) and `claude mcp add` flag shape (line 37) before next cohort.
- **`reference/claude-code-for-engineers.md` lines 17, 156, 159–167, 301, 332, 348**, verify managed-policy macOS path (`Claude Code` with space vs `ClaudeCode` no-space), Shift+Tab cycle order, Ultraplan-on-web option, `CLAUDE_CODE_NEW_INIT=1` flag, `InstructionsLoaded` hook event name, `claudeMdExcludes` settings key.
- **`reference/claude-code-for-engineers.md` line 422**, file dated 2026-04-23, audited 2026-05-09, sub-monthly-release platform. Add a "stale if older than" line that triggers re-verification.
- **`supplementary/how-the-best-do-ci-cd.md` Quality block check.** Audit subagent surfaced concerns about a 54–95% / 5–22% percentage spread elsewhere in the supp library (zombie-stat shape), re-verify any statistics in this file before wiring it into a module per the wire-it-in TODO above.

## Per-file specific concerns (not caught by auto-fire)

- **`reading-the-return.md` + `learning-through-contrast.md`**, custom-persona sim: dual-mode reader (pre-read + in-room handout) at the M5 openers. Standard Maija/Greg/Jin trio doesn't simulate the dual-mode use.
- **`learning-through-contrast.md`**, cross-file framing alignment with its pre-read (no contradictions, no different vocabulary). Auto-fire is per-file; cross-file consistency needs explicit invocation.
- **`the-loop-has-a-name.md`**, custom-persona sim: CTO (vendor-plug risk on Ramp/Intercom anchoring), senior engineer (recognition vs remedial), engineer who never went past M1–M6 (does the scheduled-agents callout grow a need-to-try-now itch).
- **`the-loop-has-a-name.md`**, `/schedule` and `/loop` capability recheck via `claude-code-guide` within two weeks of any cohort date. Delivery-time exercise, not a content-time check.
- **`arc-retrospective.md`**, confirm Task-tool sub-task read of training-arc artefacts is reliable enough to ground the note. If flaky, route through main conversation with the same quote rule.
- **Worked-example skill triplet** (sharpened-verifier / LLM-judge / gap-finder) for Nerd's M6 reference library, by engineer archetype. First cohort outputs may seed these; track explicitly so it doesn't fall through.

## Eval-coverage gaps (story / technical / behavior on shared library)

Lectures + supplementaries written before the four-class refactor have writing-class PASS only; story / technical / behavior haven't fired. Auto-fire closes them on next touch; explicit fire-now is the cleaner pre-cohort posture but not blocking, verdicts default-grandfather under the per-class auto-degrade rule (curriculum/CLAUDE.md § Quality-state tagging) until the file is touched. Reference docs are exempt from sim/story; writing class already running. Onboarding files (`prework`, `sponsor-prework`, `cohort-onboarding-email`) closed by 2026-05-03 + 2026-05-09 audits.

## Audit 2026-05-09, post prompt-registry migration (commit 88a1dd4)

Four-class judges fired on 19 AE101-walked files (5 training-folder + 12 exercises + 2 lectures, the touched-by-migration set). Verdicts stamped per file's Quality block. Render parity confirmed; the migration was structurally invisible to story + technical + behavior. Writing class found pre-existing rule violations the migration didn't cause.

**Story:** 19/19 PASS. **Technical:** 19/19 PASS. **Behavior:** 18 PASS / 1 REVISE. **Writing:** 7 PASS / 12 REVISE.

### Writing-class REVISE, resolved by rule re-amendment

Rule 2(b) re-amended 2026-05-09 (second pass) to curriculum-wide convention: bare `MN` is fine in body at any file at Module 2 or later in the training's arc. Prework + M1 files use full form. Under the new rule, all bare `MN` occurrences in M2+ files PASS without per-file fixes. The diagnose-and-resend file (M5 exercise) needs no changes; bare M4/M5 are fine. Cards 5–12 over-corrected to full form before the rule landed; those files now use full form unnecessarily but remain grammatically valid. Re-fire of writing class confirms PASS post-rule-update.

## Cross-cutting ops

- **Architecture integrity reference**, write `reference/architecture-under-agentic-velocity.md`: how teams preserve architectural intent while agents make local changes quickly. Survey practitioner patterns (Klaassen / Curran on review structure, Cherny on stop-hooks as architectural enforcement, Ramp's skill marketplace as crystallized convention). Candid about being a survey, not a settled answer. Source: Uncle Bob (Robert C. Martin) on architecture + agentic coding. Separate session.
- **Trainer post-cohort feedback capture mechanism**, design how trainer's classroom observations route into module-file edits. Today the trainer-guide line says TBD. Options to weigh: per-cohort `customer/<cohort>/notes.md` + scheduled maintainer review; GitHub issues with `[cohort-feedback]` label; informal trainer judgment + customer-surface notes. Pick before first cohort.

---

**Canonical home:** this file. Module files carry zero TODOs, all pre-cohort open items route here.

**When an item closes:** delete the bullet. Git log carries the history. Don't annotate "done", closed = gone.

**When a new item surfaces mid-session:** add it here, not in the module file.
