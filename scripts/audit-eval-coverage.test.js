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
  verdictedKeys,
  scanInstanceIntegrity,
  naRuleSet,
  splitMissing,
  SURFACES,
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

test('a rule that moved house → moved-rule-citation naming the new home, not unresolvable', () => {
  const comp = { check_pedagogy: { evalClasses: [], rules: [{ id: '9', lead: 'x' }], moved: { '5': 'check_cross_module.md §1' } } };
  const inst = { class: 'pedagogy', rules_evaluated: [{ compendium: 'check_pedagogy.md', rule_index: 5, verdict: 'PASS' }] };
  const { bugs, warnings } = scanInstanceIntegrity('ae101--x.pedagogy.json', 'pedagogy', inst, comp);
  assert.deepEqual(bugs, []);
  assert.equal(warnings.length, 1);
  assert.equal(warnings[0].kind, 'moved-rule-citation');
  assert.equal(warnings[0].movedTo, 'check_cross_module.md §1');
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

test('naRuleSet: cohort-onboarding-email pedagogy is wholesale N/A', () => {
  const s = naRuleSet('modules', 'cohort-onboarding-email', 'check_pedagogy');
  assert.ok(s.has('all'));
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
