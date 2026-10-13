'use strict'
// Payload tarballs ship to customers beside their workbooks, so unchanged
// inputs must give byte-identical archives: a rebuild that changes nothing must
// show nothing to deploy. Both scripts stage under mktemp, which gives every
// file fresh mtimes, so each normalises them and suppresses gzip's timestamp.
//
// The Agents 101 starter is customer-independent: its embedded theory handbook
// must not pick up the caller's AGENTS_BRAND_DIR (whose copied assets would
// not exist inside the archive anyway).
const { test } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const crypto = require('node:crypto')
const { execFileSync } = require('node:child_process')

const REPO = path.resolve(__dirname, '..')
const sha = f => crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex')

function build(script, env = {}) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'tarball-repro-'))
  const out = path.join(dir, 'out.tar.gz')
  const e = { ...process.env, ...env }
  if (!env.AGENTS_BRAND_DIR) delete e.AGENTS_BRAND_DIR
  execFileSync('bash', [script, out], { cwd: REPO, env: e, stdio: 'pipe' })
  const h = sha(out)
  fs.rmSync(dir, { recursive: true, force: true })
  return h
}

test('the AE101 content tarball is byte-identical across builds', () => {
  assert.equal(build('scripts/build-ae101-content-tarball.sh'), build('scripts/build-ae101-content-tarball.sh'))
})

test('the Agents 101 starter is byte-identical across builds and ignores a customer brand', () => {
  const b = fs.mkdtempSync(path.join(os.tmpdir(), 'tarball-brand-'))
  fs.writeFileSync(path.join(b, 'brand.css'), ':root { --brand-test: #123456; }\n')
  try {
    const plain = build('scripts/build-agents-101-starter-tarball.sh')
    assert.equal(build('scripts/build-agents-101-starter-tarball.sh'), plain, 'rebuild')
    assert.equal(build('scripts/build-agents-101-starter-tarball.sh', { AGENTS_BRAND_DIR: b }), plain, 'with AGENTS_BRAND_DIR set')
  } finally { fs.rmSync(b, { recursive: true, force: true }) }
})
