'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { createNavigationOverlay, injectCheckpoint } = require('./a101-mvp-navigation');

const currentUrl = 'https://training.example/course/index.html#first';
const nextUrl = 'https://training.example/course/index.html#second';
const navigation = { currentUrl, nextUrl, nextLabel: 'Continue building' };

test('preserves request, metadata and maintainer tail while keeping the input hook last', () => {
  const prefix = '---\nkey: example\nruntime: any\n---\n';
  const tail = '<!-- maintainer -->\nPrivate authoring notes.\n';
  const src = prefix + 'Build a page from my profile.\n\nSave it as `module-1/site.html`.\n\nLinkedIn:\n\n' + tail;
  const output = injectCheckpoint(src, navigation);
  assert.ok(output.startsWith(prefix + 'Build a page from my profile.'));
  assert.ok(output.endsWith('LinkedIn:\n\n' + tail));
  assert.ok(output.includes('Save it as `module-1/site.html`.'));
  assert.ok(output.includes(`Current: ${currentUrl}\nNext: ${nextUrl}`));
  assert.ok(output.includes(`[Continue building](${nextUrl})`));
  assert.match(output, /prework\/learning-position\.md/);
  assert.match(output, /Keep working here if I ask for revisions/);
  assert.match(output, /do not start it automatically/);
  assert.doesNotMatch(output, /CLAUDE\.md|AGENTS\.md/);
});

test('preserves a multiline input hook paragraph and CRLF source', () => {
  const src = 'Make a briefing.\r\n\r\nUse the material I paste here:\r\nMore context:\r\n';
  const output = injectCheckpoint(src, navigation);
  assert.ok(output.startsWith('Make a briefing.\r\n\r\nWhen this request'));
  assert.ok(output.endsWith('Use the material I paste here:\r\nMore context:\r\n'));
  assert.doesNotMatch(output, /(?<!\r)\n/);
});

test('keeps a hook on the last line when it shares the first paragraph', () => {
  const output = injectCheckpoint('Build my page.\nProfile:\n', navigation);
  assert.ok(output.startsWith('Build my page.\n\nWhen this request'));
  assert.ok(output.endsWith('\n\nProfile:\n'));
});

test('appends navigation for a prompt without an input hook', () => {
  const src = 'Sharpen the file in place.\n\nTell me what changed.\n';
  const output = injectCheckpoint(src, navigation);
  assert.ok(output.startsWith(src.trimEnd() + '\n\nWhen this request'));
  assert.ok(output.endsWith('do not start it automatically.\n'));
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
  assert.ok(fs.readFileSync(output, 'utf8').trimEnd().endsWith('My hate list:'));
});
