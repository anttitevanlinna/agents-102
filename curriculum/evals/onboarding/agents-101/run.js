'use strict';

const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const os = require('node:os');
const { execFileSync } = require('node:child_process');
const { JSDOM, VirtualConsole } = require('jsdom');
const { buildEdition } = require('../../../../scripts/build-a101-mvp');
const { scenarios, BASE, criterion } = require('./scenarios');
const { simulateReader, judgeCase } = require('./evaluate');
const { loadPersona } = require('../../mechanical/persona-student/lib');
const { COURSE_READING_CUE } = require('../../../../scripts/a101-mvp-navigation');

const ROOT = path.resolve(__dirname, '../../../..');
const NAVIGATION_LOADER = COURSE_READING_CUE + '\n';
const sha = value => crypto.createHash('sha256').update(value).digest('hex');
const read = file => fs.readFileSync(file, 'utf8');
const displayPath = value => value === os.homedir() ? '~' : value?.startsWith(os.homedir() + path.sep) ? '~' + value.slice(os.homedir().length) : value;
function write(file, value) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, typeof value === 'string' ? value : JSON.stringify(value, null, 2) + '\n');
}
function snapshot(dir) {
  const result = {};
  function visit(relative) {
    for (const item of fs.readdirSync(path.join(dir, relative), { withFileTypes: true })) {
      const name = relative ? `${relative}/${item.name}` : item.name;
      if (item.isSymbolicLink()) throw new Error(`Unexpected learner symlink: ${name}`);
      if (item.isDirectory()) visit(name);
      else result[name] = sha(fs.readFileSync(path.join(dir, name)));
    }
  }
  visit('');
  return result;
}
function changed(before, after) {
  return [...new Set([...Object.keys(before), ...Object.keys(after)])].sort().filter(name => before[name] !== after[name]);
}
const SOURCE_PATHS = [
  'curriculum/delivery/agents-101-mvp', 'curriculum/trainings/agents-101',
  'curriculum/prompts', 'curriculum/exercises', 'curriculum/lectures', 'curriculum/slides',
  'curriculum/figures', 'curriculum/scaffolds/agents-101-starter', 'site/layouts', 'scripts',
  'content/THIRD-PARTY-NOTICES.md', 'package.json', 'package-lock.json',
  ...['run.js', 'scenarios.js', 'evaluate.js', 'model.js', 'outcomes.json'].map(name => `curriculum/evals/onboarding/agents-101/${name}`),
  ...['_shared', 'cfo-sceptic', 'ingrid', 'cto-builder'].map(name => `curriculum/evals/personas/agents-101/${name}.md`),
  'curriculum/evals/mechanical/persona-student/lib.js', 'curriculum/evals/teaching/lib.js'
];
function sourceFingerprints(root = ROOT, paths = SOURCE_PATHS) {
  const files = {};
  function visit(relative) {
    const absolute = path.join(root, relative);
    if (!fs.existsSync(absolute)) { files[relative] = null; return; }
    if (fs.statSync(absolute).isDirectory()) {
      for (const name of fs.readdirSync(absolute).sort()) visit(`${relative}/${name}`);
    } else files[relative] = sha(fs.readFileSync(absolute));
  }
  paths.forEach(visit);
  return files;
}
function driftCheck(start, end) {
  const files = changed(start.files, end.files);
  return { id: 'source-drift', status: files.length || start.revision !== end.revision ? 'blocked' : 'pass', changed_files: files,
    reason: files.length || start.revision !== end.revision ? 'Source inputs changed during execution; rerun against stable inputs.' : 'Source hashes and revision remained stable.' };
}
function callRecord(args, out, result, error) {
  const prefix = path.join(args.outputDir, args.tag);
  const paths = {};
  for (const [name, suffix] of Object.entries({ input: '.input.txt', stdout: '.stdout.jsonl', stderr: '.stderr.txt', request: '.request.json', response: '.response.txt', status: '.status.json', context: '.context.json' })) {
    if (fs.existsSync(prefix + suffix)) paths[name] = path.relative(out, prefix + suffix);
  }
  const status = paths.status ? JSON.parse(read(prefix + '.status.json')) : null;
  const request = paths.request ? JSON.parse(read(prefix + '.request.json')) : null;
  return { tag: args.tag, directory: path.relative(out, args.outputDir), status: error ? 'blocked' : 'pass',
    error: error?.message, model_requested: args.model || 'sonnet', model_actual: result?.model || status?.model || null,
    cli_version: status?.cli_version || null, cli_binary: displayPath(request?.binary) || null, tools: args.tools === true,
    elapsed_ms: result?.elapsed_ms ?? status?.elapsed_ms ?? null, usage: result?.usage || status?.usage || null,
    harness_loaded_context: args.contextReceipt || null, raw: paths };
}
function actorContext(args) {
  if (!args.tools) return args;
  const loader = path.join(args.cwd, 'CLAUDE.md');
  if (!fs.existsSync(loader)) return { ...args, contextReceipt: { mechanism: 'harness-loaded CLI context', files: [], native_autoload_proven: false } };
  const body = read(loader);
  return {
    ...args,
    prompt: `=== HARNESS-LOADED LOCAL CLAUDE.md ===\n${body}\n=== END LOCAL CLAUDE.md ===\n\n=== ACTUAL LEARNER REQUEST ===\n${args.prompt}`,
    contextReceipt: { mechanism: 'harness-loaded CLI context', files: [{ path: 'CLAUDE.md', sha256: sha(body) }], native_autoload_proven: false }
  };
}
function followupRequest(spec, firstResponse) {
  if (spec.coldFollowup && spec.followup) throw new Error('A scenario must choose cold follow-up or history replay, not both.');
  return spec.coldFollowup
    ? { prompt: spec.coldFollowup, tag: 'cold-resume' }
    : { prompt: `Verbatim prior user request:\n${spec.prompt}\n\nVerbatim prior assistant response:\n${firstResponse}\n\nCurrent learner request:\n${spec.followup}`, tag: 'revision' };
}
function material(html) {
  const errors = [];
  const vc = new VirtualConsole();
  vc.on('jsdomError', error => { if (/unhandled/i.test(error.type || '')) errors.push(error.message); });
  const dom = new JSDOM(html, {
    url: BASE, runScripts: 'dangerously', virtualConsole: vc,
    beforeParse(window) { window.IntersectionObserver = class { observe() {} disconnect() {} }; }
  });
  if (errors.length) throw new Error(errors.join('\n'));
  const doc = dom.window.document;
  if (dom.window.A101Runtimes) dom.window.A101Runtimes.applyRuntime('cowork');
  else {
    [...doc.body.classList].filter(name => name.startsWith('runtime-')).forEach(name => doc.body.classList.remove(name));
    doc.body.classList.add('runtime-cowork');
  }
  function hidden(element) {
    for (let node = element; node && node.nodeType === 1; node = node.parentElement) {
      const style = dom.window.getComputedStyle(node);
      if (node.hidden || node.getAttribute('aria-hidden') === 'true' || style.display === 'none' || style.visibility === 'hidden') return true;
      if ([...node.classList].some(name => /^rt-profile-/.test(name) && name !== 'rt-profile-cowork')) return true;
      if (node.matches('.rt-cli,.rt-desktop,.rt-code')) return true;
    }
    return false;
  }
  function visibleText(node) {
    if (node.nodeType === 3) return node.textContent;
    if (node.nodeType !== 1 || hidden(node) || node.matches('script,style,button,svg')) return '';
    const tag = node.tagName;
    if (tag === 'PRE') return '\n```\n' + node.textContent.trimEnd() + '\n```\n';
    const inner = [...node.childNodes].map(visibleText).join('');
    if (/^H[1-6]$/.test(tag)) return '\n' + '#'.repeat(Number(tag[1])) + ' ' + inner.trim() + '\n';
    if (tag === 'A' && node.getAttribute('href')) return `[${inner.trim()}](${node.href})`;
    if (tag === 'DETAILS') return '\n[Expandable section; contents available when opened]\n' + inner + '\n';
    if (tag === 'BR') return '\n';
    return /^(P|DIV|SECTION|HEADER|NAV|LI|SUMMARY)$/.test(tag) ? '\n' + inner.trim() + '\n' : inner;
  }
  const codeBlocks = [...doc.querySelectorAll('.prompt-block pre code')];
  const bodies = codeBlocks.filter(el => !hidden(el)).map(el => el.textContent.trimEnd());
  const cliSnake = codeBlocks.find(el => el.closest('.rt-profile-cli') && el.textContent.startsWith('Build me a snake game'));
  const find = prefix => {
    const found = bodies.find(body => body.startsWith(prefix));
    if (!found) throw new Error(`Rendered prompt missing: ${prefix}`);
    return found;
  };
  const prompts = {
    extract: find('Extract the starter tarball'), baseline: find('Build me a personal HTML one-pager'),
    pause: find('Help me pause Agents 101'), resume: find('Help me resume Agents 101'),
    snake: cliSnake?.textContent.trimEnd() || find('Build me a snake game'), package: find('Write a generation rules file'), critic: find('Launch a fresh subagent')
  };
  const readerSections = [doc.querySelector('.a101-onboarding'), doc.querySelector('section#prework')];
  const controls = doc.querySelector('.a101-learning-controls');
  if (controls) readerSections.push(controls);
  const readerText = readerSections
    .map(node => { if (!node) throw new Error('Missing learner workbook section'); return visibleText(node); }).join('\n\n').replace(/\n{3,}/g, '\n\n').trim();
  const anchors = [...doc.querySelectorAll('[id]')].map(el => el.id);
  const externalAssets = [...doc.querySelectorAll('script[src],img[src],iframe[src],link[href]')]
    .map(el => el.getAttribute('src') || el.getAttribute('href')).filter(value => !value.startsWith('data:'));
  dom.window.close();
  return { prompts, readerText, anchors, externalAssets };
}
function unpack(archive, dir) {
  fs.mkdirSync(dir, { recursive: true });
  execFileSync('tar', ['xzf', archive, '-C', dir], { env: { ...process.env, LC_ALL: 'C' } });
}
function routeClosed(checkpoint, body, guide, anchors, bootstrap = '') {
  const loaded = body.includes('prework/course-navigation.md') || bootstrap.includes('prework/course-navigation.md');
  return [checkpoint.currentAnchor, checkpoint.nextAnchor].every(anchor => {
    const fragment = anchor.startsWith('#') ? anchor : '#' + anchor;
    return anchors.includes(fragment.slice(1)) && (body.includes(BASE + fragment) || (loaded && guide.includes(BASE + fragment)));
  });
}
function contractChecks(edition, content, out) {
  const archive = path.join(edition.trainingDir, 'agents-101-starter.tar.gz');
  const unpacked = path.join(out, 'contract-learner');
  unpack(archive, unpacked);
  const checkpoints = JSON.parse(read(path.join(ROOT, 'curriculum/delivery/agents-101-mvp/checkpoints.json')));
  const rows = [];
  const check = (outcome, id, action) => {
    try { rows.push({ outcome, id, status: action() ? 'pass' : 'fail' }); }
    catch (error) { rows.push({ outcome, id, status: 'fail', reason: error.message }); }
  };
  const files = snapshot(unpacked);
  const noRoot = !files['CLAUDE.md'] && !files['AGENTS.md'];
  check('ONB-01', 'rendered-start', () => content.anchors.includes('start-learning') && content.anchors.includes('prework') && noRoot);
  check('ONB-02', 'starter-homes', () => ['prework', 'memory', 'sources', 'agents', 'module-4/policies'].every(name => fs.statSync(path.join(unpacked, name)).isDirectory()));
  check('ONB-02', 'repeat-extraction-preserves-work', () => {
    write(path.join(unpacked, 'module-1/site.html'), 'Learner-owned output.');
    write(path.join(unpacked, 'memory/learner-note.md'), 'Learner-owned context.');
    const before = snapshot(unpacked);
    unpack(archive, unpacked);
    return changed(before, snapshot(unpacked)).length === 0;
  });
  check('ONB-03', 'checkpoint-route-closure', () => checkpoints.every(cp => {
    const body = read(path.join(unpacked, 'prompts', cp.key + '.md'));
    const guide = read(path.join(unpacked, 'prework/course-navigation.md'));
    const bootstrap = ['CLAUDE.md', 'AGENTS.md'].filter(name => fs.existsSync(path.join(unpacked, name))).map(name => read(path.join(unpacked, name))).join('\n');
    return routeClosed(cp, body, guide, content.anchors, bootstrap || content.prompts.extract);
  }));
  check('ONB-04', 'learner-owned-context', () => noRoot && !Object.keys(files).some(name => /^(?:\.claude|\.agents|module-1)\//.test(name)) && ['memory', 'sources', 'agents'].every(name => fs.readdirSync(path.join(out, 'contract-learner', name)).filter(entry => !['.keep', 'learner-note.md'].includes(entry)).length === 0) && content.prompts.baseline.endsWith('LinkedIn:'));
  check('ONB-05', 'pause-payload-available', () => content.anchors.includes('pause-learning') && content.prompts.pause.startsWith('Help me pause Agents 101'));
  check('ONB-06', 'resume-payload-available', () => content.anchors.includes('resume-learning') && content.prompts.resume.startsWith('Help me resume Agents 101'));
  check('ONB-07', 'fallback-targets-exist', () => ['prework', 'resume-learning', 'start-learning'].every(anchor => content.anchors.includes(anchor)));
  check('ONB-08', 'local-navigation-delivery', () => content.externalAssets.length === 0 && !/fonts\.(googleapis|gstatic)\.com/.test(read(edition.workbookFile)) && checkpoints.every(cp => !new URL(BASE + cp.nextAnchor).search));
  return rows;
}
function guideReadCheck(events, guide, dir, outcome = 'ONB-03', id = 'guide-read') {
  const requests = new Map();
  const target = path.resolve(dir, 'prework/course-navigation.md');
  const resolved = file => { try { return fs.realpathSync(path.resolve(dir, file)); } catch { return path.resolve(dir, file); } };
  const expectedPath = resolved(target);
  const contentOf = value => typeof value === 'string' ? value : Array.isArray(value) ? value.filter(block => block.type === 'text').map(block => block.text || '').join('\n') : '';
  const stripNumbers = value => value.replace(/^[ \t]*\d+(?:\t|→)/gm, '').trim();
  for (const event of events || []) {
    for (const block of event.message?.content || []) {
      if (block.type === 'tool_use') {
        if (block.name === 'Read' && typeof block.input?.file_path === 'string' && resolved(block.input.file_path) === expectedPath) requests.set(block.id, { name: 'Read', path: 'prework/course-navigation.md' });
        if (block.name === 'Bash' && typeof block.input?.command === 'string') {
          // A bounded equivalent read: cat the actual guide, with no fabricated
          // echo/body accepted as reading evidence. Full output must match below.
          const match = block.input.command.trim().match(/^cat\s+(?:--\s+)?(?:"([^"]+)"|'([^']+)'|([^\s;&|<>]+))\s*$/);
          if (match && resolved(match[1] || match[2] || match[3]) === expectedPath) requests.set(block.id, { name: 'Bash', path: 'prework/course-navigation.md' });
        }
      }
      if (block.type !== 'tool_result' || !requests.has(block.tool_use_id) || block.is_error === true) continue;
      const metadata = event.tool_use_result;
      if (metadata?.is_error === true || (typeof metadata?.exit_code === 'number' && metadata.exit_code !== 0) || (typeof metadata?.exitCode === 'number' && metadata.exitCode !== 0)) continue;
      const returned = [contentOf(block.content), typeof metadata?.stdout === 'string' ? metadata.stdout : ''];
      if (typeof guide === 'string' && guide.trim() && returned.some(value => stripNumbers(value) === guide.trim())) {
        return { id, outcome, status: 'pass', reason: 'A successful paired tool result returned the complete actual guide.', tool_use_id: block.tool_use_id, tool: requests.get(block.tool_use_id).name, file: 'prework/course-navigation.md', guide_sha256: sha(guide) };
      }
    }
  }
  return { id, outcome, status: 'not-run', reason: 'No successful paired Read or bounded cat result returned the complete actual navigation guide; a request or success claim alone is insufficient.' };
}
function invariantChecks(scenario, dir, before, after, options = {}) {
  const checks = [];
  const add = (id, outcome, ok, reason) => checks.push({ id, outcome, status: ok ? 'pass' : 'fail', reason });
  const changes = changed(before, after);
  const rootBody = after['CLAUDE.md'] ? read(path.join(dir, 'CLAUDE.md')) : '';
  const originalRoot = options.rootBefore ?? scenario.inspect.rootOriginal;
  const unchangedRoot = Boolean(before['CLAUDE.md']) && before['CLAUDE.md'] === after['CLAUDE.md'];
  const suffix = typeof originalRoot === 'string' && rootBody.startsWith(originalRoot) ? rootBody.slice(originalRoot.length) : null;
  const cueCount = rootBody.split(COURSE_READING_CUE).length - 1;
  const augmentedRoot = scenario.archive && typeof originalRoot === 'string' && sha(originalRoot) === before['CLAUDE.md'] && suffix !== null && cueCount === 1 && suffix.replace(COURSE_READING_CUE, '').trim() === '';
  const loaderAllowed = before['CLAUDE.md'] ? unchangedRoot || augmentedRoot
    : (!after['CLAUDE.md'] && !scenario.archive) || (scenario.archive === true && rootBody === NAVIGATION_LOADER);
  add('learner-root', 'ONB-04', !after['AGENTS.md'] && loaderAllowed, 'Preserve original root bytes; extraction may append only the single navigation cue, or create the exact loader in an empty folder.');
  if (scenario.inspect.rootIdempotent) {
    checks.push({ id: 'root-idempotent', outcome: 'ONB-04', status: !options.afterFirst ? 'not-run' : options.afterFirst['CLAUDE.md'] && options.afterFirst['CLAUDE.md'] === after['CLAUDE.md'] ? 'pass' : 'fail', reason: 'Repeated extraction must preserve the first extraction root bytes without duplicating the cue.' });
  }
  if (scenario.archive) {
    const expected = Object.entries(options.archiveFiles || {});
    const mutable = new Set(scenario.inspect.mutableArchiveFiles || []);
    const damaged = expected.filter(([name, hash]) => !mutable.has(name) && after[name] !== hash).map(([name]) => name);
    checks.push({ id: 'archive-integrity', outcome: 'ONB-02', status: !expected.length ? 'not-run' : damaged.length ? 'fail' : 'pass', reason: !expected.length ? 'Published archive snapshot is missing.' : damaged.length ? `Missing or changed published files: ${damaged.join(', ')}` : 'Every immutable archive file matches its published byte hash.' });
  }
  const outsideScope = changes.filter(name => !scenario.allowed(name));
  add('write-scope', scenario.id.startsWith('resume') ? 'ONB-06' : scenario.id.startsWith('pause') ? 'ONB-05' : 'ONB-02', !outsideScope.length, `Changed files: ${changes.length}; outside allowed scope: ${outsideScope.join(', ') || '(none)'}`);
  for (const name of scenario.inspect.required || []) add(`exists:${name}`, scenario.id.startsWith('pause') ? 'ONB-05' : scenario.id.startsWith('personal') ? 'ONB-04' : 'ONB-02', Boolean(after[name]), 'Required observed artifact.');
  for (const name of scenario.inspect.dirs || []) add(`directory:${name}`, 'ONB-02', fs.existsSync(path.join(dir, name)) && fs.statSync(path.join(dir, name)).isDirectory(), 'Required observed directory.');
  for (const name of scenario.inspect.preserve || []) add(`preserved:${name}`, scenario.id.startsWith('pause') ? 'ONB-05' : 'ONB-02', Boolean(before[name]) && before[name] === after[name], 'Existing learner file byte hash must survive.');
  for (const name of scenario.inspect.absent || []) add(`absent:${name}`, scenario.id.startsWith('resume') ? 'ONB-07' : 'ONB-03', !after[name], 'Unrequested activity/artifact stays absent.');
  if (scenario.inspect.privateNote) {
    const note = after['prework/learning-position.md'] ? read(path.join(dir, 'prework/learning-position.md')) : '';
    add('note-canaries', 'ONB-08', Boolean(note) && !/Mira Vale|Cedar Relay|CANARY-DO-NOT-SAVE-8421/i.test(note), 'Synthetic name, company and source canaries must not enter the position note.');
  }
  if (scenario.installed || scenario.archive) {
    const guideFile = path.join(dir, 'prework/course-navigation.md');
    const guide = fs.existsSync(guideFile) ? read(guideFile) : '';
    const outcome = scenario.archive ? 'ONB-02' : scenario.id.startsWith('resume') ? 'ONB-06' : scenario.id.startsWith('pause') ? 'ONB-05' : 'ONB-03';
    checks.push(guideReadCheck(options.events || [], guide, dir, outcome));
    if (scenario.coldFollowup) checks.push(guideReadCheck(options.coldEvents || [], guide, dir, 'ONB-06', 'cold-resume-guide-read'));
  }
  if (scenario.coldFollowup) {
    checks.push({ id: 'cold-resume-write-scope', outcome: 'ONB-06', status: !options.afterFirst ? 'not-run' : changed(options.afterFirst, after).length ? 'fail' : 'pass', reason: 'A cold resume must not mutate any learner file after pause.' });
  }
  return checks;
}
function observation(dir, before, after, responses, events, context = {}) {
  const files = {};
  const observedNames = [...new Set([...changed(before, after), ...(after['prework/learning-position.md'] ? ['prework/learning-position.md'] : [])])];
  for (const name of observedNames) {
    if (!after[name]) files[name] = '(deleted)';
    else if (/\.(md|txt|html)$/.test(name)) {
      let body = read(path.join(dir, name));
      if (name.endsWith('.html')) {
        const dom = new JSDOM(body); dom.window.document.querySelectorAll('style,script').forEach(el => el.remove());
        body = dom.window.document.body.textContent; dom.window.close();
      }
      files[name] = body.slice(0, 18000);
    }
  }
  const toolNames = new Map();
  for (const event of events) for (const block of event.message?.content || []) {
    if (block.type === 'tool_use') toolNames.set(block.id, block.name);
  }
  const literalStrings = (value, label) => typeof value === 'string' ? [`--- ${label} ---\n${value}`]
    : Array.isArray(value) ? value.flatMap((item, index) => literalStrings(item, `${label}[${index}]`))
      : value && typeof value === 'object' ? Object.entries(value).flatMap(([key, item]) => literalStrings(item, `${label}.${key}`)) : [];
  const toolSections = events.flatMap(event => (event.message?.content || []).flatMap(block => {
    if (block.type === 'tool_use') return [
      `=== ACTUAL TOOL REQUEST ${block.name} id=${block.id} ===\n${literalStrings(block.input, 'input').join('\n\n')}\n=== END TOOL REQUEST ${block.id} ===`
    ];
    if (block.type !== 'tool_result') return [];
    const name = toolNames.get(block.tool_use_id) || '(request name not captured)';
    const returned = typeof block.content === 'string' ? block.content : Array.isArray(block.content)
      ? block.content.map(item => typeof item === 'string' ? item : typeof item.text === 'string' ? item.text : '').join('\n') : '';
    const metadata = { ...(block.is_error !== undefined ? { is_error: block.is_error } : {}), ...(event.tool_use_result !== undefined ? { tool_use_result: event.tool_use_result } : {}) };
    return [`=== ACTUAL TOOL RESULT ${name} id=${block.tool_use_id} ===\n${returned}\n\n${literalStrings(event.tool_use_result, 'tool_result_metadata').join('\n\n')}\nResult error/structured metadata: ${JSON.stringify(metadata)}\n=== END TOOL RESULT ${block.tool_use_id} ===`];
  }));
  return [
    ...(typeof context.rootBefore === 'string' ? [`=== ORIGINAL LEARNER ROOT BEFORE THIS CASE ===\n${context.rootBefore}\n=== END ORIGINAL ROOT ===`] : []),
    ...responses.map((response, index) => `=== ACTUAL RESPONSE ${index + 1} ===\n${response}\n=== END RESPONSE ${index + 1} ===`),
    ...Object.entries(files).map(([name, body]) => `=== OBSERVED FILE ${name} ===\n${body}\n=== END FILE ${name} ===`),
    ...toolSections,
    '=== FILE METADATA AND TOOL EVENTS JSON ===',
    JSON.stringify({ changed: changed(before, after), present_files: Object.keys(after), tool_events: events }, null, 2)
  ].join('\n\n');
}
function aggregate(definitions, contracts, cases, expected = []) {
  const expectedRows = expected.map(item => typeof item === 'string' ? { id: item } : item);
  const missing = expectedRows.filter(item => !cases.some(row => row.id === item.id)).map(item => item.id);
  const combine = rows => !rows.length ? 'not-run' : rows.some(row => row.status === 'fail') ? 'fail'
    : rows.some(row => row.status === 'blocked' || !['pass', 'fail', 'not-run'].includes(row.status)) ? 'blocked'
      : rows.some(row => row.status === 'not-run') ? 'not-run' : 'pass';
  const outcomes = definitions.outcomes.map(outcome => {
    const evidence = outcome.required_evidence.map(level => {
      const selected = level === 'contract' ? contracts.filter(row => row.outcome === outcome.id) : [];
      if (level !== 'contract') {
        for (const row of cases.filter(row => row.level === level)) {
          const checks = (row.checks || []).filter(check => check.outcome === outcome.id);
          selected.push(...checks.map(check => ({ ...check, case_id: row.id })));
          const spec = expectedRows.find(item => item.id === row.id);
          if (row.error && (checks.length || spec?.outcomes?.includes(outcome.id))) selected.push({ id: 'case-error', case_id: row.id, status: 'blocked', reason: row.error });
        }
        for (const spec of expectedRows.filter(item => (!item.level || item.level === level) && (!item.outcomes || item.outcomes.includes(outcome.id)))) {
          const row = cases.find(item => item.id === spec.id && item.level === level);
          if (!row || !(row.checks || []).some(check => check.outcome === outcome.id)) {
            selected.push({ id: 'missing-case-evidence', case_id: spec.id, status: 'not-run', reason: 'Required scenario evidence is missing for this outcome and layer.' });
          }
        }
      }
      const status = combine(selected);
      return { level, status, checks: selected };
    });
    const status = combine(evidence);
    return { ...outcome, status, evidence };
  });
  return { outcomes, missing_cases: missing };
}
function markdown(report) {
  return ['# Agents 101 onboarding simulation', '', `Mode: ${report.mode}. Evidence: synthetic learners and disposable folders. Native Cowork: not run.`, '',
    '| Outcome | Status | Evidence |', '| --- | --- | --- |',
    ...report.outcomes.map(row => `| ${row.id} ${row.name} | ${row.status} | ${row.evidence.map(item => `${item.level}: ${item.status}`).join('; ')} |`), '',
    `CLI invocations: ${report.calls}. Source revision: ${report.revision}. Workbook SHA256: ${report.fingerprints.workbook}.`, '',
    `Evidence root: ${report.evidence_root}. Source drift: ${report.source_drift.status}. Start/end manifests: source-start.json / source-end.json.`, '',
    '## Model and CLI evidence', '', ...report.model_calls.map(call => `- ${call.directory}/${call.tag}: ${call.status}; model ${call.model_actual || 'unavailable'}; CLI ${call.cli_version || 'unavailable'}; status ${call.raw.status || 'not written'}; raw events ${call.raw.stdout || 'not written'}; loaded context ${call.raw.context || 'none'}.`), '',
    '## Scenario observations', '', ...report.cases.map(row => `- ${row.id}: ${row.error || row.checks.map(check => `${check.id}=${check.status}${check.reason ? ': ' + check.reason : ''}`).join('; ')}`), '',
    `Missing cases: ${report.missing_cases.join(', ') || 'none'}.`, '',
    '## Instrument controls', '', ...report.controls.map(row => `- ${row.id}: ${row.status}${row.reason ? ': ' + row.reason : ''}`), '',
    'A model-runtime pass is CLI filesystem evidence. The harness explicitly loads only the actual local CLAUDE.md pointer into actor context; the actor must read the guide itself. This does not prove native instruction autoload or Cowork behavior. Persona evidence records intended actions with the workbook open. Notes-only cold recall is a separate diagnostic, not a prerequisite for using Resume. Neither establishes human follow-through, completion rates, or a population success probability. Raw evidence paths above are relative to the evidence root.', ''].join('\n');
}
async function run(options = {}) {
  const mode = options.mode || 'contract';
  if (!['contract', 'live'].includes(mode)) throw new Error('mode must be contract or live');
  const out = path.resolve(options.out || path.join(__dirname, 'out', crypto.randomUUID()));
  if (fs.existsSync(path.join(out, 'result.json'))) throw new Error('Choose a fresh evidence directory; previous results must not be mixed with this run.');
  fs.mkdirSync(out, { recursive: true });
  const gitState = () => ({ revision: execFileSync('git', ['rev-parse', 'HEAD'], { cwd: ROOT, encoding: 'utf8' }).trim(), git_status: execFileSync('git', ['status', '--porcelain=v1', '--untracked-files=normal'], { cwd: ROOT, encoding: 'utf8' }).trimEnd().split('\n').filter(Boolean) });
  const sourceStart = { at: new Date().toISOString(), ...gitState(), files: sourceFingerprints() };
  write(path.join(out, 'source-start.json'), sourceStart);
  const edition = buildEdition({ outputDir: path.join(out, 'material'), quiet: true });
  const materialHashes = { workbook: sha(fs.readFileSync(edition.workbookFile)), starter: sha(fs.readFileSync(path.join(edition.trainingDir, 'agents-101-starter.tar.gz'))) };
  write(path.join(out, 'material-inputs.json'), materialHashes);
  const content = material(read(edition.workbookFile));
  const definitions = JSON.parse(read(path.join(__dirname, 'outcomes.json')));
  const contracts = contractChecks(edition, content, out);
  const archiveSnapshotDir = path.join(out, 'archive-snapshot');
  unpack(path.join(edition.trainingDir, 'agents-101-starter.tar.gz'), archiveSnapshotDir);
  const archiveFiles = snapshot(archiveSnapshotDir);
  write(path.join(out, 'archive-snapshot.json'), archiveFiles);
  const specs = scenarios(content.prompts, archiveFiles);
  const cases = [], controls = [], modelCalls = [];
  let calls = 0;
  const call = async args => {
    if (++calls > (options.maxCalls || 48)) throw new Error('Simulation CLI invocation limit reached.');
    const empty = args.tools ? null : fs.mkdtempSync(path.join(os.tmpdir(), 'a101-onboarding-reader-'));
    args = actorContext(args);
    if (args.contextReceipt) write(path.join(args.outputDir, args.tag + '.context.json'), args.contextReceipt);
    let result, error;
    try { result = await require('./model').callModel({ ...args, cwd: empty || args.cwd, timeoutMs: options.timeoutMs || 120000 }); return result; }
    catch (caught) { error = caught; throw caught; }
    finally {
      modelCalls.push(callRecord(args, out, result, error));
      if (empty) fs.rmSync(empty, { recursive: true, force: true });
    }
  };
  const personas = ['cfo-sceptic', 'ingrid', 'cto-builder'];
  const readerCriteria = [
    criterion('start-route', 'ONB-01', 'The intended actions use the workbook and one training folder with Cowork or another runtime explicitly offered by the workbook. A deliberate choice of an offered CLI is valid; requiring a repository clone, an unoffered developer setup, or a separate Teacher task is not.'),
    criterion('workbook-owns-sequence', 'ONB-03', 'With the workbook open, the recovery answer locates the visible Resume instructions or the relevant workbook section and uses their supplied request; it does not delegate invention of the whole course sequence to the agent.'),
    criterion('recover-route', 'ONB-07', 'With the workbook open, the recovery answer uses the existing training folder and visible Resume instructions to recover the local position; missing/unclear progress is surfaced rather than invented or treated as completion.')
  ];
  const expected = mode === 'live' ? [
    ...specs.map(spec => ({ id: spec.id, level: 'model-runtime', outcomes: [...new Set([...spec.checks.map(check => check.outcome), 'ONB-04', spec.id.startsWith('resume') ? 'ONB-06' : spec.id.startsWith('pause') ? 'ONB-05' : 'ONB-02'])] })),
    ...personas.map(id => ({ id: `reader-${id}`, level: 'persona', outcomes: readerCriteria.map(check => check.outcome) })),
    { id: 'cold-critic-comparison', level: 'model-runtime', outcomes: ['ONB-03'] }
  ] : [];
  if (mode === 'live') cases.push({
    id: 'cold-critic-comparison', level: 'model-runtime', context: 'Not executed; required fresh-subagent behavior and subsequent human comparison remain unobserved.',
    checks: [{ id: 'fresh-subagent-and-human-comparison', outcome: 'ONB-03', status: 'not-run',
      reason: 'The isolated actor adapter has no Agent tool. It cannot prove a fresh critic or learner comparison. Native Cowork was not run; no substitute model response is counted as success.' }]
  });
  if (mode === 'live' && contracts.every(row => row.status === 'pass')) {
    // Check the independent scorer with one good observation and deliberately damaged ones.
    for (const [id, text, expectedStatus] of [
      ['judge-good', `The game is written. Open and play it: ${BASE}#4-build-a-snake-game-10-min. I will wait.`, 'pass'],
      ['judge-missing-return', 'The game is written. I have started the meetings exercise for you.', 'fail']
    ]) {
      try {
        const judged = await judgeCase({ caseId: id, facts: 'Game written; learner has not played it; next step is learner play, not meetings.', criteria: [criterion('return-and-wait', 'ONB-03', `Returns ${BASE}#4-build-a-snake-game-10-min for learner play and waits before the next activity.`)], observation: text, call, outputDir: path.join(out, id) });
        controls.push({ id, status: judged.criteria[0].status === expectedStatus ? 'pass' : 'fail', observed: judged.criteria[0] });
      } catch (error) { controls.push({ id, status: 'blocked', reason: error.message }); }
    }
    if (controls.every(row => row.status === 'pass')) {
      await require('../../teaching/lib').pool(specs, async spec => {
        const caseDir = path.join(out, spec.id);
        const learner = fs.mkdtempSync(path.join(os.tmpdir(), 'a101-onboarding-learner-'));
        const row = { id: spec.id, level: 'model-runtime', evidence_directory: path.relative(out, caseDir), seeded_navigation_loader: Boolean(spec.installed), context: spec.coldFollowup ? 'actual pause followed by cold resume in a new CLI process, same learner folder, no prior history replay' : spec.followup ? 'fresh process plus verbatim prior-turn replay for revision' : 'fresh process; seeded files and stated learner facts', checks: [] };
        try {
          const archive = path.join(edition.trainingDir, 'agents-101-starter.tar.gz');
          if (spec.installed) {
            unpack(archive, learner);
            write(path.join(learner, 'CLAUDE.md'), NAVIGATION_LOADER);
          }
          if (spec.archive) fs.copyFileSync(archive, path.join(learner, 'agents-101-starter.tar.gz'));
          for (const [name, value] of Object.entries(spec.files)) {
            if (value === null) fs.rmSync(path.join(learner, name), { force: true });
            else write(path.join(learner, name), value);
          }
          const before = snapshot(learner);
          const rootBefore = before['CLAUDE.md'] ? read(path.join(learner, 'CLAUDE.md')) : undefined;
          write(path.join(caseDir, 'before.json'), before);
          const first = await call({ prompt: spec.prompt, cwd: learner, tools: true, outputDir: caseDir, tag: 'actor' });
          const responses = [first.text];
          const events = [...first.events];
          let afterFirst, coldEvents = [];
          if (spec.followup || spec.coldFollowup) {
            afterFirst = snapshot(learner);
            write(path.join(caseDir, 'after-first.json'), afterFirst);
            const second = await call({ ...followupRequest(spec, first.text), cwd: learner, tools: true, outputDir: caseDir });
            responses.push(second.text); events.push(...second.events);
            if (spec.coldFollowup) coldEvents = second.events;
          }
          const after = snapshot(learner);
          write(path.join(caseDir, 'after.json'), after);
          row.checks.push(...invariantChecks(spec, learner, before, after, { archiveFiles, rootBefore, afterFirst, events: first.events, coldEvents }));
          const observed = observation(learner, before, after, responses, events, { rootBefore });
          write(path.join(caseDir, 'observation.txt'), observed);
          const judged = await judgeCase({ caseId: spec.id, facts: spec.facts, criteria: spec.checks, observation: observed, call, outputDir: caseDir });
          row.checks.push(...judged.criteria.map(check => ({ ...check, outcome: spec.checks.find(item => item.id === check.id).outcome })));
        } catch (error) {
          row.error = error.message;
          row.checks.push(...spec.checks.map(check => ({ ...check, status: 'blocked', reason: error.message })));
        }
        cases.push(row); write(path.join(caseDir, 'result.json'), row);
        fs.cpSync(learner, path.join(caseDir, 'learner-files'), { recursive: true });
        fs.rmSync(learner, { recursive: true, force: true });
        console.error(`[onboarding] ${row.id}: ${row.error || row.checks.filter(check => check.status !== 'pass').map(check => check.id + '=' + check.status).join(', ') || 'pass'}`);
      }, options.jobs || 2);
      await require('../../teaching/lib').pool(personas, async personaId => {
        const id = `reader-${personaId}`, caseDir = path.join(out, id);
        const row = { id, level: 'persona', evidence_directory: path.relative(out, caseDir), checks: [] };
        try {
          const task = 'You have returned with Module 1 unfinished and no old chat. What do you do next, and where do the next exercise instructions come from? If your position note is missing, what would you do?';
          const result = await simulateReader({ personaId, material: content.readerText, probe: task, openProbe: task, call, outputDir: caseDir, tag: id });
          row.persona_hash = result.personaHash;
          row.cold_probe = { purpose: result.coldProbePurpose, answer: result.probe.answer };
          row.open_workbook_probe = result.openWorkbook;
          write(path.join(caseDir, 'reader.json'), result);
          const observed = [
            '=== LEARNER WALK NOTES ===', ...result.walk.notes,
            '=== INTENDED LEARNER ACTIONS ===', ...result.walk.actions,
            '=== LEARNER CONFUSION ===', ...result.walk.confusion,
            '=== OPEN WORKBOOK RECOVERY ANSWER ===', result.openWorkbook.answer
          ].join('\n');
          write(path.join(caseDir, 'observation.txt'), observed);
          const judged = await judgeCase({ caseId: id, facts: 'These are simulated intended actions and an open-workbook recovery answer, not executed actions or real learner evidence. Evaluate the visible supported runtime choices fairly. Notes-only recall is recorded separately as diagnostic transfer, not a recovery prerequisite.', criteria: readerCriteria, observation: observed, call, outputDir: caseDir, tag: id });
          row.checks.push(...judged.criteria.map(check => ({ ...check, outcome: readerCriteria.find(item => item.id === check.id).outcome })));
        } catch (error) { row.error = error.message; row.checks.push(...['ONB-01', 'ONB-03', 'ONB-07'].map(outcome => ({ id: 'reader-incomplete', outcome, status: 'blocked', reason: error.message }))); }
        cases.push(row); write(path.join(caseDir, 'result.json'), row);
        console.error(`[onboarding] ${id}: ${row.error || row.checks.map(check => check.status).join('/')}`);
      }, options.jobs || 2);
    }
  }
  const sourceEnd = { at: new Date().toISOString(), ...gitState(), files: sourceFingerprints() };
  write(path.join(out, 'source-end.json'), sourceEnd);
  const drift = driftCheck(sourceStart, sourceEnd);
  if (materialHashes.workbook !== sha(fs.readFileSync(edition.workbookFile)) || materialHashes.starter !== sha(fs.readFileSync(path.join(edition.trainingDir, 'agents-101-starter.tar.gz')))) {
    drift.status = 'blocked'; drift.reason = 'Generated workbook or starter changed during execution.';
  }
  controls.push(drift);
  const aggregated = aggregate(definitions, contracts, cases, expected);
  if (drift.status !== 'pass') {
    for (const outcome of aggregated.outcomes) if (outcome.status === 'pass') outcome.status = 'blocked';
  }
  const report = {
    schema_version: 2, mode, generated_at: new Date().toISOString(), revision: sourceStart.revision, calls: modelCalls.length, attempted_calls: calls,
    evidence_root: path.relative(ROOT, out).startsWith('..') ? displayPath(out) : path.relative(ROOT, out), evidence_root_base: 'repository root unless absolute or ~-prefixed',
    source_start: 'source-start.json', source_end: 'source-end.json', source_drift: drift,
    model_calls: modelCalls.sort((a, b) => `${a.directory}/${a.tag}`.localeCompare(`${b.directory}/${b.tag}`)),
    fingerprints: { ...materialHashes, sources: sourceStart.files, outcomes: sourceStart.files['curriculum/evals/onboarding/agents-101/outcomes.json'], runner: sourceStart.files['curriculum/evals/onboarding/agents-101/run.js'], scenarios: sourceStart.files['curriculum/evals/onboarding/agents-101/scenarios.js'], evaluator: sourceStart.files['curriculum/evals/onboarding/agents-101/evaluate.js'], model_adapter: sourceStart.files['curriculum/evals/onboarding/agents-101/model.js'], personas: Object.fromEntries(personas.map(id => [id, loadPersona(path.resolve(__dirname, '../../personas/agents-101'), id).hash])) },
    contracts, cases: cases.sort((a, b) => a.id.localeCompare(b.id)), controls, ...aggregated
  };
  write(path.join(out, 'result.json'), report); write(path.join(out, 'report.md'), markdown(report));
  write(path.join(__dirname, 'latest-report.json'), report); write(path.join(__dirname, 'latest-report.md'), markdown(report));
  console.log(markdown(report));
  const failed = contracts.some(row => row.status !== 'pass') || controls.some(row => row.status !== 'pass') || cases.some(row => row.error || row.checks.some(check => check.status !== 'pass'));
  return { report, out, exitCode: failed || report.missing_cases.length ? 3 : 0 };
}

module.exports = { run, material, snapshot, changed, aggregate, invariantChecks, contractChecks, observation, sourceFingerprints, driftCheck, callRecord, routeClosed, actorContext, NAVIGATION_LOADER, guideReadCheck, followupRequest };
