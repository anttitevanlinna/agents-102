# Judge — Bootstrap M4 run-and-package-security-check verbatim

Grading an Actor that ran Bootstrap M4 Exercise 1 (author-security-plugin) on a scratch inherited from M3 (memory + agents + module-3 outputs) plus `module-4/policies/` planted from scaffolds. Inputs: final scratch state, Actor's transcript, scrollback, five extracted prompt files, the raw policy report, the reusable check the Actor authored, the installed CLI skills, and the verify output.

## Inputs

- **Scratch:** `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/bootstrap-m4`
- **Actor transcript:** `<ACTOR_TRANSCRIPT_PATH>` (orchestrator passes; if Actor wrote it into the report, prefer that)
- **Actor report:** `.../instances/bootstrap-m4-author-actor-report.md`
- **Actor scrollback:** `.../instances/bootstrap-m4-author-actor-scrollback.md`
- **Prompt files:** `/tmp/prompts/author-security-plugin/prompt-{001,002,003,004-cli,005-verify}.txt`
- **Raw report:** `<scratch>/outputs/policy-report-raw.md`
- **Authored source plugin:** `<scratch>/module-4/plugins/security-audit/`
- **Installed CLI skills:** `<scratch>/skill-install/.claude/skills/security-audit-{policy,agent-security}/`

## Tooling

- `curriculum/evals/mechanical/bin/verbatim-check.sh <prompt> <scrollback>` for V-assertions.
- `grep -i` / `grep -F` against the authored SKILL.md files and reports for forcing-function checks.

## Assertions

### Verbatim round-trip

- **V1.** prompt-001 passes `verbatim-check.sh` against actor scrollback.
- **V2.** prompt-002 passes.
- **V3.** prompt-003 passes.
- **V4.** prompt-004-cli passes.
- **V5.** prompt-005-verify passes.

### Arrange — inherited state

- **A1.** Inherited M3 paths exist in scratch: `memory/index.md`, `agents/monday-risks.md`, `sources/` (>=3 files), `module-3/answer.md`. Quote `ls` evidence.
- **A2.** `module-4/policies/` contains policy reference `.md` files copied from the scaffold. For the baseline scaffold, expect at least `ai-use-baseline.md`, `sector-rules-placeholder.md`, `gdpr-essentials.md`, and `data-classification.md`; customer-specific variants may differ.
- **A3.** `skill-install/.claude/skills/` exists as the sandboxed CLI skill install root. Quote.

### Phase 1 — raw policy run

- **A4.** Actor reads every file under `module-4/policies/` before writing any reusable-check files. Transcript or scrollback order: prompt-001 -> policy-file reads -> `outputs/policy-report-raw.md`.
- **A5.** `outputs/policy-report-raw.md` exists. Table shape: `| Rule | Description | Verdict | Evidence |`. Quote header row.
- **A6.** Raw report has at least 12 rule rows for the baseline scaffold. FAIL if under 8.
- **A7.** Raw report includes the plain verdict `I can't tell` or `"I can't tell"` at least once.
- **A8.** No `module-4/plugins/security-audit/`, `security-audit-plugin/`, or `skill-install/.claude/skills/security-audit-*` files are written before the raw report lands. Transcript order evidence.

### Phase 2 — dictation and package proposal

- **A9.** Maija's five-line dictation appears in scrollback as a blockquote AFTER the raw report and BEFORE the package proposal.
- **A10.** Prompt-002's wait is honoured: Actor asks for the 3-5 lines before reading or writing package files for that phase.
- **A11.** Claude proposes a reusable package shape AFTER reading `outputs/policy-report-raw.md` and policy files. Scrollback shows runtime split, lens names, report-shape sketch, and package name. Quote one paragraph.

### Phase 3 — reusable check authored

- **A12.** Source manifest exists at `<scratch>/module-4/plugins/security-audit/.claude-plugin/plugin.json`. Valid JSON; names the plugin and references the two skills.
- **A13.** Both source SKILL.md files exist:
  - `<scratch>/module-4/plugins/security-audit/skills/policy/SKILL.md`
  - `<scratch>/module-4/plugins/security-audit/skills/agent-security/SKILL.md`
- **A14.** AGENT-SECURITY SKILL.md names ALL FOUR attack classes verbatim (case-insensitive). Each must appear:
  - `prompt injection` AND both `direct` and `indirect` modifiers somewhere near it
  - `secrets in context` AND `scrollback` somewhere in the same lens
  - `tool confusion`
  - `plugin supply-chain`

  FAIL if any one is missing. Quote the line for each.
- **A15.** AGENT-SECURITY preamble contains the word `layered` at least once. Quote.
- **A16.** AGENT-SECURITY preamble names at least two classical controls from {network, IAM, mTLS, perimeter, WAF}. Quote.
- **A17.** POLICY SKILL.md carries rule rows derived from the files under `module-4/policies/` and Maija's lines (12+ rules for the baseline scaffold). Sample 3 rules; each must trace to a policy-file source, raw-report row, or Maija line.
- **A18.** Each lens's SKILL.md names its report shape (table column header line OR a structured "the report has these sections:" enumeration). Quote one per lens.
- **A19.** Substitution log present at Phase 3: `[harness substitution - cowork/desktop plugin install unavailable; source plugin authored inline; CLI standalone skills installed into sandbox]`. Quote.

### Phase 4 — install + verify

- **A20.** CLI skills installed to sandbox:
  - `<scratch>/skill-install/.claude/skills/security-audit-policy/SKILL.md`
  - `<scratch>/skill-install/.claude/skills/security-audit-agent-security/SKILL.md`
  Quote `ls` evidence.
- **A21.** Source plugin remains under `<scratch>/module-4/plugins/security-audit/` after CLI extraction. Quote.
- **A22.** Substitution log present: `~/.claude/skills/<name>/ -> ./skill-install/.claude/skills/<name>/`. Quote.
- **A23.** Verify-step output produced 2 or 3 rows in the report shape (the `| Rule | Description | Verdict | Evidence |` table). FAIL if zero rows OR if Actor expanded into the full audit (>5 rows). Quote the rows.
- **A24.** Verify scope is one file (`./challenge.md`). Transcript shows Read of exactly one target file in this phase. FAIL if multiple target files read.

### Prompt-chain integrity

- **A25.** Phases executed in order: raw policy run -> dictation -> proposal -> author reusable check -> install CLI skills -> verify. No collapse.
- **A26.** No question-dump where prompts imply a wait (Phase 2's "ask me for 3-5 lines" honoured by the Actor).

### Truncations

- **A27.** No Debrief executed.
- **A28.** No homework prompt executed.
- **A29.** No write to `~/.claude/` outside scratch. Grep transcript for `Write`/`Bash` calls touching `$HOME/.claude/`. FAIL if any.

### State protection

- **A30.** `module-3/` artifacts unchanged. Diff against `scratch/bootstrap-m3/module-3/`. FAIL if any byte differs.
- **A31.** `module-4/policies/` files unchanged from scaffold copy. FAIL if any byte differs.

### Harness leakage

- **H1.** Actor did NOT read any `curriculum/exercises/` file.
- **H2.** Actor did NOT read any judge / sibling runner.
- **H3.** Actor did NOT read maintainer docs or planted-state docs.
- **H4.** Actor did NOT read `/tmp/bootstrap-mocks/`.

### Substitutions (informational)

- **A32.** List every substitution with trigger.

## Report

Write `.../instances/bootstrap-m4-author-judge-report.md`. Shape: Summary verdict (PASS/FAIL with assertion count) / V1-V5 / A1-A32 / H1-H4 / Findings for exercise (gaps in author-security-plugin.md the run surfaced) / Findings for harness (substitutions worth promoting to the table) / Portability notes. Under 1300 words.

If A14 fails (any attack class missing), call that out as the headline finding. If A4-A8 fail, call out the raw-run ordering as the headline finding instead.
