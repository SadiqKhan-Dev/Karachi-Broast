import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem, Cart } from '@/types'

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  deliveryFee: number
  taxRate: number
  
  // Actions
  setIsOpen: (isOpen: boolean) => void
  addItem: (item: CartItem) => void
  removeItem: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  setDeliveryFee: (fee: number) => void
  setTaxRate: (rate: number) => void
  
  // Computed
  getCart: () => Cart
  getItemQuantity: (productId: string, customizations?: Record<string, string | string[]>) => number
}

const generateItemId = () => Math.random().toString(36).substring(2, 9)

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      deliveryFee: 150,
      taxRate: 0.13,

      setIsOpen: (isOpen) => set({ isOpen }),

      addItem: (newItem) => {
        set((state) => {
          // Check if item with same product and customizations exists
          const existingItemIndex = state.items.findIndex(
            (item) =>
              item.productId === newItem.productId &&
              JSON.stringify(item.selectedCustomizations) === JSON.stringify(newItem.selectedCustomizations)
          )

          if (existingItemIndex > -1) {
            // Update quantity of existing item
            const updatedItems = [...state.items]
            updatedItems[existingItemIndex] = {
              ...updatedItems[existingItemIndex],
              quantity: updatedItems[existingItemIndex].quantity + newItem.quantity,
            }
            return { items: updatedItems }
          }

          // Add new item with unique ID
          return {
            items: [...state.items, { ...newItem, id: generateItemId() }],
          }
        })
      },

      removeItem: (itemId) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== itemId),
        }))
      },

      updateQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(itemId)
          return
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.id === itemId ? { ...item, quantity } : item
          ),
        }))
      },

      clearCart: () => set({ items: [] }),

      setDeliveryFee: (fee) => set({ deliveryFee: fee }),
      setTaxRate: (rate) => set({ taxRate: rate }),

      getCart: () => {
        const state = get()
        const subtotal = state.items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        )
        const tax = Math.round(subtotal * state.taxRate)
        const total = subtotal + state.deliveryFee + tax

        return {
          items: state.items,
          subtotal,
          deliveryFee: state.deliveryFee,
          tax,
          total,
          itemCount: state.items.reduce((sum, item) => sum + item.quantity, 0),
        }
      },

      getItemQuantity: (productId, customizations) => {
        const state = get()
        return state.items
          .filter(
            (item) =>
              item.productId === productId &&
              (!customizations ||
                JSON.stringify(item.selectedCustomizations) === JSON.stringify(customizations))
          )
          .reduce((sum, item) => sum + item.quantity, 0)
      },
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({
        items: state.items,
        deliveryFee: state.deliveryFee,
        taxRate: state.taxRate,
      }),
    }
  )
)
