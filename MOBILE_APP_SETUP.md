# 📱 Build AgriSetu as an Android APK (Capacitor)

Capacitor is now wired up. The actual APK has to be built **on your own machine** — Lovable's cloud sandbox cannot run Android Studio. Here is the exact recipe.

## Prerequisites
- A computer with [Android Studio](https://developer.android.com/studio) installed
- [Node.js 18+](https://nodejs.org)
- A free [GitHub](https://github.com) account

## Steps

1. In Lovable, click **GitHub → Connect to GitHub** (top right) and push this project to your own repo.
2. On your computer:
   ```bash
   git clone <your-repo-url>
   cd <your-repo>
   npm install
   npx cap add android
   npm run build
   npx cap sync android
   npx cap open android
   ```
3. Android Studio opens. Click **Build → Build Bundle(s) / APK(s) → Build APK(s)**.
4. The APK appears under `android/app/build/outputs/apk/debug/app-debug.apk`. Install it on a phone via USB or upload to Play Console.

## Hot reload during development
The `capacitor.config.ts` already points the WebView at the live Lovable preview URL, so any change you make in Lovable shows up instantly inside the installed APK. To ship a **fully offline** APK, delete the `server` block in `capacitor.config.ts`, run `npm run build` then `npx cap sync android` again.

## Whenever you `git pull` new changes
```bash
npm install
npm run build
npx cap sync android
```

📖 Full guide: <https://lovable.dev/blog/2025-03-25-using-lovable-for-mobile-app-development>
