#!/usr/bin/env node
// Build single-page workbook HTML for one customer and one or more trainings.
//
// Usage:
//   node scripts/build-workbook.js <customer-slug> <training-key|training-key,...|all>
//   node scripts/build-workbook.js <customer-slug> <training-key> <training-key> ...
//
// Legacy usage still works for a single training:
//   node scripts/build-workbook.js <training-key> <customer-slug>
//
// Student-facing build (no trainer docs):
//   node scripts/build-workbook.js <customer-slug> <training-key> --no-trainer-docs
//   skips trainer-guide.html + trainer-modules.html. A short/preview cut is its
//   own TRAININGS entry with a `contentKey` alias (e.g. agentic-engineering-101-preview
//   → agentic-engineering-101), not a build flag.
//
// Output:
//   site/clients/<customer-slug>/index.html                    customer index
//   site/clients/<customer-slug>/<training-key>/index.html     workbook
//   site/clients/<customer-slug>/<training-key>/trainer-guide.html (when that training has trainer-guide.md)
//   site/clients/<customer-slug>/<training-key>/*.tar.gz       training payloads
//
// Thin wrapper around shared logic in site/layouts/curriculum.js (UMD —
// loads in browser AND Node). The build script does only what the SPA
// can't: synchronous file IO, marked.parse at build time, and writing
// the single-page HTML scaffold. Everything else (TRAININGS registry,
// regex constants, link rewrite, maintainer strip, esc, cardHtml) comes
// from the shared runtime.

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { marked } = require('marked');

const ROOT = path.resolve(__dirname, '..');
const CR = require(path.join(ROOT, 'site/layouts/curriculum.js'));
const { loadRegistry, writeRegistry, OUT_FILE: PROMPTS_JSON } = require('./compile-prompts.js');

// Wire heading-id generation into marked so cross-doc anchor links
// (`target.md#section-anchor`) resolve in workbook output.
CR.configureMarked(marked);

// Load the prompt registry once at script start. readMd() expands
// `{{prompt:key}}` markers using this registry before any markdown processing.
// The same registry is also written to site/prompts.json for the SPA path.
//
// loadRegistry throws on duplicate keys, missing required fields, or filename
// ↔ key mismatches — caught here so the build aborts before any HTML lands.
let PROMPT_REGISTRY;
try {
  PROMPT_REGISTRY = loadRegistry();
} catch (e) {
  console.error('Build aborted: prompt registry failed to load.');
  console.error('  ' + e.message);
  process.exit(1);
}
writeRegistry(PROMPT_REGISTRY, PROMPTS_JSON);
console.log(`Loaded ${Object.keys(PROMPT_REGISTRY).length} prompts from curriculum/prompts/`);

// Soft sanity check on registry frontmatter values. Strict expansion already
// fails on unresolved keys; these checks catch typos in dest/runtime that
// would still expand but render with the wrong chip label or runtime fork.
// Domain-specific dest values (e.g. "central synthesizer", "buyer/sponsor
// agent") are intentional role labels in multi-agent exercises. The renderer
// just displays the string verbatim as the destination chip; new entries
// here are an opt-in to silence the typo warning.
const KNOWN_DESTS = new Set([
  'Claude Code',
  'Cowork',
  'Builder Claude',
  'central synthesizer',
  'buyer/sponsor agent'
]);
const KNOWN_RUNTIMES = new Set(['any', 'cli', 'desktop', 'cowork']);
(function auditRegistryValues() {
  const odd = { dest: [], runtime: [] };
  for (const [key, entry] of Object.entries(PROMPT_REGISTRY)) {
    if (entry.dest && !KNOWN_DESTS.has(entry.dest)) odd.dest.push(`${key}: dest="${entry.dest}"`);
    if (entry.runtime && !KNOWN_RUNTIMES.has(entry.runtime)) odd.runtime.push(`${key}: runtime="${entry.runtime}"`);
  }
  if (odd.dest.length) {
    console.warn('  [warn] uncommon dest values (typo? add to KNOWN_DESTS if intentional):');
    odd.dest.forEach(s => console.warn('    ' + s));
  }
  if (odd.runtime.length) {
    console.warn('  [warn] unknown runtime values (expected: any|cli|desktop|cowork):');
    odd.runtime.forEach(s => console.warn('    ' + s));
  }
})();

// Files in curriculum/trainings/<key>/ that don't ship in workbook output.
const TRAINER_ONLY = new Set(['cohort-onboarding-email.md', 'pre-cohort-todos.md']);

// ── Theory handbook manifest ────────────────────────────────────────────────
// `node scripts/build-workbook.js <customer> <training> --theory` assembles
// ONLY these docs — student bodies, no exercises, no module chrome — into
// site/clients/<customer>/<training>/theory-handbook.html. A maintainer
// reading/checking artifact: the full theory in one continuous read.
//
// Grouped by module beat. One entry per line — strike or add a line to trim.
//   'lectures/<slug>'      → curriculum/lectures/<slug>.md
//   'supplementary/<slug>' → curriculum/trainings/<training>/supplementary/<slug>.md
// Dual-wired lectures appear once, at their owning module. Duplicates and
// missing files fail the build.
// story-of-module-6 stays in the M6 module as the opener memo but is not
// theory — deliberately excluded from this manifest.
const THEORY_HANDBOOK_MANIFEST = {
  'agentic-engineering-101': [
    ['M1', [
      'lectures/painting-the-picture-with-the-llm',
      'lectures/the-wizard-move',
      'lectures/the-machine-you-just-met',
      'lectures/how-this-training-was-built',
    ]],
    ['M2', [
      'lectures/the-whole-map',
      'lectures/when-a-plan-is-good',
      'lectures/where-the-rule-could-live',
    ]],
    ['M3', [
      'lectures/skills-from-the-frontier',
      'lectures/the-loop-half-filled',
      'supplementary/the-lethal-trifecta',
    ]],
    ['M4', [
      'lectures/the-far-half',
      'lectures/ironies-of-automation',
      'lectures/the-agent-loop',
      'lectures/test-and-learn',
      'lectures/will-company-memory-emerge',
      'lectures/reading-the-return',
      'supplementary/verification-asymmetry',
    ]],
    ['M5', [
      'lectures/learning-through-contrast',
      'lectures/what-packaging-is',
      'lectures/the-gate-is-a-claim',
      'supplementary/backpressure',
    ]],
    ['M6', [
      'lectures/the-2-frontiers',
      'lectures/quality-is-grounding',
      'lectures/composing-the-workflow',
      'lectures/the-loop-has-a-name',
      'lectures/the-map-filled-in',
      'lectures/agents-that-build-agents',
    ]],
  ],
};

function readMd(absPath) {
  if (!fs.existsSync(absPath)) return null;
  const raw = fs.readFileSync(absPath, 'utf8');
  const stripped = CR.stripMaintainerTail(raw);
  // Strict mode: any unresolved {{prompt:<key>}} marker fails the build,
  // pointing at the offending file via the path included in the error.
  try {
    return CR.expandPrompts(stripped, PROMPT_REGISTRY, { strict: true });
  } catch (e) {
    throw new Error(`${path.relative(ROOT, absPath)}: ${e.message}`);
  }
}

// Workbook target for cross-doc links: in-page anchors `#kind-slug` (single
// page, no router). SPA uses `?file=kind/slug` URLs.
//
// Two patterns to handle:
//   - Shared exercises/lectures:  (exercises|lectures)/<slug>.md  →  #<kind>-<slug>
//   - Training-specific ref/sup:  trainings/<t>/(reference|supplementary)/<slug>.md
//                                  →  #<kind>-<slug>  (collapsed to slug; ref/sup
//                                  pages aren't rendered in the workbook so the
//                                  anchor is non-resolving by design — students
//                                  read those files locally from the tarball).
// When the source link carries a `#anchor` fragment we route to that heading's
// slug directly (heading IDs are page-unique on the single-page workbook).
// Without a fragment, fall back to the section wrapper anchor `#<kind>-<slug>`.
function rewriteCrossDocLinksToAnchors(md) {
  return md
    .replace(CR.CROSS_DOC_SHARED_RE,      (_, kind, slug, hash) => hash ? '](' + hash + ')' : '](#' + kind + '-' + slug + ')')
    .replace(CR.CROSS_DOC_TRAINING_KS_RE, (_, kind, slug, hash) => hash ? '](' + hash + ')' : '](#' + kind + '-' + slug + ')');
}

// escapeTildes lives in shared CR for SPA + workbook parity.
const escapeTildes = CR.escapeTildes;

// The workbook is a single self-contained HTML file (CSS + JS already inlined),
// so diagrams that ship alongside a doc as PNGs can't be linked by relative
// path — there's no sibling asset tree at the deploy target. Inline each
// relative image target as a base64 data URI, reading it from the doc's own
// directory. docDir is the absolute dir of the source .md.
const IMG_MIME = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
};

function inlineImages(md, docDir) {
  return CR.rewriteImageTargets(md, target => {
    const ext = path.extname(target).toLowerCase();
    const mime = IMG_MIME[ext];
    const abs = path.join(docDir, target);
    if (!mime || !fs.existsSync(abs)) {
      console.warn(`  [warn] image not inlined (missing or unknown type): ${target}`);
      return target;
    }
    const b64 = fs.readFileSync(abs).toString('base64');
    return `data:${mime};base64,${b64}`;
  });
}

function plainDisplayText(value) {
  return value.replace(/[*_`]/g, '');
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

function renderModuleMd(trainingKey, slug, contentUrl) {
  const modPath = path.join(ROOT, 'curriculum/trainings', trainingKey, slug + '.md');
  let md = readMd(modPath);
  if (md === null) throw new Error(`Module not found: ${modPath}`);
  md = inlineIncludes(md);
  md = rewriteCrossDocLinksToAnchors(md);
  md = escapeTildes(md);
  if (contentUrl) md = md.replace(/<CONTENT_URL>/g, contentUrl);
  return md;
}

function buildToc(contentKey, t) {
  // Single source: CR.buildTocSections. Workbook URL strategy is in-page anchors;
  // Big Ideas pre-filled sync at build time (no async hydration like the SPA).
  // Memoize per-slug Big Idea reads since the same module file gets opened
  // for both TOC and module body. contentKey is where the module FILES live
  // (a variant training reads them from its parent's dir); TOC anchors are
  // slug-only, so the moduleHref callback below ignores the key entirely.
  const bigIdeaCache = {};
  function bigIdeaFor(slug) {
    if (slug in bigIdeaCache) return bigIdeaCache[slug];
    const modPath = path.join(ROOT, 'curriculum/trainings', contentKey, slug + '.md');
    const md = readMd(modPath) || '';
    return (bigIdeaCache[slug] = CR.extractBigIdea(md));
  }
  return CR.buildTocSections(t, {
    trainingKey: contentKey,
    moduleHref: (k, s) => '#' + s,
    fileHref: (kind, s) => '#' + kind + '-' + s,
    trainerGuideHref: './trainer-guide.html',
    bigIdeaFor: bigIdeaFor,
    showModuleCountHeading: false,
    headingTag: 'h3'
  });
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

function buildBody(trainingKey, customer, contentUrl) {
  const raw = CR.TRAININGS[trainingKey];
  if (!raw) throw new Error(`Unknown training: ${trainingKey}`);
  // A variant training (contentKey set) reads its FILES from another training's
  // content dir and inherits that parent's prework + supplementaries + references
  // unless it overrides them; its own (cut) modules list and label/lede win.
  // Non-variant trainings resolve contentKey to themselves and are unchanged.
  const contentKey = raw.contentKey || trainingKey;
  const t = raw.contentKey ? Object.assign({}, CR.TRAININGS[contentKey], raw) : raw;

  const topNav = buildTopNav(t, customer);

  const cover = `
<header class="workbook-cover" id="top">
  <p class="eyebrow">${CR.esc(customer)} workbook</p>
  <h1 class="cover-title">${CR.esc(t.label)}</h1>
  <p class="lede">${CR.esc(plainDisplayText(t.lede))}</p>
</header>

<nav class="workbook-toc">
  <h2>Contents</h2>
${buildToc(contentKey, t)}
</nav>
`;

  // All modules: prework first (if present), then ordered modules, then optional.
  const allModules = [];
  if (t.prework) allModules.push(t.prework);
  t.modules.forEach(m => allModules.push(m));
  if (t.optionalModules) t.optionalModules.forEach(m => allModules.push(m));

  const modulesHtml = allModules
    .map(m => {
      if (TRAINER_ONLY.has(m.slug + '.md')) return '';
      const md = renderModuleMd(contentKey, m.slug, contentUrl);
      let html = marked.parse(md);
      html = postProcessIncludes(html);
      html = CR.wrapImageFigures(html);
      return `<section class="module" id="${m.slug}">\n${html}\n</section>`;
    })
    .filter(Boolean)
    .join('\n\n');

  // Supplementary + reference docs — render bodies so the workbook TOC anchors
  // (#supplementary-foo, #reference-bar) resolve and cross-doc links from
  // module bodies don't die. Same chrome as modules; no Big Idea hero.
  // Files live under curriculum/trainings/<training>/<kind>/<slug>.md.
  function renderStandalone(kind, slug) {
    const docPath = path.join(ROOT, 'curriculum/trainings', contentKey, kind, slug + '.md');
    let md = readMd(docPath);
    // A registry slug with no backing file is always a dead nav link: the index
    // (built from the registry) links to #<kind>-<slug>, but no section renders.
    // Abort instead of silently shipping N-1 sections (unlike modules, there is
    // no TRAINER_ONLY carve-out for supplementaries/references).
    if (md === null) {
      throw new Error(
        `${contentKey} registry lists ${kind} "${slug}" but ${path.relative(ROOT, docPath)} does not exist. ` +
        `Add the file or remove the entry from TRAININGS.${contentKey}.${kind === 'supplementary' ? 'supplementaries' : 'references'} in site/layouts/curriculum.js.`
      );
    }
    md = md
      .replace(CR.CROSS_DOC_SHARED_RE,      (_, k, s, hash) => hash ? '](' + hash + ')' : '](#' + k + '-' + s + ')')
      .replace(CR.CROSS_DOC_TRAINING_KS_RE, (_, k, s, hash) => hash ? '](' + hash + ')' : '](#' + k + '-' + s + ')');
    md = inlineImages(md, path.dirname(docPath));
    md = escapeTildes(md);
    const labelKind = kind === 'supplementary' ? 'Supplementary' : 'Reference';
    return `<section class="module" id="${kind}-${slug}">\n<div class="phase-kicker">${labelKind}</div>\n${CR.wrapImageFigures(marked.parse(md))}\n</section>`;
  }

  const standaloneHtml = []
    .concat((t.supplementaries || []).map(s => renderStandalone('supplementary', s.slug)))
    .concat((t.references || []).map(r => renderStandalone('reference', r.slug)))
    .filter(Boolean)
    .join('\n\n');

  const allBody = standaloneHtml ? modulesHtml + '\n\n' + standaloneHtml : modulesHtml;

  // Footer markup lives in CR.renderFooter (shared with SPA — single source).
  return topNav + '\n<main>\n' + cover + '\n' + allBody + '\n</main>\n' + CR.renderFooter() + '\n';
}

// ── Inline assets ───────────────────────────────────────────────────────────
const SPA_CSS = fs.readFileSync(path.join(ROOT, 'site/layouts/curriculum.css'), 'utf8');
const SPA_JS = fs.readFileSync(path.join(ROOT, 'site/layouts/curriculum.js'), 'utf8');
// The slide viewer (Long-read ⇄ Slides). Inlined so the handbook keeps working
// offline; inert until the reader toggles Slides.
const SLIDES_CSS = fs.readFileSync(path.join(ROOT, 'site/layouts/slides.css'), 'utf8');
const SLIDES_JS = fs.readFileSync(path.join(ROOT, 'site/layouts/slides.js'), 'utf8');

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
    CurriculumRuntime.decorateSessions(document.body);
    CurriculumRuntime.decorateHox(document.body);
    CurriculumRuntime.decorateNote(document.body);
    CurriculumRuntime.decoratePrompts(document.body);
    CurriculumRuntime.decorateDiagramZoom(document.body);
    CurriculumRuntime.installReadingProgress();
  }

  // Layout mode: Long-read (scroll) ⇄ Slides (whole training as one deck).
  // Default long-read; choice remembered (localStorage, shared key with the SPA).
  (function () {
    if (!window.CurriculumSlides) return;
    var main = document.querySelector('main');
    if (!main) return;
    var KEY = 'curriculumLayout';
    var mode = (function () { try { return localStorage.getItem(KEY) === 'slides' ? 'slides' : 'read'; } catch (e) { return 'read'; } })();
    var ctl = null, toggle = null;
    function apply() {
      if (mode === 'slides') {
        if (!ctl) ctl = CurriculumSlides.open(main, { title: (document.title || '').replace(/\\s+—\\s+.*$/, ''), onExit: function () { set('read'); } });
      } else if (ctl) { ctl.close(); ctl = null; }
    }
    function set(m) { mode = m; try { localStorage.setItem(KEY, m); } catch (e) {} if (toggle && toggle._paint) toggle._paint(m); apply(); }
    var host = document.querySelector('.workbook-topnav') || document.body;
    toggle = CurriculumSlides.buildToggle(mode, set);
    toggle.classList.add('workbook-layout-toggle');
    host.appendChild(toggle);
    apply();
  })();

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

// Trainer guide: training-specific .md → standalone HTML
// at site/clients/<customer>/<training>/trainer-guide.html. Same chrome (CSS +
// decorations) as the workbook, but no module spine — one document, rendered
// top-to-bottom.
function buildTrainerGuide(customer, trainingKey) {
  const guidePath = path.join(ROOT, 'curriculum/trainings', trainingKey, 'trainer-guide.md');
  let md = readMd(guidePath);
  if (md === null) return null;
  md = escapeTildes(md);
  // Rewrite cross-doc links to absolute customer-workbook anchors so the trainer
  // can click a `[reference](trainings/<t>/reference/foo.md)` ref in the guide
  // and land in the workbook's matching section. No SPA, no router — anchor
  // targets only.
  md = md
    .replace(CR.CROSS_DOC_SHARED_RE,      (_, k, s, hash) => hash ? '](./' + hash + ')' : '](./#' + k + '-' + s + ')')
    .replace(CR.CROSS_DOC_TRAINING_KS_RE, (_, k, s, hash) => hash ? '](./' + hash + ')' : '](./#' + k + '-' + s + ')');
  const bodyHtml = marked.parse(md);

  const cover = `
<header class="workbook-cover" id="top">
  <p class="eyebrow">${CR.esc(customer)} workbook</p>
  <h1 class="cover-title">Trainer delivery guide</h1>
</header>
`;
  const main = '<main>\n' + cover + '\n<section class="module" id="trainer-guide">\n' + bodyHtml + '\n</section>\n</main>\n';
  return main + CR.renderFooter() + '\n';
}

const TRAINER_GUIDE_INIT_JS = `
(function () {
  if (window.CurriculumRuntime) {
    CurriculumRuntime.decorateSessions(document.body);
    CurriculumRuntime.decorateHox(document.body);
    CurriculumRuntime.decorateNote(document.body);
    CurriculumRuntime.decoratePrompts(document.body);
    CurriculumRuntime.decorateDiagramZoom(document.body);
    CurriculumRuntime.installReadingProgress();
  }
})();
`;

// Trainer pages run wider than the student workbook — the trainer reads dense
// reference prose, not a projected module spine. Scoped to the trainer
// templates so the workbook's .module keeps its narrower projected measure.
const TRAINER_WIDTH_CSS = `.module { max-width: 56em; }`;

function trainerGuideTemplate(customer, content) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Trainer delivery guide — ${CR.esc(customer)}</title>
<style>${SPA_CSS}
${TRAINER_WIDTH_CSS}</style>
</head>
<body class="runtime-cli workbook">
${content}
<script>${SPA_JS}</script>
<script>${TRAINER_GUIDE_INIT_JS}</script>
</body>
</html>
`;
}

// Trainer modules: a per-module one-pager rendered beside the workbook +
// trainer guide. Same chrome, but one module at a time — a sticky tab strip
// + :target show/hide on .module-glance sections. Source:
// curriculum/trainings/<t>/trainer-modules.md (markdown bodies inside raw-HTML
// <nav>/<section> wrappers; marked parses markdown nested in blank-line-
// separated block HTML). The outer <section class="module" id="trainer-modules">
// wrapper is added here so the :has() default-panel fallback selector resolves.
const TRAINER_MODULES_TABS_CSS = `
/* ── Per-module focused view ── Only one .module-glance is visible at a time,
   selected by URL hash. A tiny JS shim sets the default hash on load and keeps
   the active tab highlighted on hashchange. */
.module-tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin: 1.25rem 0 2rem;
    padding-bottom: 0.8rem;
    border-bottom: 1px solid var(--line-2);
    position: sticky;
    top: 0;
    background: var(--bg);
    z-index: 5;
    padding-top: 0.8rem;
}
.module-tabs a {
    display: inline-block;
    padding: 0.45rem 0.95rem;
    border: 1px solid var(--line-2);
    border-radius: 999px;
    text-decoration: none;
    color: var(--fg-2);
    font-size: 0.92rem;
    font-weight: 500;
    background: transparent;
    transition: background 0.12s, color 0.12s, border-color 0.12s;
}
.module-tabs a:hover {
    color: var(--accent);
    border-color: var(--accent);
}
.module-tabs a.is-active {
    background: var(--accent);
    color: #fff;
    border-color: var(--accent);
}
.module-glance { display: none; }
.module-glance:target { display: block; }
/* Default landing when no hash is set: show M1. Uses :has() to detect "no
   .module-glance is currently targeted" and falls back to the M1 panel. Works
   without JS. JS still replaces the URL hash to #m1-glance on load so the
   URL is shareable, but the visual state is correct either way. */
section.module#trainer-modules:not(:has(.module-glance:target)) .module-glance#m1-glance { display: block; }`;

const TRAINER_MODULES_TAB_JS = `
// Per-module focused view: keep the URL shareable and the active tab highlighted.
// The :target + :has() CSS handles show/hide; this script only writes #m1-glance
// to the URL on first load and toggles the .is-active class on the tab strip.
(function () {
    var VALID = { '#m1-glance':1, '#m2-glance':1, '#m3-glance':1, '#m4-glance':1, '#m5-glance':1, '#m6-glance':1 };
    function activeHash() { return VALID[location.hash] ? location.hash : '#m1-glance'; }
    function syncTabs() {
        var hash = activeHash();
        document.querySelectorAll('.module-tabs a').forEach(function (a) {
            a.classList.toggle('is-active', a.getAttribute('href') === hash);
        });
    }
    if (!VALID[location.hash]) history.replaceState(null, '', '#m1-glance');
    syncTabs();
    window.addEventListener('hashchange', syncTabs);
})();
`;

function buildTrainerModules(customer, trainingKey) {
  const srcPath = path.join(ROOT, 'curriculum/trainings', trainingKey, 'trainer-modules.md');
  let md = readMd(srcPath);
  if (md === null) return null;
  md = escapeTildes(md);
  // Same cross-doc link rewrite as the trainer guide: a `.md` ref into the
  // workbook becomes an absolute-to-this-dir anchor. The page's own
  // `./#section` and same-page `#m1-glance` links already match no pattern and
  // pass through untouched.
  md = md
    .replace(CR.CROSS_DOC_SHARED_RE,      (_, k, s, hash) => hash ? '](./' + hash + ')' : '](./#' + k + '-' + s + ')')
    .replace(CR.CROSS_DOC_TRAINING_KS_RE, (_, k, s, hash) => hash ? '](./' + hash + ')' : '](./#' + k + '-' + s + ')');
  const bodyHtml = marked.parse(md);

  const cover = `
<header class="workbook-cover" id="top">
  <p class="eyebrow">${CR.esc(customer)} workbook</p>
  <h1 class="cover-title">Per-module glance</h1>
</header>
`;
  const main = '<main>\n' + cover + '\n<section class="module" id="trainer-modules">\n' + bodyHtml + '\n</section>\n</main>\n';
  return main + CR.renderFooter() + '\n';
}

function trainerModulesTemplate(customer, content) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Per-module glance — ${CR.esc(customer)}</title>
<style>${SPA_CSS}
${TRAINER_WIDTH_CSS}
${TRAINER_MODULES_TABS_CSS}</style>
</head>
<body class="runtime-cli workbook">
${content}
<script>${SPA_JS}</script>
<script>${TRAINER_GUIDE_INIT_JS}</script>
<script>${TRAINER_MODULES_TAB_JS}</script>
</body>
</html>
`;
}

// ── Theory handbook ─────────────────────────────────────────────────────────
// Maintainer reading/checking artifact: every theory doc from
// THEORY_HANDBOOK_MANIFEST in one self-contained page, rendered by the SAME
// pipeline as the workbook. Lectures ride the module include path (synthetic
// standalone include-link → inlineIncludes → readMd/expandPrompts → marked →
// postProcessIncludes), so {{prompt:}}/{{cut:}}/{{covered:}} markers, heading
// ids, and the phase--lecture section wrapper come out byte-equivalent to the
// workbook's. Supplementary docs follow the workbook's renderStandalone
// transform sequence (link rewrite → inlineImages → escapeTildes → marked →
// wrapImageFigures). Module-number section headers are assembly chrome — they
// live here, never in the lecture bodies.
function renderTheoryEntry(trainingKey, entry) {
  const [kind, slug] = entry.split('/');

  if (kind === 'lectures') {
    const srcPath = path.join(ROOT, 'curriculum/lectures', slug + '.md');
    if (!fs.existsSync(srcPath)) {
      throw new Error(`Theory manifest entry missing: ${path.relative(ROOT, srcPath)}`);
    }
    let md = inlineIncludes(`[${slug}](lectures/${slug}.md)`);
    if (md.indexOf('<!--INC:') === -1) {
      throw new Error(`Theory manifest entry did not expand as an include: ${entry}`);
    }
    md = rewriteCrossDocLinksToAnchors(md);
    md = escapeTildes(md);
    let html = marked.parse(md);
    html = postProcessIncludes(html);
    return CR.wrapImageFigures(html);
  }

  if (kind === 'supplementary') {
    const docPath = path.join(ROOT, 'curriculum/trainings', trainingKey, 'supplementary', slug + '.md');
    let md = readMd(docPath);
    if (md === null) {
      throw new Error(`Theory manifest entry missing: ${path.relative(ROOT, docPath)}`);
    }
    md = rewriteCrossDocLinksToAnchors(md);
    md = inlineImages(md, path.dirname(docPath));
    md = escapeTildes(md);
    return `<section class="phase phase--lecture" id="supplementary-${slug}">\n<div class="phase-kicker">Supplementary</div>\n${CR.wrapImageFigures(marked.parse(md))}\n</section>`;
  }

  throw new Error(`Theory manifest entry has unknown kind "${kind}": ${entry} (expected lectures/ or supplementary/)`);
}

function buildTheoryBody(trainingKey) {
  const t = CR.TRAININGS[trainingKey];
  const manifest = THEORY_HANDBOOK_MANIFEST[trainingKey];
  if (!manifest) {
    throw new Error(`No theory handbook manifest for training: ${trainingKey}. Add one to THEORY_HANDBOOK_MANIFEST in scripts/build-workbook.js.`);
  }

  // Each doc exactly once — dual-wired lectures live at their owning module.
  const seen = new Set();
  for (const [beat, entries] of manifest) {
    for (const entry of entries) {
      if (seen.has(entry)) throw new Error(`Theory manifest lists ${entry} twice (second time under ${beat})`);
      seen.add(entry);
    }
  }

  const sections = manifest.map(([beat, entries]) => {
    const m = beat.match(/^M(\d+)$/);
    const modTitle = m && t.modules[Number(m[1]) - 1] ? t.modules[Number(m[1]) - 1].title : '';
    const label = modTitle ? `${beat} — ${modTitle}` : beat;
    const inner = entries.map(e => renderTheoryEntry(trainingKey, e)).join('\n\n');
    return `<section class="module" id="theory-${beat.toLowerCase()}">\n<h1>${CR.esc(label)}</h1>\n${inner}\n</section>`;
  }).join('\n\n');

  const cover = `
<header class="workbook-cover" id="top">
  <p class="eyebrow">${CR.esc(t.label)}</p>
  <h1 class="cover-title">Theory handbook</h1>
</header>
`;
  return '<main>\n' + cover + '\n' + sections + '\n</main>\n' + CR.renderFooter() + '\n';
}

function theoryHandbookTemplate(trainingKey, content) {
  const t = CR.TRAININGS[trainingKey];
  const runtime = t.runtime || 'cli';
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${CR.esc(t.label)} · Theory handbook</title>
<style>${SPA_CSS}</style>
</head>
<body class="runtime-${CR.esc(runtime)} workbook" data-training="${trainingKey}">
${content}
<script>${SPA_JS}</script>
<script>${TRAINER_GUIDE_INIT_JS}</script>
</body>
</html>
`;
}

function buildTheoryHandbook(customer, trainingKey) {
  const outDir = path.join(ROOT, 'site/clients', customer, trainingKey);
  fs.mkdirSync(outDir, { recursive: true });
  const html = theoryHandbookTemplate(trainingKey, buildTheoryBody(trainingKey));
  const outFile = path.join(outDir, 'theory-handbook.html');
  fs.writeFileSync(outFile, html);
  const sizeKB = (fs.statSync(outFile).size / 1024).toFixed(0);
  console.log(`Built ${path.relative(ROOT, outFile)} (${sizeKB} KB)`);
}

// ── Exercises workbook ──────────────────────────────────────────────────────
// Sibling of the theory handbook: every AE101 exercise in one self-contained
// page, prompts inlined, rendered by the SAME include pipeline as the workbook.
// Source of truth is the module files themselves — the exercise set + order are
// derived from each module's `exercises/<slug>` include links (no separate
// manifest to drift). Eyeball surface for the slide-chunking refactor + a
// student handout.
function exerciseSlugsForModule(trainingKey, moduleSlug) {
  const modPath = path.join(ROOT, 'curriculum/trainings', trainingKey, moduleSlug + '.md');
  if (!fs.existsSync(modPath)) return [];
  const body = CR.stripMaintainerTail(fs.readFileSync(modPath, 'utf8'));
  const re = /\[[^\]]+\]\(exercises\/([a-z0-9-]+)\.md\)/g;
  const slugs = [];
  let m;
  while ((m = re.exec(body)) !== null) slugs.push(m[1]);
  return slugs;
}

function renderExerciseEntry(slug) {
  const srcPath = path.join(ROOT, 'curriculum/exercises', slug + '.md');
  if (!fs.existsSync(srcPath)) {
    throw new Error(`Exercise missing: ${path.relative(ROOT, srcPath)}`);
  }
  let md = inlineIncludes(`[${slug}](exercises/${slug}.md)`);
  if (md.indexOf('<!--INC:') === -1) {
    throw new Error(`Exercise did not expand as an include: ${slug}`);
  }
  md = rewriteCrossDocLinksToAnchors(md);
  md = escapeTildes(md);
  let html = marked.parse(md);
  html = postProcessIncludes(html);
  return CR.wrapImageFigures(html);
}

function buildExercisesBody(trainingKey) {
  const t = CR.TRAININGS[trainingKey];
  if (!t) throw new Error(`Unknown training: ${trainingKey}`);
  const seen = new Set();
  const sections = t.modules.map((mod, i) => {
    const slugs = exerciseSlugsForModule(trainingKey, mod.slug).filter(s => {
      if (seen.has(s)) return false;
      seen.add(s);
      return true;
    });
    if (slugs.length === 0) return '';
    const inner = slugs.map(renderExerciseEntry).join('\n\n');
    const label = `M${i + 1} — ${mod.title}`;
    return `<section class="module" id="exercises-m${i + 1}">\n<h1>${CR.esc(label)}</h1>\n${inner}\n</section>`;
  }).filter(Boolean).join('\n\n');

  const cover = `
<header class="workbook-cover" id="top">
  <p class="eyebrow">${CR.esc(t.label)}</p>
  <h1 class="cover-title">Exercises workbook</h1>
</header>
`;
  return '<main>\n' + cover + '\n' + sections + '\n</main>\n' + CR.renderFooter() + '\n';
}

function exercisesWorkbookTemplate(trainingKey, content) {
  const t = CR.TRAININGS[trainingKey];
  const runtime = t.runtime || 'cli';
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${CR.esc(t.label)} · Exercises workbook</title>
<style>${SPA_CSS}</style>
</head>
<body class="runtime-${CR.esc(runtime)} workbook" data-training="${trainingKey}">
${content}
<script>${SPA_JS}</script>
<script>${TRAINER_GUIDE_INIT_JS}</script>
</body>
</html>
`;
}

function buildExercisesWorkbook(customer, trainingKey) {
  const outDir = path.join(ROOT, 'site/clients', customer, trainingKey);
  fs.mkdirSync(outDir, { recursive: true });
  const html = exercisesWorkbookTemplate(trainingKey, buildExercisesBody(trainingKey));
  const outFile = path.join(outDir, 'exercises-workbook.html');
  fs.writeFileSync(outFile, html);
  const sizeKB = (fs.statSync(outFile).size / 1024).toFixed(0);
  console.log(`Built ${path.relative(ROOT, outFile)} (${sizeKB} KB)`);
}

function template(title, content, trainingKey) {
  const training = CR.TRAININGS[trainingKey] || {};
  const runtime = training.runtime || 'cli';
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${CR.esc(title)}</title>
<style>${SPA_CSS}</style>
<style>${SLIDES_CSS}</style>
</head>
<body class="runtime-${CR.esc(runtime)} workbook" data-training="${trainingKey}">
${content}
<script>${SPA_JS}</script>
<script>${SLIDES_JS}</script>
<script>${WORKBOOK_INIT_JS}</script>
</body>
</html>
`;
}

function usage() {
  console.error('Usage: node scripts/build-workbook.js <customer-slug> <training-key|training-key,...|all>');
  console.error('   or: node scripts/build-workbook.js <customer-slug> <training-key> <training-key> ...');
  console.error('Legacy single-training form still works: node scripts/build-workbook.js <training-key> <customer-slug>');
  console.error('Theory handbook (lectures only, no exercises): append --theory');
  console.error('Exercises workbook (exercises only, prompts inlined): append --exercises');
  console.error('  training-key: ' + Object.keys(CR.TRAININGS).join(' | '));
}

function unique(items) {
  return Array.from(new Set(items));
}

function parseCli(argv) {
  if (argv.length < 2) {
    usage();
    process.exit(1);
  }

  var keys = Object.keys(CR.TRAININGS);
  var first = argv[0];
  var second = argv[1];

  // Backwards compatibility for existing muscle memory:
  //   node scripts/build-workbook.js claude-basics acme
  if (argv.length === 2 && CR.TRAININGS[first] && !CR.TRAININGS[second] && second !== 'all') {
    return { customer: second, trainings: [first], legacy: true };
  }

  var customer = first;
  var selector = argv.slice(1).join(',');
  var trainings = selector === 'all'
    ? keys
    : unique(selector.split(',').map(s => s.trim()).filter(Boolean));

  var unknown = trainings.filter(k => !CR.TRAININGS[k]);
  if (unknown.length) {
    console.error('Unknown training: ' + unknown.join(', '));
    usage();
    process.exit(1);
  }

  return { customer: customer, trainings: trainings, legacy: false };
}

// Tarball filenames per training. AE101's name is owned by
// curriculum/trainings/agentic-engineering-101/training-architecture.md
// § Material distribution. Rename there first; this map and downstream
// consumers follow.
const TARBALLS = {
  'agentic-engineering-101': 'ae101-content.tar.gz',
  'agents-101': 'agents-101-starter.tar.gz',
};

function buildPayload(contentKey, customer, urlKey, outDir) {
  // AE101 + Agents 101 each ship a tarball alongside that training's workbook.
  // The payload URL is training-scoped so one customer can host multiple
  // trainings without the two tarballs overwriting each other. contentKey
  // selects which tarball to build (a variant reuses its parent's content);
  // urlKey is the output-path segment (the variant's own dir under the customer).
  //
  // AE101      — content tarball (lectures/exercises/reference/supplementary/skills;
  //                               extracted at ~/Documents/ae101-content/)
  // Agents 101 — starter tarball  (empty working-folder skeleton; extracts in-place
  //                                into the student's connected/working folder at
  //                                ~/Documents/agents-101/)
  if (contentKey === 'agentic-engineering-101') {
    const tarName = TARBALLS[contentKey];
    console.log('Building content tarball...');
    execSync('scripts/build-ae101-content-tarball.sh', { cwd: ROOT, stdio: 'inherit' });
    const tarSrc = path.join(ROOT, tarName);
    const tarDst = path.join(outDir, tarName);
    fs.copyFileSync(tarSrc, tarDst);
    const tarKB = (fs.statSync(tarDst).size / 1024).toFixed(0);
    console.log(`Copied ${path.relative(ROOT, tarDst)} (${tarKB} KB)`);
    return `https://agents102.bosser.consulting/clients/${customer}/${urlKey}/${tarName}`;
  }

  if (contentKey === 'agents-101') {
    const tarName = TARBALLS[contentKey];
    console.log('Building Agents 101 starter tarball...');
    execSync('scripts/build-agents-101-starter-tarball.sh', { cwd: ROOT, stdio: 'inherit' });
    const tarSrc = path.join(ROOT, tarName);
    const tarDst = path.join(outDir, tarName);
    fs.copyFileSync(tarSrc, tarDst);
    // Agents 101 is dual-runtime; Cowork's outbound network allowlist blocks
    // both bosser.consulting and raw.githubusercontent.com (only objects.gh +
    // S3 + a few others reachable). The fallback for Cowork is browser-download
    // into the working folder — the student's browser is unconstrained by
    // Cowork's proxy, so any HTTPS URL the workbook itself loads from works.
    // Step 1 is forked: Code uses `curl + tar`; Cowork uses browser-download +
    // extract-only prompt. Same URL, different transport.
    const tarKB = (fs.statSync(tarDst).size / 1024).toFixed(0);
    console.log(`Copied ${path.relative(ROOT, tarDst)} (${tarKB} KB)`);
    return `https://agents102.bosser.consulting/clients/${customer}/${urlKey}/${tarName}`;
  }

  return null;
}

function buildTraining(customer, trainingKey, opts = {}) {
  const outDir = path.join(ROOT, 'site/clients', customer, trainingKey);
  fs.mkdirSync(outDir, { recursive: true });

  // A variant training builds its parent's tarball but hosts it under its own
  // path (urlKey = trainingKey). Non-variant trainings resolve to themselves.
  const contentKey = (CR.TRAININGS[trainingKey] || {}).contentKey || trainingKey;
  const contentUrl = buildPayload(contentKey, customer, trainingKey, outDir);
  const body = buildBody(trainingKey, customer, contentUrl);
  const html = template(`${CR.TRAININGS[trainingKey].label} — ${customer}`, body, trainingKey);
  const outFile = path.join(outDir, 'index.html');
  fs.writeFileSync(outFile, html);

  const sizeKB = (fs.statSync(outFile).size / 1024).toFixed(0);
  console.log(`Built ${path.relative(ROOT, outFile)} (${sizeKB} KB)`);

  // --no-trainer-docs: a student-facing build (e.g. a self-serve beta). The
  // trainer guide + trainer modules carry delivery mechanics and the M3
  // security-surprise spoiler, so they must not land in a dir handed to
  // students. The student TOC never links them (direct URL only), so skipping
  // generation leaves no dead link.
  if (opts.noTrainerDocs) {
    console.log(`  (student build: skipping trainer-guide.html + trainer-modules.html)`);
    return;
  }

  // Trainer guide: same gate (per-training customer dir), separate file.
  // Training-specific source rendered beside each workbook so cross-doc links
  // resolve into that workbook.
  const guideBody = buildTrainerGuide(customer, trainingKey);
  if (guideBody !== null) {
    const guideHtml = trainerGuideTemplate(customer, guideBody);
    const guideFile = path.join(outDir, 'trainer-guide.html');
    fs.writeFileSync(guideFile, guideHtml);
    const guideKB = (fs.statSync(guideFile).size / 1024).toFixed(0);
    console.log(`Built ${path.relative(ROOT, guideFile)} (${guideKB} KB)`);
  }

  // Trainer modules one-pager: same gate, separate file. Cross-doc links
  // resolve into this workbook the same way the trainer guide's do.
  const modulesBody = buildTrainerModules(customer, trainingKey);
  if (modulesBody !== null) {
    const modulesHtml = trainerModulesTemplate(customer, modulesBody);
    const modulesFile = path.join(outDir, 'trainer-modules.html');
    fs.writeFileSync(modulesFile, modulesHtml);
    const modulesKB = (fs.statSync(modulesFile).size / 1024).toFixed(0);
    console.log(`Built ${path.relative(ROOT, modulesFile)} (${modulesKB} KB)`);
  }
}

function deployedTrainingKeys(customer) {
  const customerDir = path.join(ROOT, 'site/clients', customer);
  if (!fs.existsSync(customerDir)) return [];
  return Object.keys(CR.TRAININGS)
    .filter(k => fs.existsSync(path.join(customerDir, k, 'index.html')));
}

function customerIndexTemplate(customer, trainingKeys) {
  const cards = trainingKeys.map(k => {
    const t = CR.TRAININGS[k];
    return `<li class="training-card">
  <a href="./${k}/">
    <span class="training-card__label">${CR.esc(t.label)}</span>
    <span class="training-card__lede">${CR.esc(plainDisplayText(t.lede))}</span>
  </a>
</li>`;
  }).join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Agents 102 — ${CR.esc(customer)}</title>
<style>
  :root { color-scheme: light; --ink: #1c1917; --muted: #6b625b; --line: #ded8d0; --paper: #fbfaf7; --accent: #c2410c; }
  * { box-sizing: border-box; }
  body { margin: 0; min-height: 100vh; background: var(--paper); color: var(--ink); font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
  main { width: min(920px, calc(100% - 40px)); margin: 0 auto; padding: 72px 0; }
  .eyebrow { margin: 0 0 14px; color: var(--accent); font-size: 13px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; }
  h1 { margin: 0; font-size: 72px; line-height: .95; letter-spacing: 0; }
  .lede { max-width: 680px; margin: 22px 0 42px; color: var(--muted); font-size: 20px; line-height: 1.5; }
  .training-list { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 14px; margin: 0; padding: 0; list-style: none; }
  .training-card a { display: block; min-height: 156px; padding: 22px; border: 1px solid var(--line); border-radius: 8px; color: inherit; text-decoration: none; background: rgba(255,255,255,.62); }
  .training-card a:hover { border-color: var(--accent); }
  .training-card__label { display: block; font-size: 21px; font-weight: 800; }
  .training-card__lede { display: block; margin-top: 12px; color: var(--muted); line-height: 1.45; }
  @media (max-width: 640px) {
    main { width: min(100% - 28px, 920px); padding: 48px 0; }
    h1 { font-size: 44px; }
    .lede { font-size: 18px; }
  }
</style>
</head>
<body>
<main>
  <p class="eyebrow">${CR.esc(customer)} training hub</p>
  <h1>Agents 102</h1>
  <p class="lede">Training workbooks deployed for this customer. Each program has its own workbook, plus trainer guides and downloadable payloads where needed.</p>
  <ul class="training-list">
${cards}
  </ul>
</main>
</body>
</html>
`;
}

function buildCustomerIndex(customer) {
  const customerDir = path.join(ROOT, 'site/clients', customer);
  fs.mkdirSync(customerDir, { recursive: true });
  const keys = deployedTrainingKeys(customer);
  const indexFile = path.join(customerDir, 'index.html');
  fs.writeFileSync(indexFile, customerIndexTemplate(customer, keys));
  const sizeKB = (fs.statSync(indexFile).size / 1024).toFixed(0);
  console.log(`Built ${path.relative(ROOT, indexFile)} (${sizeKB} KB)`);
}

// `--theory` switches the build to the theory handbook (additive sibling page;
// the normal workbook path is untouched when the flag is absent).
// `--no-trainer-docs` suppresses the trainer guide + trainer modules for a
// student-facing build (see buildTraining).
const rawArgs = process.argv.slice(2);
const theoryMode = rawArgs.includes('--theory');
const exercisesMode = rawArgs.includes('--exercises');
const noTrainerDocs = rawArgs.includes('--no-trainer-docs');
const { customer, trainings, legacy } = parseCli(
  rawArgs.filter(a => a !== '--theory' && a !== '--exercises' && a !== '--no-trainer-docs')
);
if (legacy) {
  console.log('Legacy argument order detected; prefer: node scripts/build-workbook.js ' + customer + ' ' + trainings[0]);
}

if (theoryMode) {
  trainings.forEach(trainingKey => buildTheoryHandbook(customer, trainingKey));
} else if (exercisesMode) {
  trainings.forEach(trainingKey => buildExercisesWorkbook(customer, trainingKey));
} else {
  trainings.forEach(trainingKey => buildTraining(customer, trainingKey, { noTrainerDocs }));
  buildCustomerIndex(customer);
}

// Post-render audit: scan every emitted .html for leftover `{{prompt:` markers.
// Strict expandPrompts already throws at expand time; this is the second-line
// defence catching any code path that wrote markdown straight to HTML without
// passing through the expander (future renderer tweaks, new template helpers,
// inline post-processing). Fail loud so the regression surfaces in the build,
// not in front of a student.
(function auditRenderedHtml() {
  const customerDir = path.join(ROOT, 'site/clients', customer);
  const offenders = [];
  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const abs = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(abs);
      else if (entry.isFile() && entry.name.endsWith('.html')) {
        const raw = fs.readFileSync(abs, 'utf8');
        // Strip inline <script> and <style> blocks before scanning — the
        // workbook bundles curriculum.js (which mentions {{prompt:<key>}} in
        // its own docstrings) and CSS into every page. Audit cares about
        // content the student sees, not code that documents the pattern.
        const body = raw
          .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
          .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '');
        // Catch leftover {{prompt:key}}, its cut-candidate sibling
        // {{cut:key|reason}}, AND the covered-region pair {{covered:slug#anchor}}
        // … {{/covered}} — all should have been resolved by the expander.
        const matches = body.match(/\{\{(?:prompt|cut):[a-z0-9-]+(?:\|[a-z0-9-]+)?\}\}|\{\{covered:[a-z0-9-]+(?:#[a-z0-9-]+)?\}\}|\{\{\/covered\}\}/g);
        if (matches) offenders.push({ file: path.relative(ROOT, abs), markers: matches });
      }
    }
  }
  walk(customerDir);
  if (offenders.length) {
    console.error('\nBuild aborted: rendered HTML still contains {{prompt:<key>}} markers.');
    for (const o of offenders) {
      console.error('  ' + o.file + ':');
      for (const m of o.markers) console.error('    ' + m);
    }
    process.exit(1);
  }
})();

// Build emits to site/clients/<cust>/. Customer deploy lives in the sibling
// ai-training-internal repo (private, materials.arcticrex.com); run
// `scripts/deploy-customer.sh <cust>` there to ship.
console.log(`Built to site/clients/${customer}/.`);
console.log('Deploy via: ai-training-internal/scripts/deploy-customer.sh ' + customer);
console.log('Live URLs after Pages publishes:');
console.log(`  https://materials.arcticrex.com/content/${customer}/`);
trainings.forEach(trainingKey => {
  console.log(`  https://materials.arcticrex.com/content/${customer}/${trainingKey}/`);
});
