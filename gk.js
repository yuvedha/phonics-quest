/* =============================================================
   LITTLE EXPLORERS QUEST: GENERAL KNOWLEDGE (Time Teller and Wonder World)
   Same level format as maths.js: gens = [["generatorName", ...params]]. Add new levels at the END of a list.
   Uses the helpers (_r, _pick, _sh, _opts, _svgClock) defined in maths.js.
   ============================================================= */
const TIME_LABEL = {oclock:"O'clock", half:"Half past", quarter:"Quarter past and to", five:"Five-minute times", say:"Saying the time", digital:"Digital to words", which:"Matching clocks", after:"Hours later", duration:"How long", facts:"Clock facts", partofday:"Morning, afternoon, night", season:"Seasons", monthbefore:"Months", day:"Days", month:"Months"};
const _pad = m => (m<10?"0":"")+m;
const _tfmt = (h,m)=>`${h}:${_pad(m)}`;
const _MINS = {oclock:[0], half:[30], quarter:[15,45], five:[5,10,20,25,35,40,50,55], easy:[0,30], mid:[0,15,30,45], all:[0,5,10,15,20,25,30,35,40,45,50,55]};
function _tmins(kind){ const k = kind.split("+"); return k.flatMap(x=>_MINS[x]||[0]); }
function _twords(h,m){
  const nx = h%12+1;
  if(m===0) return `${h} o'clock`;
  if(m===15) return `quarter past ${h}`;
  if(m===30) return `half past ${h}`;
  if(m===45) return `quarter to ${nx}`;
  return m<30 ? `${m} past ${h}` : `${60-m} to ${nx}`;
}
const _miniClock = (h,m)=>_svgClock(h,m).replace('width="170" height="170"','width="96" height="96"');
const _SEASONS = {12:"summer",1:"summer",2:"summer",3:"autumn",4:"autumn",5:"autumn",6:"winter",7:"winter",8:"winter",9:"spring",10:"spring",11:"spring"};
const _MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const _tdeck = {};
function _draw(deckKey, list){ if(!_tdeck[deckKey] || !_tdeck[deckKey].length) _tdeck[deckKey] = _sh(list); return _tdeck[deckKey].pop(); }

const TIME_FACTS = [
  ["How many minutes are in one hour?","60",["30","100"]],["How many hours are in one day?","24",["12","10"]],
  ["How many days are in one week?","7",["5","10"]],["How many months are in one year?","12",["10","7"]],
  ["Which hand on the clock is shorter?","the hour hand",["the minute hand","neither"]],["Which hand on the clock is longer?","the minute hand",["the hour hand","neither"]],
  ["Which hand tells us the hour?","the short hand",["the long hand","the numbers"]],["How many minutes are in half an hour?","30",["15","60"]],
  ["How many minutes are in a quarter of an hour?","15",["10","20"]],["What do we call 12 o'clock in the middle of the night?","midnight",["noon","sunrise"]],
  ["What do we call 12 o'clock in the middle of the day?","noon",["midnight","sunset"]],["Which month has the fewest days?","February",["June","April"]],
  ["Which two days make the weekend?","Saturday and Sunday",["Monday and Tuesday","Friday and Saturday"]],["What is the first day of the school week?","Monday",["Sunday","Friday"]],
  ["When the big hand points to 12, the time is…","o'clock",["half past","quarter to"]],["When the big hand points to 6, the time is…","half past",["o'clock","quarter past"]],
  ["When the big hand points to 3, the time is…","quarter past",["half past","quarter to"]],["When the big hand points to 9, the time is…","quarter to",["quarter past","o'clock"]]
];
const PARTS = [["You wake up and eat breakfast in the…","morning"],["You see the moon and the stars at…","night"],["School finishes in the…","afternoon"],["You have a bath and read a story in the…","evening"],["The sun comes up in the…","morning"],["You go to sleep at…","night"],["You eat lunch in the middle of the…","day"],["The sun goes down in the…","evening"]];

const TIME_GEN = {
  tclock: (kind)=>{ const m=_pick(_tmins(kind)), h=_r(1,12), ans=_tfmt(h,m); const wr=[_tfmt(h%12+1,m),_tfmt((h+10)%12+1,m),_tfmt(h,_pick(_tmins("all").filter(x=>x!==m))),_tfmt(m===0?h:Math.max(1,Math.round(m/5)),m===0?_pick([15,30,45]):0)];
    return {q:"What time does the clock show?", say:"What time does the clock show?", vis:_svgClock(h,m), type:"mc", ans, opts:_opts(ans,_sh(wr.filter(x=>x!==ans)).slice(0,3)), why:`${_twords(h,m)}: ${ans}`, key:"oclock"}; },
  tsay: (kind)=>{ const m=_pick(_tmins(kind)), h=_r(1,12), ans=_twords(h,m); const pool=[_twords(h%12+1,m),_twords(h,_pick(_tmins("mid").filter(x=>x!==m))),_twords((h+10)%12+1,m),_twords(h,m===30?0:30)];
    return {q:"How do we say this time?", say:"How do we say this time?", vis:_svgClock(h,m), type:"mc", ans, opts:_opts(ans,_sh(pool.filter(x=>x!==ans)).slice(0,3)), why:`It is ${ans}.`, key:"say"}; },
  tdigital: (kind)=>{ const m=_pick(_tmins(kind)), h=_r(1,12), ans=_twords(h,m); const pool=[_twords(h%12+1,m),_twords(h,_pick(_tmins("mid").filter(x=>x!==m))),_twords((h+10)%12+1,m),_twords(h,m===30?0:30)];
    return {q:`Say <b>${_tfmt(h,m)}</b> in words`, say:`How do we say ${_tfmt(h,m)} in words?`, vis:`<div class="mvis" style="font-size:64px;font-family:monospace;background:#1e1e2e;color:#7bffb2;display:inline-block;padding:6px 22px;border-radius:14px">${_tfmt(h,m)}</div>`, type:"mc", ans, opts:_opts(ans,_sh(pool.filter(x=>x!==ans)).slice(0,3)), why:`${_tfmt(h,m)} is ${ans}.`, key:"digital"}; },
  twhich: (kind)=>{ const m=_pick(_tmins(kind)), h=_r(1,12), others=[]; let guard=0; while(others.length<2 && guard++<40){ const hh=_pick([h,h%12+1,(h+10)%12+1,_r(1,12)]), mm=_pick([m,_pick(_tmins(kind))]); const t=_tfmt(hh,mm); if(t!==_tfmt(h,m) && !others.some(o=>o.t===t)) others.push({t,hh,mm}); }
    const ans=_miniClock(h,m); return {q:`Which clock shows <b>${_tfmt(h,m)}</b>?`, say:`Which clock shows ${_twords(h,m)}?`, type:"mc", ans, opts:_sh([ans,...others.map(o=>_miniClock(o.hh,o.mm))]), why:`${_twords(h,m)} is ${_tfmt(h,m)}.`, key:"which"}; },
  after: (kind)=>{ const h=_r(1,10), d=_r(1,3), m=_pick(_tmins(kind||"easy")), ans=_tfmt(((h+d-1)%12)+1,m); const pool=[_tfmt(((h+d)%12)+1,m),_tfmt(((h+d-2+12)%12)+1,m),_tfmt(h,m===0?30:0)];
    return {q:`It is <b>${_tfmt(h,m)}</b>. What time will it be in <b>${d} hour${d>1?"s":""}</b>?`, say:`It is ${_twords(h,m)}. What time will it be in ${d} hour${d>1?"s":""}?`, type:"mc", ans, opts:_opts(ans,_sh(pool.filter(x=>x!==ans)).slice(0,3)), why:`${_tfmt(h,m)} plus ${d} hour${d>1?"s":""} is ${ans}.`, key:"after"}; },
  duration: ()=>{ const s=_r(1,8), d=_r(1,4), n=_pick(_NAMES), act=_pick(["reads a book","plays outside","watches a movie","goes to the park"]);
    return {q:`${n} ${act} from ${s} o'clock to ${s+d} o'clock. How many <b>hours</b> is that?`, say:`${n} ${act} from ${s} o'clock to ${s+d} o'clock. How many hours is that?`, vis:`<div class="mvis">${_svgClock(s,0).replace('width="170" height="170"','width="110" height="110"')} ➜ ${_svgClock(s+d>12?s+d-12:s+d,0).replace('width="170" height="170"','width="110" height="110"')}</div>`, type:"num", ans:d, why:`From ${s} to ${s+d} is ${d} hour${d>1?"s":""}.`, key:"duration"}; },
  tfact: ()=>{ const f=_draw("timefacts",TIME_FACTS); return {q:f[0], say:f[0], type:"mc", ans:f[1], opts:_sh([f[1],...f[2]]), why:`The answer is ${f[1]}.`, key:"facts"}; },
  partofday: ()=>{ const f=_draw("parts",PARTS), all=["morning","afternoon","evening","night"].filter(x=>x!==f[1]); return {q:f[0], say:f[0], type:"mc", ans:f[1], opts:_sh([f[1],..._sh(all).slice(0,f[1]==="day"?2:2)]), why:`The answer is ${f[1]}.`, key:"partofday"}; },
  season: ()=>{ const m=_r(1,12), ans=_SEASONS[m], all=["summer","autumn","winter","spring"].filter(x=>x!==ans); return {q:`Which season is <b>${_MONTHS[m-1]}</b> in Australia?`, say:`Which season is ${_MONTHS[m-1]} in Australia?`, type:"mc", ans, opts:_sh([ans,..._sh(all).slice(0,2)]), why:`${_MONTHS[m-1]} is in ${ans} in Australia.`, key:"season"}; },
  monthbefore: ()=>{ const i=_r(0,11), ans=_MONTHS[(i+11)%12]; return {q:`Which month comes <b>before</b> ${_MONTHS[i]}?`, say:`Which month comes before ${_MONTHS[i]}?`, type:"mc", ans, opts:_opts(ans,_sh(_MONTHS.filter(x=>x!==ans)).slice(0,3)), why:`${ans} comes before ${_MONTHS[i]}.`, key:"monthbefore"}; },
  day: ()=>Object.assign(MATH_GEN.day(),{key:"day"}),
  month: ()=>Object.assign(MATH_GEN.month(),{key:"month"})
};
const TIME_LEVELS = [
  {name:"O'clock", gens:[["tclock","oclock"],["tdigital","oclock"],["tsay","oclock"]]},
  {name:"The two hands", gens:[["tfact"],["tclock","oclock"],["tsay","oclock"]]},
  {name:"Half past", gens:[["tclock","oclock+half"],["tsay","oclock+half"],["tdigital","half"]]},
  {name:"Quarter past and quarter to", gens:[["tclock","quarter"],["tsay","quarter"],["tdigital","quarter"]]},
  {name:"O'clock, half and quarter mix", gens:[["tclock","mid"],["tsay","mid"],["tdigital","mid"],["twhich","mid"]]},
  {name:"Which clock is right?", gens:[["twhich","mid"],["twhich","easy"]]},
  {name:"Morning, afternoon and night", gens:[["partofday"],["tfact"],["after","easy"]]},
  {name:"Five-minute times", gens:[["tclock","five"],["tsay","five"],["tdigital","five"]]},
  {name:"How long does it take?", gens:[["duration"],["after","easy"],["after","mid"]]},
  {name:"Days, months and seasons", gens:[["day"],["month"],["monthbefore"],["season"]]},
  {name:"Every minute: all the times", gens:[["tclock","all"],["tsay","all"],["tdigital","all"],["twhich","all"]]},
  {name:"Time challenge mix", gens:[["tclock","all"],["tsay","mid"],["twhich","mid"],["after","mid"],["duration"],["season"],["tfact"]]}
];

/* ---------------- Wonder World: fun facts, drawn without repeats ---------------- */
const FACTS = {
  animals: [["Which animal is a mammal?","a whale",["a shark","a frog"],"🐋"],["Which animal lays eggs?","a hen",["a dog","a cat"],"🐔"],["What do caterpillars turn into?","butterflies",["bees","ants"],"🐛"],["Which animal carries its baby in a pouch?","a kangaroo",["a camel","a rabbit"],"🦘"],["What do we call a baby cow?","a calf",["a lamb","a foal"],"🐄"],["Which animal can fly?","an eagle",["a horse","a turtle"],"🦅"],["Where do fish live?","in water",["in trees","in nests"],"🐟"],["Which animal is the tallest?","a giraffe",["an elephant","a horse"],"🦒"],["What do bees make?","honey",["milk","silk"],"🐝"],["Which animal sleeps upside down?","a bat",["a cat","a duck"],"🦇"]],
  body: [["How many fingers are on one hand?","5",["4","6"],"✋"],["Which part helps us see?","our eyes",["our ears","our nose"],"👀"],["What do we use to hear?","our ears",["our eyes","our hands"],"👂"],["What does your heart do?","pumps blood",["helps you see","makes you sneeze"],"❤️"],["Which drink is good for strong bones?","milk",["fizzy drink","cordial"],"🥛"],["What should you do before you eat?","wash your hands",["jump up and down","shout"],"🧼"],["When do we sleep?","at night",["at lunch","at noon"],"😴"],["Which is a healthy snack?","an apple",["a lolly","a donut"],"🍎"],["What do we use to smell?","our nose",["our knees","our toes"],"👃"],["How do we keep our teeth clean?","brush them",["paint them","tap them"],"🪥"],["What do we use to taste?","our tongue",["our elbow","our hair"],"👅"]],
  weather: [["Which season is hot in Australia?","summer",["winter","autumn"],"☀️"],["In which season do leaves fall?","autumn",["summer","spring"],"🍂"],["Which season comes after winter?","spring",["autumn","summer"],"🌸"],["What do we use when it rains?","an umbrella",["sunglasses","a sunhat"],"☔"],["What falls from clouds?","rain",["sand","leaves"],"🌧️"],["What makes a rainbow?","sun and rain",["wind and snow","moon and stars"],"🌈"],["What do we wear on a hot, sunny day?","a sunhat",["a scarf","gloves"],"👒"],["Which season is the coldest?","winter",["summer","spring"],"❄️"],["What do we call frozen water?","ice",["steam","mud"],"🧊"],["What do we call it when water falls as tiny white flakes?","snow",["sand","fog"],"⛄"]],
  plants: [["What do plants need to grow?","sun and water",["toys and games","sweets and chips"],"🌱"],["Which part of a plant is under the ground?","the roots",["the flowers","the leaves"],"🥕"],["Which of these is a fruit?","a banana",["a carrot","a potato"],"🍌"],["Which of these is a vegetable?","a carrot",["an apple","a grape"],"🥕"],["Where does milk come from?","cows",["hens","bees"],"🐄"],["What do seeds grow into?","plants",["rocks","toys"],"🌻"],["Which food comes from a hen?","eggs",["milk","honey"],"🥚"],["Bread is made from…","wheat",["milk","honey"],"🍞"],["What do bees visit to get nectar?","flowers",["rocks","clouds"],"🌼"]],
  helpers: [["Who helps to put out fires?","a firefighter",["a baker","a farmer"],"🧑‍🚒"],["Who looks after sick people?","a doctor",["a pilot","a chef"],"🩺"],["Who teaches children at school?","a teacher",["a vet","a builder"],"🧑‍🏫"],["Who looks after sick animals?","a vet",["a dentist","a bus driver"],"🐕"],["What number do we call in an emergency in Australia?","000",["123","555"],"📞"],["What does a red traffic light mean?","stop",["go","run"],"🚦"],["Where is it safest to cross the road?","at a crossing",["between parked cars","anywhere"],"🚸"],["What do we wear when we ride a bike?","a helmet",["a scarf","sandals"],"🚲"],["Who delivers our letters?","a postie",["a baker","a dentist"],"📮"],["What do we wear in the car?","a seatbelt",["a necklace","a backpack"],"🚗"],["Who checks our teeth?","a dentist",["a farmer","a pilot"],"🦷"]],
  space: [["What is the sun?","a star",["a planet","a moon"],"☀️"],["Which planet do we live on?","Earth",["Mars","Venus"],"🌍"],["What goes around the Earth?","the moon",["the sun","a star"],"🌙"],["When can we see the stars?","at night",["at lunch","in the morning"],"⭐"],["What colour is the sky on a sunny day?","blue",["green","pink"],"🌤️"],["Which planet is called the red planet?","Mars",["Earth","Venus"],"🔴"],["What do astronauts travel in?","a rocket",["a bus","a boat"],"🚀"],["What gives us light and warmth in the day?","the sun",["the moon","a lamp"],"🌞"]],
  australia: [["What is the capital city of Australia?","Canberra",["Sydney","Melbourne"],"🏛️"],["How many states are in Australia?","6",["4","8"],"🗺️"],["Which animal is on the Australian coat of arms with the emu?","a kangaroo",["a koala","a wombat"],"🦘"],["Which Australian bird cannot fly?","an emu",["a parrot","an owl"],"🐦"],["Which famous bridge is in Sydney?","the Harbour Bridge",["Tower Bridge","the Golden Gate Bridge"],"🌉"],["What is the capital city of New South Wales?","Sydney",["Perth","Darwin"],"🏙️"],["What do koalas eat?","gum leaves",["fish","pizza"],"🐨"],["What is the big red rock in the middle of Australia called?","Uluru",["Big Ben","Mount Everest"],"🪨"],["Which ocean is on the east coast of Australia?","the Pacific Ocean",["the Atlantic Ocean","the Arctic Ocean"],"🌊"],["Which Australian animal hops?","a kangaroo",["a koala","a wombat"],"🦘"],["What colours are on the Aboriginal flag?","black, red and yellow",["blue, white and green","pink, purple and orange"],"🏴"]],
  transport: [["Which vehicle travels on rails?","a train",["a bus","a boat"],"🚆"],["Which vehicle flies in the sky?","a plane",["a bus","a boat"],"✈️"],["Which vehicle travels on water?","a boat",["a train","a car"],"⛵"],["Which of these has two wheels?","a bike",["a car","a bus"],"🚲"],["What carries many people along the road?","a bus",["a boat","a plane"],"🚌"],["Which vehicle can go under the water?","a submarine",["a helicopter","a bus"],"🚢"],["What does a helicopter have on top?","spinning blades",["sails","wheels"],"🚁"],["Which vehicle does a firefighter drive?","a fire truck",["a tractor","a taxi"],"🚒"]],
  earth: [["What should we do with our rubbish?","put it in a bin",["throw it on the ground","hide it"],"🗑️"],["What do we save when we turn off the tap?","water",["sand","air"],"🚰"],["What do we save when we turn off the lights?","electricity",["water","rain"],"💡"],["What can we do with an empty plastic bottle?","recycle it",["bury it","throw it in the sea"],"♻️"],["Which is kinder to the Earth?","walking to school",["driving a short way","leaving the lights on"],"🚶"],["What do trees give us?","air to breathe",["plastic","batteries"],"🌳"],["What should we do with leftover food scraps?","put them in compost",["throw them in the creek","hide them in a drawer"],"🍂"]]
};
const _FACT_NAMES = {animals:"Animals",body:"My body",weather:"Weather and seasons",plants:"Plants and food",helpers:"Helpers and safety",space:"Sun, moon and stars",australia:"Australia",transport:"Ways to travel",earth:"Looking after Earth"};
const WONDER_GEN = {
  fact: (topic)=>{ const f=_draw("fact:"+topic, FACTS[topic]); return {q:f[0], say:f[0], vis:`<div class="mvis" style="font-size:72px">${f[3]}</div>`, type:"mc", ans:f[1], opts:_sh([f[1],...f[2]]), why:`The answer is ${f[1]}.`, key:f[0].replace(/[^A-Za-z0-9 ]/g,"").slice(0,32)}; },
  mixed: ()=>{ const t=_pick(Object.keys(FACTS)); return WONDER_GEN.fact(t); }
};
const WONDER_LEVELS = [
  ...Object.keys(FACTS).map(t=>({name:_FACT_NAMES[t], n:Math.min(10,FACTS[t].length), gens:[["fact",t]]})),
  {name:"Wonder quiz: mixed 1", gens:[["mixed"]]},
  {name:"Wonder quiz: mixed 2", gens:[["mixed"]]}
];
