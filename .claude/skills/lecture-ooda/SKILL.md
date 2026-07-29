---
name: lecture-ooda
description: Run a research OODA cycle scoped to ONE lecture or exercise, driven by the standing question in that file's `<!-- backing -->` block. Re-verifies the file's source stamps, hunts the named roster for stance movement, and writes findings to the block's Flagged list for discussion. Use when a lecture's subject may have moved, before a cohort, or when the backing block's `last-run` is stale. Does NOT edit student-facing body prose.
argument-hint: <lecture-or-exercise-slug>
---

# /lecture-ooda — one file, one research cycle

Per-file sibling of the platform-watch OODA (`continuous-research/platform-watch/cycle-prompt.md`). That one asks *"what moved across 12 platforms?"*. This one asks *"did the ground under THIS lecture move?"* — bounded by the standing question the file itself carries.

Format spec for the block this reads and writes → `curriculum/backing-format.md`.

## Preconditions

- Target file has a `<!-- backing -->` region. No region → stop, say so, offer to author one (that is a different job — read the body, enumerate claims, layer them).
- Resolve slug: `curriculum/lectures/<slug>.md`, else `curriculum/exercises/<slug>.md`. Ambiguous → ask.

## Step 1 · Read the brief

From the target's backing block: `OODA.question`, `OODA.roster`, `Stance`, `Sources`, and every `detail`-layer claim. That IS the brief — do not widen it. A lecture OODA that drifts into general landscape scanning has become the platform watch and should have been that instead.

Then read, in this order:
1. `continuous-research/user-signals/index.md` — Tier 0. A user signal touching this lecture's subject outranks the standing question.
2. `continuous-research/source-roster.md` — trajectories for the named roster.
3. The `platform-watch/*/state.md` the block names, if any.

## Step 2 · Two jobs, run in parallel

**Job A — re-stamp.** Every source in the block with `result:NEEDED`, `checked:never`, or `due` before the next cohort date. Open it. Record what you found. This is bookkeeping and needs no approval: an opened URL either holds or it does not.

**Job B — hunt the question.** People-first only (`continuous-research/CLAUDE.md` § Research Method). Fetch the named roster's own recent output — their blog, their X, their GitHub, their talk. Broad topic search is banned as a primary mode; use search only to locate a named person's output.

Aim at `Stance.would-move-it`. That field is the stopping condition. Absent a falsifier, "nothing moved" is a complete and useful result — record it as a `last-run` bump and stop. Do not manufacture a finding to justify the cycle.

**Run the research agents on Sonnet.** Not Opus, not Fable — `model: 'sonnet'` on every dispatched agent in both jobs. Fetching a page, checking a byline, and reading a practitioner's recent output is breadth work, and breadth is what Sonnet is for. Reserve the expensive model for the synthesis you do in the main thread, where the evidence-level call actually gets made.

Subagents do NOT read CLAUDE.md. Prepend `continuous-research/research-rules.md` verbatim to every dispatched agent, plus: *open the page and confirm the byline before applying `[practitioner direct]`* (the fan-digest laundering failure, `check_research_claims.md §1`).

## Step 3 · Write back — what lands directly, what stops

Maintainer-block region, so edits are ungated and not card-shaped (`check_prompts.md §22`, §26 carve-out). But authority splits three ways:

| what | where it goes | approval |
|---|---|---|
| Re-stamped source (`checked`/`result`/`due`) | `Sources`, in place | none — a fact you observed |
| `last-run` bump | `OODA` | none |
| Stance movement, new contested item, level change | `Flagged`, as a proposal | **discuss before the `Stance` field changes** |
| Proposed edit to body prose above the divider | `Flagged` only — never applied here | one card at a time (`check_prompts.md §26`) |

Flagged entry shape: `` - `[found:YYYY-MM-DD]` <what changed> → <the discussion it forces> ``

The arrow is load-bearing. A finding with no forced decision is a note, and notes accumulate. If you cannot name what the finding makes someone decide, it is not flagged-worthy — it is a re-stamp.

Never edit above `<!-- maintainer -->` in this skill. Not a style rule: the whole reason the block is a safe write target is that the OODA cannot reach the prose.

## Step 4 · Deposit to the research base

**A finding that lands only in a lecture's Flagged list is a wasted cycle.** The lecture is one consumer; the KB is the compounding store. Every run deposits what it learned, then the curriculum reads from a base that got richer.

Route by what the finding IS, not by which lecture asked:

| finding | goes to |
|---|---|
| A practitioner not yet tracked | `source-roster.md` — name, venue, trajectory, why they matter, WATCH line |
| A named company case with a practice + outcome | `observations/<company>.md` (check `observations/README.md` first — update beats duplicate) |
| A pattern across companies, or an evidence-level move on an existing one | `findings/by-pattern/<pattern>.md` |
| A capability/platform delta on a coding agent | `platform-watch/coding-agents/state.md` |
| A compressed argument usable in training or advisory | `insights.md` — thesis, argument, where it came from |
| **A confirmed absence** | the relevant domain file's *What We Did Not Find* section |

That last row is the one that gets skipped, and it is often the most valuable. "Hunted the falsifier across six named practitioners over six months, found no published account of a decayed team kit" is a real result. Absence of evidence, recorded with the hunt that produced it, is worth more than another confirming case — and it stops the next cycle re-running the same empty search.

**Deposit rules:**
- Same bar as any research write. Evidence ladder, source-type label, freshness, three gates (`research-rules.md`). A finding good enough for a lecture is not automatically good enough for the KB — it is the same bar, applied again.
- **Never write a curriculum reference into `continuous-research/`.** That directory is public under its own licence; `curriculum/` is proprietary. Deposited findings are research on their own terms, standing without the lecture that prompted them. If a finding only makes sense as "this backs lecture X," it is not a research finding — it is a maintainer note, and it belongs in the backing block.
- The reverse edge — which lectures depend on which KB file — lives on the proprietary side. Add `kb:<path>` to the source stamp in the backing block, and `node scripts/validate-backing.js --kb-index` builds the index. That is how a later platform-watch cycle touching `by-pattern/X.md` learns which lectures it just moved the ground under.
- New/modified file under `findings/**` or `synthesis/**` → run `/research-review <file>` before it ships. Four personas, parallel.

## Step 5 · Back-sweep

Corrected a source-type label, an evidence level, or a number that other files also cite? Re-grep every sibling that cites the same URL or claim, and fix-or-flag in the SAME pass (`check_research_claims.md §1`, back-sweep). A correction confined to the catching file leaves the corpus self-contradictory — worse than no catch, because the stale sibling still reads authoritative.

```
grep -rln "<url-or-distinctive-phrase>" curriculum/
```

## Step 6 · Report

Status one-liner, then findings. Per `check_research_claims.md §5`, report in tentative register — *"one read is X — does that match?"* — not *"the lecture should now say X."* Research synthesis and curriculum implication are separate conversations, and the second one is Antti's.

Hold short OODA loose (§4): a single cycle is not a decision. Six practitioners is not Level 3. If this run found two people saying the same thing, that is L2 and the stance says L2.

## What this does NOT do

- Edit student-facing body prose. Proposals only, as cards, after discussion.
- Rewrite `Stance` unilaterally. Findings land in `Flagged`; the stance moves in conversation.
- Run the platform watch. Cross-platform sweeps belong to `cycle-prompt.md`; this is bounded to one file's question.
- Fabricate a finding. "Nothing moved" is a result — bump `last-run` and say so.
- Write curriculum references into `continuous-research/`. The fence is a licence boundary, not a preference.
- Let a finding die in the backing block. Step 4 is not optional; a cycle that deposits nothing spent its tokens on one file.
