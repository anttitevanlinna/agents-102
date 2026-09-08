#!/usr/bin/env node
// migrate-todo-vocabulary — one-shot instance migration for the 2026-09-08
// verdict-vocabulary change (Antti). Idempotent; safe to re-run.
//
// What changes and why:
//
//   todos[]                  -> notes[]        The array carried ten different
//     field shapes across the corpus and some rows were bare strings. It cannot
//     become suggestions[]: a suggestion owes `now` and `proposed`, and not one
//     legacy row carries a replacement. Inventing one would be fabrication, so
//     the text moves to notes[] whole and loses nothing.
//
//   todos_count              -> nonblocking_findings_count
//     In the seven rule-row classes this field always meant "REVISE rows with
//     blocking:false" — the open card queue, not optional advice. Renaming it
//     to suggestions_count would have relabelled the whole backlog.
//
//   prompts_findings[].verdict: 'TODO' -> 'PASS' + suggestions[]
//     Behavior's TODO meant "a risk fired but nothing is owed", which is a PASS
//     carrying a suggestion. Each fired risk with a fix_hint becomes one
//     suggestion row; a TODO whose risks name no fix becomes a plain PASS,
//     which is what the rubric already said should have happened.
//
//   verdict: 'PASS_WITH_TODOS' -> 'PASS'
//
// Usage: migrate-todo-vocabulary.js [--dir <instances>] [--dry-run]
'use strict'
const fs = require('node:fs')
const path = require('node:path')

const asArr = v => Array.isArray(v) ? v : (v && typeof v === 'object' ? Object.values(v) : [])
const isInt = v => Number.isInteger(v)

// `notes` is a bare STRING on 191 instances and an array on the rest. asArr()
// answers [] for a string, so merging through it deleted the prose — a silent
// loss, because the field still existed afterwards and only a diff against the
// previous commit could see it. Wrap, never spread-through-a-coercer: one value
// becomes a one-element list, and an object stays one note rather than being
// exploded into its own field values.
const toNoteList = v => (Array.isArray(v) ? v : v == null ? [] : [v])

// Legacy rows are strings or objects of ten shapes. Keep every field; only add
// provenance so a later reader knows why a note has a `rule` on it.
function todoToNote(t) {
  if (typeof t === 'string') return { from: 'todos[]', note: t }
  if (!t || typeof t !== 'object') return { from: 'todos[]', note: String(t) }
  return { from: 'todos[]', ...t }
}

// One suggestion per fired risk that names a fix. `now`/`proposed` cannot be
// recovered from a legacy risk, so they are left absent rather than guessed —
// a reader can tell a migrated row from an authored one by their absence.
function risksToSuggestions(finding) {
  const out = []
  for (const r of asArr(finding.risks_fired)) {
    const hint = r && typeof r.fix_hint === 'string' ? r.fix_hint.trim() : ''
    if (!hint) continue
    out.push({
      from: 'prompts_findings TODO',
      rule: r.pattern_id || null,
      prompt_index: finding.prompt_index === undefined ? null : finding.prompt_index,
      note: hint,
      evidence: r.evidence || null,
    })
  }
  return out
}

function migrate(inst) {
  const changes = []
  const out = { ...inst }

  if (Array.isArray(inst.todos) && inst.todos.length) {
    out.notes = [...toNoteList(inst.notes), ...inst.todos.map(todoToNote)]
    changes.push(`todos[]->notes[] (${inst.todos.length})`)
  }
  if ('todos' in out) { delete out.todos; if (!changes.length) changes.push('dropped empty todos[]') }

  if ('todos_count' in inst) {
    const v = inst.todos_count
    if (!('nonblocking_findings_count' in out)) out.nonblocking_findings_count = isInt(v) ? v : 0
    delete out.todos_count
    changes.push('todos_count->nonblocking_findings_count')
  }

  // Where legacy todos[] rows moved out, the declared count was counting them.
  // Under the new definition the field means non-blocking REVISE rows and
  // nothing else, so recomputing is applying the definition rather than making
  // a judgement — and the rows themselves survive in notes[]. Leaving the old
  // number would turn a former debt row into a hard gate failure: removing the
  // rival ledger leaves exactly one count to be right about.
  if (Array.isArray(inst.todos) && inst.todos.length) {
    out.nonblocking_findings_count = asArr(inst.rules_evaluated)
      .filter(r => r && typeof r === 'object' && r.verdict === 'REVISE' && r.blocking === false).length
    changes.push(`count recomputed -> ${out.nonblocking_findings_count}`)
  }

  if (Array.isArray(inst.prompts_findings)) {
    const suggestions = asArr(out.suggestions).slice()
    let converted = 0
    out.prompts_findings = inst.prompts_findings.map(f => {
      if (!f || typeof f !== 'object' || f.verdict !== 'TODO') return f
      converted++
      suggestions.push(...risksToSuggestions(f))
      return { ...f, verdict: 'PASS' }
    })
    if (converted) {
      changes.push(`prompts TODO->PASS (${converted})`)
      // Behavior's count is genuinely suggestions, not open cards: nothing is
      // owed on any of them.
      out.suggestions = suggestions
      out.suggestions_count = suggestions.length
      // A behavior instance has no rule rows, so the renamed field is 0 there.
      out.nonblocking_findings_count = 0
    }
  }

  if (out.verdict === 'PASS_WITH_TODOS') { out.verdict = 'PASS'; changes.push('PASS_WITH_TODOS->PASS') }

  return { out, changes }
}

function main(argv) {
  const arg = k => { const i = argv.indexOf(k); return i === -1 ? null : argv[i + 1] }
  const dir = arg('--dir') || path.join(__dirname, '..', 'instances')
  const dry = argv.includes('--dry-run')
  let touched = 0
  for (const f of fs.readdirSync(dir).sort()) {
    if (!f.endsWith('.json')) continue
    const p = path.join(dir, f)
    const raw = fs.readFileSync(p, 'utf8')
    let inst
    try { inst = JSON.parse(raw) } catch { process.stderr.write(`  SKIP (unparseable) ${f}\n`); continue }
    const { out, changes } = migrate(inst)
    if (!changes.length) continue
    // Match the file's own indent so the diff is the change, not a reformat.
    const m = /^\{\n(\s+)"/.exec(raw)
    const indent = m ? m[1].length : 2
    if (!dry) fs.writeFileSync(p, JSON.stringify(out, null, indent) + '\n')
    process.stderr.write(`  ${f}: ${changes.join(', ')}\n`)
    touched++
  }
  process.stderr.write(`\n${dry ? 'would migrate' : 'migrated'} ${touched} instance(s)\n`)
  return 0
}

module.exports = { migrate, todoToNote, risksToSuggestions }

if (require.main === module) process.exit(main(process.argv.slice(2)))
