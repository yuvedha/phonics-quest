/* =============================================================
   LITTLE EXPLORERS QUEST: MATHS CONTENT (Year 1 and Year 2)
   Each level lists generators: ["name", ...params]. A fresh question is made every time,
   so levels never run out. To add a level, push a new entry on the END of MATH_LEVELS.
   A question looks like {q, say, vis, type:"num"|"mc", ans, opts, why}
   ============================================================= */
const _r = (a,b)=>a+Math.floor(Math.random()*(b-a+1));
const _pick = a=>a[Math.floor(Math.random()*a.length)];
const _sh = a=>{ a=a.slice(); for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]];} return a; };
const _THINGS = ["🍎","🍓","🐟","⭐","🚗","🌸","🐞","🍪","🎈","🐥","🍩","🦋"];
const _NAMES = ["Mia","Ben","Zoe","Leo","Ava","Sam","Ella","Max","Ruby","Jack"];
const _rows = (n,e,per=5)=>{ let o=""; for(let i=0;i<n;i++){ o+=e+((i+1)%per===0&&i<n-1?"<br>":""); } return `<div class="mvis">${o}</div>`; };
const _opts = (ans, wrongs)=>{ const set=[ans]; for(const w of wrongs){ if(!set.includes(w)) set.push(w); } return _sh(set); };
function _numOpts(ans, lo=0, hi=99){ const w=[]; let tries=0; while(w.length<3 && tries++<60){ const v = ans + _pick([-10,-2,-1,1,2,10,-3,3]); if(v!==ans && v>=lo && v<=hi && !w.includes(v)) w.push(v); } return _opts(ans,w); }

const _svgShape = (kind)=>{
  const P = {triangle:"50,10 90,85 10,85", square:"20,20 80,20 80,80 20,80", rectangle:"8,28 92,28 92,72 8,72", pentagon:"50,8 92,38 76,88 24,88 8,38", hexagon:"28,10 72,10 96,50 72,90 28,90 4,50", diamond:"50,6 92,50 50,94 8,50"};
  const col = _pick(["#ff6b9d","#4dabf7","#51cf66","#ffd43b","#9775fa","#ff922b"]);
  const body = kind==="circle" ? `<circle cx="50" cy="50" r="40" fill="${col}" stroke="#33265a" stroke-width="4"/>` :
               kind==="oval" ? `<ellipse cx="50" cy="50" rx="44" ry="30" fill="${col}" stroke="#33265a" stroke-width="4"/>` :
               `<polygon points="${P[kind]}" fill="${col}" stroke="#33265a" stroke-width="4" stroke-linejoin="round"/>`;
  return `<svg viewBox="0 0 100 100" width="130" height="130">${body}</svg>`;
};
const _svgClock = (h,m)=>{
  const hx = 60+34*Math.sin(((h%12)+m/60)/12*2*Math.PI), hy = 60-34*Math.cos(((h%12)+m/60)/12*2*Math.PI);
  const mx = 60+50*Math.sin(m/60*2*Math.PI), my = 60-50*Math.cos(m/60*2*Math.PI);
  let nums=""; for(let i=1;i<=12;i++){ nums += `<text x="${60+47*Math.sin(i/12*2*Math.PI)}" y="${64-47*Math.cos(i/12*2*Math.PI)}" font-size="13" font-weight="bold" text-anchor="middle" fill="#33265a">${i}</text>`; }
  return `<svg viewBox="0 0 120 120" width="170" height="170"><circle cx="60" cy="60" r="58" fill="#fff" stroke="#33265a" stroke-width="4"/>${nums}<line x1="60" y1="60" x2="${hx}" y2="${hy}" stroke="#e0457b" stroke-width="6" stroke-linecap="round"/><line x1="60" y1="60" x2="${mx}" y2="${my}" stroke="#3b5bdb" stroke-width="4" stroke-linecap="round"/><circle cx="60" cy="60" r="4" fill="#33265a"/></svg>`;
};
const _svgPie = (parts, shaded)=>{
  let o = `<circle cx="60" cy="60" r="52" fill="#fff" stroke="#33265a" stroke-width="4"/>`;
  for(let i=0;i<parts;i++){
    const a0 = i/parts*2*Math.PI - Math.PI/2, a1 = (i+1)/parts*2*Math.PI - Math.PI/2;
    const x0 = 60+52*Math.cos(a0), y0 = 60+52*Math.sin(a0), x1 = 60+52*Math.cos(a1), y1 = 60+52*Math.sin(a1);
    o += `<path d="M60 60 L${x0} ${y0} A52 52 0 ${parts===2?1:0} 1 ${x1} ${y1}Z" fill="${i<shaded?"#ff6b9d":"#fff"}" stroke="#33265a" stroke-width="3"/>`;
  }
  return `<svg viewBox="0 0 120 120" width="150" height="150">${o}</svg>`;
};
const _coin = c => { const big = c>=100, label = big ? "$"+(c/100) : c+"c"; const col = big ? "#e0a800" : c>=20 ? "#c0c4cc" : "#d08a4a"; return `<span class="coin" style="background:${col};width:${big?56:c>=50?60:46}px;height:${big?56:c>=50?60:46}px">${label}</span>`; };

const MATH_GEN = {
  count: (max)=>{ const n=_r(max<=10?2:6,max), e=_pick(_THINGS); return {q:"How many are there?", say:"How many are there?", vis:_rows(n,e), type:"num", ans:n, why:`Count them one by one: ${n}.`}; },
  nextnum: (lo,hi)=>{ const n=_r(lo,hi-1); return {q:`What number comes <b>after</b> ${n}?`, say:`What number comes after ${n}?`, type:"num", ans:n+1}; },
  prevnum: (lo,hi)=>{ const n=_r(lo+1,hi); return {q:`What number comes <b>before</b> ${n}?`, say:`What number comes before ${n}?`, type:"num", ans:n-1}; },
  between: (lo,hi)=>{ const n=_r(lo,hi-2); return {q:`What number is <b>between</b> ${n} and ${n+2}?`, say:`What number is between ${n} and ${n+2}?`, type:"num", ans:n+1}; },
  add: (max,pics)=>{ const a=_r(1,max-1), b=_r(1,max-a), e=_pick(_THINGS); return {q:`${a} + ${b} = ?`, say:`${a} plus ${b}`, vis: pics&&a+b<=10 ? `<div class="mvis">${e.repeat(a)} ➕ ${_pick([e]).repeat(b)}</div>` : "", type:"num", ans:a+b, why:`${a} + ${b} = ${a+b}`}; },
  sub: (max,pics)=>{ const a=_r(2,max), b=_r(1,a-1), e=_pick(_THINGS); return {q:`${a} − ${b} = ?`, say:`${a} take away ${b}`, vis: pics&&a<=10 ? `<div class="mvis">${e.repeat(a-b)}<span style="opacity:.25">${e.repeat(b)}</span></div>` : "", type:"num", ans:a-b, why:`${a} − ${b} = ${a-b}`}; },
  bond: (total)=>{ const a=_r(1,total-1); return {q:`${a} + <b>?</b> = ${total}`, say:`${a} plus what makes ${total}?`, type:"num", ans:total-a, why:`${a} + ${total-a} = ${total}`}; },
  missing: (max)=>{ const a=_r(1,max-1), b=_r(1,max-a); return {q:`<b>?</b> + ${b} = ${a+b}`, say:`What plus ${b} makes ${a+b}?`, type:"num", ans:a, why:`${a} + ${b} = ${a+b}`}; },
  skip: (step,start)=>{ const s = start===undefined ? _r(0,3)*step : start, seq=[0,1,2,3,4].map(i=>s+i*step), hole=_r(1,3), ans=seq[hole]; return {q:seq.map((v,i)=>i===hole?"<b>?</b>":v).join(", "), say:`Count by ${step}s. What number is missing?`, type:"num", ans, why:`We count by ${step}s: ${seq.join(", ")}.`}; },
  tensones: (max)=>{ const t=_r(1,max), o=_r(0,9); return {q:`<b>${t}</b> tens and <b>${o}</b> ones = ?`, say:`${t} tens and ${o} ones. What number is that?`, vis:`<div class="mvis">${"🟦".repeat(t)}<br>${"🟨".repeat(o)}</div>`, type:"num", ans:t*10+o, why:`${t*10} + ${o} = ${t*10+o}`}; },
  tens: ()=>{ const n=_r(11,99), k=_pick(["tens","ones"]); return {q:`How many <b>${k}</b> in ${n}?`, say:`How many ${k} in ${n}?`, type:"num", ans:k==="tens"?Math.floor(n/10):n%10, why:`${n} is ${Math.floor(n/10)} tens and ${n%10} ones.`}; },
  bigger: (max)=>{ let a=_r(1,max), b=_r(1,max); while(b===a) b=_r(1,max); const big=_pick([true,false]); return {q:`Which number is <b>${big?"bigger":"smaller"}</b>?`, say:`Which number is ${big?"bigger":"smaller"}?`, type:"mc", ans:big?Math.max(a,b):Math.min(a,b), opts:_sh([a,b]), why:`${Math.max(a,b)} is more than ${Math.min(a,b)}.`}; },
  symbol: (max)=>{ const a=_r(1,max), b=_pick([a,_r(1,max)]); const s=a>b?">":a<b?"<":"="; return {q:`${a} <b>?</b> ${b}`, say:`Is ${a} more than, less than, or equal to ${b}?`, vis:`<div style="font-size:18px">&gt; more than &nbsp; &lt; less than &nbsp; = equal</div>`, type:"mc", ans:s, opts:[">","<","="], why:`${a} ${s} ${b}`}; },
  oddeven: (max)=>{ const n=_r(1,max); return {q:`Is <b>${n}</b> odd or even?`, say:`Is ${n} odd or even?`, type:"mc", ans:n%2?"odd":"even", opts:["odd","even"], why:`${n} is ${n%2?"odd":"even"}.`}; },
  double: (max)=>{ const n=_r(1,max); return {q:`Double <b>${n}</b>`, say:`What is double ${n}?`, vis:`<div class="mvis">${"🔵".repeat(n)}<br>${"🔵".repeat(n)}</div>`, type:"num", ans:n*2, why:`${n} + ${n} = ${n*2}`}; },
  half: (max)=>{ const n=_r(1,max)*2; return {q:`Half of <b>${n}</b>`, say:`What is half of ${n}?`, type:"num", ans:n/2, why:`${n/2} + ${n/2} = ${n}`}; },
  shape2: ()=>{ const k=_pick(["circle","square","triangle","rectangle","pentagon","hexagon","oval"]); return {q:"What shape is this?", say:"What shape is this?", vis:_svgShape(k), type:"mc", ans:k, opts:_opts(k,_sh(["circle","square","triangle","rectangle","pentagon","hexagon","oval"].filter(x=>x!==k)).slice(0,3)), why:`It is a ${k}.`}; },
  sides: ()=>{ const m={triangle:3,square:4,rectangle:4,pentagon:5,hexagon:6}, k=_pick(Object.keys(m)); return {q:`How many <b>sides</b> does this shape have?`, say:"How many sides does this shape have?", vis:_svgShape(k), type:"num", ans:m[k], why:`A ${k} has ${m[k]} sides.`}; },
  shape3: ()=>{ const m={sphere:"⚽",cube:"🎲",cylinder:"🥫",cone:"🍦",pyramid:"🔺"}, k=_pick(Object.keys(m)), nm=Object.keys(m); return {q:"What is the 3D shape of this?", say:"What is the 3D shape of this?", vis:`<div class="mvis" style="font-size:72px">${m[k]}</div>`, type:"mc", ans:k, opts:_opts(k,_sh(nm.filter(x=>x!==k)).slice(0,3)), why:`It is a ${k}.`}; },
  clock: (halfToo)=>{ const h=_r(1,12), m=(halfToo&&_pick([true,false]))?30:0, fmt=(hh,mm)=>`${hh}:${mm===0?"00":"30"}`; const ans=fmt(h,m); const wrong=_sh([fmt(h%12+1,m),fmt(h,m===0?30:0),fmt((h+10)%12+1,m),fmt(h%12+1,m===0?30:0)]); return {q:"What time is it?", say:"What time is it?", vis:_svgClock(h,m), type:"mc", ans, opts:_opts(ans,wrong), why: m===0?`${h} o'clock.`:`Half past ${h}.`}; },
  money: (maxc)=>{ const pool = maxc>100 ? [5,10,20,50,100,200] : [5,10,20,50]; let list=[], total=0; const n=_r(2,4); for(let i=0;i<n;i++){ const c=_pick(pool); if(total+c<=maxc){ list.push(c); total+=c; } } if(list.length<2){ list=[10,10]; total=20; } list.sort((a,b)=>b-a); return {q:"How many <b>cents</b> altogether?", say:"How many cents altogether?", vis:`<div class="mvis">${list.map(_coin).join(" ")}</div>`, type:"num", ans:total, why:`${list.map(c=>c>=100?"$"+c/100:c+"c").join(" + ")} = ${total}c`}; },
  fraction: ()=>{ const parts=_pick([2,4]), sh=parts===2?1:_pick([1,2,3]); const name=(a,b)=>a===1&&b===2?"1/2":`${a}/${b}`; const ans=name(sh,parts); const all=["1/2","1/4","2/4","3/4"]; return {q:"What fraction is <b>shaded</b>?", say:"What fraction is shaded?", vis:_svgPie(parts,sh), type:"mc", ans, opts:_opts(ans,_sh(all.filter(x=>x!==ans)).slice(0,3)), why:`${sh} of ${parts} equal parts are shaded: ${ans}.`}; },
  quarter: ()=>{ const n=_pick([4,8,12,16,20]); const half=_pick([true,false]); return {q:`${half?"Half":"A quarter"} of <b>${n}</b>`, say:`What is ${half?"half":"a quarter"} of ${n}?`, type:"num", ans:half?n/2:n/4, why:`Share ${n} into ${half?2:4} equal groups.`}; },
  add2: (kind)=>{ let a,b; if(kind==="tens"){ a=_r(1,6)*10; b=_r(1,9-a/10+1)*10; } else if(kind==="ones"){ a=_r(1,8)*10+_r(0,4); b=_r(1,5); } else { a=_r(10,60); b=_r(10,99-a); } return {q:`${a} + ${b} = ?`, say:`${a} plus ${b}`, type:"num", ans:a+b, why:`${a} + ${b} = ${a+b}`}; },
  sub2: (kind)=>{ let a,b; if(kind==="tens"){ a=_r(3,9)*10; b=_r(1,a/10-1)*10; } else if(kind==="ones"){ a=_r(3,9)*10+_r(5,9); b=_r(1,5); } else { a=_r(30,99); b=_r(10,a-5); } return {q:`${a} − ${b} = ?`, say:`${a} take away ${b}`, type:"num", ans:a-b, why:`${a} − ${b} = ${a-b}`}; },
  measure: ()=>{ const P=[["Which is <b>longer</b>?","🐍 snake","🐜 ant","🐍 snake"],["Which is <b>longer</b>?","🚌 bus","🚲 bike","🚌 bus"],["Which is <b>heavier</b>?","🐘 elephant","🐱 cat","🐘 elephant"],["Which is <b>heavier</b>?","🪨 rock","🪶 feather","🪨 rock"],["Which is <b>lighter</b>?","🎈 balloon","🧱 brick","🎈 balloon"],["Which is <b>shorter</b>?","✏️ pencil","🪜 ladder","✏️ pencil"],["Which holds <b>more</b>?","🛁 bath","🥛 cup","🛁 bath"],["Which holds <b>less</b>?","🥄 spoon","🪣 bucket","🥄 spoon"],["Which is <b>taller</b>?","🦒 giraffe","🐕 dog","🦒 giraffe"],["Which is <b>longer</b>?","🛤️ train","🚗 car","🛤️ train"]]; const p=_pick(P); return {q:p[0], say:p[0].replace(/<\/?b>/g,""), type:"mc", ans:p[3], opts:_sh([p[1],p[2]]), why:`The ${p[3].split(" ")[1]} is the answer.`}; },
  day: ()=>{ const D=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"], i=_r(0,6), after=_pick([true,false]), ans=D[(i+(after?1:6))%7]; return {q:`Which day comes <b>${after?"after":"before"}</b> ${D[i]}?`, say:`Which day comes ${after?"after":"before"} ${D[i]}?`, type:"mc", ans, opts:_opts(ans,_sh(D.filter(x=>x!==ans)).slice(0,3)), why:`${ans} comes ${after?"after":"before"} ${D[i]}.`}; },
  month: ()=>{ const M=["January","February","March","April","May","June","July","August","September","October","November","December"], i=_r(0,11), ans=M[(i+1)%12]; return {q:`Which month comes <b>after</b> ${M[i]}?`, say:`Which month comes after ${M[i]}?`, type:"mc", ans, opts:_opts(ans,_sh(M.filter(x=>x!==ans)).slice(0,3)), why:`${ans} comes after ${M[i]}.`}; },
  story: (max,op)=>{ const n=_pick(_NAMES), e=_pick(_THINGS), plus = op==="+" || (op==="mix"&&_pick([true,false]));
    const a = plus ? _r(2,max-1) : _r(3,max), b = plus ? _r(1,max-a) : _r(1,a-1);
    if(plus){ const t=_pick(["gets","finds","is given"]); return {q:`${n} has ${a} ${e}. ${n} ${t} ${b} more. How many ${e} now?`, say:`${n} has ${a}. ${n} ${t} ${b} more. How many now?`, type:"num", ans:a+b, why:`${a} + ${b} = ${a+b}`}; }
    return {q:`${n} has ${a} ${e}. ${n} gives away ${b}. How many ${e} are left?`, say:`${n} has ${a}. ${n} gives away ${b}. How many are left?`, type:"num", ans:a-b, why:`${a} − ${b} = ${a-b}`}; },
  groups: ()=>{ const g=_r(2,5), n=_pick([2,5,10]); return {q:`${g} bags with ${n} ${_pick(_THINGS)} in each. How many altogether?`, say:`${g} bags with ${n} in each. How many altogether?`, type:"num", ans:g*n, why:`Count by ${n}s, ${g} times: ${g*n}.`}; },
  pattern: ()=>{ const sets=[["🔴","🔵"],["⭐","🌙"],["🍎","🍌","🍎"],["🔺","⬛","⬛"],["🐱","🐶","🐱","🐭"]], p=_pick(sets), len=p.length*2+1, seq=[]; for(let i=0;i<len;i++) seq.push(p[i%p.length]); const ans=p[len%p.length]; const all=[...new Set(sets.flat())]; return {q:`What comes <b>next</b>?`, say:"What comes next in the pattern?", vis:`<div class="mvis">${seq.join(" ")} ❓</div>`, type:"mc", ans, opts:_opts(ans,_sh(p.filter(x=>x!==ans).concat(all.filter(x=>x!==ans&&!p.includes(x)))).slice(0,3)), why:"Look at the pattern repeating."}; },
  numpat: ()=>{ const step=_pick([2,3,4,5,10]), s=_r(1,10), seq=[0,1,2,3].map(i=>s+i*step); return {q:`${seq.join(", ")}, <b>?</b>`, say:"What number comes next?", type:"num", ans:s+4*step, why:`The pattern adds ${step} each time.`}; },
  ordinal: ()=>{ const O=["1st","2nd","3rd","4th","5th"], W=["first","second","third","fourth","fifth"], i=_r(0,4), row=_sh(["🐶","🐱","🐰","🐻","🦊"]); return {q:`Which animal is <b>${W[i]}</b> in the line?`, say:`Which animal is ${W[i]} in the line?`, vis:`<div class="mvis">${row.join(" ")}</div>`, type:"mc", ans:row[i], opts:_sh(row.slice(0,4).includes(row[i])?row.slice(0,4):row.slice(0,3).concat(row[i])), why:`Count from the left: ${O[i]}.`}; },
  chart: ()=>{ const items=_sh(["🍎","🍌","🍇"]), c=items.map(()=>_r(1,6)); const k=_r(0,2), ask=_pick(["many","most"]); const vis=`<div class="mvis" style="text-align:left;display:inline-block">${items.map((e,i)=>`${e} ${"🟩".repeat(c[i])}`).join("<br>")}</div>`; if(ask==="many") return {q:`How many ${items[k]} are in the chart?`, say:`How many ${items[k]} are in the chart?`, vis, type:"num", ans:c[k], why:`Count the squares: ${c[k]}.`}; const mx=Math.max(...c); if(c.filter(x=>x===mx).length>1) return MATH_GEN.chart(); return {q:"Which fruit has the <b>most</b>?", say:"Which fruit has the most?", vis, type:"mc", ans:items[c.indexOf(mx)], opts:items, why:"It has the longest row."}; }
};

const MATH_LEVELS = [
  {name:"Counting to 10", gens:[["count",10],["nextnum",1,9],["prevnum",1,10]]},
  {name:"Counting to 20", gens:[["count",20],["nextnum",5,19],["prevnum",5,20],["between",5,19]]},
  {name:"Adding to 10 with pictures", gens:[["add",10,true]]},
  {name:"Taking away to 10", gens:[["sub",10,true]]},
  {name:"Number bonds to 10", gens:[["bond",10],["add",10,false],["sub",10,false]]},
  {name:"Adding to 20", gens:[["add",20,false],["missing",20],["bond",20]]},
  {name:"Taking away to 20", gens:[["sub",20,false],["sub",10,false],["story",20,"-"]]},
  {name:"Skip counting by 2, 5 and 10", gens:[["skip",2],["skip",5],["skip",10]]},
  {name:"Tens and ones", gens:[["tensones",9],["tens"],["nextnum",20,99]]},
  {name:"Bigger, smaller, equal", gens:[["bigger",50],["symbol",50],["oddeven",30]]},
  {name:"Doubles and halves", gens:[["double",10],["half",10],["oddeven",50]]},
  {name:"2D shapes", gens:[["shape2"],["sides"]]},
  {name:"3D shapes", gens:[["shape3"],["shape2"]]},
  {name:"Telling the time", gens:[["clock",false],["day"]]},
  {name:"Half past and calendar", gens:[["clock",true],["day"],["month"]]},
  {name:"Money: coins up to 50c", gens:[["money",50]]},
  {name:"Money: coins up to $2", gens:[["money",200],["money",100]]},
  {name:"Halves and quarters", gens:[["fraction"],["quarter"],["half",10]]},
  {name:"Adding tens", gens:[["add2","tens"],["add2","ones"],["skip",10]]},
  {name:"Adding bigger numbers", gens:[["add2","ones"],["add2","any"],["story",50,"+"]]},
  {name:"Taking away tens", gens:[["sub2","tens"],["sub2","ones"],["skip",10]]},
  {name:"Taking away bigger numbers", gens:[["sub2","ones"],["sub2","any"],["story",50,"-"]]},
  {name:"Length, weight and size", gens:[["measure"]]},
  {name:"Patterns", gens:[["pattern"],["numpat"],["skip",3]]},
  {name:"Groups and sharing", gens:[["groups"],["half",10],["quarter"]]},
  {name:"Word problems", gens:[["story",20,"mix"],["groups"],["story",50,"mix"]]},
  {name:"Charts and positions", gens:[["chart"],["ordinal"],["pattern"]]},
  {name:"Maths mix: big challenge", gens:[["add2","any"],["sub2","any"],["clock",true],["money",200],["fraction"],["story",50,"mix"],["groups"]]}
];
