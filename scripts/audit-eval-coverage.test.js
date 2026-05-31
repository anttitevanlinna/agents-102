#!/usr/bin/env node
/*
 * Tests for audit-eval-coverage.js.
 *
 * Run: node --test scripts/audit-eval-coverage.test.js
 *
 * Focus: the instance-integrity scan. The auditor used to credit coverage on
 * (compendium, rule_index) PRESENCE alone — it silently swallowed rule_index
 * values that match no real rule (the corpus encodes sub-rules three ways:
 * "9b" string, 9.1 float, fabricated 91 int) and never checked the verdict was
 * one of {PASS, REVISE, N/A}. scanInstanceIntegrity turns that silent swallow
 * into visible bugs (structural, gating) + warnings (non-gating diagnostics),
 * so the malformed data is surfaced instead of inflating a green 100%.
 */

const { test } = require('node:test');
const assert = require('node:assert/strict');

const {
  parseRules,
  scanInstanceIntegrity,
} = require('./audit-eval-coverage.js');

// A tiny fake compendium set: check_pedagogy has integer rules 9 and 10 only.
const COMP = { check_pedagogy: { evalClasses: [], rules: [{ id: '9', lead: 'x' }, { id: '10', lead: 'y' }] } };

test('parseRules: integer rules parsed, leads captured', () => {
  const md = '1. **First rule.** body\n2. **Second rule.** body\n';
  const rules = parseRules(md);
  assert.deepEqual(rules.map(r => r.id), ['1', '2']);
  assert.equal(rules[0].lead, 'First rule.');
});

test('class field present + canonical → no bug', () => {
  const { bugs } = scanInstanceIntegrity('ae101--x.pedagogy.json', 'pedagogy', { class: 'pedagogy' }, COMP);
  assert.deepEqual(bugs, []);
});

test('class field omitted → missing-class-field bug (gating)', () => {
  const { bugs } = scanInstanceIntegrity('ae101--x.pedagogy.json', 'pedagogy', { rules_evaluated: [] }, COMP);
  assert.equal(bugs.length, 1);
  assert.equal(bugs[0].kind, 'missing-class-field');
});

test('class field wrong → class-field-drift bug (gating)', () => {
  const { bugs } = scanInstanceIntegrity('ae101--x.story.json', 'story', { class: 'story' }, COMP);
  // .story.json must carry class:"storytelling"
  assert.equal(bugs.length, 1);
  assert.equal(bugs[0].kind, 'class-field-drift');
});

test('resolvable rule_index → no warning', () => {
  const inst = { class: 'pedagogy', rules_evaluated: [{ compendium: 'check_pedagogy.md', rule_index: 9, verdict: 'PASS' }] };
  const { warnings } = scanInstanceIntegrity('ae101--x.pedagogy.json', 'pedagogy', inst, COMP);
  assert.deepEqual(warnings, []);
});

test('sub-lettered "9b" string → unresolvable-rule-index warning (non-gating)', () => {
  const inst = { class: 'pedagogy', rules_evaluated: [{ compendium: 'check_pedagogy.md', rule_index: '9b', verdict: 'PASS' }] };
  const { bugs, warnings } = scanInstanceIntegrity('ae101--x.pedagogy.json', 'pedagogy', inst, COMP);
  assert.deepEqual(bugs, []); // a warning, not a gating bug
  assert.equal(warnings.length, 1);
  assert.equal(warnings[0].kind, 'unresolvable-rule-index');
});

test('float 9.1 rule_index → unresolvable-rule-index warning', () => {
  const inst = { class: 'pedagogy', rules_evaluated: [{ compendium: 'check_pedagogy.md', rule_index: 9.1, verdict: 'PASS' }] };
  const { warnings } = scanInstanceIntegrity('ae101--x.pedagogy.json', 'pedagogy', inst, COMP);
  assert.equal(warnings.filter(w => w.kind === 'unresolvable-rule-index').length, 1);
});

test('non-enum verdict → non-enum-verdict warning', () => {
  const inst = { class: 'pedagogy', rules_evaluated: [{ compendium: 'check_pedagogy.md', rule_index: 9, verdict: 'PASS (this file) / UNVERIFIED (cross-file)' }] };
  const { warnings } = scanInstanceIntegrity('ae101--x.pedagogy.json', 'pedagogy', inst, COMP);
  assert.equal(warnings.filter(w => w.kind === 'non-enum-verdict').length, 1);
});

test('N/A is a valid verdict (explicit not-applicable is coverage)', () => {
  const inst = { class: 'pedagogy', rules_evaluated: [{ compendium: 'check_pedagogy.md', rule_index: 10, verdict: 'N/A' }] };
  const { warnings } = scanInstanceIntegrity('ae101--x.pedagogy.json', 'pedagogy', inst, COMP);
  assert.deepEqual(warnings, []);
});

test('behavior/cross_module shapes (no top-level rules_evaluated) → no rule warnings', () => {
  const inst = { class: 'behavior', prompts_findings: [{ prompt_index: 1 }] };
  const { warnings } = scanInstanceIntegrity('ae101--x.behavior.json', 'behavior', inst, COMP);
  assert.deepEqual(warnings, []);
});
