'use strict'
// The customer brand contract (AGENTS_BRAND_DIR), across every page a build
// writes: hub, workbook, trainer pages, theory handbook, exercises workbook.
//
//   brand.css       appended after every stylesheet; `url(assets/...)` resolves
//                   to the copied asset folder from wherever the page sits
//   logo.svg|png    on every cover, and once as `--brand-logo` so customer CSS
//                   can place the same mark anywhere (nav, Slides rail) without
//                   a second copy of it
//   customer.json   display identity: name, logoAlt, hubHeading, hubLede. The
//                   folder slug stays a path and URL segment, never a name
//   assets/         copied to <customer>/brand-assets/ beside the pages
//
// Unset → none of it, and the vendor's own identity (Bosser) stays on covers.
const { test } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const { execFileSync } = require('node:child_process')

const REPO = path.resolve(__dirname, '..')
const SLUG = 'fjord-test'
const TRAINING = 'agents-101'
const NAME = 'Fjord Example Bank'

function brandDir({ identity = true } = {}) {
  const b = fs.mkdtempSync(path.join(os.tmpdir(), 'brand-contract-'))
  fs.mkdirSync(path.join(b, 'assets/img'), { recursive: true })
  fs.writeFileSync(path.join(b, 'assets/t.woff2'), Buffer.from([0x77, 0x4f, 0x46, 0x32]))
  fs.writeFileSync(path.join(b, 'assets/img/bg.png'), Buffer.from([0x89, 0x50, 0x4e, 0x47]))
  fs.writeFileSync(path.join(b, 'brand.css'), [
    ':root { --brand-test: #123456; }',
    '@font-face { font-family: T; src: url("assets/t.woff2") format("woff2"); }',
    '.workbook-cover { background-image: url(assets/img/bg.png); }',
    '.inline-ok { background-image: url("data:image/png;base64,iVBORw0KGgo="); }',
  ].join('\n'))
  fs.writeFileSync(path.join(b, 'logo.svg'), '<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10"><rect width="10" height="10"/></svg>')
  if (identity) fs.writeFileSync(path.join(b, 'customer.json'), JSON.stringify({
    name: NAME, logoAlt: `${NAME} logo`, hubHeading: 'Learning with agents', hubLede: 'Programmes for our engineering teams.',
  }))
  return b
}

// One full build plus the two sibling cuts, into a fresh output root.
function buildAll(brand) {
  const out = fs.mkdtempSync(path.join(os.tmpdir(), 'brand-contract-out-'))
  const env = { ...process.env, AGENTS_OUTPUT_DIR: out }
  delete env.AGENTS_BRAND_DIR; delete env.AGENTS_OVERLAY_DIR
  if (brand) env.AGENTS_BRAND_DIR = brand
  for (const extra of [[], ['--theory'], ['--exercises']]) {
    execFileSync('node', ['scripts/build-workbook.js', SLUG, TRAINING, ...extra], { cwd: REPO, env, stdio: 'pipe' })
  }
  const c = path.join(out, SLUG)
  const pages = {
    hub: path.join(c, 'index.html'),
    workbook: path.join(c, TRAINING, 'index.html'),
    'trainer-modules': path.join(c, TRAINING, 'trainer-modules.html'),
    theory: path.join(c, TRAINING, 'theory-handbook.html'),
    exercises: path.join(c, TRAINING, 'exercises-workbook.html'),
  }
  for (const [k, p] of Object.entries(pages)) assert.ok(fs.existsSync(p), `${k} page was built`)
  return { out, c, pages, read: k => fs.readFileSync(pages[k], 'utf8') }
}

// What a reader sees: no scripts, no styles, no tags, no URLs.
const visibleText = html => html
  .replace(/<script\b[\s\S]*?<\/script>/gi, '').replace(/<style\b[\s\S]*?<\/style>/gi, '')
  .replace(/<[^>]+>/g, ' ').replace(/https?:\/\/\S+/g, ' ')
const brandStyle = html => (html.match(/<style data-brand>([\s\S]*?)<\/style>/) || [])[1]

test('a brand reaches every page a build writes', () => {
  const b = brandDir()
  const r = buildAll(b)
  try {
    for (const k of Object.keys(r.pages)) {
      const html = r.read(k)
      assert.ok(brandStyle(html), `${k}: brand.css inlined`)
      assert.ok(brandStyle(html).includes('--brand-test: #123456'), `${k}: brand.css content`)
      assert.equal(html.indexOf('<style', html.indexOf('<style data-brand>') + 1), -1, `${k}: no stylesheet after brand.css`)
      assert.match(html, new RegExp(`<img class="brand-logo" src="data:image/svg\\+xml;base64,[^"]+" alt="${NAME} logo">`), `${k}: logo on the cover, alt from customer.json`)
      assert.match(html, /--brand-logo: url\("data:image\/svg\+xml;base64,[^"]+"\)/, `${k}: logo exposed once as --brand-logo`)
      assert.ok(html.indexOf('--brand-logo:') < html.indexOf('<style data-brand>'), `${k}: --brand-logo is defined before brand.css, so brand.css can use it`)
    }
  } finally { fs.rmSync(r.out, { recursive: true, force: true }); fs.rmSync(b, { recursive: true, force: true }) }
})

test('the customer is named by customer.json, never by its folder slug', () => {
  const b = brandDir()
  const r = buildAll(b)
  try {
    for (const k of Object.keys(r.pages)) {
      const html = r.read(k)
      const title = html.match(/<title>([^<]*)<\/title>/)[1]
      assert.ok(!title.includes(SLUG), `${k}: <title> names no slug: ${title}`)
      assert.ok(!visibleText(html).includes(SLUG), `${k}: no visible slug`)
    }
    for (const k of ['hub', 'workbook', 'trainer-modules', 'theory', 'exercises']) {
      assert.ok(visibleText(r.read(k)).includes(NAME), `${k}: display name shown`)
    }
    assert.ok(r.read('workbook').match(/<title>[^<]*Fjord Example Bank[^<]*<\/title>/), 'workbook title carries the name')
    const hub = r.read('hub')
    assert.match(hub, /<h1>Learning with agents<\/h1>/, 'hub heading from customer.json')
    assert.ok(hub.includes('Programmes for our engineering teams.'), 'hub lede from customer.json')
    assert.ok(!/class="theory-cover-brand">Bosser</.test(r.read('theory')), 'theory cover carries the customer, not Bosser')
    assert.ok(r.read('theory').includes('&copy; 2026 Bosser Oy.') || r.read('theory').includes('© 2026 Bosser Oy') || /Bosser Oy/.test(r.read('theory')), 'legal footer stays the vendor\'s')
  } finally { fs.rmSync(r.out, { recursive: true, force: true }); fs.rmSync(b, { recursive: true, force: true }) }
})

test('brand assets are copied beside the pages and resolve from each one', () => {
  const b = brandDir()
  const r = buildAll(b)
  try {
    assert.ok(fs.existsSync(path.join(r.c, 'brand-assets/t.woff2')), 'font copied')
    assert.ok(fs.existsSync(path.join(r.c, 'brand-assets/img/bg.png')), 'nested asset copied')
    for (const [k, p] of Object.entries(r.pages)) {
      const css = brandStyle(fs.readFileSync(p, 'utf8'))
      const urls = [...css.matchAll(/url\(\s*(["']?)([^"')]+)\1\s*\)/g)].map(m => m[2]).filter(u => !u.startsWith('data:'))
      assert.equal(urls.length, 2, `${k}: both asset urls kept: ${urls}`)
      for (const u of urls) assert.ok(fs.existsSync(path.resolve(path.dirname(p), u)), `${k}: ${u} resolves from the page`)
      assert.ok(css.includes('url("data:image/png;base64,iVBORw0KGgo=")'), `${k}: inline data URIs untouched`)
    }
  } finally { fs.rmSync(r.out, { recursive: true, force: true }); fs.rmSync(b, { recursive: true, force: true }) }
})

test('a brand without customer.json keeps the slug as the name', () => {
  const b = brandDir({ identity: false })
  const r = buildAll(b)
  try {
    assert.match(r.read('workbook'), /<img class="brand-logo" src="data:[^"]+" alt="fjord-test">/)
    assert.match(r.read('hub'), /<h1>Agents 102<\/h1>/)
  } finally { fs.rmSync(r.out, { recursive: true, force: true }); fs.rmSync(b, { recursive: true, force: true }) }
})

test('unset leaves no brand trace and the vendor identity on covers', () => {
  const r = buildAll(null)
  try {
    for (const k of Object.keys(r.pages)) {
      const html = r.read(k)
      assert.ok(!html.includes('data-brand'), `${k}: no brand style`)
      assert.ok(!html.includes('class="brand-logo"'), `${k}: no logo`)
      assert.ok(!html.includes('--brand-logo'), `${k}: no logo property`)
    }
    assert.ok(!fs.existsSync(path.join(r.c, 'brand-assets')), 'no asset folder')
    assert.match(r.read('theory'), /class="theory-cover-brand">Bosser</)
    assert.match(r.read('hub'), /<h1>Agents 102<\/h1>/)
  } finally { fs.rmSync(r.out, { recursive: true, force: true }) }
})
