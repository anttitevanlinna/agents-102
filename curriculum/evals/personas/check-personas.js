#!/usr/bin/env node
'use strict'
// Lists persona cards with the hash a run must record, and fails on a card
// that misses a required field. Usage: node check-personas.js [set] [--json]
// The hash covers _shared.md + the card, which is exactly what the persona agent reads.

const fs = require('node:fs')
const path = require('node:path')
const crypto = require('node:crypto')

const REQUIRED = [
  'id', 'name', 'role', 'setting', 'ai_level', 'stance', 'why_here',
  'came_to_get', 'wasted_if', 'patience', 'leans_in_when', 'learning_style',
  'chat_voice', 'misconception', 'monday', 'fits_kits', 'kit_role',
]

function frontmatterKeys(text) {
  const m = text.match(/^---\n([\s\S]*?)\n---\n/)
  if (!m) return null
  return m[1].split('\n').map(l => l.match(/^([a-z_]+):/)).filter(Boolean).map(x => x[1])
}

function load(set) {
  const dir = path.join(__dirname, set)
  const shared = fs.readFileSync(path.join(dir, '_shared.md'), 'utf8')
  const cards = fs.readdirSync(dir).filter(f => f.endsWith('.md') && !f.startsWith('_')).sort()
  return cards.map(f => {
    const text = fs.readFileSync(path.join(dir, f), 'utf8')
    const keys = frontmatterKeys(text) || []
    const missing = REQUIRED.filter(k => !keys.includes(k))
    const idLine = text.match(/^id:\s*(\S+)/m)
    const id = idLine ? idLine[1] : null
    if (id !== path.basename(f, '.md')) missing.push(`id must equal filename (${f})`)
    const hash = crypto.createHash('sha256').update(shared + '\n' + text).digest('hex').slice(0, 12)
    return { id: id || f, file: path.join(set, f), hash, missing }
  })
}

if (require.main === module) {
  const args = process.argv.slice(2)
  const set = args.find(a => !a.startsWith('--')) || 'agents-101'
  const rows = load(set)
  if (args.includes('--json')) console.log(JSON.stringify(rows, null, 2))
  else for (const r of rows) console.log(`${r.id.padEnd(18)} ${r.hash}${r.missing.length ? '  MISSING: ' + r.missing.join(', ') : ''}`)
  process.exit(rows.some(r => r.missing.length) ? 1 : 0)
}

module.exports = { load, REQUIRED }
