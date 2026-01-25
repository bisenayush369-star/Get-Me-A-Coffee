# Vercel Deployment Setup Guide

## Environment Variables Required on Vercel

Go to your Vercel project dashboard → Settings → Environment Variables

Add these variables:

### NextAuth Configuration
```
NEXTAUTH_URL=https://your-app.vercel.app
NEXTAUTH_SECRET=6f5a8c2d9e1b4f3a7c5e8d2b4a6f8c1e3a5b7c9d1e3f5a7b9c1d3e5f7a9b
```

### GitHub OAuth
```
GITHUB_CLIENT_ID=Ov23liPcTIV9oqEeklwW
GITHUB_CLIENT_SECRET=92d0c14024c3072714532514dabcefc0cbf012e1
```

### MongoDB
```
MONGODB_URI=mongodb+srv://Patreon:patreon123@cluster0.jelinbh.mongodb.net/getmeachai?retryWrites=true&w=majority
```

### Razorpay
```
NEXT_PUBLIC_RAZORPAY_KEY=rzp_test_S5jAYNP4rbbtMm
RAZORPAY_KEY_ID=rzp_test_S5jAYNP4rbbtMm
RAZORPAY_KEY_SECRET=GQ7t4d0r0QBDKN2d82Jkr0Fb
```

## Steps to Add Environment Variables on Vercel:

1. Go to https://vercel.com/dashboard
2. Select your project
3. Click "Settings" tab
4. Click "Environment Variables" in the left sidebar
5. Add each variable one by one
6. After adding all variables, redeploy your project

## How to Redeploy:

Option A: Via Git Push
- Simply push to your connected Git repository and Vercel will auto-deploy

Option B: Via Vercel Dashboard
- Go to Deployments tab
- Click the three dots on the latest deployment
- Select "Redeploy"

## Verify Deployment:

After redeployment:
1. Visit your Vercel URL
2. Click "Login" button
3. You should be redirected to GitHub OAuth
4. After authentication, you should see your dashboard

## If Still Getting Errors:

Check these things:
1. Make sure NEXTAUTH_URL matches your Vercel domain exactly
2. Verify GitHub callback URL includes `/api/auth/callback/github`
3. Check Vercel deployment logs for any errors
4. Clear browser cache and try again
