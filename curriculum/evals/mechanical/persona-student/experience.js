#!/usr/bin/env node
'use strict';
// experience.js — a persona works through one module beat by beat and logs what it felt
// and what it got. Where the page has a {{prompt:<key>}}, the persona sees the reply Claude
// actually gave in a real tmux run (--runs), so the experience includes the agent's real
// behaviour, not an imagined one.
//
//   node experience.js --persona-dir DIR --persona ID --module security \
//        --page student-view.md [--runs out/a101-m4a-…,out/a101-m4b-…] --out log.json
// The page may be a variant or damaged copy; its hash is recorded with the log.
const fs = require('fs');
const path = require('path');
const { loadPersona, askJson, beats, sha } = require('./lib');

const a = Object.fromEntries(process.argv.slice(2).reduce((acc, v, i, arr) =>
  (v.startsWith('--') ? acc.concat([[v.slice(2), arr[i + 1]]]) : acc), []));
const persona = loadPersona(a['persona-dir'], a.persona);
const mod = JSON.parse(fs.readFileSync(path.join(__dirname, 'modules', `${a.module}.json`), 'utf8'));
const page = fs.readFileSync(a.page, 'utf8');
const MAX_REPLY = Number(process.env.PERSONA_MAX_REPLY || 2500);

// prompt key -> what Claude said back, from the runner's per-turn captures. Turn N is the
// Nth non-comment line of the module's scenario file; its first token is the prompt key.
const RUNNER = path.join(__dirname, '..', 'tmux-runner');
function scenarioKeys(runDir) {
  const m = path.basename(runDir).match(/^a101-(\w+?)-\d{8}-/);
  const f = path.join(RUNNER, 'scenarios', `a101-${m[1]}.txt`);
  return fs.readFileSync(f, 'utf8').split('\n').filter((l) => l.trim() && !l.trim().startsWith('#')).map((l) => l.trim().split(/\s/)[0]);
}
function cleanPane(t) {
  const lines = t.split('\n');
  const start = lines.findIndex((l) => l.startsWith('❯ '));
  let body = lines.slice(start >= 0 ? start : 0);
  const end = body.findIndex((l, i) => i > 0 && /^[─━]{20,}/.test(l.trim()));
  if (end > 0) body = body.slice(0, end);
  return body.filter((l) => !/tmux detected|focus-events|auto mode on/.test(l)).join('\n');
}
function replies(runDirs) {
  const map = {};
  for (const d of runDirs) {
    const keys = scenarioKeys(d);
    for (const f of fs.readdirSync(d).filter((x) => /^turn-\d+\.transcript\.txt$/.test(x))) {
      const n = Number(f.match(/\d+/)[0]);
      const key = keys[n - 1];
      if (!key || key === '*') continue;
      let t = cleanPane(fs.readFileSync(path.join(d, f), 'utf8')).replace(/\n{3,}/g, '\n\n').trim();
      if (t.length > MAX_REPLY) t = t.slice(0, MAX_REPLY / 2) + '\n[… long reply, middle skipped …]\n' + t.slice(-MAX_REPLY / 2);
      map[key] = t;
    }
  }
  return map;
}
const got = a.runs ? replies(a.runs.split(',')) : {};

const bs = beats(page);
const walk = bs.map((b) => {
  const body = b.body.replace(/\{\{prompt:([\w-]+)\}\}/g, (_, k) => got[k]
    ? `[You paste prompt "${k}" into Claude. Claude's actual reply:]\n<<<CLAUDE\n${got[k]}\nCLAUDE>>>`
    : `[You paste prompt "${k}" into Claude and it works on it.]`);
  return `=== BEAT ${b.id} ===\n## ${b.heading}\n${body}`;
}).join('\n\n');

const prompt = `${persona.text}

---
You are this person, in the room for Agents 101, module "${mod.module}". You go through the
module below in order, one beat at a time, as a participant. You do the exercises (where Claude's
real reply is shown, that is what happened on your screen). You do not know what the trainer
intends you to learn.

After each beat, write down honestly how it was for YOU, as the card describes you:
- enjoyment 1-7 (4 = neutral; be as harsh as the person would be)
- tag: one of surprise, mastery, flow, unease, boredom, confusion, frustration, neutral
- attention: in | skimming | checked-out
- trigger: the ONE sentence from that beat (quoted exactly) that most caused your reaction
- got: what you just got, one sentence in your own words, or "nothing new"
- tell_colleague: true if you would mention this moment to a colleague tonight

${walk}

=== END OF MODULE ===
Then, without scrolling back to the page and without quoting it:
- take_homes: the 2-3 things you are actually taking home, in your own words (fewer if fewer)
- monday: what you will do on Monday {move, who, when, stop_condition, blocker}; "nothing" is allowed
- misconception: did your card's misconception change? {status: kept|shaken|changed, when: beat id or null, why}
- would_recommend: 0-10, would you tell a peer leader to take this module
- one_line: what you would say about this module at the coffee machine

Answer with one json block:
{"beats":[{"id","enjoyment","tag","attention","trigger","got","tell_colleague"}...one per beat, same ids...],
 "take_homes":[...],"monday":{...},"misconception":{...},"would_recommend":n,"one_line":"..."}`;

const log = askJson(prompt);
const ids = new Set(bs.map((b) => b.id));
log.beats = (log.beats || []).filter((b) => ids.has(b.id));
const out = {
  persona: persona.id, persona_hash: persona.hash, module: mod.module,
  page_hash: sha(page).slice(0, 16), prompt_hash: sha(fs.readFileSync(__filename, 'utf8')).slice(0, 16),
  runs: a.runs ? a.runs.split(',').map((d) => path.basename(d)) : [], replies_seen: Object.keys(got),
  model: process.env.PERSONA_MODEL || 'sonnet', at: new Date().toISOString(), ...log,
};
fs.mkdirSync(path.dirname(a.out), { recursive: true });
fs.writeFileSync(a.out, JSON.stringify(out, null, 2));
console.log(`[experience] ${persona.id} page=${out.page_hash} beats=${out.beats.length}/${bs.length} → ${a.out}`);
