/* Prompt places. Agents 101 handbook, every edition: scripts/build-a101-mvp.js
 * inlines this file. Design: curriculum/attention-design.md, "Navigation".
 *
 * Every prompt block carries its registry key as a comment
 * (<!--prompt-key eval-loop-3-->, written by renderPromptBlock in
 * site/layouts/curriculum.js). This script gives the block the reader can see
 * the address #p-<key>, so the agent can send the learner back to the exact
 * prompt from the prompt file it was given (prework/course-navigation.md,
 * "Back to the handbook"). Nothing is hand-kept: a new prompt gets its address
 * from its file name.
 *
 * Several runtime variants of one prompt can share a key; only the one the
 * chosen runtime shows gets the id, and the ids follow a runtime switch.
 */
(function (root, factory) {
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (typeof document !== 'undefined' && document.body) api.install(document);
})(this, function () {
  'use strict';

  var PREFIX = 'p-';

  function keyOf(block) {
    for (var n = block.nextSibling; n && n.nodeType !== 1; n = n.nextSibling) {
      if (n.nodeType === 8 && /^prompt-key\s/.test(n.data)) return n.data.replace(/^prompt-key\s+/, '').trim();
    }
    return '';
  }

  function shown(node) {
    var view = node.ownerDocument.defaultView;
    for (var n = node; n && n.nodeType === 1; n = n.parentElement) {
      if (n.hidden || view.getComputedStyle(n).display === 'none') return false;
    }
    return true;
  }

  // Give each key's visible block the id; a hidden variant gives it up.
  function place(doc) {
    var byKey = {};
    Array.prototype.forEach.call(doc.querySelectorAll('main .prompt-block'), function (b) {
      var key = keyOf(b);
      if (!key) return;
      (byKey[key] = byKey[key] || []).push(b);
    });
    Object.keys(byKey).forEach(function (key) {
      var blocks = byKey[key], id = PREFIX + key;
      var pick = blocks.filter(shown)[0] || blocks[0];
      blocks.forEach(function (b) { if (b !== pick && b.id === id) b.removeAttribute('id'); });
      if (!pick.id || pick.id === id) { pick.id = id; pick.style.scrollMarginTop = '5rem'; }
    });
    return byKey;
  }

  function go(doc) {
    var hash = doc.defaultView.location.hash;
    if (hash.indexOf('#' + PREFIX) !== 0) return;
    var target = doc.getElementById(decodeURIComponent(hash.slice(1)));
    if (target && target.scrollIntoView) target.scrollIntoView({ block: 'start' });
  }

  function install(doc) {
    if (doc.body.hasAttribute('data-prompt-places-on')) return;
    doc.body.setAttribute('data-prompt-places-on', '');
    var view = doc.defaultView;
    place(doc);
    // The ids exist only after this script runs, so the browser's own jump to
    // the address on load has already missed; make it here.
    go(doc);
    view.addEventListener('load', function () { place(doc); go(doc); });
    view.addEventListener('hashchange', function () { go(doc); });
    if (view.MutationObserver) {
      var last = doc.body.className;
      new view.MutationObserver(function () {
        if (doc.body.className !== last) { last = doc.body.className; place(doc); }
      }).observe(doc.body, { attributes: true, attributeFilter: ['class'] });
    }
  }

  return { install: install, place: place, keyOf: keyOf, PREFIX: PREFIX };
});
