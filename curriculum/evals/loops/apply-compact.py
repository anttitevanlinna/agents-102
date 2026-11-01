#!/usr/bin/env python3
"""apply-compact.py <checkout> <variant> — loop.sh apply step for compaction variants: swaps each file
under $COMPACT_DIR/<variant>/ (paths relative to curriculum/) into the checkout above its maintainer block."""
import sys, os, pathlib
root = pathlib.Path(sys.argv[1]) / "curriculum"; v = sys.argv[2]
src = pathlib.Path(os.environ["COMPACT_DIR"]) / v
for f in src.rglob("*.md"):
    rel = f.relative_to(src); p = root / rel; t = p.read_text(); i = t.find("<!-- maintainer -->")
    p.write_text(f.read_text() + ("\n" + t[i:] if i >= 0 else ""))
print(f"[apply-compact] {v} ok")
