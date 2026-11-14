#!/usr/bin/env node
'use strict';
// chain.js — the cross-module question: after Module 6, what happened to the Module 3 briefing?
//
//   node chain.js --sets intact=m3.md:m5.md:m6.md,damaged=m3d.md:m5d.md:m6d.md --out DIR [--personas ..] [--reps 4] [--jobs 8]
//
// Each student walks Module 3, then Module 5 with their Module 3 notes in hand, then Module 6 with both
// (same walk as run.js: one note of 15 words or fewer per beat, attention, did). Days later, from notes only,
// they answer "What happened to the Module 3 briefing?". A judge (2 blind calls, averaged) marks three links:
//   made      the Module 3 agents produced the briefing from real sources on a real question
//   checked   in Module 5 it was tested claim by claim against its sources; a judge for fabrication came out of it
//   improved  in Module 6 that judge scored new briefings in a loop that rewrote how they are generated
// Score = links stated / 3, 0-100. Paired by persona x rep across sets. The instrument is valid when a copy
// with the chain removed (damage-chain.js) scores 20 or more lower than the intact pages.
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { loadPersona, beats } = require('../mechanical/persona-student/lib');
const { askAsync, pool, args } = require('../teaching/lib');

const a = args();
const SETS = Object.fromEntries(String(a.sets).split(',').map((s) => { const i = s.indexOf('='); return [s.slice(0, i), s.slice(i + 1).split(':')]; }));
const OUT = a.out; fs.mkdirSync(OUT, { recursive: true });
const PD = a['persona-dir'] || path.join(__dirname, '..', 'personas', 'agents-101');
const PERSONAS = String(a.personas || 'ingrid,cfo-sceptic,cto-builder,hr-svp,ops-director,veteran-director').split(/[ ,]+/);
const REPS = Number(a.reps || 4); const JOBS = Number(a.jobs || 8);
const MODS = [['multi-agent-systems', 'Module 3'], ['output-quality', 'Module 5'], ['evaluations', 'Module 6']];
const Q = 'What happened to the briefing you made in Module 3?';
const VERSION = crypto.createHash('sha256').update(fs.readFileSync(__filename, 'utf8')).digest('hex').slice(0, 8);
const sha = (s) => crypto.createHash('sha256').update(s).digest('hex').slice(0, 16);
const STUD = path.join(OUT, 'students.jsonl');
const done = new Map(fs.existsSync(STUD) ? fs.readFileSync(STUD, 'utf8').split('\n').filter(Boolean).map((l) => { const r = JSON.parse(l); return [r.key, r]; }) : []);
const text = Object.fromEntries(Object.entries(SETS).map(([k, ps]) => [k, ps.map((p) => fs.readFileSync(p, 'utf8'))]));
const noteLines = (w) => (w.beats || []).map((b) => b.got).filter((g) => g && !/^nothing new/i.test(g));

function walkPrompt(page, mod, label, persona, earlier) {
  const walk = beats(page).map((b) => `=== BEAT ${b.id} ===\n## ${b.heading}\n${b.body.replace(/\{\{prompt:([\w-]+)\}\}/g, (_, k) => `[You paste prompt "${k}" into Claude and it works on it.]`)}`).join('\n\n');
  const prior = earlier.map(([lab, w]) => `Your notes from ${lab}, in your own words:\n${noteLines(w).map((n) => `- ${n}`).join('\n') || '- (nothing)'}\nWhat you took home from ${lab}: ${(w.take_homes || []).join(' | ') || '(nothing)'}`).join('\n\n');
  return `${persona.text}

---
You are this person, in the room for Agents 101, ${label}, "${mod}".${prior ? ` You took the earlier modules; this is what you have from them:\n\n${prior}\n\n` : ' '}You go through the module below in order, one beat at a time, as a participant. You do the exercises. You do not know what the trainer intends you to learn.

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

function probePrompt(persona, walks) {
  return `${persona.text}

---
You are this person. Over the past weeks you took Agents 101. You do not have the material any more.
These are the notes you wrote in three of the modules, in your own words:

${walks.map(([lab, w]) => `${lab}:\n${noteLines(w).map((n) => `- ${n}`).join('\n') || '- (nothing)'}\nTaking home: ${(w.take_homes || []).join(' | ') || '(nothing)'}`).join('\n\n')}

A colleague asks: "${Q}"
Answer as this person would, honestly, in two or three sentences. If you do not remember, say so.
Answer with one json block: {"answer": "..."}`;
}

const judgePrompt = (answer) => `A participant in an AI training was asked, weeks later: "${Q}"
Their answer: "${answer}"

In the training, one document travelled across three modules. Mark each link true ONLY if the answer itself says it (in any words); do not infer, do not reward vague mentions.
- made: the briefing was produced by their own agents or agent system from real sources on a real question.
- checked: the briefing (or one made the same way) was later tested for fabrication, hallucination or grounding, claim by claim against sources, or a judge/checker for that was built from it.
- improved: a judge or score was then run on new briefings again and again, and the way briefings get generated was changed from that feedback, so they got better.

Answer with one json block: {"made": true|false, "checked": true|false, "improved": true|false}`;

async function student(set, who, rep) {
  const persona = loadPersona(PD, who);
  const key = sha([VERSION, persona.hash, ...text[set].map(sha), rep].join('|'));
  if (done.has(key)) return done.get(key);
  const walks = [];
  for (let i = 0; i < 3; i++) {
    const w = await askAsync(walkPrompt(text[set][i], MODS[i][0], MODS[i][1], persona, walks), 'sonnet');
    const ids = new Set(beats(text[set][i]).map((b) => b.id)); w.beats = (w.beats || []).filter((b) => ids.has(b.id));
    walks.push([MODS[i][1], w]);
  }
  const p = await askAsync(probePrompt(persona, walks), 'sonnet');
  const answer = String(p.answer || '');
  const js = await Promise.all([0, 1].map(() => askAsync(judgePrompt(answer), 'sonnet')));
  const link = (k) => js.filter((j) => j[k] === true).length / js.length;
  const links = { made: link('made'), checked: link('checked'), improved: link('improved') };
  const r = { key, set, persona: who, rep, slot: `${who}-r${rep}`, answer, links, score: Math.round(100 * (links.made + links.checked + links.improved) / 3),
    walks: walks.map(([lab, w]) => ({ module: lab, beats: w.beats, take_homes: w.take_homes, one_line: w.one_line })) };
  fs.appendFileSync(STUD, JSON.stringify(r) + '\n'); done.set(key, r);
  return r;
}

(async () => {
  const t0 = Date.now();
  const jobs = []; for (const s of Object.keys(SETS)) for (const p of PERSONAS) for (let r = 1; r <= REPS; r++) jobs.push([s, p, r]);
  const rows = (await pool(jobs, async ([s, p, r]) => { try { return await student(s, p, r); } catch (e) { console.error(`[chain] ${s} ${p} r${r}: ${e.message}`); return null; } }, JOBS)).filter(Boolean);
  const by = (s) => rows.filter((r) => r.set === s);
  const mean = (xs) => xs.length ? Math.round(xs.reduce((x, y) => x + y, 0) / xs.length) : null;
  const names = Object.keys(SETS); const base = names[0];
  const res = { question: Q, sets: {} };
  for (const s of names) {
    const xs = by(s);
    res.sets[s] = { n: xs.length, score: mean(xs.map((r) => r.score)), made: mean(xs.map((r) => 100 * r.links.made)), checked: mean(xs.map((r) => 100 * r.links.checked)), improved: mean(xs.map((r) => 100 * r.links.improved)) };
    if (s !== base) {
      const b = new Map(by(base).map((r) => [r.slot, r.score])); const d = xs.filter((r) => b.has(r.slot)).map((r) => r.score - b.get(r.slot));
      const m = d.reduce((x, y) => x + y, 0) / (d.length || 1); const sd = Math.sqrt(d.reduce((x, y) => x + (y - m) ** 2, 0) / Math.max(d.length - 1, 1));
      Object.assign(res.sets[s], { paired_n: d.length, gap: Math.round(m), se: Math.round(sd / Math.sqrt(d.length || 1)) });
    }
  }
  res.secs = Math.round((Date.now() - t0) / 1000);
  fs.writeFileSync(path.join(OUT, 'result.json'), JSON.stringify(res, null, 2));
  console.log(JSON.stringify(res, null, 2));
})();
