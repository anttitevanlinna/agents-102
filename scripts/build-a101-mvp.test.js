'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const { JSDOM, VirtualConsole } = require('jsdom');
const { WORKBOOK_URL, stripExternalFonts, applyLoaderFraming, insertCoworkFolderInstruction } = require('./build-a101-mvp.js');
const { renderCourseNavigation, COURSE_READING_CUE, EXTRACTION_BOOTSTRAP } = require('./a101-mvp-navigation.js');

const ROOT = path.resolve(__dirname, '..');
const DELIVERY = path.join(ROOT, 'curriculum/delivery/agents-101-mvp');

test('folder instruction inserts once at extraction proof and fails if the insertion point drifts', () => {
  const proof = '<p><em>Proof: you placed the file; the agent unpacked it. Two visible steps, no magic.</em></p>';
  const html = insertCoworkFolderInstruction('<p>Extract first.</p>' + proof + '<h2>Snake next.</h2>');
  assert.match(html, /class="rt-profile rt-profile-cowork a101-folder-instruction"/);
  assert.ok(html.indexOf('Read CLAUDE.md before working in this folder.') < html.indexOf(proof));
  assert.throws(() => insertCoworkFolderInstruction('<p>Changed proof.</p>'), /received 0/);
  assert.throws(() => insertCoworkFolderInstruction(proof + proof), /received 2/);
});

test('edition loader framing patches exactly two claims and fails on upstream drift', () => {
  const first = 'The root instructions file comes in the Debrief.';
  const second = 'Five minutes. A retro, <strong>and the first root instructions file in this directory.</strong>';
  const source = `<p>${first}</p><p>${second} The agent writes the rules.</p>`;
  const output = applyLoaderFraming(source);
  assert.equal(output, '<p>You develop your working rules in the Debrief. The existing root file only loads course navigation.</p><p>Five minutes. A retro, <strong>and your own working rules for this directory.</strong> The agent writes the rules.</p>');
  assert.throws(() => applyLoaderFraming(source.replace(first, 'Upstream framing changed.')), /received 0/);
  assert.throws(() => applyLoaderFraming(source + first), /received 2/);
  assert.equal(applyLoaderFraming('<p>Theory only.</p>', { required: false }), '<p>Theory only.</p>');
  assert.equal(applyLoaderFraming(`<p>${first}</p>`, { required: false }), '<p>You develop your working rules in the Debrief. The existing root file only loads course navigation.</p>');
});

test('font removal consumes the complete Google import with variation semicolons', () => {
  const css = fs.readFileSync(path.join(ROOT, 'site/layouts/curriculum.css'), 'utf8');
  const importLine = css.split('\n').find(line => line.startsWith('@import'));
  assert.match(importLine, /wght@400;500;600;700/);
  const cleaned = stripExternalFonts(css);
  assert.equal(cleaned, css.replace(importLine, ''), 'all following CSS remains byte-for-byte intact');
  const dom = new JSDOM(`<style>${cleaned}</style>`);
  try {
    const rules = [...dom.window.document.styleSheets[0].cssRules];
    assert.equal(rules.find(rule => rule.selectorText === ':root').style.getPropertyValue('--bg').trim(), '#efe6d2');
    assert.equal(rules.find(rule => rule.selectorText === 'body').style.getPropertyValue('font-family'), 'var(--font-body)');
  } finally { dom.window.close(); }
});

test('ACME edition builds a complete learner route with edition-local downloads and copied checkpoints', { timeout: 120000 }, async () => {
  const stage = fs.mkdtempSync(path.join(os.tmpdir(), 'a101-mvp-test-'));
  let dom;
  try {
    const checkpoints = JSON.parse(fs.readFileSync(path.join(DELIVERY, 'checkpoints.json'), 'utf8'));
    const unchangedPaths = [
      'site/prompts.json', 'site/figures.json',
      'site/clients/acme/agents-101/index.html',
      'site/clients/acme/agents-101/agents-101-starter.tar.gz',
      'curriculum/trainings/agents-101/building-agent-systems.md',
      ...checkpoints.map(({ key }) => `curriculum/prompts/${key}.md`),
    ];
    const before = new Map(unchangedPaths.map(relative => [relative, fs.readFileSync(path.join(ROOT, relative))]));
    const first = path.join(stage, 'first');
    const callerOverlay = path.join(stage, 'caller-overlay');
    const callerBrand = path.join(stage, 'caller-brand');
    fs.mkdirSync(callerOverlay);
    fs.mkdirSync(callerBrand);
    fs.writeFileSync(path.join(callerOverlay, 'unexpected.txt'), 'Must not enter the named public edition.');
    fs.writeFileSync(path.join(callerBrand, 'customer.json'), 'Invalid caller brand must be ignored.');
    const env = { ...process.env, LC_ALL: 'C', AGENTS_OVERLAY_DIR: callerOverlay, AGENTS_BRAND_DIR: callerBrand };
    const run = output => execFileSync(process.execPath, ['scripts/build-a101-mvp.js', '--out', output], {
      cwd: ROOT, env, stdio: 'pipe', maxBuffer: 32 * 1024 * 1024,
    });
    run(first);
    const trainingDir = path.join(first, 'acme-mvp/agents-101');
    const html = fs.readFileSync(path.join(trainingDir, 'index.html'), 'utf8');
    const exceptions = [];
    const copied = [];
    const virtualConsole = new VirtualConsole();
    virtualConsole.on('jsdomError', error => {
      if (error.type === 'unhandled-exception' || error.type === 'unhandled exception') exceptions.push(error.message);
    });
    dom = new JSDOM(html, {
      url: WORKBOOK_URL, runScripts: 'dangerously', virtualConsole,
      beforeParse(window) {
        window.IntersectionObserver = class { observe() {} unobserve() {} disconnect() {} };
        window.HTMLElement.prototype.scrollIntoView = function () {};
        Object.defineProperty(window.navigator, 'clipboard', { value: {
          writeText: async text => { copied.push(text); },
        } });
      },
    });
    const document = dom.window.document;
    assert.deepEqual(exceptions, [], 'inline workbook runtime should execute without exceptions');
    assert.match(document.title, /ACME/);
    assert.equal(html.split('You develop your working rules in the Debrief. The existing root file only loads course navigation.').length - 1, 1);
    assert.equal(html.split('Five minutes. A retro, <strong>and your own working rules for this directory.</strong>').length - 1, 1);
    assert.doesNotMatch(html, /The root instructions file comes in the Debrief\.|and the first root instructions file in this directory\./);
    const rules = [...document.styleSheets].flatMap(sheet => [...sheet.cssRules]);
    assert.ok(rules.some(rule => rule.selectorText === ':root' && rule.style.getPropertyValue('--bg').trim() === '#efe6d2'), 'actual workbook root theme CSS parses');
    assert.ok(rules.some(rule => rule.selectorText === 'body' && rule.style.getPropertyValue('font-family') === 'var(--font-body)'), 'actual workbook body font CSS parses');
    const start = document.querySelector('.a101-onboarding');
    assert.ok(start, 'onboarding is part of the actual workbook');
    assert.ok(start.querySelector(':scope > .module'), 'onboarding reuses module typography');
    assert.ok(!document.querySelector('main > section.module.a101-onboarding'), 'slide chunker must not include onboarding');
    assert.ok(start.previousElementSibling.classList.contains('workbook-cover'));
    assert.ok(start.nextElementSibling.classList.contains('workbook-toc'));
    assert.equal(document.querySelector('.workbook-topnav__modules a').getAttribute('href'), '#start-learning');
    for (const id of ['start-learning', 'pause-learning', 'resume-learning']) assert.equal(document.querySelectorAll(`[id="${id}"]`).length, 1);
    assert.ok(document.body.classList.contains('runtime-cowork'), 'fresh learner defaults to Cowork');
    assert.equal(start.querySelectorAll('details:not([open])').length, 2);
    const begin = [...start.querySelectorAll('a[href="#prework"]')].find(anchor => anchor.textContent === 'Start Prework');
    assert.ok(begin, 'onboarding has a clear Prework entry');
    assert.equal(begin.closest('details'), null, 'first-time entry must remain visible outside pause/resume details');
    dom.window.location.hash = '#resume-learning';
    dom.window.dispatchEvent(new dom.window.HashChangeEvent('hashchange'));
    assert.ok(document.getElementById('resume-learning').closest('details').open, 'direct resume link opens its collapsed instructions');
    assert.ok(start.querySelector('.prompt-block .copy-btn'), 'normal workbook runtime decorates onboarding prompts');
    const promptTexts = [...document.querySelectorAll('.prompt-block pre code')].map(node => node.textContent);
    assert.ok(promptTexts.length > 20, 'full canonical exercise prompts remain available');
    const baselineBlock = [...document.querySelectorAll('.prompt-block')].find(block => block.querySelector('code').textContent.startsWith('Build me a personal HTML one-pager site'));
    assert.ok(baselineBlock);
    baselineBlock.querySelector('.copy-btn').click();
    await Promise.resolve();
    const baselineCopy = copied.at(-1);
    assert.equal(baselineCopy, baselineBlock.querySelector('code').textContent.trimEnd(), 'Copy sends exact baseline body without title metadata');
    assert.ok(baselineCopy.endsWith('LinkedIn:'), 'learner input hook stays last in actual clipboard payload');
    const canonicalBaseline = fs.readFileSync(path.join(ROOT, 'curriculum/prompts/personal-site-with-guardrails-1.md'), 'utf8').replace(/^---\n[\s\S]*?\n---\n/, '').split('<!-- maintainer -->')[0].trimEnd();
    assert.equal(baselineCopy, canonicalBaseline, 'ordinary copied work request stays canonical');
    assert.doesNotMatch(baselineCopy, /https?:\/\/|Current:|Next:|learning-position\.md|course-navigation\.md/);
    const extractionBlock = [...document.querySelectorAll('.prompt-block')].find(block => block.querySelector('code').textContent.startsWith('Extract the starter tarball'));
    assert.ok(extractionBlock);
    extractionBlock.querySelector('.copy-btn').click();
    await Promise.resolve();
    assert.equal(copied.at(-1), extractionBlock.querySelector('code').textContent.trimEnd());
    assert.ok(copied.at(-1).includes(EXTRACTION_BOOTSTRAP), 'extraction alone installs the course context loader');
    const folderInstruction = document.querySelector('.a101-folder-instruction');
    assert.equal(document.querySelectorAll('.a101-folder-instruction').length, 1);
    assert.equal(folderInstruction.querySelector('code').textContent, 'Read CLAUDE.md before working in this folder.');
    assert.equal(folderInstruction.nextElementSibling.textContent, 'Proof: you placed the file; the agent unpacked it. Two visible steps, no magic.');
    assert.ok(extractionBlock.compareDocumentPosition(folderInstruction) & dom.window.Node.DOCUMENT_POSITION_FOLLOWING);
    assert.ok(folderInstruction.compareDocumentPosition(document.getElementById('4-build-a-snake-game-10-min')) & dom.window.Node.DOCUMENT_POSITION_FOLLOWING);
    assert.equal(dom.window.getComputedStyle(folderInstruction).display, 'block', 'Cowork sees the folder reading step after extraction');
    dom.window.A101Runtimes.applyRuntime('cli');
    assert.equal(dom.window.getComputedStyle(folderInstruction).display, 'none', 'CLI does not see Cowork folder UI instructions');
    dom.window.A101Runtimes.applyRuntime('cowork');
    const resumeBlock = document.getElementById('resume-learning').closest('details').querySelector('.prompt-block');
    resumeBlock.querySelector('.copy-btn').click();
    await Promise.resolve();
    assert.equal(copied.at(-1), resumeBlock.querySelector('code').textContent.trimEnd(), 'Copy sends exact resume body without title metadata');
    assert.ok(copied.at(-1).startsWith('Help me resume Agents 101.'));
    const deck = dom.window.CurriculumSlides.buildDeckModel(document.querySelector('main').cloneNode(true));
    assert.ok(!deck.slides.some(slide => slide.el.querySelector('#start-learning, #pause-learning, #resume-learning')), 'actual slide model excludes all onboarding instructions');
    document.querySelector('.workbook-layout-toggle [data-mode="slides"]').click();
    assert.deepEqual(exceptions, [], 'opening Slides should execute without exceptions');
    assert.ok(document.body.classList.contains('slides-active'));
    document.querySelector('.workbook-topnav__modules a[href="#start-learning"]').click();
    assert.ok(!document.body.classList.contains('slides-active'), 'Start exits Slides before navigating to onboarding');

    const resumed = new JSDOM(html, {
      url: `${WORKBOOK_URL}#resume-learning`, runScripts: 'dangerously', virtualConsole,
      beforeParse(window) {
        window.IntersectionObserver = class { observe() {} unobserve() {} disconnect() {} };
        window.HTMLElement.prototype.scrollIntoView = function () {};
        window.localStorage.setItem('curriculumLayout', 'slides');
      },
    });
    try {
      assert.ok(!resumed.window.document.body.classList.contains('slides-active'), 'direct resume arrival exits persisted Slides view');
      assert.ok(resumed.window.document.getElementById('resume-learning').closest('details').open);
      assert.equal(resumed.window.location.hash, '#resume-learning');
      assert.equal(resumed.window.localStorage.getItem('curriculumLayout'), 'read');
    } finally { resumed.window.close(); }

    for (const checkpoint of checkpoints) {
      assert.ok(document.getElementById(checkpoint.currentAnchor.replace(/^#/, '')), `current anchor exists: ${checkpoint.currentAnchor}`);
      assert.ok(document.getElementById(checkpoint.nextAnchor.replace(/^#/, '')), `next anchor exists: ${checkpoint.nextAnchor}`);
    }
    const bootstraps = promptTexts.filter(text => text.includes(COURSE_READING_CUE));
    assert.ok(bootstraps.length > 0);
    assert.ok(bootstraps.every(text => text.startsWith('Extract the starter tarball') && text.split(COURSE_READING_CUE).length === 2), 'only extraction runtime variants carry one course bootstrap each');
    const archiveLinks = [...document.querySelectorAll('a[href]')]
      .map(anchor => anchor.getAttribute('href')).filter(href => href.includes('agents-101-starter.tar.gz'));
    assert.ok(archiveLinks.length);
    for (const href of archiveLinks) assert.equal(new URL(href, WORKBOOK_URL).href, `${WORKBOOK_URL}agents-101-starter.tar.gz`);
    for (const element of document.querySelectorAll('style, link[href]')) assert.doesNotMatch(element.outerHTML, /fonts\.(?:googleapis|gstatic)\.com/);
    assert.ok(!fs.existsSync(path.join(trainingDir, 'trainer-guide.html')));
    assert.ok(!fs.existsSync(path.join(trainingDir, 'trainer-modules.html')));
    assert.match(fs.readFileSync(path.join(first, 'acme-mvp/index.html'), 'utf8'), /\.\/agents-101\/#start-learning/);

    const unpacked = path.join(stage, 'unpacked');
    fs.mkdirSync(unpacked);
    const archive = path.join(trainingDir, 'agents-101-starter.tar.gz');
    const listing = execFileSync('tar', ['tzf', archive], { encoding: 'utf8', env });
    assert.doesNotMatch(listing, /(?:^|\/)\.(?:claude|agents)(?:\/|$)/m);
    assert.doesNotMatch(listing, /^\.\/(?:CLAUDE|AGENTS)\.md$/m);
    execFileSync('tar', ['xzf', archive, '-C', unpacked], { env });
    const baselineFileBody = fs.readFileSync(path.join(unpacked, 'prompts/personal-site-with-guardrails-1.md'), 'utf8').replace(/^---\n[\s\S]*?\n---\n/, '').trimEnd();
    assert.equal(baselineCopy, baselineFileBody, 'rendered Copy and local starter carry the identical checkpoint prompt body');
    const guide = fs.readFileSync(path.join(unpacked, 'prework/course-navigation.md'), 'utf8');
    const template = fs.readFileSync(path.join(DELIVERY, 'course-navigation.md'), 'utf8');
    assert.equal(guide, renderCourseNavigation(template, { workbookUrl: WORKBOOK_URL, checkpoints }));
    assert.ok(guide.startsWith(template.trimEnd() + '\n\n## Workbook returns\n'));
    assert.equal(guide.split('\n').filter(line => line.startsWith('| ') && !line.startsWith('| Completed request') && !line.startsWith('| ---')).length, 6, 'four meeting variants share one of six human task returns');
    const guideDom = new JSDOM(require('marked').marked.parse(guide));
    try {
      for (const link of guideDom.window.document.querySelectorAll('a[href]')) {
        const url = new URL(link.href);
        assert.equal(url.origin + url.pathname, WORKBOOK_URL);
        if (url.hash) assert.ok(document.getElementById(url.hash.slice(1)), `guide target resolves: ${url.hash}`);
      }
    } finally { guideDom.window.close(); }
    assert.doesNotMatch(fs.readFileSync(path.join(unpacked, 'agents-101-handbook.html'), 'utf8'), /fonts\.(?:googleapis|gstatic)\.com/);
    assert.doesNotMatch(fs.readFileSync(path.join(unpacked, 'agents-101-handbook.html'), 'utf8'), /The root instructions file comes in the Debrief\.|and the first root instructions file in this directory\./);
    for (const checkpoint of checkpoints) {
      const prompt = fs.readFileSync(path.join(unpacked, 'prompts', `${checkpoint.key}.md`), 'utf8');
      if (checkpoint.key === 'a101-prework-extract-tarball') assert.ok(prompt.includes(EXTRACTION_BOOTSTRAP));
      else {
        const canonical = fs.readFileSync(path.join(ROOT, 'curriculum/prompts', `${checkpoint.key}.md`), 'utf8').replace(/^---\n[\s\S]*?\n---\n/, '').split('<!-- maintainer -->')[0].trimEnd();
        assert.equal(prompt.replace(/^---\n[\s\S]*?\n---\n/, '').trimEnd(), canonical, `ordinary archive prompt stays canonical: ${checkpoint.key}`);
        assert.ok(!prompt.includes(COURSE_READING_CUE));
      }
      assert.ok(!prompt.includes(WORKBOOK_URL), `return URL belongs in context file: ${checkpoint.key}`);
      assert.doesNotMatch(prompt, /Current:|Next:|prework\/learning-position\.md/);
      assert.ok(guide.includes(`${WORKBOOK_URL}${checkpoint.currentAnchor}`));
      assert.ok(guide.includes(`${WORKBOOK_URL}${checkpoint.nextAnchor}`));
    }

    const second = path.join(stage, 'second');
    run(second);
    assert.deepEqual(fs.readFileSync(path.join(second, 'acme-mvp/agents-101/agents-101-starter.tar.gz')), fs.readFileSync(archive), 'unchanged inputs produce identical starter bytes');
    for (const [relative, bytes] of before) assert.deepEqual(fs.readFileSync(path.join(ROOT, relative)), bytes, `shared input or existing customer artifact unchanged: ${relative}`);
  } finally {
    if (dom) dom.window.close();
    fs.rmSync(stage, { recursive: true, force: true });
  }
});
