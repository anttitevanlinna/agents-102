/* Anonymous step feedback for the public Agents 101 self-study site.
 *
 * Adds a small "Did this step work for you?" row at the end of each exercise
 * and of prework. A click sends one row to the Cloudflare feedback Worker
 * (cloudflare/feedback-worker/): module, step, signal, runtime, view, release,
 * and optional short text. No cookie, no storage, no id. The Worker keeps no
 * IP or user agent and keeps time only to the day.
 *
 * Config: window.A101_FEEDBACK = { url, release }  or data-url / data-release
 * on this <script>. Without a url the script does nothing.
 */
(function () {
    'use strict';
    if (typeof window === 'undefined' || window.__a101Feedback) return;
    window.__a101Feedback = true;

    var me = document.currentScript;
    var cfg = window.A101_FEEDBACK || {};
    var URL_ = cfg.url || (me && me.getAttribute('data-url')) || '';
    var RELEASE = cfg.release || (me && me.getAttribute('data-release')) || '';
    if (!URL_) return;

    var CSS = '' +
        '.a101-fb{margin:2rem 0 0;padding:.9rem 1rem;border:1px solid var(--line-2,#ddd);border-radius:10px;font-size:.95rem}' +
        '.a101-fb__q{margin:0 .75rem .5rem 0;display:inline-block;font-weight:600}' +
        '.a101-fb button{font:inherit;margin:0 .4rem .4rem 0;padding:.35rem .85rem;border-radius:999px;border:1px solid var(--line-2,#ccc);background:transparent;color:inherit;cursor:pointer}' +
        '.a101-fb button:hover{border-color:var(--accent,#8a2b2b);color:var(--accent,#8a2b2b)}' +
        '.a101-fb button[aria-pressed="true"]{background:var(--accent,#8a2b2b);border-color:var(--accent,#8a2b2b);color:#fff}' +
        '.a101-fb textarea{display:block;width:100%;box-sizing:border-box;min-height:4.5rem;margin:.4rem 0;padding:.5rem;font:inherit;border:1px solid var(--line-2,#ccc);border-radius:8px;background:transparent;color:inherit}' +
        '.a101-fb__note{margin:.3rem 0 0;font-size:.82rem;opacity:.7}' +
        '.a101-fb__more[hidden]{display:none}';

    function runtime() {
        var m = /\bruntime-([a-z-]+)\b/.exec(document.body.className);
        return m ? m[1] : '';
    }
    function view() {
        return document.body.classList.contains('slides-active') ? 'slides' : 'read';
    }
    // Same labels as track.js, so the two sinks agree: prework, M1..M8, slug.
    function label(mod) {
        if (!mod) return 'top';
        if (mod.id === 'prework') return 'prework';
        var n = document.querySelector('a[href="#' + mod.id + '"] .module-n');
        var num = n ? parseInt(n.textContent, 10) : NaN;
        return !isNaN(num) && num > 0 ? 'M' + num : mod.id;
    }
    function post(data) {
        var body = JSON.stringify(data);
        try {
            return fetch(URL_, {
                method: 'POST', mode: 'cors', credentials: 'omit', keepalive: true,
                headers: { 'Content-Type': 'application/json' }, body: body
            }).catch(function () {});
        } catch (e) { return Promise.resolve(); }
    }
    function send(where, signal, text) {
        var data = { site: 'handbook', release: RELEASE, module: where.module, step: where.step,
                     signal: signal, runtime: runtime(), view: view() };
        if (text) data.text = text;
        post(data);
        if (window.A101Track) window.A101Track.send('feedback', { module: where.module, step: where.step, signal: signal });
    }

    function widget(where) {
        var box = document.createElement('div');
        box.className = 'a101-fb';
        box.setAttribute('data-a101-feedback', '');
        box.innerHTML =
            '<p class="a101-fb__q">Did this step work for you?</p>' +
            '<button type="button" data-signal="worked" aria-pressed="false">It worked</button>' +
            '<button type="button" data-signal="stuck" aria-pressed="false">I got stuck</button>' +
            '<div class="a101-fb__more" hidden>' +
            '<label><span class="a101-fb__ask"></span>' +
            '<textarea maxlength="500"></textarea></label>' +
            '<button type="button" data-send>Send</button>' +
            '</div>' +
            '<p class="a101-fb__note" aria-live="polite">Anonymous. No cookies, no names. Please leave out names and emails.</p>';
        var more = box.querySelector('.a101-fb__more');
        var ask = box.querySelector('.a101-fb__ask');
        var ta = box.querySelector('textarea');
        var note = box.querySelector('.a101-fb__note');
        var sentSignal = null;
        box.addEventListener('click', function (ev) {
            var b = ev.target.closest('button');
            if (!b) return;
            var sig = b.getAttribute('data-signal');
            if (sig) {
                if (sentSignal === sig) return;
                box.querySelectorAll('[data-signal]').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
                sentSignal = sig;
                send(where, sig);
                ask.textContent = sig === 'stuck' ? 'What got in the way? (optional)' : 'Anything to add? (optional)';
                more.hidden = false;
                note.textContent = 'Thanks. Saved anonymously.';
                return;
            }
            if (b.hasAttribute('data-send')) {
                var text = ta.value.trim();
                if (!text) return;
                send(where, 'comment', text);
                ta.value = '';
                more.hidden = true;
                note.textContent = 'Thanks. Your note goes to the course author, without your name.';
            }
        });
        return box;
    }

    function mount() {
        var style = document.createElement('style');
        style.textContent = CSS;
        document.head.appendChild(style);
        var targets = document.querySelectorAll('section.phase--exercise[id], section.module#prework');
        targets.forEach(function (sec) {
            if (sec.querySelector(':scope > [data-a101-feedback]')) return;
            var mod = sec.closest('section.module');
            var where = { module: label(mod), step: sec.classList.contains('phase') ? sec.id : '' };
            var end = sec.querySelector(':scope > [data-a101-end]');
            var w = widget(where);
            if (end) sec.insertBefore(w, end); else sec.appendChild(w);
        });
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { setTimeout(mount, 0); });
    else setTimeout(mount, 0);
})();
