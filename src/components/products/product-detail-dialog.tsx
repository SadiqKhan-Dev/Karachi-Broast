"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { formatPrice, calculateEstimatedDeliveryTime } from "@/lib/utils"
import { Plus, Minus, X, Clock, Flame, Info } from "lucide-react"
import type { ExtendedProduct, ProductCustomizationWithOptions } from "@/types"
import { useCartStore } from "@/stores/cart-store"
import { useToast } from "@/hooks/use-toast"
import { motion, AnimatePresence } from "framer-motion"

interface ProductDetailDialogProps {
  product: ExtendedProduct | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ProductDetailDialog({
  product,
  open,
  onOpenChange,
}: ProductDetailDialogProps) {
  const { addItem } = useCartStore()
  const { toast } = useToast()
  const [quantity, setQuantity] = useState(1)
  const [selectedCustomizations, setSelectedCustomizations] = useState<Record<string, string | string[]>>({})
  const [notes, setNotes] = useState("")

  if (!product) return null

  // Initialize default customizations
  useState(() => {
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
    setSelectedCustomizations(defaults)
  })

  const calculateTotalPrice = () => {
    let total = Number(product.price)

    product.customizations?.forEach((customization) => {
      const selected = selectedCustomizations[customization.name]
      if (selected) {
        const selectedOptions = Array.isArray(selected) ? selected : [selected]
        selectedOptions.forEach((optionName) => {
          const option = customization.options.find((o) => o.name === optionName)
          if (option) {
            total += Number(option.price)
          }
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
      description: `${quantity}x ${product.name} has been added to your order.`,
    })

    onOpenChange(false)
    setQuantity(1)
    setNotes("")
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] p-0 overflow-hidden">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Image Section */}
          <div className="relative bg-gray-100">
            <img
              src={product.image || "/placeholder-food.jpg"}
              alt={product.name}
              className="w-full h-64 md:h-full object-cover"
            />
            <div className="absolute top-4 left-4 flex gap-2">
              {product.isPopular && <Badge variant="orange">Popular</Badge>}
              {product.isFeatured && <Badge variant="brand">Featured</Badge>}
            </div>
          </div>

          {/* Content Section */}
          <ScrollArea className="h-[60vh] md:h-auto p-6">
            <div className="space-y-6">
              {/* Header */}
              <div>
                <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
                {product.description && (
                  <p className="text-muted-foreground text-sm">{product.description}</p>
                )}
              </div>

              {/* Meta Info */}
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                {product.calories && (
                  <div className="flex items-center gap-1">
                    <Flame className="h-4 w-4" />
                    {product.calories} calories
                  </div>
                )}
                {product.prepTime && (
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {calculateEstimatedDeliveryTime(product.prepTime)}
                  </div>
                )}
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-brand-600">
                  {formatPrice(product.price)}
                </span>
                {product.comparePrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    {formatPrice(product.comparePrice)}
                  </span>
                )}
              </div>

              <Separator />

              {/* Customizations */}
              {product.customizations?.map((customization) => (
                <div key={customization.id}>
                  <Label className="text-base font-semibold mb-3 block">
                    {customization.name}
                    {customization.required && <span className="text-destructive ml-1">*</span>}
                  </Label>

                  {customization.type === "SINGLE" ? (
                    <RadioGroup
                      value={selectedCustomizations[customization.name] as string}
                      onValueChange={(value) =>
                        handleCustomizationChange(customization.name, value, "SINGLE")
                      }
                      className="space-y-2"
                    >
                      {customization.options.map((option) => (
                        <Label
                          key={option.id}
                          className="flex items-center justify-between p-3 border rounded-md cursor-pointer hover:bg-accent transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <RadioGroupItem value={option.name} />
                            <span>{option.name}</span>
                          </div>
                          {option.price > 0 && (
                            <span className="text-sm font-medium">
                              +{formatPrice(option.price)}
                            </span>
                          )}
                        </Label>
                      ))}
                    </RadioGroup>
                  ) : (
                    <div className="space-y-2">
                      {customization.options.map((option) => (
                        <Label
                          key={option.id}
                          className="flex items-center justify-between p-3 border rounded-md cursor-pointer hover:bg-accent transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <Checkbox
                              checked={(selectedCustomizations[customization.name] as string[])?.includes(option.name)}
                              onCheckedChange={() =>
                                handleCustomizationChange(customization.name, option.name, "MULTIPLE")
                              }
                            />
                            <span>{option.name}</span>
                          </div>
                          {option.price > 0 && (
                            <span className="text-sm font-medium">
                              +{formatPrice(option.price)}
                            </span>
                          )}
                        </Label>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Special Instructions */}
              <div>
                <Label className="text-base font-semibold mb-2 block">
                  Special Instructions
                </Label>
                <Input
                  placeholder="Any allergies or special requests?"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>

              {/* Quantity */}
              <div>
                <Label className="text-base font-semibold mb-2 block">Quantity</Label>
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>

        {/* Footer */}
        <div className="border-t p-4 flex items-center justify-between bg-background">
          <div>
            <p className="text-sm text-muted-foreground">Total</p>
            <p className="text-2xl font-bold text-brand-600">
              {formatPrice(calculateTotalPrice())}
            </p>
          </div>
          <Button size="lg" variant="brand" className="h-12 px-8" onClick={handleAddToCart}>
            Add to Cart
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
