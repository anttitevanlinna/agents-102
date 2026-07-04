#!/usr/bin/env node
/*
 * Mechanical lint of prompt BODIES — the text students paste — read straight
 * from the registry (curriculum/prompts/*.md), post-migration source of truth.
 *
 * Companion to the existing checkers, deliberately registry-native:
 *   - lint-prompts.js          marker resolution + orphan registry entries
 *   - validate-prompt-graph.js requires/produces ordering
 *   - prompt-source-audit.sh   /tmp-parsed fenced prompts + exercise body (P/E)
 *   - THIS                     check_prompts body rules that are grep-decidable,
 *                              on the registry source itself, all prompts, gated.
 *
 * It extends the P-checks in prompt-source-audit.sh (which cover §1/§4/§9)
 * onto the registry and adds the grep-decidable ORPHAN rules that no standing
 * checker fired: §28 (label leak), §31 (nested fence / marker-in-body), §24
 * (machine-absolute path). The judgment rules stay with the LLM judges.
 *
 * Rules checked (check_prompts.md):
 *   §1  placeholder in fence        Sev-1  [BRACKETS] / [your task] shapes
 *   §4  skill invoked by path       Sev-1  "invoke … ~/.claude/skills/…" (authoring/reading a file is legit)
 *   §9  markdown shout in fence      Sev-2  **bold** / *italic* (renders literal when pasted)
 *   §24 machine-absolute path        Sev-2  /Users/… leaks one machine into the paste
 *   §28 prompt label leak            Sev-1  body contains **Prompt (expander reconstructs it)
 *   §31 nested fence / marker        Sev-1  ``` or {{prompt:}} inside a registry body
 *   (§32 retired 2026-05-31 — module numbers in prompt prose ground, don't leak)
 *
 * Severity: Sev-1 breaks a cold paste or the render → exit 1. Sev-2 degrades → exit 0, reported.
 *
 * Usage:
 *   node scripts/lint-prompt-bodies.js                       # ALL registry prompts (default)
 *   node scripts/lint-prompt-bodies.js --training agentic-engineering-101
 *   node scripts/lint-prompt-bodies.js --json
 */

const path = require('path');
const { loadRegistry } = require('./compile-prompts.js');
const { orderedKeys } = require('./build-prompt-audit-context.js');

const ROOT = path.resolve(__dirname, '..');

function argValue(name, fallback) {
  const i = process.argv.indexOf(name);
  return i === -1 ? fallback : process.argv[i + 1];
}
function hasArg(name) {
  return process.argv.includes(name);
}

// Strip [text](url) markdown links so their bracket isn't read as a placeholder.
function stripLinks(s) {
  return s.replace(/\[[^\]]+\]\([^)]+\)/g, '');
}
// Strip `inline code` spans — paths, globs, branch names live here and are exempt.
function stripBackticks(s) {
  return s.replace(/`[^`]*`/g, '');
}

// firstHit: returns {line, lineNo} of the first matching line, or null.
function firstHit(body, re) {
  const lines = body.split('\n');
  for (let i = 0; i < lines.length; i++) {
    re.lastIndex = 0;
    if (re.test(lines[i])) return { line: lines[i].trim().slice(0, 120), lineNo: i + 1 };
  }
  return null;
}

function lintBody(key, body) {
  const findings = [];
  const add = (sev, rule, detail) => findings.push({ key, sev, rule, detail });

  // §1 — bracketed placeholders. Uppercase token (≥3 chars) or known lead-words.
  const noLinks = stripLinks(body);
  const upperPh = firstHit(noLinks, /\[[A-Z][A-Z0-9_]{2,}\]/);
  if (upperPh) add('Sev-1', '§1', `placeholder ${upperPh.line} (line ${upperPh.lineNo})`);
  const wordPh = firstHit(noLinks, /\[(your|the |path|insert|e\.g\.|feature|task name|filename|bug|repo|branch name)[^\]]*\]/i);
  if (wordPh && !upperPh) add('Sev-1', '§1', `placeholder ${wordPh.line} (line ${wordPh.lineNo})`);

  // §4 — skill INVOKED by path (the violation). Authoring a skill file, reading
  // one, or referencing where it lives is all legitimate (rule 4 only governs the
  // invocation shape: "invoke the `name` skill", never a path) — so emit only on
  // a genuine invoke-by-path, and carve out install-workflow prompts that
  // legitimately name content/skills/ (source) and ~/.claude/skills/ (dest).
  const isInstall = /\b(install|tarball|extract|\.tar\.gz)\b/i.test(body) && /\bskill/i.test(body);
  if (!isInstall) {
    for (const l of body.split('\n')) {
      if (/~\/\.claude\/projects\//.test(l)) continue; // transcript-path convention, exempt
      const invokedByPath = /\b(invoke|dispatch|call|run|load)\b[^.]*(~?\/?\.?\.claude\/skills\/|content\/skills\/)/i.test(l);
      if (invokedByPath) add('Sev-1', '§4', `skill invoked by path: ${l.trim().slice(0, 120)}`);
    }
  }

  // §9 — markdown shout inside the fence (renders literal asterisks when pasted).
  const noTicks = stripBackticks(body);
  const bold = firstHit(noTicks, /\*\*[^*]+\*\*/);
  if (bold) add('Sev-2', '§9', `markdown bold: ${bold.line} (line ${bold.lineNo})`);
  const italic = firstHit(noTicks, /(^|[^*])\*[^*\s][^*]*\*([^*]|$)/);
  if (italic && !bold) add('Sev-2', '§9', `markdown italic: ${italic.line} (line ${italic.lineNo})`);

  // §24 — machine-absolute path leaks one machine into a paste meant to be portable.
  const absPath = firstHit(body, /\/Users\/[a-z]/i);
  if (absPath) add('Sev-2', '§24', `machine-absolute path: ${absPath.line} (line ${absPath.lineNo})`);

  // §28 — the prompt label is reconstructed by the expander from frontmatter;
  // a literal **Prompt in the body is a leak that double-renders the label.
  const labelLeak = firstHit(body, /\*\*Prompt/);
  if (labelLeak) add('Sev-1', '§28', `label leak in body: ${labelLeak.line} (line ${labelLeak.lineNo})`);

  // §31 — a registry body is itself the fenced prompt. A triple-backtick fence
  // would break the outer fence on expand; a {{prompt:}} marker means the body is
  // referencing the registry instead of being it.
  if (/```/.test(body)) {
    const f = firstHit(body, /```/);
    add('Sev-1', '§31', `nested triple-backtick fence (breaks expand): line ${f.lineNo}`);
  }
  const nestedMarker = firstHit(body, /\{\{(?:prompt|cut):[a-z0-9-]+(?:\|[a-z0-9-]+)?\}\}/);
  if (nestedMarker) add('Sev-1', '§31', `{{prompt:}}/{{cut:}} marker inside a registry body: line ${nestedMarker.lineNo}`);

  // §32 — RETIRED 2026-05-31. The rule was inverted: module numbers in prompt
  // prose ground the session (artifacts are module-numbered by design), they
  // don't leak. The live concern is curriculum-coined event/exercise labels
  // with no in-session referent (§40b) — handled by prompt-source-audit.sh P4,
  // not lint-able by a bare-token regex without false-firing on domain language.

  return findings;
}

function main() {
  const registry = loadRegistry();
  const trainingKey = argValue('--training', null);

  let keys;
  if (trainingKey) {
    keys = orderedKeys(trainingKey).filter((k) => registry[k]);
  } else {
    keys = Object.keys(registry).sort();
  }

  const all = [];
  for (const key of keys) {
    all.push(...lintBody(key, registry[key].text || ''));
  }

  const sev1 = all.filter((f) => f.sev === 'Sev-1');
  const sev2 = all.filter((f) => f.sev === 'Sev-2');

  if (hasArg('--json')) {
    process.stdout.write(JSON.stringify({
      scope: trainingKey || 'all',
      prompts_linted: keys.length,
      sev1: sev1.length,
      sev2: sev2.length,
      findings: all,
    }, null, 2) + '\n');
  } else {
    console.log(`Prompt-body lint — scope: ${trainingKey || 'all'} (${keys.length} prompts)`);
    if (all.length === 0) {
      console.log('  ✓ no findings');
    } else {
      const byKey = new Map();
      for (const f of all) {
        if (!byKey.has(f.key)) byKey.set(f.key, []);
        byKey.get(f.key).push(f);
      }
      for (const [key, fs_] of byKey) {
        console.log(`\n  ${key}`);
        for (const f of fs_) console.log(`    [${f.sev}] ${f.rule} ${f.detail}`);
      }
      console.log(`\n  ${sev1.length} Sev-1, ${sev2.length} Sev-2`);
    }
  }

  process.exit(sev1.length > 0 ? 1 : 0);
}

if (require.main === module) main();

module.exports = { lintBody };
