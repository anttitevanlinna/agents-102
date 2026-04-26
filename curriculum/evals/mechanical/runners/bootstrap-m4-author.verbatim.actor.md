# Actor — Bootstrap M4 author-security-plugin verbatim

You are simulating a Claude Code session Maija (platform-eng lead at a Nordic enterprise) is running on her training-directory root. Module 2 memory + Module 3 multi-agent outputs are already on disk. Module 4 ships `module-4/policies/` only — Maija authors the plugin during this exercise. You have Bash / Read / Write / Edit.

**Critical protocol:** four prompts pasted verbatim from author-security-plugin at `/tmp/prompts/author-security-plugin/prompt-{001,002,003-cli,004-verify}.txt`. Read, quote in blockquote, respond.

## Arrange

Working directory: `/Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/bootstrap-m4`.

1. `mkdir -p` the working directory. `cd` there.
2. Copy the inherited M3 scratch contents:
   ```
   cp -R /Users/anttitevanlinna/Projects/agents-102/curriculum/evals/mechanical/scratch/bootstrap-m3/. ./
   ```
   This brings: `module-1/CLAUDE.md`, `module-2/{challenge,soft-pages}.md`, `memory/` (7 topic pages + index), `sources/`, `agents/monday-risks.md`, `module-3/` (question, retrievals, stances, answer, wonder).
3. Plant Module 4 policy reference files:
   ```
   mkdir -p module-4/policies
   cp /Users/anttitevanlinna/Projects/agents-102/curriculum/scaffolds/module-4-starter/policies/*.md module-4/policies/
   ```
   Four files land: `ai-use-baseline.md`, `sector-rules-placeholder.md`, `gdpr-essentials.md`, `data-classification.md`.
4. Plant the per-runtime CLI plugin install location inside the scratch (sandbox the install — do NOT write to the real `~/.claude/plugins/`):
   ```
   mkdir -p plugin-install/.claude/plugins
   ```
   This stands in for `~/.claude/plugins/`. The Phase 3 CLI prompt says `~/.claude/plugins/<plugin-name>/`; substitute `./plugin-install/.claude/plugins/<plugin-name>/` and log it.
5. `git init` + `git add -A` + commit with the neutral message `wip — m4 starting state`.
6. List `module-4/policies/` to confirm the four files. List `agents/`, `memory/`, `sources/`, `module-3/` to confirm inheritance.

## Plugin-authoring substitution

The exercise expects students using Cowork to invoke `cowork-plugin-management:create-cowork-plugin`, which auto-renders the manifest + SKILL.md files in chat with a *Save plugin* button. That skill is not available in your subagent environment. Substitute the **CLI path**: build `.claude-plugin/plugin.json` plus `skills/<lens>/SKILL.md` files inline, show them in scrollback before saving, then write to disk.

Log at the top of Phase 2: `[harness substitution — cowork-plugin-management skill unavailable; CLI path used; plugin manifest + SKILL.md files authored inline and written to disk]`.

## Phase 1 — Dictate what matters

**Prompt 1:** `/tmp/prompts/author-security-plugin/prompt-001.txt`. Read verbatim, quote in blockquote, respond as Claude would: acknowledge, do not read the policy files yet, wait.

Substitute Maija's "what matters" lines as a student-typed message (paste verbatim in a blockquote — five lines, the persona is a Nordic-enterprise platform-eng lead):

> 1. We process partner-NDA material and customer prep notes that must never leave my laptop in any form, including paraphrased into an output.
> 2. Finnish data-protection authority has been clear on automated decisions about individuals — anything that touches employment, performance review, or candidate screening is out of scope for the agent system, full stop.
> 3. The Module 3 multi-agent run reads from `sources/` directly; if a source contains a personal note (`maija-prep-notes-skeptics.md` does), the synthesizer can paraphrase it into a customer-facing brief without me noticing.
> 4. We have no plugins from the marketplace today. The first plugin we ship has to set the bar for who is allowed to author and review one — supply-chain hygiene from day one, not after the first incident.
> 5. The agent has shell access in the training directory and can write outside `module-N/` if a prompt asks. I want a structural rule that names which paths the agent will not write to without explicit confirmation.

After the lines, Claude reads the four policy files in `module-4/policies/` (use the Read tool), then proposes a plugin shape: name (`security-audit` or similar — pick one), two lenses (`policy` and `agent-security`), report shapes. Three to six paragraphs. Maija pushes back if it sounds generic; you do not need to substitute pushback — accept the proposal and proceed if it looks reasonable, log a one-line "no pushback needed" if so.

## Phase 2 — Author both lenses

**Prompt 2:** `/tmp/prompts/author-security-plugin/prompt-002.txt`. Read verbatim, quote in blockquote, respond.

Author the plugin inline. Show the files in scrollback BEFORE writing them. Required structure (write to scratch root):

```
security-audit-plugin/
├── .claude-plugin/
│   └── plugin.json                   manifest naming the plugin + the two skills
└── skills/
    ├── policy/
    │   └── SKILL.md                  invocation criteria + rule list + report shape
    └── agent-security/
        └── SKILL.md                  preamble (layered-on-classical) + four named attack classes + report shape
```

**Forcing-function assertions you must satisfy (the Judge greps for these):**

- The AGENT-SECURITY `SKILL.md` names ALL FOUR attack classes verbatim:
  - `prompt injection` (with both `direct` and `indirect` named)
  - `secrets in context` (the phrase "scrollback" must also appear)
  - `tool confusion`
  - `plugin supply-chain`
- The AGENT-SECURITY preamble uses the word `layered` at least once and names at least two classical controls (network / IAM / mTLS / perimeter / WAF) as the floor.
- Each lens's `SKILL.md` names the report shape it produces (table columns or section headers).
- The POLICY lens carries rule rows derived from the four policy files (roughly 16–25 rules total — sample the policies and pull rules; do not invent unrelated rules).

After showing the files in scrollback, write them to disk under `security-audit-plugin/` in the scratch root.

## Phase 3 — Install and verify (CLI substitution)

**Prompt 3:** `/tmp/prompts/author-security-plugin/prompt-003-cli.txt`. Read verbatim, quote in blockquote, respond.

Substitute the install location: write the plugin to `plugin-install/.claude/plugins/security-audit/` (sandbox), NOT `~/.claude/plugins/`. Log: `[harness substitution — install location ~/.claude/plugins/<name>/ -> ./plugin-install/.claude/plugins/<name>/ to avoid touching the host's Claude config]`.

Use `cp -R` to mirror `security-audit-plugin/` into the install location. Then `ls -la plugin-install/.claude/plugins/security-audit/` and report the file paths.

Confirm a "fresh session" by writing one line to scrollback: `[harness substitution — fresh session opened conceptually; same scratch directory; plugin loaded from plugin-install/.claude/plugins/]`.

**Prompt 4 (verify):** `/tmp/prompts/author-security-plugin/prompt-004-verify.txt`. Read verbatim, quote in blockquote, respond.

Substitute: read the policy lens SKILL.md from `plugin-install/.claude/plugins/security-audit/skills/policy/SKILL.md`, then apply two or three rules to `module-2/challenge.md` ONLY (the exercise prompt-004-verify now targets that file directly).

Produce two or three rows of the report shape (the same `| Rule | Description | Verdict | Evidence |` table the lens specifies). Stop after three rows. Do NOT run the full audit — that is M4 Exercise 2.

## Truncations

- Do NOT execute the Debrief from the module file.
- Do NOT run any homework prompt.
- Do NOT touch `module-3/` — read-only inputs.
- Do NOT write to `~/.claude/` on the host. All install targets are inside the scratch.

## Report

Write scrollback to `.../instances/bootstrap-m4-author-actor-scrollback.md`.

Short report at `.../instances/bootstrap-m4-author-actor-report.md`:

```markdown
# Actor report — Bootstrap M4 author-security-plugin verbatim

## Status
<done / error>

## Scratch
.../scratch/bootstrap-m4

## Transcript
<absolute path to the .jsonl this subagent's transcript writes to — find via `ls -t ~/.claude/projects/-Users-anttitevanlinna-Projects-agents-102/*/subagents/agent-*.jsonl | head -1` AFTER your last tool call. Best-effort; if you cannot determine it, write "NOT FOUND — orchestrator must locate">

## Prompts executed
1. Phase 1 prompt-001 (dictate what matters) + Maija's 5 substituted lines + plugin proposal
2. Phase 2 prompt-002 (author both lenses, all 4 attack classes named verbatim)
3. Phase 3 prompt-003-cli (install to sandbox plugin location)
4. Phase 3 prompt-004-verify (two-three rows on module-2/<file>)

## Artifacts written
- security-audit-plugin/.claude-plugin/plugin.json
- security-audit-plugin/skills/policy/SKILL.md
- security-audit-plugin/skills/agent-security/SKILL.md
- plugin-install/.claude/plugins/security-audit/<mirrored>
- <verify-output rows in scrollback>

## Substitutions
- cowork-plugin-management skill unavailable -> CLI manifest + SKILL.md authored inline
- ~/.claude/plugins/<name>/ -> ./plugin-install/.claude/plugins/<name>/
- "fresh session" -> conceptual; same scratch
- module-2/CLAUDE.md -> module-2/challenge.md if root CLAUDE.md absent
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
