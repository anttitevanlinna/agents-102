'use strict';

// One cold Claude print call. The runner owns budgets, scenarios and snapshots.
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawn, spawnSync } = require('node:child_process');
const { StringDecoder } = require('node:string_decoder');

const SYSTEM = 'Follow the user request. Use only the provided context. Do not invent missing information. Do not access the network.';
const TOOL_NAMES = ['Read', 'Write', 'Edit', 'Bash'];
const AUTH_NAMES = ['ANTHROPIC_API_KEY', 'ANTHROPIC_AUTH_TOKEN', 'CLAUDE_CODE_OAUTH_TOKEN'];
const MAX_OUTPUT = 32 * 1024 * 1024;

function inside(parent, child) {
  const relative = path.relative(parent, child);
  return relative === '' || (!relative.startsWith(`..${path.sep}`) && relative !== '..' && !path.isAbsolute(relative));
}

function executable(file) {
  try { fs.accessSync(file, fs.constants.X_OK); return fs.statSync(file).isFile(); } catch { return false; }
}

function resolveClaude({ env = process.env, home = os.homedir() } = {}) {
  if (env.EVAL_REAL_CLAUDE) {
    const file = path.resolve(env.EVAL_REAL_CLAUDE);
    if (!executable(file)) throw new Error('EVAL_REAL_CLAUDE is not an executable file');
    return file;
  }
  // PATH on the authoring machine still names 1.0.67; native local is 2.1.x.
  const local = path.join(home, '.local/bin/claude');
  if (executable(local)) return local;
  for (const dir of (env.PATH || '').split(path.delimiter)) {
    const file = path.join(dir, 'claude');
    if (executable(file) && !file.includes(`${path.sep}loops${path.sep}bin${path.sep}`)) return file;
  }
  throw new Error('Claude CLI not found; set EVAL_REAL_CLAUDE to the current native binary');
}

function childEnvironment() {
  const names = ['HOME', 'PATH', 'TMPDIR', 'LANG', 'LC_ALL', 'SHELL', 'USER', 'LOGNAME', 'TERM', ...AUTH_NAMES];
  const env = Object.fromEntries(names.filter(name => process.env[name] !== undefined).map(name => [name, process.env[name]]));
  env.CLAUDE_CODE_DISABLE_AUTO_MEMORY = '1';
  env.CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC = '1';
  env.CLAUDE_CODE_DISABLE_BACKGROUND_TASKS = '1';
  return env;
}

function sandboxSettings(cwd, outputDir) {
  // Restricted mode confines built-in file tools; native sandbox constrains
  // Bash. CLI settings, not project/user settings, enforce these boundaries.
  return {
    sandbox: {
      enabled: true,
      autoAllowBashIfSandboxed: true,
      allowUnsandboxedCommands: false,
      allowAppleEvents: false,
      network: { allowedDomains: [], deniedDomains: ['*'], strictAllowlist: true, allowUnixSockets: [], allowAllUnixSockets: false, allowLocalBinding: false },
      filesystem: {
        allowWrite: [cwd], denyWrite: [os.homedir(), outputDir],
        denyRead: ['/'],
        allowRead: [cwd, '/bin', '/usr', '/System', '/Library', '/private/etc', '/dev', '/opt/homebrew/bin', '/opt/homebrew/Cellar', '/opt/homebrew/opt'],
      },
      credentials: { envVars: AUTH_NAMES.map(name => ({ name, mode: 'deny' })) },
    },
  };
}

function parseEvents(stdout) {
  const events = stdout.split(/\r?\n/).filter(line => line.trim()).map((line, index) => {
    let event;
    try { event = JSON.parse(line); } catch { throw new Error(`Malformed stream JSON at line ${index + 1}`); }
    if (!event || Array.isArray(event) || typeof event !== 'object' || typeof event.type !== 'string') throw new Error(`Invalid stream event at line ${index + 1}`);
    return event;
  });
  const results = events.filter(event => event.type === 'result');
  if (results.length !== 1) throw new Error(`Expected one final result, received ${results.length}`);
  const result = results[0];
  if (result.is_error || (result.subtype && result.subtype !== 'success')) throw new Error(`Claude result failed: ${result.subtype || 'is_error'}`);
  if (typeof result.result !== 'string' || !result.result.trim()) throw new Error('Claude final result has no text');
  return { events, result };
}

async function callModel({ prompt, cwd, tools = false, timeoutMs = 90000, outputDir, tag, model = 'sonnet' }) {
  if (typeof tag !== 'string' || !/^[a-z0-9][a-z0-9._-]*$/i.test(tag)) throw new Error('A safe unique trace tag is required');
  if (!outputDir) throw new Error('outputDir is required');
  fs.mkdirSync(outputDir, { recursive: true });
  outputDir = fs.realpathSync(outputDir);
  const prefix = path.join(outputDir, tag);
  const started = Date.now();
  const status = { ok: false, model_requested: model, tools, timeout_ms: timeoutMs };
  fs.writeFileSync(`${prefix}.input.txt`, typeof prompt === 'string' ? prompt : '', { flag: 'wx' });
  fs.writeFileSync(`${prefix}.stdout.jsonl`, '', { flag: 'wx' });
  fs.writeFileSync(`${prefix}.stderr.txt`, '', { flag: 'wx' });
  try {
    if (typeof prompt !== 'string' || !prompt.trim()) throw new Error('A nonempty prompt is required');
    if (typeof model !== 'string' || !model.trim()) throw new Error('A model is required');
    if (!Number.isInteger(timeoutMs) || timeoutMs < 1 || timeoutMs > 300000) throw new Error('timeoutMs must be between 1 and 300000');
    if (typeof tools !== 'boolean') throw new Error('tools must be boolean');
    cwd = fs.realpathSync(cwd);
    if (!fs.statSync(cwd).isDirectory()) throw new Error('cwd must be a directory');
    if (tools) {
      const temporaryRoots = [...new Set([os.tmpdir(), '/tmp', '/private/tmp'].filter(fs.existsSync).map(dir => fs.realpathSync(dir)))];
      if (!temporaryRoots.some(root => root !== cwd && inside(root, cwd))) throw new Error('Tool execution requires a disposable directory under the system temporary directory');
      if (inside(cwd, outputDir) || inside(outputDir, cwd)) throw new Error('Tool scratch and trace output must be separate directory trees');
    }
    const binary = resolveClaude();
    const version = spawnSync(binary, ['--version'], { encoding: 'utf8', timeout: 5000, env: childEnvironment() });
    if (version.status !== 0 || !/^2\./.test(version.stdout.trim())) throw new Error('Current Claude Code 2.x is required for isolation flags');
    status.cli_version = version.stdout.trim();
    const args = ['-p', '--model', model, '--output-format', 'stream-json', '--verbose', '--safe-mode', '--restricted', '--no-chrome', '--strict-mcp-config', '--mcp-config', '{"mcpServers":{}}', '--no-session-persistence', '--setting-sources', '', '--disable-slash-commands', '--system-prompt', SYSTEM, '--tools', tools ? TOOL_NAMES.join(',') : '', '--permission-mode', 'dontAsk', '--permission-prompts', 'none'];
    if (tools) args.push('--allowedTools', TOOL_NAMES.join(','), '--settings', JSON.stringify(sandboxSettings(cwd, outputDir)));
    fs.writeFileSync(`${prefix}.request.json`, JSON.stringify({ binary, args, cwd, model, tools, timeoutMs }, null, 2) + '\n');
    const execution = await new Promise((resolve, reject) => {
      const child = spawn(binary, args, { cwd, env: childEnvironment(), detached: process.platform !== 'win32', stdio: ['pipe', 'pipe', 'pipe'] });
      const outDecoder = new StringDecoder('utf8'), errDecoder = new StringDecoder('utf8');
      let stdout = '', stderr = '', bytes = 0, timedOut = false, exceeded = false, settled = false, killTimer;
      const kill = signal => {
        try { process.platform === 'win32' ? child.kill(signal) : process.kill(-child.pid, signal); } catch { /* process already exited */ }
      };
      const stop = () => { kill('SIGTERM'); killTimer = setTimeout(() => kill('SIGKILL'), 500); };
      const timer = setTimeout(() => { timedOut = true; stop(); }, timeoutMs);
      const finish = fn => { if (settled) return; settled = true; clearTimeout(timer); clearTimeout(killTimer); fn(); };
      child.stdout.on('data', data => {
        fs.appendFileSync(`${prefix}.stdout.jsonl`, data);
        stdout += outDecoder.write(data); bytes += data.length;
        if (bytes > MAX_OUTPUT && !exceeded) { exceeded = true; stop(); }
      });
      child.stderr.on('data', data => {
        fs.appendFileSync(`${prefix}.stderr.txt`, data);
        stderr += errDecoder.write(data); bytes += data.length;
        if (bytes > MAX_OUTPUT && !exceeded) { exceeded = true; stop(); }
      });
      child.once('error', error => finish(() => reject(error)));
      child.stdin.on('error', () => {}); // an early process exit can close stdin
      child.once('close', (code, signal) => finish(() => {
        kill('SIGKILL'); // do not leave background descendants after a turn
        resolve({ stdout: stdout + outDecoder.end(), stderr: stderr + errDecoder.end(), code, signal, timedOut, exceeded });
      }));
      child.stdin.end(prompt);
    });
    Object.assign(status, { exit_code: execution.code, signal: execution.signal, timed_out: execution.timedOut });
    if (execution.timedOut) throw new Error(`Claude call timed out after ${timeoutMs}ms`);
    if (execution.exceeded) throw new Error('Claude output exceeded 32 MiB');
    if (execution.code !== 0) throw new Error(`Claude process exited with code ${execution.code}${execution.signal ? ` (${execution.signal})` : ''}`);
    const { events, result } = parseEvents(execution.stdout);
    for (const event of events) {
      if (event.type === 'system' && event.subtype === 'init') {
        if (event.mcp_servers?.length) throw new Error('Unexpected MCP servers in isolated call');
        if (Array.isArray(event.tools) && event.tools.some(name => !tools || !TOOL_NAMES.includes(name))) throw new Error('Unexpected tools in isolated call');
      }
      for (const block of event.message?.content || []) {
        if (block.type === 'tool_use' && (!tools || !TOOL_NAMES.includes(block.name))) throw new Error(`Unexpected tool action: ${block.name}`);
      }
    }
    const actualModel = events.find(event => event.type === 'system' && event.subtype === 'init')?.model
      || events.find(event => event.message?.model)?.message.model || Object.keys(result.modelUsage || {})[0] || model;
    const answer = { text: result.result, events, model: actualModel, elapsed_ms: Date.now() - started };
    if (result.usage) answer.usage = result.usage;
    Object.assign(status, { ok: true, model: actualModel, usage: result.usage, modelUsage: result.modelUsage, total_cost_usd: result.total_cost_usd, elapsed_ms: answer.elapsed_ms });
    fs.writeFileSync(`${prefix}.response.txt`, answer.text);
    return answer;
  } catch (error) {
    status.error = error.message;
    error.tracePrefix = prefix;
    throw error;
  } finally {
    status.elapsed_ms = Date.now() - started;
    fs.writeFileSync(`${prefix}.status.json`, JSON.stringify(status, null, 2) + '\n');
  }
}

module.exports = { callModel, parseEvents, resolveClaude, sandboxSettings };
