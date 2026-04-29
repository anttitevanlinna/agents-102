# Actor — Bootstrap M4 run-and-package-security-check verbatim

You are simulating a Claude Code session Maija (platform-eng lead at a Nordic enterprise) is running on her training-directory root. Module 2 memory + Module 3 multi-agent outputs are already on disk. Module 4 ships `module-4/policies/` only. Maija first runs those policy files raw, then authors reusable security expertise during this exercise. You have Bash / Read / Write / Edit.

**Critical protocol:** five prompts pasted verbatim from author-security-plugin at `/tmp/prompts/author-security-plugin/prompt-{001,002,003,004-cli,005-verify}.txt`. Read, quote in blockquote, respond.

## Arrange

Working directory: `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/bootstrap-m4`.

1. `mkdir -p` the working directory. `cd` there.
2. Copy the inherited M3 scratch contents:
   ```
   cp -R /Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/bootstrap-m3/. ./
   ```
   This brings: `module-1/CLAUDE.md`, `module-2/{challenge,soft-pages}.md`, `memory/` (topic pages + index), `sources/`, `agents/monday-risks.md`, `module-3/` (question, retrievals, stances, answer, wonder).
3. Plant Module 4 policy reference files:
   ```
   mkdir -p module-4/policies
   cp /Users/anttitevanlinna/Projects/agents-102/curriculum/scaffolds/module-4-starter/policies/*.md module-4/policies/
   ```
   Baseline files land from the scaffold. Customer-specific runs may use a different file count; the actor should read everything under `module-4/policies/`.
4. Plant the per-runtime CLI skill install location inside the scratch (sandbox the install — do NOT write to the real `~/.claude/skills/`):
   ```
   mkdir -p skill-install/.claude/skills
   ```
   This stands in for `~/.claude/skills/`.
5. `git init` + `git add -A` + commit with the neutral message `wip - m4 starting state`.
6. List `module-4/policies/` to confirm policy reference files are present. List `agents/`, `memory/`, `sources/`, `module-3/` to confirm inheritance.

## Reusable-check authoring substitution

The exercise has three runtime paths. Cowork/Desktop install a plugin envelope; CLI extracts standalone skills. The subagent environment has no Cowork save button or Desktop plugin loader. Substitute the **CLI path** while still authoring the plugin source folder the exercise asks for: build `.claude-plugin/plugin.json` plus `skills/<lens>/SKILL.md` files inline, show them in scrollback before saving, then write to disk under `module-4/plugins/security-audit/`. Install by copying the two SKILL.md files into the sandboxed `skill-install/.claude/skills/` tree.

Log at the top of Phase 3: `[harness substitution - cowork/desktop plugin install unavailable; source plugin authored inline; CLI standalone skills installed into sandbox]`.

## Phase 1 — Run policies raw

**Prompt 1:** `/tmp/prompts/author-security-plugin/prompt-001.txt`. Read verbatim, quote in blockquote, respond.

Read every file in `module-4/policies/` using the Read tool. Walk the target system: `memory/`, `sources/`, `agents/`, root `CLAUDE.md` if present, and `module-3/stances/`. Produce `outputs/policy-report-raw.md` as a markdown table:

```
| Rule | Description | Verdict | Evidence |
```

One row per rule derived from the policy files. Verdicts: `compliant`, `violating`, `"I can't tell"` or `I can't tell`. Evidence column quotes specific files or names what evidence would be needed. Target at least 12 rule rows for the baseline scaffold. Do not create any plugin or skill yet.

## Phase 2 — Dictate what matters

**Prompt 2:** `/tmp/prompts/author-security-plugin/prompt-002.txt`. Read verbatim, quote in blockquote, respond as Claude would: acknowledge, ask for the 3-5 lines, and wait. Do not read or write any package file before the lines.

Substitute Maija's "what matters" lines as a student-typed message (paste verbatim in a blockquote — five lines, the persona is a Nordic-enterprise platform-eng lead):

> 1. We process partner-NDA material and customer prep notes that must never leave my laptop in any form, including paraphrased into an output.
> 2. Finnish data-protection authority has been clear on automated decisions about individuals: anything that touches employment, performance review, or candidate screening is out of scope for the agent system, full stop.
> 3. The Module 3 multi-agent run reads from `sources/` directly; if a source contains a personal note (`maija-prep-notes-skeptics.md` does), the synthesizer can paraphrase it into a customer-facing brief without me noticing.
> 4. We have no marketplace plugins today. The first plugin we ship has to set the bar for who is allowed to author and review one: supply-chain hygiene from day one, not after the first incident.
> 5. The agent has shell access in the training directory and can write outside `module-N/` if a prompt asks. I want a structural rule that names which paths the agent will not write to without explicit confirmation.

After the lines, read `outputs/policy-report-raw.md` and every file in `module-4/policies/`, then propose a reusable package shape: runtime split, name (`security-audit` or similar), two lenses (`policy` and `agent-security`), report shapes. Three to six paragraphs. Maija pushes back if it sounds generic; you do not need to substitute pushback. Accept the proposal and proceed if it looks reasonable, log a one-line "no pushback needed" if so.

## Phase 3 — Author both lenses

**Prompt 3:** `/tmp/prompts/author-security-plugin/prompt-003.txt`. Read verbatim, quote in blockquote, respond.

Author the reusable check inline. Show the files in scrollback BEFORE writing them. Required source structure:

```
module-4/plugins/security-audit/
├── .claude-plugin/
│   └── plugin.json
└── skills/
    ├── policy/
    │   └── SKILL.md
    └── agent-security/
        └── SKILL.md
```

**Forcing-function assertions you must satisfy (the Judge greps for these):**

- The AGENT-SECURITY `SKILL.md` names ALL FOUR attack classes verbatim:
  - `prompt injection` (with both `direct` and `indirect` named)
  - `secrets in context` (the phrase `scrollback` must also appear)
  - `tool confusion`
  - `plugin supply-chain`
- The AGENT-SECURITY preamble uses the word `layered` at least once and names at least two classical controls (network / IAM / mTLS / perimeter / WAF) as the floor.
- Each lens's `SKILL.md` names the report shape it produces (table columns or section headers).
- The POLICY lens carries rule rows derived from every file under `module-4/policies/` and from Maija's lines (roughly 12-25 rules total for the baseline scaffold; do not invent unrelated rules).

After showing the files in scrollback, write them to disk under `module-4/plugins/security-audit/` in the scratch root.

## Phase 4 — Install and verify (CLI substitution)

**Prompt 4:** `/tmp/prompts/author-security-plugin/prompt-004-cli.txt`. Read verbatim, quote in blockquote, respond.

Substitute the install location: copy the two lenses to `skill-install/.claude/skills/security-audit-policy/` and `skill-install/.claude/skills/security-audit-agent-security/`, NOT real `~/.claude/skills/`. Log: `[harness substitution - install location ~/.claude/skills/<name>/ -> ./skill-install/.claude/skills/<name>/ to avoid touching the host Claude config]`.

Then `ls -la skill-install/.claude/skills/security-audit-policy/` and `ls -la skill-install/.claude/skills/security-audit-agent-security/` and report the file paths.

Confirm a "fresh session" by writing one line to scrollback: `[harness substitution - fresh session opened conceptually; same scratch directory; skills loaded from skill-install/.claude/skills/]`.

**Prompt 5 (verify):** `/tmp/prompts/author-security-plugin/prompt-005-verify.txt`. Read verbatim, quote in blockquote, respond.

Substitute: read the policy lens SKILL.md from `skill-install/.claude/skills/security-audit-policy/SKILL.md`, then apply two or three rules to `./challenge.md` ONLY.

Produce two or three rows of the report shape (the same `| Rule | Description | Verdict | Evidence |` table the lens specifies). Stop after three rows. Do NOT run the full audit.

## Truncations

- Do NOT execute the Debrief from the module file.
- Do NOT run any homework prompt.
- Do NOT touch `module-3/` — read-only inputs.
- Do NOT write to `~/.claude/` on the host. All install targets are inside the scratch.

## Report

Write scrollback to `.../instances/bootstrap-m4-author-actor-scrollback.md`.

Short report at `.../instances/bootstrap-m4-author-actor-report.md`:

```markdown
# Actor report — Bootstrap M4 run-and-package-security-check verbatim

## Status
<done / error>

## Scratch
.../scratch/bootstrap-m4

## Transcript
<absolute path to the .jsonl this subagent's transcript writes to — find via `ls -t ~/.claude/projects/-Users-anttitevanlinna-Projects-agents-102/*/subagents/agent-*.jsonl | head -1` AFTER your last tool call. Best-effort; if you cannot determine it, write "NOT FOUND — orchestrator must locate">

## Prompts executed
1. Phase 1 prompt-001 (raw policy run, writes outputs/policy-report-raw.md)
2. Phase 2 prompt-002 (ask for Maija's 5 lines, then package proposal)
3. Phase 3 prompt-003 (author both lenses, all 4 attack classes named verbatim)
4. Phase 4 prompt-004-cli (install standalone skills to sandbox)
5. Phase 4 prompt-005-verify (two-three rows on ./challenge.md)

## Artifacts written
- outputs/policy-report-raw.md
- module-4/plugins/security-audit/.claude-plugin/plugin.json
- module-4/plugins/security-audit/skills/policy/SKILL.md
- module-4/plugins/security-audit/skills/agent-security/SKILL.md
- skill-install/.claude/skills/security-audit-policy/SKILL.md
- skill-install/.claude/skills/security-audit-agent-security/SKILL.md
- <verify-output rows in scrollback>

## Substitutions
- cowork/desktop plugin install unavailable -> CLI skill extraction path used
- ~/.claude/skills/<name>/ -> ./skill-install/.claude/skills/<name>/
- "fresh session" -> conceptual; same scratch
- Maija's dictation: 5 lines substituted per runner
```

Under 350 words. Do not grade yourself.

## What you must NOT do

- Read `curriculum/exercises/*`, judge runners, sibling actor runners, maintainer docs.
- Read mock-library files at `/tmp/bootstrap-mocks/`.
- Paraphrase prompts.
- Write to `~/.claude/` outside the scratch.
- Overwrite `module-3/` artifacts.
- Skip the four-attack-class naming — that is the forcing-function assertion.
- Run the full audit in the verify step (two-three rows, then stop).
