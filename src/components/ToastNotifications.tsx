'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '@/context/CartContext'
import { FiCheck, FiX, FiAlertCircle, FiInfo } from 'react-icons/fi'

export default function ToastNotifications() {
  const { toasts } = useCart()

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <FiCheck className="w-5 h-5" />
      case 'error':
        return <FiAlertCircle className="w-5 h-5" />
      default:
        return <FiInfo className="w-5 h-5" />
    }
  }

  return (
    <div className="toast-container">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.9 }}
            transition={{ type: 'spring', damping: 20 }}
            className={`toast ${
              toast.type === 'success'
                ? 'toast-success'
                : toast.type === 'error'
                ? 'toast-error'
                : 'toast-info'
            }`}
          >
            <div className="flex-shrink-0">{getIcon(toast.type)}</div>
            <p className="flex-1 text-sm font-medium">{toast.message}</p>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
