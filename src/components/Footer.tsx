'use client'

import { motion } from 'framer-motion'
import { FiMail, FiPhone, FiMapPin, FiHeart } from 'react-icons/fi'
import { 
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiLinkedin,
  FiYoutube
} from 'react-icons/fi'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    shop: ['All Products', 'New Arrivals', 'Best Sellers', 'Sale'],
    company: ['About Us', 'Careers', 'Press', 'Blog'],
    support: ['Help Center', 'Shipping', 'Returns', 'Contact Us'],
    legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy'],
  }

  const socialLinks = [
    { icon: FiFacebook, href: '#', label: 'Facebook' },
    { icon: FiTwitter, href: '#', label: 'Twitter' },
    { icon: FiInstagram, href: '#', label: 'Instagram' },
    { icon: FiLinkedin, href: '#', label: 'LinkedIn' },
    { icon: FiYoutube, href: '#', label: 'YouTube' },
  ]

  return (
    <footer id="contact" className="relative pt-20 pb-10 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/50 to-muted" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-16">
          {/* Brand Column */}
          <div className="col-span-2">
            <motion.a
              href="#home"
              className="text-2xl font-bold text-gradient"
              whileHover={{ scale: 1.05 }}
            >
              Havenly
            </motion.a>

            <p className="mt-4 text-muted-foreground leading-relaxed">
              Crafting beautiful, timeless furniture for modern living.
              Quality craftsmanship meets contemporary design.
            </p>

            {/* Contact Info */}
            <div className="mt-6 space-y-3">
              <motion.div
                className="flex items-center gap-3 text-muted-foreground"
                whileHover={{ x: 5 }}
              >
                <FiMail className="w-5 h-5 text-primary" />
                <span className="text-sm">iqrasher142@gmail.com</span>
              </motion.div>
              <motion.div
                className="flex items-center gap-3 text-muted-foreground"
                whileHover={{ x: 5 }}
              >
                <FiPhone className="w-5 h-5 text-primary" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </motion.div>
              <motion.div
                className="flex items-center gap-3 text-muted-foreground"
                whileHover={{ x: 5 }}
              >
                <FiMapPin className="w-5 h-5 text-primary" />
                <span className="text-sm">123 Design Street, NY 10001</span>
              </motion.div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3 mt-8">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="font-semibold mb-4">Shop</h3>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <motion.li
                  key={link}
                  whileHover={{ x: 5 }}
                >
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                    {link}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <motion.li
                  key={link}
                  whileHover={{ x: 5 }}
                >
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                    {link}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <motion.li
                  key={link}
                  whileHover={{ x: 5 }}
                >
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                    {link}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <motion.li
                  key={link}
                  whileHover={{ x: 5 }}
                >
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                    {link}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card rounded-2xl p-8 mb-16"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold mb-2">Subscribe to Our Newsletter</h3>
              <p className="text-muted-foreground">
                Get 10% off your first order and stay updated on new arrivals.
              </p>
            </div>
            <div className="flex w-full md:w-auto gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-64 px-4 py-3 rounded-full bg-background border border-foreground/10 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <motion.button
                className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-semibold whitespace-nowrap"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-foreground/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground text-sm">
              © {currentYear} Havenly. All rights reserved.
            </p>
            
            <motion.p
              className="text-muted-foreground text-sm flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
            >
              Made with <FiHeart className="w-4 h-4 text-red-500" /> by Havenly Team
            </motion.p>
          </div>
        </div>
      </div>
    </footer>
  )
}
