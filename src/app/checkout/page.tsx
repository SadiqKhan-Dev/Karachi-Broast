import { Metadata } from "next"
import { redirect } from "next/navigation"
import { CheckoutClient } from "./checkout-client"
import { auth } from "@clerk/nextjs/server"

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your order",
}

export default async function CheckoutPage() {
  const { userId } = await auth()

  if (!userId) {
    redirect('/sign-in?redirect_url=/checkout')
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="container py-10">
        <div className="mb-8">
          <p className="text-orange-500 text-sm font-semibold uppercase tracking-widest mb-2">Secure Checkout</p>
          <h1 className="text-4xl font-black text-white">Complete Your Order</h1>
        </div>
        <CheckoutClient userId={userId} />
      </div>
    </div>
  )
}
