#!/usr/bin/env node
'use strict'
// Is the tracked site/prompts.json (site/figures.json) what the tracked
// curriculum/prompts/ (curriculum/figures/) compiles to? Reads git objects, not
// the working tree: every build rewrites the working copies, so only the staged
// or committed state can show a commit that left the JSON behind.
//
//   check-generated-registries.js --staged     # the index (.githooks/pre-commit)
//   check-generated-registries.js --ref HEAD   # a commit
//
// Exit 1 names each stale file and the command that rebuilds it.
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const { execFileSync } = require('node:child_process')
const { loadRegistry } = require('./compile-prompts.js')
const { loadFigures } = require('./compile-figures.js')

const argv = process.argv.slice(2)
const ref = argv.includes('--staged') ? '' : argv[argv.indexOf('--ref') + 1]
if (ref === undefined || (!argv.includes('--staged') && !argv.includes('--ref'))) {
  console.error('usage: check-generated-registries.js --staged | --ref <commit>'); process.exit(2)
}
const git = (...a) => execFileSync('git', a, { maxBuffer: 1 << 28, stdio: ['ignore', 'pipe', 'ignore'] }).toString()
const show = p => { try { return git('show', `${ref}:${p}`) } catch { return null } }
const list = dir => (ref === '' ? git('ls-files', '--', dir) : git('ls-tree', '-r', '--name-only', ref, '--', dir)).split('\n').filter(Boolean)

// Materialise one source folder as git holds it, compile it there.
function compiled(dir, load) {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'genreg-src-'))
  try {
    for (const p of list(dir)) {
      if (p.slice(dir.length + 1).includes('/')) continue   // loaders read the top level only
      const body = show(p)
      if (body !== null) fs.writeFileSync(path.join(tmp, path.basename(p)), body)
    }
    return load(tmp)
  } finally { fs.rmSync(tmp, { recursive: true, force: true }) }
}

const checks = [
  { out: 'site/prompts.json', src: 'curriculum/prompts', want: () => JSON.stringify(compiled('curriculum/prompts', loadRegistry), null, 2) + '\n', fix: 'node scripts/compile-prompts.js' },
  { out: 'site/figures.json', src: 'curriculum/figures', want: () => JSON.stringify(compiled('curriculum/figures', loadFigures)), fix: 'node scripts/compile-figures.js' },
]
let stale = 0
for (const c of checks) {
  if (show(c.out) !== c.want()) {
    stale++
    console.error(`${c.out} is stale against ${c.src}/ ${ref ? `at ${ref}` : 'in the index'}: run ${c.fix} and ${ref ? 'commit' : 'stage'} ${c.out}`)
  }
}
process.exit(stale ? 1 : 0)
