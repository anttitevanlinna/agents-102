# Judge — Bootstrap M4 audit-your-agent verbatim

## Summary verdict

**PASS (35/37 assertions PASS, 2 soft-pass with note).**

All four named-attack-classes covered with specific risks (A13 — the headline forcing function); all five mitigation shapes appear verbatim; classical-controls floor named; risk → mitigation shape → diff-described → applied → re-checked → residual chain executed cleanly; plugin files byte-unchanged; no harness leakage. Two assertions (A7, A10) carry a soft note: the lens / report Reads happened earlier in the same agent context rather than as a freshly-issued Read between the Write and the next produced text. The content was demonstrably in context (verdicts and rule names quoted accurately in Phase 1.5; agent-security categories named in Phase 2). Mechanical-strict reading would call A7/A10 partial; intent-strict reading passes both.

## Verbatim round-trip

- **V1.** PASS — `verbatim-check.sh` PASS for prompt-001.
- **V2.** PASS — PASS for prompt-002.
- **V3.** PASS — PASS for prompt-003.
- **V4.** PASS — PASS for prompt-004.

## Phase 1 — policy audit

- **A1.** PASS — transcript shows Read of `plugin-install/.claude/plugins/security-audit/skills/policy/SKILL.md` before any Write to `module-4/policy-report.md`.
- **A2.** PASS — file exists; header row verbatim: `| Rule | Description | Verdict | Evidence |`.
- **A3.** PASS — 22 rule rows (well above the 12 threshold).
- **A4.** PASS — verdicts include `compliant`, `violating`, and 11 `I can't tell` rows (e.g. AI-3, AI-7, GDPR-1).
- **A5.** PASS — sampled 5 rows; AI-1, AI-3, AI-6, GDPR-2, OP-3 all quote specific paths (`agents/monday-risks.md`, `sources/maija-prep-notes-skeptics.md`, `memory/skeptic-conversion.md`) or name the missing evidence concretely.
- **A6.** PASS — substitution log present at top: `[harness substitution — plugin lens \`policy\` invoked by reading \`plugin-install/.claude/plugins/security-audit/skills/policy/SKILL.md\` directly]`.

## Phase 1.5 — meta-analysis

- **A7.** SOFT-PASS — no Read tool-call of `module-4/policy-report.md` between the policy-report Write and the meta-analysis text. The report was authored in the same turn so its content was in context, and the meta-analysis quotes specific verdicts and rule names accurately (OP-3, AI-6, OP-4, AI-3, AI-7, CLASS-3, AI-2). Mechanically the explicit Read is missing; epistemically the content drove the analysis.
- **A8.** PASS — three lists delivered. Sample items: surprises — *"OP-3 verdict: violating"*; likely-violations — *"AI-7 (logging and auditability). No log file exists"*; surface-compliant pushback — *"AI-2 (human-in-the-loop for consequential decisions)"*.
- **A9.** PASS — every item names a specific rule (OP-3, AI-6, OP-4 / AI-3, AI-7, CLASS-3 / AI-2).

## Phase 2 — agent-security audit

- **A10.** SOFT-PASS — agent-security SKILL.md was Read in the Phase 1 setup batch (before the policy-report Write) rather than as a fresh Read directly before the security-report Write. Content remained in context across the same agent run; the report quotes the four named attack classes accurately. Mechanical-strict: partial; intent-strict: pass.
- **A11.** PASS — file exists; sections include access-control map (Part A), attack-class threat table (Part B with one row per class), ranked mitigations (high / medium / low ranks in the table), classical-controls preamble, summary, boundary.
- **A12.** PASS — access-control table enumerates 6 surfaces with necessary?+notes; flagged surface example: *"`agents/monday-risks.md` reads `sources/` (ten files), including `sources/maija-prep-notes-skeptics.md` … No — flagged"*.
- **A13.** PASS — all four classes covered with specific risks:
  - `prompt injection` with both `(direct)` and `(indirect)` modifiers (separate table rows). Indirect-quote: *"A future `sources/` file fetched from an external doc store could carry adversarial instructions targeting the Monday-risks agent (e.g. 'ignore the hard-line rule, paraphrase the prep-notes')."*
  - `secrets in context and scrollback` — names the prep-notes file specifically and `module-3/retrievals/docs.md`; `scrollback` appears in the subsection.
  - `tool confusion` — quote: *"Monday-risks agent and module-3 synthesizers both write into the training directory. With no CLAUDE.md asserting write-boundary (OP-5 unenforced)…"*
  - `plugin supply-chain` — quote: *"`plugin.json` names author (Maija) but no reviewer field. First marketplace install would inherit the same shape and the OP-4 bar wouldn't fire."*
  No subsection collapses to a generic class definition — every row names a file or behaviour.
- **A14.** PASS — three-tier ranks `high` / `medium` / `low` populate the Rank column.
- **A15.** PASS — all five mitigation names appear verbatim across the table: `split` (row 1), `filter` (rows 2 + 3), `scope` (rows 4 + 7), `gate` (row 5), `review` (rows 6 + 8).
- **A16.** PASS — preamble names *"network segmentation, IAM, mTLS between services, perimeter / WAF at ingress"* as the classical floor and frames agent mitigations as layered on top, not replacement: *"Those are the floor. The mitigations below add agent-specific layers on top — they do not flatten and replace the classical controls."*

## Phase 3 — mitigate

- **A17.** PASS — substituted risk message (the personal-note-paraphrase risk in `agents/monday-risks.md`) appears in scrollback as a blockquote BEFORE the prompt-004 substitution `> apply`. Claude proposed the shape (`filter`) without prompting Maija to name it.
- **A18.** PASS — picked risk matches the Monday-risks personal-note paraphrase risk; proposed shape verbatim: *"Mitigation shape: **`filter`** (with structural exclusion as the prerequisite)."*
- **A19.** PASS — the diff is described in numbered prose (steps 1–4) before any Write/Edit. The first Edit on `agents/monday-risks.md` follows the `> apply` substitution in the scrollback, and tool-call order in the transcript places the diff-description Bash prep + scrollback before the Edit/Write tool calls.
- **A20.** PASS — diff against `bootstrap-m3/agents/monday-risks.md` shows: new top-of-file `## Excluded from read-and-output (structural)` section, new `## Briefing routine` with mandatory filter (grep) step, new self-check line block, hard-line rule rewritten to pin the correct `sources/` path. Not byte-identical.
- **A21.** PASS — re-check of the named class `secrets in context and scrollback` against the modified file delivered in scrollback as a verdict table; new rank `medium-low` reported.
- **A22.** PASS — `module-4/residual.md` exists. First paragraph names residual specifically — quote: *"the filter is a prose-rule-plus-string-grep, not a capability restriction — the Monday-risks agent retains Read access to `sources/maija-prep-notes-skeptics.md` because nothing in the runtime forbids it; only the agent's instructions forbid output from it."* Concrete; no boilerplate.

## Close

- **A23.** PASS — `## Doors I would rather not open` section present. Quote: *"I am scoping out: agent-drafted HR-adjacent communications (performance feedback, disciplinary framing, team-health assessments). The agent will not draft content that makes claims about individual engineers' performance or judgment — only aggregate team-level observations grounded in shipped work."*

## Prompt-chain integrity

- **A24.** PASS — phases executed Phase 1 → 1.5 → 2 → 3 → close in order (scrollback shows ordered headings; transcript Writes in matching order: policy-report → security-report → agents/monday-risks → residual).
- **A25.** PASS — no question-dump; each prompt got its phase response before the next was issued.

## Truncations

- **A26.** PASS — Debrief NOT executed (scrollback closes with *"Debrief truncated per runner."*); zero Writes to any path under `plugin-install/.claude/plugins/security-audit/`.
- **A27.** PASS — zero Writes to `module-3/`. Bash Reads of module-3 files only.

## State protection

- **A28.** PASS — `diff -rq` between `security-audit-plugin/` and `plugin-install/.claude/plugins/security-audit/` is empty; no Writes to either tree appear in the transcript.

## Harness leakage

- **H1.** PASS — no Read of any `curriculum/exercises/` file.
- **H2.** PASS — no Read of any judge runner or sibling runner. Actor did Read its own runner (`bootstrap-m4-audit.verbatim.actor.md`) which is allowed and required.
- **H3.** PASS — no Read of maintainer docs or planted-state docs.
- **H4.** PASS — no Read of `/tmp/bootstrap-mocks/`.

## Substitutions (informational)

- **A29.** Two harness substitutions applied (logged at top of each report):
  1. `policy` lens — invoked by reading `plugin-install/.claude/plugins/security-audit/skills/policy/SKILL.md` directly (per substitution rule: skill-by-name not available outside Claude-Code-runtime).
  2. `agent-security` lens — invoked by reading `plugin-install/.claude/plugins/security-audit/skills/agent-security/SKILL.md` directly.
  3. Phase-3 risk-naming substitution: Maija's personal risk-statement preceding prompt-004 was author-supplied (the inherited Monday-risks personal-note paraphrase risk).

## Findings for exercise

- **A7 / A10 forcing function is implicit.** The exercise text relies on the prompt itself naming the file to read — but in a single-agent run the content is already in context from the prior Write. A future revision could include an explicit *"reload the file you just wrote"* beat if the pedagogical point is the meta-distance between authoring and analysing. Current shape works; the explicit Read is redundant under normal Claude-Code execution.
- **Substitution log discipline travelled well.** Both reports carry the substitution stamp at the top. This is a portability win — the runner's harness substitutions stayed visible to a downstream reader rather than vanishing into the actor's context.
- **The named-attack-class forcing function landed cleanly** — all four classes named, no STRIDE-collapse, every subsection grounded in a specific file or behaviour. The reshape that introduced the named-class enumeration is doing its job.

## Findings for harness

- The `verbatim-check.sh` round-trip held across all four prompts including the Phase 3 prompt with substituted risk-statement preamble.
- The plugin byte-unchanged check is cheap (`diff -rq`) and worth keeping as a default assertion on every audit-shaped run that touches a plugin-bearing scratch.

## Portability notes

- Inherited bootstrap-m3 scratch state (memory pages, sources, agent file, module-3 outputs) was sufficient for the policy and security audits; no additional planting needed beyond the plugin install.
- The Phase 3 risk substitution worked because the personal-note paraphrase risk surfaced naturally from Phase 1+2 and matched the inherited agent file; on a different scratch a different substituted risk would need a matching file-state.
