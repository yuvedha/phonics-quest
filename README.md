# Little Explorers Quest (the phonics chapters are the first subject)

A fun phonics game for early readers: sight words, digraph lessons, picture quests,
daily levels, and a dress-up avatar earned with points.

## Files
- `index.html`: the game itself
- `content.js`: all the lessons and levels. Add new levels at the END of the lists
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
- **Maths Magic** (Chapter 7): Year 1 and 2 maths in `maths.js`, with questions generated fresh each time (counting, add and take away, number bonds, skip counting, place value, shapes, time, money, fractions, patterns, word problems). Add levels at the END of `MATH_LEVELS`.
- **Cloud progress** (optional): follow `SETUP-CLOUD.md`, then fill in `cloud-config.js`. `cloud.js` talks to Firebase only when configured.
- **Installable app**: `manifest.webmanifest`, `sw.js` and `icons/` make it installable and playable offline. If you add new files, add them to FILES in sw.js.
- **Reading Rocket** (Chapter 8, under Phonics): decodable sentences and mini stories in `reading.js`, 12 levels matched to the phonics so far. Add levels at the END of `READING`.
