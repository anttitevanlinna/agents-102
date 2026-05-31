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
  lectures: [
    'painting-the-picture-with-the-llm', 'the-wizard-move', 'how-this-training-was-built',
    'when-a-plan-is-good', 'where-the-rule-could-live', 'skills-from-the-frontier',
    'test-and-learn', 'will-company-memory-emerge', 'reading-the-return',
    'learning-through-contrast', 'what-packaging-is', 'the-2-frontiers',
    'story-of-module-6', 'quality-is-grounding', 'steering-the-wiring',
    'composing-the-workflow', 'the-loop-has-a-name', 'agents-that-build-agents',
  ].map(slug => ({ slug, file: `curriculum/lectures/${slug}.md`, instanceSlug: `ae101--${slug}` })),
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

function parseFrontmatterEvalClasses(md) {
  const m = md.match(/eval_classes:\s*\[([^\]]*)\]/);
  if (!m) return [];
  return m[1].split(',').map(s => s.trim()).filter(Boolean).map(normClass);
}

// Parse a compendium's top-level numbered rules: `N. **Lead.**` (incl. 9b/21b).
// Italic "Moved to .." stubs use single * and are intentionally skipped.
function parseRules(md) {
  const re = /^(\d+[a-z]?)\.\s+\*\*(.+?)\*\*/gm;
  const rules = [];
  let m;
  while ((m = re.exec(md)) !== null) {
    rules.push({ id: m[1], lead: m[2].replace(/\s+/g, ' ').trim() });
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

  const report = { generated_for: 'ae101', surfaces: {}, bugs: [], gate_failures: [] };
  let totalHoles = 0;

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
    const canonical = CANONICAL_FIELD[suffix];
    if (canonical && inst.class != null && inst.class !== canonical) {
      report.bugs.push({ kind: 'class-field-drift', file: fname, expected: canonical, got: inst.class });
    }
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
        const instances = mappedClasses
          .map(cls => Object.keys(SUFFIX_TO_CLASS).find(s => SUFFIX_TO_CLASS[s] === cls))
          .map(suffix => suffix && loadInstance(sf.instanceSlug, suffix))
          .filter(Boolean);
        if (instances.length === 0) {
          fileReport.compendia[cname] = { total: C.rules.length, covered: 0, missing: C.rules.map(r => r.id), missingClass: true };
          fileReport.missingClasses.push({ compendium: cname, needsOneOf: mappedClasses });
          totalHoles += C.rules.length;
          continue;
        }
        const keys = verdictedKeys(instances);
        const missing = C.rules.filter(r => !keys.has(`${cname}.md::${r.id}`)).map(r => r.id);
        fileReport.compendia[cname] = { total: C.rules.length, covered: C.rules.length - missing.length, missing };
        totalHoles += missing.length;
      }
      surfaceReport.files.push(fileReport);
    }
    report.surfaces[sk] = surfaceReport;
  }

  report.total_holes = totalHoles;

  if (outPath) { fs.writeFileSync(outPath, JSON.stringify(report, null, 2)); }
  if (asJson) { process.stdout.write(JSON.stringify(report, null, 2) + '\n'); }
  else { printHuman(report, comp); }

  if (gate) {
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
        if (v.missingClass) { out.push(`    ${c}: NO INSTANCE of {${(f.missingClasses.find(m => m.compendium === c) || {}).needsOneOf?.join('/') || '?'}} → 0/${v.total}`); continue; }
        const miss = v.missing.length ? `  missing: ${v.missing.join(',')}` : '';
        out.push(`    ${c}: ${v.covered}/${v.total} ${pct(v.covered, v.total)}${miss}`);
      }
    }
    out.push('');
  }
  out.push(`TOTAL uncovered rule×file pairs: ${report.total_holes}`);
  process.stdout.write(out.join('\n') + '\n');
}

main();
