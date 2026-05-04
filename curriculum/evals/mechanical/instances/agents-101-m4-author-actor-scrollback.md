# Actor Scrollback — Agents 101 M4 author-security-skill

## Session Flow

### Arrange Phase
- Created scratch directory: `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/agents-101-m4`
- Copied M3 artifacts (agents/, memory/, sources/, module-3/)
- Copied M4 policy files: ai-use-baseline.md, data-classification.md, gdpr-essentials.md, sector-rules-placeholder.md
- Git init and initial commit: "wip - m4 starting state"
- Verified directory structure: module-4/policies/, agents/, memory/, sources/ present

### Phase 1: raw-policy
- Read prompt-001.txt (requirement to audit system against policies)
- Read all four policy files to understand rule structure
- Read sample files: agents/monday-risks.md (clear scope), sources/maija-prep-skeptics.md (personal data marker), sources/leads-sync-notes.md (named individuals), module-3/stances/ (multi-agent synthesis)
- Audited system against 15 rules across four policy files
- Produced outputs/policy-report-raw.md with table format: rule | description | verdict | evidence
- Verdicts: 3 compliant, 4 violating (AI-4 behavioral profiling, AI-6 personal data governance, CLASS-1 no tier labels, CLASS-2 restricted data handling, GDPR-2 no minimisation), 9 "I can't tell"
- Key findings: personal data in general sources/, no data tier discipline, agent reads and synthesizes personal information

### Phase 2: dictate-lines
- Read prompt-002.txt (require Maija's input before package design)
- Responded as Claude: acknowledged raw report, asked for Maija's critical lines (data/policy/failure-mode)
- Pasted Maija's five lines verbatim:
  1. Partner-NDA material must never leave laptop, including paraphrased
  2. Finnish data-protection authority: automated decisions about individuals out of scope
  3. Module 3 multi-agent reads sources directly; personal notes can paraphrase into customer brief without notice
  4. First reusable skill must set supply-chain bar (hygiene from day one)
  5. Agent has shell access; need structural rule on write paths
- Proposed package shape: one skill "security-audit" under module-4/skills/security-audit/SKILL.md (not plugin-install), two lenses POLICY and AGENT-SECURITY
- Acknowledged Maija's steer

### Phase 3: author-lenses
- Read prompt-003.txt (author the two lenses, grill before save)
- Responded as Claude: asked three questions covering POLICY lens (verdicts only vs. fixes? all 15 rules or curated 12?) and AGENT-SECURITY lens (all risks per class or top 1-2?)
- Pasted student's "enough" answer verbatim: "Cover scope-of-write paths and supply-chain provenance for the policy lens. Use Maija's five lines as the policy specifics. Save now."
- Authored module-4/skills/security-audit/SKILL.md with:
  - **POLICY lens:** rule | description | verdict | evidence table format; ≥12 rules from four policy files; explicit audit of write-scope and supply-chain rules
  - **AGENT-SECURITY lens:** four attack classes (prompt injection with direct/indirect, secrets in context/scrollback, tool confusion, skill supply-chain) with ranked risks and mitigations (scope/split/filter/gate/review)
  - Preamble naming classical controls: "network controls, identity and access management, logging, vendor/security review"
  - All five mitigation shapes verbatim: scope, split, filter, gate, review
  - Report shapes for both lenses
  - Metadata section on pass criteria and re-audit triggers

### File Artifacts Written
- outputs/policy-report-raw.md (Phase 1 raw audit)
- module-4/skills/security-audit/SKILL.md (Phase 3 authored skill with both lenses)

### Forcing-Function Validation
✓ prompt injection (direct and indirect) — present
✓ secrets in context — present
✓ scrollback — present in "secrets in context" section
✓ tool confusion — present
✓ skill supply-chain — present (verbatim)
✓ network controls, identity and access management, logging, vendor — all present in preamble
✓ layering relationship ("sit on top of") — present
✓ scope, split, filter, gate, review — all present verbatim as mitigations
✓ Report shape table: "| Rule | Description | Verdict | Evidence |" — present
✓ ≥12 rule rows — policy lens covers 15 rules with ≥12 rows in example
✓ Single file: module-4/skills/security-audit/SKILL.md (not separate SKILL.md files for each lens)
✓ No ~/.claude/ writes, no plugin-install/, no separate policy/SKILL.md or agent-security/SKILL.md

## Key Decisions Made

1. **Scope of POLICY lens:** Enumerated all 15 rules from four policy files; added two critical rules (write-scope and supply-chain provenance) explicitly from Maija's five lines.
2. **Attack class ranking:** All four classes covered with primary risks ranked by severity (e.g., CRITICAL for write-scope drift, HIGH for personal data in sources).
3. **Mitigation naming:** Used exactly five mitigation shapes (scope/split/filter/gate/review) consistently across attack classes; mapped each to a system-specific risk.
4. **Report shape:** Kept POLICY lens as table (familiar from raw report), AGENT-SECURITY as narrative with risk/mitigation pairs (more flexible for ranked severity).

## Files Left on Disk
- outputs/policy-report-raw.md
- module-4/skills/security-audit/SKILL.md
