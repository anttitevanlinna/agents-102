#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd "$(dirname "$0")/.." && pwd)"
test_root="$(mktemp -d)"
trap 'rm -rf "$test_root"' EXIT

cd "$test_root"
git init -q
git config user.email test@example.com
git config user.name "Prompt gate test"
mkdir -p .githooks .claude/prompt-approvals curriculum/prompts
cp "$repo_root/.githooks/pre-commit" .githooks/pre-commit
chmod +x .githooks/pre-commit

cat > curriculum/prompts/metadata-only.md <<'EOF'
---
key: metadata-only
runtime: any
---
Same student-facing body.
EOF

cat > curriculum/prompts/body-change.md <<'EOF'
---
key: body-change
runtime: any
---
Original student-facing body.
EOF

git add curriculum/prompts
SKIP_PROMPT_GATE=1 git commit -qm baseline

sed -i.bak 's/runtime: any/runtime: cli/' curriculum/prompts/metadata-only.md
rm curriculum/prompts/metadata-only.md.bak
sed -i.bak 's/Original student-facing body/Updated student-facing body/' curriculum/prompts/body-change.md
rm curriculum/prompts/body-change.md.bak
git add curriculum/prompts
touch .claude/prompt-approvals/body-change.confirmed

if ! .githooks/pre-commit </dev/null; then
  echo "FAIL: metadata-only prompt required a card in a mixed commit" >&2
  exit 1
fi

if [ -e .claude/prompt-approvals/body-change.confirmed ]; then
  echo "FAIL: body approval marker was not consumed" >&2
  exit 1
fi

echo "PASS: mixed prompt commit gates body changes only"
