#!/usr/bin/env node
// Print a training's skeleton in student order: module title, each `##` line, and for every
// linked lecture / exercise its title and `##` lines, indented, at the point the module links it.
// The squint test: the arc should read from this alone. Usage: node scripts/print-outline.js <training>
'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const CR = require(path.join(ROOT, 'site/layouts/curriculum.js'));

const key = process.argv[2] || 'agents-101';
const t = CR.TRAININGS[key];
if (!t) throw new Error(`Unknown training: ${key}. Known: ${Object.keys(CR.TRAININGS).join(', ')}`);
const contentKey = t.contentKey || key;

function body(file) {
  const src = fs.readFileSync(file, 'utf8');
  return src.split('<!-- maintainer -->')[0].split('\n');
}
function titleOf(lines) {
  const h = lines.find(l => /^# /.test(l));
  return h ? h.replace(/^# /, '') : '(untitled)';
}
function resolveLink(href) {
  const clean = href.replace(/^(\.\.\/)+/, '').replace(/#.*$/, '');
  const m = clean.match(/^(?:trainings\/[^/]+\/)?(lectures|exercises|supplementary|reference)\/([^/]+\.md)$/);
  if (!m) return null;
  const [, kind, slug] = m;
  const p = kind === 'lectures' || kind === 'exercises'
    ? path.join(ROOT, 'curriculum', kind, slug)
    : path.join(ROOT, 'curriculum/trainings', contentKey, kind, slug);
  return fs.existsSync(p) ? { kind, slug, p } : null;
}

const out = [];
const seen = new Set();
const files = [t.prework, ...t.modules].filter(Boolean);
files.forEach((m, i) => {
  const file = path.join(ROOT, 'curriculum/trainings', contentKey, m.slug + '.md');
  const lines = body(file);
  out.push(`\n# ${i === 0 && t.prework ? 'PREWORK' : 'M' + i} · ${titleOf(lines)}`);
  for (const line of lines) {
    const h2 = line.match(/^## (.+)/);
    if (h2) { out.push(`  ## ${h2[1]}`); continue; }
    const link = line.match(/^\[([^\]]+)\]\(([^)]+)\)/);
    if (!link) continue;
    const r = resolveLink(link[2]);
    if (!r || r.kind === 'supplementary' || r.kind === 'reference') { out.push(`  → ${link[1]}`); continue; }
    if (seen.has(r.p)) { out.push(`  → ${link[1]} (seen)`); continue; }
    seen.add(r.p);
    const sub = body(r.p);
    out.push(`  ${r.kind === 'lectures' ? 'LECTURE' : 'EXERCISE'} · ${titleOf(sub)}  [${r.kind}/${r.slug}]`);
    for (const l of sub) { const s = l.match(/^## (.+)/); if (s) out.push(`      ## ${s[1]}`); }
  }
});
process.stdout.write(out.join('\n') + '\n');
