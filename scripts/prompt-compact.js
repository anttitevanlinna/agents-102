#!/usr/bin/env node
'use strict';
// prompt-compact.js — draft compacted prompt bodies for maintainer approval.
//
// Never edits curriculum/prompts/: prompt bodies are gated (check_prompts §22).
// For each key: one claude -p call drafts a shorter body that keeps every
// behavioural instruction and forcing function; a second, independent call lists
// any instruction the draft lost. Drafts with losses, or with changed
// {{artifact:}} tokens / backticked paths, are rejected. Output: a JSON plan and
// a review page with BEFORE/AFTER per prompt.
//
// Usage:
//   node scripts/prompt-compact.js --keys keys.txt --out dir [--jobs 8]
//   node scripts/prompt-compact.js --apply dir/plan.json   (only after maintainer approval)

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const PROMPTS = path.join(ROOT, 'curriculum/prompts');
const RULES = fs.readFileSync(path.join(ROOT, 'curriculum/language/rewrite-rules.md'), 'utf8');

function split(md) {
  const m = md.match(/^(---\n[\s\S]*?\n---\n)([\s\S]*)$/);
  return m ? { head: m[1], body: m[2] } : { head: '', body: md };
}

function ask(text) {
  return new Promise(res => {
    const p = spawn('claude', ['-p', '--output-format', 'text'], { cwd: require('os').tmpdir() });
    let out = '';
    p.stdout.on('data', d => { out += d; });
    p.on('close', () => { const m = out.match(/\{[\s\S]*\}/); try { res(JSON.parse(m[0])); } catch { res(null); } });
    p.stdin.end(text);
  });
}

const draftPrompt = (key, body) => `You are compacting a prompt that students of Agents 101 (business professionals learning Claude Code) paste into Claude Code. The maintainer: "the information / word count is quite wordy still", and Claude Code plus these prompts is the main training experience. Make the prompt shorter and plainer for Claude to execute and for the student to scan.

KEEP every behavioural instruction, exactly in effect: files to read and write, paths, {{artifact:...}} tokens, what to produce and where, report shape and length, question pacing (one at a time), integrate-vs-append and overwrite instructions, cite-or-flag, "no plan or preamble" guards, "do not ask questions" guards, stop conditions, and any line that forces a harder or more specific answer than Claude would give by default (these look like rhetoric but are forcing functions). Keep the student's own voice markers like "tell me".
CUT: explanations of why that do not change what Claude does, restatements of the same instruction, decoration, hedges, and examples beyond the first when one example carries it.
Do not add instructions. Keep paragraph breaks between logical moves. No em-dashes.

Style rules from the maintainer, apply where they touch prompt prose:
${RULES}

Prompt ${key}:
<<<
${body}
>>>

Answer with JSON only: {"body":"<compacted prompt body>","why":"<one sentence on what was cut>"}. If nothing can be cut without losing an instruction, return the body unchanged.`;

const lossPrompt = (before, after) => `Compare two versions of a prompt for Claude Code. List every instruction, constraint, file path, output requirement or forcing function in ORIGINAL whose effect is missing or weakened in DRAFT. Ignore wording changes that keep the effect. Ignore removed explanations that do not change what Claude would do.

ORIGINAL:
<<<
${before}
>>>

DRAFT:
<<<
${after}
>>>

Answer with JSON only: {"lost":["<instruction>", ...]} (empty list if nothing is lost).`;

const tokens = s => [...s.matchAll(/\{\{[^}]+\}\}|`[^`]+`/g)].map(m => m[0]).sort().join('\n');
const words = s => s.split(/\s+/).filter(Boolean).length;

async function run(keys, jobs) {
  const out = []; let next = 0, done = 0;
  async function worker() {
    while (next < keys.length) {
      const key = keys[next++];
      const { body } = split(fs.readFileSync(path.join(PROMPTS, key + '.md'), 'utf8'));
      const row = { key, before: body, words_before: words(body) };
      const d = await ask(draftPrompt(key, body));
      if (!d || typeof d.body !== 'string') row.error = 'no draft';
      else {
        row.after = d.body.replace(/\s+$/, '') + '\n'; row.why = d.why; row.words_after = words(row.after);
        if (/—/.test(row.after) && !/—/.test(body)) row.error = 'em-dash';
        else if (tokens(row.after) !== tokens(body)) row.error = 'tokens or paths changed';
        else if (row.words_after >= row.words_before) row.error = 'not shorter';
        else {
          const l = await ask(lossPrompt(body, row.after));
          row.lost = l && Array.isArray(l.lost) ? l.lost : ['(check failed)'];
          if (row.lost.length) row.error = 'lost instructions';
        }
      }
      process.stderr.write(`${++done}/${keys.length} ${key}: ${row.error || `${row.words_before} -> ${row.words_after}`}\n`);
      out.push(row);
    }
  }
  await Promise.all(Array.from({ length: jobs }, worker));
  return out.sort((a, b) => keys.indexOf(a.key) - keys.indexOf(b.key));
}

function review(plan) {
  const ok = plan.filter(r => !r.error);
  const wb = ok.reduce((a, r) => a + r.words_before, 0), wa = ok.reduce((a, r) => a + r.words_after, 0);
  let md = `# Compacted prompt drafts (awaiting maintainer approval)\n\n${ok.length} of ${plan.length} prompts have a draft that keeps every instruction (checked by a second, independent read). Words in those: ${wb} -> ${wa}. Rejected: ${plan.length - ok.length} (left as they are).\n\n`;
  for (const r of ok) md += `## ${r.key} (${r.words_before} -> ${r.words_after} words)\n\n${r.why || ''}\n\n**Before**\n\n\`\`\`text\n${r.before.trim()}\n\`\`\`\n\n**After**\n\n\`\`\`text\n${r.after.trim()}\n\`\`\`\n\n`;
  md += `## Rejected\n\n` + plan.filter(r => r.error).map(r => `- ${r.key}: ${r.error}${r.lost && r.lost.length ? ' (' + r.lost.slice(0, 2).join('; ') + ')' : ''}`).join('\n') + '\n';
  return md;
}

function apply(plan) {
  for (const r of plan) {
    if (r.error) continue;
    const f = path.join(PROMPTS, r.key + '.md');
    const { head, body } = split(fs.readFileSync(f, 'utf8'));
    if (body !== r.before) { console.error('changed since draft: ' + r.key); continue; }
    fs.writeFileSync(f, head + r.after);
  }
}

if (require.main === module) {
  const argv = process.argv.slice(2);
  const val = (n, d) => { const i = argv.indexOf('--' + n); return i >= 0 ? argv[i + 1] : d; };
  if (val('apply')) apply(JSON.parse(fs.readFileSync(val('apply'), 'utf8')));
  else {
    const keys = fs.readFileSync(val('keys'), 'utf8').split('\n').map(s => s.trim()).filter(Boolean);
    const out = val('out'); fs.mkdirSync(out, { recursive: true });
    run(keys, Number(val('jobs', 8))).then(plan => {
      fs.writeFileSync(path.join(out, 'plan.json'), JSON.stringify(plan, null, 1) + '\n');
      fs.writeFileSync(path.join(out, 'review.md'), review(plan));
    });
  }
}
