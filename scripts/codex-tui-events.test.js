const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');

const parser = path.resolve(__dirname, '../curriculum/evals/mechanical/tmux-runner/lib/codex-tui-events.js');

test('Codex TUI completion counts only the root CLI rollout', (t) => {
  const home = fs.mkdtempSync(path.join(os.tmpdir(), 'codex-tui-events-'));
  t.after(() => fs.rmSync(home, { recursive: true, force: true }));
  const sessions = path.join(home, 'sessions/2026/09/03');
  fs.mkdirSync(sessions, { recursive: true });
  fs.writeFileSync(path.join(sessions, 'root.jsonl'), [
    JSON.stringify({ type: 'session_meta', payload: { source: 'cli', thread_source: 'user' } }),
    JSON.stringify({ type: 'event_msg', payload: { type: 'task_complete', last_agent_message: 'first' } }),
    JSON.stringify({ type: 'event_msg', payload: { type: 'task_complete', last_agent_message: 'second' } }),
    '',
  ].join('\n'));
  fs.writeFileSync(path.join(sessions, 'child.jsonl'), [
    JSON.stringify({ type: 'session_meta', payload: { source: { subagent: {} }, thread_source: 'subagent' } }),
    JSON.stringify({ type: 'event_msg', payload: { type: 'task_complete', last_agent_message: 'child' } }),
    '',
  ].join('\n'));

  const state = JSON.parse(execFileSync(process.execPath, [parser, home], { encoding: 'utf8' }));
  assert.equal(state.completedTurns, 2);
  assert.equal(state.successfulTurns, 2);
  assert.equal(state.failedTurns, 0);
  assert.deepEqual(state.lastCompletion, { ok: true, error: null });
  assert.equal(state.lastMessage, 'second');
  assert.equal(state.rootRollouts.length, 1);
});

test('Codex TUI completion exposes a failed root turn instead of treating it as success', (t) => {
  const home = fs.mkdtempSync(path.join(os.tmpdir(), 'codex-tui-events-'));
  t.after(() => fs.rmSync(home, { recursive: true, force: true }));
  const sessions = path.join(home, 'sessions/2026/09/05');
  fs.mkdirSync(sessions, { recursive: true });
  fs.writeFileSync(path.join(sessions, 'root.jsonl'), [
    JSON.stringify({ type: 'session_meta', payload: { source: 'cli', thread_source: 'user' } }),
    JSON.stringify({
      type: 'event_msg',
      payload: {
        type: 'task_complete',
        last_agent_message: null,
        error: { message: 'stream disconnected before completion', codex_error_info: 'other' },
      },
    }),
    '',
  ].join('\n'));

  const state = JSON.parse(execFileSync(process.execPath, [parser, home], { encoding: 'utf8' }));
  assert.equal(state.completedTurns, 1);
  assert.equal(state.successfulTurns, 0);
  assert.equal(state.failedTurns, 1);
  assert.deepEqual(state.lastCompletion, {
    ok: false,
    error: 'stream disconnected before completion',
  });
});
