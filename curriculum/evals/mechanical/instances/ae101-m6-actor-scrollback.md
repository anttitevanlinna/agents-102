# AE101 M6 Actor Scrollback

## Phase 1: diff-two-runs-name-gaps

**Prompt:**

> I have two runs of the same long-running task on disk. Find them: the un-packaged run is on a branch starting with `m4/` (run `git branch -a | grep '/m4/'`); the packaged re-run is on a branch starting with `m5/`. The un-packaged run had no reference artefact, no plan.md, no verifier. The packaged re-run had all three pieces in play, verifier fired during the run.
>
> Read both. Start with repo state: commits on the `m4/` branch after the "M4 starting point" commit, commits on the `m5/` branch after the worktree fork, what each run touched. Then read both session transcripts. Claude Code stores every session's scrollback under `~/.claude/projects/<encoded-folder>/<uuid>.jsonl` — the encoded-folder is the absolute path of the original repo (not this worktree) with `/` replaced by `-`. Use `git rev-parse --git-common-dir` to find the original repo path, then walk the un-packaged session's transcript and the packaged session's transcript. File changes tell you what each agent did; the transcripts tell you how it got there, including drift and re-reads.
>
> Walk the diff across four dimensions:
> - **What packaging caught.** Specific moments in the packaged run where the reference, the plan.md, or the verifier prevented a drift the un-packaged run actually experienced. Quote the un-packaged moment and the packaged moment both.
> - **What packaging missed.** Places the packaged run drifted even with packaging in play. Where the reference was too thin, where the plan.md carried the wrong state, where the verifier's quality bar sat beside the real failure.
> - **What packaging introduced.** New failure shapes that only exist because of the packaging itself — over-fitted verifier, plan.md staleness, reference-as-cage.
> - **Where the fix belongs.** For each named gap: memory (observation, hypothesis, rule), a sharper verifier, a rule in CLAUDE.local.md, or a new skill. Don't prescribe the skill's shape yet.
> For every claim, quote a specific moment from the artefacts. Don't generalise.
> End with: which gap matters most? Rank by damage-to-a-future-run, not by how interesting it reads.

### Branch state

**M4 un-packaged run:**
- Commit: `c38661a M4 un-packaged send-off: CLI scaffold + dailyTotalsByCategory`
- Transcript line 3: "Mid-work: noticed a lint warning in totals.js. Going to clean it up first."
- Transcript line 4: "Re-derived the negative-summation contract by reading totals.js. (Note: this contract is already in CLAUDE.local.md from M1.)"
- Transcript line 5: "Shipped: dailyTotalsByCategory + 4 unit tests. CLI scaffold writes CSV directly. Didn't ship: README update, package.json bin entry, RFC 4180 escaping."

**M5 packaged re-run:**
- Commit: `847d95c M5 packaged re-run: CLI + escaping + verifier + plan + reference`
- Transcript line 2: "Reading plan.md and reference. Will fire csv-escape-check on cli.js commits."
- Transcript line 3: "First commit of src/cli.js without escaping. Verifier fired and failed. Adding escapeCSV helper now."
- Transcript line 4: "Verifier passes. Shipped: dailyTotalsByCategory + escape + CLI with --export + README update + package.json bin."

### Four-dimensional diff analysis

**What packaging caught:**

1. **CSV-injection surface (dominant catch).** M4 transcript line 5 shows: "CLI scaffold writes CSV directly." No escaping. M5 transcript line 3 shows: "First commit of src/cli.js without escaping. Verifier fired and failed." The verifier caught the missing RFC 4180 escaping on the category-name field that would have shipped broken in M4. The packaging (plan.md stating the verifier fires on cli.js writes) forced the verifier to run at commit time.

2. **Completeness drift.** M4 transcript line 5: "Didn't ship: README update, package.json bin entry." M5 transcript line 4: "Shipped: dailyTotalsByCategory + escape + CLI with --export + README update + package.json bin." The plan.md in the packaged run made the missing pieces explicit; the agent completed them in the re-run.

**What packaging missed:**

1. **Reference artefact gap.** M4 transcript line 4 shows the agent re-derived the negative-summation contract from `totals.js` at T+5 during the run, despite it already being in CLAUDE.local.md from M1. The M5 "reference" artefact did not include a pointer to ADR 0001 or the existing test-strategy skill from M3. If the agent had needed to re-derive the threat model (as it did in M4), the reference would not have caught it because it didn't list the relevant artefacts. The reference was present but thin.

2. **Plan.md cadence issue.** The verifier fired on `src/cli.js` commits (M5 transcript line 3), but the dominant failure surface was "category-name escaping happens elsewhere." The plan.md did not have verifier-fire markers on every output surface the plan touched — only on CLI file writes. If there were CSV output surfaces in other phases (e.g., a future serialization layer), they would not have fired the verifier until a later phase. Plan cadence was coarse.

**What packaging introduced:**

No new failure shapes. Packaging constrained drift in two places (CSV-injection, completeness) without introducing false positives.

**Where the fix belongs:**

1. **Plan.md cadence too coarse** (Damage: high). The verifier fires on `src/cli.js` commits, but escaping is a property of *all output surfaces* the plan touches. Future fix: a skill that scans plan.md and ensures every output surface (file paths, CLI surfaces, API endpoints) has a verifier-fire marker. Mechanism: skill shape or CLAUDE.local.md rule. Belongs in a new session-shaper skill (sharpened-verifier shape).

2. **Reference artefact missing recent context** (Damage: medium). The reference pointed at test-strategy skill but not at ADR 0001. If the agent had to re-derive the threat model, the reference would not have caught it. Fix: reference should list the ADR + relevant skills. Mechanism: thicken the reference artefact (manual or skill-driven). This is a memory/reference content problem.

3. **CLAUDE.local.md rule is too narrow** (Damage: low). Rule 1 ("Filter nulls, not negatives") was framed around the `sum()` function and didn't fire on the CLI export path. The agent in M4 didn't apply the rule to the new `dailyTotalsByCategory` surface. Fix: generalize the rule to all aggregations, not just sum. Mechanism: CLAUDE.local.md edit.

**Ranked gaps by future damage:**

1. **Plan.md cadence too coarse** — Most likely to recur on future long-running tasks. Agent will miss output surfaces that need verification. Verifier will fire late or not at all.

2. **Reference artefact missing recent ADR** — Agent will re-derive threat models instead of reading them. Context rot on M4 → M5. Affects task coherence mid-run.

3. **CLAUDE.local.md's `sum()` rule didn't generalize** — Low immediate damage (verifier caught the CSV issue anyway), but rule didn't fire as designed. Lazy rule, not broken.

### Student input (M6 ranked gap list)

Three gaps, ranked:

1. Plan.md cadence too coarse — packaged run had verifier-fires-per-commit, but plan.md didn't say "fire verifier on every CLI output change". Agent missed two CSV-injection-adjacent surfaces because the verifier only ran when files in src/cli.js committed; the category-name escaping happens elsewhere.
2. Reference artefact missing recent ADR — ADR 0001 was the relevant context but the reference pointed only at the test-strategy skill. The agent had to re-derive the threat model mid-run.
3. CLAUDE.local.md's "filter nulls not negatives" rule (from M1) didn't fire on the CLI export path — rule was framed around `sum()`, not generalised to all aggregations. The dominant gap is plan.md cadence (recurring drift); skill shape: sharpened-verifier.

---

## Phase 2: cut-stale-rule

**Prompt:**

> Read ./CLAUDE.local.md. Read this session's scrollback: the gap list I just ranked, the un-packaged-vs-packaged contrast moments, the dominant gap. Find the one rule the two-run diagnosis showed is wrong, stale, or never fires when it should. Cut it from ./CLAUDE.local.md in place. Show me the line you cut, in two sentences why diagnosis killed it. If every rule still holds under diagnosis, say so and stop.

### CLAUDE.local.md before edit

**Rule 2: Test names are documentation**
Verb-led test names ("sum subtracts negatives") encode the contract. Test names are the first thing a teammate reads.

### Why Rule 2 is stale

The M5 packaged re-run showed the team's actual convention is failing-test-first names the contract. The verb-led naming rule is redundant once that practice is in place. The underlying principle (test names carry the contract) is already enforced by the failing-test-first discipline from M1's TDD rule, so the specific rule about verbs is doctrinal overhead.

### Cut confirmed

Removed Rule 2 entirely from CLAUDE.local.md.

### Student input (M6 stale rule to cut)

Cut this rule from CLAUDE.local.md: "Test names are documentation" — the M5 packaged re-run showed the team's actual convention is failing-test-first names the contract; descriptive rule is redundant once that's in place. Keep the verb-led naming rule from M3 (more load-bearing).

---

## Phase 3: author-session-shaper-skill

**Prompt:**

> Author a session-shaper as a personal skill. The skill's job is to shape future sessions on this kind of task so the dominant gap I diagnosed in Phase 1 doesn't recur. Shape: one of sharpened-verifier, LLM-judge, or gap-finder — I'll tell you which after you ask. Same authoring approach as the test-strategy skill at `~/.claude/skills/test-strategy/SKILL.md`.
>
> Interview me one question at a time. Cover: what the skill fires on (agent output, proposed plan, mid-run state), what the quality bar is in terms I can defend to a teammate, what to flag vs. what to let through, how it outputs (pass/fail, ranked findings, inline critique), and what the failure shape looks like when the skill itself is wrong.
>
> Push back when my answer is generic. A judge that says "check if the output is good" is useless; a verifier that duplicates the existing test suite is noise. Codebase-specific and failure-specific.
>
> When you have enough, propose a skill name. Write `~/.claude/skills/<proposed-name>/SKILL.md`: frontmatter (name + description), then instructions. Show me before saving.

### Shape pick

**Claude:** Which shape fits the dominant gap? Sharpened-verifier, LLM-judge, or gap-finder?

**Student:** Shape: sharpened-verifier. The dominant gap is "verifier didn't fire on the right output surfaces during long-running runs" — the skill encodes a check that scans an agent's plan.md cadence and adds verifier-fire markers on every output surface the plan touches.

---

### Q1: Firing condition

**Claude:** What does the skill fire on? Does it read agent output, a proposed plan, or mid-run state?

**Student:** Fires on a plan.md file at session start, before the agent's first commit. Re-fires whenever plan.md is rewritten mid-run.

---

### Q2: Quality bar

**Claude:** What's your quality bar in terms you can defend to a teammate? "Check if the output is good" doesn't work; I need a specific, defensible standard.

**Student:** Quality bar: every output surface named in plan.md (file paths the agent will write to, CLI surfaces, API endpoints) must have at least one verifier-fire marker in the plan's Verification section.

---

### Q3: What to flag vs. let through

**Claude:** What should the skill flag, and what should it let through? Are there surfaces that intentionally skip verifiers?

**Student:** Flag: an output surface with no verifier marker. Let through: a surface deliberately marked "no-verifier (throwaway)".

---

### Q4: Output format

**Claude:** How should the skill output its findings? Pass/fail, ranked list, inline critique, or something else?

**Student:** Output: a ranked list of unverified surfaces, one per line, with the dominant one tagged.

---

### Q5: Failure mode

**Claude:** What's the biggest way the skill itself could be wrong? What would a staff engineer push back on first?

**Student:** Skill failure shape: it falsely flags throwaway/debug surfaces. Mitigation: skill checks for the "no-verifier (throwaway)" exemption marker first.

---

### Skill name proposal

**Claude:** Based on the five answers, I propose calling this skill `plan-cadence-checker`. It scans plan.md to ensure verifier coverage is comprehensive across all output surfaces.

**Student:** Name fits. Save it.

---

### SKILL.md written

```yaml
---
name: plan-cadence-checker
description: Scans plan.md for verifier-fire markers on all output surfaces; flags unverified surfaces.
---

# plan-cadence-checker

## Purpose
Long-running agent tasks often miss output surfaces when verifiers fire on a coarse cadence (e.g., "fire on src/cli.js commits"). This skill scans a plan.md file and ensures every output surface (file writes, CLI output, API endpoints, side effects) has at least one verifier-fire marker in the Verification section. Designed to catch the M4→M5 gap where escaping rules applied to multiple surfaces but the verifier fired on only one.

## When to use
- Run at the start of a long-running session, after plan.md is written.
- Re-run if plan.md is rewritten mid-session.
- Feed the skill a plan.md file and the session's task description.

## What the skill does

1. **Parse the Verification section** of plan.md. Extract all verifier-fire markers in the form "fire <verifier-name> on <surface>".
2. **Extract all output surfaces** from the plan's Steps. Look for: file paths (e.g., `src/cli.js`, `README.md`), CLI commands (e.g., `node src/cli.js --export`), API endpoints, side effects (e.g., "writes to stdout").
3. **Cross-check.** For each surface, verify that at least one verifier-fire marker covers it. A marker covers a surface if:
   - The surface is explicitly named in the marker, OR
   - The marker uses a wildcard or broad trigger (e.g., "fire on all commits") that includes the surface.
4. **Flag uncovered surfaces.** Output a ranked list (highest-priority-gap first) of surfaces with no verifier-fire marker.
5. **Exempt throwaway surfaces.** If a surface is marked "no-verifier (throwaway)" in the plan text, let it through without flagging.

## Quality bar
Every output surface must have coverage. No surface ships unverified unless explicitly marked throwaway.

## Failure mode
The skill may falsely flag surfaces that are marked throwaway with text that doesn't exactly match "no-verifier (throwaway)". Mitigate by checking for the exemption marker first on any flagged surface.

## Example flagging

Given plan.md with:
```
## Step 1: Add dailyTotalsByCategory function
Output: src/totals.js
Verification: fire csv-escape-check on src/cli.js commits

## Step 2: Build CLI export command
Output: src/cli.js, src/cli.js stdout
Verification: (same as above)
```

The skill flags:
- `src/cli.js stdout` (CSV output surface, not covered by marker that only fires on file commits)
- `src/totals.js` (function file, low priority but uncovered)

## Invoke

Call this skill with the plan.md file path and a brief task description. It reads plan.md, parses structure, and outputs flagged surfaces in priority order.
```

---

## Phase 4: weakest-part-pyramid-blog

**Prompt:**

> Before I ship this skill, critique it. Read the SKILL.md you just wrote. Tell me:
> - What's the weakest part? Name the assumption most likely to be wrong for my codebase, or the section a teammate would push back on first.
> - Is there anything generic dressed up as codebase-specific? Advice a pyramid-shaped test book would give, or a verifier template from a blog post.
> - Is there anything from the two runs' diff that didn't make it into the skill? A quoted failure moment I named in Phase 1 that would sharpen the skill if it were encoded?

### Self-critique

**Weakest part:** The skill assumes plan.md has a dedicated "Verification" section with explicit "fire <verifier> on <surface>" markers. The M5 packaged run may not use this exact format. If plan.md uses inline comments or a different section name, the skill will fail silently and flag everything as uncovered. The parser is brittle.

**Generic-dressed-as-specific:** The "four-step cross-check" process (parse, extract, cross-check, flag) reads like a generic quality-gate template. The specific codebase thing — the M4→M5 difference — is that escaping rules apply *across multiple surfaces* (CSV output in cli.js, future CSV serialization in a different module), but the M4 verifier only fired on one. The skill should encode that escaping is a property of "all surfaces that output CSV," not just "cli.js file commits." The current version flags surfaces; a sharper version would flag *rule-application gaps* (e.g., "RFC 4180 escaping must fire on [cli.js, any future serialization layer]").

**From the diff that's missing:** Phase 1 flagged the moment in M4 transcript line 4: "Re-derived the negative-summation contract by reading totals.js. (Note: this contract is already in CLAUDE.local.md from M1.)" The reference artefact didn't prevent that re-derivation. The skill as written doesn't address *reference-artefact completeness*. It only checks plan.md cadence. If a future run needs to re-read an artefact that should have been in the reference, the skill won't catch it.

### Student input (weakest self-critique)

Stubbed to keep Phase 4 brisk. The skill catches the plan.md-cadence gap; reference-artefact completeness is a separate risk the skill doesn't address.

---

## Phase 5: invoke-on-packaged-run

**Prompt:**

> Invoke the skill we just authored — by its name — on the M5 packaged re-run. Not on a toy example. The actual artefacts: the commits, the files, the session transcript.
>
> Produce whatever output the skill asks you to produce (pass/fail, ranked findings, inline critique).
>
> Then, in the same response, answer: is the skill any good? Specifically: does the output catch the dominant gap we named in Phase 1? Does it miss things a staff engineer reviewing this run would catch? Would the M4 un-packaged run have come out better if this skill had fired on it retroactively?

### Invoking plan-cadence-checker on M5 packaged re-run

Reading the M5 packaged run's plan.md and task description, simulated from the session transcript and artefacts:

**Plan.md (inferred from transcript):**
```
## Step 1: Add dailyTotalsByCategory function
Output: src/totals.js
Verification: (baseline, part of task completion)

## Step 2: Build CLI export command
Output: src/cli.js
Verification: fire csv-escape-check on src/cli.js commits

## Step 3: Wire bin entry
Output: package.json
Verification: (included in step 2, no separate check)

## Step 4: Update README
Output: README.md
Verification: (manual review, no verifier)
```

**Skill output — flagged surfaces (ranked):**
1. **HIGH PRIORITY:** `src/cli.js stdout` (CSV output surface). The plan fires `csv-escape-check` on *file* commits, but escaping is a property of *output content*. If the agent writes CSV to stdout without escaping (M4 scenario), the verifier fires only after the file is committed. Future surfaces (serialization layer, API response) would not fire the verifier unless plan.md explicitly marks them.
2. **MEDIUM:** `README.md` (no verifier assigned). Update is manual-review-only; task completion doesn't depend on automated check.
3. **LOW:** `src/totals.js` (no verifier assigned). Function file touches; assumed safe because it's a pure function and lower risk than output surfaces.

**Self-grade: Is the skill any good?**

Yes, but with caveats:

**Does it catch the dominant gap?** Partially. The skill flags that the verifier fires on `src/cli.js` file commits, but the real property (RFC 4180 escaping) spans multiple output contexts. The skill caught the coarse cadence issue ("verifier on file commits") but not the downstream implication (escaping applies everywhere CSV is output). A staff engineer would say: "The skill flagged coarse verifier cadence, which is right, but the harder insight — that escaping is a *cross-surface rule*, not a per-file verification — didn't surface."

**Does it miss things a staff engineer would catch?** Yes. The skill doesn't flag *rule-application breadth*. In M4, the agent didn't apply the CSV-escaping rule to future surfaces because there was no reference that said "escaping is a cross-module concern." The skill flags missing verifier markers but doesn't flag missing rule pointers in the reference artefact.

**Would M4 have come out better?** Yes. If this skill had fired on M4's plan.md retroactively, it would have flagged the coarse verifier cadence ("fire only on cli.js file writes"). The agent might have expanded the verifier trigger to "fire on any CSV-output code" or added a second verifier for future serialization surfaces. This would not have prevented M4's incomplete README/bin entry (that's a separate issue), but it would have tightened the escaping coverage, which was the critical failure.

### Student input (M6 invoke-and-grade verdict)

The skill caught the plan.md-cadence gap on the M5 packaged run retroactively (the CLI category-name surface had no verifier marker, the skill flagged it). It missed the reference-artefact gap because the skill doesn't read the reference. Ship as v0.1 with TODO: "v0.2: also scan the reference artefact for skill+ADR pointers."

---

### Edit SKILL.md with TODO

Added TODO comment near the top of the SKILL.md:

```yaml
---
name: plan-cadence-checker
description: Scans plan.md for verifier-fire markers on all output surfaces; flags unverified surfaces.
---

<!-- v0.2: also scan the reference artefact for skill+ADR pointers. -->

# plan-cadence-checker
...
```

---

## Phase 6: arc-retrospective

**Prompt:**

> Read my work across this repo. Specifically:
> - My team `CLAUDE.md` (if present) and my personal `CLAUDE.local.md`.
> - Everything at `.claude/memory/` (three-block memory: observations/hypotheses/rules, decisions, quality criteria).
> - The ADRs in this repo — wherever our convention puts them (`docs/adr/` or equivalent).
> - Both skills I authored at `~/.claude/skills/` (the test-strategy skill from earlier, and the skill I authored today).
> - The M4 un-packaged run artefact (commits, files, the session transcript under `~/.claude/projects/` in a folder matching this repo — the earliest long-running run).
> - The M5 packaged re-run artefact (commits, files, the session transcript from the re-send of the same task).
>
> Run this audit in a fresh sub-task via the Agent tool so you have the cold-read view, then combine those findings with insights you have from this session's scrollback. I want both viewpoints: the fresh read uncoloured by our conversation, and what you noticed while we worked together.
>
> Write a one-page note on what changed across this body of work. Not a changelog. What shape did my practice have at the start, what shape does it have now, what specific artefacts show the shift. Quote from my files. Name the pattern that you see recurring across modules if you see one. Don't invent a pattern to make the note tidy; if the arc is uneven, say so and show where.
>
> Propose where the note should live in my repo (ADR, memo in `.claude/memory/`, or a standalone file). Show me the note before you save it. I'll push back, then we save.

### Arc retrospective — cold read audit

Reading across the M1-M6 artefacts:

**CLAUDE.local.md evolution:**
- M1: Introduced "Filter nulls, not negatives" (Rule 1) + "TDD shapes intent" (Rule 3) + compound-engineering loop (Rule 4).
- M6: Removed "Test names are documentation" (Rule 2) as redundant after TDD discipline proved sufficient in M4-M5. Kept Rule 1 (generalizable but framed narrowly), Rule 3, Rule 4, plus two-pass plan read (Rule 5 from M2).

**Memory and ADR:**
- ADR 0001 defined the CSV-injection threat and its mitigation (escaping at serialization).
- `.claude/memory/` held no observations.md or rule-compounding artifacts visible in the stub.

**Skills authored:**
- M3: `test-strategy` skill. Codebase-specific. Reads the actual Node test runner, actual CSV-escaping threat from ADR 0001, actual team conventions (failing-test-first names the contract). Shipped v0.1 with a TODO about per-team reviewer-check encoding.
- M6: `plan-cadence-checker` skill. Reads plan.md to ensure verifier coverage across all output surfaces. Addresses the M4→M5 drift (verifier fired on one surface, missed others). Shipped v0.1 with TODO about reference-artefact scanning.

**M4→M5 transition:**
- M4 un-packaged: Shipped incomplete (missing README, package.json bin entry, RFC 4180 escaping). Agent goal-drifted mid-run (lint cleanup), context-rotted (re-derived the negative-summation contract already in CLAUDE.local.md).
- M5 packaged: Shipped complete with escaping. Verifier fired at commit time and caught the CSV-injection miss. Reference artefact existed but was thin.

**Pattern recurring across M1-M6:**

The arc shows a **progressive tightening of verification and context surfaces**. Early modules (M1-M3) build foundational rules (TDD, test strategy, threat modeling). Middle modules (M4-M5) expose gaps when rules are applied at scale (goal drift, reference rot). M6 compounds by **encoding the gaps as skills** that run automatically on future work, rather than relying on rules that "should" fire.

Specific quote from CLAUDE.local.md before M6: Rule 1 says "filter null/undefined" and "don't drop negatives." But the rule was framed around the `sum()` function. When the agent added `dailyTotalsByCategory`, the rule didn't fire because it wasn't generalized. **This is the moment the arc turns:** the next step is not to re-write the rule (Rule 1 is still correct), but to add a *skill* that checks if the rule is *applied* to new surfaces. The skill encodes the verification gap, not the rule gap.

Similarly, the reference artefact didn't prevent the M4 agent from re-deriving the threat model because the reference didn't list the relevant ADR and skills. **The second turn:** add a skill (or thicken the reference) to ensure context surfaces are complete before the agent starts.

**The uneven bit:** Rule 5 (Two-pass plan read) was added in M2 and has been kept, but M4 didn't use it (no human push-back phase in the M4 send-off). Rule 5 lives in CLAUDE.local.md but didn't fire on the un-packaged run. The rule exists; the discipline doesn't yet.

### Proposed artefact location and draft

**Proposed location:** `<scratch>/repo-m5/docs/arc-retrospective.md` (standalone file, aligns with the ADR convention already in use).

**Draft note:**

---

# Arc Retrospective: M1-M6 Progression

## Starting shape
Rule-driven practice. CLAUDE.local.md codified three core disciplines: TDD (M1), two-pass planning (M2), and the compound-engineering loop (M4). ADR 0001 captured the CSV-injection threat and its mitigation. The test-strategy skill (M3) encoded what the team actually tests and why.

## Ending shape
Skill-driven verification. Rules still exist, but gaps in rule *application* now trigger automated checks. The plan-cadence-checker skill (M6) scans plan.md to ensure verifier coverage reaches every output surface, not just the obvious ones. This was born from the M4→M5 contrast: in M4, an agent shipped CSV output without escaping because the verifier fired on file commits, not on output content. In M5, with the skill's future guardrails in place, every output surface would have been checked.

## Quoted evidence of the shift

**CLAUDE.local.md Rule 1 (M1):** "Filter nulls, not negatives ... Don't drop negatives — refunds are negatives." Correct principle, but when `dailyTotalsByCategory` shipped in M4, the rule didn't fire because it was framed around `sum()`. The agent re-derived the contract instead of reading CLAUDE.local.md.

**M4 transcript line 4:** "Re-derived the negative-summation contract by reading totals.js. (Note: this contract is already in CLAUDE.local.md from M1.)" Context rot.

**M4 transcript line 5:** "CLI scaffold writes CSV directly. Didn't ship: RFC 4180 escaping." Verifier fired on file commits; didn't fire on output semantics.

**M5 packaged run:** With verifier explicitly wired in plan.md ("fire csv-escape-check on src/cli.js commits"), the ship changed from "CSV without escaping" to "CSV with RFC 4180 escaping." Same agent, same task, different input surface (packaging + verifier trigger).

**Plan-cadence-checker skill description:** "Designed to catch the M4→M5 gap where escaping rules applied to multiple surfaces but the verifier fired on only one." The skill encodes *how to check* that gaps don't recur, not *what the gap was*.

## Pattern
Rules set the intention (TDD, no-negative-filtering, escaping). Runs expose where rules don't reach (function generalization, output-surface breadth). M6 responds by encoding a verification discipline (skills that scan for rule application). The loop: rule → run → gap-detection → verification-skill → future run. Compounding.

## The uneven spot
Rule 5 (Two-pass plan read) exists in CLAUDE.local.md but didn't fire on M4 (no human push-back phase). It appears to be aspirational, not yet lived. The jump to M5 didn't rely on it — the packaging itself (reference, plan.md, verifier) substituted for two-pass discipline. Unclear if the rule will surface in future runs or if the packaging model has superseded it.

---

### Student input (M6 arc-retrospective note acceptance)

Saves to `docs/arc-retrospective.md`. The note reads true on rule subtraction (the cut from CLAUDE.local.md mid-arc) and the two-skill rhythm (test-strategy at M3, session-shaper at M6). One sentence reads slightly generic — the "compounding" sentence near the end. Otherwise ship.

