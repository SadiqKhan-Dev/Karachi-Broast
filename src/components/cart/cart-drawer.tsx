"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/stores/cart-store"
import { formatPrice } from "@/lib/utils"
import { ShoppingBag, Trash2, Plus, Minus, X, ChevronRight } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

export function CartDrawer() {
  const { isOpen, setIsOpen, getCart, updateQuantity, removeItem } = useCartStore()
  const cart = getCart()

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="w-full sm:max-w-md flex flex-col p-0 bg-zinc-950 border-l border-zinc-800 text-white">
        <SheetHeader className="px-6 py-4 border-b border-zinc-800">
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center gap-2 text-white">
              <div className="h-8 w-8 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                <ShoppingBag className="h-4 w-4 text-orange-400" />
              </div>
              <span>Your Order</span>
              {cart.itemCount > 0 && (
                <span className="h-5 w-5 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold">
                  {cart.itemCount}
                </span>
              )}
            </SheetTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 text-zinc-400 hover:text-white hover:bg-zinc-800"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </SheetHeader>

        {cart.items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <div className="h-20 w-20 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-6">
              <ShoppingBag className="h-10 w-10 text-zinc-600" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Your cart is empty</h3>
            <p className="text-zinc-500 text-sm mb-6">Add some delicious items to get started!</p>
            <Button
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl"
              asChild
              onClick={() => setIsOpen(false)}
            >
              <Link href="/menu">Browse Menu</Link>
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 px-6 py-4">
              <AnimatePresence>
                {cart.items.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex gap-4 py-4 border-b border-zinc-800/60 last:border-0"
                  >
                    {/* Image */}
                    <div className="h-18 w-18 flex-shrink-0 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900" style={{ height: 72, width: 72 }}>
                      <img
                        src={item.product.image || "/placeholder-food.jpg"}
                        alt={item.product.name}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex flex-1 flex-col min-w-0">
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="font-semibold text-white text-sm leading-tight line-clamp-2">{item.product.name}</h4>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="h-6 w-6 flex-shrink-0 rounded-md flex items-center justify-center text-zinc-600 hover:text-red-400 hover:bg-red-400/10 transition-colors"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      {Object.entries(item.selectedCustomizations).map(([key, value]) => (
                        <p key={key} className="text-xs text-zinc-600 mt-0.5">
                          {key}: {Array.isArray(value) ? value.join(", ") : value}
                        </p>
                      ))}

                      {item.notes && (
                        <p className="text-xs text-zinc-600 mt-0.5">Note: {item.notes}</p>
                      )}

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 rounded-lg">
                          <button
                            className="h-7 w-7 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-6 text-center text-sm font-semibold text-white">{item.quantity}</span>
                          <button
                            className="h-7 w-7 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <span className="font-bold text-orange-400 text-sm">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </ScrollArea>

            {/* Footer */}
            <div className="border-t border-zinc-800 p-6 space-y-4 bg-zinc-950">
              <div className="space-y-2.5 text-sm">
                <div className="flex justify-between text-zinc-400">
                  <span>Subtotal</span>
                  <span className="text-white">{formatPrice(cart.subtotal)}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Delivery Fee</span>
                  <span className="text-white">{formatPrice(cart.deliveryFee)}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Tax</span>
                  <span className="text-white">{formatPrice(cart.tax)}</span>
                </div>
                <div className="w-full h-px bg-zinc-800" />
                <div className="flex justify-between font-bold text-base">
                  <span className="text-white">Total</span>
                  <span className="text-orange-400 text-lg">{formatPrice(cart.total)}</span>
                </div>
              </div>

              <Button
                className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-lg shadow-orange-500/20"
                size="lg"
                asChild
                onClick={() => setIsOpen(false)}
              >
                <Link href="/checkout">
                  Proceed to Checkout
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>

              <button
                className="w-full text-sm text-zinc-500 hover:text-zinc-300 transition-colors py-1"
                onClick={() => setIsOpen(false)}
              >
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
