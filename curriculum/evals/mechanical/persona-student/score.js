#!/usr/bin/env node
'use strict';
// score.js — turn experience logs into the mechanical scores, and compare variants.
//
//   node score.js --module security --logs a.json,b.json,… [--match] [--out report.json]
// Groups logs by page_hash (one group per page variant) and persona. --match asks one judge
// call per log to match take-homes against the module's intended learnings (hits, misses,
// unexpected, misconceptions); without it only the arithmetic scores run.
const fs = require('fs');
const path = require('path');
const { askJson } = require('./lib');

const a = Object.fromEntries(process.argv.slice(2).reduce((acc, v, i, arr) =>
  (v.startsWith('--') ? acc.concat([[v.slice(2), arr[i + 1] && !arr[i + 1].startsWith('--') ? arr[i + 1] : true]]) : acc), []));
const mod = JSON.parse(fs.readFileSync(path.join(__dirname, 'modules', `${a.module}.json`), 'utf8'));
const logs = a.logs.split(',').map((f) => ({ file: f, ...JSON.parse(fs.readFileSync(f, 'utf8')) }));

const mean = (xs) => (xs.length ? xs.reduce((s, x) => s + x, 0) / xs.length : null);
const r1 = (x) => (x == null ? null : Math.round(x * 10) / 10);
const DEAD = new Set(['boredom', 'confusion', 'frustration']);

function match(log) {
  const prompt = `You are matching what a training participant says they learned against what the module intended.
Intended learnings:
${mod.intended_learnings.map((l) => `- ${l.id}: ${l.text}`).join('\n')}

Participant's take-homes (own words):
${(log.take_homes || []).map((t) => `- ${t}`).join('\n')}

For each intended learning: hit if a take-home carries the same idea in substance (not just a shared word).
List unexpected take-homes that match no intended learning, and say for each whether it is a sound idea or a misconception.
Answer with one json block: {"hits":[ids],"misses":[ids],"unexpected":[{"text","kind":"sound"|"misconception"}]}`;
  return askJson(prompt);
}

function scoreLog(l) {
  const b = l.beats || [];
  const s = {
    persona: l.persona, page: l.page_hash, file: path.basename(l.file),
    enjoyment: r1(mean(b.map((x) => x.enjoyment))),
    peak: Math.max(...b.map((x) => x.enjoyment)),
    end: b.length ? b[b.length - 1].enjoyment : null,
    mood_fit: r1(100 * b.filter((x) => mod.target_tags.includes(x.tag)).length / (b.length || 1)),
    dead_air: b.filter((x) => DEAD.has(x.tag) || x.attention === 'checked-out').length,
    checked_out: b.filter((x) => x.attention === 'checked-out').length,
    tell: b.filter((x) => x.tell_colleague).length,
    nothing_new: b.filter((x) => /^nothing new/i.test(x.got || '')).length,
    recommend: l.would_recommend,
    misconception: l.misconception && l.misconception.status,
    monday_specific: !!(l.monday && l.monday.move && !/^nothing/i.test(l.monday.move) && l.monday.who && l.monday.stop_condition),
    dead_beats: b.filter((x) => DEAD.has(x.tag) || x.attention === 'checked-out').map((x) => ({ id: x.id, tag: x.tag, trigger: x.trigger })),
  };
  if (a.match) {
    const m = match(l);
    s.learn_hits = m.hits.length; s.learn_total = mod.intended_learnings.length;
    s.hits = m.hits; s.unexpected = m.unexpected;
  }
  return s;
}

const scored = logs.map(scoreLog);
const groups = {};
for (const s of scored) (groups[`${s.page}`] ||= []).push(s);
const KEYS = ['enjoyment', 'peak', 'end', 'mood_fit', 'dead_air', 'checked_out', 'tell', 'nothing_new', 'recommend', 'learn_hits'];
const summary = Object.fromEntries(Object.entries(groups).map(([page, ss]) => [page,
  Object.fromEntries(KEYS.map((k) => [k, r1(mean(ss.map((s) => s[k]).filter((x) => x != null)))]))]));

const report = { module: mod.module, at: new Date().toISOString(), summary, logs: scored };
if (a.out) fs.writeFileSync(a.out, JSON.stringify(report, null, 2));
console.table(scored.map(({ dead_beats, hits, unexpected, file, ...rest }) => rest));
console.log('by page variant:'); console.table(summary);
