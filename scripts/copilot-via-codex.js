#!/usr/bin/env node
'use strict';

const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawn } = require('node:child_process');
const { runCodex } = require('./codex-exec-client.js');
const { loadClaudeWorkflow } = require('./copilot-workflow-adapter.js');

const VERSION = '0.1.0';
const HELP = `copilot-via-codex ${VERSION}

Codex-backed compatibility harness for the GitHub Copilot CLI command shapes
used by Agents 102. This is test evidence, not native Copilot acceptance.

Prompt mode:
  copilot-via-codex -p PROMPT [--session-id ID] [--add-dir DIR]
    [--model MODEL] [--silent] [--output-format text|json]
    [--allow-tool TOOL] [--allow-url URL] [--allow-all|--yolo]
    [--no-ask-user] [--experimental]

Workflow mode:
  copilot-via-codex [global options] workflow run eval-sweep
    [--args JSON|@FILE] [--silent] [--output-format text|json]

Environment:
  CODEX_BIN                     Codex executable (default: codex)
  COPILOT_HOME                  Compatibility session store
  COPILOT_CODEX_TRACE_DIR       Optional directory for raw Codex JSONL traces
  COPILOT_CODEX_USE_USER_CONFIG Load personal Codex config when set to 1

Unsupported Copilot flags fail closed. Interactive TUI behavior, native
extension discovery, and pre-tool permission hooks require licensed Copilot.
`;

const VALUE_FLAGS = new Map([
  ['-p', 'prompt'], ['--prompt', 'prompt'],
  ['--session-id', 'sessionId'],
  ['--add-dir', 'addDirs'],
  ['--model', 'model'],
  ['--output-format', 'outputFormat'],
  ['--allow-tool', 'allowTools'],
  ['--allow-url', 'allowUrls'],
  ['--args', 'workflowArgs'],
]);
const BOOL_FLAGS = new Map([
  ['--silent', 'silent'],
  ['--allow-all', 'allowAll'],
  ['--yolo', 'allowAll'],
  ['--no-ask-user', 'noAskUser'],
  ['--experimental', 'experimental'],
  ['--disable-builtin-mcps', 'disableBuiltinMcps'],
]);

function splitLongOption(token) {
  if (!token.startsWith('--') || !token.includes('=')) return null;
  const at = token.indexOf('=');
  return [token.slice(0, at), token.slice(at + 1)];
}

function parseArgs(argv) {
  const result = {
    mode: 'prompt',
    addDirs: [],
    allowTools: [],
    allowUrls: [],
    outputFormat: 'text',
  };
  let i = 0;
  while (i < argv.length) {
    let token = argv[i++];
    if (token === '--help' || token === '-h') return { mode: 'help' };
    if (token === '--version' || token === '-v') return { mode: 'version' };
    if (token === 'workflow') {
      if (argv[i++] !== 'run') throw new Error('only `workflow run` is supported');
      const name = argv[i++];
      if (!name || name.startsWith('-')) throw new Error('workflow run requires a workflow name');
      result.mode = 'workflow';
      result.workflow = name;
      continue;
    }
    const assigned = splitLongOption(token);
    let inlineValue = null;
    if (assigned) [token, inlineValue] = assigned;
    if (VALUE_FLAGS.has(token)) {
      const value = inlineValue == null ? argv[i++] : inlineValue;
      if (value == null || value === '') throw new Error(`${token} requires a value`);
      const key = VALUE_FLAGS.get(token);
      if (Array.isArray(result[key])) result[key].push(value);
      else result[key] = value;
      continue;
    }
    if (BOOL_FLAGS.has(token)) {
      if (inlineValue != null) throw new Error(`${token} does not take a value`);
      result[BOOL_FLAGS.get(token)] = true;
      continue;
    }
    if (token.startsWith('-')) throw new Error(`unsupported Copilot option: ${token}`);
    throw new Error(`unexpected positional argument: ${token}`);
  }
  if (!['text', 'json'].includes(result.outputFormat)) {
    throw new Error(`unsupported output format: ${result.outputFormat}`);
  }
  if (result.mode === 'workflow' && result.workflow !== 'eval-sweep') {
    throw new Error(`unsupported workflow: ${result.workflow}`);
  }
  if (result.mode === 'prompt' && !result.prompt) {
    throw new Error('prompt mode requires -p/--prompt; interactive Copilot TUI behavior is not emulated');
  }
  if (result.mode === 'prompt' && result.workflowArgs) {
    throw new Error('--args is only supported with workflow run');
  }
  if (result.mode === 'workflow' && result.prompt) {
    throw new Error('-p/--prompt cannot be combined with workflow run');
  }
  if (result.mode === 'workflow' && result.sessionId) {
    throw new Error('--session-id is not supported with workflow run');
  }
  return result;
}

function statePath(env = process.env) {
  const home = env.COPILOT_HOME || path.join(os.homedir(), '.copilot');
  return path.join(home, 'copilot-via-codex', 'sessions.json');
}

function readState(file) {
  if (!fs.existsSync(file)) return { version: 1, sessions: {} };
  const parsed = JSON.parse(fs.readFileSync(file, 'utf8'));
  if (parsed.version !== 1 || !parsed.sessions || typeof parsed.sessions !== 'object') {
    throw new Error(`unsupported compatibility session store: ${file}`);
  }
  return parsed;
}

function writeState(file, state) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const temp = `${file}.${process.pid}.tmp`;
  fs.writeFileSync(temp, `${JSON.stringify(state, null, 2)}\n`, { mode: 0o600 });
  fs.renameSync(temp, file);
}

function commandHook(command, payload, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn('/bin/bash', ['-lc', command], {
      cwd: options.cwd,
      env: options.env,
      stdio: ['pipe', 'pipe', 'pipe'],
    });
    let stdout = '';
    let stderr = '';
    const timer = setTimeout(() => child.kill('SIGTERM'), options.timeoutMs || 30000);
    child.stdout.on('data', (chunk) => { stdout += chunk.toString(); });
    child.stderr.on('data', (chunk) => { stderr += chunk.toString(); });
    child.on('error', (error) => { clearTimeout(timer); reject(error); });
    child.on('close', (code) => {
      clearTimeout(timer);
      if (code !== 0) {
        reject(new Error(`hook exited with code ${code}: ${stderr.trim() || command}`));
        return;
      }
      if (!stdout.trim()) { resolve({}); return; }
      try { resolve(JSON.parse(stdout.trim().split(/\r?\n/).at(-1))); }
      catch (error) { reject(new Error(`hook returned invalid JSON: ${error.message}`)); }
    });
    child.stdin.end(`${JSON.stringify(payload)}\n`);
  });
}

function loadSettings(file) {
  if (!fs.existsSync(file)) return {};
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function claudeHookCommands(settings, event) {
  return (settings.hooks?.[event] || []).flatMap((group) => group.hooks || []).map((hook) => hook.command).filter(Boolean);
}

function copilotHookCommands(settings, event) {
  return (settings.hooks?.[event] || []).map((hook) => hook.bash || hook.command).filter(Boolean);
}

async function runCommands(commands, payload, options) {
  const outputs = [];
  for (const command of commands) outputs.push(await options.runHook(command, payload, options));
  return outputs;
}

function appendContext(prompt, contexts) {
  const text = contexts.filter(Boolean).join('\n\n').trim();
  if (!text) return prompt;
  return `${prompt}\n\n<copilot_compatibility_context>\n${text}\n</copilot_compatibility_context>`;
}

async function preparePrompt(prompt, options) {
  const cwd = path.resolve(options.cwd);
  const hookEnv = {
    ...options.env,
    CLAUDE_PROJECT_DIR: cwd,
    ...(options.coreDir ? { AGENTS_CORE_DIR: path.resolve(cwd, options.coreDir) } : {}),
  };
  const hookOptions = { cwd, env: hookEnv, runHook: options.runHook || commandHook };
  const claude = loadSettings(path.join(cwd, '.claude', 'settings.json'));
  const copilot = loadSettings(path.join(cwd, '.github', 'copilot', 'settings.json'));
  let current = prompt;

  if (options.newSession) {
    const payload = { session_id: options.sessionId || '', hook_event_name: 'SessionStart', cwd };
    const outputs = await runCommands(claudeHookCommands(claude, 'SessionStart'), payload, hookOptions);
    current = appendContext(current, outputs.map((out) => out.additionalContext || out.hookSpecificOutput?.additionalContext));
  }

  const submitted = {
    session_id: options.sessionId || '',
    sessionId: options.sessionId || '',
    hook_event_name: 'UserPromptSubmit',
    cwd,
    prompt,
  };
  // Copilot runs Claude-compatible prompt hooks for side effects but discards
  // their model-facing output. The transformed event is the context channel.
  await runCommands(claudeHookCommands(claude, 'UserPromptSubmit'), submitted, hookOptions);
  const transformed = { ...submitted, transformedPrompt: current };
  const outputs = await runCommands(copilotHookCommands(copilot, 'userPromptTransformed'), transformed, hookOptions);
  for (const output of outputs) {
    if (typeof output.modifiedTransformedPrompt === 'string') current = output.modifiedTransformedPrompt;
    else current = appendContext(current, [output.additionalContext]);
  }
  if (options.noAskUser) {
    current = appendContext(current, ['Do not ask an interactive question. State reasonable assumptions and continue.']);
  }
  return current;
}

function readWorkflowArgs(value, cwd) {
  if (!value) return {};
  const raw = value.startsWith('@')
    ? fs.readFileSync(path.resolve(cwd, value.slice(1)), 'utf8')
    : value;
  const parsed = JSON.parse(raw);
  if (parsed == null || typeof parsed !== 'object') throw new Error('workflow --args must decode to an object or array');
  return parsed;
}

function safeLabel(label) {
  return String(label || 'agent').replace(/[^a-zA-Z0-9._-]+/g, '-').slice(0, 100);
}

function createWorkflowContext(options) {
  let call = 0;
  return {
    args: options.args,
    agent: async (prompt, agentOptions = {}) => {
      const label = agentOptions.label || `agent-${call + 1}`;
      const result = await options.runCodex({
        prompt,
        cwd: options.cwd,
        addDirs: options.addDirs,
        model: agentOptions.model || options.model,
        reasoningEffort: agentOptions.reasoningEffort,
        schema: agentOptions.schema,
        allowAll: options.allowAll,
        codexBin: options.codexBin,
        useUserConfig: options.useUserConfig,
        env: options.env,
      });
      call += 1;
      if (options.traceDir) {
        fs.mkdirSync(options.traceDir, { recursive: true });
        const trace = `${String(call).padStart(3, '0')}-${safeLabel(label)}.jsonl`;
        fs.writeFileSync(path.join(options.traceDir, trace), result.rawStdout);
      }
      if (!agentOptions.schema) return result.finalText;
      try { return JSON.parse(result.finalText); }
      catch (error) { throw new Error(`${label} returned invalid structured output: ${error.message}`); }
    },
    parallel: async (thunks) => Promise.all(thunks.map((fn) => fn())),
    pipeline: async (items, ...stages) => Promise.all(items.map(async (item, index) => {
      let value = item;
      for (const stage of stages) value = await stage(value, item, index);
      return value;
    })),
    phase: (title) => options.stderr(`[copilot-via-codex] phase: ${title}\n`),
    log: (message) => options.stderr(`[copilot-via-codex] ${message}\n`),
    workflow: async (name) => { throw new Error(`nested workflow is not supported: ${name}`); },
  };
}

async function runWorkflow(parsed, options) {
  const script = path.join(options.repoRoot, '.claude', 'workflows', `${parsed.workflow}.js`);
  const workflow = loadClaudeWorkflow(script);
  const args = readWorkflowArgs(parsed.workflowArgs, options.cwd);
  const traceDir = options.env.COPILOT_CODEX_TRACE_DIR
    ? path.resolve(options.cwd, options.env.COPILOT_CODEX_TRACE_DIR)
    : null;
  const context = createWorkflowContext({ ...options, args, traceDir });
  return workflow.copilotRun(context);
}

async function main(argv = process.argv.slice(2), injected = {}) {
  const stdout = injected.stdout || ((text) => process.stdout.write(text));
  const stderr = injected.stderr || ((text) => process.stderr.write(text));
  const env = injected.env || process.env;
  const cwd = path.resolve(injected.cwd || process.cwd());
  const repoRoot = injected.repoRoot || path.resolve(__dirname, '..');
  const run = injected.runCodex || runCodex;
  const parsed = parseArgs(argv);
  if (parsed.mode === 'help') { stdout(HELP); return 0; }
  if (parsed.mode === 'version') { stdout(`copilot-via-codex ${VERSION}\n`); return 0; }
  const coreDir = env.AGENTS_CORE_DIR || parsed.addDirs.find((dir) => /agents-102-core\/?$/.test(dir));
  const common = {
    cwd,
    repoRoot,
    coreDir,
    addDirs: parsed.addDirs,
    model: parsed.model,
    allowAll: parsed.allowAll,
    codexBin: env.CODEX_BIN,
    useUserConfig: env.COPILOT_CODEX_USE_USER_CONFIG === '1',
    env,
    runCodex: run,
    stderr: parsed.silent ? () => {} : stderr,
  };

  if (parsed.allowTools.length || parsed.allowUrls.length) {
    common.stderr('[copilot-via-codex] Copilot granular grants are accepted as contract input; Codex still uses its workspace sandbox.\n');
  }
  if (parsed.mode === 'workflow') {
    const result = await runWorkflow(parsed, common);
    stdout(`${parsed.outputFormat === 'json' ? JSON.stringify(result) : JSON.stringify(result, null, 2)}\n`);
    return 0;
  }

  const file = statePath(env);
  const state = readState(file);
  const stored = parsed.sessionId ? state.sessions[parsed.sessionId] : null;
  if (stored && path.resolve(stored.cwd) !== cwd) {
    throw new Error(`session ${parsed.sessionId} belongs to ${stored.cwd}, not ${cwd}`);
  }
  const prompt = await preparePrompt(parsed.prompt, {
    cwd,
    coreDir,
    env,
    sessionId: parsed.sessionId,
    newSession: !stored,
    noAskUser: parsed.noAskUser,
    runHook: injected.runHook,
  });
  const chunks = [];
  const result = await run({
    ...common,
    prompt,
    threadId: stored?.codexThreadId,
    onStdout: parsed.outputFormat === 'json' ? (text) => chunks.push(text) : null,
    onStderr: parsed.silent ? null : stderr,
  });
  if (parsed.sessionId && !stored) {
    state.sessions[parsed.sessionId] = {
      codexThreadId: result.threadId,
      cwd,
      createdAt: new Date().toISOString(),
    };
    writeState(file, state);
  }
  if (parsed.outputFormat === 'json') stdout(chunks.length ? chunks.join('') : result.rawStdout);
  else stdout(`${result.finalText}\n`);
  return 0;
}

if (require.main === module) {
  main().catch((error) => {
    process.stderr.write(`copilot-via-codex: ${error.message}\n`);
    process.exitCode = 1;
  });
}

module.exports = {
  HELP,
  VERSION,
  claudeHookCommands,
  commandHook,
  copilotHookCommands,
  createWorkflowContext,
  main,
  parseArgs,
  preparePrompt,
  readState,
  readWorkflowArgs,
  runWorkflow,
  statePath,
  writeState,
};
