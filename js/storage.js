/* =============================================================
   SAVE DATA
   ============================================================= */
let DB = loadDB();
function loadDB(){
  try{ const d = JSON.parse(localStorage.getItem("phonicsQuestSave")); if(d && d.profiles){ d.profiles.forEach(ensure); return d; } }catch(e){}
  return {profiles:[], current:null};
}
function persist(){ try{ localStorage.setItem("phonicsQuestSave", JSON.stringify(DB)); }catch(e){} try{ scheduleFileSave(); }catch(e){} }
function saveDB(){ try{ const cp = P(); if(cp) cp.upd = Date.now(); }catch(e){} persist(); try{ scheduleCloud(); }catch(e){} }
function ensure(p){
  p.avatar = Object.assign({}, AV_DEFAULT, p.avatar||{});
  p.owned = p.owned || ["bg0"];
  ["bg0","t0"].forEach(id=>{ if(!p.owned.includes(id)) p.owned.push(id); });
  if(p.owned.includes("h2") && !p.owned.includes("ha1")) p.owned.push("ha1");
  p.equipped = p.equipped || {};
  if(p.equipped.hat==="h2"){ p.equipped.hairacc = "ha1"; delete p.equipped.hat; }
  if(p.equipped.outfit){ if(item(p.equipped.outfit) && item(p.equipped.outfit).slot==="costume") p.equipped.costume = p.equipped.outfit; delete p.equipped.outfit; }
  Object.keys(p.equipped).forEach(k=>{ const it = item(p.equipped[k]); if(!it){ delete p.equipped[k]; } else if(it.slot!==k){ delete p.equipped[k]; p.equipped[it.slot] = it.id; } });
  p.equipped.bg = p.equipped.bg || "bg0"; p.equipped.theme = p.equipped.theme || "t0";
  p.stats = p.stats || {}; p.done = p.done || {};
  p.prog = p.prog || {};
  CHS.forEach(k=>{ p.done[k] = p.done[k] || {}; p.prog[k] = p.prog[k] || 1; });
  p.c6 = p.c6 || {seen:{}, recent:[], count:0};
  p.log = p.log || [];
  p.daily = p.daily || {date:"", chapters:[], count:0};
  p.streak = p.streak || {last:"", n:0};
  p.points = p.points || 0;
  p.micMode = p.micMode || "grownup";
  p.created = p.created || new Date().toLocaleDateString("en-CA");
}
const P = () => DB.profiles.find(p=>p.id===DB.current);
function newProfile(name, avatar){
  const p = {id:"p"+Date.now(), name, avatar, points:0};
  ensure(p); DB.profiles.push(p); DB.current = p.id; saveDB(); return p;
}
function stat(key){ const p=P(); return p.stats[key] || (p.stats[key] = {ok:0, miss:0}); }
const isWeak = key => { const s = P().stats[key]; return s && s.miss > s.ok; };
const todayStr = () => new Date().toLocaleDateString("en-CA");
const yesterdayStr = () => new Date(Date.now()-864e5).toLocaleDateString("en-CA");
const addDaysStr = n => new Date(Date.now()+n*864e5).toLocaleDateString("en-CA");
const daysBetween = (a,b) => Math.floor((new Date(b)-new Date(a))/864e5);
function needBackup(p){
  if(typeof FS!=="undefined" && FS.state==="ready") return false;
  const base = p.lastBackup || p.created || todayStr();
  const played = p.points>0 || Object.values(p.done).some(d=>Object.keys(d).length);
  return played && daysBetween(base, todayStr()) >= 7 && todayStr() > (p.snoozeUntil||"");
}
function downloadBackup(){
  const p = P(); p.lastBackup = todayStr(); saveDB();
  const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([JSON.stringify(DB)],{type:"application/json"}));
  a.download = "little-explorers-backup-"+todayStr()+".json"; a.click();
}

/* ---- Auto-save progress to a file on the computer (Chrome / Edge). Keeps progress outside the browser. ---- */
var FS = {handle:null, state:("showSaveFilePicker" in window)?"none":"unsupported", timer:null, last:""};
function idb(mode, fn){ return new Promise((res,rej)=>{ try{
  const rq = indexedDB.open("pq-files",1); rq.onupgradeneeded = ()=>rq.result.createObjectStore("h");
  rq.onsuccess = ()=>{ const db = rq.result, tx = db.transaction("h",mode), r = fn(tx.objectStore("h")); tx.oncomplete = ()=>{ db.close(); res(r && r.result); }; tx.onerror = ()=>{ db.close(); rej(tx.error); }; };
  rq.onerror = ()=>rej(rq.error); }catch(e){ rej(e); } }); }
async function fsInit(){
  if(FS.state==="unsupported") return;
  try{ const h = await idb("readonly", st=>st.get("file")); if(h){ FS.handle = h; FS.state = (await h.queryPermission({mode:"readwrite"}))==="granted" ? "ready" : "needs"; } }catch(e){}
  if(FS.state==="ready") fsWrite();
}
async function fsPick(){
  try{ const h = await showSaveFilePicker({suggestedName:"little-explorers-progress.json", types:[{description:"Little Explorers Quest progress", accept:{"application/json":[".json"]}}]});
    FS.handle = h; await idb("readwrite", st=>st.put(h,"file")); FS.state = "ready"; FS.last = ""; await fsWrite(); return true; }catch(e){ return false; }
}
async function fsAllow(){
  try{ FS.state = (await FS.handle.requestPermission({mode:"readwrite"}))==="granted" ? "ready" : "needs"; if(FS.state==="ready"){ FS.last = ""; await fsWrite(); } }catch(e){}
}
async function fsWrite(){
  if(FS.state!=="ready" || !FS.handle) return;
  try{ const txt = JSON.stringify(DB); if(txt===FS.last) return; const w = await FS.handle.createWritable(); await w.write(txt); await w.close(); FS.last = txt; }
  catch(e){ FS.state = "needs"; }
}
function scheduleFileSave(){ if(FS.state!=="ready") return; clearTimeout(FS.timer); FS.timer = setTimeout(fsWrite, 2500); }
async function fsRestore(){
  try{ if(FS.state!=="ready") await fsAllow(); const f = await FS.handle.getFile(), d = JSON.parse(await f.text());
    if(!d.profiles || !d.profiles.length) throw 0; d.profiles.forEach(ensure); DB = d; saveDB(); profilesScreen(); return true; }catch(e){ alert("Couldn't read the auto-save file."); return false; }
}
/* ---- Cloud sync (see SETUP-CLOUD.md). Newest copy of each profile wins; profiles from other devices are added. ---- */
var CS = {timer:null, last:0, busy:false, msg:""};
function mergeDB(r){
  if(!r || !r.profiles) return false; let changed = false;
  /* players removed on any device stay removed everywhere */
  const gone = new Set((DB.removed||[]).concat(r.removed||[]));
  DB.removed = [...gone];
  const before = DB.profiles.length;
  DB.profiles = DB.profiles.filter(x=>!gone.has(x.id));
  if(DB.profiles.length!==before){ changed = true; if(DB.current && !DB.profiles.some(x=>x.id===DB.current)) DB.current = null; }
  r.profiles.forEach(rp=>{
    if(gone.has(rp.id)) return;
    const lp = DB.profiles.find(x=>x.id===rp.id);
    if(!lp){ ensure(rp); DB.profiles.push(rp); changed = true; }
    else if((rp.upd||0) > (lp.upd||0)){ ensure(rp); Object.assign(lp, rp); changed = true; }
  });
  if(changed && !DB.current && DB.profiles.length===1) DB.current = DB.profiles[0].id;
  return changed;
}
async function cloudSync(){
  if(typeof Cloud==="undefined" || !Cloud.on || !Cloud.user() || CS.busy) return false;
  CS.busy = true;
  try{
    const r = await Cloud.pull(); if(!r.ok){ CS.msg = r.error; return false; }
    const changed = mergeDB(r.value); if(changed) persist();
    const w = await Cloud.push(DB); if(!w.ok){ CS.msg = w.error; return false; }
    CS.last = Date.now(); CS.msg = ""; return changed;
  } finally { CS.busy = false; }
}
function scheduleCloud(){
  if(typeof Cloud==="undefined" || !Cloud.on || !Cloud.user()) return;
  clearTimeout(CS.timer); CS.timer = setTimeout(()=>{ cloudSync(); }, 8000);
}
document.addEventListener("visibilitychange", ()=>{ if(document.hidden && typeof Cloud!=="undefined" && Cloud.user()){ clearTimeout(CS.timer); cloudSync(); } });
function cloudSignInScreen(msg){
  view(`<div class="card"><h2>☁️ Sign in to get my progress</h2>
    <p style="font-size:18px">Use the grown-up's email and password for Little Explorers Quest.</p>
    <p><input type="email" id="cem" placeholder="Email" autocomplete="username" style="width:min(320px,90%)"></p>
    <p><input type="password" id="cpw" placeholder="Password (6+ characters)" autocomplete="current-password" style="width:min(320px,90%)"></p>
    <div class="msg bad-t">${msg||""}</div>
    <div><button class="ok" id="cin">Sign in</button><button class="ghost" id="cup">Create account</button><button class="ghost" id="cback">Back</button></div></div>`, ()=>{
    const go = async fn=>{ const e=$("#cem").value.trim(), p=$("#cpw").value; if(!e||!p) return cloudSignInScreen("Please type your email and password.");
      $("#cin").disabled = $("#cup").disabled = true; const r = await fn(e,p);
      if(!r.ok) return cloudSignInScreen(r.error);
      await cloudSync(); DB.profiles.length ? (DB.profiles.length===1 ? (DB.current=DB.profiles[0].id, home()) : profilesScreen()) : createProfile(); };
    $("#cin").onclick = ()=>go(Cloud.signIn); $("#cup").onclick = ()=>go(Cloud.signUp);
    $("#cback").onclick = ()=> DB.profiles.length ? profilesScreen() : createProfile();
  }, {bare:true});
}
function dailyNow(p){ return p.daily.date===todayStr() ? p.daily : {date:todayStr(), chapters:[], count:0}; }

