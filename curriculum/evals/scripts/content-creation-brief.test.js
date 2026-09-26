#!/usr/bin/env node
// The authoring brief carries no strategy of its own: module moods live in the
// training's strategy doc and the file's maintainer block, and a copy here goes stale.
'use strict'
const assert = require('node:assert')
const fs = require('node:fs')
const path = require('node:path')
const src = fs.readFileSync(path.join(__dirname, 'content-creation-brief.sh'), 'utf8')
const moods = src.match(/\bM\d\b[^\n]*\bstays\b[^\n]*/g) || []
assert.deepStrictEqual(moods, [], 'content-creation-brief.sh hardcodes module moods')
console.log('content-creation-brief: no hardcoded moods')

// Each training's brief names that training's strategy doc, at its core path.
const { execFileSync } = require('node:child_process')
const REPO = path.resolve(__dirname, '../../..')
const CORE = process.env.AGENTS_CORE_DIR || path.join(REPO, '..', 'agents-102-core')
const brief = f => execFileSync('bash', [path.join(__dirname, 'content-creation-brief.sh'), f, '--raw'], { cwd: REPO, encoding: 'utf8' })
for (const [file, doc] of [
  ['curriculum/trainings/agentic-engineering-101/getting-going.md', 'content-strategy-agentic-engineering-101.md'],
  ['curriculum/trainings/agents-101/prework.md', 'content-strategy.md'],
]) {
  const out = brief(file)
  assert.ok(out.includes(`STRATEGY DOC: ${path.join(CORE, 'strategy', doc)}`), `${file} → expected strategy doc ${doc}`)
  assert.ok(fs.existsSync(path.join(CORE, 'strategy', doc)), `${doc} missing in core`)
}
console.log('content-creation-brief: strategy doc per training')

// Writers read T1 rule indexes, never the full compendiums (T3 = judges only).
{
  const out = brief('curriculum/trainings/agentic-engineering-101/getting-going.md')
  assert.ok(out.includes(path.join(CORE, 'memory', '_index', 'writing.leads.md')), 'brief names the T1 writing index')
  assert.ok(!/Read each compendium/.test(out), 'brief must not send a writer to the full compendiums')
  assert.ok(!/content-rules\.md/.test(out), 'content-rules.md autoloads (subagents too); the brief must not re-route to it')
}
// Every training directory is recognised: strategy doc and a voice line, never "unrecognized".
{
  const out = brief('curriculum/trainings/engineering-management/case-library.md')
  assert.ok(out.includes(path.join(CORE, 'strategy', 'content-strategy-engineering-management.md')), 'EM strategy doc')
  assert.ok(!/unrecognized training/.test(out), 'EM voice line is not "unrecognized"')
}
// A new training directory needs no edit here: its key is the directory name and
// its strategy doc is content-strategy-<key>.md in core.
{
  const os = require('node:os')
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'brief-'))
  const f = path.join(dir, 'curriculum', 'trainings', 'zz-new-training', 'module.md')
  fs.mkdirSync(path.dirname(f), { recursive: true })
  fs.writeFileSync(f, '# A module\n')
  try {
    const out = brief(f)
    assert.ok(out.includes('TRAINING: zz-new-training'), 'key is the directory name')
    assert.ok(out.includes(path.join(CORE, 'strategy', 'content-strategy-zz-new-training.md')), 'conventional strategy doc path')
    assert.ok(!/unrecognized training/.test(out), 'a new training is recognised')
  } finally { fs.rmSync(dir, { recursive: true, force: true }) }
}
console.log('content-creation-brief: T1 indexes; every training recognised')
