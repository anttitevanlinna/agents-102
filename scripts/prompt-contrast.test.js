'use strict'
// Prompt plates are the part of a page a student copies from, so a customer
// restyle must not be able to make them unreadable. They own their colours as
// tokens: a customer sets the pair once and every phase (lecture, dark
// exercise, a dark Slides theme, the theory handbook) takes it, nested <code>
// included.
//
//   --prompt-bg / --prompt-fg                  the plate and its text
//   --prompt-header-bg / --prompt-header-fg    the header row (destination)
//   --prompt-border                            the frame
//
// Unset, each phase keeps its own default. Measured on real builds in jsdom,
// which honours specificity and inheritance but leaves var() unresolved, so the
// test resolves var() itself against the element's custom properties.
const { test } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const { execFileSync } = require('node:child_process')
const { JSDOM, VirtualConsole } = require('jsdom')

const REPO = path.resolve(__dirname, '..')

function build(brandCss) {
  const out = fs.mkdtempSync(path.join(os.tmpdir(), 'prompt-contrast-'))
  const env = { ...process.env, AGENTS_OUTPUT_DIR: out }
  delete env.AGENTS_BRAND_DIR; delete env.AGENTS_OVERLAY_DIR
  if (brandCss) {
    env.AGENTS_BRAND_DIR = path.join(out, '_brand')
    fs.mkdirSync(env.AGENTS_BRAND_DIR)
    fs.writeFileSync(path.join(env.AGENTS_BRAND_DIR, 'brand.css'), brandCss)
  }
  execFileSync('node', ['scripts/build-workbook.js', 'contrast', 'claude-basics'], { cwd: REPO, env, stdio: 'pipe' })
  execFileSync('node', ['scripts/build-workbook.js', 'contrast', 'agents-101', '--theory'], { cwd: REPO, env, stdio: 'pipe' })
  const read = p => fs.readFileSync(path.join(out, 'contrast', p), 'utf8')
  const pages = { workbook: read('claude-basics/index.html'), theory: read('agents-101/theory-handbook.html') }
  fs.rmSync(out, { recursive: true, force: true })
  return pages
}

function load(html) {
  const vc = new VirtualConsole()
  const dom = new JSDOM(html, { runScripts: 'dangerously', pretendToBeVisual: true, virtualConsole: vc })
  const w = dom.window
  w.Element.prototype.scrollIntoView = function () {}
  return w
}

// ── colour arithmetic ─────────────────────────────────────────────────────────
function resolve(w, el, value, depth = 0) {
  if (depth > 20) throw new Error(`var() loop resolving ${value}`)
  const i = value.indexOf('var(')
  if (i === -1) return value
  let j = i + 4, level = 1, comma = -1
  for (; j < value.length && level; j++) {
    if (value[j] === '(') level++
    else if (value[j] === ')') level--
    else if (value[j] === ',' && level === 1 && comma === -1) comma = j
  }
  const inner = value.slice(i + 4, j - 1)
  const name = (comma === -1 ? inner : value.slice(i + 4, comma)).trim()
  const fallback = comma === -1 ? '' : value.slice(comma + 1, j - 1).trim()
  const own = w.getComputedStyle(el).getPropertyValue(name).trim()
  const sub = own || fallback
  return resolve(w, el, value.slice(0, i) + sub + value.slice(j), depth + 1)
}
function rgba(w, v) {
  const probe = w.document.createElement('i')
  w.document.body.appendChild(probe)
  probe.style.color = v
  const c = w.getComputedStyle(probe).color
  probe.remove()
  const m = c.match(/rgba?\(([^)]+)\)/)
  if (!m || !probe.style.color) throw new Error(`unparsed colour: ${v}`)
  const [r, g, b, a = 1] = m[1].split(',').map(Number)
  return { r, g, b, a }
}
function ownBg(w, el) {
  const cs = w.getComputedStyle(el)
  const own = cs.backgroundColor
  const c = rgba(w, own.includes('var(') ? resolve(w, el, own) : own)
  if (c.a > 0) return c
  const sh = cs.getPropertyValue('background')
  if (sh && sh.includes('var(')) {
    const v = resolve(w, el, sh).trim()
    if (v && v !== 'none') return rgba(w, v)
  }
  return c
}
const over = (top, under) => {
  const a = top.a + under.a * (1 - top.a)
  const mix = k => (top[k] * top.a + under[k] * under.a * (1 - top.a)) / a
  return { r: mix('r'), g: mix('g'), b: mix('b'), a }
}
function effectiveBg(w, el) {
  const chain = []
  for (let e = el; e && e.nodeType === 1; e = e.parentElement) chain.push(ownBg(w, e))
  return chain.reverse().reduce((acc, c) => over(c, acc), { r: 255, g: 255, b: 255, a: 1 })
}
function fgOf(w, el) {
  let c = w.getComputedStyle(el).color
  if (c.includes('var(')) c = resolve(w, el, c)
  return rgba(w, c)
}
const lum = ({ r, g, b }) => {
  const f = v => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4 }
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b)
}
const contrast = (fg, bg) => {
  const f = over(fg, bg), [a, b] = [lum(f), lum(bg)].sort((x, y) => y - x)
  return (a + 0.05) / (b + 0.05)
}
const hex = c => '#' + [c.r, c.g, c.b].map(v => Math.round(v).toString(16).padStart(2, '0')).join('')

// Every prompt's text element, in the long read, in the open deck, and on the
// theory handbook. Each is labelled by where it sits.
function plates(pages) {
  const out = []
  const wb = load(pages.workbook)
  const textOf = pre => pre.querySelector('code') || pre
  const collect = (w, sel, where) => w.document.querySelectorAll(sel).forEach(pre => {
    const block = pre.closest('.prompt-block')
    const dark = pre.closest('.theme-dark, .phase--exercise') ? 'dark' : 'light'
    const header = block && block.querySelector('.prompt-block__header')
    out.push({ w, where: `${where}/${dark}`, text: textOf(pre), pre, header: header && header.querySelector('.prompt-block__dest'),
      headerText: header ? [...header.querySelectorAll('.prompt-block__label, .prompt-block__arrow, .prompt-block__dest, .prompt-block__context, .copy-btn')] : [] })
  })
  collect(wb, 'main .prompt-block .prompt-block__pre', 'long-read')
  wb.CurriculumSlides.open(wb.document.querySelector('main'))
  collect(wb, '.deck .prompt-block .prompt-block__pre', 'slides')
  collect(load(pages.theory), '.prompt-block .prompt-block__pre', 'theory')
  const kinds = new Set(out.map(p => p.where))
  assert.ok(out.some(p => p.headerText.some(e => e.classList.contains('copy-btn'))), 'fixture reaches a header copy button')
  for (const k of ['long-read/dark', 'long-read/light', 'slides/dark', 'theory/light']) {
    assert.ok(kinds.has(k), `fixture reaches ${k} prompts (found ${[...kinds]})`)
  }
  return out
}

test('unbranded, every prompt plate reads at 4.5:1 or better', () => {
  const bad = plates(build(null))
    .map(p => ({ ...p, ratio: contrast(fgOf(p.w, p.text), effectiveBg(p.w, p.text)) }))
    .filter(p => p.ratio < 4.5)
    .map(p => `${p.where} ${p.ratio.toFixed(2)}`)
  assert.deepEqual(bad, [])
})

for (const [label, t] of [
  ['light', { bg: '#f4f7fb', fg: '#10233f', hbg: '#e2e9f3', hfg: '#0b1f3a' }],
  ['dark', { bg: '#0b1f3a', fg: '#ffffff', hbg: '#16325c', hfg: '#f4f7fb' }],
]) {
  test(`a ${label} token pair reaches every prompt plate and header, nested code included`, () => {
    const css = `:root { --prompt-bg: ${t.bg}; --prompt-fg: ${t.fg}; --prompt-header-bg: ${t.hbg}; --prompt-header-fg: ${t.hfg}; }\n`
    const all = plates(build(css))
    const wrong = []
    for (const p of all) {
      const bg = hex(effectiveBg(p.w, p.text)), fg = hex(over(fgOf(p.w, p.text), effectiveBg(p.w, p.text)))
      if (bg !== t.bg || fg !== t.fg) wrong.push(`${p.where}: plate ${bg} text ${fg}`)
      if (p.header) {
        const hb = hex(effectiveBg(p.w, p.header)), hf = hex(over(fgOf(p.w, p.header), effectiveBg(p.w, p.header)))
        if (hb !== t.hbg || hf !== t.hfg) wrong.push(`${p.where} header: ${hb} text ${hf}`)
      }
      for (const el of p.headerText) {
        const r = contrast(fgOf(p.w, el), effectiveBg(p.w, el))
        if (r < 4.5) wrong.push(`${p.where} header .${el.className.split(' ')[0]}: ${r.toFixed(2)}:1`)
      }
    }
    assert.deepEqual([...new Set(wrong)], [])
  })
}
