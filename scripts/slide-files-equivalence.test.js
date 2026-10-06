#!/usr/bin/env node
'use strict';
// Cutting slides into curriculum/slides/ changes nothing any reader sees. A
// sandbox copy of the repo runs every non-eval reader, extract-slide.js cuts
// every ## slide out of lectures that are still whole (picked from the corpus:
// at least one with a backing block, at least one with tier markers), and the
// readers run again. Each output must be
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
const TRAININGS = ['agents-101', 'claude-basics', 'agentic-engineering-101'];

// Two lectures with two or more ## slide ids, between them carrying a backing
// block and tier markers. A lecture already cut on main is rebuilt whole in the
// sandbox (its slide files inlined back, then deleted) and cut again, so the
// test keeps its subjects as the corpus moves to slide files. A cut lecture
// qualifies only when no other file includes its slide files.
const PREFER = ['lectures/grounded.md', 'lectures/the-machine-you-just-met.md'];
const { readCurriculumMd } = require('./read-curriculum.js');
const CRT = require('../site/layouts/curriculum.js');
function pick(root) {
  const cur = path.join(root, 'curriculum');
  const includers = {};
  const walk = dir => fs.readdirSync(dir, { withFileTypes: true }).forEach(e => {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { if (!['evals', 'slides'].includes(e.name)) walk(p); return; }
    if (!e.name.endsWith('.md')) return;
    for (const m of CRT.stripMaintainerTail(fs.readFileSync(p, 'utf8')).matchAll(new RegExp(CRT.SLIDE_FILE_RE.source, 'gm'))) {
      (includers[m[2]] = includers[m[2]] || []).push(path.relative(cur, p));
    }
  });
  walk(cur);
  const info = f => {
    const rel = `lectures/${f}`, raw = fs.readFileSync(path.join(cur, rel), 'utf8');
    const whole = readCurriculumMd(path.join(cur, rel)), body = whole.split('<!-- maintainer -->')[0];
    const ids = (body.match(/<!--slide:([a-z0-9-]+)-->/g) || []).map(m => m.slice(10, -3)).filter(i => i !== 'cover');
    const cutIds = [...CRT.stripMaintainerTail(raw).matchAll(new RegExp(CRT.SLIDE_FILE_RE.source, 'gm'))].map(m => m[2]);
    const shared = cutIds.some(i => (includers[i] || []).some(r => r !== rel));
    return { rel, ids, cutIds, backing: raw.includes('<!-- backing -->'), tiers: /<!--tier:/.test(body), shared };
  };
  const all = fs.readdirSync(path.join(cur, 'lectures')).filter(f => f.endsWith('.md')).map(info).filter(l => l.ids.length >= 2 && !l.shared);
  const rank = l => (PREFER.indexOf(l.rel) + 1 || 99) * 2 + (l.cutIds.length ? 1 : 0);
  return all.sort((a, b) => rank(a) - rank(b)).slice(0, 2);
}
const LECTURES = pick(REPO);

// Rebuild a cut lecture whole in the sandbox: the inlined text back in place,
// its slide files gone. (Notes that moved to a slide file go with it; the
// readers compare like with like, before and after the re-cut.)
function rebuildWhole(d, l) {
  if (!l.cutIds.length) return;
  const abs = path.join(d, 'curriculum', l.rel);
  fs.writeFileSync(abs, readCurriculumMd(abs));
  for (const i of l.cutIds) fs.rmSync(path.join(d, 'curriculum', 'slides', i + '.md'));
}

const READERS = [
  ...LECTURES.map(l => [`render-md ${l.rel}`, ['scripts/render-md.js', `curriculum/${l.rel}`]]),
  ...LECTURES.filter(l => l.backing).map(l => [`validate-backing ${l.rel}`, ['scripts/validate-backing.js', `curriculum/${l.rel}`]]),
  ['render-md borrower', ['scripts/render-md.js', 'curriculum/trainings/claude-basics/personal-site-with-guardrails.md']],
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
  for (const p of ['curriculum', 'scripts', 'site', 'content', 'package.json']) {
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
  // Intended deltas, and only these: a moved keyed note leaves the lecture's
  // maintainer tail (render-md prints the tail), and the include check's report
  // gains a slide-file count line.
  const intended = (name, s) => name.startsWith('render-md lectures/') ? s.split('<!-- maintainer -->')[0]
    : name === 'check-include-anchors' ? s.replace(/\nslide files: \d+ included\n/, '').replace(/^WARN slides\/.*\n/gm, '') : s;
  const scrub = s => s.split(d).join('<SB>').replace(/(\.md):\d+/g, '$1:N').replace(/pid: \d+/g, 'pid: N');
  for (const [name, args] of READERS) {
    const r = spawnSync('node', args, { cwd: d, env, encoding: 'utf8' });
    out[name] = intended(name, scrub(`exit ${r.status}\n${r.stdout}\n${r.stderr}`));
  }
  for (const t of [...TRAININGS, 'agentic-engineering-101 --theory']) {
    fs.rmSync(path.join(d, 'out'), { recursive: true, force: true });
    const r = spawnSync('node', ['scripts/build-workbook.js', 'eqtest', ...t.split(' ')], { cwd: d, env, encoding: 'utf8' });
    out[`build ${t}`] = `exit ${r.status}\n${scrub(r.stderr)}`;
    if (r.status !== 0) console.error(`build ${t} failed:\n${r.stderr.split('\n').filter(l => !/^\s+at /.test(l)).slice(0, 14).join('\n')}`);
    const root = path.join(d, 'out', 'eqtest');
    const walk = dir => fs.existsSync(dir) ? fs.readdirSync(dir, { withFileTypes: true }).flatMap(e =>
      e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]) : [];
    for (const f of walk(root).filter(f => f.endsWith('.html')).sort()) {
      out[`build ${t} ${path.relative(root, f)}`] = scrub(fs.readFileSync(f, 'utf8'));
    }
    // Tarballs ship markdown to students: what is inside must not change either.
    for (const tgz of walk(root).filter(f => f.endsWith('.tar.gz')).sort()) {
      const x = path.join(d, 'tar-x'); fs.rmSync(x, { recursive: true, force: true }); fs.mkdirSync(x);
      spawnSync('tar', ['xzf', tgz, '-C', x]);
      for (const f of walk(x).sort()) {
        out[`tar ${path.basename(tgz)} ${path.relative(x, f)}`] = fs.readFileSync(f).toString('base64');
      }
    }
  }
  return out;
}

test('every reader sees the same thing after whole lectures are cut into slide files', { timeout: 900000 }, () => {
  assert.ok(LECTURES.length >= 2, `need two lectures with slide ids, found ${LECTURES.map(l => l.rel)}`);
  assert.ok(LECTURES.some(l => l.backing) && LECTURES.some(l => l.tiers), 'the picked lectures must carry a backing block and tier markers between them');
  const d = sandbox();
  try {
    for (const l of LECTURES) rebuildWhole(d, l);
    spawnSync('sh', ['-c', 'git add -A && git -c user.email=t@t -c user.name=t commit -qm whole'], { cwd: d });
    const before = runAll(d);
    for (const l of LECTURES) {
      const x = spawnSync('node', ['scripts/extract-slide.js', `${l.rel}#${l.ids.join(',')}`], { cwd: d, encoding: 'utf8' });
      assert.equal(x.status, 0, x.stderr);
      assert.match(fs.readFileSync(path.join(d, 'curriculum', l.rel), 'utf8'), new RegExp(`^\\[[^\\]]+\\]\\(slides/${l.ids[0]}\\.md\\)$`, 'm'));
    }
    const after = runAll(d);
    const differ = Object.keys(before).filter(k => before[k] !== after[k]);
    for (const k of differ) {
      const a = before[k].split('\n'), b = (after[k] || '(missing)').split('\n');
      const i = a.findIndex((l, n) => l !== b[n]);
      console.error(`--- ${k} first differs at line ${i + 1}:\n  before: ${(a[i] || '').slice(0, 200)}\n  after:  ${(b[i] || '').slice(0, 200)}`);
    }
    assert.deepEqual(differ, [], `readers whose output changed: ${differ.join(', ')}`);
    assert.deepEqual(Object.keys(after).sort(), Object.keys(before).sort(), 'the build produced a different set of pages');
    // slide-card names where each slide now lives, so it is checked by content.
    for (const l of LECTURES) {
      const card = spawnSync('node', ['scripts/slide-card.js', l.rel], { cwd: d, encoding: 'utf8' }).stdout;
      for (const i of l.ids) assert.match(card, new RegExp(`^## slides/${i}\\.md#${i} — `, 'm'), `card for ${i}`);
    }
    assert.ok(Object.keys(before).some(k => k.startsWith('tar ')), 'a tarball was compared');
    assert.ok(Object.keys(before).some(k => /^build agentic-engineering-101 --theory /.test(k)), 'the theory handbook was compared');
  } finally {
    fs.rmSync(d, { recursive: true, force: true });
  }
})
