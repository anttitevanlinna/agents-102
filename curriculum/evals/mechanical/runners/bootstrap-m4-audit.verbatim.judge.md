# Judge — Bootstrap M4 audit-your-agent verbatim

Grading an Actor that ran Bootstrap M4 Exercise 2 (audit-your-agent) on a scratch where the reusable security check authored in Exercise 1 is on disk, installed as sandboxed CLI skills, and the raw policy report exists. Inputs: final scratch state, Actor transcript + scrollback, four extracted prompt files, the skill files, the two packaged reports, and `guardrails.md`.

## Inputs

- **Scratch:** `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/bootstrap-m4`
- **Actor transcript:** `<ACTOR_TRANSCRIPT_PATH>`
- **Actor report:** `.../instances/bootstrap-m4-audit-actor-report.md`
- **Actor scrollback:** `.../instances/bootstrap-m4-audit-actor-scrollback.md`
- **Prompt files:** `/tmp/prompts/audit-your-agent/prompt-00{1,2,3,4}.txt`
- **Source plugin:** `<scratch>/module-4/plugins/security-audit/`
- **Installed CLI skills:** `<scratch>/skill-install/.claude/skills/security-audit-{policy,agent-security}/`
- **Outputs:** `<scratch>/outputs/{policy-report-raw,policy-report,security-report}.md`, edited `<scratch>/agents/monday-risks.md`, `<scratch>/guardrails.md`

## Tooling

- `curriculum/evals/mechanical/bin/verbatim-check.sh` for V-assertions.
- `grep -i` / `grep -F` against the reports for forcing-function checks.

## Assertions

### Verbatim round-trip

- **V1-V4.** Each of `prompt-001..004.txt` passes `verbatim-check.sh` against actor scrollback.

### Inherited state

- **A1.** Actor confirmed inherited M3 paths and reusable-check paths exist: `memory/`, `sources/`, `agents/monday-risks.md`, `module-3/answer.md`, `outputs/policy-report-raw.md`, source plugin, and both installed CLI skills. Quote.
- **A2.** `outputs/policy-report-raw.md` exists before Phase 1 starts and is not overwritten during the audit. Diff timestamp or scrollback evidence.

### Phase 1 — packaged policy audit

- **A3.** Actor Read `skill-install/.claude/skills/security-audit-policy/SKILL.md` before writing the report. Transcript evidence.
- **A4.** `outputs/policy-report.md` exists. Table shape: `| Rule | Description | Verdict | Evidence |`. Quote header row.
- **A5.** >=12 rule rows. FAIL if under 8.
- **A6.** Verdicts include all three values (`compliant`, `violating`, and the plain phrase `"I can't tell"` or `I can't tell`). FAIL if zero `I can't tell` rows.
- **A7.** Evidence column is non-generic: sample 5 rows; >=4 must quote a specific file path or name what evidence would decide.
- **A8.** Report or scrollback briefly compares packaged report to `outputs/policy-report-raw.md` (sharper, narrower, or more specific). Quote.
- **A9.** Substitution log present at top of phase: `[harness substitution - reusable lens policy invoked by reading skill-install/.claude/skills/security-audit-policy/SKILL.md directly]`. Quote.

### Phase 1.5 — meta-analysis

- **A10.** Actor Read `outputs/policy-report.md` between writing it and producing the meta-analysis.
- **A11.** Three lists delivered: 3 surprises / 3 likely-violations-hiding-as-"I can't tell" / 1 surface-compliant-deserves-pushback. Quote one item per list.
- **A12.** Each item quotes a specific rule name from the report.

### Phase 2 — agent-security audit

- **A13.** Actor Read `skill-install/.claude/skills/security-audit-agent-security/SKILL.md` before writing the security report.
- **A14.** `outputs/security-report.md` exists. Sections present: access-control findings, named-attack-class findings (one subsection per class), ranked mitigations.
- **A15.** Access-control findings: >=2 enumerated reaches, each with necessary?+severity. Quote one.
- **A16.** **Named-attack-class subsections — all four classes covered by name:**
  - `prompt injection` with both `direct` and `indirect` (one or two subsections, both modifiers must appear)
  - `secrets in context` (and `scrollback` somewhere in this subsection)
  - `tool confusion`
  - `plugin supply-chain`

  For each: at least one specific risk naming a file or behaviour (not generic class description). Quote one risk per class. FAIL if any class is missing OR if any subsection reads as a definition rather than a targeted finding.
- **A17.** Ranked mitigations list uses three-tier (`high`/`medium`/`low`). Quote.
- **A18.** Mitigation shapes — all five names {`scope`, `split`, `filter`, `gate`, `review`} appear verbatim somewhere in the mitigation list. (Not all per risk; all in the list across risks.)
- **A19.** Classical-controls floor named at least once in the security report from {perimeter, IAM, mTLS, network, WAF}. Quote. The floor is named as a layer-on, not a replacement.

### Phase 3 — mitigate

- **A20.** Maija stated the risk in plain chat BEFORE pasting prompt-004. Scrollback shows the substituted risk message preceding the prompt-004 blockquote.
- **A21.** Picked risk matches the runner substitution (Monday-risks agent paraphrasing personal-note content); Claude's mitigation shape is `filter`. Quote.
- **A22.** Actor edited `agents/monday-risks.md`. Diff against `scratch/bootstrap-m3/agents/monday-risks.md` shows new content (structural exclusion rule, filter step, self-check). FAIL if byte-identical.
- **A23.** Re-run of the specific check happened (named-attack-class re-pass on the modified file, not the whole audit). Transcript evidence; new verdict reported in scrollback.
- **A24.** `guardrails.md` exists at scratch root. A residual paragraph names the residual SPECIFICALLY, not "the risk is reduced" boilerplate. Quote.

### Close

- **A25.** `guardrails.md` has a `## Doors I would rather not open` section (or `## Doors I'd rather not open`; both accepted). One line in the form `I am scoping out: X. The agent will not Y.` Quote.

### Prompt-chain integrity

- **A26.** Phases executed in order. No collapse.
- **A27.** No question-dump where prompts imply one-at-a-time interactions.

### Truncations

- **A28.** Debrief NOT executed.
- **A29.** No Write to any path under `module-4/plugins/security-audit/` or `skill-install/.claude/skills/security-audit-*` mid-audit. Reads allowed.
- **A30.** No Write to `module-3/` paths.

### State protection

- **A31.** Reusable-check files (`module-4/plugins/security-audit/` and `skill-install/.claude/skills/security-audit-*`) byte-unchanged from end of author runner. Diff. FAIL if any byte differs.

### Harness leakage

- **H1.** Actor did NOT read any `curriculum/exercises/` file.
- **H2.** Actor did NOT read any judge / sibling runner.
- **H3.** Actor did NOT read maintainer docs / planted-state docs.
- **H4.** Actor did NOT read `/tmp/bootstrap-mocks/`.

### Substitutions (informational)

- **A32.** List every substitution with trigger.

## Report

Write `.../instances/bootstrap-m4-audit-judge-report.md`. Shape: Summary verdict (PASS/FAIL with assertion count) / V1-V4 / A1-A32 / H1-H4 / Findings for exercise (gaps in audit-your-agent.md the run surfaced) / Findings for harness / Portability notes. Under 1300 words.

If A16 fails (any attack class missing or collapsed into generic STRIDE), call that the headline finding. If A8 fails, call out the raw-vs-packaged comparison gap.
