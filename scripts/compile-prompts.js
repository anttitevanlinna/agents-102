#!/usr/bin/env node
// Compile curriculum/prompts/*.md → site/prompts.json (the registry served to
// the SPA at runtime). The build-workbook.js path inlines prompts at build
// time using loadRegistry() from this module directly; the SPA fetches the
// JSON file and runs the same expander client-side.
//
// Each prompt is one .md file with frontmatter:
//   ---
//   key: a101-prework-extract-tarball
//   dest: Claude Code           # default; renders as destination chip label
//   context: optional           # optional, becomes em-paren note after dest
//   permission-mode: plan       # optional; renders as a separate mode chip in
//                               # the prompt header. canonical Claude Code mode
//                               # tokens: default | acceptEdits | plan | auto |
//                               # bypassPermissions. omit when mode is not
//                               # load-bearing for the paste — no chip renders.
//   runtime: any                # any | cli | cowork | desktop (informational)
//   origin: agents-101/prework  # documentation-only; helps grep
//   requires:                   # optional; artefacts this prompt depends on
//     - id: <stable-id>
//       source: prompt:<key> | module:<slug> | scrollback (...) | external
//       conditional: <flag>     # optional, e.g. m3-completed
//   produces:                   # optional; artefacts this prompt creates
//     - id: <stable-id>
//       location: <path or scrollback>
//       consumed-by:            # optional, BEST-EFFORT forward index, NOT
//         - prompt:<key>        # authoritative and NOT validated. The canonical
//                               # dependency edge is the consumer's `requires:`
//                               # — validate-prompt-graph.js checks that. This
//                               # reverse list is a human reading aid that may
//                               # drift; don't rely on it for resolution.
//   opportunistic-copy:         # optional; uses-if-present, no-ops if absent
//     - id: <stable-id>
//       if-present-at: <path>
//       rationale: <one line>
//   anchors:                    # optional; future prompt-anatomy highlight metadata
//     - move: <move-name>
//       span: <quoted clause>
//   note: <one-liner>           # optional; informal carve-out / context
//   ---
//   <prompt body — what the student copies>
//
// Usage:
//   node scripts/compile-prompts.js          # write site/prompts.json
//   const { loadRegistry } = require('./compile-prompts.js')  // build path

const fs = require('fs');
const path = require('path');
const fm = require('front-matter');
const A101Runtimes = require('../site/layouts/a101-runtimes.js');

const ROOT = path.resolve(__dirname, '..');
const PROMPTS_DIR = path.join(ROOT, 'curriculum/prompts');
const OUT_FILE = path.join(ROOT, 'site/prompts.json');
const ARTIFACT_RE = /\{\{artifact:([a-z0-9-]+)\}\}/g;
const CAPABILITY_TOKEN_RE = /\{\{(\/|#)capability:([a-z0-9-]+)\}\}/g;
const UNRESOLVED_RUNTIME_RE = /\{\{(?:artifact:|[#/]capability:)/;
const KNOWN_CAPABILITIES = new Set(
  A101Runtimes.PROFILE_ORDER.flatMap(
    (key) => A101Runtimes.PROFILES[key].capabilities
  )
);
const VALIDATION_TARGETS = Object.freeze([
  Object.freeze({ training: 'agentic-engineering-101', profile: '' }),
  ...A101Runtimes.PROFILE_ORDER.map((profile) =>
    Object.freeze({ training: 'agents-101', profile })
  ),
]);

function loadSourceRegistry(promptsDir) {
  const dir = promptsDir || PROMPTS_DIR;
  const registry = {};
  if (!fs.existsSync(dir)) return registry;

  for (const file of fs.readdirSync(dir).sort()) {
    if (!file.endsWith('.md') || file === 'README.md') continue;
    const abs = path.join(dir, file);
    const raw = fs.readFileSync(abs, 'utf8');
    let parsed;
    try {
      parsed = fm(raw);
    } catch (e) {
      throw new Error(`${file}: frontmatter parse failed — ${e.message}`);
    }
    const meta = parsed.attributes || {};
    const key = meta.key;
    if (!key) throw new Error(`${file}: missing required frontmatter field 'key'`);
    if (registry[key]) throw new Error(`${file}: duplicate key '${key}' (also in another file)`);
    if (key !== file.replace(/\.md$/, '')) {
      throw new Error(`${file}: filename must match key (expected ${key}.md)`);
    }
    const text = parsed.body.replace(/^\n+/, '').replace(/\n+$/, '');
    if (!text) throw new Error(`${file}: prompt body is empty`);
    const entry = {
      key: key,
      dest: meta.dest || 'Claude Code',
      context: meta.context || '',
      runtime: meta.runtime || 'any',
      origin: meta.origin || '',
      text: text
    };
    // Pass through metadata fields when present. Inert at the SPA layer today
    // (renderer uses dest/context/text only) but consumed by:
    //   - lint / audit scripts that walk the dependency graph
    //   - future prompt-anatomy highlight tooling (anchors)
    //   - downstream tooling that needs to find producers / consumers by id
    // Keep these optional; absence is normal for short / supplementary prompts.
    for (const field of ['requires', 'produces', 'opportunistic-copy', 'opportunistic-copy-by', 'anchors', 'note', 'permission-mode']) {
      if (meta[field] !== undefined) entry[field] = meta[field];
    }
    registry[key] = entry;
  }
  return registry;
}

function resolveCapabilityBlocks(input, profile, label) {
  CAPABILITY_TOKEN_RE.lastIndex = 0;
  let output = '';
  let cursor = 0;
  let open = null;
  let match;

  while ((match = CAPABILITY_TOKEN_RE.exec(input)) !== null) {
    const closing = match[1] === '/';
    const capability = match[2];

    if (!KNOWN_CAPABILITIES.has(capability)) {
      throw new Error(`${label}: unknown capability '${capability}'`);
    }

    if (!closing) {
      if (open) {
        throw new Error(`${label}: nested capability block '${capability}' inside '${open.name}'`);
      }
      output += input.slice(cursor, match.index);
      open = {
        name: capability,
        include: profile.capabilities.includes(capability),
      };
      cursor = match.index + match[0].length;
      continue;
    }

    if (!open) {
      throw new Error(`${label}: unmatched capability close '${capability}'`);
    }
    if (open.name !== capability) {
      throw new Error(
        `${label}: capability close '${capability}' does not match '${open.name}'`
      );
    }
    if (open.include) output += input.slice(cursor, match.index);
    open = null;
    cursor = match.index + match[0].length;
  }

  if (open) {
    throw new Error(`${label}: unclosed capability block '${open.name}'`);
  }
  return output + input.slice(cursor);
}

function resolveTemplate(value, profileOrKey, label) {
  const profile = typeof profileOrKey === 'string'
    ? A101Runtimes.getProfile(profileOrKey)
    : profileOrKey;
  const where = label || 'runtime template';
  let output = resolveCapabilityBlocks(String(value), profile, where);

  ARTIFACT_RE.lastIndex = 0;
  output = output.replace(ARTIFACT_RE, (match, identity) => {
    if (!Object.prototype.hasOwnProperty.call(profile.artifacts, identity)) {
      throw new Error(`${where}: unknown artifact identity '${identity}'`);
    }
    return profile.artifacts[identity];
  });

  if (UNRESOLVED_RUNTIME_RE.test(output)) {
    throw new Error(`${where}: unresolved runtime expression`);
  }
  return output;
}

function resolveValue(value, profile, label, pathParts) {
  const parts = pathParts || [];
  if (typeof value === 'string') {
    if (parts[parts.length - 1] === 'id' && UNRESOLVED_RUNTIME_RE.test(value)) {
      throw new Error(`${label}: runtime expressions are not allowed in logical id`);
    }
    return resolveTemplate(value, profile, `${label} ${parts.join('.') || 'value'}`);
  }
  if (Array.isArray(value)) {
    return value.map((item, index) =>
      resolveValue(item, profile, label, parts.concat(String(index)))
    );
  }
  if (value && typeof value === 'object') {
    const resolved = {};
    for (const [key, child] of Object.entries(value)) {
      resolved[key] = resolveValue(child, profile, label, parts.concat(key));
    }
    return resolved;
  }
  return value;
}

function resolveEntry(sourceEntry, profileKey) {
  const profile = A101Runtimes.getProfile(profileKey);
  return resolveValue(sourceEntry, profile, sourceEntry.key, []);
}

function legacyProfileForRuntime(runtime) {
  if (runtime === 'cowork') return 'cowork';
  if (runtime === 'desktop') return 'desktop';
  if (runtime === 'cli') return 'cli';
  return A101Runtimes.DEFAULT_PROFILE;
}

function compileEntry(sourceEntry) {
  const profileKeys = A101Runtimes.compatibleProfiles(sourceEntry.runtime || 'any');
  const runtimeVariants = {};
  for (const profileKey of profileKeys) {
    runtimeVariants[profileKey] = resolveEntry(sourceEntry, profileKey);
  }
  const legacyProfile = legacyProfileForRuntime(sourceEntry.runtime || 'any');
  const legacyEntry = runtimeVariants[legacyProfile];
  if (!legacyEntry) {
    throw new Error(
      `${sourceEntry.key}: no legacy Claude profile for runtime '${sourceEntry.runtime}'`
    );
  }
  return Object.assign({}, legacyEntry, { runtimeVariants });
}

function loadRegistry(promptsDir) {
  const sourceRegistry = loadSourceRegistry(promptsDir);
  const registry = {};
  for (const [key, sourceEntry] of Object.entries(sourceRegistry)) {
    registry[key] = compileEntry(sourceEntry);
  }
  return registry;
}

function registryForProfile(compiledRegistry, profileKey) {
  A101Runtimes.getProfile(profileKey);
  const registry = {};
  for (const [key, entry] of Object.entries(compiledRegistry)) {
    if (!entry.runtimeVariants || !entry.runtimeVariants[profileKey]) continue;
    registry[key] = entry.runtimeVariants[profileKey];
  }
  return registry;
}

function writeRegistry(registry, outFile) {
  const out = outFile || OUT_FILE;
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, JSON.stringify(registry, null, 2) + '\n');
  return out;
}

if (require.main === module) {
  const registry = loadRegistry();
  const out = writeRegistry(registry);
  const count = Object.keys(registry).length;
  console.log(`Compiled ${count} prompts to ${path.relative(ROOT, out)}`);

  // Gate the build on the prompt dependency graph. Compiling emits JSON but
  // says nothing about artefact ordering; run the validator as a sibling so a
  // premature-read / dangling-require can't pass the build. A child process
  // keeps the two modules decoupled (no require cycle) and propagates the exit
  // code. Every training with a normalized graph is validated here: a graph
  // that is only checked on demand goes stale, which is how Agents 101 came to
  // carry fifteen errors nobody saw.
  const { execFileSync } = require('child_process');
  try {
    for (const target of VALIDATION_TARGETS) {
      const args = [
        path.join(__dirname, 'validate-prompt-graph.js'),
        '--training', target.training,
      ];
      if (target.profile) args.push('--runtime', target.profile);
      execFileSync(
        process.execPath,
        args,
        { stdio: 'inherit' }
      );
    }
  } catch (e) {
    console.error('\nPrompt dependency-graph validation failed — see errors above. Build aborted.');
    process.exit(1);
  }

  // Mechanical lint of prompt BODIES against the grep-decidable check_prompts
  // rules (§1/§4/§9/§24/§28/§31/§32). Sibling child process, same decoupling as
  // the graph validator. Gates the build on Sev-1 (cold-run / render breakers);
  // Sev-2 quality findings print but don't abort. Whole registry, all trainings.
  try {
    execFileSync(
      process.execPath,
      [path.join(__dirname, 'lint-prompt-bodies.js')],
      { stdio: 'inherit' }
    );
  } catch (e) {
    console.error('\nPrompt-body lint found Sev-1 violations — see above. Build aborted.');
    process.exit(1);
  }
}

module.exports = {
  loadSourceRegistry,
  loadRegistry,
  registryForProfile,
  resolveTemplate,
  resolveEntry,
  writeRegistry,
  PROMPTS_DIR,
  OUT_FILE,
  VALIDATION_TARGETS,
};
