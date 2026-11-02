#!/usr/bin/env node
'use strict';
// probe.js — ask a simulated student the cold question, from their own notes only.
//
//   node probe.js --logs a.json,b.json,… --out answers.jsonl [--group v0]
// Input: persona-student experience logs (experience.js). The student gets their persona card and
// the words THEY wrote during the module (per-beat "got", take-homes, coffee-machine line). No page
// text, no quoted trigger sentences. Output lines feed score.js: {id, module, group, persona, answer}.
const fs = require('fs');
const path = require('path');
const { loadPersona } = require('../mechanical/persona-student/lib');
const { askAsync, pool, args } = require('./lib');

const a = args();
const Q = JSON.parse(fs.readFileSync(path.join(__dirname, 'targets.json'), 'utf8')).cold_question;
const PD = a['persona-dir'] || path.join(__dirname, '..', 'personas', 'agents-101');
const MODEL = a.model || process.env.PERSONA_MODEL || 'sonnet';
const files = a.logs.split(',').filter(Boolean);

(async () => {
  const rows = await pool(files, async (f) => {
    const l = JSON.parse(fs.readFileSync(f, 'utf8'));
    const notes = (l.beats || []).map((b) => b.got).filter((g) => g && !/^nothing new/i.test(g));
    const prompt = `${loadPersona(PD, l.persona).text}

---
You are this person. A few days ago you took the Agents 101 module "${l.module}". You do not have the
material any more. These are the notes you wrote while going through it, in your own words:
${notes.map((n) => `- ${n}`).join('\n') || '- (you wrote nothing down)'}
What you said you were taking home: ${(l.take_homes || []).join(' | ') || '(nothing)'}
What you said at the coffee machine: ${l.one_line || '(nothing)'}

Now: ${Q}
Answer as this person would, honestly, in one or two sentences. If nothing stuck, say so.
Answer with one json block: {"answer": "..."}`;
    let r;
    try { r = await askAsync(prompt, MODEL); } catch (e) { return { failed: f, error: String(e.message || e).slice(0, 200) }; }
    return { id: path.basename(f, '.json'), module: l.module, group: a.group || l.page_hash, persona: l.persona, page_hash: l.page_hash, answer: r.answer };
  });
  fs.mkdirSync(path.dirname(a.out), { recursive: true });
  const ok = rows.filter((r) => !r.failed), bad = rows.filter((r) => r.failed);
  if (ok.length) fs.appendFileSync(a.out, ok.map((r) => JSON.stringify(r)).join('\n') + '\n');
  console.log(`[probe] ${ok.length}/${rows.length} answers → ${a.out}`);
  // A missing student changes the persona mix and can move the number by itself: fail loudly.
  if (bad.length) { for (const b of bad) console.error(`[probe] FAILED ${b.failed}: ${b.error}`); process.exit(3); }
})();
