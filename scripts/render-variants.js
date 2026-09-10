#!/usr/bin/env node
// render-variants.js — render one curriculum file under each shipped content-flag
// cut and print the resulting section order plus a content fingerprint.
//
// Why: a module's body is not one document. Runtime flags (`<!--flag:module:X-->`,
// `<!--flag:payload-->`) mean each customer cut sees different sections, and a
// section MOVE can silently break one while the others look fine. Diff the
// fingerprints across an edit: identical char counts with a changed sha means
// content preserved and order changed, which is what a move should do. An
// identical sha means that cut did not move at all.
//
// Usage: node scripts/render-variants.js <path/to/module.md>
// Written 2026-08-13 to prove the `## Next`-goes-last move preserved both cuts.
//
// THE CUT LIST IS DERIVED, NOT TYPED. It was typed once, and by 2026-09-10 the
// script modelled two cuts while `site/clients/acme/` held builds of four: its
// PREVIEW omitted `earn-the-trust`, which the real preview ships, and carried a
// `prework` slug no variant table lists — so it rendered one cut that ships and
// one that does not exist. The northwind team track (`flags: { payload: false }`)
// was modelled nowhere, and `{}` went in for flags on every call, so no
// payload-stripped cut could be rendered at all. A coverage tool covering the
// wrong set reads exactly like a coverage tool that passes, which is why the
// lists now come out of `TRAININGS` and a test pins that they keep doing so.
const fs = require('fs'), path = require('path'), crypto = require('crypto');
const CR = require(path.resolve(__dirname, '..', 'site/layouts/curriculum.js'));

// A file's training is its directory under curriculum/trainings/. Shared
// library files (curriculum/exercises, curriculum/lectures) name no training,
// so the caller has to say which one they mean.
function trainingOf(file) {
  const m = String(file).match(/curriculum\/trainings\/([^/]+)\//);
  return m ? m[1] : null;
}

// Every variant whose content comes from this training — the plain key plus any
// customer cut pointing at it through `contentKey`.
function variantsFor(file, training) {
  const key = training || trainingOf(file);
  if (!key) return [];
  return Object.entries(CR.TRAININGS)
    .filter(([name, cfg]) => (cfg.contentKey || name) === key)
    .map(([name, cfg]) => ({
      name,
      flags: cfg.flags || {},
      slugs: (cfg.modules || []).map(m => m.slug),
    }));
}

function renderVariant(body, { flags, slugs }) {
  return CR.applyContentFlags(body, flags || {}, slugs || []);
}

function main(argv) {
  const file = argv[2];
  if (!file) { process.stderr.write('Usage: render-variants.js <path/to/module.md>\n'); return 1; }
  const raw = fs.readFileSync(file, 'utf8');
  const body = CR.stripMaintainerTail(raw);
  const variants = variantsFor(file);
  if (!variants.length) {
    process.stderr.write(`no variant table for ${file} — is it under curriculum/trainings/<training>/?\n`);
    return 1;
  }
  for (const v of variants) {
    const out = renderVariant(body, v);
    const heads = out.split('\n').filter(l => /^## /.test(l)).map(l => l.replace(/^## /, ''));
    const words = out.replace(/\s+/g, ' ').trim();
    const flagged = Object.keys(v.flags).length ? ` flags:${JSON.stringify(v.flags)}` : '';
    console.log(v.name, '| sections:', heads.join(' > '));
    console.log(v.name, '| chars:', words.length,
      'sha:', crypto.createHash('sha256').update(words).digest('hex').slice(0, 12),
      `| modules:${v.slugs.length}${flagged}`);
  }
  return 0;
}

module.exports = { variantsFor, renderVariant, trainingOf };

if (require.main === module) process.exit(main(process.argv));
