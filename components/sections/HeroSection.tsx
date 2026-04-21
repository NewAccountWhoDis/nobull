'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const logoY = useTransform(scrollYProgress, [0, 1], [0, -60])
  const heroStyle = prefersReducedMotion ? { zIndex: 2 } : { y: logoY, zIndex: 2 }

  return (
    <div
      ref={ref}
      className="relative flex min-h-[calc(100dvh-65px)] items-center overflow-hidden bg-espresso"
    >
      <Image
        src="/images/line-dancing.jpg"
        alt="Line dancers at a No Bull class"
        fill
        className="z-0 object-cover"
        priority
      />
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-espresso/95 via-espresso/72 to-espresso/20" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-espresso/10 via-transparent to-espresso" />

      <motion.div style={heroStyle} className="section-shell relative py-16 sm:py-24">
        <div className="max-w-3xl">
          <p className="mb-5 font-sans text-[10px] font-black uppercase tracking-[0.22em] text-gold/90">
            Forestport, NY / serving Hudson Valley and Upstate NY
          </p>

          <h1 className="font-serif text-4xl font-black leading-[1.02] text-[#efbd82] drop-shadow-2xl sm:text-7xl sm:leading-[0.95] lg:text-8xl">
            The dance floor shows up when we do.
          </h1>

          <div className="my-7 h-px w-28 bg-gold" />

          <p className="max-w-xl font-sans text-base font-medium leading-8 text-[#fff2dd] sm:text-lg">
            No Bull brings friendly instruction, crowd-ready music, and the kind of energy that gets beginners
            and regulars dancing together. Weddings, bar nights, private parties, and corporate events.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/book" className="btn-primary pulse-cta">
              Check Your Date
            </Link>
            <a href="tel:8454163403" className="btn-secondary">
              Call 845-416-3403
            </a>
          </div>

          <dl className="mt-12 grid max-w-2xl grid-cols-1 gap-4 border-y border-saddle/80 py-4 sm:grid-cols-3 sm:gap-3">
            {[
              ['Events', 'Weddings, parties, venues'],
              ['Lessons', 'No experience needed'],
              ['Setup', 'We come to you'],
            ].map(([term, desc]) => (
              <div key={term}>
                <dt className="font-serif text-xl font-black text-[#efbd82]">{term}</dt>
                <dd className="mt-1 font-sans text-[11px] leading-4 text-parchment/80">{desc}</dd>
              </div>
            ))}
          </dl>
        </div>
      </motion.div>
    </div>
  )
}
