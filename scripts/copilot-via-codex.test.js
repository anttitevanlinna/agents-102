#!/usr/bin/env node
'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const {
  createWorkflowContext,
  main,
  parseArgs,
  preparePrompt,
  readWorkflowArgs,
  statePath,
} = require('./copilot-via-codex.js');

const REPO = path.resolve(__dirname, '..');

function tempDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'copilot-via-codex-test-'));
}

function fakeResult(threadId, finalText = 'OK') {
  const rawStdout = [
    JSON.stringify({ type: 'thread.started', thread_id: threadId }),
    JSON.stringify({ type: 'item.completed', item: { type: 'agent_message', text: finalText } }),
    JSON.stringify({ type: 'turn.completed', usage: { input_tokens: 1, output_tokens: 1 } }),
    '',
  ].join('\n');
  return { threadId, finalText, rawStdout, rawStderr: '', events: [] };
}

test('Copilot prompt flags parse on both sides of the command surface', () => {
  assert.deepEqual(parseArgs([
    '--experimental', '--add-dir=../agents-102-core', '-p', 'hello',
    '--session-id', 'stable', '--allow-tool=shell', '--output-format', 'json',
  ]), {
    mode: 'prompt',
    addDirs: ['../agents-102-core'],
    allowTools: ['shell'],
    allowUrls: [],
    outputFormat: 'json',
    experimental: true,
    prompt: 'hello',
    sessionId: 'stable',
  });
  assert.equal(parseArgs(['--add-dir', '../core', 'workflow', 'run', 'eval-sweep', '--args', '{}']).mode, 'workflow');
});

test('the scoped PATH wrapper presents the command as copilot', () => {
  const wrapper = path.join(REPO, 'scripts', 'copilot-via-codex-bin', 'copilot');
  const result = spawnSync(wrapper, ['--version'], { encoding: 'utf8' });
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /^copilot-via-codex 0\.1\.0/);
});

test('unsupported command shapes fail closed', () => {
  assert.throws(() => parseArgs(['--agent', 'reviewer', '-p', 'x']), /unsupported Copilot option/);
  assert.throws(() => parseArgs(['workflow', 'run', 'other']), /unsupported workflow/);
  assert.throws(() => parseArgs([]), /interactive Copilot TUI behavior is not emulated/);
  assert.throws(() => parseArgs(['-p', 'x', '--args', '{}']), /only supported with workflow run/);
  assert.throws(() => parseArgs(['workflow', 'run', 'eval-sweep', '--session-id', 'x']), /not supported with workflow run/);
});

test('session-start context and Copilot prompt transformation reach Codex once', async () => {
  const cwd = tempDir();
  fs.mkdirSync(path.join(cwd, '.claude'), { recursive: true });
  fs.mkdirSync(path.join(cwd, '.github', 'copilot'), { recursive: true });
  fs.writeFileSync(path.join(cwd, '.claude', 'settings.json'), JSON.stringify({ hooks: {
    SessionStart: [{ hooks: [{ command: 'session-start' }] }],
    UserPromptSubmit: [{ hooks: [{ command: 'side-effect' }] }],
  } }));
  fs.writeFileSync(path.join(cwd, '.github', 'copilot', 'settings.json'), JSON.stringify({ hooks: {
    userPromptTransformed: [{ bash: 'transform' }],
  } }));
  const calls = [];
  const runHook = async (command, payload, hookOptions) => {
    calls.push({ command, payload, hookOptions });
    if (command === 'session-start') return { additionalContext: 'SESSION_CONTEXT' };
    if (command === 'transform') return { modifiedTransformedPrompt: `${payload.transformedPrompt}\nTRANSFORMED` };
    return {};
  };
  const prompt = await preparePrompt('WRITE SOMETHING', {
    cwd,
    coreDir: '../core',
    env: process.env,
    sessionId: 's-1',
    newSession: true,
    noAskUser: true,
    runHook,
  });
  assert.deepEqual(calls.map((call) => call.command), ['session-start', 'side-effect', 'transform']);
  assert.equal(calls[0].hookOptions.env.AGENTS_CORE_DIR, path.resolve(cwd, '../core'));
  assert.match(prompt, /SESSION_CONTEXT/);
  assert.match(prompt, /TRANSFORMED/);
  assert.match(prompt, /Do not ask an interactive question/);
});

test('stable Copilot session IDs map to Codex thread resume', async () => {
  const cwd = tempDir();
  const home = tempDir();
  const calls = [];
  let stdout = '';
  const runCodex = async (options) => {
    calls.push(options);
    return fakeResult(options.threadId || 'codex-thread-1', calls.length === 1 ? 'FIRST' : 'SECOND');
  };
  const injected = {
    cwd,
    repoRoot: REPO,
    env: { ...process.env, COPILOT_HOME: home },
    runCodex,
    stdout: (text) => { stdout += text; },
    stderr: () => {},
  };
  await main(['-p', 'one', '--session-id', 'copilot-session'], injected);
  await main(['-p', 'two', '--session-id', 'copilot-session'], injected);
  assert.equal(calls[0].threadId, undefined);
  assert.equal(calls[1].threadId, 'codex-thread-1');
  assert.equal(stdout, 'FIRST\nSECOND\n');
  const state = JSON.parse(fs.readFileSync(statePath(injected.env), 'utf8'));
  assert.equal(state.sessions['copilot-session'].codexThreadId, 'codex-thread-1');
});

test('a stable session cannot silently move to another working directory', async () => {
  const first = tempDir();
  const second = tempDir();
  const home = tempDir();
  const env = { ...process.env, COPILOT_HOME: home };
  const runCodex = async () => fakeResult('thread');
  await main(['-p', 'one', '--session-id', 'same'], { cwd: first, repoRoot: REPO, env, runCodex, stdout: () => {}, stderr: () => {} });
  await assert.rejects(
    main(['-p', 'two', '--session-id', 'same'], { cwd: second, repoRoot: REPO, env, runCodex, stdout: () => {}, stderr: () => {} }),
    /belongs to/,
  );
});

test('JSON mode returns the backend trace instead of scraping final prose', async () => {
  const cwd = tempDir();
  let stdout = '';
  await main(['-p', 'one', '--output-format', 'json'], {
    cwd,
    repoRoot: REPO,
    env: { ...process.env, COPILOT_HOME: tempDir() },
    runCodex: async () => fakeResult('trace-thread'),
    stdout: (text) => { stdout += text; },
    stderr: () => {},
  });
  assert.match(stdout, /"type":"thread.started"/);
  assert.match(stdout, /"thread_id":"trace-thread"/);
});

test('workflow arguments accept inline JSON and @files', () => {
  const cwd = tempDir();
  fs.writeFileSync(path.join(cwd, 'args.json'), '{"items":[]}\n');
  assert.deepEqual(readWorkflowArgs('{"items":[]}', cwd), { items: [] });
  assert.deepEqual(readWorkflowArgs('@args.json', cwd), { items: [] });
  assert.throws(() => readWorkflowArgs('null', cwd), /object or array/);
});

test('the real canonical eval-sweep runs through the command adapter', async () => {
  let stdout = '';
  let stderr = '';
  let calls = 0;
  await main(['workflow', 'run', 'eval-sweep', '--args', '{"items":[]}', '--silent', '--output-format', 'json'], {
    cwd: REPO,
    repoRoot: REPO,
    env: { ...process.env, COPILOT_HOME: tempDir() },
    runCodex: async () => { calls += 1; return fakeResult('unused'); },
    stdout: (text) => { stdout += text; },
    stderr: (text) => { stderr += text; },
  });
  assert.equal(calls, 0);
  const result = JSON.parse(stdout);
  assert.equal(result.expected, 0);
  assert.equal(result.returned, 0);
  assert.deepEqual(result.missing, []);
  assert.deepEqual(result.unbound, []);
  assert.deepEqual(result.summary, []);
  assert.equal(stderr, '', '--silent must suppress workflow phases and progress');
});

test('the workflow context sends schemas and parses structured Codex output', async () => {
  const traceDir = tempDir();
  const calls = [];
  const context = createWorkflowContext({
    args: {}, cwd: REPO, addDirs: ['../agents-102-core'], model: 'session-model',
    allowAll: false, useUserConfig: false, env: process.env, traceDir,
    stderr: () => {},
    runCodex: async (options) => {
      calls.push(options);
      return fakeResult('judge-thread', '{"verdict":"PASS"}');
    },
  });
  const value = await context.agent('judge this', {
    label: 'writing:file.md',
    model: 'judge-model',
    reasoningEffort: 'high',
    schema: { type: 'object' },
  });
  assert.deepEqual(value, { verdict: 'PASS' });
  assert.equal(calls[0].model, 'judge-model');
  assert.equal(calls[0].reasoningEffort, 'high');
  assert.deepEqual(calls[0].schema, { type: 'object' });
  assert.equal(fs.readdirSync(traceDir).length, 1);
});
