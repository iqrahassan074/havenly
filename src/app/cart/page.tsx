'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { FiTrash2, FiPlus, FiMinus, FiShoppingCart, FiArrowLeft, FiArrowRight } from 'react-icons/fi'

export default function CartPage() {
  const { items, totalItems, totalPrice, updateQuantity, removeFromCart, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 20, delay: 0.2 }}
              className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center"
            >
              <FiShoppingCart className="w-12 h-12 text-muted-foreground" />
            </motion.div>

            <h1 className="text-3xl md:text-4xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Looks like you haven&apos;t added anything to your cart yet. Start exploring our collection!
            </p>

            <Link href="/#products">
              <motion.button
                className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold text-lg shadow-lg shadow-primary/30 inline-flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Shopping
                <FiArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link href="/#products">
            <motion.button
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-4"
              whileHover={{ x: -5 }}
            >
              <FiArrowLeft className="w-4 h-4" />
              Continue Shopping
            </motion.button>
          </Link>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl md:text-4xl font-bold">Shopping Cart</h1>
            <motion.button
              onClick={clearCart}
              className="text-red-500 hover:text-red-600 text-sm font-medium flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiTrash2 className="w-4 h-4" />
              Clear Cart
            </motion.button>
          </div>
          <p className="text-muted-foreground mt-2">
            {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <motion.div
                key={`${item.id}-${item.selectedVariant}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card rounded-2xl p-4 md:p-6 flex gap-4 md:gap-6"
              >
                {/* Product Image */}
                <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 rounded-xl overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">{item.category}</div>
                    <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                    {item.selectedVariant && (
                      <div className="text-sm text-muted-foreground">
                        Variant: <span className="text-foreground">{item.selectedVariant}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2">
                      <motion.button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FiMinus className="w-4 h-4" />
                      </motion.button>
                      <span className="w-10 text-center font-semibold">{item.quantity}</span>
                      <motion.button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FiPlus className="w-4 h-4" />
                      </motion.button>
                    </div>

                    {/* Price and Remove */}
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">
                          ${(item.price * item.quantity).toLocaleString()}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          ${item.price} each
                        </div>
                      </div>
                      <motion.button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 rounded-full text-muted-foreground hover:text-red-500 hover:bg-red-500/10 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FiTrash2 className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card rounded-2xl p-6 sticky top-24"
            >
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>${totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span className={totalPrice >= 500 ? 'text-green-500' : ''}>
                    {totalPrice >= 500 ? 'FREE' : '$49.00'}
                  </span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Tax (Estimated)</span>
                  <span>${(totalPrice * 0.08).toFixed(2)}</span>
                </div>

                <div className="border-t border-foreground/10 pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary">
                      ${((totalPrice >= 500 ? totalPrice : totalPrice + 49) * 1.08).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {totalPrice < 500 && (
                <div className="mb-6 p-4 bg-blue-500/10 rounded-xl text-sm text-blue-500">
                  Add ${(500 - totalPrice).toFixed(2)} more for free shipping!
                </div>
              )}

              <Link href="/checkout">
                <motion.button
                  className="w-full py-4 bg-primary text-primary-foreground rounded-full font-semibold text-lg shadow-lg shadow-primary/30 flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02, boxShadow: '0 20px 40px rgba(217, 119, 68, 0.4)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  Proceed to Checkout
                  <FiArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-foreground/10 space-y-3">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="w-2 h-2 bg-green-500 rounded-full" />
                  Secure Checkout
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="w-2 h-2 bg-blue-500 rounded-full" />
                  Free Returns
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="w-2 h-2 bg-purple-500 rounded-full" />
                  5 Year Warranty
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
