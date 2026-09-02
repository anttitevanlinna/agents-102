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
        if (runtime === 'cowork') return ['cowork'];
        if (runtime === 'desktop') return ['desktop', 'codex-desktop'];
        if (runtime === 'cli') return ['cli', 'codex-cli'];
        throw new Error('Unknown Agents 101 prompt runtime: ' + runtime);
    }

    return {
        DEFAULT_PROFILE: DEFAULT_PROFILE,
        PROFILE_ORDER: PROFILE_ORDER,
        PROFILES: PROFILES,
        getProfile: getProfile,
        compatibleProfiles: compatibleProfiles
    };
});
