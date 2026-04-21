'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

const PHOTOS = [
  { src: '/images/line-dancing.jpg', alt: 'Line dancing class in action' },
  { src: '/images/nobull-pic.jpg',   alt: 'No Bull boots and barrel' },
  { src: '/images/t-shirts.jpg',    alt: 'No Bull branded shirts' },
]

export function GallerySection() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <AnimatedSection id="gallery" className="py-20 sm:py-24">
      <div className="section-shell">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="eyebrow mb-4">Gallery</p>
            <h2 className="font-serif text-4xl font-black text-gold sm:text-5xl">A few frames from the floor.</h2>
          </div>
          <p className="max-w-sm font-sans text-sm leading-6 text-leather">
            Real rooms, real people, and the kind of dance-floor energy you can feel before the first count.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {PHOTOS.map((photo, i) => (
            <motion.div
              key={photo.src}
              className={`relative overflow-hidden rounded-sm border border-saddle card-glow ${
                i === 0 ? 'aspect-[5/4] md:col-span-2 md:row-span-2' : 'aspect-[5/4]'
              }`}
              initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.97 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, scale: 1 }}
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
