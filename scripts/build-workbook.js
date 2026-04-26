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
  return `    <ol class="toc">\n${items}\n    </ol>`;
}

function buildBody(trainingKey, customer) {
  const t = TRAININGS[trainingKey];
  if (!t) throw new Error(`Unknown training: ${trainingKey}`);

  const cover = `
<header class="cover">
  <p class="cover-eyebrow">${escHtml(customer)} workbook</p>
  <h1 class="cover-title">${escHtml(t.label)}</h1>
  <p class="cover-lede">${escHtml(t.lede)}</p>
</header>

<nav class="toc-wrap">
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

  return cover + '\n' + modules;
}

const STYLES = `
:root {
  --ink: #1a1a1a;
  --ink-muted: #555;
  --bg: #fffefb;
  --accent: #8b1a1a;
  --rule: #d8d4cc;
  --kicker: #888;
  --phase-bg: #f6f3ee;
  --phase-rule: #c4b9a8;
  --max: 760px;
}

* { box-sizing: border-box; }
html, body { margin: 0; padding: 0; }
body {
  font-family: Georgia, "Times New Roman", serif;
  font-size: 16px;
  line-height: 1.6;
  color: var(--ink);
  background: var(--bg);
  max-width: var(--max);
  margin: 0 auto;
  padding: 3rem 2rem 6rem;
}

h1, h2, h3, h4, h5 {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  line-height: 1.25;
  margin-top: 1.8em;
  margin-bottom: 0.6em;
}
h1 { font-size: 2rem; }
h2 { font-size: 1.5rem; border-bottom: 1px solid var(--rule); padding-bottom: 0.3em; }
h3 { font-size: 1.2rem; }
h4 { font-size: 1.05rem; }

p, ul, ol, blockquote { margin: 0.8em 0; }
ul, ol { padding-left: 1.5em; }
li { margin: 0.3em 0; }

a { color: var(--accent); text-decoration: none; border-bottom: 1px solid currentColor; }
a:hover { color: var(--ink); }

code {
  font-family: "SF Mono", Menlo, Monaco, Consolas, monospace;
  font-size: 0.9em;
  background: #f1ede5;
  padding: 0.1em 0.4em;
  border-radius: 3px;
}
pre {
  background: #f1ede5;
  padding: 1em;
  border-radius: 6px;
  overflow-x: auto;
  font-size: 0.85em;
  line-height: 1.5;
}
pre code { background: none; padding: 0; }

blockquote {
  border-left: 3px solid var(--accent);
  padding-left: 1em;
  color: var(--ink-muted);
  font-style: italic;
}

hr {
  border: none;
  border-top: 1px solid var(--rule);
  margin: 2em 0;
}

.cover {
  text-align: center;
  padding: 4rem 0 2rem;
  border-bottom: 1px solid var(--rule);
}
.cover-eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.15em;
  font-size: 0.8rem;
  color: var(--ink-muted);
  margin: 0;
}
.cover-title {
  font-size: 3rem;
  margin: 0.5rem 0;
  letter-spacing: -0.02em;
}
.cover-lede {
  font-size: 1.15rem;
  color: var(--ink-muted);
  font-style: italic;
  margin: 0;
}

.toc-wrap {
  margin: 3rem 0;
  padding: 1.5rem 0;
  border-top: 1px solid var(--rule);
  border-bottom: 1px solid var(--rule);
}
.toc-wrap h2 { margin-top: 0; border: none; padding: 0; }
.toc { list-style: decimal; padding-left: 2em; margin: 0; }
.toc li { margin: 0.4em 0; }

.module {
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 2px solid var(--rule);
}

.phase {
  background: var(--phase-bg);
  border-left: 4px solid var(--phase-rule);
  padding: 1.5rem 1.5rem 1rem;
  margin: 1.5rem 0;
  border-radius: 0 4px 4px 0;
}
.phase-kicker {
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 0.75rem;
  color: var(--kicker);
  font-weight: bold;
  margin-bottom: 0.5em;
}
.phase h1, .phase h2 { font-size: 1.25rem; margin-top: 0.2em; border: none; padding: 0; }

@media print {
  body { max-width: none; padding: 1cm; font-size: 11pt; }
  .module { page-break-before: always; }
  .cover { page-break-after: always; }
  a { color: var(--ink); border-bottom: none; }
  pre, code { font-size: 9pt; }
  @page { margin: 2cm 1.5cm; }
}
`;

function template(title, content) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escHtml(title)}</title>
<style>${STYLES}</style>
</head>
<body>
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
