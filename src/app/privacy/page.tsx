import { Metadata } from "next"
import { Shield } from "lucide-react"

export const metadata: Metadata = {
  title: "Privacy Policy | Karachi Broast",
  description: "Learn how Karachi Broast collects, uses, and protects your personal information.",
}

const sections = [
  {
    title: "1. Information We Collect",
    content: "We collect information you provide directly to us when you create an account, place an order, or contact us. This includes your name, email address, phone number, and delivery address.",
  },
  {
    title: "2. How We Use Your Information",
    list: [
      "Process and fulfill your orders",
      "Send order confirmations and delivery updates",
      "Respond to your comments and questions",
      "Improve our products and services",
      "Send promotional communications (with your consent)",
    ],
  },
  {
    title: "3. Information Sharing",
    content: "We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except to trusted service providers who assist us in operating our website and conducting our business, provided those parties agree to keep this information confidential.",
  },
  {
    title: "4. Data Security",
    content: "We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. Payment data is processed securely through Stripe and is never stored on our servers.",
  },
  {
    title: "5. Cookies",
    content: "We use cookies to enhance your browsing experience, remember your preferences, and analyze site traffic. You can choose to disable cookies through your browser settings, though this may affect some features of our site.",
  },
  {
    title: "6. Your Rights",
    content: "You have the right to access, correct, or delete your personal data. To exercise these rights, please contact us at info@karachibbroast.com.",
  },
  {
    title: "7. Contact Us",
    content: "If you have any questions about this Privacy Policy, please contact us at: info@karachibbroast.com | +92 21 1234567 | Main Street, Karachi, Pakistan.",
  },
]

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-950/30 via-zinc-950 to-zinc-950" />
        <div className="container relative z-10 text-center">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500/10 border border-orange-500/20 mb-6 mx-auto">
            <Shield className="h-7 w-7 text-orange-400" />
          </div>
          <h1 className="text-5xl font-black mb-4">Privacy Policy</h1>
          <p className="text-zinc-500 text-sm">Last updated: March 2025</p>
        </div>
      </section>

      <div className="container max-w-3xl pb-20">
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 md:p-10 space-y-8">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-xl font-black text-white mb-3">{section.title}</h2>
              {section.content && (
                <p className="text-zinc-400 leading-relaxed text-sm">{section.content}</p>
              )}
              {section.list && (
                <ul className="space-y-2 mt-2">
                  {section.list.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-zinc-400 text-sm">
                      <span className="h-1.5 w-1.5 rounded-full bg-orange-500 flex-shrink-0" />
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
