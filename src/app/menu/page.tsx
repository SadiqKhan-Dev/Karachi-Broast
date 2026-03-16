import { Metadata } from "next"
import { Suspense } from "react"
import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import { ProductCard } from "@/components/products/product-card"
import { MenuFilters } from "@/components/menu/menu-filters"
import { CategoryNav } from "@/components/menu/category-nav"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export const metadata: Metadata = {
  title: "Menu",
  description: "Browse our full menu of delicious fast food items",
}

interface MenuPageProps {
  searchParams: Promise<{
    category?: string
    search?: string
    sort?: string
    minPrice?: string
    maxPrice?: string
  }>
}

async function getCategories() {
  try {
    const categories = await prisma.category.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        sortOrder: 'asc',
      },
    })
    return categories
  } catch {
    return []
  }
}

async function getProducts(filters: {
  category?: string
  search?: string
  sort?: string
  minPrice?: number
  maxPrice?: number
}) {
  try {
    const { category, search, sort, minPrice, maxPrice } = filters

    const where: Prisma.ProductWhereInput = {
      isAvailable: true,
    }

    if (category) {
      where.category = { slug: category }
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ]
    }

    if (minPrice || maxPrice) {
      where.price = {}
      if (minPrice) (where.price as Prisma.DecimalFilter).gte = minPrice
      if (maxPrice) (where.price as Prisma.DecimalFilter).lte = maxPrice
    }

    let orderBy: Prisma.ProductOrderByWithRelationInput = { createdAt: 'desc' }

    switch (sort) {
      case 'price_asc':
        orderBy = { price: 'asc' }
        break
      case 'price_desc':
        orderBy = { price: 'desc' }
        break
      case 'name_asc':
        orderBy = { name: 'asc' }
        break
      case 'name_desc':
        orderBy = { name: 'desc' }
        break
      case 'popular':
        orderBy = { isPopular: 'desc' }
        break
    }

    const products = await prisma.product.findMany({
      where,
      include: {
        category: true,
      },
      orderBy,
    })

    return products
  } catch {
    return []
  }
}

export default async function MenuPage({ searchParams }: MenuPageProps) {
  const params = await searchParams
  const categories = await getCategories()
  const products = await getProducts({
    category: params.category,
    search: params.search,
    sort: params.sort,
    minPrice: params.minPrice ? parseFloat(params.minPrice) : undefined,
    maxPrice: params.maxPrice ? parseFloat(params.maxPrice) : undefined,
  })

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-950/40 via-zinc-950 to-zinc-950" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-600/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="container relative z-10">
          <p className="text-orange-500 text-sm font-semibold uppercase tracking-widest mb-3">Full Menu</p>
          <h1 className="text-5xl md:text-6xl font-black mb-4">
            Our <span className="text-gradient">Menu</span>
          </h1>
          <p className="text-zinc-400 text-lg max-w-xl">
            Explore our full selection of broast, burgers, pizzas, sides and more — fresh every day.
          </p>
        </div>
      </section>

      {/* Category Navigation */}
      <CategoryNav categories={categories} activeCategory={params.category} />

      {/* Main Content */}
      <div className="container py-10">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Suspense>
              <MenuFilters />
            </Suspense>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Search Bar - Mobile */}
            <div className="mb-6 md:hidden">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                <Input
                  type="search"
                  placeholder="Search menu..."
                  className="pl-10 bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-600 focus-visible:ring-orange-500"
                  defaultValue={params.search}
                />
              </div>
            </div>

            {/* Results Count */}
            <div className="mb-6 flex justify-between items-center">
              <p className="text-zinc-500 text-sm">
                <span className="text-white font-semibold">{products.length}</span> {products.length === 1 ? "item" : "items"} found
              </p>
            </div>

            {/* Products */}
            {products.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-zinc-900 border border-zinc-800 mb-6">
                  <Search className="h-10 w-10 text-zinc-600" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">No items found</h3>
                <p className="text-zinc-500">Try adjusting your filters or search terms</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
