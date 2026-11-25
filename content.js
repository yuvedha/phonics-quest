/* =============================================================
   PHONICS QUEST: LESSON CONTENT
   Everything the child learns lives in this file. The game code is in index.html.
   To add levels, scroll to "NEW LEVELS" at the bottom and add more entries.
   Levels unlock in order, so ALWAYS add new levels at the END of a list.
   ============================================================= */

/* =============================================================
   CHAPTER 1: MISSING LETTERS (sight words). 8 levels, 1 to 3 missing letters.
   Common high-frequency words. Please check against your school's list.
   ============================================================= */
const WORD_LEVELS = [
  {name:"Year 1: starter words", blanks:1, words:["was","said","they","have","come","some","were","what","when","from","your","here"]},
  {name:"Year 1: more words", blanks:1, words:["there","where","would","could","about","their","little","people","again","going","over","into"]},
  {name:"Year 1: tricky words", blanks:1, words:["friend","school","every","because","after","just","want","who","how","put","does","are"]},
  {name:"Year 1: two missing", blanks:2, words:["they","what","where","there","would","could","because","friend","school","people","little","again"]},
  {name:"Year 2: first words", blanks:2, words:["always","another","before","first","great","many","other","should","these","those","water","which"]},
  {name:"Year 2: more words", blanks:2, words:["world","very","across","together","found","around","children","house","only","right","through","brother"]},
  {name:"Year 2: tricky words", blanks:2, words:["thought","enough","mother","whole","laugh","though","because","friend","people","always","another","together"]},
  {name:"Challenge: three missing", blanks:3, words:["beautiful","believe","favourite","different","tomorrow","library","everyone","someone","together","children","through","thought"]}
];

/* =============================================================
   CHAPTER 2: SAY THE SOUNDS (Jolly Phonics order). [sound, picture word, picture]
   ============================================================= */
const SOUND_GROUPS = {
  1: [["s","sun","☀️"],["a","ant","🐜"],["t","tap","🚰"],["i","insect","🐛"],["p","pig","🐷"],["n","net","🥅"]],
  2: [["c","cat","🐱"],["k","kite","🪁"],["e","egg","🥚"],["h","hat","🎩"],["r","rat","🐀"],["m","moon","🌙"],["d","dog","🐶"]],
  3: [["g","goat","🐐"],["o","orange","🍊"],["u","umbrella","☂️"],["l","leg","🦵"],["f","fish","🐟"],["b","ball","⚽"]],
  4: [["ai","rain","🌧️"],["j","jam","🍓"],["oa","boat","⛵"],["ie","pie","🥧"],["ee","bee","🐝"],["or","fork","🍴"]],
  5: [["z","zebra","🦓"],["w","web","🕸️"],["ng","ring","💍"],["v","van","🚐"],["oo","book","📖"],["oo","spoon","🥄"]],
  6: [["y","yellow","💛"],["x","box","📦"],["ch","chip","🍟"],["sh","ship","🚢"],["th","thumb","👍"]],
  7: [["qu","queen","👸"],["ou","cloud","☁️"],["oi","coin","🪙"],["ue","blue","🔵"],["er","fern","🌿"],["ar","car","🚗"]]
};

/* =============================================================
   CHAPTER 3: DIGRAPH LESSONS. Each digraph and ALL the sounds it can make.
   sound: {say, key, keyPic, words:[[word, picture or ""]]}
   ============================================================= */
const LESSONS = [
  {dg:"oo", intro:"The letters oo can make two different sounds.", sounds:[
    {say:"long oo", key:"moon", keyPic:"🌙", words:[["moon","🌙"],["spoon","🥄"],["zoo","🦁"],["food","🍲"],["boot","🥾"],["cool","😎"]]},
    {say:"short oo", key:"book", keyPic:"📖", words:[["book","📖"],["foot","🦶"],["look","👀"],["cook","🍳"],["wood","🪵"],["good","👍"]]}]},
  {dg:"ea", intro:"The letters ea can make three different sounds!", sounds:[
    {say:"long ee", key:"leaf", keyPic:"🍃", words:[["leaf","🍃"],["beach","🏖️"],["team",""],["seal","🦭"],["clean","🧹"],["eat","🍽️"]]},
    {say:"short e", key:"bread", keyPic:"🍞", words:[["bread","🍞"],["head",""],["feather","🪶"],["heavy",""],["ready",""]]},
    {say:"long a", key:"great", keyPic:"🌟", words:[["great","🌟"],["break",""],["steak","🥩"]]}]},
  {dg:"ow", intro:"The letters ow can say 'oh' or 'ow'.", sounds:[
    {say:"long o (oh)", key:"snow", keyPic:"❄️", words:[["snow","❄️"],["grow","🌱"],["yellow","💛"],["window","🪟"],["show",""],["blow",""]]},
    {say:"ow (as in cow)", key:"cow", keyPic:"🐄", words:[["cow","🐄"],["down",""],["brown","🟤"],["owl","🦉"],["clown","🤡"],["crown","👑"]]}]},
  {dg:"th", intro:"The letters th can be soft or buzzy.", sounds:[
    {say:"soft th (no buzz)", key:"thumb", keyPic:"👍", words:[["thumb","👍"],["bath","🛁"],["three","3️⃣"],["thin",""],["think","🤔"],["moth","🦋"]]},
    {say:"buzzy th (voice on)", key:"this", keyPic:"👉", words:[["this","👉"],["that",""],["then",""],["the",""],["mother","👩‍👧"],["brother","👦"]]}]},
  {dg:"ou", intro:"The letters ou can make three sounds.", sounds:[
    {say:"ow (as in house)", key:"house", keyPic:"🏠", words:[["house","🏠"],["mouse","🐭"],["cloud","☁️"],["round","⚪"],["found",""],["out",""]]},
    {say:"long oo (as in soup)", key:"soup", keyPic:"🍲", words:[["soup","🍲"],["group","👥"],["you",""]]},
    {say:"short u (as in young)", key:"young", keyPic:"👶", words:[["young","👶"],["touch",""],["cousin",""]]}]},
  {dg:"ch", intro:"The letters ch can make three sounds.", sounds:[
    {say:"ch (as in chip)", key:"chip", keyPic:"🍟", words:[["chip","🍟"],["cheese","🧀"],["chair","🪑"],["lunch","🥪"],["bench",""],["chin",""]]},
    {say:"k (as in school)", key:"school", keyPic:"🏫", words:[["school","🏫"],["chorus","🎶"],["stomach",""],["echo",""]]},
    {say:"sh (as in chef)", key:"chef", keyPic:"👨‍🍳", words:[["chef","👨‍🍳"],["machine",""],["chute","🛝"]]}]},
  {dg:"ie", intro:"The letters ie can make three sounds.", sounds:[
    {say:"long i (as in pie)", key:"pie", keyPic:"🥧", words:[["pie","🥧"],["tie","👔"],["lie",""],["cried",""]]},
    {say:"long ee (as in field)", key:"field", keyPic:"🌾", words:[["field","🌾"],["thief",""],["chief",""],["niece",""]]},
    {say:"short e (as in friend)", key:"friend", keyPic:"🧑‍🤝‍🧑", words:[["friend","🧑‍🤝‍🧑"]]}]},
  {dg:"ey", intro:"The letters ey can say 'ee' or 'ay'.", sounds:[
    {say:"long ee (as in key)", key:"key", keyPic:"🔑", words:[["key","🔑"],["monkey","🐵"],["donkey","🫏"],["turkey","🦃"],["valley",""]]},
    {say:"long a (as in they)", key:"they", keyPic:"👫", words:[["they","👫"],["grey","🩶"],["obey",""],["prey",""]]}]},
  {dg:"ough", intro:"The letters ough are tricky! They make lots of sounds.", sounds:[
    {say:"oh (as in though)", key:"though", keyPic:"🤷", words:[["though",""],["dough","🥟"],["although",""]]},
    {say:"or (as in thought)", key:"thought", keyPic:"💭", words:[["thought","💭"],["bought","🛍️"],["brought",""],["fought",""]]},
    {say:"uff (as in enough)", key:"enough", keyPic:"✋", words:[["enough","✋"],["rough",""],["tough","💪"]]},
    {say:"oo (as in through)", key:"through", keyPic:"🚇", words:[["through","🚇"]]}]}
];

/* =============================================================
   CHAPTER 4: PICTURE QUEST. See the picture, say it, spell it.
   ============================================================= */
const PICTURE_LEVELS = [
  {name:"Short words", items:[["cat","🐱"],["dog","🐶"],["sun","☀️"],["pig","🐷"],["hat","🎩"],["bus","🚌"],["cup","☕"],["bed","🛏️"],["fox","🦊"],["bug","🐛"],["net","🥅"],["pen","🖊️"]]},
  {name:"Blends", items:[["frog","🐸"],["drum","🥁"],["flag","🚩"],["crab","🦀"],["clock","🕐"],["snail","🐌"],["plant","🌱"],["tree","🌳"],["bread","🍞"],["glove","🧤"],["tent","⛺"],["swan","🦢"]]},
  {name:"Digraph words", items:[["ship","🚢"],["fish","🐟"],["chip","🍟"],["duck","🦆"],["moon","🌙"],["boat","⛵"],["rain","🌧️"],["shell","🐚"],["sheep","🐑"],["leaf","🍃"],["coin","🪙"],["fork","🍴"]]},
  {name:"Longer words", items:[["flower","🌸"],["house","🏠"],["spoon","🥄"],["phone","📱"],["whale","🐳"],["turtle","🐢"],["light","💡"],["bridge","🌉"],["witch","🧙"],["rabbit","🐰"],["monkey","🐵"],["spider","🕷️"]]},
  {name:"Big words", items:[["giraffe","🦒"],["elephant","🐘"],["butterfly","🦋"],["umbrella","☂️"],["rainbow","🌈"],["dinosaur","🦕"],["volcano","🌋"],["octopus","🐙"],["strawberry","🍓"],["kangaroo","🦘"],["crocodile","🐊"],["sandwich","🥪"]]}
];

/* =============================================================
   CHAPTER 5: DIGRAPH DETECTIVE (pick the missing digraph). [digraph, word, picture]
   ============================================================= */
const DETECTIVE = [
  {name:"sh ch th wh ck ng ph", items:[["sh","ship","🚢"],["sh","fish","🐟"],["sh","shell","🐚"],["ch","chip","🍟"],["ch","chick","🐥"],["ch","cheese","🧀"],["th","thumb","👍"],["th","bath","🛁"],["wh","whale","🐳"],["wh","wheel","🛞"],["ck","duck","🦆"],["ck","sock","🧦"],["ck","clock","🕐"],["ng","ring","💍"],["ph","phone","📱"]]},
  {name:"ai ee ea oa oo ay ow ou oi oy", items:[["ai","rain","🌧️"],["ai","snail","🐌"],["ee","tree","🌳"],["ee","sheep","🐑"],["ea","leaf","🍃"],["ea","beach","🏖️"],["oa","boat","⛵"],["oa","goat","🐐"],["oo","moon","🌙"],["oo","spoon","🥄"],["ay","tray","🍽️"],["ow","cow","🐄"],["ow","snow","❄️"],["ou","house","🏠"],["ou","mouse","🐭"],["oi","coin","🪙"],["oy","toy","🧸"]]},
  {name:"ar or er ir ur ie igh ue tch dge", items:[["ar","car","🚗"],["ar","star","⭐"],["or","fork","🍴"],["or","horse","🐴"],["er","fern","🌿"],["er","flower","🌸"],["ir","bird","🐦"],["ur","turtle","🐢"],["ie","pie","🥧"],["igh","light","💡"],["ue","blue","🔵"],["tch","witch","🧙"],["dge","bridge","🌉"]]}
];

/* =============================================================
   NEW LEVELS (added over time). Add future levels here, at the end.
   ============================================================= */

/* ---- Chapter 1: Missing Letters, levels 9 to 13 ---- */
WORD_LEVELS.push(
  {name:"Year 2: more tricky words", blanks:2, words:["also","been","both","change","done","gone","half","hour","move","most","any","many"]},
  {name:"Days and time words", blanks:2, words:["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday","today","tomorrow","yesterday","weekend","morning"].map(w=>w.toLowerCase())},
  {name:"Year 3: tricky words", blanks:3, words:["answer","busy","caught","eight","early","earth","heart","island","money","often","pretty","special"]},
  {name:"Challenge: longer words", blanks:3, words:["important","remember","something","everything","sometimes","different","favourite","understand","interesting","surprise","strange","through"]},
  {name:"Aussie spelling", blanks:3, words:["colour","favourite","neighbour","centre","metre","litre","theatre","honour","behaviour","harbour","grey","mum"]}
);

/* ---- Chapter 3: Digraph Lessons, levels 10 to 16 ---- */
LESSONS.push(
  {dg:"s", intro:"The letter s can say 's' or 'z'.", sounds:[
    {say:"s (as in sun)", key:"sun", keyPic:"☀️", words:[["sun","☀️"],["sock","🧦"],["snake","🐍"],["bus","🚌"],["star","⭐"],["sit",""]]},
    {say:"z (as in is)", key:"is", keyPic:"👉", words:[["is",""],["his",""],["has",""],["rose","🌹"],["nose","👃"],["easy",""]]}]},
  {dg:"c", intro:"The letter c can be hard like 'k' or soft like 's'.", sounds:[
    {say:"hard c, says k (as in cat)", key:"cat", keyPic:"🐱", words:[["cat","🐱"],["cup","☕"],["cake","🎂"],["cow","🐄"],["coat","🧥"],["candy","🍬"]]},
    {say:"soft c, says s (as in city)", key:"city", keyPic:"🏙️", words:[["city","🏙️"],["cent","🪙"],["pencil","✏️"],["face","🙂"],["ice","🧊"],["dance","💃"]]}]},
  {dg:"g", intro:"The letter g can be hard like in 'go' or soft like 'j'.", sounds:[
    {say:"hard g (as in goat)", key:"goat", keyPic:"🐐", words:[["goat","🐐"],["game","🎮"],["gift","🎁"],["green","🟢"],["gate",""],["garden","🌻"]]},
    {say:"soft g, says j (as in giant)", key:"giant", keyPic:"🧌", words:[["giant","🧌"],["gem","💎"],["giraffe","🦒"],["gentle",""],["page","📄"],["cage",""]]}]},
  {dg:"y", intro:"The letter y can say 'eye', 'ee' or 'yuh'.", sounds:[
    {say:"long i (as in sky)", key:"sky", keyPic:"🌤️", words:[["sky","🌤️"],["my",""],["fly","🪰"],["try",""],["cry","😢"],["dry",""]]},
    {say:"long ee (as in happy)", key:"happy", keyPic:"😀", words:[["happy","😀"],["baby","👶"],["funny","🤪"],["puppy","🐶"],["bunny","🐰"],["jelly",""]]},
    {say:"yuh (as in yes)", key:"yes", keyPic:"✅", words:[["yes","✅"],["yellow","💛"],["yawn","🥱"],["yak","🐃"]]}]},
  {dg:"ed", atEnd:true, intro:"The ending ed can say 't', 'd' or 'id'.", sounds:[
    {say:"t (as in jumped)", key:"jumped", keyPic:"🦘", words:[["jumped","🦘"],["walked","🚶"],["helped",""],["asked",""],["kicked","⚽"],["packed","🧳"]]},
    {say:"d (as in played)", key:"played", keyPic:"🎲", words:[["played","🎲"],["cleaned","🧹"],["called","📞"],["opened","📂"],["loved","❤️"],["rained","🌧️"]]},
    {say:"id (as in wanted)", key:"wanted", keyPic:"🙏", words:[["wanted","🙏"],["painted","🎨"],["planted","🌱"],["lifted","🏋️"],["melted","🫠"],["visited",""]]}]},
  {dg:"ar", intro:"The letters ar usually say 'ah', but after w they say 'or'.", sounds:[
    {say:"ah (as in car)", key:"car", keyPic:"🚗", words:[["car","🚗"],["star","⭐"],["farm","🚜"],["jar","🫙"],["park","🌳"],["shark","🦈"]]},
    {say:"or (as in war)", key:"war", keyPic:"⚔️", words:[["war",""],["warm","🔥"],["swarm","🐝"],["dwarf",""]]}]},
  {dg:"ear", intro:"The letters ear make three different sounds!", sounds:[
    {say:"eer (as in hear)", key:"hear", keyPic:"👂", words:[["ear","👂"],["hear",""],["near",""],["year","📅"],["dear",""]]},
    {say:"air (as in bear)", key:"bear", keyPic:"🐻", words:[["bear","🐻"],["pear","🍐"],["wear","👕"],["swear",""]]},
    {say:"er (as in earth)", key:"earth", keyPic:"🌍", words:[["earth","🌍"],["learn","📚"],["early","🌅"],["pearl",""],["heard","👂"]]}]}
);

/* ---- Chapter 4: Picture Quest, levels 6 to 10 ---- */
PICTURE_LEVELS.push(
  {name:"Vowel team words", items:[["train","🚂"],["plane","✈️"],["queen","👸"],["cloud","☁️"],["clown","🤡"],["goat","🐐"],["snow","❄️"],["mouse","🐭"],["bee","🐝"],["pie","🥧"],["boot","🥾"],["tray","🍽️"]]},
  {name:"Fruit and veg", items:[["orange","🍊"],["banana","🍌"],["apple","🍎"],["grapes","🍇"],["cherry","🍒"],["lemon","🍋"],["carrot","🥕"],["tomato","🍅"],["potato","🥔"],["corn","🌽"],["peach","🍑"],["melon","🍈"]]},
  {name:"Animals", items:[["tiger","🐯"],["zebra","🦓"],["lion","🦁"],["horse","🐴"],["camel","🐫"],["parrot","🦜"],["dolphin","🐬"],["shark","🦈"],["snake","🐍"],["koala","🐨"],["owl","🦉"],["penguin","🐧"]]},
  {name:"Things around us", items:[["window","🪟"],["castle","🏰"],["rocket","🚀"],["guitar","🎸"],["camera","📷"],["bicycle","🚲"],["tractor","🚜"],["balloon","🎈"],["candle","🕯️"],["magnet","🧲"],["bucket","🪣"],["ladder","🪜"]]},
  {name:"Tricky spelling", items:[["island","🏝️"],["ghost","👻"],["climb","🧗"],["write","✍️"],["wheel","🛞"],["whale","🐳"],["knot","🪢"],["lamb","🐑"],["sausage","🌭"],["pizza","🍕"],["sandwich","🥪"],["thumb","👍"]]}
);

/* ---- Chapter 5: Digraph Detective, levels 4 and 5 ---- */
DETECTIVE.push(
  {name:"silent letters: kn wr mb gh", items:[["kn","knee","🦵"],["kn","knot","🪢"],["kn","knock","🚪"],["wr","write","✍️"],["wr","wrap","🎁"],["wr","wrist","⌚"],["mb","lamb","🐑"],["mb","climb","🧗"],["mb","comb","💇"],["gh","ghost","👻"]]},
  {name:"blends: bl cl fl gr tr dr sn sp st", items:[["bl","blue","🔵"],["bl","blanket","🛏️"],["cl","clock","🕐"],["cl","cloud","☁️"],["fl","flag","🚩"],["fl","flower","🌸"],["gr","grapes","🍇"],["gr","green","🟢"],["tr","train","🚂"],["tr","tree","🌳"],["dr","drum","🥁"],["dr","dragon","🐉"],["sn","snail","🐌"],["sn","snake","🐍"],["sp","spider","🕷️"],["sp","spoon","🥄"],["st","star","⭐"],["st","stone","🪨"]]}
);

/* =============================================================
   NEW LEVELS, batch 2 (added after first play-test: she loved Picture Quest
   and Missing Letters, and Chapter 2 was too easy, so it now gets harder sounds)
   ============================================================= */

/* ---- Chapter 1: Missing Letters, levels 14 to 18 (3 blanks) ---- */
WORD_LEVELS.push(
  {name:"Question and place words", blanks:3, words:["because","every","people","water","would","could","should","where","there","their","these","those"]},
  {name:"Family and friends", blanks:3, words:["friend","brother","sister","mother","father","family","baby","uncle","cousin","neighbour","teacher","children"]},
  {name:"Year 2: busy words", blanks:3, words:["again","before","after","other","another","never","always","around","while","which","only","under"]},
  {name:"School and learning", blanks:3, words:["school","library","lesson","reading","writing","spelling","question","number","picture","playground","homework","beautiful"]},
  {name:"Big challenge words", blanks:3, words:["thought","enough","laugh","daughter","though","straight","weight","knowledge","exercise","separate","believe","guess"]}
);

/* ---- Chapter 2: Say the Sounds, groups 8 to 12 (digraphs and patterns) ---- */
SOUND_GROUPS[8] = [["ay","play","🎮"],["ow","cow","🐄"],["aw","paw","🐾"],["au","author","📖"],["ew","chew","😋"],["igh","night","🌙"],["oy","toy","🧸"],["ir","bird","🐦"]];
SOUND_GROUPS[9] = [["ur","turn","🔄"],["ph","phone","📱"],["wh","whale","🐳"],["a-e","cake","🎂"],["i-e","kite","🪁"],["o-e","home","🏠"],["u-e","cube","🧊"],["ea","sea","🌊"]];
SOUND_GROUPS[10] = [["tch","match","🔥"],["dge","bridge","🌉"],["ck","duck","🦆"],["ss","grass","🌱"],["ll","bell","🔔"],["ff","puff","💨"],["zz","buzz","🐝"],["ng","king","🤴"]];
SOUND_GROUPS[11] = [["ou","mouse","🐭"],["ow","snow","❄️"],["oo","moon","🌙"],["air","chair","🪑"],["ear","ear","👂"],["are","share","🤝"],["ore","more","➕"],["ure","pure","💧"]];
SOUND_GROUPS[12] = [["kn","knee","🦵"],["wr","wrap","🎁"],["mb","lamb","🐑"],["gh","ghost","👻"],["tion","station","🚉"],["ough","though","🤔"],["ci","special","🌟"],["ge","cage","🐦"]];

/* ---- Chapter 4: Picture Quest, levels 11 to 17 ---- */
PICTURE_LEVELS.push(
  {name:"Yummy food", items:[["pizza","🍕"],["burger","🍔"],["sandwich","🥪"],["pancake","🥞"],["cookie","🍪"],["cupcake","🧁"],["popcorn","🍿"],["cheese","🧀"],["honey","🍯"],["noodles","🍜"],["icecream","🍦"],["donut","🍩"]]},
  {name:"Weather and sky", items:[["rainbow","🌈"],["lightning","⚡"],["thunder","⛈️"],["tornado","🌪️"],["snowman","⛄"],["umbrella","☂️"],["sunshine","🌞"],["comet","☄️"],["planet","🪐"],["volcano","🌋"],["wave","🌊"],["feather","🪶"]]},
  {name:"At home", items:[["kitchen","🍳"],["bedroom","🛏️"],["sofa","🛋️"],["mirror","🪞"],["toilet","🚽"],["shower","🚿"],["lamp","💡"],["key","🔑"],["clock","🕐"],["scissors","✂️"],["broom","🧹"],["soap","🧼"]]},
  {name:"Clothes", items:[["shirt","👕"],["jeans","👖"],["dress","👗"],["jacket","🧥"],["scarf","🧣"],["gloves","🧤"],["socks","🧦"],["boots","🥾"],["sandal","👡"],["crown","👑"],["glasses","👓"],["backpack","🎒"]]},
  {name:"Out and about", items:[["bridge","🌉"],["airport","🛫"],["hospital","🏥"],["school","🏫"],["station","🚉"],["bakery","🥖"],["farm","🚜"],["beach","🏖️"],["mountain","⛰️"],["forest","🌲"],["desert","🏜️"],["fountain","⛲"]]},
  {name:"Sea and bugs", items:[["octopus","🐙"],["crab","🦀"],["turtle","🐢"],["jellyfish","🪼"],["whale","🐋"],["butterfly","🦋"],["ladybird","🐞"],["spider","🕷️"],["caterpillar","🐛"],["snail","🐌"],["scorpion","🦂"],["starfish","⭐"]]},
  {name:"Super tricky", items:[["rhinoceros","🦏"],["elephant","🐘"],["crocodile","🐊"],["skeleton","💀"],["telescope","🔭"],["microphone","🎤"],["calendar","📅"],["scooter","🛴"],["helicopter","🚁"],["ambulance","🚑"],["triangle","🔺"],["diamond","💎"]]}
);

/* =============================================================
   NEW LEVELS, batch 3: SPELLING RULES (FLOSS, soft c and g, tch, dge, le endings, tion)
   A level can have a  rule:"..."  line. It is shown to the child above the question.
   ============================================================= */
WORD_LEVELS.push(
  {name:"FLOSS rule: ff ll ss zz", blanks:2, rule:"FLOSS: after ONE short vowel at the end of a short word, we double f, l, s and z.", words:["puff","bell","miss","buzz","off","hill","doll","dress","grass","glass","class","fluff"]},
  {name:"tch and dge rule", blanks:3, rule:"After a short vowel we write tch and dge (match, bridge). After a long vowel or a consonant we write ch and ge.", words:["match","catch","patch","fetch","ditch","witch","bridge","badge","fudge","edge","hedge","judge"]},
  {name:"Soft c: ce ci cy", blanks:2, rule:"The letter c says 's' when e, i or y comes after it.", words:["city","face","race","nice","ice","mice","circle","pencil","dance","fancy","place","cycle"]},
  {name:"Soft g: ge gi gy", blanks:2, rule:"The letter g can say 'j' when e, i or y comes after it.", words:["giant","giraffe","gem","page","cage","gym","change","orange","huge","stage","ginger","magic"]},
  {name:"le endings: tle ble ple dle gle", blanks:3, rule:"Many words end in -le, and the sound before it often has a double letter or a consonant.", words:["little","table","apple","bottle","candle","puzzle","bubble","turtle","middle","giggle","castle","circle"]},
  {name:"tion and sion endings", blanks:3, rule:"The ending -tion says 'shun'. So does -sion in some words.", words:["station","action","mention","nation","vacation","question","addition","fiction","television","decision","invention","position"]}
);

/* ---- Chapter 2: soft c and g, le endings (group 13) ---- */
SOUND_GROUPS[13] = [["ce","ice","🧊"],["ci","city","🏙️"],["cy","fancy","🎩"],["gi","giant","🧌"],["ge","giraffe","🦒"],["gy","gym","🏋️"],["ble","table","🍽️"],["dle","candle","🕯️"]];

/* ---- Chapter 4: Picture Quest rule levels 18 to 21 ---- */
PICTURE_LEVELS.push(
  {name:"FLOSS words", rule:"FLOSS: we double f, l, s, z after one short vowel (bell, grass).", items:[["bell","🔔"],["doll","🪆"],["hill","⛰️"],["wall","🧱"],["grass","🌱"],["dress","👗"],["glass","🥛"],["cliff","🧗"],["puff","💨"],["buzz","🐝"],["kiss","💋"],["moss","🌿"]]},
  {name:"tch and dge words", rule:"After a short vowel we write tch and dge.", items:[["witch","🧙"],["match","🔥"],["patch","🧵"],["pitch","⚾"],["ditch","🕳️"],["bridge","🌉"],["badge","🏅"],["fudge","🍫"],["hedge","🌳"],["judge","👩‍⚖️"],["sketch","✏️"],["kitchen","🍳"]]},
  {name:"Soft c and soft g words", rule:"Soft c says 's' and soft g says 'j' before e, i or y.", items:[["city","🏙️"],["ice","🧊"],["mice","🐭"],["pencil","✏️"],["circle","⭕"],["bicycle","🚲"],["giraffe","🦒"],["giant","🧌"],["gem","💎"],["cage","🐦"],["gym","🏋️"],["orange","🍊"]]},
  {name:"le ending words", rule:"These words end in -le.", items:[["apple","🍎"],["table","🍽️"],["candle","🕯️"],["bottle","🍼"],["turtle","🐢"],["puzzle","🧩"],["bubble","🫧"],["castle","🏰"],["eagle","🦅"],["needle","🪡"],["whistle","🪈"],["bugle","📯"]]}
);

/* ---- Chapter 5: Digraph Detective rule levels 6 to 10 ---- */
DETECTIVE.push(
  {name:"FLOSS: ff ll ss zz", rule:"FLOSS: we double f, l, s, z after one short vowel.", items:[["ff","puff","💨"],["ff","cliff","🧗"],["ff","sniff","👃"],["ll","bell","🔔"],["ll","doll","🪆"],["ll","hill","⛰️"],["ss","grass","🌱"],["ss","dress","👗"],["ss","kiss","💋"],["zz","buzz","🐝"],["zz","fizz","🥤"],["zz","jazz","🎷"]]},
  {name:"tch ch dge ge", rule:"After a short vowel use tch or dge. After a long vowel or consonant use ch or ge.", items:[["tch","match","🔥"],["tch","witch","🧙"],["tch","patch","🧵"],["ch","lunch","🍱"],["ch","bench","🪑"],["ch","peach","🍑"],["dge","bridge","🌉"],["dge","badge","🏅"],["dge","fudge","🍫"],["ge","cage","🐦"],["ge","page","📄"],["ge","stage","🎭"]]},
  {name:"Soft c and soft g: ce ci cy ge gi gy", rule:"c says 's' and g says 'j' before e, i or y.", items:[["ce","face","🙂"],["ce","ice","🧊"],["ce","mice","🐭"],["ci","city","🏙️"],["ci","pencil","✏️"],["ci","circle","⭕"],["cy","fancy","🎩"],["cy","bicycle","🚲"],["ge","cage","🐦"],["ge","orange","🍊"],["gi","giant","🧌"],["gi","giraffe","🦒"],["gy","gym","🏋️"],["gy","energy","⚡"]]},
  {name:"le endings: tle ble ple dle gle zle", rule:"Words that end in -le: listen for the sound before it.", items:[["tle","turtle","🐢"],["tle","bottle","🍼"],["tle","castle","🏰"],["ble","table","🍽️"],["ble","bubble","🫧"],["ple","apple","🍎"],["ple","people",""],["dle","candle","🕯️"],["dle","needle","🪡"],["gle","giggle","🤭"],["gle","eagle","🦅"],["zle","puzzle","🧩"]]},
  {name:"tion sion ture ous", rule:"-tion says 'shun', -ture says 'cher'.", items:[["tion","station","🚉"],["tion","action","🎬"],["tion","vacation","🏖️"],["tion","question","❓"],["sion","television","📺"],["sion","vision","👁️"],["ture","picture","🖼️"],["ture","nature","🌿"],["ture","adventure","🗺️"],["ous","famous","🌟"],["ous","nervous","😬"],["ous","dangerous","⚠️"]]}
);
