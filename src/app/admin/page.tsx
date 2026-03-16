import { Metadata } from "next"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { AdminDashboard } from "./admin-dashboard"
import { prisma } from "@/lib/prisma"

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Manage your restaurant",
}

async function getDashboardStats() {
  try {
    const [totalOrders, totalRevenue, pendingOrders, totalProducts] = await Promise.all([
      prisma.order.count(),
      prisma.order.aggregate({
        _sum: { total: true },
        where: { paymentStatus: "PAID" },
      }),
      prisma.order.count({
        where: { status: { in: ["PENDING", "CONFIRMED"] } },
      }),
      prisma.product.count(),
    ])

    return {
      totalOrders,
      totalRevenue: Number(totalRevenue._sum.total) || 0,
      pendingOrders,
      totalProducts,
    }
  } catch {
    return {
      totalOrders: 0,
      totalRevenue: 0,
      pendingOrders: 0,
      totalProducts: 0,
    }
  }
}

async function getRecentOrders() {
  try {
    const orders = await prisma.order.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      include: {
        user: true,
        items: {
          include: {
            product: true,
          },
        },
      },
    })
    
    // Convert Decimal to number for serialization and ensure all required fields
    return orders.map(order => ({
      ...order,
      total: Number(order.total),
      items: order.items.map(item => ({
        ...item,
        price: Number(item.price),
        product: {
          ...item.product,
          image: item.product.image,
        },
      })),
    }))
  } catch {
    return []
  }
}

export default async function AdminPage() {
  const { userId, sessionClaims } = await auth()

  if (!userId) {
    redirect('/sign-in')
  }

  const metadata = sessionClaims?.metadata as { role?: string } | undefined
  const role = metadata?.role as string
  if (role !== 'admin') {
    redirect('/')
  }

  const stats = await getDashboardStats()
  const recentOrders = await getRecentOrders()

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminDashboard stats={stats} recentOrders={recentOrders} />
    </div>
  )
}
