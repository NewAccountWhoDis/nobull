import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Contact | No Bull Line Dancers',
  description: 'Get in touch with No Bull Line Dancers. Call, message on Facebook, or send us a note.',
}

const CONTACT_ITEMS = [
  {
    label: 'CALL US',
    value: '845-416-3403',
    href: 'tel:8454163403',
  },
  {
    label: 'FACEBOOK',
    value: 'No Bull Line Dancers',
    href: 'https://www.facebook.com/profile.php?id=61573169872550',
  },
]

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-espresso">
      <header className="spotlight wood-grain border-b border-saddle py-16 sm:py-20">
        <div className="section-shell max-w-4xl">
          <p className="eyebrow mb-4">Contact</p>
          <h1 className="font-serif text-5xl font-black leading-tight text-gold sm:text-6xl">
            Questions, dates, venues, weird room layouts. Ask away.
          </h1>
          <p className="mt-6 max-w-2xl font-sans text-sm leading-7 text-parchment sm:text-base">
            The fastest route is a call. Facebook works too. For event details, the booking form keeps everything in one place.
          </p>
        </div>
      </header>

      <div className="section-shell max-w-3xl space-y-4 py-14 sm:py-16">
        {CONTACT_ITEMS.map((item) => (
          <a
            key={item.label}
            href={item.href}
            target={item.href.startsWith('http') ? '_blank' : undefined}
            rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="group grid gap-2 rounded-sm border border-saddle bg-oak p-6 card-glow transition-colors hover:border-gold sm:grid-cols-[140px_1fr] sm:items-center"
          >
            <div>
              <div className="font-sans text-[10px] font-black uppercase tracking-[0.18em] text-leather">{item.label}</div>
            </div>
            <div className="font-serif text-2xl font-black text-gold transition-colors group-hover:text-parchment">
                {item.value}
            </div>
          </a>
        ))}

        <div className="rounded-sm border border-saddle bg-oak p-6 card-glow sm:p-8">
          <h2 className="font-serif text-3xl font-black text-gold">Ready to book an event?</h2>
          <p className="mb-6 mt-3 max-w-xl font-sans text-sm leading-7 text-leather">
            Use our booking form for event inquiries. It gives us the date, venue, and crowd details we need to answer quickly.
          </p>
          <Link href="/book" className="btn-primary">
            Go to booking form
          </Link>
        </div>
      </div>
    </div>
  )
}
