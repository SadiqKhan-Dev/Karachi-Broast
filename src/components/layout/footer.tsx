import Link from "next/link"
import { Facebook, Instagram, Twitter, Phone, Mail, MapPin, Clock } from "lucide-react"

const footerLinks = {
  menu: [
    { name: "Broast & Chicken", href: "/menu?category=broast-chicken" },
    { name: "Burgers", href: "/menu?category=burgers" },
    { name: "Pizza", href: "/menu?category=pizza" },
    { name: "Sides & Snacks", href: "/menu?category=sides-snacks" },
    { name: "Deals & Combos", href: "/menu?category=deals-combos" },
    { name: "Beverages", href: "/menu?category=beverages" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/contact" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ],
  support: [
    { name: "FAQ", href: "/faq" },
    { name: "Delivery Info", href: "/delivery" },
    { name: "Track Order", href: "/track-order" },
    { name: "Refund Policy", href: "/refunds" },
    { name: "Cookie Policy", href: "/cookies" },
  ],
}

export function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <span className="text-2xl font-black text-gradient">
                Karachi Broast
              </span>
            </Link>
            <p className="text-zinc-400 text-sm leading-relaxed mb-6 max-w-sm">
              Serving the crispiest, juiciest broast and fast food in Karachi since 2010.
              Secret recipes, fresh ingredients, and a flavour that keeps you coming back.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-zinc-400">
                <MapPin className="h-4 w-4 text-orange-500 flex-shrink-0" />
                Main Street, Karachi, Pakistan
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-orange-500 flex-shrink-0" />
                <a href="tel:+92211234567" className="text-zinc-400 hover:text-orange-400 transition-colors">
                  +92 21 1234567
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-orange-500 flex-shrink-0" />
                <a href="mailto:info@karachibbroast.com" className="text-zinc-400 hover:text-orange-400 transition-colors">
                  info@karachibbroast.com
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm text-zinc-400">
                <Clock className="h-4 w-4 text-orange-500 flex-shrink-0" />
                Daily: 12:00 PM – 2:00 AM
              </div>
            </div>

            {/* Social */}
            <div className="flex gap-3 mt-6">
              {[
                { name: "Facebook", href: "#", icon: Facebook },
                { name: "Instagram", href: "#", icon: Instagram },
                { name: "Twitter", href: "#", icon: Twitter },
              ].map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  aria-label={s.name}
                  className="h-10 w-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-orange-400 hover:border-orange-500/40 transition-all"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Menu Links */}
          <div>
            <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-widest">Menu</h3>
            <ul className="space-y-2.5">
              {footerLinks.menu.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-zinc-400 hover:text-orange-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-widest">Company</h3>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-zinc-400 hover:text-orange-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-widest">Support</h3>
            <ul className="space-y-2.5">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-zinc-400 hover:text-orange-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-zinc-800">
        <div className="container py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-sm text-zinc-500">
            &copy; {new Date().getFullYear()} Karachi Broast. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {[
              { name: "Privacy", href: "/privacy" },
              { name: "Terms", href: "/terms" },
              { name: "Cookies", href: "/cookies" },
            ].map((link) => (
              <Link key={link.name} href={link.href} className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors">
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
