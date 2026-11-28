/* The prompt in short. Self-study handbook only: scripts/build-a101-mvp.js
 * inlines this file into the open edition. Design and working limits:
 * curriculum/attention-design.md, "Glancing at a prompt".
 *
 *   - every prompt carries its place in the module: "Prompt 4 of 9"
 *   - a prompt longer than eight lines shows the first sentence of each part;
 *     Copy takes the whole prompt, one link shows every line
 *   - callouts from the prompt's frontmatter lie on the box as cards, in the
 *     handbook's own type; they are never copied
 *
 * The full <pre> stays in the DOM untouched, so Copy, the tests and the
 * simulations that read prompt text keep working. The Slides layout keeps its
 * own preview: the short view is styled for the long-read layout only.
 */
(function (root, factory) {
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (typeof document !== 'undefined' && document.body) api.install(document);
})(this, function () {
  'use strict';

  var CHARS = 72;      // code characters on one line of the box, handbook beside Cowork
  var LONG = 8;        // a prompt of up to eight lines stays open
  var SAVING = 4;      // the short view has to save at least this many lines
  var RUN = 5;         // a run of this many short bullets folds
  var RUN_SHOWN = 2;   // ... to its first two
  var RUN_WORDS = 12;  // a bullet of up to twelve words counts as short

  function words(s) { return (String(s).match(/\S+/g) || []).length; }
  function lines(s) {
    return String(s).split('\n').reduce(function (n, l) { return n + Math.max(1, Math.ceil(l.length / CHARS)); }, 0);
  }
  function isItem(l) { return /^(\d+\.|[-*])\s+/.test(l); }
  function isBullet(l) { return /^[-*]\s+/.test(l); }

  // The first sentence of a line and what follows it. A full stop inside an
  // open quote or backtick, or after an abbreviation, does not end a sentence.
  var END = /[.?!]["')\]]?(?=\s+[A-Z`"'(\[*]|\s*$)/g;
  var ABBR = /(?:\be\.g|\bi\.e|\bvs|\betc|\bcf)\.$/;
  function firstSentence(line) {
    var m;
    END.lastIndex = 0;
    while ((m = END.exec(line))) {
      var end = m.index + m[0].length;
      var head = line.slice(0, end);
      if (end >= line.length) break;
      if (ABBR.test(head)) continue;
      if ((head.match(/"/g) || []).length % 2 || (head.match(/`/g) || []).length % 2) continue;
      return [head, line.slice(end).replace(/^\s+/, '')];
    }
    return [line, ''];
  }

  // A prompt as its parts: a paragraph or a top-level list item is one part.
  // head = the first sentence, more = the part holds more than its head,
  // gap = a blank line follows.
  function promptOutline(text) {
    var units = [], cur = null, fence = false;
    String(text || '').replace(/\r/g, '').replace(/\s+$/, '').split('\n').forEach(function (l) {
      if (/^\s*```/.test(l)) {
        if (!cur) { cur = { item: false, lines: [] }; units.push(cur); }
        cur.lines.push(l); fence = !fence; return;
      }
      if (fence) { cur.lines.push(l); return; }
      if (!l.trim()) { cur = null; if (units.length) units[units.length - 1].gap = true; return; }
      if (isItem(l) || !cur || (cur.item && !/^\s/.test(l))) {
        cur = { item: isItem(l), bullet: isBullet(l), lines: [l] }; units.push(cur);
      } else cur.lines.push(l);
    });
    return units.map(function (u) {
      var fs = firstSentence(u.lines[0]), head = fs[0];
      var tail = u.lines.length > 1 ? '\n' + u.lines.slice(1).join('\n') : '';
      var rest = fs[1] + tail;
      if (words(head) < 4 && fs[1]) {
        var f2 = firstSentence(fs[1]);
        head += ' ' + f2[0]; rest = f2[1] + tail;
      }
      if (rest && rest.indexOf('\n') < 0 && words(rest) <= 6) { head = head + ' ' + rest; rest = ''; }
      return { head: head, more: !!rest.trim(), gap: !!u.gap, item: !!u.item, bullet: !!u.bullet, full: u.lines.join('\n') };
    });
  }

  // The rows of the short view, and whether it earns its place.
  // callouts: [{ at: 'first words of a part', say: 'why the part is there' }]
  function shortView(text, callouts) {
    var units = promptOutline(text), rows = [], shortLines = 0, i = 0;
    var notes = (callouts || []).filter(function (c) { return c && c.at && c.say; });
    function noteFor(u) {
      var bare = u.full.replace(/^(\d+\.|[-*])\s+/, '');
      for (var k = 0; k < notes.length; k++) {
        if (u.full.indexOf(notes[k].at) === 0 || bare.indexOf(notes[k].at) === 0) return notes[k].say;
      }
      return '';
    }
    function push(u) {
      var say = noteFor(u);
      if (say) rows.push({ type: 'callout', say: say });
      rows.push({ type: 'line', text: u.head, more: u.more });
      shortLines += lines(u.head);
      if (u.gap) { rows.push({ type: 'gap' }); shortLines += 1; }
    }
    while (i < units.length) {
      var j = i;
      while (j < units.length && units[j].bullet && !units[j].more && words(units[j].head) <= RUN_WORDS &&
             (j === i || !units[j - 1].gap)) j++;
      if (j - i >= RUN) {
        for (var k = i; k < i + RUN_SHOWN; k++) rows.push({ type: 'line', text: units[k].head, more: false }), shortLines += lines(units[k].head);
        rows.push({ type: 'fold', count: j - i - RUN_SHOWN }); shortLines += 1;
        if (units[j - 1].gap) { rows.push({ type: 'gap' }); shortLines += 1; }
        i = j;
      } else { push(units[i]); i++; }
    }
    while (rows.length && rows[rows.length - 1].type === 'gap') { rows.pop(); shortLines -= 1; }
    var fullLines = lines(String(text || '').replace(/\s+$/, ''));
    return {
      short: fullLines > LONG && fullLines - shortLines >= SAVING,
      fullLines: fullLines, shortLines: shortLines, rows: rows,
      shortWords: rows.reduce(function (n, r) { return n + (r.type === 'line' ? words(r.text) : 0); }, 0),
      calloutWords: rows.reduce(function (n, r) { return n + (r.type === 'callout' ? words(r.say) : 0); }, 0)
    };
  }

  // ── browser ─────────────────────────────────────────────────────────────

  // Callouts travel from the registry as a comment between the prompt label
  // and its fence (renderPromptBlock in site/layouts/curriculum.js); after
  // decoratePrompts it is the node that follows the block.
  function calloutsOf(block) {
    for (var n = block.nextSibling; n && n.nodeType !== 1; n = n.nextSibling) {
      if (n.nodeType === 8 && /^prompt-callouts\s/.test(n.data)) {
        try { return JSON.parse(n.data.replace(/^prompt-callouts\s+/, '')); } catch (e) { return []; }
      }
    }
    return [];
  }

  // `your-call: true` travels as a comment after the block, like the
  // callouts. The tag tells a learner at a glance that this prompt waits for
  // their own judgment.
  function yourCall(block) {
    for (var n = block.nextSibling; n && n.nodeType !== 1; n = n.nextSibling) {
      if (n.nodeType === 8 && /^prompt-your-call\b/.test(n.data)) return true;
    }
    return false;
  }

  function tagYourCall(doc, block) {
    if (!yourCall(block) || block.querySelector('.prompt-block__yourcall')) return;
    var dest = block.querySelector('.prompt-block__dest');
    if (!dest) return;
    var tag = el(doc, 'span', 'prompt-block__yourcall', 'Your call');
    tag.title = 'The agent waits for your own judgment here';
    dest.after(tag);
  }

  function el(doc, tag, cls, text) {
    var e = doc.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  function build(doc, block) {
    var pre = block.querySelector('pre.prompt-block__pre');
    if (!pre || block.querySelector('.prompt-short')) return;
    var code = pre.querySelector('code') || pre;
    var view = shortView(code.textContent, calloutsOf(block));
    if (!view.short) return;
    var box = el(doc, 'div', 'prompt-short'), part = null;
    view.rows.forEach(function (r) {
      if (r.type === 'callout') {
        var c = el(doc, 'div', 'prompt-callout');
        var mark = el(doc, 'span', 'prompt-callout__mark', '↓'); mark.setAttribute('aria-hidden', 'true');
        c.append(mark, el(doc, 'span', '', r.say));
        box.append(c); part = null; return;
      }
      if (r.type === 'gap') { part = null; return; }
      if (!part) { part = el(doc, 'div', 'prompt-short__part'); box.append(part); }
      if (r.type === 'fold') { part.append(el(doc, 'div', 'prompt-short__line prompt-short__more', '… ' + r.count + ' more lines')); return; }
      var line = el(doc, 'div', 'prompt-short__line', r.text);
      if (r.more) line.append(el(doc, 'span', 'prompt-short__more', ' …'));
      part.append(line);
    });
    var foot = el(doc, 'div', 'prompt-short__foot', 'The prompt in short. Copy takes all ' + view.fullLines + ' lines. ');
    var show = el(doc, 'button', 'prompt-short__toggle', 'Show them'); show.type = 'button';
    foot.append(show); box.append(foot);
    var back = el(doc, 'div', 'prompt-short__foot prompt-short__back');
    var hide = el(doc, 'button', 'prompt-short__toggle', 'Show the prompt in short'); hide.type = 'button';
    back.append(hide);
    pre.before(box); pre.after(back);
    block.classList.add('prompt-block--short');
  }

  function shown(node, stop) {
    var view = node.ownerDocument.defaultView;
    for (var n = node; n && n !== stop && n.nodeType === 1; n = n.parentElement) {
      if (view.getComputedStyle(n).display === 'none') return false;
    }
    return true;
  }

  // "Prompt 4 of 9": the prompts of one module that the chosen runtime shows.
  function number(doc) {
    Array.prototype.forEach.call(doc.querySelectorAll('main section.module'), function (mod) {
      var blocks = Array.prototype.filter.call(mod.querySelectorAll('.prompt-block'), function (b) { return shown(b, mod); });
      blocks.forEach(function (b, i) {
        var label = b.querySelector('.prompt-block__label');
        if (label) label.textContent = 'Prompt ' + (i + 1) + ' of ' + blocks.length;
      });
    });
  }

  function install(doc) {
    if (doc.body.getAttribute('data-prompt-view') !== 'short' || doc.body.hasAttribute('data-prompt-short-on')) return;
    doc.body.setAttribute('data-prompt-short-on', '');
    Array.prototype.forEach.call(doc.querySelectorAll('main section.module .prompt-block'), function (b) { build(doc, b); tagYourCall(doc, b); });
    number(doc);
    // One listener for every toggle, so a cloned block keeps working.
    doc.addEventListener('click', function (ev) {
      var t = ev.target && ev.target.closest && ev.target.closest('.prompt-short__toggle');
      if (!t) return;
      var block = t.closest('.prompt-block');
      if (!block) return;
      var toShort = !block.classList.contains('prompt-block--short');
      block.classList.toggle('prompt-block--short', toShort);
      block.classList.toggle('prompt-block--full', !toShort);
    });
    // The runtime switcher changes which prompts show; their numbers follow.
    var view = doc.defaultView;
    if (view && view.MutationObserver) {
      var last = doc.body.className.replace(/\bslides-active\b/, '');
      new view.MutationObserver(function () {
        var now = doc.body.className.replace(/\bslides-active\b/, '');
        if (now !== last) { last = now; number(doc); }
      }).observe(doc.body, { attributes: true, attributeFilter: ['class'] });
    }
  }

  return { promptOutline: promptOutline, shortView: shortView, install: install, LONG: LONG, CHARS: CHARS };
});
