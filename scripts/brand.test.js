#!/usr/bin/env node
// AGENTS_BRAND_DIR: a customer-owned folder with brand.css and/or logo.svg|png.
// The workbook build appends brand.css after our CSS and puts the logo on the
// covers. Nothing in this repo names the customer; unset → no trace.
'use strict'
const assert = require('node:assert')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const { execFileSync } = require('node:child_process')

const REPO = path.resolve(__dirname, '..')
const SLUG = 'vip-brandtest'                       // vip-* is gitignored
const OUT = path.join(REPO, 'site/clients', SLUG)
const B = fs.mkdtempSync(path.join(os.tmpdir(), 'brand-'))
fs.writeFileSync(path.join(B, 'brand.css'), ':root { --brand-test: #123456; }\n')
fs.writeFileSync(path.join(B, 'logo.svg'), '<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10"><rect width="10" height="10"/></svg>')

const build = env => {
  fs.rmSync(OUT, { recursive: true, force: true })
  const e = { ...process.env, ...env }; if (!env.AGENTS_BRAND_DIR) delete e.AGENTS_BRAND_DIR
  execFileSync('node', ['scripts/build-workbook.js', SLUG, 'claude-basics'], { cwd: REPO, env: e, stdio: 'pipe' })
  return { wb: fs.readFileSync(path.join(OUT, 'claude-basics/index.html'), 'utf8'), hub: fs.readFileSync(path.join(OUT, 'index.html'), 'utf8') }
}
try {
  const plain = build({})
  for (const h of [plain.wb, plain.hub]) {
    assert.ok(!h.includes('data-brand'), 'unset → no brand style')
    assert.ok(!h.includes('<img class="brand-logo"'), 'unset → no logo')
  }
  const branded = build({ AGENTS_BRAND_DIR: B })
  for (const [name, h] of Object.entries(branded)) {
    assert.ok(h.includes('--brand-test: #123456'), `${name}: brand.css inlined`)
    assert.ok(/<img class="brand-logo" src="data:image\/svg\+xml;base64,/.test(h), `${name}: logo on the cover`)
  }
  // Brand CSS comes after every other stylesheet, so it wins the cascade.
  const wb = branded.wb
  assert.strictEqual(wb.indexOf('<style', wb.indexOf('<style data-brand>') + 1), -1, 'no stylesheet after brand.css')
  console.log('brand: unset leaves no trace; set inlines brand.css last and the logo on covers')
} finally {
  fs.rmSync(OUT, { recursive: true, force: true })
  fs.rmSync(B, { recursive: true, force: true })
}
