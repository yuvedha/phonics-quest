/* =============================================================
   START
   ============================================================= */
if(typeof Cloud!=="undefined" && Cloud.on) Cloud.init().then(async u=>{ if(!u) return; const ch = await cloudSync(); if(ch){ if(P() && document.querySelector("#closet")) home(); else if(!P() && DB.profiles.length) profilesScreen(); } }).catch(()=>{});
if("serviceWorker" in navigator && location.protocol.startsWith("http")) navigator.serviceWorker.register("sw.js").catch(()=>{});
var INSTALL = null;
window.addEventListener("beforeinstallprompt", e=>{ e.preventDefault(); INSTALL = e; });
window.addEventListener("appinstalled", ()=>{ INSTALL = null; });
fsInit().then(()=>{ if(DB.profiles.length===0 && FS.handle) createProfile(); else if(FS.state==="needs" && P() && document.querySelector("#closet")) home(); });
if(DB.profiles.length === 0){ applyTheme(); createProfile(); }
else if(DB.profiles.length === 1){ DB.current = DB.profiles[0].id; home(); }
else profilesScreen();
