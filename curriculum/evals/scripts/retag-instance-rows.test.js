#!/usr/bin/env node
/*
 * Tests for retag-instance-rows.js. The load-bearing property is FORMAT
 * PRESERVATION: 289 of 635 stored instances do not round-trip through a JSON
 * dump, so every repair must be a textual edit inside one row object and leave
 * every other byte — indentation, key order, compact rows — untouched.
 *
 * Run: node --test curriculum/evals/scripts/retag-instance-rows.test.js
 */
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const { rowSpans, setRuleIndex, isJudgeOwnedShaped, applyToFile } = require('./retag-instance-rows.js');
const KNOWN = new Set(['check_writing', 'check_pedagogy', 'check_workshop']);

test('rowSpans: finds each row object, ignoring braces inside evidence prose', () => {
  const raw = '{"rules_evaluated":[{"a":1,"evidence":"a { brace } in prose"},{"b":2}]}';
  const spans = rowSpans(raw);
  assert.equal(spans.length, 2);
  assert.equal(raw.slice(...spans[0]), '{"a":1,"evidence":"a { brace } in prose"}');
  assert.equal(raw.slice(...spans[1]), '{"b":2}');
});

test('rowSpans: an escaped quote does not end the string early', () => {
  const raw = '{"rules_evaluated":[{"lead":"No \\"as-is\\" imports {x}"},{"b":2}]}';
  assert.equal(rowSpans(raw).length, 2);
});

test('setRuleIndex: preserves the surrounding spacing exactly', () => {
  assert.equal(setRuleIndex('{ "rule_index": 4, "x": 1 }', 'null, "judge_owned": true'),
    '{ "rule_index": null, "judge_owned": true, "x": 1 }');
  assert.equal(setRuleIndex('{"rule_index":"scope","x":1}', 'null,"judge_owned":true'),
    '{"rule_index":null,"judge_owned":true,"x":1}');
});

test('isJudgeOwnedShaped: only citations that can never resolve', () => {
  const y = (row) => isJudgeOwnedShaped(row, KNOWN);
  assert.equal(y({ compendium: 'check_writing.md', rule_index: 'scope' }), true, 'placeholder word');
  assert.equal(y({ compendium: 'check_writing.md', rule_index: 0 }), true, 'zero is not a rule number');
  assert.equal(y({ compendium: 'check_writing.md', rule_index: -1 }), true, 'negatives either');
  assert.equal(y({ compendium: 'check_writing.md', rule_index: null }), true, 'no index at all');
  assert.equal(y({ compendium: 'judge-owned', rule_index: 3 }), true, 'invented compendium');
  assert.equal(y({ compendium: 'check_writing.md', rule_index: 17 }), false, 'a real citation is left alone');
  assert.equal(y({ compendium: 'check_writing.md', rule_index: '9b' }), false, 'sub-lettered is a real citation');
  assert.equal(y({ compendium: null, rule: 1, name: 'x' }), false, 'the slides row schema is not a rule row');
  assert.equal(y({ compendium: 'judge-owned', rule_index: null, judge_owned: true }), false, 'already tagged');
});

test('applyToFile: retags only the judge-owned row and changes no other byte', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'retag-'));
  const p = path.join(dir, 'x.writing.json');
  const raw = [
    '{',
    '  "class": "writing",',
    '  "rules_evaluated": [',
    '    {"compendium": "check_writing.md", "rule_index": 17, "verdict": "PASS"},',
    '    {"compendium": "check_writing.md", "rule_index": "scope", "verdict": "N/A"}',
    '  ]',
    '}',
    '',
  ].join('\n');
  fs.writeFileSync(p, raw);
  const res = applyToFile(p, { judgeOwned: true, knownCompendia: KNOWN });
  assert.equal(res.changed, 1);
  const parsed = JSON.parse(res.text);
  assert.equal(parsed.rules_evaluated[0].rule_index, 17, 'the real citation is untouched');
  assert.equal(parsed.rules_evaluated[1].rule_index, null);
  assert.equal(parsed.rules_evaluated[1].judge_owned, true);
  assert.equal(parsed.rules_evaluated[1].verdict, 'N/A', 'the judgement itself survives');
  // Byte-level: only the second row's line differs.
  const before = raw.split('\n'), after = res.text.split('\n');
  assert.equal(before.length, after.length);
  const differing = before.map((l, i) => (l === after[i] ? null : i)).filter(i => i !== null);
  assert.deepEqual(differing, [4]);
});

test('applyToFile: restamps a verdict on a rule that moved compendium', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'retag-'));
  const p = path.join(dir, 'y.story.json');
  fs.writeFileSync(p, '{"rules_evaluated":[{"compendium":"check_pedagogy.md","rule_index":28,"verdict":"PASS"}]}');
  const res = applyToFile(p, { moved: { check_pedagogy: { 28: 'check_cross_module.md §2' } }, knownCompendia: KNOWN });
  const row = JSON.parse(res.text).rules_evaluated[0];
  assert.equal(row.compendium, 'check_cross_module.md');
  assert.equal(row.rule_index, 2);
});

test('applyToFile: an N/A on a moved rule is left alone (it was already correct)', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'retag-'));
  const p = path.join(dir, 'z.story.json');
  const raw = '{"rules_evaluated":[{"compendium":"check_pedagogy.md","rule_index":28,"verdict":"N/A"}]}';
  fs.writeFileSync(p, raw);
  const res = applyToFile(p, { moved: { check_pedagogy: { 28: 'check_cross_module.md §2' } }, knownCompendia: KNOWN });
  assert.equal(res.changed, 0);
  assert.equal(res.text, raw);
});

test('applyToFile: a non-enum verdict keeps its enum half, the caveat moves to fix_hint', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'retag-'));
  const p = path.join(dir, 'v.story.json');
  fs.writeFileSync(p, '{"rules_evaluated":[{"compendium":"check_pedagogy.md","rule_index":9,"verdict":"PASS (this file) / UNVERIFIED (cross-file)","fix_hint":null}]}');
  const res = applyToFile(p, { verdict: true, knownCompendia: KNOWN });
  const row = JSON.parse(res.text).rules_evaluated[0];
  assert.equal(row.verdict, 'PASS');
  assert.match(row.fix_hint, /UNVERIFIED \(cross-file\)/);
});

test('applyToFile: refuses a file whose row spans do not match its parsed rows', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'retag-'));
  const p = path.join(dir, 'w.writing.json');
  fs.writeFileSync(p, '{"rules_evaluated": []}');
  const res = applyToFile(p, { judgeOwned: true, knownCompendia: KNOWN });
  assert.equal(res.changed, 0);
});
