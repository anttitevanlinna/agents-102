'use strict'

const { test } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')

const REPO = path.resolve(__dirname, '..')
const CORE_AGENTS = path.resolve(REPO, '..', 'agents-102-core', 'project-claude', 'agents')

test('Copilot discovers the same custom-agent directory as Claude', () => {
  const copilotAgents = path.join(REPO, '.github', 'agents')
  const claudeAgents = path.join(REPO, '.claude', 'agents')
  assert.equal(fs.realpathSync(copilotAgents), CORE_AGENTS)
  assert.equal(fs.realpathSync(claudeAgents), CORE_AGENTS)

  const profiles = fs.readdirSync(copilotAgents).filter((name) => name.endsWith('.md'))
  assert.ok(profiles.length > 0)
  for (const profile of profiles) {
    const body = fs.readFileSync(path.join(copilotAgents, profile), 'utf8')
    assert.match(body, /^include-custom-instructions:\s*true$/m, profile)
    assert.doesNotMatch(body, /^model:\s*(?:sonnet|haiku|opus)$/m, profile)
  }
})
