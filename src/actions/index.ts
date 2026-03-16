"use server"

import { prisma } from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"
import { z } from "zod"

// ============================================
// ORDER ACTIONS
// ============================================

const createOrderSchema = z.object({
  clerkUserId: z.string(),
  items: z.array(z.object({
    productId: z.string(),
    quantity: z.number().min(1),
    price: z.number(),
    customizations: z.record(z.string(), z.union([z.string(), z.array(z.string())])).optional(),
    notes: z.string().optional(),
  })),
  subtotal: z.number(),
  deliveryFee: z.number(),
  tax: z.number(),
  discount: z.number().optional(),
  total: z.number(),
  paymentMethod: z.enum(["CASH_ON_DELIVERY", "CARD", "STRIPE"]),
  deliveryName: z.string().min(2),
  deliveryPhone: z.string().min(7),
  deliveryAddress: z.string().min(5),
  deliveryCity: z.string().min(2),
  deliveryNotes: z.string().optional(),
})

async function findOrCreateDbUser(clerkUserId: string): Promise<string> {
  const existing = await prisma.user.findUnique({ where: { clerkId: clerkUserId } })
  if (existing) return existing.id

  const created = await prisma.user.create({
    data: {
      clerkId: clerkUserId,
      email: `user-${clerkUserId.slice(-10)}@karachi-broast.local`,
    },
  })
  return created.id
}

export async function createOrder(data: z.infer<typeof createOrderSchema>) {
  try {
    const { userId: authClerkId } = await auth()
    if (!authClerkId || authClerkId !== data.clerkUserId) {
      return { success: false, error: "Unauthorized" }
    }

    const validatedData = createOrderSchema.parse(data)

    const dbUserId = await findOrCreateDbUser(validatedData.clerkUserId)

    const timestamp = Date.now().toString(36)
    const random = Math.random().toString(36).substring(2, 7)
    const orderNumber = `ORD-${timestamp}${random}`.toUpperCase()

    const deliveryInfo = [
      `Name: ${validatedData.deliveryName}`,
      `Phone: ${validatedData.deliveryPhone}`,
      `Address: ${validatedData.deliveryAddress}`,
      `City: ${validatedData.deliveryCity}`,
      validatedData.deliveryNotes ? `Notes: ${validatedData.deliveryNotes}` : null,
    ]
      .filter(Boolean)
      .join("\n")

    const order = await prisma.order.create({
      data: {
        orderNumber,
        userId: dbUserId,
        status: "PENDING",
        paymentStatus: "PENDING",
        paymentMethod: validatedData.paymentMethod,
        subtotal: validatedData.subtotal,
        deliveryFee: validatedData.deliveryFee,
        tax: validatedData.tax,
        discount: validatedData.discount || 0,
        total: validatedData.total,
        specialInstructions: deliveryInfo,
        items: {
          create: validatedData.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
            customizations: item.customizations ?? undefined,
            notes: item.notes,
          })),
        },
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    })

    revalidatePath("/admin")
    revalidatePath("/account")

    return { success: true, order }
  } catch (error) {
    return { success: false, error: "Failed to create order" }
  }
}

export async function updateOrderStatus(orderId: string, status: string) {
  try {
    const order = await prisma.order.update({
      where: { id: orderId },
      data: { status: status as Parameters<typeof prisma.order.update>[0]['data']['status'] },
    })

    revalidatePath("/admin")
    revalidatePath("/account")

    return { success: true, order }
  } catch (error) {
    console.error("Error updating order status:", error)
    return { success: false, error: "Failed to update order status" }
  }
}

export async function cancelOrder(orderId: string) {
  try {
    const order = await prisma.order.update({
      where: { id: orderId },
      data: { status: "CANCELLED" },
    })

    revalidatePath("/admin")
    revalidatePath("/account")

    return { success: true, order }
  } catch (error) {
    console.error("Error cancelling order:", error)
    return { success: false, error: "Failed to cancel order" }
  }
}

// ============================================
// PRODUCT ACTIONS
// ============================================

const createProductSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().optional(),
  categoryId: z.string(),
  price: z.number().positive(),
  comparePrice: z.number().positive().optional(),
  image: z.string().url().optional(),
  images: z.array(z.string().url()).optional(),
  calories: z.number().positive().optional(),
  prepTime: z.number().positive().optional(),
  isFeatured: z.boolean().optional(),
  isPopular: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
})

export async function createProduct(data: z.infer<typeof createProductSchema>) {
  try {
    const validatedData = createProductSchema.parse(data)

    const product = await prisma.product.create({
      data: validatedData,
    })

    revalidatePath("/menu")
    revalidatePath("/admin")

    return { success: true, product }
  } catch (error) {
    console.error("Error creating product:", error)
    return { success: false, error: "Failed to create product" }
  }
}

export async function updateProduct(id: string, data: Partial<z.infer<typeof createProductSchema>>) {
  try {
    const product = await prisma.product.update({
      where: { id },
      data,
    })

    revalidatePath("/menu")
    revalidatePath("/admin")

    return { success: true, product }
  } catch (error) {
    console.error("Error updating product:", error)
    return { success: false, error: "Failed to update product" }
  }
}

export async function deleteProduct(id: string) {
  try {
    await prisma.product.delete({
      where: { id },
    })

    revalidatePath("/menu")
    revalidatePath("/admin")

    return { success: true }
  } catch (error) {
    console.error("Error deleting product:", error)
    return { success: false, error: "Failed to delete product" }
  }
}

export async function toggleProductAvailability(id: string, isAvailable: boolean) {
  try {
    const product = await prisma.product.update({
      where: { id },
      data: { isAvailable },
    })

    revalidatePath("/menu")
    revalidatePath("/admin")

    return { success: true, product }
  } catch (error) {
    console.error("Error toggling product availability:", error)
    return { success: false, error: "Failed to update product" }
  }
}

// ============================================
// CATEGORY ACTIONS
// ============================================

const createCategorySchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().optional(),
  image: z.string().url().optional(),
  icon: z.string().optional(),
  sortOrder: z.number().optional(),
})

export async function createCategory(data: z.infer<typeof createCategorySchema>) {
  try {
    const validatedData = createCategorySchema.parse(data)

    const category = await prisma.category.create({
      data: validatedData,
    })

    revalidatePath("/menu")
    revalidatePath("/admin")

    return { success: true, category }
  } catch (error) {
    console.error("Error creating category:", error)
    return { success: false, error: "Failed to create category" }
  }
}

export async function updateCategory(id: string, data: Partial<z.infer<typeof createCategorySchema>>) {
  try {
    const category = await prisma.category.update({
      where: { id },
      data,
    })

    revalidatePath("/menu")
    revalidatePath("/admin")

    return { success: true, category }
  } catch (error) {
    console.error("Error updating category:", error)
    return { success: false, error: "Failed to update category" }
  }
}

export async function deleteCategory(id: string) {
  try {
    await prisma.category.delete({
      where: { id },
    })

    revalidatePath("/menu")
    revalidatePath("/admin")

    return { success: true }
  } catch (error) {
    console.error("Error deleting category:", error)
    return { success: false, error: "Failed to delete category" }
  }
}

// ============================================
// REVIEW ACTIONS
// ============================================

const createReviewSchema = z.object({
  userId: z.string(),
  productId: z.string(),
  rating: z.number().min(1).max(5),
  comment: z.string().optional(),
  images: z.array(z.string().url()).optional(),
})

export async function createReview(data: z.infer<typeof createReviewSchema>) {
  try {
    const validatedData = createReviewSchema.parse(data)

    const review = await prisma.review.create({
      data: validatedData,
    })

    revalidatePath(`/product/${validatedData.productId}`)

    return { success: true, review }
  } catch (error) {
    console.error("Error creating review:", error)
    return { success: false, error: "Failed to create review" }
  }
}

export async function approveReview(reviewId: string) {
  try {
    const review = await prisma.review.update({
      where: { id: reviewId },
      data: { isApproved: true },
    })

    revalidatePath("/admin")

    return { success: true, review }
  } catch (error) {
    console.error("Error approving review:", error)
    return { success: false, error: "Failed to approve review" }
  }
}

// ============================================
// COUPON ACTIONS
// ============================================

export async function validateCoupon(code: string, orderTotal: number) {
  try {
    const coupon = await prisma.coupon.findUnique({
      where: { code: code.toUpperCase() },
    })

    if (!coupon) {
      return { valid: false, error: "Invalid coupon code" }
    }

    if (!coupon.isActive) {
      return { valid: false, error: "Coupon is no longer active" }
    }

    if (new Date() < coupon.validFrom) {
      return { valid: false, error: "Coupon is not yet valid" }
    }

    if (new Date() > coupon.validUntil) {
      return { valid: false, error: "Coupon has expired" }
    }

    if (orderTotal < Number(coupon.minOrderAmount)) {
      return { 
        valid: false, 
        error: `Minimum order amount is ${coupon.minOrderAmount}` 
      }
    }

    if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
      return { valid: false, error: "Coupon usage limit reached" }
    }

    // Calculate discount
    let discount = 0
    if (coupon.discountType === "PERCENTAGE") {
      discount = (orderTotal * Number(coupon.discountValue)) / 100
      if (coupon.maxDiscount) {
        discount = Math.min(discount, Number(coupon.maxDiscount))
      }
    } else {
      discount = Number(coupon.discountValue)
    }

    return {
      valid: true,
      discount,
      coupon: {
        code: coupon.code,
        description: coupon.description,
      },
    }
  } catch (error) {
    console.error("Error validating coupon:", error)
    return { valid: false, error: "Failed to validate coupon" }
  }
}
