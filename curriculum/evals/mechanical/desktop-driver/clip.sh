#!/usr/bin/env bash
# One command from take to publishable clip.
#   clip.sh <take>            record the take, redact it, leak-check it, contact sheet
#   clip.sh <take> --redact   re-redact an existing recording (after editing the allowlist or the take's # redact: line)
# <take> = file name under takes/ without .sh. Outputs in out/: <take>.mov (raw, never publish), <take>.mp4,
# <take>.sheet.png. The take declares its redaction in a comment line:  # redact: --crop ... --trim ... --blur ...
set -euo pipefail
D="$(cd "$(dirname "$0")" && pwd)"
TAKE="${1:?usage: clip.sh <take> [--redact]}" MODE="${2:-}"
T="$D/takes/$TAKE.sh" RAW="$D/out/$TAKE.mov" MP4="$D/out/$TAKE.mp4"
[[ -f "$T" ]] || { echo "no take $T" >&2; exit 1; }
for b in click scroll ocr redact; do [[ -x "$D/bin/$b" ]] || "$D/build.sh"; done
mkdir -p "$D/out"

if [[ "$MODE" != --redact ]]; then
  echo "== recording $TAKE (hands off)"
  bash "$T" record "$RAW"
  "$D/bin/click" 310 47 0                      # back to the Code tab: the operator's transcript
fi
[[ -f "$RAW" ]] || { echo "no recording $RAW" >&2; exit 1; }

echo "== redacting"
read -r -a OPTS <<< "$(sed -n 's/^# redact: //p' "$T")"
"$D/bin/redact" "$RAW" "$MP4" "$D/redact-allow.txt" "${OPTS[@]}"

echo "== leak check (OCR of the clip against this Mac's real names; nothing written to disk)"
# A name that is also a word of the app's own labels ("Auto", "Open") cannot be told apart from the UI: skip it.
uiwords="$(grep -v -E '^(#|re:|$)' "$D/redact-allow.txt" | tr ' ' '\n' | tr -d '",:?' | awk 'length($0) >= 3' | sort -u)"
deny="$( { ls ~/Documents ~/Desktop 2>/dev/null; id -un; } \
  | sed 's/\.[A-Za-z0-9]*$//' | awk 'length($0) >= 4' | grep -v -x -i -E 'agents-101|documents|desktop' \
  | grep -v -x -i -F -f <(printf '%s\n' "$uiwords") | sort -u)"
hits="$("$D/bin/redact" "$MP4" /dev/null "$D/redact-allow.txt" --report-only --fps 15 2>/dev/null \
  | grep -i -F -f <(printf '%s\n' "$deny") || true)"
ffmpeg -v error -y -i "$MP4" -vf "fps=1/2,scale=420:-1,tile=4x4" -frames:v 1 "$D/out/$TAKE.sheet.png"
if [[ -n "$hits" ]]; then
  echo "LEAK: real names still readable in $MP4 —" >&2; printf '%s\n' "$hits" | cut -f2 | sort | uniq -c >&2
  echo "fix: add a --blur region to the take's # redact: line, or raise --sigma; then clip.sh $TAKE --redact" >&2
  exit 2
fi
echo "CLEAN $MP4 ($(ffprobe -v error -show_entries format=duration -of csv=p=0 "$MP4")s)  sheet: out/$TAKE.sheet.png"
