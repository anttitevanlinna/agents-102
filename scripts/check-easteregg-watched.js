#!/usr/bin/env node
// Easter-egg-watched validator — verify that no window-switch / flip-away
// instruction sits in the same exercise phase that fires a "watch this land"
// easter-egg prompt.
//
// Why this exists: M3's STRIDE Phase 1 prompt (`threat-model-with-stride-1`)
// runs the curated `security-tools` skill as a pre-flight. That pre-flight is a
// supply-chain rick-roll: its collapsed Bash output prints the punch line on
// screen within seconds (canonical maintainer note in
// `curriculum/exercises/threat-model-with-stride.md`). The whole point is that
// the student is LOOKING at that window when it fires.
//
// The 2026-05-27 arcticrex run surfaced the collision: the body told the student
// to flip to the m3-quality window the instant STRIDE kicked off — so the punch
// line landed on a screen nobody was watching. The easter egg (refined
// 2026-05-21) post-dated the concurrency design and the two were never
// reconciled. This guard makes that regression mechanical: if a flip-away ever
// re-enters the easter-egg phase, the build fails.
//
// Detection is signature-driven, not hardcoded to one key: any prompt whose body
// runs `security-tools` as a pre-flight is a "watched" prompt, and the phase that
// fences it must carry no window-switch instruction.
//
// Usage: node scripts/check-easteregg-watched.js   (exit 1 on any violation)

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const PROMPTS_DIR = path.join(ROOT, 'curriculum/prompts');
const SRC_DIRS = ['curriculum/exercises', 'curriculum/trainings'];

// A prompt body that runs `security-tools` as a pre-flight is a watched-surprise
// prompt: the student must have eyes on the window when it fires.
const PREFLIGHT_RE = /security-tools\s+skill[^.]*\bpre-?flight\b/i;

// Flip-away / window-switch instructions. Any of these inside the easter-egg
// phase is the bug.
const FLIP_PATTERNS = [
  /\bswitch\b[^.\n]*\bwindow\b/i,          // "switch to your m3-quality window"
  /\bswitch\s+(back\s+)?to\b[^.\n]*m3-/i,  // "switch back to the m3-quality"
  /\bflip\b[^.\n]*\bwindow\b/i,            // "flip to the other window"
  /\*\*Session\*\*\s*\*\(\s*switch/i,      // a Session widget that switches windows
];

// Collect the keys of all watched-surprise prompts.
function watchedPromptKeys() {
  const keys = [];
  for (const f of fs.readdirSync(PROMPTS_DIR)) {
    if (!f.endsWith('.md')) continue;
    const body = fs.readFileSync(path.join(PROMPTS_DIR, f), 'utf8');
    if (PREFLIGHT_RE.test(body)) keys.push(f.replace(/\.md$/, ''));
  }
  return keys;
}

// Walk the source trees and return every .md path.
function mdFiles() {
  const out = [];
  for (const dir of SRC_DIRS) {
    const abs = path.join(ROOT, dir);
    const stack = [abs];
    while (stack.length) {
      const cur = stack.pop();
      for (const ent of fs.readdirSync(cur, { withFileTypes: true })) {
        const p = path.join(cur, ent.name);
        if (ent.isDirectory()) stack.push(p);
        else if (ent.name.endsWith('.md')) out.push(p);
      }
    }
  }
  return out;
}

// Slice a body into heading-delimited sections so we can isolate the phase that
// holds the fence. Sections break on any `## ` or `### ` heading.
function sections(body) {
  const lines = body.split('\n');
  const blocks = [];
  let cur = { heading: '(top)', lines: [] };
  for (const line of lines) {
    if (/^#{2,3}\s/.test(line)) {
      blocks.push(cur);
      cur = { heading: line.replace(/^#+\s/, '').trim(), lines: [] };
    } else {
      cur.lines.push(line);
    }
  }
  blocks.push(cur);
  return blocks;
}

const watched = watchedPromptKeys();
if (watched.length === 0) {
  console.error('check-easteregg-watched: found no watched-surprise prompts — has the security-tools pre-flight signature changed?');
  process.exit(1);
}

const violations = [];
for (const file of mdFiles()) {
  const body = fs.readFileSync(file, 'utf8');
  for (const block of sections(body)) {
    const text = block.lines.join('\n');
    const firesEasterEgg = watched.some((k) => text.includes(`{{prompt:${k}}}`));
    if (!firesEasterEgg) continue;
    for (const pat of FLIP_PATTERNS) {
      const m = text.match(pat);
      if (m) {
        violations.push({
          file: path.relative(ROOT, file),
          phase: block.heading,
          snippet: m[0].trim(),
        });
      }
    }
  }
}

if (violations.length) {
  console.error('Window-switch instruction inside an easter-egg phase (the punch line lands on an unwatched screen):\n');
  for (const v of violations) {
    console.error(`  ${v.file}  [${v.phase}]`);
    console.error(`    ↳ "${v.snippet}"`);
  }
  console.error('\nThe phase that fires a security-tools pre-flight must keep the student in that window.');
  console.error('Relocate the two-window flip to a phase that does NOT carry the easter egg.');
  process.exit(1);
}

console.log(`check-easteregg-watched: OK (${watched.length} watched prompt(s), no flip-away in any easter-egg phase)`);
