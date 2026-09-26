#!/usr/bin/env bash
# backup-claude-state.sh — zip what git does not hold to Google Drive.
#
# Rules, memory, hooks, skills, agents, lints and strategy live in the
# agents-102-core git repo; ~/.claude/projects/.../memory and
# agents-102/.claude/{hooks,agent-memory} are links into it. Git is their
# backup. What is left on one disk:
#   - ~/.claude/{CLAUDE.md,settings.json}  personal instructions, machine config
#   - ~/.claude/skills, ~/.claude/agents   personal skills/agents not in core
#   - $BOSSER_BUSINESS_DIR strategy/ + agents-102/  business notes, no git
#
# Maintainer-only. The destination is yours to name (a synced Drive folder,
# say); nothing here knows where it is. Same-day re-run overwrites the day's
# zip; the dated names are the history.
#
#   CLAUDE_BACKUP_DIR=<dir> ./scripts/backup-claude-state.sh

set -euo pipefail

BACKUP_DIR="${CLAUDE_BACKUP_DIR:?set CLAUDE_BACKUP_DIR to the folder the zip goes to}"
DATE=$(date +%Y-%m-%d)
ZIP_NAME="agents-102-claude-${DATE}.zip"

if [ ! -d "$BACKUP_DIR" ]; then
  echo "CLAUDE_BACKUP_DIR not present (not mounted?): $BACKUP_DIR" >&2
  exit 1
fi

STAGE=$(mktemp -d)
ROOT="$STAGE/agents-102-claude-$DATE"
mkdir -p "$ROOT/home-claude"

[ -f "$HOME/.claude/CLAUDE.md" ] && cp -L "$HOME/.claude/CLAUDE.md" "$ROOT/home-claude/"
[ -f "$HOME/.claude/settings.json" ] && cp "$HOME/.claude/settings.json" "$ROOT/home-claude/"
[ -d "$HOME/.claude/skills" ] && cp -RL "$HOME/.claude/skills" "$ROOT/home-claude/"
[ -d "$HOME/.claude/agents" ] && cp -RL "$HOME/.claude/agents" "$ROOT/home-claude/"

# Business notes are optional: BOSSER_BUSINESS_DIR is the folder the
# bosser-strategy skill reads pricing and business strategy from.
BOSSER="${BOSSER_BUSINESS_DIR:-/nonexistent}"
mkdir -p "$ROOT/bosser"
[ -d "$BOSSER/strategy" ] && cp -R "$BOSSER/strategy" "$ROOT/bosser/"
[ -d "$BOSSER/agents-102" ] && cp -R "$BOSSER/agents-102" "$ROOT/bosser/"

cat > "$ROOT/MANIFEST.md" <<MANIFEST_EOF
# Agents 102 local-state backup, $DATE

What git does not hold. Rules, memory, hooks, skills and strategy are in the agents-102-core repo; restore those with \`git clone\`.

- \`home-claude/\`: \`~/.claude/CLAUDE.md\`, \`settings.json\`, personal \`skills/\` and \`agents/\`. Restore into \`~/.claude/\`.
- \`bosser/\`: \`$BOSSER_BUSINESS_DIR\` \`strategy/\` and \`agents-102/\` (pricing, licensing), when set. Not in git; these zips are their history.

Not included: \`settings.local.json\` files (may hold secrets), other projects' memory, \`~/.claude\` caches and sessions.
MANIFEST_EOF

# zip -r into an existing zip only adds, so build beside the target, then replace.
( cd "$STAGE" && zip -rq "$STAGE/$ZIP_NAME" "agents-102-claude-$DATE" -x "*.DS_Store" )
mv -f "$STAGE/$ZIP_NAME" "$BACKUP_DIR/$ZIP_NAME"
rm -rf "$STAGE"
echo "Backup written: $BACKUP_DIR/$ZIP_NAME ($(du -h "$BACKUP_DIR/$ZIP_NAME" | cut -f1))"
