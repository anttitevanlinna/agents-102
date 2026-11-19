#!/usr/bin/env bash
# Verified GUI steps for the Claude desktop window. Every click targets text found on screen;
# every step that cannot find what it expects aborts. Source from bash (not zsh).
DRIVER="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BIN="$DRIVER/bin" OUT="$DRIVER/out"
WIN_X=57 WIN_Y=25 WIN_W=1355 WIN_H=751
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
