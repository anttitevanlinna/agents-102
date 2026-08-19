// check-slide-size.test.js — regression gate for the slide-size cap and its
// per-slide accepted-overflow declaration.
//
// The declaration exists because the two blunt alternatives are both bad: a
// file-level exemption hides every OTHER slide in the file, and leaving a slide
// flagged forever trains everyone to scroll past the warning. These tests keep
// the escape hatch honest — an accepted slide must be declared in its own
// maintainer block, and a declaration must not silently cover anything else.

const { test } = require('node:test');
const assert = require('node:assert');
const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.join(__dirname, '..');
const SCRIPT = path.join(__dirname, 'check-slide-size.js');

function run(args = []) {
  try {
    return { code: 0, out: execFileSync('node', [SCRIPT, ...args], { cwd: ROOT, encoding: 'utf8' }) };
  } catch (e) {
    return { code: e.status ?? 1, out: (e.stdout || '') + (e.stderr || '') };
  }
}

// `~NNN  B  header  file` — the report's accepted-overflow marker.
function acceptedRows(reportOut) {
  return reportOut
    .split('\n')
    .filter(l => l.startsWith('~'))
    .map(l => {
      const m = l.match(/^~\s*(\d+)\s+(\d+)\s{2}(.+?)\s{2,}(\S+)\s*$/);
      return m ? { words: +m[1], bullets: +m[2], header: m[3].trim(), file: m[4] } : null;
    })
    .filter(Boolean);
}

// The declaration path has to be exercised against a fixture, not against
// whatever the curriculum happens to hold. Zero accepted slides is the healthy
// state — every slide within the cap and no escape hatch claimed — so a suite
// that needs a live declaration to prove itself goes red exactly when the
// content is at its best, and the pressure lands on re-declaring a slide to
// quiet the tests.
const FIXTURE_DIR = path.join(ROOT, 'tmp', 'slide-size-fixture');
const OVERSIZED = [
  '# Fixture',
  '',
  '## A slide that runs long',
  '',
  ...Array.from({ length: 7 }, (_, i) => `- Bullet ${i + 1} carries a claim and a sentence of mechanism behind it.`),
  ''
].join('\n');

function writeFixture(name, body) {
  fs.mkdirSync(FIXTURE_DIR, { recursive: true });
  const rel = path.join('tmp', 'slide-size-fixture', name);
  fs.writeFileSync(path.join(ROOT, rel), body);
  return rel;
}

test('the accepted-overflow declaration, against a fixture', async (t) => {
  assert.doesNotThrow(
    () => execFileSync('git', ['check-ignore', '-q', 'tmp/'], { cwd: ROOT, stdio: 'ignore' }),
    'tmp/ must be gitignored for these fixtures to be safe to write');
  t.after(() => fs.rmSync(FIXTURE_DIR, { recursive: true, force: true }));

  await t.test('an undeclared oversized slide fails the gate', () => {
    const rel = writeFixture('undeclared.md', OVERSIZED);
    const { code, out } = run(['--file', rel]);
    assert.strictEqual(code, 1, `expected a failure for an undeclared oversized slide:\n${out}`);
    assert.match(out, /A slide that runs long/);
  });

  await t.test('declaring it by exact heading clears the gate and marks the row', () => {
    const rel = writeFixture('declared.md', OVERSIZED +
      '\n<!-- maintainer -->\n**Slide size accepted:** A slide that runs long — the list is the point.\n');
    const gate = run(['--file', rel]);
    assert.strictEqual(gate.code, 0, `expected a declared slide to pass:\n${gate.out}`);

    const rows = acceptedRows(run(['--file', rel, '--report']).out);
    assert.strictEqual(rows.length, 1, 'expected exactly one accepted-overflow row');
    assert.strictEqual(rows[0].header, 'A slide that runs long');
    assert.strictEqual(rows[0].bullets, 7);
  });

  await t.test('a declaration that misses the heading does not suppress it', () => {
    const rel = writeFixture('mismatched.md', OVERSIZED +
      '\n<!-- maintainer -->\n**Slide size accepted:** A slide that runs long! — note the stray punctuation.\n');
    const { code } = run(['--file', rel]);
    assert.strictEqual(code, 1,
      'a near-miss heading must not cover the slide — that is what makes the declaration per-slide');
  });

  await t.test('a declaration outside the maintainer block is not read', () => {
    const rel = writeFixture('above-the-line.md',
      '# Fixture\n\n**Slide size accepted:** A slide that runs long — declared too early.\n' +
      OVERSIZED.replace('# Fixture\n\n', ''));
    const { code } = run(['--file', rel]);
    assert.strictEqual(code, 1,
      'the declaration is a maintainer ruling; body prose must not be able to claim it');
  });
});

// The file set used to be derived purely from what module files LINK to, so a
// module was opened only to harvest its include lines and never measured itself.
// Its own `## Big Idea` / `## Key Concepts` / `## What You'll Learn` / `## Next`
// render as slides under the same one-`##`-one-slide rule and were projected
// unmeasured. Worse than unchecked: the gate reported all-clear over files it
// had never opened. Found 2026-08-12 — the cheap deterministic check had a
// NARROWER net than the expensive slides judge, which is exactly backwards.
test('the derived file set measures module files, not only what they link to', () => {
  const { out } = run(['--report']);
  const files = new Set(
    out.split('\n')
      .map(l => (l.match(/(\S+\.md)\s*$/) || [])[1])
      .filter(Boolean));
  const modules = [...files].filter(f => /^trainings\/[^/]+\/[^/]+\.md$/.test(f));
  assert.ok(modules.length > 0,
    'no module file appears in the report — module `##` sections project as slides ' +
    'and must be measured, not just mined for their include links.\n' +
    `measured files were:\n  ${[...files].join('\n  ')}`);
});

// A runtime-fork slide ships exactly ONE branch — `<!--flag:module:X-->` and
// `<!--flag:no-module:X-->` are alternatives, never both. Measuring the raw
// source glues the branches together and reports a slide no reader ever sees.
// Found 2026-08-12 while triaging the first module-file results: AE101's
// `plan-mode-done-right` `## Next` measured 274 words against a 210 cap purely
// by double-counting its two variants. Cap violations have to be about the
// rendered page, or the gate cries wolf on precisely the files careful enough
// to carry variants — and a check that always fires is a check nobody reads.
test('a runtime-fork slide is measured as one branch, not both glued together', (t) => {
  const FIX = path.join(ROOT, 'tmp', 'slide-size-fixture');
  t.after(() => fs.rmSync(FIX, { recursive: true, force: true }));

  const long = (tag) => Array.from({ length: 40 }, (_, i) => `${tag} word${i}`).join(' ');
  const rel = writeFixture('forked.md', [
    '# Fixture',
    '',
    '## A forked slide',
    '',
    `<!--flag:module:earn-the-trust-->${long('A')}<!--/flag:module:earn-the-trust-->`,
    `<!--flag:no-module:earn-the-trust-->${long('B')}<!--/flag:no-module:earn-the-trust-->`,
    ''
  ].join('\n'));

  const { out } = run(['--file', rel, '--report', '--max-words', '100']);
  const row = out.split('\n').map(l => l.match(/^.?\s*(\d+)\s+\d+\s{2}A forked slide/)).find(Boolean);
  assert.ok(row, `expected a measured row for the forked slide:\n${out}`);
  const words = Number(row[1]);
  assert.ok(words < 120,
    `the forked slide measured ${words} words — both branches were counted. ` +
    'Only one renders, so the measured slide must be roughly one branch (~80), not their sum (~160).');
});

// The SAME defect one construct over. Agents 101 renders three runtimes and hides
// the inactive ones in CSS (`curriculum.css`: `.rt-cli` / `.rt-desktop` / `.rt-cowork`,
// plus `.rt-code` visible on cli OR desktop). A reader is shown exactly one branch,
// so gluing them together measures a page nobody projects. AE101 is Code-only and
// carries none of these wrappers, which is why the flag fix above never reached
// them: the checker had simply never met the construct. Found 2026-08-19 during
// the agents-101 parity pass — `lectures/module-2-prework.md` `## Learn plan mode`
// scored 248 words against a 210 cap, and roughly 100 of those were the branch a
// given reader never sees plus the markup of the wrappers themselves.
test('a runtime-fork slide is measured one runtime at a time', (t) => {
  const FIX = path.join(ROOT, 'tmp', 'slide-size-fixture');
  t.after(() => fs.rmSync(FIX, { recursive: true, force: true }));

  const long = (tag) => Array.from({ length: 40 }, (_, i) => `${tag}word${i}`).join(' ');
  const measure = (rel) => {
    const out = run(['--file', rel, '--report', '--max-words', '1000']).out;
    const row = out.split('\n').map(l => l.match(/^.?\s*(\d+)\s+\d+\s{2}A forked slide/)).find(Boolean);
    assert.ok(row, `expected a measured row for the forked slide:\n${out}`);
    return Number(row[1]);
  };

  const inline = measure(writeFixture('rt-inline.md', [
    '# Fixture', '', '## A forked slide', '',
    `<span class="rt-code">${long('A')}</span><span class="rt-cowork">${long('B')}</span>`, ''
  ].join('\n')));
  assert.ok(inline > 30 && inline < 60,
    `the inline runtime fork measured ${inline} words; expected roughly one 40-word branch. ` +
    'Too high means both branches (and the wrapper markup) were counted. Too low means the ' +
    'whole line was dropped as markup, which under-reports every slide that forks inline.');

  const block = measure(writeFixture('rt-block.md', [
    '# Fixture', '', '## A forked slide', '',
    '<div class="rt-code">', '', long('A'), '', '</div>',
    '<div class="rt-cowork">', '', long('B'), '', '</div>', ''
  ].join('\n')));
  assert.ok(block > 30 && block < 60,
    `the block runtime fork measured ${block} words; expected roughly one 40-word branch.`);

  // Widest branch wins: the cap is a claim that NO projected page is over, so a
  // cowork-only overflow must still fail even when the Code branch is short.
  const rel = writeFixture('rt-widest.md', [
    '# Fixture', '', '## A forked slide', '',
    `<span class="rt-code">short</span><span class="rt-cowork">${long('B')}</span>`, ''
  ].join('\n'));
  assert.strictEqual(run(['--file', rel, '--max-words', '20']).code, 1,
    'a slide that is oversized only in the cowork runtime must still fail — the gate ' +
    'measures the widest branch, not the first one.');
});

test('every oversized slide is either declared or fails the check', () => {
  const { code, out } = run();
  assert.strictEqual(code, 0,
    `check-slide-size exited ${code}. An undeclared slide is over the cap:\n${out}`);
});

// Sweeps whatever the curriculum currently holds. An empty result is a pass:
// the fixture suite above owns proving the mechanism works, so this one is free
// to say nothing when nothing is declared.
test('each accepted slide in the curriculum is declared in its own maintainer block', () => {
  const { out } = run(['--report']);
  const rows = acceptedRows(out);

  for (const r of rows) {
    const abs = path.join(ROOT, 'curriculum', r.file);
    assert.ok(fs.existsSync(abs), `report names a file that does not exist: ${r.file}`);
    const raw = fs.readFileSync(abs, 'utf8');
    const cut = raw.indexOf('<!-- maintainer -->');
    assert.notStrictEqual(cut, -1, `${r.file} has an accepted slide but no maintainer block`);
    const decls = [...raw.slice(cut).matchAll(/^\*\*Slide size accepted:\*\*\s*(.+?)\s*(?:—|--)\s/gm)]
      .map(m => m[1].trim());
    assert.ok(decls.includes(r.header),
      `${r.file}: slide "${r.header}" is treated as accepted but is not declared. Declared: ${JSON.stringify(decls)}`);
  }
});

test('a declaration only covers a slide that is actually over the cap', () => {
  // Guards the marker's meaning: if a declared heading stops being oversized
  // (someone trimmed it anyway), the declaration is dead weight and should be
  // removed rather than left to cover a future regression silently.
  const { out } = run(['--report']);
  const accepted = acceptedRows(out);
  for (const r of accepted) {
    assert.ok(r.words > 210 || r.bullets > 6,
      `${r.file}: "${r.header}" carries an accepted-overflow declaration but is within limits (${r.words}w, ${r.bullets} bullets) — drop the declaration`);
  }
});

// A bare path argument is a mistake worth stopping on. The training scan covers
// modules plus the files they include; reference and supplementary pages are
// outside it, so `check-slide-size.js some/page.md` used to ignore the path and
// report a clean training — a pass that says nothing about the page asked about.
test('a positional path argument is refused, not ignored', () => {
  const r = run(['curriculum/trainings/agentic-engineering-101/reference/prompt-anatomy.md']);
  assert.notStrictEqual(r.code, 0, 'a bare path must not exit 0');
  assert.match(r.out, /--file/, 'the error must name the flag that does what was meant');
});

test('--file reaches a page the training scan does not cover', () => {
  const page = 'curriculum/trainings/agentic-engineering-101/reference/prompt-anatomy.md';
  const scan = run(['--report']);
  assert.doesNotMatch(scan.out, /prompt-anatomy/, 'reference pages are outside the training scan');
  // Assert on the scan scope, not on findings: a clean page lists no rows, so
  // matching the filename would only pass while the page happened to be over cap.
  const one = run(['--file', page]);
  assert.match(one.out, /files:\s*1\b/, '--file must measure exactly the one page it is handed');
});
