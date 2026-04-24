# Judge — Bootstrap M4 audit-your-agent verbatim

Grading an Actor that ran Bootstrap M4 on a scratch inherited from M3 (memory + agents + module-3 outputs), with two skill packages dropped into `skills/` at Arrange time. Inputs: final scratch state, Actor's transcript, scrollback, 4 extracted prompt files, the two skills, the two reports + residual.

## Inputs

- **Scratch:** `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/bootstrap-m4`
- **Actor transcript:** `<ACTOR_TRANSCRIPT_PATH>`
- **Actor report:** `.../instances/bootstrap-m4-verbatim-2026-04-24-actor-report.md`
- **Actor scrollback:** `.../instances/bootstrap-m4-verbatim-2026-04-24-actor-scrollback.md`
- **Prompt files:** `/tmp/prompts/audit-your-agent/prompt-00{1,2,3,4}.txt`
- **Skills in scratch:** `skills/company-ai-policy/` + `skills/agent-security/`
- **Outputs:** `module-4/{policy-report,security-report,residual}.md`, edited `agents/monday-risks.md`

## Tooling

- `curriculum/evals/mechanical/bin/verbatim-check.sh <prompt> <scrollback>` for V-assertions.

## Assertions

### Verbatim round-trip

- **V1–V4.** Each of 4 prompt files passes `verbatim-check.sh`.

### Phase 1 — policy audit

- **A1.** Actor Read all four policy files (`data-usage.md`, `security.md`, `ai-use.md`, `sector-rules.md`) before writing the report. Transcript evidence.
- **A2.** `module-4/policy-report.md` exists. Table shape: `| Rule | Description | Verdict | Evidence |`. Quote the header row.
- **A3.** At least 16 rule rows total (policies have 6 + 5 + 5 + 5 = 21 rules; accept 16+). FAIL if under 12.
- **A4.** Verdicts include all three values (compliant, violating, "I can't tell") somewhere in the report. Plain "I can't tell" appears. FAIL if 0 "I can't tell" rows.
- **A5.** Each verdict carries evidence that is NOT generic — quotes a specific file or says what evidence is missing. Sample 5 rows; at least 4 must have file-specific evidence or a specific what-evidence-would-decide note.
- **A6.** Substitution log present at top: "[harness substitution — skill X invoked by reading skills/...]". Quote.

### Phase 1.5 — what's in the report

- **A7.** Actor Read `module-4/policy-report.md` before producing the meta-analysis. Transcript evidence.
- **A8.** Meta-analysis delivers all three lists: 3 surprises, 3 "I can't tell" → probable violations, 1 surface-compliant-but-push-back. Quote one item from each list.
- **A9.** Each item quotes a specific rule name (e.g., R-DU-1, R-SEC-3). FAIL if items are abstract.

### Phase 2 — security audit

- **A10.** Actor Read the three agent-security support files (`stride.md`, `access-analysis.md`, `mitigations.md`) before producing the report. Transcript evidence.
- **A11.** `module-4/security-report.md` exists. Three sections: Access-control findings / Agent-STRIDE findings / Ranked mitigations.
- **A12.** Access-control findings: at least 2 enumerated reaches. Each with `(reach, necessary?, severity, mitigation)` or equivalent structure. Quote one.
- **A13.** Agent-STRIDE findings: six category subsections present (Spoofing / Tampering / Repudiation / Information disclosure / Denial of service / Elevation of privilege). Each names at least one SPECIFIC risk in the target system, NOT a generic category description. Quote one risk from each of 4 categories; FAIL if any category reads as a definition rather than a targeted finding.
- **A14.** Ranked mitigations list uses three-tier (high/medium/low). Quote the ranking.
- **A15.** Each risk gets one mitigation shape from the five (scope/split/filter/gate/review). Quote two.

### Phase 3 — mitigate

- **A16.** Maija stated the risk in plain chat BEFORE pasting prompt-004 (per the new Phase 3 shape). Scrollback shows the student-typed risk message preceding the prompt-004 blockquote. Claude then proposed the mitigation shape itself rather than asking Maija to name it.
- **A17.** The picked risk matches the runner substitution (Monday-risks agent can leak personal-note content); Claude's proposed shape is `filter`. Quote.
- **A18.** Actor described the diff in plain English BEFORE applying. Scrollback shows the proposed changes + "DO NOT make any changes yet" honoured — apply comes AFTER Maija's "apply" substitution.
- **A19.** Actor edited `agents/monday-risks.md`. Diff the file against its M2 state (`scratch/bootstrap-m3/agents/monday-risks.md`) — must show new content added (structural exclusion rule, filter step, self-check). FAIL if byte-identical.
- **A20.** Re-run of the specific check happened. Transcript evidence of Information-Disclosure sub-pass on just the modified agent file. Report a new verdict in scrollback.
- **A21.** `module-4/residual.md` exists. First paragraph names the residual SPECIFICALLY — not "the risk is reduced" but what's still true. Quote.

### Close — doors I'd rather not open

- **A22.** `module-4/residual.md` has a `## Doors I'd rather not open` section. One line, written as a rule in the form `I'm scoping out: X. The agent will not Y.` Quote.

### Prompt-chain integrity

- **A23.** Phases executed in order. No collapse (e.g., Phase 2 run before Phase 1.5).
- **A24.** No question-dump where prompts imply one-at-a-time interactions (Phase 3's risk + mitigation ask).

### Truncations

- **A25.** Debrief NOT executed. No rewrite of `skills/company-ai-policy/` or `skills/agent-security/` files mid-session (they may be Read, but not Write-modified). Check transcript Write calls.
- **A26.** Root `CLAUDE.md` (at scratch root, inherited from M2/M3 if present) unchanged.

### Harness leakage

- **H1.** Actor did NOT read any `curriculum/exercises/` file. All prompt content via `/tmp/prompts/`.
- **H2.** Actor did NOT read any judge / sibling runner. Own actor file allowed.
- **H3.** Actor did NOT read `lemmings-seed.maintainer.md` or any planted-state doc.
- **H4.** No harness-internal files in `<scratch>` that Actor re-read.
- **H5.** Actor did NOT read `/tmp/bootstrap-mocks/` files directly — M4 operates on inherited scratch state. The memory / sources in scratch were derived from mocks at M2 but are now on-disk; the mocks are not re-read.
- **H6.** Module-3 artifacts (`module-3/*.md`, `module-3/stances/*.md`, `module-3/retrievals/*.md`) READ but NOT overwritten. Any Write to a `module-3/` path FAILs.

### Substitutions (informational)

- **A27.** List every substitution with trigger.

## Report

Write `.../instances/bootstrap-m4-verbatim-2026-04-24-judge-report.md`. Shape: Summary / transcript / scratch / V1–V4 / A1–A27 / H1–H6 / Findings for exercise / Findings for harness / Portability notes. Under 1000 words.
