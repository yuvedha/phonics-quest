/* =============================================================
   LITTLE EXPLORERS QUEST: GEOGRAPHY (Continents and Oceans, Country Explorer)
   Map shapes are simple hand-drawn outlines in [longitude, latitude] points (coarse on purpose, for kids).
   Add new countries to COUNTRIES (they get their own level automatically, at the END of the Country list).
   Uses helpers from maths.js (_r, _pick, _sh, _opts) and _draw from gk.js.
   ============================================================= */
const CONTS = {
  na:{name:"North America", crop:[-170,5,-10,84], polys:[
    [[-168,66],[-162,70],[-156,71],[-141,70],[-128,70],[-115,68],[-95,72],[-85,70],[-82,66],[-94,60],[-93,57],[-85,55],[-80,52],[-79,58],[-77,62],[-70,60],[-65,60],[-62,56],[-56,52],[-60,47],[-66,44],[-70,42],[-74,40],[-76,35],[-81,31],[-80,26],[-82,28],[-84,30],[-90,29],[-97,27],[-97,22],[-94,18],[-90,21],[-87,21],[-88,16],[-84,15],[-83,10],[-79,9],[-80,7],[-84,9],[-87,13],[-92,15],[-97,16],[-105,20],[-106,23],[-112,29],[-115,31],[-117,32],[-121,35],[-124,40],[-124,46],[-125,49],[-130,54],[-135,58],[-142,60],[-150,60],[-152,58],[-158,56],[-164,55],[-158,59],[-162,62],[-165,63]],
    [[-73,78],[-60,82],[-30,83],[-20,80],[-20,72],[-30,68],[-43,60],[-50,64],[-55,70],[-68,76]],
    [[-85,22],[-80,23],[-74,20],[-78,20],[-84,21]],[[-78,18],[-76,18],[-77,17]]]},
  sa:{name:"South America", crop:[-85,-58,-30,14], polys:[
    [[-77,8],[-72,12],[-63,11],[-55,6],[-50,1],[-44,-2],[-35,-5],[-39,-14],[-41,-22],[-48,-26],[-53,-34],[-58,-35],[-57,-38],[-62,-40],[-65,-45],[-68,-50],[-69,-54],[-72,-54],[-75,-50],[-73,-40],[-71,-30],[-70,-18],[-76,-14],[-81,-6],[-80,-2],[-78,2]]]},
  eu:{name:"Europe", crop:[-14,33,46,73], polys:[
    [[-10,36],[-9,43],[-2,43],[-1,46],[-4,48],[2,51],[5,53],[8,55],[9,57],[11,56],[13,54],[20,54],[24,57],[24,59],[30,60],[33,66],[40,66],[44,68],[55,68],[60,68],[60,52],[52,50],[48,46],[40,46],[38,47],[34,45],[30,46],[28,43],[28,41],[26,40],[23,40],[24,37],[22,37],[20,40],[19,42],[14,45],[12,44],[16,41],[18,40],[16,38],[12,38],[9,44],[3,43],[0,39],[-2,37],[-6,36]],
    [[5,59],[6,62],[12,66],[16,69],[22,70],[28,71],[30,69],[25,66],[24,65],[21,63],[18,60],[17,57],[13,56],[11,59],[8,58]],
    [[-5,50],[1,51],[2,53],[-2,56],[-3,58],[-6,58],[-5,55],[-3,54],[-5,52]],[[-10,52],[-6,52],[-6,55],[-10,54]]]},
  af:{name:"Africa", crop:[-20,-37,55,39], polys:[
    [[-17,21],[-13,28],[-10,30],[-6,35],[0,36],[10,37],[11,33],[20,31],[25,32],[32,31],[34,28],[38,20],[43,12],[51,12],[48,5],[41,-2],[40,-10],[40,-15],[35,-22],[33,-27],[28,-33],[20,-35],[18,-32],[14,-23],[12,-16],[13,-8],[9,-1],[9,4],[4,6],[-4,5],[-8,4],[-13,8],[-17,14]],
    [[44,-25],[48,-25],[50,-15],[49,-12],[44,-17]]]},
  as:{name:"Asia", crop:[25,-12,180,78], polys:[
    [[27,41],[27,37],[36,36],[35,32],[35,29],[39,21],[43,13],[45,13],[52,16],[58,20],[57,25],[52,24],[50,27],[48,30],[56,27],[61,25],[67,25],[72,21],[73,16],[77,8],[80,13],[80,16],[87,21],[92,22],[94,17],[98,16],[98,8],[101,3],[104,1],[103,10],[100,13],[105,9],[106,11],[109,12],[108,16],[106,20],[110,21],[117,23],[121,28],[122,32],[120,36],[119,39],[122,40],[124,40],[126,37],[129,35],[130,38],[128,42],[132,43],[138,47],[141,52],[137,54],[143,59],[155,59],[156,52],[163,57],[162,61],[170,60],[180,65],[180,69],[170,70],[160,70],[140,73],[130,72],[110,77],[100,77],[90,75],[80,73],[70,73],[68,68],[60,68],[60,52],[52,50],[48,46],[47,43],[40,43],[41,41],[36,42],[30,41]],
    [[130,31],[132,34],[136,36],[140,41],[142,40],[140,36],[135,33]],
    [[95,5],[98,4],[104,-2],[106,-6],[102,-4],[96,2]],[[109,2],[117,7],[119,1],[116,-4],[110,-3]],[[105,-6],[114,-7],[114,-8],[106,-7]],[[120,18],[122,18],[124,12],[126,7],[122,7],[120,14]]]},
  oc:{name:"Oceania", crop:[110,-50,180,2], polys:[
    [[114,-22],[122,-18],[126,-14],[131,-12],[136,-12],[137,-16],[141,-12],[143,-14],[146,-19],[153,-26],[153,-31],[150,-37],[146,-39],[141,-38],[138,-35],[135,-34],[131,-31],[124,-33],[116,-35],[115,-30]],
    [[145,-41],[148,-41],[147,-43]],[[173,-35],[178,-38],[175,-41],[173,-39]],[[172,-41],[174,-42],[170,-46],[167,-46]],[[131,-1],[141,-3],[148,-6],[150,-10],[143,-9],[138,-8],[134,-4]],[[177,-17],[179,-17],[179,-19],[177,-19]]]},
  an:{name:"Antarctica", crop:[-180,-90,180,-58], polys:[
    [[-180,-72],[-150,-77],[-120,-73],[-90,-72],[-65,-68],[-62,-64],[-58,-64],[-60,-70],[-45,-78],[-20,-72],[10,-70],[40,-68],[70,-68],[100,-66],[130,-66],[160,-70],[180,-72],[180,-90],[-180,-90]]]}
};
const CONT_IDS = ["na","sa","eu","af","as","oc","an"];
const _REFC = {na:"#ffc800",sa:"#33cc33",eu:"#ff5555",af:"#990000",as:"#9900cc",oc:"#ffee44",an:"#0099ff"};
const _CSQ = {na:"🟧",sa:"🟩",eu:"🟥",af:"🟫",as:"🟪",oc:"🟨",an:"🟦"};
const _CCOL = {na:"#f4a261",sa:"#90be6d",eu:"#8d99ae",af:"#e9c46a",as:"#e76f8a",oc:"#7ec8e3",an:"#e8eef5"};

/* mode: "alone" crops to the continent; "world" shows the whole map with the target coloured; "blank" is a plain grey world with the target dark; "crop" crops with all continents coloured gently (for country dots) */
function _geoSvg(target, mode, dot){
  const poly = (id,fill,stroke,sw)=>CONTS[id].polys.map(pl=>`<polygon points="${pl.map(p=>p[0]+","+(-p[1])).join(" ")}" fill="${fill}" stroke="${stroke}" stroke-width="${sw||(mode==="world"||mode==="blank"?0.6:0.4)}" stroke-linejoin="round"/>`).join("");
  let vb, body = "";
  if(mode==="world"||mode==="blank"||mode==="colour"){ vb = [-180,-90,360,180]; }
  else { const c = CONTS[target].crop; vb = [c[0], -c[3], c[2]-c[0], c[3]-c[1]]; }
  const ocean = `<rect x="${vb[0]}" y="${vb[1]}" width="${vb[2]}" height="${vb[3]}" fill="${mode==="colour"?"#cdeeff":"#dff3ff"}"/>`;
  CONT_IDS.slice().sort((a,b)=>(a===target)-(b===target)).forEach(id=>{
    if(mode==="colour") body += poly(id, _REFC[id], id===target?"#000":"#2b3a8f", id===target?2.2:0.7);
    else if(mode==="alone"){ if(id===target) body += poly(id,"#7bc96f","#2f6b2a"); }
    else if(mode==="world") body += poly(id, id===target?"#ff9f1c":"#c9d6c5", "#fff");
    else if(mode==="blank") body += poly(id, id===target?"#6b5b95":"#d9d9d9", "#fff");
    else body += poly(id, id===target?"#bfe3a8":"#ececec", "#fff");
  });
  const r = vb[2]/60;
  if(dot) body += `<circle cx="${dot[0]}" cy="${-dot[1]}" r="${r*1.5}" fill="#e63946" stroke="#fff" stroke-width="${r*0.35}"/>`;
  return `<div class="mvis"><svg viewBox="${vb.join(" ")}" style="width:100%;max-width:${mode==="world"||mode==="blank"||mode==="colour"?560:380}px;height:auto;border-radius:14px;border:3px solid #7fc4e8">${ocean}${body}</svg></div>`;
}
const _uq = (text,id)=>text+`<span style="display:none">${id}</span>`;

const CONT_FACTS = [
  ["Which continent is the coldest?","Antarctica"],["Which continent is the biggest?","Asia"],["Which continent is the smallest?","Oceania"],
  ["Which continent has the Sahara Desert?","Africa"],["Which continent has the Amazon rainforest?","South America"],["Which continent has the pyramids of Egypt?","Africa"],
  ["Which continent do kangaroos live on?","Oceania"],["Penguins live on which icy continent?","Antarctica"],["Which continent has the Great Wall of China?","Asia"],
  ["Which continent has the Eiffel Tower?","Europe"],["Which continent has Mount Everest?","Asia"],["Which continent is Canada in?","North America"],
  ["Which continent has wild giant pandas?","Asia"],["Which continent has lions on the savanna?","Africa"],["Which continent has the Andes mountains?","South America"],
  ["Which continent has the Statue of Liberty?","North America"],["Which continent has Big Ben?","Europe"],["Which continent has Uluru?","Oceania"]
];
const OCEAN_FACTS = [
  ["How many oceans are there?","5",["3","7"]],["Which is the biggest ocean?","the Pacific Ocean",["the Atlantic Ocean","the Indian Ocean"]],
  ["Which ocean is at the top of the world, around the North Pole?","the Arctic Ocean",["the Indian Ocean","the Pacific Ocean"]],
  ["Which ocean is between Africa and Australia?","the Indian Ocean",["the Arctic Ocean","the Atlantic Ocean"]],
  ["Which ocean is between Europe and North America?","the Atlantic Ocean",["the Indian Ocean","the Southern Ocean"]],
  ["Which ocean is on the east coast of Australia?","the Pacific Ocean",["the Atlantic Ocean","the Arctic Ocean"]],
  ["Which ocean is around Antarctica?","the Southern Ocean",["the Arctic Ocean","the Indian Ocean"]],
  ["Is the ocean water salty or sweet?","salty",["sweet","sour"]],["What covers more of the Earth: land or water?","water",["land","they are the same"]]
];

/* id, name, flag, capital, lon, lat, continent, [question, answer, [wrong, wrong]] facts */
const COUNTRIES = [
 ["ca","Canada","🇨🇦","Ottawa",-75.7,45.4,"na",[["Which leaf is on Canada's flag?","a maple leaf",["a gum leaf","an oak leaf"]],["Which sweet syrup is Canada famous for?","maple syrup",["golden syrup","chocolate syrup"]],["Which animal is a symbol of Canada?","the beaver",["the kangaroo","the lion"]]]],
 ["us","USA","🇺🇸","Washington, D.C.",-77,38.9,"na",[["How many stars are on the US flag?","50",["20","100"]],["Which famous statue stands in New York?","the Statue of Liberty",["Big Ben","the Sphinx"]],["Which big bird is the US national bird?","the bald eagle",["the emu","the kookaburra"]]]],
 ["mx","Mexico","🇲🇽","Mexico City",-99.1,19.4,"na",[["Which food is Mexico famous for?","tacos",["sushi","pasta"]],["Which wide-brimmed hat is Mexican?","a sombrero",["a beret","a top hat"]],["Which language do people speak in Mexico?","Spanish",["French","Dutch"]]]],
 ["cu","Cuba","🇨🇺","Havana",-82.4,23.1,"na",[["Cuba is…","an island",["a desert","a mountain"]],["Which sea is Cuba in?","the Caribbean Sea",["the Red Sea","the Dead Sea"]]]],
 ["jm","Jamaica","🇯🇲","Kingston",-76.8,18,"na",[["Which music is Jamaica famous for?","reggae",["opera","polka"]],["Jamaica is…","an island",["a desert","a mountain"]]]],
 ["br","Brazil","🇧🇷","Brasília",-47.9,-15.8,"sa",[["Which huge rainforest is mostly in Brazil?","the Amazon",["the Sahara","the Outback"]],["Which sport is Brazil famous for?","football",["ice hockey","cricket"]],["Which language do people speak in Brazil?","Portuguese",["Spanish","English"]]]],
 ["ar","Argentina","🇦🇷","Buenos Aires",-58.4,-34.6,"sa",[["Which dance began around Buenos Aires?","tango",["waltz","polka"]],["Which tall mountains are on Argentina's west side?","the Andes",["the Alps","the Rockies"]]]],
 ["pe","Peru","🇵🇪","Lima",-77,-12,"sa",[["Which woolly animal lives in the Andes?","a llama",["a penguin","a koala"]],["Machu Picchu is an old city of the…","Incas",["Romans","Vikings"]]]],
 ["cl","Chile","🇨🇱","Santiago",-70.7,-33.4,"sa",[["Chile is a very … country","long and thin",["round","square"]],["Which mountains run along Chile?","the Andes",["the Alps","the Rockies"]]]],
 ["co","Colombia","🇨🇴","Bogotá",-74.1,4.7,"sa",[["Which drink is Colombia famous for growing?","coffee",["tea","cocoa"]],["Which language do people speak in Colombia?","Spanish",["French","German"]]]],
 ["gb","United Kingdom","🇬🇧","London",-0.1,51.5,"eu",[["Which famous clock tower is in London?","Big Ben",["the Eiffel Tower","the Leaning Tower"]],["Which hot drink do many British people love?","tea",["cocoa with onions","soup"]],["Which language do people speak in the UK?","English",["French","Italian"]]]],
 ["fr","France","🇫🇷","Paris",2.3,48.9,"eu",[["Which tower is in Paris?","the Eiffel Tower",["Big Ben","the Leaning Tower"]],["Which long crusty bread is French?","a baguette",["a taco","a pizza"]],["Which language do people speak in France?","French",["German","Spanish"]]]],
 ["es","Spain","🇪🇸","Madrid",-3.7,40.4,"eu",[["Which dance has stamping and clapping?","flamenco",["ballet","tap dance"]],["Which rice and seafood dish is Spanish?","paella",["lasagne","sushi"]],["Which language do people speak in Spain?","Spanish",["French","Dutch"]]]],
 ["it","Italy","🇮🇹","Rome",12.5,41.9,"eu",[["Which food comes from Italy?","pizza",["tacos","sushi"]],["Which famous tower in Italy leans over?","the Leaning Tower of Pisa",["Big Ben","the Eiffel Tower"]],["Italy is shaped like a…","boot",["star","hat"]]]],
 ["de","Germany","🇩🇪","Berlin",13.4,52.5,"eu",[["Which language do people speak in Germany?","German",["French","Spanish"]],["Which fairy-tale brothers were German?","the Brothers Grimm",["the Wright Brothers","the Marx Brothers"]]]],
 ["gr","Greece","🇬🇷","Athens",23.7,38,"eu",[["Which games began in Greece long ago?","the Olympic Games",["the Super Bowl","the Melbourne Cup"]],["Which salad has feta cheese and olives?","Greek salad",["fruit salad","potato salad"]]]],
 ["no","Norway","🇳🇴","Oslo",10.7,59.9,"eu",[["What are Norway's deep sea inlets called?","fjords",["deserts","volcanoes"]],["Which glowing lights dance in the sky in the north?","the northern lights",["rainbows","fireworks"]]]],
 ["eg","Egypt","🇪🇬","Cairo",31.2,30,"af",[["Which ancient tombs are in Egypt?","the pyramids",["igloos","castles"]],["Which long river flows through Egypt?","the Nile",["the Amazon","the Murray"]],["Which statue has a lion's body?","the Sphinx",["the Statue of Liberty","Big Ben"]]]],
 ["ke","Kenya","🇰🇪","Nairobi",36.8,-1.3,"af",[["Which animals make a great journey across Kenya and Tanzania?","wildebeest",["penguins","polar bears"]],["Which sport is Kenya famous for?","long-distance running",["ice skating","skiing"]]]],
 ["za","South Africa","🇿🇦","Pretoria",28.2,-25.7,"af",[["Which flat-topped mountain is in Cape Town?","Table Mountain",["Uluru","Mount Everest"]],["South Africa is at the … of Africa","bottom",["top","middle"]]]],
 ["ng","Nigeria","🇳🇬","Abuja",7.5,9.1,"af",[["Which African country has the most people?","Nigeria",["Egypt","Kenya"]],["Nigeria is in which continent?","Africa",["Asia","Europe"]]]],
 ["ma","Morocco","🇲🇦","Rabat",-6.8,34,"af",[["Which desert is next to Morocco?","the Sahara",["the Gobi","the Simpson"]],["Which mountains are in Morocco?","the Atlas Mountains",["the Andes","the Alps"]]]],
 ["mg","Madagascar","🇲🇬","Antananarivo",47.5,-18.9,"af",[["Which animal with a stripy tail lives wild only in Madagascar?","a lemur",["a koala","a kangaroo"]],["Madagascar is a big…","island",["desert","mountain"]]]],
 ["cn","China","🇨🇳","Beijing",116.4,39.9,"as",[["Which very long wall is in China?","the Great Wall",["the Berlin Wall","the Garden Wall"]],["Which black and white bear lives in China?","the giant panda",["the polar bear","the koala"]],["Which animal is a dragon-dance friend at Lunar New Year?","the dragon",["the shark","the dinosaur"]]]],
 ["in","India","🇮🇳","New Delhi",77.2,28.6,"as",[["Which beautiful white building is in India?","the Taj Mahal",["the Opera House","the Parthenon"]],["Which festival is called the festival of lights?","Diwali",["Halloween","Easter"]]]],
 ["jp","Japan","🇯🇵","Tokyo",139.7,35.7,"as",[["Which famous mountain is a volcano in Japan?","Mount Fuji",["Uluru","Mount Everest"]],["Which food is rice with fish on top?","sushi",["tacos","pizza"]],["What are Japan's very fast trains called?","bullet trains",["tractors","tram carts"]]]],
 ["id","Indonesia","🇮🇩","Jakarta",106.8,-6.2,"as",[["Indonesia is made of thousands of…","islands",["deserts","glaciers"]],["Which giant lizard lives in Indonesia?","the Komodo dragon",["the frilled lizard","the gecko"]]]],
 ["th","Thailand","🇹🇭","Bangkok",100.5,13.8,"as",[["Which big animal is a symbol of Thailand?","the elephant",["the polar bear","the kangaroo"]],["Which spiky, smelly fruit is popular in Thailand?","durian",["apple","banana"]]]],
 ["vn","Vietnam","🇻🇳","Hanoi",105.8,21,"as",[["Which noodle soup is Vietnamese?","pho",["pasta","ramen"]],["Which cone-shaped hats are worn in Vietnam?","conical hats",["top hats","berets"]]]],
 ["sa","Saudi Arabia","🇸🇦","Riyadh",46.7,24.7,"as",[["Which animals walk across Saudi Arabia's deserts?","camels",["penguins","reindeer"]],["Saudi Arabia is mostly…","desert",["rainforest","ice"]]]],
 ["kr","South Korea","🇰🇷","Seoul",127,37.6,"as",[["Which spicy cabbage dish is Korean?","kimchi",["sushi","pizza"]],["Which pop music comes from South Korea?","K-pop",["polka","reggae"]]]],
 ["au","Australia","🇦🇺","Canberra",149.1,-35.3,"oc",[["Which animal hops across Australia?","the kangaroo",["the penguin","the camel"]],["What is the big red rock called?","Uluru",["Big Ben","the Matterhorn"]],["Which opera house is in Sydney?","the Sydney Opera House",["Big Ben","the Taj Mahal"]],["Which huge coral reef is off Queensland?","the Great Barrier Reef",["the Big Red Reef","the Blue Wall"]]]],
 ["nz","New Zealand","🇳🇿","Wellington",174.8,-41.3,"oc",[["Which bird that cannot fly is a symbol of New Zealand?","the kiwi",["the emu","the parrot"]],["Which Māori dance is famous?","the haka",["the tango","the polka"]]]],
 ["pg","Papua New Guinea","🇵🇬","Port Moresby",147.2,-9.4,"oc",[["Which colourful birds live in Papua New Guinea?","birds of paradise",["penguins","owls"]],["Which country is just south of Papua New Guinea?","Australia",["Canada","Egypt"]]]],
 ["fj","Fiji","🇫🇯","Suva",178.4,-18.1,"oc",[["Fiji is made of many…","islands",["deserts","glaciers"]],["Fiji is in which ocean?","the Pacific Ocean",["the Arctic Ocean","the Atlantic Ocean"]]]]
];
const _CO = {}; COUNTRIES.forEach(c=>{ _CO[c[0]] = {id:c[0],name:c[1],flag:c[2],cap:c[3],lon:c[4],lat:c[5],cont:c[6],facts:c[7]}; });
const _inCont = ct => COUNTRIES.filter(c=>c[6]===ct).map(c=>_CO[c[0]]);
const GEO_LABEL = {shape:"Continent shapes", world:"Continents on the world map", blank:"Blank world map", cfact:"Continent facts", ocean:"Oceans", dot:"Finding countries on the map", flag:"Flags", capital:"Capital cities", incont:"Which continent a country is in"};
const _contName = id => CONTS[id].name;

const GEO_GEN = {
  cshape: (mode)=>{ const id = _draw("cshape:"+mode, CONT_IDS.slice()); const ans = _contName(id);
    const q = mode==="colour" ? "Which continent has the thick black outline?" : mode==="alone" ? "Which continent has this shape?" : mode==="world" ? "Which continent is coloured orange?" : "Which continent is the dark purple one?";
    const lab = x => mode==="colour" ? _CSQ[x]+" "+_contName(x) : _contName(x);
    return {q:_uq(q,id), say:q.replace(/<[^>]+>/g,""), vis:_geoSvg(id,mode), type:"mc", ans:lab(id), opts:_opts(lab(id),_sh(CONT_IDS.filter(x=>x!==id)).slice(0,3).map(lab)), why:`That is ${ans}.`, key:"shape:"+mode}; },
  cfact: ()=>{ const f=_draw("contfacts",CONT_FACTS); const ans=f[1]; const wr=_sh(CONT_IDS.map(_contName).filter(x=>x!==ans)).slice(0,3); return {q:f[0], say:f[0], type:"mc", ans, opts:_opts(ans,wr), why:`The answer is ${ans}.`, key:"cfact"}; },
  ocean: ()=>{ const f=_draw("oceanfacts",OCEAN_FACTS); return {q:f[0], say:f[0], type:"mc", ans:f[1], opts:_sh([f[1],...f[2]]), why:`The answer is ${f[1]}.`, key:"ocean"}; },
  dot: (ct)=>{ const list=_inCont(ct), c=_draw("dot:"+ct, list.slice()); const wr=_sh(list.filter(x=>x.id!==c.id)).slice(0,3).map(x=>x.name);
    return {q:_uq("Which country has the red dot?",c.id), say:"Which country has the red dot?", vis:_geoSvg(ct,"crop",[c.lon,c.lat]), type:"mc", ans:c.name, opts:_opts(c.name,wr), why:`That is ${c.name}, in ${_contName(ct)}.`, key:"dot"}; },
  flag: (ct)=>{ const list = ct ? _inCont(ct) : COUNTRIES.map(x=>_CO[x[0]]), c=_draw("flag:"+(ct||"all"), list.slice()); const pool=_sh(COUNTRIES.map(x=>_CO[x[0]]).filter(x=>x.id!==c.id)).slice(0,3).map(x=>x.name);
    return {q:_uq("Whose flag is this?",c.id), say:"Whose flag is this?", vis:`<div class="mvis" style="font-size:84px">${c.flag}</div>`, type:"mc", ans:c.name, opts:_opts(c.name,pool), why:`That is the flag of ${c.name}.`, key:"flag"}; },
  capital: (ct)=>{ const list = ct ? _inCont(ct) : COUNTRIES.map(x=>_CO[x[0]]), c=_draw("cap:"+(ct||"all"), list.slice()); const pool=_sh(COUNTRIES.map(x=>_CO[x[0]]).filter(x=>x.cap!==c.cap)).slice(0,3).map(x=>x.cap);
    return {q:`What is the capital city of <b>${c.name}</b>?`, say:`What is the capital city of ${c.name}?`, vis:`<div class="mvis" style="font-size:64px">${c.flag}</div>`, type:"mc", ans:c.cap, opts:_opts(c.cap,pool), why:`${c.cap} is the capital of ${c.name}.`, key:"capital"}; },
  incont: (ct)=>{ const list = ct ? _inCont(ct) : COUNTRIES.map(x=>_CO[x[0]]), c=_draw("inc:"+(ct||"all"), list.slice()); const ans=_contName(c.cont);
    return {q:`Which continent is <b>${c.name}</b> in?`, say:`Which continent is ${c.name} in?`, vis:`<div class="mvis" style="font-size:64px">${c.flag}</div>`, type:"mc", ans, opts:_opts(ans,_sh(CONT_IDS.filter(x=>x!==c.cont&&x!=="an").map(_contName)).slice(0,3)), why:`${c.name} is in ${ans}.`, key:"incont"}; },
  country: (id)=>{ const c=_CO[id]; const others=COUNTRIES.map(x=>_CO[x[0]]).filter(x=>x.id!==id);
    const builders = [
      ()=>({q:`What is the capital city of <b>${c.name}</b>?`, say:`What is the capital city of ${c.name}?`, ans:c.cap, opts:_opts(c.cap,_sh(others.map(x=>x.cap).filter(x=>x!==c.cap)).slice(0,3)), why:`${c.cap} is the capital of ${c.name}.`}),
      ()=>({q:_uq("Whose flag is this?",c.id), say:"Whose flag is this?", vis:`<div class="mvis" style="font-size:84px">${c.flag}</div>`, ans:c.name, opts:_opts(c.name,_sh(others.map(x=>x.name)).slice(0,3)), why:`That is the flag of ${c.name}.`}),
      ()=>{ const l=_inCont(c.cont); const wr=_sh(l.filter(x=>x.id!==id)).slice(0,3).map(x=>x.name); return {q:_uq("Which country has the red dot?",c.id), say:"Which country has the red dot?", vis:_geoSvg(c.cont,"crop",[c.lon,c.lat]), ans:c.name, opts:_opts(c.name,wr), why:`That is ${c.name}.`}; },
      ()=>{ const ans=_contName(c.cont); return {q:`Which continent is <b>${c.name}</b> in?`, say:`Which continent is ${c.name} in?`, vis:`<div class="mvis" style="font-size:64px">${c.flag}</div>`, ans, opts:_opts(ans,_sh(CONT_IDS.filter(x=>x!==c.cont&&x!=="an").map(_contName)).slice(0,3)), why:`${c.name} is in ${ans}.`}; },
      ...c.facts.map(f=>()=>({q:f[0], say:f[0], vis:`<div class="mvis" style="font-size:56px">${c.flag}</div>`, ans:f[1], opts:_sh([f[1],...f[2]]), why:`The answer is ${f[1]}.`}))
    ];
    const bi = _draw("country:"+id, builders.map((_,i)=>i)); const q = builders[bi](); q.type="mc"; q.key = c.name; return q; }
};
const GEO_LEVELS = [
  {name:"Meet the continents (coloured world map)", n:7, gens:[["cshape","colour"]]},
  {name:"Continent shapes: who am I?", n:7, gens:[["cshape","alone"]]},
  {name:"Find the continent on the world map", n:7, gens:[["cshape","world"]]},
  {name:"Blank world map quiz", n:7, gens:[["cshape","blank"]]},
  {name:"Continent clues", gens:[["cfact"]]},
  {name:"The five oceans", n:9, gens:[["ocean"]]},
  {name:"Continents and oceans mix", gens:[["cshape","alone"],["cshape","blank"],["cfact"],["ocean"]]},
  {name:"Continent champion", gens:[["cshape","blank"],["cshape","world"],["cfact"],["ocean"],["cshape","alone"]]}
];
const _CONT_ORDER = ["na","sa","eu","af","as","oc"], _CONT_ICON = {na:"🦅",sa:"🦙",eu:"🏰",af:"🦁",as:"🐼",oc:"🦘"};
const COUNTRY_LEVELS = [
  ..._CONT_ORDER.map(ct=>({name:`${_CONT_ICON[ct]} Countries of ${_contName(ct)}`, gens:[["dot",ct],["flag",ct],["capital",ct],["incont",ct]]})),
  ...COUNTRIES.map(c=>({name:`${c[2]} ${c[1]}`, n:Math.min(8, 4 + c[7].length), gens:[["country",c[0]]]}))
];
