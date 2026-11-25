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
const SITE = 'https://agents102.bosser.consulting';
const CR = require('../site/layouts/curriculum.js');
const CT = require('./calculate-time.js');

// Two editions share one pipeline. ACME is the password-gated customer
// workbook. The open edition is the free public self-study course at
// site/agents-101/: Modules 1 to 6 plus the solo Agents building agents module
// (the team modules 7 and 8 stay in the licensed team edition), a licence line
// in the footer, and minutes per module with Pro plan limit notes.
const SOLO_MODULE = { slug: 'agents-building-agents-solo', title: 'Agents Building Agents', short: 'Agents building agents' };
const SHORT_TITLES = {
  'getting-going': 'Getting going', 'building-agent-systems': 'Building agent systems', 'multi-agent-systems': 'Multi-agent systems',
  security: 'Security', 'output-quality': 'Catching hallucinations', evaluations: 'Evaluations', 'personal-to-team': 'Personal to team',
  'agents-building-agents': 'Agents building agents',
};
const EDITIONS = {
  'acme-mvp': {
    slug: 'acme-mvp', workbookUrl: `${SITE}/clients/acme-mvp/agents-101/`, brand: 'ACME',
    label: 'ACME handbook', title: 'Agents 101 handbook — ACME', hub: true, open: false,
  },
  open: {
    slug: 'open', workbookUrl: `${SITE}/agents-101/`, brand: 'Self-study',
    label: 'Self-study edition', title: 'Agents 101 self-study handbook', hub: false, open: true,
    publicDir: path.join(ROOT, 'site/agents-101'),
  },
};
const EDITION = EDITIONS['acme-mvp'].slug;
const WORKBOOK_URL = EDITIONS['acme-mvp'].workbookUrl;
const UNFINISHED_SUPPLEMENTARIES = new Set(['building-guardrails', 'learning-and-compounding-systems']);
const NUMBER_WORDS = ['No', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight'];
// Modules where a Pro plan's usage limit is likely within one sitting.
const PRO_LIMIT_MODULES = new Set(['multi-agent-systems', 'output-quality', 'evaluations']);
const LICENCE_TERMS = 'https://github.com/anttitevanlinna/agents-102/blob/main/COPYRIGHT.md#personal-use-license';
const LICENCE_LINE = '<p class="a101-licence">Free to take for your own learning and your own work. What you build is yours. '
  + 'Running this course as a training, inside your company or outside it, needs a training licence from Bosser. '
  + `<a href="${LICENCE_TERMS}" target="_blank" rel="noopener">Licence terms</a></p>`;
const DELIVERY = path.join(ROOT, 'curriculum/delivery/agents-101-mvp');
const SETUP_CSS = `
.a101-video-placeholder { margin: 1.25rem 0; padding: 1rem 1.25rem; border: 1px solid var(--line); border-radius: 0.35rem; background: var(--bg); color: var(--fg-2); }
.a101-os-picker { display: flex; flex-wrap: wrap; align-items: center; gap: .5rem; margin: 1.25rem 0; font-size: .9rem; color: var(--fg-2); }
.a101-os-picker button { font: inherit; color: var(--fg); background: transparent; border: 1px solid var(--line); border-radius: .35rem; padding: .35rem .8rem; cursor: pointer; }
.a101-os-picker button[aria-pressed="true"] { background: var(--fg); color: var(--bg); border-color: var(--fg); }
[data-a101-os-only][hidden] { display: none !important; }
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
  apply(selected);
})();`;


function versionStarterDownload(html, archiveBytes, workbookUrl = WORKBOOK_URL) {
  const url = workbookUrl + 'agents-101-starter.tar.gz';
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

// The edition's First steps page replaces Module 1's own Prework list, which
// still names the cohort setup. Drop it so Module 1 opens on its Start here.
function dropModuleOnePrework(html) {
  const moduleOne = html.indexOf('<section class="module" id="getting-going">');
  const start = html.indexOf('<h2 id="prework">', moduleOne);
  const end = html.indexOf('<h2', start + 1);
  if (moduleOne < 0 || start < 0 || end < 0 || html.indexOf('</section>', moduleOne) < start) throw new Error('Module 1 Prework block is missing');
  return html.slice(0, start) + html.slice(end);
}

function prependOfflinePrework(html, prework, workbookUrl = WORKBOOK_URL) {
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
      if (!local.has(fragment.slice(1))) link.setAttribute('href', workbookUrl + fragment);
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

function repackStarter(archive, stage, mapFile, prework, edition = EDITIONS['acme-mvp']) {
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
  let offline = prependOfflinePrework(applyLoaderFraming(fs.readFileSync(handbook, 'utf8'), { required: false }), prework, edition.workbookUrl);
  if (edition.open) offline = addLicenceLine(dropTeamModules(offline, unpacked));
  fs.writeFileSync(handbook, stripExternalFonts(offline));

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

const shell = name => fs.readFileSync(path.join(DELIVERY, 'shell', name), 'utf8');
const MEDIA = ['mac-folder-picker.jpg', 'mac-folder-picker.mp4'];
const media = name => fs.readFileSync(path.join(DELIVERY, 'media', name)).toString('base64');
function inlineMedia(html) {
  return html.replace('poster="media/mac-folder-picker.jpg"', `poster="data:image/jpeg;base64,${media('mac-folder-picker.jpg')}"`)
    .replace('src="media/mac-folder-picker.mp4"', `src="data:video/mp4;base64,${media('mac-folder-picker.mp4')}"`);
}

// The modules an edition runs. The open edition adds the solo module once its
// file exists, so the build works before and after it is written.
function editionModules(edition) {
  const all = CR.TRAININGS['agents-101'].modules;
  if (!edition.open) return all;
  const solo = fs.existsSync(path.join(ROOT, 'curriculum/trainings/agents-101', SOLO_MODULE.slug + '.md'))
    ? [{ slug: SOLO_MODULE.slug, title: SOLO_MODULE.title }] : [];
  return [...all.filter(m => m.slug !== 'personal-to-team' && m.slug !== 'agents-building-agents'), ...solo];
}

// Return rows for the modules this edition runs. A row tagged with a module
// the edition leaves out is dropped; the last row's next link stays inside
// the edition.
function editionCheckpoints(checkpoints, modules) {
  const slugs = modules.map(m => m.slug);
  const rows = checkpoints.filter(c => !c.module || slugs.includes(c.module)).map(c => ({ ...c }));
  for (const row of rows) {
    if (!row.module || slugs.includes(row.nextAnchor.slice(1))) continue;
    const i = slugs.indexOf(row.module), next = modules[i + 1];
    row.nextAnchor = '#' + (next ? next.slug : row.module);
    row.nextLabel = next ? `Start Module ${i + 2}: ${SHORT_TITLES[next.slug] || SOLO_MODULE.short}` : `Finish Module ${i + 1} and the course`;
  }
  return rows;
}

// The header's course map lists exactly the modules this edition runs.
function headerModules(html, modules) {
  const start = '<ol class="workbook-topnav__modules">';
  const at = html.indexOf(start), end = html.indexOf('</ol>', at);
  if (at < 0 || end < 0) throw new Error('Header module list is missing');
  const items = modules.map((m, i) => {
    const short = SHORT_TITLES[m.slug] || (m.slug === SOLO_MODULE.slug ? SOLO_MODULE.short : m.title);
    return `      <li><a href="#${m.slug}" data-target="${m.slug}"><span>M${i + 1}</span> ${short}</a></li>`;
  });
  return html.slice(0, at) + start + '\n' + items.join('\n') + '\n  ' + html.slice(end);
}

// The team modules (7 and 8) belong to the licensed team edition. The open
// starter leaves out their offline theory, their pattern file and the prompts
// no open module uses.
function teamOnlyPrompts(modules) {
  const keys = slug => {
    const file = path.join(ROOT, 'curriculum/trainings/agents-101', slug + '.md');
    if (!fs.existsSync(file)) return new Set();
    const text = fs.readFileSync(file, 'utf8'), out = new Set();
    const add = t => { for (const k of t.matchAll(/\{\{prompt:([^}]+)\}\}/g)) out.add(k[1]); };
    add(text);
    for (const r of text.matchAll(/\]\(((?:exercises|lectures)\/[^)#]+)/g)) {
      const leaf = path.join(ROOT, 'curriculum', r[1]);
      if (fs.existsSync(leaf)) add(fs.readFileSync(leaf, 'utf8'));
    }
    return out;
  };
  const keep = new Set(modules.flatMap(m => [...keys(m.slug)]));
  return [...new Set(['personal-to-team', 'agents-building-agents'].flatMap(s => [...keys(s)]))].filter(k => !keep.has(k));
}

function dropTeamModules(html, unpacked) {
  for (const key of teamOnlyPrompts(editionModules(EDITIONS.open))) fs.rmSync(path.join(unpacked, 'prompts', key + '.md'), { force: true });
  fs.rmSync(path.join(unpacked, 'patterns/personal-to-team-patterns.md'), { force: true });
  const patterns = path.join(unpacked, 'patterns');
  if (fs.existsSync(patterns) && !fs.readdirSync(patterns).length) fs.rmdirSync(patterns);
  const dom = new JSDOM(html);
  try {
    const doc = dom.window.document;
    for (const id of ['theory-m7', 'theory-m8']) {
      const section = doc.getElementById(id);
      if (!section) throw new Error(`Offline handbook is missing ${id}`);
      section.remove();
      for (const link of doc.querySelectorAll(`a[href="#${id}"]`)) (link.closest('li') || link).remove();
    }
    return dom.serialize();
  } finally { dom.window.close(); }
}

// "Video coming here" notes stay hidden on the public page until each video exists.
function hideVideoPlaceholders(html) {
  return html.replace('</head>', '<style data-a101-video>.a101-video-placeholder, .walkthrough-media .video-coming { display: none; }</style>\n</head>')
    .replace(/<p>Video coming here[^<]*(?:<code>[^<]*<\/code>[^<]*)*<\/p>/g, '');
}

function addLicenceLine(html) {
  // The page also carries the footer source in its runtime script; match the rendered element.
  const footer = '<footer class="curriculum-footer"><p>';
  const count = html.split(footer).length - 1;
  if (count !== 1) throw new Error(`Licence line expected one footer, received ${count}`);
  const proprietary = 'This is proprietary training material. Using, copying or passing it on is governed by the licence under which you received it. ';
  return html.replace(footer, '<footer class="curriculum-footer">' + LICENCE_LINE + '<p>').replace(proprietary, '')
    .replace('</head>', '<style data-a101-licence>.a101-licence { margin: 0 0 .5rem; } .curriculum-footer a { color: inherit; text-decoration: underline; }</style>\n</head>');
}

const roundMinutes = n => Math.max(5, Math.round(n / 5) * 5);

// One line under each module heading: how long it takes alone, and where a
// Pro plan may reach its usage limit.
function addModuleTimes(html, modules) {
  for (const [i, m] of modules.entries()) {
    const minutes = m.slug === SOLO_MODULE.slug ? 45 : CT.computeModule('agents-101', m.slug).total.hi;
    if (!minutes) throw new Error(`No computed time for ${m.slug}`);
    const limit = PRO_LIMIT_MODULES.has(m.slug)
      ? ' On a Pro plan this module may reach your usage limit. If it does, pause and pick up when the limit resets.' : '';
    const plan = i === 0 ? ' The course needs a paid Claude plan. Pro, the lowest paid plan, is enough.' : '';
    const note = `<p class="a101-module-time">About ${roundMinutes(minutes)} minutes.${plan}${limit}</p>`;
    const open = `<section class="module" id="${m.slug}">`;
    const at = html.indexOf(open);
    if (at < 0) throw new Error(`Module section missing: ${m.slug}`);
    const h1 = html.indexOf('</h1>', at);
    const next = html.indexOf('<section class="module"', at + open.length);
    if (h1 < 0 || (next >= 0 && h1 > next)) throw new Error(`Module heading missing: ${m.slug}`);
    html = html.slice(0, h1 + 5) + '\n' + note + html.slice(h1 + 5);
  }
  return html.replace('</head>', '<style data-a101-times>.a101-module-time { color: var(--fg-2); font-size: .95rem; }</style>\n</head>');
}

function buildEdition({ edition: editionKey = 'acme-mvp', outputDir, publicDir, quiet = false } = {}) {
  if (!EDITIONS[editionKey]) throw new Error(`Unknown edition: ${editionKey}. Known: ${Object.keys(EDITIONS).join(', ')}`);
  const edition = publicDir ? { ...EDITIONS[editionKey], publicDir } : EDITIONS[editionKey];
  const stage = fs.mkdtempSync(path.join(os.tmpdir(), 'a101-mvp-build-'));
  // The open edition builds in the stage and is copied to its public folder.
  if (!outputDir) outputDir = edition.publicDir ? path.join(stage, 'out') : (process.env.AGENTS_OUTPUT_DIR || path.join(ROOT, 'site/clients'));
  const workbookUrl = edition.workbookUrl;
  const modules = editionModules(edition);
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
    const sendStill = fs.readFileSync(path.join(DELIVERY, 'claude-send.jpg')).toString('base64');
    // ACME stays one self-contained file. The open edition serves the video as
    // files beside the page (preload="none"); its offline handbook inlines them.
    const stillPrework = prework.replace('src="ACME_COWORK_MESSAGE_BOX"', `src="data:image/jpeg;base64,${sendStill}"`);
    fs.writeFileSync(preworkOverlay, edition.publicDir ? stillPrework : inlineMedia(stillPrework));
    fs.writeFileSync(path.join(brandDir, 'customer.json'), JSON.stringify({ name: edition.brand, hubHeading: edition.brand }) + '\n');
    if (edition.open) {
      const lede = CR.TRAININGS['agents-101'].lede.replace(/^Eight modules\./, `${NUMBER_WORDS[modules.length]} modules.`);
      // Outline-only supplementaries stay out of the public edition until written.
      const supplementaries = CR.TRAININGS['agents-101'].supplementaries.filter(s => !UNFINISHED_SUPPLEMENTARIES.has(s.slug));
      const named = modules.map(m => (m.slug === 'output-quality' ? { ...m, title: 'Catching Hallucinations' } : m));
      fs.writeFileSync(path.join(overlayDir, 'trainings/agents-101/training.json'), JSON.stringify({ lede, modules: named, supplementaries }) + '\n');
    }
    const checkpoints = editionCheckpoints(JSON.parse(fs.readFileSync(path.join(DELIVERY, 'checkpoints.json'), 'utf8')), modules);
    createNavigationOverlay({ root: ROOT, overlayDir, workbookUrl, checkpoints });
    const navigationFile = path.join(stage, 'course-navigation.md');
    const navigationTemplate = fs.readFileSync(path.join(DELIVERY, 'course-navigation.md'), 'utf8').split(WORKBOOK_URL).join(workbookUrl);
    fs.writeFileSync(navigationFile, renderCourseNavigation(navigationTemplate, {
      workbookUrl, checkpoints,
    }));

    execFileSync(process.execPath, [path.join(ROOT, 'scripts/build-workbook.js'), edition.slug, 'agents-101', '--no-trainer-docs'], {
      cwd: ROOT,
      env: { ...process.env, LC_ALL: 'C', AGENTS_OVERLAY_DIR: overlayDir, AGENTS_BRAND_DIR: brandDir, AGENTS_OUTPUT_DIR: path.resolve(outputDir) },
      stdio: quiet ? 'pipe' : 'inherit', maxBuffer: 32 * 1024 * 1024,
    });

    const customerDir = path.join(path.resolve(outputDir), edition.slug);
    const trainingDir = path.join(customerDir, 'agents-101');
    const workbookFile = path.join(trainingDir, 'index.html');
    let html = applyLoaderFraming(fs.readFileSync(workbookFile, 'utf8'));
    // The open edition is served from its own folder, not under clients/.
    html = html.split(`${SITE}/clients/${edition.slug}/agents-101/`).join(workbookUrl);
    html = html.replace(`<title>Agents 101 — ${edition.brand}</title>`, `<title>${edition.title}</title>`)
      .replace('data-target="prework">Prework</a>', 'data-target="prework">First steps</a>');
    // The theory manifest omits setup. Carry the exact rendered edition route
    // into its offline companion instead of authoring a second instruction set.
    const offlinePrework = preworkSection(html);
    const { welcome, controls } = renderOnboarding(fs.readFileSync(path.join(DELIVERY, 'onboarding.md'), 'utf8'));
    const toc = '<nav class="workbook-toc">';
    if (!html.includes(toc)) throw new Error('Workbook contents insertion point is missing');
    // Keep typography inside a module div so the slide chunker, which consumes
    // direct section.module children, never mistakes onboarding for a module.
    html = html.replace(toc, `<section class="a101-onboarding">${shell('cover-game.html')}<div class="module">\n${welcome}\n</div></section>\n\n${toc}`);
    html = moveContentsAfterPrework(html);
    html = dropModuleOnePrework(html);
    const runtimePicker = '<div id="runtime-switcher" class="runtime-switcher"></div>';
    if (!html.includes(runtimePicker)) throw new Error('Workbook runtime picker is missing');
    html = html.replace(`  ${runtimePicker}\n`, '');
    if (!html.includes('</main>')) throw new Error('Workbook footer insertion point is missing');
    html = html.replace('</main>', `<section class="a101-onboarding a101-learning-controls" aria-label="Workbook options"><div class="module">\n${controls}\n<details class="a101-tool-picker"><summary id="workbook-tools">Tools for Claude Code and other runtimes</summary>${runtimePicker}</details>\n</div></section>\n\n</main>`);
    // After Prework the contents list is the route onward: drop the Prework row
    // (the learner just did it) and put the other-tool link after the modules.
    const preworkRow = /<ol class="module-list index-prework">[\s\S]*?<\/ol>/;
    if (!preworkRow.test(html)) throw new Error('Contents Prework row is missing');
    html = html.replace(preworkRow, '');
    const tocEnd = html.indexOf('</nav>', html.indexOf(toc));
    html = html.slice(0, tocEnd) + '<p class="a101-toc-tools"><a href="#workbook-tools">Use this workbook with another tool</a></p>\n' + html.slice(tocEnd);
    // The handbook header: course map (first steps + modules), current place, view switch.
    const navStart = html.indexOf('<nav class="workbook-topnav"');
    const navEnd = html.indexOf('</nav>', navStart);
    if (navStart < 0 || navEnd < 0) throw new Error('Workbook navigation insertion point is missing');
    html = html.slice(0, navStart) + headerModules(shell('header.html').replace('EDITION_LABEL', edition.label), modules)
      + '<nav class="chapter-outline" aria-label="In this module" hidden></nav>' + html.slice(navEnd + '</nav>'.length);
    const cover = '<header class="workbook-cover" id="top">';
    if (!html.includes(cover)) throw new Error('Workbook cover is missing');
    html = html.replace(cover, '<span id="top"></span><header class="workbook-cover">');
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
.workbook-toc h2 { color: var(--fg-2); }
.a101-toc-tools { margin-top: 1rem; font-size: .9rem; }
video:focus-visible { outline: 3px solid var(--fg); outline-offset: 3px; }
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
</style>\n<style data-a101-handbook>\n${shell('deskpad.css')}\n${shell('reading-views.css')}\n</style>\n</head>`);
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
  var start = document.querySelector('.rail-brand');
  if (start) start.addEventListener('click', showRead);
  window.addEventListener('hashchange', reveal);
  reveal();
})();
</script>\n${shell('figure-reader.html')}<script data-a101-handbook>\n${shell('deskpad.js')}\n</script>\n</body>`);

    if (edition.open) html = hideVideoPlaceholders(addModuleTimes(addLicenceLine(html), modules));

    // The edition hub has one destination. Existing customer hubs are untouched.
    if (edition.hub) fs.writeFileSync(path.join(customerDir, 'index.html'), `<!doctype html>\n<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Agents 101 — ${edition.brand}</title><meta http-equiv="refresh" content="0; url=./agents-101/#start-learning"></head><body><p><a href="./agents-101/#start-learning">Start Agents 101</a></p></body></html>\n`);
    const archiveFile = path.join(trainingDir, 'agents-101-starter.tar.gz');
    repackStarter(archiveFile, stage, navigationFile, inlineMedia(offlinePrework), edition);
    fs.writeFileSync(workbookFile, versionStarterDownload(stripExternalFonts(html), fs.readFileSync(archiveFile), workbookUrl));
    // Remove only known trainer output for this edition if it was built before.
    for (const name of ['trainer-guide.html', 'trainer-modules.html']) fs.rmSync(path.join(trainingDir, name), { force: true });
    if (!edition.publicDir) return { workbookFile, trainingDir, workbookUrl };
    fs.mkdirSync(edition.publicDir, { recursive: true });
    for (const name of ['index.html', 'agents-101-starter.tar.gz']) fs.copyFileSync(path.join(trainingDir, name), path.join(edition.publicDir, name));
    fs.mkdirSync(path.join(edition.publicDir, 'media'), { recursive: true });
    for (const name of MEDIA) fs.copyFileSync(path.join(DELIVERY, 'media', name), path.join(edition.publicDir, 'media', name));
    return { workbookFile: path.join(edition.publicDir, 'index.html'), trainingDir: edition.publicDir, workbookUrl };
  } finally {
    fs.rmSync(stage, { recursive: true, force: true });
  }
}

if (require.main === module) {
  try {
    const args = process.argv.slice(2);
    const usage = 'Usage: node scripts/build-a101-mvp.js [--edition acme-mvp|open] [--out <clients-output-directory>]';
    const options = {};
    for (let i = 0; i < args.length; i += 2) {
      if (!args[i + 1]) throw new Error(usage);
      if (args[i] === '--out') options.outputDir = args[i + 1];
      else if (args[i] === '--edition') options.edition = args[i + 1];
      else throw new Error(usage);
    }
    const result = buildEdition(options);
    console.log(`Built ${options.edition || 'acme-mvp'} learner edition: ${result.workbookFile}`);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

module.exports = { dropModuleOnePrework, hideVideoPlaceholders, EDITIONS, editionModules, editionCheckpoints, headerModules, addLicenceLine, addModuleTimes, buildEdition, stripExternalFonts, applyLoaderFraming, preworkSection, moveContentsAfterPrework, prependOfflinePrework, versionStarterDownload, SETUP_SCRIPT, WORKBOOK_URL };
