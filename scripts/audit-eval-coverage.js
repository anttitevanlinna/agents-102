#!/usr/bin/env node
'use strict';
/*
 * audit-eval-coverage.js — prove which compendium rules actually got an explicit
 * verdict (PASS/REVISE/N/A) against each AE101 student-facing surface file.
 *
 * Phase 1 (prompts) proved coverage by hunting ORPHAN rules (no checker). The rest
 * of AE101 is the inverse: a standing judge system exists and re-reads each
 * compendium on demand, but the stored instances emit a SPARSE subset of rule
 * verdicts — nothing forces one-verdict-per-rule, so "every rule fired" is unproven.
 * This script measures that gap deterministically.
 *
 * Coverage model
 *   - Each compendium declares eval_classes: [..] in frontmatter (which judge
 *     classes draw from it). check_writing → [writing]; check_pedagogy →
 *     [pedagogy, storytelling, technical]; etc.
 *   - A compendium rule R is COVERED for file F iff some instance F.<class>
 *     (class ∈ eval_classes(compendium)) carries a rules_evaluated entry whose
 *     compendium + rule_index match R. Any judge in the mapped set counts.
 *   - A rule absent from ALL mapped-class instances of F = an UNCOVERED hole.
 *   - A file with no instance of any mapped class = a MISSING-CLASS hole
 *     (could be legitimately N/A; flagged for human, not auto-resolved).
 *
 * Retarget: change SURFACES / SURFACE_COMPENDIUMS. Training-agnostic otherwise.
 *
 * Usage:
 *   node scripts/audit-eval-coverage.js [--surface exercises|lectures|modules|all]
 *                                       [--json] [--out <path>]
 * Exit 0 always (report tool, not a gate) unless --strict (exit 1 on any hole).
 */
const fs = require('fs');
const path = require('path');

const REPO = path.resolve(__dirname, '..');
const MEM = '/Users/anttitevanlinna/.claude/projects/-Users-anttitevanlinna-Projects-agents-102/memory';
const INSTANCES = path.join(REPO, 'curriculum/evals/instances');

const COMPENDIA = [
  'check_writing', 'check_student_facing', 'check_pedagogy',
  'check_lectures', 'check_strategy_tie_in', 'check_cross_module',
  'check_platform_and_boundaries', 'check_research_claims',
];
// The known compendium namespace, for the unknown-compendium detector. A
// rules_evaluated entry MUST cite one of these — judges that invent a home
// ("story.md owns", "judge-owned", "storytelling") for an intrinsic judgment
// file it outside the rule namespace, so it credits no real rule's coverage.
const KNOWN_COMPENDIA = new Set(COMPENDIA);

// Which compendiums must fire on each surface type (the "rule sets that must
// fire" column of the phasing table). Coverage is reported for these.
const SURFACE_COMPENDIA = {
  exercises: ['check_writing', 'check_student_facing', 'check_pedagogy'],
  lectures:  ['check_writing', 'check_student_facing', 'check_lectures', 'check_strategy_tie_in'],
  // check_cross_module is judged at the module-PAIR level (ae101--m1-m2.cross_module.json),
  // not per module file — audited separately, not in this per-file rule matrix.
  modules:   ['check_writing', 'check_student_facing', 'check_pedagogy', 'check_strategy_tie_in'],
};

// Classes a surface type MUST carry an instance of (the gate fails without them).
// Minimal + defensible: writing applies to ALL prose; pedagogy to anything with
// exercise/module architecture; story owns lectures; strategy owns module Big-Idea/
// Key-Concepts. Sim-trace-dependent story on exercises/modules is NOT gated (many
// exist, but absence there is a softer signal). Rule-level sparseness is NOT gated
// here — it's legit-N/A-ambiguous until the judges emit complete ledgers.
const MANDATORY_CLASSES = {
  exercises: ['writing', 'pedagogy'],
  lectures:  ['writing', 'story'],
  modules:   ['writing', 'pedagogy', 'strategy'],
};

// ── N/A-by-design ────────────────────────────────────────────────────────────
// A rule counts as N/A-by-design ONLY when it targets a section/artifact the
// surface type STRUCTURALLY cannot have — never a judgment call. Judgment-call
// N/As stay the judge's to emit per-instance (an explicit N/A verdict), and a
// MISSING judgment-call verdict must remain a visible hole. Declared explicitly
// here so a real gap is never silently masked.
//   • check_strategy_tie_in §§5/6/7 govern module-file sections — Key Concepts
//     (§5/§6) and What You'll Learn (§7). Lectures and the onboarding email have
//     no such sections, so those three rules cannot apply there.
//   • cohort-onboarding-email is an email (SURFACES marks it mandatory:['writing']),
//     not a module/exercise, so the module/exercise-architecture compendium
//     check_pedagogy is wholesale N/A.
// §4 (strategy-fidelity / front-run) DELIBERATELY stays applicable to lectures:
// a lecture can front-run a downstream teaching moment, so a missing §4 verdict
// is a real (soft) hole the story judge owes — NOT an N/A.
const NA_BY_SURFACE = {
  lectures: { check_strategy_tie_in: ['5', '6', '7'] },
};
const NA_BY_FILE = {
  'cohort-onboarding-email': { check_pedagogy: 'all', check_strategy_tie_in: ['5', '6', '7'] },
};

// Resolve the N/A rule-set for a (surface, file, compendium). Returns a Set of
// rule ids; may contain the sentinel 'all' (whole compendium N/A for this file).
function naRuleSet(surface, slug, cname) {
  const set = new Set();
  for (const src of [(NA_BY_SURFACE[surface] || {})[cname], (NA_BY_FILE[slug] || {})[cname]]) {
    if (src === 'all') set.add('all');
    else if (Array.isArray(src)) for (const id of src) set.add(String(id));
  }
  return set;
}

// Split missing rule ids into real holes vs N/A-by-design, given an naSet.
function splitMissing(missingIds, naSet) {
  if (naSet.has('all')) return { real: [], na: missingIds.slice() };
  const real = [], na = [];
  for (const id of missingIds) (naSet.has(String(id)) ? na : real).push(id);
  return { real, na };
}

// Lecture surface derives from build-workbook.js THEORY_HANDBOOK_MANIFEST —
// the single source of truth for module-wired lectures. build-workbook.js is a
// top-to-bottom script (require = run the build), so parse its source instead
// of requiring it. Throws on parse failure so a moved/renamed manifest can
// never silently shrink the audit surface. Guard test:
// curriculum.test.js "eval-coverage lecture surface …" (independent extraction).
// Pure, quote-agnostic extractor for `lectures/<slug>` entries out of a manifest
// block. Single OR double quotes — a double-quoted entry must NOT be invisible
// (it once was: both this side and the drift-guard test shared a single-quote
// regex, so a double-quoted entry slipped past BOTH with no mismatch to catch).
// Dedupes, preserving first-seen order.
function extractManifestLectureSlugs(manifestBlockSrc) {
  const slugs = [];
  const seen = new Set();
  for (const m of manifestBlockSrc.matchAll(/['"]lectures\/([a-z0-9-]+)['"]/g)) {
    if (!seen.has(m[1])) { seen.add(m[1]); slugs.push(m[1]); }
  }
  return slugs;
}

function theoryManifestLectures() {
  const src = fs.readFileSync(path.join(REPO, 'scripts/build-workbook.js'), 'utf8');
  const block = src.match(/const THEORY_HANDBOOK_MANIFEST = \{[\s\S]*?\n\};/);
  if (!block) throw new Error('THEORY_HANDBOOK_MANIFEST not found in scripts/build-workbook.js');
  const slugs = extractManifestLectureSlugs(block[0]);
  if (slugs.length === 0) throw new Error('THEORY_HANDBOOK_MANIFEST parse yielded no lectures');
  return slugs;
}

// AE101 surface set, in module order. instanceSlug overrides where the instance
// filename diverges from the source slug (spot-gaps module carries a -module suffix).
const SURFACES = {
  exercises: [
    'orient-and-introspect', 'fix-tests-first', 'compound-and-close',
    'push-back-on-the-plan', 'extract-the-task-shaping-rule',
    'open-the-side-quest', 'map-the-access-surface', 'threat-model-with-stride',
    'author-test-strategy-skill', 'walk-and-send-off', 'diagnose-and-resend',
    'spot-gaps-build-the-loop', 'arc-retrospective',
  ].map(slug => ({ slug, file: `curriculum/exercises/${slug}.md`, instanceSlug: `ae101--${slug}` })),
  lectures: theoryManifestLectures()
    .map(slug => ({ slug, file: `curriculum/lectures/${slug}.md`, instanceSlug: `ae101--${slug}` })),
  modules: [
    { slug: 'prework', file: 'curriculum/trainings/agentic-engineering-101/prework.md', instanceSlug: 'ae101--prework' },
    { slug: 'getting-going', file: 'curriculum/trainings/agentic-engineering-101/getting-going.md', instanceSlug: 'ae101--getting-going' },
    { slug: 'plan-mode-done-right', file: 'curriculum/trainings/agentic-engineering-101/plan-mode-done-right.md', instanceSlug: 'ae101--plan-mode-done-right' },
    { slug: 'earn-the-trust', file: 'curriculum/trainings/agentic-engineering-101/earn-the-trust.md', instanceSlug: 'ae101--earn-the-trust' },
    { slug: 'run-the-first-experiment', file: 'curriculum/trainings/agentic-engineering-101/run-the-first-experiment.md', instanceSlug: 'ae101--run-the-first-experiment' },
    { slug: 'learn-from-the-test', file: 'curriculum/trainings/agentic-engineering-101/learn-from-the-test.md', instanceSlug: 'ae101--learn-from-the-test' },
    { slug: 'spot-gaps-build-the-loop', file: 'curriculum/trainings/agentic-engineering-101/spot-gaps-build-the-loop.md', instanceSlug: 'ae101--spot-gaps-build-the-loop-module' },
    // An email, not a module: no exercises (pedagogy N/A) and no Big-Idea/Key-Concepts (strategy N/A). Only prose-lint (writing) is mandatory.
    { slug: 'cohort-onboarding-email', file: 'curriculum/trainings/agentic-engineering-101/cohort-onboarding-email.md', instanceSlug: 'ae101--cohort-onboarding-email', mandatory: ['writing'] },
  ],
};

// Canonical judge classes (the seven judge templates in curriculum/evals/judges/).
const CANONICAL_CLASSES = ['writing', 'pedagogy', 'story', 'strategy', 'technical', 'behavior', 'cross_module'];
// Instance filename suffix → coverage bucket (used to find which instances map
// to a compendium's eval_classes). "story" is the suffix/shorthand.
const SUFFIX_TO_CLASS = { writing: 'writing', pedagogy: 'pedagogy', story: 'story', strategy: 'strategy', technical: 'technical', behavior: 'behavior', cross_module: 'cross_module' };
// eval_classes frontmatter uses "storytelling"; the judge/suffix uses "story".
// Aliased for COVERAGE matching only (a .story.json instance covers
// storytelling-mapped compendiums regardless of field spelling).
const CLASS_ALIASES = { storytelling: 'story' };
const normClass = c => CLASS_ALIASES[c] || c;
// Canonical `class` FIELD value the judge template emits, keyed by file suffix.
// The story judge emits "storytelling" (story.md:101); the suffix is "story".
// Any .story.json carrying class:"story" is drift to flag (not alias away).
const CANONICAL_FIELD = { writing: 'writing', pedagogy: 'pedagogy', story: 'storytelling', strategy: 'strategy', technical: 'technical', behavior: 'behavior', cross_module: 'cross_module' };

// eval_classes appears in two frontmatter shapes across the compendia:
//   inline bracket   → `eval_classes: [strategy, writing, storytelling]`
//   multi-line list  → `eval_classes:` then one `  - item` line per class
// Accept both. [ \t] (not \s) on the inline lead so a bare `eval_classes:` that
// begins a multi-line list can never skip across newlines to a distant `[`.
function parseFrontmatterEvalClasses(md) {
  const inline = md.match(/eval_classes:[ \t]*\[([^\]]*)\]/);
  if (inline) {
    return inline[1].split(',').map(s => s.trim()).filter(Boolean).map(normClass);
  }
  const list = md.match(/eval_classes:[ \t]*\r?\n((?:[ \t]*-[ \t]*[^\r\n]+\r?\n?)+)/);
  if (list) {
    return list[1].split(/\r?\n/)
      .map(l => (l.match(/^[ \t]*-[ \t]*(.+?)[ \t]*$/) || [])[1])
      .filter(Boolean).map(normClass);
  }
  return [];
}

// Parse a compendium's top-level numbered rules: `N. **Lead.**`.
// Instances store rule_index as an INTEGER, so sub-lettered rules (9b, 21b, 34b,
// 52b) collapse onto their integer parent for coverage matching — they cannot be
// expressed separately in the instance schema. Dedupe by integer id; the first
// occurrence's lead wins. Italic "Moved to .." stubs use single * and are skipped.
function parseRules(md) {
  const re = /^(\d+)[a-z]?\.\s+\*\*(.+?)\*\*/gm;
  const rules = [];
  const seen = new Set();
  let m;
  while ((m = re.exec(md)) !== null) {
    const id = m[1];
    if (seen.has(id)) continue;
    seen.add(id);
    rules.push({ id, lead: m[2].replace(/\s+/g, ' ').trim() });
  }
  return rules;
}

function loadCompendia() {
  const out = {};
  for (const name of COMPENDIA) {
    const p = path.join(MEM, `${name}.md`);
    if (!fs.existsSync(p)) { out[name] = { evalClasses: [], rules: [] }; continue; }
    const md = fs.readFileSync(p, 'utf8');
    out[name] = { evalClasses: parseFrontmatterEvalClasses(md), rules: parseRules(md) };
  }
  return out;
}

function loadInstance(instanceSlug, suffix) {
  const p = path.join(INSTANCES, `${instanceSlug}.${suffix}.json`);
  if (!fs.existsSync(p)) return null;
  try { return JSON.parse(fs.readFileSync(p, 'utf8')); }
  catch (e) { return { __parseError: e.message }; }
}

// Set of "<compendium>.md::<rule_index>" verdicted across the given instances.
function verdictedKeys(instances) {
  const set = new Set();
  for (const inst of instances) {
    if (!inst || inst.__parseError || !Array.isArray(inst.rules_evaluated)) continue;
    for (const r of inst.rules_evaluated) {
      if (r && r.compendium != null && r.rule_index != null) {
        set.add(`${r.compendium}::${String(r.rule_index)}`);
      }
    }
  }
  return set;
}

// Verdict values a rules_evaluated entry may carry. An explicit N/A IS coverage
// (the rule was evaluated and ruled not-applicable), so it is valid here.
const VERDICT_ENUM = new Set(['PASS', 'REVISE', 'N/A']);

// Per-instance structural integrity. Returns gating `bugs` (class-field issues)
// + non-gating `warnings` (rules_evaluated data hygiene). Pure given `comp`, so
// it is unit-testable. Coverage used to be credited on (compendium, rule_index)
// PRESENCE alone — a rule_index matching no real rule (the corpus encodes
// sub-rules three ways: "9b" string, 9.1 float, fabricated 91 int) was silently
// swallowed, and the verdict value was never checked. This surfaces both.
// Behavior (prompts_findings) and cross_module (nested module_pairs_evaluated)
// carry no top-level rules_evaluated, so they produce no rule warnings.
function scanInstanceIntegrity(fname, suffix, inst, comp) {
  const bugs = [];
  const warnings = [];
  const canonical = CANONICAL_FIELD[suffix];
  if (canonical) {
    if (inst.class == null) bugs.push({ kind: 'missing-class-field', file: fname, expected: canonical });
    else if (inst.class !== canonical) bugs.push({ kind: 'class-field-drift', file: fname, expected: canonical, got: inst.class });
  }
  if (Array.isArray(inst.rules_evaluated)) {
    const keyCounts = new Map();   // (compendium::rule_index) → count, for the cram detector
    const unknownComps = new Set(); // pseudo-compendia, deduped per name
    for (const r of inst.rules_evaluated) {
      if (!r) continue;
      if (r.verdict != null && !VERDICT_ENUM.has(String(r.verdict).trim())) {
        warnings.push({ kind: 'non-enum-verdict', file: fname, compendium: r.compendium, rule_index: r.rule_index, verdict: r.verdict });
      }
      if (r.compendium != null && r.rule_index != null) {
        const cname = String(r.compendium).replace(/\.md$/, '');
        keyCounts.set(`${cname}::${String(r.rule_index)}`, (keyCounts.get(`${cname}::${String(r.rule_index)}`) || 0) + 1);
        if (!KNOWN_COMPENDIA.has(cname)) { unknownComps.add(cname); continue; } // can't resolve rule ids outside the namespace
        const C = comp[cname];
        if (C && Array.isArray(C.rules)) {
          const ids = new Set(C.rules.map(x => x.id));
          if (!ids.has(String(r.rule_index))) {
            warnings.push({ kind: 'unresolvable-rule-index', file: fname, compendium: r.compendium, rule_index: r.rule_index });
          }
        }
      }
    }
    // Cram detector: same (compendium, rule_index) emitted more than once means
    // several distinct judgments collapsed onto one key — the extras credit no
    // rule of their own, and the rule they SHOULD carry reads as an uncovered hole.
    for (const [key, n] of keyCounts) {
      if (n > 1) {
        const sep = key.lastIndexOf('::');
        warnings.push({ kind: 'duplicate-rule-index', file: fname, compendium: key.slice(0, sep), rule_index: key.slice(sep + 2), count: n });
      }
    }
    for (const cname of unknownComps) warnings.push({ kind: 'unknown-compendium', file: fname, compendium: cname });
  }
  return { bugs, warnings };
}

function main() {
  const args = process.argv.slice(2);
  const wantSurface = (args.includes('--surface') ? args[args.indexOf('--surface') + 1] : 'all');
  const asJson = args.includes('--json');
  const strict = args.includes('--strict');
  const gate = args.includes('--gate');
  const outIdx = args.indexOf('--out');
  const outPath = outIdx >= 0 ? args[outIdx + 1] : null;

  const comp = loadCompendia();
  const surfaceKeys = wantSurface === 'all' ? Object.keys(SURFACES) : [wantSurface];

  const report = { generated_for: 'ae101', surfaces: {}, bugs: [], warnings: [], gate_failures: [] };
  let totalHoles = 0;
  let totalNaBySurface = 0;

  // Structural bug scan: class-field drift + parse errors. Training-agnostic —
  // scans ALL instances (a drifted class field breaks consumers regardless of training).
  const allFiles = fs.readdirSync(INSTANCES).filter(f => /\.[a-z_]+\.json$/.test(f));
  for (const fname of allFiles) {
    const m = fname.match(/\.([a-z_]+)\.json$/);
    if (!m) continue;
    const suffix = m[1];
    let inst;
    try { inst = JSON.parse(fs.readFileSync(path.join(INSTANCES, fname), 'utf8')); }
    catch (e) { report.bugs.push({ kind: 'parse-error', file: fname, detail: e.message }); continue; }
    const integrity = scanInstanceIntegrity(fname, suffix, inst, comp);
    report.bugs.push(...integrity.bugs);
    report.warnings.push(...integrity.warnings);
  }

  for (const sk of surfaceKeys) {
    const surfaceFiles = SURFACES[sk] || [];
    const comps = SURFACE_COMPENDIA[sk] || [];
    const surfaceReport = { files: [] };
    for (const sf of surfaceFiles) {
      const fileReport = { slug: sf.slug, instanceSlug: sf.instanceSlug, classesPresent: [], compendia: {}, missingClasses: [] };
      // Which canonical-class instances exist for this surface file.
      for (const cls of CANONICAL_CLASSES) {
        const suffix = Object.keys(SUFFIX_TO_CLASS).find(s => SUFFIX_TO_CLASS[s] === cls);
        if (loadInstance(sf.instanceSlug, suffix)) fileReport.classesPresent.push(cls);
      }
      for (const mc of (sf.mandatory || MANDATORY_CLASSES[sk] || [])) {
        if (!fileReport.classesPresent.includes(mc)) {
          report.gate_failures.push({ surface: sk, file: sf.slug, missingClass: mc });
        }
      }
      for (const cname of comps) {
        const C = comp[cname];
        const mappedClasses = C.evalClasses;
        const naSet = naRuleSet(sk, sf.slug, cname);
        const instances = mappedClasses
          .map(cls => Object.keys(SUFFIX_TO_CLASS).find(s => SUFFIX_TO_CLASS[s] === cls))
          .map(suffix => suffix && loadInstance(sf.instanceSlug, suffix))
          .filter(Boolean);
        if (instances.length === 0) {
          const { real, na } = splitMissing(C.rules.map(r => r.id), naSet);
          fileReport.compendia[cname] = { total: C.rules.length, covered: 0, missing: real, na, missingClass: real.length > 0 };
          if (real.length > 0) fileReport.missingClasses.push({ compendium: cname, needsOneOf: mappedClasses });
          totalHoles += real.length;
          totalNaBySurface += na.length;
          continue;
        }
        const keys = verdictedKeys(instances);
        const allMissing = C.rules.filter(r => !keys.has(`${cname}.md::${r.id}`)).map(r => r.id);
        const { real, na } = splitMissing(allMissing, naSet);
        fileReport.compendia[cname] = { total: C.rules.length, covered: C.rules.length - allMissing.length, missing: real, na };
        totalHoles += real.length;
        totalNaBySurface += na.length;
      }
      surfaceReport.files.push(fileReport);
    }
    report.surfaces[sk] = surfaceReport;
  }

  report.total_holes = totalHoles;
  report.total_na_by_surface = totalNaBySurface;

  if (outPath) { fs.writeFileSync(outPath, JSON.stringify(report, null, 2)); }
  if (asJson) { process.stdout.write(JSON.stringify(report, null, 2) + '\n'); }
  else { printHuman(report, comp); }

  if (gate) {
    if (report.warnings && report.warnings.length) {
      process.stderr.write(`\n⚠ ${report.warnings.length} non-gating data-hygiene warning(s) — see report (does not fail the gate).\n`);
    }
    const fails = report.bugs.length + report.gate_failures.length;
    if (fails > 0) {
      process.stderr.write(`\n✗ eval-coverage gate FAILED: ${report.bugs.length} structural bug(s), ${report.gate_failures.length} missing mandatory instance(s).\n`);
      for (const g of report.gate_failures) process.stderr.write(`  • ${g.surface}/${g.file}: missing ${g.missingClass} instance\n`);
      process.exit(1);
    }
    process.stderr.write('\n✓ eval-coverage gate PASSED (no structural bugs, all mandatory instances present).\n');
  }
  if (strict && totalHoles > 0) process.exit(1);
}

function pct(c, t) { return t === 0 ? '—' : `${Math.round((100 * c) / t)}%`; }

function printHuman(report, comp) {
  const out = [];
  out.push('═══ AE101 eval-coverage audit ═══\n');
  if (report.bugs.length) {
    out.push(`⚠ structural bugs (${report.bugs.length}):`);
    for (const b of report.bugs) {
      if (b.kind === 'class-field-drift') out.push(`  • class-field-drift  ${b.file}  field="${b.got}" expected="${b.expected}"`);
      else out.push(`  • ${b.kind}  ${b.file}  ${b.detail || ''}`);
    }
    out.push('');
  }
  if (report.gate_failures && report.gate_failures.length) {
    out.push(`⛔ gate failures — missing mandatory instances (${report.gate_failures.length}):`);
    for (const g of report.gate_failures) out.push(`  • ${g.surface}/${g.file}: missing ${g.missingClass}`);
    out.push('');
  }
  if (report.warnings && report.warnings.length) {
    const W = report.warnings;
    const byKind = {};
    for (const w of W) byKind[w.kind] = (byKind[w.kind] || 0) + 1;
    out.push(`⚠ data-hygiene warnings (${W.length}, non-gating): ${Object.entries(byKind).map(([k, n]) => `${k}×${n}`).join(', ')}`);
    const SHOWN = 15;
    for (const w of W.slice(0, SHOWN)) {
      if (w.kind === 'unresolvable-rule-index') out.push(`  • unresolvable-rule-index  ${w.file}  ${w.compendium}::${w.rule_index}`);
      else if (w.kind === 'non-enum-verdict') out.push(`  • non-enum-verdict  ${w.file}  ${w.compendium}::${w.rule_index} = "${w.verdict}"`);
      else if (w.kind === 'duplicate-rule-index') out.push(`  • duplicate-rule-index  ${w.file}  ${w.compendium}::${w.rule_index} ×${w.count} (judgments crammed onto one index)`);
      else if (w.kind === 'unknown-compendium') out.push(`  • unknown-compendium  ${w.file}  "${w.compendium}" (not in the rule namespace)`);
      else out.push(`  • ${w.kind}  ${w.file}`);
    }
    if (W.length > SHOWN) out.push(`  … and ${W.length - SHOWN} more (use --json for the full list)`);
    out.push('');
  }
  for (const [sk, sr] of Object.entries(report.surfaces)) {
    out.push(`── ${sk} (${sr.files.length} files) ──`);
    for (const f of sr.files) {
      const compStrs = Object.entries(f.compendia).map(([c, v]) => {
        const tag = v.missingClass ? `${c}=NO-INSTANCE` : `${c} ${v.covered}/${v.total} (${pct(v.covered, v.total)})`;
        return tag;
      });
      out.push(`  ${f.slug}`);
      out.push(`    classes: [${f.classesPresent.join(', ') || 'NONE'}]`);
      for (const [c, v] of Object.entries(f.compendia)) {
        const naN = (v.na || []).length;
        if (v.missingClass) { out.push(`    ${c}: NO INSTANCE of {${(f.missingClasses.find(m => m.compendium === c) || {}).needsOneOf?.join('/') || '?'}} → 0/${v.total}${naN ? `  (na-by-design: ${naN})` : ''}`); continue; }
        const applicable = v.total - naN;
        const miss = v.missing.length ? `  HOLES: ${v.missing.join(',')}` : '';
        const naStr = naN ? `  na-by-design: ${v.na.join(',')}` : '';
        out.push(`    ${c}: ${v.covered}/${applicable} applicable ${pct(v.covered, applicable)}${miss}${naStr}`);
      }
    }
    out.push('');
  }
  out.push(`TOTAL real holes (uncovered, applicable rule×file pairs): ${report.total_holes}`);
  out.push(`N/A-by-design (structurally inapplicable — not holes): ${report.total_na_by_surface}`);
  process.stdout.write(out.join('\n') + '\n');
}

if (require.main === module) main();

module.exports = {
  SURFACES,
  parseRules,
  parseFrontmatterEvalClasses,
  extractManifestLectureSlugs,
  verdictedKeys,
  loadCompendia,
  scanInstanceIntegrity,
  naRuleSet,
  splitMissing,
  VERDICT_ENUM,
  CANONICAL_FIELD,
};
