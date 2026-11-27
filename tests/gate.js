// Tests the grown-up PIN and the parent gate: new install, existing install, wrong answers, changing the PIN.
const { chromium } = require("playwright");
const path = require("path");
const URL = "file://" + path.resolve(__dirname, "..", "index.html");
const fails = [];
const check = (c, m) => { if (!c) fails.push(m); };
(async () => {
  const b = await chromium.launch();
  async function fresh(mode) {
    const ctx = await b.newContext({ viewport: { width: 800, height: 1000 } });
    const p = await ctx.newPage();
    p.on("pageerror", e => fails.push("pageerror: " + e.message));
    await p.addInitScript(() => { speechSynthesis.speak = () => {}; });
    await p.route(/gstatic|googleapis|firebase/, r => r.abort());
    await p.goto(URL);
    if (mode === "legacy") await p.evaluate(() => localStorage.setItem("leqPinMode", "legacy"));
    return p;
  }
  const modalText = p => p.evaluate(() => (document.getElementById("modal") || {}).innerText || "");
  async function tryPin(p, pin) {
    await p.evaluate(() => { window.OPENED = false; askPin("Test", () => { window.OPENED = true; }); });
    await p.fill("#pinIn", pin); await p.click("#pinGo");
    return p.evaluate(() => window.OPENED);
  }
  // 1. new install: first use creates a PIN; it is stored hashed; wrong PIN rejected; right PIN accepted
  let p = await fresh("new");
  await p.evaluate(() => { window.OPENED = false; askPin("Test", () => { window.OPENED = true; }); });
  check(/Create a grown-up PIN/.test(await modalText(p)), "new install should ask to create a PIN");
  await p.fill("#pin1", "12"); await p.fill("#pin2", "12"); await p.click("#pinGo");
  check(/4 to 8/.test(await modalText(p)), "short PIN should be rejected");
  await p.fill("#pin1", "4821"); await p.fill("#pin2", "1111"); await p.click("#pinGo");
  check(/different/.test(await modalText(p)), "mismatched PINs should be rejected");
  await p.fill("#pin1", "4821"); await p.fill("#pin2", "4821"); await p.click("#pinGo");
  check(await p.evaluate(() => window.OPENED), "creating a PIN should carry on to the gated action");
  const stored = await p.evaluate(() => localStorage.getItem("leqPin"));
  check(stored && !stored.includes("4821") && /"hash":"[0-9a-f]{64}"/.test(stored), "PIN must be stored as a hash, not plain text");
  check(!(await tryPin(p, "0000")), "wrong PIN must not open");
  check(/Not the right PIN/.test(await modalText(p)), "wrong PIN should show a message");
  await p.evaluate(() => closeModal());
  check(!(await tryPin(p, "050220")), "built-in PIN must NOT work on a new install");
  await p.evaluate(() => closeModal());
  check(await tryPin(p, "4821"), "correct PIN must open");
  await p.context().close();
  // 2. existing install: built-in PIN works until changed, then only the new PIN works
  p = await fresh("legacy");
  check(!(await tryPin(p, "123456")), "wrong PIN must not open (existing install)");
  await p.evaluate(() => closeModal());
  check(await tryPin(p, "050220"), "built-in PIN should work on an existing install");
  await p.evaluate(() => setPinDialog("Change", () => {}));
  await p.fill("#pin1", "9090"); await p.fill("#pin2", "9090"); await p.click("#pinGo");
  check(!(await tryPin(p, "050220")), "old built-in PIN must stop working after a change");
  await p.evaluate(() => closeModal());
  check(await tryPin(p, "9090"), "new PIN should work after a change");
  // 3. parent gate: wrong answer blocked, right answer passes
  await p.evaluate(() => { window.PASSED = false; parentGate(() => { window.PASSED = true; }); });
  const q = (await modalText(p)).match(/(\d+)\s*×\s*(\d+)/);
  check(q, "parent gate should show a multiplication question");
  await p.fill("#gIn", "1"); await p.click("#gGo");
  check(!(await p.evaluate(() => window.PASSED)), "wrong gate answer must not pass");
  await p.fill("#gIn", String(+q[1] * +q[2])); await p.click("#gGo");
  check(await p.evaluate(() => window.PASSED), "right gate answer should pass");
  // 4. the grown-up corner opens through the gate and shows the privacy and PIN buttons
  await p.evaluate(() => { const pr = newProfile("T", {}); DB.current = pr.id; saveDB(); });
  await p.evaluate(() => grownUp()); await p.fill("#pinIn", "9090"); await p.click("#pinGo");
  check(await p.evaluate(() => !!document.querySelector("#priv") && !!document.querySelector("#chpin")), "grown-up corner should have privacy and change-PIN buttons");
  await b.close();
  if (fails.length) { console.log("GATE FAIL\n" + fails.join("\n")); process.exit(1); }
  console.log("gate ok");
})();
