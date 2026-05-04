# Actor — Agents 101 M4 audit-your-agent verbatim

**Dispatch with `model: "haiku"`.** Acceptance-test actor — your job is to run the audit prompt chain (install → policy audit → agent-security audit → mitigate) and leave file artefacts on disk for the Judge's scripts to inspect. You are NOT trying to produce great audit findings. Stub long generated content; the Judge does not grade quality.

You have Bash / Read / Write / Edit. Four prompts pasted verbatim from `/tmp/prompts/audit-your-agent/prompt-00{1,2,3,4}.txt`.

**Hard rule (forcing-function):** for EACH phase, you MUST invoke the **Read tool** on the corresponding `prompt-NNN.txt` file BEFORE blockquote-pasting it. The Judge greps the transcript for Read tool_use of every prompt-NNN.txt; pasting from memory or inlining without a Read fails the verbatim check. Four Reads, four pastes, four responses.

## Arrange — verify state inherited from author runner

Working directory: `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/agents-101-m4`.

`cd` there. Confirm via `ls`:

- `memory/`, `sources/`, `agents/monday-risks.md`, `module-3/{question,answer,wonder}.md`, `module-3/{retrievals,stances}/`
- `module-4/policies/` (planted)
- `outputs/policy-report-raw.md`
- `module-4/skills/security-audit/SKILL.md`
- `outputs/policy-report.md` and `outputs/security-report.md` do NOT exist yet
- `skill-install/.claude/skills/security-audit/` does NOT exist yet (Phase 1 creates it)

If any required inherited artifact is missing, write `ERROR - author runner did not run or did not complete` to the report and STOP.

## Install-location substitution

Prompt 1 instructs install to `~/.claude/skills/security-audit/`. Substitute to scratch-local: `<scratch>/skill-install/.claude/skills/security-audit/`. Log: `[harness substitution - install location ~/.claude/skills/security-audit/ -> ./skill-install/.claude/skills/security-audit/ to avoid touching the host Claude config]`.

Use `dangerouslyDisableSandbox: true` on Bash that mutates `<scratch>/`.

## Lens invocation substitution

Skills not auto-discovered in subagent env. When a prompt says "Apply the X lens," Read `skill-install/.claude/skills/security-audit/SKILL.md` (single file with both lenses), then execute. Log per phase: `[harness substitution - reusable lens X invoked by reading skill-install/.claude/skills/security-audit/SKILL.md directly]`.

### Phase 1 — install-skill

**Prompt 1:** `prompt-001.txt`. Quote, respond.

```
mkdir -p skill-install/.claude/skills/security-audit
cp module-4/skills/security-audit/SKILL.md skill-install/.claude/skills/security-audit/SKILL.md
ls -la skill-install/.claude/skills/security-audit/
```

Log the substitution. Confirm path back in scrollback.

### Phase 2 — policy-audit

**Prompt 2:** `prompt-002.txt`. Quote, respond.

Apply policy lens (read SKILL.md, log substitution). Walk: `memory/`, `sources/`, `agents/`, root `CLAUDE.md` if present, `module-3/stances/`. Produce `outputs/policy-report.md` as a markdown table:

```
| Rule | Description | Verdict | Evidence |
```

One row per rule. Verdicts: `compliant`, `violating`, `"I can't tell"` or `I can't tell`. Evidence column: name file or what evidence is needed (1-line stub OK). Target ≥12 rule rows. Briefly note one way packaged report is sharper than `outputs/policy-report-raw.md` (one line OK).

After writing the report, the prompt asks for three lists in scrollback: (1) top three surprises, (2) three "I can't tell" rows likely hiding violations, (3) one compliant-looking row deserving pushback. Quote rule names. One sentence each.

### Phase 3 — agent-security-audit

**Prompt 3:** `prompt-003.txt`. Quote, respond.

Apply agent-security lens (log substitution). Produce `outputs/security-report.md` with:

- **Access-control findings** — ≥2 enumerated reaches, each with necessary?+severity (one-line stubs OK).
- **Named-attack-class findings** — one subsection per class. Each subsection MUST appear by name verbatim:
  - `prompt injection` (with both `direct` and `indirect`)
  - `secrets in context` (and `scrollback`)
  - `tool confusion`
  - `skill supply-chain`
  Each subsection names ONE specific risk (one sentence + file/behaviour ref).
- **Ranked mitigations** — three-tier (high/medium/low). All five shape names appear verbatim somewhere across the list: `scope`, `split`, `filter`, `gate`, `review`.
- **Classical-controls floor** — one sentence naming at least two from {perimeter, IAM, identity, mTLS, network, WAF, logging, vendor} as the floor.

### Phase 4 — mitigate-residual

Substitute Maija's risk statement BEFORE pasting prompt-004 (paste verbatim in blockquote):

> The Monday-risks agent in `agents/monday-risks.md` can read `sources/maija-prep-notes-skeptics.md` and could paraphrase its content into the risk briefing. The hard-line rule in the agent file says not to, but it is a prose rule, not a structural one. If the agent drifts, the rule may not fire and the personal note could leak.

**Prompt 4:** `prompt-004.txt`. Quote, respond.

Pick mitigation shape `filter`. Edit `agents/monday-risks.md`: (a) structural exclusion rule near top naming `sources/maija-prep-notes-skeptics.md`, (b) filter step in briefing routine, (c) self-check line in output template. Re-run the named-attack-class check on the modified agent file; report new verdict in scrollback.

Append a `## Mitigation applied and residual` section to `outputs/security-report.md` naming what changed, the new verdict, and the residual specifically (one paragraph; do NOT rewrite the earlier report).

## Truncations

Do NOT execute Debrief. Do NOT touch `module-3/` artifacts. Do NOT modify `module-4/skills/security-audit/SKILL.md` (the authored source) or `skill-install/.claude/skills/security-audit/SKILL.md` (the installed copy). Do NOT write to `~/.claude/` outside scratch.

## Report

Scrollback: `.../instances/agents-101-m4-audit-actor-scrollback.md`.

Report at `.../instances/agents-101-m4-audit-actor-report.md`:

```markdown
# Actor report — Agents 101 M4 audit-your-agent verbatim

## Status
done | error

## Scratch
.../scratch/agents-101-m4

## Transcript
<absolute path; best-effort>

## Prompts executed
1-4 (one line each)

## Artifacts written
- skill-install/.claude/skills/security-audit/SKILL.md
- outputs/policy-report.md, outputs/security-report.md, agents/monday-risks.md (edited)

## Substitutions
- Install location → skill-install/, lens invocation → direct Read, risk pick = Maija's monday-risks line, Debrief truncated
```

Under 250 words.

## What you must NOT do

- Read `curriculum/exercises/*`, judge runners, sibling actor runners, maintainer docs.
- Read `/tmp/agents-101-mocks/`.
- Paraphrase prompts.
- Modify `module-4/skills/security-audit/SKILL.md` or `skill-install/.claude/skills/security-audit/SKILL.md`.
- Overwrite `module-3/` artifacts.
- Skip the four-attack-class verbatim naming.
