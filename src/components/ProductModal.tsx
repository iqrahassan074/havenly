'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Product } from '@/types'
import { useCart } from '@/context/CartContext'
import { FiX, FiShoppingCart, FiHeart, FiPlus, FiMinus } from 'react-icons/fi'

interface ProductModalProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
}

export default function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const { addToCart } = useCart()
  const [selectedVariant, setSelectedVariant] = useState<string>('')
  const [quantity, setQuantity] = useState(1)

  if (!product) return null

  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity,
      selectedVariant: selectedVariant || product.variants[0],
    })
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="bg-card rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto pointer-events-auto">
              <div className="grid md:grid-cols-2 gap-0">
                {/* Image Section */}
                <div className="relative aspect-square md:aspect-auto">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none"
                  />

                  {/* Close Button */}
                  <motion.button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FiX className="w-5 h-5" />
                  </motion.button>

                  {/* Wishlist Button */}
                  <motion.button
                    className="absolute top-4 left-4 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FiHeart className="w-5 h-5" />
                  </motion.button>

                  {/* Stock Badge */}
                  {product.inStock && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute bottom-4 left-4 px-3 py-1 bg-green-500 text-white rounded-full text-sm font-medium"
                    >
                      In Stock
                    </motion.div>
                  )}
                </div>

                {/* Content Section */}
                <div className="p-6 md:p-8 lg:p-10">
                  <div className="mb-2 text-sm text-muted-foreground">{product.category}</div>

                  <h2 className="text-2xl md:text-3xl font-bold mb-4">{product.title}</h2>

                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-3xl font-bold text-primary">${product.price}</span>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(product.rating || 5) ? 'fill-accent' : 'fill-muted'
                          }`}
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      ))}
                      <span className="ml-2 text-sm text-muted-foreground">
                        ({product.reviews || 0} reviews)
                      </span>
                    </div>
                  </div>

                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Material */}
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold mb-2">Material</h3>
                    <p className="text-sm text-muted-foreground">{product.material}</p>
                  </div>

                  {/* Variants */}
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold mb-3">Available Variants</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.variants.map((variant) => (
                        <motion.button
                          key={variant}
                          onClick={() => setSelectedVariant(variant)}
                          className={`px-4 py-2 border rounded-full text-sm transition-colors ${
                            selectedVariant === variant || (!selectedVariant && variant === product.variants[0])
                              ? 'bg-primary text-primary-foreground border-primary'
                              : 'border-foreground/20 hover:bg-primary hover:text-primary-foreground hover:border-primary'
                          }`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {variant}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Quantity */}
                  <div className="mb-8">
                    <h3 className="text-sm font-semibold mb-3">Quantity</h3>
                    <div className="flex items-center gap-3">
                      <motion.button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-3 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FiMinus className="w-4 h-4" />
                      </motion.button>
                      <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                      <motion.button
                        onClick={() => setQuantity(quantity + 1)}
                        className="p-3 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FiPlus className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-4">
                    <motion.button
                      onClick={handleAddToCart}
                      className="flex-1 py-4 bg-primary text-primary-foreground rounded-full font-semibold flex items-center justify-center gap-2 shadow-lg shadow-primary/30"
                      whileHover={{ scale: 1.02, boxShadow: '0 20px 40px rgba(217, 119, 68, 0.4)' }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FiShoppingCart className="w-5 h-5" />
                      Add to Cart - ${(product.price * quantity).toLocaleString()}
                    </motion.button>

                    <motion.button
                      className="px-6 py-4 border-2 border-foreground/20 rounded-full font-semibold"
                      whileHover={{ scale: 1.05, borderColor: 'var(--primary)' }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FiHeart className="w-5 h-5" />
                    </motion.button>
                  </div>

                  {/* Additional Info */}
                  <div className="mt-6 pt-6 border-t border-foreground/10 space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <span className="w-2 h-2 bg-green-500 rounded-full" />
                      <span className="text-muted-foreground">In Stock - Ready to Ship</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="w-2 h-2 bg-blue-500 rounded-full" />
                      <span className="text-muted-foreground">Free Shipping on Orders $500+</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="w-2 h-2 bg-purple-500 rounded-full" />
                      <span className="text-muted-foreground">5 Year Warranty</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
