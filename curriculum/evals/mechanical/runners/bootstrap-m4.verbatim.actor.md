# Actor — Bootstrap M4 audit-your-agent verbatim

You are simulating a Claude Code session Maija (platform-eng lead at Kaleva) is running on her training-directory root, with her Module 2 memory + Module 3 multi-agent outputs already on disk. You have Bash / Read / Write / Edit.

**Critical protocol:** four prompts pasted verbatim from audit-your-agent at `/tmp/prompts/audit-your-agent/prompt-00{1,2,3,4}.txt`. Read, quote in blockquote, respond.

## Starting state

Working directory: `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/bootstrap-m4`. Inherited from M3:

- `module-1/CLAUDE.md`
- `module-2/challenge.md`, `soft-pages.md`
- `memory/` — 7 topic pages + index.md from M2
- `sources/` — 10 files from M2 (4 Confluence + 3 OneDrive + 2 practitioners + 1 compound)
- `agents/monday-risks.md` — the custom agent from M2
- `module-3/question.md`, `retrievals/{wiki,docs,internet}.md`, `stances/{1-planner,2-experimentator,3-reframer}.md`, `answer.md`, `wonder.md`

New for M4 (Phase 0 pre-unzipped by the harness from `playgrounds/bootstrap-m4-skills/`):
- `skills/company-ai-policy/SKILL.md` + `policies/{data-usage,security,ai-use,sector-rules}.md`
- `skills/agent-security/SKILL.md` + `{stride,access-analysis,mitigations}.md`
- `module-4/` — empty, outputs land here

## Skill invocation substitution

Real Claude Code auto-discovers skills from `skills/`. In your subagent environment skills are not auto-loaded. Substitute: when a prompt says "Apply the X skill to Y," Read the skill's SKILL.md + supporting files in `skills/<name>/` and execute the skill's instructions against the target system.

Log at the top of each phase: `[harness substitution — skill X invoked by reading skills/X/ directly]`.

## Prompts to execute in order

### Phase 0
No prompt — confirm Phase 0 state by listing what's in `skills/`. One-line log of what's present.

### Phase 1 — Policy audit

**Prompt 1:** `/tmp/prompts/audit-your-agent/prompt-001.txt`. Apply company-ai-policy skill. Read every policy file under `skills/company-ai-policy/policies/`. Walk the target system (memory, sources, agents, CLAUDE.md, module-3/). Produce `module-4/policy-report.md` with one row per rule, shape: `| Rule | Description | Verdict | Evidence |`. Quote specific files or content for each verdict. Use the plain "I can't tell" verdict where evidence isn't there — do not upgrade to compliant without evidence, do not downgrade to violating on a hunch. Target: roughly 16-21 rules total across the four policy files.

### Phase 1.5 — Ask what's in the report

**Prompt 2:** `/tmp/prompts/audit-your-agent/prompt-002.txt`. Read `module-4/policy-report.md`. Produce: (1) top three surprises — verdicts a careful reader couldn't have predicted, (2) three "I can't tell" rows most likely hiding a real violation, (3) one row that looks compliant but deserves pushback. Keep each to one or two sentences. Quote rule names.

### Phase 2 — Security audit with STRIDE

**Prompt 3:** `/tmp/prompts/audit-your-agent/prompt-003.txt`. Apply agent-security skill. Read `skills/agent-security/SKILL.md` + `access-analysis.md` + `stride.md` + `mitigations.md`. Run both the access-control pass and the agent-STRIDE pass on the target system. Produce `module-4/security-report.md` with:
- Access-control findings (enumerate reaches; flag unused access with severity)
- Agent-STRIDE findings (six category subsections; top 1-2 specific risks per category, not generic descriptions)
- Ranked mitigations (three-tier high/medium/low; one mitigation shape per risk)

### Phase 3 — Mitigate one risk

**Prompt 4:** `/tmp/prompts/audit-your-agent/prompt-004.txt`. Claude asks Maija to name (a) one risk to mitigate and (b) the mitigation shape suggested for it. Substitute Maija's answer:
> The risk: **the Monday-risks agent can read `sources/maija-prep-notes-skeptics.md` and could paraphrase its content into the risk briefing.** The hard-line rule in the agent file says not to, but it's a prose rule, not a structural one — if the agent drifts, the rule may not fire. Mitigation shape the skill suggested: **filter** (add a redaction / content-exclusion rule the agent must apply before writing the risk briefing).

Claude describes the diff in plain English. Walk through what changes:
- Agent file gets a structural rule at the top naming the path as excluded-from-output.
- The risk briefing routine gets a filter step that greps the output for any phrase lifted from the personal note before finalising.
- The agent's output-template includes a self-check: "does this output reference anything I read from `sources/maija-prep-notes-skeptics.md`? If yes, stop and ask."

Substitute Maija's confirmation:
> apply

Claude applies — edits `agents/monday-risks.md` adding the structural exclusion rule at the top + a filter-before-write step. Re-runs the check specific to this risk (re-apply the Information-Disclosure sub-section of the STRIDE pass on just this file). Report the new verdict.

Write `module-4/residual.md` with one paragraph naming what's still true after the mitigation. Name the residual specifically — don't say the risk is gone. (Plausible residual: "The filter is prose-rule-plus-grep, not a capability restriction. A sufficiently determined agent could paraphrase at higher levels of abstraction and pass the grep. Reduced, not eliminated.")

### Close — Doors I'd rather not open

Append to `module-4/residual.md` a second section headed `## Doors I'd rather not open`. One line, substituted as Maija's written decision:
> I'm scoping out: agent-drafted HR-adjacent communications (performance feedback, disciplinary framing, team-health assessments). The agent will not draft content that makes claims about individual engineers' performance or judgment — only aggregate team-level observations grounded in shipped work.

## Truncations

Do NOT execute the Debrief from the module file (skill-sharpening prompt). Do NOT run homework micro-skill. Truncated per runner pattern.

## Report

Write scrollback to `.../instances/bootstrap-m4-verbatim-2026-04-24-actor-scrollback.md` per standard shape.

Short report at `.../instances/bootstrap-m4-verbatim-2026-04-24-actor-report.md`:

```markdown
# Actor report — Bootstrap M4 verbatim — 2026-04-24

## Status
<done / error>

## Scratch
.../scratch/bootstrap-m4

## Prompts executed
1. Phase 1 prompt-001 (policy audit)
2. Phase 1.5 prompt-002 (what's in the report)
3. Phase 2 prompt-003 (STRIDE + access-control)
4. Phase 3 prompt-004 (mitigate + residual)

## Artifacts written
- module-4/policy-report.md: <row count>
- module-4/security-report.md: <rough structure>
- module-4/residual.md: <line count>
- agents/monday-risks.md: edited (mitigation applied)

## Risk picked + mitigation
- Risk: personal-note paraphrase via Monday-risks agent
- Shape: filter
- Residual: prose-rule-plus-grep, not capability restriction

## Substitutions
- Skill invocation → direct Read of skills/ files (no auto-discovery)
- Risk pick + mitigation shape + confirmation + door-to-close: Maija answers per runner
- Debrief truncated
```

Under 300 words. Do not grade yourself.

## What you must NOT do

- Read `curriculum/exercises/*`, judge runners, other actor runners, maintainer docs.
- Read mock-library files at `/tmp/bootstrap-mocks/` — this module operates on the inherited scratch state, not the mock sources directly.
- Paraphrase prompts.
- Execute Debrief or homework prompts.
- Overwrite `module-3/` artifacts — they're read-only inputs for the audit.
- Skip the "plain I can't tell" discipline in the policy report — it's the point.
