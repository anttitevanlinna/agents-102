'use strict'

const { test } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')

const repo = path.resolve(__dirname, '..', '..', '..')
const read = rel => fs.readFileSync(path.join(repo, rel), 'utf8')

// One home per fact (migration ledger: eval protocol has one current source).
// The manifests pinned "Sonnet 4.6" per row, said "four class judges" after
// there were seven, and restated the verdict ladder, thresholds and output
// path that the judge templates, the dispatch preamble and instance-contract.js
// own. The judge model lives in /eval-fire Step 4 (with the bench that chose
// it) and in eval-sweep.js for automation — nowhere else.
test('eval manifests route; they restate no model, class count or verdict ladder', () => {
  for (const rel of ['curriculum/evals/exercise.md', 'curriculum/evals/lecture.md']) {
    const doc = read(rel)
    assert.doesNotMatch(doc, /Sonnet|Haiku|Opus/i, `${rel} names a model`)
    assert.doesNotMatch(doc, /\bfour (class|classes)\b/i, `${rel} counts classes`)
    assert.doesNotMatch(doc, /## Verdict ladder|APPROVE/, `${rel} restates the verdict ladder`)
    assert.match(doc, /\/eval-fire/)
    assert.match(doc, /_dispatch-preamble\.md/)
  }
  const skill = read('.claude/skills/curriculum-pre-ship-audit/SKILL.md')
  assert.doesNotMatch(skill, /\| Sonnet \|/, 'pre-ship audit restates the per-class model')
  const fire = read('.claude/skills/eval-fire/SKILL.md')
  assert.doesNotMatch(fire, /\| `sonnet` \|/, 'eval-fire table restates the model its Step 4 owns')
  assert.doesNotMatch(read('.claude/skills/wind-down/SKILL.md'), /approve-with-todos/i)
  assert.doesNotMatch(read('curriculum/evals/README.md'), /four-class architecture/)
})

test('trace docs use the canonical type-qualified private-core path', () => {
  const docs = [read('curriculum/evals/README.md'), read('curriculum/evals/judges/story.md')].join('\n')
  assert.match(docs, /<training>--<surface-type>--<slug>/)
  assert.doesNotMatch(docs, /<training>--<slug>\.(persona|behavior)\.json/)
  assert.doesNotMatch(docs, /cache directory is gitignored|traces are user-local/)
})

test('eval docs use inherited project rules and two live verdicts', () => {
  const docs = [read('curriculum/evals/README.md'), read('curriculum/evals/exercise.md'), read('curriculum/evals/lecture.md')].join('\n')
  assert.doesNotMatch(docs, /Subagents do NOT read CLAUDE\.md|prepend `\.claude\/rules\/content-rules\.md`/)
  assert.doesNotMatch(docs, /APPROVE WITH TODOs|non-blocking REVISE rules/)
})

test('judge templates write portable repo-relative instance paths', () => {
  const dir = path.join(repo, 'curriculum/evals/judges')
  const templates = fs.readdirSync(dir)
    .filter(name => name.endsWith('.md'))
    .map(name => fs.readFileSync(path.join(dir, name), 'utf8'))
    .filter(text => /"file":\s*"</.test(text))

  assert.ok(templates.length > 0)
  for (const template of templates) {
    assert.doesNotMatch(template, /"file":\s*"<absolute path>"/)
    assert.match(template, /"file":\s*"<repo-relative path>"/)
  }
})
