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
    <section class="phase phase--lecture" id="lectures-painting-the-picture">
      <div class="phase-kicker">Lecture</div>
      <h1>Painting the picture</h1>
      <h2>Slide A</h2><p>body</p>
    </section>
    <section class="phase phase--exercise" id="exercises-orient-and-introspect">
      <div class="phase-kicker">Exercise</div>
      <h1>Orient and introspect</h1>
      <h2>Step one</h2><p>body</p>
    </section>
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
