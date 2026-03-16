# Karachi Broast — Complete Project Guide

## Quick Links
- **Live Site**: https://karachi-broast.vercel.app
- **GitHub**: https://github.com/SadiqKhan-Dev/Karachi-Broast
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Neon Database**: https://console.neon.tech
- **Clerk Auth**: https://dashboard.clerk.com

---

## 1. Local Development (Daily Use)

### Start the project
```bash
cd "E:\VS-CODES\charity and volunteering\Fast-Food"
npm run dev
```
Open: http://localhost:3000

### Stop the project
Press `Ctrl + C` in terminal

---

## 2. Database Commands

### Sync schema changes to database
```bash
# Stop dev server first (Ctrl+C), then:
npm run db:push
npm run dev
```

### Add/Reset seed data (products, categories)
```bash
npm run db:seed
```

### Open visual database editor
```bash
npm run db:studio
```
Opens: http://localhost:5555

### Regenerate Prisma client (after schema changes)
```bash
npx prisma generate
```

---

## 3. Push Code to GitHub

```bash
git add .
git commit -m "your message here"
git push
```

> Vercel automatically deploys after every push to `main` branch.

---

## 4. Vercel Deployment

### Auto Deploy
Every `git push` automatically triggers a new deployment on Vercel.

### Manual Redeploy
1. Go to https://vercel.com/dashboard
2. Open **Karachi-Broast** project
3. Click **Deployments** tab
4. Click `...` on latest → **Redeploy**

### Add/Update Environment Variables
1. Vercel Dashboard → Project → **Settings**
2. Click **Environment Variables**
3. Add or edit any variable
4. **Redeploy** for changes to take effect

### Current Environment Variables on Vercel
| Variable | Value |
|---|---|
| `DATABASE_URL` | Neon PostgreSQL URL |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk frontend key |
| `CLERK_SECRET_KEY` | Clerk backend key |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | `/sign-in` |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | `/sign-up` |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL` | `/` |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL` | `/` |
| `NEXT_PUBLIC_APP_URL` | `https://karachi-broast.vercel.app` |

---

## 5. Adding Stripe (Payments) Later

### Step 1 — Get Stripe Keys
1. Go to https://dashboard.stripe.com
2. **Developers** → **API Keys**
3. Copy **Secret key** (`sk_test_...`) and **Publishable key** (`pk_test_...`)

### Step 2 — Add to local .env.local
```env
STRIPE_SECRET_KEY=sk_test_your-key-here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your-key-here
STRIPE_WEBHOOK_SECRET=whsec_your-webhook-secret
```

### Step 3 — Add to Vercel
1. Vercel Dashboard → Settings → Environment Variables
2. Add these 3 variables
3. Redeploy

---

## 6. Adding UploadThing (Product Images) Later

### Step 1 — Get Keys
1. Go to https://uploadthing.com
2. Create account → New App
3. Copy **Secret** and **App ID**

### Step 2 — Add to .env.local
```env
UPLOADTHING_SECRET=sk_live_your-secret
UPLOADTHING_APP_ID=your-app-id
```

### Step 3 — Add to Vercel
Same as Stripe — add in Environment Variables then redeploy.

---

## 7. Clerk Authentication

### Add Production Domain (IMPORTANT)
After deployment, add your Vercel URL to Clerk:
1. https://dashboard.clerk.com → Your App
2. **Domains** → **Add domain**
3. Add: `karachi-broast.vercel.app`

### Create Admin User
1. Clerk Dashboard → **Users**
2. Find your user → **Edit**
3. **Metadata** (Public) → add:
```json
{ "role": "admin" }
```
Now you can access `/admin` route.

---

## 8. Common Errors & Fixes

### "EPERM: operation not permitted" (Prisma)
Dev server chal raha hai — pehle band karo:
```bash
Ctrl+C
npx prisma generate
npm run dev
```

### Products show nahi ho rahe (Menu page)
```bash
npm run db:seed
```

### Build fail on Vercel
Check build logs in Vercel Dashboard → Deployments → Latest → Build Logs

### Database slow (cold start)
Normal hai — Neon free tier auto-sleep karta hai. Pehli request slow hogi, baad mein fast.

### Sign-in not working on production
Clerk dashboard pe production domain add karo (Section 7 dekho).

---

## 9. Project File Structure

```
Fast-Food/
├── src/
│   ├── app/          — Pages (menu, checkout, account, admin...)
│   ├── components/   — Reusable UI components
│   ├── lib/          — Database, utils
│   └── stores/       — Cart state (Zustand)
├── prisma/
│   ├── schema.prisma — Database schema
│   └── seed.ts       — Sample products data
├── .env              — Prisma CLI only (NOT pushed to GitHub)
├── .env.local        — All env variables (NOT pushed to GitHub)
├── next.config.mjs   — Next.js config
└── package.json      — Scripts and dependencies
```

---

## 10. Adding New Products

### Option A — Edit seed file and re-seed
1. Open `prisma/seed.ts`
2. Add product in the correct category array
3. Run: `npm run db:seed`

### Option B — Prisma Studio (Visual)
```bash
npm run db:studio
```
1. Open http://localhost:5555
2. Click **Product** table
3. Click **Add record**
4. Fill in details and save

---

## 11. Useful Commands Cheatsheet

```bash
npm run dev          # Start local server
npm run build        # Test production build locally
npm run db:push      # Sync database schema
npm run db:seed      # Add sample products
npm run db:studio    # Visual database editor
git add .            # Stage all changes
git commit -m "msg"  # Commit changes
git push             # Push to GitHub (auto-deploys to Vercel)
```
