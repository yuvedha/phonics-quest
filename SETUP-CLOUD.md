# Turn on cloud progress (about 10 minutes, free)

Progress is stored in your own free Firebase project, protected by an email and password. Only the signed-in grown-up can read it.

1. Go to https://console.firebase.google.com and sign in with a Google account. Click **Add project**, name it (for example "little-explorers"), and turn Google Analytics off.
2. **Build → Authentication → Get started → Email/Password → Enable → Save.**
3. **Build → Firestore Database → Create database.** Choose a location near you (australia-southeast1 is Sydney) and **Production mode**. Then open the **Rules** tab, replace everything with the text below and press **Publish**:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{uid} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
    }
  }
}
```

4. **Authentication → Settings → Authorized domains → Add domain:** `yuvedha.github.io`
5. **Project settings (gear icon) → Your apps → the web icon `</>` → register an app.** Copy the `firebaseConfig` values (apiKey, authDomain, projectId, appId).
6. Paste those into `cloud-config.js` (or send them to Claude to paste in), then push to GitHub.

Then open the app, go to Grown-up corner → **Cloud sync**, and create the account. On another device, open the same web address and choose "Sign in to get my progress".

Tip: use a nickname for the child's profile name, since the name is stored with the progress.
