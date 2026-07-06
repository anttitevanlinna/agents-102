/* Proto A — Deck viewer (the chosen layout).
   Pages one slide at a time. Arrows / space / PageUp-Down navigate; Home/End
   jump; number keys jump; F fullscreens. The left rail is a slim handle that
   expands on hover into B's phase-grouped outline; O (or the bar button) pins
   it open. */
(function () {
  'use strict';
  var el = SlidesCore.el;

  var source = document.getElementById('doc');
  var built = SlidesCore.buildSlides(source);
  var slides = built.slides;
  if (!slides.length) return;

  document.body.classList.add('deck-body');

  var i = -1;
  var pinned = false;

  // ── shell ──
  var deck = el('div', 'deck');

  var progress = el('div', 'deck__progress');
  var progressFill = el('i');
  progress.appendChild(progressFill);

  var viewport = el('div', 'deck__viewport');
  slides.forEach(function (s) { viewport.appendChild(s.el); });
  var edgePrev = navEdge('prev');
  var edgeNext = navEdge('next');
  viewport.append(edgePrev, edgeNext);

  // ── left hover-rail (B's outline, collapsed to a handle) ──
  var rail = el('nav', 'deck__rail');
  var handle = el('div', 'deck__rail-handle');
  handle.innerHTML = listIcon() + '<span>Contents</span>';
  var railHead = el('div', 'deck__rail-head');
  var railTitle = el('div', 'deck__rail-title'); railTitle.textContent = built.titleText || 'Contents';
  var railMeta = el('div', 'deck__rail-meta'); railMeta.textContent = slides.length + ' slides';
  railHead.append(railTitle, railMeta);
  var railList = el('ul', 'deck__rail-list');
  var railItems = slides.map(function (s, k) {
    var li = el('li');
    var btn = el('button', 'deck__rail-item'
      + (s.isDivider ? ' deck__rail-item--divider' : '')
      + (s.isCover ? ' deck__rail-item--cover' : ''), { 'data-index': k });
    var num = el('span', 'deck__rail-num');
    num.textContent = s.isCover ? '•' : (s.isDivider ? '§' : String(k + 1));
    var label = el('span', 'deck__rail-label'); label.textContent = s.isDivider ? s.phaseTitle : s.title;
    btn.append(num, label);
    btn.addEventListener('click', function () { go(k); collapseRail(); });
    li.appendChild(btn);
    railList.appendChild(li);
    return btn;
  });
  rail.append(handle, railHead, railList);
  rail.addEventListener('mouseenter', openRail);
  rail.addEventListener('mouseleave', collapseRail);

  // ── control bar ──
  var bar = el('div', 'deck__bar');
  var title = el('div', 'deck__title');
  title.textContent = built.titleText || '';
  var spacer = el('div', 'deck__spacer');
  var nav = el('div', 'deck__nav');
  var btnRail = iconBtn('list', 'Contents (O)'); btnRail.classList.add('deck__rail-btn');
  var btnPrev = iconBtn('prev', 'Previous (←)');
  var count = el('div', 'deck__count');
  var btnNext = iconBtn('next', 'Next (→)');
  btnRail.addEventListener('click', togglePin);
  btnPrev.addEventListener('click', function () { go(i - 1); });
  btnNext.addEventListener('click', function () { go(i + 1); });
  nav.append(btnRail, btnPrev, count, btnNext);
  bar.append(title, spacer, nav);

  deck.append(progress, rail, viewport, bar);
  document.body.appendChild(deck);
  source.remove();

  // ── rail open/close ──
  function openRail() { deck.classList.add('is-railopen'); }
  function collapseRail() { if (!pinned) deck.classList.remove('is-railopen'); }
  function togglePin() {
    pinned = !pinned;
    deck.classList.toggle('is-railpinned', pinned);
    if (pinned) openRail(); else deck.classList.remove('is-railopen');
  }

  // ── navigation ──
  function go(n) {
    n = Math.max(0, Math.min(slides.length - 1, n));
    i = n;
    slides.forEach(function (s, k) {
      s.el.classList.toggle('is-active', k === n);
      s.el.classList.toggle('is-past', k < n);
      if (k === n) s.el.scrollTop = 0;
    });
    railItems.forEach(function (b, k) { b.classList.toggle('is-active', k === n); });
    var active = railItems[n]; if (active) active.scrollIntoView({ block: 'nearest' });
    progressFill.style.width = ((n + 1) / slides.length * 100) + '%';
    count.textContent = (n + 1) + ' / ' + slides.length;
    edgePrev.disabled = n === 0;
    edgeNext.disabled = n === slides.length - 1;
    if (history.replaceState) history.replaceState(null, '', '#s' + (n + 1));
  }

  // ── keyboard ──
  document.addEventListener('keydown', function (e) {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    switch (e.key) {
      case 'ArrowRight': case 'PageDown': case ' ': case 'l': case 'j':
        e.preventDefault(); go(i + 1); break;
      case 'ArrowLeft': case 'PageUp': case 'h': case 'k':
        e.preventDefault(); go(i - 1); break;
      case 'Home': e.preventDefault(); go(0); break;
      case 'End': e.preventDefault(); go(slides.length - 1); break;
      case 'o': case 'O': e.preventDefault(); togglePin(); break;
      case 'Escape': pinned = false; deck.classList.remove('is-railpinned', 'is-railopen'); break;
      case 'f': case 'F':
        if (!document.fullscreenElement) { (document.documentElement.requestFullscreen || function () {}).call(document.documentElement); }
        else document.exitFullscreen();
        break;
      default:
        if (/^[0-9]$/.test(e.key)) { var t = e.key === '0' ? 9 : (+e.key - 1); if (t < slides.length) go(t); }
    }
  });

  var m = (location.hash || '').match(/^#s(\d+)$/);
  go(m ? (+m[1] - 1) : 0);

  // ── builders ──
  function navEdge(dir) {
    var b = el('button', 'deck__edge deck__edge--' + dir, { 'aria-label': dir === 'prev' ? 'Previous' : 'Next' });
    b.innerHTML = chevron(dir);
    b.addEventListener('click', function () { go(dir === 'prev' ? i - 1 : i + 1); });
    return b;
  }
  function iconBtn(kind, label) {
    var b = el('button', 'deck__btn', { title: label, 'aria-label': label });
    b.innerHTML = kind === 'list' ? listIcon() : chevron(kind);
    return b;
  }
  function chevron(dir) {
    var d = dir === 'prev' ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7';
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="' + d + '"/></svg>';
  }
  function listIcon() {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M4 6h16M4 12h16M4 18h16"/></svg>';
  }
})();
