/* slides-core.js — shared slide-splitter for the curriculum slide viewer.
 *
 * The curriculum renders each doc as a flat stream of prose: an <h1> title,
 * a lede, then a run of <h2> sections (each already chunked to slide size by
 * check-slide-size.js). This turns that stream into an ordered list of slide
 * <section>s WITHOUT touching the prose markup — every proto viewer consumes
 * the same output, and so will the production integration into curriculum-spa.js
 * and build-workbook.js. It is a progressive enhancement: it runs AFTER the
 * existing decorate* passes (prompts, sessions, notes, diagram zoom) so widgets
 * are already wired inside the nodes it relocates.
 *
 * One `<h2>` == one slide. Everything before the first `<h2>` (the <h1> + lede)
 * is the cover slide. Nodes are MOVED (not cloned) into fresh
 * `<section class="slide"><div class="module slide__body">…</div></section>`
 * wrappers, so `.module` prose styling from curriculum.css carries verbatim.
 */
(function (global) {
  'use strict';

  function textOf(el) {
    return (el.textContent || '').replace(/\s+/g, ' ').trim();
  }

  // A section heading like "Phase 1: Diff the two runs" is a phase boundary:
  // the viewer emits a full-bleed divider slide ahead of the phase's content.
  // Requires "Phase <n>" + a separator + a descriptive title.
  var PHASE_RE = /^\s*Phase\s+(\d+)\s*[:.—–-]\s*(.+)$/i;

  function makeSlideSection(cls, index) {
    var sec = document.createElement('section');
    sec.className = cls;
    sec.setAttribute('data-index', String(index));
    return sec;
  }

  function makeDivider(phaseNum, phaseTitle) {
    var sec = makeSlideSection('slide slide--divider', 0);
    var inner = document.createElement('div');
    inner.className = 'slide-divider';
    var eyebrow = document.createElement('span');
    eyebrow.className = 'slide-divider__eyebrow';
    eyebrow.textContent = 'Phase ' + phaseNum;
    var title = document.createElement('span');
    title.className = 'slide-divider__title';
    title.textContent = phaseTitle;
    inner.appendChild(eyebrow);
    inner.appendChild(title);
    sec.appendChild(inner);
    return sec;
  }

  /**
   * buildSlides(source) — split a rendered doc container into slides.
   * @param {Element} source  container holding the rendered doc nodes.
   * @returns {{slides: Array, titleText: string}}
   *   slides[i] = { index, title, isCover, wide, hasDiagram, el }
   */
  function buildSlides(source) {
    var kids = Array.prototype.slice.call(source.childNodes);
    var groups = [];
    var cur = null;

    function open(isCover) {
      cur = { isCover: !!isCover, nodes: [] };
      groups.push(cur);
    }

    open(true); // cover: collects h1 + lede until the first h2
    kids.forEach(function (n) {
      if (n.nodeType === 1 && n.tagName === 'H2') open(false);
      cur.nodes.push(n);
    });

    // Cover title comes from its <h1>; drop the cover group if it holds no
    // real element (a doc that opens straight on an <h2> has no cover).
    var docTitle = '';
    if (groups.length) {
      var coverEls = groups[0].nodes.filter(function (n) { return n.nodeType === 1; });
      if (!coverEls.length) {
        groups.shift();
      } else {
        var h1 = coverEls.filter(function (n) { return n.tagName === 'H1'; })[0];
        if (h1) docTitle = textOf(h1);
      }
    }

    var slides = [];
    groups.forEach(function (g) {
      // Build the content slide body first — a phase heading gets its prefix
      // stripped once the divider ahead of it carries the "Phase N".
      var body = document.createElement('div');
      body.className = 'module slide__body';
      g.nodes.forEach(function (n) { body.appendChild(n); });

      if (!g.isCover) {
        var h2 = body.querySelector('h2');
        var m = h2 && PHASE_RE.exec(textOf(h2));
        if (m) {
          var phaseTitle = m[2].trim();
          slides.push({ index: slides.length, title: 'Phase ' + m[1], phaseTitle: phaseTitle,
            isCover: false, isDivider: true, wide: false, hasDiagram: false, el: makeDivider(m[1], phaseTitle) });
          h2.textContent = phaseTitle;   // divider owns the "Phase N" marker now
        }
      }

      var sec = makeSlideSection('slide' + (g.isCover ? ' slide--cover' : ''), slides.length);
      sec.appendChild(body);
      var hasDiagram = !!body.querySelector('.diagram, svg, img');
      var wide = !!body.querySelector('.diagram, svg, table, pre');
      if (hasDiagram) sec.classList.add('slide--diagram');
      if (wide) sec.classList.add('slide--wide');

      var title;
      if (g.isCover) title = docTitle || 'Cover';
      else { var hh = body.querySelector('h2'); title = hh ? textOf(hh) : ('Slide ' + (slides.length + 1)); }

      slides.push({ index: slides.length, title: title, isCover: g.isCover, isDivider: false,
        wide: wide, hasDiagram: hasDiagram, el: sec });
    });

    // final sequential indices (dividers shifted everything after them)
    slides.forEach(function (s, i) { s.index = i; s.el.setAttribute('data-index', String(i)); });

    return { slides: slides, titleText: docTitle };
  }

  // ── Exercise grammar ────────────────────────────────────────────────────
  // Recurring content shapes that read as prose today but carry a semantic the
  // slide format can surface. Keyed on the existing authoring conventions (no
  // .md edits), same spirit as the phase-divider detection. Runs on the doc
  // AFTER the curriculum decorate passes (so .prompt-block exists) and BEFORE
  // the split. Every hit is scoped to a literal marker so it can't misfire on
  // ordinary prose or on a lecture that lacks the pattern.
  var CONTRACT = [
    { re: /^what you do\b/i, label: 'Do' },
    { re: /^what you build\b/i, label: 'Build' },
    { re: /^the point\b/i, label: 'Why' }
  ];

  function leadStrong(p) {
    return (p.tagName === 'P' && p.firstElementChild && p.firstElementChild.tagName === 'STRONG')
      ? p.firstElementChild : null;
  }
  // innerHTML of p with its leading <strong>…</strong> (and the space/punct
  // after it) removed — the label is lifted out, the value stays.
  function valueAfterStrong(p) {
    var html = p.innerHTML.replace(/^\s*<strong[^>]*>[\s\S]*?<\/strong>\s*[:—–-]?\s*/i, '');
    return html;
  }

  function decoratePatterns(root) {
    // 1. Contract: contiguous Do/Build/Why paragraphs → one labelled panel.
    var kids = Array.prototype.slice.call(root.children);
    for (var i = 0; i < kids.length; i++) {
      var s = leadStrong(kids[i]);
      var lab = s && matchLabel(s.textContent);
      if (!lab) continue;
      var panel = document.createElement('div');
      panel.className = 'ex-contract';
      root.insertBefore(panel, kids[i]);
      while (i < kids.length) {
        var p = kids[i], ps = leadStrong(p), pl = ps && matchLabel(ps.textContent);
        if (!pl) break;
        var row = document.createElement('div'); row.className = 'ex-contract__row';
        var l = document.createElement('span'); l.className = 'ex-contract__label'; l.textContent = pl;
        var v = document.createElement('span'); v.className = 'ex-contract__val'; v.innerHTML = valueAfterStrong(p);
        row.appendChild(l); row.appendChild(v);
        panel.appendChild(row);
        p.parentNode.removeChild(p);
        i++;
      }
      i--;
    }

    // 2. Time → compact meta chip.
    Array.prototype.forEach.call(root.querySelectorAll('p'), function (p) {
      var s = leadStrong(p);
      if (s && /^time\b/i.test(s.textContent)) p.classList.add('ex-time');
    });

    // 3. Steer callouts — blockquotes are the exercise's "optional steer" aside.
    Array.prototype.forEach.call(root.querySelectorAll('blockquote'), function (bq) {
      bq.classList.add('steer');
      var fp = bq.querySelector('p'), fs = fp && leadStrong(fp);
      if (fs) fs.classList.add('steer__label');
    });

    // 4. Prompt lead-in — the plain "Ask Claude to…" line right before a prompt.
    Array.prototype.forEach.call(root.querySelectorAll('.prompt-block'), function (pb) {
      var prev = pb.previousElementSibling;
      if (prev && prev.tagName === 'P' && !prev.classList.contains('ex-time')) prev.classList.add('prompt-leadin');
    });

    // 5. Outcome closer — the "what you ended with" payoff paragraph.
    Array.prototype.forEach.call(root.querySelectorAll('p'), function (p) {
      var s = leadStrong(p);
      if (!s || !/^what happened\b/i.test(s.textContent)) return;
      var box = document.createElement('div'); box.className = 'ex-outcome';
      var lab = document.createElement('span'); lab.className = 'ex-outcome__label'; lab.textContent = 'What you walk away with';
      p.parentNode.insertBefore(box, p);
      box.appendChild(lab);
      var body = document.createElement('p'); body.innerHTML = valueAfterStrong(p);
      box.appendChild(body);
      p.parentNode.removeChild(p);
    });
  }

  function matchLabel(text) {
    text = (text || '').trim();
    for (var i = 0; i < CONTRACT.length; i++) if (CONTRACT[i].re.test(text)) return CONTRACT[i].label;
    return null;
  }

  // Tiny DOM helper shared by the protos.
  function el(tag, cls, attrs) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (attrs) Object.keys(attrs).forEach(function (k) { e.setAttribute(k, attrs[k]); });
    return e;
  }

  global.SlidesCore = { buildSlides: buildSlides, decoratePatterns: decoratePatterns, el: el, textOf: textOf };
})(typeof window !== 'undefined' ? window : this);
