import Link from 'next/link'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

export function CtaSection() {
  return (
    <AnimatedSection className="spotlight wood-grain py-20 sm:py-24">
      <div className="section-shell text-center">
        <p className="eyebrow mb-4">Bookings</p>
        <h2 className="mx-auto max-w-3xl font-serif text-4xl font-black leading-tight text-gold sm:text-6xl">
          Tell us the date. We'll help you shape the dance floor.
        </h2>
        <p className="mx-auto mt-6 max-w-xl font-sans text-sm leading-7 text-parchment">
          Send the basics and we'll reply with availability, fit, and pricing. Prefer a quick call?
          Use the phone number below.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/book" className="btn-primary pulse-cta">
            Start Booking
          </Link>
          <a href="tel:8454163403" className="btn-secondary">
            Call 845-416-3403
          </a>
        </div>
        <Link
          href="/book#faq"
          className="mt-6 inline-flex font-sans text-xs font-black uppercase tracking-[0.16em] text-gold transition-colors hover:text-parchment"
        >
          Read booking FAQ
        </Link>
      </div>
    </AnimatedSection>
  )
}
