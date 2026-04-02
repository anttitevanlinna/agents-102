/* =============================================================================
   SPINE LAYOUT JS — living vertical timeline + thesis mode
   ============================================================================= */
(function () {
    'use strict';

    var PHASE_COLORS = {
        'phase-1': '#5b9bd5',
        'phase-2': '#e0a458',
        'phase-3': '#d94f4f',
        'phase-4': '#ff6b35'
    };

    // ── 1. Create spine element ──
    var spine = document.createElement('div');
    spine.className = 'spine';
    spine.innerHTML = '<div class="spine-fill"></div>';
    document.body.appendChild(spine);
    var fill = spine.querySelector('.spine-fill');

    // ── 2. Gather phase h1s ──
    var phaseH1s = Array.prototype.slice.call(
        document.querySelectorAll('.article-body h1')
    );

    function getPhaseColor(el) {
        for (var cls in PHASE_COLORS) {
            if (el.classList.contains(cls)) return PHASE_COLORS[cls];
        }
        return PHASE_COLORS['phase-1'];
    }

    function getPhaseLabel(el) {
        return el.textContent.trim();
    }

    // ── 3. Scroll listener — update spine fill + phase color ──
    function onScroll() {
        var h = document.documentElement.scrollHeight - window.innerHeight;
        var pct = h > 0 ? (window.scrollY / h) * 100 : 0;
        fill.style.setProperty('--scroll-pct', pct + '%');
        fill.style.height = pct + '%';

        // Determine current phase
        var scrollPos = window.scrollY + 150;
        var color = PHASE_COLORS['phase-1'];
        for (var i = phaseH1s.length - 1; i >= 0; i--) {
            if (phaseH1s[i].offsetTop <= scrollPos) {
                color = getPhaseColor(phaseH1s[i]);
                break;
            }
        }
        fill.style.background = color;
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // ── 4. IntersectionObserver — essay card entrance animations ──
    var cards = document.querySelectorAll('.essay-card');
    if ('IntersectionObserver' in window && cards.length) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        cards.forEach(function (card) { observer.observe(card); });
    } else {
        // Fallback: show all immediately
        cards.forEach(function (card) { card.classList.add('visible'); });
    }

    // ── 5. Sticky phase labels ──
    if (phaseH1s.length) {
        phaseH1s.forEach(function (h1) {
            var label = document.createElement('div');
            label.className = 'phase-label-sticky';
            label.textContent = getPhaseLabel(h1);
            label.style.color = getPhaseColor(h1);
            // Insert just after the h1
            h1.parentNode.insertBefore(label, h1.nextSibling);
        });

        // Use IntersectionObserver to toggle sticky labels
        var labels = document.querySelectorAll('.phase-label-sticky');
        if ('IntersectionObserver' in window) {
            var labelObserver = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    // When the label's h1 scrolls out of view upward,
                    // the sticky label becomes visible via CSS position: sticky.
                    // We track which label is "active" to hide stale ones.
                    if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
                        entry.target.style.opacity = '1';
                    }
                });
            }, { threshold: 0 });

            phaseH1s.forEach(function (h1) { labelObserver.observe(h1); });
        }
    }

    // ── 6. Thesis mode toggle ──
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
            // Don't trigger if user is typing in an input
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
})();
