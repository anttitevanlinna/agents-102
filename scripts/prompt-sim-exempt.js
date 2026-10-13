#!/usr/bin/env node
'use strict'
// Exit 0 when a prompt registry file belongs to a simulation training, so the
// prompt gates (.claude/hooks/prompt-edit-gate.sh, .githooks/pre-commit) let it
// through without a prompt-ok card or a y/N. Exit 1 otherwise, including on any
// doubt. Run from the repo root.
//
// A simulation training has `simulation: true` in site/layouts/curriculum.js: a
// generated test run, never taught. Its prompts are read by the maintainer when
// the training is promoted (the flag comes off). The prompt's own frontmatter
// `origin: <training>/<page>` names the training. If HEAD already holds the
// file, HEAD's origin must name a simulation training too, so rewriting the
// origin of a taught prompt does not open its body.
//
// Usage: prompt-sim-exempt.js <repo-relative path> [--stdin | --staged]
//   (default reads the file on disk; --stdin reads the new content from stdin)
const fs = require('node:fs')
const path = require('node:path')
const { execFileSync } = require('node:child_process')

const [rel, mode] = process.argv.slice(2)
const gitShow = spec => { try { return execFileSync('git', ['show', spec], { stdio: ['ignore', 'pipe', 'ignore'] }).toString() } catch { return null } }

function isSimulation(content) {
  const fm = content && content.match(/^---\n([\s\S]*?)\n---\n/)
  const origin = fm && fm[1].match(/^origin:\s*([^\s/]+)/m)
  if (!origin) return false
  let trainings
  try { trainings = require(path.resolve('site/layouts/curriculum.js')).TRAININGS } catch { return false }
  return Boolean(trainings && trainings[origin[1]] && trainings[origin[1]].simulation === true)
}

try {
  const content = mode === '--stdin' ? fs.readFileSync(0, 'utf8')
    : mode === '--staged' ? gitShow(`:${rel}`)
    : fs.readFileSync(rel, 'utf8')
  const head = gitShow(`HEAD:${rel}`)
  process.exit(isSimulation(content) && (head === null || isSimulation(head)) ? 0 : 1)
} catch {
  process.exit(1)
}
