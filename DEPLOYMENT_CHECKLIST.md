# ✅ DEPLOYMENT CHECKLIST

## Before Vercel Deploy
- [ ] Code is working on localhost (`npm run dev` works fine)
- [ ] Git repository is set up and connected to Vercel

## Vercel Environment Variables (MUST DO!)
Go to: Vercel Dashboard → Your Project → Settings → Environment Variables

Add these 8 variables:
- [ ] `NEXTAUTH_URL` = `https://your-project-name.vercel.app`
- [ ] `NEXTAUTH_SECRET` = `6f5a8c2d9e1b4f3a7c5e8d2b4a6f8c1e3a5b7c9d1e3f5a7b9c1d3e5f7a9b`
- [ ] `GITHUB_CLIENT_ID` = `Ov23liPcTIV9oqEeklwW`
- [ ] `GITHUB_CLIENT_SECRET` = `92d0c14024c3072714532514dabcefc0cbf012e1`
- [ ] `MONGODB_URI` = `mongodb+srv://Patreon:patreon123@cluster0.jelinbh.mongodb.net/getmeachai?retryWrites=true&w=majority`
- [ ] `NEXT_PUBLIC_RAZORPAY_KEY` = `rzp_test_S5jAYNP4rbbtMm`
- [ ] `RAZORPAY_KEY_ID` = `rzp_test_S5jAYNP4rbbtMm`
- [ ] `RAZORPAY_KEY_SECRET` = `GQ7t4d0r0QBDKN2d82Jkr0Fb`

⚠️ Replace `your-project-name` with your actual Vercel project name!

## GitHub OAuth Configuration
Go to: GitHub Settings → Developer Settings → OAuth Apps → Your App

- [ ] Authorization callback URL = `https://your-project-name.vercel.app/api/auth/callback/github`
- [ ] Client ID is correct
- [ ] Client Secret is correct

## Deploy Process
- [ ] Code is pushed to GitHub (`git push`)
- [ ] Vercel auto-deploys (check Deployments tab)
- [ ] Deployment shows "Ready" status (not "Building" or "Error")
- [ ] Build logs show no errors (check Build tab)

## Testing on Vercel
Visit: `https://your-project-name.vercel.app`

- [ ] Homepage loads (see "GetMeACoffee" with Login button)
- [ ] Login button works (redirects to GitHub)
- [ ] GitHub authentication works (can sign in)
- [ ] Dashboard loads after login
- [ ] Can view creator pages
- [ ] Can make payments

## If Something Breaks
- [ ] Check Vercel build logs for errors
- [ ] Verify all environment variables are set correctly
- [ ] Verify GitHub callback URL is correct
- [ ] Try manually triggering redeploy from Vercel dashboard
- [ ] Clear browser cache and try again (Ctrl+Shift+R)

---

## Your Vercel URL
```
https://get-me-a-coffee-ayush-git-main-ayush-bisens-projects-cc85794b.vercel.app
```

(Update bookmarks with your actual Vercel URL once deployment is ready!)
