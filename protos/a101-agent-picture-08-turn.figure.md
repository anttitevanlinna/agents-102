<figure class="diagram">
<svg viewBox="0 0 1200 560" role="img" aria-label="The full agent picture as one turn repeated. Across the top right, in its own shaded zone, is the model, in the cloud. Below it, inside a dashed wall, the boundary, is your runtime, on your machine, and everything else lives there. The loop is a closed round trip: text comes back down from the model, becomes tool calls here, the results come back, and they go up to the model again together with context and the goal, turn after turn. When the run is done, what came out passes the checks, something that reads it before you do, just inside a small door in the wall: the interface, where a person, you, one level up, meets it. The checks' verdict is written down into memory, part of context, so the next run starts sharper. The goal goes up each turn and is what the checks judge against. The wall cuts through the tools and the context: the ones inside are what you give it, the greyed ones outside, such as sending mail or a salary sheet, are what you keep back. The cloud sits outside the wall by nature: what goes up, goes up." style="display:block;width:100%;height:auto;background:#efe6d2;border:1px solid #c5b68d;border-radius:7px;">
<defs>
<marker id="tn-ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 Z" fill="#2f6b6b"/></marker>
<marker id="tn-ao" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 Z" fill="#a05a2c"/></marker>
<marker id="tn-ak" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 Z" fill="#1f1a13"/></marker>
</defs>
<rect x="0.5" y="0.5" width="1199" height="559" rx="7" fill="#efe6d2"/>
<rect x="12" y="12" width="1176" height="536" rx="5" fill="none" stroke="#d6c8a3" stroke-width="1"/>
<rect x="476" y="18" width="704" height="90" rx="6" fill="rgba(120,108,86,0.10)" stroke="#786c56" stroke-width="1" stroke-dasharray="2 5"/>
<text x="1166" y="38" text-anchor="end" font-family="ui-monospace,Menlo,Consolas,monospace" font-size="10" letter-spacing="2" fill="#4a4234">IN THE CLOUD</text>
<text x="1166" y="60" text-anchor="end" font-family="Inter,-apple-system,sans-serif" font-size="11" font-style="italic" fill="#4a4234">outside the wall by nature:</text>
<text x="1166" y="75" text-anchor="end" font-family="Inter,-apple-system,sans-serif" font-size="11" font-style="italic" fill="#4a4234">what goes up, goes up</text>
<rect x="500" y="34" width="400" height="58" rx="4" fill="#efe6d2" stroke="#2f6b6b" stroke-width="2.2"/>
<text x="700" y="58" text-anchor="middle" font-family="ui-monospace,Menlo,Consolas,monospace" font-size="12.5" letter-spacing="1.5" fill="#1f1a13">MODEL</text>
<text x="700" y="77" text-anchor="middle" font-family="Inter,-apple-system,sans-serif" font-size="10.5" fill="#4a4234">reads what comes up, sends one answer back</text>
<text x="215" y="30" text-anchor="middle" font-family="ui-monospace,Menlo,Consolas,monospace" font-size="12.5" letter-spacing="3" fill="#a05a2c">YOU, ONE LEVEL UP</text>
<text x="215" y="47" text-anchor="middle" font-family="Inter,-apple-system,sans-serif" font-size="11.5" fill="#4a4234">you draw the wall: what you</text>
<text x="215" y="61" text-anchor="middle" font-family="Inter,-apple-system,sans-serif" font-size="11.5" fill="#4a4234">give it, what you keep back</text>
<g stroke="#a05a2c" stroke-width="2" fill="none" stroke-linecap="round">
<circle cx="215" cy="75" r="5.5"/>
<line x1="215" y1="81" x2="215" y2="94"/><line x1="207" y1="86" x2="223" y2="86"/><line x1="215" y1="94" x2="209" y2="104"/><line x1="215" y1="94" x2="221" y2="104"/>
</g>
<rect x="150" y="126" width="900" height="378" fill="none" stroke="#1f1a13" stroke-width="1.8" stroke-dasharray="7 6"/>
<rect x="198" y="110" width="34" height="32" fill="#efe6d2" stroke="none"/>
<path d="M200,142 L200,110 L230,110 L230,142" fill="none" stroke="#1f1a13" stroke-width="2"/>
<path d="M200,110 L214,116 L214,146 L200,142 Z" fill="#d6c8a3" stroke="#1f1a13" stroke-width="1.4"/>
<circle cx="211" cy="129" r="1.6" fill="#1f1a13"/>
<text x="242" y="118" font-family="ui-monospace,Menlo,Consolas,monospace" font-size="12" letter-spacing="1.5" fill="#1f1a13">INTERFACE</text>
<text x="344" y="118" font-family="Inter,-apple-system,sans-serif" font-size="11" fill="#4a4234">where a person meets it</text>
<rect x="170" y="152" width="112" height="34" rx="4" fill="#efe6d2" stroke="#1f1a13" stroke-width="2"/>
<text x="226" y="174" text-anchor="middle" font-family="ui-monospace,Menlo,Consolas,monospace" font-size="12.5" letter-spacing="1.5" fill="#1f1a13">CHECKS</text>
<line x1="215" y1="152" x2="215" y2="146" stroke="#1f1a13" stroke-width="1.8" marker-end="url(#tn-ak)"/>
<text x="324" y="165" font-family="Inter,-apple-system,sans-serif" font-size="10.5" fill="#4a4234">something reads what came out,</text>
<text x="324" y="179" font-family="Inter,-apple-system,sans-serif" font-size="10.5" fill="#4a4234">before you do</text>
<rect x="330" y="200" width="700" height="200" rx="6" fill="rgba(47,107,107,0.05)" stroke="#4a4234" stroke-width="2"/>
<text x="342" y="391" font-family="ui-monospace,Menlo,Consolas,monospace" font-size="9.5" letter-spacing="1" fill="#786c56">your runtime, on your machine</text>
<path d="M520,214 L240,214 L240,190" fill="none" stroke="#1f1a13" stroke-width="1.8" marker-end="url(#tn-ak)"/>
<text x="420" y="209" text-anchor="middle" font-family="Inter,-apple-system,sans-serif" font-size="10.5" fill="#1f1a13" paint-order="stroke" stroke="#efe6d2" stroke-width="4">when done: what came out</text>
<line x1="520" y1="94" x2="520" y2="250" stroke="#2f6b6b" stroke-width="2.4"/>
<circle cx="520" cy="250" r="4" fill="#2f6b6b"/>
<text x="528" y="176" font-family="Inter,-apple-system,sans-serif" font-size="10.5" fill="#2f6b6b" paint-order="stroke" stroke="#efe6d2" stroke-width="4">text comes back</text>
<line x1="516" y1="250" x2="294" y2="250" stroke="#2f6b6b" stroke-width="2.4" marker-end="url(#tn-ar)"/>
<text x="425" y="243" text-anchor="middle" font-family="Inter,-apple-system,sans-serif" font-size="10.5" fill="#2f6b6b" paint-order="stroke" stroke="#efe6d2" stroke-width="4">becomes tool calls, here</text>
<line x1="292" y1="320" x2="600" y2="320" stroke="#2f6b6b" stroke-width="2.4" marker-end="url(#tn-ar)"/>
<line x1="600" y1="320" x2="858" y2="320" stroke="#2f6b6b" stroke-width="2.4"/>
<text x="345" y="312" font-family="Inter,-apple-system,sans-serif" font-size="10.5" fill="#2f6b6b" paint-order="stroke" stroke="#efe6d2" stroke-width="4">results</text>
<line x1="860" y1="468" x2="860" y2="96" stroke="#2f6b6b" stroke-width="2.4" marker-end="url(#tn-ar)"/>
<text x="868" y="176" font-family="Inter,-apple-system,sans-serif" font-size="10.5" fill="#2f6b6b" paint-order="stroke" stroke="#efe6d2" stroke-width="4">context + goal go up</text>
<text x="700" y="287" text-anchor="middle" font-family="ui-monospace,Menlo,Consolas,monospace" font-size="12.5" letter-spacing="2" fill="#2f6b6b">LOOP</text>
<text x="700" y="303" text-anchor="middle" font-family="Inter,-apple-system,sans-serif" font-size="11" fill="#4a4234">one answer per turn, turn after turn</text>
<text x="600" y="342" text-anchor="middle" font-family="Inter,-apple-system,sans-serif" font-size="11" fill="#4a4234">back up with context and the goal, and round again</text>
<circle cx="960" cy="262" r="19" fill="none" stroke="#1f1a13" stroke-width="1.8"/>
<circle cx="960" cy="262" r="10" fill="none" stroke="#1f1a13" stroke-width="1.8"/>
<circle cx="960" cy="262" r="3.5" fill="#1f1a13"/>
<line x1="939" y1="262" x2="864" y2="262" stroke="#1f1a13" stroke-width="1.4" stroke-dasharray="2 4"/>
<text x="960" y="302" text-anchor="middle" font-family="ui-monospace,Menlo,Consolas,monospace" font-size="12.5" letter-spacing="1.5" fill="#1f1a13">GOAL</text>
<text x="960" y="318" text-anchor="middle" font-family="Inter,-apple-system,sans-serif" font-size="10.5" fill="#4a4234">goes up each turn;</text>
<text x="960" y="331" text-anchor="middle" font-family="Inter,-apple-system,sans-serif" font-size="10.5" fill="#4a4234">the checks judge</text>
<text x="960" y="344" text-anchor="middle" font-family="Inter,-apple-system,sans-serif" font-size="10.5" fill="#4a4234">against it</text>
<text x="230" y="376" text-anchor="middle" font-family="ui-monospace,Menlo,Consolas,monospace" font-size="12.5" letter-spacing="1.5" fill="#1f1a13">TOOLS</text>
<g fill="#efe6d2" stroke="#2f6b6b" stroke-width="1.6">
<rect x="170" y="228" width="120" height="26" rx="3"/><rect x="170" y="262" width="120" height="26" rx="3"/><rect x="170" y="296" width="120" height="26" rx="3"/><rect x="170" y="330" width="120" height="26" rx="3"/>
</g>
<g font-family="ui-monospace,Menlo,Consolas,monospace" font-size="10.5" fill="#1f1a13" text-anchor="middle">
<text x="230" y="245">read files</text><text x="230" y="279">search</text><text x="230" y="313">run code</text><text x="230" y="347">tickets</text>
</g>
<text x="85" y="242" text-anchor="middle" font-family="ui-monospace,Menlo,Consolas,monospace" font-size="9.5" letter-spacing="1.5" fill="#786c56">kept back</text>
<g fill="none" stroke="#786c56" stroke-width="1.2" stroke-dasharray="3 3" opacity="0.8">
<rect x="30" y="252" width="110" height="26" rx="3"/><rect x="30" y="288" width="110" height="26" rx="3"/><rect x="30" y="324" width="110" height="26" rx="3"/>
</g>
<g font-family="ui-monospace,Menlo,Consolas,monospace" font-size="10.5" fill="#786c56" text-anchor="middle">
<text x="85" y="269">send mail</text><text x="85" y="305">delete</text><text x="85" y="341">payments</text>
</g>
<path d="M282,169 L312,169 L312,421" fill="none" stroke="#a05a2c" stroke-width="2.2" marker-end="url(#tn-ao)"/>
<text x="304" y="404" text-anchor="end" font-family="Inter,-apple-system,sans-serif" font-size="10.5" fill="#a05a2c" paint-order="stroke" stroke="#efe6d2" stroke-width="4">verdict written down</text>
<text x="200" y="440" text-anchor="middle" font-family="ui-monospace,Menlo,Consolas,monospace" font-size="12.5" letter-spacing="1.5" fill="#1f1a13">CONTEXT</text>
<text x="200" y="456" text-anchor="middle" font-family="Inter,-apple-system,sans-serif" font-size="10.5" fill="#4a4234">what it reads,</text>
<text x="200" y="469" text-anchor="middle" font-family="Inter,-apple-system,sans-serif" font-size="10.5" fill="#4a4234">where it writes</text>
<rect x="268" y="424" width="88" height="28" rx="3" fill="#efe6d2" stroke="#a05a2c" stroke-width="2.4"/>
<g fill="#efe6d2" stroke="#2f6b6b" stroke-width="1.6">
<rect x="366" y="424" width="80" height="28" rx="3"/><rect x="456" y="424" width="80" height="28" rx="3"/><rect x="546" y="424" width="80" height="28" rx="3"/><rect x="636" y="424" width="80" height="28" rx="3"/>
</g>
<g font-family="ui-monospace,Menlo,Consolas,monospace" font-size="10.5" fill="#1f1a13" text-anchor="middle">
<text x="312" y="442" fill="#a05a2c">memory</text><text x="406" y="442">prompt</text><text x="496" y="442">files</text><text x="586" y="442">rules</text><text x="676" y="442">sources</text>
</g>
<line x1="262" y1="470" x2="1036" y2="470" stroke="#2f6b6b" stroke-width="1.8"/>
<text x="868" y="440" font-family="Inter,-apple-system,sans-serif" font-size="10.5" fill="#4a4234" paint-order="stroke" stroke="#efe6d2" stroke-width="4">reads</text>
<text x="1038" y="492" text-anchor="end" font-family="ui-monospace,Menlo,Consolas,monospace" font-size="12" letter-spacing="1.5" fill="#1f1a13">BOUNDARY</text>
<text x="946" y="492" text-anchor="end" font-family="Inter,-apple-system,sans-serif" font-size="11" fill="#4a4234">what your runtime may reach, and where it stops</text>
<text x="1121" y="410" text-anchor="middle" font-family="ui-monospace,Menlo,Consolas,monospace" font-size="9.5" letter-spacing="1.5" fill="#786c56">kept back</text>
<g fill="none" stroke="#786c56" stroke-width="1.2" stroke-dasharray="3 3" opacity="0.8">
<rect x="1062" y="424" width="118" height="28" rx="3"/><rect x="1062" y="460" width="118" height="28" rx="3"/>
</g>
<g font-family="ui-monospace,Menlo,Consolas,monospace" font-size="10.5" fill="#786c56" text-anchor="middle">
<text x="1121" y="442">salary sheet</text><text x="1121" y="478">private notes</text>
</g>
<text x="600" y="534" text-anchor="middle" font-family="Inter,-apple-system,sans-serif" font-size="12" font-style="italic" fill="#1f1a13">Inside the wall is what you give it. Outside is what you keep back.</text>
</svg>
</figure>
