#!/usr/bin/env node
'use strict'
/*
 * sim-freshness — "are the simulation traces still about the file they describe?"
 *
 * eval-queue answers what owes a JUDGE. It cannot answer this. A judge stamps
 * `behavior` and `story` PASS from a sim trace, and the pin then records that
 * the class was judged — but the trace itself is a cache, and a cache outlives
 * the body it read. `memory/compounded/2026-08-19-platform-a-stale-cache-
 * fabricates-evidence-not-just-staleness.md`: a regenerated-from-memory trace
 * does not go quiet, it interpolates. So a green queue and a rotten cache look
 * identical from the outside, and the next re-fire reuses the rot.
 *
 * Each trace records `content_sha` — sha256 of the whole file at generation.
 * That is a real hash (the judge shells out for it), so it can be checked:
 *
 *   fresh       sha == the file right now. The trace describes what is there.
 *   stamp-only  sha matches an older commit, and every line changed since sits
 *               in the maintainer/frontmatter region. Expected by construction:
 *               update-quality.sh writes the Quality line AFTER the judge runs,
 *               so a just-stamped file always differs from the trace that
 *               earned the stamp. Routed through the same changeTags the queue
 *               uses, so this file and the queue can never disagree.
 *   body-moved  student-facing lines changed since the trace. A re-fire that
 *               reuses it reasons about prose that is gone.
 *   unanchored  the sha matches NO version of the file in this repo's history.
 *               The trace was written against something never committed, or the
 *               hash was not computed at all. Worst class: it cannot be aged,
 *               only regenerated.
 *
 * --mood reads the other half. A persona trace scores 1-10 per phase-end and
 * at close against the module's mood contract (`curriculum/evals/simulation.md`
 * §Mood scale): 8 is the ship bar, 7 means the mood lands ONLY if a trainer
 * compensates, below 7 means the target mood is absent. Those numbers sit in
 * the cache and nothing reads them, so a file can carry a 5 at close and a
 * clean PASS on every pin — the pin records that a judge ran, not what the
 * persona felt. Every low beat prints WITH its freshness verdict, because the
 * two answers are only meaningful together: a 6 on a fresh trace is a finding,
 * a 6 on a body-moved trace is a question about prose that no longer exists.
 *
 * Usage:
 *   node curriculum/evals/scripts/sim-freshness.js [--training ae101|all]
 *                                                  [--mood] [--bar 8]
 *                                                  [--class behavior|persona]
 *                                                  [--verdict body-moved,unanchored]
 *                                                  [--json] [--gate] [--repo <path>]
 * Exit 0 always, unless --gate, which exits 1 when anything is body-moved or
 * unanchored. Report tool by default; gate only when a caller asks to be gated.
 */
const fs = require('node:fs')
const path = require('node:path')
const crypto = require('node:crypto')
const { execFileSync } = require('node:child_process')
const { buildUniverse } = require('./eval-queue.js')
const { parseHunks, buildLineMeta, changeTags, trainingOf, typeOf, linkFinder } = require('./scan-stale-classes.js')

const SIM_DIR = 'curriculum/evals/sim-cache'
const NAME_RE = /^(.+)\.(behavior|persona)\.json$/
const sha256 = s => crypto.createHash('sha256').update(s).digest('hex')

function git(repo, args) {
  try { return execFileSync('git', args, { cwd: repo, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 }) }
  catch { return '' }
}

function contentView(repo, rel, cls) {
  if (cls !== 'behavior') return fs.readFileSync(path.join(repo, rel), 'utf8')
  return execFileSync(process.execPath, [path.join(repo, 'scripts/expand-md.js'), rel], {
    cwd: repo,
    encoding: 'utf8',
    maxBuffer: 64 * 1024 * 1024,
  })
}

// A trace names its file by slug only. The universe is the authority on where
// that slug lives; a slug it does not carry is reported, never guessed at — the
// same refusal eval-queue makes for UNOWNED files, for the same reason.
// The last `--` segment is the slug, EXCEPT when a customer variant prefixes it:
// `ae101--autumn-learn-from-the-test` and `ae101--northwind-learn-from-the-test`
// are two personas walking one file. Peel leading tokens until the index knows
// the name. Peeling only ever shortens, so a wrong guess resolves to nothing
// rather than to a neighbour.
// A trace stem is `<training>--[<surface>--][<variant>-]<slug>`. The training
// half is not decoration: `getting-going` and `prework` exist in both ae101 and
// agents-101, so resolving on the bare tail picked whichever training sorted
// first in the directory listing and classified one training's trace against
// the other's body. Scoped key wins; bare key is the fallback for shared-pool
// files and older indexes that carry no scoped entries at all.
// The surface types a trace stem may carry between the training and the slug.
// `spot-gaps-build-the-loop` is a real AE101 module AND a real AE101 exercise,
// so the type segment is not decoration either: without it the module's trace
// resolves to the exercise's body, and a rename would put one on top of the
// other.
const TYPES = new Set(['module', 'exercise', 'lecture', 'supplementary', 'reference', 'module-set'])

function resolveSlug(idx, stem) {
  const seg = stem.split('--')
  const training = seg.length > 1 ? seg[0] : null
  const type = seg.length > 2 && TYPES.has(seg[1]) ? seg[1] : null
  // Does some OTHER training own this exact file? Then a bare-key hit is that
  // training's body and must be refused. A file no training scopes is shared or
  // unowned, and anyone may name it — refusing there turns resolvable traces
  // into reported orphans, which is the opposite of the point.
  const ownedByAnother = rel => [...idx.entries()]
    .some(([k, v]) => v === rel && k.includes('::') && k.split('::')[0] !== training)
  let slug = seg[seg.length - 1]
  while (slug) {
    // Most specific first: training + type + slug, then training + slug, then
    // bare. A wrong type segment falls through rather than orphaning a trace
    // whose file is otherwise unambiguous.
    if (training && type && idx.has(`${training}::${type}::${slug}`)) return idx.get(`${training}::${type}::${slug}`)
    if (training && idx.has(`${training}::${slug}`)) return idx.get(`${training}::${slug}`)
    if (idx.has(slug)) {
      const rel = idx.get(slug)
      // An orphan is a visible hole; a wrong resolution is an invisible wrong
      // answer, so the collision case loses and the shared case wins.
      if (!training || !ownedByAnother(rel)) return rel
      return null
    }
    const cut = slug.indexOf('-')
    if (cut === -1) return null
    slug = slug.slice(cut + 1)
  }
  return null
}

// Two keys per surface: `<slug>` (first wins, back-compat) and
// `<training>::<slug>` (exact). resolveSlug prefers the scoped one.
function slugIndex(repo) {
  const idx = new Map()
  const findLinkers = linkFinder(repo)
  for (const rel of buildUniverse(repo)) {
    const slug = path.basename(rel, '.md')
    if (!idx.has(slug)) idx.set(slug, rel)
    const training = trainingOf(rel, findLinkers)
    if (training) {
      // Bare-scoped key is last-wins and therefore ambiguous for a slug owned by
      // two surface types; the typed key is the one that disambiguates.
      if (!idx.has(`${training}::${slug}`)) idx.set(`${training}::${slug}`, rel)
      const ty = typeOf(rel)
      if (ty) idx.set(`${training}::${ty}::${slug}`, rel)
    }
  }
  return idx
}

// Every historical blob of one file, hashed once each. Two costs dominate and
// both are process spawns, not hashing: one `git rev-parse` per commit, and one
// `git cat-file` per blob. `cat-file --batch` collapses both into a single
// child process fed every `<commit>:<path>` ref at once — the difference
// between this script taking minutes and taking a second. Memoized per file
// because a behavior trace and a persona trace ask about the same body. Keyed
// by repo AND path: two checkouts hold the same relative path with different
// histories, and a path-keyed memo would answer one out of the other's cache —
// well-formed, wrong, and indistinguishable from right.
const HIST = new Map()
function historyShas(repo, rel) {
  const key = `${repo}\u0000${rel}`
  if (HIST.has(key)) return HIST.get(key)
  const commits = git(repo, ['log', '--format=%H', '--follow', '--', rel]).trim().split('\n').filter(Boolean)
  const out = []
  if (commits.length) {
    let batch
    try {
      batch = execFileSync('git', ['cat-file', '--batch'], {
        cwd: repo, input: commits.map(c => `${c}:${rel}`).join('\n') + '\n',
        maxBuffer: 256 * 1024 * 1024,
      })
    } catch { batch = Buffer.alloc(0) }
    // Each record is `<oid> <type> <size>\n<size bytes>\n`; a ref git cannot
    // resolve answers `<ref> missing\n` instead. Walk by the declared size
    // rather than by newline — a markdown body is full of newlines.
    let i = 0, n = 0
    while (i < batch.length && n < commits.length) {
      const nl = batch.indexOf(10, i)
      if (nl === -1) break
      const header = batch.toString('utf8', i, nl)
      if (header.endsWith(' missing')) { i = nl + 1; n++; continue }
      const size = Number(header.split(' ')[2])
      if (!Number.isFinite(size)) break
      out.push({ commit: commits[n], sha: sha256(batch.toString('utf8', nl + 1, nl + 1 + size)) })
      i = nl + 1 + size + 1
      n++
    }
  }
  HIST.set(key, out)
  return out
}

function classify(repo, rel, trace, current) {
  if (!trace.content_sha) return { verdict: 'unanchored', note: 'trace records no content_sha' }
  if (typeof trace.content_sha !== 'string' || !/^[0-9a-f]{64}$/.test(trace.content_sha)) {
    return { verdict: 'unanchored', note: `content_sha is not a sha256: ${String(trace.content_sha).slice(0, 24)}` }
  }
  if (sha256(current) === trace.content_sha) return { verdict: 'fresh', note: '' }

  const hit = historyShas(repo, rel).find(h => h.sha === trace.content_sha)
  if (!hit) return { verdict: 'unanchored', note: 'sha matches no committed version of this file' }

  const tagged = changeTags(buildLineMeta(current), parseHunks(git(repo, ['diff', hit.commit, '--', rel])))
  const classes = [...(tagged.tags || [])].sort().join('/')
  return tagged.changedBody > 0
    ? { verdict: 'body-moved', note: `${tagged.changedBody} body line(s) since ${hit.commit.slice(0, 8)}${classes ? ` → ${classes}` : ''}` }
    : { verdict: 'stamp-only', note: `maintainer region only since ${hit.commit.slice(0, 8)}` }
}

function collect(repo, want) {
  const idx = slugIndex(repo)
  const findLinkers = linkFinder(repo)
  const rows = []
  let names
  try { names = fs.readdirSync(path.join(repo, SIM_DIR)).filter(f => f.endsWith('.json')).sort() }
  catch { return rows }

  // An unresolved trace still belongs to somebody: its own stem names the
  // training. Reporting it under every training made one training's orphan read
  // as three trainings' holes — and a no-score list longer than the hole it
  // describes is a list people stop reading. A trace with no derivable prefix
  // belongs to nobody and shows only under `--training all`.
  const named = stem => { const seg = stem.split('--'); return seg.length > 1 ? seg[0] : null }
  const inScope = t => want === 'all' || t === want

  for (const name of names) {
    const m = NAME_RE.exec(name)
    if (!m) {
      if (want === 'all') rows.push({ name, verdict: 'unresolved', note: 'filename is not <slug>.<behavior|persona>.json' })
      continue
    }
    const [, stem, cls] = m
    const rel = resolveSlug(idx, stem)
    if (!rel) {
      const claimed = named(stem)
      if (want === 'all' || (claimed !== null && claimed === want)) {
        rows.push({ name, cls, training: claimed, verdict: 'unresolved', note: `no surface matches ${stem.split('--').pop()} — trace is orphaned` })
      }
      continue
    }

    const training = trainingOf(rel, findLinkers) || 'shared'
    if (!inScope(training)) continue

    let trace
    try { trace = JSON.parse(fs.readFileSync(path.join(repo, SIM_DIR, name), 'utf8')) }
    catch (e) { rows.push({ name, cls, file: rel, training, verdict: 'unresolved', note: `unparseable: ${e.message.slice(0, 60)}` }); continue }

    const current = contentView(repo, rel, cls)
    const { verdict, note } = classify(repo, rel, trace, current)
    const row = { name, cls, file: rel, training, generated_at: (trace.generated_at || '').slice(0, 10) || null, verdict, note }
    if (cls === 'persona') row.mood = { contract: trace.module_mood_contract || null, beats: moodBeats(trace), exempt: moodExemptions(trace) }
    rows.push(row)
  }
  return rows
}

// Persona traces only: a behavior trace reasons about Claude's response
// distribution and scores no mood.
// `personas` ships in two shapes and the difference is not cosmetic: an array
// of persona objects, and a map keyed by persona name. Reading only the array
// meant the map fell through to `trace.phases`, found none, and returned no
// beats at all — scores present in the file, absent from every tally that
// decides whether the corpus ships. Fan out on either, and carry the map's key
// into the label so three readers of one file stay tellable apart.
function fanOut(trace, fn) {
  if (Array.isArray(trace.personas)) return trace.personas.flatMap(p => fn(p, ''))
  if (trace.personas && typeof trace.personas === 'object') {
    return Object.entries(trace.personas).flatMap(([name, p]) => fn(p, name))
  }
  return null
}
const at = (label, tail) => (label ? `${label} · ${tail}` : tail)

function moodBeats(trace, label = '') {
  const fanned = fanOut(trace, moodBeats)
  if (fanned) return fanned
  const beats = []
  for (const p of trace.phases || []) {
    if (typeof p.mood_score === 'number') {
      beats.push({ at: at(label, `phase ${p.phase_index}: ${p.phase_name || ''}`.trim()), score: p.mood_score, note: p.mood_note || '' })
    }
  }
  if (trace.close && typeof trace.close.mood_score === 'number') {
    beats.push({ at: at(label, 'close'), score: trace.close.mood_score, note: trace.close.mood_note || '' })
  }
  return beats
}

// The other half of a null score. A persona run that reaches a SETUP beat has
// nothing to score — the mood contract binds teaching, not scaffolding — and it
// says so in `mood_note` instead of inventing a number. That is a result, and
// reporting it as an unrun instrument sends the maintainer to re-run a run that
// already happened and already reasoned. The discriminator is whether anything
// was written beside the null: a note is an abstention, bare silence is a hole.
function moodExemptions(trace, label = '') {
  const fanned = fanOut(trace, moodExemptions)
  if (fanned) return fanned
  const out = []
  for (const p of trace.phases || []) {
    if (typeof p.mood_score === 'number') continue
    if (p.mood_note) out.push({ at: at(label, `phase ${p.phase_index}: ${p.phase_name || ''}`.trim()), note: p.mood_note })
  }
  const c = trace.close
  if (c && typeof c.mood_score !== 'number' && c.mood_note) out.push({ at: at(label, 'close'), note: c.mood_note })
  return out
}

// Freshness verdicts, worst first, so a low beat that cannot be trusted is read
// before one that can be acted on.
const TRUST = { unanchored: 0, 'body-moved': 1, unresolved: 2, 'stamp-only': 3, fresh: 4 }

function renderMood(rows, want, bar) {
  const scored = rows.filter(r => r.mood)
  const out = [`=== SIM MOOD — training: ${want} · ship bar ${bar}/10 ===`, '']
  if (!scored.length) { out.push('  No persona traces in scope.'); return out.join('\n') }

  const all = scored.flatMap(r => r.mood.beats.map(b => ({ ...b, name: r.name, verdict: r.verdict })))
  const low = all.filter(b => b.score < bar).sort((a, b) => a.score - b.score || TRUST[a.verdict] - TRUST[b.verdict])

  for (const b of low) {
    const band = b.score < 7 ? 'TARGET MOOD ABSENT' : 'FACILITATOR-PREMIUM'
    out.push(`  [${b.score}/10] ${band} · trace ${b.verdict}`)
    out.push(`      ${b.name.replace('.persona.json', '')} — ${b.at}`)
    if (b.note) out.push(`      ${b.note.replace(/\s+/g, ' ').slice(0, 220)}`)
    out.push('')
  }

  const hist = {}
  for (const b of all) hist[b.score] = (hist[b.score] || 0) + 1
  const unscored = scored.filter(r => !r.mood.beats.length)
  const exempt = unscored.filter(r => (r.mood.exempt || []).length)
  const silent = unscored.filter(r => !(r.mood.exempt || []).length)
  out.push(`${scored.length} persona traces · ${all.length} scored beats · ${low.length} below the ${bar}/10 bar`)
  out.push(`  distribution: ${Object.keys(hist).sort((a, b) => a - b).map(k => `${k}→${hist[k]}`).join('  ')}`)
  if (exempt.length) {
    // A run that reached only SETUP beats scored nothing on purpose and wrote
    // down why. Listed so the tally still adds up, never as work owed.
    out.push(`  ${exempt.length} persona trace(s) scored nothing because every beat is mood-exempt — the instrument ran and abstained:`)
    for (const r of exempt) out.push(`      ${r.name.replace('.persona.json', '')} — ${r.mood.exempt[0].note.replace(/\s+/g, ' ').slice(0, 120)}`)
  }
  if (silent.length) {
    // A trace that scored nothing AND said nothing is not a pass. It is an
    // unrun instrument, and it reads as clean in every tally that only looks at
    // the numbers present. Whether that is a hole depends on the surface:
    // simulation.md §When makes the persona run required for an exercise,
    // optional for a lecture or prework. A list to triage, not one of failures.
    out.push(`  ${silent.length} persona trace(s) carry NO mood score and no exemption — the instrument did not run.`)
    out.push('    Required for exercises, optional for lectures/prework (simulation.md §When):')
    for (const r of silent) out.push(`      ${r.name.replace('.persona.json', '')}`)
  }
  return out.join('\n')
}

const ORDER = ['unanchored', 'body-moved', 'unresolved', 'stamp-only', 'fresh']

function render(rows, want) {
  const out = [`=== SIM FRESHNESS — training: ${want} ===`, '']
  if (!rows.length) { out.push('  No traces in scope.'); return out.join('\n') }

  for (const verdict of ORDER) {
    const group = rows.filter(r => r.verdict === verdict)
    if (!group.length) continue
    out.push(`${verdict.toUpperCase()} (${group.length})`)
    // fresh and stamp-only need no per-row detail: both mean the trace still
    // describes the body a judge would read. Printing 100 clean rows buries
    // the handful that do not.
    if (verdict === 'fresh' || verdict === 'stamp-only') { out.push(''); continue }
    for (const r of group) out.push(`  ${r.name}${r.generated_at ? `  gen=${r.generated_at}` : ''}\n      ${r.note}`)
    out.push('')
  }

  const tally = ORDER.map(v => `${v} ${rows.filter(r => r.verdict === v).length}`).join(' · ')
  out.push(`${rows.length} traces · ${tally}`)
  out.push('  fresh = trace matches the file now · stamp-only = only the Quality line moved (expected: the stamp lands after the judge)')
  out.push('  body-moved = student-facing prose changed under the trace · unanchored = sha matches no committed version, regenerate not reuse')
  const bad = rows.filter(r => r.verdict === 'body-moved' || r.verdict === 'unanchored').length
  if (bad) out.push(`\n  ${bad} trace(s) must be REGENERATED before the next behavior/story re-fire reuses them.`)
  return out.join('\n')
}

function main(argv) {
  const arg = (flag, dflt) => { const i = argv.indexOf(flag); return i === -1 ? dflt : argv[i + 1] }
  const repo = path.resolve(arg('--repo', process.cwd()))
  const want = arg('--training', 'all')
  const cls = arg('--class', null)
  const verdicts = (arg('--verdict', null) || '').split(',').filter(Boolean)
  const bar = Number(arg('--bar', 8))

  let rows = collect(repo, want)
  if (cls) rows = rows.filter(r => r.cls === cls)
  if (verdicts.length) rows = rows.filter(r => verdicts.includes(r.verdict))

  const mood = argv.includes('--mood')
  if (argv.includes('--json')) process.stdout.write(JSON.stringify(rows, null, 1) + '\n')
  else process.stdout.write((mood ? renderMood(rows, want, bar) : render(rows, want)) + '\n')

  if (argv.includes('--gate') && mood && rows.some(r => r.mood && r.mood.beats.some(b => b.score < bar))) process.exit(1)

  if (argv.includes('--gate') && rows.some(r => r.verdict === 'body-moved' || r.verdict === 'unanchored')) process.exit(1)
}

module.exports = { collect, classify, slugIndex, resolveSlug, historyShas, moodBeats, moodExemptions, contentView }

if (require.main === module) main(process.argv.slice(2))
