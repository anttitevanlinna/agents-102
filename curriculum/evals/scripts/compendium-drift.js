#!/usr/bin/env node
// compendium-drift — the staleness axis git cannot see.
//
// Pins are commit shas, so scan-stale-classes only ever asks "did the FILE move
// since the judge ran?". The other half of a verdict is the RULE it was taken
// against, and the compendiums live outside the repo
// (~/.claude/projects/<repo>/memory/check_*.md) — untracked, so a rule can be
// rewritten and every file keeps a green pin taken against text that no longer
// exists. This tool gives that axis a ledger.
//
// Per rule: sha256 of its chunk (lead through the line before the next rule, so
// a sub-rule edit moves its parent's hash). Ledger records the hash plus
// `changed_at` — the date the rule was last OBSERVED to move. Baseline is
// changed_at:null, meaning "never seen to change", so pinning the ledger for the
// first time stales nothing. From then on a rule edit dates itself, and any
// class pinned at a commit OLDER than that date owes a re-judge.
//
// Class routing comes from each compendium's own frontmatter `eval_classes`, not
// a second map in code — the compendium already declares which judges read it.
//
//   --check          report drift vs the ledger (exit 1 if any). Default.
//   --repin [--date] record current hashes; date-stamp what moved.
//     --procedural <compendium>:<rule>[,...]  these moved, but only in how a
//       finding is fixed, not in what is filed: new hash, prior date kept.
//   --json           machine-readable report on stdout
//   --ledger <p>     override ledger path
//   --mem <p>        override compendium directory
'use strict'
const fs = require('node:fs')
const path = require('node:path')
const crypto = require('node:crypto')

const REPO = path.resolve(__dirname, '../../..')
const MEM = '/Users/anttitevanlinna/.claude/projects/-Users-anttitevanlinna-Projects-agents-102/memory'
const LEDGER = path.join(REPO, 'curriculum/evals/compendium-pins.json')
const CLASS_ALIASES = { storytelling: 'story' }

const hash = s => crypto.createHash('sha256').update(s).digest('hex').slice(0, 12)

// Rule starts are the same shape parseRules in audit-eval-coverage.js reads:
// `N. **Lead.**` at line start, optionally sub-lettered. A sub-lettered start
// does NOT open a new chunk — 9b is part of 9, and editing it must move 9's
// hash, because a judge citing 9 was reading 9b too.
function parseRuleChunks(md) {
  const lines = String(md).split('\n')
  const starts = []
  lines.forEach((t, i) => {
    const m = /^(\d+)([a-z]?)\.\s+\*\*(.+?)\*\*/.exec(t)
    if (m) starts.push({ id: m[1], sub: m[2], lead: m[3].replace(/\s+/g, ' ').trim(), line: i })
  })
  const out = []
  for (let k = 0; k < starts.length; k++) {
    const s = starts[k]
    if (s.sub) continue                       // folds into the parent chunk below
    let end = lines.length
    for (let j = k + 1; j < starts.length; j++) if (!starts[j].sub) { end = starts[j].line; break }
    if (out.some(r => r.id === s.id)) continue // duplicate numbering: first wins, as parseRules does
    const body = lines.slice(s.line, end).join('\n').replace(/\s+/g, ' ').trim()
    out.push({ id: s.id, lead: s.lead, h: hash(body) })
  }
  return out
}

// Frontmatter `eval_classes:` list. `storytelling` is the compendium's word for
// the judge the scanner pins as `story`.
function parseEvalClasses(md) {
  const m = /^ *eval_classes: *\n((?: *- .*\n)+)/m.exec(String(md))
  if (!m) return []
  return m[1].split('\n').map(l => /^ *- *(\S+)/.exec(l)).filter(Boolean)
    .map(x => CLASS_ALIASES[x[1]] || x[1])
}

function readCompendia(mem) {
  const out = {}
  for (const f of fs.readdirSync(mem).filter(f => /^check_.*\.md$/.test(f)).sort()) {
    const md = fs.readFileSync(path.join(mem, f), 'utf8')
    out[f.replace(/\.md$/, '')] = { classes: parseEvalClasses(md), rules: parseRuleChunks(md) }
  }
  return out
}

const emptyLedger = () => ({ compendia: {} })

// added = rule the ledger has never seen; changed = hash moved; removed = rule
// the ledger carries and the compendium no longer does. All three are re-judge
// events: a removed rule leaves verdicts describing a rule nobody can read.
function diffLedger(ledger, current) {
  const report = {}
  for (const [name, cur] of Object.entries(current)) {
    const prev = (ledger.compendia || {})[name]
    if (!prev) { report[name] = { unpinned: true, added: cur.rules.map(r => r.id), changed: [], removed: [] }; continue }
    const added = [], changed = []
    for (const r of cur.rules) {
      const p = prev.rules[r.id]
      if (!p) added.push(r.id)
      else if (p.h !== r.h) changed.push(r.id)
    }
    const have = new Set(cur.rules.map(r => r.id))
    const removed = Object.keys(prev.rules).filter(id => !have.has(id))
    if (added.length || changed.length || removed.length) report[name] = { added, changed, removed }
  }
  for (const name of Object.keys(ledger.compendia || {})) {
    if (!(name in current)) report[name] = { added: [], changed: [], removed: Object.keys(ledger.compendia[name].rules), gone: true }
  }
  return report
}

// Date-stamp what moved; carry forward changed_at for what did not.
//
// Only a CHANGED rule dates itself. An ADDED rule is not staleness's business:
// nothing was judged against it, which is a coverage hole, and
// audit-eval-coverage.js reports those at rule×file resolution. Billing a whole
// class corpus-wide for one new rule is the over-broad v2 behaviour this
// scanner exists to replace — route at the resolution the finer instrument
// already has. Baselines (a compendium's first pin) stale nothing either.
//
// `procedural` names rules (`<compendium>:<rule>`) whose current edit changes
// how a maintainer FIXES a finding, not what a judge FILES. Such a rule takes
// its new hash and keeps its prior date: dating it would re-owe every class
// pinned before today, corpus-wide, for a re-read that files nothing new. The
// call is the operator's and is made at repin time, when the edit is in hand.
function repin(ledger, current, date, { procedural = new Set() } = {}) {
  const next = { compendia: {} }
  for (const [name, cur] of Object.entries(current)) {
    const prev = (ledger.compendia || {})[name]
    const rules = {}
    for (const r of cur.rules) {
      const p = prev && prev.rules[r.id]
      const moved = !!(p && p.h !== r.h) && !procedural.has(`${name}:${r.id}`)
      rules[r.id] = { h: r.h, changed_at: moved ? date : (p ? p.changed_at : null) }
    }
    next.compendia[name] = { classes: cur.classes, rules }
  }
  return next
}

// Which judge classes owe a re-run for a pin taken on `pinDate` (ISO yyyy-mm-dd).
// Strictly greater: a rule stamped the same day a judge ran is ambiguous, and
// staling on a tie makes every repin day look like a corpus-wide invalidation.
// Which RULES moved after a pin, grouped by the class each one is owed against.
// The pin says a verdict was taken on a date; the ledger says rule R was rewritten
// after it. That names a bounded re-check — re-read these rules against this body
// — where the class alone only says "re-judge everything this compendium feeds".
// Returns a Map so `.has(cls)` still answers the old question and `.get(cls)`
// answers the new one; a Set stub in a test keeps working against both.
function driftedRules(ledger, pinDate) {
  const out = new Map()
  if (!pinDate) return out
  for (const [name, c] of Object.entries(ledger.compendia || {})) {
    const moved = Object.entries(c.rules)
      .filter(([, r]) => r.changed_at && r.changed_at > pinDate)
      .map(([rule, r]) => ({ compendium: name, rule, changed_at: r.changed_at }))
    if (!moved.length) continue
    for (const cls of c.classes || []) {
      if (!out.has(cls)) out.set(cls, [])
      out.get(cls).push(...moved)
    }
  }
  return out
}

function driftedClasses(ledger, pinDate) {
  return new Set(driftedRules(ledger, pinDate).keys())
}

// On disk a rule is one line: "<hash>" while it has never been seen to move,
// "<hash>@<date>" once it has. One line per rule means a rule edit reads as a
// one-line diff in review, which is the whole point of keeping the ledger in git.
function encodeLedger(l) {
  const out = { compendia: {} }
  for (const [n, c] of Object.entries(l.compendia || {})) {
    const rules = {}
    for (const [id, r] of Object.entries(c.rules)) rules[id] = r.changed_at ? `${r.h}@${r.changed_at}` : r.h
    out.compendia[n] = { classes: c.classes, rules }
  }
  return out
}

function decodeLedger(raw) {
  const out = { compendia: {} }
  for (const [n, c] of Object.entries((raw && raw.compendia) || {})) {
    const rules = {}
    for (const [id, v] of Object.entries(c.rules || {})) {
      if (typeof v === 'string') { const [h, d] = v.split('@'); rules[id] = { h, changed_at: d || null } }
      else rules[id] = v
    }
    out.compendia[n] = { classes: c.classes || [], rules }
  }
  return out
}

function loadLedger(p) {
  try { return decodeLedger(JSON.parse(fs.readFileSync(p, 'utf8'))) } catch { return emptyLedger() }
}

function main(argv) {
  const arg = (f, d) => { const i = argv.indexOf(f); return i === -1 ? d : argv[i + 1] }
  const mem = arg('--mem', MEM)
  const ledgerPath = arg('--ledger', LEDGER)
  const current = readCompendia(mem)
  const ledger = loadLedger(ledgerPath)
  const report = diffLedger(ledger, current)

  if (argv.includes('--repin')) {
    const date = arg('--date', new Date().toISOString().slice(0, 10))
    const procedural = new Set((arg('--procedural', '') || '').split(',').map(s => s.trim()).filter(Boolean))
    for (const key of procedural) {
      const [name, rule] = key.split(':')
      if (!current[name] || !current[name].rules.some(r => r.id === rule)) throw new Error(`--procedural ${key}: no such rule in ${mem}`)
    }
    fs.writeFileSync(ledgerPath, JSON.stringify(encodeLedger(repin(ledger, current, date, { procedural })), null, 1) + '\n')
    process.stderr.write(`repinned ${Object.keys(current).length} compendia -> ${path.relative(REPO, ledgerPath)}\n`)
    for (const [n, r] of Object.entries(report)) {
      process.stderr.write(`  ${n}: ${r.unpinned ? 'baseline' : `+${r.added.length} ~${r.changed.length} -${r.removed.length} (stamped ${date})`}\n`)
    }
    return 0
  }

  if (argv.includes('--json')) { process.stdout.write(JSON.stringify(report, null, 1) + '\n'); return Object.keys(report).length ? 1 : 0 }

  if (!Object.keys(report).length) { process.stderr.write('no compendium drift since last pin\n'); return 0 }
  for (const [n, r] of Object.entries(report)) {
    const cls = (current[n] ? current[n].classes : []).join(',') || '-'
    if (r.unpinned) { process.stderr.write(`${n}\tUNPINNED (${r.added.length} rules) -> ${cls}\n`); continue }
    const parts = []
    if (r.added.length) parts.push(`added ${r.added.join(',')}`)
    if (r.changed.length) parts.push(`changed ${r.changed.join(',')}`)
    if (r.removed.length) parts.push(`removed ${r.removed.join(',')}`)
    process.stderr.write(`${n}\t${parts.join('; ')} -> re-judge ${cls}\n`)
  }
  process.stderr.write('\nrepin after the re-judge sweep: node curriculum/evals/scripts/compendium-drift.js --repin\n')
  return 1
}

module.exports = { encodeLedger, decodeLedger, parseRuleChunks, parseEvalClasses, readCompendia, diffLedger, repin, driftedClasses, driftedRules, loadLedger, hash, MEM, LEDGER }

if (require.main === module) process.exit(main(process.argv.slice(2)))
