#!/usr/bin/env node
'use strict';
/*
 * build-demos.js — assemble the slide-viewer prototype pages.
 *
 * Purpose: let Antti choose a slide-viewer LAYOUT by opening pages that render
 * real curriculum docs through three different viewer chromes. Content is
 * generated with the exact pipeline the SPA and workbook use
 * (stripMaintainerTail → expandPrompts → escapeTildes → marked → wrapImageFigures),
 * then decorated client-side and split into slides — so what you judge is the
 * viewer, not a mock.
 *
 * Two docs are built by default so the chromes can be compared across a lecture
 * AND a long, widget-heavy exercise. Each output is a single self-contained
 * offline HTML file (curriculum.css + curriculum.js + core + proto CSS/JS all
 * inlined) — which is also the proof the viewer works in a student-built
 * handout, which ships exactly this way.
 *
 * Usage:
 *   node site/curriculum/slide-demos/build-demos.js
 *   node site/curriculum/slide-demos/build-demos.js --doc exercises/walk-and-send-off
 */

const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

const HERE = __dirname;
const ROOT = path.resolve(HERE, '../../..');
const CR = require(path.join(ROOT, 'site/layouts/curriculum.js'));
const { loadRegistry } = require(path.join(ROOT, 'scripts/compile-prompts.js'));

CR.configureMarked(marked);
const REGISTRY = loadRegistry();

function flag(name) {
  const i = process.argv.indexOf('--' + name);
  return i !== -1 && process.argv[i + 1] ? process.argv[i + 1] : null;
}

// The docs to build. Default: one lecture + one long exercise. --doc overrides.
const DEFAULT_DOCS = [
  { kindSlug: 'lectures/what-packaging-is', kind: 'Lecture' },
  { kindSlug: 'exercises/spot-gaps-build-the-loop', kind: 'Exercise' },
];
const DOCS = flag('doc')
  ? [{ kindSlug: flag('doc'), kind: /^exercises\//.test(flag('doc')) ? 'Exercise' : 'Lecture' }]
  : DEFAULT_DOCS;

const CURRICULUM_CSS = fs.readFileSync(path.join(ROOT, 'site/layouts/curriculum.css'), 'utf8');
const CURRICULUM_JS = fs.readFileSync(path.join(ROOT, 'site/layouts/curriculum.js'), 'utf8');
const CORE_JS = fs.readFileSync(path.join(HERE, 'slides-core.js'), 'utf8');
const PATTERNS_CSS = fs.readFileSync(path.join(HERE, 'slides-patterns.css'), 'utf8');
const THEME_DARK_CSS = fs.readFileSync(path.join(HERE, 'theme-dark.css'), 'utf8');

// Render one curriculum doc to body HTML the same way the shipping surfaces do.
function renderDoc(kindSlug) {
  const abs = path.join(ROOT, 'curriculum', kindSlug + '.md');
  let md = fs.readFileSync(abs, 'utf8');
  md = CR.stripMaintainerTail(md);
  md = CR.expandPrompts(md, REGISTRY, { strict: true });
  md = CR.escapeTildes(md);
  let html = marked.parse(md);
  html = CR.wrapImageFigures(html);
  return html;
}

// Runs after curriculum.js and slides-core.js have loaded. Mirrors the SPA
// standalone path (decorate widgets, NOT the module hero / reading progress),
// then lifts the exercise-grammar patterns — both BEFORE the proto splits.
const DECORATE_INIT = `
(function () {
  var CR = window.CurriculumRuntime;
  var doc = document.getElementById('doc');
  if (!CR || !doc) return;
  try {
    CR.decorateSessions(doc);
    CR.decorateHox(doc);
    CR.decorateNote(doc);
    CR.decoratePrompts(doc);
    CR.decorateDiagramZoom(doc);
    if (window.SlidesCore) window.SlidesCore.decoratePatterns(doc);
  } catch (e) { console.warn('decorate failed', e); }
})();`;

const PROTOS = [
  { id: 'proto-a-deck', letter: 'A', name: 'Deck',
    tagline: 'One slide at a time. Keyboard-driven, projector-first — ← → or space; O for overview.' },
  { id: 'proto-b-rail', letter: 'B', name: 'Rail',
    tagline: 'Scroll-snap cards with a wayfinding rail. Self-study-first — just scroll; the rail tracks you.' },
  { id: 'proto-c-grid', letter: 'C', name: 'Grid',
    tagline: 'Contact-sheet of every slide that zooms into a filmstrip. Structure-first.' },
];

const slugOf = (kindSlug) => kindSlug.split('/').pop();
const outName = (kindSlug, protoId) => `${slugOf(kindSlug)}--${protoId}.html`;

function pageHtml(proto, doc, bodyHtml, title) {
  const css = fs.readFileSync(path.join(HERE, proto.id + '.css'), 'utf8');
  const js = fs.readFileSync(path.join(HERE, proto.id + '.js'), 'utf8');
  // Exercises render in the dark "hands-on" mood; lectures stay cream.
  const dark = doc.kind === 'Exercise';
  return `<!DOCTYPE html>
<html lang="en"${dark ? ' data-theme="dark"' : ''}>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
<title>Proto ${proto.letter} · ${proto.name} — ${title}</title>
<style>
${CURRICULUM_CSS}
</style>
<style>
${PATTERNS_CSS}
</style>${dark ? `
<style>
${THEME_DARK_CSS}
</style>` : ''}
<style>
${css}
</style>
</head>
<body>
<a class="proto-switch" href="index.html" title="Back to prototype picker">&#8592; protos</a>
<div id="doc" class="slides-source" hidden>${bodyHtml}</div>
<script>${CURRICULUM_JS}</script>
<script>${CORE_JS}</script>
<script>${DECORATE_INIT}</script>
<script>
${js}</script>
</body>
</html>`;
}

function indexHtml(rows) {
  const sections = rows.map(r => `
    <section class="docrow">
      <div class="docrow__head">
        <span class="docrow__kind">${r.kind}</span>
        <h2 class="docrow__title">${r.title}</h2>
        <span class="docrow__meta"><code>${r.kindSlug}</code></span>
      </div>
      <div class="picks">${PROTOS.map(p => `
        <a class="pick" href="${outName(r.kindSlug, p.id)}">
          <span class="pick__letter">${p.letter}</span>
          <span class="pick__name">${p.name}</span>
          <span class="pick__tag">${p.tagline}</span>
        </a>`).join('')}</div>
    </section>`).join('');
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Slide-viewer prototypes — Agents 102</title>
<style>
${CURRICULUM_CSS}
.wrap { max-width: 56rem; margin: 0 auto; padding: clamp(2rem,7vh,4rem) 1.5rem 4rem; }
.wrap h1 { font-family: var(--font-display); font-weight: 200; font-size: clamp(2.2rem,6vw,3.6rem); line-height: 1; margin: 0 0 .5rem; }
.wrap .lede { font-family: var(--font-serif); font-style: italic; font-size: 1.2rem; color: var(--fg-2); margin: 0 0 2.5rem; max-width: 44em; }
.docrow { margin: 0 0 2.6rem; }
.docrow__head { display: flex; align-items: baseline; gap: .8rem; flex-wrap: wrap; margin: 0 0 1rem;
  padding-bottom: .6rem; border-bottom: 1px solid var(--line-2); }
.docrow__kind { font-family: var(--font-body); font-size: .72rem; letter-spacing: .1em; text-transform: uppercase;
  color: #fff; background: var(--accent); border-radius: 4px; padding: .15rem .5rem; }
.docrow__title { font-family: var(--font-display); font-weight: 300; font-size: 1.6rem; margin: 0; }
.docrow__meta { color: var(--fg-3); font-size: .82rem; margin-left: auto; }
.docrow__meta code { background: var(--bg-3); padding: .1em .4em; border-radius: 3px; }
.picks { display: grid; grid-template-columns: repeat(3, 1fr); gap: .9rem; }
.pick { display: grid; grid-template-rows: auto auto auto; gap: .3rem;
  text-decoration: none; color: var(--fg); background: var(--bg-2); border: 1px solid var(--line-2);
  border-radius: 10px; padding: 1.1rem 1.2rem; transition: border-color .15s, transform .15s, background .15s; }
.pick:hover { border-color: var(--accent); transform: translateY(-2px); background: #fff; }
.pick__letter { font-family: var(--font-display); font-weight: 200; font-size: 1.8rem; color: var(--accent); line-height: 1; }
.pick__name { font-family: var(--font-display); font-weight: 400; font-size: 1.15rem; }
.pick__tag { color: var(--fg-2); font-size: .86rem; line-height: 1.45; }
.foot { margin-top: 1rem; color: var(--fg-3); font-size: .9rem; line-height: 1.6; }
.foot code { background: var(--bg-3); padding: .1em .35em; border-radius: 3px; }
@media (max-width: 680px) { .picks { grid-template-columns: 1fr; } }
</style>
</head>
<body>
<div class="wrap">
  <h1>Slide viewer — layouts × content</h1>
  <p class="lede">Three chromes (A Deck · B Rail · C Grid), now across a lecture and a long exercise. Same split runs everything, so the winner drops straight into the SPA and the student handout.</p>
  ${sections}
  <p class="foot">Rendered through the real pipeline, decorated, then split on <code>&lt;h2&gt;</code> (one section = one slide). Each page is self-contained and offline — exactly how a student-built handout ships. Rebuild: <code>node site/curriculum/slide-demos/build-demos.js</code>.</p>
</div>
</body>
</html>`;
}

// ── build ───────────────────────────────────────────────────────────────────
const rows = [];
let n = 0;
for (const doc of DOCS) {
  const bodyHtml = renderDoc(doc.kindSlug);
  const titleMatch = bodyHtml.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
  const title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : slugOf(doc.kindSlug);
  for (const proto of PROTOS) {
    const out = path.join(HERE, outName(doc.kindSlug, proto.id));
    fs.writeFileSync(out, pageHtml(proto, doc, bodyHtml, title));
    console.log('  wrote ' + path.relative(ROOT, out));
    n++;
  }
  rows.push({ kindSlug: doc.kindSlug, kind: doc.kind, title });
}
fs.writeFileSync(path.join(HERE, 'index.html'), indexHtml(rows));
console.log('  wrote ' + path.relative(ROOT, path.join(HERE, 'index.html')));
console.log(`\n✓ built ${n} prototype pages across ${DOCS.length} doc(s)\n  open site/curriculum/slide-demos/index.html`);
