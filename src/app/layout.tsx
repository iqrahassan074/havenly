import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/context/ThemeContext'
import { CartProvider } from '@/context/CartContext'
import ToastNotifications from '@/components/ToastNotifications'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Havenly - Modern Furniture & Home Decor',
  description: 'Discover our curated collection of premium furniture designed to transform your home into a sanctuary of style and comfort.',
  keywords: ['furniture', 'home decor', 'modern furniture', 'interior design', 'home furnishings'],
  authors: [{ name: 'Iqra Hassan' }],
  openGraph: {
    title: 'Havenly - Modern Furniture & Home Decor',
    description: 'Discover our curated collection of premium furniture designed to transform your home into a sanctuary of style and comfort.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <CartProvider>
            {children}
            <ToastNotifications />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
