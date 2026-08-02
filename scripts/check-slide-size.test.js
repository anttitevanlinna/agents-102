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

test('every oversized slide is either declared or fails the check', () => {
  const { code, out } = run();
  assert.strictEqual(code, 0,
    `check-slide-size exited ${code}. An undeclared slide is over the cap:\n${out}`);
});

test('each accepted slide is declared in its own maintainer block, by exact heading', () => {
  const { out } = run(['--report']);
  const rows = acceptedRows(out);
  assert.ok(rows.length > 0, 'expected at least one accepted-overflow slide to exercise this path');

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
