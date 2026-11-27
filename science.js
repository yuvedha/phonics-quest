/* =============================================================
   LITTLE EXPLORERS QUEST: SCIENCE LAB (aligned to NSW Science and Technology K-6, Stage 1)
   Living World (c13) and Science Lab (c14). Fact banks: [question, answer, [wrong, wrong], emoji].
   Add new banks/levels at the END of each list. Uses helpers from maths.js and _draw from gk.js.
   ============================================================= */
const SCI_LABEL = {living:"Living and non-living", babies:"Animal babies", lifecycle:"Life cycles", plants:"Plants and seeds", animals:"Animals and their homes", senses:"The five senses", seasons:"Seasons", forces:"Pushes and pulls", friction:"Friction and gravity", magnets:"Magnets", light:"Light and shadows", sound:"Sound", weather:"Weather", sky:"Day, night, Sun and Moon", rocks:"Rocks and materials", predict:"Predicting", data:"Charts and counting"};
const SCI = {
 living: [
  ["Which one is a living thing?","a tree",["a rock","a toy car"],"🌳"],["Which one is NOT a living thing?","a pebble",["a bird","a daisy"],"🪨"],
  ["Which living thing can grow and make seeds?","a plant",["a chair","a spoon"],"🌱"],["Which one needs food and water to live?","a puppy",["a doll","a bicycle"],"🐶"],
  ["Which one is a non-living thing?","a toy train",["a goldfish","a gum tree"],"🚂"],["Which of these can move and breathe?","a cat",["a table","a cloud"],"🐱"],
  ["Which of these can grow bigger by itself?","a baby",["a toy","a ball"],"👶"],["Is a mushroom a living thing?","yes",["no","only on Mondays"],"🍄"],
  ["Which one is a living thing?","a butterfly",["a kite","a lamp"],"🦋"],["Which one is non-living?","the Sun's light",["a worm","a seed that can sprout"],"☀️"]],
 babies: [
  ["What is a baby kangaroo called?","a joey",["a calf","a cub"],"🦘"],["What is a baby dog called?","a puppy",["a kitten","a lamb"],"🐶"],["What is a baby cat called?","a kitten",["a puppy","a chick"],"🐱"],
  ["What is a baby sheep called?","a lamb",["a calf","a foal"],"🐑"],["What is a baby cow called?","a calf",["a lamb","a joey"],"🐄"],["What is a baby horse called?","a foal",["a calf","a kid"],"🐴"],
  ["What is a baby hen called?","a chick",["a duckling","a cub"],"🐥"],["What is a baby frog called?","a tadpole",["a puppy","a joey"],"🐸"],["What is a baby duck called?","a duckling",["a chick","a lamb"],"🦆"],
  ["What is a baby lion called?","a cub",["a calf","a lamb"],"🦁"],["Which animal hatches from an egg?","a crocodile",["a dog","a cow"],"🐊"],["Which baby drinks milk from its mum?","a calf",["a chick","a tadpole"],"🍼"]],
 plants: [
  ["What does a seed need to start growing?","water and warmth",["music and toys","loud noises"],"🌱"],["What do plants need from the Sun?","light",["toys","paint"],"☀️"],["Which part of a plant holds it in the soil?","the roots",["the flower","the fruit"],"🌿"],
  ["Which part of a plant makes seeds?","the flower",["the root","the soil"],"🌸"],["Which part of a plant is usually green and flat?","a leaf",["a root","a seed"],"🍃"],["What is the tall part of a tree called?","the trunk",["the root","the petal"],"🌳"],
  ["What grows from a tiny seed?","a new plant",["a rock","a toy"],"🌻"],["What do roots take in from the soil?","water",["sound","sunshine"],"💧"],["If a plant gets no water it will…","droop and wilt",["grow bigger","sing"],"🥀"],
  ["Which of these is a seed?","a pea",["a spoon","a pebble"],"🫛"],["Where can seeds be found?","inside fruit",["inside rocks","inside clouds"],"🍎"],["Which part of a plant has the colourful petals?","the flower",["the root","the stem"],"🌺"]],
 animals: [
  ["Where does a fish live?","in water",["in a tree","in a nest"],"🐟"],["Where does a bird build its nest?","in a tree",["under the sea","underground"],"🐦"],["Where does a rabbit live?","in a burrow",["in a nest","in a hive"],"🐇"],
  ["Where do bees live?","in a hive",["in a burrow","in a pond"],"🐝"],["How many legs does an insect have?","6",["4","8"],"🐜"],["How many legs does a spider have?","8",["6","4"],"🕷️"],
  ["Which animal has feathers?","a bird",["a fish","a frog"],"🦜"],["Which animal has fur?","a koala",["a snake","a fish"],"🐨"],["Which animal has scales?","a fish",["a rabbit","a hen"],"🐠"],
  ["Which animal eats only plants?","a cow",["a lion","a shark"],"🐄"],["Which animal eats meat?","a lion",["a cow","a rabbit"],"🦁"],["Which animal is an insect?","an ant",["a spider","a worm"],"🐜"],
  ["Which animals live in the Australian bush?","koalas and wombats",["polar bears","penguins in the desert"],"🐨"],["Which animal can fly and has fur?","a bat",["a hen","a duck"],"🦇"]],
 senses: [
  ["Which sense do we use to listen to music?","hearing",["taste","smell"],"👂"],["Which body part do we use to taste?","our tongue",["our elbow","our hair"],"👅"],["Which sense does our nose give us?","smell",["sight","hearing"],"👃"],
  ["Which sense helps us feel a soft teddy?","touch",["smell","sight"],"🧸"],["Which sense do we use to look at a rainbow?","sight",["taste","touch"],"🌈"],["Which body part helps us feel hot and cold?","our skin",["our teeth","our hair"],"🖐️"],
  ["A lemon tastes…","sour",["sweet","loud"],"🍋"],["Sugar tastes…","sweet",["sour","loud"],"🍬"],["Sandpaper feels…","rough",["smooth","soft"],"📄"],["An ice cube feels…","cold",["hot","warm"],"🧊"],
  ["A drum is…","loud",["quiet","sticky"],"🥁"],["How many senses do we have?","5",["3","8"],"🖐️"],["Which sense tells us a cake is baking?","smell",["sight","touch"],"🎂"],["Which part of us do we use to see?","our eyes",["our ears","our nose"],"👀"]],
 seasons: [
  ["In which season do many trees drop their leaves?","autumn",["spring","summer"],"🍂"],["In which season do many flowers bloom?","spring",["winter","autumn"],"🌷"],["In which season do we need warm jackets?","winter",["summer","spring"],"🧥"],
  ["In which season is it hottest in Australia?","summer",["winter","spring"],"☀️"],["Many baby animals are born in which season?","spring",["autumn","winter"],"🐣"],["Which season comes after summer?","autumn",["spring","winter"],"🍁"],
  ["Why do we wear sunhats in summer?","to protect us from the Sun",["to keep us dry","to keep us warm"],"👒"],["Which season has the shortest days?","winter",["summer","spring"],"❄️"]],
 forces: [
  ["Kicking a ball is a…","push",["pull","twist"],"⚽"],["Opening a drawer by its handle is a…","pull",["push","kick"],"🗄️"],["Pulling a wagon is a…","pull",["push","kick"],"🛒"],
  ["Pushing a swing is a…","push",["pull","twist"],"🎠"],["A tug-of-war is all about…","pulling",["pushing","kicking"],"🪢"],["A bigger push makes a ball go…","farther",["shorter","backwards"],"⚽"],
  ["What do we call a push or a pull?","a force",["a toy","a game"],"💪"],["A force can make something…","move or stop",["sing","disappear"],"🛷"],["Closing a door by pushing it uses a…","push",["pull","magnet"],"🚪"],["Which is easier to move: a feather or a big rock?","a feather",["a big rock","they are the same"],"🪶"]],
 friction: [
  ["What pulls things down towards the ground?","gravity",["magic","wind"],"🍎"],["If you drop a ball, it…","falls down",["floats up","stays in the air"],"⚽"],["What is friction?","a force that slows things when they rub",["a kind of ice cream","a loud sound"],"🛹"],
  ["Which surface is the most slippery?","ice",["sandpaper","carpet"],"🧊"],["Which surface has the most friction?","a rough carpet",["a wet slide","ice"],"🧶"],["Which makes a toy car roll farther?","a smooth floor",["a thick carpet","a muddy path"],"🚗"],
  ["Shoes with grip help us because of…","friction",["music","magnets"],"👟"],["Rubbing your hands together makes them…","warm",["cold","blue"],"🙌"],["Which will slide down a slope more easily?","a smooth block",["a rough block","they are the same"],"🛝"],["A ball rolls down a slope because of…","gravity",["friction only","magnets"],"⛰️"]],
 magnets: [
  ["How many ends (poles) does a magnet have?","2",["1","5"],"🧲"],["Magnets pull things made of…","iron or steel",["wood","plastic"],"🧲"],["Opposite poles of two magnets…","pull together",["push apart","disappear"],"🧲"],
  ["Two of the same poles…","push apart",["pull together","stick forever"],"🧲"],["A magnet can pick up a…","paper clip",["wooden spoon","glass marble"],"📎"],["Which is magnetic?","an iron nail",["a plastic cup","a sheet of paper"],"🔩"],
  ["Magnets stick to a fridge door because it is made of…","steel",["wood","glass"],"🧊"],["Magnets can pull things without…","touching them",["any force","any poles"],"🧲"]],
 light: [
  ["What do we need to see things?","light",["noise","wind"],"💡"],["Which is a light source?","the Sun",["the Moon's shadow","a book"],"☀️"],["Which is a light source?","a torch",["a pillow","a book"],"🔦"],
  ["What makes a shadow?","something blocking the light",["something making a noise","something very cold"],"🧍"],["When is your shadow longest?","early morning or late afternoon",["in the middle of the day","at night"],"🌇"],["Can you see your shadow in the dark?","no",["yes","only in rain"],"🌑"],
  ["Which material lets light pass through?","clear glass",["wood","metal"],"🪟"],["Which makes the darkest shadow?","a wooden board",["clear glass","clear plastic"],"🪵"],["What does a mirror do to light?","bounces it back",["eats it","makes it cold"],"🪞"],["If the Sun is behind you, your shadow is…","in front of you",["behind you","above you"],"🧍"],["Which is see-through (transparent)?","a window",["a brick wall","a cardboard box"],"🪟"]],
 sound: [
  ["Sound is made by…","vibrations (wobbles)",["colours","smells"],"🔊"],["A drum makes sound when you…","hit it",["paint it","sleep on it"],"🥁"],["Which is louder?","a shout",["a whisper","a sleeping cat"],"📢"],
  ["Which instrument do you blow?","a trumpet",["a drum","a violin"],"🎺"],["Which instrument has strings you pluck?","a guitar",["a trumpet","a drum"],"🎸"],["Which makes a higher sound?","a mouse squeak",["a lion roar","a drum"],"🐭"],
  ["When you hum, your throat feels…","tingly (it vibrates)",["frozen","sticky"],"🎶"],["Sound travels through the…","air",["colours","shadows"],"👂"],["Which body part do we hear with?","our ears",["our eyes","our toes"],"👂"],["Which is the quietest?","a whisper",["a siren","a drum"],"🤫"]],
 weather: [
  ["What do we use to measure temperature?","a thermometer",["a ruler","a clock"],"🌡️"],["What instrument collects rain?","a rain gauge",["a thermometer","a compass"],"🌧️"],["What do we call moving air?","wind",["rain","fog"],"🌬️"],
  ["Which weather is best for flying a kite?","windy",["still","stormy and wet"],"🪁"],["Which weather needs an umbrella?","rainy",["sunny","windy"],"☔"],["What does a windsock show us?","which way the wind blows",["how hot it is","what time it is"],"🎏"],
  ["After lightning, we hear…","thunder",["music","a whistle"],"⛈️"],["What do we call a day with no clouds?","clear and sunny",["foggy","stormy"],"☀️"],["Which weather makes puddles?","rain",["sun","wind"],"🌧️"],["What do we wear on a cold, wet day?","a raincoat and jumper",["swimmers","a sunhat only"],"🧥"]],
 sky: [
  ["Why do we have day and night?","the Earth spins around",["the Sun goes out","clouds cover the Earth"],"🌍"],["In which direction does the Sun rise?","east",["west","south"],"🌅"],["In which direction does the Sun set?","west",["east","north"],"🌇"],
  ["What do we see in the sky at night?","the Moon and stars",["the Sun","a rainbow"],"🌙"],["The Moon shines because it…","reflects sunlight",["has a lamp inside","is on fire"],"🌕"],["Is the Sun a star?","yes",["no","it is a planet"],"☀️"],
  ["Which is bigger?","the Sun",["the Earth","the Moon"],"☀️"],["How long does it take the Earth to spin once?","one day",["one hour","one week"],"🌍"],["When is your shadow the shortest?","when the Sun is high in the sky",["when the Sun is rising","when it is night"],"🧍"],["The Moon is shaped like a thin curve (crescent) at some times. What is this called?","a crescent moon",["a sun spot","a star"],"🌙"]],
 rocks: [
  ["Which is the hardest?","a rock",["cotton wool","jelly"],"🪨"],["Which is soft?","cotton wool",["a rock","a brick"],"☁️"],["Which material is waterproof?","a raincoat",["a paper towel","a sponge"],"🧥"],
  ["Which will float on water?","a cork",["a stone","a coin"],"🍾"],["Which will sink in water?","a stone",["a cork","a leaf"],"🪨"],["Which material is stretchy?","a rubber band",["a stick","a brick"],"🪀"],
  ["A window is made of…","glass",["wool","paper"],"🪟"],["Sand is made of tiny bits of…","rock",["sugar","paper"],"🏖️"],["What is a very big rock called?","a boulder",["a pebble","a grain"],"🪨"],["Soil helps plants to…","grow",["sing","fly"],"🌱"],["Which is a natural material?","wood",["plastic","glass bottle"],"🪵"],["Which is made by people?","a brick",["a leaf","a pebble"],"🧱"]],
 predict: [
  ["If we put an ice cube in the sun, it will…","melt",["grow","sing"],"🧊"],["If we leave a plant with no water, it will…","wilt",["bloom","float"],"🥀"],["If we put a leaf on water, it will…","float",["sink to the bottom","turn red"],"🍃"],
  ["If we put a stone in water, it will…","sink",["float","fly"],"🪨"],["If we put a ball at the top of a slope, it will…","roll down",["roll up","stay still"],"⛰️"],["If we warm chocolate, it will…","melt",["freeze","grow"],"🍫"],
  ["If we put a magnet near a paper clip, it will…","stick",["melt","shrink"],"🧲"],["If we hold a torch behind a book, we get…","a shadow",["a rainbow","a sound"],"🔦"],["If we plant a seed and water it, it may…","grow into a plant",["turn into a rock","fly away"],"🌱"],["If we put a wet towel in the sun, it will…","dry",["freeze","grow"],"🏖️"]]
};
const SCI_LIFE = {
  butterfly:["egg","caterpillar","chrysalis","butterfly"], frog:["egg","tadpole","froglet","frog"], chicken:["egg","chick","young hen","hen"],
  plant:["seed","seedling","young plant","flower"], person:["baby","toddler","child","adult"]
};
const SCI_LIFE_NAME = {butterfly:"butterfly",frog:"frog",chicken:"chicken",plant:"plant",person:"person"};
const _EM = ["🐶","🐱","🐟","🐦","🍎","🍌","⭐","🚗","🌼"];

const SCI_GEN = {
  sfact: (topic)=>{ const f=_draw("sci:"+topic, SCI[topic]); return {q:f[0], say:f[0], vis:f[3]?`<div class="mvis" style="font-size:72px">${f[3]}</div>`:"", type:"mc", ans:f[1], opts:_sh([f[1],...f[2]]), why:`The answer is ${f[1]}.`, key:topic}; },
  smix: (...topics)=>SCI_GEN.sfact(_pick(topics)),
  lifecycle: ()=>{ const kind=_pick(Object.keys(SCI_LIFE)), seq=SCI_LIFE[kind], i=_r(1,seq.length-1), ans=seq[i];
    const chips = seq.map((s,k)=>`<span style="display:inline-block;margin:4px;padding:8px 12px;border-radius:14px;background:${k===i?"#ffe08a":"#e8f5e9"};font-size:22px;font-weight:700">${k===i?"❓":s}</span>`).join("➜");
    const wr = _sh(seq.filter(x=>x!==ans)).slice(0,3);
    return {q:_uq(`Life cycle of a <b>${SCI_LIFE_NAME[kind]}</b>. What is the missing step?`,kind+i), say:`Life cycle of a ${SCI_LIFE_NAME[kind]}. What is the missing step?`, vis:`<div class="mvis" style="font-size:22px">${chips}</div>`, type:"mc", ans, opts:_opts(ans,wr), why:`The steps are: ${seq.join(", then ")}.`, key:"lifecycle"}; },
  magnet: ()=>{ const yes=[["a paper clip","📎"],["an iron nail","🔩"],["a steel key","🔑"],["a steel can","🥫"]], no=[["a wooden spoon","🥄"],["a plastic cup","🥤"],["a rubber band","🪀"],["a glass marble","🔮"],["a sheet of paper","📄"],["a feather","🪶"]];
    const isYes=Math.random()<0.5, it=isYes?_draw("magY",yes.slice()):_draw("magN",no.slice());
    return {q:_uq(`Will a magnet stick to <b>${it[0]}</b>?`,it[0]), say:`Will a magnet stick to ${it[0]}?`, vis:`<div class="mvis" style="font-size:72px">${it[1]} 🧲</div>`, type:"mc", ans:isYes?"yes":"no", opts:["yes","no"].concat(["not sure"]), why:isYes?`Yes! ${it[0]} is made of iron or steel.`:`No. ${it[0]} is not made of iron or steel.`, key:"magnets"}; },
  sdata: ()=>{ const e=_sh(_EM).slice(0,3), c=[0,0,0]; const used=_sh([1,2,3,4,5,6,7,8]).slice(0,3); used.forEach((v,i)=>c[i]=v);
    const rows=e.map((x,i)=>`<div style="font-size:28px;margin:2px 0">${x} ${x.repeat(0)}${Array(c[i]).fill(x).join("")}</div>`).join("");
    const kind=_pick(["most","fewest","count","more"]); let q,ans,opts,type="mc",why;
    if(kind==="most"){ const m=c.indexOf(Math.max(...c)); q="Which has the <b>most</b>?"; ans=e[m]; opts=_sh(e); why=`${e[m]} has the most.`; }
    else if(kind==="fewest"){ const m=c.indexOf(Math.min(...c)); q="Which has the <b>fewest</b>?"; ans=e[m]; opts=_sh(e); why=`${e[m]} has the fewest.`; }
    else if(kind==="count"){ const m=_r(0,2); q=`How many ${e[m]} are there?`; ans=c[m]; type="num"; why=`There are ${c[m]} ${e[m]}.`; }
    else { const a=c.indexOf(Math.max(...c)), b=c.indexOf(Math.min(...c)); q=`How many more ${e[a]} than ${e[b]}?`; ans=c[a]-c[b]; type="num"; why=`${c[a]} take away ${c[b]} is ${ans}.`; }
    return {q:_uq(q,e.join("")+kind+c.join("")), say:q.replace(/<[^>]+>/g,""), vis:`<div class="mvis">${rows}</div>`, type, ans, opts, why, key:"data"}; }
};
const SCI_LEVELS_LIVING = [
  {name:"Living or not living?", n:10, gens:[["sfact","living"]]},
  {name:"Animal babies", n:10, gens:[["sfact","babies"]]},
  {name:"Life cycles: what comes next?", gens:[["lifecycle"]]},
  {name:"Plants and seeds", n:10, gens:[["sfact","plants"]]},
  {name:"Animals and where they live", n:10, gens:[["sfact","animals"]]},
  {name:"Our five senses", n:10, gens:[["sfact","senses"]]},
  {name:"Seasons and living things", n:8, gens:[["sfact","seasons"]]},
  {name:"Living world challenge", gens:[["smix","living","babies","plants","animals","senses","seasons"],["lifecycle"]]}
];
const SCI_LEVELS_LAB = [
  {name:"Pushes and pulls", n:10, gens:[["sfact","forces"]]},
  {name:"Friction and gravity", n:10, gens:[["sfact","friction"]]},
  {name:"Magnet magic", gens:[["magnet"],["sfact","magnets"]]},
  {name:"Light and shadows", n:10, gens:[["sfact","light"]]},
  {name:"Sound and vibrations", n:10, gens:[["sfact","sound"]]},
  {name:"Weather watchers", n:10, gens:[["sfact","weather"]]},
  {name:"Day, night, Sun and Moon", n:10, gens:[["sfact","sky"]]},
  {name:"Rocks and materials", n:10, gens:[["sfact","rocks"]]},
  {name:"Predict what will happen", n:10, gens:[["sfact","predict"]]},
  {name:"Counting and charts", gens:[["sdata"]]},
  {name:"Science Lab challenge", gens:[["smix","forces","friction","light","sound","weather","sky","rocks","predict"],["magnet"],["sdata"]]}
];

/* ---------- Learn pages (shown before the quiz, skippable) ---------- */
(function(){
  const chip = (s)=>`<span style="display:inline-block;margin:3px;padding:6px 12px;border-radius:14px;background:#e8f5e9;font-size:20px;font-weight:700">${s}</span>`;
  const lifePages = Object.keys(SCI_LIFE).map(k=>_lpg("Life cycle: "+SCI_LIFE_NAME[k], `<div class="mvis" style="font-size:20px">${SCI_LIFE[k].map(chip).join("➜")}</div><p style="font-size:20px">A life cycle shows how a living thing grows and changes, step by step, from a baby to a grown-up.</p>`, `The life cycle of a ${SCI_LIFE_NAME[k]}: ${SCI_LIFE[k].join(", then ")}.`));
  const magnetPage = _lpg("Magnets", `<p style="font-size:60px;margin:6px">🧲</p><p style="font-size:20px">A magnet pulls things made of <b>iron or steel</b>.<br>✅ Sticks: 📎 paper clip, 🔩 iron nail, 🔑 steel key, 🥫 steel can<br>❌ Does not stick: 🥄 wood, 🥤 plastic, 🪀 rubber, 🔮 glass, 📄 paper<br>A magnet has <b>2 poles</b>. Opposite poles <b>pull</b>, the same poles <b>push</b> apart.</p>`, "A magnet pulls things made of iron or steel. A paper clip, an iron nail, a steel key and a steel can stick to a magnet. Wood, plastic, rubber, glass and paper do not. A magnet has two poles. Opposite poles pull together, and the same poles push apart.");
  const dataPage = _lpg("Reading a chart", `<div class="mvis" style="font-size:26px">🐶🐶🐶<br>🐱🐱<br>🐟🐟🐟🐟🐟</div><p style="font-size:20px">Count the pictures in each row.<br>🐶 = 3, 🐱 = 2, 🐟 = 5.<br>The row with <b>the most</b> pictures is 🐟. The row with <b>the fewest</b> is 🐱.<br>To find <b>how many more</b>, take away: 5 − 2 = 3.</p>`, "Count the pictures in each row. Dogs are three, cats are two, fish are five. The row with the most pictures is fish. The row with the fewest is cats. To find how many more, take away: five take away two is three.");
  SCI_LEVELS_LIVING.forEach((L,i)=>{ if(L.gens[0][0]==="sfact") L.learn = _factPages(SCI[L.gens[0][1]], 4, "Science facts"); });
  SCI_LEVELS_LIVING[2].learn = lifePages;
  SCI_LEVELS_LAB.forEach((L,i)=>{ if(L.gens[0][0]==="sfact") L.learn = _factPages(SCI[L.gens[0][1]], 4, "Science facts"); });
  SCI_LEVELS_LAB[2].learn = [magnetPage].concat(_factPages(SCI.magnets, 4, "Magnet facts"));
  SCI_LEVELS_LAB[9].learn = [dataPage];
})();
