// Agents 101 runtime profiles — shared by browser presentation, prompt
// compilation, and the mechanical simulation runner.

(function (global, factory) {
    if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        global.A101Runtimes = factory();
    }
})(typeof window !== 'undefined' ? window : globalThis, function () {
    'use strict';

    var DEFAULT_PROFILE = 'cowork';
    var STORAGE_KEY = 'agents102-runtime';
    var PROMPT_MARKER_RE = /^\{\{(prompt|cut):([a-z0-9-]+)(?:\|([a-z0-9-]+))?\}\}[ \t]*$/gm;
    var PROFILE_ORDER = Object.freeze([
        'cowork',
        'desktop',
        'cli',
        'codex-desktop',
        'codex-cli'
    ]);

    function profile(key, label, family, surface, transport, capabilities, rootInstructions, projectSkills) {
        return Object.freeze({
            key: key,
            label: label,
            family: family,
            surface: surface,
            transport: transport,
            capabilities: Object.freeze(capabilities.slice()),
            artifacts: Object.freeze({
                'root-instructions': rootInstructions,
                'project-skills': projectSkills
            })
        });
    }

    var PROFILES = Object.freeze({
        cowork: profile(
            'cowork', 'Cowork', 'claude', 'cowork', '',
            ['claude', 'cowork'], 'CLAUDE.md', '.claude/skills'
        ),
        desktop: profile(
            'desktop', 'Claude Code Desktop', 'claude', 'desktop', '',
            ['claude', 'desktop', 'code'], 'CLAUDE.md', '.claude/skills'
        ),
        cli: profile(
            'cli', 'Claude Code CLI', 'claude', 'cli', 'claude-tmux',
            ['claude', 'cli', 'code'], 'CLAUDE.md', '.claude/skills'
        ),
        'codex-desktop': profile(
            'codex-desktop', 'Codex Desktop', 'codex', 'desktop', '',
            ['codex', 'desktop', 'code'], 'AGENTS.md', '.agents/skills'
        ),
        'codex-cli': profile(
            'codex-cli', 'Codex CLI', 'codex', 'cli', 'codex-exec',
            ['codex', 'cli', 'code'], 'AGENTS.md', '.agents/skills'
        )
    });

    function getProfile(key) {
        if (!Object.prototype.hasOwnProperty.call(PROFILES, key)) {
            throw new Error('Unknown Agents 101 runtime profile: ' + key);
        }
        return PROFILES[key];
    }

    function compatibleProfiles(runtime) {
        if (runtime === 'any') return PROFILE_ORDER.slice();
        if (runtime === 'code') return ['desktop', 'cli', 'codex-desktop', 'codex-cli'];
        if (runtime === 'cowork') return ['cowork'];
        if (runtime === 'desktop') return ['desktop', 'codex-desktop'];
        if (runtime === 'cli') return ['cli', 'codex-cli'];
        throw new Error('Unknown Agents 101 prompt runtime: ' + runtime);
    }

    function esc(value) {
        return String(value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    function renderSwitcherHtml() {
        var buttons = PROFILE_ORDER.map(function (key) {
            var profile = PROFILES[key];
            return '<button type="button" data-runtime="' + esc(key) +
                '" class="runtime-switcher-btn">' + esc(profile.label) + '</button>';
        }).join('');
        return '<span class="runtime-switcher-label">Working with:</span>' + buttons;
    }

    function displayEntry(entry, profileKey) {
        var profile = getProfile(profileKey);
        var displayed = Object.assign({}, entry);
        if (displayed.dest === 'Claude Code') displayed.dest = profile.label;
        if (displayed.dest === 'Builder Claude' && profile.family === 'codex') {
            displayed.dest = 'Builder Codex';
        }
        return displayed;
    }

    function expandPrompts(md, registry, options) {
        if (!md || !registry) return md;
        var opts = options || {};
        if (typeof opts.renderPromptBlock !== 'function') {
            throw new Error('A101Runtimes.expandPrompts: renderPromptBlock is required');
        }
        var unresolved = [];
        PROMPT_MARKER_RE.lastIndex = 0;
        var output = md.replace(PROMPT_MARKER_RE, function (match, kind, key, reason) {
            var entry = registry[key];
            if (!entry) {
                unresolved.push(key);
                return match;
            }
            var profileKeys = compatibleProfiles(entry.runtime || 'any');
            var blocks = [];
            profileKeys.forEach(function (profileKey) {
                var variant = entry.runtimeVariants && entry.runtimeVariants[profileKey];
                if (!variant) {
                    unresolved.push(key + ' missing variant ' + profileKey);
                    return;
                }
                var cut = kind === 'cut' ? { reason: reason || '' } : undefined;
                var rendered = opts.renderPromptBlock(displayEntry(variant, profileKey), cut);
                blocks.push(
                    '<div class="rt-profile rt-profile-' + esc(profileKey) + '">\n\n' +
                    rendered + '\n\n</div>'
                );
            });
            return blocks.join('\n');
        });
        if (opts.strict && unresolved.length) {
            throw new Error(
                'A101Runtimes.expandPrompts: unresolved prompt runtime entry(s): ' +
                unresolved.join(', ')
            );
        }
        return output;
    }

    function getRuntime(storage) {
        var store = storage;
        if (!store && typeof window !== 'undefined') store = window.localStorage;
        var stored = null;
        try { stored = store && store.getItem(STORAGE_KEY); } catch (e) {}
        return Object.prototype.hasOwnProperty.call(PROFILES, stored)
            ? stored
            : DEFAULT_PROFILE;
    }

    function applyRuntime(runtime, doc) {
        getProfile(runtime);
        var target = doc || (typeof document !== 'undefined' ? document : null);
        if (!target || !target.body) return;
        PROFILE_ORDER.forEach(function (key) {
            target.body.classList.remove('runtime-' + key);
        });
        target.body.classList.add('runtime-' + runtime);
        var switcher = target.getElementById('runtime-switcher');
        if (!switcher) return;
        var buttons = switcher.querySelectorAll('.runtime-switcher-btn');
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].classList.toggle(
                'is-active',
                buttons[i].getAttribute('data-runtime') === runtime
            );
        }
    }

    function setRuntime(runtime, storage, doc) {
        getProfile(runtime);
        var store = storage;
        if (!store && typeof window !== 'undefined') store = window.localStorage;
        try { if (store) store.setItem(STORAGE_KEY, runtime); } catch (e) {}
        applyRuntime(runtime, doc);
    }

    function mountSwitcher(element) {
        if (!element) return;
        element.innerHTML = renderSwitcherHtml();
        element.hidden = false;
    }

    function wireRuntimeSwitcher(element, storage, doc) {
        if (!element) return;
        element.addEventListener('click', function (event) {
            var target = event.target;
            if (!target || !target.classList.contains('runtime-switcher-btn')) return;
            setRuntime(target.getAttribute('data-runtime'), storage, doc);
        });
    }

    return {
        DEFAULT_PROFILE: DEFAULT_PROFILE,
        PROFILE_ORDER: PROFILE_ORDER,
        PROFILES: PROFILES,
        getProfile: getProfile,
        compatibleProfiles: compatibleProfiles,
        renderSwitcherHtml: renderSwitcherHtml,
        expandPrompts: expandPrompts,
        getRuntime: getRuntime,
        applyRuntime: applyRuntime,
        setRuntime: setRuntime,
        mountSwitcher: mountSwitcher,
        wireRuntimeSwitcher: wireRuntimeSwitcher
    };
});
