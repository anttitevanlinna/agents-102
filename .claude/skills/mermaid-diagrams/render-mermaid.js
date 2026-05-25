#!/usr/bin/env node
// Render committed Mermaid sources (.mmd) to committed vector diagrams (.svg)
// for curriculum docs. Vector in, vector out: crisp at any width, no raster
// resolution to pick, tiny files. Curriculum docs embed the .svg via a normal
// markdown image; the SPA serves it and the workbook inlines it as a data URI.
//
// Usage:
//   node .claude/skills/mermaid-diagrams/render-mermaid.js <dir-or-file.mmd> [...more]
//
// Each .mmd is rendered to a sibling .svg. A directory argument renders every
// .mmd it contains. Chrome path override: CHROME_BIN env var.
//
// Why htmlLabels:false: native <text> labels (no <foreignObject>), so the SVG
// renders correctly when loaded via <img> in every browser. Cost: no inline
// <i>/<b>/& in node labels — author labels in plain text + <br/> for breaks.
//
// Why headless Chrome (not mmdc): Mermaid needs a DOM; this repo has no
// puppeteer/mmdc dependency, and Chrome is already present on the build host.
// Mermaid is inlined into a self-contained harness, so no network or file
// access flags are needed at render time (only the one-time bundle download).

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const SKILL_DIR = __dirname;
const MERMAID_VERSION = '10.9.1';
const MERMAID = path.join(SKILL_DIR, 'vendor', 'mermaid.min.js');
const MERMAID_URL = `https://cdn.jsdelivr.net/npm/mermaid@${MERMAID_VERSION}/dist/mermaid.min.js`;
const CHROME = process.env.CHROME_BIN || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

function ensureMermaid() {
  if (fs.existsSync(MERMAID)) return;
  console.log(`Fetching mermaid@${MERMAID_VERSION} → vendor/ (one-time)…`);
  fs.mkdirSync(path.dirname(MERMAID), { recursive: true });
  execSync(`curl -fsSL "${MERMAID_URL}" -o "${MERMAID}"`, { stdio: 'inherit' });
}

function collectMmds(args) {
  const out = [];
  for (const a of args) {
    const abs = path.resolve(a);
    if (!fs.existsSync(abs)) { console.error(`skip (not found): ${a}`); continue; }
    if (fs.statSync(abs).isDirectory()) {
      fs.readdirSync(abs).filter(f => f.endsWith('.mmd')).sort()
        .forEach(f => out.push(path.join(abs, f)));
    } else if (abs.endsWith('.mmd')) {
      out.push(abs);
    } else {
      console.error(`skip (not .mmd): ${a}`);
    }
  }
  return out;
}

function harnessFor(mermaidPath, src) {
  // Load the bundle as an external file:// script rather than inlining it:
  // minified Mermaid contains a literal "</script>", which would close an
  // inline <script> early and leave the global half-defined.
  return `<!DOCTYPE html><html><head><meta charset="utf-8">
<script src="file://${mermaidPath}"></script></head>
<body><div id="out"></div>
<script>
mermaid.initialize({ startOnLoad:false, securityLevel:'loose', flowchart:{ htmlLabels:false, useMaxWidth:true } });
const src = ${JSON.stringify(src)};
mermaid.render('g', src)
  .then(function (r) { document.getElementById('out').innerHTML = r.svg; document.title = 'DONE'; })
  .catch(function (e) { document.title = 'ERR:' + e.message; });
</script></body></html>`;
}

function renderOne(mmdPath, scratch) {
  const src = fs.readFileSync(mmdPath, 'utf8');
  const harnessPath = path.join(scratch, path.basename(mmdPath) + '.html');
  fs.writeFileSync(harnessPath, harnessFor(MERMAID, src));

  const dump = execSync(
    `"${CHROME}" --headless=new --disable-gpu --no-sandbox --allow-file-access-from-files ` +
    `--virtual-time-budget=15000 --dump-dom "file://${harnessPath}"`,
    { maxBuffer: 128 * 1024 * 1024, stdio: ['ignore', 'pipe', 'ignore'] }
  ).toString();

  const m = dump.match(/<svg[\s\S]*?<\/svg>/);
  if (!m) {
    const title = (dump.match(/<title>([^<]*)<\/title>/) || [])[1] || '(no title)';
    throw new Error(`no <svg> rendered — harness title: ${title}`);
  }
  // Replace mermaid's responsive width/height/style (width="100%" +
  // max-width style) with explicit intrinsic dimensions from the viewBox. An
  // <img> needs a real intrinsic size: with only a viewBox it has none, so CSS
  // width:100% would blow a portrait diagram up to the full column. With
  // width/height set, the doc's CSS caps with max-width:100% + height:auto —
  // wide diagrams scale down to fit, narrow ones stay at natural size, neither
  // upscales. Aspect ratio is preserved by the default preserveAspectRatio.
  let svg = m[0]
    .replace(/(<svg[^>]*?)\swidth="[^"]*"/, '$1')
    .replace(/(<svg[^>]*?)\sheight="[^"]*"/, '$1')
    .replace(/(<svg[^>]*?)\sstyle="[^"]*"/, '$1');
  const vb = (svg.match(/viewBox="([^"]*)"/) || [])[1] || '';
  const dims = vb.split(/\s+/).map(Number);
  if (dims.length === 4) {
    const w = Math.round(dims[2]), h = Math.round(dims[3]);
    svg = svg.replace(/<svg /, `<svg width="${w}" height="${h}" `);
  }

  const outPath = mmdPath.replace(/\.mmd$/, '.svg');
  fs.writeFileSync(outPath, svg + '\n');
  return { outPath, kb: (svg.length / 1024).toFixed(1), vb: vb || '?' };
}

function main() {
  const args = process.argv.slice(2);
  if (!args.length) {
    console.error('Usage: node .claude/skills/mermaid-diagrams/render-mermaid.js <dir-or-file.mmd> [...]');
    process.exit(1);
  }
  ensureMermaid();
  const mmds = collectMmds(args);
  if (!mmds.length) { console.error('No .mmd files to render.'); process.exit(1); }

  const scratch = fs.mkdtempSync(path.join(SKILL_DIR, '.scratch-'));
  let failed = 0;
  try {
    for (const mmd of mmds) {
      try {
        const r = renderOne(mmd, scratch);
        console.log(`OK  ${path.basename(mmd)} → ${path.basename(r.outPath)}  (${r.kb}KB, viewBox=${r.vb})`);
      } catch (e) {
        failed++;
        console.error(`FAIL ${path.basename(mmd)}: ${e.message}`);
      }
    }
  } finally {
    fs.rmSync(scratch, { recursive: true, force: true });
  }
  process.exit(failed ? 1 : 0);
}

main();
