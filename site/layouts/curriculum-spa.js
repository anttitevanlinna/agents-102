(function () {
    // TRAININGS registry + helpers live in layouts/curriculum.js
    // (shared with workbook builds via UMD). Aliased here at the top
    // of the IIFE so var-hoisting doesn't bite call sites further down.
    var TRAININGS = CurriculumRuntime.TRAININGS;
    var DEFAULT_TRAINING = CurriculumRuntime.DEFAULT_TRAINING;
    var cardHtml = CurriculumRuntime.cardHtml;
    var simpleRowHtml = CurriculumRuntime.simpleRowHtml;
    var renderAccents = CurriculumRuntime.renderAccents;
    var extractBigIdea = CurriculumRuntime.extractBigIdea;
    var stripMaintainerTail = CurriculumRuntime.stripMaintainerTail;

    // Fill the legal footer from shared source.
    (function () {
        var mount = document.getElementById('curriculum-footer-mount');
        if (mount) mount.innerHTML = CurriculumRuntime.FOOTER_INNER;
    })();

    var params       = new URLSearchParams(window.location.search);
    var trainingKey  = params.get('training') || DEFAULT_TRAINING;
    var moduleSlug   = params.get('module');
    var directFile   = params.get('file'); // for standalone exercise/lecture viewing
    var container    = document.getElementById('module-body');
    var directFileParent = null; // set by extractParent() if the file declares <!-- parent: <slug> -->
    var training = TRAININGS[trainingKey];

    // ============================================================
    // Runtime switcher — Agents 101 only.
    //
    // Agents 101 supports three modes. The header toggle reveals them in
    // audience-friendliness order:
    //  - cowork   Cowork (Desktop tab). Skills as .plugin files. No plan mode.
    //  - desktop  Claude Code Desktop. Skills as .plugin files.
    //  - cli      Claude Code CLI (terminal). Skills as folders in ~/.claude/skills/.
    //
    // AE101 pages do not show the toggle and force runtime-cli (the CLI is
    // AE101's home runtime). The class lives on <body>; CSS hides the inactive
    // variants.
    //
    // Wrapping pattern in markdown:
    //  - Inline phrase fork:  <span class="rt-desktop">install via Customize</span>
    //  - Whole-prompt fork:   <div class="rt-cowork">…fenced code block…</div>
    //                         (raw-HTML blocks are valid markdown; marked.js
    //                         passes them through. Keep blank lines around the
    //                         markdown content inside the div so it parses.)
    //
    // Class semantics:
    //  - .rt-cli      visible only in cli
    //  - .rt-desktop  visible only in desktop
    //  - .rt-cowork   visible only in cowork
    //  - .rt-code     visible in cli AND desktop (i.e. anything Claude Code,
    //                 either surface). Use this for the most common fork —
    //                 plan mode, subagent terminology, the four-session pattern —
    //                 where Code/Cowork is the meaningful split and CLI/Desktop
    //                 don't differ. Use the narrower .rt-cli / .rt-desktop only
    //                 where the install affordance actually differs (M4, M7).
    //
    // Choice persists in localStorage. Default is 'cowork' — Agents 101's
    // most-friendly mode; matches the leftmost button position.
    //
    // Verified facts driving this design (see Agents 101-side reference
    // curriculum/reference/claude-quick-reference.md, maintainer audit):
    //  - same agent engine across all three; CLAUDE.md + subagents identical
    //  - .plugin install path: Desktop + Cowork; CLI uses folder skills
    //  - no plan mode in Cowork (use prompt-level discipline instead)
    //  - terminology: subagent (Code), agent (Cowork)
    // ============================================================
    // Runtime switcher logic lives in layouts/curriculum.js (shared).
    // SPA wires once at boot below.
    function getRuntime() { return CurriculumRuntime.getRuntime(trainingKey); }
    function applyRuntime(runtime) { CurriculumRuntime.applyRuntime(trainingKey, runtime); }
    function setRuntime(runtime) { CurriculumRuntime.setRuntime(trainingKey, runtime); }
    CurriculumRuntime.wireRuntimeSwitcher(trainingKey);

    applyRuntime(getRuntime());

    // Standalone exercise or lecture view: ?file=exercises/raw-llm  or  ?file=lectures/context-is-king
    if (directFile && !moduleSlug) {
        loadAndRender('../curriculum/' + directFile + '.md', directFile);
        return;
    }

    if (!training) {
        container.innerHTML = '<h1>Training not found</h1><p>No training named <code>' + esc(trainingKey) + '</code>. <a href="curriculum.html">Back to index</a>.</p>';
        document.title = 'Training not found — Agents 102';
        return;
    }

    if (!moduleSlug) {
        renderTrainingIndex(training);
        return;
    }

    // Prework page: ?training=agents-101&prework=1 (or ?module=prework for convenience)
    if (params.get('prework') === '1' || moduleSlug === 'prework') {
        if (training.prework) {
            loadAndRender('../curriculum/trainings/' + trainingKey + '/' + training.prework.slug + '.md', training.prework.title);
            return;
        }
    }

    var mod = training.modules.find(function (m) { return m.slug === moduleSlug; });
    if (!mod && training.optionalModules) {
        mod = training.optionalModules.find(function (m) { return m.slug === moduleSlug; });
    }
    if (!mod) {
        container.innerHTML = '<h1>Module not found</h1><p>No module <code>' + esc(moduleSlug) + '</code> in <code>' + esc(trainingKey) + '</code>. <a href="curriculum.html?training=' + trainingKey + '">Back</a>.</p>';
        document.title = 'Module not found — Agents 102';
        return;
    }

    loadAndRender('../curriculum/trainings/' + trainingKey + '/' + mod.slug + '.md', mod.title);

    // ============================================================
    // Core rendering: fetch markdown, expand includes, parse, inject
    // ============================================================
    function loadAndRender(path, fallbackTitle) {
        fetch(path)
            .then(function (res) {
                if (!res.ok) throw new Error('Not found: ' + path);
                return res.text();
            })
            .then(extractParent)
            .then(stripMaintainerTail)
            .then(expandIncludes)
            .then(rewriteCrossDocLinks)
            .then(CurriculumRuntime.escapeTildes)
            .then(function (md) {
                container.innerHTML = marked.parse(md);
                CurriculumRuntime.decorateSessions(container);
                CurriculumRuntime.decoratePrompts(container);
                var h1 = container.querySelector('h1');
                document.title = (h1 ? h1.textContent : fallbackTitle) + ' — Agents 102';
                if (typeof mod !== 'undefined' && mod) buildModuleHero(mod);
                wrapStandaloneIfNeeded();
                prependTopNav();
                appendNav();
                CurriculumRuntime.installReadingProgress();
            })
            .catch(function (err) {
                container.innerHTML = '<h1>Could not load</h1><p>' + esc(err.message) + '</p><p><a href="curriculum.html">Back to index</a>.</p>';
                document.title = 'Load error — Agents 102';
            });
    }

    // extractParent + stripMaintainerTail live in layouts/curriculum.js (shared).
    // SPA wraps extractParent to capture directFileParent as a side effect.
    function extractParent(md) {
        var slug = CurriculumRuntime.extractParent(md);
        if (slug) directFileParent = slug;
        return md;
    }
    // (stripMaintainerTail aliased at top of IIFE.)

    // Standalone exercise / lecture pages get the same phase wrapper they
    // wear when embedded inside a parent module — so the same content reads
    // the same way regardless of how the student arrived. Without this,
    // clicking a linkified exercise title from a module page flips the room
    // from ink-dark to cream and back.
    function wrapStandaloneIfNeeded() {
        if (!directFile) return;
        var kind = null;
        if (directFile.indexOf('exercises/') === 0) kind = 'exercise';
        else if (directFile.indexOf('lectures/') === 0) kind = 'lecture';
        CurriculumRuntime.wrapStandaloneInPhase(container, kind);
    }

    // Top breadcrumb: appears on every module / standalone-file / training-index page.
    // Lets the student jump back one level without scrolling. Skipped on the bare
    // training picker (no training context yet).
    function prependTopNav() {
        if (!training) return;
        // Skip on the training index itself — there's no level above it.
        if (!moduleSlug && !directFile) return;
        var nav = document.createElement('nav');
        nav.className = 'top-nav';
        nav.innerHTML = '<a class="top-nav-back" href="curriculum.html?training=' + trainingKey + '">← ' + esc(training.label) + '</a>';
        container.insertBefore(nav, container.firstChild);
    }

    // Promote the module's first H1 + "## Big Idea" paragraph into a single
    // editorial hero: module number, title, italic big-idea line. Removes the
    // now-redundant "## Big Idea" heading + paragraph from the body so the
    // student isn't reading the same sentence twice.
    // buildModuleHero lives in layouts/curriculum.js (shared).
    function buildModuleHero(modRef) {
        CurriculumRuntime.buildModuleHero(container, CurriculumRuntime.moduleNumber(trainingKey, modRef.slug));
    }

    // Bottom nav:
    //   - On a module page: prev module / all modules / next module
    //   - On a standalone exercise/lecture page: back to the training index
    function appendNav() {
        var nav = '';
        if (typeof mod !== 'undefined' && mod) {
            var allModules = training.modules.concat(training.optionalModules || []);
            var i = allModules.findIndex(function (m) { return m.slug === mod.slug; });
            var prev = i > 0 ? allModules[i - 1] : null;
            var next = i >= 0 && i < allModules.length - 1 ? allModules[i + 1] : null;
            nav += '<nav class="page-nav">';
            nav += prev
                ? '<a class="nav-prev" href="curriculum.html?training=' + trainingKey + '&module=' + prev.slug + '">' +
                    '<span class="nav-arrow">←</span>' +
                    '<span class="nav-text">' +
                        '<span class="nav-title">' + esc(prev.title) + '</span>' +
                        '<span class="nav-big" data-nav-big="' + esc(prev.slug) + '">&nbsp;</span>' +
                    '</span>' +
                  '</a>'
                : '<span class="nav-prev nav-empty"></span>';
            nav += '<a class="nav-home" href="curriculum.html?training=' + trainingKey + '">All modules</a>';
            nav += next
                ? '<a class="nav-next" href="curriculum.html?training=' + trainingKey + '&module=' + next.slug + '">' +
                    '<span class="nav-text">' +
                        '<span class="nav-title">' + esc(next.title) + '</span>' +
                        '<span class="nav-big" data-nav-big="' + esc(next.slug) + '">&nbsp;</span>' +
                    '</span>' +
                    '<span class="nav-arrow">→</span>' +
                  '</a>'
                : '<span class="nav-next nav-empty"></span>';
            nav += '</nav>';
        } else if (directFile) {
            nav += '<nav class="page-nav">';
            nav += '<span class="nav-prev nav-empty"></span>';
            if (directFileParent) {
                var parentMod = training.modules.find(function (m) { return m.slug === directFileParent; });
                var parentTitle = parentMod ? parentMod.title : directFileParent;
                nav += '<a class="nav-home" href="curriculum.html?training=' + trainingKey + '&module=' + directFileParent + '">← Back to ' + esc(parentTitle) + '</a>';
            } else {
                nav += '<a class="nav-home" href="curriculum.html">← Back to curriculum</a>';
            }
            nav += '<span class="nav-next nav-empty"></span>';
            nav += '</nav>';
        }
        if (nav) container.insertAdjacentHTML('beforeend', nav);
        hydrateNavBigIdeas();
    }

    // Fill the italic big-idea preview slot under each prev/next link by
    // fetching the linked module's markdown and pulling its "## Big Idea"
    // paragraph. Lets the student decide "continue or stop here?" without
    // clicking through.
    function hydrateNavBigIdeas() {
        container.querySelectorAll('.nav-big[data-nav-big]').forEach(function (slot) {
            var slug = slot.getAttribute('data-nav-big');
            if (!slug) return;
            fetch('../curriculum/trainings/' + trainingKey + '/' + slug + '.md')
                .then(function (res) { return res.ok ? res.text() : null; })
                .then(function (md) {
                    if (!md) return;
                    var idea = extractBigIdea(md);
                    if (idea) slot.textContent = idea;
                })
                .catch(function () { /* leave the slot blank */ });
        });
    }

    // (installReadingProgress lives in layouts/curriculum.js — shared with workbook builds.)

    // Rewrite inline cross-doc markdown links from source-relative .md paths to the
    // site router's query-string form so source files stay clean of renderer URLs.
    // Handles:
    //   [text](../reference/<slug>.md)      → [text](curriculum.html?file=reference/<slug>)
    //   [text](../supplementary/<slug>.md)  → [text](curriculum.html?file=supplementary/<slug>)
    // rewriteCrossDocLinks lives in layouts/curriculum.js (shared, pure).
    // SPA chain expects a Promise — wrap.
    function rewriteCrossDocLinks(md) {
        return Promise.resolve(CurriculumRuntime.rewriteCrossDocLinks(md));
    }

    // Expand standalone include links of the form:
    //   [Any text](exercises/slug.md)    or    [Any text](lectures/slug.md)
    // A link is an include only when it is the ENTIRE paragraph (its own line, no surrounding prose).
    // If the file fetch fails, the link is left as-is (renders as a normal link).
    function expandIncludes(md) {
        var re = /^\[([^\]]+)\]\(((?:exercises|lectures)\/[a-z0-9-]+\.md)\)[ \t]*$/gm;
        var matches = [];
        var m;
        while ((m = re.exec(md)) !== null) {
            matches.push({ full: m[0], path: m[2] });
        }
        if (matches.length === 0) return Promise.resolve(md);

        // Fetch uniques in parallel
        var uniquePaths = Array.from(new Set(matches.map(function (x) { return x.path; })));
        var fetches = uniquePaths.map(function (p) {
            return fetch('../curriculum/' + p)
                .then(function (res) { return res.ok ? res.text() : null; })
                .catch(function () { return null; });
        });

        return Promise.all(fetches).then(function (results) {
            var map = {};
            uniquePaths.forEach(function (p, i) { map[p] = results[i]; });
            matches.forEach(function (mm) {
                var content = map[mm.path];
                if (content !== null && content !== undefined) {
                    // Strip maintainer tail so it doesn't bleed into module pages
                    content = stripMaintainerTail(content);
                    // Linkify the first H1 so the included exercise/lecture title
                    // becomes a link to its standalone view.
                    var standalone = mm.path.replace(/\.md$/, '');
                    content = content.replace(/^# (.+)$/m,
                        '# [$1](curriculum.html?file=' + standalone + ')');
                    // Wrap in a phase block so CSS can give exercises vs. lectures
                    // distinct backgrounds — visual rhythm for scrollers.
                    var kind = mm.path.indexOf('exercises/') === 0 ? 'exercise' : 'lecture';
                    var wrapped =
                        '\n\n<section class="phase phase--' + kind + '">\n\n' +
                        '<div class="phase-kicker">' + kind + '</div>\n\n' +
                        content +
                        '\n\n</section>\n\n';
                    md = md.replace(mm.full, wrapped);
                }
            });
            return md;
        });
    }

    function renderTrainingIndex(t) {
        // Hero block (SPA-only chrome — workbook has its own cover).
        var heroHtml =
            '<div class="training-hero">' +
            '  <div class="training-eyebrow">The curriculum</div>' +
            '  <h1>' + esc(t.label) + '<span class="sep">.</span></h1>' +
            '  <p class="lede">' + renderAccents(t.lede) + '</p>' +
            '</div>';

        // Sections come from shared CR.buildTocSections — single source for
        // SPA + workbook. SPA URL strategy: router query strings; Big Ideas
        // hydrated async by hydrateBigIdeas below, so bigIdeaFor returns null.
        var sectionsHtml = CurriculumRuntime.buildTocSections(t, {
            trainingKey: trainingKey,
            moduleHref: function (k, s) { return 'curriculum.html?training=' + k + '&module=' + s; },
            fileHref: function (kind, s) { return 'curriculum.html?file=' + kind + '/' + s; },
            trainerGuideHref: 'curriculum.html?file=trainer-guide',
            bigIdeaFor: null,
            showModuleCountHeading: true,
            headingTag: 'h2',
            bigIdeaDataAttr: 'data-big-ideas'
        });

        container.innerHTML = heroHtml + sectionsHtml;
        document.title = t.label + ' Curriculum — Agents 102';

        prependTopNav();
        CurriculumRuntime.installReadingProgress();

        // Hydrate big ideas from each module's markdown so the card gets its
        // one-liner without duplicating content in this file.
        hydrateBigIdeas(t);
    }

    // (cardHtml + simpleRowHtml aliased at top of IIFE.)

    function hydrateBigIdeas(t) {
        var items = [];
        if (t.prework) items.push({ slug: t.prework.slug });
        t.modules.forEach(function (m) { items.push({ slug: m.slug }); });
        if (t.optionalModules) t.optionalModules.forEach(function (m) { items.push({ slug: m.slug }); });

        items.forEach(function (item) {
            var path = '../curriculum/trainings/' + trainingKey + '/' + item.slug + '.md';
            fetch(path)
                .then(function (res) { return res.ok ? res.text() : null; })
                .then(function (md) {
                    if (!md) return;
                    var idea = extractBigIdea(md);
                    if (!idea) return;
                    var host = container.querySelector('li[data-slug="' + item.slug + '"] [data-big-idea]');
                    if (host) host.textContent = idea;
                })
                .catch(function () { /* leave card without big idea */ });
        });
    }

    // (extractBigIdea + renderAccents aliased at top of IIFE.)

    // ============================================================
    // Prompt block decoration
    // ============================================================
    // Author convention (canonical):
    //
    //     Lead-in sentence with a command verb.
    //
    //     **Prompt** *(Claude Code)*
    //
    //     ```
    //     <prompt content>
    //     ```
    //
    // The renderer:
    //   1. Wraps the **Prompt** label paragraph + the following <pre> in a
    //      .prompt-block container with a labelled header (destination chip
    //      + optional context note) and a Copy button on the <pre>.
    //   2. Adds a small Copy button to every other <pre> too (snippets,
    //      shell commands — copy is universally useful).
    //   3. Strips any leftover "*(end of prompt)*" paragraph from older
    //      files that still carry the closing marker.
    //
    // The destination string inside the *(...)* italic is parsed as
    // "destination[, context note]". Examples:
    //   *(Claude Code)*
    //   *(Builder Claude)*
    //   *(Claude Code, fresh session after /clear)*
    //   *(Claude Code, final move of the module)*
    //
    // Runtime-aware destination chip:
    // When the author writes the canonical "Claude Code" destination, the
    // chip renders three runtime-tagged spans (cowork / desktop / cli);
    // CSS hides the inactive ones based on body.runtime-*. Authors don't
    // need to fork prompt blocks just for the chip label — only fork the
    // prompt body or context note when those genuinely differ. Any other
    // destination (e.g. "Builder Claude") renders verbatim.
    // (decoratePrompts + addCopyButton live in layouts/curriculum.js — shared with workbook builds.)

    function esc(s) {
        return String(s)
            .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    }
})();
