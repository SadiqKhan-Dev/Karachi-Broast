import type { Product, Category, Order, OrderItem, CartItem as PrismaCartItem } from '@prisma/client'

export interface ExtendedProduct extends Product {
  category?: Category
  customizations?: ProductCustomizationWithOptions[]
}

export interface ProductCustomizationWithOptions {
  id: string
  productId: string
  name: string
  type: 'SINGLE' | 'MULTIPLE'
  required: boolean
  options: CustomizationOption[]
}

export interface CustomizationOption {
  id: string
  customizationId: string
  name: string
  price: number
  isDefault: boolean
}

export interface CartItem {
  id: string
  productId: string
  product: ExtendedProduct
  quantity: number
  selectedCustomizations: Record<string, string | string[]>
  notes?: string
  price: number
}

export interface Cart {
  items: CartItem[]
  subtotal: number
  deliveryFee: number
  tax: number
  total: number
  itemCount: number
}

export interface OrderWithDetails extends Order {
  items: (OrderItem & {
    product: Product
  })[]
  address: Address | null
}

export interface Address {
  id: string
  userId: string
  label: string
  street: string
  city: string
  state: string
  zipCode: string
  country: string
  latitude?: number | null
  longitude?: number | null
  isDefault: boolean
}

export interface MenuItem {
  id: string
  name: string
  slug: string
  description?: string | null
  price: number
  comparePrice?: number | null
  image?: string | null
  images: string[]
  calories?: number | null
  prepTime?: number | null
  isAvailable: boolean
  isFeatured: boolean
  isPopular: boolean
  tags: string[]
  category: {
    id: string
    name: string
    slug: string
    icon?: string | null
  }
}

export interface CategoryWithProducts extends Category {
  products: ExtendedProduct[]
  _count: {
    products: number
  }
}

export interface FilterOptions {
  category?: string
  minPrice?: number
  maxPrice?: number
  isFeatured?: boolean
  isPopular?: boolean
  isAvailable?: boolean
  search?: string
  sortBy?: 'price_asc' | 'price_desc' | 'name_asc' | 'name_desc' | 'newest' | 'popular'
}

export interface RestaurantSettings {
  restaurant_name: string
  restaurant_phone: string
  restaurant_email: string
  restaurant_address: string
  delivery_fee: string
  min_order_amount: string
  estimated_delivery_time: string
  tax_rate: string
}

export interface Coupon {
  id: string
  code: string
  description?: string | null
  discountType: 'PERCENTAGE' | 'FIXED'
  discountValue: number
  minOrderAmount: number
  maxDiscount?: number | null
  usageLimit?: number | null
  usedCount: number
  isActive: boolean
  validFrom: Date
  validUntil: Date
}
