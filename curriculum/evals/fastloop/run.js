#!/usr/bin/env node
'use strict';
// run.js — one fast cycle: the same teaching measure as loop.sh (Big Idea stated cold), in minutes.
//
//   node run.js --module security --pages v0=a.md,c1=b.md,c2=c.md --out DIR [--base v0]
//        [--personas ingrid,cfo-sceptic,...] [--reps 2] [--max-reps 4] [--cycle tag] [--jobs 16]
//
// Same construct as the old measure, one third of the cost per student:
//   1. walk   the persona goes through the page beat by beat and writes ONE short note per beat
//             (<= 15 words: what they got, or "nothing new") + take-homes + coffee-machine line.
//             The old walk wrote six fields per beat (~3.5k tokens, 40 s); the probe only ever read
//             "got", take-homes and the coffee line. Attention per beat stays (1 word) for the brief.
//   2. probe  word for word the prompt of teaching/probe.js: cold question, notes only, no page.
//   3. score  teaching/score.js scoreOne: blind restatement x4, then match against all eight Big Ideas.
// Each student runs walk -> probe -> score on its own, so scoring finishes with the last student.
// Paired: every page is read by the same persona x rep slots; the gap to --base is the mean per-slot
// difference. --base is re-read fresh every cycle (--cycle is part of the cache key), so a lucky or
// unlucky baseline draw is never frozen. Sequential: after --reps per persona, versions whose gap is
// still in the unclear band get one more rep, up to --max-reps.
// Threshold and noise come from calibrate.js (README); never read a gap without its band.
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { loadPersona, beats } = require('../mechanical/persona-student/lib');
const { askAsync, pool, args } = require('../teaching/lib');
const { scoreOne } = require('../teaching/score');

const a = args();
const MOD = a.module;
const PAGES = Object.fromEntries(String(a.pages).split(',').map((s) => { const i = s.indexOf('='); return [s.slice(0, i), s.slice(i + 1)]; }));
const NAMES = Object.keys(PAGES); const BASE = a.base || NAMES[0];
const OUT = a.out; fs.mkdirSync(OUT, { recursive: true });
const PD = a['persona-dir'] || path.join(__dirname, '..', 'personas', 'agents-101');
const PERSONAS = String(a.personas || 'ingrid,cfo-sceptic,cto-builder,hr-svp,ops-director,veteran-director').split(/[ ,]+/);
const REPS = Number(a.reps || 2), MAXREPS = Number(a['max-reps'] || REPS);
const BAND = Number(a.band || process.env.FAST_BAND || 10); // gap that counts; set from calibration
const CYCLE = a.cycle || new Date().toISOString().slice(0, 16);
const MODEL = a.model || 'sonnet';
const Q = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'teaching', 'targets.json'), 'utf8')).cold_question;
const VERSION = crypto.createHash('sha256').update(fs.readFileSync(__filename, 'utf8')).digest('hex').slice(0, 8);
const STUD = path.join(OUT, 'students.jsonl');
const t0 = Date.now(); const secs = () => Math.round((Date.now() - t0) / 1000);
const sha = (s) => crypto.createHash('sha256').update(s).digest('hex').slice(0, 16);
const pageText = Object.fromEntries(NAMES.map((n) => [n, fs.readFileSync(PAGES[n], 'utf8')]));
const done = new Map(fs.existsSync(STUD) ? fs.readFileSync(STUD, 'utf8').split('\n').filter(Boolean).map((l) => { const r = JSON.parse(l); return [r.key, r]; }) : []);

function walkPrompt(page, persona) {
  const walk = beats(pageText[page]).map((b) => `=== BEAT ${b.id} ===\n## ${b.heading}\n${b.body.replace(/\{\{prompt:([\w-]+)\}\}/g, (_, k) => `[You paste prompt "${k}" into Claude and it works on it.]`)}`).join('\n\n');
  return `${persona.text}

---
You are this person, in the room for Agents 101, module "${MOD}". You go through the module below in order, one beat at a time, as a participant. You do the exercises. You do not know what the trainer intends you to learn.

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
// Word for word teaching/probe.js, so the cold answer is the old measure's cold answer.
function probePrompt(persona, l) {
  const notes = (l.beats || []).map((b) => b.got).filter((g) => g && !/^nothing new/i.test(g));
  return `${persona.text}

---
You are this person. A few days ago you took the Agents 101 module "${MOD}". You do not have the
material any more. These are the notes you wrote while going through it, in your own words:
${notes.map((n) => `- ${n}`).join('\n') || '- (you wrote nothing down)'}
What you said you were taking home: ${(l.take_homes || []).join(' | ') || '(nothing)'}
What you said at the coffee machine: ${l.one_line || '(nothing)'}

Now: ${Q}
Answer as this person would, honestly, in one or two sentences. If nothing stuck, say so.
Answer with one json block: {"answer": "..."}`;
}

async function student(page, who, rep) {
  const persona = loadPersona(PD, who);
  const key = sha([VERSION, CYCLE, MODEL, persona.hash, sha(pageText[page]), rep].join('|'));
  if (done.has(key)) return done.get(key);
  const s0 = Date.now();
  const l = await askAsync(walkPrompt(page, persona), MODEL);
  const ids = new Set(beats(pageText[page]).map((b) => b.id)); l.beats = (l.beats || []).filter((b) => ids.has(b.id));
  const p = await askAsync(probePrompt(persona, l), MODEL);
  const sc = await scoreOne({ id: `${page}-${who}-r${rep}`, module: MOD, answer: String(p.answer || '') });
  const r = { key, page, persona: who, rep, slot: `${who}-r${rep}`, beats: l.beats, take_homes: l.take_homes, one_line: l.one_line, answer: p.answer, claims: sc.claims, picks: sc.picks, score: sc.score, secs: Math.round((Date.now() - s0) / 1000) };
  fs.appendFileSync(STUD, JSON.stringify(r) + '\n'); done.set(key, r);
  return r;
}

function stats(rows) {
  const by = {}; for (const r of rows) (by[r.page] ||= {})[r.slot] = 100 * r.score;
  const res = {};
  for (const p of NAMES) {
    const xs = Object.values(by[p] || {});
    res[p] = { n: xs.length, stated: Math.round(xs.reduce((t, x) => t + x, 0) / (xs.length || 1)) };
    const per = {}; for (const r of rows.filter((x) => x.page === p)) (per[r.persona] ||= []).push(100 * r.score);
    res[p].by_persona = Object.fromEntries(Object.entries(per).map(([k, v]) => [k, Math.round(v.reduce((t, x) => t + x, 0) / v.length)]));
    if (p === BASE) continue;
    const d = Object.keys(by[p] || {}).filter((k) => k in (by[BASE] || {})).map((k) => by[p][k] - by[BASE][k]);
    if (d.length < 2) continue;
    const m = d.reduce((t, x) => t + x, 0) / d.length;
    const se = Math.sqrt(d.reduce((t, x) => t + (x - m) ** 2, 0) / (d.length - 1)) / Math.sqrt(d.length);
    Object.assign(res[p], { pairs: d.length, gap: Math.round(m), se: Math.round(se * 10) / 10 });
  }
  return res;
}
const call = (s) => (s.gap === undefined ? '' : s.gap >= BAND ? 'better' : s.gap <= -BAND ? 'worse' : Math.abs(s.gap) + 2 * s.se < BAND ? 'no real change' : 'unclear');

(async () => {
  const rows = [];
  const runReps = async (pages, reps) => {
    const jobs = []; for (const r of reps) for (const p of pages) for (const who of PERSONAS) jobs.push([p, who, r]);
    const got = await pool(jobs, async ([p, who, r]) => { try { return await student(p, who, r); } catch (e) { console.error(`[fast] FAILED ${p} ${who} r${r}: ${String(e.message || e).slice(0, 160)}`); return null; } }, Number(a.jobs || process.env.FAST_JOBS || 16));
    rows.push(...got.filter(Boolean));
    const s = stats(rows);
    console.error(`[fast] ${secs()}s: ` + NAMES.map((p) => `${p} ${s[p].stated} n=${s[p].n}${s[p].gap !== undefined ? ` [${s[p].gap >= 0 ? '+' : ''}${s[p].gap} ±${Math.round(2 * s[p].se)}]` : ''}`).join(' · '));
    return s;
  };
  let s = await runReps(NAMES, Array.from({ length: REPS }, (_, i) => i + 1));
  for (let rep = REPS + 1; rep <= MAXREPS; rep++) { // sequential: only the unclear versions (and the base they pair with) get another rep
    const unclear = NAMES.filter((p) => p !== BASE && call(s[p]) === 'unclear');
    if (!unclear.length) break;
    s = await runReps([BASE, ...unclear], [rep]);
  }
  s = stats(rows); const missing = NAMES.filter((p) => s[p].n < PERSONAS.length * REPS);
  const res = { module: MOD, cycle: CYCLE, secs: secs(), band: BAND, base: BASE, stats: s, incomplete: missing };
  fs.writeFileSync(path.join(OUT, 'result.json'), JSON.stringify(res, null, 2));
  const lines = [`Fast teaching check · ${MOD} · ${secs()} s · ${PERSONAS.length} personas x ${REPS}+ reps`, ''];
  for (const p of NAMES) lines.push(`${p.padEnd(14)} stated ${String(s[p].stated).padStart(3)}  n=${s[p].n}${p === BASE ? '  (base)' : `  gap ${s[p].gap >= 0 ? '+' : ''}${s[p].gap} ±${Math.round(2 * s[p].se)}  → ${call(s[p])}`}`);
  if (missing.length) lines.push('', `INCOMPLETE: ${missing.join(', ')} (rerun the same command; finished students are reused)`);
  console.log(lines.join('\n'));
  process.exitCode = missing.length ? 3 : 0;
})();
