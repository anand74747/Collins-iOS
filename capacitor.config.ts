import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.collinsaerospace.arscanner",
  appName: "Collins AR Scanner",
  webDir: "dist",
  server: {
    androidScheme: "http",
    iosScheme: "https",
    cleartext: true,
    allowNavigation: [
      "agents.skillablers.com",
      "*.skillablers.com",
      "192.168.10.135:81",
      "192.168.10.*",
      "*",
    ],
  },
  android: {
    allowMixedContent: true, // Allow mixed content for API calls
    captureInput: true,
    webContentsDebuggingEnabled: true, // Enable for debugging
    backgroundColor: "#002855",
  },
  ios: {
    contentInset: "always",
    allowsLinkPreview: true,
    scrollEnabled: true,
    webContentsDebuggingEnabled: true, // Enable for debugging
    limitsNavigationsToAppBoundDomains: false,
  },
  plugins: {
    Camera: {
      permissions: ["camera"],
    },
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#002855",
      androidScaleType: "CENTER_CROP",
      iosSpinnerStyle: "large",
      showSpinner: false,
      splashFullScreen: true,
      splashImmersive: true,
    },
  },
};

export default config;
