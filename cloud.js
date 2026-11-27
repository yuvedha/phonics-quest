/* Cloud sync for Little Explorers Quest (Firebase Auth + Firestore). Loads only when cloud-config.js is filled in. */
const Cloud = (()=>{
  const cfg = window.CLOUD_CONFIG, on = !!(cfg && cfg.apiKey && cfg.projectId);
  let A, F, auth, db, user = null, initP = null;
  const V = "10.12.2", base = `https://www.gstatic.com/firebasejs/${V}/`;
  const nice = e => {
    const c = (e && e.code) || "";
    if(/invalid-email/.test(c)) return "That email address doesn't look right.";
    if(/weak-password/.test(c)) return "Please use a password with at least 6 characters.";
    if(/email-already-in-use/.test(c)) return "That email already has an account. Try Sign in instead.";
    if(/user-not-found|wrong-password|invalid-credential/.test(c)) return "Email or password not right.";
    if(/requires-recent-login/.test(c)) return "For safety, sign out, sign in again, then delete the account straight away.";
    if(/network/.test(c)) return "Couldn't reach the internet. Try again later.";
    if(/too-many-requests/.test(c)) return "Too many tries. Wait a minute and try again.";
    return "Something went wrong (" + (c || (e && e.message) || "unknown") + ").";
  };
  function init(){
    if(!on) return Promise.resolve(null);
    if(initP) return initP;
    initP = (async()=>{
      const [a, au, f] = await Promise.all([import(base+"firebase-app.js"), import(base+"firebase-auth.js"), import(base+"firebase-firestore.js")]);
      A = au; F = f; const app = a.initializeApp(cfg); auth = au.getAuth(app); db = f.getFirestore(app);
      await new Promise(res=>{ let first = true; au.onAuthStateChanged(auth, u=>{ user = u; if(first){ first = false; res(); } }); });
      return user;
    })().catch(e=>{ initP = null; throw e; });
    return initP;
  }
  const guard = async fn => { try{ await init(); return {ok:true, value: await fn()}; }catch(e){ return {ok:false, error: nice(e)}; } };
  return {
    on, init,
    user: ()=>user, email: ()=>user && user.email,
    signIn: (e,p)=>guard(()=>A.signInWithEmailAndPassword(auth,e,p)),
    signUp: (e,p)=>guard(()=>A.createUserWithEmailAndPassword(auth,e,p)),
    signOut: ()=>guard(()=>A.signOut(auth)),
    pull: ()=>guard(async()=>{ const s = await F.getDoc(F.doc(db,"users",user.uid)); return s.exists() ? JSON.parse(s.data().data) : null; }),
    deleteAll: ()=>guard(async()=>{ await F.deleteDoc(F.doc(db,"users",user.uid)); await A.deleteUser(auth.currentUser); }),
    push: obj=>guard(()=>F.setDoc(F.doc(db,"users",user.uid), {updated: Date.now(), data: JSON.stringify(obj)}))
  };
})();
