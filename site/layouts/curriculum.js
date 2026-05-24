// Shared curriculum runtime — single source of truth for both the SPA
// (curriculum.html) and the single-page workbook (scripts/build-workbook.js).
//
// UMD-shape: works in both browser (window.CurriculumRuntime) and Node
// (require('./curriculum.js')). DOM-touching functions are guarded so the
// Node side can use the pure-string utilities without crashing on missing
// document/window.

(function (global, factory) {
    if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        global.CurriculumRuntime = factory();
    }
})(typeof window !== 'undefined' ? window : globalThis, function () {
    'use strict';

    // ── TRAININGS registry — single source of truth. SPA reads it for routing
    // and index rendering; build-workbook iterates the modules array.
    var TRAININGS = {
        'agents-101': {
            label: 'Agents 101',
            lede: 'Eight modules. The chat-to-systems leap. Build real *agents* on your own company content.',
            prework: { slug: 'prework', title: 'Prework — do this before Module 1' },
            modules: [
                { slug: 'getting-going',           title: 'Getting Going' },
                { slug: 'building-agent-systems', title: 'Building Agent Systems' },
                { slug: 'multi-agent-systems',    title: 'Multi-Agent Systems' },
                { slug: 'security',               title: 'Security' },
                { slug: 'output-quality',         title: 'Output Quality and Hallucination Control' },
                { slug: 'evaluations',            title: 'Evaluations' },
                { slug: 'personal-to-team',       title: 'From Personal to Team' },
                { slug: 'agents-building-agents', title: 'Agents Building Agents (The Flywheel)' }
            ],
            supplementaries: [
                { slug: 'what-is-an-agent',                      title: 'What is an Agent' },
                { slug: 'building-guardrails',                   title: 'Building Guardrails (and Skills)' },
                { slug: 'learning-and-compounding-systems',      title: 'Learning and Compounding Systems' },
                { slug: 'cookbook-for-agent-system-design',      title: 'Cookbook for Agent System Design' }
            ],
            references: [
                { slug: 'claude-quick-reference',                title: 'Claude quick reference — commands and how-tos' }
            ]
        },
        'agentic-engineering-101': {
            label: 'Agentic Engineering 101',
            lede: 'Six modules for software engineers. Become the Claude wizard by learning the new loop and finding your habit.',
            prework: { slug: 'prework', title: 'Prework — do this before Module 1' },
            modules: [
                { slug: 'getting-going',             title: 'Getting going + context' },
                { slug: 'plan-mode-done-right',      title: 'Plan mode, done right' },
                { slug: 'earn-the-trust',            title: 'Earn the trust' },
                { slug: 'run-the-first-experiment',  title: 'Run the first experiment' },
                { slug: 'learn-from-the-test',       title: 'Learn from the test, re-send packaged' },
                { slug: 'spot-gaps-build-the-loop',  title: 'Spot gaps, build the loop' }
            ],
            supplementaries: [
                { slug: 'what-is-agentic-engineering', title: 'What is agentic engineering' },
                { slug: 'clean-code-is-steering',     title: 'Clean Code Is Steering: Insights from Uncle Bob' },
                { slug: 'the-agent-loop',             title: 'The agent loop' },
                { slug: 'how-the-best-do-ci-cd',      title: 'How the best do CI/CD at agent scale' },
                { slug: 'workflow-composition-lineages', title: 'Workflow composition lineages' },
                { slug: 'skill-stacking',             title: 'Skill stacking system' }
            ],
            references: [
                { slug: 'claude-code-for-engineers', title: 'Claude Code for engineers' },
                { slug: 'mcp-and-connectors',        title: 'MCP and connectors' },
                { slug: 'multi-session-git',         title: 'Multi-session and Git: survival guide' },
                { slug: 'scheduled-agents',          title: 'Scheduled agents' },
                { slug: 'prompt-anatomy',            title: 'Prompt anatomy: the named moves' }
            ]
        },
        'claude-basics': {
            label: 'Claude Basics',
            lede: 'A 3-hour live workshop for people helping their organisation roll out Claude. See the system, find the crux, then build and verify in your own folder.',
            runtime: 'cowork',
            modules: [
                { slug: 'agentic-systems-repo-demo', title: 'Agentic systems, shown in the repo' },
                { slug: 'where-is-this-all-going',   title: 'Where is this all going?' },
                { slug: 'homework-build-and-verify', title: 'Separate homework: build and verify' },
                { slug: 'personal-site-with-guardrails', title: 'Paint by agent with guardrails' },
                { slug: 'organisers-run-the-workshop', title: 'Organisers: run the workshop' }
            ]
        }
    };

    var DEFAULT_TRAINING = 'agents-101';

    // Legal footer — single source for SPA + workbook. SPA fills its empty
    // <footer class="curriculum-footer"> at boot via innerHTML; workbook
    // emits the wrapped form via renderFooter() at build time.
    var FOOTER_INNER = '<p>' +
        '<strong>&copy; 2026 Bosser Oy.</strong> All rights reserved. ' +
        'Agents 102 is proprietary training material. As an enrolled student you have a personal usage license &mdash; ' +
        'you may learn from this, run the exercises, own what you build, and apply it at your own workplace. ' +
        'You may not redistribute the curriculum files, teach the material as your own, or use it to build a competing training. ' +
        'See the <a href="https://github.com/anttitevanlinna/agents-102/blob/main/COPYRIGHT.md">full license terms</a> ' +
        '&middot; <a href="https://bosser.consulting">bosser.consulting</a>' +
        '</p>';

    function renderFooter() {
        return '<footer class="curriculum-footer">' + FOOTER_INNER + '</footer>';
    }

    // ── Runtime switcher (Agents 101 dual-runtime: CLI / Desktop / Cowork) ──
    var RUNTIME_KEY = 'agents102-runtime';
    var VALID_RUNTIMES = { cli: 1, desktop: 1, cowork: 1 };
    var DEFAULT_RUNTIME = 'cowork';

    function trainingSupportsRuntimeSwitch(trainingKey) {
        return trainingKey === 'agents-101';
    }

    function getRuntime(trainingKey) {
        var t = TRAININGS[trainingKey];
        if (t && t.runtime && VALID_RUNTIMES[t.runtime]) return t.runtime;
        if (!trainingSupportsRuntimeSwitch(trainingKey)) return 'cli';
        var stored = null;
        try { stored = window.localStorage.getItem(RUNTIME_KEY); } catch (e) {}
        return VALID_RUNTIMES[stored] ? stored : DEFAULT_RUNTIME;
    }

    function applyRuntime(trainingKey, runtime) {
        document.body.classList.remove('runtime-cli', 'runtime-desktop', 'runtime-cowork');
        document.body.classList.add('runtime-' + runtime);
        var sw = document.getElementById('runtime-switcher');
        if (!sw) return;
        if (!trainingSupportsRuntimeSwitch(trainingKey)) { sw.hidden = true; return; }
        sw.hidden = false;
        var btns = sw.querySelectorAll('.runtime-switcher-btn');
        for (var i = 0; i < btns.length; i++) {
            btns[i].classList.toggle('is-active', btns[i].getAttribute('data-runtime') === runtime);
        }
    }

    function setRuntime(trainingKey, runtime) {
        if (!trainingSupportsRuntimeSwitch(trainingKey)) return;
        if (!VALID_RUNTIMES[runtime]) return;
        try { window.localStorage.setItem(RUNTIME_KEY, runtime); } catch (e) {}
        applyRuntime(trainingKey, runtime);
    }

    function wireRuntimeSwitcher(trainingKey) {
        var sw = document.getElementById('runtime-switcher');
        if (!sw) return;
        sw.addEventListener('click', function (ev) {
            var t = ev.target;
            if (t && t.classList.contains('runtime-switcher-btn')) {
                var rt = t.getAttribute('data-runtime');
                if (rt) setRuntime(trainingKey, rt);
            }
        });
    }

    // Standalone include-link pattern: the entire paragraph is `[Title](kind/slug.md)`.
    // SPA fetches and inlines; workbook reads sync. Same regex, same shape.
    var INCLUDE_LINK_RE = /^\[([^\]]+)\]\(((?:exercises|lectures)\/[a-z0-9-]+)\.md\)[ \t]*$/gm;

    // Prompt-include marker: `{{prompt:<key>}}` on its own line, expanded by
    // expandPrompts() at the start of the markdown pipeline (before marked).
    // Source of truth lives in curriculum/prompts/<key>.md; the SPA reads the
    // compiled site/prompts.json registry, the build script reads source files
    // directly. Marker MUST be alone on a line so expansion produces block-level
    // markdown (label paragraph + fenced code), not inline text.
    var PROMPT_INCLUDE_RE = /^\{\{prompt:([a-z0-9-]+)\}\}[ \t]*$/gm;

    // Inline cross-doc link patterns. Renderer rewrites to `?file=...` URLs.
    //   - Exercises and lectures live in shared dirs:
    //       (exercises|lectures)/<slug>.md  →  ?file=<kind>/<slug>
    //   - Reference and supplementary live under each training:
    //       trainings/<training>/(reference|supplementary)/<slug>.md
    //         →  ?file=trainings/<training>/<kind>/<slug>
    // Both patterns tolerate any number of `../` prefixes.
    // Trailing `(#anchor)?` captures heading fragments like `target.md#5-plan-mode-at-depth`
    // so callers can route them to the heading slug instead of dropping the fragment.
    var CROSS_DOC_SHARED_RE   = /\]\((?:\.\.\/)*(exercises|lectures)\/([a-z0-9-]+)\.md(#[^)]*)?\)/g;
    var CROSS_DOC_TRAINING_RE = /\]\((?:\.\.\/)*(trainings\/[a-z0-9-]+\/(?:reference|supplementary)\/[a-z0-9-]+)\.md(#[^)]*)?\)/g;
    // Workbook-side helper: same training-specific match as above but with kind+slug
    // exposed as separate capture groups, for callers that need to construct in-page
    // anchors of the form `#<kind>-<slug>`.
    var CROSS_DOC_TRAINING_KS_RE = /\]\((?:\.\.\/)*trainings\/[a-z0-9-]+\/(reference|supplementary)\/([a-z0-9-]+)\.md(#[^)]*)?\)/g;

    // ── Pure utilities (Node-safe, no DOM) ──────────────────────────────────

    function esc(s) {
        return String(s)
            .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    }

    function rewriteCrossDocLinks(md) {
        return md
            .replace(CROSS_DOC_SHARED_RE,   '](curriculum.html?file=$1/$2$3)')
            .replace(CROSS_DOC_TRAINING_RE, '](curriculum.html?file=$1$2)');
    }

    // GitHub-style heading slugger. Used to generate stable `id="..."` attrs
    // on h1–h6 so cross-doc links to `target.md#section-anchor` resolve in
    // both workbook and SPA. Behaviour matches `github-slugger`: lowercase,
    // strip non-word/space/hyphen punctuation (em-dashes, periods, commas),
    // then per-character whitespace → "-" (preserves the double-hyphen at
    // stripped em-dash positions).
    function slugifyHeading(text) {
        return String(text)
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .trim()
            .replace(/\s/g, '-');
    }

    // Wire heading-id generation into a marked instance. SPA calls this with
    // the CDN-loaded `marked`; workbook build calls it with the npm-loaded
    // `marked` from require(). Single source of truth, identical IDs across
    // both renderers.
    function configureMarked(markedRef) {
        markedRef.use({
            renderer: {
                heading: function (text, level) {
                    var id = slugifyHeading(text);
                    return '<h' + level + ' id="' + id + '">' + text + '</h' + level + '>\n';
                }
            }
        });
    }

    function stripMaintainerTail(md) {
        var i = md.indexOf('<!-- maintainer -->');
        return i >= 0 ? md.slice(0, i).trimEnd() + '\n' : md;
    }

    // Reconstruct the canonical inline prompt-block shape the renderer expects:
    //   **Prompt** *(<dest>[, <context>])*
    //
    //   ```
    //   <text>
    //   ```
    // decoratePrompts() matches the **Prompt** strong-bold paragraph + the
    // following <pre>; this output is byte-equivalent to a hand-authored block.
    // Sentinel pair using Mathematical White Square Brackets ⟦ ⟧ (U+27E6 / U+27E7).
    // These survive markdown code-fence rendering and HTML escape unchanged
    // (not in HTML special chars), and don't appear in any realistic prompt
    // content — safer than ASCII-square-bracket sentinels which would collide
    // with prompt blocks that quote markdown link syntax in the body. The
    // decoratePrompts pass converts these to <span class="prompt-anchor"> at
    // DOM time; the Copy button's textContent read passes through the span
    // and lands the original prompt verbatim on the clipboard.
    function injectAnchorSentinels(text, anchors) {
        if (!anchors || !anchors.length) return text;
        var out = text;
        anchors.forEach(function (a) {
            if (!a || !a.span || !a.move) return;
            if (!/^[a-z0-9-]+$/.test(a.move)) return; // slug must be CSS-class-safe
            var idx = out.indexOf(a.span);
            if (idx < 0) return; // span no longer matches body — silent skip
            out = out.slice(0, idx) +
                  '⟦A:' + a.move + '⟧' +
                  a.span +
                  '⟦/A⟧' +
                  out.slice(idx + a.span.length);
        });
        return out;
    }

    function renderPromptBlock(entry) {
        var dest = (entry && entry.dest) || 'Claude Code';
        var ctx = entry && entry.context ? ', ' + entry.context : '';
        var label = '**Prompt** *(' + dest + ctx + ')*';
        // Permission-mode sentinel, mirrors the ⟦A:slug⟧ anchor pattern.
        // decoratePrompts() parses this off the label paragraph and renders it
        // as a separate chip in the prompt-block header. Sentinel is appended
        // after the label so marked() treats it as inline text inside the same
        // paragraph — survives the render cycle untouched (U+27E6/U+27E7 are
        // not HTML-special and not in any realistic prompt label).
        var mode = entry && entry['permission-mode'];
        if (mode && /^[A-Za-z]+$/.test(mode)) {
            label += ' ⟦M:' + mode + '⟧';
        }
        var text = String((entry && entry.text) || '').replace(/\s+$/, '');
        if (entry && entry.anchors && entry.anchors.length) {
            text = injectAnchorSentinels(text, entry.anchors);
        }
        var fence = '```\n' + text + '\n```';
        return label + '\n\n' + fence;
    }

    // Replace every `{{prompt:<key>}}` line in `md` with the canonical block
    // shape, looking each key up in `registry` (object: key -> entry).
    //
    // Default mode (permissive): unknown keys pass through unchanged so a
    // missing entry renders as literal `{{prompt:foo}}` text — visible at
    // a glance and catchable by the lint / post-render audit. The SPA path
    // uses this mode to avoid hard-crashing the page on a stale registry.
    //
    // Strict mode (`opts.strict === true`): build path uses this. Any unknown
    // key throws with a list of all unresolved markers, so a typo in a module
    // file or a stale registry fails the build instead of silently shipping.
    function expandPrompts(md, registry, opts) {
        if (!md || !registry) return md;
        var unresolved = [];
        var out = md.replace(PROMPT_INCLUDE_RE, function (match, key) {
            var entry = registry[key];
            if (!entry) {
                unresolved.push(key);
                return match;
            }
            return renderPromptBlock(entry);
        });
        if (opts && opts.strict && unresolved.length) {
            throw new Error(
                'expandPrompts: unresolved {{prompt:<key>}} marker(s): ' +
                unresolved.map(function (k) { return '{{prompt:' + k + '}}'; }).join(', ')
            );
        }
        return out;
    }

    function extractParent(md) {
        var m = md.match(/<!--\s*parent:\s*([a-zA-Z0-9_-]+)\s*-->/);
        return m ? m[1] : null;
    }

    // Extract the first paragraph after `## Big Idea` from a module's markdown.
    // Returns null when the section is missing (matches SPA's hydrate semantics).
    function extractBigIdea(md) {
        var m = md.match(/^##\s+Big Idea\s*\n+([\s\S]*?)(?=\n##\s|$)/m);
        if (!m) return null;
        var body = m[1].trim();
        // Take the first paragraph only.
        var firstPara = body.split(/\n\s*\n/)[0].trim();
        // Collapse internal newlines so card chrome lays out cleanly.
        return firstPara.replace(/\s*\n\s*/g, ' ');
    }

    // Turn *word* into a `.accent` span; escape everything else.
    // Used by the SPA training-index lede.
    function renderAccents(s) {
        return esc(s).replace(/\*([^*]+)\*/g, '<span class="accent">$1</span>');
    }

    // ── DOM runtime (browser only) ──────────────────────────────────────────

    function addCopyButton(pre, host) {
        var mountTarget = host || pre;
        if (mountTarget.querySelector(':scope > .copy-btn')) return;
        var btn = document.createElement('button');
        btn.className = host ? 'copy-btn copy-btn--in-header' : 'copy-btn';
        btn.type = 'button';
        btn.setAttribute('aria-label', 'Copy to clipboard');
        btn.textContent = 'Copy';
        btn.addEventListener('click', function (ev) {
            ev.preventDefault();
            var code = pre.querySelector('code') || pre;
            // textContent (not innerText) — innerText respects CSS rendering
            // and can collapse newlines inside <pre><code>; textContent is the
            // DOM text and preserves whitespace deterministically.
            var text = code.textContent;
            var done = function () {
                btn.textContent = 'Copied';
                btn.classList.add('copy-btn--copied');
                setTimeout(function () {
                    btn.textContent = 'Copy';
                    btn.classList.remove('copy-btn--copied');
                }, 1400);
            };
            // Write BOTH text/plain and text/html to the clipboard. Destinations
            // that prefer HTML (Cowork input, Claude Code Desktop input, Slack,
            // browser-based markdown editors) read the <pre> wrapper and paste
            // it as a fenced code block, which suppresses the destination's URL
            // auto-detection that converts paths like `module-5/claim-pool.md`
            // into `[claim-pool.md](http://claim-pool.md)` markdown links.
            // Plain-text-only destinations (terminals, plain inputs) get the
            // text/plain fallback unchanged.
            function writeBoth() {
                if (window.ClipboardItem && navigator.clipboard && navigator.clipboard.write) {
                    // <div> + <br> instead of <pre> — destinations treat <pre>
                    // as a code block and apply their own dark theme even with
                    // inline-style overrides. <div> doesn't trigger code-block
                    // styling. Whitespace preserved via <br> for newlines and
                    // &nbsp; for leading indentation. <wbr> before file-extension
                    // dots is the backup defence against URL auto-detection
                    // (parsers see broken pattern, don't linkify).
                    var lines = text.split('\n').map(function (line) {
                        var indent = line.match(/^[ \t]*/)[0];
                        var rest = line.slice(indent.length);
                        var indentHtml = indent.replace(/ /g, '&nbsp;').replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
                        var escRest = esc(rest).replace(/(\.)([a-z]{1,5})\b/gi, '<wbr>$1$2');
                        return indentHtml + escRest;
                    });
                    var html = '<div>' + lines.join('<br>') + '</div>';
                    var item = new ClipboardItem({
                        'text/plain': new Blob([text], { type: 'text/plain' }),
                        'text/html':  new Blob([html], { type: 'text/html' })
                    });
                    return navigator.clipboard.write([item]);
                }
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    return navigator.clipboard.writeText(text);
                }
                return Promise.reject(new Error('no clipboard api'));
            }
            writeBoth().then(done, fallback);
            function fallback() {
                var ta = document.createElement('textarea');
                ta.value = text;
                ta.style.position = 'fixed';
                ta.style.opacity = '0';
                document.body.appendChild(ta);
                ta.select();
                try { document.execCommand('copy'); done(); }
                catch (e) { btn.textContent = 'Copy failed'; setTimeout(function () { btn.textContent = 'Copy'; }, 1400); }
                document.body.removeChild(ta);
            }
        });
        mountTarget.appendChild(btn);
    }

    // Session-boundary widget. Source shape:
    //   **Session** *(verb, "name")*
    //   <runtime-fork prose>
    //   ```
    //   /rename slug
    //   ```
    // Wraps the label paragraph + next paragraph (body prose) + next <pre>
    // (rename block) into a single .session-block. Stops at the next h*,
    // **Session**, or **Prompt** so widgets never run past their seam.
    // Run BEFORE decoratePrompts so the **Prompt** stop-condition fires before
    // prompt blocks are unwrapped.
    function decorateSessions(root) {
        Array.from(root.querySelectorAll('p')).forEach(function (p) {
            var strong = p.querySelector('strong');
            if (!strong || strong.textContent.trim() !== 'Session') return;

            var em = p.querySelector('em');
            var label = em ? em.textContent.trim() : '';
            label = label.replace(/^\(/, '').replace(/\)$/, '').trim();
            var firstComma = label.indexOf(',');
            var verb = firstComma >= 0 ? label.slice(0, firstComma).trim() : label.trim();
            var name = firstComma >= 0 ? label.slice(firstComma + 1).trim().replace(/^"|"$/g, '') : '';

            var wrap = document.createElement('div');
            wrap.className = 'session-block';

            var header = document.createElement('div');
            header.className = 'session-block__header';
            header.innerHTML =
                '<span class="session-block__label">Session</span>' +
                (verb ? '<span class="session-block__verb">' + esc(verb) + '</span>' : '') +
                (name ? '<span class="session-block__name">' + esc(name) + '</span>' : '');

            p.parentNode.insertBefore(wrap, p);
            wrap.appendChild(header);

            var body = document.createElement('div');
            body.className = 'session-block__body';
            wrap.appendChild(body);
            p.remove();

            // Pull subsequent siblings into the body until a stop boundary.
            // Widget body shape is: at most one body paragraph, at most one
            // <pre> (the rename command). Any other strong-led paragraph
            // (What you do:, Phase 1:, etc.) ends the widget — without that
            // stop, a return-verb widget with no <pre> swallows the page.
            var next = wrap.nextSibling;
            while (next) {
                if (next.nodeType !== 1) {
                    next = next.nextSibling;
                    continue;
                }
                var tag = next.tagName;
                if (/^H[1-6]$/.test(tag) || tag === 'HR') break;
                if (tag === 'P') {
                    var s = next.querySelector(':scope > strong');
                    if (s) break;
                    var sib = next;
                    next = next.nextSibling;
                    body.appendChild(sib);
                    continue;
                }
                // The inner <pre> in a session widget is the rename command —
                // CLI-only (Cowork can't rename; Desktop has no /rename either).
                // Wrap in .rt-cli so existing runtime CSS hides it for the other
                // two runtimes. Author writes plain markdown; visibility lives
                // at the renderer.
                if (tag === 'PRE') {
                    var preSib = next;
                    next = next.nextSibling;
                    var cliWrap = document.createElement('div');
                    cliWrap.className = 'rt-cli';
                    body.appendChild(cliWrap);
                    cliWrap.appendChild(preSib);
                    break;
                }
                break;
            }
        });
    }

    // Convert ⟦A:slug⟧content⟦/A⟧ sentinels (planted by injectAnchorSentinels
    // at prompt-expand time) into <span class="prompt-anchor" data-move="slug">
    // wrappers in the rendered <pre><code>. Runs once per prompt block during
    // decoratePrompts. The Copy button's textContent read sees through the
    // span and copies the original prompt; visual treatment is CSS-driven.
    var ANCHOR_SENTINEL_RE = /⟦A:([a-z0-9-]+)⟧([\s\S]*?)⟦\/A⟧/g;
    function convertAnchorSentinels(pre) {
        if (!pre) return;
        var code = pre.querySelector('code') || pre;
        var html = code.innerHTML;
        if (html.indexOf('⟦A:') < 0) return;
        var replaced = html.replace(ANCHOR_SENTINEL_RE, function (m, slug, content) {
            return '<span class="prompt-anchor" data-move="' + slug + '">' + content + '</span>';
        });
        if (replaced !== html) code.innerHTML = replaced;
    }

    // Click handler on .prompt-anchor spans: look up the matching anatomy
    // entry by data-move slug in window.__ANATOMY, render a popup card next
    // to the anchor. One popup at a time; click another anchor → moves the
    // popup; click outside → closes; Esc → closes. Idempotent installer:
    // attaches one delegated click listener per root, guarded by a flag so
    // re-renders don't double-bind. Silent no-op if anatomy data is missing.
    function attachAnchorPopups(root) {
        if (!root || root.__anchorPopupsBound) return;
        root.__anchorPopupsBound = true;

        var popup = null;
        function close() {
            if (popup && popup.parentNode) popup.parentNode.removeChild(popup);
            popup = null;
        }

        function open(anchor) {
            var slug = anchor.getAttribute('data-move');
            if (!slug) return;
            var data = (window.__ANATOMY || {})[slug];
            if (!data) return;
            close();
            popup = document.createElement('div');
            popup.className = 'prompt-anatomy-popup';
            popup.innerHTML =
                '<button class="prompt-anatomy-popup__close" type="button" aria-label="Close">×</button>' +
                '<div class="prompt-anatomy-popup__kicker">Anatomy</div>' +
                '<h3 class="prompt-anatomy-popup__title">' + esc(data.title) + '</h3>' +
                '<div class="prompt-anatomy-popup__body">' + data.html + '</div>';
            document.body.appendChild(popup);

            // Position: prefer below + left-aligned with the anchor; clamp
            // to viewport so the card never gets cut off on narrow windows.
            var rect = anchor.getBoundingClientRect();
            var popRect = popup.getBoundingClientRect();
            var top = window.scrollY + rect.bottom + 8;
            var left = window.scrollX + rect.left;
            var maxLeft = window.scrollX + window.innerWidth - popRect.width - 20;
            if (left > maxLeft) left = maxLeft;
            if (left < window.scrollX + 20) left = window.scrollX + 20;
            // If it'd run off the bottom of viewport, flip above the anchor.
            var bottomOverflow = (top - window.scrollY + popRect.height) - window.innerHeight;
            if (bottomOverflow > 0) {
                top = window.scrollY + rect.top - popRect.height - 8;
            }
            popup.style.top = top + 'px';
            popup.style.left = left + 'px';

            popup.querySelector('.prompt-anatomy-popup__close')
                .addEventListener('click', function (ev) { ev.preventDefault(); close(); });
        }

        root.addEventListener('click', function (ev) {
            var anchor = ev.target.closest && ev.target.closest('.prompt-anchor');
            if (anchor) {
                ev.preventDefault();
                open(anchor);
                return;
            }
            // Click outside the popup → close (clicks inside the popup are
            // safe; the close button handles its own dismissal).
            if (popup && !ev.target.closest('.prompt-anatomy-popup')) close();
        });

        document.addEventListener('keydown', function (ev) {
            if (ev.key === 'Escape') close();
        });
    }

    function decoratePrompts(root) {
        Array.from(root.querySelectorAll('p')).forEach(function (p) {
            var strong = p.querySelector('strong');
            if (!strong || strong.textContent.trim() !== 'Prompt') return;
            var pre = p.nextElementSibling;
            if (!pre || pre.tagName !== 'PRE') return;

            var em = p.querySelector('em');
            var label = em ? em.textContent.trim() : '';
            label = label.replace(/^\(/, '').replace(/\)$/, '').trim();
            var parts = label.split(/,\s*/);
            var dest = parts[0] || 'Claude Code';
            var context = parts.slice(1).join(', ');
            var destHtml = (dest === 'Claude Code')
                ? '<span class="rt-cowork">Cowork</span>' +
                  '<span class="rt-desktop">Claude Code Desktop</span>' +
                  '<span class="rt-cli">Claude Code CLI</span>'
                : esc(dest);

            // Permission-mode sentinel ⟦M:<mode>⟧ sits in the paragraph text
            // after the em-paren label; renderPromptBlock plants it when the
            // prompt's frontmatter declares `permission-mode:`. Parse it off
            // here, strip from the paragraph so the literal sentinel never
            // renders, surface as a separate header chip.
            var mode = '';
            var pHtml = p.innerHTML;
            var modeMatch = pHtml.match(/⟦M:([A-Za-z]+)⟧/);
            if (modeMatch) {
                mode = modeMatch[1];
                p.innerHTML = pHtml.replace(/\s*⟦M:[A-Za-z]+⟧\s*/g, '');
            }

            var wrap = document.createElement('div');
            wrap.className = 'prompt-block';
            var header = document.createElement('div');
            header.className = 'prompt-block__header';
            header.innerHTML =
                (mode ? '<span class="prompt-block__mode prompt-block__mode--' + esc(mode) + '" title="Paste this prompt in ' + esc(mode) + ' mode">' + esc(mode) + ' mode</span>' : '') +
                '<span class="prompt-block__label">Prompt</span>' +
                '<span class="prompt-block__arrow" aria-hidden="true">→</span>' +
                '<span class="prompt-block__dest">' + destHtml + '</span>' +
                (context ? '<span class="prompt-block__context">' + esc(context) + '</span>' : '');

            p.parentNode.insertBefore(wrap, p);
            wrap.appendChild(header);
            wrap.appendChild(pre);
            pre.classList.add('prompt-block__pre');
            p.remove();

            addCopyButton(pre, header);
            convertAnchorSentinels(pre);
        });

        // Universal copy buttons on every standalone <pre>.
        root.querySelectorAll('pre:not(.prompt-block__pre)').forEach(function (pre) {
            addCopyButton(pre);
        });

        // Back-compat: drop "*(end of prompt)*" leftovers from unmigrated files.
        Array.from(root.querySelectorAll('p, em')).forEach(function (n) {
            var t = n.textContent.trim();
            if (t === '(end of prompt)' || t === '*(end of prompt)*') {
                var host = n.tagName === 'EM' ? n.parentNode : n;
                if (host && host.tagName === 'P') host.remove();
            }
        });
    }

    // Compute the 2-digit number for a module slug within a training.
    // Prework = "00", modules = "01"..., optionalModules continue from there.
    function moduleNumber(trainingKey, slug) {
        var t = TRAININGS[trainingKey];
        if (!t) return null;
        if (t.prework && t.prework.slug === slug) return '00';
        var i = t.modules.findIndex(function (m) { return m.slug === slug; });
        if (i >= 0) return String(i + 1).padStart(2, '0');
        if (t.optionalModules) {
            var j = t.optionalModules.findIndex(function (m) { return m.slug === slug; });
            if (j >= 0) return String(t.modules.length + j + 1).padStart(2, '0');
        }
        return null;
    }

    // Pull the H1 + Big Idea out of a rendered module element and replace
    // them with a numbered hero block. Used by both SPA (one module per page)
    // and workbook (every module section, on init).
    function buildModuleHero(moduleEl, num) {
        var h1 = moduleEl.querySelector('h1');
        if (!h1 || h1.closest('.module-hero')) return;

        var bigIdeaHtml = null;
        var h2s = moduleEl.querySelectorAll(':scope > h2');
        for (var i = 0; i < h2s.length; i++) {
            if (h2s[i].textContent.trim().toLowerCase() === 'big idea') {
                var sib = h2s[i].nextElementSibling;
                if (sib && sib.tagName === 'P') {
                    bigIdeaHtml = sib.innerHTML;
                    sib.remove();
                }
                h2s[i].remove();
                break;
            }
        }

        var hero = document.createElement('header');
        hero.className = 'module-hero';
        if (num) {
            var n = document.createElement('div');
            n.className = 'module-hero-num';
            n.textContent = num;
            hero.appendChild(n);
        }
        var titleClone = h1.cloneNode(true);
        titleClone.classList.add('module-hero-title');
        hero.appendChild(titleClone);
        if (bigIdeaHtml) {
            var big = document.createElement('p');
            big.className = 'module-hero-big';
            big.innerHTML = bigIdeaHtml;
            hero.appendChild(big);
        }
        h1.parentNode.insertBefore(hero, h1);
        h1.remove();
    }

    // Standalone exercise / lecture pages get the same phase wrapper they
    // wear when embedded inside a parent module. Pass the container element
    // and the kind ('exercise' | 'lecture').
    function wrapStandaloneInPhase(container, kind) {
        if (!kind || (kind !== 'exercise' && kind !== 'lecture')) return;
        if (container.querySelector(':scope > .phase')) return; // already wrapped
        var section = document.createElement('section');
        section.className = 'phase phase--' + kind;
        var kicker = document.createElement('div');
        kicker.className = 'phase-kicker';
        kicker.textContent = kind;
        section.appendChild(kicker);
        while (container.firstChild) section.appendChild(container.firstChild);
        container.appendChild(section);
    }

    // Supplementary / reference rows on the training index. Different shape
    // from cardHtml — flat row with kind label + title.
    function simpleRowHtml(kind, title, href) {
        return '<li><a href="' + href + '">' +
               '<span class="supp-kind">' + esc(kind) + '</span>' +
               '<span class="supp-title">' + esc(title) + '</span>' +
               '<span class="module-arrow">→</span>' +
               '</a></li>';
    }

    function installReadingProgress() {
        if (document.querySelector('.reading-progress')) return;
        var bar = document.createElement('div');
        bar.className = 'reading-progress';
        document.body.appendChild(bar);
        var update = function () {
            var doc = document.documentElement;
            var max = doc.scrollHeight - doc.clientHeight;
            var pct = max > 0 ? (window.scrollY / max) * 100 : 0;
            bar.style.width = pct + '%';
        };
        window.addEventListener('scroll', update, { passive: true });
        window.addEventListener('resize', update);
        update();
    }

    // Module-list card chrome — used by both the SPA training index and the
    // workbook TOC. `bigIdea` is optional (workbook pre-fills, SPA hydrates
    // async via hydrateBigIdeas).
    // marked single-tilde strikethrough triggers on patterns like `(~30 min)... (~10 min)`.
    // Escape numeric-tildes before parse, on both SPA and workbook paths.
    function escapeTildes(md) {
        return md.replace(/~(\d)/g, '\\~$1');
    }

    // Shared TOC sections builder — both the SPA training-index page and the
    // workbook table-of-contents use the same five-section layout (prework,
    // modules, optional, supplementaries, references, trainer-guide). The
    // only differences are the URL strategy (router vs in-page anchors), the
    // heading tier, and whether Big Ideas are pre-filled (workbook reads sync
    // at build) or hydrated async (SPA).
    //
    // opts:
    //   moduleHref(trainingKey, slug)   — URL for prework / modules / optional cards
    //   fileHref(kind, slug)             — URL for supplementary / reference rows
    //   trainerGuideHref                 — URL string for the trainer-guide row
    //   bigIdeaFor(slug)                 — sync getter for Big Ideas (workbook); null for SPA (hydrates later)
    //   trainingKey                      — passed through to moduleHref
    //   showModuleCountHeading           — true on SPA (lede-style headings); false in workbook (cover replaces)
    //   headingTag                       — 'h2' (SPA) or 'h3' (workbook nested under the cover's h2)
    //   bigIdeaDataAttr                  — 'data-big-ideas' marker on module list (SPA needs this for hydration)
    function buildTocSections(t, opts) {
        var trainingKey = opts.trainingKey;
        var heading = opts.headingTag || 'h2';
        var bigIdea = opts.bigIdeaFor || function () { return null; };
        var bigIdeasAttr = opts.bigIdeaDataAttr ? ' ' + opts.bigIdeaDataAttr : '';
        var html = '';

        if (t.prework) {
            if (opts.showModuleCountHeading) html += '<' + heading + ' class="index-heading">Before Module 1</' + heading + '>';
            html += '<ol class="module-list index-prework"' + bigIdeasAttr + '>';
            html += cardHtml('00', t.prework.title, t.prework.slug, opts.moduleHref(trainingKey, t.prework.slug), bigIdea(t.prework.slug));
            html += '</ol>';
        }

        if (t.modules.length) {
            if (opts.showModuleCountHeading) {
                var words = ['zero','one','two','three','four','five','six','seven','eight','nine','ten'];
                var word = words[t.modules.length] || String(t.modules.length);
                html += '<' + heading + ' class="index-heading">The ' + word + ' modules</' + heading + '>';
            }
            html += '<ol class="module-list index-modules"' + bigIdeasAttr + '>';
            t.modules.forEach(function (m, i) {
                var num = String(i + 1).padStart(2, '0');
                html += cardHtml(num, m.title, m.slug, opts.moduleHref(trainingKey, m.slug), bigIdea(m.slug));
            });
            html += '</ol>';
        }

        if (t.optionalModules && t.optionalModules.length) {
            if (opts.showModuleCountHeading) html += '<' + heading + ' class="index-heading">Optional extensions — when the cohort wants more</' + heading + '>';
            else html += '<' + heading + ' class="index-heading">Optional extensions</' + heading + '>';
            html += '<ol class="module-list index-modules"' + bigIdeasAttr + '>';
            t.optionalModules.forEach(function (m, i) {
                var num = String(t.modules.length + i + 1).padStart(2, '0');
                html += cardHtml(num, m.title, m.slug, opts.moduleHref(trainingKey, m.slug), bigIdea(m.slug));
            });
            html += '</ol>';
        }

        if (t.supplementaries && t.supplementaries.length) {
            html += '<' + heading + ' class="index-heading">Supplementary</' + heading + '>';
            html += '<ol class="module-list index-supplementaries">';
            t.supplementaries.forEach(function (s) {
                html += simpleRowHtml('Reference', s.title, opts.fileHref('supplementary', s.slug));
            });
            html += '</ol>';
        }

        if (t.references && t.references.length) {
            html += '<' + heading + ' class="index-heading">Quick reference</' + heading + '>';
            html += '<ol class="module-list index-references">';
            t.references.forEach(function (r) {
                html += simpleRowHtml('Lookup', r.title, opts.fileHref('reference', r.slug));
            });
            html += '</ol>';
        }

        // Trainer guide is built and reachable by direct URL (SPA route
        // ?file=trainer-guide; workbook sibling trainer-guide.html). Not
        // surfaced from the student-facing index — trainers know the URL.

        return html;
    }

    function cardHtml(num, title, slug, href, bigIdea) {
        var bigHtml = bigIdea ? esc(bigIdea) : '&nbsp;';
        return '<li data-slug="' + esc(slug) + '">' +
            '<a href="' + href + '">' +
            '<span class="module-n">' + esc(num) + '</span>' +
            '<span class="module-body">' +
            '<span class="module-title">' + esc(title) + '</span>' +
            '<span class="module-big"' + (bigIdea ? '' : ' data-big-idea') + '>' + bigHtml + '</span>' +
            '</span>' +
            '<span class="module-arrow">→</span>' +
            '</a></li>';
    }

    return {
        // Data
        TRAININGS: TRAININGS,
        DEFAULT_TRAINING: DEFAULT_TRAINING,
        INCLUDE_LINK_RE: INCLUDE_LINK_RE,
        CROSS_DOC_SHARED_RE: CROSS_DOC_SHARED_RE,
        CROSS_DOC_TRAINING_RE: CROSS_DOC_TRAINING_RE,
        CROSS_DOC_TRAINING_KS_RE: CROSS_DOC_TRAINING_KS_RE,
        FOOTER_INNER: FOOTER_INNER,
        renderFooter: renderFooter,

        // Pure (Node-safe)
        esc: esc,
        rewriteCrossDocLinks: rewriteCrossDocLinks,
        slugifyHeading: slugifyHeading,
        configureMarked: configureMarked,
        stripMaintainerTail: stripMaintainerTail,
        renderPromptBlock: renderPromptBlock,
        expandPrompts: expandPrompts,
        PROMPT_INCLUDE_RE: PROMPT_INCLUDE_RE,
        extractParent: extractParent,
        extractBigIdea: extractBigIdea,
        escapeTildes: escapeTildes,
        cardHtml: cardHtml,
        buildTocSections: buildTocSections,

        // DOM (browser only)
        decorateSessions: decorateSessions,
        decoratePrompts: decoratePrompts,
        attachAnchorPopups: attachAnchorPopups,
        addCopyButton: addCopyButton,
        installReadingProgress: installReadingProgress,
        buildModuleHero: buildModuleHero,
        moduleNumber: moduleNumber,
        wrapStandaloneInPhase: wrapStandaloneInPhase,
        simpleRowHtml: simpleRowHtml,
        renderAccents: renderAccents,

        // Runtime switcher
        getRuntime: getRuntime,
        applyRuntime: applyRuntime,
        setRuntime: setRuntime,
        wireRuntimeSwitcher: wireRuntimeSwitcher,
        trainingSupportsRuntimeSwitch: trainingSupportsRuntimeSwitch
    };
});
