import { headers } from "next/headers"
import { stripe } from "@/lib/stripe"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import Stripe from "stripe"

// Stripe webhook route - handles payment events
export const dynamic = "force-dynamic"
export const runtime = "nodejs"

export async function POST(req: Request) {
  const body = await req.text()
  const headerStore = await headers()
  const signature = headerStore.get("stripe-signature") as string

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (error) {
    console.error("Webhook signature verification failed:", error)
    return new NextResponse("Webhook error", { status: 400 })
  }

  const session = event.data.object as Stripe.PaymentIntent

  try {
    switch (event.type) {
      case "payment_intent.succeeded":
        await prisma.order.update({
          where: { stripePaymentId: session.id },
          data: { paymentStatus: "PAID", status: "CONFIRMED" },
        })
        break

      case "payment_intent.payment_failed":
        await prisma.order.update({
          where: { stripePaymentId: session.id },
          data: { paymentStatus: "FAILED" },
        })
        console.log("Payment failed for order:", session.id)
        break

      case "payment_intent.processing":
        await prisma.order.update({
          where: { stripePaymentId: session.id },
          data: { paymentStatus: "PENDING" },
        })
        break

      default:
        console.log("Unhandled event type:", event.type)
    }
  } catch (error) {
    console.error("Webhook handler error:", error)
    return new NextResponse("Webhook handler failed", { status: 400 })
  }

  return new NextResponse(null, { status: 200 })
}
