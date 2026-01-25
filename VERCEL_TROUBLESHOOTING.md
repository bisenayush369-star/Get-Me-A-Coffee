# Fix NextAuth Error on Vercel - Complete Checklist

## Problem
```
[next-auth][error][CLIENT_FETCH_ERROR] "Unexpected token '<', "<!DOCTYPE ..." is not valid JSON
```

This means the `/api/auth/session` endpoint is returning HTML instead of JSON, which happens when:
- NEXTAUTH_SECRET is missing
- NEXTAUTH_URL is incorrect
- GitHub credentials are not set

---

## Solution Checklist

### ✅ Step 1: Add Environment Variables to Vercel

1. Go to [https://vercel.com/dashboard](https://vercel.com/dashboard)
2. Click on your project
3. Go to **Settings** → **Environment Variables**
4. Add these variables:

| Variable | Value |
|----------|-------|
| `NEXTAUTH_URL` | `https://YOUR-PROJECT-NAME.vercel.app` |
| `NEXTAUTH_SECRET` | `6f5a8c2d9e1b4f3a7c5e8d2b4a6f8c1e3a5b7c9d1e3f5a7b9c1d3e5f7a9b` |
| `GITHUB_CLIENT_ID` | `Ov23liPcTIV9oqEeklwW` |
| `GITHUB_CLIENT_SECRET` | `92d0c14024c3072714532514dabcefc0cbf012e1` |
| `MONGODB_URI` | `mongodb+srv://Patreon:patreon123@cluster0.jelinbh.mongodb.net/getmeachai?retryWrites=true&w=majority` |
| `NEXT_PUBLIC_RAZORPAY_KEY` | `rzp_test_S5jAYNP4rbbtMm` |
| `RAZORPAY_KEY_ID` | `rzp_test_S5jAYNP4rbbtMm` |
| `RAZORPAY_KEY_SECRET` | `GQ7t4d0r0QBDKN2d82Jkr0Fb` |

⚠️ **IMPORTANT**: Replace `YOUR-PROJECT-NAME` with your actual Vercel project name!

### ✅ Step 2: Update GitHub OAuth Callback URL

1. Go to [https://github.com/settings/developers](https://github.com/settings/developers)
2. Click "OAuth Apps"
3. Select your app
4. Update **Authorization callback URL**:
   - Old: `http://localhost:3000/api/auth/callback/github`
   - New: `https://YOUR-PROJECT-NAME.vercel.app/api/auth/callback/github`
5. Click **Update application**

### ✅ Step 3: Redeploy on Vercel

Option A: **Auto-redeploy via Git**
```bash
git add .
git commit -m "Add environment variable configuration for production"
git push
```
Vercel will automatically redeploy.

Option B: **Manual redeploy via dashboard**
1. Go to Vercel Dashboard
2. Click **Deployments**
3. Find the latest deployment
4. Click the **...** menu
5. Click **Redeploy**

### ✅ Step 4: Verify Deployment

1. Wait for deployment to complete (check Deployments tab)
2. Visit your Vercel URL: `https://YOUR-PROJECT-NAME.vercel.app`
3. Click **Login**
4. You should be redirected to GitHub OAuth
5. Authenticate with your GitHub account
6. You should see your dashboard

---

## Troubleshooting

### Still Getting HTML Error?

**Check Vercel Logs:**
1. Go to Deployments
2. Click on the latest deployment
3. Click **Runtime Logs**
4. Look for errors related to NEXTAUTH_SECRET or GitHub

**Common Issues:**
- ❌ NEXTAUTH_URL has `www.` or trailing slash
  - ✅ Use: `https://myapp.vercel.app` (no www, no trailing slash)

- ❌ GitHub callback URL doesn't match
  - ✅ Must be: `https://YOUR-PROJECT-NAME.vercel.app/api/auth/callback/github`

- ❌ Environment variables not set
  - ✅ Verify all variables are in Vercel Settings → Environment Variables

### GitHub Login Not Working?

1. Clear browser cache and cookies
2. Try incognito/private window
3. Verify GitHub callback URL matches your Vercel domain exactly
4. Check Vercel runtime logs for detailed error messages

---

## Your Vercel Project Info

- **Project URL**: `https://your-vercel-app.vercel.app`
- **API Auth Endpoint**: `https://your-vercel-app.vercel.app/api/auth`
- **GitHub Callback**: `https://your-vercel-app.vercel.app/api/auth/callback/github`

Replace `your-vercel-app` with your actual project name!

---

## Need Help?

If you still have issues:
1. Check Vercel deployment logs
2. Verify all environment variables are correctly set
3. Make sure GitHub OAuth credentials are valid
4. Confirm NEXTAUTH_URL matches your actual Vercel domain
