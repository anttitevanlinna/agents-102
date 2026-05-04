#!/usr/bin/env node
/*
 * Extract a student-facing prompt progression in curriculum order.
 *
 * Usage:
 *   node scripts/extract-training-prompts.js --training agentic-engineering-101 --out /tmp/ae101-prompts.md
 *   node scripts/extract-training-prompts.js --training agents-101 --flavor all --out /tmp/agents-101-prompts.md
 *   node scripts/extract-ae101-prompts.js --out curriculum/evals/instances/ae101-prompt-progression.md
 *   node scripts/extract-agents-101-prompts.js --out curriculum/evals/instances/agents-101-prompt-progression.md
 */

const fs = require('fs');
const path = require('path');
const { TRAININGS } = require('../site/layouts/curriculum.js');

const ROOT = path.resolve(__dirname, '..');
const INCLUDE_RE = /^\[([^\]]+)\]\(((?:exercises|lectures)\/[a-z0-9-]+)\.md\)[ \t]*$/gm;
const FLAVORS = [
  { key: 'cli', label: 'Claude Code CLI', include: ['rt-cli', 'rt-code'], exclude: ['rt-desktop', 'rt-cowork'] },
  { key: 'desktop', label: 'Claude Code Desktop', include: ['rt-desktop', 'rt-code'], exclude: ['rt-cli', 'rt-cowork'] },
  { key: 'cowork', label: 'Cowork', include: ['rt-cowork'], exclude: ['rt-cli', 'rt-desktop', 'rt-code'] },
];

function argValue(name, fallback) {
  const index = process.argv.indexOf(name);
  return index === -1 ? fallback : process.argv[index + 1];
}

function readText(file) {
  return fs.readFileSync(file, 'utf8');
}

function stripMaintainer(md) {
  const marker = md.indexOf('<!-- maintainer -->');
  return marker === -1 ? md : md.slice(0, marker);
}

function preserveLineCount(text) {
  return '\n'.repeat((text.match(/\n/g) || []).length);
}

function hasRtClass(classAttr, classes) {
  const names = classAttr.trim().split(/\s+/);
  return classes.some((name) => names.includes(name));
}

function filterBlocks(md, flavor) {
  const allRt = [...flavor.include, ...flavor.exclude];
  return md.replace(/<div\b([^>]*)>([\s\S]*?)<\/div>/gi, (match, attrs, body) => {
    const classMatch = attrs.match(/\bclass=["']([^"']+)["']/i);
    if (!classMatch || !hasRtClass(classMatch[1], allRt)) return match;
    if (hasRtClass(classMatch[1], flavor.exclude)) return preserveLineCount(match);
    return `\n${body}\n`;
  });
}

function filterSpans(md, flavor) {
  const allRt = [...flavor.include, ...flavor.exclude];
  return md.replace(/<span\b([^>]*)>([\s\S]*?)<\/span>/gi, (match, attrs, body) => {
    const classMatch = attrs.match(/\bclass=["']([^"']+)["']/i);
    if (!classMatch || !hasRtClass(classMatch[1], allRt)) return match;
    if (hasRtClass(classMatch[1], flavor.exclude)) return '';
    return body;
  });
}

function filterRuntime(md, flavor) {
  if (!flavor) return md;
  return filterSpans(filterBlocks(md, flavor), flavor);
}

function headingAt(lines, lineIndex) {
  for (let i = lineIndex; i >= 0; i -= 1) {
    const match = lines[i].match(/^(#{1,6})\s+(.+?)\s*$/);
    if (match) return match[2];
  }
  return '(top)';
}

function promptLabelAt(lines, lineIndex) {
  for (let i = lineIndex; i >= Math.max(0, lineIndex - 4); i -= 1) {
    if (/\*\*Prompt\*\*/.test(lines[i])) return lines[i].trim();
  }
  return null;
}

function commandLabelAt(lines, lineIndex, body) {
  if (!/^\/[a-z][a-z-]*/m.test(body.trim())) return null;
  for (let i = lineIndex; i >= Math.max(0, lineIndex - 4); i -= 1) {
    if (/\btype:\s*$/i.test(lines[i])) return '**Command** *(Claude Code)*';
  }
  return null;
}

function extractPrompts(file, md, startLineOffset = 0) {
  const lines = md.split(/\r?\n/);
  const prompts = [];
  let fenceStart = -1;
  let fenceLang = '';

  for (let i = 0; i < lines.length; i += 1) {
    const fence = lines[i].match(/^```(.*)$/);
    if (!fence) continue;

    if (fenceStart === -1) {
      fenceStart = i;
      fenceLang = fence[1].trim();
      continue;
    }

    const body = lines.slice(fenceStart + 1, i).join('\n').trimEnd();
    const label = promptLabelAt(lines, fenceStart - 1) || commandLabelAt(lines, fenceStart - 1, body);
    if (label) {
      prompts.push({
        file,
        line: startLineOffset + fenceStart + 1,
        heading: headingAt(lines, fenceStart),
        label,
        lang: fenceLang,
        body,
      });
    }

    fenceStart = -1;
    fenceLang = '';
  }

  return prompts;
}

function includeEvents(md) {
  const events = [];
  let match;
  while ((match = INCLUDE_RE.exec(md)) !== null) {
    events.push({
      index: match.index,
      title: match[1],
      href: match[2],
    });
  }
  return events;
}

function resolveInclude(href) {
  return path.join(ROOT, 'curriculum', `${href}.md`);
}

function processFile(file, title, depth = 0, flavor = null) {
  const raw = readText(file);
  const md = filterRuntime(stripMaintainer(raw), flavor);
  const events = includeEvents(md);
  const records = [];
  let cursor = 0;

  function addSegmentPrompts(segment, lineOffset) {
    for (const prompt of extractPrompts(file, segment, lineOffset)) {
      records.push({ type: 'prompt', depth, ...prompt });
    }
  }

  for (const event of events) {
    const before = md.slice(cursor, event.index);
    const lineOffset = md.slice(0, cursor).split(/\r?\n/).length - 1;
    addSegmentPrompts(before, lineOffset);

    const includePath = resolveInclude(event.href);
    records.push({
      type: 'include',
      depth,
      title: event.title,
      href: event.href,
      file: includePath,
    });
    records.push(...processFile(includePath, event.title, depth + 1, flavor));

    const lineEnd = md.indexOf('\n', event.index);
    cursor = lineEnd === -1 ? md.length : lineEnd + 1;
  }

  const tail = md.slice(cursor);
  const tailLineOffset = md.slice(0, cursor).split(/\r?\n/).length - 1;
  addSegmentPrompts(tail, tailLineOffset);

  return records;
}

function rel(file) {
  return path.relative(ROOT, file);
}

function render(records, trainingKey, trainingLabel, flavor = null) {
  let count = 0;
  const out = [];
  const suffix = flavor ? ` (${flavor.label})` : '';
  out.push(`# ${trainingLabel || trainingKey} Prompt Progression${suffix}`);
  out.push('');
  out.push('Student-facing prompt blocks, in prework/module/include order. Maintainer sections are excluded.');
  if (flavor) out.push(`Runtime flavor: ${flavor.label}.`);
  out.push('');

  for (const record of records) {
    if (record.type === 'module') {
      out.push(`## ${record.title}`);
      out.push('');
      out.push(`Source: \`${rel(record.file)}\``);
      out.push('');
      continue;
    }

    if (record.type === 'include') {
      const hashes = '#'.repeat(Math.min(6, 3 + record.depth));
      out.push(`${hashes} ${record.title}`);
      out.push('');
      out.push(`Source: \`${rel(record.file)}\``);
      out.push('');
      continue;
    }

    if (record.type === 'prompt') {
      count += 1;
      out.push(`**Prompt ${count}: ${record.heading}**`);
      out.push('');
      out.push(`Source: \`${rel(record.file)}:${record.line}\``);
      out.push('');
      out.push(record.label);
      out.push('');
      out.push('```');
      out.push(record.body);
      out.push('```');
      out.push('');
    }
  }

  out.push(`_Total prompts: ${count}_`);
  out.push('');
  return out.join('\n');
}

function recordsForTraining(trainingKey, flavor) {
  const training = TRAININGS[trainingKey];
  if (!training) throw new Error(`Training not found: ${trainingKey}`);

  const records = [];
  const trainingDir = path.join(ROOT, 'curriculum', 'trainings', trainingKey);
  const preworkFile = path.join(trainingDir, `${training.prework.slug}.md`);
  records.push({ type: 'module', title: training.prework.title, file: preworkFile });
  records.push(...processFile(preworkFile, training.prework.title, 0, flavor));

  for (let i = 0; i < training.modules.length; i += 1) {
    const mod = training.modules[i];
    const file = path.join(trainingDir, `${mod.slug}.md`);
    records.push({ type: 'module', title: `Module ${i + 1}: ${mod.title}`, file });
    records.push(...processFile(file, mod.title, 0, flavor));
  }

  return { records, training };
}

function renderAllFlavors(trainingKey) {
  return FLAVORS.map((flavor) => {
    const { records, training } = recordsForTraining(trainingKey, flavor);
    return render(records, trainingKey, training.label, flavor);
  }).join('\n---\n\n');
}

function main() {
  const trainingKey = argValue('--training', process.env.TRAINING || 'agentic-engineering-101');
  const flavorArg = argValue('--flavor', process.env.FLAVOR || 'canonical');
  const flavor = FLAVORS.find((candidate) => candidate.key === flavorArg);
  if (!flavor && !['all', 'canonical'].includes(flavorArg)) {
    throw new Error(`Unknown flavor: ${flavorArg}. Use canonical, all, cli, desktop, or cowork.`);
  }

  const output = flavorArg === 'all'
    ? renderAllFlavors(trainingKey)
    : render(recordsForTraining(trainingKey, flavor).records, trainingKey, TRAININGS[trainingKey]?.label, flavor);
  const outPathArg = argValue('--out', null);
  if (outPathArg) {
    const outPath = path.resolve(process.cwd(), outPathArg);
    fs.writeFileSync(outPath, output);
    console.log(`Wrote ${outPath}`);
  } else {
    process.stdout.write(output);
  }
}

main();
