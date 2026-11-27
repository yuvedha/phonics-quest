/* =============================================================
   PROFILES + AVATAR BUILDER
   ============================================================= */
function profilesScreen(){
  DB.current = null; applyTheme();
  view(`<div class="card"><h1>🌈 Little Explorers Quest</h1><p style="font-size:22px">Who is playing?</p>
    <div class="row">${DB.profiles.map(p=>`<button class="ghost" data-id="${p.id}" style="padding:10px">${avatarSVG(p,100)}<div>${esc(p.name)}</div></button>`).join("")}</div>
    <button class="ok" id="newP">➕ New player</button></div>`, ()=>{
      $$("[data-id]").forEach(b=>b.onclick=()=>{ DB.current = b.dataset.id; saveDB(); applyTheme(); home(); });
      $("#newP").onclick = ()=>createProfile();
    }, {bare:true});
}
const optRow = (label,key,arr,cur) => `<div style="margin:8px 0"><b>${label}</b><div class="row">${arr.map(([k,n])=>`<button class="opt ${cur===k?"on":"ghost"}" data-sel="${key}" data-val="${k}">${n}</button>`).join("")}</div></div>`;
const swRow = (label,key,arr,cur) => `<div style="margin:8px 0"><b>${label}</b><div class="row">${arr.map((c,i)=>`<button class="sw ${cur===i?"on":""}" data-k="${key}" data-i="${i}" style="background:${c}"></button>`).join("")}</div></div>`;
function lookEditor(av){
  if(av.style!=="boy"){
    const pick = optRow("Look","photo",[["1","📷 Picture look"],["0","🎨 Draw my own"]],isPhoto(av)?"1":"0");
    if(isPhoto(av)) return pick + `<p style="font-size:16px;text-align:center">Your picture look keeps its hair, clothes and smile. Add accessories and pets in the shop!</p>`;
    return pick + lookEditor2(av);
  }
  return lookEditor2(av);
}
function lookEditor2(av){
  return optRow("Avatar style","style",STYLES,av.style||"girl") + swRow("Skin","skin",SKIN,av.skin) + optRow("Hair style","hair",HAIRS,av.hair) + swRow("Hair colour","hairColor",HAIRC,av.hairColor)
       + optRow("Eyes","eyes",EYES,av.eyes) + swRow("Eye colour","eyeColor",EYEC,av.eyeColor) + optRow("Smile","mouth",MOUTHS,av.mouth);
}
function clothesEditor(av){
  const d = av.dress==="none";
  return optRow("Dress or separates?","dress",DRESSES,av.dress)
    + (d ? optRow("Top","topStyle",TOPS,av.topStyle) + optRow("Bottoms","bottomStyle",BOTTOMS,av.bottomStyle) : "")
    + swRow(d?"Top colour":"Dress colour","top",TOPC,av.top)
    + ((d||av.dress==="tutu"||av.dress==="party") ? swRow(d?"Bottoms colour":(av.dress==="tutu"?"Tutu colour":"Belt colour"),"bottom",BOTC,av.bottom) : "")
    + swRow("Shoes","shoes",SHOEC,av.shoes);
}
function bindBasics(av, onChange){
  $$("[data-k]").forEach(b=>b.onclick=()=>{ av[b.dataset.k] = +b.dataset.i; onChange(); });
  $$("[data-sel]").forEach(b=>b.onclick=()=>{
    if(b.dataset.sel==="photo") av.photo = b.dataset.val==="1";
    else if(b.dataset.sel==="style"){ Object.assign(av, STYLE_PRESETS[b.dataset.val]||{}); }
    else av[b.dataset.sel] = b.dataset.val;
    onChange(); });
}
function createProfile(){
  const draft = {name:"", avatar:Object.assign({}, AV_DEFAULT, STYLE_PRESETS.girl)};
  function draw(){
    view(`<div class="card"><h1>✨ Make your player!</h1>
      <div class="closet"><div class="prev" id="prev">${avatarSVG({avatar:draft.avatar, equipped:{bg:"bg0"}}, 250)}</div>
      <div class="opts" style="text-align:left"><p style="margin:0 0 8px;text-align:center"><input type="text" id="nm" maxlength="14" placeholder="Your name" value="${esc(draft.name)}"></p>
      <div style="text-align:center"><b>I am a…</b><div class="row">${STYLES.map(([k,n])=>`<button class="opt ${draft.avatar.style===k?"on":"ghost"}" data-style="${k}">${n}</button>`).join("")}</div></div>
      ${lookEditor(draft.avatar)}<hr style="border:none;border-top:3px dotted #ead9ff">${clothesEditor(draft.avatar)}</div></div>
      <div><button class="ok" id="go">Let's play! ▶</button>${DB.profiles.length?`<button class="ghost" id="cancel">Back</button>`:""}${(!DB.profiles.length && FS.handle)?`<div><button class="small alt" id="fsRest">📂 Restore from my auto-save file</button></div>`:""}${(typeof Cloud!=="undefined" && Cloud.on && !Cloud.user())?`<div><button class="small alt" id="cloudFirst">☁️ Sign in to get my progress</button></div>`:""}</div></div>`, ()=>{
        const cf = $("#cloudFirst"); if(cf) cf.onclick = ()=>cloudSignInScreen();
        const fr = $("#fsRest"); if(fr) fr.onclick = fsRestore;
        $("#nm").oninput = e=>{ draft.name = e.target.value; };
        $$("[data-style]").forEach(b=>b.onclick=()=>{ draft.name = $("#nm").value; draft.avatar = Object.assign({}, AV_DEFAULT, STYLE_PRESETS[b.dataset.style]); draw(); });
        bindBasics(draft.avatar, ()=>{ draft.name = $("#nm").value; const y=window.scrollY; draw(); window.scrollTo(0,y); });
        $("#go").onclick = ()=>{
          const name = ($("#nm").value||"").trim();
          if(!name){ $("#nm").focus(); $("#nm").style.borderColor="#e0455f"; return; }
          newProfile(name, draft.avatar); sndWin(); applyTheme(); home();
        };
        const c = $("#cancel"); if(c) c.onclick = profilesScreen;
      }, {bare:true});
  }
  draw();
}

/* =============================================================
   HOME + DAILY QUEST
   ============================================================= */
const c6Ready = p => Object.keys(p.done.c3||{}).some(k=>p.done.c3[k]>=1);
const activeChs = p => CHS.filter(ch=>ch!=="c6" || c6Ready(p));
function todayLevel(p, ch){ return Math.min(p.prog[ch], CH[ch].max); }
const SUBJECTS = [
  {id:"phonics", icon:"📖", name:"Phonics & Spelling", chs:["c1","c2","c3","c8","c4","c5","c6"]},
  {id:"maths",   icon:"🔢", name:"Maths",              chs:["c7"]},
  {id:"gk",      icon:"🌍", name:"General Knowledge",  chs:["c9","c10"]},
  {id:"geo",     icon:"🗺️", name:"Geography",          chs:["c11","c12"]},
  {id:"sci",     icon:"🔬", name:"Science",            chs:["c13","c14"]}
];
const subjectOf = ch => (SUBJECTS.find(sj=>sj.chs.includes(ch))||SUBJECTS[0]).id;
function subjectScreen(id){
  const p = P(), sj = SUBJECTS.find(x=>x.id===id) || SUBJECTS[0], d = dailyNow(p);
  backTo = home;
  view(`<div class="card" style="text-align:left"><h2 style="text-align:center">${sj.icon} ${sj.name}</h2>
    <p style="text-align:center;font-size:18px;margin-top:0">Pick a chapter. Finish at least one level today!</p>
    ${sj.chs.map(ch=>{
      const lv = todayLevel(p,ch), done = d.chapters.includes(ch), st = p.done[ch][lv]||0;
      if(ch==="c6" && !c6Ready(p)) return `<div class="card ch" style="margin:8px 0;padding:12px;opacity:.7"><div><h3>${CH[ch].icon} ${CH[ch].name} 🔒</h3><div style="font-size:16px">Finish a Digraph Lesson (Chapter 3) to unlock the daily test.</div></div></div>`;
      return `<div class="card ch ${done?"":"today"}" style="margin:8px 0;padding:12px"><div><h3>${CH[ch].icon} ${CH[ch].name} ${done?"✅":""}</h3>
        <div style="font-size:16px">${CH[ch].about}</div><div style="font-size:18px"><b>${CH[ch].daily?"Today's test":"Today: Level "+lv}</b> ${"⭐".repeat(st)}</div></div>
        <div style="text-align:center"><button class="ok" data-play="${ch}">${done?"Again":"Play"} ▶</button>${CH[ch].daily?"":`<br><button class="small ghost" data-menu="${ch}">All levels</button>`}</div></div>`;
    }).join("")}</div>`, ()=>{
    $$("[data-play]").forEach(b=>b.onclick=()=>{ const ch = b.dataset.play; backTo = ()=>MENU[ch](); RUN[ch](todayLevel(p,ch)); });
    $$("[data-menu]").forEach(b=>b.onclick=()=>MENU[b.dataset.menu]());
  });
}
function home(){
  backTo = null;
  const p = P(); if(!p) return profilesScreen();
  applyTheme();
  const d = dailyNow(p), goalDone = d.count >= 1;
  const streak = (p.streak.last===todayStr() || p.streak.last===yesterdayStr()) ? p.streak.n : 0;
  const nextItem = ITEMS.filter(i=>!p.owned.includes(i.id) && i.cost>0).sort((a,b)=>a.cost-b.cost)[0];
  view(`
    ${FS.state==="needs"?`<div class="card" style="background:#fff8d6"><b>💾 Auto-save is paused.</b> Tap to turn it back on so progress is saved to your file.<div><button class="ok small" id="fsOn">Turn auto-save on</button></div></div>`:""}
    ${needBackup(p)?`<div class="card" style="background:#fff8d6"><b>💾 Time to save a backup of ${esc(p.name)}'s progress!</b> It only takes a moment.<div><button class="ok small" id="bk">Back up now</button><button class="small ghost" id="bklater">Remind me in 2 days</button></div></div>`:""}
    <div class="card">
      <div id="av" style="cursor:pointer">${avatarSVG(p,270,moodNow)}</div>
      <h1>Hi ${esc(p.name)}!</h1>
      <div>${streak?`<span class="pill">🔥 ${streak} day${streak>1?"s":""} in a row</span>`:""}<span class="pill">${goalDone?"✅ Today's goal done!":"🎯 Goal: finish 1 level today"}</span></div>
      ${nextItem?`<p style="font-size:18px;margin:8px 0 4px">Saving up for <b>${nextItem.icon} ${nextItem.name}</b>: ${Math.max(0,nextItem.cost-p.points)} ⭐ to go</p>
        <div class="bar" style="max-width:360px;margin:0 auto"><div style="width:${Math.min(100,p.points/nextItem.cost*100)}%"></div></div>`:`<p>You own everything! 🏆</p>`}
      <button class="ok" id="closet">👗 My Avatar &amp; Shop</button>
    </div>
    <div class="card"><h2>🗓️ Today's Quest</h2>
      <p style="margin-top:0;font-size:18px">Finish at least one level today. Do more for bonus stars!</p>
      <div class="row">${SUBJECTS.map(sj=>{ const act = sj.chs.filter(c=>activeChs(p).includes(c)), dn = act.filter(c=>d.chapters.includes(c)).length;
        return `<button class="subj ${dn&&dn===act.length?"alldone":""}" data-subj="${sj.id}"><span class="si">${sj.icon}</span><span class="sn">${sj.name}</span><span class="ss">${dn} of ${act.length} done today ${dn===act.length&&act.length?"✅":""}</span></button>`; }).join("")}</div>
    </div>
    <div class="row"><button class="small ghost" id="switch">👥 Switch player</button><button class="small ghost" id="grown">👩‍👧 Grown-up corner</button></div>
  `, ()=>{
    $("#closet").onclick = $("#av").onclick = closet;
    $$("[data-subj]").forEach(b=>b.onclick=()=>subjectScreen(b.dataset.subj));
    $("#switch").onclick = profilesScreen; $("#grown").onclick = grownUp;
    const fo = $("#fsOn"); if(fo) fo.onclick = async()=>{ await fsAllow(); home(); };
    const bk = $("#bk"); if(bk) bk.onclick = ()=>{ askPin("Save a backup", ()=>{ downloadBackup(); home(); }); };
    const bl = $("#bklater"); if(bl) bl.onclick = ()=>{ p.snoozeUntil = addDaysStr(2); saveDB(); home(); };
  });
}

/* =============================================================
   CLOSET + SHOP
   ============================================================= */
let closetTab = "look";
function shopGrid(slot, pack){
  const p = P(), req = slot==="bg"||slot==="theme";
  return `<div class="grid">${ITEMS.filter(i=>i.slot===slot && (pack ? i.pack===pack : !i.pack) && itemFits(i, p.avatar)).map(it=>{
    const own = p.owned.includes(it.id), on = p.equipped[slot]===it.id, can = p.points>=it.cost;
    return `<div class="item">${it.slot==="theme"?`<div style="font-size:42px">${it.icon}</div>`:`<div class="thumb">${itemThumb(it, p.avatar.style)}</div>`}<div>${it.name}</div>
      ${own ? `<button class="small ${on?"alt":"ok"}" data-eq="${it.id}">${on?(req?"In use":"Take off"):"Use it"}</button>`
            : `<button class="small" data-buy="${it.id}" ${can?"":"disabled"}>⭐ ${it.cost}</button>${can?"":`<div style="font-size:14px">${it.cost-p.points} more to go</div>`}`}</div>`;
  }).join("")}</div>`;
}
function closet(){
  const p = P();
  const tabs = CLOSET_TABS.map(([k,n])=>`<button class="opt ${closetTab===k?"on":"ghost"}" data-tab="${k}">${n}</button>`).join("");
  let body = "";
  if(closetTab==="look") body += `<div class="card" style="text-align:left">${lookEditor(p.avatar)}</div>`;
  if(closetTab==="clothes" && isPhoto(p.avatar)) body += `<div class="card"><h3>My clothes</h3><p style="font-size:17px">Your picture look comes with its own crochet top and pink cargo pants. Pick "🎨 Draw my own" under Look to change clothes.</p></div>`;
  else if(closetTab==="clothes") body += `<div class="card" style="text-align:left"><h3 style="text-align:center">My clothes</h3>${p.equipped.costume?`<p style="text-align:center;font-size:16px">A glam outfit is on. Take it off in "Glam outfits" below to show these clothes.</p>`:""}${clothesEditor(p.avatar)}</div>`;
  if(closetTab==="fun" && p.equipped.pet) body += `<div class="card" style="text-align:left"><h3 style="text-align:center">Pet colour</h3>${swRow("Choose a colour for your pet","petColor",PET_SWATCH,p.avatar.petColor|0)}</div>`;
  if(closetTab==="idol"){ body += `<div class="card"><h3>⭐ Idol &amp; Hunter</h3><p style="font-size:16px;margin:4px">Stage looks, glowing gear and a tiger cub for a star-and-spirit-hunter adventure!</p></div>`; IDOL_SLOTS.forEach(slot=>{ if(ITEMS.some(i=>i.slot===slot&&i.pack==="idol"&&itemFits(i,p.avatar))) body += `<div class="card"><h3>${SLOTS[slot]}</h3>${shopGrid(slot,"idol")}</div>`; }); }
  (TAB_SLOTS[closetTab]||[]).forEach(slot=>{ if(!ITEMS.some(i=>i.slot===slot&&!i.pack&&itemFits(i,p.avatar))) return; body += `<div class="card"><h3>${SLOTS[slot]}</h3>${shopGrid(slot)}</div>`; });
  view(`<div class="closet"><div class="prev card"><h2>My Avatar</h2><div>${avatarSVG(p,260,moodNow)}</div><p style="font-size:20px;margin:6px">You have <b>⭐ ${p.points}</b></p><button class="ok" id="done">✔ Done</button></div>
    <div class="opts"><div class="row" style="margin-bottom:10px">${tabs}</div>${body}</div></div>`, ()=>{
    const keep = fn => { const y=window.scrollY; fn(); window.scrollTo(0,y); };
    $$("[data-tab]").forEach(b=>b.onclick=()=>{ closetTab = b.dataset.tab; keep(closet); });
    $("#done").onclick = home;
    bindBasics(p.avatar, ()=>{ saveDB(); keep(closet); });
    $$("[data-buy]").forEach(b=>b.onclick=()=>{
      const it = item(b.dataset.buy);
      if(p.points>=it.cost){ p.points-=it.cost; p.owned.push(it.id); p.equipped[it.slot]=it.id; saveDB(); sndWin(); confetti(16); applyTheme(); keep(closet); }
    });
    $$("[data-eq]").forEach(b=>b.onclick=()=>{
      const it = item(b.dataset.eq), req = it.slot==="bg"||it.slot==="theme";
      if(p.equipped[it.slot]===it.id){ if(!req) delete p.equipped[it.slot]; } else p.equipped[it.slot]=it.id;
      saveDB(); applyTheme(); keep(closet);
    });
  });
}

/* =============================================================
   LEVEL MENUS, PROGRESS AND FINISH SCREEN
   ============================================================= */
const MENU = {}, RUN = {};
function levelMenu(ch, rows){
  backTo = ()=>subjectScreen(subjectOf(ch));
  const p = P(), cur = todayLevel(p, ch);
  view(`<div class="card"><h2>${CH[ch].icon} ${CH[ch].name}</h2><p style="font-size:18px">${CH[ch].about}</p>
    ${rows.map((r,i)=>{
      const lv = i+1, st = p.done[ch][lv]||0, locked = lv > cur;
      return `<div class="card ch ${lv===cur?"today":""}" style="margin:8px 0;padding:12px"><div><h3>Level ${lv}${lv===cur?" ⭐ Today":""}</h3><div style="font-size:16px">${r}</div><div style="font-size:22px">${"⭐".repeat(st)}${"☆".repeat(3-st)}</div></div>
        <button class="${locked?"ghost":"ok"}" data-lv="${lv}" ${locked?"disabled":""}>${locked?"🔒":"Play ▶"}</button></div>`;
    }).join("")}</div>`, ()=>{ $$("[data-lv]").forEach(b=>b.onclick=()=>{ backTo = ()=>MENU[ch](); RUN[ch](+b.dataset.lv); }); });
}

function recordLevelDone(ch, level, stars){
  const p = P(), notes = [], d = todayStr();
  p.done[ch][level] = Math.max(stars, p.done[ch][level]||0);
  (p.log = p.log || []).push({d, ch, lv:level, st:stars}); if(p.log.length>400) p.log.splice(0, p.log.length-400);
  if(p.daily.date !== d) p.daily = {date:d, chapters:[], count:0};
  const firstToday = p.daily.count === 0;
  p.daily.count++;
  if(!p.daily.chapters.includes(ch)) p.daily.chapters.push(ch);
  if(firstToday){
    p.streak.n = (p.streak.last===yesterdayStr()) ? p.streak.n+1 : 1; p.streak.last = d;
    addPoints(CONFIG.dailyBonus); notes.push(`🎯 Daily goal done! +${CONFIG.dailyBonus} ⭐  🔥 ${p.streak.n} day${p.streak.n>1?"s":""} in a row`);
  }
  if(activeChs(p).every(c=>p.daily.chapters.includes(c)) && !p.daily.allBonus){ p.daily.allBonus = true; addPoints(CONFIG.allChaptersBonus); notes.push(`🌟 Every chapter done today! +${CONFIG.allChaptersBonus} ⭐`); }
  if(CH[ch].daily){ /* daily test: no levels to unlock */ }
  else if(level === p.prog[ch] && stars >= 2 && p.prog[ch] < CH[ch].max){ p.prog[ch]++; notes.push(`🔓 Level ${p.prog[ch]} unlocked in ${CH[ch].name}!`); }
  else if(level === p.prog[ch] && stars < 2) notes.push(`Try level ${level} again to unlock the next one. You can do it!`);
  saveDB(); return notes;
}
function finishScreen(ch, level, run, ratio, hi=0.8, mid=0.5){
  const stars = ratio>hi?3:ratio>mid?2:1, bonus = 10 + stars*5;
  addPoints(bonus);
  const notes = recordLevelDone(ch, level, stars), p = P();
  const nextLevel = (level < CH[ch].max && level+1 <= p.prog[ch]) ? level+1 : level;
  sndWin(); confetti();
  view(`<div class="card"><h1>🎉 Level complete! 🎉</h1><div>${avatarSVG(p,230,"cheer")}</div>
    <div style="font-size:44px">${"⭐".repeat(stars)}${"☆".repeat(3-stars)}</div>
    <p style="font-size:24px">You earned <b>${run.pts+bonus} ⭐</b> (${bonus} bonus!)</p>
    ${notes.map(n=>`<div class="pill">${n}</div>`).join("")}
    <div><button class="ok" id="next">${nextLevel>level ? "Next level ▶" : "Play again"}</button><button id="shop">👗 Visit the shop</button><button class="ghost" id="menu">Levels</button><button class="ghost" id="hm">🏠 Home</button></div></div>`, ()=>{
      $("#next").onclick = ()=>RUN[ch](nextLevel); $("#shop").onclick = closet; $("#menu").onclick = MENU[ch]; $("#hm").onclick = home;
    });
}

