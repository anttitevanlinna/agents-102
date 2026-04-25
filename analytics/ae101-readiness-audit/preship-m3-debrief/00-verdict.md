# Pre-ship audit verdict — M3 Debrief sharpen cycle

**File audited:** `curriculum/trainings/agentic-engineering-101/earn-the-trust.md`
**Cycle scope:** M3 Debrief prompt block (lines 58–73). Four changes:
1. Inputs the prompt asks Claude to read shifted from one dense prose sentence to a five-bullet list.
2. The "team-worthy flag" instruction moved from a mid-Job-1 prose aside into the closing reporting requirement (forcing-function shape change).
3. Paths corrected to `./CLAUDE.local.md` form per AE101 Builder-scope rule.
4. Post-prompt prose tightened.

**Date:** 2026-04-25
**Aggregate verdict:** **GO (APPROVE WITH TODOs).** Zero REVISE. Three personas all 8+/10. Composite gate clean. TODOs logged in the file's maintainer block; one cosmetic em-dash polish applied inline (hard-rule compliance per `check_student_facing` #14).

---

## Per-check verdicts

| Check | Verdict | Score / signal | Output |
|---|---|---|---|
| Persona — Maija (mid-competent) | SHIP | 9/10 end-mood | `01-persona-maija.md` |
| Persona — Greg (opinionated senior) | SHIP | 8/10 end-mood | `02-persona-greg.md` |
| Persona — Jin (fast operator) | SHIP | 8/10 end-mood | `03-persona-jin.md` |
| LLM-as-judge eval | APPROVE WITH TODOs | 0 REVISE-grade essentials, 3 TODOs | `04-eval.md` |
| Source verification | NO-OP | No new claims this cycle | inline grep |
| Claude Code capability check | APPROVE | All 4 moves verified current | `06-capability.md` |

---

## Headline finding on the cycle's change

**The team-worthy flag relocation is the right move.** All five checks converged:

- **Greg:** "reads as a structured deliberation step (not theatre)"
- **Jin:** "the load-bearing piece is the prompt's third reporting instruction... the report shape forces a yes/no I have to react to; the closing prose alone would have washed past me"
- **Maija:** "understood WHEN to flag (at report time) and WHAT it means (codebase-wide applicability)"
- **Eval:** "moving the flag from a mid-Job-1 aside into the closing report is the right write-then-assess order — it prevents team-promotion semantics leaking into the personal-file write"
- **Strategy doc:** matches the AE101 Debrief contract verbatim (per eval)

The bullet-list input format is a real improvement under speed (Jin: "I scanned them in seconds and would have skipped that check as prose"). `./CLAUDE.local.md` precision earns trust per Greg.

## TODOs surfaced (logged in maintainer block, next-cycle work)

1. **Greg's question-form** — convert the team-worthy parenthetical to interrogative. Forces deliberation as report output, not trainer-supplied definition.
2. **Jin's verification-into-report** — pull "check both files" out of post-prompt prose into the prompt's reporting requirement. Same forcing-function pattern as the team-worthy relocation. Closes the silent-failure gap Jin identified.
3. **Eval's integrate-don't-append clarification** — Job 2's rule applies to SKILL.md sharpening, not Job 1's `CLAUDE.local.md` pattern (which IS append-shaped). Soft ambiguity worth one sentence to disambiguate.
4. **Eval's first-cohort watch-for** — confirm relocated team-worthy flag stays codebase-grounded (not drifting to generic).
5. **Maija's self-study nudge** — Nerd needs a one-liner on flagging-without-anxiety for solo students. Cohort delivery unaffected.
6. **Greg's Key Concepts metaphor sweep** — `"a gift from the frontier"` (line 40) and `"the mirror reflects"` (line 50) flicker as sales-copy register. Cosmetic; separate cycle.

## What was applied inline this cycle (not deferred)

- **Em-dash polish on lines 90, 92** (Pre-reads section): em-dash separator after `**Read**` and `**Optional deeper scan**` labels swapped for colon. Hard-rule compliance per `check_student_facing` #14.

## Compendium / process notes for end-of-session

- The pre-ship audit auto-fire criteria need a sharper line. Twice this session I noted "criteria not met, shipping" then was correctly questioned. The team-worthy flag relocation IS a forcing-function shape change. Self-discipline default: when prompt-shape edits relocate WHERE a deliberation surfaces in the student's experience, that's forcing-function shape change, not polish. Worth a one-line amendment to the compendium / SKILL.md auto-fire criteria.

---

*Audit dispatched per `.claude/skills/curriculum-pre-ship-audit/SKILL.md`. Five subagents in parallel + inline source check. Aggregation here.*
