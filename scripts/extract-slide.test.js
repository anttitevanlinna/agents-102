#!/usr/bin/env node
'use strict';
// extract-slide.js cuts one ## slide out of a lecture into curriculum/slides/<id>.md
// and leaves `[Title](slides/<id>.md)` in its place. The lecture must read
// byte-for-byte as before once inlined; the slide's backing and keyed notes go
// with it, copied where home still needs them.
//
// Run: node --test scripts/extract-slide.test.js
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const CR = require('../site/layouts/curriculum.js');
const { readCurriculumMd } = require('./read-curriculum.js');

const BODY = `# Lecture
<!--slide:cover-->

The lede.

## Alpha slide
<!--slide:alpha-->

Alpha says the sky is blue today.

## Beta slide
<!--slide:beta-->
<!--tier:2-->

Beta says the grass is green.
`;
const TAIL = `
<!-- maintainer -->

**Quality:** compendium-audited 2026-08-25 (writing@aaaaaaa)

**Guard** \`alpha\`: do not soften *blue*.

**Pair note** (\`alpha\`, \`beta\`): read them together.

**Place in the training:** M1 opener.

<!-- backing -->

Format → \`curriculum/backing-format.md\`.

**Claims**
- \`sky-blue\` · detail · "the sky is blue today" ← src-one
- \`grass-green\` · detail · "the grass is green" ← src-one, src-two

**Sources**
- src-one \`[checked:2026-07-02 result:OK due:none]\` https://example.com/one — [practitioner direct] One.
- src-two \`[checked:2026-07-02 result:OK due:none]\` https://example.com/two — [practitioner direct] Two.

**Frameworks**
- Colour theory · [borrow:practitioner-coined] · law:none · ← src-two

**Stance** \`[stance:2026-07-29 level:L3]\` (\`alpha\`)
- holds: skies are blue.
- would-move-it: a grey sky.

<!-- /backing -->
`;

function tree() {
  const d = fs.mkdtempSync(path.join(os.tmpdir(), 'extract-'));
  fs.mkdirSync(path.join(d, 'curriculum', 'lectures'), { recursive: true });
  fs.writeFileSync(path.join(d, 'curriculum', 'lectures', 'lec.md'), BODY + TAIL);
  return d;
}
const run = (d, ...args) => execFileSync('node', [path.join(__dirname, 'extract-slide.js'), '--curriculum', path.join(d, 'curriculum'), ...args], { encoding: 'utf8', stdio: 'pipe' });
const read = (d, rel) => fs.readFileSync(path.join(d, 'curriculum', rel), 'utf8');

test('the cut lecture reads byte-for-byte as before', () => {
  const d = tree();
  run(d, 'lectures/lec.md#alpha');
  const lec = read(d, 'lectures/lec.md');
  assert.match(lec, /^\[Alpha slide\]\(slides\/alpha\.md\)$/m);
  assert.doesNotMatch(lec, /Alpha says/);
  assert.equal(CR.stripMaintainerTail(readCurriculumMd(path.join(d, 'curriculum', 'lectures', 'lec.md'))), CR.stripMaintainerTail(BODY + TAIL));
  assert.equal(CR.slideFileProblem('alpha', read(d, 'slides/alpha.md')), null);
})

test('backing travels: claim moves, a source home still cites is copied, a stance keyed only here moves', () => {
  const d = tree();
  run(d, 'lectures/lec.md#alpha');
  const slide = read(d, 'slides/alpha.md'), lec = read(d, 'lectures/lec.md');
  assert.match(slide, /`sky-blue` · detail/);
  assert.doesNotMatch(lec, /`sky-blue`/);
  assert.match(slide, /^- src-one /m);
  assert.match(lec, /^- src-one /m, 'grass-green still cites src-one at home');
  assert.match(slide, /\*\*Stance\*\* `\[stance:2026-07-29 level:L3\]` \(`alpha`\)\n- holds: skies are blue\.\n- would-move-it: a grey sky\./);
  assert.doesNotMatch(lec, /\*\*Stance\*\*/);
  assert.doesNotMatch(slide, /Colour theory/, 'frameworks are about the file and stay home');
  assert.match(lec, /Colour theory/);
  assert.doesNotMatch(lec, /\n\n\n/, 'no blank-line pile where the stance was');
})

test('notes travel: keyed only here moves, keyed to several is copied, unkeyed stays', () => {
  const d = tree();
  run(d, 'lectures/lec.md#alpha');
  const slide = read(d, 'slides/alpha.md'), lec = read(d, 'lectures/lec.md');
  assert.match(slide, /\*\*Guard\*\* `alpha`/);
  assert.doesNotMatch(lec, /\*\*Guard\*\*/);
  assert.match(slide, /\*\*Pair note\*\*/);
  assert.match(lec, /\*\*Pair note\*\*/);
  assert.doesNotMatch(slide, /Place in the training|Quality:/);
  assert.match(lec, /\*\*Quality:\*\*/);
})

test('cutting the second slide moves the source nothing at home cites any more; one framework still cites src-two', () => {
  const d = tree();
  run(d, 'lectures/lec.md#alpha');
  run(d, 'lectures/lec.md#beta');
  const slide = read(d, 'slides/beta.md'), lec = read(d, 'lectures/lec.md');
  assert.match(slide, /`grass-green`/);
  assert.match(slide, /^- src-one /m);
  assert.doesNotMatch(lec, /^- src-one /m);
  assert.match(slide, /^- src-two /m);
  assert.match(lec, /^- src-two /m, 'Colour theory still cites src-two');
  assert.match(slide, /^<!--tier:2-->$/m, 'tier marker travels with the slide');
  assert.equal(CR.stripMaintainerTail(readCurriculumMd(path.join(d, 'curriculum', 'lectures', 'lec.md'))), CR.stripMaintainerTail(BODY + TAIL));
})

test('refusals: the cover, an unknown id, an id already a slide file — and nothing is written', () => {
  const d = tree();
  for (const [arg, why] of [['lectures/lec.md#cover', /cover/], ['lectures/lec.md#nope', /no <!--slide:nope-->/]]) {
    assert.throws(() => run(d, arg), e => why.test(e.stderr));
  }
  fs.mkdirSync(path.join(d, 'curriculum', 'slides'));
  fs.writeFileSync(path.join(d, 'curriculum', 'slides', 'alpha.md'), '## Other\n<!--slide:alpha-->\n\nx\n');
  assert.throws(() => run(d, 'lectures/lec.md#alpha'), e => /slides\/alpha\.md already exists/.test(e.stderr));
  assert.equal(read(d, 'lectures/lec.md'), BODY + TAIL);
})

test('--dry-run reports and writes nothing', () => {
  const d = tree();
  const out = run(d, '--dry-run', 'lectures/lec.md#alpha');
  assert.match(out, /alpha/);
  assert.equal(read(d, 'lectures/lec.md'), BODY + TAIL);
  assert.ok(!fs.existsSync(path.join(d, 'curriculum', 'slides', 'alpha.md')));
})
