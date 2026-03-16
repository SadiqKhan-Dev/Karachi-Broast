import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
  typescript: true,
})

export const calculateOrderAmount = (items: number, subtotal: number) => {
  const deliveryFee = 150 // Rs. 150 delivery fee
  const taxRate = 0.13 // 13% tax
  const tax = Math.round(subtotal * taxRate)
  const total = subtotal + deliveryFee + tax

  return {
    subtotal,
    deliveryFee,
    tax,
    total,
  }
}

export const createPaymentIntent = async (amount: number, orderId: string) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount * 100, // Convert to cents
    currency: 'pkr',
    metadata: {
      orderId,
    },
    automatic_payment_methods: {
      enabled: true,
    },
  })

  return paymentIntent
}
