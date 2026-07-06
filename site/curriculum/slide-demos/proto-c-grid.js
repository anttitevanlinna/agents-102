/* Proto C — Grid viewer.
   Home is a contact sheet of live, scaled thumbnails. Click one to open the
   focus overlay: the slide big, a filmstrip of thumbnails along the bottom,
   ← → to move, Escape / the grid button to return. */
(function () {
  'use strict';
  var el = SlidesCore.el;

  // Nominal slide geometry the thumbnails are drawn at, then scaled to fit.
  var NOM_W = 1024, NOM_H = 640;

  var source = document.getElementById('doc');
  var built = SlidesCore.buildSlides(source);
  var slides = built.slides;
  if (!slides.length) return;

  document.body.classList.add('grid-body');

  // Keep detached originals so the focus stage can render a fresh clone each time.
  var originals = slides.map(function (s) { return s.el; });

  // ── contact sheet ──
  var wrap = el('div', 'cgrid-wrap');
  var head = el('div', 'cgrid-head');
  var title = el('h1', 'cgrid-title'); title.textContent = built.titleText || 'Slides';
  var meta = el('div', 'cgrid-meta'); meta.textContent = slides.length + ' slides';
  head.append(title, meta);

  var grid = el('div', 'cgrid');
  var thumbFrames = [];   // {frame, scale} for rescale
  slides.forEach(function (s, i) {
    var btn = el('button', 'cthumb' + (s.isCover ? ' cthumb--cover' : '') + (s.isDivider ? ' cthumb--divider' : ''), { 'data-index': i });
    var mini = miniature(s.el, 'cthumb');
    thumbFrames.push(mini);
    var m = el('span', 'cthumb__meta');
    var n = el('span', 'cthumb__n'); n.textContent = s.isCover ? '·' : (s.isDivider ? '§' : pad(i));
    var t = el('span', 'cthumb__t'); t.textContent = s.title;
    m.append(n, t);
    btn.append(mini.frame, m);
    btn.addEventListener('click', function () { openFocus(i); });
    grid.appendChild(btn);
  });
  wrap.append(head, grid);
  document.body.appendChild(wrap);

  // ── focus overlay ──
  var focus = el('div', 'cfocus');
  var top = el('div', 'cfocus__top');
  var back = el('button', 'cfocus__back'); back.innerHTML = gridIcon() + '<span>All slides</span>';
  var fTitle = el('div', 'cfocus__title');
  var spacer = el('div', 'cfocus__spacer');
  var prev = el('button', 'cfocus__arrow', { 'aria-label': 'Previous' }); prev.innerHTML = chevron('prev');
  var count = el('div', 'cfocus__count');
  var next = el('button', 'cfocus__arrow', { 'aria-label': 'Next' }); next.innerHTML = chevron('next');
  top.append(back, fTitle, spacer, prev, count, next);

  var stage = el('div', 'cfocus__stage');
  var strip = el('div', 'cfocus__strip');
  var stripFrames = [];
  slides.forEach(function (s, i) {
    var b = el('button', 'cstrip' + (s.isDivider ? ' cstrip--divider' : ''), { 'data-index': i });
    var mini = miniature(s.el, 'cstrip');
    stripFrames.push(mini);
    var n = el('span', 'cstrip__n'); n.textContent = s.isCover ? '·' : (s.isDivider ? '§' : pad(i));
    b.append(mini.frame, n);
    b.addEventListener('click', function () { show(i); });
    strip.appendChild(b);
  });

  focus.append(top, stage, strip);
  document.body.appendChild(focus);
  source.remove();

  back.addEventListener('click', closeFocus);
  prev.addEventListener('click', function () { show(cur - 1); });
  next.addEventListener('click', function () { show(cur + 1); });

  var cur = 0;
  function openFocus(i) {
    focus.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    show(i);
    rescaleStrip();
  }
  function closeFocus() {
    focus.classList.remove('is-open');
    document.body.style.overflow = '';
  }
  function show(i) {
    cur = Math.max(0, Math.min(slides.length - 1, i));
    var s = slides[cur];
    stage.innerHTML = '';
    var clone = originals[cur].cloneNode(true);
    clone.style.opacity = 1; clone.style.visibility = 'visible';
    stage.appendChild(clone);
    stage.scrollTop = 0;
    fTitle.textContent = s.title;
    count.textContent = (cur + 1) + ' / ' + slides.length;
    prev.disabled = cur === 0;
    next.disabled = cur === slides.length - 1;
    stripFrames.forEach(function (_, k) {
      strip.children[k].classList.toggle('is-active', k === cur);
    });
    var activeChip = strip.children[cur];
    if (activeChip) activeChip.scrollIntoView({ block: 'nearest', inline: 'center' });
  }

  // ── keyboard ──
  document.addEventListener('keydown', function (e) {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (!focus.classList.contains('is-open')) return;
    if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') { e.preventDefault(); show(cur + 1); }
    else if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); show(cur - 1); }
    else if (e.key === 'Escape') { closeFocus(); }
    else if (e.key === 'Home') { show(0); }
    else if (e.key === 'End') { show(slides.length - 1); }
  });

  // ── scaling ──
  // A miniature = a fixed NOM_W×NOM_H clone scaled to fill its frame's width.
  function miniature(slideEl, ns) {
    var frame = el('span', ns + '__frame');
    var scale = el('span', ns + '__scale');
    scale.style.width = NOM_W + 'px';
    scale.style.height = NOM_H + 'px';
    var clone = slideEl.cloneNode(true);
    clone.style.opacity = 1; clone.style.visibility = 'visible';
    clone.style.position = 'static';
    scale.appendChild(clone);
    frame.appendChild(scale);
    return { frame: frame, scale: scale };
  }
  function fit(mini) {
    var w = mini.frame.clientWidth;
    if (w) mini.scale.style.transform = 'scale(' + (w / NOM_W) + ')';
  }
  function rescaleGrid() { thumbFrames.forEach(fit); }
  function rescaleStrip() { stripFrames.forEach(fit); }

  // initial + responsive
  requestAnimationFrame(function () { rescaleGrid(); rescaleStrip(); });
  window.addEventListener('resize', function () { rescaleGrid(); rescaleStrip(); });
  window.addEventListener('load', function () { rescaleGrid(); rescaleStrip(); });

  function pad(n) { return String(n).padStart(2, '0'); }
  function chevron(dir) {
    var d = dir === 'prev' ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7';
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="' + d + '"/></svg>';
  }
  function gridIcon() {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>';
  }
})();
