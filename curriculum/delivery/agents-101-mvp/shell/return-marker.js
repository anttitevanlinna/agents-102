/* Back to your step. Self-study handbook only (prototype, not wired into the
 * build). Design: curriculum/attention-design.md, "Navigation".
 *
 *   - Copy prompt remembers which prompt the learner took to the agent
 *   - when the learner comes back to the page and that prompt is out of view,
 *     one small button offers the way back: "Back to Prompt 4 of 9"
 *   - a reload or a new visit offers the same, so the page keeps the place
 *     without the agent
 *
 * Nothing is sent anywhere; the place lives in this browser only. Storage can
 * fail (private window, blocked site data), and then the page simply has no
 * button.
 */
(function (root, factory) {
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (typeof document !== 'undefined' && document.body) api.install(document);
})(this, function () {
  'use strict';

  var KEY = 'a101.lastPrompt';

  function save(win, v) { try { win.localStorage.setItem(KEY, JSON.stringify(v)); } catch (e) {} }
  function load(win) { try { return JSON.parse(win.localStorage.getItem(KEY) || 'null'); } catch (e) { return null; } }

  function blockId(block) {
    var mod = block.closest('section.module');
    var all = mod ? Array.prototype.slice.call(mod.querySelectorAll('.prompt-block')) : [];
    return { module: mod ? mod.id : '', index: all.indexOf(block) };
  }
  function findBlock(doc, v) {
    if (!v) return null;
    var mod = doc.getElementById(v.module);
    return mod ? mod.querySelectorAll('.prompt-block')[v.index] || null : null;
  }
  function inView(win, el) {
    var r = el.getBoundingClientRect();
    return r.bottom > 0 && r.top < win.innerHeight;
  }

  function install(doc) {
    var win = doc.defaultView;
    if (doc.body.getAttribute('data-prompt-view') !== 'short' || doc.body.hasAttribute('data-return-on')) return;
    doc.body.setAttribute('data-return-on', '');

    var btn = doc.createElement('button');
    btn.type = 'button';
    btn.className = 'return-marker';
    btn.hidden = true;
    doc.body.appendChild(btn);

    var current = load(win), armed = false;

    // withModule: on a new visit the learner may be anywhere, so name the module too.
    function offer(withModule) {
      var block = findBlock(doc, current);
      if (!block || inView(win, block)) { btn.hidden = true; return; }
      var label = block.querySelector('.prompt-block__label');
      var mod = block.closest('section.module'), h = mod && mod.querySelector('h1');
      btn.textContent = 'Back to ' + (withModule && h ? h.textContent.trim() + ', ' : '') + (label ? label.textContent : 'your prompt');
      btn.hidden = false;
    }

    doc.addEventListener('click', function (ev) {
      var copy = ev.target && ev.target.closest && ev.target.closest('.prompt-block .copy-btn');
      if (!copy) return;
      var block = copy.closest('.prompt-block');
      doc.querySelectorAll('.prompt-block--taken').forEach(function (b) { b.classList.remove('prompt-block--taken'); });
      block.classList.add('prompt-block--taken');
      current = blockId(block); save(win, current); armed = true; btn.hidden = true;
    }, true);

    // Coming back from the agent: the tab turns visible or the window regains focus.
    function back() { if (armed) offer(false); }
    doc.addEventListener('visibilitychange', function () { if (!doc.hidden) back(); });
    win.addEventListener('focus', back);
    win.addEventListener('scroll', function () {
      var block = findBlock(doc, current);
      if (!btn.hidden && block && inView(win, block)) btn.hidden = true;
    }, { passive: true });

    btn.addEventListener('click', function () {
      var block = findBlock(doc, current);
      if (!block) return;
      var end = block.nextElementSibling || block;
      end.scrollIntoView({ block: 'center' });
      block.classList.add('prompt-block--taken');
      btn.hidden = true;
    });

    // A new visit: offer the last place unless a link already chose one.
    var block = findBlock(doc, current);
    if (block) { block.classList.add('prompt-block--taken'); if (!win.location.hash) offer(true); }
  }

  return { install: install, KEY: KEY };
});
