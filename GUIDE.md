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
3. Copy **Secret key** and **Publishable key** from the API Keys section

### Step 2 — Add to local .env.local
```env
STRIPE_SECRET_KEY=<your-stripe-secret-key>
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=<your-stripe-publishable-key>
STRIPE_WEBHOOK_SECRET=<your-stripe-webhook-secret>
```

### Step 3 — Add to Vercel
1. Vercel Dashboard → Settings → Environment Variables
2. Add these 3 variables
3. Redeploy

---

## 6. UploadThing — File Uploads Setup & Usage

UploadThing is already integrated in this project for uploading product images, avatars, and review images.

---

### Step 1 — Create UploadThing Account

1. Go to **https://uploadthing.com**
2. Sign up or log in
3. Click **"Create a new app"**
4. Give it a name e.g. `karachi-broast`

---

### Step 2 — Get Your API Keys

In your UploadThing dashboard:
1. Open your app
2. Click **API Keys** tab
3. Copy all three values:

| Key | Where to find |
|-----|--------------|
| `UPLOADTHING_TOKEN` | API Keys tab — main token |
| `UPLOADTHING_SECRET` | API Keys tab — secret key |
| `UPLOADTHING_APP_ID` | API Keys tab — App ID |

---

### Step 3 — Add Keys to `.env` and `.env.local`

Open both `.env` and `.env.local` and fill in:

```env
UPLOADTHING_SECRET=<your-uploadthing-secret>
UPLOADTHING_APP_ID=<your-uploadthing-app-id>
UPLOADTHING_TOKEN=<your-uploadthing-token>
```

> **Note:** `UPLOADTHING_TOKEN` is the most important key in newer versions. Add all three to be safe.

---

### Step 4 — Add to Vercel (Production)

1. Go to **https://vercel.com/dashboard**
2. Open your **Karachi-Broast** project
3. **Settings → Environment Variables**
4. Add these 3 variables with the same values:
   - `UPLOADTHING_SECRET`
   - `UPLOADTHING_APP_ID`
   - `UPLOADTHING_TOKEN`
5. Click **Redeploy** for changes to take effect

---

### How It Works in This Project

Everything is already set up. These files are pre-configured:

| File | Purpose |
|------|---------|
| `src/lib/uploadthing.ts` | Defines upload routes (what files are allowed) |
| `src/app/api/uploadthing/route.ts` | API endpoint UploadThing communicates with |

**Three upload routes are available:**

| Route name | Use case | Max size | Max files |
|------------|----------|----------|-----------|
| `productImageUploader` | Upload product photos in admin | 4MB | 4 images |
| `avatarUploader` | User profile pictures | 2MB | 1 image |
| `reviewImageUploader` | Images attached to reviews | 4MB | 4 images |

---

### Step 5 — Using UploadThing in a Component

To add an upload button anywhere in your app:

```tsx
import { UploadButton } from "@uploadthing/react"
import type { OurFileRouter } from "@/lib/uploadthing"

export function ProductImageUpload() {
  return (
    <UploadButton<OurFileRouter, "productImageUploader">
      endpoint="productImageUploader"
      onClientUploadComplete={(res) => {
        // res[0].url gives you the uploaded image URL
        console.log("Uploaded URL:", res[0].url)
      }}
      onUploadError={(error) => {
        console.error("Upload failed:", error.message)
      }}
    />
  )
}
```

---

### Step 6 — Test It Locally

1. Make sure `.env.local` has all 3 keys filled
2. Start dev server:
```bash
npm run dev
```
3. The upload endpoint is live at: `http://localhost:3000/api/uploadthing`
4. Try uploading an image through the admin panel or any component using `UploadButton`

---

### Common UploadThing Errors

| Error | Fix |
|-------|-----|
| `Invalid token` | Check `UPLOADTHING_TOKEN` in `.env.local` is correct |
| `Unauthorized` | Make sure user is logged in (auth check in middleware) |
| `File too large` | Reduce image size or increase `maxFileSize` in `src/lib/uploadthing.ts` |
| Works locally but not on Vercel | Add all 3 keys to Vercel Environment Variables and redeploy |

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
