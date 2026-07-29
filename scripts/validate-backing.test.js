#!/usr/bin/env node
/*
 * Tests for validate-backing.js.
 *
 * Run: node --test scripts/validate-backing.test.js
 *
 * Regression focus: a source id can be cited from TWO fields — `Claims`
 * (`← id`) and `Frameworks` (`← id`). The first cut of the orphan check only
 * scanned Claims, so a source cited solely by a framework attribution — the
 * normal shape for a borrowed framework whose provenance backs no single body
 * sentence — was reported SOURCE-ORPHAN. Caught on the first real block
 * (skills-from-the-frontier, klaassen-compound-engineering). The orphan check
 * must union both fields.
 */

const { test } = require('node:test');
const assert = require('node:assert/strict');

const { auditText, parseClaim, parseSource, slugify } = require('./validate-backing.js');

const NO_LAWS = { all: new Map(), backbone: new Set() };
const AT = new Date('2026-07-29T00:00:00Z');
const audit = (text, opts = {}) =>
  auditText(text, { laws: NO_LAWS, now: AT, stanceWindow: 6, ...opts });
const codes = fs => fs.map(f => f.code);

function block(inner) {
  return `# A lecture\n\nBody prose.\n\n<!-- maintainer -->\n\n<!-- backing -->\n\n${inner}\n\n<!-- /backing -->\n`;
}

const STAMP = '`[checked:2026-07-01 result:OK due:2027-01-01]`';

test('source cited only by Frameworks is not an orphan', () => {
  const { findings } = audit(block(
    '**Claims**\n' +
    '- `a-claim` · vision · "some framing" ← none-owed\n\n' +
    '**Sources**\n' +
    `- klaassen ${STAMP} https://example.com — [practitioner direct] the four-step loop. fallback: none.\n\n` +
    '**Frameworks**\n' +
    '- Compound engineering · [borrow:practitioner-coined] · law:none · ← klaassen\n'
  ));
  assert.equal(codes(findings).includes('SOURCE-ORPHAN'), false,
    `expected no orphan, got: ${JSON.stringify(findings)}`);
});

test('source cited by nothing IS an orphan', () => {
  const { findings } = audit(block(
    '**Claims**\n' +
    '- `a-claim` · vision · "some framing" ← none-owed\n\n' +
    '**Sources**\n' +
    `- lonely ${STAMP} https://example.com — [practitioner direct] backs nothing. fallback: none.\n`
  ));
  assert.deepEqual(codes(findings).filter(c => c === 'SOURCE-ORPHAN'), ['SOURCE-ORPHAN']);
});

test('detail claim with no backing → DETAIL-UNBACKED', () => {
  const { findings } = audit(block(
    '**Claims**\n- `n` · detail · "267 skills" ← \n'
  ));
  assert.ok(codes(findings).includes('DETAIL-UNBACKED') || codes(findings).includes('CLAIM-MALFORMED'));
});

test('detail claim marked [SOURCE NEEDED] is not DETAIL-UNBACKED', () => {
  const { findings } = audit(block(
    '**Claims**\n- `n` · detail · "most-cited paper" ← [SOURCE NEEDED]\n'
  ));
  assert.equal(codes(findings).includes('DETAIL-UNBACKED'), false);
});

test('claim citing an undefined source → SOURCE-UNDEFINED', () => {
  const { findings } = audit(block(
    '**Claims**\n- `n` · detail · "a number" ← ghost\n\n**Sources**\n'
  ));
  assert.ok(codes(findings).includes('SOURCE-UNDEFINED'));
});

test('vision claim carrying sources → VISION-BACKED warn', () => {
  const { findings } = audit(block(
    '**Claims**\n- `n` · vision · "framing" ← real\n\n' +
    `**Sources**\n- real ${STAMP} https://example.com — [practitioner direct] x. fallback: none.\n`
  ));
  const v = findings.find(f => f.code === 'VISION-BACKED');
  assert.ok(v && v.sev === 'WARN');
});

test('unknown layer → CLAIM-MALFORMED', () => {
  const { findings } = audit(block('**Claims**\n- `n` · guess · "x" ← none-owed\n'));
  assert.ok(codes(findings).includes('CLAIM-MALFORMED'));
});

test('unclosed region → REGION-UNCLOSED', () => {
  const { findings } = audit('# L\n\n<!-- maintainer -->\n\n<!-- backing -->\n\n**Claims**\n');
  assert.deepEqual(codes(findings), ['REGION-UNCLOSED']);
});

test('legacy provenance block alongside a backing block → LEGACY-DOUBLE', () => {
  const text = block('**Claims**\n- `n` · vision · "x" ← none-owed\n')
    + '\n**Frameworks riffed on:**\n- STRIDE\n';
  assert.ok(codes(audit(text).findings).includes('LEGACY-DOUBLE'));
});

test('file with no block but with stamps → NO-BLOCK info', () => {
  const { findings } = audit(`# L\n\n<!-- maintainer -->\n\n- x ${STAMP} https://e.com — [x] y.\n`);
  assert.deepEqual(codes(findings), ['NO-BLOCK']);
});

test('file with no block and no citations → silent', () => {
  assert.deepEqual(audit('# L\n\nJust prose.\n').findings, []);
});

test('stance older than the window → STANCE-STALE', () => {
  const fresh = audit(block('**Stance** `[stance:2026-07-01 level:L2]`\n- holds: x\n'));
  assert.equal(codes(fresh.findings).includes('STANCE-STALE'), false);
  const old = audit(block('**Stance** `[stance:2025-01-01 level:L2]`\n- holds: x\n'));
  assert.ok(codes(old.findings).includes('STANCE-STALE'));
});

test('law: key resolves against banked laws, else WARN', () => {
  const laws = { all: new Map([['the-compound-ladder', 'The compound ladder']]), backbone: new Set() };
  const good = audit(block('**Frameworks**\n- CE · [borrow:x] · law:the-compound-ladder · ← cultural-vocab\n'), { laws });
  assert.equal(codes(good.findings).includes('LAW-UNRESOLVED'), false);
  const bad = audit(block('**Frameworks**\n- CE · [borrow:x] · law:invented-law · ← cultural-vocab\n'), { laws });
  assert.ok(codes(bad.findings).includes('LAW-UNRESOLVED'));
});

test('law:none is never reported unresolved', () => {
  const laws = { all: new Map([['x', 'X']]), backbone: new Set() };
  const { findings } = audit(block('**Frameworks**\n- CE · [borrow:x] · law:none · ← cultural-vocab\n'), { laws });
  assert.equal(codes(findings).includes('LAW-UNRESOLVED'), false);
});

test('parseClaim: shapes', () => {
  const c = parseClaim('- `my-id` · detail · "the anchor phrase" ← a, b');
  assert.equal(c.id, 'my-id');
  assert.equal(c.layer, 'detail');
  assert.deepEqual(c.refs, ['a', 'b']);
  assert.equal(parseClaim('- `x` · vision · "y" ← none-owed').none, true);
  assert.equal(parseClaim('- `x` · detail · "y" ← [SOURCE NEEDED]').needed, true);
  assert.equal(parseClaim('not a claim line'), null);
});

test('parseSource: id required before the stamp', () => {
  assert.equal(parseSource(`- my-source ${STAMP} https://e.com — [x] y.`), 'my-source');
  assert.equal(parseSource(`- ${STAMP} https://e.com — [x] y.`), null);
});

test('slugify strips punctuation and case', () => {
  assert.equal(slugify('The compound ladder:'), 'the-compound-ladder');
  assert.equal(slugify('Principal–agent:'), 'principal-agent');
});
