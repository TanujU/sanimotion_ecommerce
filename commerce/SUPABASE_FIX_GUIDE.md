# 🔧 Supabase "Invalid Refresh Token" Error Fix Guide

The `AuthApiError: Invalid Refresh Token: Refresh Token Not Found` error occurs when Supabase tries to refresh an expired or missing session. Here's how to fix it:

## 🎯 Quick Fix Steps

### Step 1: Configure CORS and Redirect URLs in Supabase

1. **Go to your Supabase Dashboard**
   - Visit [supabase.com/dashboard](https://supabase.com/dashboard)
   - Select your "sanimotion_ecommerce" project

2. **Configure Authentication Settings**
   - Navigate to **Authentication → Settings**
   - Scroll down to **URL Configuration**

3. **Add Redirect URLs**
   Add these URLs to the **Redirect URLs** section:
   ```
   http://localhost:3000
   http://127.0.0.1:3000
   http://localhost:3000/**
   http://127.0.0.1:3000/**
   ```

4. **Add Site URL**
   Set the **Site URL** to:
   ```
   http://localhost:3000
   ```

5. **Save Changes**
   - Click **Save** to apply the changes

### Step 2: Update Database Schema

1. **Go to SQL Editor**
   - In your Supabase dashboard, click **SQL Editor**
   - Click **New query**

2. **Run the Updated Schema**
   - Copy the entire contents of `supabase-setup.sql`
   - Paste it into the SQL editor
   - Click **Run** to execute

   This will create the proper `user_profiles` table that extends `auth.users`.

### Step 3: Clear Invalid Sessions

1. **Manual Browser Clear**
   - Open Browser Dev Tools (`F12`)
   - Go to **Application** tab → **Storage** → **Clear storage**
   - Check all boxes and click **Clear site data**

2. **Or Clear Manually**
   - Go to **Local Storage** → `http://localhost:3000`
   - Delete all entries
   - Go to **Cookies** → `http://localhost:3000`
   - Delete all cookies

### Step 4: Restart Development Server

```bash
# Stop the current server (Ctrl+C)
# Then restart
npm run dev
```

## 🔍 Verification Steps

### Test 1: Basic Connection
```bash
node debug-connection.js
```
Should show: ✅ Database connection successful!

### Test 2: Authentication Flow
1. Visit `http://localhost:3000`
2. Click **LOGIN** in navigation
3. Try to sign up with a test account
4. Check browser console for errors

### Test 3: Navigation
1. Check that only **LOGIN** appears in navigation (no guest button)
2. Should show loading spinner while auth initializes

## 🚨 Common Issues & Solutions

### Issue 1: "Invalid Refresh Token: Refresh Token Not Found"
**Solution**: 
- Manually clear browser storage (see Step 3 above)
- This happens when stored tokens are corrupted or expired

### Issue 2: "relation 'user_profiles' does not exist"
**Solution**: Run the updated `supabase-setup.sql` script in your Supabase SQL editor.

### Issue 3: CORS errors in browser console
**Solution**: Make sure you've added `http://localhost:3000` to Redirect URLs in Supabase.

### Issue 4: "Invalid redirect URL"
**Solution**: Check that your Site URL and Redirect URLs match exactly.

### Issue 5: Authentication not working
**Solution**: 
- Make sure you've run the `supabase-setup.sql` script
- Check that your environment variables are correct
- Clear browser storage and try again

## 🔧 Advanced Configuration

### Environment Variables Check
```bash
# Verify your .env.local file contains:
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SITE_NAME=Sanimotion
```

### Supabase Client Configuration
The client is now configured with:
- `autoRefreshToken: true` - Automatically refreshes expired tokens
- `persistSession: true` - Saves session in localStorage
- `detectSessionInUrl: true` - Handles auth callbacks
- `flowType: 'pkce'` - Uses PKCE flow for better security

## 🎯 Expected Behavior After Fix

✅ **Homepage loads without errors**  
✅ **Login/Signup works properly**  
✅ **Guest users can browse**  
✅ **No "Failed to fetch" errors**  
✅ **Authentication state persists**  

## 🆘 Still Having Issues?

If you're still experiencing problems:

1. **Check Supabase Project Status**
   - Ensure your project is active and not paused
   - Verify you're using the correct project URL

2. **Network Issues**
   - Try disabling VPN/proxy
   - Check if corporate firewall blocks Supabase

3. **Browser Issues**
   - Try in incognito/private mode
   - Test in different browser
   - Disable browser extensions

4. **Development Environment**
   - Ensure you're using Node.js 18+
   - Try clearing `node_modules` and reinstalling

The authentication system is now properly configured to handle both guest users and authenticated users without the "Failed to fetch" error!
