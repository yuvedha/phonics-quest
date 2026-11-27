# Little Explorers Quest (the phonics chapters are the first subject)

A fun phonics game for early readers: sight words, digraph lessons, picture quests,
daily levels, and a dress-up avatar earned with points.

## Files
- `index.html`: the page shell. `style.css` is the look, `js/` is the app code in the order it loads (config, avatar-data, storage, helpers, screens, ch-phonics, ch-generated, ch-reading, ch-picture, grownup, start). `content/` is all the learning content and question generators.
- `tests/` and `.github/workflows/test.yml`: automatic tests (see Testing below)
- `content/content.js`: all the phonics lessons and levels. Add new levels at the END of the lists (the other subjects live in `content/maths.js`, `reading.js`, `gk.js`, `geo.js`, `science.js`)
  in the "NEW LEVELS" section so progress is not disturbed.

## Progress
Progress is saved in the browser on each device, not in this repo. Use
Grown-up corner > "Save a backup file" to keep a copy. The home screen
reminds you once a week.

## Where progress is kept
- Progress lives in the browser (localStorage) and, once a grown-up chooses an auto-save file in the Grown-up corner (Chrome or Edge), it is also written to that file automatically after every change. Use "Restore from my auto-save file" on a fresh browser.
- The grown-up PIN is stored only as a salted hash (`CONFIG.parentPinHash`). To change it, run `pinHash("newpin")` in the browser console and paste the result in.

## Rule levels
Levels can carry a `rule:"..."` line that is shown to the child (FLOSS, soft c and g, tch/dge, -le, -tion).
- **Digraph Daily Test** (Chapter 6): each day revisits the sounds from completed Chapter 3 lessons, picking those tested least recently or found hard.
- **Maths Magic** (Chapter 7): Year 1 and 2 maths in `content/maths.js`, with questions generated fresh each time (counting, add and take away, number bonds, skip counting, place value, shapes, time, money, fractions, patterns, word problems). Add levels at the END of `MATH_LEVELS`.
- **Cloud progress** (optional): follow `SETUP-CLOUD.md`, then fill in `cloud-config.js`. `cloud.js` talks to Firebase only when configured.
- **Installable app**: `manifest.webmanifest`, `sw.js` and `icons/` make it installable and playable offline. If you add new files, add them to FILES in sw.js.
- **Reading Rocket** (Chapter 8, under Phonics): decodable sentences and mini stories in `content/reading.js`, 12 levels matched to the phonics so far. Add levels at the END of `READING`.
- **General Knowledge** (own subject on the home screen): `content/gk.js` holds **Time Teller** (Chapter 9, 12 levels: clocks, o'clock to five-minute times, how long, days/months/seasons; generators in `TIME_GEN`, levels in `TIME_LEVELS`) and **Wonder World** (Chapter 10, 11 levels of fun facts from the `FACTS` bank; add a fact as `[question, answer, "wrong|wrong"-as-array, emoji]`). Add new levels at the END of each list. Both chapters (and Science) also have skippable "Let's learn first" pages (`learn` on each level; see the end of `content/gk.js` and `content/science.js`).
- **Geography** (own subject): `content/geo.js` holds **Continents & Oceans** (Chapter 11: continent shapes, world map, blank map quiz, oceans) and **Country Explorer** (Chapter 12: a level per continent, then one level per country). Map outlines are coarse polygons in `CONTS` (lon/lat). To add a country, append a row to `COUNTRIES` (id, name, flag, capital, lon, lat, continent, facts); it gets its own level at the end of the list. Every Geography level starts with a skippable "Let's learn first" tutorial (`learn` pages on the level, built in `content/geo.js`; any level in `genChapter` can have a `learn` array).
- **Science** (own subject, NSW Science and Technology K-6 Stage 1): `content/science.js` holds **Living World** (Chapter 13, 8 levels) and **Science Lab** (Chapter 14, 11 levels). Fact banks live in `SCI` as `[question, answer, [wrong, wrong], emoji]`; add levels at the END of `SCI_LEVELS_LIVING` / `SCI_LEVELS_LAB`.


## Testing
Run `npm install` once, then:
- `npm run lint`: checks every lesson, word list, fact bank and question generator (about 800,000 checks: answers exist, options are unique, no broken text).
- `npm run smoke`: opens the app headless and fails on any script error or missing file.
- `npm run playthrough`: plays the first, middle and last level of every chapter (generated chapters with every answer correct). `npm run playthrough:full` does every level.
- `npm test` runs lint, smoke and the quick play-through. GitHub runs lint, smoke and the full play-through on every push (see the Actions tab).
When you add a new file, also add it to `index.html` and to `FILES` in `sw.js`, and change the `CACHE` name in `sw.js` so devices pick up the update.

## Grown-up PIN, parent gate and privacy
- Each family sets their own **grown-up PIN** (stored as a salted hash in the browser). Existing installs keep the built-in PIN until it is changed; new installs are asked to create one on first use. The Grown-up corner has "Change grown-up PIN".
- **Parent gate**: a grown-up maths question before anything that opens a web page outside the game (`openExternal` in `js/helpers.js`).
- `privacy.html` is the privacy policy (linked from the Grown-up corner, needed for the App Store). Cloud sync users can delete their online account from the Grown-up corner.
- **Pet colour**: pets in the avatar shop can be tinted (`PET_COLORS` in `js/avatar-data.js`).

## Avatar
New players choose Girl or Boy first; each starts from a reference-inspired look (`STYLE_PRESETS`). Hair, top and trousers use gradients for a glossy finish, and the shop shows each item on a starter avatar (`itemThumb`). The Idol & Hunter pack is original artwork (no film characters, logos or brand marks).

### Boy and girl items
Items may have `for:"boy"|"girl"`; `itemFits()` filters the shop and the avatar. Hair styles are listed per style (`BOY_HAIRS`, `GIRL_HAIRS`, `hairsFor`). Choosing Boy or Girl in the Look tab applies that style's starter look.
