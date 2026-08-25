#!/usr/bin/env node
// derive-class-brief.js — one assembled rulebook per (file, class), rules VERBATIM.
//
// A peer proposal for this artefact estimated "~5x less ingestion" from a
// digest carrying "rule number + current wording + carve-outs". Measured before
// building: across the five writing-class compendiums, rule text is 92.8% of
// the bytes. Headers, origin anecdotes and `→ compounded/...` pointer tails are
// the other 7.2%. A digest that keeps every rule's wording and carve-outs IS
// the compendium, and stripping all the scaffolding saves 7%, not 80%.
//
// So the only honest route to a smaller read is fewer RULES, never shorter
// ones. Compressing a rule's text is the T1-vs-T3 failure `_dispatch-preamble`
// exists to prevent: a verdict taken against a lead is taken against the half
// that states the prohibition, with the half that states the exception missing.
// Every rule this file emits is emitted whole.
//
// What it drops is rules the shape-gated prefill already RESOLVED — the N/A
// rows carried from a prior instance whose structural inventory is unchanged.
// Those rows are already answered and already in the instance; re-reading their
// text buys a second identical answer. Measured on a real technical fire: 48
// carried rules, 23.8% of the rule bytes.
//
// That is a real reduction and not a large one, which is the useful finding.
// Neither the read side nor the write side gets an order of magnitude alone.
//
// Fails closed: any compendium it cannot read, or a prefill that carried
// nothing, and it emits the full set and says so in the header. A judge reading
// a brief that silently lost a rule is worse than a judge reading five files.
//
// Usage:
//   node curriculum/evals/scripts/derive-class-brief.js <file.md> <class>
//   node curriculum/evals/scripts/derive-class-brief.js <file.md> <class> --stdout
'use strict'
const fs = require('node:fs')
const path = require('node:path')
const { COMPENDIA } = require('./derive-body-view.js')
const { prefill } = require('./prefill-instance.js')

const REPO = path.resolve(__dirname, '..', '..', '..')
const MEM = '/Users/anttitevanlinna/.claude/projects/-Users-anttitevanlinna-Projects-agents-102/memory'
const OUT_DIR = path.join(REPO, 'curriculum', 'evals', 'body-views')

// Split a compendium into (preamble, [rule chunks]). A rule chunk runs from its
// numbered lead to the line before the next rule or the next heading — the same
// chunking `compendium-drift.js` hashes, so a rule dropped here is exactly a
// rule that tool would have pinned.
function chunk(txt) {
  const lines = txt.split('\n')
  const pre = []
  const rules = []
  let cur = null
  for (const l of lines) {
    const m = l.match(/^(\d+[a-z]?)\.\s+(\*\*|\*)/)
    if (m) {
      if (cur) rules.push(cur)
      cur = { index: m[1], lines: [l], moved: m[2] === '*' && /moved to/i.test(l) }
      continue
    }
    if (/^#{1,6}\s/.test(l) || /^---\s*$/.test(l)) {
      if (cur) { rules.push(cur); cur = null }
      pre.push(l)
      continue
    }
    if (cur) cur.lines.push(l)
    else pre.push(l)
  }
  if (cur) rules.push(cur)
  return { pre, rules }
}

function build(fileArg, cls) {
  const comps = COMPENDIA[cls]
  if (!comps) throw new Error(`unknown class: ${cls}`)

  let resolved = new Set()
  let prefillNote = 'prefill carried nothing — every rule included'
  try {
    const { out } = prefill(fileArg, cls)
    if (out.reason === 'ok' && out.carried.length) {
      resolved = new Set(out.carried.map(r => `${r.compendium}|${r.rule_index}`))
      prefillNote = `${out.carried.length} rules already resolved N/A by shape hash ${out.shape_hash} — excluded below, their rows are already in the instance`
    } else if (out.reason !== 'ok') {
      prefillNote = `prefill fell through (${out.reason}) — every rule included`
    }
  } catch (e) {
    prefillNote = `prefill errored (${e.message}) — every rule included, fail-closed`
  }

  const parts = []
  let allBytes = 0, keptBytes = 0, dropped = 0, kept = 0
  const failures = []

  for (const c of comps) {
    const p = path.join(MEM, `${c}.md`)
    let txt
    try { txt = fs.readFileSync(p, 'utf8') } catch { failures.push(c); continue }
    allBytes += txt.length
    const { rules } = chunk(txt)
    const body = []
    for (const r of rules) {
      const text = r.lines.join('\n')
      if (r.moved) continue                                   // italic "Moved to" stub: no rule to judge
      if (resolved.has(`${c}.md|${r.index}`)) { dropped++; continue }
      kept++
      keptBytes += text.length
      body.push(text)
    }
    parts.push(`\n\n## ${c}.md — ${body.length} rules\n\n${body.join('\n\n')}`)
  }

  const header = [
    `# Class brief — ${cls} — ${path.relative(REPO, path.isAbsolute(fileArg) ? fileArg : path.join(REPO, fileArg))}`,
    '',
    'Every rule below is VERBATIM from its compendium: full lead, full body, every',
    'carve-out and boundary clause. Nothing is summarised. A rule you cite from here',
    'is a rule you have read in full.',
    '',
    `- compendiums assembled: ${comps.map(c => `${c}.md`).join(', ')}`,
    `- rules included: ${kept} · excluded as already-resolved: ${dropped}`,
    `- ${prefillNote}`,
    failures.length ? `- **UNREADABLE, read these yourself: ${failures.join(', ')}**` : '- all compendiums read',
    '',
    'Excluded rules are NOT unjudged — their N/A rows are already written into your',
    'instance by the prefill and count toward the completeness ledger. Do not re-add',
    'them and do not re-derive them.',
  ].join('\n')

  const out = header + parts.join('')
  return { text: out, kept, dropped, allBytes, keptBytes: out.length, failures }
}

module.exports = { build, chunk }

if (require.main === module) {
  const [file, cls, ...rest] = process.argv.slice(2)
  if (!file || !cls) {
    console.error('usage: derive-class-brief.js <file.md> <class> [--stdout]')
    process.exit(1)
  }
  let r
  try { r = build(file, cls) } catch (e) { console.error(`FAIL: ${e.message}`); process.exit(1) }
  if (rest.includes('--stdout')) { process.stdout.write(r.text); process.exit(0) }
  fs.mkdirSync(OUT_DIR, { recursive: true })
  const base = path.basename(file).replace(/\.md$/, '')
  const p = path.join(OUT_DIR, `${base}.${cls}.brief.md`)
  fs.writeFileSync(p, r.text)
  const pct = r.allBytes ? (100 * (r.allBytes - r.keptBytes) / r.allBytes).toFixed(1) : '0.0'
  console.log(`${path.relative(REPO, p)}  rules kept=${r.kept} dropped=${r.dropped}  ${r.allBytes}B -> ${r.keptBytes}B (${pct}% less)`)
  if (r.failures.length) { console.error(`UNREADABLE: ${r.failures.join(', ')}`); process.exitCode = 1 }
}
