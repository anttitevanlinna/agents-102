#!/usr/bin/env node
'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const { copilotMeta, copilotAgentOptions, loadClaudeWorkflow } = require('./copilot-workflow-adapter.js');

const SCRIPT = path.resolve(__dirname, '../.claude/workflows/eval-sweep.js');

test('the Copilot extension reads the canonical eval-sweep body and metadata', () => {
  const workflow = loadClaudeWorkflow(SCRIPT);
  assert.equal(workflow.meta.name, 'eval-sweep');
  assert.match(workflow.meta.description, /class judge/);
  assert.match(workflow.meta.description, /When to use:/);
  assert.equal('whenToUse' in workflow.meta, false);
  assert.equal(typeof workflow.copilotRun, 'function');
});

test('Copilot registration metadata contains only supported fields', () => {
  assert.deepEqual(
    copilotMeta({ name: 'x', description: 'does x', whenToUse: 'now', phases: [] }),
    { name: 'x', description: 'does x\n\nWhen to use: now', phases: [] },
  );
});

test('Claude-only option names map without inventing Copilot model IDs', () => {
  assert.deepEqual(
    copilotAgentOptions({ label: 'judge', schema: { type: 'object' }, model: 'sonnet', effort: 'high' }),
    { label: 'judge', schema: { type: 'object' }, reasoningEffort: 'high' },
  );
  assert.deepEqual(
    copilotAgentOptions({ label: 'judge', model: 'gpt-5.4' }),
    { label: 'judge', model: 'gpt-5.4' },
  );
});

test('the canonical workflow executes through a Copilot-shaped context', async () => {
  const calls = [];
  const workflow = loadClaudeWorkflow(SCRIPT);
  const result = await workflow.copilotRun({
    args: { items: [] },
    agent: async (prompt, options) => { calls.push({ prompt, options }); return null; },
    parallel: async (thunks) => Promise.all(thunks.map((fn) => fn().catch(() => null))),
    pipeline: async (items, ...stages) => Promise.all(items.map(async (item, i) => {
      let value = item;
      for (const stage of stages) value = await stage(value, item, i);
      return value;
    })),
    phase: () => {},
    log: () => {},
    workflow: async () => { throw new Error('nested workflows are not used'); },
  });
  assert.equal(result.expected, 0);
  assert.equal(result.returned, 0);
  assert.deepEqual(result.missing, []);
  assert.equal(calls.length, 0);
});
