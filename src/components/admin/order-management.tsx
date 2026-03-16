"use client"

import { useState } from "react"
import { Search, Eye, Phone, Mail, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { formatPrice, formatDate } from "@/lib/utils"
import { updateOrderStatus } from "@/actions"

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
    phone?: string | null
  }
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
    state: string
    zipCode: string
  } | null
}

interface OrderManagementProps {
  initialOrders: Order[]
}

export function OrderManagement({ initialOrders }: OrderManagementProps) {
  const [orders, setOrders] = useState<Order[]>(initialOrders)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleUpdateStatus = async (orderId: string, newStatus: string) => {
    const result = await updateOrderStatus(orderId, newStatus)
    if (result.success) {
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
      )
    }
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Orders</h2>
        <p className="text-muted-foreground">
          Manage and track all customer orders
        </p>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by order number or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Orders</SelectItem>
                <SelectItem value="PENDING">Pending</SelectItem>
                <SelectItem value="CONFIRMED">Confirmed</SelectItem>
                <SelectItem value="PREPARING">Preparing</SelectItem>
                <SelectItem value="READY">Ready</SelectItem>
                <SelectItem value="OUT_FOR_DELIVERY">Out for Delivery</SelectItem>
                <SelectItem value="DELIVERED">Delivered</SelectItem>
                <SelectItem value="CANCELLED">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left p-4 font-medium text-muted-foreground">Order</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Customer</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Items</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Total</th>
                  <th className="text-center p-4 font-medium text-muted-foreground">Status</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Date</th>
                  <th className="text-right p-4 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <tr key={order.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <p className="font-medium">{order.orderNumber}</p>
                      </td>
                      <td className="p-4">
                        <div>
                          <p className="font-medium">
                            {order.user.firstName || order.user.email}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {order.user.email}
                          </p>
                        </div>
                      </td>
                      <td className="p-4">
                        <p className="text-sm">{order.items.length} items</p>
                      </td>
                      <td className="p-4">
                        <p className="font-medium">{formatPrice(order.total)}</p>
                      </td>
                      <td className="p-4 text-center">
                        <Badge variant={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <p className="text-sm">
                          {formatDate(order.createdAt)}
                        </p>
                      </td>
                      <td className="p-4 text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedOrder(order)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-muted-foreground">
                      No orders found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Order Details Dialog */}
      {selectedOrder && (
        <OrderDetailsDialog
          order={selectedOrder}
          open={!!selectedOrder}
          onOpenChange={() => setSelectedOrder(null)}
          onUpdateStatus={handleUpdateStatus}
        />
      )}
    </div>
  )
}

function OrderDetailsDialog({
  order,
  open,
  onOpenChange,
  onUpdateStatus,
}: {
  order: Order
  open: boolean
  onOpenChange: (open: boolean) => void
  onUpdateStatus: (orderId: string, status: string) => void
}) {
  const [status, setStatus] = useState(order.status)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Order Details - {order.orderNumber}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status Update */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Current Status</p>
              <Badge variant={getStatusColor(status)} className="mt-1">
                {status}
              </Badge>
            </div>
            <Select value={status} onValueChange={(v) => setStatus(v)}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Update status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PENDING">Pending</SelectItem>
                <SelectItem value="CONFIRMED">Confirmed</SelectItem>
                <SelectItem value="PREPARING">Preparing</SelectItem>
                <SelectItem value="READY">Ready</SelectItem>
                <SelectItem value="OUT_FOR_DELIVERY">Out for Delivery</SelectItem>
                <SelectItem value="DELIVERED">Delivered</SelectItem>
                <SelectItem value="CANCELLED">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator />

          {/* Customer Info */}
          <div>
            <h4 className="font-semibold mb-3">Customer Information</h4>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{order.user.email}</span>
              </div>
              {order.user.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{order.user.phone}</span>
                </div>
              )}
              {order.user.firstName && (
                <div className="flex items-center gap-2">
                  <span className="text-sm">
                    {order.user.firstName} {order.user.lastName}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Delivery Address */}
          {order.address && (
            <>
              <Separator />
              <div>
                <h4 className="font-semibold mb-3">Delivery Address</h4>
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm">{order.address.street}</p>
                    <p className="text-sm">
                      {order.address.city}, {order.address.state} {order.address.zipCode}
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}

          <Separator />

          {/* Order Items */}
          <div>
            <h4 className="font-semibold mb-3">Order Items</h4>
            <div className="space-y-3">
              {order.items.map((item, index) => (
                <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  <div className="h-16 w-16 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                    {item.product.image ? (
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center">
                        <span className="text-xs text-muted-foreground">No Image</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{item.product.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Qty: {item.quantity} × {formatPrice(item.price)}
                    </p>
                  </div>
                  <p className="font-medium">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Order Summary */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatPrice(order.total)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>{formatPrice(order.total)}</span>
              </div>
            </div>
          </div>

          {/* Order Date */}
          <div className="text-sm text-muted-foreground">
            Order placed: {formatDate(order.createdAt)}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
            <Button
              onClick={() => {
                onUpdateStatus(order.id, status)
                onOpenChange(false)
              }}
            >
              Update Status
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
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
