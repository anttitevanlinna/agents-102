#!/usr/bin/env node
'use strict';
// calculate-time.js — compute a training's runtime from its leaves, instead of
// re-typing it.
//
// The problem this replaces: a single duration was hand-copied into up to eight
// unlinked places (exercise Time line, exercise maintainer restatement, lecture
// Time line, module `**Session runtime:**`, trainer Slot line, trainer runtime-map
// header, and the map's Budget / Sitting-elapsed / Cohort-clock columns). Nothing
// linked the copies, so "which copy did you open first?" decided the answer, and
// two careful readers reached different totals in good faith.
//
// Here every duration is authored ONCE, on the leaf that owns it, and everything
// else is arithmetic:
//
//   beat ORDER      ← the module file's `[Title](exercises|lectures/<slug>.md)`
//                     include-links, in file order. Already the build's source of
//                     truth (build-workbook.js, check-slide-numbering.js,
//                     check-slide-size.js all read it). No second ordering fact.
//   leaf DURATION   ← that leaf file's own `**Time:**` line (check_pedagogy.md §61a
//                     already declares it authoritative over any narrative sum;
//                     this script is that rule with a forcing function attached).
//   transitions     ← the module's `- **Transitions:**` line — the beats with no
//                     file of their own (Connections, Debrief, Bridge, a worktree
//                     fork). These are irreducible: nothing can derive them.
//   charge overrides← the module's `- **Charge:**` lines, for a beat that rides an
//                     agent wait or overlaps its neighbour. Requires a stated
//                     reason, because this is the single largest source of honest
//                     disagreement between two readers of the same corpus.
//   caps + rhythm   ← curriculum/trainings/<training>/timings.md
//
// Ranges stay ranges. A band is [lo, hi] end to end; a module total is
// [Σlo, Σhi]. Nothing is silently collapsed to a midpoint — the corpus this
// replaces collapsed `18–22` to 20 in one column and 18 in the next column of the
// same table row, and that is exactly the drift being removed.
//
// Usage:
//   node scripts/calculate-time.js                        # every module, every shape
//   node scripts/calculate-time.js getting-going          # one module
//   node scripts/calculate-time.js --shape sitting-1h45
//   node scripts/calculate-time.js --check                # exit 1 on a leaf-level defect
//   node scripts/calculate-time.js --json
//   node scripts/calculate-time.js --training agentic-engineering-101

const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const CR = require(path.join(ROOT, 'site/layouts/curriculum.js'));

// ── args ─────────────────────────────────────────────────────────────────────
const argv = process.argv.slice(2);
function flag(name, def) {
  const i = argv.indexOf('--' + name);
  if (i === -1) return def;
  const next = argv[i + 1];
  return (next && !next.startsWith('--')) ? next : true;
}
const TRAINING = flag('training', 'agentic-engineering-101');
const SHAPE = flag('shape', null);
const CHECK = argv.includes('--check');
const JSON_OUT = argv.includes('--json');
const ONLY_MODULE = argv.find(a => !a.startsWith('--') && argv[argv.indexOf(a) - 1] !== '--training'
  && argv[argv.indexOf(a) - 1] !== '--shape') || null;

// ── duration parsing ─────────────────────────────────────────────────────────
// One band grammar for the whole corpus. Accepts what the files already say:
//   "25 minutes."                         → [25,25]
//   "15–20 minutes."  (en dash or hyphen) → [15,20]
//   "~5 min"                              → [5,5] approx
//   "55 minutes inside a 1h45 module slot (Phases 1–2, breakdown: pick 10 / …)"
//                                         → [55,55]  (first duration token wins)
//   "8–10 min target (container, not a teaching lecture)"  → [8,10]
//
// First-duration-token-wins is what makes the existing student-facing prose
// parseable without rewriting it. The trailing clauses in those lines describe a
// PARENT slot or a phase split; neither is this leaf's duration.
const DURATION_RE = /(~)?\s*(\d+)\s*(?:[–—-]\s*(\d+)\s*)?(?:min\b|mins\b|minutes\b)/i;

function parseBand(text) {
  if (!text) return null;
  const m = DURATION_RE.exec(text);
  if (!m) return null;
  const lo = Number(m[2]);
  const hi = m[3] !== undefined ? Number(m[3]) : lo;
  if (!Number.isFinite(lo) || !Number.isFinite(hi)) return null;
  // A reversed range is an authoring slip, not a band. Surface it rather than
  // quietly sorting it — a "20–15" in a file is a fact someone needs to look at.
  if (hi < lo) return { lo, hi, approx: !!m[1], reversed: true };
  return { lo, hi, approx: !!m[1] };
}

const band = (lo, hi) => ({ lo, hi: hi === undefined ? lo : hi, approx: false });
const addBand = (a, b) => ({ lo: a.lo + b.lo, hi: a.hi + b.hi, approx: a.approx || b.approx });
const ZERO = band(0, 0);

function fmtBand(b) {
  if (!b) return '?';
  const tilde = b.approx ? '~' : '';
  return b.lo === b.hi ? `${tilde}${b.lo}` : `${tilde}${b.lo}–${b.hi}`;
}

function fmtHM(mins) {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return h > 0 ? `${h}h${String(m).padStart(2, '0')}` : `${m}m`;
}

// ── leaf reading ─────────────────────────────────────────────────────────────
// Canonical field is `**Time:**` (or the bulleted `- **Time:**` used inside a
// maintainer meta block). Anchored so `**Time budget total:**` and
// `**Time band:**` never match — those are the legacy restatement labels this
// system exists to retire, and matching them would resurrect the duplication.
const TIME_LINE_RE = /^(?:- )?\*\*Time:\*\*[ \t]*(.+)$/gm;

// Student-visible per-phase marker: a `## Phase N: …` heading followed by a line
// holding nothing but an italic duration.
//
//     ## Phase 2: Build the ranked list of what will hurt the agent
//
//     *45 min*
//
// This is the real leaf. A 55-minute exercise total is an aggregate somebody did
// in their head; "pick 10 / walk-and-fill 45" is two observations. Phases are
// also the unit the room actually steers — every if-behind list in the trainer
// handbook cuts a PHASE, never an exercise — and they are the grain at which the
// live disagreements sit (M5 books diagnose-and-resend's P3/P4 at 18/17 against
// the file's 20/20; the P1 and P2 figures were never in dispute).
const PHASE_HEADING_RE = /^##[ \t]+(Phase[ \t]+\d+[^\n]*)$\n+^\*([^*\n]+)\*[ \t]*$/gm;

// An exercise is phase-composed or ATOMIC — never forced. Five AE101 exercises
// have no internal structure at all (fix-tests-first is one TDD loop;
// orient-and-introspect is one conversation), and inventing "P1 8 / P2 7" for
// them would manufacture exactly the kind of number this system exists to kill.
// Atomic is a declared state, not a gap to fill.
function readPhases(raw) {
  const out = [];
  const re = new RegExp(PHASE_HEADING_RE.source, 'gm');
  let m;
  while ((m = re.exec(raw)) !== null) {
    const b = parseBand(m[2]);
    if (!b) continue;
    out.push({ title: m[1].trim(), band: b, line: raw.slice(0, m.index).split('\n').length });
  }
  return out;
}

function readLeaf(kindSlug) {
  const file = path.join(ROOT, 'curriculum', kindSlug + '.md');
  const rel = path.relative(ROOT, file);
  if (!fs.existsSync(file)) return { kindSlug, file: rel, error: 'file not found' };
  const raw = fs.readFileSync(file, 'utf8');

  const hits = [];
  const re = new RegExp(TIME_LINE_RE.source, 'gm');
  let m;
  while ((m = re.exec(raw)) !== null) {
    hits.push({ text: m[1].trim(), line: raw.slice(0, m.index).split('\n').length });
  }
  if (!hits.length) return { kindSlug, file: rel, error: 'no **Time:** line' };

  const parsed = hits.map(h => Object.assign({}, h, { band: parseBand(h.text) }));
  const usable = parsed.filter(p => p.band);
  if (!usable.length) {
    return { kindSlug, file: rel, error: `**Time:** line has no parseable duration (${hits[0].line}: "${hits[0].text}")` };
  }

  // Phases win over the stated total, because the total IS the sum of them. The
  // line-3 figure the student reads becomes a mirror the validator checks, not a
  // second authored fact — which is what kept walk-and-send-off saying 55 in one
  // place and 60 in another for four months.
  const phases = readPhases(raw);
  if (phases.length) {
    const sum = phases.reduce((t, p) => addBand(t, p.band), ZERO);
    const stated = usable[0];
    const out = {
      kindSlug, file: rel, line: stated.line, text: stated.text,
      band: sum, phases, atomic: false,
    };
    if (sum.lo !== stated.band.lo || sum.hi !== stated.band.hi) {
      out.mirror = `**Time:** line says ${fmtBand(stated.band)} but its ${phases.length} phases sum to ${fmtBand(sum)}`;
    }
    if (hits.length > 1) out.conflict = duplicateNote(hits, `phases sum to ${fmtBand(sum)}`);
    return out;
  }

  const first = usable[0];
  const out = { kindSlug, file: rel, line: first.line, text: first.text, band: first.band, phases: [], atomic: true };
  if (hits.length > 1) out.conflict = duplicateNote(hits, `line ${first.line} owns it`);
  if (first.band.reversed) out.error = `reversed range "${first.text}"`;
  // Atomic is a DECLARED state, not an inferred one. Without the declaration,
  // "no phases" and "phases nobody has written yet" are the same file on disk,
  // and the next agent to look has to re-derive the answer from the prose — which
  // is how a settled decision gets reopened every few months. Only exercises owe
  // this: a lecture is one continuous read by construction.
  if (kindSlug.startsWith('exercises/') && !ATOMIC_DECL_RE.test(raw)) {
    out.undeclared = 'has no phase markers and does not declare itself atomic — add "**Atomic — no phase markers.**" with the reason, or add the markers';
  }
  return out;
}

const ATOMIC_DECL_RE = /\*\*Atomic\s*[—–-]\s*no phase markers\.\*\*/;

// One leaf, one **Time:** line — agreement is not the bar. The rule used to be
// "declared twice with DIFFERENT values", which let six exercises carry a second
// copy in a maintainer block on the grounds that it currently matched. It
// currently matched right up until one of them didn't: author-test-strategy-skill
// held 20 at the top and 18–22 at the bottom, and the bottom copy is the one a
// trainer tab went and read. A duplicate that agrees is not a duplicate that is
// safe, it is a duplicate nobody has broken yet. Position and rationale belong on
// a **Placement:** line, which owes no number.
function duplicateNote(hits, owner) {
  return `${hits.length} **Time:** lines (${hits.map(h => `${h.line}: "${h.text}"`).join(' · ')}) — ${owner}; move position or rationale to **Placement:**`;
}

// ── module reading ───────────────────────────────────────────────────────────
// Transitions: the beats with no file. Anchored so order still comes from the
// include-links and is never re-typed here.
//
//   - **Transitions:** connections 10 @start · debrief 12 @after:<slug> · bridge 5 @end
//
// Charge overrides: a beat that does not spend its own duration of slot time.
//
//   - **Charge:** <slug> 0 — delivered over the send-off wait
//
const TRANSITIONS_RE = /^[ \t]*-?[ \t]*\*\*Transitions:\*\*[ \t]*(.+)$/m;
const CHARGE_RE = /^[ \t]*-?[ \t]*\*\*Charge:\*\*[ \t]*(.+)$/gm;

function parseTransitions(line) {
  const out = [];
  if (!line) return out;
  for (const chunk of line.split('·')) {
    const s = chunk.trim().replace(/\.$/, '');
    if (!s) continue;
    // Optional trailing "quoted label" carries the trainer-facing wording for a
    // transition whose short name is a handle, not a description ("opening" vs
    // "Two room-agreement slides + trick-share"). Without it the generated map
    // would flatten a label a trainer actually reads under time pressure.
    // Optional per-shape overrides: `connections 10 @start cohort-2day:5`.
    // A compressed delivery genuinely runs a shorter Connections and cuts the
    // Bridge; without this the compressed cap gets compared against the
    // uncompressed module and every verdict in that shape is wrong by the size
    // of the cuts.
    const overrides = {};
    const bare = s.replace(/\s+([a-z0-9-]+):(~?\d+(?:\s*[–—-]\s*\d+)?)(?=\s|$)/gi, (full, shape, val) => {
      const ob = parseBand(val + ' min');
      if (ob) overrides[shape] = ob;
      return '';
    }).trim();

    const m = /^(.+?)\s+(~?\d+(?:\s*[–—-]\s*\d+)?)\s*@(start|end|after:[a-z0-9-]+|before:[a-z0-9-]+)(?:\s+"([^"]+)")?$/i.exec(bare);
    if (!m) { out.push({ raw: s, error: 'unparseable transition' }); continue; }
    const b = parseBand(m[2] + ' min');
    if (!b) { out.push({ raw: s, error: 'unparseable duration' }); continue; }
    out.push({ name: m[1].trim(), band: b, anchor: m[3].toLowerCase(), label: m[4] || null, overrides });
  }
  return out;
}

function parseCharges(raw) {
  const out = {};
  const re = new RegExp(CHARGE_RE.source, 'gm');
  let m;
  while ((m = re.exec(raw)) !== null) {
    const s = m[1].trim();
    const cm = /^([a-z0-9-]+)\s+(~?\d+(?:\s*[–—-]\s*\d+)?)\s*(?:—|--)\s*(.+)$/i.exec(s);
    if (!cm) { out['__error__'] = (out['__error__'] || []).concat(`unparseable charge: "${s}"`); continue; }
    const b = parseBand(cm[2] + ' min');
    if (!b) { out['__error__'] = (out['__error__'] || []).concat(`unparseable charge duration: "${s}"`); continue; }
    out[cm[1]] = { band: b, why: cm[3].trim() };
  }
  return out;
}

function readModule(trainingKey, modSlug) {
  const file = path.join(ROOT, 'curriculum/trainings', trainingKey, modSlug + '.md');
  const rel = path.relative(ROOT, file);
  if (!fs.existsSync(file)) return { slug: modSlug, file: rel, error: 'module file not found', beats: [] };
  const raw = fs.readFileSync(file, 'utf8');

  // Include-links live in the BODY (above the maintainer tail); the transitions
  // and charges live in the maintainer block. Read each from its own half.
  const body = CR.stripMaintainerTail(raw);
  const cut = raw.indexOf('<!-- maintainer -->');
  const tail = cut === -1 ? '' : raw.slice(cut);

  // The include-link's own link text is the beat's trainer-facing title. It is
  // already authored, right there, in run order — so the generated map inherits
  // the wording without anybody re-typing it into a table cell.
  const leaves = [];
  const seen = new Set();
  const re = new RegExp(CR.INCLUDE_LINK_RE.source, 'gm');
  let m;
  while ((m = re.exec(body)) !== null) {
    const kindSlug = m[2];
    if (seen.has(kindSlug)) continue;
    seen.add(kindSlug);
    leaves.push({ kindSlug, title: m[1].trim() });
  }

  const tm = TRANSITIONS_RE.exec(tail);
  const transitions = parseTransitions(tm ? tm[1] : null);
  const charges = parseCharges(tail);

  return { slug: modSlug, file: rel, leaves, transitions, charges, hasTransitions: !!tm };
}

// ── shapes (caps + day rhythm) ───────────────────────────────────────────────
// timings.md is markdown, not YAML — no new parser dependency, and no YAML 1.1
// sexagesimal trap where an unquoted 10:30 silently becomes the integer 630.
function readShapes(trainingKey) {
  const file = path.join(ROOT, 'curriculum/trainings', trainingKey, 'timings.md');
  const rel = path.relative(ROOT, file);
  if (!fs.existsSync(file)) return { file: rel, missing: true, caps: {}, shapes: [] };
  const raw = fs.readFileSync(file, 'utf8');

  const rhythm = {};
  const rhythmRe = /^-\s*\*\*([A-Za-z][A-Za-z \-]*):\*\*\s*(.+)$/gm;
  let m;
  while ((m = rhythmRe.exec(raw)) !== null) rhythm[m[1].trim().toLowerCase()] = m[2].trim();

  // Caps table: | Module | <shape> | <shape> | ...
  const caps = {};
  let shapes = [];
  const lines = raw.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    if (!/^\|\s*Module\s*\|/i.test(l)) continue;
    shapes = l.split('|').slice(2).map(s => s.trim()).filter(Boolean);
    for (let j = i + 2; j < lines.length; j++) {
      const row = lines[j];
      if (!row.startsWith('|')) break;
      const cells = row.split('|').slice(1, -1).map(s => s.trim());
      if (!cells.length || !cells[0]) continue;
      const slug = cells[0];
      caps[slug] = {};
      shapes.forEach((sh, k) => {
        const v = cells[k + 1];
        const cm = v && /^(\d+)(?:@(\d{1,2}:\d{2}))?$/.exec(v);
        if (cm) caps[slug][sh] = { cap: Number(cm[1]), start: cm[2] || null };
      });
    }
    break;
  }
  return { file: rel, rhythm, caps, shapes };
}

// ── compute ──────────────────────────────────────────────────────────────────
// Assemble the ordered beat list, then sum. Exported so the build path
// (expandTimings in the curriculum runtime) and the CLI share one implementation
// and cannot drift from each other.
function computeModule(trainingKey, modSlug) {
  const mod = readModule(trainingKey, modSlug);
  if (mod.error) return { slug: modSlug, error: mod.error, beats: [], total: ZERO, problems: [mod.error], mismatches: [] };

  const problems = [];
  const mismatches = [];
  if (!mod.hasTransitions) problems.push(`no "- **Transitions:**" line in ${mod.file} — beats with no file of their own are unpriced`);

  const leafBeats = mod.leaves.map(({ kindSlug, title }) => {
    const leaf = readLeaf(kindSlug);
    const slug = kindSlug.split('/')[1];
    const kind = kindSlug.split('/')[0] === 'exercises' ? 'exercise' : 'lecture';
    if (leaf.error) problems.push(`${leaf.file}: ${leaf.error}`);
    if (leaf.conflict) problems.push(`${leaf.file}: states its runtime twice — ${leaf.conflict}`);
    if (leaf.undeclared) problems.push(`${leaf.file}: ${leaf.undeclared}`);
    // A mirror mismatch is a CONTENT decision, not a broken parser: the phases
    // and the stated total are both readable, they just disagree, and only a
    // human can say which is right. Kept out of `problems` so the test suite
    // guards the machinery while the gate (`--check`) guards the corpus — a
    // suite that goes red for a reason no code change can fix gets ignored.
    if (leaf.mirror) mismatches.push(`${leaf.file}:${leaf.line}: ${leaf.mirror}`);
    const override = mod.charges[slug];
    return {
      kind, slug, phases: leaf.phases || [], atomic: leaf.atomic !== false,
      name: title || slug.replace(/-/g, ' '),
      source: leaf.file + (leaf.line ? ':' + leaf.line : ''),
      band: leaf.band || null,
      charged: override ? override.band : (leaf.band || null),
      why: override ? override.why : null,
      error: leaf.error || null,
    };
  });

  if (mod.charges.__error__) problems.push(...mod.charges.__error__.map(e => `${mod.file}: ${e}`));
  for (const key of Object.keys(mod.charges)) {
    if (key === '__error__') continue;
    if (!leafBeats.some(b => b.slug === key)) problems.push(`${mod.file}: **Charge:** names "${key}", which this module does not include-link`);
  }

  // Splice transitions into the leaf order at their anchors.
  const beats = [];
  const atStart = mod.transitions.filter(t => t.anchor === 'start');
  const atEnd = mod.transitions.filter(t => t.anchor === 'end');
  for (const t of mod.transitions) {
    if (t.error) problems.push(`${mod.file}: ${t.error} — "${t.raw}"`);
    if (!t.anchor) continue;
    const ref = /^(after|before):(.+)$/.exec(t.anchor);
    if (ref && !leafBeats.some(b => b.slug === ref[2])) {
      problems.push(`${mod.file}: transition "${t.name}" anchors @${t.anchor}, but "${ref[2]}" is not include-linked here`);
    }
  }
  const push = t => beats.push({ kind: 'transition', slug: null, name: t.label || t.name, source: mod.file, band: t.band, charged: t.band, why: null, overrides: t.overrides || {} });

  atStart.forEach(push);
  for (const lb of leafBeats) {
    mod.transitions.filter(t => t.anchor === 'before:' + lb.slug).forEach(push);
    beats.push(lb);
    mod.transitions.filter(t => t.anchor === 'after:' + lb.slug).forEach(push);
  }
  atEnd.forEach(push);

  accumulate(beats);
  return { slug: modSlug, file: mod.file, beats, total: sumOf(beats), problems, mismatches };
}

// Running elapsed is a property of an ORDERED list, so it is recomputed for each
// shape rather than stored on the beat. The hand-maintained tables stored it, and
// that is why every row below an edited beat silently went wrong.
function accumulate(beats) {
  let elapsed = ZERO;
  for (const b of beats) {
    b.startLo = elapsed.lo;
    b.startHi = elapsed.hi;
    if (b.charged) elapsed = addBand(elapsed, b.charged);
  }
  return beats;
}

const sumOf = beats => beats.reduce((t, b) => (b.charged ? addBand(t, b.charged) : t), ZERO);

// A shape's view of the module: the same ordered beats, with any per-shape
// override applied. A beat overridden to 0 is CUT — it leaves the list entirely,
// rather than sitting there as a zero row a reader has to interpret.
function shapeView(mod, shape) {
  const beats = mod.beats
    .map(b => {
      const ov = b.overrides && b.overrides[shape];
      if (!ov) return Object.assign({}, b);
      return Object.assign({}, b, { charged: ov, shapeNote: `${shape}: ${ov.lo === 0 && ov.hi === 0 ? 'cut' : fmtBand(ov)} (base ${fmtBand(b.band)})` });
    })
    .filter(b => !(b.charged && b.charged.lo === 0 && b.charged.hi === 0 && b.kind === 'transition'));
  accumulate(beats);
  return { beats, total: sumOf(beats) };
}

function computeTraining(trainingKey) {
  const t = CR.TRAININGS[trainingKey];
  if (!t) throw new Error(`Unknown training: ${trainingKey}. Known: ${Object.keys(CR.TRAININGS).join(', ')}`);
  const shapes = readShapes(trainingKey);
  const modules = (t.modules || []).map(m => {
    const r = computeModule(trainingKey, m.slug);
    r.title = m.title;
    r.caps = shapes.caps[m.slug] || {};
    r.verdicts = {};
    r.views = {};
    for (const sh of Object.keys(r.caps)) {
      const view = shapeView(r, sh);
      r.views[sh] = view;
      r.verdicts[sh] = verdict(view.total, r.caps[sh].cap);
    }
    return r;
  });
  return { training: trainingKey, label: t.label, shapes, modules };
}

// A band against a cap has three honest answers, and "fits" is only one of them.
// The middle case is the one the prose corpus kept losing: a module whose floor
// fits and whose ceiling does not is not "fits with buffer" — it is a module that
// fits only if nothing runs long.
function verdict(total, cap) {
  if (!Number.isFinite(cap)) return { state: 'NO CAP' };
  if (total.hi <= cap) return { state: 'FITS', float: cap - total.hi };
  if (total.lo <= cap) return { state: 'TIGHT', clawback: total.hi - cap };
  return { state: 'OVER', byLo: total.lo - cap, byHi: total.hi - cap };
}

// ── render ───────────────────────────────────────────────────────────────────

function verdictLine(shape, cap, v, total) {
  // Always name the total this verdict was reached against. A shape can cut or
  // shorten beats, so its total differs from the base one — and a verdict whose
  // arithmetic the reader cannot see is exactly the thing being replaced.
  const t = total ? ` (runs ${total.lo === total.hi ? total.lo : total.lo + '–' + total.hi})` : '';
  if (v.state === 'FITS') return `\`${shape}\` cap ${cap}${t} → **FITS** — ${v.float} min float`;
  if (v.state === 'TIGHT') return `\`${shape}\` cap ${cap}${t} → **TIGHT** — fits only at the floor; claw back ${v.clawback} min to guarantee it`;
  if (v.state === 'OVER') return `\`${shape}\` cap ${cap}${t} → **OVER** — by ${v.byLo === v.byHi ? v.byLo : v.byLo + '–' + v.byHi} min`;
  return `\`${shape}\` — no cap declared`;
}

function addClock(startHHMM, mins) {
  const [h, m] = startHHMM.split(':').map(Number);
  const t = h * 60 + m + mins;
  return `${String(Math.floor(t / 60) % 24).padStart(2, '0')}:${String(t % 60).padStart(2, '0')}`;
}

// The trainer-facing runtime map, as markdown. This is what `{{runtime-map:<slug>}}`
// expands to in trainer-modules.md, and it is the ONLY place these numbers exist —
// they are not stored anywhere, so there is no copy to go stale.
//
// The clock column shows the LATEST a beat can start (the band's ceiling). It is
// the one collapse in the system, it is declared, and one function performs it —
// which is what makes the old failure inexpressible: the hand-maintained table
// collapsed `18–22` to 20 in the elapsed column and 18 in the clock column of the
// same row, and nothing could see the two columns disagreeing.
function renderRuntimeMap(mod, shape) {
  const capEntry = mod.caps[shape] || {};
  const start = capEntry.start || null;
  const view = (mod.views && mod.views[shape]) || shapeView(mod, shape);
  const L = [];

  L.push(`*Shape: \`${shape}\`.*`);
  L.push('');
  L.push(`| Beat | Budget | Elapsed | ${start ? 'Clock (latest)' : 'Elapsed (ceiling)'} |`);
  L.push('|---|---|---|---|');
  for (const b of view.beats) {
    let budget = fmtBand(b.charged);
    if (b.why) budget += ` *(of ${fmtBand(b.band)})*`;
    else if (b.shapeNote) budget += ` *(${b.shapeNote})*`;
    const el = b.startLo === b.startHi ? fmtHM(b.startLo) : `${fmtHM(b.startLo)}–${fmtHM(b.startHi)}`;
    const last = start ? addClock(start, b.startHi) : fmtHM(b.startHi);
    L.push(`| ${b.name} | ${budget} | ${el} | ${last} |`);
  }
  const t = view.total;
  const totalStr = t.lo === t.hi ? `${t.lo}` : `${t.lo}–${t.hi}`;
  const ends = start ? ` · ends ${addClock(start, t.lo)}–${addClock(start, t.hi)}` : '';
  L.push(`| **Total** | **${totalStr}** | **${fmtHM(t.lo)}–${fmtHM(t.hi)}**${ends} | |`);
  L.push('');

  for (const sh of Object.keys(mod.caps)) {
    L.push('- ' + verdictLine(sh, mod.caps[sh].cap, mod.verdicts[sh], mod.views && mod.views[sh] && mod.views[sh].total));
  }
  const charged = view.beats.filter(b => b.why);
  if (charged.length) {
    L.push('');
    charged.forEach(b => L.push(`- **${b.name}** charged ${fmtBand(b.charged)} of ${fmtBand(b.band)} — ${b.why}`));
  }
  L.push('');
  L.push(`*Computed from the leaves by \`scripts/calculate-time.js\`. Every figure above is the beat file's own \`**Time:**\` line or this module's \`**Transitions:**\` line — change it there, not here.*`);
  return L.join('\n');
}

function renderModule(m, shapeFilter) {
  const L = [];
  const n = Math.max(...m.beats.map(b => b.name.length), 10);
  L.push(`## ${m.title || m.slug}  (${m.slug})`);
  L.push('');
  L.push(`| ${'Beat'.padEnd(n)} | Kind       | Budget  | Elapsed   | Source |`);
  L.push(`|${'-'.repeat(n + 2)}|------------|---------|-----------|--------|`);
  for (const b of m.beats) {
    const bud = b.error ? '  ??  ' : fmtBand(b.charged);
    const rid = b.why ? ` (charged ${fmtBand(b.charged)}: ${b.why})` : '';
    const el = b.startLo === b.startHi ? fmtHM(b.startLo) : `${fmtHM(b.startLo)}–${fmtHM(b.startHi)}`;
    L.push(`| ${b.name.padEnd(n)} | ${b.kind.padEnd(10)} | ${String(bud).padEnd(7)} | ${el.padEnd(9)} | ${b.source}${rid} |`);
  }
  L.push('');
  // The tilde is a per-beat register ("about five minutes"), not a property of a
  // sum. Propagating it onto the total reads as if the whole band were vague,
  // when the band already carries the uncertainty precisely.
  const totalStr = m.total.lo === m.total.hi ? `${m.total.lo}` : `${m.total.lo}–${m.total.hi}`;
  L.push(`**Total: ${totalStr} min** (${fmtHM(m.total.lo)}–${fmtHM(m.total.hi)})`);
  const shapeKeys = Object.keys(m.caps).filter(s => !shapeFilter || s === shapeFilter);
  for (const sh of shapeKeys) {
    L.push('- ' + verdictLine(sh, m.caps[sh].cap, m.verdicts[sh], m.views && m.views[sh] && m.views[sh].total));
  }
  if (m.mismatches && m.mismatches.length) {
    L.push('');
    L.push('**Needs a decision** (phases and the stated total both parse, and disagree):');
    m.mismatches.forEach(p => L.push(`- ${p}`));
  }
  if (m.problems.length) {
    L.push('');
    L.push('**Unresolved:**');
    m.problems.forEach(p => L.push(`- ${p}`));
  }
  return L.join('\n');
}

// ── aggregate detector: the forcing function ─────────────────────────────────
// Everything above computes the right number. None of it stops someone typing a
// DIFFERENT number back into a module file next week — which is exactly how the
// corpus got here: `check_pedagogy.md §61a` already said the leaf files win, and
// it was restated correctly in four places and contradicted in two, because a
// rule that needs an agent to remember it is not in force.
//
// So: scan the surfaces that are supposed to hold no arithmetic, and report any
// that do. This is deliberately literal about what an aggregate looks like,
// because a clever detector that misses one is worse than a blunt one that
// occasionally asks a human to look.
const AGGREGATE_PATTERNS = [
  { re: /^\s*-?\s*\*\*Session runtime:\*\*/m, what: 'a hand-typed **Session runtime:** sum' },
  { re: /\b\d+\s*\/\s*\d+\s*\/\s*\d+[^\n]*?=\s*\d{2,3}\b/, what: 'a beat-list sum with an "= N" total' },
  { re: /^\|\s*Beat\s*\|\s*Budget\s*\|/m, what: 'a hand-typed runtime-map table (use {{runtime-map:<slug>}})' },
  { re: /\bruns?\s+~?\d+h\d{2}\b/, what: 'a claimed module duration ("runs ~1h48")' },
  { re: /\b(?:min|minutes)\s+(?:over|of buffer|of slack)\b/, what: 'a hand-computed over/buffer figure' },
];

// Prep timings are the one duration family that is NOT derived: nothing computes
// how long someone else's video runs. But the same artefact is listed by several
// modules (the Cherny video by M1 and M2, the Klaassen guide by M4 and M5), and a
// figure typed twice is a figure that can disagree twice. Rather than build a
// derivation nobody needs — the five duplicated pairs currently agree — just
// check that they keep agreeing.
function findPrepDisagreements(trainingKey) {
  const t = CR.TRAININGS[trainingKey];
  const figs = {};
  for (const mod of (t.modules || [])) {
    const abs = path.join(ROOT, 'curriculum/trainings', trainingKey, mod.slug + '.md');
    if (!fs.existsSync(abs)) continue;
    const raw = fs.readFileSync(abs, 'utf8');
    const m = /^[ \t]*-?[ \t]*\*\*Prep(?: \/ bridge)? timing:\*\*[ \t]*(.+)$/m.exec(raw);
    if (!m) continue;
    for (const part of m[1].split(';')) {
      const d = /([0-9]+(?:\s*[–—-]\s*[0-9]+)?)\s*min/.exec(part);
      if (!d) continue;
      const name = part.slice(0, d.index)
        .replace(/\(.*?\)/g, '').replace(/[`*]/g, '')
        .replace(/^\s*(optional|this file's)\s+/i, '').trim().toLowerCase();
      if (!name) continue;
      (figs[name] = figs[name] || []).push({ fig: d[1].replace(/\s+/g, ''), mod: mod.slug });
    }
  }
  return Object.entries(figs)
    .filter(([, v]) => new Set(v.map(x => x.fig)).size > 1)
    .map(([name, v]) => ({ name, seen: v.map(x => `${x.fig} in ${x.mod}`) }));
}

// The trainer tabs name each beat as a link to its own anchor and often put that
// beat's duration in the parenthetical beside it. A trainer plans against that
// number, so when it drifts from the leaf nobody notices: M3's tab carried 18–22
// for author-test-strategy-skill while the exercise carried 20.
//
// Only disagreement is reported. An echo that still agrees is left alone —
// deleting sixteen correct parentheticals to satisfy a purity rule would cost
// the trainer a glanceable sheet and buy nothing this check does not already
// guarantee. The anchor makes the comparison free: the line says which leaf it
// means, so the copy can stay as long as it stays true.
function findRestatements(trainingKey) {
  const r = computeTraining(trainingKey);
  const bands = new Map();
  for (const m of r.modules) {
    for (const b of m.beats) {
      if (!b.slug || (b.kind !== 'exercise' && b.kind !== 'lecture')) continue;
      bands.set(`${b.kind}s:${b.slug}`, b);
    }
  }

  const rel = path.join('curriculum/trainings', trainingKey, 'trainer-modules.md');
  const abs = path.join(ROOT, rel);
  if (!fs.existsSync(abs)) return [];

  const hits = [];
  fs.readFileSync(abs, 'utf8').split('\n').forEach((line, i) => {
    const a = /\.\/#(exercises|lectures)-([a-z0-9-]+)/.exec(line);
    if (!a) return;
    const after = line.slice(a.index + a[0].length);
    const d = new RegExp(DURATION_RE.source, 'i').exec(after);
    if (!d) return;
    const beat = bands.get(`${a[1]}:${a[2]}`);
    if (!beat) return;
    const said = parseBand(d[0]);
    if (!said) return;
    if (said.lo === beat.band.lo && said.hi === beat.band.hi) return;
    hits.push({ file: rel, line: i + 1, slug: a[2], said: fmtBand(said), owned: fmtBand(beat.band) });
  });
  return hits;
}

function findAggregates(trainingKey) {
  const t = CR.TRAININGS[trainingKey];
  const files = (t.modules || []).map(m => path.join('curriculum/trainings', trainingKey, m.slug + '.md'));
  files.push(path.join('curriculum/trainings', trainingKey, 'trainer-modules.md'));

  const hits = [];
  for (const rel of files) {
    const abs = path.join(ROOT, rel);
    if (!fs.existsSync(abs)) continue;
    const raw = fs.readFileSync(abs, 'utf8');
    // An explicit opt-out, exact-string scoped, mirroring check-slide-size.js's
    // per-heading form. For the case where a figure genuinely is not derivable.
    const accepted = new Set();
    const accRe = /^\*\*Timing literal accepted:\*\*\s*"([^"]+)"/gm;
    let a;
    while ((a = accRe.exec(raw)) !== null) accepted.add(a[1]);

    raw.split('\n').forEach((line, i) => {
      if ([...accepted].some(s => line.includes(s))) return;
      for (const p of AGGREGATE_PATTERNS) {
        const re = new RegExp(p.re.source, p.re.flags.replace('m', ''));
        if (re.test(line)) { hits.push({ file: rel, line: i + 1, what: p.what, text: line.trim().slice(0, 100) }); break; }
      }
    });
  }
  return hits;
}

// ── --fix: write the derived total back into the student's line 3 ────────────
// The line stays (a student needs "can I fit this now?" before starting, and the
// five ATOMIC exercises have no phases to sum, so deleting it from the other six
// would leave the surface inconsistent for a reason the student cannot see).
// What changes is who types it: nobody. Phase-composed exercises get Σ phases
// written here; atomic ones are left alone, because their line 3 IS the authored
// fact. Drift stops being managed and becomes impossible.
function fixLeafTotals(trainingKey, { dry } = {}) {
  const r = computeTraining(trainingKey);
  const seen = new Set();
  const changes = [];
  for (const m of r.modules) {
    for (const b of m.beats) {
      if (b.kind !== 'exercise' || !b.phases || !b.phases.length) continue;
      const rel = `curriculum/exercises/${b.slug}.md`;
      if (seen.has(rel)) continue;
      seen.add(rel);

      const file = path.join(ROOT, rel);
      const raw = fs.readFileSync(file, 'utf8');
      const lines = raw.split('\n');
      const idx = lines.findIndex(l => /^\*\*Time:\*\*/.test(l));
      if (idx === -1) continue;

      const sum = b.phases.reduce((t, p) => addBand(t, p.band), ZERO);
      const num = sum.lo === sum.hi ? `${sum.lo}` : `${sum.lo}–${sum.hi}`;
      const next = `**Time:** ${num} minutes.`;
      if (lines[idx] === next) continue;

      changes.push({ file: rel, line: idx + 1, before: lines[idx], after: next });
      if (!dry) {
        lines[idx] = next;
        fs.writeFileSync(file, lines.join('\n'));
      }
    }
  }
  return changes;
}

// ── main ─────────────────────────────────────────────────────────────────────
function main() {
  if (argv.includes('--aggregates')) {
    const hits = findAggregates(TRAINING);
    const rest = findRestatements(TRAINING);
    if (!hits.length && !rest.length) { console.log('calculate-time --aggregates: no hand-typed aggregate, no trainer tab disagreeing with a leaf.'); return; }
    if (hits.length) {
      console.log(`${hits.length} hand-typed aggregate(s) — these should be computed, not stored:\n`);
      for (const h of hits) console.log(`  ${h.file}:${h.line}  [${h.what}]\n    ${h.text}\n`);
    }
    if (rest.length) {
      console.log(`${rest.length} trainer tab figure(s) disagreeing with the leaf that owns them:\n`);
      for (const h of rest) console.log(`  ${h.file}:${h.line}  ${h.slug} — tab says ${h.said}, leaf owns ${h.owned}`);
      console.log('');
    }
    process.exit(1);
  }
  if (argv.includes('--fix') || argv.includes('--fix-dry')) {
    const dry = argv.includes('--fix-dry');
    const changes = fixLeafTotals(TRAINING, { dry });
    if (!changes.length) { console.log('calculate-time --fix: every phase-composed exercise already states its phase sum.'); return; }
    console.log(`${dry ? 'WOULD CHANGE' : 'CHANGED'} ${changes.length} line(s):\n`);
    for (const c of changes) console.log(`  ${c.file}:${c.line}\n    - ${c.before}\n    + ${c.after}\n`);
    return;
  }
  let result;
  try {
    result = computeTraining(TRAINING);
  } catch (e) {
    console.error(e.message);
    process.exit(2);
  }

  let modules = result.modules;
  if (ONLY_MODULE) {
    modules = modules.filter(m => m.slug === ONLY_MODULE);
    if (!modules.length) {
      console.error(`Unknown module: ${ONLY_MODULE}. Known: ${result.modules.map(m => m.slug).join(', ')}`);
      process.exit(2);
    }
  }

  if (JSON_OUT) {
    console.log(JSON.stringify({ training: result.training, shapes: result.shapes, modules }, null, 2));
  } else {
    if (result.shapes.missing) console.log(`(no ${result.shapes.file} — caps unknown, verdicts skipped)\n`);
    console.log(`# ${result.label} — computed runtime\n`);
    console.log(modules.map(m => renderModule(m, SHAPE === true ? null : SHAPE)).join('\n\n'));
    const allMismatch = modules.reduce((n, m) => n + ((m.mismatches && m.mismatches.length) || 0), 0);
    if (allMismatch) console.log(`\n${allMismatch} mirror mismatch(es) awaiting a decision.`);
    const allProblems = modules.reduce((n, m) => n + m.problems.length, 0);
    console.log(`\n---\n${modules.length} module(s), ${allProblems} unresolved leaf/beat problem(s).`);
  }

  if (CHECK) {
    // The gate fails on BOTH: a broken leaf and an unresolved disagreement are
    // equally reasons not to trust the number a trainer would plan against.
    const problems = modules.flatMap(m => [
      ...m.problems.map(p => `${m.slug}: ${p}`),
      ...((m.mismatches || []).map(p => `${m.slug}: ${p}`)),
    ]);
    if (problems.length) {
      console.error(`\ncalculate-time --check: ${problems.length} problem(s)`);
      problems.forEach(p => console.error(`  ${p}`));
      process.exit(1);
    }
    console.error('\ncalculate-time --check: OK');
  }
}

module.exports = { parseBand, fmtBand, computeModule, computeTraining, readLeaf, readShapes, verdict, parseTransitions, parseCharges, renderRuntimeMap, addClock, readPhases, fixLeafTotals, findAggregates, findPrepDisagreements, findRestatements };

if (require.main === module) main();
