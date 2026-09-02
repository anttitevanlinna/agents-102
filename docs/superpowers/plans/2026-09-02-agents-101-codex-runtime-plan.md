# Agents 101 Codex Runtime Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add Codex Desktop and Codex CLI as real Agents 101 runtimes, backed by one runtime-neutral prompt chain and an eight-module live Codex CLI simulation.

**Architecture:** Keep the canonical prompt sources single and introduce a small Agents 101 runtime-profile extension that binds logical artifacts to concrete Claude or Codex paths. Compile per-profile prompt variants once, let the Agents 101 site and runner consume those exact variants, and put Claude/tmux plus Codex exec/resume behind one runner lifecycle. Keep the shared AE101 rendering path unchanged.

**Tech Stack:** Node.js 22/CommonJS, browser-safe UMD JavaScript, Bash 3.2-compatible shell, Node's built-in test runner, tmux, Codex CLI JSONL (`exec --json` and exact-thread `exec resume`).

**Spec:** `docs/superpowers/specs/2026-09-02-agents-101-codex-runtime-design.md`

## Global Constraints

- Scope is Agents 101 only; do not edit or regenerate AE101 prompts, curriculum, scenarios, artifacts, client files, or runner behavior.
- Keep one canonical prompt body. Do not create Claude/Codex sibling prompt files.
- Logical artifact `root-instructions` binds to `CLAUDE.md` for Claude and `AGENTS.md` for Codex.
- Logical artifact `project-skills` binds to `.claude/skills` for Claude and `.agents/skills` for Codex.
- Student-visible compiled prompts contain concrete paths and no unresolved runtime expressions.
- The site and runner use the same compiled prompt text before runner-only headless controls.
- Existing Claude commands default to Claude CLI behavior.
- Every prompt-body edit requires its own BEFORE / AFTER / WHY / RISK card, the exact `prompt-ok` approval token, and `.claude/prompt-approvals/<key>.confirmed` before editing.
- Use TDD for implementation tasks: observe the failing test, write the minimum implementation, then rerun the focused and regression tests.
- Do not claim the whole repository test suite is green: the branch starts with two unrelated dangling-path failures. Completion means no new failures plus all Agents 101/Codex tests green.
- Commit only named task files with `git commit -m <message> --only -- <paths>`; never include baseline-generated `site/figures.json` or unrelated prompt-registry drift accidentally.

## File and Interface Map

### Runtime profiles and prompt compilation

- Create `site/layouts/a101-runtimes.js`: browser/Node UMD module containing the five profile records, compatibility rules, runtime switcher renderer, and Agents 101-only multi-profile prompt expansion.
- Create `site/layouts/a101-runtimes.css`: selectors for five body runtime classes, existing `.rt-*` content forks, and generated `.rt-profile-*` prompt variants.
- Modify `scripts/compile-prompts.js`: parse canonical prompt sources, resolve logical artifacts and capability blocks, and attach full per-profile variants while preserving the legacy top-level Claude entry.
- Create `scripts/compile-prompts.test.js`: fixture-driven compiler tests.
- Create `scripts/resolve-prompt.js`: command-line projection of one compiled prompt key/profile for the runner.
- Modify `scripts/validate-prompt-graph.js` and `scripts/validate-prompt-graph.test.js`: validate the 93-prompt graph per profile.

### Agents 101 presentation

- Modify `site/curriculum.html`: replace hard-coded runtime buttons with an empty mount and load the Agents 101 extension assets.
- Modify `site/layouts/curriculum-spa.js`: delegate only Agents 101 runtime selection and prompt expansion to `A101Runtimes`.
- Modify `scripts/build-workbook.js`: use and inline the extension only for Agents 101; retain the current code path for every other training.
- Create `scripts/a101-runtime-site.test.js`: pure/runtime and source-isolation tests.

### Simulation transport and scenarios

- Modify `curriculum/evals/mechanical/tmux-runner/lib/resolve-prompt.sh`: call the Node resolver with an explicit profile instead of stripping Markdown frontmatter itself.
- Create `curriculum/evals/mechanical/tmux-runner/lib/transport.sh`: transport dispatcher exposing `transport_open`, `transport_turn`, and `transport_close`.
- Create `curriculum/evals/mechanical/tmux-runner/transports/claude-tmux.sh`: existing tmux lifecycle behind the transport contract.
- Create `curriculum/evals/mechanical/tmux-runner/transports/codex-exec.sh`: `codex exec`/resume lifecycle and evidence capture.
- Create `curriculum/evals/mechanical/tmux-runner/lib/parse-codex-jsonl.js`: strict JSONL parser and normalized status writer.
- Create `curriculum/evals/mechanical/tmux-runner/tests/codex-transport.test.sh` and `fixtures/fake-codex`: deterministic transport contract tests.
- Modify `curriculum/evals/mechanical/tmux-runner/run-a101.sh`: explicit runtime profile, logical artifact assertions, shared turn lifecycle, structured control tokens, and M7/M8 assertion cases.
- Modify `curriculum/evals/mechanical/tmux-runner/chain-agents-101.sh`: profile argument and Modules 7–8.
- Modify `curriculum/evals/mechanical/tmux-runner/arrange-agents-101.sh`: stage M7 recipient inputs, M8 extension brief, and synthetic shared room.
- Modify the existing `scenarios/a101-*.txt` files to use runtime-neutral control tokens.
- Create `scenarios/a101-m7.txt`, `scenarios/a101-m8.txt`, recipient/room fixtures, and focused M7/M8 seam tests.

### Verification and diagnostics

- Create `scripts/audit-a101-runtime-copy.js` and its test: report Claude-only mechanics remaining in each resolved Codex prompt or Codex-visible student passage without editing them.
- Modify `curriculum/evals/mechanical/tmux-runner/README.md`: document profile selection, evidence layout, live commands, and known baseline failures.

---

### Task 1: Define the five runtime profiles

**Files:**
- Create: `site/layouts/a101-runtimes.js`
- Test: `scripts/a101-runtime-site.test.js`

**Interfaces:**
- Produces: `A101Runtimes.PROFILES`, `A101Runtimes.PROFILE_ORDER`, `A101Runtimes.DEFAULT_PROFILE`, `A101Runtimes.getProfile(key)`, and `A101Runtimes.compatibleProfiles(runtimeMeta)`.
- Profile record: `{ key, label, family, surface, transport, capabilities, artifacts }`.
- `compatibleProfiles(runtimeMeta)` maps `any` to all five, `cowork` to Cowork, `desktop` to both Desktop profiles, and `cli` to both CLI profiles.

- [ ] **Step 1: Write the failing profile-contract tests**

```js
test('runtime profiles expose the approved order and artifact bindings', () => {
  assert.deepEqual(R.PROFILE_ORDER, [
    'cowork', 'desktop', 'cli', 'codex-desktop', 'codex-cli'
  ]);
  assert.equal(R.PROFILES.cli.artifacts['root-instructions'], 'CLAUDE.md');
  assert.equal(R.PROFILES['codex-cli'].artifacts['root-instructions'], 'AGENTS.md');
  assert.equal(R.PROFILES.cli.artifacts['project-skills'], '.claude/skills');
  assert.equal(R.PROFILES['codex-cli'].artifacts['project-skills'], '.agents/skills');
});

test('surface metadata activates equivalent Claude and Codex profiles', () => {
  assert.deepEqual(R.compatibleProfiles('desktop'), ['desktop', 'codex-desktop']);
  assert.deepEqual(R.compatibleProfiles('cli'), ['cli', 'codex-cli']);
  assert.deepEqual(R.compatibleProfiles('cowork'), ['cowork']);
});
```

- [ ] **Step 2: Run the test and verify the module is missing**

Run: `node --test scripts/a101-runtime-site.test.js`

Expected: FAIL because `site/layouts/a101-runtimes.js` does not exist.

- [ ] **Step 3: Implement the UMD profile registry**

The profile data must be literal and deterministic:

```js
var PROFILE_ORDER = ['cowork', 'desktop', 'cli', 'codex-desktop', 'codex-cli'];
var PROFILES = {
  cowork: profile('cowork', 'Cowork', 'claude', 'cowork', '', ['claude', 'cowork'], 'CLAUDE.md', '.claude/skills'),
  desktop: profile('desktop', 'Claude Code Desktop', 'claude', 'desktop', '', ['claude', 'desktop', 'code'], 'CLAUDE.md', '.claude/skills'),
  cli: profile('cli', 'Claude Code CLI', 'claude', 'cli', 'claude-tmux', ['claude', 'cli', 'code'], 'CLAUDE.md', '.claude/skills'),
  'codex-desktop': profile('codex-desktop', 'Codex Desktop', 'codex', 'desktop', '', ['codex', 'desktop', 'code'], 'AGENTS.md', '.agents/skills'),
  'codex-cli': profile('codex-cli', 'Codex CLI', 'codex', 'cli', 'codex-exec', ['codex', 'cli', 'code'], 'AGENTS.md', '.agents/skills')
};
```

Freeze returned records and throw `Unknown Agents 101 runtime profile: <key>` for unknown keys.

- [ ] **Step 4: Run the focused test**

Run: `node --test scripts/a101-runtime-site.test.js`

Expected: PASS.

- [ ] **Step 5: Commit the registry**

```bash
git add site/layouts/a101-runtimes.js scripts/a101-runtime-site.test.js
git commit -m "feat: define Agents 101 runtime profiles" --only -- site/layouts/a101-runtimes.js scripts/a101-runtime-site.test.js
```

### Task 2: Compile canonical prompts into concrete profile variants

**Files:**
- Modify: `scripts/compile-prompts.js`
- Create: `scripts/compile-prompts.test.js`

**Interfaces:**
- Consumes: `A101Runtimes.PROFILES` and `compatibleProfiles()`.
- Produces: `loadSourceRegistry(promptsDir)`, `resolveTemplate(value, profile, label)`, `resolveEntry(sourceEntry, profileKey)`, `loadRegistry(promptsDir)`, and `registryForProfile(compiledRegistry, profileKey)`.
- Compiled entry retains the current top-level fields resolved with its legacy Claude surface and adds `runtimeVariants: { [profileKey]: resolvedEntry }`.
- Supported source syntax: `{{artifact:<identity>}}` and non-nested `{{#capability:<name>}}...{{/capability:<name>}}` blocks.

- [ ] **Step 1: Write failing fixture tests for artifacts, capabilities, and closed failure modes**

Use a temporary prompt directory with one `runtime: any` entry:

```js
writePrompt(dir, 'root-card', `---
key: root-card
runtime: any
produces:
  - id: root-instructions
    location: ./{{artifact:root-instructions}}
---
Write ./{{artifact:root-instructions}}.
{{#capability:codex}}Use Codex agents.{{/capability:codex}}
`);
const registry = compile.loadRegistry(dir);
assert.equal(registry['root-card'].runtimeVariants.cli.text, 'Write ./CLAUDE.md.');
assert.match(registry['root-card'].runtimeVariants['codex-cli'].text, /\.\/AGENTS\.md/);
assert.match(registry['root-card'].runtimeVariants['codex-cli'].text, /Use Codex agents/);
assert.equal(registry['root-card'].runtimeVariants['codex-cli'].produces[0].location, './AGENTS.md');
```

Add exact rejection tests for unknown artifacts, unknown capabilities, unclosed blocks, unmatched close blocks, nested blocks, and any surviving `{{artifact:` or `{{#capability:` token.

- [ ] **Step 2: Run the tests and verify missing exports**

Run: `node --test scripts/compile-prompts.test.js`

Expected: FAIL because source/profile compilation APIs do not exist.

- [ ] **Step 3: Split source parsing from profile resolution**

Keep the existing frontmatter validation in `loadSourceRegistry()`. Make `resolveTemplate()` recursively resolve strings inside `requires`, `produces`, `opportunistic-copy`, `note`, `dest`, `context`, and `text`. Never rewrite artifact IDs such as `root-instructions`; only concrete path values and body text resolve.

Select the legacy top-level profile by source metadata: `cowork → cowork`, `desktop → desktop`, `cli → cli`, `any → cowork`. This preserves current Claude output while `runtimeVariants` carries every compatible profile.

- [ ] **Step 4: Run compiler and existing prompt tests**

Run: `node --test scripts/compile-prompts.test.js scripts/validate-prompt-graph.test.js scripts/lint-prompts.test.js`

Expected: PASS, with existing prompts unchanged because none use the new expressions yet.

- [ ] **Step 5: Verify generated drift is limited to the new variant field**

Run: `node scripts/compile-prompts.js && git diff --check -- site/prompts.json`

Inspect: `git diff -- site/prompts.json`. Do not commit the pre-existing six AE prompt-registry changes. The final generated registry commit must be assembled from the Agents 101/compiler hunks only.

- [ ] **Step 6: Commit compiler code and tests only**

```bash
git add scripts/compile-prompts.test.js
git commit -m "feat: compile runtime-neutral prompt artifacts" --only -- scripts/compile-prompts.js scripts/compile-prompts.test.js
```

### Task 3: Validate the full prompt graph per profile

**Files:**
- Modify: `scripts/validate-prompt-graph.js`
- Modify: `scripts/validate-prompt-graph.test.js`
- Modify: `scripts/compile-prompts.js`

**Interfaces:**
- `validate(trainingKey, { profileKey })` returns `{ training, profile, orderCount, activeCount, findings, producersById }`.
- CLI accepts `--runtime <profile-key>`.
- `compile-prompts.js` validates Agents 101 once for every profile and AE101 once through the unchanged legacy profile.

- [ ] **Step 1: Write failing profile graph tests**

```js
for (const profileKey of R.PROFILE_ORDER) {
  test(`Agents 101 graph resolves for ${profileKey}`, () => {
    const result = validate('agents-101', { profileKey });
    assert.equal(result.orderCount, 93);
    assert.deepEqual(result.findings.filter(f => f.severity === 'error'), []);
  });
}
```

Add a fixture where a `desktop` producer is required by an `any` consumer. The CLI profile must emit `INACTIVE-PRODUCER`; both Desktop profiles must pass.

- [ ] **Step 2: Run the focused graph tests and observe the options mismatch**

Run: `node --test scripts/validate-prompt-graph.test.js`

Expected: FAIL because `validate()` ignores `profileKey`.

- [ ] **Step 3: Filter active prompts and resolve metadata per profile**

Use `compatibleProfiles(entry.runtime)` for activation and `registryForProfile()` for resolved `requires`/`produces`. Preserve `orderCount: 93`; count filtered turns separately as `activeCount`. Report missing profile variants as `MISSING-RUNTIME-VARIANT`, not generic `MISSING-PROMPT`.

- [ ] **Step 4: Update compiler gating**

Run exactly:

```js
for (const profileKey of A101Runtimes.PROFILE_ORDER) {
  validateChild('agents-101', profileKey);
}
validateChild('agentic-engineering-101', null);
```

- [ ] **Step 5: Run all graph/compiler checks**

Run: `node --test scripts/compile-prompts.test.js scripts/validate-prompt-graph.test.js && node scripts/validate-prompt-graph.js --training agents-101 --runtime codex-cli`

Expected: PASS and `93 prompts in linear order` with zero errors.

- [ ] **Step 6: Commit graph validation**

```bash
git commit -m "test: validate Agents 101 prompts per runtime" --only -- scripts/validate-prompt-graph.js scripts/validate-prompt-graph.test.js scripts/compile-prompts.js
```

### Task 4: Render five profiles on Agents 101 surfaces without changing AE101

**Files:**
- Modify: `site/layouts/a101-runtimes.js`
- Create: `site/layouts/a101-runtimes.css`
- Modify: `site/curriculum.html`
- Modify: `site/layouts/curriculum-spa.js`
- Modify: `scripts/build-workbook.js`
- Modify: `scripts/a101-runtime-site.test.js`

**Interfaces:**
- `A101Runtimes.renderSwitcherHtml()` produces the five buttons from `PROFILE_ORDER`.
- `A101Runtimes.mountSwitcher(element)`, `getRuntime()`, `applyRuntime(runtime)`, and `wireRuntimeSwitcher(element)` own Agents 101 selection only.
- `A101Runtimes.expandPrompts(md, registry, { strict, renderPromptBlock })` emits one generated wrapper per active profile: `<div class="rt-profile rt-profile-<key>">...</div>`.
- `build-workbook.js` helper `promptExpanderFor(trainingKey)` returns the existing `CR.expandPrompts` for every non-A101 key.

- [ ] **Step 1: Add failing pure-render and isolation tests**

```js
test('switcher labels come from the profile registry', () => {
  const html = R.renderSwitcherHtml();
  for (const key of R.PROFILE_ORDER) assert.match(html, new RegExp(`data-runtime="${key}"`));
});

test('Codex prompt wrappers carry concrete Codex text', () => {
  const registry = {
    'root-card': {
      runtime: 'any',
      runtimeVariants: {
        cowork: { text: 'Write ./CLAUDE.md.' },
        desktop: { text: 'Write ./CLAUDE.md.' },
        cli: { text: 'Write ./CLAUDE.md.' },
        'codex-desktop': { text: 'Write ./AGENTS.md.' },
        'codex-cli': { text: 'Write ./AGENTS.md.' }
      }
    }
  };
  const md = R.expandPrompts('{{prompt:root-card}}', registry, {
    strict: true,
    renderPromptBlock: entry => entry.text
  });
  assert.match(md, /rt-profile-codex-cli[^]*Write \.\/AGENTS\.md/);
  assert.doesNotMatch(md, /rt-profile-codex-cli[^]*\{\{artifact:/);
});

test('non-A101 workbook rendering keeps the legacy expander', () => {
  const source = fs.readFileSync(path.join(ROOT, 'scripts/build-workbook.js'), 'utf8');
  assert.match(source, /promptExpanderFor[\s\S]+trainingKey === 'agents-101'/);
});
```

- [ ] **Step 2: Run and observe missing render functions**

Run: `node --test scripts/a101-runtime-site.test.js`

Expected: FAIL on missing `renderSwitcherHtml`/`expandPrompts`.

- [ ] **Step 3: Implement generated switcher and prompt wrappers**

`expandPrompts()` handles both `{{prompt:key}}` and `{{cut:key|reason}}`; for each compatible profile it calls the existing `CurriculumRuntime.renderPromptBlock()` with that resolved entry. It must aggregate unresolved keys and throw in strict mode using the existing error wording.

The extension CSS makes exactly one `.rt-profile-*` visible for each `body.runtime-*`. Existing `.rt-cli` prose is visible in both CLI profiles and `.rt-desktop` prose in both Desktop profiles; `.rt-cowork` stays Cowork-only. Treat `.rt-code` as code-surface content for all four Claude/Codex Code profiles, then let the runtime-copy audit identify Claude-named sentences needing approved edits.

- [ ] **Step 4: Wire the SPA only when `trainingKey === 'agents-101'`**

`site/curriculum.html` keeps `<div id="runtime-switcher" ...></div>` but no hard-coded buttons. Load `a101-runtimes.js` after `curriculum.js` and its CSS after `curriculum.css`. In `curriculum-spa.js`, leave non-A101 calls on `CurriculumRuntime`; for A101 mount the generated switcher and call `A101Runtimes.expandPrompts()`.

- [ ] **Step 5: Wire only the Agents 101 workbook**

Read the extension JS/CSS in `build-workbook.js`, but interpolate it only when `trainingKey === 'agents-101'`. Add the switcher to the Agents 101 cover only. Thread `trainingKey` into prompt expansion so AE101 still calls the unchanged `CR.expandPrompts(stripped, PROMPT_REGISTRY, { strict: true })` path and does not inline the new assets.

- [ ] **Step 6: Run site and workbook tests**

Run: `node --test scripts/a101-runtime-site.test.js scripts/prompt-block-runtime.test.js`

Run: `node scripts/build-workbook.js vip-a101-codex-check agents-101 --no-trainer-docs`

Inspect the ignored workbook and verify all five buttons exist, only one prompt variant is visible, Codex prompt labels name Codex, and the existing Claude choices still render their current content.

- [ ] **Step 7: Prove AE101 tracked artifacts are untouched**

Run:

```bash
git diff --exit-code 7a39c84e -- \
  curriculum/trainings/agentic-engineering-101 \
  site/clients/acme/agentic-engineering-101 \
  curriculum/evals/mechanical/tmux-runner/scenarios/m*.txt
```

Expected: no output, exit 0. Also run the isolation test proving non-A101 workbook rendering takes the legacy expander and includes neither A101 extension asset.

- [ ] **Step 8: Commit Agents 101 presentation files**

```bash
git commit -m "feat: add Codex to Agents 101 runtime switcher" --only -- site/layouts/a101-runtimes.js site/layouts/a101-runtimes.css site/curriculum.html site/layouts/curriculum-spa.js scripts/build-workbook.js scripts/a101-runtime-site.test.js
```

### Task 5: Make the runner resolve the compiler's exact profile text

**Files:**
- Create: `scripts/resolve-prompt.js`
- Modify: `curriculum/evals/mechanical/tmux-runner/lib/resolve-prompt.sh`
- Create: `curriculum/evals/mechanical/tmux-runner/tests/runtime-prompt-resolution.test.sh`

**Interfaces:**
- CLI: `node scripts/resolve-prompt.js --key <key> --runtime <profile> [--json]`.
- Text mode writes the resolved body with no extra newline or logging.
- JSON mode writes `{ key, runtime, text, meta }`.
- Shell: `resolve_prompt <key> <profile>` delegates to that CLI using a repo root derived from the library path, not `$HOME/Projects/...`.

- [ ] **Step 1: Write the failing end-to-end resolver test**

The test creates a temporary prompt fixture containing `{{artifact:root-instructions}}`, points `PROMPT_REGISTRY` at it, and verifies:

```bash
claude="$(resolve_prompt root-card cli)"
codex="$(resolve_prompt root-card codex-cli)"
[[ "$claude" == 'Write ./CLAUDE.md.' ]]
[[ "$codex" == 'Write ./AGENTS.md.' ]]
```

It then compiles the same fixture and compares the shell result byte-for-byte with `registryForProfile(...).text`.

- [ ] **Step 2: Run and observe the old AWK resolver leaking expressions**

Run: `bash curriculum/evals/mechanical/tmux-runner/tests/runtime-prompt-resolution.test.sh`

Expected: FAIL because `resolve-prompt.sh` returns canonical source without runtime resolution.

- [ ] **Step 3: Implement strict CLI projection and shell delegation**

Reject missing keys, incompatible profiles, and unresolved expressions with exit 2 and a one-line error on stderr. Keep stdout pure so Bash command substitution is byte-safe.

- [ ] **Step 4: Run resolver, compiler, and scenario key tests**

Run: `bash curriculum/evals/mechanical/tmux-runner/tests/runtime-prompt-resolution.test.sh && bash curriculum/evals/mechanical/tmux-runner/tests/scenario-keys-resolve.test.sh && node --test scripts/compile-prompts.test.js`

Expected: PASS.

- [ ] **Step 5: Commit the resolver boundary**

```bash
git add scripts/resolve-prompt.js curriculum/evals/mechanical/tmux-runner/tests/runtime-prompt-resolution.test.sh
git commit -m "feat: resolve runner prompts by runtime profile" --only -- scripts/resolve-prompt.js curriculum/evals/mechanical/tmux-runner/lib/resolve-prompt.sh curriculum/evals/mechanical/tmux-runner/tests/runtime-prompt-resolution.test.sh
```

### Task 6: Build and test the Codex JSONL transport

**Files:**
- Create: `curriculum/evals/mechanical/tmux-runner/lib/parse-codex-jsonl.js`
- Create: `curriculum/evals/mechanical/tmux-runner/lib/codex-home.sh`
- Create: `curriculum/evals/mechanical/tmux-runner/transports/codex-exec.sh`
- Create: `curriculum/evals/mechanical/tmux-runner/fixtures/fake-codex`
- Create: `curriculum/evals/mechanical/tmux-runner/tests/codex-transport.test.sh`

**Interfaces:**
- Parser CLI: `node parse-codex-jsonl.js <events.jsonl> <status.json> <response.txt>`.
- Normalized status: `{ ok, failureClass, threadId, finalResponseSeen, tokenUsage, eventCount }`.
- `codex_prepare_home <run_dir>` creates an adapter-owned `CODEX_HOME`, bridges only authentication, and leaves personal config, instructions, skills, agents, and MCP settings absent.
- Codex adapter: `codex_open <cwd> <run_dir>`, `codex_turn <prompt_file> <seq> <timeout>`, `codex_close`.
- Evidence files: `turn-N.raw.jsonl`, `turn-N.stderr.txt`, `turn-N.response.txt`, `turn-N.status.json`, and `thread-id.txt`.

- [ ] **Step 1: Write failing parser and fake-CLI cases**

The fake executable must emit selectable cases through `FAKE_CODEX_CASE`:

- `success-start`: `thread.started`, `turn.started`, assistant message, `turn.completed`.
- `success-resume`: same thread ID and a completed second response.
- `turn-failed`: a final-looking assistant message followed by `turn.failed`.
- `malformed`: one non-JSON line.
- `missing-thread`: completed turn without `thread.started`.
- `changed-thread`: resume emits a different ID.
- `exit-seven`: valid partial stream then process exit 7.
- `timeout`: process remains alive until the adapter deadline kills it.
- `isolated-home`: fake operator home contains `auth.json`, `config.toml`, `AGENTS.md`, skills, and MCP config; the run home receives only mode-0600 authentication and none of the behavior-shaping files.

Assertions must prove exact resume arguments, raw evidence retention, failure classes, and cleanup.

- [ ] **Step 2: Run and observe missing parser/adapter**

Run: `bash curriculum/evals/mechanical/tmux-runner/tests/codex-transport.test.sh`

Expected: FAIL because the transport files do not exist.

- [ ] **Step 3: Implement the temporary credential boundary**

`codex_prepare_home` creates `$run_dir/codex-home` with mode 0700. If `CODEX_API_KEY` is present, pass it without writing or logging it. Otherwise copy only `${CODEX_AUTH_SOURCE:-$HOME/.codex/auth.json}` to `auth.json` with mode 0600; if neither mechanism exists, fail as `environment/auth-missing`. Never copy `config.toml`, `AGENTS.md`, `.agents/`, `skills/`, MCP files, or history. Register cleanup before launching Codex and remove only the adapter-owned home.

- [ ] **Step 4: Implement strict JSONL parsing**

Treat any malformed line, `error` event, `turn.failed`, absent `turn.completed`, missing first-turn thread ID, or changed resume ID as failure. A final assistant message is not success without `turn.completed`.

- [ ] **Step 5: Implement start/resume execution and deadline**

First turn command shape:

```bash
codex exec --json --sandbox workspace-write --ask-for-approval never \
  --skip-git-repo-check --ignore-user-config -C "$CODEX_CWD" - < "$prompt_file"
```

Resume shape:

```bash
codex exec resume "$thread_id" --json - < "$prompt_file"
```

Use the existing wall-clock deadline helper; terminate only the adapter-owned process on timeout. Preserve stderr and exit status before classifying.

- [ ] **Step 6: Run the transport contract tests**

Run: `bash curriculum/evals/mechanical/tmux-runner/tests/codex-transport.test.sh`

Expected: all nine cases PASS.

- [ ] **Step 7: Commit Codex transport files**

```bash
git add curriculum/evals/mechanical/tmux-runner/lib/parse-codex-jsonl.js curriculum/evals/mechanical/tmux-runner/lib/codex-home.sh curriculum/evals/mechanical/tmux-runner/transports/codex-exec.sh curriculum/evals/mechanical/tmux-runner/fixtures/fake-codex curriculum/evals/mechanical/tmux-runner/tests/codex-transport.test.sh
git commit -m "feat: add Codex exec simulation transport" --only -- curriculum/evals/mechanical/tmux-runner/lib/parse-codex-jsonl.js curriculum/evals/mechanical/tmux-runner/lib/codex-home.sh curriculum/evals/mechanical/tmux-runner/transports/codex-exec.sh curriculum/evals/mechanical/tmux-runner/fixtures/fake-codex curriculum/evals/mechanical/tmux-runner/tests/codex-transport.test.sh
```

### Task 7: Put Claude and Codex behind one A101 runner lifecycle

**Files:**
- Create: `curriculum/evals/mechanical/tmux-runner/lib/transport.sh`
- Create: `curriculum/evals/mechanical/tmux-runner/transports/claude-tmux.sh`
- Modify: `curriculum/evals/mechanical/tmux-runner/run-a101.sh`
- Modify: `curriculum/evals/mechanical/tmux-runner/tests/lib-detection.test.sh`
- Create: `curriculum/evals/mechanical/tmux-runner/tests/a101-runtime-selection.test.sh`

**Interfaces:**
- `run-a101.sh --runtime cli|codex-cli`; default is `cli`.
- Dispatcher: `transport_open <profile> <cwd> <run_dir>`, `transport_turn <prompt_file> <seq> <timeout>`, `transport_close`.
- After a successful turn, every adapter guarantees `turn-N.transcript.txt`; Codex copies its final response there and keeps raw JSONL beside it.
- Logical helper: `artifact_path root-instructions` and `artifact_path project-skills` read the selected profile bindings through `a101-runtimes.js`.

- [ ] **Step 1: Write failing runtime-selection tests**

Test default profile `cli`, explicit `codex-cli`, unknown-profile exit 2, fresh transport open per module, and artifact binding output. Use fake transports; no live model calls.

- [ ] **Step 2: Run and observe the unknown `--runtime` argument**

Run: `bash curriculum/evals/mechanical/tmux-runner/tests/a101-runtime-selection.test.sh`

Expected: FAIL because `run-a101.sh` rejects `--runtime`.

- [ ] **Step 3: Extract Claude's existing lifecycle without behavior changes**

Move only launch/send/wait/capture/kill coordination into `claude-tmux.sh`. Keep `CLAUDE_CMD`, Stop-hook sentinel semantics, tmux socket isolation, warmup, auto-resend, and transcript capture unchanged.

- [ ] **Step 4: Route the shared turn loop through the dispatcher**

For each keyed scenario turn:

1. resolve canonical compiled text with `resolve_prompt "$key" "$runtime"`;
2. save it as `turn-N.resolved-prompt.txt`;
3. append rendered headless controls and fixture answers;
4. save submitted text as `turn-N.prompt.txt`;
5. call `transport_turn`;
6. run the existing artifact assertion against `turn-N.transcript.txt`.

Replace hard-coded root `CLAUDE.md` assertion paths with `$(artifact_path root-instructions)` and skill-install assertions with `$(artifact_path project-skills)`.

- [ ] **Step 5: Run Claude regression and fake Codex runner tests**

Run every shell test under `curriculum/evals/mechanical/tmux-runner/tests/`, including the new runtime-selection and transport suites. No live Claude/Codex invocation is part of this step.

Expected: PASS, except integration checks that explicitly print `skip` when no prior live output exists.

- [ ] **Step 6: Commit the shared lifecycle**

```bash
git add curriculum/evals/mechanical/tmux-runner/lib/transport.sh curriculum/evals/mechanical/tmux-runner/transports/claude-tmux.sh curriculum/evals/mechanical/tmux-runner/tests/a101-runtime-selection.test.sh
git commit -m "refactor: share the Agents 101 runner lifecycle" --only -- curriculum/evals/mechanical/tmux-runner/lib/transport.sh curriculum/evals/mechanical/tmux-runner/transports/claude-tmux.sh curriculum/evals/mechanical/tmux-runner/run-a101.sh curriculum/evals/mechanical/tmux-runner/tests/lib-detection.test.sh curriculum/evals/mechanical/tmux-runner/tests/a101-runtime-selection.test.sh
```

### Task 8: Make headless scenario controls runtime-neutral

**Files:**
- Modify: `curriculum/evals/mechanical/tmux-runner/run-a101.sh`
- Modify: `curriculum/evals/mechanical/tmux-runner/scenarios/a101-prework.txt`
- Modify: `curriculum/evals/mechanical/tmux-runner/scenarios/a101-m1.txt`
- Modify: `curriculum/evals/mechanical/tmux-runner/scenarios/a101-m2.txt`
- Modify: `curriculum/evals/mechanical/tmux-runner/scenarios/a101-m3.txt`
- Modify: `curriculum/evals/mechanical/tmux-runner/scenarios/a101-m4a.txt`
- Modify: `curriculum/evals/mechanical/tmux-runner/scenarios/a101-m4b.txt`
- Modify: `curriculum/evals/mechanical/tmux-runner/scenarios/a101-m5.txt`
- Modify: `curriculum/evals/mechanical/tmux-runner/scenarios/a101-m6.txt`
- Create: `curriculum/evals/mechanical/tmux-runner/tests/a101-runtime-controls.test.sh`

**Interfaces:**
- Scenario tokens: `<CONTROL:NO_QUESTIONS>`, `<CONTROL:DIRECT_EXECUTION>`, `<CONTROL:MULTI_AGENT>`, `<CONTROL:SAVE_WITHOUT_REVIEW>`.
- `render_controls(profile, text)` replaces every token and fails on any unresolved `<CONTROL:` token.

- [ ] **Step 1: Write failing control-rendering tests**

Assert that Claude controls may name `AskUserQuestion`, plan mode, and subagents; Codex controls instead say `interactive user input`, `execute directly`, and `Codex agents`. Assert all non-comment A101 scenario lines contain no raw `AskUserQuestion`, `plan mode`, or `subagent` after migration.

- [ ] **Step 2: Run and observe raw Claude controls in scenarios**

Run: `bash curriculum/evals/mechanical/tmux-runner/tests/a101-runtime-controls.test.sh`

Expected: FAIL and print the current raw scenario lines.

- [ ] **Step 3: Implement the four control renderings and migrate scenario tails**

Keep case-specific answer tokens such as `<M2_CHALLENGE>` in scenarios. Replace only runtime mechanics. Comments may describe why a control exists but must use runtime-neutral names.

- [ ] **Step 4: Run all static scenario/seam tests**

Run: `bash curriculum/evals/mechanical/tmux-runner/tests/a101-runtime-controls.test.sh` followed by every existing `test-a101-*.sh` and `scenario-keys-resolve.test.sh`.

Expected: PASS.

- [ ] **Step 5: Commit structured controls**

```bash
git add curriculum/evals/mechanical/tmux-runner/tests/a101-runtime-controls.test.sh
git commit -m "refactor: make A101 simulation controls runtime-neutral" --only -- curriculum/evals/mechanical/tmux-runner/run-a101.sh curriculum/evals/mechanical/tmux-runner/scenarios/a101-prework.txt curriculum/evals/mechanical/tmux-runner/scenarios/a101-m1.txt curriculum/evals/mechanical/tmux-runner/scenarios/a101-m2.txt curriculum/evals/mechanical/tmux-runner/scenarios/a101-m3.txt curriculum/evals/mechanical/tmux-runner/scenarios/a101-m4a.txt curriculum/evals/mechanical/tmux-runner/scenarios/a101-m4b.txt curriculum/evals/mechanical/tmux-runner/scenarios/a101-m5.txt curriculum/evals/mechanical/tmux-runner/scenarios/a101-m6.txt curriculum/evals/mechanical/tmux-runner/tests/a101-runtime-controls.test.sh
```

### Task 9: Extend the executable compound through Modules 7 and 8

**Files:**
- Modify: `curriculum/evals/mechanical/tmux-runner/arrange-agents-101.sh`
- Modify: `curriculum/evals/mechanical/tmux-runner/run-a101.sh`
- Modify: `curriculum/evals/mechanical/tmux-runner/chain-agents-101.sh`
- Create: `curriculum/evals/mechanical/tmux-runner/scenarios/a101-m7.txt`
- Create: `curriculum/evals/mechanical/tmux-runner/scenarios/a101-m8.txt`
- Create: `curriculum/evals/mechanical/tmux-runner/fixtures/agents-101-synthetic/answers/m7-recipient.txt`
- Create: `curriculum/evals/mechanical/tmux-runner/fixtures/agents-101-synthetic/answers/m7-assumptions.txt`
- Create: `curriculum/evals/mechanical/tmux-runner/fixtures/agents-101-synthetic/module-8/extension-brief.md`
- Create: `curriculum/evals/mechanical/tmux-runner/fixtures/agents-101-synthetic/shared-room/participants/mara/context-manifest.md`
- Create: `curriculum/evals/mechanical/tmux-runner/fixtures/agents-101-synthetic/shared-room/participants/mara/stance.md`
- Create: `curriculum/evals/mechanical/tmux-runner/fixtures/agents-101-synthetic/shared-room/participants/mara/proposal.md`
- Create: `curriculum/evals/mechanical/tmux-runner/fixtures/agents-101-synthetic/shared-room/participants/mara/cross-check.md`
- Create: `curriculum/evals/mechanical/tmux-runner/fixtures/agents-101-synthetic/shared-room/participants/mara/critique.md`
- Create: `curriculum/evals/mechanical/tmux-runner/fixtures/agents-101-synthetic/shared-room/participants/jonas/context-manifest.md`
- Create: `curriculum/evals/mechanical/tmux-runner/fixtures/agents-101-synthetic/shared-room/participants/jonas/stance.md`
- Create: `curriculum/evals/mechanical/tmux-runner/fixtures/agents-101-synthetic/shared-room/participants/jonas/proposal.md`
- Create: `curriculum/evals/mechanical/tmux-runner/fixtures/agents-101-synthetic/shared-room/participants/jonas/cross-check.md`
- Create: `curriculum/evals/mechanical/tmux-runner/fixtures/agents-101-synthetic/shared-room/participants/jonas/critique.md`
- Create: `curriculum/evals/mechanical/tmux-runner/fixtures/agents-101-synthetic/shared-room/participants/leila/context-manifest.md`
- Create: `curriculum/evals/mechanical/tmux-runner/fixtures/agents-101-synthetic/shared-room/participants/leila/stance.md`
- Create: `curriculum/evals/mechanical/tmux-runner/fixtures/agents-101-synthetic/shared-room/participants/leila/proposal.md`
- Create: `curriculum/evals/mechanical/tmux-runner/fixtures/agents-101-synthetic/shared-room/participants/leila/cross-check.md`
- Create: `curriculum/evals/mechanical/tmux-runner/fixtures/agents-101-synthetic/shared-room/participants/leila/critique.md`
- Create: `curriculum/evals/mechanical/tmux-runner/fixtures/agents-101-synthetic/shared-room/selection-board.md`
- Create: `curriculum/evals/mechanical/tmux-runner/tests/test-a101-m7-recipient.sh`
- Create: `curriculum/evals/mechanical/tmux-runner/tests/test-a101-m8-room.sh`
- Create: `curriculum/evals/mechanical/tmux-runner/a101-scenario-exclusions.json`
- Create: `curriculum/evals/mechanical/tmux-runner/tests/a101-scenario-coverage.test.js`

**Interfaces:**
- Module keys become `prework m1 m2 m3 m4a m4b m5 m6 m7 m8`.
- Tokens: `<M7_RECIPIENT>`, `<M7_ASSUMPTIONS>`, `<M8_SHARED_ROOM>`, and `<M8_EXTENSION_BRIEF>`.
- Scenario directive `@publish-selection-board` copies the held-back synthetic selection board only after Ingrid's proposal exists.
- Coverage rule: every prompt active for `codex-cli` is executed by a scenario or has an exact exclusion record. A prompt with `produces` metadata cannot be excluded; exclusions are limited to alternate-runtime twins and genuinely observation-only chat turns.

- [ ] **Step 1: Write failing M7/M8 seam tests**

M7 test proves the recipient fixture names one Nordveil teammate, their incumbent workflow, an observable outcome, and selected assumptions without pre-writing any `module-7/` result file.

M8 test proves:

- the extension brief is input, not a generated agent;
- three neighbour folders exist before cross-check;
- `selection-board.md` is absent from the arranged room and held back until the scenario directive;
- neighbour files cite synthetic source paths and disagree materially;
- no final `strategy-kernel.md`, `agent-set.md`, or `plan.md` is seeded.

- [ ] **Step 2: Run and observe missing fixtures/scenarios**

Run: `bash curriculum/evals/mechanical/tmux-runner/tests/test-a101-m7-recipient.sh && bash curriculum/evals/mechanical/tmux-runner/tests/test-a101-m8-room.sh`

Expected: FAIL because the fixtures do not exist.

- [ ] **Step 3: Author deterministic inputs and held-back room state**

Use Ingrid's existing usage-pricing challenge. The M7 teammate is Nordveil Sales Ops lead Mara Viken; her current hire is a weekly spreadsheet plus an analyst handoff; the target outcome is reduced preparation variance before pilot-pricing reviews. The M8 neighbours must disagree: one favors governance-first, one a narrow sales-pilot agent, and one a shared evidence layer.

- [ ] **Step 4: Add M7's seven-turn scenario and assertions**

Execute `share-your-work-1`, `share-your-work-3` through `-6`, then `a101-m7-debrief-sharing-artifact`. Supply the recipient and selection answers through control/answer tokens. Assert all seven module files exist, Monday names Mara and a current-work question, selected assumptions survive, and the debrief advances one identified sharing-artifact file in place.

- [ ] **Step 5: Add M8's ten-turn scenario and assertions**

Stage the four-line extension brief at module start. Execute `extend-your-system-1` and `joint-double-diamond-1` through `-8`, with `@publish-selection-board` between proposal and midpoint instructions, then the M8 debrief. Every shared-folder prompt receives the absolute `<M8_SHARED_ROOM>` path. Assert the new agent, Ingrid context/stance/cross-check/proposal/critique, midpoint instructions, updated selection board, kernel, agent set, plan, and one debrief-advanced heaviest file.

- [ ] **Step 6: Extend the chain and preserve fresh sessions**

Add M7/M8 to range validation. Each `run-a101.sh` invocation opens a new transport/session while reusing the same training directory and the same external shared room. Remove the old M6 ceiling comments and document all-eight coverage.

- [ ] **Step 7: Add the live-chain coverage gate**

Build the executed-key set from all `a101-*.txt` scenarios, ignoring literal `*` turns and directives. Compare it to `orderedKeys('agents-101')` filtered for `codex-cli`. Fail on an uncovered producer, an unused exclusion, a duplicate exclusion, or a reason outside `alternate-runtime` / `observation-only`. The test must print covered, excluded, and missing counts so the live scope is auditable.

- [ ] **Step 8: Run all static runner tests**

Run every test under `curriculum/evals/mechanical/tmux-runner/tests/`.

Expected: PASS/intentional integration skips.

- [ ] **Step 9: Commit M7/M8 simulation coverage**

Commit exactly the modified runner/chain/arrange files plus the two scenarios, new fixtures, exclusions manifest, and three tests with message `feat: simulate Agents 101 modules seven and eight`.

### Task 10: Add runtime-copy diagnostics before changing prompts

**Files:**
- Create: `scripts/audit-a101-runtime-copy.js`
- Create: `scripts/audit-a101-runtime-copy.test.js`
- Modify: `package.json`

**Interfaces:**
- CLI: `node scripts/audit-a101-runtime-copy.js --runtime codex-cli|codex-desktop [--json]`.
- Output rows: `{ surface, keyOrFile, term, line, category }` where category is `artifact-path`, `runtime-name`, `tool-name`, `skill-path`, or `interaction-mechanic`.
- Exit 1 while any Codex-visible load-bearing finding remains; allowlist entries require exact file/key, term, and rationale.

- [ ] **Step 1: Write failing detector tests**

Fixture cases detect `CLAUDE.md`, `.claude/skills`, `Claude Code`, `AskUserQuestion`, and Claude-only subagent/install instructions after Codex resolution. Ensure references hidden from the selected runtime do not report and prose describing Claude as a comparison can be explicitly allowlisted.

- [ ] **Step 2: Run and observe missing audit script**

Run: `node --test scripts/audit-a101-runtime-copy.test.js`

Expected: FAIL because the audit module does not exist.

- [ ] **Step 3: Implement prompt and student-passage scanning**

Prompt scanning uses `orderedKeys('agents-101')` plus `registryForProfile()`. Student-passage scanning walks the eight modules and their included exercises/lectures, applies `.rt-*` visibility for the selected profile, and strips maintainer tails before scanning.

- [ ] **Step 4: Run the audit and save evidence, not edits**

Run:

```bash
node scripts/audit-a101-runtime-copy.js --runtime codex-cli --json > /tmp/a101-codex-cli-copy.json
node scripts/audit-a101-runtime-copy.js --runtime codex-desktop --json > /tmp/a101-codex-desktop-copy.json
```

Expected: non-zero if current canonical prompts or Codex-visible student prose contain Claude-only mechanics. These reports drive approval cards; do not edit prompt bodies in this task.

- [ ] **Step 5: Commit diagnostics**

```bash
git add scripts/audit-a101-runtime-copy.js scripts/audit-a101-runtime-copy.test.js
git commit -m "test: audit Agents 101 runtime-specific copy" --only -- scripts/audit-a101-runtime-copy.js scripts/audit-a101-runtime-copy.test.js package.json
```

### Task 11: Run the real Codex chain and process prompt cards one at a time

**Files:**
- Modify only after card approval: the specific `curriculum/prompts/<key>.md` named by the failing evidence.
- Create only after card approval: `.claude/prompt-approvals/<key>.confirmed`.
- Modify as evidence requires: runner assertions/scenarios, but never to mask a real prompt failure.

**Interfaces:**
- Live command: `chain-agents-101.sh --runtime codex-cli --from <module> --to <module> --cwd <clean-dir> --material <clean-material-dir>`.
- Failure classes stay compiler, graph, transport, runtime, assertion, prompt-suitability, or environment.

- [ ] **Step 1: Run the clean Codex chain incrementally**

Start with prework, then extend the same arranged compound through M1, M2, M3, M4a/M4b, M5, M6, M7, and M8. Preserve each run directory. Do not start a later module when an earlier load-bearing assertion is red.

- [ ] **Step 2: Diagnose the first prompt-suitability failure**

Read the exact resolved prompt, submitted tail, raw JSONL, final response, status JSON, transcript, disk artifacts, and assertion. Prove it is authored prompt text rather than transport, fixture, or environment before proposing an edit.

- [ ] **Step 3: Present one prompt approval card**

The card contains:

```text
PROMPT CARD — <key>
BEFORE: <exact canonical source excerpt>
AFTER: <exact proposed canonical source excerpt using logical artifacts/capabilities>
WHY: <failing run ID, turn, and observed incompatibility>
RISK: <Claude behavior and downstream prompts that could move>
Approval token: prompt-ok
```

Stop until the user replies with exactly `prompt-ok`.

- [ ] **Step 4: Apply only the approved edit and approval marker**

Write `.claude/prompt-approvals/<key>.confirmed` immediately after approval, make the canonical change, run prompt-shape checks, compile all five profiles, and validate all five graphs.

- [ ] **Step 5: Rerun the affected module and downstream handoff**

Rerun from the affected module on a fixture produced by the last clean upstream run. If the artifact identity changed, rerun every downstream consumer. Commit only the prompt, its approval marker, and any directly required graph metadata with `prompt: make <key> runtime-neutral`.

- [ ] **Step 6: Repeat Steps 2–5 for the next observed blocker**

Each iteration processes exactly one card. The loop ends only when the clean Codex M1–M8 chain and both runtime-copy audits have no load-bearing finding.

### Task 12: Final verification, evidence audit, and handback

**Files:**
- Modify: `curriculum/evals/mechanical/tmux-runner/README.md`
- Modify: `docs/superpowers/plans/2026-09-02-agents-101-codex-runtime-plan.md` checkboxes only as tasks complete.

- [ ] **Step 1: Document the finished operator contract**

Document profile keys, default Claude behavior, exact Codex live command, credential/config isolation, per-turn evidence files, fresh-thread module boundary, M7 recipient, M8 room, and failure classes.

- [ ] **Step 2: Run static and contract verification**

Run:

```bash
node --test scripts/compile-prompts.test.js scripts/validate-prompt-graph.test.js scripts/a101-runtime-site.test.js scripts/audit-a101-runtime-copy.test.js
node scripts/validate-prompt-graph.js --training agents-101 --runtime cowork
node scripts/validate-prompt-graph.js --training agents-101 --runtime desktop
node scripts/validate-prompt-graph.js --training agents-101 --runtime cli
node scripts/validate-prompt-graph.js --training agents-101 --runtime codex-desktop
node scripts/validate-prompt-graph.js --training agents-101 --runtime codex-cli
for t in curriculum/evals/mechanical/tmux-runner/tests/*; do [[ -x "$t" || "$t" == *.sh ]] && bash "$t"; done
```

Expected: all focused tests PASS or explicit no-live-output skips.

- [ ] **Step 3: Run presentation builds and audits**

Build the ignored Agents 101 workbook, inspect all five runtime selections, and run both Codex runtime-copy audits. Confirm no unresolved `{{artifact:`/`{{#capability:` token reaches HTML or runner prompts.

- [ ] **Step 4: Run clean live regressions**

Run the full Codex CLI M1–M8 chain from a clean arranged directory. Run the existing Claude validated slice through the refactored transport and the full static M1–M8 scenario/assertion suite. Record run IDs and transcript locations.

- [ ] **Step 5: Audit beyond the green exit**

Inspect representative evidence for root instructions, project skill creation/use, multi-agent work, security, grounding, eval iteration, M7 recipient adoption, and M8 disagreement/critique. Confirm each is grounded in a planted seam or held-back fixture rather than a seeded result.

- [ ] **Step 6: Prove scope isolation and repository delta**

Run:

```bash
git diff --exit-code 7a39c84e -- curriculum/trainings/agentic-engineering-101 site/clients/acme/agentic-engineering-101
git diff --check 7a39c84e..HEAD
npm test
```

Expected: the AE101 scope diff is empty; `git diff --check` passes; `npm test` has no new failures and may still report only the two documented baseline dangling paths.

- [ ] **Step 7: Request code review and finish the isolated branch**

Use `superpowers:requesting-code-review`, resolve findings through `superpowers:receiving-code-review`, rerun the verification commands, then use `superpowers:finishing-a-development-branch` to bring the tested branch back as the user requested.
