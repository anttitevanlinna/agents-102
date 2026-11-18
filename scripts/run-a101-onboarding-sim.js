#!/usr/bin/env node
'use strict';

const { run } = require('../curriculum/evals/onboarding/agents-101/run');
const options = {};
const keys = { '--mode': 'mode', '--out': 'out', '--jobs': 'jobs', '--max-calls': 'maxCalls', '--timeout-ms': 'timeoutMs' };
for (let index = 2; index < process.argv.length; index += 2) {
  const key = keys[process.argv[index]], value = process.argv[index + 1];
  if (!key || !value) throw new Error('Usage: node scripts/run-a101-onboarding-sim.js --mode contract|live [--out DIR] [--jobs N] [--max-calls N] [--timeout-ms N]');
  options[key] = ['jobs', 'maxCalls', 'timeoutMs'].includes(key) ? Number(value) : value;
  if (typeof options[key] === 'number' && (!Number.isInteger(options[key]) || options[key] < 1)) throw new Error(`Invalid ${key}`);
}
run(options).then(result => { process.exitCode = result.exitCode; }).catch(error => { console.error(error.stack); process.exitCode = 1; });
