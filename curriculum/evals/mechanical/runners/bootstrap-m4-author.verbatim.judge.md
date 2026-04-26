# Judge — Bootstrap M4 author-security-plugin verbatim

Grading an Actor that ran Bootstrap M4 Exercise 1 (author-security-plugin) on a scratch inherited from M3 (memory + agents + module-3 outputs) plus `module-4/policies/` planted from scaffolds. Inputs: final scratch state, Actor's transcript, scrollback, four extracted prompt files, the plugin the Actor authored, the verify output.

## Inputs

- **Scratch:** `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/bootstrap-m4`
- **Actor transcript:** `<ACTOR_TRANSCRIPT_PATH>` (orchestrator passes; if Actor wrote it into the report, prefer that)
- **Actor report:** `.../instances/bootstrap-m4-author-actor-report.md`
- **Actor scrollback:** `.../instances/bootstrap-m4-author-actor-scrollback.md`
- **Prompt files:** `/tmp/prompts/author-security-plugin/prompt-{001,002,003-cli,004-verify}.txt`
- **Authored plugin:** `<scratch>/security-audit-plugin/`
- **Installed plugin (sandboxed):** `<scratch>/plugin-install/.claude/plugins/security-audit/`

## Tooling

- `curriculum/evals/mechanical/bin/verbatim-check.sh <prompt> <scrollback>` for V-assertions.
- `grep -i` / `grep -F` against the authored SKILL.md files for forcing-function checks.

## Assertions

### Verbatim round-trip

- **V1.** prompt-001 passes `verbatim-check.sh` against actor scrollback.
- **V2.** prompt-002 passes.
- **V3.** prompt-003-cli passes.
- **V4.** prompt-004-verify passes.

### Arrange — inherited state

- **A1.** Inherited M3 paths exist in scratch: `memory/index.md`, `agents/monday-risks.md`, `sources/` (≥3 files), `module-3/answer.md`. Quote `ls` evidence.
- **A2.** `module-4/policies/` contains all four files: `ai-use-baseline.md`, `sector-rules-placeholder.md`, `gdpr-essentials.md`, `data-classification.md`.
- **A3.** Substitution log present at the top of Phase 2: `[harness substitution — cowork-plugin-management skill unavailable; CLI path used; ...]`. Quote.

### Phase 1 — dictation

- **A4.** Maija's five-line dictation appears in scrollback as a blockquote BEFORE Claude reads any policy file. Transcript order: dictation lines -> first Read of `module-4/policies/*.md`.
- **A5.** Claude proposes a plugin shape AFTER reading the policy files. Scrollback shows: lens names, report-shape sketch, plugin name. Quote one paragraph.

### Phase 2 — plugin authored

- **A6.** Manifest exists at `<scratch>/security-audit-plugin/.claude-plugin/plugin.json`. Valid JSON; names the plugin and references the two skills.
- **A7.** Both SKILL.md files exist:
  - `<scratch>/security-audit-plugin/skills/policy/SKILL.md`
  - `<scratch>/security-audit-plugin/skills/agent-security/SKILL.md`
- **A8.** AGENT-SECURITY SKILL.md names ALL FOUR attack classes verbatim (case-insensitive). Each must appear:
  - `prompt injection` AND both `direct` and `indirect` modifiers somewhere near it
  - `secrets in context` AND `scrollback` somewhere in the same lens
  - `tool confusion`
  - `plugin supply-chain`

  FAIL if any one is missing. Quote the line for each.
- **A9.** AGENT-SECURITY preamble contains the word `layered` at least once. Quote.
- **A10.** AGENT-SECURITY preamble names at least two classical controls from {network, IAM, mTLS, perimeter, WAF}. Quote.
- **A11.** POLICY SKILL.md carries rule rows derived from the four policy files (12+ rules). Sample 3 rules; each must trace to a policy-file source (rule wording or section title).
- **A12.** Each lens's SKILL.md names its report shape (table column header line OR a structured "the report has these sections:" enumeration). Quote one per lens.

### Phase 3 — install + verify

- **A13.** Plugin mirrored to `<scratch>/plugin-install/.claude/plugins/security-audit/` with both SKILL.md files and the manifest reachable. Quote `ls -R` evidence.
- **A14.** Substitution log present: `~/.claude/plugins/<name>/ -> ./plugin-install/...`. Quote.
- **A15.** Verify-step output produced 2 or 3 rows in the report shape (the `| Rule | Description | Verdict | Evidence |` table). FAIL if zero rows OR if Actor expanded into the full audit (>5 rows). Quote the rows.
- **A16.** Verify scope is one file (`module-2/challenge.md`). Transcript shows Read of exactly one target file in this phase. FAIL if multiple module-2 files Read.

### Prompt-chain integrity

- **A17.** Phases executed in order: Phase 1 dictation -> Phase 1 read policies -> Phase 1 propose -> Phase 2 author -> Phase 3 install -> Phase 3 verify. No collapse.
- **A18.** No question-dump where prompts imply a wait (Phase 1's "wait for my lines" honoured by the Actor).

### Truncations

- **A19.** No Debrief executed.
- **A20.** No homework prompt executed.
- **A21.** No write to `~/.claude/` outside scratch. Grep transcript for `Write`/`Bash` calls touching `$HOME/.claude/`. FAIL if any.

### State protection

- **A22.** `module-3/` artifacts unchanged. Diff against `scratch/bootstrap-m3/module-3/`. FAIL if any byte differs.
- **A23.** `module-4/policies/` files unchanged from scaffold copy. FAIL if any byte differs.

### Harness leakage

- **H1.** Actor did NOT read any `curriculum/exercises/` file.
- **H2.** Actor did NOT read any judge / sibling runner.
- **H3.** Actor did NOT read maintainer docs or planted-state docs.
- **H4.** Actor did NOT read `/tmp/bootstrap-mocks/`.

### Substitutions (informational)

- **A24.** List every substitution with trigger.

## Report

Write `.../instances/bootstrap-m4-author-judge-report.md`. Shape: Summary verdict (PASS/FAIL with assertion count) / V1–V4 / A1–A24 / H1–H4 / Findings for exercise (gaps in author-security-plugin.md the run surfaced) / Findings for harness (substitutions worth promoting to the table) / Portability notes. Under 1200 words.

If A8 fails (any attack class missing), call that out as the headline finding — that is the exercise's primary forcing function.
