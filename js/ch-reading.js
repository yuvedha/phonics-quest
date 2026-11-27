/* =============================================================
   CHAPTER 8: READING ROCKET (sentences and mini stories matched to the phonics so far)
   She reads aloud, a grown-up taps "She read it!", then she answers a question.
   ============================================================= */
/* ---- Listening to a whole sentence (Reading Rocket). Continuous, so slow readers can pause. ---- */
const NUMW = ["zero","one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen","twenty"];
function normHeard(t){ return t.toLowerCase().replace(/\b(\d{1,2})\b/g,(m,d)=>NUMW[+d]||m).replace(/[^a-z\s']/g," ").replace(/'/g,"").split(/\s+/).filter(Boolean); }
function matchSentence(text, spoken){
  const target = text.split(/\s+/).map(t=>t.toLowerCase().replace(/[^a-z]/g,"")).filter(Boolean);
  const bag = normHeard(spoken), used = new Set();
  const ok = target.map(w=>{ let k = bag.findIndex((h,j)=>!used.has(j) && (h===w || h===w+"s" || h+"s"===w || (w.length>=4 && h.length>=4 && (h.startsWith(w)||w.startsWith(h)) && Math.abs(h.length-w.length)<=1))); if(k>=0){ used.add(k); return true; } return false; });
  return {ok, ratio: ok.filter(Boolean).length/Math.max(1,target.length)};
}
let sRecog = null;
function stopSentence(){ try{ if(sRecog){ sRecog.onresult=sRecog.onerror=sRecog.onend=sRecog.onstart=null; sRecog.abort(); } }catch(e){} sRecog = null; }
function listenSentence(onText, onDone, onFail, onStart, isComplete){
  stopSentence(); let finished = false, text = "", idle = null, hard = null;
  const finish = ()=>{ if(finished) return; finished = true; clearTimeout(idle); clearTimeout(hard); try{ sRecog && sRecog.stop(); }catch(e){} onDone(text.trim()); };
  const fail = c=>{ if(finished) return; finished = true; clearTimeout(idle); clearTimeout(hard); onFail(c); };
  try{
    sRecog = new SR(); sRecog.lang = "en-AU"; sRecog.interimResults = true; sRecog.continuous = true; sRecog.maxAlternatives = 1;
    sRecog.onstart = ()=>{ if(onStart) onStart(); hard = setTimeout(finish, 45000); };
    sRecog.onresult = e=>{ text = [...e.results].map(r=>r[0].transcript).join(" "); onText(text); clearTimeout(idle);
      idle = setTimeout(finish, (isComplete && isComplete(text)) ? 900 : 3500); };
    sRecog.onerror = e=>{ if(e.error==="no-speech" && text) return finish(); fail(e.error || "error"); };
    sRecog.onend = ()=>{ text ? finish() : fail("no-speech"); };
    sRecog.start();
  }catch(e){ fail("error"); }
  return finish;
}
MENU.c8 = ()=>{
  levelMenu("c8", READING.map(l=>l.name));
  const p = P(), card = $(".card"), box = document.createElement("div"), on = p.micMode==="mic";
  box.style.cssText = "background:#fff8d6;border-radius:16px;padding:10px;margin:8px 0";
  box.innerHTML = `<b>How is her reading checked?</b>
    <div class="row"><button class="opt ${on?"ghost":"on"}" id="modeG">👩‍👧 Grown-up taps “She read it”</button><button class="opt ${on?"on":"ghost"}" id="modeM" ${SR?"":"disabled"}>🎤 Microphone listens</button></div>
    ${on?`<div><button class="small" id="micTest">🎤 Test microphone</button></div><div id="micOut" style="font-size:18px;min-height:24px"></div>
      <div style="font-size:16px">She reads the sentence out loud. The microphone shows which words it heard in green. A grown-up can always tap “She read it” instead.</div>`:`<div style="font-size:16px">${SR?"A grown-up listens and taps the green button.":"This browser can't listen. Use Chrome or Edge."}</div>`}`;
  card.insertBefore(box, card.children[2]);
  $("#modeG").onclick = ()=>{ setMicMode(false); MENU.c8(); };
  $("#modeM").onclick = ()=>{ setMicMode(true); MENU.c8(); };
  const mt = $("#micTest");
  if(mt) mt.onclick = ()=>{
    const out = $("#micOut"); out.textContent = "Asking for the microphone… say “hello”";
    listen(alts=>{ out.innerHTML = `<span class="good-t">✅ It works! I heard: “${esc(alts[0])}”</span>`; },
           err=>{ out.innerHTML = `<span class="bad-t">${esc(micMessage(err))}</span>`; },
           ()=>{ out.textContent = "🎧 Listening… say “hello”"; });
  };
};
RUN.c8 = level=>{
  const L = READING[level-1], items = shuffle(L.items).slice(0, 6), n = items.length;
  const run = {pts:0, first:0, score:0};
  let i = 0;
  const clean = w => w.replace(/[^A-Za-z]/g,"");
  function sentHTML(t, small){
    return `<div class="sent ${small?"small":""}">${t.split(/\s+/).map(tok=>{
      const c = clean(tok); let shown = tok;
      if(c){ const lc = c.toLowerCase(); for(const h of L.hl){ const k = lc.indexOf(h); if(k>=0){ const at = tok.toLowerCase().indexOf(h); shown = tok.slice(0,at)+"<b>"+tok.slice(at,at+h.length)+"</b>"+tok.slice(at+h.length); break; } } }
      return `<span class="rw" data-w="${c}">${shown}</span>`; }).join(" ")}</div>`;
  }
  const wire = ()=>$$(".rw").forEach(e=>e.onclick=()=>{ if(e.dataset.w) speak(e.dataset.w); });
  function read(){
    if(i >= n) return finishScreen("c8", level, run, run.score/n, 0.8, 0.5);
    const [t,q,a,w,e] = items[i]; let helped = false; const useMic = !!SR && P().micMode==="mic";
    view(`<div class="card"><h2>🚀 Read it! ${i+1}/${n}</h2>
      <div class="bar"><div style="width:${i/n*100}%"></div></div>
      <div class="rulebox">📘 ${L.focus}</div>
      <div class="big">${e}</div>${sentHTML(t)}
      <p style="font-size:16px;margin:2px">Tap any word to hear it.</p>
      <div class="row"><button id="hear" class="ghost">🔊 Hear it</button><button id="slow" class="ghost">🐢 Word by word</button></div>
      ${useMic?`<div style="margin-top:6px"><button id="mic" style="font-size:24px">🎤 Tap and read it out loud</button><div id="micOut" style="font-size:18px;min-height:26px;margin:4px"></div></div>`:""}
      <div style="margin-top:8px"><button class="${useMic?"ghost small":"ok"}" id="did">✅ ${useMic?"Grown-up: she read it":"She read it!"}</button></div></div>`, ()=>{
        wire();
        const mb = $("#mic");
        if(mb) mb.onclick = ()=>{
          const out = $("#micOut"), words = $$(".rw"); let stop = null;
          const paint = txt=>{ const m = matchSentence(t, txt); words.forEach((el,j)=>{ el.style.background = m.ok[j] ? "#c8f2d2" : (txt ? "#ffd6dc" : ""); }); return m; };
          mb.disabled = true; out.textContent = "Asking for the microphone…";
          stop = listenSentence(txt=>{ paint(txt); out.innerHTML = `🎧 I'm listening… <button class="small" id="mdone">I'm done</button>`; const d = $("#mdone"); if(d) d.onclick = ()=>stop && stop(); },
            txt=>{ const m = paint(txt);
              if(m.ratio >= 0.8){ out.innerHTML = `<span class="good-t">🌟 Great reading!</span>`; const pts = helped?3:6; run.pts += pts; addPoints(pts); sndGood(); later(()=>check(helped, true), 1200); }
              else { mb.disabled = false; out.innerHTML = `<span class="bad-t">Nearly! The pink words need another go. Tap the microphone and try again.</span>`; setMood("oops"); } },
            err=>{ mb.disabled = false; out.innerHTML = `<span class="bad-t">${esc(micMessage(err))}</span>`; },
            ()=>{ out.innerHTML = `🎧 I'm listening… read the sentence! <button class="small" id="mdone">I'm done</button>`; const d = $("#mdone"); if(d) d.onclick = ()=>stop && stop(); },
            txt=>{ const m = matchSentence(t, txt); return m.ratio>=0.8 && m.ok[m.ok.length-1]; });
        };
        $("#hear").onclick = ()=>{ helped = true; speak(t); };
        $("#slow").onclick = ()=>{ helped = true; const ws = $$(".rw"); ws.forEach((el,j)=>later(()=>{ ws.forEach(x=>x.classList.remove("on")); el.classList.add("on"); if(el.dataset.w) speak(el.dataset.w); }, j*1000)); later(()=>ws.forEach(x=>x.classList.remove("on")), ws.length*1000); };
        $("#did").onclick = ()=>{ stopSentence(); const pts = helped?3:6; run.pts += pts; addPoints(pts); sndGood(); check(helped); };
      });
  }
  function check(helped, byMic){
    const [t,q,a,w,e] = items[i], opts = shuffle([a, ...w.split("|")]); let attempts = 0, done = false, wrongOpts = [];
    function draw(msg, cls){
      view(`<div class="card"><h2>🤔 Question ${i+1}/${n}</h2>${sentHTML(t,true)}<div class="mq">${q}</div>
        <div class="msg ${cls||""}">${msg||""}</div>
        <div class="row">${opts.map((o,k)=>`<button class="ghost" style="font-size:24px" data-o="${k}" ${done||wrongOpts.includes(k)?"disabled":""}>${o}</button>`).join("")}</div></div>`, ()=>{
          wire(); $$("[data-o]").forEach(b=>b.onclick=()=>pickOpt(+b.dataset.o)); });
    }
    function pickOpt(k){
      if(done) return;
      if(opts[k] === a){
        done = true; const pts = attempts===0?6:attempts===1?3:1; run.pts += pts; addPoints(pts); sndGood();
        run.score += (helped?0.25:0.5) + (attempts===0?0.5:attempts===1?0.25:0);
        draw(`Yes! +${pts} ⭐`, "good-t"); later(()=>{ i++; read(); }, 1400);
      } else {
        attempts++; wrongOpts.push(k); sndBad();
        if(attempts>=2){ done = true; run.score += helped?0.25:0.5; draw(`The answer is “${a}”. Read the sentence again!`, "bad-t"); later(()=>{ i++; read(); }, 3000); }
        else draw("Not quite. Look at the sentence and try again!", "bad-t");
      }
    }
    draw();
  }
  read();
};

