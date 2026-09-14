const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const theoryCss = fs.readFileSync(path.join(ROOT, 'site/layouts/theory-handbook.css'), 'utf8');
const strataCss = fs.readFileSync(path.join(ROOT, 'site/layouts/strata2.css'), 'utf8');
const strataJs = fs.readFileSync(path.join(ROOT, 'site/layouts/strata2.js'), 'utf8');
const sharedCurriculumCss = fs.readFileSync(path.join(ROOT, 'site/layouts/curriculum.css'), 'utf8');
const studentPrintCss = fs.readFileSync(path.join(ROOT, 'site/layouts/student-handbook-print.css'), 'utf8');

test('theory handbook gives sustained prose a Charter reading face', () => {
  assert.match(theoryCss, /--font-reading:\s*Charter,\s*'Bitstream Charter',\s*Georgia,\s*serif;/);
  assert.match(
    theoryCss,
    /body\.theory-handbook \.module p,\s*body\.theory-handbook \.module li\s*\{[^}]*font-family:\s*var\(--font-reading\);[^}]*line-height:\s*1\.66;/s,
  );
  assert.match(
    theoryCss,
    /@media print\s*\{[\s\S]*body\.theory-handbook \.module p,\s*body\.theory-handbook \.module li\s*\{[^}]*font-size:\s*10\.5pt;[^}]*line-height:\s*1\.66;/,
  );
  assert.match(
    theoryCss,
    /body\.theory-handbook \.module p,\s*body\.theory-handbook \.module ul,\s*body\.theory-handbook \.module ol\s*\{[^}]*max-width:\s*38em;/s,
  );
});

test('theory reading face cannot leak into the shared student-handbook styles', () => {
  assert.doesNotMatch(sharedCurriculumCss, /--font-reading|Bitstream Charter/);
  assert.doesNotMatch(studentPrintCss, /--font-reading|Bitstream Charter/);

  const readingFaceSelectors = Array.from(
    theoryCss.matchAll(/([^{}]+)\{[^{}]*font-family:\s*var\(--font-reading\)/g),
    (match) => match[1].trim(),
  );
  assert.ok(readingFaceSelectors.length > 0, 'expected at least one reading-face selector');
  readingFaceSelectors.forEach((selector) => {
    selector.split(',').forEach((part) => {
      assert.match(part.trim(), /^body\.theory-handbook\b/);
    });
  });
});

test('Strata print cover uses the compiled sea-passage figure and the new cover hierarchy', () => {
  assert.match(strataJs, /figures\[['"]session-sea-passage['"]\]/);
  assert.match(strataJs, /class="print-cover-brand"/);
  assert.match(strataJs, /class="print-cover-path"/);
  assert.match(strataJs, /class="print-cover-kicker"/);
  assert.match(strataJs, /class="print-cover-meta"/);
  assert.doesNotMatch(strataJs, /class="print-cover-phase-bar"/);

  assert.match(strataCss, /\.print-cover-path\s*\{/);
  assert.match(strataCss, /\.print-cover-path \[stroke="#2f6b6b"\]/);
  assert.match(strataCss, /\.print-cover-title\s*\{[^}]*font-family:\s*Inter,[^}]*text-transform:\s*uppercase;/s);
  assert.match(strataCss, /@page\s*\{[^}]*size:\s*A4;[^}]*\}/);
  assert.match(strataCss, /\.print-cover\s*\{[^}]*background:\s*#ffffff\s*!important;/s);
});

test('Strata print assigns neutral and phase-tinted A4 page stocks', () => {
  assert.match(strataCss, /@page\s*\{[^}]*size:\s*A4;[^}]*\}/);
  assert.match(strataCss, /\.print-cover\s*\{[^}]*page:\s*strata-cover;/s);
  assert.match(strataCss, /\.print-toc\s*\{[^}]*page:\s*strata-contents;/s);

  const pageStocks = [
    ['strata-phase-1', '#f2f4f6'],
    ['strata-phase-2', '#f7f4ee'],
    ['strata-phase-3', '#f6f2f2'],
    ['strata-phase-4', '#f7f4ef'],
  ];

  pageStocks.forEach(([pageName, color]) => {
    assert.match(
      strataCss,
      new RegExp(`@page\\s+${pageName}\\s*\\{[^}]*background:\\s*${color}`, 's'),
    );
  });

  assert.match(strataCss, /\.phase-section\.strata-1\s*\{[^}]*page:\s*strata-phase-1;/s);
  assert.match(strataCss, /\.phase-section\.strata-2\s*\{[^}]*page:\s*strata-phase-2;/s);
  assert.match(strataCss, /\.phase-section\.strata-3\s*\{[^}]*page:\s*strata-phase-3;/s);
  assert.match(strataCss, /\.phase-section\.strata-4\s*\{[^}]*page:\s*strata-phase-4;/s);
  assert.doesNotMatch(
    strataCss,
    /\.phase-section\.strata-1,[\s\S]*\.phase-section\.strata-4\s*\{\s*background:\s*#ffffff\s*!important;/,
  );
  assert.match(
    strataCss,
    /\.phase-section\.strata-4::after\s*\{[^}]*content:\s*"bosser\.consulting";/s,
  );
  assert.match(strataCss, /\.article-body::after\s*\{[^}]*content:\s*none;/s);
  assert.match(
    strataCss,
    /body\.light-article,[\s\S]*body\.light-article \.article-body\s*\{[^}]*background:\s*transparent\s*!important;/s,
  );
});

test('Strata print gives the essay layer a Baskerville reading voice without changing screen type', () => {
  assert.match(
    strataCss,
    /body\.light-article \.article-body\s*\{[^}]*font-family:\s*Charter,\s*'Bitstream Charter',\s*Georgia,\s*serif;/s,
  );
  assert.match(
    strataCss,
    /@media print\s*\{[\s\S]*body\.light-article \.article-body\s*\{[^}]*font-family:\s*Baskerville,\s*'Times New Roman',\s*Times,\s*serif;/,
  );
  assert.match(
    strataCss,
    /@media print\s*\{[\s\S]*\.print-toc-entry\s*\{[^}]*font-family:\s*Baskerville,\s*'Times New Roman',\s*Times,\s*serif;/,
  );
});
