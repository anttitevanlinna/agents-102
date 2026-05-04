# Actor — Agents 101 M4 author-security-skill verbatim

**Dispatch with `model: "haiku"`.** This is an acceptance-test actor — your job is to run the author-security-skill prompt chain and leave file artefacts (raw report, authored personal skill source) on disk for the Judge's scripts to inspect. You are NOT trying to author a great security skill. Stub long generated content; the Judge does not grade quality. The forcing-function grep on attack-class names IS load-bearing — those four phrases must appear verbatim.

You have Bash / Read / Write / Edit. Three prompts pasted verbatim from `/tmp/prompts/author-security-skill/prompt-{001,002,003}.txt`.

**Hard rule (forcing-function):** for EACH phase, you MUST invoke the **Read tool** on the corresponding `prompt-NNN.txt` file BEFORE blockquote-pasting it. The Judge greps the transcript for Read tool_use of every prompt-NNN.txt; pasting from memory or inlining the prompt without a Read fails the verbatim check. Three Reads, three pastes, three responses.

## Arrange

Working directory: `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/agents-101-m4`.

1. `mkdir -p`, `cd`.
2. Copy inherited M3 contents:
   ```
   cp -R /Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/agents-101-m3/. ./
   ```
3. Plant Module 4 policy reference files:
   ```
   mkdir -p module-4/policies
   cp /Users/anttitevanlinna/Projects/agents-102/curriculum/scaffolds/module-4-starter/policies/*.md module-4/policies/
   ```
4. `git init` if not present, `git add -A`, commit `wip - m4 starting state`. Use `dangerouslyDisableSandbox: true` on Bash that mutates `<scratch>/`.
5. `ls module-4/policies/`, `ls agents/ memory/ sources/ module-3/`.

## Authoring substitution

Stay on disk under `module-4/skills/security-audit/`. Do NOT write to `~/.claude/skills/` or `skill-install/`. Install + verify lives in the audit runner.

### Phase 1 — raw-policy

**Prompt 1:** `prompt-001.txt`. Quote (blockquote-paste verbatim), respond.

Read every file in `module-4/policies/`. Walk: `memory/`, `sources/`, `agents/`, root `CLAUDE.md` if present, `module-3/stances/`. Produce `outputs/policy-report-raw.md`:

```
| Rule | Description | Verdict | Evidence |
```

One row per rule. Verdicts: `compliant`, `violating`, `"I can't tell"`. Evidence stub OK. Target ≥12 rows. Do NOT create skill files yet.

### Phase 2 — dictate-lines

**Prompt 2:** `prompt-002.txt`. Quote, respond as Claude: acknowledge, ask for the lines, wait. Do not read or write skill files yet.

Substitute Maija's lines (paste verbatim in blockquote BEFORE Claude proceeds):

> 1. We process partner-NDA material and customer prep notes that must never leave my laptop in any form, including paraphrased into an output.
> 2. Finnish data-protection authority has been clear on automated decisions about individuals: anything that touches employment, performance review, or candidate screening is out of scope for the agent system, full stop.
> 3. The Module 3 multi-agent run reads from `sources/` directly; if a source contains a personal note (`maija-prep-notes-skeptics.md` does), the synthesizer can paraphrase it into a customer-facing brief without me noticing.
> 4. We have no marketplace skills today. The first reusable check we ship has to set the bar for who is allowed to author and review one: supply-chain hygiene from day one, not after the first incident.
> 5. The agent has shell access in the training directory and can write outside `module-N/` if a prompt asks. I want a structural rule that names which paths the agent will not write to without explicit confirmation.

After lines, Read `outputs/policy-report-raw.md` and policy files; propose package shape (one personal skill `security-audit`, two lenses `POLICY` + `AGENT-SECURITY`, single `SKILL.md`, report shapes). 1-3 short paragraphs. No pushback needed.

### Phase 3 — author-lenses

**Prompt 3:** `prompt-003.txt`. Quote, respond.

The prompt asks Claude to **grill** the student before saving. Grill turn: ask 2-3 short questions covering both lenses (e.g., a missing policy specific, an access path to scope). Do NOT save yet.

Substitute the student's answers (paste verbatim in blockquote):

> Enough. Cover scope-of-write paths and supply-chain provenance for the policy lens. Use Maija's five lines as the policy specifics. Save now.

Then show files in scrollback BEFORE writing. Required structure (single SKILL.md, both lenses):

```
module-4/skills/security-audit/
└── SKILL.md
```

**Forcing-function assertions (the Judge greps these — must appear verbatim, case-insensitive, in `module-4/skills/security-audit/SKILL.md`):**

- `prompt injection` — with both `direct` AND `indirect`
- `secrets in context` — and the word `scrollback` must also appear
- `tool confusion`
- `skill supply-chain`
- AGENT-SECURITY preamble names the layering relationship: at least one of `layered`, `on top of`, or `in place of`. **The preamble MUST also name at least TWO of these classical controls verbatim** (the prompt itself names them — do not paraphrase): `network controls`, `identity and access management` (or `IAM`), `logging`, `vendor`. Including the literal phrase from the prompt — e.g., *"on top of normal company controls (network controls, identity and access management, logging, vendor/security review)"* — is the cleanest pass.
- All five mitigation shapes appear verbatim somewhere in the SKILL.md: `scope`, `split`, `filter`, `gate`, `review`.
- POLICY lens names the report shape (table header `| Rule | Description | Verdict | Evidence |` OR an enumerated `Report shape:` block).
- POLICY lens carries ≥12 rule rows OR a numbered/listed rule enumeration ≥12 derived from `module-4/policies/` and Maija's lines.

Stub bodies are fine — the Judge greps for verbatim phrases, not prose quality.

After showing files, write `module-4/skills/security-audit/SKILL.md` to disk.

## Truncations

- No Phase 4 (install) — that lives in the audit runner.
- No Phase 5 (verify) — same reason.
- No Cowork personal-skill creation block (Desktop/Cowork-only path; out of subagent scope).
- No Debrief, no homework prompt.
- Do NOT touch `module-3/`.
- Do NOT write to `~/.claude/`.
- Do NOT create `skill-install/`.

## Report

Scrollback: `.../instances/agents-101-m4-author-actor-scrollback.md`.

Report: `.../instances/agents-101-m4-author-actor-report.md`:

```markdown
# Actor report — Agents 101 M4 author verbatim

## Status
done | error

## Scratch
.../scratch/agents-101-m4

## Transcript
<absolute path; best-effort>

## Prompts executed
1-3 (one line each)

## Artifacts written
- outputs/policy-report-raw.md
- module-4/skills/security-audit/SKILL.md

## Substitutions
- Maija's 5 lines (Phase 2)
- Student "enough" answer to Phase 3 grill
```

Under 250 words.

## What you must NOT do

- Read `curriculum/exercises/*`, judge runners, sibling actor runners, maintainer docs.
- Read `/tmp/agents-101-mocks/`.
- Paraphrase prompts.
- Write to `~/.claude/` or `skill-install/`.
- Overwrite `module-3/` artifacts.
- Skip the four-attack-class verbatim naming — that is the forcing-function assertion.
- Skip the grill-before-save beat (Claude must ask at least one question before the student says "enough").
