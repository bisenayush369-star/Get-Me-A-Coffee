# Quick Fix for Vercel NextAuth Error

## The Problem
Your app works on localhost but gives this error on Vercel:
```
[next-auth][error][CLIENT_FETCH_ERROR] "Unexpected token '<'"
```

## The Root Cause
**Environment variables are not set on Vercel**. Vercel uses `.env.local` only for development, not production.

## Quick 3-Step Fix

### 1️⃣ Go to Vercel Project Settings
- Visit [vercel.com/dashboard](https://vercel.com/dashboard)
- Select your project
- Click **Settings** → **Environment Variables**

### 2️⃣ Add These 8 Variables

Copy and paste each one:

```
NEXTAUTH_URL=https://your-vercel-project.vercel.app
NEXTAUTH_SECRET=6f5a8c2d9e1b4f3a7c5e8d2b4a6f8c1e3a5b7c9d1e3f5a7b9c1d3e5f7a9b
GITHUB_CLIENT_ID=Ov23liPcTIV9oqEeklwW
GITHUB_CLIENT_SECRET=92d0c14024c3072714532514dabcefc0cbf012e1
MONGODB_URI=mongodb+srv://Patreon:patreon123@cluster0.jelinbh.mongodb.net/getmeachai?retryWrites=true&w=majority
NEXT_PUBLIC_RAZORPAY_KEY=rzp_test_S5jAYNP4rbbtMm
RAZORPAY_KEY_ID=rzp_test_S5jAYNP4rbbtMm
RAZORPAY_KEY_SECRET=GQ7t4d0r0QBDKN2d82Jkr0Fb
```

⚠️ **IMPORTANT**: Replace `your-vercel-project` with your actual Vercel project name!

### 3️⃣ Redeploy
- Go to **Deployments** tab
- Click the latest deployment
- Click **...** → **Redeploy**
- Wait for it to finish

---

## Also Update GitHub OAuth

1. Go to [github.com/settings/developers](https://github.com/settings/developers)
2. Click your OAuth app
3. Change Authorization callback URL to:
   ```
   https://your-vercel-project.vercel.app/api/auth/callback/github
   ```
4. Click **Update application**

---

## ✅ Done!

Visit your Vercel site and login should work now. If not, check the detailed troubleshooting guide in `VERCEL_TROUBLESHOOTING.md`
