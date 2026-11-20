#!/usr/bin/env bash
# Student-reviewer round for a take's chain: frames at 2 fps (timestamp burned in) + a reviewer brief.
#   review.sh <take>   -> prints the brief's path; hand it to a FRESH subagent ("Read <brief> and do what it says"),
#                         fix what it lists, clip.sh <take> --cut, run again. Done = the reviewer writes `great and clear`.
# The take declares what the student reads beside the video and what the reviewer must not ask for:
#   # review-text: <one line of the workbook text>        (repeat; in reading order)
#   # review-fixed: <a constraint, not a defect>          (repeat; e.g. private names never shown, a fix tried and cut)
# Each round gets its own folder and a fresh reviewer: never resume an earlier one (it anchors on its own notes).
set -euo pipefail
D="$(cd "$(dirname "$0")" && pwd)"
TAKE="${1:?usage: review.sh <take>}" T="$D/takes/$1.sh" CH="$D/out/$1-chain.mp4"
[[ -f "$T" && -f "$CH" ]] || { echo "need takes/$TAKE.sh and out/$TAKE-chain.mp4 (clip.sh $TAKE --cut)" >&2; exit 1; }
n=1; while [[ -e "$D/out/review/$TAKE-$n" ]]; do n=$((n+1)); done
R="$D/out/review/$TAKE-$n"; mkdir -p "$R"
ffmpeg -nostdin -v error -i "$CH" -vf "fps=2,drawtext=text='t=%{pts\:hms}':x=10:y=10:fontsize=24:fontcolor=red" "$R/f_%03d.png"
frames="$(ls "$R" | grep -c '^f_')" dur="$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$CH" | cut -d. -f1)"
text="$(sed -n 's/^# review-text: //p' "$T")"; fixed="$(sed -n 's/^# review-fixed: /- /p' "$T")"
[[ -n "$text" ]] || { echo "takes/$TAKE.sh has no # review-text: lines: the reviewer must see what the student reads" >&2; exit 1; }
cat > "$R/brief.md" <<EOF
You are reviewing a short silent how-to video for a non-technical professional working through an AI training on their own, with no trainer. Judge whether a first-time student would understand it and be able to follow it.

The video: $CH (about $dur s, short clips with crossfades, each cropped to one part of the screen, centred on a white canvas). Frames at 2 fps, timestamp burned in red top-left (the red text is NOT part of the video): $R/f_001.png … f_$(printf '%03d' "$frames").png. Read them all, in order. For finer timing, extract more frames from that .mp4 only (ffmpeg -nostdin) into $R. Open nothing else under $D/out: the other files there show private screen content.

Fixed constraints, not defects:
- The operator's private names (folders, chats, files) are never shown; crops show only the app's own labels.
- The video is silent, no captions: the workbook text beside it carries the words.
${fixed}

The workbook text beside it (the student reads it, then watches):

$(sed 's/^/> /' <<< "$text")

Judge as that student. Per clip: what you see, what you think you are told to do, whether it is unambiguous where to click and what happens next. Watch for: clips too short to read, a click you cannot see, a jump between clips that loses your place, text too small, anything confusing or misleading, a missing step, a mismatch with the text.

Answer:
- Per-clip notes (one or two lines each, with timestamps).
- Text notes (separate; they do not decide the verdict).
- Verdict on the VIDEO: exactly \`great and clear\` ONLY if a first-time student could follow it with no confusion and you would change nothing that matters. Otherwise \`not yet\` and a numbered list of concrete fixes, most important first, each naming clip/timestamp and what to change. No invented nitpicks; no passing it to be nice.
EOF
echo "$R/brief.md"
