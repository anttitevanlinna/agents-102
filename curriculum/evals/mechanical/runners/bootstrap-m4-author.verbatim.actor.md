# Actor — Bootstrap M4 run-and-package-security-check verbatim

**Dispatch with `model: "haiku"`.** This is an acceptance-test actor — your job is to run the author-security-plugin prompt chain and leave file artefacts (raw report, source plugin, installed CLI skills, verify rows) on disk for the Judge's scripts to inspect. You are NOT trying to author a great security skill. Stub long generated content; the Judge does not grade quality. The forcing-function grep on attack-class names IS load-bearing — those four phrases must appear verbatim.

You have Bash / Read / Write / Edit. Five prompts pasted verbatim from `/tmp/prompts/author-security-plugin/prompt-{001,002,003,004-cli,005-verify}.txt`.

## Arrange

Working directory: `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/bootstrap-m4`.

1. `mkdir -p`, `cd`.
2. Copy inherited M3 contents:
   ```
   cp -R /Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/bootstrap-m3/. ./
   ```
3. Plant Module 4 policy reference files:
   ```
   mkdir -p module-4/policies
   cp /Users/anttitevanlinna/Projects/agents-102/curriculum/scaffolds/module-4-starter/policies/*.md module-4/policies/
   ```
4. Plant sandboxed install location:
   ```
   mkdir -p skill-install/.claude/skills
   ```
5. `git init`, `git add -A`, commit `wip - m4 starting state`.
6. `ls module-4/policies/`, `ls agents/ memory/ sources/ module-3/`.

## Reusable-check authoring substitution

Cowork/Desktop install paths unavailable. Substitute the **CLI path**: build `.claude-plugin/plugin.json` plus `skills/<lens>/SKILL.md` files inline, write under `module-4/plugins/security-audit/`, then copy SKILL.md files into sandboxed `skill-install/.claude/skills/`.

Log at top of Phase 3: `[harness substitution - cowork/desktop plugin install unavailable; source plugin authored inline; CLI standalone skills installed into sandbox]`.

## Phase 1 — Run policies raw

**Prompt 1:** `prompt-001.txt`. Quote, respond.

Read every file in `module-4/policies/`. Walk: `memory/`, `sources/`, `agents/`, root `CLAUDE.md` if present, `module-3/stances/`. Produce `outputs/policy-report-raw.md`:

```
| Rule | Description | Verdict | Evidence |
```

One row per rule. Verdicts: `compliant`, `violating`, `"I can't tell"`. Evidence stub OK. Target ≥12 rows. Do not create plugin/skill files yet.

## Phase 2 — Dictate what matters

**Prompt 2:** `prompt-002.txt`. Quote, respond as Claude: acknowledge, ask for the lines, wait. Do not read or write package files yet.

Substitute Maija's lines (paste verbatim in blockquote):

> 1. We process partner-NDA material and customer prep notes that must never leave my laptop in any form, including paraphrased into an output.
> 2. Finnish data-protection authority has been clear on automated decisions about individuals: anything that touches employment, performance review, or candidate screening is out of scope for the agent system, full stop.
> 3. The Module 3 multi-agent run reads from `sources/` directly; if a source contains a personal note (`maija-prep-notes-skeptics.md` does), the synthesizer can paraphrase it into a customer-facing brief without me noticing.
> 4. We have no marketplace plugins today. The first plugin we ship has to set the bar for who is allowed to author and review one: supply-chain hygiene from day one, not after the first incident.
> 5. The agent has shell access in the training directory and can write outside `module-N/` if a prompt asks. I want a structural rule that names which paths the agent will not write to without explicit confirmation.

After lines, Read `outputs/policy-report-raw.md` and policy files; propose package shape (runtime split, name `security-audit`, two lenses `policy` + `agent-security`, report shapes). 1-3 short paragraphs. No pushback needed.

## Phase 3 — Author both lenses

**Prompt 3:** `prompt-003.txt`. Quote, respond.

Show files in scrollback BEFORE writing. Required structure:

```
module-4/plugins/security-audit/
├── .claude-plugin/plugin.json
└── skills/
    ├── policy/SKILL.md
    └── agent-security/SKILL.md
```

**Forcing-function assertions (the Judge greps for these — must appear verbatim):**

- The AGENT-SECURITY `SKILL.md` names ALL FOUR attack classes:
  - `prompt injection` (with both `direct` and `indirect`)
  - `secrets in context` (the phrase `scrollback` must also appear)
  - `tool confusion`
  - `plugin supply-chain`
- AGENT-SECURITY preamble: word `layered` ≥1, ≥2 classical controls from {network, IAM, mTLS, perimeter, WAF}.
- Each lens's `SKILL.md` names the report shape it produces (table columns or section headers).
- POLICY lens carries ~12-25 rule rows derived from `module-4/policies/` and Maija's lines.

Stub bodies are fine — the Judge greps for verbatim phrases, not prose quality.

After showing files, write to disk under `module-4/plugins/security-audit/`.

## Phase 4 — Install and verify (CLI substitution)

**Prompt 4:** `prompt-004-cli.txt`. Quote, respond.

Copy lenses to `skill-install/.claude/skills/security-audit-policy/` and `skill-install/.claude/skills/security-audit-agent-security/`. NOT real `~/.claude/skills/`. Log: `[harness substitution - install location ~/.claude/skills/<name>/ -> ./skill-install/.claude/skills/<name>/ to avoid touching the host Claude config]`.

`ls -la` both install dirs.

Log conceptual fresh session: `[harness substitution - fresh session opened conceptually; same scratch directory; skills loaded from skill-install/.claude/skills/]`.

**Prompt 5:** `prompt-005-verify.txt`. Quote, respond.

Read `skill-install/.claude/skills/security-audit-policy/SKILL.md`. Apply 2-3 rules to `./challenge.md` ONLY. Produce 2-3 rows of the report shape. Stop after three rows.

## Truncations

- No Debrief.
- No homework prompt.
- Do NOT touch `module-3/`.
- Do NOT write to `~/.claude/` on host.

## Report

Scrollback: `.../instances/bootstrap-m4-author-actor-scrollback.md`.

Report: `.../instances/bootstrap-m4-author-actor-report.md`:

```markdown
# Actor report — Bootstrap M4 author verbatim

## Status
done | error

## Scratch
.../scratch/bootstrap-m4

## Transcript
<absolute path; best-effort>

## Prompts executed
1-5 (one line each)

## Artifacts written
- outputs/policy-report-raw.md
- module-4/plugins/security-audit/* (plugin.json + 2 SKILL.md)
- skill-install/.claude/skills/security-audit-{policy,agent-security}/SKILL.md
- verify-output rows in scrollback

## Substitutions
- cowork/desktop -> CLI path; ~/.claude/ -> sandbox; fresh session -> conceptual; Maija's 5 lines
```

Under 250 words.

## What you must NOT do

- Read `curriculum/exercises/*`, judge runners, sibling actor runners, maintainer docs.
- Read `/tmp/bootstrap-mocks/`.
- Paraphrase prompts.
- Write to `~/.claude/` outside scratch.
- Overwrite `module-3/` artifacts.
- Skip the four-attack-class verbatim naming — that is the forcing-function assertion.
- Run the full audit in verify (2-3 rows then stop).
