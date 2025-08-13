# Production Deployment Guide

## 🚀 Web Deployment (Vercel)

1. **Deploy to Vercel:**
   \`\`\`bash
   npm run build
   vercel --prod
   \`\`\`

2. **Environment Variables:**
   - Add all Supabase environment variables in Vercel dashboard
   - Set `NEXT_PUBLIC_SUPABASE_URL`
   - Set `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Set `SUPABASE_SERVICE_ROLE_KEY`

## 📱 Android APK Build

### Method 1: Capacitor (Recommended)

1. **Install Capacitor:**
   \`\`\`bash
   npm install @capacitor/core @capacitor/cli
   npm install @capacitor/android
   \`\`\`

2. **Initialize Capacitor:**
   \`\`\`bash
   npx cap init "TV Streaming App" "com.tvapp.streaming"
   \`\`\`

3. **Build and Add Android:**
   \`\`\`bash
   npm run build
   npx cap add android
   npx cap copy android
   \`\`\`

4. **Open in Android Studio:**
   \`\`\`bash
   npx cap open android
   \`\`\`

5. **Build APK in Android Studio:**
   - Build → Generate Signed Bundle/APK
   - Choose APK
   - Create keystore or use existing
   - Build release APK

### Method 2: PWA to APK

1. **Enable PWA features in next.config.mjs**
2. **Use PWA Builder:**
   - Go to https://www.pwabuilder.com/
   - Enter your deployed app URL
   - Download Android package
   - Build APK using Android Studio

### Method 3: Cordova

1. **Install Cordova:**
   \`\`\`bash
   npm install -g cordova
   cordova create tvapp com.tvapp.streaming "TV Streaming App"
   \`\`\`

2. **Add platform:**
   \`\`\`bash
   cd tvapp
   cordova platform add android
   \`\`\`

3. **Copy build files to www folder**

4. **Build APK:**
   \`\`\`bash
   cordova build android --release
   \`\`\`

## 🔧 Production Optimizations

### Performance
- Enable image optimization
- Add service worker for offline support
- Implement lazy loading for channels
- Add caching for API responses

### Security
- Enable HTTPS only
- Add CSP headers
- Validate all user inputs
- Use environment variables for sensitive data

### SEO & Accessibility
- Add proper meta tags
- Implement structured data
- Ensure keyboard navigation works
- Add proper ARIA labels

## 📊 Analytics & Monitoring

1. **Add Google Analytics:**
   \`\`\`bash
   npm install @next/third-parties
   \`\`\`

2. **Add Error Monitoring:**
   \`\`\`bash
   npm install @sentry/nextjs
   \`\`\`

3. **Performance Monitoring:**
   - Use Vercel Analytics
   - Add Core Web Vitals tracking

## 🔄 CI/CD Pipeline

### GitHub Actions for Auto-deployment:

\`\`\`yaml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm install
      - run: npm run build
      - uses: amondnet/vercel-action@v20
\`\`\`

## 📱 App Store Deployment

### Google Play Store:
1. Create developer account
2. Upload APK/AAB file
3. Fill app information
4. Set up store listing
5. Submit for review

### Alternative Distribution:
- Direct APK download from website
- F-Droid for open source
- Amazon Appstore
- Samsung Galaxy Store

## 🛠️ Maintenance

### Regular Updates:
- Update dependencies monthly
- Monitor Supabase usage
- Check for security vulnerabilities
- Update content and channels

### Backup Strategy:
- Database backups via Supabase
- Code backups via Git
- Media assets backup
- Configuration backups

## 📞 Support & Documentation

- Create user manual in Bengali
- Set up support email/contact
- Document API endpoints
- Create troubleshooting guide
