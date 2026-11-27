/* =============================================================
   SHARED SPELLING STEP (type a whole word, optionally say it first)
   o: {word, emoji, title, progress, hint, say (offer microphone), noAudio (picture quest)}
   cb(result): {mistakes, said, usedHint}
   ============================================================= */
function spellStep(o, cb){
  const word = o.word, useMic = !!SR && P().micMode==="mic";
  let pos = 0, mistakes = 0, wrongHere = 0, flash = false, done = false, said = false, usedHint = false, listening = false, sayMsg = "";
  function draw(msg, cls){
    const sayBtn = !o.say ? "" : useMic
      ? `<button class="${listening?"alt pulse":"ghost"}" id="sayit" ${done||said?"disabled":""}>🎤 ${said?"You said it! ✅":listening?"Listening…":"Say it"}</button>`
      : `<button class="${said?"ok":"ghost"}" id="sayit" ${done||said?"disabled":""}>👩‍👧 ${said?"She said it! ✅":"She said it"}</button>`;
    view(`<div class="card"><h2>${o.title}</h2>
      <div class="bar"><div style="width:${o.progress*100}%"></div></div>
      ${o.emoji?`<div class="big" style="margin-top:8px">${o.emoji}</div>`:`<div class="big">🔊</div>`}
      <div style="font-size:18px;min-height:26px">${o.hint||""}${o.say&&!useMic?" A grown-up taps “She said it” for bonus stars.":""}</div>
      <div class="row">${sayBtn}<button class="ghost" id="hear">🔊 ${o.noAudio&&!usedHint?"Hint: hear it":"Hear the word"}</button></div>
      <div class="letters">${word.split("").map((c,k)=>`<div class="lt ${word.length>6?"sm":""} ${k<pos?"good":(k===pos&&flash?"bad":(k===pos?"blank active":"blank"))}">${k<pos?c:""}</div>`).join("")}</div>
      <div class="msg ${cls||""}">${sayMsg&&!msg?sayMsg:(msg||"")}</div>
      <div class="keys">${"abcdefghijklmnopqrstuvwxyz".split("").map(c=>`<button data-c="${c}">${c}</button>`).join("")}</div></div>`, ()=>{
        $("#hear").onclick = ()=>{ usedHint = true; speak(word); };
        const sb = $("#sayit"); if(sb) sb.onclick = sayIt;
        $$(".keys button").forEach(b=>b.onclick=()=>press(b.dataset.c));
        document.onkeydown = e=>{ if(e.key.length===1 && /[a-z]/i.test(e.key)) press(e.key.toLowerCase()); };
      });
  }
  function sayIt(){
    if(listening || said || done) return;
    if(!useMic){ said = true; sayMsg = "Great saying it! Now spell it."; sndGood(); draw(); return; }
    listening = true; sayMsg = "🎧 Listening…"; draw();
    const wd = setTimeout(()=>{ if(listening){ listening = false; stopListening(); sayMsg = micMessage("not-allowed"); draw(); } }, 8000); timers.push(wd);
    listen(alts=>{
      clearTimeout(wd); listening = false;
      if(heard(alts, word.toLowerCase())){ said = true; sayMsg = "I heard you say it! Now spell it."; sndGood(); }
      else sayMsg = `I heard “${alts[0]}”. Try again, or just spell it!`;
      draw();
    }, err=>{ clearTimeout(wd); listening = false; sayMsg = micMessage(err); draw(); });
  }
  function press(c){
    if(done) return;
    if(c === word[pos].toLowerCase()){
      pos++; wrongHere = 0; sndGood();
      if(pos >= word.length){
        done = true; speak(word); draw(`${word}!`, "good-t");
        later(()=>cb({mistakes, said, usedHint}), 1500);
      } else draw();
    } else {
      mistakes++; wrongHere++; sndBad();
      if(wrongHere >= 3){
        pos++; wrongHere = 0; speak(word);
        if(pos >= word.length){ done = true; draw(`The word is ${word}. Say it with me!`, "bad-t"); later(()=>cb({mistakes, said, usedHint}), 2500); return; }
        draw("I'll help with that letter. Keep going!", "bad-t");
      } else { flash = true; draw("Not that letter. Try again!", "bad-t"); later(()=>{ flash = false; draw(); }, 700); }
    }
  }
  draw();
  if(!o.noAudio) later(()=>speak(word), 250);
}
function spellPoints(r, base=10){
  let pts = r.mistakes===0 ? base : r.mistakes<=2 ? Math.round(base*0.6) : Math.round(base*0.3);
  if(r.said) pts += 3;
  if(r.usedHint) pts = Math.max(2, pts-3);
  return pts;
}

/* =============================================================
   CHAPTER 1: MISSING LETTERS (1 to 3 blanks per word)
   ============================================================= */
MENU.c1 = ()=>levelMenu("c1", WORD_LEVELS.map(l=>`${l.name} · ${l.blanks} missing letter${l.blanks>1?"s":""}`));
RUN.c1 = level=>{
  const L = WORD_LEVELS[level-1], nbMax = Math.min(L.blanks, 3);
  const pool = uniq(L.words), weak = pool.filter(w=>isWeak("w:"+w));
  const qs = uniq([...pick(weak,3), ...shuffle(pool)]).slice(0, CONFIG.questionsPerRound);
  const run = {pts:0, first:0}; let i = 0;
  function q(){
    if(i >= qs.length) return finishScreen("c1", level, run, run.first/qs.length);
    const w = qs[i], nb = Math.min(nbMax, Math.max(1, w.length-2));
    const idxs = pick([...Array(w.length).keys()], nb).sort((a,b)=>a-b);
    let cur = 0, mistakes = 0, wrongHere = 0, flash = false, done = false;
    function draw(msg, cls){
      view(`<div class="card"><h2>Missing Letters ${i+1}/${qs.length}</h2>
        <div class="bar"><div style="width:${i/qs.length*100}%"></div></div>
        ${L.rule?`<div class="rulebox">📘 ${L.rule}</div>`:""}<p style="font-size:20px;margin-bottom:0">Listen, then type the ${nb>1?nb+" ":""}missing letter${nb>1?"s":""}!</p>
        <button id="say">🔊 Hear the word</button>
        <div class="letters">${w.split("").map((ch,k)=>{
          const bi = idxs.indexOf(k), sm = w.length>7?"sm":"";
          if(bi<0) return `<div class="lt ${sm}">${ch}</div>`;
          if(bi<cur||done) return `<div class="lt good ${sm}">${ch}</div>`;
          return `<div class="lt ${sm} ${bi===cur?(flash?"bad":"blank active"):"blank"}">?</div>`;
        }).join("")}</div>
        <div class="msg ${cls||""}">${msg||""}</div>
        <div class="keys">${"abcdefghijklmnopqrstuvwxyz".split("").map(c=>`<button data-c="${c}">${c}</button>`).join("")}</div></div>`, ()=>{
          $("#say").onclick = ()=>speak(w);
          $$(".keys button").forEach(b=>b.onclick=()=>press(b.dataset.c));
          document.onkeydown = e=>{ if(e.key.length===1 && /[a-z]/i.test(e.key)) press(e.key.toLowerCase()); };
        });
    }
    function press(c){
      if(done) return;
      if(c === w[idxs[cur]]){
        cur++; wrongHere = 0; sndGood();
        if(cur >= nb){ finishWord(); } else draw(`Good! ${nb-cur} to go.`, "good-t");
      } else {
        mistakes++; wrongHere++; sndBad();
        if(wrongHere >= 3){ cur++; wrongHere = 0; speak(w); if(cur>=nb){ finishWord(); } else draw("I'll help with that one. Keep going!", "bad-t"); }
        else { flash = true; draw("Not quite. Listen and try again!", "bad-t"); speak(w); later(()=>{ flash=false; draw(); }, 800); }
      }
    }
    function finishWord(){
      done = true;
      const base = 8 + 2*nb, pts = mistakes===0 ? base : mistakes<=2 ? Math.round(base*0.6) : Math.round(base*0.3);
      if(mistakes===0){ run.first++; stat("w:"+w).ok++; } else stat("w:"+w).miss++;
      run.pts += pts; addPoints(pts); speak(w);
      draw(`Yes! ${w} (+${pts} ⭐)`, "good-t"); later(()=>{ i++; q(); }, 1500);
    }
    draw(); later(()=>speak(w), 250);
  }
  q();
};

/* =============================================================
   CHAPTER 2: SAY THE SOUNDS (microphone)
   ============================================================= */
const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
let recog = null;
function stopListening(){ try{ if(recog){ recog.onresult=recog.onerror=recog.onend=recog.onstart=null; recog.abort(); } }catch(e){} recog = null; }
function listen(onAlts, onFail, onStart){
  stopListening();
  let finished = false;
  const fail = code => { if(!finished){ finished = true; onFail(code); } };
  try{
    recog = new SR(); recog.lang = "en-AU"; recog.interimResults = false; recog.maxAlternatives = 5; recog.continuous = false;
    recog.onstart = ()=>{ if(onStart) onStart(); };
    recog.onresult = e=>{ if(finished) return; finished = true; onAlts([...e.results[0]].map(a=>a.transcript.toLowerCase())); };
    recog.onerror = e=>fail(e.error || "error");
    recog.onend = ()=>fail("no-speech");
    recog.start();
  }catch(e){ fail("error"); }
}
function micMessage(code){
  switch(code){
    case "not-allowed": case "service-not-allowed": return "The browser blocked the microphone. Click the 🔒 or 🎤 icon next to the address bar, choose Allow, then reload this page.";
    case "audio-capture": return "No microphone was found. Check that one is plugged in and chosen in Windows Sound settings.";
    case "network": return "The browser's speech service could not be reached. It needs the internet, and often fails when the game is opened as a file. See the mic help.";
    case "no-speech": return "I didn't hear anything. Tap the mic and speak a bit louder.";
    case "language-not-supported": return "The browser doesn't support this language for listening.";
    default: return "Listening didn't work ("+code+"). See the mic help.";
  }
}
function heard(alts, key){
  const words = alts.join(" ").replace(/[^a-z\s'-]/g," ").split(/\s+/);
  return words.includes(key) || words.includes(key+"s");
}
function setMicMode(on){ const p = P(); p.micMode = on ? "mic" : "grownup"; saveDB(); }
MENU.c2 = ()=>{
  levelMenu("c2", Object.values(SOUND_GROUPS).map(l=>l.map(x=>x[0]).join("  ")));
  const p = P(), card = $(".card"), box = document.createElement("div");
  box.style.cssText = "background:#fff8d6;border-radius:16px;padding:10px;margin:8px 0";
  const on = p.micMode==="mic";
  box.innerHTML = `<b>How are the sounds checked?</b>
    <div class="row"><button class="opt ${on?"ghost":"on"}" id="modeG">👩‍👧 Grown-up taps “She said it”</button><button class="opt ${on?"on":"ghost"}" id="modeM" ${SR?"":"disabled"}>🎤 Microphone listens</button></div>
    ${on?`<div><button class="small" id="micTest">🎤 Test microphone</button></div><div id="micOut" style="font-size:18px;min-height:24px"></div>
    <details style="text-align:left;font-size:16px"><summary>Mic help</summary><ol>
      <li>Use <b>Chrome</b> or <b>Edge</b> and be online.</li><li>Click <b>Allow</b> when asked for the microphone.</li>
      <li>If it fails when opened as a file, host the game at a normal web address (for example Netlify Drop).</li>
      <li>Windows: Settings, Privacy &amp; security, Microphone: allow your browser.</li></ol></details>`:`<div style="font-size:16px">She says the sound and the picture word out loud, and you tap the green button when she gets it right.</div>`}`;
  card.insertBefore(box, card.children[2]);
  $("#modeG").onclick = ()=>{ setMicMode(false); MENU.c2(); };
  $("#modeM").onclick = ()=>{ setMicMode(true); MENU.c2(); };
  const mt = $("#micTest");
  if(mt) mt.onclick = ()=>{
    const out = $("#micOut"); out.textContent = "Asking for the microphone… say “hello”";
    listen(alts=>{ out.innerHTML = `<span class="good-t">✅ It works! I heard: “${esc(alts[0])}”</span>`; },
           err=>{ out.innerHTML = `<span class="bad-t">${esc(micMessage(err))}</span>`; },
           ()=>{ out.textContent = "🎧 Listening… say “hello”"; });
  };
};
RUN.c2 = group=>{
  const qs = shuffle(SOUND_GROUPS[group]).slice(0, CONFIG.soundsPerRound);
  const useMic = !!SR && P().micMode==="mic";
  const run = {pts:0, first:0}; let i = 0;
  function q(){
    if(i >= qs.length) return finishScreen("c2", group, run, run.first/qs.length, 0.7, 0.4);
    const [g, key, emoji] = qs[i], sk = "s:"+g+":"+key;
    let attempts = 0, done = false, listening = false, lastHeard = "", gu = 0;
    function draw(msg, cls){
      view(`<div class="card"><h2>Say the sound ${i+1}/${qs.length}</h2>
        <div class="bar"><div style="width:${i/qs.length*100}%"></div></div>
        <div class="giant" style="margin:10px 0">${g}</div>
        <div class="big">${emoji}</div>
        <div style="font-size:22px">${done?`<b>${key}</b>`:"Say the sound, then say the picture word!"}</div>
        <div class="msg ${cls||""}">${listening?"🎧 Listening…":(msg||"")}</div>
        ${useMic ? `<div><button class="${listening?"alt pulse":"ok"}" id="mic" ${done?"disabled":""}>🎤 ${listening?"Listening…":"Tap and say it!"}</button>
          <button id="hear">🔊 Hear the word</button></div>
          <div><button class="small ghost" id="grown" ${done?"disabled":""}>👩‍👧 She said it</button> <button class="small ghost" id="skip" ${done?"disabled":""}>Skip ➜</button></div>`
        : `<div style="font-size:18px;margin-bottom:6px">Grown-up: listen, then tap the green button.</div>
          <div><button class="ok" id="grown" style="font-size:28px;padding:14px 26px" ${done?"disabled":""}>👩‍👧 She said it ✔</button></div>
          <div><button id="hear">🔊 Hear the word</button> <button class="small ghost" id="skip" ${done?"disabled":""}>Not yet ➜</button></div>`}
        </div>`, ()=>{
          $("#hear").onclick = ()=>speak(key);
          $("#grown").onclick = ()=>{ if(!done && attempts===0) run.first++; success(attempts===0?8:4, "Great saying! 👏"); };
          $("#skip").onclick = ()=>{ if(!done){ stat(sk).miss++; i++; q(); } };
          const m = $("#mic"); if(m) m.onclick = start;
        });
    }
    function success(pts, msg){
      if(done) return; done = true; listening = false; stopListening();
      stat(sk).ok++; run.pts += pts; addPoints(pts); sndGood(); speak(key);
      draw(`${msg} +${pts} ⭐`, "good-t"); later(()=>{ i++; q(); }, 1500);
    }
    function start(){
      if(done || listening) return;
      listening = true; draw();
      const wd = setTimeout(()=>{ if(listening){ listening = false; stopListening(); draw(micMessage("not-allowed")+" (Nothing happened after a few seconds.)", "bad-t"); } }, 8000); timers.push(wd);
      listen(alts=>{
        clearTimeout(wd); listening = false;
        if(heard(alts, key)){ if(attempts===0) run.first++; success(attempts===0?8:4, "I heard you!"); }
        else { lastHeard = alts[0]; miss(); }
      }, err=>{ clearTimeout(wd); listening = false; draw(micMessage(err), "bad-t"); });
    }
    function miss(){
      attempts++; if(attempts===1) stat(sk).miss++; sndBad();
      if(attempts>=3){ done = true; draw(`It says ${g}, like in ${key}. Listen!`, "bad-t"); speak(key); later(()=>{ i++; q(); }, 2800); }
      else draw(`I heard “${lastHeard}”. Try again: say the sound, then the word “${key}”.`, "bad-t");
    }
    draw(); later(()=>speak(key), 300);
  }
  q();
};

/* =============================================================
   CHAPTER 3: DIGRAPH LESSONS (meet, sort by sound, spell)
   ============================================================= */
const hlWord = (L,w)=>{ const i = L.atEnd ? w.lastIndexOf(L.dg) : w.indexOf(L.dg); return i<0 ? w : w.slice(0,i)+`<span class="hl">${L.dg}</span>`+w.slice(i+L.dg.length); };
MENU.c3 = ()=>levelMenu("c3", LESSONS.map(l=>`<span class="dgname" style="font-size:34px">“${l.dg}”</span> · ${l.sounds.length} sound${l.sounds.length>1?"s":""}`));
RUN.c3 = level=>{
  const L = LESSONS[level-1];
  const all = L.sounds.flatMap((s,si)=>s.words.map(([w,e])=>({w, e, si})));
  const sortQs = (()=>{
    const per = Math.max(1, Math.floor(8/L.sounds.length)); let out = [];
    L.sounds.forEach((s,si)=>{ out.push(...pick(all.filter(x=>x.si===si), Math.min(per, s.words.length))); });
    const weak = all.filter(x=>isWeak("x:"+x.w) && !out.includes(x));
    out = out.concat(pick(weak,2));
    const rest = shuffle(all.filter(x=>!out.includes(x)));
    while(out.length < 8 && rest.length) out.push(rest.pop());
    return shuffle(out).slice(0,8);
  })();
  const spellQs = shuffle(all.filter(x=>x.e)).concat(shuffle(all.filter(x=>!x.e))).slice(0,6);
  const run = {pts:0, sortFirst:0, spellFirst:0};

  function meet(){
    view(`<div class="card"><h2>📗 Lesson ${level}</h2><div class="dgname">“${L.dg}”</div><p style="font-size:22px">${L.intro}</p>
      ${L.sounds.map((s,si)=>`<div class="item" style="margin:10px 0"><div style="font-size:24px"><b class="hl">${L.dg}</b> says <b>${s.say}</b> <span style="font-size:34px">${s.keyPic}</span></div>
        <div>${s.words.map(([w,e])=>`<button class="ghost wordbtn" data-w="${w}">${e} ${hlWord(L,w)}</button>`).join("")}</div></div>`).join("")}
      <p style="font-size:18px">Tap a word to hear it!</p>
      <button class="ok" id="go">I'm ready ▶</button></div>`, ()=>{
        $$("[data-w]").forEach(b=>b.onclick=()=>speak(b.dataset.w));
        $("#go").onclick = sort;
      });
  }
  function sort(){
    let i = 0;
    function q(){
      if(i >= sortQs.length) return spell();
      const x = sortQs[i]; let attempts = 0, done = false, wrongSet = [];
      function draw(msg, cls){
        view(`<div class="card"><h2>Which sound? ${i+1}/${sortQs.length}</h2>
          <div class="bar"><div style="width:${i/sortQs.length*100}%"></div></div>
          ${x.e?`<div class="big">${x.e}</div>`:""}
          <div class="giant" style="font-size:64px;color:#33265a;margin:6px">${hlWord(L,x.w)}</div>
          <button id="say">🔊 Hear the word</button>
          <p style="font-size:20px;margin:6px">What sound does <b class="hl">${L.dg}</b> make here?</p>
          <div class="msg ${cls||""}">${msg||""}</div>
          <div class="row">${L.sounds.map((s,si)=>`<button class="ghost" style="font-size:22px" data-s="${si}" ${done||wrongSet.includes(si)?"disabled":""}>${s.keyPic} ${s.say}</button>`).join("")}</div></div>`, ()=>{
            $("#say").onclick = ()=>speak(x.w);
            $$("[data-s]").forEach(b=>b.onclick=()=>choose(+b.dataset.s));
          });
      }
      function choose(si){
        if(done) return;
        if(si === x.si){
          done = true; const pts = attempts===0?8:attempts===1?4:2; if(attempts===0){ run.sortFirst++; stat("x:"+x.w).ok++; }
          run.pts += pts; addPoints(pts); sndGood(); speak(x.w);
          draw(`Yes! ${L.dg} says “${L.sounds[x.si].say}” in ${x.w}. +${pts} ⭐`, "good-t"); later(()=>{ i++; q(); }, 1700);
        } else {
          attempts++; wrongSet.push(si); sndBad(); if(attempts===1) stat("x:"+x.w).miss++;
          if(attempts >= L.sounds.length-1 || attempts>=3){ done = true; draw(`In ${x.w}, ${L.dg} says “${L.sounds[x.si].say}”.`, "bad-t"); speak(x.w); later(()=>{ i++; q(); }, 2600); }
          else { draw("Not quite. Listen again and try!", "bad-t"); speak(x.w); }
        }
      }
      draw(); later(()=>speak(x.w), 250);
    }
    q();
  }
  function spell(){
    let i = 0;
    function q(){
      if(i >= spellQs.length) return finishScreen("c3", level, run, (run.sortFirst/sortQs.length*0.5 + run.spellFirst/spellQs.length*0.5), 0.75, 0.5);
      const x = spellQs[i], s = L.sounds[x.si];
      spellStep({word:x.w, emoji:x.e, title:`✏️ Spell it ${i+1}/${spellQs.length}`, progress:i/spellQs.length, hint:`Listen for <b class="hl">${L.dg}</b> (${s.say})`}, r=>{
        const pts = spellPoints(r, 10); if(r.mistakes===0){ run.spellFirst++; stat("x:"+x.w).ok++; } else stat("x:"+x.w).miss++;
        run.pts += pts; addPoints(pts); i++; q();
      });
    }
    q();
  }
  meet();
};

/* =============================================================
   CHAPTER 6: DIGRAPH DAILY TEST (revisits every sound learned in Chapter 3)
   Each day it picks the sounds tested least recently (and any she finds hard),
   asks which sound the digraph makes, then spells a few of the words.
   ============================================================= */
MENU.c6 = ()=>subjectScreen("phonics");
RUN.c6 = ()=>{
  const p = P(); p.c6 = p.c6 || {seen:{}, recent:[], count:0};
  const lessons = LESSONS.map((L,i)=>({L,i})).filter(x=>(p.done.c3[x.i+1]||0)>=1);
  if(!lessons.length) return home();
  const pairs = lessons.flatMap(({L})=>L.sounds.map((sd,si)=>({L, si, key:L.dg+":"+si})));
  const isHard = x => x.L.sounds[x.si].words.some(([w])=>isWeak("x:"+w));
  const order = shuffle(pairs).map(x=>({x, t: isHard(x) ? "" : (p.c6.seen[x.key]||"")})).sort((a,b)=>a.t<b.t?-1:a.t>b.t?1:0).map(o=>o.x);
  const chosen = order.slice(0, Math.min(8, order.length));
  const used = new Set(), qs = [];
  for(let i=0; qs.length<8 && i<40; i++){
    const x = chosen[i % chosen.length], ws = x.L.sounds[x.si].words.filter(([w])=>!used.has(w));
    if(!ws.length){ if(i>=chosen.length*3) break; continue; }
    const fresh = ws.filter(([w])=>!p.c6.recent.includes(w)), src = fresh.length ? fresh : ws;
    const [w,e] = pick(src,1)[0]; used.add(w); qs.push({w, e, L:x.L, si:x.si, key:x.key});
  }
  const sortQs = shuffle(qs);
  const spellQs = shuffle(qs.filter(q=>q.e)).concat(shuffle(qs.filter(q=>!q.e))).slice(0, Math.min(4, qs.length));
  const run = {pts:0, sortFirst:0, spellFirst:0};
  const mark = q=>{ p.c6.seen[q.key] = todayStr(); p.c6.recent.push(q.w); if(p.c6.recent.length>80) p.c6.recent.shift(); };

  function intro(){
    const dgs = [...new Set(chosen.map(x=>x.L.dg))];
    view(`<div class="card"><h1>🧪 Digraph Daily Test</h1>
      <p style="font-size:22px">Today we practise these digraphs. Which sound do they make?</p>
      <div>${dgs.map(d=>`<span class="dgname" style="margin:0 10px">“${d}”</span>`).join("")}</div>
      <p style="font-size:18px">${sortQs.length} listening questions, then ${spellQs.length} spelling words.</p>
      <button class="ok" id="go">Start ▶</button></div>`, ()=>{ $("#go").onclick = sort; });
  }
  function sort(){
    let i = 0;
    function q(){
      if(i >= sortQs.length) return spell();
      const x = sortQs[i], L = x.L; let attempts = 0, done = false, wrongSet = [];
      function draw(msg, cls){
        view(`<div class="card"><h2>🧪 Which sound? ${i+1}/${sortQs.length}</h2>
          <div class="bar"><div style="width:${i/sortQs.length*100}%"></div></div>
          ${x.e?`<div class="big">${x.e}</div>`:""}
          <div class="giant" style="font-size:64px;color:#33265a;margin:6px">${hlWord(L,x.w)}</div>
          <button id="say">🔊 Hear the word</button>
          <p style="font-size:20px;margin:6px">What sound does <span class="dgname" style="font-size:30px">“${L.dg}”</span> make here?</p>
          <div class="msg ${cls||""}">${msg||""}</div>
          <div class="row">${L.sounds.map((sd,k)=>`<button class="ghost" style="font-size:22px" data-s="${k}" ${done||wrongSet.includes(k)?"disabled":""}>${sd.keyPic} ${sd.say}</button>`).join("")}</div></div>`, ()=>{
            $("#say").onclick = ()=>speak(x.w);
            $$("[data-s]").forEach(b=>b.onclick=()=>choose(+b.dataset.s));
          });
      }
      function choose(k){
        if(done) return;
        if(k === x.si){
          done = true; const pts = attempts===0?8:attempts===1?4:2; if(attempts===0){ run.sortFirst++; stat("x:"+x.w).ok++; }
          mark(x); run.pts += pts; addPoints(pts); sndGood(); speak(x.w);
          draw(`Yes! ${L.dg} says “${L.sounds[x.si].say}” in ${x.w}. +${pts} ⭐`, "good-t"); later(()=>{ i++; q(); }, 1700);
        } else {
          attempts++; wrongSet.push(k); sndBad(); if(attempts===1) stat("x:"+x.w).miss++;
          if(attempts >= L.sounds.length-1 || attempts>=3){ done = true; mark(x); draw(`In ${x.w}, ${L.dg} says “${L.sounds[x.si].say}”.`, "bad-t"); speak(x.w); later(()=>{ i++; q(); }, 2600); }
          else { draw("Not quite. Listen again and try!", "bad-t"); speak(x.w); }
        }
      }
      draw(); later(()=>speak(x.w), 250);
    }
    q();
  }
  function spell(){
    let i = 0;
    function q(){
      if(i >= spellQs.length){ p.c6.count = (p.c6.count||0)+1; return finishScreen("c6", 1, run, (run.sortFirst/sortQs.length*0.6 + run.spellFirst/spellQs.length*0.4), 0.8, 0.5); }
      const x = spellQs[i], sd = x.L.sounds[x.si];
      spellStep({word:x.w, emoji:x.e, title:`✏️ Spell it ${i+1}/${spellQs.length}`, progress:i/spellQs.length, hint:`Listen for <b class="hl">${x.L.dg}</b> (${sd.say})`}, r=>{
        const pts = spellPoints(r, 10); if(r.mistakes===0){ run.spellFirst++; stat("x:"+x.w).ok++; } else stat("x:"+x.w).miss++;
        run.pts += pts; addPoints(pts); i++; q();
      });
    }
    q();
  }
  intro();
};

