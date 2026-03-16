import { Metadata } from "next"
import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { ProductDetailClient } from "./product-detail-client"
import { ProductCard } from "@/components/products/product-card"
import { ChevronRight } from "lucide-react"
import Link from "next/link"

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

async function getProduct(slug: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { slug },
      include: {
        category: true,
        customizations: {
          include: {
            options: true,
          },
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    })
    return product
  } catch {
    return null
  }
}

async function getRelatedProducts(categoryId: string, currentProductId: string) {
  try {
    const products = await prisma.product.findMany({
      where: {
        categoryId,
        id: { not: currentProductId },
        isAvailable: true,
      },
      include: {
        category: true,
      },
      take: 4,
    })
    return products
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params
  const product = await getProduct(slug)

  if (!product) {
    return {
      title: "Product Not Found",
    }
  }

  return {
    title: product.name,
    description: product.description || `Order ${product.name} from Karachi Broast`,
    openGraph: {
      title: product.name,
      description: product.description || `Order ${product.name} from Karachi Broast`,
      images: product.image ? [product.image] : [],
    },
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product = await getProduct(slug)

  if (!product) {
    notFound()
  }

  const relatedProducts = await getRelatedProducts(product.categoryId, product.id)

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Breadcrumb */}
      <div className="container pt-6 pb-2">
        <nav className="flex items-center text-sm text-zinc-500">
          <Link href="/" className="hover:text-orange-400 transition-colors">Home</Link>
          <ChevronRight className="h-4 w-4 mx-2 text-zinc-700" />
          <Link href="/menu" className="hover:text-orange-400 transition-colors">Menu</Link>
          <ChevronRight className="h-4 w-4 mx-2 text-zinc-700" />
          <Link href={`/menu?category=${product.category.slug}`} className="hover:text-orange-400 transition-colors">
            {product.category.name}
          </Link>
          <ChevronRight className="h-4 w-4 mx-2 text-zinc-700" />
          <span className="text-zinc-300 font-medium truncate max-w-[200px]">{product.name}</span>
        </nav>
      </div>

      {/* Product Detail */}
      <ProductDetailClient product={product} />

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="container py-16 border-t border-zinc-800">
          <p className="text-orange-500 text-sm font-semibold uppercase tracking-widest mb-3">More Like This</p>
          <h2 className="text-3xl font-black text-white mb-8">You May Also Like</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
