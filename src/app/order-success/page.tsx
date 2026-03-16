import { Metadata } from "next"
import Link from "next/link"
import { CheckCircle, ShoppingBag, Clock, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Order Confirmed | Karachi Broast",
  description: "Your order has been placed successfully",
}

export default async function OrderSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>
}) {
  const params = await searchParams
  const orderNumber = params.order || "ORD-XXXXX"

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Success Card */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 md:p-10 text-center">
          {/* Animated success icon */}
          <div className="relative inline-block mb-8">
            <div className="h-24 w-24 rounded-full bg-green-500/10 border-2 border-green-500/30 flex items-center justify-center mx-auto">
              <CheckCircle className="h-12 w-12 text-green-400" />
            </div>
            <div className="absolute inset-0 rounded-full border-2 border-green-500/10 animate-pulse" />
          </div>

          <h1 className="text-3xl font-black text-white mb-3">Order Confirmed!</h1>
          <p className="text-zinc-400 mb-8">
            Thank you for your order. We&apos;re already getting your food ready.
          </p>

          {/* Order Number */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5 mb-8">
            <p className="text-zinc-500 text-xs uppercase tracking-widest mb-2">Order Number</p>
            <p className="text-2xl font-black font-mono text-orange-400">{orderNumber}</p>
          </div>

          {/* What's next */}
          <div className="bg-orange-500/5 border border-orange-500/20 rounded-2xl p-5 mb-8 text-left">
            <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-widest">What&apos;s Next?</h3>
            <ul className="space-y-3">
              {[
                { icon: CheckCircle, text: "Order confirmation sent to your email" },
                { icon: Clock, text: "Kitchen is preparing your food" },
                { icon: Truck, text: "Delivery will arrive in 30–45 minutes" },
                { icon: ShoppingBag, text: "Track your order in real-time from My Account" },
              ].map((item) => (
                <li key={item.text} className="flex items-center gap-3 text-sm text-zinc-400">
                  <item.icon className="h-4 w-4 text-orange-400 flex-shrink-0" />
                  {item.text}
                </li>
              ))}
            </ul>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Button className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-lg shadow-orange-500/20" asChild>
              <Link href="/account">
                <ShoppingBag className="h-4 w-4 mr-2" />
                View Order Details
              </Link>
            </Button>
            <Button variant="outline" className="w-full h-12 border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white rounded-xl" asChild>
              <Link href="/menu">Order More</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
