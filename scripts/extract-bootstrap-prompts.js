#!/usr/bin/env node
process.argv.splice(2, 0, '--training', 'bootstrap');
process.argv.splice(4, 0, '--flavor', 'all');
require('./extract-training-prompts.js');
