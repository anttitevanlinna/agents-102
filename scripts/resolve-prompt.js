#!/usr/bin/env node

const path = require('path');
const {
  loadRegistry,
  registryForProfile,
  PROMPTS_DIR,
} = require('./compile-prompts.js');

function fail(message) {
  const oneLine = String(message).replace(/\s*\n\s*/g, ' ').trim();
  process.stderr.write(`resolve-prompt: ${oneLine}\n`);
  process.exit(2);
}

function parseArgs(argv) {
  const options = { json: false };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--json') {
      options.json = true;
    } else if (arg === '--key' || arg === '--runtime') {
      const value = argv[i + 1];
      if (!value || value.startsWith('--')) fail(`${arg} requires a value`);
      options[arg.slice(2)] = value;
      i += 1;
    } else {
      fail(`unknown argument: ${arg}`);
    }
  }
  if (!options.key) fail('--key is required');
  if (!options.runtime) fail('--runtime is required');
  return options;
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  const promptsDir = process.env.PROMPT_REGISTRY
    ? path.resolve(process.env.PROMPT_REGISTRY)
    : PROMPTS_DIR;
  let registry;
  let profileRegistry;
  try {
    registry = loadRegistry(promptsDir);
    profileRegistry = registryForProfile(registry, options.runtime);
  } catch (error) {
    fail(error.message);
  }
  if (!Object.prototype.hasOwnProperty.call(registry, options.key)) {
    fail(`key not found: ${options.key}`);
  }
  const entry = profileRegistry[options.key];
  if (!entry) {
    fail(`prompt ${options.key} is incompatible with runtime ${options.runtime}`);
  }
  if (/\{\{(?:artifact:|[#/]capability:)/.test(entry.text)) {
    fail(`prompt ${options.key} contains an unresolved runtime expression`);
  }

  if (options.json) {
    const meta = Object.assign({}, entry);
    delete meta.key;
    delete meta.text;
    process.stdout.write(JSON.stringify({
      key: options.key,
      runtime: options.runtime,
      text: entry.text,
      meta,
    }));
    return;
  }
  process.stdout.write(entry.text);
}

main();
