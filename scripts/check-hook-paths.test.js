'use strict'
const { test } = require('node:test')
const assert = require('node:assert/strict')
const { resolve } = require('./check-hook-paths.js')

test('resolve: project dir expands', () => {
  assert.equal(resolve('$CLAUDE_PROJECT_DIR/scripts/fire-log.sh', '/r'), '/r/scripts/fire-log.sh')
})

test('resolve: AGENTS_CORE_DIR default is what a fresh clone gets', () => {
  assert.equal(
    resolve('"${AGENTS_CORE_DIR:-$CLAUDE_PROJECT_DIR/../agents-102-core}"/project-claude/hooks/x.sh', '/r'),
    '/r/../agents-102-core/project-claude/hooks/x.sh')
})

test('resolve: home path stays visible as ~ so the check can refuse it', () => {
  assert.equal(resolve('~/.claude/hooks/y.sh', '/r'), '~/.claude/hooks/y.sh')
})

test('the live settings.json passes', () => {
  const path = require('node:path')
  const { check } = require('./check-hook-paths.js')
  const repo = path.resolve(__dirname, '..')
  assert.deepEqual(check(repo, path.resolve(repo, '..', 'agents-102-core')), [])
})
