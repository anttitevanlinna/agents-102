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
        bootstrap: {
            label: 'Bootstrap',
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
                { slug: 'learning-and-compounding-systems',      title: 'Learning and Compounding Systems' }
            ],
            references: [
                { slug: 'claude-quick-reference',                title: 'Claude quick reference — commands and how-tos' }
            ]
        },
        'agentic-engineering-101': {
            label: 'Agentic Engineering 101',
            lede: 'Six modules for software engineers. Become the Claude wizard — mastery, not remediation. Plus two optional modules when the cohort wants the team peak.',
            prework: { slug: 'prework', title: 'Prework — do this before Module 1' },
            modules: [
                { slug: 'getting-going',             title: 'Getting going + context' },
                { slug: 'plan-mode-done-right',      title: 'Plan mode, done right' },
                { slug: 'earn-the-trust',            title: 'Earn the trust' },
                { slug: 'run-the-first-experiment',  title: 'Run the first experiment' },
                { slug: 'learn-from-the-test',       title: 'Learn from the test, re-send packaged' },
                { slug: 'spot-gaps-build-the-loop',  title: 'Spot gaps, build the loop' }
            ]
        }
    };

    var DEFAULT_TRAINING = 'bootstrap';

    // Standalone include-link pattern: the entire paragraph is `[Title](kind/slug.md)`.
    // SPA fetches and inlines; workbook reads sync. Same regex, same shape.
    var INCLUDE_LINK_RE = /^\[([^\]]+)\]\(((?:exercises|lectures)\/[a-z0-9-]+)\.md\)[ \t]*$/gm;

    // Inline cross-doc link pattern: `(kind/slug.md)` anywhere in body, with
    // optional `../` prefixes. Renderer rewrites to `?file=kind/slug` URLs.
    var CROSS_DOC_LINK_RE = /\]\((?:\.\.\/)*(reference|supplementary|lectures|exercises)\/([a-z0-9-]+)\.md\)/g;

    // ── Pure utilities (Node-safe, no DOM) ──────────────────────────────────

    function esc(s) {
        return String(s)
            .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    }

    function rewriteCrossDocLinks(md) {
        return md.replace(CROSS_DOC_LINK_RE, '](curriculum.html?file=$1/$2)');
    }

    function stripMaintainerTail(md) {
        var i = md.indexOf('<!-- maintainer -->');
        return i >= 0 ? md.slice(0, i).trimEnd() + '\n' : md;
    }

    function extractParent(md) {
        var m = md.match(/<!--\s*parent:\s*([a-zA-Z0-9_-]+)\s*-->/);
        return m ? m[1] : null;
    }

    // Extract the first paragraph after `## Big Idea` from a module's markdown.
    function extractBigIdea(md) {
        var m = md.match(/^##\s*Big Idea\s*\n([^\n]+(?:\n(?!#)[^\n]+)*)/m);
        return m ? m[1].trim() : '';
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
            var text = code.innerText;
            var done = function () {
                btn.textContent = 'Copied';
                btn.classList.add('copy-btn--copied');
                setTimeout(function () {
                    btn.textContent = 'Copy';
                    btn.classList.remove('copy-btn--copied');
                }, 1400);
            };
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(text).then(done, fallback);
            } else {
                fallback();
            }
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

            var wrap = document.createElement('div');
            wrap.className = 'prompt-block';
            var header = document.createElement('div');
            header.className = 'prompt-block__header';
            header.innerHTML =
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
        CROSS_DOC_LINK_RE: CROSS_DOC_LINK_RE,

        // Pure (Node-safe)
        esc: esc,
        rewriteCrossDocLinks: rewriteCrossDocLinks,
        stripMaintainerTail: stripMaintainerTail,
        extractParent: extractParent,
        extractBigIdea: extractBigIdea,
        cardHtml: cardHtml,

        // DOM (browser only)
        decoratePrompts: decoratePrompts,
        addCopyButton: addCopyButton,
        installReadingProgress: installReadingProgress
    };
});
