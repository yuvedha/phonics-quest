// Checks every piece of learning content and every question generator. Run: node tests/lint-content.js
const fs = require("fs"), path = require("path");
const dir = path.resolve(__dirname, "..", "content");
const src = ["content", "maths", "reading", "gk", "geo", "science"].map(f => fs.readFileSync(path.join(dir, f + ".js"), "utf8")).join("\n");
const d = new Function(src + `;return {WORD_LEVELS,SOUND_GROUPS,LESSONS,PICTURE_LEVELS,DETECTIVE,READING,
  MATH_GEN,MATH_LEVELS,TIME_GEN,TIME_LEVELS,WONDER_GEN,WONDER_LEVELS,GEO_GEN,GEO_LEVELS,COUNTRY_LEVELS,SCI_GEN,SCI_LEVELS_LIVING,SCI_LEVELS_LAB,COUNTRIES,CONTS,SCI,FACTS}`)();
let bad = 0, checks = 0;
const err = (...a) => { bad++; if (bad <= 40) console.log("BAD", ...a); };
const ok = (c, ...a) => { checks++; if (!c) err(...a); };

// ---- static content
d.WORD_LEVELS.forEach((L, i) => { ok(L.name && L.words.length >= 4, "word level", i + 1); ok(new Set(L.words).size === L.words.length, "dup words in level", L.name); L.words.forEach(w => ok(/^[a-z' -]+$/i.test(w), "word chars", w)); });
d.PICTURE_LEVELS.forEach((L, i) => { ok(L.name && L.items.length >= 4, "picture level", i + 1); L.items.forEach(x => ok(x[0] && x[1], "picture item", L.name)); });
d.DETECTIVE.forEach(L => L.items.forEach(x => ok(x[1].includes(x[0]), "detective digraph not in word", x[0], x[1])));
d.LESSONS.forEach(L => { ok(L.dg && L.intro && L.sounds.length >= 1, "lesson", L.dg); L.sounds.forEach(s => s.words.forEach(w => ok(w[0], "lesson word", L.dg))); });
d.READING.forEach((L, i) => L.items.forEach(it => { ok(it.length >= 5 && it[0] && it[1] && it[2], "reading item", i + 1, it[0]); const wr = it[3].split("|"); ok(wr.length >= 1 && !wr.includes(it[2]), "reading answer among wrongs", it[0]); }));
d.COUNTRIES.forEach(c => { ok(d.CONTS[c[6]], "country continent", c[1]); const cr = d.CONTS[c[6]].crop; ok(c[4] >= cr[0] && c[4] <= cr[2] && c[5] >= cr[1] && c[5] <= cr[3], "country dot outside map", c[1]); c[7].forEach(f => ok(!f[2].includes(f[1]) && new Set([f[1], ...f[2]]).size === 3, "country fact options", f[0])); });
for (const bank of [d.SCI, d.FACTS]) for (const [t, l] of Object.entries(bank)) { const qs = l.map(x => x[0] + "|" + x[1]); ok(new Set(qs).size === qs.length, "duplicate question in bank", t); l.forEach(x => ok(!x[2].includes(x[1]) && new Set([x[1], ...x[2]]).size === 3, "bank options", t, x[0])); }

// ---- generators: 200 samples per generator per level
function sample(name, GEN, LEVELS) {
  LEVELS.forEach((L, li) => {
    ok(L.name && L.gens && L.gens.length, name, "level has no name or gens", li + 1);
    (L.learn || []).forEach(pg => ok(pg.title && pg.html && pg.say, name, "learn page incomplete", L.name));
    for (let r = 0; r < 200; r++) {
      for (let i = 0; i < (L.n || 10); i++) {
        const g = L.gens[i % L.gens.length]; let q;
        try { q = GEN[g[0]](...g.slice(1)); } catch (e) { err(name, L.name, g, "threw:", e.message); return; }
        const txt = (q.q || "") + (q.say || "") + (q.vis || "");
        ok(q.q && q.say, name, L.name, "empty text");
        ok(!/NaN|undefined|\[object/.test(txt), name, L.name, "bad text", q.q);
        if (q.type === "num") ok(Number.isInteger(q.ans) && q.ans >= 0, name, L.name, "numeric answer", q.q, q.ans);
        else { ok(q.opts.map(String).includes(String(q.ans)), name, L.name, "answer not in options", q.q); ok(new Set(q.opts.map(String)).size === q.opts.length && q.opts.length >= 2, name, L.name, "options", q.q, q.opts); }
      }
    }
  });
}
sample("maths", d.MATH_GEN, d.MATH_LEVELS);
sample("time", d.TIME_GEN, d.TIME_LEVELS);
sample("wonder", d.WONDER_GEN, d.WONDER_LEVELS);
sample("geo", d.GEO_GEN, d.GEO_LEVELS);
sample("countries", d.GEO_GEN, d.COUNTRY_LEVELS);
sample("living", d.SCI_GEN, d.SCI_LEVELS_LIVING);
sample("lab", d.SCI_GEN, d.SCI_LEVELS_LAB);
console.log(bad ? `content lint FAILED: ${bad} problem(s) in ${checks} checks` : `content lint ok (${checks} checks)`);
process.exit(bad ? 1 : 0);
