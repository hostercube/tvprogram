# Android APK তৈরির গাইড

আপনার web app কে Android APK এ convert করার জন্য এই steps follow করুন:

## Method 1: Capacitor (Recommended)

### Installation
\`\`\`bash
npm install @capacitor/core @capacitor/cli
npm install @capacitor/android
\`\`\`

### Setup
\`\`\`bash
npx cap init "TV Streaming App" "com.yourcompany.tvapp"
npx cap add android
\`\`\`

### Build Process
\`\`\`bash
npm run build
npx cap copy
npx cap open android
\`\`\`

### Android Studio এ:
1. Android Studio খুলুন
2. Project import করুন
3. Build > Generate Signed Bundle/APK
4. APK select করুন এবং build করুন

## Method 2: PWA to APK

### PWA Features যোগ করুন:
\`\`\`json
// public/manifest.json
{
  "name": "TV Streaming App",
  "short_name": "TVApp",
  "description": "Smart TV Streaming Application",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0f172a",
  "theme_color": "#7c3aed",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png", 
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
\`\`\`

### Service Worker যোগ করুন:
\`\`\`js
// public/sw.js
self.addEventListener('install', (event) => {
  console.log('Service Worker installing');
});
\`\`\`

### PWA Builder ব্যবহার করুন:
1. https://www.pwabuilder.com/ এ যান
2. আপনার website URL দিন
3. Android package generate করুন

## Method 3: Cordova

### Installation
\`\`\`bash
npm install -g cordova
cordova create tvapp com.yourcompany.tvapp "TV Streaming App"
cd tvapp
cordova platform add android
\`\`\`

### Build
\`\`\`bash
cordova build android
cordova run android
\`\`\`

## APK Signing

### Debug APK:
\`\`\`bash
# Capacitor
npx cap run android

# Cordova  
cordova build android
\`\`\`

### Release APK:
1. Android Studio এ keystore তৈরি করুন
2. Build > Generate Signed Bundle/APK
3. Release mode select করুন
4. Keystore দিয়ে sign করুন

## TV Optimization

### Android TV Support যোগ করুন:
\`\`\`xml
<!-- android/app/src/main/AndroidManifest.xml -->
<uses-feature
    android:name="android.software.leanback"
    android:required="false" />
<uses-feature
    android:name="android.hardware.touchscreen"
    android:required="false" />

<activity android:name=".MainActivity"
    android:banner="@drawable/banner"
    android:icon="@drawable/icon"
    android:label="@string/app_name"
    android:screenOrientation="landscape">
    <intent-filter>
        <action android:name="android.intent.action.MAIN" />
        <category android:name="android.intent.category.LEANBACK_LAUNCHER" />
    </intent-filter>
</activity>
\`\`\`

## Final Steps

1. **Test করুন**: Android device/emulator এ test করুন
2. **Optimize করুন**: Performance এবং TV remote support check করুন  
3. **Publish করুন**: Google Play Store এ upload করুন

**Note**: Native Android development এর জন্য Android Studio এবং Java/Kotlin knowledge প্রয়োজন।
