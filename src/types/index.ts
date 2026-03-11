export interface Feature {
  id: number
  icon: string
  title: string
  description: string
}

export interface Stat {
  id: number
  label: string
  value: number
  suffix: string
}

export interface Testimonial {
  id: number
  name: string
  role: string
  company: string
  avatar: string
  content: string
  rating: number
}

export interface NavItem {
  label: string
  href: string
}

export interface Product {
  id: number
  title: string
  price: number
  image: string
  description: string
  material: string
  variants: string[]
  category: string
  rating?: number
  reviews?: number
  inStock?: boolean
}

export interface CartItem extends Product {
  quantity: number
  selectedVariant?: string
}

export interface Cart {
  items: CartItem[]
  totalItems: number
  totalPrice: number
}

export interface Toast {
  id: string
  message: string
  type: 'success' | 'error' | 'info'
}
