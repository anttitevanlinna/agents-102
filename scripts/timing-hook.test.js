'use strict'
// Exercise timing rows carry `.ex-time` in every renderer, so a customer theme
// styles them by meaning instead of guessing from structure. Two source forms
// are timing: a `**Time:** 20 minutes.` row and a duration alone in emphasis
// under a phase heading (`*15 min*`). Prose that happens to be one emphasised
// phrase right after a heading is not, and CSS cannot tell the two apart
// (`p > em:only-child` ignores text nodes), so the runtime decides once
// (CurriculumRuntime.decorateTiming) and Slides reuses it.
const { test } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const { execFileSync } = require('node:child_process')
const { JSDOM, VirtualConsole } = require('jsdom')

const REPO = path.resolve(__dirname, '..')
const CR = require('../site/layouts/curriculum.js')

test('decorateTiming tags timing rows and leaves emphasised prose alone', () => {
  const { document } = new JSDOM(`<main>
    <h2>Phase 1</h2><p id="a"><em>15 min</em></p>
    <h2>Phase 2</h2><p id="b"><em>~5 min</em></p>
    <h2>Phase 3</h2><p id="c"><em>10–15 minutes</em></p>
    <p id="d"><strong>Time:</strong> 20 minutes.</p>
    <h2>Setup</h2><p id="e"><em>Keep your existing session open; it becomes Session 4.</em></p>
    <p id="f"><em>Watch-fors:</em></p>
    <p id="g">This takes <em>15 min</em> in total.</p>
    <p id="h"><strong>Timebox</strong> the review.</p>
  </main>`).window
  CR.decorateTiming(document.querySelector('main'))
  const tagged = [...document.querySelectorAll('p.ex-time')].map(p => p.id)
  assert.deepEqual(tagged, ['a', 'b', 'c', 'd'])
})

test('a built workbook tags the same timing rows in the long read and in Slides', () => {
  const out = fs.mkdtempSync(path.join(os.tmpdir(), 'timing-hook-'))
  try {
    const env = { ...process.env, AGENTS_OUTPUT_DIR: out }
    delete env.AGENTS_BRAND_DIR; delete env.AGENTS_OVERLAY_DIR
    execFileSync('node', ['scripts/build-workbook.js', 'timing', 'agentic-engineering-101'], { cwd: REPO, env, stdio: 'pipe' })
    const html = fs.readFileSync(path.join(out, 'timing/agentic-engineering-101/index.html'), 'utf8')
    const w = new JSDOM(html, { runScripts: 'dangerously', pretendToBeVisual: true, virtualConsole: new VirtualConsole() }).window
    w.Element.prototype.scrollIntoView = function () {}
    const isTiming = p => /^\s*(time\b|~?\s*\d)/i.test(p.textContent) && /\bmin/i.test(p.textContent)
    const long = [...w.document.querySelectorAll('main p.ex-time')]
    assert.ok(long.length > 10, `long read tags timing rows (${long.length})`)
    assert.deepEqual(long.filter(p => !isTiming(p)).map(p => p.textContent), [], 'only timing rows')
    const emRows = [...w.document.querySelectorAll('main p')].filter(p => p.children.length === 1 && p.firstElementChild.tagName === 'EM' && p.textContent.trim() === p.firstElementChild.textContent.trim() && /^~?\d+(\s*[–-]\s*\d+)?\s*min/i.test(p.textContent.trim()))
    assert.ok(emRows.length > 0 && emRows.every(p => p.classList.contains('ex-time')), 'every *N min* row is tagged')
    w.CurriculumSlides.open(w.document.querySelector('main'))
    const deck = [...w.document.querySelectorAll('.deck p.ex-time')]
    assert.equal(deck.length, long.length, 'Slides tags the same rows')
  } finally { fs.rmSync(out, { recursive: true, force: true }) }
})
