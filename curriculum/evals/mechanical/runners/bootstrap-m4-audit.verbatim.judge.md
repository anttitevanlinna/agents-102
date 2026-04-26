# Judge — Bootstrap M4 audit-your-agent verbatim

Grading an Actor that ran Bootstrap M4 Exercise 2 (audit-your-agent) on a scratch where the security plugin authored in Exercise 1 is on disk. Inputs: final scratch state, Actor transcript + scrollback, four extracted prompt files, the plugin SKILL.md files, the two reports + residual.

## Inputs

- **Scratch:** `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/bootstrap-m4`
- **Actor transcript:** `<ACTOR_TRANSCRIPT_PATH>`
- **Actor report:** `.../instances/bootstrap-m4-audit-actor-report.md`
- **Actor scrollback:** `.../instances/bootstrap-m4-audit-actor-scrollback.md`
- **Prompt files:** `/tmp/prompts/audit-your-agent/prompt-00{1,2,3,4}.txt`
- **Plugin:** `<scratch>/plugin-install/.claude/plugins/security-audit/`
- **Outputs:** `<scratch>/module-4/{policy-report,security-report,residual}.md`, edited `<scratch>/agents/monday-risks.md`

## Tooling

- `curriculum/evals/mechanical/bin/verbatim-check.sh` for V-assertions.
- `grep -i` / `grep -F` against the reports for forcing-function checks.

## Assertions

### Verbatim round-trip

- **V1–V4.** Each of `prompt-001..004.txt` passes `verbatim-check.sh` against actor scrollback.

### Phase 1 — policy audit

- **A1.** Actor Read each rule source from the policy lens before writing the report (Read of `plugin-install/.claude/plugins/security-audit/skills/policy/SKILL.md`). Transcript evidence.
- **A2.** `module-4/policy-report.md` exists. Table shape: `| Rule | Description | Verdict | Evidence |`. Quote header row.
- **A3.** ≥12 rule rows. FAIL if under 8.
- **A4.** Verdicts include all three values (`compliant`, `violating`, and the plain phrase `"I can't tell"` or `I can't tell` — both forms accepted). FAIL if zero `I can't tell` rows.
- **A5.** Evidence column is non-generic — sample 5 rows; ≥4 must quote a specific file path or name what evidence would decide.
- **A6.** Substitution log present at top of phase: `[harness substitution — plugin lens ... invoked by reading plugin-install/.claude/plugins/security-audit/skills/...]`. Quote.

### Phase 1.5 — meta-analysis

- **A7.** Actor Read `module-4/policy-report.md` between writing it and producing the meta-analysis.
- **A8.** Three lists delivered: 3 surprises / 3 likely-violations-hiding-as-"I can't tell" / 1 surface-compliant-deserves-pushback. Quote one item per list.
- **A9.** Each item quotes a specific rule name from the report.

### Phase 2 — agent-security audit

- **A10.** Actor Read `plugin-install/.claude/plugins/security-audit/skills/agent-security/SKILL.md` before writing the security report.
- **A11.** `module-4/security-report.md` exists. Sections present: access-control findings, named-attack-class findings (one subsection per class), ranked mitigations.
- **A12.** Access-control findings: ≥2 enumerated reaches, each with necessary?+severity. Quote one.
- **A13.** **Named-attack-class subsections — all four classes covered by name:**
  - `prompt injection` with both `direct` and `indirect` (one or two subsections, both modifiers must appear)
  - `secrets in context` (and `scrollback` somewhere in this subsection)
  - `tool confusion`
  - `plugin supply-chain`

  For each: at least one specific risk naming a file or behaviour (not generic class description). Quote one risk per class. FAIL if any class is missing OR if any subsection reads as a definition rather than a targeted finding.
- **A14.** Ranked mitigations list uses three-tier (`high`/`medium`/`low`). Quote.
- **A15.** Mitigation shapes — all five names {`scope`, `split`, `filter`, `gate`, `review`} appear verbatim somewhere in the mitigation list. (Not all per risk; all in the list across risks.)
- **A16.** Classical-controls floor named at least once in the security report from {perimeter, IAM, mTLS, network, WAF}. Quote. The floor is named as a layer-on, not a replacement.

### Phase 3 — mitigate

- **A17.** Maija stated the risk in plain chat BEFORE pasting prompt-004. Scrollback shows the substituted risk message preceding the prompt-004 blockquote. Claude then proposed the mitigation shape itself rather than asking Maija to name it.
- **A18.** Picked risk matches the runner substitution (Monday-risks agent paraphrasing personal-note content); Claude's proposed shape is `filter`. Quote.
- **A19.** Actor described the diff in plain English BEFORE applying. Honoured "DO NOT make any changes yet" — Write/Edit on `agents/monday-risks.md` happens AFTER the `apply` substitution, not before.
- **A20.** Actor edited `agents/monday-risks.md`. Diff against `scratch/bootstrap-m3/agents/monday-risks.md` shows new content (structural exclusion rule, filter step, self-check). FAIL if byte-identical.
- **A21.** Re-run of the specific check happened (named-attack-class re-pass on the modified file). Transcript evidence; new verdict reported in scrollback.
- **A22.** `module-4/residual.md` exists. First paragraph names the residual SPECIFICALLY — not "the risk is reduced" boilerplate. Quote.

### Close

- **A23.** `module-4/residual.md` has a `## Doors I would rather not open` section (or `## Doors I'd rather not open` — both accepted). One line in the form `I am scoping out: X. The agent will not Y.` Quote.

### Prompt-chain integrity

- **A24.** Phases executed in order. No collapse.
- **A25.** No question-dump where prompts imply one-at-a-time interactions.

### Truncations

- **A26.** Debrief NOT executed. No Write to any path under `plugin-install/.claude/plugins/security-audit/` mid-audit (Reads allowed).
- **A27.** No Write to `module-3/` paths.

### State protection

- **A28.** Plugin files (`security-audit-plugin/` and `plugin-install/.claude/plugins/security-audit/`) byte-unchanged from end of author runner. Diff. FAIL if any byte differs.

### Harness leakage

- **H1.** Actor did NOT read any `curriculum/exercises/` file.
- **H2.** Actor did NOT read any judge / sibling runner.
- **H3.** Actor did NOT read maintainer docs / planted-state docs.
- **H4.** Actor did NOT read `/tmp/bootstrap-mocks/`.

### Substitutions (informational)

- **A29.** List every substitution with trigger.

## Report

Write `.../instances/bootstrap-m4-audit-judge-report.md`. Shape: Summary verdict (PASS/FAIL with assertion count) / V1–V4 / A1–A29 / H1–H4 / Findings for exercise (gaps in audit-your-agent.md the run surfaced) / Findings for harness / Portability notes. Under 1300 words.

If A13 fails (any attack class missing or collapsed into generic STRIDE), call that the headline finding — that is the named-attack-class forcing function the reshape was designed to enforce.
