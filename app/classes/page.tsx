import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Classes | No Bull Line Dancers',
  description: 'Join a No Bull Line Dancers class in Ardisanback, NY. All skill levels welcome.',
}

const LEVELS = [
  {
    icon: '🌱',
    name: 'Beginner',
    desc: 'Never line danced? No problem. We start from scratch and have you moving in minutes.',
  },
  {
    icon: '⭐',
    name: 'Intermediate',
    desc: 'You know the basics and want more patterns, more music, more fun.',
  },
  {
    icon: '🔥',
    name: 'Advanced',
    desc: 'Ready to challenge yourself with complex footwork and performance-level routines.',
  },
]

export default function ClassesPage() {
  return (
    <div className="min-h-screen bg-espresso">
      <div className="spotlight wood-grain py-20 px-6 text-center border-b border-saddle">
        <p className="font-sans text-leather text-xs tracking-[0.5em] uppercase mb-3">Join Us</p>
        <h1 className="font-serif font-black text-gold text-5xl mb-4">Classes</h1>
        <div className="divider-gold w-32 mx-auto mb-6" />
        <p className="font-sans text-parchment text-sm max-w-md mx-auto leading-relaxed">
          All levels welcome. No experience needed — just boots (or sneakers)
          and a willingness to have fun.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {LEVELS.map((level) => (
            <div
              key={level.name}
              className="bg-oak border border-saddle rounded-sm p-8 card-glow text-center"
            >
              <div className="text-4xl mb-4">{level.icon}</div>
              <h2 className="font-serif font-black text-gold text-xl mb-3">{level.name}</h2>
              <p className="font-sans text-leather text-sm leading-relaxed">{level.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-oak border border-gold rounded-sm p-10 card-glow text-center">
          <h2 className="font-serif font-black text-gold text-3xl mb-3">Pricing & Schedule</h2>
          <div className="divider-gold w-24 mx-auto mb-6" />
          <p className="font-sans text-parchment text-sm leading-relaxed mb-2">
            Schedule and pricing vary by season and location.
          </p>
          <p className="font-sans text-parchment text-sm leading-relaxed mb-8">
            Contact us for current availability and rates.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="tel:8454163403"
              className="bg-gradient-to-r from-gold to-leather text-espresso font-black text-xs tracking-widest px-8 py-3 rounded-sm hover:opacity-90 transition-opacity"
            >
              CALL 845-416-3403
            </a>
            <Link
              href="/contact"
              className="border border-saddle text-leather font-sans text-xs tracking-widest px-6 py-3 rounded-sm hover:border-gold hover:text-gold transition-colors"
            >
              SEND A MESSAGE
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
