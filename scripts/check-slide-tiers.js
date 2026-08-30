#!/usr/bin/env node
'use strict';
// check-slide-tiers.js — a T2 slide cannot sit before a module's first exercise.
//
// The renderer's own definitions (TIER_INFO, site/layouts/slides.js):
//   T1 core · T2 "names what the room already did" · T3 story / extra theory.
//
// T2's definition is a claim about POSITION, not only about content. A slide
// that names what the room already did cannot run before the room has done
// anything — there is nothing there to recognise. So a `<!--tier:2-->` inside a
// lecture a module includes BEFORE its first exercise is a category error, and
// it is mechanically detectable. That is the whole check.
//
// It also makes goal 1 of the compaction programme self-enforcing: the barebones
// deck (`maxTier: 1`) drops T2/T3, so anything correctly tagged T2 in the front
// half was time spent before the student's hands moved.
//
// T3 before the first exercise is NOT an error — an opening story is a legitimate
// way in, and the training uses several. It is reported under --report as
// information, never as a failure. Decision procedure: curriculum/evals/tier-rubric.md
//
// One escape hatch, because the constraint is module-local and recognition is
// not. A closer that names what the room did in EARLIER modules is legitimate
// recognition sitting in this module's front half — M6's "Five moves, one
// quality discipline" recognises M1-M5. Nothing mechanical can tell that from a
// slide recognising an exercise that has not run, so the file declares it, in
// its own maintainer block, one slide at a time:
//
//   **Pre-exercise T2 accepted:** "<exact slide header>" — <what earlier work it names>
//
// Same shape as check-slide-deixis.js's accepted-phrase hatch, and scoped the
// same way: to the one heading that was ruled on, so the check keeps biting on
// every other slide in the file. A file-level exemption would hide the rest.
//
// Untagged means core (the renderer defaults `tier` to '1'), so silence here is
// only as strong as the tagging. `--coverage` prints how much of each module is
// tagged at all, because a clean run over an untagged corpus proves nothing.
//
// Usage:
//   node scripts/check-slide-tiers.js                    # AE101, gate mode (exit 1 on a T2 in the front half)
//   node scripts/check-slide-tiers.js --report           # every tag, placement and all
//   node scripts/check-slide-tiers.js --coverage         # tagged-vs-total per module
//   node scripts/check-slide-tiers.js --training agents-101

const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const CR = require(path.join(ROOT, 'site/layouts/curriculum.js'));

const argv = process.argv.slice(2);
function flag(name, def) {
  const i = argv.indexOf('--' + name);
  if (i === -1) return def;
  const next = argv[i + 1];
  return (next && !next.startsWith('--')) ? next : true;
}
const REPORT = argv.includes('--report');
const COVERAGE = argv.includes('--coverage');
const TRAINING = flag('training', 'agentic-engineering-101');

// ── walk a module's refs in order, splitting at the first exercise ────────────
// Position is the evidence, so the split has to come from the module file's own
// ordered includes — the same source build-workbook.js renders from. Match the
// `exercises/` PATH, never the link text: M1's refs carry no "[Exercise" prefix
// and matching on that false-positives its closer.
function modulePlan(contentKey, slug) {
  const p = path.join(ROOT, 'curriculum/trainings', contentKey, slug + '.md');
  if (!fs.existsSync(p)) return null;
  const body = CR.stripMaintainerTail(fs.readFileSync(p, 'utf8'));
  const re = new RegExp(CR.INCLUDE_LINK_RE.source, 'gm');
  const refs = [];
  let m;
  while ((m = re.exec(body)) !== null) refs.push(m[2]); // e.g. "lectures/the-far-half"
  return Object.assign({ slug }, splitAtFirstExercise(refs));
}
function splitAtFirstExercise(refs) {
  const firstEx = refs.findIndex(r => r.startsWith('exercises/'));
  return {
    refs,
    before: firstEx === -1 ? refs : refs.slice(0, firstEx),
    after: firstEx === -1 ? [] : refs.slice(firstEx),
    reachesAnExercise: firstEx !== -1
  };
}

// ── the tags in one file, with the slide each one sits on ────────────────────
// Anchored to line start: eval-instance JSON and maintainer blocks quote the
// marker as text, and a loose `grep -r "<!--tier:"` over curriculum/ returns
// ~126 hits against 38 real tags.
function tagsInBody(body) {
  const out = [];
  let heading = '(before the first heading)';
  let fenced = false;
  for (const line of body.split('\n')) {
    if (/^\s*```/.test(line)) { fenced = !fenced; continue; }
    if (fenced) continue;
    if (line.startsWith('## ')) heading = line.slice(3).trim();
    const m = /^<!--tier:([123])-->/.exec(line);
    if (m) out.push({ tier: m[1], heading });
  }
  return out;
}
function tagsIn(ref) {
  const p = path.join(ROOT, 'curriculum', ref + '.md');
  if (!fs.existsSync(p)) return [];
  return tagsInBody(CR.stripMaintainerTail(fs.readFileSync(p, 'utf8'))).map(t => Object.assign({ ref }, t));
}

// A marker must be followed by a blank line. Without one, expandTiers turns it
// into `<div class="slide-tier" ...>` and marked reads everything up to the next
// blank line as part of that HTML block — so a `## Key Concepts` whose list
// starts on the very next line loses its bullets in LONG-READ, silently, while
// the deck looks fine. Caused and caught 2026-08-30 while applying the tier
// audit: 33 blocks across six module files stopped being list items.
function markerLayoutProblems(body) {
  const lines = body.split('\n');
  const out = [];
  let heading = '(before the first heading)';
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith('## ')) heading = lines[i].slice(3).trim();
    if (!/^<!--tier:[123]-->\s*$/.test(lines[i])) continue;
    const next = lines[i + 1];
    if (next !== undefined && next.trim() !== '') out.push({ heading, next: next.slice(0, 60) });
  }
  return out;
}

// Maintainer-attested pre-exercise T2s, by exact slide header.
function acceptedHeadings(ref) {
  const p = path.join(ROOT, 'curriculum', ref + '.md');
  if (!fs.existsSync(p)) return new Set();
  const raw = fs.readFileSync(p, 'utf8');
  const cut = raw.indexOf('<!-- maintainer -->');
  if (cut === -1) return new Set();
  const out = new Set();
  const re = /^\*\*Pre-exercise T2 accepted:\*\*\s*["\u201c]([^"\u201d]+)["\u201d]/gm;
  let m;
  while ((m = re.exec(raw.slice(cut))) !== null) out.add(m[1].trim());
  return out;
}

function countSlidesAt(p) {
  if (!fs.existsSync(p)) return 0;
  const body = CR.stripMaintainerTail(fs.readFileSync(p, 'utf8'));
  let fenced = false, n = 0;
  for (const line of body.split('\n')) {
    if (/^\s*```/.test(line)) { fenced = !fenced; continue; }
    if (!fenced && line.startsWith('## ')) n++;
  }
  return n;
}
function countSlides(ref) { return countSlidesAt(path.join(ROOT, 'curriculum', ref + '.md')); }

function run() {
  const raw = CR.TRAININGS[TRAINING];
  if (!raw) {
    console.error(`Unknown training: ${TRAINING}. Known: ${Object.keys(CR.TRAININGS).join(', ')}`);
    process.exit(2);
  }
  const contentKey = raw.contentKey || TRAINING;
  const t = raw.contentKey ? Object.assign({}, CR.TRAININGS[contentKey], raw) : raw;

  const violations = [];
  const notes = [];
  const coverage = [];
  const layout = [];

  for (const mod of t.modules) {
    const plan = modulePlan(contentKey, mod.slug);
    if (!plan) continue;
    // The module file's own `##` sections (What You'll Learn, Key Concepts,
    // Next) are slides in the composed deck too, so they count toward coverage.
    // The module file's own `##` sections are slides in the composed deck, so
    // they count on BOTH sides of the coverage ratio. They are not gated: a
    // module body straddles its own first exercise (Key Concepts sits after the
    // ref list, Big Idea before it), so "before the first exercise" is not a
    // property the file has.
    const modPath = path.join(ROOT, 'curriculum/trainings', contentKey, mod.slug + '.md');
    let tagged = tagsInBody(CR.stripMaintainerTail(fs.readFileSync(modPath, 'utf8'))).length;
    let slides = countSlidesAt(modPath);
    for (const ref of plan.refs) { slides += countSlides(ref); }
    for (const f of [modPath].concat(plan.refs.map(r => path.join(ROOT, 'curriculum', r + '.md')))) {
      if (!fs.existsSync(f)) continue;
      for (const p of markerLayoutProblems(CR.stripMaintainerTail(fs.readFileSync(f, 'utf8')))) {
        layout.push({ file: path.relative(ROOT, f), ...p });
      }
    }
    for (const ref of plan.before) {
      const accepted = acceptedHeadings(ref);
      for (const tag of tagsIn(ref)) {
        tagged++;
        if (tag.tier === '2' && !accepted.has(tag.heading)) violations.push({ mod: mod.slug, ...tag });
        else notes.push({ mod: mod.slug, where: 'before', accepted: accepted.has(tag.heading), ...tag });
      }
    }
    for (const ref of plan.after) {
      for (const tag of tagsIn(ref)) { tagged++; notes.push({ mod: mod.slug, where: 'after', ...tag }); }
    }
    coverage.push({ mod: mod.slug, tagged, slides, reachesAnExercise: plan.reachesAnExercise });
  }

  if (COVERAGE) {
    console.log(`Tier coverage — ${TRAINING}`);
    console.log('A clean gate over an untagged corpus proves nothing. This is how much is tagged at all.\n');
    let tt = 0, ts = 0;
    for (const c of coverage) {
      tt += c.tagged; ts += c.slides;
      const pct = c.slides ? Math.round(c.tagged / c.slides * 100) : 0;
      console.log(`  ${String(c.tagged).padStart(3)} / ${String(c.slides).padStart(3)} slides tagged  (${String(pct).padStart(3)}%)  ${c.mod}`
        + (c.reachesAnExercise ? '' : '   [no exercise — every slide reads as "before"]'));
    }
    console.log(`\n  ${tt} / ${ts} across the training (${Math.round(tt / ts * 100)}%).`);
  }

  if (REPORT) {
    console.log(`\nEvery tag — ${TRAINING}\n`);
    for (const n of notes) {
      console.log(`  T${n.tier}  ${n.where.padEnd(6)}  ${n.mod} · ${n.ref} § ${n.heading}`
        + (n.accepted ? '   [pre-exercise T2, maintainer-attested]' : ''));
    }
    if (!notes.length) console.log('  (none)');
  }

  if (layout.length) {
    console.error(`\ncheck-slide-tiers: ${layout.length} tier marker(s) not followed by a blank line\n`);
    console.error('expandTiers turns the marker into a <div>, and marked reads everything up to the');
    console.error('next blank line as part of that HTML block. A list starting on the very next line');
    console.error('stops being a list IN LONG-READ, while the deck still looks right.\n');
    for (const l of layout) console.error(`  ${l.file} § ${l.heading}\n    next line: ${l.next}`);
    console.error('');
    return 1;
  }

  if (!violations.length) {
    if (!COVERAGE && !REPORT) console.log(`check-slide-tiers: OK — no T2 before a first exercise (${TRAINING}).`);
    return 0;
  }

  console.error(`\ncheck-slide-tiers: ${violations.length} T2 slide(s) before a module's first exercise — ${TRAINING}\n`);
  console.error('T2 means "names what the room already did". Before the first exercise the room');
  console.error('has not done it, so the tag and the position cannot both be right.\n');
  for (const v of violations) {
    console.error(`  ${v.mod}`);
    console.error(`    ${v.ref} § ${v.heading}`);
  }
  console.error('\nTwo honest fixes, and picking between them is a maintainer call:');
  console.error('  · move the slide after the exercise (the tag was right, the position was not); or');
  console.error('  · re-tag it T1 or T3 (the position was right, the tag was not).');
  console.error('A third, only when the slide names work from an EARLIER module — declare it in');
  console.error('the file\'s maintainer block:  **Pre-exercise T2 accepted:** "<header>" — <reason>');
  console.error('Decision procedure: curriculum/evals/tier-rubric.md\n');
  return 1;
}

if (require.main === module) process.exit(run());
else module.exports = { tagsInBody, splitAtFirstExercise, markerLayoutProblems };
