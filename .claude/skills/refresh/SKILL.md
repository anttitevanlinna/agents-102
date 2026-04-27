---
name: refresh
description: Proactively audit the memory store and content-creation rule surfaces for staleness. Walks memory/, memory/compounded/, memory/check_*.md, and the content-creation/article/self-study skills. Outputs Keep / Update / Consolidate / Replace / Delete candidates with one-line reasons. Antti approves interactively.
argument-hint: [scope] (memory | compendiums | skills | all)
---

# /refresh — proactive staleness audit

Memory drifts. Compendium rules drift. Skills embed instructions that may contradict the live `bosser-strategy:content-strategy.md` or the published `ai-training/` site. Nobody notices until we act on something wrong.

This skill audits the learning store and surfaces stale candidates. It does NOT edit anything without Antti's approval — every proposed change is shown as a diff first.

Memory root: `/Users/anttitevanlinna/.claude/projects/-Users-anttitevanlinna-Projects-agents-102/memory/`

## When to invoke

- **Opt-in cadence:** monthly, or after a large content session (post-module-build, post-article-ship, post-major-strategy-shift)
- **Triggered by friction:** when the same correction appears despite a compendium rule being present (signals the rule isn't landing — audit which memory is consulted vs. which is forgotten)
- **Explicit invocation:** `/refresh memory` / `/refresh compendiums` / `/refresh skills` / `/refresh all`

Do NOT invoke as routine maintenance every session. The cost of running this is Antti's attention.

## Scopes

### `memory` — files under `memory/`

For each `project_*.md`, `feedback_*.md`, `reference_*.md`, `storytelling-principles.md`, `copy-taste.md`, `voice-guide.md`:

- **Referenced path check:** grep for relative and absolute paths in the file. Does each referenced file still exist? Mark broken pointers.
- **Consistency check:** if the memory claims a fact about the curriculum architecture, compare against `bosser-strategy:content-strategy.md`, `curriculum/CLAUDE.md`, `curriculum/lecture-guardrails.md`. Contradictions = stale.
- **Supersession check:** if another memory file contradicts this one (different decision about the same topic), mark for Consolidate.
- **Last-touched heuristic:** if the file hasn't been referenced in any session transcript or git log in 6+ months AND describes ephemeral project state, mark for possible Delete.

### `compounded` — files under `memory/compounded/`

For each entry:
- **Schema validation:** required fields present and enum values correct per `memory/compounded/_schema.yaml`.
- **Rule-lives-elsewhere check:** if `violates_rule` points at a compendium rule, grep the compendium — does the rule still exist there? If not, either restore it or mark the compounded entry as stale.
- **Amendment followup:** if `proposed_compendium_amendment` is non-empty and the compendium doesn't include that one-liner yet, flag for Antti's approval (might have been deferred).

### `compendiums` — files under `memory/check_*.md`

For each:
- **Rule freshness:** any rule that references a specific incident, person, or session-artifact older than 6 months and not re-referenced since → flag for Update (generalize or retire).
- **Contradiction across compendiums:** `check_writing.md` vs `check_sales_copy.md` vs `check_student_facing.md` — do two compendiums give conflicting advice on the same surface? Flag for Consolidate.
- **Skill-sync:** `check_student_facing.md` rules should match `.claude/skills/self-study/SKILL.md` and `.claude/skills/content-creation/SKILL.md`. `check_sales_copy.md` rules should match `ai-training/design.md § 6`. Flag divergences.

### `skills` — files under `.claude/skills/*/SKILL.md`

For each:
- **Pointer integrity:** any path referenced exists.
- **Rule-file pointer integrity:** if a skill says "prepend `.claude/rules/X.md`" — does the file exist?
- **Canonical-home consistency:** if the skill embeds rules inline that ALSO live in a compendium, flag for "prune inline, point at compendium."

### `all`

Run all four scopes in parallel (launch via Explore/general-purpose subagents, each writing summary to `/tmp/refresh-{scope}.md`). Orchestrator reads summaries and presents a unified punch list.

## Five outcomes per file

Tag each flagged file with one of:

| Tag | Meaning | Default action |
|---|---|---|
| **Keep** | fine as is | no change |
| **Update** | drift-fix (rename, path update, minor rewording) | show diff, apply on approval |
| **Consolidate** | overlaps heavily with another file → merge into it | show merged version + deletion of source, apply on approval |
| **Replace** | superseded by a newer decision; rewrite from scratch | show rewritten version, apply on approval |
| **Delete** | ephemeral state that no longer applies | show one-line reason, delete on approval |

## Output format

A single punch list:

```
## /refresh audit — <date> — scope: <scope>

### Update (N)
- `memory/project_xyz.md` — broken pointer to `curriculum/old-path.md` (moved to `curriculum/new-path.md` on <date>)
- ...

### Consolidate (N)
- `memory/feedback_a.md` + `memory/feedback_b.md` → merge into `memory/check_writing.md` (both now covered there)

### Replace (N)
- ...

### Delete (N)
- `memory/project_old_thing.md` — decision reversed; git log commit abc123

### Keep (N)
- <summary count only, not listed>
```

Show Antti the list. Ask: *apply all Updates? Review Consolidates one by one? Defer Deletes?*

Never bulk-apply without approval. Never run on untracked changes without warning Antti first (a rogue `/refresh` during in-progress work can nuke valuable scratch).

## The real test

A month after running `/refresh`, is the memory store *more* trustworthy? Or did it cause churn that broke session-start workflows? If the latter, the audit wasn't selective enough — the bar for Update/Replace/Delete should be higher, not lower.

Churn is not compounding. The goal is a smaller, sharper store — not a cleaner one by artifact count.
