<figure class="diagram">
<svg viewBox="0 0 1200 560" role="img" aria-label="The full agent picture drawn as turns in time. A dashed wall, the boundary, encloses everything the agent may reach. Inside it, a box called the runtime holds the loop: the same small move repeated turn after turn, four turns and then more. In each turn the model reads down from a shelf of context above (prompt, files, rules, memory, sources), writes a call down to a shelf of tools below (search, read file, run code, draft mail), and gets a result back. Between turns a small check decides whether to go on; after the last turn a check decides whether the run is good enough, and the run arrives at the goal, a target to the right. Outside the wall, kept back, sit a private-notes file and a send-mail tool the agent cannot reach. Above the wall, one level up, stands the person: they meet the run through the interface, a window set in the top of the wall where they can see the run and step in, and they decide the shape of the turns: inside the wall is what they give, outside is what they keep back." style="display:block;width:100%;height:auto;background:#efe6d2;border:1px solid #c5b68d;border-radius:7px;">
<rect x="0.5" y="0.5" width="1199" height="559" rx="7" fill="#efe6d2"/><rect x="12" y="12" width="1176" height="536" fill="none" stroke="#d6c8a3" stroke-width="1"/>
<defs><marker id="ap5-teal" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#2f6b6b"/></marker><marker id="ap5-back" markerWidth="8" markerHeight="8" refX="1" refY="4" orient="auto"><path d="M8,0 L0,4 L8,8 Z" fill="#4a4234"/></marker><marker id="ap5-ink" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#4a4234"/></marker></defs>
<text x="58" y="44" font-family="ui-monospace,Menlo,Consolas,monospace" font-size="11" letter-spacing="3" fill="#a05a2c">YOU, ONE LEVEL UP</text>
<text x="58" y="66" font-family="Inter,-apple-system,sans-serif" font-size="12.5" fill="#1f1a13">You decide the shape of the turns, not each move.</text>
<text x="58" y="86" font-family="Inter,-apple-system,sans-serif" font-size="11" fill="#4a4234">Inside the wall is what you give. Outside is what you keep back.</text>
<rect x="40" y="110" width="960" height="420" rx="4" fill="none" stroke="#4a4234" stroke-width="1.6" stroke-dasharray="7 5"/>
<text x="58" y="506" font-family="ui-monospace,Menlo,Consolas,monospace" font-size="11" font-weight="700" letter-spacing="1.5" fill="#1f1a13">BOUNDARY</text>
<text x="58" y="520" font-family="Inter,-apple-system,sans-serif" font-size="9.5" fill="#786c56">what it may reach, and where it stops</text>
<circle cx="790" cy="28" r="7" fill="none" stroke="#a05a2c" stroke-width="1.8"/><path d="M775,52 Q790,34 805,52" fill="none" stroke="#a05a2c" stroke-width="1.8"/>
<line x1="790" y1="58" x2="790" y2="93" stroke="#a05a2c" stroke-width="1.8" marker-start="url(#ap5-back)" marker-end="url(#ap5-ink)"/>
<rect x="725" y="96" width="130" height="28" rx="4" fill="#efe6d2" stroke="#2f6b6b" stroke-width="2.2"/>
<text x="790" y="114" text-anchor="middle" font-family="ui-monospace,Menlo,Consolas,monospace" font-size="11" font-weight="700" letter-spacing="1" fill="#1f1a13">INTERFACE</text>
<text x="806" y="70" font-family="Inter,-apple-system,sans-serif" font-size="10" fill="#4a4234">see the run,</text><text x="806" y="84" font-family="Inter,-apple-system,sans-serif" font-size="10" fill="#4a4234">step in</text>
<text x="58" y="164" font-family="ui-monospace,Menlo,Consolas,monospace" font-size="12" font-weight="700" letter-spacing="1" fill="#1f1a13">CONTEXT</text><text x="58" y="179" font-family="Inter,-apple-system,sans-serif" font-size="9.5" fill="#786c56">what it reads</text>
<rect x="150" y="140" width="750" height="54" rx="4" fill="none" stroke="#2f6b6b" stroke-width="1.8"/>
<rect x="220" y="150" width="92" height="34" rx="3" fill="#e6dcc4" stroke="#c5b68d" stroke-width="1"/><text x="266" y="171" text-anchor="middle" font-family="ui-monospace,Menlo,Consolas,monospace" font-size="10" fill="#4a4234">prompt</text>
<rect x="360" y="150" width="92" height="34" rx="3" fill="#e6dcc4" stroke="#c5b68d" stroke-width="1"/><text x="406" y="171" text-anchor="middle" font-family="ui-monospace,Menlo,Consolas,monospace" font-size="10" fill="#4a4234">files</text>
<rect x="500" y="150" width="92" height="34" rx="3" fill="#e6dcc4" stroke="#c5b68d" stroke-width="1"/><text x="546" y="171" text-anchor="middle" font-family="ui-monospace,Menlo,Consolas,monospace" font-size="10" fill="#4a4234">rules</text>
<rect x="640" y="150" width="92" height="34" rx="3" fill="#e6dcc4" stroke="#c5b68d" stroke-width="1"/><text x="686" y="171" text-anchor="middle" font-family="ui-monospace,Menlo,Consolas,monospace" font-size="10" fill="#4a4234">memory</text>
<rect x="780" y="150" width="92" height="34" rx="3" fill="#e6dcc4" stroke="#c5b68d" stroke-width="1"/><text x="826" y="171" text-anchor="middle" font-family="ui-monospace,Menlo,Consolas,monospace" font-size="10" fill="#4a4234">sources</text>
<text x="58" y="444" font-family="ui-monospace,Menlo,Consolas,monospace" font-size="12" font-weight="700" letter-spacing="1" fill="#1f1a13">TOOLS</text><text x="58" y="459" font-family="Inter,-apple-system,sans-serif" font-size="9.5" fill="#786c56">what it can use</text>
<rect x="150" y="422" width="750" height="54" rx="4" fill="none" stroke="#2f6b6b" stroke-width="1.8"/>
<rect x="240" y="432" width="100" height="34" rx="3" fill="#e6dcc4" stroke="#c5b68d" stroke-width="1"/><text x="290" y="453" text-anchor="middle" font-family="ui-monospace,Menlo,Consolas,monospace" font-size="10" fill="#4a4234">search</text>
<rect x="380" y="432" width="100" height="34" rx="3" fill="#e6dcc4" stroke="#c5b68d" stroke-width="1"/><text x="430" y="453" text-anchor="middle" font-family="ui-monospace,Menlo,Consolas,monospace" font-size="10" fill="#4a4234">read file</text>
<rect x="520" y="432" width="100" height="34" rx="3" fill="#e6dcc4" stroke="#c5b68d" stroke-width="1"/><text x="570" y="453" text-anchor="middle" font-family="ui-monospace,Menlo,Consolas,monospace" font-size="10" fill="#4a4234">run code</text>
<rect x="660" y="432" width="100" height="34" rx="3" fill="#e6dcc4" stroke="#c5b68d" stroke-width="1"/><text x="710" y="453" text-anchor="middle" font-family="ui-monospace,Menlo,Consolas,monospace" font-size="10" fill="#4a4234">draft mail</text>
<text x="826" y="453" text-anchor="middle" font-family="ui-monospace,Menlo,Consolas,monospace" font-size="12" fill="#786c56">…</text>
<rect x="150" y="222" width="730" height="170" rx="8" fill="none" stroke="#2f6b6b" stroke-width="2.4"/>
<text x="164" y="242" font-family="ui-monospace,Menlo,Consolas,monospace" font-size="9.5" letter-spacing="1" fill="#786c56">runtime</text>
<text x="164" y="300" font-family="ui-monospace,Menlo,Consolas,monospace" font-size="12.5" font-weight="700" letter-spacing="1.5" fill="#2f6b6b">LOOP</text>
<text x="164" y="316" font-family="Inter,-apple-system,sans-serif" font-size="9.5" fill="#4a4234">the same move,</text><text x="164" y="329" font-family="Inter,-apple-system,sans-serif" font-size="9.5" fill="#4a4234">turn after turn</text>
<line x1="266" y1="185" x2="266" y2="288" stroke="#2f6b6b" stroke-width="1.8" marker-end="url(#ap5-teal)"/>
<line x1="278" y1="318" x2="278" y2="429" stroke="#2f6b6b" stroke-width="1.8" marker-end="url(#ap5-teal)"/>
<line x1="302" y1="431" x2="302" y2="321" stroke="#2f6b6b" stroke-width="1.8" stroke-dasharray="4 3" marker-end="url(#ap5-teal)"/>
<rect x="255" y="290" width="70" height="28" rx="4" fill="#efe6d2" stroke="#2f6b6b" stroke-width="2"/>
<text x="290" y="308" text-anchor="middle" font-family="ui-monospace,Menlo,Consolas,monospace" font-size="11" font-weight="700" letter-spacing="1" fill="#1f1a13">MODEL</text>
<text x="270" y="356" text-anchor="end" font-family="ui-monospace,Menlo,Consolas,monospace" font-size="9.5" fill="#786c56">turn 1</text>
<line x1="325" y1="304" x2="395" y2="304" stroke="#2f6b6b" stroke-width="1.8"/>
<path d="M360,297 L367,304 L360,311 L353,304 Z" fill="#2f6b6b"/>
<line x1="406" y1="185" x2="406" y2="288" stroke="#2f6b6b" stroke-width="1.8" marker-end="url(#ap5-teal)"/>
<line x1="418" y1="318" x2="418" y2="429" stroke="#2f6b6b" stroke-width="1.8" marker-end="url(#ap5-teal)"/>
<line x1="442" y1="431" x2="442" y2="321" stroke="#2f6b6b" stroke-width="1.8" stroke-dasharray="4 3" marker-end="url(#ap5-teal)"/>
<rect x="395" y="290" width="70" height="28" rx="4" fill="#efe6d2" stroke="#2f6b6b" stroke-width="2"/>
<text x="430" y="308" text-anchor="middle" font-family="ui-monospace,Menlo,Consolas,monospace" font-size="10" fill="#786c56">model</text>
<text x="410" y="356" text-anchor="end" font-family="ui-monospace,Menlo,Consolas,monospace" font-size="9.5" fill="#786c56">turn 2</text>
<line x1="465" y1="304" x2="535" y2="304" stroke="#2f6b6b" stroke-width="1.8"/>
<path d="M500,297 L507,304 L500,311 L493,304 Z" fill="#2f6b6b"/>
<line x1="546" y1="185" x2="546" y2="288" stroke="#2f6b6b" stroke-width="1.8" marker-end="url(#ap5-teal)"/>
<line x1="558" y1="318" x2="558" y2="429" stroke="#2f6b6b" stroke-width="1.8" marker-end="url(#ap5-teal)"/>
<line x1="582" y1="431" x2="582" y2="321" stroke="#2f6b6b" stroke-width="1.8" stroke-dasharray="4 3" marker-end="url(#ap5-teal)"/>
<rect x="535" y="290" width="70" height="28" rx="4" fill="#efe6d2" stroke="#2f6b6b" stroke-width="2"/>
<text x="570" y="308" text-anchor="middle" font-family="ui-monospace,Menlo,Consolas,monospace" font-size="10" fill="#786c56">model</text>
<text x="550" y="356" text-anchor="end" font-family="ui-monospace,Menlo,Consolas,monospace" font-size="9.5" fill="#786c56">turn 3</text>
<line x1="605" y1="304" x2="675" y2="304" stroke="#2f6b6b" stroke-width="1.8"/>
<path d="M640,297 L647,304 L640,311 L633,304 Z" fill="#2f6b6b"/>
<line x1="686" y1="185" x2="686" y2="288" stroke="#2f6b6b" stroke-width="1.8" marker-end="url(#ap5-teal)"/>
<line x1="698" y1="318" x2="698" y2="429" stroke="#2f6b6b" stroke-width="1.8" marker-end="url(#ap5-teal)"/>
<line x1="722" y1="431" x2="722" y2="321" stroke="#2f6b6b" stroke-width="1.8" stroke-dasharray="4 3" marker-end="url(#ap5-teal)"/>
<rect x="675" y="290" width="70" height="28" rx="4" fill="#efe6d2" stroke="#2f6b6b" stroke-width="2"/>
<text x="710" y="308" text-anchor="middle" font-family="ui-monospace,Menlo,Consolas,monospace" font-size="10" fill="#786c56">model</text>
<text x="690" y="356" text-anchor="end" font-family="ui-monospace,Menlo,Consolas,monospace" font-size="9.5" fill="#786c56">turn 4</text>
<text x="272" y="212" font-family="Inter,-apple-system,sans-serif" font-size="9.5" fill="#4a4234" paint-order="stroke" stroke="#efe6d2" stroke-width="4">reads</text>
<text x="272" y="408" text-anchor="end" font-family="Inter,-apple-system,sans-serif" font-size="9.5" fill="#4a4234" paint-order="stroke" stroke="#efe6d2" stroke-width="4">call</text>
<text x="308" y="408" font-family="Inter,-apple-system,sans-serif" font-size="9.5" fill="#4a4234" paint-order="stroke" stroke="#efe6d2" stroke-width="4">result</text>
<line x1="745" y1="304" x2="770" y2="304" stroke="#2f6b6b" stroke-width="1.8"/>
<text x="786" y="309" text-anchor="middle" font-family="ui-monospace,Menlo,Consolas,monospace" font-size="16" fill="#2f6b6b">…</text>
<line x1="802" y1="304" x2="818" y2="304" stroke="#2f6b6b" stroke-width="1.8"/>
<path d="M830,292 L842,304 L830,316 L818,304 Z" fill="#a05a2c"/>
<line x1="842" y1="304" x2="913" y2="304" stroke="#a05a2c" stroke-width="2.2" marker-end="url(#ap5-ink)"/>
<text x="830" y="342" text-anchor="middle" font-family="ui-monospace,Menlo,Consolas,monospace" font-size="11" font-weight="700" letter-spacing="1" fill="#1f1a13">CHECKS</text>
<text x="830" y="357" text-anchor="middle" font-family="Inter,-apple-system,sans-serif" font-size="9.5" fill="#4a4234">good enough?</text><text x="830" y="370" text-anchor="middle" font-family="Inter,-apple-system,sans-serif" font-size="9.5" fill="#4a4234">stop, or turn again</text>
<circle cx="940" cy="304" r="24" fill="none" stroke="#1f1a13" stroke-width="1.8"/>
<circle cx="940" cy="304" r="15" fill="none" stroke="#1f1a13" stroke-width="1.8"/>
<circle cx="940" cy="304" r="5" fill="#1f1a13"/>
<text x="940" y="350" text-anchor="middle" font-family="ui-monospace,Menlo,Consolas,monospace" font-size="11" font-weight="700" letter-spacing="1" fill="#1f1a13">GOAL</text>
<text x="940" y="365" text-anchor="middle" font-family="Inter,-apple-system,sans-serif" font-size="9.5" fill="#4a4234">what the turns</text><text x="940" y="378" text-anchor="middle" font-family="Inter,-apple-system,sans-serif" font-size="9.5" fill="#4a4234">converge on</text>
<rect x="1035" y="150" width="120" height="34" rx="3" fill="none" stroke="#a05a2c" stroke-width="1.4" stroke-dasharray="4 3"/><text x="1095" y="171" text-anchor="middle" font-family="ui-monospace,Menlo,Consolas,monospace" font-size="10" fill="#a05a2c">private notes</text>
<line x1="992" y1="167" x2="1008" y2="167" stroke="#4a4234" stroke-width="2"/>
<rect x="1035" y="432" width="120" height="34" rx="3" fill="none" stroke="#a05a2c" stroke-width="1.4" stroke-dasharray="4 3"/><text x="1095" y="453" text-anchor="middle" font-family="ui-monospace,Menlo,Consolas,monospace" font-size="10" fill="#a05a2c">send mail</text>
<line x1="992" y1="449" x2="1008" y2="449" stroke="#4a4234" stroke-width="2"/>
<text x="1095" y="296" text-anchor="middle" font-family="ui-monospace,Menlo,Consolas,monospace" font-size="11" letter-spacing="2" fill="#a05a2c">KEPT BACK</text>
<text x="1095" y="314" text-anchor="middle" font-family="Inter,-apple-system,sans-serif" font-size="10" fill="#4a4234">stays with you,</text><text x="1095" y="328" text-anchor="middle" font-family="Inter,-apple-system,sans-serif" font-size="10" fill="#4a4234">out of reach</text>
<text x="1176" y="542" text-anchor="end" font-family="ui-monospace,Menlo,Consolas,monospace" font-size="8.5" letter-spacing="2" fill="#786c56">ONE MOVE, TURN AFTER TURN</text>
</svg>
</figure>
