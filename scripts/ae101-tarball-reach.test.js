'use strict'
// The AE101 student tarball ships the lectures and exercises its training
// links, one or two hops out. Links were collected from the raw source, so a
// mention inside a maintainer block (which the shipped copy drops) pulled a
// page no student text reaches into the tarball: the-machine-you-just-met's
// maintainer note shipped why-mostly-right-fails, an unowned ex-Claude-Basics
// lecture. Invariant: every shipped lecture/exercise is linked from some other
// shipped file or from a training page's student text, i.e. from text a
// student can read. Training pages reach students through the workbook, not
// the tarball; the builder's TRAINER_ONLY list is read from the script.
const { test } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const { execFileSync } = require('node:child_process')

const repo = path.resolve(__dirname, '..')

// One build, read by every test below.
const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'ae101-reach-'))
const out = path.join(dir, 'c.tar.gz')
execFileSync('bash', ['scripts/build-ae101-content-tarball.sh', out], { cwd: repo, stdio: 'ignore' })
const x = path.join(dir, 'x'); fs.mkdirSync(x)
execFileSync('tar', ['xzf', out, '-C', x])
const files = execFileSync('find', [x, '-name', '*.md'], { encoding: 'utf8' }).split('\n').filter(Boolean)
const shippedText = () => new Map(files.map(f => [path.relative(x, f), fs.readFileSync(f, 'utf8')]))

test('every shipped lecture and exercise is reached from shipped text', () => {
  const text = shippedText()
  const shipped = [...text.keys()].filter(f => /^(lectures|exercises)\//.test(f))
  assert.ok(shipped.length > 10, `only ${shipped.length} lectures/exercises shipped`)
  const script = fs.readFileSync(path.join(repo, 'scripts/build-ae101-content-tarball.sh'), 'utf8')
  const trainerOnly = script.match(/TRAINER_ONLY=\(([^)]*)\)/)[1].split(/\s+/).filter(Boolean)
  assert.ok(trainerOnly.length > 0)
  const tdir = path.join(repo, 'curriculum/trainings/agentic-engineering-101')
  for (const f of fs.readdirSync(tdir).filter(f => f.endsWith('.md') && !trainerOnly.includes(f))) {
    text.set(`training:${f}`, fs.readFileSync(path.join(tdir, f), 'utf8').split('<!-- maintainer -->')[0])
  }
  const unreached = shipped.filter(f => ![...text].some(([g, body]) => g !== f && body.includes(f)))
  assert.deepEqual(unreached, [])
})

// The registries (prompts/, figures/) hold every training's entries. This
// tarball is one training's: it carries the entries its own pages name, by
// `{{prompt:<key>}}` / `{{figure:<key>}}` marker or by path, and no others.
for (const kind of ['prompt', 'figure']) {
  test(`every shipped ${kind} is named by a shipped page, and every named ${kind} ships`, () => {
    const text = shippedText()
    const dirName = `${kind}s/`
    const shipped = [...text.keys()].filter(f => f.startsWith(dirName)).map(f => f.slice(dirName.length, -3)).sort()
    assert.ok(shipped.length > 0, `no ${kind}s shipped: the check read nothing`)
    const named = new Set()
    for (const [f, body] of text) {
      if (f.startsWith(dirName)) continue
      for (const m of body.matchAll(new RegExp(`\\{\\{${kind}:([a-z0-9-]+)\\}\\}|${kind}s/([a-z0-9-]+)\\.md`, 'g'))) named.add(m[1] || m[2])
    }
    assert.ok(named.size > 0, `no ${kind} named by any shipped page: the check read nothing`)
    assert.deepEqual(shipped.filter(k => !named.has(k)), [], `shipped but named by no shipped page`)
    assert.deepEqual([...named].filter(k => !shipped.includes(k)).sort(), [], `named by a shipped page but not shipped`)
  })
}

// A prompt file's frontmatter is the authoring record: where the prompt came
// from, what it depends on, notes to the next author. The student's copy keeps
// the fields that tell them how to run it.
test('shipped prompts carry only the fields a student runs them by', () => {
  const STUDENT_FIELDS = ['key', 'dest', 'context', 'runtime', 'permission-mode']
  const text = shippedText()
  const prompts = [...text].filter(([f]) => f.startsWith('prompts/'))
  assert.ok(prompts.length > 0)
  for (const [f, body] of prompts) {
    const fm = /^---\n([\s\S]*?)\n---\n/.exec(body)
    assert.ok(fm, `${f}: frontmatter block`)
    const keys = fm[1].split('\n').filter(l => /^[a-z-]+:/.test(l)).map(l => l.split(':')[0])
    assert.ok(keys.includes('key'), `${f}: keeps its key`)
    assert.deepEqual(keys.filter(k => !STUDENT_FIELDS.includes(k)), [], `${f}: authoring fields shipped`)
    assert.ok(fm[1].split('\n').every(l => /^[a-z-]+:/.test(l)), `${f}: no multi-line field survives`)
  }
})

// The licence terms forbid removing the copyright notice, so the archive has
// to carry one to begin with.
test('the tarball carries the copyright notice at its root', () => {
  const notice = fs.readFileSync(path.join(x, 'COPYRIGHT.md'), 'utf8')
  assert.match(notice, /Copyright \(c\) \d{4} \*\*Bosser Oy\*\*/)
  assert.equal(notice, fs.readFileSync(path.join(repo, 'content/PAYLOAD-COPYRIGHT.md'), 'utf8'), 'one source for the shipped notice')
})

// Third-party material ships with the notice its licence asks for: one source
// file, carried at the archive root beside the copyright notice.
test('the tarball carries the third-party notices at its root', () => {
  const notices = fs.readFileSync(path.join(x, 'THIRD-PARTY-NOTICES.md'), 'utf8')
  assert.equal(notices, fs.readFileSync(path.join(repo, 'content/THIRD-PARTY-NOTICES.md'), 'utf8'), 'one source for the shipped notices')
  assert.match(notices, /Permission is hereby granted, free of charge/, 'an MIT-licensed source needs its permission notice in full')
})

// A page that credits an MIT-licensed repository is adapting it, so the
// notices have to name that repository's copyright holder.
test('every MIT repository a shipped page credits has its copyright line in the notices', () => {
  const notices = fs.readFileSync(path.join(repo, 'content/THIRD-PARTY-NOTICES.md'), 'utf8')
  const credited = new Set()
  for (const [, body] of shippedText()) for (const m of body.matchAll(/github\.com\/([\w.-]+\/[\w.-]+)\/blob\//g)) credited.add(m[1])
  assert.ok(credited.size > 0, 'no credited repository found: the check read nothing')
  for (const r of credited) assert.ok(notices.includes(r), `${r} is credited by a shipped page and absent from the notices`)
})
