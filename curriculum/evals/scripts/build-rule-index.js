#!/usr/bin/env node
// build-rule-index.js — generates the tiered rule index the WRITING path reads.
//
// Why: the compendiums serve two consumers. A judge adjudicating a shipped file
// needs the carve-outs, precedents and dosage limits — the full 398KB. A
// generator about to write a sentence needs the constraint once, and that is
// the bolded lead, which is 5% of the bytes. Loading T3 to write one paragraph
// was the whole tax. This emits the generator's view; it never rewrites a rule.
//
// Tiers:
//   T0 diamond  — _index/diamond.md, every surface, always-on at session start
//   T1 leads    — _index/<surface>.leads.md, one surface, on surface detection
//   T2 body     — sed one rule out of the compendium, on demand (⚠ makes it owed)
//   T3 full     — the compendium itself. Judges only. Untouched by this script.
//
// Tier membership lives in each compendium's own frontmatter, so the compendium
// stays the single source of truth and no rule text moves:
//   metadata:
//     tiers:
//       diamond: [1, 2, 14]
//
// Usage:
//   node build-rule-index.js            rebuild _index/
//   node build-rule-index.js --check    exit 1 if any index is stale (fail closed)
//   node build-rule-index.js --mem <p>  override compendium directory
'use strict'
const fs = require('node:fs')
const path = require('node:path')
const crypto = require('node:crypto')
const { parseRuleChunks, MEM: DEFAULT_MEM } = require('./compendium-drift.js')

const sha = s => crypto.createHash('sha256').update(s).digest('hex').slice(0, 12)

// A lead is safe to act on alone unless its body carries an escape hatch. These
// markers are what an escape hatch looks like in this corpus; a rule carrying
// one gets ⚠ and MUST be read at T2 before shipping that surface. Mechanical on
// purpose — a judgment call here would rot.
const CARVE = /EXCEPTION|carve-?out|hard-grep|N\/A when|exempt|unless|does NOT apply/i

const surfaceOf = f => f.replace(/^check_/, '').replace(/\.md$/, '')

// metadata.tiers.diamond, written inline: `diamond: [1, 2, 14]`
function parseDiamond(md) {
  const m = /^ *diamond: *\[([^\]]*)\]/m.exec(String(md))
  if (!m) return []
  return m[1].split(',').map(s => s.trim().replace(/^['"]|['"]$/g, '')).filter(Boolean)
}

function readAll(mem) {
  return fs.readdirSync(mem).filter(f => /^check_.*\.md$/.test(f)).sort().map(f => {
    const md = fs.readFileSync(path.join(mem, f), 'utf8')
    const rules = parseRuleChunks(md).map(r => {
      const body = ruleBody(md, r.id)
      return { ...r, carve: CARVE.test(body) }
    })
    return { file: f, surface: surfaceOf(f), md, rules, diamond: parseDiamond(md), src: sha(md) }
  })
}

// The literal chunk for one rule id — same boundaries the pin hasher uses.
// `52` returns §52 with its sub-rules folded in — callers rely on that, and a
// parent read without its carve-outs is the failure the whole tier exists to
// prevent. `52c` returns just that sub-rule. Fetching a sub-rule by its own
// number used to return nothing at all: the letter was parsed and then dropped
// by a `!s.sub` filter, so rule.js answered "no §52c" on a rule sitting in the
// file, and an agent told a rule does not exist does not go looking.
function ruleBody(md, id) {
  const lines = String(md).split('\n')
  const starts = []
  lines.forEach((t, i) => { const m = /^(\d+)([a-z]?)\.\s+\*\*/.exec(t); if (m) starts.push({ id: m[1], sub: m[2], line: i }) })
  const want = /^(\d+)([a-z]?)$/.exec(String(id))
  if (!want) return ''
  const [, num, sub] = want
  let k = starts.findIndex(s => s.id === num && s.sub === sub)
  // Second authoring shape: an indented bold run inside the parent's body
  // (`   **11a. ...**`). Five sub-rules use it, and one of them is the
  // source-freshness stamp rule that .claude/rules/content-rules.md cites by
  // number — so a fetch that only knows line-start numbering answers "no such
  // rule" on a rule the rules file tells you to read.
  if (k < 0 && sub) {
    // Covers both in-body shapes: an indented bold run (`   **11a. ...**`) and
    // a list-item bold run (`   - **40b. ...**`).
    const re = new RegExp(`^\\s+(?:-\\s+)?\\*\\*${num}${sub}\\.`)
    const at = lines.findIndex(t => re.test(t))
    if (at < 0) return ''
    const nextRule = /^(?:\d+[a-z]?\.\s+\*\*|\s+(?:-\s+)?\*\*\d+[a-z]\.)/
    let stop = lines.length
    for (let j = at + 1; j < lines.length; j++) if (nextRule.test(lines[j])) { stop = j; break }
    return lines.slice(at, stop).join('\n')
  }
  if (k < 0) return ''
  let end = lines.length
  // A sub-rule ends at the very next rule start of any kind; a parent runs on
  // until the next parent, swallowing its own children.
  for (let j = k + 1; j < starts.length; j++) {
    if (sub || !starts[j].sub) { end = starts[j].line; break }
  }
  return lines.slice(starts[k].line, end).join('\n')
}

// Numbering hygiene: judges cite §N, so duplicate or absent N is a citation that
// resolves to nothing. Reported, never auto-fixed — renumbering is Antti's call.
function lint(c) {
  const ids = c.rules.map(r => Number(r.id)).filter(Number.isFinite)
  const dupes = ids.filter((n, i) => ids.indexOf(n) !== i)
  const max = Math.max(0, ...ids)
  const gaps = []
  for (let n = 1; n <= max; n++) if (!ids.includes(n)) gaps.push(n)
  const ghosts = c.diamond.filter(d => !c.rules.some(r => r.id === String(d)))
  return { dupes: [...new Set(dupes)], gaps, ghosts }
}

const leadLine = (r, isDia) =>
  `${isDia ? '◆' : ' '}${r.carve ? '⚠' : ' '} §${r.id} ${r.lead}`

function renderLeads(c) {
  const l = lint(c)
  const out = [
    `# ${c.surface} — rule index (T1)`,
    ``,
    `${c.rules.length} rules. Leads only — this is the generator's view. \`◆\` = diamond (already in context from session start). \`⚠\` = body carries an exception, carve-out or hard-grep list: **read the rule body (T2) before shipping this surface.**`,
    ``,
    `T2: \`node curriculum/evals/scripts/rule.js ${c.surface} <N>\` — or \`awk\` the chunk out of \`memory/${c.file}\`.`,
    `T3 (full file) is for eval judges and rule authoring, not for writing prose.`,
    ``,
    `<!-- generated from ${c.file}@${c.src} — do not edit; run build-rule-index.js -->`,
    ``,
    ...c.rules.map(r => leadLine(r, c.diamond.includes(r.id))),
  ]
  if (l.dupes.length || l.gaps.length || l.ghosts.length) {
    out.push(``, `<!-- numbering lint: dupes=[${l.dupes}] gaps=[${l.gaps}] diamond-ghosts=[${l.ghosts}] -->`)
  }
  return out.join('\n') + '\n'
}

function renderDiamond(all) {
  const rows = []
  let n = 0
  for (const c of all) {
    const dia = c.rules.filter(r => c.diamond.includes(r.id))
    if (!dia.length) continue
    rows.push(``, `**${c.surface}** — full index: \`_index/${c.surface}.leads.md\` (${c.rules.length} rules)`)
    for (const r of dia) { rows.push(leadLine(r, false).replace(/^ /, '')); n++ }
  }
  return [
    `# Diamond rules (T0) — always on`,
    ``,
    `The ${n} rules that shape what gets written, across every surface. This is not the rulebook; it is the part that changes a sentence before it is typed.`,
    ``,
    `**How the tiers work.** Writing on a surface → read that surface's \`_index/<surface>.leads.md\` (T1, every lead, ~1KB). A lead marked \`⚠\` carries an exception or a hard-grep list → read that rule's body (T2) before you ship. Full compendiums (T3) are for eval judges and for editing rules — not for writing prose.`,
    ``,
    `**Adding or changing a rule** still happens in \`memory/check_*.md\`; tier membership is one frontmatter line. After any rule edit: \`node curriculum/evals/scripts/build-rule-index.js\` **then** \`node curriculum/evals/scripts/compendium-drift.js --repin\`. Skip the rebuild and this index goes stale and the hooks fail closed to T3; skip the repin and every pinned verdict was taken against the old wording.`,
    ...rows,
    ``,
  ].join('\n') + '\n'
}

function main(argv) {
  const memArg = argv.indexOf('--mem')
  const mem = memArg > -1 ? argv[memArg + 1] : DEFAULT_MEM
  const check = argv.includes('--check')
  const dir = path.join(mem, '_index')
  const all = readAll(mem)
  const manifest = { generated: new Date().toISOString().slice(0, 10), sources: {} }
  for (const c of all) manifest.sources[c.file] = { src: c.src, rules: c.rules.length, diamond: c.diamond.length, lint: lint(c) }

  if (check) {
    let prev = null
    try { prev = JSON.parse(fs.readFileSync(path.join(dir, '_manifest.json'), 'utf8')) } catch { }
    const stale = !prev ? all.map(c => c.file)
      : all.filter(c => !prev.sources[c.file] || prev.sources[c.file].src !== c.src).map(c => c.file)
    const orphan = prev ? Object.keys(prev.sources).filter(f => !all.some(c => c.file === f)) : []
    if (stale.length || orphan.length) {
      console.error(`STALE: ${[...stale, ...orphan.map(o => o + ' (removed)')].join(', ')}`)
      return 1
    }
    console.log(`fresh: ${all.length} compendiums, ${all.reduce((n, c) => n + c.rules.length, 0)} rules`)
    return 0
  }

  fs.mkdirSync(dir, { recursive: true })
  for (const c of all) fs.writeFileSync(path.join(dir, `${c.surface}.leads.md`), renderLeads(c))
  fs.writeFileSync(path.join(dir, 'diamond.md'), renderDiamond(all))
  fs.writeFileSync(path.join(dir, '_manifest.json'), JSON.stringify(manifest, null, 1) + '\n')

  const dia = all.reduce((n, c) => n + c.diamond.length, 0)
  const tot = all.reduce((n, c) => n + c.rules.length, 0)
  const bytes = f => fs.statSync(path.join(dir, f)).size
  console.log(`wrote _index/: ${all.length} surfaces, ${tot} rules, ${dia} diamond`)
  console.log(`  diamond.md ${bytes('diamond.md')}B (~${Math.round(bytes('diamond.md') / 4)} tok)`)
  const leadBytes = all.reduce((n, c) => n + bytes(`${c.surface}.leads.md`), 0)
  console.log(`  leads      ${leadBytes}B total (~${Math.round(leadBytes / 4)} tok)`)
  for (const c of all) {
    const l = manifest.sources[c.file].lint
    if (l.dupes.length || l.ghosts.length) console.log(`  ! ${c.file}: dupes=[${l.dupes}] diamond-ghosts=[${l.ghosts}]`)
  }
  return 0
}

module.exports = { parseDiamond, lint, renderLeads, renderDiamond, readAll, ruleBody, CARVE }
if (require.main === module) process.exit(main(process.argv.slice(2)))
