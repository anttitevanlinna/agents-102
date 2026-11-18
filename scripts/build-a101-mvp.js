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
const { createNavigationOverlay, renderCourseNavigation } = require('./a101-mvp-navigation.js');
require('../site/layouts/curriculum.js').configureMarked(marked);

const ROOT = path.resolve(__dirname, '..');
const EDITION = 'acme-mvp';
const WORKBOOK_URL = `https://agents102.bosser.consulting/clients/${EDITION}/agents-101/`;
const DELIVERY = path.join(ROOT, 'curriculum/delivery/agents-101-mvp');

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

function insertCoworkFolderInstruction(html) {
  const proof = '<p><em>Proof: you placed the file; the agent unpacked it. Two visible steps, no magic.</em></p>';
  const count = html.split(proof).length - 1;
  if (count !== 1) throw new Error(`Cowork folder instruction expected one extraction proof, received ${count}`);
  const instruction = '<p class="rt-profile rt-profile-cowork a101-folder-instruction">Set the instructions for your Cowork training folder to: <code>Read CLAUDE.md before working in this folder.</code> This keeps course navigation available when you start a fresh task.</p>';
  return html.replace(proof, instruction + '\n' + proof);
}

function renderOnboarding(markdown) {
  let html = marked.parse(markdown);
  for (const id of ['pause-learning', 'resume-learning']) {
    const heading = new RegExp(`(<h2 id="${id}">[\\s\\S]*?<\\/h2>)([\\s\\S]*?)(?=<h[12]\\b|$)`);
    if (!heading.test(html)) throw new Error(`Missing onboarding heading: ${id}`);
    html = html.replace(heading, '<details class="a101-onboarding__optional"><summary>$1</summary>\n$2</details>\n');
  }
  return html;
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

function repackStarter(archive, stage, mapFile) {
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
  fs.writeFileSync(handbook, stripExternalFonts(applyLoaderFraming(fs.readFileSync(handbook, 'utf8'), { required: false })));

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
    let html = insertCoworkFolderInstruction(applyLoaderFraming(fs.readFileSync(workbookFile, 'utf8')));
    const onboarding = renderOnboarding(fs.readFileSync(path.join(DELIVERY, 'onboarding.md'), 'utf8'));
    const toc = '<nav class="workbook-toc">';
    if (!html.includes(toc)) throw new Error('Workbook contents insertion point is missing');
    // Keep typography inside a module div so the slide chunker, which consumes
    // direct section.module children, never mistakes onboarding for a module.
    html = html.replace(toc, `<section class="a101-onboarding"><div class="module">\n${onboarding}\n</div></section>\n\n${toc}`);
    const nav = '<ol class="workbook-topnav__modules">';
    if (!html.includes(nav)) throw new Error('Workbook navigation insertion point is missing');
    html = html.replace(nav, `${nav}\n      <li><a href="#start-learning" data-target="start-learning">Start</a></li>`);
    html = html.replace('</head>', `<style data-a101-onboarding>
.a101-onboarding { width: 100%; max-width: 40em; margin: 2rem auto; padding: 0; }
.a101-onboarding > .module { max-width: none; }
.a101-onboarding [id] { scroll-margin-top: 5rem; }
.a101-onboarding__optional { margin: 1rem 0; border-top: 1px solid var(--line); padding-top: 1rem; }
.a101-onboarding__optional > summary { cursor: pointer; }
.a101-onboarding__optional > summary h2 { display: inline; font-size: 1.15rem; margin: 0; padding: 0; }
.a101-onboarding__optional > summary h2::before { display: none; }
body.slides-active .a101-onboarding { display: none; }
</style>\n</head>`);
    html = html.replace('</body>', `<script data-a101-onboarding>
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
    repackStarter(archiveFile, stage, navigationFile);
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

module.exports = { buildEdition, stripExternalFonts, applyLoaderFraming, insertCoworkFolderInstruction, versionStarterDownload, WORKBOOK_URL };
