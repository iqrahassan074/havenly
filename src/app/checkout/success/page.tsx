'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FiCheck, FiShoppingBag, FiHome } from 'react-icons/fi'

export default function SuccessPage() {
  const orderNumber = Math.random().toString(36).substring(2, 10).toUpperCase()

  return (
    <div className="min-h-screen pt-20 pb-20 flex items-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 15, delay: 0.2 }}
            className="w-24 h-24 mx-auto mb-6 rounded-full bg-green-500 flex items-center justify-center"
          >
            <FiCheck className="w-12 h-12 text-white" />
          </motion.div>

          {/* Confetti Animation */}
          <div className="relative h-20 mb-8">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 0, x: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  y: [0, -100 - Math.random() * 100],
                  x: [(Math.random() - 0.5) * 200],
                  rotate: Math.random() * 360,
                }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.05,
                  ease: 'easeOut',
                }}
                className={`absolute left-1/2 w-3 h-3 rounded-full ${
                  ['bg-primary', 'bg-accent', 'bg-green-500', 'bg-blue-500', 'bg-purple-500'][
                    i % 5
                  ]
                }`}
              />
            ))}
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
          >
            Order Confirmed!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-muted-foreground mb-8"
          >
            Thank you for your purchase. We&apos;ve received your order and will begin processing it right away.
          </motion.p>

          {/* Order Details Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-card rounded-2xl p-6 mb-8"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <FiShoppingBag className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">Order Number</span>
            </div>
            <div className="text-2xl font-bold text-primary mb-2">#{orderNumber}</div>
            <p className="text-sm text-muted-foreground">
              A confirmation email has been sent to your email address.
            </p>
          </motion.div>

          {/* What's Next */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-left glass-card rounded-2xl p-6 mb-8"
          >
            <h2 className="text-lg font-bold mb-4">What&apos;s Next?</h2>
            <div className="space-y-4">
              {[
                { step: 1, title: 'Order Processing', desc: 'We\'re preparing your items', time: '1-2 business days' },
                { step: 2, title: 'Shipped', desc: 'Your order is on its way', time: '3-5 business days' },
                { step: 3, title: 'Delivered', desc: 'Enjoy your new furniture!', time: '' },
              ].map((item) => (
                <div key={item.step} className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm flex-shrink-0">
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{item.title}</div>
                    <div className="text-sm text-muted-foreground">{item.desc}</div>
                  </div>
                  {item.time && (
                    <div className="text-sm text-muted-foreground whitespace-nowrap">{item.time}</div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/">
              <motion.button
                className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold text-lg shadow-lg shadow-primary/30 inline-flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiHome className="w-5 h-5" />
                Back to Home
              </motion.button>
            </Link>
            <Link href="/#products">
              <motion.button
                className="px-8 py-4 border-2 border-primary text-primary rounded-full font-semibold text-lg inline-flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05, backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
                whileTap={{ scale: 0.95 }}
              >
                <FiShoppingBag className="w-5 h-5" />
                Continue Shopping
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
