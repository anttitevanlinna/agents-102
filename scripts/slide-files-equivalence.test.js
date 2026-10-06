#!/usr/bin/env node
'use strict';
// Cutting slides into curriculum/slides/ changes nothing any reader sees. A
// sandbox copy of the repo runs every non-eval reader, extract-slide.js cuts
// every ## slide out of context-is-king (Agents 101 owns it; Claude Basics
// borrows four by #id), and the readers run again. Each output must be
// identical. A reader that reads lecture files raw instead of through
// read-curriculum.js shows up here as a diff, not as a quiet miscount.
// (Eval readers — scan-stale-classes, expand-md's judge view, prefill,
// audit-eval-coverage — are the eval layer's, tested there.)
//
// Run: node --test scripts/slide-files-equivalence.test.js
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

const REPO = path.resolve(__dirname, '..');
const CORE = process.env.AGENTS_CORE_DIR || path.join(REPO, '..', 'agents-102-core');
const LECTURE = 'lectures/context-is-king.md';
const TRAININGS = ['agents-101', 'claude-basics'];

const READERS = [
  ['render-md', ['scripts/render-md.js', `curriculum/${LECTURE}`]],
  ['render-md borrower', ['scripts/render-md.js', 'curriculum/trainings/claude-basics/personal-site-with-guardrails.md']],
  ['slide-card', ['scripts/slide-card.js', LECTURE]],
  ['check-include-anchors', ['scripts/check-include-anchors.js', '--report']],
  ['check-cross-doc-anchors', ['scripts/check-cross-doc-anchors.js']],
  ...TRAININGS.flatMap(t => [
    [`calculate-time ${t}`, ['scripts/calculate-time.js', '--training', t]],
    [`check-slide-size ${t}`, ['scripts/check-slide-size.js', '--report', '--training', t]],
    [`check-slide-tiers ${t}`, ['scripts/check-slide-tiers.js', '--report', '--training', t]],
    [`check-slide-deixis ${t}`, ['scripts/check-slide-deixis.js', '--report', '--training', t]],
    [`check-slide-numbering ${t}`, ['scripts/check-slide-numbering.js', '--report', '--training', t]],
  ]),
];

function sandbox() {
  const d = fs.mkdtempSync(path.join(os.tmpdir(), 'slide-eq-'));
  for (const p of ['curriculum', 'scripts', 'site', 'package.json']) {
    fs.cpSync(path.join(REPO, p), path.join(d, p), { recursive: true, filter: s => !s.includes(`${path.sep}clients${path.sep}`) });
  }
  fs.cpSync(path.join(REPO, '.claude', 'skills'), path.join(d, '.claude', 'skills'), { recursive: true, dereference: true });
  fs.symlinkSync(path.join(REPO, 'node_modules'), path.join(d, 'node_modules'));
  // Tarball builds list tracked files: the sandbox is its own repository.
  spawnSync('sh', ['-c', 'git init -q && git add -A && git -c user.email=t@t -c user.name=t commit -qm sandbox'], { cwd: d });
  return d;
}

function runAll(d) {
  const env = { ...process.env, AGENTS_CORE_DIR: CORE, AGENTS_OUTPUT_DIR: path.join(d, 'out') };
  const out = {};
  // A line number into a file moves when the file is cut; what is at it does not.
  const scrub = s => s.split(d).join('<SB>').replace(/(\.md):\d+/g, '$1:N').replace(/pid: \d+/g, 'pid: N');
  for (const [name, args] of READERS) {
    const r = spawnSync('node', args, { cwd: d, env, encoding: 'utf8' });
    out[name] = scrub(`exit ${r.status}\n${r.stdout}\n${r.stderr}`);
  }
  for (const t of TRAININGS) {
    fs.rmSync(path.join(d, 'out'), { recursive: true, force: true });
    const r = spawnSync('node', ['scripts/build-workbook.js', 'eqtest', t], { cwd: d, env, encoding: 'utf8' });
    out[`build ${t}`] = `exit ${r.status}\n${scrub(r.stderr)}`;
    if (r.status !== 0) console.error(`build ${t} failed:\n${r.stderr.split('\n').filter(l => !/^\s+at /.test(l)).slice(0, 8).join('\n')}`);
    const root = path.join(d, 'out', 'eqtest');
    const walk = dir => fs.existsSync(dir) ? fs.readdirSync(dir, { withFileTypes: true }).flatMap(e =>
      e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]) : [];
    for (const f of walk(root).filter(f => f.endsWith('.html')).sort()) {
      out[`build ${t} ${path.relative(root, f)}`] = scrub(fs.readFileSync(f, 'utf8'));
    }
  }
  return out;
}

test('every reader sees the same thing after context-is-king is cut into slide files', { timeout: 600000 }, () => {
  const d = sandbox();
  try {
    const before = runAll(d);
    const lec = fs.readFileSync(path.join(d, 'curriculum', LECTURE), 'utf8');
    const ids = lec.split('<!-- maintainer -->')[0].match(/<!--slide:([a-z0-9-]+)-->/g).map(m => m.slice(10, -3)).filter(i => i !== 'cover');
    assert.ok(ids.length >= 5, `expected context-is-king's five slides, found ${ids}`);
    const x = spawnSync('node', ['scripts/extract-slide.js', `${LECTURE}#${ids.join(',')}`], { cwd: d, encoding: 'utf8' });
    assert.equal(x.status, 0, x.stderr);
    assert.match(fs.readFileSync(path.join(d, 'curriculum', LECTURE), 'utf8'), /^\[[^\]]+\]\(slides\/same-question-two-answers\.md\)$/m);
    const after = runAll(d);
    const differ = Object.keys(before).filter(k => before[k] !== after[k]);
    for (const k of differ) {
      const a = before[k].split('\n'), b = (after[k] || '(missing)').split('\n');
      const i = a.findIndex((l, n) => l !== b[n]);
      console.error(`--- ${k} first differs at line ${i + 1}:\n  before: ${(a[i] || '').slice(0, 200)}\n  after:  ${(b[i] || '').slice(0, 200)}`);
    }
    assert.deepEqual(differ, [], `readers whose output changed: ${differ.join(', ')}`);
    assert.deepEqual(Object.keys(after).sort(), Object.keys(before).sort(), 'the build produced a different set of pages');
    assert.ok(Object.keys(before).some(k => k.startsWith('build agents-101 ') && before[k].includes('Same question, two answers')), 'the agents-101 build must carry the cut lecture');
  } finally {
    fs.rmSync(d, { recursive: true, force: true });
  }
})
