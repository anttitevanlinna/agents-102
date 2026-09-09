#!/usr/bin/env node
'use strict'
/*
 * open-cards — "what is still owed a human?" in one command.
 *
 * eval-queue.js answers what owes a JUDGE. This answers the other half: the
 * triage ledger's rows that still need a person. The two together are the whole
 * open-work picture, and until 2026-09-09 only the first half had a reader.
 *
 * The second half was answered by copy-pasting a `node -e` one-liner out of the
 * prose of `todo-triage.ae101.md` — a 29K report that `find-session-docs.js`
 * lists as reachable from no loaded surface. So the queue was real, the access
 * method was a paragraph, and answering "what's open?" meant rebuilding the
 * query from scratch and getting the denominator wrong: 131 rows carry no
 * `card.outcome`, and reading that as the backlog overstates it fivefold.
 *
 * WHAT COUNTS AS OPEN, and why the two axes are not the same question:
 *
 *   CARDS      `disposition: CARD` with no `card.outcome`. A judgement Antti
 *              has not made. `card.outcome` is only ever written on a CARD row,
 *              so its absence on a REFUTE or STALE row means nothing — those
 *              were settled by the disposition itself.
 *
 *   PREPPED    A row carrying `old_string`/`new_string` — a maintainer-surface
 *              edit written out and ready. Whether it LANDED is not recorded
 *              anywhere, so this does not trust a flag: it reads the target file
 *              and looks.
 *                pending  new_string absent, old_string present → applies now
 *                moved    neither present → the anchor changed underneath it;
 *                         re-derive, never apply blind
 *                applied  new_string present → done, and nothing said so
 *
 * Testing the file instead of a status field is the whole design. A flag drifts
 * the moment someone edits by hand; the file cannot. That is also why `applied`
 * is counted rather than deleted — a row nobody marked is not a row nobody did.
 *
 * Usage:
 *   node curriculum/evals/scripts/open-cards.js [--training ae101] [--json]
 *                                              [--pending] [--file <substr>]
 *                                              [--repo <path>]
 * `--pending` lists the prepped edits that apply cleanly right now, in the
 * shape apply-edits.js reads on stdin.
 * `--file` scopes every count to one page — the question actually asked is
 * almost always "what is open on THIS file", and answering it by hand meant a
 * fresh `node -e` over the ledger every time. Scoped, the report has room to
 * print each card's claim instead of a rule number.
 * Exit 0 always — a report, never a gate. Owing a decision is a to-do list.
 */
const fs = require('node:fs')
const path = require('node:path')

const LEDGER = t => `curriculum/evals/todo-triage.${t}.json`

// The ledger is written as a JSON object keyed "0","1","2"… by whatever wrote
// it last, and as a bare array by whatever wrote it before that. Read both, and
// do not care which: an access shape is not a finding.
function rows(ledger) {
  if (Array.isArray(ledger)) return ledger
  if (!ledger || typeof ledger !== 'object') return []
  const nested = Object.values(ledger).find(Array.isArray)
  if (nested && !Object.values(ledger).some(v => v && typeof v === 'object' && v.disposition)) return nested
  return Object.values(ledger).filter(v => v && typeof v === 'object')
}

const settled = r => !!(r.card && r.card.outcome)
const disp = r => String(r.disposition || '').toUpperCase()

// A file scope is a substring, matched against the target_file AND the judged
// instance. Both, because a triage row sometimes targets a different document
// than the file that tripped the rule (strategy_tie_in binds the strategy doc,
// filed on the curriculum page), and a person asking what is open on a page
// wants either. Case-insensitive: the query is typed, not derived.
function matchesFile(r, needle) {
  if (!needle) return true
  return `${r.target_file || ''}\n${r.instance || ''}`.toLowerCase().includes(needle.toLowerCase())
}

// A card is open when triage made it a card and nobody has ruled on it.
const isOpenCard = r => disp(r) === 'CARD' && !settled(r)

// Ground truth for a prepped edit is the file, not the ledger.
function editState(r, repo, read) {
  if (!r.new_string || !r.target_file) return null
  let text
  try { text = read(path.resolve(repo, r.target_file)) } catch { return 'unreadable' }
  if (text == null) return 'unreadable'
  if (text.includes(r.new_string)) return 'applied'
  if (r.old_string && text.includes(r.old_string)) return 'pending'
  return 'moved'
}

function summarise(ledger, { repo = process.cwd(), readFile, file } = {}) {
  const read = readFile || (p => { try { return fs.readFileSync(p, 'utf8') } catch { return null } })
  const all = rows(ledger).filter(r => matchesFile(r, file))
  const cards = all.filter(isOpenCard)

  const byRule = {}
  for (const r of cards) byRule[r.rule || '(no rule)'] = (byRule[r.rule || '(no rule)'] || 0) + 1

  const byRank = {}
  for (const r of cards) {
    const v = (r.gate_triage || r.survivor_disposition || {}).value_rank
    const k = v == null ? '(unranked)' : String(v)
    byRank[k] = (byRank[k] || 0) + 1
  }

  const prepped = { pending: [], moved: [], applied: [], unreadable: [] }
  for (const r of all) {
    if (settled(r)) continue
    const state = editState(r, repo, read)
    if (state) prepped[state].push(r)
  }

  const dispositions = {}
  for (const r of all) {
    const k = settled(r) ? `settled:${r.card.outcome}` : disp(r) || '(none)'
    dispositions[k] = (dispositions[k] || 0) + 1
  }

  return { total: all.length, cards, byRule, byRank, prepped, dispositions, scope: file }
}

function render(s, training, scope = s.scope) {
  const out = []
  const rank = Object.entries(s.byRank).sort((a, b) => b[0].localeCompare(a[0]))
  out.push(`=== OPEN WORK — training: ${training}${scope ? ` · scope: ${scope}` : ''} ===`)
  out.push('')
  out.push(`CARDS AWAITING A RULING — ${s.cards.length}`)
  if (s.cards.length) {
    out.push(`  by value_rank: ${rank.map(([k, v]) => `${k}→${v}`).join('  ')}`)
    // Scoped to one page the list is short enough to print the finding itself.
    // A rule number tells you a card exists; the claim tells you what it asks.
    if (scope) {
      for (const r of s.cards) {
        const v = (r.gate_triage || r.survivor_disposition || {}).value_rank
        out.push(`  · ${r.rule}${v == null ? '' : `  (value_rank ${v})`}  →  ${r.target_file || '(no target)'}`)
        if (r.claim) out.push(`      ${r.claim}`)
      }
    } else {
      for (const [rule, n] of Object.entries(s.byRule).sort((a, b) => b[1] - a[1])) {
        out.push(`  ${String(n).padStart(3)}  ${rule}`)
      }
    }
  } else {
    out.push(scope
      ? `  none on ${scope} — nothing here is awaiting a ruling`
      : '  none — every card triage raised has been ruled on')
  }
  out.push('')

  const p = s.prepped
  out.push(`PREPPED EDITS — written out, state read from the file itself`)
  out.push(`  ${String(p.pending.length).padStart(3)}  pending    apply cleanly now`)
  out.push(`  ${String(p.moved.length).padStart(3)}  moved      anchor changed underneath — re-derive, do not apply blind`)
  out.push(`  ${String(p.applied.length).padStart(3)}  applied    already in the file, unmarked in the ledger`)
  if (p.unreadable.length) out.push(`  ${String(p.unreadable.length).padStart(3)}  unreadable target file missing`)
  for (const r of p.pending) out.push(`      pending  ${r.rule}  ${r.target_file}`)
  for (const r of p.moved) out.push(`      moved    ${r.rule}  ${r.target_file}`)
  out.push('')

  out.push(`LEDGER — ${s.total} rows total`)
  for (const [k, v] of Object.entries(s.dispositions).sort((a, b) => b[1] - a[1])) {
    out.push(`  ${String(v).padStart(3)}  ${k}`)
  }
  return out.join('\n')
}

function main(argv) {
  const flag = n => (argv.includes(n) ? argv[argv.indexOf(n) + 1] : null)
  const repo = flag('--repo') || process.cwd()
  const training = flag('--training') || 'ae101'
  const scope = flag('--file')
  const file = path.join(repo, LEDGER(training))

  let ledger
  try { ledger = JSON.parse(fs.readFileSync(file, 'utf8')) } catch {
    process.stdout.write(`no triage ledger for ${training} at ${LEDGER(training)} — nothing to report\n`)
    return 0
  }
  const s = summarise(ledger, { repo, file: scope })

  if (argv.includes('--pending')) {
    process.stdout.write(JSON.stringify(s.prepped.pending.map(r => ({
      id: `${r.rule}::${r.target_file}`, file: r.target_file,
      old_string: r.old_string, new_string: r.new_string,
    })), null, 2) + '\n')
    return 0
  }
  if (argv.includes('--json')) {
    process.stdout.write(JSON.stringify({
      training, scope: scope || null, open_cards: s.cards.length, by_rule: s.byRule, by_value_rank: s.byRank,
      prepped: Object.fromEntries(Object.entries(s.prepped).map(([k, v]) => [k, v.length])),
      dispositions: s.dispositions, ledger_rows: s.total,
    }, null, 2) + '\n')
    return 0
  }
  process.stdout.write(render(s, training, scope) + '\n')
  return 0
}

if (require.main === module) process.exit(main(process.argv.slice(2)))
module.exports = { rows, isOpenCard, matchesFile, editState, summarise, render, main }
