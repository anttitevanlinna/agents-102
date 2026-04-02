/* =============================================================================
   KOMPASSI JS — Minimap + Phase Breadcrumb + Thesis Mode
   =============================================================================
   Three systems working together:

   1. MINIMAP — fixed right-edge column of tiny rectangles, one per essay.
      Height proportional to essay length. Phase-colored. Click to jump.
      Hover for title tooltip. Active essay highlighted.

   2. PHASE BREADCRUMB — fixed bar at top, appears after scrolling past the
      intro. Shows current phase name, essay number, and inline progress bar.
      The "you are here" indicator for 30-minute reading.

   3. THESIS MODE — press T to collapse body text and scan thesis statements.
      Pairs with minimap for structural overview.
   ============================================================================= */

(function () {
    'use strict';

    // Wait for markdown render — the article content is fetched async
    function tryInit() {
        if (!document.querySelector('.essay-card')) {
            setTimeout(tryInit, 200);
            return;
        }
        init();
    }
    setTimeout(tryInit, 300);

    function init() {

    var PHASE_COLORS = {
        'phase-1': 'var(--phase-1)',
        'phase-2': 'var(--phase-2)',
        'phase-3': 'var(--phase-3)',
        'phase-4': 'var(--phase-4)'
    };

    var PHASE_COLORS_RAW = {
        'phase-1': '#3d7ab8',
        'phase-2': '#c47d2e',
        'phase-3': '#b83d3d',
        'phase-4': '#e8621f'
    };

    // ── Helpers ──

    function getPhaseClass(el) {
        for (var cls in PHASE_COLORS) {
            if (el.classList.contains(cls)) return cls;
        }
        return 'phase-1';
    }

    function getPhaseName(h1) {
        // Extract short phase name: "Phase 1: Orientation" -> "Phase 1"
        var text = h1.textContent.trim();
        var match = text.match(/^(Phase\s+\d)/i);
        return match ? match[1] : text.substring(0, 20);
    }

    // ── Gather structure ──

    var phaseH1s = Array.prototype.slice.call(
        document.querySelectorAll('.article-body h1')
    );
    var essayCards = Array.prototype.slice.call(
        document.querySelectorAll('.essay-card')
    );
    var totalEssays = essayCards.length;

    if (!totalEssays) return;

    // Build phase-to-essays mapping
    var phases = [];
    var currentPhase = null;

    phaseH1s.forEach(function (h1) {
        currentPhase = {
            h1: h1,
            phaseClass: getPhaseClass(h1),
            name: getPhaseName(h1),
            fullName: h1.textContent.trim(),
            essays: []
        };
        phases.push(currentPhase);
    });

    // Assign each essay to its phase
    essayCards.forEach(function (card, i) {
        var phaseClass = getPhaseClass(card);
        for (var p = phases.length - 1; p >= 0; p--) {
            if (phases[p].phaseClass === phaseClass) {
                phases[p].essays.push({ card: card, globalIndex: i });
                break;
            }
        }
    });


    // ========================================================================
    // 1. MINIMAP
    // ========================================================================

    var minimap = document.createElement('div');
    minimap.className = 'minimap';
    minimap.setAttribute('aria-label', 'Article minimap — click to navigate');

    // Tooltip element
    var tooltip = document.createElement('div');
    tooltip.className = 'minimap-tooltip';
    document.body.appendChild(tooltip);

    // Calculate proportional heights
    // We'll measure essay heights after layout, but for initial render
    // we use equal heights and recalculate on first scroll.
    var segElements = [];
    var needsHeightCalc = true;

    phases.forEach(function (phase) {
        var group = document.createElement('div');
        group.className = 'minimap-phase';

        // Phase label
        var label = document.createElement('div');
        label.className = 'minimap-phase-label label-' + phase.phaseClass;
        label.textContent = phase.name;
        group.appendChild(label);

        phase.essays.forEach(function (essay) {
            var seg = document.createElement('button');
            seg.className = 'minimap-seg seg-' + phase.phaseClass;
            seg.setAttribute('aria-label', 'Jump to essay ' + (essay.globalIndex + 1));
            seg.style.height = '8px'; // initial, recalculated later

            // Store reference
            seg._essay = essay;
            seg._phaseClass = phase.phaseClass;
            segElements.push(seg);

            // Click to jump
            seg.addEventListener('click', function () {
                var h2 = essay.card.querySelector('h2');
                var target = h2 || essay.card;
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });

            // Hover for tooltip
            seg.addEventListener('mouseenter', function (e) {
                var h2 = essay.card.querySelector('h2');
                var title = h2 ? h2.textContent : 'Essay ' + (essay.globalIndex + 1);
                tooltip.innerHTML = '<span class="tooltip-num">' + (essay.globalIndex + 1) + '/' + totalEssays + '</span>' + title;
                tooltip.classList.add('visible');

                // Position tooltip vertically aligned with segment
                var rect = seg.getBoundingClientRect();
                tooltip.style.top = (rect.top + rect.height / 2 - 12) + 'px';
            });

            seg.addEventListener('mouseleave', function () {
                tooltip.classList.remove('visible');
            });

            group.appendChild(seg);
        });

        minimap.appendChild(group);
    });

    document.body.appendChild(minimap);


    // ── Recalculate minimap segment heights proportionally ──

    function recalcHeights() {
        if (!needsHeightCalc) return;
        needsHeightCalc = false;

        // Measure each essay card's height
        var heights = [];
        var totalHeight = 0;
        essayCards.forEach(function (card) {
            var h = card.offsetHeight || 100;
            heights.push(h);
            totalHeight += h;
        });

        if (totalHeight === 0) return;

        // Available minimap height (70vh minus phase gaps)
        var availableHeight = window.innerHeight * 0.65;
        var minSegHeight = 4;

        segElements.forEach(function (seg) {
            var idx = seg._essay.globalIndex;
            var proportion = heights[idx] / totalHeight;
            var segHeight = Math.max(minSegHeight, Math.round(proportion * availableHeight));
            seg.style.height = segHeight + 'px';
        });
    }

    // Recalculate after images load and layout settles
    window.addEventListener('load', function () {
        needsHeightCalc = true;
        recalcHeights();
    });


    // ========================================================================
    // 2. PHASE BREADCRUMB
    // ========================================================================

    var crumb = document.createElement('div');
    crumb.className = 'phase-crumb';
    crumb.innerHTML =
        '<div class="phase-crumb-left">' +
            '<div class="phase-crumb-dot"></div>' +
            '<span class="phase-crumb-title"></span>' +
            '<span class="phase-crumb-essay"></span>' +
        '</div>' +
        '<div class="phase-crumb-progress">' +
            '<div class="phase-crumb-progress-fill"></div>' +
        '</div>';
    document.body.appendChild(crumb);

    var crumbDot = crumb.querySelector('.phase-crumb-dot');
    var crumbTitle = crumb.querySelector('.phase-crumb-title');
    var crumbEssay = crumb.querySelector('.phase-crumb-essay');
    var crumbFill = crumb.querySelector('.phase-crumb-progress-fill');


    // ========================================================================
    // 3. SCROLL HANDLER — updates minimap, breadcrumb, reading state
    // ========================================================================

    var lastActiveIndex = -1;
    var crumbVisible = false;
    // Threshold: show breadcrumb after scrolling past the intro
    var CRUMB_THRESHOLD = 300;

    function onScroll() {
        recalcHeights();

        var scrollPos = window.scrollY + window.innerHeight * 0.3;
        var activeIndex = -1;

        // Find current essay
        for (var i = essayCards.length - 1; i >= 0; i--) {
            if (essayCards[i].offsetTop <= scrollPos) {
                activeIndex = i;
                break;
            }
        }

        // Update minimap active state
        if (activeIndex !== lastActiveIndex) {
            segElements.forEach(function (seg) {
                seg.classList.toggle('active', seg._essay.globalIndex === activeIndex);
            });

            // Update essay card reading state
            essayCards.forEach(function (card, idx) {
                card.classList.toggle('reading', idx === activeIndex);
            });

            lastActiveIndex = activeIndex;
        }

        // ── Breadcrumb update ──
        var shouldShow = window.scrollY > CRUMB_THRESHOLD;
        if (shouldShow !== crumbVisible) {
            crumbVisible = shouldShow;
            crumb.classList.toggle('visible', shouldShow);
        }

        if (shouldShow && activeIndex >= 0) {
            // Find which phase this essay belongs to
            var essayPhaseClass = getPhaseClass(essayCards[activeIndex]);
            var activePhase = null;
            var essayInPhaseIndex = 0;

            for (var p = 0; p < phases.length; p++) {
                for (var e = 0; e < phases[p].essays.length; e++) {
                    if (phases[p].essays[e].globalIndex === activeIndex) {
                        activePhase = phases[p];
                        essayInPhaseIndex = e;
                        break;
                    }
                }
                if (activePhase) break;
            }

            if (activePhase) {
                crumbDot.style.background = PHASE_COLORS_RAW[activePhase.phaseClass] || PHASE_COLORS_RAW['phase-1'];
                crumbTitle.textContent = activePhase.name;
                crumbEssay.textContent = 'Essay ' + (activeIndex + 1) + ' of ' + totalEssays;

                // Progress fill
                var progress = ((activeIndex + 1) / totalEssays) * 100;
                crumbFill.style.width = progress + '%';
                crumbFill.style.background = PHASE_COLORS_RAW[activePhase.phaseClass] || PHASE_COLORS_RAW['phase-1'];

                // Subtle border color matching phase
                crumb.style.borderBottomColor = (PHASE_COLORS_RAW[activePhase.phaseClass] || '#d4d1c9') + '40';
            }
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    // Initial call after a tick to let layout settle
    setTimeout(onScroll, 100);


    // ========================================================================
    // 4. THESIS MODE TOGGLE
    // ========================================================================

    function toggleThesis() {
        document.body.classList.toggle('thesis-mode');
        var btn = document.querySelector('.thesis-toggle');
        if (btn) {
            btn.setAttribute('aria-pressed',
                document.body.classList.contains('thesis-mode'));
        }
    }

    // Keyboard shortcut: T
    document.addEventListener('keydown', function (e) {
        if (e.key === 't' || e.key === 'T') {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' ||
                e.target.isContentEditable) return;
            toggleThesis();
        }
    });

    // Toggle button in nav
    var nav = document.querySelector('.article-nav');
    if (nav) {
        var btn = document.createElement('button');
        btn.className = 'thesis-toggle';
        btn.setAttribute('aria-pressed', 'false');
        btn.innerHTML = 'Thesis <kbd>T</kbd>';
        btn.addEventListener('click', toggleThesis);
        nav.appendChild(btn);
    }


    // ========================================================================
    // 5. ESSAY COUNTERS — inject "Essay N of 27" into each card
    // ========================================================================

    essayCards.forEach(function (card, i) {
        var counter = document.createElement('span');
        counter.className = 'essay-counter';
        counter.textContent = (i + 1) + ' / ' + totalEssays;
        var h2 = card.querySelector('h2');
        if (h2) {
            h2.parentNode.insertBefore(counter, h2.nextSibling);
        }
    });

    } // end init()
})();
