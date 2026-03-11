'use client'

import { motion } from 'framer-motion'
import { Product } from '@/types'
import { useCart } from '@/context/CartContext'
import { FiShoppingBag, FiPlus } from 'react-icons/fi'

interface ProductCardProps {
  product: Product
  index: number
  onClick: (product: Product) => void
}

export default function ProductCard({ product, index, onClick }: ProductCardProps) {
  const { addToCart } = useCart()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    addToCart({
      ...product,
      quantity: 1,
      selectedVariant: product.variants[0],
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10, scale: 1.02 }}
      onClick={() => onClick(product)}
      className="group cursor-pointer"
    >
      <div className="relative overflow-hidden rounded-2xl bg-card shadow-lg">
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <motion.img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6 }}
          />

          {/* Overlay on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2"
          >
            <motion.button
              onClick={handleAddToCart}
              className="flex-1 py-3 bg-white/90 backdrop-blur-sm text-foreground rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-primary hover:text-primary-foreground transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FiPlus className="w-5 h-5" />
              Add to Cart
            </motion.button>
            <motion.button
              onClick={(e) => {
                e.stopPropagation()
                onClick(product)
              }}
              className="px-4 py-3 bg-white/90 backdrop-blur-sm text-foreground rounded-lg font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title="Quick View"
            >
              <FiShoppingBag className="w-5 h-5" />
            </motion.button>
          </motion.div>

          {/* Category Badge */}
          <motion.div
            className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium"
            whileHover={{ scale: 1.05 }}
          >
            {product.category}
          </motion.div>

          {/* Stock Badge */}
          {product.inStock && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 }}
              className="absolute top-4 right-4 px-2 py-1 bg-green-500 text-white rounded-full text-xs font-medium"
            >
              In Stock
            </motion.div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <motion.h3
            className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors"
            whileHover={{ x: 5 }}
          >
            {product.title}
          </motion.h3>

          <div className="flex items-center justify-between mb-3">
            <motion.div
              className="flex items-center gap-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {[...Array(5)].map((_, i) => (
                <motion.svg
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating || 5) ? 'fill-accent' : 'fill-muted'
                  }`}
                  viewBox="0 0 20 20"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.05 }}
                >
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </motion.svg>
              ))}
              <span className="text-xs text-muted-foreground ml-1">
                ({product.reviews || 0})
              </span>
            </motion.div>
          </div>

          <div className="flex items-center justify-between">
            <motion.span
              className="text-2xl font-bold text-primary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              ${product.price}
            </motion.span>

            <motion.button
              onClick={handleAddToCart}
              className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FiPlus className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
