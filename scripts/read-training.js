'use strict';
// read-training.js — print a whole training the way a student reads it, in
// order: each module body with its standalone lecture/exercise includes
// inlined in place (slide files inlined too), maintainer tails and backing
// blocks stripped. Prompt markers stay as `{{prompt:<key>}}` so trainings with
// and without prompt bodies compare like for like. Judge input for full-
// training story benchmarks (curriculum/evals/story-depth.md).
//   node scripts/read-training.js <training-key> [--modules a,b]
const fs = require('fs');
const path = require('path');
const CR = require('../site/layouts/curriculum.js');
const { readCurriculumMd } = require('./read-curriculum.js');

const ROOT = path.resolve(__dirname, '..');
const CUR = path.join(ROOT, 'curriculum');

function studentText(absPath) {
  let t = readCurriculumMd(absPath);
  const i = t.indexOf('<!-- maintainer -->');
  if (i >= 0) t = t.slice(0, i);
  return t.replace(/<!-- backing[\s\S]*?<!-- \/backing -->/g, '').replace(/\n{3,}/g, '\n\n').trimEnd();
}

function readTraining(key, only) {
  const tr = CR.TRAININGS[key];
  if (!tr) throw new Error(`unknown training: ${key}`);
  const out = [];
  for (const m of tr.modules) {
    const slug = typeof m === 'string' ? m : m.slug;
    if (only && !only.includes(slug)) continue;
    const modPath = path.join(CUR, 'trainings', key, slug + '.md');
    out.push(`\n=== MODULE ${slug}\n`);
    for (const line of studentText(modPath).split('\n')) {
      const inc = line.match(/^\[[^\]]*\]\(((?:lectures|exercises)\/[^)#]+\.md)\)\s*$/);
      const f = inc && path.join(CUR, inc[1]);
      if (f && fs.existsSync(f)) out.push(`\n--- ${inc[1]}\n`, studentText(f), `\n--- end ${inc[1]}\n`);
      else out.push(line);
    }
  }
  return out.join('\n') + '\n';
}

module.exports = { readTraining };

if (require.main === module) {
  const [key, flag, val] = process.argv.slice(2);
  if (!key) { console.error('usage: read-training.js <training-key> [--modules a,b]'); process.exit(2); }
  process.stdout.write(readTraining(key, flag === '--modules' ? val.split(',') : null));
}
