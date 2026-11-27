/* =============================================================
   CHAPTER 7: MATHS MAGIC (questions are generated fresh from maths.js)
   ============================================================= */
function genChapter(ch, LEVELS, GEN, pre){
MENU[ch] = ()=>levelMenu(ch, LEVELS.map(l=>l.name));
RUN[ch] = level=>{
  const L = LEVELS[level-1], N = L.n || 10;
  const weak = L.gens.filter(g=>isWeak(pre+g[0]));
  const order = []; let cyc = [];
  for(let i=0;i<N;i++){
    if(!cyc.length) cyc = shuffle(L.gens);
    order.push((i<2 && weak.length) ? pick(weak,1)[0] : cyc.pop());
  }
  const qs = []; 
  order.forEach(g=>{ let q, t = 0; do{ q = GEN[g[0]](...g.slice(1)); t++; }while(qs.some(o=>o.q===q.q) && t<30); q.key = q.key || g[0]; qs.push(q); });
  const run = {pts:0, first:0};
  let i = 0;
  function lesson(k){
    const pg = L.learn[k], last = k===L.learn.length-1;
    view(`<div class="card"><h2>📖 Let's learn first! ${k+1}/${L.learn.length}</h2>
      <h3 style="margin:4px 0">${pg.title}</h3>${pg.html}
      <button id="say">🔊 Read it to me</button>
      <div class="row" style="margin-top:10px">${k>0?'<button class="ghost" id="prv">◀ Back</button>':""}<button class="ok" id="nxt">${last?"Start the quiz! 🚀":"Next ▶"}</button></div>
      <p><button class="ghost" id="skp" style="font-size:14px">Skip to the quiz</button></p></div>`, ()=>{
        $("#say").onclick = ()=>speak(pg.say);
        const pv = $("#prv"); if(pv) pv.onclick = ()=>lesson(k-1);
        $("#nxt").onclick = ()=>{ if(last) ask(); else lesson(k+1); };
        $("#skp").onclick = ()=>ask();
      });
    later(()=>speak(pg.say), 300);
  }
  function ask(){
    if(i >= qs.length) return finishScreen(ch, level, run, run.first/qs.length, 0.8, 0.5);
    const x = qs[i]; let attempts = 0, done = false, typed = "", wrongOpts = [];
    function draw(msg, cls){
      const body = x.type==="num"
        ? `<div class="numans">${typed||"&nbsp;"}</div>
           <div class="numpad">${[1,2,3,4,5,6,7,8,9].map(n=>`<button class="ghost" data-n="${n}">${n}</button>`).join("")}<button class="ghost" id="del">⌫</button><button class="ghost" data-n="0">0</button><button class="ok" id="go" ${!typed||done?"disabled":""}>✔</button></div>`
        : `<div class="row">${x.opts.map((o,k)=>`<button class="ghost" style="font-size:30px;min-width:90px" data-o="${k}" ${done||wrongOpts.includes(k)?"disabled":""}>${o}</button>`).join("")}</div>`;
      view(`<div class="card"><h2>🔢 Question ${i+1}/${qs.length}</h2>
        <div class="bar"><div style="width:${i/qs.length*100}%"></div></div>
        ${x.vis||""}<div class="mq">${x.q}</div>
        <button id="say">🔊 Read it to me</button>
        <div class="msg ${cls||""}">${msg||""}</div>${body}</div>`, ()=>{
          $("#say").onclick = ()=>speak(x.say);
          $$("[data-n]").forEach(b=>b.onclick=()=>press(b.dataset.n));
          const dl = $("#del"); if(dl) dl.onclick = ()=>{ if(!done){ typed = typed.slice(0,-1); draw(); } };
          const go = $("#go"); if(go) go.onclick = submit;
          $$("[data-o]").forEach(b=>b.onclick=()=>choose(b.dataset.o));
          document.onkeydown = e=>{ if(x.type!=="num"||done) return; if(/^[0-9]$/.test(e.key)) press(e.key); else if(e.key==="Backspace"){ typed = typed.slice(0,-1); draw(); } else if(e.key==="Enter") submit(); };
        });
    }
    function press(n){ if(done || typed.length>=3) return; typed += n; draw(); }
    function right(){
      done = true; const pts = attempts===0?8:attempts===1?4:2; if(attempts===0){ run.first++; stat(pre+x.key).ok++; }
      run.pts += pts; addPoints(pts); sndGood(); draw(`Yes! ${x.why||""} +${pts} ⭐`, "good-t"); later(()=>{ i++; ask(); }, 1600);
    }
    function wrong(giveUp){
      attempts++; sndBad(); if(attempts===1) stat(pre+x.key).miss++;
      if(giveUp){ done = true; draw(`The answer is ${x.ans}. ${x.why||""}`, "bad-t"); later(()=>{ i++; ask(); }, 3000); }
      else { typed = ""; draw("Not quite. Have another go!", "bad-t"); }
    }
    function submit(){ if(done || !typed) return; if(+typed === x.ans) right(); else wrong(attempts>=2); }
    function choose(k){ if(done) return; if(String(x.opts[k]) === String(x.ans)) right(); else { wrongOpts.push(+k); wrong(attempts>=Math.min(2,x.opts.length-2)); } }
    draw(); later(()=>speak(x.say), 250);
  }
  if(L.learn && L.learn.length) lesson(0); else ask();
};
}
genChapter("c7", MATH_LEVELS, MATH_GEN, "m:");
genChapter("c9", TIME_LEVELS, TIME_GEN, "t:");
genChapter("c10", WONDER_LEVELS, WONDER_GEN, "k:");
genChapter("c11", GEO_LEVELS, GEO_GEN, "g:");
genChapter("c12", COUNTRY_LEVELS, GEO_GEN, "g:");
genChapter("c13", SCI_LEVELS_LIVING, SCI_GEN, "y:");
genChapter("c14", SCI_LEVELS_LAB, SCI_GEN, "y:");

