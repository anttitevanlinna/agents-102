'use strict'
// Customer overlay (AGENTS_OVERLAY_DIR): a customer-owned folder that mirrors
// curriculum/. At build time a file there wins over the vendor file at the same
// path, and a file with no vendor twin is the customer's own (a new lecture, a
// new reference page). trainings/<key>/training.json overrides the registry's
// label and lede, the one piece of a training that is not a file.
//
// A shadow is a fork of the vendor file. overlay.lock.json records, per shadow,
// the vendor file's content hash and commit when the fork was first built; a
// later build reports every shadow whose vendor file has moved since, with the
// commit to diff from. To take the vendor's change: merge it into the shadow,
// delete that lock entry, rebuild.
//
// Fails closed: a path the build would never read (a typo, an unknown training,
// a non-.md file) stops the build instead of silently doing nothing.
const crypto = require('node:crypto')
const fs = require('node:fs')
const path = require('node:path')
const { execFileSync } = require('node:child_process')

const LOCK = 'overlay.lock.json'
const TRAINING_JSON_KEYS = new Set(['label', 'lede'])
const sha = buf => crypto.createHash('sha256').update(buf).digest('hex')

function walk(dir, rel = '') {
  return fs.readdirSync(path.join(dir, rel), { withFileTypes: true }).flatMap(e => {
    const r = rel ? `${rel}/${e.name}` : e.name
    return e.isDirectory() ? (e.name === '.git' ? [] : walk(dir, r)) : [r]
  })
}

function vendorCommit(root) {
  try { return execFileSync('git', ['rev-parse', 'HEAD'], { cwd: root, stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim() } catch { return null }
}

function loadOverlay(dir, { root, trainings }) {
  const vendor = rel => path.join(root, 'curriculum', rel)
  if (!dir) return { dir: null, labels: {}, recorded: [], drift: [], resolve: vendor }

  const shadows = new Set(), labels = {}
  for (const rel of walk(dir)) {
    if (rel === LOCK || rel.split('/').some(p => p.startsWith('.'))) continue
    const parts = rel.split('/')
    const isMd = rel.endsWith('.md')
    if (parts[0] === 'trainings') {
      if (!trainings[parts[1]]) throw new Error(`overlay: unknown training "${parts[1]}" (${rel})`)
      if (parts.length === 3 && parts[2] === 'training.json') {
        const spec = JSON.parse(fs.readFileSync(path.join(dir, rel), 'utf8'))
        for (const k of Object.keys(spec)) if (!TRAINING_JSON_KEYS.has(k)) throw new Error(`overlay: ${rel}: training.json: unknown key "${k}"`)
        labels[parts[1]] = spec
        continue
      }
      if (isMd && parts.length >= 3) { shadows.add(rel); continue }
    } else if ((parts[0] === 'lectures' || parts[0] === 'exercises') && parts.length === 2 && isMd) {
      shadows.add(rel); continue
    }
    throw new Error(`overlay: ${rel} is not a curriculum path the build reads`)
  }

  const lockPath = path.join(dir, LOCK)
  const lock = fs.existsSync(lockPath) ? JSON.parse(fs.readFileSync(lockPath, 'utf8')) : {}
  const next = {}, recorded = [], drift = []
  let commit
  for (const rel of [...shadows].sort()) {
    if (!fs.existsSync(vendor(rel))) continue            // customer-only file: nothing to drift from
    const now = sha(fs.readFileSync(vendor(rel)))
    if (!lock[rel]) {
      if (commit === undefined) commit = vendorCommit(root)
      next[rel] = { sha256: now, commit }
      recorded.push(rel)
    } else {
      next[rel] = lock[rel]
      if (lock[rel].sha256 !== now) drift.push({ rel, since: lock[rel].commit })
    }
  }
  if (JSON.stringify(next) !== JSON.stringify(lock)) fs.writeFileSync(lockPath, JSON.stringify(next, null, 2) + '\n')

  return {
    dir, labels, recorded, drift,
    resolve: rel => (shadows.has(rel) ? path.join(dir, rel) : vendor(rel)),
  }
}

module.exports = { loadOverlay }
