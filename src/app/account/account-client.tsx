"use client"

import { useState } from "react"
import { User, Package, MapPin, Settings, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatPrice, formatDate, formatOrderNumber } from "@/lib/utils"
import { useClerk } from "@clerk/nextjs"

interface Order {
  id: string
  orderNumber: string
  status: string
  total: number
  createdAt: Date
  items: {
    quantity: number
    price: number
    product: {
      name: string
      image?: string | null
    }
  }[]
  address?: {
    street: string
    city: string
  } | null
}

interface AccountClientProps {
  userId: string
  initialOrders: Order[]
}

const statusColors: Record<string, string> = {
  DELIVERED: "bg-green-500/10 text-green-400 border-green-500/20",
  PENDING: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  CONFIRMED: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  PREPARING: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  OUT_FOR_DELIVERY: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  CANCELLED: "bg-red-500/10 text-red-400 border-red-500/20",
}

export function AccountClient({ userId, initialOrders }: AccountClientProps) {
  const [activeTab, setActiveTab] = useState<"orders" | "addresses" | "settings">("orders")
  const { signOut } = useClerk()

  const tabs = [
    { id: "orders", label: "Orders", icon: Package },
    { id: "addresses", label: "Addresses", icon: MapPin },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  return (
    <div className="grid lg:grid-cols-4 gap-8">
      {/* Sidebar */}
      <div className="lg:col-span-1">
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <div className="text-center mb-6">
            <div className="h-20 w-20 rounded-full bg-orange-500/10 border-2 border-orange-500/20 flex items-center justify-center mx-auto mb-4">
              <User className="h-10 w-10 text-orange-400" />
            </div>
            <h3 className="font-black text-white text-lg">My Account</h3>
            <p className="text-xs text-zinc-500 mt-1 truncate max-w-[160px] mx-auto">{userId}</p>
          </div>
          <div className="w-full h-px bg-zinc-800 mb-4" />
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-orange-500/10 text-orange-400 border border-orange-500/20"
                    : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                }`}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </nav>
          <div className="w-full h-px bg-zinc-800 my-4" />
          <button
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors"
            onClick={() => signOut()}
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:col-span-3">
        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div className="space-y-4">
            <h2 className="text-2xl font-black text-white mb-6">Order History</h2>
            {initialOrders.length > 0 ? (
              initialOrders.map((order) => (
                <div key={order.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-black text-white font-mono">
                          {formatOrderNumber(order.orderNumber)}
                        </span>
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${statusColors[order.status] || "bg-zinc-800 text-zinc-400 border-zinc-700"}`}>
                          {order.status}
                        </span>
                      </div>
                      <p className="text-sm text-zinc-500">{formatDate(order.createdAt)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-black text-orange-400">{formatPrice(order.total)}</p>
                      <p className="text-sm text-zinc-500">{order.items.length} items</p>
                    </div>
                  </div>
                  <div className="w-full h-px bg-zinc-800 mb-5" />
                  <div className="space-y-3">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className="h-14 w-14 rounded-xl overflow-hidden bg-zinc-800 border border-zinc-700 flex-shrink-0">
                          <img
                            src={item.product.image || "/placeholder-food.jpg"}
                            alt={item.product.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-white text-sm truncate">{item.product.name}</p>
                          <p className="text-xs text-zinc-500 mt-0.5">
                            {item.quantity}× {formatPrice(item.price)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  {order.address && (
                    <>
                      <div className="w-full h-px bg-zinc-800 my-4" />
                      <div className="flex items-start gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-orange-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-zinc-400 text-xs">{order.address.street}, {order.address.city}</p>
                        </div>
                      </div>
                    </>
                  )}
                  <div className="flex gap-2 mt-5">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white rounded-lg text-xs h-8"
                    >
                      View Details
                    </Button>
                    {order.status === "DELIVERED" && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white rounded-lg text-xs h-8"
                      >
                        Reorder
                      </Button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl py-16 text-center">
                <div className="h-16 w-16 rounded-full bg-zinc-800 flex items-center justify-center mx-auto mb-4">
                  <Package className="h-8 w-8 text-zinc-600" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">No orders yet</h3>
                <p className="text-zinc-500 mb-6 text-sm">Start ordering to see your order history</p>
                <Button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl" asChild>
                  <a href="/menu">Browse Menu</a>
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Addresses Tab */}
        {activeTab === "addresses" && (
          <div>
            <h2 className="text-2xl font-black text-white mb-6">Saved Addresses</h2>
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl py-16 text-center">
              <div className="h-16 w-16 rounded-full bg-zinc-800 flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-zinc-600" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">No saved addresses</h3>
              <p className="text-zinc-500 text-sm">Add addresses during checkout for faster ordering</p>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <div>
            <h2 className="text-2xl font-black text-white mb-6">Account Settings</h2>
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl py-16 text-center">
              <div className="h-16 w-16 rounded-full bg-zinc-800 flex items-center justify-center mx-auto mb-4">
                <Settings className="h-8 w-8 text-zinc-600" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Account Settings</h3>
              <p className="text-zinc-500 mb-6 text-sm">Manage your account settings and preferences</p>
              <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white rounded-xl">
                Manage Profile
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
