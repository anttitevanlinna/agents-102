#!/usr/bin/env bash
# Offline tests for steps.sh: no screen, no recording, runs in under a second. Fixtures are synthetic OCR lines
# (x<TAB>y<TAB>text, screen points) with the quirks this driver met for real.
set -uo pipefail
D="$(cd "$(dirname "$0")" && pwd)"
source "$D/steps.sh" 2>/dev/null
fail=0
is() { if [[ "$2" == "$3" ]]; then echo "ok   $1"; else echo "FAIL $1: got '$2', want '$3'"; fail=1; fi; }
FIX=$'368\t755\t+\n623\t488\tProject or folder v\n380\t540\tD Documents\n421\t590\tC7 Add folder\n809\t193\tAdd a folder to this session\n748\t756\tOpus 5.5 Medium'
m() { _match "$@" <<< "$FIX"; }
is "a bare + is a button, not an icon glyph to strip"   "$(m "+" exact)"                     "368 755"
is "chevron read as a trailing v: contains matches"     "$(m "Project or folder" contains)"   "623 488"
is "sidebar icon read as a leading letter: contains"    "$(m "Documents" contains)"           "380 540"
is "menu icon read as glyphs: contains"                 "$(m "Add folder" contains)"          "421 590"
is "picker title, started chat (singular)"              "$(m "to this session" contains)"     "809 193"
is "bounds exclude a match outside them"                "$(m "Documents" contains 0 300)"     ""
is "bounds include a match inside them"                 "$(m "Opus 5.5" contains 300 1412 680 790)" "748 756"
is "exact does not match a longer label"                "$(m "Add" exact)"                    ""
# _region: a step's bounds clamped to the standard window (57,25 1355x751), 8 pt margin for OCR edge text
is "region inside the window, with margin"  "$(_region 300 900 680 790)"   "292,672,616,104"
is "open bounds = the whole window"         "$(_region 0 99999 0 99999)"   "57,25,1355,751"
is "bounds past the right edge are clamped" "$(_region 300 1412 300 760)"  "292,292,1120,476"

# _snapf ALLOWFILE: OCR lines on stdin -> allowlisted labels with positions; any other text only counted
AF="$(mktemp)"; printf 'New project\nre:^add folders?\n' > "$AF"
SNAP="$(printf '10\t20\tNew project\n30\t40\tPrivate Client Deal\n50\t60\tAdd folder\n70\t80\t+ New project v\n' | _snapf "$AF")"; rm -f "$AF"
is "snap shows an allowed label with its position"  "$(grep -c '10   20  New project' <<< "$SNAP")"  "1"
is "snap shows a regex-allowed label"                "$(grep -c 'Add folder' <<< "$SNAP")"           "1"
is "snap strips icon glyph and chevron to match"     "$(grep -c '+ New project v' <<< "$SNAP")"      "1"
is "snap never prints other text"                    "$(grep -c 'Private' <<< "$SNAP")"              "0"
is "snap counts the other text"                      "$(tail -1 <<< "$SNAP")"                        "  -- 1 line(s) of other text not shown"

# run_step: while recording, each step logs "name<TAB>start<TAB>end" (s since rec_start) for the cut lines
step_demo() { sleep 0.3; }
STEPLOG="$(mktemp)"; REC_T0="$(python3 -c 'import time;print(time.time()-1.0)')"; run_step demo >/dev/null
IFS=$'\t' read -r sn st en < "$STEPLOG"; rm -f "$STEPLOG"; unset REC_T0 STEPLOG
is "step log names the step"                 "$sn" "demo"
is "step log start is about 1 s into the take" "$(python3 -c "print(0.9 <= $st <= 1.3)")" "True"
is "step log end is after start"             "$(python3 -c "print($en - $st >= 0.25)")" "True"

# _largest POSITIONS SIZES (AppleScript lists for every window, as it prints them) -> the main window as x,y,w,h
is "a small popup listed first does not win"  "$(_largest "75, 38, 57, 25" "52, 20, 1355, 751")"  "57,25,1355,751"
is "a single window"                          "$(_largest "57, 25" "1355, 751")"                  "57,25,1355,751"

(( fail == 0 )) && echo "ALL OK" || { echo "FAILED"; exit 1; }
