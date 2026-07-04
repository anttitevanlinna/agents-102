#!/usr/bin/env node
/*
 * Validate the prompt-registry artefact dependency graph for a training.
 *
 * The `requires:` / `produces:` frontmatter in curriculum/prompts/*.md is a
 * dependency graph: a prompt that `requires: X` must run AFTER the prompt that
 * `produces: X`. Nothing used to check this, so an artefact-ordering bug — a
 * prompt reading `./observations/` before the prompt that creates it — shipped
 * silently. This validator catches that class at build/commit time.
 *
 * What it does:
 *   1. Reconstructs the LINEAR prompt order for a training from the real flow:
 *      site/layouts/curriculum.js TRAININGS → prework + module files →
 *      exercise/lecture include links → `{{prompt:<key>}}` markers, in order.
 *   2. Indexes every `produces: <id>` to its position in that order.
 *   3. Flags, as errors:
 *      - DANGLING        requires: X with no producer anywhere (and X is not an
 *                        allowlisted external/student input).
 *      - PREMATURE       requires: X whose producer appears LATER than the
 *                        consumer (the bug class).
 *      - SOURCE-MODULE   requires sourced `module:*` where a producing PROMPT
 *                        exists — repoint to the prompt.
 *      - SOURCE-MISMATCH source `prompt:K` where K does not produce that id.
 *      - BODY-UNBACKED   the body reads a known artefact primitive
 *                        (./observations/, CLAUDE.local.md, …) with no backing
 *                        requires/produces/opportunistic-copy entry.
 *      - BODY-PREMATURE  a body-referenced artefact's producer is later.
 *      - OPP-NOT-OPTIONAL an opportunistic-copy artefact is read in the body
 *                        with no optionality signal (masquerades as a hard read).
 *      - CONFIG-STALE    a hardcoded BODY_PRIMITIVES id matches no frontmatter id
 *                        (the one graph reference requires/produces can't check —
 *                        it lives in this file; a rename that missed it would
 *                        silently mis-flag every body that reads the artefact).
 *
 * Usage:
 *   node scripts/validate-prompt-graph.js                       # AE101
 *   node scripts/validate-prompt-graph.js --training agents-101
 *   node scripts/validate-prompt-graph.js --json
 *
 * Exit code 1 on any error-severity finding (so it gates the build).
 *
 * Scope note: the canonical dependency edge is the consumer's `requires:`. The
 * producer's `consumed-by:` reverse index is a best-effort human reading aid —
 * deliberately NOT validated here (maintainer decision 2026-05-27), so it may
 * drift from the real `requires:` edges. Resolve dependencies from `requires:`.
 */

const fs = require('fs');
const path = require('path');
const { TRAININGS } = require('../site/layouts/curriculum.js');
const { loadRegistry } = require('./compile-prompts.js');

const ROOT = path.resolve(__dirname, '..');
const DEFAULT_TRAINING = 'agentic-engineering-101';
const INCLUDE_RE = /^\[([^\]]+)\]\(((?:exercises|lectures)\/[a-z0-9-]+)\.md\)[ \t]*$/gm;
// {{prompt:key}} and its cut-candidate sibling {{cut:key|reason}} are both
// references to `key` for graph purposes — a cut candidate is still on the
// student path and still consumes/produces its artefacts. Group 1 is the key;
// the optional `|reason` slug on a cut marker is captured-and-ignored here.
const PROMPT_MARKER_RE = /^\{\{(?:prompt|cut):([a-z0-9-]+)(?:\|[a-z0-9-]+)?\}\}[ \t]*$/gm;
const MAINTAINER_MARKER = '<!-- maintainer -->';

// A `requires.source` that points at one of these origins owes no producer —
// the artefact enters from outside the prompt graph (student types it, a
// curated skill is pre-installed at prework, an external tracker holds it).
const EXTERNAL_SOURCE_RE = /^(scrollback|student-input|external)\b/;

// Body-readable artefact primitives. If a prompt's body matches `regex`, the
// prompt must produce / require / opportunistically-copy `id`, else the read is
// unbacked. Regexes are path/primitive-shaped on purpose (not prose words) to
// avoid false positives on incidental mentions.
//
// `autoLoaded: true` marks an artefact that Claude Code pulls into context
// automatically once it exists (CLAUDE.local.md / CLAUDE.md). Those owe no
// explicit `requires:` — a bare body mention after the producer is fine; the
// ONLY failure mode is referencing one BEFORE its producer runs (premature).
// Explicitly-read artefacts (the observations folder) fail on both unbacked
// and premature.
const BODY_PRIMITIVES = [
  { id: 'observations-folder', label: '`./observations/` folder', regex: /(?:`|\b)\.?\/?observations\// },
  { id: 'claude-local-md', label: '`CLAUDE.local.md`', regex: /CLAUDE\.local\.md/, autoLoaded: true },
];

function argValue(name, fallback) {
  const i = process.argv.indexOf(name);
  return i === -1 ? fallback : process.argv[i + 1];
}

function hasArg(name) {
  return process.argv.includes(name);
}

function rel(file) {
  return path.relative(ROOT, file);
}

function stripMaintainer(md) {
  const i = md.indexOf(MAINTAINER_MARKER);
  return i === -1 ? md : md.slice(0, i);
}

function resolveInclude(href) {
  return path.join(ROOT, 'curriculum', `${href}.md`);
}

// Walk one file, emitting prompt keys in document order. Include links and
// `{{prompt:<key>}}` markers are interleaved by character index, and includes
// recurse, so the returned order matches what a student walks through.
function collectKeys(file, seen, out) {
  if (!fs.existsSync(file)) return;
  if (seen.has(file)) return;
  seen.add(file);
  const md = stripMaintainer(fs.readFileSync(file, 'utf8'));

  const events = [];
  let m;
  INCLUDE_RE.lastIndex = 0;
  while ((m = INCLUDE_RE.exec(md)) !== null) {
    events.push({ index: m.index, kind: 'include', href: m[2] });
  }
  PROMPT_MARKER_RE.lastIndex = 0;
  while ((m = PROMPT_MARKER_RE.exec(md)) !== null) {
    events.push({ index: m.index, kind: 'prompt', key: m[1] });
  }
  events.sort((a, b) => a.index - b.index);

  for (const ev of events) {
    if (ev.kind === 'prompt') {
      out.push({ key: ev.key, file });
    } else {
      collectKeys(resolveInclude(ev.href), seen, out);
    }
  }
}

function orderedKeys(trainingKey) {
  const training = TRAININGS[trainingKey];
  if (!training) throw new Error(`Training not found: ${trainingKey}`);
  const trainingDir = path.join(ROOT, 'curriculum', 'trainings', trainingKey);
  const out = [];
  const seen = new Set();

  if (training.prework) {
    collectKeys(path.join(trainingDir, `${training.prework.slug}.md`), seen, out);
  }
  for (const mod of training.modules) {
    collectKeys(path.join(trainingDir, `${mod.slug}.md`), seen, out);
  }
  return out;
}

function asArray(v) {
  if (v === undefined || v === null) return [];
  return Array.isArray(v) ? v : [v];
}

function optionalitySignalled(body) {
  return /\bif\s+(?:it\s+)?(?:exists|present)\b|\bif\s+present\b|\(if\b|\bif\s+absent\b|\bno-?op\b|\bwhen\s+present\b/i.test(body);
}

// Self-check on the validator's OWN config. Each BODY_PRIMITIVES entry keys a
// body-regex to a frontmatter artefact id. That id is the one graph reference
// the requires/produces machinery can't validate — it lives in this file, not
// in a prompt — so a rename that touches every prompt but misses this list (or
// the reverse) would silently mis-flag. Guard: every primitive id must appear
// as a real frontmatter id somewhere in the graph. `knownIds` is the set of all
// produces/requires/opportunistic-copy ids; returns the primitives that match
// none of them.
function findStalePrimitives(primitives, knownIds) {
  return primitives.filter((p) => !knownIds.has(p.id));
}

function validate(trainingKey) {
  const registry = loadRegistry();
  const ordered = orderedKeys(trainingKey);

  // First position of each key in the linear walk.
  const posByKey = new Map();
  ordered.forEach((entry, i) => {
    if (!posByKey.has(entry.key)) posByKey.set(entry.key, i);
  });

  // Producer index: artefact id → sorted list of {key, pos}.
  // Also collect every frontmatter id (produces / requires / opportunistic-copy)
  // so the validator can self-check its hardcoded BODY_PRIMITIVES config below.
  const producersById = new Map();
  const knownIds = new Set();
  for (const { key } of ordered) {
    const prompt = registry[key];
    if (!prompt) continue;
    const pos = posByKey.get(key);
    for (const p of asArray(prompt.produces)) {
      if (!p || !p.id) continue;
      knownIds.add(p.id);
      if (!producersById.has(p.id)) producersById.set(p.id, []);
      producersById.get(p.id).push({ key, pos });
    }
    for (const r of asArray(prompt.requires)) if (r && r.id) knownIds.add(r.id);
    for (const o of asArray(prompt['opportunistic-copy'])) if (o && o.id) knownIds.add(o.id);
  }
  for (const list of producersById.values()) list.sort((a, b) => a.pos - b.pos);

  function earliestProducer(id) {
    const list = producersById.get(id);
    return list && list.length ? list[0] : null;
  }

  const findings = [];
  const add = (severity, code, key, message) =>
    findings.push({ severity, code, key, message });

  // Validator config self-check (see findStalePrimitives): a hardcoded
  // body-primitive id that matches no frontmatter id means the config drifted
  // out from under a rename — the one reference the graph can't otherwise catch.
  for (const prim of findStalePrimitives(BODY_PRIMITIVES, knownIds)) {
    add('error', 'CONFIG-STALE', '(config)',
      `BODY_PRIMITIVES id '${prim.id}' (${prim.label}) matches no produces/requires/opportunistic-copy id in ${trainingKey} — validator config is stale (renamed without updating BODY_PRIMITIVES, or vice-versa)`);
  }

  const seenKeys = new Set();
  for (const { key } of ordered) {
    if (seenKeys.has(key)) continue;
    seenKeys.add(key);
    const prompt = registry[key];
    if (!prompt) {
      add('error', 'MISSING-PROMPT', key, `marker {{prompt:${key}}} has no registry entry curriculum/prompts/${key}.md`);
      continue;
    }
    const pos = posByKey.get(key);
    const body = prompt.text || '';

    const requiredHere = new Set();
    const oppHere = new Set();
    for (const o of asArray(prompt['opportunistic-copy'])) {
      if (o && o.id) oppHere.add(o.id);
    }
    const producedHere = new Set(asArray(prompt.produces).map((p) => p && p.id).filter(Boolean));

    // --- requires: checks ---
    for (const req of asArray(prompt.requires)) {
      if (!req || !req.id) continue;
      requiredHere.add(req.id);
      const source = String(req.source || '');

      if (EXTERNAL_SOURCE_RE.test(source)) continue; // enters from outside the graph

      const producer = earliestProducer(req.id);
      if (!producer) {
        add('error', 'DANGLING', key,
          `requires '${req.id}' (source: ${source || '—'}) but no prompt produces it anywhere in ${trainingKey}`);
        continue;
      }
      if (producer.pos > pos) {
        add('error', 'PREMATURE', key,
          `requires '${req.id}' at order #${pos}, but its producer '${producer.key}' runs LATER at #${producer.pos}`);
      }
      // source hygiene
      if (/^module:/.test(source)) {
        add('error', 'SOURCE-MODULE', key,
          `requires '${req.id}' is sourced '${source}', but a producing prompt exists ('${producer.key}') — repoint to source: prompt:${producer.key}`);
      } else if (/^prompt:/.test(source)) {
        const named = source.slice('prompt:'.length).trim();
        const namedProduces = asArray(registry[named] && registry[named].produces).some((p) => p && p.id === req.id);
        if (!namedProduces) {
          add('error', 'SOURCE-MISMATCH', key,
            `requires '${req.id}' is sourced 'prompt:${named}', but ${named} does not produce '${req.id}' (real producer: ${producer.key})`);
        }
      }
    }

    // --- opportunistic-copy: must signal optionality if read in body ---
    for (const o of asArray(prompt['opportunistic-copy'])) {
      if (!o || !o.id) continue;
      const prim = BODY_PRIMITIVES.find((p) => p.id === o.id);
      if (prim && prim.regex.test(body) && !optionalitySignalled(body)) {
        add('error', 'OPP-NOT-OPTIONAL', key,
          `opportunistic-copy '${o.id}' is read in the body but the body signals no optionality (if-present / no-op) — masquerades as a hard read`);
      }
    }

    // --- body-reference checks ---
    for (const prim of BODY_PRIMITIVES) {
      if (!prim.regex.test(body)) continue;
      if (producedHere.has(prim.id)) continue;     // this prompt is the producer
      if (oppHere.has(prim.id)) continue;          // optional copy — handled above
      if (requiredHere.has(prim.id)) continue;     // backed; order already checked above
      const producer = earliestProducer(prim.id);
      if (!producer) {
        // No producer at all. Auto-loaded files can legitimately have none in a
        // given training (born outside, or only conditionally) — skip. An
        // explicitly-read artefact with no producer is genuinely unbacked.
        if (!prim.autoLoaded) {
          add('error', 'BODY-UNBACKED', key,
            `body reads ${prim.label} but the prompt has no requires/produces/opportunistic-copy for '${prim.id}'`);
        }
        continue;
      }
      if (producer.pos > pos) {
        add('error', 'BODY-PREMATURE', key,
          `body reads ${prim.label} ('${prim.id}') at order #${pos}, but its producer '${producer.key}' runs LATER at #${producer.pos}`);
      } else if (!prim.autoLoaded) {
        // Auto-loaded artefacts after their producer need no explicit requires.
        add('error', 'BODY-UNBACKED', key,
          `body reads ${prim.label} ('${prim.id}', produced by ${producer.key}) with no backing requires entry`);
      }
    }
  }

  return { training: trainingKey, orderCount: ordered.length, findings, producersById };
}

function main() {
  const trainingKey = argValue('--training', DEFAULT_TRAINING);
  const result = validate(trainingKey);

  if (hasArg('--json')) {
    process.stdout.write(JSON.stringify({
      training: result.training,
      orderCount: result.orderCount,
      findings: result.findings,
    }, null, 2) + '\n');
  } else {
    const errors = result.findings.filter((f) => f.severity === 'error');
    const warns = result.findings.filter((f) => f.severity === 'warn');
    console.log(`Prompt graph validation — ${trainingKey} (${result.orderCount} prompts in linear order)`);
    if (result.findings.length === 0) {
      console.log('  ✓ no violations');
    } else {
      for (const f of result.findings) {
        console.log(`  [${f.severity.toUpperCase()}] ${f.code} ${f.key}: ${f.message}`);
      }
      console.log(`\n  ${errors.length} error(s), ${warns.length} warning(s)`);
    }
  }

  const hasError = result.findings.some((f) => f.severity === 'error');
  process.exit(hasError ? 1 : 0);
}

if (require.main === module) {
  main();
}

module.exports = { validate, orderedKeys, findStalePrimitives, BODY_PRIMITIVES };
