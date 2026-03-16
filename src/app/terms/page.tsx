import { Metadata } from "next"
import Link from "next/link"
import { FileText } from "lucide-react"

export const metadata: Metadata = {
  title: "Terms of Service | Karachi Broast",
  description: "Read the terms and conditions for using Karachi Broast services.",
}

const sections = [
  {
    title: "1. Acceptance of Terms",
    content: "By accessing and using the Karachi Broast website and services, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.",
  },
  {
    title: "2. Ordering & Payment",
    list: [
      "All prices are in Pakistani Rupees (PKR) and include applicable taxes",
      "Orders are subject to availability and confirmation",
      "Payment must be completed before order preparation begins (for online payments)",
      "We reserve the right to refuse or cancel any order at our discretion",
    ],
  },
  {
    title: "3. Delivery",
    list: [
      "Delivery times are estimates and may vary based on demand and location",
      "You are responsible for providing accurate delivery information",
      "Karachi Broast is not liable for delays caused by incorrect addresses",
      "Delivery is available within our designated delivery zones only",
    ],
  },
  {
    title: "4. Food Quality & Allergies",
    content: "We take food quality seriously. However, our kitchen handles common allergens including nuts, dairy, gluten, and eggs. If you have food allergies, please contact us before ordering. Karachi Broast is not liable for allergic reactions where allergen information was not requested.",
  },
  {
    title: "5. Cancellations & Refunds",
    content: "Orders can be cancelled within 5 minutes of placement. Once preparation has begun, cancellations are not possible.",
    link: { text: "See our Refund Policy", href: "/refunds" },
  },
  {
    title: "6. Account Responsibilities",
    content: "You are responsible for maintaining the confidentiality of your account credentials. You agree to notify us immediately of any unauthorized use of your account. Karachi Broast is not liable for losses resulting from unauthorized account access.",
  },
  {
    title: "7. Changes to Terms",
    content: "We reserve the right to modify these terms at any time. Changes will be posted on this page with an updated date. Continued use of our services after changes constitutes acceptance of the new terms.",
  },
  {
    title: "8. Contact",
    content: "Questions about these terms? Contact us at info@karachibbroast.com or call +92 21 1234567.",
  },
]

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-950/30 via-zinc-950 to-zinc-950" />
        <div className="container relative z-10 text-center">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500/10 border border-orange-500/20 mb-6 mx-auto">
            <FileText className="h-7 w-7 text-orange-400" />
          </div>
          <h1 className="text-5xl font-black mb-4">Terms of Service</h1>
          <p className="text-zinc-500 text-sm">Last updated: March 2025</p>
        </div>
      </section>

      <div className="container max-w-3xl pb-20">
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 md:p-10 space-y-8">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-xl font-black text-white mb-3">{section.title}</h2>
              {section.content && (
                <p className="text-zinc-400 leading-relaxed text-sm">
                  {section.content}{" "}
                  {section.link && (
                    <Link href={section.link.href} className="text-orange-400 hover:text-orange-300 underline underline-offset-4">
                      {section.link.text}
                    </Link>
                  )}
                </p>
              )}
              {section.list && (
                <ul className="space-y-2 mt-2">
                  {section.list.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-zinc-400 text-sm">
                      <span className="h-1.5 w-1.5 rounded-full bg-orange-500 flex-shrink-0 mt-2" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
