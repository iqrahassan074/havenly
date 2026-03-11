'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { FiArrowLeft, FiCreditCard, FiTruck, FiCheck, FiLock } from 'react-icons/fi'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, totalPrice, clearCart } = useCart()
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  })
  const [isProcessing, setIsProcessing] = useState(false)

  const shippingCost = totalPrice >= 500 ? 0 : 49
  const tax = totalPrice * 0.08
  const grandTotal = (totalPrice + shippingCost + tax).toFixed(2)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    clearCart()
    router.push('/checkout/success')
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-muted-foreground mb-8">Add some items before checking out.</p>
          <Link href="/#products">
            <motion.button
              className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold"
              whileHover={{ scale: 1.05 }}
            >
              Start Shopping
            </motion.button>
          </Link>
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
          <Link href="/cart">
            <motion.button
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-4"
              whileHover={{ x: -5 }}
            >
              <FiArrowLeft className="w-4 h-4" />
              Back to Cart
            </motion.button>
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold">Checkout</h1>
        </motion.div>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-8">
              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card rounded-2xl p-6"
              >
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <FiTruck className="w-5 h-5" />
                  Contact Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-background border border-foreground/10 focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-background border border-foreground/10 focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Shipping Address */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="glass-card rounded-2xl p-6"
              >
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <FiTruck className="w-5 h-5" />
                  Shipping Address
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-background border border-foreground/10 focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-background border border-foreground/10 focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Doe"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-background border border-foreground/10 focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="123 Main Street"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">Apartment, suite, etc. (optional)</label>
                    <input
                      type="text"
                      name="apartment"
                      value={formData.apartment}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl bg-background border border-foreground/10 focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Apt 4B"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-background border border-foreground/10 focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="New York"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">State</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-background border border-foreground/10 focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="NY"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">ZIP Code</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-background border border-foreground/10 focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="10001"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Payment Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="glass-card rounded-2xl p-6"
              >
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <FiCreditCard className="w-5 h-5" />
                  Payment Details
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Card Number</label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      required
                      maxLength={19}
                      className="w-full px-4 py-3 rounded-xl bg-background border border-foreground/10 focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Cardholder Name</label>
                    <input
                      type="text"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-background border border-foreground/10 focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Expiry Date</label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        required
                        maxLength={5}
                        className="w-full px-4 py-3 rounded-xl bg-background border border-foreground/10 focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">CVV</label>
                      <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        required
                        maxLength={4}
                        className="w-full px-4 py-3 rounded-xl bg-background border border-foreground/10 focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="123"
                      />
                    </div>
                  </div>
                </div>

                {/* Security Notice */}
                <div className="mt-6 p-4 bg-green-500/10 rounded-xl flex items-center gap-3 text-sm text-green-500">
                  <FiLock className="w-5 h-5" />
                  Your payment information is encrypted and secure
                </div>
              </motion.div>
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

                {/* Cart Items Preview */}
                <div className="space-y-3 mb-6 max-h-48 overflow-y-auto">
                  {items.map((item) => (
                    <div key={`${item.id}-${item.selectedVariant}`} className="flex gap-3">
                      <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">{item.title}</div>
                        <div className="text-xs text-muted-foreground">
                          Qty: {item.quantity} {item.selectedVariant && `• ${item.selectedVariant}`}
                        </div>
                      </div>
                      <div className="text-sm font-semibold">
                        ${(item.price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-foreground/10 pt-4 space-y-3 mb-6">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>${totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span className={shippingCost === 0 ? 'text-green-500' : ''}>
                      {shippingCost === 0 ? 'FREE' : `$${shippingCost}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>

                  <div className="border-t border-foreground/10 pt-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-primary">${grandTotal}</span>
                    </div>
                  </div>
                </div>

                <motion.button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-4 bg-primary text-primary-foreground rounded-full font-semibold text-lg shadow-lg shadow-primary/30 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: isProcessing ? 1 : 1.02 }}
                  whileTap={{ scale: isProcessing ? 1 : 0.95 }}
                >
                  {isProcessing ? (
                    <>
                      <motion.div
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      />
                      Processing...
                    </>
                  ) : (
                    <>
                      <FiLock className="w-5 h-5" />
                      Place Order - ${grandTotal}
                    </>
                  )}
                </motion.button>

                {/* Trust Badges */}
                <div className="mt-6 pt-6 border-t border-foreground/10 space-y-3">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <FiCheck className="w-4 h-4 text-green-500" />
                    30-Day Return Policy
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <FiCheck className="w-4 h-4 text-green-500" />
                    Secure Payment
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <FiCheck className="w-4 h-4 text-green-500" />
                    Free Returns
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
