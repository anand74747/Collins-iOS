# iOS Setup Guide for Collins AR Scanner

## Prerequisites (Mac Required)

1. **macOS** - iOS development requires a Mac computer
2. **Xcode** - Install from Mac App Store (latest version recommended)
3. **Xcode Command Line Tools** - Run in terminal:
   ```bash
   xcode-select --install
   ```
4. **CocoaPods** - iOS dependency manager (usually comes with Xcode, or install):
   ```bash
   sudo gem install cocoapods
   ```
5. **Apple Developer Account** (for device testing & App Store deployment)

## Step-by-Step Setup

### Step 1: Install Dependencies

```bash
# Install the iOS Capacitor package
npm install

# This will install @capacitor/ios and all other dependencies
```

### Step 2: Add iOS Platform

```bash
# Add iOS platform to your project
npx cap add ios

# This creates the ios/ folder with Xcode project
```

### Step 3: Build and Sync

```bash
# Build your web app and sync to iOS
npm run ios:sync

# Or run them separately:
npm run build
npx cap sync ios
```

### Step 4: Open in Xcode

```bash
# Open the project in Xcode
npm run ios:open

# Or manually:
npx cap open ios
```

## Xcode Configuration

### 1. Configure Signing & Capabilities

1. In Xcode, select the **App** target
2. Go to **Signing & Capabilities** tab
3. Select your **Team** (Apple Developer Account)
4. Xcode will automatically manage signing

### 2. Add Camera Permission Description

The `Info.plist` file will need camera permissions:

- `NSCameraUsageDescription` - "We need camera access to scan AR markers"
- `NSPhotoLibraryUsageDescription` - "We need photo library access to save scanned images"

(Capacitor should add these automatically, but verify in Xcode)

### 3. Set Deployment Target

1. In project settings, set **iOS Deployment Target** to **13.0** or higher
2. This determines minimum iOS version supported

## Building & Running

### Run on Simulator

```bash
# Run on iOS simulator
npm run ios:run

# Or in Xcode: Select a simulator and click the Play button
```

### Run on Physical Device

1. Connect your iPhone/iPad via USB
2. In Xcode, select your device from the device dropdown
3. Click the Play button (or press Cmd + R)
4. First time: Trust the developer certificate on your device
   - Settings → General → VPN & Device Management → Trust

### Build for Release

```bash
# Build release archive
npm run ios:build

# Or in Xcode:
# Product → Archive → Distribute App
```

## Troubleshooting

### Issue: "No provisioning profile found"

**Solution:**

- Sign in with your Apple ID in Xcode (Preferences → Accounts)
- Select your team in Signing & Capabilities

### Issue: "Module not found" errors

**Solution:**

```bash
cd ios/App
pod install
cd ../..
npm run ios:sync
```

### Issue: Camera not working

**Solution:**

- Check Info.plist has camera permission descriptions
- Physical device only (simulator doesn't have camera)
- Grant camera permissions when prompted

### Issue: Network requests failing

**Solution:**

- Check server URLs are in allowNavigation list (capacitor.config.ts)
- For HTTP (not HTTPS), add domain to App Transport Security exceptions

## Available Scripts

```bash
# Development
npm run dev                  # Run Vite dev server (web only)

# iOS Specific
npm run ios:sync            # Build and sync to iOS
npm run ios:open            # Open in Xcode
npm run ios:run             # Run on iOS device/simulator
npm run ios:build           # Create production build

# Android (existing)
npm run android:sync        # Build and sync to Android
npm run android:open        # Open in Android Studio
npm run android:run         # Run on Android device/emulator

# Universal
npm run cap:sync           # Sync to all platforms
```

## App Store Submission Checklist

- [ ] Update version in `package.json` and Xcode
- [ ] Add app icons (1024x1024 and various sizes)
- [ ] Add launch screen images
- [ ] Test on multiple iOS versions
- [ ] Create screenshots for App Store
- [ ] Write app description
- [ ] Archive and upload to App Store Connect
- [ ] Submit for review

## Key Differences: iOS vs Android

| Feature      | iOS                  | Android                 |
| ------------ | -------------------- | ----------------------- |
| Build Tool   | Xcode                | Android Studio / Gradle |
| Language     | Swift/Objective-C    | Kotlin/Java             |
| IDE Required | Xcode (Mac only)     | Android Studio (any OS) |
| Deployment   | TestFlight/App Store | Google Play             |
| Simulator    | iOS Simulator        | Android Emulator        |

## Resources

- [Capacitor iOS Documentation](https://capacitorjs.com/docs/ios)
- [Apple Developer Portal](https://developer.apple.com)
- [Xcode Documentation](https://developer.apple.com/xcode/)
- [TestFlight Guide](https://developer.apple.com/testflight/)

## Next Steps

1. Follow the setup steps above on your Mac
2. Test the app thoroughly on iOS simulator
3. Test on physical iOS device
4. Fix any iOS-specific UI/UX issues
5. Submit to App Store when ready

---

**Note:** This app uses the same React/Vite codebase for both platforms. Most features should work identically, but always test thoroughly on iOS devices.
