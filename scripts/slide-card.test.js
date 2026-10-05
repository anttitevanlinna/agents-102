#!/usr/bin/env node
/*
 * slide-card.js — what one slide carries when another training borrows it.
 * Claims are located by their anchor (no slide field in the backing block);
 * maintainer notes travel when they name the slide id in backticks.
 */

const { test } = require('node:test');
const assert = require('node:assert/strict');
const { slideCard, straddlers } = require('./slide-card.js');

const SRC = [
  '# A lecture',
  '<!--slide:cover-->',
  '',
  'Lede.',
  '',
  '## Mirror',
  '<!--tier:2-->',
  '<!--slide:mirror-->',
  '',
  'Agreeable answers won the second round. The field calls it **sycophancy**.',
  '',
  'It mirrors because mirroring was rewarded.',
  '',
  '## Chain',
  '<!--slide:chain-->',
  '',
  'Errors stack until a check resets them.',
  '',
  '<!-- maintainer -->',
  '',
  '**Mirror slide** (`mirror`): do not soften *rewarded*.',
  '',
  '**Placement:** last lecture of M1.',
  '',
  '**Constraints:**',
  '- `chain` names no artifact.',
  '- `mirror` and `chain` keep bold to coined terms.',
  '',
  '<!-- backing -->',
  '',
  '**Claims**',
  '- `syco` · detail · "Agreeable answers won … **sycophancy**" ← paper-2023',
  '- `mirrors` · vision · "It mirrors because mirroring was rewarded" ← none-owed',
  '- `straddle` · vision · "mirroring was rewarded … Errors stack" ← none-owed',
  '- `chain` · vision · "Errors stack until a check resets them" ← none-owed',
  '',
  '**Sources**',
  '- paper-2023 `[checked:2026-07-02 result:OK due:none]` https://example.org — [academic/research] the paper.',
  '',
  '**Stance** `[stance:2026-07-29 level:L3]`',
  '- holds: it is real.',
  '- would-move-it: a replication showing it is gone.',
  '',
  '<!-- /backing -->',
  '',
].join('\n');

test('claims are carried by the slide their anchor sits in (ellipsis anchors included)', () => {
  const c = slideCard(SRC, 'mirror');
  assert.deepEqual(c.claims.map(x => x.id), ['syco', 'mirrors']);
  assert.equal(c.claims[0].sources[0].id, 'paper-2023');
  assert.match(c.claims[0].sources[0].stamp, /due:none/);
});

test('tier and heading come from the slide', () => {
  const c = slideCard(SRC, 'mirror');
  assert.equal(c.heading, 'Mirror');
  assert.equal(c.tier, '2');
});

test('notes travel only when they name the id in backticks; file-level notes stay home', () => {
  const notes = slideCard(SRC, 'mirror').notes.join('\n');
  assert.match(notes, /do not soften/);
  assert.match(notes, /keep bold to coined terms/);
  assert.doesNotMatch(notes, /Placement/);
  assert.doesNotMatch(notes, /names no artifact/);
});

test('stance travels with a slide that carries a detail or borrowed claim, not with a vision-only slide', () => {
  assert.match(slideCard(SRC, 'mirror').stance.header, /level:L3/);
  assert.match(slideCard(SRC, 'mirror').stance.wouldMoveIt, /replication/);
  assert.equal(slideCard(SRC, 'chain').stance, null);
});

test('a claim whose anchor spans two slides is reported as a straddler, carried by neither', () => {
  assert.deepEqual(straddlers(SRC), ['straddle']);
  assert.ok(!slideCard(SRC, 'mirror').claims.some(c => c.id === 'straddle'));
});

test('an unknown id throws', () => {
  assert.throws(() => slideCard(SRC, 'nope'), /nope/);
});

test('a Stance header naming slide ids travels only to those slides', () => {
  const src = SRC
    .replace('**Stance** `[stance:2026-07-29 level:L3]`', '**Stance** `[stance:2026-07-29 level:L3]` (`chain`)')
    .replace('"Errors stack until a check resets them" ← none-owed', '"Errors stack until a check resets them" ← paper-2023');
  assert.equal(slideCard(src, 'mirror').stance, null, 'mirror carries a detail claim but the stance is keyed elsewhere');
  assert.match(slideCard(src, 'chain').stance.header, /level:L3/);
});
