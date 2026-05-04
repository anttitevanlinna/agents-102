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

// escapeTildes lives in shared CR for SPA + workbook parity.
const escapeTildes = CR.escapeTildes;

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

function buildToc(trainingKey, t) {
  // Single source: CR.buildTocSections. Workbook URL strategy is in-page anchors;
  // Big Ideas pre-filled sync at build time (no async hydration like the SPA).
  // Memoize per-slug Big Idea reads since the same module file gets opened
  // for both TOC and module body.
  const bigIdeaCache = {};
  function bigIdeaFor(slug) {
    if (slug in bigIdeaCache) return bigIdeaCache[slug];
    const modPath = path.join(ROOT, 'curriculum/trainings', trainingKey, slug + '.md');
    const md = readMd(modPath) || '';
    return (bigIdeaCache[slug] = CR.extractBigIdea(md));
  }
  return CR.buildTocSections(t, {
    trainingKey: trainingKey,
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
  const t = CR.TRAININGS[trainingKey];
  if (!t) throw new Error(`Unknown training: ${trainingKey}`);

  const topNav = buildTopNav(t, customer);

  const cover = `
<header class="workbook-cover" id="top">
  <p class="eyebrow">${CR.esc(customer)} workbook</p>
  <h1 class="cover-title">${CR.esc(t.label)}</h1>
  <p class="lede">${CR.esc(plainDisplayText(t.lede))}</p>
</header>

<nav class="workbook-toc">
  <h2>Contents</h2>
${buildToc(trainingKey, t)}
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
      const md = renderModuleMd(trainingKey, m.slug, contentUrl);
      let html = marked.parse(md);
      html = postProcessIncludes(html);
      return `<section class="module" id="${m.slug}">\n${html}\n</section>`;
    })
    .filter(Boolean)
    .join('\n\n');

  // Supplementary + reference docs — render bodies so the workbook TOC anchors
  // (#supplementary-foo, #reference-bar) resolve and cross-doc links from
  // module bodies don't die. Same chrome as modules; no Big Idea hero.
  function renderStandalone(kind, slug) {
    const docPath = path.join(ROOT, 'curriculum', kind, slug + '.md');
    let md = readMd(docPath);
    if (md === null) return '';
    md = md.replace(CR.CROSS_DOC_LINK_RE, '](#$1-$2)');
    md = escapeTildes(md);
    const labelKind = kind === 'supplementary' ? 'Supplementary' : 'Reference';
    return `<section class="module" id="${kind}-${slug}">\n<div class="phase-kicker">${labelKind}</div>\n${marked.parse(md)}\n</section>`;
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
  // can click a `[reference](reference/foo.md)` ref in the guide and land in
  // the workbook's matching section. No SPA, no router — anchor targets only.
  md = md.replace(CR.CROSS_DOC_LINK_RE, '](./#$1-$2)');
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
    CurriculumRuntime.decoratePrompts(document.body);
    CurriculumRuntime.installReadingProgress();
  }
})();
`;

function trainerGuideTemplate(customer, content) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Trainer delivery guide — ${CR.esc(customer)}</title>
<style>${SPA_CSS}</style>
</head>
<body class="runtime-cli workbook">
${content}
<script>${SPA_JS}</script>
<script>${TRAINER_GUIDE_INIT_JS}</script>
</body>
</html>
`;
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
</head>
<body class="runtime-${CR.esc(runtime)} workbook" data-training="${trainingKey}">
${content}
<script>${SPA_JS}</script>
<script>${WORKBOOK_INIT_JS}</script>
</body>
</html>
`;
}

function usage() {
  console.error('Usage: node scripts/build-workbook.js <customer-slug> <training-key|training-key,...|all>');
  console.error('   or: node scripts/build-workbook.js <customer-slug> <training-key> <training-key> ...');
  console.error('Legacy single-training form still works: node scripts/build-workbook.js <training-key> <customer-slug>');
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

function buildPayload(trainingKey, customer, outDir) {
  // AE101 + Agents 101 each ship a tarball alongside that training's workbook.
  // The payload URL is training-scoped so one customer can host multiple
  // trainings without agents-102-content.tar.gz / starter.tar.gz overwriting each other.
  //
  // AE101      — agents-102-content.tar.gz (lectures/exercises/reference/supplementary/skills;
  //                                         extracted at ~/Documents/ae101-content/)
  // Agents 101 — starter.tar.gz  (empty working-folder skeleton; extracts in-place
  //                               into the student's connected/working folder at
  //                               ~/Documents/agents-101/)
  if (trainingKey === 'agentic-engineering-101') {
    console.log('Building content tarball...');
    execSync('scripts/build-ae101-content-tarball.sh', { cwd: ROOT, stdio: 'inherit' });
    const tarSrc = path.join(ROOT, 'agents-102-content.tar.gz');
    const tarDst = path.join(outDir, 'agents-102-content.tar.gz');
    fs.copyFileSync(tarSrc, tarDst);
    const tarKB = (fs.statSync(tarDst).size / 1024).toFixed(0);
    console.log(`Copied ${path.relative(ROOT, tarDst)} (${tarKB} KB)`);
    return `https://agents102.bosser.consulting/clients/${customer}/${trainingKey}/agents-102-content.tar.gz`;
  }

  if (trainingKey === 'agents-101') {
    console.log('Building Agents 101 starter tarball...');
    execSync('scripts/build-agents-101-starter-tarball.sh', { cwd: ROOT, stdio: 'inherit' });
    const tarSrc = path.join(ROOT, 'agents-101-starter.tar.gz');
    const tarDst = path.join(outDir, 'starter.tar.gz');
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
    return `https://agents102.bosser.consulting/clients/${customer}/${trainingKey}/starter.tar.gz`;
  }

  return null;
}

function buildTraining(customer, trainingKey) {
  const outDir = path.join(ROOT, 'site/clients', customer, trainingKey);
  fs.mkdirSync(outDir, { recursive: true });

  const contentUrl = buildPayload(trainingKey, customer, outDir);
  const body = buildBody(trainingKey, customer, contentUrl);
  const html = template(`${CR.TRAININGS[trainingKey].label} — ${customer}`, body, trainingKey);
  const outFile = path.join(outDir, 'index.html');
  fs.writeFileSync(outFile, html);

  const sizeKB = (fs.statSync(outFile).size / 1024).toFixed(0);
  console.log(`Built ${path.relative(ROOT, outFile)} (${sizeKB} KB)`);

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

const { customer, trainings, legacy } = parseCli(process.argv.slice(2));
if (legacy) {
  console.log('Legacy argument order detected; prefer: node scripts/build-workbook.js ' + customer + ' ' + trainings[0]);
}

trainings.forEach(trainingKey => buildTraining(customer, trainingKey));
buildCustomerIndex(customer);

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
