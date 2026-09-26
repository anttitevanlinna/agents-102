#!/usr/bin/env node
// site/404.html + site/index.html send old marketing paths to bosser.consulting/training/
// (moved there 1:1); /clients/* never redirects — a mistyped workbook link is a plain 404.
'use strict'
const assert = require('node:assert')
const fs = require('node:fs')
const path = require('node:path')
const site = path.join(__dirname, '..', 'site')
const src = fs.readFileSync(path.join(site, '404.html'), 'utf8')
const m = src.match(/function target\(p, q\) \{[\s\S]*?\n\}/)
assert.ok(m, '404.html defines target(p, q)')
const target = new Function(`${m[0]}; return target`)()
const T = 'https://bosser.consulting/training'
const cases = [
  ['/', '', `${T}/`],
  ['/index.html', '', `${T}/index.html`],
  ['/article.html', '?slug=spillover', `${T}/article.html?slug=spillover`],
  ['/check/', '', `${T}/check/`],
  ['/readiness/', '?x=1', `${T}/readiness/?x=1`],
  ['/curriculum/', '', `${T}/curriculum/`],
  ['/wardley-saas.html', '', `${T}/wardley-saas.html`],
  ['/some/unknown/page', '', `${T}/`],
  ['/clients/acme/typo.html', '', null],
  ['/clients/', '', null],
]
for (const [p, q, want] of cases) assert.strictEqual(target(p, q), want, `${p}${q}`)
const idx = fs.readFileSync(path.join(site, 'index.html'), 'utf8')
assert.match(idx, /bosser\.consulting\/training\//, 'index.html redirects to the training area')
for (const gone of ['article.html', 'style.css', 'check', 'readiness', 'copy.md', 'animation.js'])
  assert.ok(!fs.existsSync(path.join(site, gone)), `${gone} moved out of site/`)
console.log(`redirect-404: ${cases.length + 2} passed`)
