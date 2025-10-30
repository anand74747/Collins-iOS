# 🎯 Quick Start on Mac

## ✅ iOS Platform Created Successfully!

Your iOS project has been created on Windows and pushed to GitHub branch `ios-platform`.

---

## 🚀 Get Started on Mac (3 Simple Steps)

### Step 1: Clone the iOS Branch on Mac

```bash
git clone -b ios-platform https://github.com/jnana890/collins_frontend.git
cd collins_frontend
```

Or if you already have the repo:

```bash
cd collins_frontend
git fetch origin
git checkout ios-platform
```

### Step 2: Install Dependencies

```bash
# Install Node modules
npm install

# Install CocoaPods dependencies (iOS native)
cd ios/App
pod install
cd ../..
```

### Step 3: Open in Xcode & Run

```bash
npx cap open ios
```

Then in Xcode:

1. Select your Team in **Signing & Capabilities**
2. Choose a device/simulator
3. Click ▶️ Play button

**That's it!** 🎉

---

## 📁 What's Already Done

✅ iOS folder created with Xcode project  
✅ Camera permissions configured in Info.plist  
✅ Capacitor Camera plugin installed  
✅ Web assets synced to iOS  
✅ App name: "Collins AR Scanner"  
✅ Bundle ID: com.collinsaerospace.arscanner

---

## 🔧 If Pod Install Fails

```bash
# Update CocoaPods and retry
sudo gem install cocoapods
pod repo update
cd ios/App
pod install
cd ../..
```

---

## 📱 Testing

**On Simulator:**

```bash
npm run ios:run
```

**On Physical Device:**

1. Connect iPhone via USB
2. Select device in Xcode
3. Trust certificate on iPhone: Settings → General → Device Management
4. Run from Xcode

---

## 🔄 Making Changes

```bash
# After changing React code
npm run build
npx cap sync ios

# Then run again in Xcode
```

---

## 📝 Important Files

- `ios/App/App.xcworkspace` - Open THIS in Xcode (not .xcodeproj)
- `ios/App/App/Info.plist` - Camera permissions here
- `capacitor.config.ts` - iOS configuration
- `IOS_SETUP_GUIDE.md` - Detailed guide

---

## ⚡ Quick Commands

```bash
# Full rebuild and open
npm run ios:open

# Just sync changes
npx cap sync ios

# Run on device/simulator
npm run ios:run
```

---

## 🆘 Need Help?

See detailed guide: `IOS_SETUP_GUIDE.md` or `IOS_BUILD_READY.md`

---

**Ready to build! Your iOS app awaits on Mac! 🚀📱**
