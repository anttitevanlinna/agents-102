'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { simulateReader, judgeCase } = require('./evaluate');

const fixture = value => ({ text: '```json\n' + JSON.stringify(value) + '\n```', events: [{ type: 'fixture' }], model: 'unit-fixture' });
const criteria = [{ id: 'return', outcome: 'Find the handbook again', requirement: 'Response returns the exact next workbook URL.' }];
const observation = 'Agent response: Continue here: https://training.example/index.html#next';
const pass = { id: 'return', status: 'pass', evidence: 'https://training.example/index.html#next', reason: 'The actual response contains the exact next URL.' };

test('reader uses the existing persona, solo excerpt, and a separate notes-only cold probe', async () => {
  const calls = [];
  const walkResult = fixture({ notes: ['Keep my workbook tab open.'], actions: ['ACTION_ONLY_SECRET'], confusion: ['CONFUSION_ONLY_SECRET'] });
  const probeResult = fixture({ answer: 'I would use my workbook tab.' });
  const openResult = fixture({ answer: 'With the page open, I would open Resume learning.' });
  const result = await simulateReader({
    personaId: 'ingrid', material: 'MATERIAL_ONLY_SECRET', probe: 'How would you return?',
    allowedActions: ['EXPECTED_ROUTE_SECRET'], tag: 'reader-test', outputDir: '/tmp/test-reader',
    call: async args => { calls.push(args); return [walkResult, probeResult, openResult][calls.length - 1]; }
  });
  assert.equal(calls.length, 3);
  assert.match(calls[0].prompt, /MATERIAL_ONLY_SECRET/);
  assert.match(calls[0].prompt, /on your own/);
  assert.doesNotMatch(calls[0].prompt, /another teacher task|No separate Teacher/);
  assert.match(calls[0].prompt, /Do not invent an agent reply/);
  assert.match(calls[1].prompt, /Keep my workbook tab open/);
  assert.match(calls[1].prompt, /How would you return\?/);
  assert.doesNotMatch(calls[1].prompt, /MATERIAL_ONLY_SECRET|ACTION_ONLY_SECRET|CONFUSION_ONLY_SECRET/);
  assert.match(calls[2].prompt, /MATERIAL_ONLY_SECRET/);
  assert.match(calls[2].prompt, /Your workbook is still open/);
  for (const call of calls) {
    assert.doesNotMatch(call.prompt, /EXPECTED_ROUTE_SECRET/);
    assert.equal(call.tools, false);
    assert.equal(call.model, 'sonnet');
  }
  assert.deepEqual(calls.map(call => call.tag), ['reader-test-walk', 'reader-test-probe', 'reader-test-open-workbook']);
  assert.equal(result.personaId, 'ingrid');
  assert.match(result.personaHash, /^[0-9a-f]{16}$/);
  assert.equal(result.probe.answer, 'I would use my workbook tab.');
  assert.equal(result.raw.walk, walkResult);
  assert.equal(result.raw.probe, probeResult);
  assert.equal(result.raw.openWorkbook, openResult);
  assert.equal(result.openWorkbook.answer, 'With the page open, I would open Resume learning.');
  assert.match(result.coldProbePurpose, /diagnostic.*not a required/);
});

test('quick panel personas load and unsupported persona ids fail before a model call', async () => {
  for (const personaId of ['cfo-sceptic', 'cto-builder']) {
    let count = 0;
    const result = await simulateReader({ personaId, material: 'Read this.', probe: 'What next?', call: async () => ++count === 1 ? fixture({ notes: [], actions: [], confusion: [] }) : fixture({ answer: 'I do not know.' }) });
    assert.equal(result.personaId, personaId);
  }
  await assert.rejects(simulateReader({ personaId: '../other', material: 'Read.', probe: 'Next?', call: () => assert.fail('must not call') }), /Unknown onboarding persona/);
});

test('malformed reader output cannot become simulated success', async () => {
  await assert.rejects(simulateReader({ personaId: 'ingrid', material: 'Read.', probe: 'Next?', call: async () => fixture({ notes: ['ok'], actions: 'done', confusion: [] }) }), /actions must be an array/);
  let n = 0;
  await assert.rejects(simulateReader({ personaId: 'ingrid', material: 'Read.', probe: 'Next?', call: async () => ++n === 1 ? fixture({ notes: [], actions: [], confusion: [] }) : fixture({ answer: '' }) }), /answer must be nonempty/);
});

test('judge receives actual observation and criteria tool-less and retains raw metadata', async () => {
  const raw = fixture({ criteria: [pass] });
  const result = await judgeCase({ caseId: 'good', facts: { workbook: 'https://training.example/index.html' }, criteria, observation, outputDir: '/tmp/test-judge', tag: 'case-test', call: async args => {
    assert.equal(args.tools, false);
    assert.equal(args.model, 'sonnet');
    assert.equal(args.tag, 'case-test-judge');
    assert.ok(args.prompt.includes(observation));
    assert.ok(args.prompt.includes(criteria[0].requirement));
    return raw;
  } });
  assert.equal(result.caseId, 'good');
  assert.deepEqual(result.criteria, [pass]);
  assert.equal(result.raw, raw);
});

test('incomplete, duplicate, unknown, malformed and fabricated pass evidence are rejected', async () => {
  const rows = [
    [], [pass, pass], [{ ...pass, id: 'unknown' }],
    [{ ...pass, status: 'approved' }], [{ ...pass, evidence: '' }],
    [{ ...pass, evidence: 'https://invented.example/#next' }], [{ ...pass, reason: '' }]
  ];
  for (const returned of rows) {
    await assert.rejects(judgeCase({ caseId: 'invalid', facts: {}, criteria, observation, call: async () => fixture({ criteria: returned }) }));
  }
  await assert.rejects(judgeCase({ caseId: 'bad-json', facts: {}, criteria, observation, call: async () => ({ text: 'not json' }) }), /malformed model JSON/);
  const two = [...criteria, { id: 'resume', outcome: 'Resume', requirement: 'A local position note exists.' }];
  await assert.rejects(judgeCase({ caseId: 'duplicate', facts: {}, criteria: two, observation, call: async () => fixture({ criteria: [pass, pass] }) }), /duplicate/);
});

test('good and damaged observed traces pass through the judge interface without fabricated evidence', async () => {
  // Fixtures test interface validation only; they are not evidence from a real judge.
  const good = await judgeCase({ caseId: 'good', facts: {}, criteria, observation, call: async () => fixture({ criteria: [pass] }) });
  const damagedObservation = 'Agent response: I started the next exercise automatically.';
  const damaged = await judgeCase({ caseId: 'damaged', facts: {}, criteria, observation: damagedObservation, call: async args => {
    assert.ok(args.prompt.includes(damagedObservation));
    assert.ok(!args.prompt.includes(observation));
    return fixture({ criteria: [{ id: 'return', status: 'fail', evidence: 'I started the next exercise automatically.', reason: 'The observed response omitted the workbook return link.' }] });
  } });
  assert.equal(good.criteria[0].status, 'pass');
  assert.equal(damaged.criteria[0].status, 'fail');
});

test('missing observed evidence may be explicitly not-run, never inferred as pass', async () => {
  const result = await judgeCase({ caseId: 'missing', facts: {}, criteria, observation: 'No agent response captured.', call: async () => fixture({ criteria: [{ id: 'return', status: 'not-run', evidence: '', reason: 'No response was captured, so the requirement was not observed.' }] }) });
  assert.equal(result.criteria[0].status, 'not-run');
});
