/* =============================================================
   GROWN-UP CORNER
   ============================================================= */
function grownUp(){ if(!askPin()) return; showGrownUp(); }
function cloudSection(){
  if(typeof Cloud==="undefined" || !Cloud.on) return `<h3>☁️ Cloud sync</h3><p style="font-size:18px">Not turned on. It would let progress follow her to other devices. See SETUP-CLOUD.md in the project to switch it on.</p>`;
  if(!Cloud.user()) return `<h3>☁️ Cloud sync</h3><p style="font-size:18px">Not signed in.</p><button class="small ok" id="cloudIn">Sign in or create account</button>`;
  return `<h3>☁️ Cloud sync</h3><p style="font-size:18px">✅ Signed in as <b>${esc(Cloud.email())}</b>. ${CS.last?"Last synced "+new Date(CS.last).toLocaleTimeString():"Not synced yet this visit."}${CS.msg?`<br><span style="color:#c2233f">${esc(CS.msg)}</span>`:""}</p><button class="small ok" id="cloudNow">🔄 Sync now</button><button class="small ghost" id="cloudOut">Sign out</button>`;
}
/* =============================================================
   GROWN-UP PROGRESS REPORT: strengths, areas to improve and suggestions
   ============================================================= */
const MATH_LABEL = {count:"Counting",nextnum:"Number after",prevnum:"Number before",between:"Number between",add:"Adding",sub:"Taking away",bond:"Number bonds",missing:"Missing numbers",skip:"Skip counting",tensones:"Tens and ones",tens:"Tens and ones",bigger:"Bigger and smaller",symbol:"More, less, equal signs",oddeven:"Odd and even",double:"Doubles",half:"Halves",shape2:"2D shapes",sides:"Sides of shapes",shape3:"3D shapes",clock:"Telling the time",money:"Money",fraction:"Fractions",quarter:"Quarters",add2:"Adding bigger numbers",sub2:"Taking away bigger numbers",measure:"Length and weight",day:"Days of the week",month:"Months",story:"Word problems",groups:"Groups",pattern:"Patterns",numpat:"Number patterns",ordinal:"1st, 2nd, 3rd",chart:"Charts"};
function statLabel(k){
  if(/^m:/.test(k)) return "Maths: "+(MATH_LABEL[k.slice(2)]||k.slice(2));
  if(/^t:/.test(k)) return "Time: "+(TIME_LABEL[k.slice(2)]||k.slice(2));
  if(/^k:/.test(k)) return "Facts: "+k.slice(2);
  if(/^y:/.test(k)) return "Science: "+(SCI_LABEL[k.slice(2)]||k.slice(2));
  if(/^g:/.test(k)){ const n=k.slice(2), b=n.split(":")[0]; return "Geography: "+(GEO_LABEL[b]||n); }
  if(/^[wdpx]:/.test(k)) return k.slice(2);
  const a = k.split(":"); return "sound “"+a[1]+"” ("+a[2]+")";
}
function reportScreen(){
  const p = P(), today = todayStr();
  const log = p.log || [];
  const days = [...new Set(log.map(x=>x.d))];
  const last7 = [...Array(7)].map((_,i)=>{ const d = addDaysStr(i-6), n = log.filter(x=>x.d===d).length; return {d, n, lab:new Date(d+"T12:00:00").toLocaleDateString(undefined,{weekday:"short"})}; });
  const maxN = Math.max(3, ...last7.map(x=>x.n));
  const streak = (p.streak.last===today || p.streak.last===yesterdayStr()) ? p.streak.n : 0;
  // chapter summaries
  const chs = CHS.filter(ch=>ch!=="c6" || c6Ready(p) || (p.c6&&p.c6.count)).map(ch=>{
    const d = p.done[ch]||{}, lvls = Object.keys(d).filter(k=>d[k]>0), n = lvls.length;
    const avg = n ? lvls.reduce((a,k)=>a+d[k],0)/n : 0;
    const recent = log.filter(x=>x.ch===ch).slice(-6), ravg = recent.length ? recent.reduce((a,x)=>a+x.st,0)/recent.length : 0;
    const daily = !!CH[ch].daily, played = daily ? (p.c6&&p.c6.count||0) : n;
    let tag = "new", txt = "Not started yet";
    if(played){ const a = recent.length ? ravg : avg; if(a>=2.5){ tag="strong"; txt="Doing great"; } else if(a>=1.8){ tag="ok"; txt="Going well"; } else { tag="work"; txt="Needs more practice"; } }
    const stuck = !daily && p.prog[ch] <= CH[ch].max && (d[p.prog[ch]]||0) === 1 ? p.prog[ch] : 0;
    return {ch, n, avg, ravg, daily, played, tag, txt, stuck, pct: daily ? 0 : Math.round(n/CH[ch].max*100)};
  });
  // weak and strong items
  const items = Object.entries(p.stats).map(([k,v])=>({k, ...v}));
  const weak = items.filter(r=>r.miss>r.ok || r.miss>=2).sort((a,b)=>(b.miss-b.ok)-(a.miss-a.ok)).slice(0,12);
  const mastered = items.filter(r=>r.ok>=2 && r.ok>=r.miss*2).length;
  const weakWords = weak.filter(r=>/^[wxpd]:/.test(r.k)), weakSounds = weak.filter(r=>/^s:/.test(r.k)||(!/^[wxpdmtkgy]:/.test(r.k))), weakMaths = weak.filter(r=>/^m:/.test(r.k));
  // suggestions
  const tips = [];
  const lastDay = days.length ? days[days.length-1] : "";
  const gap = lastDay ? Math.round((new Date(today)-new Date(lastDay))/864e5) : null;
  if(!log.length) tips.push("📅 Start with one level a day. The report fills in as she plays.");
  else if(gap>=2) tips.push(`📅 She last played ${gap} days ago. Even one short level a day keeps the habit going and her streak alive.`);
  else if(gap===1) tips.push("📅 One level today keeps her streak going.");
  chs.filter(c=>c.tag==="work" && !c.stuck).forEach(c=>tips.push(`🎯 ${CH[c.ch].icon} <b>${CH[c.ch].name}</b>: replay the level she's on to earn more stars. Short, repeated practice works better than long sessions.`));
  chs.filter(c=>c.stuck).forEach(c=>tips.push(`🔓 ${CH[c.ch].icon} <b>${CH[c.ch].name}</b>: Level ${c.stuck} only got 1 star, so the next level is still locked. Do it with her and talk through the tricky bits.`));
  if(weakWords.length) tips.push(`✏️ Practise these words together on paper or out loud: <b>${weakWords.slice(0,6).map(r=>esc(statLabel(r.k))).join(", ")}</b>. Look, say, cover, write, check.`);
  if(weakSounds.length) tips.push(`🔊 Sounds to revisit: <b>${weakSounds.slice(0,5).map(r=>esc(statLabel(r.k))).join(", ")}</b>. Replay the Say the Sounds chapter or the matching Digraph Lesson.`);
  if(weakMaths.length) tips.push(`🔢 Maths to revisit: <b>${weakMaths.slice(0,4).map(r=>esc(statLabel(r.k).replace("Maths: ",""))).join(", ")}</b>. Use real things at home, like counting toast or coins.`);
  const weakGK = weak.filter(r=>/^[tkgy]:/.test(r.k));
  if(weakGK.length) tips.push(`🌍 General knowledge to revisit: <b>${weakGK.slice(0,4).map(r=>esc(statLabel(r.k).replace(/^(Time|Facts|Geography|Science): /,""))).join(", ")}</b>. Talk about these in everyday life, like reading the kitchen clock together.`);
  const strongs = chs.filter(c=>c.tag==="strong");
  strongs.forEach(c=>{ if(!c.daily && p.prog[c.ch] < CH[c.ch].max) tips.push(`🚀 ${CH[c.ch].icon} <b>${CH[c.ch].name}</b> is going really well. Let her keep moving up, or do two levels a day to go faster.`); });
  const notStarted = chs.filter(c=>c.tag==="new" && !c.daily);
  if(notStarted.length && log.length) tips.push(`🌈 Not tried yet: ${notStarted.map(c=>CH[c.ch].icon+" "+CH[c.ch].name).join(", ")}. A bit of variety keeps it fun.`);
  if(p.micMode!=="mic" && SR) tips.push("🎤 Reading Rocket can listen through the microphone and show which words she read correctly (turn it on in Reading Rocket's level list).");
  tips.push("💬 Praise effort, not just stars: “I loved how you kept trying!”");
  const bar = pct=>`<div class="rbar"><div style="width:${pct}%"></div></div>`;
  const totalLv = chs.reduce((a,c)=>a+(c.daily?0:c.n),0);
  view(`<div class="card report" style="text-align:left">
    <h2 style="text-align:center">📊 ${esc(p.name)}'s Progress Report</h2>
    <p style="text-align:center;margin:0;font-size:16px">${new Date().toLocaleDateString(undefined,{day:"numeric",month:"long",year:"numeric"})}</p>
    <div class="row rtiles">
      <div class="rt"><div class="rn">🔥 ${streak}</div><div>day streak</div></div>
      <div class="rt"><div class="rn">⭐ ${p.points}</div><div>points</div></div>
      <div class="rt"><div class="rn">✅ ${totalLv}</div><div>levels finished</div></div>
      <div class="rt"><div class="rn">📅 ${days.length}</div><div>days played</div></div>
    </div>
    <h3>This week</h3>
    <div class="rweek">${last7.map(x=>`<div class="rd"><div class="rcol"><div style="height:${Math.round(x.n/maxN*100)}%"></div></div><div class="rl">${x.n||"·"}</div><div class="rl">${x.lab}</div></div>`).join("")}</div>
    <div style="font-size:14px;text-align:center">Levels finished each day. The day-by-day record starts from when this report was added.</div>
    <h3>How she's doing in each chapter</h3>
    ${chs.map(c=>`<div class="rchap"><div class="rtop"><b>${CH[c.ch].icon} ${CH[c.ch].name}</b><span class="rtag ${c.tag}">${c.txt}</span></div>
      ${c.daily ? `<div style="font-size:16px">Finished ${c.played} time${c.played===1?"":"s"}</div>` : `${bar(c.pct)}<div style="font-size:16px">${c.n} of ${CH[c.ch].max} levels finished${c.n?` · average ${c.avg.toFixed(1)} ⭐`:""}</div>`}</div>`).join("")}
    <h3>🌟 Strengths</h3>
    <p style="font-size:18px">${strongs.length ? strongs.map(c=>CH[c.ch].icon+" "+CH[c.ch].name).join(", ")+" are going really well. " : ""}${mastered ? `She has got <b>${mastered}</b> word${mastered===1?"":"s"} and skills right again and again.` : (strongs.length?"":"Strengths will show up as she plays more.")}</p>
    <h3>🔍 Areas to improve</h3>
    ${weak.length ? `<div class="rweak">${weak.map(r=>`<span class="rchip">${esc(statLabel(r.k))} <small>missed ${r.miss}</small></span>`).join("")}</div>` : `<p style="font-size:18px">Nothing is standing out yet. Great start!</p>`}
    <h3>💡 Suggestions for this week</h3>
    <ul class="rtips">${tips.map(t=>`<li>${t}</li>`).join("")}</ul>
    <div class="row noprint"><button class="small ghost" id="rprint">🖨️ Print or save as PDF</button><button class="small" id="rback">⬅ Back to Grown-up corner</button></div>
  </div>`, ()=>{ $("#rback").onclick = showGrownUp; $("#rprint").onclick = ()=>window.print(); });
}
function showGrownUp(){
  const p = P();
  const rows = Object.entries(p.stats).map(([k,v])=>({k, ...v})).filter(r=>r.miss>0).sort((a,b)=>b.miss-a.miss);
  const label = statLabel;
    view(`<div class="card" style="text-align:left"><h2>👩‍👧 Grown-up corner: ${esc(p.name)}</h2>
    <div style="text-align:center"><button class="ok" id="rep">📊 Progress report &amp; suggestions</button></div>
    <h3>Levels reached</h3><p style="font-size:18px">${CHS.map(ch=>`${CH[ch].icon} ${CH[ch].name}: ${CH[ch].daily?"times finished "+(p.c6&&p.c6.count||0):"level "+todayLevel(p,ch)+" of "+CH[ch].max}`).join("<br>")}</p>
    <h3>Needs more practice</h3>
    <p style="font-size:18px">${rows.length ? rows.map(r=>`<b>${esc(label(r.k))}</b> (missed ${r.miss}, right ${r.ok})`).join(" · ") : "Nothing yet!"}</p>
    <h3>Auto-save file</h3><p style="font-size:18px">${FS.state==="unsupported"?"Not available in this browser. Use Chrome or Edge on the laptop.":FS.state==="ready"?"✅ On. Progress is saved to a file on this computer after every change, so clearing the browser will not lose it.":FS.state==="needs"?"⏸ Paused. Tap the button to turn it back on.":"Not set up yet. Choose a file once (for example in Documents) and progress saves there automatically."}</p>${FS.state==="none"?`<button class="small ok" id="fsPick">💾 Choose auto-save file</button>`:""}${FS.state==="needs"?`<button class="small ok" id="fsOn2">▶ Turn auto-save on</button>`:""}${FS.state==="ready"?`<button class="small ghost" id="fsPick">Change file</button>`:""}
    ${cloudSection()}
    <h3>📲 Install as an app</h3><p style="font-size:18px">${INSTALL?"Add Little Explorers Quest to this device so it opens in its own window with its own icon.":"On a computer, use the install icon in the address bar of Chrome or Edge. On an iPad or iPhone, tap Share, then Add to Home Screen."}</p>${INSTALL?`<button class="small ok" id="inst">📲 Install now</button>`:""}
    <h3>Backup</h3><p style="font-size:18px">Last backup: <b>${p.lastBackup||"never"}</b>. The home screen reminds you each week.</p><h3>Sound checking</h3><p style="font-size:18px">Currently: <b>${p.micMode==="mic"?"microphone listens":"grown-up taps “She said it”"}</b>. Change it in Chapter 2 → All levels.</p>
    <div class="row"><button class="small" id="exp">💾 Save a backup file</button><button class="small ghost" id="imp">📂 Restore from backup</button></div>
    <input type="file" id="file" accept=".json" style="display:none">
    <button class="small alt" id="del">Delete this player</button></div>`, ()=>{
      $("#rep").onclick = reportScreen;
      $("#del").onclick = ()=>{ if(confirm("Delete "+p.name+" and all their progress?")){ DB.profiles = DB.profiles.filter(x=>x.id!==p.id); DB.current = null; saveDB(); profilesScreen(); } };
      $("#exp").onclick = ()=>{ downloadBackup(); showGrownUp(); };
      const ins = $("#inst"); if(ins) ins.onclick = async()=>{ INSTALL.prompt(); await INSTALL.userChoice; INSTALL = null; showGrownUp(); };
      const ci = $("#cloudIn"); if(ci) ci.onclick = ()=>cloudSignInScreen();
      const cn = $("#cloudNow"); if(cn) cn.onclick = async()=>{ cn.disabled = true; await cloudSync(); showGrownUp(); };
      const co = $("#cloudOut"); if(co) co.onclick = async()=>{ await Cloud.signOut(); showGrownUp(); };
      const fp = $("#fsPick"); if(fp) fp.onclick = async()=>{ await fsPick(); showGrownUp(); };
      const f2 = $("#fsOn2"); if(f2) f2.onclick = async()=>{ await fsAllow(); showGrownUp(); };
      $("#imp").onclick = ()=>$("#file").click();
      $("#file").onchange = e=>{
        const f = e.target.files[0]; if(!f) return;
        const r = new FileReader();
        r.onload = ()=>{ try{ const d = JSON.parse(r.result); if(!d.profiles) throw 0; d.profiles.forEach(ensure); DB = d; saveDB(); alert("Backup restored!"); profilesScreen(); }catch(err){ alert("That file doesn't look like a Little Explorers Quest backup."); } };
        r.readAsText(f);
      };
    });
}

