#!/usr/bin/env bash
# Verified GUI steps for the Claude desktop window. Every click targets text found on screen;
# every step that cannot find what it expects aborts. Source from bash (not zsh).
DRIVER="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BIN="$DRIVER/bin" OUT="$DRIVER/out"
WIN_X=57 WIN_Y=25 WIN_W=1355 WIN_H=751                # every crop in every take is px of THIS window: start_state enforces it
APP="Claude" CHAT_TAB="276 46" CODE_TAB="310 47"        # tab icons have no text to OCR: screen points
PLUS_X=368                                              # + under a started conversation's box (OCR drops it once the box has text)
[[ -x "$BIN/ocr" && -x "$BIN/click" && -x "$BIN/scroll" ]] || { echo "run $DRIVER/build.sh first" >&2; exit 1; }
mkdir -p "$OUT"

# front_guard: the capture rectangle shows whatever window is on top. Another app in front (Codex re-raises itself while
# it works) = wrong screen for OCR, and in a recording a private window in the raw take. Re-activate; while recording, abort.
front_guard() {
  local f; f="$(osascript -e 'tell application "System Events" to get name of first process whose frontmost is true' 2>/dev/null)"
  [[ "$f" == "$APP" ]] && return 0
  [[ -n "${REC_PID:-}" ]] && { kill "$REC_PID" ${NC_PID:-} 2>/dev/null; rm -f "${REC_OUT:-}"; die "'$f' came in front during recording: take discarded (move or quit it, then re-run)"; }
  osascript -e "tell application \"$APP\" to activate" >/dev/null; sleep 0.6; echo "  (re-activated $APP over '$f')" >&2
}
_ocr() {   # [x,y,w,h] (default: the whole window) -> OCR lines in screen points
  local r="${1:-$WIN_X,$WIN_Y,$WIN_W,$WIN_H}" x y w
  IFS=, read -r x y w _ <<< "$r"
  front_guard; screencapture -x -R"$r" "$OUT/_ocr.png" && "$BIN/ocr" "$OUT/_ocr.png" "$x" "$y" "$w"
}

# find_text TEXT [exact|contains] [xmin xmax ymin ymax] -> "x y" of the first match, screen points
# _match TEXT [mode] [bounds...]: OCR lines on stdin -> "x y" of the first match. Pure (no screen): test-steps.sh covers it.
_match() {
  local text="$1" mode="${2:-exact}" x0="${3:-0}" x1="${4:-99999}" y0="${5:-0}" y1="${6:-99999}"
  awk -F'\t' -v t="$text" -v m="$mode" -v x0="$x0" -v x1="$x1" -v y0="$y0" -v y1="$y1" '
    { s=$3; if (s != "+") gsub(/^[^A-Za-z0-9~]+/, "", s) }   # icons OCR as a stray leading glyph; a bare + is a button
    $1>=x0 && $1<=x1 && $2>=y0 && $2<=y1 && ((m=="exact" && s==t) || (m=="contains" && index($3,t)>0)) { print $1, $2; exit }'
}
# _region x0 x1 y0 y1 -> "x,y,w,h": a step's bounds clamped to the standard window, 8 pt margin (OCR misses edge text).
_region() {
  local m=8 L=$WIN_X T=$WIN_Y R=$((WIN_X + WIN_W)) B=$((WIN_Y + WIN_H)) x0 x1 y0 y1
  x0=$(( $1 - m )); x1=$(( $2 + m )); y0=$(( $3 - m )); y1=$(( $4 + m ))
  (( x0 < L )) && x0=$L; (( x1 > R )) && x1=$R; (( y0 < T )) && y0=$T; (( y1 > B )) && y1=$B
  echo "$x0,$y0,$((x1 - x0)),$((y1 - y0))"
}
# find_text TEXT [mode] [xmin xmax ymin ymax]: reads only the step's region (about 2.5x faster than the whole window).
find_text() {
  local r; r="$(_region "${3:-0}" "${4:-99999}" "${5:-0}" "${6:-99999}")"
  _ocr "$r" | _match "$@"
}

# die: Esc closes whatever dialog the take opened; only call after a dialog/menu may be up
# on_abort CMD: a step registers how to undo what it opened (Esc a dialog, clear a typed caption). undo runs them newest
# first, best-effort; die calls it, so dry/record never leave debris. In `take.sh step NAME` the list starts empty:
# a failed single step leaves the screen as it is, for inspection.
ON_ABORT=()
on_abort() { ON_ABORT+=("$1"); }
undo() { local i; for ((i=${#ON_ABORT[@]}-1; i>=0; i--)); do ( eval "${ON_ABORT[$i]}" ) >/dev/null 2>&1 || true; done; ON_ABORT=(); }
die() { echo "ABORT: $*" >&2; undo; exit 1; }

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
  osascript -e "tell application \"$APP\" to activate" >/dev/null || die "cannot activate $APP"
  sleep 0.8   # macOS refuses scripted resizing of this window (-10003): verify only; the operator sizes it once
  local g; g="$(_largest "$(osascript -e "tell application \"System Events\" to get position of every window of process \"$APP\"")" \
                         "$(osascript -e "tell application \"System Events\" to get size of every window of process \"$APP\"")")"
  [[ "$g" == "$WIN_X,$WIN_Y,$WIN_W,$WIN_H" ]] || die "window is $g, not $WIN_X,$WIN_Y,$WIN_W,$WIN_H: crops would not match"
  bash "$f"
}

# rec_start OUT.mov SECONDS / rec_stop: record the standard window for a fixed length (clicks drawn as press rings),
# hands off in between; rec_stop waits for the recording to end. Trim the tail with the take's --trim.
rec_start() { REC_OUT="$1"; rm -f "$1"; STEPLOG="${1%.mov}.steps.tsv"; : > "$STEPLOG"
  export CLICK_LOG="${1%.mov}.clicks.tsv"; : > "$CLICK_LOG"     # bin/click + bin/scroll log every move and press here
  # the system cursor is hidden for the take: the recorder draws it late, doubling the pointer clip.sh draws from CLICK_LOG
  "$BIN/nocursor" $(( ${2:-40} + 5 )) & NC_PID=$!; on_abort "kill $NC_PID"
  screencapture -v -x -V "${2:-40}" -R"$WIN_X,$WIN_Y,$WIN_W,$WIN_H" "$1" & REC_PID=$!
  REC_T0="$(_now)"; echo "$REC_T0 $WIN_X $WIN_Y" > "${1%.mov}.t0"; sleep 2.5; }
_now() { python3 -c 'import time; print(f"{time.time():.3f}")'; }
rec_stop()  { [[ -n "${REC_PID:-}" ]] || return 0; wait "$REC_PID" 2>/dev/null || true; REC_PID=""
  [[ -n "${NC_PID:-}" ]] && { kill "$NC_PID" 2>/dev/null || true; NC_PID=""; }; }   # the cursor returns when nocursor exits

# park X Y: glide the pointer there without clicking (off text being typed; logged, so the drawn pointer follows)
park() { "$BIN/click" "$1" "$2" 350 move; }

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
    cur="$(_ocr "$(_region "${1:-0}" "${2:-99999}" "${3:-0}" "${4:-99999}")" | awk -F'\t' -v x0="${1:-0}" -v x1="${2:-99999}" -v y0="${3:-0}" -v y1="${4:-99999}" '$1>=x0&&$1<=x1&&$2>=y0&&$2<=y1{print $3}' | md5)"
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

# click_plus: the + under the message box of a started conversation. Icon: x fixed in the standard window, y = the row
# OCR does read ("Opus 5.5 …" model picker beside it).
click_plus() {
  local p; p="$(find_text "Opus 5.5" contains 300 1412 680 790)"; [[ -n "$p" ]] || die "no model row under the box"
  "$BIN/click" "$PLUS_X" "${p#* }" "${1:-700}"; echo "  clicked: + @ $PLUS_X ${p#* }"
}

# _snapf ALLOWFILE: OCR lines on stdin -> allowlisted text with positions; everything else only counted. Pure.
# snap [x0 x1 y0 y1]: the screen (or a region), safe to print into a transcript. Use it to map a new screen.
_snapf() {
  awk -F'\t' -v af="$1" '
    BEGIN { while ((getline l < af) > 0) { if (l ~ /^#/ || l == "") continue
              if (l ~ /^re:/) re[++n] = tolower(substr(l, 4)); else ok[tolower(l)] = 1 } }
    { t = $3; if (t != "+") gsub(/^[^A-Za-z0-9~"]+/, "", t); t = tolower(t); sub(/ v$/, "", t)
      hit = (t in ok); for (i = 1; i <= n && !hit; i++) if (t ~ re[i]) hit = 1
      if (hit) printf "  %4d %4d  %s\n", $1, $2, $3; else priv++ }
    END { printf "  -- %d line(s) of other text not shown\n", priv }'
}
snap() { _ocr "$(_region "${1:-0}" "${2:-99999}" "${3:-0}" "${4:-99999}")" | _snapf "${SNAP_ALLOW:-$DRIVER/redact-allow.txt}"; }

# run_step NAME: run step_NAME; while recording, log "name<TAB>start<TAB>end" (s since rec_start) to STEPLOG, so cut
# lines come from the log, not from scanning the video. Recording starts ~0.3 s after REC_T0 (screencapture spin-up).
run_step() {
  echo "== $1"; local a; a="$(_now)"
  "step_$1"
  [[ -n "${REC_T0:-}" && -n "${STEPLOG:-}" ]] && python3 -c "print(f'$1\t{$a-$REC_T0:.2f}\t{$(_now)-$REC_T0:.2f}')" >> "$STEPLOG"
  return 0
}

# _largest "x, y, w, h, ...": the app's main window among all its windows (a popup can be window 1). Pure.
_largest() {
  paste -d, <(tr -d ' ' <<< "$1" | tr ',' '\n' | paste -d, - -) <(tr -d ' ' <<< "$2" | tr ',' '\n' | paste -d, - -) \
    | awk -F, '$3*$4 > a { a = $3*$4; m = $0 } END { print m }'
}
