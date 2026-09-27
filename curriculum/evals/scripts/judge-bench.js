#!/usr/bin/env node
// judge-bench.js — the fixture and scorer that make judge optimisation safe.
//
// Optimising a judge for lead time without a recall guard has exactly one
// global optimum: a judge that returns PASS immediately. Every intermediate
// step toward it also looks like progress, because the only thing being
// measured improves monotonically all the way down. So speed is never scored
// alone here — a variant is accepted only if it holds recall against defects we
// planted ourselves and therefore know the truth about.
//
// The fixture is a real curriculum file with known violations injected at known
// lines. Ground truth is not a judgement, it is a record of what was inserted,
// which is the only kind of ground truth available without a human re-reading
// every body. Planted defects are chosen to be unambiguous — a banned word is a
// banned word — because a bench built on debatable violations measures the
// bench's opinions, not the judge's recall.
//
// Two failure directions, deliberately scored apart:
//   RECALL   planted defects the judge missed. A miss is the expensive error:
//            it is the judge failing at the only job it has.
//   NOISE    findings against lines we did not plant. Not automatically wrong —
//            the base file has real defects too — but a variant whose noise
//            climbs while recall holds is trading judgement for volume.
//
// Usage:
//   node curriculum/evals/scripts/judge-bench.js --build          # write fixtures
//   node curriculum/evals/scripts/judge-bench.js --score <instance.json> --fixture <name>
//   node curriculum/evals/scripts/judge-bench.js --report          # summarise runs/
//   node curriculum/evals/scripts/judge-bench.js --build-drift     # drift-scope fixture + queue item
//   node curriculum/evals/scripts/judge-bench.js --score-drift <instance.json>
'use strict'
const crypto = require('node:crypto')
const fs = require('node:fs')
const path = require('node:path')

const REPO = path.resolve(__dirname, '..', '..', '..')
const BENCH = path.join(REPO, 'curriculum', 'evals', 'bench')
const RUNS = path.join(BENCH, 'runs')

// ---------------------------------------------------------------------------
// Planted defects. Each names the rule it violates, the text to insert, and an
// anchor telling the builder where to put it. `detect` is how the scorer
// decides the judge found it — matched against the judge's finding/todo text,
// not against the body, so a judge that quotes the line gets credit and one
// that merely cites the rule number does not. Citing a rule is not finding a
// defect; the maintainer needs to know WHICH line.
// ---------------------------------------------------------------------------
const PLANTS = [
  {
    id: 'banned-word',
    rule: 'check_writing.md §1',
    text: 'This is crucially the step that changes how the run behaves.',
    detect: /crucially/i,
  },
  {
    id: 'ritual',
    rule: 'check_writing.md §2',
    text: 'Treat this as a ritual you repeat at the start of every session.',
    detect: /\britual\b/i,
  },
  {
    id: 'third-person-student',
    rule: 'check_writing.md §7',
    text: 'At this point the student should notice the test is still red.',
    detect: /the student/i,
  },
  {
    id: 'over-hedge',
    rule: 'check_writing.md §9',
    text: 'There is no penalty if you skip this, and it is completely fine either way.',
    detect: /no penalty|fine either way/i,
  },
  {
    id: 'session-biography',
    rule: 'check_writing.md §3',
    text: 'This section previously said something different; it was fixed on 2026-01-14.',
    detect: /previously said|2026-01-14/i,
  },
]

// Judgement-shaped plants. Generation 1 established that a fires-only ledger
// holds recall on MECHANICAL defects — four of its five plants were grep-
// decidable, so it proved the easy half and said nothing about the half the
// completeness ledger actually claims to buy. These five cannot be grepped: each
// needs the judge to hold a voice contract, a boundary convention or a scope
// rule in mind and notice prose that violates it while matching no banned string.
//
// Detection for these leans on the LINE the judge cites rather than on matching
// its wording, because there is no canonical phrasing for "this is the wrong
// register" and a text matcher would score the judge's vocabulary instead of its
// recall.
const JUDGEMENT_PLANTS = [
  {
    id: 'register-slip',
    rule: 'check_writing.md §4 (register match)',
    text: 'This capability unlocks transformational value across your entire delivery organisation.',
    detect: /register|voice|transformational|unlocks|marketing/i,
  },
  {
    id: 'unearned-term',
    rule: 'check_student_facing.md §2 (earn every technical term)',
    text: 'Wire this through the subagent context window before you hit the compaction boundary.',
    detect: /unearned|earn|primer|compaction|subagent context|term of art/i,
  },
  {
    id: 'slogan-no-carveout',
    rule: 'check_writing.md §12 (punchy framing owes a carve-out)',
    text: 'Every test you write is a test the agent can never break.',
    detect: /carve.?out|boundary|absolute|slogan|never break|overclaim/i,
  },
  {
    id: 'value-prop-leak',
    rule: 'check_writing.md §13 (positioning out of a teaching beat)',
    text: 'Unlike vendor tooling that locks your team in, this approach keeps you in control of the work.',
    detect: /positioning|value.?prop|vendor|marketing|defensive/i,
  },
  {
    id: 'author-we',
    rule: 'check_writing.md §6 (author-we ban)',
    text: 'We believe the loop matters more than the model, and we built this training around that.',
    detect: /author.?we|first.person|we believe|training.as.organisation/i,
  },
]

// The base file. A real exercise, so the judge is reading genuine curriculum
// prose rather than a synthetic body whose defects stand out against nothing.
const BASE = 'curriculum/exercises/close-the-ticket.md'

function buildFixture(name, plantIds, base = BASE) {
  const raw = fs.readFileSync(path.join(REPO, base), 'utf8')
  const lines = raw.split('\n')

  // Insert into the body region only — a plant below the maintainer cut or
  // inside a fence is correctly ignored by every judge, so scoring a miss on it
  // would penalise the judge for being right.
  let cut = lines.findIndex(l => /^<!--\s*maintainer\s*-->/.test(l))
  if (cut === -1) cut = lines.length

  // Find a prose paragraph in the body to append after: a non-empty, non-heading,
  // non-fence line with a blank line following it.
  const anchors = []
  let inFence = false
  for (let i = 0; i < cut; i++) {
    if (/^\s*```/.test(lines[i])) { inFence = !inFence; continue }
    if (inFence) continue
    if (!lines[i].trim() || /^#{1,6}\s/.test(lines[i]) || /^\s*[-*]\s/.test(lines[i])) continue
    if (i + 1 < cut && !lines[i + 1].trim()) anchors.push(i)
  }
  const ALL_PLANTS = [...PLANTS, ...JUDGEMENT_PLANTS]
  if (anchors.length < plantIds.length) {
    throw new Error(`base file has ${anchors.length} usable anchors, need ${plantIds.length}`)
  }

  const planted = []
  // Insert from the bottom up so earlier insertions do not shift later anchors.
  const chosen = plantIds.map((id, k) => ({ id, at: anchors[Math.floor(k * anchors.length / plantIds.length)] }))
  for (const c of [...chosen].sort((a, b) => b.at - a.at)) {
    const plant = ALL_PLANTS.find(p => p.id === c.id)
    if (!plant) throw new Error(`unknown plant: ${c.id}`)
    lines.splice(c.at + 1, 0, '', plant.text)
  }
  // Re-find each plant's final line number AFTER all insertions, so ground
  // truth records where the text actually ended up rather than where it was
  // aimed. A ground truth that is itself approximate cannot score a line cite.
  const out = lines.join('\n')
  const finalLines = out.split('\n')
  for (const c of chosen) {
    const plant = ALL_PLANTS.find(p => p.id === c.id)
    const at = finalLines.findIndex(l => l === plant.text)
    planted.push({ id: plant.id, rule: plant.rule, line: at + 1, text: plant.text, detect: plant.detect.source, flags: plant.detect.flags })
  }

  fs.mkdirSync(path.join(BENCH, 'fixtures'), { recursive: true })
  const fixPath = path.join(BENCH, 'fixtures', `${name}.md`)
  fs.writeFileSync(fixPath, out)
  const truth = {
    name,
    base,
    fixture: path.relative(REPO, fixPath),
    source_sha: crypto.createHash('sha256').update(out, 'utf8').digest('hex'),
    planted: planted.sort((a, b) => a.line - b.line),
  }
  fs.writeFileSync(path.join(BENCH, 'fixtures', `${name}.truth.json`), JSON.stringify(truth, null, 1) + '\n')
  return truth
}

// ---------------------------------------------------------------------------
// Scoring. Reads the instance a judge wrote and asks, per planted defect,
// whether ANY finding / suggestion / note / REVISE row names it. Deliberately
// generous about WHERE the judge said it, because a judge that files a planted
// banned word as a suggestion has still found it. Missing it entirely is the
// failure being measured.
// ---------------------------------------------------------------------------
function scoreInstance(instancePath, truth) {
  const d = JSON.parse(fs.readFileSync(instancePath, 'utf8'))
  const rows = Array.isArray(d.rules_evaluated) ? d.rules_evaluated.filter(r => r && typeof r === 'object') : []

  // Every place a judge can name a defect, flattened into searchable text.
  const claims = []
  for (const r of rows) {
    if (r.verdict === 'REVISE') claims.push({ where: `rule ${r.compendium} §${r.rule_index}`, text: `${r.evidence || ''} ${r.fix_hint || ''}`, line: null })
  }
  for (const t of (d.suggestions || [])) claims.push({ where: 'suggestion', text: `${t.rule || ''} ${t.note || ''} ${t.now || ''} ${t.proposed || ''}`, line: t.line ?? null })
  for (const t of (d.notes || [])) { if (t && typeof t === 'object') claims.push({ where: 'note', text: `${t.rule || ''} ${t.note || ''}`, line: t.line ?? null }) }
  for (const f of (d.findings || [])) claims.push({ where: 'finding', text: `${f.rule || ''} ${f.quote || ''} ${f.harm || ''}`, line: f.line ?? null })

  const hits = []
  const misses = []
  for (const p of truth.planted) {
    const re = new RegExp(p.detect, p.flags)
    const hit = claims.find(c => re.test(c.text) || (c.line !== null && Math.abs(c.line - p.line) <= 1))
    if (hit) hits.push({ id: p.id, line: p.line, where: hit.where })
    else misses.push({ id: p.id, line: p.line, rule: p.rule })
  }

  // Noise: claims that match no planted defect. Reported, never gated — the
  // base file has real defects and a judge is entitled to find them.
  const plantRes = truth.planted.map(p => new RegExp(p.detect, p.flags))
  const noise = claims.filter(c => !plantRes.some(re => re.test(c.text))).length

  return {
    instance: path.relative(REPO, instancePath),
    rows: rows.length,
    na_rows: rows.filter(r => r.verdict === 'N/A').length,
    recall: `${hits.length}/${truth.planted.length}`,
    recall_pct: truth.planted.length ? hits.length / truth.planted.length : 1,
    hits, misses, noise,
    verdict: d.verdict,
  }
}

function report() {
  if (!fs.existsSync(RUNS)) return []
  // Only `.run.json` — the sibling `.instance.json` files are judge output, not
  // run records, and reading them as records prints a row of undefineds per variant.
  const runs = fs.readdirSync(RUNS).filter(f => f.endsWith('.run.json'))
    .map(f => JSON.parse(fs.readFileSync(path.join(RUNS, f), 'utf8')))
    .sort((a, b) => (a.iteration || 0) - (b.iteration || 0))
  return runs
}

// ---------------------------------------------------------------------------
// DRIFT fixture — the recall guard for drift-scoped re-fires (drift-scope.js).
//
// A drift judge reads only the moved rules; every other row is carried. Two
// plants on the base file, one per side of that line:
//   moved plant  violates the rule marked moved. The drift judge must catch it.
//   kept plant   violates a rule that did NOT move, on a new line no carried
//                row quotes. The carry keeps that rule's old PASS row, so a
//                drift run is expected to miss it. That is the trust boundary:
//                live, a body edit like this routes the class as diff-region,
//                so it never reaches drift scope — the queue's routing is what
//                vouches for the carried rows, exactly as it vouches for a
//                class it does not list at all. The full-scope control run
//                must catch both, or the fixture proves nothing.
// A third, deterministic check needs no judge: edit a line a carried row
// quotes, and the carry guard must refuse (route: full). `--build-drift`
// fails if it does not, or if the guard refuses the clean fixture.
//
// The seed is the base file's real PASS instance re-pointed at the fixture.
// `--build-drift` writes it beside the fixture, never into instances/ — the
// live run copies it there itself (see curriculum/evals/README.md).
// ---------------------------------------------------------------------------
const DRIFT = {
  name: 'writing-drift',
  cls: 'writing',
  // A PASS instance whose carried quotes all pass the guard against its own file.
  base: 'curriculum/exercises/compound-and-close.md',
  seed: 'curriculum/evals/instances/ae101--exercise--compound-and-close.writing.json',
  moved: 'check_writing:3',
  movedPlant: 'session-biography',
  keptPlant: 'banned-word',
}

function buildDrift() {
  const os = require('node:os')
  const { slugFor } = require('./derive-body-view.js')
  const ds = require('./drift-scope.js')
  const truth = buildFixture(DRIFT.name, [DRIFT.movedPlant, DRIFT.keptPlant], DRIFT.base)
  const slug = slugFor(truth.fixture)
  const seed = JSON.parse(fs.readFileSync(path.join(REPO, DRIFT.seed), 'utf8'))
  const [moved] = ds.parseRuleIds([DRIFT.moved])
  const isMoved = r => r && `${r.compendium}|${r.rule_index}` === `${moved.compendium}|${moved.rule}`
  if (seed.verdict !== 'PASS') throw new Error(`seed ${DRIFT.seed} is ${seed.verdict}, need a PASS instance`)
  if (!(seed.rules_evaluated || []).some(isMoved)) throw new Error(`seed has no row for ${DRIFT.moved}`)
  seed.file = truth.fixture
  seed.training = slug.split('--')[0]
  const seedPath = path.join(BENCH, 'fixtures', `${DRIFT.name}.seed.json`)
  fs.writeFileSync(seedPath, JSON.stringify(seed, null, 2) + '\n')

  // The guard, against a scratch copy of the seed: clean fixture → drift.
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'bench-drift-'))
  fs.writeFileSync(path.join(tmp, `${slug}.${DRIFT.cls}.json`), JSON.stringify(seed))
  const item = {
    file: truth.fixture, instanceSlug: slug, training: seed.training, classes: [DRIFT.cls],
    detail: { [DRIFT.cls]: 'rule-drift' },
    driftRules: { [DRIFT.cls]: [{ compendium: moved.compendium.replace(/\.md$/, ''), rule: moved.rule }] },
    pins: {},
  }
  const [annotated] = ds.annotate([item], { instancesDir: tmp })
  const plan = annotated.driftScope[DRIFT.cls]
  if (plan.route !== 'drift') throw new Error(`the carry guard refused the clean fixture: ${plan.reason}`)

  // Quoted variant: reword one line a carried row quotes → the guard must refuse.
  const fixText = fs.readFileSync(path.join(REPO, truth.fixture), 'utf8')
  let quoted = null
  for (const r of seed.rules_evaluated.filter(r => !isMoved(r))) {
    quoted = ds.quotesOf(r).map(q => q.split(/\.\.\.|…/)[0].trim()).find(q => q.length >= 12 && fixText.includes(q))
    if (quoted) break
  }
  if (!quoted) throw new Error('no carried row quotes a line of the fixture — nothing to test the guard against')
  const qFile = path.join(tmp, `${DRIFT.name}-quoted.md`)
  fs.writeFileSync(qFile, fixText.replace(quoted, quoted.replace(/\b(\w{4,})\b/, 'REWORDED')))
  fs.writeFileSync(path.join(tmp, `${slugFor(path.relative(REPO, qFile))}.${DRIFT.cls}.json`), JSON.stringify(seed))
  const qPlan = ds.planClass({ file: qFile, cls: DRIFT.cls, rules: [DRIFT.moved], instancesDir: tmp })
  if (qPlan.route !== 'full') throw new Error(`the carry guard kept rows after a quoted line changed ("${quoted}")`)

  fs.writeFileSync(path.join(BENCH, 'fixtures', `${DRIFT.name}.items.json`), JSON.stringify([annotated], null, 1) + '\n')
  truth.drift = {
    cls: DRIFT.cls, moved: DRIFT.moved, moved_plant: DRIFT.movedPlant, kept_plant: DRIFT.keptPlant,
    slug, seed: path.relative(REPO, seedPath), instance: `curriculum/evals/instances/${slug}.${DRIFT.cls}.json`,
    quoted_guard: { quoted, route: qPlan.route, reason: qPlan.reason },
  }
  fs.writeFileSync(path.join(BENCH, 'fixtures', `${DRIFT.name}.truth.json`), JSON.stringify(truth, null, 1) + '\n')
  return truth
}

// Pass = the moved plant caught, the instance merged as drift scope, and every
// carried row byte-identical to the seed. The kept plant is reported, never
// gated: missing it is the documented trust boundary, not a regression.
function scoreDrift(instancePath, truth) {
  const s = scoreInstance(instancePath, truth)
  const d = JSON.parse(fs.readFileSync(instancePath, 'utf8'))
  const seed = JSON.parse(fs.readFileSync(path.join(REPO, truth.drift.seed), 'utf8'))
  const [moved] = require('./drift-scope.js').parseRuleIds([truth.drift.moved])
  const key = r => `${r.compendium}|${r.rule_index}`
  const movedKey = `${moved.compendium}|${moved.rule}`
  const carriedSeed = seed.rules_evaluated.filter(r => key(r) !== movedKey).map(r => JSON.stringify(r))
  const carriedNow = (d.rules_evaluated || []).filter(r => key(r) !== movedKey).map(r => JSON.stringify(r))
  const carriedIntact = carriedSeed.length === carriedNow.length && carriedSeed.every((r, i) => r === carriedNow[i])
  const movedHit = s.hits.some(h => h.id === truth.drift.moved_plant)
  const keptHit = s.hits.some(h => h.id === truth.drift.kept_plant)
  return {
    ...s,
    scope: d.scope || null,
    moved_plant: movedHit ? 'caught' : 'MISSED',
    kept_plant: keptHit ? 'caught' : 'missed (trust boundary — a live edit like this routes as diff-region)',
    carried_intact: carriedIntact,
    pass: movedHit && d.scope === 'drift' && carriedIntact,
  }
}

module.exports = { PLANTS, JUDGEMENT_PLANTS, BASE, DRIFT, buildFixture, buildDrift, scoreInstance, scoreDrift, report, BENCH, RUNS }

if (require.main === module) {
  const argv = process.argv.slice(2)
  const arg = k => { const i = argv.indexOf(k); return i === -1 ? null : argv[i + 1] }

  if (argv.includes('--build')) {
    for (const [name, pool] of [['writing-5plant', PLANTS], ['writing-5judge', JUDGEMENT_PLANTS]]) {
      const t = buildFixture(name, pool.map(p => p.id))
      console.log(`built ${t.fixture} — ${t.planted.length} defects at lines ${t.planted.map(p => p.line).join(', ')}`)
    }
    process.exit(0)
  }

  if (argv.includes('--build-drift')) {
    const t = buildDrift()
    console.log(`built ${t.fixture} — plants at lines ${t.planted.map(p => `${p.id}@${p.line}`).join(', ')}`)
    console.log(`seed ${t.drift.seed} → copy to ${t.drift.instance} before each run`)
    console.log(`queue item ${path.relative(REPO, path.join(BENCH, 'fixtures', `${DRIFT.name}.items.json`))} (route: drift)`)
    console.log(`carry guard refuses a reworded quoted line: ${t.drift.quoted_guard.reason}`)
    process.exit(0)
  }

  if (argv.includes('--score-drift')) {
    const inst = arg('--score-drift')
    const truth = JSON.parse(fs.readFileSync(path.join(BENCH, 'fixtures', `${DRIFT.name}.truth.json`), 'utf8'))
    const s = scoreDrift(path.isAbsolute(inst) ? inst : path.join(REPO, inst), truth)
    console.log(JSON.stringify(s, null, 1))
    process.exit(s.pass ? 0 : 2)
  }

  if (argv.includes('--score')) {
    const inst = arg('--score')
    const fixture = arg('--fixture') || 'writing-5plant'
    const truth = JSON.parse(fs.readFileSync(path.join(BENCH, 'fixtures', `${fixture}.truth.json`), 'utf8'))
    const s = scoreInstance(path.isAbsolute(inst) ? inst : path.join(REPO, inst), truth)
    console.log(JSON.stringify(s, null, 1))
    process.exit(s.recall_pct === 1 ? 0 : 2)
  }

  if (argv.includes('--report')) {
    const runs = report()
    if (!runs.length) { console.log('no runs recorded'); process.exit(0) }
    console.log('iter  variant                    secs   rows  N/A  recall  noise  verdict')
    for (const r of runs) {
      console.log([
        String(r.iteration).padEnd(5),
        String(r.variant).padEnd(26),
        String(r.seconds ?? '-').padStart(5),
        String(r.rows ?? '-').padStart(5),
        String(r.na_rows ?? '-').padStart(4),
        String(r.recall ?? '-').padStart(7),
        String(r.noise ?? '-').padStart(6),
        String(r.verdict ?? '-'),
      ].join(' '))
    }
    process.exit(0)
  }

  console.error('usage: judge-bench.js --build | --build-drift | --score <instance> [--fixture <name>] | --score-drift <instance> | --report')
  process.exit(1)
}
