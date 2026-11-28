'use strict';
/* Prompt places: curriculum/delivery/agents-101-mvp/shell/prompt-places.js,
 * the key comment from renderPromptBlock (site/layouts/curriculum.js) and the
 * build check checkPromptPlaces (scripts/build-a101-mvp.js).
 * Run: node --test scripts/prompt-places.test.js
 *
 * What must hold for a learner: "Back to the handbook" in the agent gives a
 * link built from the prompt file's name (#p-<key>), and that link lands on
 * the prompt they last pasted, in the runtime they chose. No list is kept by
 * hand, so the build fails when the files and the page drift apart.
 */
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'curriculum/delivery/agents-101-mvp/shell/prompt-places.js');
const CR = require(path.join(ROOT, 'site/layouts/curriculum.js'));
const { checkPromptPlaces } = require('./build-a101-mvp.js');
const { renderCourseNavigation } = require('./a101-mvp-navigation.js');

test('every prompt block carries its registry key, outside the text a learner copies', () => {
  const md = CR.renderPromptBlock({ key: 'eval-loop-3', dest: 'Cowork', text: 'Can we scale this?' });
  assert.match(md, /<!--prompt-key eval-loop-3-->/);
  const fence = md.slice(md.indexOf('```'));
  assert.doesNotMatch(fence, /prompt-key/, 'the key never enters the fenced prompt');
  assert.doesNotMatch(CR.renderPromptBlock({ key: 'Bad Key -->', dest: 'Cowork', text: 'x' }), /prompt-key/, 'a key that is not a slug is left out');
});

function page(variants) {
  const marked = require('marked');
  CR.configureMarked(marked.marked || marked);
  const block = (cls, text) => `<div class="rt-profile ${cls}">\n\n${CR.renderPromptBlock({ key: 'eval-loop-3', dest: 'Cowork', text })}\n\n</div>`;
  const md = variants.map(([cls, text]) => block(cls, text)).join('\n\n') + '\n\n' + CR.renderPromptBlock({ key: 'eval-loop-4', dest: 'Cowork', text: 'What is the similarity?' });
  const html = (marked.marked || marked).parse(md);
  const css = '<style>body.rt-cli .rt-profile-cowork, body:not(.rt-cli) .rt-profile-cli { display: none; }</style>';
  return new JSDOM(`<!doctype html><head>${css}</head><body class="workbook"><main><section class="module" id="m">${html}</section></main></body>`, { url: 'https://example.test/agents-101/#p-eval-loop-3' });
}

test('the visible variant of a prompt gets #p-<key>, the address follows a runtime switch, and the page jumps to it', async () => {
  const dom = page([['rt-profile-cowork', 'Can we scale this?'], ['rt-profile-cli', 'Can we scale this?']]);
  const doc = dom.window.document;
  global.document = doc; global.window = dom.window;
  try {
    CR.decoratePrompts(doc.body);
    const jumped = [];
    dom.window.HTMLElement.prototype.scrollIntoView = function () { jumped.push(this.id); };
    require(SRC).install(doc);
    const blocks = [...doc.querySelectorAll('.prompt-block')];
    assert.equal(blocks.length, 3);
    assert.equal(blocks[0].id, 'p-eval-loop-3', 'Cowork variant holds the address');
    assert.equal(blocks[1].id, '', 'the hidden variant holds none');
    assert.equal(blocks[2].id, 'p-eval-loop-4');
    assert.deepEqual(jumped, ['p-eval-loop-3'], 'a link to the address lands on the prompt');
    doc.body.classList.add('rt-cli');
    await new Promise(r => setTimeout(r, 0));
    assert.equal(blocks[0].id, '');
    assert.equal(blocks[1].id, 'p-eval-loop-3', 'after the switch the CLI variant holds it');
    assert.equal(doc.querySelectorAll('#p-eval-loop-3').length, 1, 'one address, one block');
  } finally { delete global.document; delete global.window; dom.window.close(); }
});

test('the build refuses a starter whose prompt files and page places differ', () => {
  const html = '<!--prompt-key a--> <!--prompt-key b--> <!--prompt-key b-->';
  assert.equal(checkPromptPlaces(html, ['a.md', 'b.md', '.keep']), 2);
  assert.throws(() => checkPromptPlaces(html, ['a.md']), /On the page without a shipped file: b\./);
  assert.throws(() => checkPromptPlaces(html, ['a.md', 'b.md', 'c.md']), /Shipped without a place on the page: c\./);
});

test('the navigation guide builds each link from the prompt file name and answers "Back to the handbook"', () => {
  const template = fs.readFileSync(path.join(ROOT, 'curriculum/delivery/agents-101-mvp/course-navigation.md'), 'utf8')
    .split('https://agents102.bosser.consulting/clients/acme-mvp/agents-101/').join('https://example.test/agents-101/');
  const guide = renderCourseNavigation(template, { workbookUrl: 'https://example.test/agents-101/', checkpoints: [] });
  assert.match(guide, /The link for `prompts\/<name>\.md` is `https:\/\/example\.test\/agents-101\/#p-<name>`/);
  assert.match(guide, /^## Back to the handbook$/m);
  assert.match(guide, /Do not mention the save in your reply\./);
});

test('the built open edition gives every shipped prompt a place (skipped until built)', (t) => {
  const site = path.join(ROOT, 'site/agents-101/index.html');
  if (!fs.existsSync(site)) return t.skip('open edition not built');
  const html = fs.readFileSync(site, 'utf8');
  assert.ok((html.match(/<!--prompt-key /g) || []).length > 60, 'the page carries prompt keys');
  assert.match(html, /<script data-a101-prompt-places>/);
});
