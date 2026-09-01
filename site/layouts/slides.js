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

  // ── slide tiers ───────────────────────────────────────────────────────────
  // `<!--tier:N-->` markers in the markdown arrive as hidden `.slide-tier`
  // blocks (curriculum.js expandTiers). Deck-only chrome: a small corner token
  // telling the trainer how skippable the slide is. Untagged slides = core.
  // The watermark a barebones edition puts on the slides it does not cover.
  // One string, used by the slide itself and by the rail row beside it.
  var EXCLUDED_LABEL = 'Not included';
  var TIER_INFO = {
    '1': 'Core — the work ahead depends on this slide',
    '2': 'Recognition — names what the room already did; skippable under time pressure',
    '3': 'Story / extra theory — skip freely'
  };

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
  // Every call is one source doc — a lecture, an exercise, a run of module
  // prose. `docId` stamps that provenance onto the slides so a later pass can
  // ask "which slides does this cover own?" and get the doc's answer rather
  // than a guess from deck position. Position lies: an inlined lecture is
  // followed by the MODULE's Key Concepts with no divider in between.
  var DOC_SEQ = 0;

  function buildSingleDoc(container, o) {
    o = o || {};
    var docId = ++DOC_SEQ;
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
      else {
        var h1 = coverEls.filter(function (n) { return n.tagName === 'H1'; })[0];
        if (h1) docTitle = textOf(h1);
        else if (o.mid) {
          // A mid-module prose run with loose content before its first H2 (e.g. the
          // thinking-effort blockquote). Fold it into the first H2 slide rather than
          // emitting an orphan "Cover" slide; a run that is ALL loose content (a lone
          // connective line) becomes one plain content slide.
          if (groups.length > 1) { groups[1].nodes = groups[0].nodes.concat(groups[1].nodes); groups.shift(); }
          else groups[0].isCover = false;
        }
      }
    }

    var out = [];
    groups.forEach(function (g) {
      var body = el('div', 'module slide__body');
      g.nodes.forEach(function (n) { body.appendChild(n); });
      if (!g.isCover) {
        var h2 = body.querySelector('h2');
        var m = h2 && PHASE_RE.exec(textOf(h2));
        if (m) {
          var pd = makeDivider('Phase ' + m[1], m[2].trim(), null, o.dark);
          pd.phaseNum = +m[1];
          pd.docId = docId;
          out.push(pd);
          h2.textContent = m[2].trim();
        }
      }
      var sec = slideSection(g.isCover ? 'slide--cover' : '', o.dark);
      sec.appendChild(body);
      if (body.querySelector('.diagram, svg, img')) sec.classList.add('slide--diagram');
      if (body.querySelector('.diagram, svg, table, pre')) sec.classList.add('slide--wide');
      // Absent marker means core, so the model says so out loud: tier is always
      // '1'|'2'|'3', never null. An untagged slide used to be a silent third
      // state, which is exactly what a filter and a lint cannot reason about.
      // `tierTagged` keeps the chrome honest — only an author's own marker
      // earns a badge, or 450 core slides would each wear a "T1".
      var tier = '1', tagged = false, tm = body.querySelector('.slide-tier[data-tier]');
      if (tm && !g.isCover) {
        tier = tm.getAttribute('data-tier');
        tagged = true;
        sec.setAttribute('data-tier', tier);
        var badge = el('span', 'slide__tier slide__tier--' + tier, { title: TIER_INFO[tier] || '' });
        badge.textContent = 'T' + tier;
        sec.appendChild(badge);
      }
      var title;
      if (g.isCover) title = docTitle || o.title || 'Cover';
      else { var hh = body.querySelector('h2'); title = hh ? textOf(hh) : 'Slide'; }
      out.push({ el: sec, title: title, navLabel: title, isCover: g.isCover, isDivider: false, tier: tier, tierTagged: tagged, docId: docId });
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

  // An in-deck link (`#supplementary-the-context-ceiling`, `#5-plan-mode-at-depth`)
  // has to resolve to a SLIDE, because the deck is not a scroll: the browser's
  // own fragment navigation moves nothing here. First claim wins — a section
  // divider beats a heading of the same name deeper in.
  function claimAnchor(map, id, index) {
    if (id && !(id in map)) map[id] = index;
  }

  // Decide the deck model from whatever container we're handed.
  function buildDeckModel(root, opts) {
    opts = opts || {};
    var phases = root.querySelectorAll('.phase--lecture, .phase--exercise');
    // Null-prototype, not `{}`: an anchor map that inherits from Object.prototype
    // answers `#constructor` and `#__proto__` with a function and an object, and
    // both survive the `n == null` guard at the click handler. It also refuses to
    // claim a real heading of that name, since `id in map` is already true.
    var slides, title = opts.title || '', anchors = Object.create(null);

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
      // Numbering: every top-level section gets a code — modules reuse the
      // long-read hero number (M1…M6, same source of truth as the TOC), prose
      // sections get a kind code (P prework, S1… supplementary, R1… reference).
      // Content slides are numbered 1…n WITHIN their section; covers/dividers
      // carry the code but no ordinal. Position is computed here, never
      // hand-written in the markdown (Phase/Step numbers there are content,
      // not position — linted by scripts/check-slide-numbering.js).
      var moduleSeq = 0, kindTallies = {};
      Array.prototype.forEach.call(sections, function (moduleEl) {
        var innerPhases = moduleEl.querySelectorAll('.phase--lecture, .phase--exercise');
        var start = slides.length, code;
        // The section's own id is the target of every cross-doc link into it
        // (`#prework`, `#supplementary-the-context-ceiling`, `#getting-going`).
        // It lives on the wrapper, which does NOT survive into the deck — only
        // its children do — so claim it for the divider slide about to open.
        claimAnchor(anchors, moduleEl.id, slides.length);
        if (innerPhases.length) {
          var heroNum = moduleEl.querySelector('.module-hero-num');
          var mNo = heroNum ? parseInt(heroNum.textContent, 10) : NaN;
          if (isNaN(mNo)) mNo = moduleSeq + 1;
          moduleSeq = mNo;
          code = 'M' + mNo;
          slides.push(makeDivider('Module ' + mNo, moduleTitleOf(moduleEl), 'slide--module', false, moduleBigIdeaOf(moduleEl)));
          // Walk the module in document order so the deck mirrors the long-read:
          // the hero became the opener above; every OTHER block — Start here /
          // Connections, What You'll Learn, Key Concepts, the Debrief move and its
          // prompts, Homework, Next — is slide-ified in place, interleaved with
          // the lecture/exercise phases. (Before this, only the phases reached the
          // deck; all module-level prose was stranded in long-read.)
          var buf = [];
          function flushProse() {
            if (!buf.length) return;
            var box = moduleEl.ownerDocument.createElement('div');
            buf.forEach(function (n) { box.appendChild(n); });
            buf = [];
            buildSingleDoc(box, { dark: false, mid: true }).slides.forEach(function (s) { slides.push(s); });
          }
          Array.prototype.forEach.call(Array.prototype.slice.call(moduleEl.children), function (child) {
            if (child.classList && (child.classList.contains('phase--lecture') || child.classList.contains('phase--exercise'))) {
              flushProse();
              var isEx = child.classList.contains('phase--exercise');
              // same wrapper problem as the section: `#lectures-reading-the-return`
              // is the include target, and the wrapper is dropped on the way in
              claimAnchor(anchors, child.id, slides.length);
              // the first (cover) slide of each doc reads as a section title in the rail
              buildSingleDoc(child, { dark: isEx }).slides.forEach(function (s) { slides.push(s); });
            } else if (child.classList && child.classList.contains('module-hero')) {
              /* hero (title + Big Idea) already became the module opener */
            } else if (child.tagName === 'H1') {
              /* module title in the no-hero fallback — already the opener */
            } else {
              buf.push(child);
            }
          });
          flushProse();
        } else {
          var kind = proseEyebrowOf(moduleEl);
          if (kind === 'Prework') code = 'P';
          else {
            var initial = kind.charAt(0).toUpperCase();
            kindTallies[initial] = (kindTallies[initial] || 0) + 1;
            code = initial + kindTallies[initial];
          }
          slides.push(makeDivider(kind, moduleTitleOf(moduleEl), 'slide--module', false, moduleBigIdeaOf(moduleEl)));
          buildSingleDoc(moduleEl, { dark: false }).slides.forEach(function (s) { slides.push(s); });
        }
        var num = 0;
        for (var k = start; k < slides.length; k++) {
          slides[k].secCode = code;
          if (!slides[k].isDivider && !slides[k].isCover) slides[k].secNum = ++num;
        }
      });
      title = title || 'Handbook';
    }

    // ── the barebones filter ─────────────────────────────────────────────────
    // `opts.maxTier` caps how much theory the deck carries: 3 (default) is the
    // full deck, 1 is barebones — every Recognition (T2) and Story (T3) slide
    // dropped, leaving the spine the work depends on. Structure is not content:
    // dividers and doc covers always survive, or a filtered module would lose
    // its own title.
    //
    // Runs here, after both build branches and before indices are stamped, so
    // one pass fixes everything downstream. `srcIndex` is the slide's position
    // in the unfiltered deck — the only stable handle across a rebuild, which
    // is how the toggle keeps the trainer's place mid-session.
    var total = slides.length;
    // Claim heading anchors BEFORE the filter, not after: a link into a slide
    // the filter is about to drop still needs an entry in the map, or it falls
    // through to the browser, which has nothing to scroll and does nothing.
    // Claimed here it gets remapped to the nearest survivor like any other.
    slides.forEach(function (s, k) {
      s.srcIndex = k;
      Array.prototype.forEach.call(s.el.querySelectorAll('[id]'), function (n) { claimAnchor(anchors, n.id, k); });
    });
    var maxTier = opts.maxTier == null ? 3 : +opts.maxTier;
    // `markExcluded` is the barebones edition's other half: the same tier cap,
    // but the over-tier slides STAY in the deck wearing a "Not included"
    // watermark. A cut deck answers "what do we cover?"; a marked deck answers
    // "what are we not covering?" — the question a reader of a shortened
    // edition actually has. Nothing is filtered here, so numbering, anchors
    // and srcIndex are the full deck's and need no remap.
    var markExcluded = !!opts.markExcluded, excluded = 0;
    var cut = slides.map(function (s) {
      return !s.isDivider && !s.isCover && +(s.tier || 1) > maxTier;
    });
    // A doc whose every content slide is out of scope goes with them, cover and
    // all. Real case: M5's two closers are 4xT2/3xT3 and 4xT2/2xT3, so barebones
    // empties both. A SECTION divider is different — a module always keeps
    // something — and the training cover (no secCode) is the deck's own front
    // door, never dropped. `coverCut` remembers which covers the sweep took, so
    // the marked edition can DROP them while it marks everything else: a title
    // slide for a lecture the edition does not give is the one thing worth
    // hiding outright, since it announces a section and then delivers a stack of
    // watermarks (Antti 2026-09-01, on `ironies-of-automation`).
    var coverCut = [];
    if (maxTier < 3) {
      slides.forEach(function (s, k) {
        if (!s.isCover || !s.secCode) return;
        // Scoped by `docId`, so the question is "is every slide of THIS doc
        // filtered?" — the module's own Key Concepts and Next, which follow an
        // inlined lecture with no divider between, are somebody else's slides
        // and cannot vouch for it. In-doc phase dividers are skipped, not
        // stopped on: an exercise opening "Phase 1: …" owns the steps under
        // that divider, and treating the divider as the end of the doc is what
        // once cut every exercise title in AE101 while its steps stayed.
        var owned = 0;
        for (var j = k + 1; j < slides.length && slides[j].docId === s.docId; j++) {
          if (slides[j].isCover || slides[j].isDivider) continue;
          owned++;
          if (!cut[j]) return;
        }
        if (owned) { cut[k] = true; coverCut[k] = true; }
      });
    }
    if (maxTier < 3 && markExcluded) {
      slides.forEach(function (s, k) {
        if (!cut[k] || coverCut[k]) return;
        s.excluded = true;
        excluded++;
        s.el.classList.add('slide--excluded');
        s.el.setAttribute('data-excluded', '1');
        var wm = el('div', 'slide__excluded');
        wm.textContent = EXCLUDED_LABEL;
        s.el.appendChild(wm);
      });
    }
    // What actually leaves the deck: everything filtered (cut edition), or only
    // the covers of docs the edition does not give (marked edition). One filter
    // for both, so the anchor remap and the renumber cannot drift apart.
    var drop = maxTier < 3 ? (markExcluded ? coverCut : cut) : null;
    if (drop) {
      var keep = [], remap = new Array(slides.length);
      slides.forEach(function (s, k) {
        remap[k] = drop[k] ? -1 : keep.length;
        if (!drop[k]) keep.push(s);
      });
      // An anchor pointing at a dropped slide resolves FORWARD to the next
      // survivor (backwards to the last one at the tail), so no in-deck link
      // goes dead in barebones — it lands on the nearest thing still there.
      for (var r = remap.length - 1; r >= 0; r--) {
        if (remap[r] === -1) remap[r] = (r + 1 < remap.length ? remap[r + 1] : keep.length - 1);
      }
      Object.keys(anchors).forEach(function (id) {
        var n = remap[anchors[id]];
        anchors[id] = Math.max(0, Math.min(keep.length - 1, n == null ? 0 : n));
      });
      slides = keep;
      // secNum is position within a section, so it renumbers against what
      // survived — a barebones module counts 1,2,3, not 1,4,7.
      var secTally = {};
      slides.forEach(function (s) {
        if (s.isDivider || s.isCover || !s.secCode) return;
        secTally[s.secCode] = (secTally[s.secCode] || 0) + 1;
        s.secNum = secTally[s.secCode];
      });
    }

    // Single-doc decks have no sections: number content slides within the doc.
    if (!slides.some(function (s) { return s.secCode; })) {
      var soloNum = 0;
      slides.forEach(function (s) { if (!s.isDivider && !s.isCover) s.secNum = ++soloNum; });
    }

    slides.forEach(function (s, k) {
      s.index = k; s.el.setAttribute('data-index', String(k));
      if (s.secCode) s.el.setAttribute('data-ref', (s.secCode + (s.secNum ? '.' + s.secNum : '')).toLowerCase());
      // Heading ids DO survive into the deck (nodes are moved, not re-created),
      // so deep links into one section of a reference land on its slide.
      Array.prototype.forEach.call(s.el.querySelectorAll('[id]'), function (n) {
        claimAnchor(anchors, n.id, k);
      });
    });
    return { slides: slides, title: title, anchors: anchors, maxTier: maxTier, total: total,
             markExcluded: markExcluded, excluded: excluded };
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
    // Same cloning problem as the copy buttons: a workbook diagram is a data:
    // URI, so its "Open in new tab" link carries href="#" and relies on a click
    // handler to open a blob. cloneNode drops the handler but KEEPS the
    // data-zoom-wired marker the long-read pass left, so a plain re-decorate
    // no-ops and the link stays dead. Clear the marker first, then re-wire.
    if (global.CurriculumRuntime && global.CurriculumRuntime.decorateDiagramZoom) {
      Array.prototype.forEach.call(viewport.querySelectorAll('a.diagram__zoom[data-zoom-wired]'),
        function (a) { a.removeAttribute('data-zoom-wired'); });
      global.CurriculumRuntime.decorateDiagramZoom(viewport);
    }

    // left hover-rail
    var rail = el('nav', 'deck__rail');
    var handle = el('div', 'deck__rail-handle'); handle.innerHTML = listIcon() + '<span>Contents</span>';
    var railHead = el('div', 'deck__rail-head');
    var railTitle = el('div', 'deck__rail-title'); railTitle.textContent = model.title || 'Contents';
    var railMeta = el('div', 'deck__rail-meta');
    railMeta.textContent = model.markExcluded && model.excluded
      ? (model.total - model.excluded) + ' of ' + model.total + ' slides included'
      : model.maxTier < 3
        ? slides.length + ' of ' + model.total + ' slides'
        : slides.length + ' slides';
    railHead.append(railTitle, railMeta);
    var railList = el('ul', 'deck__rail-list');
    var railItems = slides.map(function (s, k) {
      var li = el('li');
      var cls = 'deck__rail-item'
        + (s.isDivider ? ' deck__rail-item--divider' : '')
        + (s.el.classList.contains('slide--module') ? ' deck__rail-item--module' : '')
        + (s.isCover ? ' deck__rail-item--cover' : '')
        + (s.tierTagged ? ' deck__rail-item--tier' + s.tier : '')
        + (s.excluded ? ' deck__rail-item--excluded' : '');
      var btn = el('button', cls, { 'data-index': k });
      var num = el('span', 'deck__rail-num');
      num.textContent = s.isCover ? '•'
        : s.isDivider ? (s.el.classList.contains('slide--module') && s.secCode ? s.secCode
                         : (s.phaseNum != null ? '§' + s.phaseNum : '§'))
        : (s.secNum != null ? String(s.secNum) : String(k + 1));
      var label = el('span', 'deck__rail-label');
      // The num cell is position; the label is the title minus any leading
      // content ordinal ("1. Pick THE repo" → "Pick THE repo") so two
      // disagreeing numbers never sit side by side. The slide itself keeps
      // its step number — it's content there, chrome here.
      var rawLabel = s.navLabel || s.title;
      label.textContent = (s.isDivider || s.isCover) ? rawLabel : rawLabel.replace(/^\d+[.)]\s+/, '');
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
    var mark = el('a', 'deck__copyright', {
      href: 'https://github.com/anttitevanlinna/agents-102/blob/main/COPYRIGHT.md',
      target: '_blank', rel: 'noopener',
      title: 'Agents 102 is proprietary training material — full license terms'
    });
    // Same short string as the long-read badge and full footer — one source
    // (CurriculumRuntime.COPYRIGHT_MARK, curriculum.js), rendered three ways.
    mark.innerHTML = (global.CurriculumRuntime && global.CurriculumRuntime.COPYRIGHT_MARK) || '&copy; Bosser 2026';
    // Barebones control. Mounted only when the host passes onMaxTier — a
    // standalone deck with nowhere to persist the choice shows no dead switch.
    var modeBtn = null;
    if (opts.onMaxTier) {
      var bare = model.maxTier < 3;
      var markMode = !!opts.markExcluded;
      modeBtn = el('button', 'deck__mode' + (bare ? ' is-on' : ''), {
        type: 'button',
        title: bare
          ? (markMode
              ? 'Barebones: recognition and story slides marked "' + EXCLUDED_LABEL + '". Click for the full deck. (B)'
              : 'Barebones: core slides only. Click for the full deck. (B)')
          : 'Full deck. Click for barebones \u2014 core only, no recognition or story slides. (B)'
      });
      modeBtn.textContent = bare ? 'Barebones' : 'Full deck';
      modeBtn.addEventListener('click', function () { opts.onMaxTier(bare ? 3 : 1); });
    }

    bar.append(title, spacer);
    if (modeBtn) bar.appendChild(modeBtn);
    bar.append(exit, nav, mark);

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
      var s = slides[n];
      var ref = s.secCode ? s.secCode + (s.secNum != null ? '·' + s.secNum : '') : '';
      count.textContent = (ref ? ref + ' — ' : '') + (n + 1) + ' / ' + slides.length;
      edgePrev.disabled = n === 0; edgeNext.disabled = n === slides.length - 1;
    }

    // In-deck navigation. A `#fragment` link is a scroll instruction, and the
    // deck has no scroll: the long-read anchors it points at are inside the
    // hidden source, so the browser moves nothing and `target="_blank"` re-opens
    // the whole deck at slide 1. Resolve the fragment to a slide and go there.
    // Unknown fragment: leave the event alone rather than swallow it.
    viewport.addEventListener('click', function (e) {
      var a = e.target && e.target.closest ? e.target.closest('a[href]') : null;
      if (!a || !viewport.contains(a)) return;
      var href = a.getAttribute('href') || '';
      if (href.charAt(0) !== '#') return;
      var id = href.slice(1);
      try { id = decodeURIComponent(id); } catch (err) { /* keep raw */ }
      var n = model.anchors[id];
      if (n == null) return;
      e.preventDefault();
      go(n);
    });

    keyHandler = function (e) {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      switch (e.key) {
        case 'ArrowRight': case 'PageDown': case ' ': case 'l': case 'j': e.preventDefault(); go(i + 1); break;
        case 'ArrowLeft': case 'PageUp': case 'h': case 'k': e.preventDefault(); go(i - 1); break;
        case 'Home': e.preventDefault(); go(0); break;
        case 'End': e.preventDefault(); go(slides.length - 1); break;
        case 'o': case 'O': e.preventDefault(); togglePin(); break;
        case 'b': case 'B': if (opts.onMaxTier) { e.preventDefault(); opts.onMaxTier(model.maxTier < 3 ? 3 : 1); } break;
        case 'Escape': if (deck.classList.contains('is-railpinned') || deck.classList.contains('is-railopen')) { pinned = false; deck.classList.remove('is-railpinned', 'is-railopen'); } else if (opts.onExit) opts.onExit(); break;
        case 'f': case 'F': if (!document.fullscreenElement) { (document.documentElement.requestFullscreen || function () {}).call(document.documentElement); } else document.exitFullscreen(); break;
        default: if (/^[0-9]$/.test(e.key)) { var t = e.key === '0' ? 9 : (+e.key - 1); if (t < slides.length) go(t); }
      }
    };
    document.addEventListener('keydown', keyHandler);
    // `startSrc` is an index into the UNFILTERED deck: after a barebones
    // rebuild the slide you were on may be gone, so land on the first survivor
    // at or after it rather than snapping back to the cover.
    var startAt = 0;
    if (typeof opts.start === 'number') startAt = opts.start;
    else if (typeof opts.startSrc === 'number') {
      for (var si = 0; si < slides.length; si++) {
        if (slides[si].srcIndex >= opts.startSrc) { startAt = si; break; }
        startAt = si;
      }
    }
    go(startAt);

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
      go: go,
      srcIndex: function () { return slides[i] ? slides[i].srcIndex : 0; }
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
