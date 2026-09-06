#!/usr/bin/env node
'use strict'
/*
 * apply-edits — land a ledger of exact-string edits, refusing anything that
 * is not a unique match.
 *
 * The triage ledger (`todo-triage.<training>.json`) and every read-only audit
 * fan-out hand back the same shape: {file, old_string, new_string}. Applying
 * them by hand is one Edit call per row; applying them with sed is blind to
 * a span that occurs twice or has moved. This does the one check that
 * matters — the span occurs EXACTLY once in the file right now — and skips
 * loudly otherwise, so a stale proposal never lands on the wrong line.
 *
 *   node curriculum/evals/scripts/apply-edits.js <edits.json> [--dry-run] [--only id,id,...]
 *
 * edits.json = [{id, file, old_string, new_string}, ...]  (file repo-relative)
 * Prints one line per edit: applied · skip:not-found · skip:ambiguous ·
 * skip:unreadable. Exit 1 if anything was skipped, so the caller reads the
 * list instead of assuming the batch landed.
 *
 * A rule whose only enforcement is a Write|Edit hook is unenforced under a
 * scripted edit (check_writing §3): after a batch, run the §3 grep and the
 * banned-phrase grep over the touched files yourself.
 */
const fs = require('node:fs')
const path = require('node:path')

function countOccurrences(hay, needle) {
  if (!needle) return 0
  let n = 0, i = 0
  while ((i = hay.indexOf(needle, i)) !== -1) { n++; i += needle.length }
  return n
}

function applyAll(edits, { repo = process.cwd(), dryRun = false, readFile, writeFile } = {}) {
  const read = readFile || (p => { try { return fs.readFileSync(path.resolve(repo, p), 'utf8') } catch { return null } })
  const write = writeFile || ((p, t) => fs.writeFileSync(path.resolve(repo, p), t))
  const texts = new Map()
  const results = []
  for (const e of edits) {
    const id = e.id || `${e.file}#${results.length + 1}`
    if (!texts.has(e.file)) texts.set(e.file, read(e.file))
    const text = texts.get(e.file)
    if (text === null) { results.push({ id, file: e.file, status: 'skip:unreadable' }); continue }
    const n = countOccurrences(text, e.old_string)
    if (n === 0) { results.push({ id, file: e.file, status: 'skip:not-found' }); continue }
    if (n > 1) { results.push({ id, file: e.file, status: 'skip:ambiguous', count: n }); continue }
    texts.set(e.file, text.replace(e.old_string, () => e.new_string || ''))
    results.push({ id, file: e.file, status: 'applied' })
  }
  if (!dryRun) {
    for (const [file, text] of texts) {
      if (text === null) continue
      if (results.some(r => r.file === file && r.status === 'applied')) write(file, text)
    }
  }
  return results
}

function main(argv) {
  const file = argv.find(a => !a.startsWith('--'))
  if (!file) { process.stderr.write('usage: apply-edits.js <edits.json> [--dry-run] [--only id,id]\n'); process.exit(2) }
  const dryRun = argv.includes('--dry-run')
  const onlyIdx = argv.indexOf('--only')
  const only = onlyIdx === -1 ? null : new Set(argv[onlyIdx + 1].split(',').map(s => s.trim()).filter(Boolean))
  let edits = JSON.parse(fs.readFileSync(file, 'utf8'))
  if (!Array.isArray(edits)) edits = edits.edits || edits.proposals || []
  if (only) edits = edits.filter(e => only.has(e.id))
  const results = applyAll(edits, { dryRun })
  for (const r of results) console.log(`${r.status.padEnd(16)} ${r.id}  ${r.file}${r.count ? `  (${r.count} matches)` : ''}`)
  const skipped = results.filter(r => r.status !== 'applied')
  console.log(`${results.length - skipped.length} applied · ${skipped.length} skipped${dryRun ? ' (dry run, nothing written)' : ''}`)
  if (skipped.length) process.exit(1)
}

module.exports = { applyAll, countOccurrences }
if (require.main === module) main(process.argv.slice(2))
