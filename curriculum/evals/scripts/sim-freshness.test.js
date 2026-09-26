'use strict'
// A trace binds to the file the way an eval instance does: its content_sha is
// the sha256 of the whole raw file, and update-quality.sh advances it on the
// stamper's own writes. Any other change makes it stale. No history walk.
const { test } = require('node:test')
const assert = require('node:assert')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const crypto = require('node:crypto')
const { execFileSync } = require('node:child_process')
const { classify } = require('./sim-freshness.js')

const sha256 = s => crypto.createHash('sha256').update(s).digest('hex')
const BODY = '# A lecture\n\nThe body.\n\n<!-- maintainer -->\n**Quality:** writing PASS\n'

test('a trace matching the file right now is fresh', () => {
  assert.strictEqual(classify({ content_sha: sha256(BODY) }, BODY).verdict, 'fresh')
})

test('any other version is stale, a maintainer-only edit included', () => {
  const stamped = BODY.replace('writing PASS', 'writing PASS, story PASS')
  assert.strictEqual(classify({ content_sha: sha256(BODY) }, stamped).verdict, 'stale')
})

test('a missing or malformed content_sha is unanchored, not fresh', () => {
  assert.strictEqual(classify({}, BODY).verdict, 'unanchored')
  assert.strictEqual(classify({ content_sha: 'dfbe468d3de2d423' }, BODY).verdict, 'unanchored')
  assert.strictEqual(classify({ content_sha: 42 }, BODY).verdict, 'unanchored')
})

test('a behavior trace binds to the raw file too, prompt markers and all', () => {
  const { collect } = require('./sim-freshness.js')
  const repo = fs.mkdtempSync(path.join(os.tmpdir(), 'simfresh-'))
  const rel = 'curriculum/trainings/agentic-engineering-101/m.md'
  const raw = '# M\n\n{{prompt:some-key}}\n'
  fs.mkdirSync(path.join(repo, path.dirname(rel)), { recursive: true })
  fs.writeFileSync(path.join(repo, rel), raw)
  fs.mkdirSync(path.join(repo, 'curriculum/evals/sim-cache'), { recursive: true })
  fs.writeFileSync(path.join(repo, 'curriculum/evals/sim-cache/ae101--module--m.behavior.json'), JSON.stringify({ content_sha: sha256(raw) }))
  const rows = collect(repo, 'all')
  assert.strictEqual(rows.length, 1)
  assert.strictEqual(rows[0].verdict, 'fresh', rows[0].note)
})

test('a customer-variant trace resolves to the surface it walked', () => {
  // Traces are named `<training>--[<variant>-]<slug>`: `autumn-learn-from-the-test`
  // and `northwind-learn-from-the-test` are two personas walking ONE file. Taking
  // the last `--` segment whole leaves both orphaned — and an orphan carries no
  // mood, so the two lowest scores in the corpus went unread precisely because
  // they were the customer-specific runs.
  const { slugIndex, resolveSlug } = require('./sim-freshness.js')
  const idx = new Map([['learn-from-the-test', 'curriculum/trainings/ae101/learn-from-the-test.md']])
  assert.strictEqual(resolveSlug(idx, 'ae101--autumn-learn-from-the-test'),
    'curriculum/trainings/ae101/learn-from-the-test.md')
  assert.strictEqual(resolveSlug(idx, 'ae101--exercise--learn-from-the-test'),
    'curriculum/trainings/ae101/learn-from-the-test.md')
  assert.strictEqual(resolveSlug(idx, 'ae101--nothing-of-the-kind'), null)
  assert.ok(typeof slugIndex === 'function')
})

test('a same-slug collision resolves to the training the trace names', () => {
  // `getting-going` and `prework` exist in BOTH ae101 and agents-101. The stem
  // carries the training precisely so the two never collide — but resolveSlug
  // took `stem.split('--').pop()` and threw the prefix away, and slugIndex is
  // first-wins over a directory listing where `agentic-engineering-101` sorts
  // ahead of `agents-101`. So every agents-101 getting-going trace was being
  // classified against AE101's body: a wrong freshness verdict, not a display
  // nit, and it surfaced under `--training ae101` wearing an agents-101 name.
  const { resolveSlug } = require('./sim-freshness.js')
  const idx = new Map([
    ['getting-going', 'curriculum/trainings/agentic-engineering-101/getting-going.md'],
    ['ae101::getting-going', 'curriculum/trainings/agentic-engineering-101/getting-going.md'],
    ['agents-101::getting-going', 'curriculum/trainings/agents-101/getting-going.md'],
  ])
  assert.strictEqual(resolveSlug(idx, 'agents-101--module--getting-going'),
    'curriculum/trainings/agents-101/getting-going.md')
  assert.strictEqual(resolveSlug(idx, 'ae101--module--getting-going'),
    'curriculum/trainings/agentic-engineering-101/getting-going.md')
})

test('a training-scoped miss does not silently fall through to another training', () => {
  // Falling back to the bare slug is right when the training simply has no
  // scoped entry (an older index, a shared-pool file). It is wrong when the
  // named training exists in the index and does not own this slug — that is the
  // collision above wearing a different hat.
  const { resolveSlug } = require('./sim-freshness.js')
  const idx = new Map([
    ['prework', 'curriculum/trainings/agentic-engineering-101/prework.md'],
    ['ae101::prework', 'curriculum/trainings/agentic-engineering-101/prework.md'],
    ['agents-101::getting-going', 'curriculum/trainings/agents-101/getting-going.md'],
  ])
  assert.strictEqual(resolveSlug(idx, 'agents-101--module--prework'), null)
})

test('an UNOWNED shared file still resolves — strictness is about collisions, not orphans', () => {
  // The refusal above exists to stop one training's trace binding to another
  // training's body. A shared-pool file that NO training links has no scoped key
  // at all, and refusing it there turned two real, resolvable agents-101 traces
  // into reported orphans. The test is whether the bare hit belongs to a
  // DIFFERENT training, not whether a scoped key happens to exist.
  const { resolveSlug } = require('./sim-freshness.js')
  const idx = new Map([
    ['ground-your-output', 'curriculum/exercises/ground-your-output.md'],   // no scoped key: unowned
    ['agents-101::getting-going', 'curriculum/trainings/agents-101/getting-going.md'],
    ['getting-going', 'curriculum/trainings/agents-101/getting-going.md'],
  ])
  assert.strictEqual(resolveSlug(idx, 'agents-101--exercise--ground-your-output'),
    'curriculum/exercises/ground-your-output.md')
  assert.strictEqual(resolveSlug(idx, 'ae101--exercise--ground-your-output'),
    'curriculum/exercises/ground-your-output.md', 'unowned means anyone may name it')
})

test('slugIndex keys a module both bare and training-scoped, and keeps both trainings', () => {
  const { slugIndex } = require('./sim-freshness.js')
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'simfresh-idx-'))
  const body = '# T\n\nStudent body.\n\n<!-- maintainer -->\n**Quality:** writing PASS\n'
  for (const t of ['agentic-engineering-101', 'agents-101']) {
    fs.mkdirSync(path.join(root, 'curriculum/trainings', t), { recursive: true })
    fs.writeFileSync(path.join(root, 'curriculum/trainings', t, 'getting-going.md'), body)
  }
  const idx = slugIndex(root)
  assert.ok(idx.has('getting-going'), 'bare slug key kept for back-compat')
  assert.strictEqual(idx.get('ae101::getting-going'),
    'curriculum/trainings/agentic-engineering-101/getting-going.md')
  assert.strictEqual(idx.get('agents-101::getting-going'),
    'curriculum/trainings/agents-101/getting-going.md')
  // The bug in one line: the bare key can only name one of the two.
  assert.notStrictEqual(idx.get('ae101::getting-going'), idx.get('agents-101::getting-going'))
})

test('a slug that is both a module and an exercise resolves by the type segment', () => {
  // `spot-gaps-build-the-loop` is a real AE101 module AND a real AE101 exercise.
  // The trace stem carries `module` / `exercise` precisely to tell them apart,
  // and resolveSlug read only the last segment — so the MODULE's persona trace
  // was classified against the EXERCISE's body, and check-trace-names would have
  // renamed it onto the exercise's own name and deleted one of the two.
  const { resolveSlug } = require('./sim-freshness.js')
  const M = 'curriculum/trainings/agentic-engineering-101/spot-gaps-build-the-loop.md'
  const E = 'curriculum/exercises/spot-gaps-build-the-loop.md'
  const idx = new Map([
    ['spot-gaps-build-the-loop', M],
    ['ae101::spot-gaps-build-the-loop', E],
    ['ae101::module::spot-gaps-build-the-loop', M],
    ['ae101::exercise::spot-gaps-build-the-loop', E],
  ])
  assert.strictEqual(resolveSlug(idx, 'ae101--module--spot-gaps-build-the-loop'), M)
  assert.strictEqual(resolveSlug(idx, 'ae101--exercise--spot-gaps-build-the-loop'), E)
})

test('a variant stem still resolves when no type segment is present', () => {
  const { resolveSlug } = require('./sim-freshness.js')
  const M = 'curriculum/trainings/ae/learn-from-the-test.md'
  const idx = new Map([
    ['learn-from-the-test', M],
    ['ae101::learn-from-the-test', M],
    ['ae101::module::learn-from-the-test', M],
  ])
  assert.strictEqual(resolveSlug(idx, 'ae101--autumn-learn-from-the-test'), M)
  assert.strictEqual(resolveSlug(idx, 'ae101--module--learn-from-the-test'), M)
})

test('a type segment naming a type the slug does not have falls back, it does not fail', () => {
  // `ae101--lecture--fork-the-worktree` when fork-the-worktree is an exercise:
  // the type is wrong but the training and slug are right, and refusing here
  // would orphan a trace whose file is unambiguous.
  const { resolveSlug } = require('./sim-freshness.js')
  const E = 'curriculum/exercises/fork-the-worktree.md'
  const idx = new Map([
    ['fork-the-worktree', E],
    ['ae101::fork-the-worktree', E],
    ['ae101::exercise::fork-the-worktree', E],
  ])
  assert.strictEqual(resolveSlug(idx, 'ae101--lecture--fork-the-worktree'), E)
})

test('slugIndex keys a same-slug module/exercise pair separately by type', () => {
  const { slugIndex } = require('./sim-freshness.js')
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'simfresh-type-'))
  const body = '# T\n\nStudent body.\n\n<!-- maintainer -->\n**Quality:** writing PASS\n'
  fs.mkdirSync(path.join(root, 'curriculum/trainings/agentic-engineering-101'), { recursive: true })
  fs.mkdirSync(path.join(root, 'curriculum/exercises'), { recursive: true })
  fs.writeFileSync(path.join(root, 'curriculum/trainings/agentic-engineering-101/dual.md'),
    `${body}\n[Ex](exercises/dual.md)\n`)
  fs.writeFileSync(path.join(root, 'curriculum/exercises/dual.md'), body)
  const idx = slugIndex(root)
  assert.strictEqual(idx.get('ae101::module::dual'), 'curriculum/trainings/agentic-engineering-101/dual.md')
  assert.strictEqual(idx.get('ae101::exercise::dual'), 'curriculum/exercises/dual.md')
  assert.notStrictEqual(idx.get('ae101::module::dual'), idx.get('ae101::exercise::dual'))
})

test('an orphaned trace does not leak into every training\'s report', () => {
  // The two `unresolved` pushes sat ABOVE the training filter, so a trace whose
  // slug resolves to nothing appeared under `--training ae101`, `agents-101` and
  // `claude-basics` alike. Four rows in the AE101 mood report on 2026-08-24 were
  // other trainings' or nobody's, which is how a no-score list reads longer than
  // the hole it describes.
  const { collect } = require('./sim-freshness.js')
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'simfresh-leak-'))
  fs.mkdirSync(path.join(root, 'curriculum/evals/sim-cache'), { recursive: true })
  fs.mkdirSync(path.join(root, 'curriculum/trainings/agentic-engineering-101'), { recursive: true })
  fs.writeFileSync(path.join(root, 'curriculum/trainings/agentic-engineering-101/real.md'),
    '# Real\n\nStudent body.\n\n<!-- maintainer -->\n**Quality:** writing PASS\n')
  const w = (n, o) => fs.writeFileSync(path.join(root, 'curriculum/evals/sim-cache', n), JSON.stringify(o))
  w('agents-101--module--nowhere.persona.json', { phases: [] })
  w('no-prefix-at-all.persona.json', { phases: [] })

  const ae = collect(root, 'ae101').map(r => r.name)
  assert.ok(!ae.includes('agents-101--module--nowhere.persona.json'),
    'a trace naming another training must not appear under this one')

  const all = collect(root, 'all').map(r => r.name)
  assert.ok(all.includes('agents-101--module--nowhere.persona.json'), 'still visible under --training all')
  assert.ok(all.includes('no-prefix-at-all.persona.json'), 'a prefix-less orphan is still reported somewhere')
})

test('moodBeats reads every phase score and the close, and stays silent otherwise', () => {
  const { moodBeats } = require('./sim-freshness.js')
  const beats = moodBeats({
    phases: [
      { phase_index: 1, phase_name: 'One', mood_score: 8, mood_note: 'fine' },
      { phase_index: 2, phase_name: 'Two' },
      { phase_index: 3, phase_name: 'Three', mood_score: 6, mood_note: 'flat' },
    ],
    close: { mood_score: 5, mood_note: 'lost it' },
  })
  assert.deepStrictEqual(beats.map(b => b.score), [8, 6, 5], 'an unscored phase must not become a zero')
  assert.strictEqual(beats.at(-1).at, 'close')
  assert.deepStrictEqual(moodBeats({ phases: [] }), [], 'no scores means no beats, never an implied pass')
})

test('moodBeats reads the current persona-array trace shape', () => {
  const { moodBeats } = require('./sim-freshness.js')
  const beats = moodBeats({
    personas: [{
      persona: 'SVP operator',
      phases: [
        { phase_index: 1, phase_name: 'Start', mood_score: 8, mood_note: 'engaged' },
        { phase_index: 2, phase_name: 'Build' },
      ],
      close: { mood_score: 9, mood_note: 'ready' },
    }],
  })
  assert.deepStrictEqual(beats.map(b => b.score), [8, 9])
  assert.deepStrictEqual(beats.map(b => b.at), ['phase 1: Start', 'close'])
})

// The bug this guards, and it is the expensive one: `personas` ships in TWO
// shapes — an array of persona objects, and a map keyed by persona name — and
// the reader only knew the array. `Array.isArray` was false for the map, so it
// fell through to `trace.phases`, found none, and returned zero beats. Two
// AE101 traces carried twelve real scores that appeared in no distribution, no
// below-bar list, and no --gate decision: the gate could not fail on a number
// it never read. A reader that silently returns [] for a shape it does not know
// reports a clean board and an unrun instrument from the same silence.
test('moodBeats reads the persona-MAP shape and keeps whose beat it is', () => {
  const { moodBeats } = require('./sim-freshness.js')
  const beats = moodBeats({
    personas: {
      'mid-layer-competent': {
        phases: [{ phase_index: 1, phase_name: 'Whole module', mood_score: 8, mood_note: 'lands' }],
        close: { mood_score: 9, mood_note: 'ready' },
      },
      'fast-operator': {
        phases: [{ phase_index: 1, phase_name: 'Whole module', mood_score: 6, mood_note: 'impatient' }],
      },
    },
  })
  assert.deepStrictEqual(beats.map(b => b.score), [8, 9, 6])
  assert.deepStrictEqual(beats.map(b => b.at), [
    'mid-layer-competent · phase 1: Whole module',
    'mid-layer-competent · close',
    'fast-operator · phase 1: Whole module',
  ], 'three personas reading one file produce three beats that must be tellable apart')
})

test('moodExemptions reads the persona-MAP shape too', () => {
  const { moodExemptions } = require('./sim-freshness.js')
  const exempt = moodExemptions({
    personas: { 'fast-operator': { phases: [{ phase_index: 1, phase_name: 'Setup', mood_note: 'mood-floor exempt' }] } },
  })
  assert.deepStrictEqual(exempt.map(e => e.at), ['fast-operator · phase 1: Setup'])
})

// The bug this guards: the mood report counted any trace with no NUMERIC beat
// as "the instrument did not run", and printed it under a heading saying the
// persona run is required for exercises. Three AE101 traces sat on that list
// while their single beat carried an explicit written exemption — a SETUP beat
// the mood floor does not reach (check_strategy_tie_in §1). The instrument had
// run and abstained for a stated reason. A reasoned null is a result; only a
// null with nothing beside it is a hole, and telling them apart is the whole
// value of the row.
test('moodExemptions: a beat that abstains WITH a reason is exempt, not unrun', () => {
  const { moodExemptions } = require('./sim-freshness.js')
  const exempt = moodExemptions({
    phases: [{ phase_index: 1, phase_name: 'Setup', mood_score: null, mood_note: 'Mood-exempt SETUP beat per check_strategy_tie_in §1' }],
  })
  assert.deepStrictEqual(exempt.map(e => e.at), ['phase 1: Setup'])
  assert.match(exempt[0].note, /check_strategy_tie_in/)

  assert.deepStrictEqual(
    moodExemptions({ phases: [{ phase_index: 1, phase_name: 'Setup' }] }), [],
    'silence with no reason beside it is not an exemption — that is the real hole')
  assert.deepStrictEqual(moodExemptions({ phases: [] }), [], 'no phases is no exemption either')
  assert.deepStrictEqual(
    moodExemptions({ phases: [{ phase_index: 1, phase_name: 'One', mood_score: 8, mood_note: 'fine' }] }), [],
    'a scored beat is scored, never also exempt')
})

test('moodExemptions reads the persona-array shape too', () => {
  const { moodExemptions } = require('./sim-freshness.js')
  const exempt = moodExemptions({
    personas: [{
      persona: 'IC engineer',
      phases: [{ phase_index: 1, phase_name: 'Fork', mood_note: 'Setup beat — mood-floor exempt' }],
    }],
  })
  assert.deepStrictEqual(exempt.map(e => e.at), ['phase 1: Fork'])
})
