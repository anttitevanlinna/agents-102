#!/usr/bin/env node
'use strict'
/*
 * settle-card — write a ruling onto one triage row.
 *
 * `open-cards.js` reads the ledger and `apply-edits.js` applies the prepped
 * edits, but nothing wrote the ruling back, so every settled card went in
 * through a hand-typed `node -e` over a 750K JSON file. That is a write path
 * with no guard on it: the wrong row, a second `card` clobbering a first, an
 * outcome word nobody else uses, or a reserialise that reflows the whole file
 * into a diff nobody can read.
 *
 * Four outcomes, and they are not interchangeable:
 *   applied   the edit landed in the file
 *   declined  Antti ruled against it (or it was suppressed on dose before
 *             presenting — same effect on the corpus, and the note says which)
 *   dropped   the finding is wrong on the rule text
 *   stale     the prose the finding names is gone
 *
 * A note is required and is the whole point: the outcome word is the index, the
 * note is the record. `--force` is deliberately absent — a row that already
 * carries a `card` was ruled on, and a second ruling is a new row's business.
 *
 * Usage:
 *   node curriculum/evals/scripts/settle-card.js --training ae101 \
 *     --rule "prompts 43" --file curriculum/exercises/compound-and-close.md \
 *     --outcome declined --at 2026-09-09 --note-file <path>
 *
 * `--note-file` rather than `--note` because these notes carry quotes, section
 * signs and newlines, and passing them through a shell is how they get mangled.
 * `--note` is accepted for one-liners. Exits 1 on anything ambiguous: no match,
 * more than one match, an unknown outcome, an already-settled row.
 */
const fs = require('node:fs')
const path = require('node:path')

const OUTCOMES = new Set(['applied', 'declined', 'dropped', 'stale'])
const LEDGER = t => `curriculum/evals/todo-triage.${t}.json`

// The ledger is a bare array today and was a "0","1","2" object before that.
// Read both; write back whichever shape came in.
function toRows(ledger) {
  if (Array.isArray(ledger)) return { rows: ledger, keyed: false }
  const keys = Object.keys(ledger)
  return { rows: keys.map(k => ledger[k]), keyed: keys }
}

function findRow(rows, { rule, file, instance }) {
  const hit = []
  rows.forEach((r, i) => {
    if (rule && r.rule !== rule) return
    if (file && r.target_file !== file) return
    if (instance && r.instance !== instance) return
    hit.push(i)
  })
  return hit
}

function settle(ledger, sel, card) {
  const { rows, keyed } = toRows(ledger)
  const hit = findRow(rows, sel)
  if (!hit.length) return { error: 'no row matches that selector' }
  if (hit.length > 1) {
    return { error: `${hit.length} rows match — add --instance or --file to pick one:\n` +
      hit.map(i => `  ${rows[i].rule}  ${rows[i].target_file}  ${rows[i].instance || ''}`).join('\n') }
  }
  const i = hit[0]
  if (rows[i].card) return { error: `already settled as "${rows[i].card.outcome}" on ${rows[i].card.at} — a second ruling is a new row` }
  rows[i].card = card
  // Round-trip in the shape it arrived in, at the indent the file already uses,
  // so the diff is the one row and not the whole ledger.
  const out = keyed ? Object.fromEntries(keyed.map((k, n) => [k, rows[n]])) : rows
  return { index: i, row: rows[i], out }
}

function main(argv) {
  const flag = n => (argv.includes(n) ? argv[argv.indexOf(n) + 1] : null)
  const repo = flag('--repo') || process.cwd()
  const training = flag('--training') || 'ae101'
  const outcome = flag('--outcome')
  const at = flag('--at')
  const noteFile = flag('--note-file')
  const note = noteFile ? fs.readFileSync(path.resolve(repo, noteFile), 'utf8').trim() : flag('--note')

  if (!OUTCOMES.has(outcome)) {
    process.stderr.write(`--outcome must be one of ${[...OUTCOMES].join(' / ')}\n`)
    return 1
  }
  if (!note) { process.stderr.write('a ruling with no note settles nothing — pass --note or --note-file\n'); return 1 }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(at || '')) { process.stderr.write('--at must be YYYY-MM-DD\n'); return 1 }

  const file = path.join(repo, LEDGER(training))
  const raw = fs.readFileSync(file, 'utf8')
  const res = settle(JSON.parse(raw), {
    rule: flag('--rule'), file: flag('--file'), instance: flag('--instance'),
  }, { outcome, at, note })

  if (res.error) { process.stderr.write(res.error + '\n'); return 1 }
  if (!argv.includes('--dry-run')) fs.writeFileSync(file, JSON.stringify(res.out, null, 1) + '\n')
  process.stdout.write(`${argv.includes('--dry-run') ? 'would settle' : 'settled'} row ${res.index}: ${res.row.rule} · ${res.row.target_file} → ${outcome}\n`)
  return 0
}

if (require.main === module) process.exit(main(process.argv.slice(2)))
module.exports = { OUTCOMES, toRows, findRow, settle, main }
