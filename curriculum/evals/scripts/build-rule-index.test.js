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

test('a sub-rule is fetchable by its own number', () => {
  // rule.js is the whole T2 tier, and the tier exists BECAUSE sub-rules carry
  // the carve-outs. ruleBody parsed the sub-letter and then matched only
  // `!s.sub`, so every `rule.js pedagogy 52c` answered "check_pedagogy.md has
  // no §52c" while §52c sat in the file. 27 rules corpus-wide were unreachable
  // by their own number, 18 of them in check_platform_and_boundaries — the one
  // most cited for capability claims. An agent that asks and is told the rule
  // does not exist does not go looking; it proceeds.
  const md = '1. **A.** alpha\n\n1b. **A-sub.** still alpha\n\n1c. **A-third.** gamma\n\n2. **B.** beta\n'
  assert.match(ruleBody(md, '1b'), /still alpha/)
  assert.doesNotMatch(ruleBody(md, '1b'), /^1\. /m, 'a sub-rule does not drag its parent along')
  assert.doesNotMatch(ruleBody(md, '1b'), /gamma/, 'nor the sub-rule after it')
  assert.match(ruleBody(md, '1c'), /gamma/)
  assert.doesNotMatch(ruleBody(md, '1c'), /beta/)
  assert.equal(ruleBody(md, '1z'), '', 'a sub-letter that does not exist is still empty')
  // The parent keeps folding its children in — callers rely on it.
  assert.match(ruleBody(md, '1'), /gamma/)
})

test('a sub-rule authored as an indented bold run is fetchable too', () => {
  // Two authoring shapes exist. Most sub-rules start the line (`11a. **...`),
  // but five in check_research_claims/check_prompts are indented bold runs
  // inside the parent's body (`   **11a. ...**`). `.claude/rules/content-rules.md`
  // cites one of them — check_research_claims §11a, the source-freshness stamp
  // rule — by number, so the fetch must answer to the name the docs use.
  const md = '11. **Parent.** body\n\n   **11a. Sub.** the stamp rule\n\n   **11b. Next.** other\n\n12. **After.** later\n'
  assert.match(ruleBody(md, '11a'), /the stamp rule/)
  assert.doesNotMatch(ruleBody(md, '11a'), /other/)
  assert.doesNotMatch(ruleBody(md, '11a'), /later/)
  assert.match(ruleBody(md, '11'), /the stamp rule/, 'the parent still folds its children in')
})

test('every sub-rule in the real compendiums is reachable by its own number', () => {
  // The corpus is the fixture that matters: a regex that works on a toy string
  // and misses the real numbering is the bug this test exists to catch.
  const fs = require('node:fs')
  const path = require('node:path')
  const { MEM } = require('./compendium-drift.js')
  let checked = 0
  for (const f of fs.readdirSync(MEM).filter(x => /^check_.*\.md$/.test(x))) {
    const md = fs.readFileSync(path.join(MEM, f), 'utf8')
    for (const m of md.matchAll(/^(?:(\d+[a-z])\.\s+\*\*|\s+\*\*(\d+[a-z])\.)/gm)) {
      m[1] = m[1] || m[2]
      assert.notStrictEqual(ruleBody(md, m[1]), '', `${f} §${m[1]} is unreachable`)
      checked++
    }
  }
  assert.ok(checked > 20, `expected the corpus to carry sub-rules, found ${checked}`)
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
