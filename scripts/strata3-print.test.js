const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const article = fs.readFileSync(path.join(ROOT, 'site/article.html'), 'utf8');
const css = fs.readFileSync(path.join(ROOT, 'site/layouts/strata3.css'), 'utf8');

test('article exposes Strata 3 while reusing the Strata 2 document builder', () => {
  assert.match(article, /strata2\|strata3/);
  assert.match(article, /window\.__wpLayout === 'strata3' \? 'strata2' : window\.__wpLayout/);
});

test('Strata 3 keeps white A4 reading pages and concentrates phase colour at thresholds', () => {
  assert.match(css, /@import url\('\.\/strata2\.css'\);/);
  assert.match(css, /@page strata3-reading\s*\{[^}]*size:\s*A4;[^}]*background:\s*#fff;/s);
  assert.match(css, /\.phase-section\s*\{[^}]*page:\s*strata3-reading;/s);
  assert.match(css, /\.article-body h1\.phase-1[\s\S]*min-height:\s*236mm/);
  assert.match(css, /--phase-echo:/);
  assert.match(css, /\.essay-card blockquote\.thesis\s*\{[^}]*background:\s*var\(--phase-echo\)/s);
  assert.doesNotMatch(css, /@page\s+strata3-phase-/);
});
