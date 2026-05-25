# AE101 source sweep — consolidated findings (2026-05-25)

Generated from a 5-agent parallel verification sweep over the AE101 evidence surface (~80 sources, 18 files). Per-group reports with paste-ready stamps + exact fixes: `group-A.md` … `group-E.md` in this dir.

**How to use:** apply the BLOCK fixes, paste the stamp from the relevant group report into each file's `Source verification` block, then `curriculum/evals/scripts/source-freshness.sh --target <cohort-date>` to confirm zero BLOCK. This file is the snapshot; the script is the live check going forward.

## Sweep result (counts)

| group | files | OK | CAVEAT | CORRECT | STALE | NEEDED | GONE | BLOCKED |
|---|---|---|---|---|---|---|---|---|
| A — M5 numbers | what-packaging-is, the-loop-has-a-name, story-of-module-6, learn-from-the-test | 7 | 3 | 2 | 0 | 2 | 0 | 1 |
| B — M6/composition | composing-the-workflow, agents-that-build-agents, workflow-composition-lineages, spot-gaps-build-the-loop | 15 | 1 | 2 | 1 | 1 | 0 | 1 |
| C — quality/contrast | quality-is-grounding, test-and-learn, learning-through-contrast, reading-the-return, run-the-first-experiment | 4 | 2 | 0 | 0 | 1 | 0 | 0 |
| D — supplementaries | clean-code-is-steering, how-the-best-do-ci-cd, what-is-agentic-engineering, earn-the-trust, getting-going, plan-mode-done-right | 14 | 3 | 1 | 2 | 3 | 0 | 1 |
| E — reference/capability | mcp-and-connectors, claude-code-for-engineers, multi-session-git, trainer-guide | 8 | 0 | 2 | 0 | 0 | 1 | 6* |
\* E's BLOCKED = expected auth walls on settings pages (fine). `gemini-cli-for-engineers.md` does not exist (Gemini CLI is "planned").

## DONE this session (applied + stamped)

- **what-packaging-is.md** — Cherny three-shape attribution reversal fixed (body L24 + maintainer block; it had been flipped to assert the *opposite* of the 2026-04-25 finding). Huntley "ticket-triage" → "greenfield" (L16). Klaassen 80/20 re-pinned to *How Every Codes With Agents* (not the Definitive Guide, which lacks it). Full block migrated to stamps. `source-freshness.sh` → 0 BLOCK.
- **quality-is-grounding.md + trainer-guide.md** — 500K-lines demo converted from "verification debt" to a `result:ATTESTED due:none` maintainer-attested stamp. Trusted on the maintainer's first-hand word; no URL owed.

## RESOLVED 2026-05-25 (post-sweep working session)

- **BLOCK#1 Uncle Bob verbatim** — NOT downgraded: all 7 X quotes VERIFIED verbatim via oEmbed workaround; clean-code-is-steering.md stamped OK.
- **BLOCK#2 Ramp/Charles** — byline fixed (Peter Yang, not Lenny Rachitsky; verified); numbers re-attributed Charles-direct (`observations/ramp.md` + X date via oEmbed). how-the-best-do-ci-cd.md.
- **BLOCK#3 Klaassen 80/20** — re-pinned to *How Every Codes With Agents* (not Definitive Guide); spot-gaps-build-the-loop.md.
- **BLOCK#4 dead Dino link** — fixed (composing-the-workflow.md).
- **BLOCK#5 Ronacher "need/use"** — live re-fetch: body "need" is CORRECT; sweep's "use" was wrong. No change (conflict-not-auto-applied call held).
- **STALE Husain** — confirmed Aug 15 2025; dated-historical framing applied (definitional, not metric). how-the-best-do-ci-cd.md.
- **CORRECT composio GONE** — deep link 404; pointed to composio.dev root. mcp-and-connectors.md.
- **CORRECT GitHub issues** — softened "all three closed with repros" to documented/closed-as-dup/not-planned. claude-code-for-engineers.md.
- **CORRECT multi-session-git** — OVERTURNED: Cherny X post (oEmbed) verbatim backs "3–5 worktrees / single biggest productivity unlock." Claim verified correct; no change. Group E false-negative.

## BLOCK — original sweep list (above resolutions supersede)

1. **clean-code-is-steering.md — Uncle Bob 8 verbatim X quotes unverifiable** (group-D). All x.com URLs 402, mirror 403, OODA file lacks the verbatim + status-IDs. Substance corroborated by Security Now sn-1070 transcript; the *verbatim wording + status-ID attributions* are not. → JUDGMENT: downgrade the maintainer "Research pass captured" claim to BLOCKED, OR replace the verbatim block-quotes with paraphrase + the sn-1070 cite. Don't fabricate the X wording.
2. **how-the-best-do-ci-cd.md L57/92/151 — Ramp/Charles byline wrong + numbers off-URL** (group-D). `creatoreconomy.so` is Peter Yang's "Behind the Craft," NOT Lenny Rachitsky; the 350+/99.5%/84% numbers aren't on that page — they trace to Charles's auth-walled X post (per `observations/ramp.md`). → Fix byline to Peter Yang; stamp the numbers `result:OK` attributed to `observations/ramp.md` (practitioner-direct, X access-walled) or `[maintainer-attested]` if from the meetup.
3. **spot-gaps-build-the-loop.md L160 — Klaassen 80/20 wrong URL** (group-B). Pinned to the Definitive Guide (lacks it); real source is the plugin README (`github.com/EveryInc/compound-engineering-plugin`: "80% is in planning and review, 20% is in execution") or *How Every Codes With Agents*. → Re-pin; keep Every.to for philosophy only.
4. **composing-the-workflow.md L36 — dead Dino link** (group-B). Points at `supplementary/skill-stacking/skill-stacking.md`; real path is flat `supplementary/skill-stacking.md`. → drop the dir segment. [APPLIED — see below]
5. **workflow-composition-lineages.md L92/L169 — Ronacher "Pi" quote CONFLICT** (group-B). Sweep says live text reads "if I don't **use** them"; the maintainer note L169 says "Confirmed 2026-05-21" with "**need**". Two passes disagree on a verbatim quote. → NOT auto-applied — a human opens `lucumr.pocoo.org/2026/1/31/pi/`, reads the line, sets it once, re-stamps. (Auto-flipping on one agent's read is the Cherny reversal in miniature; the stamp's job is to stop exactly this.)

## STALE — re-date-as-historical or swap (group report)

- **how-the-best-do-ci-cd.md L43 — Husain guardrails-vs-evaluators** resolves to 2025-08-15, outside the 6-month window (group-D). Substance verified. → JUDGMENT: label as dated canonical framing, OR swap to a post-2025-11-25 source.
- **Ronacher 2025-06-12 agentic-coding** cited in group-D files — past window, supporting-source only; confirm body dates it as historical.

## CORRECT (precision) — non-attribution (group report)

- **claude-code-for-engineers.md §9 L280** — GitHub issues #3003/#17466/#18880 described as "all three closed with repros"; actually #3003 closed-as-duplicate, other two closed-as-not-planned (group-E). The *corruption-documented* point holds; the *resolution* wording is wrong. → reword.
- **multi-session-git.md L100** — Pragmatic Engineer interview says "parallel instances/checkouts," not "worktrees," and not "single biggest productivity unlock" (that rides only on the BLOCKED Cherny X post) (group-E). → soften to what the interview actually says.
- **what-packaging-is.md L56 / cross-file** — Curran is "VP Engineering," not "CTO"; headcount normalize to ~470 R&D / ~1,300 total (the-loop-has-a-name.md already uses the tighter pair) (group-A). → soften title at delivery.

## NEEDED / GONE (group report)

- **mcp-and-connectors.md L64/L149 — composio jira-mcp-server 404 (GONE)** (group-E). → replace or drop the deep link.
- **what-packaging-is.md /compact-at-60% convergent count** — resolved to `result:OK` (body hedges "some practitioners," no count claim). [DONE]

## Stamp migration still owed (mechanical, paste-ready)

The per-group reports carry a paste-ready stamp line for every source. Files not yet migrated to stamps in their `Source verification` block: `the-loop-has-a-name`, `learn-from-the-test`, `story-of-module-6`, `composing-the-workflow`, `agents-that-build-agents`, `workflow-composition-lineages`, `spot-gaps-build-the-loop`, `test-and-learn`, `learning-through-contrast`, `reading-the-return`, `run-the-first-experiment`, `clean-code-is-steering`, `how-the-best-do-ci-cd`, `what-is-agentic-engineering`, `mcp-and-connectors`, `claude-code-for-engineers`, `multi-session-git`. Migration = paste each report's stamp lines, fix the BLOCK bodies above. Low-judgment; can run as one mechanical pass.
