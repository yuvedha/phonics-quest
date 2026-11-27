// Quick smoke test: loads the app in a headless browser, fails on any script error or missing file.
const { chromium } = require("playwright");
const path = require("path");
const URL = "file://" + path.resolve(__dirname, "..", "index.html");
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 800, height: 1000 } });
  const errs = [];
  p.on("pageerror", e => errs.push("pageerror: " + e.message));
  p.on("requestfailed", r => { if (!/gstatic|googleapis|firebase/.test(r.url())) errs.push("failed: " + r.url()); });
  p.on("console", m => { if (m.type() === "error" && !/gstatic|ERR_TUNNEL|ERR_INTERNET|Failed to load resource/.test(m.text())) errs.push("console: " + m.text()); });
  await p.addInitScript(() => { speechSynthesis.speak = () => {}; });
  await p.route(/gstatic|googleapis|firebase/, r => r.abort());
  await p.goto(URL);
  await p.waitForTimeout(400);
  const ok = await p.evaluate(() => typeof CH === "object" && Object.keys(CH).length >= 14 && typeof DB === "object");
  if (!ok) errs.push("app did not initialise (CH/DB missing)");
  await b.close();
  if (errs.length) { console.log("SMOKE FAIL\n" + errs.join("\n")); process.exit(1); }
  console.log("smoke ok");
})();
