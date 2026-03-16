import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "FAQ | Karachi Broast",
  description: "Frequently asked questions about Karachi Broast ordering, delivery, and more.",
}

const faqs = [
  {
    category: "Ordering",
    questions: [
      { q: "How do I place an order?", a: "Browse our menu, add items to your cart, and proceed to checkout. You can pay via cash on delivery or card." },
      { q: "Can I customize my order?", a: "Yes! Many items have customization options like spice level, size, and add-ons available on the product page." },
      { q: "Is there a minimum order amount?", a: "There is no minimum order amount, but orders above Rs. 1000 qualify for free delivery." },
      { q: "Can I cancel my order?", a: "Orders can be cancelled within 5 minutes of placement. After that, preparation may have begun." },
    ],
  },
  {
    category: "Delivery",
    questions: [
      { q: "How long does delivery take?", a: "We aim for 30–45 minutes. Delivery time may vary depending on your location and order volume." },
      { q: "What areas do you deliver to?", a: "We currently deliver within Karachi. Enter your address at checkout to confirm availability in your area." },
      { q: "How much is the delivery fee?", a: "Delivery fee is Rs. 150. Free delivery on orders above Rs. 1000." },
      { q: "How can I track my order?", a: "After placing an order, you can track its status in My Account under Order History." },
    ],
  },
  {
    category: "Payment",
    questions: [
      { q: "What payment methods do you accept?", a: "We accept Cash on Delivery (COD), JazzCash, Easypaisa, and major credit/debit cards." },
      { q: "Is online payment secure?", a: "Yes. All card payments are processed securely through Stripe with industry-standard encryption." },
      { q: "Can I get a refund?", a: "Yes, under certain conditions. Please see our Refund Policy for details." },
    ],
  },
  {
    category: "Food & Quality",
    questions: [
      { q: "Are your ingredients halal?", a: "Yes, all our meat is 100% halal certified from trusted suppliers." },
      { q: "Do you cater to food allergies?", a: "Our kitchen handles common allergens. Please contact us before ordering if you have severe allergies." },
      { q: "How fresh is the food?", a: "Everything is freshly prepared after you order. We never serve reheated or pre-made meals." },
    ],
  },
]

export default function FaqPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-950/40 via-zinc-950 to-zinc-950" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-600/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="container relative z-10 text-center">
          <p className="text-orange-500 text-sm font-semibold uppercase tracking-widest mb-4">Help Center</p>
          <h1 className="text-5xl md:text-6xl font-black mb-6">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h1>
          <p className="text-zinc-400 text-lg max-w-xl mx-auto">
            Can&apos;t find what you&apos;re looking for?{" "}
            <Link href="/contact" className="text-orange-400 hover:text-orange-300 underline underline-offset-4">
              Contact us
            </Link>
          </p>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16">
        <div className="container max-w-4xl">
          <div className="space-y-12">
            {faqs.map((section) => (
              <div key={section.category}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px flex-1 bg-zinc-800" />
                  <h2 className="text-orange-500 text-sm font-semibold uppercase tracking-widest">{section.category}</h2>
                  <div className="h-px flex-1 bg-zinc-800" />
                </div>
                <div className="space-y-3">
                  {section.questions.map((item) => (
                    <div key={item.q} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 transition-colors">
                      <h3 className="font-bold text-white text-lg mb-2">{item.q}</h3>
                      <p className="text-zinc-400 text-sm leading-relaxed">{item.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center bg-zinc-900 border border-zinc-800 rounded-2xl p-10">
            <p className="text-zinc-400 mb-2">Still have questions?</p>
            <h3 className="text-2xl font-black text-white mb-6">We&apos;re Happy to Help</h3>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl h-12 px-8" asChild>
              <Link href="/contact">Contact Support</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
