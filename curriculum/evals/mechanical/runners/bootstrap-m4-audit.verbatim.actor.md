# Actor — Bootstrap M4 audit-your-agent verbatim

**Dispatch with `model: "haiku"`.** This is an acceptance-test actor — your job is to run the audit prompt chain and leave file artefacts (policy report, security report, edited agent file, guardrails) on disk for the Judge's scripts to inspect. You are NOT trying to produce great audit findings. Stub long generated content; the Judge does not grade quality.

You have Bash / Read / Write / Edit. Four prompts pasted verbatim from `/tmp/prompts/audit-your-agent/prompt-00{1,2,3,4}.txt`. Read, blockquote-paste verbatim, respond.

## Arrange — verify state inherited from author runner

Working directory: `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/bootstrap-m4`.

`cd` there. Confirm via `ls`:

- `memory/`, `sources/`, `agents/monday-risks.md`, `module-3/{question,answer,wonder}.md`, `module-3/{retrievals,stances}/`
- `module-4/policies/` (planted)
- `outputs/policy-report-raw.md`
- `module-4/plugins/security-audit/{.claude-plugin/plugin.json,skills/policy/SKILL.md,skills/agent-security/SKILL.md}`
- `skill-install/.claude/skills/security-audit-policy/SKILL.md`
- `skill-install/.claude/skills/security-audit-agent-security/SKILL.md`
- `outputs/policy-report.md` and `outputs/security-report.md` do NOT exist yet

If any required inherited artifact is missing, write `ERROR - author runner did not run or did not complete` to the report and STOP.

## Lens invocation substitution

Plugins/skills not auto-discovered in subagent env. When a prompt says "Apply the X lens," Read `skill-install/.claude/skills/security-audit-X/SKILL.md` plus sibling reference files, then execute.

Log per phase: `[harness substitution - reusable lens X invoked by reading skill-install/.claude/skills/security-audit-X/SKILL.md directly]`.

## Prompts to execute in order

### Phase 1 — Packaged policy audit

**Prompt 1:** `prompt-001.txt`. Quote, respond.

Apply policy lens. Walk: `memory/`, `sources/`, `agents/`, root `CLAUDE.md` if present, `module-3/stances/`. Produce `outputs/policy-report.md` as a markdown table:

```
| Rule | Description | Verdict | Evidence |
```

One row per rule. Verdicts: `compliant`, `violating`, `"I can't tell"` or `I can't tell`. Evidence column: name file or what evidence is needed (1-line stub OK). Target ≥12 rule rows. Briefly note one way packaged report is sharper than `outputs/policy-report-raw.md` (one line OK).

### Phase 1.5 — Meta read

**Prompt 2:** `prompt-002.txt`. Quote, respond.

Read `outputs/policy-report.md`. Produce: (1) top three surprises, (2) three "I can't tell" rows likely hiding violations, (3) one compliant-looking row deserving pushback. Quote rule names. One sentence each.

### Phase 2 — Agent-security audit

**Prompt 3:** `prompt-003.txt`. Quote, respond.

Apply agent-security lens. Read the lens SKILL.md plus siblings. Produce `outputs/security-report.md` with:

- **Access-control findings** — ≥2 enumerated reaches, each with necessary?+severity (one-line stubs OK).
- **Named-attack-class findings** — one subsection per class. Each subsection MUST appear by name verbatim:
  - `prompt injection` (with both `direct` and `indirect`)
  - `secrets in context` (and `scrollback`)
  - `tool confusion`
  - `plugin supply-chain`
  Each subsection names ONE specific risk (one sentence + file/behaviour ref).
- **Ranked mitigations** — three-tier (high/medium/low). All five shape names appear verbatim somewhere across the list: `scope`, `split`, `filter`, `gate`, `review`.
- **Classical-controls floor** — one sentence naming at least two from {perimeter, IAM, mTLS, network, WAF} as the floor.

### Phase 3 — Mitigate one risk

Substitute Maija's risk statement BEFORE pasting prompt-004 (paste verbatim in blockquote):

> The Monday-risks agent in `agents/monday-risks.md` can read `sources/maija-prep-notes-skeptics.md` and could paraphrase its content into the risk briefing. The hard-line rule in the agent file says not to, but it is a prose rule, not a structural one. If the agent drifts, the rule may not fire and the personal note could leak.

**Prompt 4:** `prompt-004.txt`. Quote, respond.

Pick mitigation shape `filter`. Edit `agents/monday-risks.md`: (a) structural exclusion rule near top naming `sources/maija-prep-notes-skeptics.md`, (b) filter step in briefing routine, (c) self-check line in output template. Re-run the named-attack-class check on the modified agent file; report new verdict in scrollback.

Append one paragraph to `./guardrails.md` naming the residual specifically (one line OK).

### Close — Doors I would rather not open

Append to `./guardrails.md`:

```
## Doors I would rather not open
```

Then one line, substituted as Maija's decision:

> I am scoping out: agent-drafted HR-adjacent communications (performance feedback, disciplinary framing, team-health assessments). The agent will not draft content that makes claims about individual engineers' performance or judgment, only aggregate team-level observations grounded in shipped work.

## Truncations

Do NOT execute Debrief. Do NOT touch `module-3/` artifacts. Do NOT modify `module-4/plugins/security-audit/` or `skill-install/.claude/skills/security-audit-*` files.

## Report

Scrollback: `.../instances/bootstrap-m4-audit-actor-scrollback.md`.

Report at `.../instances/bootstrap-m4-audit-actor-report.md`:

```markdown
# Actor report — Bootstrap M4 audit-your-agent verbatim

## Status
done | error

## Scratch
.../scratch/bootstrap-m4

## Transcript
<absolute path; best-effort>

## Prompts executed
1-4 (one line each)

## Artifacts written
- outputs/policy-report.md, outputs/security-report.md, guardrails.md, agents/monday-risks.md (edited)

## Substitutions
- Lens invocation, risk pick, door-to-close, Debrief truncated
```

Under 250 words.

## What you must NOT do

- Read `curriculum/exercises/*`, judge runners, sibling actor runners, maintainer docs.
- Read `/tmp/bootstrap-mocks/`.
- Paraphrase prompts.
- Modify `module-4/plugins/security-audit/` or `skill-install/.claude/skills/security-audit-*` files.
- Overwrite `module-3/` artifacts.
- Skip the four-attack-class verbatim naming.
