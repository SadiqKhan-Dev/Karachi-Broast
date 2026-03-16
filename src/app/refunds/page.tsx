import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { RefreshCcw } from "lucide-react"

export const metadata: Metadata = {
  title: "Refund Policy | Karachi Broast",
  description: "Learn about Karachi Broast's cancellation and refund policy.",
}

export default function RefundsPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-950/30 via-zinc-950 to-zinc-950" />
        <div className="container relative z-10 text-center">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500/10 border border-orange-500/20 mb-6 mx-auto">
            <RefreshCcw className="h-7 w-7 text-orange-400" />
          </div>
          <h1 className="text-5xl font-black mb-4">Refund &amp; Cancellation Policy</h1>
          <p className="text-zinc-500 text-sm">Last updated: March 2025</p>
        </div>
      </section>

      <div className="container max-w-3xl pb-20">
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 md:p-10 space-y-10">
          <div>
            <h2 className="text-xl font-black text-white mb-4">Order Cancellations</h2>
            <ul className="space-y-3">
              {[
                "You may cancel an order within 5 minutes of placing it.",
                "Once the kitchen has started preparing your order, cancellations are not possible.",
                "To cancel, go to My Account → Orders and select Cancel, or call us immediately.",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-zinc-400 text-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-orange-500 flex-shrink-0 mt-2" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full h-px bg-zinc-800" />

          <div>
            <h2 className="text-xl font-black text-white mb-4">Eligible Refunds</h2>
            <p className="text-zinc-400 text-sm mb-4">We issue refunds in the following situations:</p>
            <ul className="space-y-3">
              {[
                "You received the wrong order or item",
                "An item was missing from your order",
                "Food quality was significantly below standard (with photo evidence)",
                "Order was never delivered",
                "Duplicate charge on your payment",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-zinc-400 text-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500 flex-shrink-0 mt-2" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full h-px bg-zinc-800" />

          <div>
            <h2 className="text-xl font-black text-white mb-4">Non-Refundable Situations</h2>
            <ul className="space-y-3">
              {[
                "Change of mind after order preparation has begun",
                "Incorrect delivery address provided by the customer",
                "Customer unavailable at delivery address after multiple attempts",
                "Customization requests not specified at ordering time",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-zinc-400 text-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500 flex-shrink-0 mt-2" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full h-px bg-zinc-800" />

          <div>
            <h2 className="text-xl font-black text-white mb-6">Refund Process</h2>
            <div className="space-y-4">
              {[
                "Contact us within 24 hours of delivery with your order number and issue description.",
                "Our team will review your request and may ask for photos as evidence.",
                "Approved refunds are processed within 3–5 business days.",
                "Refunds for card payments are returned to the original payment method. COD refunds are issued via bank transfer.",
              ].map((text, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="h-8 w-8 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 font-bold flex items-center justify-center flex-shrink-0 text-sm">
                    {i + 1}
                  </div>
                  <p className="text-zinc-400 text-sm leading-relaxed pt-1.5">{text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full h-px bg-zinc-800" />

          <div className="text-center">
            <h2 className="text-xl font-black text-white mb-3">Need a Refund?</h2>
            <p className="text-zinc-400 text-sm mb-6">Contact our support team and we&apos;ll sort it out promptly.</p>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl h-12 px-8" asChild>
              <Link href="/contact">Contact Support</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
