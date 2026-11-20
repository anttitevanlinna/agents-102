#!/usr/bin/env bash
# One command from take to publishable clips.
#   clip.sh <take>            record the take, redact it, cut the clips, leak-check each, contact sheets
#   clip.sh <take> --redact   re-redact an existing recording (after editing the allowlist or the take's # redact: line)
#   clip.sh <take> --cut      re-cut from the existing redacted video (after editing # cut[...] lines; seconds, no OCR)
# <take> = file name under takes/ without .sh. Outputs in out/: <take>.mov (raw, never publish), <take>.mp4 (redacted
# whole take), <take>-<name>.mp4 per cut, <take>-chain.mp4 (all cuts in order, crossfaded), *.sheet.png. The take declares, in comment lines:
#   # redact: --crop ... --trim ... --blur x,y,w,h@from-to          (once; see bin/redact)
#   # cut[name]: 12.5-20.3 crop=640:400:160:255                       (one segment, optional crop of the redacted video)
#   # cut[name]: 0-12.4,20.3-31                                       (several segments, joined with a 0.3 s crossfade)
#   # cut[name]: 13.3-19.4 crop=670:330:1020:588 src=raw              (native-resolution crop of the raw take; only where
#                                                                      nothing private is inside the crop)
#   options: round=R (mask a dialog's rounded corners white), hold=S (freeze the last frame S s; default 0.8),
#            scale=F (shrink a tall crop, e.g. 0.6; not with round=), mask=x:y:w:h:RRGGBB (paint a crop-px box flat,
#            e.g. a sliver of a private list at the crop edge; applied before scale), mark=x:y:w:h:T (orange outline
#            on the result from T s: points at the success state), lead=S (freeze the first frame S s: time to find the target). End a click cut ON the press-ring frame: the ring
#            lasts ~1 frame, the hold then freezes it.
# Cuts come from the redacted video, so they never need their own redaction; each is still leak-checked.
set -euo pipefail
D="$(cd "$(dirname "$0")" && pwd)"
TAKE="${1:?usage: clip.sh <take> [--redact|--cut]}" MODE="${2:-}"
T="$D/takes/$TAKE.sh" RAW="$D/out/$TAKE.mov" MP4="$D/out/$TAKE.mp4"
[[ -f "$T" ]] || { echo "no take $T" >&2; exit 1; }
for b in click scroll ocr redact; do [[ -x "$D/bin/$b" ]] || "$D/build.sh"; done
mkdir -p "$D/out"

if [[ -z "$MODE" ]]; then
  echo "== recording $TAKE (hands off)"
  bash "$T" record "$RAW"
  "$D/bin/click" 310 47 0                      # back to the Code tab: the operator's transcript
fi
if [[ "$MODE" != --cut ]]; then
  [[ -f "$RAW" ]] || { echo "no recording $RAW" >&2; exit 1; }
  echo "== redacting"
  read -r -a OPTS <<< "$(sed -n 's/^# redact: //p' "$T")"
  "$D/bin/redact" "$RAW" "$MP4" "$D/redact-allow.txt" "${OPTS[@]}"
fi
[[ -f "$MP4" ]] || { echo "no redacted video $MP4" >&2; exit 1; }

# ---- cuts
cut_one() {  # name, segments, [crop], [src: redacted|raw], [round radius px], [end hold s], [lead s]
  local name="$1" segs="$2" crop="${3:-}" src="${4:-redacted}" round="${5:-}" hold="${6:-0.8}" lead="${7:-0}" out="$D/out/$TAKE-$1.mp4" vf="" n=0 f="" prev="" off=0 len
  local in="$MP4"; [[ "$src" == raw ]] && in="$RAW"   # raw = native resolution; only for crops with nothing private in them (leak check still runs)
  IFS=',' read -r -a S <<< "$segs"
  for s in "${S[@]}"; do
    f+="[0:v]trim=${s%-*}:${s#*-},setpts=PTS-STARTPTS${crop:+,$crop}[s$n];"; n=$((n+1))
  done
  if (( n == 1 )); then f+="[s0]null[v0];"; else
    prev="s0"; off=0
    for ((k=1; k<n; k++)); do
      len="$(echo "${S[$((k-1))]#*-} - ${S[$((k-1))]%-*}" | bc -l)"; off="$(echo "$off + $len - 0.3" | bc -l)"
      f+="[$prev][s$k]xfade=transition=fade:duration=0.3:offset=$off[x$k];"; prev="x$k"
    done
    f+="[$prev]null[v0];"
  fi
  if [[ -n "$round" && -n "$crop" ]]; then
    # a dialog's rounded corners show the dimmed screen behind it: mask them to white so the clip is just the panel
    local cw ch R="$round"; IFS=':' read -r cw ch _ <<< "${crop#crop=}"
    f+="[v0]format=rgba,geq=r='r(X,Y)':g='g(X,Y)':b='b(X,Y)':a='255*lte(hypot(max(0,max($R-X,X-(W-1-$R))),max(0,max($R-Y,Y-(H-1-$R)))),$R)'[rv];"
    f+="color=c=white:s=${cw}x${ch}:r=60[bg];[bg][rv]overlay=shortest=1,tpad=start_mode=clone:start_duration=$lead:stop_mode=clone:stop_duration=$hold,format=yuv420p[v]"
  else
    f+="[v0]tpad=start_mode=clone:start_duration=$lead:stop_mode=clone:stop_duration=$hold[v]"   # freeze the last frame: the hint loops, the eye needs a beat on the target
  fi
  ffmpeg -nostdin -v error -y -i "$in" -filter_complex "$f" -map "[v]" -an -c:v libx264 -pix_fmt yuv420p -crf 20 -movflags +faststart "$out"
  echo "  cut $name -> $out ($(ffprobe -v error -show_entries format=duration -of csv=p=0 "$out")s)"
}
CLIPS=("$MP4") RAWCUTS=()
while IFS= read -r line; do
  name="$(sed -E 's/^# cut\[([^]]+)\]: .*/\1/' <<< "$line")"; rest="$(sed -E 's/^# cut\[[^]]+\]: //' <<< "$line")"
  read -r segs opts <<< "$rest"; crop="" src="redacted" round="" hold="" scale="" mask="" mark="" lead=""
  for o in $opts; do case "$o" in crop=*) crop="$o";; src=*) src="${o#src=}";; round=*) round="${o#round=}";; hold=*) hold="${o#hold=}";; scale=*) scale="${o#scale=}";; mask=*) mask="${o#mask=}";; mark=*) mark="${o#mark=}";; lead=*) lead="${o#lead=}";; esac; done
  if [[ -n "$mask" && -n "$crop" ]]; then IFS=: read -r mx my mw mh mc <<< "$mask"; crop+=",format=rgb24,drawbox=x=$mx:y=$my:w=$mw:h=$mh:color=0x$mc:t=fill"; fi
  if [[ -n "$mark" && -n "$crop" ]]; then IFS=: read -r kx ky kw kh kt <<< "$mark"; crop+=",drawbox=x=$kx:y=$ky:w=$kw:h=$kh:color=0xD97757:t=5:enable='gte(t,$kt)'"; fi
  [[ -n "$scale" && -n "$crop" ]] && crop+=",scale=trunc(iw*$scale/2)*2:-2"
  cut_one "$name" "$segs" "$crop" "$src" "$round" "$hold" "$lead"; CLIPS+=("$D/out/$TAKE-$name.mp4")
  [[ "$src" == raw ]] && RAWCUTS+=("$D/out/$TAKE-$name.mp4")
done < <(grep -E '^# cut\[[^]]+\]: ' "$T" || true)

# ---- raw cuts skip redaction, so they must hold ONLY allowlisted text (stricter than the name check below):
# any text the allowlist does not cover, anyone's or not, fails the cut.
for c in "${RAWCUTS[@]+"${RAWCUTS[@]}"}"; do
  extra="$("$D/bin/redact" "$c" /dev/null "$D/redact-allow.txt" --report-only --fps 15 2>/dev/null | cut -f2 | sort -u)"
  if [[ -n "$extra" ]]; then
    echo "RAW CUT NOT CLEAN: $c shows text off the allowlist —" >&2; printf '  %s\n' "$extra" >&2
    echo "fix: tighten its crop, or cut it from the redacted video (drop src=raw)" >&2; exit 2
  fi
done

# ---- the chain: every cut in order, one video, each hint centred on a white canvas, 0.35 s crossfades
CUTS=("${CLIPS[@]:1}")
if (( ${#CUTS[@]} > 1 )); then
  CH="$D/out/$TAKE-chain.mp4" W=0 H=0 f="" off=0 prev="" i=0
  for c in "${CUTS[@]}"; do
    IFS=x read -r w h <<< "$(ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=s=x:p=0 "$c")"
    (( w > W )) && W=$w; (( h > H )) && H=$h
  done
  W=$(( (W + 80 + 1) / 2 * 2 )) H=$(( (H + 80 + 1) / 2 * 2 ))   # 40 px margin, even for x264
  ins=()
  for c in "${CUTS[@]}"; do
    ins+=(-i "$c")
    f+="[$i:v]fps=60,format=yuv420p,pad=$W:$H:(ow-iw)/2:(oh-ih)/2:white,setsar=1,settb=1/60[p$i];"; i=$((i+1))
  done
  prev="p0"
  for ((k=1; k<i; k++)); do
    len="$(ffprobe -v error -show_entries format=duration -of csv=p=0 "${CUTS[$((k-1))]}")"
    off="$(printf '%.3f' "$(echo "$off + $len - 0.35" | bc -l)")"
    f+="[$prev][p$k]xfade=transition=fade:duration=0.35:offset=$off[c$k];"; prev="c$k"
  done
  f+="[$prev]null[v]"
  ffmpeg -nostdin -v error -y "${ins[@]}" -filter_complex "$f" -map "[v]" -an -c:v libx264 -pix_fmt yuv420p -crf 20 -movflags +faststart "$CH"
  echo "  chain -> $CH (${W}x${H}, $(ffprobe -v error -show_entries format=duration -of csv=p=0 "$CH")s)"
  CLIPS+=("$CH")
fi

# ---- leak check, every output
echo "== leak check (OCR of each clip against this Mac's real names; nothing written to disk)"
# A name that is also a word of the app's own labels ("Auto", "Open") cannot be told apart from the UI: skip it.
uiwords="$(grep -v -E '^(#|re:|$)' "$D/redact-allow.txt" | tr ' ' '\n' | tr -d '",:?' | awk 'length($0) >= 3' | sort -u)"
deny="$( { ls ~/Documents ~/Desktop 2>/dev/null; id -un; } \
  | sed 's/\.[A-Za-z0-9]*$//' | awk 'length($0) >= 4' | grep -v -x -i -E 'agents-101|documents|desktop' \
  | grep -v -x -i -F -f <(printf '%s\n' "$uiwords") | sort -u)"
bad=0
for c in "${CLIPS[@]}"; do
  hits="$("$D/bin/redact" "$c" /dev/null "$D/redact-allow.txt" --report-only --fps 15 2>/dev/null \
    | grep -i -F -f <(printf '%s\n' "$deny") || true)"
  ffmpeg -nostdin -v error -y -i "$c" -vf "fps=1/2,scale=420:-1,tile=4x4" -frames:v 1 "${c%.mp4}.sheet.png"
  if [[ -n "$hits" ]]; then
    echo "LEAK in $c —" >&2; printf '%s\n' "$hits" | cut -f2 | sort | uniq -c >&2; bad=1
  else
    echo "CLEAN $c ($(ffprobe -v error -show_entries format=duration -of csv=p=0 "$c")s)"
  fi
done
(( bad == 0 )) || { echo "fix: add a --blur region to the take's # redact: line, or raise --sigma; then clip.sh $TAKE --redact" >&2; exit 2; }
