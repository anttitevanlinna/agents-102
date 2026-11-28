'use strict';
/* The prompt in short: curriculum/delivery/agents-101-mvp/shell/prompt-short.js.
 * Run: node --test scripts/prompt-short.test.js
 *
 * What must hold for a learner: Copy takes the whole prompt whatever the box
 * shows; a short prompt stays open; a callout sits before the part it explains
 * and never enters the prompt text.
 */
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'curriculum/delivery/agents-101-mvp/shell/prompt-short.js');
const { promptOutline, shortView } = require(SRC);
const CR = require(path.join(ROOT, 'site/layouts/curriculum.js'));

const LOOP = [
  'Run an eval loop using my fixed judge. Never edit judges/groundedness-judge.md.',
  '',
  'Run at least 3 rounds. After round 3, keep going until there is no longer significant improvement from the previous round.',
  '',
  'For each round:',
  '1. Dispatch a generator subagent. It reads ./generation-tactic.md and memory/. It writes the briefing for that round:',
  '   - briefing.md in that round\'s folder',
  '2. Dispatch a separate judge subagent. It reads the judge file and the briefing for that round, and nothing else.',
  '3. The main session rewrites ./generation-tactic.md for the next round. Integrate the lesson; do not append.',
  '',
  'When the loop stops:',
  '- Write module-6/eval-notes.md with: rounds run, flagged claims per round, the tactic change that helped most.',
  '- In chat, show me the same summary in under 12 lines.',
  '',
  'Do not stop for confirmation between rounds.'
].join('\n');

test('a part shows its first sentence; the rest is marked as more', () => {
  const o = promptOutline(LOOP);
  assert.equal(o[0].head, 'Run an eval loop using my fixed judge. Never edit judges/groundedness-judge.md.', 'a short rest stays with its head');
  assert.equal(o[1].head, 'Run at least 3 rounds.');
  assert.equal(o[1].more, true);
  assert.equal(o[3].head, '1. Dispatch a generator subagent.');
  assert.equal(o[3].more, true, 'the nested line belongs to its item');
  assert.equal(o.length, 10, 'a paragraph or a top-level list item is one part');
});

test('a sentence does not end inside a quote, a backtick or an abbreviation', () => {
  assert.equal(promptOutline('If the file exists, put its "Claims judged: N. Flagged: M." line first. Then carry on with the next step in the list.')[0].head,
    'If the file exists, put its "Claims judged: N. Flagged: M." line first.');
  assert.equal(promptOutline('Read `notes. Old.md` before anything else. Then report what the file says about the rollout plan.')[0].head,
    'Read `notes. Old.md` before anything else.');
  assert.equal(promptOutline('Name the sources, e.g. The wiki, in one line. Then stop and wait for my answer before you go on.')[0].head,
    'Name the sources, e.g. The wiki, in one line.');
  assert.equal(promptOutline('Two rules. Keep the first rule short and plain. Everything else can wait until the review round.')[0].head,
    'Two rules. Keep the first rule short and plain.', 'a head of under four words takes the next sentence');
});

test('a prompt of up to eight lines stays open, and so does one the short view barely shortens', () => {
  assert.equal(shortView('What tools do you have available?').short, false);
  const list = ['Suggest where I would go looking for raw material. Specifically:', '',
    '- 3 to 5 search terms I would type into my work wiki or search',
    '- 2 to 3 folder names likely to hold relevant docs, emails, or decks',
    '- 2 to 3 practitioners worth reading on this challenge', '',
    'Keep it short. I will use this as a scavenger-hunt list in the next phase.', '',
    'Show me the list before you save it anywhere in the folder.', '', 'Then wait.'].join('\n');
  const v = shortView(list);
  assert.ok(v.fullLines > 8);
  assert.equal(v.short, false, 'saves under four lines');
  assert.equal(shortView(LOOP).short, true);
});

test('a run of five or more short bullets folds to its first two; numbered steps never fold', () => {
  const text = ['Include a mix of claim shapes, so that later findings can be matched back to the briefing they came from:',
    '- numbers', '- named entities', '- quotes', '- causal claims', '- comparisons', '- next actions', '',
    'Do not judge the claims yet. Save the pool to the claims file and show me the first five lines of it.'].join('\n');
  const rows = shortView(text).rows;
  assert.deepEqual(rows.filter(r => r.type === 'line').map(r => r.text).slice(1, 3), ['- numbers', '- named entities']);
  assert.deepEqual(rows.find(r => r.type === 'fold'), { type: 'fold', count: 4 });
  const steps = ['Do this:', '1. One', '2. Two', '3. Three', '4. Four', '5. Five', '6. Six'].join('\n');
  assert.equal(shortView(steps).rows.some(r => r.type === 'fold'), false);
});

test('a callout sits before the part its `at` names and adds nothing to the prompt lines', () => {
  const v = shortView(LOOP, [
    { at: 'For each round', say: 'The writer and the judge are separate agents.' },
    { at: 'Dispatch a separate judge', say: 'The judge sees only the briefing.' },
    { at: 'No such part', say: 'Never shown.' }
  ]);
  const at = v.rows.findIndex(r => r.type === 'callout');
  assert.equal(v.rows[at].say, 'The writer and the judge are separate agents.');
  assert.equal(v.rows[at + 1].text, 'For each round:');
  const second = v.rows.findIndex(r => r.say === 'The judge sees only the briefing.');
  assert.equal(v.rows[second + 1].text, '2. Dispatch a separate judge subagent.', 'a list item is matched without its marker');
  assert.equal(v.rows.filter(r => r.type === 'callout').length, 2);
  assert.equal(v.rows.some(r => r.type === 'line' && /separate agents\.$/.test(r.text)), false);
});

function page(body) {
  const entry = { dest: 'Claude Code', text: LOOP, callouts: [{ at: 'For each round', say: 'The writer and the judge are separate agents.' }] };
  const marked = require('marked');
  CR.configureMarked(marked.marked || marked);
  const html = (marked.marked || marked).parse(CR.renderPromptBlock(entry) + '\n\n' + CR.renderPromptBlock({ dest: 'Claude Code', text: 'What tools do you have available?' }));
  const dom = new JSDOM('<!doctype html><body ' + body + '><main><section class="module" id="m">' + html + '</section></main></body>', { runScripts: 'outside-only' });
  dom.window.eval('window.CurriculumRuntime = {};');
  return dom;
}

test('on the page: the box shows the short view, Copy still reads the whole prompt, prompts are numbered', () => {
  const dom = page('class="workbook" data-prompt-view="short" data-prompt-copy-label="Copy prompt"');
  const doc = dom.window.document;
  global.document = doc; global.window = dom.window;
  try {
    CR.decoratePrompts(doc.body);
    require(SRC).install(doc);
    const blocks = [...doc.querySelectorAll('.prompt-block')];
    assert.equal(blocks.length, 2);
    assert.ok(blocks[0].classList.contains('prompt-block--short'));
    assert.equal(blocks[1].classList.contains('prompt-block--short'), false, 'a one-line prompt stays open');
    assert.equal(blocks[0].querySelector('pre code').textContent.replace(/\s+$/, ''), LOOP, 'the full prompt is untouched');
    assert.doesNotMatch(blocks[0].querySelector('pre code').textContent, /separate agents\.\s*$/m, 'a callout is not in the copied text');
    assert.equal(blocks[0].querySelector('.prompt-callout').textContent.replace(/^↓/, ''), 'The writer and the judge are separate agents.');
    assert.match(blocks[0].querySelector('.prompt-short__foot').textContent, /^The prompt in short\. Copy takes all \d+ lines\./);
    assert.deepEqual(blocks.map(b => b.querySelector('.prompt-block__label').textContent), ['Prompt 1 of 2', 'Prompt 2 of 2']);
    assert.deepEqual(blocks.map(b => b.querySelector('.copy-btn').textContent), ['Copy prompt', 'Copy prompt']);
    blocks[0].querySelector('.prompt-short__toggle').dispatchEvent(new dom.window.MouseEvent('click', { bubbles: true }));
    assert.ok(blocks[0].classList.contains('prompt-block--full') && !blocks[0].classList.contains('prompt-block--short'), 'Show them opens the full prompt');
    blocks[0].querySelector('.prompt-short__back .prompt-short__toggle').dispatchEvent(new dom.window.MouseEvent('click', { bubbles: true }));
    assert.ok(blocks[0].classList.contains('prompt-block--short'));
  } finally { delete global.document; delete global.window; dom.window.close(); }
});

test('a page without the flag is left alone', () => {
  const dom = page('class="workbook"');
  const doc = dom.window.document;
  global.document = doc; global.window = dom.window;
  try {
    CR.decoratePrompts(doc.body);
    require(SRC).install(doc);
    assert.equal(doc.querySelector('.prompt-short'), null);
    assert.deepEqual([...doc.querySelectorAll('.prompt-block__label')].map(n => n.textContent), ['Prompt', 'Prompt']);
    assert.deepEqual([...doc.querySelectorAll('.copy-btn')].map(n => n.textContent), ['Copy', 'Copy']);
  } finally { delete global.document; delete global.window; dom.window.close(); }
});

test('the registry refuses a callout whose `at` matches no line of the prompt', () => {
  const src = fs.readFileSync(path.join(ROOT, 'scripts/compile-prompts.js'), 'utf8');
  assert.match(src, /callout 'at: \$\{c\.at\}' matches the start of no line in the prompt body/);
  const { loadRegistry } = require(path.join(ROOT, 'scripts/compile-prompts.js'));
  if (typeof loadRegistry !== 'function') return;
  const dir = fs.mkdtempSync(path.join(require('os').tmpdir(), 'prompt-callouts-'));
  try {
    fs.writeFileSync(path.join(dir, 'p.md'), '---\nkey: p\ncallouts:\n  - at: Not there\n    say: Why.\n---\nRun the loop.\n');
    assert.throws(() => loadRegistry(dir), /matches the start of no line/);
    fs.writeFileSync(path.join(dir, 'p.md'), '---\nkey: p\ncallouts:\n  - at: Run the loop\n    say: Why.\n---\nRun the loop.\n');
    assert.deepEqual(loadRegistry(dir).p.callouts, [{ at: 'Run the loop', say: 'Why.' }]);
  } finally { fs.rmSync(dir, { recursive: true, force: true }); }
});
