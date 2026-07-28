#!/usr/bin/env node
// Resolve a training's content flags in a markdown file, stdin → stdout.
//
// The workbook resolves flags on its way into HTML, but the content tarball
// ships raw markdown to the student's laptop. A marker left in place there is
// not an invisible build artefact: it is an HTML comment in a file the student
// opens, sitting between both branches of every flagged passage. The variant
// that drops a module would hand them the homework for it anyway, and the cut
// that runs it would hand them the apology for not running it.
//
//   node scripts/resolve-content-flags.js <training-key> < in.md > out.md
//
// The key is the training whose cut the tarball is FOR, so the flags resolve
// against the same modules list the workbook build reads.

const path = require('path');
const CR = require(path.join(__dirname, '..', 'site', 'layouts', 'curriculum.js'));

const key = process.argv[2];
const training = CR.TRAININGS[key];
if (!training) {
    console.error('resolve-content-flags: unknown training key: ' + key);
    process.exit(1);
}

const moduleSlugs = (training.modules || []).map(m => m.slug);

let md = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', chunk => { md += chunk; });
process.stdin.on('end', () => {
    // Throws on an unbalanced marker rather than shipping one — the same
    // contract the workbook build runs under.
    process.stdout.write(CR.applyContentFlags(md, training.flags, moduleSlugs));
});
