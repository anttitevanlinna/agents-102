#!/usr/bin/env node
// Tests for check-instance-schema.js — the gate on the judge's own record.
//
// What is tested is the count arithmetic and the ledger comparison, because
// those are the two places where an instance can lie quietly. A wrong verdict
// enum or a missing file fails loudly the moment something reads it; a
// todos_count of 3 over an empty list reads as evidence forever.
'use strict'
const assert = require('node:assert')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const { checkInstance, derivedTodos, derivedBlocking, scan } = require('./check-instance-schema.js')

let n = 0
function test(name, fn) { fn(); n++; console.log(`ok ${n} - ${name}`) }

const codes = ps => ps.map(p => p.code).sort()
const sev = (ps, c) => ps.find(p => p.code === c).severity
const todoRow = () => ({ compendium: 'check_writing.md', rule_index: 3, verdict: 'REVISE', blocking: false })
const blockingRow = () => ({ compendium: 'check_writing.md', rule_index: 9, verdict: 'REVISE', blocking: true })
const passRow = () => ({ compendium: 'check_writing.md', rule_index: 1, verdict: 'PASS', blocking: true })
const base = extra => Object.assign({
  class: 'writing', training: 'ae101', verdict: 'PASS', todos_count: 0, blocking_findings_count: 0,
}, extra)
const NAME = 'ae101--exercise--a.writing.json'

// The bug this gate exists for. A judge counts its todos, writes the number,
// and does not write the todos. The stamper copies the number onto the Quality
// row and appends "see instances/<slug>.writing.json", so the row cites a file
// that does not contain them. 49 AE101 instances were in this state, carrying
// 134 todos that exist as an integer and as no text anywhere.
test('a count with nothing behind it is the whole point of the gate', () => {
  const p = checkInstance(NAME, base({ verdict: 'PASS_WITH_TODOS', todos_count: 3 }))
  assert.deepStrictEqual(codes(p), ['COUNT_WITHOUT_LIST'])
  assert.match(p[0].detail, /declares 3 todo\(s\) and records none/)
  // Reported, never gating: no arithmetic here can recover a todo nobody wrote,
  // so failing the build on it would only get the build's gate switched off.
  assert.strictEqual(sev(p, 'COUNT_WITHOUT_LIST'), 'debt')

  // Zero todos and no ledger is not a defect — it is a clean pass.
  assert.deepStrictEqual(checkInstance(NAME, base({ todos_count: 0 })), [])
})

test('the count must equal the rows recorded, in both directions', () => {
  const over = checkInstance(NAME, base({
    verdict: 'PASS_WITH_TODOS', todos_count: 4,
    rules_evaluated: [passRow(), todoRow(), todoRow(), todoRow()],
  }))
  assert.deepStrictEqual(codes(over), ['COUNT_MISMATCH'])
  assert.match(over[0].detail, /todos_count says 4, 3 recorded/)
  // One ledger, so the count is simply wrong and cheap to correct: this one fails the build.
  assert.strictEqual(sev(over, 'COUNT_MISMATCH'), 'gate')

  // Under-counting hides a finding just as effectively as over-counting invents one.
  const under = checkInstance(NAME, base({ todos_count: 1, rules_evaluated: [todoRow(), todoRow()] }))
  assert.deepStrictEqual(codes(under), ['COUNT_MISMATCH'])

  const right = checkInstance(NAME, base({
    verdict: 'PASS_WITH_TODOS', todos_count: 2, rules_evaluated: [passRow(), todoRow(), todoRow()],
  }))
  assert.deepStrictEqual(right, [])
})

// blocking:true and blocking:false rows share a verdict, so a gate that counted
// REVISE rows alone would let a blocking finding masquerade as a todo — which is
// the difference between a red row and a clean one.
test('blocking rows are counted apart from todos', () => {
  const inst = base({
    verdict: 'REVISE', todos_count: 1, blocking_findings_count: 2,
    rules_evaluated: [todoRow(), blockingRow(), blockingRow(), passRow()],
  })
  assert.deepStrictEqual(checkInstance(NAME, inst), [])
  assert.strictEqual(derivedTodos(inst), 1)
  assert.strictEqual(derivedBlocking(inst), 2)

  const wrong = checkInstance(NAME, Object.assign({}, inst, { blocking_findings_count: 0 }))
  assert.deepStrictEqual(codes(wrong), ['COUNT_MISMATCH'])
  assert.match(wrong[0].detail, /blocking_findings_count says 0, 2 recorded/)
})

// Class B (simulation-behavior) does not record rule rows at all. It scores each
// prompt and writes `prompts_findings`, one entry per finding, carrying its own
// verdict: TODO for a non-blocking one, REVISE for a blocking one. The counter
// only knew Class A's shape, so all 106 behavior instances read as "declares N
// todo(s) and records none" while recording every one of them — 48 AE101 todos
// that no report could name and no triage could reach.
test('the behavior class records its ledger under its own name', () => {
  const finding = v => ({ prompt_index: 1, verdict: v, load_bearing: v === 'REVISE', risks_fired: [{ pattern_id: 'question-dump', confidence: 'low', evidence: 'l. 3', fix_hint: 'name the recovery move beside the fence' }] })
  const inst = base({
    class: 'behavior', verdict: 'PASS_WITH_TODOS', todos_count: 2, blocking_findings_count: 1,
    prompts_findings: [finding('TODO'), finding('PASS'), finding('TODO'), finding('REVISE')],
  })
  assert.strictEqual(derivedTodos(inst), 2, 'TODO entries are the todos')
  assert.strictEqual(derivedBlocking(inst), 1, 'REVISE entries are the blocking findings')
  assert.deepStrictEqual(checkInstance('ae101--exercise--a.behavior.json', inst), [])

  // The three instances this was hiding: a declared zero over recorded TODOs.
  // Under-counting is the direction that matters — it is how a finding leaves
  // the ledger without anyone deciding it should.
  const under = checkInstance('ae101--exercise--a.behavior.json', Object.assign({}, inst, { todos_count: 0 }))
  assert.deepStrictEqual(codes(under), ['COUNT_MISMATCH'])
  assert.match(under[0].detail, /todos_count says 0, 2 recorded/)

  // An empty run is a clean pass, not a missing ledger.
  assert.deepStrictEqual(checkInstance('ae101--exercise--a.behavior.json',
    base({ class: 'behavior', prompts_findings: [] })), [])
})

// Eight instances carry prompts_findings AND a rule-row array. Two records of
// the same thing rot apart whatever they are named, so the third ledger is held
// to the same standard as the first two rather than quietly winning.
test('prompts_findings is a third ledger, not an override', () => {
  const todo = () => ({ prompt_index: 1, verdict: 'TODO', risks_fired: [{ pattern_id: 'question-dump', confidence: 'low', evidence: 'l. 3', fix_hint: 'name the recovery move beside the fence' }] })
  const p = checkInstance('ae101--exercise--a.behavior.json', base({
    class: 'behavior', verdict: 'PASS_WITH_TODOS', todos_count: 0,
    prompts_findings: [todo()],
    rules_evaluated: [passRow()],
  }))
  assert.ok(codes(p).includes('RIVAL_LEDGERS'), 'the contradiction is reported')
  assert.match(p.find(x => x.code === 'RIVAL_LEDGERS').detail,
    /prompts_findings holds 1, rules_evaluated holds 0/)
  assert.strictEqual(sev(p, 'RIVAL_LEDGERS'), 'debt', 'which ledger is right is a judgement')

  // Agreeing is legal, same as the todos[] case it sits beside.
  assert.deepStrictEqual(checkInstance('ae101--exercise--a.behavior.json', base({
    class: 'behavior', verdict: 'PASS_WITH_TODOS', todos_count: 1,
    prompts_findings: [todo()],
    rules_evaluated: [todoRow()],
  })), [])
})

// The behavior judge's verdict rules used to mint a TODO for any risk at
// `confidence: low`, while the carve-out section told it to mark an APPLIED
// carve-out at exactly that confidence. Deciding a risk was harmless is what
// filed it as owed work — 41 of the AE101 class's 54 todos fire nothing but
// low-confidence risks, and 28 of those fire only patterns that have a named
// carve-out. The rubric now wants a `carve_out` marker to tell the two apart,
// and a TODO that names a fix.
//
// The hint lives on the RISK. The finding carries prompt_index, verdict,
// load_bearing and risks_fired, and no fix_hint of its own — a check written
// against the finding flags all 54 and means nothing by any of them.
//
// Reported, never gating, same as COUNT_WITHOUT_LIST beside it: no arithmetic
// here can invent a fix the judge declined to name.
test('a todo that names no fix is a record of deliberation, not work', () => {
  const risk = hint => ({ pattern_id: 'preamble-before-action', confidence: 'low', evidence: 'l. 4', fix_hint: hint })
  const inst = base({
    class: 'behavior', verdict: 'PASS_WITH_TODOS', todos_count: 2,
    prompts_findings: [
      { prompt_index: 1, verdict: 'TODO', risks_fired: [risk('add a one-at-a-time pushback line')] },
      { prompt_index: 2, verdict: 'TODO', risks_fired: [risk('   '), risk('')] },
    ],
  })
  const p = checkInstance('ae101--exercise--a.behavior.json', inst)
  assert.deepStrictEqual(codes(p), ['TODO_WITHOUT_FIX'])
  assert.match(p[0].detail, /prompt 2/)
  assert.doesNotMatch(p[0].detail, /prompt 1/, 'one risk naming a fix is enough')
  assert.strictEqual(sev(p, 'TODO_WITHOUT_FIX'), 'debt')

  // It stays in the count. Which findings are real is the judge's call, and
  // dropping one here would close a row nobody decided to close.
  assert.strictEqual(derivedTodos(inst), 2)

  // No risks at all reads the same as risks that name nothing.
  assert.deepStrictEqual(codes(checkInstance('ae101--exercise--a.behavior.json', base({
    class: 'behavior', verdict: 'PASS_WITH_TODOS', todos_count: 1,
    prompts_findings: [{ prompt_index: 3, verdict: 'TODO' }],
  }))), ['TODO_WITHOUT_FIX'])

  // Only TODO rows are held to it. A PASS finding has nothing to fix by
  // definition, and a REVISE one is already blocking and reported elsewhere.
  assert.deepStrictEqual(checkInstance('ae101--exercise--a.behavior.json', base({
    class: 'behavior', prompts_findings: [{ prompt_index: 1, verdict: 'PASS' }],
  })), [])

  // The shape the corpus actually holds stays silent. If this ever goes red on
  // real data, the gate is measuring the wrong field again.
  assert.deepStrictEqual(checkInstance('ae101--exercise--a.behavior.json', base({
    class: 'behavior', verdict: 'PASS_WITH_TODOS', todos_count: 1,
    prompts_findings: [{
      prompt_index: 1, prompt_lead: 'Read the repo', verdict: 'TODO', load_bearing: false,
      risks_fired: [{ pattern_id: 'preamble-before-action', confidence: 'low', evidence: 'l. 2', fix_hint: 'name the artifact first' }],
    }],
  })), [])
})

// 61 of the 79 AE101 instances carrying both ledgers disagreed with each other.
// Two records of the same thing do not average out; they rot apart and the
// reader picks whichever one it happened to be written against.
test('two ledgers that disagree are a defect, not a redundancy', () => {
  const p = checkInstance(NAME, base({
    verdict: 'PASS_WITH_TODOS', todos_count: 2,
    todos: [{ rule: 'x' }, { rule: 'y' }],
    rules_evaluated: [todoRow(), passRow()],
  }))
  assert.ok(codes(p).includes('RIVAL_LEDGERS'), 'the contradiction is reported')
  assert.match(p.find(x => x.code === 'RIVAL_LEDGERS').detail, /todos\[\] holds 2, rules_evaluated holds 1/)
  assert.strictEqual(sev(p, 'RIVAL_LEDGERS'), 'debt', 'which ledger is right is a judgement, not arithmetic')
  // With the two ledgers disagreeing there is no count to be right about, so the
  // mismatch rides along as debt instead of failing a build nothing can green.
  assert.strictEqual(sev(p, 'COUNT_MISMATCH'), 'debt')

  // Agreeing duplicates are legal for now — the migration collapses them, and a
  // gate that failed on them would go red on history it is meant to survive.
  assert.deepStrictEqual(checkInstance(NAME, base({
    verdict: 'PASS_WITH_TODOS', todos_count: 1, todos: [{ rule: 'x' }], rules_evaluated: [todoRow()],
  })), [])
})

// The coverage audit looks instances up BY NAME, so a record whose own fields
// disagree with its filename is judged work that reads as never judged.
test('class and training must match the filename they are found under', () => {
  const p = checkInstance('ae101--exercise--a.writing.json', base({ class: 'slides', training: 'agents-101' }))
  assert.deepStrictEqual(codes(p), ['FIELD_MISMATCH', 'FIELD_MISMATCH'])
})

test('a verdict the stamper cannot act on is rejected', () => {
  assert.deepStrictEqual(codes(checkInstance(NAME, base({ verdict: 'APPROVE' }))), ['BAD_VERDICT'])
  assert.deepStrictEqual(codes(checkInstance(NAME, base({ verdict: undefined }))), ['BAD_VERDICT'])
  for (const v of ['PASS', 'PASS_WITH_TODOS', 'REVISE', 'N/A']) {
    assert.deepStrictEqual(checkInstance(NAME, base({ verdict: v })), [], `${v} is a real verdict`)
  }
})

// A string count is the shape the corpus actually holds in places, and it is not
// worth a second error code — but it must still be compared as a number, or
// "3" !== 3 turns every one of them into a phantom mismatch.
test('a numeric string count is compared as a number', () => {
  assert.deepStrictEqual(checkInstance(NAME, base({ todos_count: '2', rules_evaluated: [todoRow(), todoRow()] })), [])
  assert.deepStrictEqual(codes(checkInstance(NAME, base({ todos_count: 'two' }))), ['COUNT_MISMATCH'])
})

// --fix must repair only what one reading settles. The dangerous direction is a
// repair that makes a wrong record self-consistent: a mis-stamped training that
// gets "corrected" to agree with itself is a mis-stamp nothing will report again.
test('repairs settle the mechanical defects and refuse the rest', () => {
  const { repairs } = require('./check-instance-schema.js')

  // The 58-instance case: the field says storytelling, every tool globs .story.json.
  assert.deepStrictEqual(
    repairs('ae101--lecture--a.story.json', base({ class: 'storytelling' })), { class: 'story' })

  // The 2-instance case: the field claims ae101, the judged path says otherwise.
  // The path wins, because the path is what the filename was derived from.
  assert.deepStrictEqual(
    repairs('agents-101--supplementary--b.writing.json', base({
      training: 'ae101', file: '/repo/curriculum/trainings/agents-101/supplementary/b.md',
    })), { training: 'agents-101' })
  assert.strictEqual(
    repairs('ae101--module--c.writing.json', base({
      training: 'ae101', file: '/repo/curriculum/trainings/agentic-engineering-101/c.md',
    })), null, 'agentic-engineering-101 on disk is ae101 in the record — not a defect')

  // A count over one ledger is arithmetic.
  assert.deepStrictEqual(
    repairs(NAME, base({ todos_count: 9, rules_evaluated: [todoRow(), passRow()] })), { todos_count: 1 })

  // Two ledgers disagreeing is not arithmetic, and a missing verdict is not
  // inferable from a count. Both refuse, so the report keeps them.
  assert.strictEqual(
    repairs(NAME, base({ todos_count: 2, todos: [{ rule: 'x' }, { rule: 'y' }], rules_evaluated: [todoRow()] })),
    null, 'picking a ledger is a judgement — leave it for one')
  assert.strictEqual(
    repairs(NAME, base({ verdict: null, todos_count: 0 })), null,
    'a verdict is never derived from the counts beneath it')

  assert.strictEqual(repairs(NAME, base({})), null, 'a clean instance is never rewritten')
})

// The bug this guards: re-serialising the object to write a one-word correction
// reformatted 76 instances, because the corpus is written at several indents.
// One of them turned a "storytelling" -> "story" edit into 1330 changed lines.
// In a tree a neighbouring session reads, that is indistinguishable from a
// rewrite, and it buries the change it was made for.
test('a repair edits the line, not the file', () => {
  const { patchText } = require('./check-instance-schema.js')
  const oneSpace = '{\n "class": "storytelling",\n "todos_count": 4,\n "rules_evaluated": [\n  {\n   "class": "nested"\n  }\n ]\n}\n'
  const out = patchText(oneSpace, { class: 'story', todos_count: 1 })
  assert.strictEqual(out, '{\n "class": "story",\n "todos_count": 1,\n "rules_evaluated": [\n  {\n   "class": "nested"\n  }\n ]\n}\n')
  assert.ok(out.includes('"class": "nested"'), 'a same-named key nested deeper is not the one being patched')
  assert.strictEqual(out.split('\n').length, oneSpace.split('\n').length, 'no line is added or lost')

  // Four-space files exist too, and the indent is read from the file itself.
  assert.strictEqual(
    patchText('{\n    "todos_count": 9\n}\n', { todos_count: 0 }), '{\n    "todos_count": 0\n}\n')

  // A key that is not where it was expected fails rather than falling back to a
  // reformat — the caller reports it and the file is left exactly as found.
  assert.strictEqual(patchText('{\n "class": "story"\n}\n', { verdict: 'PASS' }), null)
})

// One training's backlog must not gate another's work — the whole reason the
// flag has no default.
test('scan reads the record for the training, not the filename', () => {
  const repo = fs.mkdtempSync(path.join(os.tmpdir(), 'schema-'))
  const dir = path.join(repo, 'curriculum/evals/instances')
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path.join(dir, 'ae101--exercise--ok.writing.json'), JSON.stringify(base({})))
  fs.writeFileSync(path.join(dir, 'ae101--exercise--bad.writing.json'), JSON.stringify(base({ todos_count: 5 })))
  fs.writeFileSync(path.join(dir, 'agents-101--exercise--bad.writing.json'),
    JSON.stringify(base({ training: 'agents-101', todos_count: 9 })))
  fs.writeFileSync(path.join(dir, 'broken.writing.json'), '{ not json')

  const ae = scan(repo, 'ae101').map(f => f.name)
  assert.ok(!ae.includes('agents-101--exercise--bad.writing.json'), 'the neighbouring training is out of scope')
  assert.ok(!ae.includes('ae101--exercise--ok.writing.json'), 'a clean instance is silent')
  assert.ok(ae.includes('ae101--exercise--bad.writing.json'))
  assert.deepStrictEqual(scan(repo, 'agents-101').map(f => f.name),
    ['agents-101--exercise--bad.writing.json', 'broken.writing.json'])

  // Corruption is attributed by filename, because the record that would claim a
  // training is the unreadable part. A name with no training prefix belongs to
  // nobody, so every scan reports it rather than each assuming another will.
  assert.ok(ae.includes('broken.writing.json'), 'an unowned unreadable instance is everybody\'s')
  fs.writeFileSync(path.join(dir, 'agents-101--exercise--rot.writing.json'), '{ also not json')
  assert.ok(!scan(repo, 'ae101').some(f => f.name.startsWith('agents-101')),
    'corruption a neighbouring training owns stays theirs')
})

console.log(`1..${n}`)
