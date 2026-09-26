'use strict'
const { test } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const { execFileSync } = require('node:child_process')
const { offenders, SCOPE, CORE_SCOPE, coreDir } = require('./check-owner-paths.js')

function fixture(files) {
  const d = fs.mkdtempSync(path.join(os.tmpdir(), 'owner-'))
  for (const [rel, text] of Object.entries(files)) {
    fs.mkdirSync(path.join(d, path.dirname(rel)), { recursive: true })
    fs.writeFileSync(path.join(d, rel), text)
  }
  return d
}

test('flags a home path and an encoded auto-memory path, in scope only', () => {
  const d = fixture({
    'scripts/a.js': "const M = '/Users/someone/x'\nok\nconst P = '-Users-someone-Projects-y'\n",
    'scripts/b.js': 'const M = process.env.AGENTS_CORE_DIR\n',
    'continuous-research/c.md': '/Users/someone/ in a research record is out of scope\n',
  })
  assert.deepEqual(offenders(d, ['scripts/a.js', 'scripts/b.js', 'continuous-research/c.md']), ['scripts/a.js:1', 'scripts/a.js:3'])
})

// The first scope covered only code. What an agent actually follows was
// outside it: simulation.md told every story judge to run expand-md.js by the
// maintainer's absolute path, story-depth-rubric.md told its judge the repo
// lived there, and two tmux scenarios read a plan file from the maintainer's
// ~/.claude/plans. And a Drive path is the same dependency by another name.
test('instruction surfaces are in scope: eval docs, judge templates, CLAUDE.md, prompts, tmux scenarios', () => {
  const home = 'run node /Users/someone/Projects/agents-102/scripts/x.js\n'
  const files = {
    'curriculum/evals/simulation.md': home,
    'curriculum/evals/judges/story.md': home,
    'curriculum/CLAUDE.md': home,
    'curriculum/prompts/k.md': home,
    'curriculum/evals/mechanical/tmux-runner/scenarios/m3.txt': home,
    'curriculum/evals/mechanical/tmux-runner/run-m9.sh': home,
  }
  const d = fixture(files)
  assert.deepEqual(offenders(d, Object.keys(files)).sort(), Object.keys(files).map(f => `${f}:1`).sort())
})

// The tmux runner defaulted its prompt registry to ~/Projects/agents-102: a
// clone anywhere else resolved no keys. Where the maintainer clones is an owner
// path too; the sibling core clone is named by its own rule, not this one.
test('a repo location under the maintainer\'s ~/Projects is an owner path', () => {
  const files = {
    'curriculum/evals/mechanical/tmux-runner/lib/r.sh': 'R="${P:-$HOME/Projects/agents-102/curriculum/prompts}"\n',
    'curriculum/evals/mechanical/tmux-runner/README.md': 'prompts live in `~/Projects/agents-102/curriculum/prompts`\n',
    'scripts/ok.js': "const core = '~/Projects/agents-102-core'\n",
  }
  const d = fixture(files)
  assert.deepEqual(offenders(d, Object.keys(files)).sort(),
    ['curriculum/evals/mechanical/tmux-runner/README.md:1', 'curriculum/evals/mechanical/tmux-runner/lib/r.sh:1'])
})

test('a placeholder home in teaching text is not an owner path', () => {
  const d = fixture({ 'curriculum/r.md': 'A repo at `/Users/me/Projects/x` maps to `-Users-me-Projects-x`; `/Users/yourname/Documents/` on macOS.\n' })
  assert.deepEqual(offenders(d, ['curriculum/r.md']), [])
})

test('a Google Drive path is an owner path', () => {
  const d = fixture({ 'scripts/d.sh': 'DIR="$HOME/Library/CloudStorage/GoogleDrive-someone@example.com/My Drive/x"\n' })
  assert.deepEqual(offenders(d, ['scripts/d.sh']), ['scripts/d.sh:1'])
})

test('the private core is checked with its own scope: skills, hooks, agents, agent memory, strategy, README', () => {
  const files = {
    'skills/s/SKILL.md': 'read /Users/someone/x\n',
    'project-claude/hooks/h.sh': 'x=/Users/someone/y\n',
    'project-claude/agent-memory/a/MEMORY.md': '- `/Users/someone/Projects/agents-102/strategy/x.md`\n',
    'README.md': '`~/.claude/projects/-Users-someone-Projects-agents-102/memory`\n',
    'memory/compounded/2026-01-01-x.md': '/Users/someone/ in a dated record is out of scope\n',
  }
  const d = fixture(files)
  assert.deepEqual(offenders(d, Object.keys(files), CORE_SCOPE).sort(),
    ['README.md:1', 'project-claude/agent-memory/a/MEMORY.md:1', 'project-claude/hooks/h.sh:1', 'skills/s/SKILL.md:1'])
})

test('the live repo and its core have no owner paths in tooling or instructions', () => {
  const repo = path.resolve(__dirname, '..')
  const ls = dir => execFileSync('git', ['-C', dir, 'ls-files'], { encoding: 'utf8' }).split('\n').filter(Boolean)
  assert.deepEqual(offenders(repo, ls(repo)), [])
  const core = coreDir(repo)
  assert.ok(fs.existsSync(core), `core checkout not found at ${core}`)
  assert.deepEqual(offenders(core, ls(core), CORE_SCOPE), [])
})
