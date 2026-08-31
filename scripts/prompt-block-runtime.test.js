#!/usr/bin/env node
/*
 * Tests for two runtime defects in the built workbook, reported from the
 * Northwind side 2026-08-31 (`inbound/2026-08-31-workbook-ui-bugs.md` in the
 * exchange repo), both in site/layouts — not in module content.
 *
 * Run: node --test scripts/prompt-block-runtime.test.js
 *
 * Bug 1 — Copy copied a trailing newline. `addCopyButton` wrote
 * `code.textContent` to the clipboard unchanged, and markdown leaves exactly
 * one newline before `</code>`, so every one of the 79 blocks on the page
 * copied with a trailing newline: a shell block ran on paste instead of
 * waiting to be read, and a prompt ending on `Shape:` arrived with the
 * reader's cursor already past the thing it asks them to write. Both clipboard
 * flavours (text/plain and text/html) are built from the same string, so both
 * must get the same treatment or the two pastes stop matching.
 *
 * Bug 2 — Long lines did not wrap. `<pre>` computes to `white-space: pre`, so
 * 51 of 79 blocks overflowed a 678px column (45 of them prompt blocks, worst
 * 5252px past the edge) and had to be read through a horizontal scrollbar. A
 * prompt block is prose that happens to live in `<pre>`, so it wraps; a shell
 * or code block is not — a wrapped command can read as two commands — so it
 * keeps horizontal scroll. The rule must not be scoped to the long-read: the
 * same blocks overflow in Slides.
 */

const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { JSDOM } = require('jsdom');

const CURRICULUM_SRC = fs.readFileSync(
  path.join(__dirname, '../site/layouts/curriculum.js'), 'utf8');
const CURRICULUM_CSS = fs.readFileSync(
  path.join(__dirname, '../site/layouts/curriculum.css'), 'utf8');

// Markdown's own output shape: the newline before `</code>` is the one under
// test, so it is written literally here rather than left to a template's
// indentation. One prompt block (decorated into .prompt-block) and one plain
// shell block (universal copy button, no prompt chrome).
const PROMPT_BODY = 'Read the diff and tell me what it changes.\n\n  Indented continuation line.\n\nShape:';
const SHELL_BODY = 'git status --short';

const FIXTURE = `
<main>
  <section class="module" id="getting-going">
    <section class="phase phase--exercise" id="exercises-orient-and-introspect">
      <p><strong>Prompt</strong> <em>(Claude Code)</em></p>
      <pre><code>${PROMPT_BODY}\n</code></pre>
      <p>Then check the tree:</p>
      <pre><code>${SHELL_BODY}\n</code></pre>
    </section>
  </section>
</main>`;

// Decorate the fixture, stub the clipboard, and return a click-the-button
// helper plus whatever the last click wrote. `write` (both flavours) is
// preferred by the runtime; `writeText` is the no-ClipboardItem fallback.
function mount(opts) {
  const withClipboardItem = !opts || opts.clipboardItem !== false;
  const dom = new JSDOM(FIXTURE, { runScripts: 'outside-only' });
  const win = dom.window;
  win.eval(CURRICULUM_SRC);

  const wrote = { plain: null, html: null, viaWriteText: null };
  if (withClipboardItem) {
    win.ClipboardItem = function (map) { this.map = map; };
  }
  Object.defineProperty(win.navigator, 'clipboard', {
    configurable: true,
    value: {
      write: async function (items) {
        const map = items[0].map;
        wrote.plain = await map['text/plain'].text();
        wrote.html = await map['text/html'].text();
      },
      writeText: async function (text) { wrote.viaWriteText = text; }
    }
  });

  win.CurriculumRuntime.decoratePrompts(win.document.body);

  const doc = win.document;
  const promptPre = doc.querySelector('.prompt-block__pre');
  assert.ok(promptPre, 'fixture prompt paragraph was decorated into a prompt block');

  async function copy(pre) {
    const btn = pre.classList.contains('prompt-block__pre')
      ? pre.closest('.prompt-block').querySelector('.copy-btn')
      : pre.querySelector('.copy-btn');
    assert.ok(btn, 'block carries a copy button');
    btn.dispatchEvent(new win.Event('click', { bubbles: true }));
    await new Promise(r => setTimeout(r, 0));
    return wrote;
  }

  const plainPre = Array.from(doc.querySelectorAll('pre'))
    .find(p => !p.classList.contains('prompt-block__pre'));
  return { win, doc, promptPre, plainPre, copy };
}

// ── Bug 1: the trailing newline ──────────────────────────────────────────────

test('copying a prompt block does not carry a trailing newline', async () => {
  const { promptPre, copy } = mount();
  const wrote = await copy(promptPre);
  assert.equal(wrote.plain, PROMPT_BODY);
  assert.doesNotMatch(wrote.plain, /\n$/, 'text/plain must not end in a newline');
});

test('copying a plain shell block does not carry a trailing newline', async () => {
  const { plainPre, copy } = mount();
  const wrote = await copy(plainPre);
  assert.equal(wrote.plain, SHELL_BODY, 'a shell command must not run on paste');
});

test('the html flavour is trimmed with the plain one, so the two pastes match', async () => {
  const { promptPre, copy } = mount();
  const wrote = await copy(promptPre);
  assert.doesNotMatch(wrote.html, /<br><\/div>$/,
    'a trailing newline in the html flavour renders as an empty last line');
  const htmlText = wrote.html
    .replace(/^<div>/, '').replace(/<\/div>$/, '')
    .replace(/<wbr>/g, '').replace(/<br>/g, '\n').replace(/&nbsp;/g, ' ');
  assert.equal(htmlText, wrote.plain, 'both flavours carry the same text');
});

test('the writeText fallback is trimmed too', async () => {
  const { promptPre, copy } = mount({ clipboardItem: false });
  const wrote = await copy(promptPre);
  assert.equal(wrote.viaWriteText, PROMPT_BODY);
});

test('trimming touches the end only — blank lines and indentation survive', async () => {
  const { promptPre, copy } = mount();
  const wrote = await copy(promptPre);
  assert.match(wrote.plain, /\n\n {2}Indented continuation line\.\n\n/,
    'interior blank lines and leading indentation are preserved verbatim');
});

// ── Bug 2: long lines in prompt blocks ───────────────────────────────────────
// Asserted against the stylesheet: jsdom does not lay out, so overflow itself
// is not measurable here. What is checkable — and what actually regressed — is
// that the rule exists, that it is unscoped (Slides reuses these blocks and
// loads the same stylesheet, so a `.module`-scoped or long-read-only rule
// leaves the deck exactly as it was), and that it stops at prompt blocks.

function ruleBodyFor(selector) {
  const re = new RegExp('(^|\\})[^{}]*' + selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') +
    '[^{}]*\\{([^}]*)\\}', 'm');
  const m = CURRICULUM_CSS.match(re);
  return m ? m[2] : null;
}

test('prompt blocks wrap long lines instead of scrolling sideways', () => {
  const body = ruleBodyFor('.prompt-block__pre');
  assert.ok(body, 'curriculum.css carries a rule for .prompt-block__pre');
  assert.match(body, /white-space:\s*pre-wrap/,
    '.prompt-block__pre must set white-space: pre-wrap');
  assert.match(body, /overflow-wrap:\s*(anywhere|break-word)/,
    'a 654-character unbroken line needs overflow-wrap to break at all');
});

test('the wrap rule is not scoped to the long-read, so Slides gets it too', () => {
  const re = /(^|\})([^{}]*\.prompt-block__pre[^{}]*)\{[^}]*white-space:\s*pre-wrap/m;
  const m = CURRICULUM_CSS.match(re);
  assert.ok(m, 'the wrapping rule is present');
  const selector = m[2].trim();
  assert.doesNotMatch(selector, /\.module|\.phase--|\.workbook/,
    `wrapping selector "${selector}" must not require long-read-only ancestors`);
});

test('code and shell blocks keep horizontal scroll — a wrapped command reads as two', () => {
  const generic = CURRICULUM_CSS.match(/(^|\})\s*(\.module\s+)?pre\s*\{([^}]*)\}/m);
  if (generic) {
    assert.doesNotMatch(generic[3], /white-space:\s*pre-wrap/,
      'the bare pre rule must not wrap — that would wrap code blocks as well');
  }
});
