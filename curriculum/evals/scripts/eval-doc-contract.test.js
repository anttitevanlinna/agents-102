'use strict'

const { test } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')

const repo = path.resolve(__dirname, '..', '..', '..')
const read = rel => fs.readFileSync(path.join(repo, rel), 'utf8')

test('eval manifests use Sonnet for the writing judge', () => {
  for (const rel of ['curriculum/evals/exercise.md', 'curriculum/evals/lecture.md']) {
    assert.match(read(rel), /\| \*\*writing\*\* \| piece \| Sonnet 4\.6 \|/)
    assert.doesNotMatch(read(rel), /Haiku 4\.5/)
  }
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
