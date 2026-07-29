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

const { expandPrompts, moduleOrdinal, moduleNumber, TRAININGS } = require('../site/layouts/curriculum.js');
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
 *     lectures plus slim exercise-summary metadata. Theory uses the SAME
 *     pipeline as the workbook (same phase sections, H1s, and SVG survival).
 *   - No full exercise body, no maintainer-fence content, each theory doc
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

  await t.test('renders twelve slim exercise summaries, not exercise bodies', () => {
    const cards = [...handbook.matchAll(
      /<section class="exercise-summary" id="exercise-summary-([a-z0-9-]+)">([\s\S]*?)<\/section>/g
    )];
    assert.equal(cards.length, 12, 'expected one compact card for each in-class exercise');

    for (const [, slug, card] of cards) {
      assert.equal((card.match(/<h2>/g) || []).length, 1, `${slug}: expected one h2`);
      assert.equal((card.match(/<p>/g) || []).length, 1, `${slug}: expected one paragraph`);
      assert.doesNotMatch(card, /<pre\b|<ol\b|<ul\b|<h3\b|<h4\b/,
        `${slug}: compact card leaked exercise structure`);

      const paragraph = (card.match(/<p>([\s\S]*?)<\/p>/) || [])[1] || '';
      const plain = paragraph.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
      const words = plain.match(/\b[\p{L}\p{N}][\p{L}\p{N}'’.-]*\b/gu) || [];
      assert.ok(words.length >= 35 && words.length <= 45,
        `${slug}: expected 35–45 words, got ${words.length}`);
    }

    assert.doesNotMatch(handbook, /class="phase phase--exercise"/);
    assert.doesNotMatch(handbook, /Phase 1: Bring a real task/);
    // …while the same full exercise IS in the workbook (sentinel is live).
    assert.match(workbook, /id="exercises-push-back-on-the-plan"/);
  });

  await t.test('places exercise summaries at their lived points in the theory arc', () => {
    const markers = [
      'id="lectures-the-wizard-move"',
      'id="exercise-summary-orient-and-introspect"',
      'id="exercise-summary-fix-tests-first"',
      'id="exercise-summary-compound-and-close"',
      'id="lectures-the-machine-you-just-met"',
      'id="lectures-when-a-plan-is-good"',
      'id="exercise-summary-push-back-on-the-plan"',
      'id="exercise-summary-extract-the-task-shaping-rule"',
      'id="lectures-where-the-rule-could-live"',
      'id="exercise-summary-open-the-side-quest"',
      'id="lectures-skills-from-the-frontier"',
      'id="exercise-summary-map-the-access-surface"',
      'id="exercise-summary-threat-model-with-stride"',
      'id="exercise-summary-author-test-strategy-skill"',
      'id="lectures-the-loop-half-filled"',
      'id="lectures-test-and-learn"',
      'id="exercise-summary-walk-and-send-off"',
      'id="lectures-ironies-of-automation"',
      'id="lectures-learning-through-contrast"',
      'id="exercise-summary-diagnose-and-resend"',
      'id="lectures-what-packaging-is"',
      'id="lectures-quality-is-grounding"',
      'id="exercise-summary-spot-gaps-build-the-loop"',
      'id="lectures-composing-the-workflow"',
    ];

    let cursor = -1;
    for (const marker of markers) {
      const next = handbook.indexOf(marker);
      assert.ok(next > cursor, `expected marker in order: ${marker}`);
      cursor = next;
    }

    assert.doesNotMatch(handbook, /exercise-summary-close-the-ticket/);
    assert.doesNotMatch(handbook, /exercise-summary-read-the-ticket-rules/);
  });

  await t.test('excludes maintainer-fence content', () => {
    assert.doesNotMatch(handbook, /<!-- maintainer -->/);
    // Distinctive string from the-whole-map's maintainer tail.
    assert.doesNotMatch(handbook, /Artifact contract \(Family B\)/);
  });

  await t.test('does not leak unresolved conditional branches', () => {
    assert.doesNotMatch(
      handbook,
      /<!--flag:/,
      'theory handbook must resolve or avoid conditional content branches'
    );
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

// The workbook's contents nav holds two kinds of list: the plain contents `ol`
// the TOC builder emits, and the module-card `ol`s the runtime builds, which
// print their own ordinal ("01") inside the card. Both are DIRECT children of
// `nav.workbook-toc`, so a descendant-scoped list-style reaches the cards at
// specificity 0,1,1 and beats `.module-list`'s own `list-style: none` at 0,1,0.
// The result is a browser marker "1." sitting beside the card's printed "01" —
// invisible in source, visible on every workbook index.
test('workbook contents list-style does not reach the module cards', () => {
  const css = fs.readFileSync(
    path.join(__dirname, '..', 'site', 'layouts', 'curriculum.css'), 'utf8');
  const rule = css.match(/^\.workbook-toc[^{]*\bol\b[^{]*\{[^}]*list-style[^}]*\}/m);
  assert.ok(rule, 'expected a .workbook-toc list-style rule to exist');
  assert.match(rule[0], /:not\(\.module-list\)/,
    'the rule must exclude .module-list, or module cards get a second marker');
});

// The payload URL used to be hardcoded to one public host in two places. A
// customer publishing on their own estate needs the payload reachable from
// their network, and a host they cannot change is a prework step that fails on
// a managed laptop. It resolves registry-side rather than from a CLI argument,
// on the same reasoning as the content flags: a variant that needs a
// remembered argument ships wrong the first time someone forgets it.
test('payload base URL is registry-resolvable, not hardcoded', () => {
  const src = fs.readFileSync(
    path.join(__dirname, 'build-workbook.js'), 'utf8');
  const literals = src.match(/return `https:\/\/[a-z0-9.-]+\/clients\//g) || [];
  assert.equal(literals.length, 0,
    'payload URL must be built from a configurable base, not a literal host');
  assert.match(src, /payloadBase/,
    'expected a payloadBase hook the registry entry can override');
});

// A cut renders a subset of its parent's modules and those pages go on calling
// themselves "Module 4" in prose. Numbering the cut by position put M3 in the
// nav above a page that said Module 4, so the same token meant two things in
// one build and a stated mapping could not repair it. Numbering from the parent
// keeps one meaning and shows the skipped module as a gap.
test('a variant cut numbers its modules from the parent, not by position', () => {
  const parent = TRAININGS['agentic-engineering-101'].modules.map(m => m.slug);
  const cut = TRAININGS['agentic-engineering-101-northwind'];
  assert.ok(cut.contentKey, 'northwind must resolve content through a parent');
  assert.ok(cut.modules.length < parent.length, 'the fixture must actually be a cut');

  cut.modules.forEach((m) => {
    assert.equal(
      moduleOrdinal('agentic-engineering-101-northwind', m.slug),
      parent.indexOf(m.slug) + 1,
      `${m.slug} must carry its parent ordinal, not its position in the cut`);
  });

  // The concrete regression: sitting 3 is Module 4, and its number is not 3.
  assert.equal(moduleOrdinal('agentic-engineering-101-northwind', 'run-the-first-experiment'), 4);
  assert.equal(moduleNumber('agentic-engineering-101-northwind', 'run-the-first-experiment'), '04');

  // Ordinals in a cut are unique, so two cards never collide on one number.
  const nums = cut.modules.map(m => moduleNumber('agentic-engineering-101-northwind', m.slug));
  assert.equal(new Set(nums).size, nums.length, 'module numbers must be unique within a cut');
});

test('a non-variant training still numbers by position', () => {
  TRAININGS['agentic-engineering-101'].modules.forEach((m, i) => {
    assert.equal(moduleOrdinal('agentic-engineering-101', m.slug), i + 1);
  });
  assert.equal(moduleNumber('agentic-engineering-101', 'prework'), '00');
});

// The nav chip is the surface where the collision was visible. It must read the
// ordinal, not the loop index.
test('workbook top nav chips are built from the inherited ordinal', () => {
  const src = fs.readFileSync(path.join(__dirname, 'build-workbook.js'), 'utf8');
  assert.doesNotMatch(src, /data-target="\$\{m\.slug\}">M\$\{i \+ 1\}/,
    'nav chips must not be numbered by loop position');
  assert.match(src, /moduleOrdinal\(trainingKey, m\.slug\)/,
    'expected the nav chip to resolve its number through moduleOrdinal');
});

/*
 * Personalised theory handbook — `--theory --for "<Name>"`.
 *
 * Contract under test:
 *   - The name lands on the cover (one dedication line) and in the <title>,
 *     HTML-escaped.
 *   - Without --for the handbook is byte-identical to before (no stray
 *     dedication markup, no title change).
 *   - The build REFUSES to write a named copy into a directory git tracks —
 *     that guard is the whole reason a real prospect name can be passed at all.
 */
const VIP_FIXTURE = 'vip-test-fixture';
const VIP_DIR = path.join(ROOT, 'site/clients', VIP_FIXTURE);

test('personalised theory handbook', async (t) => {
  assert.equal(fs.existsSync(VIP_DIR), false,
    `scratch dir already exists: ${VIP_DIR} — refusing to build over it`);
  t.after(() => fs.rmSync(VIP_DIR, { recursive: true, force: true }));

  // The fixture slug must itself be gitignored, or the guard would (correctly)
  // abort and this test would be asserting nothing.
  assert.doesNotThrow(
    () => execSync(`git check-ignore -q site/clients/${VIP_FIXTURE}/`, { cwd: ROOT, stdio: 'ignore' }),
    `site/clients/${VIP_FIXTURE}/ must be gitignored for this test to mean anything`);

  const NAME = 'Ada <Countess> Lovelace';  // angle brackets => escaping is load-bearing
  execSync(
    `node scripts/build-workbook.js ${VIP_FIXTURE} agentic-engineering-101 --theory --for ${JSON.stringify(NAME)}`,
    { cwd: ROOT, stdio: 'pipe' });
  const raw = fs.readFileSync(
    path.join(VIP_DIR, 'agentic-engineering-101/theory-handbook.html'), 'utf8');

  await t.test('dedication line on the cover, escaped', () => {
    assert.match(contentOnly(raw),
      /<h1 class="cover-title">Theory handbook<\/h1>\s*<p class="lede">Prepared for Ada &lt;Countess&gt; Lovelace<\/p>/);
  });

  await t.test('recipient leads the <title> so print/PDF carries it', () => {
    assert.match(raw, /<title>Ada &lt;Countess&gt; Lovelace · [^<]*Theory handbook<\/title>/);
  });

  await t.test('the raw name never appears unescaped', () => {
    assert.doesNotMatch(raw, /Ada <Countess> Lovelace/);
  });
});

test('un-personalised theory handbook is unchanged', async (t) => {
  assert.equal(fs.existsSync(VIP_DIR), false, `scratch dir already exists: ${VIP_DIR}`);
  t.after(() => fs.rmSync(VIP_DIR, { recursive: true, force: true }));

  execSync(`node scripts/build-workbook.js ${VIP_FIXTURE} agentic-engineering-101 --theory`,
    { cwd: ROOT, stdio: 'pipe' });
  const raw = fs.readFileSync(
    path.join(VIP_DIR, 'agentic-engineering-101/theory-handbook.html'), 'utf8');

  assert.doesNotMatch(contentOnly(raw), /Prepared for/);
  assert.match(raw, /<title>[^<]*· Theory handbook<\/title>/);

  // The cover blurb is standing copy — it ships whether or not --for is used.
  assert.match(contentOnly(raw),
    /<p class="cover-blurb">The theory portions of [^<]*distilled into a single doc\. Browse what you find interesting\. Make your own connections to what you already know\.<\/p>/);
});

test('--for refuses to write into a git-tracked customer dir', () => {
  // `acme` is committed to this repo — a named copy there would leak the name.
  let failed = false, stderr = '';
  try {
    execSync('node scripts/build-workbook.js acme agentic-engineering-101 --theory --for "Ada Lovelace"',
      { cwd: ROOT, stdio: 'pipe' });
  } catch (e) {
    failed = true;
    stderr = String(e.stderr || '');
  }
  assert.ok(failed, '--for into a tracked customer dir must abort the build');
  assert.match(stderr, /git does NOT ignore/);
  assert.match(stderr, /vip-<pseudonym>/);
});

test('--for without --theory aborts rather than silently dropping the name', () => {
  let failed = false, stderr = '';
  try {
    execSync(`node scripts/build-workbook.js ${VIP_FIXTURE} agentic-engineering-101 --for "Ada Lovelace"`,
      { cwd: ROOT, stdio: 'pipe' });
  } catch (e) {
    failed = true;
    stderr = String(e.stderr || '');
  }
  assert.ok(failed, '--for without --theory must abort');
  assert.match(stderr, /theory handbook only/);
});
