"use client"

import { useState } from "react"
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Users,
  Settings,
  TrendingUp,
  DollarSign,
  Clock,
  Box,
  CheckCircle,
  XCircle
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { formatPrice, formatDate } from "@/lib/utils"
import { ProductManagement } from "@/components/admin/product-management"
import { OrderManagement } from "@/components/admin/order-management"

interface Stats {
  totalOrders: number
  totalRevenue: number
  pendingOrders: number
  totalProducts: number
}

interface Order {
  id: string
  orderNumber: string
  status: string
  total: number
  createdAt: Date
  user: {
    email: string
    firstName?: string | null
    lastName?: string | null
  }
  items: {
    quantity: number
    price: number
    product: {
      name: string
      image?: string | null
    }
  }[]
}

interface AdminDashboardProps {
  stats: Stats
  recentOrders: Order[]
}

export function AdminDashboard({ stats, recentOrders }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview")

  const statsCards = [
    {
      title: "Total Revenue",
      value: formatPrice(stats.totalRevenue),
      icon: DollarSign,
      change: "+12.5%",
      changeType: "positive",
    },
    {
      title: "Total Orders",
      value: stats.totalOrders.toString(),
      icon: ShoppingBag,
      change: "+8.2%",
      changeType: "positive",
    },
    {
      title: "Pending Orders",
      value: stats.pendingOrders.toString(),
      icon: Clock,
      change: "-2.4%",
      changeType: "negative",
    },
    {
      title: "Total Products",
      value: stats.totalProducts.toString(),
      icon: Box,
      change: "+4",
      changeType: "positive",
    },
  ]

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Sidebar */}
      <aside className="w-full lg:w-64 min-h-screen border-r bg-white flex-shrink-0">
        <div className="p-6">
          <h2 className="text-xl font-bold bg-gradient-to-r from-brand-600 to-orange-500 bg-clip-text text-transparent">
            Admin Panel
          </h2>
        </div>
        <nav className="space-y-1 px-4 pb-4">
          {[
            { id: "overview", label: "Overview", icon: LayoutDashboard },
            { id: "orders", label: "Orders", icon: ShoppingBag },
            { id: "products", label: "Products", icon: Package },
            { id: "customers", label: "Customers", icon: Users },
            { id: "settings", label: "Settings", icon: Settings },
          ].map((item) => (
            <Button
              key={item.id}
              variant={activeTab === item.id ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab(item.id)}
            >
              <item.icon className="h-4 w-4 mr-2" />
              {item.label}
            </Button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-gray-50">
        {activeTab === "overview" && (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Dashboard Overview</h1>
              <p className="text-muted-foreground">
                Welcome back! Here&apos;s what&apos;s happening with your restaurant today.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
              {statsCards.map((stat) => (
                <Card key={stat.title}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {stat.title}
                    </CardTitle>
                    <stat.icon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p
                      className={`text-xs ${
                        stat.changeType === "positive"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {stat.change} from last month
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Orders */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                {recentOrders.length > 0 ? (
                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-full bg-brand-100 flex items-center justify-center">
                            <ShoppingBag className="h-5 w-5 text-brand-600" />
                          </div>
                          <div>
                            <p className="font-medium">{order.orderNumber}</p>
                            <p className="text-sm text-muted-foreground">
                              {order.user.email}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="font-medium">{formatPrice(order.total)}</p>
                            <p className="text-xs text-muted-foreground">
                              {order.items.length} items
                            </p>
                          </div>
                          <Badge variant={getStatusColor(order.status)}>
                            {order.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No orders yet
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        )}

        {activeTab === "orders" && (
          <OrderManagement initialOrders={recentOrders} />
        )}

        {activeTab === "products" && (
          <ProductManagement initialProducts={[]} />
        )}

        {activeTab === "customers" && (
          <Card>
            <CardHeader>
              <CardTitle>Customers</CardTitle>
            </CardHeader>
            <CardContent className="py-12 text-center">
              <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Customer Management</h3>
              <p className="text-muted-foreground">
                View and manage your customer base
              </p>
            </CardContent>
          </Card>
        )}

        {activeTab === "settings" && (
          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
            </CardHeader>
            <CardContent className="py-12 text-center">
              <Settings className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Restaurant Settings</h3>
              <p className="text-muted-foreground">
                Configure your restaurant settings, delivery zones, and more
              </p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}

function getStatusColor(status: string) {
  switch (status) {
    case "DELIVERED":
      return "success"
    case "PENDING":
    case "CONFIRMED":
      return "warning"
    case "PREPARING":
    case "READY":
    case "OUT_FOR_DELIVERY":
      return "brand"
    case "CANCELLED":
      return "destructive"
    default:
      return "default"
  }
}
