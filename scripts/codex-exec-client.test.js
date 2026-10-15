#!/usr/bin/env node
'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');
const {
  buildCodexArgs,
  parseJsonl,
  resultFromEvents,
} = require('./codex-exec-client.js');

test('new Codex turns use JSONL, an isolated config, and the workspace sandbox', () => {
  const args = buildCodexArgs({
    cwd: '/tmp/work',
    addDirs: ['/tmp/core'],
    model: 'gpt-test',
    reasoningEffort: 'high',
  }, '/tmp/schema.json');
  assert.deepEqual(args, [
    'exec', '--json', '--skip-git-repo-check', '--ignore-user-config',
    '--approve-for-me',
    '-C', '/tmp/work', '--add-dir', '/tmp/core',
    '--model', 'gpt-test', '--config', 'model_reasoning_effort="high"',
    '--output-schema', '/tmp/schema.json', '-',
  ]);
});

test('resumed Codex turns preserve the original session boundary', () => {
  const args = buildCodexArgs({
    cwd: '/different/work',
    addDirs: ['/different/core'],
    threadId: 'thread-123',
  });
  assert.deepEqual(args, [
    'exec', 'resume', '--json', '--skip-git-repo-check', '--ignore-user-config',
    'thread-123', '-',
  ]);
  assert.equal(args.includes('--add-dir'), false);
  assert.equal(args.includes('--approve-for-me'), false);
});

test('allow-all maps only to Codex explicit bypass mode', () => {
  const args = buildCodexArgs({ cwd: '/tmp/work', addDirs: [], allowAll: true });
  assert.ok(args.includes('--dangerously-bypass-approvals-and-sandbox'));
  assert.equal(args.includes('--approve-for-me'), false);
});

test('Codex JSONL yields the backend thread, final answer, and usage', () => {
  const raw = [
    JSON.stringify({ type: 'thread.started', thread_id: 't-1' }),
    JSON.stringify({ type: 'item.completed', item: { type: 'agent_message', text: 'first' } }),
    JSON.stringify({ type: 'item.completed', item: { type: 'agent_message', text: 'final' } }),
    JSON.stringify({ type: 'turn.completed', usage: { input_tokens: 2, output_tokens: 1 } }),
    '',
  ].join('\n');
  const events = parseJsonl(raw);
  assert.deepEqual(resultFromEvents(events), {
    threadId: 't-1',
    finalText: 'final',
    usage: { input_tokens: 2, output_tokens: 1 },
  });
});

test('invalid backend output fails instead of looking like an empty pass', () => {
  assert.throws(() => parseJsonl('{"type":"ok"}\nnot-json\n'), /invalid JSONL on line 2/);
});
