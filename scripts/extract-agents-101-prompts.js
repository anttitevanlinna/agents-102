#!/usr/bin/env node
process.argv.splice(2, 0, '--training', 'agents-101');
process.argv.splice(4, 0, '--flavor', 'all');
require('./extract-training-prompts.js');
