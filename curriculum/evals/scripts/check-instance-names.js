#!/usr/bin/env node
'use strict';
/*
 * check-instance-names.js — gate the eval-instance filename convention.
 *
 * `judges/_dispatch-preamble.md` §Write the instance has declared the canonical
 * name since the per-class judges replaced the megajudge:
 *
 *     curriculum/evals/instances/<training>--<surface-type>--<slug>.<class>.json
 *
 * Nothing enforced it, so three earlier conventions kept living alongside it:
 * bare `<slug>.<class>.json`, half-migrated `<training>--<slug>.<class>.json`,
 * and — worse — instances stamped with the WRONG training, which is how seven
 * Agents 101 exercises came to sit under `ae101--` (the 2026-08-12 mis-stamp
 * scan-stale-classes.js:386 records). Name drift is not cosmetic here:
 * audit-eval-coverage looks instances up BY NAME, so a judged file under a
 * stale name reads as never judged, and a coverage report that under-counts is
 * the one number nobody can act on.
 *
 * The name is derived, never guessed. Each instance carries the absolute path
 * of the file it judged in its own `file` field; training and surface-type come
 * from that path via the same trainingOf/typeOf pair the queue uses, so this
 * gate and the queue can never disagree about who owns a file.
 *
 * Usage:
 *   node curriculum/evals/scripts/check-instance-names.js            report + exit 1 on drift
 *   node curriculum/evals/scripts/check-instance-names.js --fix      git mv into the convention
 *   [--repo <path>]
 *
 * --fix conflict rule: two names collapsing onto one destination are the same
 * (file, class) judged twice under two conventions. The newer commit wins; a tie
 * goes to the prefixed source, which followed the later convention. The loser is
 * deleted and named in the report — git keeps it, the corpus does not.
 */
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('node:child_process');
const { typeOf, trainingOf, linkFinder } = require('./scan-stale-classes.js');

const REL_DIR = 'curriculum/evals/instances';
const NAME_RE = /^(.+)\.([a-z_]+)\.json$/;

// cross_module is judged at module-SET scope, so it names no single file and
// carries no `file` field to derive from. Its slug is the set's own name.
const SET_TYPE = 'module-set';

function gitTime(repo, rel) {
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%ct', '--', rel], { cwd: repo, encoding: 'utf8' }).trim();
    return Number(out) || 0;
  } catch { return 0; }
}

// A stray a judge just wrote is usually untracked, and `git rm`/`git mv` refuse
// untracked paths — the fix pass must fall back to fs so it never dies halfway.
function tracked(repo, rel) {
  try {
    execFileSync('git', ['ls-files', '--error-unmatch', '--', rel], { cwd: repo, stdio: 'ignore' });
    return true;
  } catch { return false; }
}

// One instance → {ok} | {want} | {skip: reason}. Never throws on a bad file:
// an unreadable instance is a finding, not a crash.
function expectedName(repo, base, find) {
  const m = NAME_RE.exec(base);
  if (!m) return { skip: 'filename is not <name>.<class>.json' };
  const [, stem, cls] = m;

  if (cls === 'cross_module') {
    const seg = stem.split('--');
    // `<training>--module-set--<slug>` is the only shape derivable without a
    // `file` field. Anything else needs a human to name the set.
    if (seg.length === 3 && seg[1] === SET_TYPE) return { ok: true };
    if (seg.length === 2) return { want: `${seg[0]}--${SET_TYPE}--${seg[1]}.${cls}.json` };
    return { skip: 'cross_module instance names no set' };
  }

  let j;
  try { j = JSON.parse(fs.readFileSync(path.join(repo, REL_DIR, base), 'utf8')); }
  catch { return { skip: 'unparseable JSON' }; }
  if (!j.file) return { skip: 'no `file` field to derive from' };

  const rel = path.relative(repo, j.file).split(path.sep).join('/');
  if (!fs.existsSync(path.join(repo, rel))) return { skip: `judged file is gone: ${rel}` };

  const training = trainingOf(rel, find);
  const type = typeOf(rel);
  if (!training) return { skip: `training not derivable for ${rel} (0 or 2+ linkers)` };
  if (!type) return { skip: `surface type not derivable for ${rel}` };

  const want = `${training}--${type}--${path.basename(rel, '.md')}.${cls}.json`;
  return want === base ? { ok: true } : { want, training, declared: j.training };
}

function scan(repo) {
  const find = linkFinder(repo);
  const dir = path.join(repo, REL_DIR);
  const drift = [];
  const skipped = [];
  for (const base of fs.readdirSync(dir).filter(f => f.endsWith('.json')).sort()) {
    const r = expectedName(repo, base, find);
    if (r.ok) continue;
    if (r.skip) { skipped.push({ base, reason: r.skip }); continue; }
    drift.push({ base, want: r.want, training: r.training, declared: r.declared });
  }
  return { drift, skipped };
}

function applyFix(repo, drift) {
  const dir = path.join(repo, REL_DIR);
  const byWant = new Map();
  for (const d of drift) {
    if (!byWant.has(d.want)) byWant.set(d.want, []);
    byWant.get(d.want).push(d);
  }
  const renamed = [];
  const dropped = [];
  for (const [want, srcs] of byWant) {
    // An already-correct file sitting at the destination is a candidate too.
    if (fs.existsSync(path.join(dir, want))) srcs.push({ base: want, want, incumbent: true });
    srcs.sort((a, b) => {
      const t = gitTime(repo, `${REL_DIR}/${b.base}`) - gitTime(repo, `${REL_DIR}/${a.base}`);
      if (t !== 0) return t;
      return (b.base.includes('--') ? 1 : 0) - (a.base.includes('--') ? 1 : 0);
    });
    const [winner, ...losers] = srcs;
    for (const l of losers) {
      if (tracked(repo, `${REL_DIR}/${l.base}`)) execFileSync('git', ['rm', '-q', '--', `${REL_DIR}/${l.base}`], { cwd: repo });
      else fs.unlinkSync(path.join(dir, l.base));
      dropped.push({ base: l.base, want, lostTo: winner.base });
    }
    if (!winner.incumbent) {
      if (tracked(repo, `${REL_DIR}/${winner.base}`)) execFileSync('git', ['mv', '--', `${REL_DIR}/${winner.base}`, `${REL_DIR}/${want}`], { cwd: repo });
      else fs.renameSync(path.join(dir, winner.base), path.join(dir, want));
      renamed.push({ from: winner.base, to: want });
    }
  }
  return { renamed, dropped };
}

function main(argv) {
  const i = argv.indexOf('--repo');
  const repo = i === -1 ? process.cwd() : path.resolve(argv[i + 1]);
  const { drift, skipped } = scan(repo);

  if (argv.includes('--fix')) {
    const { renamed, dropped } = applyFix(repo, drift);
    for (const r of renamed) console.log(`renamed  ${r.from}\n      -> ${r.to}`);
    for (const d of dropped) console.log(`dropped  ${d.base}  (superseded by ${d.lostTo} at ${d.want})`);
    console.log(`\n${renamed.length} renamed · ${dropped.length} dropped · ${skipped.length} not derivable`);
    for (const s of skipped) console.log(`  skip  ${s.base} — ${s.reason}`);
    return 0;
  }

  for (const d of drift) {
    const mis = d.declared && d.training && d.declared !== d.training ? `  [declared training=${d.declared}, owner=${d.training}]` : '';
    console.log(`${d.base}\n  -> ${d.want}${mis}`);
  }
  for (const s of skipped) console.log(`skip  ${s.base} — ${s.reason}`);
  if (drift.length) {
    console.log(`\n${drift.length} instance(s) off the convention <training>--<surface-type>--<slug>.<class>.json`);
    console.log('Run with --fix to rename them.');
    return 1;
  }
  console.log(`instance names OK (${skipped.length} not derivable)`);
  return 0;
}

module.exports = { expectedName, scan, applyFix };
if (require.main === module) process.exit(main(process.argv.slice(2)));
