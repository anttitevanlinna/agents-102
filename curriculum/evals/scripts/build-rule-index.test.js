'use strict'
const { test } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const { execFileSync } = require('node:child_process')
const { parseDiamond, lint, ruleBody, CARVE, readAll } = require('./build-rule-index.js')

const SCRIPT = path.join(__dirname, 'build-rule-index.js')

function fixture(files) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'ruleidx-'))
  for (const [name, body] of Object.entries(files)) fs.writeFileSync(path.join(dir, name), body)
  return dir
}
const compendium = (diamond, rules) => `---
name: t
metadata:
  tiers:
    diamond: [${diamond.join(', ')}]
  eval_classes:
    - writing
---

# T

${rules}
`

test('parseDiamond reads the inline list, tolerates absence', () => {
  assert.deepEqual(parseDiamond('  diamond: [1, 2, 14]'), ['1', '2', '14'])
  assert.deepEqual(parseDiamond('  diamond: []'), [])
  assert.deepEqual(parseDiamond('nothing here'), [])
})

test('ruleBody returns one chunk, sub-letters fold into the parent', () => {
  const md = '1. **A.** alpha\n\n1b. **A-sub.** still alpha\n\n2. **B.** beta\n'
  assert.match(ruleBody(md, '1'), /still alpha/)
  assert.doesNotMatch(ruleBody(md, '1'), /beta/)
  assert.equal(ruleBody(md, '99'), '')
})

test('CARVE flags escape hatches, not ordinary prose', () => {
  assert.ok(CARVE.test('THIS RULE HAS AN EXCEPTION'))
  assert.ok(CARVE.test('the hard-grep phrase list'))
  assert.ok(CARVE.test('a carve-out for supplementaries'))
  assert.ok(!CARVE.test('Name the artifact, not the act.'))
})

test('lint reports dupes, gaps and diamond ghosts', () => {
  const c = { rules: [{ id: '1' }, { id: '3' }], diamond: ['1', '7'] }
  const l = lint(c)
  assert.deepEqual(l.gaps, [2])
  assert.deepEqual(l.ghosts, ['7'])
  assert.deepEqual(l.dupes, [])
})

test('build emits diamond + per-surface leads, marking ◆ and ⚠', () => {
  const dir = fixture({
    'check_demo.md': compendium([1], '1. **Alpha rule.** body\n\n2. **Beta rule.** has a carve-out here\n'),
  })
  execFileSync('node', [SCRIPT, '--mem', dir])
  const leads = fs.readFileSync(path.join(dir, '_index', 'demo.leads.md'), 'utf8')
  assert.match(leads, /◆ {2}§1 Alpha rule\./)
  assert.match(leads, /⚠ §2 Beta rule\./)
  const dia = fs.readFileSync(path.join(dir, '_index', 'diamond.md'), 'utf8')
  assert.match(dia, /§1 Alpha rule\./)
  assert.doesNotMatch(dia, /Beta rule/)   // non-diamond stays out of T0
})

test('--check is fresh after a build and fails closed once a rule moves', () => {
  const dir = fixture({
    'check_demo.md': compendium([1], '1. **Alpha rule.** body\n'),
  })
  execFileSync('node', [SCRIPT, '--mem', dir])
  execFileSync('node', [SCRIPT, '--check', '--mem', dir])            // fresh: exit 0
  fs.writeFileSync(path.join(dir, 'check_demo.md'), compendium([1], '1. **Alpha rule.** REWORDED\n'))
  assert.throws(() => execFileSync('node', [SCRIPT, '--check', '--mem', dir], { stdio: 'pipe' }),
    e => e.status === 1)
})

test('--check fails closed when a whole compendium is added or removed', () => {
  const dir = fixture({ 'check_demo.md': compendium([1], '1. **Alpha.** body\n') })
  execFileSync('node', [SCRIPT, '--mem', dir])
  fs.writeFileSync(path.join(dir, 'check_new.md'), compendium([], '1. **Gamma.** body\n'))
  assert.throws(() => execFileSync('node', [SCRIPT, '--check', '--mem', dir], { stdio: 'pipe' }),
    e => e.status === 1)
  fs.unlinkSync(path.join(dir, 'check_new.md'))
  fs.unlinkSync(path.join(dir, 'check_demo.md'))
  assert.throws(() => execFileSync('node', [SCRIPT, '--check', '--mem', dir], { stdio: 'pipe' }),
    e => e.status === 1)   // removal is drift too
})

test('the real compendiums parse and every diamond id resolves', () => {
  for (const c of readAll(require('./compendium-drift.js').MEM)) {
    assert.ok(c.rules.length > 0, `${c.file} parsed no rules`)
    assert.deepEqual(lint(c).ghosts, [], `${c.file} names a diamond rule that does not exist`)
  }
})
