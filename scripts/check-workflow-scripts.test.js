#!/usr/bin/env node
'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { parseAsRuntimeWould, checkMeta, collect } = require('./check-workflow-scripts.js');

const GOOD = `export const meta = {
  name: 'x',
  description: 'does a thing',
  phases: [{ title: 'Judge' }],
}
const r = await agent('go')
return { r }
`;

function tmp(body) {
  const d = fs.mkdtempSync(path.join(os.tmpdir(), 'wfchk-'));
  const p = path.join(d, 'w.js');
  fs.writeFileSync(p, body);
  return p;
}

test('a well-formed workflow parses', () => {
  assert.equal(parseAsRuntimeWould(GOOD), null);
});

test('top-level return and await are legal here, and node --check disagrees', () => {
  // The reason this checker exists: `node --check` reports OK on a broken
  // workflow because `export` flips it into a lax mode, and a real ESM import
  // rejects the runtime's top-level `return`. Neither can see this file shape.
  assert.equal(parseAsRuntimeWould('return await agent("x")'), null);
});

test('a syntax error is caught, with a message', () => {
  const err = parseAsRuntimeWould(GOOD + '\nconst = ((;\n');
  assert.ok(err, 'expected a SyntaxError');
  assert.match(err, /Unexpected token/);
});

test('meta must exist', () => {
  assert.match(checkMeta('const r = await agent("go")'), /no `export const meta`/);
});

test('meta must carry name and description', () => {
  assert.match(checkMeta("export const meta = { name: 'x' }"), /description/);
  assert.match(checkMeta("export const meta = { description: 'x' }"), /name/);
  assert.equal(checkMeta(GOOD), null);
});

test('meta must be a literal — a computed name cannot be shown in a permission dialog', () => {
  const computed = "export const meta = { name: NAME, description: 'd' }\n";
  assert.match(checkMeta(computed), /literal/);
});

test('every shipped workflow passes both checks', () => {
  const found = collect();
  assert.ok(found.length >= 1, 'expected at least one workflow script');
  for (const w of found) {
    assert.equal(parseAsRuntimeWould(w.body), null, `${w.file} failed to parse`);
    assert.equal(checkMeta(w.body), null, `${w.file} has a bad meta`);
  }
});

test('the checker reads a real file off disk', () => {
  const p = tmp(GOOD);
  assert.equal(parseAsRuntimeWould(fs.readFileSync(p, 'utf8')), null);
});
