import { Metadata } from "next"
import { Cookie } from "lucide-react"

export const metadata: Metadata = {
  title: "Cookie Policy | Karachi Broast",
  description: "Learn how Karachi Broast uses cookies on its website.",
}

const cookieTypes = [
  {
    type: "Essential Cookies",
    desc: "Required for the website to function. These include your shopping cart, authentication session, and security tokens. You cannot opt out of these cookies.",
    color: "bg-orange-500",
  },
  {
    type: "Preference Cookies",
    desc: "Remember your settings and preferences, such as your saved cart, language, and display options.",
    color: "bg-blue-500",
  },
  {
    type: "Analytics Cookies",
    desc: "Help us understand how visitors interact with our website by collecting and reporting information anonymously. We use this to improve our site.",
    color: "bg-purple-500",
  },
  {
    type: "Marketing Cookies",
    desc: "Used to track visitors across websites to display relevant advertisements. We do not currently use marketing cookies.",
    color: "bg-zinc-600",
  },
]

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-950/30 via-zinc-950 to-zinc-950" />
        <div className="container relative z-10 text-center">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500/10 border border-orange-500/20 mb-6 mx-auto">
            <Cookie className="h-7 w-7 text-orange-400" />
          </div>
          <h1 className="text-5xl font-black mb-4">Cookie Policy</h1>
          <p className="text-zinc-500 text-sm">Last updated: March 2025</p>
        </div>
      </section>

      <div className="container max-w-3xl pb-20">
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 md:p-10 space-y-8">
          <div>
            <h2 className="text-xl font-black text-white mb-3">What Are Cookies?</h2>
            <p className="text-zinc-400 leading-relaxed text-sm">
              Cookies are small text files placed on your device by websites you visit. They are widely used to make websites work more efficiently and to provide information to website owners.
            </p>
          </div>

          <div className="w-full h-px bg-zinc-800" />

          <div>
            <h2 className="text-xl font-black text-white mb-5">How We Use Cookies</h2>
            <div className="space-y-4">
              {cookieTypes.map((item) => (
                <div key={item.type} className="flex gap-4 bg-zinc-950 border border-zinc-800 rounded-xl p-5">
                  <div className={`h-3 w-3 rounded-full ${item.color} flex-shrink-0 mt-1`} />
                  <div>
                    <h3 className="font-bold text-white mb-1">{item.type}</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full h-px bg-zinc-800" />

          <div>
            <h2 className="text-xl font-black text-white mb-3">Managing Cookies</h2>
            <p className="text-zinc-400 leading-relaxed text-sm mb-3">
              You can control and/or delete cookies as you wish. You can delete all cookies already on your computer and set most browsers to prevent them from being placed.
            </p>
            <p className="text-zinc-400 leading-relaxed text-sm">
              Note that disabling certain cookies may impact the functionality of our website, including your ability to add items to the cart or stay signed in.
            </p>
          </div>

          <div className="w-full h-px bg-zinc-800" />

          <div>
            <h2 className="text-xl font-black text-white mb-3">Third-Party Cookies</h2>
            <p className="text-zinc-400 text-sm mb-3">Some features on our site may use third-party services that set their own cookies, including:</p>
            <ul className="space-y-2">
              {[
                { name: "Clerk", desc: "Authentication and session management" },
                { name: "Stripe", desc: "Secure payment processing" },
              ].map((item) => (
                <li key={item.name} className="flex items-center gap-2 text-zinc-400 text-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-orange-500 flex-shrink-0" />
                  <span className="text-white font-semibold">{item.name}</span> — {item.desc}
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full h-px bg-zinc-800" />

          <div>
            <h2 className="text-xl font-black text-white mb-3">Contact Us</h2>
            <p className="text-zinc-400 text-sm">
              If you have questions about our cookie policy, contact us at{" "}
              <a href="mailto:info@karachibbroast.com" className="text-orange-400 hover:text-orange-300">
                info@karachibbroast.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
