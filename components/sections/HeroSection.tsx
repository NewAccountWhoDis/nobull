'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const logoY = useTransform(scrollYProgress, [0, 1], [0, -60])

  return (
    <div
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden spotlight wood-grain"
    >
      <motion.div style={{ y: logoY }} className="flex flex-col items-center z-10 px-6 text-center">
        <Image
          src="/images/logo1.jpg"
          alt="No Bull Line Dancers"
          width={200}
          height={200}
          className="rounded-lg mb-6 shadow-2xl"
          priority
        />

        <p className="font-sans text-leather text-xs tracking-[0.5em] uppercase mb-5">
          Ardisanback, NY · 845-416-3403
        </p>

        <h1 className="font-serif font-black text-gold text-7xl tracking-widest leading-none mb-2">
          NO BULL
        </h1>
        <p className="font-sans text-leather text-sm tracking-[0.6em] uppercase mb-4">
          Line Dancers
        </p>

        <div className="divider-gold w-48 mx-auto mb-8" />

        <p className="font-sans text-parchment text-base leading-relaxed max-w-lg mb-10">
          We bring the boots, the moves, and the music — right to your event.
          Weddings, parties, corporate nights, and more.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/book"
            className="bg-gradient-to-r from-gold to-leather text-espresso font-black text-xs tracking-widest px-8 py-4 rounded-sm pulse-cta hover:opacity-90 transition-opacity"
          >
            HIRE US FOR YOUR EVENT
          </Link>
          <a
            href="#gallery"
            className="border border-saddle text-leather font-sans text-xs tracking-widest px-6 py-4 rounded-sm hover:border-gold hover:text-gold transition-colors"
          >
            SEE THE GALLERY
          </a>
        </div>
      </motion.div>

      <div className="absolute bottom-8 text-saddle text-xl animate-bounce" aria-hidden="true">↓</div>
    </div>
  )
}
