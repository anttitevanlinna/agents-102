#!/usr/bin/env bash
# Verified GUI steps for the Claude desktop window. Every click targets text found on screen;
# every step that cannot find what it expects aborts. Source from bash (not zsh).
DRIVER="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BIN="$DRIVER/bin" OUT="$DRIVER/out"
WIN_X=57 WIN_Y=25 WIN_W=1355 WIN_H=751                # every crop in every take is px of THIS window: start_state enforces it
APP="Claude" CHAT_TAB="276 46" CODE_TAB="310 47"        # tab icons have no text to OCR: screen points
[[ -x "$BIN/ocr" && -x "$BIN/click" && -x "$BIN/scroll" ]] || { echo "run $DRIVER/build.sh first" >&2; exit 1; }
mkdir -p "$OUT"

_ocr() { screencapture -x -R"$WIN_X,$WIN_Y,$WIN_W,$WIN_H" "$OUT/_ocr.png" && "$BIN/ocr" "$OUT/_ocr.png" "$WIN_X" "$WIN_Y" "$WIN_W"; }

# find_text TEXT [exact|contains] [xmin xmax ymin ymax] -> "x y" of the first match, screen points
find_text() {
  local text="$1" mode="${2:-exact}" x0="${3:-0}" x1="${4:-99999}" y0="${5:-0}" y1="${6:-99999}"
  _ocr | awk -F'\t' -v t="$text" -v m="$mode" -v x0="$x0" -v x1="$x1" -v y0="$y0" -v y1="$y1" '
    { s=$3; gsub(/^[^A-Za-z0-9~]+/, "", s) }   # sidebar icons OCR as a stray leading glyph
    $1>=x0 && $1<=x1 && $2>=y0 && $2<=y1 && ((m=="exact" && s==t) || (m=="contains" && index($3,t)>0)) { print $1, $2; exit }'
}

# die: Esc closes whatever dialog the take opened; only call after a dialog/menu may be up
die() { echo "ABORT: $*" >&2; exit 1; }

# expect_text TEXT [mode] [timeout] [bounds...]
expect_text() {
  local text="$1" mode="${2:-contains}" t="${3:-6}"; shift 3 2>/dev/null || shift $#
  local end=$((SECONDS + t)) p
  while (( SECONDS <= end )); do p="$(find_text "$text" "$mode" "$@")"; [[ -n "$p" ]] && { echo "  saw: $text"; return 0; }; sleep 0.4; done
  die "never saw '$text'"
}

# settle TEXT [mode] [bounds...]: same spot twice, 0.5 s apart (scrolls glide after the event)
settle() {
  local text="$1" mode="${2:-exact}"; shift 2 2>/dev/null || shift $#
  local a b end=$((SECONDS + 6))
  while (( SECONDS <= end )); do
    a="$(find_text "$text" "$mode" "$@")"; sleep 0.5; b="$(find_text "$text" "$mode" "$@")"
    [[ -n "$a" && "$a" == "$b" ]] && { echo "  settled: $text @ $a"; return 0; }
  done
  die "'$text' never settled"
}

# click_text TEXT [mode] [glideMs] [bounds...]
click_text() {
  local text="$1" mode="${2:-exact}" glide="${3:-600}"; shift 3 2>/dev/null || shift $#
  local p; p="$(find_text "$text" "$mode" "$@")"; [[ -n "$p" ]] || die "no '$text' to click"
  "$BIN/click" $p "$glide"; echo "  clicked: $text @ $p"
}

press_esc() { osascript -e 'tell application "System Events" to key code 53'; sleep 0.8; }
type_slow() { local s="$1" i; for ((i=0;i<${#s};i++)); do osascript -e "tell application \"System Events\" to keystroke \"${s:$i:1}\""; sleep 0.09; done; }

# ---- take scaffolding

# start_state NAME: put the app in a named, verified state (states/NAME.sh) at the standard window geometry.
# A take starts from exactly one; a later take may instead start from an earlier take's end state (say so in its header).
start_state() {
  local f="$DRIVER/states/$1.sh"; [[ -f "$f" ]] || die "no start state $1 (states/$1.sh)"
  osascript -e "tell application \"$APP\" to activate" -e "tell application \"System Events\" to tell process \"$APP\" to set {position, size} of window 1 to {{$WIN_X, $WIN_Y}, {$WIN_W, $WIN_H}}" >/dev/null
  sleep 0.5
  local g; g="$(osascript -e "tell application \"System Events\" to get {position, size} of window 1 of process \"$APP\"" | tr -d ' ')"
  [[ "$g" == "$WIN_X,$WIN_Y,$WIN_W,$WIN_H" ]] || die "window is $g, not $WIN_X,$WIN_Y,$WIN_W,$WIN_H: crops would not match"
  bash "$f"
}

# rec_start OUT.mov SECONDS / rec_stop: record the standard window for a fixed length (clicks drawn as press rings),
# hands off in between; rec_stop waits for the recording to end. Trim the tail with the take's --trim.
rec_start() { rm -f "$1"; screencapture -v -k -x -V "${2:-40}" -R"$WIN_X,$WIN_Y,$WIN_W,$WIN_H" "$1" & REC_PID=$!; sleep 2.5; }
rec_stop()  { [[ -n "${REC_PID:-}" ]] || return 0; wait "$REC_PID" 2>/dev/null || true; REC_PID=""; }

# back_to_operator: the Code tab holds the operator's own transcript; every take ends there.
back_to_operator() { "$BIN/click" $CODE_TAB 0; }

# ---- scene verbs (any Cowork scene: a prompt, a reply, a file, a picker)

# key KEYCODE [modifiers...]: one key press (36 Return, 53 Esc, 9 V, 5 G); modifiers: command, shift, option
key() { local k="$1"; shift; local m=""; (( $# )) && m=" using {$(printf '%s down, ' "$@" | sed 's/, $//')}"
  osascript -e "tell application \"System Events\" to key code $k$m"; }

# send_prompt TEXT [field-text]: click the message box, PASTE the text (what a student does), check it landed, Return.
# The operator's clipboard is restored afterwards. field-text = placeholder to click (default: either new-chat or reply box).
send_prompt() {
  local text="$1" field="${2:-}" saved; saved="$(pbpaste 2>/dev/null || true)"
  if [[ -n "$field" ]]; then click_text "$field" contains 500
  elif [[ -n "$(find_text "How can I help" contains)" ]]; then click_text "How can I help" contains 500
  else click_text "Reply" contains 500; fi
  printf '%s' "$text" | pbcopy; key 9 command; sleep 0.6
  expect_text "${text:0:24}" contains 4
  printf '%s' "$saved" | pbcopy
  sleep "${PROMPT_READ:-1.2}"; key 36; echo "  sent: ${text:0:50}"
}

# wait_settled [timeout] [bounds...]: wait until the window's text stops changing (Claude finished writing):
# the same OCR text three checks in a row, 1 s apart. Aborts after timeout (default 180 s).
wait_settled() {
  local t="${1:-180}"; shift 2>/dev/null || true
  local end=$((SECONDS + t)) prev="" same=0 cur
  while (( SECONDS <= end )); do
    cur="$(_ocr | awk -F'\t' -v x0="${1:-0}" -v x1="${2:-99999}" -v y0="${3:-0}" -v y1="${4:-99999}" '$1>=x0&&$1<=x1&&$2>=y0&&$2<=y1{print $3}' | md5)"
    if [[ "$cur" == "$prev" ]]; then same=$((same+1)); (( same >= 2 )) && { echo "  settled"; return 0; }; else same=0; fi
    prev="$cur"; sleep 1
  done
  die "screen never settled in ${t}s"
}

# picker_go PATH: in any macOS open/save panel, jump straight to PATH (Cmd-Shift-G), so no folder list is browsed.
picker_go() { local saved; saved="$(pbpaste 2>/dev/null || true)"
  key 5 command shift; sleep 0.8; printf '%s' "$1" | pbcopy; key 9 command; sleep 0.4; key 36; sleep 1
  printf '%s' "$saved" | pbcopy; }

# allow_if_asked: Cowork asks once per folder and chat; click Allow only when the card is really there.
allow_if_asked() {
  local p; p="$(find_text "Allow Claude to change files" contains)"
  [[ -n "$p" ]] || { sleep 1.5; p="$(find_text "Allow Claude to change files" contains)"; }
  [[ -n "$p" ]] && { click_text "Allow" exact 500; echo "  allowed"; } || true
}

# say_in_box TEXT / clear_box: a caption in the app's own message box. Typed at reading pace, NEVER sent; the pointer
# then moves to what it talks about. Keep TEXT one line in the box (a wrapped second line is not a prefix of the
# allowed text, so it blurs) and declare it in the take: `# allow: TEXT` (typing = its prefixes, allowed already).
# clear_box before the take ends, so no caption is left in a real chat.
say_in_box() {
  if [[ -n "$(find_text "How can I help" contains)" ]]; then click_text "How can I help" contains 500
  else click_text "Reply" contains 500; fi
  local s="$1" i; for ((i=0;i<${#s};i++)); do osascript -e "tell application \"System Events\" to keystroke \"${s:$i:1}\""; sleep "${SAY_PACE:-0.05}"; done
  expect_text "${s:0:24}" contains 4; sleep "${SAY_HOLD:-1.5}"
}
clear_box() { key 0 command; sleep 0.2; key 51; sleep 0.4; }   # Cmd-A, Delete
