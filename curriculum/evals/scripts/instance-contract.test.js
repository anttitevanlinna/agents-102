'use strict'
// The shared instance fields have one source (instance-contract.js). Class
// templates name only what their class adds; the brief carries the contract.
const { test } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const { CLASSES, CLASS_FIELDS, contract, render, trainings } = require('./instance-contract.js')
const { checkInstance } = require('./check-instance-schema.js')

const REPO = path.resolve(__dirname, '..', '..', '..')
const TEMPLATE = cls => path.join(REPO, 'curriculum/evals/judges', `${cls === 'behavior' ? 'prompt-behavior' : cls}.md`)

// Fields every class shares. A template restating any of them is a second copy.
// (`verdict` is left out: behavior's prompts_findings rows carry their own.)
const SHARED = ['class', 'file', 'training', 'body_sha', 'shape_hash', 'blocking_findings_count', 'nonblocking_findings_count', 'suggestions']

test('every per-file class renders a contract naming itself, with a repo-relative file', () => {
  for (const cls of CLASSES) {
    const c = contract(cls)
    assert.equal(c.class, cls)
    assert.equal(c.file, '<repo-relative path>')
    assert.match(render(cls), new RegExp(`"class": "${cls}"`))
  }
  assert.throws(() => contract('cross_module'), /no per-file contract/)
})

test('training choices are the registry eval keys plus shared', () => {
  assert.deepEqual(trainings().slice(-1), ['shared'])
  assert.ok(trainings().includes('ae101'))
  assert.ok(!trainings().includes('unknown'))
})

test('a record filled from the contract passes the instance schema gate', () => {
  for (const cls of CLASSES) {
    const rec = { ...contract(cls), training: 'ae101', verdict: 'REVISE', notes: '' }
    rec.rules_evaluated = [
      { compendium: 'check_writing.md', rule_index: 1, rule_lead: 'x', verdict: 'REVISE', evidence: '3: q', fix_hint: 'y', blocking: true },
      { compendium: 'check_writing.md', rule_index: 2, rule_lead: 'x', verdict: 'N/A', evidence: null, na_reason: 'no prompts', blocking: false },
    ]
    rec.suggestions = []
    rec.blocking_findings_count = 1
    rec.nonblocking_findings_count = 0
    if (cls === 'behavior') {
      delete rec.rules_evaluated
      rec.prompts_findings = [{ prompt_index: 1, verdict: 'REVISE', risks_fired: [{ pattern_id: 'p', fix_hint: 'f' }] }]
    }
    const problems = checkInstance(`ae101--lecture--x.${cls}.json`, rec).filter(p => p.severity === 'gate')
    assert.deepEqual(problems, [], `${cls}: ${JSON.stringify(problems)}`)
  }
})

test('class templates carry no copy of the shared fields and point at the contract', () => {
  for (const cls of CLASSES) {
    const t = fs.readFileSync(TEMPLATE(cls), 'utf8')
    // The instance section only: story and behavior also define their sim-trace
    // record, a different file with its own fields.
    const out = t.slice(t.indexOf('## Output format')).split(/\n## /)[0]
    assert.ok(t.includes('## Output format'), `${cls} template has an Output format section`)
    for (const f of SHARED) assert.doesNotMatch(out, new RegExp(`^\\s*"${f}":`, 'm'), `${cls} template restates "${f}"`)
    assert.match(t, /instance-contract\.js/, `${cls} template names the contract`)
    for (const f of CLASS_FIELDS[cls]) assert.ok(t.includes(f.split('[].').pop()), `${cls} template defines its own ${f}`)
  }
})

test('the class brief carries the contract', () => {
  const { build } = require('./derive-class-brief.js')
  const file = 'curriculum/lectures/diagnose-and-resend.md'
  const target = fs.existsSync(path.join(REPO, file)) ? file : 'curriculum/exercises/diagnose-and-resend.md'
  for (const cls of ['writing', 'slides']) assert.ok(build(target, cls).text.includes(render(cls)), `${cls} brief`)
})
