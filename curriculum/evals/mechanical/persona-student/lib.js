'use strict';
// Shared helpers for the persona-student instrument (see README.md).
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { spawnSync } = require('child_process');

const sha = (s) => crypto.createHash('sha256').update(s).digest('hex');

// Persona prompt = _shared.md + <id>.md, pinned by the hash of exactly that text.
function loadPersona(dir, id) {
  const text = fs.readFileSync(path.join(dir, '_shared.md'), 'utf8') + '\n\n' +
    fs.readFileSync(path.join(dir, `${id}.md`), 'utf8');
  return { id, text, hash: sha(text).slice(0, 16) };
}

// One headless Claude call. Prompt goes in on stdin; the reply's last ```json block is parsed.
function ask(prompt, { model = process.env.PERSONA_MODEL || 'sonnet', timeoutMs = 20 * 60e3 } = {}) {
  const r = spawnSync('claude', ['-p', '--model', model, '--output-format', 'text'], {
    input: prompt, encoding: 'utf8', timeout: timeoutMs, maxBuffer: 64 * 1024 * 1024,
  });
  if (r.status !== 0) throw new Error(`claude -p failed (${r.status}): ${(r.stderr || '').slice(0, 500)}`);
  return r.stdout;
}

function lastJson(text) {
  const blocks = [...text.matchAll(/```json\s*([\s\S]*?)```/g)];
  const raw = blocks.length ? blocks[blocks.length - 1][1] : text.slice(text.indexOf('{'), text.lastIndexOf('}') + 1);
  return JSON.parse(raw);
}

function askJson(prompt, opts, tries = 2) {
  let err;
  for (let i = 0; i < tries; i++) {
    const out = ask(prompt, opts);
    try { return lastJson(out); } catch (e) { err = e; }
  }
  throw err;
}

const slug = (s) => s.toLowerCase().replace(/[*_`]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// Split a student-view module into beats at # / ## headings. Beat id = "<file-title>/<heading>",
// stable across edits that do not rename the heading.
function beats(md) {
  const out = [];
  let top = 'module', cur = null;
  for (const line of md.split('\n')) {
    const h1 = line.match(/^# (.+)/), h2 = line.match(/^## (.+)/);
    if (h1 || h2) {
      if (h1) top = slug(h1[1]);
      cur = { id: h1 ? top : `${top}/${slug(h2[1])}`, heading: (h1 || h2)[1].trim(), body: [] };
      out.push(cur);
    } else if (cur) cur.body.push(line);
  }
  return out.map((b) => ({ ...b, body: b.body.join('\n').trim() })).filter((b) => b.body || b.id);
}

module.exports = { sha, loadPersona, ask, askJson, lastJson, beats, slug };
