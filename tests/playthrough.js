// Plays the app in a headless browser. Generated-question chapters are played with every answer correct;
// every other chapter's levels are opened and must render without errors.
// Quick (default): first, middle and last level of each chapter. Full: FULL=1 node tests/playthrough.js
const { chromium } = require("playwright");
const path = require("path");
const URL = "file://" + path.resolve(__dirname, "..", "index.html");
const FULL = !!process.env.FULL;
const GENERATED = { c7: "MATH_GEN", c9: "TIME_GEN", c10: "WONDER_GEN", c11: "GEO_GEN", c12: "GEO_GEN", c13: "SCI_GEN", c14: "SCI_GEN" };
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 800, height: 1000 } });
  const errs = [];
  p.on("pageerror", e => errs.push("pageerror: " + e.message));
  await p.addInitScript(() => {
    speechSynthesis.speak = () => {};
    const st = window.setTimeout; window.setTimeout = (f, ms, ...a) => st(f, Math.min(ms || 0, 20), ...a);   // run the app's waits fast
  });
  await p.route(/gstatic|googleapis|firebase/, r => r.abort());
  await p.goto(URL);
  await p.evaluate(() => {
    const pr = newProfile("Tester", {}); DB.current = pr.id; window.LOG = [];
    for (const name of ["MATH_GEN", "TIME_GEN", "WONDER_GEN", "GEO_GEN", "SCI_GEN"]) {
      const G = window[name] || eval(name);
      for (const k in G) { const f = G[k]; G[k] = (...a) => { const q = f(...a); q.vis = (q.vis || "") + `<i data-id="${(window.NID = (window.NID || 0) + 1)}" hidden></i>`; LOG.push(q); return q; }; }
    }
    LESSONS.forEach((_, i) => { pr.done.c3[i + 1] = 3; });   // so the daily digraph test has sounds to ask about
    saveDB();
  });
  const failures = [];
  const waitChange = (cur) => p.waitForFunction(c => { const h = document.querySelector("h2"); return !h || h.textContent !== c; }, cur, { timeout: 4000 }).catch(() => {});
  async function dismissLearn() {
    for (let g = 0; g < 60 && await p.evaluate(() => /Let's learn first/.test(document.body.innerText)); g++) {
      if (g % 3 === 0 && g < 6) await p.click("#nxt"); else if (g % 2) await p.click("#skp"); else await p.click("#nxt");
      await p.waitForTimeout(15);
    }
  }
  async function playGenerated(ch, n) {
    await p.evaluate(([c, n]) => { LOG.length = 0; RUN[c](n); }, [ch, n]);
    await dismissLearn();
    for (let i = 0; i < 14; i++) {
      const cur = await p.evaluate(() => (document.querySelector("h2") || {}).textContent || "");
      if (!/Question/.test(cur)) break;
      const id = await p.evaluate(() => { const e = document.querySelector("i[data-id]"); return e ? +e.dataset.id : 0; });
      const q = await p.evaluate(id => { const x = LOG.find(q => q.vis.includes('data-id="' + id + '"')); return x ? { a: String(x.ans), t: x.type } : null; }, id);
      if (!q) return "could not match question";
      if (q.t === "num") { for (const dgt of q.a) await p.click(`[data-n="${dgt}"]`); await p.click("#go"); }
      else {
        const k = await p.evaluate(a => { const norm = h => { const d = document.createElement("div"); d.innerHTML = h; return d.innerHTML; }; return [...document.querySelectorAll("[data-o]")].findIndex(b => b.innerHTML.trim() === norm(a)); }, q.a);
        if (k < 0) return "correct answer not among the choices";
        await p.click(`[data-o="${k}"]`);
      }
      await waitChange(cur);
    }
    return (await p.evaluate(() => document.body.innerText)).includes("Level complete") ? null : "level did not finish";
  }
  async function openOnly(ch, n) {
    const before = errs.length;
    await p.evaluate(([c, n]) => RUN[c](n), [ch, n]);
    await p.waitForTimeout(60);
    const len = await p.evaluate(() => document.body.innerText.length);
    return errs.length > before ? "script error" : len < 20 ? "blank screen" : null;
  }
  const chapters = await p.evaluate(() => Object.keys(CH).map(k => [k, CH[k].max]));
  let levels = 0;
  for (const [ch, max] of chapters) {
    const picks = FULL ? Array.from({ length: max }, (_, i) => i + 1) : [...new Set([1, Math.ceil(max / 2), max])];
    for (const n of picks) {
      const before = errs.length; levels++;
      let why;
      try { why = GENERATED[ch] ? await playGenerated(ch, n) : await openOnly(ch, n); } catch (e) { why = "exception: " + e.message.split("\n")[0]; }
      if (!why && errs.length > before) why = "script error";
      if (why) failures.push(`${ch} level ${n}: ${why}`);
    }
  }
  // home, grown-up corner and report render
  for (const fn of ["home()", "showGrownUp()", "subjectScreen('gk')", "subjectScreen('geo')", "subjectScreen('sci')"]) {
    const before = errs.length; await p.evaluate(fn); await p.waitForTimeout(30);
    if (errs.length > before) failures.push(fn + ": script error");
  }
  await b.close();
  if (errs.length) failures.push(...errs.slice(0, 5));
  if (failures.length) { console.log(`PLAYTHROUGH FAIL (${levels} levels)\n` + failures.join("\n")); process.exit(1); }
  console.log(`playthrough ok (${levels} levels, ${FULL ? "full" : "quick"})`);
})();
