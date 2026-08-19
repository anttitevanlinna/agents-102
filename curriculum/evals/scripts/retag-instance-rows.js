#!/usr/bin/env node
'use strict';
/*
 * retag-instance-rows.js — surgical, format-preserving repairs to stored eval
 * instances (`curriculum/evals/instances/*.json`).
 *
 * Why not JSON.parse → mutate → JSON.stringify: 289 of 635 instances do not
 * round-trip through a dump (mixed indents, compact rows, hand edits). Re-dumping
 * would reformat half the corpus into one unreviewable diff. So every repair here
 * is a textual edit inside a single row object, leaving every other byte alone.
 *
 * Repairs (each opt-in by flag):
 *   --judge-owned   a row whose citation names no resolvable rule and never could
 *                   (placeholder index, index 0/negative, invented compendium, or
 *                   no index at all) is retagged `rule_index: null, judge_owned:
 *                   true` — the declared home for a judgement with no numbered
 *                   rule. It credits no rule, warns about none, and stays a record.
 *   --moved         a verdict stamped on a rule that moved compendium is restamped
 *                   to the address the tombstone names.
 *   --verdict       a non-enum verdict is reduced to its enum part, the caveat
 *                   moved into fix_hint.
 *
 * Usage: node curriculum/evals/scripts/retag-instance-rows.js [--dry-run] --judge-owned --moved --verdict
 */
const fs = require('fs');
const path = require('path');

const INSTANCES = path.resolve(__dirname, '../instances');

// Span-scan the elements of the top-level `rules_evaluated` array, returning
// [start, end) offsets of each row object in the RAW text. String-aware, so a
// brace inside evidence prose does not shift the depth count.
function rowSpans(raw) {
  const key = raw.indexOf('"rules_evaluated"');
  if (key < 0) return [];
  const open = raw.indexOf('[', key);
  if (open < 0) return [];
  const spans = [];
  let i = open + 1, depth = 0, start = -1, inStr = false, esc = false;
  for (; i < raw.length; i++) {
    const ch = raw[i];
    if (inStr) {
      if (esc) esc = false;
      else if (ch === '\\') esc = true;
      else if (ch === '"') inStr = false;
      continue;
    }
    if (ch === '"') { inStr = true; continue; }
    if (ch === '{') { if (depth === 0) start = i; depth++; continue; }
    if (ch === '}') { depth--; if (depth === 0 && start >= 0) { spans.push([start, i + 1]); start = -1; } continue; }
    if (ch === ']' && depth === 0) break;
  }
  return spans;
}

// Rewrite one `"rule_index": <value>` occurrence inside a row's text.
function setRuleIndex(rowText, replacement) {
  const m = /"rule_index"(\s*):(\s*)("(?:[^"\\]|\\.)*"|null|-?\d+(?:\.\d+)?)/.exec(rowText);
  if (!m) return null;
  return rowText.slice(0, m.index) + `"rule_index"${m[1]}:${m[2]}${replacement}` + rowText.slice(m.index + m[0].length);
}

function setStringField(rowText, field, value) {
  const re = new RegExp(`"${field}"(\\s*):(\\s*)("(?:[^"\\\\]|\\\\.)*"|null)`);
  const m = re.exec(rowText);
  const lit = JSON.stringify(value);
  if (!m) return null;
  return rowText.slice(0, m.index) + `"${field}"${m[1]}:${m[2]}${lit}` + rowText.slice(m.index + m[0].length);
}

// A row is judge-owned-shaped when its citation can never resolve to a rule:
// no index at all, a placeholder word, index 0 or negative, or a compendium
// that is not a real check_*.md file.
function isJudgeOwnedShaped(row, knownCompendia) {
  if (row.judge_owned === true) return false; // already tagged
  if (row.compendium == null) return false;   // a class-specific row shape, not a rule row
  const cname = String(row.compendium).replace(/\.md$/, '');
  if (!knownCompendia.has(cname)) return true;
  if (row.rule_index == null) return true;
  const s = String(row.rule_index);
  if (!/^-?\d+[a-z]?(\.\d+)?$/.test(s)) return true;  // "scope", "trigger", "pre-1", … (but 9b is a real rule)
  return Number(s) <= 0;                        // 0 and negatives are not rule numbers
}

function applyToFile(file, opts) {
  const raw = fs.readFileSync(file, 'utf8');
  const doc = JSON.parse(raw);
  if (!Array.isArray(doc.rules_evaluated)) return { changed: 0, text: raw };
  const spans = rowSpans(raw);
  if (spans.length !== doc.rules_evaluated.length) return { changed: 0, text: raw, skipped: 'span/row count mismatch' };

  let out = raw, changed = 0;
  // Right-to-left, so earlier offsets stay valid.
  for (let i = spans.length - 1; i >= 0; i--) {
    const row = doc.rules_evaluated[i];
    if (!row || typeof row !== 'object') continue;
    const [s, e] = spans[i];
    let text = out.slice(s, e), next = null;

    if (opts.judgeOwned && isJudgeOwnedShaped(row, opts.knownCompendia)) {
      next = row.rule_index === undefined
        ? text.replace(/^\{(\s*)/, '{$1"rule_index": null, "judge_owned": true, ')
        : setRuleIndex(text, 'null, "judge_owned": true');
    } else if (opts.moved && row.rule_index != null) {
      const cname = String(row.compendium || '').replace(/\.md$/, '');
      const to = (opts.moved[cname] || {})[String(row.rule_index).replace(/^(\d+)[a-z]$/, '$1')];
      if (to && String(row.verdict).trim() !== 'N/A') {
        const [newComp, newIdx] = to.split(/\s+§/);
        next = setStringField(text, 'compendium', newComp);
        if (next) next = setRuleIndex(next, JSON.stringify(Number(newIdx)));
      }
    }
    if (!next && opts.verdict && typeof row.verdict === 'string') {
      const m = /^(PASS|REVISE|N\/A)\b(.+)$/.exec(row.verdict.trim());
      if (m && m[2].trim()) {
        next = setStringField(text, 'verdict', m[1]);
        if (next) {
          const caveat = `Verdict caveat carried over from the verdict field: ${m[1]}${m[2]}`.trim();
          next = setStringField(next, 'fix_hint', row.fix_hint ? `${row.fix_hint} — ${caveat}` : caveat) || next;
        }
      }
    }
    if (next && next !== text) { out = out.slice(0, s) + next + out.slice(e); changed++; }
  }
  return { changed, text: out };
}

function main() {
  const argv = process.argv.slice(2);
  const dry = argv.includes('--dry-run');
  const knownCompendia = new Set(require('../../../scripts/audit-eval-coverage.js').COMPENDIA_NAMESPACE);
  const opts = {
    judgeOwned: argv.includes('--judge-owned'),
    verdict: argv.includes('--verdict'),
    knownCompendia,
    moved: argv.includes('--moved')
      ? Object.fromEntries(Object.entries(require('../../../scripts/audit-eval-coverage.js').loadCompendia())
          .map(([k, v]) => [k, v.moved || {}]))
      : null,
  };
  let files = 0, rows = 0, skipped = [];
  for (const name of fs.readdirSync(INSTANCES).filter(n => n.endsWith('.json'))) {
    const p = path.join(INSTANCES, name);
    let res;
    try { res = applyToFile(p, opts); } catch (e) { skipped.push(`${name}: ${e.message}`); continue; }
    if (res.skipped) { skipped.push(`${name}: ${res.skipped}`); continue; }
    if (res.changed) {
      JSON.parse(res.text); // never write a file that stopped being JSON
      if (!dry) fs.writeFileSync(p, res.text);
      files++; rows += res.changed;
      process.stdout.write(`  ${res.changed}  ${name}\n`);
    }
  }
  process.stdout.write(`${dry ? '[dry-run] ' : ''}${rows} row(s) in ${files} file(s)\n`);
  if (skipped.length) process.stderr.write(`skipped ${skipped.length}:\n  ${skipped.join('\n  ')}\n`);
}

if (require.main === module) main();
module.exports = { rowSpans, setRuleIndex, setStringField, isJudgeOwnedShaped, applyToFile };
