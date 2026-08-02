#!/usr/bin/env node
// scan-stale-classes v3 — per-CLASS staleness via diff-region → judge-class routing.
// Implements the invalidation matrix from curriculum-pre-ship-audit §2 degrade rules
// (v2 bash scanner invalidated every pinned class on any body edit — over-broad).
//
// Routing (changed line → classes invalidated):
//   any body line            → writing, slides (slides exempt: fence interiors, maintainer)
//   fence interior/delimiter → technical only
//   ## heading               → + story, pedagogy
//   opener (pre-first-##) / last-## section → + story
//   Big Idea section         → + strategy, story
//   Key Concepts / What You'll Learn / Connections → + strategy
//   Bridge / Homework / Next / Plug Points / Prework section → + pedagogy, story
//   {{prompt:key}} line      → + behavior, technical, pedagogy
//   URL / [checked: stamp    → + technical
//   **Time line              → + pedagogy
//   >15 changed body lines   → + story, pedagogy (bulk rewrite shifts arc + architecture)
//   behavior extra: any consumed curriculum/prompts/<key>.md changed since pin → behavior
// Known under-detection: prose-only platform-capability claim edits won't re-fire
// technical. Backstop = periodic full-corpus pass.
//
// Modes:
//   --filter <items.json>  filter an existing re-eval item list (classes arrays pruned;
//                          items kept even when empty — stable module-set downstream)
//   --files <f.md ...>     full scan: emit items for stale/REVISE/never-judged classes
//   [--repo <path>]        default cwd
// stdout = items JSON; stderr = per-file table.
'use strict'
const { execFileSync } = require('node:child_process')
const fs = require('node:fs')
const path = require('node:path')

const CLASSES = ['writing', 'story', 'technical', 'behavior', 'pedagogy', 'strategy', 'slides']
const BULK_BODY_LINES = 15

/*
 * `added` / `removedAt` carry the lines that actually CHANGED, in new-file
 * numbering. The header alone is not enough: git pads each hunk with up to 3
 * unchanged context lines, and `<!-- maintainer -->` sits directly after the
 * last body line, so walking the range made every maintainer note look like a
 * body edit and staled writing + slides on bookkeeping. A staleness signal that
 * fires on bookkeeping stops being believed.
 *
 * `+++ b/file` also starts with `+`; it is always above the first `@@`, so the
 * `!cur` guard drops it. Removals are anchored at the new-file position they
 * vacated — the same proxy the pure-deletion branch already uses.
 */
function parseHunks(diffText) {
  const hunks = []
  const re = /^@@ -(\d+)(?:,(\d+))? \+(\d+)(?:,(\d+))? @@/
  let cur = null
  let newLine = 0
  for (const line of diffText.split('\n')) {
    const m = re.exec(line)
    if (m) {
      cur = {
        oldStart: +m[1], oldLen: m[2] === undefined ? 1 : +m[2],
        start: +m[3], len: m[4] === undefined ? 1 : +m[4],
        added: [], removedAt: [],
      }
      hunks.push(cur)
      newLine = cur.start
      continue
    }
    if (!cur) continue
    if (line.startsWith('\\')) continue          // "\ No newline at end of file"
    if (line.startsWith('+')) { cur.added.push(newLine); newLine++ }
    else if (line.startsWith('-')) cur.removedAt.push(newLine)
    else newLine++                                // context
  }
  return hunks
}

const SECTION_TAGS = [
  { re: /^big idea/, tags: ['strategy', 'story'] },
  { re: /^(key concepts|what you.{0,3}ll learn|connections)/, tags: ['strategy'] },
  { re: /^(bridge|homework|next|plug points|prework)/, tags: ['pedagogy', 'story'] },
]

// Per 1-indexed-line metadata (returned 0-indexed array).
function buildLineMeta(text) {
  const lines = text.split('\n')
  const meta = lines.map(t => ({ text: t, region: 'body', heading: false, section: null, opener: false, close: false }))

  let i = 0
  if (lines[0] === '---') { // frontmatter
    meta[0].region = 'frontmatter'
    for (i = 1; i < lines.length; i++) { meta[i].region = 'frontmatter'; if (lines[i] === '---') { i++; break } }
  }

  let marker = lines.findIndex(l => l.includes('<!-- maintainer -->'))
  if (marker === -1) marker = lines.length
  for (let k = marker; k < lines.length; k++) meta[k].region = 'maintainer'

  let inFence = false
  let section = null
  let firstHH = -1
  let lastHH = -1
  for (let k = i; k < marker; k++) {
    const t = lines[k]
    if (/^\s*```/.test(t)) { meta[k].region = 'fence'; inFence = !inFence; continue }
    if (inFence) { meta[k].region = 'fence'; continue }
    if (/^#{2,}\s/.test(t)) {
      meta[k].heading = true
      if (/^##\s/.test(t)) {
        section = t.replace(/^#+\s*/, '').trim().toLowerCase()
        if (firstHH === -1) firstHH = k
        lastHH = k
      }
    }
    meta[k].section = section
  }
  for (let k = i; k < marker; k++) {
    if (meta[k].region !== 'body' && !meta[k].heading) continue
    if (firstHH === -1 || k < firstHH) meta[k].opener = true
    if (lastHH !== -1 && k >= lastHH) meta[k].close = true
  }
  return meta
}

// Tag one line into `tags`; returns 1 if it counts as a changed body line.
function tagLine(m, tags) {
  if (!m || m.region === 'maintainer' || m.region === 'frontmatter') return 0
  if (m.region === 'fence') { tags.add('technical'); return 0 }
  tags.add('writing'); tags.add('slides')
  if (m.heading) { tags.add('story'); tags.add('pedagogy') }
  if (m.opener || m.close) tags.add('story')
  if (m.section) for (const s of SECTION_TAGS) if (s.re.test(m.section)) s.tags.forEach(t => tags.add(t))
  if (/\{\{prompt:/.test(m.text)) { tags.add('behavior'); tags.add('technical'); tags.add('pedagogy') }
  if (/https?:\/\/|\[checked:/.test(m.text)) tags.add('technical')
  if (/\*\*Time/.test(m.text)) tags.add('pedagogy')
  return 1
}

function changeTags(meta, hunks) {
  const tags = new Set()
  let changedBody = 0
  for (const h of hunks) {
    if (h.len > 0) {
      // Hand-built hunks (tests, callers) carry no `added`; fall back to the range.
      const explicit = h.added ? h.added.concat(h.removedAt || []) : null
      const lines = explicit || Array.from({ length: h.len }, (_, k) => h.start + k)
      for (const L of lines) changedBody += tagLine(meta[Math.min(L, meta.length) - 1], tags)
    } else {
      // pure deletion: anchor on surrounding lines; count removed lines if anchored in body
      const anchors = [Math.max(1, h.start), Math.min(meta.length, h.start + 1)]
      let inBody = 0
      for (const a of anchors) inBody += tagLine(meta[a - 1], tags)
      if (inBody > 0) changedBody += h.oldLen
    }
  }
  if (changedBody > BULK_BODY_LINES) { tags.add('story'); tags.add('pedagogy') }
  return { tags, changedBody }
}

function extractPins(text) {
  const top = text.split('\n').find(l => /^\*\*Quality:\*\*/.test(l)) || ''
  const pins = {}
  for (const cls of CLASSES) {
    const m = new RegExp(`${cls}@([A-Za-z0-9]+)`).exec(top)
    if (m) pins[cls] = m[1]
  }
  return pins
}

function judgesRow(text) {
  const lines = text.split('\n')
  const qi = lines.findIndex(l => /^\*\*Quality:\*\*/.test(l))
  if (qi === -1) return ''
  for (let k = qi + 1; k < lines.length && lines[k].trim() !== ''; k++) {
    if (/^-\s*judges/.test(lines[k])) return lines[k]
  }
  return ''
}

function promptKeys(text) {
  return [...text.matchAll(/\{\{prompt:([a-z0-9-]+)\}\}/g)].map(m => m[1])
}

// items: [{file, type, slug, instanceSlug, classes}]; io: {readFile, gitDiff, validSha}
function filterItems(items, io) {
  const out = []
  const report = []
  for (const item of items) {
    const text = io.readFile(item.file)
    if (text === null) { out.push(item); report.push({ file: item.file, kept: item.classes.map(c => ({ cls: c, reason: 'unreadable' })), pruned: [] }); continue }
    const meta = buildLineMeta(text)
    const pins = extractPins(text)
    const keys = promptKeys(text)
    const cache = {}
    const kept = []
    const pruned = []
    for (const cls of item.classes) {
      const sha = pins[cls]
      if (!sha) { kept.push({ cls, reason: 'unpinned' }); continue }
      if (!io.validSha(sha)) { kept.push({ cls, reason: 'bad-sha' }); continue }
      if (!(sha in cache)) cache[sha] = changeTags(meta, parseHunks(io.gitDiff(sha, item.file))).tags
      if (cache[sha].has(cls)) { kept.push({ cls, reason: 'diff-region' }); continue }
      if (cls === 'behavior' && keys.some(k => io.gitDiff(sha, `curriculum/prompts/${k}.md`).trim() !== '')) {
        kept.push({ cls, reason: 'registry-prompt' }); continue
      }
      pruned.push(cls)
    }
    out.push({ ...item, classes: kept.map(k => k.cls) })
    report.push({ file: item.file, kept, pruned })
  }
  return { items: out, report }
}

// Full scan: derive classes needing (re-)judge for one file, v2-compatible for unpinned.
function scanFile(relpath, io) {
  const text = io.readFile(relpath)
  if (text === null) return null
  const pins = extractPins(text)
  const row = judgesRow(text)
  const meta = buildLineMeta(text)
  const cache = {}
  const classes = []
  const detail = {}
  for (const cls of CLASSES) {
    const sha = pins[cls]
    if (sha) {
      if (!io.validSha(sha)) { classes.push(cls); detail[cls] = 'bad-sha'; continue }
      if (!(sha in cache)) cache[sha] = changeTags(meta, parseHunks(io.gitDiff(sha, relpath))).tags
      let stale = cache[sha].has(cls)
      if (!stale && cls === 'behavior') stale = promptKeys(text).some(k => io.gitDiff(sha, `curriculum/prompts/${k}.md`).trim() !== '')
      if (stale) { classes.push(cls); detail[cls] = 'diff-region' }
    } else if (new RegExp(`(^|, )${cls} REVISE`).test(row)) {
      classes.push(cls); detail[cls] = 'revise'
    } else if (!new RegExp(`(^|, )${cls} (PASS|grandfathered|N/A)`).test(row)) {
      classes.push(cls); detail[cls] = 'never'
    }
  }
  return { classes, detail }
}

function gitIo(repo) {
  return {
    readFile: p => { try { return fs.readFileSync(path.join(repo, p), 'utf8') } catch { return null } },
    gitDiff: (sha, p) => { try { return execFileSync('git', ['diff', sha, '--', p], { cwd: repo, encoding: 'utf8', maxBuffer: 32 * 1024 * 1024 }) } catch { return '' } },
    validSha: sha => { try { execFileSync('git', ['rev-parse', '--verify', '-q', `${sha}^{commit}`], { cwd: repo, stdio: 'ignore' }); return true } catch { return false } },
  }
}

function typeOf(relpath) {
  if (relpath.includes('/exercises/')) return 'exercise'
  if (relpath.includes('/lectures/')) return 'lecture'
  return 'module'
}

function main(argv) {
  const repoIdx = argv.indexOf('--repo')
  const repo = repoIdx !== -1 ? argv[repoIdx + 1] : process.cwd()
  const io = gitIo(repo)

  if (argv.includes('--filter')) {
    const itemsPath = argv[argv.indexOf('--filter') + 1]
    const items = JSON.parse(fs.readFileSync(itemsPath, 'utf8'))
    const { items: out, report } = filterItems(items, io)
    for (const r of report) {
      const k = r.kept.map(x => `${x.cls}(${x.reason})`).join(' ') || '-'
      const p = r.pruned.join(' ') || '-'
      process.stderr.write(`${r.file}\n  kept:   ${k}\n  pruned: ${p}\n`)
    }
    const before = items.reduce((a, i) => a + i.classes.length, 0)
    const after = out.reduce((a, i) => a + i.classes.length, 0)
    process.stderr.write(`\npairs: ${before} -> ${after} (pruned ${before - after})\n`)
    process.stdout.write(JSON.stringify(out, null, 1) + '\n')
    return
  }

  if (argv.includes('--files')) {
    const files = argv.slice(argv.indexOf('--files') + 1).filter(a => !a.startsWith('--'))
    const out = []
    for (const f of files) {
      const rel = path.isAbsolute(f) ? path.relative(repo, f) : f
      const r = scanFile(rel, io)
      if (!r) { process.stderr.write(`${rel}\tUNREADABLE\n`); continue }
      if (r.classes.length === 0) continue
      const type = typeOf(rel)
      const slug = path.basename(rel, '.md')
      out.push({ file: rel, type, slug, instanceSlug: `ae101--${type}--${slug}`, classes: r.classes })
      process.stderr.write(`${rel}\t${r.classes.map(c => `${c}(${r.detail[c]})`).join(' ')}\n`)
    }
    process.stdout.write(JSON.stringify(out, null, 1) + '\n')
    return
  }

  process.stderr.write('usage: scan-stale-classes.js [--repo <path>] --filter <items.json> | --files <f.md ...>\n')
  process.exit(2)
}

module.exports = { parseHunks, buildLineMeta, changeTags, extractPins, judgesRow, promptKeys, filterItems, scanFile, CLASSES }

if (require.main === module) main(process.argv.slice(2))
