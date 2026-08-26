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

function buildFixture(name, plantIds) {
  const raw = fs.readFileSync(path.join(REPO, BASE), 'utf8')
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
    base: BASE,
    fixture: path.relative(REPO, fixPath),
    source_sha: crypto.createHash('sha256').update(out, 'utf8').digest('hex'),
    planted: planted.sort((a, b) => a.line - b.line),
  }
  fs.writeFileSync(path.join(BENCH, 'fixtures', `${name}.truth.json`), JSON.stringify(truth, null, 1) + '\n')
  return truth
}

// ---------------------------------------------------------------------------
// Scoring. Reads the instance a judge wrote and asks, per planted defect,
// whether ANY finding / todo / REVISE row names it. Deliberately generous about
// WHERE the judge said it: findings, todos and revised rule rows all count,
// because a judge that files a planted banned word as a non-blocking todo has
// still found it. Missing it entirely is the failure being measured.
// ---------------------------------------------------------------------------
function scoreInstance(instancePath, truth) {
  const d = JSON.parse(fs.readFileSync(instancePath, 'utf8'))
  const rows = Array.isArray(d.rules_evaluated) ? d.rules_evaluated.filter(r => r && typeof r === 'object') : []

  // Every place a judge can name a defect, flattened into searchable text.
  const claims = []
  for (const r of rows) {
    if (r.verdict === 'REVISE') claims.push({ where: `rule ${r.compendium} §${r.rule_index}`, text: `${r.evidence || ''} ${r.fix_hint || ''}`, line: null })
  }
  for (const t of (d.todos || [])) claims.push({ where: 'todo', text: `${t.rule || ''} ${t.note || ''}`, line: t.line ?? null })
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

module.exports = { PLANTS, JUDGEMENT_PLANTS, BASE, buildFixture, scoreInstance, report, BENCH, RUNS }

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

  console.error('usage: judge-bench.js --build | --score <instance> [--fixture <name>] | --report')
  process.exit(1)
}
