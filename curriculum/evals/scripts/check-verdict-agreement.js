#!/usr/bin/env node
'use strict';
/*
 * check-verdict-agreement.js — the instance and the Quality row must not disagree.
 *
 * Two instruments read the same body. `curriculum/evals/instances/<name>.json`
 * is what the judge wrote; the `- judges @<sha>:` row in the file's own Quality
 * block is what the maintainer adjudicated. They drift apart in one predictable
 * way: a judge files REVISE, an adversarial refuter kills the finding, and
 * `update-quality.sh` stamps the row `PASS (verify-refuted)` — but nothing ever
 * rewrites the instance, so the JSON keeps its losing verdict forever.
 *
 * That is not cosmetic. Nine AE101 instances sat REVISE under a PASS row on
 * 2026-08-24, two of them carrying a `body_sha` matching the file byte for byte,
 * and NEITHER artefact recorded that a disagreement existed. A successor judge
 * reads whichever it opens first and inherits it as fact — the same failure the
 * eval-fire skill's stay-in-your-lane clause was written for, arriving by a
 * different road. When two instruments disagree, the disagreement IS the
 * finding, and one of them is broken.
 *
 * Skips are deliberate and quiet: a class absent from the row, a `grandfathered`
 * rung, an instance whose judged file is gone. None of those is a disagreement,
 * and a gate that shouts about them is a gate people learn to skip.
 *
 * Usage:
 *   node curriculum/evals/scripts/check-verdict-agreement.js          report + exit 1
 *   node curriculum/evals/scripts/check-verdict-agreement.js --quiet  suppress skips
 *   [--repo <path>]
 */
const fs = require('fs');
const path = require('path');

const REL_DIR = 'curriculum/evals/instances';
const NAME_RE = /^(.+)\.([a-z_]+)\.json$/;
const JUDGES_RE = /^- judges @[^:]*:\s*(.*)$/m;
const ADJUDICATED = new Set(['PASS', 'REVISE']);

// One class out of a judges row. The leading boundary matters: `writing` must
// not match inside `prompt_writing`, or a gate reports on a class that is not
// there. Returns null when the class is simply absent — the common case.
function classVerdict(row, cls) {
  if (!row) return null;
  const m = JUDGES_RE.exec(row) || [null, row];
  const body = m[1] || '';
  const re = new RegExp(`(?:^|[,;]\\s*)${cls}\\s+([A-Za-z-]+)(?:\\s*\\(([^)]*)\\))?`);
  const hit = re.exec(body);
  if (!hit) return null;
  return { verdict: hit[1], note: hit[2] ? hit[2].split('-see-instances')[0] : null };
}

// The adjudication. Silent unless both sides carry a real verdict and they differ.
function compare(instanceVerdict, rowVerdict) {
  if (!rowVerdict || !instanceVerdict) return null;
  if (!ADJUDICATED.has(rowVerdict.verdict) || !ADJUDICATED.has(instanceVerdict)) return null;
  if (rowVerdict.verdict === instanceVerdict) return null;
  return {
    kind: 'contradiction',
    detail: `instance says ${instanceVerdict}, row says ${rowVerdict.verdict}${rowVerdict.note ? ` (${rowVerdict.note})` : ''}`,
  };
}

// The way out that is not falsification. `verdict` stays what the judge wrote —
// overwriting it to match the row would delete the only record that a finding
// was ever filed. `resolution` records how the disagreement was settled, so the
// instance carries BOTH the judge's read and the adjudication, and the next
// reader inherits the argument rather than one half of it.
//
//   refuted     adversarial refuters killed the finding; the row is right
//   superseded  a later verdict covers this one — same class or a wider scope
//   fixed       the finding was applied to the body; the row records the result
//
// A resolution with no note settles nothing: `settled: refuted` alone tells a
// successor that somebody decided, never what they decided or why, which is the
// same dead end as the bare REVISE it replaces.
const SETTLED = new Set(['refuted', 'superseded', 'fixed']);

function resolutionOf(j) {
  const r = j && j.resolution;
  if (!r || typeof r !== 'object') return null;
  if (!SETTLED.has(r.settled)) return { bad: `resolution.settled must be one of ${[...SETTLED].join('/')}, got ${JSON.stringify(r.settled)}` };
  if (!r.note || String(r.note).trim().length < 20) return { bad: 'resolution carries no note saying why the row wins' };
  return { ok: r };
}

function readFile(repo, rel) {
  try { return fs.readFileSync(path.join(repo, rel), 'utf8'); } catch { return null; }
}

function relOf(repo, abs) {
  if (!abs) return null;
  return path.isAbsolute(abs) ? path.relative(repo, abs).split(path.sep).join('/') : abs;
}

// cross_module names a SET, not a file, and stamps every member. A module
// belongs to several sets at once, so a row only speaks for THIS instance when
// its own `set=[...]` lists the same members — match on the row's presence
// alone and a neighbouring set's PASS launders an unstamped verdict into
// agreement. When no member carries a row for this set, the verdict was never
// stamped anywhere: an orphan, invisible to the queue, which reads rows.
const CROSS_ROW_RE = /^- cross_module @[^:]*:\s*([A-Za-z]+)[^\n]*?set=\[([^\]]*)\]/gm;

const asSet = names => new Set(names.map(s => s.trim()).filter(Boolean));
const sameSet = (a, b) => a.size === b.size && [...a].every(x => b.has(x));

function crossModule(repo, j) {
  const members = (j.module_set || j.set || []).map(m => relOf(repo, m)).filter(Boolean);
  if (!members.length) return { skip: 'cross_module instance names no set' };
  const want = asSet(members.map(m => path.basename(m, '.md')));
  const rows = [];
  for (const rel of members) {
    const txt = readFile(repo, rel);
    if (txt === null) continue;
    for (const m of txt.matchAll(CROSS_ROW_RE)) {
      if (sameSet(asSet(m[2].split(',')), want)) rows.push({ rel, verdict: { verdict: m[1], note: null } });
    }
  }
  if (!rows.length) {
    return { finding: { kind: 'orphan', detail: `verdict ${j.verdict} stamped on no member of set=[${[...want].join(',')}]` } };
  }
  for (const r of rows) {
    const c = compare(j.verdict, r.verdict);
    if (c) return { finding: { ...c, detail: `${c.detail} — on ${r.rel}` } };
  }
  return { ok: true };
}

// One disagreement → a finding, unless the instance records how it was settled.
function file(findings, base, extra, c, j) {
  if (!c) return;
  const r = resolutionOf(j);
  if (r && r.ok) { return 'settled'; }
  if (r && r.bad) { findings.push({ instance: base, ...extra, kind: 'contradiction', detail: `${c.detail} — ${r.bad}` }); return; }
  findings.push({ instance: base, ...extra, ...c });
}

function scan(repo) {
  const dir = path.join(repo, REL_DIR);
  const findings = [];
  const skipped = [];
  let checked = 0;
  let settled = 0;
  let names = [];
  try { names = fs.readdirSync(dir).filter(f => f.endsWith('.json')).sort(); } catch { return { findings, skipped, checked, settled }; }

  for (const base of names) {
    const m = NAME_RE.exec(base);
    if (!m) { skipped.push({ base, reason: 'filename is not <name>.<class>.json' }); continue; }
    const cls = m[2];

    let j;
    try { j = JSON.parse(fs.readFileSync(path.join(dir, base), 'utf8')); }
    catch { skipped.push({ base, reason: 'unparseable JSON' }); continue; }

    if (cls === 'cross_module') {
      const r = crossModule(repo, j);
      if (r.skip) { skipped.push({ base, reason: r.skip }); continue; }
      checked++;
      if (r.finding && file(findings, base, {}, r.finding, j) === 'settled') settled++;
      continue;
    }

    const rel = relOf(repo, j.file);
    if (!rel) { skipped.push({ base, reason: 'no `file` field to derive from' }); continue; }
    const txt = readFile(repo, rel);
    if (txt === null) { skipped.push({ base, reason: `judged file is gone: ${rel}` }); continue; }

    const row = classVerdict(txt, cls);
    if (!row) { skipped.push({ base, reason: `class \`${cls}\` carries no verdict on the judges row` }); continue; }
    checked++;
    const c = compare(j.verdict, row);
    if (file(findings, base, { file: rel, class: cls }, c, j) === 'settled') settled++;
  }
  return { findings, skipped, checked, settled };
}

function main(argv) {
  const i = argv.indexOf('--repo');
  const repo = i === -1 ? process.cwd() : path.resolve(argv[i + 1]);
  const { findings, skipped, checked, settled } = scan(repo);
  const tail = `${checked} adjudicated · ${settled} settled by a recorded resolution · ${skipped.length} skipped`;

  for (const f of findings) console.log(`${f.instance}\n  ${f.kind}: ${f.detail}`);
  if (!argv.includes('--quiet')) for (const s of skipped) console.log(`skip  ${s.base} — ${s.reason}`);

  if (findings.length) {
    console.log(`\n${findings.length} instance(s) disagree with the Quality row that cites them (${tail})`);
    console.log('Re-judge the class, or record a `resolution` in the instance. Do not silence one side.');
    return 1;
  }
  console.log(`instance/row verdicts agree (${tail})`);
  return 0;
}

module.exports = { classVerdict, compare, scan };
if (require.main === module) process.exit(main(process.argv.slice(2)));
