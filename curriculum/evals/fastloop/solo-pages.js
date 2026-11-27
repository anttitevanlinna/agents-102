#!/usr/bin/env node
'use strict';
// solo-pages.js — the open self-study handbook as a learner sees it, one text file per unit.
//
//   node solo-pages.js --site site/agents-101/index.html --out DIR
//
// Renders the built page in Chromium on the default runtime, so hidden runtime variants are left out and prompt
// bodies are in. Headings become "# " / "## " so persona-student beats() can split them; each prompt body sits
// between [PROMPT TO PASTE] and [END PROMPT].
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');
const { args } = require('../teaching/lib');

const UNITS = ['prework', 'getting-going', 'building-agent-systems', 'multi-agent-systems', 'security', 'output-quality', 'evaluations', 'agents-building-agents-solo'];

async function pages(site) {
  const b = await chromium.launch();
  try {
    const p = await b.newPage({ viewport: { width: 1280, height: 900 } });
    await p.goto('file://' + path.resolve(site)); await p.waitForTimeout(1000);
    return await p.evaluate((units) => {
      document.querySelectorAll('details').forEach((d) => { d.open = true; });
      const out = {};
      for (const id of units) {
        const m = document.getElementById(id); if (!m) continue;
        m.hidden = false; m.style.display = 'block';
        const vis = (e) => e.offsetParent !== null;
        for (const h of m.querySelectorAll('h1,h2,h3')) if (vis(h)) h.prepend(document.createTextNode(h.tagName === 'H1' ? '# ' : '## '));
        for (const pre of m.querySelectorAll('pre.prompt-block__pre')) if (vis(pre)) { pre.prepend(document.createTextNode('[PROMPT TO PASTE]\n')); pre.append(document.createTextNode('\n[END PROMPT]')); }
        out[id] = m.innerText.replace(/\n(PROMPT|→|Copy)\n/g, '\n').replace(/\n{3,}/g, '\n\n');
      }
      return out;
    }, UNITS);
  } finally { await b.close(); }
}
module.exports = { pages, UNITS };

if (require.main === module) (async () => {
  const a = args(); fs.mkdirSync(a.out, { recursive: true });
  const ps = await pages(a.site || 'site/agents-101/index.html');
  for (const [id, t] of Object.entries(ps)) fs.writeFileSync(path.join(a.out, id + '.md'), t);
  console.log(Object.entries(ps).map(([id, t]) => `${id} ${t.split(/\s+/).length}w`).join('\n'));
})();
