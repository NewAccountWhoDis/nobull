import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Classes | No Bull Line Dancers',
  description: 'Join a No Bull Line Dancers class in Forestport, NY and across Hudson Valley and Upstate NY. All skill levels welcome.',
}

const LEVELS = [
  {
    name: 'Beginner',
    desc: 'Start with the count, the direction, and the confidence to join the next song.',
  },
  {
    name: 'Intermediate',
    desc: 'Build cleaner turns, faster transitions, and a wider list of dances.',
  },
  {
    name: 'Advanced',
    desc: 'Work through sharper footwork and routines that need more memory and timing.',
  },
]

export default function ClassesPage() {
  return (
    <div className="min-h-screen bg-espresso">
      <header className="spotlight wood-grain border-b border-saddle py-16 sm:py-20">
        <div className="section-shell max-w-4xl">
          <p className="eyebrow mb-4">Classes</p>
          <h1 className="font-serif text-5xl font-black leading-tight text-gold sm:text-6xl">Learn the steps before the next night out.</h1>
          <p className="mt-6 max-w-2xl font-sans text-sm leading-7 text-parchment sm:text-base">
            Come as you are. Boots are welcome, sneakers work fine, and every class is built to get people moving without making them feel put on the spot.
          </p>
        </div>
      </header>

      <div className="section-shell max-w-5xl py-14 sm:py-16">
        <div className="mb-14 grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-saddle bg-saddle md:grid-cols-3">
          {LEVELS.map((level, index) => (
            <div
              key={level.name}
              className="bg-oak p-7"
            >
              <div className="mb-8 font-serif text-3xl font-black text-saddle">{String(index + 1).padStart(2, '0')}</div>
              <h2 className="mb-3 font-sans text-sm font-black uppercase tracking-[0.14em] text-gold">{level.name}</h2>
              <p className="font-sans text-sm leading-6 text-leather">{level.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-6 rounded-sm border border-gold bg-oak p-6 card-glow sm:p-8 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <h2 className="font-serif text-3xl font-black text-gold">Current schedule</h2>
            <p className="mt-3 max-w-xl font-sans text-sm leading-7 text-parchment">
              Schedule and pricing change by season and location. Call or send a message for the latest class dates and private lesson availability.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
            <a href="tel:8454163403" className="btn-primary">
              CALL 845-416-3403
            </a>
            <Link href="/contact" className="btn-secondary">
              SEND A MESSAGE
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
