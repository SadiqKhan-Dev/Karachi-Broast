import { NextRequest, NextResponse } from "next/server"
import { stripe, calculateOrderAmount } from "@/lib/stripe"
import { auth } from "@clerk/nextjs/server"
import { prisma } from "@/lib/prisma"

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { orderId } = await req.json()

    if (!orderId) {
      return NextResponse.json({ error: "Order ID required" }, { status: 400 })
    }

    // Get order details
    const order = await prisma.order.findUnique({
      where: { id: orderId },
    })

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    if (order.userId !== userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    // Create Stripe Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(Number(order.total) * 100), // Convert to cents
      currency: "pkr",
      metadata: {
        orderId: order.id,
        orderNumber: order.orderNumber,
      },
      automatic_payment_methods: {
        enabled: true,
      },
    })

    // Update order with Stripe payment ID
    await prisma.order.update({
      where: { id: orderId },
      data: {
        stripePaymentId: paymentIntent.id,
      },
    })

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    })
  } catch (error) {
    console.error("Payment intent error:", error)
    return NextResponse.json(
      { error: "Failed to create payment intent" },
      { status: 500 }
    )
  }
}
