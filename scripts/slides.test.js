#!/usr/bin/env node
/*
 * Tests for the slide viewer (site/layouts/slides.js) — specifically that the
 * composed (whole-workbook) deck includes EVERY top-level section the long-read
 * renders, not only the modules that happen to contain lecture/exercise phases.
 *
 * Run: node --test scripts/slides.test.js
 *
 * Regression under test (bug 2026-07-09): the Slides layout is the default view,
 * but it walked only `.phase--lecture, .phase--exercise`. Prework, supplementary
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
      <h2>Slide A</h2><p>body</p>
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

  <section class="module" id="supplementary-backpressure">
    <div class="phase-kicker">Supplementary</div>
    <h1>Backpressure</h1>
    <h2>The far-half story</h2><p>body</p>
  </section>

  <section class="module" id="reference-prompt-anatomy">
    <div class="phase-kicker">Reference</div>
    <h1>Prompt anatomy</h1>
    <h2>The named moves</h2><p>body</p>
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
  assert.match(labels, /Backpressure/, 'supplementary title present');
  assert.match(labels, /The far-half story/, 'supplementary body slide present');
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
