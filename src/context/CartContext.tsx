'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { CartItem, Cart, Toast } from '@/types'

interface CartContextType extends Cart {
  addToCart: (item: CartItem) => void
  removeFromCart: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
  addToast: (message: string, type: 'success' | 'error' | 'info') => void
  toasts: Toast[]
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [toasts, setToasts] = useState<Toast[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart))
      } catch (e) {
        console.error('Failed to parse cart from localStorage')
      }
    }
  }, [])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('cart', JSON.stringify(items))
    }
  }, [items, mounted])

  const addToast = (message: string, type: 'success' | 'error' | 'info') => {
    const id = Math.random().toString(36).substring(2, 9)
    const newToast: Toast = { id, message, type }
    setToasts(prev => [...prev, newToast])
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 3000)
  }

  const addToCart = (item: CartItem) => {
    setItems(prev => {
      const existingIndex = prev.findIndex(
        i => i.id === item.id && i.selectedVariant === item.selectedVariant
      )
      if (existingIndex > -1) {
        const updated = [...prev]
        updated[existingIndex].quantity += item.quantity
        addToast(`Updated ${item.title} quantity in cart`, 'info')
        return updated
      }
      addToast(`${item.title} added to cart!`, 'success')
      return [...prev, item]
    })
  }

  const removeFromCart = (productId: number) => {
    setItems(prev => {
      const item = prev.find(i => i.id === productId)
      if (item) {
        addToast(`${item.title} removed from cart`, 'info')
      }
      return prev.filter(i => i.id !== productId)
    })
  }

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId)
      return
    }
    setItems(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => {
    setItems([])
    addToast('Cart cleared', 'info')
  }

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  if (!mounted) {
    return null
  }

  return (
    <CartContext.Provider
      value={{
        items,
        totalItems,
        totalPrice,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        addToast,
        toasts,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
