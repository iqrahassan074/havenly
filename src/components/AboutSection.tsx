'use client'

import { motion } from 'framer-motion'
import { FiAward, FiHeart, FiUsers, FiGlobe } from 'react-icons/fi'

export default function AboutSection() {
  const features = [
    {
      icon: FiAward,
      title: 'Premium Quality',
      description: 'Every piece is crafted with meticulous attention to detail using only the finest materials.',
    },
    {
      icon: FiHeart,
      title: 'Made with Love',
      description: 'Our artisans pour their passion and expertise into every creation.',
    },
    {
      icon: FiUsers,
      title: 'Customer First',
      description: 'Your satisfaction is our priority. We stand behind every piece we sell.',
    },
    {
      icon: FiGlobe,
      title: 'Sustainable',
      description: 'We source responsibly and use eco-friendly practices in our production.',
    },
  ]

  return (
    <section id="about" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 gradient-bg opacity-30" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative">
              <motion.img
                src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80"
                alt="Our workshop"
                className="rounded-2xl shadow-2xl w-full"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Floating badge */}
              <motion.div
                className="absolute -bottom-8 -right-8 bg-primary text-primary-foreground p-6 rounded-2xl shadow-xl"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ scale: 1.05, rotate: 5 }}
              >
                <div className="text-4xl font-bold">15+</div>
                <div className="text-sm opacity-90">Years of Excellence</div>
              </motion.div>
              
              {/* Decorative elements */}
              <motion.div
                className="absolute -top-6 -left-6 w-24 h-24 bg-accent/20 rounded-2xl -z-10"
                animate={{ rotate: [0, 10, 0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
              />
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
          >
            <motion.span
              className="inline-block px-4 py-2 mb-4 rounded-full bg-primary/10 text-primary text-sm font-medium"
              whileHover={{ scale: 1.05 }}
            >
              Our Story
            </motion.span>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Crafting Spaces, <span className="text-gradient">Creating Homes</span>
            </h2>

            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Founded in 2009 by Iqra Hassan, Havenly began with a simple mission: to make beautiful,
              quality furniture accessible to everyone. What started as a small workshop
              has grown into a beloved brand trusted by thousands of homes worldwide.
            </p>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Every piece in our collection is a testament to our commitment to excellence.
              We believe that furniture should not only look stunning but also stand the
              test of time, both in durability and style.
            </p>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex gap-4 p-4 rounded-xl hover:bg-muted/50 transition-colors"
                >
                  <motion.div
                    className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <feature.icon className="w-6 h-6" />
                  </motion.div>
                  <div>
                    <h3 className="font-semibold mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
