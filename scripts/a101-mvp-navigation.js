'use strict';

const fs = require('node:fs');
const path = require('node:path');

const ANCHOR = /^[a-z0-9][a-z0-9_-]*$/i;
const KEY = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function absoluteUrl(value, { fragment = true } = {}) {
  if (typeof value !== 'string' || /[\s\x00-\x1f<>`()[\]]/.test(value)) {
    throw new Error('Expected an absolute HTTP(S) workbook URL');
  }
  let url;
  try { url = new URL(value); } catch { throw new Error('Invalid workbook URL'); }
  if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password) {
    throw new Error('Expected an absolute HTTP(S) workbook URL without credentials');
  }
  if (fragment ? !ANCHOR.test(url.hash.slice(1)) : value.includes('#')) {
    throw new Error(fragment ? 'Invalid workbook URL anchor' : 'Workbook URL must omit its anchor');
  }
  return value;
}

function label(value) {
  if (typeof value !== 'string' || !value.trim() || /[\r\n\[\]<>`]/.test(value)) {
    throw new Error('Invalid next activity label');
  }
  return value;
}

function anchor(value) {
  if (typeof value !== 'string' || !ANCHOR.test(value.replace(/^#/, ''))) {
    throw new Error('Invalid checkpoint anchor');
  }
  return value.replace(/^#/, '');
}

// Keep the normal request first and the learner's trailing input hook last.
function injectCheckpoint(src, { currentUrl, nextUrl, nextLabel }) {
  if (typeof src !== 'string' || !src.trim()) throw new Error('Empty prompt source');
  absoluteUrl(currentUrl);
  absoluteUrl(nextUrl);
  label(nextLabel);
  const newline = src.includes('\r\n') ? '\r\n' : '\n';
  const frontmatter = src.match(/^---\r?\n[\s\S]*?\r?\n---(?:\r?\n|$)/);
  const prefix = frontmatter ? frontmatter[0] : '';
  const remaining = src.slice(prefix.length);
  const tailAt = remaining.indexOf('<!-- maintainer -->');
  const body = tailAt < 0 ? remaining : remaining.slice(0, tailAt);
  const tail = tailAt < 0 ? '' : remaining.slice(tailAt);
  const trimmed = body.trimEnd();
  if (!trimmed.trim()) throw new Error('Empty prompt body');

  const cue = [
    'When this request is complete, update `prework/learning-position.md` with these workbook links. Preserve any unfinished work and revision notes in that file.',
    `Current: ${currentUrl}`,
    `Next: ${nextUrl}`,
    '',
    `End your reply with [${nextLabel}](${nextUrl}). Keep working here if I ask for revisions. Wait for me to choose the next activity; do not start it automatically.`
  ].join(newline);

  let insertion = trimmed.length;
  // A final colon paragraph is the open hook for text pasted by the learner.
  if (/:[ \t]*$/.test(trimmed)) {
    const paragraphBreaks = [...trimmed.matchAll(/\r?\n[ \t]*\r?\n/g)];
    const lastBreak = paragraphBreaks.at(-1);
    insertion = lastBreak ? lastBreak.index + lastBreak[0].length : trimmed.lastIndexOf('\n') + 1;
    if (insertion === 0) throw new Error('Cannot insert navigation before a hook-only prompt');
  }
  const before = trimmed.slice(0, insertion).trimEnd();
  const after = trimmed.slice(insertion);
  return prefix + before + newline + newline + cue
    + (after ? newline + newline + after : '')
    + newline + (tail ? newline + tail : '');
}

function prospectiveRealPath(value) {
  let existing = path.resolve(value);
  const missing = [];
  while (!fs.existsSync(existing)) {
    missing.unshift(path.basename(existing));
    const parent = path.dirname(existing);
    if (parent === existing) throw new Error('Cannot resolve output directory');
    existing = parent;
  }
  return path.join(fs.realpathSync(existing), ...missing);
}

function within(parent, child) {
  const rel = path.relative(parent, child);
  return rel === '' || (!rel.startsWith('..' + path.sep) && rel !== '..' && !path.isAbsolute(rel));
}

function createNavigationOverlay({ root, overlayDir, workbookUrl, checkpoints }) {
  if (!root || !overlayDir) throw new Error('root and overlayDir are required');
  absoluteUrl(workbookUrl, { fragment: false });
  if (!Array.isArray(checkpoints)) throw new Error('checkpoints must be an array');
  const sourceDir = fs.realpathSync(path.join(root, 'curriculum', 'prompts'));
  const outputDir = path.resolve(overlayDir, 'prompts');
  const realOutput = prospectiveRealPath(outputDir);
  const realOverlay = prospectiveRealPath(overlayDir);
  if (within(sourceDir, realOutput) || !within(realOverlay, realOutput)) {
    throw new Error('Overlay prompts must be separate from canonical prompt sources');
  }
  const seen = new Set();
  // Validate the whole batch before creating or replacing any overlay files.
  const files = checkpoints.map(checkpoint => {
    const { key, currentAnchor, nextAnchor, nextLabel } = checkpoint;
    if (!KEY.test(key || '') || seen.has(key)) throw new Error('Invalid or duplicate prompt key');
    seen.add(key);
    const source = path.join(sourceDir, key + '.md');
    if (!fs.existsSync(source)) throw new Error(`Unknown prompt: ${key}`);
    const destination = path.join(outputDir, key + '.md');
    if (fs.existsSync(destination) && fs.lstatSync(destination).isSymbolicLink()) {
      throw new Error('Overlay prompt destination must not be a symlink');
    }
    const text = injectCheckpoint(fs.readFileSync(source, 'utf8'), {
      currentUrl: workbookUrl + '#' + anchor(currentAnchor),
      nextUrl: workbookUrl + '#' + anchor(nextAnchor),
      nextLabel
    });
    return { destination, text };
  });
  if (files.length) fs.mkdirSync(outputDir, { recursive: true });
  for (const { destination, text } of files) fs.writeFileSync(destination, text);
  return files.map(file => file.destination);
}

module.exports = { createNavigationOverlay, injectCheckpoint };
