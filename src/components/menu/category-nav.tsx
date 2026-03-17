"use client"

import Link from "next/link"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { Drumstick, Sandwich, Pizza, Utensils, Gift, GlassWater, type LucideIcon } from "lucide-react"

const categoryIconMap: Record<string, LucideIcon> = {
  "broast-chicken": Drumstick,
  "burgers": Sandwich,
  "pizza": Pizza,
  "sides-snacks": Utensils,
  "deals-combos": Gift,
  "beverages": GlassWater,
}

interface Category {
  id: string
  name: string
  slug: string
  icon?: string | null
}

interface CategoryNavProps {
  categories: Category[]
  activeCategory?: string
}

export function CategoryNav({ categories, activeCategory }: CategoryNavProps) {
  return (
    <div className="border-b border-zinc-800 bg-zinc-950/90 backdrop-blur-xl sticky top-16 z-40">
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="container py-4">
          <div className="flex items-center gap-2">
            <Link
              href="/menu"
              className={cn(
                "inline-flex items-center px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200",
                !activeCategory
                  ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20"
                  : "bg-zinc-900 text-zinc-400 border border-zinc-800 hover:border-zinc-700 hover:text-white"
              )}
            >
              All
            </Link>
            {categories.map((category) => {
              const isActive = activeCategory === category.slug
              const IconComponent = categoryIconMap[category.slug]
              return (
                <Link
                  key={category.id}
                  href={`/menu?category=${category.slug}`}
                  className={cn(
                    "inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200",
                    isActive
                      ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20"
                      : "bg-zinc-900 text-zinc-400 border border-zinc-800 hover:border-zinc-700 hover:text-white"
                  )}
                >
                  {IconComponent && <IconComponent className="h-4 w-4" />}
                  {category.name}
                </Link>
              )
            })}
          </div>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}
