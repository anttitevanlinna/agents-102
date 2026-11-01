#!/usr/bin/env node
'use strict';
// words.js — the word signal from persona-student logs, replacing the 1–7 enjoyment mean
// (which failed the damaged-copy check: damaged 4.4 vs original 4.3 on Module 7).
//
//   node words.js --module-json personal-to-team.json --logs a.json,b.json,... [--out report.json]
//
// Per log, one extraction call reads only what the student SAID (one_line, take_homes, tells,
// what they skipped) and returns praise and complaints. Mechanical parts need no call:
//   skipped    beats tagged boredom/confusion/frustration or attention skimming/checked-out,
//              each with the sentence the student quoted as the cause
//   tells      beats the student would mention to a colleague tonight, with the quoted sentence
// Scores per page variant (lower complaints and skips, more specific praise = better):
//   complaints        filler | repetition | missing | tone | confusing, counted from the verdict
//   specific_praise   distinct page ideas the student names approvingly
//   skipped, tells    counts
//   law_hits          intended learnings carried in take-homes or the verdict
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const a = Object.fromEntries(process.argv.slice(2).reduce((acc, v, i, arr) =>
  (v.startsWith('--') ? acc.concat([[v.slice(2), arr[i + 1]]]) : acc), []));
const mod = JSON.parse(fs.readFileSync(a['module-json'], 'utf8'));
const logs = a.logs.split(',').map((f) => ({ file: f, ...JSON.parse(fs.readFileSync(f, 'utf8')) }));
const DEAD = new Set(['boredom', 'confusion', 'frustration']);

const once = (prompt) => new Promise((res) => {
  const p = spawn('claude', ['-p', '--model', process.env.WORDS_MODEL || 'sonnet', '--output-format', 'text']);
  let t = ''; p.stdout.on('data', (d) => (t += d)); p.on('close', () => res(t)); p.stdin.end(prompt);
});
async function ask(prompt) {
  for (let i = 0; i < 2; i++) {
    const t = await once(prompt);
    const b = [...t.matchAll(/```json\s*([\s\S]*?)```/g)];
    try { return JSON.parse(b.length ? b[b.length - 1][1] : t.slice(t.indexOf('{'), t.lastIndexOf('}') + 1)); } catch (_) {}
  }
  return { praise: [], complaints: [], laws: [] };
}

async function extract(l) {
  const skipped = (l.beats || []).filter((b) => DEAD.has(b.tag) || b.attention !== 'in');
  const tells = (l.beats || []).filter((b) => b.tell_colleague);
  const prompt = `A training participant just finished a module. Read ONLY what they said and classify it. Do not judge the module yourself.

What they would say at the coffee machine: "${l.one_line}"
What they take home:
${(l.take_homes || []).map((t) => `- ${t}`).join('\n')}
Moments they would tell a colleague about (what they got):
${tells.map((b) => `- ${b.got}`).join('\n') || '- none'}

Module's intended learnings (ids):
${mod.intended_learnings.map((x) => `- ${x.id}: ${x.text}`).join('\n')}

Return one json block:
{"praise":[short names of specific ideas from the module they speak well of; a generic "useful" is not an idea],
 "complaints":[{"kind":"filler"|"repetition"|"missing"|"tone"|"confusing","about":"few words"}],
 "laws":[intended learning ids carried in substance by the take-homes or the coffee-machine line]}`;
  const x = await ask(prompt);
  return {
    persona: l.persona, page: l.page_hash, file: path.basename(l.file),
    praise: x.praise || [], complaints: x.complaints || [], laws: x.laws || [],
    skipped: skipped.map((b) => ({ id: b.id, tag: b.tag, quote: b.trigger })),
    tells: tells.map((b) => ({ id: b.id, quote: b.trigger })),
  };
}

(async () => {
const rows = [];
const CONC = Number(process.env.WORDS_CONCURRENCY || 6);
for (let i = 0; i < logs.length; i += CONC) rows.push(...await Promise.all(logs.slice(i, i + CONC).map(extract)));
const mean = (xs) => Math.round(10 * xs.reduce((s, x) => s + x, 0) / (xs.length || 1)) / 10;
const byPage = {};
for (const r of rows) (byPage[r.page] ||= []).push(r);
const summary = Object.fromEntries(Object.entries(byPage).map(([p, rs]) => {
  const kinds = {};
  for (const r of rs) for (const c of r.complaints) kinds[c.kind] = (kinds[c.kind] || 0) + 1;
  const laws = {};
  for (const r of rs) for (const id of r.laws) laws[id] = (laws[id] || 0) + 1;
  return [p, {
    runs: rs.length, complaints: mean(rs.map((r) => r.complaints.length)), ...Object.fromEntries(Object.entries(kinds).map(([k, n]) => [`c_${k}`, n])),
    specific_praise: mean(rs.map((r) => new Set(r.praise.map((x) => x.toLowerCase())).size)),
    skipped: mean(rs.map((r) => r.skipped.length)), tells: mean(rs.map((r) => r.tells.length)), law_hits: mean(rs.map((r) => r.laws.length)), laws,
  }];
}));
const report = { module: mod.module, at: new Date().toISOString(), summary, rows };
if (a.out) fs.writeFileSync(a.out, JSON.stringify(report, null, 2));
console.log(JSON.stringify(summary, null, 1));
})();
