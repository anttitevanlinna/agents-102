#!/usr/bin/env node
process.argv.splice(2, 0, '--training', 'agentic-engineering-101');
require('./extract-training-prompts.js');
