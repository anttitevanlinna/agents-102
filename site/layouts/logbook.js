/*
 * The Logbook — spine builder + scroll sync
 * Extracts thesis blockquotes from the body, builds a sticky
 * timeline spine in the left column, highlights on scroll.
 */

(function () {
    'use strict';

    // Wait for markdown render — article.html renders async
    setTimeout(initLogbook, 400);

    function initLogbook() {
        var articleBody = document.querySelector('.article-body');
        var bodyWrap = document.querySelector('.article-body-wrap');
        var container = document.querySelector('.article-with-toc');
        if (!articleBody || !bodyWrap || !container) return;

        // ── 1. Collect thesis blockquotes + context ──
        var theses = [];
        var allH1s = articleBody.querySelectorAll('h1');
        var currentPhase = null;
        var currentPhaseName = null;

        // Walk all direct children to map phase context
        Array.from(articleBody.children).forEach(function (el) {
            if (el.tagName === 'H1') {
                var m = el.textContent.match(/Phase\s+(\d)/);
                currentPhase = m ? 'phase-' + m[1] : null;
                currentPhaseName = el.textContent;
            }

            // Thesis blockquotes (inside essay-cards or direct)
            if (el.classList.contains('essay-card')) {
                var bqs = el.querySelectorAll('blockquote.thesis');
                var dateEl = el.querySelector('.essay-date');
                var h2 = el.querySelector('h2');
                bqs.forEach(function (bq) {
                    theses.push({
                        text: bq.textContent.replace(/^The thesis:\s*/i, '').trim(),
                        phase: currentPhase,
                        phaseName: currentPhaseName,
                        date: dateEl ? dateEl.textContent : null,
                        h2: h2,
                        card: el
                    });
                });
            }
        });

        if (theses.length === 0) return;

        // ── 2. Build spine DOM ──
        var spine = document.createElement('div');
        spine.className = 'logbook-spine';

        var spineItems = [];
        var lastPhase = null;

        theses.forEach(function (t) {
            // Phase heading when phase changes
            if (t.phase && t.phase !== lastPhase) {
                var ph = document.createElement('div');
                ph.className = 'spine-phase-heading ' + (t.phase || '');
                ph.textContent = t.phaseName || '';
                spine.appendChild(ph);
                lastPhase = t.phase;
            }

            // Date marker
            if (t.date) {
                var dm = document.createElement('div');
                dm.className = 'spine-date ' + (t.phase || '');
                dm.textContent = t.date;
                spine.appendChild(dm);
            }

            // Thesis text
            var st = document.createElement('div');
            st.className = 'spine-thesis ' + (t.phase || '');
            st.textContent = t.text;
            spine.appendChild(st);

            spineItems.push({ el: st, card: t.card });
        });

        // ── 3. Insert spine into the grid ──
        container.insertBefore(spine, bodyWrap);

        // ── 4. Scroll sync via IntersectionObserver ──
        var activeItem = null;

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                // Find matching spine item
                for (var i = 0; i < spineItems.length; i++) {
                    if (spineItems[i].card === entry.target) {
                        if (activeItem) activeItem.classList.remove('active');
                        spineItems[i].el.classList.add('active');
                        activeItem = spineItems[i].el;

                        // Scroll spine to keep active item visible
                        var spineRect = spine.getBoundingClientRect();
                        var itemRect = spineItems[i].el.getBoundingClientRect();
                        if (itemRect.top < spineRect.top || itemRect.bottom > spineRect.bottom) {
                            spineItems[i].el.scrollIntoView({ block: 'center', behavior: 'smooth' });
                        }
                        break;
                    }
                }
            });
        }, {
            rootMargin: '-10% 0px -60% 0px',
            threshold: 0
        });

        // Observe all essay cards that have a thesis
        spineItems.forEach(function (item) {
            if (item.card) observer.observe(item.card);
        });

        // Activate the first item by default
        if (spineItems.length > 0) {
            spineItems[0].el.classList.add('active');
            activeItem = spineItems[0].el;
        }
    }
})();
