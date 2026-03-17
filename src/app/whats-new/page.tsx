import { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Sparkles, Bell, Flame, Tag, Clock, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ProductCard } from "@/components/products/product-card"
import { prisma } from "@/lib/prisma"

export const metadata: Metadata = {
  title: "What's New — Karachi Broast",
  description: "Discover our latest menu additions, new products and exciting updates from Karachi Broast.",
}

const updates = [
  {
    id: 1,
    type: "New Item",
    typeColor: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    icon: Flame,
    iconColor: "text-orange-400",
    title: "Korean Fried Chicken Burger is Here!",
    description: "Extra crispy double-fried chicken in a sweet & spicy gochujang glaze. A bold new flavour that's flying off the shelves.",
    date: "March 2025",
    tag: "Hot & New",
    href: "/product/korean-fried-chicken-burger",
  },
  {
    id: 2,
    type: "New Item",
    typeColor: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    icon: Sparkles,
    iconColor: "text-orange-400",
    title: "Lahori Chargha — A Desi Classic Returns",
    description: "Whole chicken marinated in authentic Lahori spices, steamed then deep fried to golden perfection. The taste of Lahore, delivered to your door.",
    date: "March 2025",
    tag: "Fan Favourite",
    href: "/product/lahori-chargha",
  },
  {
    id: 3,
    type: "New Item",
    typeColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    icon: Star,
    iconColor: "text-blue-400",
    title: "Kashmiri Chai Now on the Menu",
    description: "The iconic pink tea brewed with Kashmiri leaves, cardamom and topped with crushed pistachios. Warm, soothing and deeply nostalgic.",
    date: "March 2025",
    tag: "Beverages",
    href: "/product/kashmiri-chai",
  },
  {
    id: 4,
    type: "New Deal",
    typeColor: "bg-green-500/10 text-green-400 border-green-500/20",
    icon: Tag,
    iconColor: "text-green-400",
    title: "Game Night Box — Rs. 1299",
    description: "Cheesy Nachos + Mozzarella Sticks + 10 pcs Chicken Nuggets + Jalapeño Poppers + 3 Drinks. The ultimate snack spread for your squad.",
    date: "March 2025",
    tag: "Limited Deal",
    href: "/product/game-night-box",
  },
  {
    id: 5,
    type: "Update",
    typeColor: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    icon: Bell,
    iconColor: "text-purple-400",
    title: "Free Delivery Above Rs. 1000",
    description: "We've made it even easier to get your food. Order above Rs. 1000 and enjoy completely free delivery to your doorstep.",
    date: "February 2025",
    tag: "Offer",
    href: "/menu",
  },
  {
    id: 6,
    type: "Update",
    typeColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    icon: Clock,
    iconColor: "text-amber-400",
    title: "Extended Hours — Now Open Till 2 AM",
    description: "Late night cravings? We've got you covered. Karachi Broast is now open until 2 AM every day of the week.",
    date: "February 2025",
    tag: "Good News",
    href: "/contact",
  },
]

async function getNewProducts() {
  try {
    return await prisma.product.findMany({
      where: { isAvailable: true },
      include: { category: true },
      orderBy: { createdAt: "desc" },
      take: 8,
    })
  } catch {
    return []
  }
}

async function getFeaturedNewProducts() {
  try {
    return await prisma.product.findMany({
      where: { isFeatured: true, isAvailable: true },
      include: { category: true },
      orderBy: { createdAt: "desc" },
      take: 4,
    })
  } catch {
    return []
  }
}

export default async function WhatsNewPage() {
  const [newProducts, featuredProducts] = await Promise.all([
    getNewProducts(),
    getFeaturedNewProducts(),
  ])

  return (
    <main className="min-h-screen bg-zinc-950">

      {/* ─── HERO ─────────────────────────────────────────── */}
      <section className="relative py-20 overflow-hidden bg-zinc-950 border-b border-zinc-800">
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-orange-600/8 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-amber-500/6 rounded-full blur-[100px] pointer-events-none" />

        <div className="container relative z-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-2 mb-6">
              <Sparkles className="h-4 w-4 text-orange-400" />
              <span className="text-orange-400 text-sm font-medium">Fresh Updates</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-6">
              What&apos;s
              <span className="block text-gradient">New?</span>
            </h1>

            <p className="text-zinc-400 text-lg leading-relaxed max-w-lg mb-8">
              New products, exciting deals, and all the latest happenings from Karachi Broast — all in one place. Updated regularly.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="h-12 px-8 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold shadow-lg shadow-orange-500/25"
                asChild
              >
                <Link href="/menu">
                  Explore Full Menu
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 px-8 rounded-full border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white"
                asChild
              >
                <Link href="/menu?category=deals-combos">View Deals</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── UPDATES & ANNOUNCEMENTS ──────────────────────── */}
      <section className="py-20 bg-zinc-950">
        <div className="container">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-orange-500 text-sm font-semibold uppercase tracking-widest mb-2">Announcements</p>
              <h2 className="text-4xl font-black text-white">Latest Updates</h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {updates.map((update) => (
              <Link key={update.id} href={update.href} className="group">
                <div className="h-full bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-orange-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/5">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border ${update.typeColor}`}>
                      <update.icon className={`h-3.5 w-3.5 ${update.iconColor}`} />
                      {update.type}
                    </div>
                    <Badge variant="outline" className="text-xs text-zinc-500 border-zinc-700">
                      {update.tag}
                    </Badge>
                  </div>

                  <h3 className="text-white font-bold text-lg leading-snug mb-3 group-hover:text-orange-400 transition-colors">
                    {update.title}
                  </h3>

                  <p className="text-zinc-500 text-sm leading-relaxed mb-4">
                    {update.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-zinc-600">{update.date}</span>
                    <span className="text-orange-500 text-sm font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      Read more <ChevronRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── NEW ARRIVALS ─────────────────────────────────── */}
      {newProducts.length > 0 && (
        <section className="py-20 bg-zinc-900/40 border-y border-zinc-800">
          <div className="container">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-orange-500 text-sm font-semibold uppercase tracking-widest mb-2">Just Added</p>
                <h2 className="text-4xl font-black text-white">New Arrivals</h2>
              </div>
              <Button variant="ghost" className="text-zinc-400 hover:text-white" asChild>
                <Link href="/menu">
                  View All <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {newProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── FEATURED THIS MONTH ──────────────────────────── */}
      {featuredProducts.length > 0 && (
        <section className="py-20 bg-zinc-950">
          <div className="container">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-orange-500 text-sm font-semibold uppercase tracking-widest mb-2">Must Try</p>
                <h2 className="text-4xl font-black text-white">Featured This Month</h2>
              </div>
              <Button variant="ghost" className="text-zinc-400 hover:text-white" asChild>
                <Link href="/menu">
                  See All <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── NEWSLETTER / STAY UPDATED CTA ───────────────── */}
      <section className="py-20 bg-zinc-900/50 border-t border-zinc-800">
        <div className="container">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-zinc-900 to-zinc-800 border border-zinc-700 p-10 md:p-16 text-center">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-orange-500/10 rounded-full blur-[80px]" />
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-orange-500/10 border border-orange-500/20 mb-6 mx-auto">
                <Bell className="h-7 w-7 text-orange-400" />
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
                Never Miss an Update
              </h2>
              <p className="text-zinc-400 text-lg mb-8 max-w-md mx-auto">
                Follow us on social media or check back here regularly for new menu drops, limited-time deals and exclusive offers.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  size="lg"
                  className="h-12 px-8 rounded-full bg-orange-500 hover:bg-orange-600 font-bold shadow-lg shadow-orange-500/25"
                  asChild
                >
                  <Link href="/menu">Order Now</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 px-8 rounded-full border-zinc-600 text-zinc-300 hover:bg-zinc-800"
                  asChild
                >
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}
