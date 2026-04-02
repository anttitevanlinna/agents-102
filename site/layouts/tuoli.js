/**
 * Tuoli — Copenhagen Design Museum Book layout
 *
 * DOM mutations:
 *  1. Ensure each .essay-card has position: relative
 *  2. Move blockquote.thesis to be the first child of its essay-card
 *  3. Position each thesis sidenote vertically aligned with its essay's h2
 *  4. Recalculate on resize (debounced)
 */

(function tuoli() {
    'use strict';

    var body = document.querySelector('.article-body');
    if (!body) return;

    var cards = body.querySelectorAll('.essay-card');
    var isDesktop = function () { return window.innerWidth >= 1200; };

    // ── 1. Ensure position: relative on every card ──
    cards.forEach(function (card) {
        card.style.position = 'relative';
    });

    // ── 2. Move thesis blockquote to first child of its card ──
    cards.forEach(function (card) {
        var thesis = card.querySelector('blockquote.thesis');
        if (thesis && card.firstElementChild !== thesis) {
            card.insertBefore(thesis, card.firstElementChild);
        }
    });

    // ── 3. Position thesis sidenotes to align with h2 ──
    function positionTheses() {
        if (!isDesktop()) {
            // Reset any inline positioning for mobile
            cards.forEach(function (card) {
                var thesis = card.querySelector('blockquote.thesis');
                if (thesis) thesis.style.top = '';
            });
            return;
        }

        cards.forEach(function (card) {
            var thesis = card.querySelector('blockquote.thesis');
            var heading = card.querySelector('h2');
            if (!thesis || !heading) return;

            var cardRect = card.getBoundingClientRect();
            var headingRect = heading.getBoundingClientRect();
            var offset = headingRect.top - cardRect.top;

            thesis.style.top = Math.max(0, offset) + 'px';
        });
    }

    // ── 4. Debounced resize handler ──
    var resizeTimer;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(positionTheses, 120);
    });

    // Initial positioning
    positionTheses();
})();
