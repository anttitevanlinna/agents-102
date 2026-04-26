#!/usr/bin/env node
// Build a single-page workbook HTML for a training.
//
// Usage:
//   node scripts/build-workbook.js <training-key> <customer-slug>
//
// Output: site/clients/<customer-slug>/index.html
//
// Thin wrapper around shared logic in site/layouts/curriculum.js (UMD —
// loads in browser AND Node). The build script does only what the SPA
// can't: synchronous file IO, marked.parse at build time, and writing
// the single-page HTML scaffold. Everything else (TRAININGS registry,
// regex constants, link rewrite, maintainer strip, esc, cardHtml) comes
// from the shared runtime.

const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

const ROOT = path.resolve(__dirname, '..');
const CR = require(path.join(ROOT, 'site/layouts/curriculum.js'));

// Files in curriculum/trainings/<key>/ that don't ship in workbook output.
const TRAINER_ONLY = new Set(['cohort-onboarding-email.md', 'pre-cohort-todos.md']);

function readMd(absPath) {
  if (!fs.existsSync(absPath)) return null;
  return CR.stripMaintainerTail(fs.readFileSync(absPath, 'utf8'));
}

// Workbook target for cross-doc links: in-page anchors `#kind-slug` (single
// page, no router). SPA uses `?file=kind/slug` URLs. Same regex (CR.CROSS_DOC_LINK_RE),
// different replacement template — that's the only delta.
function rewriteCrossDocLinksToAnchors(md) {
  return md.replace(CR.CROSS_DOC_LINK_RE, '](#$1-$2)');
}

// Marked single-tilde strikethrough triggers on patterns like `(~30 min)... (~10 min)`.
// Escape numeric-tildes before parsing.
function escapeTildes(md) {
  return md.replace(/~(\d)/g, '\\~$1');
}

// Replace standalone-paragraph include links with the included file's body
// wrapped in HTML comment markers; postProcessIncludes turns the markers into
// <section class="phase phase--<kind>"> after marked.parse.
function inlineIncludes(md, seen = new Set()) {
  return md.replace(CR.INCLUDE_LINK_RE, (full, title, kindSlug) => {
    const [kind, slug] = kindSlug.split('/');
    const incPath = path.join(ROOT, 'curriculum', kind, slug + '.md');
    const inc = readMd(incPath);
    if (inc === null) return full;
    const key = `${kind}/${slug}`;
    if (seen.has(key)) return full; // prevent loops
    seen.add(key);
    const body = inlineIncludes(inc, seen);
    return `\n\n<!--INC:${kind}:${slug}:${CR.esc(title)}-->\n\n${body}\n\n<!--/INC-->\n\n`;
  });
}

function postProcessIncludes(html) {
  return html
    .replace(/<!--INC:(\w+):([\w-]+):([^-]+(?:-(?!->)[^-]*)*)-->/g, (m, kind, slug) => {
      const singular = kind === 'exercises' ? 'exercise' : 'lecture';
      const labelKind = kind === 'exercises' ? 'Exercise' : 'Lecture';
      return `<section class="phase phase--${singular}" id="${kind}-${slug}">\n<div class="phase-kicker">${labelKind}</div>`;
    })
    .replace(/<!--\/INC-->/g, '</section>');
}

function renderModuleMd(trainingKey, slug) {
  const modPath = path.join(ROOT, 'curriculum/trainings', trainingKey, slug + '.md');
  let md = readMd(modPath);
  if (md === null) throw new Error(`Module not found: ${modPath}`);
  md = inlineIncludes(md);
  md = rewriteCrossDocLinksToAnchors(md);
  md = escapeTildes(md);
  return md;
}

function buildToc(trainingKey, t) {
  // Both prework and modules use the SPA's cardHtml structure — same chrome
  // (numbered card + title + Big Idea preview + arrow). Big Idea pre-filled
  // by reading each module file (SPA hydrates the same field via fetch).
  let html = '';
  if (t.prework) {
    const md = readMd(path.join(ROOT, 'curriculum/trainings', trainingKey, t.prework.slug + '.md')) || '';
    const big = CR.extractBigIdea(md);
    html += `    <ol class="module-list index-prework">\n      ${CR.cardHtml('00', t.prework.title, t.prework.slug, '#' + t.prework.slug, big)}\n    </ol>\n`;
  }
  if (t.modules.length) {
    const items = t.modules
      .map((m, i) => {
        const md = readMd(path.join(ROOT, 'curriculum/trainings', trainingKey, m.slug + '.md')) || '';
        const big = CR.extractBigIdea(md);
        const num = String(i + 1).padStart(2, '0');
        return '      ' + CR.cardHtml(num, m.title, m.slug, '#' + m.slug, big);
      })
      .join('\n');
    html += `    <ol class="module-list index-modules">\n${items}\n    </ol>`;
  }
  return html;
}

function buildTopNav(t, customer) {
  // Short labels for chips: "Prework", "M1", "M2", … so the row stays scannable.
  const chips = [];
  if (t.prework) {
    chips.push(`      <li><a href="#${t.prework.slug}" data-target="${t.prework.slug}">Prework</a></li>`);
  }
  t.modules.forEach((m, i) => {
    chips.push(`      <li><a href="#${m.slug}" data-target="${m.slug}">M${i + 1}</a></li>`);
  });
  return `<nav class="workbook-topnav" aria-label="Workbook navigation">
  <a class="workbook-topnav__home" href="#top">${CR.esc(t.label)} — ${CR.esc(customer)}</a>
  <ol class="workbook-topnav__modules">
${chips.join('\n')}
  </ol>
</nav>`;
}

function buildBody(trainingKey, customer) {
  const t = CR.TRAININGS[trainingKey];
  if (!t) throw new Error(`Unknown training: ${trainingKey}`);

  const topNav = buildTopNav(t, customer);

  const cover = `
<header class="workbook-cover" id="top">
  <p class="eyebrow">${CR.esc(customer)} workbook</p>
  <h1 class="cover-title">${CR.esc(t.label)}</h1>
  <p class="lede">${CR.esc(t.lede)}</p>
</header>

<nav class="workbook-toc">
  <h2>Contents</h2>
${buildToc(trainingKey, t)}
</nav>
`;

  // All modules: prework first (if present), then ordered modules.
  const allModules = [];
  if (t.prework) allModules.push(t.prework);
  t.modules.forEach(m => allModules.push(m));

  const modulesHtml = allModules
    .map(m => {
      if (TRAINER_ONLY.has(m.slug + '.md')) return '';
      const md = renderModuleMd(trainingKey, m.slug);
      let html = marked.parse(md);
      html = postProcessIncludes(html);
      return `<section class="module" id="${m.slug}">\n${html}\n</section>`;
    })
    .filter(Boolean)
    .join('\n\n');

  // Footer markup lives in CR.renderFooter (shared with SPA — single source).
  return topNav + '\n<main>\n' + cover + '\n' + modulesHtml + '\n</main>\n' + CR.renderFooter() + '\n';
}

// ── Inline assets ───────────────────────────────────────────────────────────
const SPA_CSS = fs.readFileSync(path.join(ROOT, 'site/layouts/curriculum.css'), 'utf8');
const SPA_JS = fs.readFileSync(path.join(ROOT, 'site/layouts/curriculum.js'), 'utf8');

// Workbook-only init — runs the shared CurriculumRuntime against document.body
// and adds the active-section IntersectionObserver. The SPA runs the runtime
// against its module-body container and doesn't need active-section.
const WORKBOOK_INIT_JS = `
(function () {
  if (window.CurriculumRuntime) {
    // Numbered hero per module (lifts H1 + Big Idea into module-hero block).
    var trainingKey = document.body.getAttribute('data-training');
    document.querySelectorAll('main > section.module').forEach(function (mod) {
      var num = CurriculumRuntime.moduleNumber(trainingKey, mod.id);
      CurriculumRuntime.buildModuleHero(mod, num);
    });
    CurriculumRuntime.decoratePrompts(document.body);
    CurriculumRuntime.installReadingProgress();
  }

  var chips = document.querySelectorAll('.workbook-topnav__modules a[data-target]');
  if (!chips.length || !('IntersectionObserver' in window)) return;
  var chipBySlug = {};
  chips.forEach(function (a) { chipBySlug[a.getAttribute('data-target')] = a; });

  var visible = {};
  var setActive = function () {
    var bestSlug = null;
    var bestRatio = 0;
    Object.keys(visible).forEach(function (slug) {
      if (visible[slug] > bestRatio) { bestRatio = visible[slug]; bestSlug = slug; }
    });
    chips.forEach(function (a) { a.classList.remove('is-active'); });
    if (bestSlug && chipBySlug[bestSlug]) chipBySlug[bestSlug].classList.add('is-active');
  };

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      var slug = e.target.id;
      visible[slug] = e.isIntersecting ? e.intersectionRatio : 0;
    });
    setActive();
  }, { threshold: [0, 0.25, 0.5, 0.75, 1], rootMargin: '-80px 0px -40% 0px' });

  Object.keys(chipBySlug).forEach(function (slug) {
    var sec = document.getElementById(slug);
    if (sec) io.observe(sec);
  });
})();
`;

function template(title, content, trainingKey) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${CR.esc(title)}</title>
<style>${SPA_CSS}</style>
</head>
<body class="runtime-cli workbook" data-training="${trainingKey}">
${content}
<script>${SPA_JS}</script>
<script>${WORKBOOK_INIT_JS}</script>
</body>
</html>
`;
}

// ── CLI ─────────────────────────────────────────────────────────────────────
const [, , trainingKey, customer] = process.argv;
if (!trainingKey || !customer) {
  console.error('Usage: node scripts/build-workbook.js <training-key> <customer-slug>');
  console.error('  training-key: ' + Object.keys(CR.TRAININGS).join(' | '));
  process.exit(1);
}
if (!CR.TRAININGS[trainingKey]) {
  console.error(`Unknown training: ${trainingKey}`);
  process.exit(1);
}

const outDir = path.join(ROOT, 'site/clients', customer);
fs.mkdirSync(outDir, { recursive: true });
const body = buildBody(trainingKey, customer);
const html = template(`${CR.TRAININGS[trainingKey].label} — ${customer}`, body, trainingKey);
const outFile = path.join(outDir, 'index.html');
fs.writeFileSync(outFile, html);

const sizeKB = (fs.statSync(outFile).size / 1024).toFixed(0);
console.log(`Built ${path.relative(ROOT, outFile)} (${sizeKB} KB)`);
console.log(`Once deployed: https://agents102.bosser.consulting/clients/${customer}/`);
