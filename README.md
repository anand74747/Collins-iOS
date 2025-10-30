# Collins Aerospace AR Scanner

A native Android application featuring real-time camera scanning with AR interface for aircraft product identification and information display.

**Platform:** 📱 Android | 🌐 Web

## Features

- **AR Camera Scanning** - Real-time aircraft product scanning with AR overlay
- **Image Recognition** - AI-powered image processing and identification
- **Interactive Content** - Swipeable video, image, and text displays
- **Native Performance** - Built with Capacitor for optimal speed
- **Pinch-to-Zoom** - Enhanced camera controls
- **Offline Ready** - Cached assets for reliable operation

## Technology Stack

- **React 19** + **Vite 7** - Fast, modern frontend
- **Capacitor 7** - Native mobile framework
- **React Router** - Navigation
- **Axios** - API communication
- **Swiper** - Touch interactions
  └── main.jsx # App entry point

````

## Setup and Installation

1. **Install dependencies:**

   ```bash
   npm install
````

2. **Configure environment variables:**

   Create a `.env` file in the root directory (copy from `.env.example`):

   ```bash
   cp .env.example .env
   ```

   Update the values in `.env`:

   ```env
   VITE_API_BASE_URL=http://192.168.10.135:81/api/v1
   VITE_API_TOKEN=your_api_token_here
   VITE_IMAGE_PROCESSOR_URL=http://192.168.10.135:81/api/v1/image-processor/scan-image
   ```

## Quick Start

### Development

```bash
# Install dependencies
npm install

# Configure environment (.env file)
cp .env.example .env
# Update API credentials in .env

# Start dev server
npm run dev
```

### Android Production Build

```bash
# Build and sync
npm run android:sync

# Open in Android Studio
npm run android:open

# Or build APK directly
npm run android:build:release
```

## Configuration

Create a `.env` file with:

```env
VITE_API_BASE_URL=your_api_url
VITE_API_TOKEN=your_api_token
VITE_IMAGE_PROCESSOR_URL=your_processor_url
```

**⚠️ Security:** Never commit `.env` to version control.

- `logo 2.png` - Collins Aerospace logo
- `Close.svg` - Close button icon
- `Video.svg` - Video icon

## Development Commands

### Web Development

````bash
# Start development server
npm run dev
## Commands

### Development
```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Lint code
````

### Android

```bash
npm run android:sync           # Sync web to Android
npm run android:open           # Open Android Studio
npm run android:run            # Build and run on device
npm run android:build:debug    # Build debug APK
npm run android:build:release  # Build release APK
```

## Android App

- **Package:** `com.collinsaerospace.arscanner`
- **Min SDK:** Android 6.0 (API 23)
- **Target SDK:** Android 14 (API 35)

### Build Release APK

1. Build web app: `npm run build`
2. Sync to Android: `npx cap sync android`
3. Open Android Studio: `npm run android:open`
4. Build → Generate Signed Bundle / APK
5. Create/use keystore for signing
6. APK location: `android/app/build/outputs/apk/release/`

## License

Proprietary - Collins Aerospace

```

```
