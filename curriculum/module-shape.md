# Module file shape + cross-doc links

Canonical template + include/link mechanics. Loaded at Pass 1 of the three-pass build (`check_pedagogy.md`) + any session creating a new module file or editing includes/cross-doc links. Pointer from `curriculum/CLAUDE.md`.

## Module File Shape

```markdown
# [Title]

## Big Idea
[One sentence: what the module is for. See § Big Idea below.]

## Prework
[What the student walks in holding, plus the stakes line if they don't. Optional gap reading.]

## What You'll Learn
After this module, you will be able to:
- **[verb]** [thing]

## Start here
[The opening question to the room, then the run of includes. Lectures and exercises
are inlined by standalone links in document order — there are no `## Lectures` /
`## Exercises` container headings.]

[Lecture: The whole map](lectures/the-whole-map.md)

[Exercise: Push back on the plan](exercises/push-back-on-the-plan.md)

## [The module's own teaching sections]
[Named for the move, not for the format: `Send the task off`, `Set up the worktree`,
`Sharpen the skill from evidence`, `Human close`. As many as the module needs, each
carrying its own prompts and includes. This is where a module differs from its siblings.]

## Key Concepts
[Reminders of what the module's own beats already taught. See § Key Concepts below.
Goes AFTER the last teaching section — see the placement note there.]

## Bring to Module [N]
[Only when the next module needs the student to arrive with something. Bold the ask,
then the stakes line.]

## Pre-reads before Module [N]
[Optional. Lands in the gap between sittings.]

## Next
[Where the arc goes, and what closes here. LAST — see the placement note below.]
```

**Placement: `## Next` is the last section of the body.** Gap material — what to bring, what to read — sits above it. One `##` is one slide, so the final section is the last thing on the wall while a room packs up, and it used to be a reading list: the forward beat fired two slides early and then drained into admin. Risto raised it twice. Moved 2026-08-13 across prework, M1, M3, M4, M5; M2 and M6 already ended on `## Next` and were left alone, which is the tell that the old order had been half-abandoned in practice before anyone wrote it down.

**Prework is the same rule with a different last section.** It has no `## Next`, so its closing beat is `## Bring to Module 1` — which ends on the opening question the student carries into the room — and `## Pre-read before Module 1` sits above it. Naming the pre-read below the closing beat put it where a student who reads "Bring to Module 1" as the end never scrolls.

**What this costs, and it is real:** those five `## Next` paragraphs were written as connective tissue between a close and some admin. They now carry the close. Read them as closers, not as bridges, before the next cohort.

**Two sections belong to the training's first module only:** `## How we work in this room` and `## Freedom to choose` sit in M1 between `What You'll Learn` and `Start here`. They set the room's contract once; a later module repeating them is drift.

**`## Meta` lives below the `<!-- maintainer -->` fence,** with Bloom level, timings and trainer materials. It is not a student-facing section.

## Big Idea

**Meaning, not steps.** One sentence saying what the module is *for* — the thing a student would repeat to a colleague. The sequence of moves belongs in `## What You'll Learn` one section below, which states it in the more precise register; a Big Idea that lists the phases is that section in worse prose. Ceiling ~30 words, and most should land well under. Reference: AE101 M4, *"Prep your first long run. Whatever you've built so far is what the agent gets, and the run is how you find out what's missing."*

Test: **strike every verb the student performs. Is anything left?** If not, it is a recipe. *"Take one task into plan mode, push back twice, then let a second read walk the branches"* is a correct summary of M2 and says nothing about why M2 exists.

Cut on sight:
- **Arc-positioning** — which module produced the evidence, what later modules ride on, where this sits in the training. `## What You'll Learn` states the same arc one section below in the more precise register, so a prose restatement is the duplicate, not the summary. §33's exemption for this section is narrow: it may name what the module *earns*, not where the module *sits*.
- **Repo dialect** — *team kit accretion*, *the three-pattern*, *un-packaged*-as-noun. Projected on a wall to engineers who have not read our maintainer blocks.
- **Framing preambles** — *"Before the agent runs bigger work alone, …"*. Start on the verb.

Won't fit in one sentence → **it belongs below the `<!-- maintainer -->` fence, not above it in four.** Relocation costs nothing: `check_strategy_tie_in.md` fires on it there, and `eval-class-router.sh` keys the `strategy@` class off a literal `^## Big Idea` at any depth. Precedent: AE101 M2, 2026-08-12, Antti-directed.

## Key Concepts

**Reminders, not new material.** Every bullet restates something the student met in this module's own exercises and lectures. A bullet carrying information that appears nowhere else is the section teaching, which is the one thing it must not do — the invariant is *concepts emerge from doing*. Test: for each bullet, name the beat it recaps. Can't → it is new material wearing a recap's clothes, and the student meets a term (*un-packaged*, *gap analysis*) without the experience that earns it.

**Placement: after the last teaching section, before `## Next`.** A recap above a teaching beat can only recap half the module, and the bullets covering the other half are briefing wearing a recap's clothes. Check what sits below the block before writing a bullet: a bullet recapping a section the reader has not reached yet is the same defect from the other side. **M5 carries the one legitimate exception**, and it is structural rather than sloppy: `## Back to the map, one last time` sits after Key Concepts but renders only in the four-sitting cut (`<!--flag:no-module:spot-gaps-build-the-loop-->`), so in the shipped six-module arc the block is already last. Moving it below a flag-gated section would break the cut where M5 is not the finale.

One idea per bullet, module's own voice, tactical. Lead with the discipline, not the failure mode. Do not front-run a later module.

**The rest of the spec lives where it fires:** `check_strategy_tie_in.md` §§3/4/5/6 — theme instancing, the 1–3 breadcrumb clauses (5–8 words, no label, no bold), and the vary-between-adjacent-modules rule. That compendium auto-loads on this surface; this section is the shape, not the whole contract.

## Module include

Standalone link, href = `exercises/<slug>.md` or `lectures/<slug>.md`:

```markdown
[Exercise: Raw LLM](exercises/raw-llm.md)
```

Requirements:
- Link = entire paragraph, on its own line, no surrounding prose.
- Href is exact `exercises/<slug>.md` or `lectures/<slug>.md` (kebab-case, no subdirs).
- Target file exists.

Missing target → renders as-is (Pass 1 can reference future Pass 2 files).

## Cross-doc links — bare paths in source

Write the slug-bearing path the same way from any depth. `rewriteCrossDocLinks` in `site/layouts/curriculum.js` accepts `(?:\.\.\/)*` prefixes and rewrites:

- `(exercises|lectures)/<slug>.md` → `curriculum.html?file=<kind>/<slug>` (shared library)
- `trainings/<training>/(reference|supplementary)/<slug>.md` → `curriculum.html?file=trainings/<training>/<kind>/<slug>` (training-specific)

Forbidden in source:
- Hardcoded `curriculum.html?file=...` URLs (renderer leak).
- Depth-counted `../` prefixes (bookkeeping the author shouldn't track).

Maintainer-block bare-path text (no markdown link) is exempt from rewrite.

Standalone-include = renderer fetches + inlines file content. Inline body links = URL-rewrite only.

→ `memory/compounded/2026-04-26-platform-bare-paths-renderer-rewrites.md`
