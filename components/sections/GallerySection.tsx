'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

const PHOTOS = [
  { src: '/images/line-dancing.jpg', alt: 'Line dancing class in action' },
  { src: '/images/nobull-pic.jpg',   alt: 'No Bull boots and barrel' },
  { src: '/images/t-shirts.jpg',    alt: 'No Bull branded shirts' },
]

export function GallerySection() {
  return (
    <AnimatedSection id="gallery" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <p className="font-sans text-leather text-xs tracking-[0.4em] uppercase mb-4 text-center">Gallery</p>
        <h2 className="font-serif font-black text-gold text-4xl mb-12 text-center">See Us In Action</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PHOTOS.map((photo, i) => (
            <motion.div
              key={photo.src}
              className="relative aspect-[4/3] rounded-sm overflow-hidden border border-saddle card-glow"
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}
