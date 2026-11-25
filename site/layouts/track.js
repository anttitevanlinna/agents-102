/* Behavioural tracking for the public Agents 101 self-study site (Umami).
 *
 * Loads Umami itself and sends a small set of named events. Cookieless: no
 * cookie, no localStorage, no user id; dedupe is per page load only.
 *
 * Config, from the first that exists:
 *   window.A101_TRACK = { websiteId, domains, site, release }   (inlined builds)
 *   data-website-id / data-domains / data-site / data-release on this <script>
 *   site/analytics.json, fetched from beside layouts/ (hand-written pages)
 *
 * Relies only on markup the handbook build keeps across redesigns:
 *   section.module[id]       a module, prework or supplementary page
 *   section.phase[id]        a lecture or exercise step inside a module
 *   .copy-btn                every copy button (prompt blocks and plain <pre>)
 *   video                    walkthrough videos
 *   a[href*=".tar.gz"]       starter payload download
 *   [data-a101-os]           Mac / Windows picker
 *   [data-runtime]           Cowork / Desktop / CLI ... switcher
 *   .layout-toggle__btn[data-mode], .deck__exit, .deck__count   Long-read / Slides
 *   [data-umami-event]       hand-placed buttons (home page), handled by Umami itself
 *
 * Events (names fixed so Umami funnels can use them as steps):
 *   prework-start  prework-done  M1-start  M1-done ... M8-start  M8-done
 *   <slug>-start / <slug>-done   for unnumbered pages (supplementary, reference)
 *   step            {module, step}
 *   copy-prompt     {module, step, n, kind}      copy-failed {module, step}
 *   video-play / video-half / video-end    {video, module}
 *   download-starter {file, module}
 *   os-pick {os}   runtime-pick {runtime}   view-switch {to}
 *   outbound {host, module}   contact-click {module}
 * Every event also carries {site, view} (view = read | slides).
 */
(function () {
    'use strict';
    if (typeof window === 'undefined' || window.__a101Track) return;
    window.__a101Track = true;

    var me = document.currentScript;
    var cfg = window.A101_TRACK || {};
    function opt(k, attr) {
        if (cfg[k] != null && cfg[k] !== '') return String(cfg[k]);
        return me && me.getAttribute(attr) ? me.getAttribute(attr) : '';
    }
    var WEBSITE_ID = opt('websiteId', 'data-website-id');
    var DOMAINS = opt('domains', 'data-domains');
    var SITE = opt('site', 'data-site') || 'handbook';
    var RELEASE = opt('release', 'data-release');
    var DWELL_MS = cfg.dwellMs != null ? cfg.dwellMs : 3000;

    // ── Umami loader + queue ────────────────────────────────────────────
    function loadUmami(id, domains, release) {
        if (!id || document.querySelector('script[data-website-id]')) return;
        var u = document.createElement('script');
        u.defer = true;
        u.src = cfg.src || 'https://cloud.umami.is/script.js';
        u.setAttribute('data-website-id', id);
        if (domains) u.setAttribute('data-domains', domains);
        if (release) u.setAttribute('data-tag', release);
        (document.head || document.documentElement).appendChild(u);
    }
    if (WEBSITE_ID) loadUmami(WEBSITE_ID, DOMAINS, RELEASE);
    else if (me && me.src && window.fetch) {
        // Hand-written pages (home) load this file by URL: read the one
        // config the build uses, site/analytics.json, from beside layouts/.
        fetch(me.src.replace(/layouts\/track\.js.*$/, 'analytics.json'), { credentials: 'omit' })
            .then(function (r) { return r.ok ? r.json() : {}; })
            .then(function (a) {
                RELEASE = RELEASE || a.release || '';
                loadUmami(a.websiteId, DOMAINS || a.domains, RELEASE);
            })
            .catch(function () {});
    }
    var queue = [];
    var sent = Object.create(null);
    function view() {
        return document.body && document.body.classList.contains('slides-active') ? 'slides' : 'read';
    }
    function flush() {
        if (!window.umami || typeof window.umami.track !== 'function') return false;
        while (queue.length) {
            var q = queue.shift();
            try { window.umami.track(q[0], q[1]); } catch (e) { /* never break the page */ }
        }
        return true;
    }
    function send(name, data, onceKey) {
        if (onceKey) {
            if (sent[onceKey]) return;
            sent[onceKey] = 1;
        }
        var d = { site: SITE, view: view() };
        for (var k in data) if (Object.prototype.hasOwnProperty.call(data, k)) d[k] = data[k];
        queue.push([name.slice(0, 50), d]);
        flush();
    }
    var tries = 0;
    // Umami loads deferred; hold events until it is there (max 60 s).
    var timer = setInterval(function () {
        if (flush() || ++tries > 120) clearInterval(timer);
    }, 500);
    window.A101Track = { send: send, _queue: queue };

    // ── Module labels ───────────────────────────────────────────────────
    var labels = Object.create(null);
    function labelFor(section) {
        if (!section || !section.id) return 'top';
        if (labels[section.id]) return labels[section.id];
        var id = section.id, label = id;
        if (id === 'prework') label = 'prework';
        else {
            var sel = 'a[href="#' + (window.CSS && CSS.escape ? CSS.escape(id) : id) + '"] .module-n';
            var n = document.querySelector(sel);
            var num = n ? parseInt(n.textContent, 10) : NaN;
            if (!isNaN(num) && num > 0) label = 'M' + num;
        }
        labels[id] = label;
        return label;
    }
    function where(el) {
        var mod = el && el.closest ? el.closest('section.module') : null;
        var step = el && el.closest ? el.closest('section.phase') : null;
        return {
            module: mod ? labelFor(mod) : (el && el.closest && el.closest('section[id]') ? el.closest('section[id]').id : 'top'),
            step: step ? step.id : ''
        };
    }

    // ── Reading progress (long-read) ────────────────────────────────────
    function startObservers() {
        if (!('IntersectionObserver' in window)) return;
        var timers = new Map();
        function dwell(fire) {
            return function (entries) {
                entries.forEach(function (en) {
                    var t = en.target;
                    if (en.isIntersecting) {
                        if (!timers.has(t)) timers.set(t, setTimeout(function () { fire(t); }, DWELL_MS));
                    } else if (timers.has(t)) {
                        clearTimeout(timers.get(t));
                        timers.delete(t);
                    }
                });
            };
        }
        // A section counts as reached when it holds the upper half of the
        // screen for DWELL_MS: a fast scroll past does not count.
        var upper = { rootMargin: '0px 0px -50% 0px' };
        var modIO = new IntersectionObserver(dwell(function (t) {
            var l = labelFor(t);
            send(l + '-start', { module: l }, 'start:' + l);
        }), upper);
        var stepIO = new IntersectionObserver(dwell(function (t) {
            var w = where(t);
            send('step', { module: w.module, step: t.id }, 'step:' + t.id);
        }), upper);
        var endIO = new IntersectionObserver(dwell(function (t) {
            var l = t.getAttribute('data-a101-end');
            send(l + '-done', { module: l }, 'done:' + l);
            send(l + '-start', { module: l }, 'start:' + l); // a done implies a start
        }), { threshold: 0 });
        document.querySelectorAll('section.module[id]').forEach(function (m) {
            modIO.observe(m);
            var s = document.createElement('div');
            s.setAttribute('data-a101-end', labelFor(m));
            s.setAttribute('aria-hidden', 'true');
            s.style.cssText = 'height:1px;margin:0;padding:0;';
            m.appendChild(s);
            endIO.observe(s);
        });
        document.querySelectorAll('section.phase[id]').forEach(function (p) { stepIO.observe(p); });
    }

    // ── Reading progress (slides) ───────────────────────────────────────
    // The deck hides the long-read; its counter reads "M1·3 — 12 / 140".
    var lastCode = null, lastSlide = 0;
    function codeToLabel(code) {
        if (!code) return null;
        if (code === 'P') return 'prework';
        if (/^M\d+$/.test(code)) return code;
        return null;
    }
    function onDeckCount(txt) {
        var m = /^(?:([A-Z]+\d*)(?:·\d+)?\s+—\s+)?(\d+)\s*\/\s*(\d+)/.exec(txt || '');
        if (!m) return;
        var label = codeToLabel(m[1]);
        var n = parseInt(m[2], 10), total = parseInt(m[3], 10);
        if (label) {
            send(label + '-start', { module: label }, 'start:' + label);
            if (lastCode && lastCode !== label && n === lastSlide + 1) {
                send(lastCode + '-done', { module: lastCode }, 'done:' + lastCode);
            }
            if (n === total) send(label + '-done', { module: label }, 'done:' + label);
            lastCode = label;
        }
        lastSlide = n;
    }
    function watchDeck() {
        if (!('MutationObserver' in window)) return;
        var pending = false;
        new MutationObserver(function () {
            if (pending) return;
            pending = true;
            setTimeout(function () {
                pending = false;
                var c = document.querySelector('.deck__count');
                if (c && document.body.classList.contains('slides-active')) onDeckCount(c.textContent);
            }, 250);
        }).observe(document.body, { subtree: true, childList: true, characterData: true });
    }

    // ── Clicks ──────────────────────────────────────────────────────────
    document.addEventListener('click', function (ev) {
        var t = ev.target;
        if (!t || !t.closest) return;

        var copy = t.closest('.copy-btn');
        if (copy) {
            var w = where(copy);
            var host = copy.closest('.prompt-block') || copy.parentNode;
            var scope = copy.closest('section.phase') || copy.closest('section[id]') || document.body;
            var all = Array.prototype.slice.call(scope.querySelectorAll('.copy-btn'));
            var n = all.indexOf(copy) + 1;
            var kind = host && host.classList && host.classList.contains('prompt-block') ? 'prompt' : 'code';
            send('copy-prompt', { module: w.module, step: w.step, n: n, kind: kind });
            // The button repaints to "Copy failed" when the clipboard refuses.
            setTimeout(function () {
                if (/fail/i.test(copy.textContent)) send('copy-failed', { module: w.module, step: w.step });
            }, 600);
            return;
        }

        var os = t.closest('[data-a101-os]');
        if (os) { send('os-pick', { os: os.getAttribute('data-a101-os') }); return; }

        var rt = t.closest('[data-runtime]');
        if (rt && rt.closest('#runtime-switcher, .runtime-switcher')) {
            send('runtime-pick', { runtime: rt.getAttribute('data-runtime') });
            return;
        }

        var lt = t.closest('.layout-toggle__btn[data-mode]');
        if (lt) { send('view-switch', { to: lt.getAttribute('data-mode') }); return; }
        if (t.closest('.deck__exit')) { send('view-switch', { to: 'read' }); return; }

        var a = t.closest('a[href]');
        if (!a) return;
        var href = a.getAttribute('href') || '';
        var w2 = where(a);
        if (/\.tar\.gz(\?|#|$)/.test(href)) {
            send('download-starter', { file: href.split('/').pop().split('?')[0], module: w2.module });
            return;
        }
        if (/^mailto:/i.test(href)) { send('contact-click', { module: w2.module }); return; }
        if (a.hasAttribute('data-umami-event')) return; // Umami sends these itself
        var url;
        try { url = new URL(href, location.href); } catch (e) { return; }
        if (url.host && url.host !== location.host && /^https?:$/.test(url.protocol)) {
            send('outbound', { host: url.host, module: w2.module });
        }
    }, true);

    // ── Video ───────────────────────────────────────────────────────────
    function vname(v) {
        var label = v.getAttribute('data-name') || v.getAttribute('aria-label');
        var s = v.currentSrc || v.getAttribute('src') || (v.querySelector('source') || {}).src || '';
        if (label || /^(data|blob):/.test(s)) return (label || 'video').slice(0, 80);
        return (s.split('/').pop() || 'video').split('?')[0];
    }
    document.addEventListener('play', function (ev) {
        var v = ev.target;
        if (!v || v.tagName !== 'VIDEO') return;
        var w = where(v);
        send('video-play', { video: vname(v), module: w.module }, 'vplay:' + vname(v));
    }, true);
    document.addEventListener('timeupdate', function (ev) {
        var v = ev.target;
        if (!v || v.tagName !== 'VIDEO' || !v.duration) return;
        if (v.currentTime / v.duration >= 0.5) {
            send('video-half', { video: vname(v), module: where(v).module }, 'vhalf:' + vname(v));
        }
    }, true);
    document.addEventListener('ended', function (ev) {
        var v = ev.target;
        if (!v || v.tagName !== 'VIDEO') return;
        send('video-end', { video: vname(v), module: where(v).module }, 'vend:' + vname(v));
    }, true);

    function boot() {
        // Let the handbook runtime render first (prompt blocks, toc numbers).
        setTimeout(function () { startObservers(); watchDeck(); }, 0);
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
    else boot();
})();
