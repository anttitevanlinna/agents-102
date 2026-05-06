#!/usr/bin/env node
/*
 * Audit curriculum artifact handoffs.
 *
 * This is intentionally a static smoke test, not a semantic judge. It:
 *   - expands a training's module order through standalone lecture/exercise links
 *   - extracts maintainer "Artefact contracts" tables from module files
 *   - scans student-facing module bodies for durable artifact mentions
 *   - reports missing contract tables, likely uncontracted produced artifacts,
 *     consumer mentions without an upstream contract, weak contract consumers,
 *     and path/name drift across contracts.
 *
 * Usage:
 *   node scripts/audit-ae101-artifact-contracts.js
 *   node scripts/audit-ae101-artifact-contracts.js --training agents-101
 *   node scripts/audit-ae101-artifact-contracts.js --out curriculum/evals/instances/ae101-artifact-contract-audit.md
 *   node scripts/audit-ae101-artifact-contracts.js --json
 */

const fs = require('fs');
const path = require('path');
const { TRAININGS } = require('../site/layouts/curriculum.js');

const ROOT = path.resolve(__dirname, '..');
const DEFAULT_TRAINING = 'agentic-engineering-101';
const INCLUDE_RE = /^\[([^\]]+)\]\(((?:exercises|lectures)\/[a-z0-9-]+)\.md\)[ \t]*$/gm;
const MAINTAINER_MARKER = '<!-- maintainer -->';

const PRODUCER_RE = /\b(author|build|commit|copy|create|cut|end with|fork|install|integrate|land|lands|live|lives|pin|produce|save|set up|ship|update|write|wrote)\b/i;
const CONSUMER_RE = /\b(against|bring|consume|consumed by|find|invoke|load|loads|open|opens|read|reads|re-read|re-reads|use|uses|walk|walks)\b/i;
const SESSION_DECL_RE = /^\*\*Session\*\*\s*\*\(([^,]+),\s*"([^"]*)"\)\*/;

const TRAINING_CONFIGS = {
  'agentic-engineering-101': {
    title: 'AE101',
    stages: [
      { slug: 'sponsor-prework', title: 'Sponsor prework', index: -1 },
      { slug: 'prework', title: 'Prework', index: 0 },
    ],
  },
  'agents-101': {
    title: 'Agents 101',
    stages: [
      { slug: 'prework', title: 'Prework', index: 0 },
    ],
  },
};

const DETECTORS = [
  {
    id: 'claude-local',
    label: 'Personal rules file',
    regex: /(?:\.\/)?CLAUDE\.local\.md\b/g,
    requiresContract: true,
    trainings: ['agentic-engineering-101'],
  },
  {
    id: 'root-claude',
    label: 'Root rules file',
    regex: /root\s+(?:`\.\/)?CLAUDE\.md|training-dir root rules|training-root\s+`?CLAUDE\.md|root\s+`?CLAUDE\.md|`\.\/CLAUDE\.md`/gi,
    requiresContract: true,
    trainings: ['agents-101'],
  },
  {
    id: 'team-claude',
    label: 'Team rules file',
    regex: /(?:team\s+)?(?:\.\/)?CLAUDE\.md\b/g,
    requiresContract: false,
  },
  {
    id: 'agents101-training-dir',
    label: 'Agents 101 training directory',
    regex: /training directory|training-directory root|~\/Documents\/agents-101\//gi,
    requiresContract: true,
  },
  {
    id: 'agents101-starter',
    label: 'Agents 101 starter file set',
    regex: /agents-101-starter\.tar\.gz|starter file set|prework starter|Agents 101 starter/gi,
    requiresContract: true,
  },
  {
    id: 'agents101-prework-proof',
    label: 'Prework proof files',
    regex: /prework\/snake\.html|prework\/meetings\.md|snake game|meetings summary/gi,
    requiresContract: true,
  },
  {
    id: 'module1-site',
    label: 'Module 1 personal site',
    regex: /module-1\/site\.html|HTML one-pager|personal site/gi,
    requiresContract: true,
  },
  {
    id: 'module1-generation-rules',
    label: 'Module 1 generation rules',
    regex: /module-1\/personal-brand-generation\.md|generation-rules file|rules file.*Module 1|Module 1 generation-rules/gi,
    requiresContract: true,
  },
  {
    id: 'challenge-file',
    label: 'Challenge file',
    regex: /`?\.\/challenge\.md`?|challenge brief|sponsor challenge/gi,
    requiresContract: true,
  },
  {
    id: 'sources-folder',
    label: 'Sources folder',
    regex: /sources\/|sources folder|raw sources/gi,
    requiresContract: true,
  },
  {
    id: 'agents101-memory-folder',
    label: 'Memory folder',
    regex: /memory\/|memory folder|curated memory|challenge memory/gi,
    requiresContract: true,
    trainings: ['agents-101'],
  },
  {
    id: 'agents-folder',
    label: 'Agents folder',
    regex: /agents\/|agents folder|custom agent files|agent files/gi,
    requiresContract: true,
  },
  {
    id: 'module3-artifacts',
    label: 'Module 3 synthesis artifacts',
    regex: /`?\.\/crux\.md`?|module-3\/|memory\/_synthesis-m3\.md|retrieval files|synthesizer's briefing|stances\//gi,
    requiresContract: true,
  },
  {
    id: 'module4-policies',
    label: 'Module 4 policy references',
    regex: /module-4\/policies\/|policy reference files|customer-policy reference/gi,
    requiresContract: true,
  },
  {
    id: 'module4-security-outputs',
    label: 'Module 4 security outputs',
    regex: /outputs\/policy-report(?:-raw)?\.md|outputs\/security-report\.md|policy report|security report|residual risk/gi,
    requiresContract: true,
  },
  {
    id: 'groundedness-judge',
    label: 'Groundedness judge',
    regex: /judges\/groundedness-judge\.md|groundedness judge|judge file|first real judge/gi,
    requiresContract: true,
  },
  {
    id: 'module5-benchmark-artifacts',
    label: 'Module 5 benchmark artifacts',
    regex: /module-5\/(?:evidence-roster|briefing|claim-pool|detectors|adjudicated-claims|scoreboard)|evidence roster|claim pool|scoreboard/gi,
    requiresContract: true,
  },
  {
    id: 'module6-eval-artifacts',
    label: 'Module 6 eval artifacts',
    regex: /module-6\/(?:runs|eval-notes)|generation-tactic\.md|goal-nudger-eval\.md|eval-notes|tactic-change/gi,
    requiresContract: true,
  },
  {
    id: 'module7-sharing-artifacts',
    label: 'Module 7 sharing artifacts',
    regex: /module-7\/(?:jtbd|branch|absorption-bottleneck|technical-plan|people-plan|assumptions|failure-stories|monday)|Module 7 next-step|sharing artifact|next-step file/gi,
    requiresContract: true,
  },
  {
    id: 'module8-extension-artifacts',
    label: 'Module 8 extension artifacts',
    regex: /module-8\/extension-brief\.md|agents\/<slug>\.md|new agent in `agents\/`|new agent in agents\/|extension brief/gi,
    requiresContract: true,
  },
  {
    id: 'module8-shared-deliberation',
    label: 'Module 8 shared deliberation artifacts',
    regex: /shared deliberation folder|participant subfolders|context manifests|selection-board\.md|midway-instructions\.md|strategy-kernel\.md|agent-set\.md|plan\.md/gi,
    requiresContract: true,
  },
  {
    id: 'task-shaping-rules',
    label: 'Task-shaping rule file',
    regex: /task-shaping(?: rule)?(?:s)?(?:\.md)?|multi-file task plan-mode-able|automated task-splitting/gi,
    requiresContract: true,
    trainings: ['agentic-engineering-101'],
  },
  {
    id: 'adr',
    label: 'Architecture Decision Record',
    regex: /\bADR(?:s)?\b|Architecture Decision Record|docs\/adr\/NNNN-slug\.md|hardening decision/gi,
    requiresContract: true,
    trainings: ['agentic-engineering-101'],
  },
  {
    id: 'test-strategy-skill',
    label: 'Test-strategy skill',
    regex: /test-strategy skill|~\/\.claude\/skills\/test-strategy\/SKILL\.md|test-strategy\/SKILL\.md/gi,
    requiresContract: true,
    trainings: ['agentic-engineering-101'],
  },
  {
    id: 'curated-security-skills',
    label: 'Curated security skills',
    regex: /access-control-analysis|stride skill|content\/skills\/stride|content\/skills\/access-control-analysis/gi,
    requiresContract: true,
    trainings: ['agentic-engineering-101'],
  },
  {
    id: 'content-bundle',
    label: 'AE101 content bundle',
    regex: /agents-102-content\.tar\.gz|AE101 content directory|content folder|content\/skills\//gi,
    requiresContract: true,
    trainings: ['agentic-engineering-101'],
  },
  {
    id: 'pre-engagement-contract',
    label: 'Pre-engagement contract',
    regex: /pre-engagement-contract\.md|pre-engagement contract|sponsor-stated homes?/gi,
    requiresContract: true,
    trainings: ['agentic-engineering-101'],
  },
  {
    id: 'memory',
    label: 'Memory / knowledge home',
    regex: /\.claude\/memory\/|three-block memory|business-rules home|memory pages?/gi,
    requiresContract: true,
    trainings: ['agentic-engineering-101'],
  },
  {
    id: 'connector-ticket',
    label: 'Ticket close-out / connector',
    regex: /ticket(?:'s)?|tracker|MCP connector|connector|GitHub Issues|Linear|Jira/gi,
    requiresContract: false,
  },
  {
    id: 'm4-branch-sha',
    label: 'M4 starting branch + SHA',
    regex: /m4\/<[^>]+>|m4\/<task-slug>|M4 starting point|starting SHA|short SHA/gi,
    requiresContract: true,
    trainings: ['agentic-engineering-101'],
  },
  {
    id: 'm4-transcript',
    label: 'M4 session transcript',
    regex: /M4 session transcript|previous session's transcript|~\/\.claude\/projects\/<project-folder>\/<session-id>\.jsonl|session transcript/gi,
    requiresContract: true,
    trainings: ['agentic-engineering-101'],
  },
  {
    id: 'm5-worktree',
    label: 'M5 worktree branch + SHA',
    regex: /m5\/<task-slug>|M5 worktree|worktree at `\.\.\/<repo>-m5`|worktree branch|packaged-run starting state/gi,
    requiresContract: true,
    trainings: ['agentic-engineering-101'],
  },
  {
    id: 'reference-artifact',
    label: 'Reference artefact',
    regex: /reference artefact|reference\.md|re-readable spec|task-local file/gi,
    requiresContract: true,
    trainings: ['agentic-engineering-101'],
  },
  {
    id: 'plan-md',
    label: 'Plan.md',
    regex: /(?:^|[`/\s])plan\.md|working document the agent owns|durable working document/gi,
    requiresContract: true,
    trainings: ['agentic-engineering-101'],
  },
  {
    id: 'verifier',
    label: 'Verifier / eval',
    regex: /verifier|\beval\b|LLM-judge|judge in|judge reads|quality gate|CI gate|shell-hook|background-agent verifier|Ralph re-feed|automated check/gi,
    requiresContract: true,
    trainings: ['agentic-engineering-101'],
  },
  {
    id: 'run-notes',
    label: 'Run notes',
    regex: /RUN-NOTES\.md|run notes/gi,
    requiresContract: true,
    trainings: ['agentic-engineering-101'],
  },
  {
    id: 'session-shaper-skill',
    label: 'Session-shaper / second skill',
    regex: /session-shaper|second skill|~\/\.claude\/skills\/<skill-name>\/SKILL\.md|sharpened-verifier|gap-finder|LLM-judge/gi,
    requiresContract: true,
    trainings: ['agentic-engineering-101'],
  },
  {
    id: 'arc-retrospective',
    label: 'Arc retrospective note',
    regex: /arc retrospective|one-page note|arc note|one-page arc retrospective/gi,
    requiresContract: true,
    trainings: ['agentic-engineering-101'],
  },
];

function argValue(name, fallback) {
  const index = process.argv.indexOf(name);
  return index === -1 ? fallback : process.argv[index + 1];
}

function hasArg(name) {
  return process.argv.includes(name);
}

function readText(file) {
  return fs.readFileSync(file, 'utf8');
}

function rel(file) {
  return path.relative(ROOT, file);
}

function stripMaintainer(md) {
  const i = md.indexOf(MAINTAINER_MARKER);
  return i === -1 ? md : md.slice(0, i);
}

function maintainerTail(md) {
  const i = md.indexOf(MAINTAINER_MARKER);
  return i === -1 ? '' : md.slice(i);
}

function lineNumber(text, index) {
  return text.slice(0, index).split(/\r?\n/).length;
}

function moduleNumber(slug, training) {
  const idx = training.modules.findIndex((m) => m.slug === slug);
  return idx === -1 ? null : idx + 1;
}

function moduleFile(trainingSlug, slug) {
  return path.join(ROOT, 'curriculum', 'trainings', trainingSlug, `${slug}.md`);
}

function stageFile(trainingSlug, slug) {
  return path.join(ROOT, 'curriculum', 'trainings', trainingSlug, `${slug}.md`);
}

function resolveInclude(href) {
  return path.join(ROOT, 'curriculum', `${href}.md`);
}

function includeEvents(md) {
  const events = [];
  let match;
  while ((match = INCLUDE_RE.exec(md)) !== null) {
    events.push({ index: match.index, title: match[1], href: match[2] });
  }
  return events;
}

function expandedStudentText(file, seen = new Set()) {
  const raw = stripMaintainer(readText(file));
  if (seen.has(file)) return { text: '', sources: [] };
  seen.add(file);

  const sources = [{ file, title: null }];
  const events = includeEvents(raw);
  if (events.length === 0) return { text: raw, sources };

  let out = '';
  let cursor = 0;
  for (const event of events) {
    out += raw.slice(cursor, event.index);
    const includePath = resolveInclude(event.href);
    if (fs.existsSync(includePath)) {
      const expanded = expandedStudentText(includePath, seen);
      out += `\n\n<!-- included: ${event.href} -->\n\n`;
      out += expanded.text;
      sources.push(...expanded.sources);
    } else {
      out += raw.slice(event.index, raw.indexOf('\n', event.index));
    }
    const lineEnd = raw.indexOf('\n', event.index);
    cursor = lineEnd === -1 ? raw.length : lineEnd + 1;
  }
  out += raw.slice(cursor);
  return { text: out, sources };
}

function splitTableRow(line) {
  if (!line.trim().startsWith('|')) return null;
  const cells = line.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map((c) => c.trim());
  if (cells.length < 4) return null;
  return cells;
}

function isSeparatorRow(cells) {
  return cells.every((c) => /^:?-{2,}:?$/.test(c));
}

function extractContracts(file, moduleSlug, moduleIndex, trainingSlug) {
  const md = readText(file);
  const tail = maintainerTail(md);
  const lines = tail.split(/\r?\n/);
  const contracts = [];
  let hasSection = false;

  for (let i = 0; i < lines.length; i += 1) {
    if (!/\*\*Arte?fact contracts\*\*/i.test(lines[i])) continue;
    hasSection = true;
    for (let j = i + 1; j < lines.length; j += 1) {
      if (/^\*\*[^*]+\*\*/.test(lines[j]) && !lines[j].trim().startsWith('**Artefact')) break;
      const cells = splitTableRow(lines[j]);
      if (!cells || isSeparatorRow(cells)) continue;
      if (/^Arte?fact$/i.test(cells[0]) && /^Stable identifier$/i.test(cells[1])) continue;
      contracts.push({
        moduleSlug,
        moduleIndex,
        file,
        line: lineNumber(md, md.indexOf(lines[j])),
        artifact: cells[0] || '',
        identifier: cells[1] || '',
        producedBy: cells[2] || '',
        consumedBy: cells[3] || '',
        detectors: detectIds(`${cells[0] || ''} ${cells[1] || ''}`, trainingSlug),
      });
    }
  }

  return { hasSection, contracts };
}

function activeDetectors(trainingSlug) {
  return DETECTORS.filter((detector) => !detector.trainings || detector.trainings.includes(trainingSlug));
}

function detectIds(text, trainingSlug) {
  const ids = [];
  for (const detector of activeDetectors(trainingSlug)) {
    detector.regex.lastIndex = 0;
    if (detector.regex.test(text)) ids.push(detector.id);
  }
  return ids;
}

function scanMentions(text, moduleSlug, moduleIndex, trainingSlug) {
  const mentions = [];
  const lines = text.split(/\r?\n/);
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    if (/\bno\s+(?:plan\.md|verifier|reference artefact|reference artifact)\b/i.test(line)) continue;
    for (const detector of activeDetectors(trainingSlug)) {
      detector.regex.lastIndex = 0;
      if (!detector.regex.test(line)) continue;
      mentions.push({
        moduleSlug,
        moduleIndex,
        line: i + 1,
        detector: detector.id,
        label: detector.label,
        producerLike: PRODUCER_RE.test(line),
        consumerLike: CONSUMER_RE.test(line),
        text: line.trim(),
      });
    }
  }
  return mentions;
}

function scanSessionBreaks(text, moduleSlug, moduleIndex) {
  const breaks = [];
  const lines = text.split(/\r?\n/);
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i].trim();
    const session = line.match(SESSION_DECL_RE);
    if (session) {
      breaks.push({
        moduleSlug,
        moduleIndex,
        line: i + 1,
        kind: 'session',
        verb: session[1].trim(),
        name: session[2].trim(),
        text: line,
      });
      continue;
    }
    if (line === '/clear') {
      breaks.push({
        moduleSlug,
        moduleIndex,
        line: i + 1,
        kind: 'clear',
        verb: 'clear',
        name: '',
        text: line,
      });
      continue;
    }
    if (/^Open a new Claude Code session\b|^Start a new Claude Code session\b|^Continue in your M5 worktree session\b|^Before opening the Module 5 session\b|^Open a new Claude Code session in the M5 worktree\b/i.test(line)) {
      breaks.push({
        moduleSlug,
        moduleIndex,
        line: i + 1,
        kind: 'prose-boundary',
        verb: 'prose',
        name: '',
        text: line,
      });
    }
  }
  return breaks;
}

function detectorById(id) {
  return DETECTORS.find((d) => d.id === id);
}

function normalizeIdentifier(identifier) {
  return identifier
    .replace(/`+/g, '')
    .replace(/\([^)]*\)/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

function contractHasLaterConsumer(contract) {
  const c = contract.consumedBy;
  if (!c.trim()) return false;
  return /\b(M[1-9]|future|every|next|Monday|PR|team|later|downstream|cohort|session-cold|auto-load|post-training|central synthesizer)/i.test(c);
}

function mentionedModuleNumbers(text) {
  const nums = [];
  const re = /\bM([1-9])\b|Module\s+([1-9])/gi;
  let m;
  while ((m = re.exec(text)) !== null) {
    nums.push(Number(m[1] || m[2]));
  }
  return nums;
}

function renderMd(result) {
  const out = [];
  out.push(`# ${result.trainingTitle} Artifact Contract Audit`);
  out.push('');
  out.push(`Generated by \`node scripts/audit-ae101-artifact-contracts.js --training ${result.training}\`.`);
  out.push('');
  out.push('Static smoke test: useful for finding broken handoffs, not a substitute for the full end-to-end dry run.');
  out.push('');

  out.push('## Summary');
  out.push('');
  out.push(`- Stages scanned: ${result.modules.length}`);
  out.push(`- Contract rows: ${result.contracts.length}`);
  out.push(`- Session breaks: ${result.sessionBreaks.length}`);
  out.push(`- Missing contract sections: ${result.findings.missingSections.length}`);
  out.push(`- Likely produced artifact mentions without same-module contract: ${result.findings.uncontractedProducedMentions.length}`);
  out.push(`- Consumer mentions without upstream contract: ${result.findings.consumerWithoutProducer.length}`);
  out.push(`- Weak or missing contract consumers: ${result.findings.weakConsumers.length}`);
  out.push(`- Identifier drift groups: ${result.findings.identifierDrift.length}`);
  out.push('');

  function findingList(title, findings, render) {
    out.push(`## ${title}`);
    out.push('');
    if (findings.length === 0) {
      out.push('No findings.');
      out.push('');
      return;
    }
    for (const f of findings) out.push(render(f));
    out.push('');
  }

  findingList('Missing Contract Sections', result.findings.missingSections, (f) =>
    `- M${f.moduleIndex} \`${f.moduleSlug}\` has no maintainer \`Artefact contracts\` table.`
  );

  findingList('Likely Produced But Not Contracted In Module', result.findings.uncontractedProducedMentions, (f) =>
    `- M${f.moduleIndex} \`${f.moduleSlug}\`: **${f.label}** at expanded line ${f.line}: ${f.text}`
  );

  findingList('Consumer Mentions Without Upstream Contract', result.findings.consumerWithoutProducer, (f) =>
    `- M${f.moduleIndex} \`${f.moduleSlug}\`: **${f.label}** is consumed/loaded/read but no earlier contract row produces it. Line ${f.line}: ${f.text}`
  );

  findingList('Weak Or Missing Consumers', result.findings.weakConsumers, (f) =>
    `- M${f.moduleIndex} \`${f.moduleSlug}\` contract **${f.artifact}** has weak/no consumer: ${f.consumedBy || '(empty)'}`
  );

  findingList('Consumer Points Backward Or Sideways', result.findings.consumerOrderProblems, (f) =>
    `- M${f.moduleIndex} \`${f.moduleSlug}\` contract **${f.artifact}** says consumed by M${f.consumedModule}, which is not later than producer.`
  );

  findingList('Identifier Drift', result.findings.identifierDrift, (f) =>
    `- **${detectorById(f.detector).label}** uses ${f.identifiers.length} stable-identifier wordings:\n${f.identifiers.map((x) => `  - ${x}`).join('\n')}`
  );

  out.push('## Session Breaks');
  out.push('');
  if (result.sessionBreaks.length === 0) {
    out.push('No session breaks found.');
  } else {
    out.push('| Stage | Kind | Name / text |');
    out.push('|---|---|---|');
    for (const b of result.sessionBreaks) {
      const stage = stageLabel(b);
      const name = b.kind === 'session' ? `${b.verb}, "${b.name}"` : b.text;
      out.push(`| ${stage} | ${b.kind} | ${escCell(name)} |`);
    }
  }
  out.push('');

  out.push('## Contract Map');
  out.push('');
  if (result.contracts.length === 0) {
    out.push('No contract rows found.');
  } else {
    out.push('| Module | Artefact | Stable identifier | Produced by | Consumed by |');
    out.push('|---|---|---|---|---|');
    for (const c of result.contracts) {
      out.push(`| ${stageLabel(c)} | ${escCell(c.artifact)} | ${escCell(c.identifier)} | ${escCell(c.producedBy)} | ${escCell(c.consumedBy)} |`);
    }
  }
  out.push('');

  out.push('## Detector Coverage');
  out.push('');
  out.push('| Artifact family | Contract rows | Student-facing mentions |');
  out.push('|---|---:|---:|');
  for (const detector of activeDetectors(result.training)) {
    const c = result.contracts.filter((row) => row.detectors.includes(detector.id)).length;
    const m = result.mentions.filter((row) => row.detector === detector.id).length;
    out.push(`| ${detector.label} | ${c} | ${m} |`);
  }
  out.push('');

  return out.join('\n');
}

function escCell(s) {
  return String(s).replace(/\|/g, '\\|').replace(/\n/g, '<br>');
}

function stageLabel(stage) {
  if (stage.moduleIndex < 0) return 'Sponsor';
  if (stage.moduleIndex === 0) return 'Prework';
  return `M${stage.moduleIndex} ${stage.moduleSlug}`;
}

function buildAudit(trainingSlug) {
  const config = TRAINING_CONFIGS[trainingSlug];
  if (!config) throw new Error(`No audit config for training: ${trainingSlug}`);
  const training = TRAININGS[trainingSlug];
  if (!training) throw new Error(`Unknown training: ${trainingSlug}`);

  const modules = [
    ...config.stages.map((stage) => ({
      ...stage,
      file: stageFile(trainingSlug, stage.slug),
    })),
    ...training.modules.map((m) => ({
      slug: m.slug,
      title: m.title,
      index: moduleNumber(m.slug, training),
      file: moduleFile(trainingSlug, m.slug),
    })),
  ].filter((stage) => fs.existsSync(stage.file));

  const contracts = [];
  const mentions = [];
  const sessionBreaks = [];
  const missingSections = [];

  for (const mod of modules) {
    const extracted = extractContracts(mod.file, mod.slug, mod.index, trainingSlug);
    contracts.push(...extracted.contracts);
    if (mod.index > 0 && !extracted.hasSection) missingSections.push({ moduleSlug: mod.slug, moduleIndex: mod.index });

    const expanded = expandedStudentText(mod.file);
    mentions.push(...scanMentions(expanded.text, mod.slug, mod.index, trainingSlug));
    sessionBreaks.push(...scanSessionBreaks(expanded.text, mod.slug, mod.index));
  }

  const contractByModuleAndDetector = new Set();
  const firstProducerByDetector = new Map();
  for (const c of contracts) {
    for (const id of c.detectors) {
      contractByModuleAndDetector.add(`${c.moduleIndex}:${id}`);
      if (!firstProducerByDetector.has(id) || c.moduleIndex < firstProducerByDetector.get(id).moduleIndex) {
        firstProducerByDetector.set(id, c);
      }
    }
  }

  const uncontractedProducedMentions = mentions.filter((m) => {
    const detector = detectorById(m.detector);
    if (!detector.requiresContract || !m.producerLike) return false;
    if (/\bwill author\b|\bwill build\b|\bfuture\b/i.test(m.text)) return false;
    const upstream = firstProducerByDetector.get(m.detector);
    if (upstream && upstream.moduleIndex < m.moduleIndex) return false;
    return !contractByModuleAndDetector.has(`${m.moduleIndex}:${m.detector}`);
  });

  const consumerWithoutProducer = mentions.filter((m) => {
    const detector = detectorById(m.detector);
    if (!detector.requiresContract || !m.consumerLike) return false;
    if (m.moduleIndex < 0 || /\bwill author\b|\bwill build\b|\bfuture\b/i.test(m.text)) return false;
    const producer = firstProducerByDetector.get(m.detector);
    return !producer || producer.moduleIndex > m.moduleIndex;
  });

  const weakConsumers = contracts.filter((c) => !contractHasLaterConsumer(c));

  const consumerOrderProblems = [];
  for (const c of contracts) {
    const nums = mentionedModuleNumbers(c.consumedBy);
    for (const n of nums) {
      const priorArtifactReference = new RegExp(`M${n}[^.;|]*(output|run|branch|SHA|from)`, 'i').test(c.consumedBy);
      if (n < c.moduleIndex && !priorArtifactReference) consumerOrderProblems.push({ ...c, consumedModule: n });
    }
  }

  const identifierDrift = [];
  for (const detector of activeDetectors(trainingSlug)) {
    const identifiers = [...new Set(
      contracts
        .filter((c) => c.detectors.includes(detector.id))
        .map((c) => normalizeIdentifier(c.identifier))
        .filter(Boolean)
    )];
    if (identifiers.length > 1) {
      identifierDrift.push({ detector: detector.id, identifiers });
    }
  }

  return {
    training: trainingSlug,
    trainingTitle: config.title,
    modules,
    contracts,
    mentions,
    sessionBreaks,
    findings: {
      missingSections,
      uncontractedProducedMentions,
      consumerWithoutProducer,
      weakConsumers,
      consumerOrderProblems,
      identifierDrift,
    },
  };
}

function main() {
  const trainingSlug = argValue('--training', DEFAULT_TRAINING);
  const result = buildAudit(trainingSlug);
  const outFile = argValue('--out', null);
  const body = hasArg('--json') ? `${JSON.stringify(result, null, 2)}\n` : renderMd(result);
  if (outFile) {
    fs.mkdirSync(path.dirname(path.resolve(ROOT, outFile)), { recursive: true });
    fs.writeFileSync(path.resolve(ROOT, outFile), body);
  } else {
    process.stdout.write(body);
    if (!body.endsWith('\n')) process.stdout.write('\n');
  }
}

main();
