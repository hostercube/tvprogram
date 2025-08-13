# 🚀 Smart TV Streaming App - Production Deployment Guide

## 📋 Prerequisites
- Vercel account
- Supabase account
- GitHub repository

## 🗄️ Supabase Setup

### 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Choose organization and enter project details
4. Wait for project to be ready

### 2. Database Setup
1. Go to SQL Editor in Supabase dashboard
2. Run the following scripts in order:
   - `scripts/01-create-tables.sql`
   - `scripts/02-create-default-admin.sql`
   - `scripts/03-create-admin-in-supabase.sql`

### 3. Authentication Setup
1. Go to Authentication → Settings
2. Enable Email authentication
3. Set Site URL to your Vercel domain
4. Add redirect URLs:
   - `https://your-app.vercel.app/auth/callback`
   - `http://localhost:3000/auth/callback` (for development)

### 4. Create Admin User
1. Go to Authentication → Users
2. Click "Add User"
3. Email: `admin@tvapp.com`
4. Password: `admin123`
5. Confirm email manually

## 🌐 Vercel Deployment

### 1. Connect Repository
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Choose "Next.js" framework

### 2. Environment Variables
Add these environment variables in Vercel dashboard:

\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000/auth/callback
\`\`\`

### 3. Deploy
1. Click "Deploy"
2. Wait for build to complete
3. Your app will be live at `https://your-app.vercel.app`

## 📱 Mobile App (APK) Setup

### Option 1: PWA (Recommended)
1. Your deployed app is already PWA-ready
2. Users can "Add to Home Screen" on mobile
3. Works like native app

### Option 2: Capacitor (Native APK)
1. Install Capacitor: `npm install @capacitor/core @capacitor/cli`
2. Add Android platform: `npx cap add android`
3. Build: `npm run build && npx cap sync`
4. Open in Android Studio: `npx cap open android`
5. Build APK in Android Studio

## 🔧 Production Checklist

### Security
- ✅ Environment variables configured
- ✅ CORS settings updated
- ✅ Authentication enabled
- ✅ Admin user created

### Performance
- ✅ Images optimized
- ✅ Static assets cached
- ✅ Database indexed
- ✅ API routes optimized

### Features
- ✅ Channel management
- ✅ HLS/M3U/Embed support
- ✅ Remote navigation
- ✅ Mobile responsive
- ✅ Admin panel
- ✅ Password reset

## 🎯 Post-Deployment Steps

1. **Test Admin Login**
   - Go to `/auth/login`
   - Use: `admin@tvapp.com` / `admin123`

2. **Add Sample Channels**
   - Login to admin panel
   - Add test channels with HLS/M3U URLs

3. **Test Remote Navigation**
   - Use keyboard arrows on desktop
   - Test on smart TV browser

4. **Mobile Testing**
   - Test responsive design
   - Add to home screen (PWA)

## 🆘 Troubleshooting

### Login Issues
- Check Supabase user exists
- Verify environment variables
- Check redirect URLs

### Video Playback Issues
- Ensure HLS URLs are valid
- Check CORS on video sources
- Test different stream formats

### Remote Navigation Issues
- Test keyboard navigation
- Check focus indicators
- Verify event listeners

## 📞 Support
For issues, check:
1. Vercel deployment logs
2. Supabase logs
3. Browser console errors
4. Network tab for API calls

---
**Your Smart TV Streaming App is now production-ready! 🎉**
