#!/usr/bin/env node
// check-advisory-verdicts — a rule that calls itself advisory cannot be filed REVISE.
//
// Some compendium rules say, in their own body, that they are not gates:
// `check_writing.md` §27 has carried *"Not a REVISE on its own ... this rule is
// the default move, not the law"* since it was written, and judges filed 34
// REVISE rows against it across 13 files anyway — half the open card queue,
// built out of a rule nobody read to the end. Sincerity is not a forcing
// function. This is.
//
// The rule's own words set its ceiling. If the body says advisory, the highest
// a judge may go is `verdict: PASS` plus a row in `suggestions[]`.
//
// Usage:
//   check-advisory-verdicts.js [--instances <dir>] [--memory <dir>] [--json]
// Exits 1 on any violation.
'use strict'
const fs = require('node:fs')
const path = require('node:path')

// Matched against the rule BODY, lowercased. Deliberately short and literal:
// a fuzzy match here would silently exempt rules nobody meant to exempt, and
// the failure would look like a clean gate. Extend by adding the exact phrase
// a rule actually uses, never a paraphrase of it.
const ADVISORY_MARKERS = [
  'not a revise on its own',
  'style, not a gate',
  'the default move, not the law',
  'advisory, not a gate',
]

const DEFAULT_MEMORY = path.join(
  process.env.HOME, '.claude', 'projects',
  '-Users-anttitevanlinna-Projects-agents-102', 'memory')

// A rule chunk starts at a line like `27. **Say it once...` and runs to the
// next such line. Sub-lettered clauses (`52c.`) belong to their parent number,
// which is how compendium-drift.js chunks them too — keep the two agreeing or
// a pin and a gate will disagree about what a rule is.
function parseRules(text) {
  const out = new Map()
  const lines = text.split('\n')
  let id = null, buf = []
  const flush = () => { if (id !== null) out.set(id, (out.get(id) || '') + buf.join('\n')) }
  for (const line of lines) {
    const m = /^(\d+)[a-z]?\.\s+\*\*/.exec(line)
    if (m) { flush(); id = m[1]; buf = [line] } else if (id !== null) buf.push(line)
  }
  flush()
  return out
}

function advisoryRules(memoryDir, readFile = f => fs.readFileSync(f, 'utf8'),
  listDir = d => fs.readdirSync(d)) {
  const advisory = new Map() // "check_writing.md:27" -> matched marker
  for (const f of listDir(memoryDir)) {
    if (!/^check_.*\.md$/.test(f)) continue
    let text
    try { text = readFile(path.join(memoryDir, f)) } catch { continue }
    for (const [id, body] of parseRules(text)) {
      const low = body.toLowerCase()
      const hit = ADVISORY_MARKERS.find(m => low.includes(m))
      if (hit) advisory.set(`${f}:${id}`, hit)
    }
  }
  return advisory
}

const asArr = v => Array.isArray(v) ? v : (v && typeof v === 'object' ? Object.values(v) : [])

// A row cites its rule as (compendium, rule_index). `rule_index` carries sub
// letters (`52c`); the advisory marker is held against the parent number,
// because that is the chunk the maintainer edits and the pin tracks.
function violationsIn(inst, advisory, label) {
  const out = []
  for (const r of asArr(inst.rules_evaluated)) {
    if (!r || r.verdict !== 'REVISE') continue
    if (r.resolution) continue // already adjudicated; not a live claim
    const comp = r.compendium
    const num = String(r.rule_index == null ? '' : r.rule_index).match(/^\d+/)
    if (!comp || !num) continue
    const key = `${comp}:${num[0]}`
    const marker = advisory.get(key)
    if (marker) out.push({ instance: label, rule: key, marker, evidence: String(r.evidence || '').slice(0, 120) })
  }
  return out
}

function main(argv) {
  const arg = k => { const i = argv.indexOf(k); return i === -1 ? null : argv[i + 1] }
  const memoryDir = arg('--memory') || DEFAULT_MEMORY
  const instDir = arg('--instances') || path.join(__dirname, '..', 'instances')
  const advisory = advisoryRules(memoryDir)
  const violations = []
  for (const f of fs.readdirSync(instDir)) {
    if (!f.endsWith('.json')) continue
    let inst
    try { inst = JSON.parse(fs.readFileSync(path.join(instDir, f), 'utf8')) } catch { continue }
    violations.push(...violationsIn(inst, advisory, f))
  }
  if (argv.includes('--json')) {
    process.stdout.write(JSON.stringify({ advisory: [...advisory.keys()], violations }, null, 1) + '\n')
  } else {
    process.stderr.write(`advisory rules found: ${[...advisory.keys()].join(', ') || '(none)'}\n`)
    for (const v of violations) {
      process.stderr.write(`  ${v.instance}  ${v.rule}  REVISE on a rule whose body says "${v.marker}"\n`)
    }
    process.stderr.write(violations.length
      ? `\n${violations.length} REVISE row(s) on advisory rules. Verdict ceiling is PASS + suggestions[].\n`
      : '\nno REVISE rows on advisory rules\n')
  }
  return violations.length ? 1 : 0
}

module.exports = { parseRules, advisoryRules, violationsIn, ADVISORY_MARKERS }

if (require.main === module) process.exit(main(process.argv.slice(2)))
