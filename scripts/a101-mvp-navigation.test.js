'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { createNavigationOverlay, injectCheckpoint, renderCourseNavigation, COURSE_READING_CUE, EXTRACTION_BOOTSTRAP } = require('./a101-mvp-navigation');

const currentUrl = 'https://training.example/course/index.html#first';
const nextUrl = 'https://training.example/course/index.html#second';
const navigation = { currentUrl, nextUrl, nextLabel: 'Continue building' };
const bootstrap = { ...navigation, key: 'a101-prework-extract-tarball' };

test('preserves request, metadata and maintainer tail while keeping the input hook last', () => {
  const prefix = '---\nkey: example\nruntime: any\n---\n';
  const tail = '<!-- maintainer -->\nPrivate authoring notes.\n';
  const src = prefix + 'Build a page from my profile.\n\nSave it as `module-1/site.html`.\n\nLinkedIn:\n\n' + tail;
  const output = injectCheckpoint(src, bootstrap);
  assert.ok(output.startsWith(prefix + 'Build a page from my profile.'));
  assert.ok(output.endsWith('LinkedIn:\n\n' + tail));
  assert.ok(output.includes('Save it as `module-1/site.html`.'));
  assert.ok(output.includes(EXTRACTION_BOOTSTRAP));
  assert.equal(output.split(COURSE_READING_CUE).length - 1, 1);
  assert.doesNotMatch(output, /https?:\/\/|Current:|Next:|learning-position\.md|Keep working here|do not start it automatically/);
  assert.match(output, /Preserve any existing instructions/);
  assert.doesNotMatch(output, /AGENTS\.md/);
});

test('preserves a multiline input hook paragraph and CRLF source', () => {
  const src = 'Make a briefing.\r\n\r\nUse the material I paste here:\r\nMore context:\r\n';
  const output = injectCheckpoint(src, bootstrap);
  assert.ok(output.startsWith('Make a briefing.\r\n\r\n' + EXTRACTION_BOOTSTRAP));
  assert.ok(output.endsWith('Use the material I paste here:\r\nMore context:\r\n'));
  assert.doesNotMatch(output, /(?<!\r)\n/);
});

test('keeps a hook on the last line when it shares the first paragraph', () => {
  const output = injectCheckpoint('Build my page.\nProfile:\n', bootstrap);
  assert.ok(output.startsWith('Build my page.\n\n' + EXTRACTION_BOOTSTRAP));
  assert.ok(output.endsWith('\n\nProfile:\n'));
});

test('appends navigation for a prompt without an input hook', () => {
  const src = 'Sharpen the file in place.\n\nTell me what changed.\n';
  const output = injectCheckpoint(src, bootstrap);
  assert.equal(output, src.trimEnd() + '\n\n' + EXTRACTION_BOOTSTRAP + '\n');
});

test('ordinary prompts are byte-identical, including open hooks and original whitespace', () => {
  const source = '---\nkey: ordinary\n---\nBuild my page.\n\nLinkedIn:\n\n';
  assert.equal(injectCheckpoint(source, { ...navigation, key: 'ordinary' }), source);
  assert.equal(COURSE_READING_CUE, 'Read prework/course-navigation.md before helping with Agents 101 work.');
});

test('rejects invalid absolute URLs, anchors, labels and empty prompts', () => {
  for (const url of ['/relative#first', 'javascript:alert(1)', 'https://example.com/', 'https://a:b@example.com/#first', 'https://example.com/#bad%20anchor']) {
    assert.throws(() => injectCheckpoint('Do the work.', { ...navigation, nextUrl: url }));
  }
  assert.throws(() => injectCheckpoint('Do the work.', { ...navigation, nextLabel: 'Go\nelsewhere' }));
  assert.throws(() => injectCheckpoint('', navigation));
});

function fixture(t) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'a101-navigation-'));
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  const root = path.join(dir, 'source');
  const prompts = path.join(root, 'curriculum', 'prompts');
  const overlayDir = path.join(dir, 'overlay');
  fs.mkdirSync(prompts, { recursive: true });
  const src = '---\nkey: first\nruntime: any\n---\nBuild a page.\n\nProfile:\n';
  fs.writeFileSync(path.join(prompts, 'first.md'), src);
  const options = { root, overlayDir, workbookUrl: 'https://training.example/course/index.html', checkpoints: [{ key: 'first', currentAnchor: '#first', nextAnchor: 'second', nextLabel: 'Continue building' }] };
  return { root, prompts, overlayDir, src, options };
}

test('creates only overlay prompt files, leaves canonical source unchanged and is repeatable', t => {
  const { prompts, overlayDir, src, options } = fixture(t);
  const files = createNavigationOverlay(options);
  assert.deepEqual(files, [path.join(overlayDir, 'prompts', 'first.md')]);
  const generated = fs.readFileSync(files[0], 'utf8');
  assert.equal(fs.readFileSync(path.join(prompts, 'first.md'), 'utf8'), src);
  assert.equal(generated, injectCheckpoint(src, navigation));
  assert.deepEqual(fs.readdirSync(overlayDir), ['prompts']);
  assert.deepEqual(fs.readdirSync(path.join(overlayDir, 'prompts')), ['first.md']);
  createNavigationOverlay(options);
  assert.equal(fs.readFileSync(files[0], 'utf8'), generated);
});

test('validates every checkpoint before writing output', t => {
  const { overlayDir, options } = fixture(t);
  const invalid = [
    { ...options.checkpoints[0], key: 'unknown' },
    { ...options.checkpoints[0], key: '../first' },
    { ...options.checkpoints[0], nextAnchor: '#invalid/path' }
  ];
  for (const checkpoint of invalid) {
    assert.throws(() => createNavigationOverlay({ ...options, checkpoints: [checkpoint] }));
    assert.equal(fs.existsSync(overlayDir), false);
  }
  assert.throws(() => createNavigationOverlay({ ...options, checkpoints: [...options.checkpoints, { ...options.checkpoints[0], key: 'unknown' }] }), /Unknown prompt/);
  assert.throws(() => createNavigationOverlay({ ...options, checkpoints: [...options.checkpoints, ...options.checkpoints] }), /duplicate/);
  assert.equal(fs.existsSync(overlayDir), false);
  assert.throws(() => createNavigationOverlay({ ...options, workbookUrl: currentUrl }));
});

test('refuses output into canonical prompt directory or a linked alias', t => {
  const { root, prompts, options } = fixture(t);
  assert.throws(() => createNavigationOverlay({ ...options, overlayDir: path.join(root, 'curriculum') }));
  const alias = path.join(path.dirname(root), 'alias');
  fs.mkdirSync(alias);
  fs.symlinkSync(prompts, path.join(alias, 'prompts'));
  assert.throws(() => createNavigationOverlay({ ...options, overlayDir: alias }));
});

test('preserves the real canonical open-hook prompt without modifying it', t => {
  const root = path.resolve(__dirname, '..');
  const source = path.join(root, 'curriculum/prompts/personal-site-with-guardrails-4.md');
  const src = fs.readFileSync(source, 'utf8');
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'a101-real-navigation-'));
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  const [output] = createNavigationOverlay({ root, overlayDir: dir, workbookUrl: 'https://training.example/course/index.html', checkpoints: [{ key: 'personal-site-with-guardrails-4', currentAnchor: 'first', nextAnchor: 'second', nextLabel: navigation.nextLabel }] });
  assert.equal(fs.readFileSync(source, 'utf8'), src);
  assert.equal(fs.readFileSync(output, 'utf8'), src);
  assert.ok(fs.readFileSync(output, 'utf8').trimEnd().endsWith('My strengths:'));
});

test('navigation guide appends validated return metadata and deduplicates runtime variants', () => {
  const options = {
    workbookUrl: 'https://training.example/course/index.html',
    checkpoints: [
      { key: 'first', task: 'Build the page', currentAnchor: '#first', nextAnchor: 'second', nextLabel: 'Continue building' },
      { key: 'first-cowork', task: 'Build the page', currentAnchor: 'first', nextAnchor: '#second', nextLabel: 'Continue building' },
      { key: 'next', task: 'Review | revise', currentAnchor: 'second', nextAnchor: 'third', nextLabel: 'Read | compare' },
    ],
  };
  const expected = '# Local guide\n\nKeep working here.\n\n## Workbook returns\n\n| Completed request | Current section | Return after request |\n| --- | --- | --- |\n'
    + `| Build the page | [Current section](${currentUrl}) | [Continue building](${nextUrl}) |\n`
    + '| Review \\| revise | [Current section](https://training.example/course/index.html#second) | [Read \\| compare](https://training.example/course/index.html#third) |\n';
  const template = '# Local guide\n\nKeep working here.\n';
  assert.equal(renderCourseNavigation(template, options), expected);
  assert.equal(renderCourseNavigation(template, options), expected);
  assert.throws(() => renderCourseNavigation(template, { ...options, workbookUrl: currentUrl }));
  assert.throws(() => renderCourseNavigation(template, { ...options, checkpoints: [{ ...options.checkpoints[0], task: 'two\nrows' }] }));
  assert.throws(() => renderCourseNavigation(template, { ...options, checkpoints: [{ ...options.checkpoints[0], currentAnchor: '../host' }] }));
  assert.throws(() => renderCourseNavigation(expected, options), /already contains/);
});
