#!/usr/bin/env node
'use strict';
// solo.js — solo learners through the open self-study edition, unit by unit: where they stall and where they stop.
//
//   node solo.js --pages DIR --out DIR [--personas a,b] [--reps 1] [--jobs 6] [--units prework,getting-going]
//   DIR holds <unit>.md from solo-pages.js (the rendered handbook, prompt bodies included).
//
// course.js walks room participants and shows prompt names only. This walk is the person alone at their own desk:
// they see the prompt bodies, they have no trainer and no neighbour, and each beat is marked done, partly, skipped
// or stuck with the reason. After each unit: the chance they stop the course there for good, when they would start
// the next unit, what they take home, then the cold question on that unit's Big Idea (run.js probe, score.js scorer).
// The stop chance is a persona's own estimate, not a completion rate. It ranks places against each other on one
// build and compares two builds on the same personas; read the reasons before the numbers.
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { beats } = require('../mechanical/persona-student/lib');
const { askAsync, pool, args } = require('../teaching/lib');
const { scoreOne } = require('../teaching/score');

const a = args();
const OUT = a.out; fs.mkdirSync(OUT, { recursive: true });
const ALL = ['prework', 'getting-going', 'building-agent-systems', 'multi-agent-systems', 'security', 'output-quality', 'evaluations', 'agents-building-agents-solo'];
const UNITS = a.units ? String(a.units).split(',') : ALL;
const TARGET = { 'agents-building-agents-solo': 'agents-building-agents' }; // the solo module carries the Module 8 Big Idea
const NAME = (u) => (u === 'prework' ? 'First steps' : `Module ${ALL.indexOf(u)}`);
const PEOPLE = JSON.parse(fs.readFileSync(path.join(__dirname, 'solo-personas.json'), 'utf8')).filter(([id]) => !a.personas || String(a.personas).split(',').includes(id));
const REPS = Number(a.reps || 1); const JOBS = Number(a.jobs || 6);
const Q = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'teaching', 'targets.json'), 'utf8')).cold_question;
const page = Object.fromEntries(UNITS.map((u) => [u, fs.readFileSync(path.join(a.pages, `${u}.md`), 'utf8')]));
const VERSION = crypto.createHash('sha256').update(fs.readFileSync(__filename, 'utf8')).digest('hex').slice(0, 8);
const sha = (s) => crypto.createHash('sha256').update(s).digest('hex').slice(0, 16);
const STUD = path.join(OUT, 'students.jsonl');
const done = new Map(fs.existsSync(STUD) ? fs.readFileSync(STUD, 'utf8').split('\n').filter(Boolean).map((l) => { const r = JSON.parse(l); return [r.key, r]; }) : []);

const carried = (walks) => walks.map((w) => `${NAME(w.unit)}: took home: ${(w.take_homes || []).join(' | ') || '(nothing)'}. Energy after it: ${w.energy}/5.`).join('\n');

function walkPrompt(u, who, walks) {
  const walk = beats(page[u]).map((b) => `=== BEAT ${b.id} ===\n## ${b.heading}\n${b.body}`).join('\n\n');
  return `${who}

---
You are this person. You found Agents 101, a free self-study course, on the web and you are doing it alone: no trainer, no classmates, nobody checking on you. You work in Claude Desktop (Cowork) with a folder on your own computer, and your plan's usage limits are not a problem: never give a usage limit as a reason. The modules are done in order: when you open a unit, every file the earlier units produce is in your folder, so never give a missing earlier file or an earlier unfinished step as a reason. Most people who start a free online course do not finish it. Be this person on a real day, with their real patience, material and setup, not an ideal student.
${walks.length ? `\nWhere you are so far:\n${carried(walks)}\n` : ''}
You now open ${NAME(u)} in the handbook and go through it in order, beat by beat. A [PROMPT TO PASTE] is text you copy into Claude; the agent then does that work and you answer what it asks. Anything else the page asks of you, you have to do yourself.

After each beat, note:
- did: "read" if the beat only asks you to read; "yes" if you did what it asks; "partly"; "skipped" if you chose not to; "stuck" if you tried or wanted to and could not (you lack the thing it needs, you cannot tell how, it needs someone or something you do not have, it means waiting)
- why: only for partly, skipped or stuck: the reason in at most 20 words, naming the words on the page that caused it
- min: your honest minutes on this beat

${walk}

=== END OF ${NAME(u).toUpperCase()} ===
Then, honestly, as this person:
- stop: the one place in this unit where you were closest to closing the tab for good: {"beat": its id, "chance": 0-100 that you in fact stop the course somewhere in this unit or before starting the next one, "why": at most 25 words}
- next: when you would start the next unit: "same sitting" | "next day" | "within a week" | "later" | "never", and "why" in at most 20 words, naming anything the page told you to do or wait for first
- take_homes: the 2-3 things you are taking home, in your own words (fewer if fewer)
- one_line: what you would tell a friend about this unit
- energy: 1-5, how much you want to go on

Answer with one json block: {"beats":[{"id","did","why"?,"min"}...one per beat, same ids...],"stop":{"beat","chance","why"},"next":{"when","why"},"take_homes":[...],"one_line":"...","energy":n}`;
}
const notes = (w) => (w.take_homes || []).concat(w.one_line || []);
const probePrompt = (who, u, w) => `${who}

---
You are this person. A few days ago you did ${NAME(u)} of Agents 101, a self-study course, alone. You do not have the
material any more. What you said you were taking home: ${(w.take_homes || []).join(' | ') || '(nothing)'}
What you told a friend: ${w.one_line || '(nothing)'}
Steps you did not do: ${(w.beats || []).filter((b) => /skipped|stuck/.test(b.did)).map((b) => b.id.split('/').pop()).join(', ') || 'none'}

Now: ${Q}
Answer as this person would, honestly, in one or two sentences. If nothing stuck, say so.
Answer with one json block: {"answer": "..."}`;

async function student([id, who], rep) {
  const key = sha([VERSION, who, ...UNITS.map((u) => sha(page[u])), rep].join('|'));
  if (done.has(key)) return done.get(key);
  const walks = [];
  for (const u of UNITS) {
    const w = await askAsync(walkPrompt(u, who, walks), 'sonnet');
    const ids = new Set(beats(page[u]).map((b) => b.id)); w.beats = (w.beats || []).filter((b) => ids.has(b.id)); w.unit = u;
    if (u !== 'prework') {
      const p = await askAsync(probePrompt(who, u, w), 'sonnet');
      const sc = await scoreOne({ id: `${u}-${id}-r${rep}`, module: TARGET[u] || u, answer: String(p.answer || '') });
      w.answer = p.answer; w.score = sc.score;
    }
    walks.push(w);
    console.error(`[solo] ${id} r${rep} ${u} stop ${w.stop && w.stop.chance} next ${w.next && w.next.when}${w.score == null ? '' : ` idea ${Math.round(100 * w.score)}`}`);
  }
  const r = { key, persona: id, rep, walks };
  fs.appendFileSync(STUD, JSON.stringify(r) + '\n'); done.set(key, r);
  return r;
}

(async () => {
  const t0 = Date.now();
  const jobs = []; for (const p of PEOPLE) for (let r = 1; r <= REPS; r++) jobs.push([p, r]);
  const rows = (await pool(jobs, async ([p, r]) => { try { return await student(p, r); } catch (e) { console.error(`[solo] ${p[0]} r${r}: ${e.message}`); return null; } }, JOBS)).filter(Boolean);
  const mean = (xs) => (xs.length ? Math.round(xs.reduce((x, y) => x + y, 0) / xs.length) : null);
  const res = { n: rows.length, units: {}, secs: 0 };
  let alive = 100;
  const md = ['# Solo walk', '', `${rows.length} learners. Stop chance is each persona's own estimate; "still going" multiplies it through the course.`, '', '| Unit | Stop chance | Still going | Big Idea stated | Minutes | Starts next: same sitting / next day / within a week / later / never |', '|---|---:|---:|---:|---:|---|'];
  const stalls = [];
  for (const u of UNITS) {
    const ws = rows.map((r) => ({ ...r.walks.find((w) => w.unit === u), persona: r.persona })).filter((w) => w.beats);
    const stop = mean(ws.map((w) => Number(w.stop && w.stop.chance) || 0)); alive = alive * (100 - stop) / 100;
    const when = ['same sitting', 'next day', 'within a week', 'later', 'never'].map((k) => ws.filter((w) => w.next && w.next.when === k).length);
    const minutes = mean(ws.map((w) => w.beats.reduce((s, b) => s + (Number(b.min) || 0), 0)));
    const idea = u === 'prework' ? null : mean(ws.map((w) => 100 * (w.score || 0)));
    const by = {};
    for (const w of ws) for (const b of w.beats) if (/partly|skipped|stuck/.test(b.did)) (by[b.id] = by[b.id] || []).push({ persona: w.persona, did: b.did, why: b.why || '' });
    res.units[u] = { stop, alive: Math.round(alive), idea, minutes, when, stops: ws.map((w) => ({ persona: w.persona, ...w.stop })), nexts: ws.map((w) => ({ persona: w.persona, ...w.next })), not_done: by, take_homes: ws.map((w) => ({ persona: w.persona, take_homes: w.take_homes, answer: w.answer, score: w.score })) };
    md.push(`| ${NAME(u)} ${u} | ${stop} | ${Math.round(alive)} | ${idea == null ? '' : idea} | ${minutes} | ${when.join(' / ')} |`);
    stalls.push(`\n## ${NAME(u)}: ${u}\n`, '**Closest to stopping**', ...ws.map((w) => `- ${w.persona} (${w.stop && w.stop.chance}) at \`${w.stop && w.stop.beat}\`: ${w.stop && w.stop.why}`), '', '**Before the next unit**', ...ws.map((w) => `- ${w.persona}: ${w.next && w.next.when}. ${w.next && w.next.why}`), '', '**Not done** (beats 2 or more learners left)', ...Object.entries(by).filter(([, v]) => v.length >= 2).sort((x, y) => y[1].length - x[1].length).map(([id, v]) => `- \`${id}\` ${v.length}/${ws.length}: ${v.map((x) => `${x.persona} ${x.did}: ${x.why}`).join(' ; ')}`));
  }
  res.secs = Math.round((Date.now() - t0) / 1000);
  fs.writeFileSync(path.join(OUT, 'result.json'), JSON.stringify(res, null, 2));
  fs.writeFileSync(path.join(OUT, 'report.md'), md.concat(stalls).join('\n') + '\n');
  console.log(md.join('\n'));
})();
