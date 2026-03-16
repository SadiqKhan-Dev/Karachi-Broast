"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatPrice, getDiscountPercentage } from "@/lib/utils"
import { Plus, Clock, Flame, Star } from "lucide-react"
import { motion } from "framer-motion"
import type { ExtendedProduct } from "@/types"
import { useCartStore } from "@/stores/cart-store"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

interface ProductCardProps {
  product: ExtendedProduct
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCartStore()
  const { toast } = useToast()
  const discount = getDiscountPercentage(Number(product.price), product.comparePrice)

  const handleAddToCart = () => {
    addItem({
      id: Math.random().toString(36).substring(2, 9),
      productId: product.id,
      product,
      quantity: 1,
      selectedCustomizations: {},
      price: Number(product.price),
    })
    toast({
      title: "Added to cart!",
      description: `${product.name} added to your order.`,
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className="group"
    >
      <div className="overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-orange-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/5">
        {/* Image */}
        <Link href={`/product/${product.slug}`} className="relative block overflow-hidden">
          <div className="aspect-[4/3] overflow-hidden bg-zinc-800">
            <img
              src={product.image || "/placeholder-food.jpg"}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            {/* Dark overlay on hover */}
            <div className="absolute inset-0 bg-zinc-950/0 group-hover:bg-zinc-950/20 transition-colors duration-300" />
          </div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {discount > 0 && (
              <Badge className="bg-orange-500 text-white border-0 text-xs font-bold shadow-lg">
                -{discount}% OFF
              </Badge>
            )}
            {product.isPopular && (
              <Badge className="bg-amber-500 text-white border-0 text-xs font-bold shadow-lg">
                <Star className="h-3 w-3 mr-1 fill-white" />
                Popular
              </Badge>
            )}
            {product.isFeatured && !product.isPopular && (
              <Badge className="bg-zinc-700 text-white border-0 text-xs font-semibold">
                Featured
              </Badge>
            )}
          </div>

          {/* Quick Add */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute bottom-3 right-3 h-10 w-10 rounded-xl bg-orange-500 shadow-lg shadow-orange-500/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-orange-600"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              handleAddToCart()
            }}
          >
            <Plus className="h-5 w-5 text-white" />
          </motion.button>
        </Link>

        {/* Content */}
        <div className="p-4">
          <Link href={`/product/${product.slug}`}>
            <h3 className="font-bold text-white text-base mb-1 line-clamp-1 group-hover:text-orange-400 transition-colors">
              {product.name}
            </h3>
          </Link>

          {product.description && (
            <p className="text-xs text-zinc-500 mb-3 line-clamp-2 leading-relaxed">
              {product.description}
            </p>
          )}

          {/* Meta */}
          {(product.calories || product.prepTime) && (
            <div className="flex items-center gap-3 mb-4">
              {product.calories && (
                <div className="flex items-center gap-1 text-xs text-zinc-600">
                  <Flame className="h-3.5 w-3.5" />
                  {product.calories} cal
                </div>
              )}
              {product.prepTime && (
                <div className="flex items-center gap-1 text-xs text-zinc-600">
                  <Clock className="h-3.5 w-3.5" />
                  {product.prepTime} min
                </div>
              )}
            </div>
          )}

          {/* Price + CTA */}
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="font-black text-lg text-orange-400">
                {formatPrice(product.price)}
              </span>
              {product.comparePrice && (
                <span className="text-xs text-zinc-600 line-through">
                  {formatPrice(product.comparePrice)}
                </span>
              )}
            </div>
            <Button
              size="sm"
              className="h-9 px-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg shadow-sm shadow-orange-500/20"
              onClick={handleAddToCart}
            >
              Add
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
