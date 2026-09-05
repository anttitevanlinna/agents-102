#!/usr/bin/env node
// Tests for scan-stale-classes.js — diff-region → judge-class routing.
'use strict'
const assert = require('node:assert')
const { parseHunks, buildLineMeta, changeTags, extractPins, filterItems, scanFile, typeOf, trainingOf } = require('./scan-stale-classes.js')

let n = 0
function test(name, fn) { fn(); n++; console.log(`ok ${n} - ${name}`) }

// --- parseHunks ---
test('parseHunks: full header', () => {
  assert.deepStrictEqual(parseHunks('@@ -10,3 +12,4 @@ ctx\n+a\n'), [{ oldStart: 10, oldLen: 3, start: 12, len: 4, added: [12], removedAt: [], removedText: [] }])
})
test('parseHunks: single-line shorthand', () => {
  assert.deepStrictEqual(parseHunks('@@ -5 +6 @@\n'), [{ oldStart: 5, oldLen: 1, start: 6, len: 1, added: [], removedAt: [], removedText: [] }])
})
test('parseHunks: pure deletion', () => {
  assert.deepStrictEqual(parseHunks('@@ -8,2 +7,0 @@\n-x\n-y\n'), [{ oldStart: 8, oldLen: 2, start: 7, len: 0, added: [], removedAt: [7, 7], removedText: ['x', 'y'] }])
})

// --- fixture file ---
const DOC = [
  '# Title',                    // 1
  'intro prose line',           // 2  opener
  '',                           // 3
  '## Big Idea',                // 4
  'the idea sentence',          // 5  big-idea section
  '',                           // 6
  '## Phase 1 — build',         // 7
  '**Time:** 10 min',           // 8
  'phase prose step',           // 9  plain prose in phase
  '```bash',                    // 10 fence delimiter
  'echo hi',                    // 11 fence interior
  '```',                        // 12 fence delimiter
  'line with {{prompt:my-key}}',// 13
  'a cite https://example.com', // 14
  '',                           // 15
  '## Bridge',                  // 16
  'bridge prose',               // 17 close section
  '',                           // 18
  '<!-- maintainer -->',        // 19
  '**Quality:** compendium-audited 2026-07-01 (writing@aaa1111 story@aaa1111 technical@bbb2222 behavior@bbb2222 pedagogy@aaa1111 strategy@aaa1111 slides@aaa1111)',
  '- judges 2026-07-01 (writing PASS, story PASS)',
].join('\n')

test('buildLineMeta: regions and sections', () => {
  const m = buildLineMeta(DOC)
  assert.strictEqual(m[1].opener, true)              // line 2
  assert.strictEqual(m[4].section, 'big idea')       // line 5
  assert.strictEqual(m[10].region, 'fence')          // line 11
  assert.strictEqual(m[9].region, 'fence')           // delimiter counts as fence
  assert.strictEqual(m[16].close, true)              // line 17 in last ## section
  assert.strictEqual(m[18].region, 'maintainer')     // line 19
  assert.strictEqual(m[19].region, 'maintainer')
  assert.strictEqual(m[6].heading, true)             // line 7
})

function tagsFor(hunks) {
  const meta = buildLineMeta(DOC)
  return changeTags(meta, hunks).tags
}

test('changeTags: plain mid-file prose → writing+slides only', () => {
  const t = tagsFor([{ oldStart: 9, oldLen: 1, start: 9, len: 1 }])
  assert.deepStrictEqual([...t].sort(), ['slides', 'writing'])
})
test('changeTags: Big Idea line → strategy+story', () => {
  const t = tagsFor([{ oldStart: 5, oldLen: 1, start: 5, len: 1 }])
  assert(t.has('strategy') && t.has('story') && t.has('writing') && t.has('slides'))
  assert(!t.has('pedagogy'))
})
test('changeTags: Time line → pedagogy', () => {
  const t = tagsFor([{ oldStart: 8, oldLen: 1, start: 8, len: 1 }])
  assert(t.has('pedagogy'))
  assert(!t.has('strategy'))
})
test('changeTags: fence interior → technical only, no body count', () => {
  const r = changeTags(buildLineMeta(DOC), [{ oldStart: 11, oldLen: 1, start: 11, len: 1 }])
  assert.deepStrictEqual([...r.tags].sort(), ['technical'])
  assert.strictEqual(r.changedBody, 0)
})
test('changeTags: prompt include line → behavior+technical+pedagogy', () => {
  const t = tagsFor([{ oldStart: 13, oldLen: 1, start: 13, len: 1 }])
  assert(t.has('behavior') && t.has('technical') && t.has('pedagogy'))
})
test('changeTags: URL line → technical', () => {
  const t = tagsFor([{ oldStart: 14, oldLen: 1, start: 14, len: 1 }])
  assert(t.has('technical'))
})
test('changeTags: Bridge section → pedagogy+story', () => {
  const t = tagsFor([{ oldStart: 17, oldLen: 1, start: 17, len: 1 }])
  assert(t.has('pedagogy') && t.has('story'))
})
test('changeTags: heading line → story+pedagogy+slides', () => {
  const t = tagsFor([{ oldStart: 7, oldLen: 1, start: 7, len: 1 }])
  assert(t.has('story') && t.has('pedagogy') && t.has('slides'))
})
test('changeTags: maintainer-only edit → no tags', () => {
  const t = tagsFor([{ oldStart: 20, oldLen: 1, start: 20, len: 1 }])
  assert.strictEqual(t.size, 0)
})
test('changeTags: deletion hunk anchors on surrounding body, counts old lines', () => {
  const r = changeTags(buildLineMeta(DOC), [{ oldStart: 9, oldLen: 1, start: 8, len: 0 }])
  assert(r.tags.has('writing'))
  assert.strictEqual(r.changedBody, 1)
})
test('changeTags: bulk change (>15 body lines) → story+pedagogy', () => {
  const t = tagsFor([{ oldStart: 2, oldLen: 1, start: 2, len: 1 },
    ...Array.from({ length: 16 }, () => ({ oldStart: 9, oldLen: 1, start: 9, len: 1 }))])
  assert(t.has('story') && t.has('pedagogy'))
})
test('changeTags: opener edit → story', () => {
  const t = tagsFor([{ oldStart: 2, oldLen: 1, start: 2, len: 1 }])
  assert(t.has('story'))
})

// --- extractPins ---
test('extractPins: per-class shas from top Quality line', () => {
  const pins = extractPins(DOC)
  assert.strictEqual(pins.writing, 'aaa1111')
  assert.strictEqual(pins.technical, 'bbb2222')
  assert.strictEqual(pins.slides, 'aaa1111')
})

// --- filterItems ---
function io(diffByPath, valid = true) {
  return {
    readFile: () => DOC,
    gitDiff: (sha, p) => diffByPath[p] || '',
    validSha: () => valid,
    ruleDrift: () => new Set(), staleFinding: () => false,
  }
}
const ITEM = { file: 'curriculum/exercises/x.md', type: 'exercise', slug: 'x', instanceSlug: 'ae101--exercise--x', classes: ['writing', 'story', 'technical', 'behavior', 'pedagogy', 'strategy', 'slides'] }

test('filterItems: mid-file prose edit keeps writing+slides, prunes rest', () => {
  const { items, report } = filterItems([ITEM], io({ 'curriculum/exercises/x.md': '@@ -9,1 +9,1 @@\n-old\n+new\n' }))
  assert.deepStrictEqual(items[0].classes.sort(), ['slides', 'writing'])
  assert.strictEqual(report[0].pruned.length, 5)
})
test('filterItems: registry prompt change keeps behavior', () => {
  const { items } = filterItems([ITEM], io({
    'curriculum/exercises/x.md': '@@ -9,1 +9,1 @@\n-old\n+new\n',
    'curriculum/prompts/my-key.md': '@@ -1,1 +1,1 @@\n-a\n+b\n',
  }))
  assert(items[0].classes.includes('behavior'))
})
test('filterItems: unpinned class always kept', () => {
  const noPinDoc = DOC.replace(/behavior@bbb2222 /, '')
  const myIo = { readFile: () => noPinDoc, gitDiff: () => '', validSha: () => true, ruleDrift: () => new Set(), staleFinding: () => false }
  const { items } = filterItems([{ ...ITEM, classes: ['behavior'] }], myIo)
  assert.deepStrictEqual(items[0].classes, ['behavior'])
})
test('filterItems: bad sha kept as stale', () => {
  const { items } = filterItems([{ ...ITEM, classes: ['writing'] }], io({}, false))
  assert.deepStrictEqual(items[0].classes, ['writing'])
})
test('filterItems: no diff at all → all pinned classes pruned', () => {
  const { items } = filterItems([ITEM], io({}))
  assert.deepStrictEqual(items[0].classes, [])
})

/*
 * Context lines are not changes.
 *
 * git pads every hunk with up to 3 unchanged lines on each side. The first cut
 * walked the hunk's RANGE, so those context lines were tagged as edits — and
 * because `<!-- maintainer -->` sits immediately after the last body line, ANY
 * note added at the top of a maintainer block produced a hunk reaching back
 * into body and falsely staled writing + slides (+ story, when the context hit
 * the closer region). Caught on run-the-first-experiment.md, whose body was
 * byte-identical to its pinned SHA while the scanner demanded three re-fires.
 *
 * The cost is not a wasted run; it is that a staleness signal which fires on
 * maintainer bookkeeping is one nobody keeps believing.
 */
test('changeTags: maintainer note whose hunk context reaches body → no body tags', () => {
  const diff = [
    '@@ -17,3 +17,5 @@ ctx',
    ' body line 17',
    ' body line 18',
    ' <!-- maintainer -->',
    '+**A maintainer note.**',
    '+',
    '',
  ].join('\n')
  const t = tagsFor(parseHunks(diff))
  assert.deepStrictEqual([...t].sort(), [],
    `a maintainer-only edit must not stale body classes, got ${JSON.stringify([...t])}`)
})

/* The other half: a real body edit inside the same hunk shape must still fire. */
test('changeTags: a real body line in the hunk still tags', () => {
  const diff = [
    '@@ -8,3 +8,3 @@ ctx',
    ' ctx line 8',
    '-old prose',
    '+new prose',
    ' ctx line 10',
    '',
  ].join('\n')
  const t = tagsFor(parseHunks(diff))
  assert(t.has('writing') && t.has('slides'),
    `a genuine body edit must still stale writing+slides, got ${JSON.stringify([...t])}`)
})

// --- typeOf: surface derivation drives instanceSlug ---
// Regression 2026-08-07: typeOf had only exercise/lecture cases and fell through
// to 'module' for everything else, so reference/ and supplementary/ files got
// instanceSlug `ae101--module--<slug>` while their instances are written as
// `ae101--reference--<slug>` / `ae101--supplementary--<slug>`. The scanner then
// found no pins and reported every class `never` on files that had just been
// judged clean — a silent "re-run everything" that looks identical to real
// staleness. Directory-derived, matching curriculum-pre-ship-audit's convention.
test('typeOf: exercise', () => {
  assert.strictEqual(typeOf('curriculum/exercises/audit-your-agent.md'), 'exercise')
})
test('typeOf: lecture', () => {
  assert.strictEqual(typeOf('curriculum/lectures/the-whole-map.md'), 'lecture')
})
test('typeOf: module', () => {
  assert.strictEqual(typeOf('curriculum/trainings/agentic-engineering-101/earn-the-trust.md'), 'module')
})
test('typeOf: reference is NOT module', () => {
  assert.strictEqual(typeOf('curriculum/trainings/agentic-engineering-101/reference/mcp-and-connectors.md'), 'reference')
})
test('typeOf: supplementary is NOT module', () => {
  assert.strictEqual(typeOf('curriculum/trainings/agentic-engineering-101/supplementary/the-context-ceiling.md'), 'supplementary')
})
test('typeOf: supplementary wins over the training dir it sits under', () => {
  // both substrings are present in the path; the more specific one must win
  const p = 'curriculum/trainings/agents-101/supplementary/what-is-an-agent.md'
  assert.strictEqual(typeOf(p), 'supplementary')
})
test('instanceSlug for a reference file targets the reference instance', () => {
  const rel = 'curriculum/trainings/agentic-engineering-101/reference/claude-code-for-engineers.md'
  assert.strictEqual(`ae101--${typeOf(rel)}--claude-code-for-engineers`,
    'ae101--reference--claude-code-for-engineers')
})


// --- trainingOf: instance prefix must follow the file's OWNING training -----
//
// Pins a bug found 2026-08-12 (AE101 changed-files re-eval): the instanceSlug
// prefix was hardcoded `ae101--`, so every shared-library file got an AE101
// instance regardless of who owns it. `curriculum/exercises/name-your-challenge.md`
// is linked only from `agents-101/building-agent-systems.md`, and the run wrote
// `ae101--exercise--name-your-challenge.*`. The strategy judge independently
// resolved the file to Agents 101 M2 and disagreed with its own filename.
//
// Files under curriculum/trainings/<t>/ carry the training in the path. Shared
// files (curriculum/exercises/, curriculum/lectures/) do NOT — ownership is
// whichever training's module files link them, so it has to be looked up.
// Ambiguous or unlinked => null, and the caller must warn rather than guess.

test('trainingOf: path-carried training wins (ae101)', () => {
  assert.equal(trainingOf('curriculum/trainings/agentic-engineering-101/getting-going.md'), 'ae101')
})

test('trainingOf: path-carried training wins (agents-101)', () => {
  assert.equal(trainingOf('curriculum/trainings/agents-101/building-agent-systems.md'), 'agents-101')
})

test('trainingOf: path-carried training wins (claude-basics)', () => {
  assert.equal(trainingOf('curriculum/trainings/claude-basics/security.md'), 'claude-basics')
})

test('trainingOf: shared exercise resolves to its single linking training', () => {
  const finder = () => ['agents-101']
  assert.equal(trainingOf('curriculum/exercises/name-your-challenge.md', finder), 'agents-101')
})

test('trainingOf: shared exercise linked only from AE101 resolves to ae101', () => {
  const finder = () => ['agentic-engineering-101']
  assert.equal(trainingOf('curriculum/exercises/compound-and-close.md', finder), 'ae101')
})

test('trainingOf: shared file linked from two trainings is ambiguous → null', () => {
  const finder = () => ['agents-101', 'agentic-engineering-101']
  assert.equal(trainingOf('curriculum/exercises/shared.md', finder), null)
})

test('trainingOf: shared file linked from nowhere → null, never a silent default', () => {
  const finder = () => []
  assert.equal(trainingOf('curriculum/exercises/orphan.md', finder), null)
})

test('trainingOf: duplicate linkers from one training still resolve', () => {
  const finder = () => ['agentic-engineering-101', 'agentic-engineering-101']
  assert.equal(trainingOf('curriculum/exercises/push-back-on-the-plan.md', finder), 'ae101')
})

// --- scanFile: unpinned file falls back to the judges row ---
// The row reads `- judges @sha: writing PASS, story PASS, ...` — the FIRST
// class sits after a colon, every later one after a comma. A `(^|, )` anchor
// matched only the later ones, so the leading class fell through to 'never'
// on every unpinned file: a class judged clean, re-queued forever.
function rowIo(body) {
  return { readFile: () => body, gitDiff: () => '', validSha: () => true, ruleDrift: () => new Set(), staleFinding: () => false }
}
const CLEAN_ROW = '# T\n**Quality:** compendium-audited 2026-01-01 ()\n- judges @abc1234: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS\n'

test('scanFile: unpinned, all-PASS judges row owes nothing (leading class included)', () => {
  assert.deepStrictEqual(scanFile('curriculum/lectures/x.md', rowIo(CLEAN_ROW)).classes, [])
})

test('scanFile: leading class REVISE on the judges row is caught', () => {
  const r = scanFile('curriculum/lectures/x.md', rowIo(CLEAN_ROW.replace('writing PASS', 'writing REVISE')))
  assert.deepStrictEqual(r.classes, ['writing'])
  assert.equal(r.detail.writing, 'revise')
})

test('scanFile: a class absent from the judges row reads as never', () => {
  assert.deepStrictEqual(scanFile('curriculum/lectures/x.md', rowIo(CLEAN_ROW.replace(', slides PASS', ''))).classes, ['slides'])
})

// --- scope classes: cross_module + voice_panel ------------------------------
//
// CLASSES holds the seven PIN classes (a `<class>@<sha>` token on the Quality
// line). cross_module and voice_panel record as their own rows and fire at
// different scope, so they land in `r.extra`, never in `classes`/`detail` —
// those feed per-file judge dispatch, and cross_module is not a per-file judge.
// The trap these pin: a file whose seven pins are clean is exactly the file
// whose scope rows can be stale with nothing reporting it.

const { crossRow, panelRow, EXTRA_CLASSES, CLASSES } = require('./scan-stale-classes.js')

const M6 = [
  '# M6', 'body line', '', '<!-- maintainer -->',
  '**Quality:** compendium-audited 2026-08-19 (writing@aaa1111)',
  '- judges @aaa1111: writing PASS, story PASS, technical PASS, behavior PASS, pedagogy PASS, strategy PASS, slides PASS',
  '- cross_module @ccc3333: PASS — set=[m4,m5,m6]; see instances/x.json',
  '- voice_panel @ccc3333: PLEASED — 6/6 signatures; see instances/x.voice_panel.json',
].join('\n')

test('EXTRA_CLASSES are scope classes, kept out of the seven pin classes', () => {
  assert.deepStrictEqual(EXTRA_CLASSES, ['cross_module', 'voice_panel'])
  for (const c of EXTRA_CLASSES) assert(!CLASSES.includes(c), `${c} must not be a pin class`)
})

test('crossRow: parses sha, verdict and set membership', () => {
  assert.deepStrictEqual(crossRow(M6), { sha: 'ccc3333', verdict: 'PASS', instances: [], set: ['m4', 'm5', 'm6'] })
})
test('crossRow: absent row → null', () => {
  assert.strictEqual(crossRow('# T\n**Quality:** x\n- judges @a: writing PASS\n'), null)
})
test('panelRow: parses sha and verdict', () => {
  assert.deepStrictEqual(panelRow(M6), { sha: 'ccc3333', verdict: 'PLEASED' })
})

// io that serves the module and its set siblings out of one map.
function setIo(files, diffs) {
  return {
    readFile: p => (p in files ? files[p] : null),
    gitDiff: (sha, p) => (diffs[`${sha}:${p}`] || ''),
    validSha: sha => sha !== 'deadbee',
    ruleDrift: () => new Set(), staleFinding: () => false,
  }
}
const DIR = 'curriculum/trainings/agentic-engineering-101'
const SIBLING = '# M\nsome body\n\n<!-- maintainer -->\n**Quality:** x\n'
const BASE_FILES = { [`${DIR}/m6.md`]: M6, [`${DIR}/m4.md`]: SIBLING, [`${DIR}/m5.md`]: SIBLING }
const BODY_EDIT = '@@ -2 +2 @@\n-some body\n+some other body\n'
const MAINTAINER_EDIT = '@@ -5 +5 @@\n-**Quality:** x\n+**Quality:** y\n'

test('cross_module: clean set owes nothing', () => {
  const r = scanFile(`${DIR}/m6.md`, setIo(BASE_FILES, {}))
  assert.strictEqual(r.extra.cross_module, undefined)
})

test('cross_module: a body edit in ANY set member drifts the row', () => {
  const r = scanFile(`${DIR}/m6.md`, setIo(BASE_FILES, { [`ccc3333:${DIR}/m5.md`]: BODY_EDIT }))
  assert.strictEqual(r.extra.cross_module, 'set-drift')
  assert.deepStrictEqual(r.extraDetail.cross_module.drifted, [`${DIR}/m5.md`])
})

test('cross_module: a maintainer-block edit in a member does NOT drift it', () => {
  // same exemption the seven pin classes get — bookkeeping must not stale a judge
  const r = scanFile(`${DIR}/m6.md`, setIo(BASE_FILES, { [`ccc3333:${DIR}/m5.md`]: MAINTAINER_EDIT }))
  assert.strictEqual(r.extra.cross_module, undefined)
})

test('cross_module: the file itself counts as a set member', () => {
  const r = scanFile(`${DIR}/m6.md`, setIo(BASE_FILES, { [`ccc3333:${DIR}/m6.md`]: '@@ -2 +2 @@\n-body line\n+other line\n' }))
  assert.strictEqual(r.extra.cross_module, 'set-drift')
})

test('cross_module: a set member that no longer exists is drift, never silence', () => {
  const files = { ...BASE_FILES }
  delete files[`${DIR}/m4.md`]
  assert.strictEqual(scanFile(`${DIR}/m6.md`, setIo(files, {})).extra.cross_module, 'set-drift')
})

test('cross_module: REVISE on the row outranks a clean set', () => {
  const files = { ...BASE_FILES, [`${DIR}/m6.md`]: M6.replace('cross_module @ccc3333: PASS', 'cross_module @ccc3333: REVISE') }
  assert.strictEqual(scanFile(`${DIR}/m6.md`, setIo(files, {})).extra.cross_module, 'revise')
})

test('cross_module: a pin pointing at no commit is bad-sha', () => {
  const files = { ...BASE_FILES, [`${DIR}/m6.md`]: M6.replace(/@ccc3333: PASS/, '@deadbee: PASS') }
  assert.strictEqual(scanFile(`${DIR}/m6.md`, setIo(files, {})).extra.cross_module, 'bad-sha')
})

test('cross_module: a row with no set= is unverifiable, not clean', () => {
  const files = { ...BASE_FILES, [`${DIR}/m6.md`]: M6.replace(/ — set=\[m4,m5,m6\]/, '') }
  assert.strictEqual(scanFile(`${DIR}/m6.md`, setIo(files, {})).extra.cross_module, 'no-set')
})

// The stamper writes unpinnable states without a sha: `- cross_module: N/A — …`
// and `- cross_module: grandfathered`. Requiring `@sha` on every row read those
// as "no row", so a settled axis kept reporting `never` and no stamp could ever
// silence it.
test('cross_module: N/A settles the axis, with or without a sha', () => {
  const files = { ...BASE_FILES, [`${DIR}/m6.md`]: M6.replace(/- cross_module @ccc3333: PASS — set=\[m4,m5,m6\]/, '- cross_module: N/A — an email, not a module in the sequence') }
  assert.strictEqual(scanFile(`${DIR}/m6.md`, setIo(files, {})).extra.cross_module, undefined)
})

test('cross_module: grandfathered settles the axis too', () => {
  const files = { ...BASE_FILES, [`${DIR}/m6.md`]: M6.replace(/- cross_module @ccc3333: PASS — set=\[m4,m5,m6\]/, '- cross_module: grandfathered') }
  assert.strictEqual(scanFile(`${DIR}/m6.md`, setIo(files, {})).extra.cross_module, undefined)
})

test('cross_module: a PASS with no sha cannot be diffed, so it is unpinned', () => {
  const files = { ...BASE_FILES, [`${DIR}/m6.md`]: M6.replace(/- cross_module @ccc3333: PASS/, '- cross_module: PASS') }
  assert.strictEqual(scanFile(`${DIR}/m6.md`, setIo(files, {})).extra.cross_module, 'unpinned')
})

test('voice_panel: N/A settles the axis', () => {
  const files = { ...BASE_FILES, [`${DIR}/m6.md`]: M6.replace(/- voice_panel @ccc3333: PLEASED.*/, '- voice_panel: N/A — trainer page, never projected') }
  assert.strictEqual(scanFile(`${DIR}/m6.md`, setIo(files, {})).extra.voice_panel, undefined)
})

test('cross_module: a module with no row at all reads as never', () => {
  const files = { [`${DIR}/m1.md`]: M6.replace(/^- cross_module.*\n/m, '') }
  assert.strictEqual(scanFile(`${DIR}/m1.md`, setIo(files, {})).extra.cross_module, 'never')
})

test('cross_module: module scope only — an exercise never owes it', () => {
  const files = { 'curriculum/exercises/x.md': M6.replace(/^- cross_module.*\n/m, '') }
  assert.strictEqual(scanFile('curriculum/exercises/x.md', setIo(files, {})).extra.cross_module, undefined)
})

test('voice_panel: any body edit since the pin re-owes the panel (taste is whole-file)', () => {
  const r = scanFile(`${DIR}/m6.md`, setIo(BASE_FILES, { [`ccc3333:${DIR}/m6.md`]: '@@ -2 +2 @@\n-body line\n+other line\n' }))
  assert.strictEqual(r.extra.voice_panel, 'diff-region')
})

test('voice_panel: a maintainer-block edit does not re-owe the panel', () => {
  const r = scanFile(`${DIR}/m6.md`, setIo(BASE_FILES, { [`ccc3333:${DIR}/m6.md`]: '@@ -5 +5 @@\n-**Quality:** compendium-audited 2026-08-19 (writing@aaa1111)\n+**Quality:** y\n' }))
  assert.strictEqual(r.extra.voice_panel, undefined)
})

test('voice_panel: a withheld signature stays owing', () => {
  const files = { ...BASE_FILES, [`${DIR}/m6.md`]: M6.replace('voice_panel @ccc3333: PLEASED', 'voice_panel @ccc3333: FINDING') }
  assert.strictEqual(scanFile(`${DIR}/m6.md`, setIo(files, {})).extra.voice_panel, 'finding')
})

test('voice_panel: the stamper\'s PASS reads as pleased, same as the spec\'s PLEASED', () => {
  const files = { ...BASE_FILES, [`${DIR}/m6.md`]: M6.replace('voice_panel @ccc3333: PLEASED', 'voice_panel @ccc3333: PASS') }
  assert.strictEqual(scanFile(`${DIR}/m6.md`, setIo(files, {})).extra.voice_panel, undefined)
})

test('voice_panel: no row → never', () => {
  const files = { [`${DIR}/m1.md`]: M6.replace(/\n- voice_panel.*$/m, '') }
  assert.strictEqual(scanFile(`${DIR}/m1.md`, setIo(files, {})).extra.voice_panel, 'never')
})

// The panel spec (judges/voice-panel.md § Scope) excludes reference lookup
// tables — flat tables have no voice to be pleased by. Reporting them owing
// would be 100% noise on a class whose findings are taste, never blocking.
test('voice_panel: reference pages are out of panel scope', () => {
  const p = `${DIR}/reference/lookup.md`
  const files = { [p]: M6.replace(/\n- voice_panel.*$/m, '') }
  assert.strictEqual(scanFile(p, setIo(files, {})).extra.voice_panel, undefined)
})


// --- rule-drift: the file held still, the RULE moved ------------------------
//
// Pins are commit shas and the compendiums are untracked, so this axis was
// invisible: a rule could be rewritten and every file kept a green pin taken
// against text that no longer existed. io.ruleDrift supplies the classes owed;
// it is optional, so every io stub above still describes a repo with no ledger.
const DRIFT_DOC = '# T\n**Quality:** compendium-audited 2026-01-01 (writing@abc1234 story@abc1234 technical@abc1234 behavior@abc1234 pedagogy@abc1234 strategy@abc1234 slides@abc1234)\n\nbody\n'
function driftIo(classes) {
  return { readFile: () => DRIFT_DOC, gitDiff: () => '', validSha: () => true, ruleDrift: () => new Set(classes), staleFinding: () => false }
}

test('scanFile: a pin whose compendium rule moved is stale even with an untouched file', () => {
  const r = scanFile('curriculum/lectures/x.md', driftIo(['writing']))
  assert.deepStrictEqual(r.classes, ['writing'])
  assert.equal(r.detail.writing, 'rule-drift')
})

// --- stale-finding: the class is silent but its own finding is unresolved ---
//
// The third axis, and the one that let a whole rule ossify. A judge leaves a
// non-blocking REVISE row inside an otherwise-PASSing instance. Someone fixes
// the text it points at. Neither existing axis notices: the pin is current, so
// no rule-drift, and if the edit landed in the maintainer block then tagLine
// routes it to no class at all, so no diff-region either. The finding is now a
// claim about text that no longer exists, and nothing will ever re-read it.
//
// Measured on ae101 before this axis existed: 98 findings sat against moved
// bodies, 33 of them on (file,class) pairs no other reason queued. check_writing
// §3 ranked first in the corpus on 16 todos of which 13 were already fixed.
const finderIo = (stale) => ({
  readFile: () => DRIFT_DOC, gitDiff: () => '', validSha: () => true,
  ruleDrift: () => new Set(), staleFinding: (rel, cls) => stale.includes(cls),
})

test('scanFile: an unresolved finding against a body that has since moved re-enters the queue', () => {
  const r = scanFile('curriculum/lectures/x.md', finderIo(['writing']))
  assert.deepStrictEqual(r.classes, ['writing'])
  assert.equal(r.detail.writing, 'stale-finding')
})

// Reported last, so a class that is stale for a reason the maintainer can act on
// directly still reads as that reason. stale-finding is the weakest claim of the
// three — it says only "re-read this", not "this rule or this region moved".
test('scanFile: diff-region and rule-drift both outrank stale-finding', () => {
  const diffAndFinding = {
    readFile: () => DRIFT_DOC,
    gitDiff: () => '@@ -4,1 +4,1 @@\n-body\n+edited body\n',
    validSha: () => true, ruleDrift: () => new Set(), staleFinding: () => true,
  }
  assert.equal(scanFile('curriculum/lectures/x.md', diffAndFinding).detail.writing, 'diff-region')

  const driftAndFinding = {
    readFile: () => DRIFT_DOC, gitDiff: () => '', validSha: () => true,
    ruleDrift: () => new Set(['writing']), staleFinding: () => true,
  }
  assert.equal(scanFile('curriculum/lectures/x.md', driftAndFinding).detail.writing, 'rule-drift')
})

// The file refuses silent defaults by design — requireIo makes every io say what
// it does not do, out loud. A missing staleFinding would silently restore the
// exact blindness this axis exists to remove.
test('scanFile: io must declare staleFinding rather than default to blind', () => {
  // Deliberately omits staleFinding — do not "fix" this stub.
  const blind = { readFile: () => DRIFT_DOC, gitDiff: () => '', validSha: () => true, ruleDrift: () => new Set() }
  assert.throws(() => scanFile('curriculum/lectures/x.md', blind), /missing staleFinding/)
})

test('scanFile: an explicit empty ledger is silent', () => {
  assert.deepStrictEqual(scanFile('curriculum/lectures/x.md', driftIo([])).classes, [])
})

// Fail closed on the HOOK, silent on the LEDGER. The two absences look alike and
// are not: an empty ledger means "no rule has moved", which is a real answer and
// stays quiet; a missing ruleDrift hook means the CALLER forgot, and answering
// "nothing is stale" to that is a lie the board printed for weeks. eval-queue.js
// mirrored gitIo minus this one key, and every one of its own tests hand-rolled
// an io the same way, so the rule-drift axis was invisible on the only surface
// anyone reads to ask "are we green?". An optional hook is not a guard.
test('scanFile: an io that forgets ruleDrift throws rather than dropping the axis', () => {
  const noAxis = { readFile: () => DRIFT_DOC, gitDiff: () => '', validSha: () => true }
  assert.throws(() => scanFile('curriculum/lectures/x.md', noAxis), /ruleDrift/)
})

test('filterItems: an io that forgets ruleDrift throws rather than dropping the axis', () => {
  const noAxis = { readFile: () => DRIFT_DOC, gitDiff: () => '', validSha: () => true }
  assert.throws(() => filterItems([{ file: 'curriculum/lectures/x.md', classes: ['writing'] }], noAxis), /ruleDrift/)
})

test('gitIo: the real io carries every hook scanFile needs, drift axis included', () => {
  const { gitIo } = require('./scan-stale-classes.js')
  const io = gitIo(process.cwd())
  for (const k of ['readFile', 'gitDiff', 'validSha', 'ruleDrift']) {
    assert.equal(typeof io[k], 'function', `gitIo must supply ${k}`)
  }
})

test('scanFile: a file that BOTH moved and drifted still reports diff-region', () => {
  const io = { ...driftIo(['writing']), gitDiff: () => '@@ -4 +4 @@\n+rewritten body line\n' }
  assert.equal(scanFile('curriculum/lectures/x.md', io).detail.writing, 'diff-region')
})

test('filterItems: rule-drift keeps a class the diff would have pruned', () => {
  const io = { readFile: () => DRIFT_DOC, gitDiff: () => '', validSha: () => true, ruleDrift: () => new Set(['pedagogy']), staleFinding: () => false }
  const { items, report } = filterItems([{ file: 'curriculum/lectures/x.md', classes: ['writing', 'pedagogy'] }], io)
  assert.deepStrictEqual(items[0].classes, ['pedagogy'])
  assert.deepStrictEqual(report[0].kept.map(k => k.reason), ['rule-drift'])
})

// A module's cross_module row names every seam that module sits on, which can
// span more than one judged set: `earn-the-trust` participates in prework-m3 AND
// m3-m4, so its row lists five module names and points at two instances. The set
// name is therefore not a fireable unit; the instance names are. Reporting must
// carry them, or a reader fires against a set that has no instance behind it.
test('a cross_module row exposes every instance it points at', () => {
  const row = [
    '**Quality:** compendium-audited 2026-08-19 (writing@abc1234)',
    '- cross_module @abc1234: PASS \u2014 set=[a,b,c,d,e]; 4 pairs, 0 blocking; see instances/ae101--module-set--prework-m3 + ae101--m3-m4.cross_module.json',
    '',
  ].join('\n')
  assert.deepStrictEqual(crossRow(row).instances, ['ae101--module-set--prework-m3', 'ae101--m3-m4'])
})

test('a single-instance cross_module row reports that one instance', () => {
  const row = [
    '**Quality:** compendium-audited 2026-08-19 (writing@abc1234)',
    '- cross_module @abc1234: PASS \u2014 set=[a,b]; 1 pairs, 0 blocking; see instances/ae101--module-set--prework-m3.cross_module.json',
    '',
  ].join('\n')
  assert.deepStrictEqual(crossRow(row).instances, ['ae101--module-set--prework-m3'])
})

// --- linkFinder: ownership follows INCLUDE links, not any mention ----------
//
// Pins a bug found 2026-08-23 (AE101 "clear the queue" sweep): linkFinder
// resolved ownership with a bare `txt.includes(basename)` over every module
// file, so ANY mention counted as a link. Three kinds of mention are not
// ownership and all three fired:
//   1. a maintainer-block source stamp naming another training's file
//      (`ae101/run-the-first-experiment.md` names `lectures/evals-as-steering.md`
//      to delegate a shared URL check) — AE101 does not teach that lecture;
//   2. a punch-list bullet, `pre-cohort-todos.md` listing three Claude Basics
//      leftovers under a heading that says they are linked from NOTHING — the
//      list of orphans is what made them look owned;
//   3. a card/backlog reference written as a relative path (`../../exercises/x.md`).
// Result: 5 foreign files and 35 of 92 (file,class) pairs sat on AE101's board.
//
// Ownership means the build INLINES the file into that training's module, and
// the build's own definition of that is CR.INCLUDE_LINK_RE — a standalone
// paragraph `[Title](exercises|lectures/slug.md)`. Same regex, one source of
// truth, so a link shape the build ignores can never confer ownership.
const fsx = require('node:fs')
const pathx = require('node:path')
const osx = require('node:os')
const { linkFinder } = require('./scan-stale-classes.js')

function fixture(files) {
  const root = fsx.mkdtempSync(pathx.join(osx.tmpdir(), 'linkfinder-'))
  for (const [rel, body] of Object.entries(files)) {
    const abs = pathx.join(root, rel)
    fsx.mkdirSync(pathx.dirname(abs), { recursive: true })
    fsx.writeFileSync(abs, body)
  }
  return root
}

test('linkFinder: a standalone include link confers ownership', () => {
  const root = fixture({
    'curriculum/trainings/agentic-engineering-101/getting-going.md':
      'intro\n\n[Compound and close](exercises/compound-and-close.md)\n\nmore\n',
  })
  assert.deepStrictEqual(
    linkFinder(root)('curriculum/exercises/compound-and-close.md'),
    ['agentic-engineering-101'])
})

test('linkFinder: a source-stamp mention is NOT ownership', () => {
  const root = fixture({
    // real shape, ae101/run-the-first-experiment.md:175
    'curriculum/trainings/agentic-engineering-101/run-the-first-experiment.md':
      '- `[checked:2026-08-21 result:OK]` https://x/y — **This is the module that owns the check** ' +
      '— `lectures/evals-as-steering.md` and `trainings/agents-101/evaluations.md` name the same piece and can delegate here.\n',
    'curriculum/trainings/agents-101/evaluations.md':
      '[Lecture: Evals as steering](lectures/evals-as-steering.md)\n',
  })
  assert.deepStrictEqual(
    linkFinder(root)('curriculum/lectures/evals-as-steering.md'),
    ['agents-101'])
})

test('linkFinder: a punch-list bullet naming an orphan is NOT ownership', () => {
  const root = fixture({
    // real shape, ae101/pre-cohort-todos.md:180-185
    'curriculum/trainings/agentic-engineering-101/pre-cohort-todos.md':
      'Each is linked from zero trainings or from two or more:\n' +
      '- `curriculum/lectures/the-data-question.md`\n' +
      '- `curriculum/exercises/personal-site-with-guardrails.md`\n',
  })
  assert.deepStrictEqual(linkFinder(root)('curriculum/lectures/the-data-question.md'), [])
  assert.equal(trainingOf('curriculum/lectures/the-data-question.md', linkFinder(root)), null)
})

test('linkFinder: a relative-path card reference is NOT ownership', () => {
  const root = fixture({
    // real shape, ae101/pre-cohort-todos.md:96
    'curriculum/trainings/agentic-engineering-101/pre-cohort-todos.md':
      '- Cheap card drafted, lands in M1 [compound-and-close.md](../../exercises/compound-and-close.md) § *What you built*.\n',
    'curriculum/trainings/agents-101/m1.md':
      '[Compound and close](exercises/compound-and-close.md)\n',
  })
  assert.deepStrictEqual(
    linkFinder(root)('curriculum/exercises/compound-and-close.md'),
    ['agents-101'])
})

test('linkFinder: a trainer-modules anchor link is NOT ownership', () => {
  const root = fixture({
    // real shape, agents-101/trainer-modules.md:223 — anchors into the built page,
    // not a file include; the build never inlines from these.
    'curriculum/trainings/agents-101/trainer-modules.md':
      '**Flow.** Fresh session → [evals as steering](./#lectures-evals-as-steering) → Debrief.\n',
  })
  assert.deepStrictEqual(linkFinder(root)('curriculum/lectures/evals-as-steering.md'), [])
})

test('linkFinder: a longer slug sharing a prefix does not confer ownership', () => {
  const root = fixture({
    // claude-basics includes `-cb` variant; the bare slug must not match it
    'curriculum/trainings/claude-basics/personal-site-with-guardrails.md':
      '[Exercise: Paint by agent](exercises/personal-site-with-guardrails-cb.md)\n',
    'curriculum/trainings/agents-101/getting-going.md':
      '[Exercise: Paint by agent with guardrails](exercises/personal-site-with-guardrails.md)\n',
  })
  assert.deepStrictEqual(
    linkFinder(root)('curriculum/exercises/personal-site-with-guardrails.md'),
    ['agents-101'])
})

test('linkFinder: kind must match — a lecture slug does not match an exercise link', () => {
  const root = fixture({
    'curriculum/trainings/agents-101/m1.md': '[T](exercises/test-and-learn.md)\n',
  })
  assert.deepStrictEqual(linkFinder(root)('curriculum/lectures/test-and-learn.md'), [])
})

test('linkFinder: two trainings including the same file yield both, so trainingOf can refuse', () => {
  const root = fixture({
    'curriculum/trainings/agents-101/m1.md': '[X](exercises/shared.md)\n',
    'curriculum/trainings/agentic-engineering-101/m1.md': '[X](exercises/shared.md)\n',
  })
  assert.deepStrictEqual(
    linkFinder(root)('curriculum/exercises/shared.md').sort(),
    ['agentic-engineering-101', 'agents-101'])
  assert.equal(trainingOf('curriculum/exercises/shared.md', linkFinder(root)), null)
})

test('linkFinder: an include link with trailing whitespace still counts', () => {
  const root = fixture({
    'curriculum/trainings/agents-101/m1.md': '[X](exercises/shared.md)   \n',
  })
  assert.deepStrictEqual(linkFinder(root)('curriculum/exercises/shared.md'), ['agents-101'])
})


// The scanner must carry the moved rules through, not just the class. Without
// them "pedagogy(rule-drift)" tells a dispatcher to re-judge the whole class;
// with them it says re-read check_pedagogy §44 and §52 against this body.
test('scanFile: a drifted class carries the rules that moved', () => {
  const io = { readFile: () => DRIFT_DOC, gitDiff: () => '', validSha: () => true,
    ruleDrift: () => new Map([['writing', [{ compendium: 'check_writing', rule: '3', changed_at: '2026-08-21' }]]]), staleFinding: () => false }
  const r = scanFile('curriculum/lectures/x.md', io)
  assert.equal(r.detail.writing, 'rule-drift')
  assert.deepStrictEqual(r.driftRules.writing.map(x => `${x.compendium} §${x.rule}`), ['check_writing §3'])
})

// A Set has .has but no .get. Old stubs and any caller still handing back a Set
// must keep routing correctly — they simply carry no rule detail.
test('scanFile: a Set-shaped ruleDrift still routes, just without rule detail', () => {
  const io = { readFile: () => DRIFT_DOC, gitDiff: () => '', validSha: () => true,
    ruleDrift: () => new Set(['writing']), staleFinding: () => false }
  const r = scanFile('curriculum/lectures/x.md', io)
  assert.equal(r.detail.writing, 'rule-drift')
  assert.deepStrictEqual(r.driftRules, {})
})

test('scanFile: a diff-region class reports no drift rules even when the rule also moved', () => {
  const io = { readFile: () => DRIFT_DOC, gitDiff: () => '@@ -4 +4 @@\n+rewritten body line\n', validSha: () => true,
    ruleDrift: () => new Map([['writing', [{ compendium: 'check_writing', rule: '3', changed_at: '2026-08-21' }]]]), staleFinding: () => false }
  const r = scanFile('curriculum/lectures/x.md', io)
  assert.equal(r.detail.writing, 'diff-region')
  assert.ok(!('writing' in r.driftRules))
})

console.log(`\n${n} tests passed`)

/* Regression 2026-08-28: a body cut at the END of the body staled nothing.
 * A removed line has no position in the new file, so parseHunks anchors it at
 * the slot it vacated. `buildLineMeta` runs on the file as it is NOW, so when
 * the cut sat directly above `<!-- maintainer -->` that slot IS the fence in
 * the post-cut text, tagLine filed it as bookkeeping, and deleting a whole
 * `##` slide came back with zero tags. The compaction pass this fires on is
 * all deletions, and trailing material is where the cuttable stuff lives, so
 * the fail-open landed on exactly the edit it was meant to catch.
 * Fixture is the POST-cut document — that is what the scanner reads. */
const DOC_AFTER = DOC.split('\n').filter((_, k) => k < 15 || k > 17).join('\n')

test('changeTags: body cut directly above the maintainer fence still tags', () => {
  const diff = [
    '@@ -15,7 +15,4 @@ ctx',
    ' ',
    '-## Bridge',
    '-bridge prose',
    '-',
    ' <!-- maintainer -->',
    '-**Quality:** old pins',
    '+**Quality:** new pins',
    ' - judges 2026-07-01 (writing PASS, story PASS)',
    '',
  ].join('\n')
  const r = changeTags(buildLineMeta(DOC_AFTER), parseHunks(diff))
  assert(r.tags.has('writing') && r.tags.has('slides'),
    `cutting body prose must stale writing+slides, got ${JSON.stringify([...r.tags])}`)
  assert(r.tags.has('story') && r.tags.has('pedagogy'),
    `cutting a ## heading must stale story+pedagogy, got ${JSON.stringify([...r.tags])}`)
  assert(r.changedBody > 0, 'removed body lines must count toward changedBody')
})

/* The other half: a cut INSIDE the maintainer block stays bookkeeping. The
 * line above a maintainer line is also maintainer, so the fallback finds
 * nothing and the fail-closed fix does not become a fire-on-everything fix. */
test('changeTags: maintainer-only deletion still tags nothing', () => {
  const diff = [
    '@@ -17,2 +17,1 @@ ctx',
    '-**Quality:** old pins',
    ' - judges 2026-07-01 (writing PASS, story PASS)',
    '',
  ].join('\n')
  const r = changeTags(buildLineMeta(DOC_AFTER), parseHunks(diff))
  assert.deepStrictEqual([...r.tags].sort(), [],
    `a maintainer-only deletion must stale nothing, got ${JSON.stringify([...r.tags])}`)
})

// --- findingIndex: a recorded resolution settles the finding ---
/* The stale-finding axis exists to re-open a class whose finding can no longer
 * be verified against the body it was written on. A finding the maintainer has
 * already settled — `resolution` on the row, or on the instance for the verdict
 * as a whole — is not open, so a body edit after it cannot make it stale. Without
 * this, every refuted or fixed finding re-queues its class on the next edit and
 * the queue reports work that a judge would only re-close. */
{
  const fs = require('node:fs')
  const os = require('node:os')
  const path = require('node:path')
  const { findingIndex, resetFindingIndex } = require('./scan-stale-classes.js')
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'ssc-findings-'))
  const dir = path.join(root, 'curriculum/evals/instances')
  fs.mkdirSync(dir, { recursive: true })
  const settled = { settled: 'fixed', at: '2026-09-05', note: 'a note long enough to satisfy the gate' }
  const REV = (extra = {}) => ({ compendium: 'check_writing.md', rule_index: 1, verdict: 'REVISE', blocking: false, evidence: 'L3', ...extra })
  const put = (name, inst) => fs.writeFileSync(path.join(dir, name), JSON.stringify(inst))
  put('t--lecture--open.writing.json', { file: 'curriculum/lectures/open.md', class: 'writing', body_sha: 'a', rules_evaluated: [REV()] })
  put('t--lecture--rowres.writing.json', { file: 'curriculum/lectures/rowres.md', class: 'writing', body_sha: 'a', rules_evaluated: [REV({ resolution: settled })] })
  put('t--lecture--topres.writing.json', { file: 'curriculum/lectures/topres.md', class: 'writing', body_sha: 'a', verdict: 'REVISE', resolution: { ...settled, settled: 'refuted' }, rules_evaluated: [REV()] })
  put('t--lecture--mixed.writing.json', { file: 'curriculum/lectures/mixed.md', class: 'writing', body_sha: 'a', rules_evaluated: [REV({ resolution: settled }), REV({ rule_index: 2 })] })
  const key = slug => `${path.resolve(root, `curriculum/lectures/${slug}.md`)}|writing`
  resetFindingIndex()
  const idx = findingIndex(root)
  test('findingIndex: an unresolved REVISE row is a live finding', () => assert.ok(idx.has(key('open'))))
  test('findingIndex: a row-level resolution settles the finding', () => assert.ok(!idx.has(key('rowres'))))
  test('findingIndex: an instance-level resolution settles every finding it holds', () => assert.ok(!idx.has(key('topres'))))
  test('findingIndex: one open row beside a settled one keeps the class live', () => assert.ok(idx.has(key('mixed'))))
  resetFindingIndex()
}
