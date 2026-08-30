#!/usr/bin/env python3
"""source-probe.py — the ONLINE companion to source-freshness.sh.

freshness.sh audits the ledger and never opens a URL. This opens them, and
automates the three checks a human otherwise performs by re-reading pages:

  LIVE   is the stamped URL alive (dead link != dead claim — both are reported)
  QUOTE  is each verbatim span on the stamp line still on the page
  PUB    the page's own publication date, and the due it implies (pub+6mo)

Rows are proposals, never writes. Re-stamping stays a per-source act (the
SUSPECT contract in source-freshness.sh: cleared per source, never by sweep).
A fetch failure is a loud FETCH-FAIL row, never a silent skip — no result is
not a pass.

Usage:
  source-probe.py [paths...] [--only-suspect] [--limit N] [--timeout S] [--gate]

  paths           files/dirs to scan (default: curriculum/ continuous-research/)
  --only-suspect  probe only stamps whose due == checked+6mo (the re-derived
                  window debt; the reclassification helper)
  --limit N       probe at most N distinct URLs (spot checks)
  --timeout S     per-fetch timeout, seconds (default 20)
  --gate          exit 1 on any DEAD or QUOTE-MISSING row (pre-cohort mode)
"""

import argparse
import html as html_mod
import os
import re
import sys
import urllib.error
import urllib.request

STAMP_RE = re.compile(r"`\[checked:([^ \]]+) +result:([^ \]]+) +due:([^\]]+)\]`")
URL_RE = re.compile(r"\b((?:https?|file)://\S+)")
QUOTE_RES = [re.compile(r"“([^”]{25,400})”"),
             re.compile(r'"([^"]{25,400})"')]
MIN_QUOTE = 25
MAX_BODY = 2_000_000

# Same accepted checked+6mo family as source-freshness.sh (Antti 2026-08-30):
# living-repo stamps whose check date IS the right anchor.
ACCEPTED_PLUS6 = re.compile(r"pocock-grill-me|skills/engineering/wayfinder")

# Same scan pruning as source-freshness.sh: eval machinery quotes stamps in
# evidence text, and fixtures are deliberately broken.
PRUNE_RE = re.compile(r"(^|/)curriculum/evals/")


def normalize(s):
    s = (s.replace("“", '"').replace("”", '"')
          .replace("‘", "'").replace("’", "'")
          .replace("—", "-").replace("–", "-").replace("…", "..."))
    s = re.sub(r"\s+", " ", s)
    # an inline tag stripped to a space leaves "word ." — close it up so a
    # verbatim span still matches
    return re.sub(r"\s+([.,;:!?])", r"\1", s).strip()


def strip_html(html):
    html = re.sub(r"(?is)<(script|style)\b.*?</\1>", " ", html)
    html = re.sub(r"(?s)<[^>]+>", " ", html)
    return normalize(html_mod.unescape(html))


def find_pub_date(html):
    iso = r"(\d{4}-\d{2}-\d{2})"
    names = r"(?:article:published_time|og:article:published_time|datePublished|publish-date|parsely-pub-date|date)"
    patterns = [
        rf'<meta[^>]+(?:property|name)=["\']{names}["\'][^>]+content=["\']{iso}',
        rf'<meta[^>]+content=["\']{iso}[^"\']*["\'][^>]+(?:property|name)=["\']{names}["\']',
        rf'"datePublished"\s*:\s*"{iso}',
        rf'<time[^>]+datetime=["\']{iso}',
    ]
    for p in patterns:
        m = re.search(p, html, re.IGNORECASE)
        if m:
            return m.group(1)
    return None


def plus6(iso):
    y, m, d = (int(x) for x in iso.split("-"))
    m += 6
    y, m = y + (m - 1) // 12, (m - 1) % 12 + 1
    month_days = [31, 29 if (y % 4 == 0 and y % 100 != 0) or y % 400 == 0 else 28,
                  31, 30, 31, 30, 31, 31, 30, 31, 30, 31][m - 1]
    return f"{y:04d}-{m:02d}-{min(d, month_days):02d}"


def parse_stamp_line(line):
    m = STAMP_RE.search(line)
    if not m:
        return None
    u = URL_RE.search(line)
    if not u:
        return None  # attested:/convergent:/kb: stamps have no URL to probe
    quotes = []
    for qre in QUOTE_RES:
        quotes += [q for q in qre.findall(line) if len(q) >= MIN_QUOTE]
    checked, result, due = m.group(1), m.group(2), m.group(3).strip()
    iso = re.compile(r"^\d{4}-\d{2}-\d{2}$")
    suspect = bool(iso.match(checked) and iso.match(due)
                   and due == plus6(checked) and not ACCEPTED_PLUS6.search(line))
    return {"checked": checked, "result": result, "due": due,
            "url": u.group(1).rstrip(".,;)"), "quotes": quotes, "suspect": suspect}


def fetch(url, timeout):
    req = urllib.request.Request(url, headers={
        "User-Agent": "Mozilla/5.0 (source-probe; agents-102 freshness audit)"})
    try:
        with urllib.request.urlopen(req, timeout=timeout) as r:
            status = getattr(r, "status", None) or 200
            return status, r.read(MAX_BODY).decode("utf-8", "replace")
    except urllib.error.HTTPError as e:
        return e.code, ""
    except (urllib.error.URLError, OSError, ValueError):
        return None, None


def collect_stamps(paths):
    files = []
    for p in paths:
        if os.path.isfile(p):
            files.append(p)
        else:
            for root, _dirs, names in os.walk(p):
                for n in sorted(names):
                    if n.endswith(".md") and not n.endswith(".fixture.md"):
                        files.append(os.path.join(root, n))
    out = []
    for f in files:
        if PRUNE_RE.search(f):
            continue
        try:
            with open(f, encoding="utf-8", errors="replace") as fh:
                lines = fh.read().splitlines()
        except OSError:
            continue
        for i, line in enumerate(lines, 1):
            s = parse_stamp_line(line)
            if s:
                s["file"], s["line"] = f, i
                out.append(s)
    return out


def probe_paths(paths, timeout=20, only_suspect=False, limit=None):
    stamps = collect_stamps(paths)
    if only_suspect:
        stamps = [s for s in stamps if s["suspect"]]
    cache = {}
    rows = []
    for s in stamps:
        url = s["url"]
        if url not in cache:
            if limit is not None and len(cache) >= limit:
                continue
            cache[url] = fetch(url, timeout)
        status, body = cache[url]
        row = dict(s)
        row["status"] = status
        row["reachable"] = body is not None and (status is None or status < 400)
        row["quotes_missing"] = []
        row["pub"] = None
        row["propose_due"] = None
        if row["reachable"]:
            hay = strip_html(body)
            row["quotes_missing"] = [q for q in s["quotes"]
                                     if normalize(q) not in hay]
            row["pub"] = find_pub_date(body)
            if s["suspect"] and row["pub"] and plus6(row["pub"]) != s["due"]:
                row["propose_due"] = plus6(row["pub"])
        rows.append(row)
    return rows


def main(argv):
    ap = argparse.ArgumentParser(add_help=True)
    ap.add_argument("paths", nargs="*", default=None)
    ap.add_argument("--only-suspect", action="store_true")
    ap.add_argument("--limit", type=int, default=None)
    ap.add_argument("--timeout", type=int, default=20)
    ap.add_argument("--gate", action="store_true")
    a = ap.parse_args(argv)
    paths = a.paths or ["curriculum", "continuous-research"]

    rows = probe_paths(paths, timeout=a.timeout,
                       only_suspect=a.only_suspect, limit=a.limit)
    tag = lambda r: f"{r['file']}:{r['line']}"
    dead = [r for r in rows if r["status"] in (404, 410)]
    blocked = [r for r in rows if not r["reachable"] and r["status"] not in (404, 410, None)]
    failed = [r for r in rows if r["status"] is None]
    qmiss = [r for r in rows if r["quotes_missing"]]
    props = [r for r in rows if r["propose_due"]]
    ok = [r for r in rows if r["reachable"] and not r["quotes_missing"]]

    print(f"Source probe — {len({r['url'] for r in rows})} urls, {len(rows)} stamps")
    for label, bucket, fmt in [
        ("DEAD — url gone, stamp owes result:GONE", dead,
         lambda r: f"  {tag(r)}  {r['status']}  {r['url']}"),
        ("BLOCKED — could not open, verify by hand", blocked,
         lambda r: f"  {tag(r)}  {r['status']}  {r['url']}"),
        ("FETCH-FAIL — network/parse error, NOT verified", failed,
         lambda r: f"  {tag(r)}  {r['url']}"),
        ("QUOTE-MISSING — span no longer on the page", qmiss,
         lambda r: f"  {tag(r)}  {r['url']}\n" + "".join(
             f'       missing: "{q[:70]}"\n' for q in r["quotes_missing"]).rstrip("\n")),
        ("PUB-PROPOSALS — suspect due, page names its own date", props,
         lambda r: f"  {tag(r)}  due:{r['due']} (=checked+6mo)  pub:{r['pub']} → propose due:{r['propose_due']}"),
    ]:
        if bucket:
            print(f"\n{label} ({len(bucket)}):")
            for r in bucket:
                print(fmt(r))
    print(f"\nsummary: {len(dead)} dead · {len(blocked)} blocked · "
          f"{len(failed)} fetch-fail · {len(qmiss)} quote-missing · "
          f"{len(props)} proposals · {len(ok)} ok")
    if a.gate and (dead or qmiss):
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
