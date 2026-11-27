/* =============================================================
   AVATAR PARTS AND SHOP
   ============================================================= */
const SKIN  = ["#ffe0c2","#f6c9a0","#e0a878","#c68642","#8d5524","#5c3a1e"];
const HAIRC = ["#2b1b10","#6b3f1d","#c8802d","#f2c94c","#d6406b","#3a7bd5","#9b5de5","#2ec4b6","#ff6fb5","#c7ccd6"];
const TOPC  = ["#ff6b9d","#4dabf7","#51cf66","#ffd43b","#9775fa","#ff922b","#2ec4b6","#e03131","#ffffff","#2b2d42"];
const BOTC  = ["#3b5bdb","#1c7ed6","#2b2d42","#ff6b9d","#9775fa","#51cf66","#ffd43b","#e8590c","#f1f3f5","#845ef7"];
const EYEC  = ["#5b3a1e","#2b1b10","#a8742c","#2e9e5b","#3a7bd5","#8d99ae","#9b5de5","#e0457b","#c98a0e","#1fa8a0"];
const SHOEC = ["#ffffff","#ff6b9d","#4dabf7","#2b2d42","#ffd43b","#9775fa"];
const HAIRS = [["short","Short"],["bob","Bob"],["long","Long"],["wavy","Wavy"],["bun","Top bun"],["spacebuns","Space buns"],["curly","Curly"],["afro","Afro puff"],["pigtails","Pigtails"],["ponytail","Ponytail"],["braid","Braid"],["puffs","Puffs"],["mohawk","Mohawk"],["none","Bald"]];
const EYES  = [["round","Round"],["sparkle","Sparkly"],["happy","Happy"],["lashes","Lashes"],["stars","Star eyes"],["hearts","Heart eyes"],["wink","Wink"],["sleepy","Sleepy"]];
const MOUTHS = [["smile","Smile"],["grin","Big grin"],["cat","Cat smile"],["tongue","Cheeky"]];
const TOPS = [["tee","T-shirt"],["long","Long sleeve"],["hoodie","Hoodie"],["tank","Tank top"]];
const BOTTOMS = [["shorts","Shorts"],["pants","Pants"],["skirt","Skirt"],["leggings","Leggings"]];
const DRESSES = [["none","No dress"],["twirl","Twirly dress"],["tutu","Tutu dress"],["party","Party dress"]];
/* Pet colour: the pet emoji is tinted with an SVG colour filter (null = its natural colours) */
const PET_COLORS = [{n:"Natural",c:null},{n:"Pink",c:"#ff7eb6"},{n:"Purple",c:"#9b5de5"},{n:"Blue",c:"#4ea8de"},{n:"Green",c:"#52b788"},{n:"Gold",c:"#ffc300"},{n:"Red",c:"#ef476f"},{n:"White",c:"#f7f7f7"},{n:"Black",c:"#4a4a4a"}];
const PET_SWATCH = PET_COLORS.map(x=>x.c || "linear-gradient(135deg,#ff7eb6,#ffc300,#52b788,#4ea8de)");
function petFilter(id, hex){
  const n = parseInt(hex.slice(1),16), r = (n>>16&255)/255, g = (n>>8&255)/255, b = (n&255)/255, k = 1.35, f = v=>v.toFixed(3);
  const row = c=>`${f(.3*c*k)} ${f(.59*c*k)} ${f(.11*c*k)} 0 0`;
  return `<defs><filter id="${id}" color-interpolation-filters="sRGB"><feColorMatrix in="SourceGraphic" type="matrix" values="${row(r)} ${row(g)} ${row(b)} 0 0 0 1 0" result="t"/><feComposite in="t" in2="SourceGraphic" operator="arithmetic" k1="0" k2="0.85" k3="0.15" k4="0"/></filter></defs>`;
}
const AV_DEFAULT = {eyeColor:0, skin:1, hair:"short", hairColor:1, eyes:"round", mouth:"smile", topStyle:"tee", top:1, bottomStyle:"shorts", bottom:1, dress:"none", shoes:0};

const SLOTS = {ears:"Ears & horns", hat:"Hats", hairacc:"Hair bits", glasses:"Glasses", earrings:"Earrings", face:"Face sparkle", costume:"Glam outfits", neck:"Necklaces & scarves", back:"Capes & wings", aura:"Sparkle effects", held:"Hold something", pet:"Pets", bg:"Avatar scenes", theme:"App themes"};
const TAB_SLOTS = {clothes:["costume"], head:["ears","hat","hairacc","glasses","earrings","face"], glam:["neck","back","aura","held"], fun:["pet","bg"], theme:["theme"]};
const CLOSET_TABS = [["look","Look"],["clothes","Clothes"],["head","Head & face"],["glam","Glam"],["fun","Pets & scenes"],["theme","App themes"]];

const ITEMS = [
  {id:"bg0", slot:"bg", name:"Sunny sky", icon:"☀️", cost:0, c:["#bfe6ff","#fff7c2"], deco:["☁️","⭐"]},
  {id:"bg1", slot:"bg", name:"Flower meadow", icon:"🌼", cost:60, c:["#d4f5c4","#9fe3a0"], deco:["🌼","🦋"]},
  {id:"bg6", slot:"bg", name:"Candy land", icon:"🍭", cost:110, c:["#ffd1e8","#fff0b3"], deco:["🍭","🍬"]},
  {id:"bg2", slot:"bg", name:"Sunny beach", icon:"🏖️", cost:140, c:["#a8e6ff","#ffe9a8"], deco:["🌴","🐚"]},
  {id:"bg3", slot:"bg", name:"Outer space", icon:"🚀", cost:260, c:["#1d1b4d","#5a3a99"], deco:["⭐","🪐"]},
  {id:"bg4", slot:"bg", name:"Under the sea", icon:"🐠", cost:380, c:["#59c9f0","#1f6fb2"], deco:["🐠","🫧"]},
  {id:"bg5", slot:"bg", name:"Rainbow castle", icon:"🏰", cost:520, c:["#ffd1f0","#c9b8ff"], deco:["🌈","💖"]},
  {id:"hc", slot:"ears", name:"Kitty ears", icon:"🐱", cost:55},
  {id:"he_bear", slot:"ears", name:"Bear ears", icon:"🐻", cost:70},
  {id:"hb", slot:"ears", name:"Bunny ears", icon:"🐰", cost:90},
  {id:"he_fox", slot:"ears", name:"Fox ears", icon:"🦊", cost:130},
  {id:"he_elf", slot:"ears", name:"Fairy ears", icon:"🧚", cost:180},
  {id:"hu", slot:"ears", name:"Unicorn horn", icon:"🦄", cost:280},
  {id:"h1", slot:"hat", name:"Cap", icon:"🧢", cost:25},
  {id:"h3", slot:"hat", name:"Sun hat", icon:"👒", cost:70},
  {id:"h4", slot:"hat", name:"Cowboy hat", icon:"🤠", cost:110},
  {id:"h5", slot:"hat", name:"Top hat", icon:"🎩", cost:170},
  {id:"h6", slot:"hat", name:"Graduation cap", icon:"🎓", cost:240},
  {id:"h7", slot:"hat", name:"Crown", icon:"👑", cost:350},
  {id:"ha1", slot:"hairacc", name:"Big bow", icon:"🎀", cost:30},
  {id:"ha2", slot:"hairacc", name:"Flower clip", icon:"🌸", cost:40},
  {id:"ha3", slot:"hairacc", name:"Star clips", icon:"⭐", cost:60},
  {id:"ha4", slot:"hairacc", name:"Butterfly clip", icon:"🦋", cost:90},
  {id:"ha5", slot:"hairacc", name:"Gold headband", icon:"✨", cost:150},
  {id:"g1", slot:"glasses", name:"Round glasses", icon:"👓", cost:35},
  {id:"g2", slot:"glasses", name:"Cool shades", icon:"🕶️", cost:90},
  {id:"g3", slot:"glasses", name:"Goggles", icon:"🥽", cost:200},
  {id:"e1", slot:"earrings", name:"Gold studs", icon:"🟡", cost:30},
  {id:"e3", slot:"earrings", name:"Heart earrings", icon:"❤️", cost:55},
  {id:"e4", slot:"earrings", name:"Star earrings", icon:"⭐", cost:75},
  {id:"e2", slot:"earrings", name:"Gold hoops", icon:"⭕", cost:120},
  {id:"f1", slot:"face", name:"Freckles", icon:"🟤", cost:20},
  {id:"f2", slot:"face", name:"Sparkle cheeks", icon:"✨", cost:40},
  {id:"f3", slot:"face", name:"Star sticker", icon:"⭐", cost:60},
  {id:"f4", slot:"face", name:"Heart cheeks", icon:"💖", cost:80},
  {id:"f5", slot:"face", name:"Face gems", icon:"💎", cost:140},
  {id:"f6", slot:"face", name:"Glitter", icon:"🌟", cost:200},
  {id:"o_hero", slot:"costume", name:"Hero suit", icon:"🦸", cost:160},
  {id:"o_disco", slot:"costume", name:"Disco sparkle dress", icon:"🪩", cost:240},
  {id:"o_astro", slot:"costume", name:"Astronaut suit", icon:"🧑‍🚀", cost:300},
  {id:"o_gown", slot:"costume", name:"Princess gown", icon:"👸", cost:420},
  {id:"o_mermaid", slot:"costume", name:"Mermaid tail", icon:"🧜‍♀️", cost:560},
  {id:"n3", slot:"neck", name:"Cosy scarf", icon:"🧣", cost:40},
  {id:"n2", slot:"neck", name:"Bow tie", icon:"🎀", cost:50},
  {id:"n4", slot:"neck", name:"Heart pendant", icon:"💖", cost:80},
  {id:"n1", slot:"neck", name:"Pearl necklace", icon:"🦪", cost:160},
  {id:"b1", slot:"back", name:"Red cape", icon:"🦸", cost:100},
  {id:"b2", slot:"back", name:"Butterfly wings", icon:"🦋", cost:230},
  {id:"b3", slot:"back", name:"Angel wings", icon:"👼", cost:420},
  {id:"b4", slot:"back", name:"Rainbow wings", icon:"🌈", cost:520},
  {id:"a1", slot:"aura", name:"Sparkles", icon:"✨", cost:90},
  {id:"a5", slot:"aura", name:"Bubbles", icon:"🫧", cost:130},
  {id:"a2", slot:"aura", name:"Floating hearts", icon:"💖", cost:200},
  {id:"a3", slot:"aura", name:"Shooting stars", icon:"🌠", cost:300},
  {id:"a4", slot:"aura", name:"Rainbow glow", icon:"🌈", cost:450},
  {id:"w1", slot:"held", name:"Flower", icon:"🌷", cost:20},
  {id:"w2", slot:"held", name:"Balloon", icon:"🎈", cost:45},
  {id:"w3", slot:"held", name:"Magic wand", icon:"🪄", cost:85},
  {id:"w4", slot:"held", name:"Ice cream", icon:"🍦", cost:120},
  {id:"w5", slot:"held", name:"Guitar", icon:"🎸", cost:190},
  {id:"w6", slot:"held", name:"Trophy", icon:"🏆", cost:320},
  {id:"p1", slot:"pet", name:"Puppy", icon:"🐶", cost:80},
  {id:"p2", slot:"pet", name:"Kitten", icon:"🐱", cost:80},
  {id:"p3", slot:"pet", name:"Bunny", icon:"🐰", cost:150},
  {id:"p6", slot:"pet", name:"Penguin", icon:"🐧", cost:190},
  {id:"p7", slot:"pet", name:"Fox", icon:"🦊", cost:220},
  {id:"p4", slot:"pet", name:"Unicorn", icon:"🦄", cost:320},
  {id:"p8", slot:"pet", name:"Panda", icon:"🐼", cost:380},
  {id:"p5", slot:"pet", name:"Dragon", icon:"🐉", cost:480},
  {id:"t0", slot:"theme", name:"Candy cloud", icon:"☁️", cost:0, bg:"linear-gradient(160deg,#ffd9ec,#d9ecff 55%,#fff3c4)", deco:["☁️","🎀","⭐","💖","🍭","🌸"]},
  {id:"t1", slot:"theme", name:"Rainbow sky", icon:"🌈", cost:120, bg:"linear-gradient(180deg,#a8e0ff,#e6d4ff 60%,#ffe0f1)", deco:["🌈","☁️","🦄","⭐","💫","🎈"]},
  {id:"t2", slot:"theme", name:"Sweet treats", icon:"🧁", cost:220, bg:"linear-gradient(160deg,#ffe0ec,#fff1c9 60%,#ffd9f3)", deco:["🧁","🍩","🍭","🍓","🍪","🍦"]},
  {id:"t3", slot:"theme", name:"Magic forest", icon:"🍄", cost:320, bg:"linear-gradient(160deg,#d8f5d0,#c9ecff 60%,#f4e3ff)", deco:["🍄","🦋","🌳","🐞","🌼","🦉"]},
  {id:"t4", slot:"theme", name:"Under the sea", icon:"🐠", cost:430, bg:"linear-gradient(180deg,#bff1ff,#7fd0ee 70%,#5fb0e0)", deco:["🐠","🐙","🐚","🫧","🐬","🦀"]},
  {id:"t5", slot:"theme", name:"Space adventure", icon:"🚀", cost:560, bg:"linear-gradient(160deg,#cdbbff,#9fb4ff 60%,#ffd1f0)", deco:["🚀","🪐","⭐","🌙","👽","☄️"]}
];
const item = id => ITEMS.find(i=>i.id===id);

function darker(hex, amt=45){
  const n = parseInt(hex.slice(1),16);
  const r = Math.max(0,(n>>16)-amt), g = Math.max(0,((n>>8)&255)-amt), b = Math.max(0,(n&255)-amt);
  return `rgb(${r},${g},${b})`;
}
const T = (x,y,size,ch,extra="") => `<text x="${x}" y="${y}" font-size="${size}" text-anchor="middle" ${extra}>${ch}</text>`;

function avatarSVG(p, size=190, mood="happy"){
  const a = Object.assign({}, AV_DEFAULT, p.avatar), eq = p.equipped || {};
  const bg = item(eq.bg || "bg0") || item("bg0");
  const small = size < 80;
  const vb = small ? [52,30,116,124] : [0,0,220,320];
  const gid = "g" + Math.random().toString(36).slice(2,8);
  const eyeC = EYEC[a.eyeColor] || EYEC[0], skin = SKIN[a.skin] || SKIN[1], hc = HAIRC[a.hairColor] || HAIRC[1];
  let top = TOPC[a.top] || TOPC[1], bot = BOTC[a.bottom] || BOTC[0], shoe = SHOEC[a.shoes] || SHOEC[0];
  let topStyle = a.topStyle, bottomStyle = a.bottomStyle, dress = a.dress;
  const cs = eq.costume, fullCos = ["o_gown","o_disco","o_mermaid"].includes(cs);
  if(cs==="o_hero"){ top="#e03131"; bot="#1c7ed6"; topStyle="long"; bottomStyle="pants"; dress="none"; shoe="#2b2d42"; }
  if(cs==="o_astro"){ top="#f1f3f5"; bot="#f1f3f5"; topStyle="long"; bottomStyle="pants"; dress="none"; shoe="#adb5bd"; }
  if(fullCos) dress = "none";
  const H = Math.round(size*vb[3]/vb[2]);
  let s = `<svg class="avsvg ${size>=150?"bob":""}" viewBox="${vb.join(" ")}" width="${size}" height="${H}" style="border-radius:${small?18:28}px;max-width:100%">
    <defs><linearGradient id="${gid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${bg.c[0]}"/><stop offset="1" stop-color="${bg.c[1]}"/></linearGradient><radialGradient id="${gid}s" cx=".38" cy=".32" r=".8"><stop offset="0" stop-color="${skin}"/><stop offset=".7" stop-color="${skin}"/><stop offset="1" stop-color="${darker(skin,22)}"/></radialGradient><radialGradient id="${gid}i" cx=".5" cy=".35" r=".7"><stop offset="0" stop-color="${eyeC}"/><stop offset="1" stop-color="${darker(eyeC,55)}"/></radialGradient></defs>
    <rect width="220" height="320" fill="url(#${gid})"/>`;
  if(!small){
    s += `<ellipse cx="110" cy="310" rx="62" ry="8" fill="#000" opacity=".1"/>`;
    const dp = [[26,60],[196,76],[24,170],[198,186],[30,262],[192,260]];
    s += (bg.deco||[]).concat(bg.deco||[],bg.deco||[]).slice(0,6).map((d,i)=>T(dp[i][0],dp[i][1],24,d,'opacity=".85"')).join("");
    // aura
    const AP = [[28,60],[194,64],[20,150],[202,170],[34,250],[188,246],[110,20],[62,30],[160,36],[14,210],[206,120]];
    const auraIcon = {a1:"✨", a2:"💖", a3:"🌠", a5:"🫧"};
    if(auraIcon[eq.aura]) s += AP.map(([x,y],i)=>T(x,y,i%3?20:28,auraIcon[eq.aura],'opacity=".95"')).join("");
    if(eq.aura==="a4") s += ["#ff6b6b","#ffa94d","#ffd43b","#69db7c","#4dabf7","#9775fa"].map((c,i)=>`<circle cx="110" cy="176" r="${128-i*7}" fill="none" stroke="${c}" stroke-width="6" opacity=".55"/>`).join("");
  }
  // back items
  if(eq.back==="b1") s += `<path d="M72 154 Q110 146 148 154 L186 306 L34 306 Z" fill="#e03131"/><path d="M72 154 Q110 146 148 154 L152 190 Q110 178 68 190Z" fill="#ff6b6b"/>`;
  if(eq.back==="b2") s += `<ellipse cx="52" cy="186" rx="40" ry="62" fill="#ff8fd0" stroke="#c2338f" stroke-width="3" transform="rotate(24 52 186)"/><ellipse cx="168" cy="186" rx="40" ry="62" fill="#8fd0ff" stroke="#2b72b8" stroke-width="3" transform="rotate(-24 168 186)"/><circle cx="46" cy="178" r="10" fill="#fff" opacity=".7"/><circle cx="174" cy="178" r="10" fill="#fff" opacity=".7"/>`;
  if(eq.back==="b3") s += `<ellipse cx="50" cy="186" rx="38" ry="66" fill="#fff" stroke="#cbd5e1" stroke-width="3" transform="rotate(22 50 186)"/><ellipse cx="170" cy="186" rx="38" ry="66" fill="#fff" stroke="#cbd5e1" stroke-width="3" transform="rotate(-22 170 186)"/>`;
  if(eq.back==="b4") s += ["#ff6b6b","#ffd43b","#51cf66","#4dabf7","#9775fa"].map((c,i)=>`<ellipse cx="52" cy="186" rx="${42-i*6}" ry="${66-i*8}" fill="${c}" transform="rotate(24 52 186)"/><ellipse cx="168" cy="186" rx="${42-i*6}" ry="${66-i*8}" fill="${c}" transform="rotate(-24 168 186)"/>`).join("");
  // hair behind head
  if(a.hair==="bob") s += `<rect x="58" y="68" width="104" height="84" rx="34" fill="${hc}"/>`;
  if(a.hair==="long") s += `<rect x="56" y="66" width="108" height="150" rx="46" fill="${hc}"/>`;
  if(a.hair==="wavy") s += `<path d="M56 92 Q50 140 66 172 Q54 198 74 218 L146 218 Q166 198 154 172 Q170 140 164 92Z" fill="${hc}"/>`;
  if(a.hair==="afro") s += `<circle cx="110" cy="92" r="68" fill="${hc}"/>`;
  if(a.hair==="pigtails") s += `<circle cx="52" cy="134" r="22" fill="${hc}"/><circle cx="168" cy="134" r="22" fill="${hc}"/>`;
  if(a.hair==="ponytail") s += `<ellipse cx="172" cy="130" rx="14" ry="36" fill="${hc}" transform="rotate(-20 172 130)"/>`;
  // legs, bottoms
  const legs = !(cs==="o_mermaid" || cs==="o_gown");
  if(legs){
    s += `<rect x="88" y="232" width="18" height="64" rx="8" fill="${skin}"/><rect x="114" y="232" width="18" height="64" rx="8" fill="${skin}"/>`;
    if(bottomStyle==="leggings" && dress==="none" && !fullCos) s += `<rect x="87" y="228" width="20" height="68" rx="9" fill="${bot}"/><rect x="113" y="228" width="20" height="68" rx="9" fill="${bot}"/>`;
    s += `<ellipse cx="97" cy="302" rx="17" ry="9" fill="${shoe}" stroke="#0002"/><ellipse cx="123" cy="302" rx="17" ry="9" fill="${shoe}" stroke="#0002"/><ellipse cx="92" cy="299" rx="7" ry="2.5" fill="#fff" opacity=".4"/><ellipse cx="118" cy="299" rx="7" ry="2.5" fill="#fff" opacity=".4"/>`;
  }
  if(dress==="none" && !fullCos){
    if(bottomStyle==="shorts") s += `<rect x="82" y="224" width="27" height="40" rx="9" fill="${bot}"/><rect x="111" y="224" width="27" height="40" rx="9" fill="${bot}"/>`;
    if(bottomStyle==="pants") s += `<rect x="82" y="224" width="27" height="74" rx="9" fill="${bot}"/><rect x="111" y="224" width="27" height="74" rx="9" fill="${bot}"/>`;
    if(bottomStyle==="skirt") s += `<path d="M80 224 L140 224 L158 272 L62 272Z" fill="${bot}"/><path d="M62 272 Q110 282 158 272" stroke="#fff" stroke-width="3" fill="none" opacity=".6"/>`;
  }
  if(cs==="o_mermaid") s += `<path d="M84 226 Q110 214 136 226 Q148 270 122 296 Q152 300 170 288 L172 312 Q132 322 110 302 Q88 322 48 312 L50 288 Q68 300 98 296 Q72 270 84 226Z" fill="#2ec4b6" stroke="#1a9e92" stroke-width="3"/><path d="M96 246 Q110 256 124 246 M92 266 Q110 278 128 266" stroke="#7ee8dc" stroke-width="3" fill="none"/>`;
  // torso / dress
  const sleeveless = (dress!=="none") || cs==="o_disco" || cs==="o_mermaid" || (topStyle==="tank" && !cs);
  const armCol = sleeveless ? skin : top;
  // arms (skin first)
  s += `<rect x="58" y="160" width="20" height="72" rx="10" fill="${skin}"/><rect x="142" y="160" width="20" height="72" rx="10" fill="${skin}"/>`;
  if(cs==="o_gown") s += `<path d="M78 156 Q110 148 142 156 L146 202 Q198 252 208 308 L12 308 Q22 252 74 202Z" fill="#ff8fd0"/><path d="M12 308 Q110 290 208 308" stroke="#fff" stroke-width="5" fill="none" opacity=".6"/><rect x="76" y="196" width="68" height="8" fill="#ffd43b"/>${[[50,270],[80,250],[140,262],[170,282],[110,284],[60,296],[160,246]].map(([x,y])=>T(x,y,16,"✨")).join("")}<circle cx="70" cy="164" r="15" fill="#ff8fd0"/><circle cx="150" cy="164" r="15" fill="#ff8fd0"/>`;
  else if(cs==="o_disco") s += `<path d="M80 156 Q110 150 140 156 L138 196 L168 268 Q110 280 52 268 L82 196Z" fill="#a29bfe"/>${[[92,180],[128,176],[76,246],[110,250],[146,244],[104,214],[124,226]].map(([x,y])=>T(x,y,14,"✨")).join("")}`;
  else if(dress==="twirl") s += `<path d="M82 156 Q110 150 138 156 L136 204 L172 284 Q110 296 48 284 L84 204Z" fill="${top}"/><path d="M48 284 Q110 296 172 284" stroke="#fff" stroke-width="4" fill="none" opacity=".7"/>`;
  else if(dress==="party") s += `<path d="M82 156 Q110 150 138 156 L136 204 L172 284 Q110 296 48 284 L84 204Z" fill="${top}"/>${[[96,226],[124,240],[84,262],[110,274],[146,262],[132,214],[100,200]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="5" fill="#fff" opacity=".8"/>`).join("")}<rect x="82" y="190" width="56" height="9" fill="${bot}"/>`;
  else if(dress==="tutu") s += `<rect x="80" y="152" width="60" height="64" rx="20" fill="${top}"/><ellipse cx="110" cy="240" rx="66" ry="18" fill="${bot}" opacity=".65"/><ellipse cx="110" cy="232" rx="62" ry="18" fill="${bot}" opacity=".8"/><ellipse cx="110" cy="224" rx="56" ry="16" fill="${bot}"/><rect x="80" y="206" width="60" height="9" fill="#fff" opacity=".7"/>`;
  else if(cs==="o_mermaid") s += `<rect x="80" y="152" width="60" height="78" rx="22" fill="${skin}"/><circle cx="98" cy="176" r="13" fill="#ff8fd0" stroke="#c2338f" stroke-width="2"/><circle cx="122" cy="176" r="13" fill="#ff8fd0" stroke="#c2338f" stroke-width="2"/>`;
  else {
    s += `<rect x="78" y="150" width="64" height="86" rx="26" fill="${top}"/>`;
    if(topStyle==="tank") s += `<rect x="86" y="146" width="12" height="20" fill="${top}"/><rect x="122" y="146" width="12" height="20" fill="${top}"/>`;
    if(topStyle==="tee") s += `<rect x="56" y="156" width="24" height="30" rx="10" fill="${top}"/><rect x="140" y="156" width="24" height="30" rx="10" fill="${top}"/>${T(110,200,26,"⭐")}`;
    if(topStyle==="long" || topStyle==="hoodie") s += `<rect x="56" y="156" width="24" height="72" rx="11" fill="${top}"/><rect x="140" y="156" width="24" height="72" rx="11" fill="${top}"/>`;
    if(topStyle==="hoodie") s += `<path d="M82 150 Q110 176 138 150 L138 162 Q110 190 82 162Z" fill="${darker(top)}"/><path d="M84 202 Q110 192 136 202 L136 226 Q110 234 84 226Z" fill="${darker(top,25)}"/><line x1="102" y1="170" x2="102" y2="190" stroke="#fff" stroke-width="3"/><line x1="118" y1="170" x2="118" y2="190" stroke="#fff" stroke-width="3"/>`;
    if(cs==="o_hero") s += `<rect x="78" y="216" width="64" height="11" fill="#ffd43b"/><polygon points="110,164 117,182 136,182 121,193 127,212 110,200 93,212 99,193 84,182 103,182" fill="#ffd43b" stroke="#e0a800" stroke-width="2"/>`;
    if(cs==="o_astro") s += `<rect x="78" y="196" width="64" height="9" fill="#ff922b"/><circle cx="110" cy="176" r="13" fill="#4dabf7" stroke="#fff" stroke-width="3"/>${T(110,226,20,"🚀")}<rect x="56" y="196" width="24" height="9" fill="#ff922b"/><rect x="140" y="196" width="24" height="9" fill="#ff922b"/>`;
  }
  // hands
  s += `<circle cx="68" cy="236" r="10" fill="${skin}"/><circle cx="152" cy="236" r="10" fill="${skin}"/>`;
  // braid over shoulder
  if(a.hair==="braid") s += [0,1,2,3,4,5].map(i=>`<ellipse cx="${152+(i%2?3:-3)}" cy="${150+i*17}" rx="11" ry="12" fill="${hc}"/>`).join("") + `<circle cx="152" cy="252" r="6" fill="#ff7eb6"/>`;
  // neck, ears, head
  s += `<rect x="100" y="138" width="20" height="22" fill="${skin}"/>`;
  if(eq.neck==="n3") s += `<path d="M86 152 Q110 170 134 152 L134 166 Q110 184 86 166Z" fill="#ff922b"/><rect x="118" y="166" width="14" height="38" rx="5" fill="#ff922b"/>`;
  if(eq.neck==="n2") s += `<path d="M110 162 L90 150 L90 174Z M110 162 L130 150 L130 174Z" fill="#e03131"/><circle cx="110" cy="162" r="5" fill="#a51111"/>`;
  if(eq.neck==="n1") s += Array.from({length:9},(_,i)=>{ const th=Math.PI*i/8; return `<circle cx="${110-24*Math.cos(th)}" cy="${150+18*Math.sin(th)}" r="3.6" fill="#fff" stroke="#d6d6d6"/>`; }).join("");
  if(eq.neck==="n4") s += `<path d="M90 150 Q110 184 130 150" stroke="#ffd43b" stroke-width="2" fill="none"/>${T(110,184,20,"💖")}`;
  s += `<ellipse cx="110" cy="148" rx="26" ry="8" fill="#000" opacity=".1"/><circle cx="64" cy="108" r="9" fill="${skin}"/><circle cx="64" cy="108" r="4.5" fill="#ff8fa3" opacity=".35"/><circle cx="156" cy="108" r="9" fill="${skin}"/><circle cx="156" cy="108" r="4.5" fill="#ff8fa3" opacity=".35"/><circle cx="110" cy="100" r="46" fill="url(#${gid}s)"/><ellipse cx="94" cy="72" rx="16" ry="7" fill="#fff" opacity=".14"/>`;
  // hair front
  const cap = `<path d="M62 100 Q60 50 110 48 Q160 50 158 100 Q140 74 110 76 Q80 74 62 100Z" fill="${hc}"/>`;
  if(["short","bob","long","wavy","bun","spacebuns","afro","pigtails","ponytail","braid","puffs"].includes(a.hair)) s += cap + `<path d="M76 70 Q94 56 120 58" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round" opacity=".28"/>`;
  if(a.hair==="bun") s += `<circle cx="110" cy="40" r="20" fill="${hc}"/>`;
  if(a.hair==="spacebuns") s += `<circle cx="72" cy="56" r="18" fill="${hc}"/><circle cx="148" cy="56" r="18" fill="${hc}"/>`;
  if(a.hair==="puffs") s += `<circle cx="68" cy="58" r="22" fill="${hc}"/><circle cx="152" cy="58" r="22" fill="${hc}"/>`;
  if(a.hair==="curly") s += [66,84,102,120,138,154].map(x=>`<circle cx="${x}" cy="62" r="18" fill="${hc}"/>`).join("") + `<circle cx="60" cy="94" r="13" fill="${hc}"/><circle cx="160" cy="94" r="13" fill="${hc}"/>`;
  if(a.hair==="mohawk") s += `<path d="M94 58 Q110 -4 126 58Z" fill="${hc}"/>`;
  if(a.hair==="pigtails") s += `<circle cx="64" cy="114" r="5" fill="#ff7eb6"/><circle cx="156" cy="114" r="5" fill="#ff7eb6"/>`;
  if(a.hair==="ponytail") s += `<circle cx="158" cy="86" r="5" fill="#ff7eb6"/>`;
  // ears / horns
  if(eq.ears==="hc") s += `<path d="M70 72 L66 22 L102 54Z" fill="${hc}"/><path d="M150 72 L154 22 L118 54Z" fill="${hc}"/><path d="M73 62 L72 36 L92 54Z" fill="#ffb3d1"/><path d="M147 62 L148 36 L128 54Z" fill="#ffb3d1"/>`;
  if(eq.ears==="hb") s += `<ellipse cx="86" cy="24" rx="13" ry="38" fill="${hc}" transform="rotate(-8 86 24)"/><ellipse cx="134" cy="24" rx="13" ry="38" fill="${hc}" transform="rotate(8 134 24)"/><ellipse cx="86" cy="26" rx="6" ry="26" fill="#ffb3d1" transform="rotate(-8 86 26)"/><ellipse cx="134" cy="26" rx="6" ry="26" fill="#ffb3d1" transform="rotate(8 134 26)"/>`;
  if(eq.ears==="he_bear") s += `<circle cx="74" cy="62" r="18" fill="${hc}"/><circle cx="146" cy="62" r="18" fill="${hc}"/><circle cx="74" cy="62" r="9" fill="#ffb3d1"/><circle cx="146" cy="62" r="9" fill="#ffb3d1"/>`;
  if(eq.ears==="he_fox") s += `<path d="M68 74 L60 22 L104 56Z" fill="#ff922b"/><path d="M152 74 L160 22 L116 56Z" fill="#ff922b"/><path d="M64 46 L60 22 L80 38Z" fill="#fff"/><path d="M156 46 L160 22 L140 38Z" fill="#fff"/>`;
  if(eq.ears==="he_elf") s += `<path d="M64 98 L30 80 L64 120Z" fill="${skin}" stroke="#0001"/><path d="M156 98 L190 80 L156 120Z" fill="${skin}" stroke="#0001"/>`;
  if(eq.ears==="hu") s += `<path d="M110 -2 L94 56 L126 56Z" fill="#ffd54f" stroke="#e0a800" stroke-width="2"/><path d="M104 22 L117 27 M100 38 L120 43" stroke="#e0a800" stroke-width="3"/>`;
  // eyes
  const exs = [94,126], ey = 102;
  const E = a.eyes;
  const eyeX = (x, r, lash, i)=>{
    const sx = i?1:-1;
    let o = `<ellipse cx="${x}" cy="${ey}" rx="${r*1.3}" ry="${r*1.12}" fill="#fff"/><circle cx="${x}" cy="${ey}" r="${r}" fill="url(#${gid}i)"/><circle cx="${x}" cy="${ey}" r="${r*0.5}" fill="#111"/><circle cx="${x+r*0.32}" cy="${ey-r*0.38}" r="${r*0.3}" fill="#fff"/><circle cx="${x-r*0.3}" cy="${ey+r*0.4}" r="${r*0.14}" fill="#fff" opacity=".85"/><path d="M${x-r*1.35} ${ey-r*0.1} Q${x} ${ey-r*1.55} ${x+r*1.35} ${ey-r*0.1}" stroke="#2a1a14" stroke-width="2.6" fill="none" stroke-linecap="round"/>`;
    if(lash) o += `<path d="M${x+sx*r*1.2} ${ey-r*0.6} L${x+sx*r*1.9} ${ey-r*1.25} M${x+sx*r*0.7} ${ey-r*1.05} L${x+sx*r*1.1} ${ey-r*1.9} M${x+sx*r*0.1} ${ey-r*1.3} L${x+sx*r*0.15} ${ey-r*2.05}" stroke="#2a1a14" stroke-width="2.4" stroke-linecap="round"/>`;
    return o;
  };
  if(E==="round") s += exs.map((x,i)=>eyeX(x,7,false,i)).join("");
  if(E==="sparkle") s += exs.map((x,i)=>eyeX(x,10,true,i)+`<circle cx="${x-3}" cy="${ey-4}" r="1.6" fill="#fff"/>`).join("");
  if(E==="happy") s += exs.map(x=>`<path d="M${x-10} ${ey+4} Q${x} ${ey-10} ${x+10} ${ey+4}" stroke="#2a1a14" stroke-width="4" fill="none" stroke-linecap="round"/>`).join("");
  if(E==="lashes") s += exs.map((x,i)=>eyeX(x,7.5,true,i)).join("");
  if(E==="stars") s += exs.map(x=>T(x,ey+9,26,"⭐")).join("");
  if(E==="hearts") s += exs.map(x=>T(x,ey+9,26,"💗")).join("");
  if(E==="wink") s += eyeX(94,7,true,0) + `<path d="M116 ${ey+3} Q126 ${ey-9} 136 ${ey+3}" stroke="#2a1a14" stroke-width="4" fill="none" stroke-linecap="round"/>`;
  if(E==="sleepy") s += exs.map(x=>`<path d="M${x-10} ${ey-2} Q${x} ${ey+9} ${x+10} ${ey-2}" stroke="#222" stroke-width="4" fill="none" stroke-linecap="round"/>`).join("");
  const browC = darker(hc,10);
  if(!['stars','hearts'].includes(E)) s += `<path d="M82 ${ey-17} Q94 ${ey-23} 106 ${ey-17}" stroke="${browC}" stroke-width="3.4" fill="none" stroke-linecap="round"/><path d="M114 ${ey-17} Q126 ${ey-23} 138 ${ey-17}" stroke="${browC}" stroke-width="3.4" fill="none" stroke-linecap="round"/>`;
  s += `<path d="M107 113 Q110 118 114 113" stroke="${darker(skin,38)}" stroke-width="2.2" fill="none" stroke-linecap="round" opacity=".7"/>`;
  s += `<circle cx="78" cy="118" r="8" fill="#ff7b9c" opacity=".35"/><circle cx="142" cy="118" r="8" fill="#ff7b9c" opacity=".35"/>`;
  // mouth
  const M = a.mouth;
  if(mood==="cheer") s += `<path d="M92 120 Q110 150 128 120 Z" fill="#c2185b" stroke="#7d1230" stroke-width="3" stroke-linejoin="round"/><path d="M100 134 Q110 144 120 134 Q110 128 100 134Z" fill="#ff8fa3"/>`;
  else if(mood==="oops") s += `<ellipse cx="110" cy="128" rx="6" ry="8" fill="#c2185b" stroke="#7d1230" stroke-width="3"/>`;
  else if(M==="grin") s += `<path d="M92 120 Q110 142 128 120Z" fill="#fff" stroke="#a3213f" stroke-width="3.5" stroke-linejoin="round"/>`;
  else if(M==="cat") s += `<path d="M96 122 Q103 132 110 122 Q117 132 124 122" stroke="#a3213f" stroke-width="3.5" fill="none" stroke-linecap="round"/>`;
  else if(M==="tongue") s += `<path d="M94 121 Q110 138 126 121" stroke="#a3213f" stroke-width="3.5" fill="none" stroke-linecap="round"/><path d="M104 130 Q110 144 116 130Z" fill="#ff7b9c" stroke="#a3213f" stroke-width="2"/>`;
  else s += `<path d="M94 121 Q110 138 126 121" stroke="#a3213f" stroke-width="4.5" fill="none" stroke-linecap="round"/><path d="M102 127 Q110 131 118 127" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round" opacity=".55"/>`;
  // face extras
  if(eq.face==="f1") s += [[82,114],[90,118],[76,119],[138,114],[130,118],[144,119]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="2" fill="#a0522d"/>`).join("");
  if(eq.face==="f2") s += T(74,126,20,"✨")+T(146,126,20,"✨");
  if(eq.face==="f3") s += T(148,124,20,"⭐");
  if(eq.face==="f4") s += T(74,128,19,"💖")+T(146,128,19,"💖");
  if(eq.face==="f5") s += T(78,96,14,"💎")+T(142,96,14,"💎")+T(110,86,13,"💎");
  if(eq.face==="f6") s += [[80,92],[140,92],[110,134],[70,112],[150,112],[96,86],[124,86]].map(([x,y])=>T(x,y,11,"✨")).join("");
  // earrings
  if(eq.earrings==="e1") s += `<circle cx="62" cy="120" r="4.5" fill="#ffd43b"/><circle cx="158" cy="120" r="4.5" fill="#ffd43b"/>`;
  if(eq.earrings==="e2") s += `<circle cx="62" cy="128" r="8" fill="none" stroke="#ffd43b" stroke-width="3"/><circle cx="158" cy="128" r="8" fill="none" stroke="#ffd43b" stroke-width="3"/>`;
  if(eq.earrings==="e3") s += T(62,130,15,"❤️")+T(158,130,15,"❤️");
  if(eq.earrings==="e4") s += T(62,130,15,"⭐")+T(158,130,15,"⭐");
  // hair bits, glasses, hat
  const hb = eq.hairacc;
  if(hb==="ha1") s += T(152,62,40,"🎀");
  if(hb==="ha2") s += T(72,66,32,"🌸");
  if(hb==="ha3") s += T(72,66,22,"⭐")+T(148,66,22,"⭐");
  if(hb==="ha4") s += T(150,64,32,"🦋");
  if(hb==="ha5") s += `<path d="M62 92 Q110 38 158 92" stroke="#ffd43b" stroke-width="8" fill="none" stroke-linecap="round"/>${T(110,52,14,"✨")}`;
  const gl = eq.glasses && item(eq.glasses), ht = eq.hat && item(eq.hat), pt = eq.pet && item(eq.pet), hd = eq.held && item(eq.held);
  if(gl) s += T(110,114,58,gl.icon);
  if(ht) s += T(110,68,70,ht.icon);
  if(hd && !small) s += T(174,256,48,hd.icon);
  if(pt && !small){ const pc = PET_COLORS[a.petColor|0]; if(pc && pc.c){ s += petFilter(gid+"pc", pc.c) + T(36,304,56,pt.icon,`filter="url(#${gid}pc)"`); } else s += T(36,304,56,pt.icon); }
  return s + `</svg>`;
}

