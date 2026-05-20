#!/usr/bin/env node
// Compile curriculum/trainings/agentic-engineering-101/reference/prompt-anatomy.md
// → site/anatomy.json. The SPA fetches the JSON on boot to populate the
// click-popup that surfaces each entry when a student clicks an underlined
// .prompt-anchor in a rendered prompt body. Built workbook reads the same
// JSON at build time and inlines it as a <script>window.__ANATOMY = …</script>
// block so offline HTMLs work without a fetch.
//
// Source file shape:
//   ### Move name
//
//   <body markdown — bold lead-in, plain prose, italic quote>
//
//   ### Next move
//   …
//
// Each `### Heading` becomes one anatomy entry keyed by kebab-slug of the
// heading text. Body is rendered to HTML with marked.

const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'curriculum/trainings/agentic-engineering-101/reference/prompt-anatomy.md');
const OUT = path.join(ROOT, 'site/anatomy.json');

function slugify(heading) {
    return heading
        .toLowerCase()
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
}

function compile() {
    if (!fs.existsSync(SRC)) {
        console.error('Source not found: ' + SRC);
        process.exit(1);
    }
    const raw = fs.readFileSync(SRC, 'utf8');

    // Strip maintainer tail if present so author-only notes don't ship.
    const mIdx = raw.indexOf('<!-- maintainer -->');
    const body = mIdx >= 0 ? raw.slice(0, mIdx) : raw;

    // Split on H3 boundaries. Capture heading + body until next H3 or H2 or
    // horizontal rule (which separates family sections in the source).
    const re = /^### +(.+?)\s*$([\s\S]*?)(?=^### |^## |^---\s*$)/gm;
    const out = {};
    let m;
    while ((m = re.exec(body)) !== null) {
        const heading = m[1].trim();
        const slug = slugify(heading);
        const entryBody = m[2].trim();
        if (!slug || !entryBody) continue;
        out[slug] = {
            title: heading,
            html: marked.parse(entryBody)
        };
    }

    fs.mkdirSync(path.dirname(OUT), { recursive: true });
    fs.writeFileSync(OUT, JSON.stringify(out, null, 2) + '\n');
    const count = Object.keys(out).length;
    console.log(`Compiled ${count} anatomy entries to ${path.relative(ROOT, OUT)}`);
}

if (require.main === module) compile();

module.exports = { compile };
