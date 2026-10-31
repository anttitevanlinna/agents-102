'use strict';
const test = require('node:test');
const assert = require('node:assert');
const { sentenceId, splitSentences, parseFile, exactDupes, nearDupes, findQuote, buildLedger } = require('./sentence-ledger.js');
const { brokenLocks } = require('./check-locked-sentences.js');

test('same words, different emphasis and quotes → same id', () => {
  assert.strictEqual(sentenceId('The *agent* reads “it”.'), sentenceId('the agent  reads "it".'));
  assert.notStrictEqual(sentenceId('The agent reads it.'), sentenceId('The agent reads them.'));
});

test('splits sentences, keeps e.g. and closing quotes together', () => {
  assert.deepStrictEqual(splitSentences('One idea, e.g. this one. Two? "Three!" Four.'),
    ['One idea, e.g. this one.', 'Two?', '"Three!"', 'Four.']);
});

test('parseFile: slide ids, headings, and what is not student prose', () => {
  const md = [
    '# Lecture', '', 'Lede sentence here.',
    '## First slide', '<!--slide:first-->', 'Body one. Body two.',
    '- A bullet line.',
    '```', 'Fenced prompt text.', '```',
    '{{prompt:x}}', '[Lecture: L](lectures/l.md)', '| a | b |',
    '## Second slide', 'Plain body.',
    '<!-- maintainer -->', 'Maintainer note.',
  ].join('\n');
  const rows = parseFile(md, 'lectures/x.md', null);
  const prose = rows.filter(r => r.kind !== 'heading');
  assert.deepStrictEqual(prose.map(r => [r.slide, r.text, r.kind]), [
    [null, 'Lede sentence here.', 'prose'],
    ['first', 'Body one.', 'prose'],
    ['first', 'Body two.', 'prose'],
    ['first', 'A bullet line.', 'bullet'],
    ['second-slide', 'Plain body.', 'prose'],
  ]);
});

test('slide file keeps its own id under its ## heading', () => {
  const rows = parseFile('## Title here\n<!--slide:own-->\n\nOne sentence. Another one.\n', 'slides/own.md', 'own');
  assert.ok(rows.every(r => r.slide === 'own'));
});

const R = (file, text, slide = null) => ({ ...parseFile(text, file, slide)[0], file });

test('exact dupes need two different files', () => {
  const rows = [R('a.md', 'This sentence is shared across two files.'), R('b.md', 'This sentence is shared across two files.'),
    R('a.md', 'Only once in this file here.'), R('a.md', 'Only once in this file here.')];
  const d = exactDupes(rows);
  assert.strictEqual(d.length, 1);
  assert.deepStrictEqual(d[0].map(r => r.file), ['a.md', 'b.md']);
});

test('near dupes catch a one-word drift between copies', () => {
  const rows = [R('a.md', 'Take a handful of real cases and judge them yourselves first.'),
    R('b.md', 'Take a handful of real cases and judge them yourself first.')];
  assert.strictEqual(nearDupes(rows, 0.7).length, 1);
});

test('findQuote: exact, fuzzy inside a slide, none', () => {
  const rows = [R('s.md', 'More context makes a good answer likelier.', 'x'), R('s.md', 'Less access makes a bad answer smaller.', 'x')];
  assert.strictEqual(findQuote(rows, 'more context makes a *good* answer likelier.').match, 'exact');
  const f = findQuote(rows, 'Less access makes the bad answer smaller', 'x');
  assert.strictEqual(f.match, 'fuzzy');
  assert.strictEqual(f.rows[0].text, 'Less access makes a bad answer smaller.');
  assert.strictEqual(findQuote(rows, 'Something else entirely unrelated').match, 'none');
});

test('a changed locked sentence is reported with its nearest replacement', () => {
  const rows = [R('s.md', 'Less access makes a small bad answer.', 'x')];
  const locks = [{ id: sentenceId('Less access makes a bad answer smaller.'), text: 'Less access makes a bad answer smaller.', slide: 'x', file: 's.md' },
    { id: rows[0].id, text: rows[0].text, slide: 'x', file: 's.md' }];
  const broken = brokenLocks(locks, () => ({ rows }));
  assert.strictEqual(broken.length, 1);
  assert.strictEqual(broken[0].nearest.text, 'Less access makes a small bad answer.');
});

test('agents-101 ledger builds and indexes shared slide files once', () => {
  const L = buildLedger('agents-101');
  assert.ok(L.rows.length > 1000);
  const slideRows = L.rows.filter(r => r.file.startsWith('slides/'));
  assert.ok(slideRows.length > 0 && slideRows.every(r => Array.isArray(r.usedBy) && r.slide));
});
