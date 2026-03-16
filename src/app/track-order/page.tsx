import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Package, User, CheckCircle, Clock, Truck, MapPin } from "lucide-react"

export const metadata: Metadata = {
  title: "Track Order | Karachi Broast",
  description: "Track your Karachi Broast order in real time.",
}

const statusSteps = [
  { icon: CheckCircle, label: "Order Confirmed", desc: "Your order has been received and confirmed." },
  { icon: Clock, label: "Preparing", desc: "Our kitchen is freshly preparing your food." },
  { icon: Package, label: "Ready", desc: "Your order is packed and ready for pickup." },
  { icon: Truck, label: "Out for Delivery", desc: "Our rider is on the way to you." },
  { icon: MapPin, label: "Delivered", desc: "Enjoy your meal!" },
]

export default function TrackOrderPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-950/40 via-zinc-950 to-zinc-950" />
        <div className="container relative z-10 text-center">
          <p className="text-orange-500 text-sm font-semibold uppercase tracking-widest mb-4">Live Updates</p>
          <h1 className="text-5xl md:text-6xl font-black mb-6">
            Track Your <span className="text-gradient">Order</span>
          </h1>
          <p className="text-zinc-400 text-lg max-w-lg mx-auto">
            Sign in to see real-time status updates for all your orders.
          </p>
        </div>
      </section>

      <div className="container max-w-2xl pb-20">
        {/* Sign-in prompt */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-10 text-center mb-6">
          <div className="h-16 w-16 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mx-auto mb-6">
            <User className="h-8 w-8 text-orange-400" />
          </div>
          <h2 className="text-2xl font-black text-white mb-3">View Your Orders</h2>
          <p className="text-zinc-400 mb-8 max-w-xs mx-auto">
            Sign in to your account to see the live status of all your orders.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl h-12 px-8" asChild>
              <Link href="/account">My Orders</Link>
            </Button>
            <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white rounded-xl h-12 px-8" asChild>
              <Link href="/sign-in?redirect_url=/account">Sign In</Link>
            </Button>
          </div>
        </div>

        {/* Status Steps */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
          <p className="text-orange-500 text-xs font-semibold uppercase tracking-widest mb-6">Order Flow</p>
          <h3 className="font-black text-white text-xl mb-8">How Orders Are Tracked</h3>
          <div className="relative">
            <div className="absolute left-5 top-5 bottom-5 w-px bg-zinc-800" />
            <div className="space-y-6">
              {statusSteps.map((step, index) => (
                <div key={step.label} className="relative flex items-start gap-5">
                  <div className={`flex-shrink-0 h-10 w-10 rounded-full border-2 flex items-center justify-center z-10 ${
                    index === 0
                      ? "bg-orange-500 border-orange-500"
                      : "bg-zinc-900 border-zinc-700"
                  }`}>
                    <step.icon className={`h-5 w-5 ${index === 0 ? "text-white" : "text-zinc-500"}`} />
                  </div>
                  <div className="flex-1 pt-1.5">
                    <p className={`font-bold ${index === 0 ? "text-white" : "text-zinc-400"}`}>{step.label}</p>
                    <p className="text-sm text-zinc-600 mt-0.5">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="text-center text-sm text-zinc-500 mt-8">
          Need help with an order?{" "}
          <Link href="/contact" className="text-orange-400 hover:text-orange-300">
            Contact us
          </Link>
        </p>
      </div>
    </div>
  )
}
