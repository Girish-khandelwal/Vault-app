# Vault Arcade

16 playable casino-inspired games using free demo credits. No real money, deposits, withdrawals, accounts, or server is required. Game views open in the same tab at `#game/<id>`. The balance and recent bets last for the current page session and reset when you reload or restart the app.

## Build an APK using GitHub only

1. Create a GitHub repository. Upload **the contents of this folder**, keeping `dist/`, `android/`, `tests/`, and `.github/` together at the repository root. Do not upload the `.git` folder or `.openai` hosting metadata.
2. Check that `.github/workflows/build-apk.yml` exists in GitHub. Hidden folders can be missed when dragging files. If it is missing, use **Add file → Create new file**, name it `.github/workflows/build-apk.yml`, and paste the included workflow's contents.
3. Open **Actions → Build Android APK → Run workflow → Run workflow**. Pushes to `main` or `master` also build automatically. Enable Actions if your repository asks you to.
4. Open the completed green run. Under **Artifacts**, download **Vault-Arcade-APK** and unzip it.
5. Transfer `app-debug.apk` to your Android phone and open it to install. Android may ask you to allow installation from your browser or file manager.

The workflow also supports uploading the whole `vault-arcade/` folder into a parent repository, provided the workflow itself is placed at the parent repository's `.github/workflows/build-apk.yml`.

No Android Studio, paid hosting, signing secrets, or local Android installation is required for this test APK. GitHub builds it using JDK 17, Gradle 8.11.1, Android Gradle Plugin 8.9.2, and SDK 35. The APK supports Android 8.0 and newer with an up-to-date Android System WebView. Assets are bundled in the APK and run offline. A secure local asset origin provides browser cryptographic randomness.

This is a **debug-signed APK for personal testing**, not a Play Store release. Different GitHub runners may generate different debug keys, so reinstalling a later APK may require uninstalling the earlier one. Store distribution needs a persistent private release signing key and an appropriate release workflow; no signing key is stored here.

## Play locally

From this folder:

```sh
python3 -m http.server 4173 --bind 127.0.0.1 --directory dist
```

Open http://127.0.0.1:4173. No npm installation or build is needed.

## Games and animations

Dragon Tiger, Plinko, Aviator, Dragon Dagger, Chicken Race, Mines, Dice, Roulette, Blackjack, Wheel, Limbo, Keno, Hi-Lo, Coin Flip, Neon Slots, and Penalty Shootout. Dragon Tiger uses an eight-deck shoe freshly shuffled each round: A is low, K high; side wins pay 2×, tie bets pay 9×, ties return half of side bets.

Games have full-page views and a desktop Expand mode. Animated flight paths, falling Plinko balls, card reveals, reel spins, tile reveals, and win/loss effects respect the device's reduced-motion setting. Finish or cash out an active round before returning to the lobby.

## Check the game code

```sh
node --check dist/app.js
node --check dist/animations.js
node --test tests/*.test.cjs
```

`dist/` is the single source used by both the website and APK. Edit those files and run the workflow again to build an updated APK.

Build reference: [Android command-line builds](https://developer.android.com/build/building-cmdline), [AGP 8.9 compatibility](https://developer.android.com/build/releases/agp-8-9-0-release-notes), [GitHub Gradle workflows](https://docs.github.com/en/actions/tutorials/build-and-test-code/java-with-gradle).
