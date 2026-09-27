#!/usr/bin/env node
// drift-scope.js — re-judge only the rules that moved; carry the rest, or refuse.
//
// A class the queue lists for `rule-drift` alone held still on the body side:
// diff-region routing already vouched that none of its regions moved since the
// pin. What moved is a handful of compendium rules. Re-reading the whole class
// rulebook for them re-derives every other row from a body the router says is
// unchanged. So a drift-scoped fire hands the judge only the moved rules and
// carries every other row from the prior instance.
//
// The carry trusts the router the same way the queue does when it does not list
// a class at all, plus one check the router cannot make: every body quote a
// carried row cites must still appear verbatim in the file. A carried row whose
// quote has left the body is evidence about text that is gone, so the whole
// class goes back to a full judge. Every other doubt routes the same way:
//
//   behavior class                → full (its ledger is prompts_findings)
//   a moved rule that won't resolve, or sits outside the class lane → full
//   no prior instance / no rule rows                                → full
//   a carried blocking REVISE     → full (a class owing a fix is re-read whole)
//   any carried quote missing     → full
//
// `--annotate` runs this per rule-drift class over eval-queue --json items and
// writes `driftScope[cls] = {route, rules, reason}`, which eval-sweep.js reads
// (the workflow sandbox has no fs, so the decision is made here, not there).
// `--merge` runs AFTER the drift judge wrote its replacement rows: it re-checks
// the guard against the body as it is now, requires one row per moved rule and
// no other, splices them in, recounts, and marks the instance `scope: "drift"`.
// A refusal leaves the instance untouched and exits 3; the sweep then fires the
// full class judge.
//
// Quotes: a span opened by a quote mark right after a line cite (`L31 '…'`,
// `line 12: "…"`), a row's `quote` field, and a suggestion's `now`. A span is
// cut at its first closing mark, so an apostrophe inside it yields a prefix —
// still verbatim if the quote was. `...` / `…` elisions split it into fragments,
// each checked. Unanchored quotes (grep patterns, rule wording) are not body text.
// Quote marks compare as one character: JSON evidence often swaps " for '.
//
// Usage:
//   node curriculum/evals/scripts/drift-scope.js --annotate [queue.json]      (stdin if no path)
//   node curriculum/evals/scripts/drift-scope.js --plan  <file.md> <class> --rules <id,...>
//   node curriculum/evals/scripts/drift-scope.js --merge <file.md> <class> --rules <id,...>
'use strict'
const crypto = require('node:crypto')
const fs = require('node:fs')
const path = require('node:path')
const { execFileSync } = require('node:child_process')
const { parseRuleIds, ruleBodies } = require('./derive-class-brief.js')
const { slugFor } = require('./derive-body-view.js')
const { ROW_VERDICTS } = require('./instance-contract.js')

const REPO = path.resolve(__dirname, '..', '..', '..')
const INSTANCES = path.join(REPO, 'curriculum', 'evals', 'instances')
const VIEWS = path.join(REPO, 'curriculum', 'evals', 'body-views')
const SIM = path.join(REPO, 'curriculum', 'evals', 'sim-cache')

const keyOf = (comp, rule) => `${String(comp).replace(/\.md$/, '')}.md|${String(rule)}`
const idStr = r => `${r.compendium.replace(/\.md$/, '')}:${r.rule}`
const rowsPath = (slug, cls, viewsDir = VIEWS) => path.join(viewsDir, `${slug}.${cls}.drift.json`)

const CLOSE = { "'": ["'"], '"': ['"'], '“': ['”', '"'], '‘': ['’', "'"] }
// A space or `:`/`,` must separate the cite from the mark: `L12's` is a possessive.
const ANCHOR = /\b(?:L|[Ll]ines?\s+)\d+[a-z]?(?:\s*[-–]\s*L?\d+[a-z]?)?\)?(?:\s*[:,]\s*|\s+)(['"“‘])/g

function norm(s) {
  return String(s)
    .replace(/[‘’“”"]/g, "'")
    .replace(/\*\*|[*`]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function quotesOf(row) {
  const out = []
  if (!row || typeof row !== 'object') return out
  const ev = typeof row.evidence === 'string' ? row.evidence : ''
  for (const m of ev.matchAll(ANCHOR)) {
    const start = m.index + m[0].length
    const ends = CLOSE[m[1]].map(c => ev.indexOf(c, start)).filter(i => i > start)
    if (!ends.length) continue
    out.push(ev.slice(start, Math.min(...ends)))
  }
  for (const k of ['quote', 'now']) if (typeof row[k] === 'string' && row[k].trim()) out.push(row[k])
  return out
}

// Edge punctuation a judge added around a quote is trimmed; what is left is still
// checked verbatim. A quote of the Quality line is exempt: the stamper rewrites
// that line on every stamp, so it is machinery, not prose any rule judged.
function fragments(q) {
  if (/^Quality:/.test(norm(q))) return []
  return String(q).split(/\.\.\.|…/).map(f => norm(f).replace(/^[\s,.;:]+|[\s,.;:]+$/g, '')).filter(f => f.length >= 3)
}

function readSource(fileArg) {
  const abs = path.isAbsolute(fileArg) ? fileArg : path.join(REPO, fileArg)
  const rel = path.relative(REPO, abs)
  const raw = fs.readFileSync(abs, 'utf8')
  return { abs, rel, raw, slug: slugFor(rel), sha: crypto.createHash('sha256').update(raw, 'utf8').digest('hex') }
}

// The raw source first; the student view (prompts / figures expanded) only when
// a quote is not in the source, since a judge may quote an expanded prompt.
function haystack(src) {
  const raw = norm(src.raw)
  let expanded = null
  return frag => {
    if (raw.includes(frag)) return true
    if (expanded === null) {
      try {
        expanded = norm(execFileSync('node', [path.join(REPO, 'scripts', 'expand-md.js'), src.abs],
          { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024, stdio: ['ignore', 'pipe', 'ignore'] }))
      } catch { expanded = '' }
    }
    return expanded.includes(frag)
  }
}

function planClass({ file, cls, rules, instancesDir = INSTANCES, simDir = SIM }) {
  const full = reason => ({ route: 'full', reason })
  if (cls === 'behavior') return full('behavior ledger is prompts_findings, not rule rows')
  // A drift judge re-reads rules, never the persona trace, so story drifts only
  // on a trace already bound to this body (bind-trace.js's hash); else the
  // verdict cannot stamp and the class owes a full judge regardless.
  if (cls === 'story' && !personaBound(file, simDir)) return full('persona trace not bound to the current body')
  let moved
  try { moved = ruleBodies(cls, rules) } catch (e) { return full(`moved rules unusable: ${e.message}`) }
  let src
  try { src = readSource(file) } catch (e) { return full(`cannot read ${file}: ${e.message}`) }
  const instPath = path.join(instancesDir, `${src.slug}.${cls}.json`)
  let inst
  try { inst = JSON.parse(fs.readFileSync(instPath, 'utf8')) } catch { return full('no prior instance') }
  const rows = Array.isArray(inst.rules_evaluated) ? inst.rules_evaluated.filter(r => r && typeof r === 'object') : []
  if (!rows.length) return full('prior instance has no rule rows')

  const movedKeys = new Set(moved.map(m => keyOf(m.compendium, m.rule)))
  const carried = rows.filter(r => !movedKeys.has(keyOf(r.compendium, r.rule_index)))
  const owing = carried.find(r => r.verdict === 'REVISE' && r.blocking === true)
  if (owing) return full(`carried row ${owing.compendium} §${owing.rule_index} is a blocking REVISE`)
  const found = haystack(src)
  const suggestions = Array.isArray(inst.suggestions) ? inst.suggestions : []
  for (const r of [...carried, ...suggestions]) {
    for (const q of quotesOf(r)) {
      const miss = fragments(q).find(f => !found(f))
      if (miss) return full(`quote no longer in the body: "${miss.slice(0, 80)}"`)
    }
  }
  return { route: 'drift', reason: 'ok', rules: moved.map(idStr), carried: carried.length, src, inst, instPath, movedKeys, moved }
}

function personaBound(file, simDir) {
  let slug, sha
  try {
    slug = readSource(file).slug
    sha = require('node:crypto').createHash('sha256').update(fs.readFileSync(path.resolve(REPO, file))).digest('hex')
  } catch { return false }
  try {
    const m = fs.readFileSync(path.join(simDir, `${slug}.persona.json`), 'utf8').match(/"content_sha"\s*:\s*"([^"]*)"/)
    return !!m && m[1] === sha
  } catch { return false }
}

// Only the fields a dispatcher reads; the rest of a plan is merge-time state.
const publicPlan = p => (p.route === 'drift'
  ? { route: 'drift', rules: p.rules, carried: p.carried }
  : { route: 'full', reason: p.reason })

function annotate(items, dirs = {}) {
  return items.map(it => {
    const plans = {}
    for (const cls of it.classes || []) {
      const moved = (it.driftRules || {})[cls]
      if ((it.detail || {})[cls] !== 'rule-drift' || !Array.isArray(moved) || !moved.length) continue
      let ids
      try { ids = parseRuleIds(moved).map(idStr) } catch (e) { plans[cls] = { route: 'full', reason: e.message }; continue }
      plans[cls] = publicPlan(planClass({ file: it.file, cls, rules: ids, ...dirs }))
    }
    return Object.keys(plans).length ? { ...it, driftScope: plans } : it
  })
}

function writeRows(file, cls, doc, { viewsDir = VIEWS } = {}) {
  const p = rowsPath(readSource(file).slug, cls, viewsDir)
  fs.mkdirSync(path.dirname(p), { recursive: true })
  fs.writeFileSync(p, JSON.stringify(doc, null, 2) + '\n')
  return p
}

function indentOf(raw) {
  const m = raw.match(/^\{\n( +)"/)
  return m ? m[1].length : 2
}

function mergeDrift({ file, cls, rules, instancesDir = INSTANCES, viewsDir = VIEWS, apply = true }) {
  const fallback = reason => ({ status: 'fallback', reason })
  const plan = planClass({ file, cls, rules, instancesDir })
  if (plan.route !== 'drift') return fallback(plan.reason)

  let doc
  try { doc = JSON.parse(fs.readFileSync(rowsPath(plan.src.slug, cls, viewsDir), 'utf8')) } catch {
    return fallback(`no drift rows at ${path.relative(REPO, rowsPath(plan.src.slug, cls, viewsDir))}`)
  }
  const fresh = Array.isArray(doc.rules_evaluated) ? doc.rules_evaluated : []
  const seen = new Set()
  for (const r of fresh) {
    if (!r || typeof r !== 'object') return fallback('a drift row is not an object')
    const k = keyOf(r.compendium, r.rule_index)
    if (!plan.movedKeys.has(k)) return fallback(`row ${r.compendium} §${r.rule_index} is not a moved rule`)
    if (seen.has(k)) return fallback(`two rows for ${r.compendium} §${r.rule_index}`)
    if (!ROW_VERDICTS.includes(r.verdict)) return fallback(`row ${r.compendium} §${r.rule_index} verdict ${JSON.stringify(r.verdict)}`)
    if (r.verdict === 'REVISE' && typeof r.blocking !== 'boolean') return fallback(`REVISE row ${r.compendium} §${r.rule_index} has no boolean blocking`)
    seen.add(k)
  }
  const unrowed = [...plan.movedKeys].filter(k => !seen.has(k))
  if (unrowed.length) return fallback(`no row for moved rule ${unrowed.join(', ')}`)

  const byKey = new Map(fresh.map(r => [keyOf(r.compendium, r.rule_index), r]))
  const inst = plan.inst
  const merged = []
  for (const r of inst.rules_evaluated) {
    const k = r && typeof r === 'object' ? keyOf(r.compendium, r.rule_index) : null
    if (k && byKey.has(k)) { merged.push(byKey.get(k)); byKey.delete(k) } else merged.push(r)
  }
  merged.push(...byKey.values())
  inst.rules_evaluated = merged
  const live = merged.filter(r => r && typeof r === 'object' && r.verdict === 'REVISE')
  inst.blocking_findings_count = live.filter(r => r.blocking === true).length
  inst.nonblocking_findings_count = live.filter(r => r.blocking === false).length
  inst.verdict = inst.blocking_findings_count ? 'REVISE' : 'PASS'
  if (Array.isArray(doc.suggestions) && doc.suggestions.length) {
    inst.suggestions = [...(Array.isArray(inst.suggestions) ? inst.suggestions : []), ...doc.suggestions]
  }
  inst.body_sha = plan.src.sha
  inst.scope = 'drift'
  inst.drift_rules = plan.moved.map(m => `${m.compendium} §${m.rule}`)
  if (apply) {
    const raw = fs.readFileSync(plan.instPath, 'utf8')
    fs.writeFileSync(plan.instPath, JSON.stringify(inst, null, indentOf(raw)) + '\n')
  }
  return {
    status: 'merged', slug: plan.src.slug, verdict: inst.verdict, replaced: fresh.length, carried: plan.carried,
    blocking: inst.blocking_findings_count, nonblocking: inst.nonblocking_findings_count, body_sha: inst.body_sha,
  }
}

module.exports = { parseRuleIds, quotesOf, planClass, annotate, mergeDrift, writeRows, rowsPath }

if (require.main === module) {
  const argv = process.argv.slice(2)
  const ri = argv.indexOf('--rules')
  const rules = ri === -1 ? [] : String(argv[ri + 1] || '').split(',').filter(Boolean)
  const pos = argv.filter((a, i) => !a.startsWith('--') && i !== ri + 1)
  if (argv.includes('--annotate')) {
    const input = fs.readFileSync(pos[0] || 0, 'utf8')
    process.stdout.write(JSON.stringify(annotate(JSON.parse(input)), null, 1) + '\n')
    return
  }
  const [file, cls] = pos
  if (!file || !cls || ri === -1) {
    console.error('usage: drift-scope.js --annotate [queue.json] | --plan|--merge <file.md> <class> --rules <id,...>')
    process.exit(1)
  }
  if (argv.includes('--merge')) {
    const r = mergeDrift({ file, cls, rules })
    if (r.status !== 'merged') { console.log(`FALLBACK ${cls}: ${r.reason}`); process.exit(3) }
    console.log(`MERGED ${r.slug}.${cls}: verdict ${r.verdict} · ${r.replaced} rows replaced · ${r.carried} carried · blocking ${r.blocking} · nonblocking ${r.nonblocking} · body_sha ${r.body_sha}`)
    process.exit(0)
  }
  const p = publicPlan(planClass({ file, cls, rules }))
  console.log(JSON.stringify(p))
  process.exit(p.route === 'drift' ? 0 : 3)
}
