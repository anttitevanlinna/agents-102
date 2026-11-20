'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const { createHash } = require('node:crypto');
const { JSDOM, VirtualConsole } = require('jsdom');
const { WORKBOOK_URL, stripExternalFonts, applyLoaderFraming, preworkSection, moveContentsAfterPrework, prependOfflinePrework, versionStarterDownload, SETUP_SCRIPT } = require('./build-a101-mvp.js');
const { renderCourseNavigation, COURSE_READING_CUE, EXTRACTION_BOOTSTRAP } = require('./a101-mvp-navigation.js');

const ROOT = path.resolve(__dirname, '..');
const DELIVERY = path.join(ROOT, 'curriculum/delivery/agents-101-mvp');

test('starter URL version comes only from archive bytes and leaves copied prompts unchanged', () => {
  const href = `href="${WORKBOOK_URL}agents-101-starter.tar.gz"`;
  const prompt = '<pre><code>Extract the starter tarball in the working folder.\n  tar xzf agents-101-starter.tar.gz\n</code></pre>';
  const html = `<a ${href}>Download</a>${prompt}`;
  const archive = Buffer.from('the same public course archive');
  const version = createHash('sha256').update(archive).digest('hex').slice(0, 16);
  const expected = `<a href="${WORKBOOK_URL}agents-101-starter.tar.gz?v=${version}">Download</a>${prompt}`;
  assert.equal(versionStarterDownload(html, archive), expected);
  assert.equal(versionStarterDownload(html, archive), expected, 'same course bytes give every learner the same query');
  assert.notEqual(versionStarterDownload(html, Buffer.from('changed course archive')), expected);
  assert.throws(() => versionStarterDownload(prompt, archive), /received 0/);
  assert.throws(() => versionStarterDownload(html + `<a ${href}>Duplicate</a>`, archive), /received 2/);
});

test('offline prework is copied from the rendered edition and fails on missing or duplicate sections', () => {
  const source = '<section class="module" id="prework"><h2>Game first</h2><a href="#prework">Local</a><a href="#resume-learning">Online resume</a><div><section>Nested content</section></div></section>';
  const rendered = preworkSection(source);
  assert.equal(rendered, source);
  const theory = '<html><head></head><body><section class="module" id="theory-m1"><h1>M1</h1></section></body></html>';
  const joined = prependOfflinePrework(theory, rendered);
  assert.ok(joined.indexOf('id="prework"') < joined.indexOf('id="theory-m1"'));
  assert.match(joined, /data-a101-setup/);
  assert.match(joined, /href="#prework"/);
  assert.ok(joined.includes(`href="${WORKBOOK_URL}#resume-learning"`), 'absent companion sections resolve to the public workbook');
  assert.throws(() => preworkSection('<p>No Prework.</p>'), /received 0/);
  assert.throws(() => preworkSection(source + source), /received 2/);
  assert.throws(() => prependOfflinePrework(source + theory, rendered), /already contains Prework/);
  assert.throws(() => prependOfflinePrework('<main>No M1</main>', rendered), /received 0/);
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

test('Contents moves behind the first start without copying or cutting any content', () => {
  const toc = '<nav class="workbook-toc"><a href="#getting-going">Module 1</a></nav>';
  const prework = '<section class="module" id="prework"><h2>First game</h2></section>';
  const moduleOne = '<section class="module" id="getting-going"><p>The first module.</p></section>';
  assert.equal(moveContentsAfterPrework(toc + prework + moduleOne), prework + toc + '\n\n' + moduleOne);
  assert.throws(() => moveContentsAfterPrework(prework + moduleOne), /Expected one Contents/);
  assert.throws(() => moveContentsAfterPrework(toc + toc + prework + moduleOne), /Expected one Contents/);
  assert.throws(() => moveContentsAfterPrework(prework + toc + moduleOne), /Unexpected Contents/);
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

test('setup picker detects the OS, keeps an override locally, and works without storage', () => {
  const markup = '<div role="group"><button data-a101-os="mac">Mac</button><button data-a101-os="windows">Windows</button></div><span data-a101-os-only="mac">Finder</span><span data-a101-os-only="windows">File Explorer</span>';
  for (const [platform, saved, expected, blocked] of [
    ['Win32', null, 'windows', false], ['MacIntel', null, 'mac', false],
    ['Win32', 'mac', 'mac', false], ['MacIntel', 'invalid', 'mac', false],
    ['Win32', null, 'windows', true], ['Darwin', null, 'mac', false],
  ]) {
    const picker = new JSDOM(markup, { url: WORKBOOK_URL, runScripts: 'outside-only' });
    try {
      const { window } = picker;
      Object.defineProperty(window.navigator, 'platform', { value: platform });
      if (saved) window.localStorage.setItem('a101-setup-os', saved);
      if (blocked) Object.defineProperty(window, 'localStorage', { get() { throw new Error('Storage unavailable'); } });
      window.eval(SETUP_SCRIPT);
      const assertSelection = value => {
        assert.equal(window.document.querySelector('[aria-pressed="true"]').getAttribute('data-a101-os'), value);
        for (const node of window.document.querySelectorAll('[data-a101-os-only]')) {
          assert.equal(node.hidden, node.getAttribute('data-a101-os-only') !== value);
        }
      };
      assertSelection(expected);
      const other = expected === 'mac' ? 'windows' : 'mac';
      window.document.querySelector('[data-a101-os="' + other + '"]').click();
      assertSelection(other);
      if (!blocked) assert.equal(window.localStorage.getItem('a101-setup-os'), other);
    } finally { picker.window.close(); }
  }
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
      'curriculum/trainings/agents-101/prework.md',
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
    assert.equal(start.nextElementSibling.id, 'prework', 'first-time reader reaches the first task before the course index');
    const controls = document.querySelector('main > .a101-learning-controls');
    assert.equal(controls, document.querySelector('main').lastElementChild, 'Pause and Resume live at the end of the workbook');
    assert.ok(document.querySelector('main > .workbook-toc').previousElementSibling.matches('section#prework'));
    assert.ok(document.querySelector('main > .workbook-toc').nextElementSibling.matches('section#getting-going'));
    assert.equal(document.querySelector('.workbook-topnav__modules a').getAttribute('href'), '#start-learning');
    for (const id of ['start-learning', 'pause-learning', 'resume-learning']) assert.equal(document.querySelectorAll(`[id="${id}"]`).length, 1);
    assert.ok(document.body.classList.contains('runtime-cowork'), 'fresh learner defaults to Cowork');
    assert.ok(controls.querySelector('details:not([open]) #runtime-switcher'), 'alternate tools are available after the first-run route');
    assert.equal(start.querySelectorAll('details').length, 0, 'the welcome leads to the first result without stop controls');
    assert.equal(controls.querySelectorAll('details:not([open])').length, 3);
    assert.equal(start.querySelector('#start-learning').textContent, 'Welcome to Agents 101');
    assert.match(start.textContent, /game you can play/i);
    assert.match(start.textContent, /calendar/i);
    assert.ok(!start.querySelector('a[href="#make-my-first-game"]'), 'the opening reaches the copy control without a jump link');
    dom.window.location.hash = '#resume-learning';
    dom.window.dispatchEvent(new dom.window.HashChangeEvent('hashchange'));
    assert.ok(document.getElementById('resume-learning').closest('details').open, 'direct resume link opens its collapsed instructions');
    assert.ok(controls.querySelector('.prompt-block .copy-btn'), 'normal workbook runtime decorates Pause and Resume prompts');
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
    const prework = document.getElementById('prework');
    const snakeBlock = [...prework.querySelectorAll('.prompt-block')].find(block => block.querySelector('code').textContent.startsWith('Build me a snake game'));
    assert.ok(snakeBlock, 'the first game remains an executable copied request');
    assert.ok(snakeBlock.compareDocumentPosition(extractionBlock) & dom.window.Node.DOCUMENT_POSITION_FOLLOWING, 'first game precedes starter installation');
    const downloadLink = prework.querySelector('a[href*="agents-101-starter.tar.gz"]');
    assert.ok(snakeBlock.compareDocumentPosition(downloadLink) & dom.window.Node.DOCUMENT_POSITION_FOLLOWING, 'first game precedes archive download');
    const snakeCanonical = fs.readFileSync(path.join(ROOT, 'curriculum/prompts/a101-prework-snake-game.md'), 'utf8').replace(/^---\n[\s\S]*?\n---\n/, '').split('<!-- maintainer -->')[0].trimEnd();
    const gameCopy = snakeBlock.querySelector('.copy-btn');
    assert.equal(prework.querySelector('a[href^="claude:"]'), null);
    const firstVideo = prework.querySelector('.a101-game-start .a101-video-placeholder');
    assert.match(firstVideo.textContent, /New → Cowork.*message box.*Send.*apple/);
    const visibleRequest = snakeBlock.querySelector('code');
    const fullRequest = visibleRequest.textContent.trimEnd();
    assert.match(fullRequest, /first 30 seconds, steer the snake for me so I can’t lose/);
    assert.equal(gameCopy.textContent, 'Copy request');
    gameCopy.click();
    await Promise.resolve();
    assert.equal(copied.at(-1), fullRequest);
    const handbookLink = fullRequest.match(/\[back to the handbook\]\(([^)]+)\)/);
    assert.ok(handbookLink, 'the game request carries its return link into Cowork');
    assert.equal(handbookLink[1], WORKBOOK_URL + '#open-cowork-and-add-a-folder');
    assert.equal(visibleRequest.querySelector('a').href, handbookLink[1]);
    assert.ok(document.getElementById(new URL(handbookLink[1]).hash.slice(1)));
    assert.equal(prework.querySelector('[data-copy-status]').textContent, 'Copied. Paste into Cowork and press Send.');
    assert.ok(snakeBlock.closest('.rt-cowork'), 'the preview request is Cowork-only');
    const saveGame = [...prework.querySelectorAll('.rt-cowork .prompt-block')].find(block => block.querySelector('code').textContent.startsWith('Save the game we just made'));
    assert.ok(saveGame, 'Cowork learners have a separate request to save the game they played');
    assert.ok(saveGame.compareDocumentPosition(extractionBlock) & dom.window.Node.DOCUMENT_POSITION_FOLLOWING, 'the game is saved before the starter is added');
    saveGame.querySelector('.copy-btn').click();
    await Promise.resolve();
    assert.equal(copied.at(-1), 'Save the game we just made as `prework/snake.html` in the folder I added.');
    assert.match(snakeCanonical, /Save it as `prework\/snake\.html`/);
    assert.match(prework.textContent, /agents-101.*folder you created in Documents/, 'CLI setup uses the same established training root');
    assert.doesNotMatch(prework.textContent, /~\/Documents/);
    assert.equal(prework.querySelectorAll('.a101-os-picker').length, 1);
    assert.ok(snakeBlock.compareDocumentPosition(prework.querySelector('.a101-os-picker')) & dom.window.Node.DOCUMENT_POSITION_FOLLOWING, 'the OS choice appears when learners save the game');
    const videos = [...prework.querySelectorAll('.a101-video-placeholder')].filter(video => video !== firstVideo);
    assert.equal(videos.length, 2);
    document.querySelector('[data-a101-os="windows"]').click();
    assert.ok(document.body.classList.contains('runtime-cowork'), 'OS choice leaves the selected runtime alone');
    assert.ok(videos.every(video => video.querySelector('[data-a101-os-only="mac"]').hidden));
    assert.ok(videos.every(video => !video.querySelector('[data-a101-os-only="windows"]').hidden));
    assert.ok(videos.every(video => /video/i.test(video.textContent) && video.textContent.trim().length > 20));
    assert.ok(videos.every(video => !video.querySelector('video,iframe,button,audio,source')), 'video placeholders are captions, not fake media controls');
    const oldPreworkAnchors = ['1-set-up-your-agent-runtime-5-min', '2-connect-your-work-apps-5-min', '3-install-the-training-folder-3-min', '4-build-a-snake-game-10-min', '5-summarize-your-week-in-meetings-10-min', '6-read-the-mental-frame-10-min', 'bring-to-module-1'];
    for (const id of oldPreworkAnchors) assert.equal(prework.querySelectorAll(`[id="${id}"]`).length, 1, `old Prework anchor remains unique: ${id}`);
    const moduleSlugs = require('../site/layouts/curriculum.js').TRAININGS['agents-101'].modules.map(module => module.slug);
    assert.equal(moduleSlugs.length, 8);
    for (const id of moduleSlugs) assert.ok(document.querySelector(`main > section.module[id="${id}"]`), `full course module stays available: ${id}`);
    extractionBlock.querySelector('.copy-btn').click();
    await Promise.resolve();
    assert.equal(copied.at(-1), extractionBlock.querySelector('code').textContent.trimEnd());
    assert.ok(copied.at(-1).includes(EXTRACTION_BOOTSTRAP), 'extraction alone installs the course context loader');
    assert.doesNotMatch(prework.textContent, /Customize|Read CLAUDE\.md before working in this folder/);
    const attachSteps = [...prework.querySelectorAll('.rt-cowork ol')].find(list => list.textContent.includes('Add folder'));
    assert.ok(attachSteps && snakeBlock.compareDocumentPosition(attachSteps) & dom.window.Node.DOCUMENT_POSITION_FOLLOWING, 'Cowork learners play the game before they attach the folder');
    dom.window.A101Runtimes.applyRuntime('cli');
    assert.equal(dom.window.getComputedStyle(attachSteps.closest('.rt-cowork')).display, 'none', 'CLI does not see Cowork attachment controls');
    assert.equal(dom.window.getComputedStyle(snakeBlock.closest('.rt-cowork')).display, 'none', 'CLI does not get the preview request');
    const cliSnake = [...prework.querySelectorAll('.rt-code .rt-profile-cli .prompt-block')].find(block => block.querySelector('code').textContent.startsWith('Build me a snake game'));
    assert.ok(cliSnake, 'CLI retains its original local-file prompt');
    cliSnake.querySelector('.copy-btn').click();
    await Promise.resolve();
    assert.equal(copied.at(-1), snakeCanonical);
    dom.window.A101Runtimes.applyRuntime('cowork');
    const resumeBlock = document.getElementById('resume-learning').closest('details').querySelector('.prompt-block');
    resumeBlock.querySelector('.copy-btn').click();
    await Promise.resolve();
    assert.equal(copied.at(-1), resumeBlock.querySelector('code').textContent.trimEnd(), 'Copy sends exact resume body without title metadata');
    assert.ok(copied.at(-1).startsWith('Help me resume Agents 101.'));
    const deck = dom.window.CurriculumSlides.buildDeckModel(document.querySelector('main').cloneNode(true));
    assert.ok(!deck.slides.some(slide => slide.el.querySelector('#start-learning, #pause-learning, #resume-learning')), 'actual slide model excludes all onboarding instructions');
    for (const id of oldPreworkAnchors) assert.ok(Number.isInteger(deck.anchors[id]), `old link has a Slides target: ${id}`);
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
    const starterVersion = createHash('sha256').update(fs.readFileSync(path.join(trainingDir, 'agents-101-starter.tar.gz'))).digest('hex').slice(0, 16);
    for (const href of archiveLinks) {
      const url = new URL(href, WORKBOOK_URL);
      assert.equal(url.origin + url.pathname, `${WORKBOOK_URL}agents-101-starter.tar.gz`);
      assert.deepEqual([...url.searchParams.keys()], ['v']);
      assert.equal(url.searchParams.get('v'), starterVersion);
      assert.match(url.searchParams.get('v'), /^[a-f0-9]{16}$/);
    }
    for (const element of document.querySelectorAll('style, link[href]')) assert.doesNotMatch(element.outerHTML, /fonts\.(?:googleapis|gstatic)\.com/);
    assert.ok(!fs.existsSync(path.join(trainingDir, 'trainer-guide.html')));
    assert.ok(!fs.existsSync(path.join(trainingDir, 'trainer-modules.html')));
    assert.match(fs.readFileSync(path.join(first, 'acme-mvp/index.html'), 'utf8'), /\.\/agents-101\/#start-learning/);

    const unpacked = path.join(stage, 'unpacked');
    fs.mkdirSync(unpacked);
    fs.mkdirSync(path.join(unpacked, 'prework'));
    const firstGame = '<!doctype html><title>Learner first game</title><canvas id="learner-game"></canvas>';
    fs.writeFileSync(path.join(unpacked, 'prework/snake.html'), firstGame);
    const archive = path.join(trainingDir, 'agents-101-starter.tar.gz');
    const listing = execFileSync('tar', ['tzf', archive], { encoding: 'utf8', env });
    assert.doesNotMatch(listing, /(?:^|\/)\.(?:claude|agents)(?:\/|$)/m);
    assert.doesNotMatch(listing, /^\.\/(?:CLAUDE|AGENTS)\.md$/m);
    execFileSync('tar', ['xzf', archive, '-C', unpacked], { env });
    assert.equal(fs.readFileSync(path.join(unpacked, 'prework/snake.html'), 'utf8'), firstGame, 'later starter extraction preserves the game already built');
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
    const offlineHtml = fs.readFileSync(path.join(unpacked, 'agents-101-handbook.html'), 'utf8');
    const offline = new JSDOM(offlineHtml);
    try {
      const offlinePrework = offline.window.document.getElementById('prework');
      assert.ok(offlinePrework, 'the offline handbook includes the same first-game route');
      const publicPrework = preworkSection(html).replace(`agents-101-starter.tar.gz?v=${starterVersion}`, 'agents-101-starter.tar.gz');
      const expectedPrework = new JSDOM(publicPrework);
      try {
        for (const link of expectedPrework.window.document.querySelectorAll('a[href^="#"]')) {
          if (!offline.window.document.getElementById(link.getAttribute('href').slice(1))) link.setAttribute('href', WORKBOOK_URL + link.getAttribute('href'));
        }
        assert.equal(offlinePrework.outerHTML, expectedPrework.window.document.getElementById('prework').outerHTML, 'offline setup uses the same renderer output; only links to missing companion sections point online');
      } finally { expectedPrework.window.close(); }
      for (const link of offlinePrework.querySelectorAll('a[href^="#"]')) assert.ok(offline.window.document.getElementById(link.getAttribute('href').slice(1)), `offline local link resolves: ${link.getAttribute('href')}`);
      assert.ok(offlineHtml.indexOf('Build me a snake game') < offlineHtml.indexOf('Extract the starter tarball'));
      assert.ok(offlinePrework.compareDocumentPosition(offline.window.document.getElementById('theory-m1')) & offline.window.Node.DOCUMENT_POSITION_FOLLOWING);
      assert.equal(offlinePrework.querySelectorAll('.a101-video-placeholder').length, 3);
      const setupScript = offline.window.document.querySelector('script[data-a101-setup]');
      assert.equal(setupScript.textContent, SETUP_SCRIPT, 'offline companion uses the same OS picker behavior');
      for (const id of oldPreworkAnchors) assert.equal(offlinePrework.querySelectorAll(`[id="${id}"]`).length, 1);
    } finally { offline.window.close(); }
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
    const secondDom = new JSDOM(fs.readFileSync(path.join(second, 'acme-mvp/agents-101/index.html'), 'utf8'));
    try { assert.equal(secondDom.window.document.querySelector('a[href*="agents-101-starter.tar.gz"]').getAttribute('href'), archiveLinks[0], 'the version query is constant for the release, not a learner identifier'); }
    finally { secondDom.window.close(); }
    for (const [relative, bytes] of before) assert.deepEqual(fs.readFileSync(path.join(ROOT, relative)), bytes, `shared input or existing customer artifact unchanged: ${relative}`);
  } finally {
    if (dom) dom.window.close();
    fs.rmSync(stage, { recursive: true, force: true });
  }
});
