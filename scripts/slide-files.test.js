#!/usr/bin/env node
'use strict';
// Slide files: curriculum/slides/<id>.md holds one slide; `[T](slides/<id>.md)`
// alone on its line is transparent — replaced by the slide body before any
// reader sees the file. These tests pin the runtime contract the eval layer
// builds on (SLIDE_FILE_RE, inlineSlideFiles, slideFileProblem) and the Node
// read helper.
//
// Run: node --test scripts/slide-files.test.js
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const CR = require('../site/layouts/curriculum.js');
const { readCurriculumMd } = require('./read-curriculum.js');

const SLIDE = '## Two answers\n<!--slide:two-answers-->\n\nSame words. Different answer.\n';
const SLIDE_WITH_TAIL = SLIDE + '\n<!-- maintainer -->\n\nGuard note for `two-answers`.\n';
const get = map => id => (id in map ? map[id] : null);

test('an include line is replaced by the slide body, tail stripped, nothing else touched', () => {
  const md = '# L\n\nLede.\n\n[Two answers](slides/two-answers.md)\n\n## Next\n\nText.\n';
  const out = CR.inlineSlideFiles(md, get({ 'two-answers': SLIDE_WITH_TAIL }));
  assert.equal(out, '# L\n\nLede.\n\n## Two answers\n<!--slide:two-answers-->\n\nSame words. Different answer.\n\n## Next\n\nText.\n');
})

test('only a line that is the include alone is an include', () => {
  const md = 'See [Two answers](slides/two-answers.md) inline.\n[Two answers](slides/two-answers.md) trailing words\n';
  assert.equal(CR.inlineSlideFiles(md, () => { throw new Error('read') }), md);
})

test('a missing slide file fails loudly', () => {
  assert.throws(() => CR.inlineSlideFiles('[X](slides/nope.md)\n', get({})), /slides\/nope\.md: no such slide file/);
})

test('lecture/exercise includes are not slide includes, and the reverse', () => {
  const re = new RegExp(CR.INCLUDE_LINK_RE.source, 'm');
  assert.ok(!re.test('[T](slides/x.md)'));
  assert.ok(!new RegExp(CR.SLIDE_FILE_RE.source, 'm').test('[T](lectures/x.md)'));
})

test('#id borrows still resolve after a home slide moved to a slide file', () => {
  const home = '# L\n<!--slide:cover-->\n\nLede.\n\n[Two answers](slides/two-answers.md)\n';
  const inlined = CR.inlineSlideFiles(home, get({ 'two-answers': SLIDE }));
  assert.equal(CR.sliceSlide(inlined, 'two-answers'), SLIDE);
})

test('slideFileProblem accepts one ## slide with its marker, rejects the rest', () => {
  assert.equal(CR.slideFileProblem('two-answers', SLIDE_WITH_TAIL), null);
  assert.equal(CR.slideFileProblem('two-answers', '## T\n<!--tier:2-->\n<!--slide:two-answers-->\n\nx\n'), null);
  assert.match(CR.slideFileProblem('c', '# Cover\n<!--slide:c-->\n\nlede\n'), /## heading/);
  assert.match(CR.slideFileProblem('two-answers', '## T\n\nno marker\n'), /no <!--slide:two-answers-->/);
  assert.match(CR.slideFileProblem('other', SLIDE), /marker says two-answers, filename says other/);
  assert.match(CR.slideFileProblem('two-answers', SLIDE + '\n## Second\n\ny\n'), /second heading/);
  assert.equal(CR.slideFileProblem('two-answers', SLIDE + '\n```\n## not a heading\n```\n'), null);
  assert.match(CR.slideFileProblem('two-answers', SLIDE + '\n[Other](slides/other.md)\n'), /includes slides\/other\.md/);
})

test('readCurriculumMd inlines from the curriculum tree the file lives in', () => {
  const d = fs.mkdtempSync(path.join(os.tmpdir(), 'slides-'));
  fs.mkdirSync(path.join(d, 'curriculum', 'slides'), { recursive: true });
  fs.mkdirSync(path.join(d, 'curriculum', 'lectures'));
  fs.writeFileSync(path.join(d, 'curriculum', 'slides', 'two-answers.md'), SLIDE_WITH_TAIL);
  const lec = path.join(d, 'curriculum', 'lectures', 'l.md');
  fs.writeFileSync(lec, '# L\n\n[Two answers](slides/two-answers.md)\n');
  assert.equal(readCurriculumMd(lec), '# L\n\n' + SLIDE);
})

// The SPA fetches; it inlines through the same function with a Promise fetcher.
test('inlineSlideFilesAsync inlines what the fetcher returns, fetching each slide once', async () => {
  const seen = [];
  const md = '# L\n\n[Two answers](slides/two-answers.md)\n\n[Two answers](slides/two-answers.md)\n';
  const out = await CR.inlineSlideFilesAsync(md, id => { seen.push(id); return Promise.resolve(SLIDE_WITH_TAIL); });
  assert.equal(out, CR.inlineSlideFiles(md, () => SLIDE_WITH_TAIL));
  assert.deepEqual(seen, ['two-answers']);
  assert.equal(await CR.inlineSlideFilesAsync('# No includes\n', () => { throw new Error('no fetch') }), '# No includes\n');
  await assert.rejects(CR.inlineSlideFilesAsync('[X](slides/x.md)\n', () => Promise.resolve(null)), /slides\/x\.md: no such slide file/);
})

test('the SPA inlines slide files on the page it loads and inside every include', () => {
  const spa = fs.readFileSync(path.join(__dirname, '..', 'site', 'layouts', 'curriculum-spa.js'), 'utf8');
  assert.match(spa, /\.then\(extractParent\)\s*\.then\(inlineSlides\)\s*\.then\(stripMaintainerTail\)/, 'loadAndRender inlines before stripping');
  assert.match(spa, /return fetch\('\.\.\/curriculum\/' \+ p\)[\s\S]{0,200}\.then\(function \(text\) \{ return text === null \? null : inlineSlides\(text\); \}\)/, 'expandIncludes inlines each fetched lecture before slicing');
})
