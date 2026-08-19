---
name: compound
description: Turn a correction, pattern, or decision into a durable schema-validated memory entry that fires at generation time. Invoke at end of session, or after any significant correction. For content/pedagogy/sales corrections, also applies a one-line amendment to the relevant check_*.md compendium and reports the landed diff.
argument-hint: [session | correction | pattern | decision | taste]
---

# /compound — corrections become load-bearing rules

This skill closes the compounding loop. Self-review captures corrections in free-form memory files; `/compound` promotes them into structured, schema-validated entries at `memory/compounded/` AND (when applicable) amends the `check_*.md` compendium that fires at generation time. **One edit, every future agent learns.**

Memory location: `/Users/anttitevanlinna/.claude/projects/-Users-anttitevanlinna-Projects-agents-102/memory/`

## When to invoke

- **End of session** — after Antti says "we're wrapping up." Capture the top 1–3 corrections/decisions from the session.
- **Immediately after a correction** — when Antti redirects an approach, and the correction is strong enough to carry forward.
- **On a pattern observation** — when the same kind of correction has occurred 2+ times across sessions.

Do NOT invoke for trivial edits ("fix a typo"), conversational back-and-forth, or ephemeral task state.

## The flow

### Step 1 — Classify

Ask (or infer from context):

1. **type:** `correction | pattern | decision | taste`
2. **surface:** `writing | sales_copy | student_facing | prompts | lectures | strategy_tie_in | pedagogy | content_creation | research | platform | strategy`
3. **severity:** `low | medium | high | critical`
   - `high` if this correction has happened before (check `memory/compounded/` + `memory/feedback_*.md` + self-review correction log)
   - `critical` if un-fixed, it ships to a buyer or student

### Step 2 — Overlap check (before writing anything)

Read filenames in `memory/compounded/` filtered by the `{surface}` tag in the filename. Grep the relevant `memory/check_{surface}.md` compendium for keywords from this correction.

**Three outcomes:**

- **High overlap** with an existing `memory/compounded/` entry → **update** that file; bump severity if it's a recurrence; append `session_date` to a list; do NOT create a new file.
- **High overlap** with a `check_*.md` compendium rule that's already there → rule exists, not landing. Capture WHY the rule didn't fire (timing? missing forcing function?). Update `severity` to `high` and write a new entry with `violates_rule:` pointing to the existing compendium rule. The fix is not "add the rule" — it's a pre-flight/hook fix.
- **Low overlap** → write a new `memory/compounded/{YYYY-MM-DD}-{surface}-{slug}.md` entry.

### Step 3 — Write the entry

Use this template:

```markdown
---
type: correction
surface: sales_copy
severity: medium
tags: [earn-every-term, callout-length]
violates_rule: "check_sales_copy.md § earn every term"
example_from_session: "55-word callout with veto-stakeholder, compounding substrate, authoring move"
counter_example: "20-word callout: the agent, the output, what changed"
proposed_compendium_amendment: "(add to check_sales_copy.md § earn every term): Callouts over 30 words almost always smuggle strategy-doc vocabulary past the cold-read. Budget 20–30 words; cut the parentheticals."
session_date: 2026-04-22
---

# {Short title}

{One paragraph: what happened, in plain English. Specific to the session so a future Claude can recognize the same shape.}

{One paragraph: the rule, imperative. "Do this, not that."}

Canonical home: {pointer to the compendium/skill/curriculum doc where this rule also lives, if applicable}
```

Validate against `memory/compounded/_schema.yaml` — required fields present, enum values correct.

### Step 4 — Do NOT index in MEMORY.md; confirm the amendment instead

**Do not add a per-entry line — this step was retired 2026-08-02 and the instruction to append one is what kept coming back.** `MEMORY.md` used to carry a gist list of recent compounded entries and deliberately dropped it: every line there is always-loaded weight paid each session for a lookup that fires occasionally, and the index grew faster than anything read it. Its § *Compounded learnings* now says so in its own words and gives the scan commands instead (`ls memory/compounded/`, `| grep <surface>`, `grep -l <keyword>`, `/session-historian`).

**Recall does not run through `MEMORY.md` anyway — it runs through the compendium.** An entry compounds because `check_{surface}.md` fires at the generating surface (Step 6), not because a link exists in an index. If the amendment landed, the entry is reachable at the moment it matters; if it did not, an index line would not have saved it.

So Step 4 is a check, not a write: **confirm the entry's `proposed_compendium_amendment` is non-empty and that Step 6 will apply it.** Empty amendment on a `correction` or `pattern` entry → the entry is a diary page. Either write the amendment or reclassify it as `decision`/`taste`, where a durable record without a firing rule is legitimate.

### Step 5 — Strike the source from `self-review-protocol.md`

If the correction came from a session-log entry in `memory/self-review-protocol.md` (the most common path — self-review surfaces it, `/compound` promotes it), **strike that entry** in the same edit cycle.

Mechanism: open `self-review-protocol.md`, find the matching narrative under the dated session entry, delete the bullet/paragraph. The compounded entry is the canonical record now; a duplicate in the session log is sediment.

If the correction came from elsewhere (immediate post-correction `/compound` mid-session, or pattern-observation across sessions), nothing to strike.

The principle: a correction lives in **one canonical home**. Either the session log (small / not yet ripe for compounding) or the compounded entry + matching compendium (escalated). Never both.

### Step 6 — Apply the compendium amendment (content/pedagogy/sales/prompts/lectures/strategy_tie_in surfaces)

If `proposed_compendium_amendment` is non-empty, **apply it.** Add the one-liner to the relevant section of `check_{surface}.md` and commit with a pointer to the compounded entry.

A compendium is not a student-facing surface, so it is not card-shaped (`check_prompts.md §26`). Do not ask *"apply now? (y/n)"* — that was the old shape and it defeated the skill's purpose: a rule held in a proposal queue is a rule that does not fire at the next generation, which is exactly the failure this skill exists to close. The correction that prompted the amendment has already been made by Antti; re-asking for permission to write it down spends his attention on a decision he just took.

**Then repin the compendium ledger.** `node curriculum/evals/scripts/compendium-drift.js --repin` — the amendment you just landed changes what a judge would say, and every pinned verdict older than the amendment was taken against the previous wording. The repin dates the moved rule so `scan-stale-classes.js` can bill the re-judge as `rule-drift`. Skip it and the amendment is invisible to the eval machinery: the rule fires at generation time and nothing re-checks the corpus already shipped against it.

**Apply is not silent.** Show the landed diff in the report — the amended rule, quoted, and which section it went into — so the amendment is visible and revertable. If it is wrong, one word reverts it, and that costs far less than a rule sitting unapplied for a month.

**Where the stop still is:** if the correction implies an edit to student-facing body text or a prompt body, that edit is a card (BEFORE / AFTER / WHY / RISK, one at a time). The compendium amendment lands now; the curriculum edit waits.

### Step 7 — Check for escalation

After writing, check: did this correction's `severity` just go from `medium` → `high` (i.e., recurrence)? If yes, flag:

> Recurrence detected: {rule} has been violated {N} times across sessions. The rule exists in `check_{surface}.md` but doesn't fire at generation time. Consider:
> - Adding a forcing function (pre-flight hook, pre-commit gate)
> - Making the rule more specific/findable
> - Promoting it from compendium to `.claude/rules/` where subagents auto-inherit it

## What this skill does NOT do

- **Replace self-review-protocol.md.** Self-review runs end-of-session, mines the transcript, and produces the *raw* correction list. `/compound` takes one of those corrections and promotes it to structured form. Both exist.
- **Card internal edits.** Compendium amendments, `memory/compounded/` entries and `.claude/rules/` land directly and get reported, not proposed (`check_prompts.md §26`). Only an edit a student will read is card-shaped. Antti reverts what he doesn't want; that is cheaper for him than approving what he already asked for.
- **Bulk-migrate legacy `feedback_*.md` memories.** That's a `/refresh` job. This skill only writes new compounded entries.

## The real test

A week from now, in a session with a different Claude, does the compounded entry *actually* prevent the same mistake? If the rule lives in `memory/compounded/` but was never consulted (because the surface compendium wasn't loaded at generation time, because the pre-flight hook didn't fire), the skill failed. That failure is itself a compound entry — write it down, escalate.

Memory is load-bearing when it changes behavior. Otherwise it's journaling.
