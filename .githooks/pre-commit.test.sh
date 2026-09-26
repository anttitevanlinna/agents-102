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

echo "pre-commit.test.sh: $pass passed, $fail failed"
[ "$fail" -eq 0 ]
