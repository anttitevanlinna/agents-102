'use strict';

const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const { homeView, workbookView, summarize, STAGES } = require('./path-read');

const home = fs.readFileSync(path.join(__dirname, 'path-controls', 'home-control.html'), 'utf8');
const wb = `<html><body><main>
<section class="a101-onboarding"><h1 id="start-learning">Welcome</h1><p>Hello</p></section>
<section class="module" id="prework"><h2 id="make-my-first-game">1. Make a game</h2><video aria-label="Send the request"></video>
<p>Read <a href="#llm-vs-chat">LLM vs chat</a>.</p>
<h2 id="continue-to-module-1">Continue to Module 1</h2><p>Go to <a href="#getting-going">Module 1</a>.</p></section>
<section class="module" id="getting-going"><h1>Getting Going</h1><h2 id="start-here">Start here</h2><p>The question, to you.</p>
<section class="phase" id="lectures-x"><h1>Context is King</h1><h2>First slide</h2><p>SECRET BODY</p></section></section>
<section class="module" id="later"><h2 id="llm-vs-chat">LLM vs chat</h2><p>far away</p><h2>Next</h2></section>
</main></body></html>`;

test('home variants remove the start link or the licence line', () => {
  assert.match(homeView(home, 'v0'), /<a href="agents-101\/">Start the course<\/a>/);
  assert.doesNotMatch(homeView(home, 'no-start'), /href="agents-101\//);
  assert.doesNotMatch(homeView(home, 'no-licence'), /licen[cs]e/i);
});

test('handbook view stops at the titles of the first Module 1 activity', () => {
  const { view, m1Truth } = workbookView(wb, 'MacIntel', 'v0');
  assert.match(view, /Start here/);
  assert.match(view, /Context is King/);
  assert.doesNotMatch(view, /SECRET BODY/);
  assert.match(view, /\[video: Send the request\]/);
  assert.match(view, /LLM vs chat \[opens a reading, shown after/);
  assert.match(view, /READING opened from the handbook link/);
  assert.match(m1Truth, /The question, to you/);
});

test('no-m1-bridge removes Continue to Module 1 and its links', () => {
  const { view } = workbookView(wb, 'MacIntel', 'no-m1-bridge');
  assert.doesNotMatch(view, /Continue to Module 1/);
  assert.doesNotMatch(view, /href="#getting-going"/);
});

test('reach counts each reader at the weakest stage', () => {
  const row = reached => ({ answer: { stages: Object.fromEntries(STAGES.map(s => [s, { reached: reached[s] || 'yes', stars: 4 }])) } });
  const sum = summarize([row({}), row({ setup: 'uncertain' })]);
  assert.strictEqual(sum.pathScore, 75);
  assert.strictEqual(sum.funnel['module-1'], 100);
});
