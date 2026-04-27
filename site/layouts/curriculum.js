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
            lede: 'Six modules for software engineers. Become the Claude wizard — mastery, not remediation.',
            prework: { slug: 'prework', title: 'Prework — do this before Module 1' },
            modules: [
                { slug: 'getting-going',             title: 'Getting going + context' },
                { slug: 'plan-mode-done-right',      title: 'Plan mode, done right' },
                { slug: 'earn-the-trust',            title: 'Earn the trust' },
                { slug: 'run-the-first-experiment',  title: 'Run the first experiment' },
                { slug: 'learn-from-the-test',       title: 'Learn from the test, re-send packaged' },
                { slug: 'spot-gaps-build-the-loop',  title: 'Spot gaps, build the loop' }
            ],
            references: [
                { slug: 'claude-code-for-engineers', title: 'Claude Code for engineers' },
                { slug: 'mcp-and-connectors',        title: 'MCP and connectors' },
                { slug: 'multi-session-git',         title: 'Multi-session and Git: survival guide' },
                { slug: 'scheduled-agents',          title: 'Scheduled agents' }
            ]
        }
    };

    var DEFAULT_TRAINING = 'bootstrap';

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

    // ── Runtime switcher (Bootstrap dual-runtime: CLI / Desktop / Cowork) ──
    var RUNTIME_KEY = 'agents102-runtime';
    var VALID_RUNTIMES = { cli: 1, desktop: 1, cowork: 1 };
    var DEFAULT_RUNTIME = 'cowork';

    function trainingSupportsRuntimeSwitch(trainingKey) {
        return trainingKey === 'bootstrap';
    }

    function getRuntime(trainingKey) {
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
            html += '<' + heading + ' class="index-heading">' + (opts.showModuleCountHeading ? 'Supplementary — grows across the training' : 'Supplementary') + '</' + heading + '>';
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

        // Trainer guide row — both surfaces show it.
        html += '<' + heading + ' class="index-heading">For trainers</' + heading + '>';
        html += '<ol class="module-list index-references">';
        html += simpleRowHtml('Trainers', 'Delivery guide', opts.trainerGuideHref);
        html += '</ol>';

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
        CROSS_DOC_LINK_RE: CROSS_DOC_LINK_RE,
        FOOTER_INNER: FOOTER_INNER,
        renderFooter: renderFooter,

        // Pure (Node-safe)
        esc: esc,
        rewriteCrossDocLinks: rewriteCrossDocLinks,
        stripMaintainerTail: stripMaintainerTail,
        extractParent: extractParent,
        extractBigIdea: extractBigIdea,
        escapeTildes: escapeTildes,
        cardHtml: cardHtml,
        buildTocSections: buildTocSections,

        // DOM (browser only)
        decoratePrompts: decoratePrompts,
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
