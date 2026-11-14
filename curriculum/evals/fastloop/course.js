#!/usr/bin/env node
'use strict';
// course.js — one student through the whole course, module by module, then the cross-module question.
//
//   node course.js --pages DIR --out DIR [--personas ..] [--reps 2] [--jobs 6]
//   DIR holds <slug>.md for the eight Agents 101 modules (scripts/read-training.js output).
//
// Each module is walked as in run.js (note per beat, attention, did), with what the student carried from earlier
// modules: their take-homes from each, plus their full notes from Modules 3 and 5, where the briefing is made and
// checked. After each module, the cold question from that module's notes only (run.js probe, score.js scorer), so
// per-module numbers sit on the same scale as the pooled baselines. After Module 8, chain.js's question and judge:
// "What happened to the briefing you made in Module 3?" scored on made / checked / improved.
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { loadPersona, beats } = require('../mechanical/persona-student/lib');
const { askAsync, pool, args } = require('../teaching/lib');
const { scoreOne } = require('../teaching/score');

const a = args();
const OUT = a.out; fs.mkdirSync(OUT, { recursive: true });
const PD = a['persona-dir'] || path.join(__dirname, '..', 'personas', 'agents-101');
const PERSONAS = String(a.personas || 'ingrid,cfo-sceptic,cto-builder,hr-svp,ops-director,veteran-director').split(/[ ,]+/);
const REPS = Number(a.reps || 2); const JOBS = Number(a.jobs || 6);
const MODS = ['getting-going', 'building-agent-systems', 'multi-agent-systems', 'security', 'output-quality', 'evaluations', 'personal-to-team', 'agents-building-agents'];
const KEEP = new Set([2, 4]); // full notes carried forward from Modules 3 and 5
const Q = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'teaching', 'targets.json'), 'utf8')).cold_question;
const CQ = 'What happened to the briefing you made in Module 3?';
const page = Object.fromEntries(MODS.map((m) => [m, fs.readFileSync(path.join(a.pages, `${m}.md`), 'utf8')]));
const VERSION = crypto.createHash('sha256').update(fs.readFileSync(__filename, 'utf8')).digest('hex').slice(0, 8);
const sha = (s) => crypto.createHash('sha256').update(s).digest('hex').slice(0, 16);
const STUD = path.join(OUT, 'students.jsonl');
const done = new Map(fs.existsSync(STUD) ? fs.readFileSync(STUD, 'utf8').split('\n').filter(Boolean).map((l) => { const r = JSON.parse(l); return [r.key, r]; }) : []);
const notes = (w) => (w.beats || []).map((b) => b.got).filter((g) => g && !/^nothing new/i.test(g));
const lab = (i) => `Module ${i + 1}`;

function carried(walks) {
  return walks.map((w, i) => `${lab(i)} (${MODS[i]}): you took home: ${(w.take_homes || []).join(' | ') || '(nothing)'}${KEEP.has(i) ? `\n  your notes: ${notes(w).join(' / ') || '(none)'}` : ''}`).join('\n');
}
function walkPrompt(i, persona, walks) {
  const walk = beats(page[MODS[i]]).map((b) => `=== BEAT ${b.id} ===\n## ${b.heading}\n${b.body.replace(/\{\{prompt:([\w-]+)\}\}/g, (_, k) => `[You paste prompt "${k}" into Claude and it works on it.]`)}`).join('\n\n');
  return `${persona.text}

---
You are this person, in the room for Agents 101, ${lab(i)}, "${MODS[i]}".${walks.length ? ` What you have from the earlier modules, and the files your agents wrote then are still in your folder:\n${carried(walks)}\n\n` : ' '}You go through the module below in order, one beat at a time, as a participant. You do the exercises. You do not know what the trainer intends you to learn.

After each beat, note down honestly, as the card describes you:
- got: what you just got, in at most 15 words of your own, or "nothing new"
- att: in | skim | out (your attention on that beat)
- did: only where the beat asks you to do something (a prompt to run, a step, a file to write): "yes" if you did it, "skipped" if you did not, as this person really would

${walk}

=== END OF MODULE ===
Then, without scrolling back to the page and without quoting it:
- take_homes: the 2-3 things you are actually taking home, in your own words (fewer if fewer)
- one_line: what you would say about this module at the coffee machine

Answer with one json block: {"beats":[{"id","got","att","did"?}...one per beat, same ids...],"take_homes":[...],"one_line":"..."}`;
}
// run.js probe, word for word apart from the module name.
const probePrompt = (persona, mod, l) => `${persona.text}

---
You are this person. A few days ago you took the Agents 101 module "${mod}". You do not have the
material any more. These are the notes you wrote while going through it, in your own words:
${notes(l).map((n) => `- ${n}`).join('\n') || '- (you wrote nothing down)'}
What you said you were taking home: ${(l.take_homes || []).join(' | ') || '(nothing)'}
What you said at the coffee machine: ${l.one_line || '(nothing)'}

Now: ${Q}
Answer as this person would, honestly, in one or two sentences. If nothing stuck, say so.
Answer with one json block: {"answer": "..."}`;
const chainProbe = (persona, walks) => `${persona.text}

---
You are this person. Over the past weeks you took all of Agents 101. You do not have the material any more.
What you have from it, in your own words:
${carried(walks)}
Module 6 (evaluations) notes: ${notes(walks[5]).join(' / ') || '(none)'}

A colleague asks: "${CQ}"
Answer as this person would, honestly, in two or three sentences. If you do not remember, say so.
Answer with one json block: {"answer": "..."}`;
const judgePrompt = (answer) => `A participant in an AI training was asked, weeks later: "${CQ}"
Their answer: "${answer}"

In the training, one document travelled across three modules. Mark each link true ONLY if the answer itself says it (in any words); do not infer, do not reward vague mentions.
- made: the briefing was produced by their own agents or agent system from real sources on a real question.
- checked: the briefing (or one made the same way) was later tested for fabrication, hallucination or grounding, claim by claim against sources, or a judge/checker for that was built from it.
- improved: a judge or score was then run on new briefings again and again, and the way briefings get generated was changed from that feedback, so they got better.

Answer with one json block: {"made": true|false, "checked": true|false, "improved": true|false}`;

async function student(who, rep) {
  const persona = loadPersona(PD, who);
  const key = sha([VERSION, persona.hash, ...MODS.map((m) => sha(page[m])), rep].join('|'));
  if (done.has(key)) return done.get(key);
  const walks = []; const mods = [];
  for (let i = 0; i < MODS.length; i++) {
    const w = await askAsync(walkPrompt(i, persona, walks), 'sonnet');
    const ids = new Set(beats(page[MODS[i]]).map((b) => b.id)); w.beats = (w.beats || []).filter((b) => ids.has(b.id));
    walks.push(w);
    const p = await askAsync(probePrompt(persona, MODS[i], w), 'sonnet');
    const sc = await scoreOne({ id: `${MODS[i]}-${who}-r${rep}`, module: MODS[i], answer: String(p.answer || '') });
    mods.push({ module: MODS[i], beats: w.beats, take_homes: w.take_homes, one_line: w.one_line, answer: p.answer, score: sc.score });
    console.error(`[course] ${who} r${rep} ${MODS[i]} ${Math.round(100 * sc.score)}`);
  }
  const c = await askAsync(chainProbe(persona, walks), 'sonnet');
  const answer = String(c.answer || '');
  const js = await Promise.all([0, 1].map(() => askAsync(judgePrompt(answer), 'sonnet')));
  const link = (k) => js.filter((j) => j[k] === true).length / js.length;
  const links = { made: link('made'), checked: link('checked'), improved: link('improved') };
  const r = { key, persona: who, rep, mods, chain: { answer, links, score: Math.round(100 * (links.made + links.checked + links.improved) / 3) } };
  fs.appendFileSync(STUD, JSON.stringify(r) + '\n'); done.set(key, r);
  return r;
}

(async () => {
  const t0 = Date.now();
  const jobs = []; for (const p of PERSONAS) for (let r = 1; r <= REPS; r++) jobs.push([p, r]);
  const rows = (await pool(jobs, async ([p, r]) => { try { return await student(p, r); } catch (e) { console.error(`[course] ${p} r${r}: ${e.message}`); return null; } }, JOBS)).filter(Boolean);
  const mean = (xs) => xs.length ? Math.round(xs.reduce((x, y) => x + y, 0) / xs.length) : null;
  const res = { n: rows.length, modules: {}, chain: {}, secs: 0 };
  for (const m of MODS) {
    const ms = rows.map((r) => r.mods.find((x) => x.module === m));
    res.modules[m] = { cold: mean(ms.map((x) => 100 * x.score)) };
  }
  for (const k of ['made', 'checked', 'improved']) res.chain[k] = mean(rows.map((r) => 100 * r.chain.links[k]));
  res.chain.score = mean(rows.map((r) => r.chain.score));
  res.secs = Math.round((Date.now() - t0) / 1000);
  fs.writeFileSync(path.join(OUT, 'result.json'), JSON.stringify(res, null, 2));
  console.log(JSON.stringify(res, null, 2));
})();
