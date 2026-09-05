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
const fs = require('node:fs');
const path = require('node:path');

const {
  parseRules,
  parseMovedRules,
  parseSubRuleLeads,
  verdictedKeys,
  scanInstanceIntegrity,
  naRuleSet,
  splitMissing,
  SURFACES,
  surfacesFor,
} = require('./audit-eval-coverage.js');

const ROOT = path.resolve(__dirname, '..');

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
  const { bugs } = scanInstanceIntegrity('ae101--x.writing.json', 'writing', { class: 'pedagogy' }, COMP);
  assert.equal(bugs.length, 1);
  assert.equal(bugs[0].kind, 'class-field-drift');
});

// The field matches the filename suffix on every class, story included. Every
// tool globs `.<class>.json`, so the suffix is what the field has to agree with
// — `check-instance-schema.js` says so in code (`patch.class = fileClass`) and
// the sweep's judge prompt says so in prose. This auditor used to expect
// `storytelling` on the strength of a `story.md:101` citation that no longer
// says it, which made the two gates contradict: schema `--fix` wrote the value
// this one then called a structural bug, and the coverage gate could not be
// passed by any instance at all.
test('.story.json carrying class:"story" is canonical, not drift', () => {
  const { bugs } = scanInstanceIntegrity('ae101--x.story.json', 'story', { class: 'story' }, COMP);
  assert.deepEqual(bugs, []);
});

test('.story.json carrying the legacy class:"storytelling" is the drift', () => {
  const { bugs } = scanInstanceIntegrity('ae101--x.story.json', 'story', { class: 'storytelling' }, COMP);
  assert.equal(bugs.length, 1);
  assert.equal(bugs[0].kind, 'class-field-drift');
  assert.equal(bugs[0].expected, 'story');
});

test('resolvable rule_index → no warning', () => {
  const inst = { class: 'pedagogy', rules_evaluated: [{ compendium: 'check_pedagogy.md', rule_index: 9, verdict: 'PASS' }] };
  const { warnings } = scanInstanceIntegrity('ae101--x.pedagogy.json', 'pedagogy', inst, COMP);
  assert.deepEqual(warnings, []);
});

// ── Citation-shape normalisation: the corpus cites rules the way the compendiums
// write them, and the auditor used to call three faithful shapes malformed.
// (a) sub-lettered "9b" IS a real compendium rule (check_pedagogy §9b); parseRules
// collapses it onto integer parent 9, so the instance side must collapse too or
// 1,558 accurate citations read as junk. (b) a compendium name without the .md
// suffix (400 citations) is the same compendium. (c) check_prompts / check_slides
// / check_workshop / check_sales_copy are real compendiums that this audit does
// not REPORT on — not invented homes (2,826 citations). What survives is the
// signal the detector was built for: invented homes, and rules that moved house.

test('sub-lettered "9b" → collapses onto integer parent 9, no warning', () => {
  const inst = { class: 'pedagogy', rules_evaluated: [{ compendium: 'check_pedagogy.md', rule_index: '9b', verdict: 'PASS' }] };
  const { bugs, warnings } = scanInstanceIntegrity('ae101--x.pedagogy.json', 'pedagogy', inst, COMP);
  assert.deepEqual(bugs, []);
  assert.deepEqual(warnings, []);
});

test('sub-lettered index whose integer parent does not exist → still unresolvable', () => {
  const inst = { class: 'pedagogy', rules_evaluated: [{ compendium: 'check_pedagogy.md', rule_index: '77b', verdict: 'PASS' }] };
  const { warnings } = scanInstanceIntegrity('ae101--x.pedagogy.json', 'pedagogy', inst, COMP);
  assert.equal(warnings.filter(w => w.kind === 'unresolvable-rule-index').length, 1);
});

test('sub-letter collapse does NOT feed the cram detector (9 and 9b are distinct judgments)', () => {
  const inst = { class: 'pedagogy', rules_evaluated: [
    { compendium: 'check_pedagogy.md', rule_index: 9, verdict: 'PASS' },
    { compendium: 'check_pedagogy.md', rule_index: '9b', verdict: 'PASS' },
  ] };
  const { warnings } = scanInstanceIntegrity('ae101--x.pedagogy.json', 'pedagogy', inst, COMP);
  assert.equal(warnings.filter(w => w.kind === 'duplicate-rule-index').length, 0);
});

test('reported-but-unaudited compendium (check_prompts) → known namespace, not unknown-compendium', () => {
  const inst = { class: 'pedagogy', rules_evaluated: [
    { compendium: 'check_prompts.md', rule_index: 26, verdict: 'PASS' },
    { compendium: 'check_slides.md', rule_index: 3, verdict: 'PASS' },
    { compendium: 'check_workshop.md', rule_index: 2, verdict: 'PASS' },
    { compendium: 'check_sales_copy.md', rule_index: 1, verdict: 'PASS' },
  ] };
  const { warnings } = scanInstanceIntegrity('ae101--x.pedagogy.json', 'pedagogy', inst, COMP);
  assert.equal(warnings.filter(w => w.kind === 'unknown-compendium').length, 0);
});

// A moved stub is the ONE place where N/A and PASS mean opposite things. The
// judge templates tell judges to count rules "minus moved-stubs"; 189 rows in
// the corpus say `N/A — moved stub; owned by check_cross_module.md`, which is
// the contract working, not rot. The 12 that say PASS/REVISE are the rot: a
// verdict stamped on a rule that lives in another compendium credits nothing
// here, and the cross_module rule it should have carried reads as a hole.
const MOVED_COMP = { check_pedagogy: { evalClasses: [], rules: [{ id: '9', lead: 'x' }], moved: { '5': 'check_cross_module.md §1' } } };

test('moved rule declined as N/A → no warning (the judge looked and correctly declined)', () => {
  const inst = { class: 'pedagogy', rules_evaluated: [{ compendium: 'check_pedagogy.md', rule_index: 5, verdict: 'N/A' }] };
  const { bugs, warnings } = scanInstanceIntegrity('ae101--x.pedagogy.json', 'pedagogy', inst, MOVED_COMP);
  assert.deepEqual(bugs, []);
  assert.deepEqual(warnings, []);
});

test('moved rule stamped PASS → moved-rule-citation naming the new home', () => {
  const inst = { class: 'pedagogy', rules_evaluated: [{ compendium: 'check_pedagogy.md', rule_index: 5, verdict: 'PASS' }] };
  const { bugs, warnings } = scanInstanceIntegrity('ae101--x.pedagogy.json', 'pedagogy', inst, MOVED_COMP);
  assert.deepEqual(bugs, []);
  const moved = warnings.filter(w => w.kind === 'moved-rule-citation');
  assert.equal(moved.length, 1);
  assert.equal(moved[0].movedTo, 'check_cross_module.md §1');
});

test('moved rule stamped REVISE → moved-rule-citation too (any verdict but N/A)', () => {
  const inst = { class: 'pedagogy', rules_evaluated: [{ compendium: 'check_pedagogy.md', rule_index: 5, verdict: 'REVISE' }] };
  const { warnings } = scanInstanceIntegrity('ae101--x.pedagogy.json', 'pedagogy', inst, MOVED_COMP);
  assert.equal(warnings.filter(w => w.kind === 'moved-rule-citation').length, 1);
});

test('parseRules: "Moved to" tombstones are not rules, and are recorded as redirects', () => {
  const md = '5. *Moved to check_cross_module.md §1.*\n9. **Real rule.** body\n';
  const rules = parseRules(md);
  assert.deepEqual(rules.map(r => r.id), ['9']);
  assert.equal(parseMovedRules(md)['5'], 'check_cross_module.md §1');
});

test('verdictedKeys: sub-letter and missing .md suffix both credit the parent rule', () => {
  const keys = verdictedKeys([
    { class: 'pedagogy', rules_evaluated: [
      { compendium: 'check_pedagogy', rule_index: 10, verdict: 'PASS' },
      { compendium: 'check_pedagogy.md', rule_index: '9b', verdict: 'PASS' },
    ] },
  ]);
  assert.ok(keys.has('check_pedagogy.md::10'), 'missing .md suffix must still credit rule 10');
  assert.ok(keys.has('check_pedagogy.md::9'), 'sub-lettered 9b must credit parent rule 9');
});

// ── Index drift: the lead is the reliable key, the index is not ──
// Judges quote the rule's bolded lead VERBATIM (writing.md tells them to) and
// then attach a number that has drifted from the renumbered compendium. Every
// such row is a real verdict credited to nothing, while the rule it actually
// judged reads as an uncovered hole. And the offsets are per-judge, not global
// — one instance maps 16→17, another maps 16→12 — so nothing but the lead can
// recover them. No compendium lead is a prefix of another, so the match is
// unambiguous; the parenthetical some judges append is tolerated.
const DRIFT_COMP = { check_writing: { evalClasses: [], rules: [
  { id: '9', lead: 'x' },
  { id: '17', lead: 'No combative verbs about the agent in body prose.' },
] } };

test('drifted index whose lead matches a real rule → rule-index-drift naming the right rule', () => {
  const inst = { class: 'writing', rules_evaluated: [
    { compendium: 'check_writing.md', rule_index: 54, rule_lead: 'No combative verbs about the agent in body prose', verdict: 'PASS' },
  ] };
  const { bugs, warnings } = scanInstanceIntegrity('x.writing.json', 'writing', inst, DRIFT_COMP);
  assert.deepEqual(bugs, []);
  assert.equal(warnings.length, 1);
  assert.equal(warnings[0].kind, 'rule-index-drift');
  assert.equal(warnings[0].should_be, '17');
});

test('drift tolerates a parenthetical the judge appended to the lead', () => {
  const inst = { class: 'writing', rules_evaluated: [
    { compendium: 'check_writing.md', rule_index: 16, rule_lead: 'No combative verbs about the agent in body prose (applies to exercises).', verdict: 'PASS' },
  ] };
  const { warnings } = scanInstanceIntegrity('x.writing.json', 'writing', inst, DRIFT_COMP);
  assert.equal(warnings.filter(w => w.kind === 'rule-index-drift').length, 1);
});

// The dangerous half of drift: the wrong number is itself a VALID rule, so the
// row resolves and nothing warns. 71 rows in the corpus, in runs of consecutive
// off-by-one -- a whole instance's table shifted, every verdict attributed to
// its neighbour. The lead is the rule's identity; when the two disagree, the
// lead wins and the disagreement is reported.
test('index resolves but the lead names a DIFFERENT rule → rule-index-drift', () => {
  const comp = { check_writing: { evalClasses: [], rules: [
    { id: '13', lead: 'Something entirely different.' },
    { id: '17', lead: 'No combative verbs about the agent in body prose.' },
  ] } };
  const inst = { class: 'writing', rules_evaluated: [
    { compendium: 'check_writing.md', rule_index: 13, rule_lead: 'No combative verbs about the agent in body prose.', verdict: 'PASS' },
  ] };
  const { warnings } = scanInstanceIntegrity('x.writing.json', 'writing', inst, comp);
  const d = warnings.filter(w => w.kind === 'rule-index-drift');
  assert.equal(d.length, 1);
  assert.equal(d[0].should_be, '17');
});

test('a PARAPHRASED lead is not drift — it matches no rule, so the index stands', () => {
  const comp = { check_writing: { evalClasses: [], rules: [
    { id: '13', lead: 'Banned words — grep zero-tolerance.' },
    { id: '17', lead: 'No combative verbs about the agent in body prose.' },
  ] } };
  const inst = { class: 'writing', rules_evaluated: [
    { compendium: 'check_writing.md', rule_index: 13, rule_lead: 'Banned word check (grep)', verdict: 'PASS' },
  ] };
  const { warnings } = scanInstanceIntegrity('x.writing.json', 'writing', inst, comp);
  assert.deepEqual(warnings, []);
  const keys = verdictedKeys([inst], comp);
  assert.ok(keys.has('check_writing.md::13'), 'a paraphrase must not move the credit');
});

test('drift onto a SUB-lettered rule resolves to its integer parent', () => {
  // parseRules collapses 21b onto 21 and keeps 21's lead, so a row quoting 21b's
  // lead finds nothing in `rules`. parseSubRuleLeads keeps the dropped leads,
  // mapped to the parent the coverage model actually credits.
  const comp = { check_student_facing: { evalClasses: [], rules: [{ id: '21', lead: 'Something else entirely.' }],
    subLeads: [{ id: '21', lead: 'Session / task / run split (all trainings).' }] } };
  // 21.5 and 21b are the same rule said two ways, and both land on parent 21 —
  // so this is a citation that resolves, not a drift. The drift path is exercised
  // by an index that names no rule at all.
  const ok = { class: 'writing', rules_evaluated: [
    { compendium: 'check_student_facing.md', rule_index: 21.5, rule_lead: 'Session / task / run split (all trainings).', verdict: 'PASS' },
  ] };
  assert.deepEqual(scanInstanceIntegrity('x.writing.json', 'writing', ok, comp).warnings, []);
  assert.ok(verdictedKeys([ok], comp).has('check_student_facing.md::21'));

  const drifted = { class: 'writing', rules_evaluated: [
    { compendium: 'check_student_facing.md', rule_index: 'pre-3', rule_lead: 'Session / task / run split (all trainings).', verdict: 'PASS' },
  ] };
  const d = scanInstanceIntegrity('x.writing.json', 'writing', drifted, comp).warnings.filter(w => w.kind === 'rule-index-drift');
  assert.equal(d.length, 1);
  assert.equal(d[0].should_be, '21');
});

test('parseSubRuleLeads: sub-lettered leads recorded against their integer parent', () => {
  const md = '21. **Parent rule.** body\n21b. **Session / task / run split.** body\n';
  assert.deepEqual(parseSubRuleLeads(md), [{ id: '21', lead: 'Session / task / run split.' }]);
});

test('unresolvable index with a lead matching nothing → stays unresolvable-rule-index', () => {
  const inst = { class: 'writing', rules_evaluated: [
    { compendium: 'check_writing.md', rule_index: 54, rule_lead: 'Not em-dashes again — a different surface', verdict: 'PASS' },
  ] };
  const { warnings } = scanInstanceIntegrity('x.writing.json', 'writing', inst, DRIFT_COMP);
  assert.equal(warnings.filter(w => w.kind === 'unresolvable-rule-index').length, 1);
  assert.equal(warnings.filter(w => w.kind === 'rule-index-drift').length, 0);
});

test('verdictedKeys: a drifted row credits the rule its lead names, not the number it typed', () => {
  const keys = verdictedKeys([
    { class: 'writing', rules_evaluated: [
      { compendium: 'check_writing.md', rule_index: 54, rule_lead: 'No combative verbs about the agent in body prose', verdict: 'PASS' },
    ] },
  ], DRIFT_COMP);
  assert.ok(keys.has('check_writing.md::17'), 'the judged rule must be credited');
  assert.ok(!keys.has('check_writing.md::54'), 'the typed number is not a rule');
});

test('verdictedKeys without a compendium set → unchanged behaviour, keys off the typed index', () => {
  const keys = verdictedKeys([
    { class: 'writing', rules_evaluated: [{ compendium: 'check_writing.md', rule_index: 9, verdict: 'PASS' }] },
  ]);
  assert.ok(keys.has('check_writing.md::9'));
});

test('float 9.1 rule_index → the fourth sub-rule convention, collapses onto parent 9', () => {
  // check_writing rows carry 6.2/6.3/6.4/6.5 the way others carry 9b: a sub-point
  // of rule 6. Same collapse, same reason — the coverage model credits the parent.
  const inst = { class: 'pedagogy', rules_evaluated: [{ compendium: 'check_pedagogy.md', rule_index: 9.1, verdict: 'PASS' }] };
  const { warnings } = scanInstanceIntegrity('ae101--x.pedagogy.json', 'pedagogy', inst, COMP);
  assert.deepEqual(warnings, []);
  assert.ok(verdictedKeys([inst], COMP).has('check_pedagogy.md::9'));
});

test('a float whose integer parent does not exist is still unresolvable', () => {
  const inst = { class: 'pedagogy', rules_evaluated: [{ compendium: 'check_pedagogy.md', rule_index: 88.2, verdict: 'PASS' }] };
  const { warnings } = scanInstanceIntegrity('ae101--x.pedagogy.json', 'pedagogy', inst, COMP);
  assert.equal(warnings.filter(w => w.kind === 'unresolvable-rule-index').length, 1);
});

// ── Judgments with no numbered rule home ──
// Judges keep emitting them: "Big Idea match", "Trigger — is this file
// workshop-shaped?", a scope call that a whole compendium does not apply. The
// templates say route these to `notes`, and the judges keep not doing it,
// because the judgement is real and `notes` is prose. The home is a row that
// declares itself: `rule_index: null` + `judge_owned: true`. It credits no rule
// (the coverage model already skips a null index), it survives as a record, and
// it is greppable. A null index WITHOUT the flag is a judge that forgot to say
// which rule it judged — which the auditor used to skip in silence.
test('judge-owned row (null index + flag) → no warning', () => {
  const inst = { class: 'pedagogy', rules_evaluated: [
    { compendium: 'check_workshop.md', rule_index: null, judge_owned: true, rule_lead: 'Trigger — is this file workshop-shaped?', verdict: 'N/A' },
  ] };
  const { bugs, warnings } = scanInstanceIntegrity('x.pedagogy.json', 'pedagogy', inst, COMP);
  assert.deepEqual(bugs, []);
  assert.deepEqual(warnings, []);
});

test('judge-owned flag also excuses a pseudo-compendium (the judgment has no home by definition)', () => {
  const inst = { class: 'story', rules_evaluated: [
    { compendium: 'judge-owned', rule_index: null, judge_owned: true, rule_lead: 'Big Idea match', verdict: 'PASS' },
  ] };
  const { warnings } = scanInstanceIntegrity('x.story.json', 'story', inst, COMP);
  assert.deepEqual(warnings, []);
});

test('the slides class uses its own row schema → not judged as a rule row', () => {
  // {rule, name, verdict, blocking, evidence} — no `compendium`, no `rule_index`.
  // A row that never claimed to cite a compendium rule is not a row that forgot to.
  const inst = { class: 'slides', rules_evaluated: [
    { rule: 1, name: 'Referent resolution under sequential deck read', verdict: 'PASS', blocking: true },
  ] };
  const { bugs, warnings } = scanInstanceIntegrity('x.slides.json', 'slides', inst, COMP);
  assert.deepEqual(bugs, []);
  assert.deepEqual(warnings, []);
});

test('null rule_index WITHOUT the flag → missing-rule-index warning (was silently skipped)', () => {
  const inst = { class: 'pedagogy', rules_evaluated: [
    { compendium: 'check_pedagogy.md', rule_index: null, rule_lead: 'Something.', verdict: 'PASS' },
  ] };
  const { warnings } = scanInstanceIntegrity('x.pedagogy.json', 'pedagogy', inst, COMP);
  assert.equal(warnings.filter(w => w.kind === 'missing-rule-index').length, 1);
});

test('judge-owned rows credit no rule', () => {
  const keys = verdictedKeys([
    { class: 'pedagogy', rules_evaluated: [
      { compendium: 'check_pedagogy.md', rule_index: null, judge_owned: true, rule_lead: 'x', verdict: 'PASS' },
    ] },
  ], COMP);
  assert.equal(keys.size, 0);
});

test('a string row (Haiku schema degradation) → non-object-row warning', () => {
  // "check_writing.md § 1" instead of {compendium, rule_index, verdict}. Every
  // field the coverage model reads is undefined, so the instance credits nothing
  // — silently, because a string is truthy and every lookup on it is undefined.
  const inst = { class: 'writing', rules_evaluated: ['check_writing.md § 1', '1. Banned words — grep zero-tolerance.'] };
  const { warnings } = scanInstanceIntegrity('x.writing.json', 'writing', inst, COMP);
  assert.equal(warnings.filter(w => w.kind === 'non-object-row').length, 2);
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

// ── N/A-by-design bucketing ──────────────────────────────────────────────────
// splitMissing must keep judgment-call holes visible while routing only the
// declared structural-impossibility rules into the na bucket. A wrong split
// either hides a real hole (na too greedy) or inflates the headline (na too shy).

test('splitMissing: partial naSet splits real holes from N/A-by-design', () => {
  const { real, na } = splitMissing(['4', '5', '6', '7'], new Set(['5', '6', '7']));
  assert.deepEqual(real, ['4']); // §4 stays a real hole
  assert.deepEqual(na, ['5', '6', '7']);
});

test('splitMissing: "all" sentinel → everything N/A, zero holes', () => {
  const { real, na } = splitMissing(['1', '2', '3'], new Set(['all']));
  assert.deepEqual(real, []);
  assert.deepEqual(na, ['1', '2', '3']);
});

test('splitMissing: empty naSet → every missing rule is a real hole', () => {
  const { real, na } = splitMissing(['1', '2'], new Set());
  assert.deepEqual(real, ['1', '2']);
  assert.deepEqual(na, []);
});

test('naRuleSet: lectures strategy_tie_in §§5/6/7 N/A, §4 stays a hole', () => {
  const s = naRuleSet('lectures', 'painting-the-picture-with-the-llm', 'check_strategy_tie_in');
  assert.ok(s.has('5') && s.has('6') && s.has('7'));
  assert.ok(!s.has('4')); // §4 (front-run) applies to lectures — not declared N/A
});

test('naRuleSet: no per-file N/A declarations remain', () => {
  const s = naRuleSet('modules', 'learn-from-the-test', 'check_pedagogy');
  assert.equal(s.size, 0);
});

test('naRuleSet: a normal exercise carries no N/A declarations', () => {
  const s = naRuleSet('exercises', 'fix-tests-first', 'check_pedagogy');
  assert.equal(s.size, 0);
});

// ── rule-index cram + pseudo-compendium detectors ────────────────────────────
// The story judge crams several distinct judgments onto ONE (compendium,
// rule_index) — usually check_strategy_tie_in::1 — or files them under invented
// pseudo-compendia ("story.md owns", "judge-owned"). verdictedKeys() dedupes by
// (compendium::rule_index), so a crammed §4 (filed as ::1) reads as an uncovered
// hole while ::1 looks "evaluated 5×". These two warnings make the cram visible.

test('duplicate (compendium, rule_index) → duplicate-rule-index warning with count', () => {
  const inst = { class: 'pedagogy', rules_evaluated: [
    { compendium: 'check_pedagogy.md', rule_index: 9, verdict: 'PASS' },
    { compendium: 'check_pedagogy.md', rule_index: 9, verdict: 'N/A' },
  ] };
  const { warnings } = scanInstanceIntegrity('ae101--x.pedagogy.json', 'pedagogy', inst, COMP);
  const dup = warnings.filter(w => w.kind === 'duplicate-rule-index');
  assert.equal(dup.length, 1);
  assert.equal(dup[0].count, 2);
  assert.equal(dup[0].compendium, 'check_pedagogy');
});

// A third citation convention: the sub-letter lives in the LEAD, not the index —
// `rule_index: 4` five times over, with leads "(4a) …", "(4b) …". Those are five
// honest judgments on five real rules, not one rule judged five times. The cram
// detector reads the announced sub-letter when the index is a bare integer.
test('sub-letter announced in rule_lead → distinct keys, no cram warning', () => {
  const inst = { class: 'pedagogy', rules_evaluated: [
    { compendium: 'check_pedagogy.md', rule_index: 9, rule_lead: 'Pattern-recognition LOs.', verdict: 'PASS' },
    { compendium: 'check_pedagogy.md', rule_index: 9, rule_lead: '9b. Progression-with-variations is the spine', verdict: 'N/A' },
    { compendium: 'check_pedagogy.md', rule_index: 9, rule_lead: '(9c) Something else.', verdict: 'N/A' },
  ] };
  const { warnings } = scanInstanceIntegrity('ae101--x.pedagogy.json', 'pedagogy', inst, COMP);
  assert.equal(warnings.filter(w => w.kind === 'duplicate-rule-index').length, 0);
});

test('same rule judged twice with no sub-letter → still a cram warning', () => {
  const inst = { class: 'pedagogy', rules_evaluated: [
    { compendium: 'check_pedagogy.md', rule_index: 9, rule_lead: 'Pattern-recognition LOs.', verdict: 'PASS' },
    { compendium: 'check_pedagogy.md', rule_index: 9, rule_lead: 'Pattern-recognition LOs.', verdict: 'REVISE' },
  ] };
  const { warnings } = scanInstanceIntegrity('ae101--x.pedagogy.json', 'pedagogy', inst, COMP);
  assert.equal(warnings.filter(w => w.kind === 'duplicate-rule-index').length, 1);
});

test('distinct rule_indexes → no duplicate-rule-index warning', () => {
  const inst = { class: 'pedagogy', rules_evaluated: [
    { compendium: 'check_pedagogy.md', rule_index: 9, verdict: 'PASS' },
    { compendium: 'check_pedagogy.md', rule_index: 10, verdict: 'PASS' },
  ] };
  const { warnings } = scanInstanceIntegrity('ae101--x.pedagogy.json', 'pedagogy', inst, COMP);
  assert.equal(warnings.filter(w => w.kind === 'duplicate-rule-index').length, 0);
});

test('invented pseudo-compendium → unknown-compendium warning (deduped per name)', () => {
  const inst = { class: 'story', rules_evaluated: [
    { compendium: 'story.md owns', rule_index: 0, verdict: 'PASS' },
    { compendium: 'story.md owns', rule_index: 0, verdict: 'PASS' },
  ] };
  const { warnings } = scanInstanceIntegrity('ae101--x.story.json', 'story', inst, COMP);
  const unk = warnings.filter(w => w.kind === 'unknown-compendium');
  assert.equal(unk.length, 1); // deduped per compendium name, not per entry
  assert.equal(unk[0].compendium, 'story.md owns');
});

test('known compendium absent from loaded set → NOT flagged unknown (keys off COMPENDIA constant)', () => {
  // COMP fixture lacks check_strategy_tie_in, but it is a known compendium — a
  // §4 entry must not be mis-flagged just because the test loaded a subset.
  const inst = { class: 'pedagogy', rules_evaluated: [
    { compendium: 'check_strategy_tie_in.md', rule_index: 4, verdict: 'PASS' },
  ] };
  const { warnings } = scanInstanceIntegrity('ae101--x.pedagogy.json', 'pedagogy', inst, COMP);
  assert.equal(warnings.filter(w => w.kind === 'unknown-compendium').length, 0);
});

// ── SURFACES instanceSlug convention: directory-derived, not basename-keyed ──
// spot-gaps-build-the-loop is both a module (curriculum/trainings/.../spot-gaps-
// build-the-loop.md) and an exercise (curriculum/exercises/spot-gaps-build-the-
// loop.md) — same slug, two surfaces. A basename-keyed instanceSlug
// (`ae101--<slug>`) collides; the fix disambiguates by directory (surface type)
// baked into the instanceSlug itself: `ae101--<type>--<slug>`. Two regression
// angles: (a) no two surface entries share an instanceSlug — the collision
// itself; (b) every instanceSlug embeds its surface-type segment, so a FUTURE
// slug collision fails loudly instead of silently aliasing two files together
// (this is the one that fails pre-fix: the spot-gaps module carried a
// `-module` suffix workaround, not a `--module--` segment).
// The coverage audit was written for AE101 and hardcoded to it: SURFACES named
// AE101 files literally, and `generated_for` was the string 'ae101'. Every other
// training in the registry was therefore invisible to the gate that exists to
// prove no rule goes unjudged — the gate reported clean over trainings it had
// never opened, which is the same defect check-slide-size carried until
// 2026-08-12. Found 2026-08-19 during the agents-101 parity pass.
test('surfacesFor derives a surface set for a training that is not AE101', () => {
  const a101 = surfacesFor('agents-101');
  assert.ok(a101.modules.length >= 8,
    `expected agents-101 to contribute its module files, got ${a101.modules.length}`);
  assert.ok(a101.exercises.length > 5 && a101.lectures.length > 5,
    'expected the exercise and lecture surfaces to be derived from module include-links, ' +
    `got ${a101.exercises.length} exercises and ${a101.lectures.length} lectures`);

  for (const [group, files] of Object.entries(a101)) {
    for (const f of files) {
      assert.ok(fs.existsSync(path.join(ROOT, f.file)),
        `${group}: ${f.file} does not exist — a derived surface must name a real file`);
      assert.match(f.instanceSlug, /^agents-101--(exercise|lecture|module)--/,
        `${group}: instanceSlug "${f.instanceSlug}" must carry the training prefix and its ` +
        'surface-type segment, matching the instances already on disk');
    }
  }
});

test('surfacesFor("agentic-engineering-101") is exactly the SURFACES it always was', () => {
  assert.deepStrictEqual(surfacesFor('agentic-engineering-101'), SURFACES,
    'the AE101 surface set is hand-curated (12 named exercises, theory-manifest lectures) ' +
    'and must not change shape when the function is generalised');
});

test('surfacesFor rejects a training the registry does not know', () => {
  assert.throws(() => surfacesFor('no-such-training'), /Unknown training/);
});

test('SURFACES: every instanceSlug is unique across all surface groups (no basename collision)', () => {
  const seen = new Map(); // instanceSlug -> "group/slug" of first owner
  const dupes = [];
  for (const [group, files] of Object.entries(SURFACES)) {
    for (const f of files) {
      const owner = `${group}/${f.slug}`;
      if (seen.has(f.instanceSlug)) dupes.push(`${f.instanceSlug}: ${seen.get(f.instanceSlug)} vs ${owner}`);
      else seen.set(f.instanceSlug, owner);
    }
  }
  assert.deepEqual(dupes, []);
});

test('SURFACES: every instanceSlug embeds its surface-type segment (directory-derived, not basename-keyed)', () => {
  const typeTag = { exercises: '--exercise--', lectures: '--lecture--', modules: '--module--' };
  const violations = [];
  for (const [group, files] of Object.entries(SURFACES)) {
    const tag = typeTag[group];
    if (!tag) continue;
    for (const f of files) {
      if (!f.instanceSlug.includes(tag)) violations.push(`${group}/${f.slug} -> ${f.instanceSlug} (missing "${tag}")`);
    }
  }
  assert.deepEqual(violations, []);
});

/*
 * Every stored instance must be readable before any of the integrity checks
 * above mean anything: an unparseable file is scored as one gating structural
 * bug and then skipped, so its rule verdicts silently leave the corpus. The
 * recurring break is a rule_lead quoting the compendium's own rule text —
 * §3's `no "fixed" retrospectives`, §7's `Always "you"` — written with bare
 * inner quotes. The auditor is non-gating on npm test; this is the gate.
 */
test('instances: every stored eval instance parses as JSON', () => {
  const dir = path.join(__dirname, '..', 'curriculum/evals/instances');
  const bad = [];
  for (const f of fs.readdirSync(dir).filter(n => n.endsWith('.json'))) {
    try {
      JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
    } catch (e) {
      bad.push(`${f}: ${e.message}`);
    }
  }
  assert.deepEqual(bad, [], 'unparseable instance files drop their verdicts out of the corpus');
});

// ── The `file` field must name a file that exists ──
// 13 instances pointed at nothing: an a101 supplementary recorded under the
// ae101 path, a bare basename with no directory, one instance naming ITSELF.
// scan-stale-classes.js reads this field and, on an unreadable path, keeps every
// class as stale forever with reason 'unreadable' — so a rotted pointer reads as
// permanent staleness rather than as the broken pointer it is. Cheap to guard.
test('instances: every stored `file` field resolves to a real file', () => {
  const dir = path.join(__dirname, '..', 'curriculum/evals/instances');
  const broken = [];
  for (const f of fs.readdirSync(dir).filter(n => n.endsWith('.json'))) {
    let inst;
    try { inst = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')); } catch { continue; }
    const p = inst && inst.file;
    if (!p) continue;
    const abs = path.isAbsolute(p) ? p : path.join(__dirname, '..', p);
    if (!fs.existsSync(abs)) broken.push(`${f} → ${p}`);
  }
  assert.deepEqual(broken, [], `eval instances pointing at nothing:\n  ${broken.join('\n  ')}`);
});
