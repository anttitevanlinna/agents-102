#!/usr/bin/env node
'use strict';
// accuracy-pass.js — find sentences that are loose about how agents work, and fix them minimally.
//
// One claude -p call per file (student reading path of the given modules, maintainer
// block excluded) against curriculum/language/accuracy-brief.md. Each issue comes back
// as {quote, problem, fix, confidence}. --apply replaces the exact quote with the fix
// when the quote occurs once in the file and confidence is "high"; everything else is
// queued for a person.
//
//   node scripts/accuracy-pass.js --propose --modules a,b --out dir [--jobs 8]
//   node scripts/accuracy-pass.js --apply dir/issues.json

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const { moduleFiles } = require('./slide-rewrite.js');

const ROOT = path.resolve(__dirname, '..');
const CUR = path.join(ROOT, 'curriculum');
const BRIEF = fs.readFileSync(path.join(CUR, 'language/accuracy-brief.md'), 'utf8');

function studentText(file) {
  const md = fs.readFileSync(path.join(CUR, file), 'utf8');
  const i = md.indexOf('<!-- maintainer -->');
  return i < 0 ? md : md.slice(0, i);
}

const prompt = (file, text) => `You are checking a page of Agents 101, a hands-on training where business professionals build their own agents with Claude Code (or Codex, Copilot, Cowork). Find sentences that are inaccurate about how agents, LLMs and the runtimes really work, using this brief:

${BRIEF}

Only report real errors as the brief defines them, not style. For each, give the exact quote (one sentence, copied character for character from the page), the problem in one sentence, and a minimal fix: the corrected sentence, same length or shorter, same register, no em-dashes. Confidence "high" only when the brief settles it.
Do not report anything inside {{prompt:...}} markers, code fences, or runtime spans (<span class="rt-...">).

Page ${file}:
<<<
${text}
>>>

Answer with JSON only: {"issues":[{"quote":"...","problem":"...","fix":"...","confidence":"high|low"}]}`;

function ask(text) {
  return new Promise(res => {
    const p = spawn('claude', ['-p', '--output-format', 'text'], { cwd: require('os').tmpdir() });
    let out = '';
    p.stdout.on('data', d => { out += d; });
    p.on('close', () => { const m = out.match(/\{[\s\S]*\}/); try { res(JSON.parse(m[0])); } catch { res(null); } });
    p.stdin.end(text);
  });
}

async function propose(mods, jobs) {
  const files = [...new Set(mods.flatMap(m => moduleFiles(m).map(f => ({ m, f }))).map(x => JSON.stringify(x)))].map(s => JSON.parse(s));
  const out = []; let next = 0, done = 0;
  async function worker() {
    while (next < files.length) {
      const { m, f } = files[next++];
      const text = studentText(f);
      const ans = await ask(prompt(f, text));
      for (const is of (ans && ans.issues) || []) {
        const n = text.split(is.quote).length - 1;
        out.push({ module: m, file: f, ...is, found: n });
      }
      process.stderr.write(`${++done}/${files.length} ${f}: ${ans ? (ans.issues || []).length : 'no answer'}\n`);
    }
  }
  await Promise.all(Array.from({ length: jobs }, worker));
  return out;
}

function apply(issues) {
  const applied = [], queued = [];
  for (const is of issues) {
    const abs = path.join(CUR, is.file);
    const md = fs.readFileSync(abs, 'utf8');
    const cut = md.indexOf('<!-- maintainer -->');
    const body = cut < 0 ? md : md.slice(0, cut);
    if (is.confidence !== 'high' || body.split(is.quote).length !== 2 || /—/.test(is.fix) || !is.fix) { queued.push(is); continue; }
    fs.writeFileSync(abs, body.replace(is.quote, is.fix) + (cut < 0 ? '' : md.slice(cut)));
    applied.push(is);
  }
  return { applied, queued };
}

module.exports = { propose, apply };

if (require.main === module) {
  const argv = process.argv.slice(2);
  const val = (n, d) => { const i = argv.indexOf('--' + n); return i >= 0 ? argv[i + 1] : d; };
  if (argv.includes('--propose')) {
    const out = val('out'); fs.mkdirSync(out, { recursive: true });
    propose(val('modules').split(','), Number(val('jobs', 8))).then(r => fs.writeFileSync(path.join(out, 'issues.json'), JSON.stringify(r, null, 1) + '\n'));
  } else if (val('apply')) {
    const r = apply(JSON.parse(fs.readFileSync(val('apply'), 'utf8')));
    fs.writeFileSync(val('apply').replace(/\.json$/, '.result.json'), JSON.stringify(r, null, 1) + '\n');
    console.log(`applied ${r.applied.length}, queued ${r.queued.length}`);
  } else { console.error('usage: --propose --modules a,b --out dir | --apply issues.json'); process.exit(2); }
}
