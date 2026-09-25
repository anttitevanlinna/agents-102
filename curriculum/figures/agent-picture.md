<figure class="diagram">
<svg viewBox="0 0 1200 560" role="img" aria-label="The full agent picture drawn as the loop a runtime actually runs. A model sits in a shaded zone above marked in the cloud. Inside a box labelled your runtime, on your machine, a large circle carries the turn: one, everything so far goes up, the instructions, the tool list and the conversation; two, the model answers with one message; three, the message comes back holding some text and some tool calls; four, each tool call passes a gate marked allowed, runs on your machine, and its result is appended to the conversation; five, if the message held any tool call it goes round again without you, and if it held none the turn ends and the runtime waits for you. The text in the message is shown to you through the interface, a gap in the top-left of a dashed wall labelled boundary, where a person stands one level up; the goal is the message the person sends in. Below the loop a row labelled context holds the conversation so far: instructions and rules, your messages, tool results. Tools on the right, read files, search, run code, tickets, sit inside the wall; send mail, payments, salary sheet and private notes sit outside it, marked kept back. Caption: inside the wall is what you give it, outside is what you keep back." style="display:block;width:100%;height:auto;background:#efe6d2;border:1px solid #c5b68d;border-radius:7px;">
<defs><marker id="a101-hp-ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#2f6b6b"/></marker><marker id="a101-hp-ah2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#2f6b6b"/></marker></defs>
<rect x="0.5" y="0.5" width="1199" height="559" rx="7" fill="#efe6d2"/>
<rect x="12" y="12" width="1176" height="536" fill="none" stroke="#d6c8a3" stroke-width="1"/>
<rect x="400" y="26" width="700" height="92" rx="6" fill="#e4dbc4" stroke="#d6c8a3" stroke-width="1" stroke-dasharray="3 5"/>
<text x="1084" y="46" text-anchor="end" font-family="ui-monospace,Menlo,Consolas,monospace" font-size="10.5" letter-spacing="2" fill="#786c56">IN THE CLOUD</text>
<text x="1084" y="62" text-anchor="end" font-family="Inter,-apple-system,sans-serif" font-size="10" font-style="italic" fill="#786c56">outside the wall by nature</text>
<rect x="500" y="42" width="300" height="60" rx="5" fill="#efe6d2" stroke="#2f6b6b" stroke-width="2.2"/>
<circle cx="518" cy="60" r="10" fill="#efe6d2" stroke="#2f6b6b" stroke-width="1.8"/>
<text x="518" y="64" text-anchor="middle" font-family="ui-monospace,Menlo,Consolas,monospace" font-size="10" font-weight="700" fill="#2f6b6b">2</text>
<text x="660" y="66" text-anchor="middle" font-family="ui-monospace,Menlo,Consolas,monospace" font-size="13" letter-spacing="2.5" fill="#1f1a13">MODEL</text>
<text x="660" y="86" text-anchor="middle" font-family="Inter,-apple-system,sans-serif" font-size="10.5" fill="#4a4234">reads everything so far, answers with one message</text>
<path d="M 96 150 L 96 530 L 1030 530 L 1030 150 L 250 150" fill="none" stroke="#1f1a13" stroke-width="1.6" stroke-dasharray="7 6"/>
<path d="M 96 150 L 160 150" fill="none" stroke="#1f1a13" stroke-width="1.6" stroke-dasharray="7 6"/>
<text x="1018" y="518" text-anchor="end" font-family="ui-monospace,Menlo,Consolas,monospace" font-size="11" letter-spacing="2.5" fill="#1f1a13">BOUNDARY</text>
<text x="1018" y="503" text-anchor="end" font-family="Inter,-apple-system,sans-serif" font-size="10" fill="#786c56">which tools it has, and which calls are allowed</text>
<rect x="300" y="176" width="580" height="278" rx="7" fill="#e9e0ca" stroke="#786c56" stroke-width="1.4"/>
<text x="864" y="438" text-anchor="end" font-family="ui-monospace,Menlo,Consolas,monospace" font-size="10" letter-spacing="1.5" fill="#786c56">your runtime, on your machine</text>
<g fill="none" stroke="#2f6b6b" stroke-width="2.6" marker-end="url(#a101-hp-ah)">
<path d="M 511.0 238.4 A 108 108 0 0 1 669.0 238.4"/>
<path d="M 686.2 263.0 A 108 108 0 0 1 695.6 334.5"/>
<path d="M 685.4 362.7 A 108 108 0 0 1 586.2 419.9"/>
<path d="M 556.6 414.7 A 108 108 0 0 1 493.8 263.0"/>
</g>
<text x="590" y="308" text-anchor="middle" font-family="ui-monospace,Menlo,Consolas,monospace" font-size="15" letter-spacing="4" fill="#2f6b6b">LOOP</text>
<text x="590" y="326" text-anchor="middle" font-family="Inter,-apple-system,sans-serif" font-size="10.5" fill="#4a4234">one turn, then round again</text>
<circle cx="502" cy="250" r="13" fill="#efe6d2" stroke="#2f6b6b" stroke-width="2"/>
<text x="502" y="254.5" text-anchor="middle" font-family="ui-monospace,Menlo,Consolas,monospace" font-size="11" font-weight="700" fill="#2f6b6b">1</text>
<circle cx="678" cy="250" r="13" fill="#efe6d2" stroke="#2f6b6b" stroke-width="2"/>
<text x="678" y="254.5" text-anchor="middle" font-family="ui-monospace,Menlo,Consolas,monospace" font-size="11" font-weight="700" fill="#2f6b6b">3</text>
<circle cx="692" cy="349" r="13" fill="#efe6d2" stroke="#2f6b6b" stroke-width="2"/>
<text x="692" y="353.5" text-anchor="middle" font-family="ui-monospace,Menlo,Consolas,monospace" font-size="11" font-weight="700" fill="#2f6b6b">4</text>
<circle cx="571" cy="418" r="13" fill="#efe6d2" stroke="#2f6b6b" stroke-width="2"/>
<text x="571" y="422.5" text-anchor="middle" font-family="ui-monospace,Menlo,Consolas,monospace" font-size="11" font-weight="700" fill="#2f6b6b">5</text>
<text x="470" y="258" text-anchor="end" font-family="Inter,-apple-system,sans-serif" font-size="10.5" fill="#1f1a13">everything so far goes up:</text>
<text x="470" y="272" text-anchor="end" font-family="Inter,-apple-system,sans-serif" font-size="10.5" fill="#1f1a13">instructions, tools, the conversation</text>
<text x="698" y="243" font-family="Inter,-apple-system,sans-serif" font-size="10.5" fill="#1f1a13">one message comes back:</text>
<text x="698" y="257" font-family="Inter,-apple-system,sans-serif" font-size="10.5" fill="#1f1a13">some text, some tool calls</text>
<text x="712" y="345" font-family="Inter,-apple-system,sans-serif" font-size="10.5" fill="#1f1a13">each tool call:</text>
<text x="712" y="359" font-family="Inter,-apple-system,sans-serif" font-size="10.5" fill="#1f1a13">allowed? then run, here</text>
<text x="316" y="416" font-family="Inter,-apple-system,sans-serif" font-size="10.5" fill="#1f1a13">any tool call in that message?</text>
<text x="316" y="430" font-family="Inter,-apple-system,sans-serif" font-size="10.5" fill="#1f1a13">round again, without you.</text>
<text x="316" y="444" font-family="Inter,-apple-system,sans-serif" font-size="10.5" fill="#1f1a13">none? the turn ends; it waits for you.</text>
<g stroke="#2f6b6b" stroke-width="1.3" fill="#efe6d2">
<rect x="628" y="268" width="34" height="12" rx="1.5"/><path d="M 634 272 h 22 M 634 276 h 12" stroke="#786c56" stroke-width="1"/>
<rect x="623" y="278" width="34" height="12" rx="1.5"/><path d="M 629 282 h 22 M 629 286 h 12" stroke="#a05a2c" stroke-width="1"/>
<rect x="618" y="288" width="34" height="12" rx="1.5"/><path d="M 624 292 h 22 M 624 296 h 12" stroke="#a05a2c" stroke-width="1"/>
</g>
<path d="M 508 238 C 520 190 540 140 556 104" fill="none" stroke="#2f6b6b" stroke-width="2" stroke-dasharray="5 4" marker-end="url(#a101-hp-ah2)"/>
<path d="M 710 104 C 706 150 694 190 684 236" fill="none" stroke="#2f6b6b" stroke-width="2" marker-end="url(#a101-hp-ah2)"/>
<path d="M 672 238 L 672 192 L 300 192 L 262 176" fill="none" stroke="#2f6b6b" stroke-width="1.6" stroke-dasharray="4 4" marker-end="url(#a101-hp-ah2)"/>
<text x="480" y="187" text-anchor="middle" font-family="Inter,-apple-system,sans-serif" font-size="10" fill="#2f6b6b" paint-order="stroke" stroke="#e9e0ca" stroke-width="5">the text: shown to you</text>
<path d="M 706 349 L 900 349" fill="none" stroke="#2f6b6b" stroke-width="2" marker-end="url(#a101-hp-ah2)"/>
<path d="M 866 340 L 866 358 M 874 340 L 874 358" fill="none" stroke="#1f1a13" stroke-width="2"/>
<text x="870" y="333" text-anchor="middle" font-family="ui-monospace,Menlo,Consolas,monospace" font-size="9" letter-spacing="1" fill="#1f1a13">ALLOWED?</text>
<path d="M 964 396 L 964 478 L 296 478" fill="none" stroke="#2f6b6b" stroke-width="1.6" stroke-dasharray="5 4" marker-end="url(#a101-hp-ah2)"/>
<text x="630" y="473" text-anchor="middle" font-family="Inter,-apple-system,sans-serif" font-size="9.5" fill="#786c56" paint-order="stroke" stroke="#efe6d2" stroke-width="4">the result, appended to the conversation</text>
<path d="M 288 400 C 350 380 430 310 492 262" fill="none" stroke="#2f6b6b" stroke-width="1.6" stroke-dasharray="5 4" marker-end="url(#a101-hp-ah2)"/>
<text x="922" y="212" font-family="ui-monospace,Menlo,Consolas,monospace" font-size="12" letter-spacing="2.5" fill="#1f1a13">TOOLS</text>
<text x="922" y="228" font-family="Inter,-apple-system,sans-serif" font-size="10" fill="#786c56">what it can call</text>
<rect x="912" y="244" width="104" height="30" rx="4" fill="#efe6d2" stroke="#2f6b6b" stroke-width="1.6"/>
<text x="964" y="263" text-anchor="middle" font-family="ui-monospace,Menlo,Consolas,monospace" font-size="10.5" fill="#1f1a13">read files</text>
<rect x="912" y="282" width="104" height="30" rx="4" fill="#efe6d2" stroke="#2f6b6b" stroke-width="1.6"/>
<text x="964" y="301" text-anchor="middle" font-family="ui-monospace,Menlo,Consolas,monospace" font-size="10.5" fill="#1f1a13">search</text>
<rect x="912" y="320" width="104" height="30" rx="4" fill="#efe6d2" stroke="#2f6b6b" stroke-width="1.6"/>
<text x="964" y="339" text-anchor="middle" font-family="ui-monospace,Menlo,Consolas,monospace" font-size="10.5" fill="#1f1a13">run code</text>
<rect x="912" y="358" width="104" height="30" rx="4" fill="#efe6d2" stroke="#2f6b6b" stroke-width="1.6"/>
<text x="964" y="377" text-anchor="middle" font-family="ui-monospace,Menlo,Consolas,monospace" font-size="10.5" fill="#1f1a13">tickets</text>
<text x="1104" y="228" text-anchor="middle" font-family="ui-monospace,Menlo,Consolas,monospace" font-size="9.5" letter-spacing="2" fill="#a05a2c">KEPT BACK</text>
<rect x="1052" y="244" width="104" height="30" rx="4" fill="none" stroke="#a05a2c" stroke-width="1.2" stroke-dasharray="3 3"/>
<text x="1104" y="263" text-anchor="middle" font-family="ui-monospace,Menlo,Consolas,monospace" font-size="10.5" fill="#a05a2c">send mail</text>
<rect x="1052" y="282" width="104" height="30" rx="4" fill="none" stroke="#a05a2c" stroke-width="1.2" stroke-dasharray="3 3"/>
<text x="1104" y="301" text-anchor="middle" font-family="ui-monospace,Menlo,Consolas,monospace" font-size="10.5" fill="#a05a2c">payments</text>
<rect x="1052" y="440" width="104" height="26" rx="4" fill="none" stroke="#a05a2c" stroke-width="1.2" stroke-dasharray="3 3"/>
<text x="1104" y="457" text-anchor="middle" font-family="ui-monospace,Menlo,Consolas,monospace" font-size="10.5" fill="#a05a2c">salary sheet</text>
<rect x="1052" y="474" width="104" height="26" rx="4" fill="none" stroke="#a05a2c" stroke-width="1.2" stroke-dasharray="3 3"/>
<text x="1104" y="491" text-anchor="middle" font-family="ui-monospace,Menlo,Consolas,monospace" font-size="10.5" fill="#a05a2c">private notes</text>
<text x="120" y="300" font-family="ui-monospace,Menlo,Consolas,monospace" font-size="12" letter-spacing="2.5" fill="#1f1a13">CONTEXT</text>
<text x="120" y="316" font-family="Inter,-apple-system,sans-serif" font-size="10" fill="#786c56">the conversation so far</text>
<rect x="120" y="330" width="166" height="30" rx="4" fill="#efe6d2" stroke="#2f6b6b" stroke-width="1.6"/>
<text x="203" y="349" text-anchor="middle" font-family="ui-monospace,Menlo,Consolas,monospace" font-size="10.5" fill="#1f1a13">instructions, rules</text>
<rect x="120" y="368" width="166" height="30" rx="4" fill="#efe6d2" stroke="#2f6b6b" stroke-width="1.6"/>
<text x="203" y="387" text-anchor="middle" font-family="ui-monospace,Menlo,Consolas,monospace" font-size="10.5" fill="#1f1a13">your messages</text>
<rect x="120" y="406" width="166" height="30" rx="4" fill="#efe6d2" stroke="#2f6b6b" stroke-width="1.6"/>
<text x="203" y="425" text-anchor="middle" font-family="ui-monospace,Menlo,Consolas,monospace" font-size="10.5" fill="#1f1a13">tool results</text>
<g stroke="#2f6b6b" stroke-width="1.3" fill="#efe6d2">
<rect x="196" y="448" width="34" height="12" rx="1.5"/><path d="M 202 452 h 22 M 202 456 h 12" stroke="#786c56" stroke-width="1"/>
<rect x="191" y="458" width="34" height="12" rx="1.5"/><path d="M 197 462 h 22 M 197 466 h 12" stroke="#786c56" stroke-width="1"/>
<rect x="186" y="468" width="34" height="12" rx="1.5"/><path d="M 192 472 h 22 M 192 476 h 12" stroke="#786c56" stroke-width="1"/>
</g>
<text x="140" y="60" font-family="ui-monospace,Menlo,Consolas,monospace" font-size="12.5" letter-spacing="3" fill="#a05a2c">YOU, ONE LEVEL UP</text>
<text x="140" y="78" font-family="Inter,-apple-system,sans-serif" font-size="10.5" fill="#4a4234">you draw the wall: what you give it, what you keep back</text>
<circle cx="205" cy="104" r="8" fill="none" stroke="#a05a2c" stroke-width="1.8"/>
<path d="M 191 132 C 191 118 219 118 219 132" fill="none" stroke="#a05a2c" stroke-width="1.8"/>
<path d="M 205 134 L 205 150" fill="none" stroke="#a05a2c" stroke-width="1.6" stroke-dasharray="3 3"/>
<text x="205" y="172" text-anchor="middle" font-family="ui-monospace,Menlo,Consolas,monospace" font-size="11" letter-spacing="2.5" fill="#1f1a13">INTERFACE</text>
<text x="205" y="187" text-anchor="middle" font-family="Inter,-apple-system,sans-serif" font-size="10" fill="#786c56">where you meet it: your message in, its text out</text>
<circle cx="150" cy="232" r="14" fill="none" stroke="#1f1a13" stroke-width="1.6"/>
<circle cx="150" cy="232" r="7" fill="none" stroke="#1f1a13" stroke-width="1.6"/>
<circle cx="150" cy="232" r="2.2" fill="#1f1a13"/>
<text x="172" y="229" font-family="ui-monospace,Menlo,Consolas,monospace" font-size="11" letter-spacing="2.5" fill="#1f1a13">GOAL</text>
<text x="172" y="243" font-family="Inter,-apple-system,sans-serif" font-size="10" fill="#786c56">your message: what it works toward</text>
<text x="600" y="547" text-anchor="middle" font-family="Inter,-apple-system,sans-serif" font-size="11" font-style="italic" fill="#2f6b6b">Inside the wall is what you give it. Outside is what you keep back.</text>
</svg>
</figure>
