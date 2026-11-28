'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { aggregate, invariantChecks, material, snapshot, changed, observation, sourceFingerprints, driftCheck, callRecord, routeClosed, actorContext, NAVIGATION_LOADER, guideReadCheck, followupRequest } = require('./run');
const { judgeCase } = require('./evaluate');
const { scenarios, BASE } = require('./scenarios');
const { parseEvents } = require('./model');

const definition = (levels = ['contract', 'model-runtime']) => ({ outcomes: [{ id: 'ONB-02', name: 'Install', required_evidence: levels }] });
const check = (status, extra = {}) => ({ id: 'install', outcome: 'ONB-02', status, ...extra });
const runtimeCase = (status, extra = {}) => ({ id: 'install-case', level: 'model-runtime', checks: [check(status)], ...extra });
const statusOf = report => report.outcomes[0].status;

function folder(t, files = {}) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'onboarding-run-unit-'));
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  for (const [name, value] of Object.entries(files)) put(dir, name, value);
  return dir;
}
function put(dir, name, value) {
  fs.mkdirSync(path.dirname(path.join(dir, name)), { recursive: true });
  fs.writeFileSync(path.join(dir, name), value);
}
const spec = (extra = {}) => ({ id: 'resume-test', allowed: () => false, inspect: {}, ...extra });
const row = (checks, id) => checks.find(check => check.id === id);

test('missing evidence layers remain not-run even when contract checks pass', () => {
  const report = aggregate(definition(), [check('pass')], [], []);
  assert.equal(statusOf(report), 'not-run');
  assert.deepEqual(report.outcomes[0].evidence.map(item => item.status), ['pass', 'not-run']);
});

test('observed failure outranks passing, blocked and absent checks', () => {
  const report = aggregate(definition(), [check('pass')], [runtimeCase('pass'), runtimeCase('blocked'), runtimeCase('fail')], []);
  assert.equal(statusOf(report), 'fail');
});

test('blocked or not-run evidence cannot be averaged into a pass', () => {
  for (const status of ['blocked', 'not-run']) {
    const report = aggregate(definition(), [check('pass')], [runtimeCase('pass'), runtimeCase(status)], []);
    assert.equal(statusOf(report), status);
  }
});

test('CLI runtime and persona success cannot supply native Cowork evidence', () => {
  const definitions = { outcomes: [{ id: 'ONB-01', required_evidence: ['contract', 'persona', 'cowork'] }] };
  const make = status => ({ id: 'start', outcome: 'ONB-01', status });
  const report = aggregate(definitions, [make('pass')], [
    { id: 'cli', level: 'model-runtime', checks: [make('pass')] },
    { id: 'reader', level: 'persona', checks: [make('pass')] }
  ], ['cli', 'reader']);
  assert.equal(statusOf(report), 'not-run');
  assert.equal(report.outcomes[0].evidence.find(item => item.level === 'cowork').status, 'not-run');
});

test('incomplete required scenario coverage must not produce a passing outcome', () => {
  const report = aggregate(definition(), [check('pass')], [runtimeCase('pass')], ['install-case', 'missing-install-case']);
  assert.deepEqual(report.missing_cases, ['missing-install-case']);
  assert.notEqual(statusOf(report), 'pass');
});

test('a case execution error cannot be hidden by earlier passing checks', () => {
  const report = aggregate(definition(), [check('pass')], [runtimeCase('pass', { error: 'Judge unavailable after artifact check.' })], ['install-case']);
  assert.notEqual(statusOf(report), 'pass');
});

test('unknown check statuses cannot become a pass', () => {
  const report = aggregate(definition(), [check('pass')], [runtimeCase('incomplete')], []);
  assert.notEqual(statusOf(report), 'pass');
});

test('required cases bind to their outcome and layer, including absent checks in a present case', () => {
  const definitions = { outcomes: [
    { id: 'ONB-02', required_evidence: ['model-runtime'] },
    { id: 'ONB-03', required_evidence: ['model-runtime'] }
  ] };
  const expected = [
    { id: 'install-case', level: 'model-runtime', outcomes: ['ONB-02'] },
    { id: 'return-case', level: 'model-runtime', outcomes: ['ONB-03'] }
  ];
  const report = aggregate(definitions, [], [runtimeCase('pass')], expected);
  assert.equal(report.outcomes[0].status, 'pass');
  assert.equal(report.outcomes[1].status, 'not-run');
  const missingCheck = aggregate(definitions, [], [runtimeCase('pass'), { id: 'return-case', level: 'model-runtime', checks: [] }], expected);
  assert.equal(missingCheck.outcomes[1].status, 'not-run');
});

test('snapshot and changed observe new, modified and deleted bytes', t => {
  const dir = folder(t, { 'keep.txt': 'same', 'edit.txt': 'before', 'gone.txt': 'remove' });
  const before = snapshot(dir);
  put(dir, 'edit.txt', 'after');
  fs.unlinkSync(path.join(dir, 'gone.txt'));
  put(dir, 'nested/new.md', 'new');
  assert.deepEqual(changed(before, snapshot(dir)), ['edit.txt', 'gone.txt', 'nested/new.md']);
  assert.deepEqual(changed(before, { ...before }), []);
});

test('snapshot rejects a learner symlink instead of following it', t => {
  const dir = folder(t, { 'real.txt': 'inside' });
  fs.symlinkSync(path.join(dir, 'real.txt'), path.join(dir, 'link.txt'));
  assert.throws(() => snapshot(dir), /Unexpected learner symlink/);
});

test('root instruction injection and any resume mutation fail independent invariants', t => {
  for (const name of ['CLAUDE.md', 'AGENTS.md', 'prework/learning-position.md']) {
    const dir = folder(t, { 'prework/learning-position.md': 'unfinished' });
    const before = snapshot(dir);
    put(dir, name, 'unrequested mutation');
    const checks = invariantChecks(spec(), dir, before, snapshot(dir));
    assert.equal(row(checks, 'write-scope').status, 'fail');
    if (name.endsWith('AGENTS.md') || name.endsWith('CLAUDE.md')) assert.equal(row(checks, 'learner-root').status, 'fail');
  }
});

test('pause preserves existing output and records required position note', t => {
  const dir = folder(t, { 'prework/snake.html': 'existing game' });
  const before = snapshot(dir);
  put(dir, 'prework/learning-position.md', 'Current: snake\nUnfinished: play it');
  const scenario = spec({ id: 'pause-test', allowed: name => name === 'prework/learning-position.md', inspect: { required: ['prework/learning-position.md'], preserve: ['prework/snake.html'] } });
  assert.ok(invariantChecks(scenario, dir, before, snapshot(dir)).every(check => check.status === 'pass'));
  fs.unlinkSync(path.join(dir, 'prework/snake.html'));
  assert.equal(row(invariantChecks(scenario, dir, before, snapshot(dir)), 'preserved:prework/snake.html').status, 'fail');
});

test('preservation cannot pass when the named learner file was never present', t => {
  const dir = folder(t);
  const checks = invariantChecks(spec({ inspect: { preserve: ['missing.txt'] } }), dir, {}, {});
  assert.equal(row(checks, 'preserved:missing.txt').status, 'fail');
});

test('all identity and source canaries fail the local note privacy check', t => {
  for (const canary of ['Mira Vale', 'Cedar Relay', 'CANARY-DO-NOT-SAVE-8421']) {
    const dir = folder(t, { 'prework/learning-position.md': `Current: snake\n${canary}` });
    const checks = invariantChecks(spec({ id: 'pause-test', allowed: () => true, inspect: { privateNote: true } }), dir, {}, snapshot(dir));
    assert.equal(row(checks, 'note-canaries').status, 'fail');
  }
});

function html(extra = '') {
  const prompt = body => `<div class="prompt-block"><pre><code>${body}</code></pre></div>`;
  return `<!doctype html><html><body><div class="a101-onboarding">Start with one folder. ${extra}</div><section id="prework">Prework${prompt('Extract the starter tarball.')}${prompt('Build me a one-page personal site.\nLinkedIn:')}${prompt('Help me pause Agents 101.')}${prompt('Help me resume Agents 101.')}${prompt('Build me a snake game.')}${prompt('Write a rules file.')}${prompt('First ask me which line on my site is most me.')}</section></body></html>`;
}

test('material extracts exact copy bodies, visible reader text, anchors and external assets', () => {
  const content = material(html('<img src="https://external.example/pixel.png">'));
  assert.equal(content.prompts.baseline, 'Build me a one-page personal site.\nLinkedIn:');
  assert.match(content.readerText, /Start with one folder/);
  assert.ok(content.anchors.includes('prework'));
  assert.deepEqual(content.externalAssets, ['https://external.example/pixel.png']);
  assert.throws(() => material('<!doctype html><p>Missing course</p>'), /Rendered prompt missing/);
});

test('reader material must exclude hidden alternate-runtime instructions', () => {
  const content = material(html('<span hidden>HIDDEN-CLI-SETUP-SECRET</span><div class="rt-profile-cli">CLI-PROFILE-SECRET</div><div class="rt-profile-cowork"><h2>Resume learning</h2><a href="#resume-learning">Resume here</a></div><style>.off {display:none}</style><span class="off">CSS-HIDDEN-SECRET</span>'));
  assert.doesNotMatch(content.readerText, /HIDDEN-CLI-SETUP-SECRET|CLI-PROFILE-SECRET|CSS-HIDDEN-SECRET|display:none/);
  assert.match(content.readerText, /## Resume learning/);
  assert.ok(content.readerText.includes(`[Resume here](${BASE}#resume-learning)`));
});

test('observations expose literal response and file quotes for exact judge evidence', async t => {
  const note = 'Current section: Phase 3: "Strengths"\nIn progress: learner wording revision.';
  const dir = folder(t, { 'prework/learning-position.md': note });
  const after = snapshot(dir);
  const response = 'I saved your section "Strengths" and will wait.';
  const observed = observation(dir, after, after, [response], []);
  assert.ok(observed.includes(note));
  assert.ok(observed.includes(response));
  const judged = await judgeCase({ caseId: 'literal-quotes', facts: {}, criteria: [{ id: 'note', outcome: 'ONB-05', requirement: 'Quotes actual section.' }], observation: observed,
    call: async () => ({ text: JSON.stringify({ criteria: [{ id: 'note', status: 'pass', evidence: note, reason: 'Exact saved note is present.' }] }) }) });
  assert.equal(judged.criteria[0].evidence, note);
});

test('actual multiline tool results and requests remain literal exact judge evidence', async t => {
  const dir = folder(t);
  const command = 'tar xzf agents-101-starter.tar.gz\nprintf EXTRACTED';
  const actualResult = 'tar: Failed to set default locale\nEXTRACTED';
  const events = [
    { type: 'assistant', message: { content: [{ type: 'tool_use', id: 'extract-tool', name: 'Bash', input: { command } }] } },
    { type: 'user', message: { content: [{ type: 'tool_result', tool_use_id: 'extract-tool', content: actualResult, is_error: false }] }, tool_use_result: { stdout: actualResult, exit_code: 0 } },
    { type: 'user', message: { content: [{ type: 'tool_result', tool_use_id: 'extract-tool', content: [{ type: 'text', text: 'First actual text block.' }, { type: 'text', text: 'Second actual text block.' }], is_error: true }] } }
  ];
  const observed = observation(dir, {}, {}, [], events);
  assert.ok(observed.includes(command));
  assert.ok(observed.includes(actualResult));
  assert.ok(observed.includes('First actual text block.\nSecond actual text block.'));
  assert.match(observed, /ACTUAL TOOL REQUEST Bash id=extract-tool/);
  assert.match(observed, /ACTUAL TOOL RESULT Bash id=extract-tool/);
  assert.match(observed, /"is_error":true/);
  const metadata = observed.split('=== FILE METADATA AND TOOL EVENTS JSON ===\n\n')[1];
  assert.deepEqual(JSON.parse(metadata).tool_events, events);
  const judged = await judgeCase({ caseId: 'literal-tool-result', facts: {}, criteria: [{ id: 'extracted', outcome: 'ONB-02', requirement: 'Use actual extraction tool result.' }], observation: observed,
    call: async () => ({ text: JSON.stringify({ criteria: [{ id: 'extracted', status: 'pass', evidence: actualResult, reason: 'Exact multiline tool result appears in the actual observation.' }] }) }) });
  assert.equal(judged.criteria[0].evidence, actualResult);
});

test('start fingerprints capture source filenames and end drift blocks changed/deleted inputs', t => {
  const dir = folder(t, { 'delivery/onboarding.md': 'start', 'scripts/helper.js': 'helper' });
  const paths = ['delivery', 'scripts'];
  const start = { revision: 'abc', files: sourceFingerprints(dir, paths) };
  assert.ok(start.files['delivery/onboarding.md']);
  assert.equal(driftCheck(start, { revision: 'abc', files: sourceFingerprints(dir, paths) }).status, 'pass');
  put(dir, 'delivery/onboarding.md', 'changed after start');
  fs.unlinkSync(path.join(dir, 'scripts/helper.js'));
  const drift = driftCheck(start, { revision: 'abc', files: sourceFingerprints(dir, paths) });
  assert.equal(drift.status, 'blocked');
  assert.deepEqual(drift.changed_files, ['delivery/onboarding.md', 'scripts/helper.js']);
  assert.equal(driftCheck(start, { revision: 'def', files: start.files }).status, 'blocked');
});

test('per-call provenance records actual model, CLI, status and evidence-root-relative paths', t => {
  // Synthetic metadata verifies serialization only, not real model success.
  const out = folder(t);
  const outputDir = path.join(out, 'case');
  put(out, 'case/actor.status.json', JSON.stringify({ ok: true, model: 'actual-fixture-model', cli_version: '2.x fixture', elapsed_ms: 12 }));
  put(out, 'case/actor.request.json', JSON.stringify({ binary: '/fixture/claude' }));
  put(out, 'case/actor.stdout.jsonl', '{"type":"result"}\n');
  const record = callRecord({ outputDir, tag: 'actor', tools: true, model: 'sonnet' }, out, { model: 'actual-fixture-model' });
  assert.equal(record.model_actual, 'actual-fixture-model');
  assert.equal(record.cli_version, '2.x fixture');
  assert.equal(record.cli_binary, '/fixture/claude');
  assert.equal(record.raw.status, 'case/actor.status.json');
  assert.equal(record.raw.stdout, 'case/actor.stdout.jsonl');
  assert.equal(callRecord({ outputDir, tag: 'failed' }, out, null, new Error('CLI failed')).status, 'blocked');
});

test('successful extraction points the learner to the calendar exercise and waits for their input', () => {
  const checkpoints = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../../delivery/agents-101-mvp/checkpoints.json'), 'utf8'));
  const extraction = checkpoints.find(item => item.key === 'a101-prework-extract-tarball');
  assert.equal(extraction.currentAnchor, '#3-install-the-training-folder-3-min');
  assert.equal(extraction.nextAnchor, '#make-your-calendar-briefing');
  assert.equal(extraction.nextLabel, 'Summarize your week in meetings');
  const cases = scenarios({ extract: 'Extract', baseline: 'Build', pause: 'Pause', resume: 'Resume' });
  const installed = cases.find(item => item.id === 'starter-present');
  const requirement = installed.checks.find(item => item.id === 'return').requirement;
  assert.ok(requirement.includes(BASE + extraction.nextAnchor));
  assert.match(requirement, /waits for the learner to bring a calendar screenshot/);
  assert.doesNotMatch(requirement, /#4-build-a-snake-game/);
  assert.match(requirement, /does not start either exercise or ask the learner to configure folder instructions/);
  assert.ok(installed.inspect.absent.includes('prework/snake.html'));
  const missing = cases.find(item => item.id === 'starter-missing');
  assert.match(missing.checks[0].requirement, /does not claim successful installation or advance to later Prework tasks/);
});

test('human-stage fixtures keep identical artifacts but distinguish pending inspection from explicit completion', () => {
  const cases = scenarios({ extract: 'Extract', baseline: 'Build', pause: 'Pause', resume: 'Resume' });
  const pending = cases.find(item => item.id === 'resume-unfinished');
  const complete = cases.find(item => item.id === 'resume-complete');
  assert.equal(pending.files['module-1/personal-brand-generation.md'], complete.files['module-1/personal-brand-generation.md']);
  assert.match(pending.files['prework/learning-position.md'], /learner has not inspected or accepted/);
  assert.match(complete.files['prework/learning-position.md'], /learner inspected.*accepted/);
  assert.match(pending.checks[0].requirement, /finish inspection/);
  assert.match(complete.checks[0].requirement, /recorded completion/);
  assert.ok(pending.checks[0].requirement.includes(`${BASE}#phase-7-close-package-what-you-learned`));
  assert.ok(complete.checks[0].requirement.includes(`${BASE}#see-the-mechanism-repeat-in-every-phase`));
  const snake = cases.find(item => item.id === 'pause-human-action-pending');
  assert.ok(snake.files['prework/snake.html']);
  assert.match(snake.prompt, /have not opened or played/);
  assert.match(snake.checks[0].requirement, /unfinished learner play\/check/);
});

test('model payload parsing requires a single successful final result, not an assistant claim', () => {
  const emit = events => events.map(event => JSON.stringify(event)).join('\n');
  const assistant = { type: 'assistant', message: { content: [{ type: 'text', text: 'Done' }] } };
  const final = { type: 'result', subtype: 'success', is_error: false, result: 'Actual final response' };
  assert.throws(() => parseEvents(emit([assistant])), /Expected one final result/);
  assert.throws(() => parseEvents(emit([final, final])), /Expected one final result/);
  assert.throws(() => parseEvents(emit([{ ...final, is_error: true }])), /Claude result failed/);
  const parsed = parseEvents(emit([assistant, final]));
  assert.equal(parsed.result.result, 'Actual final response');
  assert.equal(parsed.events.length, 2);
});

test('guide-based route closure needs shipped exact links and an explicit load cue, without a checkpoint key', () => {
  const cp = { currentAnchor: '#current', nextAnchor: '#next' };
  const guide = `Current: ${BASE}#current\nNext: ${BASE}#next`;
  const cue = 'Use `prework/course-navigation.md` for the workbook return.';
  assert.equal(routeClosed(cp, cue, guide, ['current', 'next']), true);
  assert.equal(routeClosed(cp, 'Build a page.', guide, ['current', 'next']), false);
  assert.equal(routeClosed(cp, cue, `Only current: ${BASE}#current`, ['current', 'next']), false);
  assert.equal(routeClosed(cp, cue, guide, ['current']), false);
  assert.equal(routeClosed(cp, 'Build a page.', guide, ['current', 'next'], cue), true);
});

test('only extraction may install the exact navigation loader; other root changes still fail', t => {
  const dir = folder(t);
  const before = snapshot(dir);
  const extraction = spec({ id: 'starter-present', archive: true, allowed: name => name === 'CLAUDE.md' });
  assert.equal(row(invariantChecks(extraction, dir, before, snapshot(dir)), 'learner-root').status, 'fail');
  put(dir, 'CLAUDE.md', NAVIGATION_LOADER);
  const installed = snapshot(dir);
  assert.equal(row(invariantChecks(extraction, dir, before, installed), 'learner-root').status, 'pass');
  assert.equal(row(invariantChecks(spec(), dir, installed, installed), 'learner-root').status, 'pass');
  assert.equal(row(invariantChecks(spec(), dir, {}, installed), 'learner-root').status, 'fail');
  put(dir, 'CLAUDE.md', NAVIGATION_LOADER + 'Teach the whole course automatically.\n');
  assert.equal(row(invariantChecks(extraction, dir, before, snapshot(dir)), 'learner-root').status, 'fail');
});

test('actor context explicitly loads the actual pointer, never the guide, without claiming native autoload', t => {
  const dir = folder(t, { 'CLAUDE.md': NAVIGATION_LOADER, 'prework/course-navigation.md': 'GUIDE-BODY-MUST-BE-READ-BY-ACTOR' });
  const args = { tools: true, cwd: dir, prompt: 'Build a snake game.' };
  const loaded = actorContext(args);
  assert.ok(loaded.prompt.includes(NAVIGATION_LOADER));
  assert.ok(loaded.prompt.endsWith('Build a snake game.'));
  assert.doesNotMatch(loaded.prompt, /GUIDE-BODY-MUST-BE-READ-BY-ACTOR/);
  assert.equal(loaded.contextReceipt.native_autoload_proven, false);
  assert.equal(loaded.contextReceipt.mechanism, 'harness-loaded CLI context');
  assert.deepEqual(loaded.contextReceipt.files.map(file => file.path), ['CLAUDE.md']);
  assert.equal(actorContext({ ...args, tools: false }).prompt, args.prompt);
});

test('actor extraction must preserve every published archive byte, including policies and guide', t => {
  const dir = folder(t, { 'prework/course-navigation.md': '# Published navigation\n', 'module-4/policies/privacy.md': '# Published policy\n', 'prompts/request.md': 'Canonical request\n' });
  const archiveFiles = snapshot(dir);
  put(dir, 'CLAUDE.md', NAVIGATION_LOADER);
  const extraction = spec({ id: 'starter-present', archive: true, allowed: () => true });
  assert.equal(row(invariantChecks(extraction, dir, {}, snapshot(dir), { archiveFiles }), 'archive-integrity').status, 'pass');
  fs.unlinkSync(path.join(dir, 'module-4/policies/privacy.md'));
  const missing = row(invariantChecks(extraction, dir, {}, snapshot(dir), { archiveFiles }), 'archive-integrity');
  assert.equal(missing.status, 'fail');
  assert.match(missing.reason, /module-4\/policies\/privacy\.md/);
  put(dir, 'module-4/policies/privacy.md', '# Published policy\n');
  put(dir, 'prework/course-navigation.md', 'Modified guide');
  assert.equal(row(invariantChecks(extraction, dir, {}, snapshot(dir), { archiveFiles }), 'archive-integrity').status, 'fail');
  assert.equal(row(invariantChecks(extraction, dir, {}, snapshot(dir)), 'archive-integrity').status, 'not-run');
});

function readEvents(dir, guide, options = {}) {
  const request = { type: 'assistant', message: { content: [{ type: 'tool_use', id: 'read-guide', name: options.bash ? 'Bash' : 'Read', input: options.bash ? { command: options.command || 'cat prework/course-navigation.md' } : { file_path: options.file || path.join(dir, 'prework/course-navigation.md') } }] } };
  const content = options.numbered ? guide.split('\n').map((line, index) => `${index + 1}\t${line}`).join('\n') : guide;
  const result = { type: 'user', message: { content: [{ type: 'tool_result', tool_use_id: 'read-guide', content, ...(options.error ? { is_error: true } : {}) }] }, ...(options.exitCode !== undefined ? { tool_use_result: { exit_code: options.exitCode } } : {}) };
  return [request, result];
}

test('successful guide provenance needs a paired complete actual Read result, not a request or claim', t => {
  const guide = '# Guide\n\nRead the workbook.\n  Preserve indentation.\n';
  const dir = folder(t, { 'prework/course-navigation.md': guide });
  const events = readEvents(dir, guide, { numbered: true });
  const checked = guideReadCheck(events, guide, dir, 'ONB-06');
  assert.equal(checked.status, 'pass');
  assert.equal(checked.outcome, 'ONB-06');
  assert.equal(checked.tool_use_id, 'read-guide');
  assert.equal(guideReadCheck(events.slice(0, 1), guide, dir).status, 'not-run');
  assert.equal(guideReadCheck([{ type: 'assistant', message: { content: [{ type: 'text', text: 'I read the guide.' }] } }], guide, dir).status, 'not-run');
  assert.equal(guideReadCheck(readEvents(dir, guide, { error: true }), guide, dir).status, 'not-run');
  assert.equal(guideReadCheck(readEvents(dir, '# Guide\nTruncated'), guide, dir).status, 'not-run');
  assert.equal(guideReadCheck(readEvents(dir, guide, { file: 'other-guide.md' }), guide, dir).status, 'not-run');
});

test('equivalent Bash guide evidence requires actual bounded read, full returned content and success', t => {
  const guide = '# Guide\nThe actual navigation body.\n';
  const dir = folder(t, { 'prework/course-navigation.md': guide });
  assert.equal(guideReadCheck(readEvents(dir, guide, { bash: true, exitCode: 0 }), guide, dir).status, 'pass');
  assert.equal(guideReadCheck(readEvents(dir, guide, { bash: true, exitCode: 1 }), guide, dir).status, 'not-run');
  assert.equal(guideReadCheck(readEvents(dir, guide, { bash: true, command: 'echo "I read prework/course-navigation.md"' }), guide, dir).status, 'not-run');
});

test('extraction preserves existing root prefix and adds exactly one cue; repeat must be byte-idempotent', t => {
  const original = 'Write in British English.\n';
  const dir = folder(t, { 'CLAUDE.md': original });
  const before = snapshot(dir);
  const extraction = spec({ id: 'starter-existing-instructions', archive: true, allowed: () => true, inspect: { rootOriginal: original, rootIdempotent: true } });
  assert.equal(row(invariantChecks(extraction, dir, before, before, { afterFirst: before }), 'learner-root').status, 'pass');
  put(dir, 'CLAUDE.md', original + '\n' + NAVIGATION_LOADER);
  const afterFirst = snapshot(dir);
  const checked = invariantChecks(extraction, dir, before, afterFirst, { afterFirst });
  assert.equal(row(checked, 'learner-root').status, 'pass');
  assert.equal(row(checked, 'root-idempotent').status, 'pass');
  put(dir, 'CLAUDE.md', original + '\n' + NAVIGATION_LOADER + NAVIGATION_LOADER);
  const duplicated = invariantChecks(extraction, dir, before, snapshot(dir), { afterFirst });
  assert.equal(row(duplicated, 'learner-root').status, 'fail');
  assert.equal(row(duplicated, 'root-idempotent').status, 'fail');
  put(dir, 'CLAUDE.md', 'Write in American English.\n' + NAVIGATION_LOADER);
  assert.equal(row(invariantChecks(extraction, dir, before, snapshot(dir), { afterFirst }), 'learner-root').status, 'fail');
  assert.equal(row(invariantChecks(extraction, dir, before, snapshot(dir)), 'root-idempotent').status, 'not-run');
});

test('pause then cold resume keeps the newly saved state and requires another observed guide read', t => {
  const guide = '# Guide\nRecover the learner position.\n';
  const dir = folder(t, { 'CLAUDE.md': NAVIGATION_LOADER, 'prework/course-navigation.md': guide, 'prework/snake.html': 'Existing game' });
  const before = snapshot(dir);
  put(dir, 'prework/learning-position.md', 'Game written; learner has not played it.');
  const afterFirst = snapshot(dir);
  const pause = spec({ id: 'pause-human-action-pending', installed: true, coldFollowup: 'Help me resume Agents 101.', allowed: name => name === 'prework/learning-position.md' });
  const events = readEvents(dir, guide);
  let checks = invariantChecks(pause, dir, before, afterFirst, { afterFirst, events, coldEvents: events });
  assert.equal(row(checks, 'cold-resume-write-scope').status, 'pass');
  assert.equal(row(checks, 'cold-resume-guide-read').status, 'pass');
  assert.equal(row(invariantChecks(pause, dir, before, afterFirst, { afterFirst, events }), 'cold-resume-guide-read').status, 'not-run');
  put(dir, 'prework/snake.html', 'Unrequested resumed mutation');
  checks = invariantChecks(pause, dir, before, snapshot(dir), { afterFirst, events, coldEvents: events });
  assert.equal(row(checks, 'cold-resume-write-scope').status, 'fail');
  assert.deepEqual(followupRequest({ prompt: 'OLD-REQUEST', coldFollowup: 'Resume only.' }, 'OLD-RESPONSE'), { prompt: 'Resume only.', tag: 'cold-resume' });
  assert.match(followupRequest({ prompt: 'OLD-REQUEST', followup: 'Revise.' }, 'OLD-RESPONSE').prompt, /OLD-REQUEST[\s\S]*OLD-RESPONSE/);
});
