# AE101 theory handbook exercise cards

## Goal

Restore the practical thread inside the AE101 theory handbook without turning it into a second exercise workbook.

The handbook serves two readers:

- A prospective buyer should see that every concept is earned through work on a real codebase.
- A former student should recover the experience behind references such as “the plan you pushed back on” or “the run you sent off.”

The handbook will contain twelve compact exercise cards, one for each in-class exercise in the six-module core. Homework and optional exercises remain outside this view.

## Card contract

Each card contains exactly:

1. One header: `Exercise · <canonical exercise title>`
2. One paragraph of 35–45 words

The paragraph names:

- the work done on the participant’s own codebase,
- the artifact or observable result produced, and
- the contrast or question that makes the following theory useful.

It does not contain instructions, prompts, timings, setup details, links, optional paths, or a compressed phase list. It hints at the experience rather than teaching the exercise.

The copy must work for both audiences without switching register. It stays concrete enough for an engineer who completed the training and legible enough for a buyer scanning cold.

## Reusable metadata

The summary belongs to the canonical exercise file, not to the handbook builder.

Each of the twelve exercise files gains one structured metadata line immediately below its `<!-- maintainer -->` marker:

```md
**View summary:** One compact paragraph used by handbook, catalogue, and similar summary renderings.
```

This location has three useful properties:

- Existing student-facing exercise rendering already strips the maintainer tail, so the summary does not appear inside the full exercise.
- The summary remains next to the canonical work and can be reviewed when the exercise changes.
- Future views can read the same field without becoming coupled to the theory handbook.

The field is required to be one physical line with no embedded HTML. It may contain inline Markdown. The builder fails with a useful file-specific error if a requested exercise has no summary, more than one summary, an empty summary, or a summary outside the word band.

The canonical H1 remains the title source. The metadata does not duplicate a title.

## Assembly and placement

The theory handbook manifest becomes a mixed sequence of:

- `lectures/<slug>`
- `supplementary/<slug>`
- `exercises/<slug>`

Lecture and supplementary entries keep their current rendering. An exercise entry reads the canonical exercise H1 and `View summary`, then emits the compact card.

Cards sit where the exercise occurred:

- M1: after the opening lectures, three exercise cards, then the two closing lectures.
- M2: after the plan lecture, two exercise cards, then the rule-placement closer.
- M3: side-quest card, skills lecture, three work cards, then the near-half closer.
- M4: three opening lectures, send-off card, then the return-reading sequence.
- M5: contrast opener, diagnosis-and-re-send card, then the packaging closers.
- M6: opening theory, gap-and-skill card, then the synthesis sequence.

Supplementary theory keeps its current owning-module placement. The exercise cards do not pull homework or optional exercise links into the handbook.

## Rendering

The rendered structure is intentionally small:

```html
<section class="exercise-summary" id="exercise-summary-<slug>">
  <h2>Exercise · <canonical title></h2>
  <p><view summary></p>
</section>
```

The visual treatment uses the existing handbook palette: a quiet tinted background, one thin accent rule, compact padding, and no iconography. The card avoids page breaks and targets roughly one eighth of a printed content page. Copy length, rather than a hard fixed height, keeps cards consistent and prevents overflow at narrow widths.

The card remains clearly secondary to lectures. It is a memory and sales cue, not a new phase with slide-sized visual weight.

## Validation

Automated tests cover:

1. Exactly twelve exercise-summary cards render.
2. Every mixed-manifest exercise entry has one valid `View summary`.
3. Each card contains exactly one heading and one paragraph.
4. Every paragraph stays within 35–45 words.
5. Full exercise bodies, prompts, timings, and maintainer content do not leak into the handbook.
6. Sentinel cards occur between the correct surrounding lectures in M1, M2, M3, M4, M5, and M6.
7. Homework and optional exercises remain absent.
8. Normal workbooks and the exercises workbook keep their existing behavior.

Visual verification covers one unpersonalised and one personalised handbook at desktop width, narrow width, and print preview. The existing handbook instances are rebuilt after the shared rendering passes.

## Non-goals

- No exercise steps or prompt blocks in the theory handbook.
- No new navigation system in this change.
- No rewrite of the full exercises.
- No metadata extraction from `What you do`, `What you build`, or `The point`; the summary is deliberately authored for compact views.
- No exercise cards for homework, optional extensions, or supplementary reads.
