"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { formatPrice, calculateEstimatedDeliveryTime } from "@/lib/utils"
import { Clock, Flame, ChevronLeft, ChevronRight, Plus, Minus, ShoppingCart, Star } from "lucide-react"
import type { ExtendedProduct } from "@/types"
import { useCartStore } from "@/stores/cart-store"
import { useToast } from "@/hooks/use-toast"

interface ProductDetailClientProps {
  product: ExtendedProduct
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const { addItem } = useCartStore()
  const { toast } = useToast()
  const [currentImage, setCurrentImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedCustomizations, setSelectedCustomizations] = useState<Record<string, string | string[]>>(() => {
    const defaults: Record<string, string | string[]> = {}
    product.customizations?.forEach((customization) => {
      if (customization.type === "SINGLE") {
        const defaultOption = customization.options.find((o) => o.isDefault)
        if (defaultOption) {
          defaults[customization.name] = defaultOption.name
        }
      } else {
        defaults[customization.name] = []
      }
    })
    return defaults
  })
  const [notes, setNotes] = useState("")

  const images = product.images.length > 0 ? product.images : [product.image].filter(Boolean) as string[]

  const calculateTotalPrice = () => {
    let total = Number(product.price)
    product.customizations?.forEach((customization) => {
      const selected = selectedCustomizations[customization.name]
      if (selected) {
        const selectedOptions = Array.isArray(selected) ? selected : [selected]
        selectedOptions.forEach((optionName) => {
          const option = customization.options.find((o) => o.name === optionName)
          if (option) total += Number(option.price)
        })
      }
    })
    return total * quantity
  }

  const handleAddToCart = () => {
    addItem({
      id: Math.random().toString(36).substring(2, 9),
      productId: product.id,
      product,
      quantity,
      selectedCustomizations,
      notes: notes || undefined,
      price: calculateTotalPrice() / quantity,
    })
    toast({
      title: "Added to cart",
      description: `${quantity}x ${product.name} added to your order.`,
    })
  }

  const handleCustomizationChange = (customizationName: string, value: string | string[], type: "SINGLE" | "MULTIPLE") => {
    setSelectedCustomizations((prev) => {
      if (type === "SINGLE") {
        return { ...prev, [customizationName]: value }
      } else {
        const current = (prev[customizationName] as string[]) || []
        const newValue = current.includes(value as string)
          ? current.filter((v) => v !== value)
          : [...current, value as string]
        return { ...prev, [customizationName]: newValue }
      }
    })
  }

  const discount = product.comparePrice
    ? Math.round(((Number(product.comparePrice) - Number(product.price)) / Number(product.comparePrice)) * 100)
    : 0

  return (
    <div className="container py-10 pb-16">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Images */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
            <img
              src={images[currentImage] || "/placeholder-food.jpg"}
              alt={product.name}
              className="h-full w-full object-cover"
            />
            {images.length > 1 && (
              <>
                <button
                  className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-xl bg-zinc-950/80 border border-zinc-700 flex items-center justify-center text-white hover:bg-zinc-900 transition-colors"
                  onClick={() => setCurrentImage((prev) => (prev - 1 + images.length) % images.length)}
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-xl bg-zinc-950/80 border border-zinc-700 flex items-center justify-center text-white hover:bg-zinc-900 transition-colors"
                  onClick={() => setCurrentImage((prev) => (prev + 1) % images.length)}
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImage(index)}
                      className={`h-2 rounded-full transition-all ${index === currentImage ? "w-6 bg-orange-500" : "w-2 bg-white/40"}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`flex-shrink-0 h-20 w-20 rounded-xl overflow-hidden border-2 transition-colors ${
                    index === currentImage ? "border-orange-500" : "border-zinc-800"
                  }`}
                >
                  <img src={image} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="space-y-6">
          {/* Badges */}
          <div className="flex items-center gap-2 flex-wrap">
            {product.isPopular && (
              <Badge className="bg-amber-500 text-white border-0 text-xs font-bold">
                <Star className="h-3 w-3 mr-1 fill-white" /> Popular
              </Badge>
            )}
            {product.isFeatured && (
              <Badge className="bg-zinc-700 text-white border-0 text-xs font-semibold">Featured</Badge>
            )}
            {discount > 0 && (
              <Badge className="bg-orange-500 text-white border-0 text-xs font-bold">-{discount}% OFF</Badge>
            )}
          </div>

          {/* Name + Description */}
          <div>
            <h1 className="text-4xl font-black text-white mb-3">{product.name}</h1>
            {product.description && (
              <p className="text-zinc-400 leading-relaxed">{product.description}</p>
            )}
          </div>

          {/* Meta Info */}
          {(product.calories || product.prepTime) && (
            <div className="flex items-center gap-6 text-sm">
              {product.calories && (
                <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5">
                  <Flame className="h-4 w-4 text-orange-400" />
                  <div>
                    <p className="font-bold text-white">{product.calories}</p>
                    <p className="text-zinc-500 text-xs">Calories</p>
                  </div>
                </div>
              )}
              {product.prepTime && (
                <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5">
                  <Clock className="h-4 w-4 text-orange-400" />
                  <div>
                    <p className="font-bold text-white">{calculateEstimatedDeliveryTime(product.prepTime)}</p>
                    <p className="text-zinc-500 text-xs">Delivery</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="text-5xl font-black text-orange-400">
              {formatPrice(product.price)}
            </span>
            {product.comparePrice && (
              <span className="text-xl text-zinc-600 line-through">
                {formatPrice(product.comparePrice)}
              </span>
            )}
          </div>

          <div className="w-full h-px bg-zinc-800" />

          {/* Customizations */}
          {product.customizations?.map((customization) => (
            <div key={customization.id} className="space-y-3">
              <p className="font-bold text-white text-base">
                {customization.name}
                {customization.required && <span className="text-orange-500 ml-1">*</span>}
              </p>

              {customization.type === "SINGLE" ? (
                <RadioGroup
                  value={selectedCustomizations[customization.name] as string}
                  onValueChange={(value) => handleCustomizationChange(customization.name, value, "SINGLE")}
                  className="space-y-2"
                >
                  {customization.options.map((option) => (
                    <label
                      key={option.id}
                      className={`flex items-center justify-between p-3.5 border rounded-xl cursor-pointer transition-all ${
                        selectedCustomizations[customization.name] === option.name
                          ? "border-orange-500 bg-orange-500/10"
                          : "border-zinc-800 bg-zinc-900 hover:border-zinc-700"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value={option.name} className="border-zinc-600 text-orange-500" />
                        <span className="text-white text-sm font-medium">{option.name}</span>
                      </div>
                      {option.price > 0 && (
                        <span className="text-sm font-semibold text-orange-400">+{formatPrice(option.price)}</span>
                      )}
                    </label>
                  ))}
                </RadioGroup>
              ) : (
                <div className="space-y-2">
                  {customization.options.map((option) => (
                    <label
                      key={option.id}
                      className={`flex items-center justify-between p-3.5 border rounded-xl cursor-pointer transition-all ${
                        (selectedCustomizations[customization.name] as string[])?.includes(option.name)
                          ? "border-orange-500 bg-orange-500/10"
                          : "border-zinc-800 bg-zinc-900 hover:border-zinc-700"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Checkbox
                          checked={(selectedCustomizations[customization.name] as string[])?.includes(option.name)}
                          onCheckedChange={() => handleCustomizationChange(customization.name, option.name, "MULTIPLE")}
                          className="border-zinc-600 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                        />
                        <span className="text-white text-sm font-medium">{option.name}</span>
                      </div>
                      {option.price > 0 && (
                        <span className="text-sm font-semibold text-orange-400">+{formatPrice(option.price)}</span>
                      )}
                    </label>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Special Instructions */}
          <div className="space-y-2">
            <Label className="text-white font-bold text-base">Special Instructions</Label>
            <Input
              placeholder="Any allergies or special requests?"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-600 focus-visible:ring-orange-500 focus-visible:border-orange-500/50"
            />
          </div>

          {/* Quantity + Add to Cart */}
          <div className="flex items-center gap-4 pt-2">
            <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-xl">
              <button
                className="h-12 w-12 flex items-center justify-center text-zinc-400 hover:text-white transition-colors disabled:opacity-40"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="text-xl font-black text-white w-10 text-center">{quantity}</span>
              <button
                className="h-12 w-12 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <Button
              size="lg"
              className="flex-1 h-12 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-lg shadow-orange-500/20 text-base"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Add to Cart — {formatPrice(calculateTotalPrice())}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
