'use client'

import { motion } from 'framer-motion'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

const SERVICES = [
  { icon: '💍', label: 'WEDDINGS',   desc: 'Make your reception unforgettable. We get the whole crowd moving.' },
  { icon: '🎉', label: 'PARTIES',    desc: 'Birthday, bachelorette, or just because — any party is better with line dancing.' },
  { icon: '🏢', label: 'CORPORATE',  desc: 'Team building with a twist. No experience, no problem.' },
  { icon: '🍺', label: 'BARS & VENUES', desc: 'Bring the crowd in and keep them on the floor all night.' },
]

export function ServicesSection() {
  return (
    <AnimatedSection className="py-24 px-6 bg-oak border-y border-saddle">
      <div className="max-w-7xl mx-auto text-center">
        <p className="font-sans text-leather text-xs tracking-[0.4em] uppercase mb-4">What We Do</p>
        <h2 className="font-serif font-black text-gold text-4xl mb-12">Perfect For Any Event</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.label}
              className="bg-espresso border border-saddle rounded-sm p-6 card-glow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <div className="text-4xl mb-4">{s.icon}</div>
              <h3 className="font-sans font-black text-gold text-xs tracking-widest mb-2">{s.label}</h3>
              <p className="font-sans text-leather text-xs leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}
