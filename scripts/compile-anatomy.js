// Prompt-anatomy entries from
// curriculum/trainings/agentic-engineering-101/reference/prompt-anatomy.md,
// for the click-popup on a .prompt-anchor. build-workbook.js calls entries()
// when any prompt carries `anchors:`, inlines `window.__ANATOMY = …` and
// writes site/anatomy.json for the SPA.
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

function slugify(heading) {
    return heading
        .toLowerCase()
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
}

function entries() {
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
    return out;
}

module.exports = { entries };
