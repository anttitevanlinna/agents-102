#!/usr/bin/env python3
"""build-preview.py <proposed page.md> <current page.md> — m7-preview.html: the proposed Module 7 next to today's, for the ship card."""
import json, sys, pathlib
a, b = (pathlib.Path(x).read_text() for x in sys.argv[1:3])
j = lambda s: json.dumps(s).replace("</", "<\\/")
tpl = r'''<title>Module 7 Preview</title>
<style>
:root{--bg:#f3f4f6;--sheet:#fff;--ink:#1d2430;--muted:#5d6675;--line:#d9dde3;--accent:#2f5d8a;--soft:#e4edf6}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){--bg:#12161c;--sheet:#1a2028;--ink:#e6e9ee;--muted:#9aa3b1;--line:#2c3440;--accent:#8db6e0;--soft:#1f2d3c;color-scheme:dark}}
:root[data-theme="dark"]{--bg:#12161c;--sheet:#1a2028;--ink:#e6e9ee;--muted:#9aa3b1;--line:#2c3440;--accent:#8db6e0;--soft:#1f2d3c;color-scheme:dark}
body{background:var(--bg);color:var(--ink);font:16px/1.55 Georgia,serif;margin:0}
.wrap{max-width:720px;margin:0 auto;padding:24px 16px 80px}
h1{font-size:1.6rem;margin:0 0 6px}.lede{font-family:system-ui,sans-serif;color:var(--muted);font-size:.92rem;margin:0 0 14px}
.tw{overflow-x:auto}table{font:.85rem system-ui,sans-serif;border-collapse:collapse;width:100%;margin:0 0 16px}td,th{border-bottom:1px solid var(--line);padding:5px 6px;text-align:left}
.tabs{display:flex;gap:8px;margin:0 0 14px;position:sticky;top:0;background:var(--bg);padding:8px 0}
.tabs button{font:500 .9rem system-ui,sans-serif;border:1px solid var(--line);background:var(--sheet);color:var(--ink);border-radius:999px;padding:6px 14px;cursor:pointer}
.tabs button[aria-pressed=true]{background:var(--accent);color:var(--sheet);border-color:var(--accent)}
.doc{background:var(--sheet);border:1px solid var(--line);border-radius:10px;padding:8px 20px;overflow-wrap:anywhere}
.doc h2{font-size:1.15rem;margin:22px 0 6px;border-top:1px solid var(--line);padding-top:14px}.doc h1{font-size:1.4rem;margin:18px 0 6px}
.doc code{font:.85em ui-monospace,monospace;background:var(--soft);padding:0 3px;border-radius:3px}
.doc .file{font:600 .75rem system-ui,sans-serif;color:var(--accent);letter-spacing:.05em;text-transform:uppercase;margin-top:26px}
</style>
<div class="wrap">
<h1>Module 7, shortened</h1>
<p class="lede">The proposed Module 7 (module page, three exercises, lecture) next to what ships today. Exercise steps and prompts are unchanged; the prose around them is regenerated from your strategy input and language notes, then compacted. Your scar story is in the lecture with the ending you chose.</p>
<div class="tw"><table><tr><th></th><th>Words</th><th>Story judge</th><th>Taste judge, slides won vs today</th><th>Student runs carrying "access is not absorption"</th></tr>
<tr><td>Shortened</td><td>1,492</td><td>76</td><td>80%</td><td>4 of 6</td></tr><tr><td>Today</td><td>2,363</td><td>61</td><td>n/a</td><td>1 of 6</td></tr></table></div>
<div class="tabs"><button id="t1" aria-pressed="true">Shortened (proposed)</button><button id="t2" aria-pressed="false">Today</button></div>
<div class="doc" id="doc"></div></div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/marked/12.0.2/marked.min.js"></script>
<script>
const V={a:__A__,b:__B__};
const clean=(s)=>s.replace(/^=== MODULE .*$/m,'').replace(/^--- (end )?[a-z/.-]+\.md$/gm,(m)=>m.startsWith('--- end')?'':'<div class="file">'+m.slice(4).replace(/\.md$/,'')+'</div>').replace(/\{\{prompt:([^}]+)\}\}/g,'`[prompt: $1]`').replace(/<!--[\s\S]*?-->/g,'');
const t1=document.getElementById('t1'),t2=document.getElementById('t2');
function show(k){const s=clean(V[k]);document.getElementById('doc').innerHTML=window.marked?marked.parse(s):'<pre style="white-space:pre-wrap">'+s.replace(/</g,'&lt;')+'</pre>';t1.setAttribute('aria-pressed',k==='a');t2.setAttribute('aria-pressed',k==='b');}
t1.onclick=()=>show('a');t2.onclick=()=>show('b');addEventListener('load',()=>show('a'));show('a');
</script>'''
(pathlib.Path(__file__).parent / "m7-preview.html").write_text(tpl.replace("__A__", j(a)).replace("__B__", j(b)))
print("[preview] m7-preview.html")
