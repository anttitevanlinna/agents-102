#!/usr/bin/env node
// derive-body-view.js — compute a file's judge geometry ONCE, not once per class.
//
// Every class judge used to re-derive the same four facts about the same file
// from scratch: where the `<!-- maintainer -->` cut is, which lines sit inside
// ``` fences, which lines are therefore body, and whether its own greps work.
// Six judges on one file did that six times, each writing its own scratch
// projection — and on 2026-08-25 those projections collided: `body_only.md`,
// `body_region.txt` and `body_lines.txt` carried no slug, so concurrent judges
// on different files overwrote each other's view of "the body".
//
// The geometry is a property of the file, not of the class reading it. So:
// derive it once, key it by the source sha, name it by slug, and hand every
// judge the same answer. A judge that greps `<slug>.body.txt` is grep-in-region
// by construction — the "verify the cited line is inside the body region" dance
// in every template becomes structurally unnecessary rather than diligently
// repeated.
//
// The greps ship with their own planted-string proof. `_dispatch-preamble.md`
// tells each judge to "validate your own greps against a planted test string
// before trusting a zero"; a zero from a pattern nobody proved is exactly the
// silent PASS that rule exists to stop. Doing it here means it is done, once,
// verifiably, instead of asked for N times and skipped M of them.
//
// Usage:
//   node curriculum/evals/scripts/derive-body-view.js <file.md>...
//   node curriculum/evals/scripts/derive-body-view.js --all-from <items.json>
//   node curriculum/evals/scripts/derive-body-view.js <file.md> --json   # stdout
//
// Writes `curriculum/evals/body-views/<slug>.view.json` + `<slug>.body.txt`
// + `<slug>.expanded.md`. Cache is keyed on the source sha: an unchanged file
// is a no-op, a changed one is regenerated. Never trust a view whose
// `source_sha` does not match the file you are judging — that is the stale-cache
// failure, and it fails closed here by regenerating rather than by warning.
'use strict'
const { execFileSync } = require('node:child_process')
const crypto = require('node:crypto')
const fs = require('node:fs')
const path = require('node:path')

const REPO = path.resolve(__dirname, '..', '..', '..')
const OUT_DIR = path.join(REPO, 'curriculum', 'evals', 'body-views')
const MEM = '/Users/anttitevanlinna/.claude/projects/-Users-anttitevanlinna-Projects-agents-102/memory'

const sha256 = t => crypto.createHash('sha256').update(t, 'utf8').digest('hex')

// ---------------------------------------------------------------------------
// Slug — mirrors the instance-name convention so a view and its instances sort
// together and never collide across a module/exercise sharing a basename.
// ---------------------------------------------------------------------------
function slugFor(rel) {
  const base = path.basename(rel).replace(/\.md$/, '')
  const dir = path.dirname(rel)
  let surface = 'file'
  if (/\/supplementary$/.test(dir)) surface = 'supplementary'
  else if (/\/reference$/.test(dir)) surface = 'reference'
  else if (/curriculum\/exercises$/.test(dir)) surface = 'exercise'
  else if (/curriculum\/lectures$/.test(dir)) surface = 'lecture'
  else if (/curriculum\/trainings\//.test(dir)) surface = 'module'
  const m = dir.match(/curriculum\/trainings\/([^/]+)/)
  if (m) return `${m[1] === 'agentic-engineering-101' ? 'ae101' : m[1]}--${surface}--${base}`

  // Shared `curriculum/exercises/` and `curriculum/lectures/` carry no training
  // in their path — the instance convention resolves it from the per-training
  // module lists. Deriving `shared--` here instead would produce a slug that
  // matches no instance on disk, and a prefill that silently finds no prior is
  // indistinguishable from one that correctly found nothing to carry. So ask
  // the instances themselves which training claimed this file.
  const owner = trainingFromInstances(surface, base)
  return `${owner || 'shared'}--${surface}--${base}`
}

let INSTANCE_INDEX = null
function trainingFromInstances(surface, base) {
  if (INSTANCE_INDEX === null) {
    INSTANCE_INDEX = new Map()
    try {
      for (const f of fs.readdirSync(path.join(REPO, 'curriculum', 'evals', 'instances'))) {
        const m = f.match(/^([^-]+(?:-[^-]+)*?)--([a-z-]+)--(.+?)\.[a-z_]+\.json$/)
        if (m) INSTANCE_INDEX.set(`${m[2]}|${m[3]}`, m[1])
      }
    } catch { /* no instances yet — 'shared' is then the honest answer */ }
  }
  return INSTANCE_INDEX.get(`${surface}|${base}`) || null
}

// ---------------------------------------------------------------------------
// Geometry. All line numbers are 1-indexed against the RAW source, because that
// is what a citation in an instance means. The expanded view is for reading.
// ---------------------------------------------------------------------------
function geometry(raw) {
  const lines = raw.split('\n')
  let maintainerCut = null
  let backing = null
  const fences = []
  let open = null
  lines.forEach((ln, i) => {
    const n = i + 1
    // A fence toggles; an unclosed fence at EOF still yields a range, because
    // "the rest of the file is code" is the honest reading and treating it as
    // prose invites a whole tail of false positives.
    if (/^\s*```/.test(ln)) {
      if (open === null) open = n
      else { fences.push([open, n]); open = null }
      return
    }
    if (open !== null) return
    if (maintainerCut === null && /^<!--\s*maintainer\s*-->/.test(ln)) maintainerCut = n
    if (/^<!--\s*backing\s*-->/.test(ln)) backing = backing || n
  })
  if (open !== null) fences.push([open, lines.length])

  const inFence = n => fences.some(([a, b]) => n >= a && n <= b)
  const cut = maintainerCut === null ? lines.length + 1 : maintainerCut
  const bodyLines = []
  for (let n = 1; n < cut; n++) if (!inFence(n)) bodyLines.push(n)

  // Collapse the kept line numbers into ranges for a human-readable summary.
  const regions = []
  for (const n of bodyLines) {
    const last = regions[regions.length - 1]
    if (last && last[1] === n - 1) last[1] = n
    else regions.push([n, n])
  }
  return { lines, maintainerCut, backing, fences, bodyLines, regions }
}

// Dated accept-notes in the maintainer block — a finding against one of these is
// a false positive that costs real maintainer attention, so they are surfaced
// rather than left to be discovered.
function acceptNotes(g) {
  if (g.maintainerCut === null) return []
  const out = []
  for (let n = g.maintainerCut; n <= g.lines.length; n++) {
    const t = g.lines[n - 1]
    if (/20\d\d-\d\d-\d\d/.test(t) && t.trim()) out.push(`L${n}: ${t.trim().slice(0, 200)}`)
  }
  return out
}

// ---------------------------------------------------------------------------
// Mechanical greps, each with a planted-string proof. `hits` is a real count on
// the body projection; `proof` is that same pattern matching text engineered to
// violate it. A rule whose proof is false is reported UNPROVEN and must not be
// read as a PASS — a pattern that matches nothing matches a clean file too.
// ---------------------------------------------------------------------------
const PATTERNS = [
  ['em_dash', /—/g, 'a — b'],
  ['banned_words', /\b(delve|delving|honest|honestly|importantly|crucial|crucially|substrate|synergize|paradigm shift)\b/gi, 'crucially, we delve'],
  ['ritual_ceremony', /\b(ritual|rituals|ceremony|ceremonies)\b/gi, 'a standup ritual'],
  ['leverage_verb', /\bleverag(e|es|ing)\b/gi, 'leverage the agent'],
  ['the_student', /\bthe student\b/gi, 'the student writes'],
  ['author_we', /^\s*(We|we)\b(?!.*\b(you|your)\b)/gm, 'We believe this'],
  ['session_biography', /\b(caught live|now fixed|previously|used to say|MOVED)\b/g, 'previously this said'],
  ['dated_line', /\b20\d\d-\d\d-\d\d\b/g, 'on 2026-01-01'],
  ['url', /https?:\/\/\S+/g, 'see https://x.test'],
]

function greps(bodyText) {
  const out = {}
  for (const [name, re, plant] of PATTERNS) {
    const count = (bodyText.match(new RegExp(re.source, re.flags)) || []).length
    const proof = new RegExp(re.source, re.flags).test(plant)
    out[name] = {
      pattern: re.source,
      body_hits: count,
      planted_proof: proof,
      status: proof ? (count === 0 ? 'CLEAN' : 'HITS') : 'UNPROVEN',
    }
  }
  return out
}

// ---------------------------------------------------------------------------
// Applicability signals — the cheap facts that decide whether a whole family of
// rules can possibly fire. A citations rule cannot fire on a body with no URLs
// and no source stamps; saying so costs a boolean here and a paragraph of judge
// prose otherwise.
// ---------------------------------------------------------------------------
function signals(raw, g, bodyText) {
  const body = bodyText
  return {
    has_prompt_blocks: /\*\*Prompt\*\*/.test(raw) || /\{\{prompt:/.test(raw),
    has_figures: /\{\{figure:/.test(raw),
    has_backing_block: g.backing !== null,
    has_maintainer_block: g.maintainerCut !== null,
    has_urls: /https?:\/\//.test(body),
    has_source_stamps: /\[checked:/.test(raw),
    has_code_fences: g.fences.length > 0,
    slide_count: (raw.match(/^## /gm) || []).length,
    body_line_count: g.bodyLines.length,
    group_beat_markers: /\b(group|team|room|together|shared record|adjudicat)\w*/i.test(body),
  }
}

// ---------------------------------------------------------------------------
// Rule inventory — the completeness contract makes every judge count a
// compendium's numbered rules by hand before it may return. That count is a
// property of the compendium, identical for every judge that reads it.
// ---------------------------------------------------------------------------
function ruleInventory(compendiumNames) {
  const out = {}
  for (const name of compendiumNames) {
    const p = path.join(MEM, `${name}.md`)
    let txt
    try { txt = fs.readFileSync(p, 'utf8') } catch { out[`${name}.md`] = { error: 'unreadable' }; continue }
    const indices = []
    const moved = []
    for (const line of txt.split('\n')) {
      const m = line.match(/^(\d+[a-z]?)\.\s+(\*\*|\*)/)
      if (!m) continue
      // A single-asterisk lead is an italic "Moved to <compendium>" stub — the
      // one legitimate absence from a coverage ledger.
      if (m[2] === '*' && /moved to/i.test(line)) moved.push(m[1])
      else indices.push(m[1])
    }
    out[`${name}.md`] = { owed: indices.length, indices, moved_stubs: moved }
  }
  return out
}

const COMPENDIA = {
  writing: ['check_writing', 'check_student_facing', 'check_prompts', 'check_sales_copy', 'check_strategy_tie_in'],
  story: ['check_lectures', 'check_pedagogy', 'check_prompts', 'check_strategy_tie_in', 'check_workshop'],
  technical: ['check_platform_and_boundaries', 'check_research_claims', 'check_pedagogy', 'check_prompts'],
  pedagogy: ['check_pedagogy', 'check_workshop'],
  strategy: ['check_strategy_tie_in'],
  slides: ['check_slides'],
  behavior: ['check_prompts', 'check_pedagogy'],
  cross_module: ['check_cross_module'],
}

function expand(abs) {
  try {
    return execFileSync('node', [path.join(REPO, 'scripts', 'expand-md.js'), abs],
      { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 })
  } catch { return null }
}

// ---------------------------------------------------------------------------
function derive(fileArg, { write = true } = {}) {
  const abs = path.isAbsolute(fileArg) ? fileArg : path.join(REPO, fileArg)
  const rel = path.relative(REPO, abs)
  // A judge that mistypes a path gets a 12-frame ENOENT stack and has to decide
  // whether the tool is broken or its argument was. Say which.
  let raw
  try { raw = fs.readFileSync(abs, 'utf8') }
  catch (e) { throw new Error(`cannot read ${rel} (${e.code || e.message}) — check the path; nothing was derived`) }
  const sourceSha = sha256(raw)
  const slug = slugFor(rel)

  const viewPath = path.join(OUT_DIR, `${slug}.view.json`)
  if (write && fs.existsSync(viewPath)) {
    try {
      const prior = JSON.parse(fs.readFileSync(viewPath, 'utf8'))
      if (prior.source_sha === sourceSha) return { ...prior, cached: true }
    } catch { /* regenerate on any unreadable cache — fail closed, never warn-and-use */ }
  }

  const g = geometry(raw)
  // The body projection: numbered, fence-free, maintainer-free. A grep against
  // THIS file cannot land out of region, which is the whole point.
  const bodyNumbered = g.bodyLines.map(n => `${String(n).padStart(4)}\t${g.lines[n - 1]}`).join('\n')
  const bodyText = g.bodyLines.map(n => g.lines[n - 1]).join('\n')

  const view = {
    file: rel,
    slug,
    source_sha: sourceSha,
    maintainer_cut: g.maintainerCut,
    backing_block_at: g.backing,
    fence_ranges: g.fences,
    body_regions: g.regions,
    accept_notes: acceptNotes(g),
    signals: signals(raw, g, bodyText),
    greps: greps(bodyText),
    rule_inventory: ruleInventory([...new Set(Object.values(COMPENDIA).flat())]),
    projections: {
      body_numbered: path.relative(REPO, path.join(OUT_DIR, `${slug}.body.txt`)),
      expanded: path.relative(REPO, path.join(OUT_DIR, `${slug}.expanded.md`)),
    },
  }

  if (write) {
    fs.mkdirSync(OUT_DIR, { recursive: true })
    fs.writeFileSync(path.join(OUT_DIR, `${slug}.body.txt`), bodyNumbered + '\n')
    const ex = expand(abs)
    if (ex !== null) fs.writeFileSync(path.join(OUT_DIR, `${slug}.expanded.md`), ex)
    else view.projections.expanded = null
    fs.writeFileSync(viewPath, JSON.stringify(view, null, 1) + '\n')
  }
  return { ...view, cached: false, body_numbered_text: bodyNumbered }
}

module.exports = { derive, geometry, greps, slugFor, ruleInventory, signals, COMPENDIA }

if (require.main === module) {
  const argv = process.argv.slice(2)
  const asJson = argv.includes('--json')
  let files = argv.filter(a => !a.startsWith('--'))
  const fromIdx = argv.indexOf('--all-from')
  if (fromIdx !== -1) {
    const items = JSON.parse(fs.readFileSync(argv[fromIdx + 1], 'utf8'))
    files = (Array.isArray(items) ? items : items.items || []).map(i => i.file)
    files = files.filter(Boolean)
  }
  if (!files.length) {
    console.error('usage: derive-body-view.js <file.md>... | --all-from <items.json> [--json]')
    process.exit(1)
  }
  const results = []
  for (const f of files) {
    try { results.push(derive(f, { write: !asJson })) }
    catch (e) { console.error(`FAIL ${f}: ${e.message}`); process.exitCode = 1 }
  }
  if (asJson) { console.log(JSON.stringify(results, null, 1)); process.exit(process.exitCode || 0) }
  const unproven = results.flatMap(r => Object.entries(r.greps || {}).filter(([, v]) => v.status === 'UNPROVEN').map(([k]) => `${r.slug}:${k}`))
  for (const r of results) console.log(`${r.cached ? 'cached ' : 'derived'} ${r.slug}  body=${r.signals.body_line_count}L  fences=${r.fence_ranges.length}  cut=${r.maintainer_cut ?? 'none'}  notes=${r.accept_notes.length}`)
  if (unproven.length) { console.error(`UNPROVEN greps: ${unproven.join(', ')}`); process.exitCode = 1 }
}
