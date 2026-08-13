#!/usr/bin/env node
// render-variants.js — render one curriculum file under each content-flag cut
// and print the resulting section order plus a content fingerprint.
//
// Why: a module's body is not one document. Runtime flags (`<!--flag:module:X-->`)
// mean the shipped six-module arc and the three-module preview see different
// sections, and a section MOVE can silently break one while the other looks fine.
// Diff the fingerprints across an edit: identical char counts with a changed sha
// means content preserved and order changed, which is what a move should do.
// An identical sha means that cut did not move at all.
//
// Usage: node scripts/render-variants.js <path/to/module.md>
// Written 2026-08-13 to prove the `## Next`-goes-last move preserved both cuts.
// resulting section order plus a content fingerprint. Used to prove a
// section move preserves both the full arc and the preview cut.
const fs=require('fs'), path=require('path'), crypto=require('crypto');
const CR=require(path.resolve('site/layouts/curriculum.js'));
const file=process.argv[2];
const raw=fs.readFileSync(file,'utf8');
const body=CR.stripMaintainerTail(raw);
const FULL=['prework','getting-going','plan-mode-done-right','earn-the-trust','run-the-first-experiment','learn-from-the-test','spot-gaps-build-the-loop'];
const PREVIEW=['prework','getting-going','plan-mode-done-right'];
for (const [name,slugs] of [['FULL',FULL],['PREVIEW',PREVIEW]]) {
  const out=CR.applyContentFlags(body,{},slugs);
  const heads=out.split('\n').filter(l=>/^## /.test(l)).map(l=>l.replace(/^## /,''));
  const words=out.replace(/\s+/g,' ').trim();
  console.log(name, '| sections:', heads.join(' > '));
  console.log(name, '| chars:', words.length, 'sha:', crypto.createHash('sha256').update(words).digest('hex').slice(0,12));
}
