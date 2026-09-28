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

test('every shipped lecture and exercise is reached from shipped text', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'ae101-reach-'))
  const out = path.join(dir, 'c.tar.gz')
  execFileSync('bash', ['scripts/build-ae101-content-tarball.sh', out], { cwd: repo, stdio: 'ignore' })
  const x = path.join(dir, 'x'); fs.mkdirSync(x)
  execFileSync('tar', ['xzf', out, '-C', x])
  const files = execFileSync('find', [x, '-name', '*.md'], { encoding: 'utf8' }).split('\n').filter(Boolean)
  const text = new Map(files.map(f => [path.relative(x, f), fs.readFileSync(f, 'utf8')]))
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

test('the M7 unattended-agent lab ships as an executable, dependency-free scaffold', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'ae101-m7-lab-'))
  const out = path.join(dir, 'c.tar.gz')
  execFileSync('bash', ['scripts/build-ae101-content-tarball.sh', out], { cwd: repo, stdio: 'ignore' })
  const x = path.join(dir, 'x'); fs.mkdirSync(x)
  execFileSync('tar', ['xzf', out, '-C', x])
  const lab = path.join(x, 'labs', 'unattended-agent')
  assert.ok(fs.existsSync(path.join(lab, 'src', 'real-worker.mjs')))
  execFileSync('npm', ['test'], { cwd: lab, stdio: 'ignore' })
  execFileSync('npm', ['run', 'tour'], { cwd: lab, stdio: 'ignore' })
})
