/*
 * Strata2 — Strata visuals + Selkä wayfinding
 *
 * Combines:
 *   FROM STRATA: Phase-section wrapping (h1 + its essays wrapped in
 *                .phase-section divs with strata-N class for full-bleed
 *                background color shift).
 *
 *   FROM SELKÄ: Four wayfinding layers —
 *     1. Edge strip (6px left, phase-colored)
 *     2. Phase marker (top-left, mini-TOC of current phase's essays)
 *     3. Scroll-pause dot map (right edge, 1.2s idle to appear)
 *     4. Progress whisper (1px hairline at top)
 *
 * Runs after article.html has built essay-cards, assigned phase classes,
 * and extracted dates.
 */

(function strata2() {
    'use strict';

    // Wait for markdown render — article.html renders async via fetch
    setTimeout(init, 500);

    function init() {
        var articleBody = document.querySelector('.article-body');
        if (!articleBody) return;


        // ══════════════════════════════════════════════════════════════════
        // PHASE SECTION WRAPPING (from Strata)
        // Wraps each phase (h1 + its essays) in a .phase-section div
        // with a strata-N class for the full-bleed background change.
        // ══════════════════════════════════════════════════════════════════

        var children = Array.prototype.slice.call(articleBody.children);
        var currentSection = null;
        var currentPhaseNum = null;

        children.forEach(function (el) {
            if (el.tagName === 'H1') {
                var m = el.textContent.match(/Phase\s+(\d)/);
                var phaseNum = m ? m[1] : null;

                if (phaseNum) {
                    currentSection = document.createElement('div');
                    currentSection.className = 'phase-section strata-' + phaseNum;
                    currentSection.setAttribute('data-phase', phaseNum);
                    currentPhaseNum = phaseNum;

                    el.parentNode.insertBefore(currentSection, el);
                    currentSection.appendChild(el);
                }
            } else if (currentSection) {
                currentSection.appendChild(el);
            }
        });


        // ══════════════════════════════════════════════════════════════════
        // STRUCTURAL DATA GATHERING (from Selkä)
        // Build phase-to-essays map for wayfinding layers.
        // ══════════════════════════════════════════════════════════════════

        var phaseH1s = Array.prototype.slice.call(articleBody.querySelectorAll('h1'));
        var essayCards = Array.prototype.slice.call(articleBody.querySelectorAll('.essay-card'));
        var phaseColors = {
            'phase-1': getComputedStyle(document.documentElement).getPropertyValue('--phase-1').trim() || '#3d6e99',
            'phase-2': getComputedStyle(document.documentElement).getPropertyValue('--phase-2').trim() || '#a06928',
            'phase-3': getComputedStyle(document.documentElement).getPropertyValue('--phase-3').trim() || '#9e3535',
            'phase-4': getComputedStyle(document.documentElement).getPropertyValue('--phase-4').trim() || '#d4571a'
        };

        var phases = [];
        phaseH1s.forEach(function (h1) {
            var cls = null;
            for (var c = 0; c < h1.classList.length; c++) {
                if (h1.classList[c].indexOf('phase-') === 0) { cls = h1.classList[c]; break; }
            }
            if (cls) {
                phases.push({
                    el: h1,
                    phaseClass: cls,
                    name: h1.textContent.trim(),
                    essays: []
                });
            }
        });

        // Assign essays to phases
        essayCards.forEach(function (card) {
            var cardPhase = null;
            for (var c = 0; c < card.classList.length; c++) {
                if (card.classList[c].indexOf('phase-') === 0) { cardPhase = card.classList[c]; break; }
            }
            if (cardPhase) {
                for (var p = phases.length - 1; p >= 0; p--) {
                    if (phases[p].phaseClass === cardPhase) {
                        phases[p].essays.push(card);
                        break;
                    }
                }
            }
        });


        // ══════════════════════════════════════════════════════════════════
        // PRINT: Cover page + Table of Contents
        // Injected before article body. Hidden on screen, shown in print.
        // ══════════════════════════════════════════════════════════════════

        (function buildPrintPages() {
            var wrap = articleBody.closest('.article-body-wrap') || articleBody.parentNode;

            // ── Cover page ──
            var cover = document.createElement('div');
            cover.className = 'print-cover';

            // Extract title from first h1
            var titleH1 = articleBody.querySelector('h1');
            var titleText = titleH1 ? titleH1.textContent.trim() : document.title;

            // Extract subtitle from the intro or first paragraph
            var introEl = wrap.querySelector('.article-intro');
            var subtitleText = introEl ? introEl.textContent : '';

            // Extract author from author card
            var authorCard = wrap.querySelector('.author-card .author-name');
            var authorText = authorCard ? authorCard.textContent : 'Antti Tevanlinna';
            var authorDetail = wrap.querySelector('.author-card .author-info div:last-child');
            var authorDetailText = authorDetail ? authorDetail.textContent : '';

            cover.innerHTML =
                '<div class="print-cover-phase-bar">' +
                    '<span class="bar-1"></span><span class="bar-2"></span>' +
                    '<span class="bar-3"></span><span class="bar-4"></span>' +
                '</div>' +
                '<div class="print-cover-title">' + titleText + '</div>' +
                (subtitleText ? '<div class="print-cover-subtitle">' + subtitleText + '</div>' : '') +
                '<div class="print-cover-author">' + authorText + '</div>' +
                (authorDetailText ? '<div class="print-cover-org">' + authorDetailText + '</div>' : '') +
                '<div class="print-cover-footer">bosser.consulting</div>';

            wrap.insertBefore(cover, wrap.firstChild);

            // ── Table of contents ──
            var toc = document.createElement('div');
            toc.className = 'print-toc';
            var tocInner = '<div class="print-toc-title">Contents</div>';

            var phaseNames = {
                'phase-1': 'Phase 1: Orientation',
                'phase-2': 'Phase 2: Process Discovery',
                'phase-3': 'Phase 3: Scaling Reality',
                'phase-4': 'Phase 4: Compounding'
            };

            var currentTocPhase = null;
            var tocPhaseHtml = '';
            var monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

            articleBody.querySelectorAll('h1, h2').forEach(function(heading) {
                if (heading.tagName === 'H1') {
                    // Close previous phase block
                    if (currentTocPhase) {
                        tocInner += '<div class="print-toc-phase">' + tocPhaseHtml + '</div>';
                    }
                    // Detect phase class
                    var phClass = '';
                    for (var c = 0; c < heading.classList.length; c++) {
                        if (heading.classList[c].indexOf('phase-') === 0) { phClass = heading.classList[c]; break; }
                    }
                    var phaseName = phaseNames[phClass] || heading.textContent.trim();
                    tocPhaseHtml = '<div class="print-toc-phase-name toc-' + phClass + '">' + phaseName + '</div>';
                    currentTocPhase = phClass;
                } else if (heading.tagName === 'H2') {
                    var essayTitle = heading.textContent.trim();
                    // Check for date in nearby date pill
                    var datePill = heading.previousElementSibling;
                    var dateStr = '';
                    if (datePill && datePill.classList.contains('essay-date')) {
                        dateStr = '<span class="toc-date">' + datePill.textContent + '</span>';
                    }
                    tocPhaseHtml += '<div class="print-toc-entry">' + dateStr + essayTitle + '</div>';
                }
            });
            // Close last phase
            if (currentTocPhase) {
                tocInner += '<div class="print-toc-phase">' + tocPhaseHtml + '</div>';
            }

            toc.innerHTML = tocInner;

            // ── Mark closing sections for print page breaks ──
            articleBody.querySelectorAll('.essay-card').forEach(function(card) {
                var h2 = card.querySelector('h2');
                if (h2 && (h2.textContent.indexOf('What I Know Now') !== -1 ||
                           h2.textContent.indexOf('What To Do Monday') !== -1)) {
                    card.classList.add('print-closing-section');
                }
            });
            wrap.insertBefore(toc, cover.nextSibling);

        })();


        // ══════════════════════════════════════════════════════════════════
        // LAYER 1 — Edge Strip
        // ══════════════════════════════════════════════════════════════════

        var edge = document.createElement('div');
        edge.className = 'strata2-edge';
        document.body.appendChild(edge);


        // ══════════════════════════════════════════════════════════════════
        // LAYER 2 — Phase Marker with Mini-TOC
        // ══════════════════════════════════════════════════════════════════

        var marker = document.createElement('div');
        marker.className = 'strata2-phase-marker';
        marker.innerHTML = '<span class="marker-label"></span><span class="marker-count"></span><div class="strata2-phase-toc"></div>';
        document.body.appendChild(marker);

        var markerLabel = marker.querySelector('.marker-label');
        var markerCount = marker.querySelector('.marker-count');
        var markerToc = marker.querySelector('.strata2-phase-toc');


        // ══════════════════════════════════════════════════════════════════
        // LAYER 3 — Scroll-Pause Dot Map
        // ══════════════════════════════════════════════════════════════════

        var map = document.createElement('div');
        map.className = 'strata2-map';
        document.body.appendChild(map);

        var allDots = [];
        phases.forEach(function (phase, pi) {
            var group = document.createElement('div');
            group.className = 'strata2-map-phase';

            phase.essays.forEach(function (card) {
                var dot = document.createElement('div');
                dot.className = 'strata2-map-dot ' + phase.phaseClass;
                dot.title = card.querySelector('h2') ? card.querySelector('h2').textContent : '';
                dot.addEventListener('click', function () {
                    card.scrollIntoView({ behavior: 'smooth', block: 'start' });
                });
                group.appendChild(dot);
                allDots.push({ dot: dot, card: card, phaseClass: phase.phaseClass });
            });

            map.appendChild(group);

            // Separator between phases (not after last)
            if (pi < phases.length - 1) {
                var sep = document.createElement('div');
                sep.className = 'strata2-map-sep';
                map.appendChild(sep);
            }
        });


        // ══════════════════════════════════════════════════════════════════
        // LAYER 4 — Progress Whisper
        // ══════════════════════════════════════════════════════════════════

        var progress = document.createElement('div');
        progress.className = 'strata2-progress';
        document.body.appendChild(progress);


        // ══════════════════════════════════════════════════════════════════
        // SCROLL HANDLER — updates all four layers
        // ══════════════════════════════════════════════════════════════════

        var scrollPauseTimer = null;
        var isMapVisible = false;
        var lastActivePhase = null;

        function getCurrentPhase(scrollPos) {
            var current = null;
            for (var i = phases.length - 1; i >= 0; i--) {
                if (phases[i].el.offsetTop <= scrollPos) {
                    current = phases[i].el;
                    break;
                }
            }
            return current;
        }

        function getCurrentEssayIndex(scrollPos) {
            var idx = -1;
            for (var i = essayCards.length - 1; i >= 0; i--) {
                if (essayCards[i].offsetTop <= scrollPos) {
                    idx = i;
                    break;
                }
            }
            return idx;
        }

        function getPhaseData(h1) {
            if (!h1) return null;
            for (var i = 0; i < phases.length; i++) {
                if (phases[i].el === h1) return phases[i];
            }
            return null;
        }

        function update() {
            var scrollPos = window.scrollY + 140;
            var docHeight = document.documentElement.scrollHeight - window.innerHeight;
            var scrollPct = docHeight > 0 ? (window.scrollY / docHeight) : 0;

            // ── Progress whisper ──
            progress.style.width = (scrollPct * 100) + '%';

            // ── Current phase ──
            var currentH1 = getCurrentPhase(scrollPos);
            var phaseData = getPhaseData(currentH1);

            if (phaseData) {
                var color = phaseColors[phaseData.phaseClass] || '#a0a09a';

                // Edge strip color
                edge.style.background = color;

                // Progress whisper color
                progress.style.background = color;

                // Phase marker
                if (window.scrollY > 200) {
                    marker.classList.add('visible');
                    markerLabel.textContent = phaseData.name;

                    // Find current essay within this phase
                    var essayIdx = -1;
                    for (var e = 0; e < phaseData.essays.length; e++) {
                        if (phaseData.essays[e].offsetTop <= scrollPos) {
                            essayIdx = e;
                        }
                    }
                    if (essayIdx >= 0 && phaseData.essays.length > 1) {
                        markerCount.textContent = (essayIdx + 1) + ' / ' + phaseData.essays.length;
                    } else {
                        markerCount.textContent = '';
                    }

                    // Update mini-TOC if phase changed
                    if (phaseData !== lastActivePhase) {
                        var tocHtml = '';
                        phaseData.essays.forEach(function (card, idx) {
                            var h2 = card.querySelector('h2');
                            var title = h2 ? h2.textContent : 'Essay ' + (idx + 1);
                            var cardId = card.id || ('strata2-essay-' + idx);
                            if (!card.id) card.id = cardId;
                            tocHtml += '<a href="#' + cardId + '" data-idx="' + idx + '">' + title + '</a>';
                        });
                        markerToc.innerHTML = tocHtml;

                        // Click handlers for mini-TOC links
                        var tocLinks = markerToc.querySelectorAll('a');
                        for (var t = 0; t < tocLinks.length; t++) {
                            tocLinks[t].addEventListener('click', function (e) {
                                e.preventDefault();
                                var target = document.querySelector(this.getAttribute('href'));
                                if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            });
                        }

                        lastActivePhase = phaseData;
                    }

                    // Highlight current essay in mini-TOC
                    var tocAnchors = markerToc.querySelectorAll('a');
                    for (var a = 0; a < tocAnchors.length; a++) {
                        if (a === essayIdx) {
                            tocAnchors[a].classList.add('current');
                        } else {
                            tocAnchors[a].classList.remove('current');
                        }
                    }

                    marker.style.color = color;
                    marker.style.opacity = '';
                } else {
                    marker.classList.remove('visible');
                }
            } else {
                marker.classList.remove('visible');
                edge.style.background = 'transparent';
            }

            // ── Map dots — active state ──
            var currentCardIdx = getCurrentEssayIndex(scrollPos);
            for (var d = 0; d < allDots.length; d++) {
                if (d === currentCardIdx) {
                    allDots[d].dot.classList.add('active');
                } else {
                    allDots[d].dot.classList.remove('active');
                }
            }
        }

        function showMap() {
            map.classList.add('visible');
            isMapVisible = true;
        }

        function hideMap() {
            map.classList.remove('visible');
            isMapVisible = false;
        }

        function onScroll() {
            update();

            // Hide map on scroll
            if (isMapVisible) hideMap();

            // Reset scroll-pause timer
            clearTimeout(scrollPauseTimer);
            scrollPauseTimer = setTimeout(function () {
                if (window.scrollY > 300) {
                    showMap();
                }
            }, 1200);
        }

        // Throttled scroll
        var ticking = false;
        window.addEventListener('scroll', function () {
            if (!ticking) {
                requestAnimationFrame(function () {
                    onScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });

        // Initial update
        update();

    } // end init
})();
