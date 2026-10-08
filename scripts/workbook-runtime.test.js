#!/usr/bin/env node
// A built page inlines the shared runtime (site/layouts/curriculum.js). The
// registry in that file lists every training and names the customers its cuts
// were made for; a page built for one training carries only its own entry.
'use strict'
const assert = require('node:assert')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const vm = require('node:vm')
const { execFileSync } = require('node:child_process')

const REPO = path.resolve(__dirname, '..')
const SRC = fs.readFileSync(path.join(REPO, 'site/layouts/curriculum.js'), 'utf8')
const CR = require(path.join(REPO, 'site/layouts/curriculum.js'))

// What the browser sees: the keys of the registry the inlined script defines.
const registryKeys = js => {
  const box = {}; box.window = box
  vm.runInNewContext(js, box)
  return Object.keys(box.CurriculumRuntime.TRAININGS).sort()
}
// Customer slugs the registry's own build-command comments name.
const customers = [...new Set([...SRC.matchAll(/build-workbook\.js ([a-z0-9-]+) /g)].map(m => m[1]))]
  .filter(s => !CR.TRAININGS[s] && !s.startsWith('<'))
assert.ok(customers.length > 0, 'the source names at least one customer slug, or this test reads nothing')

// ── End to end: a page built for one training ────────────────────────────────
const SLUG = 'vip-scopetest'                       // vip-* is gitignored
const OUT = fs.mkdtempSync(path.join(os.tmpdir(), 'scope-'))
try {
  execFileSync('node', ['scripts/build-workbook.js', SLUG, 'claude-basics'],
    { cwd: REPO, env: { ...process.env, AGENTS_OUTPUT_DIR: OUT }, stdio: 'pipe' })
  const pages = execFileSync('find', [path.join(OUT, SLUG, 'claude-basics'), '-name', '*.html'], { encoding: 'utf8' })
    .split('\n').filter(Boolean)
  assert.ok(pages.length > 0, 'the build wrote at least one page')
  for (const p of pages) {
    const html = fs.readFileSync(p, 'utf8')
    const js = [...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)].map(m => m[1]).find(s => s.includes('CurriculumRuntime'))
    assert.ok(js, `${path.basename(p)}: the runtime is inlined`)
    assert.deepStrictEqual(registryKeys(js), ['claude-basics'], `${path.basename(p)}: registry holds only the built training`)
    assert.ok(html.includes('Permission is hereby granted, free of charge'), `${path.basename(p)}: third-party notices travel in the page`)
    for (const c of customers) {
      assert.ok(!new RegExp(`\\b${c}\\b`, 'i').test(html), `${path.basename(p)}: names the customer slug "${c}"`)
    }
  }
} finally {
  fs.rmSync(OUT, { recursive: true, force: true })
}

// ── The scoping function itself ──────────────────────────────────────────────
const { scopedRuntime } = require('./workbook-runtime.js')

// A cut keeps its parent: module numbering reads the parent's module list.
const cut = Object.keys(CR.TRAININGS).find(k => CR.TRAININGS[k].contentKey)
assert.ok(cut, 'the registry has at least one contentKey cut')
assert.deepStrictEqual(registryKeys(scopedRuntime(SRC, CR.TRAININGS, cut)), [cut, CR.TRAININGS[cut].contentKey].sort())

// The entry it keeps is the one the build read, field for field.
const box = {}; box.window = box
vm.runInNewContext(scopedRuntime(SRC, CR.TRAININGS, 'claude-basics'), box)
assert.deepStrictEqual(JSON.parse(JSON.stringify(box.CurriculumRuntime.TRAININGS['claude-basics'])), JSON.parse(JSON.stringify(CR.TRAININGS['claude-basics'])))

// A source it cannot find the registry in is an error, never a silent pass-through.
assert.throws(() => scopedRuntime('var x = 1;', CR.TRAININGS, 'claude-basics'), /registry/)
assert.throws(() => scopedRuntime(SRC, CR.TRAININGS, 'no-such-training'), /no-such-training/)

console.log('workbook-runtime: a built page carries its own training, its parent when it is a cut, and no customer slug')
