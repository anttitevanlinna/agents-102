'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { callModel, parseEvents, resolveClaude } = require('./model');

function fixture() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'onboarding-model-test-'));
  const cwd = path.join(dir, 'workspace');
  const outputDir = path.join(dir, 'traces');
  fs.mkdirSync(cwd);
  const binary = path.join(dir, 'fake-claude');
  fs.writeFileSync(binary, `#!${process.execPath}
const args = process.argv.slice(2);
if (args.includes('--version')) { console.log('2.1.319 (fake Claude Code)'); process.exit(0); }
let input=''; process.stdin.setEncoding('utf8'); process.stdin.on('data', chunk => input += chunk);
process.stdin.on('end', () => {
  const mode = input.trim();
  const emit = value => console.log(JSON.stringify(value));
  console.error('fake diagnostic');
  if (mode === 'exit') { console.log('partial output'); process.exit(7); }
  if (mode === 'malformed') { console.log('not json'); return; }
  const tools = (args[args.indexOf('--tools')+1] || '').split(',').filter(Boolean);
  emit({type:'system',subtype:'init',model:'fake-sonnet',tools,mcp_servers:[],args,cwd:process.cwd(),private_env_present:!!process.env.ONBOARDING_FAKE_PRIVATE});
  if (mode === 'timeout') { setInterval(() => {}, 1000); return; }
  if (mode === 'missing-result') return;
  if (mode === 'tools') {
    emit({type:'assistant',message:{model:'fake-sonnet',content:[{type:'tool_use',id:'write-1',name:'Write',input:{file_path:'result.txt',content:'fixture'}}]}});
    emit({type:'user',message:{content:[{type:'tool_result',tool_use_id:'write-1',content:'saved'}]}});
  }
  if (mode === 'unexpected-tool') emit({type:'assistant',message:{content:[{type:'tool_use',name:'WebFetch',input:{url:'https://invalid.example'}}]}});
  if (mode === 'mcp') emit({type:'system',subtype:'init',tools:[],mcp_servers:[{name:'unexpected'}]});
  emit({type:'assistant',message:{model:'fake-sonnet',content:[{type:'text',text:'fixture result'}]}});
  emit({type:'result',subtype:mode === 'error' ? 'error_during_execution' : 'success',is_error:mode === 'error',result:'fixture result',usage:{input_tokens:11,output_tokens:3},modelUsage:{'fake-sonnet':{inputTokens:11,outputTokens:3}},total_cost_usd:0});
});
`, { mode: 0o755 });
  const previous = process.env.EVAL_REAL_CLAUDE;
  process.env.EVAL_REAL_CLAUDE = binary;
  return {
    dir, cwd, outputDir, binary,
    cleanup() {
      if (previous === undefined) delete process.env.EVAL_REAL_CLAUDE;
      else process.env.EVAL_REAL_CLAUDE = previous;
      fs.rmSync(dir, { recursive: true, force: true });
    },
  };
}

test('cold no-tool call records exact input, raw events, final model and usage', async () => {
  const f = fixture();
  const originalHome = process.env.HOME;
  const previousPrivate = process.env.ONBOARDING_FAKE_PRIVATE;
  process.env.ONBOARDING_FAKE_PRIVATE = 'must not reach the subprocess';
  try {
    const answer = await callModel({ prompt: 'hello\n', cwd: f.cwd, outputDir: f.outputDir, tag: 'reader' });
    assert.equal(answer.text, 'fixture result');
    assert.equal(answer.model, 'fake-sonnet');
    assert.deepEqual(answer.usage, { input_tokens: 11, output_tokens: 3 });
    assert.ok(answer.elapsed_ms > 0);
    assert.equal(answer.events.length, 3);
    const init = answer.events[0];
    assert.equal(init.cwd, fs.realpathSync(f.cwd));
    assert.equal(init.private_env_present, false);
    assert.deepEqual(init.tools, []);
    for (const flag of ['--safe-mode', '--restricted', '--no-chrome', '--strict-mcp-config', '--no-session-persistence', '--disable-slash-commands']) assert.ok(init.args.includes(flag));
    assert.equal(init.args[init.args.indexOf('--output-format') + 1], 'stream-json');
    assert.equal(init.args[init.args.indexOf('--setting-sources') + 1], '');
    assert.ok(!init.args.includes('--settings'));
    assert.ok(!init.args.includes('--resume'));
    assert.equal(fs.readFileSync(path.join(f.outputDir, 'reader.input.txt'), 'utf8'), 'hello\n');
    assert.match(fs.readFileSync(path.join(f.outputDir, 'reader.stderr.txt'), 'utf8'), /fake diagnostic/);
    assert.equal(JSON.parse(fs.readFileSync(path.join(f.outputDir, 'reader.status.json'))).ok, true);
    assert.equal(process.env.HOME, originalHome);
  } finally {
    if (previousPrivate === undefined) delete process.env.ONBOARDING_FAKE_PRIVATE;
    else process.env.ONBOARDING_FAKE_PRIVATE = previousPrivate;
    f.cleanup();
  }
});

test('tools mode retains tool_use/tool_result evidence and locked sandbox configuration', async () => {
  const f = fixture();
  try {
    const answer = await callModel({ prompt: 'tools', cwd: f.cwd, tools: true, outputDir: f.outputDir, tag: 'actor' });
    const init = answer.events[0];
    assert.deepEqual(init.tools, ['Read', 'Write', 'Edit', 'Bash']);
    const settings = JSON.parse(init.args[init.args.indexOf('--settings') + 1]);
    assert.equal(settings.sandbox.enabled, true);
    assert.equal(settings.sandbox.allowUnsandboxedCommands, false);
    assert.deepEqual(settings.sandbox.network.allowedDomains, []);
    assert.deepEqual(settings.sandbox.network.deniedDomains, ['*']);
    assert.equal(settings.sandbox.network.strictAllowlist, true);
    assert.ok(settings.sandbox.filesystem.denyRead.includes('/'));
    assert.ok(settings.sandbox.filesystem.allowRead.includes(fs.realpathSync(f.cwd)));
    assert.ok(settings.sandbox.credentials.envVars.every(entry => entry.mode === 'deny'));
    assert.equal(answer.events[1].message.content[0].type, 'tool_use');
    assert.equal(answer.events[2].message.content[0].type, 'tool_result');
  } finally { f.cleanup(); }
});

test('errors, malformed streams, tool contamination and process exits persist failed receipts', async () => {
  const f = fixture();
  try {
    for (const [prompt, pattern] of [
      ['error', /result failed/], ['malformed', /Malformed stream JSON/],
      ['missing-result', /Expected one final result/], ['exit', /code 7/],
      ['unexpected-tool', /Unexpected tool action/], ['mcp', /Unexpected MCP/],
    ]) {
      await assert.rejects(callModel({ prompt, cwd: f.cwd, outputDir: f.outputDir, tag: prompt }), pattern);
      const status = JSON.parse(fs.readFileSync(path.join(f.outputDir, `${prompt}.status.json`)));
      assert.equal(status.ok, false);
      assert.match(status.error, pattern);
      assert.ok(fs.existsSync(path.join(f.outputDir, `${prompt}.input.txt`)));
      assert.ok(fs.existsSync(path.join(f.outputDir, `${prompt}.stdout.jsonl`)));
      assert.ok(fs.existsSync(path.join(f.outputDir, `${prompt}.stderr.txt`)));
    }
  } finally { f.cleanup(); }
});

test('timeout is bounded and records partial transcript rather than retrying', async () => {
  const f = fixture();
  try {
    const began = Date.now();
    await assert.rejects(callModel({ prompt: 'timeout', cwd: f.cwd, timeoutMs: 150, outputDir: f.outputDir, tag: 'deadline' }), /timed out/);
    assert.ok(Date.now() - began < 3000);
    const status = JSON.parse(fs.readFileSync(path.join(f.outputDir, 'deadline.status.json')));
    assert.equal(status.timed_out, true);
    assert.equal(status.ok, false);
    assert.match(fs.readFileSync(path.join(f.outputDir, 'deadline.stdout.jsonl'), 'utf8'), /"type":"system"/);
  } finally { f.cleanup(); }
});

test('tool calls reject host workspaces and receipt directories accessible from scratch', async () => {
  const f = fixture();
  try {
    await assert.rejects(callModel({ prompt: 'tools', tools: true, cwd: os.homedir(), outputDir: f.outputDir, tag: 'host' }), /disposable directory/);
    await assert.rejects(callModel({ prompt: 'tools', tools: true, cwd: f.cwd, outputDir: path.join(f.cwd, 'logs'), tag: 'overlap' }), /separate directory trees/);
  } finally { f.cleanup(); }
});

test('explicit executable wins and malformed final objects cannot be accepted', () => {
  const f = fixture();
  try {
    assert.equal(resolveClaude({ env: { EVAL_REAL_CLAUDE: f.binary } }), f.binary);
    assert.throws(() => parseEvents('{"type":"result","is_error":false}\n'), /no text/);
    assert.throws(() => parseEvents('[1,2]\n'), /Invalid stream event/);
  } finally { f.cleanup(); }
});
