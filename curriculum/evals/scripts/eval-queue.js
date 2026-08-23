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
// A shared file no training links, or two do under --training all, is UNOWNED:
// reported, never guessed at. An explicit --training resolves a multi-owner
// file when that training is one of its actual linkers (see trainingOf).
//
// Usage:
//   node curriculum/evals/scripts/eval-queue.js [--training ae101|agents-101|claude-basics|all]
//                                               [--reason never|diff-region|revise|bad-sha]
//                                               [--type module,exercise,lecture,supplementary,reference]
//                                               [--json] [--repo <path>]
// stdout = table, or items JSON with --json (same shape scan-stale-classes
// --files emits, so it feeds a sweep or `--filter` straight through).
// Scope axes (cross_module, voice_panel) print in their own sections below the
// pair tally. They fire at module-set and whole-file scope, so --reason and
// --json — which feed per-file judge dispatch — do not filter them.
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
// BEFORE saying anything to a student is not a judge surface, whatever it is
// named. The discriminator is what sits above the fence, not how far down the
// fence sits: every student surface carries a maintainer block eventually, and
// on a one-slide lecture that block starts on line 9. Reading a fixed-size head
// made file length stand in for audience and silently dropped short lectures
// out of the universe — unqueued, unjudged, and reported by sim-freshness as
// orphaned traces, which reads as "the file is gone".
const MAINTAINER_MARK = /^<!--\s*maintainer\s*-->/m

function isSurface(repo, rel) {
  if (NON_SURFACE.has(path.basename(rel))) return false
  let text
  try { text = fs.readFileSync(path.join(repo, rel), 'utf8') } catch { return false }
  const m = MAINTAINER_MARK.exec(text)
  if (!m) return true
  // Student body above the fence = a student surface. A lone `# Title` is not
  // body; a planning artefact opens on its title and goes straight to notes.
  const above = text.slice(0, m.index).split('\n')
    .filter(l => l.trim() && !/^#\s/.test(l))
  return above.length > 0
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
  const scope = []
  const unowned = []
  const unreadable = []
  for (const rel of buildUniverse(repo)) {
    const training = trainingOf(rel, findLinkers, want === 'all' ? null : want)
    if (!training) { unowned.push(rel); continue }
    if (want !== 'all' && training !== want) continue
    const r = scanFile(rel, io)
    if (!r) { unreadable.push(rel); continue }
    const type = typeOf(rel)
    const slug = path.basename(rel, '.md')
    // Scope classes are collected BEFORE the empty-classes skip: a file whose
    // seven pins are all clean is exactly the file whose cross_module row can
    // be stale, and skipping it here would hide that.
    if (r.extra.cross_module) {
      scope.push({ cls: 'cross_module', training, slug, file: rel, reason: r.extra.cross_module, detail: r.extraDetail.cross_module || null })
    }
    if (r.extra.voice_panel && training === 'ae101') {   // panel scope: AE101 only
      scope.push({ cls: 'voice_panel', training, slug, file: rel, reason: r.extra.voice_panel, detail: r.extraDetail.voice_panel || null })
    }
    if (r.classes.length === 0) continue
    items.push({
      file: rel, type, slug, training,
      instanceSlug: `${training}--${type}--${slug}`,
      classes: r.classes, detail: r.detail,
    })
  }
  return { items, scope, unowned, unreadable }
}

// Cross_module stamps every module in the set, so N modules owing one re-run
// print as N identical lines unless they are folded back into the set they
// name. Fold on (training, sha, set).
function renderScope(scope) {
  const out = []
  const cross = scope.filter(s => s.cls === 'cross_module')
  if (cross.length) {
    out.push('')
    out.push('CROSS-MODULE — module-set scope; fire once per SET, not per file:')
    const sets = new Map()
    const rowless = []
    for (const s of cross) {
      if (!s.detail || !s.detail.set) { rowless.push(s); continue }
      const key = `${s.training}|${s.detail.sha}|${s.detail.set.join(',')}`
      if (!sets.has(key)) sets.set(key, { ...s, drifted: new Set(s.detail.drifted || []), instances: [...(s.detail.instances || [])] })
      else {
        for (const d of s.detail.drifted || []) sets.get(key).drifted.add(d)
        sets.get(key).instances.push(...(s.detail.instances || []))
      }
    }
    for (const s of sets.values()) {
      const drift = [...s.drifted].map(f => path.basename(f, '.md')).join(', ')
      out.push(`  [${s.training}] set=[${s.detail.set.join(',')}] @${s.detail.sha}`)
      out.push(`      ${s.reason}${drift ? ` — moved since the pin: ${drift}` : ''}`)
      // The set name can be a union across seams and name no instance of its own.
      // Fire against the instances; they are the unit that exists on disk.
      const inst = [...new Set(s.instances || [])]
      out.push(inst.length
        ? `      re-fire: ${inst.join(', ')}`
        : `      re-fire: no instance named on the row — find it before firing`)
    }
    if (rowless.length) {
      const by = {}
      for (const s of rowless) (by[`${s.training}|${s.reason}`] ||= []).push(s.slug)
      for (const [k, slugs] of Object.entries(by)) {
        const [t, reason] = k.split('|')
        out.push(`  [${t}] ${reason} — no usable row on: ${slugs.join(', ')}`)
      }
    }
  }
  const panel = scope.filter(s => s.cls === 'voice_panel')
  if (panel.length) {
    const by = {}
    for (const s of panel) (by[s.reason] ||= []).push(s.slug)
    out.push('')
    out.push('VOICE PANEL — AE101 taste read (judges/voice-panel.md); findings never block:')
    for (const reason of ['finding', 'diff-region', 'bad-sha', 'unpinned', 'never']) {
      const slugs = by[reason]
      if (!slugs) continue
      // `never` is the whole unpaneled corpus — a count, not a wall of slugs.
      out.push(reason === 'never'
        ? `  never: ${slugs.length} files never paneled (fire per the spec's when-to-fire, not as a sweep)`
        : `  ${reason}: ${slugs.join(', ')}`)
    }
  }
  return out
}

const DISPLAY = { module: 'mod', exercise: 'exr', lecture: 'lec', supplementary: 'sup', reference: 'ref' }

function render(items, scope, unowned, unreadable, want, scanned) {
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
  out.push(`  scope reasons: set-drift = a member of the pinned set moved in its body · no-set = row names no set to diff · unpinned = state carries no sha · finding = a persona withheld its signature`)
  out.push(...renderScope(scope))
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
  const types = (arg('--type', null) || '').split(',').filter(Boolean)
  const io = makeIo(repo)

  let { items, scope, unowned, unreadable } = collect(repo, io, want)
  const scanned = buildUniverse(repo).length
  if (types.length) items = items.filter(it => types.includes(it.type))
  if (reason) {
    items = items
      .map(it => ({ ...it, classes: it.classes.filter(c => it.detail[c] === reason) }))
      .filter(it => it.classes.length > 0)
  }
  if (argv.includes('--json')) {
    process.stdout.write(JSON.stringify(items.map(({ detail, ...i }) => i), null, 1) + '\n')
    process.stderr.write(render(items, scope, unowned, unreadable, want, scanned) + '\n')
    return
  }
  process.stdout.write(render(items, scope, unowned, unreadable, want, scanned) + '\n')
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
