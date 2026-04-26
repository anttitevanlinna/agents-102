# Actor report — Bootstrap M4 audit-your-agent verbatim

## Status
done

## Scratch
curriculum/evals/mechanical/scratch/bootstrap-m4

## Transcript
/Users/anttitevanlinna/.claude/projects/-Users-anttitevanlinna-Projects-agents-102/41811aa8-eed6-4317-9825-8258775079d1/subagents/agent-ab55d0c306d35511f.jsonl

## Prompts executed
1. Phase 1 prompt-001 (policy audit)
2. Phase 1.5 prompt-002 (what is in the report)
3. Phase 2 prompt-003 (agent-security + named attack classes)
4. Phase 3 prompt-004 (mitigate + residual)

## Artifacts written
- module-4/policy-report.md: 22 rule rows + counts/top-three/sector summary
- module-4/security-report.md: classical-controls preamble; access-control map (6 surfaces); threat table 9 rows across 5 named attack-class buckets (`prompt injection (direct)`, `prompt injection (indirect)`, `secrets in context and scrollback`, `tool confusion`, `plugin supply-chain`); all five mitigation shapes (`scope`, `split`, `filter`, `gate`, `review`) appear verbatim; top-three + recommended sequence; boundary section
- module-4/residual.md: 1 residual paragraph + "Doors I would rather not open" header + Maija's substituted decision line
- agents/monday-risks.md: edited — top-of-file structural exclusion section (corrects `onedrive/` → `sources/` path mismatch), Briefing routine with mandatory grep-filter step, Self-check line in output template

## Risk picked + mitigation
- Risk: personal-note paraphrase via Monday-risks agent (`sources/maija-prep-notes-skeptics.md`)
- Shape: `filter` (with structural exclusion as prerequisite)
- Residual: filter is prose-rule-plus-string-grep, not capability restriction; concept-level paraphrase that passes the grep is still possible; mitigation is local to this agent — next agent inherits zero protection; CLASS-1 underlying gap (no four-tier label, file still in general `sources/`) untouched. Re-check verdict on `secrets in context and scrollback` for the modified file alone: high → medium-low.

## Substitutions
- Plugin invocation -> direct Read of `plugin-install/.claude/plugins/security-audit/skills/{policy,agent-security}/SKILL.md` (logged at top of each phase in scrollback)
- Risk pick (Maija's one-sentence framing of the personal-note paraphrase risk) substituted before prompt-004
- "apply" confirmation substituted between the diff walk-through and the file edit
- Door-to-close (HR-adjacent communications) substituted under `## Doors I would rather not open`
- Debrief truncated per runner
