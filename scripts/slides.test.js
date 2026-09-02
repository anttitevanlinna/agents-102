#!/usr/bin/env node
/*
 * Tests for the slide viewer (site/layouts/slides.js) — specifically that the
 * composed (whole-workbook) deck includes EVERY top-level section the long-read
 * renders, not only the modules that happen to contain lecture/exercise phases.
 *
 * Run: node --test scripts/slides.test.js
 *
 * Regression under test (bug 2026-07-09): the Slides layout is a sticky per-reader
 * toggle, and it walked only `.phase--lecture, .phase--exercise`. Prework, supplementary
 * and reference sections render as a plain `<section class="module">` with no
 * phase wrapper, so they were silently dropped from the deck — and any in-deck
 * link into them was stranded. Toggling long-read -> slides must not lose them.
 */

const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { JSDOM } = require('jsdom');

const SLIDES_SRC = fs.readFileSync(
  path.join(__dirname, '../site/layouts/slides.js'), 'utf8');
const SLIDES_CSS = fs.readFileSync(
  path.join(__dirname, '../site/layouts/slides.css'), 'utf8');

// A minimal workbook <main>, same shape build-workbook.js emits: a training
// cover, a prework prose section, one real module carrying a lecture + an
// exercise phase, then a supplementary and a reference prose section. Module
// heroes are built at page init in the real workbook; moduleTitleOf falls back
// to the first non-phase heading, so the raw H1s here are enough.
const FIXTURE = `
<main>
  <header class="workbook-cover">
    <p class="eyebrow">acme workbook</p>
    <h1 class="cover-title">Agentic Engineering 101 (Part One)</h1>
    <p class="lede">The first 3 modules of 6.</p>
  </header>
  <nav class="workbook-toc"><h2>Contents</h2></nav>

  <section class="module" id="prework">
    <h1>Prework: before Module 1</h1>
    <p>Pick your model when you open a session.</p>
    <h2>What to bring</h2>
    <p>The training runs on your real work.</p>
    <p>No repo? <a href="#supplementary-verification-asymmetry" target="_blank" rel="noopener">build one from zero</a>,
       or read <a href="#the-named-moves">the named moves</a>, or a <a href="#nothing-here">dead one</a>,
       or <a href="#constructor">an inherited one</a>, or <a href="#__proto__">its sibling</a>,
       or <a href="https://example.com/outside">something outside</a>.</p>
  </section>

  <section class="module" id="getting-going">
    <h1>Getting going + context</h1>
    <blockquote><p>Run M1 on high thinking effort.</p></blockquote>
    <h2>What You'll Learn</h2>
    <p>After this module, you will be able to run the loop.</p>
    <h2>Start here</h2>
    <p>The question to you: what's one trick you found this week?</p>
    <section class="phase phase--lecture" id="lectures-painting-the-picture">
      <div class="phase-kicker">Lecture</div>
      <h1>Painting the picture</h1>
      <h2>Slide A</h2><div class="slide-tier" data-tier="3" hidden></div><p>body</p>
      <h2>Slide B</h2><div class="slide-tier" data-tier="2" hidden></div><p>body</p>
      <h2>Slide C</h2><p>body</p>
    </section>
    <section class="phase phase--exercise" id="exercises-orient-and-introspect">
      <div class="phase-kicker">Exercise</div>
      <h1>Orient and introspect</h1>
      <h2>Step one</h2><p>body</p>
      <h2>Phase 2: Read it back</h2><p>body</p>
      <h2>3. Check the window</h2><p>body</p>
    </section>
    <h2>Key Concepts</h2>
    <ul><li>The loop is orient then fix then compound then close.</li></ul>
    <h2>Next</h2>
    <p>Module 2 is where plan mode earns its keep.</p>
  </section>

  <section class="module" id="supplementary-verification-asymmetry">
    <div class="phase-kicker">Supplementary</div>
    <h1>Verification asymmetry</h1>
    <h2>Checking can be cheaper than doing</h2><p>body</p>
  </section>

  <section class="module" id="reference-prompt-anatomy">
    <div class="phase-kicker">Reference</div>
    <h1>Prompt anatomy</h1>
    <h2 id="the-named-moves">The named moves</h2><p>body</p>
  </section>
</main>`;

function buildDeck() {
  const dom = new JSDOM(FIXTURE, { runScripts: 'outside-only' });
  dom.window.eval(SLIDES_SRC);
  const main = dom.window.document.querySelector('main');
  const model = dom.window.CurriculumSlides.buildDeckModel(main.cloneNode(true), {});
  const labels = model.slides.map(s => s.navLabel || s.title).join('\n');
  return { model, labels };
}

test('composed deck still renders modules and their phases (regression guard)', () => {
  const { labels } = buildDeck();
  assert.match(labels, /Getting going/, 'module divider present');
  assert.match(labels, /Slide A/, 'lecture phase slide present');
  assert.match(labels, /Step one/, 'exercise phase slide present');
});

test('composed deck includes the prework section', () => {
  const { labels } = buildDeck();
  assert.match(labels, /Prework/, 'prework divider/title present');
  assert.match(labels, /What to bring/, 'prework body slide present');
});

test('composed deck includes supplementary sections (linked supplements)', () => {
  const { labels } = buildDeck();
  assert.match(labels, /Verification asymmetry/, 'supplementary title present');
  assert.match(labels, /Checking can be cheaper than doing/, 'supplementary body slide present');
});

test('composed deck includes reference sections', () => {
  const { labels } = buildDeck();
  assert.match(labels, /Prompt anatomy/, 'reference title present');
  assert.match(labels, /The named moves/, 'reference body slide present');
});

// ── numbering contract ───────────────────────────────────────────────────────
// Position numbers are computed by the renderer, never hand-written: every
// top-level section gets a code (M<n> from the long-read hero number, P for
// prework, S<n>/R<n> for supplementary/reference), content slides get a
// within-section ordinal, and each slide carries a stable data-ref.

test('sections get codes: P / M1 / S1 / R1, in deck order', () => {
  const { model } = buildDeck();
  const dividers = model.slides.filter(s => s.isDivider && s.el.classList.contains('slide--module'));
  assert.deepEqual(Array.from(dividers, s => s.secCode), ['P', 'M1', 'S1', 'R1']);
});

test('module divider eyebrow carries the module number', () => {
  const { model } = buildDeck();
  const mod = model.slides.find(s => s.secCode === 'M1' && s.isDivider);
  assert.equal(mod.title, 'Module 1');
});

// A module opener must read louder than a within-module phase/section divider,
// or flicking into a new module shows no boundary. The renderer tags it
// `.slide--module`; the stylesheet must give that class its own treatment
// (not inherit the plain `.slide--divider` look). Guards the boundary-invisible
// regression.
test('module opener has dedicated styling distinct from a phase divider', () => {
  assert.match(SLIDES_CSS, /\.slide--(divider\.slide--)?module\s*\{[^}]/,
    'slides.css must carry a rule targeting the module opener (.slide--module)');
});

// The composed deck must mirror the long-read INSIDE a module too: module-level
// prose (Connections/Start here, What You'll Learn, Key Concepts, Debrief +
// prompts, Homework, Next) is not wrapped in a `.phase--*` and used to be
// dropped from the deck — surviving only in long-read. Bug 2026-07-10.
test('composed deck renders module-level prose, not only the phases', () => {
  const { labels } = buildDeck();
  assert.match(labels, /What You'll Learn/, "module's What You'll Learn reaches the deck");
  assert.match(labels, /Start here/, "module's Connections/Start here reaches the deck");
  assert.match(labels, /Key Concepts/, "module's Key Concepts reaches the deck");
  assert.match(labels, /Next/, "module's Next/bridge reaches the deck");
});

test('module-level prose is interleaved in document order (before and after phases)', () => {
  const { model } = buildDeck();
  const m1 = model.slides.filter(s => s.secCode === 'M1').map(s => s.navLabel || s.title);
  const wyl = m1.findIndex(t => /What You'll Learn/.test(t));
  const painting = m1.findIndex(t => /Painting the picture/.test(t));
  const keyConcepts = m1.findIndex(t => /Key Concepts/.test(t));
  assert.ok(wyl > -1 && painting > -1 && keyConcepts > -1, 'all three present');
  assert.ok(wyl < painting, 'What You\'ll Learn (pre-phase prose) comes before the first lecture');
  assert.ok(keyConcepts > painting, 'Key Concepts (post-phase prose) comes after the phases');
});

test('module number is read from the long-read hero when present', () => {
  const fixture = FIXTURE.replace(
    '<h1>Getting going + context</h1>',
    '<header class="module-hero"><div class="module-hero-num">03</div><h1 class="module-hero-title">Getting going + context</h1></header>');
  const dom = new JSDOM(fixture, { runScripts: 'outside-only' });
  dom.window.eval(SLIDES_SRC);
  const main = dom.window.document.querySelector('main');
  const model = dom.window.CurriculumSlides.buildDeckModel(main.cloneNode(true), {});
  assert.ok(model.slides.some(s => s.secCode === 'M3'), 'hero number 03 becomes section code M3');
});

test('content slides are numbered within their section and carry data-ref', () => {
  const { model } = buildDeck();
  const m1 = model.slides.filter(s => s.secCode === 'M1');
  const content = m1.filter(s => !s.isDivider && !s.isCover);
  assert.deepEqual(Array.from(content, s => s.secNum), Array.from(content, (_, i) => i + 1), 'ordinals are 1..n within the module');
  assert.equal(content[0].el.getAttribute('data-ref'), 'm1.1');
  const preworkContent = model.slides.filter(s => s.secCode === 'P' && !s.isDivider && !s.isCover);
  assert.equal(preworkContent[0].secNum, 1, 'ordinal restarts per section');
  assert.equal(preworkContent[0].el.getAttribute('data-ref'), 'p.1');
});

test('covers and dividers carry the section code but no ordinal', () => {
  const { model } = buildDeck();
  model.slides.filter(s => s.isDivider || s.isCover).forEach(s => {
    assert.equal(s.secNum, undefined, (s.title || '') + ' has no ordinal');
  });
});

// ── slide tiers ──────────────────────────────────────────────────────────────
// A hidden `.slide-tier` block (from `<!--tier:N-->` via expandTiers) stamps
// its slide with data-tier and a small corner token; untagged slides carry
// neither. Trainer skip guidance — deck-only chrome, invisible in long-read.

test('a tier-tagged slide carries data-tier, a corner token, and the model tier', () => {
  const { model } = buildDeck();
  const tagged = model.slides.find(s => (s.navLabel || s.title) === 'Slide A');
  assert.equal(tagged.tier, '3', 'model records the tier');
  assert.equal(tagged.el.getAttribute('data-tier'), '3', 'slide section stamped');
  const badge = tagged.el.querySelector('.slide__tier');
  assert.ok(badge, 'corner token rendered');
  assert.equal(badge.textContent, 'T3');
  assert.ok(badge.getAttribute('title'), 'token explains itself on hover');
});

// Absent used to mean `tier: null` — a silent third state neither the filter
// nor a lint could reason about. The model now says core out loud; only an
// author's own marker earns the badge, so the deck looks unchanged.
test('untagged slides are core (tier 1) but carry no stamp and no token', () => {
  const { model } = buildDeck();
  const plain = model.slides.find(s => (s.navLabel || s.title) === 'Step one');
  assert.equal(plain.tier, '1', 'absent marker means core, stated explicitly');
  assert.equal(plain.tierTagged, false, 'not author-tagged');
  assert.equal(plain.el.getAttribute('data-tier'), null);
  assert.equal(plain.el.querySelector('.slide__tier'), null);
});

test('slides.css styles the tier token', () => {
  assert.match(SLIDES_CSS, /\.slide__tier\s*\{/, 'slides.css must carry the .slide__tier rule');
});

// ── left-rail rendering (needs the real open(), not just the model) ─────────
function openDeck() {
  const dom = new JSDOM(`<!doctype html><body>${FIXTURE}</body>`, { runScripts: 'outside-only' });
  dom.window.Element.prototype.scrollIntoView = function () {};
  dom.window.eval(SLIDES_SRC);
  const main = dom.window.document.querySelector('main');
  const ctl = dom.window.CurriculumSlides.open(main, { title: 'Fixture' });
  const rows = [...dom.window.document.querySelectorAll('.deck__rail-item')].map(btn => ({
    num: btn.querySelector('.deck__rail-num').textContent,
    label: btn.querySelector('.deck__rail-label').textContent,
  }));
  return { dom, ctl, rows };
}

test('rail: phase dividers show their phase number, not a bare §', () => {
  const { rows } = openDeck();
  const phase = rows.find(r => r.label === 'Read it back');
  assert.ok(phase, 'phase divider row present (label without the Phase prefix)');
  assert.equal(phase.num, '§2');
});

test('rail: a leading content ordinal is stripped from the label (position wins the num cell)', () => {
  const { rows } = openDeck();
  const step = rows.find(r => r.label === 'Check the window');
  assert.ok(step, 'label "3. Check the window" rendered without its baked step number');
  assert.ok(!rows.some(r => /^\d+[.)]\s/.test(r.label)), 'no rail label starts with a bare ordinal');
  assert.match(step.num, /^\d+$/, 'num cell carries the positional ordinal');
});

test('rail: content slide numbers are within-section ordinals, dividers carry section codes', () => {
  const { rows } = openDeck();
  const m1 = rows.find(r => r.num === 'M1');
  assert.ok(m1, 'module divider row shows M1 in the num cell');
  // Module prose now leads the module (mirrors long-read), so the first content
  // slide is "What You'll Learn" — ordinal 1 — and the lecture's "Slide A" follows
  // the two pre-phase prose slides at ordinal 3. Ordinals stay per-section positional.
  const first = rows.find(r => r.label === "What You'll Learn");
  assert.equal(first.num, '1', 'first content slide of the module is 1, not its global index');
  const slideA = rows.find(r => r.label === 'Slide A');
  assert.equal(slideA.num, '3', 'lecture content follows the two pre-phase prose slides');
});

test('counter shows section ref plus global position', () => {
  const { dom, ctl } = openDeck();
  ctl.go(3); // first prework content slide ("What to bring")
  const count = dom.window.document.querySelector('.deck__count').textContent;
  assert.match(count, /^P·1 — 4 \/ \d+$/);
});

// ── in-deck links (regression guard, 2026-08-12) ─────────────────────────────
// Measured before the fix, on the built northwind workbook in headless Chrome:
// 24 in-page links in the composed deck, and NONE of their targets — the deck
// rebuilds slides from cloned content, so the `section.module` wrappers that
// carry the link targets never arrive. Every click was a no-op, and
// `target="_blank"` re-opened the whole deck at slide 1.

test('anchors: a section id resolves to that section\'s divider slide', () => {
  const { model } = buildDeck();
  const n = model.anchors['supplementary-verification-asymmetry'];
  assert.equal(typeof n, 'number', 'the supplementary section is an anchor target');
  assert.ok(model.slides[n].isDivider, 'it lands on the divider that opens the section');
  assert.match(model.slides[n].navLabel, /Verification asymmetry/);
});

test('anchors: an include target (phase wrapper id) resolves to the phase\'s first slide', () => {
  const { model } = buildDeck();
  const n = model.anchors['exercises-orient-and-introspect'];
  assert.equal(typeof n, 'number', 'the exercise include target is an anchor');
  assert.match(model.slides[n].title, /Orient and introspect/);
});

test('anchors: a deep heading id resolves to the slide carrying it', () => {
  const { model } = buildDeck();
  const n = model.anchors['the-named-moves'];
  assert.equal(typeof n, 'number', 'deep links into one section of a reference resolve');
  assert.ok(carriesId(model.slides[n].el, 'the-named-moves'), 'that slide carries the heading');
});

// `slide.querySelector('#id')` is unreliable here: the hidden long-read source
// keeps its copy of every id, and nwsapi resolves an id selector through
// document.getElementById, which finds the source copy first and reports "not
// inside this slide". Ask the slide for its own ids instead.
const carriesId = (el, id) =>
  [...el.querySelectorAll('[id]')].some(n => n.id === id);

function clickLink(dom, text) {
  const a = [...dom.window.document.querySelectorAll('.deck a')]
    .find(x => new RegExp(text, 'i').test(x.textContent));
  assert.ok(a, `link "${text}" is in the deck`);
  const ev = new dom.window.MouseEvent('click', { bubbles: true, cancelable: true });
  a.dispatchEvent(ev);
  return ev;
}
const activeIndex = dom =>
  [...dom.window.document.querySelectorAll('.deck .slide')].findIndex(s => s.classList.contains('is-active'));

test('clicking an in-deck link moves the deck to the target slide', () => {
  const { dom, ctl } = openDeck();
  ctl.go(3); // the prework slide the link lives on
  const before = activeIndex(dom);
  const ev = clickLink(dom, 'build one from zero');
  assert.ok(ev.defaultPrevented, 'the deck handles it instead of the browser (no new tab)');
  const after = activeIndex(dom);
  assert.notEqual(after, before, 'the deck moved');
  assert.match(dom.window.document.querySelectorAll('.deck .slide')[after].textContent,
    /Verification asymmetry/, 'and it moved to the right section');
});

test('a deep heading link lands on the reference slide that carries the heading', () => {
  const { dom, ctl } = openDeck();
  ctl.go(3);
  clickLink(dom, 'the named moves');
  const slide = dom.window.document.querySelectorAll('.deck .slide')[activeIndex(dom)];
  assert.ok(carriesId(slide, 'the-named-moves'), 'active slide carries the target heading');
});

test('diagram zoom links are re-wired on the clone, marker and all', () => {
  const dom = new JSDOM(`<!doctype html><body>${FIXTURE}</body>`, { runScripts: 'outside-only' });
  dom.window.Element.prototype.scrollIntoView = function () {};
  // The long-read pass already ran, so the source link carries the marker that
  // makes decorateDiagramZoom skip it. The clone inherits the marker, not the
  // listener — that is exactly how the deck ended up with three dead links.
  const fig = dom.window.document.createElement('figure');
  fig.className = 'diagram';
  fig.innerHTML = '<img src="data:image/svg+xml,%3Csvg%3E">'
    + '<a class="diagram__zoom" href="#" data-zoom-wired="1" target="_blank">Open in new tab ↗</a>';
  dom.window.document.querySelector('#prework').appendChild(fig);
  const seen = [];
  dom.window.CurriculumRuntime = {
    decorateDiagramZoom(root) {
      seen.push([...root.querySelectorAll('a.diagram__zoom')].map(a => a.getAttribute('data-zoom-wired')));
    },
  };
  dom.window.eval(SLIDES_SRC);
  dom.window.CurriculumSlides.open(dom.window.document.querySelector('main'), { title: 'Fixture' });
  assert.equal(seen.length, 1, 'the deck re-decorates its clone');
  assert.deepEqual(seen[0], [null], 'and clears the stale marker first, or the re-wire no-ops');
});

// The anchor index is a plain object unless something stops it being one, so
// `#constructor` and `#__proto__` resolve to values inherited from
// Object.prototype. Those survive the `n == null` guard, so the deck claims the
// click and calls go() with a function or an object: every slide loses
// is-active, then `slides[n]` is undefined and reading its section code throws.
// The deck goes blank behind stale chrome. Any fragment the deck did not index
// belongs to the browser, whatever Object.prototype happens to carry.
test('a fragment naming an inherited Object property is left to the browser', () => {
  const { dom, ctl } = openDeck();
  ctl.go(3);
  const before = activeIndex(dom);
  assert.equal(clickLink(dom, 'an inherited one').defaultPrevented, false,
    '#constructor is not an anchor the deck owns');
  assert.equal(clickLink(dom, 'its sibling').defaultPrevented, false,
    '#__proto__ is not an anchor the deck owns');
  assert.equal(activeIndex(dom), before, 'neither moved the deck');
  assert.ok(dom.window.document.querySelector('.deck .slide.is-active'),
    'a slide is still active — go(NaN) blanks the deck and leaves nothing selected');
});

test('an unresolvable fragment and an external link are left to the browser', () => {
  const { dom, ctl } = openDeck();
  ctl.go(3);
  const before = activeIndex(dom);
  assert.equal(clickLink(dom, 'dead one').defaultPrevented, false, 'unknown fragment not swallowed');
  assert.equal(clickLink(dom, 'something outside').defaultPrevented, false, 'external link untouched');
  assert.equal(activeIndex(dom), before, 'neither moved the deck');
});

// ── the barebones edition ────────────────────────────────────────────────────
// `maxTier: 1` caps the deck at core: every Recognition (T2) and Story (T3)
// slide drops out, so a room that wants less theory reaches the exercise
// sooner. Same artifact, same source — a filter over the model, not a build
// variant. Structure survives the cut, numbering renumbers, anchors re-point.

function bareDeck(opts) {
  const dom = new JSDOM(FIXTURE, { runScripts: 'outside-only' });
  dom.window.eval(SLIDES_SRC);
  const main = dom.window.document.querySelector('main');
  const model = dom.window.CurriculumSlides.buildDeckModel(
    main.cloneNode(true), Object.assign({ maxTier: 1 }, opts || {}));
  return { model, labels: model.slides.map(s => s.navLabel || s.title).join('\n'), dom };
}

test('barebones drops T2 and T3 slides and keeps the core ones', () => {
  const { labels } = bareDeck();
  assert.doesNotMatch(labels, /Slide A/, 'T3 slide dropped');
  assert.doesNotMatch(labels, /Slide B/, 'T2 slide dropped');
  assert.match(labels, /Slide C/, 'untagged slide kept');
  assert.match(labels, /Step one/, 'exercise slides kept');
});

test('the full deck is the default — no maxTier means nothing is dropped', () => {
  const { labels } = buildDeck();
  assert.match(labels, /Slide A/);
  assert.match(labels, /Slide B/);
  assert.equal(buildDeck().model.maxTier, 3);
});

// A filtered module that lost its title is a module the room cannot name.
test('barebones keeps structure: dividers and doc covers always survive', () => {
  const full = buildDeck().model, bare = bareDeck().model;
  // joined, not deepEqual: the two models come from different JSDOM realms and
  // their Arrays fail a strict prototype check while reading identical
  const codes = m => m.slides.filter(s => s.isDivider && s.el.classList.contains('slide--module')).map(s => s.secCode).join(',');
  assert.equal(codes(bare), codes(full), 'every section opener survives');
  assert.match(bare.slides.map(s => s.navLabel || s.title).join('\n'), /Painting the picture/,
    'the lecture cover survives even though one of its slides did not');
});

test('barebones renumbers within the section — 1..n, no gaps', () => {
  const { model } = bareDeck();
  const content = model.slides.filter(s => s.secCode === 'M1' && !s.isDivider && !s.isCover);
  assert.deepEqual(Array.from(content, s => s.secNum), Array.from(content, (_, i) => i + 1));
  assert.equal(content[0].el.getAttribute('data-ref'), 'm1.1');
});

// An in-deck link is a scroll instruction the deck has to resolve itself. If
// the filter left the anchor map pointing at pre-filter indices, every link in
// barebones would land on the wrong slide — silently, since nothing throws.
test('barebones remaps anchors so in-deck links still land', () => {
  const { model } = bareDeck();
  const target = model.anchors['supplementary-verification-asymmetry'];
  assert.equal(typeof target, 'number');
  assert.ok(target < model.slides.length, 'index is inside the filtered deck');
  assert.match(model.slides[target].navLabel || model.slides[target].title, /Verification asymmetry/);
  const named = model.anchors['the-named-moves'];
  assert.match(model.slides[named].navLabel || model.slides[named].title, /The named moves/);
});

// An anchor whose own slide was cut must resolve forward to the next survivor
// rather than to slide 0 or off the end.
test('an anchor on a dropped slide resolves to the nearest survivor', () => {
  const dom = new JSDOM(FIXTURE.replace('<h2>Slide A</h2>', '<h2 id="slide-a">Slide A</h2>'),
    { runScripts: 'outside-only' });
  dom.window.eval(SLIDES_SRC);
  const main = dom.window.document.querySelector('main');
  const bare = dom.window.CurriculumSlides.buildDeckModel(main.cloneNode(true), { maxTier: 1 });
  const full = dom.window.CurriculumSlides.buildDeckModel(main.cloneNode(true), {});
  assert.match(full.slides[full.anchors['slide-a']].title, /Slide A/, 'full deck lands on it');
  const n = bare.anchors['slide-a'];
  assert.ok(n != null && n >= 0 && n < bare.slides.length, 'still a valid slide in barebones');
  assert.match(bare.slides[n].navLabel || bare.slides[n].title, /Slide C/, 'forward to the next survivor');
});

// srcIndex is the position in the UNFILTERED deck: the only handle stable
// across a rebuild, which is how the toggle keeps the trainer's place.
test('every slide carries its unfiltered position as srcIndex', () => {
  const full = buildDeck().model, bare = bareDeck().model;
  assert.deepEqual(full.slides.map(s => s.srcIndex), full.slides.map((_, i) => i));
  const byTitle = t => full.slides.findIndex(s => (s.navLabel || s.title) === t);
  const c = bare.slides.find(s => (s.navLabel || s.title) === 'Slide C');
  assert.equal(c.srcIndex, byTitle('Slide C'), 'survivors keep their full-deck index');
  assert.equal(bare.total, full.slides.length, 'model reports the unfiltered total');
});

// ── the barebones edition: marked, not cut ───────────────────────────────────
// `markExcluded` keeps every slide the tier cap excludes and watermarks it, so
// a shortened edition shows the shape of what it does not cover. Nothing is
// filtered, so nothing renumbers or remaps — the failure mode to guard is a
// deck that silently starts dropping slides again.

function markedDeck(src) {
  const dom = new JSDOM(src || FIXTURE, { runScripts: 'outside-only' });
  dom.window.eval(SLIDES_SRC);
  const main = dom.window.document.querySelector('main');
  const model = dom.window.CurriculumSlides.buildDeckModel(
    main.cloneNode(true), { maxTier: 1, markExcluded: true });
  return { model, labels: model.slides.map(s => s.navLabel || s.title).join('\n'), dom };
}

test('the marked edition keeps the T2 and T3 slides the cut drops', () => {
  const { model, labels } = markedDeck();
  assert.match(labels, /Slide A/, 'T3 slide still in the deck');
  assert.match(labels, /Slide B/, 'T2 slide still in the deck');
  assert.equal(model.slides.length, model.total, 'nothing filtered');
  assert.equal(bareDeck().model.slides.length < model.total, true, 'the cut deck is the shorter one');
});

test('excluded slides carry the watermark; core slides carry nothing', () => {
  const { model } = markedDeck();
  const byTitle = t => model.slides.find(s => (s.navLabel || s.title) === t);
  const a = byTitle('Slide A'), c = byTitle('Slide C');
  assert.equal(a.excluded, true);
  assert.equal(a.el.getAttribute('data-excluded'), '1');
  assert.ok(a.el.classList.contains('slide--excluded'));
  assert.equal(a.el.querySelector('.slide__excluded').textContent, 'Not included');
  assert.ok(!c.excluded, 'the untagged core slide is untouched');
  assert.equal(c.el.querySelector('.slide__excluded'), null);
  assert.equal(model.excluded, model.slides.filter(s => s.excluded).length);
  assert.ok(model.excluded > 0);
});

// The cut deck renumbers because slides left. The marked deck must not: its
// numbering IS the full deck's, and a reader comparing the two editions in the
// same room would otherwise see two different numbers for one slide.
test('the marked edition keeps full-deck numbering and anchors', () => {
  const full = buildDeck().model, marked = markedDeck().model;
  const refs = m => m.slides.map(s => s.el.getAttribute('data-ref')).join(',');
  assert.equal(refs(marked), refs(full));
  // joined, not deepEqual: the two models come from different JSDOM realms
  assert.equal(marked.slides.map(s => s.srcIndex).join(','), full.slides.map(s => s.srcIndex).join(','));
  assert.equal(marked.anchors['supplementary-verification-asymmetry'],
    full.anchors['supplementary-verification-asymmetry'], 'anchors need no remap');
});

// A doc whose every content slide is excluded is an excluded doc, and its title
// slide is the one thing the marked edition hides rather than stamps: a section
// opener that announces a lecture and then delivers nothing but watermarks is
// worse than no opener at all (Antti 2026-09-01).
test('a doc cover whose every content slide is excluded is dropped, not marked', () => {
  const stripped = FIXTURE.replace('<h2>Slide C</h2><p>body</p>', '');
  const { model } = markedDeck(stripped);
  const labels = model.slides.map(s => s.navLabel || s.title);
  assert.ok(!labels.includes('Painting the picture'), 'the cover is gone from the marked deck');
  assert.ok(labels.includes('Slide A') && labels.includes('Slide B'),
    'its slides are still there, watermarked');
  assert.equal(model.slides[0].excluded, undefined, 'the training cover is never marked');
  const anchor = model.anchors['supplementary-verification-asymmetry'];
  assert.match(model.slides[anchor].navLabel || model.slides[anchor].title, /Verification asymmetry/,
    'anchors are remapped past the dropped cover');
});

// Bug 2026-09-01: an exercise whose first H2 is "Phase 1: …" emits a phase
// DIVIDER immediately after its cover, so the cover's "is everything under me
// filtered?" scan broke out of the loop having seen no content slide at all —
// and fell through to marking the cover. Every exercise in AE101 opens that
// way, so every exercise title slide was cut (or stamped "Not included") while
// the steps underneath it stayed. A cover is only as excluded as the content it
// actually owns; owning none is not the same as owning nothing kept.
const PHASED_FIXTURE = FIXTURE.replace('<h2>Step one</h2>', '<h2>Phase 1: Step one</h2>');

test('a doc cover followed straight by a phase divider is never dropped', () => {
  const dom = new JSDOM(PHASED_FIXTURE, { runScripts: 'outside-only' });
  dom.window.eval(SLIDES_SRC);
  const main = dom.window.document.querySelector('main');
  const S = dom.window.CurriculumSlides;
  const cut = S.buildDeckModel(main.cloneNode(true), { maxTier: 1 });
  const marked = S.buildDeckModel(main.cloneNode(true), { maxTier: 1, markExcluded: true });
  assert.match(cut.slides.map(s => s.navLabel || s.title).join('\n'), /Orient and introspect/,
    'the exercise title survives barebones');
  const cover = marked.slides.find(s => (s.navLabel || s.title) === 'Orient and introspect');
  assert.ok(cover, 'and is in the marked deck');
  assert.ok(!cover.excluded, 'unmarked — its steps are all core');
});

// Bug 2026-09-01: "is everything under me filtered?" walked forward until the
// next cover or divider — but a lecture inlined mid-module is followed by the
// MODULE's own trailing prose (Key Concepts, Optional challenges, Next) with no
// divider between them. So the scan left the lecture, hit a core module slide,
// and kept a cover whose own slides were all excluded. Real case: M4's
// `ironies-of-automation`, two T2 slides, cover still announcing it.
// Ownership is the source doc, not the distance to the next divider.
const TAIL_FIXTURE = FIXTURE
  .replace(/<section class="phase phase--exercise"[\s\S]*?<\/section>/, '')
  .replace('<h2>Slide C</h2><p>body</p>', '');

test('a cover is judged on its own doc, not on the module prose after it', () => {
  const dom = new JSDOM(TAIL_FIXTURE, { runScripts: 'outside-only' });
  dom.window.eval(SLIDES_SRC);
  const main = dom.window.document.querySelector('main');
  const S = dom.window.CurriculumSlides;
  const marked = S.buildDeckModel(main.cloneNode(true), { maxTier: 1, markExcluded: true });
  const cut = S.buildDeckModel(main.cloneNode(true), { maxTier: 1 });
  const labels = m => m.slides.map(s => s.navLabel || s.title).join('\n');
  assert.match(labels(marked), /Key Concepts/, 'the module tail is core and stays');
  assert.doesNotMatch(labels(marked), /Painting the picture/,
    'the all-excluded lecture cover is hidden even though core module prose follows it');
  assert.doesNotMatch(labels(cut), /Painting the picture/, 'and dropped in the cut deck');
});

test('slides.css styles the watermark and the excluded rail row', () => {
  assert.match(SLIDES_CSS, /\.deck \.slide__excluded\s*\{/, 'the watermark rule');
  assert.match(SLIDES_CSS, /\.deck__rail-item--excluded/, 'the rail row rule');
});

test('slides.css styles the barebones switch', () => {
  assert.match(SLIDES_CSS, /\.deck__mode\s*\{/, 'slides.css must carry the .deck__mode rule');
});

// A doc whose every content slide is T2/T3 leaves its cover behind — a title
// slide announcing a lecture that is no longer there. Flagged as an untested
// edge when the filter landed; the M5 tier audit made it live, since barebones
// drops what-packaging-is (4xT2, 3xT3) and the-gate-is-a-claim (4xT2, 2xT3)
// in full. A section divider is different: a module always keeps something.
test('barebones drops a doc cover whose every content slide was filtered', () => {
  // strip the one untagged slide, so the lecture is all-T2/T3
  const stripped = FIXTURE.replace('<h2>Slide C</h2><p>body</p>', '');
  const dom = new JSDOM(stripped, { runScripts: 'outside-only' });
  dom.window.eval(SLIDES_SRC);
  const main = dom.window.document.querySelector('main');
  const full = dom.window.CurriculumSlides.buildDeckModel(main.cloneNode(true), {});
  const bare = dom.window.CurriculumSlides.buildDeckModel(main.cloneNode(true), { maxTier: 1 });
  assert.match(full.slides.map(s => s.navLabel || s.title).join('\n'), /Painting the picture/,
    'the lecture cover is there in the full deck');
  assert.doesNotMatch(bare.slides.map(s => s.navLabel || s.title).join('\n'), /Painting the picture/,
    'and gone in barebones, because nothing of that lecture survived');
});

test('the training cover survives even if a filter emptied everything after it', () => {
  const stripped = FIXTURE.replace('<h2>Slide C</h2><p>body</p>', '');
  const dom = new JSDOM(stripped, { runScripts: 'outside-only' });
  dom.window.eval(SLIDES_SRC);
  const main = dom.window.document.querySelector('main');
  const bare = dom.window.CurriculumSlides.buildDeckModel(main.cloneNode(true), { maxTier: 1 });
  assert.match(bare.slides[0].title, /Agentic Engineering 101/, 'deck still opens on its own cover');
  assert.ok(bare.slides.filter(s => s.isDivider).length >= 4, 'section dividers all survive');
});

// ── arrival fragment (second tab, 2026-09-02) ────────────────────────────────
// A student opens an exercise link in a second tab to keep the instructions
// beside their Claude session. The deck has no scroll, so the browser's own
// fragment jump moves nothing and the tab opens on the cover. `startAnchor`
// resolves the arrival hash through the same index the click handler uses.

function openDeckAt(anchor) {
  const dom = new JSDOM(`<!doctype html><body>${FIXTURE}</body>`, { runScripts: 'outside-only' });
  dom.window.Element.prototype.scrollIntoView = function () {};
  dom.window.eval(SLIDES_SRC);
  const main = dom.window.document.querySelector('main');
  const ctl = dom.window.CurriculumSlides.open(main, { title: 'Fixture', startAnchor: anchor });
  return { dom, ctl };
}

test('startAnchor: an exercise include id opens the deck on that exercise', () => {
  const { dom } = openDeckAt('exercises-orient-and-introspect');
  const slide = dom.window.document.querySelectorAll('.deck .slide')[activeIndex(dom)];
  assert.match(slide.textContent, /Orient and introspect/, 'the deck opens on the exercise, not the cover');
});

test('startAnchor: a percent-encoded fragment resolves like the click handler', () => {
  const { dom } = openDeckAt(encodeURIComponent('the-named-moves'));
  const slide = dom.window.document.querySelectorAll('.deck .slide')[activeIndex(dom)];
  assert.ok(carriesId(slide, 'the-named-moves'), 'lands on the slide carrying the heading');
});

test('startAnchor: an unknown or empty fragment leaves the deck on the cover', () => {
  assert.equal(activeIndex(openDeckAt('nothing-here').dom), 0, 'a dead anchor is a no-op');
  assert.equal(activeIndex(openDeckAt('').dom), 0, 'no fragment, no jump');
  assert.equal(activeIndex(openDeckAt('constructor').dom), 0, 'inherited names do not resolve');
});
