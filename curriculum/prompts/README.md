# Curriculum Prompts — Centralised Registry

Source of truth for every `**Prompt**` block that appears in student-facing
curriculum. Module / exercise / lecture `.md` files reference entries here by
key; the build script (`scripts/build-workbook.js`) and the SPA
(`site/layouts/curriculum-spa.js`) both expand `{{prompt:<key>}}` markers into
the canonical inline shape before `marked` parses the markdown.

The output the student sees is byte-identical to the pre-registry inline form.

## Why this exists

Two reasons:

1. **Edit protection.** Prompts are the load-bearing instructional content.
   They must change only with maintainer review. Centralising them creates one
   audit surface for `PostToolUse` enforcement (see
   `.claude/hooks/prompt-approval-gate.sh`).
2. **Cross-prompt audit.** Path conventions, lead-in shape, back-reference
   discipline, banned-phrase scans — all easier to run against one directory
   than across every module file in every training.

## File shape

One prompt = one `.md` file. Filename matches the `key` field exactly (e.g.
`a101-prework-extract-tarball.md` has `key: a101-prework-extract-tarball`).

```markdown
---
key: a101-prework-extract-tarball
dest: Claude Code
context: optional
runtime: any
origin: agents-101/prework
---
Extract the starter tarball into the working folder.
Then list the top-level entries so I can see the layout.
```

### Frontmatter fields

**Core rendering fields** (consumed by the renderer at expansion time):

| field | required | values | meaning |
|---|---|---|---|
| `key` | yes | kebab-case | stable identifier; matches filename |
| `dest` | no | `Claude Code` (default), `Cowork`, `Builder Claude`, custom string | destination chip in rendered header |
| `context` | no | string | em-paren note after dest (e.g. `optional`, `final move of the module`) |
| `runtime` | no | `any` (default), `cli`, `cowork`, `desktop` | informational; future runtime-fork wrapping |
| `origin` | no | `<training>/<file>` or `exercises/<slug>` | must match the file where the `{{prompt:<key>}}` marker actually lives; helps grep + keeps the back-reference honest |
| `permission-mode` | no | `default` \| `acceptEdits` \| `plan` \| `auto` \| `bypassPermissions` | declared when the prompt's correct paste requires a specific Claude Code permission mode. Renders as a leftmost solid-accent chip in the prompt-block header. Omit when mode is not load-bearing (no chip renders, no constraint implied). See `check_prompts.md` rule 39. |

**Dependency-graph fields** (passed through to `prompts.json`; consumed by audit / lint scripts; inert at the renderer today):

| field | required | values | meaning |
|---|---|---|---|
| `requires` | no | list of `{id, source, conditional?}` | artefacts this prompt depends on. `source` is `prompt:<key>`, `module:<slug>`, `scrollback (...)`, or `external`. `conditional` flags order-dependent existence (e.g. `m3-completed`) |
| `produces` | no | list of `{id, location, consumed-by?, conditional?, note?}` | artefacts this prompt creates. `id` matches downstream `requires.id` for graph reconciliation. `location` is a filesystem path or `scrollback`. `consumed-by` is a forward index of `prompt:<key>` / `module:<slug>` references |
| `opportunistic-copy` | no | list of `{id, if-present-at, rationale}` | artefacts the prompt uses *if present* and no-ops on if absent. Different from `requires`: handled gracefully in the prompt body |
| `opportunistic-copy-by` | no | list of prompt refs (sibling of `consumed-by`) | added to a producer's `produces` entry to forward-index opportunistic copiers |
| `anchors` | no | list of `{move, span}` | reserved for future prompt-anatomy highlights; passed through to `prompts.json` but not rendered today. `move` is a move-catalog id, `span` is the verbatim quoted clause (see `curriculum/trainings/agentic-engineering-101/reference/prompt-anatomy.md`) |
| `note` | no | string | informal carve-out / context; readable inline alongside the structured fields |

**Linter:** every `requires.id` with `source: prompt:<key>` must resolve to a real producer; every `consumed-by` reference must match a downstream `requires.id`. Run with `python3` over the corpus; see `/Users/anttitevanlinna/Projects/agents-102` for the inline check script (no dedicated binary yet).

**Gate behaviour:** edits to dependency-graph fields (between the leading `---` markers) are NOT card-gated per `check_prompts.md` rule 22; frontmatter is metadata, the prompt body is the student-pasted content. See `.claude/hooks/prompt-edit-gate.sh` for the region-aware enforcement.

### Body

Plain prompt text, exactly as the student copies it. No surrounding fence
markers — those are added at expansion time. Trailing whitespace is trimmed.

## Naming convention

`<training-short>-<module-or-area>-<verb-noun>`

- `cb-` — Claude Basics
- `a101-` — Agents 101
- `ae101-` — Agentic Engineering 101

Examples:

- `a101-prework-extract-tarball`
- `ae101-m1-baseline-test`
- `cb-homework-folder-summary`

## Referencing a prompt from a module file

Module / exercise / lecture `.md` files contain only the lead-in and the
marker:

```markdown
Extract the starter tarball in the working folder.

{{prompt:a101-prework-extract-tarball}}
```

The lead-in stays in the module file (pedagogical narrative). The fenced
block content lives here.

## Validating

```bash
node scripts/lint-prompts.js
```

Fails on:

- Unresolved `{{prompt:<key>}}` reference in any curriculum `.md`
- Missing or invalid frontmatter

Warns on:

- Orphan registry entry (file with no references in curriculum/)

## Editing rules

Prompt edits are gated by `check_prompts.md` rule 22 (maintainer approval).

Two layers of enforcement protect this directory:

1. **Claude Code `PreToolUse` hook** (`.claude/hooks/prompt-edit-gate.sh`).
   Denies any `Edit`/`Write`/`MultiEdit` against `curriculum/prompts/**.md`
   inside Claude Code unless the human typed `APPROVED: <key>` in the same
   chat transcript, or the session is running with `SKIP_PROMPT_GATE=1`.

2. **Tool-agnostic git pre-commit hook** (`.githooks/pre-commit`). Fires on
   every `git commit` regardless of which agent or tool initiated it
   (Claude Code, Codex, manual git, IDE integrations). When staged changes
   include any file under `curriculum/prompts/`, prints the diff summary
   and asks for `y/N` confirmation from the committer.

### Setup (one time per clone)

```
git config core.hooksPath .githooks
```

Without this, the pre-commit hook is silent — the file lives in `.githooks/`
but git only consults `.git/hooks/` until `core.hooksPath` is pointed there.

### Bypass for legitimate bulk operations

Both hooks honour `SKIP_PROMPT_GATE=1`:

```
SKIP_PROMPT_GATE=1 git commit -m "..."
```

Or, for a Claude Code session doing batch migration:

```
SKIP_PROMPT_GATE=1 claude
```

Use sparingly — the gate exists because prompt edits ship to every student.
