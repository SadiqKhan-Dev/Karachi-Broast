# 🍗 Karachi Broast — Fast Food Ordering Platform

A full-stack, production-ready fast food ordering web application built with **Next.js 14**, **Prisma**, **PostgreSQL (Neon)**, and **Clerk Authentication**. Features a sleek dark UI with zinc-950 + orange-500 design system, real-time cart, multi-step checkout, and a full admin dashboard.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=flat-square&logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-5.22-2D3748?style=flat-square&logo=prisma)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=flat-square&logo=tailwind-css)
![Clerk](https://img.shields.io/badge/Clerk-Auth-6C47FF?style=flat-square&logo=clerk)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-00E5B4?style=flat-square&logo=postgresql)

---

## ✨ Features

### Customer Features
- 🛒 **Smart Cart** — Add, remove, update quantities with persistent Zustand state
- 🔐 **Authentication** — Clerk-powered sign in / sign up with social login support
- 🍔 **Rich Menu** — 58+ products across 6 categories with search, filters & sorting
- 🎛️ **Product Customization** — Choose sizes, spice levels, and add-ons
- 💳 **Multi-Step Checkout** — Address entry, payment method selection, order confirmation
- 📦 **Order Tracking** — Real-time order status (Pending → Confirmed → Preparing → Delivered)
- 👤 **Account Dashboard** — Order history, saved addresses, account settings
- 🎟️ **Coupon System** — Discount codes with percentage and fixed-amount support

### Admin Features
- 📊 **Dashboard** — Revenue stats, order counts, and analytics overview
- 📋 **Order Management** — View, filter, and update order statuses in real-time
- 🍽️ **Product Management** — Add, edit, delete products with image uploads
- 👥 **Customer Management** — View customer base and order history

### Technical Features
- 🌙 **Full Dark Theme** — Zinc-950 background + Orange-500 brand color system
- 📱 **Fully Responsive** — Mobile-first design for all screen sizes
- 🔍 **SEO Optimized** — Meta tags, OpenGraph, sitemap.xml, robots.txt
- ⚡ **Server Components** — Next.js 14 App Router with streaming and Suspense
- 🛡️ **Type Safe** — Full TypeScript coverage across the entire codebase

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 14 (App Router) |
| **Language** | TypeScript 5.6 |
| **Styling** | Tailwind CSS + shadcn/ui |
| **Database** | PostgreSQL (Neon — serverless cloud) |
| **ORM** | Prisma 5 |
| **Authentication** | Clerk |
| **State Management** | Zustand |
| **Forms** | React Hook Form + Zod |
| **Payments** | Stripe |
| **File Uploads** | UploadThing |
| **Animations** | Framer Motion |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── about/              # About page
│   ├── account/            # User account dashboard
│   ├── admin/              # Admin panel
│   ├── api/                # API routes (orders, webhooks)
│   ├── careers/            # Careers page
│   ├── checkout/           # Multi-step checkout
│   ├── contact/            # Contact page with form
│   ├── menu/               # Menu with filters & search
│   ├── order-success/      # Post-order confirmation
│   ├── product/[slug]/     # Product detail page
│   ├── sign-in/[[...rest]] # Clerk sign-in (catch-all)
│   ├── sign-up/[[...rest]] # Clerk sign-up (catch-all)
│   ├── track-order/        # Order tracking
│   └── page.tsx            # Homepage
├── components/
│   ├── ui/                 # shadcn/ui primitives
│   ├── cart/               # Cart drawer component
│   ├── layout/             # Header, Footer, Navbar
│   ├── menu/               # Category nav, filters
│   └── products/           # Product cards
├── lib/                    # Prisma client, utils
└── store/                  # Zustand cart store
prisma/
├── schema.prisma           # Full database schema
└── seed.ts                 # 58 products, 6 categories, 5 coupons
```

---

## 🗄️ Database Schema

| Model | Description |
|---|---|
| `Product` | Menu items with customizations, images, pricing |
| `Category` | Product categories with slugs |
| `Order` | Customer orders with full status tracking |
| `OrderItem` | Line items within each order |
| `Address` | Delivery addresses linked to orders |
| `Coupon` | Discount codes (% or fixed amount) |
| `DeliveryZone` | Geographic delivery zones with fees |
| `Review` | Product ratings and reviews |

---

## 🚀 Getting Started (Local Development)

### Prerequisites
- Node.js 18+
- A [Neon](https://neon.tech) free PostgreSQL database
- A [Clerk](https://clerk.com) free account

### 1. Clone the repository

```bash
git clone https://github.com/SadiqKhan-Dev/Karachi-Broast.git
cd Karachi-Broast
npm install
```

### 2. Set up environment variables

Create `.env` in the root (for Prisma CLI):
```env
DATABASE_URL="postgresql://user:pass@ep-xxx.region.aws.neon.tech/neondb?sslmode=require"
```

Create `.env.local` in the root (for Next.js):
```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
CLERK_SECRET_KEY=sk_test_xxxxx
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

# Database
DATABASE_URL="postgresql://user:pass@ep-xxx.region.aws.neon.tech/neondb?sslmode=require"

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Stripe (optional)
STRIPE_SECRET_KEY=sk_test_xxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
```

### 3. Set up the database

```bash
npm run db:push     # Create tables in database
npm run db:seed     # Populate with 58 products
```

### 4. Start development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🌐 Deployment (Vercel)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → Import your GitHub repo
3. In **Environment Variables**, add all keys from your `.env.local`
4. Click **Deploy**

> The database (Neon) is already cloud-hosted — no extra setup needed for production.

---

## 📜 Available Scripts

```bash
npm run dev          # Start development server (localhost:3000)
npm run build        # Build for production
npm run start        # Start production server
npm run db:push      # Sync Prisma schema to database
npm run db:seed      # Seed database with sample products
npm run db:studio    # Open Prisma Studio (visual DB editor)
npm run db:generate  # Regenerate Prisma client
```

---

## 🔑 Environment Variables Reference

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | ✅ Yes | PostgreSQL connection string (Neon) |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | ✅ Yes | Clerk frontend key |
| `CLERK_SECRET_KEY` | ✅ Yes | Clerk backend key |
| `NEXT_PUBLIC_APP_URL` | ✅ Yes | Your app's public URL |
| `STRIPE_SECRET_KEY` | Optional | Stripe backend key |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Optional | Stripe frontend key |
| `STRIPE_WEBHOOK_SECRET` | Optional | Stripe webhook verification |
| `UPLOADTHING_SECRET` | Optional | File upload secret |
| `UPLOADTHING_APP_ID` | Optional | File upload app ID |

---

## 👨‍💻 Developer

**Sadiq Khan**
- GitHub: [@SadiqKhan-Dev](https://github.com/SadiqKhan-Dev)

---

## 📄 License

This project is for portfolio and educational purposes.
