import { Metadata } from "next"
import Link from "next/link"
import { ChevronRight, Clock, Truck, Shield, Star, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ProductCard } from "@/components/products/product-card"
import { prisma } from "@/lib/prisma"

export const metadata: Metadata = {
  title: "Karachi Broast — Taste the Difference",
  description: "Order the crispiest broast, burgers, pizza and more. Fast delivery across Karachi.",
}

const categories = [
  { name: "Broast & Chicken", slug: "broast-chicken", icon: "🍗", image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=500" },
  { name: "Burgers", slug: "burgers", icon: "🍔", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500" },
  { name: "Pizza", slug: "pizza", icon: "🍕", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500" },
  { name: "Sides", slug: "sides-snacks", icon: "🍟", image: "https://images.unsplash.com/photo-1630384060421-a4323ce5663e?w=500" },
  { name: "Deals", slug: "deals-combos", icon: "🎁", image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500" },
  { name: "Beverages", slug: "beverages", icon: "🥤", image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500" },
]

async function getFeaturedProducts() {
  try {
    return await prisma.product.findMany({
      where: { isFeatured: true, isAvailable: true },
      include: { category: true },
      take: 4,
      orderBy: { createdAt: "desc" },
    })
  } catch {
    return []
  }
}

async function getPopularProducts() {
  try {
    return await prisma.product.findMany({
      where: { isPopular: true, isAvailable: true },
      include: { category: true },
      take: 8,
    })
  } catch {
    return []
  }
}

export default async function HomePage() {
  const [featuredProducts, popularProducts] = await Promise.all([
    getFeaturedProducts(),
    getPopularProducts(),
  ])

  return (
    <main className="min-h-screen bg-zinc-950">
      {/* ─── HERO ─────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-zinc-950">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-orange-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-amber-500/8 rounded-full blur-[100px] pointer-events-none" />

        <div className="container relative z-10 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Text */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-2">
                <span className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
                <span className="text-orange-400 text-sm font-medium tracking-wide">Karachi&apos;s #1 Fast Food</span>
              </div>

              <div>
                <h1 className="text-6xl md:text-7xl xl:text-8xl font-black text-white leading-[0.9] tracking-tight">
                  TASTE
                  <span className="block text-gradient">THE DIFF-</span>
                  <span className="block text-white">ERENCE</span>
                </h1>
              </div>

              <p className="text-zinc-400 text-lg leading-relaxed max-w-md">
                Crispy. Juicy. Unforgettable. Our secret recipes have satisfied over 500,000 customers since 2010. Every bite tells a story.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="h-14 px-10 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-base shadow-lg shadow-orange-500/25 transition-all hover:shadow-orange-500/40 hover:scale-105"
                  asChild
                >
                  <Link href="/menu">
                    Order Now
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-14 px-10 rounded-full border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white font-semibold text-base"
                  asChild
                >
                  <Link href="/menu?category=deals-combos">View Deals</Link>
                </Button>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-8 pt-4">
                {[
                  { val: "500K+", label: "Customers" },
                  { val: "30 min", label: "Avg Delivery" },
                  { val: "4.9★", label: "Rating" },
                ].map((s, i) => (
                  <div key={s.label} className="flex items-center gap-6">
                    {i > 0 && <div className="w-px h-10 bg-zinc-800" />}
                    <div>
                      <p className="text-2xl font-black text-white">{s.val}</p>
                      <p className="text-xs text-zinc-500 uppercase tracking-widest">{s.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Image */}
            <div className="hidden lg:flex items-center justify-center relative">
              <div className="relative w-[500px] h-[500px]">
                {/* Glow ring */}
                <div className="absolute inset-8 rounded-full border-2 border-orange-500/20 animate-pulse" />
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-amber-500/5 rounded-full blur-2xl" />
                <img
                  src="https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=700"
                  alt="Karachi Special Broast"
                  className="relative z-10 w-full h-full object-cover rounded-3xl shadow-2xl shadow-orange-900/40 animate-float"
                />
                {/* Floating badge */}
                <div className="absolute -top-4 -right-4 z-20 bg-orange-500 text-white rounded-2xl p-4 shadow-xl shadow-orange-500/30">
                  <p className="text-xs font-medium opacity-80">Special</p>
                  <p className="text-xl font-black">Rs 899</p>
                </div>
                <div className="absolute -bottom-4 -left-4 z-20 bg-zinc-900 border border-zinc-700 text-white rounded-2xl p-4 shadow-xl">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-orange-500/20 flex items-center justify-center">
                      <Clock className="h-4 w-4 text-orange-400" />
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500">Ready in</p>
                      <p className="text-sm font-bold">15 minutes</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-zinc-950 to-transparent" />
      </section>

      {/* ─── CATEGORIES ───────────────────────────────────── */}
      <section className="py-20 bg-zinc-950">
        <div className="container">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-orange-500 text-sm font-semibold uppercase tracking-widest mb-2">Browse</p>
              <h2 className="text-4xl font-black text-white">Our Menu</h2>
            </div>
            <Button variant="ghost" className="text-zinc-400 hover:text-white" asChild>
              <Link href="/menu">
                View All <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <Link key={cat.slug} href={`/menu?category=${cat.slug}`} className="group">
                <div className="relative overflow-hidden rounded-2xl aspect-square bg-zinc-900 border border-zinc-800 hover:border-orange-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/10">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-110 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/30 to-transparent" />
                  <div className="absolute inset-0 flex flex-col items-center justify-end p-4">
                    <span className="text-3xl mb-2">{cat.icon}</span>
                    <p className="text-white font-semibold text-sm text-center leading-tight">{cat.name}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED PRODUCTS ────────────────────────────── */}
      {featuredProducts.length > 0 && (
        <section className="py-20 bg-zinc-900/50">
          <div className="container">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-orange-500 text-sm font-semibold uppercase tracking-widest mb-2">Chef&apos;s Pick</p>
                <h2 className="text-4xl font-black text-white">Featured Items</h2>
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

      {/* ─── WHY US STRIP ─────────────────────────────────── */}
      <section className="py-16 border-y border-zinc-800 bg-zinc-950">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Zap, label: "30–45 Min Delivery", sub: "Hot & fresh to your door" },
              { icon: Truck, label: "Free Delivery", sub: "On orders above Rs. 1000" },
              { icon: Star, label: "4.9 Star Rating", sub: "Loved by 500K+ customers" },
              { icon: Shield, label: "Quality Guaranteed", sub: "Or your money back" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center flex-shrink-0">
                  <item.icon className="h-6 w-6 text-orange-400" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{item.label}</p>
                  <p className="text-zinc-500 text-xs mt-0.5">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── POPULAR NOW ──────────────────────────────────── */}
      {popularProducts.length > 0 && (
        <section className="py-20 bg-zinc-950">
          <div className="container">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-orange-500 text-sm font-semibold uppercase tracking-widest mb-2">Trending</p>
                <h2 className="text-4xl font-black text-white">Popular Now</h2>
              </div>
              <Button variant="ghost" className="text-zinc-400 hover:text-white" asChild>
                <Link href="/menu?sort=popular">
                  See All <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {popularProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── DEALS BANNER ─────────────────────────────────── */}
      <section className="py-16 bg-zinc-900/50">
        <div className="container">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-600 to-amber-500 p-10 md:p-16">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full translate-y-1/2 -translate-x-1/2" />
            </div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <Badge className="bg-white/20 text-white border-0 mb-4">Limited Time</Badge>
                <h2 className="text-3xl md:text-5xl font-black text-white mb-3">
                  Family Feast Deal
                </h2>
                <p className="text-white/80 text-lg max-w-md">
                  8 pcs Broast + 4 Burgers + 2 Fries + Drinks. Feeds 4–5 people for just Rs. 2999.
                </p>
              </div>
              <div className="flex flex-col items-center gap-4 flex-shrink-0">
                <div className="text-center">
                  <p className="text-white/60 text-sm line-through">Rs. 4199</p>
                  <p className="text-5xl font-black text-white">Rs. 2999</p>
                </div>
                <Button
                  size="lg"
                  className="bg-white text-orange-600 hover:bg-white/90 font-bold h-14 px-10 rounded-full"
                  asChild
                >
                  <Link href="/product/family-feast-deal">Order Now</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────────── */}
      <section className="py-24 bg-zinc-950">
        <div className="container text-center">
          <p className="text-orange-500 text-sm font-semibold uppercase tracking-widest mb-4">Ready?</p>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
            What Are You<br />
            <span className="text-gradient">Waiting For?</span>
          </h2>
          <p className="text-zinc-400 text-lg mb-10 max-w-2xl mx-auto">
            Join 500,000+ happy customers. Order now and get your food delivered hot and fresh within 30–45 minutes.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              className="h-14 px-12 rounded-full bg-orange-500 hover:bg-orange-600 font-bold text-base shadow-lg shadow-orange-500/25"
              asChild
            >
              <Link href="/menu">Browse Full Menu</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-14 px-12 rounded-full border-zinc-700 text-zinc-300 hover:bg-zinc-900"
              asChild
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
