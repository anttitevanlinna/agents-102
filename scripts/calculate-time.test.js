'use strict';
// calculate-time.test.js — picked up by the `node --test scripts/*.test.js` glob
// in package.json. No registration edit needed.
//
// Two layers, same split the sibling validators use:
//   1. unit  — the band grammar and the beat algebra, on literals. This is where
//              the drift the script exists to kill actually lived: a range
//              collapsed to a midpoint, an approximation treated as a range, a
//              legacy label silently matching.
//   2. live  — the real AE101 corpus must stay computable. Not a snapshot of the
//              NUMBERS (those move every time a leaf is edited, which is the
//              point) but of the SHAPE: every module resolves, every leaf is
//              found, nothing is unpriced.

const { test } = require('node:test');
const assert = require('node:assert/strict');
const path = require('path');

const CT = require(path.join(__dirname, 'calculate-time.js'));
const { parseBand, computeTraining, verdict, parseTransitions, parseCharges } = CT;

// ── band grammar ─────────────────────────────────────────────────────────────

test('parses a bare point value', () => {
  assert.deepEqual(parseBand('25 minutes.'), { lo: 25, hi: 25, approx: false });
});

test('parses an en-dash range as a band, not a midpoint', () => {
  const b = parseBand('15–20 minutes.');
  assert.equal(b.lo, 15);
  assert.equal(b.hi, 20);
  // The single most expensive bug in the corpus this replaces: `15–20` was
  // written into the trainer map as `18`, a number appearing nowhere in the
  // source file, under a line claiming every figure came from that file.
  assert.notEqual(b.lo, b.hi);
});

test('parses a hyphen range identically to an en dash', () => {
  assert.deepEqual(parseBand('8-10 minutes.'), parseBand('8–10 minutes.'));
});

test('treats ~N as a point with an approximate register, not a range', () => {
  const b = parseBand('~5 min');
  assert.equal(b.lo, 5);
  assert.equal(b.hi, 5);
  assert.equal(b.approx, true);
});

test('first duration token wins, so trailing slot and phase prose is ignored', () => {
  // Real line from curriculum/exercises/walk-and-send-off.md:3. The 1h45 is a
  // PARENT slot and the 10/45 is a phase split; neither is this leaf's duration.
  const b = parseBand('55 minutes inside a 1h45 module slot (Phases 1–2, breakdown: pick 10 / walk-and-fill 45). The send-off (~5 min, single prompt paste) closes the module.');
  assert.equal(b.lo, 55);
  assert.equal(b.hi, 55);
});

test('parses a band followed by a word rather than a period', () => {
  // Real shape from the tripwire lectures: "4–6 min target (container, ...)".
  const b = parseBand('4–6 min target (container, not a teaching lecture).');
  assert.equal(b.lo, 4);
  assert.equal(b.hi, 6);
});

test('returns null when there is no duration at all', () => {
  assert.equal(parseBand('closer for Module 1, after the exercises.'), null);
  assert.equal(parseBand(''), null);
  assert.equal(parseBand(null), null);
});

test('flags a reversed range instead of silently sorting it', () => {
  // "20–15" in a file is a fact someone needs to look at, not input to fix up.
  assert.equal(parseBand('20–15 minutes.').reversed, true);
});

// ── transitions + charges ────────────────────────────────────────────────────

test('parses transitions with each anchor form', () => {
  const t = parseTransitions('connections 10 @start · debrief 12 @after:some-slug · bridge 3 @end');
  assert.equal(t.length, 3);
  assert.equal(t[0].name, 'connections');
  assert.equal(t[0].band.lo, 10);
  assert.equal(t[0].anchor, 'start');
  assert.equal(t[1].anchor, 'after:some-slug');
  assert.equal(t[2].anchor, 'end');
});

test('a transition with a range keeps the range', () => {
  const t = parseTransitions('debrief 12–15 @end');
  assert.equal(t[0].band.lo, 12);
  assert.equal(t[0].band.hi, 15);
});

test('an unanchored transition is reported, not guessed at', () => {
  const t = parseTransitions('connections 10');
  assert.equal(t[0].error, 'unparseable transition');
});

test('a charge requires a stated reason', () => {
  const ok = parseCharges('- **Charge:** some-slug 0 — rides the active session');
  assert.equal(ok['some-slug'].band.lo, 0);
  assert.match(ok['some-slug'].why, /rides the active session/);

  // Without the reason the line does not parse into a charge. Discounting a beat
  // is the single largest source of two careful readers disagreeing in good
  // faith; an unexplained discount is not a fact, it is an opinion in a number's
  // clothing.
  const bad = parseCharges('- **Charge:** some-slug 0');
  assert.ok(bad.__error__, 'a charge with no reason must be reported');
  assert.equal(bad['some-slug'], undefined);
});

test('Agents 101 scheduled-agent homework does not consume Module 2 room time', () => {
  const training = computeTraining('agents-101');
  const module = training.modules.find(item => item.slug === 'building-agent-systems');
  const homework = module.beats.find(item => item.slug === 'personal-agent-homework');

  assert.ok(homework, 'Module 2 must keep the scheduled-agent homework in its handoff');
  assert.equal(homework.band.hi, 35, 'the participant still receives a 35-minute homework estimate');
  assert.equal(homework.charged.hi, 0, 'between-session homework must not consume live room time');
  assert.match(homework.why, /between sittings/i);
});

// ── verdicts ─────────────────────────────────────────────────────────────────

test('a band whose ceiling clears the cap FITS', () => {
  assert.deepEqual(verdict({ lo: 90, hi: 100 }, 105), { state: 'FITS', float: 5 });
});

test('a total past the cap is OVER by one number', () => {
  const v = verdict({ lo: 110, hi: 110 }, 105);
  assert.equal(v.state, 'OVER');
  assert.equal(v.by, 5);
});

test('the verdict reads the ceiling, so there is no TIGHT', () => {
  // TIGHT existed only because durations were ranges: it named a total whose
  // floor fitted and whose ceiling did not. That is not a state a trainer can
  // act on — nobody delivers at the floor on purpose — and "fits if nothing runs
  // long" is the promise the prose corpus used to record as "fits with buffer".
  // Durations are ceilings now, so a module fits or it does not.
  assert.equal(verdict({ lo: 100, hi: 110 }, 105).state, 'OVER');
  assert.equal(verdict({ lo: 100, hi: 105 }, 105).state, 'FITS');
});

test('a range is parsed but flagged, so the corpus gate can reject it', () => {
  // Still parsed: legacy strings and quoted prose contain ranges, and silently
  // failing to read one would hide it rather than surface it.
  const b = parseBand('15–20 minutes.');
  assert.equal(b.ranged, true);
  assert.equal(b.hi, 20);
  assert.ok(!parseBand('20 minutes.').ranged);
});

// ── live corpus ──────────────────────────────────────────────────────────────

test('every AE101 module computes with no unresolved leaf or beat', () => {
  // Structural only: every leaf parses, every beat is priced. A mirror mismatch
  // (phases disagreeing with the stated total) is a content decision and lives in
  // `mismatches`, where `--check` gates it — a suite that goes red for something
  // no code change can fix is a suite people learn to ignore.
  const r = computeTraining('agentic-engineering-101');
  assert.equal(r.modules.length, 6);
  const problems = r.modules.flatMap(m => m.problems.map(p => `${m.slug}: ${p}`));
  assert.deepEqual(problems, [], 'every leaf must carry a parseable **Time:** and every beat must be priced');
});

test('a phase sum that disagrees with the stated total is reported, not absorbed', () => {
  // The invariant that makes the student-visible line trustworthy: if the phases
  // and line 3 disagree, somebody hears about it. walk-and-send-off said 55 on
  // line 3 and 60 in its own maintainer block for four months because nothing
  // compared them.
  const r = computeTraining('agentic-engineering-101');
  for (const m of r.modules) {
    assert.ok(Array.isArray(m.mismatches), `${m.slug} must carry a mismatches list`);
    for (const b of m.beats) {
      if (!b.phases || !b.phases.length) continue;
      const sum = b.phases.reduce((t, p) => ({ lo: t.lo + p.band.lo, hi: t.hi + p.band.hi }), { lo: 0, hi: 0 });
      assert.equal(b.band.lo, sum.lo, `${b.slug} floor should be its phase sum`);
      assert.equal(b.band.hi, sum.hi, `${b.slug} ceiling should be its phase sum`);
    }
  }
});

test('every AE101 beat resolves to a real source and a real band', () => {
  const r = computeTraining('agentic-engineering-101');
  for (const m of r.modules) {
    assert.ok(m.beats.length > 0, `${m.slug} has no beats`);
    for (const b of m.beats) {
      assert.ok(b.charged, `${m.slug} / ${b.name} has no charged duration`);
      assert.ok(b.source, `${m.slug} / ${b.name} has no source`);
      assert.ok(b.charged.hi >= b.charged.lo, `${m.slug} / ${b.name} has a reversed band`);
    }
  }
});

test('a module total equals the sum of its charged beats', () => {
  // The invariant the whole system rests on: no total is ever typed, so the
  // total must be reproducible from the parts by anyone who re-adds them.
  const r = computeTraining('agentic-engineering-101');
  for (const m of r.modules) {
    const lo = m.beats.reduce((n, b) => n + (b.charged ? b.charged.lo : 0), 0);
    const hi = m.beats.reduce((n, b) => n + (b.charged ? b.charged.hi : 0), 0);
    assert.equal(m.total.lo, lo, `${m.slug} floor`);
    assert.equal(m.total.hi, hi, `${m.slug} ceiling`);
  }
});

test('every module is measured against at least one declared cap', () => {
  const r = computeTraining('agentic-engineering-101');
  assert.ok(!r.shapes.missing, 'timings.md must exist');
  for (const m of r.modules) {
    assert.ok(Object.keys(m.caps).length > 0, `${m.slug} has no cap in timings.md`);
  }
});

// ── phases as the leaf ───────────────────────────────────────────────────────

const PHASED = [
  '# An exercise',
  '',
  '**Time:** 55 minutes.',
  '',
  '## Phase 1: Pick the task',
  '',
  '*10 min*',
  '',
  '- do the thing',
  '',
  '## Phase 2: Walk the system',
  '',
  '*45 min*',
  '',
  '- do the other thing',
].join('\n');

test('reads a duration marker under each Phase heading', () => {
  const p = CT.readPhases(PHASED);
  assert.equal(p.length, 2);
  assert.equal(p[0].band.lo, 10);
  assert.equal(p[1].band.lo, 45);
  assert.match(p[0].title, /^Phase 1:/);
});

test('only `## Phase` headings count, not every section', () => {
  // close-the-ticket has six `##` sections and five named beats that do not map
  // onto them. Marking every heading would invent a partition the file does not
  // have — the same failure as fabricating a phase split for an atomic exercise.
  const mixed = PHASED + '\n\n## Anything can be reverse-engineered\n\n*9 min*\n';
  assert.equal(CT.readPhases(mixed).length, 2);
});

test('a Phase heading with no marker is skipped, not counted as zero', () => {
  const partial = '## Phase 1: One\n\n*10 min*\n\n## Phase 2: Two\n\n- no marker here\n';
  const p = CT.readPhases(partial);
  assert.equal(p.length, 1, 'an unmarked phase must not silently contribute 0');
});

test('an exercise with no phases stays atomic rather than being split', () => {
  const atomic = '# X\n\n**Time:** 25 minutes.\n\n## Do the thing\n\n- one loop\n';
  assert.equal(CT.readPhases(atomic).length, 0);
});

test('no hand-typed aggregate has come back', () => {
  // The forcing function. Everything else in this file proves the calculator
  // computes the right number; this proves nobody has typed a DIFFERENT one back
  // into a module file or the trainer handbook — which is how the corpus got
  // here, with `check_pedagogy.md §61a` correctly stating the rule and two files
  // contradicting it. A gate that only runs when someone remembers the command
  // is not a gate.
  const hits = CT.findAggregates('agentic-engineering-101');
  assert.deepEqual(
    hits.map(h => `${h.file}:${h.line} [${h.what}] ${h.text}`),
    [],
    'runtime figures are computed — delete the typed one, or add a **Timing literal accepted:** "<exact string>" line if it genuinely is not derivable');
});

test('no trainer tab figure disagrees with the leaf that owns it', () => {
  // The trainer tabs may echo a beat's duration beside the link to it — a
  // glanceable sheet is worth something. What they may not do is echo a number
  // the leaf no longer says. M3's tab held 18–22 for author-test-strategy-skill
  // against a leaf that summed to 20, and M6's held 4–6 for quality-is-grounding
  // against 3–5. Both were invisible: nothing compared the tab to the file it
  // linked to, so the trainer's number and the student's number were free to
  // part company.
  const hits = CT.findRestatements('agentic-engineering-101');
  assert.deepEqual(
    hits.map(h => `${h.file}:${h.line} ${h.slug}: tab ${h.said} vs leaf ${h.owned}`),
    [],
    'the leaf owns the number — update the tab, or fix the leaf if the tab is right');
});

test('a leaf states its runtime exactly once', () => {
  // readLeaf used to conflict-check duplicate **Time:** lines on ATOMIC leaves
  // only, and only when they DISAGREED. Both holes mattered. A phase-composed
  // leaf had line 3 read against the phase sum and every later line ignored, so a
  // second figure in a maintainer block was structurally unreachable; and the
  // agreement test let six more sit there on the grounds that they currently
  // matched. They currently matched until one didn't — author-test-strategy-skill
  // held 20 at the top, 18–22 at the bottom, and the bottom copy is the one a
  // trainer tab read. Position and rationale go on **Placement:**, which owes no
  // number.
  const r = computeTraining('agentic-engineering-101');
  const conflicts = r.modules.flatMap(m => m.problems.filter(p => /\*\*Time:\*\* lines/.test(p)));
  assert.deepEqual(conflicts, []);
});

test('every phase-less exercise declares itself atomic', () => {
  // Atomic is a declared state, never an inferred one. Undeclared, "no phases"
  // and "phases nobody has written yet" are byte-identical on disk, so the next
  // agent re-derives the answer from prose and can re-open a settled decision.
  // Four of the five atomic AE101 exercises were in exactly that state.
  const r = computeTraining('agentic-engineering-101');
  const undeclared = r.modules.flatMap(m => m.problems.filter(p => /does not declare itself atomic/.test(p)));
  assert.deepEqual(undeclared, []);
});

test('every AE101 leaf file carries exactly one **Time:** line', () => {
  // The same rule stated mechanically, independent of readLeaf's internals: if
  // this and the test above ever disagree, the parser has drifted from the rule.
  const fs = require('fs');
  const r = computeTraining('agentic-engineering-101');
  const files = new Set();
  for (const m of r.modules) {
    for (const b of m.beats) {
      if (b.kind === 'exercise' || b.kind === 'lecture') files.add(`curriculum/${b.kind}s/${b.slug}.md`);
    }
  }
  const offenders = [];
  for (const rel of files) {
    const raw = fs.readFileSync(path.join(__dirname, '..', rel), 'utf8');
    const n = (raw.match(/^(?:- )?\*\*Time:\*\*/gm) || []).length;
    if (n !== 1) offenders.push(`${rel}: ${n}`);
  }
  assert.deepEqual(offenders.sort(), []);
});

test('the generated line 3 is idempotent — no hand-edit is sitting in the corpus', () => {
  // Line 3 on a phase-composed exercise is machine-written. If this goes red,
  // somebody typed over a generated value: fix the PHASE and re-run
  // `node scripts/calculate-time.js --fix`, do not edit line 3 back.
  const pending = CT.fixLeafTotals('agentic-engineering-101', { dry: true });
  assert.deepEqual(pending.map(c => `${c.file}:${c.line} "${c.before}" → "${c.after}"`), []);
});

// ── labels, clock, and the trainer-doc include ────────────────────────────────

test('a transition can carry a trainer-facing label', () => {
  const t = parseTransitions('opening 10 @start "Opening: two room-agreement slides + trick-share"');
  assert.equal(t[0].name, 'opening');
  assert.equal(t[0].label, 'Opening: two room-agreement slides + trick-share');
});

test('beat names come from the include-link text, not the slug', () => {
  const r = computeTraining('agentic-engineering-101');
  const m1 = r.modules.find(x => x.slug === 'getting-going');
  const names = m1.beats.map(b => b.name);
  // The module file authors "[Painting the picture with the LLM](lectures/...)";
  // the map inherits that wording rather than de-slugging it.
  assert.ok(names.includes('Painting the picture with the LLM'), names.join(' | '));
  assert.ok(!names.includes('painting the picture with the llm'));
});

test('clock arithmetic advances and wraps at midnight', () => {
  assert.equal(CT.addClock('08:30', 0), '08:30');
  assert.equal(CT.addClock('08:30', 108), '10:18');
  assert.equal(CT.addClock('23:50', 20), '00:10');
});

test('the rendered runtime map states no number that is not derived', () => {
  const r = computeTraining('agentic-engineering-101');
  const m1 = r.modules.find(x => x.slug === 'getting-going');
  const md = CT.renderRuntimeMap(m1, 'cohort-2day');
  // The total in the table must equal the computed total. If a renderer ever
  // starts formatting a number independently, this is what catches it.
  assert.match(md, new RegExp(`\\*\\*${m1.total.hi}\\*\\*`));
  assert.match(md, /Computed from the leaves/);
  // Every beat is present as a row.
  for (const b of m1.beats) assert.ok(md.includes(b.name), `missing row: ${b.name}`);
});

test('the trainer handbook expands under strict mode with no unresolved marker', () => {
  const fs = require('fs');
  const CR = require(path.join(__dirname, '..', 'site/layouts/curriculum.js'));
  const md = fs.readFileSync(
    path.join(__dirname, '..', 'curriculum/trainings/agentic-engineering-101/trainer-modules.md'), 'utf8');
  const r = computeTraining('agentic-engineering-101');
  const maps = {};
  for (const m of r.modules) maps[m.slug] = CT.renderRuntimeMap(m, 'cohort-2day');
  // Strict mode is the gate: a typo'd module slug fails the build rather than
  // shipping a handbook with a literal {{runtime-map:foo}} in it.
  const out = CR.expandTimings(md, maps, { strict: true });
  assert.ok(!/\{\{runtime-map:/.test(out), 'every marker must expand');
});

test('an unknown module slug throws rather than passing through', () => {
  const CR = require(path.join(__dirname, '..', 'site/layouts/curriculum.js'));
  assert.throws(
    () => CR.expandTimings('{{runtime-map:not-a-module}}', {}, { strict: true }),
    /unresolved/);
});

test('a charged beat is never charged above its own leaf ceiling', () => {
  // A charge exists to say "this beat spends less slot time than it lasts". A
  // charge ABOVE the leaf's own figure is not a discount, it is a competing
  // duration — the exact thing the module files used to smuggle in.
  const r = computeTraining('agentic-engineering-101');
  for (const m of r.modules) {
    for (const b of m.beats) {
      if (!b.why || !b.band) continue;
      assert.ok(b.charged.hi <= b.band.hi,
        `${m.slug} / ${b.name}: charged ${b.charged.hi} above its leaf's ${b.band.hi}`);
    }
  }
});

test('a prep artefact listed by two modules carries the same figure in both', () => {
  // Nothing derives how long someone else's video runs, so these stay authored.
  // What can be checked is that the copies agree — the cheap half of DRY, for the
  // one family where the expensive half buys nothing.
  const bad = CT.findPrepDisagreements('agentic-engineering-101');
  assert.deepEqual(
    bad.map(b => `${b.name}: ${b.seen.join(' vs ')}`), [],
    'same pre-read, two modules, two durations');
});
