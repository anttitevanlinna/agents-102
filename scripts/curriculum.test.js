#!/usr/bin/env node
/*
 * Tests for the shared curriculum runtime (site/layouts/curriculum.js) —
 * specifically the {{cut:key|reason}} cut-candidate marker, a reversible
 * gray-out sibling of {{prompt:key}}.
 *
 * Run: node --test scripts/curriculum.test.js
 *
 * Contract under test:
 *   - {{cut:foo|bar}} expands to the SAME prompt block as {{prompt:foo}}, plus a
 *     ⟦CUT:bar⟧ sentinel on the label paragraph (decoratePrompts turns that into
 *     the dim + ribbon at DOM time).
 *   - {{prompt:foo}} behaviour is byte-identical to before (strict superset).
 */

const { test } = require('node:test');
const assert = require('node:assert/strict');
const { execSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const { expandPrompts } = require('../site/layouts/curriculum.js');
const audit = require('../scripts/audit-eval-coverage.js');

test('expandPrompts: {{cut:foo|bar}} emits the prompt block with a ⟦CUT:bar⟧ sentinel', () => {
  const out = expandPrompts('{{cut:foo|bar}}', { foo: { text: 'x' } });
  assert.match(out, /⟦CUT:bar⟧/);
  assert.match(out, /\*\*Prompt\*\*/);   // still the canonical prompt block
  assert.match(out, /```\nx\n```/);       // registry body is retained verbatim
});

test('expandPrompts: {{cut:foo}} without a reason emits a bare ⟦CUT⟧ (no colon)', () => {
  const out = expandPrompts('{{cut:foo}}', { foo: { text: 'x' } });
  assert.match(out, /⟦CUT⟧/);
  assert.doesNotMatch(out, /⟦CUT:/);
});

test('expandPrompts: {{prompt:foo}} is unchanged — no CUT sentinel', () => {
  const out = expandPrompts('{{prompt:foo}}', { foo: { text: 'x' } });
  assert.match(out, /\*\*Prompt\*\* \*\(Claude Code\)\*/);
  assert.match(out, /```\nx\n```/);
  assert.doesNotMatch(out, /⟦CUT/);
});

test('expandPrompts: strict mode throws on an unknown {{cut:}} key', () => {
  assert.throws(
    () => expandPrompts('{{cut:missing|why}}', { foo: { text: 'x' } }, { strict: true }),
    /unresolved .*missing/
  );
});

test('expandPrompts: {{covered:slug#anchor}} pair wraps the span in a covered-region div', () => {
  const md = 'before\n\n{{covered:when-a-plan-is-good#two-reads-paired}}\n\nsome *prose* here\n\n{{/covered}}\n\nafter';
  const out = expandPrompts(md, {});
  assert.match(out, /<div class="covered-region" data-covered-by="when-a-plan-is-good#two-reads-paired">/);
  assert.match(out, /<\/div>/);
  assert.match(out, /some \*prose\* here/);   // content between markers untouched
});

test('expandPrompts: {{covered:slug}} without an anchor keeps the bare slug', () => {
  const out = expandPrompts('{{covered:some-lecture}}\n\nx\n\n{{/covered}}', {});
  assert.match(out, /data-covered-by="some-lecture"/);
});

test('expandPrompts: strict mode throws on an unbalanced covered region', () => {
  assert.throws(
    () => expandPrompts('{{covered:a#b}}\n\nx', {}, { strict: true }),
    /unbalanced .*covered/
  );
});

/*
 * ── Bug 1: compendium eval_classes frontmatter parse ────────────────────────
 * The coverage audit reported "NO INSTANCE" for every lecture on check_writing
 * and check_lectures because those compendia declare eval_classes as a
 * multi-line YAML list (`eval_classes:\n  - writing`), a shape the original
 * inline-bracket-only regex parsed to []. The parser must accept BOTH the
 * inline `[a, b]` shape (check_student_facing, check_strategy_tie_in) and the
 * multi-line list shape (check_writing, check_lectures, check_pedagogy, …).
 */
test('parseFrontmatterEvalClasses: inline bracket shape (regression)', () => {
  assert.deepEqual(
    audit.parseFrontmatterEvalClasses('eval_classes: [strategy, writing, storytelling]'),
    ['strategy', 'writing', 'story']   // storytelling → story via normClass
  );
});

test('parseFrontmatterEvalClasses: multi-line YAML list shape is parsed (bug 1)', () => {
  const fm = [
    '---',
    'metadata: ',
    '  eval_classes: ',
    '    - writing',
    '  originSessionId: abc',
    '---',
    '# body',
  ].join('\n');
  assert.deepEqual(audit.parseFrontmatterEvalClasses(fm), ['writing']);
});

test('parseFrontmatterEvalClasses: multi-line list with several items, storytelling normalized (bug 1)', () => {
  const fm = [
    'metadata: ',
    '  eval_classes: ',
    '    - pedagogy',
    '    - storytelling',
    '    - technical',
    '  originSessionId: abc',
  ].join('\n');
  assert.deepEqual(audit.parseFrontmatterEvalClasses(fm), ['pedagogy', 'story', 'technical']);
});

/*
 * ── Bug 2: manifest extraction quote-agnosticism ────────────────────────────
 * theoryManifestLectures() and the drift-guard test below both extracted
 * 'lectures/<slug>' with a single-quote-only regex; a double-quoted manifest
 * entry would be invisible to BOTH sides (a shared blind spot, not a mismatch
 * the guard could catch). Extraction must accept single AND double quotes.
 */
test('extractManifestLectureSlugs: catches double-quoted entries (bug 2)', () => {
  const block = [
    'const THEORY_HANDBOOK_MANIFEST = {',
    "  a: ['lectures/single-quoted'],",
    '  b: ["lectures/double-quoted"],',
    "  c: ['lectures/single-quoted'],",   // dupe collapses
    '};',
  ].join('\n');
  const slugs = audit.extractManifestLectureSlugs(block);
  assert.ok(slugs.includes('double-quoted'), 'double-quoted entry must be extracted');
  assert.ok(slugs.includes('single-quoted'), 'single-quoted entry must still be extracted');
  assert.equal(slugs.filter(s => s === 'single-quoted').length, 1, 'duplicates collapse');
});

/*
 * ── Eval-coverage surface ↔ theory manifest drift guard ─────────────────────
 * audit-eval-coverage.js must audit every module-wired lecture in
 * build-workbook.js THEORY_HANDBOOK_MANIFEST — a green coverage run that
 * skips a manifest lecture is a silent hole. Manifest extraction here is
 * deliberately independent of the audit's own derivation (same regex,
 * different call site): a broken parse on either side surfaces as a
 * mismatch, never a vacuous pass.
 */
test('eval-coverage lecture surface includes every THEORY_HANDBOOK_MANIFEST lecture', () => {
  const src = fs.readFileSync(path.resolve(__dirname, 'build-workbook.js'), 'utf8');
  const block = src.match(/const THEORY_HANDBOOK_MANIFEST = \{[\s\S]*?\n\};/);
  assert.ok(block, 'THEORY_HANDBOOK_MANIFEST not found in scripts/build-workbook.js');
  const manifestLectures = [...new Set(
    [...block[0].matchAll(/['"]lectures\/([a-z0-9-]+)['"]/g)].map(m => m[1])
  )];
  // Parse sanity: newest lecture present + plausible count, so an empty match
  // can never green-light the assertion below.
  assert.ok(manifestLectures.includes('the-map-filled-in'), 'manifest parse sanity failed: the-map-filled-in not extracted');
  assert.ok(manifestLectures.length >= 18, `manifest parse sanity failed: only ${manifestLectures.length} lectures extracted`);

  const audit = require('../scripts/audit-eval-coverage.js');
  const surface = new Set(((audit.SURFACES || {}).lectures || []).map(l => l.slug));
  const missing = manifestLectures.filter(s => !surface.has(s));
  assert.deepEqual(missing, [], `manifest lectures absent from eval-coverage surface: ${missing.join(', ')}`);
});

/*
 * ── THEORY_HANDBOOK_MANIFEST ↔ module include-order drift guard ──────────────
 * The manifest calls itself "Grouped by module beat". That promise is only
 * kept if each module's lecture entries in the manifest appear in the SAME
 * order the module file inlines them. Concretely: the manifest's lecture slugs
 * for module Mx must be a SUBSEQUENCE of Mx's standalone lecture-include order
 * in the module file.
 *
 * Subsequence, not equality — a module may inline a lecture the theory manifest
 * deliberately omits (e.g. story-of-module-6 is the M6 opener memo, kept in the
 * module but excluded from the theory manifest). And dual-wired lectures
 * (reading-the-return: M4 close + M5 open) sit in the manifest block of their
 * owning module (M4) but are only a STANDALONE include in the sibling (M5);
 * those are validated by presence-somewhere, not by position in this block's
 * module.
 */
test('THEORY_HANDBOOK_MANIFEST lecture order is a subsequence of each module file include order', () => {
  const AE = 'agentic-engineering-101';
  const MODULE_FILES = {
    M1: 'getting-going.md',
    M2: 'plan-mode-done-right.md',
    M3: 'earn-the-trust.md',
    M4: 'run-the-first-experiment.md',
    M5: 'learn-from-the-test.md',
    M6: 'spot-gaps-build-the-loop.md',
  };
  const trainingDir = path.resolve(__dirname, '..', 'curriculum/trainings', AE);

  // A module's lecture beats = whole-line markdown links to lectures/<slug>.md.
  // Inline prose references (e.g. "Before you close: read [x](lectures/x.md).")
  // are NOT beats and are excluded by the line-anchored regex — only the
  // standalone include lines carry beat placement.
  const includeOrder = {};   // module -> [slug, …] in file order
  const slugToModule = {};   // slug -> the module that STANDALONE-includes it
  for (const [mod, file] of Object.entries(MODULE_FILES)) {
    const text = fs.readFileSync(path.join(trainingDir, file), 'utf8');
    const slugs = [];
    for (const line of text.split('\n')) {
      const m = line.match(/^\[[^\]]*\]\(lectures\/([a-z0-9-]+)\.md\)$/);
      if (m) { slugs.push(m[1]); slugToModule[m[1]] = mod; }
    }
    includeOrder[mod] = slugs;
  }

  // Parse the manifest into per-module lecture-slug lists (supplementary/
  // entries are pre-read appends, not beats — the lecture-only regex drops them).
  const src = fs.readFileSync(path.resolve(__dirname, 'build-workbook.js'), 'utf8');
  const block = src.match(/const THEORY_HANDBOOK_MANIFEST = \{[\s\S]*?\n\};/);
  assert.ok(block, 'THEORY_HANDBOOK_MANIFEST not found in scripts/build-workbook.js');
  const groupRe = /\[\s*'(M\d)'\s*,\s*\[([\s\S]*?)\]\s*\]/g;
  const manifestByModule = {};
  let g;
  while ((g = groupRe.exec(block[0]))) {
    manifestByModule[g[1]] =
      [...g[2].matchAll(/['"]lectures\/([a-z0-9-]+)['"]/g)].map(x => x[1]);
  }
  assert.deepEqual(
    Object.keys(manifestByModule).sort(),
    Object.keys(MODULE_FILES).sort(),
    'manifest module keys must match the six AE-101 module files'
  );

  const isSubsequence = (sub, seq) => {
    let i = 0;
    for (const s of seq) if (i < sub.length && s === sub[i]) i++;
    return i === sub.length;
  };

  for (const mod of Object.keys(MODULE_FILES)) {
    // Partition manifest lectures into ones this module owns (position-checked)
    // and dual-wired ones that live in a sibling module (presence-checked).
    const own = [];
    for (const slug of manifestByModule[mod]) {
      const home = slugToModule[slug];
      assert.ok(
        home,
        `manifest ${mod} lists lectures/${slug} but no AE-101 module file standalone-includes it`
      );
      if (home === mod) own.push(slug);
      // else: dual-wired — its beat order is checked in module ${home}, not here.
    }
    assert.ok(
      isSubsequence(own, includeOrder[mod]),
      `manifest ${mod} lecture order ${JSON.stringify(own)} is not a subsequence of ` +
      `${MODULE_FILES[mod]} include order ${JSON.stringify(includeOrder[mod])}`
    );
  }
});

/*
 * ── Theory handbook build ───────────────────────────────────────────────────
 * Integration tests against the real build pipeline: build a scratch customer
 * (normal workbook first, then `--theory`), assert on the emitted HTML, remove
 * only the scratch leaf these tests created.
 *
 * Contract under test:
 *   - `--theory` emits site/clients/<c>/<t>/theory-handbook.html: theory
 *     lectures only, rendered by the SAME pipeline as the workbook (same
 *     phase--lecture sections, same H1s, same inline SVG survival).
 *   - No exercise content, no maintainer-fence content, each manifest doc
 *     exactly once (dual-wired lectures collapse to their owning module).
 *   - The normal build is unaffected: exercises still render, and it does not
 *     emit a theory-handbook.html.
 */

const ROOT = path.resolve(__dirname, '..');
const FIXTURE_CUSTOMER = 'theory-test-fixture';
const FIXTURE_DIR = path.join(ROOT, 'site/clients', FIXTURE_CUSTOMER);

// Strip inline <script>/<style> before content assertions — same move as the
// build's own post-render audit. SPA_JS/CSS ride inside every page and mention
// words the exclusion tests would otherwise trip on.
function contentOnly(html) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '');
}

test('theory handbook build', async (t) => {
  assert.equal(
    fs.existsSync(FIXTURE_DIR), false,
    `scratch dir already exists: ${FIXTURE_DIR} — refusing to build over it`
  );
  t.after(() => fs.rmSync(FIXTURE_DIR, { recursive: true, force: true }));

  const trainingDir = path.join(FIXTURE_DIR, 'agentic-engineering-101');
  const theoryFile = path.join(trainingDir, 'theory-handbook.html');

  execSync(`node scripts/build-workbook.js ${FIXTURE_CUSTOMER} agentic-engineering-101`, { cwd: ROOT, stdio: 'pipe' });
  const theoryEmittedByNormalBuild = fs.existsSync(theoryFile);
  execSync(`node scripts/build-workbook.js ${FIXTURE_CUSTOMER} agentic-engineering-101 --theory`, { cwd: ROOT, stdio: 'pipe' });

  const handbookRaw = fs.readFileSync(theoryFile, 'utf8');
  const handbook = contentOnly(handbookRaw);
  const workbook = contentOnly(fs.readFileSync(path.join(trainingDir, 'index.html'), 'utf8'));

  await t.test('contains theory lecture H1s rendered by the normal pipeline', () => {
    // Same section wrapper + heading-id shape the workbook's include pipeline emits.
    assert.match(handbook, /<section class="phase phase--lecture" id="lectures-the-whole-map">/);
    assert.match(handbook, /<h1 id="the-whole-map">The whole map<\/h1>/);
    assert.match(handbook, /id="lectures-the-agent-loop"/);            // newly promoted lecture
    assert.match(handbook, /id="supplementary-backpressure"/);        // supplementary theory page
    assert.match(handbook, /Theory handbook/);                        // handbook chrome title
  });

  await t.test('each included doc appears exactly once (dual-wired lectures collapse)', () => {
    const ids = handbook.match(/<section class="phase phase--lecture" id="(?:lectures|supplementary)-[a-z0-9-]+">/g) || [];
    assert.ok(ids.length > 0, 'no lecture sections found in theory handbook');
    const seen = new Set();
    for (const id of ids) {
      assert.ok(!seen.has(id), `duplicate section in theory handbook: ${id}`);
      seen.add(id);
    }
    // Dual-wired across modules in the workbook — exactly once here.
    assert.equal((handbook.match(/id="lectures-reading-the-return"/g) || []).length, 1);
    assert.equal((handbook.match(/id="lectures-the-loop-has-a-name"/g) || []).length, 1);
  });

  await t.test('excludes exercise content', () => {
    assert.doesNotMatch(handbook, /id="exercises-/);
    assert.doesNotMatch(handbook, /Push back<\/em> on the plan/);
    // …while the same exercise IS in the workbook (sentinel is live).
    assert.match(workbook, /id="exercises-push-back-on-the-plan"/);
  });

  await t.test('excludes maintainer-fence content', () => {
    assert.doesNotMatch(handbook, /<!-- maintainer -->/);
    // Distinctive string from the-whole-map's maintainer tail.
    assert.doesNotMatch(handbook, /Artifact contract \(Family B\)/);
  });

  await t.test('the whole-map inline SVG survives', () => {
    assert.match(handbook, /<svg viewBox="0 0 1200 560"/);
  });

  await t.test('normal workbook build is unaffected', () => {
    assert.equal(theoryEmittedByNormalBuild, false, 'normal build must not emit theory-handbook.html');
    assert.match(workbook, /id="lectures-the-whole-map"/);
    assert.match(workbook, /id="exercises-push-back-on-the-plan"/);
    // Prompt blocks still render in both artifacts (same expander pipeline).
    assert.match(handbook, /<strong>Prompt<\/strong>/);
    assert.match(workbook, /<strong>Prompt<\/strong>/);
  });
});
