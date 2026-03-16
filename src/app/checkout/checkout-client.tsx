"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useCartStore } from "@/stores/cart-store"
import { createOrder } from "@/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { formatPrice } from "@/lib/utils"
import { CreditCard, Truck, MapPin, ChevronLeft, AlertCircle, CheckCircle } from "lucide-react"
import Link from "next/link"

interface CheckoutClientProps {
  userId: string
}

const PHONE_REGEX = /^(\+92|0)[0-9]{9,11}$/

function validateDeliveryInfo(info: {
  name: string
  phone: string
  address: string
  city: string
}): string | null {
  if (info.name.trim().length < 2) return "Full name must be at least 2 characters"
  if (!PHONE_REGEX.test(info.phone.replace(/[\s\-]/g, "")))
    return "Enter a valid Pakistan phone number (e.g. 0300 1234567)"
  if (info.address.trim().length < 5) return "Please enter a complete delivery address"
  if (info.city.trim().length < 2) return "Please enter a valid city"
  return null
}

const inputClass = "bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-600 focus-visible:ring-orange-500 focus-visible:border-orange-500/50 h-11"
const labelClass = "text-zinc-300 text-sm font-medium"

export function CheckoutClient({ userId }: CheckoutClientProps) {
  const router = useRouter()
  const { getCart, clearCart } = useCartStore()
  const cart = getCart()
  const [step, setStep] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "card">("cod")
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [deliveryInfo, setDeliveryInfo] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    notes: "",
  })

  const handleContinueToPayment = () => {
    const validationError = validateDeliveryInfo(deliveryInfo)
    if (validationError) {
      setError(validationError)
      return
    }
    setError(null)
    setStep(2)
  }

  const handlePlaceOrder = async () => {
    setIsProcessing(true)
    setError(null)

    const result = await createOrder({
      clerkUserId: userId,
      items: cart.items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
        customizations: item.selectedCustomizations,
        notes: undefined,
      })),
      subtotal: cart.subtotal,
      deliveryFee: cart.deliveryFee,
      tax: cart.tax,
      total: cart.total,
      paymentMethod: paymentMethod === "cod" ? "CASH_ON_DELIVERY" : "CARD",
      deliveryName: deliveryInfo.name.trim(),
      deliveryPhone: deliveryInfo.phone.trim(),
      deliveryAddress: deliveryInfo.address.trim(),
      deliveryCity: deliveryInfo.city.trim(),
      deliveryNotes: deliveryInfo.notes.trim() || undefined,
    })

    if (!result.success) {
      setError(result.error || "Failed to place order. Please try again.")
      setIsProcessing(false)
      return
    }

    clearCart()
    router.push(`/order-success?order=${result.order.orderNumber}`)
  }

  if (cart.items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto text-center py-20">
        <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-zinc-900 border border-zinc-800 mb-6">
          <Truck className="h-10 w-10 text-zinc-600" />
        </div>
        <h2 className="text-2xl font-black text-white mb-2">Your cart is empty</h2>
        <p className="text-zinc-500 mb-8">Add some delicious items before checkout</p>
        <Button className="bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl h-12 px-8" asChild>
          <Link href="/menu">Browse Menu</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Checkout Form */}
      <div className="lg:col-span-2 space-y-6">
        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[
            { step: 1, label: "Delivery" },
            { step: 2, label: "Payment" },
            { step: 3, label: "Confirm" },
          ].map((item, index) => (
            <div key={item.step} className="flex items-center">
              <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                step > item.step
                  ? "bg-green-500 text-white"
                  : step === item.step
                  ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30"
                  : "bg-zinc-800 text-zinc-500"
              }`}>
                {step > item.step ? <CheckCircle className="h-5 w-5" /> : item.step}
              </div>
              <span className={`ml-2 text-sm font-medium hidden sm:block ${
                step >= item.step ? "text-white" : "text-zinc-500"
              }`}>
                {item.label}
              </span>
              {index < 2 && (
                <div className={`w-8 sm:w-12 h-0.5 mx-3 transition-colors ${
                  step > item.step ? "bg-orange-500" : "bg-zinc-800"
                }`} />
              )}
            </div>
          ))}
        </div>

        {error && (
          <div className="flex items-center gap-2 p-4 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            {error}
          </div>
        )}

        {/* Step 1: Delivery Information */}
        {step === 1 && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                <MapPin className="h-5 w-5 text-orange-400" />
              </div>
              <h2 className="text-xl font-black text-white">Delivery Information</h2>
            </div>
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className={labelClass}>Full Name *</Label>
                  <Input
                    id="name"
                    value={deliveryInfo.name}
                    onChange={(e) => { setDeliveryInfo({ ...deliveryInfo, name: e.target.value }); setError(null) }}
                    placeholder="Ali Hassan"
                    className={inputClass}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className={labelClass}>Phone Number *</Label>
                  <Input
                    id="phone"
                    value={deliveryInfo.phone}
                    onChange={(e) => { setDeliveryInfo({ ...deliveryInfo, phone: e.target.value }); setError(null) }}
                    placeholder="0300 1234567"
                    className={inputClass}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address" className={labelClass}>Delivery Address *</Label>
                <Input
                  id="address"
                  value={deliveryInfo.address}
                  onChange={(e) => setDeliveryInfo({ ...deliveryInfo, address: e.target.value })}
                  placeholder="House #, Street, Area"
                  className={inputClass}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city" className={labelClass}>City *</Label>
                <Input
                  id="city"
                  value={deliveryInfo.city}
                  onChange={(e) => setDeliveryInfo({ ...deliveryInfo, city: e.target.value })}
                  placeholder="Karachi"
                  className={inputClass}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes" className={labelClass}>Delivery Instructions</Label>
                <Input
                  id="notes"
                  value={deliveryInfo.notes}
                  onChange={(e) => setDeliveryInfo({ ...deliveryInfo, notes: e.target.value })}
                  placeholder="Landmark, gate code, floor number…"
                  className={inputClass}
                />
              </div>
              <Button
                className="w-full mt-2 h-12 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-lg shadow-orange-500/20"
                size="lg"
                onClick={handleContinueToPayment}
                disabled={!deliveryInfo.name || !deliveryInfo.phone || !deliveryInfo.address || !deliveryInfo.city}
              >
                Continue to Payment
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Payment Method */}
        {step === 2 && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                <CreditCard className="h-5 w-5 text-orange-400" />
              </div>
              <h2 className="text-xl font-black text-white">Payment Method</h2>
            </div>
            <RadioGroup value={paymentMethod} onValueChange={(v) => setPaymentMethod(v as "cod" | "card")} className="space-y-3">
              <label className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all ${
                paymentMethod === "cod" ? "border-orange-500 bg-orange-500/10" : "border-zinc-800 bg-zinc-950 hover:border-zinc-700"
              }`}>
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="cod" className="border-zinc-600 text-orange-500" />
                  <div>
                    <p className="font-bold text-white">Cash on Delivery</p>
                    <p className="text-sm text-zinc-500">Pay when you receive your order</p>
                  </div>
                </div>
                <Truck className={`h-5 w-5 ${paymentMethod === "cod" ? "text-orange-400" : "text-zinc-600"}`} />
              </label>
              <label className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all ${
                paymentMethod === "card" ? "border-orange-500 bg-orange-500/10" : "border-zinc-800 bg-zinc-950 hover:border-zinc-700"
              }`}>
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="card" className="border-zinc-600 text-orange-500" />
                  <div>
                    <p className="font-bold text-white">Credit / Debit Card</p>
                    <p className="text-sm text-zinc-500">Pay securely with your card</p>
                  </div>
                </div>
                <CreditCard className={`h-5 w-5 ${paymentMethod === "card" ? "text-orange-400" : "text-zinc-600"}`} />
              </label>
            </RadioGroup>
            <div className="flex gap-4 mt-6">
              <Button
                variant="outline"
                className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white rounded-xl"
                onClick={() => setStep(1)}
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <Button
                className="flex-1 h-12 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl"
                size="lg"
                onClick={() => setStep(3)}
              >
                Review Order
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Order Review */}
        {step === 3 && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 md:p-8">
            <h2 className="text-xl font-black text-white mb-6">Review Your Order</h2>
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4">
                <p className="text-xs text-zinc-500 uppercase tracking-widest mb-2">Delivery To</p>
                <p className="text-white font-semibold text-sm">{deliveryInfo.name}</p>
                <p className="text-zinc-400 text-sm">{deliveryInfo.phone}</p>
                <p className="text-zinc-400 text-sm">{deliveryInfo.address}</p>
                <p className="text-zinc-400 text-sm">{deliveryInfo.city}</p>
              </div>
              <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4">
                <p className="text-xs text-zinc-500 uppercase tracking-widest mb-2">Payment</p>
                <p className="text-white font-semibold text-sm">
                  {paymentMethod === "cod" ? "Cash on Delivery" : "Credit / Debit Card"}
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Button
                variant="outline"
                className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white rounded-xl"
                onClick={() => setStep(2)}
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <Button
                className="flex-1 h-12 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-lg shadow-orange-500/20"
                size="lg"
                onClick={handlePlaceOrder}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    Placing Order...
                  </span>
                ) : (
                  "Place Order"
                )}
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Order Summary */}
      <div className="lg:col-span-1">
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sticky top-24">
          <p className="text-xs text-zinc-500 uppercase tracking-widest mb-4">Order Summary</p>
          <div className="space-y-3 mb-4 max-h-60 overflow-auto">
            {cart.items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm gap-2">
                <span className="text-zinc-400 line-clamp-1">
                  <span className="text-orange-400 font-semibold">{item.quantity}×</span>{" "}
                  {item.product.name}
                </span>
                <span className="text-white font-medium flex-shrink-0">{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="w-full h-px bg-zinc-800 mb-4" />
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
            <div className="flex justify-between font-black text-base">
              <span className="text-white">Total</span>
              <span className="text-orange-400 text-lg">{formatPrice(cart.total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
