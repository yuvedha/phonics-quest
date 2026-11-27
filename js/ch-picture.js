/* =============================================================
   CHAPTER 4: PICTURE QUEST (see it, say it, spell it)
   ============================================================= */
MENU.c4 = ()=>levelMenu("c4", PICTURE_LEVELS.map(l=>l.name));
RUN.c4 = level=>{
  const pool = PICTURE_LEVELS[level-1].items;
  const weak = pool.filter(x=>isWeak("p:"+x[0]));
  const qs = [...new Map([...pick(weak,3), ...shuffle(pool)].map(x=>[x[0],x])).values()].slice(0, 8);
  const run = {pts:0, first:0}; let i = 0;
  function q(){
    if(i >= qs.length) return finishScreen("c4", level, run, run.first/qs.length, 0.7, 0.4);
    const [word, emoji] = qs[i];
    spellStep({word, emoji, title:`🖼️ What is it? ${i+1}/${qs.length}`, progress:i/qs.length, say:true, noAudio:true, hint:"Say the word if you can, then spell it!"+(PICTURE_LEVELS[level-1].rule?`<div class="rulebox">📘 ${PICTURE_LEVELS[level-1].rule}</div>`:"")}, r=>{
      const pts = spellPoints(r, 10);
      if(r.mistakes===0 && !r.usedHint){ run.first++; stat("p:"+word).ok++; } else stat("p:"+word).miss++;
      run.pts += pts; addPoints(pts); i++; q();
    });
  }
  q();
};

/* =============================================================
   CHAPTER 5: DIGRAPH DETECTIVE (pick the missing digraph)
   ============================================================= */
MENU.c5 = ()=>levelMenu("c5", DETECTIVE.map(l=>l.name));
RUN.c5 = level=>{
  const pool = DETECTIVE[level-1].items, allD = uniq(pool.map(x=>x[0]));
  const weak = pool.filter(x=>isWeak("d:"+x[1]));
  const qs = [...new Map([...pick(weak,3), ...shuffle(pool)].map(x=>[x[1],x])).values()].slice(0, CONFIG.questionsPerRound);
  const run = {pts:0, first:0}; let i = 0;
  function q(){
    if(i >= qs.length) return finishScreen("c5", level, run, run.first/qs.length, 0.8, 0.5);
    const [dg, word, emoji] = qs[i], at = word.indexOf(dg);
    const lvD = [...new Set(pool.map(x=>x[0]))].filter(d=>d!==dg), others = lvD.length>=3 ? lvD : [...lvD, ...allD.filter(d=>d!==dg && !lvD.includes(d))];
    const opts = shuffle([dg, ...pick(others, 3)]);
    let attempts = 0, done = false, wrongPicks = [];
    function draw(msg, cls){
      view(`<div class="card"><h2>Find the digraph ${i+1}/${qs.length}</h2>
        <div class="bar"><div style="width:${i/qs.length*100}%"></div></div>
        ${DETECTIVE[level-1].rule?`<div class="rulebox">📘 ${DETECTIVE[level-1].rule}</div>`:""}<div class="big">${emoji||"🔊"}</div>
        <div class="letters" style="margin:6px 0">${word.slice(0,at).split("").map(c=>`<div class="lt">${c}</div>`).join("")}<div class="lt ${done?"good":"blank"}" style="min-width:${done?64:90}px;width:auto;padding:0 10px">${done?dg:"?"}</div>${word.slice(at+dg.length).split("").map(c=>`<div class="lt">${c}</div>`).join("")}</div>
        <button id="say">🔊 Hear the word</button>
        <div class="msg ${cls||""}">${msg||""}</div>
        <div class="row">${opts.map(o=>`<button class="ghost" style="font-size:36px;min-width:110px" data-o="${o}" ${done||wrongPicks.includes(o)?"disabled":""}>${o}</button>`).join("")}</div></div>`, ()=>{
          $("#say").onclick = ()=>speak(word);
          $$("[data-o]").forEach(b=>b.onclick=()=>choose(b.dataset.o));
        });
    }
    function choose(o){
      if(done) return;
      if(o===dg){
        done = true; const pts = attempts===0?10:attempts===1?5:2; if(attempts===0){ run.first++; stat("d:"+word).ok++; }
        run.pts+=pts; addPoints(pts); sndGood(); speak(word);
        draw(`Yes! ${word} (+${pts} ⭐)`, "good-t"); later(()=>{ i++; q(); }, 1400);
      } else {
        attempts++; wrongPicks.push(o); sndBad(); if(attempts===1) stat("d:"+word).miss++;
        if(attempts>=3){ done = true; draw(`It's "${dg}" in ${word}.`, "bad-t"); speak(word); later(()=>{ i++; q(); }, 2600); }
        else { draw("Not quite. Listen and try again!", "bad-t"); speak(word); }
      }
    }
    draw(); later(()=>speak(word), 250);
  }
  q();
};

