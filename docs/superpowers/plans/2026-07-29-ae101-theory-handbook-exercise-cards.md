# AE101 Theory Handbook Exercise Cards Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add twelve compact, reusable exercise-summary cards to the AE101 theory handbook at the points where the exercises occur.

**Architecture:** Each canonical exercise owns one `View summary` metadata line in its stripped maintainer tail. The existing theory manifest becomes a mixed lecture, supplementary, and exercise-summary sequence; the builder parses the exercise H1 and metadata, validates the summary, and emits one compact card without rendering the exercise body.

**Tech Stack:** Node.js, `node:test`, the existing Markdown/Marked rendering pipeline, HTML/CSS.

## Global Constraints

- Render exactly twelve in-class exercise cards across M1–M6.
- Each card contains exactly one `h2` and one paragraph of 35–45 words.
- Use the canonical exercise H1 as the card title.
- Store the reusable paragraph as `**View summary:** ...` immediately below `<!-- maintainer -->` in each exercise file.
- Do not render prompts, timings, setup, steps, links, homework, optional exercises, or full exercise bodies.
- Keep the cards secondary to lectures and approximately one eighth of a printed content page.
- Preserve all unrelated working-tree changes.
- Do not add em dashes, banned writing-hygiene words, or cold sales terminology to the summaries.

---

### Task 1: Protect the rendered handbook contract

**Files:**
- Modify: `scripts/curriculum.test.js:279`
- Test: `scripts/curriculum.test.js`

**Interfaces:**
- Consumes: the existing `--theory` CLI build and `contentOnly(html)` helper.
- Produces: rendered-behavior assertions for twelve compact cards, their order, their word band, and the absence of full exercise content.

- [ ] **Step 1: Add the failing rendered-card test**

Inside `test('theory handbook build', ...)`, replace the old “excludes exercise content” subtest with assertions shaped as follows:

```js
  await t.test('renders twelve slim exercise summaries, not exercise bodies', () => {
    const cards = [...handbook.matchAll(
      /<section class="exercise-summary" id="exercise-summary-([a-z0-9-]+)">([\s\S]*?)<\/section>/g
    )];
    assert.equal(cards.length, 12, 'expected one compact card for each in-class exercise');

    for (const [, slug, card] of cards) {
      assert.equal((card.match(/<h2>/g) || []).length, 1, `${slug}: expected one h2`);
      assert.equal((card.match(/<p>/g) || []).length, 1, `${slug}: expected one paragraph`);
      assert.doesNotMatch(card, /<pre\b|<ol\b|<ul\b|<h3\b|<h4\b/,
        `${slug}: compact card leaked exercise structure`);

      const paragraph = (card.match(/<p>([\s\S]*?)<\/p>/) || [])[1] || '';
      const plain = paragraph.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
      const words = plain.match(/\b[\p{L}\p{N}][\p{L}\p{N}'’.-]*\b/gu) || [];
      assert.ok(words.length >= 35 && words.length <= 45,
        `${slug}: expected 35–45 words, got ${words.length}`);
    }

    assert.doesNotMatch(handbook, /class="phase phase--exercise"/);
    assert.doesNotMatch(handbook, /Phase 1: Bring a real task/);
    assert.match(workbook, /id="exercises-push-back-on-the-plan"/);
  });
```

- [ ] **Step 2: Add the failing chronology and exclusion test**

Add a second subtest with a literal expected sequence:

```js
  await t.test('places exercise summaries at their lived points in the theory arc', () => {
    const markers = [
      'id="lectures-the-wizard-move"',
      'id="exercise-summary-orient-and-introspect"',
      'id="exercise-summary-fix-tests-first"',
      'id="exercise-summary-compound-and-close"',
      'id="lectures-the-machine-you-just-met"',
      'id="lectures-when-a-plan-is-good"',
      'id="exercise-summary-push-back-on-the-plan"',
      'id="exercise-summary-extract-the-task-shaping-rule"',
      'id="lectures-where-the-rule-could-live"',
      'id="exercise-summary-open-the-side-quest"',
      'id="lectures-skills-from-the-frontier"',
      'id="exercise-summary-map-the-access-surface"',
      'id="exercise-summary-threat-model-with-stride"',
      'id="exercise-summary-author-test-strategy-skill"',
      'id="lectures-the-loop-half-filled"',
      'id="lectures-test-and-learn"',
      'id="exercise-summary-walk-and-send-off"',
      'id="lectures-ironies-of-automation"',
      'id="lectures-learning-through-contrast"',
      'id="exercise-summary-diagnose-and-resend"',
      'id="lectures-what-packaging-is"',
      'id="lectures-quality-is-grounding"',
      'id="exercise-summary-spot-gaps-build-the-loop"',
      'id="lectures-composing-the-workflow"',
    ];

    let cursor = -1;
    for (const marker of markers) {
      const next = handbook.indexOf(marker);
      assert.ok(next > cursor, `expected marker in order: ${marker}`);
      cursor = next;
    }

    assert.doesNotMatch(handbook, /exercise-summary-close-the-ticket/);
    assert.doesNotMatch(handbook, /exercise-summary-read-the-ticket-rules/);
  });
```

- [ ] **Step 3: Run the focused test and verify RED**

Run:

```bash
node --test --test-name-pattern="theory handbook build" scripts/curriculum.test.js
```

Expected: FAIL because zero `exercise-summary` sections exist. Confirm the failure is the expected twelve-card assertion, not a syntax or fixture-cleanup error.

---

### Task 2: Add reusable summary metadata and mixed-manifest rendering

**Files:**
- Modify: `curriculum/exercises/orient-and-introspect.md`
- Modify: `curriculum/exercises/fix-tests-first.md`
- Modify: `curriculum/exercises/compound-and-close.md`
- Modify: `curriculum/exercises/push-back-on-the-plan.md`
- Modify: `curriculum/exercises/extract-the-task-shaping-rule.md`
- Modify: `curriculum/exercises/open-the-side-quest.md`
- Modify: `curriculum/exercises/map-the-access-surface.md`
- Modify: `curriculum/exercises/threat-model-with-stride.md`
- Modify: `curriculum/exercises/author-test-strategy-skill.md`
- Modify: `curriculum/exercises/walk-and-send-off.md`
- Modify: `curriculum/exercises/diagnose-and-resend.md`
- Modify: `curriculum/exercises/spot-gaps-build-the-loop.md`
- Modify: `scripts/build-workbook.js:100-154`
- Modify: `scripts/build-workbook.js:672-715`
- Test: `scripts/curriculum.test.js`

**Interfaces:**
- Consumes: `renderTheoryEntry(trainingKey, entry)`, canonical exercise Markdown, `marked.parseInline`, and the mixed `THEORY_HANDBOOK_MANIFEST`.
- Produces: `readExerciseViewMeta(slug) -> { titleMd: string, summaryMd: string, wordCount: number }` and rendered `.exercise-summary` sections.

- [ ] **Step 1: Add the twelve metadata lines**

Insert each line immediately after that file’s `<!-- maintainer -->` marker:

```md
**View summary:** You direct the agent’s first read of your real repository, then question its account against the context window. The result is a practical map of what the agent loaded, what it skipped, and where your steering begins.
```

`orient-and-introspect.md`

```md
**View summary:** You bring a real bug through a tests-first repair: prove it with a failing test, fix the root cause, interrogate the diff, and ship the PR. The artifact is working code whose evidence you have read and challenged.
```

`fix-tests-first.md`

```md
**View summary:** The agent reads the finished session as evidence and drafts `./CLAUDE.local.md` from how the work actually went. You push back where it misreads. The result is a personal rules file that improves the next session on this repository.
```

`compound-and-close.md`

```md
**View summary:** You take a real multi-file task into plan mode, challenge the draft twice, then give a second agent the unresolved branches. The result is an approved plan shaped by two different reads, with execution deliberately left for later.
```

`push-back-on-the-plan.md`

```md
**View summary:** You ask the agent to recover the task-shaping rules hidden in the planning session, rewrite anything generic, and save the useful rules where they will fire. The artifact turns one good planning experience into reusable guidance for similar work.
```

`extract-the-task-shaping-rule.md`

```md
**View summary:** You open two agent sessions on one Git history: a security lane in the repository and a quality lane in a sibling worktree. The setup lets independent work continue safely while preserving a clear place for human control at merge.
```

`open-the-side-quest.md`

```md
**View summary:** You invoke a curated security skill on a real feature, then compare its access-surface map with what you know about the codebase. The saved artifact combines broad automated coverage with the codebase-specific delta only you can supply.
```

`map-the-access-surface.md`

```md
**View summary:** You run STRIDE across the mapped surface, reject most threats with reasons, and choose one hardening decision worth recording. The resulting architecture decision record turns a broad threat scan into one defensible engineering choice your team can inspect.
```

`threat-model-with-stride.md`

```md
**View summary:** You author a test-strategy skill through conversation, challenge its weakest assumption, and invoke it against the real codebase before keeping it. The artifact is a reusable skill shaped by the way this repository actually tests, not by a generic pyramid.
```

`author-test-strategy-skill.md`

```md
**View summary:** You choose a task large enough to expose drift, ask the agent to find the thinnest parts of your existing context, fill only the worst gaps, and send the task off un-packaged. That first run becomes evidence for the next module.
```

`walk-and-send-off.md`

```md
**View summary:** You read the un-packaged run through three failure lenses, build the checks and durable task artifacts that would have caught its misses, then re-send the same work. The contrast makes packaging visible on your own code rather than as advice.
```

`diagnose-and-resend.md`

```md
**View summary:** You compare the un-packaged and packaged runs, rank what the second attempt still missed, remove one stale rule, and author a session-shaper skill from the evidence. The resulting skill carries the two-run lesson into future work.
```

`spot-gaps-build-the-loop.md`

- [ ] **Step 2: Extend the manifest with exercise entries**

Add `exercises/<slug>` entries at the exact lived positions described in the design. Preserve current lecture and supplementary ownership. Update the manifest comment to state that exercise entries render summary metadata only.

- [ ] **Step 3: Implement metadata parsing and validation**

Add this helper before `renderTheoryEntry`:

```js
function readExerciseViewMeta(slug) {
  const srcPath = path.join(ROOT, 'curriculum/exercises', slug + '.md');
  if (!fs.existsSync(srcPath)) {
    throw new Error(`Exercise summary source missing: ${path.relative(ROOT, srcPath)}`);
  }

  const raw = fs.readFileSync(srcPath, 'utf8');
  const marker = '<!-- maintainer -->';
  const markerAt = raw.indexOf(marker);
  if (markerAt === -1) {
    throw new Error(`Exercise summary source has no maintainer marker: ${path.relative(ROOT, srcPath)}`);
  }

  const body = raw.slice(0, markerAt);
  const tail = raw.slice(markerAt + marker.length);
  const titleMatch = body.match(/^#\s+(.+?)\s*$/m);
  if (!titleMatch) {
    throw new Error(`Exercise summary source has no H1: ${path.relative(ROOT, srcPath)}`);
  }

  const summaries = [...tail.matchAll(/^\*\*View summary:\*\*\s+(.+?)\s*$/gm)];
  if (summaries.length !== 1) {
    throw new Error(
      `Exercise summary source needs exactly one View summary, found ${summaries.length}: ${path.relative(ROOT, srcPath)}`
    );
  }

  const summaryMd = summaries[0][1].trim();
  const plain = summaryMd
    .replace(/`([^`]+)`/g, '$1')
    .replace(/[*_[\]()]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  const words = plain.match(/\b[\p{L}\p{N}][\p{L}\p{N}'’.-]*\b/gu) || [];
  if (words.length < 35 || words.length > 45) {
    throw new Error(
      `Exercise View summary must be 35–45 words, got ${words.length}: ${path.relative(ROOT, srcPath)}`
    );
  }

  return { titleMd: titleMatch[1].trim(), summaryMd, wordCount: words.length };
}
```

- [ ] **Step 4: Render only the compact card**

Add an `exercises` branch to `renderTheoryEntry`:

```js
  if (kind === 'exercises') {
    const { titleMd, summaryMd } = readExerciseViewMeta(slug);
    return `<section class="exercise-summary" id="exercise-summary-${slug}">\n`
      + `<h2>Exercise · ${marked.parseInline(titleMd)}</h2>\n`
      + `<p>${marked.parseInline(summaryMd)}</p>\n`
      + `</section>`;
  }
```

Update the unknown-kind error to list `exercises/`.

- [ ] **Step 5: Run the focused test and verify GREEN**

Run:

```bash
node --test --test-name-pattern="theory handbook build" scripts/curriculum.test.js
```

Expected: PASS.

- [ ] **Step 6: Run the complete curriculum test file**

Run:

```bash
node --test scripts/curriculum.test.js
```

Expected: all tests pass. If the existing manifest drift guard needs wording changes, keep its lecture-only extraction behavior and update only comments that still claim the complete manifest excludes exercises.

---

### Task 3: Style, build, and visually verify the compact cards

**Files:**
- Modify: `site/layouts/curriculum.css:2068`
- Modify: `scripts/build-workbook.js` comments and CLI help that say “lectures only”
- Generated/verify: `site/clients/goats/agentic-engineering-101/theory-handbook.html`
- Generated/verify: `site/clients/vip-arc/agentic-engineering-101/theory-handbook.html`
- Generated/verify: `site/clients/vip-ure/agentic-engineering-101/theory-handbook.html`

**Interfaces:**
- Consumes: `.exercise-summary` HTML from Task 2 and the existing `SPA_CSS` bundle.
- Produces: compact screen and print styling with no page split.

- [ ] **Step 1: Add compact card CSS**

Add a scoped block near the handbook cover/TOC rules:

```css
body.workbook .exercise-summary {
    box-sizing: border-box;
    margin: 2rem 0;
    padding: 0.9rem 1.2rem 1rem;
    min-height: 7.5rem;
    border-left: 3px solid var(--accent);
    background: color-mix(in srgb, var(--paper-warm) 72%, white);
    break-inside: avoid;
    page-break-inside: avoid;
}

body.workbook .exercise-summary h2 {
    margin: 0 0 0.45rem;
    font-size: 1.02rem;
    line-height: 1.25;
    color: var(--accent-dark);
}

body.workbook .exercise-summary p {
    margin: 0;
    max-width: none;
    font-size: 0.95rem;
    line-height: 1.48;
    color: var(--ink-muted);
}

@media print {
    body.workbook .exercise-summary {
        min-height: 1.2in;
        margin: 0.18in 0;
    }
}
```

If the existing palette lacks `--paper-warm` or `--accent-dark`, use existing defined variables rather than adding new global tokens.

- [ ] **Step 2: Build one plain and one personalised fixture**

Run:

```bash
node scripts/build-workbook.js theory-test-fixture agentic-engineering-101 --theory
node scripts/build-workbook.js vip-test-fixture agentic-engineering-101 --theory --for "Ada Lovelace"
```

Expected: both builds exit 0 and contain twelve cards.

- [ ] **Step 3: Serve and inspect with the in-app browser**

Run a local server from the repository root, then inspect:

- desktop width: card hierarchy, spacing, and lecture continuity,
- narrow width: no overflow and no awkward fixed-height clipping,
- print media: cards avoid page breaks and remain near the one-eighth-page target,
- M1, M3, and M5 sequences: references read naturally across the inserted cards.

Adjust only card CSS or summary copy when visual evidence shows a concrete problem. Keep the one-header, one-paragraph contract.

- [ ] **Step 4: Rebuild the existing handbook instances**

Read the current personalised recipient from each existing VIP cover, then rebuild through the normal guarded CLI. Rebuild the goats copy without `--for`. Do not persist recipient names anywhere new.

- [ ] **Step 5: Run final verification**

Run:

```bash
node --test scripts/curriculum.test.js
node scripts/build-workbook.js theory-test-fixture agentic-engineering-101 --theory
git diff --check
```

Expected: all tests pass, the build exits 0, and `git diff --check` emits no errors.

- [ ] **Step 6: Review the final diff**

Confirm:

- only the design/plan docs, twelve metadata lines, builder/test changes, and scoped CSS changed for this feature;
- pre-existing unrelated changes remain intact;
- generated VIP outputs stay gitignored;
- no summary contains banned writing-hygiene terms or em dashes.
