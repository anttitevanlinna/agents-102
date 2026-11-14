#!/usr/bin/env node
'use strict';
// cycle.js — one loop-partner cycle for an editing session: evidence -> 3 candidate edits -> all measured.
//
//   node cycle.js --module agents-building-agents --page page.md --out DIR [--prev DIR] [--reps 2]
//
// 1. Evidence. Students read --page (run.js; skipped when --prev already measured this exact page).
// 2. Brief (one Sonnet call). Reads every student's per-beat notes, attention, take-homes and cold answer,
//    the scorer's claims, and the module's ledger of earlier edits with their measured effect. Writes:
//    what students took home instead (with counts and their own words), where the Big Idea is stated
//    but nobody wrote it down, where attention dropped, and THREE candidate edits by different routes:
//    state  (say the idea where students are listening), enact (make the student do it), demote (shrink
//    what outranks it, never deleting a real idea). Each edit = exact old text on the page -> new text.
// 3. Test. The three candidates and a fresh read of the page run as one paired batch (run.js). Result
//    per candidate: measured gap ± noise, slogan check, and which competing ideas fell. Ledger updated
//    with predicted vs measured, so the next brief does not repeat a move that failed.
// The session decides what to apply. Nothing here edits the course; student-facing changes keep their
// approval rules. Taste and story judges are not run here: guard.js says when they are owed.
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const crypto = require('crypto');
const { askAsync, args, targets } = require('../teaching/lib');
const { beats } = require('../mechanical/persona-student/lib');
const { slogan } = require('./guard');

const a = args();
const MOD = a.module; const OUT = a.out; fs.mkdirSync(OUT, { recursive: true });
const T = targets().modules; const BIG = T.find((t) => t.module === MOD).target;
const LEDGER = a.ledger || path.join(__dirname, 'ledger', `${MOD}.jsonl`); fs.mkdirSync(path.dirname(LEDGER), { recursive: true });
const page = fs.readFileSync(a.page, 'utf8');
const sha = (s) => crypto.createHash('sha256').update(s).digest('hex').slice(0, 12);
const t0 = Date.now(); const secs = () => Math.round((Date.now() - t0) / 1000); const timing = {};
const RUN = path.join(__dirname, 'run.js');
const run = (pages, out, cycle) => {
  const r = spawnSync('node', [RUN, '--module', MOD, '--pages', pages, '--out', out, '--cycle', cycle, '--reps', String(a.reps || 2), '--max-reps', String(a['max-reps'] || 3), ...(a.band ? ['--band', a.band] : [])], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'inherit'] });
  return { text: r.stdout, res: JSON.parse(fs.readFileSync(path.join(out, 'result.json'), 'utf8')), rows: fs.readFileSync(path.join(out, 'students.jsonl'), 'utf8').split('\n').filter(Boolean).map(JSON.parse) };
};

(async () => {
  // 1. Evidence: reuse the previous cycle's measurement of this exact page when there is one.
  let ev;
  const prevRows = a.prev && fs.existsSync(path.join(a.prev, 'test', 'students.jsonl')) ? fs.readFileSync(path.join(a.prev, 'test', 'students.jsonl'), 'utf8').split('\n').filter(Boolean).map(JSON.parse) : [];
  const prevPages = a.prev && fs.existsSync(path.join(a.prev, 'pages.json')) ? JSON.parse(fs.readFileSync(path.join(a.prev, 'pages.json'), 'utf8')) : {};
  const prevName = Object.keys(prevPages).find((k) => prevPages[k] === sha(page));
  if (prevName) ev = prevRows.filter((r) => r.page === prevName);
  else { fs.writeFileSync(path.join(OUT, 'base.md'), page); ev = run(`base=${path.join(OUT, 'base.md')}`, path.join(OUT, 'evidence'), `ev-${sha(page)}`).rows; }
  timing.evidence = secs();

  // 2. Brief.
  const bs = beats(page);
  const att = Object.fromEntries(bs.map((b) => [b.id, { skim: 0, out: 0 }]));
  for (const r of ev) for (const b of r.beats || []) if (att[b.id] && (b.att === 'skim' || b.att === 'out')) att[b.id][b.att]++;
  const ledger = fs.existsSync(LEDGER) ? fs.readFileSync(LEDGER, 'utf8').split('\n').filter(Boolean).map(JSON.parse).slice(-12) : [];
  const studentsTxt = ev.map((r) => `### ${r.persona} r${r.rep} · Big Idea score ${Math.round(100 * r.score)}
cold answer: ${r.answer}
take-homes: ${(r.take_homes || []).join(' | ')}
notes: ${(r.beats || []).map((b) => `[${b.id.split('/').pop()}${b.att && b.att !== 'in' ? ` ${b.att}` : ''}] ${b.got}`).join(' / ')}`).join('\n\n');
  const brief = await askAsync(`You help an editing session improve one module of a training for business leaders (Agents 101). The module's Big Idea, which students should leave able to state cold, is:
"${BIG}"

Below: the module page as students saw it, split into beats; then ${ev.length} simulated students (six personas) with the note each wrote per beat, their take-homes, their cold answer a few days later and how well it carried the Big Idea (0-100); then the ledger of earlier edits on this module with their measured effect.

=== PAGE ===
${bs.map((b) => `--- beat ${b.id} ---\n## ${b.heading}\n${b.body}`).join('\n\n')}

=== STUDENTS ===
${studentsTxt}

=== LEDGER (earlier edits: route, what changed, predicted, measured gap ± noise) ===
${ledger.map((l) => `- ${l.route} @ ${l.beat}: ${l.summary} | predicted ${l.predicted} | measured ${l.gap} ±${l.noise}${l.flags.length ? ' | flags ' + l.flags.join(',') : ''}`).join('\n') || '(none yet)'}

Work like a usability researcher reading think-aloud notes, then like an editor.
1. instead: the ideas students took home INSTEAD of the Big Idea. For each: the idea in plain words, how many students (k of n), two short verbatim quotes from their notes or answers, and the beat ids whose text produced it.
2. lost: beats where the page states or practises the Big Idea but few or no students wrote it down. Say why from the notes (attention, a competing point in the same beat, abstract wording, buried).
3. candidates: exactly three edits, one per route:
   - "state": put the Big Idea in words students will write down, where they are listening;
   - "enact": make the student do or see the Big Idea happen in an exercise step or its debrief;
   - "demote": shrink or subordinate what outranks the Big Idea, so it serves the Big Idea. Never delete a real idea the module needs; make it point at the Big Idea.
   Each edit is small (one to three sentences changed) and exact: "old" is a passage copied EXACTLY from the page (it must occur once), "new" replaces it. Write like the page: plain, concrete, no slogans, no repeating the Big Idea's wording, no em-dashes. Do not repeat a route+beat the ledger shows failed.
   Give each a one-line prediction ("+10: ..."), and a risk (what a reader might lose).
Answer with one json block:
{"instead":[{"idea","k","quotes":[..],"beats":[..]}],"lost":[{"beat","why"}],
 "candidates":[{"route":"state|enact|demote","beat","old","new","predicted","risk"}]}`, 'sonnet');
  timing.brief = secs() - timing.evidence;

  // 3. Apply candidates to copies of the page, then measure them with a fresh read of the page.
  const pages = { now: sha(page) }; const files = [`now=${path.join(OUT, 'now.md')}`]; fs.writeFileSync(path.join(OUT, 'now.md'), page);
  const cands = (brief.candidates || []).slice(0, 3).map((c, i) => ({ ...c, name: `c${i + 1}-${c.route}` }));
  for (const c of cands) {
    const n = page.split(c.old || '\u0000').length - 1;
    if (n !== 1) { c.error = `old text found ${n} times`; continue; }
    const text = page.replace(c.old, c.new); const f = path.join(OUT, `${c.name}.md`);
    fs.writeFileSync(f, text); pages[c.name] = sha(text); files.push(`${c.name}=${f}`);
    c.slogan = slogan(text, BIG) - slogan(page, BIG);
  }
  fs.writeFileSync(path.join(OUT, 'pages.json'), JSON.stringify(pages, null, 2));
  const tst = run(files.join(','), path.join(OUT, 'test'), `t-${sha(files.join())}`);
  timing.test = secs() - timing.evidence - timing.brief;
  const S = tst.res.stats; const noise = (p) => Math.round(2 * (S[p].se || 0));
  // Competing ideas: did a candidate win by suppressing a real idea? Share of take-homes still naming each.
  for (const c of cands.filter((x) => !x.error)) {
    c.gap = S[c.name].gap; c.noise = noise(c.name); c.stated = S[c.name].stated; c.by_persona = S[c.name].by_persona;
    c.call = c.gap >= tst.res.band ? 'better' : c.gap <= -tst.res.band ? 'worse' : Math.abs(c.gap) + c.noise < tst.res.band ? 'no real change' : 'unclear';
    c.flags = [...(c.slogan > 1 ? [`Big Idea wording +${c.slogan} sentences`] : [])];
    fs.appendFileSync(LEDGER, JSON.stringify({ at: new Date().toISOString(), page: sha(page), route: c.route, beat: c.beat, summary: `${(c.old || '').slice(0, 80)} -> ${(c.new || '').slice(0, 80)}`, predicted: c.predicted, gap: c.gap, noise: c.noise, flags: c.flags }) + '\n');
  }

  // Report: number first, then the candidates, then the evidence.
  const L = [];
  L.push(`# ${MOD}: cycle ${secs()} s (evidence ${timing.evidence} s${prevName ? ', reused' : ''} · brief ${timing.brief} s · test ${timing.test} s)`);
  L.push('', `**Big Idea stated now: ${S.now.stated}** (n=${S.now.n}, fresh read). Big Idea: ${BIG}`, '');
  L.push('| candidate | route | stated | gap | call | flags |', '|---|---|---|---|---|---|');
  for (const c of cands) L.push(c.error ? `| ${c.name} | ${c.route} | | | not applied: ${c.error} | |` : `| ${c.name} | ${c.route} | ${c.stated} | ${c.gap >= 0 ? '+' : ''}${c.gap} ±${c.noise} | **${c.call}** | ${c.flags.join('; ')} |`);
  for (const c of cands) {
    L.push('', `## ${c.name} (${c.beat})`, '', `Predicted: ${c.predicted}. Risk: ${c.risk}`, '', 'Before:', '', '> ' + String(c.old).split('\n').join('\n> '), '', 'After:', '', '> ' + String(c.new).split('\n').join('\n> '));
    if (c.by_persona) L.push('', `By persona: ${Object.entries(c.by_persona).map(([k, v]) => `${k} ${v} (now ${S.now.by_persona[k]})`).join(', ')}`);
  }
  L.push('', '## What students took home instead', '');
  for (const x of brief.instead || []) L.push(`- **${x.idea}** (${x.k}). ${(x.quotes || []).map((q) => `"${q}"`).join(' ')} · from ${(x.beats || []).join(', ')}`);
  L.push('', '## Where the Big Idea is on the page but nobody wrote it down', '');
  for (const x of brief.lost || []) L.push(`- ${x.beat}: ${x.why}`);
  const drops = Object.entries(att).filter(([, v]) => v.skim + v.out >= Math.ceil(ev.length / 3)).sort((p, q) => (q[1].skim + 2 * q[1].out) - (p[1].skim + 2 * p[1].out));
  L.push('', '## Attention drops', '', ...(drops.length ? drops.map(([id, v]) => `- ${id}: ${v.skim} skimmed, ${v.out} checked out of ${ev.length}`) : ['- none above a third of students']));
  fs.writeFileSync(path.join(OUT, 'brief.md'), L.join('\n') + '\n');
  fs.writeFileSync(path.join(OUT, 'cycle.json'), JSON.stringify({ module: MOD, secs: secs(), timing, now: S.now, candidates: cands, brief }, null, 2));
  console.log(L.slice(0, 8 + cands.length).join('\n'));
})();
