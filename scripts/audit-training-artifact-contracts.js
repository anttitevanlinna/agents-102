#!/usr/bin/env node
/*
 * Generic entrypoint for curriculum artifact-handoff audits.
 *
 * The implementation lives in audit-ae101-artifact-contracts.js for backward
 * compatibility with the first audit command Antti approved.
 */

const path = require('path');
const { spawnSync } = require('child_process');

const implementation = path.join(__dirname, 'audit-ae101-artifact-contracts.js');
const result = spawnSync(process.execPath, [implementation, ...process.argv.slice(2)], {
  stdio: 'inherit',
});

process.exit(result.status ?? 1);
