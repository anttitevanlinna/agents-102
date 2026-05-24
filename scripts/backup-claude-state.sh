#!/usr/bin/env bash
# backup-claude-state.sh — snapshot the agents-102 Claude generation + eval
# infrastructure that lives OUTSIDE the agents-102 git repo to Google Drive.
#
# What's at risk without this script:
#   - ~/.claude/projects/-Users-anttitevanlinna-Projects-agents-102/memory/
#     (auto-memory: check_*.md compendiums, compounded/, MEMORY.md, etc.)
#   - ~/.claude/skills/ (personal skills: bosser-strategy, etc.)
#   - ~/.claude/{CLAUDE.md, settings.json, agents/, hooks/}
#   - agents-102/.claude/{hooks/, rules/, agents/, lints/, agent-memory/}
#     (gitignored — eval-class-router.sh, content-rules.md, etc.)
#
# All of the above is single-disk-of-failure. This script writes a dated
# zip to the Bosser Drive folder so the rules + skills + hooks survive
# a laptop loss.
#
# Idempotent: re-running on the same day overwrites the day's zip with a
# fresh snapshot. Daily granularity is enough — rule changes don't move
# faster than that, and the per-day name keeps a rolling history without
# requiring rotation logic.
#
# Invocation:
#   ./scripts/backup-claude-state.sh
# or from /refresh skill Step 0.

set -euo pipefail

BACKUP_DIR="/Users/anttitevanlinna/Library/CloudStorage/GoogleDrive-tevanlin@gmail.com/My Drive/bosser/claude-memory-backups"
DATE=$(date +%Y-%m-%d)
ZIP_NAME="agents-102-claude-${DATE}.zip"

if [ ! -d "$BACKUP_DIR" ]; then
  echo "BACKUP_DIR not present (Drive not mounted?): $BACKUP_DIR" >&2
  exit 1
fi

STAGE=$(mktemp -d)
ROOT="$STAGE/agents-102-claude-$DATE"
mkdir -p "$ROOT/home-claude" "$ROOT/project-claude"

# 1) agents-102 auto-memory (compendiums, compounded entries, MEMORY.md, schema)
MEMORY_SRC="$HOME/.claude/projects/-Users-anttitevanlinna-Projects-agents-102/memory"
if [ -d "$MEMORY_SRC" ]; then
  cp -R "$MEMORY_SRC" "$ROOT/memory"
fi

# 2) Personal ~/.claude/ surface
[ -f "$HOME/.claude/CLAUDE.md" ] && cp "$HOME/.claude/CLAUDE.md" "$ROOT/home-claude/"
[ -f "$HOME/.claude/settings.json" ] && cp "$HOME/.claude/settings.json" "$ROOT/home-claude/"
[ -d "$HOME/.claude/skills" ] && cp -R "$HOME/.claude/skills" "$ROOT/home-claude/"
[ -d "$HOME/.claude/agents" ] && cp -R "$HOME/.claude/agents" "$ROOT/home-claude/"
[ -d "$HOME/.claude/hooks" ] && cp -R "$HOME/.claude/hooks" "$ROOT/home-claude/"

# 3) Project-level gitignored .claude/ surface (hooks + rules + agents + lints + agent-memory)
PROJ=/Users/anttitevanlinna/Projects/agents-102/.claude
[ -d "$PROJ/hooks" ] && cp -R "$PROJ/hooks" "$ROOT/project-claude/"
[ -d "$PROJ/rules" ] && cp -R "$PROJ/rules" "$ROOT/project-claude/"
[ -d "$PROJ/agents" ] && cp -R "$PROJ/agents" "$ROOT/project-claude/"
[ -d "$PROJ/lints" ] && cp -R "$PROJ/lints" "$ROOT/project-claude/"
[ -d "$PROJ/agent-memory" ] && cp -R "$PROJ/agent-memory" "$ROOT/project-claude/"

# 4) Manifest
cat > "$ROOT/MANIFEST.md" <<MANIFEST_EOF
# Agents 102 Claude backup, $DATE

Captures generation + eval infrastructure that lives outside the agents-102 git repo (auto-memory, personal skills, gitignored hooks + rules + agents). Built by \`scripts/backup-claude-state.sh\`.

## Contents

- \`memory/\` — agents-102 auto-memory: all check_*.md compendiums, compounded entries, MEMORY.md, project / feedback / reference notes, schema, voice / copy / storytelling spec.
- \`home-claude/\` — user-level (\`~/.claude/\`):
  - CLAUDE.md (global user instructions)
  - settings.json (config)
  - skills/ (personal skills: bosser-strategy, curriculum-pre-ship-audit, done-means-judge, etc.)
  - agents/ (personal agent definitions)
  - hooks/ (personal hook scripts)
- \`project-claude/\` — agents-102 project-level (\`agents-102/.claude/\`, gitignored):
  - hooks/ (eval-class-router.sh, banned-phrase-grep.sh, prompt-edit-gate.sh, etc.)
  - rules/ (content-rules.md — mandatory subagent injection; research-rules.md lives in continuous-research/ — tracked in repo)
  - agents/ (project-specific agent definitions)
  - lints/ (additional lint scripts)
  - agent-memory/ (agent-managed memory)

## NOT included

- \`~/.claude/projects/\` other than agents-102 (other projects' auto-memory has its own backup story).
- \`~/.claude/\` ephemeral: cache, chrome, debug, file-history, paste-cache, sessions, shell-snapshots, plugins/* (those reload from manifest), projects/* (other than agents-102 memory).
- \`~/.claude/settings.local.json\` (may contain secrets).
- \`agents-102/.claude/worktrees/\` (ephemeral worktree state).
- \`agents-102/.claude/settings.local.json\` (may contain secrets).

## Restore

Unzip into corresponding locations. \`~/.claude/CLAUDE.md\` and \`settings.json\` go to home; \`memory/\` goes to \`~/.claude/projects/-Users-anttitevanlinna-Projects-agents-102/\`; \`project-claude/*\` goes to \`~/Projects/agents-102/.claude/\`.
MANIFEST_EOF

# 5) Zip + drop in Drive
( cd "$STAGE" && zip -rq "$BACKUP_DIR/$ZIP_NAME" "agents-102-claude-$DATE" -x "*.DS_Store" )

# 6) Cleanup + report
rm -rf "$STAGE"
SIZE=$(du -h "$BACKUP_DIR/$ZIP_NAME" | cut -f1)
echo "Backup written: $BACKUP_DIR/$ZIP_NAME ($SIZE)"
