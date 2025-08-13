import type { CapacitorConfig } from "@capacitor/core"

const config: CapacitorConfig = {
  appId: "com.tvapp.streaming",
  appName: "TV Streaming App",
  webDir: "out",
  server: {
    androidScheme: "https",
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#1a1a2e",
      showSpinner: true,
      spinnerColor: "#8b5cf6",
    },
    StatusBar: {
      style: "dark",
      backgroundColor: "#1a1a2e",
    },
  },
}

export default config
