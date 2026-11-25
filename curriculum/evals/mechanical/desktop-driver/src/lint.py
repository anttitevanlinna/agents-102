# lint.py <take>: craft lints on a cut take — the defects a script can see, so no judge has to.
#   timing (from the logs): dead-start (no pointer move inside the crop and no keystroke for > DEAD s after the clip starts),
#                           still-tail (nothing moves for > TAIL s at the end, hold included)
#   framing (from the cut clips): edge (dark/gray band or notch along a crop edge: dimmed backdrop, sliced UI),
#                           text (the clip's text is small for the chain canvas), scale (text size jumps across the chain)
# Prints one finding per line: "<clip>\t<lint>\t<detail>"; exit 1 if any. Timing core is pure (test-steps.sh covers it).
import sys, os, re, subprocess, statistics

DEAD, TAIL, TAIL_LAST = 0.8, 2.0, 3.0
EDGE_DARK, EDGE_FRAC = 200, 0.25       # luminance below EDGE_DARK on > EDGE_FRAC of an edge strip = a band
TEXT_MIN = 0.016                        # median text height / chain canvas width (the student sees the whole canvas)
SCALE_SPREAD = 1.5                      # largest / smallest median text height across the chain's clips


def parse_cut(line):
    m = re.match(r"^# cut\[([^\]]+)\]: (\S+)\s*(.*)$", line)
    name, segs, opts = m.group(1), m.group(2), dict(o.split("=", 1) for o in m.group(3).split() if "=" in o)
    spans = [tuple(float(v) for v in s.split("-")) for s in segs.split(",")]
    return name, spans, opts


def to_px(x, y, ox, oy):   # screen points -> raw video px (the crops' frame)
    return (x - ox) * 2, (y - oy) * 2


def inside(p, crop):
    w, h, cx, cy = crop
    return cx <= p[0] <= cx + w and cy <= p[1] <= cy + h


def timing(name, spans, opts, events, last_clip):
    """events: [(video_t, px, py, kind)] sorted; kind move|down|up|key (key = a keystroke, no position). -> [(lint, detail)]"""
    out = []
    crop = tuple(float(v) for v in opts["crop"].split(":")) if "crop" in opts else (1e9, 1e9, 0, 0)
    a, b = spans[0][0], spans[-1][1]
    lead, hold = float(opts.get("lead", 0)), float(opts.get("hold", 0.8))
    ev = [e for e in events if a <= e[0] <= b and (e[3] == "key" or inside((e[1], e[2]), crop))]   # typing is action too
    first = ev[0][0] if ev else b
    dead = first - a + lead
    if dead > DEAD: out.append(("dead-start", f"{dead:.1f}s before the pointer moves inside the crop"))
    last = ev[-1][0] if ev else a
    tail = b - last + hold
    lim = TAIL_LAST if last_clip else TAIL
    if tail > lim: out.append(("still-tail", f"{tail:.1f}s still at the end (limit {lim:.1f}s)"))
    return out


def edges(png):
    from PIL import Image
    im = Image.open(png).convert("L"); w, h = im.size; px = im.load(); k = 4; out = []
    sides = {"top": [(x, y) for y in range(k) for x in range(w)], "bottom": [(x, y) for y in range(h - k, h) for x in range(w)],
             "left": [(x, y) for x in range(k) for y in range(h)], "right": [(x, y) for x in range(w - k, w) for y in range(h)]}
    for s, pts in sides.items():
        frac = sum(px[p] < EDGE_DARK for p in pts) / len(pts)
        if frac > EDGE_FRAC: out.append(("edge", f"{s} edge {frac:.0%} dark/gray (backdrop band or sliced UI)"))
    c = 14
    for s, (x0, y0) in {"top-left": (0, 0), "top-right": (w - c, 0), "bottom-left": (0, h - c), "bottom-right": (w - c, h - c)}.items():
        vals = [px[x, y] for x in range(x0, x0 + c) for y in range(y0, y0 + c)]
        if sum(v < EDGE_DARK for v in vals) / len(vals) > 0.3: out.append(("edge", f"{s} corner dark (notch)"))
    return out


def text_height(png, bin_ocr):
    from PIL import Image
    w = Image.open(png).width
    r = subprocess.run([bin_ocr, png, "0", "0", str(w)], capture_output=True, text=True, env={**os.environ, "OCR_BOXES": "1"})
    hs = [float(l.split("\t")[2]) for l in r.stdout.splitlines() if l.count("\t") >= 3]
    return statistics.median(hs) if hs else None


def main():
    D = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    take = sys.argv[1]; T = f"{D}/takes/{take}.sh"; O = f"{D}/out"
    lag = float(os.environ.get("REC_LAG", "0.3"))
    t0, ox, oy = (float(v) for v in open(f"{O}/{take}.t0").read().split()[:3])
    lines = [l for l in open(T).read().splitlines() if l.startswith("# cut[")]
    if os.path.exists(f"{O}/{take}.cuts"): lines += open(f"{O}/{take}.cuts").read().splitlines()
    events = []
    if os.path.exists(f"{O}/{take}.clicks.tsv"):
        for l in open(f"{O}/{take}.clicks.tsv"):
            e, x, y, k = l.rstrip("\n").split("\t"); px, py = to_px(float(x), float(y), ox, oy)
            events.append((float(e) - t0 - lag, px, py, k))
    events.sort()
    chain = f"{O}/{take}-chain.mp4"
    cw = int(subprocess.run(["ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries", "stream=width", "-of", "csv=p=0", chain],
                            capture_output=True, text=True).stdout.strip() or 0)
    tmp = f"{O}/lint"; os.makedirs(tmp, exist_ok=True)
    finds, heights = [], {}
    cuts = [parse_cut(l) for l in lines if l.startswith("# cut[")]
    for i, (name, spans, opts) in enumerate(cuts):
        for f in timing(name, spans, opts, events, i == len(cuts) - 1): finds.append((name, *f))
        clip = f"{O}/{take}-{name}.mp4"
        if not os.path.exists(clip): continue
        dur = sum(b - a for a, b in spans)
        png = f"{tmp}/{name}.png"   # from the CLEAN cut (leak-checked), never the raw take
        subprocess.run(["ffmpeg", "-nostdin", "-v", "error", "-y", "-ss", f"{dur / 2:.2f}", "-i", clip, "-frames:v", "1", png], check=True)
        for f in edges(png): finds.append((name, *f))
        h = text_height(png, f"{D}/bin/ocr")
        if h and cw:
            heights[name] = h
            if h / cw < TEXT_MIN: finds.append((name, "text", f"median text {h:.0f}px = {h / cw:.1%} of the {cw}px canvas (min {TEXT_MIN:.1%})"))
    if len(heights) > 1:
        lo, hi = min(heights, key=heights.get), max(heights, key=heights.get)
        if heights[hi] / heights[lo] > SCALE_SPREAD:
            finds.append(("chain", "scale", f"text {heights[lo]:.0f}px in {lo} vs {heights[hi]:.0f}px in {hi} (x{heights[hi] / heights[lo]:.1f}, max x{SCALE_SPREAD})"))
    for f in finds: print("\t".join(f))
    sys.exit(1 if finds else 0)


if __name__ == "__main__":
    main()
