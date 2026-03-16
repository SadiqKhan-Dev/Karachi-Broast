import { Metadata } from "next"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { AccountClient } from "./account-client"
import { prisma } from "@/lib/prisma"

export const metadata: Metadata = {
  title: "My Account",
  description: "Manage your account and orders",
}

async function getUserOrders(clerkId: string) {
  try {
    const orders = await prisma.order.findMany({
      where: { userId: clerkId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        address: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 10,
    })
    
    // Convert Decimal to number for serialization
    return orders.map(order => ({
      ...order,
      total: Number(order.total),
      subtotal: Number(order.subtotal),
      deliveryFee: Number(order.deliveryFee),
      tax: Number(order.tax),
      items: order.items.map(item => ({
        ...item,
        price: Number(item.price),
      })),
    }))
  } catch {
    return []
  }
}

export default async function AccountPage() {
  const { userId } = await auth()

  if (!userId) {
    redirect('/sign-in')
  }

  const orders = await getUserOrders(userId)

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="container py-10">
        <div className="mb-8">
          <p className="text-orange-500 text-sm font-semibold uppercase tracking-widest mb-2">Dashboard</p>
          <h1 className="text-4xl font-black text-white">My Account</h1>
        </div>
        <AccountClient userId={userId} initialOrders={orders} />
      </div>
    </div>
  )
}
