'use strict'
const { test } = require('node:test')
const assert = require('node:assert')
const { hoist } = require('./hoist-quality.js')

const BODY = '# Title\n\nStudent body. **Quality:** quoted in prose stays put.\n\n'
const Q = '**Quality:** compendium-audited 2026-09-01 (writing@abc1234 story@abc1234)\n- judges @abc1234: writing PASS, story PASS\n- cross_module @abc1234: PASS — set=[a,b]\n'
const NOTES = '**Placement (2026-07-02, Antti-directed):** M2 open.\n\n**Accepted 2026-08-13:** do not re-file §6.\n'

test('a block already in position is untouched, byte for byte', () => {
  const src = `${BODY}<!-- maintainer -->\n\n${Q}\n${NOTES}`
  const r = hoist(src)
  assert.strictEqual(r.moved, false)
  assert.strictEqual(r.reason, 'in-position')
  assert.strictEqual(r.text, src)
})

test('a deep block moves to the top with its rows contiguous, notes intact, one blank at each seam', () => {
  const src = `${BODY}<!-- maintainer -->\n\n${NOTES}\n${Q}\n**Meta:**\n- **Time:** 15\n`
  const r = hoist(src)
  assert.strictEqual(r.moved, true)
  assert.strictEqual(r.text, `${BODY}<!-- maintainer -->\n\n${Q}\n${NOTES}\n**Meta:**\n- **Time:** 15\n`)
  assert.strictEqual(hoist(r.text).moved, false, 'idempotent')
})

test('a block at the very end of the file moves up and the file keeps its trailing newline', () => {
  const src = `${BODY}<!-- maintainer -->\n\n${NOTES}\n${Q}`
  const r = hoist(src)
  assert.strictEqual(r.text, `${BODY}<!-- maintainer -->\n\n${Q}\n${NOTES}`)
  assert.ok(r.text.endsWith('\n'))
  assert.ok(!r.text.endsWith('\n\n\n'))
})

test('only the unbroken run of rows travels; a dash row after a gap stays with the notes', () => {
  const src = `${BODY}<!-- maintainer -->\n\n${NOTES}\n${Q}\n- **Time:** 15 (a Meta row after a blank line)\n`
  const r = hoist(src)
  assert.strictEqual(r.text, `${BODY}<!-- maintainer -->\n\n${Q}\n${NOTES}\n- **Time:** 15 (a Meta row after a blank line)\n`)
})

test('no fence, or no Quality line under the fence, is left alone', () => {
  assert.strictEqual(hoist(`${BODY}${Q}`).reason, 'no-fence')
  assert.strictEqual(hoist(`${BODY}<!-- maintainer -->\n\n${NOTES}`).reason, 'no-quality')
})

test('a Quality string quoted in the student body is never mistaken for the block', () => {
  const src = `# T\n\nProse says **Quality:** as a word.\n\n<!-- maintainer -->\n\n${NOTES}\n${Q}`
  const r = hoist(src)
  assert.ok(r.text.startsWith('# T\n\nProse says **Quality:** as a word.\n\n<!-- maintainer -->\n\n**Quality:** compendium-audited'))
})
