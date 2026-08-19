#!/usr/bin/env node
// eval-queue — "what still owes a judge?" in one command.
//
// scan-stale-classes.js answers that per file you already named. The naming was
// the manual step: status.sh knows the universe but only prints 4 of the 7
// classes and reads JSON instances (which lag the file's own Quality pins),
// while audit-eval-coverage.js counts rule×file holes, not judge runs. This
// walks the universe itself and hands every (file, class) pair still owing a
// judge to scanFile — the same routing the pre-ship audit trusts.
//
// Universe per training:
//   curriculum/trainings/<t>/*.md            modules (maintainer-only excluded)
//   curriculum/trainings/<t>/{supplementary,reference}/*.md
//   curriculum/{exercises,lectures}/*.md     shared pool, owned by whichever
//                                            training's modules link them
// A shared file no training links, or two do, is UNOWNED: reported, never
// guessed at — the instance prefix would be a coin flip (see trainingOf).
//
// Usage:
//   node curriculum/evals/scripts/eval-queue.js [--training ae101|agents-101|claude-basics|all]
//                                               [--reason never|diff-region|revise|bad-sha]
//                                               [--json] [--repo <path>]
// stdout = table, or items JSON with --json (same shape scan-stale-classes
// --files emits, so it feeds a sweep or `--filter` straight through).
// Exit 0 always — report tool, not a gate.
'use strict'
const fs = require('node:fs')
const path = require('node:path')
const { scanFile, typeOf, trainingOf, linkFinder, CLASSES } = require('./scan-stale-classes.js')

// Maintainer- and trainer-facing files that live in a training dir but are not
// student surfaces. trainer-modules/trainer-guide are built trainer pages
// (exempt from the student-facing hooks); timings is machine-read data;
// training-architecture and pre-cohort-todos are planning artefacts.
const NON_SURFACE = new Set([
  'pre-cohort-todos.md', 'trainer-guide.md', 'trainer-modules.md',
  'training-architecture.md', 'timings.md', 'README.md', 'CLAUDE.md',
])

// Second, content-derived guard: a file that declares itself maintainer-facing
// in its first lines is not a judge surface, whatever it is named.
const MAINTAINER_MARK = /^<!--\s*maintainer\s*-->/m

function isSurface(repo, rel) {
  if (NON_SURFACE.has(path.basename(rel))) return false
  let head
  try { head = fs.readFileSync(path.join(repo, rel), 'utf8').split('\n').slice(0, 12).join('\n') }
  catch { return false }
  return !MAINTAINER_MARK.test(head)
}

function mdFiles(repo, rel) {
  let entries
  try { entries = fs.readdirSync(path.join(repo, rel)) } catch { return [] }
  return entries.filter(f => f.endsWith('.md')).sort().map(f => `${rel}/${f}`)
}

function buildUniverse(repo) {
  const files = []
  const root = 'curriculum/trainings'
  let trainings = []
  try { trainings = fs.readdirSync(path.join(repo, root)).sort() } catch {}
  for (const t of trainings) {
    if (!fs.statSync(path.join(repo, root, t)).isDirectory()) continue
    files.push(...mdFiles(repo, `${root}/${t}`))
    files.push(...mdFiles(repo, `${root}/${t}/supplementary`))
    files.push(...mdFiles(repo, `${root}/${t}/reference`))
  }
  files.push(...mdFiles(repo, 'curriculum/exercises'))
  files.push(...mdFiles(repo, 'curriculum/lectures'))
  return files.filter(f => isSurface(repo, f))
}

function collect(repo, io, want) {
  const findLinkers = linkFinder(repo)
  const items = []
  const unowned = []
  const unreadable = []
  for (const rel of buildUniverse(repo)) {
    const training = trainingOf(rel, findLinkers)
    if (!training) { unowned.push(rel); continue }
    if (want !== 'all' && training !== want) continue
    const r = scanFile(rel, io)
    if (!r) { unreadable.push(rel); continue }
    if (r.classes.length === 0) continue
    const type = typeOf(rel)
    const slug = path.basename(rel, '.md')
    items.push({
      file: rel, type, slug, training,
      instanceSlug: `${training}--${type}--${slug}`,
      classes: r.classes, detail: r.detail,
    })
  }
  return { items, unowned, unreadable }
}

const DISPLAY = { module: 'mod', exercise: 'exr', lecture: 'lec', supplementary: 'sup', reference: 'ref' }

function render(items, unowned, unreadable, want, scanned) {
  const out = []
  out.push(`=== EVAL QUEUE — training: ${want} ===`)
  out.push('')
  if (items.length === 0) {
    out.push('  Nothing owes a judge. Every surface is pinned clean.')
  } else {
    for (const it of items) {
      const label = `[${DISPLAY[it.type] || it.type}] ${it.slug}`
      const cls = it.classes.map(c => `${c}(${it.detail[c]})`).join(' ')
      out.push(`${label.padEnd(46)}${cls}`)
    }
  }
  const pairs = items.reduce((a, i) => a + i.classes.length, 0)
  const byReason = {}
  const byClass = {}
  for (const it of items) {
    for (const c of it.classes) {
      byReason[it.detail[c]] = (byReason[it.detail[c]] || 0) + 1
      byClass[c] = (byClass[c] || 0) + 1
    }
  }
  const tally = o => Object.entries(o).sort((a, b) => b[1] - a[1]).map(([k, v]) => `${k} ${v}`).join(' · ') || '-'
  out.push('')
  out.push(`${scanned} surfaces scanned · ${items.length} owing · ${pairs} (file,class) pairs`)
  out.push(`  by reason: ${tally(byReason)}`)
  out.push(`  by class:  ${tally(byClass)}`)
  out.push(`  reasons: never = no PASS on the judges row · diff-region = body edit routed to this class since its pin · revise = last verdict REVISE · bad-sha = pin points at no commit`)
  if (unowned.length) {
    out.push('')
    out.push(`UNOWNED — shared file linked from 0 or 2+ trainings, training not guessable (${unowned.length}):`)
    for (const f of unowned) out.push(`  ${f}`)
  }
  if (unreadable.length) {
    out.push('')
    out.push(`UNREADABLE (${unreadable.length}): ${unreadable.join(' ')}`)
  }
  return out.join('\n')
}

function main(argv) {
  const arg = (flag, dflt) => { const i = argv.indexOf(flag); return i === -1 ? dflt : argv[i + 1] }
  const repo = path.resolve(arg('--repo', process.cwd()))
  const want = arg('--training', 'all')
  const reason = arg('--reason', null)
  const io = makeIo(repo)

  let { items, unowned, unreadable } = collect(repo, io, want)
  const scanned = buildUniverse(repo).length
  if (reason) {
    items = items
      .map(it => ({ ...it, classes: it.classes.filter(c => it.detail[c] === reason) }))
      .filter(it => it.classes.length > 0)
  }
  if (argv.includes('--json')) {
    process.stdout.write(JSON.stringify(items.map(({ detail, ...i }) => i), null, 1) + '\n')
    process.stderr.write(render(items, unowned, unreadable, want, scanned) + '\n')
    return
  }
  process.stdout.write(render(items, unowned, unreadable, want, scanned) + '\n')
}

// scan-stale-classes keeps gitIo private; mirror it rather than fork the file.
const { execFileSync } = require('node:child_process')
function makeIo(repo) {
  return {
    readFile: p => { try { return fs.readFileSync(path.join(repo, p), 'utf8') } catch { return null } },
    gitDiff: (sha, p) => { try { return execFileSync('git', ['diff', sha, '--', p], { cwd: repo, encoding: 'utf8', maxBuffer: 32 * 1024 * 1024 }) } catch { return '' } },
    validSha: sha => { try { execFileSync('git', ['rev-parse', '--verify', '-q', `${sha}^{commit}`], { cwd: repo, stdio: 'ignore' }); return true } catch { return false } },
  }
}

module.exports = { buildUniverse, isSurface, collect, CLASSES }

if (require.main === module) main(process.argv.slice(2))
