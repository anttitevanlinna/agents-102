# Actor report — Bootstrap M4 verbatim — 2026-04-24

## Status
done

## Scratch
curriculum/evals/mechanical/scratch/bootstrap-m4

## Prompts executed
1. Phase 1 prompt-001 (policy audit)
2. Phase 1.5 prompt-002 (what's in the report)
3. Phase 2 prompt-003 (STRIDE + access-control)
4. Phase 3 prompt-004 (mitigate + residual)

## Artifacts written
- module-4/policy-report.md: 21 rules, one row each (header + separator + 21 = 23 table rows); totals 9 compliant / 3 violating / 9 "I can't tell"
- module-4/security-report.md: access-control table + six agent-STRIDE sub-sections with 1-2 named risks each + three-tier ranked mitigations (3 high / 3 medium / 2 low)
- module-4/residual.md: re-run note + one residual paragraph + "Doors I'd rather not open" section
- agents/monday-risks.md: edited (structural exclusion block at top + filter-before-write step + self-check line; prose-rule path corrected `onedrive/...` → `sources/...`)

## Risk picked + mitigation
- Risk: personal-note paraphrase via Monday-risks agent (Information Disclosure #1)
- Shape: filter (plus structural scope — named excluded path)
- Residual: prose-rule-plus-grep, not capability restriction; determined paraphrase at higher abstraction passes the grep; reduced, not eliminated

## Substitutions
- Skill invocation → direct Read of skills/ files (no auto-discovery); logged at top of each phase
- Risk pick + mitigation shape + "apply" confirmation + door-to-close: Maija answers per runner
- Debrief + homework truncated per runner pattern
- Root CLAUDE.md absent in inherited scratch state — noted in policy-report as a cascading cause of nine "I can't tell" verdicts
