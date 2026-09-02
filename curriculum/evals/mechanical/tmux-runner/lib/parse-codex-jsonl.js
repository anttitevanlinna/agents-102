#!/usr/bin/env node

const fs = require('fs');

function die(message) {
  process.stderr.write(`parse-codex-jsonl: ${String(message).replace(/\s*\n\s*/g, ' ')}\n`);
  process.exit(2);
}

const [inputFile, statusFile, responseFile] = process.argv.slice(2);
if (!inputFile || !statusFile || !responseFile) {
  die('usage: parse-codex-jsonl.js <events.jsonl> <status.json> <response.txt>');
}

let raw;
try {
  raw = fs.readFileSync(inputFile, 'utf8');
} catch (error) {
  die(error.message);
}

let malformed = false;
let errorEvent = false;
let turnFailed = false;
let turnCompleted = false;
let threadId = '';
let finalResponse = '';
let tokenUsage = null;
let eventCount = 0;

for (const line of raw.split(/\r?\n/)) {
  if (!line.trim()) continue;
  eventCount += 1;
  let event;
  try {
    event = JSON.parse(line);
  } catch (error) {
    malformed = true;
    continue;
  }
  if (event.type === 'thread.started' && typeof event.thread_id === 'string') {
    threadId = event.thread_id;
  }
  if (event.type === 'item.completed' && event.item &&
      event.item.type === 'agent_message' && typeof event.item.text === 'string') {
    finalResponse = event.item.text;
  }
  if (event.type === 'turn.completed') {
    turnCompleted = true;
    tokenUsage = event.usage || null;
  }
  if (event.type === 'turn.failed') turnFailed = true;
  if (event.type === 'error') errorEvent = true;
}

let failureClass = '';
if (malformed) failureClass = 'malformed-json';
else if (errorEvent) failureClass = 'error-event';
else if (turnFailed) failureClass = 'turn-failed';
else if (!turnCompleted) failureClass = 'incomplete-turn';
else if (!threadId) failureClass = 'missing-thread';

const status = {
  ok: failureClass === '',
  failureClass,
  threadId,
  finalResponseSeen: finalResponse !== '',
  tokenUsage,
  eventCount,
};

try {
  fs.writeFileSync(statusFile, JSON.stringify(status, null, 2) + '\n');
  fs.writeFileSync(responseFile, finalResponse);
} catch (error) {
  die(error.message);
}
