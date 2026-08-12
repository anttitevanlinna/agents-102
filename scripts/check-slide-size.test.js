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
