#!/usr/bin/env node
'use strict'
/*
 * hoist-quality — put the **Quality:** block first in the maintainer block.
 *
 * `curriculum/quality-format.md` § Position: the Quality line opens the
 * maintainer block, its `- ` rows run unbroken beneath it, and every note
 * follows. The parser is the reason — `scan-stale-classes.js:blockRow` reads
 * only the unbroken run of rows under the Quality line, so a note that lands
 * between them takes cross_module and voice_panel out of the queue's sight
 * with no error. AE101 accreted the other way; this converges it.
 *
 * Moves exactly one thing: the Quality line plus the contiguous `- ` rows
 * under it. Every other byte of the file stays where it is, blank lines
 * collapsed to one at the seam it left and one at the seam it enters.
 *
 *   node curriculum/evals/scripts/hoist-quality.js [--write] <file>...
 *   node curriculum/evals/scripts/hoist-quality.js [--write] --training ae101
 *
 * Default is check: prints `deep <file>` for each block not in position and
 * exits 1 if any. `--write` rewrites those files and exits 0.
 */
const fs = require('node:fs')
const path = require('node:path')

const FENCE = /^<!--\s*maintainer\s*-->\s*$/
const QUALITY = /^\*\*Quality:\*\*/
const ROW = /^- /

function hoist(text) {
  const trailing = text.endsWith('\n')
  const lines = text.split('\n')
  const m = lines.findIndex(l => FENCE.test(l))
  if (m === -1) return { text, moved: false, reason: 'no-fence' }
  let q = -1
  for (let i = m + 1; i < lines.length; i++) if (QUALITY.test(lines[i])) { q = i; break }
  if (q === -1) return { text, moved: false, reason: 'no-quality' }
  let end = q + 1
  while (end < lines.length && ROW.test(lines[end])) end++
  let first = m + 1
  while (first < lines.length && lines[first].trim() === '') first++
  if (first === q) return { text, moved: false, reason: 'in-position' }

  const block = lines.slice(q, end)
  const before = lines.slice(0, q)
  const after = lines.slice(end)
  while (before.length && before[before.length - 1].trim() === '') before.pop()
  while (after.length && after[0].trim() === '') after.shift()
  const rest = after.length ? before.concat([''], after) : before

  const head = rest.slice(0, m + 1)
  const tail = rest.slice(m + 1)
  while (tail.length && tail[0].trim() === '') tail.shift()
  const out = tail.length ? head.concat([''], block, [''], tail) : head.concat([''], block)
  let result = out.join('\n')
  if (trailing && !result.endsWith('\n')) result += '\n'
  return { text: result, moved: true, reason: 'hoisted' }
}

function targets(argv, repo) {
  const i = argv.indexOf('--training')
  if (i === -1) return argv.filter(a => !a.startsWith('--'))
  const want = argv[i + 1]
  const { buildUniverse } = require('./eval-queue.js')
  const { linkFinder, trainingOf } = require('./scan-stale-classes.js')
  const find = linkFinder(repo)
  if (want === 'all') return buildUniverse(repo).filter(rel => trainingOf(rel, find, null))
  return buildUniverse(repo).filter(rel => trainingOf(rel, find, want) === want)
}

function main(argv) {
  const repo = process.cwd()
  const write = argv.includes('--write')
  const files = targets(argv.filter(a => a !== '--write'), repo)
  if (!files.length) { process.stderr.write('usage: hoist-quality.js [--write] <file>... | --training <t>\n'); process.exit(2) }
  let deep = 0
  for (const rel of files) {
    const abs = path.resolve(repo, rel)
    let text
    try { text = fs.readFileSync(abs, 'utf8') } catch { continue }
    const r = hoist(text)
    if (!r.moved) continue
    deep++
    if (write) { fs.writeFileSync(abs, r.text); console.log(`hoisted ${rel}`) } else console.log(`deep ${rel}`)
  }
  if (!write && deep) { console.log(`${deep} block(s) not in position — rerun with --write`); process.exit(1) }
  if (!write) console.log('every Quality block opens its maintainer block')
}

module.exports = { hoist }
if (require.main === module) main(process.argv.slice(2))
