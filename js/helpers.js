/* =============================================================
   HELPERS
   ============================================================= */
const app = document.getElementById("app");
const $ = (s,r=document)=>r.querySelector(s);
const $$ = (s,r=document)=>[...r.querySelectorAll(s)];
const shuffle = a => { a=a.slice(); for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]];} return a; };
const pick = (a,n)=>shuffle(a).slice(0,n);
const uniq = a => [...new Set(a)];
const esc = s => String(s).replace(/[&<>"]/g, c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));

let voice = null;
function getVoice(){
  if(voice) return voice;
  const vs = (window.speechSynthesis && speechSynthesis.getVoices()) || [];
  voice = vs.find(v=>/en[-_]AU/i.test(v.lang)) || vs.find(v=>/en[-_]GB/i.test(v.lang)) || vs.find(v=>/^en/i.test(v.lang)) || null;
  return voice;
}
if(window.speechSynthesis) speechSynthesis.onvoiceschanged = ()=>{voice=null;getVoice();};
function speak(text, rate=0.8){
  if(!window.speechSynthesis) return;
  try{
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    const v = getVoice(); if(v) u.voice = v;
    u.rate = rate; u.lang = v ? v.lang : "en-AU";
    speechSynthesis.speak(u);
  }catch(e){}
}
let actx;
function tone(freqs, dur=0.12, type="sine"){
  try{
    actx = actx || new (window.AudioContext||window.webkitAudioContext)();
    if(actx.state==="suspended") actx.resume();
    tidyAudio();
    let t = actx.currentTime;
    freqs.forEach(f=>{
      const o = actx.createOscillator(), g = actx.createGain();
      o.type = type; o.frequency.value = f; o.connect(g); g.connect(actx.destination);
      g.gain.setValueAtTime(0.16, t); g.gain.exponentialRampToValueAtTime(0.001, t+dur);
      o.start(t); o.stop(t+dur); t += dur;
    });
  }catch(e){}
}
let audioIdle = null;
function tidyAudio(){ clearTimeout(audioIdle); audioIdle = setTimeout(()=>{ try{ if(actx && actx.state==="running") actx.suspend(); }catch(e){} }, 4000); }
document.addEventListener("visibilitychange", ()=>{ document.body.classList.toggle("paused", document.hidden); try{ if(document.hidden) speechSynthesis.cancel(); }catch(e){} });
let moodNow = "happy", moodTimer = null;
function setMood(m){
  moodNow = m; const el = $("#topAv"), p = P();
  if(el && p) el.innerHTML = avatarSVG(p, 46, m);
  clearTimeout(moodTimer);
  moodTimer = setTimeout(()=>{ moodNow = "happy"; const e2 = $("#topAv"), p2 = P(); if(e2 && p2) e2.innerHTML = avatarSVG(p2, 46, "happy"); }, 1400);
}
function stamp(ok){
  $$(".stamp").forEach(e=>e.remove());
  const d = document.createElement("div"); d.className = "stamp "+(ok?"yes":"no"); d.textContent = ok ? "✔" : "✘";
  document.body.appendChild(d); setTimeout(()=>d.remove(), 800);
}
const sndGood = ()=>{ tone([523,659,784]); setMood("cheer"); stamp(true); };
const sndBad  = ()=>{ tone([220,180],0.15,"triangle"); setMood("oops"); stamp(false); };
const sndWin  = ()=>{ tone([523,659,784,1047],0.14); setMood("cheer"); };
function confetti(n=24){
  const em = ["🎉","⭐","✨","🌟","🎈","💖"];
  for(let i=0;i<n;i++){
    const s=document.createElement("div"); s.className="conf"; s.textContent=em[i%em.length];
    s.style.left=Math.random()*100+"vw"; s.style.animationDelay=Math.random()*0.8+"s";
    document.body.appendChild(s); setTimeout(()=>s.remove(),3500);
  }
}
function addPoints(n){
  if(n<=0) return;
  const p = P(); p.points += n; saveDB();
  const el = $("#pts"); if(el){ el.textContent = "⭐ "+p.points; el.classList.remove("pop"); void el.offsetWidth; el.classList.add("pop"); }
}
let backTo = null;
let timers = [];
const later = (fn, ms)=>{ timers.push(setTimeout(fn, ms)); };
function clearTimers(){ timers.forEach(clearTimeout); timers = []; stopListening(); stopSentence(); }

function applyTheme(){
  const p = P(); const t = (p && item(p.equipped.theme)) || item("t0");
  document.body.style.background = t.bg;
  const d = $("#deco"); if(!d) return;
  d.innerHTML = Array.from({length:12}, (_,i)=>`<div class="dec" style="left:${(i*83+Math.floor(i/2)*17)%96}%;top:${(i*37+13)%88}%;animation-delay:${(i*0.7)%5}s;animation-duration:${6+(i%4)*2}s">${t.deco[i%t.deco.length]}</div>`).join("");
}

function view(inner, bind, opts={}){
  clearTimers();
  document.onkeydown = null;
  const p = P();
  const top = p && !opts.bare ? `
    <div class="top">
      <div class="row" style="gap:6px;margin:0"><button class="small alt" id="homeBtn">🏠 Home</button>${backTo?`<button class="small" id="backBtn">⬅ Back</button>`:""}</div>
      <div class="row" style="font-size:18px;gap:8px"><span id="topAv">${avatarSVG(p,46,moodNow)}</span> <b>${esc(p.name)}</b></div>
      <div class="pts" id="pts">⭐ ${p.points}</div>
    </div>` : "";
  app.innerHTML = top + inner;
  const hb = $("#homeBtn"); if(hb) hb.onclick = ()=>{ backTo = null; home(); };
  const bb = $("#backBtn"); if(bb) bb.onclick = ()=>{ const f = backTo; backTo = null; if(f) f(); };
  if(bind) bind();
}
// PIN is stored only as a salted, repeated SHA-256 hash (no plain text). To change it: run pinHash("newpin") in the browser console and paste the result into CONFIG.parentPinHash.
function sha256(s){const K=[];let p=2;while(K.length<64){let ok=1;for(let i=2;i*i<=p;i++)if(p%i==0){ok=0;break}if(ok)K.push((Math.cbrt(p)%1*4294967296)|0);p++}
let H=[];p=2;while(H.length<8){let ok=1;for(let i=2;i*i<=p;i++)if(p%i==0){ok=0;break}if(ok)H.push((Math.sqrt(p)%1*4294967296)|0);p++}
const b=unescape(encodeURIComponent(s)),l=b.length,w=[];for(let i=0;i<(((l*8+64>>9)<<4)+16);i++)w[i]=0;for(let i=0;i<l;i++)w[i>>2]|=b.charCodeAt(i)<<(24-(i%4)*8);w[l>>2]|=128<<(24-(l%4)*8);w[((l*8+64>>9)<<4)+15]=l*8;
for(let o=0;o<w.length;o+=16){const x=w.slice(o,o+16);for(let i=16;i<64;i++){const a=x[i-15],c=x[i-2];x[i]=(x[i-16]+((a>>>7|a<<25)^(a>>>18|a<<14)^(a>>>3))+x[i-7]+((c>>>17|c<<15)^(c>>>19|c<<13)^(c>>>10)))|0}
let[a,b2,c,d,e,f,g,h]=H;for(let i=0;i<64;i++){const t1=h+((e>>>6|e<<26)^(e>>>11|e<<21)^(e>>>25|e<<7))+((e&f)^(~e&g))+K[i]+x[i],t2=((a>>>2|a<<30)^(a>>>13|a<<19)^(a>>>22|a<<10))+((a&b2)^(a&c)^(b2&c));h=g;g=f;f=e;e=(d+t1)|0;d=c;c=b2;b2=a;a=(t1+t2)|0}
H=[H[0]+a,H[1]+b2,H[2]+c,H[3]+d,H[4]+e,H[5]+f,H[6]+g,H[7]+h].map(v=>v|0)}
return H.map(v=>(v>>>0).toString(16).padStart(8,"0")).join("")}
function pinHashS(pin,salt){let h=pin;for(let i=0;i<5000;i++)h=sha256("pq-v1|"+h+"|"+pin+(salt?"|"+salt:""));return h}
function pinHash(pin){ return pinHashS(pin,""); }   // the original built-in PIN uses no salt

/* ---------- In-app dialogs and the grown-up gates (no browser prompt() boxes) ----------
   PIN: each family sets their own (stored as a salted hash in this browser). Existing installs keep the built-in PIN until it is changed. New installs are asked to create a PIN on first use.
   parentGate: a grown-up maths question, used before anything that leaves the app (links) as the App Store Kids category requires. */
function showModal(html, bind){ closeModal(); const d = document.createElement("div"); d.id = "modal"; d.className = "modal-bg"; d.innerHTML = `<div class="modal card">${html}</div>`; document.body.appendChild(d); if(bind) bind(d); return d; }
function closeModal(){ const m = document.getElementById("modal"); if(m) m.remove(); }
const PIN_KEY = "leqPin", PIN_MODE_KEY = "leqPinMode";
function _ls(k){ try{ return localStorage.getItem(k); }catch(e){ return null; } }
function pinStored(){ try{ return JSON.parse(_ls(PIN_KEY)); }catch(e){ return null; } }
function pinIsSet(){ return !!pinStored() || _ls(PIN_MODE_KEY)==="legacy"; }
function pinCheck(v){ const s = pinStored(); if(s) return pinHashS(v,s.salt) === s.hash; return _ls(PIN_MODE_KEY)==="legacy" && pinHash(v) === CONFIG.parentPinHash; }
function pinSave(v){ const salt = Math.random().toString(36).slice(2)+Date.now().toString(36); try{ localStorage.setItem(PIN_KEY, JSON.stringify({salt, hash: pinHashS(v,salt)})); }catch(e){} }
function setPinDialog(title, onDone){
  showModal(`<h2>🔑 ${esc(title)}</h2><p style="font-size:18px">Choose 4 to 8 numbers. Only a grown-up should know them.</p>
    <input id="pin1" class="pin" type="password" inputmode="numeric" autocomplete="off" maxlength="8" placeholder="New PIN">
    <input id="pin2" class="pin" type="password" inputmode="numeric" autocomplete="off" maxlength="8" placeholder="Same PIN again">
    <div class="msg bad-t" id="pinMsg"></div><div class="row"><button class="ghost" id="pinNo">Cancel</button><button class="ok" id="pinGo">Save PIN</button></div>`, m=>{
      const go = ()=>{ const a = m.querySelector("#pin1").value.trim(), b = m.querySelector("#pin2").value.trim();
        if(!/^\d{4,8}$/.test(a)) return m.querySelector("#pinMsg").textContent = "Use 4 to 8 numbers.";
        if(a !== b) return m.querySelector("#pinMsg").textContent = "The two PINs are different.";
        pinSave(a); closeModal(); if(onDone) onDone(); };
      m.querySelector("#pinGo").onclick = go; m.querySelector("#pinNo").onclick = closeModal; m.querySelector("#pin2").onkeydown = e=>{ if(e.key==="Enter") go(); };
      m.querySelector("#pin1").focus(); });
}
function askPin(msg, onOk){
  if(!pinIsSet()) return setPinDialog("Create a grown-up PIN", onOk);
  showModal(`<h2>🔒 ${esc(msg||"Grown-ups only")}</h2><p style="font-size:18px">Enter the grown-up PIN</p>
    <input id="pinIn" class="pin" type="password" inputmode="numeric" autocomplete="off" maxlength="12">
    <div class="msg bad-t" id="pinMsg"></div><div class="row"><button class="ghost" id="pinNo">Cancel</button><button class="ok" id="pinGo">OK</button></div>`, m=>{
      const inp = m.querySelector("#pinIn");
      const go = ()=>{ if(pinCheck(inp.value.trim())){ closeModal(); if(onOk) onOk(); } else { m.querySelector("#pinMsg").textContent = "Not the right PIN."; inp.value = ""; inp.focus(); } };
      m.querySelector("#pinGo").onclick = go; m.querySelector("#pinNo").onclick = closeModal; inp.onkeydown = e=>{ if(e.key==="Enter") go(); }; inp.focus(); });
}
function parentGate(onPass, why){
  const a = 12 + Math.floor(Math.random()*8), b = 3 + Math.floor(Math.random()*7);
  showModal(`<h2>🔒 Ask a grown-up!</h2><p style="font-size:18px">${esc(why||"This is for grown-ups.")} To carry on, solve this:</p>
    <p style="font-size:34px;margin:6px"><b>${a} × ${b} = ?</b></p>
    <input id="gIn" class="pin" type="text" inputmode="numeric" autocomplete="off" maxlength="4">
    <div class="msg bad-t" id="gMsg"></div><div class="row"><button class="ghost" id="gNo">Cancel</button><button class="ok" id="gGo">Continue</button></div>`, m=>{
      const inp = m.querySelector("#gIn");
      const go = ()=>{ if(+inp.value.trim() === a*b){ closeModal(); onPass(); } else { m.querySelector("#gMsg").textContent = "Not quite. Ask a grown-up to help."; inp.value = ""; inp.focus(); } };
      m.querySelector("#gGo").onclick = go; m.querySelector("#gNo").onclick = closeModal; inp.onkeydown = e=>{ if(e.key==="Enter") go(); }; inp.focus(); });
}
function openExternal(url){ parentGate(()=>{ window.open(url, "_blank", "noopener"); }, "This opens a web page outside the game."); }
function askConfirm(msg, yesLabel, onYes){
  showModal(`<h2>${esc(msg)}</h2><div class="row"><button class="ghost" id="cNo">Cancel</button><button class="alt" id="cYes">${esc(yesLabel||"Yes")}</button></div>`, m=>{ m.querySelector("#cNo").onclick = closeModal; m.querySelector("#cYes").onclick = ()=>{ closeModal(); onYes(); }; });
}

