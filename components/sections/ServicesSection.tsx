'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

const SERVICES = [
  { label: 'The wedding playlist needs one shared moment', desc: 'We teach a dance the whole room can catch onto, then keep the reception moving.' },
  { label: 'The party needs an icebreaker that actually works', desc: 'Birthdays, bachelorettes, reunions, and backyard nights loosen up fast when everyone has simple steps to follow.' },
  { label: 'The team outing should feel less like work', desc: 'Corporate groups get structure without the stiff workshop energy.' },
  { label: 'The bar needs a reason for people to stay', desc: 'We can lead a public night, teach between songs, and turn watchers into regulars on the floor.' },
]

export function ServicesSection() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <AnimatedSection className="border-y border-saddle bg-oak py-20 sm:py-24">
      <div className="section-shell grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <p className="eyebrow mb-4">Bring us in when</p>
          <h2 className="font-serif text-4xl font-black leading-tight text-gold sm:text-5xl">
            The room is ready for something better than another background playlist.
          </h2>
          <p className="mt-6 max-w-md font-sans text-sm leading-7 text-parchment">
            We are not a performance people watch from across the room. We teach, cue, laugh, reset,
            and get the group comfortable enough to move together.
          </p>
          <a
            href="/book#faq"
            className="mt-8 inline-flex font-sans text-xs font-black uppercase tracking-[0.16em] text-gold transition-colors hover:text-parchment"
          >
            Read booking FAQ
          </a>
        </div>

        <div className="divide-y divide-saddle border-y border-saddle">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.label}
              className="grid gap-4 py-6 sm:grid-cols-[84px_1fr] sm:py-7"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={prefersReducedMotion ? undefined : { duration: 0.4, delay: i * 0.08 }}
            >
              <div className="font-serif text-4xl font-black leading-none text-saddle">
                {String(i + 1).padStart(2, '0')}
              </div>
              <div>
                <h3 className="font-serif text-2xl font-black leading-tight text-gold">{s.label}</h3>
                <p className="mt-3 font-sans text-sm leading-7 text-parchment">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}
