# Pre-cohort punchlist, AE101 M1–M6

Open decisions before the first paying cohort. Module files carry zero TODOs; this is the single tracking surface. Delete items when done, git is the history, this file is current state.

Sim sweeps and platform-capability checks are not tracked here. The `curriculum-pre-ship-audit` skill auto-fires on touched files; `check_platform_and_boundaries.md` fires on platform claims at content-time. **Per-class verdicts (PASS / REVISE / grandfathered) live in each module's own `**Quality:**` block**, `update-quality.sh` stamps both PASS and REVISE with the instance-JSON path so a successor can grep Quality blocks for state without consulting this file.

## Hook mechanics depth

Write `reference/hooks-and-loops.md` (1–2 page reference doc): stop-hook vs. command-loop tradeoff, two minimal examples, when to reach for which. Link from M3 + M5 maintainer blocks. Separate session.

## Collapse § 9 vs scheduled-agents.md; rescue session-lifecycle; incorporate new `/goal` command

Bundled rework, separate session.

- **Collapse `claude-code-for-engineers.md` § 9 to a one-paragraph pointer at `scheduled-agents.md`.** `scheduled-agents.md` becomes the canonical scheduling page; reference page stops competing with it. (The 2026-05-14 verification reconciled `/loop` + `/schedule` inside §9; if §9 collapses later, the reconciliation moves with it.)
- **Rescue the session-lifecycle three gotchas** (laptop sleep freezes the session; Ctrl+C mid-tool can corrupt `.jsonl`; no per-session budget cap) out of § 9 into their own short section in `claude-code-for-engineers.md`. They apply to any long-running session, not just scheduled ones, and M4's un-packaged send-off depends on them whether or not a scheduler is involved.
- **Check across and incorporate the new `/goal` command.** Live-test scope, audit `claude-code-for-engineers.md` § 11 (slash-command coverage) + `scheduled-agents.md` + any module body that should reference it. Land it where it fits.
- **Update the "Related AE101 modules" footer in `claude-code-for-engineers.md`** while in the file, M2/M3/M6 now actually link the page (2026-05-11 pass), trim or rewrite the footer to match reality rather than overclaim cross-refs.

## AE101 reference + supplementary audit findings (2026-05-09; refreshed 2026-05-14)

Most 2026-05-09 items closed by the 2026-05-14 verification pass (`/tmp/ae101-todo-zero/{engineer-ref-and-scheduled,mcp-and-connectors,cicd-supp-zombie-audit}.md`). Real bugs fixed: plan-mode URL pointed at product `/overview` (now permission-modes anchor); Shift+Tab cycle order was wrong (`acceptEdits` not `Auto-accept`, `auto` no longer in default cycle); plan-mode approval options drifted from 4 to 5 with re-wording (rewrote table verbatim); Atlassian MCP endpoint moved to `/v1/mcp/authv2`. `/context` + `/clear` added to §11 with "two verbs split the work" framing; `/schedule` + self-paced `/loop` added to §9; `code.claude.com` confirmed canonical (`docs.anthropic.com` 301-redirects); stale-after line added to engineer-ref footer. AE101 M2 `plan-mode-done-right.md` line 12 corrected (count dropped).

**REMAINING from this verification pass:**

- **`reference/claude-code-for-engineers.md` §13 hooks coverage is a one-paragraph stub.** M3 + M5 lean on hooks. Closes when `reference/hooks-and-loops.md` ships (see *Hook mechanics depth* above).
- **`supplementary/how-the-best-do-ci-cd.md` Curran 19.2% scope.** Curran's 19.2% is org-wide in the source; file frames it as "lowest tier" (lines 17, 33, 53). Defensible from context but not verbatim. Tighten before first cohort if precision matters. Klaassen 14-agent count and 10-people headcount fixed inline; Ramp four numbers stay sourced-unconfirmed (X.com paywalled today).
- **Register-call: `/loop` version floors + lifecycle**, `/loop` requires v2.1.72+; Ultraplan requires v2.1.91+; recurring `/loop` tasks auto-expire 7 days after creation; `Esc` (not Ctrl+C) interrupts the bare-`/loop` wait. Subagent left these out of engineer-ref to preserve "behaviour-named, not version-pinned" register. Maintainer call whether to land any of them.

**Cross-training drift contamination (out-of-AE101-scope; for Agents 101 todo):** the 4→5 approval-paths and Shift+Tab cycle drifts also live in `curriculum/trainings/agents-101/reference/claude-quick-reference.md` (lines 56, 64–72) and `curriculum/exercises/build-your-challenge-memory.md` line 45 (Agents 101 M2 only). Same root drift; same fix shape.

## Per-file specific concerns (not caught by auto-fire)

- **`reading-the-return.md` + `learning-through-contrast.md`**, custom-persona sim: dual-mode reader (pre-read + in-room handout) at the M5 openers. Standard Maija/Greg/Jin trio doesn't simulate the dual-mode use.
- **`learning-through-contrast.md`**, cross-file framing alignment with its pre-read (no contradictions, no different vocabulary). Auto-fire is per-file; cross-file consistency needs explicit invocation.
- **`the-loop-has-a-name.md`**, custom-persona sim: CTO (vendor-plug risk on Ramp/Intercom anchoring), senior engineer (recognition vs remedial), engineer who never went past M1–M6 (does the scheduled-agents callout grow a need-to-try-now itch).
- **`the-loop-has-a-name.md`**, `/schedule` and `/loop` capability recheck via `claude-code-guide` within two weeks of any cohort date. Delivery-time exercise, not a content-time check.
- **`arc-retrospective.md`**, confirm Task-tool sub-task read of training-arc artefacts is reliable enough to ground the note. If flaky, route through main conversation with the same quote rule.
- **Worked-example skill triplet** (sharpened-verifier / LLM-judge / gap-finder) for Nerd's M6 reference library, by engineer archetype. First cohort outputs may seed these; track explicitly so it doesn't fall through.

## Cross-cutting ops

- **Architecture integrity reference**, write `reference/architecture-under-agentic-velocity.md`: how teams preserve architectural intent while agents make local changes quickly. Survey practitioner patterns (Klaassen / Curran on review structure, Cherny on stop-hooks as architectural enforcement, Ramp's skill marketplace as crystallized convention). Candid about being a survey, not a settled answer. Source: Uncle Bob (Robert C. Martin) on architecture + agentic coding. Separate session.
- **Trainer post-cohort feedback capture mechanism**, design how trainer's classroom observations route into module-file edits. `trainer-guide.md` § Feedback Loop currently points at this file (*"Capture mechanism is being designed, see pre-cohort-todos.md"*). Decision deferred 2026-05-14 to after first cohort runs; first cohort will reveal what shape is actually needed.

---

**Canonical home:** this file. Module files carry zero TODOs, all pre-cohort open items route here.

**When an item closes:** delete the bullet. Git log carries the history. Don't annotate "done", closed = gone.

**When a new item surfaces mid-session:** add it here, not in the module file.
