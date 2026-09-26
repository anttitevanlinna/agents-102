const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const theoryCss = fs.readFileSync(path.join(ROOT, 'site/layouts/theory-handbook.css'), 'utf8');
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
