#!/usr/bin/env node
'use strict';

const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawn } = require('node:child_process');

function parseJsonl(text) {
  const events = [];
  for (const [index, line] of String(text).split(/\r?\n/).entries()) {
    if (!line.trim()) continue;
    try {
      events.push(JSON.parse(line));
    } catch (error) {
      throw new Error(`Codex emitted invalid JSONL on line ${index + 1}: ${error.message}`);
    }
  }
  return events;
}

function resultFromEvents(events) {
  const started = events.find((event) => event.type === 'thread.started');
  const messages = events
    .filter((event) => event.type === 'item.completed' && event.item?.type === 'agent_message')
    .map((event) => event.item.text);
  const completed = [...events].reverse().find((event) => event.type === 'turn.completed');
  return {
    threadId: started?.thread_id || null,
    finalText: messages.length ? messages[messages.length - 1] : '',
    usage: completed?.usage || null,
  };
}

function buildCodexArgs(options, schemaPath = null) {
  const args = ['exec'];
  const resume = Boolean(options.threadId);
  if (resume) args.push('resume');
  args.push('--json', '--skip-git-repo-check');
  if (!options.useUserConfig) args.push('--ignore-user-config');

  if (options.allowAll) {
    args.push('--dangerously-bypass-approvals-and-sandbox');
  } else if (!resume) {
    // In current Codex CLI, --approve-for-me selects the workspace-write
    // sandbox itself and is mutually exclusive with an explicit --sandbox.
    args.push('--approve-for-me');
  }

  if (!resume) {
    if (options.cwd) args.push('-C', path.resolve(options.cwd));
    for (const dir of options.addDirs || []) args.push('--add-dir', path.resolve(options.cwd || process.cwd(), dir));
  }
  if (options.model) args.push('--model', options.model);
  if (options.reasoningEffort) {
    args.push('--config', `model_reasoning_effort=${JSON.stringify(options.reasoningEffort)}`);
  }
  if (schemaPath) args.push('--output-schema', schemaPath);
  if (options.threadId) args.push(options.threadId);
  args.push('-');
  return args;
}

function spawnCaptured(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: options.cwd,
      env: options.env || process.env,
      stdio: ['pipe', 'pipe', 'pipe'],
    });
    let stdout = '';
    let stderr = '';
    child.stdout.on('data', (chunk) => {
      const text = chunk.toString();
      stdout += text;
      if (options.onStdout) options.onStdout(text);
    });
    child.stderr.on('data', (chunk) => {
      const text = chunk.toString();
      stderr += text;
      if (options.onStderr) options.onStderr(text);
    });
    child.on('error', reject);
    child.on('close', (code, signal) => resolve({ code, signal, stdout, stderr }));
    child.stdin.end(options.stdin || '');
  });
}

async function runCodex(options) {
  let schemaDir = null;
  let schemaPath = null;
  if (options.schema) {
    schemaDir = fs.mkdtempSync(path.join(os.tmpdir(), 'copilot-via-codex-schema-'));
    schemaPath = path.join(schemaDir, 'output.schema.json');
    fs.writeFileSync(schemaPath, `${JSON.stringify(options.schema, null, 2)}\n`);
  }

  const codexBin = options.codexBin || process.env.CODEX_BIN || 'codex';
  const args = buildCodexArgs(options, schemaPath);
  try {
    const child = await spawnCaptured(codexBin, args, {
      cwd: options.cwd || process.cwd(),
      env: options.env,
      stdin: options.prompt,
      onStdout: options.onStdout,
      onStderr: options.onStderr,
    });
    if (child.code !== 0) {
      const error = new Error(
        `Codex exited with ${child.code == null ? `signal ${child.signal}` : `code ${child.code}`}` +
        (child.stderr.trim() ? `: ${child.stderr.trim()}` : ''),
      );
      error.code = child.code;
      error.signal = child.signal;
      error.stdout = child.stdout;
      error.stderr = child.stderr;
      throw error;
    }
    const events = parseJsonl(child.stdout);
    const result = resultFromEvents(events);
    if (!result.threadId) throw new Error('Codex completed without a thread.started event');
    if (!result.finalText) throw new Error('Codex completed without an agent_message');
    return { ...result, events, rawStdout: child.stdout, rawStderr: child.stderr, args };
  } finally {
    if (schemaDir) fs.rmSync(schemaDir, { recursive: true, force: true });
  }
}

module.exports = {
  buildCodexArgs,
  parseJsonl,
  resultFromEvents,
  runCodex,
  spawnCaptured,
};
