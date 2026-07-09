/* slides.js — the curriculum slide viewer.
 *
 * CurriculumSlides.open(sourceEl, opts) turns a rendered curriculum container
 * into a paged deck (overlay, position:fixed) with a hover-expand left rail,
 * and returns a controller with .close(). It works from a CLONE of sourceEl, so
 * the long-read DOM underneath stays intact and toggling back is lossless.
 *
 * Two shapes of input, one model:
 *   - single doc   — a standalone lecture/exercise (one <h1> + <h2> sections)
 *   - composed     — a module page or the whole handbook (many `.phase--*`
 *                    sections, optionally inside `.module` sections). Each phase
 *                    becomes its own run of slides; module/lecture/exercise
 *                    boundaries become dividers; exercise slides carry
 *                    `.theme-dark` (the hands-on mood).
 *
 * Depends on window.CurriculumRuntime (curriculum.js) only for re-wiring copy
 * buttons on the clone. Pure DOM otherwise. Loaded in both the SPA and workbook.
 */
(function (global) {
  'use strict';

  function el(tag, cls, attrs) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (attrs) Object.keys(attrs).forEach(function (k) { e.setAttribute(k, attrs[k]); });
    return e;
  }
  function textOf(x) { return (x && x.textContent || '').replace(/\s+/g, ' ').trim(); }

  var PHASE_RE = /^\s*Phase\s+(\d+)\s*[:.—–-]\s*(.+)$/i;
  var CONTRACT = [
    { re: /^what you do\b/i, label: 'Do' },
    { re: /^what you build\b/i, label: 'Build' },
    { re: /^the point\b/i, label: 'Why' }
  ];

  // ── exercise grammar (see the slide-demos prototype notes) ────────────────
  function leadStrong(p) {
    return (p.tagName === 'P' && p.firstElementChild && p.firstElementChild.tagName === 'STRONG') ? p.firstElementChild : null;
  }
  function valueAfterStrong(p) {
    return p.innerHTML.replace(/^\s*<strong[^>]*>[\s\S]*?<\/strong>\s*[:—–-]?\s*/i, '');
  }
  function matchLabel(text) {
    text = (text || '').trim();
    for (var i = 0; i < CONTRACT.length; i++) if (CONTRACT[i].re.test(text)) return CONTRACT[i].label;
    return null;
  }
  function decoratePatterns(root) {
    var kids = Array.prototype.slice.call(root.children);
    for (var i = 0; i < kids.length; i++) {
      var s = leadStrong(kids[i]);
      if (!(s && matchLabel(s.textContent))) continue;
      var panel = el('div', 'ex-contract');
      root.insertBefore(panel, kids[i]);
      while (i < kids.length) {
        var p = kids[i], ps = leadStrong(p), pl = ps && matchLabel(ps.textContent);
        if (!pl) break;
        var row = el('div', 'ex-contract__row');
        var l = el('span', 'ex-contract__label'); l.textContent = pl;
        var v = el('span', 'ex-contract__val'); v.innerHTML = valueAfterStrong(p);
        row.appendChild(l); row.appendChild(v); panel.appendChild(row);
        p.parentNode.removeChild(p); i++;
      }
      i--;
    }
    Array.prototype.forEach.call(root.querySelectorAll('p'), function (p) {
      var s = leadStrong(p);
      if (s && /^time\b/i.test(s.textContent)) p.classList.add('ex-time');
    });
    Array.prototype.forEach.call(root.querySelectorAll('blockquote'), function (bq) {
      bq.classList.add('steer');
      var fp = bq.querySelector('p'), fs = fp && leadStrong(fp);
      if (fs) fs.classList.add('steer__label');
    });
    Array.prototype.forEach.call(root.querySelectorAll('.prompt-block'), function (pb) {
      var prev = pb.previousElementSibling;
      if (prev && prev.tagName === 'P' && !prev.classList.contains('ex-time')) prev.classList.add('prompt-leadin');
    });
    Array.prototype.forEach.call(root.querySelectorAll('p'), function (p) {
      var s = leadStrong(p);
      if (!s || !/^what happened\b/i.test(s.textContent)) return;
      var box = el('div', 'ex-outcome');
      var lab = el('span', 'ex-outcome__label'); lab.textContent = 'What you walk away with';
      p.parentNode.insertBefore(box, p);
      box.appendChild(lab);
      var body = el('p'); body.innerHTML = valueAfterStrong(p); box.appendChild(body);
      p.parentNode.removeChild(p);
    });
  }

  // ── slide construction ────────────────────────────────────────────────────
  function slideSection(cls, dark) {
    var sec = el('section', 'slide' + (cls ? ' ' + cls : '') + (dark ? ' theme-dark' : ''));
    return sec;
  }
  function makeDivider(eyebrow, title, extraCls, dark, subHtml) {
    var sec = slideSection('slide--divider' + (extraCls ? ' ' + extraCls : ''), dark);
    var inner = el('div', 'slide-divider');
    var e = el('span', 'slide-divider__eyebrow'); e.textContent = eyebrow;
    var t = el('span', 'slide-divider__title'); t.textContent = title;
    inner.appendChild(e); inner.appendChild(t);
    if (subHtml) { var s = el('div', 'slide-divider__sub'); s.innerHTML = subHtml; inner.appendChild(s); }
    sec.appendChild(inner);
    return { el: sec, title: eyebrow, navLabel: title, isDivider: true };
  }

  function moduleBigIdeaOf(moduleEl) {
    var big = moduleEl.querySelector('.module-hero-big');
    return big ? big.innerHTML : null;
  }

  // The training cover (whole-handbook deck only) — a proper title slide from
  // the workbook's <header class="workbook-cover">.
  function buildTrainingCover(coverEl) {
    var sec = slideSection('slide--cover slide--traincover', false);
    var body = el('div', 'module slide__body');
    var eyebrow = coverEl.querySelector('.eyebrow');
    var h1 = coverEl.querySelector('.cover-title, h1');
    var lede = coverEl.querySelector('.lede');
    if (eyebrow) { var ey = el('p', 'traincover__eyebrow'); ey.textContent = textOf(eyebrow); body.appendChild(ey); }
    if (h1) { var t = el('h1'); t.textContent = textOf(h1); body.appendChild(t); }
    if (lede) { var l = el('p'); l.innerHTML = lede.innerHTML; body.appendChild(l); }
    sec.appendChild(body);
    return { el: sec, title: h1 ? textOf(h1) : 'Cover', navLabel: 'Cover', isCover: true };
  }

  // Split one doc container (a whole doc, or one `.phase` section) into slides.
  // Runs decoratePatterns first. Returns an array of slide descriptors.
  function buildSingleDoc(container, o) {
    o = o || {};
    decoratePatterns(container);
    var kids = Array.prototype.slice.call(container.childNodes).filter(function (n) {
      return !(n.nodeType === 1 && n.classList && n.classList.contains('phase-kicker'));
    });

    var groups = [], cur = null;
    function open(isCover) { cur = { isCover: !!isCover, nodes: [] }; groups.push(cur); }
    open(true);
    kids.forEach(function (n) {
      if (n.nodeType === 1 && n.tagName === 'H2') open(false);
      cur.nodes.push(n);
    });
    var docTitle = '';
    if (groups.length) {
      var coverEls = groups[0].nodes.filter(function (n) { return n.nodeType === 1; });
      if (!coverEls.length) groups.shift();
      else { var h1 = coverEls.filter(function (n) { return n.tagName === 'H1'; })[0]; if (h1) docTitle = textOf(h1); }
    }

    var out = [];
    groups.forEach(function (g) {
      var body = el('div', 'module slide__body');
      g.nodes.forEach(function (n) { body.appendChild(n); });
      if (!g.isCover) {
        var h2 = body.querySelector('h2');
        var m = h2 && PHASE_RE.exec(textOf(h2));
        if (m) {
          out.push(makeDivider('Phase ' + m[1], m[2].trim(), null, o.dark));
          h2.textContent = m[2].trim();
        }
      }
      var sec = slideSection(g.isCover ? 'slide--cover' : '', o.dark);
      sec.appendChild(body);
      if (body.querySelector('.diagram, svg, img')) sec.classList.add('slide--diagram');
      if (body.querySelector('.diagram, svg, table, pre')) sec.classList.add('slide--wide');
      var title;
      if (g.isCover) title = docTitle || o.title || 'Cover';
      else { var hh = body.querySelector('h2'); title = hh ? textOf(hh) : 'Slide'; }
      out.push({ el: sec, title: title, navLabel: title, isCover: g.isCover, isDivider: false });
    });
    return { slides: out, title: docTitle };
  }

  function moduleTitleOf(moduleEl) {
    // The module title lives in its hero (buildModuleHero lifts H1 + Big Idea).
    // Fall back to the first heading that is NOT inside an included phase, then id.
    var hero = moduleEl.querySelector('.module-hero__title, .module-hero h1, .module-hero h2');
    if (hero) return textOf(hero);
    var heads = moduleEl.querySelectorAll('h1, h2');
    for (var i = 0; i < heads.length; i++) {
      if (!heads[i].closest('.phase--lecture, .phase--exercise')) return textOf(heads[i]);
    }
    return (moduleEl.id || 'Module').replace(/^module-/, '').replace(/-/g, ' ');
  }

  // Divider eyebrow for a prose section (one with no lecture/exercise phases),
  // inferred from its id, falling back to its phase-kicker label.
  function proseEyebrowOf(moduleEl) {
    var id = moduleEl.id || '';
    if (id === 'prework') return 'Prework';
    if (id.indexOf('supplementary-') === 0) return 'Supplementary';
    if (id.indexOf('reference-') === 0) return 'Reference';
    var k = moduleEl.querySelector('.phase-kicker');
    return (k && textOf(k)) || 'Section';
  }

  // Decide the deck model from whatever container we're handed.
  function buildDeckModel(root, opts) {
    opts = opts || {};
    var phases = root.querySelectorAll('.phase--lecture, .phase--exercise');
    var slides, title = opts.title || '';

    if (!phases.length) {
      // single doc
      var one = buildSingleDoc(root, { dark: !!opts.dark, title: opts.title });
      slides = one.slides; title = title || one.title;
    } else {
      // composed: EVERY top-level section in document order, so the deck matches
      // the long-read. A module carrying lecture/exercise phases becomes a
      // divider (hero + Big Idea) followed by its phase slides. A prose section
      // with no phases — prework, supplementary, reference — is slide-ified in
      // place under a kind-labelled divider. Walking only `.phase--*` (the old
      // behaviour) silently dropped prework and the supplements from the default
      // view and stranded every in-deck link into them.
      slides = [];
      // whole-handbook deck opens on the training cover, not mid-thought on M1
      var coverEl = root.querySelector('.workbook-cover');
      if (coverEl) slides.push(buildTrainingCover(coverEl));
      var sections = root.querySelectorAll(':scope > section.module');
      Array.prototype.forEach.call(sections, function (moduleEl) {
        var innerPhases = moduleEl.querySelectorAll('.phase--lecture, .phase--exercise');
        if (innerPhases.length) {
          slides.push(makeDivider('Module', moduleTitleOf(moduleEl), 'slide--module', false, moduleBigIdeaOf(moduleEl)));
          Array.prototype.forEach.call(innerPhases, function (phase) {
            var isEx = phase.classList.contains('phase--exercise');
            // the first (cover) slide of each doc reads as a section title in the rail
            buildSingleDoc(phase, { dark: isEx }).slides.forEach(function (s) { slides.push(s); });
          });
        } else {
          slides.push(makeDivider(proseEyebrowOf(moduleEl), moduleTitleOf(moduleEl), 'slide--module', false, moduleBigIdeaOf(moduleEl)));
          buildSingleDoc(moduleEl, { dark: false }).slides.forEach(function (s) { slides.push(s); });
        }
      });
      title = title || 'Handbook';
    }

    slides.forEach(function (s, k) { s.index = k; s.el.setAttribute('data-index', String(k)); });
    return { slides: slides, title: title };
  }

  // Re-attach copy handlers on the cloned deck (listeners don't survive cloneNode).
  function rewireCopy(deckRoot) {
    Array.prototype.forEach.call(deckRoot.querySelectorAll('pre .copy-btn, .prompt-block .copy-btn'), function (btn) {
      var pre = btn.closest('pre') || (btn.closest('.prompt-block') && btn.closest('.prompt-block').querySelector('pre'));
      if (!pre) return;
      btn.addEventListener('click', function (ev) {
        ev.stopPropagation();
        var text = pre.innerText.replace(/\n?Copy(\s*failed)?$/,'').replace(/^Copy\n?/,'');
        text = pre.querySelector('code') ? pre.querySelector('code').innerText : pre.innerText;
        try {
          navigator.clipboard.writeText(text);
          var old = btn.textContent; btn.textContent = 'Copied'; setTimeout(function () { btn.textContent = old; }, 1200);
        } catch (e) {}
      });
    });
  }

  // ── the deck controller ────────────────────────────────────────────────────
  function chevron(dir) {
    var d = dir === 'prev' ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7';
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="' + d + '"/></svg>';
  }
  function listIcon() { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M4 6h16M4 12h16M4 18h16"/></svg>'; }
  function readIcon() { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5h16M4 9h16M4 13h10M4 17h10"/></svg>'; }

  function open(sourceEl, opts) {
    opts = opts || {};
    // work on a detached clone so the long-read DOM underneath is untouched
    var clone = sourceEl.cloneNode(true);
    clone.removeAttribute('id');
    var model = buildDeckModel(clone, opts);
    var slides = model.slides;
    if (!slides.length) return null;

    var i = -1, pinned = false, keyHandler;
    var deck = el('div', 'deck');

    var progress = el('div', 'deck__progress'); var progressFill = el('i'); progress.appendChild(progressFill);

    var viewport = el('div', 'deck__viewport');
    slides.forEach(function (s) { viewport.appendChild(s.el); });
    var edgePrev = edge('prev'), edgeNext = edge('next');
    viewport.append(edgePrev, edgeNext);
    rewireCopy(viewport);

    // left hover-rail
    var rail = el('nav', 'deck__rail');
    var handle = el('div', 'deck__rail-handle'); handle.innerHTML = listIcon() + '<span>Contents</span>';
    var railHead = el('div', 'deck__rail-head');
    var railTitle = el('div', 'deck__rail-title'); railTitle.textContent = model.title || 'Contents';
    var railMeta = el('div', 'deck__rail-meta'); railMeta.textContent = slides.length + ' slides';
    railHead.append(railTitle, railMeta);
    var railList = el('ul', 'deck__rail-list');
    var railItems = slides.map(function (s, k) {
      var li = el('li');
      var cls = 'deck__rail-item'
        + (s.isDivider ? ' deck__rail-item--divider' : '')
        + (s.el.classList.contains('slide--module') ? ' deck__rail-item--module' : '')
        + (s.isCover ? ' deck__rail-item--cover' : '');
      var btn = el('button', cls, { 'data-index': k });
      var num = el('span', 'deck__rail-num');
      num.textContent = s.isCover ? '•' : (s.isDivider ? '§' : String(k + 1));
      var label = el('span', 'deck__rail-label'); label.textContent = s.navLabel || s.title;
      btn.append(num, label);
      btn.addEventListener('click', function () { go(k); collapseRail(); });
      li.appendChild(btn); railList.appendChild(li); return btn;
    });
    rail.append(handle, railHead, railList);
    rail.addEventListener('mouseenter', openRail);
    rail.addEventListener('mouseleave', collapseRail);

    // bar
    var bar = el('div', 'deck__bar');
    var title = el('div', 'deck__title'); title.textContent = model.title || '';
    var spacer = el('div', 'deck__spacer');
    var exit = el('button', 'deck__exit'); exit.innerHTML = readIcon() + '<span>Long-read</span>';
    var nav = el('div', 'deck__nav');
    var btnRail = deckBtn(listIcon(), 'Contents (O)'); btnRail.classList.add('deck__rail-btn');
    var btnPrev = deckBtn(chevron('prev'), 'Previous (←)');
    var count = el('div', 'deck__count');
    var btnNext = deckBtn(chevron('next'), 'Next (→)');
    btnRail.addEventListener('click', togglePin);
    btnPrev.addEventListener('click', function () { go(i - 1); });
    btnNext.addEventListener('click', function () { go(i + 1); });
    exit.addEventListener('click', function () { if (opts.onExit) opts.onExit(); });
    nav.append(btnRail, btnPrev, count, btnNext);
    bar.append(title, spacer, exit, nav);

    deck.append(progress, rail, viewport, bar);
    document.body.appendChild(deck);
    document.body.classList.add('slides-active');
    sourceEl.style.display = 'none';

    function openRail() { deck.classList.add('is-railopen'); }
    function collapseRail() { if (!pinned) deck.classList.remove('is-railopen'); }
    function togglePin() { pinned = !pinned; deck.classList.toggle('is-railpinned', pinned); if (pinned) openRail(); else deck.classList.remove('is-railopen'); }

    function go(n) {
      n = Math.max(0, Math.min(slides.length - 1, n));
      i = n;
      slides.forEach(function (s, k) {
        s.el.classList.toggle('is-active', k === n);
        s.el.classList.toggle('is-past', k < n);
        if (k === n) s.el.scrollTop = 0;
      });
      railItems.forEach(function (b, k) { b.classList.toggle('is-active', k === n); });
      if (railItems[n]) railItems[n].scrollIntoView({ block: 'nearest' });
      progressFill.style.width = ((n + 1) / slides.length * 100) + '%';
      count.textContent = (n + 1) + ' / ' + slides.length;
      edgePrev.disabled = n === 0; edgeNext.disabled = n === slides.length - 1;
    }

    keyHandler = function (e) {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      switch (e.key) {
        case 'ArrowRight': case 'PageDown': case ' ': case 'l': case 'j': e.preventDefault(); go(i + 1); break;
        case 'ArrowLeft': case 'PageUp': case 'h': case 'k': e.preventDefault(); go(i - 1); break;
        case 'Home': e.preventDefault(); go(0); break;
        case 'End': e.preventDefault(); go(slides.length - 1); break;
        case 'o': case 'O': e.preventDefault(); togglePin(); break;
        case 'Escape': if (deck.classList.contains('is-railpinned') || deck.classList.contains('is-railopen')) { pinned = false; deck.classList.remove('is-railpinned', 'is-railopen'); } else if (opts.onExit) opts.onExit(); break;
        case 'f': case 'F': if (!document.fullscreenElement) { (document.documentElement.requestFullscreen || function () {}).call(document.documentElement); } else document.exitFullscreen(); break;
        default: if (/^[0-9]$/.test(e.key)) { var t = e.key === '0' ? 9 : (+e.key - 1); if (t < slides.length) go(t); }
      }
    };
    document.addEventListener('keydown', keyHandler);
    go(typeof opts.start === 'number' ? opts.start : 0);

    function edge(dir) {
      var b = el('button', 'deck__edge deck__edge--' + dir, { 'aria-label': dir === 'prev' ? 'Previous' : 'Next' });
      b.innerHTML = chevron(dir);
      b.addEventListener('click', function () { go(dir === 'prev' ? i - 1 : i + 1); });
      return b;
    }
    function deckBtn(svg, label) { var b = el('button', 'deck__btn', { title: label, 'aria-label': label }); b.innerHTML = svg; return b; }

    return {
      close: function () {
        document.removeEventListener('keydown', keyHandler);
        if (deck.parentNode) deck.parentNode.removeChild(deck);
        document.body.classList.remove('slides-active');
        sourceEl.style.display = '';
      },
      go: go
    };
  }

  // Build the Long-read ⇄ Slides toggle control (caller wires onChange + placement).
  function buildToggle(mode, onChange) {
    var wrap = el('div', 'layout-toggle');
    var read = el('button', 'layout-toggle__btn', { 'data-mode': 'read', type: 'button' });
    read.innerHTML = readIcon() + '<span>Long-read</span>';
    var slides = el('button', 'layout-toggle__btn', { 'data-mode': 'slides', type: 'button' });
    slides.innerHTML = listIcon() + '<span>Slides</span>';
    wrap.append(read, slides);
    function paint(m) { read.classList.toggle('is-on', m === 'read'); slides.classList.toggle('is-on', m === 'slides'); }
    read.addEventListener('click', function () { onChange('read'); });
    slides.addEventListener('click', function () { onChange('slides'); });
    paint(mode);
    wrap._paint = paint;
    return wrap;
  }

  global.CurriculumSlides = { open: open, buildToggle: buildToggle, buildDeckModel: buildDeckModel };
})(typeof window !== 'undefined' ? window : this);
