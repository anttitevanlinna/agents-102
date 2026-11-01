#!/usr/bin/env node
'use strict';
// author-answers.js — the persona writes the student replies a module's scenario needs,
// in its own voice, instead of the kit's canned text. Facts (file paths, what is in the
// corpus) come from the kit's canned answer, so the persona cannot invent paths that
// do not exist; the voice, priorities and omissions are the persona's.
//
//   node author-answers.js --persona-dir DIR --persona ID --module security \
//        --kit-answers DIR --page student-view.md --out DIR
// Copies every kit answer to --out, then overwrites the module's tokens.
const fs = require('fs');
const path = require('path');
const { loadPersona, askJson } = require('./lib');

const a = Object.fromEntries(process.argv.slice(2).reduce((acc, v, i, arr) =>
  (v.startsWith('--') ? acc.concat([[v.slice(2), arr[i + 1]]]) : acc), []));
const persona = loadPersona(a['persona-dir'], a.persona);
const mod = JSON.parse(fs.readFileSync(path.join(__dirname, 'modules', `${a.module}.json`), 'utf8'));
const page = fs.readFileSync(a.page, 'utf8');

fs.mkdirSync(a.out, { recursive: true });
for (const f of fs.readdirSync(a['kit-answers'])) fs.copyFileSync(path.join(a['kit-answers'], f), path.join(a.out, f));

const tokens = Object.entries(mod.answer_tokens).map(([file, when]) => {
  const facts = fs.readFileSync(path.join(a['kit-answers'], file), 'utf8');
  return `### ${file}\nWhen: ${when}\nGround-truth facts you may use (an example participant's reply; same company files, NOT your voice or priorities):\n<<<\n${facts}\n>>>`;
}).join('\n\n');

const prompt = `${persona.text}

---
You are this person, sitting in Agents 101, module "${mod.module}". The page you are working through:
<<<PAGE
${page}
PAGE>>>

Your company files and challenge are the Nordveil kit; play your kit_role inside that company.
Write the replies you would actually type at each of these moments. Use your chat voice and length.
Care about what YOU care about; skip or defer what you would not bother with. Only name files,
rules or numbers that appear in the ground-truth facts or on the page; never invent paths.
If you would ask for something to be done "properly" without specifying, say it that way.

${tokens}

Answer with one json block: {"<file>": "<your reply text>", ...} for every file above.`;

const out = askJson(prompt);
for (const file of Object.keys(mod.answer_tokens)) {
  if (!out[file]) throw new Error(`persona gave no reply for ${file}`);
  fs.writeFileSync(path.join(a.out, file), out[file].trim() + '\n');
}
fs.writeFileSync(path.join(a.out, '.persona.json'), JSON.stringify({ persona: persona.id, hash: persona.hash, module: mod.module }, null, 2));
console.log(`[author-answers] ${persona.id}@${persona.hash} → ${a.out}`);
