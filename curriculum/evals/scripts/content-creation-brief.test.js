#!/usr/bin/env node
// The authoring brief carries no strategy of its own: module moods live in the
// training's strategy doc and the file's maintainer block, and a copy here goes stale.
'use strict'
const assert = require('node:assert')
const fs = require('node:fs')
const path = require('node:path')
const src = fs.readFileSync(path.join(__dirname, 'content-creation-brief.sh'), 'utf8')
const moods = src.match(/\bM\d\b[^\n]*\bstays\b[^\n]*/g) || []
assert.deepStrictEqual(moods, [], 'content-creation-brief.sh hardcodes module moods')
console.log('content-creation-brief: no hardcoded moods')
