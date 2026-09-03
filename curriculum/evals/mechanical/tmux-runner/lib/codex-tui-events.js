#!/usr/bin/env node

const fs = require('node:fs');
const path = require('node:path');

function jsonlFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const target = path.join(dir, entry.name);
    if (entry.isDirectory()) return jsonlFiles(target);
    return entry.isFile() && entry.name.endsWith('.jsonl') ? [target] : [];
  });
}

const codexHome = process.argv[2];
if (!codexHome) {
  process.stderr.write('usage: codex-tui-events.js <codex-home>\n');
  process.exit(2);
}

let completedTurns = 0;
let lastMessage = '';
const rootRollouts = [];

for (const file of jsonlFiles(path.join(codexHome, 'sessions')).sort()) {
  const events = fs.readFileSync(file, 'utf8').split(/\r?\n/).flatMap((line) => {
    if (!line.trim()) return [];
    try { return [JSON.parse(line)]; } catch { return []; }
  });
  const meta = events.find((event) => event.type === 'session_meta');
  if (!meta || meta.payload?.source !== 'cli' || meta.payload?.thread_source !== 'user') continue;
  rootRollouts.push(file);
  for (const event of events) {
    if (event.type !== 'event_msg' || event.payload?.type !== 'task_complete') continue;
    completedTurns += 1;
    if (typeof event.payload.last_agent_message === 'string') {
      lastMessage = event.payload.last_agent_message;
    }
  }
}

process.stdout.write(JSON.stringify({ completedTurns, lastMessage, rootRollouts }));
