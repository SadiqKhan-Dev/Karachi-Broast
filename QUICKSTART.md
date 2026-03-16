# 🚀 Quick Start Guide - Karachi Broast Platform

## ✅ Current Status

Your development server is **RUNNING** at: **http://localhost:3001**

The platform is currently in **Development Mode** without authentication. You can browse the menu, view products, and test the UI.

---

## 🔧 To Enable Full Functionality

### Step 1: Set Up Clerk Authentication (5 minutes)

1. **Visit [Clerk.com](https://dashboard.clerk.com)** and create a free account

2. **Create a new application:**
   - Click "Create Application"
   - Choose "Next.js" as framework
   - Name it "Karachi Broast" (or your preference)

3. **Get your API keys:**
   - Go to **API Keys** in the left sidebar
   - Copy the **Publishable key** (starts with `pk_test_`)
   - Copy the **Secret key** (starts with `sk_test_`)

4. **Update `.env.local`:**
   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_actual_key_here
   CLERK_SECRET_KEY=sk_test_your_actual_key_here
   ```

5. **Enable the middleware:**
   - Rename `src/middleware.disabled.ts` to `src/middleware.ts`
   - Or copy the content from the disabled file

---

### Step 2: Set Up Database (5 minutes)

**Option A: Local PostgreSQL**
```bash
# Install PostgreSQL locally or use existing installation
# Create database:
createdb fastfood

# Update .env.local:
DATABASE_URL="postgresql://postgres:password@localhost:5432/fastfood?schema=public"
```

**Option B: Cloud Database (Recommended for beginners)**

1. **Supabase (Free tier):**
   - Visit [supabase.com](https://supabase.com)
   - Create new project
   - Get connection string from **Settings > Database**
   - Update `.env.local` with the connection string

2. **Railway (Free tier):**
   - Visit [railway.app](https://railway.app)
   - Create new project → PostgreSQL
   - Get connection string from project settings
   - Update `.env.local`

**Then run:**
```bash
npm run db:generate
npm run db:push
npm run db:seed
```

---

### Step 3: Configure Stripe (Optional - for payments)

1. **Visit [Stripe.com](https://dashboard.stripe.com)** and create account

2. **Get API keys:**
   - Go to **Developers > API Keys**
   - Copy **Publishable key** (pk_test_...)
   - Copy **Secret key** (sk_test_...)

3. **Create webhook secret:**
   ```bash
   stripe listen --forward-to localhost:3001/api/webhooks/stripe
   ```
   Or use the Stripe CLI to generate a test webhook secret

4. **Update `.env.local`:**
   ```env
   STRIPE_SECRET_KEY=sk_test_your_key
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key
   STRIPE_WEBHOOK_SECRET=whsec_your_secret
   ```

---

### Step 4: UploadThing (Optional - for image uploads)

1. **Visit [UploadThing.com](https://uploadthing.com)**

2. **Create account and get keys**

3. **Update `.env.local`:**
   ```env
   UPLOADTHING_SECRET=sk_your_key
   UPLOADTHING_APP_ID=your_app_id
   ```

---

## 🎯 What Works Now (Without Setup)

✅ Browse home page  
✅ View menu and products  
✅ Search and filter products  
✅ View product details  
✅ Add to cart (UI only)  
✅ Checkout flow (UI only)  
✅ About and Contact pages  

## 🎯 What Requires Setup

❌ User authentication (requires Clerk)  
❌ Placing actual orders (requires database)  
❌ Payment processing (requires Stripe)  
❌ Image uploads (requires UploadThing)  
❌ Admin dashboard (requires authentication)  

---

## 📝 Quick Test Commands

```bash
# Check if server is running
curl http://localhost:3001

# Run database migrations
npm run db:push

# Seed database with sample data
npm run db:seed

# Open Prisma Studio (database GUI)
npm run db:studio
```

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3001
netstat -ano | findstr :3001
taskkill /F /PID <PID>
```

### Database Connection Error
- Verify DATABASE_URL is correct
- Ensure PostgreSQL is running
- Check firewall settings

### Clerk Error After Setup
- Verify keys are copied correctly (no extra spaces)
- Check domain is whitelisted in Clerk dashboard
- Restart dev server after changing .env.local

---

## 📚 Next Steps

1. **Complete the setup** using steps above
2. **Customize the menu** - Edit `prisma/seed.ts` or use admin dashboard
3. **Brand customization** - Edit colors in `tailwind.config.ts`
4. **Deploy to production** - Push to Vercel for easy hosting

---

## 🎨 Customization Tips

### Change Brand Colors
Edit `tailwind.config.ts`:
```typescript
brand: {
  50: "#fef2f2",
  100: "#fee2e2",
  // ... customize these
}
```

### Add New Menu Items
Option 1: Edit `prisma/seed.ts` and run `npm run db:seed`  
Option 2: Use the admin dashboard at `/admin`

### Modify Pages
All pages are in `src/app/` directory following Next.js App Router structure.

---

**Questions?** Check the main README.md for detailed documentation.
