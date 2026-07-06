/* Proto B — Rail viewer.
   Slides become full-height snap cards in normal flow. A fixed rail lists them,
   an IntersectionObserver lights the active one, and a top hairline tracks
   scroll progress. Clicking a rail item scrolls to that slide. */
(function () {
  'use strict';
  var el = SlidesCore.el;

  var source = document.getElementById('doc');
  var built = SlidesCore.buildSlides(source);
  var slides = built.slides;
  if (!slides.length) return;

  document.documentElement.classList.add('rail-html');
  document.body.classList.add('rail-body');

  var rail = el('div', 'rail');

  // progress hairline
  var progress = el('div', 'rail__progress');
  var progressFill = el('i');
  progress.appendChild(progressFill);

  // nav
  var nav = el('nav', 'rail__nav');
  var navHead = el('div', 'rail__navhead');
  var navTitle = el('div', 'rail__navtitle'); navTitle.textContent = built.titleText || 'Contents';
  var navMeta = el('div', 'rail__navmeta'); navMeta.textContent = slides.length + ' slides';
  navHead.append(navTitle, navMeta);
  var list = el('ul', 'rail__list');
  var items = slides.map(function (s, i) {
    var li = el('li');
    var btn = el('button', 'rail__item' + (s.isDivider ? ' rail__item--divider' : ''), { 'data-index': i });
    var num = el('span', 'rail__num'); num.textContent = s.isCover ? '—' : String(i);
    var label = el('span', 'rail__label'); label.textContent = s.title;
    btn.append(num, label);
    btn.addEventListener('click', function () {
      s.el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    li.appendChild(btn);
    list.appendChild(li);
    return btn;
  });
  nav.append(navHead, list);

  // main scroll column
  var main = el('div', 'rail__main');
  slides.forEach(function (s, i) {
    s.el.setAttribute('data-n', pad(i + 1) + ' / ' + pad(slides.length));
    main.appendChild(s.el);
  });

  // mobile drawer toggle + scrim
  var toggle = el('button', 'rail__toggle');
  toggle.innerHTML = menuIcon() + '<span>Contents</span>';
  var scrim = el('div', 'rail__scrim');
  toggle.addEventListener('click', function () { rail.classList.toggle('is-open'); });
  scrim.addEventListener('click', function () { rail.classList.remove('is-open'); });
  items.forEach(function (b) { b.addEventListener('click', function () { rail.classList.remove('is-open'); }); });

  rail.append(progress, nav, toggle, scrim, main);
  document.body.appendChild(rail);
  source.remove();

  // ── active-slide tracking ──
  var activeIdx = 0;
  function setActive(i) {
    if (i === activeIdx) return;
    activeIdx = i;
    items.forEach(function (b, k) { b.classList.toggle('is-active', k === i); });
    var active = items[i];
    if (active) active.scrollIntoView({ block: 'nearest' });
  }

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      // pick the entry nearest the viewport centre among those intersecting
      var best = null, bestRatio = 0;
      entries.forEach(function (e) {
        if (e.isIntersecting && e.intersectionRatio >= bestRatio) { best = e; bestRatio = e.intersectionRatio; }
      });
      if (best) setActive(+best.target.getAttribute('data-index'));
    }, { threshold: [0.25, 0.5, 0.75], rootMargin: '-20% 0px -20% 0px' });
    slides.forEach(function (s) { io.observe(s.el); });
  }

  // top progress = document scroll fraction
  function onScroll() {
    var h = document.documentElement;
    var max = h.scrollHeight - h.clientHeight;
    progressFill.style.width = (max > 0 ? (h.scrollTop / max * 100) : 100) + '%';
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();
  items[0].classList.add('is-active');

  // keyboard: up/down move between cards
  document.addEventListener('keydown', function (e) {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === 'ArrowRight') {
      e.preventDefault(); jump(activeIdx + 1);
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp' || e.key === 'ArrowLeft') {
      e.preventDefault(); jump(activeIdx - 1);
    } else if (e.key === 'Home') { e.preventDefault(); jump(0); }
    else if (e.key === 'End') { e.preventDefault(); jump(slides.length - 1); }
  });
  function jump(i) {
    i = Math.max(0, Math.min(slides.length - 1, i));
    slides[i].el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function pad(n) { return String(n).padStart(2, '0'); }
  function menuIcon() {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M4 6h16M4 12h16M4 18h16"/></svg>';
  }
})();
