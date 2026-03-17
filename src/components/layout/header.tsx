"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ShoppingCart, Menu, User, Search, Phone, X } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCartStore } from "@/stores/cart-store"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Menu", href: "/menu" },
  { name: "Deals", href: "/menu?category=deals-combos" },
  { name: "What's New", href: "/whats-new" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
]

export function Header() {
  const pathname = usePathname()
  const { getCart } = useCartStore()
  const cart = getCart()
  const [searchQuery, setSearchQuery] = useState("")
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800/60 bg-zinc-950/90 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <span className="text-xl font-black tracking-tight text-gradient">
            Karachi Broast
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "relative px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                pathname === item.href
                  ? "text-orange-400 bg-orange-500/10"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800"
              )}
            >
              {item.name}
              {item.href === "/whats-new" && (
                <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
              )}
            </Link>
          ))}
        </nav>

        {/* Search — Desktop */}
        <div className="hidden lg:flex items-center flex-1 max-w-xs">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <Input
              type="search"
              placeholder="Search menu..."
              className="pl-10 bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-600 focus-visible:ring-orange-500 focus-visible:border-orange-500/50 h-9 text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && searchQuery.trim()) {
                  window.location.href = `/menu?search=${encodeURIComponent(searchQuery)}`
                }
              }}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Phone — Desktop */}
          <a
            href="tel:+92211234567"
            className="hidden xl:flex items-center gap-2 text-sm text-zinc-500 hover:text-orange-400 transition-colors"
          >
            <Phone className="h-4 w-4" />
            +92 21 1234567
          </a>

          {/* Cart */}
          <Button
            variant="ghost"
            size="icon"
            className="relative text-zinc-400 hover:text-white hover:bg-zinc-800"
            onClick={() => useCartStore.getState().setIsOpen(true)}
          >
            <ShoppingCart className="h-5 w-5" />
            {cart.itemCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-orange-500 text-xs text-white flex items-center justify-center font-bold"
              >
                {cart.itemCount}
              </motion.span>
            )}
          </Button>

          {/* Account */}
          <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white hover:bg-zinc-800" asChild>
            <Link href="/account">
              <User className="h-5 w-5" />
            </Link>
          </Button>

          {/* Mobile menu toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-zinc-400 hover:text-white hover:bg-zinc-800"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-zinc-800 bg-zinc-950"
          >
            <div className="container py-4 space-y-1">
              {/* Mobile search */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                <Input
                  type="search"
                  placeholder="Search menu..."
                  className="pl-10 bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-600"
                  onKeyDown={(e) => {
                    const target = e.target as HTMLInputElement
                    if (e.key === "Enter" && target.value.trim()) {
                      window.location.href = `/menu?search=${encodeURIComponent(target.value)}`
                    }
                  }}
                />
              </div>
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                    pathname === item.href
                      ? "text-orange-400 bg-orange-500/10"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                  )}
                >
                  {item.name}
                  {item.href === "/whats-new" && (
                    <span className="text-xs bg-orange-500 text-white px-2 py-0.5 rounded-full font-semibold">New</span>
                  )}
                </Link>
              ))}
              <a
                href="tel:+92211234567"
                className="flex items-center gap-2 px-4 py-3 text-sm text-zinc-500"
              >
                <Phone className="h-4 w-4" />
                +92 21 1234567
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
