#!/usr/bin/env bash
# Claude Code's folder-trust dialog preselects "No, exit". A first turn typed
# into it closes the CLI, the pane dies, and the run fails at turn 1 with an
# empty transcript. pane_accept_folder_trust answers yes when the dialog is on
# screen and is a plain warmup when it is not.
#
# Run: bash tests/folder-trust.test.sh   (exits nonzero on any failure)
set -uo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TMP="$(mktemp -d)"
export RUNNER_TMUX_SOCKET="trusttest-$$"
source "$HERE/../lib/tmux.sh"
set +e
trap '_tmux kill-server 2>/dev/null; rm -rf "$TMP"' EXIT

pass=0 fail=0
ok()  { pass=$((pass+1)); echo "  ok   - $1"; }
bad() { fail=$((fail+1)); echo "  FAIL - $1" >&2; }

# A stand-in TUI: shows the dialog with "No, exit" selected. Enter alone exits;
# Down then Enter trusts the folder and stays up.
cat > "$TMP/dialog" <<'TUI'
#!/usr/bin/env bash
printf ' Quick safety check\n ❯ No, exit\n   Yes, I trust this folder\n Enter to confirm\n'
sel=no
while IFS= read -rsn1 k; do
  if [[ "$k" == $'\e' ]]; then read -rsn2 -t 1 rest; [[ "$rest" == "[B" || "$rest" == "OB" ]] && sel=yes; continue; fi
  if [[ -z "$k" ]]; then
    [[ "$sel" == yes ]] || exit 1
    clear; echo "TRUSTED prompt ready"; sleep 300
  fi
done
TUI
chmod +x "$TMP/dialog"

echo "[test] the dialog gets a yes and the pane stays up"
pane_start trust "$TMP" "$TMP/dialog"
pane_accept_folder_trust trust 3
pane_alive trust && ok "pane alive after the dialog" || bad "pane died: the dialog took No, exit"
_tmux capture-pane -t trust -p 2>/dev/null | grep -q 'TRUSTED prompt ready' && ok "folder trusted" || bad "no yes on the dialog"
pane_kill trust

echo "[test] no dialog: nothing is typed"
pane_start plain "$TMP" "bash -c 'read -rsn1 k; echo GOT-KEY; sleep 300'"
pane_accept_folder_trust plain 2
pane_alive plain && ! _tmux capture-pane -t plain -p 2>/dev/null | grep -q 'GOT-KEY' \
  && ok "no key sent" || bad "a key was sent with no dialog on screen"
pane_kill plain

echo
echo "[test] $pass passed, $fail failed"
[[ $fail -eq 0 ]]
