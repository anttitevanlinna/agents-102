#!/usr/bin/env node
// Build a single-page workbook HTML for a training.
//
// Usage:
//   node scripts/build-workbook.js <training-key> <customer-slug>
//
// Output: site/clients/<customer-slug>/index.html
//
// The workbook concatenates the training's prework + modules in order,
// inlines every referenced lecture and exercise, strips maintainer blocks,
// and rewrites cross-doc links to in-page anchors. The result is one HTML
// file the customer can host (under site/clients/<slug>/) or print to PDF.

const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

const ROOT = path.resolve(__dirname, '..');

const TRAININGS = {
  'agentic-engineering-101': {
    label: 'Agentic Engineering 101',
    lede: 'Six modules. Software engineers becoming Claude wizards on their own codebase.',
    modules: [
      { slug: 'prework', title: 'Prework' },
      { slug: 'getting-going', title: 'Module 1 — Getting going + context' },
      { slug: 'plan-mode-done-right', title: 'Module 2 — Plan mode, done right' },
      { slug: 'earn-the-trust', title: 'Module 3 — Earn the trust' },
      { slug: 'run-the-first-experiment', title: 'Module 4 — Run the first experiment' },
      { slug: 'learn-from-the-test', title: 'Module 5 — Learn from the test, re-send packaged' },
      { slug: 'spot-gaps-build-the-loop', title: 'Module 6 — Spot gaps, build the loop' },
    ],
  },
  bootstrap: {
    label: 'Bootstrap',
    lede: 'Eight modules. The chat-to-systems leap. Build real agents on your own company content.',
    modules: [
      { slug: 'prework', title: 'Prework' },
      { slug: 'getting-going', title: 'Module 1 — Getting Going' },
      { slug: 'building-agent-systems', title: 'Module 2 — Building Agent Systems' },
      { slug: 'multi-agent-systems', title: 'Module 3 — Multi-Agent Systems' },
      { slug: 'security', title: 'Module 4 — Security' },
      { slug: 'output-quality', title: 'Module 5 — Output Quality and Hallucination Control' },
      { slug: 'evaluations', title: 'Module 6 — Evaluations' },
      { slug: 'personal-to-team', title: 'Module 7 — From Personal to Team' },
      { slug: 'agents-building-agents', title: 'Module 8 — Agents Building Agents (The Flywheel)' },
    ],
  },
};

const TRAINER_ONLY = new Set(['cohort-onboarding-email.md', 'pre-cohort-todos.md']);

function stripMaintainer(md) {
  const i = md.indexOf('<!-- maintainer -->');
  return i >= 0 ? md.slice(0, i).trimEnd() + '\n' : md;
}

function readMd(absPath) {
  if (!fs.existsSync(absPath)) return null;
  return stripMaintainer(fs.readFileSync(absPath, 'utf8'));
}

// Rewrite inline cross-doc links from `(kind/slug.md)` (or with ../ prefixes)
// to in-page anchors `(#kind-slug)`. Standalone-paragraph include links are
// handled separately via the include marker.
function rewriteCrossDocLinks(md) {
  return md.replace(
    /\]\((?:\.\.\/)*(reference|supplementary|lectures|exercises)\/([a-z0-9-]+)\.md\)/g,
    '](#$1-$2)'
  );
}

// Process standalone-paragraph include links: a line that is exactly
// `[Any text](exercises|lectures/slug.md)` gets replaced with the file's
// content wrapped in HTML comment markers. We post-process the rendered
// HTML to wrap those markers in <section> blocks with phase-kicker chrome.
function inlineIncludes(md, seen = new Set()) {
  return md.replace(
    /^\[([^\]]+)\]\(((?:exercises|lectures)\/[a-z0-9-]+)\.md\)[ \t]*$/gm,
    (full, title, kindSlug) => {
      const [kind, slug] = kindSlug.split('/');
      const incPath = path.join(ROOT, 'curriculum', kind, slug + '.md');
      const inc = readMd(incPath);
      if (inc === null) return full;
      const key = `${kind}/${slug}`;
      if (seen.has(key)) return full; // prevent loops
      seen.add(key);
      // Recursively expand nested includes first (catches the unrewritten .md paths),
      // then let the caller rewrite any remaining inline links via rewriteCrossDocLinks.
      const body = inlineIncludes(inc, seen);
      return `\n\n<!--INC:${kind}:${slug}:${escAttr(title)}-->\n\n${body}\n\n<!--/INC-->\n\n`;
    }
  );
}

function escAttr(s) {
  return s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
}

function escHtml(s) {
  return s.replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c]);
}

// Escape tildes that look like single-tilde strikethrough to marked
// (e.g., `(~30 min); ...; (~10 min)` gets paired as ~text~).
function escapeTildes(md) {
  return md.replace(/~(\d)/g, '\\~$1');
}

function renderModuleMd(trainingKey, slug) {
  const modPath = path.join(ROOT, 'curriculum/trainings', trainingKey, slug + '.md');
  let md = readMd(modPath);
  if (md === null) throw new Error(`Module not found: ${modPath}`);
  // Order: inline standalone-paragraph includes FIRST (regex matches the .md
  // path), then rewrite remaining inline cross-doc links to anchors.
  md = inlineIncludes(md);
  md = rewriteCrossDocLinks(md);
  md = escapeTildes(md);
  return md;
}

function postProcessIncludes(html) {
  // Wrap <!--INC:kind:slug:title--> ... <!--/INC--> in section chrome.
  return html
    .replace(/<!--INC:(\w+):([\w-]+):([^-]+(?:-(?!->)[^-]*)*)-->/g, (m, kind, slug, title) => {
      const labelKind = kind === 'exercises' ? 'Exercise' : 'Lecture';
      return `<section class="phase phase--${kind}" id="${kind}-${slug}">\n<div class="phase-kicker">${labelKind}</div>`;
    })
    .replace(/<!--\/INC-->/g, '</section>');
}

function buildToc(t) {
  const items = t.modules
    .map(m => `      <li><a href="#${m.slug}">${escHtml(m.title)}</a></li>`)
    .join('\n');
  return `    <ol>\n${items}\n    </ol>`;
}

function buildBody(trainingKey, customer) {
  const t = TRAININGS[trainingKey];
  if (!t) throw new Error(`Unknown training: ${trainingKey}`);

  const cover = `
<header class="workbook-cover">
  <p class="eyebrow">${escHtml(customer)} workbook</p>
  <h1 class="cover-title">${escHtml(t.label)}</h1>
  <p class="lede">${escHtml(t.lede)}</p>
</header>

<nav class="workbook-toc">
  <h2>Contents</h2>
${buildToc(t)}
</nav>
`;

  const modules = t.modules
    .map(m => {
      const md = renderModuleMd(trainingKey, m.slug);
      let html = marked.parse(md);
      html = postProcessIncludes(html);
      return `<section class="module" id="${m.slug}">\n${html}\n</section>`;
    })
    .join('\n\n');

  // Wrap modules in <main> so SPA's main-scoped styles apply.
  return cover + '\n<main>\n' + modules + '\n</main>\n';
}

// Read curriculum.css verbatim. Single source of truth — workbook-specific
// rules (cover, TOC, print) live in that file too, scoped via .workbook-*
// classes that the SPA never emits.
const SPA_CSS = fs.readFileSync(path.join(ROOT, 'site/layouts/curriculum.css'), 'utf8');

function template(title, content) {
  // body.runtime-cli matches the SPA's default; CSS hides rt-cowork / rt-desktop
  // spans for Bootstrap's dual-runtime files. Workbook can't toggle.
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escHtml(title)}</title>
<style>${SPA_CSS}</style>
</head>
<body class="runtime-cli">
${content}
</body>
</html>
`;
}

// CLI ------------------------------------------------------------------------
const [, , trainingKey, customer] = process.argv;
if (!trainingKey || !customer) {
  console.error('Usage: node scripts/build-workbook.js <training-key> <customer-slug>');
  console.error('  training-key: ' + Object.keys(TRAININGS).join(' | '));
  process.exit(1);
}

const t = TRAININGS[trainingKey];
if (!t) {
  console.error(`Unknown training: ${trainingKey}`);
  process.exit(1);
}

const outDir = path.join(ROOT, 'site/clients', customer);
fs.mkdirSync(outDir, { recursive: true });

const body = buildBody(trainingKey, customer);
const html = template(`${t.label} — ${customer}`, body);
const outFile = path.join(outDir, 'index.html');
fs.writeFileSync(outFile, html);

const sizeKB = (fs.statSync(outFile).size / 1024).toFixed(0);
console.log(`Built ${path.relative(ROOT, outFile)} (${sizeKB} KB)`);
console.log(`Once deployed: https://agents102.bosser.consulting/clients/${customer}/`);
