/* =============================================================
   SETTINGS (edit these)
   ============================================================= */
const CONFIG = { parentPinHash: "3f22393f7b361cc0710798d27bb72c0b8e72094d3dce1d60ba26703ce1593d1b", questionsPerRound: 10, soundsPerRound: 8, dailyBonus: 30, allChaptersBonus: 50 };

/* =============================================================
   CHAPTER INFO
   ============================================================= */
const CH = {
  c1:{icon:"📘", name:"Missing Letters",   about:"Type the missing letters to finish each sight word.", max:WORD_LEVELS.length},
  c2:{icon:"🎤", name:"Say the Sounds",    about:"Look at the letters and say the sound out loud.",     max:Object.keys(SOUND_GROUPS).length},
  c3:{icon:"📗", name:"Digraph Lessons",   about:"Learn every sound a digraph can make, then spell the words.", max:LESSONS.length},
  c4:{icon:"🖼️", name:"Picture Quest",     about:"See the picture. Say the word, then spell it!",       max:PICTURE_LEVELS.length},
  c5:{icon:"🔍", name:"Digraph Detective", about:"Find the missing digraph in each word.",              max:DETECTIVE.length},
  c6:{icon:"🧪", name:"Digraph Daily Test", about:"A fresh mix of every digraph sound you have learned. Different every day!", max:1, daily:true},
  c8:{icon:"🚀", name:"Reading Rocket", about:"Read fun sentences and tiny stories, then answer a question!", max:READING.length},
  c7:{icon:"🔢", name:"Maths Magic", about:"Count, add, take away, shapes, time, money and more!", max:MATH_LEVELS.length},
  c9:{icon:"🕐", name:"Time Teller", about:"Learn to read the clock, plus days, months and seasons!", max:TIME_LEVELS.length},
  c10:{icon:"🌍", name:"Wonder World", about:"Fun facts about animals, our bodies, weather, Australia, space and more!", max:WONDER_LEVELS.length},
  c11:{icon:"🗺️", name:"Continents & Oceans", about:"Spot the seven continents by their shapes, then learn the oceans!", max:GEO_LEVELS.length},
  c12:{icon:"🧭", name:"Country Explorer", about:"Visit the countries of each continent: flags, capitals and fun facts!", max:COUNTRY_LEVELS.length},
  c13:{icon:"🌱", name:"Living World", about:"Life cycles, plants, animals, your five senses and the seasons!", max:SCI_LEVELS_LIVING.length},
  c14:{icon:"🔬", name:"Science Lab", about:"Pushes and pulls, magnets, light, sound, weather, space and rocks!", max:SCI_LEVELS_LAB.length}
};
const CHS = Object.keys(CH);

