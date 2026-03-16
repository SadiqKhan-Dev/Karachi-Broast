"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { X, SlidersHorizontal } from "lucide-react"
import { useCallback } from "react"

export function MenuFilters() {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
      return params.toString()
    },
    [searchParams]
  )

  const handleFilterChange = (key: string, value: string) => {
    const query = createQueryString(key, value)
    router.push(`${pathname}?${query}`)
  }

  const handleClearFilters = () => {
    router.push(pathname)
  }

  const currentSort = searchParams.get("sort")
  const minPrice = searchParams.get("minPrice")
  const maxPrice = searchParams.get("maxPrice")

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sticky top-36 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-orange-400" />
          <span className="font-bold text-white">Filters</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClearFilters}
          className="h-8 text-zinc-500 hover:text-white hover:bg-zinc-800 text-xs"
        >
          <X className="h-3.5 w-3.5 mr-1" />
          Clear
        </Button>
      </div>

      <div className="w-full h-px bg-zinc-800" />

      {/* Sort */}
      <div className="space-y-3">
        <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">Sort By</p>
        <div className="space-y-1.5">
          {[
            { value: "newest", label: "Newest First" },
            { value: "popular", label: "Most Popular" },
            { value: "price_asc", label: "Price: Low to High" },
            { value: "price_desc", label: "Price: High to Low" },
            { value: "name_asc", label: "Name: A to Z" },
          ].map((option) => (
            <label
              key={option.value}
              className={`flex items-center gap-3 cursor-pointer rounded-lg px-3 py-2.5 transition-colors ${
                currentSort === option.value
                  ? "bg-orange-500/10 text-orange-400"
                  : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
              }`}
            >
              <input
                type="radio"
                name="sort"
                value={option.value}
                checked={currentSort === option.value}
                onChange={() => handleFilterChange("sort", option.value)}
                className="h-4 w-4 accent-orange-500"
              />
              <span className="text-sm font-medium">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="w-full h-px bg-zinc-800" />

      {/* Price Range */}
      <div className="space-y-3">
        <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">Price Range (Rs.)</p>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            placeholder="Min"
            value={minPrice || ""}
            onChange={(e) => handleFilterChange("minPrice", e.target.value)}
            className="h-9 bg-zinc-950 border-zinc-700 text-white placeholder:text-zinc-600 focus-visible:ring-orange-500 text-sm"
          />
          <span className="text-zinc-600">–</span>
          <Input
            type="number"
            placeholder="Max"
            value={maxPrice || ""}
            onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
            className="h-9 bg-zinc-950 border-zinc-700 text-white placeholder:text-zinc-600 focus-visible:ring-orange-500 text-sm"
          />
        </div>
      </div>

      <div className="w-full h-px bg-zinc-800" />

      {/* Quick Filters */}
      <div className="space-y-3">
        <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">Quick Filters</p>
        <div className="space-y-2.5">
          <label className="flex items-center gap-3 cursor-pointer rounded-lg px-3 py-2.5 hover:bg-zinc-800 transition-colors">
            <Checkbox
              checked={searchParams.get("featured") === "true"}
              onCheckedChange={(checked) =>
                handleFilterChange("featured", checked ? "true" : "false")
              }
              className="border-zinc-600 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
            />
            <span className="text-sm text-zinc-300">Featured Items</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer rounded-lg px-3 py-2.5 hover:bg-zinc-800 transition-colors">
            <Checkbox
              checked={searchParams.get("popular") === "true"}
              onCheckedChange={(checked) =>
                handleFilterChange("popular", checked ? "true" : "false")
              }
              className="border-zinc-600 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
            />
            <span className="text-sm text-zinc-300">Popular Items</span>
          </label>
        </div>
      </div>
    </div>
  )
}
