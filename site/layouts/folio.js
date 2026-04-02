/**
 * The Folio — snap-scroll whitepaper layout
 *
 * DOM mutations:
 *  1. Number each .essay-card with data-page (1-N)
 *  2. Move blockquote.confirmed to end of parent .essay-card
 *  3. Promote phase h1 elements to snap-stop viewport cards
 *  4. Ensure .essay-card has position: relative
 */

(function folio() {
    'use strict';

    const body = document.querySelector('.article-body');
    if (!body) return;

    // ── 1. Number essay cards ──
    const cards = body.querySelectorAll('.essay-card');
    cards.forEach(function (card, i) {
        card.setAttribute('data-page', i + 1);
    });

    // ── 2. Ensure position: relative on every card ──
    //    CSS handles this, but belt-and-braces for inline overrides.
    cards.forEach(function (card) {
        card.style.position = 'relative';
    });

    // ── 3. Move blockquote.confirmed to end of its parent card ──
    //    Absolute positioning needs it as the last child so it layers
    //    correctly without interrupting the content flow.
    body.querySelectorAll('blockquote.confirmed').forEach(function (bq) {
        var card = bq.closest('.essay-card');
        if (card && card.lastElementChild !== bq) {
            card.appendChild(bq);
        }
    });

    // ── 4. Phase h1 elements — add snap-stop sizing ──
    //    The CSS already applies min-height: 100vh and scroll-snap-align,
    //    but we add a class for JS-dependent styling if needed, and wrap
    //    the following italic description paragraph into the h1 container.
    body.querySelectorAll('h1').forEach(function (h1) {
        h1.classList.add('folio-phase-banner');

        // If the next sibling is the phase description paragraph,
        // absorb it visually by wrapping both in a snap container.
        var next = h1.nextElementSibling;
        if (next && next.tagName === 'P') {
            var wrapper = document.createElement('section');
            wrapper.className = 'folio-phase-page';
            wrapper.style.cssText =
                'scroll-snap-align: center; min-height: 100vh;' +
                'display: flex; flex-direction: column;' +
                'align-items: center; justify-content: center;';
            h1.parentNode.insertBefore(wrapper, h1);
            wrapper.appendChild(h1);
            wrapper.appendChild(next);
        }
    });
})();
