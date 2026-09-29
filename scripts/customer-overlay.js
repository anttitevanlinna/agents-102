'use strict'
// Customer overlay (AGENTS_OVERLAY_DIR): a customer-owned folder holding
// overlay.json and the customer's own lectures/<slug>.md. The contract, per
// training key in the TRAININGS registry:
//
//   { "<training>": { "label": "...", "lede": "...",
//       "lectures": [{ "slug": "house-rules", "module": "<module slug>",
//                      "after": "exercises/<slug>" | "lectures/<slug>" }] } }
//
// label/lede replace the registry's; each lecture is inserted as an include
// link right after the named include in the named module, titled from its own
// H1. Unknown keys, trainings, modules, anchors, missing files and slugs that
// shadow a vendor lecture all throw: a customer change either applies exactly
// or the build stops.
const fs = require('node:fs')
const path = require('node:path')

const TRAINING_KEYS = new Set(['label', 'lede', 'lectures'])
const LECTURE_KEYS = new Set(['slug', 'module', 'after'])
const SLUG_RE = /^[a-z0-9-]+$/
const ANCHOR_RE = /^(exercises|lectures)\/[a-z0-9-]+$/

const EMPTY = { dir: null, labels: {}, inserts: {}, lecturePath: () => null }

function onlyKeys(obj, allowed, where) {
  for (const k of Object.keys(obj)) if (!allowed.has(k)) throw new Error(`overlay: unknown key "${k}" in ${where}`)
}

function includeLine(md, anchor) {
  return md.split('\n').find(l => new RegExp(`^\\[[^\\]]+\\]\\(${anchor}\\.md\\)[ \\t]*$`).test(l))
}

// trainings: the TRAININGS registry. readModule(training, module) → module
// source (for anchor checks). vendorLecture(slug) → true when the vendor tree
// already has lectures/<slug>.md.
function loadOverlay(dir, { trainings, readModule, vendorLecture }) {
  if (!dir) return EMPTY
  const file = path.join(dir, 'overlay.json')
  if (!fs.existsSync(file)) throw new Error(`overlay: ${file} not found`)
  const spec = JSON.parse(fs.readFileSync(file, 'utf8'))
  const labels = {}, inserts = {}, lectures = new Map()
  for (const [tk, entry] of Object.entries(spec)) {
    const reg = trainings[tk]
    if (!reg) throw new Error(`overlay: unknown training "${tk}"`)
    onlyKeys(entry, TRAINING_KEYS, tk)
    if (entry.label !== undefined || entry.lede !== undefined) {
      labels[tk] = {}
      if (entry.label !== undefined) labels[tk].label = String(entry.label)
      if (entry.lede !== undefined) labels[tk].lede = String(entry.lede)
    }
    const contentKey = reg.contentKey || tk
    const modules = new Set((reg.modules || (trainings[contentKey] || {}).modules || []).map(m => m.slug))
    for (const [i, lec] of (entry.lectures || []).entries()) {
      const where = `${tk}.lectures[${i}]`
      onlyKeys(lec, LECTURE_KEYS, where)
      if (!SLUG_RE.test(lec.slug || '')) throw new Error(`overlay: ${where} slug must match ${SLUG_RE}`)
      if (!modules.has(lec.module)) throw new Error(`overlay: ${where} module "${lec.module}" is not in ${tk}`)
      if (!ANCHOR_RE.test(lec.after || '') || !includeLine(readModule(contentKey, lec.module) || '', lec.after))
        throw new Error(`overlay: ${where} anchor "${lec.after}" is not an include in ${tk}/${lec.module}`)
      if (vendorLecture(lec.slug)) throw new Error(`overlay: ${where} "${lec.slug}" collides with a vendor lecture`)
      const abs = path.join(dir, 'lectures', lec.slug + '.md')
      if (!fs.existsSync(abs)) throw new Error(`overlay: ${where} lectures/${lec.slug}.md not found in ${dir}`)
      const h1 = (fs.readFileSync(abs, 'utf8').match(/^# (.+)$/m) || [])[1]
      if (!h1) throw new Error(`overlay: lectures/${lec.slug}.md has no H1 to title its include`)
      lectures.set(lec.slug, abs)
      const key = `${contentKey}/${lec.module}`
      ;(inserts[key] = inserts[key] || []).push({ after: lec.after, link: `[Lecture: ${h1.trim()}](lectures/${lec.slug}.md)` })
    }
  }
  return { dir, labels, inserts, lecturePath: slug => lectures.get(slug) || null }
}

// Insert each customer lecture link as its own paragraph after its anchor.
// Several lectures on one anchor keep overlay.json order.
function applyOverlayIncludes(md, contentKey, moduleSlug, overlay) {
  const list = overlay.inserts[`${contentKey}/${moduleSlug}`]
  if (!list) return md
  const byAnchor = new Map()
  for (const ins of list) byAnchor.set(ins.after, [...(byAnchor.get(ins.after) || []), ins.link])
  for (const [anchor, links] of byAnchor) {
    const line = includeLine(md, anchor)
    if (!line) throw new Error(`overlay: anchor "${anchor}" vanished from ${contentKey}/${moduleSlug}`)
    md = md.replace(line, [line, ...links].join('\n\n'))
  }
  return md
}

module.exports = { loadOverlay, applyOverlayIncludes }
