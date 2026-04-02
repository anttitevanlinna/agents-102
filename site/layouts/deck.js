/*
 * The Deck — snap-scroll whitepaper behaviour
 *
 * 1. Wraps essay-card body content in .essay-body divs
 * 2. Adds "Read →" expand buttons
 * 3. Creates progress dots (one per snap target)
 * 4. IntersectionObserver tracks the active card
 * 5. Keyboard: Space toggles expand on current card
 */

(function () {
  'use strict';

  const body = document.querySelector('.article-body');
  if (!body) return;

  // Mark the root element so CSS can scope everything
  document.body.classList.add('deck');

  // ── Collect snap targets: phase h1s + essay cards ──
  const cards = Array.from(body.querySelectorAll('.essay-card'));
  const phaseH1s = Array.from(body.querySelectorAll('h1'));
  const targets = [];   // ordered list of {el, phase}

  // Detect phase class on an element or its ancestors
  function getPhase(el) {
    for (let i = 1; i <= 4; i++) {
      if (el.classList.contains('phase-' + i)) return i;
      if (el.closest('.phase-' + i)) return i;
    }
    return 4; // fallback to Bosser orange
  }

  // Build ordered target list by DOM position
  const all = Array.from(body.querySelectorAll('h1, .essay-card'));
  all.forEach(function (el) {
    targets.push({ el: el, phase: getPhase(el) });
  });

  // ── Wrap body content & add expand buttons ──
  cards.forEach(function (card) {
    var thesis = card.querySelector('blockquote.thesis');
    if (!thesis) return;

    // Everything after the thesis becomes the collapsible body
    var wrapper = document.createElement('div');
    wrapper.className = 'essay-body';

    var sibling = thesis.nextSibling;
    while (sibling) {
      var next = sibling.nextSibling;
      wrapper.appendChild(sibling);
      sibling = next;
    }
    card.appendChild(wrapper);

    // Add expand button
    var btn = document.createElement('button');
    btn.className = 'essay-expand-btn';
    btn.textContent = 'Read \u2192';
    btn.setAttribute('aria-label', 'Expand essay body');
    thesis.insertAdjacentElement('afterend', btn);

    btn.addEventListener('click', function () {
      var expanded = card.classList.toggle('expanded');
      btn.textContent = expanded ? 'Collapse \u2190' : 'Read \u2192';
    });
  });

  // ── Progress dots ──
  var dotsContainer = document.createElement('nav');
  dotsContainer.className = 'deck-dots';
  dotsContainer.setAttribute('aria-label', 'Article progress');

  targets.forEach(function (t, i) {
    var dot = document.createElement('button');
    dot.className = 'deck-dot dot-phase-' + t.phase;
    dot.setAttribute('aria-label', 'Go to section ' + (i + 1));
    dot.addEventListener('click', function () {
      t.el.scrollIntoView({ behavior: 'smooth' });
    });
    dotsContainer.appendChild(dot);
  });

  document.body.appendChild(dotsContainer);

  // ── IntersectionObserver: highlight active dot ──
  var dots = Array.from(dotsContainer.querySelectorAll('.deck-dot'));
  var currentIndex = 0;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var idx = targets.findIndex(function (t) { return t.el === entry.target; });
      if (idx === -1) return;
      currentIndex = idx;
      dots.forEach(function (d, j) {
        d.classList.toggle('active', j === idx);
      });
    });
  }, {
    root: body,
    threshold: 0.5
  });

  targets.forEach(function (t) { observer.observe(t.el); });

  // ── Keyboard: Space toggles expand on current card ──
  document.addEventListener('keydown', function (e) {
    if (e.key !== ' ' || e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    var current = targets[currentIndex];
    if (!current || !current.el.classList.contains('essay-card')) return;

    e.preventDefault();
    var btn = current.el.querySelector('.essay-expand-btn');
    if (btn) btn.click();
  });

})();
