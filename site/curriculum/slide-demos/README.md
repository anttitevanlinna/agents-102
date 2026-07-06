# Slide-viewer prototypes

Three candidate layouts for turning a curriculum doc into a navigable slide
deck. Every AE101 lecture/exercise is already chunked to slide size (one `##` =
one slide, enforced by `scripts/check-slide-size.js`). These prototypes are the
**viewer** over that chunking — the last mile that makes the site a real deck
instead of a long scroll.

**Pick one.** Open `index.html`, live with each for a minute, choose. All three
run the *same* split, so the winner drops into production with no content work.

## The three

| | Paradigm | Feels like | Best when |
|---|---|---|---|
| **A · Deck** | One slide at a time, paged | Keynote / reveal.js | Trainer projecting in the room |
| **B · Rail** | Full-height snap cards + fixed wayfinding rail | A modern scrollytelling doc | Student reading the handout alone |
| **C · Grid** | Contact-sheet of live thumbnails → filmstrip focus | Figma pages / a gallery | Grasping structure, jumping around |

- **A — Deck** (`proto-a-deck.*`): `← →` / space / PageUp-Down page through; `O`
  or `Esc` opens a textual overview; `F` fullscreens; number keys jump. Dark
  control bar with dots + counter. Projector-first.
- **B — Rail** (`proto-b-rail.*`): just scroll — cards snap, the left rail
  tracks the active slide (IntersectionObserver) and jumps on click. Top
  hairline = scroll progress. Rail collapses to a drawer under 860px. Reading-first.
- **C — Grid** (`proto-c-grid.*`): home is every slide as a scaled live
  thumbnail (the real diagram, the real prompt — see the whole shape at once).
  Click one → focus overlay with a filmstrip; `← →` moves, `Esc` returns.
  Structure-first.

## How they're built

`build-demos.js` renders one real lecture (`lectures/what-packaging-is` by
default) through the **exact** pipeline the SPA and workbook use
(`stripMaintainerTail → expandPrompts → escapeTildes → marked →
wrapImageFigures`), decorates it client-side (prompts / sessions / notes /
diagram-zoom), then `slides-core.js` splits the decorated DOM on `<h2>`. Each
output is a single self-contained offline HTML file — which is also the proof
that the viewer survives in a student-built handout (that ships exactly this way).

```
node site/curriculum/slide-demos/build-demos.js                       # default lecture
node site/curriculum/slide-demos/build-demos.js --doc exercises/fix-tests-first
```

`slides-core.js` is the shared, integration-ready piece:
`SlidesCore.buildSlides(container)` → `{ slides:[{index,title,isCover,isDivider,wide,el}], titleText }`.
It moves (not clones) nodes into `<section class="slide"><div class="module
slide__body">…</div></section>`, so all `.module` prose styling from
`curriculum.css` carries verbatim. It runs as a progressive enhancement *after*
the existing decorate passes.

## Content-aware behaviours

- **Mood by type.** Lectures render cream + oxblood (reading / theory);
  exercises flip to a warm near-black with amber accents (doing / terminal) via
  `theme-dark.css`, applied as `:root[data-theme="dark"]` on exercise pages only.
  It re-points the `curriculum.css` palette vars, so prose, code, prompt blocks
  and chrome all recolour in one move. (Caveat: an exercise that embeds a
  hardcoded-cream SVG diagram would need that diagram dark-aware too;
  `spot-gaps` has none.)
- **Phase dividers.** `slides-core.js` detects any `## Phase N: <title>` heading
  and emits a full-bleed section-break slide ahead of the phase's content (the
  "Phase N" prefix is then stripped from the content heading, which the divider
  now carries). No `.md` edit needed — it keys off the existing `Phase N:`
  authoring convention. In the Rail, dividers become section headers that group
  the slides beneath them into a real outline.

- **Exercise grammar** (`SlidesCore.decoratePatterns`, styles in
  `slides-patterns.css`). Recurring exercise shapes that read as prose today get
  lifted to first-class blocks, each keyed on an existing authoring convention
  (no `.md` edits, can't misfire on a lecture that lacks the marker):
  - **Contract** — the contiguous `**What you do / build**` + `**The point**`
    paragraphs become one labelled `DO / BUILD / WHY` panel.
  - **Time** — `**Time:** …` becomes a compact ◷ meta chip.
  - **Steer callout** — the `> **Fast operator?** …` blockquotes (the
    maintainer's "steer-callouts") get an amber left-border aside with the bold
    lead as a label chip, so an *optional* steer reads differently from an
    imperative bullet.
  - **Prompt lead-in** — the plain `Ask Claude to …` line immediately before a
    prompt block is tied to it (italic, left rule).
  - **Outcome** — the closing `**What happened:** …` becomes a `WHAT HAPPENED`
    payoff panel, bookending the contract.

  These are prototype-layer stylings. Promoting them to production means either
  extending `curriculum.css` or adding real widgets per `curriculum/widgets.md`
  (renderer + catalog + marker-collision check + all three surfaces). Still on
  the table: the italic `*"say this to Claude"*` push-back voice — deliberately
  left alone here to avoid over-matching ordinary italics.

## Integrating the winner (later)

1. Promote the chosen `proto-x.{css,js}` + `slides-core.js` into `site/layouts/`
   (e.g. `slides.css` / `slides.js`).
2. **SPA** (`curriculum-spa.js`): after `loadAndRender` finishes decorating a
   lecture/exercise, call the viewer on the rendered container (behind a toggle
   or a `?view=slides` param so index/module pages stay scroll).
3. **Workbook** (`build-workbook.js`): inline `slides.css`/`slides.js`, and in
   `WORKBOOK_INIT_JS` mount the viewer on each `.phase--lecture` / `.phase--exercise`
   section after the existing `decorate*` calls.
4. Retire the "No slides" note in `curriculum/CLAUDE.md` § *Classroom delivery* —
   the site now IS a slide deck. Projection legibility stays a design constraint.

Generated `*.html` and `index.html` are throwaway previews (rebuild anytime).
The source of record is `build-demos.js`, `slides-core.js`, and the three
`proto-*.{css,js}` pairs.
