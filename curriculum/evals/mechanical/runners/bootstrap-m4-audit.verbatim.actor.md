# Actor — Bootstrap M4 audit-your-agent verbatim

You are simulating a Claude Code session Maija is running. Module 2 + Module 3 state on disk; the security plugin she authored in Exercise 1 (`author-security-plugin`) is in `<scratch>/plugin-install/.claude/plugins/security-audit/`. You have Bash / Read / Write / Edit.

**Critical protocol:** four prompts pasted verbatim from audit-your-agent at `/tmp/prompts/audit-your-agent/prompt-00{1,2,3,4}.txt`. Read, quote in blockquote, respond.

## Arrange — verify state inherited from author runner

Working directory: `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/bootstrap-m4`.

`cd` there. Confirm via `ls`:

- `memory/`, `sources/`, `agents/monday-risks.md`, `module-3/{question,answer,wonder}.md`, `module-3/{retrievals,stances}/` (inherited from M3)
- `module-4/policies/` (planted by author runner)
- `plugin-install/.claude/plugins/security-audit/{.claude-plugin/plugin.json,skills/policy/SKILL.md,skills/agent-security/SKILL.md}` (authored by author runner)
- `module-4/` exists; `policy-report.md` / `security-report.md` / `residual.md` do NOT exist yet

If any of those is missing, write "ERROR — author runner did not run or did not complete" to the report and STOP.

## Plugin invocation substitution

Real Claude Code auto-discovers plugins from `~/.claude/plugins/` at session start. In your subagent environment plugins are not auto-loaded. Substitute: when a prompt says "Apply the X lens of the security plugin," Read the lens's SKILL.md from `plugin-install/.claude/plugins/security-audit/skills/<lens>/SKILL.md` plus any sibling reference files, then execute the lens's instructions against the target system.

Log at the top of each phase: `[harness substitution — plugin lens X invoked by reading plugin-install/.claude/plugins/security-audit/skills/X/ directly]`.

## Prompts to execute in order

### Phase 1 — Policy audit

**Prompt 1:** `/tmp/prompts/audit-your-agent/prompt-001.txt`. Quote in blockquote, respond.

Apply the policy lens. Read every rule the lens carries. Walk the target system: `memory/`, `sources/`, `agents/`, root `CLAUDE.md` (if present — likely absent on the inherited scratch; note that), `module-3/retrievals/`, `module-3/stances/`. Produce `module-4/policy-report.md` as a markdown table:

```
| Rule | Description | Verdict | Evidence |
```

One row per rule. Verdicts: `compliant`, `violating`, `"I can't tell"` (the literal string with quotes, or the plain phrase — the discipline is that "I can't tell" is a real answer). Evidence column quotes specific files or names what evidence would be needed. Target ≥12 rule rows; ideally matches the lens's actual rule count.

### Phase 1.5 — Ask Claude what is in the report

**Prompt 2:** `/tmp/prompts/audit-your-agent/prompt-002.txt`. Quote, respond.

Read `module-4/policy-report.md`. Produce: (1) top three surprises, (2) three "I can't tell" rows most likely hiding a real violation, (3) one row that looks compliant but deserves push-back. Quote rule names. Each item one or two sentences.

### Phase 2 — Agent-security audit

**Prompt 3:** `/tmp/prompts/audit-your-agent/prompt-003.txt`. Quote, respond.

Apply the agent-security lens. Read `plugin-install/.claude/plugins/security-audit/skills/agent-security/SKILL.md` plus any sibling reference files. Produce `module-4/security-report.md` with:

- **Access-control findings** — every external system the agent can reach (connectors, retrievals, file writes beyond the training directory, anything in `tools/` if it exists). For each: necessary? severity if not. Flag unused access.
- **Named-attack-class findings** — one subsection per class: `prompt injection (direct)`, `prompt injection (indirect)`, `secrets in context and scrollback`, `tool confusion`, `plugin supply-chain`. Each subsection names ONE OR TWO specific risks in this system, quoting the file or behaviour that creates the risk. NOT generic class descriptions.
- **Ranked mitigations** — three-tier (high / medium / low). Each risk gets ONE mitigation shape from the five named: `scope`, `split`, `filter`, `gate`, `review`. Each shape name appears verbatim in the report at least once across the mitigation list.
- **Classical-controls floor** — at least one sentence in the security-report names classical controls (perimeter, IAM, mTLS, network, WAF) as the floor on top of which agent mitigations layer. NOT flatten-and-replace.

### Phase 3 — Mitigate one risk

Maija picks a risk by feel after reading both reports. Substitute her one-sentence naming as a student-typed message BEFORE pasting prompt-004 (paste verbatim in a blockquote):

> The Monday-risks agent in `agents/monday-risks.md` can read `sources/maija-prep-notes-skeptics.md` and could paraphrase its content into the risk briefing. The hard-line rule in the agent file says not to, but it is a prose rule, not a structural one. If the agent drifts, the rule may not fire and the personal note could leak.

**Prompt 4:** `/tmp/prompts/audit-your-agent/prompt-004.txt`. Quote, respond.

Claude picks the mitigation shape (expected: `filter`) and walks the diff in plain English. Honour "DO NOT make any changes yet" — do NOT touch a file in this turn. Substitute Maija's confirmation:

> apply

NOW edit `agents/monday-risks.md` adding (a) a structural exclusion rule at the top naming the path `sources/maija-prep-notes-skeptics.md` as excluded-from-output, (b) a filter step in the briefing routine that greps the output for any phrase lifted from the personal note before finalising, (c) a self-check line in the output template. Re-run the named-attack-class check for `secrets in context and scrollback` (or whichever class the risk maps to in the lens) on JUST the modified agent file. Report the new verdict in scrollback.

Write `module-4/residual.md` with one paragraph naming the residual SPECIFICALLY — not "the risk is gone" but what is still true. (Plausible: filter is prose-rule-plus-grep, not a capability restriction; sufficiently determined paraphrase at higher levels of abstraction passes the grep. Reduced, not eliminated.)

### Close — Doors I would rather not open

Append to `module-4/residual.md`:

```
## Doors I would rather not open
```

Then one line, substituted as Maija's written decision:

> I am scoping out: agent-drafted HR-adjacent communications (performance feedback, disciplinary framing, team-health assessments). The agent will not draft content that makes claims about individual engineers' performance or judgment — only aggregate team-level observations grounded in shipped work.

## Truncations

Do NOT execute the Debrief. Do NOT touch `module-3/` artifacts (read-only). Do NOT modify `plugin-install/.claude/plugins/security-audit/` (the plugin is the expert; do not edit it mid-audit).

## Report

Write scrollback to `.../instances/bootstrap-m4-audit-actor-scrollback.md`.

Short report at `.../instances/bootstrap-m4-audit-actor-report.md`:

```markdown
# Actor report — Bootstrap M4 audit-your-agent verbatim

## Status
<done / error>

## Scratch
.../scratch/bootstrap-m4

## Transcript
<absolute path to this subagent's .jsonl; best-effort>

## Prompts executed
1. Phase 1 prompt-001 (policy audit)
2. Phase 1.5 prompt-002 (what is in the report)
3. Phase 2 prompt-003 (agent-security + named attack classes)
4. Phase 3 prompt-004 (mitigate + residual)

## Artifacts written
- module-4/policy-report.md: <row count>
- module-4/security-report.md: <rough structure>
- module-4/residual.md: <line count>
- agents/monday-risks.md: edited (mitigation applied)

## Risk picked + mitigation
- Risk: personal-note paraphrase via Monday-risks agent
- Shape: <filter expected>
- Residual: <one line>

## Substitutions
- Plugin invocation -> direct Read of plugin-install/.claude/plugins/security-audit/skills/...
- Risk pick + mitigation confirmation + door-to-close: substituted per runner
- Debrief truncated
```

Under 350 words. Do not grade yourself.

## What you must NOT do

- Read `curriculum/exercises/*`, judge runners, sibling actor runners, maintainer docs.
- Read `/tmp/bootstrap-mocks/`.
- Paraphrase prompts.
- Modify `plugin-install/.claude/plugins/security-audit/` files.
- Overwrite `module-3/` artifacts.
- Skip the plain "I can't tell" discipline.
- Collapse named attack classes back into generic STRIDE categories.
