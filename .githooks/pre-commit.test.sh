#!/usr/bin/env bash
# Tests for .githooks/pre-commit, the prompt-registry gate. Run with no tty, so
# any commit that needs the human's y/N fails and one that does not succeeds.
set -u
HOOK="$(cd "$(dirname "$0")" && pwd)/pre-commit"
pass=0; fail=0
ok()  { pass=$((pass+1)); echo "  ok   $1"; }
bad() { fail=$((fail+1)); echo "  FAIL $1"; }

repo() {
  local r; r=$(mktemp -d)
  git -C "$r" init -q; git -C "$r" config user.email t@t; git -C "$r" config user.name t
  mkdir -p "$r/.githooks" "$r/curriculum/prompts"
  cp "$HOOK" "$r/.githooks/pre-commit"; git -C "$r" config core.hooksPath .githooks
  printf -- '---\nkey: a\n---\nPaste this.\n' > "$r/curriculum/prompts/a.md"
  git -C "$r" add -A; SKIP_PROMPT_GATE=1 git -C "$r" commit -qm init
  echo "$r"
}
commit() { git -C "$1" commit -qm t </dev/null >/dev/null 2>&1; }

r=$(repo); mkdir -p "$r/curriculum/prompts/archive"
git -C "$r" mv curriculum/prompts/a.md curriculum/prompts/archive/a.md
if commit "$r"; then ok 'a word-for-word move into archive/ needs no y/N'; else bad 'archive move was gated'; fi

r=$(repo); mkdir -p "$r/curriculum/prompts/archive"
git -C "$r" mv curriculum/prompts/a.md curriculum/prompts/archive/a.md
printf -- '---\nkey: a\n---\nPaste this, edited.\n' > "$r/curriculum/prompts/archive/a.md"; git -C "$r" add -A
if commit "$r"; then bad 'a move that also edits the body slipped through'; else ok 'a move that edits the body is still gated'; fi

r=$(repo); git -C "$r" rm -q curriculum/prompts/a.md
if commit "$r"; then bad 'a plain delete slipped through'; else ok 'a delete is still gated'; fi

r=$(repo); printf -- '---\nkey: a\n---\nPaste that.\n' > "$r/curriculum/prompts/a.md"; git -C "$r" add -A
if commit "$r"; then bad 'a body edit slipped through'; else ok 'a body edit is still gated'; fi

# Simulation trainings (maintainer 2026-09-30): a prompt whose origin training has
# `simulation: true` commits without a y/N; the maintainer reads it at promotion.
simrepo() {
  local r; r=$(repo)
  mkdir -p "$r/site/layouts" "$r/scripts"
  cp "$(dirname "$HOOK")/../scripts/prompt-sim-exempt.js" "$r/scripts/"
  echo "module.exports = { TRAININGS: { sim: { simulation: true }, live: {} } }" > "$r/site/layouts/curriculum.js"
  git -C "$r" add -A; SKIP_PROMPT_GATE=1 git -C "$r" commit -qm registry
  echo "$r"
}
r=$(simrepo); printf -- '---\nkey: s\norigin: sim/m1\n---\nPaste this.\n' > "$r/curriculum/prompts/s.md"; git -C "$r" add -A
if commit "$r"; then ok 'a new simulation prompt needs no y/N'; else bad 'a simulation prompt was gated'; fi

r=$(simrepo); printf -- '---\nkey: s\norigin: live/m1\n---\nPaste this.\n' > "$r/curriculum/prompts/s.md"; git -C "$r" add -A
if commit "$r"; then bad 'a new taught prompt slipped through'; else ok 'a new taught prompt is still gated'; fi

r=$(simrepo); printf -- '---\nkey: s\norigin: sim/m1\n---\nPaste this.\n' > "$r/curriculum/prompts/s.md"
printf -- '---\nkey: a\n---\nPaste that.\n' > "$r/curriculum/prompts/a.md"; git -C "$r" add -A
if commit "$r"; then bad 'a taught edit rode in beside a simulation prompt'; else ok 'a mixed commit is still gated'; fi

# Metadata-only changes stay outside the card gate even when a card-approved
# body change shares the commit.
r=$(repo); mkdir -p "$r/.claude/prompt-approvals"
printf -- '---\nkey: b\nruntime: any\n---\nOriginal body.\n' > "$r/curriculum/prompts/b.md"
git -C "$r" add -A; SKIP_PROMPT_GATE=1 git -C "$r" commit -qm second-prompt
sed -i.bak 's/key: a/key: a\nruntime: cli/' "$r/curriculum/prompts/a.md"; rm "$r/curriculum/prompts/a.md.bak"
sed -i.bak 's/Original body/Updated body/' "$r/curriculum/prompts/b.md"; rm "$r/curriculum/prompts/b.md.bak"
git -C "$r" add curriculum/prompts
touch "$r/.claude/prompt-approvals/b.confirmed"
if (cd "$r" && .githooks/pre-commit </dev/null >/dev/null 2>&1); then
  ok 'a metadata-only edit needs no card in a mixed prompt commit'
else
  bad 'a metadata-only edit was card-gated in a mixed prompt commit'
fi
if [[ ! -e "$r/.claude/prompt-approvals/b.confirmed" ]]; then ok 'the body approval marker was consumed'; else bad 'the body approval marker was not consumed'; fi

# A commit that stages a registry source must carry the rebuilt JSON
# (scripts/check-generated-registries.js --staged).
genrepo() {
  local r; r=$(simrepo)
  cp "$(dirname "$HOOK")/../scripts/"{compile-prompts.js,compile-figures.js,write-if-changed.js,check-generated-registries.js} "$r/scripts/"
  ln -s "$(cd "$(dirname "$HOOK")/.." && pwd)/node_modules" "$r/node_modules"; echo node_modules > "$r/.gitignore"
  (cd "$r" && node -e "const c=require('./scripts/compile-prompts.js');c.writeRegistry(c.loadRegistry())" && node -e "const f=require('./scripts/compile-figures.js');f.writeFigures(f.loadFigures())")
  git -C "$r" add -A; SKIP_PROMPT_GATE=1 git -C "$r" commit -qm json
  echo "$r"
}
r=$(genrepo); printf -- '---\nkey: s\norigin: sim/m1\nnote: x\n---\nPaste this.\n' > "$r/curriculum/prompts/s.md"; git -C "$r" add curriculum/prompts/s.md
if commit "$r"; then bad 'a prompt commit without its rebuilt prompts.json slipped through'; else ok 'a prompt commit without its rebuilt prompts.json is refused'; fi
(cd "$r" && node -e "const c=require('./scripts/compile-prompts.js');c.writeRegistry(c.loadRegistry())"); git -C "$r" add site/prompts.json
if commit "$r"; then ok 'the same commit with the rebuilt prompts.json goes through'; else bad 'a consistent prompt commit was refused'; fi

echo "pre-commit.test.sh: $pass passed, $fail failed"
[ "$fail" -eq 0 ]
