#!/usr/bin/env node
'use strict';

// Edition wrapper: the canonical workbook and prompts remain the build inputs.
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const { gzipSync } = require('node:zlib');
const { createHash } = require('node:crypto');
const { marked } = require('marked');
const { JSDOM } = require('jsdom');
const { createNavigationOverlay, renderCourseNavigation } = require('./a101-mvp-navigation.js');
require('../site/layouts/curriculum.js').configureMarked(marked);

const ROOT = path.resolve(__dirname, '..');
const EDITION = 'acme-mvp';
const WORKBOOK_URL = `https://agents102.bosser.consulting/clients/${EDITION}/agents-101/`;
const DELIVERY = path.join(ROOT, 'curriculum/delivery/agents-101-mvp');
const SETUP_CSS = `
.a101-video-placeholder { margin: 1.25rem 0; padding: 1rem 1.25rem; border: 1px solid var(--line); border-radius: 0.35rem; background: var(--bg); color: var(--fg-2); }
.a101-os-picker { display: flex; flex-wrap: wrap; align-items: center; gap: .5rem; margin: 1.25rem 0; font-size: .9rem; color: var(--fg-2); }
.a101-os-picker button { font: inherit; color: var(--fg); background: transparent; border: 1px solid var(--line); border-radius: .35rem; padding: .35rem .8rem; cursor: pointer; }
.a101-os-picker button[aria-pressed="true"] { background: var(--fg); color: var(--bg); border-color: var(--fg); }
[data-a101-os-only][hidden] { display: none !important; }
.a101-game-start { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 12rem); align-items: start; gap: 1.25rem; }
.a101-game-start .a101-game-example { margin: 0; }
.a101-game-example img { display: block; width: 100%; height: auto; border-radius: .4rem; }
.a101-game-example figcaption, .a101-copy-status { font-size: .9rem; color: var(--fg-2); }
.a101-game-example figcaption { margin-top: .4rem; }
.a101-copy-status:empty { margin: 0; }
.a101-game-start a.a101-open-claude { display: inline-block; padding: .55rem .85rem; border-radius: .3rem; background: #24583b; color: #fff; text-decoration: none; }
.a101-launch-request code { white-space: normal; }
.a101-first-send-cue { margin: .5rem 0 .75rem; }
.a101-first-send-cue img { display: block; width: 100%; height: auto; }
.a101-first-send-cue figcaption { margin-top: .35rem; }
.a101-open-claude-fallback { margin-block: .75rem; }
.a101-open-claude-fallback > summary { cursor: pointer; }
.a101-game-start [data-copy-label] .copy-btn { color: #fff; background: #24583b; padding: .5rem .8rem; }
.a101-game-start :is(.copy-btn, .a101-open-claude):focus-visible { outline: 3px solid var(--accent); outline-offset: 3px; }
@media (max-width: 580px) { .a101-game-start { grid-template-columns: 1fr; } .a101-game-example { max-width: 11rem; } }
`;
const SETUP_SCRIPT = `(function () {
  var key = 'a101-setup-os', selected;
  try { selected = localStorage.getItem(key); } catch (_) {}
  if (selected !== 'mac' && selected !== 'windows') {
    var platform = (navigator.userAgentData && navigator.userAgentData.platform) || navigator.platform || navigator.userAgent;
    selected = /win(?:32|64|dows)/i.test(platform) ? 'windows' : 'mac';
  }
  function apply(value) {
    selected = value;
    document.querySelectorAll('[data-a101-os]').forEach(function (button) {
      button.setAttribute('aria-pressed', String(button.getAttribute('data-a101-os') === selected));
    });
    document.querySelectorAll('[data-a101-os-only]').forEach(function (node) {
      node.hidden = node.getAttribute('data-a101-os-only') !== selected;
    });
  }
  document.addEventListener('click', function (event) {
    var button = event.target.closest('[data-a101-os]');
    if (!button) return;
    var value = button.getAttribute('data-a101-os');
    if (value !== 'mac' && value !== 'windows') return;
    apply(value);
    try { localStorage.setItem(key, value); } catch (_) {}
  });
  var launch = document.querySelector('.a101-open-claude');
  if (launch) launch.addEventListener('click', function () {
    launch.closest('.a101-game-start').querySelector('.a101-open-claude-fallback').open = true;
  });
  apply(selected);
})();`;


function versionStarterDownload(html, archiveBytes) {
  const url = WORKBOOK_URL + 'agents-101-starter.tar.gz';
  const before = `href="${url}"`;
  const count = html.split(before).length - 1;
  if (count !== 1) throw new Error(`Starter download version expected one anchor, received ${count}`);
  const version = createHash('sha256').update(archiveBytes).digest('hex').slice(0, 16);
  return html.replace(before, `href="${url}?v=${version}"`);
}
const LOADER_FRAMING = [
  ['The root instructions file comes in the Debrief.', 'You develop your working rules in the Debrief. The existing root file only loads course navigation.'],
  ['Five minutes. A retro, <strong>and the first root instructions file in this directory.</strong>', 'Five minutes. A retro, <strong>and your own working rules for this directory.</strong>'],
];

function applyLoaderFraming(html, { required = true } = {}) {
  for (const [before, after] of LOADER_FRAMING) {
    const count = html.split(before).length - 1;
    if ((required && count !== 1) || count > 1) throw new Error(`Edition loader framing expected ${required ? 'one' : 'at most one'} match, received ${count}: ${before}`);
    if (count) html = html.replace(before, after);
  }
  return html;
}

function preworkSection(html) {
  const dom = new JSDOM(html);
  try {
    const sections = dom.window.document.querySelectorAll('section.module#prework');
    if (sections.length !== 1) throw new Error(`Edition workbook expected one Prework section, received ${sections.length}`);
    return sections[0].outerHTML;
  } finally { dom.window.close(); }
}

function moveContentsAfterPrework(html) {
  const toc = '<nav class="workbook-toc">';
  const moduleOne = '<section class="module" id="getting-going">';
  if (html.split(toc).length !== 2 || html.split(moduleOne).length !== 2) throw new Error('Expected one Contents and one Module 1');
  const start = html.indexOf(toc), closing = html.indexOf('</nav>', start), end = closing + '</nav>'.length;
  if (closing < 0 || start > html.indexOf('<section class="module" id="prework">') || end > html.indexOf(moduleOne)) throw new Error('Unexpected Contents/Prework order');
  const contents = html.slice(start, end);
  return (html.slice(0, start) + html.slice(end)).replace(moduleOne, contents + '\n\n' + moduleOne);
}

function prependOfflinePrework(html, prework) {
  const target = '<section class="module" id="theory-m1">';
  if (html.includes('id="prework"')) throw new Error('Offline handbook already contains Prework');
  const count = html.split(target).length - 1;
  if (count !== 1) throw new Error(`Offline handbook expected one M1 insertion point, received ${count}`);
  const theory = new JSDOM(html), route = new JSDOM(prework);
  let offlinePrework;
  try {
    const local = new Set([...theory.window.document.querySelectorAll('[id]'), ...route.window.document.querySelectorAll('[id]')].map(node => node.id));
    for (const link of route.window.document.querySelectorAll('a[href^="#"]')) {
      const fragment = link.getAttribute('href');
      if (!local.has(fragment.slice(1))) link.setAttribute('href', WORKBOOK_URL + fragment);
    }
    offlinePrework = route.window.document.getElementById('prework').outerHTML;
  } finally { theory.window.close(); route.window.close(); }
  return html.replace(target, offlinePrework + '\n\n' + target)
    .replace('</head>', `<style data-a101-setup>${SETUP_CSS}</style>\n</head>`)
    .replace('</body>', `<script data-a101-setup>${SETUP_SCRIPT}</script>\n</body>`);
}

function renderOnboarding(markdown) {
  let html = marked.parse(markdown);
  const pauseAt = html.indexOf('<h2 id="pause-learning">');
  if (pauseAt < 0) throw new Error('Missing Pause learning heading');
  const welcome = html.slice(0, pauseAt);
  html = html.slice(pauseAt);
  for (const id of ['pause-learning', 'resume-learning']) {
    const heading = new RegExp(`(<h2 id="${id}">[\\s\\S]*?<\\/h2>)([\\s\\S]*?)(?=<h[12]\\b|$)`);
    if (!heading.test(html)) throw new Error(`Missing onboarding heading: ${id}`);
    html = html.replace(heading, '<details class="a101-onboarding__optional"><summary>$1</summary>\n$2</details>\n');
  }
  return { welcome, controls: html };
}

function stripExternalFonts(html) {
  return html
    // Google font variation URLs contain semicolons. Consume the complete CSS
    // URL/string before looking for the import statement's final semicolon.
    .replace(/@import\s+(?:url\(\s*(?:"[^"]*"|'[^']*'|[^)]*)\s*\)|"[^"]*"|'[^']*')\s*[^;]*;/gi,
      statement => /https?:\/\/fonts\.(?:googleapis|gstatic)\.com\//i.test(statement) ? '' : statement)
    .replace(/<link\b[^>]*(?:href=["']https?:\/\/fonts\.(?:googleapis|gstatic)\.com)[^>]*>\s*/gi, '');
}

function walkFiles(dir, prefix = '') {
  return fs.readdirSync(path.join(dir, prefix), { withFileTypes: true })
    .sort((a, b) => a.name.localeCompare(b.name, 'en'))
    .flatMap(entry => {
      const relative = prefix ? `${prefix}/${entry.name}` : entry.name;
      if (entry.isSymbolicLink()) throw new Error(`Unexpected symlink in starter: ${relative}`);
      return entry.isDirectory() ? [relative, ...walkFiles(dir, relative)] : [relative];
    });
}

function repackStarter(archive, stage, mapFile, prework) {
  const unpacked = path.join(stage, 'starter');
  fs.mkdirSync(unpacked);
  execFileSync('tar', ['xzf', archive, '-C', unpacked], { env: { ...process.env, LC_ALL: 'C' } });
  const entries = walkFiles(unpacked);
  for (const relative of entries) {
    if (relative.split('/').some(part => part === '.claude' || part === '.agents')) {
      throw new Error(`Facilitator material must not ship: ${relative}`);
    }
  }
  for (const name of ['CLAUDE.md', 'AGENTS.md']) {
    if (fs.existsSync(path.join(unpacked, name))) throw new Error(`Prewritten root instructions must not ship: ${name}`);
  }
  fs.copyFileSync(mapFile, path.join(unpacked, 'prework/course-navigation.md'));
  const handbook = path.join(unpacked, 'agents-101-handbook.html');
  fs.writeFileSync(handbook, stripExternalFonts(prependOfflinePrework(applyLoaderFraming(fs.readFileSync(handbook, 'utf8'), { required: false }), prework)));

  // A sorted, nonrecursive file list keeps tar output independent of creation
  // order; fixed mtimes and gzip without a filename preserve repeatable bytes.
  const allEntries = walkFiles(unpacked).sort();
  const epoch = new Date('2000-01-01T00:00:00Z');
  for (const relative of allEntries) fs.utimesSync(path.join(unpacked, relative), epoch, epoch);
  fs.utimesSync(unpacked, epoch, epoch);
  const listFile = path.join(stage, 'archive-files.txt');
  fs.writeFileSync(listFile, ['.', ...allEntries.map(relative => `./${relative}`)].join('\n') + '\n');
  const tar = execFileSync('tar', ['--no-recursion', '-cf', '-', '-C', unpacked, '-T', listFile], {
    env: { ...process.env, COPYFILE_DISABLE: '1', LC_ALL: 'C' }, maxBuffer: 32 * 1024 * 1024,
  });
  fs.writeFileSync(archive, gzipSync(tar));
}

function buildEdition({ outputDir = process.env.AGENTS_OUTPUT_DIR || path.join(ROOT, 'site/clients'), quiet = false } = {}) {
  const stage = fs.mkdtempSync(path.join(os.tmpdir(), 'a101-mvp-build-'));
  try {
    const overlayDir = path.join(stage, 'overlay');
    const brandDir = path.join(stage, 'brand');
    // This named edition has fixed inputs; caller-specific branding or customer
    // overlays must never become part of its public learner download.
    fs.mkdirSync(overlayDir);
    fs.mkdirSync(brandDir);
    const preworkOverlay = path.join(overlayDir, 'trainings/agents-101/prework.md');
    fs.mkdirSync(path.dirname(preworkOverlay), { recursive: true });
    const prework = fs.readFileSync(path.join(DELIVERY, 'prework.md'), 'utf8');
    const request = JSDOM.fragment(marked.parse(prework))
      .querySelector('.a101-open-claude-fallback [data-copy-label] pre code')?.textContent.trimEnd();
    if (!request) throw new Error('Expected a first game request');
    const requestCode = JSDOM.fragment('<code></code>').firstChild;
    requestCode.textContent = request;
    const snakeStill = fs.readFileSync(path.join(DELIVERY, 'snake-preview.jpg')).toString('base64');
    const sendStill = fs.readFileSync(path.join(DELIVERY, 'claude-send.jpg')).toString('base64');
    const assets = [
      ['src="ACME_SNAKE_PREVIEW"', `src="data:image/jpeg;base64,${snakeStill}"`],
      ['src="ACME_CLAUDE_SEND"', `src="data:image/jpeg;base64,${sendStill}"`],
      ['href="ACME_FIRST_GAME_LAUNCH"', `href="claude://cowork/new?q=${encodeURIComponent(request)}"`],
      ['<code>ACME_FIRST_GAME_REQUEST</code>', requestCode.outerHTML],
    ];
    let firstGame = prework;
    for (const [marker, value] of assets) {
      if (firstGame.split(marker).length !== 2) throw new Error(`Expected one first game marker: ${marker}`);
      firstGame = firstGame.replace(marker, () => value);
    }
    fs.writeFileSync(preworkOverlay, firstGame);
    fs.writeFileSync(path.join(brandDir, 'customer.json'), JSON.stringify({ name: 'ACME', hubHeading: 'ACME' }) + '\n');
    const checkpoints = JSON.parse(fs.readFileSync(path.join(DELIVERY, 'checkpoints.json'), 'utf8'));
    createNavigationOverlay({ root: ROOT, overlayDir, workbookUrl: WORKBOOK_URL, checkpoints });
    const navigationFile = path.join(stage, 'course-navigation.md');
    fs.writeFileSync(navigationFile, renderCourseNavigation(fs.readFileSync(path.join(DELIVERY, 'course-navigation.md'), 'utf8'), {
      workbookUrl: WORKBOOK_URL, checkpoints,
    }));

    execFileSync(process.execPath, [path.join(ROOT, 'scripts/build-workbook.js'), EDITION, 'agents-101', '--no-trainer-docs'], {
      cwd: ROOT,
      env: { ...process.env, LC_ALL: 'C', AGENTS_OVERLAY_DIR: overlayDir, AGENTS_BRAND_DIR: brandDir, AGENTS_OUTPUT_DIR: path.resolve(outputDir) },
      stdio: quiet ? 'pipe' : 'inherit', maxBuffer: 32 * 1024 * 1024,
    });

    const customerDir = path.join(path.resolve(outputDir), EDITION);
    const trainingDir = path.join(customerDir, 'agents-101');
    const workbookFile = path.join(trainingDir, 'index.html');
    let html = applyLoaderFraming(fs.readFileSync(workbookFile, 'utf8'));
    // The theory manifest omits setup. Carry the exact rendered edition route
    // into its offline companion instead of authoring a second instruction set.
    const offlinePrework = preworkSection(html);
    const { welcome, controls } = renderOnboarding(fs.readFileSync(path.join(DELIVERY, 'onboarding.md'), 'utf8'));
    const toc = '<nav class="workbook-toc">';
    if (!html.includes(toc)) throw new Error('Workbook contents insertion point is missing');
    // Keep typography inside a module div so the slide chunker, which consumes
    // direct section.module children, never mistakes onboarding for a module.
    html = html.replace(toc, `<section class="a101-onboarding"><div class="module">\n${welcome}\n</div></section>\n\n${toc}`);
    html = moveContentsAfterPrework(html);
    const runtimePicker = '<div id="runtime-switcher" class="runtime-switcher"></div>';
    if (!html.includes(runtimePicker)) throw new Error('Workbook runtime picker is missing');
    html = html.replace(`  ${runtimePicker}\n`, '');
    if (!html.includes('</main>')) throw new Error('Workbook footer insertion point is missing');
    html = html.replace('</main>', `<section class="a101-onboarding a101-learning-controls" aria-label="Workbook options"><div class="module">\n${controls}\n<details class="a101-tool-picker"><summary id="workbook-tools">Tools for Claude Code and other runtimes</summary>${runtimePicker}</details>\n</div></section>\n\n</main>`);
    html = html.replace(toc, `${toc}\n<p><a href="#workbook-tools">Use this workbook with another tool</a></p>`);
    const nav = '<ol class="workbook-topnav__modules">';
    if (!html.includes(nav)) throw new Error('Workbook navigation insertion point is missing');
    html = html.replace(nav, `${nav}\n      <li><a href="#start-learning" data-target="start-learning">Start</a></li>`);
    html = html.replace('</head>', `<style data-a101-onboarding>
.a101-onboarding { width: 100%; max-width: 40em; margin: 2rem auto; padding: 0; }
.a101-onboarding > .module { max-width: none; }
.a101-onboarding > .module > h1 { margin-top: 0; margin-bottom: 1rem; }
.a101-onboarding:not(.a101-learning-controls) { margin-bottom: .3rem; }
.a101-onboarding #start-learning { font-size: clamp(2.15rem, 5vw, 3.5rem); max-width: none; line-height: 1.05; }
.a101-onboarding #start-learning::after { display: none; }
.a101-onboarding #start-learning + p::first-letter { float: none; font: inherit; color: inherit; margin: 0; padding: 0; }
body.workbook:not(.slides-active) .a101-onboarding + section#prework { margin-top: 1rem; }
body.workbook:not(.slides-active) .a101-onboarding + section#prework > .module-hero { display: none; }
body.workbook:not(.slides-active) .a101-onboarding + section#prework > h2#make-my-first-game { margin-top: 0; padding-top: 0; }
body.workbook .workbook-cover { padding-top: 1rem; padding-bottom: 1.5rem; margin-bottom: 1rem; }
body.workbook > main > section#prework { padding-top: 0; }
.a101-tool-picker { margin-top: 1rem; text-align: start; }
.a101-tool-picker > summary { cursor: pointer; font-size: .9rem; }
section#prework, section#prework .module-hero-title, section#prework > h2 { scroll-margin-top: 5rem; }
section#prework > .module-hero { margin-bottom: 1.5rem; padding-top: 1rem; padding-bottom: 1rem; }
section#prework > h2 { margin-top: 2rem; padding-top: 1rem; }
.a101-onboarding [id] { scroll-margin-top: 5rem; }
.a101-onboarding__optional { margin: 1rem 0; border-top: 1px solid var(--line); padding-top: 1rem; }
.a101-onboarding__optional > summary { cursor: pointer; }
.a101-onboarding__optional > summary h2 { display: inline; font-size: 1.15rem; margin: 0; padding: 0; }
.a101-onboarding__optional > summary h2::before { display: none; }
body.slides-active .a101-onboarding { display: none; }
${SETUP_CSS}
</style>\n</head>`);
    html = html.replace('</body>', `<script data-a101-setup>${SETUP_SCRIPT}</script>\n<script data-a101-onboarding>
(function () {
  function showRead() {
    var read = document.querySelector('.workbook-layout-toggle [data-mode="read"]');
    if (document.body.classList.contains('slides-active') && read) read.click();
  }
  function reveal() {
    var id; try { id = decodeURIComponent(location.hash.slice(1)); } catch (_) { return; }
    var target = document.getElementById(id);
    if (!target || !target.closest('.a101-onboarding')) return;
    showRead();
    var details = target && target.closest('.a101-onboarding details');
    if (details) details.open = true;
    if (target.scrollIntoView) target.scrollIntoView({ block: 'start' });
  }
  var start = document.querySelector('.workbook-topnav__modules a[href="#start-learning"]');
  if (start) start.addEventListener('click', showRead);
  window.addEventListener('hashchange', reveal);
  reveal();
})();
</script>\n</body>`);

    // The edition hub has one destination. Existing customer hubs are untouched.
    fs.writeFileSync(path.join(customerDir, 'index.html'), '<!doctype html>\n<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Agents 101 — ACME</title><meta http-equiv="refresh" content="0; url=./agents-101/#start-learning"></head><body><p><a href="./agents-101/#start-learning">Start Agents 101</a></p></body></html>\n');
    const archiveFile = path.join(trainingDir, 'agents-101-starter.tar.gz');
    repackStarter(archiveFile, stage, navigationFile, offlinePrework);
    fs.writeFileSync(workbookFile, versionStarterDownload(stripExternalFonts(html), fs.readFileSync(archiveFile)));
    // Remove only known trainer output for this edition if it was built before.
    for (const name of ['trainer-guide.html', 'trainer-modules.html']) fs.rmSync(path.join(trainingDir, name), { force: true });
    return { workbookFile, trainingDir, workbookUrl: WORKBOOK_URL };
  } finally {
    fs.rmSync(stage, { recursive: true, force: true });
  }
}

if (require.main === module) {
  try {
    const args = process.argv.slice(2);
    if (args.length && (args.length !== 2 || args[0] !== '--out' || !args[1])) throw new Error('Usage: node scripts/build-a101-mvp.js [--out <clients-output-directory>]');
    const result = buildEdition(args.length ? { outputDir: args[1] } : {});
    console.log(`Built ACME learner edition: ${result.workbookFile}`);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

module.exports = { buildEdition, stripExternalFonts, applyLoaderFraming, preworkSection, moveContentsAfterPrework, prependOfflinePrework, versionStarterDownload, SETUP_SCRIPT, WORKBOOK_URL };
