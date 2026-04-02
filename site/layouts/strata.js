/*
 * Strata layout — JS enhancements
 *
 * 1. Wraps each phase (h1 + its essays) in a .phase-section div
 *    with a strata-N class for the full-bleed background change.
 *
 * 2. Creates a floating compass capsule (bottom-right) that shows
 *    current phase + essay position (e.g., "Phase 2 — 4 of 10").
 *
 * Runs after the article.html main script has built essay-cards,
 * assigned phase classes, and extracted dates.
 */

(function () {
    'use strict';

    // Wait for markdown render — article.html renders async via fetch
    setTimeout(strataInit, 500);

    function strataInit() {
    var articleBody = document.querySelector('.article-body');
    if (!articleBody) return;

    // ── 1. Build phase section wrappers ──

    var children = Array.prototype.slice.call(articleBody.children);
    var currentSection = null;
    var currentPhaseNum = null;
    var phaseSections = [];

    // Phase essay counts for compass
    var phaseEssayCounts = {};  // { '1': 5, '2': 10, ... }
    var essayPhaseMap = [];     // ordered list of { el: essayCard, phase: '1' }

    children.forEach(function(el) {
        if (el.tagName === 'H1') {
            // Detect phase number
            var m = el.textContent.match(/Phase\s+(\d)/);
            var phaseNum = m ? m[1] : null;

            if (phaseNum) {
                // Create new section wrapper
                currentSection = document.createElement('div');
                currentSection.className = 'phase-section strata-' + phaseNum;
                currentSection.setAttribute('data-phase', phaseNum);
                currentPhaseNum = phaseNum;
                phaseEssayCounts[phaseNum] = 0;
                phaseSections.push(currentSection);

                // Insert the section wrapper before the h1
                el.parentNode.insertBefore(currentSection, el);
                currentSection.appendChild(el);
            }
        } else if (currentSection) {
            // Track essay cards for compass
            if (el.classList && el.classList.contains('essay-card') && currentPhaseNum) {
                phaseEssayCounts[currentPhaseNum] = (phaseEssayCounts[currentPhaseNum] || 0) + 1;
                essayPhaseMap.push({ el: el, phase: currentPhaseNum, index: phaseEssayCounts[currentPhaseNum] });
            }
            currentSection.appendChild(el);
        }
    });


    // ── 2. Build the floating compass ──

    var compass = document.createElement('div');
    compass.className = 'strata-compass';
    compass.innerHTML = '<span class="compass-phase"></span><span class="compass-count"></span>';
    document.body.appendChild(compass);

    var compassPhase = compass.querySelector('.compass-phase');
    var compassCount = compass.querySelector('.compass-count');

    var phaseNames = {
        '1': 'Orientation',
        '2': 'Process Discovery',
        '3': 'Scaling Reality',
        '4': 'Compounding'
    };


    // ── 3. Scroll handler: update compass ──

    var allH1s = articleBody.querySelectorAll('h1');
    var h1Arr = Array.prototype.slice.call(allH1s);
    var lastActivePhase = null;
    var compassVisible = false;

    function updateCompass() {
        var scrollPos = window.scrollY + window.innerHeight * 0.5;

        // Find which phase we're in
        var activePhaseNum = null;
        for (var i = h1Arr.length - 1; i >= 0; i--) {
            if (h1Arr[i].offsetTop <= scrollPos) {
                var m = h1Arr[i].textContent.match(/Phase\s+(\d)/);
                if (m) { activePhaseNum = m[1]; break; }
            }
        }

        // Find which essay we're on
        var activeEssayIdx = 0;
        for (var j = essayPhaseMap.length - 1; j >= 0; j--) {
            if (essayPhaseMap[j].el.offsetTop <= scrollPos && essayPhaseMap[j].phase === activePhaseNum) {
                activeEssayIdx = essayPhaseMap[j].index;
                break;
            }
        }

        // Show/hide compass (only after scrolling past the intro)
        var shouldShow = activePhaseNum !== null && window.scrollY > 300;
        if (shouldShow && !compassVisible) {
            compass.classList.add('visible');
            compassVisible = true;
        } else if (!shouldShow && compassVisible) {
            compass.classList.remove('visible');
            compassVisible = false;
        }

        // Update compass content
        if (activePhaseNum && activePhaseNum !== lastActivePhase) {
            compassPhase.textContent = 'Phase ' + activePhaseNum;
            lastActivePhase = activePhaseNum;

            // Update phase class for color
            compass.className = 'strata-compass visible in-phase-' + activePhaseNum;
        }

        if (activePhaseNum && activeEssayIdx > 0) {
            var total = phaseEssayCounts[activePhaseNum] || 0;
            compassCount.textContent = activeEssayIdx + ' of ' + total;
        } else if (activePhaseNum) {
            compassCount.textContent = phaseNames[activePhaseNum] || '';
        }
    }

    // Throttled scroll listener
    var ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                updateCompass();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Initial update
    setTimeout(updateCompass, 300);

    } // end strataInit
})();
