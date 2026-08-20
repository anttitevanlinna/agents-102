'use strict'
// sim-freshness classifies a cache against the file it claims to describe. The
// classification is the whole product, so every test here fixes one verdict
// boundary against a real git repo — a mocked history would not exercise the
// cat-file batch parse, which is where the byte-walking lives.
const { test } = require('node:test')
const assert = require('node:assert')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const crypto = require('node:crypto')
const { execFileSync } = require('node:child_process')
const { classify, historyShas } = require('./sim-freshness.js')

const sha256 = s => crypto.createHash('sha256').update(s).digest('hex')

// A throwaway repo with one surface committed twice: once with a body edit,
// once with a maintainer-region-only edit. Those two commits are the only
// anchors any test below needs.
function fixture() {
  const repo = fs.mkdtempSync(path.join(os.tmpdir(), 'simfresh-'))
  const rel = 'curriculum/lectures/a-lecture.md'
  fs.mkdirSync(path.join(repo, path.dirname(rel)), { recursive: true })
  const git = (...args) => execFileSync('git', args, { cwd: repo, encoding: 'utf8', stdio: 'pipe' })
  git('init', '-q')
  git('config', 'user.email', 't@t')
  git('config', 'user.name', 't')

  const v1 = '# A lecture\n\nThe original body sentence.\n\n<!-- maintainer -->\n**Quality:** writing PASS\n'
  fs.writeFileSync(path.join(repo, rel), v1)
  git('add', rel); git('commit', '-qm', 'v1')

  const v2 = v1.replace('The original body sentence.', 'The body sentence, rewritten.')
  fs.writeFileSync(path.join(repo, rel), v2)
  git('add', rel); git('commit', '-qm', 'v2')

  const v3 = v2.replace('writing PASS', 'writing PASS, story PASS')
  fs.writeFileSync(path.join(repo, rel), v3)
  git('add', rel); git('commit', '-qm', 'v3 stamp')

  return { repo, rel, v1, v2, v3 }
}

test('a trace matching the file right now is fresh', () => {
  const { repo, rel, v3 } = fixture()
  const v = classify(repo, rel, { content_sha: sha256(v3) }, v3)
  assert.strictEqual(v.verdict, 'fresh')
})

test('a trace anchored before a stamp-only edit is stamp-only, not body-moved', () => {
  // This is the common case by construction: update-quality.sh writes the
  // Quality line AFTER the judge runs, so the trace that earned a stamp never
  // matches the stamped file. Misfiling it as body-moved would make the whole
  // report cry wolf.
  const { repo, rel, v2, v3 } = fixture()
  const v = classify(repo, rel, { content_sha: sha256(v2) }, v3)
  assert.strictEqual(v.verdict, 'stamp-only', v.note)
})

test('a trace anchored before a body edit is body-moved', () => {
  const { repo, rel, v1, v3 } = fixture()
  const v = classify(repo, rel, { content_sha: sha256(v1) }, v3)
  assert.strictEqual(v.verdict, 'body-moved', v.note)
  assert.match(v.note, /body line/)
})

test('a sha matching no committed version is unanchored, never silently aged', () => {
  const { repo, rel, v3 } = fixture()
  const v = classify(repo, rel, { content_sha: sha256('a body this repo never held') }, v3)
  assert.strictEqual(v.verdict, 'unanchored')
})

test('a missing or malformed content_sha is unanchored, not fresh', () => {
  // The dangerous default. A trace with no hash cannot be checked, so the only
  // safe reading is the pessimistic one — treating it as fresh would let the
  // exact artefact the cache rule was written about pass as clean.
  const { repo, rel, v3 } = fixture()
  assert.strictEqual(classify(repo, rel, {}, v3).verdict, 'unanchored')
  assert.strictEqual(classify(repo, rel, { content_sha: 'dfbe468d3de2d423' }, v3).verdict, 'unanchored')
  assert.strictEqual(classify(repo, rel, { content_sha: 42 }, v3).verdict, 'unanchored')
})

test('historyShas reads every distinct version through one cat-file batch', () => {
  const { repo, rel, v1, v2, v3 } = fixture()
  const got = historyShas(repo, rel).map(h => h.sha)
  for (const [label, body] of [['v1', v1], ['v2', v2], ['v3', v3]]) {
    assert.ok(got.includes(sha256(body)), `${label} missing — the batch parse dropped a record`)
  }
})

test('the history memo is keyed by repo, not by path alone', () => {
  // Two repos can hold the same relative path with different histories. A memo
  // keyed on the path alone answers the second repo out of the first one's
  // cache — and because the answer is well-formed, the wrong verdict is
  // indistinguishable from the right one. Same shape as the cache rule this
  // whole script exists to enforce, one layer down.
  const a = fixture()
  const b = fixture()
  fs.writeFileSync(path.join(b.repo, b.rel), '# Different\n\nA body only repo B ever held.\n')
  execFileSync('git', ['add', b.rel], { cwd: b.repo })
  execFileSync('git', ['commit', '-qm', 'b-only'], { cwd: b.repo, env: { ...process.env, GIT_AUTHOR_NAME: 't', GIT_AUTHOR_EMAIL: 't@t', GIT_COMMITTER_NAME: 't', GIT_COMMITTER_EMAIL: 't@t' } })

  historyShas(a.repo, a.rel) // prime the memo under repo A
  const onlyInB = sha256('# Different\n\nA body only repo B ever held.\n')
  assert.ok(historyShas(b.repo, b.rel).some(h => h.sha === onlyInB),
    'repo B was answered from repo A\'s cache')
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
