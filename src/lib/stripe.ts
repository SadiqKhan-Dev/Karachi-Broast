import Stripe from 'stripe'

let _stripe: Stripe | null = null

export const getStripe = () => {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY
    if (!key || key.includes('your-stripe')) {
      throw new Error('STRIPE_SECRET_KEY is not configured')
    }
    _stripe = new Stripe(key, {
      apiVersion: '2024-12-18.acacia',
      typescript: true,
    })
  }
  return _stripe
}

// Keep backward compat — lazy proxy
export const stripe = new Proxy({} as Stripe, {
  get(_target, prop) {
    return getStripe()[prop as keyof Stripe]
  },
})

export const calculateOrderAmount = (_items: number, subtotal: number) => {
  const deliveryFee = 150
  const taxRate = 0.13
  const tax = Math.round(subtotal * taxRate)
  const total = subtotal + deliveryFee + tax
  return { subtotal, deliveryFee, tax, total }
}

export const createPaymentIntent = async (amount: number, orderId: string) => {
  const paymentIntent = await getStripe().paymentIntents.create({
    amount: amount * 100,
    currency: 'pkr',
    metadata: { orderId },
    automatic_payment_methods: { enabled: true },
  })
  return paymentIntent
}
