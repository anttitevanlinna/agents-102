#!/usr/bin/env node
'use strict';
/*
 * check-trace-names.js — gate the sim-cache filename convention.
 *
 * Sibling of check-instance-names.js, which does this for `instances/`. Nothing
 * did it for `sim-cache/`, and the same three conventions grew there side by
 * side: bare `<slug>`, half-migrated `<training>--<slug>`, and the canonical
 *
 *     curriculum/evals/sim-cache/<training>--<surface-type>--<slug>.<behavior|persona>.json
 *
 * On 2026-08-24 that left ~25 groups where two or three names described the SAME
 * (file, class). This is not tidiness. sim-freshness classifies each copy on its
 * own, so one file's trace can read `fresh` under one name and `unanchored`
 * under another, and a judge told to reuse the cached trace picks whichever it
 * opens — which is how a stale cache fabricates evidence rather than merely
 * going missing. Every corpus count is inflated by the duplicates on top.
 *
 * Customer-variant traces are NOT drift. `ae101--autumn-learn-from-the-test` and
 * `ae101--northwind-learn-from-the-test` are two personas walking one file, and
 * collapsing them onto the canonical name would destroy one of the two. They are
 * reported as variants and left alone: this gate renames only a stem whose tail,
 * after the optional training and surface-type segments, IS the slug it resolves
 * to. Anything else needs a person.
 *
 * Usage:
 *   node curriculum/evals/scripts/check-trace-names.js          report + exit 1 on drift
 *   node curriculum/evals/scripts/check-trace-names.js --fix    git mv into the convention
 *   [--repo <path>] [--quiet]
 *
 * --fix collision rule, inherited from check-instance-names: two names landing
 * on one destination are the same trace written twice under two conventions. The
 * newer commit wins; a tie goes to the more-qualified source, which followed the
 * later convention. The loser is deleted and named in the report — git keeps it,
 * the corpus does not.
 */
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('node:child_process');
const { typeOf, trainingOf, linkFinder } = require('./scan-stale-classes.js');
const { slugIndex, resolveSlug } = require('./sim-freshness.js');

const REL_DIR = 'curriculum/evals/sim-cache';
const NAME_RE = /^(.+)\.(behavior|persona)\.json$/;

function gitTime(repo, rel) {
  try {
    return Number(execFileSync('git', ['log', '-1', '--format=%ct', '--', rel], { cwd: repo, encoding: 'utf8' }).trim()) || 0;
  } catch { return 0; }
}

// One trace → {ok} | {want} | {variant} | {skip}. Never throws: an unreadable
// entry is a finding, not a crash.
function expectedName(repo, base, idx, find) {
  const m = NAME_RE.exec(base);
  if (!m) return { skip: 'filename is not <stem>.<behavior|persona>.json' };
  const [, stem, cls] = m;

  const rel = resolveSlug(idx, stem);
  if (!rel) return { skip: `no surface matches ${stem.split('--').pop()} — trace is orphaned` };

  const training = trainingOf(rel, find);
  const type = typeOf(rel);
  if (!training) return { skip: `training not derivable for ${rel} (0 or 2+ linkers)` };
  if (!type) return { skip: `surface type not derivable for ${rel}` };

  const slug = path.basename(rel, '.md');
  // The tail after the training and (optional) surface-type segments. Only a
  // tail that IS the slug is safely renameable; a longer one carries a variant
  // token and two of those would collapse onto one name.
  const seg = stem.split('--');
  const tail = seg[seg.length - 1];
  if (tail !== slug) return { variant: true, rel, canonicalOf: slug };

  const want = `${training}--${type}--${slug}.${cls}.json`;
  return want === base ? { ok: true } : { want, rel };
}

function scan(repo) {
  const idx = slugIndex(repo);
  const find = linkFinder(repo);
  const dir = path.join(repo, REL_DIR);
  const drift = [];
  const variants = [];
  const skipped = [];
  let names = [];
  try { names = fs.readdirSync(dir).filter(f => f.endsWith('.json')).sort(); } catch { return { drift, variants, skipped }; }

  for (const base of names) {
    const r = expectedName(repo, base, idx, find);
    if (r.ok) continue;
    if (r.variant) { variants.push({ base, of: r.canonicalOf }); continue; }
    if (r.skip) { skipped.push({ base, reason: r.skip }); continue; }
    drift.push({ base, want: r.want, file: r.rel });
  }
  return { drift, variants, skipped };
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
    // A correctly-named file already sitting at the destination is a candidate
    // too — it is one of the duplicates, not an innocent bystander.
    if (fs.existsSync(path.join(dir, want))) srcs.push({ base: want, want, incumbent: true });
    srcs.sort((a, b) => {
      const t = gitTime(repo, `${REL_DIR}/${b.base}`) - gitTime(repo, `${REL_DIR}/${a.base}`);
      if (t !== 0) return t;
      return b.base.split('--').length - a.base.split('--').length;
    });
    const [winner, ...losers] = srcs;
    for (const l of losers) {
      try { execFileSync('git', ['rm', '-q', '--', `${REL_DIR}/${l.base}`], { cwd: repo }); }
      catch { fs.rmSync(path.join(dir, l.base), { force: true }); }
      dropped.push({ base: l.base, want, lostTo: winner.base });
    }
    if (!winner.incumbent) {
      try { execFileSync('git', ['mv', '--', `${REL_DIR}/${winner.base}`, `${REL_DIR}/${want}`], { cwd: repo }); }
      catch { fs.renameSync(path.join(dir, winner.base), path.join(dir, want)); }
      renamed.push({ from: winner.base, to: want });
    }
  }
  return { renamed, dropped };
}

function main(argv) {
  const i = argv.indexOf('--repo');
  const repo = i === -1 ? process.cwd() : path.resolve(argv[i + 1]);
  const quiet = argv.includes('--quiet');
  const { drift, variants, skipped } = scan(repo);

  if (argv.includes('--fix')) {
    const { renamed, dropped } = applyFix(repo, drift);
    for (const r of renamed) console.log(`renamed  ${r.from}\n      -> ${r.to}`);
    for (const d of dropped) console.log(`dropped  ${d.base}  (duplicate of ${d.lostTo} at ${d.want})`);
    console.log(`\n${renamed.length} renamed · ${dropped.length} dropped · ${variants.length} variants left alone · ${skipped.length} not derivable`);
    return 0;
  }

  for (const d of drift) console.log(`${d.base}\n  -> ${d.want}`);
  if (!quiet) {
    for (const v of variants) console.log(`variant  ${v.base} — a persona walking ${v.of}, left alone`);
    for (const s of skipped) console.log(`skip     ${s.base} — ${s.reason}`);
  }
  if (drift.length) {
    console.log(`\n${drift.length} trace(s) off the convention <training>--<surface-type>--<slug>.<behavior|persona>.json`);
    console.log('Run with --fix to rename them; duplicates collapse newest-wins.');
    return 1;
  }
  console.log(`trace names OK (${variants.length} variants, ${skipped.length} not derivable)`);
  return 0;
}

module.exports = { expectedName, scan };
if (require.main === module) process.exit(main(process.argv.slice(2)));
